// Портреты героев у реплик. У главных героев три выражения — спокойное, радостное и встревоженное;
// выражение реплики задаёт разметка MOODS, без неё лицо спокойное. У Йенсена лицо не меняется, кроме
// едва заметной улыбки в финале: это шутка истории. Объявления, радио и случайные прохожие без портрета.
import { MOODS, type Mood } from "./moods.ts";

const ALL: ("neutral" | Mood)[] = ["neutral", "glad", "worried"];

/** Говорящий в репликах → файл портрета в public/story-img/faces/ и нарисованные выражения. */
export const FACES: { who: string; file: string; moods: ("neutral" | Mood)[] }[] = [
  { who: "Hauke", file: "hauke", moods: ALL },
  { who: "Elif", file: "elif", moods: ALL },
  { who: "Dana", file: "dana", moods: ALL },
  { who: "Frau Petersen", file: "petersen", moods: ALL },
  { who: "Mateo", file: "mateo", moods: ALL },
  { who: "Frauke", file: "frauke", moods: ALL },
  { who: "Herr Jensen", file: "jensen", moods: ["neutral", "glad"] },
  { who: "Frau Kruse", file: "kruse", moods: ALL },
  { who: "die Möwe", file: "gull", moods: ALL },
  { who: "Derya", file: "derya", moods: ALL },
  { who: "Frau Claasen", file: "claasen", moods: ALL },
  { who: "Frau Brandt", file: "brandt", moods: ALL },
  { who: "Nils", file: "nils", moods: ALL },
  { who: "Frau Yilmaz", file: "yilmaz", moods: ALL },
  { who: "Luca", file: "luca", moods: ALL },
  { who: "Herr Wulff", file: "wulff", moods: ALL },
];

/** «Mateo am Telefon» и «Nils, Nachricht» — тот же герой. */
const speaker = (who: string) =>
  FACES.find((f) => who === f.who || who.startsWith(`${f.who} `) || who.startsWith(`${f.who},`));

/** Портрет к реплике: путь от корня сайта или ничего, если у говорящего портрета нет. */
export function face(who: string, de: string): string | undefined {
  const hero = speaker(who);
  if (!hero) return undefined;
  const mood = MOODS[`${who}|${de}`] ?? "neutral";
  return `story-img/faces/${hero.file}-${hero.moods.includes(mood) ? mood : "neutral"}.jpg`;
}
