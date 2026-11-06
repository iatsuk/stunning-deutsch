import {
  an, ANSWER, ASK, docks, gaps, gruss, gull as race, HEAR, HINT_DOCK, HINT_HEAR, HINT_LETTER, HINT_LOCK, HINT_ORAL,
  HINT_PICTURE, HINT_RACE, HINT_SAY, HINT_SPELL, letter, letters, lock, odd, oral, order, pairs, RACE,
  reply as oralReply, say as oralSay, scene, sort, speak, spot, verdict, write,
} from "../build.ts";
import { phrases } from "../data.ts";
import type { Challenge, Episode, SceneNode } from "../types.ts";

// Глава 2 в формате сцен (A1-PLOT.md, «Формат сцен»): числа, алфавит, haben. Вопрос главы —
// чья бирка. Вход — бирка с оторванным углом, выход — комната 12, телефон Нильса, фото
// вчерашнего вечера и срок: клубу сто лет, праздник на старте Kieler Woche.
// Немецкий — из уроков 1–2 и выражений истории; новые слова урока — в learn у реплики.
// Повороты брошены оракулом (seed 1793867019), увязка — в журнале A1-STORYCRAFT.md.

const narr = (text: string): SceneNode => ({ t: "narr", text });
const learn = (words?: string[]) => (words ? { learn: words } : {});
const hauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Hauke", voice: "Rocko", de, ru, ...learn(words) });
const jensen = (de: string, ru: string): SceneNode => ({ t: "say", who: "Herr Jensen", voice: "Grandpa", de, ru });
const elif = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Elif", voice: "Flo", de, ru, ...learn(words) });
const dana = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Dana", voice: "Anna", de, ru, ...learn(words) });
const petersen = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frau Petersen", voice: "Sandy", de, ru, ...learn(words) });
const gullSays = (de: string, ru: string): SceneNode => ({ t: "say", who: "die Möwe", voice: "Shelley", de, ru });
/** Пары памяти — из выражений истории, которые глава уже показала. */
const memory = (ids: string[]): Challenge => ({ kind: "memory", pairs: ids.map((id) => ({ id, de: phrases[id].de, ru: phrases[id].ru })) });
const ok = (text: string) => ({ text, ok: true as const });
const no = (text: string, react: string) => ({ text, react });

// Сцена 1 · пролог и завязка. Бросок: новый человек · Элиф · найти · die Handynummer · 12.
const countdown: SceneNode[] = [
  { t: "pic", src: "02-countdown.jpg", alt: "Утро у клуба: Хауке у доски отсчёта с карточками чисел, на краю доски чайка, Йенсен с чаем у домика гавани" },
  narr("Второй день, восемь утра. У {tuer} клуба висит доска отсчёта до Kieler Woche. Каждое утро Хауке меняет на ней число."),
  hauke("Zwölf … elf! Noch elf Tage!", "Двенадцать… одиннадцать! Ещё одиннадцать дней!", ["zwölf", "elf"]),
  narr("Хауке открывает ящик с карточками чисел — и роняет его. Ветер раскладывает карточки по всему причалу."),
  {
    t: "game",
    task: "Соберите карточки: послушайте число и нажмите на нужную.",
    hint: HINT_PICTURE,
    c: scene([["null", "0️⃣"], ["eins", "1️⃣"], ["zwei", "2️⃣"], ["drei", "3️⃣"], ["vier", "4️⃣"], ["fünf", "5️⃣"], ["sechs", "6️⃣"], ["sieben", "7️⃣"], ["acht", "8️⃣"], ["neun", "9️⃣"], ["zehn", "🔟"]]),
  },
  {
    ...narr("Две единицы, elf, Хауке поймал. Остальные карточки держит в клюве {moewe}, усевшись прямо на доску. Элиф сказала бы: это интерес к числам."),
    set: { gull: 1 },
  },
  { t: "game", task: `Отнимите карточки у чайки! ${RACE}`, hint: HINT_RACE, c: race(["elf", "zwölf", "zehn", "acht", "sechs", "drei"]) },
  { t: "gap", task: "Поставьте на доску сегодняшнее число.", text: "Noch ___ Tage!", options: ["elf", "zwölf", "zehn"], answer: "elf", ru: "Ещё одиннадцать дней!" },
  jensen("Moin moin.", "Привет-привет."),
  narr("Мимо проходит Йенсен с кружкой чая. Хауке чуть снова не роняет карточки: — Moin moin? Сегодня он разговорчив. Это к переменам."),
  { t: "hear", task: "Что сказал Йенсен?", voice: "Grandpa", de: "Moin moin.", options: ["Moin moin.", "Moin.", "Guten Morgen."], answer: "Moin moin." },
  hauke("Hast du Zeit? Wir haben eine Frage: Wer ist Nils H.?", "У тебя есть время? У нас вопрос: кто такой Нильс Х.?", ["haben", "die Zeit", "die Frage"]),
  {
    t: "reply",
    rule: ["zahlen/haben-1"],
    task: "Ответьте Хауке: время у вас есть.",
    options: [
      ok("Ja, ich habe Zeit."),
      no("Ja, ich hat Zeit.", "hat — для er, sie, es: Hauke hat Zeit. О себе — ich habe."),
      no("Ja, ich bin Zeit.", "«Я есть время» звучит философски. «У меня есть» — ich habe."),
    ],
  },
  narr("Вы достаёте вчерашний {anhaenger}. Угол оторван клювом, и вместе с ним — половина того, что нужно детективу."),
  {
    t: "game",
    task: "Отметьте на бирке, чего не хватает для поиска.",
    hint: "Что оборвано и что написано не до конца?",
    c: spot("Anhänger", ["Club Kiellinie|Gästezimmer 1…", "Nils H.|Hamburg", "Telefon: siehe Büro"], ["Gästezimmer 1…", "Telefon: siehe Büro"]),
  },
  { t: "type", rule: ["kennenlernen/endungen-1"], task: "Запишите в блокнот, что известно о Нильсе: «Нильс из Гамбурга».", answers: ["Nils kommt aus Hamburg.", "Er kommt aus Hamburg."], ru: "Нильс из Гамбурга." },
  narr("Каждая {gaestezimmer} с номером: с десятой по девятнадцатую. Номер на бирке начинается на 1, значит, подходит любая."),
  {
    t: "pick",
    task: "Что делать?",
    options: [
      ok("Узнать номер комнаты и телефон в офисе"),
      no("Постучать во все десять дверей", "В восемь утра? Гости вас не простят, а Нильс, судя по записке, отвечает только восклицательными знаками."),
      no("Ждать гостей у подставки", "Вчера вечером они так и не пришли. Ждать — не метод детектива."),
    ],
  },
  narr("{buero} клуба — рядом с домиком гавани. Дверь заперта, на ней записки."),
  {
    t: "look",
    task: "Осмотрите дверь офиса.",
    items: [
      { icon: "☕", de: "die Pause", ru: "перерыв", note: "Записка: «Pause bis neun». Сейчас восемь — ещё час.", key: true },
      { icon: "📌", de: "die Handynummer", ru: "номер мобильного", note: "«Frau Petersen · Handy:» — а сам номер заклеен афишей Kieler Woche.", key: true },
      { icon: "🗂️", de: "das Büro", ru: "офис", note: "В окно виден автомат с номерками для очереди. В офисе размером со шкаф — смело." },
    ],
  },
  elif("Moin! Frau Petersen hat ein Handy. Ich habe die Nummer!", "Привет! У фрау Петерсен есть мобильный. У меня есть номер!", ["das Handy", "die Nummer"]),
  narr("Элиф подсмотрела номер в бинокль, пока его не заклеили. Ближе она не подходит: на доске сидит {moewe}, а свидетелей Элиф не будит."),
  elif("Null, eins, sieben, zwei. Acht, drei. Fünf, neun. Vier, sechs.", "0172 83 59 46"),
  {
    t: "game",
    task: "Наберите номер фрау Петерсен.",
    hint: "null — 0, eins — 1, zwei — 2, drei — 3, vier — 4, fünf — 5, sechs — 6, sieben — 7, acht — 8, neun — 9.",
    c: { kind: "code", length: 10, answer: "0172835946" },
  },
  petersen("Petersen, Büro, Club Kiellinie, Moin! Wer ist da? Hallo?", "Петерсен, офис клуба «Кильлинье», привет! Кто это? Алло?"),
  narr("Фрау Петерсен говорит быстрее, чем {moewe} летает. Слова сливаются в одно длинное «Moin»."),
  {
    t: "reply",
    task: "Попросите фрау Петерсен говорить медленнее.",
    options: [
      ok("Langsam, bitte."),
      no("Noch einmal, bitte.", "Так просят повторить. Она повторит — с той же скоростью."),
      no("Auf Wiederhören!", "Это прощание по телефону. Рано: вы ещё ничего не узнали."),
    ],
  },
  petersen("Wer … ist … da?", "Кто… это?"),
  narr("По телефону немцы представляются не «Ich bin», а «Hier ist …» — «здесь …»."),
  {
    t: "type",
    task: "Представьтесь по телефону: Hier ist … и ваше имя.",
    answers: ["Hier ist *.", "Moin, hier ist *.", "Guten Morgen, hier ist *.", "Hallo, hier ist *."],
    ru: "Это …",
    sample: "Hier ist Anna.",
  },
  petersen("Ah, Jensens Detektiv! Ich komme. Zehn Minuten!", "А, детектив Йенсена! Иду. Десять минут!"),
  narr("По телефону прощаются не Auf Wiedersehen: собеседника же не видно. Прощаются «до нового слышания»."),
  { t: "gap", task: "Попрощайтесь — по телефону.", text: "Auf ___!", options: ["Wiederhören", "Wiedersehen", "Morgen"], answer: "Wiederhören", ru: "До свидания!" },
  hauke("Zehn Minuten bei Frau Petersen? Das sind zwanzig.", "Десять минут у фрау Петерсен? Значит, двадцать."),
  { t: "clue", title: "Бирка без угла", text: "Номер гостевой комнаты оборван: 1… — значит, от 10 до 19. Телефон Нильса — в офисе у фрау Петерсен." },
];

