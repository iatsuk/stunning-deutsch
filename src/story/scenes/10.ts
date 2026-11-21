import { an, ANSWER, ASK, bingo, docks, gaps, gruss, gull as race, HINT_DOCK, HINT_HEAR, HINT_LETTER, HINT_LOCK, HINT_ODD, HINT_ORAL, HINT_PICTURE, HINT_RACE, HINT_SAY, letter, lock, odd, oral, order, RACE, RACE_STAKES, reply as oralReply, REQUEST, say as oralSay, scene, sort, speak, verdict, write } from "../build.ts";
import { phrases } from "../data.ts";
import type { Challenge, Episode, SceneNode } from "../types.ts";
import { back } from "./back.ts";

// Глава 10 в формате сцен (A1-PLOT.md, «Формат сцен»): здоровье и врач, части тела, «у меня болит»,
// müssen и dürfen, повелительное на du и ihr, а сверх уроков — sollen и сводная таблица модальных
// глаголов (раздел «Модальные глаголы в новой версии»). Вопрос главы — почему Йенсен молчит. Вход —
// Йенсен в десять у врача, выход — «Sie dürfen bis Samstag nicht sprechen», первые записки Йенсена и
// одно слово в подаренном блокноте: «Firma.» Ложный след (A1-PLOT.md, «Переработка глав 6–12»): слово
// верное, но ведёт не туда; Фрауке приносит визитку фрау Claasen, и завтра в одиннадцать команда едет
// в фирму. Повороты брошены оракулом (seeds 1794686082 и 1795220689), увязка — в журнале
// A1-STORYCRAFT.md.

const narr = (text: string): SceneNode => ({ t: "narr", text });
const learn = (words?: string[]) => (words ? { learn: words } : {});
const hauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Hauke", voice: "Rocko", de, ru, ...learn(words) });
const elif = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Elif", voice: "Flo", de, ru, ...learn(words) });
const dana = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Dana", voice: "Anna", de, ru, ...learn(words) });
const mateo = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Mateo", voice: "Reed", de, ru, ...learn(words) });
const frauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frauke", voice: "Sandy", de, ru, ...learn(words) });
const petersen = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frau Petersen", voice: "Sandy", de, ru, ...learn(words) });
const moeller = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frau Möller", voice: "Shelley", de, ru, ...learn(words) });
const sommer = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Dr. Sommer", voice: "Eddy", de, ru, ...learn(words) });
/** Пары памяти — из выражений истории, которые глава уже показала. */
const memory = (ids: string[]): Challenge => ({ kind: "memory", pairs: ids.map((id) => ({ id, de: phrases[id].de, ru: phrases[id].ru })) });
const ok = (text: string) => ({ text, ok: true as const });
const no = (text: string, react: string) => ({ text, react });

const DANA_BETT = "Diagnose: Gaarden, Regen, Fahrrad. Du hast Fieber. Bleib im Bett!";
const SOMMER_NEIN = "Herr Jensen ist nicht sehr krank. Aber der Hals! Er darf bis Samstag nicht sprechen.";
const SOMMER_TEE = "Und er soll viel Tee trinken und zu Hause bleiben.";
const PETERSEN = "Hier ist Frau Petersen. Samstag, die Party am Club: Elif soll die Teller mitbringen. Hauke soll im Bett bleiben. Und Mateo soll den Ku… nein, nichts!";

