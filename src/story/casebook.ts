// Блокнот на всё дело: улики и предметы всех пройденных глав и досье героев. Досье собирается из
// реплик, которые игрок уже услышал: у них есть записи, поэтому новой озвучки оно не требует.
import { keyOf, nodeAt } from "./scene.ts";
import type { Episode, SceneNode } from "./types.ts";

type Say = Extract<SceneNode, { t: "say" }>;
export type Note = Extract<SceneNode, { t: "clue" } | { t: "item" }>;
export type Fact = { de: string; ru: string; voice: string };

/**
 * Герои досье и реплики о них в порядке истории. Реплику может сказать кто угодно: факт о Йенсене
 * говорит Хауке, плакат Лотты читает вслух Элиф. Догадки и слухи сюда не берём — только то, что правда.
 */
export const HEROES: { name: string; facts: string[] }[] = [
  {
    name: "Хауке",
    facts: [
      "Ich studiere hier in Kiel.",
      "Ich bin müde. Morgen stehe ich um sieben auf, ich dusche, ich frühstücke – und dann Kaffee!",
      "Ich bin nicht arbeitslos – ich bin Student! Aber ohne Arbeit kein Geld.",
    ],
  },
  {
    name: "Йенсен",
    facts: [
      "Die Karten! Der, die, das – das ist Jensens System.",
      "Herr Jensen trinkt nur Tee. Aber Herr Jensen geht nie ins Café. Nie!",
      "Herr Jensen kauft keine Farbe. Er kauft nur Tee!",
      "Ich kann nicht. Ich will segeln.",
    ],
  },
  {
    name: "Матео",
    facts: [
      "Ich bin Mateo. Ich komme aus Argentinien.",
      "Ich wohne in Holtenau.",
      "Das ist Oma Hansens Rezept. Ihr Kuchen ist super. Mein Kuchen ist … auch super!",
      "Ich mag Fisch! Und ich koche gern Fisch!",
    ],
  },
  {
    name: "Элиф",
    facts: [
      "Ich komme aus der Türkei, aus Izmir. Ich wohne in Kiel.",
      "Ich würde gern mitkommen! Aber ich kann nicht segeln.",
      "Entschuldigung! Ich war bei der Post. Ein Brief nach Helgoland – für die Möwe!",
    ],
  },
  {
    name: "Дана",
    facts: [
      "Ich komme aus Kasachstan. Aber ich wohne jetzt hier in Kiel, in Gaarden.",
      "Ich arbeite heute im Krankenhaus – bis zwei. Um drei bin ich bei der Post in Gaarden!",
    ],
  },
  {
    name: "Фрау Петерсен",
    facts: [
      "Petersen, Büro, Club Kiellinie, Moin! Wer ist da? Hallo?",
      "Zehn Minuten bei Frau Petersen? Das sind zwanzig.",
      "Ich habe auch ein Foto. Das ist meine Tochter!",
    ],
  },
  {
    name: "Лотта и Крюмель",
    facts: [
      "Das ist meine Mutter. Sie ist im Club. Und das ist mein Hund Krümel.",
      "Lotte hat keine Geschwister. Aber sie hat Krümel!",
    ],
  },
  {
    name: "Нильс",
    facts: [
      "Hallo! Hier ist Nils, Nils Hansen aus Hamburg! Ich habe jetzt Pause. Bitte Ihre Nummer und Ihre Frage! Tschüss! Nein: Auf Wiederhören!",
      "Nils hat zwei Handys? Diagnose: Er spricht viel!",
    ],
  },
  {
    name: "Грета",
    facts: [
      "Greta hat Farbe. Diagnose: Sie malt!",
      "Greta ist die Enkelin. Nils ist der Enkel. Und Peter ist ihr Vater.",
      "Und Greta bringt immer alles zurück. Gestern – den zweiten Schlüssel vom Keller!",
    ],
  },
  {
    name: "Опа Хансен",
    facts: [
      "Heinrich Hansen: verheiratet, ein Sohn. Seine Frau ist Hilde.",
      "Neunzig! Alles Gute, Opa Hansen!",
      "Ich bleibe für zwei Nächte. Ab Montag bin ich wieder in Hamburg.",
    ],
  },
  {
    name: "Фрауке",
    facts: [
      "Kein Problem! Ich habe ein Auto! … Also, Frauke hat ein Auto.",
    ],
  },
  {
    name: "Чайка",
    facts: [
      "Ich bin die Möwe.",
      "Ich wohne hier. Das ist mein Hafen.",
      "Ich habe eine Nummer! Ich bin Ha – E – El, sieben, drei, null, fünf.",
      "Möwen werden nicht krank. Sie braucht kein Rezept!",
    ],
  },
];

/** Пройденные узлы по главам: ответы сцены хранят ключи узлов, через которые прошёл игрок. */
function passedNodes(chapters: Episode[], drafts: Record<string, string[]>): SceneNode[][] {
  return chapters.map((chapter) =>
    chapter.beats.flatMap((beat) => {
      const c = beat.challenge;
      if (c.kind !== "play") return [];
      return (drafts[beat.id] ?? []).flatMap((entry) => {
        const node = nodeAt(c.nodes, keyOf(entry));
        return node ? [node] : [];
      });
    }),
  );
}

/** Улики и предметы по главам (номера с 1); главы, где ещё ничего не найдено, пропущены. */
export function caseNotes(chapters: Episode[], drafts: Record<string, string[]>) {
  return passedNodes(chapters, drafts)
    .map((nodes, i) => ({ chapter: i + 1, notes: nodes.filter((n): n is Note => n.t === "clue" || n.t === "item") }))
    .filter((group) => group.notes.length);
}

/** Досье: у каждого героя — факты, которые игрок уже услышал; герои без фактов пропущены. */
export function dossier(chapters: Episode[], drafts: Record<string, string[]>) {
  const heard = new Map<string, Say>();
  for (const nodes of passedNodes(chapters, drafts))
    for (const node of nodes) if (node.t === "say") heard.set(node.de, node);
  return HEROES.map((hero) => ({
    name: hero.name,
    facts: hero.facts.flatMap((de): Fact[] => {
      const say = heard.get(de);
      return say ? [{ de: say.de, ru: say.ru, voice: say.voice }] : [];
    }),
  })).filter((hero) => hero.facts.length);
}
