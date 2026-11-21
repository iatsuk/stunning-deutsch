import { an, ANSWER, ASK, bingo, docks, gaps, gruss, gull as race, HINT_DOCK, HINT_HEAR, HINT_LETTER, HINT_LOCK, HINT_ODD, HINT_ORAL, HINT_RACE, HINT_SAY, letter, lock, odd, oral, order, RACE, RACE_STAKES, reply as oralReply, REQUEST, say as oralSay, sort, speak, verdict } from "../build.ts";
import { phrases } from "../data.ts";
import type { Challenge, Episode, SceneNode } from "../types.ts";
import { back } from "./back.ts";

// Глава 11 в формате сцен (A1-PLOT.md, «Формат сцен»): работа и профессии, женские формы на -in,
// Perfekt с haben, war и hatte. Вопрос главы — что произошло за неделю. Вход — встреча в фирме Kiel-Schild
// в одиннадцать, выход — ложный след рушится (A1-PLOT.md, «Переработка глав 6–12»): у фирмы таблички
// нет и не было, Грета там не работала, в конверте Йенсена — письмо «Kommen Sie am Freitag». Грета
// отвечает одним словом «Samstag», а вечером празднует с Дерьей: «Fertig!». Правду раскрывает глава 12.
// Повороты брошены оракулом (seeds 1794687274 и 1795220690), увязка — в журнале A1-STORYCRAFT.md.

const narr = (text: string): SceneNode => ({ t: "narr", text });
const learn = (words?: string[]) => (words ? { learn: words } : {});
const hauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Hauke", voice: "Rocko", de, ru, ...learn(words) });
const elif = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Elif", voice: "Flo", de, ru, ...learn(words) });
const dana = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Dana", voice: "Anna", de, ru, ...learn(words) });
const mateo = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Mateo", voice: "Reed", de, ru, ...learn(words) });
const frauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frauke", voice: "Sandy", de, ru, ...learn(words) });
const petersen = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frau Petersen", voice: "Sandy", de, ru, ...learn(words) });
const radio = (de: string, ru: string): SceneNode => ({ t: "say", who: "Radio", voice: "Eddy", de, ru });
const claasen = (de: string, ru: string): SceneNode => ({ t: "say", who: "Frau Claasen", voice: "Shelley", de, ru });
const derya = (de: string, ru: string): SceneNode => ({ t: "say", who: "Derya", voice: "Shelley", de, ru });
/** Пары памяти — из выражений истории, которые глава уже показала. */
const memory = (ids: string[]): Challenge => ({ kind: "memory", pairs: ids.map((id) => ({ id, de: phrases[id].de, ru: phrases[id].ru })) });
const ok = (text: string) => ({ text, ok: true as const });
const no = (text: string, react: string) => ({ text, react });

const RADIO = "Der Wetterbericht für Kiel: Heute Sonne, morgen Wolken. Und am Samstag – Regen, den ganzen Tag.";
const PETERSEN = "Die Firma wollte uns schon im Mai ein Schild aus Plastik geben. Ich habe nein gesagt! Aber ohne Schild kein Start. Morgen bestelle ich!";
const CLAASEN_NIE = "Ihr Schild? Das haben wir nie gehabt! Wir machen Schilder aus Plastik. Alte Schilder nehmen wir nicht.";
const CLAASEN_GEMACHT = "Wir haben ein Schild aus Plastik gemacht. Frau Petersen hat am Telefon «Vielleicht» gesagt. Dann haben wir gewartet.";
const CLAASEN_GRETA = "Greta Hansen? Sie hat nie bei uns gearbeitet. Sie ist Mechaniker … nein:";
const HAUKE_FALSCH = "Die Firma hat das Schild nicht. Greta arbeitet nicht bei der Firma. Und wir haben alles falsch verstanden!";
const DANA_SAMSTAG = "Morgen bestellt Frau Petersen das Schild aus Plastik. Unser Plan: Samstag um sieben zu Greta!";
const ELIF_OPA = "Und Opa Hansen? Frau Petersen sagt: Er hat 1976 unser Schild gemacht. Er kommt am Samstag!";
const DERYA_FERTIG = "Fertig? Wirklich fertig? Super, Greta! Ein Döner für dich – gratis!";
const MATEO = "Vor drei Jahren hatte ich hier mein Vorstellungsgespräch. Herr Jensen hat nur Moin gesagt – und ich hatte die Stelle!";
const PLAN = "Also: Samstag um acht am Club. Hauke soll die Tische tragen. Elif soll die Möwe beobachten. Und alle sollen pünktlich sein!";

