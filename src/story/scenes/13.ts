import { an, ANSWER, ASK, chat, gruss, HINT_LETTER, HINT_LOCK, HINT_ORAL, HINT_SPELL, letter, letters, lock, oral, order, pairs, reply as oralReply, REQUEST, say as oralSay, spot, turn, verdict, write } from "../build.ts";
import type { Episode, SceneNode } from "../types.ts";
import { back } from "./back.ts";

// Глава 13 «A1+» в формате сцен (A1-PLOT.md, «Глава 13»): последний день Kieler Woche. Фрау Петерсен
// устраивает клубный экзамен из четырёх частей, как telc A1: Hören, Lesen, Schreiben, Sprechen. Вопрос
// главы — станете ли вы членом клуба. Вход — табличка на месте и дело закрыто, выход — ваше имя на доске
// почёта и Küstenlogbuch: первая поездка сезона A2. Повороты брошены оракулом (seed 1794704871), увязка
// — в журнале A1-STORYCRAFT.md. Глава повторяет весь A1: в рассказе знакомое — по-немецки.

const narr = (text: string): SceneNode => ({ t: "narr", text });
const learn = (words?: string[]) => (words ? { learn: words } : {});
const hauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Hauke", voice: "Rocko", de, ru, ...learn(words) });
const jensen = (de: string, ru: string): SceneNode => ({ t: "say", who: "Herr Jensen", voice: "Grandpa", de, ru });
const elif = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Elif", voice: "Flo", de, ru, ...learn(words) });
const dana = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Dana", voice: "Anna", de, ru, ...learn(words) });
const mateo = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Mateo", voice: "Reed", de, ru, ...learn(words) });
const frauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frauke", voice: "Sandy", de, ru, ...learn(words) });
const petersen = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frau Petersen", voice: "Sandy", de, ru, ...learn(words) });
const brandt = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frau Brandt", voice: "Shelley", de, ru, ...learn(words) });
const fahrer = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Der Fahrer", voice: "Eddy", de, ru, ...learn(words) });
const luca = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Luca", voice: "Eddy", de, ru, ...learn(words) });
const durchsage = (de: string, ru: string): SceneNode => ({ t: "say", who: "Durchsage", voice: "Eddy", de, ru });
const ok = (text: string) => ({ text, ok: true as const });
const no = (text: string, react: string) => ({ text, react });

const ANSAGE = "Meine Damen und Herren, eine Information: Der Zug aus Hamburg kommt heute auf Gleis vier. Er hat circa zehn Minuten Verspätung.";
const MATEO_AB = "Hallo, hier ist Mateo. Ich bin noch in der Küche. Ich komme um zwölf zum Club. Bringt bitte Brötchen mit! Tschüss!";
const LIEFERSCHEIN = "Firma Kiel-Möbel · Möbel für die Party: 100 Stück · für: Segelclub Kiellinie, Frau Petersen · Termin: Sonntag, bis 14 Uhr · Fragen? Bitte anrufen: 0431 527700";

