import { an, ANSWER, ASK, bingo, docks, gaps, gruss, gull as race, HINT_DOCK, HINT_HEAR, HINT_LETTER, HINT_LOCK, HINT_ODD, HINT_ORAL, HINT_PICTURE, HINT_RACE, HINT_SAY, HINT_SPELL, letter, letters, lock, odd, oral, order, pairs, RACE, RACE_STAKES, reply as oralReply, REQUEST, say as oralSay, scene, sort, speak, verdict, write } from "../build.ts";
import { phrases } from "../data.ts";
import type { ChatTurn, Challenge, Episode, SceneNode } from "../types.ts";

// Глава 5 в формате сцен (A1-PLOT.md, «Формат сцен»): покупки и одежда, цены и количества, ihn/sie/es,
// welcher, zu groß. Вопрос главы — кто купил краску. Вход — салфетка «Farbe?» и записка Нильса
// «Greta hat eine Liste», выход — чек лавки (литр тёмно-синей, 17:05) и описание покупателя,
// который говорит только Moin; Матео прячет сахар. Немецкий — из уроков 1–5 и выражений истории;
// новые слова урока — в learn у реплики. Повороты брошены оракулом (seed 1794014838), увязка — в
// журнале A1-STORYCRAFT.md.

const narr = (text: string): SceneNode => ({ t: "narr", text });
const learn = (words?: string[]) => (words ? { learn: words } : {});
const hauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Hauke", voice: "Rocko", de, ru, ...learn(words) });
const jensen = (de: string, ru: string): SceneNode => ({ t: "say", who: "Herr Jensen", voice: "Grandpa", de, ru });
const elif = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Elif", voice: "Flo", de, ru, ...learn(words) });
const dana = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Dana", voice: "Anna", de, ru, ...learn(words) });
const mateo = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Mateo", voice: "Reed", de, ru, ...learn(words) });
const frauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frauke", voice: "Sandy", de, ru, ...learn(words) });
const kruse = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frau Kruse", voice: "Shelley", de, ru, ...learn(words) });
/** Покупатель в интерлюдии: читатель слышит голос, но имени фрау Крузе не знает. */
const stranger = (de: string, ru: string): SceneNode => ({ t: "say", who: "Der Mann", voice: "Grandpa", de, ru });
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

// Сцена 1 · пролог и завязка. Броски: новый человек · Дана · промокнуть · die Hose · 15 (ливень, и
// Дане нужны брюки; новый человек — в сцене 2), неприятность · Хауке · перепутать · das Hemd · 3
// (мелочь). Бросок главы из плана: улика · Грета · отказаться · die Zwiebel · 9 — список Греты.
const rain: SceneNode[] = [
  { t: "pic", src: "05-rain.jpg", alt: "Утро на Kiellinie под внезапным ливнем: Дана в промокшем бежевом тренче прижимает к себе книгу и бумажный стакан, Хауке в жёлтой куртке с капюшоном смеётся, на пустой подставке сидит мокрая чайка" },
  narr("Пятый день, noch acht Tage. Солнце над Kiellinie — ровно fünf минут. Und dann: {rain}"),
  hauke("Es regnet! Das ist Kiel!", "Идёт дождь! Это Киль!"),
  dana("Meine Hose! Ich brauche eine Hose!", "Мои брюки! Мне нужны брюки!", ["die Hose", "brauchen"]),
  hauke("Hier, Dana! Meine Jacke!", "Вот, Дана! Моя куртка!", ["die Jacke"]),
  {
    t: "reply",
    rule: ["essen/negation-2"],
    task: "Подскажите Хауке: куртка Дане не поможет.",
    options: [
      ok("Sie braucht keine Jacke. Sie braucht eine Hose!"),
      no("Sie braucht keinen Jacke. Sie braucht eine Hose!", "die Jacke — женского рода: keine Jacke."),
      no("Sie brauchst keine Jacke. Sie brauchst eine Hose!", "sie — она: sie braucht, как er braucht."),
    ],
  },
  { ...narr("Радио Дерьи обещает: и на Kieler Woche — es regnet. Йенсен смотрит на небо. Молча."), set: { weather: 1 } },
  narr("Хауке всё равно снимает die Jacke. Под ней Hemd в клетку, Größe XXL: рукава висят, как паруса в штиль."),
  elif("Hauke! Das Hemd ist zu groß!", "Хауке! Рубашка слишком большая!", ["das Hemd", "zu"]),
  hauke("Das ist nicht mein Hemd. Das ist von Nils! Mein Hemd hat Nils.", "Это не моя рубашка. Это Нильса! Моя — у Нильса."),
  { t: "gap", rule: ["einkaufen/adjektiv-1"], task: "Что говорит Элиф?", text: "Das Hemd ist zu ___.", options: ["groß", "klein", "teuer"], answer: "groß", ru: "Рубашка слишком большая." },
  narr("Пиликает {nachricht} von Nils. Все «!» на месте — значит, СРОЧНО."),
  narr("«Greta ist nicht da!!! Aber ihr Einkaufszettel ist da!!! Foto!!!» На фото — {zettel} Греты, карандашом."),
  {
    t: "look",
    task: "Рассмотрите список Греты на фото.",
    items: [
      { icon: "🪣", de: "ein Liter", ru: "литр", note: "«Ein Liter Farbe — weiß». Литр белой краски.", key: true },
      { icon: "🖌️", de: "der Pinsel", ru: "кисть", note: "«Ein Pinsel, klein». Маленькая кисть — для тонких линий." },
      { icon: "🧅", de: "die Zwiebel", ru: "лук", note: "«Zwei Kilo Zwiebeln (Mateo)» — зачёркнуто. Рядом: «Nein!»", key: true },
      { icon: "🍎", de: "der Apfel", ru: "яблоко", note: "«Ein Kilo Äpfel». Видимо, для себя." },
    ],
  },
  {
    t: "pick",
    task: "Почему лук для Матео зачёркнут?",
    options: [
      ok("Грета отказалась покупать лук для Матео"),
      no("Грета не любит лук", "Тогда зачем писать «Mateo»? Лук был для него."),
      no("Лук уже купили", "Купленное отмечают галочкой. А тут зачёркнуто и «Nein!»."),
    ],
  },
  { t: "game", task: "Перепишите список Греты в блокнот по буквам.", hint: HINT_SPELL, c: letters(["die Zwiebel", "der Apfel", "die Farbe"]) },
  hauke("Zwei Kilo Zwiebeln? Für Mateo? Was kocht Mateo?", "Два кило лука? Для Матео? Что готовит Матео?"),
  {
    t: "game",
    rule: ["einkaufen/mengen-grammatik-1", "essen/akkusativ-3"],
    task: "Соберите главное из списка.",
    hint: "der Liter — мужского рода. После braucht: einen Liter, и никакого «литра краски» с падежом.",
    c: order(["Greta", "braucht", "einen", "Liter", "Farbe."], ["Farbe.", "einen", "Greta", "Liter", "braucht"]),
  },
  narr("Farbe für Boote продают в одном месте: am Hafen есть {laden} фрау Крузе."),
  hauke("Der Laden von Frau Kruse hat alles: Farbe, Seile und Hosen!", "В лавке фрау Крузе есть всё: краска, канаты и брюки!"),
  {
    t: "hear",
    task: "Что продают в лавке фрау Крузе?",
    voice: "Rocko",
    de: "Der Laden von Frau Kruse hat alles: Farbe, Seile und Hosen!",
    options: ["краску, канаты и брюки", "кофе, чай и пирог", "рыбу, хлеб и яблоки"],
    answer: "краску, канаты и брюки",
  },
  narr("Es regnet nicht mehr. Хауке вытряхивает мокрый Rucksack: Hose, Hemd, T-Shirt, Schuh — всё на «пять минут» к воде."),
  { t: "game", task: "Послушайте слово и нажмите на подходящую вещь.", hint: HINT_PICTURE, c: scene([["die Hose", "👖"], ["das Hemd", "👔"], ["das T-Shirt", "👕"], ["das Kleid", "👗"], ["der Schuh", "👟"], ["die Jacke", "🧥"]]) },
  elif("Und die Möwe? Sie ist nass, aber sie braucht keine Hose!", "А чайка? Она мокрая, но брюки ей не нужны!"),
  { t: "gap", rule: ["essen/negation-2"], task: "Что говорит Элиф о чайке?", text: "Sie braucht ___ Hose!", options: ["keine", "kein", "nicht"], answer: "keine", ru: "Брюки ей не нужны!" },
  {
    t: "game",
    task: "Элиф устраивает проверку: одно слово в группе лишнее.",
    hint: HINT_ODD,
    c: odd([
      [["die Hose", "das Hemd", "die Jacke", "die Zwiebel"], "die Zwiebel", "Лук не надевают."],
      [["ein Kilo", "ein Liter", "ein Pfund", "der Apfel"], "der Apfel", "Яблоко — товар, остальное — мера."],
      [["teuer", "billig", "groß", "die Farbe"], "die Farbe", "Farbe — предмет, остальные — какой он."],
    ]),
  },
  {
    t: "type",
    rule: ["essen/akkusativ-3"],
    task: "Запишите в блокнот план на утро.",
    answers: ["Wir brauchen eine Hose und Farbe.", "Wir brauchen Farbe und eine Hose.", "Dana braucht eine Hose, Greta braucht Farbe."],
    ru: "Нам нужны брюки и краска.",
  },
  narr("Am Aufsteller стоит Йенсен с Tasse Tee. Без зонта, как всегда. Кивает вам, как морю."),
  jensen("Moin.", "Привет."),
  {
    t: "reply",
    task: "Вы уходите к лавке. Попрощайтесь с Йенсеном.",
    options: [
      ok("Tschüss, Herr Jensen!"),
      ok("Auf Wiedersehen, Herr Jensen!"),
      no("Gute Nacht, Herr Jensen!", "Утро. До ночи ещё далеко, даже под таким небом."),
    ],
  },
  {
    t: "clue",
    title: "Einkaufszettel",
    text: "Greta braucht: ein Liter Farbe — weiß, ein Pinsel, ein Kilo Äpfel. «Zwei Kilo Zwiebeln (Mateo)» — зачёркнуто: Nein!",
  },
];

