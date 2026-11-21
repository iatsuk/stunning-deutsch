import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { face, FACES } from "../src/story/faces.ts";
import { MOODS } from "../src/story/moods.ts";
import { flatNodes } from "../src/story/scene.ts";
import { sceneChapters } from "../src/story/scenes/index.ts";

// Портреты у реплик: файл есть на каждое нарисованное выражение, разметка выражений указывает на настоящие реплики.
const said = new Map();
sceneChapters.forEach((c, ci) =>
  c.beats.forEach((b) => {
    if (b.challenge.kind !== "play") return;
    for (const n of flatNodes(b.challenge.nodes)) if (n.t === "say") said.set(`${n.who}|${n.de}`, ci + 1);
  }),
);

test("every portrait mood has its picture and every marked line exists", () => {
  for (const hero of FACES)
    for (const mood of hero.moods) assert.ok(existsSync(new URL(`../public/story-img/faces/${hero.file}-${mood}.jpg`, import.meta.url)), `${hero.file}-${mood}`);
  for (const key of Object.keys(MOODS)) assert.ok(said.has(key), `нет реплики: ${key}`);
});

test("a line shows its speaker's face; Jensen only smiles in the finale", () => {
  assert.equal(face("Mateo am Telefon", "Hallo?"), "story-img/faces/mateo-neutral.jpg");
  assert.equal(face("Lautsprecher", "Achtung!"), undefined);
  assert.equal(face("Herr Jensen", "Tee."), "story-img/faces/jensen-neutral.jpg");
  const [worried] = Object.entries(MOODS).find(([, m]) => m === "worried");
  const [who, de] = worried.split("|");
  assert.match(face(who, de), /-worried\.jpg$/);
  for (const key of Object.keys(MOODS).filter((k) => k.startsWith("Herr Jensen|"))) assert.equal(said.get(key), 12, key);
});
