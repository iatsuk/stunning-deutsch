import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parse } from "yaml";
import { planMechanics, REPORT, renderMechanics, ruleBreaks, sceneMechanics } from "./mechanics.mjs";

// Частота механик (A2-PLOT.md): план сезона A2 держит правило, отчёт MECHANICS.md актуален.
const plan = parse(readFileSync(new URL("../content/reference/a2-chapters.yaml", import.meta.url), "utf8"));

test("MECHANICS.md matches the scenes and the A2 plan (run pnpm content)", () => {
  assert.equal(readFileSync(REPORT, "utf8"), renderMechanics());
});

test("the A2 plan keeps every mini-game in enough chapters and every chapter varied", () => {
  assert.deepEqual(ruleBreaks(planMechanics(plan)), []);
});

test("every game the A2 plan names exists in the scenes or is declared new", () => {
  const known = new Set([...Object.keys(sceneMechanics()), ...Object.keys(plan.newGames)]);
  assert.deepEqual(Object.keys(planMechanics(plan)).filter((kind) => !known.has(kind)), []);
});

test("the rule catches a game in too few chapters and a chapter with too few games", () => {
  const breaks = ruleBreaks({ a: [1, 0, 0], b: [0, 3, 0] });
  assert.ok(breaks.some((b) => b.includes("`a`: в 1 главах")));
  assert.ok(breaks.some((b) => b.includes("3 раз в главе 2")));
  assert.ok(breaks.some((b) => b.startsWith("глава 3")));
});