// Сцена 2 · развитие. Броски: новый человек · Дана · промокнуть · die Hose · 15 (фрау Крузе и
// огромные рыбацкие брюки), двусмысленность · Дана · заблудиться · die Tomate · 9 (Farbe — и цвет,
// и краска; Дана теряется между стеллажами). Шутка главы: чайка уносит чек — гонка.
const shop: SceneNode[] = [
  { t: "pic", src: "05-shop.jpg", alt: "Лодочная лавка: стеллажи с канатами и банками краски, вешалка с жёлтыми и томатно-красными рыбацкими брюками; фрау Крузе за старой кассой, Дана тонет в огромных красных брюках на лямках, Хауке смеётся; у двери чайка" },
  narr("{laden} фрау Крузе: alt, klein, am Hafen. Колокольчик над дверью, внутри пахнет канатом и Farbe."),
  kruse("Moin! Was suchen Sie?", "Привет! Что вы ищете?", ["suchen"]),
  {
    t: "reply",
    rule: ["essen/akkusativ-3"],
    task: "Ответьте фрау Крузе: вы ищете брюки для Даны.",
    options: [
      ok("Wir suchen eine Hose."),
      no("Wir suchen einen Hose.", "die Hose — женского рода: eine Hose."),
      no("Wir sucht eine Hose.", "wir — suchen, как инфинитив."),
    ],
  },
  kruse("Eine Hose? Welche Größe?", "Брюки? Какой размер?", ["die Größe"]),
  {
    t: "type",
    task: "Дане нужен размер S. Назовите его фрау Крузе.",
    answers: ["Größe S, bitte.", "Größe S.", "S, bitte.", "Größe S, bitte!"],
    ru: "Размер S, пожалуйста.",
  },
  kruse("S? Hm. Ich habe nur eine Hose – Größe XL. Rot wie eine Tomate!", "S? Хм. У меня только одни брюки — размер XL. Красные, как помидор!", ["die Tomate"]),
  narr("Hose на лямках, Größe XL, rot wie eine Tomate. Дана тонет в ней по грудь. Хауке плачет от смеха."),
  dana("Die Hose ist zu groß und zu lang!", "Брюки слишком большие и слишком длинные!", ["lang"]),
  {
    t: "hear",
    task: "Что говорит Дана?",
    voice: "Anna",
    de: "Die Hose ist zu groß und zu lang!",
    options: ["они слишком большие и длинные", "они слишком дорогие", "они слишком красные"],
    answer: "они слишком большие и длинные",
  },
  {
    t: "game",
    rule: ["einkaufen/pronomen-3"],
    task: "Фрау Крузе спрашивает Дану. Ответьте за неё.",
    hint: "die Hose → sie: Ich finde sie zu groß. Ich nehme sie.",
    c: {
      kind: "chat",
      who: "Frau Kruse",
      voice: "Shelley",
      turns: [
        turn("Wie finden Sie die Hose?", "Как вам брюки?", "sie", [
          ["sie", "Ich finde sie zu groß.", ""],
          ["ihn", "Ich finde ihn zu groß.", "ihn — для der: der Pullover. die Hose → sie."],
          ["es", "Ich finde es zu groß.", "es — для das: das Hemd. die Hose → sie."],
        ]),
        turn("Sie kostet neunzehn Euro. Nehmen Sie sie?", "Они стоят девятнадцать евро. Берёте?", "ja", [
          ["ja", "Ja, ich nehme sie.", ""],
          ["ihn", "Ja, ich nehme ihn.", "die Hose — женского рода: ich nehme sie."],
          ["nimmt", "Ja, ich nimmt sie.", "ich — nehme; nimmt — у er и sie."],
        ]),
        turn("Noch etwas?", "Что-нибудь ещё?", "farbe", [
          ["farbe", "Ja. Haben Sie Farbe?", ""],
          ["alles", "Nein, danke, das ist alles.", "А краска? Вы пришли и за ней."],
          ["du", "Ja. Hast du Farbe?", "С продавцом вы на «вы»: Haben Sie …?"],
        ]),
      ],
    },
  },
  kruse("Farbe? Welche Farbe? Die Hose gibt es in Rot und in Gelb.", "Цвет? Какой цвет? Брюки бывают красные и жёлтые.", ["die Farbe"]),
  {
    t: "pick",
    task: "Фрау Крузе поняла не так. Почему?",
    options: [
      ok("Farbe — это и цвет, и краска"),
      no("Она плохо слышит", "Колокольчик над дверью она слышит с другого конца лавки."),
      no("Краски у неё нет", "Банки стоят на полке прямо за ней."),
    ],
  },
  narr("Дана sucht die Farbe сама — и теряется: канаты, якоря, сапоги, снова канаты. {laden} внутри больше, чем снаружи."),
  {
    t: "look",
    task: "Помогите Дане: осмотрите лавку и найдите краску.",
    items: [
      { icon: "🗄️", de: "das Regal", ru: "стеллаж, полка", note: "От пола до потолка: Seile, сапоги, фонари. Farbe здесь нет." },
      { icon: "🪢", de: "das Seil", ru: "канат", note: "Канаты всех толщин. Хауке трогает каждый, как кот." },
      { icon: "🥫", de: "die Dose", ru: "банка", note: "Bootsfarbe в банках: dunkelblau, weiß, rot. Eine Dose — ein Liter.", key: true },
      { icon: "🧾", de: "der Kassenbon", ru: "чек", note: "У кассы на гвозде — забытые чеки. Верхний — с Farbe.", key: true },
    ],
  },
  kruse("Ach, Bootsfarbe! Ein Liter kostet vierundzwanzig Euro.", "А, лодочная краска! Литр стоит двадцать четыре евро.", ["ein Liter", "kosten"]),
  { t: "gap", rule: ["einkaufen/check-1"], task: "Сколько стоит литр?", text: "Ein Liter ___ vierundzwanzig Euro.", options: ["kostet", "kosten", "kauft"], answer: "kostet", ru: "Литр стоит двадцать четыре евро." },
  {
    t: "reply",
    rule: ["kennenlernen/endungen-1"],
    task: "Спросите фрау Крузе, кто покупает у неё такую краску.",
    options: [
      ok("Wer kauft hier Farbe?"),
      no("Wer kaufen hier Farbe?", "wer — как er: wer kauft."),
      no("Was kauft hier Farbe?", "Спрашиваем о человеке: wer."),
    ],
  },
  kruse("Viele! Aber einer kauft hier immer Dunkelblau. Groß, alt. Und er sagt nur ein Wort: Moin.", "Многие! Но один всегда берёт тёмно-синюю. Высокий, старый. И говорит только одно слово: Moin."),
  {
    t: "hear",
    task: "Каким фрау Крузе помнит этого покупателя?",
    voice: "Shelley",
    de: "Viele! Aber einer kauft hier immer Dunkelblau. Groß, alt. Und er sagt nur ein Wort: Moin.",
    options: ["высокий, старый, говорит только Moin", "маленький, молодой, много говорит", "высокий, рыжий, в очках"],
    answer: "высокий, старый, говорит только Moin",
  },
  hauke("Nur Moin? Viele sagen Moin!", "Только Moin? Многие говорят Moin!"),
  narr("Фрау Крузе снимает с гвоздя забытый {kassenbon}. Aber die Tür ist offen — и на пороге {moewe}!"),
  narr("HEL 7305 хватает Kassenbon прямо из пальцев — und weg! Над {seil} у двери, низко над Wasser."),
  { t: "game", task: `Догоните чек! ${RACE}`, hint: HINT_RACE, outcome: RACE_STAKES, c: race(["die Hose", "die Größe", "die Farbe", "ein Liter", "kosten", "suchen"]) },
  narr("Der Kassenbon ist nass, aber gut. Сдачу покупатель тогда не взял — фрау Крузе хранит её für «Herrn Moin»."),
  { t: "game", task: "Отсчитайте сдачу по чеку: Summe 28,50 €, bar 30,00 €. Фрау Крузе положит её в конверт.", hint: "30,00 − 28,50 = 1,50: один евро и пятьдесят центов.", c: { kind: "coins", coins: [200, 100, 50, 20, 10], answer: 150 } },
  {
    t: "game",
    rule: ["einkaufen/welch-1"],
    task: "Заведите карточку покупателя со слов фрау Крузе.",
    hint: "Прилагательное после sein не меняется: Er ist groß.",
    c: write("Der Moin-Mann", [
      ["Wie ist er?", "groß und alt", "alt und groß", "groß, alt"],
      ["Was sagt er?", "Moin", "nur Moin", "Moin."],
      ["Welche Farbe kauft er?", "dunkelblau", "Dunkelblau"],
    ]),
  },
  {
    t: "type",
    rule: ["einkaufen/mengen-grammatik-1"],
    task: "Запишите в блокнот, что купил тот мужчина.",
    answers: ["Er kauft einen Liter Farbe.", "Der Mann kauft einen Liter Farbe.", "Er kauft einen Liter Dunkelblau.", "Der Mann kauft einen Liter Dunkelblau."],
    ru: "Он покупает литр краски.",
  },
  {
    t: "clue",
    title: "Kassenbon",
    text: "Bootsladen Kruse · 1 Liter Bootsfarbe, dunkelblau — 24,00 € · 1 Pinsel — 4,50 € · Summe 28,50 € · bar 30,00 € · 17:05 · Tel. 0431 527718. Дата размыта дождём. Покупатель: groß, alt, sagt nur Moin.",
  },
];

