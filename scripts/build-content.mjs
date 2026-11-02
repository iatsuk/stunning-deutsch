// content/**/*.yaml → src/generated/*.json + public/audio/*.m4a
//
// Проверяет темы, раскрывает состояние сцены для каждого фрагмента и
// связывает немецкие реплики, слова и примеры с готовой нейросетевой озвучкой.
// Имя записи зависит от конфигурации, голоса и текста; неизменённое используется повторно, а
// неиспользуемое удаляется.
//
//   node scripts/build-content.mjs                         полная сборка
//   node scripts/build-content.mjs --check                 только проверка, ничего не пишет
//   node scripts/build-content.mjs --check --only 02-zahlen   проверка одной темы
//   node scripts/build-content.mjs --audio-manifest m.json [--missing]   манифест для TTS (--missing — только без записи)
//   node scripts/build-content.mjs --draft                 черновик: JSON пишется и без новых записей,
//                                                          старые записи не удаляются; не коммитить

import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { episodes as storyEpisodes, phrases as storyPhrases } from "../src/story/data.ts";
import { audioKey, storyLines, storyWords, validateStory } from "../src/story/logic.ts";
import { stepRules } from "../src/story/rules.ts";
import { uhrzeit } from "../src/lib/german.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const contentDir = path.join(root, "content");
const generatedDir = path.join(root, "src/generated");
const audioDir = path.join(root, "public/audio");
const CHECK = process.argv.includes("--check");
const onlyIndex = process.argv.indexOf("--only");
const ONLY = onlyIndex > 0 ? process.argv[onlyIndex + 1] : null;
if (ONLY && !CHECK) throw new Error("--only работает только вместе с --check");
const DRAFT = process.argv.includes("--draft");
/** Фразы без готовой записи в черновой сборке. */
let missingAudio = 0;

/** Логические голоса из YAML; модель и образцы зафиксированы в конфигурации. */
const audioConfig = JSON.parse(readFileSync(path.join(root, "scripts/tts/config.json"), "utf8"));
const legacyAudioConfig = JSON.parse(readFileSync(path.join(root, "scripts/tts/legacy-qwen-config.json"), "utf8"));
const LEGACY_AUDIO_VERSION = createHash("sha256").update(JSON.stringify(legacyAudioConfig)).digest("hex");
const AUDIO_VERSION = createHash("sha256").update(JSON.stringify(audioConfig)).digest("hex");
// Старые записи, которые нужно перезаписать OmniVoice: например, Qwen обрывал конечные шипящие.
const revoice = new Set(
  JSON.parse(readFileSync(path.join(root, "scripts/tts/revoice.json"), "utf8")).map((r) => `${r.voice}|${r.text}`),
);
const DEFAULT_VOICE = "Anna";
const VOICES = Object.keys(audioConfig.voices);

const VIEWS = { dialogue: "dialogue", words: "words", table: "table", sentence: "rows", task: "task", clock: "time" };
const SET_KEYS = ["view", "dialogue", "words", "table", "rows", "task", "time", "reveal", "focus", "solved"];
const TASK_KINDS = ["form", "keywords", "card", "sign", "message", "listen", "ads", "worksheet"];
const EXERCISE_TYPES = ["choice", "gap", "order"];
/** Для автоматических фраз «шпиона»: подлежащее-местоимение и заведомо чужие окончания глагола. */
const PRONOUNS = new Set(["ich", "du", "er", "sie", "es", "wir", "ihr"]);
const WRONG_ENDING = { e: "en", st: "t", t: "st", en: "st" };

const errors = validateStory(storyEpisodes, storyPhrases);
const warnings = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);
const warn = (where, message) => warnings.push(`${where}: ${message}`);

const levelsDoc = load(path.join(contentDir, "levels.yaml"));
const examParts = new Set(
  levelsDoc.levels.flatMap((level) => level.examInfo?.modules.flatMap((m) => m.parts.map((p) => p.id)) ?? []),
);

/** Все немецкие тексты, которые нужно озвучить: ключ — имя файла. */
const audio = new Map();

const catalog = { chapters: levelsDoc.chapters, levels: [] };
const topics = [];
for (const level of levelsDoc.levels) {
  const dir = path.join(contentDir, level.id);
  const files = existsSync(dir)
    ? readdirSync(dir).filter((f) => f.endsWith(".yaml") && (!ONLY || f.includes(ONLY))).sort()
    : [];
  const levelTopics = [];
  for (const file of files) {
    const where = `${level.id}/${file}`;
    const source = load(path.join(dir, file), where);
    if (!source) continue;
    const topic = buildTopic(source, level, where);
    if (!topic) continue;
    topics.push(topic);
    levelTopics.push({
      id: topic.id,
      order: topic.order,
      title: topic.title,
      ru: topic.ru,
      lede: topic.lede,
      goals: topic.goals,
      grammar: topic.grammar,
      exam: topic.exam,
      counts: {
        words: Object.values(topic.words).reduce((sum, group) => sum + group.items.length, 0),
        exercises: topic.exercises.length,
        questions: topic.beats.filter((beat) => beat.question).length,
      },
    });
  }
  const orders = levelTopics.map((t) => t.order);
  if (new Set(orders).size !== orders.length) fail(level.id, `повторяется порядковый номер темы: ${orders.join(", ")}`);
  levelTopics.sort((a, b) => a.order - b.order);
  catalog.levels.push({ ...level, topics: levelTopics });
}
const ids = topics.map((t) => t.id);
for (const id of ids) if (ids.indexOf(id) !== ids.lastIndexOf(id)) fail(id, "две темы с одним id");

// Контрольные ситуации живут отдельно от уроков и участвуют в том же аудиокэше.
const assessments = [];
const assessmentDir = path.join(contentDir, "assessments");
if (existsSync(assessmentDir) && !ONLY) for (const file of readdirSync(assessmentDir).filter(f => f.endsWith(".yaml")).sort()) {
  const where = `assessments/${file}`;
  const source = load(path.join(assessmentDir, file), where);
  if (!source) continue;
  unknownKeys(source, ["id", "level", "title", "intro", "mode", "sections", "tasks", "dialogues", "review"], where);
  if (!/^[a-z0-9-]+$/.test(source.id ?? "") || assessments.some(a => a.id === source.id) || ids.includes(source.id)) fail(where, "нужен уникальный id");
  const level = catalog.levels.find(l => l.id === source.level);
  if (!level || !source.title || !["review", "mock"].includes(source.mode)) fail(where, "нужны уровень, название и mode");
  const dialogues = mapEach(source.dialogues, (d, key) => buildDialogue(d, `${where} → dialogues.${key}`));
  const tasks = mapEach(source.tasks, (t, key) => buildTask(t, `${where} → tasks.${key}`, dialogues));
  const sections = source.sections ?? [];
  if (!Array.isArray(sections) || !sections.length) fail(where, "нужны sections");
  const sectionIds = new Set();
  const used = [];
  for (const section of sections) {
    if (!section.id || sectionIds.has(section.id) || !section.title || !Array.isArray(section.taskIds) || !section.taskIds.length || section.taskIds.some(id => !tasks[id]) || section.minutes !== undefined && (!Number.isFinite(section.minutes) || section.minutes <= 0)) fail(where, "неверный раздел контрольной работы");
    sectionIds.add(section.id);
    used.push(...(section.taskIds ?? []));
  }
  if (new Set(used).size !== used.length || Object.keys(tasks).some(id => !used.includes(id))) fail(where, "каждое задание должно входить ровно в один раздел");
  for (const [key, task] of Object.entries(tasks)) {
    if (!level?.examInfo?.modules.some(m => m.parts.some(p => p.id === task.part))) fail(where, `часть ${task.part} не относится к уровню`);
    if (!["worksheet", "message", "card"].includes(task.kind)) fail(where, `неподдерживаемый контрольный формат ${key}`);
  }
  for (const link of source.review ?? []) if (!topics.some(t => t.id === link.topic && t.level === link.level)) fail(where, "неизвестная тема повторения");
  assessments.push({ ...source, tasks, dialogues });
}
catalog.assessments = assessments.map(({ id, level, title, intro, mode }) => ({ id, level, title, intro, mode }));

