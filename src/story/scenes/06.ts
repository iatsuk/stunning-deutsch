import { an, ANSWER, ASK, bingo, docks, gaps, gruss, gull as race, HINT_DOCK, HINT_HEAR, HINT_LETTER, HINT_LOCK, HINT_ODD, HINT_ORAL, HINT_RACE, HINT_SAY, HINT_SPELL, letter, letters, lock, odd, oral, order, pairs, RACE, RACE_STAKES, reply as oralReply, REQUEST, say as oralSay, sort, speak, spot, verdict, write } from "../build.ts";
import { phrases } from "../data.ts";
import type { Challenge, Episode, SceneNode } from "../types.ts";

// Глава 6 в формате сцен (A1-PLOT.md, «Формат сцен»): время и распорядок дня, halb sechs, um, am,
// von … bis, отделяемые приставки. Вопрос главы — когда исчезла табличка. Вход — чек (17:05) и
// голосовое Йенсена, выход — halb sechs = 17:30: в воскресенье в это время весь клуб пил чай на
// задней террасе по приглашению Йенсена, клуб был открыт, версия ночного взлома рушится, Йенсен
// знал всё с самого начала. Повороты брошены оракулом (seed 1794017991), увязка — в журнале
// A1-STORYCRAFT.md.

const narr = (text: string): SceneNode => ({ t: "narr", text });
const learn = (words?: string[]) => (words ? { learn: words } : {});
const hauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Hauke", voice: "Rocko", de, ru, ...learn(words) });
const jensen = (de: string, ru: string): SceneNode => ({ t: "say", who: "Herr Jensen", voice: "Grandpa", de, ru });
const elif = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Elif", voice: "Flo", de, ru, ...learn(words) });
const dana = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Dana", voice: "Anna", de, ru, ...learn(words) });
const mateo = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Mateo", voice: "Reed", de, ru, ...learn(words) });
const frauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frauke", voice: "Sandy", de, ru, ...learn(words) });
const petersen = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frau Petersen", voice: "Sandy", de, ru, ...learn(words) });
const gullSays = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "die Möwe", voice: "Shelley", de, ru, ...learn(words) });
/** Пары памяти — из выражений истории, которые глава уже показала. */
const memory = (ids: string[]): Challenge => ({ kind: "memory", pairs: ids.map((id) => ({ id, de: phrases[id].de, ru: phrases[id].ru })) });
/** Часы клуба: стрелки шагают по четверти часа от полудня, ловушки объясняют частые ошибки. */
const clock = (answer: string, traps: Record<string, string>): Challenge => ({ kind: "clock", start: "12:00", step: 15, answer, traps });
const ok = (text: string) => ({ text, ok: true as const });
const no = (text: string, react: string) => ({ text, react });

// Сцена 1 · пролог и завязка: голосовое Йенсена. Бросок: подарок игроку · чайка · прийти не туда ·
// die Minute · 4 (мелочь: чайка села на минутную стрелку, часы клуба отстают на пять минут).
const message: SceneNode[] = [
  { t: "pic", src: "06-message.jpg", alt: "Утро в клубе: Дана держит телефон, вокруг замерли Хауке, Элиф и Матео; над дверью клуба круглые часы, на минутной стрелке сидит чайка" },
  narr("Шестой день, Samstag, noch sieben Tage. Handy Даны высох в рисе. На экране ждёт {sprachnachricht} von Herrn Jensen."),
  dana("Hört zu! Herr Jensen spricht!", "Слушайте! Господин Йенсен говорит!"),
  jensen("Moin. Heute Tee um halb sechs. Wie immer. Moin.", "Привет. Сегодня чай в половине шестого. Как всегда. Привет."),
  {
    t: "hear",
    task: "Что сказал Йенсен?",
    voice: "Grandpa",
    de: "Moin. Heute Tee um halb sechs. Wie immer. Moin.",
    options: ["сегодня чай в половине шестого", "сегодня чая не будет", "завтра чай в шесть"],
    answer: "сегодня чай в половине шестого",
  },
  narr("{wort} за словом: Хауке считает на пальцах — eins, zwei … neun. Zweimal. So viel Йенсен не говорил с первого дня."),
  narr("И в середине — {wieimmer}: значит, чай в половине шестого у Йенсена каждый день."),
  hauke("Neun Wörter! Und halb sechs – das ist sechs Uhr dreißig!", "Девять слов! А halb sechs — это шесть тридцать!", ["halb"]),
  {
    t: "reply",
    task: "Йенсен сказал: «Heute Tee um halb sechs». Поправьте Хауке.",
    options: [
      ok("Nein, halb sechs ist fünf Uhr dreißig."),
      no("Ja, halb sechs ist sechs Uhr dreißig.", "После halb называют следующий час: halb sechs — половина шестого, 5:30."),
      no("Nein, halb sechs ist sechs Uhr.", "Halb — половина: halb sechs — 5:30."),
    ],
  },
  narr("Halb sechs — по-русски тоже «половина шестого», а не «шесть с половиной». Halb — половина пути к sechs."),
  {
    t: "game",
    task: "Поставьте часы клуба на время чая.",
    hint: "halb sechs — половина шестого. Чай днём, значит, 17:30.",
    c: clock("17:30", {
      "18:30": "Это halb sieben — половина седьмого. Йенсен сказал halb sechs.",
      "05:30": "В 5:30 утра Йенсен пьёт чай один. Wie immer — днём, в 17:30.",
      "16:30": "Это halb fünf. После halb называют следующий час: halb sechs — 17:30.",
    }),
  },
  narr("Йенсен всегда {puenktlich}. Для него и {sekunde} опоздания — уже опоздание."),
  narr("Die Uhr над дверью geht heute falsch. На минутной стрелке сидит {moewe} и едет вниз вместе с ней."),
  elif("Die Möwe sitzt auf der Uhr! Die Uhr geht falsch!", "Чайка сидит на часах! Часы врут!", ["die Uhr"]),
  { t: "gap", task: "Что случилось с часами клуба?", text: "Die Möwe sitzt auf der ___!", options: ["Uhr", "Stunde", "Woche"], answer: "Uhr", ru: "Чайка сидит на часах!" },
  hauke("Fünf Minuten zu spät! Die Möwe ist schwer.", "Отстают на пять минут! Чайка тяжёлая.", ["die Minute", "spät"]),
  narr("Mateo kommt: in der Hand Kaffee und ein Buch — детектив в мягкой обложке."),
  mateo("Halb sechs? Nein! Das Schild ist in der Nacht weg. Ein Einbruch!", "Половина шестого? Нет! Табличка пропала ночью. Взлом!", ["die Nacht"]),
  narr("Матео повторяет одно слово: «{weg}». В голове у него уже детектив: ночь, взлом, тёмная фигура."),
  {
    t: "pick",
    task: "Какая версия у Матео?",
    options: [
      ok("Ночью кто-то вломился и унёс табличку"),
      no("Табличку днём унесла чайка", "Чайку Матео не подозревает. Он подозревает Einbruch."),
      no("Табличку забрал Йенсен", "Йенсена Матео уважает: он единственный не пьёт его кофе — и не обижает его."),
    ],
  },
  {
    t: "game",
    rule: ["tagesablauf/wann-1"],
    task: "Запишите версию Матео: соберите фразу.",
    hint: "Ночь — исключение: не am, а in der Nacht.",
    c: order(["Das", "Schild", "ist", "in", "der", "Nacht", "weg."], ["Nacht", "weg.", "Das", "der", "ist", "Schild", "in"]),
  },
  narr("«{einbruch}!» Матео говорит это слово mit Liebe, как название десерта."),
  dana("Und warum Tee um halb sechs? Warum schickt er uns das?", "А почему чай в половине шестого? Зачем он нам это шлёт?"),
  {
    t: "type",
    rule: ["tagesablauf/wann-1"],
    task: "Запишите в блокнот, когда сегодня чай.",
    answers: ["Der Tee ist um halb sechs.", "Um halb sechs ist Tee.", "Heute um halb sechs.", "Tee um halb sechs.", "Der Tee ist heute um halb sechs."],
    ru: "Чай — в половине шестого.",
  },
  {
    t: "game",
    task: "Проверьте блокнот: что верно?",
    c: verdict(["Richtig", "Falsch"], [
      ["Halb sechs — это 17:30", true, "Половина шестого: после halb называют следующий час."],
      ["Йенсен прислал девять слов", true, "Moin, heute, Tee, um, halb, sechs, wie, immer, Moin."],
      ["Чай — в 18:30", false, "18:30 — halb sieben. Чай — halb sechs."],
    ]),
  },
  narr("Вы вспоминаете {kassenbon} фрау Крузе: 17:05, дата смыта. А чай — um halb sechs. Fünfundzwanzig Minuten разницы — или целый день?"),
  {
    t: "game",
    task: "Соедините время цифрами и словами.",
    hint: "halb называет следующий час; Viertel vor — без четверти.",
    c: pairs([["17:05", "fünf nach fünf"], ["17:30", "halb sechs"], ["18:00", "sechs Uhr"], ["16:45", "Viertel vor fünf"]]),
  },
  {
    t: "game",
    task: "Хауке подписывает на доске части дня. Соберите слова из частей и выберите артикль.",
    hint: "Род — по последней части: der Mittag → der Vormittag, der Abend → der Feierabend.",
    c: {
      kind: "compound",
      rounds: [
        { word: "der Vormittag", parts: ["Vor", "Mittag"], ru: "первая половина дня" },
        { word: "der Nachmittag", parts: ["Nach", "Mittag"], ru: "вторая половина дня" },
        { word: "der Feierabend", parts: ["Feier", "Abend"], ru: "конец рабочего дня" },
      ],
      extra: ["Tag", "Woche", "Uhr"],
    },
  },
  {
    t: "game",
    task: "Элиф проверяет: одно слово в группе лишнее.",
    hint: HINT_ODD,
    c: odd([
      [["der Montag", "der Sonntag", "der Samstag", "der Abend"], "der Abend", "Abend — часть дня, остальное — дни недели."],
      [["die Uhr", "die Stunde", "die Minute", "die Nacht"], "die Nacht", "Ночь — время суток, остальное — чем мерят время."],
    ]),
  },
  narr("У Хауке всё {eilig}: «{bald}» для него значит «{gleich}», а «{gleich}» — «{sofort}»."),
  hauke("Gehen wir um halb sechs zum Tee?", "Пойдём в половине шестого на чай?"),
  {
    t: "reply",
    task: "Ответьте Хауке.",
    options: [
      ok("Ja! Um halb sechs sind wir da."),
      no("Ja! Um halb sieben sind wir da.", "halb sieben — 18:30. Чай вы пропустите."),
      no("Ja! Um sechs Uhr dreißig sind wir da.", "Это снова 18:30. Чай — halb sechs, 17:30."),
    ],
  },
  hauke("Super! Wir treffen uns um fünf vor dem Club.", "Отлично! Встречаемся в пять перед клубом."),
  { t: "gap", rule: ["moin/uns-1"], task: "Запишите в блокнот, где встреча.", text: "Wir treffen ___ um fünf vor dem Club.", options: ["uns", "sich", "euch"], answer: "uns", ru: "Встречаемся в пять перед клубом." },
  {
    t: "clue",
    title: "Sprachnachricht",
    text: "Herr Jensen: «Moin. Heute Tee um halb sechs. Wie immer. Moin.» — neun Wörter. Halb sechs = 17:30. Kassenbon: 17:05. Mateo: «Ein Einbruch in der Nacht!»",
  },
];

