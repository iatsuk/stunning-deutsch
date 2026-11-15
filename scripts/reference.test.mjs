import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { chapterRange, fold, grammarGroups, wordGroups } from "../src/reference/logic.ts";

// Справочник A1 собирается из данных курса (scripts/a1-index.mjs): он не должен отставать от истории.
const reference = JSON.parse(readFileSync(new URL("../src/generated/a1-reference.json", import.meta.url), "utf8"));
const index = JSON.parse(readFileSync(new URL("../src/generated/a1-index.json", import.meta.url), "utf8"));
const rules = JSON.parse(readFileSync(new URL("../src/generated/story-rules.json", import.meta.url), "utf8"));

test("the reference has every required word and grammar point of the index, each with a card", () => {
  assert.equal(reference.words.length, index.words.length);
  assert.equal(reference.grammar.length, index.grammar.length);
  for (const w of reference.words) {
    assert.ok(w.ru, `нет перевода: ${w.de}`);
    assert.ok(Number.isInteger(w.chapter), `нет главы: ${w.de}`);
    assert.ok(w.audio && existsSync(new URL(`../public/${w.audio}`, import.meta.url)), `нет записи: ${w.de}`);
    if (/^(der|die|das) /.test(w.de)) assert.ok(w.gender, `нет рода: ${w.de}`);
    if (w.gender === "pl") assert.equal(w.plural, null, w.de);
  }
  for (const p of reference.grammar) for (const id of p.rules) assert.ok(rules[id], `нет карточки правила ${id}`);
});

test("a plural-only noun is shown as plural-only, also from the story phrases", () => {
  for (const de of ["die Leute", "die Lebensmittel", "die Papiere"]) assert.equal(reference.words.find((w) => w.de === de)?.gender, "pl", de);
});

test("search ignores case, umlauts and ß, and finds a word by German, plural or translation", () => {
  assert.equal(fold("Über Straße"), "uber strasse");
  const count = (query) => wordGroups(reference, query).reduce((n, g) => n + g.words.length, 0);
  assert.equal(count(""), reference.words.length);
  for (const query of ["bahnhof", "Bahnhöfe", "вокзал", "BAHNHOF"]) assert.ok(count(query) >= 1, query);
  assert.equal(count("zzzz"), 0);
  assert.ok(grammarGroups(reference.grammar, "sollen").some((g) => g.points.some((p) => p.title.includes("sollen"))));
  // Термина нет в названиях пунктов, но он есть в карточках правил.
  for (const query of ["Dativ", "Akkusativ"]) assert.ok(grammarGroups(reference.grammar, query).length, query);
});

test("words go by the chapter where they first appear, alphabetically without the article", () => {
  const groups = wordGroups(reference, "");
  assert.deepEqual(groups.map((g) => g.chapter.n), [...groups.map((g) => g.chapter.n)].sort((a, b) => a - b));
  for (const g of groups) {
    const keys = g.words.map((w) => w.de.replace(/^(der|die|das) /, ""));
    assert.deepEqual(keys, [...keys].sort((a, b) => a.localeCompare(b, "de")), `глава ${g.chapter.n}`);
  }
  assert.equal(chapterRange([5, 1, 2, 3, 7, 3]), "1–3, 5, 7");
});