// Сцена 1 · пролог и завязка: Хауке простудился. Бросок: событие за кадром · чайка · неверно
// перевести · die Erkältung · 19 — ночью в клубе чайка приняла средство Фрауке для Йенсена за еду и
// съела всё; Элиф уверяет, что чайки не болеют. Бросок: герой по черте · чайка · неверно перевести ·
// das Ohr · 3 (мелочь) — есть ли у чайки уши.
const hatschi: SceneNode[] = [
  { t: "pic", src: "10-hatschi.jpg", alt: "Утро среды в клубе: Хауке закутан в плед на диване, красный нос, кружка чая; Дана с градусником; Элиф разглядывает пустую упаковку от лекарства, рядом довольная чайка" },
  narr("Zehnter Tag, Mittwoch, noch drei Tage. Im Club liegt Hauke auf dem Sofa, mit Tee. Die Nase ist {rot}."),
  hauke("Hatschi! Ich habe eine Erkältung. Mein Kopf tut weh, mein Hals tut weh …", "Апчхи! У меня простуда. Голова болит, горло болит…", ["die Erkältung", "der Hals"]),
  { t: "gap", rule: ["gesundheit/check-1"], task: "Что говорит Хауке?", text: "Mein Kopf ___ weh.", options: ["tut", "tun", "hat"], answer: "tut", ru: "У меня болит голова." },
  dana(DANA_BETT, "Диагноз: Гаарден, дождь, велосипед. У тебя температура. Лежи в постели!", ["das Fieber"]),
  {
    t: "hear",
    task: "Что Дана велит Хауке?",
    voice: "Anna",
    de: DANA_BETT,
    options: ["лежать в постели: у него температура", "ехать к врачу", "пить кофе и работать"],
    answer: "лежать в постели: у него температура",
  },
  { t: "game", task: "Дана диктует диагноз. Повторите за ней вслух.", hint: HINT_SAY, c: speak(["die Erkältung", "das Fieber", "der Hals"]) },
  {
    t: "game",
    task: "Хауке жалуется на всё сразу. Послушайте слово и нажмите на картинку.",
    hint: HINT_PICTURE,
    c: scene([["der Kopf", "🤕"], ["das Ohr", "👂"], ["das Auge", "👁️"], ["die Nase", "👃"], ["der Zahn", "🦷"], ["der Arm", "💪"], ["das Bein", "🦵"], ["der Fuß", "🦶"]]),
  },
  narr("Auf dem Tisch — eine Packung, leer. В ней было Medikament von Frauke für Herrn Jensen. Die Möwe ist sehr gesund."),
  elif("Die Möwe hat das Medikament gegessen? Kein Problem. Möwen werden nicht krank!", "Чайка съела лекарство? Не страшно. Чайки не болеют!"),
  {
    t: "hear",
    task: "Что Элиф говорит о чайках?",
    voice: "Flo",
    de: "Die Möwe hat das Medikament gegessen? Kein Problem. Möwen werden nicht krank!",
    options: ["чайки не болеют", "чайке нужно к врачу", "лекарство было для чайки"],
    answer: "чайки не болеют",
  },
  hauke("Und hat die Möwe Ohren? Ich sehe keine Ohren!", "А у чайки есть уши? Я не вижу ушей!"),
  elif("Natürlich! Hinter den Augen. Sie hört alles – auch dein Hatschi!", "Конечно! За глазами. Она всё слышит — и твоё апчхи тоже!"),
  {
    t: "reply",
    task: "Пожелайте Хауке скорее поправиться.",
    options: [
      ok("Gute Besserung, Hauke!"),
      no("Guten Appetit, Hauke!", "Это «приятного аппетита». Больному говорят Gute Besserung."),
      no("Gute Nacht, Hauke!", "Сейчас утро. Больному — Gute Besserung."),
    ],
  },
  dana("Gute Besserung, Hauke! Und viel Tee!", "Выздоравливай, Хауке! И побольше чая!", ["Gute Besserung!"]),
  narr("Хауке пытается {aussehen} бодрым, но выглядит {schlecht}. Тут и {glueck} не поможет — Дана уже несёт градусник."),
  {
    t: "type",
    rule: ["gesundheit/muessen-2"],
    task: "Запишите в блокнот: Хауке должен лежать в постели.",
    answers: ["Hauke muss im Bett bleiben.", "Er muss im Bett bleiben."],
    ru: "Хауке должен лежать в постели.",
  },
  elif("Ich habe auch Kopfschmerzen – vom Sturm. Ich habe einen Termin: heute, Viertel nach zehn, Praxis Doktor Sommer!", "У меня тоже болит голова — от шторма. У меня запись: сегодня, в четверть одиннадцатого, практика доктора Зоммера!", ["der Termin", "der Doktor", "der Schmerz"]),
  {
    t: "hear",
    task: "На сколько записана Элиф?",
    voice: "Flo",
    de: "Ich habe auch Kopfschmerzen – vom Sturm. Ich habe einen Termin: heute, Viertel nach zehn, Praxis Doktor Sommer!",
    options: ["на 10:15", "на 10:00", "на 10:45"],
    answer: "на 10:15",
  },
  dana("Doktor Sommer? Da ist Herr Jensen um zehn! Ich kenne Doktor Sommer. Wir kommen mit!", "Доктор Зоммер? У него Йенсен в десять! Я знаю доктора Зоммера. Мы идём с тобой!"),
  {
    t: "pick",
    task: "Почему это удача для дела?",
    options: [
      ok("Запись Элиф — к тому же врачу, к которому в десять придёт Йенсен"),
      no("Дана будет лечить Йенсена сама", "Дана только знает доктора Зоммера. Лечит он."),
      no("Хауке поедет к врачу вместе со всеми", "Хауке велено лежать в постели."),
    ],
  },
  narr("Хауке болеет громко. Болит всё: голова, горло, {mund}. Только {haar}, говорит, в порядке."),
  { t: "game", task: "Хауке диктует из-под пледа, что у него болит. Разложите слова по ящикам Йенсена.", hint: HINT_DOCK, c: docks(["der Kopf", "das Auge", "das Ohr", "die Nase", "der Zahn", "der Hals", "der Arm", "die Hand", "der Bauch", "der Mund", "das Haar"]) },
  mateo("Hauke ist krank? Ich koche Suppe! Iss, Hauke!", "Хауке болеет? Я варю суп! Ешь, Хауке!"),
  { t: "gap", rule: ["gesundheit/imperativ-3"], task: "Что говорит Матео?", text: "___ die Suppe, Hauke!", options: ["Iss", "Isst", "Esse"], answer: "Iss", ru: "Ешь суп, Хауке!" },
  {
    t: "game",
    task: "Матео варит суп. Подавайте ему продукты по его словам.",
    hint: "Kein Fleisch — мясо не берём.",
    c: {
      kind: "craft",
      who: "Mateo",
      voice: "Reed",
      shelf: [
        { id: "kartoffel", de: "die Kartoffel", ru: "картофель", icon: "🥔" },
        { id: "tomate", de: "die Tomate", ru: "помидор", icon: "🍅" },
        { id: "zwiebel", de: "die Zwiebel", ru: "лук", icon: "🧅" },
        { id: "ei", de: "das Ei", ru: "яйцо", icon: "🥚" },
        { id: "fleisch", de: "das Fleisch", ru: "мясо", icon: "🥩" },
        { id: "fisch", de: "der Fisch", ru: "рыба", icon: "🐟" },
        { id: "apfel", de: "der Apfel", ru: "яблоко", icon: "🍎" },
      ],
      steps: [
        { de: "Zuerst drei Kartoffeln.", ru: "Сначала три картофелины.", take: { kartoffel: 3 } },
        { de: "Dann zwei Tomaten und eine Zwiebel.", ru: "Потом два помидора и одну луковицу.", take: { tomate: 2, zwiebel: 1 } },
        { de: "Kein Fleisch – Hauke ist krank. Aber ein Ei!", ru: "Мяса не надо — Хауке болеет. Но одно яйцо!", take: { ei: 1 } },
      ],
    },
  },
  narr("Суп готов: drei Kartoffeln, zwei Tomaten, eine Zwiebel und ein Ei. Хауке ест из-под пледа — и жалуется уже тише."),
  {
    t: "clue",
    title: "Erkältung",
    text: "Hauke: Erkältung, Fieber — er muss im Bett bleiben. Das Medikament von Frauke für Herrn Jensen: leer, die Möwe. Elif: Termin bei Doktor Sommer, Viertel nach zehn. Herr Jensen: um zehn.",
  },
];

