import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { phrases } from "../src/story/data.ts";
import { initialAnswer, isCorrect, normalizeSave, solution, storyLines, validateStory } from "../src/story/logic.ts";
import { flatNodes, keyOf, sceneKeys, spot, typedRight } from "../src/story/scene.ts";
import { sceneChapter1 } from "../src/story/scenes/01.ts";

const words = JSON.parse(readFileSync(new URL("../src/generated/a1-words.json", import.meta.url)));
const scenes = sceneChapter1.beats;
const nodes = (beat) => beat.challenge.nodes;
/** Что игрок делает сам: всё, кроме реплик, рассказа, предметов и улик. */
const ACTIONS = ["reply", "type", "gap", "hear", "pick", "look", "game"];

test("the scene prototype is valid, voiced and needs every node", () => {
  assert.deepEqual(validateStory([sceneChapter1], phrases), []);
  for (const beat of scenes) {
    const c = beat.challenge;
    assert.equal(c.kind, "play");
    assert.ok(isCorrect(c, solution(c)), beat.id);
    assert.ok(!isCorrect(c, initialAnswer(c)), beat.id);
    assert.ok(!isCorrect(c, solution(c).slice(1)), beat.id);
  }
  const voiced = new Set(storyLines([sceneChapter1], {}).map((l) => `${l.voice}|${l.text}`));
  const audio = JSON.parse(readFileSync(new URL("../src/generated/story-audio.json", import.meta.url)));
  for (const key of voiced) assert.ok(audio[key], `нет записи: ${key}`);
});

test("a scene is mostly the player's actions, not reading", () => {
  let actions = 0;
  for (const beat of scenes) {
    const all = flatNodes(nodes(beat));
    const own = all.filter((n) => ACTIONS.includes(n.t)).length;
    actions += own;
    assert.ok(own >= 10, `${beat.id}: действий ${own}`);
    assert.ok(all.filter((n) => n.t === "say").length >= 6, `${beat.id}: мало реплик`);
    assert.ok(new Set(all.filter((n) => ACTIONS.includes(n.t)).map((n) => n.t)).size >= 5, `${beat.id}: однообразно`);
  }
  assert.ok(actions >= 35, `${actions}`);
});

test("every new word is a lesson word and comes back in an action after it is heard", () => {
  // Основа слова без артикля и знаков: Hafen → hafe, kommen aus → komm.
  const stem = (word) => word.replace(/^(der|die|das) /, "").replace(/[?!.,]/g, "").toLowerCase().slice(0, 4);
  const text = (n) =>
    n.t === "reply" || n.t === "pick"
      ? n.options.map((o) => o.text).join(" ")
      : n.t === "type"
        ? n.answers.join(" ")
        : n.t === "gap"
          ? `${n.text} ${n.options.join(" ")}`
          : n.t === "hear"
            ? `${n.de} ${n.options.join(" ")}`
            : n.t === "look"
              ? n.items.map((i) => i.de ?? "").join(" ")
              : n.t === "game"
                ? JSON.stringify(n.c)
                : "";
  const all = scenes.flatMap((beat) => flatNodes(nodes(beat)));
  for (const [i, node] of all.entries()) {
    if (node.t !== "say") continue;
    for (const word of node.learn ?? []) {
      assert.ok(words[word], `не слово урока: ${word}`);
      const later = all.slice(i + 1).filter((n) => ACTIONS.includes(n.t));
      assert.ok(later.some((n) => text(n).toLowerCase().includes(stem(word))), `не возвращается: ${word}`);
    }
  }
});

test("branches are played in the player's order and the scene resumes where it stopped", () => {
  const hub = nodes(scenes[2]);
  const go = hub.findIndex((n) => n.t === "go");
  const done = new Set(sceneKeys(hub).filter((k) => !k.includes(".")).filter((k) => Number(k) < go));
  assert.equal(spot(hub, done).at, "menu");
  // Выбранная ветка открывается, начатая продолжается и после перезагрузки.
  assert.equal(spot(hub, done, `${go}.2`).key, `${go}.2.0`);
  done.add(`${go}.2.0`);
  assert.equal(spot(hub, done).key, `${go}.2.1`);
  const third = sceneKeys(hub).filter((k) => k.startsWith(`${go}.2.`));
  for (const k of third) done.add(k);
  assert.equal(spot(hub, done).at, "menu");
  const all = solution(scenes[2].challenge);
  assert.equal(spot(hub, new Set(all)).at, "end");
  // Черновик хранит порядок и набранные реплики, мусор выпадает.
  const first = sceneKeys(hub)[0];
  const draft = [first, `${go}.2.1|Ich bin Anna.`, "bogus", first];
  const saved = normalizeSave({ version: 2, drafts: { "01-s3": draft } }, scenes).drafts["01-s3"];
  assert.deepEqual(saved, [first, `${go}.2.1|Ich bin Anna.`]);
  assert.deepEqual(saved.map(keyOf), [first, `${go}.2.1`]);
});

test("a typed introduction accepts any name but keeps the German frame", () => {
  const answers = ["Ich heiße *.", "Ich bin *."];
  for (const ok of ["Ich heiße Andrei.", "Ich heiße Andrei", "Ich bin Anna Maria.", "Ich heiße Jean-Luc."])
    assert.equal(typedRight(ok, answers), "right", ok);
  for (const bad of ["Ich heiße andrei.", "Ich heisse.", "Ich komme aus Russland.", "Heiße Andrei.", "Ich heiße 123."])
    assert.notEqual(typedRight(bad, answers), "right", bad);
  assert.equal(typedRight("ja, ich wohne in Kiel", ["Ja, ich wohne in Kiel."]), "case");
  assert.equal(typedRight("Ja, ich wohne in Kiel", ["Ja, ich wohne in Kiel."]), "right");
});

test("every scene picture exists, is a compressed JPEG and stands before a node", async () => {
  const { existsSync, statSync } = await import("node:fs");
  const pics = scenes.flatMap((beat) => flatNodes(nodes(beat))).filter((n) => n.t === "pic");
  assert.ok(pics.length >= 4, `${pics.length}`);
  for (const p of pics) {
    const file = new URL(`../public/story-img/${p.src}`, import.meta.url);
    assert.ok(existsSync(file), p.src);
    assert.match(p.src, /\.jpg$/);
    assert.ok(statSync(file).size < 260_000, `${p.src}: ${statSync(file).size}`);
    assert.match(p.alt, /[а-яё]/i, p.src);
  }
  assert.equal(new Set(pics.map((p) => p.src)).size, pics.length);
  // Каждая сцена открывается картинкой: она задаёт место и героев до первой реплики.
  for (const beat of scenes) assert.equal(nodes(beat)[0].t, "pic", beat.id);
});
