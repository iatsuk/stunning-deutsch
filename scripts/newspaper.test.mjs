import assert from "node:assert/strict";
import test from "node:test";
import { FRONT, newspaper, newspaperLines, REPORTER } from "../src/story/newspaper.ts";
import { TRACKS } from "../src/story/world.ts";

// Газета Kieler Woche: первая новость у всех одна, остальные зависят от линий мира.
test("the paper has one story per line of the world, chosen by its value", () => {
  const calm = newspaper({});
  const busy = newspaper({ gull: 6, spread: 2, frauke: 3, nils: 1, petersen: 3 });
  assert.equal(calm[0], FRONT);
  assert.equal(calm.length, busy.length);
  for (let i = 1; i < calm.length; i++) assert.notEqual(calm[i].de, busy[i].de);
  const lines = newspaperLines();
  assert.equal(new Set(lines.map((l) => l.text)).size, lines.length);
  assert.ok(lines.every((l) => l.voice === REPORTER));
  assert.ok(Object.keys(TRACKS).length >= calm.length - 1);
});