// Озвучка истории входит в общий учёт: манифест, импорт и защита от удаления те же.
const storyAudio = {};
for (const { text, voice } of storyLines(storyEpisodes, storyPhrases)) {
  const src = speak(text, voice);
  if (src) storyAudio[audioKey(text, voice)] = src;
}

// Словарь уроков A1 для игр со словами: перевод и готовая озвучка без новых записей.
const a1Words = {};
for (const topic of topics.filter((t) => t.level === "a1")) {
  for (const group of Object.values(topic.words)) {
    for (const word of group.items) {
      const key = plain(word.de);
      a1Words[key] ??= { ru: word.ru, ...(word.audio ? { audio: word.audio } : {}) };
    }
  }
}
if (!ONLY) {
  for (const word of storyWords(storyEpisodes)) {
    if (!a1Words[word]) fail("story", `слова «${word}» нет в словаре уроков A1`);
  }
}

// Правила игры — фрагменты разбора уроков A1: текст и схема берутся отсюда, а не копируются руками.
const storyRules = {};
if (!ONLY) {
  const storyBeats = storyEpisodes.flatMap((episode) => episode.beats);
  for (const [step, refs] of Object.entries(stepRules)) {
    if (!storyBeats.some((beat) => beat.id === step)) fail("story", `правило для неизвестного шага ${step}`);
    for (const ref of refs) {
      if (storyRules[ref]) continue;
      const [topicId, beatId] = ref.split("/");
      const topic = topics.find((t) => t.level === "a1" && t.id === topicId);
      const beat = topic?.beats.find((b) => b.id === beatId);
      const { view, table, rows, focus } = beat?.scene ?? {};
      if (view !== "table" && view !== "sentence") {
        fail("story", `правило ${ref}: нужен фрагмент урока с таблицей или схемой`);
        continue;
      }
      storyRules[ref] = {
        point: beat.point,
        read: beat.read,
        ...(view === "table" ? { table: topic.tables[table] } : { rows }),
        ...(focus ? { focus } : {}),
      };
    }
  }
}

for (const message of warnings) console.warn(`  ! ${message}`);
if (errors.length) {
  console.error(`\n${errors.length} ошибок в контенте:\n`);
  for (const message of errors) console.error(`  ✗ ${message}`);
  process.exit(1);
}

const manifestIndex = process.argv.indexOf("--audio-manifest");
if (manifestIndex > 0) {
  if (CHECK) throw new Error("--audio-manifest нельзя использовать вместе с --check");
  const target = process.argv[manifestIndex + 1];
  if (!target || target.startsWith("--")) throw new Error("Укажите путь после --audio-manifest");
  // --missing: только фразы без готовой записи — для доозвучки одной темы.
  const missingOnly = process.argv.includes("--missing");
  const entries = [...audio]
    .filter(([file]) => !missingOnly || !existsSync(path.join(audioDir, file)))
    .map(([file, entry]) => ({ file, ...entry }));
  writeJson(path.resolve(target), entries);
  console.log(`Манифест: ${entries.length} фраз${missingOnly ? " без записи" : ""} → ${target}`);
  process.exit(0);
}

const summary = catalog.levels
  .filter((level) => level.topics.length)
  .map((level) => `${level.code}: тем — ${level.topics.length}`)
  .join(", ");

if (CHECK) {
  console.log(`Контент в порядке — ${summary}, фраз для озвучки — ${audio.size}.`);
  process.exit(0);
}

const synthesized = DRAFT ? 0 : await synthesize();

mkdirSync(path.join(generatedDir, "topics"), { recursive: true });
writeJson(path.join(generatedDir, "catalog.json"), catalog);
writeJson(path.join(generatedDir, "story-audio.json"), storyAudio);
writeJson(path.join(generatedDir, "a1-words.json"), a1Words);
if (!ONLY) writeJson(path.join(generatedDir, "story-rules.json"), storyRules);
for (const file of readdirSync(path.join(generatedDir, "topics"))) {
  if (!ids.includes(file.replace(/\.json$/, ""))) rmSync(path.join(generatedDir, "topics", file));
}
for (const topic of topics) writeJson(path.join(generatedDir, "topics", `${topic.id}.json`), topic);
mkdirSync(path.join(generatedDir, "assessments"), { recursive: true });
for (const file of readdirSync(path.join(generatedDir, "assessments"))) if (!assessments.some(a => `${a.id}.json` === file)) rmSync(path.join(generatedDir, "assessments", file));
for (const assessment of assessments) writeJson(path.join(generatedDir, "assessments", `${assessment.id}.json`), assessment);
if (DRAFT) {
  console.log(`${summary}; ЧЕРНОВИК: ${missingAudio} фраз без записи (кнопки озвучки у них скрыты). Не коммитьте эту сборку.`);
} else {
  pruneAudio();
  console.log(`${summary}; фраз в озвучке — ${audio.size}, новых — ${synthesized} → public/audio`);
}

// ───────────────────────────── темы ─────────────────────────────

function buildTopic(src, level, where) {
  const known = [
    "id", "order", "title", "ru", "lede", "goals", "grammar", "exam", "chapters",
    "dialogues", "words", "tables", "tasks", "steps", "exercises", "case", "spy", "adventure",
  ];
  unknownKeys(src, known, where);
  for (const field of ["id", "order", "title", "ru", "lede", "goals", "grammar", "exam", "steps", "exercises"]) {
    if (src[field] === undefined) fail(where, `нет поля ${field}`);
  }
  if (errors.length && !src.steps) return null;
  if (!/^[a-z0-9-]+$/.test(src.id ?? "")) fail(where, `id «${src.id}» — только латиница в нижнем регистре, цифры и дефис`);
  const id = src.id;
  const validParts = new Set(level.examInfo?.modules.flatMap(m => m.parts.map(p => p.id)) ?? []);
  for (const part of src.exam ?? []) if (!validParts.has(part)) fail(where, `неизвестная часть экзамена ${part}`);

  markup(src.lede, where);
  for (const goal of src.goals ?? []) markup(goal, where);
  const chapters = src.chapters ?? levelsDoc.chapters;
  const dialogues = mapEach(src.dialogues, (d, key) => buildDialogue(d, `${where} → dialogues.${key}`));
  const words = mapEach(src.words, (g, key) => buildWords(g, `${where} → words.${key}`));
  const tables = mapEach(src.tables, (t, key) => buildTable(t, `${where} → tables.${key}`));
  const tasks = mapEach(src.tasks, (t, key) => buildTask(t, `${where} → tasks.${key}`, dialogues));
  const content = { dialogues, words, tables, tasks };

  const beats = [];
  let state = {};
  const usedChapters = new Set();
  (src.steps ?? []).forEach((step, stepIndex) => {
    const sw = `${where} → steps[${stepIndex}]${step.id ? ` (${step.id})` : ""}`;
    unknownKeys(step, ["id", "chapter", "title", "beats"], sw);
    const chapterIndex = chapters.findIndex((c) => c.id === step.chapter);
    if (chapterIndex < 0) fail(sw, `неизвестная глава ${step.chapter}`);
    usedChapters.add(step.chapter);
    if (!step.title) fail(sw, "нет title");
    markup(step.title, sw);
    if (!step.beats?.length) return fail(sw, "нет фрагментов");
    step.beats.forEach((beat, indexInStep) => {
      const bw = `${sw} → beats[${indexInStep}]`;
      unknownKeys(beat, ["read", "point", "question", "set", "before"], bw);
      if (!beat.read?.trim()) fail(bw, "пустое поле read");
      if (!beat.point?.trim()) fail(bw, "пустое поле point — тезис для шпаргалки");
      else if (beat.point.length > 120) fail(bw, `point длиннее 120 символов (${beat.point.length})`);
      if (beat.question && beat.question.length > 90) fail(bw, `question длиннее 90 символов`);
      if (beat.before && !beat.question) fail(bw, "before бывает только у вопроса");
      markup(beat.read, bw);
      markup(beat.point, bw);
      markup(beat.question, bw);

      const before = beat.question ? applySet(state, beat.before, content, `${bw} → before`) : undefined;
      const scene = applySet(before ?? state, beat.set, content, `${bw} → set`);
      if (!scene.view) fail(bw, "сцена пуста — первый фрагмент должен задать view");
      checkMentions(scene, `${beat.read ?? ""} ${beat.question ?? ""}`, content, bw);
      if (before) checkMentions(before, beat.question, content, `${bw} (до ответа)`);
      beats.push({
        id: `${step.id ?? stepIndex}-${indexInStep + 1}`,
        step: step.id,
        stepTitle: step.title,
        chapterIndex,
        indexInStep,
        read: beat.read?.trim(),
        point: beat.point?.trim(),
        ...(beat.question ? { question: beat.question, ...(beat.before ? { sceneBefore: before } : {}) } : {}),
        scene,
      });
      state = scene;
    });
  });
  for (const chapter of chapters) if (!usedChapters.has(chapter.id)) warn(where, `глава «${chapter.title}» пуста`);
  if (!beats.some((b) => b.question)) warn(where, "в теме нет ни одного вопроса с ответом под кнопкой");

  const exercises = (src.exercises ?? []).map((ex, i) => buildExercise(ex, `${where} → exercises[${i}]`, `${id}-${i + 1}`));
  if (exercises.length < 8) warn(where, `всего ${exercises.length} упражнений, лучше 8–14`);
  const investigation = src.case ? buildCase(src.case, `${where} → case`) : null;
  const spy = buildSpy(src.spy ?? [], beats, `${where} → spy`);
  const adventure = src.adventure ? buildAdventure(src.adventure, dialogues, tasks, `${where} → adventure`, investigation) : null;

  return {
    id,
    level: level.id,
    order: src.order,
    title: src.title,
    ru: src.ru,
    lede: src.lede?.trim(),
    goals: src.goals ?? [],
    grammar: src.grammar ?? [],
    exam: src.exam ?? [],
    chapters,
    dialogues,
    words,
    tables,
    tasks,
    beats,
    exercises,
    ...(investigation ? { case: investigation } : {}),
    ...(adventure ? { adventure } : {}),
    spy,
  };
}