// Сцена 2 · развитие: дом врачей, лифт и регистратура. Бросок: новый человек · Элиф · обменять ·
// der Kopf · 14 — новый человек — фрау Мёллер в регистратуре: без записи в приёмную не пускает,
// а Элиф с головной болью записана и проводит команду с собой.
const praxis: SceneNode[] = [
  { t: "pic", src: "10-aerztehaus.jpg", alt: "Холл дома врачей: за окном гавань и краны; Дана и Элиф входят в лифт, позади на стульях двое пациентов — мужчина держится за щёку, пожилая женщина с рецептом" },
  narr("Das {aerztehaus} am Hafen: im Erdgeschoss die Apotheke, im dritten Stock — Doktor Sommer. В лифте тесно."),
  dana("Dritter Stock! Und bitte langsam – Elif hat Kopfschmerzen.", "Третий этаж! И, пожалуйста, медленно — у Элиф болит голова."),
  narr("Кнопки в лифте старые: {druecken} приходится двумя пальцами."),
  {
    t: "game",
    rule: ["wohnen/stock-1"],
    task: "В лифте все называют свой этаж. Нажмите нужную кнопку.",
    hint: "Erdgeschoss — наш первый этаж, erster Stock — наш второй.",
    c: {
      kind: "lift",
      top: 3,
      rounds: [
        { who: "Ein Mann", de: "Mein Zahn! Zum Zahnarzt, bitte – erster Stock.", ru: "Мой зуб! К зубному, пожалуйста, — второй этаж.", floor: 1 },
        { who: "Eine Frau", de: "Ich habe ein Rezept. Die Apotheke ist im Erdgeschoss.", ru: "У меня рецепт. Аптека на первом этаже.", floor: 0 },
        { who: "Dana", de: "Und wir fahren in den dritten Stock. Zu Doktor Sommer!", ru: "А мы едем на четвёртый этаж. К доктору Зоммеру!", floor: 3 },
      ],
    },
  },
  { t: "gap", rule: ["wohnen/stock-1"], task: "Где практика доктора Зоммера?", text: "Die Praxis ist im ___ Stock.", options: ["dritten", "drei", "dritte"], answer: "dritten", ru: "Практика на четвёртом этаже." },
  narr("Dritter Stock. {anmeldung}: alles weiß und ruhig — und Frau Möller. Sie sieht alles."),
  {
    t: "look",
    task: "Осмотритесь у регистратуры.",
    items: [
      { icon: "🪑", de: "das Wartezimmer", ru: "приёмная", note: "За стеклянной дверью — мужчина в шарфе и женщина в комбинезоне. Йенсен и Грета!", key: true },
      { icon: "💳", de: "die Versichertenkarte", ru: "страховая карточка", note: "Без неё в практике ничего не сделают: ни приёма, ни рецепта.", key: true },
      { icon: "💊", de: "die Tablette", ru: "таблетка", note: "На стойке коробка с таблетками. Не для вас — и не для чайки." },
    ],
  },
  elif("Anmeldung – von anmelden. Wie Wohnung – von wohnen!", "Анмельдунг — от anmelden. Как Wohnung — от wohnen!", ["anmelden"]),
  {
    t: "pick",
    rule: ["moin/ung-1"],
    task: "Элиф любит семьи слов. Какого рода Anmeldung?",
    options: [
      ok("die: слова на -ung — женского рода"),
      no("der: как der Termin", "Termin — без -ung. Все слова на -ung — die: die Anmeldung, die Wohnung."),
      no("das: как das Wartezimmer", "Род сложного слова — по последней части, а у слова на -ung — всегда die."),
    ],
  },
  moeller("Guten Morgen! Haben Sie einen Termin? Und Ihre Versichertenkarte, bitte!", "Доброе утро! У вас есть запись? И вашу страховую карточку, пожалуйста!", ["die Versichertenkarte"]),
  { t: "gap", task: "Что спрашивает фрау Мёллер?", text: "Haben Sie einen ___?", options: ["Termin", "Zahn", "Lift"], answer: "Termin", ru: "У вас есть запись?" },
  elif("Ja! Viertel nach zehn. Ich habe Kopfschmerzen. Hier ist meine Karte.", "Да! Четверть одиннадцатого. У меня болит голова. Вот моя карточка."),
  {
    t: "hear",
    task: "Что Элиф отвечает фрау Мёллер?",
    voice: "Flo",
    de: "Ja! Viertel nach zehn. Ich habe Kopfschmerzen. Hier ist meine Karte.",
    options: ["записана на 10:15, болит голова, вот карточка", "записи нет, но болит голова", "пришла за рецептом"],
    answer: "записана на 10:15, болит голова, вот карточка",
  },
  moeller("Füllen Sie bitte dieses Formular aus. Und hier darf man nicht telefonieren!", "Заполните, пожалуйста, эту анкету. И здесь нельзя говорить по телефону!", ["ausfüllen"]),
  {
    t: "game",
    task: "Фрау Мёллер заводит карточку пациентки. Заполните её по разговору.",
    hint: "Слушайте Элиф: когда записана и что болит.",
    c: write("Patientin", [
      ["Name", "Elif"],
      ["Termin", "Viertel nach zehn", "10:15", "um Viertel nach zehn"],
      ["Was haben Sie?", "Kopfschmerzen", "Ich habe Kopfschmerzen.", "Kopfschmerzen."],
    ]),
  },
  moeller("Und die zwei? Ohne Termin? Nur Patienten im Wartezimmer!", "А эти двое? Без записи? В приёмной — только пациенты!"),
  elif("Das sind meine Freunde. Ich habe Kopfschmerzen – ich brauche Hilfe!", "Это мои друзья. У меня болит голова — мне нужна помощь!"),
  {
    t: "reply",
    rule: ["gesundheit/check-2"],
    task: "Вежливо спросите фрау Мёллер, можно ли вам подождать.",
    options: [
      ok("Darf ich hier warten?"),
      no("Darf ich hier wartet?", "После dürfen — инфинитив в конце: warten."),
      no("Ich darf hier warten?", "Вопрос «да или нет»: глагол первым — Darf ich …?"),
    ],
  },
  moeller("Na gut. Im Wartezimmer. Aber leise, bitte!", "Ну ладно. В приёмной. Но тихо, пожалуйста!", ["leise"]),
  {
    t: "hear",
    task: "Что разрешила фрау Мёллер?",
    voice: "Shelley",
    de: "Na gut. Im Wartezimmer. Aber leise, bitte!",
    options: ["ждать в приёмной, но тихо", "зайти к врачу", "подождать на улице"],
    answer: "ждать в приёмной, но тихо",
  },
  {
    t: "pick",
    task: "Почему фрау Мёллер вас пустила?",
    options: [
      ok("Элиф — пациентка, а вы пришли с ней"),
      no("Дана показала удостоверение врача", "Дана молчит. Пустили из-за Элиф."),
      no("Йенсен позвал вас запиской", "Йенсен ещё не знает, что вы здесь."),
    ],
  },
  moeller("Sie warten etwa zwanzig Minuten.", "Ждать примерно двадцать минут.", ["etwa"]),
  narr("На стене Wartezimmer — плакат: {zigarette}, перечёркнутая. Rauchen verboten!"),
  narr("Фрау Мёллер умеет только запрещать, а {erlauben} не любит."),
  {
    t: "game",
    task: "На дверях практики длинные слова. Соберите каждое из частей и выберите род.",
    hint: "Род — по последней части: das Zimmer → das Wartezimmer.",
    c: {
      kind: "compound",
      rounds: [
        { word: "das Wartezimmer", parts: ["Warte", "Zimmer"], ru: "приёмная, комната ожидания" },
        { word: "die Versichertenkarte", parts: ["Versicherten", "Karte"], ru: "страховая карточка" },
        { word: "das Krankenhaus", parts: ["Kranken", "Haus"], ru: "больница" },
      ],
      extra: ["Arzt", "Tee", "Bett"],
    },
  },
  {
    t: "type",
    rule: ["gesundheit/schmerzen-1"],
    task: "Запишите за Элиф по-другому: у неё болит голова.",
    answers: ["Mein Kopf tut weh.", "Ihr Kopf tut weh.", "Elif hat Kopfschmerzen."],
    ru: "У меня болит голова.",
  },
  {
    t: "clue",
    title: "Anmeldung",
    text: "Ärztehaus am Hafen, dritter Stock: Praxis Doktor Sommer. Frau Möller: nur mit Termin ins Wartezimmer. Elif hat einen Termin, wir warten mit.",
  },
];

