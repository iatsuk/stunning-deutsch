import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { phrases } from "../src/story/data.ts";
import { lockKey } from "../src/story/logic.ts";
import { grade } from "../src/story/memory.ts";
import { buildReview, MECHS, pluralTraps, reviewSources, SCENE_INTERVALS, sceneUnits, warmupReview } from "../src/story/review.ts";
import { sceneChapters } from "../src/story/scenes/index.ts";
import { RETURNS, WARMUPS } from "../src/story/scenes/warmups.ts";
import { VERBS } from "../src/story/verbs.ts";

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
  for (const item of [...of("verbs"), ...of("perfekt")]) {
    assert.equal(item.options.filter((o) => o === item.answer).length, 1, item.verb);
    assert.equal(new Set(item.options).size, 3, item.verb);
  }
  for (const item of of("verbs")) assert.ok(VERBS[item.verb].forms.includes(item.answer), item.verb);
  for (const item of of("perfekt")) assert.equal(item.answer, VERBS[item.verb].perfekt, item.verb);
  for (const mech of ["plural", "cloze", "who", "mistake", "verbs", "perfekt"]) assert.ok(of(mech).length, `${mech} ни разу не собралась`);
  const grids = games.filter((g) => g.mech === "crossword").map((g) => g.grid);
  assert.ok(grids.length, "кроссворд ни разу не собрался");
  for (const grid of grids) {
    const cells = new Map();
    for (const w of grid.words)
      [...w.word].forEach((ch, i) => {
        const key = `${w.down ? w.x : w.x + i},${w.down ? w.y + i : w.y}`;
        assert.ok(!cells.has(key) || cells.get(key) === ch, `${w.word}: клетка ${key} занята другой буквой`);
        cells.set(key, ch);
      });
    assert.ok([...cells.keys()].every((k) => { const [x, y] = k.split(",").map(Number); return x < grid.width && y < grid.height; }));
  }
});

test("the round before a chapter is fixed, playable and returns only words the player has met", () => {
  // Глава, где игрок впервые встречает единицу: её сцены кладут единицу в повторение.
  const metAt = new Map();
  sceneChapters.forEach((c, ci) => c.beats.forEach((b) => sceneUnits(b, lookup).forEach((u) => !metAt.has(u) && metAt.set(u, ci + 1))));
  const meaning = (ru) => ru.split(/[;,/!?(]/)[0].trim().toLowerCase();
  const chapters = Object.keys(WARMUPS).map(Number);
  assert.ok(chapters.length >= sceneChapters.length - 1, "не у каждой главы есть раунд перед ней");
  for (const n of chapters) {
    const games = WARMUPS[n];
    assert.ok(n >= 2 && n <= sceneChapters.length, `раунд перед главой ${n}: такой главы нет`);
    assert.ok(games.length >= 2 && games.length <= 3, `глава ${n}: ${games.length} игр`);
    assert.equal(new Set(games.map((g) => g.mech)).size, games.length, `глава ${n}: механики повторяются`);
    for (const g of games) {
      assert.equal(new Set(g.words).size, g.words.length, `глава ${n}: ${g.mech} — слово дважды`);
      for (const w of g.words) {
        assert.ok(lookup(w), `глава ${n}: ${w} — нет перевода`);
        assert.ok(dictionary[w]?.audio || byDe.has(w), `глава ${n}: ${w} — нет записи`);
        assert.ok(metAt.get(w) < n, `глава ${n}: ${w} — игрок его ещё не встречал`);
      }
      if (g.mech === "docks") for (const w of g.words) assert.match(w, /^(der|die|das) /, `глава ${n}: ${w} — не существительное`);
      if (g.mech === "gull" || g.mech === "pairs")
        assert.equal(new Set(g.words.map((w) => meaning(lookup(w).ru))).size, g.words.length, `глава ${n}: ${g.mech} — два слова с одним смыслом`);
    }
    assert.equal(warmupReview(games, lookup)?.games.length, games.length, `глава ${n}: раунд не собрался`);
  }
  // Возвращения в сценах (src/story/scenes/back.ts) — тоже только встреченные раньше слова.
  for (const [n, blocks] of Object.entries(RETURNS))
    for (const { docks, bingo } of blocks) {
      for (const w of [...docks, ...bingo]) {
        assert.ok(lookup(w) && (dictionary[w]?.audio || byDe.has(w)), `глава ${n}: ${w} — нет перевода или записи`);
        assert.ok(metAt.get(w) < Number(n), `глава ${n}: ${w} — игрок его ещё не встречал`);
      }
      for (const w of docks) assert.match(w, /^(der|die|das) /, `глава ${n}: ${w} — не существительное`);
      assert.ok(bingo.length === 0 || bingo.length === 9, `глава ${n}: лото на ${bingo.length}`);
    }
});
