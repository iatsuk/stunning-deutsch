/** Карта Киля на главной: каждое место ведёт в свою часть курса, место будущего уровня закрыто, пока уровень не открыт. */

type Base = {
  id: string;
  de: string;
  ru: string;
  text: string;
  /** Метка на картинке `public/home/kiel-map.jpg`, в процентах её ширины и высоты. */
  x: number;
  y: number;
};

type Place = Base & ({ href: string } | { level: string; soon: string });

export type MapPin = Base & ({ href: string } | { soon: string });

export const PLACES: Place[] = [
  { id: "bahnhof", de: "der Hauptbahnhof", ru: "Вокзал", x: 24, y: 84, href: "#/a1/moin",
    text: "Начало курса A1. Вы приезжаете в Киль, а из клуба пропадает табличка MOIN." },
  { id: "club", de: "der Club", ru: "Стол клуба", x: 26, y: 25, href: "#/a1/moin/training",
    text: "Тренировка: игры, слова и фразы из сцен, которые вы прошли. До первых сцен откроется начало курса." },
  { id: "buero", de: "das Büro", ru: "Офис клуба", x: 33.5, y: 27, href: "#/a1/a1-mock",
    text: "Пробник Start Deutsch 1: все четыре части экзамена." },
  { id: "kiosk", de: "der Kiosk", ru: "Киоск Фрауке", x: 28, y: 40, href: "#/a1/reference",
    text: "Справочник A1: слова и правила курса по главам." },
  { id: "anleger", de: "der Anleger", ru: "Паромный причал", x: 48.5, y: 17, level: "a2", soon: "пишется",
    text: "Сезон A2: паром на Хельголанд и новое дело клуба." },
  { id: "uni", de: "die Universität", ru: "Университет", x: 22.5, y: 14, level: "b1", soon: "позже",
    text: "B1 в формате истории." },
];

/** Места карты при данных уровнях: место уровня ведёт на его страницу, только когда уровень открыт, как в лестнице уровней. */
export function mapPins(levels: { id: string; status: string }[]): MapPin[] {
  return PLACES.map((place) => {
    if ("href" in place) return place;
    const { level, soon, ...base } = place;
    const open = levels.some((l) => l.id === level && l.status === "open");
    return open ? { ...base, href: `#/${level}` } : { ...base, soon };
  });
}