// Сцена 3 · развитие: приёмная, свидетели в своём порядке. Бросок: нить закрывается раньше срока ·
// Грета · обменять · der Rücken · 9 — Грета здесь со спиной (табличка тяжёлая) и без записи; Элиф
// отдаёт ей свою запись. Бросок: герой по черте · Дана · спрятать · der Kopf · 6 — Дана, которая
// ставит диагнозы всему, прячет голову за журналом: здесь она не врач.
const warten: SceneNode[] = [
  { t: "pic", src: "10-wartezimmer.jpg", alt: "Приёмная врача: Йенсен в шарфе молча пишет в маленьком блоке, рядом Грета в комбинезоне держится за поясницу; Дана спряталась за журналом, Элиф машет Грете" },
  narr("Im Wartezimmer: Herr Jensen. {schal}, eine Tasse Tee, {notizblock} — und kein Wort. Neben ihm: Greta. Она держится за спину."),
  elif("Herr Jensen! Und Greta! Hier sind sie!", "Господин Йенсен! И Грета! Вот они где!"),
  moeller("Die zwei warten schon über zwanzig Minuten. Wen suchen Sie denn?", "Эти двое ждут уже больше двадцати минут. А вы кого ищете?"),
  { t: "gap", rule: ["moin/zeit-1"], task: "Сколько уже ждут Йенсен и Грета?", text: "Sie warten schon ___ zwanzig Minuten.", options: ["über", "für", "ab"], answer: "über", ru: "Они ждут уже больше двадцати минут." },
  {
    t: "go",
    task: "С кем поговорить в приёмной?",
    next: "Дальше по делу",
    branches: [
      {
        label: "Йенсен и блок",
        icon: "📝",
        nodes: [
          {
            t: "reply",
            task: "Спросите Йенсена, что с ним.",
            options: [
              ok("Herr Jensen, was haben Sie?"),
              no("Herr Jensen, was hast du?", "С Йенсеном вы на «вы»: was haben Sie?"),
              no("Herr Jensen, wo haben Sie?", "Спрашиваем «что» — was."),
            ],
          },
          narr("Herr Jensen schreibt. Lange. Потом поворачивает к вам {notizblock}: «Hals. Ich darf nicht sprechen. Noch eine Frage?»"),
          {
            t: "type",
            rule: ["gesundheit/muessen-4"],
            task: "Запишите в блокнот, что написал Йенсен.",
            answers: ["Herr Jensen darf nicht sprechen.", "Er darf nicht sprechen."],
            ru: "Господину Йенсену нельзя говорить.",
          },
          elif("Noch eine Frage? Er schreibt mehr als er spricht!", "«Ещё вопрос?» Он пишет больше, чем говорит!"),
          {
            t: "reply",
            task: "Задайте Йенсену главный вопрос — тот, что с первого дня.",
            options: [
              ok("Noch eine Frage: Wo ist das Schild?"),
              no("Noch eine Frage: Wo sind das Schild?", "das Schild — одна табличка: Wo ist …?"),
              no("Noch eine Frage: Wer ist das Schild?", "Спрашиваем о месте — wo."),
            ],
          },
          narr("Herr Jensen schreibt nur ein Wort: «Später.» Und trinkt Tee."),
        ],
      },
      {
        label: "Грета и спина",
        icon: "🧍",
        nodes: [
          narr("Greta schreibt auf eine Serviette: «Rücken. Das Schild ist schwer. Kein Termin.»"),
          {
            t: "look",
            task: "Присмотритесь к Грете.",
            items: [
              { icon: "🧍", de: "der Rücken", ru: "спина", note: "Грета держится за поясницу: тяжёлое она носила недавно.", key: true },
              { icon: "✋", de: "die Hand", ru: "рука, кисть", note: "На пальцах — тёмно-синяя краска. Свежая.", key: true },
              { icon: "🥾", de: "der Fuß", ru: "нога, ступня", note: "Рабочие ботинки в белых каплях краски." },
            ],
          },
          elif("Kein Termin? Nehmen Sie meinen! Mein Kopf ist schon besser.", "Нет записи? Возьмите мою! Голова у меня уже лучше.", ["besser"]),
          {
            t: "hear",
            task: "Что предлагает Элиф?",
            voice: "Flo",
            de: "Kein Termin? Nehmen Sie meinen! Mein Kopf ist schon besser.",
            options: ["отдать Грете свою запись", "отвезти Грету домой", "дать Грете таблетку"],
            answer: "отдать Грете свою запись",
          },
          narr("Greta schreibt: «Danke!» Впервые она смотрит на Элиф — и улыбается."),
        ],
      },
      {
        label: "Дана за журналом",
        icon: "📰",
        nodes: [
          narr("Дану не видно: перед лицом — {zeitschrift}. Торчат только волосы."),
          dana("Psst! Ich sage nichts. Hier bin ich keine Ärztin. Schweigepflicht!", "Тсс! Я ничего не скажу. Здесь я не врач. Врачебная тайна!"),
          {
            t: "pick",
            task: "Почему Дана, которая ставит диагнозы всему, молчит?",
            options: [
              ok("Здесь лечит доктор Зоммер, а о чужих пациентах врач молчит"),
              no("Она не знает, что с Йенсеном", "Она врач и видит его шарф. Но говорить не будет."),
              no("Она обиделась на Хауке", "Хауке дома. Дело во врачебной тайне."),
            ],
          },
          { t: "gap", task: "Что говорит о себе Дана?", text: "Hier bin ich keine ___.", options: ["Ärztin", "Patientin", "Möwe"], answer: "Ärztin", ru: "Здесь я не врач." },
        ],
      },
    ],
  },
  moeller("Herr Jensen, bitte! Doktor Sommer wartet.", "Господин Йенсен, пожалуйста! Доктор Зоммер ждёт."),
  narr("Herr Jensen geht — mit Tee und Notizblock. Greta wartet."),
  {
    t: "game",
    task: "Что вы знаете о Йенсене и Грете? Проверьте блокнот.",
    c: verdict(["Richtig", "Falsch"], [
      ["Йенсену нельзя говорить", true, "«Ich darf nicht sprechen» — написал он сам."],
      ["У Греты болит голова", false, "Голова болит у Элиф. У Греты — спина."],
      ["Грета носила что-то тяжёлое", true, "«Das Schild ist schwer» — табличка тяжёлая."],
    ]),
  },
  {
    t: "game",
    task: "Комикс из приёмной врача: кто что сказал? Расставьте реплики по кадрам.",
    hint: "Посмотрите на жест и предмет в кадре. Одно облачко лишнее.",
    c: {
      kind: "comic",
      panels: [
        { id: "p1", who: "Herr Jensen", pic: "10-comic-1.jpg", scene: "Йенсен в шарфе показывает на горло и протягивает блокнот.", answer: "Ich darf nicht sprechen.", ru: "Мне нельзя говорить." },
        { id: "p2", who: "Greta", pic: "10-comic-2.jpg", scene: "Грета держится за поясницу.", answer: "Mein Rücken tut weh.", ru: "У меня болит спина." },
        { id: "p3", who: "Elif", pic: "10-comic-3.jpg", scene: "Элиф уступает Грете свою очередь к врачу.", answer: "Nehmen Sie meinen Termin!", ru: "Возьмите мою запись!" },
        { id: "p4", who: "Dana", pic: "10-comic-4.jpg", scene: "Дана прячется за журналом и хранит врачебную тайну.", answer: "Hier bin ich keine Ärztin.", ru: "Здесь я не врач." },
      ],
      extra: ["Ich habe Fieber!"],
    },
  },
  elif("Das Schild ist schwer – und Greta trägt es. Aber warum?", "Табличка тяжёлая — и Грета её носит. Но зачем?"),
  narr("Хауке уверен: тяжёлую табличку Грета носит туда же — в {firma}. Для него это ясно как день."),
  {
    t: "gap",
    rule: ["gesundheit/check-1"],
    task: "Что болит у Греты?",
    text: "Ihr Rücken ___ weh.",
    options: ["tut", "tun", "ist"],
    answer: "tut",
    ru: "У неё болит спина.",
  },
  {
    t: "game",
    task: "Элиф проверяет, кто что запомнил: одно слово в группе лишнее.",
    hint: HINT_ODD,
    c: odd([
      [["der Kopf", "der Arm", "das Bein", "das Fieber"], "das Fieber", "Fieber — температура, остальное — части тела."],
      [["der Husten", "der Schnupfen", "die Erkältung", "die Hand"], "die Hand", "Hand — часть тела, остальное — простуда."],
      [["der Arzt", "die Praxis", "der Termin", "die Nase"], "die Nase", "Nase — часть тела, остальное — визит к врачу."],
    ]),
  },
  {
    t: "game",
    rule: ["gesundheit/muessen-2"],
    task: "Соберите вывод для блокнота.",
    hint: "Модальный глагол второй, инфинитив в конце.",
    c: order(["Herr", "Jensen", "darf", "nicht", "sprechen."], ["sprechen.", "darf", "Herr", "nicht", "Jensen"]),
  },
  {
    t: "clue",
    title: "Im Wartezimmer",
    text: "Herr Jensen: Hals, er darf nicht sprechen, er schreibt. Greta: Rücken, «Das Schild ist schwer». Der Termin von Elif ist jetzt für Greta. Dana sagt nichts.",
  },
];