// Сцена 2 · развитие: кассовая книга Фрауке. Бросок главы из плана: подарок · Фрауке · пообещать ·
// der Vormittag · 9 — Фрауке обещает присматривать за клубом до обеда и даёт кассовую книгу.
const book: SceneNode[] = [
  { t: "pic", src: "06-kiosk.jpg", alt: "Утро у киоска Фрауке: Фрауке протягивает толстую кассовую книгу, Дана и Хауке листают её; на столике кружки, рядом на столбе часы" },
  narr("Vormittag am Kiosk. Фрауке уже всё знает: в Киле новости летают быстрее, чем Möwen."),
  frauke("Neun Wörter? Von Herrn Jensen? Das glaube ich nicht!", "Девять слов? От господина Йенсена? Не верю!"),
  frauke("Hier, mein Kassenbuch. Jeden Tag, jede Stunde!", "Вот моя кассовая книга. Каждый день, каждый час!", ["die Stunde"]),
  {
    t: "hear",
    task: "Что Фрауке записывает в свою книгу?",
    voice: "Sandy",
    de: "Hier, mein Kassenbuch. Jeden Tag, jede Stunde!",
    options: ["каждый день, каждый час", "только воскресенья", "только ночи"],
    answer: "каждый день, каждый час",
  },
  {
    t: "reply",
    rule: ["tagesablauf/wann-1"],
    task: "Поблагодарите Фрауке и спросите про то самое воскресенье, половина шестого.",
    options: [
      ok("Danke, Frauke! Was ist am Sonntag um halb sechs?"),
      no("Danke, Frauke! Was ist im Sonntag um halb sechs?", "Дни недели — с am: am Sonntag."),
      no("Danke, Frauke! Was ist am Sonntag in halb sechs?", "Время на часах — с um: um halb sechs."),
    ],
  },
  frauke("Am Sonntag um halb sechs ist der Club leer. Alle trinken Tee – hinten, auf der Terrasse.", "В воскресенье в половине шестого клуб пуст. Все пьют чай — сзади, на террасе.", ["der Sonntag"]),
  {
    t: "hear",
    task: "Где все в половине шестого — по словам Фрауке?",
    voice: "Sandy",
    de: "Am Sonntag um halb sechs ist der Club leer. Alle trinken Tee – hinten, auf der Terrasse.",
    options: ["сзади, на террасе, пьют чай", "у подставки перед клубом", "в кафе у воды"],
    answer: "сзади, на террасе, пьют чай",
  },
  narr("Каждый день um halb sechs — Tee, {hinten}: там {terrasse} у воды. А der Aufsteller vorne — allein."),
  {
    t: "look",
    task: "Полистайте кассовую книгу за воскресенье.",
    items: [
      { icon: "📒", de: "das Kassenbuch", ru: "кассовая книга", note: "«Sonntag». Каждая продажа — с минутами, почерк Фрауке.", key: true },
      { icon: "🕠", de: "der Nachmittag", ru: "вторая половина дня", note: "17:20 — zwei Fischbrötchen. 17:30 — «Tee! Alle hinten»." },
      { icon: "👜", de: "die Tasche", ru: "сумка", note: "17:3… — «eine Frau, dunkelblau, eine große flache Tasche → Bus».", key: true },
      { icon: "🌙", de: "die Nacht", ru: "ночь", note: "Ночью киоск закрыт. В книге про ночь — ни строчки." },
    ],
  },
  {
    t: "when",
    if: [{ q: "frauke", min: 1 }],
    then: [narr("Запись в {kassenbuch} аккуратная, как с тех пор, как Фрауке завела журнал: «17:35. Frau, Overall dunkelblau, große flache Tasche, Bus».")],
    else: [narr("Минуты в {kassenbuch} смазаны: «17:3… Frau … Tasche … Bus». Фрауке писала второпях. Но около 17:35 — точно.")],
  },
  narr("Сумка большая и {flach} — как раз по размеру таблички."),
  {
    t: "type",
    rule: ["tagesablauf/wann-1"],
    task: "Запишите, во сколько женщина с сумкой ушла к автобусу.",
    answers: ["Um 17:35.", "Um siebzehn Uhr fünfunddreißig.", "Um fünf nach halb sechs.", "17:35"],
    ru: "В 17:35.",
  },
  frauke("Und ich passe auf den Club auf! Am Vormittag, jeden Tag!", "А я присмотрю за клубом! До обеда, каждый день!", ["der Vormittag"]),
  {
    t: "game",
    rule: ["tagesablauf/klammer-1"],
    task: "Что обещает Фрауке? Вставьте глагол из двух частей.",
    hint: "aufpassen: корень на втором месте, приставка auf — в конце.",
    c: gaps("Frauke ___ am Vormittag auf den Club ___.", ["passt", "auf", "an", "passen"], ["passt", "auf"]),
  },
  {
    t: "pick",
    task: "Что даёт кассовая книга?",
    options: [
      ok("Около 17:35 женщина с большой плоской сумкой ушла к автобусу: клуб был открыт"),
      no("Ночью в клуб вломились", "Про ночь в книге ничего нет — киоск закрыт. Зато есть 17:35."),
      no("Табличка пропала в понедельник утром", "Утром её только заметили. Запись Фрауке — про воскресенье."),
    ],
  },
  dana("Eine Frau mit einer großen Tasche. Um fünf nach halb sechs. Am Sonntag.", "Женщина с большой сумкой. В 17:35. В воскресенье."),
  {
    t: "hear",
    task: "Во сколько ушла женщина — по словам Даны?",
    voice: "Anna",
    de: "Eine Frau mit einer großen Tasche. Um fünf nach halb sechs. Am Sonntag.",
    options: ["17:35", "18:35", "17:25"],
    answer: "17:35",
  },
  {
    t: "game",
    rule: ["tagesablauf/wann-1"],
    task: "Разложите воскресенье по частям дня.",
    hint: "am Vormittag, am Nachmittag — но in der Nacht.",
    c: sort([["vormittag", "am Vormittag"], ["nachmittag", "am Nachmittag"], ["nacht", "in der Nacht"]], [
      ["kiosk", "Frauke macht den Kiosk auf · 9:00", "vormittag", "🐟"],
      ["tee", "Tee im Club · 17:30", "nachmittag", "🍵"],
      ["frau", "Frau mit Tasche · 17:35", "nachmittag", "👜"],
      ["moewe", "Die Möwe schläft · 23:00", "nacht", "🐦"],
    ]),
  },
  narr("Фрауке листает {kassenbuch} назад. На закладках — месяцы: {januar}, {februar}, {maerz}, {april}, {mai}, {juni}."),
  narr("Дальше — {juli}, {august}, {september}, {oktober}, {november}, {dezember}. Фрауке пишет каждый день, даже зимой."),
  { t: "game", task: "Фрауке называет месяц — найдите закладку и закройте её на карточке.", hint: HINT_HEAR, c: bingo(["der Januar", "der Februar", "der März", "der April", "der Mai", "der Juni", "der Juli", "der September", "der Dezember"]) },
  narr("На каждой странице сверху — {wochentag}. Красным — {feiertag}: тогда киоск закрыт."),
  { t: "game", task: "Фрауке раскладывает части дня по ящикам: der, die, das.", hint: HINT_DOCK, c: docks(["der Morgen", "der Mittag", "der Abend", "die Nacht", "die Woche", "das Wochenende", "die Stunde", "das Viertel"]) },
  {
    t: "game",
    rule: ["tagesablauf/wann-1"],
    task: "Соедините место и его время.",
    hint: "von … bis — с … до; um — в определённый час.",
    c: pairs([["der Kiosk", "von neun bis sechs"], ["das Büro", "von neun bis fünf"], ["der Tee", "um halb sechs"], ["der Club", "bis sechs Uhr"]]),
  },
  frauke("Möchtet ihr ein Fischbrötchen? Es ist schon Mittag!", "Хотите булочку с рыбой? Уже полдень!"),
  {
    t: "reply",
    task: "Ответьте Фрауке.",
    options: [
      ok("Nein, danke! Um halb sechs trinken wir Tee."),
      no("Nein, danke! Um halb sechs trinken wir keinen Tee.", "Наоборот: вы как раз идёте на чай."),
      no("Nein, danke! Halb sechs trinken wir um Tee.", "um — перед временем: um halb sechs."),
    ],
  },
  {
    t: "clue",
    title: "Kassenbuch",
    text: "Sonntag: 17:30 — Tee, alle hinten auf der Terrasse. 17:35 — eine Frau, Overall dunkelblau, große flache Tasche, Bus. In der Nacht: kein Einbruch.",
  },
];

