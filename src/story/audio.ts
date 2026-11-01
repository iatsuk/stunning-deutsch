import recordings from "../generated/story-audio.json";
import { audioKey } from "./logic";

const map = recordings as Record<string, string>;

/** Адрес записи; пока фраза не озвучена, кнопка не показывается. */
export const storyAudio = (text: string, voice?: string) =>
  map[audioKey(text, voice)];
