import { bingo, docks, HINT_DOCK, HINT_HEAR } from "../build.ts";
import { flatNodes } from "../scene.ts";
import type { SceneNode } from "../types.ts";
import { RETURNS } from "./warmups.ts";

// Возвращения в сценах (A1-PLAN.md, этап 3): в середине и в конце каждой главы со второй — причалы и
// лото со словами прошлых глав. Слова раздаёт планировщик scripts/a1-returns.mjs по тем же правилам,
// что и раунд перед главой; индекс полноты считает эти игры узлами своей главы. Гонки с чайкой здесь
// нет: каждая гонка ставит на кон наглость чайки, а возвращения не должны двигать её часы.

const ACTIONS = new Set(["reply", "type", "gap", "hear", "pick", "look", "game"]);

function games(chapter: number, block: number): SceneNode[] {
  const words = RETURNS[chapter]?.[block];
  if (!words) return [];
  const out: SceneNode[] = [];
  if ((words.docks?.length ?? 0) >= 4)
    out.push({ t: "game", back: true, task: "Йенсен разбирает старые ящики: слова прошлых дней. К какому причалу?", hint: HINT_DOCK, c: docks(words.docks) });
  if (words.bingo?.length === 9)
    out.push({ t: "game", back: true, task: "Лото из старых карточек блокнота: послушайте слово и закройте его.", hint: HINT_HEAR, c: bingo(words.bingo) });
  return out;
}

/** Сцена с возвращениями: игры встают перед последним узлом, и вид игры не повторяет действие перед ними. */
export function back(nodes: SceneNode[], chapter: number, block: number): SceneNode[] {
  const add = games(chapter, block);
  if (!add.length) return nodes;
  const prev = flatNodes(nodes.slice(0, -1)).filter((n) => ACTIONS.has(n.t)).at(-1);
  if (prev?.t === "game" && add[0].t === "game" && prev.c.kind === add[0].c.kind) add.reverse();
  return [...nodes.slice(0, -1), ...add, nodes[nodes.length - 1]];
}
