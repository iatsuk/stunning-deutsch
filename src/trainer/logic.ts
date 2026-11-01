import { plain } from "../lib/german.ts";

export const normalize = (text: string) => plain(text).replace(/[.!?,;:]+$/g, "").replace(/\s+/g, " ").trim();

/** Плитки заданы вместе с запятыми, поэтому запятые не влияют на проверку порядка слов. */
const bare = (text: string) => normalize(text).replace(/,/g, "").toLowerCase();

/** Регистр сравнивать незачем: плитки даны, их можно только переставлять. */
export const orderAccepted = (tiles: string[], accepted: string[]) =>
  accepted.some((sentence) => bare(sentence) === bare(tiles.join(" ")));
