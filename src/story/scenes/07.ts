import { an, ANSWER, ASK, bingo, docks, gaps, gruss, gull as race, HINT_DOCK, HINT_HEAR, HINT_LETTER, HINT_LOCK, HINT_ODD, HINT_ORAL, HINT_PICTURE, HINT_RACE, HINT_SAY, HINT_SPELL, letter, letters, lock, odd, oral, order, pairs, RACE, RACE_STAKES, reply as oralReply, REQUEST, rumourChoice, say as oralSay, scene, sort, speak, verdict, write } from "../build.ts";
import { phrases } from "../data.ts";
import type { Challenge, ChatTurn, Episode, SceneNode } from "../types.ts";
import { twenty } from "../twenty.ts";
import { back } from "./back.ts";

// Глава 7 в формате сцен (A1-PLOT.md, «Формат сцен»): досуг и встречи, können и wollen, инфинитив
// в конце, gern, lieber, am liebsten, пригласить и отказаться. Вопрос главы — как поговорить с
// Йенсеном, который избегает команды. Вход — «Moin.» на записку, выход — записка Йенсена «Morgen um
// acht. Im Keller.» и ключ, а на фото с пляжа у Греты руки в краске. Ложный след (A1-PLOT.md,
// «Переработка глав 6–12»): опоздавшая Фрауке разносит «Greta arbeitet bei der Firma», а Нильс сказал
// «bei einer Firma für Boote» — несостыковка на артикле. Повороты брошены оракулом (seeds 1794159030
// и 1795220686), увязка — в журнале A1-STORYCRAFT.md.

const narr = (text: string): SceneNode => ({ t: "narr", text });
const learn = (words?: string[]) => (words ? { learn: words } : {});
const hauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Hauke", voice: "Rocko", de, ru, ...learn(words) });
const jensen = (de: string, ru: string): SceneNode => ({ t: "say", who: "Herr Jensen", voice: "Grandpa", de, ru });
const elif = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Elif", voice: "Flo", de, ru, ...learn(words) });
const dana = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Dana", voice: "Anna", de, ru, ...learn(words) });
const mateo = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Mateo", voice: "Reed", de, ru, ...learn(words) });
const frauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frauke", voice: "Sandy", de, ru, ...learn(words) });
const petersen = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frau Petersen", voice: "Sandy", de, ru, ...learn(words) });
/** Пары памяти — из выражений истории, которые глава уже показала. */
const memory = (ids: string[]): Challenge => ({ kind: "memory", pairs: ids.map((id) => ({ id, de: phrases[id].de, ru: phrases[id].ru })) });
const clock = (answer: string, traps: Record<string, string>): Challenge => ({ kind: "clock", start: "12:00", step: 15, answer, traps });
const turn = (say: string, ru: string, answer: string, options: [string, string, string][]): ChatTurn => ({
  say,
  ru,
  answer,
  options: options.map(([id, text, why]) => ({ id, text, why })),
});
const ok = (text: string) => ({ text, ok: true as const });
const no = (text: string, react: string) => ({ text, react });

// Сцена 1 · пролог и завязка: приглашение в кино. Бросок главы из плана: неприятность · Матео ·
// отказаться · der Film · 7 — Матео отказывается от кино, и подозрение падает на него.
const invite: SceneNode[] = [
  { t: "pic", src: "07-morning.jpg", alt: "Воскресное утро у клуба: Дана держит афишу вечера кино, Хауке показывает большой палец, Матео в фартуке с мукой качает головой; на причале Йенсен с кружкой смотрит на «Sprotte»" },
  narr("Siebter Tag, Sonntag, noch sechs Tage. Йенсен молчит, а Zeit уходит. У Даны план: позвать его туда, где разговор начинается сам."),
  dana("Wir laden Herrn Jensen ein! Heute Abend gibt es einen Film am Hafen.", "Пригласим господина Йенсена! Сегодня вечером у гавани фильм.", ["einladen", "der Film"]),
  hauke("Super Idee! Im Kino spricht man nicht viel. Das kann Herr Jensen!", "Отличная идея! В кино много не говорят. Это господин Йенсен умеет!", ["die Idee", "das Kino"]),
  narr("Heute Abend у клуба — {filmabend}: фильм прямо на стене. Йенсен стоит am Hafen и смотрит на «Sprotte»."),
  {
    t: "reply",
    rule: ["freizeit/check-3"],
    task: "Пригласите Йенсена в кино.",
    options: [
      ok("Herr Jensen, wollen Sie mit uns ins Kino gehen?"),
      no("Herr Jensen, wollen Sie mit uns ins Kino?", "Нужен глагол в конце: … ins Kino gehen?"),
      no("Herr Jensen, willst du mit uns ins Kino gehen?", "С Йенсеном вы на «вы»: wollen Sie."),
    ],
  },
  jensen("Ich kann nicht. Ich will segeln.", "Я не могу. Я хочу ходить под парусом."),
  {
    t: "hear",
    task: "Что ответил Йенсен?",
    voice: "Grandpa",
    de: "Ich kann nicht. Ich will segeln.",
    options: ["не может: хочет ходить под парусом", "придёт в кино", "у него работа"],
    answer: "не может: хочет ходить под парусом",
  },
  narr("Sechs Wörter! Хауке записывает их как рекорд недели. Но ins Kino Йенсен не пойдёт."),
  { t: "gap", rule: ["freizeit/ende-2"], task: "Что сказал Йенсен?", text: "Ich kann nicht. Ich will ___.", options: ["segeln", "segle", "Segel"], answer: "segeln", ru: "Я не могу. Я хочу ходить под парусом." },
  dana("Ins Kino gehen? Nein – segeln! Das verstehe ich nicht.", "Пойти в кино? Нет — под парусом! Этого я не понимаю.", ["ins Kino gehen", "verstehen"]),
  hauke("Er kann nicht, denn er will segeln!", "Он не может, потому что хочет ходить под парусом!"),
  {
    t: "game",
    rule: ["moin/denn-1"],
    task: "Запишите в блокнот причину одной фразой.",
    hint: "denn места не занимает: после него обычный порядок, глагол второй.",
    c: order(["Er", "kann", "nicht,", "denn", "er", "will", "segeln."], ["will", "denn", "Er", "segeln.", "nicht,", "er", "kann"]),
  },
  narr("Mateo kommt — руки в муке до локтей. Его тоже зовут на Film."),
  mateo("Kino? Nein! Ich will nicht ins Kino. Ich will kochen!", "Кино? Нет! Я не хочу в кино. Я хочу готовить!", ["wollen"]),
  hauke("Kieler Woche ist kein Urlaub – das ist Arbeit!", "Кильская неделя — не отпуск, это работа!", ["der Urlaub"]),
  {
    t: "type",
    rule: ["freizeit/modal-2"],
    task: "Запишите, что хочет Матео.",
    answers: ["Mateo will kochen.", "Er will kochen.", "Mateo will nicht ins Kino gehen.", "Mateo will kochen, nicht ins Kino."],
    ru: "Матео хочет готовить.",
  },
  {
    t: "game",
    rule: ["freizeit/modal-1"],
    task: "Пружина порядка слов: добавьте модальный глагол и отправьте действие в конец.",
    hint: "С модальным глаголом изменяемый глагол стоит на втором месте, а инфинитив уходит в конец.",
    c: {
      kind: "spring",
      rounds: [
        {
          ru: "«Завтра Хауке может пойти под парусом».",
          base: ["Morgen", "segelt", "Hauke."],
          trigger: "kann",
          start: ["Morgen", "Hauke", "kann", "segeln."],
          answer: ["Morgen", "kann", "Hauke", "segeln."],
          why: "После Morgen вторым идёт kann, а segeln в неопределённой форме уходит в конец.",
        },
        {
          ru: "«Сегодня Матео хочет готовить».",
          base: ["Heute", "kocht", "Mateo."],
          trigger: "will",
          start: ["Heute", "Mateo", "will", "kochen."],
          answer: ["Heute", "will", "Mateo", "kochen."],
          why: "will стоит на втором месте после Heute, а kochen замыкает фразу.",
        },
        {
          ru: "«Вечером Дана хочет поплавать».",
          base: ["Am Abend", "schwimmt", "Dana."],
          trigger: "will",
          start: ["Am Abend", "Dana", "will", "schwimmen."],
          answer: ["Am Abend", "will", "Dana", "schwimmen."],
          why: "Модальный глагол will — на втором месте, schwimmen — в самом конце.",
        },
      ],
    },
  },
  {
    t: "pick",
    task: "Матео тоже отказался. Что думает команда?",
    options: [
      ok("Матео что-то скрывает — он снова на кухне"),
      no("Матео не любит фильмы", "Вчера он сам сказал: «Das ist ein guter Film»."),
      no("Матео заболел", "Мука до локтей — не диагноз. Дана бы заметила."),
    ],
  },
  narr("Хауке раскладывает карточки: wer macht was gern? Вдруг найдётся Hobby, от которого Йенсен не откажется."),
  narr("На карточках ещё {wandern}, {radfahren}, {laufen} и {baden}. Хауке пишет крупно: Was macht Herr Jensen gern?"),
  narr("Если дождь — Tennis in der {halle}. Но Йенсен выходит в море и в дождь."),
  { t: "game", task: "Послушайте занятие и нажмите на картинку.", hint: HINT_PICTURE, c: scene([["schwimmen", "🏊"], ["tanzen", "💃"], ["lesen", "📖"], ["kochen", "🍳"], ["Fahrrad fahren", "🚲"], ["segeln", "⛵"], ["Tennis spielen", "🎾"], ["Gitarre spielen", "🎸"], ["grillen", "🍖"]]) },
  hauke("Und Danas Hobby? Das ist ein Geheimnis. Fragt mich!", "А хобби Даны? Это тайна. Спрашивайте меня!"),
  {
    t: "game",
    rule: ["kennenlernen/wortstellung-3"],
    task: "Хауке знает хобби Даны. Спрашивайте и вычёркивайте занятия, которые не подходят.",
    hint: "Вопрос «да или нет» начинается с глагола: Braucht man …? Macht man …?",
    c: twenty("hobbies", ["tennis", "schwimmen", "segeln", "kochen", "lesen", "tanzen"], "schwimmen", "Hauke", "Rocko"),
  },
  elif("Herr Jensen segelt jeden Morgen um acht. Immer allein!", "Господин Йенсен ходит под парусом каждое утро в восемь. Всегда один!"),
  { t: "gap", task: "Когда Йенсен выходит в море?", text: "Jeden Morgen um ___ segelt Herr Jensen.", options: ["acht", "halb acht", "sechs"], answer: "acht", ru: "Каждое утро в восемь господин Йенсен выходит под парусом." },
  {
    t: "game",
    task: "Хауке проверяет: одно слово в группе лишнее.",
    hint: HINT_ODD,
    c: odd([
      [["schwimmen", "segeln", "tanzen", "das Kino"], "das Kino", "Кино — место, остальное — что делают."],
      [["gern", "lieber", "am liebsten", "leider"], "leider", "leider — «к сожалению»; остальные — «люблю», «больше», «больше всего»."],
    ]),
  },
  {
    t: "game",
    task: "Проверьте блокнот: что верно?",
    c: verdict(["Richtig", "Falsch"], [
      ["Йенсен сказал шесть слов", true, "Ich kann nicht. Ich will segeln."],
      ["Йенсен придёт в кино", false, "Он хочет под парусом, не в кино."],
      ["Матео хочет готовить", true, "«Ich will kochen!»"],
    ]),
  },
  narr("Новая идея — {ausflug} на пляж. Пусть придёт весь {verein}: {eintritt} бесплатный, Wasser — тоже."),
  hauke("Gut. Kein Kino. Aber wir haben noch eine Idee!", "Ладно. Без кино. Но у нас есть ещё идея!"),
  {
    t: "reply",
    task: "Предложите Хауке другое: пикник на пляже, всей командой.",
    options: [
      ok("Wollen wir zusammen ein Picknick machen?"),
      no("Wollen wir zusammen ein Picknick?", "Нужен глагол в конце: … ein Picknick machen?"),
      no("Willst wir zusammen ein Picknick machen?", "wir — wollen: Wollen wir …?"),
    ],
  },
  {
    t: "type",
    rule: ["freizeit/check-3"],
    task: "Запишите новый план в блокнот.",
    answers: ["Wir machen ein Picknick.", "Wir machen zusammen ein Picknick.", "Ein Picknick am Strand."],
    ru: "Мы устраиваем пикник.",
  },
  {
    t: "clue",
    title: "Ich kann nicht",
    text: "Herr Jensen: «Ich kann nicht. Ich will segeln.» — sechs Wörter. Er segelt am Morgen um acht, immer allein. Mateo will nicht ins Kino — er will kochen.",
  },
];

