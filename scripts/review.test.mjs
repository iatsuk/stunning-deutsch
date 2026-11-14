import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { phrases } from "../src/story/data.ts";
import { lockKey } from "../src/story/logic.ts";
import { grade } from "../src/story/memory.ts";
import { buildReview, MECHS, pluralTraps, reviewSources, SCENE_INTERVALS, sceneUnits } from "../src/story/review.ts";
import { sceneChapters } from "../src/story/scenes/index.ts";

// Повторение новой версии (A1-PLAN.md, «Повторение»): раунд из трёх игр разных механик.
const dictionary = JSON.parse(readFileSync(new URL("../src/generated/a1-words.json", import.meta.url), "utf8"));
const byDe = new Map(Object.values(phrases).map((p) => [p.de, p]));
const lookup = (de) => dictionary[de] ?? (byDe.has(de) ? { ru: byDe.get(de).ru, pl: byDe.get(de).pl } : undefined);
const words = [...Object.keys(dictionary), ...byDe.keys()];
const scenes = sceneChapters.flatMap((c) => c.beats);
const sources = reviewSources(scenes);
const ctx = (seed, recent = []) => ({ lookup, sources, words, seed, recent });
const unitsOf = (n) => [...new Set(sceneChapters.slice(0, n).flatMap((c) => c.beats.flatMap((b) => sceneUnits(b, lookup))))];

test("a scene gives words with a translation, the lines that teach them and its lock phrases", () => {
  const units = sceneUnits(scenes[0], lookup);
  assert.ok(units.some((u) => u.startsWith("line:")), "нет реплик");
  assert.ok(units.some((u) => dictionary[u]), "нет слов уроков");
  for (const beat of scenes)
    for (const unit of sceneUnits(beat, lookup))
      assert.ok(lookup(unit) || sources.lines[unit] || sources.locks[unit], `${beat.id}: ${unit} — нечем повторять`);
  assert.ok(scenes.some((b) => sceneUnits(b, lookup).some((u) => u.startsWith("lock:"))), "нет фраз замков");
});

test("a round is up to three games of different mechanics, each unit once", () => {
  const cards = Object.fromEntries(unitsOf(4).map((u) => [u, { box: 0, step: 0, day: 0 }]));
  for (const seed of ["a", "b", "c", "d", "e"]) {
    const review = buildReview(cards, 10, 5, ctx(seed));
    assert.ok(review && review.games.length === 3, seed);
    const mechs = review.games.map((g) => g.mech);
    assert.equal(new Set(mechs).size, mechs.length, `${seed}: ${mechs}`);
    const units = review.games.flatMap((g) => g.units);
    assert.equal(new Set(units).size, units.length, `${seed}: единица дважды`);
    for (const u of units) assert.ok(cards[u], u);
  }
  assert.equal(buildReview({}, 0, 0, ctx("x")), null);
});

test("rounds rotate mechanics: no mechanic opens a round right after it was played", () => {
  let cards = Object.fromEntries(unitsOf(12).map((u) => [u, { box: 0, step: 0, day: 0 }]));
  let recent = [];
  const seen = new Set();
  for (let r = 0; r < 40; r++) {
    const day = 1 + Math.floor(r / 4);
    const review = buildReview(cards, r, day, ctx(`round-${r}`, recent));
    if (!review) continue;
    const mechs = review.games.map((g) => g.mech);
    assert.ok(!recent.includes(mechs[0]), `раунд ${r}: ${mechs[0]} снова первой после ${recent}`);
    mechs.forEach((m) => seen.add(m));
    // Половина ответов с ошибкой: очередь не пустеет и прочность растёт неравномерно.
    const units = review.games.flatMap((g) => g.units);
    cards = grade(cards, units, units.filter((_, i) => i % 2), r, day, SCENE_INTERVALS);
    recent = mechs;
  }
  assert.deepEqual(MECHS.filter((m) => !seen.has(m)), [], "механики не встретились ни разу");
});

test("new mechanics are built correctly", () => {
  for (const [noun, entry] of Object.entries(dictionary).filter(([w, e]) => /^(der|die|das) /.test(w) && e.pl).slice(0, 60))
    assert.ok(!pluralTraps(noun, entry.pl).includes(entry.pl), `${noun}: ловушка совпала с верным ${entry.pl}`);
  const cards = Object.fromEntries(unitsOf(12).map((u, i) => [u, { box: i % 4, step: 0, day: 0 }]));
  const games = [];
  for (let r = 0; r < 60; r++) games.push(...(buildReview(cards, 30, 30, ctx(`check-${r}`, []))?.games ?? []));
  const of = (mech) => games.filter((g) => g.mech === mech).flatMap((g) => g.items);
  for (const item of of("plural")) {
    assert.equal(item.options.filter((o) => o === item.answer).length, 1, item.de);
    assert.equal(new Set(item.options).size, 3, item.de);
  }
  for (const item of of("cloze")) {
    assert.equal(item.before + item.answer + item.after, item.line.de);
    assert.ok(item.options.includes(item.answer) && new Set(item.options).size === 3, item.line.de);
  }
  for (const item of of("who")) assert.ok(item.options.includes(item.answer) && new Set(item.options).size === 3, item.line.de);
  for (const item of of("mistake")) {
    assert.notEqual(item.chunks[item.wrong], item.right);
    const fixed = item.chunks.map((c, i) => (i === item.wrong ? item.right : c));
    assert.equal(fixed.join(" "), lockKey(sources.locks[item.unit].round));
  }
  for (const mech of ["plural", "cloze", "who", "mistake"]) assert.ok(of(mech).length, `${mech} ни разу не собралась`);
});
