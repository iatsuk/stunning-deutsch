import recordings from "../generated/story-audio.json";
import dictionary from "../generated/a1-words.json";
import { phrases } from "./data";
import { audioKey, spoken } from "./logic";
import type { Dictionary } from "./memory";

const map = recordings as Record<string, string>;
export const a1Words = dictionary as Dictionary;

/** Адрес записи; пока фраза не озвучена, кнопка не показывается. */
export const storyAudio = (text: string, voice?: string) =>
  map[audioKey(text, voice)];

/** Запись выражения истории: у существительного звучит и множественное. */
export const phraseAudio = (p: { de: string; pl?: string }) => storyAudio(spoken(p));

const phraseByDe = new Map(Object.values(phrases).map((p) => [p.de, p]));
/**
 * Перевод и готовая озвучка слова для игр со словами: из словаря уроков A1, иначе — выражения
 * истории. Так в лото и причалы попадают слова экзамена, которых нет в уроках (A1-PLAN.md).
 */
export const wordInfo = (de: string) => {
  const p = a1Words[de] ? undefined : phraseByDe.get(de);
  return a1Words[de] ?? (p ? { ru: p.ru, audio: phraseAudio(p), ...(p.pl && p.pl !== "pl" ? { pl: p.pl } : {}) } : undefined);
};

/** Все слова с переводом для игр: словарь уроков и выражения истории. */
export const allWords = (): string[] => [...Object.keys(a1Words), ...[...phraseByDe.keys()].filter((de) => !a1Words[de])];

/** Запись слова: из словаря уроков, иначе — выражения истории с тем же немецким. */
export const nounAudio = (de: string) => {
  const p = Object.values(phrases).find((x) => x.de === de);
  return wordInfo(de)?.audio ?? (p ? phraseAudio(p) : storyAudio(de));
};