// Сцена 3 · развилка на рынке. Броски: второстепенный герой по своей черте · Грета · вернуть ·
// der Apfel · 5 (мелочь: вернула яблоко, на нём отпечаток краски), неприятность · Нильс · потерять ·
// die Packung · 4 (мелочь, но из неё растёт слух Фрауке — знак главы 5 во фронте «Слухи»).
const market: SceneNode[] = [
  { t: "pic", src: "05-market.jpg", alt: "Рынок у гавани после дождя: Фрауке в полосатом фартуке за прилавком с ящиками яблок, помидоров и лука, весы; Дана в огромных красных рыбацких брюках, Элиф с биноклем; на заднем плане Матео прячет в рюкзак пакет лука; лужи" },
  narr("После дождя am Hafen открывается {markt}. У Фрауке heute Fischbrötchen und Äpfel."),
  frauke("Moin! Äpfel, Tomaten, Zwiebeln! Ein Kilo Äpfel – zwei Euro!", "Привет! Яблоки, помидоры, лук! Килограмм яблок — два евро!", ["ein Kilo", "der Apfel"]),
  {
    t: "reply",
    task: "Фрауке уже насыпает яблоки. Вежливо откажитесь: вам нужна Грета, а не Äpfel.",
    options: [
      ok("Nein, danke. Wir suchen Greta."),
      no("Ja, bitte. Zehn Kilo!", "Тогда Фрауке будет взвешивать полчаса. А вам нужна Грета."),
      no("Nein, bitte. Wir suchen Greta.", "Отказ — с danke: Nein, danke."),
    ],
  },
  {
    t: "go",
    task: "Кого расспросить на рынке?",
    next: "Дальше по делу",
    branches: [
      {
        label: "Фрауке и яблоко",
        icon: "🍎",
        nodes: [
          frauke("Greta? Ja! Sie kommt heute früh und kauft ein Kilo Äpfel.", "Грета? Да! Приходит сегодня рано и покупает килограмм яблок."),
          frauke("Und dann bringt sie einen Apfel zurück! Sie sagt nichts. Sie schreibt: Zu klein!", "А потом приносит одно яблоко обратно! Ничего не говорит. Пишет: «Слишком маленькое!»", ["klein"]),
          {
            t: "hear",
            task: "Почему Грета вернула яблоко — по словам Фрауке?",
            voice: "Sandy",
            de: "Und dann bringt sie einen Apfel zurück! Sie sagt nichts. Sie schreibt: Zu klein!",
            options: ["оно слишком маленькое", "оно слишком дорогое", "оно слишком кислое"],
            answer: "оно слишком маленькое",
          },
          narr("Фрауке показывает den Apfel. На боку — отпечаток пальца, {blau}. Мелочь. Aber die Farbe — wie auf dem Schild."),
          { t: "gap", rule: ["einkaufen/adjektiv-1"], task: "Что написала Грета?", text: "Der Apfel ist zu ___.", options: ["klein", "groß", "teuer"], answer: "klein", ru: "Яблоко слишком маленькое." },
          frauke("Und Nils! Nils trägt eine Packung. Eine große Packung! Was ist da drin? Das Schild?", "А Нильс! Нильс несёт пачку. Большую пачку! Что там внутри? Табличка?", ["die Packung"]),
          { ...narr("К обеду вся очередь знает: «Nils hat das Schild in einer Packung!» Слух растёт быстрее, чем очередь."), set: { rumours: 1 } },
          {
            t: "game",
            task: "Что Фрауке видела сама, а что уже додумала?",
            c: verdict(["Видела", "Додумала"], [
              ["Грета вернула яблоко", true, "Яблоко с отпечатком лежит на прилавке."],
              ["Нильс несёт пачку", true, "Это она видела своими глазами."],
              ["В пачке табличка", false, "Этого никто не видел: это уже слух."],
            ]),
          },
          narr("Тут же {nachricht} от Нильса: «Meine Packung ist weg!!! Wo ist sie???»"),
          {
            t: "type",
            rule: ["einkaufen/welch-1"],
            task: "Уточните у Нильса, о какой пачке речь.",
            answers: ["Welche Packung?", "Welche Packung, Nils?", "Nils, welche Packung?"],
            ru: "Какая пачка?",
          },
          narr("«Kekse!!! Für das Team!!! In der Jacke!!!» Пропажа нашлась: {kekse}. Слух об этом пока не знает."),
        ],
      },
      {
        label: "Матео и лук",
        icon: "🧅",
        nodes: [
          narr("Матео у того же прилавка: Greta kauft keine Zwiebeln? Dann kauft Mateo!"),
          mateo("Zwei Kilo Zwiebeln, ein Kilo Tomaten und keine Äpfel, bitte!", "Два кило лука, кило помидоров и никаких яблок, пожалуйста!", ["die Zwiebel"]),
          { t: "gap", rule: ["einkaufen/mengen-grammatik-1"], task: "Сколько лука просит Матео?", text: "Zwei ___ Zwiebeln, bitte!", options: ["Kilo", "Kilos", "Liter"], answer: "Kilo", ru: "Два кило лука, пожалуйста!" },
          {
            t: "game",
            rule: ["einkaufen/mengen-grammatik-1"],
            task: "Соберите покупки Матео.",
            hint: "zwei Kilo — 2, ein Kilo — 1, keine — 0.",
            c: {
              kind: "quantity",
              items: [
                { id: "zwiebeln", text: "Zwiebeln · Kilo", max: 4 },
                { id: "tomaten", text: "Tomaten · Kilo", max: 4 },
                { id: "aepfel", text: "Äpfel · Kilo", max: 4 },
                { id: "gurken", text: "Gurken · Stück", max: 4 },
              ],
              answer: { zwiebeln: 2, tomaten: 1, aepfel: 0, gurken: 0 },
            },
          },
          frauke("Fünf Euro fünfzig, Mateo.", "Пять пятьдесят, Матео."),
          {
            t: "hear",
            task: "Сколько платит Матео?",
            voice: "Sandy",
            de: "Fünf Euro fünfzig, Mateo.",
            options: ["5,50 €", "15,50 €", "50,50 €"],
            answer: "5,50 €",
          },
          narr("Матео bezahlt и прячет Zwiebeln в Rucksack, как улику."),
          {
            t: "reply",
            rule: ["kennenlernen/endungen-1"],
            task: "Спросите Матео, что он готовит.",
            options: [
              ok("Mateo, was kochst du?"),
              no("Mateo, was kocht du?", "du — kochst."),
              no("Mateo, was kochen Sie?", "С Матео вы давно на «ты»."),
            ],
          },
          mateo("Nichts! Ich koche … nichts. Zwiebeln sind gut für alles!", "Ничего! Я готовлю… ничего. Лук полезен для всего!"),
          {
            t: "pick",
            task: "Что записать о Матео?",
            options: [
              ok("Матео что-то готовит и скрывает, что"),
              no("Матео — покупатель краски", "Краску берёт высокий старик, который говорит только Moin. Матео говорит без умолку."),
              no("Матео просто любит лук", "Тогда зачем прятать его, как улику?"),
            ],
          },
        ],
      },
      {
        label: "Касса Фрауке",
        icon: "💶",
        optional: true,
        nodes: [
          narr("Пока Фрауке пересказывает слухи, очередь растёт. Покупательница берёт ein Kilo Äpfel und ein Pfund Tomaten."),
          frauke("Das macht drei Euro zwanzig.", "С вас три евро двадцать."),
          narr("Покупательница даёт fünf Euro. Фрауке смотрит на Euro, как на мелкий шрифт."),
          { t: "game", task: "Выдайте сдачу.", hint: "5,00 − 3,20 = 1,80: один евро, пятьдесят, двадцать и десять центов.", c: { kind: "coins", coins: [200, 100, 50, 20, 10], answer: 180 } },
          frauke("Danke! Du bist super!", "Спасибо! Ты супер!"),
          { ...narr("Фрауке записывает в журнал киоска: wer, was, wie viel. Аккуратно — пригодится для дела."), set: { frauke: 1 } },
        ],
      },
    ],
  },
  {
    t: "game",
    task: "Кто что купил сегодня? Соедините.",
    hint: "Загляните в блокнот: список Греты, рынок и лавка.",
    c: pairs([["Mateo", "zwei Kilo Zwiebeln"], ["Greta", "ein Kilo Äpfel"], ["Nils", "eine Packung Kekse"], ["Dana", "eine Hose, Größe XL"]]),
  },
  { t: "game", task: "Фрауке закрывает прилавок. Разложите ящики по артиклям.", hint: HINT_DOCK, c: docks(["der Apfel", "die Banane", "die Orange", "die Erdbeere", "die Tomate", "die Kartoffel", "die Zwiebel", "die Gurke"]) },
  {
    t: "clue",
    title: "Markt",
    text: "Greta kauft ein Kilo Äpfel und bringt einen Apfel zurück: «Zu klein!» На яблоке — отпечаток, dunkelblau. Mateo kauft zwei Kilo Zwiebeln и молчит зачем.",
  },
];

