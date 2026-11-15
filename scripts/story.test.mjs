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
import { RETURNS, WARMUPS } from "../src/story/scenes/warmups.ts";
import {
  beatPhrases,
  audioKey,
  challengeWords,
  initialAnswer,
  isCorrect,
  lockStart,
  mistake,
  placeKey,
  solution,
  storyLines,
  walk,
} from "../src/story/logic.ts";


const sceneBeats = sceneChapters.flatMap((c) => c.beats);
const sceneGames = sceneBeats.flatMap((b) => flatNodes(b.challenge.nodes)
  .flatMap((n, i) => n.t === "game" ? [{ id: `${b.id}-${i}`, challenge: n.c, hint: n.hint ?? b.hint }] : []));

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
  assert.equal(phrases.table.de, "auf dem Tisch");
  assert.equal(phrases.bus.de, "mit dem Bus");
});

test("phrases are introduced before becoming German-only; callbacks repeat in new scenes", () => {
  assert.equal(new Set(sceneBeats.slice(0, 0).flatMap(beatPhrases)).has("moin"), false);
  assert.equal(new Set(sceneBeats.slice(0, 1).flatMap(beatPhrases)).has("moin"), true);
  assert.equal(new Set(sceneBeats.slice(0, 1).flatMap(beatPhrases)).has("bus"), false);
  const nodes = sceneBeats.flatMap((b) => flatNodes(b.challenge.nodes));
  const used = new Set(sceneBeats.flatMap(beatPhrases));
  const shown = new Set(nodes.flatMap((n) => n.t === "say" ? (n.learn ?? []) : n.t === "look" ? n.items.map((i) => i.de) : []));
  const strings = (x) => typeof x === "string" ? [x] : x && typeof x === "object" ? Object.values(x).flatMap(strings) : [];
  const texts = strings([nodes, WARMUPS, RETURNS]);
  for (const [id, p] of Object.entries(phrases)) {
    assert.ok(used.has(id) || shown.has(p.de) || texts.some((text) => text.includes(p.de)), `Unused phrase: ${id}`);
    assert.ok(p.ru && p.de && p.note);
    assert.ok(!/[а-яё]/i.test(p.de), `Cyrillic in German: ${id}`);
  }
  const repeated = Object.keys(phrases).filter(
    (id) => sceneBeats.filter((b) => beatPhrases(b).includes(id)).length > 1,
  );
  assert.ok(repeated.length >= 45, `${repeated.length} repeated units`);
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

test("every step shows a working answer, also for saves from another game kind", () => {
  for (const b of [...sceneBeats, ...sceneGames]) {
    assert.ok(isCorrect(b.challenge, solution(b.challenge)), b.id);
    assert.ok(mistake(b.challenge, initialAnswer(b.challenge), b.hint), b.id);
  }
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

test("word games need every word once, and a draft keeps only known words", () => {
  for (const kind of ["bingo", "scene", "letters", "speak", "docks", "gull"]) {
    const c = sceneGames.find((b) => b.challenge.kind === kind).challenge;
    const all = solution(c);
    assert.ok(isCorrect(c, [...all].reverse()), kind);
    assert.ok(!isCorrect(c, all.slice(1)), kind);
    assert.ok(!isCorrect(c, [...all.slice(1), all[1]]), kind);
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
  for (const { text, voice, speed } of slow) {
    assert.ok(lines.some((l) => l.text === text && l.voice === voice), `slow line is not voiced: ${text}`);
    assert.ok(speed > 0.5 && speed < 1, text);
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

test("the active generator refuses Qwen before loading models", () => {
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
