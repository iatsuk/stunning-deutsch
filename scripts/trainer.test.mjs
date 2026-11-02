import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { scramble, shuffle } from "../src/lib/shuffle.ts";
import { beats } from "../src/story/data.ts";
import { judge, orderAccepted } from "../src/trainer/logic.ts";

const read = (path) => JSON.parse(readFileSync(new URL(`../src/generated/${path}`, import.meta.url), "utf8"));
const catalog = read("catalog.json");
const topics = catalog.levels.flatMap((level) => level.topics.map((meta) => ({ level: level.id, ...read(`topics/${meta.id}.json`) })));
const indices = (options) => options.map((_, index) => index);

/** Доля верного ответа на каждой позиции: все позиции встречаются, ни одна не подсказывает ответ. */
function assertEven(positions, label) {
  const shares = [0, 1, 2].map((place) => positions.filter((position) => position === place).length / positions.length);
  for (const share of shares) assert.ok(share > 0.2 && share < 0.5, `${label}: ${shares.map((s) => s.toFixed(2))}`);
}

test("верный вариант нельзя угадать по позиции на экране", () => {
  for (const level of ["a1", "a2", "b1"]) {
    const list = topics.filter((topic) => topic.level === level);
    const choices = list.flatMap((topic) => topic.exercises.filter((e) => e.type === "choice" && e.options.length === 3));
    assertEven(choices.map((e) => shuffle(indices(e.options), e.id).indexOf(e.answer)), `${level} упражнения`);
    const steps = list.flatMap((topic) => topic.case?.steps.map((step, i) => [step, `${topic.id}-case-${i}`]) ?? []);
    assertEven(steps.map(([step, seed]) => shuffle(indices(step.options), seed).indexOf(step.answer)), `${level} дела`);
  }
  const story = beats.filter((beat) => beat.challenge.kind === "choice");
  assertEven(story.map((beat) => shuffle(beat.challenge.options, beat.id).findIndex((o) => o.id === beat.challenge.answer)), "Moin");
});

test("перемешивание стабильно, а плитки никогда не лежат готовым ответом", () => {
  const words = ["ich", "wohne", "in", "Kiel"];
  assert.deepEqual(shuffle(words, "seed"), shuffle(words, "seed"));
  for (let i = 0; i < 200; i++) assert.notDeepEqual(scramble(words, `seed-${i}`), words);
});

test("верная перестановка принимается, запятые и регистр плиток не мешают", () => {
  const de = "Ich komme nicht, weil ich arbeiten muss.";
  const accepted = [de, "Weil ich arbeiten muss, komme ich nicht."];
  assert.ok(orderAccepted(["ich", "komme", "nicht,", "weil", "ich", "arbeiten", "muss"], accepted));
  assert.ok(orderAccepted(["weil", "ich", "arbeiten", "muss", "komme", "ich", "nicht,"], accepted));
  assert.ok(!orderAccepted(["ich", "komme", "nicht,", "weil", "ich", "muss", "arbeiten"], accepted));
});

test("обстоятельство на первой позиции не считается ошибкой, смена смысла считается", () => {
  const exercise = (de) => topics.flatMap((topic) => topic.exercises).find((e) => e.type === "order" && e.de === de);
  const kitchen = exercise("Der Kühlschrank steht in der Küche.");
  assert.ok(orderAccepted("in der Küche steht der Kühlschrank".split(" "), [kitchen.de, ...kitchen.also]));
  const cafe = exercise("Café B ist günstiger als Café A.");
  assert.ok(!orderAccepted("Café A ist günstiger als Café B".split(" "), [cafe.de, ...cafe.also]));
});

test("в каждой теме хватает фраз для поиска ошибки, и в них нет русских подсказок вместо немецкого", () => {
  for (const topic of topics) {
    assert.ok(topic.spy.length >= 4, `${topic.id}: ${topic.spy.length}`);
    for (const item of topic.spy) {
      assert.notEqual(item.de, item.wrong);
      assert.ok(item.why.trim());
      assert.doesNotMatch(item.de + item.wrong, /[Ѐ-ӿ]/);
    }
  }
});

test("accents of loanwords are optional, umlauts and ß are not", () => {
  assert.equal(judge("das Cafe", ["das Café"]), "right");
  assert.equal(judge("das Café", ["das Café"]), "right");
  assert.equal(judge("Kueche", ["Küche"]), "umlaut");
  assert.equal(judge("Kuche", ["Küche"]), "wrong");
  assert.equal(judge("gross", ["groß"]), "umlaut");
});