// Сцена 1 · пролог: четверг, Хауке выздоровел и ищет подработку. Бросок: смена точки зрения · Хауке ·
// неверно перевести · die Stelle · 2 (почти ничего) — Хауке читает «Stelle frei» как «свободное место»
// на скамейке. Бросок: смена точки зрения · Хауке · починить · der Student · 3 (мелочь) — Хауке,
// студент, чинит бабушкин велосипед. Прогноз: в субботу дождь — часы погоды.
const donnerstag: SceneNode[] = [
  { t: "pic", src: "11-donnerstag.jpg", alt: "Утро четверга у клуба, солнце: выздоровевший Хауке чинит цепь бабушкиного красного велосипеда, рядом газета с объявлениями; Элиф с конвертом, Дана с кофе; на подоконнике радио" },
  narr("Tag elf, Donnerstag, noch zwei Tage. Hauke ist wieder gesund. Er sitzt vor dem Club — и чинит бабушкин велосипед."),
  hauke("Ich bin wieder gesund! Gestern habe ich nur geschlafen und Suppe gegessen.", "Я снова здоров! Вчера я только спал и ел суп.", ["gestern", "gesund"]),
  {
    t: "hear",
    task: "Что Хауке делал вчера?",
    voice: "Rocko",
    de: "Ich bin wieder gesund! Gestern habe ich nur geschlafen und Suppe gegessen.",
    options: ["спал и ел суп", "работал в клубе", "ездил в Гаарден"],
    answer: "спал и ел суп",
  },
  {
    t: "game",
    rule: ["arbeit/perfekt-3"],
    task: "Соберите, что сказал Хауке: время — первым.",
    hint: "Время на первом месте, haben — вторым, причастие — в конце.",
    c: order(["Gestern", "habe", "ich", "geschlafen."], ["geschlafen.", "ich", "Gestern", "habe"]),
  },
  {
    t: "reply",
    rule: ["arbeit/check-2"],
    task: "Хауке спрашивает вас: «Und du? Was hast du gestern gemacht?» Ответьте.",
    options: [
      ok("Ich habe Deutsch gelernt."),
      no("Ich habe Deutsch gelernen.", "Причастие слабого глагола: ge- + lern + -t = gelernt."),
      no("Ich habe gelernt Deutsch.", "Причастие — в самом конце: Ich habe Deutsch gelernt."),
    ],
  },
  hauke("Ich bin Student. Und am Wochenende suche ich Arbeit. Hier: Stelle frei! Ein freier Platz?", "Я студент. А на выходные ищу работу. Вот: «Stelle frei»! Свободное место?", ["der Student", "die Stelle"]),
  {
    t: "pick",
    task: "Что на самом деле значит «Stelle frei»?",
    options: [
      ok("Есть свободная работа, вакансия"),
      no("Свободное место на скамейке", "Так понял Хауке. Но в газете это вакансия: die Stelle — место работы."),
      no("Свободный столик в кафе", "Это было бы «Tisch frei». А тут — работа."),
    ],
  },
  hauke("Ich bin nicht arbeitslos – ich bin Student! Aber ohne Arbeit kein Geld.", "Я не безработный — я студент! Но без работы нет денег."),
  { t: "gap", rule: ["moin/un-los-1"], task: "Как одним словом сказать «без работы»?", text: "Hauke ist nicht arbeits___.", options: ["los", "bar", "un"], answer: "los", ru: "Хауке не безработный." },
  narr("Hauke sucht {job}: kein {praktikum}, kein {studium}. Er will Geld {verdienen}."),
  narr("In der Zeitung: Anzeigen. Хауке читает вслух, Элиф — через плечо."),
  {
    t: "game",
    task: "Подберите каждому вакансию из газеты. Кому ничего не подходит — так и отметьте.",
    hint: "Читайте, как на экзамене: дни, время, место.",
    c: {
      kind: "ads",
      people: [
        { id: "hauke", text: "Hauke ist Student. Er hat nur am Wochenende Zeit und segelt gern." },
        { id: "elif", text: "Elif sucht eine Stelle am Meer — mit Möwen." },
        { id: "dana", text: "Dana ist Ärztin. Sie hat schon eine Stelle im Krankenhaus." },
      ],
      ads: [
        { id: "A", title: "Segellehrer gesucht", text: "Samstag und Sonntag, für Kinder. Club Kiellinie." },
        { id: "B", title: "Vogelwarte Helgoland", text: "Wir suchen eine Biologin. Ab Juli." },
        { id: "C", title: "Verkäuferin gesucht", text: "Bootsladen Kruse, Montag bis Freitag." },
      ],
      answer: { hauke: "A", elif: "B", dana: "0" },
    },
  },
  elif("Helgoland! Da ist der Ring von unserer Möwe! Ich schreibe heute noch!", "Хельголанд! Там кольцо нашей чайки! Напишу сегодня же!"),
  {
    t: "game",
    task: "В объявлениях длинные слова. Соберите каждое из частей и выберите род.",
    hint: "Род — по последней части: das Gespräch → das Vorstellungsgespräch.",
    c: {
      kind: "compound",
      rounds: [
        { word: "das Vorstellungsgespräch", parts: ["Vorstellungs", "Gespräch"], ru: "собеседование" },
        { word: "der Krankenpfleger", parts: ["Kranken", "Pfleger"], ru: "медбрат" },
        { word: "der Hausmann", parts: ["Haus", "Mann"], ru: "домохозяин" },
      ],
      extra: ["Arbeit", "Stelle", "Firma"],
    },
  },
  elif("Vorstellungsgespräch! Das Wort ist so lang wie ein Boot!", "Vorstellungsgespräch! Это слово длинное, как лодка!"),
  narr("Auf dem Fenster: das Radio von Derya. {wetterbericht}."),
  { ...radio(RADIO, "Прогноз погоды для Киля: сегодня солнце, завтра облака. А в субботу — дождь, весь день."), set: { weather: 1 } },
  {
    t: "hear",
    task: "Какая погода будет в субботу?",
    voice: "Eddy",
    de: RADIO,
    options: ["дождь весь день", "солнце", "облака и ветер"],
    answer: "дождь весь день",
  },
  dana("Samstag Regen? Und der Start? Und das Schild?", "В субботу дождь? А старт? А табличка?"),
  {
    t: "type",
    rule: ["arbeit/perfekt-2"],
    task: "Запишите в блокнот, что вы делали вчера в доме врачей: «Мы ждали Йенсена».",
    answers: ["Wir haben auf Herrn Jensen gewartet.", "Gestern haben wir auf Herrn Jensen gewartet."],
    ru: "Мы ждали господина Йенсена.",
  },
  {
    t: "game",
    rule: ["wohnen/komposita-1"],
    task: "Длинные слова из доски объявлений: отсеките последний корень и выберите род.",
    c: {
      kind: "tail",
      rounds: [
        { word: "das Vorstellungsgespräch", parts: ["Vorstellungs", "Gespräch"], ru: "собеседование" },
        { word: "der Krankenpfleger", parts: ["Kranken", "Pfleger"], ru: "медбрат" },
        { word: "der Hausmann", parts: ["Haus", "Mann"], ru: "домохозяин" },
        { word: "das Krankenhaus", parts: ["Kranken", "Haus"], ru: "больница" },
      ],
    },
  },
  narr("Der {arbeitsplatz} von Mateo ist die Küche. Und Hauke? Er will {selbststaendig} sein — ohne {chef}."),
  {
    t: "game",
    task: "Профессии дня — по ящикам Йенсена: der, die, das.",
    hint: HINT_DOCK,
    c: docks(["der Lehrer", "die Ärztin", "der Koch", "die Köchin", "der Student", "die Kellnerin", "der Mechaniker", "die Verkäuferin", "die Lehrerin", "der Ingenieur", "der Friseur", "der Informatiker", "der Krankenpfleger"]),
  },
  { t: "gap", task: "Что обещает прогноз на субботу?", text: "Am Samstag ___ es.", options: ["regnet", "regnen", "geregnet"], answer: "regnet", ru: "В субботу дождь." },
  {
    t: "clue",
    title: "Donnerstag",
    text: "Hauke ist gesund und sucht eine Stelle am Wochenende. Elif: Helgoland! Der Wetterbericht: am Samstag — es regnet. Um elf: Firma Kiel-Schild, Frau Claasen.",
  },
];

// Интерлюдия глазами Йенсена (по плану интерлюдий): молчаливое утро и мысль о клубе пятьдесят лет
// назад. Юноша в фуражке на краю фото 1976 года — это он. Факт без вывода.
const jensen: SceneNode[] = [
  { t: "pic", src: "11-jensen.jpg", alt: "Утро в квартире Йенсена: он в шарфе сидит у окна с кружкой чая и держит целое фото 1976 года; на краю фото молодой человек в капитанской фуражке держит банку краски" },
  narr("Тем временем, 9:00. Herr Jensen sitzt am Fenster. Tee, {schal} — und kein Wort. Er darf ja nicht sprechen."),
  narr("Aus dem Schrank holt er ein Foto. 1976. Opa Hansen mit dem Pinsel, Oma mit dem Kuchen, der kleine Peter — und ein junger Mann."),
  narr("Der junge Mann hat {muetze} — dunkelblau, wie heute. Und eine Dose Farbe in der Hand."),
  {
    t: "pick",
    task: "Кто этот юноша на фото?",
    options: [
      ok("Сам Йенсен: та же фуражка, пятьдесят лет назад"),
      no("Матео", "В 1976 году Матео ещё не родился."),
      no("Петер, отец Нильса", "Петер на фото — мальчик восьми лет."),
    ],
  },
  narr("Herr Jensen schreibt in den {notizblock}: «1976. Opa Hansen hat gemalt. Ich hatte die Farbe. Ich war zwanzig.»"),
  {
    t: "gap",
    rule: ["arbeit/war-hatte-1"],
    task: "Что написал Йенсен о себе?",
    text: "Ich ___ zwanzig.",
    options: ["war", "hatte", "bin"],
    answer: "war",
    ru: "Мне было двадцать.",
  },
  narr("Er trinkt den Tee. Dann schreibt er noch ein Wort — и улыбается: «Moin.»"),
  {
    t: "type",
    rule: ["arbeit/war-hatte-2"],
    task: "Запишите за Йенсена: «У меня была краска».",
    answers: ["Ich hatte die Farbe.", "Ich hatte die Dose.", "Ich hatte die Farbe in der Hand."],
    ru: "У меня была краска.",
  },
];

