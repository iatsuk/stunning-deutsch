import { an, ANSWER, ASK, bingo, gruss, gull as race, HINT_HEAR, HINT_LETTER, HINT_LOCK, HINT_ORAL, HINT_RACE, letter, lock, oral, order, pairs, RACE, RACE_STAKES, reply as oralReply, REQUEST, say as oralSay, sort, verdict, write } from "../build.ts";
import { phrases } from "../data.ts";
import type { Challenge, Episode, SceneNode } from "../types.ts";

// Глава 12 в формате сцен (A1-PLOT.md, «Формат сцен»): поездки, погода, даты, Perfekt с sein. Вопрос
// главы — успеем ли к старту. Вход — мокрая краска, дождь и тайна; выход — табличка на месте, вы
// рассказываете дело по-немецки, Йенсен произносит целую фразу. Повороты брошены оракулом
// (seed 1794688323), увязка — в журнале A1-STORYCRAFT.md. Финал чайки зависит от её часов за всю игру.

const narr = (text: string): SceneNode => ({ t: "narr", text });
const learn = (words?: string[]) => (words ? { learn: words } : {});
const hauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Hauke", voice: "Rocko", de, ru, ...learn(words) });
const elif = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Elif", voice: "Flo", de, ru, ...learn(words) });
const dana = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Dana", voice: "Anna", de, ru, ...learn(words) });
const mateo = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Mateo", voice: "Reed", de, ru, ...learn(words) });
const petersen = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frau Petersen", voice: "Sandy", de, ru, ...learn(words) });
const opa = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Opa Hansen", voice: "Eddy", de, ru, ...learn(words) });
const rezeption = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Rezeption", voice: "Shelley", de, ru, ...learn(words) });
const jensen = (de: string, ru: string): SceneNode => ({ t: "say", who: "Herr Jensen", voice: "Grandpa", de, ru });
/** Пары памяти — из выражений истории, которые глава уже показала. */
const memory = (ids: string[]): Challenge => ({ kind: "memory", pairs: ids.map((id) => ({ id, de: phrases[id].de, ru: phrases[id].ru })) });
const clock = (answer: string, traps: Record<string, string>): Challenge => ({ kind: "clock", start: "07:00", step: 5, answer, traps });
const ok = (text: string) => ({ text, ok: true as const });
const no = (text: string, react: string) => ({ text, react });

const MATEO_HOTEL = "Das Schild ist nass? Es braucht ein Hotel! Ein Zimmer, warm und trocken!";
const OPA = "Moin! Ich bin mit dem Zug aus Hamburg gekommen. Der Zug hatte Verspätung – zwanzig Minuten!";
const JENSEN = "Vor fünfzig Jahren habe ich die Farbe gehalten. Heute ist das Schild wieder da. Danke, Greta. Danke, Heinrich. Willkommen, Kieler Woche!";

