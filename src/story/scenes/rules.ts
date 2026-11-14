import type { Table } from "../../content.ts";

// Правила новой версии Moin сверх уроков A1: грамматика, которую ждёт экзамен A1, а классические
// уроки не дают, и правила, где пример урока не работает для русскоязычного игрока. По решению автора
// их добавляет только прототип сцен, уроки не меняются (раздел «Модальные глаголы в новой версии» в
// A1-PLOT.md). Формат — как у фрагмента урока с таблицей:
// сборка кладёт правило в src/generated/story-rules.json рядом с фрагментами уроков. chapter —
// первая глава сцен, где правило можно использовать; основная игра эти правила не берёт.

export type SceneRule = { chapter: number; point: string; read: string; table: Table; focus?: number[] };

export const SCENE_RULES: Record<string, SceneRule> = {
  // Фрагмент урока einkaufen/check-1 объясняет число на *die Hose* и *die Schuhe*, а по-русски
  // «брюки» и «туфли» всегда во множественном: разницы игрок не увидит.
  "moin/kosten-1": {
    chapter: 5,
    point: "*Was kostet die Jacke?* — одна вещь; *Was kosten die Äpfel?* — несколько",
    read:
      "Глагол согласуется с тем, что стоит: одна вещь — *kostet*, несколько — *kosten*. Проверяйте по " +
      "немецкому слову, а не по русскому: «брюки» по-русски всегда во множественном, а *die Hose* — одна " +
      "вещь, поэтому *Was kostet die Hose?* А *ein Liter* — тоже один: *Was kostet ein Liter?*",
    table: {
      title: "kostet oder kosten?",
      ru: "сколько стоит — сколько стоят",
      head: ["Was?", "Frage", "По-русски"],
      rows: [
        ["der Liter", "Was kost+et ein Liter?", "Сколько стоит литр?"],
        ["die Jacke", "Was kost+et die Jacke?", "Сколько стоит куртка?"],
        ["die Hose", "Was kost+et die Hose?", "Сколько стоят брюки?"],
        ["die Äpfel", "Was kost+en die Äpfel?", "Сколько стоят яблоки?"],
      ],
      ruCols: [2],
      note: "*die Hose* — одна вещь, хотя по-русски «брюки» во множественном: *Was kostet die Hose?*",
    },
  },
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
  // sollen ждёт экзамен A1 (вопросы «Was soll … mitbringen?»), а классические уроки дают его только в A2.
  "moin/sollen-1": {
    chapter: 10,
    point: "*Ich soll Tee trinken.* — так велел или просит другой; *Ich muss im Bett bleiben.* — так надо",
    read:
      "*sollen* — «должен», когда этого хочет кто-то другой: врач, начальник, друг. Врач говорит Йенсену: " +
      "*Trinken Sie viel Tee!* — Йенсен пересказывает: *Ich soll viel Tee trinken.* А *müssen* — надо, потому что " +
      "так сложилось: *Ich bin krank, ich muss im Bett bleiben.* Формы — как у *können*: у *ich* и *er* нет " +
      "окончания: *ich soll*, *er soll*. На экзамене часто спрашивают *Was soll Elif mitbringen?* — что её " +
      "попросили принести. Ответ ищите в том, что сказал другой человек.",
    table: {
      title: "sollen",
      ru: "должен (так велели, так просят)",
      head: ["Person", "sollen", "Beispiel"],
      rows: [
        ["ich", "soll", "Ich soll Tee trinken."],
        ["du", "soll+st", "Du sollst im Bett bleiben."],
        ["er / sie / es", "soll", "Herr Jensen soll nicht sprechen."],
        ["wir", "soll+en", "Wir sollen um elf kommen."],
        ["ihr", "soll+t", "Ihr sollt Teller mitbringen."],
        ["sie / Sie", "soll+en", "Was sollen wir mitbringen?"],
      ],
      ruCols: [],
      note: "Врач: *Trinken Sie viel Tee!* → Йенсен: *Ich soll viel Tee trinken.* — чужой совет или просьба.",
    },
  },
  // Сводная таблица в конце главы 10: все модальные глаголы A1 рядом, вместе с mögen и sollen сверх уроков.
  "moin/modal-1": {
    chapter: 10,
    point: "Модальные глаголы: у *ich* и *er* одна форма без окончания, второй глагол — инфинитив в конце",
    read:
      "Семь модальных глаголов A1 устроены одинаково. У *ich* и *er* одна и та же форма без окончания: " +
      "*ich kann — er kann*, *ich muss — er muss*. В единственном числе у многих другая гласная: *können → kann*, " +
      "*müssen → muss*, *dürfen → darf*, *mögen → mag*, *wollen → will*; только *sollen* её не меняет. " +
      "*möchten* — вежливая форма от *mögen*: *ich möchte, er möchte*. Второй глагол стоит в инфинитиве в " +
      "конце: *Herr Jensen darf heute nicht sprechen.*",
    table: {
      title: "Modalverben",
      ru: "модальные глаголы",
      head: ["Infinitiv", "ich / er", "du", "wir / sie / Sie", "Значение"],
      rows: [
        ["können", "kann", "kann+st", "könn+en", "мочь, уметь"],
        ["müssen", "muss", "muss+t", "müss+en", "нужно, надо"],
        ["dürfen", "darf", "darf+st", "dürf+en", "можно, разрешено"],
        ["wollen", "will", "will+st", "woll+en", "хотеть"],
        ["sollen", "soll", "soll+st", "soll+en", "так велели"],
        ["mögen", "mag", "mag+st", "mög+en", "любить"],
        ["möchten", "möchte", "möchte+st", "möcht+en", "хотел бы"],
      ],
      ruCols: [4],
      note: "*Herr Jensen darf nicht sprechen. Er soll Tee trinken. Er möchte segeln.* — модальный второй, инфинитив в конце.",
    },
  },
};