// Сцена 2 · развитие. Бросок главы: Дана · обменять · der Geburtstag · 6.
// Бросок сцены: нить закрывается раньше срока · Дана · заблудиться · das Brot · 9.
const queue: SceneNode[] = [
  { t: "pic", src: "02-office.jpg", alt: "Крошечный клубный офис: очередь капитанов с бумагами, автомат с номерками, табло с красными цифрами, фрау Петерсен за столом, Дана с пакетом хлеба" },
  narr("Фрау Петерсен приходит через двадцать минут, как и предсказал Хауке. В {buero} уже очередь: перед Kieler Woche все команды несут бумаги."),
  petersen("Moin! Eine Nummer, bitte!", "Привет! Возьмите номерок, пожалуйста!"),
  narr("В {buero} размером со шкаф стоит автомат с номерками, над столом горит табло. Вы тянете номерок: zweiunddreißig."),
  { t: "item", icon: "🎟️", de: "die Nummer", ru: "номерок 32" },
  {
    t: "look",
    task: "Осмотрите офис, пока ждёте.",
    items: [
      { icon: "🎂", de: "der Kuchen", ru: "пирог, торт", note: "На столе бланк заказа: «Kuchen für hundert». Сто кого — не написано.", key: true },
      { icon: "📝", de: "die Prüfung", ru: "экзамен", note: "Афиша языковой школы: «A1-Prüfung». Фрау Петерсен — секретарь школы, а офис клуба ведёт добровольно.", key: true },
      { icon: "⚓", de: "der Liegeplatz", ru: "место у причала", note: "Схема причала: у каждого места свой номер. «Sprotte» стоит на Liegeplatz 32 — как ваш номерок." },
    ],
  },
  narr("Очередь ползёт. Капитаны диктуют фрау Петерсен номера своих мест у причала, а вы от скуки играете в лото."),
  {
    t: "game",
    task: `Лото у стола. ${HEAR}`,
    hint: HINT_HEAR,
    c: { kind: "bingo", words: ["eins", "drei", "vier", "sechs", "sieben", "acht", "neun", "elf", "zwölf"] },
  },
  dana("Moin! Ich habe Brot. Und ich habe die Nummer dreiundzwanzig.", "Привет! У меня хлеб. И у меня номерок двадцать три.", ["das Brot"]),
  narr("Дана шла в пекарню, а пришла сюда: в Киле все домики белые. Автомат дал номерок, и она взяла. Врачи с автоматами не спорят."),
  { t: "gap", rule: ["zahlen/haben-1"], task: "Что есть у Даны?", text: "Dana ___ Brot und die Nummer dreiundzwanzig.", options: ["hat", "habe", "hast"], answer: "hat", ru: "У Даны есть хлеб и номерок двадцать три." },
  narr("По дороге Дана заблудилась в коридоре, где {gaestezimmer}. За одной дверью кто-то храпел, на ручке висела красная куртка."),
  dana("Da ist ein Schild: Wir haben Pause! Und die Nummer … zwölf? Oder zwanzig?", "Там табличка: «У нас перерыв!» А номер… двенадцать? Или двадцать?"),
  {
    t: "pick",
    task: "Какой номер у двери с красной курткой?",
    options: [
      ok("12: гостевые комнаты — с 10 по 19"),
      no("20", "Комнаты 20 нет: гостевые — с 10 по 19."),
      no("Не понять, нужно стучать во все", "Не нужно: двадцатой комнаты нет, а 12 подходит к бирке."),
    ],
  },
  { t: "clue", title: "Комната 12", text: "Дана заблудилась и нашла дверь гостей: Gästezimmer 12. Красная куртка, храп и табличка «Wir haben Pause!» — восклицательные знаки Нильса." },
  narr("Нить про {gaestezimmer} закрылась раньше, чем открылся {buero}. Осталось узнать Handynummer."),
  { t: "type", task: "Подпишите номер комнаты на схеме словом: двенадцать.", answers: ["zwölf", "Zwölf"], ru: "двенадцать" },
  petersen("Nummer dreiundzwanzig, bitte!", "Номер двадцать три, пожалуйста!"),
  {
    t: "hear",
    task: "Кого вызывает фрау Петерсен?",
    voice: "Sandy",
    de: "Nummer dreiundzwanzig, bitte!",
    options: ["Дану: у неё 23", "Вас: у вас 32", "Никого: такого номера нет"],
    answer: "Дану: у неё 23",
  },
  narr("В немецком сначала звучат единицы: drei-und-zwanzig — «три-и-двадцать». Ваш номер — zweiunddreißig."),
  narr("Дане в офисе делать нечего: ей нужна пекарня. Она протягивает вам свой номерок и забирает ваш."),
  dana("Bitte! Ich habe Zeit.", "Пожалуйста! У меня есть время."),
  {
    t: "reply",
    task: "Поблагодарите Дану.",
    options: [
      ok("Danke, Dana!"),
      no("Bitte, Dana!", "Bitte отвечают на «спасибо». Сейчас благодарите вы."),
      no("Wie bitte?", "Так переспрашивают, если не расслышали. А Дана сказала всё ясно."),
    ],
  },
  narr("Пока вы идёте к столу, фрау Петерсен шепчет в телефон. Дана — врач и слышит даже шёпот."),
  petersen("Der Club hat Geburtstag. Er ist hundert! Psst!", "У клуба день рождения. Ему сто лет! Тсс!", ["der Geburtstag"]),
  {
    t: "hear",
    task: "Что услышала Дана?",
    voice: "Sandy",
    de: "Der Club hat Geburtstag. Er ist hundert! Psst!",
    options: ["У клуба день рождения", "У фрау Петерсен день рождения", "У Даны день рождения"],
    answer: "У клуба день рождения",
  },
  {
    t: "game",
    rule: ["kennenlernen/wortstellung-1", "zahlen/haben-1"],
    task: "Дана шепчет вам на ухо. Соберите её фразу.",
    hint: "Подлежащее, глагол на втором месте, потом остальное.",
    c: order(["Der", "Club", "hat", "Geburtstag."], ["Geburtstag.", "hat", "Club", "Der"]),
  },
  narr("Сто лет клубу, а праздник — на старте Kieler Woche. Без {schild} MOIN праздник не начнётся: ohne MOIN kein Start."),
  dana("Hundert Jahre! Und das Schild ist weg.", "Сто лет! А табличка пропала."),
  {
    t: "pick",
    task: "Что это значит для дела?",
    options: [
      ok("У дела есть срок: табличку нужно найти к старту"),
      no("Праздник можно провести и без таблички", "Ohne MOIN kein Start: без таблички не стартуют, а праздник — на старте."),
      no("Табличку взяли для праздника — значит, всё в порядке", "Может быть. Но кто взял и где она? Пока это догадка, не факт."),
    ],
  },
  {
    t: "game",
    task: "Числа утра перепутались в блокноте. Сведите цифры и слова.",
    hint: "Сначала единицы, потом десятки: dreiundzwanzig — 23.",
    c: pairs([["23", "dreiundzwanzig"], ["32", "zweiunddreißig"], ["12", "zwölf"], ["100", "hundert"]]),
  },
  { t: "clue", title: "Секрет офиса", text: "Клубу сто лет, день рождения отмечают на старте Kieler Woche. В офисе лежит заказ «Kuchen für hundert». Табличку нужно найти к старту." },
];

