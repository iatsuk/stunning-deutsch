import { judge } from "../trainer/logic.ts";
import type { SceneNode } from "./types.ts";
import { applyEffects, holds, type World } from "./world.ts";

// Прохождение сцены хранится списком ключей пройденных узлов в порядке прохождения:
// "3" — узел верхнего уровня, "5.1.2" — узел ветки 1 развилки 5, "7.0.1" — узел первой стороны
// условия 7 ("7.1.…" — второй). Порядок нужен, чтобы показать разговор так, как он шёл.
// После ключа через | хранится ответ: набранная реплика, выбранный вариант или сторона условия.

export const keyOf = (entry: string) => entry.split("|")[0];
export const typedOf = (entry: string) => entry.split("|").slice(1).join("|");

type Go = Extract<SceneNode, { t: "go" }>;
type When = Extract<SceneNode, { t: "when" }>;
const hasOptional = (go: Go) => go.branches.some((b) => b.optional);

/** Узлы внутри контейнера: ветка развилки или сторона условия. */
export function childrenOf(node: SceneNode | undefined, j: number): SceneNode[] | undefined {
  if (node?.t === "go") return node.branches[j]?.nodes;
  if (node?.t === "when") return j === 0 ? node.then : (node.else ?? []);
  return undefined;
}

/** Список, в котором лежит узел, и его номер в этом списке. */
function locate(nodes: SceneNode[], key: string) {
  const path = key.split(".").map(Number);
  let list = nodes;
  for (let n = 0; n < path.length - 1; n += 2) {
    const inner = childrenOf(list[path[n]], path[n + 1]);
    if (!inner) return undefined;
    list = inner;
  }
  return { list, index: path[path.length - 1] };
}

export function nodeAt(nodes: SceneNode[], key: string): SceneNode | undefined {
  const at = locate(nodes, key);
  return at?.list[at.index];
}

/** Картинки, которые стоят прямо перед узлом: они показываются вместе с ним. */
export function picsBefore(nodes: SceneNode[], key: string): Extract<SceneNode, { t: "pic" }>[] {
  const at = locate(nodes, key);
  if (!at) return [];
  const pics = [];
  for (let i = at.index - 1; i >= 0 && at.list[i].t === "pic"; i--) pics.unshift(at.list[i]);
  return pics as Extract<SceneNode, { t: "pic" }>[];
}

/** Все возможные ключи сцены: обе стороны условий и все ветки, включая побочные. */
export function sceneKeys(nodes: SceneNode[], prefix = ""): string[] {
  return nodes.flatMap((node, i) => {
    const key = `${prefix}${i}`;
    if (node.t === "pic") return [];
    if (node.t === "go")
      return [
        ...(hasOptional(node) ? [key] : []),
        ...node.branches.flatMap((b, j) => sceneKeys(b.nodes, `${key}.${j}.`)),
      ];
    if (node.t === "when")
      return [key, ...sceneKeys(node.then, `${key}.0.`), ...sceneKeys(node.else ?? [], `${key}.1.`)];
    return [key];
  });
}

/**
 * Что нужно пройти при этих ответах: обязательные ветки, выход из развилки с побочными
 * заданиями и выбранная сторона каждого условия (пока условие не решено — первая).
 */
export function requiredKeys(nodes: SceneNode[], entries: string[], prefix = ""): string[] {
  const chosen = new Map(entries.map((e) => [keyOf(e), typedOf(e)]));
  const walk = (list: SceneNode[], prefix: string): string[] =>
    list.flatMap((node, i) => {
      const key = `${prefix}${i}`;
      if (node.t === "pic") return [];
      if (node.t === "go")
        return [
          ...(hasOptional(node) ? [key] : []),
          ...node.branches.flatMap((b, j) => (b.optional ? [] : walk(b.nodes, `${key}.${j}.`))),
        ];
      if (node.t === "when") {
        const side = Number(chosen.get(key) ?? 0);
        return [key, ...walk(childrenOf(node, side)!, `${key}.${side}.`)];
      }
      return [key];
    });
  return walk(nodes, prefix);
}

/** Готовое прохождение для проверки: обязательные ветки и первая сторона каждого условия. */
export const solutionEntries = (nodes: SceneNode[]) =>
  requiredKeys(nodes, []).map((k) => (nodeAt(nodes, k)?.t === "when" ? `${k}|0` : k));

