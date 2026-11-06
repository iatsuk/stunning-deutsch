import {
  an, ANSWER, ASK, bingo, docks, gaps, gruss, gull as race, HINT_DOCK, HINT_HEAR, HINT_LETTER, HINT_LOCK, HINT_ODD,
  HINT_ORAL, HINT_PICTURE, HINT_RACE, HINT_SAY, HINT_SPELL, letter, letters, lock, odd, oral, order, pairs, RACE,
  reply as oralReply, say as oralSay, scene, sort, speak, spot, verdict,
} from "../build.ts";
import { phrases } from "../data.ts";
import type { Challenge, Episode, SceneNode } from "../types.ts";

// Глава 3 в формате сцен (A1-PLOT.md, «Формат сцен»): семья, mein / dein / sein / ihr / unser,
// kein, множественное число. Вопрос главы — кто связан с табличкой. Вход — обещанное фото Opa,
// выход — табличку в 1976 году написал Opa Нильса и Греты, а Грета пишет «Das ist unser Schild».
// Немецкий — из уроков 1–3 и выражений истории; новые слова урока — в learn у реплики.
// Повороты брошены оракулом (seed 1793958465), увязка — в журнале A1-STORYCRAFT.md.

const narr = (text: string): SceneNode => ({ t: "narr", text });
const learn = (words?: string[]) => (words ? { learn: words } : {});
const hauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Hauke", voice: "Rocko", de, ru, ...learn(words) });
const jensen = (de: string, ru: string): SceneNode => ({ t: "say", who: "Herr Jensen", voice: "Grandpa", de, ru });
const elif = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Elif", voice: "Flo", de, ru, ...learn(words) });
const dana = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Dana", voice: "Anna", de, ru, ...learn(words) });
const mateo = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Mateo", voice: "Reed", de, ru, ...learn(words) });
const petersen = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frau Petersen", voice: "Sandy", de, ru, ...learn(words) });
/** Пары памяти — из выражений истории, которые глава уже показала. */
const memory = (ids: string[]): Challenge => ({ kind: "memory", pairs: ids.map((id) => ({ id, de: phrases[id].de, ru: phrases[id].ru })) });
const ok = (text: string) => ({ text, ok: true as const });
const no = (text: string, react: string) => ({ text, react });

// Сцена 1 · пролог и завязка. Вход главы — обещанное Нильсом фото Opa.
const photo: SceneNode[] = [
  { t: "pic", src: "03-morning.jpg", alt: "Утро у клуба: на пустой подставке конверт, чайка тянет из него старое фото за край, Хауке бросается следом" },
  narr("Третий день, noch zehn Tage. На пустом {aufsteller} белеет конверт с тремя восклицательными знаками: почерк Нильса."),
  hauke("Zehn! Noch zehn Tage! Und ein Foto von Nils!", "Десять! Ещё десять дней! И фото от Нильса!", ["das Foto"]),
  {
    ...narr("В конверте старое бумажное Foto. Достать его вы не успеваете: {moewe} хватает Foto за край и тянет к воде."),
    set: { gull: 1 },
  },
  { t: "game", task: `Отнимите фото у чайки! ${RACE}`, hint: HINT_RACE, c: race(["das Foto", "die Familie", "der Mann", "die Frau", "das Kind", "der Junge"]) },
  narr("Фото вы отбили, но правый край {moewe} унесла. На оставшемся — 1976 год, {pinsel} и {schild} MOIN, совсем новое."),
  { t: "pic", src: "03-photo1976.jpg", alt: "Старое выцветшее фото 1976 года: мужчина пишет кистью белые буквы MOIN на новой тёмно-синей табличке, женщина держит пирог, мальчик — банку краски; правый край оторван" },
  {
    t: "look",
    task: "Рассмотрите старое фото.",
    items: [
      { icon: "🖌️", de: "der Pinsel", ru: "кисть", note: "Кисть в руке мужчины: он пишет на новой табличке белые буквы MOIN.", key: true },
      { icon: "👵", de: "die Oma", ru: "бабушка", note: "Женщина держит поднос с пирогом. Пирог посыпан сахаром.", key: true },
      { icon: "👦", de: "der Junge", ru: "мальчик", note: "Мальчик лет восьми обеими руками держит банку краски. Очень серьёзно." },
    ],
  },
  narr("На обороте — подписи. Нильс не жалеет восклицательных знаков: «Opa!!! Oma!!! Vater!!!» Хауке читает вслух."),
  hauke("Das ist unser Opa! Und das ist unsere Oma!", "Это наш дедушка! А это наша бабушка!", ["der Opa", "die Oma"]),
  {
    t: "game",
    rule: ["familie/mein-2"],
    task: "Чайка поцарапала оборот. Вставьте пропавшие слова.",
    hint: "der Opa — unser Opa, die Oma — unsere Oma. Нильс пишет о себе: mein.",
    c: gaps("Hallo!!! Das ist ___ Opa!!! Und das ist ___ Oma mit Kuchen!!! Der Junge? Das ist ___ Vater!!! Opa ist jetzt neunzig!!! Nils", ["unser", "unsere", "mein", "meine"], ["unser", "unsere", "mein"]),
  },
  dana("Der Junge ist sein Vater. Greta ist seine Schwester. Also auch ihr Vater!", "Мальчик — его отец. Грета — его сестра. Значит, и её отец!", ["der Vater", "die Schwester"]),
  {
    t: "hear",
    task: "Что поняла Дана?",
    voice: "Anna",
    de: "Der Junge ist sein Vater. Greta ist seine Schwester. Also auch ihr Vater!",
    options: ["Мальчик — отец Нильса и Греты", "Мальчик — брат Нильса", "Мальчик — сын Греты"],
    answer: "Мальчик — отец Нильса и Греты",
  },
  narr("Хауке подносит Foto к лицу и говорит басом, как злодей в космическом кино:"),
  hauke("Nils … ich bin dein Opa!", "Нильс… я твой дедушка!"),
  dana("Nein, Hauke. Er ist nicht dein Opa. Er ist ihr Opa!", "Нет, Хауке. Он не твой дедушка. Он их дедушка!"),
  { t: "gap", rule: ["familie/wessen-1"], task: "Чей это дедушка? Нильса и Греты — значит…", text: "Nils und Greta: Das ist ___ Opa.", options: ["ihr", "sein", "dein"], answer: "ihr", ru: "Нильс и Грета: это их дедушка." },
  {
    t: "game",
    task: "Дана рисует в блокноте семью Хансен. Послушайте слово и нажмите на рисунок.",
    hint: HINT_PICTURE,
    c: scene([["der Opa", "👴"], ["die Oma", "👵"], ["der Vater", "👨"], ["die Mutter", "👩"], ["der Junge", "👦"], ["das Mädchen", "👧"], ["das Baby", "👶"], ["der Hund", "🐕"]]),
  },
  narr("К {aufsteller} подходит Матео с термосом. Он видит Foto von Opa — и забывает про кофе."),
  mateo("Butterkuchen! Das ist Oma Hansens Kuchen!", "Масляный пирог! Это пирог бабушки Хансен!"),
  {
    t: "hear",
    task: "Что Матео узнал на фото?",
    voice: "Reed",
    de: "Butterkuchen! Das ist Oma Hansens Kuchen!",
    options: ["пирог бабушки Хансен", "саму бабушку Хансен", "табличку MOIN"],
    answer: "пирог бабушки Хансен",
  },
  narr("Матео узнал не людей, а {butterkuchen}: в клубе его пекут на каждый день рождения. А {rezept} подписан: «Oma Hansen»."),
  {
    t: "pick",
    task: "Что теперь известно?",
    options: [
      ok("Табличку MOIN в 1976 году писал дедушка Нильса и Греты"),
      no("Табличку сделал Матео: он узнал пирог", "Матео узнал пирог, а не кисть. В 1976 году его самого ещё не было."),
      no("Табличку унесла бабушка Хансен", "На фото она держит пирог, а не табличку. И было это пятьдесят лет назад."),
    ],
  },
  {
    t: "reply",
    rule: ["familie/wessen-2"],
    task: "Напишите Нильсу и Грете сразу: это ваш дедушка?",
    options: [
      ok("Ist das euer Opa?"),
      no("Ist das unser Opa?", "unser — «наш». Тогда это был бы и ваш дедушка. А вы спрашиваете их: euer."),
      no("Ist das ihr Opa?", "ihr Opa — «её» или «их» дедушка: так говорят о них, а не им. Им — euer."),
    ],
  },
  narr("Ответ приходит через секунду: «Ja!!! Unser Opa!!! Heinrich Hansen!!! Das Schild ist von Opa!!!»"),
  { t: "type", rule: ["familie/wessen-1"], task: "Запишите в блокнот: «Это их дедушка».", answers: ["Das ist ihr Opa.", "Das ist ihr Opa!"], ru: "Это их дедушка." },
  narr("1976… Эти цифры вы уже видели: у {gaestezimmer}, на {ehrentafel}, совсем свежей белой краской."),
  {
    t: "pick",
    task: "Где вы видели «1976»?",
    options: [
      ok("На доске почёта у гостевой комнаты: «H. Hansen · 1976»"),
      no("На бирке Нильса", "На бирке — Nils H. и Hamburg. Года там нет."),
      no("На банке wasserfest", "На банке одно слово — wasserfest. Цифр на ней нет."),
    ],
  },
  {
    t: "game",
    task: "Подпишите людей на фото.",
    hint: "Nils und Greta — внуки: der Enkel, во множественном die Enkel.",
    c: pairs([["Heinrich Hansen", "der Opa"], ["Hilde Hansen", "die Oma"], ["Peter, acht Jahre", "der Junge"], ["Nils und Greta", "die Enkel"]]),
  },
  {
    t: "clue",
    title: "Фото Opa",
    text: "1976 год: Opa Нильса и Греты, Heinrich Hansen, пишет табличку MOIN; Oma держит пирог, их сын Peter — банку краски. Правый край унесла чайка. «H. Hansen · 1976» — та же строка, что на доске почёта.",
  },
];

