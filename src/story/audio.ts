import recordings from "../generated/story-audio.json";
import dictionary from "../generated/a1-words.json";
import { audioKey } from "./logic";
import type { Dictionary } from "./memory";

const map = recordings as Record<string, string>;
export const a1Words = dictionary as Dictionary;

/** Адрес записи; пока фраза не озвучена, кнопка не показывается. */
export const storyAudio = (text: string, voice?: string) =>
  map[audioKey(text, voice)];

/** Перевод и готовая озвучка слова из словаря уроков A1. */
export const wordInfo = (de: string) => a1Words[de];