// Сцена 4 · поворот: врач объясняет молчание. Йенсену нельзя говорить до субботы — до старта
// Kieler Woche; «Sie sollen viel Tee trinken» — sollen. Йенсен пишет первую длинную записку
// (сквозная шутка: целая страница). Бросок: нить закрывается раньше срока · Дана · подарить ·
// das Wartezimmer · 1 (обратный эффект): Дана дарит ему новый блокнот, чтобы он всё объяснил, а он
// пишет одно слово — «Firma.». Слух о том, что он не заговорит никогда,
// опровергает врач — «Найди противоречие». План лекарств — раскладка.
const sommerS: SceneNode[] = [
  { t: "pic", src: "10-sommer.jpg", alt: "Дверь кабинета: доктор Зоммер в белом халате и круглых очках выходит с Йенсеном; Йенсен поднимает блок, исписанный до конца страницы; Элиф и Дана читают" },
  narr("Zehn Minuten. Dann kommt Doktor Sommer — mit Herrn Jensen. Дана выглядывает из-за журнала."),
  sommer(SOMMER_NEIN, "Господин Йенсен не очень болен. Но горло! Ему нельзя говорить до субботы.", ["dürfen"]),
  {
    t: "hear",
    task: "Что сказал доктор Зоммер?",
    voice: "Eddy",
    de: SOMMER_NEIN,
    options: ["до субботы Йенсену нельзя говорить", "Йенсен тяжело болен", "Йенсену нужно в больницу"],
    answer: "до субботы Йенсену нельзя говорить",
  },
  dana("Er darf nicht sprechen, denn sein Hals ist krank.", "Ему нельзя говорить: у него больное горло."),
  sommer(SOMMER_TEE, "И пусть пьёт много чая и сидит дома."),
  {
    t: "gap",
    rule: ["moin/sollen-1"],
    task: "Что велел врач? Перескажите за Даной.",
    text: "Herr Jensen ___ viel Tee trinken.",
    options: ["soll", "sollst", "sollen"],
    answer: "soll",
    ru: "Господину Йенсену велено пить много чая.",
  },
  narr("У Йенсена всё {normal}: температура 36,6. Он почти {gluecklich}: молчать он умеет лучше всех."),
  {
    t: "game",
    rule: ["moin/sollen-1"],
    task: "Соберите совет врача так, как его перескажет Йенсену Дана.",
    hint: "sollen — второй, инфинитив trinken — в самом конце.",
    c: order(["Sie", "sollen", "viel", "Tee", "trinken."], ["trinken.", "Tee", "Sie", "viel", "sollen"]),
  },
  dana("Bis Samstag? Samstag ist Kieler Woche! Und der Start!", "До субботы? В субботу Kieler Woche! И старт!"),
  narr("Herr Jensen schreibt — целую страницу: «Bis Samstag kein Wort. Kein Moin. Tee: ja. Viel Tee. Ich trinke immer Tee. Noch eine Frage?»"),
  {
    t: "look",
    task: "Рассмотрите Йенсена после приёма.",
    items: [
      { icon: "📝", de: "der Notizblock", ru: "блок для записок", note: "Исписана целая страница. Столько Йенсен не говорил за всю неделю.", key: true },
      { icon: "🧣", de: "der Schal", ru: "шарф", note: "Шарф в июне: врач велел беречь горло.", key: true },
      { icon: "🍵", de: "der Tee", ru: "чай", note: "Третья кружка за утро. Наконец-то по рецепту." },
    ],
  },
  narr("Доктор Зоммер не {boese}, просто строгий. Его любимый глагол — {empfehlen}: чай, сон, тишина."),
  elif("Eine ganze Seite! Herr Jensen, Sie schreiben heute wie ein Buch!", "Целая страница! Господин Йенсен, вы сегодня пишете, как книга!"),
  {
    t: "reply",
    rule: ["moin/sollen-1"],
    task: "Элиф не расслышала. Перескажите ей, что велел врач.",
    options: [
      ok("Er soll zu Hause bleiben."),
      no("Er sollt zu Hause bleiben.", "er soll — без окончания, как er kann."),
      no("Er soll bleiben zu Hause.", "Инфинитив — в конце: zu Hause bleiben."),
    ],
  },
  sommer("Das Rezept: am Morgen eine Tablette und Tee. Am Mittag Suppe. Am Abend die zweite Tablette – und schlafen!", "Рецепт: утром таблетка и чай. В обед суп. Вечером вторая таблетка — и спать!", ["die Tablette"]),
  {
    t: "hear",
    task: "Что Йенсену можно в обед?",
    voice: "Eddy",
    de: "Das Rezept: am Morgen eine Tablette und Tee. Am Mittag Suppe. Am Abend die zweite Tablette – und schlafen!",
    options: ["суп", "таблетку", "кофе"],
    answer: "суп",
  },
  {
    t: "game",
    rule: ["gesundheit/muessen-2"],
    task: "Составьте план лекарств Йенсена по словам врача.",
    hint: "Перечитайте рецепт: утро, обед, вечер.",
    c: sort([["morgen", "am Morgen"], ["mittag", "am Mittag"], ["abend", "am Abend"]], [
      ["t1", "die erste Tablette", "morgen", "💊"],
      ["tee", "Tee", "morgen", "🍵"],
      ["suppe", "Suppe", "mittag", "🥣"],
      ["t2", "die zweite Tablette", "abend", "💊"],
      ["schlaf", "schlafen", "abend", "🛏️"],
    ]),
  },
  sommer("Wenn es wehtut, nehmen Sie eine Tablette. Wenn nicht – keine!", "Если болит — примите таблетку. Если нет — не надо!"),
  {
    t: "pick",
    rule: ["moin/wenn-1"],
    task: "Когда Йенсену можно принять ещё одну таблетку?",
    options: [
      ok("Только если болит"),
      no("Каждый час", "Wenn es wehtut — только если болит."),
      no("Никогда", "Можно — wenn es wehtut, если болит."),
    ],
  },
  sommer("Die Tablette nimmt er nach dem Essen. Und für zwei Tage: kein Segeln!", "Таблетку он принимает после еды. И два дня — никаких парусов!"),
  { t: "gap", rule: ["moin/zeit-1"], task: "Когда Йенсену принимать таблетку?", text: "Er nimmt die Tablette ___ dem Essen.", options: ["nach", "vor", "für"], answer: "nach", ru: "Он принимает таблетку после еды." },
  narr("Nils schreibt: «Frauke sagt: Herr Jensen kann nie wieder sprechen!!! Nie!!!» Der ganze Hafen weiß es."),
  {
    t: "game",
    task: "Сравните слух с тем, что сказал врач. Отметьте два слова, которые не сходятся.",
    hint: "Как долго Йенсену нельзя говорить — по слуху и по словам врача?",
    c: {
      kind: "contra",
      texts: [
        { who: "Frauke (über Nils)", lines: [["Herr", "Jensen", "kann", "nie", "wieder", "sprechen!!!"]] },
        { who: "Dr. Sommer", lines: [["Er", "darf", "bis", "Samstag", "nicht", "sprechen."]] },
      ],
      answer: ["0:0:3", "1:0:3"],
    },
  },
  { t: "gap", task: "Как долго Йенсену нельзя говорить?", text: "Herr Jensen darf ___ Samstag nicht sprechen.", options: ["bis", "um", "am"], answer: "bis", ru: "Господину Йенсену нельзя говорить до субботы." },
  dana("Hier, ein neuer Notizblock – für Sie! Bitte schreiben Sie: Wo ist das Schild?", "Вот, новый блокнот — вам! Пожалуйста, напишите: где табличка?"),
  narr("Йенсен берёт подарок, долго смотрит в окно — и пишет одно слово: «Firma.» Блокнот на сто страниц, слово — одно."),
  dana("Firma? Die Firma mit dem Schild aus Plastik?", "Фирма? Та фирма с пластиковой табличкой?"),
  {
    t: "pick",
    task: "Что значит записка Йенсена?",
    options: [
      ok("Йенсен показывает на фирму — но что с ней, не пишет"),
      no("Йенсен — хозяин фирмы", "Он начальник гавани. О хозяине фирмы — ни слова."),
      no("Йенсен обижен и не хочет отвечать", "Он отвечает — одним словом. Для него это много."),
    ],
  },
  {
    t: "type",
    rule: ["moin/sollen-1"],
    task: "Запишите в блокнот, что велел врач.",
    answers: ["Er soll viel Tee trinken.", "Herr Jensen soll viel Tee trinken.", "Er soll zu Hause bleiben.", "Herr Jensen soll zu Hause bleiben."],
    ru: "Ему велено пить много чая.",
  },
  narr("Врачу {wichtig} одно: молчать. Говорить пока не {moeglich} — до субботы."),
  {
    t: "clue",
    title: "Bis Samstag",
    text: "Doktor Sommer: Herr Jensen darf bis Samstag nicht sprechen. Er soll viel Tee trinken und zu Hause bleiben. Der Notizblock von Dana für Herrn Jensen: ein Wort — «Firma.»",
  },
];

