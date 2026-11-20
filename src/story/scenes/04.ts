import { an, ANSWER, ASK, bingo, docks, gaps, gruss, gull as race, HINT_DOCK, HINT_HEAR, HINT_LETTER, HINT_LOCK, HINT_ODD, HINT_ORAL, HINT_PICTURE, HINT_RACE, HINT_SAY, HINT_SPELL, letter, letters, lock, odd, oral, order, pairs, RACE, RACE_STAKES, reply as oralReply, REQUEST, say as oralSay, scene, sort, speak, spot, verdict, write } from "../build.ts";
import { phrases } from "../data.ts";
import type { ChatTurn, Challenge, Episode, SceneNode } from "../types.ts";
import { back } from "./back.ts";

// Глава 4 в формате сцен (A1-PLOT.md, «Формат сцен»): еда и напитки, möchten, винительный падеж
// (einen, keinen), nicht или kein. Вопрос главы — с кем встречалась Грета. Вход — «Greta ist morgen
// im Café», выход — счёт столика четыре (einen Tee, keinen Kaffee) и салфетка с эскизом таблички и
// словом «Farbe?». Немецкий — из уроков 1–4 и выражений истории; новые слова урока — в learn у реплики.
// Повороты брошены оракулом (seed 1793969015), увязка — в журнале A1-STORYCRAFT.md.

const narr = (text: string): SceneNode => ({ t: "narr", text });
const learn = (words?: string[]) => (words ? { learn: words } : {});
const hauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Hauke", voice: "Rocko", de, ru, ...learn(words) });
const jensen = (de: string, ru: string): SceneNode => ({ t: "say", who: "Herr Jensen", voice: "Grandpa", de, ru });
const elif = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Elif", voice: "Flo", de, ru, ...learn(words) });
const dana = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Dana", voice: "Anna", de, ru, ...learn(words) });
const mateo = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Mateo", voice: "Reed", de, ru, ...learn(words) });
const frauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frauke", voice: "Sandy", de, ru, ...learn(words) });
const kellner = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Kellner", voice: "Eddy", de, ru, ...learn(words) });
const derya = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Derya", voice: "Shelley", de, ru, ...learn(words) });
const reporter = (de: string, ru: string): SceneNode => ({ t: "say", who: "Reporter", voice: "Eddy", de, ru });
/** Пары памяти — из выражений истории, которые глава уже показала. */
const memory = (ids: string[]): Challenge => ({ kind: "memory", pairs: ids.map((id) => ({ id, de: phrases[id].de, ru: phrases[id].ru })) });
const turn = (say: string, ru: string, answer: string, options: [string, string, string][]): ChatTurn => ({
  say,
  ru,
  answer,
  options: options.map(([id, text, why]) => ({ id, text, why })),
});
const ok = (text: string) => ({ text, ok: true as const });
const no = (text: string, react: string) => ({ text, react });

// Сцена 1 · пролог и завязка. Бросок: глобальное событие сдвигается · Йенсен · найти · der Döner · 6.
const stands: SceneNode[] = [
  { t: "pic", src: "04-stands.jpg", alt: "Утро на Kiellinie: рабочие ставят первые палатки Kieler Woche, жёлтый фургон с донерами у пустой подставки; Йенсен с кружкой показывает рукой вдоль набережной, Матео разливает кофе из термоса" },
  narr("Der {vierte} Tag, noch neun Tage. За ночь Kiellinie не узнать: у воды встал первый {stand} Kieler Woche, за ним ещё пять."),
  hauke("Noch neun Tage! Und hier ist schon Kieler Woche!", "Ещё девять дней! А здесь уже Kieler Woche!"),
  {
    t: "look",
    task: "Осмотрите утреннюю набережную.",
    items: [
      { icon: "🎪", de: "der Stand", ru: "ларёк", note: "Доски, флажки, провода. К старту таких Stände будет сотни — от клуба до самого порта.", key: true },
      { icon: "🪧", de: "der Aufsteller", ru: "подставка", note: "Рамка по-прежнему пуста. На ней стоит кружка Йенсена — как пресс-папье.", key: true },
      { icon: "⛵", de: "das Boot", ru: "лодка", note: "«Sprotte» качается у причала. Её Kieler Woche тоже ждёт." },
    ],
  },
  narr("Вдоль воды идёт Матео с термосом и fünf Tassen. Kaffee он наливает, не спрашивая, — как дон из старого фильма про семью."),
  narr("Под мышкой у него пакет с Brötchen: {baeckerei} на Kiellinie открывается в шесть, и Матео там первый."),
  mateo("Moin! Kaffee für alle!", "Привет! Кофе всем!", ["der Kaffee"]),
  {
    t: "reply",
    rule: ["essen/akkusativ-3", "essen/moechten-1"],
    task: "Матео протягивает вам чашку. Попросите вежливо чай.",
    options: [
      ok("Ich möchte einen Tee, bitte."),
      no("Ich möchte ein Tee, bitte.", "der Tee — мужского рода. После möchte он отвечает на вопрос «что?»: einen Tee."),
      no("Ich möchtest einen Tee, bitte.", "möchtest — это du. Про себя: ich möchte."),
    ],
  },
  mateo("Tee? Nein. Kaffee? Ja.", "Чай? Нет. Кофе? Да.", ["der Tee"]),
  narr("Это не вопрос. Это предложение, от которого нельзя отказаться. Хауке пьёт уже zwei Tassen Kaffee и подмигивает."),
  narr("Kaffee у Матео чёрный и {bitter}, как его шутки про чаек."),
  narr("Матео уверен: {besten} Kaffee в Киле варит он."),
  {
    t: "game",
    rule: ["essen/akkusativ-3"],
    task: "Матео разливает напитки и путает артикли. Разложите заказы: einen, eine или ein?",
    hint: "Меняется только мужской род: der Kaffee → einen Kaffee. die Cola → eine Cola, das Wasser → ein Wasser.",
    c: sort([["einen", "einen …"], ["eine", "eine …"], ["ein", "ein …"]], [
      ["kaffee", "Kaffee", "einen", "☕"],
      ["tee", "Tee", "einen", "🍵"],
      ["saft", "Saft", "einen", "🧃"],
      ["cola", "Cola", "eine", "🥤"],
      ["suppe", "Suppe", "eine", "🍲"],
      ["wasser", "Wasser", "ein", "💧"],
      ["ei", "Ei", "ein", "🥚"],
    ]),
  },
  {
    t: "game",
    task: "Комикс утра на набережной: кто что сказал? Расставьте реплики по кадрам.",
    hint: "Опирайтесь на характер героев и ситуацию в кадре. Одно облачко лишнее.",
    c: {
      kind: "comic",
      panels: [
        { id: "p1", who: "Mateo", art: "☕", scene: "Матео с термосом разливает кофе набережной.", answer: "Moin! Kaffee für alle!", ru: "Привет! Кофе всем!" },
        { id: "p2", who: "Вы", art: "🍵", scene: "Вы просите у Матео другой горячий напиток.", answer: "Ich möchte einen Tee, bitte.", ru: "Я бы хотел(а) чай, пожалуйста." },
        { id: "p3", who: "Derya", art: "🥙", scene: "Хозяйка фургона спрашивает про место у воды.", answer: "Mein Döner-Stand – hier?", ru: "Мой ларёк с донерами — здесь?" },
        { id: "p4", who: "Herr Jensen", art: "🪧", scene: "Йенсен молча указывает место у фонаря.", answer: "Moin.", ru: "Привет." },
      ],
      extra: ["Gute Nacht!"],
    },
  },
  narr("К пустому {aufsteller} подъезжает жёлтый фургон с надписью Döner. Хозяйка, Дерья, выглядывает в окошко: место у самой воды!"),
  derya("Moin! Mein Döner-Stand – hier? Der Platz ist super!", "Привет! Мой ларёк с донерами — здесь? Место супер!", ["der Döner"]),
  narr("Йенсен смотрит на фургон, на Wasser, на пустой {aufsteller}. Потом находит место у фонаря, метров за zwanzig, и показывает рукой."),
  jensen("Moin.", "Привет."),
  {
    t: "pick",
    task: "Что значат Moin и жест Йенсена?",
    options: [
      ok("Здесь место таблички. Ларёк — у фонаря"),
      no("Йенсен заказывает донер", "Йенсен пьёт только чай. И он не заказывал, а показывал."),
      no("Йенсен прогоняет фургон с набережной", "Он не прогоняет: он нашёл место у фонаря и даже несёт провод."),
    ],
  },
  hauke("Nicht hier. Hier ist das Schild! Der Döner ist da.", "Не здесь. Здесь — табличка! Донер — там."),
  {
    t: "hear",
    task: "Что сказал Хауке?",
    voice: "Rocko",
    de: "Nicht hier. Hier ist das Schild! Der Döner ist da.",
    options: ["Табличка — здесь, донер — там", "Табличка — там, донер — здесь", "Донера сегодня не будет"],
    answer: "Табличка — здесь, донер — там",
  },
  narr("Дерья не спорит: у фонаря есть розетка. Через пять минут на фургоне висит Speisekarte: Döner, Fischbrötchen, Cola, Salat."),
  narr("Ниже мелко: {haehnchen}, {reis}, {schinken}, {pommes}. И отдельная графа — {getraenk}: Cola, Wasser, Tee."),
  {
    t: "game",
    task: "Послушайте слово из меню Дерьи и нажмите на картинку.",
    hint: HINT_PICTURE,
    c: scene([["der Döner", "🥙"], ["das Fischbrötchen", "🐟"], ["die Cola", "🥤"], ["der Salat", "🥗"], ["die Suppe", "🍲"], ["die Wurst", "🌭"], ["der Käse", "🧀"], ["die Tomate", "🍅"], ["das Hähnchen", "🍗"], ["der Reis", "🍚"], ["die Pasta", "🍝"]]),
  },
  {
    t: "game",
    task: "Дерья пишет меню мелом: слова длинные, из двух частей. Соберите их и выберите артикль.",
    hint: "Род — по последней части: das Brötchen → das Fischbrötchen, das Essen → das Mittagessen.",
    c: {
      kind: "compound",
      rounds: [
        { word: "das Fischbrötchen", parts: ["Fisch", "Brötchen"], ru: "булочка с рыбой" },
        { word: "das Mittagessen", parts: ["Mittag", "Essen"], ru: "обед" },
        { word: "das Abendessen", parts: ["Abend", "Essen"], ru: "ужин" },
      ],
      extra: ["Tee", "Salat", "Wurst"],
    },
  },
  narr("Дерья смеётся: у неё не {restaurant} и не {lokal}, а фургон. Зато {salz} и {oel} — свои, из Измира."),
  derya("Möchten Sie einen Döner?", "Хотите донер?"),
  {
    t: "reply",
    rule: ["essen/negation-2", "essen/akkusativ-3"],
    task: "Десять утра, вы только что завтракали. Откажитесь вежливо.",
    options: [
      ok("Nein, danke. Ich habe keinen Hunger."),
      no("Nein, danke. Ich habe kein Hunger.", "der Hunger — мужского рода: keinen Hunger."),
      no("Nein, danke. Ich habe nicht Hunger.", "Отрицаем существительное — значит, kein: keinen Hunger."),
    ],
  },
  narr("Старый мобильный Нильса пищит: {nachricht}. «Greta ist heute im Café!!! Um zehn!!! Bitte nicht fragen!!!»"),
  hauke("Greta im Café, Mateo mit Kaffee – Mateo und Greta, ganz klar!", "Грета в кафе? А у Матео кофе… Матео и Грета! Ясно как день!"),
  mateo("Ich? Ich bin hier! Mit Kaffee!", "Я? Я здесь! С кофе!"),
  {
    t: "hear",
    task: "Кого подозревает Хауке?",
    voice: "Rocko",
    de: "Greta im Café, Mateo mit Kaffee – Mateo und Greta, ganz klar!",
    options: ["Матео и Грету", "Нильса и Грету", "Йенсена и Грету"],
    answer: "Матео и Грету",
  },
  { t: "gap", task: "Где сегодня Грета?", text: "Greta ist heute im ___.", options: ["Café", "Club", "Büro"], answer: "Café", ru: "Грета сегодня в кафе." },
  {
    t: "game",
    task: "Верно или нет? Утро на Kiellinie.",
    c: verdict(["Richtig", "Falsch"], [
      ["Матео наливает кофе всем, даже тем, кто просит чай", true, "Kaffee? Ja. Это не вопрос."],
      ["Йенсен заказал донер", false, "Он нашёл ларьку место у фонаря — подальше от подставки."],
      ["Грета сегодня в кафе", true, "«Greta ist heute im Café!!!» — пишет Нильс."],
    ]),
  },
  { t: "type", rule: ["kennenlernen/endungen-1"], task: "Запишите в блокнот, что Матео пьёт всегда.", answers: ["Mateo trinkt immer Kaffee.", "Er trinkt immer Kaffee.", "Mateo trinkt Kaffee."], ru: "Матео всегда пьёт кофе." },
  {
    t: "clue",
    title: "Kaffee? Ja.",
    text: "Mateo trinkt immer Kaffee. Herr Jensen findet für den Döner einen Platz — nicht am Aufsteller: место таблички он держит пустым. Greta ist heute im Café.",
  },
];

