import { lockKey } from "./logic.ts";
import type { LockRound, WordCard } from "./types.ts";

// Коробки Лейтнера: слово возвращается по интервалам в шагах и календарных днях.
export type Cards = Record<string, WordCard>;
export type Dictionary = Record<string, { ru: string; audio?: string; pl?: string }>;

export type Interval = { steps: number; days: number };

export const PLURALS = [
  "die Eltern",
  "die Geschwister",
  "die Großeltern",
  "die Möbel",
  "die Nebenkosten",
  "die Ferien",
  "die USA",
];

/** Локальный календарный день: новый день начинается в полночь у игрока. */
export const dayNumber = (now = Date.now()) =>
  Math.floor((now - new Date(now).getTimezoneOffset() * 60_000) / 86_400_000);

/** Фраза замка в памяти: приставка не даёт ей совпасть со словом словаря. */
const LOCK = "lock:";
export const lockCard = (round: LockRound) => `${LOCK}${lockKey(round)}`;

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

/**
 * Итог раунда: слово с ошибкой возвращается в начало, остальные идут дальше. Ошибки копятся в счётчике:
 * единица, пропущенная в двух играх раунда, считается один раз.
 */
export function grade(
  cards: Cards,
  words: string[],
  missed: string[],
  step: number,
  day: number,
  intervals: Interval[],
): Cards {
  const next = { ...cards };
  for (const word of new Set(words)) {
    const wrong = missed.includes(word);
    const miss = (next[word]?.miss ?? 0) + (wrong ? 1 : 0);
    next[word] = {
      box: wrong ? 0 : Math.min((next[word]?.box ?? 0) + 1, intervals.length - 1),
      step,
      day,
      ...(miss ? { miss } : {}),
    };
  }
  return next;
}

/** Во сколько раз слово пересидело свой срок: от единицы и выше его пора вернуть. */
function urgency(card: WordCard, step: number, day: number, intervals: Interval[]) {
  const wait = intervals[Math.min(card.box, intervals.length - 1)];
  return Math.max(
    (step - card.step) / wait.steps,
    (day - card.day) / wait.days,
  );
}

/**
 * Сравниваем просрочку с интервалом, а не абсолютное ожидание: иначе прочные слова
 * ходили бы по кругу, а новые не доживали бы до первого повторения.
 */
export const dueWords = (cards: Cards, step: number, day: number, intervals: Interval[]) =>
  Object.keys(cards)
    .map((word) => ({ word, score: urgency(cards[word], step, day, intervals) }))
    .filter(({ score }) => score >= 1)
    .sort((a, b) => b.score - a.score)
    .map(({ word }) => word);