// Сцена 1 · пролог и завязка. Броски: подарок игроку · Грета · вернуть · der Liegeplatz · 2 (мелочь:
// Хауке вешает новый номер вверх ногами) и честная улика · Дана · пообещать · die Person · 17 (Дана
// обещает подпись и собирает подписи всего клуба).
const morning: SceneNode[] = [
  { t: "pic", src: "13-morning.jpg", alt: "Последнее утро Kieler Woche у клуба: фрау Петерсен с папкой и штампом, Хауке, Элиф, Дана и Матео, на подставке снова табличка MOIN, у причала лодка «Sprotte»" },
  narr("Sonntag, der achtundzwanzigste Juni. Der letzte Tag der Kieler Woche. Das Schild MOIN ist wieder am {aufsteller}."),
  narr("Keine Fragen, kein {geheimnis}. Die Sonne scheint, das Wasser ist ruhig. Nur Frau Petersen kommt schnell — mit einem {formular}."),
  petersen("Moin! Heute ist ein wichtiger Tag. Sie möchten Mitglied werden? Dann brauchen Sie eine Prüfung!", "Привет! Сегодня важный день. Хотите стать членом клуба? Тогда вам нужен экзамен!", ["die Prüfung"]),
  {
    t: "hear",
    task: "Что нужно, чтобы стать членом клуба?",
    voice: "Sandy",
    de: "Moin! Heute ist ein wichtiger Tag. Sie möchten Mitglied werden? Dann brauchen Sie eine Prüfung!",
    options: ["сдать экзамен", "купить табличку", "переехать в Киль"],
    answer: "сдать экзамен",
  },
  narr("{mitglied} клуба — это своё место у причала и своё имя на {ehrentafel}. Без экзамена фрау Петерсен не даёт ни того ни другого."),
  hauke("Eine Prüfung? Im Club? Frau Petersen, das ist nicht nett!", "Экзамен? В клубе? Фрау Петерсен, это нехорошо!"),
  {
    t: "reply",
    rule: ["essen/moechten-1"],
    task: "Ответьте фрау Петерсен: вы хотите стать членом клуба.",
    options: [
      ok("Ja, ich möchte Mitglied werden!"),
      no("Ja, ich möchtest Mitglied werden!", "möchtest — это du. Про себя: ich möchte."),
      no("Ja, ich möchte Mitglied.", "После möchte нужен глагол в конце: Mitglied werden."),
    ],
  },
  petersen("Gut. Die Prüfung hat vier Teile – wie bei telc: Hören, Lesen, Schreiben und Sprechen.", "Хорошо. В экзамене четыре части — как в telc: аудирование, чтение, письмо и говорение."),
  {
    t: "look",
    task: "Рассмотрите бумаги фрау Петерсен.",
    items: [
      { icon: "🗂️", de: "das Formular", ru: "бланк", note: "«Mitgliedsantrag»: имя, адрес, телефон — и подписи внизу.", key: true },
      { icon: "🔖", de: "der Stempel", ru: "штамп", note: "Четыре пустые клетки: Hören, Lesen, Schreiben, Sprechen. На каждую — свой штамп." },
      { icon: "✍️", de: "die Unterschrift", ru: "подпись", note: "Две строки: два члена клуба ручаются за новичка.", key: true },
    ],
  },
  dana("Zwei Unterschriften? Kein Problem! Ich unterschreibe. Und ich frage alle!", "Две подписи? Не проблема! Я подпишу. И спрошу всех!"),
  { t: "gap", rule: ["kennenlernen/endungen-1"], task: "Что обещает Дана?", text: "Ich ___ – und ich frage alle!", options: ["unterschreibe", "unterschreibt", "unterschreiben"], answer: "unterschreibe", ru: "Я подпишу — и спрошу всех!" },
  narr("Dana braucht nur eine Person — aber Dana macht nichts halb. Sie geht von Tisch zu Tisch."),
  narr("Greta kommt mit einem kleinen Schild für die «Sprotte»: Liegeplatz 6, frisch gemalt. Хауке вешает её вверх ногами."),
  hauke("Liegeplatz neun! Eine schöne Neun!", "Причал номер девять! Красивая девятка!"),
  {
    t: "game",
    task: "Хауке путает числа. Какое прозвучало?",
    c: {
      kind: "sounds",
      rounds: [
        { say: "sechs", options: ["sechs", "sechzig"] },
        { say: "siebzig", options: ["siebzehn", "siebzig"] },
        { say: "sechzehn", options: ["sechzehn", "sechzig"] },
      ],
    },
  },
  {
    t: "game",
    task: "Фрау Петерсен проверяет: одно слово в группе лишнее.",
    hint: "Ищите общую тему трёх слов.",
    c: {
      kind: "odd",
      rounds: [
        { words: ["lesen", "sprechen", "antworten", "der Stempel"], odd: "der Stempel", why: "Штамп — вещь, остальное — что делают на экзамене." },
        { words: ["sechs", "neun", "sechzig", "der Liegeplatz"], odd: "der Liegeplatz", why: "Причал — место, остальное — числа." },
      ],
    },
  },
  {
    t: "pick",
    task: "Что нужно для членства в клубе?",
    options: [
      ok("Сдать четыре части экзамена и получить две подписи"),
      no("Купить новую табличку", "Табличка у клуба есть — та самая, 1976 года."),
      no("Говорить только Moin", "Йенсену это хватает, но фрау Петерсен хочет четыре штампа."),
    ],
  },
  petersen("Die Prüfung beginnt um halb elf. Teil eins: Hören – am Bahnhof!", "Экзамен начинается в половине одиннадцатого. Часть первая: аудирование — на вокзале!"),
  {
    t: "game",
    rule: ["tagesablauf/wann-1"],
    task: "Поставьте часы на начало экзамена.",
    hint: "halb elf — половина одиннадцатого: 10:30.",
    c: { kind: "clock", start: "09:00", step: 15, answer: "10:30", traps: { "11:30": "Это halb zwölf. После halb называют следующий час: halb elf — 10:30.", "10:00": "Это zehn Uhr. Halb elf — на полчаса позже." } },
  },
  jensen("Moin.", "Привет."),
  narr("Herr Jensen trinkt seinen Tee und sieht zum Bahnhof. Ein Wort — и всем всё понятно."),
  {
    t: "type",
    rule: ["tagesablauf/vorfeld-1"],
    task: "Запишите в блокнот план на день: время — первым.",
    answers: ["Um halb elf habe ich eine Prüfung.", "Um halb elf ist die Prüfung.", "Um halb elf beginnt die Prüfung."],
    ru: "В половине одиннадцатого у меня экзамен.",
  },
  {
    t: "game",
    task: "Проверьте блокнот: что верно?",
    c: verdict(["Richtig", "Falsch"], [
      ["В экзамене четыре части", true, "Hören, Lesen, Schreiben, Sprechen — wie bei telc."],
      ["Подпись нужна одна", false, "Две: zwei Unterschriften. Дана обещает собрать больше."],
      ["Первая часть — на вокзале", true, "Teil eins: Hören — am Bahnhof."],
    ]),
  },
  { t: "clue", title: "Die Prüfung", text: "Mitglied im Club: vier Teile — Hören, Lesen, Schreiben, Sprechen — und zwei Unterschriften. Start: um halb elf am Bahnhof." },
];