// Сцена 2 · развитие. Бросок: нить закрывается раньше срока · чайка · вернуть · die Milch · 5.
// Бросок: честная улика · Йенсен · заблудиться · die Cola · 8 (мужчина заблудился в меню).
const table: SceneNode[] = [
  { t: "pic", src: "04-cafe.jpg", alt: "Терраса кафе у воды: на пустом столике чашка чая и стакан колы; официант несёт поднос с рыбными булочками, на поднос пикирует чайка; Хауке, Дана и Матео за соседним столиком" },
  narr("Café am Wasser, ровно zehn Uhr. Греты нет. Tisch vier у окна пуст, но Kellner ещё не убрал: на нём Tasse und Glas."),
  kellner("Guten Morgen! Was möchten Sie?", "Доброе утро! Что желаете?", ["möchten"]),
  mateo("Ein Kaffee für alle! Und ein Kuchen!", "Один кофе на всех! И один пирог!"),
  narr("Kellner поднимает бровь: ein Kaffee für alle? Матео хотел сказать «каждому». С падежами он обращается как с солью — на глаз."),
  { t: "gap", rule: ["essen/akkusativ-3"], task: "Поправьте Матео: так заказывают кофе.", text: "___ Kaffee, bitte!", options: ["Einen", "Ein", "Eine"], answer: "Einen", ru: "Кофе, пожалуйста!" },
  hauke("Einen Kaffee und ein Stück Kuchen, bitte!", "Кофе и кусок пирога, пожалуйста!", ["das Stück"]),
  dana("Einen Kaffee, bitte. Kuchen? Nein, danke. Ich habe keinen Hunger.", "Кофе, пожалуйста. Пирог? Нет, спасибо. Я не голодна.", ["Hunger haben"]),
  {
    t: "game",
    rule: ["essen/akkusativ-3", "moin/fuer-ohne-1"],
    task: "Ваша очередь: Kellner спрашивает вас.",
    hint: "der Tee, der Kuchen — мужского рода: einen Tee, keinen Kuchen.",
    c: {
      kind: "chat",
      who: "Kellner",
      voice: "Eddy",
      turns: [
        turn("Und Sie? Was möchten Sie?", "А вы? Что желаете?", "tee", [
          ["tee", "Einen Tee, bitte.", ""],
          ["kaffee", "Einen Kaffee, bitte.", "Матео уже ликует. Но вы хотели чай."],
          ["ein", "Ein Tee, bitte.", "der Tee — мужского рода: einen Tee."],
        ]),
        turn("Mit Milch?", "С молоком?", "ohne", [
          ["ohne", "Nein, ohne Milch, danke.", ""],
          ["kein", "Nein, kein Milch.", "die Milch — женского рода: keine Milch. А проще всего — ohne Milch."],
          ["mit", "Mit Kaffee, bitte.", "Kaffee в чай? Матео был бы счастлив. Официант — нет."],
        ]),
        turn("Und ein Stück Kuchen?", "А кусок пирога?", "nein", [
          ["nein", "Nein, danke. Keinen Kuchen.", ""],
          ["keine", "Nein, danke. Keine Kuchen.", "der Kuchen — мужского рода: keinen Kuchen."],
          ["nicht", "Nein, danke. Nicht Kuchen.", "Перед существительным без артикля — kein: keinen Kuchen."],
        ]),
      ],
    },
  },
  {
    t: "game",
    task: "Kellner повторяет заказ столика. Сколько чего он несёт?",
    hint: "Перечитайте, кто что заказал. Матео заказывал «один на всех» — но каждому.",
    c: {
      kind: "quantity",
      items: [
        { id: "kaffee", text: "der Kaffee", max: 4 },
        { id: "tee", text: "der Tee", max: 4 },
        { id: "wasser", text: "das Wasser", max: 4 },
        { id: "kuchen", text: "das Stück Kuchen", max: 4 },
      ],
      answer: { kaffee: 3, tee: 1, wasser: 0, kuchen: 2 },
    },
  },
  {
    t: "game",
    rule: ["essen/moechten-1", "essen/akkusativ-3"],
    task: "Заказ в бюджет: соберите перекус на соседний столик по всем условиям.",
    hint: "Подходит любой набор, где выполняются все пять условий сразу.",
    c: {
      kind: "budget",
      items: [
        { id: "kaffee", de: "ein Kaffee", ru: "кофе", price: 250, max: 3, tags: ["drink", "coffee"] },
        { id: "tee", de: "ein Tee", ru: "чай", price: 250, max: 3, tags: ["drink"] },
        { id: "cola", de: "eine Cola", ru: "кола", price: 280, max: 3, tags: ["drink"] },
        { id: "kuchen", de: "ein Stück Kuchen", ru: "кусок пирога", price: 320, max: 3, tags: ["food"] },
        { id: "brot", de: "ein Fischbrötchen", ru: "булочка с рыбой", price: 350, max: 3, tags: ["food"] },
      ],
      rules: [
        { kind: "maxPrice", cents: 1500, label: "Не дороже 15,00 €" },
        { kind: "exactTotal", count: 4, label: "Ровно 4 позиции" },
        { kind: "minTag", tag: "drink", count: 2, label: "Минимум 2 напитка" },
        { kind: "minTag", tag: "food", count: 1, label: "Хотя бы 1 перекус" },
        { kind: "forbidTag", tag: "coffee", label: "Без кофе (как за столиком 4)" },
      ],
    },
  },
  narr("Kellner несёт {tablett}: drei Kaffee, ein Tee, zwei Stück Kuchen — и zwei Fischbrötchen к соседнему столику."),
  kellner("Möchten Sie noch etwas bestellen? Ein Getränk? Ein Fischbrötchen?", "Хотите заказать что-нибудь ещё? Напиток? Булочку с рыбой?", ["bestellen"]),
  narr("Kellner обожает {anbieten}: ещё Kaffee, ещё Kuchen, ещё Fischbrötchen."),
  {
    t: "game",
    task: "Kellner расставляет заказ. Что в чём подают?",
    hint: "Мера и то, что в ней: второе слово не меняется — eine Tasse Tee, ein Glas Wasser.",
    c: pairs([["eine Tasse", "Tee"], ["ein Glas", "Wasser"], ["ein Stück", "Kuchen"], ["die Speisekarte", "Kaffee, Tee, Cola"]]),
  },
  narr("{moewe} пикирует прямо на {tablett}. Ein Fischbrötchen исчезает в небе. Взамен в молочник падает что-то бумажное."),
  { t: "game", task: `Спасите слова с подноса, пока чайка не вернулась! ${RACE}`, hint: HINT_RACE, outcome: RACE_STAKES, c: race(["der Kaffee", "der Tee", "die Milch", "das Fischbrötchen", "der Kuchen", "das Wasser"]) },
  dana("Die Möwe bezahlt! Mit Papier?", "Чайка расплачивается! Бумажкой?", ["bezahlen"]),
  narr("Из Milch вы вылавливаете угол от {anhaenger} — тот, что {moewe} оторвала в первый день. На нём одна цифра: zwei."),
  hauke("Zwei! Zimmer zwölf! Danke, Möwe. Aber das ist nicht neu.", "Два! Комната двенадцать! Спасибо, чайка. Но это не новость."),
  { t: "gap", task: "Какая комната у Нильса и Греты?", text: "Zimmer ___!", options: ["zwölf", "zwei", "zwanzig"], answer: "zwölf", ru: "Комната двенадцать!" },
  {
    t: "reply",
    task: "Спросите официанта про столик четыре.",
    options: [
      ok("Entschuldigung! Tisch vier – wer ist das?"),
      no("Tisch vier, bitte!", "Так просят столик, а не спрашивают о нём. Kellner уже несёт вам меню."),
      no("Die Rechnung, bitte!", "Счёт — потом. Сначала — свидетель."),
    ],
  },
  kellner("Tisch vier? Die Frau nimmt eine Cola. Der Mann möchte keinen Kaffee. Er nimmt einen Tee.", "Столик четыре? Женщина берёт колу. Мужчина не хочет кофе. Он берёт чай.", ["die Cola"]),
  {
    t: "hear",
    task: "Что пил мужчина за столиком четыре?",
    voice: "Eddy",
    de: "Tisch vier? Die Frau nimmt eine Cola. Der Mann möchte keinen Kaffee. Er nimmt einen Tee.",
    options: ["чай", "кофе", "колу"],
    answer: "чай",
  },
  kellner("Er sagt nichts, kein Wort! Er zeigt auf die Speisekarte: Cola? Nein – Tee.", "Он ничего не говорит, ни слова! Показывает в меню: колу? Нет — чай.", ["die Speisekarte"]),
  {
    t: "look",
    task: "Осмотрите столик четыре.",
    items: [
      { icon: "☕", de: "die Tasse", ru: "чашка", note: "Чашка из-под чая. Ярлычок пакетика намотан на ручку — аккуратно, по-морскому.", key: true },
      { icon: "📜", de: "die Speisekarte", ru: "меню", note: "Меню открыто на напитках. Палец оставил след на строке Cola — и на строке Tee. Кто-то заблудился в меню.", key: true },
      { icon: "🪑", de: "der Stuhl", ru: "стул", note: "Один стул отодвинут далеко от стола: сидел кто-то крупный." },
    ],
  },
  {
    t: "game",
    task: "Kellner отдаёт копию счёта. Найдите, что взяли за столиком четыре.",
    hint: "Ищите напитки, а не цены.",
    c: spot("Rechnung · Tisch 4", ["Café am Wasser|Tisch 4", "1 Cola|2,80 €", "1 Tee|2,50 €", "Summe|5,30 €"], ["1 Cola", "1 Tee"]),
  },
  {
    t: "pick",
    task: "Что видно по счёту?",
    options: [
      ok("Их было двое: кола и чай, кофе никто не пил"),
      no("Грета была одна", "Кола и чай в одну Грету? Kellner видел мужчину."),
      no("Мужчина пил кофе", "В счёте нет кофе: der Mann möchte keinen Kaffee."),
    ],
  },
  mateo("Keinen Kaffee? Das bin ich nicht!", "Без кофе? Это точно не я!"),
  {
    t: "type",
    rule: ["essen/check-3", "essen/akkusativ-3"],
    task: "Запишите в блокнот, что взял мужчина.",
    answers: ["Er nimmt einen Tee.", "Der Mann nimmt einen Tee.", "Er möchte keinen Kaffee.", "Der Mann möchte keinen Kaffee.", "Einen Tee, keinen Kaffee."],
    ru: "Он берёт чай. / Он не хочет кофе.",
  },
  {
    t: "clue",
    title: "Tisch vier",
    text: "Tisch 4: eine Cola, ein Tee. Kein Kaffee. Der Mann sagt kein Wort, er zeigt auf die Speisekarte. Mateo? Nein: Er trinkt immer Kaffee. Чайка вернула угол бирки — в молоке.",
  },
];