// Сцена 2 · развитие: общий день. Броски: неприятность · Петерсен · забыть · das Buch · 9 и за кадром ·
// Петерсен · опоздать · das Buch · 4 (мелочь): книга клуба осталась дома, фрау Петерсен опаздывает.
const week: SceneNode[] = [
  { t: "pic", src: "07-office.jpg", alt: "Офис клуба: фрау Петерсен запыхавшись вбегает с толстой книгой под мышкой, Хауке и Дана стоят у стола с недельным календарём, Лотта показывает на часы" },
  narr("Für ein Picknick нужен день, когда у всех есть Zeit. Всё записано im Buch фрау Петерсен. А книга сегодня — zu Hause."),
  hauke("Wo ist Frau Petersen? Und wo ist das Buch?", "Где фрау Петерсен? И где книга?", ["das Buch"]),
  narr("Frau Petersen kommt zehn Minuten zu spät — впервые за двадцать лет. Запыхавшись, das Buch под мышкой."),
  petersen("Entschuldigung, ich komme zu spät! Ich hole das Buch von zu Hause – hier ist es!", "Извините, я опоздала! Я ходила домой за книгой — вот она!", ["holen"]),
  {
    t: "hear",
    task: "Почему опаздывает фрау Петерсен?",
    voice: "Sandy",
    de: "Entschuldigung, ich komme zu spät! Ich hole das Buch von zu Hause – hier ist es!",
    options: ["ходила домой за книгой", "проспала", "ждала автобус"],
    answer: "ходила домой за книгой",
  },
  {
    t: "reply",
    task: "Успокойте фрау Петерсен: книга ведь уже у неё под мышкой.",
    options: [
      ok("Kein Problem! Jetzt ist das Buch hier."),
      no("Kein Problem! Jetzt ist das Buch zu Hause.", "Книга уже здесь — под мышкой у фрау Петерсен."),
      no("Kein Problem! Jetzt sind das Buch hier.", "Одна книга — ist: das Buch ist hier."),
    ],
  },
  narr("В книге — вся Woche клуба. Wer hat wann Zeit — и когда свободен Йенсен?"),
  petersen("Am Montag kann ich nicht. Am Dienstag habe ich Zeit. Und Sie?", "В понедельник я не могу. Во вторник у меня есть время. А у вас?", ["Zeit haben", "können", "der Dienstag"]),
  {
    t: "hear",
    task: "Когда у фрау Петерсен есть время?",
    voice: "Sandy",
    de: "Am Montag kann ich nicht. Am Dienstag habe ich Zeit. Und Sie?",
    options: ["во вторник", "в понедельник", "сегодня"],
    answer: "во вторник",
  },
  hauke("Und ich habe am Mittwoch Zeit!", "А у меня время в среду!", ["der Mittwoch"]),
  dana("Und ich kann erst am Donnerstag.", "А я могу только в четверг.", ["der Donnerstag", "erst"]),
  {
    t: "game",
    rule: ["freizeit/verabreden-1", "moin/denn-1"],
    task: "Фрау Петерсен спрашивает о свободном дне. Ответьте.",
    hint: "Отказ — leider и причина с denn; потом новый день: Am … habe ich Zeit.",
    c: {
      kind: "chat",
      who: "Frau Petersen",
      voice: "Sandy",
      turns: [
        turn("Können Sie am Montag?", "Вы можете в понедельник?", "leider", [
          ["leider", "Leider nicht, denn am Montag arbeite ich.", ""],
          ["kann", "Leider kann ich am Montag.", "Leider — «к сожалению», а дальше согласие? Скажите, что не можете: Leider nicht."],
          ["nicht", "Ich kann nicht am Montag kommen nicht.", "Одного nicht хватит: Am Montag kann ich nicht."],
        ]),
        turn("Und am Dienstag?", "А во вторник?", "ja", [
          ["ja", "Ja, am Dienstag habe ich Zeit.", ""],
          ["hat", "Ja, am Dienstag hat ich Zeit.", "ich — habe: Ich habe Zeit."],
          ["um", "Ja, um Dienstag habe ich Zeit.", "Дни недели — с am: am Dienstag."],
        ]),
        turn("Und Herr Jensen?", "А господин Йенсен?", "segelt", [
          ["segelt", "Herr Jensen segelt jeden Morgen um acht.", ""],
          ["will", "Herr Jensen will ins Kino gehen.", "В кино он как раз не хочет: Ich kann nicht. Ich will segeln."],
          ["kann", "Herr Jensen kann nicht segeln.", "Ещё как может: он ходит под парусом каждое утро."],
        ]),
      ],
    },
  },
  {
    t: "game",
    task: "Ежедневник клуба: отметьте занятое ✗ и поставьте пикник ★ туда, где свободны все.",
    hint: "Прочитайте каждую запись: кто когда не может.",
    c: {
      kind: "planner",
      days: ["Sonntag", "Montag", "Dienstag"],
      hours: ["am Vormittag", "am Nachmittag"],
      notes: [
        { who: "Frau Petersen", de: "Am Montag kann ich nicht.", ru: "В понедельник я не могу.", busy: ["Montag|am Vormittag", "Montag|am Nachmittag"] },
        { who: "Elif", de: "Am Dienstag habe ich keine Zeit.", ru: "Во вторник у меня нет времени.", busy: ["Dienstag|am Vormittag", "Dienstag|am Nachmittag"] },
        { who: "Herr Jensen", de: "Am Vormittag segle ich.", ru: "До обеда я хожу под парусом.", busy: ["Sonntag|am Vormittag", "Montag|am Vormittag", "Dienstag|am Vormittag"] },
      ],
    },
  },
  {
    t: "game",
    rule: ["freizeit/verabreden-1"],
    task: "Групповой чат клуба: сначала выберите нужное сообщение, затем ответьте именно на него.",
    hint: "Нажмите «Ответить» под тем сообщением, о котором просит шаг.",
    c: {
      kind: "groupchat",
      title: "Club-Chat · Sonntag",
      messages: [
        { id: "m1", who: "Hauke", voice: "Rocko", de: "Gehen wir heute Abend ins Kino?", ru: "Пойдём сегодня вечером в кино?" },
        { id: "m2", who: "Mateo", voice: "Reed", de: "Ich kann nicht, ich will kochen.", ru: "Я не могу, я хочу готовить." },
        { id: "m3", who: "Frau Petersen", voice: "Sandy", de: "Am Montag kann ich nicht. Am Dienstag habe ich Zeit.", ru: "В понедельник я не могу. Во вторник у меня есть время." },
        { id: "m4", who: "Dana", voice: "Anna", de: "Heute haben alle Zeit! Machen wir ein Picknick am Strand?", ru: "Сегодня у всех есть время! Устроим пикник на пляже?" },
        { id: "m5", who: "Herr Jensen", voice: "Grandpa", de: "Moin.", ru: "Привет." },
      ],
      steps: [
        {
          prompt: "Выберите сообщение Матео и уточните про пикник.",
          replyTo: "m2",
          answer: "s1a",
          options: [
            { id: "s1a", text: "Kein Problem! Kochst du auch für das Picknick?", why: "" },
            { id: "s1b", text: "Am Dienstag habe ich keine Zeit.", why: "Это сообщение фрау Петерсен, а не Матео." },
            { id: "s1c", text: "Der Film beginnt um acht.", why: "Матео отказался от кино: он хочет готовить." },
          ],
        },
        {
          prompt: "Теперь выберите предложение Даны о пикнике и согласитесь.",
          replyTo: "m4",
          answer: "s2a",
          options: [
            { id: "s2a", text: "Ja, super Idee! Wann treffen wir uns am Strand?", why: "" },
            { id: "s2b", text: "Leider kann ich am Dienstag nicht.", why: "Дана предлагает встретиться сегодня, а не во вторник." },
            { id: "s2c", text: "Wir gehen doch ins Kino.", why: "Дана как раз предлагает пойти на пикник вместо кино." },
          ],
        },
      ],
    },
  },
  narr("Дана ведёт пальцем по странице: heute, Sonntag — почти у всех есть Zeit. Только Йенсен wie immer на воде."),
  dana("Heute haben alle Zeit. Wir machen das Picknick heute! Am Strand.", "Сегодня у всех есть время. Устроим пикник сегодня! На пляже."),
  mateo("Wunderbar! Wir sehen uns um zwei am Strand!", "Чудесно! Увидимся в два на пляже!", ["wunderbar"]),
  {
    t: "pick",
    task: "Когда пикник?",
    options: [
      ok("Сегодня, в воскресенье, на пляже"),
      no("Во вторник", "Во вторник свободна фрау Петерсен. А Дана говорит: heute."),
      no("Завтра в восемь", "В восемь утра Йенсен на воде. Пикник — сегодня."),
    ],
  },
  {
    t: "game",
    task: "Поставьте часы на время, когда Йенсен каждое утро выходит в море.",
    hint: "jeden Morgen um acht — 8:00.",
    c: clock("08:00", {
      "20:00": "Это acht Uhr am Abend. Йенсен выходит утром.",
      "08:30": "Это halb neun.",
      "07:00": "Это sieben Uhr.",
    }),
  },
  hauke("Um acht? So früh? Um acht schlafe ich!", "В восемь? Так рано? В восемь я сплю!", ["so"]),
  { t: "gap", rule: ["freizeit/ende-4"], task: "Что сказала фрау Петерсен о понедельнике?", text: "Am Montag ___ ich nicht.", options: ["kann", "kannst", "können"], answer: "kann", ru: "В понедельник я не могу." },
  {
    t: "type",
    rule: ["freizeit/modal-1"],
    task: "Запишите в книгу клуба: сегодня все могут прийти.",
    answers: ["Heute können alle kommen.", "Alle können heute kommen.", "Heute können wir alle kommen."],
    ru: "Сегодня все могут прийти.",
  },
  petersen("Ein Picknick? Dann brauchen wir ein Formular.", "Пикник? Тогда нам нужен формуляр."),
  { t: "game", task: "Фрау Петерсен подписывает страницы книги. Помогите по буквам.", hint: HINT_SPELL, c: letters(["die Freizeit", "die Einladung", "das Hobby"]) },
  {
    t: "game",
    task: "Хауке проверяет: что в группе лишнее?",
    hint: HINT_ODD,
    c: odd([
      [["das Kino", "das Konzert", "die Party", "der Montag"], "der Montag", "Понедельник — день; остальное — куда идут."],
      [["immer", "oft", "manchmal", "heute"], "heute", "heute — сегодня; остальные — как часто."],
    ]),
  },
  {
    t: "clue",
    title: "Das Buch",
    text: "Heute, Sonntag: alle haben Zeit. Picknick am Strand. Herr Jensen segelt am Morgen um acht — immer allein. Frau Petersen braucht ein Formular.",
  },
];

