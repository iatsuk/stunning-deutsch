import { an, ANSWER, ASK, bingo, chat, docks, gaps, gruss, HINT_DOCK, HINT_HEAR, HINT_LETTER, HINT_LOCK, HINT_ODD, HINT_ORAL, HINT_PICTURE, HINT_SAY, HINT_SPELL, letter, letters, lock, odd, oral, order, pairs, reply as oralReply, REQUEST, say as oralSay, scene, sort, speak, spot, turn, verdict, write } from "../build.ts";
import { phrases } from "../data.ts";
import type { Challenge, Episode, SceneNode } from "../types.ts";
import { back } from "./back.ts";

// Глава 8 в формате сцен (A1-PLOT.md, «Формат сцен»): жильё, дательный на вопрос «где?» (im, in der,
// auf dem), этажи и порядковые числа, сложные слова, прилагательное после sein. Вопрос главы — где
// табличка в клубе. Вход — ключ и записка «Morgen um acht. Im Keller. Allein.», выход — пустая
// коробка с контуром MOIN, билет на автобус в Gaarden и адрес мастерской. Подвалов два, и команда
// ждёт Йенсена не в том. Ложный след (A1-PLOT.md, «Переработка глав 6–12»): фирма тоже из Гаардена,
// а Фрауке разносит «Грета везёт Йенсена в фирму»; довод правды — Грета вернула хозяину дома запасной
// ключ от подвала. Повороты брошены оракулом (seeds 1794160007 и 1795220687), увязка — в журнале
// A1-STORYCRAFT.md.

const narr = (text: string): SceneNode => ({ t: "narr", text });
const learn = (words?: string[]) => (words ? { learn: words } : {});
const hauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Hauke", voice: "Rocko", de, ru, ...learn(words) });
const elif = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Elif", voice: "Flo", de, ru, ...learn(words) });
const dana = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Dana", voice: "Anna", de, ru, ...learn(words) });
const mateo = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Mateo", voice: "Reed", de, ru, ...learn(words) });
const frauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frauke", voice: "Sandy", de, ru, ...learn(words) });
const petersen = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frau Petersen", voice: "Sandy", de, ru, ...learn(words) });
const wulff = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Herr Wulff", voice: "Eddy", de, ru, ...learn(words) });
const machine = (de: string, ru: string): SceneNode => ({ t: "say", who: "Anrufbeantworter", voice: "Shelley", de, ru });
/** Пары памяти — из выражений истории, которые глава уже показала. */
const memory = (ids: string[]): Challenge => ({ kind: "memory", pairs: ids.map((id) => ({ id, de: phrases[id].de, ru: phrases[id].ru })) });
const clock = (answer: string, traps: Record<string, string>): Challenge => ({ kind: "clock", start: "12:00", step: 15, answer, traps });
const ok = (text: string) => ({ text, ok: true as const });
const no = (text: string, react: string) => ({ text, react });

const JENSEN_NOTE = "Heute nicht. Leider. Moin.";
const WULFF_KEY = "Und Greta bringt immer alles zurück. Gestern – den zweiten Schlüssel vom Keller!";
const ENTFUEHRUNG = "Herr Jensen sagt nicht mal Moin! Und Greta nimmt ihn mit! Das ist eine Entführung!";

// Сцена 1 · пролог и завязка: восемь утра у клуба. Бросок: глобальное событие · чайка · прийти
// не туда · der Stuhl · 17 — чаек нет во всей гавани (примета шторма), стул Йенсена пуст.
// Бросок: сквозная шутка обостряется · Петерсен · отпраздновать · das Treppenhaus · 13 — она
// празднует открытие подвала клуба, но сначала формуляр.
const morning: SceneNode[] = [
  { t: "pic", src: "08-morning.jpg", alt: "Утро понедельника у клуба: пустой стул Йенсена на причале и его лодка, ни одной чайки; Элиф с биноклем смотрит в пустое небо, Хауке бежит с будильником в руке" },
  narr("Achter Tag, Montag, noch fünf Tage. Ровно acht. Вы у клуба, der Schlüssel в кармане. Es ist ruhig. Zu ruhig."),
  narr("Der Stuhl Йенсена на причале пуст: keine Tasse, kein Herr Jensen. Und keine Möwe — ни на крыше, ни на воде."),
  {
    t: "look",
    task: "Осмотрите причал.",
    items: [
      { icon: "🪑", de: "der Stuhl", ru: "стул", note: "Стул Йенсена. Каждое утро в восемь он сидит здесь с кружкой. Сегодня пусто.", key: true },
      { icon: "⛵", de: "das Boot", ru: "лодка", note: "Лодка Йенсена у причала. А ведь он выходит в море каждое утро в восемь — всегда.", key: true },
      { icon: "☕", de: "die Tasse", ru: "чашка, кружка", note: "Кружки нет. Значит, чая утром тоже не было." },
    ],
  },
  {
    t: "type",
    task: "Запишите в блокнот главное: Йенсена на месте нет.",
    answers: ["Herr Jensen ist nicht da.", "Herr Jensen ist nicht hier.", "Er ist nicht da."],
    ru: "Господина Йенсена нет.",
  },
  narr("На улице, {draussen}, — ветер. На причале ни одной чайки."),
  elif("Keine Möwe! Die Möwen sind in der Stadt. Ein Sturm kommt!", "Ни одной чайки! Чайки в городе. Идёт шторм!"),
  {
    t: "hear",
    task: "Что Элиф говорит о чайках?",
    voice: "Flo",
    de: "Keine Möwe! Die Möwen sind in der Stadt. Ein Sturm kommt!",
    options: ["чайки в городе — идёт шторм", "чайки спят на крыше клуба", "чайки улетели на пляж"],
    answer: "чайки в городе — идёт шторм",
  },
  { ...narr("{sturm} — старая примета на Ostsee: чайки улетают в город, когда у моря будет плохо. Часы погоды тикают."), set: { weather: 1 } },
  { t: "gap", rule: ["wohnen/wo-2"], task: "Где сейчас чайки?", text: "Die Möwen sind in der ___.", options: ["Stadt", "Küche", "Keller"], answer: "Stadt", ru: "Чайки в городе." },
  narr("Viertel nach acht. Хауке бежит, будильник в руке."),
  hauke("Der Wecker ist kaputt! Er klingelt nicht!", "Будильник сломан! Он не звонит!", ["kaputt"]),
  {
    t: "reply",
    task: "Скажите Хауке, сколько сейчас времени.",
    options: [
      ok("Hauke, es ist Viertel nach acht!"),
      no("Hauke, es ist Viertel vor acht!", "Viertel vor acht — 7:45. А сейчас 8:15: Viertel nach acht."),
      no("Hauke, es ist halb acht!", "halb acht — 7:30. Хауке опоздал, а не пришёл раньше."),
    ],
  },
  {
    t: "type",
    rule: ["wohnen/adjektiv-1"],
    task: "Запишите, почему Хауке опоздал.",
    answers: ["Der Wecker ist kaputt.", "Sein Wecker ist kaputt.", "Haukes Wecker ist kaputt."],
    ru: "Будильник сломан.",
  },
  hauke("Wo ist Herr Jensen? Im Keller! Kommt, wir gehen runter!", "Где господин Йенсен? В подвале! Пошли вниз!"),
  narr("Im Treppenhaus клуба — дверь вниз. Die Lampe ist kaputt, es ist dunkel. Der Schlüssel… не подходит."),
  dana("Der Schlüssel ist alt. Das Schloss ist neu. Das passt nicht!", "Ключ старый. Замок новый. Не подходит!"),
  hauke("Und es gibt hier kein Licht! Dana, mach dein Handy an!", "И света здесь нет! Дана, включи телефон!"),
  { t: "gap", rule: ["moin/es-gibt-1"], task: "Запишите, почему на лестнице темно.", text: "Hier ___ es kein Licht.", options: ["gibt", "ist", "hat"], answer: "gibt", ru: "Здесь нет света." },
  narr("Фрау Петерсен мечтает: {aufzug}! Пока есть только {treppe}: {oben} — офис, {unten} — Keller."),
  {
    t: "pick",
    task: "Ключ не подходит, а уже 8:20. Что делать?",
    options: [
      ok("Позвать фрау Петерсен: у неё ключи от всего клуба"),
      no("Ломать дверь", "Детективы не ломают двери. Тем более в клубе фрау Петерсен."),
      no("Ждать Йенсена у двери", "Йенсен никогда не опаздывает. Если его нет в восемь — что-то не так."),
    ],
  },
  narr("Frau Petersen kommt: großer Schlüssel, eine Packung Kekse — и сияет, как на Geburtstag."),
  petersen("Zwanzig Jahre ist der Keller zu! Heute machen wir ihn auf. Das feiern wir!", "Двадцать лет подвал закрыт! Сегодня мы его открываем. Это надо отпраздновать!", ["der Keller", "feiern"]),
  petersen("Aber zuerst das Formular. Ohne Formular kein Keller!", "Но сначала формуляр. Без формуляра — никакого подвала!"),
  petersen("Und möchten Sie einen Keks? Ich mag Kekse!", "А хотите печенье? Я люблю печенье!"),
  {
    t: "game",
    rule: ["wohnen/check-1"],
    task: "Заполните формуляр фрау Петерсен: когда и куда идёт команда.",
    hint: "Где? — im Keller: in + dem = im.",
    c: write("Kellerbuch · Club Kiellinie", [
      ["Tag", "Montag", "am Montag", "heute"],
      ["Uhrzeit", "8:20", "acht Uhr zwanzig", "zwanzig nach acht"],
      ["Wo?", "im Keller", "Keller", "im Keller vom Club"],
      ["Wie viele Personen?", "drei", "3"],
    ]),
  },
  {
    t: "pick",
    task: "Что празднует фрау Петерсен?",
    options: [
      ok("Подвал клуба открывают впервые за двадцать лет"),
      no("Свой день рождения", "День рождения скоро у клуба, а не у неё. Сегодня праздник — подвал."),
      no("Что Йенсен пришёл", "Йенсена нет. Петерсен празднует дверь."),
    ],
  },
  petersen("Und die Firma aus Gaarden ruft wieder an. Noch vier Tage – dann ist Freitag!", "А фирма из Гаардена опять звонит. Ещё четыре дня — и пятница!"),
  {
    t: "game",
    task: "На доске фрау Петерсен ключи висят на трёх крючках: der, die, das. Повесьте бирки.",
    hint: HINT_DOCK,
    c: docks(["der Keller", "die Küche", "das Bad", "der Flur", "das Treppenhaus", "der Balkon", "das Zimmer", "die Wohnung", "das Wohnzimmer", "das Schlafzimmer"]),
  },
  {
    t: "game",
    task: "На новых бирках фрау Петерсен длинные слова. Соберите их из частей и выберите артикль.",
    hint: "Род сложного слова — по последней части: das Haus → das Treppenhaus, der Tisch → der Schreibtisch.",
    c: {
      kind: "compound",
      rounds: [
        { word: "das Treppenhaus", parts: ["Treppen", "Haus"], ru: "лестничная клетка, подъезд" },
        { word: "der Kühlschrank", parts: ["Kühl", "Schrank"], ru: "холодильник" },
        { word: "der Schreibtisch", parts: ["Schreib", "Tisch"], ru: "письменный стол" },
      ],
      extra: ["Bad", "Wohn", "Tür"],
    },
  },
  narr("Фрау Петерсен поворачивает ключ. Дверь открыта. Kekse für alle — праздник im Treppenhaus длится двадцать секунд."),
  {
    t: "game",
    rule: ["wohnen/satz-2"],
    task: "Соберите фразу фрау Петерсен: место — на первом месте.",
    hint: "Место первым, глагол всё равно второй.",
    c: order(["Im", "Keller", "ist", "es", "dunkel."], ["dunkel.", "es", "Im", "ist", "Keller"]),
  },
  {
    t: "clue",
    title: "Acht Uhr",
    text: "Acht Uhr: kein Herr Jensen, keine Möwe, das Boot ist da. Der Schlüssel passt nicht. Frau Petersen macht den Keller im Club auf — nach zwanzig Jahren.",
  },
];