// Сцена 3 · развилка. Бросок: неприятность · Элиф · отпраздновать · die Postleitzahl · 6.
const guestbook: SceneNode[] = [
  { t: "pic", src: "02-desk.jpg", alt: "Стол фрау Петерсен: гостевая книга, штампы, очки; в дверях Элиф с биноклем, на подоконнике чайка с кольцом на лапе" },
  narr("Ваш номерок, dreiundzwanzig, горит на табло. Фрау Петерсен смотрит поверх очков. На столе {gaestebuch} и {stempel} — целых три. Лишних улыбок нет."),
  petersen("Moin! Haben Sie Fragen?", "Здравствуйте! У вас есть вопросы?"),
  {
    t: "reply",
    rule: ["kennenlernen/wortstellung-3", "zahlen/haben-1"],
    task: "Спросите про Нильса — вежливо, вопросом «да или нет».",
    options: [
      ok("Ja. Hat Nils Hansen ein Handy?"),
      no("Ja. Hast du Nils?", "Фрау Петерсен — на «вы». И Нильса не «имеют»."),
      no("Ja. Ich habe Nils Hansen.", "Это не вопрос, а странное признание."),
    ],
  },
  petersen("Ja. Aber welcher Hansen? Wir haben drei!", "Да. Но который Хансен? У нас их трое!"),
  narr("Хансен на севере — как Иванов. Фрау Петерсен открывает {gaestebuch}, и тут дверь распахивается: влетает Элиф."),
  {
    t: "go",
    task: "С чего начать?",
    next: "Дальше по делу",
    branches: [
      {
        label: "Гостевая книга",
        icon: "📖",
        nodes: [
          {
            t: "game",
            task: "Найдите в книге Нильса с бирки: имя и комнату.",
            hint: "На бирке: Nils H., Hamburg. Номер комнаты Дана уже нашла.",
            c: spot("Gästebuch", ["Hansen, Jens|24105 Kiel|Zimmer 15", "Hansen, Nils|20095 Hamburg|Zimmer 12", "Hansen, Greta|20095 Hamburg|Zimmer 12"], ["Hansen, Nils", "Zimmer 12"]),
          },
          narr("Нильс и Грета — из одного {gaestezimmer}: брат и сестра, как и говорила Элиф. У Нильса в графе телефона галочка: номер давать можно."),
          petersen("Nils … Ha – A – En – Es – E – En.", "Нильс… Х-А-Н-С-Е-Н."),
          {
            t: "hear",
            task: "Какую фамилию продиктовала фрау Петерсен по буквам?",
            voice: "Sandy",
            de: "Nils … Ha – A – En – Es – E – En.",
            options: ["Hansen", "Jansen", "Hanssen"],
            answer: "Hansen",
          },
          petersen("Und Nils? Buchstabieren Sie, bitte!", "А Нильс? Назовите по буквам, пожалуйста!", ["buchstabieren"]),
          {
            t: "reply",
            rule: ["zahlen/alphabet-1"],
            task: "Назовите Nils по буквам.",
            options: [
              ok("En – I – El – Es"),
              no("En – Ai – El – Es", "I по-немецки — «и», а не английское «ай»."),
              no("En – I – El – Zett", "Zett — это Z. В конце Nils — S, «эс»."),
            ],
          },
          { t: "clue", title: "Гостевая книга", text: "Nils und Greta Hansen, 20095 Hamburg, Gästezimmer 12. Номер Нильса давать можно." },
        ],
      },
      {
        label: "Элиф и чайка с кольцом",
        icon: "🐦",
        nodes: [
          elif("Die Möwe hat eine Nummer! Wir haben eine Party!", "У чайки есть номер! У нас праздник!"),
          narr("На лапе у {moewe} {ring} с номером: учёные знают, где она родилась. Для Элиф это день рождения и Kieler Woche сразу."),
          elif("Ha – E – El. Sieben, drei, null, fünf.", "Х-Е-Л. Семь, три, ноль, пять."),
          {
            t: "hear",
            task: "Какие буквы на кольце?",
            voice: "Flo",
            de: "Ha – E – El. Sieben, drei, null, fünf.",
            options: ["HEL", "AEL", "HIL"],
            answer: "HEL",
          },
          { t: "type", rule: ["zahlen/alphabet-1"], task: "Элиф диктует: «Ha – E – El. Sieben, drei, null, fünf». Запишите номер кольца в блокнот буквами и цифрами.", answers: ["HEL 7305", "HEL7305", "HEL-7305"] },
          { t: "gap", rule: ["zahlen/haben-1"], task: "Подпишите находку.", text: "Die Möwe ___ eine Nummer: HEL 7305.", options: ["hat", "habe", "haben"], answer: "hat", ru: "У чайки есть номер: HEL 7305." },
          elif("Die Postleitzahl, bitte! Frau Petersen?", "Индекс, пожалуйста! Фрау Петерсен?", ["die Postleitzahl"]),
          narr("Фрау Петерсен обожает индексы. Она бросает очередь и ищет индекс птичьей станции. Ваш номерок гаснет на табло."),
          petersen("Die Postleitzahl ist zwei, vier, eins, fünf, neun.", "Индекс: два, четыре, один, пять, девять."),
          {
            t: "game",
            task: "Помогите Элиф заполнить карточку находки — тогда фрау Петерсен вернётся к вам.",
            hint: "Номер кольца — буквы и цифры; Postleitzahl — пять цифр.",
            c: write("Fundmeldung: Möwe", [["Ring", "HEL 7305", "HEL7305", "HEL-7305"], ["Postleitzahl", "24159"], ["Stadt", "Kiel"]]),
          },
          elif("Danke! Alles Gute, Möwe!", "Спасибо! Всего хорошего, чайка!", ["Alles Gute!"]),
          { t: "clue", title: "Чайка с номером", text: "У чайки на лапе кольцо HEL 7305. У главной подозреваемой теперь есть номер — как у настоящей." },
        ],
      },
      {
        label: "Формуляр A38",
        icon: "🗂️",
        optional: true,
        nodes: [
          narr("Для справки о гостях нужен {formular} A38. Так заведено в клубе уже сорок лет."),
          petersen("Formular A achtunddreißig. Wie heißt Ihr Boot? Buchstabieren, bitte!", "Формуляр A38. Как называется ваша лодка? По буквам, пожалуйста!"),
          {
            t: "reply",
            rule: ["zahlen/alphabet-1"],
            task: "Назовите по буквам: Sprotte.",
            options: [
              ok("Es – Pe – Er – O – Te – Te – E"),
              no("Es – Pe – Er – O – Ti – Ti – I", "T — «тэ», E — «э»: это не английский алфавит."),
              no("Zett – Pe – Er – O – Te – Te – E", "Zett — это Z, а «Sprotte» начинается с S, «эс»."),
            ],
          },
          narr("Фрау Петерсен проверяет каждую графу по буквам. Графы называются словами, которые вы сегодня уже слышали."),
          { t: "game", task: "Соберите названия граф по буквам.", hint: HINT_SPELL, c: letters(["die Nummer", "die Hausnummer", "die Adresse"]) },
          { t: "item", icon: "🗂️", de: "das Formular", ru: "формуляр A38 с печатью фрау Петерсен", set: { petersen: 1 } },
          narr("Это первая печать фрау Петерсен за неделю. Хауке потом скажет, что ему она печатей не ставила никогда."),
        ],
      },
    ],
  },
  narr("Фрау Петерсен возвращается к вам и диктует номер так быстро, будто очередь горит."),
  petersen("Nils Hansen: null, eins, fünf, eins – zweiunddreißig – vierundfünfzig – neunzehn.", "Нильс Хансен: 0151 — 32 — 54 — 19."),
  {
    t: "reply",
    task: "Вы не успели записать. Попросите повторить.",
    options: [
      ok("Noch einmal, bitte."),
      no("Alles Gute!", "Это поздравление. Фрау Петерсен не именинница. Пока."),
      no("Auf Wiederhören!", "Так прощаются по телефону, а вы стоите у её стола."),
    ],
  },
  petersen("Null … eins … fünf … eins. Zweiunddreißig. Vierundfünfzig. Neunzehn.", "0… 1… 5… 1. Тридцать два. Пятьдесят четыре. Девятнадцать."),
  {
    t: "game",
    task: "Наберите номер Нильса.",
    hint: "zweiunddreißig — 32, vierundfünfzig — 54: сначала единицы, потом десятки.",
    c: { kind: "code", length: 10, answer: "0151325419" },
  },
  narr("Гудки. Щелчок — и {nachricht} автоответчика. Говорит Нильс. Много."),
  {
    t: "say",
    who: "Nils",
    voice: "Eddy",
    de: "Hallo! Hier ist Nils, Nils Hansen aus Hamburg! Ich habe jetzt Pause. Bitte Ihre Nummer und Ihre Frage! Tschüss! Nein: Auf Wiederhören!",
    ru: "Привет! Это Нильс, Нильс Хансен из Гамбурга! У меня сейчас перерыв. Пожалуйста, ваш номер и ваш вопрос! Пока! Нет: до свидания!",
  },
  {
    t: "game",
    task: "Верно или нет? Переслушайте автоответчик, если нужно.",
    c: verdict(["Richtig", "Falsch"], [
      ["Нильс сейчас отдыхает", true, "Ich habe jetzt Pause — у него перерыв."],
      ["Нильс из Киля", false, "aus Hamburg — он из Гамбурга."],
      ["Нильс просит оставить номер и вопрос", true, "Bitte Ihre Nummer und Ihre Frage."],
    ]),
  },
  { t: "type", task: "Оставьте Нильсу вопрос дня.", answers: ["Wo ist das Schild?"], ru: "Где табличка?" },
  narr("Теперь ждать. Нильс отдыхает до двенадцати, а отвечает, судя по двери, только восклицательными знаками."),
  { t: "clue", title: "Телефон Нильса", text: "Nils Hansen, Gästezimmer 12, Handy 0151 32 54 19. На автоответчике — перерыв. Вопрос оставлен." },
];