// Сцена 3 · развилка: приглашение расползается. Броски: второстепенный герой по своей черте · Нильс ·
// подслушать · die Einladung · 15 (Нильс зовёт весь клуб), второстепенный герой по своей черте ·
// Петерсен · обменять · die Party · 13 (из пикника выходит официальная вечеринка с формуляром).
const party: SceneNode[] = [
  { t: "pic", src: "07-party.jpg", alt: "Клуб днём: Нильс в красной ветровке размахивает телефоном и зовёт всех, фрау Петерсен раздаёт формуляры, Элиф с пакетом рыбы для чаек, Фрауке у киоска шепчется с очередью" },
  narr("Nils hört alles — через стену. Eine Minute später: {nachricht} an den ganzen Club — с прежней щедростью на «!»."),
  narr("«Picknick!!! Heute!!! Am Strand!!! Alle!!! Herr Jensen auch!!!»"),
  hauke("Alle? Der ganze Club? Wir wollen nur mit Herrn Jensen sprechen!", "Все? Весь клуб? Мы хотим поговорить только с господином Йенсеном!"),
  {
    t: "pick",
    task: "Что теперь делать с приглашением?",
    options: [
      ok("Идти на пикник со всеми: Нильса уже не остановить"),
      no("Отменить пикник", "Поздно: у Нильса уже сорок «!» и сорок гостей."),
      no("Позвать только Йенсена", "Нильс уже позвал всех. И Йенсена тоже."),
    ],
  },
  {
    t: "go",
    task: "Приглашение уже не остановить. С чего начать?",
    next: "Дальше по делу",
    branches: [
      {
        label: "Формуляр Петерсен",
        icon: "🗂️",
        nodes: [
          petersen("Eine Party für den Club braucht ein Formular. Name, wer kommt mit, wer bringt was.", "Вечеринке клуба нужен формуляр. Имя, кто идёт, кто что приносит.", ["die Party", "mitkommen"]),
          narr("Frau Petersen macht aus dem Picknick eine «Club-Party am Strand» — mit Stempel. Так спокойнее."),
          { t: "gap", rule: ["freizeit/check-1"], task: "Какая графа стоит в формуляре?", text: "Wer kann ___?", options: ["mitkommen", "kommen mit", "mitkommt"], answer: "mitkommen", ru: "Кто может пойти с нами?" },
          {
            t: "game",
            rule: ["freizeit/check-1"],
            task: "Заполните формуляр вечеринки.",
            hint: "mitkommen: с модальным глаголом приставка не отрывается — Wer kann mitkommen?",
            c: write("Club-Party am Strand", [
              ["Wann?", "heute", "am Sonntag", "heute, am Sonntag"],
              ["Wo?", "am Strand", "Strand"],
              ["Wer kommt mit?", "alle", "der ganze Club", "Alle"],
              ["Was bringen Sie mit?", "Brot", "Wasser", "Kuchen", "Saft", "Obst"],
            ]),
          },
          petersen("Gut. Das Formular ist fertig. Jetzt ist es eine Party!", "Хорошо. Формуляр готов. Теперь это вечеринка!", ["fertig"]),
          {
            t: "pick",
            task: "Что изменилось?",
            options: [
              ok("Разговор с Йенсеном стал праздником всего клуба"),
              no("Пикник отменили", "Наоборот: теперь он с печатью."),
              no("Йенсен согласился прийти", "Его согласия в формуляре нет. Графа «Herr Jensen» пуста."),
            ],
          },
        ],
      },
      {
        label: "Слух Фрауке",
        icon: "🗞️",
        nodes: [
          frauke("Nils? Nils ist bei der Polizei! Da, am Hafen! Ich sehe ihn!", "Нильс? Нильс в полиции! Вон там, у гавани! Я его вижу!"),
          { ...narr("К обеду у Kiosk все знают: Nils ist bei der Polizei! Слух растёт быстрее, чем очередь."), set: { rumours: 1 } },
          {
            t: "hear",
            task: "Что говорит Фрауке о Нильсе?",
            voice: "Sandy",
            de: "Nils? Nils ist bei der Polizei! Da, am Hafen! Ich sehe ihn!",
            options: ["Нильс в полиции", "Нильс на пляже", "Нильс уехал"],
            answer: "Нильс в полиции",
          },
          {
            t: "type",
            task: "Спросите Нильса письменно, где он.",
            answers: ["Wo bist du?", "Nils, wo bist du?", "Wo bist du, Nils?"],
            ru: "Где ты?",
          },
          narr("Ответ мгновенный: «Polizei??? Ich frage nur: Wo ist der Strand???»"),
          {
            t: "game",
            task: "Поставьте штамп: что Фрауке видела сама, а что додумала?",
            c: verdict(["Видела", "Додумала"], [
              ["Нильс был у полиции", true, "Он спрашивал дорогу у полицейского — это она видела."],
              ["Нильса арестовали", false, "Он спрашивал дорогу к пляжу. Ареста не было."],
              ["Нильс идёт на пляж", true, "«Zum Strand!!!» — сам написал."],
            ]),
          },
          { ...narr("Фрауке смеётся и пишет ins Journal: «Nils — Polizei — Strand». Слух сдулся."), set: { rumours: -1 } },
        ],
      },
      {
        label: "Покормить правильно",
        icon: "🐟",
        optional: true,
        nodes: [
          elif("Am Strand gibt es viele Möwen. Bitte kein Brot! Brot ist nicht gut für Möwen.", "На пляже много чаек. Пожалуйста, никакого хлеба! Хлеб чайкам вреден."),
          { t: "gap", task: "Что говорит Элиф про хлеб?", text: "Brot ist nicht ___ für Möwen.", options: ["gut", "groß", "teuer"], answer: "gut", ru: "Хлеб чайкам вреден." },
          {
            t: "game",
            task: "Элиф раздаёт памятку. Что чайкам можно, а что нельзя?",
            hint: "Чайка — морская птица: ей годится то, что живёт в море.",
            c: sort([["ja", "Ja"], ["nein", "Nein"]], [
              ["fisch", "ein kleiner Fisch", "ja", "🐟"],
              ["muschel", "eine Muschel", "ja", "🐚"],
              ["brot", "das Brot", "nein", "🍞"],
              ["kuchen", "der Kuchen", "nein", "🍰"],
              ["chips", "Chips", "nein", "🍟"],
            ]),
          },
          { ...narr("Die Möwen am Club sehen Elif an. Красть Brot стало скучно: Fisch — лучше."), set: { gull: -2 } },
        ],
      },
    ],
  },
  hauke("Gut, eine Party. Aber Herr Jensen kommt nicht!", "Ладно, вечеринка. Но господин Йенсен не придёт!"),
  {
    t: "game",
    rule: ["freizeit/gern-1"],
    task: "Нильс рассылает анкету гостей: кто что любит больше всего?",
    hint: "gern — люблю, lieber — больше, am liebsten — больше всего.",
    c: gaps("Hauke spielt ___ Fußball, ___ segelt er, aber ___ isst er Fischbrötchen.", ["gern", "lieber", "am liebsten", "nie"], ["gern", "lieber", "am liebsten"]),
  },
  narr("Во второй графе анкеты Нильса — «Was magst du?». Матео отвечает первым и громко."),
  mateo("Ich mag Fisch! Und ich koche gern Fisch!", "Я люблю рыбу! И я люблю готовить рыбу!"),
  { t: "gap", rule: ["moin/moegen-1"], task: "Что Матео написал в анкете?", text: "Mateo ___ Fisch.", options: ["mag", "magt", "mögen"], answer: "mag", ru: "Матео любит рыбу." },
  {
    t: "reply",
    rule: ["moin/moegen-1"],
    task: "Ответьте в анкете Нильса: вы любите кофе.",
    options: [
      ok("Ich mag Kaffee."),
      no("Ich mage Kaffee.", "ich mag — без окончания, как ich kann."),
      no("Ich gern Kaffee.", "gern не заменяет глагол: Ich mag Kaffee или Ich trinke gern Kaffee."),
    ],
  },
  narr("В последней графе — {lieblingsfilm} и вопрос с глаголом {gefallen}. Нравится то, что стоит в начале фразы."),
  hauke("Mir gefällt die Idee! Und dir?", "Мне нравится идея! А тебе?", ["dir"]),
  {
    t: "type",
    task: "Запишите в блокнот, где и когда вечеринка.",
    answers: ["Heute ist eine Party am Strand.", "Die Party ist heute am Strand.", "Heute Party am Strand."],
    ru: "Сегодня вечеринка на пляже.",
  },
  narr("На пляже будет {feuer}, {disco} из колонки Нильса и большая {gruppe} гостей."),
  narr("А ещё — {lustig} конкурс. Главное — {mitmachen}, а не {gewinnen}."),
  { t: "game", task: "Нильс раскладывает приглашения по ящикам: der, die, das.", hint: HINT_DOCK, c: docks(["die Freizeit", "das Hobby", "der Sport", "die Idee", "der Park", "das Schwimmbad", "der Ausflug", "die Gruppe", "die Disco", "das Feuer"]) },
  {
    t: "clue",
    title: "Club-Party am Strand",
    text: "Nils lädt alle ein: «Heute!!! Am Strand!!! Alle!!!» Frau Petersen macht ein Formular — jetzt ist es eine Party. Nils ist nicht bei der Polizei: er fragt nur: «Wo ist der Strand?»",
  },
];