// Сцена 2 · часть «Hören»: вокзал. Броски: новый человек · Элиф · сломать · die Vorsicht · 17 (с
// поезда сходит орнитолог с Гельголанда, Элиф от радости роняет табличку «Vorsicht!»; сила выше
// ожидаемой — орнитолог позовёт всех на Гельголанд) и за кадром · Фрауке · опоздать · die Straßenbahn
// · 12 (Фрауке час ждала трамвай, которого в Киле нет с 1985 года).
const hoeren: SceneNode[] = [
  { t: "pic", src: "13-bahnhof.jpg", alt: "Вокзал Киля: подошёл поезд, Элиф машет обеими руками женщине с биноклем и рюкзаком; у ног Элиф — опрокинутая жёлтая табличка с восклицательным знаком" },
  narr("Teil eins: Hören. Der Bahnhof ist laut. Frau Petersen sagt: «Hier hören Sie viel Deutsch!» Die Tür geht {automatisch} auf — man muss nicht {druecken}."),
  elif("Heute kommt Frau Brandt! Von der Vogelwarte auf Helgoland! Sie will unsere Möwe sehen!", "Сегодня приезжает фрау Брандт! С орнитологической станции на Гельголанде! Она хочет увидеть нашу чайку!"),
  narr("Elif hat der {vogelwarte} geschrieben. Jetzt kommt eine Frau von der Vogelwarte — mit dem Zug aus Hamburg."),
  durchsage(ANSAGE, "Дамы и господа, информация: поезд из Гамбурга сегодня прибывает на путь четыре. Он опаздывает примерно на десять минут."),
  {
    t: "hear",
    task: "Что объявили? Как на экзамене: путь и опоздание.",
    an: "Hören Sie die Durchsage. Wählen Sie die richtige Antwort.",
    voice: "Eddy",
    de: ANSAGE,
    options: ["путь 4, около 10 минут", "путь 10, около 4 минут", "путь 4, без опоздания"],
    answer: "путь 4, около 10 минут",
  },
  {
    t: "game",
    task: "Запишите объявление в блокнот, как на экзамене: только главное.",
    hint: "Цифрами или словами — как удобнее.",
    c: write("Durchsage", [
      ["Gleis", "4", "vier", "Gleis 4"],
      ["Verspätung", "10 Minuten", "zehn Minuten", "circa zehn Minuten", "ca. 10 Minuten"],
      ["Zug aus", "Hamburg"],
    ]),
  },
  {
    t: "game",
    task: "На вокзале шумно. Какое слово прозвучало?",
    c: {
      kind: "sounds",
      rounds: [
        { say: "das Gleis", options: ["das Gleis", "gleich"] },
        { say: "vier", options: ["vier", "vierzig"] },
        { say: "der Zoll", options: ["der Zoll", "der Zug"] },
      ],
    },
  },
  narr("Элиф бежит к Gleis vier и роняет табличку «{vorsicht}». Kaputt. Elif sagt: «{entschuldigung}!» — zum Schild."),
  brandt("Moin! Ich bin Jule Brandt, von der Vogelwarte Helgoland. Wo ist HEL 7305?", "Привет! Я Юле Брандт с орнитологической станции Гельголанда. Где HEL 7305?"),
  elif("Sie ist im Club! Sie hat uns die ganze Woche geholfen!", "Она в клубе! Она нам всю неделю помогала!"),
  {
    t: "reply",
    rule: ["kennenlernen/wortstellung-3"],
    task: "Спросите фрау Брандт, сколько она пробудет в Киле.",
    options: [
      ok("Wie lange bleiben Sie in Kiel?"),
      no("Wie lange Sie bleiben in Kiel?", "В вопросе с W-словом глагол сразу второй: Wie lange bleiben Sie …?"),
      no("Wie lange bleibst Sie in Kiel?", "С Sie глагол — как с wir: bleiben."),
    ],
  },
  brandt("Bis morgen. Am Montag fahre ich zurück – mit der Möwe, vielleicht!", "До завтра. В понедельник я уезжаю обратно — может быть, вместе с чайкой!"),
  {
    t: "hear",
    task: "Когда фрау Брандт уезжает?",
    voice: "Shelley",
    de: "Bis morgen. Am Montag fahre ich zurück – mit der Möwe, vielleicht!",
    options: ["в понедельник", "сегодня вечером", "через неделю"],
    answer: "в понедельник",
  },
  {
    t: "type",
    rule: ["tagesablauf/klammer-1"],
    task: "Запишите в блокнот, когда фрау Брандт уезжает.",
    answers: ["Sie fährt am Montag zurück.", "Am Montag fährt sie zurück.", "Frau Brandt fährt am Montag zurück."],
    ru: "Она уезжает в понедельник.",
  },
  narr("Und da ist auch Frauke — sehr spät, sehr rot, mit zwei Taschen."),
  frauke("Entschuldigung! Ich habe auf die Straßenbahn gewartet. Eine Stunde lang!", "Простите! Я ждала трамвай. Целый час!"),
  hauke("Frauke! In Kiel gibt es seit 1985 keine Straßenbahn!", "Фрауке! В Киле с 1985 года нет трамвая!"),
  { t: "gap", rule: ["arbeit/perfekt-2"], task: "Почему Фрауке опоздала? Запишите за ней.", text: "Ich habe auf die Straßenbahn ___.", options: ["gewartet", "gewarten", "wartet"], answer: "gewartet", ru: "Я ждала трамвай." },
  frauke("Ich habe über sechzig Minuten gewartet! Mein Kopf tut weh.", "Я ждала больше шестидесяти минут! У меня голова болит."),
  narr("Auf Danas Handy: {anrufbeantworter}. Eine Nachricht von Mateo."),
  mateo(MATEO_AB, "Привет, это Матео. Я ещё на кухне. Приду в клуб в двенадцать. Принесите, пожалуйста, булочки! Пока!"),
  {
    t: "game",
    task: "Сообщение на автоответчике, как в экзамене: что верно?",
    c: verdict(["Richtig", "Falsch"], [
      ["Матео ещё на кухне", true, "Ich bin noch in der Küche."],
      ["Матео придёт в клуб в два", false, "Um zwölf — в двенадцать."],
      ["Нужно принести булочки", true, "Bringt bitte Brötchen mit!"],
    ]),
  },
  {
    t: "type",
    rule: ["stadt/imperativ-2"],
    task: "Запишите просьбу Матео в блокнот.",
    answers: ["Bringt bitte Brötchen mit!", "Bringt bitte Brötchen mit.", "Bitte Brötchen mitbringen!"],
    ru: "Принесите, пожалуйста, булочки!",
  },
  narr("Dana hat den {stempel} von Frau Petersen. Hören — {bestanden}! Alle {lachen}: In Kiel ist die Straßenbahn 1985 {gestorben}."),
  {
    t: "pick",
    task: "Что принёс сегодняшний вокзал делу?",
    options: [
      ok("В Киль приехала орнитолог с Гельголанда — к нашей чайке"),
      no("Фрауке приехала на трамвае", "Трамвая в Киле нет с 1985 года. Фрауке приехала на автобусе."),
      no("Матео уехал в Гамбург", "Матео на кухне и придёт в двенадцать."),
    ],
  },
  { t: "clue", title: "Hören", text: "Gleis vier, zehn Minuten Verspätung. Frau Brandt von der Vogelwarte Helgoland bleibt bis Montag. Mateo kommt um zwölf. In Kiel gibt es keine Straßenbahn." },
];