// Сцена 1 · пролог: суббота, дождь, краска не высохла. Бросок: подарок игроку · Матео · неверно
// перевести · das Hotel · 19 — Матео говорит, что табличке нужен «Hotel», то есть тёплая сухая
// комната; Бросок: герой по черте · Грета · найти · das Hotel · 18 — Грета находит отель у гавани с
// тёплой сушильной. Бросок: сквозная шутка · Нильс · вернуть · der Winter · 3 (мелочь) — Нильс
// возвращает Хауке зимнюю куртку. В июне.
const regen: SceneNode[] = [
  { t: "pic", src: "12-regen.jpg", alt: "Субботнее утро в мастерской Греты, за окном ливень: табличка MOIN на верстаке блестит — краска ещё мокрая; Грета трогает её пальцем, Матео с термосом и Хауке в жёлтом дождевике смотрят на дождь" },
  narr("Samstag, der zwanzigste Juni. Kieler Woche! Und das Wetter? Es regnet. Es ist windig und kalt — wie im Herbst."),
  {
    t: "look",
    task: "Осмотритесь в мастерской.",
    items: [
      { icon: "🪟", de: "das Fenster", ru: "окно", note: "За окном ливень. Мачты в гавани гнутся.", key: true },
      { icon: "🎨", de: "die Farbe", ru: "краска", note: "Краска на табличке блестит. Мокрая.", key: true },
      { icon: "☂️", de: "der Regenschirm", ru: "зонт", note: "Зонт Хауке. Ветер уже вывернул его наизнанку." },
    ],
  },
  hauke("Es regnet, es regnet! Und das Schild ist noch nicht trocken!", "Дождь, дождь! А табличка ещё не высохла!", ["das Wetter"]),
  hauke("Heute ist es kälter als im Herbst!", "Сегодня холоднее, чем осенью!"),
  dana("Der Wetterbericht hat recht: Regen, Wind – und nur zwölf Grad!", "Прогноз не соврал: дождь, ветер — и всего двенадцать градусов!"),
  narr("Грета трогает табличку — палец тёмно-синий. Die Farbe ist nicht {trocken}. Der {start} ist um elf."),
  {
    t: "game",
    rule: ["moin/als-1"],
    task: "Запишите в блокнот, какая сегодня погода. Соберите фразу Хауке.",
    hint: "Сравнение: -er als — kälter als im Herbst.",
    c: order(["Heute", "ist", "es", "kälter", "als", "im", "Herbst!"], ["als", "Herbst!", "es", "Heute", "kälter", "im", "ist"]),
  },
  {
    t: "hear",
    task: "Что говорит Хауке?",
    voice: "Rocko",
    de: "Es regnet, es regnet! Und das Schild ist noch nicht trocken!",
    options: ["идёт дождь, а табличка ещё мокрая", "дождь кончился", "табличку уже унесли"],
    answer: "идёт дождь, а табличка ещё мокрая",
  },
  {
    t: "gap",
    rule: ["reisen/es-regnet-1"],
    task: "Какая погода?",
    text: "Heute regnet ___.",
    options: ["es", "er", "—"],
    answer: "es",
    ru: "Сегодня идёт дождь.",
  },
  {
    t: "game",
    task: "Ветер уносит слова. Какое прозвучало?",
    hint: "Wetter — погода, Winter — зима. Koffer — чемодан, Kaffee — кофе. kalt — холодный, alt — старый.",
    c: {
      kind: "sounds",
      rounds: [
        { say: "das Wetter", options: ["das Wetter", "der Winter"] },
        { say: "der Koffer", options: ["der Koffer", "der Kaffee"] },
        { say: "kalt", options: ["kalt", "alt"] },
      ],
    },
  },
  mateo(MATEO_HOTEL, "Табличка мокрая? Ей нужен отель! Комната, тёплая и сухая!", ["das Hotel"]),
  {
    t: "hear",
    task: "Что, по словам Матео, нужно табличке?",
    voice: "Reed",
    de: MATEO_HOTEL,
    options: ["тёплая сухая комната — он называет её «отель»", "новая краска", "поездка в Гамбург"],
    answer: "тёплая сухая комната — он называет её «отель»",
  },
  {
    t: "pick",
    task: "Что на самом деле имеет в виду Матео?",
    options: [
      ok("Табличке нужна тёплая сухая комната, чтобы краска высохла"),
      no("Табличку надо поселить в отель на ночь", "Матео путает слова: «Hotel» — это его «тёплая комната»."),
      no("Матео хочет в отпуск", "Сегодня праздник, а не отпуск."),
    ],
  },
  {
    t: "reply",
    task: "Спросите Грету, где есть такой «отель».",
    options: [
      ok("Greta, wo ist das Hotel?"),
      no("Greta, wohin ist das Hotel?", "Где? — wo. Wohin — куда."),
      no("Greta, wo sind das Hotel?", "das Hotel — один: ist."),
    ],
  },
  narr("Грета пишет, Элиф читает вслух. Da ist {trockenraum}. Отель Грета знает: Sie hat da früher gearbeitet."),
  elif("Greta schreibt: Hotel am Hafen, neben dem Club! Der Trockenraum ist warm und trocken!", "Грета пишет: отель у гавани, рядом с клубом! В сушильной тепло и сухо!"),
  hauke("Ein Trockenraum! Super! Wir fahren mit dem Bus – mit dem Schild!", "Сушильная! Супер! Едем на автобусе — с табличкой!"),
  {
    t: "game",
    rule: ["reisen/es-regnet-1"],
    task: "Чемодан по прогнозу: что взять с собой в такой день?",
    hint: "Es regnet, es ist windig und kalt.",
    c: sort([["ja", "mitnehmen"], ["nein", "zu Hause lassen"]], [
      ["schirm", "der Regenschirm", "ja", "☂️"],
      ["jacke", "die Jacke", "ja", "🧥"],
      ["karton", "der Karton für das Schild", "ja", "📦"],
      ["sonne", "die Sonnenbrille", "nein", "🕶️"],
      ["badehose", "das T-Shirt", "nein", "👕"],
    ]),
  },
  narr("Nils kommt — мокрый до нитки, с толстой курткой для Хауке: «Deine Winterjacke!!! Für dich!!!»"),
  hauke("Meine Winterjacke? Im Juni? Danke, Nils! Heute – perfekt!", "Моя зимняя куртка? В июне? Спасибо, Нильс! Сегодня — в самый раз!", ["der Winter"]),
  {
    t: "game",
    task: "На табличках отеля и в прогнозе длинные слова. Соберите каждое из частей и выберите род.",
    hint: "Род — по последней части: der Schirm → der Regenschirm.",
    c: {
      kind: "compound",
      rounds: [
        { word: "der Regenschirm", parts: ["Regen", "Schirm"], ru: "зонт" },
        { word: "das Einzelzimmer", parts: ["Einzel", "Zimmer"], ru: "одноместный номер" },
        { word: "der Flughafen", parts: ["Flug", "Hafen"], ru: "аэропорт" },
      ],
      extra: ["Sonne", "Wind", "Bett"],
    },
  },
  {
    t: "type",
    rule: ["reisen/perfekt-1"],
    task: "Запишите в блокнот, как Нильс добрался до мастерской: на автобусе.",
    answers: ["Nils ist mit dem Bus gekommen.", "Er ist mit dem Bus gekommen.", "Nils ist mit dem Bus gefahren."],
    ru: "Нильс приехал на автобусе.",
  },
  {
    t: "clue",
    title: "Es regnet",
    text: "Samstag, zwanzigster Juni. Es regnet. Das Schild ist nicht trocken. Mateo: «Ein Hotel!» Greta: Hotel am Hafen, neben dem Club, der Trockenraum ist warm.",
  },
];