function buildAdventure(a, dialogues, tasks, where, investigation) {
  const quotes = (ref, label) => {
    if (ref && Object.hasOwn(ref, "task")) {
      unknownKeys(ref, ["task"], `${where} → ${label}`);
      const task = tasks[ref.task];
      const text = task?.points?.length ? [task.situation, task.text, ...task.points].filter(Boolean).join("\n\n") : task?.text ?? (task?.kind === "form" ? task.situation : task?.kind === "ads" ? [task.situation, ...task.options.map((option, index) => `${String.fromCharCode(97 + index)}) ${option.title}\n${option.text}`)].join("\n\n") : null);
      if (!text) { fail(where, `${label}: задание должно содержать текст или объявления`); return []; }
      return [{ de: text, ...(task.audio ? { audio: task.audio } : {}), name: task.from ?? task.title ?? ref.task }];
    }
    if (ref && Object.hasOwn(ref, "caseStep")) {
      unknownKeys(ref, ["caseStep", "evidence"], `${where} → ${label}`);
      const quote = Number.isInteger(ref.caseStep) && Number.isInteger(ref.evidence) && investigation?.steps[ref.caseStep]?.evidence[ref.evidence];
      if (!quote || quote.kind !== "quote") { fail(where, `${label}: нет озвученной реплики дела`); return []; }
      return [{ de: quote.de, audio: quote.audio, name: investigation.people[quote.who].name }];
    }
    if (!ref || !dialogues[ref.dialogue] || !Array.isArray(ref.lines) || !ref.lines.length) {
      fail(where, `${label}: укажите dialogue и непустой список lines`);
      return [];
    }
    unknownKeys(ref, ["dialogue", "lines"], `${where} → ${label}`);
    const d = dialogues[ref.dialogue];
    return ref.lines.flatMap((index) => {
      if (!Number.isInteger(index) || !d.lines[index]) { fail(where, `${label}: нет реплики ${index}`); return []; }
      const line = d.lines[index];
      return [{ de: line.de, audio: line.audio, name: d.people[line.who].name }];
    });
  };
  for (const key of ["title", "intro"]) {
    if (typeof a[key] !== "string" || !a[key].trim()) fail(where, `нет текста ${key}`);
    else markup(a[key], where);
  }
  const challengeIds = new Set();
  if (a.challenges !== undefined && !Array.isArray(a.challenges)) fail(where, "challenges должен быть списком");
  const challenges = (Array.isArray(a.challenges) ? a.challenges : []).map((c, index) => {
    const cw = `${where} → challenges[${index}]`;
    unknownKeys(c, ["id", "kind", "title", "intro", "success", "wrong", "clue", "tokens", "label", "options", "answer", "slots", "anchor", "mode", "items", "initial", "minuteStep", "fields", "start", "nodes", "variants", "alternatives"], cw);
    if (!/^[a-z][a-z0-9-]*$/.test(c.id ?? "") || challengeIds.has(c.id)) fail(cw, "id шагов должны быть уникальными");
    challengeIds.add(c.id);
    for (const key of ["title", "intro", "success", "wrong"]) {
      if (typeof c[key] !== "string" || !c[key].trim()) fail(cw, `нет текста ${key}`);
      else markup(c[key], cw);
    }
    if (c.mode !== undefined && !["reading", "listening"].includes(c.mode)) fail(cw, "mode должен быть reading или listening");
    const base = { id: c.id, kind: c.kind, title: c.title, intro: c.intro, success: c.success, wrong: c.wrong, ...(c.mode ? { mode: c.mode } : {}),
      ...(c.clue ? { quotes: quotes(c.clue, `challenges[${index}].clue`) } : {}) };
    if (c.variants) {
      if (!Array.isArray(c.variants) || !c.variants.length || c.variants.some(v => v.variants)) fail(cw, "variants: нужен непустой список без вложенных вариантов");
      else base.variants = buildAdventure({kind:"sequence",title:a.title,intro:a.intro,ending:a.ending ?? "Готово",challenges:c.variants},dialogues,tasks,cw,investigation).challenges;
    }
    if (c.kind === "note") {
      if (!c.fields?.length || c.fields.some(f => !f.label || !f.answers?.length || f.answers.some(v => typeof v !== "string" || !v.trim()))) fail(cw,"note требует поля и допустимые ответы");
      return {...base, fields:c.fields};
    }
    if (c.kind === "negotiation") {
      const nodes = c.nodes ?? [];
      const ids = new Set(nodes.map(n => n.id));
      if (ids.size !== nodes.length || !ids.has(c.start) || !nodes.some(n => n.terminal)) fail(cw,"диалогу нужны start, уникальные узлы и завершение");
      for (const n of nodes) if (!n.text || !Array.isArray(n.choices) || (!n.terminal && !n.choices.length) || n.choices.some(o => !o.label || !o.feedback || !ids.has(o.next))) fail(cw,"неверный узел диалога");
      const reaches = (id,seen=new Set()) => {if(seen.has(id)) return false;seen.add(id);const n=nodes.find(n=>n.id===id);return Boolean(n?.terminal || n?.choices.some(o=>reaches(o.next,new Set(seen))));};
      for(const n of nodes) if(!reaches(n.id)) fail(cw,"из каждого узла должен быть путь к завершению");
      return {...base,start:c.start,nodes};
    }
    if (c.kind === "order") {
      if (!Array.isArray(c.tokens) || c.tokens.length < 2 || c.tokens.length > 16 || c.tokens.some((t) => typeof t !== "string" || !t.trim())) fail(cw, "tokens: нужны 2–16 непустых фрагментов");
      if (typeof c.label !== "string" || !c.label.trim()) fail(cw, "нужна подпись label");
      for (const token of c.tokens ?? []) { markup(token, cw); german(token, cw); }
      return { ...base, tokens: c.tokens, label: c.label };
    }
    if (c.kind === "quantity") {
      if (!Array.isArray(c.items) || c.items.length < 1) fail(cw, "quantity требует непустой список items");
      const ids = new Set();
      const items = (Array.isArray(c.items) ? c.items : []).map((item) => {
        unknownKeys(item, ["id", "label", "unit", "pluralUnit", "icon", "answer", "step", "max"], cw);
        if (!/^[a-z][a-z0-9-]*$/.test(item.id ?? "") || ids.has(item.id)) fail(cw, "id товаров должны быть уникальными");
        ids.add(item.id);
        if (typeof item.label !== "string" || !item.label.trim() || typeof item.unit !== "string" || !item.unit.trim()) fail(cw, "товару нужны label и unit");
        if (!Number.isInteger(item.step) || item.step <= 0 || !Number.isInteger(item.max) || item.max <= 0 || item.max % item.step !== 0 || !Number.isInteger(item.answer) || item.answer < 0 || item.answer > item.max || item.answer % item.step !== 0) fail(cw, "неверное количество, шаг или максимум товара");
        return { ...item };
      });
      return { ...base, items };
    }
    if (c.kind === "clock") {
      const minuteStep = c.minuteStep ?? 5;
      if (!Number.isInteger(minuteStep) || minuteStep <= 0 || 60 % minuteStep !== 0) fail(cw, "minuteStep должен делить 60 без остатка");
      let answer = "00:00", initial = "12:00";
      try {
        const target = uhrzeit(c.answer);
        const start = uhrzeit(c.initial ?? "12:00");
        answer = target.time; initial = start.time;
        if (target.minutes % minuteStep || start.minutes % minuteStep) fail(cw, "время должно быть достижимо с заданным шагом минут");
      } catch (error) { fail(cw, error.message); }
      return { ...base, answer, initial, minuteStep };
    }
    if (c.kind === "select" || c.kind === "pack" || c.kind === "match") {
      if (!Array.isArray(c.options) || c.options.length < 2) fail(cw, "нужно хотя бы два варианта options");
      const optionIds = new Set();
      const options = (Array.isArray(c.options) ? c.options : []).map((option) => {
        unknownKeys(option, ["id", "label", "icon"], cw);
        if (!/^[a-z][a-z0-9-]*$/.test(option.id ?? "") || optionIds.has(option.id)) fail(cw, "id вариантов должны быть уникальными: латиница, цифры, дефис");
        optionIds.add(option.id);
        if (typeof option.label !== "string" || !option.label.trim()) fail(cw, "нужна подпись варианта label");
        else markup(option.label, cw);
        return { id: option.id, label: option.label, ...(option.icon ? { icon: option.icon } : {}) };
      });
      if (c.kind === "match") {
        if (!Array.isArray(c.slots) || c.slots.length < 2) fail(cw, "нужно хотя бы два поля slots");
        const slotIds = new Set();
        const slots = (Array.isArray(c.slots) ? c.slots : []).map((slot) => {
          unknownKeys(slot, ["id", "label", "icon", "answer"], cw);
          if (!/^[a-z][a-z0-9-]*$/.test(slot.id ?? "") || slotIds.has(slot.id)) fail(cw, "id полей должны быть уникальными");
          slotIds.add(slot.id);
          if (typeof slot.label !== "string" || !slot.label.trim()) fail(cw, "нужна подпись поля label");
          else markup(slot.label, cw);
          if (!optionIds.has(slot.answer)) fail(cw, `slots.${slot.id}.answer не найден среди вариантов`);
          return { id: slot.id, label: slot.label, answer: slot.answer, ...(slot.icon ? { icon: slot.icon } : {}) };
        });
        if (c.anchor !== undefined && (typeof c.anchor !== "string" || !c.anchor.trim())) fail(cw, "anchor должен быть непустым текстом");
        return { ...base, options, slots, ...(c.anchor ? { anchor: c.anchor } : {}) };
      }
      if (!Array.isArray(c.answer) || !c.answer.length || c.answer.some((id) => !optionIds.has(id)) || new Set(c.answer).size !== c.answer.length || (c.kind === "select" && c.answer.length !== 1)) fail(cw, "answer должен содержать правильные id вариантов");
      if(c.alternatives && (!Array.isArray(c.alternatives) || c.alternatives.some(a=>!Array.isArray(a) || !a.length || a.some(id=>!optionIds.has(id)) || new Set(a).size!==a.length || c.kind === "select" && a.length!==1))) fail(cw,"неверные альтернативные решения");
      return { ...base, options, answer: c.answer, ...(c.alternatives?{alternatives:c.alternatives}:{}) };
    }
    fail(cw, "kind шага должен быть order, select, pack, match, quantity или clock");
    return base;
  });
  if (a.kind === "sequence") {
    unknownKeys(a, ["kind", "title", "intro", "ending", "challenges"], where);
    if (!challenges.length) fail(where, "sequence требует хотя бы один шаг challenges");
    if (typeof a.ending !== "string" || !a.ending.trim()) fail(where, "нужен текст ending");
    else markup(a.ending, where);
    return { kind: a.kind, title: a.title, intro: a.intro, ending: a.ending, challenges };
  }
  if (a.kind === "crew") {
    unknownKeys(a, ["kind", "title", "intro", "origins", "places", "members", "contact", "challenges"], where);
    for (const key of ["origins", "places"]) {
      if (!Array.isArray(a[key]) || a[key].length < 2 || a[key].some((v) => typeof v !== "string") || new Set(a[key]).size !== a[key].length) fail(where, `${key}: нужны разные текстовые варианты`);
    }
    if (!Array.isArray(a.members) || a.members.length < 2) { fail(where, "нужно хотя бы два участника"); return null; }
    const ids = new Set();
    const members = a.members.map((m) => {
      unknownKeys(m, ["id", "name", "origin", "home", "clue"], where);
      if (!/^[a-z][a-z0-9-]*$/.test(m.id ?? "") || ids.has(m.id)) fail(where, "id участников должны быть уникальными");
      ids.add(m.id);
      if (!m.name || !a.origins?.includes(m.origin) || !a.places?.includes(m.home)) fail(where, `неверные данные участника ${m.id}`);
      return { id: m.id, name: m.name, origin: m.origin, home: m.home, quotes: quotes(m.clue, m.id) };
    });
    if (!a.contact || !ids.has(a.contact.answer)) fail(where, "contact.answer должен ссылаться на участника");
    else {
      unknownKeys(a.contact, ["question", "answer", "success", "wrong"], where);
      for (const key of ["question", "success", "wrong"]) {
        if (typeof a.contact[key] !== "string" || !a.contact[key].trim()) fail(where, `нет contact.${key}`);
        else markup(a.contact[key], where);
      }
    }
    return { kind: a.kind, title: a.title, intro: a.intro, origins: a.origins, places: a.places, members, contact: a.contact, challenges };
  }
  if (a.kind === "harbor") {
    unknownKeys(a, ["kind", "title", "intro", "berths", "berth", "directions", "phone", "phoneClue", "phoneHelp", "roomTask", "challenges"], where);
    if (!Array.isArray(a.berths) || a.berths.length < 2 || a.berths.some((n) => !Number.isInteger(n)) || new Set(a.berths).size !== a.berths.length || !a.berths.includes(a.berth)) fail(where, "неверные номера причалов");
    if (typeof a.phone !== "string" || !/^\d{6,15}$/.test(a.phone)) fail(where, "phone должен быть строкой из 6–15 цифр");
    const task = tasks[a.roomTask];
    if (!task || task.kind !== "listen" || !task.text || !Array.isArray(task.options) || typeof task.answer !== "number") fail(where, "roomTask должен ссылаться на аудиозадание с вариантами");
    return { kind: a.kind, title: a.title, intro: a.intro, berths: a.berths, berth: a.berth,
      directions: quotes(a.directions, "directions"), phone: a.phone, phoneClue: quotes(a.phoneClue, "phoneClue"), phoneHelp: quotes(a.phoneHelp, "phoneHelp"),
      room: task ? { text: task.text, audio: task.audio, options: task.options, answer: task.answer } : null, challenges };
  }
  fail(where, "kind должен быть crew, harbor или sequence");
  return null;
}

