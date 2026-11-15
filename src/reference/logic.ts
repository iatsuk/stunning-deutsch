// Справочник A1: поиск и группировка правил и слов. Данные собирает scripts/a1-index.mjs в
// src/generated/a1-reference.json из тех же источников, что и курс, поэтому справочник не отстаёт.
import type { Word } from "../content.ts";

export type RefWord = Word & { part: string; chapter: number };
export type RefPoint = { id: string; group: string; title: string; about: string; rules: string[]; chapters: number[] };
export type RefChapter = { n: number; title: string; topic: string };
export type Reference = { chapters: RefChapter[]; grammar: RefPoint[]; words: RefWord[] };

/** Текст для поиска: без регистра, умлаутов и ß, чтобы «uber» нашло «über». */
export const fold = (text: string) =>
  text.toLocaleLowerCase("de").normalize("NFD").replace(/\p{M}/gu, "").replace(/ß/g, "ss");

const found = (query: string, texts: (string | null | undefined)[]) => {
  const q = fold(query.trim());
  return !q || texts.some((t) => t && fold(t).includes(q));
};

const bare = (de: string) => de.replace(/^(der|die|das) /, "");

/** Пункты грамматики по группам, в порядке эталона экзамена. */
export function grammarGroups(points: RefPoint[], query: string): { group: string; points: RefPoint[] }[] {
  const groups = new Map<string, RefPoint[]>();
  for (const p of points) if (found(query, [p.title, p.group, p.about])) groups.set(p.group, [...(groups.get(p.group) ?? []), p]);
  return [...groups].map(([group, list]) => ({ group, points: list }));
}

/** Слова по главе, где они впервые встречаются в истории; внутри главы — по алфавиту без артикля. */
export function wordGroups(ref: Reference, query: string): { chapter: RefChapter; words: RefWord[] }[] {
  return ref.chapters
    .map((chapter) => ({
      chapter,
      words: ref.words
        .filter((w) => w.chapter === chapter.n && found(query, [w.de, w.plural, w.ru]))
        .sort((a, b) => bare(a.de).localeCompare(bare(b.de), "de")),
    }))
    .filter((g) => g.words.length);
}

/** Главы короткой строкой: [1, 2, 3, 5, 7] → «1–3, 5, 7». */
export function chapterRange(chapters: number[]): string {
  const sorted = [...new Set(chapters)].sort((a, b) => a - b);
  const parts: string[] = [];
  for (let i = 0; i < sorted.length; i++) {
    let j = i;
    while (sorted[j + 1] === sorted[j] + 1) j++;
    parts.push(j > i ? `${sorted[i]}–${sorted[j]}` : String(sorted[i]));
    i = j;
  }
  return parts.join(", ");
}
