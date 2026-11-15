import { shuffle } from "../lib/shuffle.ts";
import { judge, nearMisses } from "../trainer/logic.ts";
import { flatNodes, keyOf, requiredKeys, sceneVoices, sceneWords, solutionEntries, typedRight } from "./scene.ts";
import { answerOf, excludes, reviewTwentyLines } from "./twenty.ts";
import { TRACKS, type Cond, type Effects } from "./world.ts";
import type {
  SceneNode,
  Answer,
  Beat,
  Challenge,
  Episode,
  GridClue,
  LockRound,
  Move,
  Phrase,
  PortraitPart,
  TreeNode,
  TreeSlot,
} from "./types.ts";

type Route = Extract<Challenge, { kind: "algo" }>;
type Position = { x: number; y: number; heading: number };

/** Что звучит в записи выражения: существительное — с множественным, как в словаре уроков. */
export const spoken = (p: { de: string; pl?: string }) =>
  p.pl && p.pl !== "-" && p.pl !== "pl" ? `${p.de}, die ${p.pl}` : p.de;

export const phraseIds = (text: string): string[] =>
  [...text.matchAll(/\{([\w-]+)\}/g)].map((m) => m[1]);
export const beatPhrases = (beat: Beat) => [
  ...new Set(
    [
      ...beat.story,
      ...(beat.challenge.kind === "play"
        ? flatNodes(beat.challenge.nodes).flatMap((n) => (n.t === "narr" ? [n.text] : []))
        : []),
    ].flatMap(phraseIds),
  ),
];

/** Голос выражений рассказа; реплики героев задают свой голос. */
export const NARRATOR = "Anna";
/** Голос партнёра в устной практике. */
export const PARTNER = "Reed";
export const audioKey = (text: string, voice = NARRATOR) => `${voice}|${text}`;
/** Всё, что звучит в истории: по этому списку сборка связывает фразы с записями. */
export function storyLines(
  episodes: Episode[],
  phrases: Record<string, Phrase>,
): { text: string; voice: string }[] {
  return [
    ...Object.values(phrases).map((p) => ({ text: spoken(p), voice: NARRATOR })),
    ...episodes.flatMap((e) =>
      e.beats.flatMap((b) => challengeLines(b.challenge)),
    ),
    // Вопросы «20 вопросов» звучат и в раундах повторения, где колода не стоит ни в одной сцене.
    ...reviewTwentyLines(NARRATOR),
  ];
}
/** Реплики самого действия; сцена отдаёт свои реплики и реплики встроенных игр. */
function challengeLines(c: Challenge): { text: string; voice: string }[] {
  switch (c.kind) {
    case "play":
      return [
        ...sceneVoices(c.nodes),
        ...flatNodes(c.nodes).flatMap((n) => (n.t === "game" ? challengeLines(n.c) : [])),
      ];
    case "oral":
      return c.rounds.flatMap((r) => [
        { text: r.model, voice: NARRATOR },
        ...(r.hear ? [{ text: r.hear, voice: PARTNER }] : []),
      ]);
    case "lock":
      return c.rounds.map((r) => ({ text: lockKey(r), voice: NARRATOR }));
    case "chat":
      return c.turns.map((t) => ({ text: t.say, voice: c.voice }));
    case "weather":
      return c.forecast.map((f) => ({ text: f.de, voice: c.voice }));
    case "twenty":
      return [
        ...c.questions.map((q) => ({ text: q.de, voice: NARRATOR })),
        { text: "Ja.", voice: c.voice },
        { text: "Nein.", voice: c.voice },
      ];
    default:
      return [];
  }
}
/** Слова словаря уроков, которыми играет этот шаг. */
export function challengeWords(c: Challenge): string[] {
  if (c.kind === "play") return [...new Set(sceneWords(c.nodes, challengeWords))];
  if (
    c.kind === "bingo" ||
    c.kind === "letters" ||
    c.kind === "docks" ||
    c.kind === "gull"
  )
    return c.words;
  if (c.kind === "speak") return c.lines;
  // Склейка тренирует целое слово: игрок собирает его, выбирает артикль и слышит.
  if (c.kind === "compound") return c.rounds.map((r) => r.word);
  if (c.kind === "scene") return c.items.map((i) => i.word);
  if (c.kind === "odd") return c.rounds.flatMap((r) => r.words);
  if (c.kind === "sounds") return c.rounds.flatMap((r) => r.options);
  if (c.kind === "spy") return c.items.map((i) => i.de);
  if (c.kind === "twenty") return c.cards.flatMap((card) => (card.unit ? [card.unit] : []));
  // Слова погоды тренирует прогноз; приманка не звучит и словом игры не считается.
  if (c.kind === "weather") return c.skies.filter((s) => c.forecast.some((f) => f.sky === s.id)).map((s) => s.de);
  return [];
}
/** Сборка проверяет, что каждое слово игры есть в словаре уроков. */
export const storyWords = (episodes: Episode[]) => [
  ...new Set(
    episodes.flatMap((e) =>
      e.beats.flatMap((b) => challengeWords(b.challenge)),
    ),
  ),
];

/** Решённый раунд замка хранится как собранная фраза. */
export const lockKey = (round: LockRound) => round.answer.join(" ");

/**
 * С чего начинают диски замка: обычно ни один не стоит верно, примерно в каждом
 * четвёртом замке — ровно один. Иначе часть фразы уже собрана до первого хода.
 */