/** Состояние мира после пройденных узлов: последствия узлов и выбранных вариантов по порядку. */
export function worldAfter(nodes: SceneNode[], entries: string[], start: World = {}): World {
  let world = start;
  for (const entry of entries) {
    const node = nodeAt(nodes, keyOf(entry));
    if (!node) continue;
    world = applyEffects(world, node.set);
    if (node.t === "reply" || node.t === "pick")
      world = applyEffects(world, node.options.find((o) => o.text === typedOf(entry))?.set);
  }
  return world;
}

export type Spot =
  | { at: "node"; key: string; node: SceneNode; branch?: string }
  /** ready — обязательные ветки пройдены, из развилки можно уйти. */
  | { at: "menu"; key: string; node: Go; ready: boolean }
  /** Условие, до которого дошла сцена: его сторону выбирает состояние мира. */
  | { at: "auto"; key: string; node: When }
  | { at: "end" };

/**
 * Где игрок сейчас. Начатая ветка развилки продолжается; иначе развилка показывает меню,
 * пока не пройдены обязательные ветки и, если есть побочные, пока игрок не ушёл дальше.
 * open — ветка, выбранная в меню, но ещё не начатая; world — состояние мира сейчас:
 * от него зависит, какие побочные задания видны.
 */
export function spot(nodes: SceneNode[], entries: string[], open?: string, world: World = {}): Spot {
  const done = new Set(entries.map(keyOf));
  const chosen = new Map(entries.map((e) => [keyOf(e), typedOf(e)]));
  const walk = (list: SceneNode[], prefix: string): Spot | undefined => {
    for (const [i, node] of list.entries()) {
      const key = `${prefix}${i}`;
      if (node.t === "pic") continue;
      if (node.t === "when") {
        if (!done.has(key)) return { at: "auto", key, node };
        const side = Number(chosen.get(key));
        const inner = walk(childrenOf(node, side) ?? [], `${key}.${side}.`);
        if (inner) return inner;
        continue;
      }
      if (node.t === "go") {
        if (done.has(key)) continue;
        const left = node.branches
          .map((b, j) => ({ b, j, prefix: `${key}.${j}.` }))
          .filter(({ b }) => !b.if || holds(b.if, world))
          .filter(({ b, prefix }) => walk(b.nodes, prefix) !== undefined);
        const started =
          left.find(({ j }) => `${key}.${j}` === open) ??
          left.find(({ b, prefix }) => sceneKeys(b.nodes, prefix).some((k) => done.has(k)));
        if (started) {
          const inner = walk(started.b.nodes, started.prefix)!;
          return inner.at === "node" ? { ...inner, branch: `${key}.${started.j}` } : inner;
        }
        const ready = !left.some(({ b }) => !b.optional);
        if (ready && !hasOptional(node)) continue;
        return { at: "menu", key, node, ready };
      }
      if (!done.has(key)) return { at: "node", key, node };
    }
    return undefined;
  };
  return walk(nodes, "") ?? { at: "end" };
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

/** Узлы сцены по порядку, включая ветки развилок и обе стороны условий. */
export const flatNodes = (nodes: SceneNode[]): SceneNode[] =>
  nodes.flatMap((n) =>
    n.t === "go"
      ? [n, ...n.branches.flatMap((b) => flatNodes(b.nodes))]
      : n.t === "when"
        ? [n, ...flatNodes(n.then), ...flatNodes(n.else ?? [])]
        : [n],
  );

/**
 * Слова уроков, которые сцена вводит (learn у реплик) или тренирует во встроенных играх.
 * Только они идут в память слов: пропуск вроде der или aus словом словаря не является.
 */
export function sceneWords(nodes: SceneNode[], gameWords: (c: Extract<SceneNode, { t: "game" }>["c"]) => string[]): string[] {
  return flatNodes(nodes).flatMap((n) => (n.t === "say" ? (n.learn ?? []) : n.t === "game" ? gameWords(n.c) : []));
}

/** Все немецкие реплики сцены, которые звучат голосом. */
export function sceneVoices(nodes: SceneNode[]): { text: string; voice: string }[] {
  return flatNodes(nodes).flatMap((n) => (n.t === "say" || n.t === "hear" ? [{ text: n.de, voice: n.voice }] : []));
}
