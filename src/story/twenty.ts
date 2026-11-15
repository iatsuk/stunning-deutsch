import type { Challenge } from "./types";

// «20 вопросов» (A1-PLOT.md, «Новые мини-игры»; A1-PLAN.md, «Повторение»): одна игра для сцен и для
// раундов повторения. Колоды — единственный источник признаков. У вопроса два списка, «да» и «нет»;
// карточка не из списков — ответ неизвестен игроку, и этот вопрос её не исключает. Признак ставится,
// только если игрок видел его в истории или он бесспорен.

export type TwentyCard = { id: string; de: string; icon: string; unit?: string };
export type TwentyQuestion = { de: string; ru: string; yes: string[]; no: string[] };
type Deck = { cards: TwentyCard[]; questions: TwentyQuestion[] };
export type Twenty = Extract<Challenge, { kind: "twenty" }>;

/** Ответ на вопрос за загаданную карточку: true, false или undefined, если он неизвестен. */
export function answerOf(q: TwentyQuestion, card: string): boolean | undefined {
  if (q.yes.includes(card)) return true;
  if (q.no.includes(card)) return false;
  return undefined;
}

/** Исключает ли ответ на вопрос карточку: её ответ известен и не совпадает с ответом загаданной. */
export function excludes(c: Pick<Twenty, "questions" | "answer">, question: number, card: string): boolean {
  const q = c.questions[question];
  const mine = answerOf(q, card);
  return card !== c.answer && mine !== undefined && mine !== answerOf(q, c.answer);
}

const others = (all: string[], yes: string[]) => all.filter((id) => !yes.includes(id));

const CLUB_IDS = ["elif", "dana", "mateo", "nils", "jensen", "frauke"];
const POSTER_IDS = ["kerstin", "jan", "mia", "inge", "klaus", "kruemel"];
const HOBBY_IDS = ["tennis", "fussball", "schwimmen", "segeln", "kochen", "lesen", "tanzen", "kino", "fotografieren"];
const THING_IDS = ["hund", "katze", "kuchen", "apfel", "jacke", "hose", "schuh", "fahrrad", "bus", "zug", "boot", "tisch", "stuhl", "schrank", "handy", "buch", "schluessel"];

