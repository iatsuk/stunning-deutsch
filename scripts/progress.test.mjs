import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { isCorrect } from "../src/story/logic.ts";
import { migrate, nodeIds, sceneAt, toIds, toKeys } from "../src/story/progress.ts";
import { nodeAt, solutionEntries } from "../src/story/scene.ts";
import { sceneChapters } from "../src/story/scenes/index.ts";

// Прохождение сцен хранится по отпечаткам узлов (src/story/progress.ts): новый узел не сдвигает
// пройденное. Старое сохранение по номерам переносится по раскладкам прежних версий сцен.
const scenes = sceneChapters.flatMap((c) => c.beats);
const legacy = JSON.parse(readFileSync(new URL("../src/story/scene-layouts.json", import.meta.url), "utf8"));
// Прохождение всех сцен версии до вставок 14 ноября 2026 года, глав 1–8, в формате сохранения v1.
const oldSave = JSON.parse(readFileSync(new URL("./fixtures/moin-neu-v1-save.json", import.meta.url), "utf8"));

/** Ответы так, как их пишет сцена: выбор и ввод — с текстом, игра с последствиями — с числом ошибок. */
function played(nodes) {
  return solutionEntries(nodes).map((entry) => {
    const key = entry.split("|")[0];
    const n = nodeAt(nodes, key);
    if (n.t === "reply" || n.t === "pick") return `${key}|${n.options.find((o) => o.ok).text}`;
    if (n.t === "type") return `${key}|${(n.sample ?? n.answers.find((a) => !a.includes("*")) ?? n.answers[0]).replace("*", "Anna")}`;
    if (n.t === "game" && n.outcome) return `${key}|0`;
    return entry;
  });
}

test("every node of a scene has its own id, and answers survive the round trip", () => {
  for (const beat of scenes) {
    const nodes = beat.challenge.nodes;
    const ids = [...nodeIds(nodes).values()];
    assert.equal(new Set(ids).size, ids.length, `${beat.id}: одинаковые отпечатки`);
    const entries = played(nodes);
    assert.deepEqual(toKeys(nodes, toIds(nodes, entries)), entries, beat.id);
  }
});

test("an inserted node arrives empty and the rest of the scene stays answered", () => {
  const beat = scenes.find((b) => b.id === "04-s4");
  const nodes = beat.challenge.nodes;
  const saved = toIds(nodes, played(nodes));
  // Новый узел в начале сцены: старые ответы остаются на своих узлах, новый — без ответа.
  const grown = [{ t: "narr", text: "Новый рассказ." }, ...nodes];
  const back = toKeys(grown, saved);
  assert.equal(back.length, saved.length);
  assert.ok(!back.some((e) => e.split("|")[0] === "0"), "новый узел получил чужой ответ");
  assert.ok(!isCorrect({ kind: "play", nodes: grown }, back));
});

test("an old save by node numbers moves onto the current scenes", () => {
  let moved = 0;
  for (const [id, entries] of Object.entries(oldSave.drafts)) {
    const beat = scenes.find((b) => b.id === id);
    assert.ok(beat, id);
    const nodes = beat.challenge.nodes;
    const result = migrate(nodes, entries, legacy[id] ?? []);
    assert.ok(result.passed, `${id}: пройденная сцена потеряла отметку`);
    assert.ok(result.entries.length >= entries.length - 2, `${id}: ответов было ${entries.length}, осталось ${result.entries.length}`);
    if (!isCorrect(beat.challenge, result.entries)) moved++;
  }
  assert.ok(moved > 0, "в слепке нет сцен, куда потом добавили узлы");
  // Узлы, вставленные после слепка, приходят пустыми ячейками.
  const check = (sceneId, task) => {
    const nodes = scenes.find((b) => b.id === sceneId).challenge.nodes;
    const key = [...nodeIds(nodes).keys()].find((k) => nodeAt(nodes, k)?.task?.startsWith(task));
    assert.ok(key, `${sceneId}: нет узла «${task}»`);
    const result = migrate(nodes, oldSave.drafts[sceneId], legacy[sceneId] ?? []);
    assert.ok(!result.entries.some((e) => e.split("|")[0] === key), `${sceneId}: новый узел получил чужой ответ`);
  };
  check("04-s4", "Закажите чай и кусок пирога");
  check("03-s4", "Лотта диктует подпись");
  check("08-s2", "Чей мяч?");
});

test("the current scene is kept by id, and an old save by number keeps its scene", () => {
  const ids = scenes.map((b) => b.id);
  const before = ids.filter((id) => id !== "04-c1" && id !== "08-c1");
  // Сохранение до проверок помнило номер сцены в списке без них.
  for (const id of ["04-s6", "05-s1", "08-s6", "09-s1", "13-s6"]) assert.equal(ids[sceneAt(ids, { at: before.indexOf(id) })], id);
  // id сильнее устаревшего номера.
  assert.equal(ids[sceneAt(ids, { at: 0, scene: "08-c1" })], "08-c1");
  assert.equal(ids[sceneAt(ids, { at: 9999, scene: "missing" })], before.at(-1));
});
