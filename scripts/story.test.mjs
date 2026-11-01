import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { preis } from "../src/lib/german.ts";
import { episodes, beats, phrases } from "../src/story/data.ts";
import {
  beatPhrases,
  canMove,
  initialAnswer,
  isCorrect,
  knownBefore,
  mistake,
  normalizeSave,
  placeKey,
  solution,
  STORY_KEY,
  validateStory,
  walk,
} from "../src/story/logic.ts";
const byId = (id) => beats.find((b) => b.id === id);

test("12 sequential chapters cover the A1 route, with reachable, unique actions", () => {
  assert.equal(episodes.length, 12);
  assert.equal(beats.length, 60);
  assert.equal(new Set(episodes.map((e) => e.id)).size, 12);
  assert.deepEqual(validateStory(episodes, phrases), []);
  assert.ok(episodes.every((e) => e.beats.length === 5));
  assert.equal(new Set(beats.map((b) => b.challenge.kind)).size, 15);
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
  assert.ok(isCorrect(byId("06-time").challenge, "17:30"));
  assert.ok(!isCorrect(byId("06-time").challenge, "18:30"));
  assert.ok(!isCorrect(byId("06-time").challenge, "05:30"));
  assert.ok(isCorrect(byId("10-reception").challenge, "11:15"));
  assert.ok(!isCorrect(byId("10-reception").challenge, "11:45"));
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
test("games vary: choice no longer dominates and the same game never repeats in a row", () => {
  const kinds = beats.map((b) => b.challenge.kind);
  assert.ok(kinds.filter((k) => k === "choice").length <= 12);
  kinds.forEach((kind, i) =>
    assert.notEqual(kind, kinds[i - 1], `${beats[i].id} repeats ${kind}`),
  );
  for (const episode of episodes)
    assert.ok(
      new Set(episode.beats.map((b) => b.challenge.kind)).size >= 3,
      episode.id,
    );
});
test("every step shows a working answer, also for saves from another game kind", () => {
  for (const b of beats) {
    assert.ok(isCorrect(b.challenge, solution(b.challenge)), b.id);
    assert.ok(mistake(b.challenge, initialAnswer(b.challenge), b.hint), b.id);
  }
  const old = normalizeSave(
    {
      cursor: 7,
      completed: 22,
      drafts: {
        "01-mateo": "origin",
        "04-order": "tea",
        "04-request": ["Ich", "möchte"],
        "06-time": "1730",
        "08-where": { k: "table", t: "kitchen" },
      },
    },
    beats,
  );
  assert.equal(old.cursor, 7);
  assert.equal(old.completed, 22);
  assert.equal(old.drafts["01-mateo"], undefined);
  assert.equal(old.drafts["04-order"], undefined);
  assert.equal(old.drafts["06-time"], undefined);
  assert.deepEqual(old.drafts["04-request"], []);
  assert.deepEqual(old.drafts["08-where"], { k: "table", t: "kitchen" });
});
test("chat needs every reply in order and remembers only correct ones", () => {
  const c = byId("04-order").challenge;
  assert.ok(isCorrect(c, ["tea", "no", "thanks"]));
  assert.ok(!isCorrect(c, ["tea", "no"]));
  assert.ok(!isCorrect(c, ["coffee", "no", "thanks"]));
  const saved = normalizeSave(
    { drafts: { "04-order": ["tea", "yes", "thanks"] } },
    beats,
  );
  assert.deepEqual(saved.drafts["04-order"], ["tea"]);
});
test("stamps, gaps, sorting and text spotting require the exact evidence", () => {
  const stamps = byId("03-no").challenge;
  assert.ok(isCorrect(stamps, { 0: "yes", 1: "no", 2: "no" }));
  assert.ok(!isCorrect(stamps, { 0: "yes", 1: "no" }));
  assert.ok(!isCorrect(stamps, { 0: "yes", 1: "yes", 2: "no" }));
  assert.match(
    mistake(stamps, { 0: "yes", 1: "yes", 2: "no" }, ""),
    /принадлежность/,
  );
  const cases = byId("08-case").challenge;
  assert.ok(isCorrect(cases, ["in der", "auf dem"]));
  assert.ok(!isCorrect(cases, ["in die", "auf dem"]));
  assert.ok(!isCorrect(cases, ["auf dem", "in der"]));
  const pronouns = byId("05-pronoun").challenge;
  assert.ok(isCorrect(pronouns, ["ihn", "sie", "es"]));
  assert.ok(!isCorrect(pronouns, ["sie", "ihn", "es"]));
  const genders = byId("08-compound").challenge;
  assert.equal(genders.answer.schrank, "der");
  assert.equal(genders.answer.haustuer, "die");
  assert.equal(genders.answer.wohnzimmer, "das");
  const note = byId("08-note").challenge;
  assert.deepEqual(note.answer, ["1:2"]);
  assert.equal(note.lines[1][2], "im Bus.");
  assert.ok(!isCorrect(note, ["2:2"]));
  const log = byId("06-log").challenge;
  assert.ok(isCorrect(log, [...log.answer].reverse()));
  assert.ok(!isCorrect(log, [log.answer[0]]));
  assert.deepEqual(
    normalizeSave({ drafts: { "06-log": ["1:0", "1:0", "9:9"] } }, beats)
      .drafts["06-log"],
    ["1:0"],
  );
});
test("memory repeats only phrases the story has already shown", () => {
  const memories = beats.filter((b) => b.challenge.kind === "memory");
  assert.equal(memories.length, 3);
  for (const b of memories) {
    const known = knownBefore(beats, beats.indexOf(b) + 1);
    for (const pair of b.challenge.pairs) {
      assert.ok(known.has(pair.id), `${b.id}: ${pair.id}`);
      assert.equal(pair.de, phrases[pair.id].de);
      assert.ok(pair.ru);
    }
    assert.ok(
      !isCorrect(
        b.challenge,
        b.challenge.pairs.slice(1).map((p) => p.id),
      ),
    );
  }
});
test("the walk follows the driver's words and stays on the map", () => {
  const c = byId("09-directions").challenge;
  assert.ok(isCorrect(c, ["geradeaus", "links", "rechts"]));
  assert.equal(
    c.places[placeKey(walk(c, c.moves).at(-1))],
    "das Café Nordlicht",
  );
  assert.ok(!isCorrect(c, ["geradeaus", "rechts", "links"]));
  assert.ok(!isCorrect(c, ["geradeaus", "geradeaus"]));
  assert.equal(
    c.places[placeKey(walk(c, ["geradeaus", "geradeaus"]).at(-1))],
    "der Bahnhof",
  );
  assert.equal(canMove(c, ["geradeaus", "geradeaus"], "geradeaus"), false);
  assert.equal(canMove(c, ["geradeaus"], "links"), true);
  assert.deepEqual(
    normalizeSave(
      { drafts: { "09-directions": ["geradeaus", "geradeaus", "geradeaus"] } },
      beats,
    ).drafts["09-directions"],
    ["geradeaus", "geradeaus"],
  );
});
test("change can be paid in any coins, the amount is what counts", () => {
  const c = byId("05-change").challenge;
  assert.ok(isCorrect(c, { 100: 1, 50: 1 }));
  assert.ok(isCorrect(c, { 50: 3 }));
  assert.ok(!isCorrect(c, { 200: 1 }));
  assert.ok(!isCorrect(c, {}));
  assert.equal(preis(150), "ein Euro fünfzig");
  assert.equal(preis(200), "zwei Euro");
  assert.equal(preis(70), "siebzig Cent");
});
test("calendar and clock keep similar dates and times apart", () => {
  const date = byId("12-date").challenge;
  assert.ok(isCorrect(date, "Juni:1"));
  assert.ok(!isCorrect(date, "Juli:1"));
  assert.ok(!isCorrect(date, "Juni:7"));
  assert.equal(
    normalizeSave({ drafts: { "12-date": "Juni:31" } }, beats).drafts[
      "12-date"
    ],
    undefined,
  );
  const time = byId("06-time").challenge;
  assert.match(mistake(time, "18:30", byId("06-time").hint), /halb sieben/);
  assert.equal(
    normalizeSave({ drafts: { "06-time": "17:37" } }, beats).drafts["06-time"],
    undefined,
  );
  assert.equal(
    normalizeSave({ drafts: { "06-time": "17:45" } }, beats).drafts["06-time"],
    "17:45",
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