// Сцена 2 · развитие: подвал клуба. Бросок: двусмысленность · чайка · спрятать · der Keller · 14 —
// в подвале клуба тайник чайки со всем, что она унесла за неделю, но Йенсена нет: «Im Keller»
// значит другой подвал.
const lager: SceneNode[] = [
  { t: "pic", src: "08-cellar.jpg", alt: "Подвал клуба при свете телефона: старые стулья, стол, шкаф, свёрнутые паруса; у окошка с разбитым стеклом — тайник чайки: угол бирки, чек, чайные пакетики, край старого фото и пляжный мяч" },
  narr("Im Keller клуба ist es dunkel. Dana macht das Handy an: старые стулья, ein Tisch, ein Schrank, паруса."),
  hauke("Herr Jensen? Hallo? … Niemand da.", "Господин Йенсен? Алло? … Никого."),
  { t: "game", task: "Дана светит телефоном по углам. Послушайте слово и нажмите на картинку.", hint: HINT_PICTURE, c: scene([["der Stuhl", "🪑"], ["das Sofa", "🛋️"], ["das Bett", "🛏️"], ["die Lampe", "💡"], ["der Kühlschrank", "🧊"], ["der Herd", "🍳"], ["der Kleiderschrank", "🚪"], ["der Schreibtisch", "🖥️"]]) },
  narr("Стол стоит ровно посередине — это {mitte} подвала. Шкаф — {daneben}: {hoch}, почти до потолка, и {breit}, как ворота."),
  narr("А {zwischen} Tisch und Schrank — Segel, свёрнутые, как спальные мешки."),
  narr("Am Fenster, в стекле дыра. И тут — {lager}: на столе, в шкафу, в ящике. Всё, что die Möwe унесла за неделю."),
  {
    t: "look",
    task: "Осмотрите тайник чайки.",
    items: [
      { icon: "🏷️", de: "der Anhänger", ru: "бирка", note: "Тот самый угол бирки, который чайка оторвала в первый день. Номер целый: 12.", key: true },
      { icon: "🧾", de: "der Kassenbon", ru: "чек", note: "Чек фрау Крузе: суббота, 17:05. Чайка унесла его на рынке." },
      { icon: "🫖", de: "der Teebeutel", ru: "чайный пакетик", note: "Пакетики с террасы — с чая Йенсена в половине шестого." },
      { icon: "🏐", de: "der Strandball", ru: "пляжный мяч", note: "Вчерашний мяч с пляжа. Сдулся, но цел.", key: true },
      { icon: "🖼️", de: "das Foto", ru: "фото", note: "Край фото 1976 года — тот, что чайка оторвала в главе про семью." },
    ],
  },
  elif("Seht ihr? Die Möwe ist kein Dieb. Sie sammelt nur!", "Видите? Чайка не вор. Она просто собирает!"),
  hauke("Und wem gehört das alles? Moment … Der Strandball gehört mir!", "А чьё это всё? Минутку… Пляжный мяч — мой!"),
  { t: "gap", rule: ["moin/wem-1"], task: "Чей мяч? Запишите за Хауке.", text: "Der Strandball gehört ___.", options: ["mir", "mich", "ich"], answer: "mir", ru: "Пляжный мяч — мой." },
  hauke("Und das Schild? Ist das Schild auch hier?", "А табличка? Табличка тоже здесь?"),
  elif("Nein! Das Schild ist zu groß und zu schwer. Eine Möwe wiegt ein Kilo!", "Нет! Табличка слишком большая и тяжёлая. Чайка весит килограмм!"),
  {
    t: "hear",
    task: "Почему чайка не могла унести табличку?",
    voice: "Flo",
    de: "Nein! Das Schild ist zu groß und zu schwer. Eine Möwe wiegt ein Kilo!",
    options: ["табличка слишком большая и тяжёлая", "табличка прибита к стене", "чайка боится таблички"],
    answer: "табличка слишком большая и тяжёлая",
  },
  {
    t: "reply",
    rule: ["wohnen/adjektiv-1"],
    task: "Хауке всё ещё подозревает чайку. Возразите вежливо, как Элиф.",
    options: [
      ok("Nein, das stimmt nicht. Das Schild ist zu schwer."),
      no("Ja, das stimmt. Das Schild ist zu schwer.", "Вы же возражаете: Nein, das stimmt nicht."),
      no("Nein, das stimmt nicht. Das Schild ist zu schwerer.", "После sein прилагательное без окончания: zu schwer."),
    ],
  },
  dana("Und der Anhänger liegt unter dem Stuhl!", "А бирка лежит под стулом!"),
  {
    t: "game",
    rule: ["wohnen/wo-1", "wohnen/wo-2", "moin/unter-1"],
    task: "Запишите в блокнот, где что лежит в тайнике.",
    hint: "Где? — дательный: der, das → dem; die → der. in + dem = im, unter + dem — раздельно.",
    c: gaps("Der Strandball liegt ___ Tisch. Das Foto liegt ___ Schrank. Die Teebeutel liegen ___ Kiste. Der Anhänger liegt ___ Stuhl.", ["auf dem", "im", "in der", "unter dem", "in den", "unter den"], ["auf dem", "im", "in der", "unter dem"]),
  },
  {
    t: "type",
    rule: ["wohnen/satz-1"],
    task: "Запишите, где тайник чайки.",
    answers: ["Das Lager ist im Keller.", "Das Lager der Möwe ist im Keller.", "Im Keller ist das Lager."],
    ru: "Тайник — в подвале.",
  },
  {
    t: "game",
    rule: ["wohnen/wo-1", "wohnen/im-1"],
    task: "Расставь вещи по плану: верните находки на свои места в подвале.",
    hint: "Смотрите на предлоги места: auf dem Tisch, im Schrank, in der Kiste, unter dem Stuhl, am Fenster.",
    c: {
      kind: "room",
      title: "Keller · Das Lager",
      furniture: [
        { x: 110, y: 70, w: 100, h: 46, label: "Tisch" },
        { x: 24, y: 24, w: 66, h: 90, label: "Schrank" },
        { x: 240, y: 120, w: 54, h: 46, label: "Stuhl" },
        { x: 230, y: 20, w: 68, h: 36, label: "Fenster" },
        { x: 24, y: 144, w: 72, h: 38, label: "Kiste" },
      ],
      spots: [
        { id: "table", x: 160, y: 92, label: "auf dem Tisch" },
        { id: "cabinet", x: 57, y: 69, label: "im Schrank" },
        { id: "window", x: 264, y: 38, label: "am Fenster" },
        { id: "chair", x: 267, y: 143, label: "unter dem Stuhl" },
        { id: "crate", x: 60, y: 163, label: "in der Kiste" },
      ],
      items: [
        { id: "ball", icon: "🏐", de: "der Strandball", ru: "пляжный мяч" },
        { id: "foto", icon: "🖼️", de: "das Foto", ru: "край фото" },
        { id: "tee", icon: "🫖", de: "der Teebeutel", ru: "пакетик чая" },
        { id: "tag", icon: "🏷️", de: "der Anhänger", ru: "бирка" },
        { id: "bon", icon: "🧾", de: "der Kassenbon", ru: "чек" },
      ],
      notes: [
        { de: "Der Strandball liegt auf dem Tisch.", ru: "Пляжный мяч лежит на столе." },
        { de: "Das Foto liegt im Schrank.", ru: "Фото лежит в шкафу." },
        { de: "Der Teebeutel liegt in der Kiste.", ru: "Пакетик чая лежит в ящике." },
        { de: "Der Anhänger liegt unter dem Stuhl.", ru: "Бирка лежит под стулом." },
        { de: "Der Kassenbon liegt am Fenster.", ru: "Чек лежит у окна." },
      ],
      answer: { ball: "table", foto: "cabinet", tee: "crate", tag: "chair", bon: "window" },
    },
  },
  narr("Элиф наводит {ordnung}: каждую находку надо {legen} на своё место. Мяч сначала надо {waschen}."),
  {
    t: "game",
    rule: ["wohnen/stock-3"],
    task: "Когда чайка унесла каждую находку? Соедините.",
    hint: "Порядковые: am ersten, am dritten, am fünften, am siebten Tag.",
    c: pairs([["der Anhänger", "am ersten Tag"], ["das Foto", "am dritten Tag"], ["der Kassenbon", "am fünften Tag"], ["der Strandball", "am siebten Tag"]]),
  },
  narr("8:40. Kein Herr Jensen. Фрау Петерсен смотрит на ключ — и смеётся."),
  petersen("Dieser Schlüssel ist nicht vom Club! Das ist der Keller von Herrn Jensen – im Haus am Hafen.", "Этот ключ не от клуба! Это подвал господина Йенсена — в доме у гавани."),
  {
    t: "hear",
    task: "Что фрау Петерсен говорит о ключе?",
    voice: "Sandy",
    de: "Dieser Schlüssel ist nicht vom Club! Das ist der Keller von Herrn Jensen – im Haus am Hafen.",
    options: ["ключ от подвала Йенсена в доме у гавани", "ключ от подвала клуба", "ключ от офиса клуба"],
    answer: "ключ от подвала Йенсена в доме у гавани",
  },
  dana("Zwei Keller! «Im Keller» – aber in welchem?", "Два подвала! «В подвале» — но в каком?"),
  {
    t: "pick",
    task: "Что пошло не так утром?",
    options: [
      ok("Мы ждали Йенсена не в том подвале"),
      no("Йенсен опоздал", "Йенсен никогда не опаздывает. Это мы пришли не туда."),
      no("Записка ошибочная", "Записка верная: «Im Keller». Просто подвалов два."),
    ],
  },
  {
    t: "game",
    task: "Хауке проверяет: что в группе лишнее?",
    hint: HINT_ODD,
    c: odd([
      [["der Stuhl", "der Tisch", "das Bett", "die Küche"], "die Küche", "Кухня — комната, остальное — мебель."],
      [["die Miete", "die Kaltmiete", "die Warmmiete", "der Herd"], "der Herd", "Плита — техника, остальное — деньги за квартиру."],
      [["hell – dunkel", "ruhig – laut", "teuer – günstig", "die Möbel"], "die Möbel", "Мебель — вещи, остальное — пары противоположностей."],
    ]),
  },
  { t: "game", task: "Подпишите находки из подвала по буквам.", hint: HINT_SPELL, c: letters(["der Schrank", "die Lampe", "das Sofa"]) },
  narr("Хауке уже бежит наверх. Die Kekse фрау Петерсен остаются im Keller — für die Möwe."),
  {
    t: "clue",
    title: "Das Lager",
    text: "Im Keller im Club: das Lager der Möwe — Anhänger, Kassenbon, Teebeutel, Strandball. Kein Schild. Der Schlüssel ist für den Keller im Haus am Hafen.",
  },
];

