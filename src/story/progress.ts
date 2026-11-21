import { hash } from "../lib/shuffle.ts";
import { childrenOf, keyOf, nodeAt, typedOf } from "./scene.ts";
import type { SceneNode } from "./types.ts";

// Прохождение сцены по номерам узлов («3», «5.1.2») ломается, когда в сцену добавляют узел: номера
// после вставки сдвигаются, и ответы встают на чужие узлы. Поэтому сохранение хранит ответы по
// отпечатку узла — типу и главному тексту, — а номера пересчитываются для текущей раскладки сцены.
// Новый узел приходит без ответа, как пустая ячейка; изменённый текст — тоже новый узел.

/** Тип узла и его главный текст: то, что делает узел узнаваемым между версиями сцены. */
function fingerprint(n: SceneNode): string {
  switch (n.t) {
    case "say":
      return `say:${n.who}|${n.de}`;
    case "narr":
      return `narr:${n.text}`;
    case "hear":
      return `hear:${n.task}|${n.de}`;
    case "gap":
      return `gap:${n.task}|${n.text}`;
    case "type":
    case "look":
      return `${n.t}:${n.task}`;
    case "reply":
    case "pick":
      return `${n.t}:${n.task ?? ""}|${n.options.map((o) => o.text).join("|")}`;
    case "game":
      return `game:${n.c.kind}|${n.task}`;
    case "go":
      return `go:${n.task}`;
    case "when":
      return `when:${JSON.stringify(n.if)}`;
    case "item":
      return `item:${n.de}`;
    case "clue":
      return `clue:${n.title}`;
    case "pic":
      return `pic:${n.src}`;
  }
}

/** Номер узла → отпечаток. Одинаковые узлы одного списка различает номер повтора: «Moin.» и «Moin.~1». */
export function nodeIds(nodes: SceneNode[]): Map<string, string> {
  const ids = new Map<string, string>();
  const walk = (list: SceneNode[], prefix: string, parent: string) => {
    const seen = new Map<string, number>();
    list.forEach((node, i) => {
      if (node.t === "pic") return;
      const base = hash(fingerprint(node)).toString(36);
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      const id = `${parent}${base}${n ? `~${n}` : ""}`;
      const key = `${prefix}${i}`;
      ids.set(key, id);
      if (node.t === "go") node.branches.forEach((b, j) => walk(b.nodes, `${key}.${j}.`, `${id}.${j}/`));
      if (node.t === "when") [0, 1].forEach((j) => walk(childrenOf(node, j) ?? [], `${key}.${j}.`, `${id}.${j}/`));
    });
  };
  walk(nodes, "", "");
  return ids;
}

const swap = (entries: string[], map: Map<string, string>) =>
  entries.flatMap((entry) => {
    const to = map.get(keyOf(entry));
    if (to === undefined) return [];
    const typed = typedOf(entry);
    return [entry.includes("|") ? `${to}|${typed}` : to];
  });

/** Ответы сцены для сохранения: номера узлов → отпечатки. */
export const toIds = (nodes: SceneNode[], entries: string[]) => swap(entries, nodeIds(nodes));

/** Ответы из сохранения: отпечатки → номера в текущей раскладке; ответы на исчезнувшие узлы отпадают. */
export function toKeys(nodes: SceneNode[], entries: string[]) {
  const back = new Map([...nodeIds(nodes)].map(([key, id]) => [id, key]));
  return swap(entries, back);
}

/** Раскладка версии сцены: номер → отпечаток и последний узел, по которому видно, что сцена пройдена. */
export type Layout = { keys: Record<string, string>; last: string };

export function layoutOf(nodes: SceneNode[]): Layout {
  const ids = nodeIds(nodes);
  const top = [...ids.keys()].filter((k) => !k.includes("."));
  return { keys: Object.fromEntries(ids), last: top[top.length - 1] ?? "" };
}

/**
 * Подходит ли записанный ответ узлу — так, как его пишет сцена (SceneView): выбор и ввод хранят
 * текст ответа, условие — сторону, игра с последствиями — число ошибок, остальное — только номер.
 */
function fits(node: SceneNode, entry: string): boolean {
  const typed = typedOf(entry);
  const has = entry.includes("|");
  switch (node.t) {
    case "reply":
    case "pick":
      return has && node.options.some((o) => o.text === typed);
    case "when":
      return typed === "0" || typed === "1";
    case "game":
      return !has || /^\d*$/.test(typed);
    case "type":
      return has && typed.length > 0;
    default:
      return !has;
  }
}

/**
 * Сцены, вставленные в курс, когда сохранение помнило только номер текущей сцены. Номер такого
 * сохранения считается по списку без них: так он указывает на ту же сцену, что и раньше.
 */
const INSERTED = ["04-c1", "08-c1"];

/** Номер текущей сцены в списке ids: по её id (scene), а у сохранения без id — по прежнему номеру. */
export function sceneAt(ids: string[], raw: { at: number; scene?: unknown }): number {
  const byId = ids.indexOf(raw.scene as string);
  if (byId >= 0) return byId;
  const before = ids.filter((id) => !INSERTED.includes(id));
  return ids.indexOf(before[Math.min(Math.max(0, raw.at), before.length - 1)]);
}

/**
 * Старое сохранение по номерам узлов: выбираем прежнюю версию сцены, под которую ответы подходят
 * лучше всего, и переводим ответы через отпечатки на текущие номера. Сцена считается пройденной, если в
 * той версии игрок дошёл до её последнего узла. Текущая раскладка — только когда прежних нет: номера
 * писались под прежнюю версию, а с номерами переписанной сцены они совпадают случайно и раздали бы
 * ответы чужим узлам.
 */
export function migrate(nodes: SceneNode[], entries: string[], legacy: Layout[]): { entries: string[]; passed: boolean } {
  const current = layoutOf(nodes);
  const byId = new Map(Object.entries(current.keys).map(([key, id]) => [id, key]));
  let best = { score: -1, entries: entries, passed: false };
  for (const layout of legacy.length ? legacy : [current]) {
    const moved = entries.flatMap((entry) => {
      const id = layout.keys[keyOf(entry)];
      const key = id === undefined ? undefined : byId.get(id);
      if (key === undefined) return [];
      const next = entry.includes("|") ? `${key}|${typedOf(entry)}` : key;
      return nodeAt(nodes, key) && fits(nodeAt(nodes, key)!, next) ? [next] : [];
    });
    // Ответы без текста (рассказ, пропуск, игра) подходят и к сдвинутым номерам. Решает конец: если
    // записи доходят ровно до последнего узла версии, сцену проходили в ней.
    const fitsAll = entries.every((e) => layout.keys[keyOf(e)] !== undefined);
    const reachesEnd = fitsAll && entries.some((e) => keyOf(e) === layout.last);
    const score = moved.length + (fitsAll ? 0.5 : 0) + (reachesEnd ? 1 : 0);
    if (score > best.score) best = { score, entries: moved, passed: entries.some((e) => keyOf(e) === layout.last) };
  }
  return { entries: best.entries, passed: best.passed };
}