// Интерлюдия глазами чайки: читатель знает больше детектива, но вывод остаётся игроку.
const gullDiary: SceneNode[] = [
  { t: "pic", src: "02-gull.jpg", alt: "Чайка с кольцом на лапе сидит на крыше клуба среди украденных карточек с числами и пишет в крошечном блокноте" },
  narr("Тем временем на крыше клуба. У чайки снова блокнот — и новая гордость на лапе."),
  gullSays("Ich habe eine Nummer! Ich bin Ha – E – El, sieben, drei, null, fünf.", "У меня есть номер! Я — HEL 7305."),
  {
    t: "hear",
    task: "Что пишет чайка?",
    voice: "Shelley",
    de: "Ich habe eine Nummer! Ich bin Ha – E – El, sieben, drei, null, fünf.",
    options: ["У меня есть номер", "Я ищу номер", "Это мой телефон"],
    answer: "У меня есть номер",
  },
  gullSays("Ich habe elf Karten. Nein: zwölf!", "У меня одиннадцать карточек. Нет: двенадцать!"),
  { t: "gap", rule: ["zahlen/haben-1"], task: "Сколько карточек у чайки?", text: "Ich ___ zwölf Karten.", options: ["habe", "hat", "bin"], answer: "habe", ru: "У меня двенадцать карточек." },
  gullSays("Ich habe zwölf Jahre.", "Я «имею» двенадцать лет."),
  narr("Так говорит и Матео, когда торопится. По-немецки возраст не «имеют»: его «есть» — с sein."),
  {
    t: "type",
    rule: ["zahlen/ja-nein-3"],
    task: "Исправьте чайку: «Мне двенадцать лет».",
    answers: ["Ich bin zwölf Jahre alt.", "Ich bin zwölf.", "Ich bin zwölf Jahre alt!"],
    ru: "Мне двенадцать лет.",
  },
  gullSays("Gestern: Die Frau hat Farbe. Und der Mann sagt: Moin. Kreeh …", "Вчера: у женщины краска. А мужчина говорит: Moin. Кри-и… хр-р."),
  {
    t: "hear",
    task: "Что чайка видела вчера?",
    voice: "Shelley",
    de: "Gestern: Die Frau hat Farbe. Und der Mann sagt: Moin. Kreeh …",
    options: ["у женщины была краска", "у мужчины был хлеб", "табличку унесла чайка"],
    answer: "у женщины была краска",
  },
  narr("Чайка засыпает на полуслове. Кто этот мужчина? В Киле Moin говорят все."),
];