export const DECKS = {
  // Глава 1: что игрок узнал о героях в первый день. Происхождение Йенсена и Фрауке не названо.
  club: {
    cards: [
      { id: "elif", de: "Elif", icon: "🔭" },
      { id: "dana", de: "Dana", icon: "🩺" },
      { id: "mateo", de: "Mateo", icon: "☕" },
      { id: "nils", de: "Nils", icon: "📱" },
      { id: "jensen", de: "Herr Jensen", icon: "🧢" },
      { id: "frauke", de: "Frauke", icon: "🐟" },
    ],
    questions: [
      { de: "Bist du ein Mann?", ru: "Ты мужчина?", yes: ["mateo", "nils", "jensen"], no: ["elif", "dana", "frauke"] },
      { de: "Kommst du aus Hamburg?", ru: "Ты из Гамбурга?", yes: ["nils"], no: ["elif", "dana", "mateo"] },
      { de: "Kommst du aus Argentinien?", ru: "Ты из Аргентины?", yes: ["mateo"], no: ["elif", "dana", "nils"] },
      { de: "Wohnst du in Gaarden?", ru: "Ты живёшь в Гаардене?", yes: ["dana"], no: ["mateo", "nils"] },
      { de: "Sagst du nur Moin?", ru: "Ты говоришь только «Moin»?", yes: ["jensen"], no: others(CLUB_IDS, ["jensen"]) },
      { de: "Arbeitest du am Kiosk?", ru: "Ты работаешь в киоске?", yes: ["frauke"], no: others(CLUB_IDS, ["frauke"]) },
    ],
  },
  // Глава 3: плакат Лотты «Meine Familie» и дерево по нему. Кузине Мие пять лет.
  poster: {
    cards: [
      { id: "kerstin", de: "Kerstin", icon: "👩" },
      { id: "jan", de: "Jan", icon: "👨" },
      { id: "mia", de: "Mia", icon: "👧" },
      { id: "inge", de: "Inge", icon: "👵" },
      { id: "klaus", de: "Klaus", icon: "👴" },
      { id: "kruemel", de: "Krümel", icon: "🐕" },
    ],
    questions: [
      { de: "Bist du ein Mann?", ru: "Ты мужчина?", yes: ["jan", "klaus"], no: ["kerstin", "mia", "inge"] },
      { de: "Bist du ein Kind?", ru: "Ты ребёнок?", yes: ["mia"], no: ["kerstin", "jan", "inge", "klaus"] },
      { de: "Hast du Kinder?", ru: "У тебя есть дети?", yes: ["kerstin", "jan", "inge", "klaus"], no: ["mia"] },
      { de: "Hast du Enkel?", ru: "У тебя есть внуки?", yes: ["inge", "klaus"], no: ["kerstin", "jan", "mia"] },
      { de: "Hast du eine Schwester?", ru: "У тебя есть сестра?", yes: ["jan"], no: [] },
      { de: "Bist du ein Hund?", ru: "Ты собака?", yes: ["kruemel"], no: others(POSTER_IDS, ["kruemel"]) },
    ],
  },
  // Глава 7 и повторение: хобби — слова урока 7.
  hobbies: {
    cards: [
      { id: "tennis", de: "Tennis spielen", icon: "🎾", unit: "Tennis spielen" },
      { id: "fussball", de: "Fußball spielen", icon: "⚽", unit: "Fußball spielen" },
      { id: "schwimmen", de: "schwimmen", icon: "🏊", unit: "schwimmen" },
      { id: "segeln", de: "segeln", icon: "⛵", unit: "segeln" },
      { id: "kochen", de: "kochen", icon: "🍳", unit: "kochen" },
      { id: "lesen", de: "lesen", icon: "📖", unit: "lesen" },
      { id: "tanzen", de: "tanzen", icon: "💃", unit: "tanzen" },
      { id: "kino", de: "ins Kino gehen", icon: "🎬", unit: "ins Kino gehen" },
      { id: "fotografieren", de: "fotografieren", icon: "📷", unit: "fotografieren" },
    ],
    questions: [
      { de: "Spielt man das mit einem Ball?", ru: "В это играют с мячом?", yes: ["tennis", "fussball"], no: others(HOBBY_IDS, ["tennis", "fussball"]) },
      { de: "Spielt man das mit den Füßen?", ru: "В это играют ногами?", yes: ["fussball"], no: others(HOBBY_IDS, ["fussball"]) },
      { de: "Macht man das im Wasser?", ru: "Это делают в воде?", yes: ["schwimmen"], no: ["tennis", "fussball", "kochen", "lesen", "tanzen", "kino", "fotografieren"] },
      { de: "Braucht man ein Boot?", ru: "Нужна лодка?", yes: ["segeln"], no: others(HOBBY_IDS, ["segeln"]) },
      { de: "Macht man das in der Küche?", ru: "Это делают на кухне?", yes: ["kochen"], no: ["tennis", "fussball", "schwimmen", "segeln", "tanzen", "kino"] },
      { de: "Braucht man ein Buch?", ru: "Нужна книга?", yes: ["lesen"], no: ["tennis", "fussball", "schwimmen", "segeln", "tanzen", "kino", "fotografieren"] },
      { de: "Braucht man Musik?", ru: "Нужна музыка?", yes: ["tanzen"], no: ["tennis", "fussball", "schwimmen", "segeln", "kochen", "lesen", "fotografieren"] },
      { de: "Sieht man einen Film?", ru: "Смотрят фильм?", yes: ["kino"], no: others(HOBBY_IDS, ["kino"]) },
      { de: "Macht man Fotos?", ru: "Делают фотографии?", yes: ["fotografieren"], no: ["tennis", "fussball", "schwimmen", "kochen", "lesen", "tanzen", "kino"] },
    ],
  },
  // Только повторение: вещи из уроков с бесспорными признаками.
  things: {
    cards: [
      { id: "hund", de: "der Hund", icon: "🐕", unit: "der Hund" },
      { id: "katze", de: "die Katze", icon: "🐈", unit: "die Katze" },
      { id: "kuchen", de: "der Kuchen", icon: "🍰", unit: "der Kuchen" },
      { id: "apfel", de: "der Apfel", icon: "🍎", unit: "der Apfel" },
      { id: "jacke", de: "die Jacke", icon: "🧥", unit: "die Jacke" },
      { id: "hose", de: "die Hose", icon: "👖", unit: "die Hose" },
      { id: "schuh", de: "der Schuh", icon: "👞", unit: "der Schuh" },
      { id: "fahrrad", de: "das Fahrrad", icon: "🚲", unit: "das Fahrrad" },
      { id: "bus", de: "der Bus", icon: "🚌", unit: "der Bus" },
      { id: "zug", de: "der Zug", icon: "🚆", unit: "der Zug" },
      { id: "boot", de: "das Boot", icon: "⛵", unit: "das Boot" },
      { id: "tisch", de: "der Tisch", icon: "🪵", unit: "der Tisch" },
      { id: "stuhl", de: "der Stuhl", icon: "🪑", unit: "der Stuhl" },
      { id: "schrank", de: "der Schrank", icon: "🚪", unit: "der Schrank" },
      { id: "handy", de: "das Handy", icon: "📱", unit: "das Handy" },
      { id: "buch", de: "das Buch", icon: "📖", unit: "das Buch" },
      { id: "schluessel", de: "der Schlüssel", icon: "🔑", unit: "der Schlüssel" },
    ],
    questions: [
      { de: "Ist es ein Tier?", ru: "Это животное?", yes: ["hund", "katze"], no: others(THING_IDS, ["hund", "katze"]) },
      { de: "Geht man mit ihm spazieren?", ru: "С ним гуляют?", yes: ["hund"], no: others(THING_IDS, ["hund"]) },
      { de: "Kann man es essen?", ru: "Это можно есть?", yes: ["kuchen", "apfel"], no: others(THING_IDS, ["kuchen", "apfel"]) },
      { de: "Ist es Obst?", ru: "Это фрукт?", yes: ["apfel"], no: others(THING_IDS, ["apfel"]) },
      { de: "Kann man es anziehen?", ru: "Это можно надеть?", yes: ["jacke", "hose", "schuh"], no: others(THING_IDS, ["jacke", "hose", "schuh"]) },
      { de: "Trägt man es an den Füßen?", ru: "Это носят на ступнях, как обувь?", yes: ["schuh"], no: others(THING_IDS, ["schuh"]) },
      { de: "Trägt man es an den Beinen?", ru: "Это надевают на ноги до пояса?", yes: ["hose"], no: others(THING_IDS, ["hose"]) },
      { de: "Kann man mit ihm fahren?", ru: "На этом можно ехать?", yes: ["fahrrad", "bus", "zug", "boot"], no: others(THING_IDS, ["fahrrad", "bus", "zug", "boot"]) },
      { de: "Fährt es auf dem Wasser?", ru: "Это ходит по воде?", yes: ["boot"], no: others(THING_IDS, ["boot"]) },
      { de: "Fährt es auf der Straße?", ru: "Это ездит по улице?", yes: ["fahrrad", "bus"], no: ["zug", "boot"] },
      { de: "Braucht man eine Fahrkarte?", ru: "Нужен билет?", yes: ["bus", "zug"], no: ["fahrrad"] },
      { de: "Gehört es zu den Möbeln?", ru: "Это мебель?", yes: ["tisch", "stuhl", "schrank"], no: others(THING_IDS, ["tisch", "stuhl", "schrank"]) },
      { de: "Sitzt man auf ihm?", ru: "На нём сидят?", yes: ["stuhl", "fahrrad"], no: ["tisch", "schrank", "bus", "zug"] },
      { de: "Isst man an ihm?", ru: "За ним едят?", yes: ["tisch"], no: ["stuhl", "schrank"] },
      { de: "Kann man mit ihm telefonieren?", ru: "По нему можно звонить?", yes: ["handy"], no: others(THING_IDS, ["handy"]) },
      { de: "Ist es aus Papier?", ru: "Это из бумаги?", yes: ["buch"], no: others(THING_IDS, ["buch"]) },
      { de: "Braucht man es für die Tür?", ru: "Это нужно для двери?", yes: ["schluessel"], no: others(THING_IDS, ["schluessel"]) },
    ],
  },
} satisfies Record<string, Deck>;