// Интерлюдия глазами фрау Крузе. Читатель видит покупателя, но не его лицо; вывод остаётся игроку.
const counter: SceneNode[] = [
  { t: "pic", src: "05-counter.jpg", alt: "Лавка днём: у прилавка спиной к нам высокий широкоплечий человек в тёмном, видна только спина и рука с монетами; фрау Крузе за прилавком ставит банку белой краски" },
  narr("Тем временем im Laden. Mittag, колокольчик. Фрау Крузе allein: детективы — auf dem Markt."),
  stranger("Moin.", "Привет."),
  narr("Он молча кивает на {regal} с банками. Nicht auf Dunkelblau — на соседнюю {dose}."),
  kruse("Welche Farbe? Weiß? Ein Liter?", "Какую краску? Белую? Литр?"),
  { t: "gap", rule: ["einkaufen/welch-1"], task: "Что спрашивает фрау Крузе?", text: "___ Farbe? Weiß?", options: ["Welche", "Welcher", "Welches"], answer: "Welche", ru: "Какую краску? Белую?" },
  stranger("Moin.", "Привет."),
  narr("Moin heißt hier «ja». Фрау Крузе ставит банку на прилавок. На крышке: {weiss}."),
  kruse("Vierundzwanzig Euro, bitte.", "Двадцать четыре евро, пожалуйста."),
  narr("Er bezahlt fünfundzwanzig Euro und geht. Сдачу этот покупатель, кажется, не берёт никогда."),
  { t: "game", task: "Успейте отдать сдачу, пока звенит колокольчик.", hint: "25 − 24 = 1: один евро.", c: { kind: "coins", coins: [200, 100, 50, 20, 10], answer: 100 } },
  narr("На прилавке — бумажка. Kein Kassenbon: ярлычок от Tee. Фрау Крузе выбрасывает его, не глядя."),
  {
    t: "pick",
    task: "Кто это был — по мнению фрау Крузе?",
    options: [
      ok("Тот же Moin-Mann, что берёт тёмно-синюю"),
      no("Новый покупатель", "Тот же рост, то же одно слово и та же сдача, которую он не берёт."),
      no("Матео", "Матео сказал бы двадцать слов и предложил бы кофе."),
    ],
  },
  {
    t: "type",
    task: "Запишите за фрау Крузе в книгу продаж, что он купил сегодня.",
    answers: ["Ein Liter Weiß.", "Ein Liter weiß.", "Er kauft einen Liter Weiß.", "Er kauft einen Liter weiß.", "Einen Liter Weiß."],
    ru: "Литр белой.",
  },
];