// Сцена 3 · часть «Lesen»: город. Бросок: новый человек · Дана · заблудиться · der Lkw · 20 (водитель
// грузовика со стульями для праздника заблудился, и дорогу ему показывает весь клуб — в четыре стороны).
const lesen: SceneNode[] = [
  { t: "pic", src: "13-lkw.jpg", alt: "Перекрёсток в Киле: большой грузовик со стульями, водитель с бумагой в руке; Хауке показывает налево, Элиф направо, Матео прямо, а фрау Брандт — на чаек" },
  narr("Teil zwei: Lesen. Auf dem Weg zum Club steht ein großer {lkw} an der Ampel. Der {fahrer} hat eine Karte — und viele Fragen. Ist der Fahrer {beamte}? Nein."),
  fahrer("Entschuldigen Sie! Wo ist die Kiellinie? Ich bringe hundert Stühle für die Party am Club!", "Извините! Где Kiellinie? Я везу сто стульев для праздника у клуба!"),
  {
    t: "hear",
    task: "Что везёт водитель?",
    voice: "Eddy",
    de: "Entschuldigen Sie! Wo ist die Kiellinie? Ich bringe hundert Stühle für die Party am Club!",
    options: ["сто стульев для праздника у клуба", "сто булочек для кафе", "табличку для клуба"],
    answer: "сто стульев для праздника у клуба",
  },
  narr("Все знают дорогу: Hauke — links, Elif — rechts, Mateo — geradeaus, а Frau Brandt — к чайкам. Und dann? Immer {weiter}!"),
  fahrer("Links? Rechts? Geradeaus? Ich lese lieber!", "Налево? Направо? Прямо? Я лучше почитаю!"),
  {
    t: "pick",
    task: "Кому верить?",
    options: [
      ok("Никому на слово: прочитать таблички и бумагу водителя"),
      no("Хауке: он местный", "Хауке живёт в Гамбурге и показывает налево. Элиф — направо."),
      no("Чайкам", "Чайки знают дорогу к булочкам, а не к Kiellinie."),
    ],
  },
  {
    t: "game",
    task: "Прочитайте таблички на перекрёстке, как на экзамене: где дорога к Kiellinie?",
    hint: "Ищите название и стрелку. Табличка «verboten» тоже важна для грузовика.",
    c: spot("Schilder an der Ampel", ["Kiellinie →|Hafen ←", "Bahnhof ↑|Zentrum ↑", "Lkw verboten|nur bis 7,5 t"], ["Kiellinie →"]),
  },
  dana("Kiellinie – nach rechts! Aber da: Lkw verboten!", "Kiellinie — направо! Но там: грузовикам нельзя!"),
  { t: "gap", rule: ["stadt/imperativ-3"], task: "Подскажите водителю вежливо, на «Sie».", text: "___ Sie bitte nach rechts!", options: ["Fahren", "Fahrt", "Fahr"], answer: "Fahren", ru: "Поезжайте, пожалуйста, направо!" },
  narr("Der Fahrer hat {lieferschein}: kleine Buchstaben, viele Zahlen — wie in der Prüfung. Lesen Sie den {text}: Es ist ganz {einfach}."),
  { t: "clue", title: "Der Lieferschein", text: LIEFERSCHEIN },
  {
    t: "game",
    task: "Прочитайте бумагу водителя: верно или нет?",
    hint: "Ответ — в бумаге: читайте строку за строкой.",
    c: verdict(["Richtig", "Falsch"], [
      ["Стулья нужно привезти до двух", true, "Termin: Sonntag, bis 14 Uhr."],
      ["Стулья для кафе у воды", false, "Für: Segelclub Kiellinie, Frau Petersen."],
      ["С вопросами — звонить по телефону", true, "Fragen? Bitte anrufen: 0431 527700."],
    ]),
  },
  fahrer("Und wo kann ich parken? Nur eine Stunde!", "А где мне припарковаться? Всего на час!"),
  narr("Frau Brandt sucht auch etwas: ein Zimmer für eine Nacht. Und Frauke will nach Hause — mit der Straßenbahn. Nein: Kiel hat keine U-Bahn und keine Straßenbahn!"),
  {
    t: "game",
    task: "Объявления, как на экзамене: найдите каждому подходящее. Кому-то не подойдёт ни одно.",
    c: {
      kind: "ads",
      people: [
        { id: "fahrer", text: "Der Fahrer sucht einen Platz für den Lkw — für eine Stunde." },
        { id: "brandt", text: "Frau Brandt braucht ein Zimmer für eine Nacht, nicht teuer." },
        { id: "frauke", text: "Frauke möchte mit der Straßenbahn nach Hause fahren." },
      ],
      ads: [
        { id: "A", title: "Parkplatz am Hafen", text: "Für Lkw und Busse. Tor 3, ab 8 Uhr." },
        { id: "B", title: "Hotel am Hafen", text: "Einzelzimmer frei, 59 € pro Nacht." },
        { id: "C", title: "Fahrradverleih Kiellinie", text: "Fahrräder ab 10 € pro Tag." },
      ],
      answer: { fahrer: "A", brandt: "B", frauke: "0" },
    },
  },
  elif("Frauke, nimm das Fahrrad! Oder den Bus!", "Фрауке, бери велосипед! Или автобус!"),
  {
    t: "game",
    rule: ["stadt/imperativ-3"],
    task: "Соберите для водителя дорогу: от вокзала к клубу, в обход запрета для грузовиков.",
    hint: "Каждая команда — шаг: geradeaus, links или rechts.",
    c: {
      kind: "algo",
      width: 3,
      height: 3,
      start: { x: 0, y: 2, heading: 0 },
      places: { "0,2": "der Bahnhof", "1,1": "die Ampel", "0,0": "der Park", "2,0": "der Club" },
      goal: "2,0",
      moves: ["geradeaus", "rechts", "links", "rechts"],
      max: 6,
    },
  },
  fahrer("Danke! Ohne Sie – keine Stühle, keine Party!", "Спасибо! Без вас — ни стульев, ни праздника!"),
  narr("Ohne MOIN kein Start, ohne Möbel keine Party. Dana stempelt: Lesen — {bestanden}! Alles ist {moeglich}."),
  {
    t: "type",
    rule: ["moin/es-gibt-1"],
    task: "Запишите в блокнот вывод для Фрауке.",
    answers: ["In Kiel gibt es keine Straßenbahn.", "Es gibt keine Straßenbahn in Kiel.", "In Kiel gibt es keine Straßenbahn!"],
    ru: "В Киле нет трамвая.",
  },
  { t: "clue", title: "Lesen", text: "Die Kiellinie ist rechts, aber für den Lkw verboten. Möbel für die Party, bis 14 Uhr. Frau Brandt: Hotel am Hafen." },
];

// Интерлюдия глазами Греты. Бросок: смена точки зрения · Грета · починить · der Mensch · 12.
const greta: SceneNode[] = [
  { t: "pic", src: "13-greta.jpg", alt: "Мастерская в Гаардене: Грета в комбинезоне в пятнах краски тонкой кистью выводит новую пустую строку внизу старой доски почёта клуба" },
  narr("Тем временем in der Werkstatt in Gaarden. Auf dem Tisch liegt die alte {ehrentafel} vom Club."),
  narr("Viele Namen, viele Jahre: 1926, 1976 — H. Hansen. Unten ist ein Platz frei. Kein Name darf {fehlen}."),
  {
    t: "pick",
    task: "Для кого Грета готовит пустую строку?",
    options: [
      ok("Для нового члена клуба — для вас"),
      no("Для чайки", "У чайки уже есть кольцо с именем: HEL 7305."),
      no("Для Йенсена", "Его имя на доске с 1976 года — рядом с Opa Hansen."),
    ],
  },
  narr("«Ein Name ist ein {mensch}», — думает Грета. «Und ein {mensch} braucht einen Platz.»"),
  { t: "game", task: "Грета подписывает банки с краской по буквам.", hint: HINT_SPELL, c: letters(["der Mensch", "die Farbe", "der Name"]) },
  narr("Greta macht eine weiße Linie. Dann schreibt sie auf einen Zettel: Sie spricht nicht gern."),
  { t: "gap", rule: ["moin/man-1"], task: "Что написала Грета на записке?", text: "Den Namen schreibt ___ allein.", options: ["man", "Mann", "mann"], answer: "man", ru: "Имя пишут сами." },
  narr("Der Pinsel liegt auf dem Tisch. Die Farbe ist schnell trocken. Das ist nicht {schlecht}."),
];