// Сцена 2 · развитие: дорога с табличкой под дождём. Коробка Йенсена с контуром — табличка входит
// точно. Бросок: ложный след · чайка · потерять · die Verspätung · 4 (мелочь) — объявление: автобус
// опаздывает, а чайки нигде нет — «потерялась»; на деле она ждёт на крыше клуба. Алгоритм под
// дождём: от остановки к отелю.
const weg: SceneNode[] = [
  { t: "pic", src: "12-karton.jpg", alt: "Остановка автобуса под дождём: Хауке в зимней куртке поверх жёлтого дождевика держит над головой плоскую коробку, Элиф и Нильс держат над ней зонты; табло на остановке без надписей" },
  narr("Das Schild kommt in {karton} von Herrn Jensen. Der {umriss} passt: M, O, I, N. Хауке несёт коробку, как младенца."),
  elif("Der Karton passt! Herr Jensen hat alles geplant!", "Коробка подходит! Господин Йенсен всё продумал!"),
  {
    t: "gap",
    rule: ["reisen/haben-sein-1"],
    task: "Что говорит Элиф о Йенсене?",
    text: "Herr Jensen ___ alles geplant.",
    options: ["hat", "ist", "war"],
    answer: "hat",
    ru: "Господин Йенсен всё спланировал.",
  },
  hauke("Und wenn es regnet, bleibt der Karton zu!", "А если идёт дождь, коробка остаётся закрытой!"),
  narr("An der Haltestelle: Regen, Wind — und eine Durchsage."),
  {
    t: "look",
    task: "Осмотритесь на остановке.",
    items: [
      { icon: "🚏", de: "die Haltestelle", ru: "остановка", note: "Навес течёт. Табло мигает: Bus — +10.", key: true },
      { icon: "🚌", de: "der Bus", ru: "автобус", note: "Автобуса нет. Опаздывает.", key: true },
      { icon: "🚕", de: "das Taxi", ru: "такси", note: "Единственное такси занято: в нём Opa из чужой семьи." },
    ],
  },
  narr("Neben der Haltestelle ist {reisebuero}. Im Fenster: {reisefuehrer}, {meer} und Sonne — die ganze {welt} in einer Woche!"),
  { t: "say", who: "Durchsage", voice: "Shelley", de: "Achtung: Der Bus hat zehn Minuten Verspätung. Er kommt um acht Uhr zwanzig.", ru: "Внимание: автобус опаздывает на десять минут. Он придёт в восемь двадцать." },
  {
    t: "hear",
    task: "На сколько опаздывает автобус?",
    voice: "Shelley",
    de: "Achtung: Der Bus hat zehn Minuten Verspätung. Er kommt um acht Uhr zwanzig.",
    options: ["на десять минут", "на двадцать минут", "на час"],
    answer: "на десять минут",
  },
  {
    t: "game",
    rule: ["tagesablauf/wann-1"],
    task: "Когда придёт автобус? Поставьте часы.",
    c: clock("08:20", {
      "08:10": "Это время по расписанию. Но автобус опаздывает на десять минут.",
      "08:30": "Это на двадцать минут позже. Объявили — acht Uhr zwanzig.",
      "07:20": "Утро уже в восемь. Acht Uhr zwanzig — 8:20.",
    }),
  },
  narr("Über der Haltestelle: ein Flugzeug, {abflug} in Hamburg. Die Möwe braucht kein Flugzeug. Sie kann {fliegen}!"),
  elif("Und die Möwe? Die Möwe ist weg! Wo ist sie?", "А чайка? Чайки нет! Где она?", ["die Verspätung"]),
  {
    t: "pick",
    task: "Куда делась чайка?",
    options: [
      ok("Скорее всего, ждёт у клуба: там будет торт"),
      no("Улетела на Гельголанд", "В такую погоду? Чайки перед штормом летят в город, а не в море."),
      no("Уехала на прошлом автобусе", "Автобус ещё не пришёл: у него Verspätung."),
    ],
  },
  {
    t: "type",
    task: "Запишите в блокнот, что с автобусом.",
    answers: ["Der Bus hat Verspätung.", "Der Bus hat zehn Minuten Verspätung."],
    ru: "Автобус опаздывает.",
  },
  narr("Der Bus kommt — und fährt. Kiellinie, Haltestelle. Bis zum Hotel: nur drei Straßen. Но дороги Хауке не знает."),
  hauke("Drei Straßen? Links, rechts … Ich brauche ein Programm!", "Три улицы? Налево, направо… Мне нужна программа!"),
  {
    t: "game",
    rule: ["stadt/imperativ-2"],
    task: "Соберите для Хауке программу: от остановки к отелю, под дождём. Потом нажмите «Пуск».",
    hint: "Хауке смотрит вверх, на север. links и rechts — повернуть и пройти квартал.",
    c: {
      kind: "algo",
      width: 3,
      height: 3,
      start: { x: 0, y: 2, heading: 0 },
      places: { "0,2": "die Haltestelle", "0,0": "der Kiosk", "1,0": "die Pfütze", "2,0": "der Club", "2,1": "das Hotel" },
      goal: "2,1",
      moves: ["geradeaus", "rechts", "geradeaus"],
      max: 5,
    },
  },
  hauke("Wir sind angekommen! Und der Karton ist trocken!", "Мы дошли! И коробка сухая!"),
  dana("Gut gemacht, Hauke! Und keine Pfütze!", "Отлично, Хауке! И ни одной лужи!"),
  {
    t: "reply",
    rule: ["reisen/angekommen-2"],
    task: "Напишите Грете, что вы дошли до отеля.",
    options: [
      ok("Wir sind im Hotel angekommen."),
      no("Wir haben im Hotel angekommen.", "ankommen — движение: Perfekt с sein."),
      no("Wir sind im Hotel geankommen.", "ge- стоит между приставкой и корнем: angekommen."),
    ],
  },
  {
    t: "game",
    rule: ["reisen/check-1"],
    task: "Соберите фразу для блокнота: причастие — в конце.",
    hint: "Время первым, sein — вторым, angekommen — в самом конце.",
    c: order(["Um", "halb", "neun", "sind", "wir", "angekommen."], ["angekommen.", "wir", "Um", "sind", "neun", "halb"]),
  },
  { t: "game", task: "Слова поездки — по ящикам Йенсена: der, die, das.", hint: "Артикль запоминают вместе со словом. После ошибки слово вернётся в конце очереди.", c: { kind: "docks", words: ["der Koffer", "die Reise", "das Hotel", "der Zug", "das Flugzeug", "die Fahrkarte", "der Urlaub", "die Nacht", "der Flughafen", "die Durchsage", "der Monat", "die Jahreszeit", "der Frühling"] } },
  {
    t: "clue",
    title: "Der Karton",
    text: "Das Schild ist im Karton von Herrn Jensen — trocken. Der Bus hatte zehn Minuten Verspätung. Die Möwe ist weg. Um halb neun: Hotel am Hafen.",
  },
];