// Фрауке слышит конец объявления и теряет артикль: из «einer Firma für Boote» выходит «der Firma».
const FRAUKE_FIRMA = "Bin ich zu spät? Egal! Ich weiß es: Greta arbeitet bei der Firma!";

// Сцена 4 · поворот: пляж. Отсылка — «Челюсти»: «Нам нужна лодка побольше». Шутка главы из плана —
// чайка уносит пляжный мяч; на фото Нильса у Греты руки в краске.
const beach: SceneNode[] = [
  { t: "pic", src: "07-beach.jpg", alt: "Пляж на Балтике днём: весь клуб на пледах, Хауке у «Sprotte» с горой корзин и пледов, чайка уносит надувной мяч, на заднем плане Нильс фотографирует, а у края кадра Грета в комбинезоне прячет руки в тёмно-синей краске" },
  narr("Am Strand — весь клуб: пледы, корзины, Kuchen, Wasser. {picknick} на vierzig человек. Хауке смотрит на «Sprotte», потом на гору вещей."),
  hauke("Wir brauchen ein größeres Boot.", "Нам нужна лодка побольше."),
  narr("Так говорят в старом фильме про акулу. Акулы in der Ostsee нет. Зато есть {moewe}."),
  {
    t: "look",
    task: "Осмотрите пляж.",
    items: [
      { icon: "🏖️", de: "der Strand", ru: "пляж", note: "Белый песок, ветер, сорок пледов. Йенсена нет.", key: true },
      { icon: "🧺", de: "das Picknick", ru: "пикник", note: "Kuchen от фрау Петерсен, Fischbrötchen от Фрауке, Brot от Матео — накрыт полотенцем." },
      { icon: "📷", de: "fotografieren", ru: "фотографировать", note: "Нильс снимает всех подряд. «Für das Club-Album!!!»", key: true },
      { icon: "⛵", de: "segeln", ru: "ходить под парусом", note: "Далеко в заливе — маленький парус. Йенсен." },
    ],
  },
  narr("За пляжем — {garten} клуба. Там растёт {baum}, а у забора — {blume} в банке из-под краски."),
  {
    t: "game",
    task: "Кто что принёс на пикник?",
    hint: "Загляните в корзину на пледе.",
    c: pairs([["Frau Petersen", "Kuchen"], ["Frauke", "Fischbrötchen"], ["Mateo", "Brot"], ["Nils", "das Handy"]]),
  },
  elif("Die Möwe! Sie hat den Ball!", "Чайка! У неё мяч!"),
  narr("{moewe} nimmt {strandball} — лёгкий, как обещание Хауке, — и летит над Wasser."),
  { t: "game", task: `Отбейте мяч! ${RACE}`, hint: HINT_RACE, outcome: RACE_STAKES, c: race(["schwimmen", "tanzen", "zusammen", "die Party", "die Idee", "leider", "oft", "manchmal", "nicht gern"]) },
  hauke("Ich hole den Ball. Ich komme wieder!", "Я принесу мяч. Я вернусь!"),
  narr("Как в старом фильме про робота: «I'll be back». Хауке возвращается через vierzig Minuten — без мяча, зато с мороженым."),
  {
    t: "hear",
    task: "Что пообещал Хауке?",
    voice: "Rocko",
    de: "Ich hole den Ball. Ich komme wieder!",
    options: ["принести мяч и вернуться", "уйти домой", "купить мороженое"],
    answer: "принести мяч и вернуться",
  },
  narr("Для Нильса каждое фото — {bild}, как в музее. Сегодня у него целая выставка."),
  narr("Нильс показывает Fotos дня: vierzig Stück. На фото neununddreißig, у самого края, — Грета. И крупно — {hand}."),
  dana("Seht mal! Greta! Ihre Hände – dunkelblau!", "Посмотрите! Грета! Её руки — тёмно-синие!"),
  {
    t: "pick",
    task: "Что на фото?",
    options: [
      ok("У Греты руки в тёмно-синей краске"),
      no("Грета держит табличку", "Таблички на фото нет. Только руки."),
      no("Это не Грета", "Платиновые волосы, комбинезон, карандаш за ухом — она."),
    ],
  },
  narr("Грета была на пляже eine Minute: увидела камеру и ушла. Нильс пожимает плечами: «Greta mag keine Fotos!!!»"),
  elif("Keine Fotos. Aber die Hände sind dunkelblau.", "Никаких фото. Но руки — тёмно-синие."),
  mateo("Und wo ist mein Brot? … Das Brot ist für später!", "А где мой хлеб?… Хлеб — на потом!"),
  {
    t: "hear",
    task: "Что Матео говорит про свой хлеб?",
    voice: "Reed",
    de: "Und wo ist mein Brot? … Das Brot ist für später!",
    options: ["хлеб — на потом", "хлеб съела чайка", "хлеба нет"],
    answer: "хлеб — на потом",
  },
  {
    t: "type",
    rule: ["freizeit/modal-1"],
    task: "Запишите в блокнот, чего не может сделать команда.",
    answers: ["Wir können nicht mit Herrn Jensen sprechen.", "Wir können Herrn Jensen nicht sprechen.", "Herr Jensen kann nicht kommen."],
    ru: "Мы не можем поговорить с господином Йенсеном.",
  },
  {
    t: "game",
    task: "Кто на пляже что делает?",
    hint: "Посмотрите на пляж ещё раз.",
    c: sort([["wasser", "im Wasser"], ["strand", "am Strand"]], [
      ["jensen", "Herr Jensen segelt", "wasser", "⛵"],
      ["hauke", "Hauke sucht den Ball", "wasser", "🏐"],
      ["nils", "Nils fotografiert", "strand", "📷"],
      ["mateo", "Mateo isst Brot", "strand", "🍞"],
    ]),
  },
  {
    t: "type",
    task: "Запишите, что видно на фото 39.",
    answers: ["Die Hände von Greta sind dunkelblau.", "Gretas Hände sind dunkelblau.", "Greta hat Farbe an den Händen."],
    ru: "Руки Греты тёмно-синие.",
  },
  narr("Nils macht die Musik aus: {disco} ist zu Ende. Jetzt spricht Nils — но ветер рвёт каждое слово."),
  {
    t: "game",
    task: "Колонка Нильса трещит на ветру. Выберите вопрос, чтобы расслышать пропущенное.",
    c: {
      kind: "radio",
      rounds: [
        {
          who: "Nils · Lautsprecher",
          voice: "Reed",
          before: "Opa Hansen kommt",
          after: "zur Party!!!",
          hidden: "am Samstag",
          ru: "Опа Хансен приедет в субботу на праздник!",
          questions: [
            { id: "wann", text: "Wann kommt Opa Hansen?" },
            { id: "wer", text: "Wer kommt mit Opa Hansen?", why: "Пропало, когда он приедет, а не с кем." },
            { id: "wo", text: "Wo wohnt Opa Hansen?", why: "В этой фразе — когда, а не где." },
          ],
          answer: "wann",
        },
        {
          who: "Nils · Lautsprecher",
          voice: "Reed",
          before: "Greta arbeitet bei",
          after: "– sie hat nie Zeit für den Strand!!!",
          hidden: "einer Firma für Boote",
          ru: "Грета работает в одной фирме для лодок — у неё никогда нет времени на пляж!",
          questions: [
            { id: "wo", text: "Wo arbeitet Greta?" },
            { id: "wann", text: "Wann kommt Greta wieder?", why: "Пропало, где она работает, а не когда придёт." },
            { id: "was", text: "Was isst Greta gern?", why: "Нильс говорит о работе, а не о еде." },
          ],
          answer: "wo",
        },
        {
          who: "Nils · Lautsprecher",
          voice: "Reed",
          before: "Um sieben gibt es",
          after: "am Strand!!!",
          hidden: "ein Feuer",
          ru: "В семь на пляже будет костёр!",
          questions: [
            { id: "was", text: "Was gibt es um sieben?" },
            { id: "wann", text: "Wann ist die Party zu Ende?", why: "Время Нильс назвал сам: um sieben. Пропало, что будет." },
            { id: "wer", text: "Wer macht am Strand Sport?", why: "Про спорт Нильс не говорил: пропало, что будет в семь." },
          ],
          answer: "was",
        },
      ],
    },
  },
  narr("Нильс показывает на телефоне семейное фото: Opa kommt am Samstag — und das ist die ganze Familie."),
  {
    t: "game",
    task: "Семья Нильса: впишите имена в семейное дерево.",
    hint: "Читайте по строчке: Schwester — сестра, Vater — отец, Opa и Oma — дедушка и бабушка.",
    c: {
      kind: "tree",
      text: [
        { de: "Ich bin Nils. Greta ist meine Schwester.", ru: "Я Нильс. Грета — моя сестра." },
        { de: "Unser Vater heißt Peter.", ru: "Нашего отца зовут Петер." },
        { de: "Unser Opa heißt Heinrich Hansen. Er ist neunzig!", ru: "Нашего дедушку зовут Хайнрих Хансен. Ему девяносто!" },
        { de: "Und unsere Oma heißt Hilde.", ru: "А нашу бабушку зовут Хильде." },
      ],
      root: {
        id: "opa",
        icon: "👴",
        partner: { id: "oma", icon: "👵" },
        children: [{ id: "vater", children: [{ id: "nils", icon: "🧑", given: "Nils" }, { id: "greta", icon: "👩" }] }],
      },
      names: ["Heinrich", "Hilde", "Peter", "Greta", "Hauke"],
      answer: { opa: "Heinrich", oma: "Hilde", vater: "Peter", greta: "Greta" },
    },
  },
  narr("Und dann kommt Frauke — eine Stunde zu spät. На Party она опаздывает всегда, на новость — никогда. Sie hört nur das Ende."),
  frauke(FRAUKE_FIRMA, "Я опоздала? Неважно! Я знаю: Грета работает в той самой фирме!"),
  {
    t: "hear",
    task: "Что разносит Фрауке?",
    voice: "Sandy",
    de: FRAUKE_FIRMA,
    options: ["Грета работает в той самой фирме", "Грета уехала к Opa Hansen", "Грета не любит пляж"],
    answer: "Грета работает в той самой фирме",
  },
  { ...narr("Am Abend weiß der ganze Strand: Greta und {firma}! Та самая, mit dem Schild aus Plastik. Слух растёт быстрее, чем очередь."), set: { rumours: 1 } },
  hauke("Bei der Firma! Darum hat sie Farbe an den Händen!", "В той фирме! Вот почему у неё краска на руках!"),
  rumourChoice(
    "Stimmt das, Hauke? Wir fragen zuerst Nils.",
    "Greta bei der Firma? Das erzähle ich allen!",
    no("Stimmst das, Hauke? Wir fragen zuerst Nils.", "das — третье лицо: stimmt."),
  ),
  {
    t: "pick",
    task: "Что сказал Нильс в колонку?",
    options: [
      ok("Грета работает «bei einer Firma für Boote» — в какой-то фирме для лодок"),
      no("Грета работает «bei der Firma» — в той самой фирме табличек", "Так передаёт Фрауке: она слышала только конец. Нильс сказал einer — какая-то фирма, и для лодок."),
      no("Грета работает в киоске", "Киоск — это Фрауке. Нильс говорил о фирме для лодок."),
    ],
  },
  elif("Eine Firma für Boote? Das ist nicht die Firma mit dem Plastik.", "Фирма для лодок? Это не та фирма с пластиком."),
  hauke("Vielleicht macht die Firma auch Schilder für Boote!", "А может, та фирма делает таблички и для лодок!"),
  narr("Хауке путает: {see} — это озеро. А Ostsee — море, и у моря артикль die."),
  {
    t: "clue",
    title: "Foto 39",
    text: "Foto von Nils, am Strand: Greta, ihre Hände dunkelblau. Eine Minute — und Greta geht. Nils: «Greta arbeitet bei einer Firma für Boote.» Frauke: «Bei der Firma!» Herr Jensen segelt, allein.",
  },
];