// Сцена 3 · развилка: кто пьёт чай. Броски: сквозная шутка обостряется · Нильс · починить ·
// das Bier · 4; за кадром · Фрауке · заблудиться · die Rechnung · 3.
const witnesses: SceneNode[] = [
  { t: "pic", src: "04-kiosk.jpg", alt: "Киоск Фрауке на набережной: очередь, Фрауке в полосатом фартуке растерянно смотрит на монеты; Хауке и Дана читают сообщение на мобильном; за ними новые палатки Kieler Woche" },
  narr("Wer trinkt Tee, aber keinen Kaffee? Матео отпадает. Хауке тут же находит новую версию — ближе к Грете некуда."),
  hauke("Nils! Er ist ihr Bruder. Nils und Greta im Café – ganz klar!", "Нильс! Он её брат. Нильс и Грета в кафе — ясно как день!"),
  narr("Свидетелей двое. Нильс — на связи по старому Handy. А у киоска с fünf Uhr стоит Фрауке: оттуда видна вся Kiellinie."),
  { t: "gap", rule: ["familie/wessen-1"], task: "Чей брат Нильс?", text: "Nils ist ___ Bruder.", options: ["ihr", "sein", "dein"], answer: "ihr", ru: "Нильс — её брат." },
  {
    t: "go",
    task: "Кого расспросить?",
    next: "Дальше по делу",
    branches: [
      {
        label: "Нильс",
        icon: "📱",
        nodes: [
          narr("Вы пишете Нильсу. Ответ приходит мгновенно и очень громко: «Hallo!!!!!!!» Клавиша «!» залипла."),
          narr("Вчера Нильс уронил мобильный в Bier и сам его чинил. Починил всё, кроме одной клавиши. «Mein Handy ist super!!!!!!!»"),
          {
            t: "game",
            task: "Найдите в сообщении Нильса главное: кто что пьёт.",
            hint: "Из десяти фактов Нильса важны обычно один-два.",
            c: spot("Nachricht von Nils", ["Hallo!!!!!!!|Mein Handy ist super!!!!!!!", "Ich trinke Kaffee!!!!!!!|Keinen Tee!!!!!!!", "Greta trinkt immer Cola!!!!!!!|Opa ist neunzig!!!!!!!"], ["Ich trinke Kaffee!!!!!!!", "Greta trinkt immer Cola!!!!!!!"]),
          },
          { t: "gap", rule: ["essen/negation-2"], task: "Что пьёт Нильс?", text: "Nils trinkt ___ Tee.", options: ["keinen", "kein", "nicht"], answer: "keinen", ru: "Нильс не пьёт чай." },
          narr("Also: die Cola an Tisch vier — Greta. Der Tee — того, кто сидел с ней. Нильс в это время пил Kaffee в Zimmer zwölf."),
          {
            t: "reply",
            rule: ["essen/gern-1"],
            task: "Нильс спрашивает: «Kaffee oder Tee???!!!» Ответьте за себя.",
            options: [
              ok("Ich trinke gern Tee."),
              ok("Ich trinke gern Kaffee."),
              no("Ich trinke gern keinen.", "Без существительного kein не стоит: Ich trinke keinen Kaffee."),
            ],
          },
          { t: "type", rule: ["essen/negation-2"], task: "Запишите вывод о Нильсе.", answers: ["Nils trinkt keinen Tee.", "Er trinkt keinen Tee.", "Nils trinkt Kaffee."], ru: "Нильс не пьёт чай." },
        ],
      },
      {
        label: "Фрауке",
        icon: "🐟",
        nodes: [
          frauke("Moin moin! Greta? Im Café? Mit zehn Männern!", "Привет-привет! Грета? В кафе? С десятью мужчинами!"),
          {
            t: "reply",
            task: "Фрауке всё умножает. Переспросите.",
            options: [
              ok("Zehn? Stimmt das?"),
              no("Zehn? Das stimmt.", "Это согласие, а не вопрос. Фрауке только этого и ждёт."),
              no("Zehn? Wie alt?", "Возраст тут ни при чём. Проверьте само число."),
            ],
          },
          frauke("Na gut … Ein Mann. Er ist groß. Mehr nicht.", "Ну ладно… Один мужчина. Он высокий. Больше ничего."),
          narr("Утром Фрауке понесла Rechnung за Fisch в порт и заблудилась: где вчера был проход, сегодня {stand}. Café — только издалека."),
          {
            t: "game",
            task: "Что из рассказа Фрауке правда?",
            c: verdict(["Stimmt", "Stimmt nicht"], [
              ["С Гретой было десять мужчин", false, "Фрауке умножает: мужчина был один."],
              ["Мужчина высокий", true, "Er ist groß — это Фрауке разглядела даже издалека."],
              ["Фрауке видела всё вблизи", false, "Она блуждала между новыми палатками с Rechnung в руке."],
            ]),
          },
          frauke("Und Nils! Er versteckt etwas! Unter der Jacke!", "А Нильс! Он что-то прячет! Под курткой!"),
          { ...narr("Слух уходит по очереди быстрее, чем Fischbrötchen. К обеду у Нильса под курткой уже zwei {bag}."), set: { rumours: 1 } },
          { t: "gap", task: "Что Фрауке видела на самом деле?", text: "Ein Mann. Er ist ___.", options: ["groß", "klein", "neu"], answer: "groß", ru: "Один мужчина. Он высокий." },
        ],
      },
      {
        label: "Касса Фрауке",
        icon: "💶",
        optional: true,
        nodes: [
          narr("Пока Фрауке блуждала, у киоска выросла очередь: Fischbrötchen, Fischbrötchen, Fischbrötchen. Касса не справляется."),
          frauke("Zwei Fischbrötchen? Das macht sieben Euro.", "Две булочки с рыбой? С вас семь евро."),
          narr("Турист даёт zehn Euro и ждёт. Фрауке смотрит на монеты, как на чужой язык."),
          { t: "game", task: "Выдайте туристу сдачу.", hint: "zehn − sieben = drei: три евро монетами.", c: { kind: "coins", coins: [200, 100, 50, 20, 10], answer: 300 } },
          frauke("Danke! Super!", "Спасибо! Отлично!"),
          { ...narr("Фрауке заводит журнал киоска: wer, was, wo. Теперь аккуратно — пригодится."), set: { frauke: 1 } },
        ],
      },
    ],
  },
  narr("Also: Mateo — Kaffee, Nils — Kaffee, Greta — Cola. An Tisch vier сидел высокий мужчина, молчал и пил Tee."),
  dana("Tee, kein Kaffee. Groß. Und kein Wort.", "Чай, не кофе. Высокий. И ни слова."),
  {
    t: "pick",
    task: "Кого напоминает описание?",
    options: [
      ok("Того, кто пьёт только чай и почти не говорит"),
      no("Матео", "Матео без кофе и без слов? Такого Матео Киль не видел."),
      no("Нильса", "Нильс пьёт кофе и пишет семью восклицательными знаками."),
    ],
  },
  hauke("Tee und kein Wort … Das kenne ich. Aber woher?", "Чай и ни слова… Знакомо. Но откуда?", ["kennen"]),
  { t: "type", task: "Запишите приметы мужчины со столика четыре.", answers: ["Er ist groß. Er trinkt Tee.", "Der Mann ist groß und trinkt Tee.", "Er ist groß und trinkt Tee.", "Der Mann ist groß. Er trinkt Tee."], ru: "Он высокий. Он пьёт чай." },
  { t: "game", task: "Разложите напитки дня по ящикам Йенсена: der, die, das.", hint: HINT_DOCK, c: docks(["der Kaffee", "der Tee", "die Cola", "die Milch", "das Wasser", "das Bier", "der Saft", "der Wein"]) },
  {
    t: "clue",
    title: "Wer trinkt Tee?",
    text: "Mateo: Kaffee. Nils: Kaffee. Greta: Cola. Der Mann an Tisch 4: Tee, kein Wort. Er ist groß. Frauke sieht nicht viel: она заблудилась между новыми ларьками.",
  },
];

