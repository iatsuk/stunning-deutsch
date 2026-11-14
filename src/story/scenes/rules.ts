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
  // Полный курс A1 (A1-PLAN.md, решение автора от 14 ноября 2026 года): правила из перечня грамматики
  // Start Deutsch 1, которых нет в уроках A1 или которые уроки не объясняют.
  "moin/stamm-1": {
    chapter: 1,
    point: "*Elif spricht Türkisch.* — у части глаголов у *du* и *er* меняется гласная: *e → i*, *a → ä*",
    read:
      "Окончания у всех глаголов одни и те же, но у части сильных глаголов в формах *du* и *er / sie / es* " +
      "меняется корень: *sprechen → du sprichst, er spricht*. У *ich*, *wir*, *ihr*, *sie / Sie* корень прежний: " +
      "*ich spreche, wir sprechen*. Так же устроены *essen → er isst*, *nehmen → er nimmt*, *sehen → er sieht*, " +
      "*lesen → er liest*, *fahren → er fährt*, *schlafen → er schläft*. В словаре у таких глаголов рядом стоят " +
      "формы *du* и *er*.",
    table: {
      title: "sprechen, fahren",
      ru: "говорить, ехать",
      head: ["Person", "sprechen", "fahren"],
      rows: [
        ["ich", "sprech+e", "fahr+e"],
        ["du", "spr+ichst", "f+ährst"],
        ["er / sie / es", "spr+icht", "f+ährt"],
        ["wir", "sprech+en", "fahr+en"],
        ["ihr", "sprech+t", "fahr+t"],
        ["sie / Sie", "sprech+en", "fahr+en"],
      ],
      ruCols: [],
      note: "*Elif spricht Türkisch. Fährst du nach Kiel?* — гласная меняется только у *du* и *er / sie / es*.",
    },
  },
  "moin/und-1": {
    chapter: 3,
    point: "*und*, *oder*, *aber* соединяют два предложения и места не занимают: глагол остаётся вторым",
    read:
      "Связки *und* «и», *oder* «или», *aber* «но» стоят как бы на нулевом месте. После них предложение идёт " +
      "обычным порядком, глагол на втором месте: *Ich habe einen Bruder, aber ich habe keine Schwester.* " +
      "Перед *aber* ставится запятая, перед *und* и *oder* обычно нет. Позже встретятся слова, которые место " +
      "занимают, — *dann*, *zuerst*: после них глагол идёт сразу.",
    table: {
      title: "und, oder, aber",
      ru: "и, или, но",
      head: ["0", "1", "2 (Verb)", "Rest"],
      rows: [
        ["—", "Ich", "hab+e", "einen Bruder"],
        ["und", "er", "heiß+t", "Peter."],
        ["aber", "ich", "hab+e", "keine Schwester."],
        ["oder", "Lotte", "komm+t", "heute."],
      ],
      ruCols: [],
      note: "*…, aber ich habe keine Schwester.* — *und*, *oder*, *aber* на нулевом месте, глагол второй.",
    },
  },
  "moin/haette-1": {
    chapter: 4,
    point: "*Ich hätte gern einen Tee.* — так же вежливо, как *Ich möchte einen Tee*",
    read:
      "В кафе и магазине вместо *Ich möchte …* часто говорят *Ich hätte gern …* — «мне бы …». Это готовая " +
      "формула: *hätte* разбирать не нужно, достаточно запомнить *ich hätte gern* и добавить, что хотите, в " +
      "винительном падеже: *Ich hätte gern einen Kaffee und ein Stück Kuchen.* Официант спросит *Was hätten " +
      "Sie gern?* — отвечают так же, как на *Was möchten Sie?*",
    table: {
      title: "Ich hätte gern …",
      ru: "мне бы … (вежливая просьба)",
      head: ["Deutsch", "По-русски"],
      rows: [
        ["Was hätten Sie gern?", "Что для вас?"],
        ["Ich hätte gern ein+en Tee.", "Мне, пожалуйста, чай."],
        ["Ich hätte gern ein Stück Kuchen.", "Мне кусок пирога."],
        ["Ich möchte ein+en Tee.", "Я хотел бы чай — то же самое."],
      ],
      ruCols: [1],
      note: "*Ich hätte gern …* = *Ich möchte …*; после формулы — винительный: *einen Tee*.",
    },
  },
  "moin/fuer-ohne-1": {
    chapter: 4,
    point: "*für* и *ohne* — всегда с винительным: *für den Club*, *Kaffee ohne Milch*",
    read:
      "После *für* «для» и *ohne* «без» всегда винительный падеж. Заметно это у мужского рода и у местоимений: " +
      "*der Club → für den Club*, *mein Freund → für meinen Freund*, *du → für dich*, *ich → ohne mich*. У женского " +
      "и среднего рода всё как в словаре: *für die Möwe*, *für das Schild*. Без артикля ещё проще: *Kaffee ohne " +
      "Milch*, *Tee ohne Zucker*.",
    table: {
      title: "für, ohne + Akkusativ",
      ru: "для, без",
      head: ["Wer? Was?", "für / ohne", "По-русски"],
      rows: [
        ["der Club", "für d+en Club", "для клуба"],
        ["mein Freund", "für mein+en Freund", "для моего друга"],
        ["die Möwe", "für die Möwe", "для чайки"],
        ["du", "für d+ich", "для тебя"],
        ["ich", "ohne m+ich", "без меня"],
        ["Milch", "Kaffee ohne Milch", "кофе без молока"],
      ],
      ruCols: [2],
      note: "*für* и *ohne* — винительный: *für den Club*, *ohne mich*.",
    },
  },
  "moin/nichts-1": {
    chapter: 5,
    point: "*Noch etwas? — Nein, danke, nichts. Das ist alles.* — etwas, nichts, alles, mehr",
    read:
      "Продавец спрашивает *Noch etwas?* — «Что-нибудь ещё?». «Ничего» — *nichts*, а не *kein*: *kein* стоит " +
      "только перед существительным (*kein Brot*), *nichts* — само по себе. *Das ist alles* — «это всё». *mehr* — " +
      "«больше, ещё»: *Ich möchte mehr Farbe*; *kein … mehr* — «больше нет»: *Wir haben keine Farbe mehr.* " +
      "Эти слова не меняются: *etwas*, *nichts*, *alles*, *mehr* всегда одинаковы.",
    table: {
      title: "etwas, nichts, alles, mehr",
      ru: "что-то, ничего, всё, больше",
      head: ["Wort", "Beispiel", "По-русски"],
      rows: [
        ["etwas", "Noch etwas?", "Что-нибудь ещё?"],
        ["nichts", "Nein, danke, nichts.", "Нет, спасибо, ничего."],
        ["alles", "Das ist alles.", "Это всё."],
        ["mehr", "Ich möchte mehr Farbe.", "Я хочу больше краски."],
        ["kein … mehr", "Wir haben keine Farbe mehr.", "У нас больше нет краски."],
      ],
      ruCols: [2],
      note: "*kein* — перед существительным: *kein Brot*; *nichts* — само по себе: *Ich kaufe nichts.*",
    },
  },
  "moin/dieser-1": {
    chapter: 5,
    point: "*Welche Jacke? — Diese hier.* — dieser, diese, dieses показывает на вещь",
    read:
      "*dieser* — «этот». Окончания у него те же, что у *der, die, das*: *der → dieser*, *die → diese*, " +
      "*das → dieses*, во множественном *diese*. В винительном меняется только мужской род: *Ich nehme diesen " +
      "Pullover.* На вопрос *Welcher? Welche? Welches?* удобно отвечать *Dieser hier* — «вот этот».",
    table: {
      title: "dieser, diese, dieses",
      ru: "этот, эта, это",
      head: ["der / die / das", "Nominativ", "Akkusativ"],
      rows: [
        ["der Pullover", "dies+er Pullover", "dies+en Pullover"],
        ["die Jacke", "dies+e Jacke", "dies+e Jacke"],
        ["das Hemd", "dies+es Hemd", "dies+es Hemd"],
        ["die Schuhe", "dies+e Schuhe", "dies+e Schuhe"],
      ],
      ruCols: [],
      note: "*Welcher Pullover? — Dieser hier.* Окончание как у *der*: *dies+er*, *dies+e*, *dies+es*.",
    },
  },
  "moin/hell-dunkel-1": {
    chapter: 5,
    point: "*dunkelblau*, *hellgrau* — оттенок пишется слитно с цветом",
    read:
      "Оттенок цвета — одно слово: *hell* «светлый» или *dunkel* «тёмный» плюс цвет: *hellblau*, *dunkelblau*, " +
      "*hellgrün*. Ударение на первой части: *DUN·kel·blau*. После *sein* цвет стоит без окончания: *Das Schild " +
      "ist dunkelblau und weiß.*",
    table: {
      title: "hell und dunkel",
      ru: "светлый и тёмный",
      head: ["hell-", "Farbe", "dunkel-"],
      rows: [
        ["hellblau", "blau", "dunkelblau"],
        ["hellgrün", "grün", "dunkelgrün"],
        ["hellgrau", "grau", "dunkelgrau"],
        ["hellrot", "rot", "dunkelrot"],
      ],
      ruCols: [],
      note: "*Das Schild ist dunkelblau und weiß.* — оттенок и цвет пишутся слитно.",
    },
  },
  "moin/dann-1": {
    chapter: 6,
    point: "*Zuerst trinke ich Tee, dann gehe ich zum Hafen.* — после *zuerst* и *dann* сразу глагол",
    read:
      "*zuerst* «сначала», *dann* «потом», *danach* «после этого» занимают первое место, поэтому глагол идёт " +
      "сразу за ними, а подлежащее — после глагола: *Dann gehe ich*, а не *Dann ich gehe*. Это то же правило, " +
      "что с временем на первом месте: *Um acht frühstücke ich.* Не путайте с *und*: *und* места не занимает — " +
      "*und ich gehe*.",
    table: {
      title: "zuerst, dann, danach",
      ru: "сначала, потом, после этого",
      head: ["1", "2 (Verb)", "3", "Rest"],
      rows: [
        ["Zuerst", "trink+e", "ich", "Tee,"],
        ["dann", "geh+e", "ich", "zum Hafen."],
        ["Danach", "segel+n", "wir", "nach Laboe."],
        ["Ich", "trink+e", "Tee", "— und ich geh+e zum Hafen."],
      ],
      ruCols: [],
      note: "*Dann gehe ich* — *dann* на первом месте, глагол второй. *und ich gehe* — *und* места не занимает.",
    },
  },
  "moin/uns-1": {
    chapter: 6,
    point: "*Wir treffen uns um acht.* — *uns*, *euch*, *sich*: «друг друга, себя»",
    read:
      "*Wir treffen uns* — «мы встречаемся», *Wir sehen uns morgen* — «увидимся завтра». *uns* здесь — «друг " +
      "друга». Для других лиц: *ihr trefft euch*, *sie treffen sich*. Так же устроено *sich freuen* «радоваться»: " +
      "*Ich freue mich*, *Freust du dich?* По-русски на этом месте часто стоит «-ся»: встречаемся, радуюсь.",
    table: {
      title: "mich, dich, sich, uns, euch",
      ru: "себя, друг друга",
      head: ["Person", "", "Beispiel"],
      rows: [
        ["ich", "mich", "Ich freu+e mich."],
        ["du", "dich", "Freu+st du dich?"],
        ["er / sie", "sich", "Sie freu+t sich."],
        ["wir", "uns", "Wir treff+en uns um acht."],
        ["ihr", "euch", "Treff+t ihr euch am Hafen?"],
        ["sie / Sie", "sich", "Sie seh+en sich morgen."],
      ],
      ruCols: [],
      note: "*Wir sehen uns!* — «увидимся!». *mich, dich, sich, uns, euch* — «себя, друг друга».",
    },
  },
  "moin/denn-1": {
    chapter: 7,
    point: "*Ich kann nicht, denn ich muss arbeiten.* — *denn* называет причину, порядок слов не меняется",
    read:
      "*denn* — «потому что, ведь». Как *und* и *aber*, оно стоит на нулевом месте: после него обычный порядок, " +
      "глагол второй. *Ich kann heute nicht, denn ich habe keine Zeit.* Перед *denn* — запятая. На A2 появится " +
      "*weil*: после него глагол уходит в конец; на A1 хватает *denn*.",
    table: {
      title: "denn",
      ru: "потому что",
      head: ["Satz", "0", "Grund: Verb an zweiter Stelle"],
      rows: [
        ["Ich kann nicht,", "denn", "ich muss arbeit+en."],
        ["Greta kommt nicht,", "denn", "sie hat kein+e Zeit."],
        ["Wir gehen nach Hause,", "denn", "es ist spät."],
      ],
      ruCols: [],
      note: "*…, denn ich muss arbeiten.* — после *denn* глагол второй, как в обычном предложении.",
    },
  },
  "moin/wuerde-1": {
    chapter: 7,
    point: "*Ich würde gern segeln.* — вежливо сказать, чего хочется",
    read:
      "*Ich würde gern* и инфинитив в конце — «я бы с удовольствием …». Это мягче, чем *Ich will*: *Ich würde " +
      "gern ins Kino gehen.* Спросить: *Würdest du gern mitkommen?* Как *möchten* и *hätte gern*, это готовая " +
      "формула вежливости: достаточно *ich würde, du würdest, wir würden*. Второй глагол — в конце, как после " +
      "модальных.",
    table: {
      title: "Ich würde gern …",
      ru: "я бы с удовольствием …",
      head: ["Person", "würde", "Rest", "Infinitiv"],
      rows: [
        ["ich", "würd+e", "gern", "segeln."],
        ["du", "würd+est", "gern", "mitkommen?"],
        ["wir", "würd+en", "gern ins Kino", "gehen."],
      ],
      ruCols: [],
      note: "*Ich würde gern segeln* — мягче, чем *Ich will segeln*; инфинитив в конце.",
    },
  },
  "moin/wem-1": {
    chapter: 8,
    point: "*Wem gehört der Schlüssel? — Mir!* — wer? wen? wem? и mir, dir, ihm, ihr, Ihnen",
    read:
      "У вопроса «кто» три формы. *Wer?* — кто: *Wer wohnt hier?* *Wen?* — кого: *Wen suchst du?* *Wem?* — " +
      "кому: *Wem gehört der Keller?* Ответ на *wem?* — дательный падеж: *mir* «мне», *dir* «тебе», *ihm* «ему», " +
      "*ihr* «ей», *uns*, *euch*, *Ihnen* «Вам». Дательный нужен после *gehören* «принадлежать», *helfen* " +
      "«помогать», *danken* «благодарить», *gefallen* «нравиться» и во фразе *Wie geht es dir?*",
    table: {
      title: "wer, wen, wem",
      ru: "кто, кого, кому",
      head: ["Nominativ", "Akkusativ", "Dativ"],
      rows: [
        ["wer?", "w+en?", "w+em?"],
        ["ich", "m+ich", "m+ir"],
        ["du", "d+ich", "d+ir"],
        ["er", "ih+n", "ih+m"],
        ["sie", "sie", "ih+r"],
        ["Sie", "Sie", "Ihn+en"],
      ],
      ruCols: [],
      note: "*Wem gehört der Schlüssel? — Mir.* *Kannst du mir helfen?* *Wie geht es Ihnen?*",
    },
  },
  "moin/unter-1": {
    chapter: 8,
    point: "*Der Schlüssel liegt unter dem Tisch.* — unter, neben, hinter, vor, zwischen + дательный",
    read:
      "Кроме *in* и *auf* на вопрос *Wo?* отвечают ещё пять предлогов: *unter* «под», *neben* «рядом с», " +
      "*hinter* «за», *vor* «перед», *zwischen* «между». После них, как после *in* и *auf*, дательный: " +
      "*der Tisch → unter dem Tisch*, *die Tür → hinter der Tür*, *das Haus → vor dem Haus*. Коротко: *dem* " +
      "вместо *der* и *das*, *der* вместо *die*.",
    table: {
      title: "unter, neben, hinter, vor",
      ru: "под, рядом, за, перед",
      head: ["Wo?", "der → dem", "die → der", "das → dem"],
      rows: [
        ["unter", "unter d+em Tisch", "unter d+er Bank", "unter d+em Bett"],
        ["neben", "neben d+em Schrank", "neben d+er Tür", "neben d+em Fenster"],
        ["hinter", "hinter d+em Stuhl", "hinter d+er Tür", "hinter d+em Haus"],
        ["vor", "vor d+em Keller", "vor d+er Werkstatt", "vor d+em Café"],
      ],
      ruCols: [],
      note: "*Wo ist der Schlüssel? — Unter dem Tisch.* После *unter, neben, hinter, vor, zwischen* — дательный.",
    },
  },
  "moin/wohin-1": {
    chapter: 9,
    point: "*Wo?* — *im Café* (дательный); *Wohin?* — *ins Café* (винительный)",
    read:
      "*in*, *an*, *auf* отвечают на два вопроса. *Wo?* «где?» — место, дательный: *Ich bin im Café*, *Das Boot " +
      "liegt am Hafen*. *Wohin?* «куда?» — направление, винительный: *Ich gehe ins Café*, *Wir fahren an den " +
      "Hafen*, *Hauke geht in die Stadt*. Слитно: *in das → ins*, *an das → ans*, *in dem → im*, *an dem → am*. " +
      "Для городов и стран — *nach*: *nach Hamburg*; к людям — *zu*: *zu Greta*; домой — *nach Hause*.",
    table: {
      title: "Wo? Wohin?",
      ru: "где? куда?",
      head: ["", "Wo? (Dativ)", "Wohin? (Akkusativ)"],
      rows: [
        ["der Hafen", "a+m Hafen", "an d+en Hafen"],
        ["die Stadt", "in d+er Stadt", "in d+ie Stadt"],
        ["das Café", "i+m Café", "in+s Café"],
        ["das Kino", "i+m Kino", "in+s Kino"],
      ],
      ruCols: [],
      note: "*Ich bin im Café* — где. *Ich gehe ins Café* — куда. *im = in dem*, *ins = in das*.",
    },
  },
  "moin/zeit-1": {
    chapter: 9,
    point: "*ab acht Uhr*, *für zwei Tage*, *über zwanzig Minuten*, *nach dem Essen*, *vor dem Start*",
    read:
      "Ещё пять предлогов времени. *ab* «с, начиная с»: *ab acht Uhr*, *ab Montag*. *für* «на срок»: *für zwei " +
      "Tage*. *über* «больше»: *über zwanzig Minuten*. *nach* «после» и *vor* «перед, назад» — с дательным: " +
      "*nach dem Essen*, *vor dem Start*, *vor zwei Tagen* — «два дня назад». Не путайте: *nach Hamburg* — " +
      "направление, *nach dem Essen* — время.",
    table: {
      title: "ab, für, über, nach, vor",
      ru: "предлоги времени",
      head: ["Präposition", "Beispiel", "По-русски"],
      rows: [
        ["ab", "ab acht Uhr", "с восьми часов"],
        ["für", "für zwei Tage", "на два дня"],
        ["über", "über zwanzig Minuten", "больше двадцати минут"],
        ["nach", "nach d+em Essen", "после еды"],
        ["vor", "vor d+em Start", "перед стартом"],
        ["vor", "vor zwei Tag+en", "два дня назад"],
      ],
      ruCols: [2],
      note: "*nach dem Essen* — после; *vor dem Start* — перед; *vor zwei Tagen* — назад.",
    },
  },
  "moin/man-1": {
    chapter: 9,
    point: "*Wo kauft man Fahrkarten?* — *man*: «люди вообще», по-русски часто без подлежащего",
    read:
      "*man* — подлежащее без конкретного человека: «люди, все, кто угодно». По-русски его обычно не " +
      "переводят: *Wo kauft man Fahrkarten?* — «Где покупают билеты?», *Hier darf man nicht halten* — «Здесь " +
      "нельзя останавливаться». Глагол после *man* — как после *er*: *man kauft*, *man kann*, *man darf*. " +
      "Пишется с одной *n* и с маленькой буквы — не путайте с *der Mann* «мужчина».",
    table: {
      title: "man",
      ru: "люди вообще",
      head: ["Deutsch", "По-русски"],
      rows: [
        ["Wo kauf+t man Fahrkarten?", "Где покупают билеты?"],
        ["Am Automaten kann man bezahlen.", "В автомате можно заплатить."],
        ["Hier darf man nicht halten.", "Здесь нельзя останавливаться."],
        ["In Kiel sprich+t man Deutsch.", "В Киле говорят по-немецки."],
      ],
      ruCols: [1],
      note: "*man kauft* — как *er kauft*. *man* — «люди вообще», *der Mann* — мужчина.",
    },
  },
  "moin/ung-1": {
    chapter: 10,
    point: "*die Anmeldung*, *die Wohnung* — существительное на *-ung* всегда женского рода",
    read:
      "Из глагола получается существительное: основа плюс *-ung*. *anmelden → die Anmeldung*, *wohnen → die " +
      "Wohnung*, *heizen → die Heizung*, *lösen → die Lösung*, *bessern → die Besserung* — отсюда *Gute " +
      "Besserung!* Все такие слова — *die*, множественное на *-en*: *die Wohnungen*. Узнали глагол — поняли и " +
      "существительное.",
    table: {
      title: "-ung",
      ru: "существительное из глагола",
      head: ["Verb", "Nomen", "По-русски"],
      rows: [
        ["anmelden", "die Anmeld+ung", "регистратура, запись"],
        ["wohnen", "die Wohn+ung", "квартира"],
        ["heizen", "die Heiz+ung", "отопление"],
        ["lösen", "die Lös+ung", "решение"],
        ["bessern", "die Besser+ung", "Gute Besserung! — поправляйтесь!"],
      ],
      ruCols: [2],
      note: "*-ung* — всегда *die*, множественное *-ungen*: *die Wohnung → die Wohnungen*.",
    },
  },
  "moin/wenn-1": {
    chapter: 10,
    point: "*Wenn es wehtut, nehmen Sie eine Tablette.* — после *wenn* глагол в конце (пока только узнавать)",
    read:
      "*wenn* — «если, когда». На A1 его достаточно понимать на слух и в тексте. После *wenn* глагол уходит в " +
      "конец части: *wenn es wehtut*, *wenn du Zeit hast*. Вторая часть начинается с глагола: *…, nehmen Sie " +
      "eine Tablette*. Услышали *wenn* — ждите условие; что делать, скажут после запятой.",
    table: {
      title: "wenn",
      ru: "если, когда",
      head: ["Wenn …", "Verb am Ende", "Verb zuerst"],
      rows: [
        ["Wenn es", "weh+tut,", "nehmen Sie eine Tablette."],
        ["Wenn du Zeit", "has+t,", "komm zur Party!"],
        ["Wenn es", "regn+et,", "bleiben wir zu Hause."],
      ],
      ruCols: [],
      note: "*Wenn es wehtut, …* — в части с *wenn* глагол в конце; вторая часть начинается с глагола.",
    },
  },
  "moin/un-los-1": {
    chapter: 11,
    point: "*unbekannt*, *arbeitslos*, *erreichbar* — приставка *un-* и суффиксы *-los*, *-bar*",
    read:
      "Три детали меняют смысл прилагательного. *un-* — «не-»: *bekannt → unbekannt* «неизвестный», " +
      "*möglich → unmöglich*, *pünktlich → unpünktlich*. *-los* — «без»: *die Arbeit → arbeitslos* «без работы», " +
      "*kostenlos* «бесплатно». *-bar* — «можно»: *erreichen → erreichbar* «можно связаться». Ударение у слов с " +
      "*un-* — на приставке: *UN·be·kannt*.",
    table: {
      title: "un-, -los, -bar",
      ru: "не-, без-, можно",
      head: ["Teil", "Beispiel", "По-русски"],
      rows: [
        ["un-", "unbekannt", "неизвестный"],
        ["un-", "unmöglich", "невозможно"],
        ["-los", "arbeits+los", "без работы"],
        ["-los", "kosten+los", "бесплатно"],
        ["-bar", "erreich+bar", "на связи, можно связаться"],
      ],
      ruCols: [2],
      note: "*un-* = не-, *-los* = без, *-bar* = можно: *unbekannt, arbeitslos, erreichbar*.",
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