// Сцена 5 · кульминация. Бросок: нить закрывается раньше срока · Хауке · промокнуть · die Idee · 15:
// идея Хауке — выйти к Йенсену на «Шпротте»; он падает в воду, Йенсен вытаскивает его и пишет записку.
const water: SceneNode[] = [
  { t: "pic", src: "07-water.jpg", alt: "Залив: «Sprotte» накренилась, мокрый Хауке в жёлтой куртке висит на борту лодки Йенсена, Йенсен в фуражке протягивает ему руку; на берегу ахает весь клуб" },
  hauke("Ich habe eine Idee! Herr Jensen will segeln – also segeln wir zu ihm!", "У меня идея! Господин Йенсен хочет под парусом — значит, мы к нему под парусом!"),
  elif("Ich würde gern mitkommen! Aber ich kann nicht segeln.", "Я бы с удовольствием с тобой! Но я не умею ходить под парусом."),
  {
    t: "reply",
    rule: ["moin/wuerde-1"],
    task: "Скажите Хауке так же вежливо: вы бы тоже с удовольствием поплыли.",
    options: [
      ok("Ich würde auch gern mitkommen!"),
      no("Ich würde auch gern mitkomme!", "После würde — инфинитив в конце: mitkommen."),
      no("Ich werde auch gern mitkommen!", "werde — «буду». Вежливое «я бы» — würde."),
    ],
  },
  narr("Хауке толкает «Sprotte» ins Wasser. Die Idee ist super. Но ветер сильнее, чем Idee."),
  {
    t: "game",
    rule: ["freizeit/ende-2"],
    task: "Блокнот закрыт на фразы дня. Поверните диски.",
    hint: HINT_LOCK,
    c: lock([
      ["Йенсен хочет ходить под парусом.", [["Herr Jensen", "Herrn Jensen", "Herr Jensens"], ["will", "willst", "wollen"], ["segeln.", "segelt.", "Segel."]]],
      ["Мы можем пойти вместе.", [["Wir", "Ich", "Er"], ["können", "kann", "kannst"], ["zusammen gehen.", "gehen zusammen.", "zusammen geht."]]],
      ["Матео не хочет в кино.", [["Mateo", "Mateos", "Mateo und"], ["will nicht", "nicht will", "willst nicht"], ["ins Kino gehen.", "gehen ins Kino.", "ins Kino geht."]]],
    ]),
  },
  narr("Плюх! «Sprotte» переворачивается, und Hauke ist im Wasser. Мокрый насквозь, как Дана в дождь."),
  mateo("Hauke! Mein Brot ist im Boot!", "Хауке! Мой хлеб в лодке!"),
  dana("Hauke! Kannst du schwimmen?", "Хауке! Ты умеешь плавать?"),
  hauke("Ja! Ich kann schwimmen! Aber nicht gut!", "Да! Я умею плавать! Но не очень!", ["schwimmen"]),
  {
    t: "reply",
    rule: ["freizeit/ende-4"],
    task: "Хауке барахтается. Крикните ему, что сейчас поможете.",
    options: [
      ok("Warte, Hauke! Wir können helfen!"),
      no("Warte, Hauke! Wir helfen können!", "Модальный глагол второй, инфинитив в конце: Wir können helfen!"),
      no("Warte, Hauke! Wir kann helfen!", "wir — können."),
    ],
  },
  narr("Но первым — Herr Jensen. Одна рука на румпеле, другая — за воротник Хауке. Und Hauke ist im Boot."),
  jensen("Moin.", "Привет."),
  narr("Йенсен смотрит на мокрого Хауке, на весь Club am Strand — и смеётся. Впервые за неделю. Потом достаёт карандаш."),
  {
    t: "pick",
    task: "Что сейчас лучше всего сделать?",
    options: [
      ok("Подождать: Йенсен что-то пишет"),
      no("Спросить про табличку прямо сейчас", "Он только что вытащил Хауке из воды. Дайте ему дописать."),
      no("Позвать весь клуб на лодку", "Лодка Йенсена маленькая. Как и «Sprotte»."),
    ],
  },
  narr("Записка из кармана, почерк как в {logbuch}: «Morgen um acht. Im Keller. Allein.» Внутри — Schlüssel."),
  { t: "item", icon: "🗝️", de: "der Schlüssel", ru: "старый ключ с биркой «Keller» — от Йенсена" },
  hauke("Morgen um acht. Im Keller. Allein.", "Завтра в восемь. В подвале. Без всех."),
  {
    t: "hear",
    task: "Хауке читает записку вслух. Что в ней?",
    voice: "Rocko",
    de: "Morgen um acht. Im Keller. Allein.",
    options: ["завтра в восемь, в подвале, без всех", "сегодня в восемь у причала", "завтра в восемь на пляже"],
    answer: "завтра в восемь, в подвале, без всех",
  },
  {
    t: "game",
    rule: ["freizeit/verabreden-1"],
    task: "Ответьте Йенсену запиской по образцу: приглашению Нильса. Подписываются Хауке и Дана, поэтому — wir.",
    hint: HINT_LETTER,
    c: letter(
      "Herr Jensen",
      ["Hallo Leute,", "heute machen wir ein Picknick am Strand.", "Wir können um drei kommen.", "Viele Grüße", "Nils"],
      [
        an("Lieber", "Herr Jensen"),
        ["Danke → für die Hilfe", "danke für die Hilfe!", "Danke für die Hilfe!"],
        ["Wir → morgen um acht kommen können", "Wir können morgen um acht kommen.", "wir können morgen um acht kommen.", "Morgen um acht können wir kommen."],
        ["Keller → im Keller sein", "Wir sind im Keller.", "wir sind im Keller.", "Wir kommen in den Keller."],
        gruss("Hauke und Dana"),
      ],
    ),
  },
  {
    t: "type",
    rule: ["freizeit/ende-2"],
    task: "Запишите, что идея Хауке всё-таки сработала.",
    answers: ["Herr Jensen will sprechen.", "Herr Jensen will morgen sprechen.", "Herr Jensen will mit uns sprechen."],
    ru: "Господин Йенсен хочет поговорить.",
  },
  { t: "game", task: "Хауке, ещё мокрый, повторяет фразы дня. Повторите за ним вслух.", hint: HINT_SAY, c: speak(["Schade!", "leider", "die Idee"]) },
  {
    t: "game",
    task: "Кто что сделал в заливе?",
    hint: "Вспомните, кто куда плыл и кто кого вытащил.",
    c: pairs([["Hauke", "fällt ins Wasser"], ["Herr Jensen", "hilft und schreibt"], ["Mateo", "sucht sein Brot"], ["Dana", "fragt: Kannst du schwimmen?"]]),
  },
  {
    t: "clue",
    title: "Morgen um acht",
    text: "Herr Jensen: «Morgen um acht. Im Keller. Allein.» — und ein Schlüssel. Die Idee von Hauke: im Wasser, aber gut.",
  },
];