// Сцена 3 · развилка: кто где был в 17:30. Броски: за кадром · Элиф · подслушать · der Mittag · 20
// (гипербола: в полдень Йенсен сам позвал на чай весь клуб), глобальное событие · Матео · отказаться ·
// der Feierabend · 11 (Матео не признаёт конца рабочего дня и в 17:30 был на кухне).
const witnesses: SceneNode[] = [
  { t: "pic", src: "06-club.jpg", alt: "Клуб днём: Элиф рассказывает, размахивая биноклем; фрау Петерсен с толстым журналом в дверях офиса; в окне кухни Матео в муке; рядом на стуле Лотта с тетрадкой и часами" },
  narr("Wer ist am Sonntag um halb sechs wo? Хауке рисует на доске клуб: vorne — подставка, hinten — {terrasse}, сбоку — Küche."),
  hauke("Also: Wer ist um halb sechs wo? Fragen wir alle!", "Итак: кто где в половине шестого? Спросим всех!"),
  {
    t: "go",
    task: "Кого расспросить первым?",
    next: "Дальше по делу",
    branches: [
      {
        label: "Элиф и полдень",
        icon: "🔭",
        nodes: [
          elif("Am Sonntag, am Mittag, höre ich Herrn Jensen. Er sagt drei Wörter!", "В воскресенье в полдень я слышу господина Йенсена. Он говорит три слова!", ["der Mittag"]),
          elif("Tee. Alle. Halb sechs.", "Чай. Все. Полшестого."),
          {
            t: "hear",
            task: "Какие три слова Йенсен сказал в полдень?",
            voice: "Flo",
            de: "Tee. Alle. Halb sechs.",
            options: ["Tee. Alle. Halb sechs.", "Moin. Moin. Moin.", "Kaffee. Alle. Sechs."],
            answer: "Tee. Alle. Halb sechs.",
          },
          narr("И приходят все: {ganzeclub}. Даже яхтсмены, которые пьют только Bier. Даже фрау Петерсен. Двадцать человек — hinten."),
          elif("Der ganze Club ist hinten. Vorne ist niemand!", "Весь клуб сзади. Впереди никого!"),
          { t: "gap", task: "Где весь клуб в половине шестого?", text: "Der ganze Club ist ___.", options: ["hinten", "vorne", "im Café"], answer: "hinten", ru: "Весь клуб сзади." },
          narr("Vorne — {niemand}. Подставка у входа одна, как на ладони."),
          {
            t: "pick",
            task: "Что это значит?",
            options: [
              ok("В 17:30 у подставки никого не было — и Йенсен сам всех позвал"),
              no("Элиф перепутала день", "Она записала: Sonntag, Mittag. Биологи всё записывают."),
              no("Чай был ночью", "Halb sechs — 17:30. Ночью чая в клубе не бывает."),
            ],
          },
          {
            t: "type",
            task: "Запишите три слова Йенсена в блокнот.",
            answers: ["Tee. Alle. Halb sechs.", "Tee, alle, halb sechs.", "Tee! Alle! Halb sechs!"],
            ru: "Чай. Все. Полшестого.",
          },
        ],
      },
      {
        label: "Матео и Feierabend",
        icon: "🍳",
        nodes: [
          mateo("Um halb sechs? Ich bin in der Küche. Ich koche. Ich mache nie Feierabend!", "В половине шестого? Я на кухне. Я готовлю. Я никогда не заканчиваю работу!", ["der Feierabend"]),
          {
            t: "reply",
            rule: ["tagesablauf/klammer-4"],
            task: "Спросите Матео, когда он всё-таки заканчивает.",
            options: [
              ok("Wann hörst du auf?"),
              no("Wann hörst du?", "Нужна приставка: aufhören — Wann hörst du auf?"),
              no("Wann aufhörst du?", "Приставка уходит в конец: Wann hörst du auf?"),
            ],
          },
          mateo("Ich höre in der Nacht auf. Oder nie!", "Я заканчиваю ночью. Или никогда!", ["aufhören"]),
          {
            t: "hear",
            task: "Когда Матео заканчивает работу?",
            voice: "Reed",
            de: "Ich höre in der Nacht auf. Oder nie!",
            options: ["ночью или никогда", "в шесть", "в половине шестого"],
            answer: "ночью или никогда",
          },
          {
            t: "game",
            rule: ["tagesablauf/klammer-1"],
            task: "Что говорит Матео? Вставьте обе части глагола.",
            hint: "aufhören: höre — на втором месте, auf — в конце.",
            c: gaps("Ich ___ in der Nacht ___. Oder nie!", ["höre", "auf", "an", "hört"], ["höre", "auf"]),
          },
          narr("Das Fenster der Küche ist hinten. Подставку Матео не видит. Пахнет маслом и Zucker. «Das ist nur Brot!»"),
          {
            t: "pick",
            task: "Что записать о Матео?",
            options: [
              ok("В 17:30 он был на кухне и подставку не видел"),
              no("Матео унёс табличку", "Он не выходил из кухни: тесто не ждёт."),
              no("Матео пил чай со всеми", "Чай он не пьёт. Только Kaffee."),
            ],
          },
        ],
      },
      {
        label: "Фрау Петерсен и журнал",
        icon: "🗂️",
        nodes: [
          petersen("Das Büro? Am Sonntag ist es zu. Hier, das Schild.", "Офис? В воскресенье закрыт. Вот табличка."),
          {
            t: "game",
            task: "Найдите на табличке офиса, когда он закрыт.",
            c: spot("Büro · Öffnungszeiten", ["Montag – Freitag|9 – 17 Uhr", "Samstag|9 – 12 Uhr", "Sonntag|geschlossen"], ["Sonntag", "geschlossen"]),
          },
          petersen("Und um sechs macht Herr Jensen den Club zu. Immer. Hier ist das Logbuch.", "А в шесть господин Йенсен закрывает клуб. Всегда. Вот журнал."),
          {
            t: "hear",
            task: "Во сколько Йенсен закрывает клуб?",
            voice: "Sandy",
            de: "Und um sechs macht Herr Jensen den Club zu. Immer. Hier ist das Logbuch.",
            options: ["в шесть", "в половине шестого", "ночью"],
            answer: "в шесть",
          },
          narr("В {logbuch} за воскресенье: «18:00 — zu. Moin». Тот же почерк, что в первый день."),
          {
            t: "type",
            rule: ["tagesablauf/klammer-1"],
            task: "Перепишите строку журнала полной фразой: в шесть Йенсен закрывает клуб.",
            answers: ["Herr Jensen macht um sechs den Club zu.", "Um sechs macht Herr Jensen den Club zu.", "Herr Jensen macht den Club um sechs zu."],
            ru: "Господин Йенсен закрывает клуб в шесть.",
          },
        ],
      },
      {
        label: "Часы для Лотты",
        icon: "⏰",
        optional: true,
        nodes: [
          narr("Лотта сидит im Büro и учит die Uhr. Учительница задала «Viertel vor» и «Viertel nach»."),
          petersen("Lotte braucht Hilfe. Viertel vor neun – wie spät ist das?", "Лотте нужна помощь. Без четверти девять — это сколько?"),
          {
            t: "game",
            task: "Поставьте часы Лотты на Viertel vor neun.",
            hint: "vor — до: без четверти девять, 8:45.",
            c: clock("08:45", {
              "09:15": "Это Viertel nach neun — четверть десятого. Нужно vor.",
              "08:15": "Это Viertel nach acht.",
              "09:45": "Это Viertel vor zehn.",
            }),
          },
          { ...narr("Лотта получает eine Eins — по-немецки это лучшая оценка. Фрау Петерсен заметно добреет."), set: { petersen: 1 } },
        ],
      },
    ],
  },
  {
    t: "game",
    task: "Wer war wo? Воскресенье, 17:30: расставьте троих по местам по уликам.",
    hint: "Исключайте: если Матео не сзади и не у киоска, где он?",
    c: {
      kind: "grid",
      people: ["Herr Jensen", "Mateo", "Frauke"],
      cols: [{ id: "wo", label: "um 17:30", values: ["hinten, beim Tee", "in der Küche", "am Kiosk"] }],
      clues: [
        { de: "Mateo ist nicht hinten.", ru: "Матео не сзади.", a: "Mateo", b: "wo:hinten, beim Tee", not: true },
        { de: "Mateo ist nicht am Kiosk.", ru: "Матео не у киоска.", a: "Mateo", b: "wo:am Kiosk", not: true },
        { de: "Frauke ist nicht hinten.", ru: "Фрауке не сзади.", a: "Frauke", b: "wo:hinten, beim Tee", not: true },
      ],
      answer: { "Herr Jensen|wo": "hinten, beim Tee", "Mateo|wo": "in der Küche", "Frauke|wo": "am Kiosk" },
    },
  },
  narr("На доске {zurzeit} три имени и три места. Стрелка {gerade} показывает на Йенсена. Хауке просит {moment} тишины — и всё равно говорит сам."),
  {
    t: "clue",
    title: "Sonntag, 17:30",
    text: "Am Mittag sagt Herr Jensen: «Tee. Alle. Halb sechs.» Um halb sechs ist der ganze Club hinten, Mateo in der Küche. Um sechs macht Herr Jensen den Club zu.",
  },
];