// Сцена 2 · развитие: очная ставка в фирме Kiel-Schild в одиннадцать (A1-PLOT.md, «Переработка глав
// 6–12»). Фрау Claasen отвечает в Perfekt: старой таблички у фирмы не было, Грета там не работала, а в
// конверте Йенсена — письмо. Ложный след рушится. Бросок: подарок игроку · Грета · перепутать ·
// der Beruf · 3 (мелочь) — фрау Claasen говорит о Грете «Mechaniker» и поправляется: «Mechanikerin».
const werkstatt: SceneNode[] = [
  { t: "pic", src: "11-firma.jpg", alt: "Контора фирмы Kiel-Schild в Гаардене: на стенах белые пластиковые таблички с печатными буквами; фрау Claasen в тёмно-синем плаще за столом показывает письмо; Элиф, Дана и Хауке стоят у стола, Хауке держит пластиковую табличку MOIN" },
  narr("11:00, Gaarden, Am Markt 3. Firma Kiel-Schild: an der Wand — Schilder aus Plastik, weiß, ohne Seil. Am Tisch — Frau Claasen."),
  narr("На столе — {bleistift}, линейка и {teil} пластиковой таблички — рамка. Каждый {zentimeter} здесь мерит машина."),
  narr("Где у фирмы {fehler}? Нигде: машина не ошибается. Ошибаются люди."),
  narr("Пластиковую табличку может {benutzen} любой клуб: та же рамка, другие буквы."),
  {
    t: "look",
    task: "Осмотритесь в конторе фирмы.",
    items: [
      { icon: "🪧", de: "das Schild", ru: "табличка", note: "Белые таблички из пластика: печатные буквы, гладкие края. Каната нет ни на одной.", key: true },
      { icon: "✉️", de: "der Umschlag", ru: "конверт", note: "На столе фрау Claasen — плоский конверт. Тот самый, из-под дождя.", key: true },
      { icon: "💡", de: "die Lampe", ru: "лампа", note: "Белый свет, как в больнице. Краской здесь не пахнет." },
    ],
  },
  claasen(CLAASEN_NIE, "Ваша табличка? Её у нас никогда не было! Мы делаем таблички из пластика. Старые мы не берём."),
  {
    t: "hear",
    task: "Что говорит фрау Claasen о старой табличке?",
    voice: "Shelley",
    de: CLAASEN_NIE,
    options: ["у фирмы её никогда не было", "она сохнет в конторе", "её забрала Грета"],
    answer: "у фирмы её никогда не было",
  },
  dana("Frau Claasen, was haben Sie für den Club gemacht?", "Фрау Claasen, что вы сделали для клуба?"),
  claasen(CLAASEN_GEMACHT, "Мы сделали табличку из пластика. Фрау Петерсен по телефону сказала «может быть». А потом мы ждали."),
  {
    t: "game",
    rule: ["arbeit/perfekt-4"],
    task: "Запишите ответ фрау Claasen в блокнот. Вставьте причастия.",
    hint: "Слабые глаголы: ge- + основа + -t; после -t — -et: gewartet.",
    c: gaps("Wir haben ein Schild aus Plastik ___. Frau Petersen hat «Vielleicht» ___. Dann haben wir ___.", ["gemacht", "gesagt", "gewartet", "gemachen", "gesagen"], ["gemacht", "gesagt", "gewartet"]),
  },
  hauke("Und das Schild von Nils? Das ist von Ihnen?", "А табличка Нильса? Это ваша?"),
  claasen("Das ist mein Muster für Frau Petersen. Danke – ich habe es schon gesucht!", "Это мой образец для фрау Петерсен. Спасибо — я его уже искала!"),
  narr("Хауке отдаёт пластиковую MOIN. Фрау Claasen открывает {umschlag}."),
  narr("Внутри — письмо. Почерк как в {logbuch}: «Bitte kommen Sie nicht am Montag. Kommen Sie am Freitag, am Mittag. Jensen.»"),
  {
    t: "gap",
    rule: ["tagesablauf/wann-1"],
    task: "Когда Йенсен просил фирму прийти?",
    text: "Kommen Sie am Freitag, am ___.",
    options: ["Mittag", "Morgen", "Abend"],
    answer: "Mittag",
    ru: "Приходите в пятницу, в полдень.",
  },
  claasen(CLAASEN_GRETA, "Грета Хансен? Она у нас никогда не работала. Она механик… нет:"),
  {
    t: "reply",
    rule: ["arbeit/maennlich-weiblich-1"],
    task: "Подскажите фрау Claasen, как правильно о Грете.",
    options: [
      ok("Sie ist Mechanikerin!"),
      no("Sie ist Mechanikerinnen!", "-innen — множественное число. Грета одна: Mechanikerin."),
      no("Sie ist Mechanikerin-in!", "Окончание одно: Mechaniker + in."),
    ],
  },
  {
    t: "game",
    rule: ["arbeit/perfekt-2"],
    task: "Сдвиньте слова так, чтобы глагольная рамка и порядок Perfekt сошлись.",
    c: {
      kind: "spring",
      rounds: [
        {
          ru: "Грета работала в мастерской.",
          base: ["Greta", "arbeitet", "in der Werkstatt", "."],
          trigger: "hat ... gearbeitet",
          start: ["Greta", "hat", "gearbeitet", "in der Werkstatt", "."],
          answer: ["Greta", "hat", "in der Werkstatt", "gearbeitet", "."],
          why: "Вспомогательный глагол hat остаётся на втором месте, а Partizip II (gearbeitet) уходит в конец.",
        },
        {
          ru: "В субботу господин Йенсен дал мне конверт.",
          base: ["Herr Jensen", "hat", "mir", "den Umschlag", "gegeben", "."],
          trigger: "Am Samstag",
          start: ["Am Samstag", "Herr Jensen", "hat", "mir", "den Umschlag", "gegeben", "."],
          answer: ["Am Samstag", "hat", "Herr Jensen", "mir", "den Umschlag", "gegeben", "."],
          why: "После Am Samstag на втором месте остаётся hat, а подлежащее Herr Jensen сдвигается за глагол.",
        },
        {
          ru: "В понедельник я прочитала письмо.",
          base: ["Ich", "habe", "den Brief", "gelesen", "."],
          trigger: "Am Montag",
          start: ["Am Montag", "ich", "habe", "den Brief", "gelesen", "."],
          answer: ["Am Montag", "habe", "ich", "den Brief", "gelesen", "."],
          why: "Когда Am Montag занимает первое место, на втором месте сразу идёт habe, а ich встаёт после него.",
        },
      ],
    },
  },
  hauke(HAUKE_FALSCH, "У фирмы нет таблички. Грета не работает в фирме. А мы всё поняли неправильно!"),
  {
    t: "hear",
    task: "Что понял Хауке?",
    voice: "Rocko",
    de: HAUKE_FALSCH,
    options: ["у фирмы таблички нет, а Грета там не работает", "табличку унесли ночью", "табличку украла чайка"],
    answer: "у фирмы таблички нет, а Грета там не работает",
  },
  {
    t: "game",
    rule: ["arbeit/perfekt-2"],
    task: "Разложите события по времени: когда это было?",
    hint: "letzte Woche — до понедельника; diese Woche — с понедельника; gestern — вчера, в среду.",
    c: sort([["woche", "letzte Woche"], ["diese", "diese Woche"], ["gestern", "gestern"]], [
      ["kiosk", "Frau Claasen hat Frauke ein Schild gezeigt.", "woche", "🪧"],
      ["brief", "Herr Jensen hat den Umschlag trocken gehalten.", "woche", "✉️"],
      ["telefon", "Frau Petersen hat mit der Firma telefoniert.", "diese", "📞"],
      ["taxi", "Nils ist mit dem Taxi gekommen.", "diese", "🚕"],
      ["arzt", "Herr Jensen hat den Arzt besucht.", "gestern", "🩺"],
      ["karte", "Frauke hat die Versichertenkarte gebracht.", "gestern", "💳"],
    ]),
  },
  {
    t: "pick",
    task: "Почему у фирмы нашей таблички нет?",
    options: [
      ok("Фирма делает новые таблички из пластика, а Йенсен попросил её подождать до пятницы"),
      no("Фирма уже продала её", "«Das haben wir nie gehabt!» — старых табличек фирма не берёт."),
      no("Её унесла чайка", "Чайка ничего не сделала. А фирма старых табличек не берёт."),
    ],
  },
  dana("Greta hat Herrn Jensen nicht entführt. Sie hat ihn zum Arzt gebracht!", "Грета не похищала Йенсена. Она отвела его к врачу!"),
  {
    t: "type",
    rule: ["arbeit/perfekt-2"],
    task: "Запишите главное в блокнот: таблички у фирмы никогда не было.",
    answers: ["Die Firma hat das Schild nie gehabt.", "Die Firma hat unser Schild nie gehabt.", "Die Firma hat das Schild nicht gehabt."],
    ru: "У фирмы таблички никогда не было.",
  },
  {
    t: "game",
    task: "Элиф проверяет слова дня: одно слово в группе лишнее.",
    hint: HINT_ODD,
    c: odd([
      [["der Lehrer", "der Koch", "der Kellner", "die Firma"], "die Firma", "Firma — фирма, остальные — профессии."],
      [["gestern", "früher", "letzte Woche", "die Stelle"], "die Stelle", "Stelle — место работы, остальное — когда."],
      [["die Ärztin", "die Köchin", "die Kellnerin", "der Student"], "der Student", "Student — мужчина, остальные — женщины на -in."],
    ]),
  },
  {
    t: "game",
    rule: ["arbeit/perfekt-2"],
    task: "Протокол очной ставки: сведите показания фрау Claasen и письмо Йенсена.",
    hint: "Сверьте каждую строку протокола с показаниями: что сказала фрау Claasen и что в письме.",
    c: {
      kind: "protocol",
      title: "Protokoll · Firma Kiel-Schild",
      clues: [
        { who: "Frau Claasen", de: "Ihr Schild? Das haben wir nie gehabt!", ru: "Ваша табличка? Её у нас никогда не было!" },
        { who: "Frau Claasen", de: "Wir haben ein Schild aus Plastik gemacht – für Frau Petersen.", ru: "Мы сделали табличку из пластика — для фрау Петерсен." },
        { who: "Brief von Herrn Jensen", de: "Bitte kommen Sie nicht am Montag. Kommen Sie am Freitag, am Mittag.", ru: "Пожалуйста, не приходите в понедельник. Приходите в пятницу, в полдень." },
        { who: "Frau Claasen", de: "Greta hat nie bei uns gearbeitet.", ru: "Грета у нас никогда не работала." },
      ],
      parts: [
        "Die Firma hat unser Schild ",
        { slot: "schild", label: "табличка" },
        ". Sie hat ",
        { slot: "plastik", label: "что сделала" },
        ". Herr Jensen hat ",
        { slot: "brief", label: "что дал" },
        " gegeben: Die Firma soll am ",
        { slot: "tag", label: "когда" },
        " kommen. Greta hat ",
        { slot: "greta", label: "Грета" },
        " bei der Firma gearbeitet.",
      ],
      bank: ["nie gehabt", "ein Schild aus Plastik gemacht", "einen Brief", "Freitag", "nie", "genommen", "das Schild", "Montag", "oft"],
      answer: { schild: "nie gehabt", plastik: "ein Schild aus Plastik gemacht", brief: "einen Brief", tag: "Freitag", greta: "nie" },
    },
  },
  {
    t: "clue",
    title: "Kiel-Schild",
    text: "Firma Kiel-Schild, Am Markt 3: Frau Claasen hat unser Schild nicht. Sie hat ein Schild aus Plastik gemacht — für Frau Petersen. Greta hat nie bei der Firma gearbeitet, sie ist Mechanikerin. Der Brief von Herrn Jensen: «Bitte kommen Sie nicht am Montag. Kommen Sie am Freitag, am Mittag.»",
  },
];

