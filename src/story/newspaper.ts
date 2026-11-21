// Газета Kieler Woche: личная полоса после главы 12. Заголовки выбираются по состоянию мира — что игрок
// сделал с чайкой, слухами Фрауке и просьбами героев. Читает их репортёр из главы 4, его голосом.
import type { World } from "./world.ts";

/** Голос репортёра (src/story/scenes/04.ts). */
export const REPORTER = "Eddy";
export type Headline = { de: string; ru: string };
/** Заметка о линии мира: «да» — значение не меньше min, иначе «нет». */
type Story = { q: string; min: number; yes: Headline; no: Headline };

export const FRONT: Headline = {
  de: "Das Schild ist wieder da! Der Club feiert hundert Jahre.",
  ru: "Табличка снова на месте! Клуб празднует сто лет.",
};

const STORIES: Story[] = [
  {
    q: "gull",
    min: 2,
    yes: { de: "Die Möwe nimmt am Hafen alles: Kuchen, Tee und Fisch!", ru: "Чайка в гавани берёт всё: торт, чай и рыбу!" },
    no: { de: "Die Möwen am Club sind ruhig. Brot bekommen sie nicht.", ru: "Чайки у клуба спокойны. Хлеба им не дают." },
  },
  {
    q: "rumours",
    min: 3,
    yes: { de: "Am Kiosk hört man viel. Aber ist alles richtig?", ru: "У киоска многое слышно. Но всё ли правда?" },
    no: { de: "Der Kiosk schreibt alles ins Journal. Wer, was, wo!", ru: "Киоск записывает всё в журнал: кто, что, где!" },
  },
  {
    q: "frauke",
    min: 2,
    yes: { de: "Frauke vom Kiosk: Das Team vom Club? Meine Freunde!", ru: "Фрауке из киоска: команда клуба? Мои друзья!" },
    no: { de: "Frauke vom Kiosk: Das Team vom Club? Ich kenne es nicht gut.", ru: "Фрауке из киоска: команда клуба? Я её плохо знаю." },
  },
  {
    q: "nils",
    min: 1,
    yes: { de: "Nils hat jetzt eine Brille. Er sieht alles!", ru: "У Нильса теперь есть очки. Он видит всё!" },
    no: { de: "Nils sucht noch seine Brille.", ru: "Нильс всё ещё ищет свои очки." },
  },
  {
    q: "petersen",
    min: 2,
    yes: { de: "Frau Petersen: Alle Formulare sind fertig!", ru: "Фрау Петерсен: все формуляры готовы!" },
    no: { de: "Frau Petersen hat viel Arbeit. Das Formular ist noch nicht fertig.", ru: "У фрау Петерсен много работы. Формуляр ещё не готов." },
  },
];

/** Полоса игрока: первая новость у всех одна, остальные — по тому, как прошло его дело. */
export function newspaper(world: World): Headline[] {
  return [FRONT, ...STORIES.map((s) => ((world[s.q] ?? 0) >= s.min ? s.yes : s.no))];
}

/** Все строки газеты с голосом: их связывает с записями сборка. */
export const newspaperLines = () =>
  [FRONT, ...STORIES.flatMap((s) => [s.yes, s.no])].map((h) => ({ text: h.de, voice: REPORTER }));
