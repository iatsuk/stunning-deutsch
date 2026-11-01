export type Phrase = { ru: string; de: string; note: string };
export type Option = { id: string; text: string; why: string };
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
  | { kind: "code"; length: number; answer: string };
export type Beat = {
  id: string;
  title: string;
  story: string[];
  source?: { title: string; lines: string[] };
  audio?: { file: string; text: string; ru: string };
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
  beats: Beat[];
};
export type Answer = string | string[] | Record<string, string | number>;
export type StorySave = {
  version: 1;
  cursor: number;
  completed: number;
  drafts: Record<string, Answer>;
  support: boolean;
};
