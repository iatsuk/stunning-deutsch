import { bingo, docks, HINT_DOCK, HINT_HEAR } from "../build.ts";
import { flatNodes } from "../scene.ts";
import type { SceneNode } from "../types.ts";
import { RETURNS } from "./warmups.ts";

// Возвращения в сценах (A1-PLAN.md, этап 3): в сценах 3 и 6 каждой главы со второй, а где слов
// прошлых глав больше, ещё и в сценах 2 и 5 — причалы и лото со словами прошлых глав. Слова раздаёт
// планировщик scripts/a1-returns.mjs по тем же правилам, что и раунд перед главой; индекс полноты
// считает эти игры узлами своей главы. Гонки с чайкой здесь нет: каждая гонка ставит на кон наглость
// чайки, а возвращения не должны двигать её часы.

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

/** Вид действия для правила «два одинаковых подряд»: игры различаются по виду игры. */
const kind = (n: SceneNode) => (n.t === "game" ? `game:${n.c.kind}` : n.t);

/**
 * Сцена с возвращениями: игры встают как можно ближе к концу сцены (перед последним узлом или раньше),
 * так, чтобы их вид не повторял действие перед ними и после них.
 */
export function back(nodes: SceneNode[], chapter: number, block: number): SceneNode[] {
  const add = games(chapter, block);
  if (!add.length) return nodes;
  const actions = (list: SceneNode[]) => flatNodes(list).filter((n) => ACTIONS.has(n.t));
  for (let at = nodes.length - 1; at > 0; at--) {
    const before = actions(nodes.slice(0, at)).at(-1);
    const after = actions(nodes.slice(at))[0];
    for (const order of [add, [...add].reverse()]) {
      const fits = (!before || kind(before) !== kind(order[0])) && (!after || kind(after) !== kind(order[order.length - 1]));
      if (fits) return [...nodes.slice(0, at), ...order, ...nodes.slice(at)];
    }
  }
  return nodes;
}