// Сцена 4 · часть «Schreiben»: офис и подвал. Бросок: новый человек · чайка · потерять · der
// Kleiderschrank · 10 — у чайки пропало кольцо; оно в старом шкафу в подвале, в её тайнике из главы 8.
const schreiben: SceneNode[] = [
  { t: "pic", src: "13-buero.jpg", alt: "Подвал клуба: Элиф открывает старый платяной шкаф, на полке среди находок чайки — кольцо; рядом фрау Брандт бережно держит чайку" },
  narr("Teil drei: Schreiben. Im {buero} wartet Frau Petersen mit Formularen: {anmelden}, {ausfuellen}. Aber zuerst: die Möwe."),
  brandt("Das ist unsere Möwe – aber wo ist ihr Ring? Ohne Ring ist sie nur eine Möwe!", "Это наша чайка — но где её кольцо? Без кольца она просто чайка!"),
  elif("Im Keller! Im alten Kleiderschrank! Da ist ihr Lager!", "В подвале! В старом платяном шкафу! Там её склад!", ["der Kleiderschrank"]),
  {
    t: "hear",
    task: "Где, по словам Элиф, кольцо?",
    voice: "Flo",
    de: "Im Keller! Im alten Kleiderschrank! Da ist ihr Lager!",
    options: ["в подвале, в старом шкафу", "в офисе, в столе", "на крыше клуба"],
    answer: "в подвале, в старом шкафу",
  },
  {
    t: "look",
    task: "Откройте старый шкаф в подвале.",
    items: [
      { icon: "🚪", de: "der Kleiderschrank", ru: "платяной шкаф", note: "Тот самый, из подвала клуба: склад чайки с главы 8.", key: true },
      { icon: "💍", de: "der Ring", ru: "кольцо", note: "«HEL 7305» — номер чайки. Лежит на полке, рядом с пуговицей Хауке.", key: true },
      { icon: "🧢", de: "die Mütze", ru: "шапка", note: "Шапка Матео из главы 9. Чайка собирает всё." },
    ],
  },
  petersen("Ein Ring? Im Keller? Dafür gibt es ein Formular!", "Кольцо? В подвале? Для этого есть бланк!"),
  {
    t: "game",
    task: "Заполните бланк находки фрау Петерсен.",
    hint: "Что нашли, где и когда.",
    c: write("Fundsache", [
      ["Was?", "Ring", "ein Ring", "der Ring"],
      ["Wo?", "im Keller", "Keller", "im Kleiderschrank"],
      ["Wann?", "heute", "Sonntag", "am Sonntag"],
    ]),
  },
  {
    t: "game",
    rule: ["wohnen/wo-1", "moin/wohin-1"],
    task: "Блокнот закрыт на фразы дня. Поверните диски.",
    hint: HINT_LOCK,
    c: lock([
      ["Кольцо лежит в шкафу.", [["Der Ring", "Den Ring", "Dem Ring"], ["liegt", "legt", "liegen"], ["im Kleiderschrank.", "in den Kleiderschrank.", "im Kleiderschranks."]]],
      ["Элиф кладёт кольцо на стол.", [["Elif", "Elifs", "Elif hat"], ["legt", "liegt", "legen"], ["den Ring auf den Tisch.", "dem Ring auf dem Tisch.", "der Ring auf den Tisch."]]],
    ]),
  },
  {
    t: "type",
    rule: ["wohnen/wo-1"],
    task: "Запишите в блокнот, где было кольцо.",
    answers: ["Der Ring war im Keller.", "Der Ring war im Kleiderschrank.", "Der Ring war im Keller, im Kleiderschrank."],
    ru: "Кольцо было в подвале.",
  },
  narr("Frau Brandt macht den Ring wieder an. HEL 7305 sieht sehr {wichtig} aus. Und die Möwe? Sie will einen Fisch {bekommen}."),
  brandt("Und ich brauche ein Zimmer: Einzelzimmer, eine Nacht. Mein Name ist Jule Brandt, ich wohne auf Helgoland.", "А мне нужна комната: одноместный номер, одна ночь. Меня зовут Юле Брандт, я живу на Гельголанде."),
  {
    t: "game",
    rule: ["reisen/check-1"],
    task: "Schreiben, часть 1: заполните за фрау Брандт бронь отеля по её словам.",
    c: write("Hotel am Hafen · Reservierung", [
      ["Familienname", "Brandt"],
      ["Vorname", "Jule"],
      ["Wohnort", "Helgoland", "auf Helgoland"],
      ["Zimmer", "Einzelzimmer", "ein Einzelzimmer"],
      ["Nächte", "eine", "1", "eine Nacht"],
    ]),
  },
  {
    t: "reply",
    rule: ["moin/haette-1"],
    task: "Фрау Брандт звонит в отель. Как вежливо попросить номер?",
    options: [
      ok("Ich hätte gern ein Einzelzimmer für eine Nacht."),
      no("Ich habe gern ein Einzelzimmer für eine Nacht.", "habe gern — «люблю иметь». Просьба — hätte gern."),
      no("Ich hätte gern einen Einzelzimmer für eine Nacht.", "das Zimmer — ein Einzelzimmer."),
    ],
  },
  dana("Und jetzt Schreiben, Teil zwei: eine kurze Nachricht. Mateo braucht Hilfe!", "А теперь письмо, часть вторая: короткое сообщение. Матео нужна помощь!"),
  narr("Mateo ist noch in der Küche. Die Party beginnt um sechs, und er hat keine Möbel, kein Wasser — nur Kuchen. Rauchen? Keine {zigarette} in der Küche!"),
  {
    t: "game",
    rule: ["gesundheit/imperativ-2", "tagesablauf/wann-1"],
    task: "Напишите Матео сообщение по образцу записки Даны: где вы, что принести и когда вы ждёте. Подписывается Дана.",
    hint: HINT_LETTER,
    c: letter(
      "Dana",
      ["Lieber Hauke,", "wir sind am Bahnhof.", "Bring bitte Kaffee mit.", "Wir warten bis zehn.", "Viele Grüße", "Dana"],
      [
        an("Lieber", "Mateo"),
        ["Wo? → wir: im Büro sein", "Wir sind im Büro.", "wir sind im Büro."],
        ["Was? → bitte: Wasser mitbringen", "Bring bitte Wasser mit.", "bring bitte Wasser mit."],
        ["Wann? → wir: bis sechs warten", "Wir warten bis sechs.", "wir warten bis sechs."],
        gruss("Dana"),
      ],
    ),
  },
  {
    t: "game",
    task: "Фрау Петерсен раскладывает бумаги дня по ящикам: der, die, das.",
    hint: "Артикль запоминают вместе со словом.",
    c: { kind: "docks", words: ["das Formular", "der Ring", "die Unterschrift", "der Stempel", "das Einzelzimmer", "die Nachricht"] },
  },
  petersen("Gut geschrieben! Schreiben – bestanden.", "Хорошо написано! Письмо — сдано."),
  { t: "gap", rule: ["arbeit/perfekt-4"], task: "Что сказала фрау Петерсен?", text: "Gut ___!", options: ["geschrieben", "geschreibt", "schreiben"], answer: "geschrieben", ru: "Хорошо написано!" },
  { t: "clue", title: "Schreiben", text: "Der Ring von HEL 7305 war im Keller, im alten Kleiderschrank. Frau Brandt: ein Einzelzimmer, eine Nacht. Nachricht an Mateo: Wasser mitbringen, wir warten bis sechs." },
];