export function lockStart(reels: string[][], answer: string[], seed: string) {
  const easy =
    reels.length > 1 && shuffle([0, 1, 2, 3], `${seed}-easy`)[0] === 0
      ? shuffle([...reels.keys()], `${seed}-free`)[0]
      : -1;
  return reels.map((options, i) => {
    const right = options.indexOf(answer[i]);
    if (i === easy) return right;
    return shuffle([...options.keys()].filter((n) => n !== right), `${seed}-${i}-start`)[0];
  });
}

export const MOVES: Move[] = ["links", "geradeaus", "rechts"];
/** Север, восток, юг, запад: y растёт вниз, как на схеме. */
const STEPS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
const inside = (route: Route, at: Position) =>
  at.x >= 0 && at.y >= 0 && at.x < route.width && at.y < route.height;
/** links и rechts сначала поворачивают идущего, затем он проходит квартал. */
function step(at: Position, move: Move): Position {
  const turn = move === "links" ? 3 : move === "rechts" ? 1 : 0;
  const heading = (at.heading + turn) % 4;
  return {
    x: at.x + STEPS[heading][0],
    y: at.y + STEPS[heading][1],
    heading,
  };
}
/** Все точки пути от старта; ход за край схемы не засчитывается. */
export function walk(route: Route, moves: string[]): Position[] {
  const path = [route.start];
  for (const move of moves) {
    if (!MOVES.includes(move as Move)) break;
    const next = step(path[path.length - 1], move as Move);
    if (!inside(route, next)) break;
    path.push(next);
  }
  return path;
}
export const placeKey = (at: { x: number; y: number }) => `${at.x},${at.y}`;

// ——— Новые мини-игры (A1-PLOT.md, «Новые мини-игры») ———

type Grid = Extract<Challenge, { kind: "grid" }>;
type Planner = Extract<Challenge, { kind: "planner" }>;
type Cipher = Extract<Challenge, { kind: "cipher" }>;

/** Клетка сетки: «человек|столбец». */
export const gridKey = (person: string, col: string) => `${person}|${col}`;

/** Термин улики: имя строки или «столбец:значение». Ошибка в термине — undefined. */
function gridTerm(c: Pick<Grid, "people" | "cols">, term: string) {
  if (c.people.includes(term)) return { person: c.people.indexOf(term) };
  const at = term.indexOf(":");
  const col = c.cols.findIndex((x) => x.id === term.slice(0, at));
  if (at < 0 || col < 0 || !c.cols[col].values.includes(term.slice(at + 1))) return undefined;
  return { col, value: term.slice(at + 1) };
}
export const gridTermValid = (c: Pick<Grid, "people" | "cols">, term: string) => gridTerm(c, term) !== undefined;

function permutations<T>(list: T[]): T[][] {
  if (list.length <= 1) return [list];
  return list.flatMap((x, i) => permutations([...list.slice(0, i), ...list.slice(i + 1)]).map((p) => [x, ...p]));
}

/**
 * Все раскладки сетки, при которых верны улики: перебор перестановок каждого столбца с
 * отсечением. Сетки A1 маленькие (3–4 строки, 1–3 столбца), перебор мгновенный.
 */
export function gridSolutions(
  c: Pick<Grid, "people" | "cols">,
  clues: GridClue[],
  limit = Infinity,
): Record<string, string>[] {
  const terms = clues.map((clue) => [gridTerm(c, clue.a), gridTerm(c, clue.b)] as const);
  const perms = c.cols.map((col) => permutations(col.values));
  const chosen: string[][] = [];
  const out: Record<string, string>[] = [];
  // Строка термина при уже выбранных столбцах; null — столбец ещё не выбран.
  const row = (t: ReturnType<typeof gridTerm>) =>
    !t ? -1 : "person" in t ? t.person : t.col < chosen.length ? chosen[t.col].indexOf(t.value) : null;
  const holds = () =>
    terms.every(([a, b], i) => {
      const ra = row(a),
        rb = row(b);
      return ra === null || rb === null || (ra === rb) !== Boolean(clues[i].not);
    });
  const step = () => {
    if (out.length >= limit) return;
    if (chosen.length === c.cols.length) {
      out.push(
        Object.fromEntries(
          c.people.flatMap((p, r) => c.cols.map((col, k) => [gridKey(p, col.id), chosen[k][r]])),
        ),
      );
      return;
    }
    for (const perm of perms[chosen.length]) {
      chosen.push(perm);
      if (holds()) step();
      chosen.pop();
    }
  };
  step();
  return out;
}

/** Занятые клетки ежедневника «день|час»: занятое по сообщениям и всё вне «only». */
export function plannerBusy(c: Pick<Planner, "days" | "hours" | "notes">): Set<string> {
  const all = c.days.flatMap((d) => c.hours.map((h) => `${d}|${h}`));
  const busy = new Set<string>();
  for (const note of c.notes) {
    note.busy?.forEach((cell) => busy.add(cell));
    if (note.only) all.filter((cell) => !note.only!.includes(cell)).forEach((cell) => busy.add(cell));
  }
  return busy;
}
export const plannerFree = (c: Pick<Planner, "days" | "hours" | "notes">) => {
  const busy = plannerBusy(c);
  return c.days.flatMap((d) => c.hours.map((h) => `${d}|${h}`)).filter((cell) => !busy.has(cell));
};
/** Кто занят в этой клетке: для подсказки после ошибки. */
export const plannerWho = (c: Planner, cell: string) =>
  c.notes.filter((n) => n.busy?.includes(cell) || (n.only && !n.only.includes(cell))).map((n) => n.who);