// Интерлюдия глазами чайки. Бросок: смена точки зрения · чайка · перепутать · das Wochenende · 12.
// По плану интерлюдии здесь — мастерская Греты; её из окна видит чайка, имени она не знает.
const gullDay: SceneNode[] = [
  { t: "pic", src: "06-gull.jpg", alt: "Чайка с кольцом летит над крышами Гардена и заглядывает в окно мастерской: под тканью большая плоская доска, банки краски — белая и тёмно-синяя, у стола спиной стоит женщина в тёмно-синем комбинезоне" },
  narr("Тем временем над Kiel. HEL 7305 летит по своим делам — то есть за чужими Fischbrötchen."),
  gullSays("Kieler Woche? Eine Woche? Für Möwen ist immer Wochenende!", "Kieler Woche? Неделя? Для чаек всегда выходные!", ["das Wochenende"]),
  { t: "gap", task: "Что думает чайка о неделе?", text: "Für Möwen ist immer ___!", options: ["Wochenende", "Woche", "Montag"], answer: "Wochenende", ru: "Для чаек всегда выходные!" },
  gullSays("Heute ist Samstag. Morgen ist … Montag?", "Сегодня суббота. Завтра… понедельник?", ["der Samstag", "der Montag"]),
  {
    t: "type",
    task: "Поправьте чайку: какой день завтра?",
    answers: ["Morgen ist Sonntag.", "Nein, morgen ist Sonntag.", "Sonntag."],
    ru: "Завтра воскресенье.",
  },
  narr("Над Gaarden чайка садится на подоконник. Внутри {werkstatt}: под тканью — большая плоская доска, рядом Dosen: weiß, dunkelblau."),
  gullSays("Eine Frau arbeitet. Am Samstag! Und morgen? Sie arbeitet auch am Sonntag.", "Женщина работает. В субботу! А завтра? Она работает и в воскресенье."),
  {
    t: "hear",
    task: "Что видит чайка?",
    voice: "Shelley",
    de: "Eine Frau arbeitet. Am Samstag! Und morgen? Sie arbeitet auch am Sonntag.",
    options: ["женщина работает и в субботу, и в воскресенье", "женщина спит до обеда", "женщина пьёт чай"],
    answer: "женщина работает и в субботу, и в воскресенье",
  },
  {
    t: "game",
    task: "Помогите чайке: расставьте дни по порядку.",
    hint: "Freitag, Samstag, Sonntag, Montag — неделя у немцев начинается с понедельника.",
    c: order(["Freitag,", "Samstag,", "Sonntag,", "Montag"], ["Sonntag,", "Montag", "Freitag,", "Samstag,"]),
  },
  {
    t: "pick",
    task: "Что чайка увидела в окне мастерской?",
    options: [
      ok("Доску под тканью и банки краски — белую и тёмно-синюю"),
      no("Пять пачек сахара", "Сахар — это кухня Матео. В мастерской — краска."),
      no("Пустую подставку", "Подставка стоит у клуба. В мастерской — доска под тканью."),
    ],
  },
  narr("Die Frau sieht zum Fenster. Чайка улетает: in der Werkstatt — kein Fischbrötchen. Кто это — чайке всё равно."),
];