// Сцена 3 · развитие: зачем Йенсен написал письмо — свидетели в своём порядке. Бросок: событие за
// кадром · Петерсен · отказаться · die Firma · 20 (гипербола: в деле весь клуб) — ещё в мае Петерсен
// отказала фирме, но без таблички нет старта, и завтра она закажет пластик. Бросок: смена точки
// зрения · Дана · подарить · der Mechaniker · 3 (мелочь) — Дана дарит Грете пластырь для спины.
// Грета, как Йенсен, отвечает одним словом: «Samstag».
const warum: SceneNode[] = [
  { t: "pic", src: "11-warum.jpg", alt: "Клуб днём: Йенсен с кружкой чая пишет в блокноте, Дана протягивает Грете в комбинезоне маленький пакет; Элиф держит телефон на громкой связи" },
  narr("Zurück im Club. Теперь главный вопрос: зачем письмо? Herr Jensen ist da, Greta bringt ihm Tee. Und Frau Petersen ist am Telefon."),
  {
    t: "go",
    task: "Кого спросить, зачем было письмо?",
    next: "Дальше по делу",
    branches: [
      {
        label: "Фрау Петерсен по телефону",
        icon: "📞",
        nodes: [
          petersen(PETERSEN, "Фирма ещё в мае хотела дать нам табличку из пластика. Я сказала «нет»! Но без таблички нет старта. Завтра я заказываю!"),
          {
            t: "hear",
            task: "Что сделает фрау Петерсен завтра?",
            voice: "Sandy",
            de: PETERSEN,
            options: ["закажет табличку из пластика", "отменит праздник", "поедет в Гамбург"],
            answer: "закажет табличку из пластика",
          },
          petersen("Hundert Mitglieder – und kein Schild! Das geht nicht!", "Сто членов клуба — и никакой таблички! Так нельзя!"),
          {
            t: "type",
            rule: ["arbeit/perfekt-2"],
            task: "Запишите, что фрау Петерсен ответила фирме в мае.",
            answers: ["Sie hat nein gesagt.", "Frau Petersen hat nein gesagt.", "Frau Petersen hat im Mai nein gesagt."],
            ru: "Она сказала «нет».",
          },
        ],
      },
      {
        label: "Записки Йенсена",
        icon: "📝",
        nodes: [
          narr("Herr Jensen schreibt nur ein Wort: «Freitag.» Und trinkt den Tee von Greta."),
          narr("Ниже — ещё строчка: «Samstag: der Karton aus dem Keller. Sie haben den Schlüssel.»"),
          {
            t: "reply",
            rule: ["arbeit/war-hatte-2"],
            task: "Спросите Йенсена, был ли он в субботу с фрау Claasen у автобуса.",
            options: [
              ok("Waren Sie am Samstag mit Frau Claasen am Bus?"),
              no("Hatten Sie am Samstag mit Frau Claasen am Bus?", "«Были» — war, а не hatte: Waren Sie …?"),
              no("Sind Sie am Samstag mit Frau Claasen am Bus?", "Это прошлое: Waren Sie …?"),
            ],
          },
          narr("Он кивает и пишет: «Ja. Es regnet.» {geheimnis} у Йенсена больше, чем слов."),
          hauke("Sie waren nass – und der Umschlag war trocken!", "Вы промокли — а конверт был сухим!"),
        ],
      },
      {
        label: "Грета",
        icon: "🖌️",
        nodes: [
          hauke("Greta, wo ist unser Schild?", "Грета, где наша табличка?"),
          narr("Greta schreibt ein Wort — как Йенсен: «Samstag.» И улыбается."),
          {
            t: "pick",
            task: "Что ответила Грета?",
            options: [
              ok("Одно слово: «Samstag» — в субботу"),
              no("Что табличка у фирмы", "Фирма сегодня сказала: таблички у неё нет и не было."),
              no("Что она не знает", "Она знает — и улыбается."),
            ],
          },
          {
            t: "type",
            rule: ["arbeit/perfekt-4"],
            task: "Запишите в блокнот: Грета сказала «Samstag».",
            answers: ["Greta hat Samstag gesagt.", "Greta hat «Samstag» gesagt.", "Sie hat Samstag gesagt."],
            ru: "Грета сказала: «Суббота».",
          },
        ],
      },
      {
        label: "Подарок Даны",
        icon: "🎁",
        optional: true,
        nodes: [
          dana("Ihr Rücken tut weh? Kein Wunder: zehn Tage Arbeit!", "Спина болит? Неудивительно: десять дней работы!"),
          dana("Für den Rücken, Greta. Von einer Ärztin für eine Mechanikerin!", "Для спины, Грета. От врача — механику!"),
          {
            t: "gap",
            rule: ["arbeit/maennlich-weiblich-1"],
            task: "Как Дана называет себя?",
            text: "Von einer ___ für eine Mechanikerin!",
            options: ["Ärztin", "Arzt", "Ärztinnen"],
            answer: "Ärztin",
            ru: "От врача — механику!",
          },
          narr("Greta schreibt: «Danke!» — и впервые смеётся вслух. Голоса у неё, оказывается, хватает."),
        ],
      },
    ],
  },
  narr("Фрауке говорила: «Greta arbeitet bei der Firma!» А что сказала фрау Claasen?"),
  {
    t: "game",
    task: "Сравните слух Фрауке и слова фрау Claasen. Отметьте два слова, которые не сходятся.",
    hint: "Работает ли Грета в фирме — по слуху и по словам фрау Claasen?",
    c: {
      kind: "contra",
      texts: [
        { who: "Frauke, Sonntag", lines: [["Greta", "arbeitet", "bei", "der", "Firma!"]] },
        { who: "Frau Claasen", lines: [["Greta", "hat", "nie", "bei", "uns", "gearbeitet."]] },
      ],
      answer: ["0:0:1", "1:0:2"],
    },
  },
  narr("А {aussage} Фрауке — просто слух: из «einer Firma für Boote» вышло «der Firma»."),
  { t: "gap", rule: ["arbeit/perfekt-5"], task: "Что Йенсен отдал фирме на самом деле?", text: "Herr Jensen hat Frau Claasen einen Brief ___.", options: ["gegeben", "gegebt", "geben"], answer: "gegeben", ru: "Господин Йенсен отдал фрау Claasen письмо." },
  {
    t: "game",
    rule: ["arbeit/perfekt-2", "familie/mein-2"],
    task: "Запишите рассказ фрау Claasen в блокнот от третьего лица.",
    c: {
      kind: "retell",
      who: "Frau Claasen",
      voice: "Shelley",
      quote: "Ich habe den Brief gelesen. Mein Chef hat gewartet, und ich habe nichts gemacht.",
      ru: "Я прочитала письмо. Мой начальник подождал, а я ничего не сделала.",
      tokens: [
        { id: "s1", from: "Ich", options: ["Sie", "Er", "Ich"], answer: "Sie" },
        " ",
        { id: "v1", from: "habe", options: ["hat", "habe", "habt"], answer: "hat" },
        " den Brief gelesen. ",
        { id: "p1", from: "Mein", options: ["Ihr", "Sein", "Mein"], answer: "Ihr" },
        " Chef hat gewartet, und ",
        { id: "s2", from: "ich", options: ["sie", "er", "wir"], answer: "sie" },
        " ",
        { id: "v2", from: "habe", options: ["hat", "habe", "ist"], answer: "hat" },
        " nichts gemacht.",
      ],
    },
  },
  {
    t: "game",
    task: "Что теперь известно? Проверьте блокнот.",
    c: verdict(["Richtig", "Falsch"], [
      ["Фирма взяла нашу табличку", false, "«Das haben wir nie gehabt!» — у фирмы только пластик."],
      ["Йенсен попросил фирму прийти в пятницу", true, "«Kommen Sie am Freitag, am Mittag.»"],
      ["Грета работает в фирме", false, "«Greta hat nie bei uns gearbeitet.»"],
    ]),
  },
  {
    t: "game",
    rule: ["arbeit/perfekt-3"],
    task: "Соберите вывод для блокнота: время — на первом месте.",
    hint: "Глагол haben — второй, причастие gegeben — в конце.",
    c: order(["Am", "Samstag", "hat", "Herr", "Jensen", "den", "Brief", "gegeben."], ["gegeben.", "Brief", "hat", "Am", "den", "Jensen", "Samstag", "Herr"]),
  },
  {
    t: "clue",
    title: "Freitag, Samstag",
    text: "Frau Petersen: im Mai nein — morgen bestellt sie das Schild aus Plastik. Herr Jensen: «Freitag.» Greta: «Samstag.» Frauke: «Greta arbeitet bei der Firma» — falsch.",
  },
];

