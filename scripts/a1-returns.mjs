// Планировщик возвращений (A1-PLAN.md, этап 3): раскладывает слова прошлых глав, которым не хватает
// встреч, по раундам перед главой. Раунд одинаков для всех игроков и считается частью главы, поэтому
// каждое место в нём даёт слову встречу, действие, а часто и новую главу и прослушивание.
//   node scripts/a1-returns.mjs          — показать план и прогноз
//   node scripts/a1-returns.mjs --write  — записать его в src/story/scenes/warmups.ts
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { phrases } from "../src/story/data.ts";
import { sceneUnits } from "../src/story/review.ts";
import { sceneChapters } from "../src/story/scenes/index.ts";
import { buildIndex, found, THRESHOLD } from "./a1-index.mjs";

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
const SIZE = { bingo: [4, 9], gull: [4, 8], docks: [4, 8], letters: [3, 4], pairs: [4, 5] };
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
// Сначала те, кому до закрепления нужно меньше всего, — так закрепится больше слов.
plans.sort((a, b) => a.slots - b.slots || a.met - b.met || a.w.key.localeCompare(b.w.key, "de"));

const games = Object.fromEntries(
  Object.entries(ROUNDS)
    .filter(([n]) => Number(n) <= last)
    .map(([n, mechs]) => [n, mechs.map((mech) => ({ mech, words: [] }))]),
);
const taken = new Set();
const room = (g, unit) =>
  g.words.length < SIZE[g.mech][1] &&
  fits(g.mech, unit) &&
  !((g.mech === "gull" || g.mech === "pairs") && g.words.some((x) => meaning(lookup(x).ru) === meaning(lookup(unit).ru)));
// Причалы — для существительных, буквы — для коротких слов, пары — только тем, кто уже звучал.
const PREFER = ["docks", "letters", "gull", "bingo", "pairs"];

for (const p of plans) {
  if (taken.has(p.unit)) continue;
  taken.add(p.unit);
  let need = p.slots;
  let heard = p.heard;
  const used = new Set();
  // Интервалы растут: следующая глава, через две, через пять.
  for (const step of [1, 3, 6, 2, 4, 5, 7, 8, 9, 10, 11]) {
    if (need <= 0) break;
    const n = p.met + step;
    if (!games[n] || used.has(n)) continue;
    const newChapter = !p.chapters.has(n);
    const chaptersShort = T.chapters - p.chapters.size > 0;
    if (!newChapter && chaptersShort) continue;
    const order = PREFER.filter((m) => heard || HEARD.has(m));
    const game = order.map((m) => games[n].find((g) => g.mech === m)).find((g) => g && room(g, p.unit));
    if (!game) continue;
    game.words.push(p.unit);
    used.add(n);
    p.chapters.add(n);
    heard ||= HEARD.has(game.mech);
    need--;
  }
}

// Игра меньше своего минимума не собирается: её слова переходят в соседнюю игру раунда, если влезут.
for (const list of Object.values(games))
  for (const g of list) {
    if (g.words.length >= SIZE[g.mech][0]) continue;
    for (const w of g.words.splice(0)) list.find((o) => o !== g && o.words.length >= SIZE[o.mech][0] && room(o, w))?.words.push(w);
  }

const body = Object.entries(games)
  .map(([n, list]) => {
    const rows = list.filter((g) => g.words.length).map((g) => `    { mech: "${g.mech}", words: [${g.words.map((w) => JSON.stringify(w)).join(", ")}] },`);
    return rows.length ? `  ${n}: [\n${rows.join("\n")}\n  ],` : "";
  })
  .filter(Boolean)
  .join("\n");
const file = `import type { Warmup } from "../review.ts";

// Раунд перед главой новой версии (A1-PLAN.md, «Повторение»): одинаковый для всех игроков, поэтому
// индекс полноты засчитывает его игры как часть главы. Слова — из прошлых глав, которым не хватает
// возвращений. Список собирает scripts/a1-returns.mjs --write; собранное можно править руками.
export const WARMUPS: Record<number, Warmup[]> = {
${body}
};
`;

const placed = Object.values(games).flatMap((l) => l.flatMap((g) => g.words)).length;
console.log(`Ниже порога и можно вернуть: ${plans.length} слов. Мест в раундах занято: ${placed}.`);
for (const [n, list] of Object.entries(games)) console.log(`  глава ${n}: ${list.map((g) => `${g.mech} ${g.words.length}`).join(", ")}`);
if (process.argv.includes("--write")) {
  writeFileSync(OUT, file);
  console.log(`Записано: ${path.relative(root, OUT)}. Пересоберите индекс: pnpm content.`);
}