// Сцена 4 · поворот: чай в 17:30. Отсылка — «Dinner for One»: the same procedure as every year, только
// здесь — каждый день. Версия ночного взлома рушится, Йенсен знал всё время.
const tea: SceneNode[] = [
  { t: "pic", src: "06-tea.jpg", alt: "Задняя терраса клуба у воды в 17:30: Йенсен разливает чай из большого чайника, за длинным столом весь клуб; чайка тащит со стола пакетики чая; домик клуба закрывает вид на вход" },
  narr("17:25. Hinten auf der Terrasse. Йенсен расставляет Tassen: eins, zwei, drei … zwanzig. Wie immer."),
  narr("Хауке шепчет: как в старом новогоднем фильме — the same procedure as every year. Только здесь every day."),
  jensen("Moin.", "Привет."),
  {
    t: "look",
    task: "Осмотритесь с террасы: что отсюда видно?",
    items: [
      { icon: "🪑", de: "die Terrasse", ru: "терраса", note: "Длинный стол, двадцать стульев, все заняты. Wie immer.", key: true },
      { icon: "🪧", de: "der Aufsteller", ru: "подставка", note: "Подставку у входа отсюда не видно: её закрывает домик клуба.", key: true },
      { icon: "☕", de: "die Tasse", ru: "чашка", note: "Zwanzig Tassen. У Йенсена — своя, белая, с ярлычком." },
      { icon: "🌊", de: "das Wasser", ru: "вода", note: "Отсюда видно только воду, мачты и «Sprotte»." },
    ],
  },
  elif("Die Möwe! Sie klaut die Teebeutel!", "Чайка! Она таскает чайные пакетики!"),
  narr("{moewe} пикирует на стол и уносит {teebeutel} — целую горсть, с ярлычками."),
  { t: "game", task: `Отбейте пакетики! ${RACE}`, hint: HINT_RACE, outcome: RACE_STAKES, c: race(["halb", "die Uhr", "die Stunde", "der Abend", "früh", "spät"]) },
  { t: "game", task: "Подпишите спасённые пакетики по буквам.", hint: HINT_SPELL, c: letters(["die Minute", "die Stunde", "das Viertel"]) },
  narr("Ровно um halb sechs — Tee. Хауке тихо встаёт и идёт nach vorne."),
  hauke("Vorne ist niemand! Zehn Minuten – und niemand sieht den Aufsteller!", "Впереди никого! Десять минут — и никто не видит подставку!"),
  {
    t: "hear",
    task: "Что увидел Хауке у входа?",
    voice: "Rocko",
    de: "Vorne ist niemand! Zehn Minuten – und niemand sieht den Aufsteller!",
    options: ["у входа никого, подставку никто не видит", "у входа стоит Грета", "подставка снова с табличкой"],
    answer: "у входа никого, подставку никто не видит",
  },
  {
    t: "pick",
    task: "Когда пропала табличка?",
    options: [
      ok("В воскресенье около 17:30, во время чая, а не ночью"),
      no("Ночью — Einbruch", "В 17:35 Фрауке видела женщину с большой плоской сумкой, а в шесть Йенсен закрыл клуб."),
      no("В понедельник утром", "Утром её только заметили."),
    ],
  },
  mateo("Kein Einbruch? … Schade. Das ist ein guter Film.", "Не взлом?… Жаль. Хороший был бы фильм."),
  { t: "game", task: "Хауке повторяет фразы вечера. Повторите за ним вслух.", hint: HINT_SAY, c: speak(["Wie spät ist es?", "Wie viel Uhr ist es?", "halb", "der Feierabend"]) },
  {
    t: "reply",
    rule: ["tagesablauf/klammer-4"],
    task: "Спросите Йенсена, когда начинается чай.",
    options: [
      ok("Herr Jensen, wann fängt der Tee an?"),
      no("Herr Jensen, wann fängt der Tee?", "anfangen — приставка an уходит в конец: fängt … an."),
      no("Herr Jensen, wann anfängt der Tee?", "Корень на втором месте, приставка — в конце: wann fängt der Tee an?"),
    ],
  },
  jensen("Halb sechs. Wie immer.", "В половине шестого. Как всегда."),
  { t: "gap", rule: ["tagesablauf/klammer-1"], task: "Что ответил Йенсен? Допишите фразу полностью.", text: "Der Tee fängt um halb sechs ___.", options: ["an", "auf", "zu"], answer: "an", ru: "Чай начинается в половине шестого." },
  narr("Чай у Йенсена — как служба: {anfang} в 17:30, {schluss} в 18:00. Для этого есть два глагола: {beginnen} и {enden}."),
  narr("Wie immer. Но в воскресенье Йенсен зовёт ВСЕХ — сам, тремя словами. Und der Aufsteller ist allein."),
  dana("Er ruft alle zum Tee. Und vorne ist niemand. Er weiß das!", "Он зовёт всех на чай. А впереди никого. Он это знает!"),
  {
    t: "game",
    task: "Проверьте, что видно с террасы.",
    c: verdict(["Richtig", "Falsch"], [
      ["С террасы видно подставку", false, "Её закрывает домик клуба."],
      ["Чай начинается в 17:30", true, "Halb sechs. Wie immer."],
      ["В 17:30 все сидят сзади", true, "Двадцать чашек, двадцать стульев."],
    ]),
  },
  {
    t: "pick",
    task: "Что это значит?",
    options: [
      ok("Йенсен знал: в 17:30 у входа никого не будет"),
      no("Йенсен просто любит гостей", "Годами он пил чай с теми, кто пришёл. В воскресенье он позвал всех — впервые."),
      no("Это совпадение", "Голосовое, чай для всех и клуб, закрытый в шесть, — многовато совпадений."),
    ],
  },
  {
    t: "type",
    task: "Запишите вывод в блокнот.",
    answers: ["Herr Jensen weiß alles.", "Herr Jensen weiß es.", "Jensen weiß alles."],
    ru: "Йенсен всё знает.",
  },
  {
    t: "game",
    rule: ["tagesablauf/vorfeld-1"],
    task: "Соберите фразу для доски: время — на первом месте.",
    hint: "Время на первом месте, глагол всё равно второй.",
    c: order(["Um", "halb", "sechs", "trinken", "alle", "Tee."], ["Tee.", "alle", "Um", "trinken", "halb", "sechs"]),
  },
  narr("Йенсен trinkt den Tee, sagt «Moin» und geht. Раньше всех — впервые за много лет."),
  {
    t: "clue",
    title: "Tee um halb sechs",
    text: "Sonntag, 17:30: der ganze Club ist hinten, vorne ist niemand. Herr Jensen: «Tee. Alle. Halb sechs.» Um sechs macht er den Club zu. Kein Einbruch. Herr Jensen weiß alles.",
  },
];

