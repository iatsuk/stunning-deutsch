// Частота механик (A2-PLOT.md, «Частота механик»): в каких главах стоит каждая игра. Отчёт MECHANICS.md
// собирается при `pnpm content` по сценам A1 и по плану сезона A2 (content/reference/a2-chapters.yaml);
// вручную — `node scripts/mechanics.mjs`.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { flatNodes } from "../src/story/scene.ts";
import { sceneChapters } from "../src/story/scenes/index.ts";

export const REPORT = fileURLToPath(new URL("../MECHANICS.md", import.meta.url));
const PLAN = fileURLToPath(new URL("../content/reference/a2-chapters.yaml", import.meta.url));

/** Постоянные механики: в каждой главе — речь, письмо и замок, как на экзамене. */
export const STEADY = ["oral", "letter", "lock"];
/** Игры возвращения расставляет планировщик (scripts/a1-returns.mjs): их число задаёт он, а не правило. */
export const RETURNS = ["docks", "bingo"];
/** Правило для остальных мини-игр: в скольких главах сезона, сколько раз за главу, сколько разных в главе. */
export const RULE = { minChapters: 3, maxChapters: 7, maxPerChapter: 2, minKinds: 8 };

/** Сколько раз каждая игра стоит в каждой главе сцен: { вид: [число по главам] }. */
export function sceneMechanics(chapters = sceneChapters) {
  const table = {};
  chapters.forEach((chapter, i) => {
    for (const beat of chapter.beats)
      for (const node of flatNodes(beat.challenge.nodes))
        if (node.t === "game") (table[node.c.kind] ??= Array(chapters.length).fill(0))[i] += 1;
  });
  return table;
}

/** План сезона A2 в том же виде: игра, названная в главе, стоит в ней один раз. */
export function planMechanics(plan = parse(readFileSync(PLAN, "utf8"))) {
  const table = {};
  plan.chapters.forEach((chapter, i) => {
    for (const kind of chapter.games) (table[kind] ??= Array(plan.chapters.length).fill(0))[i] += 1;
  });
  return table;
}

const miniGames = (table) => Object.entries(table).filter(([kind]) => !STEADY.includes(kind) && !RETURNS.includes(kind));

/** Что нарушает правило: игра не в том числе глав, повтор сверх нормы, глава с бедным набором. */
export function ruleBreaks(table) {
  const games = miniGames(table);
  const breaks = [];
  for (const [kind, row] of games) {
    const chapters = row.filter(Boolean).length;
    if (chapters < RULE.minChapters || chapters > RULE.maxChapters) breaks.push(`\`${kind}\`: в ${chapters} главах`);
    row.forEach((n, i) => n > RULE.maxPerChapter && breaks.push(`\`${kind}\`: ${n} раз в главе ${i + 1}`));
  }
  const width = games[0]?.[1].length ?? 0;
  for (let i = 0; i < width; i++) {
    const kinds = games.filter(([, row]) => row[i]).length;
    if (kinds < RULE.minKinds) breaks.push(`глава ${i + 1}: ${kinds} разных мини-игр`);
  }
  return breaks;
}

function table(rows, cell) {
  const width = rows[0]?.[1].length ?? 0;
  const head = `| Игра | Глав | ${Array.from({ length: width }, (_, i) => i + 1).join(" | ")} |`;
  const line = `|---|---|${"---|".repeat(width)}`;
  const body = rows.map(([kind, row]) => `| \`${kind}\` | ${row.filter(Boolean).length} | ${row.map(cell).join(" | ")} |`);
  return [head, line, ...body].join("\n");
}

const byReach = (rows) => [...rows].sort(([a, x], [b, y]) => y.filter(Boolean).length - x.filter(Boolean).length || a.localeCompare(b));
const breaksList = (breaks) => (breaks.length ? breaks.map((b) => `- ${b}`).join("\n") : "Нарушений нет.");

export function renderMechanics(a1 = sceneMechanics(), a2 = planMechanics()) {
  const a1Breaks = ruleBreaks(a1);
  return `# Частота механик

Сгенерирован \`scripts/mechanics.mjs\` при \`pnpm content\`; не редактируйте вручную. Правило и решения —
\`A2-PLOT.md\`, раздел «Частота механик».

Правило для мини-игр: в ${RULE.minChapters}–${RULE.maxChapters} главах сезона, не больше ${RULE.maxPerChapter} раз за главу, в каждой главе не
меньше ${RULE.minKinds} разных. Постоянные механики (${STEADY.map((k) => `\`${k}\``).join(", ")}) стоят в каждой главе,
игры возвращения (${RETURNS.map((k) => `\`${k}\``).join(", ")}) расставляет планировщик; правило их не касается.

## A2: план сезона

План — поле \`games\` глав в \`content/reference/a2-chapters.yaml\`; тест \`scripts/mechanics.test.mjs\` держит
правило. Отметка — игра стоит в главе.

${table(byReach(miniGames(a2)), (n) => (n ? "✓" : ""))}

${breaksList(ruleBreaks(a2))}

## A1: сцены

Числа — сколько раз игра стоит в главе. Это отчёт: правило сезона A2 тест к A1 не применяет, нарушений —
${a1Breaks.length}.

${table(byReach(Object.entries(a1)), (n) => (n ? String(n) : ""))}

${breaksList(a1Breaks)}
`;
}

export function writeMechanics() {
  writeFileSync(REPORT, renderMechanics());
  const a2 = Object.keys(planMechanics()).length;
  return `Механики: план A2 — ${a2} мини-игр, нарушений ${ruleBreaks(planMechanics()).length}; A1 — нарушений ${ruleBreaks(sceneMechanics()).length} → MECHANICS.md`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(writeMechanics());