// Сцена 4 · поворот. Броски: подарок игроку · Матео · перепутать · das T-Shirt · 1 (обратный эффект:
// вместо футболок — пять пачек сахара, ложный след), продавщица узнаёт покупателя по одному слову.
const voice: SceneNode[] = [
  { t: "pic", src: "05-sugar.jpg", alt: "Клуб в полдень: Матео в панике прижимает к груди бумажный пакет, из которого сыплются пачки сахара; Хауке держит огромную футболку; Дана в красных рыбацких брюках держит телефон; в дверях — Йенсен с белой кружкой" },
  narr("Im Club Матео ставит на стол große Tüte. Kieler Woche скоро — ein Geschenk für das Team!"),
  mateo("Ein Geschenk für das Team: T-Shirts! Größe M, L und XL!", "Подарок команде: футболки! Размеры M, L и XL!", ["das T-Shirt"]),
  narr("Хауке открывает Tüte. Внутри не T-Shirts, а {zucker}: fünf Packungen. Матео бледнеет."),
  mateo("Das ist die falsche Tüte! Das ist … Zucker für Kaffee!", "Это не тот пакет! Это… сахар для кофе!", ["die Tüte"]),
  {
    t: "pick",
    task: "Что прячет Матео?",
    options: [
      ok("Пять пачек сахара — и молчит зачем"),
      no("Футболки", "Футболки он хотел подарить. В пакете их нет."),
      no("Табличку", "Табличка в пачку сахара не влезет. Даже у Матео."),
    ],
  },
  { t: "gap", rule: ["einkaufen/mengen-grammatik-1"], task: "Сколько сахара у Матео?", text: "Mateo hat fünf ___ Zucker.", options: ["Packungen", "Packung", "Kilos"], answer: "Packungen", ru: "У Матео пять пачек сахара." },
  narr("Fünf Packungen Zucker für Kaffee? Даже для Матео много. Подарок вышел наоборот: вместо T-Shirts — новый вопрос."),
  dana("Ich habe eine Idee. Frau Kruse kennt die Stimme!", "У меня идея. Фрау Крузе знает голос!"),
  narr("Unten auf dem Kassenbon: die Telefonnummer. Йенсен как раз идёт по причалу к клубу."),
  {
    t: "game",
    task: "Наберите номер лавки с чека: null – vier – drei – eins, fünf – zwei – sieben, sieben – eins – acht.",
    hint: "0431 — код Киля, потом номер лавки.",
    c: { kind: "code", length: 10, answer: "0431527718", label: "Номер телефона" },
  },
  kruse("Bootsladen Kruse, moin!", "Лодочная лавка Крузе, привет!"),
  dana("Frau Kruse, hier ist Dana. Hören Sie, bitte!", "Фрау Крузе, это Дана. Послушайте, пожалуйста!"),
  narr("Дана выставляет das Handy в окно, как микрофон. Мимо идёт Herr Jensen: eine Tasse Tee."),
  jensen("Moin.", "Привет."),
  {
    t: "pick",
    task: "Что слышит сейчас фрау Крузе в трубке?",
    options: [
      ok("Одно слово: Moin"),
      no("Целую фразу", "Йенсен? Целую фразу? Это было бы событием недели."),
      no("Тишину", "Йенсен сказал своё слово. Одно, но сказал."),
    ],
  },
  kruse("Das ist er! Groß, alt und nur Moin!", "Это он! Высокий, старый и только Moin!"),
  {
    t: "hear",
    task: "Что говорит фрау Крузе?",
    voice: "Shelley",
    de: "Das ist er! Groß, alt und nur Moin!",
    options: ["это он", "это не он", "кто это?"],
    answer: "это он",
  },
  kruse("Oder? Moment. Hier sagen alle Moin. Ich auch!", "Или нет? Минутку. Здесь все говорят Moin. Я тоже!"),
  {
    t: "pick",
    task: "Что это значит для дела?",
    options: [
      ok("Голос похож, но Moin говорят все: это ещё не доказательство"),
      no("Покупатель — Йенсен, дело закрыто", "Фрау Крузе сама сомневается. Moin в Киле говорят все."),
      no("Фрау Крузе ошиблась, Йенсен ни при чём", "Она его узнала — пусть и не наверняка. Вычеркнуть нельзя."),
    ],
  },
  hauke("Herr Jensen kauft keine Farbe. Er kauft nur Tee!", "Господин Йенсен не покупает краску. Он покупает только чай!"),
  {
    t: "game",
    task: "Кто говорит одно слово, а кто — много?",
    hint: "Вспомните день: кто болтает, кто молчит.",
    c: sort([["eins", "Nur Moin"], ["viel", "Viele Wörter"]], [
      ["jensen", "Herr Jensen", "eins", "⚓"],
      ["mann", "der Moin-Mann", "eins", "🧾"],
      ["mateo", "Mateo", "viel", "👨‍🍳"],
      ["kruse", "Frau Kruse", "viel", "🧶"],
      ["nils", "Nils", "viel", "📱"],
    ]),
  },
  {
    t: "type",
    task: "Запишите в блокнот главное о покупателе со слов фрау Крузе.",
    answers: ["Er sagt nur Moin.", "Der Mann sagt nur Moin.", "Er ist groß und alt. Er sagt nur Moin."],
    ru: "Он говорит только Moin.",
  },
  {
    t: "game",
    rule: ["kennenlernen/wortstellung-3"],
    task: "Соберите вопрос, который вы зададите Йенсену при случае.",
    hint: "Вопрос «да или нет»: глагол на первом месте.",
    c: order(["Herr Jensen,", "kaufen", "Sie", "Farbe?"], ["Farbe?", "Sie", "Herr Jensen,", "kaufen"]),
  },
  narr("Матео меняет тему: вот настоящие T-Shirts, а ещё Hose, Hemd, Jacke из бюро находок. В ящики Йенсена: der, die, das."),
  { t: "game", task: "Разложите вещи по ящикам Йенсена.", hint: HINT_DOCK, c: docks(["der Pullover", "die Hose", "das Hemd", "die Jacke", "das T-Shirt", "der Schuh", "das Kleid", "der Mantel"]) },
  mateo("Hier! Dein T-Shirt. Wie findest du es?", "Вот! Твоя футболка. Как она тебе?"),
  {
    t: "hear",
    task: "О чём спрашивает Матео?",
    voice: "Reed",
    de: "Hier! Dein T-Shirt. Wie findest du es?",
    options: ["как вам футболка", "сколько стоит футболка", "какой у вас размер"],
    answer: "как вам футболка",
  },
  {
    t: "reply",
    rule: ["einkaufen/pronomen-3"],
    task: "Ответьте Матео.",
    options: [
      ok("Ich finde es schön. Danke!"),
      no("Ich finde ihn schön. Danke!", "das T-Shirt — средний род: es."),
      no("Ich finde sie schön. Danke!", "sie — для die. das T-Shirt → es."),
    ],
  },
  {
    t: "clue",
    title: "Die Stimme",
    text: "Frau Kruse am Telefon: «Das ist er! … Oder? Hier sagen alle Moin.» Mateo: fünf Packungen Zucker — «für Kaffee».",
  },
];