// Сцена 4 · поворот: все за одним столом (отсылка к Агате Кристи). Бросок: смена точки зрения · Матео ·
// отпраздновать · das Vorstellungsgespräch · 6 — Матео празднует три года со своего собеседования, на
// котором Йенсен сказал только «Moin», и признаётся в торте. Бросок плана (3 ноября): Хауке ·
// отказаться · der Koch · 5 — «Ich bin kein Koch!»: повар уже есть, тайна Матео раскрывается сама.
const tisch: SceneNode[] = [
  { t: "pic", src: "11-tisch.jpg", alt: "Вечер в клубе, все за одним длинным столом: Петерсен, Фрауке, Хауке, Элиф, Дана, Грета и Йенсен с блоком; Матео стоит с огромным круглым тортом с белыми буквами MOIN; чайка на спинке стула" },
  narr("Abend im Club. Alle sitzen an einem Tisch: Frau Petersen, Frauke, Nils, Hauke, Elif, Dana — Greta und Herr Jensen. Как в детективе."),
  narr("Lotte macht {hausaufgabe} am Tisch: {aufgabe} drei, {loesung} mit Bleistift."),
  {
    t: "look",
    task: "Осмотрите стол.",
    items: [
      { icon: "🎂", de: "der Kuchen", ru: "пирог, торт", note: "У Матео за спиной — что-то большое и круглое под полотенцем.", key: true },
      { icon: "🧢", de: "die Mütze", ru: "фуражка", note: "Фуражка Йенсена лежит на столе. Старая, как клуб.", key: true },
      { icon: "☕", de: "die Tasse", ru: "чашка, кружка", note: "Чай Йенсена. По рецепту." },
    ],
  },
  petersen("Samstag ist die Party. Wer kocht? Hauke?", "В субботу праздник. Кто готовит? Хауке?"),
  hauke("Ich? Ich bin kein Koch! Ich bin Student!", "Я? Я не повар! Я студент!", ["der Koch"]),
  { t: "gap", rule: ["arbeit/maennlich-weiblich-1"], task: "Что ответил Хауке?", text: "Ich bin kein ___!", options: ["Koch", "Köchin", "Kuchen"], answer: "Koch", ru: "Я не повар!" },
  narr("Morgen um acht ist {unterricht}. Lotte ist in {klasse} drei: zwanzig {schueler}, eine Lehrerin. Und {ergebnis}? Eine Eins!"),
  {
    t: "game",
    task: "Матео слышит не то, что сказано. Какое слово прозвучало?",
    hint: "Koch — повар, Kuchen — пирог. Kellner — официант, Keller — подвал. Köchin — повариха, Küche — кухня.",
    c: {
      kind: "sounds",
      rounds: [
        { say: "der Koch", options: ["der Koch", "der Kuchen"] },
        { say: "der Kellner", options: ["der Kellner", "der Keller"] },
        { say: "die Küche", options: ["die Küche", "die Köchin"] },
      ],
    },
  },
  mateo(MATEO, "Три года назад у меня здесь было собеседование. Господин Йенсен сказал только «Moin» — и место было моё!", ["das Vorstellungsgespräch"]),
  {
    t: "hear",
    task: "Как Матео получил работу в клубе?",
    voice: "Reed",
    de: MATEO,
    options: ["Йенсен на собеседовании сказал только «Moin»", "Он испёк торт для фрау Петерсен", "Он прочитал объявление в газете"],
    answer: "Йенсен на собеседовании сказал только «Moin»",
  },
  {
    t: "reply",
    task: "Поздравьте Матео: три года в клубе!",
    options: [
      ok("Herzlichen Glückwunsch, Mateo!"),
      no("Gute Besserung, Mateo!", "Так желают больному. Матео празднует — Herzlichen Glückwunsch!"),
      no("Guten Appetit, Mateo!", "Это перед едой. А тут праздник: Herzlichen Glückwunsch!"),
    ],
  },
  mateo("Und jetzt … ich habe ein Geheimnis. Ich habe einen Kuchen gebacken. Für hundert! Mit MOIN!", "А теперь… у меня есть секрет. Я испёк торт. На сто человек! С надписью MOIN!"),
  {
    t: "gap",
    rule: ["arbeit/perfekt-5"],
    task: "В чём признался Матео?",
    text: "Ich habe einen Kuchen ___.",
    options: ["gebacken", "gebackt", "backen"],
    answer: "gebacken",
    ru: "Я испёк торт.",
  },
  {
    t: "type",
    rule: ["arbeit/perfekt-5"],
    task: "Запишите признание Матео в блокнот.",
    answers: ["Mateo hat einen Kuchen gebacken.", "Er hat einen Kuchen gebacken."],
    ru: "Матео испёк торт.",
  },
  frauke("Und ich? Ich habe zu viel gesagt. Entführung, Polizei … Entschuldigung, Greta!", "А я? Я наговорила лишнего. Похищение, полиция… Простите, Грета!"),
  {
    t: "hear",
    task: "За что извиняется Фрауке?",
    voice: "Sandy",
    de: "Und ich? Ich habe zu viel gesagt. Entführung, Polizei … Entschuldigung, Greta!",
    options: ["за слухи о похищении", "за опоздание с машиной", "за съеденный торт"],
    answer: "за слухи о похищении",
  },
  {
    t: "game",
    task: "Вся команда за круглым столом. Кто что сказал в этот момент?",
    c: {
      kind: "comic",
      panels: [
        {
          id: "mateo",
          scene: "Матео ставит на стол большую синюю коробку с тортом.",
          who: "Mateo",
          pic: "11-comic-1.jpg",
          answer: "Das ist mein Kuchen für die Party.",
          ru: "Это мой торт для праздника.",
        },
        {
          id: "hauke",
          scene: "Хауке сразу поднимает руки, глядя на кухню.",
          who: "Hauke",
          pic: "11-comic-2.jpg",
          answer: "Ich bin kein Koch!",
          ru: "Я не повар!",
        },
        {
          id: "frauke",
          scene: "Фрауке неловко закрывает свою красную тетрадь.",
          who: "Frauke",
          pic: "11-comic-3.jpg",
          answer: "Entschuldigung, Greta!",
          ru: "Простите, Грета!",
        },
        {
          id: "elif",
          scene: "Элиф кивает на окно, где на карнизе сидит чайка.",
          who: "Elif",
          pic: "11-comic-4.jpg",
          answer: "Die Möwe hat nichts gemacht!",
          ru: "Чайка ничего не сделала!",
        },
      ],
      extra: ["Der Kaffee kostet vier Euro."],
    },
  },
  { ...narr("Greta schreibt Frauke: «Kein Problem.» Und Frauke sagt — впервые за неделю — nichts."), set: { rumours: -1 } },
  elif("Und die Möwe? Was hat die Möwe gemacht?", "А чайка? Что сделала чайка?"),
  narr("Greta schreibt groß, für alle: «Die Möwe hat nichts gemacht.» Элиф встаёт и раскланивается."),
  {
    t: "game",
    rule: ["arbeit/perfekt-2"],
    task: "Кто что сделал за неделю? Расставьте по уликам.",
    hint: "Начните с того, что сказано прямо. Петерсен не красила и не пекла.",
    c: {
      kind: "grid",
      people: ["Nils", "Frauke", "Mateo", "Frau Petersen"],
      cols: [{ id: "was", label: "hat …", values: ["ein Schild aus Plastik geholt", "zu viel gesagt", "einen Kuchen gebacken", "nein gesagt"] }],
      clues: [
        { de: "Mateo hat einen Kuchen gebacken.", ru: "Матео испёк торт.", a: "Mateo", b: "was:einen Kuchen gebacken" },
        { de: "Frau Petersen hat nicht zu viel gesagt.", ru: "Фрау Петерсен лишнего не говорила.", a: "Frau Petersen", b: "was:zu viel gesagt", not: true },
        { de: "Frau Petersen hat kein Schild geholt.", ru: "Фрау Петерсен табличку не привозила.", a: "Frau Petersen", b: "was:ein Schild aus Plastik geholt", not: true },
        { de: "Nils hat nicht zu viel gesagt – er hat nur viel geschrieben.", ru: "Нильс лишнего не говорил — он только много писал.", a: "Nils", b: "was:zu viel gesagt", not: true },
      ],
      answer: { "Nils|was": "ein Schild aus Plastik geholt", "Frauke|was": "zu viel gesagt", "Mateo|was": "einen Kuchen gebacken", "Frau Petersen|was": "nein gesagt" },
    },
  },
  {
    t: "pick",
    task: "Что всё ещё неясно после ужина?",
    options: [
      ok("Где наша табличка и что будет в субботу"),
      no("Кто испёк торт", "Матео признался: он."),
      no("Что сделала чайка", "Ничего. Это написала Грета."),
    ],
  },
  { t: "game", task: "Лотта собирает портфель. Разложите вещи по ящикам: der, die, das.", hint: HINT_DOCK, c: docks(["die Hausaufgabe", "die Aufgabe", "die Lösung", "das Ergebnis", "der Unterricht", "die Klasse", "der Schüler", "der Bleistift"]) },
  {
    t: "clue",
    title: "Alle an einem Tisch",
    text: "Mateo: ein Kuchen für hundert — mit MOIN. Hauke ist kein Koch. Frauke: «Entschuldigung, Greta!» Die Möwe hat nichts gemacht.",
  },
];