// Сцена 2 · развитие. Бросок: второстепенный герой по своей черте · чайка · заблудиться ·
// die Mutter · 15. Бросок за кадром: Петерсен · спрятать · der Hund · 11.
const roof: SceneNode[] = [
  { t: "pic", src: "03-roof.jpg", alt: "Крыша клуба: в гнезде из водорослей три пушистых птенца и край фото, рядом чайка-мать, чайка-отец и чайка с кольцом; снизу смотрит Элиф с биноклем" },
  narr("Где край от Foto? Элиф знает привычки своей {moewe} с {ring} HEL 7305. Сегодня её бинокль смотрит на крышу клуба."),
  elif("Ha – E – El. Sieben, drei, null, fünf.", "Х-Е-Л. Семь, три, ноль, пять."),
  narr("{moewe} не заблудилась, а прилетела домой. На крыше клуба {nest}, и в нём её ждёт Familie."),
  elif("Das ist ihre Familie! Das ist ihre Mutter. Und das ist ihr Vater!", "Это её семья! Это её мать. А это её отец!", ["die Familie", "die Mutter"]),
  {
    t: "hear",
    task: "Кого Элиф видит рядом с чайкой?",
    voice: "Flo",
    de: "Das ist ihre Familie! Das ist ihre Mutter. Und das ist ihr Vater!",
    options: ["её мать и отца", "её детей", "её мужа"],
    answer: "её мать и отца",
  },
  narr("В {nest} три пушистых Kinder. Край от Foto {moewe} подложила им, как одеяло. Без {leiter} его не достать."),
  {
    t: "look",
    task: "Осмотрите крышу снизу.",
    items: [
      { icon: "🪺", de: "das Nest", ru: "гнездо", note: "Гнездо из водорослей и верёвок. Сверху — край фото, белой стороной вниз.", key: true },
      { icon: "🪜", de: "die Leiter", ru: "лестница-стремянка", note: "До крыши без лестницы не добраться. Лестница клуба стоит в офисе у фрау Петерсен.", key: true },
      { icon: "🐣", de: "das Kind", ru: "ребёнок", note: "Птенцы — тоже дети. Три Kinder пищат так, что слышно на причале." },
    ],
  },
  elif("Die Mutter hat drei Kinder. Unsere Möwe hat drei Geschwister!", "У матери трое детей. У нашей чайки — трое братьев и сестёр!", ["das Kind", "die Geschwister"]),
  { t: "gap", rule: ["familie/plural-1"], task: "Сколько детей у чайки-матери?", text: "Die Mutter hat drei ___.", options: ["Kinder", "Kind", "Kindern"], answer: "Kinder", ru: "У матери трое детей." },
  {
    t: "game",
    task: "Элиф ведёт учёт чаек клуба. Сколько кого на крыше?",
    hint: "Наша чайка с кольцом — отдельно: она не мать и не ребёнок.",
    c: {
      kind: "quantity",
      items: [
        { id: "mutter", text: "die Mutter", max: 3 },
        { id: "vater", text: "der Vater", max: 3 },
        { id: "kinder", text: "die Kinder", max: 5 },
        { id: "ring", text: "die Möwe HEL 7305", max: 3 },
      ],
      answer: { mutter: 1, vater: 1, kinder: 3, ring: 1 },
    },
  },
  narr("За {leiter} вы идёте в {buero}. Frau Petersen сидит очень прямо, а под её столом кто-то тихо тявкает."),
  petersen("Moin! Die Leiter? Ja … Moment!", "Привет! Лестница? Да… минутку!"),
  {
    t: "reply",
    rule: ["familie/mein-2"],
    task: "Спросите вежливо: это ваша собака?",
    options: [
      ok("Ist das Ihr Hund?"),
      no("Ist das dein Hund?", "С фрау Петерсен вы на «вы»: Ihr, с большой буквы."),
      no("Ist das Ihre Hund?", "der Hund — мужского рода: Ihr Hund, без -e."),
    ],
  },
  petersen("Hund? Nein! Das ist kein Hund. Das ist … mein Handy!", "Собака? Нет! Это не собака. Это… мой мобильный!", ["der Hund"]),
  { t: "gap", rule: ["familie/kein-2"], task: "Что говорит фрау Петерсен?", text: "Das ist ___ Hund.", options: ["kein", "keine", "nicht"], answer: "kein", ru: "Это не собака." },
  {
    ...narr("«Handy» тявкает ещё раз. Frau Petersen краснеет и выдаёт вам {leiter}. Тайна под столом подождёт."),
    set: { petersen: 1 },
  },
  narr("Вы на крыше. Die Mutter смотрит строго: по-своему она права. Надо вежливо объяснить, чьё это Foto."),
  {
    t: "game",
    rule: ["familie/kein-2"],
    task: "Объясните чайке-матери: это не её фото.",
    hint: "Отрицание перед «чей» — nicht: nicht dein Foto. kein и dein вместе не ставят.",
    c: order(["Das", "ist", "nicht", "dein", "Foto."], ["dein", "Foto.", "nicht", "Das", "ist"]),
  },
  narr("Die Mutter не спорит: за кусок булки Элиф она уступает край. На нём подпись — и одно лицо, выклеванное начисто."),
  {
    t: "game",
    task: "Найдите на краю фото, кто ещё был в тот день и что праздновали.",
    hint: "Ищите людей и повод: сколько лет было клубу?",
    c: spot("Rand vom Foto", ["Opa, Oma, Peter (8)|und ein Freund", "Club Kiellinie|50 Jahre|1976"], ["und ein Freund", "50 Jahre"]),
  },
  narr("На краю молодой человек в фуражке держит вторую {dose} Farbe. Лица нет. {schild} писали, когда клубу было fünfzig."),
  dana("Ein Freund von Opa? Wer ist das?", "Друг дедушки? Кто это?", ["der Freund"]),
  {
    t: "pick",
    task: "Кто может знать друга Opa Hansen?",
    options: [
      ok("Тот, кто в клубе очень давно"),
      no("Нильс: это его дедушка", "Нильса в 1976 году ещё не было — это вы выяснили ещё у доски почёта."),
      no("Чайка: фото было у неё", "Чайка знает это фото изнутри гнезда. Людей она не помнит — только булки."),
    ],
  },
  { t: "type", task: "Запишите в блокнот: «Это друг дедушки».", answers: ["Das ist ein Freund von Opa.", "Er ist ein Freund von Opa."], ru: "Это друг дедушки." },
  {
    ...narr("Теперь на крыше клуба не одна {moewe}, а Familie: Mutter, Vater, drei Kinder. Элиф счастлива. Наглость, говорит Хауке, растёт семьями."),
    set: { gull: 1 },
  },
  {
    t: "game",
    task: "Птенцов трое, родителей двое. Сведите единственное и множественное число.",
    hint: "Во множественном артикль всегда die: das Kind — die Kinder.",
    c: pairs([["das Kind", "die Kinder"], ["die Mutter", "die Mütter"], ["der Vater", "die Väter"], ["die Familie", "die Familien"]]),
  },
  hauke("Elif, ist das deine Möwe?", "Элиф, это твоя чайка?"),
  elif("Nein! Sie ist nicht meine Möwe. Sie ist frei!", "Нет! Она не моя чайка. Она свободна!"),
  {
    t: "hear",
    task: "Что ответила Элиф?",
    voice: "Flo",
    de: "Nein! Sie ist nicht meine Möwe. Sie ist frei!",
    options: ["Чайка не её: она свободна", "Это её чайка", "Чайка — её подруга"],
    answer: "Чайка не её: она свободна",
  },
  {
    t: "clue",
    title: "Край фото",
    text: "На краю подпись: «Opa, Oma, Peter (8) und ein Freund · Club Kiellinie · 50 Jahre · 1976». Табличку писали к пятидесятилетию клуба. Друг в фуражке, лицо выклевано.",
  },
];