const FRAUKE_KARTE = "Und hier: die Karte von der Frau mit der Tasche! Sie war am Samstag am Kiosk.";
const DANA_FIRMA = "Morgen um elf fahren wir zur Firma. Frau Claasen soll alles erzählen!";

// Сцена 5 · кульминация: аптека внизу. Бросок: сквозная шутка обостряется · Фрауке · пообещать ·
// die Versichertenkarte · 15 — Фрауке обещала принести забытую Йенсеном карточку и приносит, а с ней
// открытку от всей гавани, а заодно визитку фрау Claasen из главы 6. Грета выходит от врача и только
// благодарит запиской. Чайка уносит рецепт — гонка. Замок урока и записка Хауке по образцу.
const apotheke: SceneNode[] = [
  { t: "pic", src: "10-apotheke.jpg", alt: "Аптека на первом этаже дома врачей: Фрауке в полосатом фартуке врывается с открыткой размером с поднос и протягивает Йенсену карточку; на пороге чайка с рецептом в клюве; Грета улыбается" },
  narr("In der Apotheke im Erdgeschoss. Das Rezept ist da. Aber die Versichertenkarte? — у Йенсена её нет."),
  {
    t: "look",
    task: "Осмотритесь в аптеке.",
    items: [
      { icon: "📄", de: "das Rezept", ru: "рецепт", note: "Рецепт доктора Зоммера. Матео решил бы, что это рецепт пирога: по-немецки слово одно.", key: true },
      { icon: "🧴", de: "das Medikament", ru: "лекарство", note: "Новая упаковка от горла — вместо той, что съела чайка.", key: true },
      { icon: "🏪", de: "die Apotheke", ru: "аптека", note: "Маленькая аптека в доме врачей. У кассы очередь." },
    ],
  },
  { t: "say", who: "Apothekerin", voice: "Shelley", de: "Guten Tag! Was kann ich für Sie tun?", ru: "Добрый день! Чем могу помочь?", learn: ["tun"] },
  { t: "say", who: "Apothekerin", voice: "Shelley", de: "Das Rezept ist da. Aber die Versichertenkarte fehlt!", ru: "Рецепт есть. А страховой карточки нет!", learn: ["fehlen"] },
  elif("Die Apotheke ist bis sieben geöffnet. Gut!", "Аптека открыта до семи. Хорошо!", ["geöffnet"]),
  frauke("Herr Jensen! Ich habe es versprochen: Ihre Versichertenkarte! Von Herrn Wulff!", "Господин Йенсен! Я обещала: ваша страховая карточка! От господина Вульфа!"),
  {
    t: "hear",
    task: "Что принесла Фрауке?",
    voice: "Sandy",
    de: "Herr Jensen! Ich habe es versprochen: Ihre Versichertenkarte! Von Herrn Wulff!",
    options: ["страховую карточку Йенсена", "лекарство от горла", "суп от Матео"],
    answer: "страховую карточку Йенсена",
  },
  { ...narr("А у Фрауке ещё и открытка — groß wie {tablett}: «Gute Besserung!» und vierzig Namen vom Hafen."), set: { rumours: 1 } },
  frauke("Der ganze Hafen sagt: Er spricht nie wieder! Ist das wahr?", "Вся гавань говорит: он больше никогда не заговорит! Это правда?"),
  {
    t: "reply",
    task: "Успокойте Фрауке: это только до субботы.",
    options: [
      { ...ok("Nein, Frauke. Er darf nur bis Samstag nicht sprechen."), set: { rumours: -1 } },
      no("Ja, Frauke. Er spricht nie wieder.", "Доктор Зоммер сказал другое: до субботы."),
      no("Nein, Frauke. Er muss bis Samstag sprechen.", "Наоборот: ему нельзя говорить — darf nicht."),
    ],
  },
  frauke("Nur bis Samstag? Gut! Das sage ich dem ganzen Hafen!", "Только до субботы? Хорошо! Это я скажу всей гавани!"),
  narr("An der Tür: die Möwe. Sie sieht das Rezept in Danas Hand — und weg ist es!"),
  { t: "game", task: `Отнимите рецепт у чайки! ${RACE}`, hint: HINT_RACE, outcome: RACE_STAKES, c: race(["die Tablette", "das Medikament", "der Arzt", "die Praxis", "der Termin", "krank", "rauchen", "wehtun", "der Husten", "der Schnupfen"]) },
  elif("Möwen werden nicht krank. Sie braucht kein Rezept!", "Чайки не болеют. Рецепт ей не нужен!"),
  { t: "gap", task: "Что говорит Элиф о чайке?", text: "Die Möwe braucht kein ___.", options: ["Rezept", "Bett", "Termin"], answer: "Rezept", ru: "Чайке не нужен рецепт." },
  narr("Грета выходит из лифта: der Rücken ist besser. Элиф получает записку: «Danke für den Termin! Greta». И Греты уже нет — быстро, как на пляже."),
  frauke(FRAUKE_KARTE, "А вот визитка той женщины с сумкой! Она была у киоска в субботу."),
  {
    t: "hear",
    task: "Чья визитка у Фрауке?",
    voice: "Sandy",
    de: FRAUKE_KARTE,
    options: ["женщины с сумкой, что была у киоска в субботу", "доктора Зоммера", "Греты"],
    answer: "женщины с сумкой, что была у киоска в субботу",
  },
  narr("Визитку чайка тоже успела надорвать. Кусочки — на прилавке аптеки."),
  {
    t: "game",
    task: "Порванная визитка: сложите её по порядку.",
    hint: "Сверху фирма, потом имя, адрес и часы работы.",
    c: {
      kind: "torn",
      title: "Visitenkarte",
      strips: [
        { id: "k1", de: "Firma Kiel-Schild · Schilder aus Plastik", ru: "Фирма Kiel-Schild · таблички из пластика" },
        { id: "k2", de: "Frau Claasen", ru: "Фрау Claasen" },
        { id: "k3", de: "Am Markt 3, Kiel-Gaarden", ru: "Ам-Маркт, 3, Киль-Гаарден" },
        { id: "k4", de: "Montag bis Freitag, von neun bis fünf", ru: "С понедельника по пятницу, с девяти до пяти" },
      ],
    },
  },
  dana(DANA_FIRMA, "Завтра в одиннадцать едем в фирму. Пусть фрау Claasen всё расскажет!", ["erzählen"]),
  {
    t: "hear",
    task: "Что решает Дана?",
    voice: "Anna",
    de: DANA_FIRMA,
    options: ["завтра в одиннадцать — в фирму", "завтра — к Грете в мастерскую", "ждать до субботы"],
    answer: "завтра в одиннадцать — в фирму",
  },
  {
    t: "pick",
    task: "Почему завтра — в фирму?",
    options: [
      ok("Йенсен написал «Firma.», а у Фрауке визитка той самой женщины"),
      no("Грета позвала в мастерскую", "Грета написала только «Danke für den Termin!»."),
      no("Фирма ищет механика", "Про работу в фирме никто не говорил. Есть слово Йенсена и визитка."),
    ],
  },
  {
    t: "game",
    rule: ["gesundheit/muessen-3", "moin/sollen-1"],
    task: "Блокнот закрыт на фразы дня. Поверните диски.",
    hint: HINT_LOCK,
    c: lock([
      ["Господину Йенсену нельзя говорить.", [["Herr Jensen", "Herrn Jensen", "Herr Jensens"], ["darf", "darfst", "dürfen"], ["nicht sprechen.", "nicht spricht.", "sprechen nicht."]]],
      ["Ему велено пить чай.", [["Er", "Ihr", "Wir"], ["soll", "sollst", "sollen"], ["Tee trinken.", "Tee trinkt.", "trinken Tee."]]],
      ["Хауке должен лежать в постели.", [["Hauke", "Haukes", "Hauken"], ["muss", "musst", "müssen"], ["im Bett bleiben.", "im Bett bleibt.", "in Bett bleiben."]]],
    ]),
  },
  elif("Und Hauke? Er bekommt auch eine Karte – von uns!", "А Хауке? Ему тоже открытка — от нас!", ["bekommen"]),
  narr("Für Hauke schreibt der Club auch eine Karte — по образцу открытки гавани для Йенсена."),
  {
    t: "game",
    rule: ["gesundheit/imperativ-2", "gesundheit/muessen-2"],
    task: "Напишите Хауке открытку по образцу: открыткой гавани для Йенсена. С Хауке вы на «ты», подписываются Дана и Элиф.",
    hint: HINT_LETTER,
    c: letter(
      "Hauke",
      ["Lieber Herr Jensen,", "gute Besserung!", "Sie müssen viel schlafen.", "Trinken Sie Tee!", "Viele Grüße", "der Hafen"],
      [
        an("Lieber", "Hauke"),
        ["Wunsch → gute Besserung", "gute Besserung!", "Gute Besserung!"],
        ["du → im Bett bleiben müssen", "Du musst im Bett bleiben.", "du musst im Bett bleiben."],
        ["Bitte (du) → viel Tee trinken", "Trink viel Tee!", "trink viel Tee!", "Trink viel Tee."],
        gruss("Dana und Elif"),
      ],
    ),
  },
  { t: "game", task: "Слова дня — по ящикам Йенсена: der, die, das.", hint: HINT_DOCK, c: docks(["der Arzt", "die Praxis", "das Medikament", "die Tablette", "das Rezept", "der Termin", "die Apotheke", "das Wartezimmer"]) },
  {
    t: "type",
    task: "Запишите план на завтра: время — на первом месте.",
    answers: ["Morgen um elf fahren wir zur Firma.", "Morgen um elf sind wir in der Firma.", "Morgen um elf gehen wir zur Firma."],
    ru: "Завтра в одиннадцать мы едем в фирму.",
  },
  {
    t: "clue",
    title: "Morgen um elf",
    text: "Frauke bringt die Versichertenkarte, eine Karte vom Hafen — und die Karte von Frau Claasen: Firma Kiel-Schild, Am Markt 3, Kiel-Gaarden. Greta: «Danke für den Termin!» Morgen um elf: zur Firma.",
  },
];