function buildDialogue(d, where) {
  unknownKeys(d, ["title", "ru", "place", "people", "lines"], where);
  if (!d.title) fail(where, "нет title");
  const people = {};
  for (const [key, person] of Object.entries(d.people ?? {})) {
    unknownKeys(person, ["name", "voice"], `${where} → people.${key}`);
    const voice = person.voice ?? DEFAULT_VOICE;
    if (!VOICES.includes(voice)) fail(where, `голос ${voice} неизвестен; есть ${VOICES.join(", ")}`);
    people[key] = { name: person.name ?? key, voice };
  }
  if (!Object.keys(people).length) fail(where, "нет people");
  const lines = (d.lines ?? []).map((line, i) => {
    const lw = `${where} → lines[${i}]`;
    const speakers = Object.keys(line).filter((k) => k !== "ru");
    if (speakers.length !== 1 || !people[speakers[0]]) {
      fail(lw, `строка должна выглядеть как «A: текст» + «ru: перевод»; ключи: ${Object.keys(line).join(", ")}`);
      return null;
    }
    const who = speakers[0];
    const de = String(line[who]).trim();
    if (!line.ru) fail(lw, "нет перевода ru");
    markup(de, lw);
    german(de, lw);
    german(d.title, where);
    return { who, de, ru: line.ru, audio: speak(de, people[who].voice) };
  }).filter(Boolean);
  if (!lines.length) fail(where, "нет реплик");
  return { title: d.title, ru: d.ru, place: d.place, people, lines };
}