/** Расшифровка: «8-5-12 12-15» — номера букв (A = 1), иначе буквы со сдвигом shift вперёд. */
export function decipher(c: Pick<Cipher, "code" | "shift">): string {
  const A = "A".charCodeAt(0);
  if (c.shift === undefined)
    return c.code
      .trim()
      .split(/\s+/)
      .map((word) =>
        word
          .split("-")
          .map((n) => (Number(n) >= 1 && Number(n) <= 26 ? String.fromCharCode(A + Number(n) - 1) : "?"))
          .join(""),
      )
      .join(" ");
  return c.code
    .toUpperCase()
    .replace(/[A-Z]/g, (ch) => String.fromCharCode(A + ((((ch.charCodeAt(0) - A - c.shift!) % 26) + 26) % 26)));
}
export const cipherNorm = (text: string) => text.trim().toUpperCase().replace(/\s+/g, " ");

/** Первая улика, которая не сходится при заполненной таблице: для подсказки после ошибки. */
export function gridBroken(c: Grid, value: Record<string, string | number>): GridClue | undefined {
  const rowOf = (term: string) => {
    if (c.people.includes(term)) return c.people.indexOf(term);
    const [col, val] = [term.slice(0, term.indexOf(":")), term.slice(term.indexOf(":") + 1)];
    return c.people.findIndex((p) => value[gridKey(p, col)] === val);
  };
  return c.clues.find((clue) => {
    const a = rowOf(clue.a),
      b = rowOf(clue.b);
    return a >= 0 && b >= 0 && (a === b) === Boolean(clue.not);
  });
}

/** Сложное слово из частей: первая часть как есть, остальные со строчной. */
export const compoundOf = (parts: string[]) =>
  parts.map((p, i) => (i ? p.toLowerCase() : p)).join("");

/** Этаж на кнопке лифта и по-русски: Keller, Erdgeschoss — наш первый, erster Stock — наш второй. */
export const floorLabel = (floor: number) => (floor < 0 ? "K" : floor === 0 ? "E" : String(floor));

/** Все клетки семейного дерева сверху вниз: человек, затем супруг, затем дети. */
export const treeSlots = (node: TreeNode): TreeSlot[] => [
  node,
  ...(node.partner ? [node.partner] : []),
  ...(node.children ?? []).flatMap(treeSlots),
];
type Tree = Extract<Challenge, { kind: "tree" }>;
/** Первая клетка дерева с чужим именем и строка рассказа, где названо верное. */
export function treeWrong(c: Tree, value: Record<string, string | number>) {
  const slot = treeSlots(c.root).find((s) => !s.given && value[s.id] !== c.answer[s.id]);
  if (!slot) return undefined;
  const name = c.answer[slot.id];
  return { slot, line: c.text.find((t) => t.de.includes(name)) };
}

/**
 * Словарь фоторобота: какие варианты бывают у каждой части. По нему игра рисует портрет, а
 * валидация не даёт главе вариант, который не нарисовать. «says» — любая короткая реплика.
 */
/** Цвета, которые умеют рисовать фоторобот и «Я шпион»: выражения истории из главы 5. */
export const COLOURS = ["rot", "gelb", "blau", "dunkelblau", "grün", "schwarz", "weiß", "grau", "braun"];
export const PORTRAIT: Record<Exclude<PortraitPart, "says">, string[]> = {
  size: ["groß", "klein"],
  age: ["alt", "nicht alt"],
  top: ["die Jacke", "der Pullover", "der Mantel", "das Hemd"],
  colour: COLOURS,
};

/** Вещи, которые умеет рисовать «Я шпион». */
export const SPY = ["die Hose", "das T-Shirt", "das Hemd", "die Jacke", "der Pullover", "der Mantel", "das Kleid", "der Schuh"];
/** Местоимение по артиклю: der — er, die — sie, das — es. */
export const pronounOf = (de: string) => ({ der: "er", die: "sie", das: "es" })[de.split(" ")[0]] ?? "";
type Spy = Extract<Challenge, { kind: "spy" }>;
/** Вещи, которые подходят под загадку: и цвет, и местоимение. */
export const spyMatches = (c: Spy, round: Spy["rounds"][number]) =>
  c.items.filter((i) => i.colour === round.colour && pronounOf(i.de) === round.pronoun);

type TwentyGame = Extract<Challenge, { kind: "twenty" }>;
/**
 * Партия «20 вопросов» по записям ответа: «?номер» — заданный вопрос, «x:id» — вычеркнутая карточка.
 * Вычеркнуть честно можно только карточку, которую уже исключил полученный ответ.
 */
export function twentyState(c: TwentyGame, value: Answer | undefined) {
  const asked: number[] = [];
  const crossed: string[] = [];
  let fair = true;
  for (const entry of Array.isArray(value) ? value : []) {
    if (entry.startsWith("?")) asked.push(Number(entry.slice(1)));
    else if (entry.startsWith("x:")) {
      const id = entry.slice(2);
      if (!asked.some((q) => excludes(c, q, id))) fair = false;
      crossed.push(id);
    }
  }
  return { asked, crossed, fair };
}
/** Короткая партия: каждый раз вопрос, который исключает больше всего оставшихся карточек. */
function twentySolution(c: TwentyGame): string[] {
  const left = new Set(c.cards.map((card) => card.id).filter((id) => id !== c.answer));
  const entries: string[] = [];
  while (left.size) {
    let best = -1;
    let gain = 0;
    c.questions.forEach((_, i) => {
      const g = [...left].filter((id) => excludes(c, i, id)).length;
      if (g > gain) [best, gain] = [i, g];
    });
    if (best < 0) break;
    entries.push(`?${best}`);
    for (const id of [...left])
      if (excludes(c, best, id)) {
        entries.push(`x:${id}`);
        left.delete(id);
      }
  }
  return entries;
}
const W_QUESTION = /^(Wer|Was|Wo|Wie|Wann|Woher|Wohin|Warum|Welche[rsnm]?)\b/;
/** Основа слова погоды, которая звучит во фразе прогноза: Es regnet. — regnet. */
export const skyStem = (de: string) => de.replace(/^Es /, "").replace(/[.!?]$/, "").toLowerCase();