// Сцена 3 · развилка: кто помнит 1976 год. Броски главы и сцен — в журнале A1-STORYCRAFT.md.
const memories: SceneNode[] = [
  { t: "pic", src: "03-folder.jpg", alt: "Офис клуба: фрау Петерсен листает старую папку «1976», из-под стола торчит хвост собаки; в дверях Йенсен с кружкой уходит" },
  narr("Кто в клубе помнит 1976 год? Первым мимо проходит Йенсен. Вы показываете ему край от Foto."),
  jensen("Moin.", "Привет."),
  narr("Йенсен смотрит на фуражку дольше, чем на что-либо за три дня. Потом уходит. Кружку с чаем он забыл на перилах."),
  {
    t: "pick",
    task: "Что значит это Moin?",
    options: [
      ok("Разговор окончен — по-северному"),
      no("Он приглашает вас на чай", "Чай он оставил на перилах, а вас не позвал."),
      no("Он никогда не видел этого фото", "Тогда бы он не смотрел на него так долго."),
    ],
  },
  hauke("Frau Petersen hat alle Namen. Und Mateo hat das Rezept!", "У фрау Петерсен все имена. А у Матео — рецепт!"),
  {
    t: "go",
    task: "Кого расспросить?",
    next: "Дальше по делу",
    branches: [
      {
        label: "Папка «1976»",
        icon: "🗂️",
        nodes: [
          petersen("Fünfzig Jahre? Ich bin fünfundfünfzig!", "Пятьдесят лет назад? Мне пятьдесят пять!"),
          narr("Фрау Петерсен достаёт папку «1976». На каждого члена клуба — карточка с графой Familienstand."),
          petersen("Heinrich Hansen: verheiratet, ein Sohn. Seine Frau ist Hilde.", "Хайнрих Хансен: женат, один сын. Его жена — Хильде.", ["verheiratet", "der Sohn"]),
          {
            t: "game",
            task: "Найдите на карточке Opa его жену и сына.",
            hint: "Frau — жена, Sohn — сын.",
            c: spot("Karte: Heinrich Hansen", ["Name: Heinrich Hansen|Familienstand: verheiratet", "Frau: Hilde Hansen|Sohn: Peter, acht Jahre", "Hobby: Segeln|Schild MOIN: Farbe und Pinsel"], ["Frau: Hilde Hansen", "Sohn: Peter, acht Jahre"]),
          },
          { t: "gap", rule: ["familie/wessen-1"], task: "Подпишите в блокноте: кто Хильде для Opa?", text: "Hilde ist ___ Frau.", options: ["seine", "sein", "ihre"], answer: "seine", ru: "Хильде — его жена." },
          narr("Следующий кармашек в папке пуст: карточку кто-то вынул. На пластике круглый коричневый след — как от кружки с чаем."),
          { t: "type", task: "Запишите: Opa женат.", answers: ["Opa ist verheiratet.", "Heinrich Hansen ist verheiratet.", "Er ist verheiratet."], ru: "Дедушка женат." },
          petersen("Ich habe auch ein Foto. Das ist meine Tochter!", "У меня тоже есть фото. Это моя дочь!", ["die Tochter"]),
          { t: "gap", rule: ["familie/mein-2"], task: "Что говорит фрау Петерсен о своём фото?", text: "Das ist ___ Tochter!", options: ["meine", "mein", "ihre"], answer: "meine", ru: "Это моя дочь!" },
          { t: "clue", title: "Папка «1976»", text: "Heinrich Hansen: verheiratet, жена Hilde, сын Peter. Карточку следующего члена клуба кто-то вынул; на кармашке круглый след от кружки." },
        ],
      },
      {
        label: "Кухня Матео",
        icon: "🍰",
        nodes: [
          narr("На кухне пахнет маслом и сахаром. Матео держит старую карточку: {rezept} Butterkuchen, почерк Oma Hansen."),
          mateo("Das ist Oma Hansens Rezept. Ihr Kuchen ist super. Mein Kuchen ist … auch super!", "Это рецепт бабушки Хансен. Её пирог супер. Мой пирог… тоже супер!"),
          {
            t: "hear",
            task: "Чей пирог, по словам Матео, супер?",
            voice: "Reed",
            de: "Das ist Oma Hansens Rezept. Ihr Kuchen ist super. Mein Kuchen ist … auch super!",
            options: ["и её, и его", "только её", "только его"],
            answer: "и её, и его",
          },
          narr("На краю стола лежит бланк из офиса: «Kuchen für hundert». Матео быстро накрывает его полотенцем."),
          mateo("Für hundert? Nein, nein. Das ist kein Kuchen. Das ist … Brot!", "На сто человек? Нет-нет. Это не пирог. Это… хлеб!"),
          {
            t: "reply",
            rule: ["familie/kein-2"],
            task: "Скажите Матео с улыбкой: это не хлеб.",
            options: [
              ok("Das ist kein Brot."),
              no("Das ist nicht Brot.", "Перед существительным без артикля отрицание — kein: kein Brot."),
              no("Das ist keine Brot.", "das Brot — среднего рода: kein, без -e."),
            ],
          },
          { t: "game", task: "Соберите по буквам, что написано на карточке рецепта.", hint: HINT_SPELL, c: letters(["die Oma", "der Kuchen", "die Familie"]) },
          { t: "gap", rule: ["familie/mein-2"], task: "Матео хвалит себя. Вставьте слово.", text: "___ Kuchen ist auch super!", options: ["Mein", "Meine", "Meinen"], answer: "Mein", ru: "Мой пирог тоже супер!" },
          { t: "clue", title: "Рецепт Oma Hansen", text: "Матео печёт Butterkuchen по рецепту Oma Hansen и прячет бланк «Kuchen für hundert». Уверяет, что это хлеб." },
        ],
      },
      {
        label: "Очки Нильса",
        icon: "👓",
        optional: true,
        nodes: [
          narr("Из-под двери 12 выезжает записка: «Meine Brille ist weg!!! Bitte!!!» Без {brille} Нильс не видит ни фото, ни экран."),
          {
            t: "look",
            task: "Поищите в коридоре гостевых комнат.",
            items: [
              { icon: "👓", de: "die Brille", ru: "очки", note: "Круглые очки Нильса — на подоконнике, рядом с крошками. Чайки их не взяли: не блестят.", key: true },
              { icon: "🎒", de: "der Rucksack", ru: "рюкзак", note: "Рюкзак Греты у двери. Тяжёлый и молчаливый, как хозяйка." },
              { icon: "🗝️", de: "der Schlüssel", ru: "ключ", note: "Ключ от комнаты 12 висит на гвоздике. Брать чужое детектив не станет." },
            ],
          },
          {
            t: "reply",
            rule: ["familie/mein-2"],
            task: "Подсуньте очки под дверь с запиской.",
            options: [
              ok("Ist das deine Brille?"),
              no("Ist das dein Brille?", "die Brille — женского рода: deine."),
              no("Ist das ihre Brille?", "ihre — «её». Очки Нильса, а вы с ним на «ты»: deine."),
            ],
          },
          { ...narr("Из-под двери: «Danke!!! Meine Brille!!! Jetzt sehe ich alles!!!» Нильс впервые пишет без опечаток."), set: { nils: 1 } },
        ],
      },
      {
        label: "Покормить правильно",
        icon: "🐟",
        optional: true,
        nodes: [
          elif("Kein Brot für Möwen, bitte!", "Никакого хлеба чайкам, пожалуйста!"),
          narr("Элиф раздаёт листовки: чем кормить Möwen, чтобы они не воровали. Kein Brot, kein Kuchen."),
          {
            t: "game",
            task: "Разложите карточки: что чайкам можно, а что нельзя.",
            hint: "Чайка — морская птица. Ей нужно то, что живёт в море.",
            c: sort([["ja", "Можно"], ["nein", "Нельзя"]], [
              ["fish", "маленькая рыба", "ja", "🐟"],
              ["crab", "маленький краб", "ja", "🦀"],
              ["brot", "das Brot", "nein", "🍞"],
              ["kuchen", "der Kuchen", "nein", "🍰"],
              ["fries", "картошка фри", "nein", "🍟"],
            ]),
          },
          { ...narr("Die Möwen на крыше читают листовки с презрением. Но воровать стали меньше."), set: { gull: -2 } },
        ],
      },
    ],
  },
  narr("Двое помнят 1976 год, но ничего не объясняют. Дана раскладывает слова дня по ящикам Йенсена: der, die, das."),
  { t: "game", task: "Разложите слова по ящикам der, die и das.", hint: HINT_DOCK, c: docks(["der Opa", "die Oma", "der Sohn", "die Tochter", "das Kind", "das Mädchen", "der Hund", "die Familie"]) },
  dana("Opa, Oma, ein Sohn, ein Freund … und das Schild.", "Дедушка, бабушка, сын, друг… и табличка."),
  {
    t: "pick",
    task: "Что объединяет всех на фото?",
    options: [
      ok("Они вместе писали табличку к пятидесятилетию клуба"),
      no("Они все родственники", "Друг в фуражке — не родственник. Он ein Freund."),
      no("Они все повара", "Пирог пекла Oma Hansen. Остальные держали кисть и банки."),
    ],
  },
  {
    t: "clue",
    title: "Кто помнит 1976",
    text: "Йенсен долго смотрел на фуражку на фото и ушёл со словом Moin. Карточку друга из папки «1976» кто-то вынул. Матео прячет заказ «Kuchen für hundert».",
  },
];

