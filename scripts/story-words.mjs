// Незнакомые немецкие слова в главе сцен: node scripts/story-words.mjs 5
// Знакомое — словарь и таблицы уроков A1 до этой главы, выражения истории, служебные слова, имена
// и числительные; формы слова узнаются по общей основе (kauft — kaufen). Рассказ и улики идут без
// перевода, поэтому в них незнакомых слов быть не должно: русское слово или выражение истории.
// У реплики перевод открывается кнопкой, но и там новые слова — редкость, а важные для сюжета
// становятся выражениями истории. Правило — A1-PLOT.md, «Немецкий в рассказе».
import { readFileSync, readdirSync } from "node:fs";
import { phrases } from "../src/story/data.ts";
import { flatNodes } from "../src/story/scene.ts";
import { sceneChapters } from "../src/story/scenes/index.ts";
import { SCENE_RULES } from "../src/story/scenes/rules.ts";

const chapter = Number(process.argv[2]);
if (!sceneChapters[chapter - 1]) throw new Error("Укажите номер главы сцен: node scripts/story-words.mjs 5");

const dir = new URL("../src/generated/topics/", import.meta.url);
const lessons = readdirSync(dir)
  .filter((f) => !/^(a2|b1)-/.test(f))
  .map((f) => JSON.parse(readFileSync(new URL(f, dir), "utf8")))
  .filter((l) => l.order <= chapter);
const words = (s) => (s.replace(/[*+]/g, "").match(/[A-Za-zÄÖÜäöüß]+/g) ?? []).map((w) => w.toLowerCase());
const NAMES = new Set(
  "hauke dana jensen greta nils mateo elif frauke petersen lotte kruse wulff derya kiel gaarden holtenau sprotte moin kiellinie kieler woche opa oma hamburg argentinien türkei ostsee hansen hel xl xxl herr herrn frau club team tage tag ok".split(" "),
);
const FUNCTION = `der die das den dem des ein eine einen einem einer eines kein keine keinen keinem keiner ich du er sie es wir ihr
mich dich ihn uns euch mir dir ihm ihnen sich mein meine meinen dein deine sein seine ihre ihren unser unsere euer bin bist ist sind
seid habe hast hat haben habt und oder aber nicht ja nein doch auch sehr hier da so zu für mit von aus in im an am auf bei um wie
was wer wo woher gut danke bitte alle alles man noch nur jetzt heute`.split(/\s+/);
// Прозрачные для русскоязычного игрока слова и подписи кнопок игры («Richtig / Falsch»).
const CLEAR = "kiosk journal diagnose test super profi polizei lotto overall party film foto handy richtig falsch".split(" ");
const NUMBER = /^(null|eins|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|\p{L}*zehn|\p{L}*zig|\p{L}*ßig|hundert|tausend)$/u;

const known = new Set([...FUNCTION, ...CLEAR]);
for (const p of Object.values(phrases)) words(`${p.de} ${p.pl ?? ""}`).forEach((w) => known.add(w));
for (const lesson of lessons) {
  for (const group of Object.values(lesson.words)) for (const w of group.items) words(`${w.de} ${w.pl ?? ""}`).forEach((x) => known.add(x));
  for (const table of Object.values(lesson.tables ?? {})) [table.head, ...table.rows].flat().forEach((cell) => words(cell).forEach((x) => known.add(x)));
  for (const beat of lesson.beats ?? []) for (const row of beat.scene?.rows ?? []) words(row.plain).forEach((x) => known.add(x));
}
for (const rule of Object.values(SCENE_RULES))
  if (rule.chapter <= chapter) [rule.table.head, ...rule.table.rows].flat().forEach((cell) => words(cell).forEach((x) => known.add(x)));
const stems = [...known].filter((k) => k.length >= 4);
const familiar = (w) =>
  known.has(w) ||
  NAMES.has(w) ||
  NUMBER.test(w) ||
  stems.some((k) => w.length >= 4 && (w.startsWith(k.slice(0, Math.max(4, k.length - 2))) || k.startsWith(w.slice(0, Math.max(4, w.length - 2)))));

let narration = 0;
for (const beat of sceneChapters[chapter - 1].beats)
  for (const n of flatNodes(beat.challenge.nodes)) {
    const text = n.t === "narr" ? n.text.replace(/\{[\w-]+\}/g, " ") : n.t === "clue" ? `${n.title} | ${n.text}` : n.t === "say" ? n.de : null;
    if (!text) continue;
    const strange = [...new Set(words(text).filter((w) => w.length > 1 && !familiar(w)))];
    if (!strange.length) continue;
    if (n.t !== "say") narration += 1;
    console.log(`${beat.id} ${n.t === "say" ? `say(${n.who})` : n.t}: ${strange.join(", ")} — ${text.slice(0, 120)}`);
  }
console.log(`\nРассказ и улики с незнакомыми словами: ${narration}.`);