// Сцена 3 · развитие: отель у гавани, свидетели в своём порядке. Бросок: неприятность · Петерсен ·
// подслушать · die Anreise · 15 — Петерсен подслушала, что приезжает Opa Hansen, и поселила его
// в этот же отель. Сила выше ожидаемой: Opa уже здесь, в холле, и хочет посмотреть клуб — а табличка
// сохнет за стенкой. Форма брони на слух.
const hotel: SceneNode[] = [
  { t: "pic", src: "12-hotel.jpg", alt: "Холл небольшого отеля у гавани: за стойкой регистратор, у стойки бодрый девяностолетний Opa Hansen с тростью и старым чемоданом; Хауке прячет за спиной плоскую коробку, Элиф машет руками, отвлекая его; за приоткрытой дверью сушильной висят полотенца" },
  narr("Im Hotel am Hafen: eine Rezeption — а у стойки старик: {muetze}, Koffer. Opa Hansen!"),
  opa(OPA, "Привет! Я приехал на поезде из Гамбурга. Поезд опоздал — на двадцать минут!", ["die Anreise"]),
  {
    t: "hear",
    task: "Как Opa Hansen добрался до Киля?",
    voice: "Eddy",
    de: OPA,
    options: ["на поезде из Гамбурга, с опозданием", "на машине с Нильсом", "на пароме"],
    answer: "на поезде из Гамбурга, с опозданием",
  },
  opa("Ich bleibe für zwei Nächte. Ab Montag bin ich wieder in Hamburg.", "Я остаюсь на две ночи. С понедельника я снова в Гамбурге."),
  petersen("Ich habe es gehört: Opa Hansen kommt! Und ich habe ein Zimmer reserviert – hier!", "Я услышала: Opa Hansen приезжает! И я забронировала номер — здесь!"),
  { t: "gap", rule: ["reisen/perfekt-1"], task: "Что сделала фрау Петерсен?", text: "Ich habe ein Zimmer ___.", options: ["reserviert", "reservieren", "gereserviert"], answer: "reserviert", ru: "Я забронировала номер." },
  petersen("Und wem gehört der Karton, Hauke?", "А чья это коробка, Хауке?"),
  {
    t: "type",
    rule: ["moin/wem-1"],
    task: "Хауке прячет коробку за спиной. Ответьте за него: коробка господина Йенсена — и ни слова о табличке.",
    answers: ["Er gehört Herrn Jensen.", "Der Karton gehört Herrn Jensen.", "Herrn Jensen."],
    sample: "Er gehört Herrn Jensen.",
    ru: "Она принадлежит господину Йенсену.",
  },
  narr("Фрау Петерсен подслушала — und reserviert. Opa Hansen ist hier. Und das Schild? Auch hier, im Trockenraum. Opa darf es nicht sehen!"),
  {
    t: "go",
    task: "Что сделать в отеле?",
    next: "Дальше по делу",
    branches: [
      {
        label: "Табличку — в сушильную",
        icon: "🧺",
        nodes: [
          rezeption("Der Trockenraum? Für ein Schild? Na gut. Aber nur bis halb elf!", "Сушильная? Для таблички? Ну ладно. Но только до половины одиннадцатого!"),
          {
            t: "hear",
            task: "До какого времени можно сушить табличку?",
            voice: "Shelley",
            de: "Der Trockenraum? Für ein Schild? Na gut. Aber nur bis halb elf!",
            options: ["до 10:30", "до 11:30", "до 10:00"],
            answer: "до 10:30",
          },
          rezeption("Da ist es über dreißig Grad warm – und bis halb elf geöffnet.", "Там больше тридцати градусов — и открыто до половины одиннадцатого."),
          narr("Im Trockenraum ist es warm. Грета ставит табличку к стене, рядом — {foehn}. Хауке включает его."),
          {
            t: "type",
            task: "Запишите в блокнот, где сейчас табличка.",
            answers: ["Das Schild ist im Trockenraum.", "Das Schild ist im Hotel.", "Das Schild ist im Trockenraum im Hotel."],
            ru: "Табличка в сушильной.",
          },
        ],
      },
      {
        label: "Отвлечь Opa Hansen",
        icon: "👴",
        nodes: [
          opa("Wo ist denn der Club? Ich möchte das Schild sehen! Mein Schild!", "А где же клуб? Я хочу увидеть табличку! Мою табличку!"),
          {
            t: "reply",
            rule: ["reisen/perfekt-1"],
            task: "Отвлеките Opa: спросите про дорогу.",
            options: [
              ok("Wie sind Sie gefahren, Herr Hansen?"),
              no("Wie haben Sie gefahren, Herr Hansen?", "fahren — движение: Perfekt с sein."),
              no("Wie sind Sie gefährt, Herr Hansen?", "fahren — сильный: gefahren."),
            ],
          },
          opa("Mit dem Zug! Zwei Stunden. Und dann bin ich zu Fuß gegangen – im Regen!", "На поезде! Два часа. А потом пошёл пешком — под дождём!"),
          {
            t: "hear",
            task: "Как Opa шёл от вокзала?",
            voice: "Eddy",
            de: "Mit dem Zug! Zwei Stunden. Und dann bin ich zu Fuß gegangen – im Regen!",
            options: ["пешком под дождём", "на такси", "на автобусе"],
            answer: "пешком под дождём",
          },
          narr("In Hamburg war {anschluss} weg. Und {gepaeck} — Koffer und Tasche — hat Opa allein."),
          narr("Opa рассказывает и рассказывает, Элиф кивает. Das Schild bleibt ein {geheimnis}."),
        ],
      },
      {
        label: "Бронь у стойки",
        icon: "🛎️",
        nodes: [
          rezeption("Also: Hansen, ein Einzelzimmer, zwei Nächte. Anreise heute, Abreise am Montag.", "Итак: Хансен, одноместный номер, две ночи. Заезд сегодня, выезд в понедельник.", ["das Einzelzimmer"]),
          {
            t: "game",
            task: "Регистратор диктует бронь Opa. Заполните карточку на слух.",
            hint: "Слушайте: какой номер, сколько ночей, когда выезд.",
            c: write("Reservierung", [
              ["Name", "Hansen", "Herr Hansen"],
              ["Zimmer", "Einzelzimmer", "ein Einzelzimmer"],
              ["Nächte", "zwei", "2"],
              ["Abreise", "Montag", "am Montag"],
            ]),
          },
          { t: "gap", task: "Сколько ночей пробудет Opa?", text: "Opa bleibt zwei ___.", options: ["Nächte", "Nacht", "Nachten"], answer: "Nächte", ru: "Opa пробудет две ночи." },
          {
            t: "look",
            task: "На стойке — прейскурант отеля. Рассмотрите его.",
            items: [
              { icon: "🛏️", de: "das Doppelzimmer", ru: "двухместный номер", note: "«DZ · 2 Personen» — для двоих. У Opa — одноместный.", key: true },
              { icon: "👤", de: "die Person", ru: "человек", note: "Цена «pro Person» — за одного." },
              { icon: "📅", de: "das Datum", ru: "дата", note: "В брони: Datum — 20.06., Anreise." },
            ],
          },
          narr("Und klein: {halbpension} — Frühstück und Abendessen. Nur {uebernachten} ist billiger, aber Opa mag Frühstück."),
        ],
      },
    ],
  },
  dana("Gut gemacht! Opa sieht nichts – und das Schild trocknet.", "Отлично! Opa ничего не видит — а табличка сохнет."),
  {
    t: "game",
    rule: ["reisen/haben-sein-1"],
    task: "haben или sein? Разложите, что сегодня случилось.",
    hint: "Движение и «остаться» — sein; остальное — haben.",
    c: sort([["sein", "ist / sind …"], ["haben", "hat / haben …"]], [
      ["zug", "Opa … mit dem Zug gekommen.", "sein", "🚆"],
      ["fuss", "Er … zu Fuß gegangen.", "sein", "🚶"],
      ["bleiben", "Das Schild … im Hotel geblieben.", "sein", "🏨"],
      ["reserviert", "Frau Petersen … ein Zimmer reserviert.", "haben", "🛎️"],
      ["geregnet", "Es … den ganzen Morgen geregnet.", "haben", "🌧️"],
    ]),
  },
  {
    t: "pick",
    task: "Почему Opa нельзя видеть табличку до старта?",
    options: [
      ok("Это сюрприз и для него: он увидит свою табличку на старте"),
      no("Он заберёт её в Гамбург", "Табличка — клубная. Opa её автор, а не хозяин."),
      no("Краска вредна для него", "Краска уже сохнет. Дело в сюрпризе."),
    ],
  },
  {
    t: "clue",
    title: "Hotel am Hafen",
    text: "Opa Hansen: mit dem Zug aus Hamburg, Verspätung, Regen, Hotel am Hafen. Frau Petersen hat das Zimmer reserviert. Das Schild ist im Trockenraum — bis halb elf.",
  },
];

