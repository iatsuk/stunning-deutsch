import { docks, pairs, scene, write } from "../build.ts";
import type { Episode, SceneNode } from "../types.ts";

// Прототип главы 1 в формате сцен (A1-PLOT.md, «Формат сцен»). Сцена — разговор и осмотр
// места, в который вплетены действия; сюжет идёт через них, а не между отдельными играми.
// Немецкий — только из урока 1; новые слова уроков указаны в learn у реплики, где они звучат.

const narr = (text: string): SceneNode => ({ t: "narr", text });
const hauke = (de: string, ru: string, learn?: string[]): SceneNode => ({ t: "say", who: "Hauke", voice: "Rocko", de, ru, ...(learn ? { learn } : {}) });
const jensen = (de: string, ru: string): SceneNode => ({ t: "say", who: "Herr Jensen", voice: "Grandpa", de, ru });
const mateo = (de: string, ru: string, learn?: string[]): SceneNode => ({ t: "say", who: "Mateo", voice: "Reed", de, ru, ...(learn ? { learn } : {}) });
const elif = (de: string, ru: string, learn?: string[]): SceneNode => ({ t: "say", who: "Elif", voice: "Flo", de, ru, ...(learn ? { learn } : {}) });
const dana = (de: string, ru: string, learn?: string[]): SceneNode => ({ t: "say", who: "Dana", voice: "Anna", de, ru, ...(learn ? { learn } : {}) });
const ok = (text: string) => ({ text, ok: true as const });
const no = (text: string, react: string) => ({ text, react });
/** Откуда игрок родом — выбирает он сам; ловушка — предлог. */
const origin = (trap: string, react: string): SceneNode => ({
  t: "reply",
  task: "Скажите, откуда вы.",
  options: [ok("Ich komme aus Russland."), ok("Ich komme aus Kasachstan."), ok("Ich komme aus der Ukraine."), no(trap, react)],
});
const introduce = (task: string): SceneNode => ({
  t: "type",
  task,
  answers: ["Ich heiße *.", "Ich bin *."],
  ru: "Меня зовут … / Я …",
});

