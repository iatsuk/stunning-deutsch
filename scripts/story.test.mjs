import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { plain, preis } from "../src/lib/german.ts";
import { phrases } from "../src/story/data.ts";
import { chat, gaps, order, pairs, sort, spot, turn, verdict, write } from "../src/story/build.ts";
import { GERMAN_TARGET, sceneChapters } from "../src/story/scenes/index.ts";
import { flatNodes, sceneVoices, shownWords } from "../src/story/scene.ts";
import { found } from "./a1-index.mjs";
import {
  beatPhrases,
  audioKey,
  canMove,
  challengeWords,
  initialAnswer,
  isCorrect,
  lockStart,
  mistake,
  placeKey,
  solution,
  storyLines,
  validateStory,
  walk,
} from "../src/story/logic.ts";

// Только классическая версия: данные шагов, их порядок, сохранение, повторение и карта правил.
import { episodes, beats } from "../src/story/data.ts";
import { rulesBefore, stepRules } from "../src/story/rules.ts";
import { V1_ORDER } from "../src/story/v1-order.ts";
import {
  knownBefore,
  missedBefore,
  normalizeSave,
  reachOf,
  reviewItems,
  STORY_KEY,
  storyWords,
} from "../src/story/logic.ts";
const byId = (id) => beats.find((b) => b.id === id);

const sceneBeats = sceneChapters.flatMap((c) => c.beats);
const sceneGames = sceneBeats.flatMap((b) => flatNodes(b.challenge.nodes)
  .flatMap((n, i) => n.t === "game" ? [{ id: `${b.id}-${i}`, challenge: n.c, hint: n.hint ?? b.hint }] : []));

test("classic: 12 sequential chapters cover the A1 route, with reachable, unique actions", () => {
  assert.equal(episodes.length, 12);
  assert.equal(beats.length, 192);
  assert.equal(new Set(episodes.map((e) => e.id)).size, 12);
  assert.deepEqual(validateStory(episodes, phrases), []);
  assert.ok(episodes.every((e) => e.beats.length === 16));
  assert.equal(new Set(beats.map((b) => b.challenge.kind)).size, 26);
  assert.equal(beats.at(-1).id, "12-finale");
});

test("classic: detective answers require evidence; photos do not prove theft or intent", () => {
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
  const number = { kind: "code", length: 10, answer: "0176234581" };
  const pin = { kind: "code", length: 2, answer: "32" };
  const time = { kind: "clock", start: "12:00", step: 15, answer: "17:30" };
  const reception = { kind: "clock", start: "12:00", step: 15, answer: "11:15" };
  assert.ok(isCorrect(number, "0176234581"));
  assert.ok(!isCorrect(number, "176234581"));
  assert.ok(isCorrect(pin, "32"));
  assert.ok(!isCorrect(pin, "23"));
  assert.ok(isCorrect(time, "17:30"));
  assert.ok(!isCorrect(time, "18:30"));
  assert.ok(!isCorrect(time, "05:30"));
  assert.ok(isCorrect(reception, "11:15"));
  assert.ok(!isCorrect(reception, "11:45"));
  const c = {
    kind: "quantity",
    items: [
      { id: "w", text: "Flaschen Wasser", max: 5 },
      { id: "b", text: "Brote", max: 5 },
      { id: "c", text: "Kaffee", max: 5 },
    ],
    answer: { w: 2, b: 3, c: 0 },
  };
  assert.ok(isCorrect(c, { w: 2, b: 3, c: 0 }));
  assert.ok(!isCorrect(c, { w: 3, b: 2, c: 0 })); // Same total is not the same order.
  assert.ok(!isCorrect(c, { w: 2, b: 3, c: 1 }));
});