// Интерлюдия глазами Матео. Бросок: честная улика · Грета · подарить · das Gemüse · 2 (мелочь).
const kitchen: SceneNode[] = [
  { t: "pic", src: "04-kitchen.jpg", alt: "Кухня клуба: Матео в белом фартуке над огромной миской, на столе бланк заказа с круглым коричневым следом, у задней двери бумажный пакет с овощами" },
  narr("Тем временем in der Küche. Матео печёт пробный Kuchen: заказ «für hundert» без пробы — не заказ, а авантюра."),
  narr("Рецепт Oma Hansen строгий: Butter — много, Zucker — {wenig}."),
  mateo("Drei Eier, zwei Tassen Milch … und Butter. Viel Butter!", "Три яйца, две чашки молока… и масло. Много масла!", ["das Ei", "die Tasse"]),
  {
    t: "game",
    task: "Отмерьте за Матео по рецепту Oma Hansen.",
    c: {
      kind: "quantity",
      items: [
        { id: "ei", text: "das Ei", max: 6 },
        { id: "milch", text: "die Tasse Milch", max: 4 },
      ],
      answer: { ei: 3, milch: 2 },
    },
  },
  narr("У Матео два любимых глагола: {riechen} и {schmecken}. Сначала нос, потом язык. Тесто пахнет как {butter}."),
  mateo("Hm! Das riecht gut. Und es schmeckt! Nicht zu bitter?", "М-м! Пахнет хорошо. И вкусно! Не слишком горько?"),
  narr("Стук в заднюю дверь. За ней никого — только бумажная Tüte и записка: «Danke für den Kuchen. G.»"),
  { t: "gap", rule: ["moin/fuer-ohne-1"], task: "Перепишите записку в блокнот.", text: "Danke für ___ Kuchen.", options: ["den", "der", "dem"], answer: "den", ru: "Спасибо за пирог." },
  {
    t: "look",
    task: "Загляните в пакет.",
    items: [
      { icon: "🥕", de: "das Gemüse", ru: "овощи", note: "Морковь, помидоры, лук-порей. Всё свежее, с рынка.", key: true },
      { icon: "🛍️", de: "die Tüte", ru: "пакет", note: "На пакете штамп рынка: «Markt · Gaarden». Gaarden — район на том берегу.", key: true },
      { icon: "🍅", de: "die Tomate", ru: "помидор", note: "Одна помидорина треснула. Матео съедает её на месте: проба." },
    ],
  },
  narr("Под овощами — ещё {obst}: одна {birne}, твёрдая как камень. Матео откладывает её на потом."),
  { t: "game", task: "Матео подписывает банки для пробы. Подскажите по буквам.", hint: HINT_SPELL, c: letters(["das Gemüse", "die Tomate", "die Tüte", "die Birne"]) },
  mateo("Gemüse von Greta! Tomaten, Karotten … aber keine Zwiebeln?", "Овощи от Греты! Помидоры, морковь… а лука нет?", ["das Gemüse"]),
  { t: "gap", rule: ["essen/akkusativ-3"], task: "Чего нет в пакете?", text: "Das ist Gemüse, aber ___ Zwiebeln.", options: ["keine", "kein", "nicht"], answer: "keine", ru: "Это овощи, но без лука." },
  narr("Под пакетом лежит бланк заказа «Kuchen für hundert». Внизу вместо подписи — круглый коричневый {fleck}, как от кружки с чаем."),
  narr("Снаружи шаги: Хауке идёт на запах. Матео накрывает бланк полотенцем."),
  hauke("Mateo! Was ist das? Ein Kuchen?", "Матео! Что это? Пирог?"),
  {
    t: "pick",
    task: "Что ответит Матео?",
    options: [
      ok("Kuchen? Nein! Das ist Brot."),
      no("Ja, ein Kuchen für hundert.", "Тайна Матео остаётся тайной: заказ он прячет даже от Хауке."),
      no("Das ist Gemüse von Greta.", "Про Грету Матео тоже молчит: это не его тайна."),
    ],
  },
  mateo("Kuchen? Nein! Das ist Brot. Brot für … die Möwen!", "Пирог? Нет! Это хлеб. Хлеб для… чаек!"),
  {
    t: "game",
    task: "Верно или нет? Вы видели больше, чем детектив.",
    c: verdict(["Richtig", "Falsch"], [
      ["Матео печёт пробный пирог «на сто»", true, "Заказ «Kuchen für hundert» лежит под полотенцем."],
      ["Грета оставила Матео овощи", true, "Записка «Danke für den Kuchen. G.» — от Греты."],
      ["Заказ подписан именем", false, "Вместо подписи — круглый след, как от кружки с чаем."],
    ]),
  },
  narr("Хауке уходит с куском «Brot». Детективу он ничего не расскажет: улику он съел по дороге."),
];