const arrival: SceneNode[] = [
  { t: "pic", src: "01-station.jpg", alt: "Хауке на кильском вокзале держит картонку с надписью MOIN и нарисованной лодкой; рядом чайка" },
  narr("Кильский вокзал, без десяти восемь. До Kieler Woche двенадцать дней. Вы приехали на месяц помогать в парусном клубе на набережной Kiellinie. По-немецки вы знаете одно слово: {moin}."),
  narr("У выхода стоит высокий парень в непромокаемой куртке. В руках картонка, на ней фломастером: MOIN! — и нарисованная лодка. Это Хауке, яхтсмен из клуба. Это он вас позвал."),
  hauke("Moin! Ich bin Hauke.", "Привет! Я Хауке.", ["Moin!"]),
  {
    t: "reply",
    task: "Поздоровайтесь с Хауке.",
    options: [
      ok("Moin, Hauke!"),
      no("Gute Nacht, Hauke!", "Хауке смотрит на часы: восемь утра. Gute Nacht говорят перед сном."),
      no("Tschüss, Hauke!", "Вы только приехали, а уже прощаетесь. Хауке на всякий случай крепче держит ваш чемодан."),
    ],
  },
  hauke("Wie heißt du?", "Как тебя зовут?", ["heißen", "Wie?"]),
  introduce("Представьтесь: Ich heiße … и ваше имя."),
  hauke("Super! Und woher kommst du?", "Отлично! А откуда ты?", ["Woher?", "kommen aus"]),
  origin("Ich komme in Russland.", "kommen aus — «быть родом из». С in говорят, где живут: wohnen in."),
  hauke("Und jetzt wohnst du hier, in Kiel!", "А теперь ты живёшь здесь, в Киле!", ["wohnen in"]),
  {
    t: "type",
    task: "Подтвердите по-немецки: «Да, я живу в Киле».",
    answers: ["Ja, ich wohne in Kiel.", "Ich wohne in Kiel.", "Ja, ich wohne jetzt in Kiel.", "Ich wohne jetzt in Kiel.", "Ja, ich wohne hier in Kiel."],
    ru: "Да, я живу в Киле.",
  },
  { t: "pic", src: "01-promenade.jpg", alt: "Набережная Kiellinie утром: Хауке с чемоданом, бегун, велосипедистка, рыбак и продавщица в киоске машут руками" },
  narr("Хауке подхватывает ваш чемодан, как пакет с булочками, и ведёт к воде. По дороге с вами здоровается половина Киля, и каждый по-своему. Первым мимо пробегает Ларс, студент из парусной команды."),
  { t: "say", who: "Lars", voice: "Eddy", de: "Guten Morgen!", ru: "Доброе утро!", learn: ["Guten Morgen!"] },
  {
    t: "reply",
    task: "Ответьте Ларсу.",
    options: [
      ok("Guten Morgen!"),
      no("Guten Abend!", "Guten Abend говорят вечером. А сейчас утро: Ларс даже ещё не вспотел."),
      no("Auf Wiedersehen!", "Это прощание. Ларс оборачивается на бегу: он ведь только поздоровался."),
    ],
  },
  narr("У киоска с рыбными булочками стоит Фрауке. Киоск открыт с пяти утра, и Фрауке знает всех. Теперь и вас."),
  { t: "say", who: "Frauke", voice: "Sandy", de: "Moin moin! Wie geht's?", ru: "Привет-привет! Как дела?", learn: ["Wie geht's?"] },
  narr("Хауке шепчет: — «Moin moin» — это уже болтовня. У нас на севере хватает одного Moin."),
  {
    t: "reply",
    task: "Ответьте Фрауке.",
    options: [
      ok("Danke, gut!"),
      no("Ich heiße Frauke.", "Это её имя, а не ваше. И спрашивала она, как дела."),
      no("Gute Nacht!", "Фрауке работает с пяти утра, но до ночи ей ещё далеко."),
    ],
  },
  narr("Фрауке кивает на очередь у киоска: она жарит рыбу и не успевает здороваться. Поможете? Разумеется, по-немецки."),
  {
    t: "go",
    task: "Помочь Фрауке у киоска?",
    next: "Дальше к клубу",
    branches: [
      {
        label: "Поздороваться с покупателями Фрауке",
        icon: "🐟",
        optional: true,
        nodes: [
          narr("Первый покупатель — турист с огромным рюкзаком и картой Киля вверх ногами."),
          { t: "say", who: "Турист", voice: "Reed", de: "Guten Tag!", ru: "Добрый день!", learn: ["Guten Tag!"] },
          { t: "reply", task: "Ответьте туристу.", options: [ok("Guten Tag!"), ok("Moin!"), no("Gute Nacht!", "Турист только проснулся: спать ему рано.")] },
          narr("Следом подходит дама в тёмных очках: она только что прилетела и живёт ещё по чужому времени."),
          { t: "say", who: "Дама", voice: "Anna", de: "Guten Abend!", ru: "Добрый вечер!", learn: ["Guten Abend!"] },
          { t: "reply", task: "Сейчас утро. Ответьте вежливо — и по времени.", options: [ok("Guten Morgen!"), ok("Moin!"), no("Gute Nacht!", "До ночи далеко, а дама и так путает время.")] },
          narr("Третья покупательница уже уходит с булочкой в руке."),
          { t: "say", who: "Студентка", voice: "Flo", de: "Tschüss!", ru: "Пока!" },
          { t: "reply", task: "Попрощайтесь.", options: [ok("Tschüss!"), ok("Auf Wiedersehen!"), no("Hallo!", "Она уходит, а не приходит: нужно попрощаться.")] },
          { t: "say", who: "Frauke", voice: "Sandy", de: "Danke! Super!", ru: "Спасибо! Отлично!" },
          { t: "item", icon: "🐟", de: "das Fischbrötchen", ru: "булочка с рыбой — подарок Фрауке", set: { frauke: 1 } },
        ],
      },
    ],
  },
  narr("Мимо проходит рыбак после ночной смены и зевает: «Gute Nacht!» Для него сейчас вечер. Следом на велосипеде проносится Мерле из парусной команды."),
  { t: "say", who: "Merle", voice: "Shelley", de: "Hallo, Hauke! Tschüss, Hauke!", ru: "Привет, Хауке! Пока, Хауке!", learn: ["Hallo!", "Tschüss!"] },
  {
    t: "hear",
    task: "Что Мерле успела сказать на ходу?",
    voice: "Shelley",
    de: "Hallo, Hauke! Tschüss, Hauke!",
    options: ["Привет и пока", "Доброе утро", "Как дела?"],
    answer: "Привет и пока",
  },
  narr("— Сколько тут приветствий? — спрашиваете вы. Хауке пожимает плечами: — Много. Но если сомневаешься, говори {moin}. Утром, днём, вечером и даже ночью."),
  { t: "gap", task: "Чем здороваются в Киле в любое время?", text: "___! Wie geht's?", options: ["Moin", "Gute Nacht", "Tschüss"], answer: "Moin" },
  narr("Kiellinie. Слева вода и мачты, справа белые домики парусных клубов. Хауке останавливается у причала."),
  hauke("Das ist der Hafen. Und das ist mein Boot.", "Это гавань. А это моя лодка.", ["der Hafen", "das Boot"]),
  {
    t: "reply",
    task: "Спросите, как называется лодка.",
    options: [
      ok("Wie heißt das Boot?"),
      no("Wo wohnt das Boot?", "Лодки не живут, они стоят у причала. Хотя Хауке, кажется, считает иначе."),
      no("Woher kommst du?", "Об этом Хауке вас уже спрашивал. Сейчас речь о лодке."),
    ],
  },
  hauke("Das Boot heißt „Sprotte“. Wir segeln hier.", "Лодка называется «Шпротта». Мы тут ходим под парусом.", ["segeln"]),
  { t: "gap", task: "Что делают на «Шпротте»?", text: "Wir ___ hier.", options: ["segeln", "heißen", "kommen"], answer: "segeln", ru: "Мы тут ходим под парусом." },
  { t: "gap", task: "Какой артикль у гавани?", text: "Das ist ___ Hafen.", options: ["der", "die", "das"], answer: "der", ru: "Это гавань." },
  {
    t: "look",
    task: "Осмотритесь у причала: нажимайте на всё, что видите.",
    items: [
      { icon: "⛵", de: "das Boot", ru: "лодка", note: "«Sprotte»: маленькая, синяя и очень гордая.", key: true },
      { icon: "⚓", de: "der Hafen", ru: "гавань", note: "Гавань клуба: двадцать лодок и одна очень громкая чайка.", key: true },
      { icon: "🐦", de: "die Möwe", ru: "чайка", note: "Смотрит на вас так, будто это вы у неё в гостях.", key: true },
      { icon: "☕", de: "das Café", ru: "кафе", note: "Кафе у воды. Хауке обещает кофе. Позже.", key: true },
      { icon: "🏖️", de: "der Strand", ru: "пляж", note: "Пляж дальше по набережной. Сегодня там только ветер." },
    ],
  },
  narr("Хауке идёт к домику клуба и останавливается так резко, что вы врезаетесь ему в спину. У двери стоит {aufsteller} с рамкой. Рамка пустая."),
  { t: "pic", src: "01-stand.jpg", alt: "Хауке в ужасе смотрит на пустую деревянную подставку у двери клуба; чайка на крыше" },
  hauke("Wo ist das Schild?", "Где табличка?"),
  narr("Здесь всегда стояла старая {schild} с надписью MOIN. Перед стартом каждая команда клуба касается её на удачу: ohne MOIN kein Start. До Kieler Woche двенадцать дней, а клуб остался без приветствия."),
  { t: "clue", title: "Пропажа", text: "Табличка MOIN исчезла с подставки у входа в клуб. Без неё команды клуба не стартуют." },
];

