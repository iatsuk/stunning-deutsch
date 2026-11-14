import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parse } from "yaml";
import { BASELINE, baselineOf, buildIndex, found, renderReport } from "./a1-index.mjs";

// Индекс покрытия A1 (A1-PLAN.md): закреплённое не теряется, отчёт актуален, подсчёт находит формы.
const index = buildIndex();
const base = JSON.parse(readFileSync(BASELINE, "utf8"));
const lost = (was, now) => was.filter((key) => !now.includes(key));
const UPDATE = "если так задумано, обновите храповик: node scripts/a1-index.mjs --baseline";

test("consolidated A1 words and grammar stay consolidated", () => {
  const now = baselineOf(index);
  assert.deepEqual(lost(base.words, now.words), [], `слова перестали быть закреплёнными; ${UPDATE}`);
  assert.deepEqual(lost(base.grammar, now.grammar), [], `правила перестали быть закреплёнными; ${UPDATE}`);
  assert.deepEqual(lost(base.present, now.present), [], `слова исчезли из новой версии; ${UPDATE}`);
});

test("A1-INDEX.md matches the scenes (run pnpm content)", () => {
  assert.equal(readFileSync(new URL("../A1-INDEX.md", import.meta.url), "utf8"), renderReport(index));
});

test("grammar rules of the reference exist", () => {
  const rules = JSON.parse(readFileSync(new URL("../src/generated/story-rules.json", import.meta.url), "utf8"));
  const reference = parse(readFileSync(new URL("../content/reference/start-deutsch-1.yaml", import.meta.url), "utf8"));
  for (const g of reference.grammar) {
    for (const rule of g.rules ?? []) assert.ok(rule in rules, `${g.id}: нет фрагмента ${rule}`);
    for (const p of g.find ?? []) if (p !== "@plurals") assert.doesNotThrow(() => new RegExp(p, "u"), `${g.id}: ${p}`);
  }
});

test("the index counts word forms, not substrings", () => {
  const yes = [
    ["fahren", "Er fährt nach Kiel."],
    ["anrufen", "Ich rufe dich morgen an."],
    ["verstehen", "Ich verstehe das nicht."],
    ["der Schmerz", "Ich habe Kopfschmerzen."],
    ["das Ende", "Am Wochenende segeln wir."],
    ["die Bahn", "Wir fahren mit der S-Bahn."],
    ["Hunger haben", "Ich habe keinen Hunger."],
    ["Wie geht's?", "Moin! Wie geht's?"],
    ["der Apfel", "Zwei Äpfel, bitte."],
  ];
  const no = [
    ["der Rock", "Rocko singt."],
    ["der See", "Das ist seed."],
    ["anmachen", "Mach das Foto an der Ampel."],
    ["warten", "Das Wartezimmer ist voll."],
    ["Hunger haben", "Hunger? Nein. Wir haben heute Zeit und wir segeln lange und weit."],
  ];
  for (const [de, text] of yes) assert.ok(found(de, text), `${de} не найдено в «${text}»`);
  for (const [de, text] of no) assert.ok(!found(de, text), `${de} найдено в «${text}»`);
});
