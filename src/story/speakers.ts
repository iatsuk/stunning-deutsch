// Кто произносит фразу задания «послушайте». Задание повторяет реплику героя тем же голосом и текстом,
// поэтому говорящего берём из этой реплики, а не вписываем второй раз в каждое задание.
import { flatNodes } from "./scene.ts";
import { sceneChapters } from "./scenes/index.ts";

const SPEAKERS = new Map<string, string>();
for (const chapter of sceneChapters)
  for (const beat of chapter.beats)
    if (beat.challenge.kind === "play")
      for (const node of flatNodes(beat.challenge.nodes))
        if (node.t === "say") SPEAKERS.set(`${node.voice}|${node.de}`, node.who);

export const speakerOf = (voice: string, de: string) => SPEAKERS.get(`${voice}|${de}`);
