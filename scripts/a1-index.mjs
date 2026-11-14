// Индекс покрытия A1 (A1-PLAN.md): обязательные слова и правила, где они встречаются в новой версии
// Moin и сколько раз. Собирается при `pnpm content`; вручную — `node scripts/a1-index.mjs`, с флагом
// --baseline ещё и обновляет храповик scripts/a1-index-baseline.json.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { sceneChapters } from "../src/story/scenes/index.ts";
import { flatNodes } from "../src/story/scene.ts";
import { episodes, phrases } from "../src/story/data.ts";
import { sceneUnits as reviewUnits } from "../src/story/review.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const rel = (file) => path.relative(root, file);
export const THRESHOLD = { hits: 6, chapters: 4, actions: 2, heard: 2 };
export const BASELINE = path.join(root, "scripts/a1-index-baseline.json");
const REPORT = path.join(root, "A1-INDEX.md");
const JSON_OUT = path.join(root, "src/generated/a1-index.json");
const LESSONS = ["kennenlernen", "zahlen", "familie", "essen", "einkaufen", "tagesablauf", "freizeit", "wohnen", "stadt", "gesundheit", "arbeit", "reisen"];

// ——— Текст узлов ———

// Служебные поля и русские поля в слова не идут; рассказ со смешанным текстом берём целиком —
// кириллица отсеивается при разборе на слова.
const SKIP = new Set(["id", "src", "rule", "voice", "kind", "t", "audio", "icon", "alt", "ru", "who", "learn", "seed", "outcome", "set", "if", "key", "places", "goal", "start", "heading", "colour", "pronoun", "answerRu", "hint", "task", "note", "prompt", "label"]);
const expand = (s) => s.replace(/\{([a-z0-9]+)\}/g, (_, k) => phrases[k]?.de ?? "");
function strings(x, out = [], key = "") {
  if (SKIP.has(key)) return out;
  if (typeof x === "string") out.push(expand(x));
  else if (Array.isArray(x)) x.forEach((v) => strings(v, out));
  else if (x && typeof x === "object") for (const [k, v] of Object.entries(x)) strings(v, out, k);
  return out;
}
// Поля, где немецкий звучит или виден целиком, но которые SKIP отсекает как подписи: заметки осмотра.
const lookNotes = (n) => (n.t === "look" ? n.items.map((i) => i.de) : []);