function buildWords(group, where) {
  unknownKeys(group, ["title", "ru", "items"], where);
  if (!group.title) fail(where, "нет title");
  const items = (group.items ?? []).map((item, i) => {
    const iw = `${where} → items[${i}]`;
    unknownKeys(item, ["de", "ru", "pl", "note"], iw);
    const de = String(item.de ?? "").trim();
    if (!de || !item.ru) fail(iw, "у слова нужны de и ru");
    markup(de, iw);
    german(de, iw);
    german(item.pl === undefined ? undefined : String(item.pl), iw);
    const noun = /^(der|die|das) \S/.exec(de);
    let gender = null;
    let plural = null;
    if (noun) {
      gender = { der: "m", die: "f", das: "n" }[noun[1]];
      if (item.pl === undefined) fail(iw, `«${de}»: у существительного нужен pl (множественное число без артикля, «-» если его нет, «pl» если слово только во мн. ч.)`);
      else if (item.pl === "pl") gender = "pl";
      else if (item.pl !== "-") plural = String(item.pl);
    } else if (item.pl !== undefined) fail(iw, `«${de}»: pl бывает только у существительного с артиклем`);
    const spoken = plural ? `${plain(de)}, die ${plain(plural)}` : plain(de);
    return {
      de,
      ru: item.ru,
      gender,
      plural,
      ...(item.pl === "-" ? { noPlural: true } : {}),
      ...(item.note ? { note: item.note } : {}),
      audio: speak(spoken),
    };
  });
  if (!items.length) fail(where, "нет слов");
  return { title: group.title, ru: group.ru, items };
}

function buildTable(t, where) {
  unknownKeys(t, ["title", "ru", "head", "rows", "ruCols", "note"], where);
  if (!t.title) fail(where, "нет title");
  if (!Array.isArray(t.head) || !Array.isArray(t.rows)) {
    fail(where, "нужны head и rows");
    return { title: t.title, head: [], rows: [] };
  }
  t.rows.forEach((row, i) => {
    if (!Array.isArray(row) || row.length !== t.head.length) {
      fail(where, `строка ${i + 1}: ${Array.isArray(row) ? row.length : "?"} ячеек вместо ${t.head.length} — нет ли запятой без кавычек?`);
    }
    (row ?? []).forEach((cell, j) => {
      markup(String(cell), where);
      if (!(t.ruCols ?? []).includes(j)) german(String(cell ?? ""), `${where} → строка ${i + 1}`);
    });
  });
  return {
    title: t.title,
    ru: t.ru,
    head: t.head.map(String),
    rows: t.rows.map((row) => row.map((cell) => (cell === null ? "" : String(cell)))),
    ruCols: t.ruCols ?? [],
    note: t.note,
  };
}

function buildTask(t, where, dialogues) {
  const known = [
    "kind", "part", "title", "situation", "text", "from", "to", "subject", "fields", "words",
    "theme", "word", "picture", "statement", "question", "options", "answer", "sample", "points", "voice", "dialogue", "choose", "format", "questions", "recordings", "roles", "uniqueOptions", "reusableOptions",
  ];
  unknownKeys(t, known, where);
  if (!TASK_KINDS.includes(t.kind)) fail(where, `kind должен быть одним из: ${TASK_KINDS.join(", ")}`);
  if (!examParts.has(t.part)) fail(where, `неизвестная часть экзамена ${t.part}`);
  for (const field of ["situation", "text", "statement", "question"]) markup(t[field], where);
  for (const field of ["title", "situation", "text", "statement", "question", "theme", "word", "subject"]) german(t[field], `${where} → ${field}`);
  for (const line of [...(t.sample ?? []), ...(t.words ?? []), ...(t.points ?? [])]) german(String(line), where);
  for (const option of t.options ?? []) german(typeof option === "string" ? option : `${option?.title} ${option?.text}`, `${where} → options`);
  for (const f of t.fields ?? []) german(`${f.label} ${f.value}`, `${where} → fields`);
  const need = (...fields) => fields.forEach((f) => t[f] === undefined && fail(where, `для kind: ${t.kind} нужно поле ${f}`));
  if (t.choose !== undefined && (!Number.isInteger(t.choose) || t.choose < 1 || t.choose > (t.points?.length ?? 0))) fail(where,"choose должен быть в пределах points");
  if(t.part === "b1-schreiben-1" && (t.kind !== "message" || t.choose !== undefined || !Array.isArray(t.points) || t.points.length !== 4)) fail(where,"B1 Schreiben: message с четырьмя обязательными points, без choose");
  if(t.kind === "worksheet") {
    need("format","questions");
    if(!["notes","directory","article","matching","radio","pair","cloze"].includes(t.format)) fail(where,"неверный формат worksheet");
    if(!Array.isArray(t.questions) || !t.questions.length || t.questions.some(q=>!q.prompt || !q.answers?.length || q.answers.some(a=>typeof a!=="string" || !a.trim()) || q.options && q.answers.some(a=>!q.options.includes(a)))) fail(where,"вопросу нужны prompt и допустимые answers");
  }
  if (t.format === "cloze") {
    const gaps = [...String(t.text ?? "").matchAll(/\[\[(\d+)\]\]/g)].map(m=>Number(m[1]));
    if (t.kind!=="worksheet" || !gaps.length || gaps.length!==t.questions?.length || gaps.some((n,i)=>n!==i+1) || t.questions?.some(q=>!q.options)) fail(where,"cloze: текст с последовательными [[1]]…[[N]] и выбором для каждого пропуска");
  }
  if(t.reusableOptions !== undefined && (!t.uniqueOptions || !Array.isArray(t.reusableOptions) || t.reusableOptions.some(o=>typeof o!=="string" || !t.questions?.every(q=>q.options?.includes(o))))) fail(where,"reusableOptions: исключения должны быть вариантами каждого вопроса uniqueOptions");
  if (t.uniqueOptions !== undefined) {
    if (typeof t.uniqueOptions !== "boolean" || t.kind !== "worksheet") fail(where, "uniqueOptions: логическое поле worksheet");
    if (t.uniqueOptions && (!Array.isArray(t.questions) || t.questions.some(q => !Array.isArray(q.options) || q.answers?.length !== 1) || new Set(t.questions.map(q => q.answers?.[0]).filter(a=>!t.reusableOptions?.includes(a))).size !== t.questions.filter(q=>!t.reusableOptions?.includes(q.answers?.[0])).length)) fail(where, "uniqueOptions: у каждого вопроса один правильный вариант, ответы не повторяются");
  }
  if (t.kind === "form") need("fields");
  if (t.kind === "keywords") need("words");
  if (t.kind === "card") need("word");
  if (t.roles !== undefined && (t.kind !== "card" || !Array.isArray(t.roles) || t.roles.length !== 2 || t.roles.some(r => !r.title || !r.text))) fail(where,"roles: нужны две карточки собеседников");
  if (t.kind === "sign") need("text", "statement", "answer");
  if (t.kind === "message") need("text");
  // Запись для Hören — либо text одним голосом, либо dialogue: разговор с голосами героев.
  if (t.kind === "listen") {
    need("answer");
    if (!t.text === !t.dialogue) fail(where, "у listen нужен либо text (один голос), либо dialogue (id диалога)");
    if (t.dialogue && !dialogues[t.dialogue]) fail(where, `dialogue: ${t.dialogue} не найден`);
  } else if (t.dialogue && t.kind !== "worksheet") fail(where, "dialogue бывает у listen или worksheet");
  if(t.kind === "worksheet" && t.dialogue && !dialogues[t.dialogue]) fail(where,"нет диалога worksheet");
  if (t.kind === "ads") need("situation", "options", "answer");
  if (t.kind === "listen" && !t.question && !t.statement) fail(where, "у listen нужен question с options или statement");
  if (t.statement !== undefined && typeof t.answer !== "boolean") fail(where, "у statement ответ answer: true (richtig) или false (falsch)");
  if (t.options && t.statement === undefined) {
    if (!Number.isInteger(t.answer) || t.answer < 0 || t.answer >= t.options.length) fail(where, "answer — номер правильного варианта с нуля");
  }
  const fields = (t.fields ?? []).map((f, i) => {
    unknownKeys(f, ["label", "value", "given"], `${where} → fields[${i}]`);
    return { label: f.label, value: String(f.value ?? ""), given: Boolean(f.given) };
  });
  if(t.recordings && (t.kind!=="worksheet" || !Array.isArray(t.recordings) || t.recordings.length!==t.questions?.length || t.recordings.some(r=>!r.text?.trim()))) fail(where,"recordings: по одной непустой записи на вопрос worksheet");
  const recordings=Array.isArray(t.recordings)?t.recordings.filter(r=>typeof r?.text === "string" && r.text.trim()).map(r=>({text:r.text,audio:speak(r.text,r.voice ?? t.voice ?? DEFAULT_VOICE)})):undefined;
  const voice = t.voice ?? DEFAULT_VOICE;
  return {
    ...t,
    ...(recordings?{recordings}:{}),
    ...(t.kind === "form" ? { fields } : {}),
    text: typeof t.text === "string" ? t.text.trim() : t.text,
    ...((t.kind === "listen" || t.kind === "worksheet" && t.part.includes("hoeren")) && t.text ? { audio: speak(t.text, voice) } : {}),
    ...((t.kind === "listen" || t.kind === "worksheet") && dialogues[t.dialogue]
      ? {
          script: dialogues[t.dialogue].lines.map((line) => ({
            who: dialogues[t.dialogue].people[line.who].name,
            de: line.de,
            audio: line.audio,
          })),
        }
      : {}),
    sample: (t.sample ?? []).map((line) => ({ de: line, audio: speak(line) })),
  };
}