// Сцена 4 · поворот и кризис: клуб в десять. Бросок: ложный след · Петерсен · сломать · der Herbst · 10 —
// Петерсен разбивает старый барометр клуба: стрелка на «Sturm», и она объявляет праздник «осенью».
// Регата отвечает: старт, как всегда, в одиннадцать. Ложная тревога — но время уходит.
const herbst: SceneNode[] = [
  { t: "pic", src: "12-barometer.jpg", alt: "Клуб в десять утра: фрау Петерсен в ужасе держит разбитый старый барометр, стрелка на буре; Матео прижимает к себе торт под полотенцем, Дана смотрит на часы, за окном ливень и мачты" },
  narr("Zehn Uhr im Club. Фрау Петерсен снимает со стены {barometer} — и крак! Kaputt. Стрелка — на Sturm."),
  {
    t: "look",
    task: "Осмотрите клуб за час до старта.",
    items: [
      { icon: "🌡️", de: "das Barometer", ru: "барометр", note: "Стекло треснуло, стрелка застыла на буре. Барометр сломан, а не погода.", key: true },
      { icon: "🎂", de: "der Kuchen", ru: "пирог, торт", note: "Торт под полотенцем. Матео не отходит от него ни на шаг.", key: true },
      { icon: "🕙", de: "die Uhr", ru: "часы", note: "Часы клуба: 10:05. Старт — в одиннадцать." },
    ],
  },
  petersen("Sturm! Regen! Das ist kein Sommer, das ist Herbst! Die Party ist im Herbst!", "Буря! Дождь! Это не лето, это осень! Праздник — осенью!", ["der Herbst"]),
  {
    t: "hear",
    task: "Что объявляет фрау Петерсен?",
    voice: "Sandy",
    de: "Sturm! Regen! Das ist kein Sommer, das ist Herbst! Die Party ist im Herbst!",
    options: ["праздник переносится на осень", "праздник начинается раньше", "праздник будет в отеле"],
    answer: "праздник переносится на осень",
  },
  elif("Ein Barometer ist kein Wetterbericht! Und es ist kaputt!", "Барометр — не прогноз погоды! И он разбит!"),
  {
    t: "reply",
    task: "Успокойте фрау Петерсен.",
    options: [
      ok("Frau Petersen, das Barometer ist kaputt!"),
      no("Frau Petersen, der Barometer ist kaputt!", "das Barometer — средний род."),
      no("Frau Petersen, das Barometer sind kaputt!", "Один барометр: ist."),
    ],
  },
  mateo("Im Herbst? Und mein Kuchen? Er ist für heute!", "Осенью? А мой торт? Он на сегодня!"),
  { t: "gap", rule: ["reisen/monate-1"], task: "Что сказала фрау Петерсен?", text: "Die Party ist ___ Herbst.", options: ["im", "am", "um"], answer: "im", ru: "Праздник — осенью." },
  hauke("Herbst? Kein Problem – ich habe meine Winterjacke!", "Осень? Не проблема — у меня зимняя куртка!"),
  petersen("Gut. Aber vor dem Start machen wir ein Foto – alle!", "Ладно. Но перед стартом фотографируемся — все!"),
  { t: "game", task: "Фрау Петерсен в панике перечисляет времена года. Повторите вслух.", hint: "Запись остаётся только на этой странице и никуда не отправляется.", c: { kind: "speak", lines: ["der Sommer", "der Herbst", "der Winter"] } },
  narr("Звонит телефон. Die Regatta ist am Telefon. Фрау Петерсен слушает — и краснеет."),
  { t: "say", who: "Regatta", voice: "Shelley", de: "Der Start ist heute um elf. Wie immer. Auch bei Regen.", ru: "Старт сегодня в одиннадцать. Как всегда. Даже под дождём." },
  {
    t: "hear",
    task: "Что сказали из регаты?",
    voice: "Shelley",
    de: "Der Start ist heute um elf. Wie immer. Auch bei Regen.",
    options: ["старт сегодня в одиннадцать, как всегда", "старт осенью", "старт отменили"],
    answer: "старт сегодня в одиннадцать, как всегда",
  },
  dana("Diagnose: falscher Alarm. Aber wir haben nur noch eine Stunde!", "Диагноз: ложная тревога. Но у нас всего час!"),
  elif("Wir müssen schnell sein, denn der Start ist um elf! Ohne Schild? Unmöglich!", "Надо спешить: старт в одиннадцать! Без таблички? Невозможно!"),
  { t: "gap", rule: ["moin/un-los-1"], task: "Что сказала Элиф о старте без таблички?", text: "Ein Start ohne Schild ist ___.", options: ["unmöglich", "nichtmöglich", "möglichlos"], answer: "unmöglich", ru: "Старт без таблички невозможен." },
  {
    t: "game",
    task: "Где ложная тревога? Проверьте, что известно.",
    c: verdict(["Richtig", "Falsch"], [
      ["Барометр показывает бурю", true, "Стрелка на Sturm — но барометр разбит."],
      ["Праздник перенесли на осень", false, "Регата: старт сегодня в одиннадцать, как всегда."],
      ["Табличка сохнет в отеле до 10:30", true, "Так разрешили в отеле."],
    ]),
  },
  {
    t: "game",
    rule: ["reisen/monate-1"],
    task: "Когда у клуба день рождения? Отметьте дату в календаре — она в приглашении фрау Петерсен: «am zwanzigsten Juni».",
    hint: "zwanzig + -sten: am zwanzigsten — 20-го.",
    c: { kind: "calendar", months: [{ name: "Mai", days: 31 }, { name: "Juni", days: 30 }, { name: "Juli", days: 31 }], answer: "Juni:20" },
  },
  {
    t: "type",
    rule: ["reisen/datum-2"],
    task: "Запишите словами, когда день рождения клуба.",
    answers: ["Am zwanzigsten Juni.", "Der Club hat am zwanzigsten Juni Geburtstag.", "am zwanzigsten Juni"],
    ru: "Двадцатого июня.",
  },
  {
    t: "pick",
    task: "Что теперь главное?",
    options: [
      ok("Успеть забрать табличку из отеля до 10:30 и поставить её к одиннадцати"),
      no("Чинить барометр", "Барометр подождёт. Табличка — нет."),
      no("Переносить праздник", "Старт в одиннадцать. Ничего не переносится."),
    ],
  },
  {
    t: "clue",
    title: "Kein Herbst",
    text: "Das Barometer ist kaputt: «Sturm!» Frau Petersen: «Die Party ist im Herbst!» Die Regatta: der Start ist heute um elf, wie immer. Noch eine Stunde.",
  },
];