// Сцена 4 · поворот и кризис. Бросок: честная улика · Нильс · подарить · das Handy · 14.
const gift: SceneNode[] = [
  { t: "pic", src: "02-envelope.jpg", alt: "Коридор гостевых комнат: на двери 12 табличка с восклицательными знаками, из-под двери выезжает конверт; Хауке и Дана смотрят" },
  narr("Ровно zwölf. Вы с Хауке и Даной стоите у {gaestezimmer} 12. На ручке всё ещё «Wir haben Pause!!!»"),
  hauke("Hallo? Nils? Greta? Haben Sie Zeit?", "Алло? Нильс? Грета? У вас есть время?"),
  {
    t: "reply",
    rule: ["zahlen/haben-1"],
    task: "Добавьте через дверь главное — вежливо.",
    options: [
      ok("Wir haben eine Frage: Wo ist das Schild?"),
      no("Wir haben eine Frage: Wer ist das Schild?", "Wer — про людей. Табличка не человек, хотя в клубе её любят как родную."),
      no("Ihr habt eine Frage: Wo ist das Schild?", "Вопрос не у них, а у вас: wir haben."),
    ],
  },
  narr("Тишина. Шаги. Из-под {tuer} выезжает конверт — и снова тишина. Гости и правда отвечают только письменно."),
  narr("В конверте старый мобильный и записка — конечно, с восклицательными знаками."),
  {
    t: "game",
    rule: ["zahlen/haben-1"],
    task: "Записку помяло дверью. Вставьте формы haben.",
    hint: "ich habe, er / sie hat, wir haben.",
    c: gaps("Hallo!!! Ich ___ zwei Handys!!! Das Handy ist für dich!!! Greta ___ eine Frage: Wer bist du??? Wir ___ Pause!!! PIN: dreiundzwanzig – einundzwanzig!!! Nils", ["habe", "hat", "haben", "hast"], ["habe", "hat", "haben"]),
  },
  {
    t: "game",
    task: "Введите PIN из записки.",
    hint: "Сначала единицы, потом десятки: dreiundzwanzig — 23, einundzwanzig — 21.",
    c: { kind: "code", length: 4, answer: "2321", label: "PIN" },
  },
  { t: "item", icon: "📱", de: "das Handy", ru: "старый мобильный Нильса — подарок детективу" },
  dana("Nils hat zwei Handys? Diagnose: Er spricht viel!", "У Нильса два мобильных? Диагноз: болтун!"),
  narr("На экране одна папка — Fotos. Вчерашний вечер."),
  { t: "pic", src: "02-selfie.jpg", alt: "Селфи Нильса вчера вечером у подставки с табличкой MOIN; позади Грета меряет табличку складным метром, у её ног банка краски; в углу кадра чайка" },
  {
    t: "look",
    task: "Рассмотрите фото.",
    items: [
      { icon: "🤳", de: "das Foto", ru: "фото", note: "Вчера вечером: селфи Нильса у подставки. Табличка MOIN ещё на месте!", key: true },
      { icon: "📏", de: "der Zollstock", ru: "складной метр", note: "За спиной Нильса Грета меряет табличку складным метром. Зачем мерить чужую табличку?", key: true },
      { icon: "🧥", de: "die Jacke", ru: "куртка", note: "Красная куртка Нильса — та самая, что висит на двери номер 12." },
      { icon: "🐦", de: "die Möwe", ru: "чайка", note: "Чайка тоже попала в кадр и позирует лучше всех." },
    ],
  },
  dana("Wie alt ist das Schild?", "Сколько лет табличке?"),
  hauke("Das Schild ist fünfzig Jahre alt!", "Табличке пятьдесят лет!", ["das Jahr", "alt"]),
  { t: "gap", rule: ["zahlen/ja-nein-3"], task: "Сколько лет табличке?", text: "Das Schild ist fünfzig Jahre ___.", options: ["alt", "neu", "groß"], answer: "alt", ru: "Табличке пятьдесят лет." },
  {
    t: "pick",
    task: "Что меняет это фото?",
    options: [
      ok("Вчера вечером табличка была на месте, и Грета её мерила"),
      no("Табличку унесла чайка", "Чайка на фото позирует, а не ворует. Элиф бы гордилась."),
      no("Нильс — вор: он её фотографировал", "Фотографировать — не красть. Иначе вор — каждый турист на Kiellinie."),
    ],
  },
  narr("Мобильный пищит: {nachricht} от Нильса. «Hallo, Detektiv!!! Ich habe eine Frage: Wo ist das Schild???»"),
  hauke("Nils hat eine Frage? Wir haben eine Frage!", "У Нильса вопрос? У нас вопрос!"),
  narr("Если Нильс сам не знает, где {schild}, то кто знает? На фото с {zollstock} была только Грета."),
  {
    t: "game",
    task: "Разложите факты по героям.",
    hint: "Загляните в блокнот: что делал на фото каждый и что писал.",
    c: sort([["nils", "Нильс"], ["greta", "Грета"]], [
      ["selfie", "Делает селфи у таблички", "nils", "🤳"],
      ["measure", "Меряет табличку", "greta", "📏"],
      ["ask", "Спрашивает: Wo ist das Schild?", "nils", "💬"],
      ["moin", "Ответила на письмо одним «Moin!»", "greta", "✉️"],
    ]),
  },
  { t: "type", rule: ["zahlen/haben-1"], task: "Ответьте Нильсу: «У меня есть фото».", answers: ["Ich habe das Foto.", "Ich habe ein Foto.", "Ich habe die Fotos."], ru: "У меня есть фото." },
  narr("Нильс отвечает мгновенно: «Super!!! Und wie alt ist Hauke???» Хауке польщён."),
  hauke("Fünfundzwanzig! Ich bin fünfundzwanzig.", "Двадцать пять! Мне двадцать пять."),
  {
    t: "reply",
    rule: ["zahlen/ja-nein-3"],
    task: "Напишите Нильсу, сколько лет Хауке.",
    options: [
      ok("Hauke ist fünfundzwanzig."),
      no("Hauke hat fünfundzwanzig.", "Возраст — с sein: Hauke ist fünfundzwanzig. С haben так говорит только Матео, когда торопится."),
      no("Hauke ist zweiundfünfzig.", "Это 52: сначала единицы. Хауке 25 — fünfundzwanzig."),
    ],
  },
  narr("Ответ прилетает через секунду, но не от Нильса. Грета пишет брату на старый номер: «Nils!!! Bitte kein Foto! Und kein Wort!»"),
  narr("«Пожалуйста, никаких фото! И ни слова!» Грета не знает, что этот Handy теперь у вас."),
  hauke("Greta hat das Schild! Ganz klar!", "Табличка у Греты! Ясно как день!"),
  {
    t: "hear",
    task: "Что кричит Хауке?",
    voice: "Rocko",
    de: "Greta hat das Schild! Ganz klar!",
    options: ["Табличка у Греты!", "Грета ищет табличку!", "У Греты есть вопрос!"],
    answer: "Табличка у Греты!",
  },
  {
    t: "pick",
    task: "Хауке прав?",
    options: [
      ok("Пока нет: мерить — не уносить. Нужны факты"),
      no("Да, звонить в полицию", "С чем? С фотографией складного метра?"),
      no("Да, стучать в комнату 12, пока не откроют", "Гости отвечают только письменно. А фрау Петерсен уже смотрит на вас поверх очков."),
    ],
  },
  narr("Дана щупает Хауке пульс: — Diagnose: Panik. Лечение — говорить медленно."),
  dana("Langsam, bitte. Noch einmal, bitte.", "Медленно, пожалуйста. Ещё раз, пожалуйста."),
  { t: "game", task: "Повторите рецепт Даны вслух — вместе с Хауке.", hint: HINT_SAY, c: speak(["Langsam, bitte.", "Noch einmal, bitte.", "Wie bitte?"]) },
  {
    t: "clue",
    title: "Фото вчерашнего вечера",
    text: "Вчера вечером табличка стояла на подставке, а Грета мерила её складным метром. Нильс сам спрашивает, где табличка. Грета пишет брату: никаких фото, ни слова.",
  },
];