const isRecord = (value: unknown): value is Record<string, string | number> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);
const sameList = (value: Answer | undefined, expected: string[]) =>
  Array.isArray(value) &&
  value.length === expected.length &&
  expected.every((v, i) => v === value[i]);
const sameSet = (value: Answer | undefined, expected: string[]) =>
  Array.isArray(value) &&
  new Set(value).size === value.length &&
  sameList([...value].sort(), [...expected].sort());
export const coinTotal = (value: Answer | undefined) =>
  isRecord(value)
    ? Object.entries(value).reduce(
        (sum, [coin, count]) => sum + Number(coin) * Number(count),
        0,
      )
    : 0;

export function isCorrect(
  challenge: Challenge,
  value: Answer | undefined,
): boolean {
  switch (challenge.kind) {
    case "play": {
      if (!Array.isArray(value)) return false;
      // Сцена пройдена, когда пройдены обязательные узлы при выбранных сторонах условий.
      const done = new Set(value.map(keyOf));
      return requiredKeys(challenge.nodes, value).every((k) => done.has(k));
    }
    case "code":
    case "clock":
    case "calendar":
      return typeof value === "string" && value === challenge.answer;
    case "order":
      return [challenge.answer, ...(challenge.also ?? [])].some((a) =>
        sameList(value, a),
      );
    case "chat":
      return sameList(
        value,
        challenge.turns.map((t) => t.answer),
      );
    case "gaps":
      return sameList(value, challenge.answer);
    case "spot":
      return sameSet(value, challenge.answer);
    case "memory":
      return sameSet(
        value,
        challenge.pairs.map((p) => p.id),
      );
    case "bingo":
    case "letters":
    case "docks":
    case "gull":
      return sameSet(value, challenge.words);
    case "lock":
      return sameList(value, challenge.rounds.map(lockKey));
    case "speak":
      return sameSet(value, challenge.lines);
    case "oral":
      return sameSet(
        value,
        challenge.rounds.map((r) => r.model),
      );
    case "scene":
      return sameSet(
        value,
        challenge.items.map((i) => i.word),
      );
    case "odd":
      return sameList(
        value,
        challenge.rounds.map((r) => r.odd),
      );
    case "algo": {
      if (!Array.isArray(value)) return false;
      const path = walk(challenge, value);
      return (
        path.length === value.length + 1 &&
        placeKey(path[path.length - 1]) === challenge.goal
      );
    }
    case "coins":
      return coinTotal(value) === challenge.answer;
    case "write":
    case "letter":
      return (
        isRecord(value) &&
        challenge.fields.every(
          (f) => judge(String(value[f.id] ?? ""), f.answers) === "right",
        )
      );
    case "verdict":
      return (
        isRecord(value) &&
        Object.keys(value).length === challenge.items.length &&
        challenge.items.every((i) => value[i.id] === (i.answer ? "yes" : "no"))
      );
    case "sounds":
      return sameList(value, challenge.rounds.map((r) => r.say));
    case "compound":
      return sameList(value, challenge.rounds.map((r) => r.word));
    case "lift":
      return sameList(value, challenge.rounds.map((r) => String(r.floor)));
    case "spy":
      return sameList(value, challenge.rounds.map((r) => r.answer));
    case "weather":
      return isRecord(value) && Object.keys(value).length === challenge.days.length && challenge.forecast.every((f) => value[f.day] === f.sky);
    case "twenty": {
      const { crossed, fair } = twentyState(challenge, value);
      return fair && sameSet(crossed, challenge.cards.map((card) => card.id).filter((id) => id !== challenge.answer));
    }
    case "contra":
      return sameSet(value, challenge.answer);
    case "cipher":
      return typeof value === "string" && cipherNorm(value) === challenge.answer;
    case "planner": {
      // Проверка по результату: встреча одна и стоит там, где свободны все.
      if (!isRecord(value)) return false;
      const stars = Object.keys(value).filter((cell) => value[cell] === "star");
      return stars.length === 1 && plannerFree(challenge).includes(stars[0]);
    }
    default: {
      if (!isRecord(value)) return false;
      const expected = challenge.answer;
      return (
        Object.keys(value).length === Object.keys(expected).length &&
        Object.entries(expected).every(([id, v]) => value[id] === v)
      );
    }
  }
}

