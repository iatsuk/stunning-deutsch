import { plain } from "../lib/german.ts";
import { beatPhrases, challengeWords, lockKey } from "./logic.ts";
import { stepRules } from "./rules.ts";
import type { Beat, Challenge, LockRound, Mark, WordCard } from "./types.ts";

// Память слов: коробки Лейтнера с двумя часами. Слово возвращается через заданное число шагов
// истории или дней, смотря что наступит раньше. Шаги работают, пока игрок проходит много за раз,
// дни — когда он сделал перерыв или уже закончил историю. Фразы замков идут в той же очереди,
// поэтому грамматика возвращается вместе со словами своей главы.

export type Cards = Record<string, WordCard>;
export type Dictionary = Record<string, { ru: string; audio?: string }>;
export type Round = {
  words: string[];
  challenge: Challenge;
  /** Какие правила открыть при ошибке в фразе замка. */
  rules?: Record<string, string[]>;
};
export type Locks = Record<string, { round: LockRound; rules: string[] }>;

const INTERVALS = [
  { steps: 14, days: 1 },
  { steps: 42, days: 2 },
  { steps: 84, days: 4 },
  { steps: Infinity, days: 8 },
  { steps: Infinity, days: 16 },
  { steps: Infinity, days: 32 },
];
/** Сколько шагов истории между раундами, если не наступил новый день. */
const EVERY = 4;
const MIN_ROUND = 4;
/** Фразы замков в раунде и то, насколько близко к началу очереди они должны стоять. */
const LOCK_ROUND = 3;
const QUEUE_HEAD = 12;
const SIZE = { bingo: 12, gull: 10, docks: 10, letters: 5, write: 6 };
type RoundKind = keyof typeof SIZE;
/** Чем прочнее слово, тем труднее игры: услышать, вспомнить по смыслу, собрать, написать. */
const LADDER: RoundKind[][] = [
  ["bingo", "gull", "docks"],
  ["gull", "docks", "letters"],
  ["docks", "letters", "write"],
  ["write", "letters"],
];
const level = (box: number) => Math.min(box, LADDER.length - 1);
/** С этой коробки слово считается закреплённым повторениями. */
const FIRM_BOX = 3;
/** Столько раундов предлагает разминка после перерыва. */
export const WELCOME_ROUNDS = 3;