/** Сколько элементов можно открыть в виде: строки диалога, слова, строки таблицы… */
function countOf(scene, content) {
  switch (scene.view) {
    case "dialogue": return content.dialogues[scene.dialogue]?.lines.length ?? 0;
    case "words": return content.words[scene.words]?.items.length ?? 0;
    case "table": return content.tables[scene.table]?.rows.length ?? 0;
    case "sentence": return scene.rows?.length ?? 0;
    case "task": {
      const task = content.tasks[scene.task];
      if (!task) return 0;
      return task.kind === "form" ? task.fields.filter((f) => !f.given).length : task.sample.length;
    }
    default: return 0;
  }
}

function applySet(prev, set, content, where) {
  if (!set) return prev;
  unknownKeys(set, SET_KEYS, where);
  const next = { ...prev };
  const target = (scene) => scene[VIEWS[scene.view]];
  if (set.view && !VIEWS[set.view]) fail(where, `неизвестный view ${set.view}; есть ${Object.keys(VIEWS).join(", ")}`);
  Object.assign(next, set);
  if ("rows" in set) next.rows = buildRows(set.rows, where);
  if ("time" in set) {
    try {
      next.clock = { ...uhrzeit(String(set.time)) };
      next.clock.audio = [speak(`Es ist ${next.clock.formal}.`), speak(`Es ist ${next.clock.informal}.`)];
    } catch (error) {
      fail(where, error.message);
    }
    delete next.time;
  }
  // Новый вид или новый объект на сцене: по умолчанию показан целиком, без выделения.
  const changed = next.view !== prev.view || target(next) !== target(prev) || "rows" in set;
  if (changed) {
    if (!("reveal" in set)) delete next.reveal;
    if (!("focus" in set)) delete next.focus;
    if (!("solved" in set)) delete next.solved;
  }
  if ("focus" in set) next.focus = set.focus === null ? undefined : [].concat(set.focus);
  if (next.view && next.view !== "clock" && next.view !== "sentence") {
    const key = VIEWS[next.view];
    const collection = { dialogue: content.dialogues, words: content.words, table: content.tables, task: content.tasks }[next.view];
    if (!next[key]) fail(where, `view: ${next.view} без ${key}`);
    else if (!collection[next[key]]) fail(where, `${key}: ${next[key]} не найден`);
  }
  if (next.view === "clock" && !next.clock) fail(where, "view: clock без time");
  if (next.view === "sentence" && !next.rows?.length) fail(where, "view: sentence без rows");
  const count = countOf(next, content);
  if (next.reveal !== undefined && (!Number.isInteger(next.reveal) || next.reveal < 0 || next.reveal > count)) {
    fail(where, `reveal ${next.reveal} — а в виде ${next.view} всего ${count}`);
  }
  for (const index of next.focus ?? []) {
    if (!Number.isInteger(index) || index < 0 || index >= Math.max(count, 1)) fail(where, `focus ${index} за пределами (0…${count - 1})`);
  }
  // fresh — что открылось в этом фрагменте. Новое никогда не затемняется, даже
  // если оно не в focus: иначе реплика выглядит так, будто до неё ещё дойдут.
  // У диалога новое — всё, что появилось впервые; у таблицы, слов и схемы —
  // только то, что добавилось к уже показанному объекту.
  const shown = (scene) => Math.min(scene.reveal ?? Infinity, countOf(scene, content));
  const sameObject = prev.view === next.view && (next.view === "sentence" || target(prev) === target(next));
  const range = (from, to) => Array.from({ length: Math.max(0, to - from) }, (_, i) => from + i);
  const fresh =
    next.view === "dialogue" ? range(sameObject ? shown(prev) : 0, shown(next))
    : ["table", "words", "sentence"].includes(next.view) && sameObject ? range(shown(prev), shown(next))
    : [];
  if (fresh.length) next.fresh = fresh;
  else delete next.fresh;
  return next;
}

/** Нормализованный немецкий текст для поиска упоминаний. */
function normal(text) {
  return ` ${plain(text).toLowerCase().replace(/[.,!?;:–—…«»"„“()]/g, " ").replace(/\s+/g, " ").trim()} `;
}

/**
 * Предупреждает, если текст фрагмента цитирует реплику, строку или слово,
 * которые на сцене затемнены: читатель ищет их глазами и видит серым.
 */
function checkMentions(scene, text, content, where) {
  if (!scene?.focus?.length || !text) return;
  const items =
    scene.view === "dialogue" ? content.dialogues[scene.dialogue]?.lines.map((line) => line.de)
    : scene.view === "words" ? content.words[scene.words]?.items.map((item) => item.de)
    : scene.view === "table"
      ? content.tables[scene.table]?.rows.map((row) => row.filter((_, j) => !content.tables[scene.table].ruCols.includes(j)).join(" "))
    : scene.view === "sentence" ? scene.rows?.map((row) => row.plain)
    : null;
  if (!items) return;
  const fragments = [...text.matchAll(/\*([^*]+)\*/g)]
    .map((m) => normal(m[1]))
    .filter((f) => f.trim().includes(" ") || f.trim().length >= 8);
  const shown = Math.min(scene.reveal ?? Infinity, items.length);
  for (let i = 0; i < shown; i++) {
    // Если во фрагменте есть выделение, всё, что цитирует текст, тоже должно
    // быть выделено — и затемнённое, и новое, которое просто не затемнено.
    if (scene.focus.includes(i)) continue;
    const item = normal(items[i]);
    const hit = fragments.find((f) => item.includes(f));
    const state = scene.fresh?.includes(i) ? "не выделена" : "затемнена";
    if (hit) warn(where, `«${hit.trim()}» есть в тексте, но ${scene.view === "dialogue" ? "реплика" : "строка"} ${i} ${state} — добавьте ${i} в focus`);
  }
}