/** Ответ, который показывается на уже пройденном шаге и проверяется при сборке. */
export function solution(challenge: Challenge): Answer {
  switch (challenge.kind) {
    case "play":
      return solutionEntries(challenge.nodes);
    case "chat":
      return challenge.turns.map((t) => t.answer);
    case "memory":
      return challenge.pairs.map((p) => p.id);
    case "bingo":
    case "letters":
    case "docks":
    case "gull":
      return challenge.words;
    case "lock":
      return challenge.rounds.map(lockKey);
    case "speak":
      return challenge.lines;
    case "oral":
      return challenge.rounds.map((r) => r.model);
    case "scene":
      return challenge.items.map((i) => i.word);
    case "odd":
      return challenge.rounds.map((r) => r.odd);
    case "algo":
      return challenge.moves;
    case "write":
    case "letter":
      return Object.fromEntries(
        challenge.fields.map((f) => [f.id, f.answers[0]]),
      );
    case "verdict":
      return Object.fromEntries(
        challenge.items.map((i) => [i.id, i.answer ? "yes" : "no"]),
      );
    case "sounds":
      return challenge.rounds.map((r) => r.say);
    case "compound":
      return challenge.rounds.map((r) => r.word);
    case "lift":
      return challenge.rounds.map((r) => String(r.floor));
    case "spy":
      return challenge.rounds.map((r) => r.answer);
    case "twenty":
      return twentySolution(challenge);
    case "weather":
      return Object.fromEntries(challenge.forecast.map((f) => [f.day, f.sky]));
    case "planner":
      return { [plannerFree(challenge)[0]]: "star" };
    case "coins": {
      let rest = challenge.answer;
      const coins: Record<string, number> = {};
      for (const coin of [...challenge.coins].sort((a, b) => b - a)) {
        const count = Math.floor(rest / coin);
        if (count) coins[coin] = count;
        rest -= count * coin;
      }
      return coins;
    }
    default:
      return challenge.answer;
  }
}

export function initialAnswer(challenge: Challenge): Answer {
  switch (challenge.kind) {
    case "play":
    case "order":
    case "chat":
    case "spot":
    case "memory":
    case "bingo":
    case "scene":
    case "odd":
    case "letters":
    case "speak":
    case "docks":
    case "gull":
    case "lock":
    case "oral":
    case "sounds":
    case "compound":
    case "lift":
    case "spy":
    case "twenty":
    case "algo":
    case "contra":
      return [];
    case "gaps":
      return challenge.answer.map(() => "");
    case "quantity":
      return Object.fromEntries(challenge.items.map((i) => [i.id, 0]));
    case "match":
    case "verdict":
    case "sort":
    case "coins":
    case "write":
    case "letter":
    case "grid":
    case "ads":
    case "planner":
    case "tree":
    case "portrait":
    case "weather":
      return {};
    case "clock":
      return challenge.start;
    default:
      return "";
  }
}

/** Какие ответы формуляра ещё не верны: они возвращаются в память как ошибки. */
export const wrongAnswers = (
  c: Extract<Challenge, { kind: "write" | "letter" }>,
  value: Answer,
) =>
  c.fields
    .filter((f) => {
      const text = isRecord(value) ? String(value[f.id] ?? "") : "";
      return judge(text, f.answers) !== "right";
    })
    .map((f) => f.answers[0]);

/** Что сказать после неудачной проверки: сначала о незавершённом, затем о смысле. */
export function mistake(c: Challenge, value: Answer, hint: string): string {
  const record = isRecord(value) ? value : {};
  const list = Array.isArray(value) ? value : [];
  switch (c.kind) {
    case "clock":
      return c.traps[String(value)] ?? hint;
    case "verdict":
      if (Object.keys(record).length < c.items.length)
        return "Поставьте штамп на каждой записи.";
      return (
        c.items.find((i) => (record[i.id] === "yes") !== i.answer)?.why ?? hint
      );
    case "gaps":
      return list.filter(Boolean).length < c.answer.length
        ? "Заполните все пропуски."
        : hint;
    case "sort":
      return Object.keys(record).length < c.cards.length
        ? "Разложите все карточки."
        : hint;
    case "match":
      return Object.keys(record).length < c.left.length
        ? "Соедините все пары."
        : hint;
    case "write": {
      const verdicts = c.fields.map((f) =>
        String(record[f.id] ?? "").trim()
          ? judge(String(record[f.id]), f.answers)
          : "empty",
      );
      if (verdicts.includes("empty")) return "Заполните все поля.";
      if (verdicts.includes("wrong"))
        return "Красные поля пока неверны. Если слово не вспоминается, проверьте ещё раз: под полем появится правильный ответ.";
      const near = c.fields
        .flatMap((f) => nearMisses(String(record[f.id] ?? ""), f.answers))
        .join(", ");
      return verdicts.includes("case")
        ? `Почти: проверьте заглавные и строчные буквы — ${near}.`
        : `Почти: нужна буква с умлаутом или ß — ${near}.`;
    }
    case "spot":
    case "contra":
      return list.length === c.answer.length
        ? hint
        : `Нужно выбрать: ${c.answer.length}.`;
    case "grid": {
      if (Object.keys(record).length < c.people.length * c.cols.length)
        return "Заполните всю таблицу: у каждого по одному значению в каждом столбце.";
      const broken = gridBroken(c, record);
      return broken ? `Не сходится улика: «${broken.de}»` : hint;
    }
    case "ads":
      return Object.keys(record).length < c.people.length
        ? "Подберите объявление каждому — или отметьте, что ничего не подходит."
        : hint;
    case "planner": {
      const stars = Object.keys(record).filter((cell) => record[cell] === "star");
      if (stars.length !== 1) return "Поставьте одну встречу ★ — туда, где свободны все.";
      const who = plannerWho(c, stars[0]);
      return who.length ? `В это время не может: ${who.join(", ")}.` : hint;
    }
    case "cipher":
      return typeof value === "string" && value.trim() ? hint : "Впишите расшифровку.";
    case "algo": {
      if (!list.length) return "Соберите программу из карточек.";
      const path = walk(c, list);
      if (path.length < list.length + 1) return `Шаг ${path.length} уводит за край схемы.`;
      const end = c.places[placeKey(path.at(-1)!)];
      return `Программа приводит ${end ? `к месту ${end}` : "на пустой перекрёсток"}, а нужно — ${c.places[c.goal]}.`;
    }
    case "tree": {
      if (Object.keys(record).length < Object.keys(c.answer).length) return "Впишите имя в каждую пустую клетку.";
      const wrong = treeWrong(c, record);
      return wrong?.line ? `${String(record[wrong.slot.id])} — не на своём месте. Перечитайте: «${wrong.line.de}»` : hint;
    }
    case "portrait": {
      const part = c.parts.find((p) => record[p.id] !== c.answer[p.id]);
      if (Object.keys(record).length < c.parts.length) return "Выберите каждую примету.";
      return part ? `Не сходится: ${part.label.toLowerCase()}. Перечитайте приметы.` : hint;
    }
    default:
      return hint;
  }
}