// Интерлюдия глазами Фрауке, в то же утро. Бросок: герой по черте · Грета · заблудиться ·
// die Wohnung · 17 — Грета, которая отвечает только письменно, трижды ищет квартиру Йенсена.
// Фрауке видит, как Йенсен в шарфе молча уезжает с Гретой, и додумывает похищение.
const kiosk: SceneNode[] = [
  { t: "pic", src: "08-kiosk.jpg", alt: "Утро у киоска Фрауке: Грета в комбинезоне молча протягивает записку, Фрауке показывает на узкий кирпичный дом у гавани" },
  narr("Тем временем, 8:20. Frauke macht den Kiosk auf. Vor dem Kiosk — Greta. Sie sagt nichts, только протягивает записку: «Wo wohnt Herr Jensen?»"),
  frauke("Herr Jensen? Im Haus am Hafen. Im ersten Stock!", "Господин Йенсен? В доме у гавани. На втором этаже!", ["der Stock", "das Haus"]),
  { t: "gap", rule: ["wohnen/stock-1"], task: "Где живёт Йенсен?", text: "Herr Jensen wohnt im ___ Stock.", options: ["ersten", "erste", "eins"], answer: "ersten", ru: "Господин Йенсен живёт на втором этаже." },
  narr("Greta — в клуб. Назад. В Kiosk. Назад. Фрауке показывает ещё раз: das Haus am Hafen, da!"),
  frauke("Nein! Das Haus am Hafen! Erster Stock – nicht Erdgeschoss!", "Нет! Дом у гавани! Второй этаж — не первый!", ["das Erdgeschoss"]),
  {
    t: "game",
    rule: ["wohnen/stock-1"],
    task: "Фрауке знает, кто где живёт в доме у гавани. Разложите по этажам.",
    hint: "Erdgeschoss — наш первый этаж, erster Stock — наш второй.",
    c: sort([["eg", "Erdgeschoss"], ["eins", "erster Stock"], ["zwei", "zweiter Stock"]], [
      ["wulff", "Herr Wulff, der Vermieter", "eg", "🔑"],
      ["jensen", "Herr Jensen", "eins", "⚓"],
      ["frei", "Die Wohnung ist frei.", "zwei", "📰"],
    ]),
  },
  narr("8:30. Greta kommt aus dem Haus — mit Herrn Jensen. На шее у него — {schal}, хотя на дворе июнь."),
  narr("Йенсен открывает рот — и ничего. Nicht einmal «Moin». Greta und Herr Jensen — {bus}. Weg."),
  frauke(ENTFUEHRUNG, "Господин Йенсен даже «Moin» не сказал! А Грета его уводит! Это похищение!", ["mitnehmen"]),
  {
    t: "hear",
    task: "Что думает Фрауке?",
    voice: "Sandy",
    de: ENTFUEHRUNG,
    options: ["что Грета похищает Йенсена", "что Йенсен уехал в отпуск", "что Грета — его дочь"],
    answer: "что Грета похищает Йенсена",
  },
  { ...narr("К девяти весь Hafen знает слово дня: {entfuehrung}. А к десяти — продолжение: Greta, Herr Jensen und {firma}! Слух едет быстрее автобуса."), set: { rumours: 1 } },
  {
    t: "type",
    task: "Запишите, что Фрауке видела на самом деле.",
    answers: ["Greta und Herr Jensen fahren mit dem Bus.", "Herr Jensen und Greta fahren mit dem Bus.", "Greta und Herr Jensen nehmen den Bus."],
    ru: "Грета и господин Йенсен уезжают на автобусе.",
  },
  {
    t: "pick",
    task: "Что из этого факт, а не слух?",
    options: [
      ok("Йенсен молча уехал с Гретой на автобусе"),
      no("Грета похитила Йенсена", "Это догадка Фрауке. Йенсен шёл сам."),
      no("Йенсен ушёл в подвал", "Он вышел из дома и сел в автобус."),
    ],
  },
  {
    t: "when",
    if: [{ q: "frauke", min: 1 }],
    then: [narr("В журнал киоска Фрауке пишет аккуратно, как привыкла: «8:30. Greta, Herr Jensen, Schal, Bus»."),],
    else: [narr("Журнала у Фрауке нет, поэтому запомнит она главное: «Entführung!»")],
  },
];