/**
 * Строки схемы предложения: четыре поля — позиция 1, глагол, середина, конец.
 * Каждое слово получает ключ, чтобы при смене состояния плитка переезжала,
 * а не появлялась заново: «wohn+e» и «wohn+st» — одна плитка с новым окончанием.
 */
function buildRows(rows, where) {
  if (!Array.isArray(rows)) {
    fail(where, "rows — список строк");
    return [];
  }
  return rows.map((row, r) => {
    const rw = `${where} → rows[${r}]`;
    const slots = Array.isArray(row) ? row : row?.de;
    if (!Array.isArray(slots) || slots.length !== 4) {
      fail(rw, "в строке ровно четыре поля: [позиция 1, глагол, середина, конец]. Пустое поле — \"\"");
      return { slots: [[], [], [], []], punct: "", plain: "", ru: "" };
    }
    if (!Array.isArray(row)) unknownKeys(row, ["de", "ru"], rw);
    const seen = new Map();
    let punct = "";
    const words = slots.map((slot) => String(slot ?? "").split(/\s+/).filter(Boolean));
    const lastSlot = words.findLastIndex((w) => w.length);
    if (lastSlot >= 0) {
      const last = words[lastSlot];
      const m = /^(.*?)([.?!]+)$/.exec(last[last.length - 1]);
      if (m) {
        punct = m[2];
        if (m[1]) last[last.length - 1] = m[1];
        else last.pop();
      }
    }
    const tiles = words.map((slotWords) =>
      slotWords.map((text) => {
        markup(text, rw);
        german(text, rw);
        const base = plain(text).toLowerCase().replace(/[.,!?]/g, "");
        const stem = text.includes("+") ? plain(text.slice(0, text.indexOf("+"))).toLowerCase() : base;
        const n = seen.get(stem) ?? 0;
        seen.set(stem, n + 1);
        return { key: n ? `${stem}~${n}` : stem, text };
      }),
    );
    const sentence = words.flat().map(plain).join(" ") + punct;
    const capitalized = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    return {
      slots: tiles,
      punct,
      plain: capitalized,
      ru: Array.isArray(row) ? "" : row.ru ?? "",
      audio: speak(capitalized),
    };
  });
}

/**
 * Дело: детективная история темы. Улики — реплики свидетелей (озвучены) и
 * записки; к каждому шагу вопрос, где правильный вывод требует грамматики темы.
 */
function buildCase(c, where) {
  unknownKeys(c, ["title", "ru", "intro", "people", "steps", "ending"], where);
  for (const field of ["title", "intro", "steps", "ending"]) if (!c[field]) fail(where, `нет поля ${field}`);
  german(c.title, where);
  markup(c.intro, where);
  markup(c.ending, where);
  const people = {};
  for (const [key, person] of Object.entries(c.people ?? {})) {
    unknownKeys(person, ["name", "voice", "role"], `${where} → people.${key}`);
    const voice = person.voice ?? DEFAULT_VOICE;
    if (!VOICES.includes(voice)) fail(where, `голос ${voice} неизвестен; есть ${VOICES.join(", ")}`);
    people[key] = { name: person.name ?? key, voice, ...(person.role ? { role: person.role } : {}) };
  }
  const steps = (c.steps ?? []).map((step, i) => {
    const sw = `${where} → steps[${i}]`;
    unknownKeys(step, ["read", "evidence", "question", "options", "answer", "right", "wrong"], sw);
    for (const field of ["read", "question", "options", "right", "wrong"]) if (step[field] === undefined) fail(sw, `нет поля ${field}`);
    markup(step.read, sw);
    markup(step.question, sw);
    markup(step.right, sw);
    const options = (step.options ?? []).map(String);
    if (options.length < 2) fail(sw, "нужно хотя бы два варианта в options");
    if (!Number.isInteger(step.answer) || step.answer < 0 || step.answer >= options.length) fail(sw, "answer — номер правильного варианта с нуля");
    for (const o of options) markup(o, sw);
    // wrong — один текст для всех неверных вариантов или список по вариантам (у верного — null)
    const wrong = Array.isArray(step.wrong) ? step.wrong.map((w) => (w == null ? null : String(w))) : options.map(() => String(step.wrong ?? ""));
    if (wrong.length !== options.length) fail(sw, "wrong-список должен совпадать по длине с options");
    for (const w of wrong) markup(w ?? undefined, sw);
    const evidence = (step.evidence ?? []).map((item, j) => {
      const ew = `${sw} → evidence[${j}]`;
      const keys = Object.keys(item).filter((k) => k !== "ru");
      if (keys.length !== 1) {
        fail(ew, "улика выглядит как «X: реплика» (X из people) или «note: текст записки» + «ru: перевод»");
        return null;
      }
      const key = keys[0];
      const de = String(item[key]).trim();
      markup(de, ew);
      german(de, ew);
      if (!item.ru) fail(ew, "нет перевода ru — он откроется после разгадки");
      if (key === "note") return { kind: "note", de, ru: item.ru };
      if (!people[key]) {
        fail(ew, `неизвестный участник ${key}`);
        return null;
      }
      return { kind: "quote", who: key, de, ru: item.ru, audio: speak(de, people[key].voice) };
    }).filter(Boolean);
    return { read: step.read?.trim(), evidence, question: step.question, options, answer: step.answer, right: step.right?.trim(), wrong };
  });
  if (steps.length < 2) warn(where, "в деле меньше двух шагов");
  return { title: c.title, ru: c.ru, intro: c.intro?.trim(), people, steps, ending: c.ending?.trim() };
}

/**
 * «Шпион»: фразы, которые один из говорящих произносит с ошибкой. Авторские
 * пары из YAML дополняются автоматическими из схем предложений темы:
 * глагол не на втором месте и чужое окончание глагола.
 */
function buildSpy(items, beats, where) {
  const out = [];
  const seen = new Set();
  items.forEach((item, i) => {
    const iw = `${where}[${i}]`;
    unknownKeys(item, ["de", "wrong", "why"], iw);
    if (!item.de || !item.wrong || !item.why) return fail(iw, "у фразы шпиона нужны de, wrong и why");
    german(item.de, iw);
    german(item.wrong, iw);
    markup(item.why, iw);
    if (plain(item.de) === plain(item.wrong)) fail(iw, "wrong совпадает с de");
    seen.add(plain(item.de));
    out.push({ de: String(item.de), wrong: String(item.wrong), why: item.why });
  });
  const rows = beats.flatMap((beat) => [...(beat.scene.rows ?? []), ...(beat.sceneBefore?.rows ?? [])]);
  for (const row of rows) {
    if (seen.has(row.plain)) continue;
    seen.add(row.plain);
    const words = (tiles) => tiles.map((t) => t.text);
    const [first, verb, middle, end] = row.slots.map(words);
    const sentence = (parts) => {
      const text = parts.flat().filter(Boolean).map((w) => plain(w)).join(" ") + row.punct;
      return text.charAt(0).toUpperCase() + text.slice(1);
    };
    // Глагол сразу после первой позиции: «In Kiel wohne ich» → «In Kiel ich wohne».
    if (first.length && verb.length && middle.length && PRONOUNS.has(plain(middle[0]).toLowerCase())) {
      const wrong = sentence([first, [middle[0]], verb, middle.slice(1), end]);
      out.push({
        de: row.plain,
        wrong,
        why: `Глагол стоит на второй позиции: после *${plain(first.join(" "))}* сразу идёт *${plain(verb.join(" "))}*, а *${plain(middle[0])}* — за ним.`,
        auto: true,
      });
    }
    // Чужое окончание у спрягаемого глагола: «du wohn+st» → «du wohnt».
    const m = verb.length === 1 ? /^(.*)\+(e|st|t|en)$/.exec(verb[0]) : null;
    if (m) {
      const wrongVerb = `${m[1]}${WRONG_ENDING[m[2]]}`;
      const wrong = sentence([first, [wrongVerb], middle, end]);
      if (plain(wrong) !== row.plain) {
        out.push({
          de: row.plain,
          wrong,
          why: `Окончание глагола не подходит к подлежащему: правильно *${plain(verb[0])}*.`,
          auto: true,
        });
      }
    }
  }
  return out;
}