export function validateChallenge(
  c: Challenge,
  known: Set<string>,
  phrases: Record<string, unknown>,
): boolean {
  switch (c.kind) {
    case "play":
      return validateScene(c.nodes, known, phrases);
    case "order":
      return [c.answer, ...(c.also ?? [])].every(
        (a) =>
          a.length === c.tiles.length &&
          [...a].sort().join("|") === [...c.tiles].sort().join("|"),
      );
    case "match":
      return (
        Object.keys(c.answer).length === c.left.length &&
        c.left.every((i) => c.right.some((r) => r.id === c.answer[i.id]))
      );
    case "quantity":
      return c.items.every(
        (i) =>
          Number.isInteger(c.answer[i.id]) &&
          c.answer[i.id] >= 0 &&
          c.answer[i.id] <= i.max,
      );
    case "code":
      return /^\d+$/.test(c.answer) && c.answer.length === c.length;
    case "chat":
      return c.turns.every(
        (t) =>
          t.options.length >= 2 && t.options.some((o) => o.id === t.answer),
      );
    case "verdict":
      return (
        c.items.some((i) => i.answer) &&
        c.items.some((i) => !i.answer) &&
        new Set(c.items.map((i) => i.id)).size === c.items.length
      );
    case "gaps":
      return (
        c.parts.filter((p) => p === null).length === c.answer.length &&
        new Set(c.bank).size === c.bank.length &&
        c.bank.length > c.answer.length &&
        c.answer.every((a) => c.bank.includes(a))
      );
    case "sort":
      return (
        c.cards.every((i) => c.bins.some((b) => b.id === c.answer[i.id])) &&
        c.bins.every((b) => Object.values(c.answer).includes(b.id))
      );
    case "spot":
      return (
        c.answer.length > 0 &&
        c.answer.every((id) => {
          const [line, token] = id.split(":").map(Number);
          return c.lines[line]?.[token] !== undefined;
        })
      );
    case "memory":
      // Пары повторяют уже встреченное: новое выражение появляется в рассказе.
      return (
        c.pairs.length >= 3 &&
        c.pairs.every((p) => known.has(p.id) && phrases[p.id])
      );
    case "clock":
      return (
        Number(c.answer.slice(3)) % c.step === 0 &&
        Number(c.start.slice(3)) % c.step === 0 &&
        c.answer !== c.start
      );
    case "algo":
      return (
        c.goal in c.places &&
        walk(c, c.moves).length === c.moves.length + 1 &&
        placeKey(walk(c, c.moves).at(-1)!) === c.goal &&
        (c.max === undefined || c.moves.length <= c.max)
      );
    case "coins":
      return coinTotal(solution(c)) === c.answer;
    case "calendar": {
      const [name, day] = c.answer.split(":");
      const month = c.months.find((m) => m.name === name);
      return Boolean(month && Number(day) >= 1 && Number(day) <= month.days);
    }
    case "bingo":
      return c.words.length === 9 && new Set(c.words).size === 9;
    case "scene":
      return (
        c.items.length >= 6 &&
        new Set(c.items.map((i) => i.word)).size === c.items.length
      );
    case "odd":
      return c.rounds.every(
        (r) => r.words.length === 4 && r.words.includes(r.odd) && r.why,
      );
    case "letters":
      return (
        c.words.length >= 3 &&
        c.words.every((w) => /^\p{L}+$/u.test(w.replace(/^(der|die|das) /, "")))
      );
    case "speak":
      return c.lines.length >= 2;
    case "docks":
      return (
        c.words.length >= 4 &&
        new Set(c.words).size === c.words.length &&
        c.words.every((w) => /^(der|die|das) /.test(w))
      );
    case "gull":
      return c.words.length >= 4 && new Set(c.words).size === c.words.length;
    case "lock":
      return c.rounds.every(
        (r) =>
          r.ru &&
          r.reels.length === r.answer.length &&
          r.reels.every(
            (options, i) =>
              options.length >= 2 &&
              new Set(options).size === options.length &&
              options.includes(r.answer[i]),
          ),
      );
    case "oral":
      return (
        c.rounds.length >= 2 &&
        new Set(c.rounds.map((r) => r.model)).size === c.rounds.length &&
        c.rounds.every((r) => r.model && r.ru && r.task && (r.card || r.hear))
      );
    case "write":
    case "letter":
      return (
        c.fields.length > 0 &&
        new Set(c.fields.map((f) => f.id)).size === c.fields.length &&
        c.fields.every((f) => f.answers.length > 0)
      );
    case "sounds":
      return (
        c.rounds.length >= 3 &&
        c.rounds.every((r) => r.options.length >= 2 && new Set(r.options).size === r.options.length && r.options.includes(r.say))
      );
    case "grid": {
      // Решение одно, оно совпадает с ответом, и каждая улика нужна: без любой из них решений больше.
      const shape =
        c.people.length >= 2 &&
        new Set(c.people).size === c.people.length &&
        c.cols.length >= 1 &&
        c.cols.every((col) => col.values.length === c.people.length && new Set(col.values).size === col.values.length) &&
        c.clues.length > 0 &&
        c.clues.every((clue) => clue.de && clue.ru && gridTermValid(c, clue.a) && gridTermValid(c, clue.b));
      if (!shape) return false;
      const all = gridSolutions(c, c.clues, 2);
      const same = (a: Record<string, string>, b: Record<string, string>) =>
        Object.keys(a).length === Object.keys(b).length && Object.entries(a).every(([k, v]) => b[k] === v);
      return (
        all.length === 1 &&
        same(all[0], c.answer) &&
        c.clues.every((_, i) => gridSolutions(c, c.clues.filter((__, j) => j !== i), 2).length > 1)
      );
    }
    case "compound":
      return (
        c.rounds.length >= 2 &&
        c.rounds.every((r) => r.parts.length >= 2 && r.ru && /^(der|die|das) /.test(r.word) && r.word.slice(4) === compoundOf(r.parts)) &&
        c.extra.every((p) => !c.rounds.some((r) => r.parts.includes(p)))
      );
    case "contra": {
      const ids = new Set(c.texts.flatMap((t, ti) => t.lines.flatMap((line, li) => line.map((_, wi) => `${ti}:${li}:${wi}`))));
      return (
        c.texts.length >= 2 &&
        c.answer.length >= 2 &&
        c.answer.every((id) => ids.has(id)) &&
        new Set(c.answer.map((id) => id.split(":")[0])).size >= 2
      );
    }
    case "planner": {
      const cells = new Set(c.days.flatMap((d) => c.hours.map((h) => `${d}|${h}`)));
      const free = plannerFree(c);
      return (
        c.notes.length >= 2 &&
        c.notes.every((n) => n.de && n.ru && n.who && [...(n.busy ?? []), ...(n.only ?? [])].every((cell) => cells.has(cell))) &&
        free.length >= 1 &&
        free.length <= 2
      );
    }
    case "ads": {
      const used = Object.values(c.answer).filter((v) => v !== "0");
      return (
        c.people.length >= 2 &&
        c.ads.length >= 2 &&
        c.people.every((p) => c.answer[p.id] === "0" || c.ads.some((a) => a.id === c.answer[p.id])) &&
        new Set(used).size === used.length
      );
    }
    case "lift":
      return c.rounds.length >= 2 && c.rounds.every((r) => r.floor >= -1 && r.floor <= c.top && r.de && r.ru && r.who);
    case "cipher":
      return Boolean(c.answer && c.ru) && cipherNorm(decipher(c)) === cipherNorm(c.answer);
    case "tree": {
      // Каждая пустая клетка получает своё имя, имя названо в рассказе, лишние имена допустимы.
      const open = treeSlots(c.root).filter((s) => !s.given);
      const ids = treeSlots(c.root).map((s) => s.id);
      const named = Object.values(c.answer);
      return (
        open.length >= 2 &&
        new Set(ids).size === ids.length &&
        new Set(c.names).size === c.names.length &&
        Object.keys(c.answer).length === open.length &&
        open.every((s) => c.answer[s.id] && c.names.includes(c.answer[s.id])) &&
        new Set(named).size === named.length &&
        named.every((name) => c.text.some((t) => t.de.includes(name))) &&
        c.text.every((t) => t.de && t.ru)
      );
    }
    case "spy":
      // Загадка решается одним способом, и нужны обе подсказки: тот же цвет есть у вещи другого
      // рода, то же местоимение — у вещи другого цвета.
      return (
        c.items.length >= 4 &&
        new Set(c.items.map((i) => i.de)).size === c.items.length &&
        c.items.every((i) => SPY.includes(i.de) && COLOURS.includes(i.colour)) &&
        c.rounds.length >= 2 &&
        c.rounds.every(
          (r) =>
            r.ru &&
            r.de.toLowerCase().includes(`${r.pronoun} ist ${r.colour}`) &&
            spyMatches(c, r).map((i) => i.de).join() === r.answer &&
            c.items.some((i) => i.de !== r.answer && i.colour === r.colour) &&
            c.items.some((i) => i.de !== r.answer && pronounOf(i.de) === r.pronoun),
        )
      );
    case "weather": {
      // У каждого дня одна фраза: в ней звучат свой день и слово своего значка, без чужих и без
      // отрицания. Хотя бы один значок — приманка: его нет в прогнозе.
      const ids = c.skies.map((s) => s.id);
      const days = c.forecast.map((f) => f.day);
      return (
        Boolean(c.voice) &&
        c.days.length >= 3 &&
        new Set(c.days).size === c.days.length &&
        ids.length >= 3 &&
        new Set(ids).size === ids.length &&
        days.length === c.days.length &&
        c.days.every((d) => days.includes(d)) &&
        new Set(c.forecast.map((f) => f.sky)).size >= 3 &&
        c.skies.every((s) => s.ru && s.icon) &&
        c.skies.some((s) => !c.forecast.some((f) => f.sky === s.id)) &&
        c.forecast.every((f) => {
          const heard = c.skies.filter((s) => f.de.toLowerCase().includes(skyStem(s.de))).map((s) => s.id);
          return (
            f.ru &&
            c.days.filter((d) => f.de.includes(d)).join() === f.day &&
            !/(?<![\p{L}])(nicht|kein|keine)(?![\p{L}])/iu.test(f.de) &&
            heard.length === 1 &&
            heard[0] === f.sky
          );
        })
      );
    }
    case "twenty": {
      // Загаданную можно найти честно: её ответ на каждый вопрос известен, а каждую другую карточку
      // исключает хотя бы один вопрос. Вопрос — «да/нет», глагол первым.
      const ids = c.cards.map((card) => card.id);
      return (
        Boolean(c.who && c.voice) &&
        ids.length >= 4 &&
        new Set(ids).size === ids.length &&
        ids.includes(c.answer) &&
        c.questions.length >= 3 &&
        c.questions.every(
          (q) => q.ru && q.de.endsWith("?") && !W_QUESTION.test(q.de) && !q.yes.some((id) => q.no.includes(id)) && answerOf(q, c.answer) !== undefined,
        ) &&
        ids.every((id) => id === c.answer || c.questions.some((_, i) => excludes(c, i, id)))
      );
    }
    case "portrait":
      return (
        c.notes.length >= 2 &&
        c.notes.every((n) => n.de && n.ru) &&
        new Set(c.parts.map((p) => p.id)).size === c.parts.length &&
        Object.keys(c.answer).length === c.parts.length &&
        c.parts.every(
          (p) =>
            p.label &&
            p.options.length >= 2 &&
            new Set(p.options).size === p.options.length &&
            p.options.includes(c.answer[p.id] ?? "") &&
            (p.id === "says" || p.options.every((o) => PORTRAIT[p.id as Exclude<PortraitPart, "says">].includes(o))),
        )
      );
  }
}