// Сцена 3 · развитие: дом у гавани, свидетели в своём порядке. Бросок: герой по черте · Элиф ·
// обменять · die Warmmiete · 5 (мелочь) — Элиф готова поменять общежитие на свободную квартиру,
// пока не видит тёплую аренду.
const stairs: SceneNode[] = [
  { t: "pic", src: "08-stairs.jpg", alt: "Подъезд узкого кирпичного дома у гавани: почтовые ящики с фамилиями, на стене объявление о свободной квартире; Хауке звонит в дверь на втором этаже, Элиф читает объявление, Дана светит телефоном" },
  narr("Neun Uhr. Das Haus am Hafen: alt, узкий, кирпичный. Erdgeschoss, erster und zweiter Stock. Im Treppenhaus — {briefkasten} для каждой квартиры."),
  {
    t: "game",
    task: "Найдите на почтовых ящиках Йенсена и его этаж.",
    c: spot("Briefkästen · Haus am Hafen", ["Erdgeschoss|Wulff · Vermieter", "1. Stock|Jensen", "2. Stock|— frei —"], ["1. Stock", "Jensen"]),
  },
  hauke("Herr Jensen wohnt im ersten Stock. Ich klingle!", "Господин Йенсен живёт на втором этаже. Я звоню!", ["das Treppenhaus"]),
  narr("Хауке звонит: раз, два, три. Тишина. Die Wohnung ist ruhig."),
  {
    t: "reply",
    rule: ["wohnen/im-1"],
    task: "Позовите Йенсена через дверь.",
    options: [
      ok("Herr Jensen, sind Sie da? Wir sind im Treppenhaus!"),
      no("Herr Jensen, sind Sie da? Wir sind in Treppenhaus!", "Нужен артикль в дательном: in dem → im Treppenhaus."),
      no("Herr Jensen, sind Sie da? Wir sind im Treppenhauses!", "После im — просто Treppenhaus, без -es."),
    ],
  },
  narr("Внизу открывается дверь: мужчина в жилете и с папкой — der Vermieter, Herr Wulff."),
  wulff("Moin! Sie suchen eine Wohnung? Die Wohnung im zweiten Stock ist frei!", "Привет! Вы ищете квартиру? Квартира на третьем этаже свободна!", ["frei", "die Wohnung"]),
  {
    t: "hear",
    task: "Что предлагает хозяин дома?",
    voice: "Eddy",
    de: "Moin! Sie suchen eine Wohnung? Die Wohnung im zweiten Stock ist frei!",
    options: ["квартиру на третьем этаже", "ключ от подвала", "комнату в общежитии"],
    answer: "квартиру на третьем этаже",
  },
  narr("Господин Вульф умеет одно: {vermieten}. В доме у гавани пять квартир, и жильцы вечно хотят {umziehen}."),
  {
    t: "game",
    task: "Поговорите с хозяином дома. Выберите ответ.",
    c: chat("Herr Wulff", "Eddy", [
      turn("Sie suchen eine Wohnung?", "Вы ищете квартиру?", "b", [
        ["a", "Ja, zwei Zimmer, bitte.", "Вы ищете не квартиру, а Йенсена."],
        ["b", "Nein, wir suchen Herrn Jensen.", "Верно: suchen + винительный — Herrn Jensen."],
        ["c", "Nein, wir suchen Herr Jensen.", "После suchen — винительный: Herrn Jensen."],
      ]),
      turn("Herr Jensen? Der ist nicht da. Heute früh – weg, mit einer Frau.", "Господин Йенсен? Его нет. Сегодня рано утром ушёл с какой-то женщиной.", "a", [
        ["a", "Mit einer Frau? Mit Greta?", "Верно: уточняете, с кем."],
        ["b", "Mit einer Frau? Danke, tschüss!", "Рано прощаться: это важная улика."],
        ["c", "Mit eine Frau? Mit Greta?", "mit + дательный: mit einer Frau."],
      ]),
      turn("Greta? Ja, vielleicht. Blaue Hände. Und Herr Jensen hat einen Schal!", "Грета? Да, наверное. Синие руки. А на господине Йенсене шарф!", "c", [
        ["a", "Danke für das Hilfe!", "die Hilfe — женский род: für die Hilfe."],
        ["b", "Bitte für die Hilfe!", "За помощь благодарят: Danke für die Hilfe."],
        ["c", "Danke für die Hilfe!", "Верно: вежливо благодарите."],
      ]),
    ]),
  },
  wulff(WULFF_KEY, "А Грета всегда всё возвращает. Вчера — второй ключ от подвала!"),
  {
    t: "hear",
    task: "Что Грета вчера вернула хозяину дома?",
    voice: "Eddy",
    de: WULFF_KEY,
    options: ["второй ключ от подвала", "квартиру на третьем этаже", "яблоко"],
    answer: "второй ключ от подвала",
  },
  {
    t: "go",
    task: "Йенсена нет. Что проверить в доме?",
    next: "Дальше по делу",
    branches: [
      {
        label: "Объявление на стене",
        icon: "📰",
        nodes: [
          narr("На стене — eine Anzeige. Элиф читает вслух — и глаза у неё загораются."),
          elif("Zwei Zimmer, Küche, Bad, Balkon! Ich tausche mein Zimmer im Wohnheim!", "Две комнаты, кухня, ванная, балкон! Меняю свою комнату в общежитии!", ["das Wohnheim", "der Balkon"]),
          {
            t: "game",
            rule: ["wohnen/lesen2-1"],
            task: "Найдите в объявлении, сколько стоит квартира вместе с отоплением.",
            hint: "KM — Kaltmiete, NK — Nebenkosten, WM — Warmmiete: всё вместе.",
            c: spot("Anzeige · 2. Stock", ["2-Zi.-Whg.|Blk.|ruhig", "KM 520 €|NK 130 €|WM 650 €", "frei ab sofort|Tel. Wulff"], ["WM 650 €"]),
          },
          elif("Und hier: Nebenkosten, hundertdreißig Euro!", "А вот: коммунальные расходы, сто тридцать евро!", ["die Nebenkosten"]),
          elif("650 Euro warm? … Nein, danke. Ich bleibe im Wohnheim. Das ist kleiner, aber billiger als die Wohnung!", "650 евро с отоплением? … Нет, спасибо. Я остаюсь в общежитии. Оно меньше, зато дешевле квартиры!", ["warm"]),
          { t: "gap", rule: ["wohnen/komposita-1"], task: "Что стоит 650 евро?", text: "Die ___ ist 650 Euro: Miete und Nebenkosten.", options: ["Warmmiete", "Kaltmiete", "Nebenkosten"], answer: "Warmmiete", ru: "Тёплая аренда — 650 евро: аренда и коммунальные." },
          {
            t: "look",
            task: "Дочитайте объявление до конца.",
            items: [
              { icon: "🛋️", de: "das Wohnzimmer", ru: "гостиная", note: "«Wohnzi. 20 m²» — самая большая комната.", key: true },
              { icon: "📐", de: "der Quadratmeter", ru: "квадратный метр", note: "«55 m²» на всю квартиру. Пишут m², читают Quadratmeter." },
              { icon: "🪑", de: "möbliert", ru: "с мебелью", note: "«möbl.» — кровать, стол и шкаф уже стоят." },
              { icon: "✨", de: "modern", ru: "современный", note: "«mod. Küche» — кухня новая, остальное старое." },
              { icon: "🔥", de: "die Heizung", ru: "отопление", note: "«Hzg. inkl.» — отопление уже в Warmmiete." },
              { icon: "🧭", de: "der Osten", ru: "восток", note: "«Blk. Ost» — балкон на восток: солнце по утрам." },
              { icon: "🌊", de: "der Blick", ru: "вид из окна", note: "«Blick auf den Hafen» — окна на гавань. За этот вид Вульф и берёт 650." },
            ],
          },
          narr("Сам Вульф называет квартиру иначе: {apartment}. Так звучит дороже."),
          narr("Обмен не случился: im Wohnheim у Элиф тоже есть Balkon. Общий, на сорок человек."),
        ],
      },
      {
        label: "Слух Фрауке",
        icon: "🗞️",
        optional: true,
        nodes: [
          narr("Фрауке прибегает прямо в фартуке — мимо собственной очереди."),
          frauke(ENTFUEHRUNG, "Господин Йенсен даже «Moin» не сказал! А Грета его уводит! Это похищение!"),
          {
            t: "reply",
            task: "Сверьте слух с Фрауке.",
            options: [
              ok("Stimmt das, Frauke?"),
              no("Das stimmt, Frauke!", "Вы сверяете, а не соглашаетесь: Stimmt das?"),
              no("Stimmst das, Frauke?", "das — третье лицо: stimmt."),
            ],
          },
          frauke("Na ja … Greta und Herr Jensen – zusammen, mit dem Bus. Das ist alles.", "Ну… Грета и господин Йенсен — вместе, на автобусе. Вот и всё."),
          {
            t: "game",
            task: "Поставьте штамп: что Фрауке видела сама, а что додумала?",
            c: verdict(["Видела", "Додумала"], [
              ["Грета и Йенсен уехали вместе", true, "Это она видела."],
              ["Это похищение", false, "Йенсен шёл сам. Похищение — догадка Фрауке."],
              ["На Йенсене был шарф", true, "Шарф она видела — и удивилась."],
            ]),
          },
          { ...narr("Фрауке пишет ins Journal: «Greta, Herr Jensen, Bus, 8:30». Без «Entführung». Слух сдулся."), set: { rumours: -1 } },
        ],
      },
    ],
  },
  narr("Внизу, im Treppenhaus, — noch eine Tür, klein und dunkel. На двери записка, почерк как в {logbuch}."),
  hauke(JENSEN_NOTE, "Сегодня нет. К сожалению. Moin."),
  dana("Vier Wörter. Herr Jensen meint diesen Keller. Und wir – im Club!", "Четыре слова. Господин Йенсен имел в виду этот подвал. А мы — в клубе!"),
  {
    t: "hear",
    task: "Хауке читает записку вслух. Что в ней?",
    voice: "Rocko",
    de: JENSEN_NOTE,
    options: ["сегодня нет, к сожалению", "сегодня в восемь, в подвале", "завтра в клубе"],
    answer: "сегодня нет, к сожалению",
  },
  {
    t: "pick",
    task: "Почему Йенсен пишет «Heute nicht»?",
    options: [
      ok("Он ждал нас здесь в восемь, мы были в другом подвале, а ему пришлось уехать"),
      no("Он передумал говорить", "Тогда он не оставил бы ключ и записку."),
      no("Он нас не звал", "Звал: Morgen um acht. Im Keller."),
    ],
  },
  {
    t: "type",
    rule: ["wohnen/satz-1"],
    task: "Запишите вывод в блокнот: где подвал Йенсена.",
    answers: ["Der Keller ist im Haus am Hafen.", "Der Keller von Herrn Jensen ist im Haus am Hafen.", "Im Haus am Hafen ist der Keller."],
    ru: "Подвал — в доме у гавани.",
  },
  { t: "game", task: "Элиф подписывает в блокноте слова подъезда по буквам.", hint: HINT_SPELL, c: letters(["das Erdgeschoss", "der Vermieter", "die Anzeige", "die Treppe", "der Aufzug"]) },
  {
    t: "clue",
    title: "Heute nicht",
    text: "Haus am Hafen: Herr Jensen wohnt im ersten Stock — niemand da. Herr Wulff: «Weg, mit einer Frau.» Der zweite Schlüssel für den Keller ist wieder da — von Greta. An der Kellertür: «Heute nicht. Leider. Moin.»",
  },
];