// Сцена 4 · поворот. Бросок главы: подарок · Грета · пообещать · das Café · 12.
const napkin: SceneNode[] = [
  { t: "pic", src: "04-greta.jpg", alt: "Кафе у воды после обеда: Грета в комбинезоне в пятнах краски молча кладёт купюру на счёт; перед ней стакан колы и салфетка; Хауке и Дана смотрят на неё, рядом официант с подносом" },
  narr("Vier Uhr — время Kaffee und Kuchen. Вы снова в Café: вдруг Грета придёт. И она приходит. Садится к вам, карандаш за ухом."),
  kellner("Wieder eine Cola?", "Снова колу?"),
  narr("Грета кивает. Хауке открывает рот для первого вопроса. Грета поднимает ладонь. Перед ней {serviette}, и на ней Грета пишет три слова."),
  { t: "gap", task: "Что написала Грета?", text: "Nicht ___, bitte.", options: ["fragen", "essen", "trinken"], answer: "fragen", ru: "Не спрашивайте, пожалуйста." },
  hauke("Okay. Keine Fragen. Kaffee und Kuchen!", "Ладно. Никаких вопросов. Кофе и пирог!"),
  kellner("Und Sie? Was hätten Sie gern?", "А вам? Что для вас?"),
  {
    t: "reply",
    rule: ["moin/haette-1"],
    task: "Закажите чай и кусок пирога — так же вежливо, как спросил официант.",
    options: [
      ok("Ich hätte gern einen Tee und ein Stück Kuchen."),
      no("Ich hätte gern ein Tee und ein Stück Kuchen.", "der Tee — мужского рода: einen Tee."),
      no("Ich habe gern einen Tee und ein Stück Kuchen.", "Ich habe gern — «я люблю иметь». Вежливая просьба — Ich hätte gern."),
    ],
  },
  narr("Für Hauke und Dana — Kaffee, für Sie — Tee, für Hauke und Sie — Kuchen, für Greta — Cola. Hunger у Даны нет."),
  {
    t: "game",
    task: "Кто что заказал?",
    hint: "Kuchen — у Хауке и у вас. Дана пьёт только кофе.",
    c: pairs([["Hauke", "einen Kaffee und ein Stück Kuchen"], ["Dana", "einen Kaffee"], ["Sie", "einen Tee und ein Stück Kuchen"], ["Greta", "eine Cola"]]),
  },
  { t: "type", task: "Запишите в блокнот, что заказала Грета.", answers: ["Greta bestellt eine Cola.", "Sie bestellt eine Cola.", "Greta bestellt Cola."], ru: "Грета заказывает колу." },
  hauke("Zahlen, bitte!", "Счёт, пожалуйста!", ["zahlen"]),
  kellner("Zusammen oder getrennt?", "Вместе или раздельно?", ["Zusammen oder getrennt?"]),
  {
    t: "reply",
    task: "Грета обводит рукой весь стол. Ответьте за неё официанту.",
    options: [
      ok("Zusammen, bitte."),
      no("Getrennt, bitte.", "Грета показывает на весь стол: значит, вместе."),
      no("Zusammen oder getrennt?", "Это вопрос официанта. Ему нужен ответ."),
    ],
  },
  kellner("Das macht achtzehn Euro dreißig.", "С вас восемнадцать евро тридцать."),
  {
    t: "hear",
    task: "Сколько стоит?",
    voice: "Eddy",
    de: "Das macht achtzehn Euro dreißig.",
    options: ["18,30 €", "13,80 €", "80,30 €"],
    answer: "18,30 €",
  },
  { t: "gap", task: "Как официант называет сумму?", text: "Das ___ achtzehn Euro dreißig.", options: ["macht", "hat", "ist"], answer: "macht", ru: "С вас восемнадцать евро тридцать." },
  narr("Грета даёт zwanzig Euro. Kellner считает сдачу медленно: он смотрит на Farbe на её пальцах."),
  { t: "game", task: "Отсчитайте Грете сдачу.", hint: "20,00 − 18,30 = 1,70: один евро, пятьдесят и двадцать центов.", c: { kind: "coins", coins: [200, 100, 50, 20, 10], answer: 170 } },
  narr("Грета берёт сдачу, допивает Cola и уходит так же молча. На стакане остаётся тёмно-синий {fleck}, на столе — {serviette}."),
  dana("Danke, Greta! … Sie bezahlt alles und sagt nichts.", "Спасибо, Грета!… Она платит за всё и ничего не говорит."),
  {
    t: "look",
    task: "Осмотрите, что Грета оставила на столе.",
    items: [
      { icon: "🥤", de: "das Glas", ru: "стакан", note: "На стакане тёмно-синий отпечаток пальца. Краска лодочная, wasserfest: не смылась.", key: true },
      { icon: "🧻", de: "die Serviette", ru: "салфетка", note: "Спереди: «Nicht fragen, bitte». А на обороте что-то нарисовано карандашом.", key: true },
      { icon: "🧾", de: "die Rechnung", ru: "счёт", note: "Счёт оплачен. Чаевые щедрые: Грета не мелочится." },
    ],
  },
  { t: "pic", src: "04-napkin.jpg", alt: "Салфетка крупно: карандашный эскиз таблички MOIN со стрелками размеров, рядом нарисована банка краски с вопросительным знаком; в углу круглый коричневый след от чашки" },
  narr("Вы переворачиваете {serviette}. На обороте карандашом — {skizze}: {schild} MOIN, размеры, стрелки. Рядом банка краски и вопрос: «Farbe?»"),
  hauke("Ein Schild! Sie macht ein neues Schild! Eine Kopie!", "Табличка! Она делает новую табличку! Копию!"),
  {
    t: "pick",
    task: "Что значит рисунок на салфетке?",
    options: [
      ok("Пока неясно: эскиз таблички и вопрос о краске"),
      no("Грета точно делает копию", "Это версия Хауке. На салфетке вопрос, а не ответ."),
      no("Это рисунок Нильса", "Почерк тот же, что в «Nicht fragen, bitte». Рисовала Грета."),
    ],
  },
  {
    t: "game",
    task: "В кафе шумно. Kellner убирает со стола Греты и что-то говорит. Какое слово прозвучало?",
    hint: "Слушайте одну-две буквы: Tasse — Tasche, Kuchen — Küche, Brot — Brötchen.",
    c: {
      kind: "sounds",
      rounds: [
        { say: "die Tasse", options: ["die Tasse", "die Tasche"] },
        { say: "der Kuchen", options: ["der Kuchen", "die Küche"] },
        { say: "das Brötchen", options: ["das Brötchen", "das Brot"] },
      ],
    },
  },
  narr("В углу {serviette} — круглый коричневый {fleck}: след от Tasse mit Tee. А Грета пьёт только Cola."),
  dana("Tee? Greta trinkt Cola. Die Serviette ist von Tisch vier!", "Чай? Грета пьёт колу. Салфетка со столика четыре!"),
  {
    t: "game",
    task: "Верно или нет? Что мы знаем о Грете.",
    c: verdict(["Richtig", "Falsch"], [
      ["Грета платит за всех", true, "Zusammen — и сдачу она взяла сама."],
      ["Грета пьёт кофе", false, "Wieder eine Cola: и утром, и сейчас — кола."],
      ["Эскиз Грета нарисовала сейчас, при вас", false, "На салфетке чайный след: она со столика четыре, с утра."],
    ]),
  },
  {
    t: "game",
    rule: ["essen/akkusativ-2"],
    task: "Соберите вывод Даны.",
    hint: "Глагол — на втором месте. der Mann после fragt становится den Mann.",
    c: order(["Greta", "fragt", "den", "Mann:", "Farbe?"], ["den", "Farbe?", "Greta", "Mann:", "fragt"]),
  },
  { t: "type", task: "Запишите в блокнот, кто заплатил.", answers: ["Greta bezahlt.", "Greta bezahlt alles.", "Sie bezahlt alles."], ru: "Грета платит (за всё)." },
  {
    t: "clue",
    title: "Die Serviette",
    text: "Vorne: «Nicht fragen, bitte». Hinten: eine Skizze — das Schild MOIN und «Farbe?». Auf der Serviette ist ein Teefleck, aber Greta trinkt Cola: die Serviette ist von Tisch vier. Greta bezahlt alles.",
  },
];

