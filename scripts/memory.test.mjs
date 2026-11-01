import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { beats, phrases } from "../src/story/data.ts";
import { isCorrect, normalizeSave, solution } from "../src/story/logic.ts";
import {
  buildRound,
  dayNumber,
  dueWords,
  grade,
  memoryStats,
  remember,
  slip,
  stepWords,
  timeForRound,
} from "../src/story/memory.ts";

const dictionary = JSON.parse(
  readFileSync(new URL("../src/generated/a1-words.json", import.meta.url)),
);
const CHAPTER = 14;
const chapterOf = (index) => Math.floor(index / CHAPTER);
const all = Object.keys(dictionary);

/** Все слова словаря в одной коробке и с просрочкой: так раунд выбирает из всего словаря. */
const shelf = (box) =>
  Object.fromEntries(all.map((word) => [word, { box, step: 0, day: 0 }]));

test("a new word waits, then returns after enough steps or on the next day", () => {
  const cards = remember({}, ["der Hafen"], 10, 100);
  assert.deepEqual(dueWords(cards, 13, 100), []);
  assert.deepEqual(dueWords(cards, 24, 100), ["der Hafen"]);
  assert.deepEqual(dueWords(cards, 11, 101), ["der Hafen"]);
});
test("a known word is not reset by meeting it again, a mistake resets it", () => {
  const start = grade(
    remember({}, ["der Hafen"], 1, 1),
    ["der Hafen"],
    [],
    2,
    2,
  );
  assert.equal(start["der Hafen"].box, 1);
  assert.equal(remember(start, ["der Hafen"], 3, 3)["der Hafen"].box, 1);
  assert.equal(slip(start, "der Hafen", 3, 3)["der Hafen"].box, 0);
});
test("a right answer moves a word up, a mistake sends it back, the top box holds", () => {
  let cards = remember({}, ["a", "b"], 0, 0);
  cards = grade(cards, ["a", "b"], ["b"], 1, 1);
  assert.equal(cards.a.box, 1);
  assert.equal(cards.b.box, 0);
  for (let i = 0; i < 20; i++) cards = grade(cards, ["a"], [], i, i);
  assert.equal(cards.a.box, 5);
  assert.deepEqual(Object.keys(grade(cards, ["a"], [], 1, 1)).sort(), [
    "a",
    "b",
  ]);
});
test("strong words wait longer, and the most overdue word comes first", () => {
  const cards = {
    fresh: { box: 0, step: 0, day: 0 },
    strong: { box: 3, step: 0, day: 0 },
  };
  assert.deepEqual(dueWords(cards, 500, 0), ["fresh"]);
  assert.deepEqual(dueWords(cards, 0, 7), ["fresh"]);
  assert.deepEqual(dueWords(cards, 0, 8), ["fresh", "strong"]);
});
test("every round is a playable game whatever the words", () => {
  for (const box of [0, 1, 2, 3, 4, 5])
    for (let extra = 0; extra < 40; extra++) {
      const cards = shelf(box);
      for (const word of all.slice(extra, extra + extra * 3))
        delete cards[word];
      const round = buildRound(cards, 500, 500, dictionary);
      assert.ok(round, `box ${box}`);
      const c = round.challenge;
      assert.equal(new Set(round.words).size, round.words.length);
      assert.ok(round.words.length >= 4);
      assert.ok(round.words.every((word) => dictionary[word]?.audio));
      assert.ok(isCorrect(c, solution(c)), c.kind);
      if (c.kind === "docks")
        for (const word of c.words) {
          assert.match(word, /^(der|die|das) /);
          assert.ok(!["die Eltern", "die Möbel", "die USA"].includes(word));
        }
      if (c.kind === "letters")
        for (const word of c.words)
          assert.match(word.replace(/^(der|die|das) /, ""), /^\p{L}+$/u);
      if (c.kind === "write")
        for (const f of c.fields)
          assert.ok(!/[–…]/.test(f.answers[0]), f.label);
    }
});
test("a round stops short of four words, and difficulty rises with the box", () => {
  const few = Object.fromEntries(
    all.slice(0, 3).map((word) => [word, { box: 0, step: 0, day: 0 }]),
  );
  assert.equal(buildRound(few, 500, 500, dictionary), null);
  const seen = (box) =>
    new Set(
      [...Array(30).keys()].map((n) => {
        const cards = shelf(box);
        for (const word of all.slice(0, n)) delete cards[word];
        return buildRound(cards, 500, 500, dictionary).challenge.kind;
      }),
    );
  assert.ok(seen(0).has("bingo"));
  assert.ok(!seen(0).has("write"));
  assert.ok(seen(3).has("write"));
  assert.ok(!seen(3).has("bingo"));
});
test("a typed round accepts a synonym, because the Russian label cannot tell them apart", () => {
  const cards = Object.fromEntries(
    ["Hallo!", "die Küche", "der Tisch", "gestern", "heute", "der Bus"].map(
      (word) => [word, { box: 3, step: 0, day: 0 }],
    ),
  );
  const { challenge: c } = buildRound(cards, 0, 500, dictionary);
  assert.equal(c.kind, "write");
  const field = c.fields.find((f) => f.answers[0] === "Hallo!");
  assert.ok(field.answers.includes("Moin!"));
});
test("rounds arrive every few steps and on a new day, not on every step", () => {
  const last = { step: 10, day: 5 };
  assert.equal(timeForRound(last, 13, 5), false);
  assert.equal(timeForRound(last, 14, 5), true);
  assert.equal(timeForRound(last, 10, 6), true);
});
test("a local day changes at midnight", () => {
  const evening = new Date(2026, 10, 1, 23, 30).getTime();
  const night = new Date(2026, 10, 2, 0, 30).getTime();
  const morning = new Date(2026, 10, 2, 11, 0).getTime();
  assert.equal(dayNumber(night), dayNumber(evening) + 1);
  assert.equal(dayNumber(morning), dayNumber(night));
});
test("malformed memory in a save is dropped, good cards stay", () => {
  const good = { box: 2, step: 5, day: 7 };
  const save = normalizeSave(
    {
      cards: { a: good, b: { box: -1, step: 0, day: 0 }, c: null, d: "x" },
      last: { step: "x", day: 1 },
    },
    beats,
  );
  assert.deepEqual(save.cards, { a: good });
  assert.deepEqual(save.last, { step: 0, day: 0 });
  assert.deepEqual(normalizeSave({ last: good }, beats).last, good);
  assert.deepEqual(normalizeSave(null, beats).cards, {});
});
test("the stats tell met, returned and firm words apart", () => {
  assert.deepEqual(
    memoryStats({
      a: { box: 0, step: 0, day: 0 },
      b: { box: 1, step: 0, day: 0 },
      c: { box: 3, step: 0, day: 0 },
    }),
    { met: 3, returned: 2, firm: 1 },
  );
});