const harbourMaster: SceneNode[] = [
  { t: "pic", src: "01-jensen.jpg", alt: "Начальник гавани Йенсен с кружкой чая молча протягивает блокнот в клетку; Хауке удивлён" },
  narr("Из домика гавани выходит пожилой человек в синей куртке, с кружкой в руке. Это начальник гавани, Herr Jensen. Он смотрит на подставку, на Хауке, на вас. Потом на чайку на крыше."),
  jensen("Moin.", "Привет."),
  hauke("Moin, Herr Jensen! Wo ist das Schild?", "Привет, господин Йенсен! Где табличка?"),
  jensen("Moin.", "Привет."),
  narr("Хауке поворачивается к вам: — У Йенсена «Moin» как «ку» в «Кин-дза-дзе»: значит всё сразу. «Доброе утро», «не знаю» и «не задавай вопросов до обеда»."),
  {
    t: "reply",
    task: "Поздоровайтесь с начальником гавани — вежливо.",
    options: [
      ok("Guten Morgen, Herr Jensen!"),
      no("Hallo, Jensen!", "Начальнику гавани говорят Herr и вежливое «вы». Йенсен поднимает бровь — это у него длинная речь."),
      no("Wie heißt du?", "Так спрашивают друзей. Со старшими и незнакомыми — Wie heißen Sie?"),
    ],
  },
  jensen("Moin.", "Привет."),
  narr("Йенсен ставит кружку на скамейку, достаёт из кармана блокнот в клетку и молча вкладывает его вам в руки. На обложке его почерком: «{neu}»"),
  { t: "item", icon: "📓", de: "das Notizbuch", ru: "блокнот детектива" },
  hauke("Du bist jetzt Detektiv!", "Теперь ты детектив!"),
  {
    t: "reply",
    task: "Ответьте Хауке: да, вы детектив.",
    options: [
      ok("Ja! Ich bin Detektiv."),
      no("Ja! Du bist Detektiv.", "du bist — «ты есть». О себе говорят ich bin."),
      no("Ja! Er ist Detektiv.", "er ist — «он есть». О себе говорят ich bin."),
    ],
  },
  narr("— Это больше слов, чем он сказал мне за прошлый год, — шепчет Хауке. Йенсен уходит в домик. Кружка остаётся на скамейке."),
  { t: "type", task: "Запишите на первой странице блокнота главный вопрос: «Где табличка?»", answers: ["Wo ist das Schild?"], ru: "Где табличка?" },
  narr("Первое правило детектива: осмотреть место, пока его не осмотрела чайка."),
  { t: "pic", src: "01-clues.jpg", alt: "Место у пустой подставки: кусочек краски с буквой O, перевёрнутые ящики с карточками, кружка чая на скамейке и чайка" },
  {
    t: "look",
    task: "Осмотрите место у подставки.",
    items: [
      { icon: "🪵", de: "der Aufsteller", ru: "подставка", note: "Рамка цела. Табличку вынули аккуратно, а не выломали.", key: true },
      { icon: "🎨", de: "die Farbe", ru: "краска", note: "Кусочек старой краски с буквой O. Краска на табличке давно шелушилась.", key: true },
      { icon: "📦", de: "die Kiste", ru: "ящик", note: "Три ящика с надписями der, die и das. Перевёрнуты, по земле рассыпаны карточки со словами.", key: true },
      { icon: "🫖", de: "der Tee", ru: "чай", note: "Кружка Йенсена. Внутри чай. Судя по запаху, только чай — никогда кофе.", key: true },
      { icon: "🐦", de: "die Möwe", ru: "чайка", note: "Сидит слишком спокойно для невиновной." },
    ],
  },
  { t: "item", icon: "🎨", de: "die Farbe", ru: "кусочек старой краски с буквой O" },
  hauke("Die Karten! Der, die, das – das ist Jensens System.", "Карточки! Der, die, das — это система Йенсена."),
  narr("Карточки из уголка языка: клуб держит их для команд из разных стран. Йенсен раскладывает слова по ящикам: в каждый {kiste} — свой артикль. Хауке уверяет, что так быстрее. Вы не уверены, но выглядит строго."),
  { t: "gap", task: "Что сказал Хауке?", text: "Das ___ Jensens System.", options: ["ist", "bin", "sind"], answer: "ist", ru: "Это система Йенсена." },
  { t: "game", task: "Верните карточки в ящики: der, die или das?", c: docks(["der Name", "das Land", "der Strand", "die Stadt", "die Sprache", "der Hafen", "das Boot", "das Café"]) },
  narr("В ящике das таблички нет. — Das Schild — это das, — бормочет Хауке, — но в ящик она бы не влезла. Её не убирали. Её унесли."),
  { t: "gap", task: "Какой артикль у таблички?", text: "Wo ist ___ Schild?", options: ["der", "die", "das"], answer: "das" },
  {
    t: "hear",
    task: "Хауке ещё раз повторяет главный вопрос. Что он говорит?",
    voice: "Rocko",
    de: "Wo ist das Schild?",
    options: ["Wo ist das Schild?", "Wer ist das Schild?", "Wie ist das Schild?"],
    answer: "Wo ist das Schild?",
  },
  {
    t: "pick",
    task: "Что делать детективу дальше?",
    options: [
      ok("Узнать, кто вчера вечером был в клубе"),
      no("Сразу допросить чайку", "Сидеть на крыше — ещё не улика. К тому же показаний чайка не даёт."),
      no("Звонить в полицию", "Пока неизвестно даже, когда табличка пропала. Сначала факты."),
    ],
  },
  { ...narr("Кто был в клубе вчера? Хауке показывает на причал: там висят флаги команд, которые уже приехали на Kieler Woche. Ночью {moewe} сорвала с флагштоков таблички с названиями стран."), set: { gull: 1 } },
  { t: "game", task: "Подпишите флаги: послушайте страну и нажмите на флаг.", c: scene([["Deutschland", "🇩🇪"], ["Dänemark", "🇩🇰"], ["Kasachstan", "🇰🇿"], ["Russland", "🇷🇺"], ["die Türkei", "🇹🇷"], ["die Ukraine", "🇺🇦"], ["die Schweiz", "🇨🇭"], ["die USA", "🇺🇸"]]) },
  narr("Восемь стран, один клуб. Хауке загибает пальцы: вчера вечером здесь были Матео, Элиф, Дана, Йенсен и гости клуба, брат и сестра из Гамбурга. Гости ещё спят, а остальные уже у причала."),
  { t: "clue", title: "Место у подставки", text: "Табличку вынули аккуратно: рамка цела. Рядом кусочек старой краски с буквой O и кружка Йенсена — в ней только чай." },
];

