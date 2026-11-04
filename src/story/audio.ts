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

/** Перевод и готовая озвучка слова из словаря уроков A1. */
export const wordInfo = (de: string) => a1Words[de];

/** Запись выражения истории: у существительного звучит и множественное. */
export const phraseAudio = (p: { de: string; pl?: string }) => storyAudio(spoken(p));

/** Запись слова: из словаря уроков, иначе — выражения истории с тем же немецким. */
export const nounAudio = (de: string) => {
  const p = Object.values(phrases).find((x) => x.de === de);
  return wordInfo(de)?.audio ?? (p ? phraseAudio(p) : storyAudio(de));
};