/** Игрок проходит историю, ошибаясь в заданной доле слов; утром играет разминку из трёх раундов. */
function playthrough({ pace, slipRate, days = 0 }) {
  let seed = 12345;
  const random = () =>
    (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  let cards = {};
  let last = { step: 0, day: 0 };
  let day = 1;
  let rounds = 0;
  const returns = {};
  const session = (step, chapter) => {
    if (!timeForRound(last, step, day)) return;
    const goal = day > last.day ? 3 : 1;
    for (let i = 0; i < goal; i++) {
      const round = buildRound(cards, step, day, dictionary);
      if (!round) return;
      const missed = round.words.filter(() => random() < slipRate);
      cards = grade(cards, round.words, missed, step, day);
      last = { step, day };
      rounds++;
      for (const word of round.words) (returns[word] ??= []).push(chapter);
    }
  };
  beats.forEach((beat, index) => {
    if (index && index % pace === 0) day++;
    cards = remember(
      cards,
      stepWords(beat, dictionary, phrases),
      index + 1,
      day,
    );
    session(index + 1, chapterOf(index));
  });
  const storyRounds = rounds;
  const inStory = { ...returns };
  for (const word of Object.keys(inStory)) inStory[word] = [...inStory[word]];
  for (let i = 0; i < days; i++) {
    day++;
    session(beats.length, chapterOf(beats.length));
  }
  const first = {};
  beats.forEach((beat, index) => {
    for (const word of stepWords(beat, dictionary, phrases))
      first[word] ??= chapterOf(index);
  });
  return {
    storyRounds,
    entered: Object.keys(cards).length,
    later: all.filter((word) =>
      inStory[word]?.some((chapter) => chapter > first[word]),
    ).length,
    reviewed: all.filter((word) => returns[word]).length,
  };
}
test("every lesson word enters the memory", () => {
  assert.equal(playthrough({ pace: 20, slipRate: 0 }).entered, all.length);
});
test("most words come back in a later chapter, whatever the pace", () => {
  for (const pace of [20, 40, 168]) {
    const { later, storyRounds } = playthrough({ pace, slipRate: 0.15 });
    assert.ok(later >= all.length * 0.7, `${pace}: ${later} of ${all.length}`);
    assert.ok(storyRounds <= 60, `${pace}: ${storyRounds} rounds`);
  }
  const usual = playthrough({ pace: 20, slipRate: 0.15 });
  assert.ok(usual.later >= all.length * 0.8, `${usual.later}`);
});
test("two weeks of warm-ups after the finale reach every word", () => {
  const { reviewed } = playthrough({ pace: 20, slipRate: 0.15, days: 14 });
  assert.equal(reviewed, all.length);
});