// Интерлюдия глазами Йенсена. Бросок: смена точки зрения · Йенсен · отказаться · der Gast · 11.
const jensenPov: SceneNode[] = [
  { t: "pic", src: "03-jensen.jpg", alt: "Вечер у домика гавани: Йенсен с кружкой чая, рядом семья туристов с фотоаппаратом — мама, папа, мальчик и девочка" },
  narr("Тем временем у домика гавани. Йенсен пьёт чай. К нему подходят Gäste: Mutter, Vater, ein Junge und ein Mädchen."),
  narr("Папа говорит медленно и громко, как говорят с моряками: «Moin! Sind Sie der Kapitän? Ist das Ihr Boot?»"),
  {
    t: "pick",
    task: "Что ответит Йенсен?",
    options: [
      ok("Moin."),
      no("Ja, das ist mein Boot.", "Пять слов. Столько Йенсен говорит за неделю."),
      no("Nein, ich bin kein Kapitän.", "Тоже слишком длинно. И потом — кто знает."),
    ],
  },
  jensen("Moin.", "Привет."),
  narr("Мама показывает на детей: «Das ist unser Sohn, und das ist unsere Tochter. Ein Foto, bitte?»"),
  {
    t: "game",
    rule: ["familie/mein-2"],
    task: "Мальчик тоже хочет представить сестру. Соберите его фразу.",
    hint: "die Schwester — женского рода: meine.",
    c: order(["Das", "ist", "meine", "Schwester."], ["Schwester.", "meine", "Das", "ist"]),
  },
  { t: "gap", rule: ["familie/mein-2"], task: "Как мама представила девочку?", text: "Das ist unsere ___.", options: ["Tochter", "Sohn", "Vater"], answer: "Tochter", ru: "Это наша дочь." },
  narr("Ein Foto? Йенсен отказывается тем же словом. Die Gäste уходят довольные: настоящий северный капитан, как в путеводителе."),
  narr("Когда они уходят, Йенсен открывает ящик стола. Там то же Foto, 1976. Целое, с правым краем."),
  narr("На краю молодой человек в фуражке держит {dose} Farbe и улыбается. Йенсен трогает свою фуражку и закрывает ящик."),
  {
    t: "game",
    task: "Верно или нет? Вы видели больше, чем детектив.",
    c: verdict(["Richtig", "Falsch"], [
      ["У Йенсена есть такое же фото", true, "В ящике стола — то же фото 1976 года."],
      ["На его фото тоже нет правого края", false, "Его фото целое: с краем и с молодым человеком в фуражке."],
      ["Йенсен сфотографировался с гостями", false, "Он ответил Moin — и это был отказ."],
    ]),
  },
  jensen("Moin.", "Привет."),
  narr("Это он сказал Foto. Или {moewe} на перилах. {moewe} решила, что ей, и ждёт чая."),
];

