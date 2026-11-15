// Планировщик возвращений (A1-PLAN.md, этап 3): раскладывает слова прошлых глав, которым не хватает
// встреч, по раундам перед главой и по играм возвращения (src/story/scenes/back.ts) в сценах 2, 3, 5
// и 6 каждой главы: причалы до 12 существительных и лото ровно на 9 слов. И то и другое одинаково у всех игроков и считается частью главы, поэтому
// каждое место даёт слову встречу, действие, а часто и новую главу и прослушивание.
//   node scripts/a1-returns.mjs          — показать план и прогноз
//   node scripts/a1-returns.mjs --write  — записать его в src/story/scenes/warmups.ts
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { phrases } from "../src/story/data.ts";
import { sceneUnits } from "../src/story/review.ts";
import { sceneChapters } from "../src/story/scenes/index.ts";
import { A2_FROM, BASELINE, baselineOf, buildIndex, found, THRESHOLD } from "./a1-index.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const OUT = path.join(root, "src/story/scenes/warmups.ts");
const dictionary = JSON.parse(readFileSync(path.join(root, "src/generated/a1-words.json"), "utf8"));
const byDe = new Map(Object.values(phrases).map((p) => [p.de, p]));
const lookup = (de) => dictionary[de] ?? (byDe.has(de) ? { ru: byDe.get(de).ru } : undefined);

