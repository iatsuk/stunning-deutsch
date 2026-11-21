import test from "node:test";
import assert from "node:assert/strict";
import { dayNumber, dueWords, grade, remember } from "../src/story/memory.ts";
import { SCENE_INTERVALS } from "../src/story/review.ts";

test("a new word waits, then returns after enough steps or on the next day", () => {
  const cards = remember({}, ["der Hafen"], 10, 100);
  assert.deepEqual(dueWords(cards, 11, 100, SCENE_INTERVALS), []);
  assert.deepEqual(dueWords(cards, 12, 100, SCENE_INTERVALS), ["der Hafen"]);
  assert.deepEqual(dueWords(cards, 11, 101, SCENE_INTERVALS), ["der Hafen"]);
});
test("a known word is not reset by meeting it again, a mistake resets it", () => {
  const start = grade(
    remember({}, ["der Hafen"], 1, 1),
    ["der Hafen"],
    [],
    2,
    2,
    SCENE_INTERVALS,
  );
  assert.equal(start["der Hafen"].box, 1);
  assert.equal(remember(start, ["der Hafen"], 3, 3)["der Hafen"].box, 1);
});
test("a right answer moves a word up, a mistake sends it back, the top box holds", () => {
  let cards = remember({}, ["a", "b"], 0, 0);
  cards = grade(cards, ["a", "b"], ["b"], 1, 1, SCENE_INTERVALS);
  assert.equal(cards.a.box, 1);
  assert.equal(cards.b.box, 0);
  for (let i = 0; i < 20; i++) cards = grade(cards, ["a"], [], i, i, SCENE_INTERVALS);
  assert.equal(cards.a.box, 5);
  assert.deepEqual(Object.keys(grade(cards, ["a"], [], 1, 1, SCENE_INTERVALS)).sort(), [
    "a",
    "b",
  ]);
});
test("strong words wait longer, and the most overdue word comes first", () => {
  const cards = {
    fresh: { box: 0, step: 0, day: 0 },
    strong: { box: 3, step: 0, day: 0 },
  };
  assert.deepEqual(dueWords(cards, 500, 0, SCENE_INTERVALS), ["fresh"]);
  assert.deepEqual(dueWords(cards, 0, 7, SCENE_INTERVALS), ["fresh"]);
  assert.deepEqual(dueWords(cards, 0, 8, SCENE_INTERVALS), ["fresh", "strong"]);
});
test("a local day changes at midnight", () => {
  const evening = new Date(2026, 10, 1, 23, 30).getTime();
  const night = new Date(2026, 10, 2, 0, 30).getTime();
  const morning = new Date(2026, 10, 2, 11, 0).getTime();
  assert.equal(dayNumber(night), dayNumber(evening) + 1);
  assert.equal(dayNumber(morning), dayNumber(night));
});
test("misses add up, survive right answers and count once per round", () => {
  let cards = remember({}, ["a", "b"], 0, 0);
  cards = grade(cards, ["a", "a", "b"], ["a", "a"], 1, 1, SCENE_INTERVALS);
  assert.equal(cards.a.miss, 1);
  assert.equal("miss" in cards.b, false);
  cards = grade(cards, ["a"], [], 2, 2, SCENE_INTERVALS);
  assert.deepEqual(cards.a, { box: 1, step: 2, day: 2, miss: 1 });
});