export type DeckName = keyof typeof DECKS;

/** Вопросы, которые позволяют исключить всех, кроме загаданной: набор игры в сцене или в раунде. */
function usable(deck: Deck, ids: string[], answer: string): TwentyQuestion[] {
  return deck.questions.filter((q) => answerOf(q, answer) !== undefined && ids.some((id) => excludes({ questions: [q], answer }, 0, id)));
}

/** Игра для сцены: колода, карточки на столе, загаданная, кто загадывает и его голос. */
export function twenty(deck: DeckName, ids: string[], answer: string, who: string, voice: string): Twenty {
  const d = DECKS[deck];
  return {
    kind: "twenty",
    who,
    voice,
    cards: ids.map((id) => d.cards.find((c) => c.id === id)!),
    questions: usable(d, ids, answer),
    answer,
  };
}

/** Колоды раундов повторения: их карточки — слова уроков, загадывает Элиф. */
export const REVIEW_DECKS: DeckName[] = ["hobbies", "things"];
export const REVIEW_HOST = { who: "Elif", voice: "Flo" };

/**
 * Игра для раунда повторения: загаданная — первая единица пула с карточкой в колоде повторения,
 * на столе — до шести встреченных карточек той же колоды, сначала тоже ждущие повторения. Карточка,
 * которую нечем отличить от загаданной, на стол не идёт.
 */
export function reviewTwenty(pool: string[], met: (unit: string) => boolean): Twenty | null {
  for (const unit of pool) {
    for (const name of REVIEW_DECKS) {
      const deck: Deck = DECKS[name];
      const target = deck.cards.find((c) => c.unit === unit);
      if (!target) continue;
      const known = deck.cards.filter((c) => c.id !== target.id && c.unit && met(c.unit));
      const ranked = [...known.filter((c) => pool.includes(c.unit!)), ...known.filter((c) => !pool.includes(c.unit!))];
      const table = [target.id];
      for (const c of ranked) {
        if (table.length === 6) break;
        if (usable(deck, [c.id], target.id).length) table.push(c.id);
      }
      if (table.length < 4) continue;
      return twenty(name, table, target.id, REVIEW_HOST.who, REVIEW_HOST.voice);
    }
  }
  return null;
}

/** Озвучка раундов повторения: вопросы колод голосом рассказчика и ответы Элиф. */
export const reviewTwentyLines = (narrator: string) => [
  ...REVIEW_DECKS.flatMap((name) => DECKS[name].questions.map((q) => ({ text: q.de, voice: narrator }))),
  { text: "Ja.", voice: REVIEW_HOST.voice },
  { text: "Nein.", voice: REVIEW_HOST.voice },
];