// Механики раунда по главам: первая игра каждый раз другая. Все, кроме пар, звучат.
const ROUNDS = {
  2: ["bingo", "docks", "gull"],
  3: ["gull", "docks", "letters"],
  4: ["docks", "bingo", "pairs"],
  5: ["letters", "gull", "docks"],
  6: ["bingo", "pairs", "docks"],
  7: ["gull", "bingo", "docks"],
  8: ["docks", "letters", "bingo"],
  9: ["pairs", "gull", "docks"],
  10: ["bingo", "docks", "letters"],
  11: ["gull", "docks", "pairs"],
  12: ["docks", "bingo", "gull"],
  13: ["bingo", "gull", "docks"],
};
// Раунд перед главой длиннее обычного: он один на главу и несёт возвращения всей главы.
const SIZE = { bingo: [4, 12], gull: [4, 10], docks: [4, 12], letters: [3, 5], pairs: [4, 6] };
const HEARD = new Set(["bingo", "gull", "docks", "letters"]);
// Как в src/story/review.ts: существительное для причалов, слово для букв, смысл для пар и чайки.
const ARTICLE = /^(der|die|das) /;
const PLURAL_ONLY = new Set(["die Eltern", "die Geschwister", "die Großeltern", "die Möbel", "die Nebenkosten", "die Ferien", "die USA", "die Leute", "die Pommes frites"]);
const isNoun = (w) => ARTICLE.test(w) && !PLURAL_ONLY.has(w);
const bare = (w) => w.replace(ARTICLE, "");
const spellable = (w) => /^\p{L}+$/u.test(bare(w)) && bare(w).length <= 10;
const meaning = (ru) => ru.split(/[;,/!?(]/)[0].trim().toLowerCase();
const fits = (mech, w) => (mech === "docks" ? isNoun(w) : mech === "letters" ? spellable(w) : true);

const last = sceneChapters.length;
// Где игрок впервые встречает единицу: первая глава, чьи сцены кладут её в повторение.
const metAt = new Map();
sceneChapters.forEach((c, ci) => c.beats.forEach((b) => sceneUnits(b, lookup).forEach((u) => !metAt.has(u) && metAt.set(u, ci + 1))));
const playable = [...metAt.keys()].filter((u) => !u.includes(":"));

const index = buildIndex({ warmups: false });
const T = THRESHOLD.words;
const plans = [];
for (const w of index.words) {
  if (w.status === "закреплено" || !w.hits) continue;
  // Единица игры для слова эталона: сама запись, иначе самая короткая, где слово узнаётся.
  const unit =
    playable.find((u) => u === w.de) ??
    playable.filter((u) => bare(u).toLowerCase() === bare(w.de).toLowerCase())[0] ??
    playable.filter((u) => u.split(" ").length <= 3 && found(w.de, u)).sort((a, b) => a.length - b.length)[0];
  if (!unit) continue;
  const slots = Math.max(T.hits - w.hits, T.chapters - w.chapters.length, w.actions < T.actions || w.heard < T.heard ? 1 : 0);
  plans.push({ w, unit, met: metAt.get(unit), slots, heard: w.heard >= T.heard, chapters: new Set(w.chapters) });
}
// Сначала слова храповика, которые прошлая попытка раскладки потеряла (first). Затем слова A1 — те,
// которые игрок встречает раньше главы A2_FROM: их закрепляет только A1, а поздние слова доводит
// сезон A2. Внутри — слова поздних глав: им осталось меньше глав для возвращений, а слово ранней главы
// найдёт место и раньше. Затем остальные слова храповика и те, кому до закрепления нужно меньше всего.
const baseline = JSON.parse(readFileSync(BASELINE, "utf8"));
const kept = new Set(baseline.words);
const first = new Set();
const late = (p) => p.met >= A2_FROM;
const queue = (a, b) =>
  first.has(b.w.key) - first.has(a.w.key) ||
  late(a) - late(b) ||
  b.met - a.met ||
  kept.has(b.w.key) - kept.has(a.w.key) ||
  a.slots - b.slots ||
  a.w.key.localeCompare(b.w.key, "de");

// В главе: три игры раунда перед ней и четыре блока возвращений в сценах, в каждом причалы и лото.
// Блоки 0 и 1 стоят в сценах 3 и 6, 2 и 3 — в сценах 2 и 5; заполняются по порядку, поэтому
// последние два собираются только там, где слов прошлых глав больше, чем мест в первых.
const BLOCKS = 4;
const games = Object.fromEntries(
  Object.entries(ROUNDS)
    .filter(([n]) => Number(n) <= last)
    .map(([n, mechs]) => [
      n,
      [
        ...mechs.map((mech) => ({ mech, words: [], where: "w", min: SIZE[mech][0], max: SIZE[mech][1] })),
        ...Array.from({ length: BLOCKS }, (_, b) => [
          { mech: "docks", words: [], where: b, min: 4, max: 12 },
          // Лото в сцене — ровно 3 × 3.
          { mech: "bingo", words: [], where: b, min: 9, max: 9 },
        ]).flat(),
      ],
    ]),
);
const room = (g, unit) =>
  !g.closed &&
  g.words.length < g.max &&
  fits(g.mech, unit) &&
  !g.words.includes(unit) &&
  !((g.mech === "gull" || g.mech === "pairs") && g.words.some((x) => meaning(lookup(x).ru) === meaning(lookup(unit).ru)));
// Причалы — для существительных, буквы — для коротких слов, пары — только тем, кто уже звучал.
const PREFER = ["docks", "letters", "gull", "bingo", "pairs"];
// Интервалы растут: следующая глава, через две, через пять.
const STEPS = [1, 3, 6, 2, 4, 5, 7, 8, 9, 10, 11];

/** Ставит слово в игры, пока ему не хватает мест; каждая глава — не больше одного раза. */
function place(p) {
  for (const step of STEPS) {
    if (p.need <= 0) return;
    const n = p.met + step;
    if (!games[n] || p.used.has(n)) continue;
    if (p.chapters.has(n) && T.chapters - p.chapters.size > 0) continue;
    const order = PREFER.filter((m) => p.heard || HEARD.has(m));
    const game = order.flatMap((m) => games[n].filter((g) => g.mech === m)).find((g) => room(g, p.unit));
    if (!game) continue;
    game.words.push(p.unit);
    p.used.add(n);
    p.chapters.add(n);
    p.heard ||= HEARD.has(game.mech);
    p.need--;
  }
}

/**
 * Недобранную игру (лото в сцене — ровно девять слов) добирают словами, которым места ещё нужны,
 * затем остальными словами ниже порога и, наконец, любыми встреченными: лишняя встреча не вредит, а
 * закрытая игра забирает места у всех.
 */
function fill(g, n, unique) {
  for (const p of [...unique.filter((q) => q.need > 0), ...unique.filter((q) => q.need <= 0)]) {
    if (g.words.length >= g.min) return;
    if (p.met >= n || p.used.has(n) || !room(g, p.unit) || !(p.heard || HEARD.has(g.mech))) continue;
    g.words.push(p.unit);
    p.used.add(n);
    p.chapters.add(n);
    p.heard ||= HEARD.has(g.mech);
    p.need--;
  }
  for (const u of playable) {
    if (g.words.length >= g.min) return;
    if (metAt.get(u) < n && lookup(u) && room(g, u)) g.words.push(u);
  }
}

/**
 * Раскладывает очередь по играм. Игра, которую не добрать до минимума, не собирается: такие игры
 * закрываем и раскладываем всё заново с начала очереди, пока закрывать нечего, — так начало очереди
 * первым занимает оставшиеся места.
 */
function layout() {
  plans.sort(queue);
  const unique = plans.filter((p, i) => plans.findIndex((q) => q.unit === p.unit) === i);
  for (const g of Object.values(games).flat()) g.closed = false;
  for (let round = 0; round < 20; round++) {
    for (const g of Object.values(games).flat()) g.words = [];
    // Каждая попытка начинает со слова, каким его видит индекс без раундов, а не с прошлой раскладки.
    unique.forEach((p) => Object.assign(p, { need: p.slots, used: new Set(), chapters: new Set(p.w.chapters), heard: p.w.heard >= T.heard }));
    for (const p of unique) place(p);
    for (const [n, list] of Object.entries(games)) for (const g of list) if (g.words.length && g.words.length < g.min) fill(g, Number(n), unique);
    const small = Object.values(games).flat().filter((g) => !g.closed && g.words.length && g.words.length < g.min);
    if (!small.length) break;
    for (const g of small) g.closed = true;
  }
  for (const g of Object.values(games).flat()) if (g.closed) g.words = [];
}

// Очередь лишь оценивает, сколько мест нужно слову, а закреплено ли оно, решает индекс. Поэтому
// раскладку проверяет его прогноз: слова храповика, которые она теряет, встают в начало очереди, и
// раскладка собирается заново, пока потерянные не кончатся или подъём перестанет помогать. Раскладку
// с потерями --write не записывает. Прогноз считает игры по их словам, без немецкой инструкции над
// игрой в сцене; последнее слово за тестом храповика после pnpm content.
let forecast;
let lost;
for (;;) {
  layout();
  const draft = Object.entries(games).flatMap(([n, list]) => list.filter((g) => g.words.length).map((g) => ({ chapter: Number(n), mech: g.mech, words: g.words })));
  forecast = buildIndex({ warmups: false, games: draft });
  const now = baselineOf(forecast);
  const gone = (list, from) => list.filter((k) => !from.includes(k));
  lost = { words: gone(baseline.words, now.words), grammar: gone(baseline.grammar, now.grammar), present: gone(baseline.present, now.present) };
  const fresh = lost.words.filter((k) => !first.has(k));
  if (!fresh.length) break;
  fresh.forEach((k) => first.add(k));
}

const list = (words) => `[${words.map((w) => JSON.stringify(w)).join(", ")}]`;
const body = Object.entries(games)
  .map(([n, all]) => {
    const rows = all.filter((g) => g.where === "w" && g.words.length).map((g) => `    { mech: "${g.mech}", words: ${list(g.words)} },`);
    return rows.length ? `  ${n}: [\n${rows.join("\n")}\n  ],` : "";
  })
  .filter(Boolean)
  .join("\n");
const backs = Object.entries(games)
  .map(([n, all]) => {
    const rows = Array.from({ length: BLOCKS }, (_, b) => {
      const of = (mech) => all.find((g) => g.where === b && g.mech === mech).words;
      return `    { docks: ${list(of("docks"))}, bingo: ${list(of("bingo"))} },`;
    });
    return `  ${n}: [\n${rows.join("\n")}\n  ],`;
  })
  .join("\n");
const file = `import type { Warmup } from "../review.ts";

// Раунд перед главой новой версии (A1-PLAN.md, «Повторение»): одинаковый для всех игроков, поэтому
// индекс полноты засчитывает его игры как часть главы. Слова — из прошлых глав, которым не хватает
// возвращений. Список собирает scripts/a1-returns.mjs --write; собранное можно править руками.

/** Возвращения в сценах главы: четыре блока (сцены 3, 6, 2 и 5), в каждом причалы и лото. */
export const RETURNS: Record<number, { docks: string[]; bingo: string[] }[]> = {
${backs}
};

export const WARMUPS: Record<number, Warmup[]> = {
${body}
};
`;

const placed = Object.values(games).flatMap((l) => l.flatMap((g) => g.words)).length;
const anchored = forecast.words.filter((w) => w.status === "закреплено").length;
console.log(`Ниже порога и можно вернуть: ${plans.length} слов. Мест в раундах занято: ${placed}.`);
for (const [n, all] of Object.entries(games)) console.log(`  глава ${n}: ${all.map((g) => `${g.where === "w" ? "" : `↩${g.where} `}${g.mech} ${g.words.length}`).join(", ")}`);
console.log(`Прогноз: закреплено ${anchored} слов из ${forecast.words.length}, в храповике ${baseline.words.length}.`);
if (lost.words.length || lost.grammar.length || lost.present.length) {
  console.error(`Раскладка теряет закреплённое: слова ${JSON.stringify(lost.words)}, правила ${JSON.stringify(lost.grammar)}, исчезают из курса ${JSON.stringify(lost.present)}. Не записано.`);
  process.exitCode = 1;
} else if (process.argv.includes("--write")) {
  writeFileSync(OUT, file);
  console.log(`Записано: ${path.relative(root, OUT)}. Пересоберите индекс: pnpm content.`);
}