// Интерлюдия глазами Даны. Бросок: смена точки зрения · Дана · сломать · das Kino · 7: на вечере
// кино Дана задевает провод проектора, и в темноте видит в окне кухни то, что прячет Матео.
const film: SceneNode[] = [
  { t: "pic", src: "07-film.jpg", alt: "Вечер кино у клуба: на белой стене погас кадр, зрители в темноте, Дана держит в руке выдернутый провод проектора; в освещённом окне кухни Матео в муке склонился над большим круглым тортом с белыми буквами" },
  narr("Тем временем am Abend. {filmabend} am Club: старый Film прямо на стене. Dana ist allein da: Mateo kocht, Hauke сохнет."),
  dana("Der Film ist gut. Aber ich kann nichts sehen – der Mann vor mir ist zu groß!", "Фильм хороший. Но мне ничего не видно — мужчина передо мной слишком высокий!"),
  narr("Dana sucht новое место — и задевает провод. {projektor} гаснет. Das Kino ist aus."),
  { t: "gap", task: "Почему Дане не видно?", text: "Der Mann vor mir ist zu ___!", options: ["groß", "klein", "laut"], answer: "groß", ru: "Мужчина передо мной слишком высокий!" },
  narr("В темноте светится только das Fenster der Küche. Там Матео — над чем-то большим и круглым. Белые буквы, первая — «M»."),
  {
    t: "pick",
    task: "Что видит Дана в окне кухни?",
    options: [
      ok("Большой круглый торт с белыми буквами"),
      no("Табличку MOIN", "Табличка прямоугольная и деревянная. Это — круглое и пахнет маслом."),
      no("Пустую кухню", "Матео там. И он очень занят."),
    ],
  },
  narr("Mateo sieht Dana — и задёргивает штору. Фильм идёт дальше."),
  dana("Mateo kocht nicht. Mateo backt. Aber was?", "Матео не готовит. Матео печёт. Но что?"),
  {
    t: "hear",
    task: "Что поняла Дана?",
    voice: "Anna",
    de: "Mateo kocht nicht. Mateo backt. Aber was?",
    options: ["Матео печёт, но непонятно что", "Матео готовит суп", "Матео смотрит фильм"],
    answer: "Матео печёт, но непонятно что",
  },
  {
    t: "type",
    task: "Запишите, как Дана ставит диагноз: что делает Матео.",
    answers: ["Mateo backt.", "Mateo backt einen Kuchen.", "Er backt einen Kuchen."],
    ru: "Матео печёт.",
  },
  {
    t: "game",
    rule: ["freizeit/ende-2"],
    task: "Соберите фразу, которую Дана скажет утром.",
    hint: "Модальный глагол второй, инфинитив — в конце.",
    c: order(["Mateo", "will", "nichts", "sagen."], ["sagen.", "nichts", "Mateo", "will"]),
  },
  narr("Dana sagt bis morgen nichts. Врачам тоже нужны тайны. Diagnose: Kuchen — groß."),
];