// Сцена 4 · поворот и кризис: подвал Йенсена. Пустая коробка с контуром MOIN, адрес мастерской, и
// мастерская сегодня закрыта. След обрывается.
const empty: SceneNode[] = [
  { t: "pic", src: "08-karton.jpg", alt: "Подвал Йенсена: на старом столе большая плоская коробка, в поролоне вырезан контур букв MOIN — пусто; Хауке схватился за голову, Дана светит фонариком, Элиф держит карточку с адресом" },
  narr("Der Schlüssel passt. Im Keller von Herrn Jensen ist es hell — и очень аккуратно: ein Tisch, ein Stuhl, ein Schrank, Segel im Regal."),
  elif("Das Licht ist an! Herr Jensen ist nicht weit.", "Свет горит! Господин Йенсен где-то рядом.", ["an sein"]),
  narr("Auf dem Tisch — {karton}, groß und flach. Внутри поролон, а в поролоне — {umriss}: M, O, I, N."),
  narr("Больше в нём ничего нет. {leer}"),
  {
    t: "look",
    task: "Осмотрите подвал Йенсена.",
    items: [
      { icon: "📦", de: "der Karton", ru: "коробка", note: "Плоская коробка точно по размеру таблички. Пустая.", key: true },
      { icon: "🔠", de: "der Umriss", ru: "контур", note: "Буквы M, O, I, N вырезаны в поролоне. Табличка легла бы сюда точно.", key: true },
      { icon: "🗄️", de: "der Schrank", ru: "шкаф", note: "Старый плащ Йенсена и банки из-под чая. Таблички нет." },
      { icon: "🗂️", de: "das Regal", ru: "стеллаж", note: "Паруса, свёрнутые ровно, по-йенсеновски." },
    ],
  },
  dana("Das ist der Umriss vom Schild. Aber das Schild ist weg!", "Это контур таблички. Но самой таблички нет!"),
  elif("Der Karton ist neu. Und der Umriss ist genau. Das ist Profi-Arbeit.", "Коробка новая. И контур точный. Это работа профи."),
  hauke("Der Karton ist leer! Noch fünf Tage – und kein Schild!", "Коробка пустая! Ещё пять дней — и никакой таблички!"),
  { t: "gap", task: "Что вырезано в поролоне?", text: "Im Karton ist der ___ vom Schild.", options: ["Umriss", "Stempel", "Anhänger"], answer: "Umriss", ru: "В коробке — контур таблички." },
  {
    t: "reply",
    rule: ["essen/akkusativ-2"],
    task: "Успокойте Хауке: улики у вас есть.",
    options: [
      ok("Ruhig, Hauke! Wir haben den Karton."),
      no("Ruhig, Hauke! Wir haben der Karton.", "haben + винительный: den Karton."),
      no("Ruhig, Hauke! Wir haben dem Karton.", "dem — дательный, на вопрос «где?». После haben — den Karton."),
    ],
  },
  narr("На дне Karton — eine Karte: «Werkstatt · Farbenweg 7 · Kiel-Gaarden». Und eine Telefonnummer."),
  { t: "item", icon: "🏷️", de: "die Adresse", ru: "Werkstatt, Farbenweg 7, Kiel-Gaarden — карточка из коробки" },
  {
    t: "type",
    task: "Перепишите адрес мастерской в блокнот.",
    answers: ["Farbenweg 7, Kiel-Gaarden", "Farbenweg 7, Gaarden", "Holzwerkstatt, Farbenweg 7, Kiel-Gaarden", "Farbenweg 7"],
    ru: "Мастерская: Фарбенвег, дом 7, Гаарден.",
  },
  hauke("Null, vier, drei, eins. Fünf, fünf, sechs, zwei. Neun, null. Ich rufe an!", "Ноль, четыре, три, один. Пять, пять, шесть, два. Девять, ноль. Звоню!"),
  {
    t: "game",
    task: "Наберите номер мастерской, который читает Хауке.",
    c: { kind: "code", length: 10, answer: "0431556290", label: "Номер телефона" },
  },
  narr("Гудки. Потом — автоответчик:"),
  machine("Holzwerkstatt am Farbenweg. Heute ist die Werkstatt zu. Bitte rufen Sie morgen an.", "Столярная мастерская на Фарбенвег. Сегодня мастерская закрыта. Пожалуйста, позвоните завтра."),
  {
    t: "hear",
    task: "Что говорит автоответчик?",
    voice: "Shelley",
    de: "Holzwerkstatt am Farbenweg. Heute ist die Werkstatt zu. Bitte rufen Sie morgen an.",
    options: ["сегодня закрыто, звонить завтра", "открыто до шести вечера", "Грета перезвонит сама"],
    answer: "сегодня закрыто, звонить завтра",
  },
  dana("Die Werkstatt ist zu. Und Herr Jensen ist weg. Das ist kein Zufall.", "Мастерская закрыта. И Йенсена нет. Это не случайность."),
  elif("Heute geschlossen – das steht an der Tür. Wir müssen morgen wiederkommen.", "«Сегодня закрыто» — написано на двери. Придётся прийти завтра.", ["geschlossen"]),
  { t: "gap", rule: ["moin/geoeffnet-1"], task: "Что написано на двери мастерской?", text: "Heute ___.", options: ["geschlossen", "schließen", "geschließt"], answer: "geschlossen", ru: "Сегодня закрыто." },
  {
    t: "pick",
    task: "Что теперь главное?",
    options: [
      ok("Узнать, кто забрал табличку из коробки и при чём тут мастерская"),
      no("Сдаться: до старта пять дней", "Детективы не сдаются за пять дней до развязки."),
      no("Обыскать квартиру Йенсена", "Без Йенсена — нельзя. Ключ у нас только от подвала."),
    ],
  },
  {
    t: "game",
    rule: ["wohnen/wo-1"],
    task: "Что где нашли за утро? Соедините.",
    hint: "Где? — im Keller, im Karton, an der Tür: дательный.",
    c: pairs([["im Keller vom Club", "das Lager der Möwe"], ["im Keller von Herrn Jensen", "der Karton"], ["im Karton", "die Adresse"], ["an der Kellertür", "«Heute nicht»"]]),
  },
  {
    t: "game",
    task: "Чайка крадётся к булочке: угадайте четыре слова подвала по буквам.",
    hint: "Нажмите кнопку, чтобы послушать слово. Артикль уже показан цветом.",
    c: { kind: "gullword", words: ["der Tisch", "der Stuhl", "die Lampe", "der Keller"] },
  },
  { t: "game", task: "Хауке повторяет, чтобы не забыть. Повторите за ним вслух.", hint: HINT_SAY, c: speak(["der Keller", "das Haus", "das Erdgeschoss"]) },
  {
    t: "clue",
    title: "Leer",
    text: "Im Keller von Herrn Jensen: ein Karton mit dem Umriss MOIN — leer. Im Karton: Werkstatt, Farbenweg 7, Gaarden. Am Telefon: «Heute ist die Werkstatt zu.»",
  },
];