// Сцена 5 · часть «Sprechen»: новичок. Бросок: новый человек · Йенсен · вернуть · der Durst · 8 — в
// клуб приходит новичок, который знает одно слово Moin; Йенсен возвращает долг первого дня и дарит
// ему блокнот, а вы предлагаете воды и впервые объясняете клуб по-немецки сами.
const sprechen: SceneNode[] = [
  { t: "pic", src: "13-luca.jpg", alt: "Причал клуба: молодой человек с рюкзаком и картой растерянно стоит у таблички MOIN, Йенсен протягивает ему блокнот в клетку" },
  narr("Teil vier: Sprechen. Am Wasser steht ein junger Mann: ein Rucksack, eine Karte von Kiel, sehr müde Augen."),
  luca("Moin?", "Привет?"),
  hauke("Er sagt nur Moin! Wie du am ersten Tag!", "Он говорит только Moin! Как ты в первый день!"),
  {
    t: "pick",
    task: "Кого напоминает вам новичок?",
    options: [
      ok("Себя в первый день: одно слово — Moin"),
      no("Йенсена", "Йенсен говорит Moin, потому что хочет. Новичок — потому что других слов пока нет."),
      no("Нильса", "Нильс пишет по десять сообщений в час. Этот молчит."),
    ],
  },
  narr("Herr Jensen kommt. Er gibt dem jungen Mann {notizbuch} — wie Ihnen vor zwei Wochen."),
  jensen("Sie sind neu. Sie sehen alles.", "Вы новенький. Вы видите всё."),
  {
    t: "hear",
    task: "Что сказал Йенсен новичку?",
    voice: "Grandpa",
    de: "Sie sind neu. Sie sehen alles.",
    options: ["вы новенький, вы видите всё", "вы опоздали, всё закончилось", "вы здесь чужой"],
    answer: "вы новенький, вы видите всё",
  },
  luca("Ist dieses Notizbuch für mich? Danke! Ich mag Notizbücher.", "Этот блокнот — для меня? Спасибо! Я люблю блокноты."),
  { t: "type", rule: ["moin/dieser-1"], task: "Запишите вопрос Луки в блокнот: «Этот блокнот — для меня?»", answers: ["Ist dieses Notizbuch für mich?", "Dieses Notizbuch ist für mich?"], ru: "Этот блокнот — для меня?" },
  narr("Der Weg vom Bahnhof war lang. Der junge Mann hat Durst — das sieht man. Hier muss man Gäste {abholen}!"),
  {
    t: "reply",
    rule: ["essen/akkusativ-3"],
    task: "Предложите ему попить.",
    options: [
      ok("Möchtest du ein Wasser?"),
      ok("Möchten Sie ein Glas Wasser?"),
      no("Möchtest du einen Wasser?", "das Wasser — ein Wasser: меняется только мужской род."),
    ],
  },
  { t: "game", task: "Новичок записывает первые слова в блокнот. Подскажите по буквам.", hint: HINT_SPELL, c: letters(["das Wasser", "das Glas", "der Rucksack"]) },
  luca("Ja, gern! Danke! Ich heiße Luca. Ich komme aus Italien und studiere ein Jahr in Kiel.", "Да, с удовольствием! Спасибо! Меня зовут Лука. Я из Италии и год учусь в Киле."),
  { t: "gap", rule: ["kennenlernen/endungen-1"], task: "Что Лука делает в Киле?", text: "Er ___ ein Jahr in Kiel.", options: ["studiert", "studieren", "studierst"], answer: "studiert", ru: "Он год учится в Киле." },
  dana("Sprechen, Teil eins: Stell dich vor! Luca ist dein Partner.", "Говорение, часть первая: представься! Лука — твой партнёр."),
  {
    t: "game",
    task: "Sprechen, как на экзамене: представьтесь, задайте вопрос по карточке, попросите о том, что на картинке.",
    hint: HINT_ORAL,
    c: oral([
      oralSay(1, "Представьтесь Луке по карточке.", "Name · Alter · Land · Wohnort · Sprachen · Hobby", "Ich heiße Anna. Ich bin dreißig Jahre alt. Ich komme aus Russland und wohne jetzt in Kiel. Ich spreche Russisch und ein bisschen Deutsch. Mein Hobby ist Segeln.", "Меня зовут Анна. Мне тридцать лет. Я из России и сейчас живу в Киле. Говорю по-русски и немного по-немецки. Моё хобби — парусный спорт."),
      oralSay(2, ASK, "Thema: Freizeit · Wort: Wochenende", "Was machst du am Wochenende?", "Что ты делаешь на выходных?", "Was …?"),
      oralReply(2, ANSWER, "Wo wohnst du?", "Ich wohne in Kiel, in der Nähe vom Hafen.", "Я живу в Киле, недалеко от гавани."),
      oralSay(3, REQUEST, "🗺️", "Können Sie mir bitte den Weg zeigen?", "Покажите мне, пожалуйста, дорогу."),
    ]),
  },
  luca("Und was ist das hier? Und wer ist der Mann mit dem Tee?", "А что здесь? И кто этот мужчина с чаем?"),
  {
    t: "game",
    rule: ["kennenlernen/wortstellung-1"],
    task: "Теперь объясняете вы: Лука спрашивает про клуб.",
    hint: "Отвечайте коротко и точно — как вам отвечали в первый день.",
    c: chat("Luca", "Eddy", [
      turn("Was ist das hier?", "Что это здесь?", "a", [
        ["a", "Das ist der Segelclub Kiellinie.", "Верно: der Club — das ist der Club."],
        ["b", "Das sind der Segelclub.", "Клуб один: Das ist …"],
        ["c", "Das ist ein Kiellinie.", "Kiellinie — название, без артикля."],
      ]),
      turn("Und wer ist der Mann mit dem Tee?", "А кто мужчина с чаем?", "b", [
        ["a", "Das ist Herr Jensen. Er spricht sehr viel.", "Йенсен — кто угодно, только не болтун."],
        ["b", "Das ist Herr Jensen. Er sagt nur Moin.", "Верно — и иногда целую фразу."],
        ["c", "Das ist Herrn Jensen.", "После Das ist — Herr Jensen."],
      ]),
      turn("Kann ich hier segeln lernen?", "Можно здесь научиться ходить под парусом?", "c", [
        ["a", "Ja, du kannst hier segeln lernen.", "Тоже верно, но у Луки нет членства. Сначала — экзамен!"],
        ["b", "Ja, du kannst hier segeln lernst.", "После kannst — инфинитив в конце: lernen."],
        ["c", "Ja! Aber zuerst: eine Prüfung bei Frau Petersen!", "Верно: так начинали и вы."],
      ]),
    ]),
  },
  {
    t: "game",
    task: "Соедините вопрос Луки и ваш ответ.",
    c: pairs([
      ["Wie heißt du?", "Ich heiße Anna."],
      ["Woher kommst du?", "Aus Russland."],
      ["Wo wohnst du?", "In Kiel."],
      ["Was machst du gern?", "Ich segle gern."],
    ]),
  },
  mateo("Und wer hat Hunger? Ich habe Brötchen – für alle, auch für Luca!", "А кто голоден? У меня булочки — на всех, и для Луки тоже!"),
  { t: "gap", rule: ["essen/akkusativ-2"], task: "Что предлагает Матео?", text: "Ich habe Brötchen – für ___!", options: ["alle", "allen", "aller"], answer: "alle", ru: "У меня булочки — на всех!" },
  narr("Luca schreibt das erste Wort in sein {notizbuch}: Moin. Dana stempelt: Sprechen — {bestanden}! Sein Hobby: Tennis spielen."),
  {
    t: "pick",
    task: "Почему это сцена вашего экзамена, а не Луки?",
    options: [
      ok("Теперь вы объясняете клуб по-немецки — как вам объясняли в первый день"),
      no("Лука сдаёт экзамен вместо вас", "У Луки пока одно слово — Moin. Говорили вы."),
      no("Экзамен отменили", "Дана ставит четвёртый штамп: Sprechen — bestanden."),
    ],
  },
  { t: "clue", title: "Sprechen", text: "Luca aus Italien: ein Wort — Moin. Herr Jensen gibt ihm ein Notizbuch. Sie haben ihm den Club erklärt — auf Deutsch." },
];