// Сцена 6 · эпилог и крючок: речь как на экзамене и записка к главе 8.
const evening: SceneNode[] = [
  { t: "pic", src: "07-evening.jpg", alt: "Поздний вечер в клубе: Хауке в пледе сушит куртку у обогревателя, на столе записка Йенсена и старый ключ, Элиф держит фото с телефона Нильса, Дана загадочно молчит" },
  narr("Abend im Club. Хауке сушит die Jacke и в третий раз рассказывает, как спас «Sprotte». Кто кого спас — пока неясно."),
  hauke("Morgen um acht! Ich bin um acht da. Oder um Viertel nach acht.", "Завтра в восемь! Я буду в восемь. Или в четверть девятого."),
  {
    t: "reply",
    task: "Напомните Хауке, что опаздывать нельзя.",
    options: [
      ok("Nein, Hauke! Um acht. Nicht später!"),
      no("Ja, Hauke! Um Viertel nach acht.", "Записка ясная: um acht. Йенсен ждёт ровно."),
      no("Nein, Hauke! Um acht. Nicht früher!", "Раньше — можно. Нельзя позже."),
    ],
  },
  {
    t: "game",
    task: "Хауке устраивает репетицию экзамена. Тема дня — свободное время.",
    hint: HINT_ORAL,
    c: oral([
      oralSay(2, ASK, "Thema: Freizeit · Wort: Wochenende", "Was machst du am Wochenende?", "Что ты делаешь на выходных?", "Was …?"),
      oralReply(2, ANSWER, "Kannst du schwimmen?", "Ja, ich kann schwimmen. Aber am liebsten segle ich.", "Да, я умею плавать. Но больше всего я люблю ходить под парусом."),
      oralSay(3, REQUEST, "🎬", "Kommst du mit ins Kino?", "Пойдёшь со мной в кино?"),
    ]),
  },
  elif("Und das Foto? Greta hat Farbe an den Händen. Dunkelblau – wie das Schild!", "А фото? У Греты краска на руках. Тёмно-синяя — как табличка!"),
  {
    t: "hear",
    task: "Что Элиф говорит о фото?",
    voice: "Flo",
    de: "Und das Foto? Greta hat Farbe an den Händen. Dunkelblau – wie das Schild!",
    options: ["у Греты руки в тёмно-синей краске", "Грета держит табличку", "на фото нет Греты"],
    answer: "у Греты руки в тёмно-синей краске",
  },
  {
    t: "pick",
    task: "Что нового за день?",
    options: [
      ok("Йенсен готов говорить, а у Греты руки в краске цвета таблички"),
      no("Табличку нашли", "Пока нет. Есть ключ и время: morgen um acht."),
      no("Матео признался", "Матео ни в чём не признавался. Он печёт и молчит."),
    ],
  },
  { t: "game", task: "Слова дня перемешались. Откройте пары: немецкое слово и перевод.", c: memory(["filmabend", "picknick", "strandball", "projektor", "nachricht", "moewe"]) },
  elif("Und die Möwe hat den Ball. Sie spielt jetzt Fußball!", "А мяч у чайки. Теперь она играет в футбол!", ["Fußball spielen"]),
  dana("Ich habe eine Diagnose. Aber ich sage sie morgen.", "У меня есть диагноз. Но скажу его завтра."),
  {
    t: "type",
    rule: ["freizeit/ende-3"],
    task: "Запишите вопрос на завтра: сможем ли мы всё понять?",
    answers: ["Können wir morgen alles verstehen?", "Können wir alles verstehen?"],
    ru: "Сможем ли мы завтра всё понять?",
  },
  narr("Der Schlüssel liegt auf dem Tisch: alt, schwer, с биркой: «{keller}». Рядом будильник: «7:00!»"),
  { t: "game", task: "Хауке раскладывает вещи из корзин по ящикам: der, die, das.", hint: HINT_DOCK, c: docks(["der Film", "das Kino", "das Konzert", "die Party", "der Park", "das Schwimmbad", "das Buch", "die Einladung", "der Garten", "der Baum", "die Blume", "das Bild"]) },
  mateo("Brot? Für morgen? Nein. Für … später. Gute Nacht!", "Хлеб? На завтра? Нет. На… потом. Спокойной ночи!"),
  { t: "gap", task: "Для чего хлеб Матео?", text: "Das Brot ist für ___.", options: ["später", "heute", "Hauke"], answer: "später", ru: "Хлеб — на потом." },
  { t: "game", task: "Лото на ночь: послушайте слово и закройте его на карточке.", hint: HINT_HEAR, c: bingo(["schwimmen", "tanzen", "lesen", "segeln", "das Kino", "der Film", "die Party", "leider", "Fußball spielen"]) },
  { t: "game", task: "Подпишите в блокноте слова дня по буквам.", hint: HINT_SPELL, c: letters(["die Einladung", "mitkommen", "das Konzert", "wandern"]) },
  hauke("Der Wecker ist da. Um sieben stehe ich auf!", "Будильник на месте. В семь я встаю!"),
  {
    t: "type",
    task: "Запишите в блокнот план на завтра.",
    answers: ["Morgen um acht im Keller.", "Morgen um acht sind wir im Keller.", "Wir gehen morgen um acht in den Keller."],
    ru: "Завтра в восемь в подвале.",
  },
  { t: "game", task: "Хауке засыпает и бормочет хобби. Послушайте и нажмите на картинку.", hint: HINT_PICTURE, c: scene([["segeln", "⛵"], ["schwimmen", "🏊"], ["lesen", "📖"], ["Fußball spielen", "⚽"], ["Musik hören", "🎧"], ["tanzen", "💃"], ["Freunde treffen", "🧑‍🤝‍🧑"], ["wandern", "🥾"], ["laufen", "🏃"]]) },
  narr("Вы закрываете блокнот: «День седьмой. Herr Jensen: Morgen um acht. Im Keller. Allein. Greta: Hände dunkelblau — und {firma}?». Noch fünf Tage."),
  {
    t: "clue",
    title: "Im Keller",
    text: "Morgen um acht: Herr Jensen im Keller, allein. Wir haben den Schlüssel. Foto: Greta, Hände dunkelblau — wie das Schild. Frauke: «Greta arbeitet bei der Firma.» Nils: «bei einer Firma für Boote». Dana hat eine Diagnose — morgen.",
  },
];