const witnesses: SceneNode[] = [
  { t: "pic", src: "01-witnesses.jpg", alt: "Причал: Матео моет синюю лодку, Элиф с нежностью смотрит на чайку, Дана с кофе читает на скамейке" },
  narr("У причала трое, и все вчера вечером были в клубе. Матео, повар, моет «Sprotte». Элиф, студентка-биолог, наблюдает за чайкой. Дана, врач, пьёт кофе и читает. Блокнот открыт, вопросы готовы."),
  {
    t: "go",
    task: "С кого начать?",
    branches: [
      {
        label: "Матео у лодки",
        icon: "⛵",
        nodes: [
          mateo("Moin! Wie geht's?", "Привет! Как дела?"),
          {
            t: "reply",
            task: "Ответьте Матео.",
            options: [
              ok("Danke, gut! Und dir?"),
              no("Gute Nacht!", "Матео смеётся: спокойной ночи в девять утра?"),
              no("Ich komme aus Argentinien.", "Это скорее ответ Матео. Он спросил, как у вас дела."),
            ],
          },
          mateo("Ich bin Mateo. Ich komme aus Argentinien.", "Я Матео. Я из Аргентины."),
          {
            t: "reply",
            task: "Спросите, где он живёт.",
            options: [
              ok("Wo wohnst du?"),
              no("Woher kommst du?", "Он только что сказал: aus Argentinien."),
              no("Wie heißt du?", "Имя он уже назвал: Mateo."),
            ],
          },
          mateo("Ich wohne in Holtenau.", "Я живу в Хольтенау."),
          narr("Матео протягивает вам кружку из термоса: — Kaffee? Детектив без кофе — просто человек с блокнотом."),
          {
            t: "reply",
            task: "Задайте главный вопрос.",
            options: [
              ok("Wo ist das Schild?"),
              no("Wie geht's?", "Об этом вы уже спрашивали."),
              no("Auf Wiedersehen!", "Рано прощаться: главный вопрос не задан."),
            ],
          },
          mateo("Das Schild? Nicht hier!", "Табличка? Не здесь!"),
          narr("Жестами и тремя языками Матео объясняет: вчера он ушёл из клуба около шести, табличка ещё висела. Подставку он помнит хорошо: каждый раз ударяется о неё коленом."),
          { t: "game", task: "Заполните карточку свидетеля.", c: write("Karte: Mateo", [["Mateo · Land", "Argentinien"], ["Mateo · Wohnort", "Holtenau"]]), hint: "Land — страна, Wohnort — где живёт." },
          { t: "clue", title: "Свидетель: Матео", text: "Родом из Аргентины, живёт в Holtenau. Ушёл вчера около шести, табличка ещё висела." },
        ],
      },
      {
        label: "Элиф и чайка",
        icon: "🐦",
        nodes: [
          elif("Hallo! Ich bin Elif. Und wer bist du?", "Привет! Я Элиф. А ты кто?", ["Wer?"]),
          introduce("Представьтесь Элиф."),
          elif("Woher kommst du?", "Откуда ты?"),
          origin("Ich wohne aus Russland.", "wohnen — жить. Откуда родом — kommen aus."),
          elif("Ich komme aus der Türkei, aus Izmir. Ich wohne in Kiel.", "Я из Турции, из Измира. Я живу в Киле."),
          {
            t: "hear",
            task: "Где Элиф живёт сейчас?",
            voice: "Flo",
            de: "Ich komme aus der Türkei, aus Izmir. Ich wohne in Kiel.",
            options: ["в Киле", "в Измире", "в Турции"],
            answer: "в Киле",
          },
          narr("Элиф изучает морскую биологию и смотрит на чайку с профессиональной нежностью. Вы смотрите на чайку с профессиональным подозрением."),
          elif("Das ist eine Möwe. Sie ist nicht kriminell!", "Это чайка. Она не преступница!"),
          narr("Хауке шепчет: — Die Möwe говорит на какой-то своей мове. Сколько ни слушай, понятно только «кри-и-и»."),
          {
            t: "pick",
            task: "Что записать про чайку?",
            options: [
              ok("Чайка — свидетель"),
              { text: "Чайка — подозреваемая", ok: true, set: { gull: 1 } },
              no("Чайку нужно допросить по-немецки", "Чайка знает одно слово, и это не Moin."),
            ],
          },
          {
            t: "when",
            if: [{ q: "gull", min: 2 }],
            then: [narr("Элиф качает головой: — Подозревать чайку — значит её раззадорить. Чайка смотрит на вас с интересом. Со слишком большим интересом.")],
            else: [narr("Элиф довольна: чайка записана в свидетели. Чайка тоже выглядит довольной — насколько это возможно для чайки.")],
          },
          narr("Зато Элиф кое-что видела: вчера вечером у подставки долго сидели гости клуба, брат и сестра. Они о чём-то спорили, а потом ушли в гостевую комнату."),
          { t: "game", task: "Заполните карточку свидетеля.", c: write("Karte: Elif", [["Elif · Land", "die Türkei", "Türkei"], ["Elif · Wohnort", "Kiel"]]), hint: "Страна Элиф с артиклем: die Türkei. Wohnort — где она живёт сейчас." },
          { t: "clue", title: "Свидетель: Элиф", text: "Из Турции, живёт в Киле. Вчера вечером у подставки долго сидели гости клуба, брат и сестра. Они спорили." },
        ],
      },
      {
        label: "Дана с кофе",
        icon: "☕",
        nodes: [
          dana("Moin! Ich bin Dana. Und wer bist du?", "Привет! Я Дана. А ты кто?"),
          introduce("Представьтесь Дане."),
          dana("Ich komme aus Kasachstan. Aber ich wohne jetzt hier in Kiel, in Gaarden.", "Я из Казахстана. Но сейчас я живу здесь, в Киле, в Гаардене."),
          { t: "gap", task: "Откуда Дана родом?", text: "Dana kommt ___ Kasachstan.", options: ["aus", "in", "nach"], answer: "aus" },
          { t: "gap", task: "А где она живёт?", text: "Sie wohnt ___ Gaarden.", options: ["in", "aus", "nach"], answer: "in" },
          dana("Welche Sprachen sprichst du?", "На каких языках ты говоришь?", ["Welche?", "die Sprache", "sprechen"]),
          {
            t: "reply",
            task: "Ответьте Дане.",
            options: [
              ok("Ich spreche Russisch und ein bisschen Deutsch."),
              no("Ich spreche aus Russland.", "Говорят на языке, а не «из страны»: Ich spreche Russisch."),
              no("Ich bin Russisch.", "Ich bin — «я есть». Про язык нужен глагол sprechen."),
            ],
          },
          dana("Super! Ich spreche Kasachisch, Russisch, Englisch und ein bisschen Deutsch.", "Отлично! Я говорю по-казахски, по-русски, по-английски и немного по-немецки."),
          { t: "gap", task: "Как Дана спросила о языках?", text: "___ Sprachen sprichst du?", options: ["Welche", "Woher", "Wo"], answer: "Welche" },
          narr("Дана — врач, и на подставку она смотрит как на пациента: — Рамка цела, дерево не треснуло. Табличку вынули спокойно, без спешки. Тот, кто снимал, знал, что делает."),
          { t: "game", task: "Заполните карточку свидетеля.", c: write("Karte: Dana", [["Dana · Land", "Kasachstan"], ["Dana · Wohnort", "Gaarden"]]), hint: "Land — страна, откуда Дана родом; Wohnort — где она живёт сейчас." },
          { t: "clue", title: "Свидетель: Дана", text: "Из Казахстана, живёт в Гаардене. Табличку вынули спокойно и умело: рамка цела, дерево не треснуло." },
        ],
      },
    ],
  },
  narr("В блокноте три свидетеля и одна общая деталь: вчера вечером последними у подставки были гости клуба, брат и сестра из Гамбурга. Их зовут Нильс и Грета."),
  {
    t: "game",
    task: "Сведите показания: кто где живёт? Если забыли — загляните в блокнот сцены.",
    c: pairs([["Mateo wohnt in", "Holtenau"], ["Dana wohnt in", "Gaarden"], ["Elif wohnt in", "Kiel"]]),
    hint: "kommen aus — откуда родом, wohnen in — где живёт сейчас. Элиф родом из Турции, а живёт в Киле.",
  },
  {
    t: "pick",
    task: "Кого расспросить дальше?",
    options: [
      ok("Нильса и Грету: они были у подставки последними"),
      no("Чайку", "Элиф уже всё сказала про чайку. Дважды."),
      no("Йенсена ещё раз", "Вы уже знаете, что он ответит. Одно слово. Вы знаете какое."),
    ],
  },
  {
    t: "when",
    if: [{ q: "frauke", min: 1 }, { q: "gull", min: 2 }],
    then: [
      { ...narr("Вы достаёте булочку Фрауке — и чайка, которая всё утро копила наглость, уносит её прямо из рук. Элиф разводит руками: — Это не кража. Это природа."), set: { gull: 1 } },
    ],
  },
  {
    t: "when",
    if: [{ q: "frauke", min: 1 }, { q: "gull", max: 1 }],
    then: [narr("Вы наконец едите булочку Фрауке. Чайка смотрит издалека, но ведёт себя прилично: свидетели себе такого не позволяют.")],
  },
  hauke("Die Gäste schlafen noch.", "Гости ещё спят."),
  narr("Хауке смотрит на часы: гости встанут не раньше обеда. Чайка на крыше зевает. Вы открываете блокнот на новой странице и пишете крупно: Wo ist das Schild? А под вопросом — первое имя: Greta."),
];