// Сцена 5 · кульминация: старт. Табличка возвращается под дождём, «Wo ist das Schild?» получает ответ
// «Hier.», класс Лотты касается таблички, Йенсену снова можно говорить — целая фраза, тишина, «Moin».
const start: SceneNode[] = [
  { t: "pic", src: "12-start.jpg", alt: "Старт у клуба: дождь кончается, сквозь тучи пробивается солнце; на подставке снова табличка MOIN, свежая и тёмно-синяя; Йенсен в фуражке говорит, рядом Грета, Opa Hansen с тростью, Лотта тянет руки к табличке, Хауке и Элиф ликуют, чайка на крыше" },
  narr("10:45. Das Schild kommt aus dem Hotel — trocken, im Karton. Хауке несёт, Элиф держит зонт. Der ganze Club wartet."),
  petersen("Wo ist das Schild?", "Где табличка?"),
  {
    t: "reply",
    task: "Фрау Петерсен спрашивает то же, что вы спрашивали в первый день. Ответьте.",
    options: [
      ok("Hier!"),
      no("Weg!", "Табличка уже здесь — в коробке, у подставки."),
      no("Im Keller!", "Подвал был в главе 8. Теперь — здесь."),
    ],
  },
  hauke("Hier! Hier ist es!", "Здесь! Вот она!"),
  narr("Das Schild steht wieder auf dem {aufsteller}. Dunkelblau, weiße Buchstaben, по краю — {seil}. Дождь кончился. Die Sonne scheint."),
  {
    t: "look",
    task: "Посмотрите на подставку у клуба.",
    items: [
      { icon: "🪧", de: "das Schild", ru: "табличка", note: "Тёмно-синяя, белые буквы MOIN, кант-канат — как в 1976 году. Только свежая.", key: true },
      { icon: "🗄️", de: "der Aufsteller", ru: "подставка", note: "Двенадцать дней пустая. Сегодня снова нет.", key: true },
      { icon: "🧢", de: "die Mütze", ru: "фуражка", note: "Opa Hansen снимает фуражку перед табличкой." },
    ],
  },
  elif("Die Sonne! Sogar die Sonne kommt zum Start!", "Солнце! Даже солнце пришло на старт!"),
  {
    t: "gap",
    rule: ["reisen/es-regnet-1"],
    task: "Какая теперь погода?",
    text: "Die Sonne ___.",
    options: ["scheint", "regnet", "schneit"],
    answer: "scheint",
    ru: "Светит солнце.",
  },
  narr("Opa Hansen sieht das Schild. Er sagt nichts. Lange. Dann nimmt er seine Mütze ab."),
  opa("Mein Schild. Fünfzig Jahre … und es ist wie neu. Greta, das hast du gemacht?", "Моя табличка. Пятьдесят лет… а она как новая. Грета, это ты сделала?"),
  narr("Грета кивает — и впервые говорит вслух: «Ja, Opa.»"),
  hauke("Opas Schild – und Gretas Farbe!", "Табличка деда — и краска Греты!"),
  {
    t: "hear",
    task: "Что спрашивает Opa Hansen?",
    voice: "Eddy",
    de: "Mein Schild. Fünfzig Jahre … und es ist wie neu. Greta, das hast du gemacht?",
    options: ["Грета, это ты сделала?", "Кто украл табличку?", "Где мой клуб?"],
    answer: "Грета, это ты сделала?",
  },
  {
    t: "type",
    rule: ["reisen/perfekt-1"],
    task: "Запишите вопрос Opa в блокнот.",
    answers: ["Greta, das hast du gemacht?", "Hast du das gemacht?", "Greta, hast du das gemacht?"],
    ru: "Грета, это ты сделала?",
  },
  narr("Herr Jensen steht auf. Ab heute darf er wieder sprechen. Все замолкают."),
  jensen(JENSEN, "Пятьдесят лет назад я держал краску. Сегодня табличка снова здесь. Спасибо, Грета. Спасибо, Хайнрих. Добро пожаловать, Kieler Woche!"),
  {
    t: "hear",
    task: "Что сказал Йенсен — впервые целой фразой?",
    voice: "Grandpa",
    de: JENSEN,
    options: ["пятьдесят лет назад он держал краску, а сегодня благодарит Грету и Хайнриха", "что он больше не будет говорить", "что табличку нужно перекрасить"],
    answer: "пятьдесят лет назад он держал краску, а сегодня благодарит Грету и Хайнриха",
  },
  narr("Тишина. Dann sagt Herr Jensen noch ein Wort:"),
  jensen("Moin.", "Привет."),
  {
    t: "pick",
    task: "Что значит это Moin после целой фразы?",
    options: [
      ok("Всё сказано — по-северному, как в первый день"),
      no("Йенсен опять потерял голос", "Голос на месте. Просто всё уже сказано."),
      no("Он прощается с клубом", "Moin — это и «привет», и «всё в порядке»."),
    ],
  },
  {
    t: "game",
    rule: ["reisen/perfekt-2"],
    task: "Соберите главную фразу Йенсена.",
    hint: "Время первым, глагол вторым, «wieder da» — в конце.",
    c: order(["Heute", "ist", "das", "Schild", "wieder", "da."], ["wieder", "Schild", "da.", "Heute", "das", "ist"]),
  },
  narr("Heute ist in Kiel niemand {fremd}: kein {deutsche}, kein {europaeer} aus Dänemark, kein Gast aus den USA."),
  narr("Lotte und zwanzig Kinder — её класс — касаются таблички. Потом команды. Без MOIN нет старта, а с MOIN — {start}!"),
  {
    t: "game",
    rule: ["reisen/perfekt-1", "reisen/check-2"],
    task: "Блокнот закрыт на фразы дня. Поверните диски.",
    hint: HINT_LOCK,
    c: lock([
      ["Табличка снова здесь: она вернулась.", [["Das Schild", "Der Schild", "Die Schild"], ["ist", "hat", "sind"], ["zurückgekommen.", "zurückgekommt.", "gezurückkommen."]]],
      ["Opa Hansen приехал на поезде.", [["Opa Hansen", "Opa Hansens", "Opa Hansen hat"], ["ist", "hat", "war"], ["mit dem Zug gekommen.", "mit dem Zug gekommt.", "mit der Zug gekommen."]]],
      ["Табличка осталась целой.", [["Das Schild", "Den Schild", "Dem Schild"], ["ist", "hat", "wird"], ["ganz geblieben.", "ganz gebleibt.", "ganz bleiben."]]],
    ]),
  },
  {
    t: "type",
    rule: ["reisen/perfekt-2"],
    task: "Запишите в блокнот главное: табличка вернулась.",
    answers: ["Das Schild ist zurückgekommen.", "Das Schild ist wieder da.", "Das Schild ist wieder hier."],
    ru: "Табличка вернулась.",
  },
  {
    t: "clue",
    title: "Hier.",
    text: "Elf Uhr: Das Schild steht wieder auf dem Aufsteller. Die Sonne scheint. Opa Hansen sieht sein Schild. Herr Jensen darf wieder sprechen: «Danke, Greta!» Dann: «Moin.»",
  },
];