const play = (nodes: SceneNode[]) => ({ kind: "play" as const, nodes });
const HINT = "Ошибка ничего не стоит: собеседник отреагирует, и можно выбрать снова.";

export const sceneChapter7: Episode = {
  id: "moin-neu-7",
  title: "Ich kann nicht",
  day: { de: "Noch sechs Tage", ru: "ещё шесть дней до Kieler Woche" },
  place: "Kiellinie · клуб, пляж и залив",
  topic: "Досуг и встречи",
  grammar: "können, wollen · инфинитив в конце · gern, lieber, am liebsten · пригласить и отказаться",
  beats: [
    {
      id: "07-s1",
      title: "Ich will segeln",
      story: [],
      prompt: "Приглашение в кино, шесть слов Йенсена и отказ Матео.",
      hint: HINT,
      success: "Йенсен хочет под парусом, Матео — готовить. Нужен другой план: пикник.",
      challenge: play(invite),
    },
    {
      id: "07-s2",
      title: "Wer hat Zeit?",
      story: [],
      prompt: "Книга клуба, опоздавшая фрау Петерсен и общий день.",
      hint: "Am Montag kann ich nicht. Aber am Dienstag habe ich Zeit.",
      success: "Сегодня у всех есть время. Пикник — на пляже. Йенсен выходит в море каждое утро в восемь.",
      challenge: play(back(week, 7, 2)),
    },
    {
      id: "07-s3",
      title: "Alle!!!",
      story: [],
      prompt: "Нильс зовёт весь клуб, фрау Петерсен — с формуляром, Фрауке — со слухом.",
      hint: "Wer kann mitkommen? — с модальным глаголом приставка не отрывается.",
      success: "Разговор с Йенсеном превратился в праздник всего клуба.",
      challenge: play(back(party, 7, 0)),
    },
    {
      id: "07-s4",
      title: "Ein größeres Boot",
      story: [],
      prompt: "Пляж: мяч у чайки, обещание Хауке и фото Нильса.",
      hint: "Ich kann schwimmen. Ich will segeln. — инфинитив в конце.",
      success: "На фото у Греты руки в тёмно-синей краске. Йенсен — далеко в заливе.",
      challenge: play(beach),
    },
    {
      id: "07-s5",
      title: "Im Wasser",
      story: [],
      prompt: "Идея Хауке, «Шпротта» в заливе и записка Йенсена.",
      hint: "Wir können morgen um acht kommen.",
      success: "Йенсен вытащил Хауке из воды и назначил встречу: завтра в восемь, в подвале.",
      challenge: play(back(water, 7, 3)),
    },
    {
      id: "07-i1",
      title: "Глазами Даны",
      pov: "глазами Даны",
      story: [],
      prompt: "Интерлюдия: вечер кино, погасший проектор и окно кухни.",
      hint: "zu groß: прилагательное после sein не меняется.",
      success: "Матео печёт что-то большое и круглое. Дана молчит до утра.",
      challenge: play(film),
    },
    {
      id: "07-s6",
      title: "Morgen um acht",
      story: [],
      prompt: "Вечер в клубе, речь как на экзамене и ключ от подвала.",
      hint: "Kannst du schwimmen? — модальный глагол первый, инфинитив в конце.",
      success: "День седьмой закончен. Завтра в восемь — подвал. Noch fünf Tage.",
      challenge: play(back(evening, 7, 1)),
    },
  ],
};