// Сцена 5 · кульминация: замок урока и письмо по образцу. Цвета покупок — цвета таблички.
const colours: SceneNode[] = [
  { t: "pic", src: "05-board.jpg", alt: "Вечер в клубе: мокрый чек сохнет на верёвке на прищепке, на столе блокнот, телефон с фото списка и яблоко; Дана в красных рыбацких брюках, Элиф и Хауке склонились над столом" },
  narr("Abend im Club. {kassenbon} сохнет на верёвке, как бельё. Auf dem Tisch: {zettel}, ein Apfel, ein Handy."),
  dana("Also: Ein Mann kauft Dunkelblau. Greta braucht Weiß.", "Итак: мужчина покупает тёмно-синюю. Грете нужна белая."),
  {
    t: "game",
    rule: ["einkaufen/pronomen-3", "einkaufen/mengen-grammatik-1"],
    task: "Блокнот закрыт на фразы дня. Поверните диски.",
    hint: HINT_LOCK,
    c: lock([
      ["Он покупает литр краски.", [["Er", "Sie", "Ich"], ["kauft", "kaufe", "kaufen"], ["einen Liter Farbe.", "ein Liter Farbe.", "einen Liter Farben."]]],
      ["Брюки? Дана берёт их.", [["Die Hose?", "Der Hose?", "Das Hose?"], ["Dana nimmt", "Dana nehme", "Dana nehmen"], ["sie.", "ihn.", "es."]]],
      ["Сколько стоит литр?", [["Was", "Wie", "Wer"], ["kostet", "kosten", "kostest"], ["ein Liter?", "einen Liter?", "eine Liter?"]]],
    ]),
  },
  narr("Элиф смотрит: Kassenbon, Einkaufszettel, dann der Aufsteller за окном — leer. Лицо биолога, который нашёл гнездо."),
  elif("Dunkelblau und Weiß! Das Schild ist dunkelblau und weiß!", "Тёмно-синий и белый! Табличка же тёмно-синяя с белым!"),
  {
    t: "pick",
    task: "Что это значит?",
    options: [
      ok("Краску покупают для таблички MOIN"),
      no("Совпадение: синий и белый — цвета всего Киля", "Совпадение возможно. Но список, чек и эскиз на салфетке — уже три совпадения."),
      no("Кто-то красит «Sprotte»", "Тогда зачем Грете маленькая кисть? Для лодки нужна большая."),
    ],
  },
  { t: "gap", task: "Что сказала Элиф о табличке?", text: "Das Schild ist ___ und weiß.", options: ["dunkelblau", "rot", "gelb"], answer: "dunkelblau", ru: "Табличка тёмно-синяя с белым." },
  { t: "game", task: "Подпишите улики на доске по буквам.", hint: HINT_SPELL, c: letters(["die Größe", "die Packung", "die Zwiebel"]) },
  {
    t: "game",
    rule: ["einkaufen/preise-1"],
    task: "Заполните карточку покупки по чеку.",
    hint: "Цена словами: 24,00 € — vierundzwanzig Euro.",
    c: write("Kassenbon", [
      ["Was?", "Farbe", "Bootsfarbe", "die Farbe"],
      ["Wie viel?", "ein Liter", "1 Liter", "einen Liter"],
      ["Welche Farbe?", "dunkelblau", "Dunkelblau"],
      ["Was kostet sie?", "vierundzwanzig Euro", "24 Euro", "24,00 €", "24 €"],
    ]),
  },
  narr("Wer braucht die Farbe? Нильс живёт neben Greta — ему и написать."),
  {
    t: "game",
    rule: ["einkaufen/welch-1"],
    task: "Напишите Нильсу по образцу: записке Даны фрау Крузе. Пишете от всей команды, поэтому — wir.",
    hint: HINT_LETTER,
    c: letter(
      "Nils",
      ["Liebe Frau Kruse,", "danke für die Hose! Ich finde sie super.", "Sie ist zu groß, aber sie ist schön.", "Viele Grüße", "Dana"],
      [
        an("Lieber", "Nils"),
        ["Danke → für das Foto", "danke für das Foto!", "Danke für das Foto!"],
        ["Frage → welche Farbe, Greta", "Welche Farbe braucht Greta?", "welche Farbe braucht Greta?"],
        ["Wir → einen Mann suchen", "Wir suchen einen Mann.", "wir suchen einen Mann."],
        gruss("Dana"),
      ],
    ),
  },
  narr("Ответ приходит через минуту, по три «!» на слово: «Weiß!!! Für Buchstaben!!! Mehr weiß ich nicht!!!»"),
  hauke("Weiß für Buchstaben! Und Nils weiß nichts. Zweimal weiß!", "Белая для букв! А Нильс ничего не знает. Дважды weiß!"),
  {
    t: "hear",
    task: "Для чего Грете белая краска?",
    voice: "Rocko",
    de: "Weiß für Buchstaben! Und Nils weiß nichts. Zweimal weiß!",
    options: ["для букв", "для лодки", "для яблок"],
    answer: "для букв",
  },
  elif("Und der Pinsel ist klein. Für kleine Buchstaben!", "И кисть маленькая. Для маленьких букв!"),
  { t: "gap", task: "Что пишет Нильс?", text: "Weiß! Für ___!", options: ["Buchstaben", "Boote", "Äpfel"], answer: "Buchstaben", ru: "Белая! Для букв!" },
  {
    t: "game",
    task: "Доска дня: для чего каждая покупка?",
    hint: "Загляните в блокнот: чек, список и рынок.",
    c: sort([["schild", "Для таблички?"], ["kueche", "Для кухни?"]], [
      ["blau", "ein Liter Dunkelblau", "schild", "🧾"],
      ["weiss", "ein Liter Weiß", "schild", "📝"],
      ["pinsel", "ein Pinsel, klein", "schild", "🖌️"],
      ["zwiebeln", "zwei Kilo Zwiebeln", "kueche", "🧅"],
      ["zucker", "fünf Packungen Zucker", "kueche", "🧂"],
    ]),
  },
  hauke("Und Zucker für Kaffee? Fünf Packungen? Mateo!", "А сахар для кофе? Пять пачек? Матео!"),
  mateo("Wer hat Hunger? Brot für alle!", "Кто голоден? Хлеб всем!"),
  { t: "game", task: "Хауке репетирует фразы для завтрашних покупок. Повторите за ним вслух.", hint: HINT_SAY, c: speak(["ein Pfund", "die Größe", "teuer"]) },
  {
    t: "type",
    task: "Запишите вывод одной фразой: краска — для таблички.",
    answers: ["Die Farbe ist für das Schild.", "Die Farbe ist für das Schild MOIN.", "Die Farbe ist für MOIN."],
    ru: "Краска — для таблички.",
  },
  {
    t: "game",
    task: "Соберите доску дня: находка и что она говорит.",
    hint: "Загляните в блокнот: чек, список, рынок, клуб.",
    c: pairs([["der Kassenbon", "Dunkelblau, 17:05"], ["der Einkaufszettel", "Weiß, ein Pinsel"], ["der Apfel", "ein Fleck, dunkelblau"], ["die Tüte", "fünf Packungen Zucker"]]),
  },
  {
    t: "clue",
    title: "Dunkelblau und Weiß",
    text: "Der Mann kauft Dunkelblau, Greta braucht Weiß — die Farben von MOIN. Weiß ist für Buchstaben (Nils). Der Pinsel ist klein.",
  },
];