// Сцена 5 · кульминация: вечер перед последним днём. Бросок: чудак по черте · Грета · отпраздновать ·
// die Köchin · 15 (сильнее) — у фургона Дерьи Грета тайком празднует что-то «fertig», и Дерья угощает
// её бесплатным дёнером. Что закончено, команда не знает: крючок на главу 12. Фрау Петерсен раздаёт
// задания на праздник — sollen по плану; игрок пишет приглашение Opa Hansen по образцу. Замок урока.
const geheim: SceneNode[] = [
  { t: "pic", src: "11-fertig.jpg", alt: "Поздний вечер у горчично-жёлтого фургона Дерьи: Дерья в бирюзовой бандане протягивает Грете дёнер, Грета смеётся, руки у неё в тёмно-синей краске; из-за угла киоска выглядывают Хауке и Элиф" },
  narr("Abend, bei Derya. Greta und Derya — с Cola, смеются. Руки у Греты — dunkelblau, как на фото 39."),
  narr("Грета пишет Дерье записку. Дерья читает вслух — на весь Hafen."),
  derya(DERYA_FERTIG, "Готово? Правда готово? Супер, Грета! Дёнер тебе — бесплатно!"),
  {
    t: "hear",
    task: "Что празднуют Грета и Дерья?",
    voice: "Shelley",
    de: DERYA_FERTIG,
    options: ["что-то закончено — «fertig»", "день рождения Дерьи", "новую работу Греты в фирме"],
    answer: "что-то закончено — «fertig»",
  },
  elif("Fertig – was ist fertig? Unser Schild?", "Готово — что готово? Наша табличка?"),
  hauke("Oder der Kuchen von Mateo? Oder … beides?", "Или торт Матео? Или… и то, и другое?"),
  {
    t: "pick",
    task: "Что может быть «fertig»?",
    options: [
      ok("Пока неизвестно: табличка, торт — или что-то третье"),
      no("Дёнер", "Дёнер Дерья только отдаёт. Празднуют что-то другое."),
      no("Работа Греты в фирме", "В фирме Грета не работала: так сказала фрау Claasen."),
    ],
  },
  narr("Что-то fertig. Für Samstag. Похоже на {ueberraschung}."),
  petersen(PLAN, "Итак: суббота, восемь утра у клуба. Хауке пусть носит столы. Элиф пусть следит за чайкой. И все пусть приходят вовремя!"),
  {
    t: "hear",
    task: "Как на экзамене: что должен делать Хауке в субботу?",
    voice: "Sandy",
    de: PLAN,
    options: ["носить столы", "следить за чайкой", "печь торт"],
    answer: "носить столы",
  },
  {
    t: "type",
    rule: ["moin/sollen-1"],
    task: "Запишите, что должна делать Элиф в субботу.",
    answers: ["Elif soll die Möwe beobachten.", "Sie soll die Möwe beobachten."],
    ru: "Элиф должна следить за чайкой.",
  },
  hauke("Ich trage die Tische? Ich? Mit dem Fahrrad von Oma?", "Я ношу столы? Я? На бабушкином велосипеде?"),
  { t: "gap", rule: ["moin/sollen-1"], task: "Что должен носить Хауке?", text: "Hauke soll die ___ tragen.", options: ["Tische", "Schilder", "Kuchen"], answer: "Tische", ru: "Хауке должен носить столы." },
  elif("Und wenn es am Samstag regnet? Die Party ist am Club!", "А если в субботу пойдёт дождь? Праздник же у клуба!"),
  {
    t: "pick",
    rule: ["moin/wenn-1"],
    task: "Чего боится Элиф?",
    options: [
      ok("Если в субботу дождь, праздник у клуба промокнет"),
      no("Что в субботу Хауке уронит столы", "Про Хауке она не сказала ни слова: wenn es regnet — если пойдёт дождь."),
      no("Что дождь смоет фургон Дерьи", "Фургон не промокнет. Праздник — под открытым небом."),
    ],
  },
  narr("Фрау Петерсен раздаёт {bogen} для гостей: {anrede} — Herr или Frau, пол — {maennlich} или {weiblich}."),
  narr("Bitte {ankreuzen} und bis Freitag {abgeben}. Ihre {papiere} sind immer in Ordnung."),
  mateo("Und ich will den Kuchen backen. Für alle!", "А я хочу испечь торт. На всех!"),
  {
    t: "hear",
    task: "Когда и где встреча в субботу?",
    voice: "Sandy",
    de: PLAN,
    options: ["в восемь у клуба", "в одиннадцать в фирме", "в три у почты"],
    answer: "в восемь у клуба",
  },
  {
    t: "game",
    rule: ["arbeit/perfekt-2", "arbeit/war-hatte-1"],
    task: "Блокнот закрыт на фразы дня. Поверните диски.",
    hint: HINT_LOCK,
    c: lock([
      ["Фирма сделала табличку из пластика.", [["Die Firma", "Die Firmen", "Der Firma"], ["hat", "ist", "haben"], ["ein Schild aus Plastik gemacht.", "ein Schild aus Plastik gemachen.", "gemacht ein Schild aus Plastik."]]],
      ["Йенсен был мокрый.", [["Herr Jensen", "Herrn Jensen", "Herr Jensens"], ["war", "hatte", "ist"], ["nass.", "nass war.", "nasse."]]],
      ["Матео испёк торт.", [["Mateo", "Mateos", "Mateo hat"], ["hat", "ist", "hatte"], ["einen Kuchen gebacken.", "einen Kuchen gebackt.", "ein Kuchen gebacken."]]],
    ]),
  },
  mateo("Und der Kuchen bleibt im Kühlschrank – bis Samstag. Kein Wort!", "А торт остаётся в холодильнике — до субботы. Ни слова!"),
  elif(ELIF_OPA, "А Opa Hansen? Фрау Петерсен говорит: в 1976 году он сделал нашу табличку. Он приедет в субботу!"),
  narr("Приглашение фрау Петерсен для клуба — готовый образец для Opa Hansen."),
  {
    t: "game",
    rule: ["arbeit/perfekt-2"],
    task: "Напишите Opa Hansen приглашение по образцу: приглашению фрау Петерсен для клуба. С Opa вы на «вы», подписываются Нильс и Грета.",
    hint: HINT_LETTER,
    c: letter(
      "Opa Hansen",
      ["Liebe Mitglieder,", "der Club hat Geburtstag: hundert Jahre!", "Wir haben eine Party geplant.", "Kommen Sie bitte am Samstag um acht!", "Viele Grüße", "Frau Petersen"],
      [
        an("Lieber", "Opa Hansen"),
        ["Was? → Frau Petersen: ein Zimmer reservieren (Perfekt)", "Frau Petersen hat ein Zimmer reserviert.", "Frau Petersen hat ein Zimmer reserviert!", "Frau Petersen hat für Sie ein Zimmer reserviert."],
        ["Wer? → Mateo: einen Kuchen backen (Perfekt)", "Mateo hat einen Kuchen gebacken.", "Mateo hat einen Kuchen gebacken!"],
        ["Bitte → Sie: am Samstag nach Kiel kommen", "Kommen Sie bitte am Samstag nach Kiel!", "kommen Sie bitte am Samstag nach Kiel!", "Kommen Sie bitte am Samstag nach Kiel."],
        gruss("Nils und Greta"),
      ],
    ),
  },
  narr("Nils will die Einladung {drucken}, aber {drucker} ist kaputt. На сайте можно только {anklicken}. Er nimmt {kugelschreiber}."),
  { t: "game", task: "Хауке повторяет слова на субботу вслух. Повторите за ним.", hint: HINT_SAY, c: speak(["die Arbeit", "der Beruf", "die Firma"]) },
  narr("Элиф учит глагол {bedeuten}: каждое {satz} письма она разбирает по словам."),
  {
    t: "pick",
    task: "Что теперь главное до субботы?",
    options: [
      ok("Узнать, что у Греты «fertig», — и в субботу прийти вовремя"),
      no("Искать табличку в фирме", "У фирмы её нет: фрау Claasen сказала сегодня."),
      no("Рассказать всё Opa Hansen по телефону", "Приглашение — да. Догадки — нет."),
    ],
  },
  {
    t: "type",
    task: "Запишите план на субботу: время и место.",
    answers: ["Am Samstag um acht sind wir am Club.", "Samstag um acht am Club.", "Am Samstag um acht am Club."],
    ru: "В субботу в восемь мы у клуба.",
  },
  {
    t: "clue",
    title: "Fertig!",
    text: "Greta und Derya: «Fertig!» Was ist fertig? Samstag um acht am Club. Hauke: die Tische. Elif: die Möwe. Opa Hansen kommt — er hat 1976 das Schild gemacht.",
  },
];