// Сцена 6 · эпилог и крючок: вечер в клубе. Голосовое фрау Петерсен — экзаменационное «Was soll …
// mitbringen?»; она чуть не выдаёт торт Матео. Сводная таблица модальных глаголов, речь как на
// экзамене и план на завтра — вход главы 11.
const abend: SceneNode[] = [
  { t: "pic", src: "10-abend.jpg", alt: "Вечер в клубе: Хауке под пледом ест суп Матео, Матео стоит над ним с половником; Элиф смеётся, на подоконнике чайка; на столе телефон с голосовым сообщением" },
  narr("Abend im Club. Hauke liegt auf dem Sofa. Mateo steht mit der Suppe da wie ein Arzt."),
  mateo("Iss, Hauke! Und nimm die Tablette! Ich bin heute dein Doktor!", "Ешь, Хауке! И прими таблетку! Сегодня я твой доктор!"),
  {
    t: "gap",
    rule: ["gesundheit/imperativ-3"],
    task: "Что ещё велит Матео?",
    text: "___ die Tablette, Hauke!",
    options: ["Nimm", "Nehm", "Nimmst"],
    answer: "Nimm",
    ru: "Прими таблетку, Хауке!",
  },
  narr("Auf dem Tisch: das Handy. Eine Nachricht von Frau Petersen — lang, wie immer."),
  petersen(PETERSEN, "Это фрау Петерсен. Суббота, праздник у клуба: Элиф пусть принесёт тарелки. Хауке пусть лежит в постели. А Матео пусть торт… нет, ничего!"),
  {
    t: "hear",
    task: "Как на экзамене: что должна принести Элиф?",
    voice: "Sandy",
    de: PETERSEN,
    options: ["тарелки", "стаканы", "торт"],
    answer: "тарелки",
  },
  {
    t: "type",
    rule: ["moin/sollen-1"],
    task: "Запишите, что должна принести Элиф, — так, как просит фрау Петерсен.",
    answers: ["Elif soll die Teller mitbringen.", "Sie soll die Teller mitbringen."],
    ru: "Элиф должна принести тарелки.",
  },
  {
    t: "hear",
    task: "Что должен делать Хауке?",
    voice: "Sandy",
    de: PETERSEN,
    options: ["лежать в постели", "принести тарелки", "печь торт"],
    answer: "лежать в постели",
  },
  elif("Mateo soll den Ku…? Den Kuchen? Mateo, was für ein Kuchen?", "Матео пусть торт…? Торт? Матео, что за торт?", ["was für ein"]),
  mateo("Kuchen? Welcher Kuchen? Suppe! Hier ist nur Suppe!", "Торт? Какой торт? Суп! Здесь только суп!"),
  {
    t: "game",
    rule: ["moin/modal-1"],
    task: "Элиф подводит итог дня. Вставьте модальные глаголы.",
    hint: "darf — можно, soll — так велели, muss — надо, möchte — хотел бы.",
    c: gaps("Herr Jensen ___ nicht sprechen. Er ___ viel Tee trinken. Hauke ___ im Bett bleiben. Und die Möwe ___ Kuchen!", ["darf", "soll", "muss", "möchte", "kann"], ["darf", "soll", "muss", "möchte"]),
  },
  {
    t: "game",
    task: "Хауке устраивает репетицию экзамена из-под пледа. Тема дня — здоровье.",
    hint: HINT_ORAL,
    c: oral([
      oralSay(2, ASK, "Thema: Gesundheit · Wort: Arzt", "Gehst du heute zum Arzt?", "Ты сегодня идёшь к врачу?", "Gehst du …?"),
      oralReply(2, ANSWER, "Was hast du?", "Ich habe Kopfschmerzen.", "У меня болит голова."),
      oralSay(3, REQUEST, "🪟", "Mach bitte das Fenster zu!", "Закрой, пожалуйста, окно!"),
    ]),
  },
  hauke("Hatschi! Und die Möwe? Sie macht auch Hatschi!", "Апчхи! А чайка? Она тоже делает апчхи!"),
  elif("Das ist kein Hatschi. Das ist Möwisch! Möwen werden nicht krank!", "Это не апчхи. Это по-чаячьи! Чайки не болеют!"),
  {
    t: "type",
    rule: ["gesundheit/check-1"],
    task: "Хауке спрашивает вас: «Und du? Was tut dir weh?» Ответьте про себя.",
    answers: ["Mein * tut weh.", "Meine * tut weh.", "Nichts tut weh.", "Mir tut nichts weh."],
    sample: "Mein Kopf tut weh.",
    ru: "У меня болит …",
  },
  { t: "game", task: "Слова дня перемешались. Откройте пары: немецкое слово и перевод.", c: memory(["aerztehaus", "anmeldung", "notizblock", "zeitschrift", "schal", "stimme"]) },
  {
    t: "pick",
    task: "Что нового за день?",
    options: [
      ok("Йенсену нельзя говорить до субботы, а завтра в одиннадцать Грета всё расскажет"),
      no("Йенсен потерял голос навсегда", "Это слух. Врач сказал: до субботы."),
      no("Табличку забрал доктор Зоммер", "Табличка в мастерской Греты, целая."),
    ],
  },
  { t: "game", task: "Лото на ночь: послушайте слово и закройте его на карточке.", hint: HINT_HEAR, c: bingo(["der Kopf", "der Hals", "die Nase", "das Fieber", "die Erkältung", "die Tablette", "der Arzt", "der Termin", "die Praxis"]) },
  {
    t: "reply",
    rule: ["gesundheit/imperativ-2"],
    task: "Скажите Хауке и Матео спокойной ночи и пожелайте спать — обоим сразу.",
    options: [
      ok("Gute Nacht! Schlaft gut!"),
      no("Gute Nacht! Schläft gut!", "Повелительное для ihr — без умлаута: Schlaft!"),
      no("Gute Nacht! Schlaf gut!", "Schlaf — одному другу. Двоим — Schlaft."),
    ],
  },
  narr("Вы закрываете блокнот: «День десятый. Herr Jensen: bis Samstag kein Wort — nur «Firma.». Morgen um elf: Firma Kiel-Schild». Noch zwei Tage."),
  {
    t: "clue",
    title: "Noch zwei Tage",
    text: "Morgen um elf in Gaarden: Firma Kiel-Schild, Frau Claasen. Herr Jensen schreibt nur: «Firma.» Samstag: Kieler Woche und die Party am Club. Mateo und der Kuchen — ein Geheimnis?",
  },
];

