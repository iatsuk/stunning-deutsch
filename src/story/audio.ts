import recordings from "../generated/story-audio.json";
import dictionary from "../generated/a1-words.json";
import { audioKey } from "./logic";

const map = recordings as Record<string, string>;
const words = dictionary as Record<string, { ru: string; audio?: string }>;

/** Адрес записи; пока фраза не озвучена, кнопка не показывается. */
export const storyAudio = (text: string, voice?: string) =>
  map[audioKey(text, voice)];

/** Перевод и готовая озвучка слова из словаря уроков A1. */
export const wordInfo = (de: string) => words[de];