// Сцена 5 · кульминация. Бросок: новый человек · Грета · подарить · der Raum · 1 (наоборот).
const refusal: SceneNode[] = [
  { t: "pic", src: "02-keys.jpg", alt: "Фрау Петерсен у шкафчика для ключей со словесным замком из трёх дисков; рядом Хауке с письмом" },
  narr("Фрау Петерсен ставит печать в {gaestebuch} и хмурится: в {gaestezimmer} 12 не закрывается окно. {moewe} летает туда за булочками."),
  petersen("Zimmer zwölf? Nein! Wir haben Raum eins. Er ist groß und neu!", "Комната двенадцать? Нет! У нас есть комната один. Она большая и новая!", ["der Raum"]),
  {
    t: "hear",
    task: "Что предлагает фрау Петерсен гостям?",
    voice: "Sandy",
    de: "Zimmer zwölf? Nein! Wir haben Raum eins. Er ist groß und neu!",
    options: ["комнату один", "комнату двенадцать", "комнату десять"],
    answer: "комнату один",
  },
  narr("Это подарок гостям: лучшая комната клуба, с видом на фьорд. Фрау Петерсен сияет, будто дарит её сама."),
  hauke("Raum eins! Das ist super!", "Комната один! Это же супер!"),
  {
    t: "reply",
    task: "Спросите, где ключ.",
    options: [
      ok("Wo ist der Schlüssel?"),
      no("Wer ist der Schlüssel?", "Wer — про людей. Ключ не человек, даже у фрау Петерсен."),
      no("Woher ist der Schlüssel?", "Woher — «откуда родом». Ключ родом из шкафчика, но спросить нужно Wo."),
    ],
  },
  narr("{key} — в шкафчике для ключей. На дверце словесный замок, как у Йенсена: цифры фрау Петерсен путает, а фразы помнит."),
  {
    t: "game",
    rule: ["zahlen/haben-1", "kennenlernen/endungen-3"],
    task: "Откройте шкафчик: поверните диски.",
    hint: HINT_LOCK,
    c: lock([
      ["У нас есть комната один.", [["Wir", "Ihr", "Er"], ["haben", "habt", "hat"], ["Raum eins.", "Raum einer.", "Raum eine."]]],
      ["У тебя есть время?", [["Hast", "Habe", "Hat"], ["du", "ich", "er"], ["Zeit?", "Zeiten?", "Uhr?"]]],
      ["Мне тридцать три года.", [["Ich", "Du", "Er"], ["bin", "habe", "hat"], ["dreiunddreißig.", "dreißigunddrei.", "drei-dreißig."]]],
    ]),
  },
  petersen("Der Schlüssel! Danke!", "Ключ! Спасибо!"),
  { t: "item", icon: "🔑", de: "der Schlüssel", ru: "ключ от комнаты один" },
  narr("Гости отвечают только письменно — значит, и подарок нужно предложить письменно. Образец письма у фрау Петерсен есть на всё."),
  {
    t: "game",
    rule: ["zahlen/haben-1"],
    task: "Напишите Грете письмо от имени фрау Петерсен.",
    hint: HINT_LETTER,
    c: letter(
      "Greta",
      ["Liebe Frau Schulz,", "Sie haben Zimmer fünfzehn. Wir haben Raum vier. Er ist groß und neu.", "Haben Sie Zeit? Meine Nummer ist null vier drei eins – zwölf.", "Viele Grüße", "Kerstin Petersen"],
      [
        an("Liebe", "Greta"),
        ["Zimmer jetzt → zwölf", "Sie haben Zimmer zwölf."],
        ["Neues Zimmer → Raum eins", "Wir haben Raum eins."],
        ["Raum eins → groß und neu", "Er ist groß und neu."],
        ["Frage → Zeit?", "Haben Sie Zeit?"],
        gruss("Kerstin Petersen"),
      ],
    ),
  },
  narr("Вы подсовываете письмо под {tuer}. И дверь впервые открывается."),
  { t: "pic", src: "02-greta.jpg", alt: "Грета в дверях комнаты 12: короткая светлая стрижка, карандаш за ухом, комбинезон в пятнах тёмно-синей краски; в руке письмо" },
  narr("На пороге Грета: короткая светлая стрижка, карандаш за ухом, рабочий комбинезон. Она читает письмо и пишет ответ на обороте."),
  hauke("Nein, danke. Zimmer zwölf ist gut. Bitte nicht fragen. Greta.", "Нет, спасибо. Комната двенадцать хорошая. Пожалуйста, не спрашивайте. Грета."),
  { t: "gap", task: "Что ответила Грета?", text: "Nein, danke. Zimmer zwölf ist ___.", options: ["gut", "neu", "groß"], answer: "gut", ru: "Нет, спасибо. Комната двенадцать хорошая." },
  { t: "type", rule: ["zahlen/check-3"], task: "Спросите Грету письменно: «У тебя есть время?»", answers: ["Hast du Zeit?", "Haben Sie Zeit?", "Greta, hast du Zeit?"], ru: "У тебя есть время?" },
  narr("Грета пишет одно слово — «Nein.» — и закрывает дверь. Тихо, но очень твёрдо."),
  {
    t: "pick",
    task: "Почему Грета отказывается от лучшей комнаты?",
    options: [
      ok("В комнате 12 у неё что-то, что не хочется переносить"),
      no("Ей не нравится вид на фьорд", "Вид на фьорд нравится всем в Киле. Даже чайке."),
      no("Она боится фрау Петерсен", "Фрау Петерсен боятся все, но Грета ей даже не ответила вслух."),
    ],
  },
  {
    t: "look",
    task: "Вспомните Грету в дверях.",
    items: [
      { icon: "🎨", de: "die Farbe", ru: "краска", note: "Пятна на комбинезоне — тёмно-синие, как фон таблички MOIN.", key: true },
      { icon: "👜", de: "die Tasche", ru: "сумка", note: "За её спиной тяжёлая сумка с инструментами. Так в отпуск не ездят.", key: true },
      { icon: "🪟", de: "das Fenster", ru: "окно", note: "Окно и правда не закрывается. На подоконнике крошки и серое перо." },
    ],
  },
  dana("Greta hat Farbe. Diagnose: Sie malt!", "У Греты краска. Диагноз: она рисует!"),
  {
    t: "hear",
    task: "Что говорит Дана?",
    voice: "Anna",
    de: "Greta hat Farbe. Diagnose: Sie malt!",
    options: ["У Греты краска", "Грета больна", "Грета красивая"],
    answer: "У Греты краска",
  },
  narr("Дана ставит новый диагноз: слова дня путаются в голове. Лечение — пары."),
  { t: "game", task: "Откройте пары: немецкое слово и перевод.", c: memory(["buero", "gaestezimmer", "gaestebuch", "stempel", "ring", "nachricht"]) },
  petersen("Raum eins? Nein, danke? Gut. Stempel! Haben Sie noch Fragen?", "Комната один? Нет, спасибо? Хорошо. Печать! У вас ещё есть вопросы?"),
  {
    t: "reply",
    task: "Ответьте фрау Петерсен: вопросов больше нет.",
    options: [
      ok("Nein, danke."),
      no("Ja, bitte.", "Тогда задайте вопрос. А если вопросов нет — Nein, danke."),
      no("Nein, ich habe Fragen.", "Нет — и тут же «у меня есть вопросы»? Фрау Петерсен ставит штамп «неясно»."),
    ],
  },
  narr("Фрау Петерсен раскладывает бумаги по ящикам der, die и das: систему Йенсена она переняла давно и никому в этом не признаётся."),
  {
    t: "game",
    task: "Помогите разложить карточки по ящикам der, die и das.",
    hint: HINT_DOCK,
    c: docks(["der Raum", "die Frage", "das Jahr", "der Kuchen", "die Zahl", "das Wasser", "die Prüfung", "das Brot"]),
  },
  {
    t: "clue",
    title: "Отказ Греты",
    text: "Грета отказалась от лучшей комнаты: «Zimmer zwölf ist gut. Bitte nicht fragen.» На комбинезоне тёмно-синяя краска, как на табличке.",
  },
];