// Сцена 4 · поворот. Бросок: новый человек · Элиф · неверно перевести · die Freundin · 7.
// Бросок главы: за кадром · Петерсен · пообещать · die Tochter · 18.
const poster: SceneNode[] = [
  { t: "pic", src: "03-poster.jpg", alt: "Элиф и девочка лет десяти с биноклем держат школьный плакат «Meine Familie»; из рюкзака девочки выглядывает маленький рыжий пёс; Хауке удивлённо поднял брови" },
  narr("После обеда Элиф приводит в клуб ein Mädchen, zehn Jahre alt, с рулоном бумаги и биноклем, как у самой Элиф."),
  elif("Das ist Lotte. Sie ist meine Freundin!", "Это Лотта. Она моя подруга!", ["die Freundin"]),
  hauke("Freundin? Elif hat eine Freundin?", "Подруга? У Элиф есть девушка?"),
  narr("Freundin — и подруга, и девушка. Элиф краснеет: она ведёт для школьников Möwen-Kurs, и Lotte — её лучшая ученица."),
  {
    t: "pick",
    task: "Кто Лотта для Элиф?",
    options: [
      ok("Подруга: они вместе наблюдают чаек"),
      no("Девушка Элиф", "Freundin бывает и «девушка», но не в десять лет. Здесь — подруга."),
      no("Дочь Элиф", "Дочь — die Tochter. А Лотта — подруга по клубу чаек."),
    ],
  },
  narr("Лотта стесняется и молчит. Зато разворачивает школьный {plakat} «Meine Familie». Элиф читает вслух."),
  elif("Das ist meine Mutter. Sie ist im Club. Und das ist mein Hund Krümel.", "Это моя мама. Она в клубе. А это мой пёс Крюмель."),
  {
    t: "look",
    task: "Рассмотрите плакат Лотты.",
    items: [
      { icon: "👧", de: "das Mädchen", ru: "девочка", note: "Лотта нарисовала себя с биноклем. Подпись: «Ich, Lotte, zehn Jahre».", key: true },
      { icon: "🐕", de: "der Hund", ru: "собака", note: "Рыжий пёс с подписью Krümel. Тот самый «мобильный» из-под стола в офисе.", key: true },
      { icon: "🐈", de: "die Katze", ru: "кошка", note: "Кошка на плакате зачёркнута. Krümel, видимо, был против." },
    ],
  },
  narr("Krümel — «крошка». Утром Frau Petersen прятала его под столом: Hunde в клуб нельзя. Die Mutter на {plakat} — это она."),
  { t: "gap", rule: ["familie/wessen-1"], task: "Подпишите в блокноте: чья дочь Лотта?", text: "Lotte ist ___ Tochter.", options: ["ihre", "seine", "deine"], answer: "ihre", ru: "Лотта — её дочь (фрау Петерсен)." },
  {
    t: "game",
    task: "Разведите героев по семьям.",
    hint: "Загляните в блокнот: фото 1976 года и плакат Лотты.",
    c: sort([["petersen", "Familie Petersen"], ["hansen", "Familie Hansen"]], [
      ["lotte", "Lotte, zehn Jahre", "petersen", "👧"],
      ["kruemel", "Krümel, der Hund", "petersen", "🐕"],
      ["peter", "Peter, acht Jahre (1976)", "hansen", "👦"],
      ["hilde", "Oma Hilde und ihr Kuchen", "hansen", "🍰"],
      ["kerstin", "Kerstin, die Mutter", "petersen", "🗂️"],
      ["enkel", "Nils und Greta, die Enkel", "hansen", "👫"],
    ]),
  },
  narr("Лотта молча протягивает вам фломастер: на {plakat} не хватает подписей. Она диктует по буквам — шёпотом."),
  { t: "game", task: "Подпишите плакат по буквам.", hint: HINT_SPELL, c: letters(["die Tochter", "die Mutter", "der Hund"]) },
  elif("Kieler Woche: Der Club hat Geburtstag. Meine Freunde und ich sind da. Zwanzig Kinder!", "Kieler Woche: у клуба день рождения. Мои друзья и я будем там. Двадцать детей!"),
  {
    t: "hear",
    task: "Сколько детей придёт на праздник клуба?",
    voice: "Flo",
    de: "Kieler Woche: Der Club hat Geburtstag. Meine Freunde und ich sind da. Zwanzig Kinder!",
    options: ["двадцать", "двенадцать", "два"],
    answer: "двадцать",
  },
  narr("Фрау Петерсен обещала Lotte: на старте весь класс коснётся {schild} MOIN. Ohne MOIN kein Start — и без таблички нет обещания."),
  petersen("Lotte! Krümel! Psst! Hunde – nein! Nicht im Büro!", "Лотта! Крюмель! Тсс! Собаки — нет! Не в офисе!"),
  {
    t: "reply",
    rule: ["familie/kein-2"],
    task: "Скажите фрау Петерсен, что это не ваша собака — и вы ничего не видели.",
    options: [
      ok("Das ist nicht mein Hund."),
      no("Das ist kein mein Hund.", "kein и mein вместе не ставят: nicht mein Hund."),
      no("Das ist nicht meine Hund.", "der Hund — мужского рода: mein, без -e."),
    ],
  },
  {
    t: "pick",
    task: "Что это значит для дела?",
    options: [
      ok("Табличку ждут двадцать детей — найти её нужно не только ради старта"),
      no("Праздник отменят: собакам в клуб нельзя", "Krümel и праздник никак не связаны. Хотя Krümel — с крошками."),
      no("Лотта знает, где табличка", "Лотта рисует табличку на плакате, потому что ждёт её, а не прячет."),
    ],
  },
  elif("Lotte fragt: Hast du Geschwister?", "Лотта спрашивает: у тебя есть братья или сёстры?"),
  {
    t: "type",
    rule: ["familie/check-3"],
    task: "Ответьте Лотте о себе: есть ли у вас братья или сёстры.",
    answers: [
      "Nein, ich habe keine Geschwister.", "Ja, ich habe eine Schwester.", "Ja, ich habe einen Bruder.",
      "Ja, ich habe zwei Schwestern.", "Ja, ich habe zwei Brüder.", "Ja, ich habe drei Schwestern.", "Ja, ich habe drei Brüder.",
      "Ja, ich habe einen Bruder und eine Schwester.", "Ja, ich habe zwei Geschwister.", "Ja, ich habe drei Geschwister.",
    ],
    ru: "Нет, у меня нет братьев и сестёр. / Да, у меня есть сестра…",
  },
  dana("Lotte hat keine Geschwister. Aber sie hat Krümel!", "У Лотты нет братьев и сестёр. Зато у неё есть Крюмель!"),
  { t: "gap", rule: ["familie/kein-2"], task: "Что сказала Дана о Лотте?", text: "Lotte hat ___ Geschwister.", options: ["keine", "kein", "nicht"], answer: "keine", ru: "У Лотты нет братьев и сестёр." },
  narr("Лотта кивает и устраивает вам проверку. Тихо, но строго, как ihre Mutter."),
  {
    t: "game",
    task: "В каждой стопке одно лишнее слово.",
    hint: HINT_ODD,
    c: odd([
      [["der Bruder", "die Schwester", "die Geschwister", "der Hund"], "der Hund", "Hund — собака, остальное — братья и сёстры."],
      [["der Onkel", "die Tante", "die Cousine", "die Katze"], "die Katze", "Katze — кошка, остальные — родственники."],
      [["die Mutter", "der Vater", "die Eltern", "die Freundin"], "die Freundin", "Freundin — подруга, остальные — родители."],
    ]),
  },
  {
    t: "game",
    task: "На плакате три трудных слова. Повторите их вслух за Элиф.",
    hint: HINT_SAY,
    c: speak(["die Geschwister", "die Großeltern", "die Cousine"]),
  },
  {
    t: "clue",
    title: "Плакат Лотты",
    text: "Лотта, дочь фрау Петерсен, и её пёс Krümel. Фрау Петерсен обещала: на старте Kieler Woche класс Лотты — двадцать детей — коснётся таблички MOIN.",
  },
];