// Сцена 5 · кульминация: замок урока и письмо по образцу. Йенсен впервые говорит не Moin.
const tea: SceneNode[] = [
  { t: "pic", src: "04-board.jpg", alt: "Вечер в клубе: на столе счёт, салфетка и угол бирки; Дана и Хауке склонились над блокнотом; за окном проходит Йенсен с белой кружкой" },
  narr("Вечером im Club тихо. Дана раскладывает на столе всё, что принёс день: Rechnung, {serviette}, угол от {anhaenger}."),
  dana("Also: Der Mann trinkt Tee. Er möchte keinen Kaffee. Er ist groß.", "Итак: мужчина пьёт чай. Кофе он не хочет. Он высокий."),
  {
    t: "game",
    rule: ["essen/akkusativ-3", "essen/negation-2"],
    task: "Блокнот закрыт на фразы дня. Поверните диски.",
    hint: HINT_LOCK,
    c: lock([
      ["Он не хочет кофе.", [["Er", "Sie", "Ich"], ["möchte", "möchtest", "möchten"], ["keinen Kaffee.", "kein Kaffee.", "keine Kaffee."]]],
      ["Она берёт колу.", [["Sie", "Er", "Du"], ["nimmt", "nehme", "nimmst"], ["eine Cola.", "einen Cola.", "ein Cola."]]],
      ["Грета платит за всё.", [["Greta", "Mateo", "Nils"], ["bezahlt", "bezahle", "bezahlen"], ["alles.", "nichts.", "Kaffee."]]],
    ]),
  },
  narr("Wer trinkt im Club immer Tee? Ответ записан в блокноте с первого дня. Хауке его видит — и не хочет видеть."),
  narr("Kaffee в клубе пьёт Хауке — {meisten}. А Tee — только один человек."),
  hauke("Herr Jensen trinkt nur Tee. Aber Herr Jensen geht nie ins Café. Nie!", "Господин Йенсен пьёт только чай. Но господин Йенсен никогда не ходит в кафе. Никогда!"),
  {
    t: "pick",
    task: "Что ответить Хауке?",
    options: [
      ok("«Никогда» — это привычка, а не алиби"),
      no("Значит, это точно не Йенсен", "«Никогда» — не алиби. Привычки иногда меняются."),
      no("Значит, это точно Йенсен", "Чай пьёт пол-Киля. Йенсена в кафе никто не видел."),
    ],
  },
  narr("За окном проходит Йенсен с белой Tasse. Ярлычок от Tee намотан на ручку — аккуратно, по-морскому."),
  jensen("Moin.", "Привет."),
  {
    t: "reply",
    rule: ["kennenlernen/pronomen-1"],
    task: "Окликните Йенсена и спросите прямо: он пьёт кофе?",
    options: [
      ok("Herr Jensen, trinken Sie Kaffee?"),
      no("Herr Jensen, trinkst du Kaffee?", "С Йенсеном вы на «вы»: trinken Sie."),
      no("Herr Jensen, trinken Sie keinen Kaffee?", "Вопрос с готовым ответом. Спросите честно: trinken Sie Kaffee?"),
    ],
  },
  jensen("Tee.", "Чай."),
  {
    t: "hear",
    task: "Что сказал Йенсен?",
    voice: "Grandpa",
    de: "Tee.",
    options: ["Tee — чай", "Moin — привет", "Kaffee — кофе"],
    answer: "Tee — чай",
  },
  hauke("Er spricht! Ein Wort – und das Wort ist nicht Moin!", "Он говорит! Одно слово — и это не Moin!"),
  {
    t: "game",
    task: "Доска дня: кто что пьёт?",
    hint: "Загляните в блокнот: Tisch vier, сообщение Нильса и ответ Йенсена.",
    c: sort([["kaffee", "Kaffee"], ["tee", "Tee"], ["cola", "Cola"]], [
      ["mateo", "Mateo", "kaffee", "👨‍🍳"],
      ["nils", "Nils", "kaffee", "📱"],
      ["greta", "Greta", "cola", "🎨"],
      ["mann", "der Mann an Tisch 4", "tee", "🪑"],
      ["jensen", "Herr Jensen", "tee", "⚓"],
    ]),
  },
  {
    t: "game",
    rule: ["essen/negation-2"],
    task: "Два причала: где нужно отрицание nicht, а где — kein?",
    hint: "Перед существительным без артикля ставят kein, при глаголе и прилагательном — nicht.",
    c: {
      kind: "contrast",
      bays: [
        { id: "nicht", label: "nicht", sub: "действие / признак" },
        { id: "kein", label: "kein / keine / keinen", sub: "существительное" },
      ],
      items: [
        { id: "n1", text: "Das ist ___ Kuchen.", ru: "Это не пирог (существительное).", bay: "kein", why: "Существительное der Kuchen отрицают через kein: kein Kuchen." },
        { id: "n2", text: "Er möchte ___ Kaffee.", ru: "Он не хочет кофе.", bay: "kein", why: "Существительное der Kaffee в винительном падеже — keinen Kaffee." },
        { id: "n3", text: "Ich habe ___ Hunger.", ru: "Я не голоден (нет голода).", bay: "kein", why: "После haben с существительным — kein: keinen Hunger." },
        { id: "n4", text: "Der Kaffee ist ___ gut.", ru: "Кофе не хороший.", bay: "nicht", why: "Прилагательное gut отрицается через nicht." },
        { id: "n5", text: "Herr Jensen spricht ___ viel.", ru: "Йенсен говорит немного.", bay: "nicht", why: "Наречие и глагол отрицаются через nicht." },
        { id: "n6", text: "Greta hat ___ Zeit.", ru: "У Греты нет времени.", bay: "kein", why: "die Zeit — существительное: keine Zeit." },
      ],
    },
  },
  { t: "gap", task: "Что пьёт Йенсен?", text: "Herr Jensen trinkt nur ___.", options: ["Tee", "Kaffee", "Cola"], answer: "Tee", ru: "Господин Йенсен пьёт только чай." },
  {
    t: "game",
    rule: ["essen/akkusativ-3"],
    task: "Заполните карточку столика четыре.",
    hint: "Напитки — с артиклем в винительном: einen Tee, eine Cola, keinen Kaffee.",
    c: write("Tisch vier", [
      ["Greta trinkt …", "eine Cola", "Cola"],
      ["Der Mann trinkt …", "einen Tee", "Tee"],
      ["Kaffee?", "keinen Kaffee", "Nein, keinen Kaffee", "kein Kaffee"],
    ]),
  },
  narr("Тот же Tee, тот же рост, то же молчание. Но «Farbe?» — к кому вопрос? Дана предлагает написать Грете: danke — и keine Fragen."),
  {
    t: "game",
    rule: ["essen/akkusativ-3"],
    task: "Напишите Грете записку по образцу: записке Даны Матео. Подписываются двое, Хауке и Дана, поэтому вместо ich — wir.",
    hint: HINT_LETTER,
    c: letter(
      "Greta",
      ["Lieber Mateo,", "danke für den Kaffee! Der Kaffee ist super.", "Ich habe keinen Hunger, aber Durst.", "Viele Grüße", "Dana"],
      [
        an("Liebe", "Greta"),
        ["Danke → für den Kaffee und den Kuchen", "danke für den Kaffee und den Kuchen!", "Danke für den Kaffee und den Kuchen!"],
        ["Kuchen → super", "Der Kuchen ist super.", "der Kuchen ist super."],
        ["Wir → keine Fragen", "Wir haben keine Fragen.", "wir haben keine Fragen."],
        gruss("Hauke und Dana"),
      ],
    ),
  },
  mateo("Brot für alle! Mit Butter und Zucker. Das ist kein Kuchen!", "Хлеб всем! С маслом и сахаром. Это не пирог!"),
  {
    t: "hear",
    task: "Что принёс Матео — по его словам?",
    voice: "Reed",
    de: "Brot für alle! Mit Butter und Zucker. Das ist kein Kuchen!",
    options: ["хлеб", "пирог", "суп"],
    answer: "хлеб",
  },
  {
    t: "pick",
    task: "Что теперь в блокноте?",
    options: [
      ok("Собеседник Греты пьёт чай, как Йенсен. Проверять дальше"),
      no("Йенсен встречался с Гретой — доказано", "Доказано пока одно: оба пьют чай. Чай пьёт пол-Киля."),
      no("Грета встречалась с Матео", "Матео пьёт только кофе. Kaffee? Ja."),
    ],
  },
  { t: "game", task: "Хауке репетирует фразы для кафе. Повторите за ним вслух.", hint: HINT_SAY, c: speak(["Zusammen oder getrennt?", "Guten Appetit!", "die Speisekarte"]) },
  {
    t: "type",
    rule: ["essen/negation-2"],
    task: "Запишите в блокнот главное за день.",
    answers: ["Der Mann trinkt Tee, keinen Kaffee.", "Der Mann trinkt Tee und keinen Kaffee.", "Er trinkt Tee, keinen Kaffee.", "Einen Tee, keinen Kaffee."],
    ru: "Мужчина пьёт чай, не кофе.",
  },
  {
    t: "clue",
    title: "Einen Tee, keinen Kaffee",
    text: "Der Mann an Tisch 4 trinkt Tee, keinen Kaffee. Herr Jensen trinkt nur Tee — и сегодня впервые сказал не Moin, а Tee. Aber: Herr Jensen geht nie ins Café?",
  },
];