test("German order, articles and sentence frames cannot be replaced by bag-of-words answers", () => {
  const frame = order(["Das Treffen", "fängt", "um 17:30 Uhr", "an."], ["an.", "um 17:30 Uhr", "Das Treffen", "fängt"]);
  const dativ = order(["Wir", "fahren", "mit dem Bus", "zum Café."], ["zum Café.", "Wir", "mit dem Bus", "fahren"]);
  const perfect = order(["Ich", "habe", "gestern", "gearbeitet."], ["gearbeitet.", "gestern", "habe", "Ich"]);
  const arrived = order(["Die Tasche", "ist", "angekommen."], ["angekommen.", "Die Tasche", "ist"]);
  assert.ok(
    isCorrect(frame, [
      "Das Treffen",
      "fängt",
      "um 17:30 Uhr",
      "an.",
    ]),
  );
  assert.ok(
    !isCorrect(frame, [
      "Das Treffen",
      "fängt",
      "an.",
      "um 17:30 Uhr",
    ]),
  );
  assert.ok(
    isCorrect(dativ, [
      "Wir",
      "fahren",
      "mit dem Bus",
      "zum Café.",
    ]),
  );
  assert.ok(
    isCorrect(perfect, [
      "Ich",
      "habe",
      "gestern",
      "gearbeitet.",
    ]),
  );
  assert.ok(
    isCorrect(arrived, [
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
  assert.equal(new Set(sceneBeats.slice(0, 0).flatMap(beatPhrases)).has("moin"), false);
  assert.equal(new Set(sceneBeats.slice(0, 1).flatMap(beatPhrases)).has("moin"), true);
  assert.equal(new Set(sceneBeats.slice(0, 1).flatMap(beatPhrases)).has("inbag"), false);
  for (const [id, p] of Object.entries(phrases)) {
    assert.ok(p.ru && p.de && p.note);
    assert.ok(!/[а-яё]/i.test(p.de), `Cyrillic in German: ${id}`);
  }
  const repeated = Object.keys(phrases).filter(
    (id) => sceneBeats.filter((b) => beatPhrases(b).includes(id)).length > 1,
  );
  assert.ok(repeated.length >= 45, `${repeated.length} repeated units`);
});

test("classic: phrases are introduced and used across both versions", () => {
  assert.equal(knownBefore(beats, 0).has("moin"), false);
  assert.equal(knownBefore(beats, 1).has("moin"), true);
  assert.equal(knownBefore(beats, 1).has("inbag"), false);
  assert.ok(knownBefore(beats, beats.length - 1).has("inbag"));
  // Выражения прототипа сцен тоже считаются: у него общий словарь выражений с игрой.
  const all = [...beats, ...sceneChapters.flatMap((c) => c.beats)];
  // Слово экзамена может ввести и реплика (learn), и осмотр: игрок видит его с переводом и записью.
  const shown = new Set(
    sceneChapters.flatMap((c) =>
      c.beats.flatMap((b) => flatNodes(b.challenge.nodes ?? []).flatMap((n) => (n.t === "say" ? (n.learn ?? []) : n.t === "look" ? n.items.map((i) => i.de) : []))),
    ),
  );
  for (const [id, p] of Object.entries(phrases)) {
    assert.ok(
      all.some((b) => beatPhrases(b).includes(id)) || shown.has(p.de),
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

test("classic: saved progress survives reload, clamps malformed data, and retains unfinished drafts", () => {
  assert.notEqual(STORY_KEY, "sd-adventure-v1");
  const draft = {
    version: 2,
    cursor: beats[5].id,
    done: beats.slice(0, 5).map((b) => b.id),
    skipped: [],
    drafts: { "02-number": "0176", "01-question": ["Wo", "ist"] },
    support: true,
    quiet: true,
    weak: { where: 2 },
    cards: { "der Hafen": { box: 1, step: 3, day: 4 } },
    last: { step: 3, day: 4 },
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
  assert.equal(malformed.cursor, beats[0].id);
  assert.deepEqual(malformed.done, []);
  assert.equal(malformed.drafts["02-number"], undefined);
  assert.deepEqual(malformed.drafts["01-question"], ["Wo", "ist"]);
  assert.equal(normalizeSave(null, beats).support, false);
  assert.equal(normalizeSave({ completed: 4, cursor: 55 }, beats).cursor, V1_ORDER[4]);
  const v2 = normalizeSave(
    { version: 2, cursor: "bogus", done: [beats[0].id, "bogus", 7], skipped: "x" },
    beats,
  );
  assert.deepEqual([v2.done, v2.skipped, v2.cursor], [[beats[0].id], [], beats[1].id]);
});

test("classic: progress is kept by step: an old save moves over, a new step waits as an empty cell", () => {
  // Сохранение версии 1: пройдено шесть глав, открыт первый шаг седьмой.
  const old = normalizeSave({ version: 1, completed: 96, cursor: 96 }, beats);
  // Отметки идут в нынешнем порядке шагов; удалённый шаг выпадает, переставленные остаются.
  const passed = new Set(V1_ORDER.slice(0, 96));
  assert.deepEqual(old.done, beats.map((b) => b.id).filter((id) => passed.has(id)));
  assert.equal(old.cursor, V1_ORDER[96]);
  assert.equal(reachOf(old, beats), 96);
  // Новый шаг посреди пройденной главы не сбивает границу, а ждёт как пропущенный.
  const extra = { ...beats[10], id: "03-new" };
  const longer = [...beats.slice(0, 40), extra, ...beats.slice(40)];
  const moved = normalizeSave({ version: 1, completed: 96, cursor: 96 }, longer);
  assert.equal(longer[reachOf(moved, longer)].id, V1_ORDER[96]);
  // Пустыми ячейками ждут только шаги, которых не было в версии 1: новый разговор главы 1 и вставка.
  assert.deepEqual(missedBefore(moved, longer).map((b) => b.id), ["01-witness", "03-new"]);
  // Отложенный шаг открывает следующий и сам остаётся пустой ячейкой.
  const skipped = normalizeSave(
    { version: 2, done: beats.slice(0, 3).map((b) => b.id), skipped: [beats[3].id], cursor: beats[4].id },
    beats,
  );
  assert.equal(skipped.cursor, beats[4].id);
  assert.equal(reachOf(skipped, beats), 4);
  assert.deepEqual(missedBefore(skipped, beats).map((b) => b.id), [beats[3].id]);
  const solved = normalizeSave({ ...skipped, done: [...skipped.done, beats[3].id] }, beats);
  assert.deepEqual(solved.skipped, []);
});

test("no initial draft earns a success; missing pairs cannot pass", () => {
  for (const b of [...sceneBeats, ...sceneGames])
    assert.equal(
      isCorrect(b.challenge, initialAnswer(b.challenge)),
      false,
      b.id,
    );
  assert.equal(
    isCorrect(pairs([["Greta", "сестра"], ["Nils", "брат"], ["Jensen", "отец"]]), { l0: "r0", l1: "r1" }),
    false,
  );
});

test("classic: games vary: choice no longer dominates and the same game never repeats in a row", () => {
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
  for (const b of [...sceneBeats, ...sceneGames]) {
    assert.ok(isCorrect(b.challenge, solution(b.challenge)), b.id);
    assert.ok(mistake(b.challenge, initialAnswer(b.challenge), b.hint), b.id);
  }
});

test("classic: saves from another game kind retain only valid drafts", () => {
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
  // Версия 1 считала шаги по старому порядку; шаг, которого больше нет, просто выпадает.
  assert.equal(old.cursor, V1_ORDER[7]);
  assert.equal(old.done.length, V1_ORDER.slice(0, 22).filter(byId).length);
  assert.equal(old.drafts["01-mateo"], undefined);
  assert.equal(old.drafts["04-order"], undefined);
  assert.equal(old.drafts["06-time"], undefined);
  assert.deepEqual(old.drafts["04-request"], []);
  assert.deepEqual(old.drafts["08-where"], { k: "table", t: "kitchen" });
});

test("chat needs every reply in order and remembers only correct ones", () => {
  const c = chat("Kellner", "Eddy", [
    turn("Moin! Was möchte Greta?", "Что хочет Грета?", "tea", [
      ["tea", "Einen Tee, bitte.", ""], ["coffee", "Einen Kaffee, bitte.", "Keinen Kaffee!"],
    ]),
    turn("Und einen Kaffee?", "А кофе?", "no", [
      ["no", "Nein, keinen Kaffee, danke.", ""], ["yes", "Ja, einen Kaffee, bitte.", "Keinen Kaffee!"],
    ]),
    turn("Noch etwas?", "Что-нибудь ещё?", "thanks", [
      ["thanks", "Nein, danke.", ""], ["kiel", "Ich wohne in Kiel.", "Это адрес."],
    ]),
  ]);
  assert.ok(isCorrect(c, ["tea", "no", "thanks"]));
  assert.ok(!isCorrect(c, ["tea", "no"]));
  assert.ok(!isCorrect(c, ["coffee", "no", "thanks"]));
});

test("classic: chat drafts remember only correct replies", () => {
  const saved = normalizeSave(
    { drafts: { "04-order": ["tea", "yes", "thanks"] } },
    beats,
  );
  assert.deepEqual(saved.drafts["04-order"], ["tea"]);
});

test("stamps, gaps, sorting and text spotting require the exact evidence", () => {
  const stamps = verdict(["Верно", "Неверно"], [
    ["Эта сумка не его.", true, "Das ist nicht meine Tasche."],
    ["У него вообще нет сумки.", false, "nicht meine отрицает именно принадлежность."],
    ["Его сумка пустая.", false, "О содержимом ответа нет."],
  ]);
  assert.ok(isCorrect(stamps, { 0: "yes", 1: "no", 2: "no" }));
  assert.ok(!isCorrect(stamps, { 0: "yes", 1: "no" }));
  assert.ok(!isCorrect(stamps, { 0: "yes", 1: "yes", 2: "no" }));
  assert.match(
    mistake(stamps, { 0: "yes", 1: "yes", 2: "no" }, ""),
    /принадлежность/,
  );
  const cases = gaps("Das Brot ist ___ Tasche. Der Schlüssel liegt ___ Tisch.",
    ["in der", "in die", "in dem", "auf dem", "auf den"], ["in der", "auf dem"]);
  assert.ok(isCorrect(cases, ["in der", "auf dem"]));
  assert.ok(!isCorrect(cases, ["in die", "auf dem"]));
  assert.ok(!isCorrect(cases, ["auf dem", "in der"]));
  const pronouns = {
    kind: "write", title: "Antworten von Greta",
    fields: [
      { id: "p", label: "Der Pullover? Ich nehme …", answers: ["ihn"] },
      { id: "j", label: "Die Jacke? Ich nehme … nicht.", answers: ["sie"] },
      { id: "t", label: "Das T-Shirt? Ich nehme … auch nicht.", answers: ["es"] },
    ],
  };
  assert.ok(isCorrect(pronouns, { p: "ihn", j: "sie", t: "es" }));
  assert.ok(!isCorrect(pronouns, { p: "sie", j: "ihn", t: "es" }));
  const genders = sort([["der", "der"], ["die", "die"], ["das", "das"]], [
    ["schrank", "Küchenschrank", "der"], ["haustuer", "Haustür", "die"], ["wohnzimmer", "Wohnzimmer", "das"],
  ]);
  assert.equal(genders.answer.schrank, "der");
  assert.equal(genders.answer.haustuer, "die");
  assert.equal(genders.answer.wohnzimmer, "das");
  const note = spot("Jensen", [
    "Die Tasche mit Brot|bleibt|hier.", "Die andere Tasche|ist|im Bus.", "Ich|bin|zu Hause.",
  ], ["im Bus."]);
  assert.deepEqual(note.answer, ["1:2"]);
  assert.equal(note.lines[1][2], "im Bus.");
  assert.ok(!isCorrect(note, ["2:2"]));
  const log = spot("Журнал клуба", [
    "17:30 Nils kommt mit einer roten Tasche.",
    "17:35 Jensen kommt mit einer roten Tasche.",
    "17:45 Jensen geht. Nils trinkt Tee.",
  ], ["17:35 Jensen kommt mit einer roten Tasche.", "17:45 Jensen geht. Nils trinkt Tee."]);
  assert.ok(isCorrect(log, [...log.answer].reverse()));
  assert.ok(!isCorrect(log, [log.answer[0]]));
});

test("classic: text spotting drafts keep each known token once", () => {
  assert.deepEqual(
    normalizeSave({ drafts: { "06-log": ["1:0", "1:0", "9:9"] } }, beats)
      .drafts["06-log"],
    ["1:0"],
  );
});

test("classic: memory repeats only phrases the story has already shown", () => {
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
  const c = {
    kind: "algo", width: 3, height: 3, max: 4,
    start: { x: 1, y: 2, heading: 0 },
    places: { "1,2": "die Haltestelle", "0,0": "das Café Nordlicht", "1,0": "der Bahnhof" },
    goal: "0,0", moves: ["geradeaus", "links", "rechts"],
  };
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
});

test("classic: walk drafts stop at the edge of the map", () => {
  assert.deepEqual(
    normalizeSave(
      { drafts: { "09-directions": ["geradeaus", "geradeaus", "geradeaus"] } },
      beats,
    ).drafts["09-directions"],
    ["geradeaus", "geradeaus"],
  );
});

test("change can be paid in any coins, the amount is what counts", () => {
  const c = { kind: "coins", coins: [200, 100, 50, 20, 10], answer: 150 };
  assert.ok(isCorrect(c, { 100: 1, 50: 1 }));
  assert.ok(isCorrect(c, { 50: 3 }));
  assert.ok(!isCorrect(c, { 200: 1 }));
  assert.ok(!isCorrect(c, {}));
  assert.equal(preis(150), "ein Euro fünfzig");
  assert.equal(preis(200), "zwei Euro");
  assert.equal(preis(70), "siebzig Cent");
});

test("calendar and clock keep similar dates and times apart", () => {
  const date = {
    kind: "calendar",
    months: [{ name: "Mai", days: 31 }, { name: "Juni", days: 30 }, { name: "Juli", days: 31 }],
    answer: "Juni:1",
  };
  assert.ok(isCorrect(date, "Juni:1"));
  assert.ok(!isCorrect(date, "Juli:1"));
  assert.ok(!isCorrect(date, "Juni:7"));
  const time = sceneGames.find((b) => b.challenge.kind === "clock").challenge;
  assert.match(mistake(time, "18:30", "hint"), /halb sieben/);
});

test("classic: calendar and clock drafts keep only offered dates and times", () => {
  assert.equal(
    normalizeSave({ drafts: { "12-date": "Juni:31" } }, beats).drafts[
      "12-date"
    ],
    undefined,
  );
  assert.equal(
    normalizeSave({ drafts: { "06-time": "17:37" } }, beats).drafts["06-time"],
    undefined,
  );
  assert.equal(
    normalizeSave({ drafts: { "06-time": "17:45" } }, beats).drafts["06-time"],
    "17:45",
  );
});

test("classic: every chapter teaches through listening, exact writing and returning mistakes", () => {
  for (const episode of episodes) {
    assert.ok(
      episode.beats.some(
        (b) => b.voices || b.audio || b.challenge.kind === "chat",
      ),
      `${episode.id}: нет голоса`,
    );
    assert.ok(
      episode.beats.some((b) => b.challenge.kind === "write"),
      `${episode.id}: нет записи`,
    );
    assert.ok(episode.review?.length >= 3, `${episode.id}: нет закрепления`);
    assert.ok(
      episode.beats.some((b) => b.practice?.length),
      `${episode.id}: ошибки не возвращаются`,
    );
  }
  assert.equal(beats.filter((b) => b.challenge.kind === "write").length, 23);
});

test("write checks the exact German form and explains near misses", () => {
  const c = write("Karten für den Club", [
    ["Dana · Wohnort", "Gaarden"], ["Mateo · Land", "Argentinien"],
    ["Greta · Wohnort", "Kiel"], ["Nils · kommt aus", "Hamburg"],
  ]);
  // Дана · Wohnort, Матео · Land, Грета · Wohnort, Нильс · kommt aus.
  const good = { f0: "Gaarden", f1: "Argentinien", f2: "Kiel", f3: "Hamburg" };
  assert.ok(isCorrect(c, good));
  assert.ok(isCorrect(c, { ...good, f1: " Argentinien. " }));
  assert.ok(!isCorrect(c, { ...good, f1: "argentinien" }));
  assert.ok(!isCorrect(c, { ...good, f0: "Kiel" }));
  // Грета родом из Гамбурга, но живёт в Киле: kommt aus и wohnt in не путаются.
  assert.ok(!isCorrect(c, { ...good, f2: "Hamburg" }));
  assert.ok(!isCorrect(c, { f0: "Gaarden" }));
  assert.match(
    mistake(c, { ...good, f1: "argentinien" }, "hint"),
    /заглавные.*Argentinien/,
  );
  assert.match(mistake(c, { ...good, f0: "Kiel" }, "hint"), /правильный ответ/);
  assert.notEqual(mistake(c, { ...good, f0: "Kiel" }, "hint"), "hint");
  assert.match(mistake(c, { f0: "Gaarden" }, "hint"), /Заполните/);
  const umlaut = {
    kind: "write",
    title: "t",
    fields: [{ id: "a", label: "l", answers: ["Küche"] }],
  };
  assert.match(mistake(umlaut, { a: "Kueche" }, "hint"), /умлаутом/);
  assert.ok(!isCorrect(umlaut, { a: "Kueche" }));
});

test("classic: errors stay until written correctly and return in later chapters", () => {
  const [first, second] = episodes;
  assert.deepEqual(reviewItems(first, {}), first.review);
  assert.deepEqual(reviewItems(second, {}), second.review);
  assert.equal(reviewItems(second, { argentina: 1 })[0], "argentina");
  const merged = reviewItems(first, { argentina: 2, where: 1 });
  assert.equal(merged[0], "argentina");
  assert.equal(new Set(merged).size, merged.length);
  assert.ok(merged.length <= 6);
  const many = Object.fromEntries(
    Object.keys(phrases)
      .slice(0, 16)
      .map((id) => [id, 1]),
  );
  const crowded = reviewItems(episodes.at(-1), many);
  assert.ok(crowded.length <= 6);
  assert.ok(
    crowded.filter((id) => episodes.at(-1).review.includes(id)).length >= 3,
  );
  const saved = normalizeSave({ weak: { where: 2, bad: -1, odd: "x" } }, beats);
  assert.deepEqual(saved.weak, { where: 2 });
  assert.deepEqual(normalizeSave(null, beats).weak, {});
  for (const b of beats)
    for (const id of b.practice ?? []) assert.ok(phrases[id], `${b.id}: ${id}`);
});

test("word games need every word once, and a draft keeps only known words", () => {
  for (const kind of ["bingo", "scene", "letters", "speak", "docks", "gull"]) {
    const c = sceneGames.find((b) => b.challenge.kind === kind).challenge;
    const all = solution(c);
    assert.ok(isCorrect(c, [...all].reverse()), kind);
    assert.ok(!isCorrect(c, all.slice(1)), kind);
    assert.ok(!isCorrect(c, [...all.slice(1), all[1]]), kind);
  }
});

test("classic: word game drafts keep only known words once", () => {
  for (const id of [
    "01-x-hello",
    "01-x-flags",
    "01-x-letters",
    "01-x-say",
    "01-x-docks",
    "01-x-race",
  ]) {
    const c = byId(id).challenge;
    const all = solution(c);
    assert.deepEqual(
      normalizeSave({ drafts: { [id]: [all[0], all[0], "bogus"] } }, beats)
        .drafts[id],
      [all[0]],
      id,
    );
  }
});

test("rounds of odd and lock go in order, a draft keeps only the solved start", () => {
  for (const kind of ["odd", "lock"]) {
    const c = sceneGames.find((b) => b.challenge.kind === kind).challenge;
    const [first, second, third] = solution(c);
    assert.ok(isCorrect(c, [first, second, third]), kind);
    assert.ok(!isCorrect(c, [second, first, third]), kind);
  }
});

test("classic: odd and lock drafts keep only the solved start", () => {
  for (const id of ["01-x-odd", "01-x-lock"]) {
    const c = byId(id).challenge;
    const [first, second, third] = solution(c);
    assert.deepEqual(
      normalizeSave({ drafts: { [id]: [first, "bogus", third] } }, beats)
        .drafts[id],
      [first],
      id,
    );
  }
});

test("the three docks take singular nouns, a plural article would teach nothing", () => {
  const docks = sceneGames.filter((b) => b.challenge.kind === "docks");
  assert.equal(docks.length, 58);
  const plurals = [
    "die Eltern",
    "die Geschwister",
    "die Großeltern",
    "die Möbel",
    "die Nebenkosten",
    "die Ferien",
    "die USA",
  ];
  for (const b of docks)
    for (const word of b.challenge.words)
      assert.ok(!plurals.includes(word), `${b.id}: ${word}`);
});

test("the gull race never asks for one of two words with the same translation", () => {
  const words = JSON.parse(
    readFileSync(new URL("../src/generated/a1-words.json", import.meta.url)),
  );
  const races = sceneGames.filter((b) => b.challenge.kind === "gull");
  assert.equal(races.length, 14);
  for (const b of races) {
    const meanings = b.challenge.words.map((w) => words[w].ru);
    assert.equal(new Set(meanings).size, meanings.length, b.id);
  }
});

test("a lock has a Russian task, real alternatives and one stored answer per reel", () => {
  const locks = sceneGames.filter((b) => b.challenge.kind === "lock");
  assert.equal(locks.length, 13);
  for (const b of locks)
    for (const round of b.challenge.rounds) {
      assert.match(round.ru, /[а-яё]/i, b.id);
      assert.ok(
        round.reels.every((reel) => reel.length === 3),
        b.id,
      );
      assert.ok(!/[а-яё]/i.test(round.answer.join(" ")), b.id);
      assert.match(round.answer.at(-1), /[.?!]$/, b.id);
    }
});

test("a lock starts with no right reel, sometimes with one", () => {
  const right = [0, 0, 0];
  for (const b of sceneGames.filter((b) => b.challenge.kind === "lock"))
    for (const round of b.challenge.rounds)
      for (let n = 0; n < 50; n++) {
        const at = lockStart(round.reels, round.answer, `${b.id}-${n}`);
        right[at.filter((p, i) => round.reels[i][p] === round.answer[i]).length]++;
      }
  assert.equal(right[2], 0);
  assert.ok(right[0] > right[1] * 2 && right[1] > 0, right.join("/"));
});

test("classic: the game uses every word of the A1 lessons", () => {
  const words = JSON.parse(
    readFileSync(new URL("../src/generated/a1-words.json", import.meta.url)),
  );
  const used = new Set(storyWords(episodes).map(plain));
  for (const p of Object.values(phrases)) used.add(plain(p.de));
  for (const b of beats)
    if (b.challenge.kind === "write")
      for (const f of b.challenge.fields)
        for (const a of f.answers) used.add(plain(a));
  assert.ok(Object.keys(words).length > 400);
  assert.deepEqual(
    Object.keys(words).filter((w) => !used.has(w)),
    [],
  );
});

test("the scene version meets every word of the A1 lessons", () => {
  const words = JSON.parse(readFileSync(new URL("../src/generated/a1-words.json", import.meta.url)));
  const nodes = sceneBeats.flatMap((b) => flatNodes(b.challenge.nodes));
  // Считаем только встреченные выражения, реплики и ответы сцен, а не весь общий словарь phrases.
  const texts = [
    ...shownWords(nodes),
    ...sceneVoices(nodes).map((l) => l.text),
    ...nodes.flatMap((n) =>
      n.t === "narr" ? [n.text.replace(/\{([\w-]+)\}/g, (_, id) => phrases[id].de)] :
      n.t === "type" ? n.answers :
      n.t === "game" ? [
        ...challengeWords(n.c),
        ...(["write", "letter"].includes(n.c.kind) ? n.c.fields.flatMap((f) => f.answers) : []),
      ] : [],
    ),
  ];
  assert.ok(Object.keys(words).length > 400);
  // Словарные пары вроде «groß – klein» дают две единицы, как в индексе A1.
  assert.deepEqual(Object.keys(words).filter((w) =>
    w.split(/\s+[–/]\s+/).some((part) => !texts.some((text) => found(part, text))),
  ), []);
});

test("a letter needs every sentence right, adapted from the model and not copied", () => {
  const letters = sceneGames.filter((b) => b.challenge.kind === "letter");
  assert.equal(letters.length, 13);
  for (const b of letters) {
    const c = b.challenge;
    assert.ok(isCorrect(c, solution(c)), b.id);
    assert.ok(!isCorrect(c, { ...solution(c), f1: "falsch" }), b.id);
  }
  const first = letters[0].challenge;
  assert.ok(isCorrect(first, { ...solution(first), f0: "Hallo Greta," }));
  assert.ok(isCorrect(first, { ...solution(first), f4: "Liebe Grüße Elif" }));
  assert.ok(
    !isCorrect(first, { ...solution(first), f2: "ich komme aus russland." }),
  );
});

test("classic: letters have five adapted fields and drafts keep only known text", () => {
  const letters = beats.filter((b) => b.challenge.kind === "letter");
  assert.equal(letters.length, 12);
  for (const b of letters) {
    const c = b.challenge;
    assert.equal(c.fields.length, 5, b.id);
    const body = c.fields.flatMap((f) => f.answers[0]);
    for (const sentence of body)
      assert.ok(!c.model.includes(sentence), `${b.id}: ${sentence}`);
  }
  const words = (b) =>
    b.challenge.fields
      .map((f) => f.answers[0])
      .join(" ")
      .split(/\s+/).length;
  for (const b of letters.slice(9))
    assert.ok(words(b) >= 22, `${b.id}: ${words(b)}`);
  assert.deepEqual(
    normalizeSave(
      { drafts: { "01-x-letter": { f1: "Ich", bad: "x", f2: 3 } } },
      beats,
    ).drafts["01-x-letter"],
    { f1: "Ich" },
  );
});

test("oral practice follows the exam parts and always has a model to compare with", () => {
  const steps = sceneGames.filter((b) => b.challenge.kind === "oral");
  assert.equal(steps.length, 13);
  const parts = new Set();
  for (const b of steps)
    for (const r of b.challenge.rounds) {
      parts.add(r.part);
      assert.ok(r.card || r.hear, b.id);
      assert.ok(!/[а-яё]/i.test(r.model), b.id);
      assert.match(r.ru, /[а-яё]/i, b.id);
    }
  assert.deepEqual([...parts].sort(), [1, 2, 3]);
  const c = steps.find((b) => b.id.startsWith("04-")).challenge;
  assert.ok(isCorrect(c, [...solution(c)].reverse()));
  assert.ok(!isCorrect(c, solution(c).slice(1)));
  const lines = storyLines(sceneChapters, phrases);
  assert.ok(
    lines.some((l) => l.text === "Trinkst du gern Kaffee?" && l.voice === "Reed"),
  );
  assert.ok(lines.some((l) => l.text === "Nein, ich trinke keinen Kaffee. Ich trinke gern Tee." && l.voice === "Anna"));
});

test("classic: oral drafts keep only known model lines", () => {
  const lines = storyLines(episodes, phrases);
  assert.ok(
    lines.some((l) => l.text === "Möchten Sie Milch?" && l.voice === "Reed"),
  );
  assert.ok(lines.some((l) => l.text === "Ja, gern." && l.voice === "Anna"));
  assert.deepEqual(
    normalizeSave({ drafts: { "04-x-oral": ["Ja, gern.", "bogus"] } }, beats)
      .drafts["04-x-oral"],
    ["Ja, gern."],
  );
});

test("the dictated phone number is slowed down for A1", () => {
  const slow = JSON.parse(
    readFileSync(new URL("../scripts/tts/slow.json", import.meta.url)),
  );
  const lines = storyLines(sceneChapters, phrases);
  const text = "Null, eins, sieben, zwei. Acht, drei. Fünf, neun. Vier, sechs.";
  assert.ok(lines.some((l) => l.text === text && l.voice === "Flo"), text);
  const phone = slow.find((l) => l.text === text && l.voice === "Flo");
  assert.ok(phone, text);
  assert.ok(phone.speed > 0.5 && phone.speed < 1, text);
  for (const { text, speed } of slow) assert.ok(speed > 0.5 && speed < 1, text);
});

test("classic: every slowed line belongs to one of the two versions", () => {
  const slow = JSON.parse(
    readFileSync(new URL("../scripts/tts/slow.json", import.meta.url)),
  );
  // Диктовки есть и в главах сцен: они озвучиваются вместе с игрой.
  const lines = storyLines([...episodes, ...sceneChapters], phrases);
  for (const { voice, text, speed } of slow) {
    assert.ok(speed > 0.5 && speed < 1, text);
    assert.ok(
      lines.some((l) => l.text === text && l.voice === voice),
      text,
    );
  }
});

test("every lock phrase is voiced in the narrator's voice", () => {
  const lines = storyLines(sceneChapters, phrases);
  for (const b of sceneGames.filter((b) => b.challenge.kind === "lock"))
    for (const round of b.challenge.rounds)
      assert.ok(
        lines.some(
          (l) => l.text === round.answer.join(" ") && l.voice === "Anna",
        ),
        round.answer.join(" "),
      );
});

test("classic: every chapter and every lock explain the grammar they ask for", () => {
  for (const episode of episodes)
    assert.ok(
      episode.beats.some((b) => stepRules[b.id]?.length),
      episode.id,
    );
  for (const b of beats.filter((b) => b.challenge.kind === "lock"))
    assert.ok(stepRules[b.id]?.length, b.id);
  for (const id of Object.keys(stepRules)) assert.ok(byId(id), id);
});

test("classic: rules come from the lesson of their chapter, with text and a schema", () => {
  const rules = JSON.parse(
    readFileSync(new URL("../src/generated/story-rules.json", import.meta.url)),
  );
  const lessons = [
    "kennenlernen",
    "zahlen",
    "familie",
    "essen",
    "einkaufen",
    "tagesablauf",
    "freizeit",
    "wohnen",
    "stadt",
    "gesundheit",
    "arbeit",
    "reisen",
  ];
  for (const [step, refs] of Object.entries(stepRules))
    for (const ref of refs) {
      const rule = rules[ref];
      assert.ok(rule?.point && rule.read, ref);
      assert.ok(rule.table || rule.rows?.length, ref);
      assert.ok(!/схем\p{L}* справа/iu.test(rule.read), ref);
      const chapter = episodes.findIndex((e) =>
        e.beats.some((b) => b.id === step),
      );
      assert.equal(ref.split("/")[0], lessons[chapter], `${step}: ${ref}`);
    }
});

test("classic: rules already seen are listed once, in the order of the story", () => {
  assert.deepEqual(rulesBefore(beats, 0), []);
  const all = rulesBefore(beats, beats.length);
  assert.equal(new Set(all).size, all.length);
  assert.equal(all[0], stepRules["01-question"][0]);
  const before = beats.findIndex((b) => b.id === "03-x-lock");
  assert.ok(rulesBefore(beats, before).includes("familie/wessen-1"));
  assert.ok(!rulesBefore(beats, before).includes("familie/kein-2"));
});

test("every phrase and voice line resolves to a recording that exists", () => {
  const map = JSON.parse(
    readFileSync(new URL("../src/generated/story-audio.json", import.meta.url)),
  );
  const lines = storyLines(sceneChapters, phrases);
  assert.ok(lines.length > Object.keys(phrases).length + 20);
  for (const { text, voice } of lines) {
    const src = map[audioKey(text, voice)];
    assert.ok(src, `${voice}: ${text}`);
    assert.ok(existsSync(new URL(`../public/${src}`, import.meta.url)), src);
  }
});

test("all three story recordings exist and the active generator refuses Qwen before loading models", () => {
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

test("classic: all three story recordings exist", () => {
  assert.equal(beats.filter((b) => b.audio).length, 3);
  for (const b of beats.filter((b) => b.audio))
    assert.ok(
      existsSync(
        new URL(`../public/story-audio/${b.audio.file}.m4a`, import.meta.url),
      ),
    );
});

test("rewritten chapters follow the plot plan: real scenes and a growing share of German", () => {
  const known = new Set();
  const rewritten = [];
  for (const e of sceneChapters) {
    let de = 0;
    let ru = 0;
    for (const n of e.beats.flatMap((b) => flatNodes(b.challenge.nodes))) {
      if (n.t === "narr") {
        const text = n.text.replace(/\{([\w-]+)\}/g, (_, id) => {
          const p = phrases[id];
          const shown = known.has(id) || known.has(p.de) ? p.de : `${p.ru} ${p.de}`;
          known.add(id);
          return ` ${shown} `;
        });
        for (const w of text.split(/[\s«»„“"(),.!?:;—–…-]+/).filter(Boolean))
          if (/[а-яё]/i.test(w)) ru++;
          else if (/^\p{L}+$/u.test(w)) de++;
      }
      for (const w of shownWords([n])) known.add(w);
    }
    rewritten.push(e.id);
    const share = (100 * de) / (de + ru);
    assert.ok(share >= GERMAN_TARGET[e.id], `${e.id}: ${share.toFixed(1)}% вместо ${GERMAN_TARGET[e.id]}%`);
    assert.ok((de + ru) / e.beats.length >= 40, `${e.id}: ${((de + ru) / e.beats.length).toFixed(0)} слов на сцену`);
  }
  assert.deepEqual(rewritten, sceneChapters.map((e) => e.id));
  assert.ok(rewritten.includes("moin-neu"));
});

test("classic: rewritten step chapters stay within the plot plan curve", () => {
  // Кривая из A1-PLOT.md: доля немецких слов в рассказе и сообщениях об успехе, по главам.
  const plan = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65];
  const known = new Set();
  const rewritten = [];
  for (const [i, e] of episodes.entries()) {
    let de = 0;
    let ru = 0;
    for (const b of e.beats) {
      // Новое выражение читается с переводом, знакомое — только по-немецки.
      const text = [...b.story, b.success]
        .join(" ")
        .replace(/\{([\w-]+)\}/g, (_, id) => {
          const shown = known.has(id) ? phrases[id].de : `${phrases[id].ru} ${phrases[id].de}`;
          known.add(id);
          return ` ${shown} `;
        });
      for (const w of text.split(/[\s«»„“"(),.!?:;—–…-]+/).filter(Boolean))
        if (/[а-яё]/i.test(w)) ru++;
        else if (/^\p{L}+$/u.test(w)) de++;
    }
    if (!e.day) continue;
    rewritten.push(e.id);
    const share = (100 * de) / (de + ru);
    assert.ok(Math.abs(share - plan[i]) <= 5, `${e.id}: ${share.toFixed(1)}% вместо ${plan[i]}%`);
    assert.ok((de + ru) / e.beats.length >= 40, `${e.id}: ${((de + ru) / e.beats.length).toFixed(0)} слов на шаг`);
  }
  assert.ok(rewritten.includes("moin"));
});