// Сцена 5 · кульминация. Бросок: часы тикают · Матео · подарить · die Enkelin · 16.
const cake: SceneNode[] = [
  { t: "pic", src: "03-cake.jpg", alt: "Вечер в клубе: Матео на стуле поднимает масляный пирог, весь клуб смотрит на Грету; Нильс в красной куртке и круглых очках; Грета с салфеткой" },
  narr("Вечером в клубе пахнет пирогом. Матео испёк {butterkuchen} по рецепту Oma Hansen и ищет, кому вручить первый кусок."),
  narr("Nils und Greta впервые выходят из {gaestezimmer} к ужину. Матео встаёт на стул, и разговоры стихают."),
  mateo("Moin, Club! Das ist Oma Hansens Kuchen. Und das ist ihre Enkelin: Greta!", "Привет, клуб! Это пирог бабушки Хансен. А это её внучка — Грета!", ["die Enkelin"]),
  {
    t: "hear",
    task: "Что объявил Матео?",
    voice: "Reed",
    de: "Moin, Club! Das ist Oma Hansens Kuchen. Und das ist ihre Enkelin: Greta!",
    options: ["Грета — внучка бабушки Хансен", "Грета испекла пирог", "Грета — сестра Матео"],
    answer: "Грета — внучка бабушки Хансен",
  },
  narr("Получилось громче, чем Матео хотел. Весь клуб смотрит на Грету: теперь все знают, чья Enkelin живёт в Zimmer zwölf."),
  dana("Greta ist die Enkelin. Nils ist der Enkel. Und Peter ist ihr Vater.", "Грета — внучка. Нильс — внук. А Петер — их отец.", ["der Enkel"]),
  {
    t: "game",
    task: "Верно или нет?",
    c: verdict(["Richtig", "Falsch"], [
      ["Грета — внучка Heinrich Hansen", true, "Greta ist die Enkelin: её Opa писал табличку."],
      ["Нильс — сын Heinrich Hansen", false, "Нильс — внук: der Enkel. Сын — Peter, их отец."],
      ["Пирог испекла Грета", false, "Пирог испёк Матео по рецепту Oma Hansen."],
    ]),
  },
  petersen("Greta Hansen? Ihr Opa ist auf der Ehrentafel!", "Грета Хансен? Её дедушка — на доске почёта!"),
  {
    t: "reply",
    rule: ["familie/wessen-1"],
    task: "Подтвердите фрау Петерсен: да, это дедушка Греты.",
    options: [
      ok("Ja, das ist ihr Opa."),
      no("Ja, das ist sein Opa.", "sein — «его». Грета — она: ihr Opa."),
      no("Ja, das ist dein Opa.", "dein — «твой». Фрау Петерсен спрашивает не про своего дедушку."),
    ],
  },
  narr("Грета Kuchen не берёт. Она пишет на салфетке четыре слова и кладёт её рядом с тарелкой. Одно подчёркнуто дважды."),
  { t: "gap", rule: ["familie/mein-2"], task: "Что написала Грета?", text: "Das ist ___ Schild.", options: ["unser", "unsere", "euer"], answer: "unser", ru: "Это наша табличка." },
  hauke("Unser Schild? Greta hat das Schild! Ganz klar!", "Наша табличка? Табличка у Греты! Ясно как день!"),
  {
    t: "pick",
    task: "Что значит unser у Греты?",
    options: [
      ok("Возможно, «табличка нашей семьи»: её писал их Opa"),
      no("Грета признаётся, что взяла табличку", "Она пишет, чья табличка, а не где она. Признания тут нет."),
      no("Грета говорит от имени клуба", "Грета — гостья, а не член клуба. Её «мы» — семья Хансен."),
    ],
  },
  narr("Грета молча уходит с тарелкой пирога. За ней по полу тянется дорожка: {kruemel}, ещё и ещё."),
  {
    t: "look",
    task: "Осмотрите стол, от которого ушла Грета.",
    items: [
      { icon: "🍰", de: "der Butterkuchen", ru: "масляный пирог", note: "Кусок для Греты так и лежит. На краю тарелки — тёмно-синий след пальца.", key: true },
      { icon: "🍞", de: "der Krümel", ru: "крошка", note: "Крошки ведут от стола к двери. Ровно, как по линейке.", key: true },
      { icon: "🧑‍🤝‍🧑", de: "der Gast", ru: "гость", note: "Все Gäste смотрят на дверь. Матео всё ещё стоит на стуле." },
    ],
  },
  hauke("Krümel! Nils und Greta – wie Hänsel und Gretel!", "Крошки! Нильс и Грета — как Гензель и Гретель!"),
  {
    ...narr("Дорожка ведёт к {tuer} и обрывается: снаружи её доедает Familie {moewe} с крыши. Сказка короткого пути не даёт."),
    set: { gull: 1 },
  },
  elif("Das ist nicht kriminell! Die Möwe hat Hunger.", "Это не преступление! Чайка голодная."),
  { t: "game", task: `Спасите слова, пока чайки не склевали дорожку! ${RACE}`, hint: HINT_RACE, c: race(["die Enkelin", "der Enkel", "die Tochter", "der Sohn", "die Eltern", "der Bruder"]) },
  mateo("Und mein Kuchen? Ist er gut?", "А мой пирог? Он хороший?"),
  {
    t: "reply",
    rule: ["familie/mein-2"],
    task: "Утешьте Матео.",
    options: [
      ok("Dein Kuchen ist super!"),
      no("Deine Kuchen ist super!", "der Kuchen — мужского рода: dein, без -e."),
      no("Ihr Kuchen ist super!", "Ihr — на «вы» или «её». С Матео вы на «ты»: dein."),
    ],
  },
  narr("Матео просит написать Нильсу: Greta он писать боится. Образец есть — его записка Дане."),
  {
    t: "game",
    rule: ["familie/wessen-2"],
    task: "Напишите Нильсу записку от Матео.",
    hint: HINT_LETTER,
    c: letter(
      "Nils",
      ["Liebe Dana,", "der Kuchen ist für deine Familie. Deine Mutter ist super.", "Hat dein Bruder Zeit?", "Viele Grüße", "Mateo"],
      [
        an("Lieber", "Nils"),
        ["Kuchen → für eure Familie", "Der Kuchen ist für eure Familie.", "der Kuchen ist für eure Familie."],
        ["Oma Hansen → super", "Eure Oma ist super.", "eure Oma ist super."],
        ["Frage → Greta, Zeit?", "Hat Greta Zeit?", "Hat deine Schwester Zeit?"],
        gruss("Mateo"),
      ],
    ),
  },
  {
    t: "when",
    if: [{ q: "nils", min: 1 }],
    then: [narr("Нильс отвечает сразу и без опечаток — очки на месте: «Danke, Mateo!!! Greta hat keine Zeit!!! Aber morgen: Café!!!»")],
    else: [narr("Нильс отвечает сразу, но вслепую: «Dnake, Mtaeo!!! Grtea hat kiene Zeit!!! Morgne: Cfaé!!!» Очки он так и не нашёл.")],
  },
  { t: "type", rule: ["familie/mein-2"], task: "Запишите в блокнот слова Греты с салфетки.", answers: ["Das ist unser Schild.", "Das ist unser Schild!"], ru: "Это наша табличка." },
  {
    t: "game",
    rule: ["familie/wessen-1", "familie/mein-3"],
    task: "Нильс присылает альбом Opa. Он закрыт фразой-паролем: поверните диски.",
    hint: HINT_LOCK,
    c: lock([
      ["Это её внучка.", [["Das", "Der", "Die"], ["ist", "sind", "hat"], ["ihre Enkelin.", "ihr Enkelin.", "seine Enkelin."]]],
      ["Это наш пирог.", [["Das", "Die", "Der"], ["ist", "sind", "bin"], ["unser Kuchen.", "unsere Kuchen.", "euer Kuchen."]]],
      ["Это мои внуки.", [["Das", "Der", "Die"], ["sind", "ist", "seid"], ["meine Enkel.", "mein Enkel.", "meine Enkels."]]],
    ]),
  },
  { t: "game", task: "Слова дня перемешались. Откройте пары: немецкое слово и перевод.", c: memory(["pinsel", "rezept", "butterkuchen", "nest", "leiter", "plakat"]) },
  {
    t: "clue",
    title: "Unser Schild",
    text: "Грета — внучка Heinrich Hansen. На салфетке: «Das ist unser Schild». Дорожку крошек к выходу склевали чайки. Завтра Грета будет в кафе.",
  },
];

