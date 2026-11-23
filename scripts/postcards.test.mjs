import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { phrases } from "../src/story/data.ts";
import { audioKey, spoken } from "../src/story/logic.ts";
import { cardHeight, wrapLines } from "../src/story/postcardImage.ts";
import { openPostcards, POSTCARDS, postcardPictures } from "../src/story/postcards.ts";
import { sceneChapters } from "../src/story/scenes/index.ts";

// Открытки о Германии: открываются после своей сцены, а их немецкое слово можно послушать.
const words = JSON.parse(readFileSync(new URL("../src/generated/a1-words.json", import.meta.url), "utf8"));
const recordings = JSON.parse(readFileSync(new URL("../src/generated/story-audio.json", import.meta.url), "utf8"));
const beats = new Map(sceneChapters.flatMap((c) => c.beats).map((b) => [b.id, b]));
const recorded = (de) => {
  if (words[de]) return Boolean(words[de].audio);
  const p = Object.values(phrases).find((x) => x.de === de);
  return Boolean(p && recordings[audioKey(spoken(p))]);
};

test("every postcard has its own id, a recorded word and a scene that mentions it", () => {
  assert.equal(new Set(POSTCARDS.map((c) => c.id)).size, POSTCARDS.length);
  for (const card of POSTCARDS) {
    assert.ok(recorded(card.de), `${card.id}: у слова ${card.de} нет записи`);
    const beat = beats.get(card.scene);
    assert.ok(beat, `${card.id}: нет сцены ${card.scene}`);
    const word = card.de.replace(/^(der|die|das) /, "").replace(/[!?.]$/, "");
    const text = JSON.stringify(beat);
    assert.ok(text.includes(word) || text.includes(card.title), `${card.id}: сцена ${card.scene} не упоминает ${word}`);
  }
});

test("a postcard opens once its scene is passed, in story order", () => {
  assert.deepEqual(openPostcards([]), []);
  const opened = openPostcards(["06-s1", "01-s1"]).map((c) => c.id);
  assert.deepEqual(opened, ["moin", "kieler-woche", "fischbroetchen", "halb", "feierabend", "sonntag"]);
});

test("every postcard has its picture, a thumbnail and a description", () => {
  for (const card of POSTCARDS) {
    const { full, thumb } = postcardPictures(card.id);
    for (const file of [full, thumb]) assert.ok(existsSync(new URL(`../public/${file}`, import.meta.url)), file);
    assert.ok(card.alt.length > 20, `${card.id}: нет описания картинки`);
  }
});

test("the saved card wraps its note by width, keeps words whole and grows with the text", () => {
  const measure = (s) => s.length;
  const lines = wrapLines("eins zwei drei vier fünf", 10, measure);
  assert.deepEqual(lines, ["eins zwei", "drei vier", "fünf"]);
  assert.ok(lines.every((l) => measure(l) <= 10));
  assert.deepEqual(wrapLines("Donaudampfschiff ab", 5, measure), ["Donaudampfschiff", "ab"]);
  assert.ok(cardHeight(6) > cardHeight(3));
});