// Сцена 6 · эпилог и крючок: речь как на экзамене, сверка слуха и голосовое Йенсена к главе 6.
const evening: SceneNode[] = [
  { t: "pic", src: "05-evening.jpg", alt: "Вечер у киоска Фрауке: Дана в огромных красных рыбацких брюках на лямках сидит на скамейке, рядом её телефон в миске с рисом; Хауке и Элиф смеются; вдали по причалу уходит Йенсен с кружкой; на фонаре чайка" },
  narr("Abend auf der Kiellinie. Дана всё ещё in der Hose: rot, Größe XL. Хауке зовёт её «Tomate»."),
  hauke("Dana, du bist eine Tomate!", "Дана, ты помидор!"),
  dana("Und du bist ein Hemd von Nils!", "А ты — рубашка Нильса!"),
  { t: "gap", rule: ["einkaufen/welch-1"], task: "Элиф спрашивает Дану о брюках.", text: "___ Größe hat die Hose?", options: ["Welche", "Welcher", "Welches"], answer: "Welche", ru: "Какого размера брюки?" },
  dana("Größe XL! Und sie kostet neunzehn Euro. Das ist nicht teuer!", "Размер XL! И стоят они девятнадцать евро. Это недорого!"),
  {
    t: "hear",
    task: "Сколько стоили брюки?",
    voice: "Anna",
    de: "Größe XL! Und sie kostet neunzehn Euro. Das ist nicht teuer!",
    options: ["19 €", "90 €", "9 €"],
    answer: "19 €",
  },
  {
    t: "game",
    rule: ["einkaufen/mengen-grammatik-1", "essen/akkusativ-3"],
    task: "Дана пишет итог дня. Вставьте пропущенные слова.",
    hint: "der Liter → einen Liter; fünf Packungen — мн. ч.; die Packung → eine Packung.",
    c: gaps("Ein Mann kauft ___ Liter Dunkelblau. Mateo hat fünf ___ Zucker, Nils hat ___ Packung Kekse.", ["einen", "Packungen", "eine", "ein", "Packung"], ["einen", "Packungen", "eine"]),
  },
  {
    t: "go",
    task: "Слух Фрауке гуляет по набережной.",
    next: "Дальше по делу",
    branches: [
      {
        label: "Сверить слух о Нильсе",
        icon: "🗞️",
        optional: true,
        nodes: [
          narr("«Nils hat das Schild in einer Packung!» — шепчет очередь у киоска. Вы показываете Фрауке сообщение Нильса."),
          {
            t: "game",
            task: "Поставьте штамп: это написано в сообщении Нильса или нет?",
            c: verdict(["Steht da", "Steht nicht da"], [
              ["В пачке — печенье", true, "«Eine Packung Kekse!!!» — так и написал."],
              ["Пачка для команды", true, "«Für das Team!!!» — печенье для всех."],
              ["В пачке табличка", false, "Об этом Нильс не писал. Это слух."],
            ]),
          },
          { ...narr("Фрауке вздыхает: «Nur Kekse!» Но в журнал киоска записывает честно. Слух сдулся."), set: { rumours: -1 } },
        ],
      },
    ],
  },
  mateo("Zwiebelkuchen? Für die Kieler Woche? Nein, nein! Ich koche … Suppe!", "Луковый пирог? К Kieler Woche? Нет-нет! Я варю… суп!"),
  {
    t: "pick",
    task: "Матео сам заговорил о луковом пироге. Что записать?",
    options: [
      ok("Матео что-то печёт к Kieler Woche и прячет это"),
      no("Матео варит суп", "Пять пачек сахара для супа? Даже для Матео это много."),
      no("Матео купил краску", "Краску берёт высокий старик, который говорит только Moin."),
    ],
  },
  {
    t: "type",
    task: "Запишите в блокнот про Матео одной фразой.",
    answers: ["Mateo kocht etwas.", "Mateo kocht etwas und sagt nichts.", "Mateo kocht etwas für die Kieler Woche."],
    ru: "Матео что-то готовит.",
  },
  {
    t: "game",
    task: "Хауке устраивает репетицию экзамена. Тема дня — покупки.",
    hint: HINT_ORAL,
    c: oral([
      oralSay(2, ASK, "Thema: Einkaufen · Wort: Größe", "Welche Größe haben Sie?", "Какой у вас размер?", "Welche …?"),
      oralReply(2, ANSWER, "Wie finden Sie die Hose?", "Ich finde sie zu lang. Und sie ist zu groß.", "По-моему, они слишком длинные. И слишком большие."),
      oralSay(3, REQUEST, "🛍️", "Eine Tüte, bitte!", "Пакет, пожалуйста!"),
    ]),
  },
  narr("Дана сушит Handy в миске с рисом. Вдруг: {sprachnachricht} von «Herr Jensen» — neun Sekunden."),
  elif("Herr Jensen schickt eine Sprachnachricht? Er spricht? Mehr als Moin?", "Господин Йенсен шлёт голосовое? Он говорит? Больше, чем Moin?"),
  hauke("Neun Sekunden! Das sind … viele Moins!", "Девять секунд! Это же… много Moin!"),
  narr("Динамик после дождя только хрипит. Morgen ist das Handy wieder gut — dann hören wir. Ночь будет длинной."),
  { t: "game", task: "Слова дня перемешались. Откройте пары: немецкое слово и перевод.", c: memory(["laden", "kassenbon", "zettel", "markt", "zucker", "blau"]) },
  {
    t: "pick",
    task: "Что завтра первым делом?",
    options: [
      ok("Послушать голосовое Йенсена и разобраться со временем на чеке"),
      no("Снова в лавку фрау Крузе", "Лавку вы уже осмотрели. Новое — голосовое и время на чеке."),
      no("Искать Грету на рынке", "Грета приходит на рынок рано и молча. А голосовое ждёт сейчас."),
    ],
  },
  {
    t: "game",
    rule: ["kennenlernen/wortstellung-3"],
    task: "Соберите главный вопрос на завтра.",
    hint: "W-вопрос: вопросительное слово, потом глагол.",
    c: order(["Wer", "kauft", "die", "Farbe?"], ["Farbe?", "kauft", "die", "Wer"]),
  },
  narr("Хауке достаёт карточки: Lotto, nur Einkaufen. Die Möwe смотрит на карточку с Apfel."),
  { t: "game", task: "Лото на ночь: послушайте слово и закройте его на карточке.", hint: HINT_HEAR, c: bingo(["die Hose", "die Jacke", "das Hemd", "die Tüte", "die Flasche", "der Apfel", "die Zwiebel", "die Tomate", "der Euro"]) },
  { t: "game", task: "Подпишите вещи дня в блокноте по буквам.", hint: HINT_SPELL, c: letters(["die Hose", "die Tüte", "der Euro"]) },
  narr("Вы закрываете блокнот: «День пятый. Найдено: {kassenbon} — 17:05, Dunkelblau; {zettel} — Weiß; der Moin-Mann». Noch sieben Tage."),
  {
    t: "clue",
    title: "Sprachnachricht",
    text: "Herr Jensen: Sprachnachricht, 0:09 — ещё не слышали. Kassenbon: 17:05, дата размыта. Завтра: когда именно пропала табличка?",
  },
];