const TOKEN = /[\p{L}\d]+(?:['’]\p{L}+)?(?:-[\p{L}\d]+)*/gu;
/** Слова строки в нижнем регистре; составное через дефис даёт и целое, и части. */
const tokens = (s) =>
  (s.match(TOKEN) ?? []).flatMap((t) => {
    const w = t.toLowerCase().replace("’", "'");
    return w.includes("-") ? [w, ...w.split("-")] : [w];
  });
/** Окончания слов от 4 букв после первой части от 4 букв: так «kopfschmerzen» засчитывается за «schmerzen». */
function heads(set) {
  const out = new Set();
  for (const t of set) for (let i = 4; i <= t.length - 4; i++) out.add(t.slice(i));
  return out;
}

/** Игры, где немецкое слово или фраза звучит само. */
const HEARD_GAMES = new Set(["sounds", "compound", "chat", "bingo", "scene", "letters", "docks", "gull", "lock", "oral"]);
const READING = new Set(["narr", "say", "pic", "clue", "item", "when"]);

function sceneUnits() {
  const units = [];
  sceneChapters.forEach((chapter, ci) => {
    const n = ci + 1;
    const file = path.join(root, `src/story/scenes/${String(n).padStart(2, "0")}.ts`);
    const source = readFileSync(file, "utf8");
    for (const beat of chapter.beats)
      for (const node of flatNodes(beat.challenge.nodes ?? [])) {
        if (node.t === "pic" || node.t === "when") continue;
        const text = [...strings(node), ...lookNotes(node)].join("\n");
        const toks = tokens(text);
        if (!toks.length && !node.rule) continue;
        units.push({
          chapter: n,
          scene: beat.id,
          kind: node.t === "game" ? node.c.kind : node.t,
          action: !READING.has(node.t),
          heard: node.t === "say" || node.t === "hear" || (node.t === "game" && HEARD_GAMES.has(node.c.kind)),
          text,
          toks,
          rules: [].concat(node.rule ?? []),
          file: rel(file),
          line: lineOf(source, node, beat.id),
        });
      }
  });
  return units;
}

/** Строка узла в файле главы: по началу первой немецкой строки, иначе по сцене. */
function lineOf(source, node, beatId) {
  const first = [node.de, node.text, node.say, node.task, ...(node.options ?? []).map((o) => o.text ?? o)].find((s) => typeof s === "string" && s.length > 3);
  for (const len of [40, 20, 10]) {
    if (!first) break;
    const at = source.indexOf(first.slice(0, len));
    if (at >= 0) return source.slice(0, at).split("\n").length;
  }
  const at = source.indexOf(`"${beatId}"`);
  return at >= 0 ? source.slice(0, at).split("\n").length : 1;
}

// ——— Формы слов ———

const UML = { a: "ä", o: "ö", u: "ü" };
const STRONG = {
  fahren: "fährt fährst fuhr gefahren", geben: "gibt gibst gab gegeben", nehmen: "nimmt nimmst nahm genommen",
  sehen: "sieht siehst sah gesehen", essen: "isst aß gegessen", lesen: "liest las gelesen", sprechen: "spricht sprichst sprach gesprochen",
  helfen: "hilft hilfst half geholfen", treffen: "trifft triffst traf getroffen", vergessen: "vergisst vergaß",
  werden: "wird wirst wurde geworden", schlafen: "schläft schläfst schlief geschlafen", laufen: "läuft läufst lief gelaufen",
  tragen: "trägt trägst trug getragen", waschen: "wäscht wusch gewaschen", halten: "hält hältst hielt gehalten",
  lassen: "lässt ließ gelassen", fallen: "fällt fiel gefallen", gefallen: "gefällt gefiel", einladen: "lädt lud eingeladen",
  sein: "bin bist ist sind seid war warst waren gewesen", haben: "habe hast hat habt hatte hattest hatten gehabt",
  gehen: "ging gegangen", kommen: "kam gekommen", bleiben: "blieb geblieben", finden: "fand gefunden", trinken: "trank getrunken",
  schreiben: "schrieb geschrieben", rufen: "rief gerufen", stehen: "stand gestanden", liegen: "lag gelegen", sitzen: "saß gesessen",
  fliegen: "flog geflogen", heißen: "hieß geheißen", bringen: "brachte gebracht", denken: "dachte gedacht", kennen: "kannte gekannt",
  wissen: "weiß weißt wusste gewusst", können: "kann kannst konnte gekonnt", müssen: "muss musst musste", dürfen: "darf darfst durfte",
  wollen: "will willst wollte", sollen: "soll sollst sollte", mögen: "mag magst mochte möchte möchtest", möchten: "möchte möchtest",
  tun: "tut tue tat getan", beginnen: "begann begonnen", verstehen: "verstand verstanden", bekommen: "bekam", schließen: "schloss geschlossen",
  ziehen: "zog gezogen", steigen: "stieg gestiegen", fangen: "fängt fing gefangen", schneiden: "schnitt geschnitten", singen: "sang gesungen",
  schwimmen: "schwamm geschwommen", verlieren: "verlor verloren", gewinnen: "gewann gewonnen", sterben: "stirbt starb gestorben",
  empfehlen: "empfiehlt empfahl empfohlen", bieten: "bot geboten", riechen: "roch gerochen", streiten: "stritt gestritten",
};
const SEP = ["zurück", "kennen", "spazieren", "fern", "statt", "teil", "ab", "an", "auf", "aus", "ein", "mit", "vor", "zu", "weg", "los", "her", "hin", "nach", "um"];
const NONVERB = new Set("aber also allein alt an auf aus bei bitte breit dann denn dort draußen dunkel durch eben ein eigen einmal eng erst etwas falsch fertig frei früh ganz gestern gern gleich groß gut halb heute hier hinten hoch immer jetzt kalt kaputt klein kurz lang langsam laut lecker leer leicht leider leise links man mehr mit morgen nach neben nein neu nicht nichts nie noch nur oben oder offen oft rechts richtig ruhig schnell schon schön sehr selten so sofort spät später teuer trocken über um und unten unter viel vielleicht von vor wann warm warum was weit wenig wenn wer wie wieder wo woher wohin zu zusammen zurück zwischen unser euer eigentlich modern golden besetzt geschlossen geöffnet verheiratet ledig geschieden gestorben geboren eilig wunderbar zufrieden international kulturell normal selbstständig verboten bewölkt günstig möbliert sonnig windig trocken übermorgen unterwegs gegen innen außen oben morgens abends bisschen daneben sieben elf zwölf zehn null zwanzig dreißig vierzig fünfzig sechzig siebzig achtzig neunzig neunzehn achtzehn siebzehn sechzehn fünfzehn vierzehn dreizehn eins zwei drei vier fünf sechs acht neun hundert tausend".split(" "));

/** Множественное с умлаутом на последней a, o, u или au основы: Apfel — Äpfel, Haus — Häuser. */
function umlautVariant(w) {
  const m = w.match(/(au|[aou])(?=[^aou]*$)/);
  return m ? w.slice(0, m.index) + (m[1] === "au" ? "äu" : UML[m[1]]) + w.slice(m.index + m[1].length) : null;
}
const verbLike = (w) => !NONVERB.has(w) && /(en|ern|eln)$/.test(w) && w.length > 3;

/** Формы одного слова без артикля; noun — существительное. */
function wordForms(w, noun) {
  const f = new Set([w]);
  const seps = [];
  if (noun) {
    for (const s of ["e", "en", "n", "s", "er", "es", "in", "innen", "nen"]) f.add(w + s);
    const u = umlautVariant(w);
    if (u) for (const s of ["", "e", "er", "en", "in", "innen"]) f.add(u + s);
    return { forms: f, seps, noun: w.length >= 4 };
  }
  if (STRONG[w]) STRONG[w].split(" ").forEach((x) => f.add(x));
  if (verbLike(w)) {
    const stem = w.replace(/(en|n)$/, "");
    for (const s of ["e", "st", "t", "et", "est", "en", "te", "ten", "test", "tet", "end"]) f.add(stem + s);
    f.add(`ge${stem}t`);
    f.add(`ge${stem}et`);
    if (/^(be|ge|er|ver|zer|ent|emp|über|unter)/.test(w) || w.endsWith("ieren")) f.add(stem + "t");
    for (const p of SEP) {
      if (!w.startsWith(p) || w.length <= p.length + 3) continue;
      const base = w.slice(p.length);
      const bstem = base.replace(/(en|n)$/, "");
      f.add(`${p}zu${base}`);
      f.add(`${p}ge${bstem}t`);
      const baseForms = new Set([base, bstem + "e", bstem + "st", bstem + "t", bstem + "et", bstem + "en", bstem + "te", bstem + "ten"]);
      for (const x of (STRONG[base] ?? "").split(" ").filter(Boolean)) {
        if (x.startsWith("ge")) f.add(p + x);
        else baseForms.add(x);
      }
      seps.push({ prefix: p, forms: baseForms });
      break;
    }
  } else for (const s of w.endsWith("e") ? ["n", "r", "s", "m"] : ["e", "en", "er", "es", "em"]) f.add(w + s);
  return { forms: f, seps };
}

/** Разбор записи «der Apfel», «(sich) anziehen», «all-», «Lieblings-», «Hunger haben». */
export function parseEntry(de) {
  let s = de.replace(/\(sich\)\s*/, "").replace(/[!?.,…]/g, " ").replace(/\s+/g, " ").trim();
  const m = s.match(/^(der|die|das) (.+)$/);
  const article = m ? m[1] : null;
  if (m) s = m[2];
  const key = s.toLowerCase();
  return { article, key };
}

function matcher(entry) {
  const { article, key } = parseEntry(entry.de);
  const extra = (entry.forms ?? []).map((x) => x.toLowerCase());
  if (key.endsWith("-") && /^[A-ZÄÖÜ]/.test(entry.de)) return { prefix: key.slice(0, -1), phrases: extra.map(tokens) };
  if (key.endsWith("-")) {
    const stem = key.slice(0, -1);
    return { forms: new Set(["", "e", "en", "er", "es", "em"].map((x) => stem + x)), seps: [], phrases: extra.map(tokens) };
  }
  const parts = tokens(key);
  if (parts.length === 1) {
    const { forms, seps, noun } = wordForms(parts[0], Boolean(article) || /^[A-ZÄÖÜ]/.test(entry.de));
    if (entry.pl) forms.add(entry.pl.toLowerCase());
    return { forms, seps, noun, phrases: extra.map(tokens) };
  }
  const phrase = parts.map((p) => wordForms(p, /^[A-ZÄÖÜ]/.test(entry.de.split(" ").find((x) => x.toLowerCase().startsWith(p)) ?? "")).forms);
  return { phrase, phrases: extra.map(tokens) };
}

/** Встречается ли запись словаря de в немецком тексте; для проверки правил подсчёта. */
export function found(de, text) {
  const toks = tokens(text);
  const unit = { text, toks, set: new Set(toks) };
  return matches(matcher({ de }), toks, unit.set, unit);
}

/** Есть ли слово в единице (узле или строке) с разобранными словами toks. */
function matches(m, toks, set, unit) {
  if (m.prefix) return toks.some((t) => t.startsWith(m.prefix) && t.length > m.prefix.length);
  if (m.forms) {
    for (const t of set) if (m.forms.has(t)) return true;
    if (m.noun && unit) {
      unit.heads ??= heads(set);
      for (const f of m.forms) if (unit.heads.has(f)) return true;
    }
    // Отделённая приставка закрывает часть предложения: «Ich rufe dich an», а не любое «an».
    if (m.seps.some((s) => set.has(s.prefix))) {
      unit.clauses ??= unit.text ? unit.text.split(/[.,!?…:;–—]+|\n/).map(tokens).filter((x) => x.length) : [toks];
      for (const s of m.seps) if (unit.clauses.some((c) => c.at(-1) === s.prefix && c.some((t) => s.forms.has(t)))) return true;
    }
  }
  if (!m.phrase && !m.phrases.length) return false;
  // Выражение ищется в пределах предложения: «Hunger? Nein. Wir haben …» — не «Hunger haben».
  unit.sentences ??= unit.text ? unit.text.split(/[.!?…:;]+(?=\s|$)|\n/).map(tokens).filter((x) => x.length) : [toks];
  for (const sentence of unit.sentences) {
    if (m.phrase && window(m.phrase.map((f) => (t) => f.has(t)), sentence)) return true;
    for (const p of m.phrases) if (window(p.map((x) => (t) => t === x), sentence)) return true;
  }
  return false;
}
/** Все части выражения стоят рядом: в окне длиной в число частей плюс три. */
function window(tests, toks) {
  const span = tests.length + 3;
  for (let i = 0; i < toks.length; i++) {
    if (!tests.some((test) => test(toks[i]))) continue;
    const slice = toks.slice(i, i + span);
    const used = new Set();
    if (tests.every((test) => slice.some((t, j) => !used.has(j) && test(t) && used.add(j)))) return true;
  }
  return false;
}

// ——— Обязательные слова ———

function lessonWords() {
  const out = [];
  LESSONS.forEach((id, i) => {
    const topic = JSON.parse(readFileSync(path.join(root, `src/generated/topics/${id}.json`), "utf8"));
    const walk = (w) => {
      if (Array.isArray(w)) w.forEach(walk);
      else if (w && typeof w === "object") {
        if (typeof w.de === "string" && w.ru !== undefined)
          for (const part of w.de.split(/\s+[–-]\s+/)) {
            const pl = w.plural ?? w.pl;
            out.push({ de: part.trim(), pl: pl && pl !== "-" && part === w.de ? pl : undefined, lesson: i + 1 });
          }
        else Object.values(w).forEach(walk);
      }
    };
    walk(topic.words);
  });
  return out;
}

function required(reference) {
  const byKey = new Map();
  const add = (entry, source) => {
    const { key } = parseEntry(entry.de);
    if (!key) return;
    const have = byKey.get(key);
    if (have) {
      if (!have.sources.includes(source)) have.sources.push(source);
      if (entry.pl && !have.pl) have.pl = entry.pl;
      if (entry.forms) have.forms = [...(have.forms ?? []), ...entry.forms];
      have.group ??= entry.group;
      return;
    }
    byKey.set(key, { key, de: entry.de, pl: entry.pl, forms: entry.forms, of: entry.of, group: entry.group, sources: [source] });
  };
  for (const w of reference.words) {
    const entry = typeof w === "string" ? { de: w } : w;
    if (!entry.skip) add(entry, "экзамен");
  }
  for (const [group, items] of Object.entries(reference.groups)) for (const de of items) add({ de: String(de), group }, "экзамен");
  for (const w of lessonWords()) add(w, `урок ${w.lesson}`);
  return [...byKey.values()];
}

// ——— Справочные источники: уроки, проверки, классическая игра ———

function lineUnits(files) {
  return files.flatMap((file) =>
    readFileSync(file, "utf8").split("\n").map((text, i) => {
      const toks = tokens(text);
      return { file: rel(file), line: i + 1, text, toks, set: new Set(toks) };
    }).filter((u) => u.toks.length),
  );
}

// ——— Сборка ———

export function buildIndex() {
  const reference = parse(readFileSync(path.join(root, "content/reference/start-deutsch-1.yaml"), "utf8"));
  const units = sceneUnits().map((u) => ({ ...u, set: new Set(u.toks) }));
  const lessonFiles = readdirSync(path.join(root, "content/a1")).filter((f) => f.endsWith(".yaml")).sort().map((f) => path.join(root, "content/a1", f));
  const lessonLines = lineUnits(lessonFiles);
  const checkLines = lineUnits(readdirSync(path.join(root, "content/assessments")).filter((f) => /^1[2-5]-a1/.test(f)).map((f) => path.join(root, "content/assessments", f)));
  const classic = episodes.map((e, i) => {
    const text = strings(e.beats).join("\n");
    const toks = tokens(text);
    return { n: i + 1, text, toks, set: new Set(toks) };
  });

  // Очередь повторения новой версии: что пройденные сцены отдают в раунды (A1-PLAN.md, «Повторение»).
  const dictionary = JSON.parse(readFileSync(path.join(root, "src/generated/a1-words.json"), "utf8"));
  const byDe = new Map(Object.values(phrases).map((p) => [p.de, p]));
  const lookup = (de) => dictionary[de] ?? (byDe.has(de) ? { ru: byDe.get(de).ru } : undefined);
  const pool = new Set(sceneChapters.flatMap((c) => c.beats.flatMap((b) => reviewUnits(b, lookup))));

  const words = required(reference).map((w) => {
    const m = matcher(w);
    const hits = units.filter((u) => matches(m, u.toks, u.set, u));
    const lessons = new Map();
    for (const l of lessonLines) {
      if (lessons.has(l.file) || !matches(m, l.toks, l.set, l)) continue;
      lessons.set(l.file, l.line);
    }
    return {
      key: w.key,
      de: w.de,
      sources: w.sources,
      of: w.of,
      part: partOf(w),
      review: pool.has(w.de),
      ...count(hits),
      lessons: [...lessons].map(([file, line]) => ({ file, line })),
      checks: checkLines.filter((l) => matches(m, l.toks, l.set, l)).length,
      classic: classic.filter((e) => matches(m, e.toks, e.set, e)).map((e) => e.n),
    };
  });

  const taught = lessonWords();
  const singulars = new Set(taught.map((w) => parseEntry(w.de).key));
  const plurals = new Set(taught.filter((w) => w.pl).map((w) => w.pl.toLowerCase()).filter((p) => !singulars.has(p)));
  const usedRules = new Set(units.flatMap((u) => u.rules));
  const grammar = reference.grammar.map((g) => {
    const tests = (g.find ?? []).map((p) => (p === "@plurals" ? (u) => u.toks.some((t) => plurals.has(t)) : ((rx) => (u) => rx.test(u.text))(new RegExp(`(?<![\\p{L}])(?:${p})(?![\\p{L}])`, "u"))));
    const rules = g.rules ?? [];
    const hits = units.filter((u) => u.rules.some((r) => rules.includes(r)) || tests.some((t) => t(u)));
    return { id: g.id, group: g.group, title: g.title, rules, explained: rules.some((r) => usedRules.has(r)), ...count(hits) };
  });
  for (const g of grammar) if (!g.explained && g.status === "закреплено") g.status = "без объяснения";
  return { threshold: THRESHOLD, words, grammar, summary: summarize(words, grammar) };
}

function count(hits) {
  const chapters = [...new Set(hits.map((u) => u.chapter))].sort((a, b) => a - b);
  const actions = hits.filter((u) => u.action).length;
  const heard = hits.filter((u) => u.heard).length;
  const t = THRESHOLD;
  const status = !hits.length ? "нет" : hits.length === 1 ? "один раз" : hits.length >= t.hits && chapters.length >= t.chapters && actions >= t.actions && heard >= t.heard ? "закреплено" : "слабо";
  return {
    status,
    hits: hits.length,
    chapters,
    actions,
    heard,
    where: hits.slice(0, 16).map((u) => ({ scene: u.scene, line: u.line, kind: u.kind })),
  };
}

const STATUSES = ["закреплено", "слабо", "один раз", "нет"];
function summarize(words, grammar) {
  const by = (list) => Object.fromEntries([...STATUSES, "без объяснения"].map((s) => [s, list.filter((x) => x.status === s).length]).filter(([k, n]) => n || STATUSES.includes(k)));
  return {
    words: by(words),
    exam: by(words.filter((w) => w.sources.includes("экзамен"))),
    lessons: by(words.filter((w) => w.sources.some((s) => s.startsWith("урок")))),
    grammar: by(grammar),
    review: words.filter((w) => w.review).length,
    reviewWeak: words.filter((w) => w.review && w.status !== "закреплено").length,
    parts: Object.fromEntries(PARTS.map((part) => [part, by(words.filter((w) => w.part === part))])),
  };
}

// ——— Отчёт ———

const FUNCTION = new Set("ab aber als also am an auch auf aus bei bis bitte da danke dann dass dem den denn der des dich die dir doch dort du durch er es etwas euch euer für gegen ganz hier ich ihm ihn ihnen ihr im in ja jemand man mich mir mit nach neben nein nicht nichts noch nur ob oder ohne schon sehr seit sie so über um und uns unter vom von vor wann warum was wem wen wenn wer wie wieder wir wo woher wohin zu zum zur zwischen alle alles mehr viel viele wenig welche kein mein dein sich ein eine".split(" "));
const VERBS = new Set(["sein", "tun", "wehtun"]);
const GREETINGS = new Set(["hallo", "tschüss", "achtung"]);
export const PARTS = ["Существительные", "Глаголы", "Прилагательные и наречия", "Служебные слова", "Выражения", "Числа, время, цвета и другие группы"];

/** Часть речи для группировки отчёта: по артиклю, заглавной букве, окончанию инфинитива и списку служебных слов. */
function partOf(w) {
  if (w.group) return PARTS[5];
  const { article, key } = parseEntry(w.de);
  if (VERBS.has(key)) return PARTS[1];
  if (FUNCTION.has(key) || (key.endsWith("-") && !/^[A-ZÄÖÜ]/.test(w.de))) return PARTS[3];
  if (key.includes(" ") || GREETINGS.has(key) || /[!?]$/.test(w.de.trim())) return PARTS[4];
  if (article || /^[A-ZÄÖÜ]/.test(w.de)) return PARTS[0];
  if (verbLike(key)) return PARTS[1];
  return PARTS[2];
}

const sceneFile = (scene) => `src/story/scenes/${scene.slice(0, 2)}.ts`;
const link = (w) => `[${w.scene}](${sceneFile(w.scene)}#L${w.line})`;
function places(item, limit = 8) {
  const seen = new Set();
  const out = [];
  for (const w of item.where) {
    if (seen.has(w.scene)) continue;
    seen.add(w.scene);
    out.push(link(w));
    if (out.length >= limit) break;
  }
  return out.join(" ") || "—";
}
const numbers = (x) => `${x.hits} · ${x.chapters.length} · ${x.actions} · ${x.heard}`;
/** Откуда слово: номера уроков и «экз.» для словаря экзамена. */
const origin = (w) => [...w.sources.filter((s) => s.startsWith("урок")).map((s) => s.slice(5)), ...(w.sources.includes("экзамен") ? ["экз."] : [])].join(", ");
const alphabetical = (a, b) => a.key.localeCompare(b.key, "de");
const ANCHORS = { "нет": "слова-нет", "один раз": "слова-один-раз", "слабо": "слова-слабо", "закреплено": "слова-закреплено" };

export function renderReport(index) {
  const { words, grammar, summary, threshold: t } = index;
  const row = (label, s) => `| ${label} | ${STATUSES.map((k) => s[k] ?? 0).join(" | ")} |`;
  const head = `|---|${STATUSES.map(() => "---").join("|")}|`;
  const out = [
    "# Индекс покрытия A1",
    "",
    "Сгенерирован `scripts/a1-index.mjs` при `pnpm content`; не редактируйте вручную. Правила подсчёта и",
    "решения автора — `A1-PLAN.md`, эталон — `content/reference/start-deutsch-1.yaml`.",
    "",
    `Закреплено: не меньше ${t.hits} встреч в новой версии Moin, не меньше чем в ${t.chapters} главах, из них ${t.actions} в действии`,
    `и ${t.heard} на слух. Числа в таблицах: встреч · глав · действий · на слух. Столбец «Откуда»: номера уроков A1`,
    "и «экз.» для словаря экзамена. Внутри разделов слова сгруппированы по частям речи и идут по алфавиту.",
    "",
    `Разделы: [Сводка](#сводка) · [Грамматика](#грамматика) · ${["нет", "один раз", "слабо", "закреплено"].map((s) => `[Слова: ${s}](#${ANCHORS[s]})`).join(" · ")}`,
    "",
    "## Сводка",
    "",
    `| Что | ${STATUSES.join(" | ")} |`,
    head,
    row(`Все обязательные слова (${words.length})`, summary.words),
    row("из них словарь экзамена", summary.exam),
    row("из них слова уроков", summary.lessons),
    row(`Грамматика (${grammar.length})`, summary.grammar),
    "",
    `В очереди повторения новой версии ${summary.review} обязательных слов, из них ниже порога ${summary.reviewWeak}. Повторение в порог не входит; в таблицах такие слова помечены ↻.`,
    "",
    ...(summary.grammar["без объяснения"] ? [`Ещё ${summary.grammar["без объяснения"]} правил встречаются достаточно, но в игре их не объясняет ни один фрагмент правила: статус «без объяснения».`, ""] : []),
    `| Часть речи | ${STATUSES.join(" | ")} |`,
    head,
    ...PARTS.map((part) => row(part, summary.parts[part] ?? {})),
    "",
    "## Грамматика",
  ];
  for (const group of [...new Set(grammar.map((g) => g.group))]) {
    out.push("", `### ${group}`, "", "| Правило | Статус | Числа | Объяснение | Где |", "|---|---|---|---|---|");
    for (const g of grammar.filter((x) => x.group === group))
      out.push(`| ${g.title} | ${g.status} | ${numbers(g)} | ${g.rules.length ? (g.explained ? "есть" : "не связано с действием") : "нет"} | ${places(g, 6)} |`);
  }
  for (const status of ["нет", "один раз", "слабо"]) {
    const list = words.filter((w) => w.status === status);
    out.push("", `## Слова: ${status}`, "", `${list.length} слов.`);
    for (const part of PARTS) {
      const inPart = list.filter((w) => w.part === part).sort(alphabetical);
      if (!inPart.length) continue;
      out.push("", `### ${part} (${inPart.length})`, "", "| Слово | Откуда | Числа | Где в новой версии | Уроки | Классика |", "|---|---|---|---|---|---|");
      for (const w of inPart)
        out.push(`| ${w.de}${w.of ? ` (от ${w.of})` : ""}${w.review ? " ↻" : ""} | ${origin(w)} | ${numbers(w)} | ${places(w)} | ${w.lessons.map((l) => `[${l.file.match(/(\d\d)-/)?.[1]}](${l.file}#L${l.line})`).join(" ") || "—"} | ${w.classic.length ? `гл. ${w.classic.join(", ")}` : "—"} |`);
    }
  }
  const done = words.filter((w) => w.status === "закреплено");
  out.push("", "## Слова: закреплено", "", `${done.length} слов.`);
  for (const part of PARTS) {
    const inPart = done.filter((w) => w.part === part).sort(alphabetical);
    if (inPart.length) out.push("", `### ${part} (${inPart.length})`, "", inPart.map((w) => w.de).join(", "));
  }
  return `${out.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;
}

export function writeIndex({ baseline = false } = {}) {
  const index = buildIndex();
  writeFileSync(JSON_OUT, compact(index));
  writeFileSync(REPORT, renderReport(index));
  if (baseline) writeFileSync(BASELINE, `${JSON.stringify(baselineOf(index), null, 1)}\n`);
  const s = index.summary;
  return `Индекс A1: слов закреплено ${s.words["закреплено"] ?? 0} из ${index.words.length}, правил — ${s.grammar["закреплено"] ?? 0} из ${index.grammar.length} → A1-INDEX.md`;
}

/** Одна запись на строку: правка контента даёт читаемый diff. */
function compact(index) {
  const list = (items) => `[\n${items.map((x) => JSON.stringify(x)).join(",\n")}\n]`;
  return `{"threshold":${JSON.stringify(index.threshold)},\n"summary":${JSON.stringify(index.summary)},\n"grammar":${list(index.grammar)},\n"words":${list(index.words)}}\n`;
}

export const baselineOf = (index) => ({
  words: index.words.filter((w) => w.status === "закреплено").map((w) => w.key),
  grammar: index.grammar.filter((g) => g.status === "закреплено").map((g) => g.id),
  present: index.words.filter((w) => w.hits > 0).map((w) => w.key),
});

if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(writeIndex({ baseline: process.argv.includes("--baseline") }));
