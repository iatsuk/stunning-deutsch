import { judge } from "../trainer/logic.ts";
import type {
  Answer,
  Beat,
  Challenge,
  Episode,
  LockRound,
  Move,
  Phrase,
  StorySave,
} from "./types.ts";

type Route = Extract<Challenge, { kind: "route" }>;
type Position = { x: number; y: number; heading: number };

export const STORY_KEY = "sd-moin-story-v1";
export const phraseIds = (text: string): string[] =>
  [...text.matchAll(/\{([\w-]+)\}/g)].map((m) => m[1]);
export const beatPhrases = (beat: Beat) => [
  ...new Set([...beat.story, ...(beat.source?.lines ?? [])].flatMap(phraseIds)),
];
export function knownBefore(beats: Beat[], cursor: number): Set<string> {
  return new Set(beats.slice(0, cursor).flatMap(beatPhrases));
}

/** Голос выражений рассказа; реплики героев задают свой голос. */
export const NARRATOR = "Anna";
export const audioKey = (text: string, voice = NARRATOR) => `${voice}|${text}`;
/** Всё, что звучит в истории: по этому списку сборка связывает фразы с записями. */
export function storyLines(
  episodes: Episode[],
  phrases: Record<string, Phrase>,
): { text: string; voice: string }[] {
  return [
    ...Object.values(phrases).map((p) => ({ text: p.de, voice: NARRATOR })),
    ...episodes.flatMap((e) =>
      e.beats.flatMap((b) => [
        ...(b.voices ?? []).map(({ text, voice }) => ({ text, voice })),
        ...(b.challenge.kind === "chat"
          ? b.challenge.turns.map((t) => ({
              text: t.say,
              voice: (b.challenge as { voice: string }).voice,
            }))
          : []),
      ]),
    ),
  ];
}
/** Слова словаря уроков, которыми играет этот шаг. */
export function challengeWords(c: Challenge): string[] {
  if (
    c.kind === "bingo" ||
    c.kind === "letters" ||
    c.kind === "docks" ||
    c.kind === "gull"
  )
    return c.words;
  if (c.kind === "speak") return c.lines;
  if (c.kind === "scene") return c.items.map((i) => i.word);
  if (c.kind === "odd") return c.rounds.flatMap((r) => r.words);
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

/** Старые ошибки возвращаются, пока их не исправят, но не вытесняют выражения текущей главы. */
export const reviewItems = (episode: Episode, weak: Record<string, number>) =>
  [
    ...new Set([...Object.keys(weak).slice(0, 3), ...(episode.review ?? [])]),
  ].slice(0, 6);

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
export const canMove = (route: Route, moves: string[], move: Move) =>
  walk(route, [...moves, move]).length === walk(route, moves).length + 1;
export const placeKey = (at: { x: number; y: number }) => `${at.x},${at.y}`;

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
    case "choice":
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
    case "route": {
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
    case "scene":
      return challenge.items.map((i) => i.word);
    case "odd":
      return challenge.rounds.map((r) => r.odd);
    case "route":
      return challenge.moves;
    case "write":
      return Object.fromEntries(
        challenge.fields.map((f) => [f.id, f.answers[0]]),
      );
    case "verdict":
      return Object.fromEntries(
        challenge.items.map((i) => [i.id, i.answer ? "yes" : "no"]),
      );
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
    case "order":
    case "chat":
    case "spot":
    case "memory":
    case "route":
    case "bingo":
    case "scene":
    case "odd":
    case "letters":
    case "speak":
    case "docks":
    case "gull":
    case "lock":
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
      return {};
    case "clock":
      return challenge.start;
    default:
      return "";
  }
}

/** Какие ответы формуляра ещё не верны: они возвращаются в память как ошибки. */
export const wrongAnswers = (
  c: Extract<Challenge, { kind: "write" }>,
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
    case "choice":
      return (
        c.options.find((o) => o.id === value)?.why ??
        "Выберите действие по сообщению."
      );
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
      if (verdicts.includes("wrong")) return hint;
      return verdicts.includes("case")
        ? "Почти: проверьте заглавные и строчные буквы."
        : "Почти: нужна буква с умлаутом или ß.";
    }
    case "spot":
      return list.length === c.answer.length
        ? hint
        : `Нужно выбрать: ${c.answer.length}.`;
    default:
      return hint;
  }
}