// Сцена 6 · эпилог: праздник, торт MOIN, чайка (по её часам за всю игру), финальная доска улик и рассказ
// о деле по-немецки. Отсылки: «Птицы» — над клубом собираются чайки; «Касабланка» — последняя строка.
const party: SceneNode[] = [
  { t: "pic", src: "12-party.jpg", alt: "Праздник столетия клуба: на столе огромный торт с белыми буквами MOIN, Матео режет его, вся команда, Грета, Йенсен и Opa Hansen с бокалами, Лотта с биноклем; над клубом кружат десятки чаек, одна с кольцом ближе всех" },
  narr("Party am Club. Hundert Jahre! Mateo bringt den Kuchen: dunkelblau, а сверху белым — MOIN."),
  mateo("Mein Geheimnis! Ein Kuchen für hundert! Für hundert Jahre!", "Мой секрет! Торт на сто человек! На сто лет!"),
  petersen("Und wer hat die Teller mitgebracht? Elif! Sehr gut!", "А кто принёс тарелки? Элиф! Очень хорошо!"),
  {
    t: "hear",
    task: "Кто принёс тарелки?",
    voice: "Sandy",
    de: "Und wer hat die Teller mitgebracht? Elif! Sehr gut!",
    options: ["Элиф", "Хауке", "Матео"],
    answer: "Элиф",
  },
  mateo("Opa Hansen, mögen Sie Kuchen?", "Opa Hansen, вы любите торт?"),
  opa("Ich mag Kuchen! Und ich freue mich: Dieses Schild ist wieder da!", "Люблю! И я рад: эта табличка снова здесь!"),
  { t: "gap", rule: ["moin/moegen-1"], task: "Что ответил Opa Hansen про торт?", text: "Opa ___ Kuchen.", options: ["mag", "magt", "mögt"], answer: "mag", ru: "Opa любит торт." },
  {
    t: "game",
    task: "Финальная доска улик: соедините улику и то, что она значила.",
    hint: "Вспомните главы: кафе, лавка, часы, пляж, подвал, врач.",
    c: pairs([
      ["einen Tee, keinen Kaffee", "Herr Jensen war im Café."],
      ["ein Liter Farbe, dunkelblau", "Herr Jensen hat die Farbe gekauft."],
      ["um halb sechs", "Herr Jensen hat das Schild gegeben."],
      ["Farbe an den Händen", "Greta hat gemalt."],
      ["der Karton mit dem Umriss", "für das Schild, zurück zum Club"],
      ["Wir sind beim Arzt.", "Herr Jensen darf nicht sprechen."],
    ]),
  },
  narr("Die Kieler Woche ist {europaeisch} und {kulturell}: Musik, Essen, Tanz — und viele {auslaendisch} Boote."),
  elif("Komm, Opa! Hier ist ein Stuhl für dich!", "Иди сюда, Opa! Вот стул для тебя!"),
  { t: "gap", rule: ["moin/uns-1"], task: "Как Opa Hansen себя чувствует? Запишите.", text: "Opa freut ___.", options: ["sich", "mich", "ihn"], answer: "sich", ru: "Opa радуется." },
  {
    t: "when",
    if: [{ q: "gull", min: 6 }],
    then: [
      narr("Über dem Club: Möwen — zehn, zwanzig, dreißig. Und HEL 7305 landet auf dem Tisch: ein Stück Kuchen mit «O» — und weg!"),
      elif("Das ist kein Diebstahl. Das ist Natur!", "Это не кража. Это природа!"),
    ],
    else: [
      narr("Über dem Club: Möwen — zehn, zwanzig, dreißig. Aber HEL 7305 sitzt ganz ruhig auf dem Schild. Wie auf einem Foto."),
      elif("Seht ihr? Sie hat nichts gemacht. Eine gute Möwe!", "Видите? Она ничего не сделала. Хорошая чайка!"),
    ],
  },
  {
    t: "type",
    task: "Подпишите открытку к празднику: сколько лет клубу.",
    answers: ["Der Club ist hundert Jahre alt.", "Hundert Jahre!", "Der Club hat Geburtstag: hundert Jahre!"],
    ru: "Клубу сто лет.",
  },
  dana("Und jetzt erzähl! Die ganze Geschichte – auf Deutsch!", "А теперь рассказывай! Всю историю — по-немецки!"),
  {
    t: "game",
    task: "Расскажите дело по-немецки, как на экзамене: сначала сами, потом сверьтесь с образцом.",
    hint: HINT_ORAL,
    c: oral([
      oralSay(1, "Расскажите, что случилось с табличкой.", "Das Schild · Herr Jensen · Greta", "Herr Jensen hat Greta das Schild gegeben. Greta hat es neu gemalt. Heute ist es zurückgekommen.", "Йенсен отдал табличку Грете. Грета её перекрасила. Сегодня она вернулась."),
      oralSay(2, ASK, "Thema: Party · Wort: mitbringen", "Was soll ich zur Party mitbringen?", "Что мне принести на праздник?", "Was soll ich …?"),
      oralReply(2, ANSWER, "Wann bist du nach Kiel gekommen?", "Ich bin vor zwölf Tagen nach Kiel gekommen.", "Я приехал в Киль двенадцать дней назад."),
      oralSay(3, REQUEST, "🎂", "Ein Stück Kuchen, bitte!", "Кусочек торта, пожалуйста!"),
    ]),
  },
  narr("Elif schreibt noch eine Karte — на Гельголанд, орнитологам. Образец — их письмо."),
  narr("Nach Helgoland muss man nicht {abfliegen}: Die Fähre fährt. Und {zoll}? Den gibt es auf Helgoland auch!"),
  {
    t: "game",
    rule: ["reisen/haben-sein-1"],
    task: "Напишите за Элиф ответ на Гельголанд по образцу: письму орнитологов. Подписывается Элиф.",
    hint: HINT_LETTER,
    c: letter(
      "die Vogelwarte",
      ["Liebe Elif,", "unsere Möwe ist sieben Jahre alt.", "Sie hat schon drei Kinder gehabt.", "Viele Grüße", "die Vogelwarte"],
      [
        an("Liebe", "Vogelwarte"),
        ["Wohin? → die Möwe: mit dem Bus nach Gaarden fahren (Perfekt)", "Die Möwe ist mit dem Bus nach Gaarden gefahren.", "die Möwe ist mit dem Bus nach Gaarden gefahren."],
        ["Was? → sie: nichts machen (Perfekt)", "Sie hat nichts gemacht.", "sie hat nichts gemacht."],
        ["Heute → sie: im Club bleiben (Perfekt)", "Heute ist sie im Club geblieben.", "heute ist sie im Club geblieben.", "Sie ist heute im Club geblieben."],
        gruss("Elif"),
      ],
    ),
  },
  { t: "game", task: "Слова дня перемешались. Откройте пары: немецкое слово и перевод.", c: memory(["trockenraum", "foehn", "barometer", "start", "karton", "schild"]) },
  narr("Nils macht Fotos, Fotos, Fotos. Wie viele? Eine {milliarde}, sagt er."),
  { t: "game", task: "Лото на празднике: послушайте слово и закройте его на карточке.", hint: HINT_HEAR, c: bingo(["das Wetter", "der Regenschirm", "das Hotel", "die Reise", "der Koffer", "der Sommer", "der Herbst", "die Verspätung", "die Anreise"]) },
  { t: "game", task: `Последняя гонка: чайка тянет салфетку со словами дня! ${RACE}`, hint: HINT_RACE, outcome: RACE_STAKES, c: race(["das Wetter", "der Winter", "der Sommer", "die Reise", "das Hotel", "der Koffer", "sonnig", "bewölkt", "windig", "Es schneit.", "Es sind 20 Grad.", "die Ferien"]) },
  hauke("Zwölf Tage! Am ersten Tag hast du nur ein Wort gesprochen: Moin. Und heute?", "Двенадцать дней! В первый день ты сказал всего одно слово: Moin. А сегодня?"),
  {
    t: "reply",
    rule: ["reisen/perfekt-2"],
    task: "Ответьте Хауке: что вы делали эти двенадцать дней?",
    options: [
      ok("Ich habe viel Deutsch gelernt – und wir haben das Schild gefunden!"),
      no("Ich bin viel Deutsch gelernt – und wir haben das Schild gefunden!", "lernen — не движение: Perfekt с haben."),
      no("Ich habe viel Deutsch gelernt – und wir sind das Schild gefunden!", "finden — тоже с haben: wir haben … gefunden."),
    ],
  },
  {
    t: "pick",
    task: "Чем закончилось дело о пропавшем Moin?",
    options: [
      ok("Табличку не украли: её тайно обновили к столетию клуба, и она вернулась к старту"),
      no("Табличку украла чайка", "Чайка ничего не сделала. Табличку отдал Йенсен — Грете."),
      no("Табличку заменили новой", "Клуб отказал фирме. Это та самая табличка 1976 года."),
    ],
  },
  {
    t: "type",
    task: "Запишите в блокнот последнюю строку дела.",
    answers: ["Das Schild ist hier.", "Das Schild ist wieder hier.", "Das Schild ist wieder da."],
    ru: "Табличка здесь.",
  },
  narr("Abend. Die Möwen sind weg — nur eine nicht. Sie sitzt neben Ihnen am Wasser. Вы оба смотрите на табличку."),
  jensen("Moin.", "Привет."),
  narr("Вы закрываете блокнот: «Tag zwölf. Kieler Woche. Das Schild ist hier.» Это начало прекрасной дружбы — с немецким. И с чайкой."),
  {
    t: "clue",
    title: "Moin.",
    text: "Herr Jensen, Greta und das Schild: Greta hat es gemalt. Mateo: der Kuchen. Heute ist das Schild wieder da — zum Start, zum Geburtstag. Moin.",
  },
];

