import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { episodes, beats, phrases } from "../src/story/data.ts";
import {
  beatPhrases,
  initialAnswer,
  isCorrect,
  knownBefore,
  normalizeSave,
  STORY_KEY,
  validateStory,
} from "../src/story/logic.ts";
const byId = (id) => beats.find((b) => b.id === id);

test("12 sequential chapters cover the A1 route, with reachable, unique actions", () => {
  assert.equal(episodes.length, 12);
  assert.equal(beats.length, 60);
  assert.equal(new Set(episodes.map((e) => e.id)).size, 12);
  assert.deepEqual(validateStory(episodes, phrases), []);
  assert.ok(episodes.every((e) => e.beats.length === 5));
  assert.equal(new Set(beats.map((b) => b.challenge.kind)).size, 5);
  assert.equal(beats.at(-1).id, "12-finale");
});
test("detective answers require evidence; photos do not prove theft or intent", () => {
  for (const [id, accepted, rejected] of [
    ["01-lead", "contact", "thief"],
    ["05-bag", "two", "guilty"],
    ["07-photo", "two", "theft"],
    ["12-deduction", "forgot", "gull"],
  ]) {
    assert.equal(isCorrect(byId(id).challenge, accepted), true);
    assert.equal(isCorrect(byId(id).challenge, rejected), false);
  }
});
test("numbers, offered times and amounts preserve meaningful distinctions", () => {
  assert.ok(isCorrect(byId("02-number").challenge, "0176234581"));
  assert.ok(!isCorrect(byId("02-number").challenge, "176234581"));
  assert.ok(isCorrect(byId("02-pin").challenge, "32"));
  assert.ok(!isCorrect(byId("02-pin").challenge, "23"));
  assert.ok(isCorrect(byId("06-time").challenge, "1730"));
  assert.ok(!isCorrect(byId("06-time").challenge, "1830"));
  assert.ok(isCorrect(byId("10-reception").challenge, "1115"));
  assert.ok(!isCorrect(byId("10-reception").challenge, "1145"));
  const c = byId("04-basket").challenge;
  assert.ok(isCorrect(c, { w: 2, b: 3, c: 0 }));
  assert.ok(!isCorrect(c, { w: 3, b: 2, c: 0 })); // Same total is not the same order.
  assert.ok(!isCorrect(c, { w: 2, b: 3, c: 1 }));
});
test("German order, articles and sentence frames cannot be replaced by bag-of-words answers", () => {
  assert.ok(
    isCorrect(byId("06-frame").challenge, [
      "Das Treffen",
      "fängt",
      "um 17:30 Uhr",
      "an.",
    ]),
  );
  assert.ok(
    !isCorrect(byId("06-frame").challenge, [
      "Das Treffen",
      "fängt",
      "an.",
      "um 17:30 Uhr",
    ]),
  );
  assert.ok(
    isCorrect(byId("09-dativ").challenge, [
      "Wir",
      "fahren",
      "mit dem Bus",
      "zum Café.",
    ]),
  );
  assert.ok(
    isCorrect(byId("11-perfect").challenge, [
      "Ich",
      "habe",
      "gestern",
      "gearbeitet.",
    ]),
  );
  assert.ok(
    isCorrect(byId("12-perfect").challenge, [
      "Die Tasche",
      "ist",
      "angekommen.",
    ]),
  );
  assert.equal(phrases.inbag.de, "in der Tasche");
  assert.equal(phrases.table.de, "auf dem Tisch");
  assert.equal(phrases.bus.de, "mit dem Bus");
  assert.equal(phrases.him.de, "Ich nehme ihn.");
});
test("phrases are introduced before becoming German-only; callbacks repeat in new scenes", () => {
  assert.equal(knownBefore(beats, 0).has("moin"), false);
  assert.equal(knownBefore(beats, 1).has("moin"), true);
  assert.equal(knownBefore(beats, 1).has("inbag"), false);
  assert.ok(knownBefore(beats, 59).has("inbag"));
  for (const [id, p] of Object.entries(phrases)) {
    assert.ok(
      beats.some((b) => beatPhrases(b).includes(id)),
      `Unused phrase: ${id}`,
    );
    assert.ok(p.ru && p.de && p.note);
    assert.ok(!/[а-яё]/i.test(p.de), `Cyrillic in German: ${id}`);
  }
  const repeated = Object.keys(phrases).filter(
    (id) => beats.filter((b) => beatPhrases(b).includes(id)).length > 1,
  );
  assert.ok(repeated.length >= 45, `${repeated.length} repeated units`);
});
test("saved progress survives reload, clamps malformed data, and retains unfinished drafts", () => {
  assert.notEqual(STORY_KEY, "sd-adventure-v1");
  const draft = {
    version: 1,
    cursor: 5,
    completed: 5,
    drafts: { "02-number": "0176", "01-question": ["Wo", "ist"] },
    support: true,
  };
  assert.deepEqual(
    normalizeSave(JSON.parse(JSON.stringify(draft)), beats),
    draft,
  );
  const malformed = normalizeSave(
    {
      completed: -3,
      cursor: 999,
      drafts: { "02-number": {}, "01-question": ["Wo", "Wo", "ist", "bogus"] },
    },
    beats,
  );
  assert.equal(malformed.cursor, 0);
  assert.equal(malformed.completed, 0);
  assert.equal(malformed.drafts["02-number"], undefined);
  assert.deepEqual(malformed.drafts["01-question"], ["Wo", "ist"]);
  assert.equal(normalizeSave(null, beats).support, false);
  assert.equal(normalizeSave({ completed: 4, cursor: 55 }, beats).cursor, 4);
});
test("no initial draft earns a success; missing pairs cannot pass", () => {
  for (const b of beats)
    assert.equal(
      isCorrect(b.challenge, initialAnswer(b.challenge)),
      false,
      b.id,
    );
  assert.equal(
    isCorrect(byId("03-family").challenge, { g: "sister", n: "brother" }),
    false,
  );
});
test("all three story recordings exist and the active generator refuses Qwen before loading models", () => {
  assert.equal(beats.filter((b) => b.audio).length, 3);
  for (const b of beats.filter((b) => b.audio))
    assert.ok(
      existsSync(
        new URL(`../public/story-audio/${b.audio.file}.m4a`, import.meta.url),
      ),
    );
  const config = JSON.parse(
    readFileSync(new URL("../scripts/tts/config.json", import.meta.url)),
  );
  assert.equal(config.model, "k2-fsa/OmniVoice");
  assert.equal(config.encoding.trimEnd, false);
  assert.equal(config.encoding.paddingEndMs, 300);
  const rejected = spawnSync(
    "python3",
    [
      "scripts/tts/generate.py",
      "--manifest",
      "unused.json",
      "--out",
      "unused",
      "--config",
      "scripts/tts/legacy-qwen-config.json",
    ],
    { encoding: "utf8", cwd: new URL("../", import.meta.url) },
  );
  assert.notEqual(rejected.status, 0);
  assert.match(rejected.stderr, /Only OmniVoice/);
});