// Сцена 6 · эпилог: фейерверк, доска почёта и Küstenlogbuch — мост к сезону A2.
const abend: SceneNode[] = [
  { t: "pic", src: "13-feuerwerk.jpg", alt: "Вечер у клуба: над водой фейерверк, команда у доски почёта с новой белой строкой внизу, Йенсен с кружкой чая, чайка сидит у окна над табличкой MOIN" },
  narr("Abend am Club. Über dem Wasser: {feuerwerk}. Die Kieler Woche ist zu Ende. Alles ist wieder {normal}. Und {wasfuer} Tag!"),
  {
    t: "game",
    task: "Последний вечер: послушайте слово и нажмите на картинку.",
    c: { kind: "scene", items: [{ word: "das Feuerwerk", icon: "🎆" }, { word: "der Kuchen", icon: "🎂" }, { word: "die Möwe", icon: "🐦" }, { word: "der Tee", icon: "🍵" }, { word: "das Wasser", icon: "💧" }, { word: "die Party", icon: "🎉" }] },
  },
  petersen("Vier Teile, vier Stempel. Sie haben die Prüfung bestanden!", "Четыре части, четыре штампа. Вы сдали экзамен!"),
  dana("Und hier: nicht zwei Unterschriften – zehn! Alle haben unterschrieben!", "А вот: не две подписи — десять! Все подписали!"),
  {
    t: "hear",
    task: "Сколько подписей собрала Дана?",
    voice: "Anna",
    de: "Und hier: nicht zwei Unterschriften – zehn! Alle haben unterschrieben!",
    options: ["десять", "две", "двенадцать"],
    answer: "десять",
  },
  mateo("Wo ist der Kuchen? … Unter dem Tisch! Und die Möwe isst ihn. Das ist unmöglich!", "Где пирог? … Под столом! И чайка его ест. Это невозможно!"),
  narr("Greta bringt die {ehrentafel}. Unten ist ein Platz frei — weiß und neu. Daneben liegt ein Pinsel. Alle sind {gluecklich}."),
  {
    t: "type",
    task: "Напишите своё имя на доске почёта.",
    answers: ["*", "Ich heiße *."],
    sample: "Anna",
    ru: "Ваше имя.",
  },
  hauke("Jetzt bist du Mitglied! Du hast einen Platz im Club – und einen Namen an der Tafel!", "Теперь ты член клуба! У тебя есть место в клубе — и имя на доске!"),
  {
    t: "reply",
    rule: ["reisen/perfekt-2"],
    task: "Ответьте Хауке: что вы сделали за эти две недели?",
    options: [
      ok("Ich habe Deutsch gelernt – und ich bin Mitglied geworden!"),
      no("Ich bin Deutsch gelernt – und ich bin Mitglied geworden!", "lernen — с haben: Ich habe gelernt."),
      no("Ich habe Deutsch gelernt – und ich habe Mitglied geworden!", "werden — изменение: Ich bin geworden."),
    ],
  },
  brandt("Und morgen fährt die Möwe nach Helgoland. Kommen Sie alle mit – Helgoland ist schön!", "А завтра чайка едет на Гельголанд. Поезжайте все вместе — на Гельголанде красиво!"),
  elif("Ein Ausflug nach Helgoland! Mit der Möwe! Ich packe sofort!", "Поездка на Гельголанд! С чайкой! Собираюсь немедленно!"),
  hauke("Dann brauchen wir ein Logbuch – für alle Reisen! Wohin, wann, mit wem.", "Тогда нам нужен журнал — для всех поездок! Куда, когда, с кем."),
  narr("So beginnt das {kuestenlogbuch}: ein Buch für alle Reisen am Meer. Es ist noch leer. Bald steht {dort} alles. Auch: Tennis spielen mit Luca."),
  {
    t: "game",
    rule: ["tagesablauf/vorfeld-1"],
    task: "Запишите первую строку Küstenlogbuch: время — первым.",
    hint: "Время на первом месте, глагол — второй.",
    c: order(["Am", "Montag", "fahren", "wir", "nach", "Helgoland."], ["nach", "wir", "Helgoland.", "Am", "fahren", "Montag"]),
  },
  {
    t: "type",
    task: "Подпишите обложку нового журнала поездок.",
    answers: ["das Küstenlogbuch", "Das Küstenlogbuch", "Küstenlogbuch"],
    ru: "Журнал поездок по побережью.",
  },
  mateo("Und ich koche auf jeder Reise! Fischbrötchen für alle!", "А я готовлю в каждой поездке! Булочки с рыбой всем!"),
  { t: "gap", rule: ["kennenlernen/endungen-1"], task: "Что обещает Матео?", text: "Ich ___ auf jeder Reise!", options: ["koche", "kocht", "kochen"], answer: "koche", ru: "Я готовлю в каждой поездке!" },
  elif("Und was soll ich in das Logbuch schreiben?", "А что мне писать в журнал?"),
  hauke("Wenn du nichts weißt – schreib Moin! Opas Schild ist wieder da, denn wir haben es zusammen gefunden.", "Если не знаешь — пиши Moin! Табличка дедушки снова на месте: мы нашли её вместе."),
  narr("Die Möwe HEL 7305 sitzt auf dem Schild MOIN. Der Ring ist wieder da. Sie sagt nichts — wie Herr Jensen."),
  jensen("Moin.", "Привет."),
  {
    t: "pick",
    task: "Что теперь значит это Moin?",
    options: [
      ok("Привет, спасибо, до завтра и добро пожаловать в клуб — всё сразу"),
      no("Йенсен снова не хочет говорить", "Говорить он может: в субботу он сказал целую фразу. Moin — его выбор."),
      no("Йенсен забыл слова", "Йенсен ничего не забывает: ни 1976 год, ни ваш первый день."),
    ],
  },
  { t: "clue", title: "Moin.", text: "Sie sind Mitglied im Club: vier Teile, zehn Unterschriften, ein Name an der Ehrentafel. Morgen: Helgoland. Das Küstenlogbuch beginnt." },
];