/** Сцена: у каждого действия есть верный ответ, встроенные игры решаемы, развилки без вложений. */
function validateScene(
  nodes: SceneNode[],
  known: Set<string>,
  phrases: Record<string, unknown>,
  nested = false,
): boolean {
  // Картинка показывается перед следующим узлом, поэтому последней в списке стоять не может.
  if (!nodes.length || nodes.at(-1)!.t === "pic") return false;
  // Последствия и условия говорят только о часах и отношениях из TRACKS.
  const effects = (set?: Effects) => !set || Object.keys(set).every((q) => TRACKS[q]);
  const conds = (list?: Cond[]) => !list || (list.length > 0 && list.every((c) => TRACKS[c.q]));
  // Правило объясняет действие игрока, поэтому стоит только у действий; ссылка — «тема/фрагмент».
  const rules = (n: SceneNode) =>
    !n.rule ||
    (["reply", "type", "gap", "hear", "pick", "look", "game"].includes(n.t) &&
      n.rule.length > 0 &&
      n.rule.every((r) => /^[\w-]+\/[\w-]+$/.test(r)));
  return nodes.every((n) => {
    if (!effects(n.set) || !rules(n)) return false;
    if (n.t === "game" && n.outcome && !(Object.keys(n.outcome).length > 0 && effects(n.outcome.clean) && effects(n.outcome.sloppy))) return false;
    switch (n.t) {
      case "narr":
        return phraseIds(n.text).every((id) => phrases[id]);
      case "say":
        return Boolean(n.de && n.ru && n.who && n.voice) && !/[а-яё]/i.test(n.de);
      case "reply":
      case "pick":
        return (
          n.options.length >= 2 &&
          n.options.some((o) => o.ok) &&
          n.options.every((o) => (o.ok || o.react) && (!o.set || (o.ok && effects(o.set))))
        );
      case "type":
        // Образец не может подставлять в «*» случайное имя: где есть *, он задан и сам верен.
        return (
          n.answers.length > 0 &&
          Boolean(n.task) &&
          (!n.answers.some((a) => a.includes("*")) || (Boolean(n.sample) && typedRight(n.sample!, n.answers) === "right"))
        );
      case "gap":
        return n.text.includes("___") && n.options.includes(n.answer) && new Set(n.options).size === n.options.length && n.options.length >= 2;
      case "hear":
        return n.options.includes(n.answer) && new Set(n.options).size === n.options.length && n.options.length >= 2;
      case "look":
        return n.items.some((i) => i.key) && n.items.every((i) => i.note && i.ru && i.icon && i.de);
      case "go":
        // Обязательных веток не меньше двух — или есть побочные; условие появления — только у побочных.
        return (
          !nested &&
          (n.branches.length >= 2 || n.branches.some((b) => b.optional)) &&
          n.branches.every(
            (b) => b.label && (b.optional || !b.if) && conds(b.if) && validateScene(b.nodes, known, phrases, true),
          )
        );
      case "when":
        return conds(n.if) && validateScene(n.then, known, phrases, true) && (!n.else || validateScene(n.else, known, phrases, true));
      case "item":
        return Boolean(n.icon && n.de && n.ru);
      case "clue":
        return Boolean(n.title && n.text);
      case "pic":
        return /^[\w-]+\.(jpg|png|webp)$/.test(n.src) && Boolean(n.alt);
      case "game":
        return n.c.kind !== "play" && validateChallenge(n.c, known, phrases) && isCorrect(n.c, solution(n.c));
    }
  });
}

export function validateStory(
  episodes: Episode[],
  phrases: Record<string, unknown>,
): string[] {
  const errors: string[] = [],
    ids = new Set<string>(),
    known = new Set<string>();
  for (const episode of episodes) {
    for (const beat of episode.beats) {
      if (ids.has(beat.id)) errors.push(`Duplicate beat: ${beat.id}`);
      ids.add(beat.id);
      for (const id of beatPhrases(beat)) {
        if (!phrases[id]) errors.push(`Unknown phrase: ${id}`);
        known.add(id);
      }
      const c = beat.challenge;
      if (!isCorrect(c, solution(c)))
        errors.push(`Unreachable solution: ${beat.id}`);
      if (!validateChallenge(c, known, phrases))
        errors.push(`Wrong ${c.kind}: ${beat.id}`);
    }
  }
  return errors;
}
