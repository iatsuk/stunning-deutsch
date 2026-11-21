import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { caseNotes, dossier, HEROES } from "../src/story/casebook.ts";
import { flatNodes, nodeAt, sceneKeys } from "../src/story/scene.ts";
import { sceneChapters } from "../src/story/scenes/index.ts";

// Блокнот на всё дело и досье героев: досье собирается из услышанных реплик с записями.
const recordings = JSON.parse(readFileSync(new URL("../src/generated/story-audio.json", import.meta.url), "utf8"));
const beats = sceneChapters.flatMap((c) => c.beats).filter((b) => b.challenge.kind === "play");
/** Где в сценах стоит реплика: сцена и ключ узла. */
const whereSaid = (de) => {
  for (const beat of beats)
    for (const key of sceneKeys(beat.challenge.nodes)) {
      const node = nodeAt(beat.challenge.nodes, key);
      if (node?.t === "say" && node.de === de) return { beat: beat.id, key, node };
    }
};

test("every dossier fact is a line of the scenes with a recording", () => {
  for (const hero of HEROES)
    for (const de of hero.facts) {
      const said = whereSaid(de);
      assert.ok(said, `${hero.name}: нет такой реплики — ${de}`);
      assert.ok(recordings[`${said.node.voice}|${de}`], `${hero.name}: нет записи — ${de}`);
    }
});

test("a fact and a clue open only once the player has passed them, grouped by chapter", () => {
  const [first] = HEROES[0].facts;
  const said = whereSaid(first);
  assert.deepEqual(dossier(sceneChapters, {}), []);
  const heard = dossier(sceneChapters, { [said.beat]: [said.key] });
  assert.deepEqual(heard.map((h) => h.name), [HEROES[0].name]);
  assert.deepEqual(heard[0].facts, [{ de: first, ru: said.node.ru, voice: said.node.voice }]);

  const chapter = sceneChapters.findIndex((c) => c.beats.some((b) => b.challenge.kind === "play" && flatNodes(b.challenge.nodes).some((n) => n.t === "clue")));
  const beat = sceneChapters[chapter].beats.find((b) => b.challenge.kind === "play" && flatNodes(b.challenge.nodes).some((n) => n.t === "clue"));
  const key = sceneKeys(beat.challenge.nodes).find((k) => nodeAt(beat.challenge.nodes, k)?.t === "clue");
  assert.deepEqual(caseNotes(sceneChapters, { [beat.id]: [key] }), [{ chapter: chapter + 1, notes: [nodeAt(beat.challenge.nodes, key)] }]);
});