// Сцена 5 · кульминация: билет в коридоре, замок и записка. Бросок: честная улика · Дана ·
// отпраздновать · der Flur · 13 — Дана находит в коридоре воскресный билет в Gaarden и празднует:
// диагноз сходится. Заодно она объявляет вчерашний диагноз: Матео печёт торт, он не вор.
const ticket: SceneNode[] = [
  { t: "pic", src: "08-flur.jpg", alt: "Узкий коридор дома у гавани: Дана подняла с пола автобусный билет и пританцовывает, Хауке и Элиф смотрят на неё, в дверях Матео с пакетом булочек" },
  narr("Снова im Flur. Дана замирает. У самой двери — {fahrkarte}, маленький и мятый."),
  dana("Eine Fahrkarte! Sonntag, Viertel vor sechs, Hafen – Gaarden!", "Билет! Воскресенье, без четверти шесть, гавань — Гаарден!", ["der Flur"]),
  {
    t: "hear",
    task: "Что на билете?",
    voice: "Anna",
    de: "Eine Fahrkarte! Sonntag, Viertel vor sechs, Hafen – Gaarden!",
    options: ["воскресенье, 17:45, гавань — Гаарден", "понедельник, 8:00, гавань — клуб", "воскресенье, 18:15, Гаарден — гавань"],
    answer: "воскресенье, 17:45, гавань — Гаарден",
  },
  narr("Dana tanzt im Flur. Сорок секунд, молча. Врачи тоже празднуют, когда диагноз сходится."),
  {
    t: "game",
    rule: ["tagesablauf/wann-1"],
    task: "Поставьте часы на время с билета.",
    c: clock("17:45", {
      "17:15": "Viertel nach fünf — 17:15. На билете — Viertel vor sechs.",
      "16:45": "Viertel vor fünf — 16:45. На билете — Viertel vor sechs.",
      "18:15": "Это Viertel nach sechs. На билете — без четверти шесть.",
    }),
  },
  dana("Gaarden? Ich wohne in Gaarden! Der Farbenweg ist bei mir um die Ecke!", "Гаарден? Я живу в Гаардене! Фарбенвег — за углом от меня!"),
  hauke("Gaarden! Die Firma ist auch in Gaarden! Die Frau mit der Tasche fährt zur Firma!", "Гаарден! Фирма ведь тоже в Гаардене! Женщина с сумкой едет в фирму!"),
  {
    t: "type",
    rule: ["kennenlernen/endungen-1"],
    task: "Запишите в блокнот, где живёт Дана: это пригодится завтра.",
    answers: ["Dana wohnt in Gaarden.", "Sie wohnt in Gaarden."],
    ru: "Дана живёт в Гаардене.",
  },
  elif("Und Greta hat Farbe an den Händen. Dunkelblau.", "А у Греты краска на руках. Тёмно-синяя."),
  { t: "gap", rule: ["wohnen/wo-3"], task: "Где работает Грета?", text: "Greta arbeitet in einer ___ in Gaarden.", options: ["Werkstatt", "Keller", "Büro"], answer: "Werkstatt", ru: "Грета работает в мастерской в Гаардене." },
  narr("В дверях — Mateo, mit einer Tüte Brötchen: «Frühstück!» Dana sieht ihn an — и ставит вчерашний диагноз."),
  dana("Meine Diagnose von gestern: Mateo backt einen Kuchen. Mateo ist kein Dieb.", "Мой вчерашний диагноз: Матео печёт торт. Матео не вор."),
  mateo("Ich? Einen Kuchen? Nein! … Brötchen. Nur Brötchen. Für euch!", "Я? Торт? Нет!… Булочки. Только булочки. Для вас!"),
  {
    t: "hear",
    task: "Что отвечает Матео на диагноз?",
    voice: "Reed",
    de: "Ich? Einen Kuchen? Nein! … Brötchen. Nur Brötchen. Für euch!",
    options: ["что принёс только булочки", "что печёт торт для клуба", "что хлеб — для чайки"],
    answer: "что принёс только булочки",
  },
  {
    t: "pick",
    task: "Кто теперь главный подозреваемый?",
    options: [
      ok("Грета: билет в Gaarden, мастерская, краска на руках"),
      no("Матео", "Дана сняла с него подозрение: он печёт, а не ворует."),
      no("Чайка", "Элиф доказала: табличка слишком тяжёлая."),
    ],
  },
  hauke("Greta hat das Schild! Aber warum? Und warum hilft Herr Jensen?", "Табличка у Греты! Но зачем? И почему господин Йенсен ей помогает?"),
  {
    t: "game",
    rule: ["wohnen/wo-1", "wohnen/stock-1"],
    task: "Блокнот закрыт на фразы дня. Поверните диски.",
    hint: HINT_LOCK,
    c: lock([
      ["Коробка — в подвале.", [["Der Karton", "Den Karton", "Dem Karton"], ["ist", "sind", "bist"], ["im Keller.", "in Keller.", "im Kellern."]]],
      ["Господин Йенсен живёт на втором этаже.", [["Herr Jensen", "Herrn Jensen", "Herr Jensens"], ["wohnt", "wohne", "wohnst"], ["im ersten Stock.", "im erste Stock.", "in ersten Stock."]]],
      ["Мастерская — в Гаардене.", [["Die Werkstatt", "Der Werkstatt", "Das Werkstatt"], ["ist", "hat", "sind"], ["in Gaarden.", "im Gaarden.", "nach Gaarden."]]],
    ]),
  },
  {
    t: "reply",
    task: "Хауке хочет ехать в мастерскую прямо сейчас. Остановите его.",
    options: [
      ok("Heute nicht, Hauke. Die Werkstatt ist heute zu."),
      no("Heute nicht, Hauke. Die Werkstatt ist heute auf.", "Наоборот: zu — закрыто. Так сказал автоответчик."),
      no("Heute nicht, Hauke. Die Werkstatt ist morgen zu.", "Автоответчик: сегодня закрыто, звонить — завтра."),
    ],
  },
  {
    t: "type",
    rule: ["tagesablauf/vorfeld-1"],
    task: "Запишите план на завтра: время — на первом месте.",
    answers: ["Morgen fahren wir nach Gaarden.", "Morgen fahren wir mit dem Bus nach Gaarden.", "Morgen fahren wir zur Werkstatt."],
    ru: "Завтра мы едем в Гаарден.",
  },
  narr("Перед уходом — записка Йенсену. Der Briefkasten im Erdgeschoss ждёт."),
  {
    t: "game",
    rule: ["wohnen/wo-1"],
    task: "Напишите записку Йенсену по образцу: запиской фрау Петерсен для клуба. Подписываются Хауке и Дана, поэтому — wir.",
    hint: HINT_LETTER,
    c: letter(
      "Herr Jensen",
      ["Liebe Leute,", "der Keller im Club ist jetzt offen.", "Die Kekse sind im Keller, auf dem Tisch.", "Viele Grüße", "Frau Petersen"],
      [
        an("Lieber", "Herr Jensen"),
        ["Wo? → wir: um acht im Keller vom Club sein", "Wir sind um acht im Keller vom Club.", "wir sind um acht im Keller vom Club.", "Um acht sind wir im Keller vom Club.", "um acht sind wir im Keller vom Club."],
        ["Karton → im Keller sein, leer", "Der Karton im Keller ist leer.", "der Karton im Keller ist leer.", "Der Karton ist leer.", "der Karton ist leer."],
        ["Frage → wo: das Schild sein?", "Wo ist das Schild?", "wo ist das Schild?"],
        gruss("Hauke und Dana"),
      ],
    ),
  },
  {
    t: "game",
    rule: ["wohnen/satz-1"],
    task: "Соберите вывод Даны для блокнота.",
    hint: "Подлежащее, глагол второй, место — одной позицией в конце.",
    c: order(["Die", "Werkstatt", "ist", "in", "Gaarden."], ["Gaarden.", "ist", "Die", "in", "Werkstatt"]),
  },
  {
    t: "clue",
    title: "Die Fahrkarte",
    text: "Im Flur: eine Fahrkarte, Sonntag, 17:45, Hafen — Gaarden. Die Werkstatt ist in Gaarden — und die Firma auch. Greta hat Farbe an den Händen. Mateo: nur ein Kuchen.",
  },
];

