export type Phrase = { ru: string; de: string; note: string };
export type Option = { id: string; text: string; why: string };
export type ChatTurn = {
  say: string;
  ru: string;
  options: Option[];
  answer: string;
};
export type Move = "links" | "geradeaus" | "rechts";
export type VoiceLine = {
  who: string;
  voice: string;
  text: string;
  ru: string;
};
export type Challenge =
  | { kind: "choice"; options: Option[]; answer: string }
  | { kind: "order"; tiles: string[]; answer: string[]; also?: string[][] }
  | {
      kind: "match";
      left: { id: string; text: string }[];
      right: { id: string; text: string }[];
      answer: Record<string, string>;
    }
  | {
      kind: "quantity";
      items: { id: string; text: string; max: number }[];
      answer: Record<string, number>;
    }
  | { kind: "code"; length: number; answer: string }
  | { kind: "chat"; who: string; voice: string; turns: ChatTurn[] }
  | {
      kind: "verdict";
      labels: [string, string];
      items: { id: string; text: string; answer: boolean; why: string }[];
    }
  | { kind: "gaps"; parts: (string | null)[]; bank: string[]; answer: string[] }
  | {
      kind: "sort";
      bins: { id: string; text: string }[];
      cards: { id: string; text: string; icon?: string }[];
      answer: Record<string, string>;
    }
  | { kind: "spot"; title: string; lines: string[][]; answer: string[] }
  | { kind: "memory"; pairs: { id: string; de: string; ru: string }[] }
  | {
      kind: "clock";
      start: string;
      step: number;
      answer: string;
      traps: Record<string, string>;
    }
  | {
      kind: "route";
      width: number;
      height: number;
      start: { x: number; y: number; heading: number };
      places: Record<string, string>;
      goal: string;
      moves: Move[];
    }
  | { kind: "coins"; coins: number[]; answer: number }
  | {
      kind: "write";
      title: string;
      fields: { id: string; label: string; answers: string[] }[];
    }
  | {
      kind: "calendar";
      months: { name: string; days: number }[];
      answer: string;
    };
export type Beat = {
  id: string;
  title: string;
  story: string[];
  source?: { title: string; lines: string[] };
  audio?: { file: string; text: string; ru: string };
  /** Реплики голосом: текст открывается по кнопке. */
  voices?: VoiceLine[];
  /** Выражения, которые возвращаются в конце главы после ошибки на этом шаге. */
  practice?: string[];
  prompt: string;
  hint: string;
  challenge: Challenge;
  success: string;
  clue?: { title: string; text: string };
};
export type Episode = {
  id: string;
  title: string;
  place: string;
  topic: string;
  grammar: string;
  /** Выражения главы для записи на слух в конце главы. */
  review?: string[];
  beats: Beat[];
};
export type Answer = string | string[] | Record<string, string | number>;
export type StorySave = {
  version: 1;
  cursor: number;
  completed: number;
  drafts: Record<string, Answer>;
  support: boolean;
  /** Сколько раз ошибались в выражении; запись на слух убирает его из списка. */
  weak: Record<string, number>;
};
