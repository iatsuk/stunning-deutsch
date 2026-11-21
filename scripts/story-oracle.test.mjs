import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

// Оракул поворотов (A1-STORYCRAFT.md): тот же seed даёт те же броски, а уровень A2 берёт ансамбль и
// предмет из плана сезона (A2-PLOT.md, «Сюжеты глав»).
const script = fileURLToPath(new URL("story-oracle.mjs", import.meta.url));
const roll = (...args) => execFileSync(process.execPath, [script, ...args], { encoding: "utf8" });
const { chapters } = parse(readFileSync(new URL("../content/reference/a2-chapters.yaml", import.meta.url), "utf8"));

test("the A1 oracle repeats the rolls recorded in the plot plan", () => {
  // Бросок главы 6 из A1-PLOT.md, «Переработка глав 6–12».
  const out = roll("--chapter", "6", "--rolls", "1", "--seed", "1795220685");
  assert.match(out, /Фокус \(d12\): Смена точки зрения/);
  assert.match(out, /Кто \(d10\): Йенсен/);
  assert.match(out, /Действие \(d20\): промокнуть/);
  assert.match(out, /Предмет из урока \(d\d+\): der Nachmittag/);
  assert.match(out, /Сила \(d20\): 18/);
  assert.equal(roll("--chapter", "6", "--seed", "1795220685", "--level", "a1"), out);
});

test("the A2 oracle rolls the season cast and nouns of the chapter plan", () => {
  const nouns = (c) => c.words.map((w) => (typeof w === "string" ? w : w.de)).filter((de) => /^(der|die|das) /.test(de));
  const out = roll("--chapter", "1", "--rolls", "20", "--seed", "1795300000", "--level", "a2");
  const subjects = [...out.matchAll(/Предмет из плана главы \(d(\d+)\): (.+)/g)];
  assert.equal(subjects.length, 20);
  for (const [, sides, noun] of subjects) {
    assert.equal(Number(sides), nouns(chapters[0]).length);
    assert.ok(nouns(chapters[0]).includes(noun), noun);
  }
  assert.match(out, /Кто \(d15\)/);
  assert.equal(roll("--chapter", "1", "--rolls", "20", "--seed", "1795300000", "--level", "a2"), out);
  // У главы 13 своих слов нет: предмет — из всего плана сезона.
  const last = roll("--chapter", "13", "--seed", "1795300000", "--level", "a2");
  assert.match(last, new RegExp(`\\(d${chapters.flatMap(nouns).length}\\)`));
  assert.throws(() => roll("--chapter", "1", "--level", "b2"), /не знаком/);
});