const play = (nodes: SceneNode[]) => ({ kind: "play" as const, nodes });

export const sceneChapter10: Episode = {
  id: "moin-neu-10",
  title: "Bis Samstag",
  day: { de: "Noch drei Tage", ru: "ещё три дня до Kieler Woche" },
  place: "Клуб и дом врачей у гавани · регистратура, приёмная, аптека",
  topic: "Здоровье и врач",
  grammar: "части тела · Mein Kopf tut weh · müssen, dürfen · sollen и все модальные (сверх урока) · повелительное на du и ihr",
  beats: [
    {
      id: "10-s1",
      title: "Hatschi!",
      story: [],
      prompt: "Хауке простудился, а чайка съела лекарство для Йенсена.",
      hint: "Mein Kopf tut weh. — один предмет: tut.",
      success: "Хауке остаётся в постели. Элиф записана к тому же врачу, что и Йенсен.",
      challenge: play(hatschi),
    },
    {
      id: "10-s2",
      title: "Im dritten Stock",
      story: [],
      prompt: "Дом врачей: лифт, регистратура и строгая фрау Мёллер.",
      hint: "Darf ich hier warten? — dürfen первым, инфинитив в конце.",
      success: "Элиф записана, команда ждёт в приёмной.",
      challenge: play(back(praxis, 10, 2)),
    },
    {
      id: "10-s3",
      title: "Im Wartezimmer",
      story: [],
      prompt: "Йенсен пишет, Грета держится за спину, Дана прячется за журналом.",
      hint: "Er darf nicht sprechen. — нельзя: nicht dürfen.",
      success: "Йенсену нельзя говорить, у Греты болит спина: табличка тяжёлая.",
      challenge: play(back(warten, 10, 0)),
    },
    {
      id: "10-s4",
      title: "Bis Samstag",
      story: [],
      prompt: "Доктор Зоммер объясняет, почему Йенсен молчит.",
      hint: "Er soll viel Tee trinken. — так велел врач: sollen.",
      success: "До субботы ни слова. В подаренном блокноте Йенсен пишет одно слово: «Firma.»",
      challenge: play(sommerS),
    },
    {
      id: "10-s5",
      title: "Kiel-Schild",
      story: [],
      prompt: "Аптека, открытка от всей гавани и визитка из киоска.",
      hint: "Du musst im Bett bleiben. Trink viel Tee! — с другом на «ты».",
      success: "Завтра в одиннадцать — в фирму Kiel-Schild, к фрау Claasen.",
      challenge: play(back(apotheke, 10, 3)),
    },
    {
      id: "10-s6",
      title: "Noch drei Tage",
      story: [],
      prompt: "Вечер в клубе: суп Матео, голосовое фрау Петерсен и все модальные глаголы.",
      hint: "Was soll Elif mitbringen? — ответ в том, что сказала фрау Петерсен.",
      success: "День десятый закончен. Завтра в одиннадцать — фирма. Noch zwei Tage.",
      challenge: play(back(abend, 10, 1)),
    },
  ],
};
