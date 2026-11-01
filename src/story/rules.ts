// Правила в игре — это фрагменты разбора уроков A1: тот же тезис, объяснение и схема, без
// второй редакции текста. Ссылка записана как «тема/фрагмент»; сборка проверяет её и копирует
// фрагмент в src/generated/story-rules.json. Первым идёт правило, главное для шага.

export const stepRules: Record<string, string[]> = {
  "01-question": ["kennenlernen/wortstellung-1", "kennenlernen/wortstellung-3"],
  "01-x-lock": ["kennenlernen/endungen-1", "kennenlernen/endungen-3"],
  "02-have": ["zahlen/check-3"],
  "02-x-lock": ["zahlen/haben-1"],
  "03-owner": ["familie/wessen-1"],
  "03-x-lock": ["familie/kein-2", "familie/wessen-1"],
  "04-x-lock": ["essen/akkusativ-3", "essen/negation-2"],
  "05-price": ["einkaufen/preise-1"],
  "05-pronoun": ["einkaufen/pronomen-3"],
  "05-x-lock": ["einkaufen/adjektiv-1", "einkaufen/pronomen-3"],
  "06-frame": ["tagesablauf/klammer-2"],
  "06-x-lock": ["tagesablauf/klammer-1", "tagesablauf/wann-1"],
  "07-want": ["freizeit/ende-2"],
  "07-x-lock": ["freizeit/check-2", "freizeit/ende-2"],
  "08-where": ["wohnen/wo-2"],
  "08-case": ["wohnen/wo-1", "wohnen/wo-2"],
  "08-compound": ["wohnen/komposita-1"],
  "08-x-lock": ["wohnen/im-1", "wohnen/wo-1"],
  "09-dativ": ["stadt/mit-1", "stadt/kurz-1"],
  "09-x-lock": ["stadt/imperativ-2", "stadt/kurz-1"],
  "10-modal": ["gesundheit/muessen-4"],
  "10-x-lock": ["gesundheit/muessen-2", "gesundheit/schmerzen-1"],
  "11-perfect": ["arbeit/perfekt-2"],
  "11-x-lock": ["arbeit/perfekt-4", "arbeit/war-hatte-1"],
  "12-perfect": ["reisen/angekommen-2"],
  "12-x-lock": ["reisen/perfekt-1", "reisen/datum-2"],
  "12-finale": ["reisen/perfekt-1"],
};

/** Правила шагов раньше данного: их игрок уже видел. */
export const rulesBefore = (beats: { id: string }[], cursor: number) => [
  ...new Set(beats.slice(0, cursor).flatMap((b) => stepRules[b.id] ?? [])),
];