function buildExercise(ex, where, id) {
  unknownKeys(ex, ["type", "q", "ru", "options", "answer", "hint", "why", "de", "also"], where);
  if (!EXERCISE_TYPES.includes(ex.type)) {
    fail(where, `type должен быть одним из: ${EXERCISE_TYPES.join(", ")}`);
    return { id, type: "choice", q: "", options: [], answer: 0 };
  }
  markup(ex.q, where);
  markup(ex.why, where);
  if (ex.q?.includes("___")) german(ex.q, `${where} → q`);
  if (ex.type === "choice" && ex.q?.includes("___")) for (const o of ex.options ?? []) german(String(o), `${where} → options`);
  if (ex.type === "gap") for (const a of [].concat(ex.answer ?? [])) german(String(a), `${where} → answer`);
  if (ex.type === "order") for (const d of [ex.de, ...(ex.also ?? [])]) german(String(d ?? ""), `${where} → de`);
  if (ex.type === "choice") {
    if (!ex.q || !Array.isArray(ex.options) || ex.options.length < 2) fail(where, "choice: нужны q и options");
    if (!Number.isInteger(ex.answer) || ex.answer < 0 || ex.answer >= (ex.options?.length ?? 0)) fail(where, "choice: answer — номер правильного варианта с нуля");
    const filled = ex.q?.includes("___") ? ex.q.replace("___", ex.options?.[ex.answer] ?? "") : null;
    return { id, ...ex, options: ex.options?.map(String), ...(filled ? { audio: speak(plain(filled)) } : {}) };
  }
  if (ex.type === "gap") {
    const gaps = (ex.q?.match(/___/g) ?? []).length;
    const answer = [].concat(ex.answer ?? []).map(String);
    if (!gaps) fail(where, "gap: в q нет пропуска ___");
    if (gaps !== answer.length) fail(where, `gap: пропусков ${gaps}, а ответов ${answer.length}`);
    let filled = ex.q ?? "";
    for (const a of answer) filled = filled.replace("___", a.split("|")[0]);
    return { id, ...ex, answer, audio: speak(plain(filled)) };
  }
  // order
  if (!ex.de || String(ex.de).split(/\s+/).length < 2) fail(where, "order: нужно немецкое предложение de из двух слов и больше");
  if (!ex.ru) fail(where, "order: нужен русский перевод ru — это и есть задание");
  // Вариант, который нельзя собрать из плиток, никогда не будет принят.
  const tiles = (text) => plain(String(text)).toLowerCase().replace(/[.,!?]/g, "").split(" ").sort().join(" ");
  for (const also of ex.also ?? []) if (tiles(also) !== tiles(ex.de)) fail(where, `also «${also}»: другие слова, чем в de`);
  return { id, ...ex, de: String(ex.de ?? ""), audio: speak(plain(String(ex.de ?? ""))) };
}

// ───────────────────────────── разметка и озвучка ─────────────────────────────

/** *немецкий фрагмент* и окончание через +: wohn+st. */
function markup(text, where) {
  if (typeof text !== "string") return;
  if ((text.match(/\*/g) ?? []).length % 2) fail(where, `непарная звёздочка в «${text.slice(0, 60)}…»`);
  for (const [, fragment] of text.matchAll(/\*([^*]+)\*/g)) {
    if (/[\u0400-\u04FF]/.test(fragment) && /[A-Za-zÄÖÜäöüß]/.test(fragment)) {
      fail(where, `в немецком фрагменте *${fragment}* смешаны кириллица и латиница`);
    }
  }
}

/** В немецком тексте не должно быть кириллицы: «н» вместо «n» глазом не отличить. */
function german(text, where) {
  if (typeof text !== "string") return;
  const match = /[\u0400-\u04FF]+/.exec(text);
  if (match) fail(where, `кириллица «${match[0]}» в немецком тексте «${text.slice(0, 50)}»`);
}

function plain(text) {
  return String(text).replace(/[*+]/g, "").replace(/\s+/g, " ").trim();
}

function speak(text, voice = DEFAULT_VOICE) {
  const clean = plain(text ?? "");
  if (!clean) return undefined;
  const hash = createHash("sha1").update(`${AUDIO_VERSION}|${voice}|${clean}`).digest("hex").slice(0, 12);
  const currentFile = `${hash}.m4a`;
  const legacyHash = createHash("sha1").update(`${LEGACY_AUDIO_VERSION}|${voice}|${clean}`).digest("hex").slice(0, 12);
  const legacyFile = `${legacyHash}.m4a`;
  // Existing course audio stays intact; a missing or new phrase is always OmniVoice.
  const useLegacy =
    !revoice.has(`${voice}|${clean}`) &&
    !existsSync(path.join(audioDir, currentFile)) &&
    existsSync(path.join(audioDir, legacyFile));
  const file = useLegacy ? legacyFile : currentFile;
  const selectedConfig = useLegacy ? legacyAudioConfig : audioConfig;
  audio.set(file, { text: clean, voice, model: selectedConfig.model, revision: selectedConfig.revision });
  if (DRAFT && !existsSync(path.join(audioDir, file))) {
    missingAudio += 1;
    return undefined;
  }
  return `audio/${file}`;
}

async function synthesize() {
  const todo = [...audio].filter(([file]) => !existsSync(path.join(audioDir, file)));
  const source = process.env.AUDIO_IMPORT_DIR ? path.resolve(process.env.AUDIO_IMPORT_DIR) : null;
  if (todo.length && !source) {
    throw new Error(
      `Нет ${todo.length} записей ${audioConfig.model}. ` +
      "Экспортируйте --audio-manifest, сгенерируйте записи по scripts/tts/README.md " +
      "и запустите сборку с AUDIO_IMPORT_DIR=<каталог m4a>."
    );
  }
  // Проверяем весь набор до копирования и удаления старых записей.
  for (const [file] of todo) {
    const candidate = path.join(source, file);
    if (!existsSync(candidate) || statSync(candidate).size < 1024 ||
        readFileSync(candidate).subarray(4, 8).toString() !== "ftyp") {
      throw new Error(`Нет корректной M4A-записи: ${candidate}`);
    }
  }
  mkdirSync(audioDir, { recursive: true });
  for (const [file] of todo) copyFileSync(path.join(source, file), path.join(audioDir, file));
  return todo.length;
}

function pruneAudio() {
  // Старые URL остаются рабочими, пока все JSON не ссылаются на новые файлы.
  for (const file of readdirSync(audioDir)) {
    if (file.endsWith(".m4a") && !audio.has(file)) rmSync(path.join(audioDir, file));
  }
}

// ───────────────────────────── утилиты ─────────────────────────────

function load(file, where = path.relative(root, file)) {
  try {
    return parse(readFileSync(file, "utf8"));
  } catch (error) {
    fail(where, `YAML не читается: ${error.message.split("\n")[0]}. Строку, которая начинается с * или содержит «: », возьмите в кавычки.`);
    return null;
  }
}

function unknownKeys(object, known, where) {
  if (!object || typeof object !== "object") return;
  for (const key of Object.keys(object)) {
    if (!known.includes(key)) fail(where, `неизвестное поле «${key}» — опечатка или запятая без кавычек?`);
  }
}

function mapEach(object, build) {
  return Object.fromEntries(Object.entries(object ?? {}).map(([key, value]) => [key, build(value, key)]));
}

function writeJson(file, data) {
  writeFileSync(file, `${JSON.stringify(data, null, 1)}\n`);
}