/** Черновик другого вида игры не применяется: старые сохранения просто теряют его. */
function restoreDraft(c: Challenge, v: unknown): Answer | undefined {
  const strings = Array.isArray(v) && v.every((t) => typeof t === "string");
  switch (c.kind) {
    case "choice":
    case "code":
      return typeof v === "string" ? v : undefined;
    case "order": {
      if (!strings) return undefined;
      const remaining = [...c.tiles];
      return (v as string[]).filter((t) => {
        const i = remaining.indexOf(t);
        if (i < 0) return false;
        remaining.splice(i, 1);
        return true;
      });
    }
    case "chat": {
      if (!strings) return undefined;
      const said = v as string[];
      const correct = c.turns.findIndex((t, i) => said[i] !== t.answer);
      return said.slice(0, correct < 0 ? c.turns.length : correct);
    }
    case "gaps": {
      if (!strings || (v as string[]).length !== c.answer.length)
        return undefined;
      return (v as string[]).map((t) => (c.bank.includes(t) ? t : ""));
    }
    case "spot": {
      if (!strings) return undefined;
      return [...new Set(v as string[])].filter((id) => {
        const [line, token] = id.split(":").map(Number);
        return c.lines[line]?.[token] !== undefined;
      });
    }
    case "memory":
      return strings
        ? [...new Set(v as string[])].filter((id) =>
            c.pairs.some((p) => p.id === id),
          )
        : undefined;
    case "bingo":
    case "letters":
    case "speak":
    case "docks":
    case "gull":
    case "scene": {
      if (!strings) return undefined;
      const known =
        c.kind === "scene"
          ? c.items.map((i) => i.word)
          : c.kind === "speak"
            ? c.lines
            : c.words;
      return [...new Set(v as string[])].filter((id) => known.includes(id));
    }
    case "odd":
    case "lock": {
      if (!strings) return undefined;
      const solved = v as string[];
      const keys =
        c.kind === "odd" ? c.rounds.map((r) => r.odd) : c.rounds.map(lockKey);
      const wrong = keys.findIndex((key, i) => solved[i] !== key);
      return solved.slice(0, wrong < 0 ? keys.length : wrong);
    }
    case "route":
      return strings
        ? (v as string[]).slice(0, walk(c, v as string[]).length - 1)
        : undefined;
    case "clock":
      return typeof v === "string" &&
        /^([01]\d|2[0-3]):[0-5]\d$/.test(v) &&
        Number(v.slice(3)) % c.step === 0
        ? v
        : undefined;
    case "calendar": {
      if (typeof v !== "string") return undefined;
      const [name, day] = v.split(":");
      const month = c.months.find((m) => m.name === name);
      return month && Number(day) >= 1 && Number(day) <= month.days
        ? v
        : undefined;
    }
    default: {
      if (!isRecord(v)) return undefined;
      return Object.fromEntries(
        Object.entries(v).filter(([id, x]) => {
          if (c.kind === "match")
            return (
              c.left.some((i) => i.id === id) && c.right.some((i) => i.id === x)
            );
          if (c.kind === "sort")
            return (
              c.cards.some((i) => i.id === id) && c.bins.some((i) => i.id === x)
            );
          if (c.kind === "verdict")
            return (
              c.items.some((i) => i.id === id) && (x === "yes" || x === "no")
            );
          if (c.kind === "coins")
            return (
              c.coins.includes(Number(id)) &&
              Number.isInteger(x) &&
              Number(x) >= 0
            );
          if (c.kind === "write")
            return c.fields.some((f) => f.id === id) && typeof x === "string";
          return c.items.some(
            (i) =>
              i.id === id &&
              Number.isInteger(x) &&
              Number(x) >= 0 &&
              Number(x) <= i.max,
          );
        }),
      );
    }
  }
}

const isCount = (value: unknown) =>
  Number.isInteger(value) && Number(value) >= 0;

export function normalizeSave(raw: unknown, beats: Beat[]): StorySave {
  const data =
    raw && typeof raw === "object" ? (raw as Partial<StorySave>) : {};
  const completed = Number.isInteger(data.completed)
    ? Math.max(0, Math.min(beats.length, data.completed!))
    : 0;
  const cursor = Number.isInteger(data.cursor)
    ? Math.max(0, Math.min(beats.length - 1, completed, data.cursor!))
    : Math.min(completed, beats.length - 1);
  const drafts: Record<string, Answer> = {};
  if (data.drafts && typeof data.drafts === "object")
    for (const beat of beats) {
      const draft = restoreDraft(beat.challenge, data.drafts[beat.id]);
      if (draft !== undefined) drafts[beat.id] = draft;
    }
  const weak =
    data.weak && typeof data.weak === "object"
      ? Object.fromEntries(
          Object.entries(data.weak).filter(
            ([, count]) => Number.isInteger(count) && count > 0,
          ),
        )
      : {};
  const cards =
    data.cards && typeof data.cards === "object"
      ? Object.fromEntries(
          Object.entries(data.cards).filter(
            ([, card]) =>
              isCount(card?.box) && isCount(card?.step) && isCount(card?.day),
          ),
        )
      : {};
  return {
    version: 1,
    cursor,
    completed,
    drafts,
    support: data.support === true,
    weak,
    cards,
    last:
      isCount(data.last?.step) && isCount(data.last?.day)
        ? data.last!
        : { step: 0, day: 0 },
  };
}

function validateChallenge(
  c: Challenge,
  known: Set<string>,
  phrases: Record<string, unknown>,
): boolean {
  switch (c.kind) {
    case "choice":
      return c.options.some((o) => o.id === c.answer);
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
    case "route":
      return (
        c.goal in c.places && placeKey(walk(c, c.moves).at(-1)!) === c.goal
      );
    case "coins":
      return coinTotal(solution(c)) === c.answer;
    case "calendar":
      return restoreDraft(c, c.answer) === c.answer;
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
    case "write":
      return (
        c.fields.length > 0 &&
        new Set(c.fields.map((f) => f.id)).size === c.fields.length &&
        c.fields.every((f) => f.answers.length > 0)
      );
  }
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
      for (const id of beat.practice ?? [])
        if (!phrases[id]) errors.push(`Unknown practice: ${beat.id}: ${id}`);
    }
    // В конце главы диктуем только то, что рассказ уже показал.
    for (const id of episode.review ?? [])
      if (!known.has(id)) errors.push(`Unknown review: ${episode.id}: ${id}`);
  }
  return errors;
}