// Сцена 6 · эпилог и крючок: вечер в клубе, чайка на чужом стуле, речь как на экзамене и план
// на Gaarden. Если слухи Фрауке так и не сверили, Нильс приходит обиженным, и команда извиняется.
const evening: SceneNode[] = [
  { t: "pic", src: "08-evening.jpg", alt: "Вечер в клубе, за окном гнутся мачты: чайка с кольцом сидит на стуле фрау Петерсен, как член клуба; Петерсен держит формуляр, Элиф смеётся, Хауке показывает на окно" },
  narr("Abend im Club. На улице — ветер, мачты стучат. А в клубе — {moewe}. Не на крыше: auf dem Stuhl von Frau Petersen."),
  petersen("Das ist mein Stuhl! Wo ist das Formular für Möwen?", "Это мой стул! Где формуляр для чаек?", ["der Stuhl"]),
  elif("Sie hat Angst vor dem Sturm. Heute schläft sie im Club!", "Она боится шторма. Сегодня она ночует в клубе!"),
  hauke("Den ganzen Tag keine Möwe – und jetzt im Club? Verdächtig!", "Целый день ни одной чайки — а теперь в клубе? Подозрительно!"),
  { t: "gap", rule: ["wohnen/wo-1"], task: "Где сидит чайка?", text: "Die Möwe sitzt auf dem ___ von Frau Petersen.", options: ["Stuhl", "Tisch", "Schrank"], answer: "Stuhl", ru: "Чайка сидит на стуле фрау Петерсен." },
  {
    t: "hear",
    task: "Почему чайка в клубе?",
    voice: "Flo",
    de: "Sie hat Angst vor dem Sturm. Heute schläft sie im Club!",
    options: ["боится шторма", "ищет хлеб", "ждёт Йенсена"],
    answer: "боится шторма",
  },
  {
    t: "when",
    if: [{ q: "rumours", min: 3 }],
    then: [
      narr("Nils kommt — без единого «!». Он пишет коротко: «Alle sagen: Nils hat das Schild. Nils ist bei der Polizei. Das stimmt nicht.»"),
      narr("Хауке краснеет первым и говорит: {entschuldigung} Нильс кивает. Через минуту в его сообщениях снова «!!!»."),
    ],
    else: [narr("Nils kommt mit dem Handy: «Sturm!!! Morgen!!! Alle Boote in den Hafen!!!» Нильс снова всё знает первым.")],
  },
  elif("Sie ist hier, denn sie hat Angst. Und Frau Petersens Stuhl ist warm!", "Она здесь, потому что ей страшно. А стул фрау Петерсен тёплый!"),
  {
    t: "reply",
    rule: ["moin/denn-1"],
    task: "Объясните Хауке, почему чайка в клубе, — как Элиф.",
    options: [
      ok("Sie ist hier, denn sie hat Angst vor dem Sturm."),
      no("Sie ist hier, denn hat sie Angst vor dem Sturm.", "После denn порядок обычный: denn sie hat …"),
      no("Sie ist hier, dann sie hat Angst vor dem Sturm.", "dann — «потом», и после него глагол сразу. Причину называет denn."),
    ],
  },
  {
    t: "game",
    task: "Хауке устраивает репетицию экзамена. Тема дня — жильё.",
    hint: HINT_ORAL,
    c: oral([
      oralSay(2, ASK, "Thema: Wohnung · Wort: Zimmer", "Wie viele Zimmer hat deine Wohnung?", "Сколько комнат в твоей квартире?", "Wie viele …?"),
      oralReply(2, ANSWER, "Wo wohnst du?", "Ich wohne in Kiel, im ersten Stock.", "Я живу в Киле, на втором этаже."),
      oralSay(3, REQUEST, "🪑", "Ist der Stuhl frei?", "Этот стул свободен?"),
    ]),
  },
  narr("В клубе один {toilette}, и весь вечер на двери табличка: {besetzt}. Стулья тоже заняты."),
  petersen("Der Stuhl ist nicht frei. Die Möwe sitzt da!", "Стул не свободен. На нём сидит чайка!"),
  {
    t: "reply",
    rule: ["wohnen/adjektiv-1"],
    task: "Предложите чайке другой стул.",
    options: [
      ok("Möwe, hier ist ein Stuhl. Der Stuhl ist frei!"),
      no("Möwe, hier ist ein Stuhl. Der Stuhl ist freie!", "После sein прилагательное без окончания: frei."),
      no("Möwe, hier ist eine Stuhl. Der Stuhl ist frei!", "der Stuhl — мужской род: ein Stuhl."),
    ],
  },
  {
    t: "type",
    task: "Запишите в блокнот главное за день: что с коробкой.",
    answers: ["Der Karton ist leer.", "Der Karton im Keller ist leer.", "Der Karton von Herrn Jensen ist leer."],
    ru: "Коробка пустая.",
  },
  { t: "game", task: "Слова дня перемешались. Откройте пары: немецкое слово и перевод.", c: memory(["lager", "karton", "umriss", "briefkasten", "fahrkarte", "sturm"]) },
  mateo("Suppe für alle! Für die Möwe – nein.", "Суп для всех! Для чайки — нет."),
  {
    t: "pick",
    task: "Что нового за день?",
    options: [
      ok("У Йенсена в подвале пустая коробка под табличку, а след ведёт в мастерскую в Gaarden"),
      no("Табличку нашли", "Нашли только пустую коробку и контур."),
      no("Йенсен всё рассказал", "Йенсен уехал с Гретой. Осталась записка из четырёх слов."),
    ],
  },
  { t: "game", task: "Лото на ночь: послушайте слово и закройте его на карточке.", hint: HINT_HEAR, c: bingo(["der Keller", "der Flur", "das Treppenhaus", "die Wohnung", "der Stuhl", "der Schrank", "die Lampe", "der Balkon", "das Erdgeschoss"]) },
  dana("Morgen fahren wir nach Gaarden. Ich zeige euch den Weg!", "Завтра едем в Гаарден. Я покажу вам дорогу!"),
  {
    t: "game",
    task: "Wer war wo um 8:20? Два подвала, киоск и первый этаж: расставьте четверых по уликам.",
    hint: "Начните с Греты: где её нет? Потом — кто из двоих в каком подвале.",
    c: {
      kind: "grid",
      people: ["Greta", "Frau Petersen", "Herr Jensen", "Herr Wulff"],
      cols: [{ id: "wo", label: "um 8:20", values: ["am Kiosk", "im Keller im Club", "im Keller am Hafen", "im Erdgeschoss"] }],
      clues: [
        { de: "Greta ist nicht im Keller im Club.", ru: "Греты нет в подвале клуба.", a: "Greta", b: "wo:im Keller im Club", not: true },
        { de: "Greta ist nicht im Keller am Hafen.", ru: "Греты нет в подвале у гавани.", a: "Greta", b: "wo:im Keller am Hafen", not: true },
        { de: "Herr Wulff ist im Erdgeschoss.", ru: "Герр Вульф на первом этаже.", a: "Herr Wulff", b: "wo:im Erdgeschoss" },
        { de: "Herr Jensen ist nicht im Keller im Club.", ru: "Йенсена нет в подвале клуба.", a: "Herr Jensen", b: "wo:im Keller im Club", not: true },
      ],
      answer: { "Greta|wo": "am Kiosk", "Frau Petersen|wo": "im Keller im Club", "Herr Jensen|wo": "im Keller am Hafen", "Herr Wulff|wo": "im Erdgeschoss" },
    },
  },
  { t: "game", task: "Повторите за Даной слова на завтра вслух.", hint: HINT_SAY, c: speak(["die Adresse", "die Wohnung", "das Treppenhaus"]) },
  { t: "game", task: "Хауке засыпает и бормочет комнаты. Послушайте и нажмите на картинку.", hint: HINT_PICTURE, c: scene([["die Küche", "🍳"], ["das Bad", "🛁"], ["das Schlafzimmer", "🛏️"], ["der Balkon", "🌇"], ["das Treppenhaus", "🪜"], ["die Waschmaschine", "🫧"]]) },
  narr("Вы закрываете блокнот: «День восьмой. Karton leer. Fahrkarte: Sonntag, 17:45, Gaarden. Werkstatt: Farbenweg 7». Noch vier Tage."),
  {
    t: "clue",
    title: "Gaarden",
    text: "Morgen: mit dem Bus nach Gaarden, Farbenweg 7. Herr Jensen ist weg — mit Greta. Die Möwe ist im Club, auf dem Stuhl von Frau Petersen. Ein Sturm kommt.",
  },
];

