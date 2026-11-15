import { an, ANSWER, ASK, bingo, docks, gaps, gruss, gull as race, HINT_DOCK, HINT_HEAR, HINT_LETTER, HINT_LOCK, HINT_ODD, HINT_ORAL, HINT_RACE, HINT_SAY, letter, lock, odd, oral, order, RACE, RACE_STAKES, reply as oralReply, REQUEST, say as oralSay, sort, speak, verdict } from "../build.ts";
import { phrases } from "../data.ts";
import type { Challenge, Episode, SceneNode } from "../types.ts";

// Глава 11 в формате сцен (A1-PLOT.md, «Формат сцен»): работа и профессии, женские формы на -in,
// Perfekt с haben, war и hatte. Вопрос главы — что произошло за неделю. Вход — встреча с Гретой и
// Йенсеном в мастерской, выход — правда: столетие клуба, работа Греты, торт Матео; команда теперь в
// заговоре, а в субботу обещают дождь, хотя краска ещё не высохла. Повороты брошены оракулом
// (seed 1794687274), увязка — в журнале A1-STORYCRAFT.md.

const narr = (text: string): SceneNode => ({ t: "narr", text });
const learn = (words?: string[]) => (words ? { learn: words } : {});
const hauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Hauke", voice: "Rocko", de, ru, ...learn(words) });
const elif = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Elif", voice: "Flo", de, ru, ...learn(words) });
const dana = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Dana", voice: "Anna", de, ru, ...learn(words) });
const mateo = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Mateo", voice: "Reed", de, ru, ...learn(words) });
const frauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frauke", voice: "Sandy", de, ru, ...learn(words) });
const petersen = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frau Petersen", voice: "Sandy", de, ru, ...learn(words) });
const radio = (de: string, ru: string): SceneNode => ({ t: "say", who: "Radio", voice: "Eddy", de, ru });
/** Пары памяти — из выражений истории, которые глава уже показала. */
const memory = (ids: string[]): Challenge => ({ kind: "memory", pairs: ids.map((id) => ({ id, de: phrases[id].de, ru: phrases[id].ru })) });
const ok = (text: string) => ({ text, ok: true as const });
const no = (text: string, react: string) => ({ text, react });

const RADIO = "Der Wetterbericht für Kiel: Heute Sonne, morgen Wolken. Und am Samstag – Regen, den ganzen Tag.";
const PETERSEN = "Eine Firma wollte uns ein neues Schild geben – aus Plastik. Ich habe nein gesagt! Der ganze Club hat nein gesagt!";
const MATEO = "Vor drei Jahren hatte ich hier mein Vorstellungsgespräch. Herr Jensen hat nur Moin gesagt – und ich hatte die Stelle!";
const PLAN = "Also: Samstag um acht am Club. Hauke soll das Schild tragen. Elif soll die Möwe beobachten. Und alle sollen nichts sagen!";