const gull = (de: string, ru: string): SceneNode => ({ t: "say", who: "die Möwe", voice: "Shelley", de, ru });

const gullDiary: SceneNode[] = [
  { t: "pic", src: "01-gull.jpg", alt: "Чайка вечером на крыше клуба пишет в крошечном блокноте" },
  narr("Тем временем на крыше клуба. Чайка тоже ведёт блокнот. Почерк у неё так себе, зато немецкий — твёрдый A1."),
  gull("Ich bin die Möwe.", "Я чайка."),
  { t: "gap", task: "Допишите за чайку.", text: "Ich ___ die Möwe.", options: ["bin", "bist", "ist"], answer: "bin", ru: "Я чайка." },
  gull("Ich wohne hier. Das ist mein Hafen.", "Я живу здесь. Это моя гавань."),
  { t: "gap", task: "Где живёт чайка?", text: "Ich ___ hier.", options: ["wohne", "komme", "heiße"], answer: "wohne" },
  gull("Ich spreche Möwisch. Kreeh!", "Я говорю по-чаячьи. Кри-и!"),
  narr("Хауке был прав: die Möwe говорит на своей мове. Möwisch — язык из одного слова, почти как у Йенсена."),
  { t: "type", task: "Подскажите чайке, как сказать «Я говорю по-немецки».", answers: ["Ich spreche Deutsch."], ru: "Я говорю по-немецки." },
  gull("Gestern: ein Mann, eine Frau und das Schild. Tschüss, Schild!", "Вчера: мужчина, женщина и табличка. Пока, табличка!"),
  {
    t: "hear",
    task: "Что чайка видела вчера у подставки?",
    voice: "Shelley",
    de: "Gestern: ein Mann, eine Frau und das Schild. Tschüss, Schild!",
    options: ["мужчину, женщину и табличку", "двух чаек и табличку", "Йенсена с чаем"],
    answer: "мужчину, женщину и табличку",
  },
  narr("Чайка закрывает блокнот и засыпает. Улика у неё есть. Показаний она, как обычно, не даёт."),
];

