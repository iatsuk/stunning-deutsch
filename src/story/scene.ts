import { judge } from "../trainer/logic.ts";
import type { SceneNode } from "./types.ts";

// Прохождение сцены хранится списком ключей пройденных узлов в порядке прохождения:
// "3" — узел верхнего уровня, "5.1.2" — узел ветки 1 развилки 5. Порядок нужен, чтобы
// показать разговор так, как он шёл, — ветки развилки игрок проходит в своём порядке.
// Ответ, набранный с клавиатуры, хранится вместе с ключом: "4|Ich heiße Anna."

export const keyOf = (entry: string) => entry.split("|")[0];
export const typedOf = (entry: string) => entry.split("|").slice(1).join("|");

/** Все узлы, которые нужно пройти, по порядку; развилка и картинка сами ключа не имеют. */
export function sceneKeys(nodes: SceneNode[], prefix = ""): string[] {
  return nodes.flatMap((node, i) =>
    node.t === "go"
      ? node.branches.flatMap((b, j) => sceneKeys(b.nodes, `${prefix}${i}.${j}.`))
      : node.t === "pic"
        ? []
        : [`${prefix}${i}`],
  );
}

/** Картинки, которые стоят прямо перед узлом: они показываются вместе с ним. */
export function picsBefore(nodes: SceneNode[], key: string): Extract<SceneNode, { t: "pic" }>[] {
  const path = key.split(".").map(Number);
  let list = nodes;
  for (let n = 0; n < path.length - 1; n += 2) {
    const go = list[path[n]];
    if (go?.t !== "go") return [];
    list = go.branches[path[n + 1]].nodes;
  }
  const pics = [];
  for (let i = path[path.length - 1] - 1; i >= 0 && list[i].t === "pic"; i--) pics.unshift(list[i]);
  return pics as Extract<SceneNode, { t: "pic" }>[];
}

export function nodeAt(nodes: SceneNode[], key: string): SceneNode | undefined {
  const [i, j, ...rest] = key.split(".").map(Number);
  const node = nodes[i];
  if (!node || j === undefined) return node;
  if (node.t !== "go") return undefined;
  return nodeAt(node.branches[j]?.nodes ?? [], rest.join("."));
}

export type Spot =
  | { at: "node"; key: string; node: SceneNode; branch?: string }
  | { at: "menu"; key: string; node: Extract<SceneNode, { t: "go" }> }
  | { at: "end" };

/**
 * Где игрок сейчас. Начатая ветка развилки продолжается; иначе развилка показывает меню,
 * пока не пройдены все ветки. open — ветка, выбранная в меню, но ещё не начатая.
 */
export function spot(nodes: SceneNode[], done: Set<string>, open?: string): Spot {
  for (const [i, node] of nodes.entries()) {
    if (node.t === "pic") continue;
    if (node.t !== "go") {
      if (!done.has(`${i}`)) return { at: "node", key: `${i}`, node };
      continue;
    }
    const left = node.branches
      .map((b, j) => ({ j, keys: sceneKeys(b.nodes, `${i}.${j}.`) }))
      .filter((b) => b.keys.some((k) => !done.has(k)));
    if (!left.length) continue;
    const started =
      left.find((b) => `${i}.${b.j}` === open) ??
      left.find((b) => b.keys.some((k) => done.has(k)));
    if (!started) return { at: "menu", key: `${i}`, node };
    const key = started.keys.find((k) => !done.has(k))!;
    return { at: "node", key, node: nodeAt(nodes, key)!, branch: `${i}.${started.j}` };
  }
  return { at: "end" };
}

/** Набранная реплика верна, если совпала с ответом; * — любое имя с большой буквы. */
export function typedRight(text: string, answers: string[]) {
  const plainAnswers = answers.filter((a) => !a.includes("*"));
  if (plainAnswers.length && judge(text, plainAnswers) === "right") return "right";
  for (const pattern of answers.filter((a) => a.includes("*"))) {
    const [head, tail] = pattern.split("*");
    const t = text.trim().replace(/\s+/g, " ");
    const name = t.startsWith(head) && t.endsWith(tail) ? t.slice(head.length, t.length - tail.length) : "";
    if (/^\p{Lu}[\p{L}'-]*( \p{Lu}[\p{L}'-]*)?$/u.test(name)) return "right";
    // Без точки в конце ответ тоже принимается: пунктуация здесь не главное.
    if (tail && !t.endsWith(tail) && typedRight(`${t}${tail}`, [pattern]) === "right") return "right";
  }
  return plainAnswers.length ? judge(text, plainAnswers) : "wrong";
}

/**
 * Слова уроков, которые сцена вводит (learn у реплик) или тренирует во встроенных играх.
 * Только они идут в память слов: пропуск вроде der или aus словом словаря не является.
 */
export function sceneWords(nodes: SceneNode[], gameWords: (c: Extract<SceneNode, { t: "game" }>["c"]) => string[]): string[] {
  return nodes.flatMap((n) => {
    if (n.t === "say") return n.learn ?? [];
    if (n.t === "go") return n.branches.flatMap((b) => sceneWords(b.nodes, gameWords));
    if (n.t === "game") return gameWords(n.c);
    return [];
  });
}

/** Все немецкие реплики сцены, которые звучат голосом. */
export function sceneVoices(nodes: SceneNode[]): { text: string; voice: string }[] {
  return nodes.flatMap((n) => {
    if (n.t === "say") return [{ text: n.de, voice: n.voice }];
    if (n.t === "hear") return [{ text: n.de, voice: n.voice }];
    if (n.t === "go") return n.branches.flatMap((b) => sceneVoices(b.nodes));
    return [];
  });
}

/** Узлы сцены по порядку, включая ветки. */
export const flatNodes = (nodes: SceneNode[]): SceneNode[] =>
  nodes.flatMap((n) => (n.t === "go" ? n.branches.flatMap((b) => flatNodes(b.nodes)) : [n]));