const play = (nodes: SceneNode[]) => ({ kind: "play" as const, nodes });
const HINT = "Ошибка ничего не стоит: собеседник отреагирует, и можно выбрать снова.";

export const sceneChapter5: Episode = {
  id: "moin-neu-5",
  title: "Ein Liter Farbe",
  day: { de: "Noch acht Tage", ru: "ещё восемь дней до Kieler Woche" },
  place: "Kiellinie · лавка у гавани и рынок",
  topic: "Покупки и одежда",
  grammar: "Was kostet …? · ein Kilo, ein Liter · ihn, sie, es · welcher · zu groß",
  beats: [
    {
      id: "05-s1",
      title: "Es regnet!",
      story: [],
      prompt: "Ливень, мокрые брюки Даны и список покупок Греты.",
      hint: HINT,
      success: "Грете нужен литр белой краски, а лук для Матео она вычеркнула. Идём в лавку у гавани.",
      challenge: play(rain),
    },
    {
      id: "05-s2",
      title: "Zu groß, zu lang",
      story: [],
      prompt: "Лавка фрау Крузе: брюки на вырост, Farbe и забытый чек.",
      hint: "die Hose → sie: Ich nehme sie. der Pullover → ihn, das Hemd → es.",
      success: "Тёмно-синюю краску берёт высокий старик, который говорит только Moin. Чек спасён от чайки.",
      challenge: play(shop),
    },
    {
      id: "05-s3",
      title: "Ein Apfel zurück",
      story: [],
      prompt: "Рынок: яблоко Греты, лук Матео и пачка Нильса.",
      hint: "zwei Kilo Zwiebeln, ein Pfund Tomaten: мера стоит прямо перед словом.",
      success: "Грета вернула яблоко с отпечатком краски. Матео купил лук и молчит зачем.",
      challenge: play(market),
    },
    {
      id: "05-i1",
      title: "Глазами фрау Крузе",
      pov: "глазами фрау Крузе",
      story: [],
      prompt: "Интерлюдия: дневной покупатель, белая краска и ярлычок на прилавке.",
      hint: "die Farbe → welche Farbe: welche — для женского рода.",
      success: "Сегодня покупатель взял белую. Детектив об этом пока не знает.",
      challenge: play(counter),
    },
    {
      id: "05-s4",
      title: "Moin?",
      story: [],
      prompt: "Подарок Матео, звонок в лавку и одно слово Йенсена.",
      hint: "das T-Shirt → es: Ich finde es schön.",
      success: "Фрау Крузе узнала голос — или нет: Moin говорят все. А у Матео пять пачек сахара.",
      challenge: play(voice),
    },
    {
      id: "05-s5",
      title: "Dunkelblau und Weiß",
      story: [],
      prompt: "Доска дня, замок и записка Нильсу.",
      hint: "Welche Farbe? — welche, потому что die Farbe.",
      success: "Тёмно-синий и белый — цвета таблички MOIN. Белая — для букв.",
      challenge: play(colours),
    },
    {
      id: "05-s6",
      title: "Rot wie eine Tomate",
      story: [],
      prompt: "Вечер у киоска, слух о Нильсе и голосовое Йенсена.",
      hint: "Ich finde sie zu lang: die Hose → sie.",
      success: "День пятый закончен. Завтра — голосовое Йенсена и время на чеке. Noch sieben Tage.",
      challenge: play(evening),
    },
  ],
};