// Сцена 5 · кульминация: доска времени, замок урока и записка Йенсену.
const timeline: SceneNode[] = [
  { t: "pic", src: "06-board.jpg", alt: "Вечер в клубе: на доске линия времени с карточками 17:05, 17:30, 17:35, 18:00; Дана пишет мелом, Хауке показывает на часы клуба, Элиф с блокнотом" },
  narr("Abend im Club. Дана чертит на доске линию: Samstag und Sonntag, von fünf bis sechs. По воскресеньям лавки закрыты — значит, чек субботний."),
  dana("Am Samstag um fünf nach fünf kauft der Moin-Mann Farbe. Am Sonntag ist der Laden zu.", "В субботу в пять минут шестого Moin-Mann покупает краску. В воскресенье лавка закрыта."),
  {
    t: "game",
    rule: ["tagesablauf/klammer-1", "tagesablauf/wann-1"],
    task: "Блокнот закрыт на фразы дня. Поверните диски.",
    hint: HINT_LOCK,
    c: lock([
      ["Чай начинается в половине шестого.", [["Der Tee", "Den Tee", "Die Tee"], ["fängt um halb sechs", "fangen um halb sechs", "fängst um halb sechs"], ["an.", "auf.", "zu."]]],
      ["В шесть Йенсен закрывает клуб.", [["Um sechs", "Am sechs", "Im sechs"], ["macht Herr Jensen", "Herr Jensen macht", "machen Herr Jensen"], ["den Club zu.", "den Club an.", "zu den Club."]]],
      ["Чай длится час.", [["Der Tee", "Das Tee", "Die Tee"], ["dauert", "dauern", "dauerst"], ["eine Stunde.", "ein Stunde.", "einen Stunde."]]],
    ]),
  },
  {
    t: "game",
    task: "Разложите воскресенье по минутам: время и что было.",
    hint: "Загляните в блокнот: чек, голосовое, кассовая книга, журнал.",
    c: pairs([["Samstag, 17:05", "der Kassenbon: Dunkelblau"], ["Sonntag, 17:30", "Tee, alle hinten"], ["Sonntag, 17:35", "Frau mit Tasche, Bus"], ["Sonntag, 18:00", "Herr Jensen macht zu"]]),
  },
  dana("Zuerst kauft er Farbe. Dann trinkt er Tee – um halb sechs, wie immer.", "Сначала он покупает краску. Потом пьёт чай — в половине шестого, как всегда."),
  {
    t: "game",
    rule: ["moin/dann-1"],
    task: "Запишите на доске второй шаг Moin-Mann: соберите фразу.",
    hint: "dann занимает первое место: глагол идёт сразу за ним, подлежащее — после.",
    c: order(["Dann", "trinkt", "er", "um", "halb", "sechs", "Tee."], ["er", "Tee.", "halb", "Dann", "sechs", "trinkt", "um"]),
  },
  hauke("Herr Jensen weiß alles. Seit Sonntag!", "Господин Йенсен всё знает. С воскресенья!"),
  { t: "gap", task: "Что говорит Хауке?", text: "Herr Jensen ___ alles.", options: ["weiß", "weißt", "wissen"], answer: "weiß", ru: "Господин Йенсен всё знает." },
  {
    t: "pick",
    task: "Почему Йенсен молчит?",
    options: [
      ok("Пока неизвестно — нужно с ним поговорить"),
      no("Он вор", "Вор не зовёт весь клуб на чай и не закрывает клуб по журналу."),
      no("Он не знает немецкого", "Девять слов в голосовом — знает. Просто бережёт."),
    ],
  },
  elif("Wir schreiben ihm! Ein Brief – keine Fragen auf der Terrasse.", "Напишем ему! Письмо — без вопросов на террасе."),
  {
    t: "game",
    rule: ["tagesablauf/klammer-2"],
    task: "Напишите Йенсену по образцу: записке Фрауке. Подписываются Хауке и Дана, поэтому — wir.",
    hint: HINT_LETTER,
    c: letter(
      "Herr Jensen",
      ["Liebe Leute,", "ich passe am Vormittag auf den Club auf.", "Der Kiosk macht um neun auf.", "Viele Grüße", "Frauke"],
      [
        an("Lieber", "Herr Jensen"),
        ["Danke → für den Tee", "danke für den Tee!", "Danke für den Tee!"],
        ["Frage → Zeit haben, morgen", "Haben Sie morgen Zeit?", "haben Sie morgen Zeit?"],
        ["Wir → Sie morgen um acht anrufen", "Wir rufen Sie morgen um acht an.", "wir rufen Sie morgen um acht an.", "Morgen um acht rufen wir Sie an."],
        gruss("Hauke und Dana"),
      ],
    ),
  },
  {
    t: "game",
    rule: ["tagesablauf/klammer-2"],
    task: "Перепишите главную фразу записки: соберите её.",
    hint: "anrufen: rufen — на втором месте, an — в самом конце.",
    c: order(["Wir", "rufen", "Sie", "morgen", "um", "acht", "an."], ["an.", "Sie", "um", "Wir", "acht", "rufen", "morgen"]),
  },
  narr("Записку подсовывают под дверь домика гавани. Eine Minute später — ответ. Ein Wort: «Moin.»"),
  dana("Moin. Das heißt … Ja? Nein? Vielleicht?", "Moin. Это значит… да? Нет? Может быть?"),
  {
    t: "hear",
    task: "Как Дана понимает ответ Йенсена?",
    voice: "Anna",
    de: "Moin. Das heißt … Ja? Nein? Vielleicht?",
    options: ["непонятно: да, нет или может быть", "точно да", "точно нет"],
    answer: "непонятно: да, нет или может быть",
  },
  {
    t: "game",
    rule: ["tagesablauf/wann-1"],
    task: "Заполните карточку воскресенья.",
    hint: "Время можно цифрами или словами: 17:30 — halb sechs.",
    c: write("Samstag und Sonntag", [
      ["Kassenbon, Samstag", "17:05", "fünf nach fünf"],
      ["Tee", "17:30", "halb sechs", "um halb sechs"],
      ["Frau mit Tasche", "17:35", "fünf nach halb sechs"],
      ["Club zu", "18:00", "sechs Uhr", "um sechs"],
    ]),
  },
  {
    t: "game",
    task: "Найдите противоречие: что не сходится в версии Матео и в кассовой книге?",
    hint: "Сравните время: когда табличку унесли — ночью или раньше?",
    c: {
      kind: "contra",
      texts: [
        { who: "Mateo", lines: [["Das", "Schild", "ist", "in", "der", "Nacht", "weg."], ["Ein", "Einbruch!"]] },
        { who: "Kassenbuch, Sonntag", lines: [["17:35:", "eine", "Frau,", "große", "flache", "Tasche,", "Bus."], ["18:00:", "Club", "zu."]] },
      ],
      answer: ["0:0:5", "1:0:0"],
    },
  },
  mateo("Und ich mache heute keinen Feierabend. Ich koche!", "А я сегодня не заканчиваю. Я готовлю!"),
  { t: "gap", task: "Что говорит Матео?", text: "Ich mache heute keinen ___.", options: ["Feierabend", "Abend", "Mittag"], answer: "Feierabend", ru: "Я сегодня не заканчиваю работу." },
  {
    t: "type",
    task: "Запишите главный вопрос на завтра.",
    answers: ["Warum sagt Herr Jensen nichts?", "Warum spricht Herr Jensen nicht?", "Herr Jensen, warum sagen Sie nichts?"],
    ru: "Почему Йенсен ничего не говорит?",
  },
  elif("Und jetzt ein Test! Was passt nicht?", "А теперь проверка! Что не подходит?"),
  {
    t: "game",
    task: "Элиф проверяет: одно слово в группе лишнее.",
    hint: HINT_ODD,
    c: odd([
      [["aufstehen", "anrufen", "aufhören", "kochen"], "kochen", "У kochen нет отделяемой приставки."],
      [["der Morgen", "der Mittag", "der Abend", "die Nacht"], "die Nacht", "Части дня — der, а ночь — die: in der Nacht."],
      [["halb", "das Viertel", "nach", "morgen"], "morgen", "morgen — завтра; остальные — слова для часов."],
    ]),
  },
  {
    t: "clue",
    title: "Zeitleiste",
    text: "Samstag, 17:05: Kassenbon (Dunkelblau). Sonntag: 17:30 Tee, alle hinten · 17:35 Frau mit Tasche, Bus · 18:00 Herr Jensen macht zu. Brief an Herrn Jensen. Herr Jensen: «Moin.»",
  },
];