// Сцена 1 · пролог: четверг, Хауке выздоровел и ищет подработку. Бросок: смена точки зрения · Хауке ·
// неверно перевести · die Stelle · 2 (почти ничего) — Хауке читает «Stelle frei» как «свободное место»
// на скамейке. Бросок: смена точки зрения · Хауке · починить · der Student · 3 (мелочь) — Хауке,
// студент, чинит бабушкин велосипед. Прогноз: в субботу дождь — часы погоды.
const donnerstag: SceneNode[] = [
  { t: "pic", src: "11-donnerstag.jpg", alt: "Утро четверга у клуба, солнце: выздоровевший Хауке чинит цепь бабушкиного красного велосипеда, рядом газета с объявлениями; Элиф с конвертом, Дана с кофе; на подоконнике радио" },
  narr("Tag elf, Donnerstag, noch zwei Tage. Hauke ist wieder gesund. Er sitzt vor dem Club — и чинит бабушкин велосипед."),
  hauke("Ich bin wieder gesund! Gestern habe ich nur geschlafen und Suppe gegessen.", "Я снова здоров! Вчера я только спал и ел суп.", ["gestern"]),
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
  elif("Helgoland! Da ist der Ring von unserer Möwe! Ich schreibe heute noch!", "Гельголанд! Там кольцо нашей чайки! Напишу сегодня же!"),
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
    text: "Hauke ist gesund und sucht eine Stelle am Wochenende. Elif: Helgoland! Der Wetterbericht: am Samstag — es regnet. Um elf: Werkstatt, Greta und Herr Jensen.",
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

// Сцена 2 · развитие: мастерская в одиннадцать. Грета и Йенсен отвечают записками в Perfekt. Бросок:
// подарок игроку · Грета · перепутать · der Beruf · 3 (мелочь) — Грета пишет «Mechaniker» и сама
// поправляется: «Mechanikerin». Хронология недели — раскладка по времени.
const werkstatt: SceneNode[] = [
  { t: "pic", src: "11-werkstatt.jpg", alt: "Мастерская Греты: на верстаке под лампой табличка MOIN — свежая тёмно-синяя краска, белые буквы, кант-канат; Грета в комбинезоне пишет записку, Йенсен в шарфе с блоком, Элиф, Дана и Хауке смотрят на табличку" },
  narr("11:00, Farbenweg 7. Die Tür ist auf. Auf dem Tisch — das Schild. Dunkelblau, weiße Buchstaben, по краю — {seil}. Wie neu."),
  narr("На верстаке — {bleistift}, линейка и отдельная {teil} таблички — рамка. Каждый {zentimeter} Грета мерила дважды."),
  {
    t: "look",
    task: "Рассмотрите табличку на верстаке.",
    items: [
      { icon: "🪧", de: "das Schild", ru: "табличка", note: "Тёмно-синяя, белые буквы MOIN, кант-канат. Старая доска — новая краска.", key: true },
      { icon: "🖌️", de: "der Pinsel", ru: "кисть", note: "Маленькая кисть для букв. Вымыта и сохнет.", key: true },
      { icon: "💡", de: "die Lampe", ru: "лампа", note: "Над верстаком тёплая лампа: краска так сохнет быстрее." },
    ],
  },
  elif("Das Schild! Es ist so schön! Wie neu!", "Табличка! Она такая красивая! Как новая!"),
  dana("Greta, was haben Sie gemacht?", "Грета, что вы сделали?"),
  narr("Грета пишет, Элиф читает вслух."),
  elif("Greta schreibt: Ich habe die Farbe gekauft. Ich habe das Schild gemalt. Zehn Tage habe ich gearbeitet.", "Грета пишет: я купила краску. Я покрасила табличку. Я работала десять дней."),
  {
    t: "hear",
    task: "Сколько дней работала Грета?",
    voice: "Flo",
    de: "Greta schreibt: Ich habe die Farbe gekauft. Ich habe das Schild gemalt. Zehn Tage habe ich gearbeitet.",
    options: ["десять", "два", "сто"],
    answer: "десять",
  },
  hauke("Über fünfzig Jahre alt – und wie neu!", "Больше пятидесяти лет — и как новая!"),
  narr("Где у Греты {fehler}? Нигде. Свои кисти она не даёт: {benutzen} их может только она."),
  {
    t: "game",
    rule: ["arbeit/perfekt-4"],
    task: "Перепишите записку Греты в блокнот. Вставьте причастия.",
    hint: "Слабые глаголы: ge- + основа + -t; после -t — -et: gearbeitet.",
    c: gaps("Ich habe die Farbe ___. Ich habe das Schild ___. Zehn Tage habe ich ___.", ["gekauft", "gemalt", "gearbeitet", "gekaufen", "gemalen"], ["gekauft", "gemalt", "gearbeitet"]),
  },
  elif("Zehn Tage war das Schild unter dem Tuch. Und Greta ist jeden Tag mit dem Bus gekommen!", "Десять дней табличка лежала под тканью. А Грета каждый день приезжала на автобусе!"),
  narr("Dann schreibt sie: «Ich bin Mechaniker.» Смотрит на слово — и дописывает две буквы."),
  {
    t: "reply",
    rule: ["arbeit/maennlich-weiblich-1"],
    task: "Подскажите Грете, как правильно о себе.",
    options: [
      ok("Sie sind Mechanikerin!"),
      no("Sie sind Mechanikerinnen!", "-innen — множественное число. Грета одна: Mechanikerin."),
      no("Sie sind Mechanikerin-in!", "Окончание одно: Mechaniker + in."),
    ],
  },
  narr("Herr Jensen schreibt auch. Дана читает вслух."),
  dana("Herr Jensen schreibt: Ich habe Greta das Schild gegeben. Am Sonntag. Um halb sechs. Beim Tee.", "Господин Йенсен пишет: я отдал Грете табличку. В воскресенье. В половине шестого. За чаем."),
  { t: "gap", rule: ["tagesablauf/wann-1"], task: "Когда Йенсен отдал табличку?", text: "Am Sonntag um ___ sechs.", options: ["halb", "Viertel", "um"], answer: "halb", ru: "В воскресенье в половине шестого." },
  hauke("Um halb sechs! Beim Tee! Wie immer – und wir haben nichts gesehen!", "В половине шестого! За чаем! Как всегда — а мы ничего не видели!"),
  {
    t: "hear",
    task: "Что понял Хауке?",
    voice: "Rocko",
    de: "Um halb sechs! Beim Tee! Wie immer – und wir haben nichts gesehen!",
    options: ["табличку отдали в 17:30, за чаем, у всех на глазах", "табличку унесли ночью", "табличку украла чайка"],
    answer: "табличку отдали в 17:30, за чаем, у всех на глазах",
  },
  {
    t: "game",
    rule: ["arbeit/perfekt-2"],
    task: "Разложите события по времени: когда это было?",
    hint: "früher — давно, в 1976 году; letzte Woche — в воскресенье; gestern — вчера.",
    c: sort([["frueher", "früher"], ["woche", "letzte Woche"], ["gestern", "gestern"]], [
      ["opa", "Opa Hansen hat das Schild gemalt.", "frueher", "🖌️"],
      ["jensen", "Herr Jensen hat die Farbe gehalten.", "frueher", "🥫"],
      ["sonntag", "Herr Jensen hat Greta das Schild gegeben.", "woche", "🫖"],
      ["bus", "Greta hat den Bus nach Gaarden genommen.", "woche", "🚌"],
      ["arzt", "Herr Jensen hat den Arzt besucht.", "gestern", "🩺"],
      ["rezept", "Frauke hat die Versichertenkarte gebracht.", "gestern", "💳"],
    ]),
  },
  {
    t: "pick",
    task: "Почему никто не заметил, как табличка уехала?",
    options: [
      ok("Все сидели за чаем в половине шестого — как всегда"),
      no("Табличку унесли ночью", "Нет: в воскресенье днём, в половине шестого."),
      no("Её унесла чайка", "Чайка ничего не сделала. Табличку отдал Йенсен."),
    ],
  },
  dana("Greta hat Herrn Jensen nicht entführt. Sie hat ihn zum Arzt gebracht!", "Грета не похищала Йенсена. Она отвела его к врачу!"),
  {
    t: "type",
    rule: ["arbeit/perfekt-2"],
    task: "Запишите главное в блокнот: Грета покрасила табличку.",
    answers: ["Greta hat das Schild gemalt.", "Sie hat das Schild gemalt.", "Greta hat das Schild neu gemalt."],
    ru: "Грета покрасила табличку.",
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
    t: "clue",
    title: "Die Werkstatt",
    text: "Greta ist Mechanikerin. Sie hat das Schild gemalt, zehn Tage. Sonntag, halb sechs, beim Tee: das Schild — von Herrn Jensen für Greta.",
  },
];

// Сцена 3 · развитие: зачем всё это — свидетели в своём порядке. Бросок: событие за кадром · Петерсен ·
// отказаться · die Firma · 20 (гипербола: в деле весь клуб) — фирма предлагала к столетию новую
// пластиковую табличку, Петерсен отказала, и за ней весь клуб: «Unser Schild bleibt!» Бросок:
// смена точки зрения · Дана · подарить · der Mechaniker · 3 (мелочь) — Дана дарит Грете пластырь
// для спины: «от врача — механику».
const warum: SceneNode[] = [
  { t: "pic", src: "11-warum.jpg", alt: "Мастерская: Грета показывает старое письмо фирмы с рисунком пластиковой вывески, Йенсен пишет в блоке, Дана протягивает Грете маленький пакет; Элиф держит телефон на громкой связи" },
  narr("Теперь главный вопрос: зачем? Greta und Herr Jensen schreiben. Und Frau Petersen ist am Telefon."),
  {
    t: "go",
    task: "Кого спросить, зачем был нужен секрет?",
    next: "Дальше по делу",
    branches: [
      {
        label: "Грета и Opa",
        icon: "🖌️",
        nodes: [
          narr("Greta schreibt: «Der Club hat hundert Jahre Geburtstag. Opa hat das Schild für fünfzig gemacht. Ich mache es neu — für hundert.»"),
          {
            t: "pick",
            task: "Зачем Грета обновила табличку?",
            options: [
              ok("К столетию клуба: дед сделал её к пятидесятилетию, а внучка — к сотому"),
              no("Чтобы продать её фирме", "Наоборот: табличку обновили, чтобы её не заменили."),
              no("Потому что её разбила чайка", "Табличка была старой и облезлой, но целой."),
            ],
          },
          elif("Opa hat das Schild gemalt – und jetzt seine Enkelin! Das ist schön.", "Дед покрасил табличку — а теперь внучка! Как красиво."),
          {
            t: "type",
            rule: ["arbeit/perfekt-4"],
            task: "Запишите в блокнот: Opa Hansen сделал табличку.",
            answers: ["Opa Hansen hat das Schild gemacht.", "Opa hat das Schild gemacht.", "1976 hat Opa Hansen das Schild gemacht."],
            ru: "Opa Hansen сделал табличку.",
          },
        ],
      },
      {
        label: "Записки Йенсена",
        icon: "📝",
        nodes: [
          narr("Herr Jensen schreibt: «Eine {ueberraschung}. Für den Club. Für Opa Hansen. Nicht sprechen!» Und dann: «Ich war der junge Mann auf dem Foto.»"),
          {
            t: "reply",
            rule: ["arbeit/war-hatte-2"],
            task: "Спросите Йенсена, был ли он на фото 1976 года.",
            options: [
              ok("Waren Sie 1976 auch da?"),
              no("Hatten Sie 1976 auch da?", "«Были» — war, а не hatte: Waren Sie …?"),
              no("Sind Sie 1976 auch da?", "Это прошлое: Waren Sie …?"),
            ],
          },
          narr("Он кивает и пишет: «Ja. Ich hatte die Farbe. Wie heute.» {geheimnis} — пятьдесят лет в одном ящике."),
          hauke("Der junge Mann auf dem Foto – das waren Sie? Mit der Mütze?", "Юноша на фото — это были вы? В фуражке?"),
        ],
      },
      {
        label: "Фрау Петерсен по телефону",
        icon: "📞",
        nodes: [
          petersen(PETERSEN, "Одна фирма хотела дать нам новую табличку — из пластика. Я сказала «нет»! Весь клуб сказал «нет»!", ["die Firma"]),
          {
            t: "hear",
            task: "От чего отказалась фрау Петерсен?",
            voice: "Sandy",
            de: PETERSEN,
            options: ["от новой пластиковой таблички фирмы", "от праздника", "от торта Матео"],
            answer: "от новой пластиковой таблички фирмы",
          },
          petersen("Hundert Mitglieder, hundert Mal nein! Unser Schild bleibt!", "Сто членов клуба — сто раз «нет»! Наша табличка остаётся!"),
          {
            t: "type",
            rule: ["arbeit/perfekt-2"],
            task: "Запишите, что клуб ответил фирме.",
            answers: ["Der Club hat nein gesagt.", "Der ganze Club hat nein gesagt.", "Frau Petersen hat nein gesagt."],
            ru: "Клуб сказал «нет».",
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
  narr("Фрауке говорила: «Entführung!» А что пишет Йенсен?"),
  elif("Herr Jensen schreibt: Greta hat mich zum Arzt gebracht. Keine Entführung!", "Господин Йенсен пишет: Грета отвела меня к врачу. Никакого похищения!"),
  {
    t: "game",
    task: "Сравните слух Фрауке и записку Йенсена. Отметьте два слова, которые не сходятся.",
    hint: "Что Грета сделала с Йенсеном — по слуху и по его словам?",
    c: {
      kind: "contra",
      texts: [
        { who: "Frauke, Montag", lines: [["Greta", "hat", "Herrn", "Jensen", "entführt!"]] },
        { who: "Herr Jensen, Notizblock", lines: [["Greta", "hat", "mich", "zum", "Arzt", "gebracht."]] },
      ],
      answer: ["0:0:4", "1:0:5"],
    },
  },
  narr("А {aussage} Фрауке про похищение — просто слух. Записка Йенсена говорит другое."),
  { t: "gap", rule: ["arbeit/perfekt-5"], task: "Что Грета сделала на самом деле?", text: "Greta hat Herrn Jensen zum Arzt ___.", options: ["gebracht", "gebringt", "bringen"], answer: "gebracht", ru: "Грета отвела господина Йенсена к врачу." },
  {
    t: "game",
    task: "Что теперь известно? Проверьте блокнот.",
    c: verdict(["Richtig", "Falsch"], [
      ["Йенсен отдал табличку Грете сам", true, "«Ich habe Greta das Schild gegeben.»"],
      ["Клуб хотел новую пластиковую табличку", false, "Весь клуб сказал фирме «нет»."],
      ["Табличку сделал Opa к пятидесятилетию клуба", true, "1976 — клубу пятьдесят. Теперь — сто."],
    ]),
  },
  {
    t: "game",
    rule: ["arbeit/perfekt-3"],
    task: "Соберите вывод для блокнота: время — на первом месте.",
    hint: "Глагол haben — второй, причастие gegeben — в конце.",
    c: order(["Am", "Sonntag", "hat", "Herr", "Jensen", "das", "Schild", "gegeben."], ["gegeben.", "Schild", "hat", "Am", "das", "Jensen", "Sonntag", "Herr"]),
  },
  {
    t: "clue",
    title: "Hundert Jahre",
    text: "Der Club hat hundert Jahre Geburtstag. Eine Firma: ein Schild aus Plastik? Der Club: nein! Greta macht unser Schild neu. Eine Überraschung. Herr Jensen war 1976 auch auf dem Foto.",
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
      { icon: "🧢", de: "die Mütze", ru: "фуражка", note: "Фуражка Йенсена лежит на столе. Та самая, что на фото 1976 года.", key: true },
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
      people: ["Greta", "Herr Jensen", "Mateo", "Frau Petersen"],
      cols: [{ id: "was", label: "hat …", values: ["das Schild gemalt", "das Schild gegeben", "einen Kuchen gebacken", "nein gesagt"] }],
      clues: [
        { de: "Mateo hat einen Kuchen gebacken.", ru: "Матео испёк торт.", a: "Mateo", b: "was:einen Kuchen gebacken" },
        { de: "Frau Petersen hat das Schild nicht gemalt.", ru: "Фрау Петерсен табличку не красила.", a: "Frau Petersen", b: "was:das Schild gemalt", not: true },
        { de: "Frau Petersen hat das Schild nicht gegeben.", ru: "Фрау Петерсен табличку не отдавала.", a: "Frau Petersen", b: "was:das Schild gegeben", not: true },
        { de: "Herr Jensen hat nicht gemalt: Er hatte nur die Farbe.", ru: "Йенсен не красил: у него была только краска.", a: "Herr Jensen", b: "was:das Schild gemalt", not: true },
      ],
      answer: { "Greta|was": "das Schild gemalt", "Herr Jensen|was": "das Schild gegeben", "Mateo|was": "einen Kuchen gebacken", "Frau Petersen|was": "nein gesagt" },
    },
  },
  {
    t: "pick",
    task: "Почему никто не рассказал правду раньше?",
    options: [
      ok("Это был сюрприз к столетию клуба: и табличка, и торт"),
      no("Все боялись полиции", "Полиции не было ни при чём — кроме слуха Фрауке."),
      no("Йенсен запретил всем говорить", "Говорить запретили только Йенсену — врач."),
    ],
  },
  { t: "game", task: "Лотта собирает портфель. Разложите вещи по ящикам: der, die, das.", hint: HINT_DOCK, c: docks(["die Hausaufgabe", "die Aufgabe", "die Lösung", "das Ergebnis", "der Unterricht", "die Klasse", "der Schüler", "der Bleistift"]) },
  {
    t: "clue",
    title: "Alle an einem Tisch",
    text: "Mateo: ein Kuchen für hundert — mit MOIN. Hauke ist kein Koch. Frauke: «Entschuldigung, Greta!» Die Möwe hat nichts gemacht.",
  },
];

// Сцена 5 · кульминация: заговор. Все обещают молчать до субботы, игрок пишет приглашение Opa Hansen
// по образцу приглашения фрау Петерсен. sollen по плану повторяется: «Was soll Hauke machen?». Замок
// урока. Краска ещё не высохла, а в субботу дождь — проблема главы 12.
const geheim: SceneNode[] = [
  { t: "pic", src: "11-geheim.jpg", alt: "Клуб поздно вечером: Хауке, Элиф и Матео подняли руки, как для клятвы; Йенсен прижал палец к губам; на столе торт под полотенцем и пустая плоская коробка" },
  narr("Теперь вы в заговоре: das ist ein {geheimnis} — für zwei Tage. Йенсен прикладывает палец к губам."),
  petersen(PLAN, "Итак: суббота, восемь утра у клуба. Хауке пусть несёт табличку. Элиф пусть следит за чайкой. И все пусть молчат!"),
  {
    t: "hear",
    task: "Как на экзамене: что должен делать Хауке в субботу?",
    voice: "Sandy",
    de: PLAN,
    options: ["нести табличку", "следить за чайкой", "печь торт"],
    answer: "нести табличку",
  },
  hauke("Ich trage das Schild? Ich? Mit dem Fahrrad von Oma?", "Я несу табличку? Я? На бабушкином велосипеде?"),
  elif("Und wenn es regnet? Das Schild ist noch nicht trocken!", "А если пойдёт дождь? Табличка ещё не высохла!"),
  {
    t: "pick",
    rule: ["moin/wenn-1"],
    task: "Чего боится Элиф?",
    options: [
      ok("Если в субботу дождь, табличка не успеет высохнуть"),
      no("Что в субботу Хауке уронит табличку", "Про Хауке она не сказала ни слова: wenn es regnet — если пойдёт дождь."),
      no("Что дождь смоет белые буквы", "Буквы уже высохли. Сохнет тёмно-синяя краска."),
    ],
  },
  narr("Фрау Петерсен раздаёт {bogen} для гостей: {anrede} — Herr или Frau, пол — {maennlich} или {weiblich}."),
  narr("Bitte {ankreuzen} und bis Freitag {abgeben}. Ihre {papiere} sind immer in Ordnung."),
  {
    t: "type",
    rule: ["moin/sollen-1"],
    task: "Запишите, что должна делать Элиф в субботу.",
    answers: ["Elif soll die Möwe beobachten.", "Sie soll die Möwe beobachten."],
    ru: "Элиф должна следить за чайкой.",
  },
  mateo("Und ich will den Kuchen backen. Für alle!", "А я хочу испечь торт. На всех!"),
  {
    t: "hear",
    task: "Когда и где встреча в субботу?",
    voice: "Sandy",
    de: PLAN,
    options: ["в восемь у клуба", "в одиннадцать в мастерской", "в три у почты"],
    answer: "в восемь у клуба",
  },
  narr("Грета дописывает строчку: «Die Farbe ist noch nicht {trocken}. Zwei Tage. Und Samstag — es regnet?»"),
  dana("Nasse Farbe und Regen? Diagnose: ein Problem.", "Мокрая краска и дождь? Диагноз: проблема."),
  {
    t: "reply",
    task: "Предложите, как везти табличку под дождём. Вспомните подвал Йенсена.",
    options: [
      ok("Wir nehmen den Karton von Herrn Jensen!"),
      no("Wir nehmen eine Tüte.", "Пакет для таблички мал — и промокнет."),
      no("Wir nehmen das Fahrrad von Oma.", "Табличку на велосипеде под дождём? Краска поплывёт."),
    ],
  },
  narr("Йенсен кивает и пишет: «Der Karton ist für das Schild. Ich habe ihn am Montag gemacht.»"),
  elif("Der Karton mit dem Umriss! Das Schild passt genau hinein!", "Коробка с контуром! Табличка войдёт точно!"),
  { t: "gap", task: "Для чего Йенсен сделал коробку?", text: "Der Karton ist für das ___.", options: ["Schild", "Fahrrad", "Kuchen"], answer: "Schild", ru: "Коробка — для таблички." },
  {
    t: "game",
    rule: ["arbeit/perfekt-2", "arbeit/war-hatte-1"],
    task: "Блокнот закрыт на фразы дня. Поверните диски.",
    hint: HINT_LOCK,
    c: lock([
      ["Грета покрасила табличку.", [["Greta", "Gretas", "Grete"], ["hat", "ist", "haben"], ["das Schild gemalt.", "das Schild gemalen.", "gemalt das Schild."]]],
      ["Йенсену было двадцать.", [["Herr Jensen", "Herrn Jensen", "Herr Jensens"], ["war", "hatte", "ist"], ["zwanzig.", "zwanzig Jahre hatte.", "zwanzigsten."]]],
      ["Матео испёк торт.", [["Mateo", "Mateos", "Mateo hat"], ["hat", "ist", "hatte"], ["einen Kuchen gebacken.", "einen Kuchen gebackt.", "ein Kuchen gebacken."]]],
    ]),
  },
  mateo("Und der Kuchen bleibt im Kühlschrank – bis Samstag. Kein Wort!", "А торт остаётся в холодильнике — до субботы. Ни слова!"),
  elif("Und Opa Hansen? Er hat das Schild gemacht. Er muss am Samstag da sein!", "А Opa Hansen? Он сделал табличку. Он должен быть здесь в субботу!"),
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
        ["Was? → wir: das Schild finden (Perfekt)", "Wir haben das Schild gefunden!", "wir haben das Schild gefunden!", "Wir haben das Schild gefunden."],
        ["Wer? → Greta: das Schild malen (Perfekt)", "Greta hat das Schild gemalt.", "Greta hat das Schild neu gemalt."],
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
      ok("Молчать о сюрпризе и спасти мокрую краску от дождя"),
      no("Искать табличку дальше", "Табличка найдена: она в мастерской Греты."),
      no("Рассказать всё Opa Hansen по телефону", "Это сюрприз и для него: только приглашение."),
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
    title: "Ein Geheimnis",
    text: "Samstag um acht am Club. Hauke: das Schild. Elif: die Möwe. Alle: kein Wort! Die Farbe ist noch nicht trocken — und Samstag: es regnet.",
  },
];

// Сцена 6 · эпилог и крючок: ночь перед последним днём. Речь как на экзамене (работа), слова дня,
// письмо с Гельголанда и вопрос на главу 12: как довезти мокрую табличку под дождём.
const nacht: SceneNode[] = [
  { t: "pic", src: "11-nacht.jpg", alt: "Ночь у клуба, тучи над гаванью: Хауке с прогнозом дождя в телефоне смотрит в небо, Элиф бросается за чайкой, которая уносит в клюве письмо с маяком на марке" },
  narr("Nacht am Club. Alles ist grau. Элиф читает письмо — aus Helgoland."),
  elif("Die Vogelwarte schreibt: Unsere Möwe ist sieben Jahre alt. Sie hat schon drei Kinder gehabt!", "Орнитологическая станция пишет: HEL 7305 семь лет. У неё уже было трое детей!"),
  {
    t: "hear",
    task: "Что пишут с Гельголанда о чайке?",
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
  { t: "game", task: "Слова дня перемешались. Откройте пары: немецкое слово и перевод.", c: memory(["geheimnis", "ueberraschung", "wetterbericht", "muetze", "trocken", "notizblock"]) },
  narr("Und die Möwe? Sie hat nichts gemacht — bis jetzt. Der Brief aus Helgoland — уже у неё в клюве."),
  { t: "game", task: `Отнимите письмо у чайки! ${RACE}`, hint: HINT_RACE, outcome: RACE_STAKES, c: race(["der Beruf", "die Arbeit", "die Stelle", "die Firma", "gestern", "früher", "gestern Abend", "letztes Jahr", "der Kollege", "der Hausmann"]) },
  elif("Mein Brief! Möwe, das ist kein Fischbrötchen! Das bist du!", "Моё письмо! Чайка, это не рыбная булочка! Это же про тебя!"),
  dana("Morgen ist der letzte Tag. Und Samstag: Regen, nasse Farbe, Start. Wir brauchen einen Plan.", "Завтра последний день. А в субботу: дождь, мокрая краска, старт. Нам нужен план."),
  {
    t: "pick",
    task: "Что нового за день?",
    options: [
      ok("Правда раскрыта: табличку обновила Грета к столетию клуба, торт испёк Матео, команда в заговоре"),
      no("Табличку украла фирма", "Фирме клуб отказал. Табличка у Греты."),
      no("Праздник отменили из-за дождя", "Праздник будет. Дождь — проблема краски, а не праздника."),
    ],
  },
  { t: "game", task: "Лото на ночь: послушайте слово и закройте его на карточке.", hint: HINT_HEAR, c: bingo(["der Beruf", "die Arbeit", "die Stelle", "die Firma", "der Koch", "die Köchin", "der Mechaniker", "der Student", "der Kollege"]) },
  {
    t: "type",
    rule: ["arbeit/perfekt-2"],
    task: "Запишите итог дня одной фразой: «Мы нашли табличку».",
    answers: ["Wir haben das Schild gefunden.", "Wir haben das Schild gefunden!", "Heute haben wir das Schild gefunden."],
    ru: "Мы нашли табличку.",
  },
  hauke("Gute Nacht, Möwe. Morgen hast du viel Arbeit – du bist die Wache!", "Спокойной ночи, чайка. Завтра у тебя много работы — ты в карауле!"),
  narr("Вы закрываете блокнот: «День одиннадцатый. Wir haben das Schild gefunden. Greta hat es gemalt. Samstag: es regnet». Noch ein Tag."),
  {
    t: "clue",
    title: "Noch ein Tag",
    text: "Das Schild ist in der Werkstatt — schön, aber nicht trocken. Samstag: es regnet. Die Party, Opa Hansen — und der Kuchen von Mateo im Kühlschrank.",
  },
];

const play = (nodes: SceneNode[]) => ({ kind: "play" as const, nodes });

export const sceneChapter11: Episode = {
  id: "moin-neu-11",
  title: "Was ist passiert?",
  day: { de: "Noch zwei Tage", ru: "ещё два дня до Kieler Woche" },
  place: "Клуб и мастерская в Гаардене · все за одним столом",
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
      title: "Die Werkstatt",
      story: [],
      prompt: "Одиннадцать часов: Грета и Йенсен отвечают записками.",
      hint: "Ich habe gearbeitet. — haben второй, причастие в конце.",
      success: "Табличку отдали в воскресенье в половине шестого, за чаем. Грета её покрасила.",
      challenge: play(werkstatt),
    },
    {
      id: "11-s3",
      title: "Warum?",
      story: [],
      prompt: "Зачем был нужен секрет: Opa, фирма и фото 1976 года.",
      hint: "Waren Sie 1976 auch da? — «были» — war.",
      success: "Столетие клуба, отказ фирме и сюрприз для Opa Hansen.",
      challenge: play(warum),
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
      title: "Ein Geheimnis",
      story: [],
      prompt: "Заговор до субботы, приглашение для Opa Hansen и мокрая краска.",
      hint: "Hauke soll das Schild tragen. — так просит фрау Петерсен: sollen.",
      success: "Все молчат до субботы. Но краска не высохла, а в субботу дождь.",
      challenge: play(geheim),
    },
    {
      id: "11-s6",
      title: "Noch zwei Tage",
      story: [],
      prompt: "Ночь перед последним днём: письмо с Гельголанда и речь как на экзамене.",
      hint: "Gestern hatte ich keine Zeit. — hatte + kein.",
      success: "День одиннадцатый закончен. Noch ein Tag.",
      challenge: play(nacht),
    },
  ],
};
