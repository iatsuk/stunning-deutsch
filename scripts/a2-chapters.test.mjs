import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parse } from "yaml";

// Раскладка сезона A2 по главам (A2-PLOT.md): всё, что нужно выучить на A2, стоит в плане ровно один раз.
const read = (file) => parse(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"));
const a1 = read("content/reference/start-deutsch-1.yaml");
const a2 = read("content/reference/start-deutsch-2.yaml");
const { chapters } = read("content/reference/a2-chapters.yaml");
const index = JSON.parse(readFileSync(new URL("../src/generated/a1-index.json", import.meta.url), "utf8"));

const de = (w) => (typeof w === "string" ? w : w.de);
const key = (w) => de(w).toLowerCase();
const vocabulary = (ref) => [...ref.words, ...Object.values(ref.groups ?? {}).flat()].map(de);
const known = new Set(vocabulary(a1).map(key));
/** Новые слова A2 и слова A1, которые закрепляет сезон A2. */
const required = new Set([
  ...vocabulary(a2).filter((w) => !known.has(key(w))).map(key),
  ...index.words.filter((w) => w.status === "закрепит A2").map(key),
]);
const planned = chapters.flatMap((c) => c.words.map(key));
const counts = (list) => list.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map());

test("every word the A2 season must teach stands in exactly one chapter", () => {
  const twice = [...counts(planned)].filter(([, n]) => n > 1).map(([w]) => w);
  assert.deepEqual(twice, [], "слово стоит в нескольких главах");
  assert.deepEqual([...required].filter((w) => !planned.includes(w)), [], "слова нет ни в одной главе");
  assert.deepEqual(planned.filter((w) => !required.has(w)), [], "слова нет в эталоне A2 или оно уже в эталоне A1");
});

test("every A2 grammar point stands in exactly one chapter, and chapters stay balanced", () => {
  const ids = a2.grammar.map((g) => g.id);
  const used = chapters.flatMap((c) => c.grammar);
  assert.deepEqual([...used].sort(), [...ids].sort(), "пункт грамматики пропущен, повторён или неизвестен");
  assert.deepEqual(chapters.map((c) => c.chapter), chapters.map((_, i) => i + 1));
  // Глава «A2+» новых слов не вводит: она повторяет весь уровень.
  const taught = chapters.filter((c) => c.words.length);
  const mean = planned.length / taught.length;
  for (const c of taught)
    assert.ok(Math.abs(c.words.length - mean) <= mean * 0.2, `глава ${c.chapter}: ${c.words.length} слов при средних ${Math.round(mean)}`);
});
