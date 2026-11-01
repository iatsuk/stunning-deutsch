import { plain } from "../lib/german.ts";
import { beatPhrases, challengeWords } from "./logic.ts";
import type { Beat, Challenge, Mark, WordCard } from "./types.ts";

// Память слов: коробки Лейтнера с двумя часами. Слово возвращается через заданное число шагов
// истории или дней, смотря что наступит раньше. Шаги работают, пока игрок проходит много за раз,
// дни — когда он сделал перерыв или уже закончил историю.

export type Cards = Record<string, WordCard>;
export type Dictionary = Record<string, { ru: string; audio?: string }>;
export type Round = { words: string[]; challenge: Challenge };

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

/** Слова шага, которые есть в словаре уроков: у них есть перевод и запись. */
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
  ].filter((word) => dictionary[word]);
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

/**
 * Трудность задаёт самое просроченное слово.
 * Игры чередуются по длине очереди, запасной вариант — чайка, она подходит любому слову.
 */
export function buildRound(
  cards: Cards,
  step: number,
  day: number,
  dictionary: Dictionary,
): Round | null {
  const due = dueWords(cards, step, day).filter((word) => dictionary[word]);
  if (due.length < MIN_ROUND) return null;
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

export const memoryStats = (cards: Cards) => ({
  met: Object.keys(cards).length,
  returned: Object.values(cards).filter((c) => c.box >= 1).length,
  firm: Object.values(cards).filter((c) => c.box >= FIRM_BOX).length,
});