// Сцена 6 · эпилог и крючок: речь как на экзамене. Броски: глобальное событие · Фрауке · промокнуть ·
// der Feierabend · 14 (ливень в конце рабочего дня, второй знак фронта «Погода»), сквозная шутка
// обостряется · Нильс · починить · der Abend · 10 (Нильс чинит часы клуба и пишет о каждом винтике).
const evening: SceneNode[] = [
  { t: "pic", src: "06-evening.jpg", alt: "Вечер, ливень: Фрауке под дождём тянет навес киоска, Нильс в красной ветровке на стремянке чинит часы над дверью клуба, в окне кухни Матео в муке, вдали Йенсен уходит в домик гавани" },
  {
    t: "look",
    task: "Осмотрите вечернюю набережную.",
    items: [
      { icon: "🕗", de: "die Uhr", ru: "часы", note: "Над дверью клуба. Нильс уже на стремянке.", key: true },
      { icon: "🔚", de: "der Feierabend", ru: "конец рабочего дня", note: "Киоск закрывается, Фрауке снимает вывеску.", key: true },
      { icon: "🪟", de: "das Fenster", ru: "окно", note: "В окне кухни Матео — в муке до локтей." },
      { icon: "🌆", de: "der Abend", ru: "вечер", note: "Над водой тучи. Kieler Woche через неделю." },
    ],
  },
  { ...narr("Feierabend. Frauke macht den Kiosk zu — und wieder: {rain} Насквозь, как Дану вчера. Прогноз на Kieler Woche всё хуже."), set: { weather: 1 } },
  frauke("Feierabend! Und jetzt Regen! Jeden Abend Regen!", "Конец работы! А теперь дождь! Каждый вечер дождь!"),
  {
    t: "hear",
    task: "На что жалуется Фрауке?",
    voice: "Sandy",
    de: "Feierabend! Und jetzt Regen! Jeden Abend Regen!",
    options: ["каждый вечер дождь", "каждое утро туман", "дождя не будет"],
    answer: "каждый вечер дождь",
  },
  {
    t: "reply",
    task: "Предложите Фрауке помочь с навесом.",
    options: [
      ok("Frauke, wir helfen! Wir machen den Kiosk zu."),
      no("Frauke, wir helfen! Wir machen den Kiosk auf.", "Feierabend — киоск закрывают: zumachen."),
      no("Frauke, wir helfen! Wir zumachen den Kiosk.", "Приставка уходит в конец: wir machen … zu."),
    ],
  },
  narr("Над дверью, на стремянке — Нильс. Он чинит die Uhr. И пишет об этом alle zwei Minuten."),
  narr("«Eins!!! Zwei!!! Die Uhr geht!!! Es ist acht Uhr!!! Acht!!!»"),
  {
    t: "game",
    task: "Поставьте часы так, как их выставил Нильс.",
    hint: "acht Uhr вечером — 20:00.",
    c: clock("20:00", {
      "08:00": "Утром? Нильс чинит часы вечером: acht Uhr am Abend — 20:00.",
      "18:00": "Это sechs Uhr.",
      "20:30": "Это halb neun.",
    }),
  },
  hauke("Nils repariert die Uhr am Abend. Und morgen früh ist sie wieder kaputt!", "Нильс чинит часы вечером. А завтра утром они опять сломаются!", ["der Abend", "früh"]),
  elif("Zwölf Nachrichten für eine Uhr! Das ist Nils.", "Двенадцать сообщений про одни часы! Это Нильс."),
  narr("Хауке промок до нитки. Ему нужны три вещи: {dusche}, сухие носки и сон. Он {muede}."),
  hauke("Ich bin müde. Morgen stehe ich um sieben auf, ich dusche, ich frühstücke – und dann Kaffee!", "Я устал. Завтра встаю в семь, принимаю душ, завтракаю — а потом кофе!", ["duschen", "frühstücken"]),
  {
    t: "game",
    task: "Хауке устраивает репетицию экзамена. Тема дня — распорядок дня.",
    hint: HINT_ORAL,
    c: oral([
      oralSay(2, ASK, "Thema: Tagesablauf · Wort: aufstehen", "Wann stehst du auf?", "Когда ты встаёшь?", "Wann …?"),
      oralReply(2, ANSWER, "Wann hast du Feierabend?", "Ich habe um fünf Feierabend.", "Я заканчиваю работу в пять."),
      oralSay(2, ASK, "Thema: Tagesablauf · Wort: duschen", "Duschst du am Morgen?", "Ты принимаешь душ утром?", "… du …?"),
      oralReply(2, ANSWER, "Wann frühstückst du?", "Ich frühstücke um acht.", "Я завтракаю в восемь."),
      oralSay(3, REQUEST, "⏰", "Wie spät ist es, bitte?", "Который час, пожалуйста?"),
    ]),
  },
  {
    t: "game",
    task: "Хауке проверяет свой распорядок: одно слово в группе лишнее.",
    hint: HINT_ODD,
    c: odd([
      [["aufstehen", "duschen", "frühstücken", "fernsehen"], "fernsehen", "Телевизор — вечером, остальное — утро."],
      [["aufräumen", "kochen", "einkaufen", "die Nacht"], "die Nacht", "Ночь — время суток, остальное — дела по дому."],
    ]),
  },
  mateo("Ich backe nur Brot. Bis in die Nacht!", "Я пеку только хлеб. До самой ночи!"),
  {
    t: "pick",
    task: "Что записать о Матео?",
    options: [
      ok("Он каждый вечер печёт что-то тайное — сахар и лук для этого"),
      no("Он печёт только хлеб", "Хлеб из пяти пачек сахара? Даже у Матео так не бывает."),
      no("Он ищет табличку на кухне", "На кухне он ищет только миксер."),
    ],
  },
  narr("Вы идёте к домику гавани — noch ein Brief. Йенсен видит вас im Fenster и гасит свет."),
  jensen("Moin.", "Привет."),
  dana("Er macht das Licht aus. Er spricht nicht mit uns.", "Он гасит свет. Он с нами не разговаривает."),
  narr("Свет в окне Йенсена живёт по своим правилам: {anmachen} — когда вы уходите, {ausmachen} — когда вы приходите."),
  {
    t: "game",
    rule: ["tagesablauf/wann-1"],
    task: "Дана пишет итог дня. Вставьте пропущенные слова.",
    hint: "am — с днём и частью дня, um — с часами, in der Nacht — ночью.",
    c: gaps("___ Sonntag ___ halb sechs trinken alle Tee. ___ der Nacht ist kein Einbruch.", ["Am", "um", "In", "Im", "am"], ["Am", "um", "In"]),
  },
  { t: "game", task: "Слова дня перемешались. Откройте пары: немецкое слово и перевод.", c: memory(["sprachnachricht", "kassenbuch", "terrasse", "einbruch", "teebeutel", "werkstatt"]) },
  {
    t: "pick",
    task: "Как завтра поговорить с Йенсеном?",
    options: [
      ok("Найти время, когда он не может уйти: договориться о встрече"),
      no("Снова прийти на чай", "На чае он уходит первым. Это вы сегодня видели."),
      no("Позвонить и ждать голосового", "Девять слов в неделю — его норма. Неделя кончится раньше."),
    ],
  },
  narr("Хауке достаёт карточки лото: nur die Uhr. Die Möwe смотрит на карточку с Uhr — и вспоминает утро."),
  { t: "game", task: "Лото на ночь: послушайте слово и закройте его на карточке.", hint: HINT_HEAR, c: bingo(["die Uhr", "die Stunde", "die Minute", "halb", "der Abend", "die Nacht", "der Feierabend", "früh", "spät"]) },
  { t: "game", task: "Подпишите в блокноте дни по буквам.", hint: HINT_SPELL, c: letters(["der Sonntag", "der Samstag", "das Wochenende"]) },
  {
    t: "type",
    task: "Запишите итог дня одной фразой: взлома не было.",
    answers: ["Kein Einbruch.", "Es ist kein Einbruch.", "Das ist kein Einbruch."],
    ru: "Взлома не было.",
  },
  narr("Вы закрываете блокнот: «День шестой. Halb sechs — 17:30. Kein Einbruch. Herr Jensen weiß alles — und молчит». Noch sechs Tage."),
  {
    t: "clue",
    title: "Herr Jensen weiß alles",
    text: "Sonntag um halb sechs: Tee für alle. Vorne ist niemand. 17:35: eine Frau, eine große flache Tasche, Bus. Herr Jensen weiß alles — und sagt nur «Moin».",
  },
];