const play = (nodes: SceneNode[]) => ({ kind: "play" as const, nodes });

export const sceneChapter1: Episode = {
  id: "moin-neu",
  title: "Утро без Moin",
  day: { de: "Noch zwölf Tage", ru: "ещё двенадцать дней до Kieler Woche" },
  place: "Kiellinie · клуб",
  topic: "Знакомство",
  grammar: "sein · Präsens · вопросы · глагол на втором месте",
  beats: [
    {
      id: "01-s1",
      title: "Moin, Kiel!",
      story: [],
      prompt: "Вокзал, набережная и первая пропажа.",
      hint: "Ошибка ничего не стоит: собеседник отреагирует, и можно выбрать снова.",
      success: "Первая сцена позади: вы поздоровались с половиной Киля и потеряли табличку, которой ещё даже не видели.",
      challenge: play(arrival),
    },
    {
      id: "01-s2",
      title: "Начальник гавани",
      story: [],
      prompt: "Йенсен, блокнот и место пропажи.",
      hint: "Ошибка ничего не стоит: собеседник отреагирует, и можно выбрать снова.",
      success: "У вас есть блокнот, три улики и вопрос по-немецки. У Йенсена есть чай.",
      challenge: play(harbourMaster),
    },
    {
      id: "01-s3",
      title: "Три свидетеля",
      story: [],
      prompt: "Матео, Элиф и Дана: начните с кого хотите.",
      hint: "Ошибка ничего не стоит: собеседник отреагирует, и можно выбрать снова.",
      success: "Три свидетеля, три карточки и одно имя в блокноте. Продолжение следует.",
      challenge: play(witnesses),
    },
    {
      id: "01-i1",
      title: "Möwen-Tagebuch",
      pov: "глазами чайки",
      story: [],
      prompt: "Интерлюдия: что видела чайка.",
      hint: "Чайка пишет просто: Ich bin, ich wohne, ich spreche.",
      success: "Мужчина, женщина и табличка. Брат и сестра? Или кто-то ещё? Чайка не уточняет.",
      challenge: play(gullDiary),
    },
  ],
};
