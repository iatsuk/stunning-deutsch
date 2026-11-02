import { plain } from "../lib/german.ts";

export const UMLAUTS = ["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"];

/** Акцент заимствований (Café) есть не на каждой клавиатуре: снимаем его, умлауты и ß оставляем. */
const accents = (text: string) => text.normalize("NFD").replace(/[\u0300-\u0302\u0327]/g, "").normalize("NFC");

export const normalize = (text: string) =>
  accents(plain(text)).replace(/[.!?,;:]+$/g, "").replace(/\s+/g, " ").trim();

const deUmlaut = (text: string) =>
  text.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/Ä/g, "Ae").replace(/Ö/g, "Oe").replace(/Ü/g, "Ue");

/** Сравнение ответа: точно, с точностью до регистра или до записи умлаутов. */
export function judge(input: string, accepted: string[]): "right" | "case" | "umlaut" | "wrong" {
  const value = normalize(input);
  const options = accepted.map(normalize);
  if (options.includes(value)) return "right";
  if (options.some((o) => o.toLowerCase() === value.toLowerCase())) return "case";
  if (options.some((o) => deUmlaut(o).toLowerCase() === deUmlaut(value).toLowerCase())) return "umlaut";
  return "wrong";
}

/** Слова ответа, которые написаны с другим регистром или без умлаута: их и называем в подсказке. */
export function nearMisses(input: string, accepted: string[]): string[] {
  const words = normalize(input).split(" ");
  const loose = (word: string) => deUmlaut(word).toLowerCase();
  for (const answer of accepted) {
    const target = normalize(answer).split(" ");
    if (target.length === words.length && target.every((w, i) => loose(w) === loose(words[i])))
      return target.filter((w, i) => w !== words[i]);
  }
  return [];
}

/** Плитки заданы вместе с запятыми, поэтому запятые не влияют на проверку порядка слов. */
const bare = (text: string) => normalize(text).replace(/,/g, "").toLowerCase();

/** Регистр сравнивать незачем: плитки даны, их можно только переставлять. */
export const orderAccepted = (tiles: string[], accepted: string[]) =>
  accepted.some((sentence) => bare(sentence) === bare(tiles.join(" ")));