// Сцена 6 · эпилог и крючок: ночь перед последним днём. Речь как на экзамене (работа), слова дня,
// письмо с Хельголанда и вопрос на главу 12: как довезти мокрую табличку под дождём.
const nacht: SceneNode[] = [
  { t: "pic", src: "11-nacht.jpg", alt: "Ночь у клуба, тучи над гаванью: Хауке с прогнозом дождя в телефоне смотрит в небо, Элиф бросается за чайкой, которая уносит в клюве письмо с маяком на марке" },
  narr("Nacht am Club. Alles ist grau. Элиф читает письмо — aus Helgoland."),
  elif("Die Vogelwarte schreibt: Unsere Möwe ist sieben Jahre alt. Sie hat schon drei Kinder gehabt!", "Орнитологическая станция пишет: HEL 7305 семь лет. У неё уже было трое детей!"),
  {
    t: "hear",
    task: "Что пишут с Хельголанда о чайке?",
    voice: "Flo",
    de: "Die Vogelwarte schreibt: Unsere Möwe ist sieben Jahre alt. Sie hat schon drei Kinder gehabt!",
    options: ["ей семь лет, и у неё было трое птенцов", "ей семьдесят лет", "она прилетела из Гамбурга"],
    answer: "ей семь лет, и у неё было трое птенцов",
  },
  { t: "gap", rule: ["arbeit/perfekt-5"], task: "Что написали о чайке?", text: "Sie hat schon drei Kinder ___.", options: ["gehabt", "gehaben", "hatte"], answer: "gehabt", ru: "У неё уже было трое птенцов." },
  hauke("Sieben Jahre und drei Kinder. Und ich? Ich habe nur das Fahrrad repariert.", "Семь лет и трое детей. А я? Я только починил велосипед."),
  {
    t: "game",
    task: "Хауке устраивает репетицию экзамена. Тема дня — работа.",
    hint: HINT_ORAL,
    c: oral([
      oralSay(2, ASK, "Thema: Arbeit · Wort: Beruf", "Was sind Sie von Beruf?", "Кто вы по профессии?", "Was sind Sie …?"),
      oralReply(2, ANSWER, "Was hast du gestern gemacht?", "Gestern habe ich gearbeitet.", "Вчера я работал."),
      oralSay(3, REQUEST, "🖌️", "Hilf mir bitte beim Malen!", "Помоги мне, пожалуйста, красить!"),
    ]),
  },
  {
    t: "type",
    rule: ["arbeit/maennlich-weiblich-1"],
    task: "Хауке спрашивает уже вас: «Und Sie? Was sind Sie von Beruf?» Ответьте про себя.",
    answers: ["Ich bin *.", "Ich bin * von Beruf.", "Ich arbeite als *."],
    sample: "Ich bin Lehrerin.",
    ru: "Я … по профессии.",
  },
  mateo("Der Kuchen ist im Kühlschrank. Für Samstag. Die Möwe – nein!", "Торт в холодильнике. На субботу. Для чайки — нет!"),
  {
    t: "reply",
    rule: ["arbeit/check-3"],
    task: "Матео спрашивает, почему вы вчера не попробовали суп. Ответьте: вчера не было времени.",
    options: [
      ok("Gestern hatte ich keine Zeit."),
      no("Gestern hatte ich nicht Zeit.", "Перед существительным — kein: keine Zeit."),
      no("Gestern ich hatte keine Zeit.", "Время первым — глагол вторым: Gestern hatte ich …"),
    ],
  },
  { t: "game", task: "Слова дня перемешались. Откройте пары: немецкое слово и перевод.", c: memory(["geheimnis", "ueberraschung", "wetterbericht", "muetze", "firma", "notizblock"]) },
  narr("Und die Möwe? Sie hat nichts gemacht — bis jetzt. Der Brief aus Helgoland — уже у неё в клюве."),
  { t: "game", task: `Отнимите письмо у чайки! ${RACE}`, hint: HINT_RACE, outcome: RACE_STAKES, c: race(["der Beruf", "die Arbeit", "die Stelle", "die Firma", "gestern", "früher", "gestern Abend", "letztes Jahr", "der Kollege", "der Hausmann"]) },
  elif("Mein Brief! Möwe, das ist kein Fischbrötchen! Das bist du!", "Моё письмо! Чайка, это не рыбная булочка! Это же про тебя!"),
  dana(DANA_SAMSTAG, "Завтра фрау Петерсен заказывает табличку из пластика. Наш план: в субботу в семь — к Грете!"),
  {
    t: "pick",
    task: "Что нового за день?",
    options: [
      ok("Фирма табличку не брала, слух Фрауке неверен, а у Греты что-то «fertig»"),
      no("Табличку украла фирма", "Фрау Claasen: «Das haben wir nie gehabt!»"),
      no("Праздник отменили из-за дождя", "Праздник будет. Дождь — не повод его отменять."),
    ],
  },
  { t: "game", task: "Лото на ночь: послушайте слово и закройте его на карточке.", hint: HINT_HEAR, c: bingo(["der Beruf", "die Arbeit", "die Stelle", "die Firma", "der Koch", "die Köchin", "der Mechaniker", "der Student", "der Kollege"]) },
  {
    t: "type",
    rule: ["arbeit/perfekt-2"],
    task: "Запишите итог дня одной фразой: «Фирма не брала табличку».",
    answers: ["Die Firma hat das Schild nicht genommen.", "Die Firma hat unser Schild nicht genommen.", "Die Firma hat das Schild nie genommen."],
    ru: "Фирма не брала табличку.",
  },
  hauke("Gute Nacht, Möwe. Morgen hast du viel Arbeit – du bist die Wache!", "Спокойной ночи, чайка. Завтра у тебя много работы — ты в карауле!"),
  narr("Вы закрываете блокнот: «День одиннадцатый. Die Firma hat das Schild nicht. Greta: «Samstag». Greta und Derya: «Fertig!»». Noch ein Tag."),
  {
    t: "clue",
    title: "Noch ein Tag",
    text: "Die Firma hat das Schild nicht. Greta: «Samstag.» Greta und Derya: «Fertig!» Samstag um sieben: zu Greta. Samstag: es regnet. Die Party, Opa Hansen — und der Kuchen von Mateo im Kühlschrank.",
  },
];