// Сцена 6 · эпилог и крючок: речь как на экзамене и улика для главы 5.
const evening: SceneNode[] = [
  { t: "pic", src: "04-evening.jpg", alt: "Вечер у ларька с донерами: Хауке, Дана и Элиф ужинают за высоким столиком, на крыше фургона сидит чайка с кольцом; вдали у пустой подставки стоит Йенсен с кружкой" },
  narr("Abendessen сегодня у фургона Дерьи: она открылась первой на всей Kiellinie. Хауке заказывает für alle — это опаснее, чем Матео."),
  derya("Moin! Was möchtet ihr essen und trinken?", "Привет! Что вы хотели бы поесть и попить?"),
    hauke("Drei Döner und drei Cola!", "Три донера и три колы!"),
  dana("Hauke! Ich esse kein Fleisch.", "Хауке! Я не ем мяса.", ["das Fleisch"]),
  { t: "gap", rule: ["essen/negation-2"], task: "Что говорит Дана?", text: "Ich esse ___ Fleisch.", options: ["kein", "keinen", "nicht"], answer: "kein", ru: "Я не ем мяса." },
  hauke("Ich habe Durst! Noch eine Cola, bitte!", "Я хочу пить! Ещё одну колу, пожалуйста!", ["Durst haben"]),
  elif("Und ich trinke keine Cola. Einen Saft, bitte!", "А я не пью колу. Сок, пожалуйста!"),
  {
    t: "hear",
    task: "Что хочет Элиф?",
    voice: "Flo",
    de: "Und ich trinke keine Cola. Einen Saft, bitte!",
    options: ["сок", "колу", "воду"],
    answer: "сок",
  },
  {
    t: "game",
    rule: ["essen/akkusativ-3", "essen/negation-2"],
    task: "Исправьте заказ Хауке: Дане — рыбу, Элиф — сок.",
    hint: "der Saft → einen Saft; das Fleisch без артикля → kein Fleisch.",
    c: gaps("Zwei Döner, ein Fischbrötchen, zwei Cola und ___ Saft, bitte! Dana isst ___ Fleisch.", ["einen", "kein", "eine", "keinen"], ["einen", "kein"]),
  },
  derya("Guten Appetit!", "Приятного аппетита!", ["Guten Appetit!"]),
  {
    t: "reply",
    task: "Дерья желает приятного аппетита. Ответьте.",
    options: [
      ok("Danke!"),
      ok("Danke, guten Appetit!"),
      no("Gute Nacht!", "До ночи ещё далеко: сначала донер."),
    ],
  },
  elif("Die Möwe hat heute ein Fischbrötchen. Sie hat keinen Hunger!", "У чайки сегодня уже была рыбная булочка. Она не голодна!"),
  narr("{moewe} на крыше фургона смотрит на Fischbrötchen Даны так, будто Hunger — это мировоззрение."),
  {
    t: "game",
    task: "Пока несут заказ, Элиф устраивает проверку: одно слово в стопке лишнее.",
    hint: HINT_ODD,
    c: odd([
      [["der Döner", "das Fischbrötchen", "die Suppe", "die Cola"], "die Cola", "Колу пьют, остальное едят."],
      [["der Kaffee", "der Tee", "der Saft", "der Käse"], "der Käse", "Сыр едят, остальное пьют."],
      [["die Tasse", "das Glas", "das Stück", "die Tomate"], "die Tomate", "Помидор — еда, остальное — мера: eine Tasse, ein Glas, ein Stück."],
    ]),
  },
  {
    t: "go",
    task: "Слух Фрауке дошёл и до ларька.",
    next: "Дальше по делу",
    branches: [
      {
        label: "Сверить слух о Нильсе",
        icon: "🗞️",
        optional: true,
        nodes: [
          narr("«Nils versteckt etwas!» — шепчет очередь к Дерье. Вы пишете Нильсу. Клавиша «!» всё ещё залипает."),
          narr("«Unter der Jacke??? Ein Fischbrötchen!!!!!!! Die Möwe isst alles!!!!!!!»"),
          {
            t: "game",
            task: "Поставьте штамп: это сказано в сообщении Нильса или нет?",
            c: verdict(["Gesagt", "Nicht gesagt"], [
              ["Под курткой — рыбная булочка", true, "«Ein Fischbrötchen!!!!!!!» — так и написал."],
              ["Нильс прячет табличку", false, "Об этом Нильс не писал. Это уже слух."],
              ["Нильс прячет булочку от чайки", true, "«Die Möwe isst alles!!!!!!!» — он защищал обед."],
            ]),
          },
          { t: "type", rule: ["essen/akkusativ-4"], task: "Напишите Фрауке, что было под курткой.", answers: ["Das ist ein Fischbrötchen.", "Das ist nur ein Fischbrötchen.", "Nils hat ein Fischbrötchen."], ru: "Это (всего лишь) рыбная булочка." },
          { ...narr("Фрауке разочарована: Fischbrötchen — не тайна. Но в журнал киоска записывает честно. Слух сдулся."), set: { rumours: -1 } },
        ],
      },
    ],
  },
  narr("Вы снова достаёте {serviette}. «Farbe?» Какая Farbe и где её покупают? Элиф знает: Farbe для Boote — только в магазине у гавани."),
  elif("Farbe für Boote? Sie ist wasserfest – wie die Möwe!", "Краска для лодок? Она не боится воды — как чайка!"),
  {
    t: "game",
    task: "Хауке устраивает репетицию экзамена. Тема дня — еда и напитки.",
    hint: HINT_ORAL,
    c: oral([
      oralSay(2, ASK, "Thema: Essen und Trinken · Wort: Fisch", "Isst du gern Fisch?", "Ты любишь рыбу?", "Isst du gern …?"),
      oralReply(2, ANSWER, "Trinkst du gern Kaffee?", "Nein, ich trinke keinen Kaffee. Ich trinke gern Tee.", "Нет, я не пью кофе. Я люблю чай."),
      oralSay(3, REQUEST, "🥤", "Eine Cola, bitte!", "Колу, пожалуйста!"),
    ]),
  },
  narr("Ещё {nachricht} от Нильса — без «!». Клавишу он, видимо, выковырял. Значит, важное."),
  narr("«Greta ist morgen nicht da. Sie hat eine Liste. Nummer eins: Farbe.»"),
  {
    t: "game",
    rule: ["kennenlernen/wortstellung-3"],
    task: "Соберите главный вопрос на завтра.",
    hint: "W-вопрос: вопросительное слово, потом глагол.",
    c: order(["Wer", "hat", "die", "Farbe?"], ["Farbe?", "die", "Wer", "hat"]),
  },
  { t: "game", task: "Слова дня перемешались. Откройте пары: немецкое слово и перевод.", c: memory(["stand", "tablett", "serviette", "skizze", "fleck", "aufsteller"]) },
  {
    t: "pick",
    task: "Куда завтра?",
    options: [
      ok("В магазин у гавани: кто покупает лодочную краску"),
      no("В кафе: ещё раз к столику четыре", "Столик vier вы уже осмотрели. Салфетка спрашивает о краске."),
      no("К Йенсену: спросить прямо", "Вы уже спросили. Он ответил: Tee."),
    ],
  },
  narr("Хауке достаёт карточки: лото перед сном, только еда и напитки. Чайка смотрит на карточку с Fischbrötchen."),
  { t: "game", task: "Лото на ночь: послушайте слово и закройте его на карточке.", hint: HINT_HEAR, c: bingo(["der Kaffee", "der Tee", "die Milch", "das Wasser", "der Saft", "die Cola", "das Brot", "der Kuchen", "das Fischbrötchen"]) },
  narr("Вы закрываете блокнот: «День четвёртый. Найдено: Rechnung Tisch vier, {serviette} с {skizze}, Tee ohne Kaffee». Noch acht Tage."),
  {
    t: "clue",
    title: "Farbe?",
    text: "Die Skizze: das Schild MOIN und «Farbe?». Wer hat die Farbe? Greta hat eine Liste: Nummer eins — Farbe. Завтра — магазин у гавани.",
  },
];