// Сцена 6 · эпилог и крючок. Бросок: за кадром · Йенсен · отпраздновать · der Opa · 20 (весь клуб).
const ninety: SceneNode[] = [
  { t: "pic", src: "03-card.jpg", alt: "Поздний вечер в клубе: на экране старого мобильного — пожилой мужчина с открыткой MOIN, покрытой подписями; Хауке и Дана смотрят, Йенсен с кружкой в углу" },
  narr("Поздний вечер. Старый мобильный Нильса пищит: {nachricht}. «Opa hat heute Geburtstag!!! Er ist neunzig!!!»"),
  narr("К сообщению фото: Opa Hansen, седой и весёлый, держит открытку из Киля."),
  { t: "gap", rule: ["zahlen/zehner-1"], task: "Сколько лет Opa?", text: "Opa ist heute ___ Jahre alt.", options: ["neunzig", "neunzehn", "neun"], answer: "neunzig", ru: "Дедушке сегодня девяносто лет." },
  hauke("Neunzig! Alles Gute, Opa Hansen!", "Девяносто! С днём рождения, дедушка Хансен!"),
  narr("Хауке увеличивает Foto. {karte} знакомая: одно слово, крупно — MOIN. И подписи: Namen, Namen, Namen."),
  {
    t: "look",
    task: "Рассмотрите открытку на фото.",
    items: [
      { icon: "💌", de: "die Karte", ru: "открытка", note: "Одно слово — MOIN — печатными буквами. Больше ничего: ни «поздравляю», ни «Alles Gute».", key: true },
      { icon: "✍️", de: "der Name", ru: "имя", note: "Подписей около ста: Hauke, Petersen, Mateo… Нет только подписи Jensen. Или она и есть это MOIN?", key: true },
      { icon: "🎂", de: "der Geburtstag", ru: "день рождения", note: "На обороте нарисован торт с цифрой 90." },
    ],
  },
  hauke("Das ist unsere Karte! Hundert Namen. Und ein Wort: Moin.", "Это наша открытка! Сто имён. И одно слово: Moin."),
  {
    t: "hear",
    task: "Сколько имён на открытке?",
    voice: "Rocko",
    de: "Das ist unsere Karte! Hundert Namen. Und ein Wort: Moin.",
    options: ["сто", "десять", "одно"],
    answer: "сто",
  },
  {
    t: "game",
    task: "Позвоните Нильсу, чтобы поздравить Opa. Номер — в блокноте.",
    hint: "null, eins, fünf, eins – zweiunddreißig – vierundfünfzig – neunzehn.",
    c: { kind: "code", length: 10, answer: "0151325419" },
  },
  {
    t: "say",
    who: "Nils",
    voice: "Eddy",
    de: "Hallo! Hier ist Nils, Nils Hansen aus Hamburg! Ich habe jetzt Pause. Bitte Ihre Nummer und Ihre Frage! Tschüss! Nein: Auf Wiederhören!",
    ru: "Привет! Это Нильс, Нильс Хансен из Гамбурга! У меня сейчас перерыв. Пожалуйста, ваш номер и ваш вопрос! Пока! Нет: до свидания!",
  },
  { t: "type", task: "Автоответчик, конечно. Оставьте поздравление для Opa.", answers: ["Alles Gute, Opa!", "Alles Gute, Opa Hansen!", "Alles Gute zum Geburtstag!", "Alles Gute, Opa! Moin!"], ru: "С днём рождения, дедушка!" },
  narr("Вчера Йенсен обошёл с {karte} весь Club. Ничего не объяснял — говорил Moin и протягивал ручку. Подписались все."),
  dana("Herr Jensen und Opa Hansen? Freunde?", "Господин Йенсен и дедушка Хансен? Друзья?"),
  {
    t: "pick",
    task: "Почему Йенсен поздравил Opa Hansen?",
    options: [
      ok("Он давно знает Opa Hansen"),
      no("Он поздравляет всех подряд", "Хауке он за три года не поздравил ни разу."),
      no("Открытку придумала фрау Петерсен", "С открыткой ходил Йенсен. Фрау Петерсен только поставила печать."),
    ],
  },
  jensen("Moin.", "Привет."),
  {
    t: "reply",
    rule: ["familie/mein-2"],
    task: "Йенсен поднимает кружку. Спросите его прямо: это ваш друг?",
    options: [
      ok("Ist das Ihr Freund?"),
      no("Ist das dein Freund?", "С Йенсеном вы на «вы»: Ihr Freund."),
      no("Ist das Ihre Freund?", "der Freund — мужского рода: Ihr, без -e."),
    ],
  },
  jensen("Moin.", "Привет."),
  narr("Йенсен отвечает, как всегда, и уходит с чаем на причал. Вопрос висит в воздухе, как {moewe} над водой."),
  narr("Хауке устраивает репетицию экзамена. Тема дня — Familie."),
  {
    t: "game",
    task: "Поговорите о семье, как на экзамене: сначала сами, потом сверьтесь с образцом.",
    hint: HINT_ORAL,
    c: oral([
      oralSay(2, ASK, "Thema: Familie · Wort: Kinder", "Hast du Kinder?", "У тебя есть дети?", "Hast …?"),
      oralReply(2, ANSWER, "Haben Sie Geschwister?", "Ja, ich habe eine Schwester.", "Да, у меня есть сестра."),
      oralSay(1, "Покажите своё фото и расскажите, кто на нём.", "Familie · Foto", "Das ist meine Mutter. Das ist mein Vater. Das sind meine Eltern.", "Это моя мама. Это мой папа. Это мои родители."),
    ]),
  },
  narr("Ещё сообщение. Нильс пишет медленно — видимо, под диктовку Opa."),
  {
    t: "game",
    rule: ["kennenlernen/wortstellung-3"],
    task: "Соберите вопрос Opa.",
    hint: "Глагол в вопросе «да или нет» — на первом месте.",
    c: order(["Ist", "unser", "Schild", "noch", "da?"], ["Schild", "da?", "unser", "Ist", "noch"]),
  },
  narr("Opa спрашивает про своё {schild}. Честно ответить нельзя: где табличка, вы и сами не знаете. Но и врать девяностолетнему нельзя."),
  { t: "type", task: "Ответьте Opa правду — но не всю: «Табличка в Киле».", answers: ["Das Schild ist in Kiel.", "Unser Schild ist in Kiel.", "Das Schild ist in Kiel!"], ru: "Табличка в Киле." },
  narr("Правда, но не вся. Нильс отвечает: «Danke!!! Opa sagt: Moin!!!» И ещё: «Greta ist morgen im Café!!!»"),
  {
    t: "game",
    task: "Сведите возраст дня.",
    c: pairs([["Opa Hansen", "neunzig Jahre alt"], ["Lotte", "zehn Jahre alt"], ["Der Club", "hundert Jahre alt"], ["Das Schild", "fünfzig Jahre alt"]]),
  },
  elif("Gute Nacht, Möwen! Gute Nacht, Familie!", "Спокойной ночи, чайки! Спокойной ночи, семья!"),
  narr("На крыше пищат drei Kinder. Хауке достаёт карточки: лото перед сном, слово за словом."),
  { t: "game", task: "Лото на ночь: послушайте слово и закройте его на карточке.", hint: HINT_HEAR, c: bingo(["der Opa", "die Oma", "der Vater", "die Mutter", "der Sohn", "die Tochter", "der Bruder", "die Schwester", "das Kind"]) },
  narr("Вы закрываете блокнот: «День третий. Найдено: фото Opa, край с ein Freund, {plakat} Лотты и unser Schild». Noch neun Tage."),
  {
    t: "clue",
    title: "Открытка из Киля",
    text: "Opa Hansen сегодня девяносто. Весь клуб подписал ему открытку со словом MOIN — с ней ходил Йенсен. Opa спрашивает: «Ist unser Schild noch da?» Завтра Грета будет в кафе.",
  },
];

