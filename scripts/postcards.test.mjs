import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { phrases } from "../src/story/data.ts";
import { audioKey, spoken } from "../src/story/logic.ts";
import { openPostcards, POSTCARDS } from "../src/story/postcards.ts";
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