const PLURALS = [
  "die Eltern",
  "die Geschwister",
  "die Großeltern",
  "die Möbel",
  "die Nebenkosten",
  "die Ferien",
  "die USA",
];
const ARTICLE = /^(der|die|das) /;
const isNoun = (word: string) => ARTICLE.test(word) && !PLURALS.includes(word);
const spellable = (word: string) => /^\p{L}+$/u.test(word.replace(ARTICLE, ""));
/** Тире и многоточие на клавиатуре телефона не наберёшь, а знаки в конце проверка не требует. */
const typable = (word: string) => /^[\p{L} '-]+[.!?]?$/u.test(word);
/** «Привет!» и «Привет! Здравствуйте!» — одно значение: по переводу их не различить. */
const meaning = (ru: string) =>
  ru
    .split(/[;,/!?]/)[0]
    .trim()
    .toLowerCase();

/** Локальный календарный день: новый день начинается в полночь у игрока. */
export const dayNumber = (now = Date.now()) =>
  Math.floor((now - new Date(now).getTimezoneOffset() * 60_000) / 86_400_000);

/** Фраза замка в памяти: приставка не даёт ей совпасть со словом словаря. */
const LOCK = "lock:";
export const lockCard = (round: LockRound) => `${LOCK}${lockKey(round)}`;

/** Все фразы замков вместе с правилами шага, откуда они взяты. */
export function lockCards(beats: Beat[]): Locks {
  const locks: Locks = {};
  for (const { id, challenge: c } of beats)
    if (c.kind === "lock")
      for (const round of c.rounds)
        locks[lockCard(round)] = { round, rules: stepRules[id] ?? [] };
  return locks;
}

/** Что запоминает шаг: слова из словаря уроков (у них есть перевод и запись) и фразы замка. */
export function stepWords(
  beat: Beat,
  dictionary: Dictionary,
  phrases: Record<string, { de: string }>,
): string[] {
  const c = beat.challenge;
  return [
    ...challengeWords(c),
    ...(c.kind === "write" ? c.fields.flatMap((f) => f.answers) : []),
    ...beatPhrases(beat).map((id) => plain(phrases[id].de)),
  ]
    .filter((word) => dictionary[word])
    .concat(c.kind === "lock" ? c.rounds.map(lockCard) : []);
}

/** Первая встреча кладёт слово в начальную коробку; повторная встреча его не трогает. */
export function remember(
  cards: Cards,
  words: string[],
  step: number,
  day: number,
): Cards {
  const next = { ...cards };
  for (const word of words) next[word] ??= { box: 0, step, day };
  return next;
}

export const slip = (
  cards: Cards,
  word: string,
  step: number,
  day: number,
): Cards => ({ ...cards, [word]: { box: 0, step, day } });

/** Итог раунда: слово с ошибкой возвращается в начало, остальные идут дальше. */
export function grade(
  cards: Cards,
  words: string[],
  missed: string[],
  step: number,
  day: number,
): Cards {
  const next = { ...cards };
  for (const word of words)
    next[word] = {
      box: missed.includes(word)
        ? 0
        : Math.min((next[word]?.box ?? 0) + 1, INTERVALS.length - 1),
      step,
      day,
    };
  return next;
}

/** Во сколько раз слово пересидело свой срок: от единицы и выше его пора вернуть. */
function urgency(card: WordCard, step: number, day: number) {
  const wait = INTERVALS[Math.min(card.box, INTERVALS.length - 1)];
  return Math.max(
    (step - card.step) / wait.steps,
    (day - card.day) / wait.days,
  );
}

/**
 * Сравниваем просрочку с интервалом, а не абсолютное ожидание: иначе прочные слова
 * ходили бы по кругу, а новые не доживали бы до первого повторения.
 */
export const dueWords = (cards: Cards, step: number, day: number) =>
  Object.keys(cards)
    .map((word) => ({ word, score: urgency(cards[word], step, day) }))
    .filter(({ score }) => score >= 1)
    .sort((a, b) => b.score - a.score)
    .map(({ word }) => word);

const distinct = (words: string[], dictionary: Dictionary) => {
  const seen = new Set<string>();
  return words.filter((word) => {
    const key = meaning(dictionary[word].ru);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

function makeChallenge(
  kind: RoundKind,
  words: string[],
  dictionary: Dictionary,
): Challenge {
  if (kind !== "write") return { kind, words };
  return {
    kind,
    title: "Память",
    fields: words.map((word, i) => ({
      id: `f${i}`,
      label: dictionary[word].ru,
      // Синоним тоже верный ответ: подпись его не исключает.
      answers: [
        word,
        ...Object.keys(dictionary).filter(
          (other) =>
            other !== word &&
            meaning(dictionary[other].ru) === meaning(dictionary[word].ru),
        ),
      ],
    })),
  };
}

function candidates(kind: RoundKind, pool: string[], dictionary: Dictionary) {
  if (kind === "docks") return pool.filter(isNoun);
  if (kind === "letters") return pool.filter(spellable);
  if (kind === "write") return distinct(pool.filter(typable), dictionary);
  return kind === "gull" ? distinct(pool, dictionary) : pool;
}

const lockRound = (cards: string[], locks: Locks): Round => ({
  words: cards,
  challenge: { kind: "lock", rounds: cards.map((card) => locks[card].round) },
  rules: Object.fromEntries(cards.map((card) => [card, locks[card].rules])),
});

/**
 * Фразы замков берём, когда их очередь подошла вместе со словами той же главы: так грамматика
 * возвращается и не отнимает весь раунд у слов. Если слов не хватает, раунд тоже из фраз.
 * Трудность задаёт самое просроченное слово.
 * Игры чередуются по длине очереди, запасной вариант — чайка, она подходит любому слову.
 */
export function buildRound(
  cards: Cards,
  step: number,
  day: number,
  dictionary: Dictionary,
  locks: Locks = {},
): Round | null {
  const queue = dueWords(cards, step, day);
  const phrases = queue.filter((card) => locks[card]);
  if (
    queue.slice(0, QUEUE_HEAD).filter((card) => locks[card]).length >=
    LOCK_ROUND
  )
    return lockRound(phrases.slice(0, LOCK_ROUND), locks);
  const due = queue.filter((word) => dictionary[word]);
  if (due.length < MIN_ROUND)
    return phrases.length
      ? lockRound(phrases.slice(0, LOCK_ROUND), locks)
      : null;
  const main = level(cards[due[0]].box);
  const same = due.filter((word) => level(cards[word].box) === main);
  const pool = [...same, ...due.filter((word) => !same.includes(word))];
  const ladder = LADDER[main];
  const first = due.length % ladder.length;
  const kinds: RoundKind[] = [
    ...ladder.slice(first),
    ...ladder.slice(0, first),
    "gull",
  ];
  for (const kind of kinds) {
    const words = candidates(kind, pool, dictionary).slice(0, SIZE[kind]);
    if (words.length >= MIN_ROUND)
      return { words, challenge: makeChallenge(kind, words, dictionary) };
  }
  return null;
}

export const timeForRound = (last: Mark, step: number, day: number) =>
  step - last.step >= EVERY || day > last.day;

export function memoryStats(cards: Cards) {
  const entries = Object.entries(cards);
  const words = entries.filter(([key]) => !key.startsWith(LOCK));
  return {
    met: words.length,
    returned: words.filter(([, c]) => c.box >= 1).length,
    firm: words.filter(([, c]) => c.box >= FIRM_BOX).length,
    phrases: entries.filter(([key, c]) => key.startsWith(LOCK) && c.box >= 1)
      .length,
  };
}