const play = (nodes: SceneNode[]) => ({ kind: "play" as const, nodes });
const HINT = "Ошибка ничего не стоит: собеседник отреагирует, и можно выбрать снова.";

export const sceneChapter3: Episode = {
  id: "moin-neu-3",
  title: "Unser Schild",
  day: { de: "Noch zehn Tage", ru: "ещё десять дней до Kieler Woche" },
  place: "Kiellinie · клуб и его крыша",
  topic: "Семья",
  grammar: "mein, dein, sein, ihr, unser, euer · kein · множественное число",
  beats: [
    {
      id: "03-s1",
      title: "Фото Opa",
      story: [],
      prompt: "Конверт на подставке, старое фото и пирог, который узнал Матео.",
      hint: HINT,
      success: "Табличку в 1976 году писал дедушка Нильса и Греты. Правый край фото унесла чайка.",
      challenge: play(photo),
    },
    {
      id: "03-s2",
      title: "Семья на крыше",
      story: [],
      prompt: "Гнездо на крыше, лестница фрау Петерсен и край фото.",
      hint: "der / das → mein, die → meine: mein Hund, meine Familie.",
      success: "На краю — «ein Freund» в фуражке. Табличку писали к пятидесятилетию клуба.",
      challenge: play(roof),
    },
    {
      id: "03-s3",
      title: "Кто помнит 1976",
      story: [],
      prompt: "Йенсен, папка «1976» и кухня Матео.",
      hint: "sein — его, ihr — её: seine Frau, ihr Kuchen.",
      success: "Карточку друга кто-то вынул, Матео прячет заказ, а Йенсен ответил одним словом.",
      challenge: play(memories),
    },
    {
      id: "03-i1",
      title: "Глазами Йенсена",
      pov: "глазами Йенсена",
      story: [],
      prompt: "Интерлюдия: гости у домика гавани и ящик стола.",
      hint: "unser Sohn, unsere Tochter: окончание — по слову после unser.",
      success: "У Йенсена есть то же фото — целое. Детектив об этом пока не знает.",
      challenge: play(jensenPov),
    },
    {
      id: "03-s4",
      title: "Плакат Лотты",
      story: [],
      prompt: "Подруга Элиф, пёс под столом и обещание фрау Петерсен.",
      hint: "kein и mein вместе не ставят: Das ist nicht mein Hund.",
      success: "Табличку ждут на старте двадцать детей. Krümel больше не тайна.",
      challenge: play(poster),
    },
    {
      id: "03-s5",
      title: "Unser Schild",
      story: [],
      prompt: "Пирог для внучки, салфетка Греты и дорожка из крошек.",
      hint: "unser Opa, unsere Oma, unser Schild: -e только перед словом с die.",
      success: "Грета пишет: «Das ist unser Schild». Подозрение растёт.",
      challenge: play(cake),
    },
    {
      id: "03-s6",
      title: "Neunzig",
      story: [],
      prompt: "День рождения Opa, открытка из Киля и вопрос, на который нельзя ответить.",
      hint: "Ihr Freund — вежливо, dein Freund — на «ты».",
      success: "День третий закончен. Завтра — кафе. Noch neun Tage.",
      challenge: play(ninety),
    },
  ],
};
