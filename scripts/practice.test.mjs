import assert from "node:assert/strict";
import test from "node:test";
import { KIND_NAMES, metChapters, playedGames, practiceGrade } from "../src/story/practice.ts";
import { flatNodes, nodeAt, sceneKeys } from "../src/story/scene.ts";
import { sceneChapters } from "../src/story/scenes/index.ts";

test("practice lists only played game nodes, deduplicates and numbers chapters from one", () => {
  const chosen = [0, 2].map((ci) => {
    const beat = sceneChapters[ci].beats.find((b) => b.challenge.kind === "play" && b.challenge.nodes.some((n) => n.t === "game"));
    const key = String(beat.challenge.nodes.findIndex((n) => n.t === "game"));
    const other = String(beat.challenge.nodes.findIndex((n) => n.t !== "game"));
    return { beat, key, other, chapter: ci + 1 };
  });
  const drafts = Object.fromEntries(chosen.map(({ beat, key, other }) => [beat.id, [other, key, `${key}|2`, "99999"]]));
  const games = playedGames(sceneChapters, drafts);
  assert.equal(games.length, 2);
  chosen.forEach(({ beat, key, chapter }, i) => {
    assert.deepEqual(games[i], { chapter, scene: beat.id, key, node: nodeAt(beat.challenge.nodes, key) });
  });
  assert.deepEqual(playedGames(sceneChapters, {}), []);
});

test("practice finds played games inside scene branches", () => {
  const nested = sceneChapters.flatMap((c, ci) => c.beats.flatMap((beat) =>
    beat.challenge.kind === "play"
      ? sceneKeys(beat.challenge.nodes).filter((key) => key.includes(".") && nodeAt(beat.challenge.nodes, key)?.t === "game")
        .map((key) => ({ beat, key, chapter: ci + 1 }))
      : [],
  ))[0];
  assert.ok(nested, "нет настоящей сцены с игрой во вложенной ветке");
  const { beat, key, chapter } = nested;
  assert.deepEqual(playedGames(sceneChapters, { [beat.id]: [`${key}|1`, key] }), [
    { chapter, scene: beat.id, key, node: nodeAt(beat.challenge.nodes, key) },
  ]);
});

test("met chapters ignores empty chapters and the player's current position", () => {
  assert.deepEqual(metChapters(sceneChapters, {}), []);
  assert.deepEqual(metChapters(sceneChapters, {
    [sceneChapters[0].beats[0].id]: ["0"],
    [sceneChapters[1].beats[0].id]: [],
    [sceneChapters[3].beats[0].id]: ["0"],
    "unknown-scene": ["0"],
  }), [1, 4]);
});

test("every challenge kind in the scenes has a practice name", () => {
  for (const chapter of sceneChapters)
    for (const beat of chapter.beats) {
      assert.ok(KIND_NAMES[beat.challenge.kind]?.trim(), beat.challenge.kind);
      if (beat.challenge.kind === "play")
        for (const node of flatNodes(beat.challenge.nodes))
          if (node.t === "game") assert.ok(KIND_NAMES[node.c.kind]?.trim(), node.c.kind);
    }
});

test("practice brings a missed unit back sooner, counts the miss and leaves a right answer where it was", () => {
  const cards = { "das Boot": { box: 3, step: 1, day: 1 }, "die Möwe": { box: 2, step: 1, day: 1 } };
  const next = practiceGrade(cards, ["die Möwe"], 5, 9);
  assert.deepEqual(next["das Boot"], cards["das Boot"]);
  assert.deepEqual(next["die Möwe"], { box: 0, step: 5, day: 9, miss: 1 });
});