// Сцена 6 · эпилог и крючок. Бросок: подарок игроку · Дана · неверно перевести · das Wasser · 16.
const evening: SceneNode[] = [
  { t: "pic", src: "02-evening.jpg", alt: "Вечер в клубе: Хауке с бланком регистрации, Дана со старым мобильным, Элиф, Йенсен с чаем в углу" },
  narr("Вечер. Хауке записывает экипаж «Sprotte» на Kieler Woche. {formular} требует от каждого: имя по буквам и номер телефона."),
  hauke("Jetzt du! Buchstabieren, bitte!", "Теперь ты! По буквам, пожалуйста!"),
  {
    t: "game",
    task: "Представьтесь, как на экзамене: сначала сами, потом сверьтесь с образцом.",
    hint: HINT_ORAL,
    c: oral([
      oralSay(1, "Назовите фамилию и произнесите её по буквам.", "Familienname? Buchstabieren!", "Mein Familienname ist Ospanowa. O – Es – Pe – A – En – O – We – A.", "Моя фамилия — Оспанова. О — эс — пэ — а — эн — о — вэ — а."),
      oralSay(1, "Назовите номер мобильного.", "Handynummer?", "Meine Handynummer ist null, eins, sieben, sechs. Drei, vier, sieben, sieben, eins, zwei.", "Мой номер мобильного: 0176 — 3 4 7 7 1 2."),
      oralSay(2, ASK, "Thema: Zahlen · Wort: Alter", "Wie alt sind Sie?", "Сколько вам лет?", "Wie …?"),
      oralReply(2, ANSWER, "Haben Sie ein Handy?", "Ja, ich habe ein Handy.", "Да, у меня есть мобильный."),
    ]),
  },
  hauke("Super! Die „Sprotte“ hat jetzt ein Team!", "Супер! У «Шпротты» теперь есть команда!"),
  jensen("Moin moin.", "Привет-привет."),
  {
    t: "reply",
    task: "Йенсен поднимает кружку. Ответьте так же разговорчиво.",
    options: [
      ok("Moin moin!"),
      no("Gute Nacht!", "Вечер ещё не кончился: рано желать спокойной ночи."),
      no("Auf Wiederhören!", "Так прощаются по телефону, а Йенсен сидит в двух шагах."),
    ],
  },
  narr("Хауке устраивает экзамен на скорость: в каждой стопке карточек одна лишняя."),
  {
    t: "game",
    task: "В каждой стопке одно лишнее слово.",
    c: odd([
      [["eins", "zwei", "drei", "das Brot"], "das Brot", "Brot — хлеб, остальное — числа."],
      [["das Handy", "die Telefonnummer", "die Handynummer", "der Kuchen"], "der Kuchen", "Kuchen — пирог, остальное — про телефон."],
      [["Wie bitte?", "Noch einmal, bitte.", "Langsam, bitte.", "Alles Gute!"], "Alles Gute!", "Alles Gute — поздравление, остальное — чтобы переспросить."],
    ]),
  },
  narr("Дана берёт мобильный Нильса и увеличивает вчерашнее фото. Что в кадре, кроме Нильса и Греты?"),
  {
    t: "look",
    task: "Рассмотрите увеличенное фото.",
    items: [
      { icon: "🥫", de: "die Dose", ru: "банка", note: "У ног Греты банка. На ней одно слово: «wasserfest».", key: true },
      { icon: "🪵", de: "der Aufsteller", ru: "подставка", note: "Подставка цела, табличка вчера ещё в рамке." },
      { icon: "🌊", de: "das Wasser", ru: "вода", note: "За подставкой вода гавани и мачты. Ничего подозрительного, кроме чайки." },
    ],
  },
  dana("Wasser – Fest! Greta hat ein Wasserfest!", "Вода — праздник! У Греты водный праздник!"),
  narr("Дана сияет: Wasser — вода, Fest — праздник. Значит, Грета готовит праздник на воде! Хауке хватается за голову."),
  hauke("Nein! Wasserfest – das ist Farbe für Boote!", "Нет! Wasserfest — это краска для лодок!"),
  {
    t: "hear",
    task: "Что такое wasserfest на самом деле?",
    voice: "Rocko",
    de: "Nein! Wasserfest – das ist Farbe für Boote!",
    options: ["краска для лодок", "праздник на воде", "питьевая вода"],
    answer: "краска для лодок",
  },
  { t: "gap", task: "Для чего эта краска?", text: "Das ist Farbe für ___.", options: ["Boote", "Brot", "Kuchen"], answer: "Boote", ru: "Это краска для лодок." },
  narr("fest — «крепкий», вместе — {wasserfest}. Лодочная краска. И тёмно-синяя, как пятна на комбинезоне Греты."),
  {
    t: "pick",
    task: "Что из этого следует?",
    options: [
      ok("Грета работает с лодочной краской — и мерила табличку"),
      no("Грета устраивает праздник на воде", "Это перевод Даны. Хотя… кто-то в клубе правда что-то празднует."),
      no("Банку принесла чайка", "Чайка носит булочки, а не краску. Элиф подтверждает."),
    ],
  },
  dana("Aber ein Fest … Der Club hat Geburtstag!", "Но праздник… У клуба же день рождения!"),
  narr("Ошибка Даны попала в точку дважды: Farbe — лодочная, а Fest — настоящий. Йенсен в углу поперхнулся чаем."),
  { t: "type", rule: ["zahlen/ja-nein-3"], task: "Запишите в блокнот: «Клубу сто лет».", answers: ["Der Club ist hundert Jahre alt.", "Der Club ist hundert.", "Der Club ist hundert Jahre alt!"], ru: "Клубу сто лет." },
  {
    t: "reply",
    task: "Поздравьте клуб — пока шёпотом.",
    options: [
      ok("Alles Gute, Club!"),
      no("Gute Nacht, Club!", "Это пожелание спокойной ночи, а не поздравление."),
      no("Auf Wiedersehen, Club!", "С клубом вы не прощаетесь: вы в нём детектив."),
    ],
  },
  {
    t: "pick",
    task: "Почему Йенсен поперхнулся?",
    options: [
      ok("Он знает о празднике больше, чем говорит"),
      no("Чай слишком горячий", "Йенсен пьёт этот чай сорок лет. Чай его не удивляет."),
      no("Он не любит праздники", "Тогда бы он сказал Moin и ушёл. А он поперхнулся."),
    ],
  },
  {
    ...narr("Пока все смотрят на Йенсена, {moewe} влетает в окно и уносит пакет с хлебом Даны. Целиком. Наглость растёт."),
    set: { gull: 1 },
  },
  elif("Das ist nicht kriminell! Die Möwe hat Hunger.", "Это не преступление! Чайка голодная."),
  { t: "game", task: `Спасите хотя бы слова! ${RACE}`, hint: HINT_RACE, c: race(["das Brot", "das Wasser", "der Kuchen", "die Zeit", "die Frage", "die Pause"]) },
  narr("Мобильный Нильса пищит в последний раз за день: «Ich habe noch ein Foto!!! Ein Foto von Opa!!! Morgen!!!»"),
  narr("Вы закрываете блокнот: «День второй. Найдено: {gaestezimmer} 12, номер Нильса, фото с {zollstock} и {dose} краски». Noch zehn Tage."),
  {
    t: "game",
    task: "Сведите числа дня.",
    c: pairs([["Gästezimmer von Nils und Greta", "zwölf"], ["Der Club ist … Jahre alt", "hundert"], ["Die PIN von Nils", "dreiundzwanzig – einundzwanzig"], ["Morgen: noch … Tage", "zehn"]]),
  },
  {
    t: "clue",
    title: "Банка «wasserfest»",
    text: "На фото у ног Греты — банка лодочной краски «wasserfest». Клубу сто лет, праздник — на старте Kieler Woche. Завтра Нильс пришлёт фото Opa.",
  },
];

