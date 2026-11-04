import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { phrases } from "../src/story/data.ts";
import { initialAnswer, isCorrect, normalizeSave, solution, storyLines, validateStory } from "../src/story/logic.ts";
import { flatNodes, keyOf, requiredKeys, sceneKeys, spot, typedRight, worldAfter } from "../src/story/scene.ts";
import { MNEMONICS } from "../src/story/mnemonics.ts";
import { applyEffects, holds, TRACKS } from "../src/story/world.ts";
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
    // Интерлюдия глазами другого героя короче, но и она — не только чтение.
    if (beat.pov) {
      assert.ok(own >= 3, `${beat.id}: действий ${own}`);
      continue;
    }
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
  const done = sceneKeys(hub).filter((k) => !k.includes(".")).filter((k) => Number(k) < go);
  assert.equal(spot(hub, done).at, "menu");
  // Выбранная ветка открывается, начатая продолжается и после перезагрузки.
  assert.equal(spot(hub, done, `${go}.2`).key, `${go}.2.0`);
  done.push(`${go}.2.0`);
  assert.equal(spot(hub, done).key, `${go}.2.1`);
  done.push(...requiredKeys(hub, done).filter((k) => k.startsWith(`${go}.2.`) && !done.includes(k)));
  assert.equal(spot(hub, done).at, "menu");
  const all = solution(scenes[2].challenge);
  assert.equal(spot(hub, all).at, "end");
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

test("clocks stay within their segments and conditions read the world", () => {
  let world = {};
  for (let i = 0; i < 9; i++) world = applyEffects(world, { gull: 1 });
  assert.equal(world.gull, TRACKS.gull.size);
  assert.equal(applyEffects({ gull: 1 }, { gull: -3 }).gull, 0);
  assert.ok(holds([{ q: "gull", min: 2 }], { gull: 2 }));
  assert.ok(!holds([{ q: "gull", min: 2 }, { q: "frauke", min: 1 }], { gull: 2 }));
  assert.ok(holds([{ q: "frauke", max: 0 }], {}));
});

test("a side task is optional, but leaving the hub is a step of its own", () => {
  const first = nodes(scenes[0]);
  const hub = first.findIndex((n) => n.t === "go");
  const before = requiredKeys(first, []).filter((k) => Number(k.split(".")[0]) < hub);
  // Побочная ветка видна, но не обязательна: меню сразу готово отпустить дальше.
  const here = spot(first, before);
  assert.equal(here.at, "menu");
  assert.equal(here.ready, true);
  assert.ok(!requiredKeys(first, before).some((k) => k.startsWith(`${hub}.0.`)));
  assert.ok(requiredKeys(first, before).includes(`${hub}`));
  // Пройденное задание оставляет последствие: доверие Фрауке.
  const side = requiredKeys(first[hub].branches[0].nodes, [], `${hub}.0.`);
  const world = worldAfter(first, [...before, ...side, `${hub}`]);
  assert.equal(world.frauke, 1);
  assert.equal(worldAfter(first, [...before, `${hub}`]).frauke, undefined);
});

test("a choice moves a clock and a condition keeps the side it took", () => {
  const third = nodes(scenes[2]);
  // Выбор «подозреваемая» сдвигает часы чайки, «свидетель» — нет.
  const pickKey = sceneKeys(third).find((k) => {
    const [i, j, n] = k.split(".").map(Number);
    const node = third[i].t === "go" ? third[i].branches[j]?.nodes[n] : undefined;
    return node?.t === "pick" && node.options.some((o) => o.set);
  });
  assert.ok(pickKey);
  assert.equal(worldAfter(third, [`${pickKey}|Чайка — подозреваемая`], { gull: 1 }).gull, 2);
  assert.equal(worldAfter(third, [`${pickKey}|Чайка — свидетель`], { gull: 1 }).gull, 1);
  // Условие, до которого дошла сцена, решается один раз: его сторона хранится в ответе.
  const finale = third.findIndex((n) => n.t === "when");
  const early = requiredKeys(third, []).filter((k) => Number(k.split(".")[0]) < finale);
  assert.equal(spot(third, early).at, "auto");
  assert.ok(requiredKeys(third, [...early, `${finale}|0`]).includes(`${finale}.0.0`));
  assert.ok(!requiredKeys(third, [...early, `${finale}|1`]).includes(`${finale}.0.0`));
});

test("validation knows only real clocks and keeps conditions off required branches", () => {
  const scene = (nodes) => ({ ...sceneChapter1, beats: [{ ...scenes[0], id: "x", challenge: { kind: "play", nodes } }] });
  const narr = { t: "narr", text: "Текст." };
  assert.deepEqual(validateStory([scene([narr])], phrases), []);
  assert.notDeepEqual(validateStory([scene([{ ...narr, set: { bogus: 1 } }])], phrases), []);
  assert.notDeepEqual(validateStory([scene([{ t: "when", if: [{ q: "bogus", min: 1 }], then: [narr] }])], phrases), []);
  const branch = (extra) => ({ label: "Ветка", icon: "•", nodes: [narr], ...extra });
  assert.notDeepEqual(validateStory([scene([{ t: "go", task: "?", branches: [branch({ if: [{ q: "gull", min: 1 }] }), branch()] }])], phrases), []);
  assert.deepEqual(validateStory([scene([{ t: "go", task: "?", branches: [branch({ optional: true, if: [{ q: "gull", min: 1 }] })] }])], phrases), []);
});

test("mnemonics belong to lesson words or story phrases", () => {
  const units = new Set([...Object.keys(words), ...Object.values(phrases).map((p) => p.de)]);
  for (const [de, hook] of Object.entries(MNEMONICS)) {
    assert.ok(units.has(de), `не слово урока и не выражение: ${de}`);
    assert.match(hook, /[а-яё]/i, de);
  }
  assert.match(MNEMONICS["die Möwe"], /мов/);
});