const play = (nodes: SceneNode[]) => ({ kind: "play" as const, nodes });

export const sceneChapter11: Episode = {
  id: "moin-neu-11",
  title: "Was ist passiert?",
  day: { de: "Noch zwei Tage", ru: "ещё два дня до Kieler Woche" },
  place: "Клуб и фирма Kiel-Schild в Гаардене · все за одним столом",
  topic: "Работа и профессии",
  grammar: "профессии на -in · Perfekt с haben · gemacht, gefunden · war и hatte",
  beats: [
    {
      id: "11-s1",
      title: "Stelle frei",
      story: [],
      prompt: "Хауке выздоровел и читает вакансии, а радио обещает дождь в субботу.",
      hint: "Was hast du gestern gemacht? — Ich habe … gelernt.",
      success: "Хауке ищет работу на выходные. В субботу — дождь.",
      challenge: play(donnerstag),
    },
    {
      id: "11-i1",
      title: "Глазами Йенсена",
      pov: "глазами Йенсена",
      story: [],
      prompt: "Интерлюдия: молчаливое утро и фото 1976 года.",
      hint: "Ich war zwanzig. — «был», «было»: war.",
      success: "Юноша в фуражке на фото — Йенсен.",
      challenge: play(jensen),
    },
    {
      id: "11-s2",
      title: "Kiel-Schild",
      story: [],
      prompt: "Одиннадцать часов: очная ставка в фирме табличек.",
      hint: "Ich habe gearbeitet. — haben второй, причастие в конце.",
      success: "У фирмы таблички нет и не было. В конверте Йенсена — письмо: «Kommen Sie am Freitag».",
      challenge: play(back(werkstatt, 11, 2)),
    },
    {
      id: "11-s3",
      title: "Warum?",
      story: [],
      prompt: "Зачем письмо: фрау Петерсен, записки Йенсена и одно слово Греты.",
      hint: "Waren Sie am Samstag am Bus? — «были» — war, а не hatte.",
      success: "Петерсен завтра закажет пластик. Йенсен пишет «Freitag», Грета — «Samstag».",
      challenge: play(back(warum, 11, 0)),
    },
    {
      id: "11-s4",
      title: "Alle an einem Tisch",
      story: [],
      prompt: "Все за одним столом: признания в Perfekt.",
      hint: "Ich habe einen Kuchen gebacken. — сильный глагол: ge-…-en.",
      success: "Матео признался в торте. Чайка ничего не сделала.",
      challenge: play(tisch),
    },
    {
      id: "11-s5",
      title: "Fertig!",
      story: [],
      prompt: "Грета и Дерья что-то празднуют, задания на субботу и приглашение для Opa Hansen.",
      hint: "Hauke soll die Tische tragen. — так просит фрау Петерсен: sollen.",
      success: "У Греты что-то «fertig». В субботу в восемь — праздник у клуба.",
      challenge: play(back(geheim, 11, 3)),
    },
    {
      id: "11-s6",
      title: "Noch zwei Tage",
      story: [],
      prompt: "Ночь перед последним днём: письмо с Хельголанда и речь как на экзамене.",
      hint: "Gestern hatte ich keine Zeit. — hatte + kein.",
      success: "День одиннадцатый закончен. Noch ein Tag.",
      challenge: play(back(nacht, 11, 1)),
    },
  ],
};