// Проверка после глав 1–4 (A1-PLOT.md, «Проверки в игре»): неожиданное событие заставляет свести
// найденное за четыре дня — на слух, в чтении, в записи и вслух, только знакомым языком. Броски
// (seed 1794766319): Элиф подслушивает у супа, и часы тикают сильнее: газета уходит в печать в десять;
// Грета по своей черте ломает донер — и уходит от фото; Матео забывает «ein Stück», и тайна торта
// остаётся тайной (обратный эффект).
const newspaper: SceneNode[] = [
  { t: "pic", src: "04-zeitung.jpg", alt: "Поздний вечер у жёлтого фургона Дерьи: Элиф с тарелкой супа оборачивается к соседнему столику, где репортёр с блокнотом говорит по телефону; Грета с донером, у её ног чайка" },
  narr("Уже темно, но у фургона Дерьи светло. Элиф ест Suppe — и вдруг замирает с ложкой: за соседним столиком говорит по телефону мужчина с блокнотом."),
  {
    t: "clue",
    title: "Das Notizbuch",
    text: "Tag 1: Das Schild MOIN ist weg, der Aufsteller ist da. Tag 4: Tisch vier — eine Cola, ein Tee, kein Kaffee. Greta trinkt Cola. Herr Jensen: Tee. Nils: kein Schild, ein Fischbrötchen.",
  },
  elif("Psst! Der Mann ist von der Zeitung!", "Тсс! Этот мужчина из газеты!", ["die Zeitung"]),
  reporter("Morgen in der Zeitung: Kein Schild, kein Start! Und ein Mann aus Hamburg versteckt etwas!", "Завтра в газете: нет таблички — нет старта! И мужчина из Гамбурга что-то прячет!"),
  {
    t: "hear",
    task: "Что завтра напишет газета?",
    voice: "Eddy",
    de: "Morgen in der Zeitung: Kein Schild, kein Start! Und ein Mann aus Hamburg versteckt etwas!",
    options: ["Нет таблички — нет старта, и мужчина из Гамбурга что-то прячет", "Табличку нашли, старт будет", "Клуб ищет мужчину из Гамбурга"],
    answer: "Нет таблички — нет старта, и мужчина из Гамбурга что-то прячет",
  },
  narr("Ein Mann aus Hamburg — это Нильс, а «прячет» — слух Фрауке. Репортёр смотрит на часы: um zehn газета уходит в печать. Сейчас neun."),
  {
    t: "pick",
    task: "У вас час. Что делать?",
    options: [
      ok("Подойти и рассказать факты из блокнота, пока газета не ушла в печать"),
      no("Ничего: завтра все и так узнают правду", "Завтра все прочитают слух о Нильсе. Правду знает только ваш блокнот."),
      no("Позвонить Нильсу, пусть сам объясняет", "Нильс ответит семью «!!!» — и газета уйдёт в печать."),
    ],
  },
  {
    t: "reply",
    rule: ["kennenlernen/pronomen-1"],
    task: "Подойдите к репортёру. Он незнакомый взрослый.",
    options: [
      ok("Guten Abend! Wir sind vom Club. Haben Sie Zeit?"),
      no("Hallo! Hast du Zeit?", "С незнакомым взрослым — на «вы»: Haben Sie."),
      no("Moin! Kein Foto, bitte!", "Фото он ещё не просил. Сначала поздоровайтесь и предложите факты."),
    ],
  },
  reporter("Gut! Hier ist mein Text. Richtig oder falsch?", "Хорошо! Вот мой текст. Правильно или нет?"),
  {
    t: "game",
    task: "Репортёр читает черновик заметки. Сверьте с блокнотом: так или нет?",
    hint: "Всё нужное — на странице «Das Notizbuch» в блокноте.",
    outcome: { clean: { rumours: -1 }, sloppy: { rumours: 1 } },
    c: verdict(["Richtig", "Falsch"], [
      ["Das Schild MOIN ist weg.", true, "Так и есть: с первого утра подставка пустая."],
      ["Der Aufsteller ist weg.", false, "Подставка на месте: пропала только табличка."],
      ["Nils versteckt das Schild.", false, "Под курткой у Нильса была рыбная булочка, а не табличка."],
      ["Der Mann an Tisch vier trinkt Tee.", true, "Tisch vier: eine Cola, ein Tee — и ни одного кофе."],
      ["Greta trinkt Kaffee.", false, "Грета пьёт колу. Kaffee пьют Матео и Нильс."],
      ["Herr Jensen sagt heute: Tee.", true, "Сегодня Йенсен впервые сказал не Moin, а Tee."],
    ]),
  },
  narr("Тут подходит Матео с кастрюлей Suppe. На любой вопрос у него есть ответ — и иногда это не тот ответ."),
  reporter("Und Sie? Was kochen Sie für die Kieler Woche?", "А вы? Что вы готовите к Кильской неделе?"),
  mateo("Ein Stück … nein! Nur Brot!", "Кусок… нет! Только хлеб!"),
  {
    t: "gap",
    rule: ["essen/akkusativ-3"],
    task: "Что записал репортёр?",
    text: "Mateo hat ___ Brot.",
    options: ["ein", "einen", "eine"],
    answer: "ein",
    ru: "У Матео хлеб.",
  },
  narr("За соседним столиком Грета доедает Döner. Репортёр замечает её комбинезон в краске и поднимает фотоаппарат."),
  reporter("Und Sie, junge Frau? Ein Foto, bitte!", "А вы, девушка? Фото, пожалуйста!"),
  narr("Грета молча ломает Döner пополам. Половину — чайке. Чайка бросается за ней прямо через фотоаппарат, а Греты уже нет."),
  {
    t: "pick",
    task: "Почему Грета ушла?",
    options: [
      ok("Она не хочет в газету — как не хотела и на фото Нильса"),
      no("Ей не понравился донер", "Донер она ела с удовольствием — до фотоаппарата."),
      no("Она испугалась чайки", "Чайку она позвала сама: половиной донера."),
    ],
  },
  reporter("Schade. Jetzt Sie! Wer sind Sie? Und was ist richtig?", "Жаль. Теперь вы! Кто вы? И как всё было на самом деле?"),
  {
    t: "game",
    task: "Интервью для газеты. Сначала ответьте вслух сами, потом сверьтесь с образцом.",
    hint: HINT_ORAL,
    c: oral([
      oralSay(1, "Представьтесь репортёру: имя и откуда вы.", "Name · Land", "Ich heiße Hauke. Ich komme aus Kiel.", "Меня зовут Хауке. Я из Киля."),
      oralReply(2, ANSWER, "Was trinkt der Mann an Tisch vier?", "Er trinkt Tee. Er möchte keinen Kaffee.", "Он пьёт чай. Кофе он не хочет."),
      oralReply(2, ANSWER, "Und was hat Nils unter der Jacke?", "Ein Fischbrötchen. Nils versteckt kein Schild.", "Рыбную булочку. Нильс не прячет табличку."),
    ]),
  },
  reporter("Gut! Und jetzt bitte hier, im Notizbuch. Schnell!", "Хорошо! А теперь, пожалуйста, вот сюда, в блокнот. Быстро!"),
  {
    t: "game",
    rule: ["essen/akkusativ-4"],
    task: "Заполните для репортёра карточку фактов.",
    hint: "Что у кого — в винительном: einen Tee, ein Fischbrötchen.",
    c: write("Fakten für die Zeitung", [
      ["Was ist weg?", "das Schild", "das Schild MOIN", "Schild", "Schild MOIN"],
      ["Nils hat …", "ein Fischbrötchen", "Fischbrötchen"],
      ["Der Mann an Tisch 4 trinkt …", "einen Tee", "Tee", "Tee, keinen Kaffee"],
      ["Auf der Serviette: …", "Farbe?", "Farbe", "eine Skizze", "Nicht fragen, bitte", "Nicht fragen, bitte."],
    ]),
  },
  narr("Пока репортёр переписывает карточку, Хауке раскладывает на столе всё, что нашёл день: {aufsteller}, {serviette}, {skizze}, Rechnung."),
  {
    t: "game",
    task: "Слова четырёх дней перемешались. К какому причалу каждое: der, die или das?",
    hint: HINT_DOCK,
    c: docks(["der Aufsteller", "die Serviette", "das Schild", "die Skizze", "der Stand", "die Rechnung", "das Tablett", "der Fleck"]),
  },
  narr("Репортёру нужен ещё заголовок — одно предложение, коротко. Хауке уже знает какое."),
  {
    t: "game",
    rule: ["kennenlernen/wortstellung-3"],
    task: "Соберите заголовок для завтрашней газеты.",
    hint: "Глагол — на втором месте, kein — перед существительным.",
    c: order(["Der", "Club", "hat", "kein", "Schild."], ["kein", "hat", "Schild.", "Club", "Der"]),
  },
  reporter("Danke! Morgen in der Zeitung: Der Club hat kein Schild. Und Nils? Nils hat ein Fischbrötchen!", "Спасибо! Завтра в газете: у клуба нет таблички. А Нильс? У Нильса рыбная булочка!"),
  {
    t: "type",
    rule: ["kennenlernen/wortstellung-3"],
    task: "Запишите в блокнот, что завтра будет в газете.",
    answers: ["Der Club hat kein Schild.", "Der Club hat kein Schild MOIN.", "Wir haben kein Schild."],
    ru: "У клуба нет таблички.",
  },
  {
    t: "clue",
    title: "Vier Tage",
    text: "Morgen in der Zeitung: Der Club hat kein Schild. Nils: ein Fischbrötchen, kein Schild. Greta: kein Foto. Mateo: nur Brot?",
  },
];

const play = (nodes: SceneNode[]) => ({ kind: "play" as const, nodes });
const HINT = "Ошибка ничего не стоит: собеседник отреагирует, и можно выбрать снова.";

export const sceneChapter4: Episode = {
  id: "moin-neu-4",
  title: "Keinen Kaffee",
  day: { de: "Noch neun Tage", ru: "ещё девять дней до Kieler Woche" },
  place: "Kiellinie · кафе у воды",
  topic: "Еда и напитки",
  grammar: "möchten · einen, keinen: винительный падеж · nicht или kein",
  beats: [
    {
      id: "04-s1",
      title: "Kaffee? Ja.",
      story: [],
      prompt: "Первые ларьки Kieler Woche, кофе Матео и фургон с донерами у пустой подставки.",
      hint: HINT,
      success: "Грета сегодня в кафе. Йенсен держит место таблички пустым.",
      challenge: play(stands),
    },
    {
      id: "04-s2",
      title: "Tisch vier",
      story: [],
      prompt: "Кафе у воды, заказ Матео и пустой столик четыре.",
      hint: "der Kaffee → einen Kaffee, keinen Kaffee. Меняется только мужской род.",
      success: "За столиком четыре пили колу и чай. Кофе никто не пил.",
      challenge: play(back(table, 4, 2)),
    },
    {
      id: "04-s3",
      title: "Wer trinkt Tee?",
      story: [],
      prompt: "Сообщение Нильса, рассказ Фрауке и её касса.",
      hint: "kein — перед существительным: keinen Tee. nicht — перед остальным: nicht gern.",
      success: "Ни Матео, ни Нильс. Собеседник Греты высокий, молчит и пьёт чай.",
      challenge: play(back(witnesses, 4, 0)),
    },
    {
      id: "04-i1",
      title: "Глазами Матео",
      pov: "глазами Матео",
      story: [],
      prompt: "Интерлюдия: пробный пирог, пакет у задней двери и бланк заказа.",
      hint: "keine Zwiebeln: во множественном kein становится keine.",
      success: "Матео печёт пирог на сто человек. Детектив об этом пока не знает.",
      challenge: play(kitchen),
    },
    {
      id: "04-s4",
      title: "Nicht fragen, bitte",
      story: [],
      prompt: "Грета приходит в кафе, платит за всех и оставляет салфетку.",
      hint: "Zusammen oder getrennt? — вместе или раздельно. Das macht … Euro — с вас … евро.",
      success: "На обороте салфетки — эскиз таблички и вопрос «Farbe?».",
      challenge: play(napkin),
    },
    {
      id: "04-s5",
      title: "Einen Tee, keinen Kaffee",
      story: [],
      prompt: "Доска дня, вопрос Йенсену и записка Грете.",
      hint: "Er möchte keinen Kaffee: möchte без -t, keinen — мужской род.",
      success: "Собеседник Греты пьёт чай, как Йенсен. А Йенсен сказал не Moin.",
      challenge: play(back(tea, 4, 3)),
    },
    {
      id: "04-s6",
      title: "Farbe?",
      story: [],
      prompt: "Ужин у фургона Дерьи, слух о Нильсе и вопрос о краске.",
      hint: "Ich esse kein Fleisch: без артикля — kein.",
      success: "День четвёртый почти закончен. Завтра — магазин. Noch acht Tage.",
      challenge: play(back(evening, 4, 1)),
    },
    {
      id: "04-c1",
      title: "Die Zeitung",
      story: [],
      prompt: "Проверка глав 1–4: репортёр, газета в печать к десяти и факты четырёх дней.",
      hint: "Сверяйтесь с блокнотом: всё нужное вы уже нашли.",
      success: "Факты четырёх дней сведены. Завтра в газете — правда, а не слух. Noch acht Tage.",
      challenge: play(newspaper),
    },
  ],
};