const play = (nodes: SceneNode[]) => ({ kind: "play" as const, nodes });

export const sceneChapter13: Episode = {
  id: "moin-neu-13",
  title: "Die Prüfung",
  day: { de: "Der letzte Tag", ru: "последний день Kieler Woche" },
  place: "Клуб, вокзал, город, мастерская и подвал · солнце и фейерверк",
  topic: "A1+: повторение и экзамен",
  grammar: "Всё A1: вопросы и порядок слов, винительный и дательный, модальные глаголы, повелительное, Perfekt",
  beats: [
    {
      id: "13-s1",
      title: "Der letzte Tag",
      story: [],
      prompt: "Фрау Петерсен устраивает экзамен на членство в клубе.",
      hint: "Ich möchte Mitglied werden. — möchte + инфинитив в конце.",
      success: "Четыре части, две подписи. Начало — в половине одиннадцатого.",
      challenge: play(morning),
    },
    {
      id: "13-s2",
      title: "Hören",
      story: [],
      prompt: "Вокзал: объявления, автоответчик и гостья с Гельголанда.",
      hint: "Er hat circa zehn Minuten Verspätung. — главное: число и единица.",
      success: "Hören — bestanden. Фрау Брандт приехала к чайке.",
      challenge: play(back(hoeren, 13, 2)),
    },
    {
      id: "13-s3",
      title: "Lesen",
      story: [],
      prompt: "Водитель грузовика заблудился, и весь клуб показывает в разные стороны.",
      hint: "Fahren Sie bitte nach rechts! — просьба на Sie: глагол первым.",
      success: "Lesen — bestanden. Стулья для праздника доехали.",
      challenge: play(back(lesen, 13, 0)),
    },
    {
      id: "13-i1",
      title: "Глазами Греты",
      pov: "глазами Греты",
      story: [],
      prompt: "Интерлюдия: Грета готовит доске почёта новую строку.",
      hint: "Den Namen schreibt man allein. — man: «пишут».",
      success: "На доске почёта — пустая строка.",
      challenge: play(greta),
    },
    {
      id: "13-s4",
      title: "Schreiben",
      story: [],
      prompt: "Кольцо чайки, бланки фрау Петерсен и сообщение Матео.",
      hint: "Der Ring liegt im Schrank. Ich lege den Ring auf den Tisch.",
      success: "Schreiben — bestanden. Кольцо снова на чайке.",
      challenge: play(schreiben),
    },
    {
      id: "13-s5",
      title: "Sprechen",
      story: [],
      prompt: "Новичок знает одно слово — Moin. Теперь объясняете вы.",
      hint: "Ich heiße … Ich komme aus … Ich wohne in …",
      success: "Sprechen — bestanden. У Луки — блокнот и первое слово.",
      challenge: play(back(sprechen, 13, 3)),
    },
    {
      id: "13-s6",
      title: "Moin.",
      story: [],
      prompt: "Фейерверк, доска почёта и первая страница Küstenlogbuch.",
      hint: "Ich bin Mitglied geworden. — werden: Perfekt с sein.",
      success: "Вы — член клуба. Завтра — Гельголанд.",
      challenge: play(back(abend, 13, 1)),
    },
  ],
};