// Проверка после глав 1–8 (A1-PLOT.md, «Проверки в игре»): ночью формуляр о пропаже заставляет
// свести всё, что команда нашла за восемь дней. Броски (seed 1794766322): за кадром у фрау Петерсен
// сломалась кровать, и она ночует в клубе — а в клубе без формуляра никуда; два ложных следа
// почти ничего не дают: Фрауке забыла, что видела на кухне Матео, Хауке путает графу с
// квадратными метрами из объявления Элиф.
const formular: SceneNode[] = [
  { t: "pic", src: "08-formular.jpg", alt: "Ночь в офисе клуба: фрау Петерсен с подушкой под мышкой держит бланк и штамп; Хауке пишет за столом; в окно стучит Фрауке; чайка спит на стуле" },
  narr("Es ist spät, aber im {buero} ist Licht. Da ist Frau Petersen — с подушкой под мышкой и в тапочках."),
  petersen("Mein Bett ist kaputt! Heute schlafe ich im Club.", "Моя кровать сломалась! Сегодня я сплю в клубе."),
  {
    t: "reply",
    rule: ["kennenlernen/pronomen-1"],
    task: "Поздоровайтесь с фрау Петерсен.",
    options: [
      ok("Guten Abend, Frau Petersen! Alles gut?"),
      no("Gute Nacht, Frau Petersen!", "Gute Nacht говорят, когда уходят спать. А фрау Петерсен только пришла."),
      no("Hallo, Frauke! Alles gut?", "Это фрау Петерсен: седое каре и очки на цепочке. Фрауке — в фартуке."),
    ],
  },
  petersen("Und in der Zeitung steht: Der Club hat kein Schild. Jetzt ist es offiziell!", "А в газете написано: у клуба нет таблички. Теперь это официально!"),
  petersen("Acht Tage ist das Schild weg. Dann brauchen wir ein Formular. Ohne Formular kein Start!", "Восемь дней нет таблички. Значит, нужен формуляр. Без формуляра — никакого старта!"),
  {
    t: "hear",
    task: "Что нужно фрау Петерсен?",
    voice: "Sandy",
    de: "Acht Tage ist das Schild weg. Dann brauchen wir ein Formular. Ohne Formular kein Start!",
    options: ["Формуляр о пропаже: без него нет старта", "Новая кровать до старта", "Ключ от подвала клуба"],
    answer: "Формуляр о пропаже: без него нет старта",
  },
  narr("Das ist Formular A39. Es ist lang. Frau Petersen liest vor, а вы сверяете каждую строчку с блокнотом."),
  {
    t: "clue",
    title: "Das Notizbuch",
    text: "Samstag, 17:05: Kassenbon, Dunkelblau. Sonntag, 17:30: Tee, der ganze Club ist hinten. 17:35: eine Frau, eine Tasche, Bus. 17:45: Fahrkarte nach Gaarden. 18:00: Herr Jensen macht zu. Lager der Möwe: kein Schild. Karton im Keller: leer.",
  },
  {
    t: "game",
    task: "Показания за восемь дней. Сверьте с блокнотом: так или нет?",
    hint: "Всё нужное — на странице «Das Notizbuch» в блокноте.",
    c: verdict(["Richtig", "Falsch"], [
      ["Am Sonntag um halb sechs ist der ganze Club hinten.", true, "Tee um halb sechs: все на террасе, впереди никого."],
      ["Um sechs macht Herr Jensen den Club zu.", true, "Так в кассовой книге и у самого Йенсена."],
      ["Der Mann im Laden kauft Dunkelblau.", true, "Kassenbon: один литр, dunkelblau. Покупатель говорит только Moin."],
      ["Das Schild ist im Lager der Möwe.", false, "В тайнике чайки — бирка, чек, чайные пакетики и мяч. Таблички нет."],
      ["Der Karton im Keller ist voll.", false, "Коробка в подвале у гавани пустая: только контур MOIN."],
      ["Herr Jensen ist jetzt im Keller.", false, "Утром он был в подвале у гавани, а потом уехал с женщиной на автобусе."],
    ]),
  },
  narr("Da ist Frauke am {fenster} — mit einem Fischbrötchen und einer Nachricht: «Das Schild ist in der Küche! Bei Mateo!»"),
  narr("Потом морщит лоб и рисует руками круг: «Groß … mit M … Ist das ein Schild?»"),
  {
    t: "pick",
    task: "Что на самом деле видела Фрауке?",
    options: [
      ok("Круглый торт Матео с буквой M — не табличку"),
      no("Табличку MOIN на кухне у Матео", "Табличка прямоугольная. А Матео печёт — это диагноз Даны."),
      no("Подставку для таблички", "Подставка стоит у клуба, и она не круглая."),
    ],
  },
  narr("Hauke sitzt am Tisch mit dem Formular. Aber er liest den falschen Zettel: die Anzeige von Elif für die Wohnung."),
  hauke("Was ist weg? Hier: fünfundfünfzig Quadratmeter!", "Что пропало? Вот: пятьдесят пять квадратных метров!"),
  {
    t: "gap",
    task: "Исправьте графу Хауке.",
    text: "Was ist weg? ___",
    options: ["das Schild MOIN", "55 Quadratmeter", "die Wohnung"],
    answer: "das Schild MOIN",
    ru: "Что пропало? Табличка MOIN.",
  },
  {
    t: "game",
    rule: ["wohnen/wo-1"],
    task: "Заполните Formular A39 фрау Петерсен.",
    hint: "Где? — in + dem = im, an + dem = am. Время — как в кассовой книге.",
    c: write("Formular A39 · Schild weg", [
      ["Was ist weg?", "das Schild MOIN", "das Schild", "Schild", "Schild MOIN"],
      ["Wann?", "Sonntag, 17:30", "am Sonntag um halb sechs", "Sonntag um halb sechs", "am Sonntag um 17:30", "Sonntag 17:30"],
      ["Wo?", "am Aufsteller", "vor dem Club", "am Club", "Aufsteller"],
      ["Adresse der Werkstatt?", "Farbenweg 7", "Farbenweg 7, Gaarden", "Werkstatt, Farbenweg 7"],
    ]),
  },
  petersen("Gut. Und die Zeit? Was ist am Samstag, was ist am Sonntag?", "Хорошо. А время? Что было в субботу, а что в воскресенье?"),
  {
    t: "game",
    task: "Разложите по дням: что было в субботу, а что в воскресенье?",
    hint: "Страница «Das Notizbuch»: там у каждого времени есть день.",
    c: sort([["samstag", "Samstag"], ["sonntag", "Sonntag"]], [
      ["bon", "17:05 · Kassenbon: Dunkelblau", "samstag", "🧾"],
      ["tee", "17:30 · Tee, alle hinten", "sonntag", "🫖"],
      ["frau", "17:35 · eine Frau, eine Tasche, Bus", "sonntag", "👜"],
      ["karte", "17:45 · Fahrkarte nach Gaarden", "sonntag", "🎫"],
    ]),
  },
  petersen("Jetzt die Fragen. Ich frage, Sie antworten. Laut, bitte!", "Теперь вопросы. Я спрашиваю, вы отвечаете. Вслух, пожалуйста!"),
  {
    t: "game",
    task: "Вопросы к формуляру. Сначала ответьте вслух сами, потом сверьтесь с образцом.",
    hint: HINT_ORAL,
    c: oral([
      oralReply(2, ANSWER, "Wann ist das Schild weg?", "Am Sonntag um halb sechs. Alle sind hinten.", "В воскресенье в половине шестого. Все сзади."),
      oralReply(2, ANSWER, "Wo ist Herr Jensen?", "Er ist nicht da. Er ist mit Greta weg.", "Его нет. Он уехал с Гретой."),
      oralSay(3, REQUEST, "🛏️", "Ein Bett für Frau Petersen, bitte!", "Кровать для фрау Петерсен, пожалуйста!"),
    ]),
  },
  narr("Die Möwe schläft auf dem Stuhl von Frau Petersen. Frau Petersen sieht das und sagt nichts: heute ja. Но сначала — фразы для протокола."),
  {
    t: "game",
    rule: ["wohnen/wo-1"],
    task: "Протокол закрыт на фразы ночи. Поверните диски.",
    hint: HINT_LOCK,
    c: lock([
      ["Коробка стоит в подвале.", [["Der Karton", "Den Karton", "Dem Karton"], ["steht", "stehen", "stellt"], ["im Keller.", "in den Keller.", "in der Keller."]]],
      ["Чайка спит на стуле.", [["Die Möwe", "Der Möwe", "Den Möwe"], ["schläft", "schlafen", "schlafe"], ["auf dem Stuhl.", "auf den Stuhl.", "auf der Stuhl."]]],
    ]),
  },
  {
    t: "game",
    task: "Петерсен проверяет ваш словарь. Одно слово в группе лишнее.",
    hint: HINT_ODD,
    c: odd([
      [["der Keller", "der Flur", "das Treppenhaus", "der Kassenbon"], "der Kassenbon", "Чек — из лавки. Остальное — части дома."],
      [["die Fahrkarte", "der Bus", "die Haltestelle", "das Bett"], "das Bett", "Кровать — из квартиры. Остальное — дорога."],
      [["dunkelblau", "weiß", "groß", "rot"], "groß", "Groß — размер. Остальное — цвета таблички и не только."],
    ]),
  },
  petersen("Gestempelt! Und jetzt: Gute Nacht. Morgen kaufe ich ein Bett.", "Проштамповано! А теперь — спокойной ночи. Завтра я куплю кровать."),
  {
    t: "type",
    task: "Запишите в блокнот, куда команда едет завтра.",
    answers: ["Morgen fahren wir nach Gaarden.", "Wir fahren morgen nach Gaarden.", "Wir fahren nach Gaarden."],
    ru: "Завтра мы едем в Гаарден.",
  },
  {
    t: "clue",
    title: "Acht Tage",
    text: "Sonntag, 17:30: der ganze Club ist hinten, vorne ist niemand. 17:35: eine Frau, eine Tasche, Bus. 17:45: Fahrkarte nach Gaarden. Der Karton im Keller ist leer. Werkstatt: Farbenweg 7. Formular A39: gestempelt.",
  },
];

const play = (nodes: SceneNode[]) => ({ kind: "play" as const, nodes });
const HINT = "Ошибка ничего не стоит: собеседник отреагирует, и можно выбрать снова.";

export const sceneChapter8: Episode = {
  id: "moin-neu-8",
  title: "Zwei Keller",
  day: { de: "Noch fünf Tage", ru: "ещё пять дней до Kieler Woche" },
  place: "Клуб и дом у гавани · два подвала",
  topic: "Жильё",
  grammar: "где? — im, in der, auf dem · этажи и порядковые числа · сложные слова · прилагательное после sein",
  beats: [
    {
      id: "08-s1",
      title: "Um acht",
      story: [],
      prompt: "Восемь утра: ни Йенсена, ни чаек, а ключ не подходит.",
      hint: HINT,
      success: "Фрау Петерсен открывает подвал клуба — впервые за двадцать лет.",
      challenge: play(morning),
    },
    {
      id: "08-s2",
      title: "Das Lager",
      story: [],
      prompt: "Подвал клуба: тайник чайки и чужой ключ.",
      hint: "Wo? — in/auf + дательный: im Schrank, auf dem Tisch, in der Kiste.",
      success: "Это не тот подвал: ключ Йенсена — от дома у гавани.",
      challenge: play(back(lager, 8, 2)),
    },
    {
      id: "08-i1",
      title: "Глазами Фрауке",
      pov: "глазами Фрауке",
      story: [],
      prompt: "Интерлюдия: утро у киоска, Грета с запиской и Йенсен в шарфе.",
      hint: "im ersten Stock — по-русски это второй этаж.",
      success: "Йенсен молча уехал с Гретой на автобусе. Фрауке уже придумала похищение.",
      challenge: play(kiosk),
    },
    {
      id: "08-s3",
      title: "Im Treppenhaus",
      story: [],
      prompt: "Дом у гавани: почтовые ящики, хозяин дома и записка на двери подвала.",
      hint: "Wir sind im Treppenhaus. — in + dem = im.",
      success: "Йенсен ждал в своём подвале, а вы — в клубном. «Heute nicht. Leider. Moin.»",
      challenge: play(back(stairs, 8, 0)),
    },
    {
      id: "08-s4",
      title: "Leer",
      story: [],
      prompt: "Подвал Йенсена: коробка с контуром MOIN и адрес мастерской.",
      hint: "Wir haben den Karton. — после haben винительный.",
      success: "Коробка пустая. В ней — адрес мастерской в Gaarden, а мастерская сегодня закрыта.",
      challenge: play(empty),
    },
    {
      id: "08-s5",
      title: "Die Fahrkarte",
      story: [],
      prompt: "Билет в коридоре, диагноз Даны и записка Йенсену.",
      hint: "in einer Werkstatt — ein+er для женского рода.",
      success: "Воскресенье, 17:45, гавань — Гаарден. След ведёт в мастерскую.",
      challenge: play(back(ticket, 8, 3)),
    },
    {
      id: "08-s6",
      title: "Noch fünf Tage",
      story: [],
      prompt: "Вечер в клубе: чайка на чужом стуле, речь как на экзамене и план на завтра.",
      hint: "Ist die Werkstatt morgen offen? — глагол первым.",
      success: "День восьмой почти закончен. Завтра — Gaarden. Noch vier Tage.",
      challenge: play(back(evening, 8, 1)),
    },
    {
      id: "08-c1",
      title: "Formular A39",
      story: [],
      prompt: "Проверка глав 1–8: ночной формуляр о пропаже и всё, что команда нашла за восемь дней.",
      hint: "Сверяйтесь с блокнотом: кассовая книга, подвалы, билет.",
      success: "Formular A39 проштампован: восемь дней сведены на одном листе. Завтра — Gaarden. Noch vier Tage.",
      challenge: play(formular),
    },
  ],
};
