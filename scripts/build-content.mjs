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
const AUDIO_VERSION = createHash("sha256").update(JSON.stringify(audioConfig)).digest("hex");
const DEFAULT_VOICE = "Anna";
const VOICES = Object.keys(audioConfig.voices);

const VIEWS = { dialogue: "dialogue", words: "words", table: "table", sentence: "rows", task: "task", clock: "time" };
const SET_KEYS = ["view", "dialogue", "words", "table", "rows", "task", "time", "reveal", "focus", "solved"];
const TASK_KINDS = ["form", "keywords", "card", "sign", "message", "listen", "ads"];
const EXERCISE_TYPES = ["choice", "gap", "order"];
/** Для автоматических фраз «шпиона»: подлежащее-местоимение и заведомо чужие окончания глагола. */
const PRONOUNS = new Set(["ich", "du", "er", "sie", "es", "wir", "ihr"]);
const WRONG_ENDING = { e: "en", st: "t", t: "st", en: "st" };

const errors = [];
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
for (const file of readdirSync(path.join(generatedDir, "topics"))) {
  if (!ids.includes(file.replace(/\.json$/, ""))) rmSync(path.join(generatedDir, "topics", file));
}
for (const topic of topics) writeJson(path.join(generatedDir, "topics", `${topic.id}.json`), topic);
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
    "dialogues", "words", "tables", "tasks", "steps", "exercises", "case", "spy",
  ];
  unknownKeys(src, known, where);
  for (const field of ["id", "order", "title", "ru", "lede", "goals", "grammar", "exam", "steps", "exercises"]) {
    if (src[field] === undefined) fail(where, `нет поля ${field}`);
  }
  if (errors.length && !src.steps) return null;
  if (!/^[a-z0-9-]+$/.test(src.id ?? "")) fail(where, `id «${src.id}» — только латиница в нижнем регистре, цифры и дефис`);
  const id = src.id;
  for (const part of src.exam ?? []) if (!examParts.has(part)) fail(where, `неизвестная часть экзамена ${part}`);

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
        ...(beat.question ? { question: beat.question, sceneBefore: before } : {}),
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
    spy,
  };
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
    "theme", "word", "picture", "statement", "question", "options", "answer", "sample", "points", "voice", "dialogue",
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
  if (t.kind === "form") need("fields");
  if (t.kind === "keywords") need("words");
  if (t.kind === "card") need("word");
  if (t.kind === "sign") need("text", "statement", "answer");
  if (t.kind === "message") need("text");
  // Запись для Hören — либо text одним голосом, либо dialogue: разговор с голосами героев.
  if (t.kind === "listen") {
    need("answer");
    if (!t.text === !t.dialogue) fail(where, "у listen нужен либо text (один голос), либо dialogue (id диалога)");
    if (t.dialogue && !dialogues[t.dialogue]) fail(where, `dialogue: ${t.dialogue} не найден`);
  } else if (t.dialogue) fail(where, "dialogue бывает только у listen");
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
  const voice = t.voice ?? DEFAULT_VOICE;
  return {
    ...t,
    ...(t.kind === "form" ? { fields } : {}),
    text: typeof t.text === "string" ? t.text.trim() : t.text,
    ...(t.kind === "listen" && t.text ? { audio: speak(t.text, voice) } : {}),
    ...(t.kind === "listen" && dialogues[t.dialogue]
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
  const file = `${hash}.m4a`;
  audio.set(file, { text: clean, voice });
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