const play = (nodes: SceneNode[]) => ({ kind: "play" as const, nodes });

export const sceneChapter12: Episode = {
  id: "moin-neu-12",
  title: "Kieler Woche",
  day: { de: "Kieler Woche", ru: "день старта" },
  place: "Мастерская, отель у гавани и клуб · дождь, потом солнце",
  topic: "Поездки, погода, даты",
  grammar: "Perfekt с sein · haben или sein · погода с es · месяцы и даты: am zwanzigsten Juni",
  beats: [
    {
      id: "12-s1",
      title: "Es regnet",
      story: [],
      prompt: "Суббота, дождь, а краска ещё мокрая.",
      hint: "Heute regnet es. — es не пропадает.",
      success: "Табличке нужен «отель». Грета знает, какой.",
      challenge: play(regen),
    },
    {
      id: "12-s2",
      title: "Der Karton",
      story: [],
      prompt: "Табличка в коробке Йенсена, автобус опаздывает, чайки нет.",
      hint: "Wir sind angekommen. — движение: sein.",
      success: "Табличка доехала сухой. Отель у гавани.",
      challenge: play(weg),
    },
    {
      id: "12-s3",
      title: "Hotel am Hafen",
      story: [],
      prompt: "В отеле — сушильная и Opa Hansen, который хочет увидеть табличку.",
      hint: "Wie sind Sie gefahren? — fahren: sein.",
      success: "Opa ничего не видел, а табличка сохнет.",
      challenge: play(hotel),
    },
    {
      id: "12-s4",
      title: "Wie im Herbst",
      story: [],
      prompt: "Разбитый барометр и праздник «осенью».",
      hint: "im Herbst, am zwanzigsten Juni, um elf — im, am, um.",
      success: "Ложная тревога: старт в одиннадцать, как всегда.",
      challenge: play(herbst),
    },
    {
      id: "12-s5",
      title: "Hier.",
      story: [],
      prompt: "Старт: табличка возвращается, а Йенсен говорит целую фразу.",
      hint: "Das Schild ist zurückgekommen. — движение: sein.",
      success: "Ohne MOIN kein Start — и с MOIN: старт!",
      challenge: play(start),
    },
    {
      id: "12-s6",
      title: "Moin.",
      story: [],
      prompt: "Праздник столетия, торт MOIN и вся история по-немецки.",
      hint: "Ich habe Deutsch gelernt. Ich bin nach Kiel gekommen.",
      success: "Дело о пропавшем Moin закрыто. Moin.",
      challenge: play(party),
    },
  ],
};
