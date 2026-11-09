import type { Table } from "../../content.ts";

// Правила новой версии Moin, которых нет в уроках A1. Экзамен A1 ждёт эту грамматику, а классические
// уроки её не дают; по решению автора её добавляет только прототип сцен, уроки не меняются (раздел
// «Модальные глаголы в новой версии» в A1-PLOT.md). Формат — как у фрагмента урока с таблицей:
// сборка кладёт правило в src/generated/story-rules.json рядом с фрагментами уроков. chapter —
// первая глава сцен, где правило можно использовать; основная игра эти правила не берёт.

export type SceneRule = { chapter: number; point: string; read: string; table: Table; focus?: number[] };

export const SCENE_RULES: Record<string, SceneRule> = {
  "moin/moegen-1": {
    chapter: 7,
    point: "*Ich mag Fisch.* — *mögen* + существительное; *Ich esse gern Fisch.* — *gern* + глагол",
    read:
      "*mögen* — «любить, нравиться», когда речь о вещи или человеке: *Ich mag Fisch*, *Greta mag keine Fotos*. " +
      "Если любите что-то делать, нужен глагол с *gern*: *Ich esse gern Fisch*, *Ich segle gern*. " +
      "Формы — как у *können*: в единственном числе другая гласная (*mag*, а не *mög-*), а у *ich* и *er* " +
      "нет окончания: *ich mag*, *er mag*. Ошибка по образцу *er kommt* — *er magt*. Из этой же семьи вежливое " +
      "*ich möchte* из темы о еде: «хотел бы».",
    table: {
      title: "mögen",
      ru: "любить, нравиться",
      head: ["Person", "mögen", "Beispiel"],
      rows: [
        ["ich", "mag", "Ich mag Fisch."],
        ["du", "mag+st", "Magst du Tee?"],
        ["er / sie / es", "mag", "Greta mag keine Fotos."],
        ["wir", "mög+en", "Wir mögen Kuchen."],
        ["ihr", "mög+t", "Mögt ihr Musik?"],
        ["sie / Sie", "mög+en", "Mögen Sie Kaffee?"],
      ],
      ruCols: [],
      note: "*Ich mag Fisch* — люблю рыбу. *Ich esse gern Fisch* — люблю её есть: *gern* всегда при глаголе.",
    },
  },
};