const play = (nodes: SceneNode[]) => ({ kind: "play" as const, nodes });
const HINT = "Ошибка ничего не стоит: собеседник отреагирует, и можно выбрать снова.";

export const sceneChapter6: Episode = {
  id: "moin-neu-6",
  title: "Halb sechs",
  day: { de: "Noch sieben Tage", ru: "ещё семь дней до Kieler Woche" },
  place: "Kiellinie · клуб, его терраса и киоск",
  topic: "Время и распорядок дня",
  grammar: "Wie spät ist es? · halb sechs · um, am, von … bis · aufstehen: приставка в конце",
  beats: [
    {
      id: "06-s1",
      title: "Neun Wörter",
      story: [],
      prompt: "Голосовое Йенсена, halb sechs и версия Матео о ночном взломе.",
      hint: HINT,
      success: "Halb sechs — 17:30. Йенсен зовёт на чай, а Матео верит во взлом ночью.",
      challenge: play(message),
    },
    {
      id: "06-s2",
      title: "Das Kassenbuch",
      story: [],
      prompt: "Киоск Фрауке, её кассовая книга и обещание присмотреть за клубом.",
      hint: "am Sonntag, um halb sechs: am — с днём, um — с часами.",
      success: "В 17:35 женщина с большой плоской сумкой ушла к автобусу. Ночью в книге — ничего.",
      challenge: play(book),
    },
    {
      id: "06-s3",
      title: "Wer ist wo?",
      story: [],
      prompt: "Элиф, Матео и фрау Петерсен: кто где был в 17:30.",
      hint: "aufhören, zumachen: корень на втором месте, приставка — в конце.",
      success: "Йенсен сам позвал весь клуб на чай, а в шесть закрыл клуб.",
      challenge: play(witnesses),
    },
    {
      id: "06-i1",
      title: "Глазами чайки",
      pov: "глазами чайки",
      story: [],
      prompt: "Интерлюдия: чайка путает дни и заглядывает в чужую мастерскую.",
      hint: "Samstag, Sonntag, Montag: am Samstag — в субботу.",
      success: "В мастерской в Гардене — доска под тканью и банки краски.",
      challenge: play(gullDay),
    },
    {
      id: "06-s4",
      title: "Wie immer",
      story: [],
      prompt: "Чай на задней террасе ровно в 17:30.",
      hint: "anfangen: Der Tee fängt um halb sechs an.",
      success: "Табличка пропала во время чая, не ночью. Йенсен знал.",
      challenge: play(tea),
    },
    {
      id: "06-s5",
      title: "Zeitleiste",
      story: [],
      prompt: "Линия времени, замок и записка Йенсену.",
      hint: "anrufen: Wir rufen Sie morgen um acht an.",
      success: "Ответ Йенсена — одно слово: Moin.",
      challenge: play(timeline),
    },
    {
      id: "06-s6",
      title: "Kein Feierabend",
      story: [],
      prompt: "Ливень в конце рабочего дня, часы Нильса и закрытая дверь Йенсена.",
      hint: "Wann stehst du auf? — корень второй, приставка в конце.",
      success: "День шестой закончен. Йенсен избегает разговора. Noch sechs Tage.",
      challenge: play(evening),
    },
  ],
};