const play = (nodes: SceneNode[]) => ({ kind: "play" as const, nodes });
const HINT = "Ошибка ничего не стоит: собеседник отреагирует, и можно выбрать снова.";

export const sceneChapter2: Episode = {
  id: "moin-neu-2",
  title: "Бирка без угла",
  day: { de: "Noch elf Tage", ru: "ещё одиннадцать дней до Kieler Woche" },
  place: "Kiellinie · офис клуба",
  topic: "Числа и алфавит",
  grammar: "0–1000 · haben · вопросы да/нет · по буквам",
  beats: [
    {
      id: "02-s1",
      title: "Доска отсчёта",
      story: [],
      prompt: "Доска отсчёта, бирка без угла и первый звонок по-немецки.",
      hint: HINT,
      success: "Вы знаете числа до двенадцати, номер фрау Петерсен и то, что Йенсен сегодня разговорчив.",
      challenge: play(countdown),
    },
    {
      id: "02-s2",
      title: "Номерок двадцать три",
      story: [],
      prompt: "Очередь в офисе, хлеб Даны и шёпот фрау Петерсен.",
      hint: "В немецком числе сначала единицы: dreiundzwanzig — 23.",
      success: "Комната 12 найдена, номерок обменян, а у клуба, оказывается, день рождения.",
      challenge: play(queue),
    },
    {
      id: "02-s3",
      title: "Три Хансена",
      story: [],
      prompt: "Гостевая книга, чайка с номером и автоответчик Нильса.",
      hint: "По буквам: E — «э», I — «и», Z — «цэт».",
      success: "У вас номер Нильса, у чайки — свой номер, а у Нильса — перерыв.",
      challenge: play(guestbook),
    },
    {
      id: "02-i1",
      title: "Möwen-Tagebuch: HEL 7305",
      pov: "глазами чайки",
      story: [],
      prompt: "Интерлюдия: чайка с номером.",
      hint: "Возраст — с sein: Ich bin zwölf.",
      success: "У женщины краска, а мужчина сказал Moin. Чайка, как всегда, не уточняет.",
      challenge: play(gullDiary),
    },
    {
      id: "02-s4",
      title: "Подарок Нильса",
      story: [],
      prompt: "Конверт из-под двери, PIN и вчерашнее фото.",
      hint: "ich habe, du hast, er / sie hat, wir haben.",
      success: "Вчера вечером табличка была на месте, Грета её мерила, а Нильс сам не знает, где она.",
      challenge: play(gift),
    },
    {
      id: "02-s5",
      title: "Отказ Греты",
      story: [],
      prompt: "Подарок фрау Петерсен, замок со шкафчиком и письмо Грете.",
      hint: "Возраст — с sein: Ich bin dreiunddreißig. С haben так не говорят.",
      success: "Грета отказалась от лучшей комнаты и попросила не спрашивать. Подозрение растёт.",
      challenge: play(refusal),
    },
    {
      id: "02-s6",
      title: "Wasserfest",
      story: [],
      prompt: "Регистрация экипажа и слово на банке.",
      hint: "fest — «крепкий»: wasserfest — не боится воды.",
      success: "День второй закончен. Завтра — фото Opa. Noch zehn Tage.",
      challenge: play(evening),
    },
  ],
};
