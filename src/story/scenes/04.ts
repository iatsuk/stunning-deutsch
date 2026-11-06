import {
  an, ANSWER, ASK, bingo, docks, gaps, gruss, gull as race, HINT_DOCK, HINT_HEAR, HINT_LETTER, HINT_LOCK, HINT_ODD,
  HINT_ORAL, HINT_PICTURE, HINT_RACE, HINT_SAY, HINT_SPELL, letter, letters, lock, odd, oral, order, pairs, RACE,
  REQUEST, reply as oralReply, say as oralSay, scene, sort, speak, spot, verdict, write,
} from "../build.ts";
import { phrases } from "../data.ts";
import type { ChatTurn, Challenge, Episode, SceneNode } from "../types.ts";

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
  narr("Четвёртый день, noch neun Tage. За ночь Kiellinie не узнать: у воды встал первый {stand} Kieler Woche, за ним ещё пять."),
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
  {
    t: "game",
    task: "Послушайте слово из меню Дерьи и нажмите на картинку.",
    hint: HINT_PICTURE,
    c: scene([["der Döner", "🥙"], ["das Fischbrötchen", "🐟"], ["die Cola", "🥤"], ["der Salat", "🥗"], ["die Suppe", "🍲"], ["die Wurst", "🌭"], ["der Käse", "🧀"], ["die Tomate", "🍅"]]),
  },
  { t: "game", task: "Дерья пишет меню мелом. Подскажите по буквам.", hint: HINT_SPELL, c: letters(["der Döner", "der Salat", "die Wurst"]) },
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
    rule: ["essen/akkusativ-3"],
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
  narr("Kellner несёт {tablett}: drei Kaffee, ein Tee, zwei Stück Kuchen — и zwei Fischbrötchen к соседнему столику."),
  {
    t: "game",
    task: "Kellner расставляет заказ. Что в чём подают?",
    hint: "Мера и то, что в ней: второе слово не меняется — eine Tasse Tee, ein Glas Wasser.",
    c: pairs([["eine Tasse", "Tee"], ["ein Glas", "Wasser"], ["ein Stück", "Kuchen"], ["die Speisekarte", "Kaffee, Tee, Cola"]]),
  },
  {
    ...narr("{moewe} пикирует прямо на {tablett}. Ein Fischbrötchen исчезает в небе. Взамен в молочник падает что-то бумажное."),
    set: { gull: 1 },
  },
  { t: "game", task: `Спасите слова с подноса, пока чайка не вернулась! ${RACE}`, hint: HINT_RACE, c: race(["der Kaffee", "der Tee", "die Milch", "das Fischbrötchen", "der Kuchen", "das Wasser"]) },
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
          { ...narr("Фрауке заводит журнал киоска: wer, was, wann. Теперь аккуратно — пригодится."), set: { frauke: 1 } },
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
  hauke("Tee und kein Wort … Das kenne ich. Aber woher?", "Чай и ни слова… Знакомо. Но откуда?"),
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
  narr("Стук в заднюю дверь. За ней никого — только бумажная Tüte и записка: «Danke für den Kuchen. G.»"),
  {
    t: "look",
    task: "Загляните в пакет.",
    items: [
      { icon: "🥕", de: "das Gemüse", ru: "овощи", note: "Морковь, помидоры, лук-порей. Всё свежее, с рынка.", key: true },
      { icon: "🛍️", de: "die Tüte", ru: "пакет", note: "На пакете штамп рынка: «Markt · Gaarden». Gaarden — район на том берегу.", key: true },
      { icon: "🍅", de: "die Tomate", ru: "помидор", note: "Одна помидорина треснула. Матео съедает её на месте: проба." },
    ],
  },
  { t: "game", task: "Матео подписывает банки для пробы. Подскажите по буквам.", hint: HINT_SPELL, c: letters(["das Gemüse", "die Tomate", "die Tüte"]) },
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
  narr("Für Hauke und Dana — Kaffee, für Sie — Tee, für Hauke und Sie — Kuchen, für Greta — Cola. Hunger у Даны нет."),
  {
    t: "game",
    task: "Кто что заказал?",
    hint: "Kuchen — у Хауке и у вас. Дана пьёт только кофе.",
    c: pairs([["Hauke", "einen Kaffee und ein Stück Kuchen"], ["Dana", "einen Kaffee"], ["Sie", "einen Tee und ein Stück Kuchen"], ["Greta", "eine Cola"]]),
  },
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
  { t: "game", task: "Перепишите слова со стола Греты по буквам.", hint: HINT_SPELL, c: letters(["die Farbe", "das Glas", "die Rechnung"]) },
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
    task: "Напишите Грете записку по образцу: записке Даны Матео.",
    hint: HINT_LETTER,
    c: letter(
      "Greta",
      ["Lieber Mateo,", "danke für den Kaffee! Der Kaffee ist super.", "Ich habe keinen Hunger, aber Durst.", "Viele Grüße", "Dana"],
      [
        an("Liebe", "Greta"),
        ["Danke → für den Kaffee und den Kuchen", "danke für den Kaffee und den Kuchen!", "Danke für den Kaffee und den Kuchen!"],
        ["Kuchen → super", "Der Kuchen ist super.", "der Kuchen ist super."],
        ["Fragen → keine", "Ich habe keine Fragen.", "Wir haben keine Fragen."],
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
      challenge: play(table),
    },
    {
      id: "04-s3",
      title: "Wer trinkt Tee?",
      story: [],
      prompt: "Сообщение Нильса, рассказ Фрауке и её касса.",
      hint: "kein — перед существительным: keinen Tee. nicht — перед остальным: nicht gern.",
      success: "Ни Матео, ни Нильс. Собеседник Греты высокий, молчит и пьёт чай.",
      challenge: play(witnesses),
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
      challenge: play(tea),
    },
    {
      id: "04-s6",
      title: "Farbe?",
      story: [],
      prompt: "Ужин у фургона Дерьи, слух о Нильсе и вопрос о краске.",
      hint: "Ich esse kein Fleisch: без артикля — kein.",
      success: "День четвёртый закончен. Завтра — магазин. Noch acht Tage.",
      challenge: play(evening),
    },
  ],
};
