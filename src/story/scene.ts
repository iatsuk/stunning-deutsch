import { shuffle } from "../lib/shuffle.ts";
import { judge } from "../trainer/logic.ts";
import type { Outcome, SceneNode } from "./types.ts";
import { applyEffects, holds, type Effects, type World } from "./world.ts";

// Прохождение сцены хранится списком ключей пройденных узлов в порядке прохождения:
// "3" — узел верхнего уровня, "5.1.2" — узел ветки 1 развилки 5, "7.0.1" — узел первой стороны
// условия 7 ("7.1.…" — второй). Порядок нужен, чтобы показать разговор так, как он шёл.
// После ключа через | хранится ответ: набранная реплика, выбранный вариант, сторона условия
// или число ошибок в игре с последствиями (outcome).

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

/**
 * Последствие игры по числу ошибок из записи «ключ|ошибки»: чисто — clean, от двух — sloppy.
 * Запись без числа (старое прохождение) последствий не даёт.
 */
export function outcomeOf(outcome: Outcome, typed: string): Effects | undefined {
  if (!/^\d+$/.test(typed)) return undefined;
  const misses = Number(typed);
  return misses === 0 ? outcome.clean : misses >= 2 ? outcome.sloppy : undefined;
}

/** Состояние мира после пройденных узлов: последствия узлов и выбранных вариантов по порядку. */
export function worldAfter(nodes: SceneNode[], entries: string[], start: World = {}): World {
  let world = start;
  for (const entry of entries) {
    const node = nodeAt(nodes, keyOf(entry));
    if (!node) continue;
    world = applyEffects(world, node.set);
    if (node.t === "reply" || node.t === "pick")
      world = applyEffects(world, node.options.find((o) => o.text === typedOf(entry))?.set);
    if (node.t === "game" && node.outcome) world = applyEffects(world, outcomeOf(node.outcome, typedOf(entry)));
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

/** Узлы, которые игрок только читает: они идут потоком до следующего действия. */
export const isPassive = (node: SceneNode) =>
  node.t === "narr" || node.t === "say" || node.t === "item" || node.t === "clue";

/**
 * Поток до следующего действия: реплики, рассказ, предметы и улики проходят сами, условия
 * решаются по состоянию мира. Останавливает поток только действие игрока, меню развилки или
 * конец сцены. Возвращает записи, которые нужно добавить к прохождению.
 */
export function flow(nodes: SceneNode[], entries: string[], open?: string, world: World = {}): string[] {
  const out: string[] = [];
  let state = world;
  for (;;) {
    const here = spot(nodes, [...entries, ...out], open, state);
    const entry =
      here.at === "auto"
        ? `${here.key}|${holds(here.node.if, state) ? 0 : 1}`
        : here.at === "node" && isPassive(here.node)
          ? here.key
          : undefined;
    if (!entry) return out;
    out.push(entry);
    state = worldAfter(nodes, [entry], state);
  }
}

// Инструкции экзамена по-немецки (A1-PLAN.md, этап 6): с главы 2 над русским заданием стоит строка,
// какой её пишет telc A1. К экзамену игрок уже понимает «Wählen Sie die richtige Antwort» и
// «Ist die Aussage richtig oder falsch?». Индекс считает инструкцию частью узла.
const BY_NODE: Partial<Record<SceneNode["t"], string>> = {
  hear: "Hören Sie und wählen Sie die richtige Antwort.",
  reply: "Reagieren Sie.",
  pick: "Wählen Sie die richtige Antwort.",
  gap: "Wählen Sie das richtige Wort.",
  type: "Schreiben Sie auf Deutsch.",
};
const BY_GAME: Record<string, string> = {
  verdict: "Ist die Aussage richtig oder falsch?",
  bingo: "Hören Sie und kreuzen Sie an.",
  docks: "Wählen Sie den Artikel: der, die oder das.",
  gull: "Wählen Sie schnell das richtige Wort.",
  scene: "Hören Sie und wählen Sie das richtige Bild.",
  sounds: "Hören Sie: Welches Wort ist richtig?",
  letters: "Buchstabieren Sie das Wort.",
  order: "Bilden Sie einen Satz.",
  lock: "Bilden Sie einen Satz.",
  match: "Was passt zusammen?",
  sort: "Was passt zusammen?",
  memory: "Was passt zusammen?",
  odd: "Welches Wort passt nicht?",
  spot: "Lesen Sie den Text.",
  ads: "Lesen Sie die Anzeigen.",
  gaps: "Ergänzen Sie den Text.",
  write: "Füllen Sie das Formular aus.",
  letter: "Schreiben Sie eine Nachricht. Vergessen Sie die Anrede und den Gruß nicht.",
  oral: "Stellen Sie sich vor und nennen Sie Ihren Namen. Stellen Sie Fragen und formulieren Sie Bitten.",
  chat: "Reagieren Sie.",
  speak: "Hören Sie und sprechen Sie nach.",
  twenty: "Stellen Sie Fragen. Die Antwort ist Ja oder Nein.",
  weather: "Hören Sie den Wetterbericht. Wie ist das Wetter?",
};
/** Немецкая инструкция задания или ничего: в главе 1 игрок ещё не читает по-немецки. */
export function anweisung(node: SceneNode, chapter: number): string | undefined {
  if (!(chapter >= 2)) return undefined;
  if (node.t === "hear" && node.an) return node.an;
  return node.t === "game" ? BY_GAME[node.c.kind] : BY_NODE[node.t];
}

/** Слова, которые узлы уже показали игроку: новые слова реплик, осмотр и предметы. */
export const shownWords = (nodes: SceneNode[]): string[] =>
  nodes.flatMap((n) =>
    n.t === "say" ? (n.learn ?? []) : n.t === "look" ? n.items.map((i) => i.de) : n.t === "item" ? [n.de] : [],
  );

/** Сколько вариантов у выбора из кнопок с одним верным; где верных несколько, место не выдаёт ответ. */
const choiceCount = (n: SceneNode | undefined) =>
  n && (n.t === "gap" || n.t === "hear" || ((n.t === "reply" || n.t === "pick") && n.options.filter((o) => o.ok).length === 1))
    ? n.options.length
    : 0;

/**
 * Место верного варианта в каждом выборе сцены. Верный вариант обычно написан первым, и случайная
 * перестановка оставляла его первым слишком часто (в главе 1 — 22 выбора из 45). Места берутся из
 * колоды: в ней каждое место дважды, колода перемешана по seed и пополняется, когда кончится.
 * Так места распределены поровну, но очередь не угадать: строгий круг был бы так же заметен.
 * Третий раз подряд на том же месте верный вариант не встаёт.
 */
export function answerSlots(nodes: SceneNode[], seed: string): Map<string, number> {
  const slots = new Map<string, number>();
  const decks = new Map<number, number[]>();
  const placed: number[] = [];
  let refills = 0;
  for (const key of sceneKeys(nodes)) {
    const count = choiceCount(nodeAt(nodes, key));
    if (!count) continue;
    const deck = decks.get(count) ?? [];
    decks.set(count, deck);
    const [a, b] = placed.slice(-2);
    const twice = placed.length >= 2 && a === b ? a : -1;
    if (!deck.some((p) => p !== twice)) {
      const places = [...Array(count).keys()];
      deck.push(...shuffle([...places, ...places], `${seed}-deck-${refills++}`));
    }
    const [place] = deck.splice(deck.findIndex((p) => p !== twice), 1);
    slots.set(key, place);
    placed.push(place);
  }
  return slots;
}

/** Порядок вариантов: один верный — на назначенном месте, остальные перемешаны. */
export function arrange<T extends { ok?: boolean }>(options: T[], seed: string, slot = 0): T[] {
  const [right, ...more] = shuffle(options.filter((o) => o.ok), seed);
  const rest = shuffle([...more, ...options.filter((o) => !o.ok)], `${seed}/`);
  rest.splice(Math.min(slot, rest.length), 0, right);
  return rest;
}

/** Порядок предметов при осмотре: важные не стоят подряд в начале, иначе их видно по месту. */
export function lookOrder(items: { key?: true }[], seed: string): number[] {
  const order = shuffle([...items.keys()], seed);
  const keys = items.filter((i) => i.key).length;
  const first = order.findIndex((i) => !items[i].key);
  if (first === keys && keys > 1) order.splice(Math.floor(keys / 2), 0, ...order.splice(first, 1));
  return order;
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

/** Правила действий сцены по порядку, без повторов: фрагменты разбора уроков «тема/фрагмент». */
export const sceneRules = (nodes: SceneNode[]): string[] => [
  ...new Set(flatNodes(nodes).flatMap((n) => n.rule ?? [])),
];

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

/**
 * Немецкий рассказ: перед выражением уже стоит артикль, предлог или числительное («am {aufsteller}»,
 * «zwanzig {schueler}»). Тогда слово идёт без своего артикля — «am Aufsteller», а не «am der
 * Aufsteller», — и новое слово читается по-немецки, с переводом после: «Aufsteller (подставка)».
 */
const GERMAN_BEFORE =
  /(?:^|[\s«„(])(?:der|die|das|dem|den|des|ein|eine|einem|einen|einer|kein|keine|keinen|keinem|keiner|mein|meine|meinen|dein|deine|sein|seine|seinen|ihr|ihre|ihren|unser|unsere|Ihre|am|im|vom|zum|zur|beim|ins|mit|von|zu|in|an|auf|aus|bei|für|ohne|nach|über|unter|vor|hinter|neben|zwischen|alle|viele|jeden|jede|jeder|dieser|diese|dieses|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|zwanzig|hundert)\s+$/i;
export const germanBefore = (before: string) => GERMAN_BEFORE.test(before);
