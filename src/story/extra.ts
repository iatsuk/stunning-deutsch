import type { Beat, Challenge, OralRound } from "./types.ts";

// Шаги со словарём уроков A1. Один шаг охватывает сразу несколько слов, поэтому объём лексики
// растёт быстрее числа шагов. Ключ — шаг основной истории, после которого идут эти шаги.

const step = (
  id: string,
  title: string,
  story: string,
  prompt: string,
  hint: string,
  success: string,
  challenge: Challenge,
): Beat => ({ id, title, story: [story], prompt, hint, success, challenge });

const bingo = (words: string[]): Challenge => ({ kind: "bingo", words });
const scene = (items: [string, string][]): Challenge => ({
  kind: "scene",
  items: items.map(([word, icon]) => ({ word, icon })),
});
const odd = (rounds: [string[], string, string][]): Challenge => ({
  kind: "odd",
  rounds: rounds.map(([words, answer, why]) => ({ words, odd: answer, why })),
});
const letters = (words: string[]): Challenge => ({ kind: "letters", words });
const speak = (lines: string[]): Challenge => ({ kind: "speak", lines });
const docks = (words: string[]): Challenge => ({ kind: "docks", words });
const gull = (words: string[]): Challenge => ({ kind: "gull", words });
/** Первый вариант на каждом диске — верный; при показе диски перемешиваются. */
const lock = (rounds: [string, string[][]][]): Challenge => ({
  kind: "lock",
  rounds: rounds.map(([ru, reels]) => ({ ru, reels, answer: reels.map((r) => r[0]) })),
});
const letter = (to: string, model: string[], fields: string[][]): Challenge => ({
  kind: "letter",
  to,
  model,
  fields: fields.map(([label, ...answers], i) => ({ id: `f${i}`, label, answers })),
});
/** Обращение и подпись: образец показывает один вариант, но верны и другие обычные формы. */
const an = (greeting: string, name: string) => [
  `Anrede: an ${name.replace(/^Herr /, "Herrn ")}`,
  `${greeting} ${name}`,
  `Hallo ${name}`,
  ...(/^(Frau|Herr) /.test(name) ? [`Sehr ${name.startsWith("Frau") ? "geehrte" : "geehrter"} ${name}`] : []),
];
const gruss = (name: string) => [
  `Gruß und Name: ${name}`,
  ...["Viele Grüße", "Liebe Grüße", "Herzliche Grüße"].flatMap((g) => [`${g}, ${name}`, `${g} ${name}`]),
];
const oral = (rounds: OralRound[]): Challenge => ({ kind: "oral", rounds });
const say = (part: OralRound["part"], task: string, card: string, model: string, ru: string, hint?: string): OralRound => ({ part, task, card, model, ru, hint });
const reply = (part: OralRound["part"], task: string, hear: string, model: string, ru: string): OralRound => ({ part, task, hear, model, ru });
const write = (title: string, fields: [string, string][]): Challenge => ({
  kind: "write",
  title,
  fields: fields.map(([label, answer], i) => ({
    id: `f${i}`,
    label,
    answers: [answer],
  })),
});

const DOCK = "Слово без артикля. К какому причалу оно подходит: der, die или das?";
const RACE = "Прочитайте перевод и нажмите немецкое слово, пока чайка не долетела.";
const LOCK = "Поверните диски, чтобы получилась фраза, и откройте замок.";
const LETTER = "Напишите письмо по образцу. Пункты подсказывают, что сказать; меняются только данные.";
const ORAL = "Сначала скажите вслух сами, потом сверьтесь с образцом.";
const ASK = "Задайте партнёру вопрос по карточке.";
const ANSWER = "Партнёр спрашивает вас. Ответьте вслух.";
const REQUEST = "Попросите о том, что на картинке.";
const REACT = "Партнёр обращается к вам. Отреагируйте вслух.";
const HEAR = "Нажмите кнопку, послушайте слово и закройте его на карточке.";
const PICTURE = "Послушайте слово и нажмите на подходящую картинку.";
const ODD = "Одно слово в группе лишнее. Найдите его.";
const SPELL = "Соберите слово по буквам.";
const SAY = "Послушайте и повторите вслух. Можно записать себя и сравнить.";
const WRITE = "Напишите по-немецки. У существительных нужен артикль.";
const HINT_DOCK = "Артикль запоминают вместе со словом. После ошибки слово вернётся в конце очереди.";
const HINT_RACE = "Унесённое слово вернётся, а времени станет больше. Проиграть здесь нельзя.";
const HINT_LOCK = "Замок считает верные диски, но не называет их. Проверьте форму глагола и порядок слов.";
const HINT_LETTER = "Берите предложения образца и меняйте данные. После второй неудачной проверки откроется правильный вариант.";
const HINT_ORAL = "Здесь проверяете вы сами. Запись остаётся на этой странице и никуда не отправляется.";
const HINT_HEAR = "Переслушивать можно сколько угодно. Ошибка ничего не стоит.";
const HINT_PICTURE = "Неверное нажатие подскажет, как называется картинка.";
const HINT_ODD = "Ищите общую тему трёх слов. Перевод открывается после нажатия.";
const HINT_SPELL = "Лишние буквы тоже лежат в наборе. Кнопка рядом с переводом озвучивает слово.";
const HINT_SAY = "Запись остаётся только на этой странице и никуда не отправляется.";
const HINT_WRITE = "Существительные пишутся с большой буквы, глаголы — с маленькой.";

export const extras: Record<string, Beat[]> = {
  "01-welcome": [
    step("01-x-hello", "Лото у причала", "Пока Йенсен ищет блокнот, гости клуба репетируют встречу. Он читает слова из старого разговорника, а Матео уже раздал карточки.", HEAR, HINT_HEAR, "Лото! Йенсен объявляет вас главным по приветствиям. Премия прежняя: danke.",
      bingo(["Hallo!", "Guten Morgen!", "Guten Tag!", "Guten Abend!", "Gute Nacht!", "Wie geht's?", "Tschüss!", "Auf Wiedersehen!", "das Boot"])),
    step("01-x-docks", "Три причала", "В гавани Киля три причала: der, die и das. Йенсен уверяет, что у каждого слова свой причал и менять его не положено, как и у яхт.", DOCK, HINT_DOCK, "Слова пришвартованы. Йенсен проверяет узлы и не находит, к чему придраться.",
      docks(["der Name", "das Land", "der Strand", "die Stadt", "die Sprache", "der Hafen", "das Boot", "das Café"])),
  ],
  "01-mateo": [
    step("01-x-flags", "Флажки на причале", "На Kieler Woche приезжают команды из разных стран. Чайка сорвала подписи с флажков, и теперь Хауке не знает, какой чей.", PICTURE, HINT_PICTURE, "Флажки подписаны. Чайка утверждает, что представляет международное сообщество чаек.",
      scene([["Deutschland", "🇩🇪"], ["Dänemark", "🇩🇰"], ["Kasachstan", "🇰🇿"], ["Russland", "🇷🇺"], ["die Türkei", "🇹🇷"], ["die Ukraine", "🇺🇦"], ["die Schweiz", "🇨🇭"], ["die USA", "🇺🇸"]])),
    step("01-x-race", "Чайка и вопросы", "Чайка заметила карточки с вопросами и уже снижается. Заберите слово раньше неё.", RACE, HINT_RACE, "Вопросы спасены. Чайка делает вид, что летела по своим делам.",
      gull(["Moin!", "heißen", "kommen aus", "wohnen in", "Wer?", "Wie?", "Woher?", "Wo?", "Was?", "Welche?"])),
  ],
  "01-question": [
    step("01-x-say", "Голос для рации", "Йенсен просит поздороваться с гостями по рации. Рация старая, поэтому говорить нужно чётко.", SAY, HINT_SAY, "Рация довольно хрипит. Гости отвечают.",
      speak(["Guten Morgen!", "Wie geht's?", "Danke, gut!"])),
    step("01-x-odd", "Разберите карточки", "Ветер смешал карточки клуба. Элиф раскладывает их стопками, но в каждой стопке одна чужая.", ODD, HINT_ODD, "Стопки в порядке. Ветер обещал больше так не делать, но слова не дал.",
      odd([
        [["Guten Morgen!", "Guten Tag!", "Guten Abend!", "Tschüss!"], "Tschüss!", "Tschüss — прощание, остальные слова — приветствия."],
        [["der Hafen", "das Boot", "segeln", "die Sprache"], "die Sprache", "Die Sprache — язык, остальное связано с морем."],
        [["Gute Nacht!", "Auf Wiedersehen!", "Tschüss!", "Wie geht's?"], "Wie geht's?", "Wie geht's? — вопрос, остальное — прощание."],
      ])),
  ],
  "01-card": [
    step("01-x-letters", "Чайка любит буквы", "Чайка склевала буквы с таблички клуба. Буквы нашлись под лавкой, теперь их нужно вернуть на место.", SPELL, HINT_SPELL, "Слова снова целы. Чайка заметно поправилась.",
      letters(["der Vorname", "die Stadt", "die Sprache", "der Hafen", "das Boot"])),
    step("01-x-write", "Словарик для Матео", "Матео просит записать ему несколько немецких слов в блокнот: почерк у него есть, а слов пока мало.", WRITE, HINT_WRITE, "Матео доволен и обещает выучить всё к обеду. Обед он выучил заранее.",
      write("Für Mateo", [["город", "die Stadt"], ["говорить", "sprechen"], ["фамилия", "der Familienname"], ["ходить под парусом", "segeln"], ["кафе", "das Café"]])),
    step("01-x-lock", "Шкафчик Йенсена", "У Йенсена на шкафчике словесный замок: цифры он забывает, а фразы, говорит, помнит. Внутри лежат запасные ключи.", LOCK, HINT_LOCK, "Шкафчик открыт. Внутри ключи и записка: «Цифры надёжнее».",
      lock([
        ["Я живу в Киле.", [["Ich", "Du", "Er"], ["wohne", "wohnst", "wohnt"], ["in Kiel.", "aus Kiel.", "nach Kiel."]]],
        ["Откуда ты родом?", [["Woher", "Wo", "Wie"], ["kommst", "komme", "kommt"], ["du?", "ich?", "wir?"]]],
        ["Мы из Аргентины.", [["Wir", "Ich", "Er"], ["sind", "bin", "ist"], ["aus Argentinien.", "in Argentinien.", "nach Argentinien."]]],
      ])),
    step("01-x-letter", "Первое письмо", "Новая участница клуба Анна просит помочь с письмом Грете. Матео разрешает взять его письмо за образец, только данные у Анны другие.", LETTER, HINT_LETTER, "Письмо ушло. Грета отвечает одним словом: Moin.",
      letter("Greta", ["Liebe Elif,", "ich heiße Mateo. Ich komme aus Argentinien. Ich wohne in Gaarden.", "Viele Grüße", "Mateo"], [
        an("Liebe", "Greta"),
        ["Wie heißen Sie? → Anna", "Ich heiße Anna."],
        ["Woher kommen Sie? → Russland", "Ich komme aus Russland."],
        ["Wo wohnen Sie? → Kiel", "Ich wohne in Kiel."],
        gruss("Anna"),
      ])),
    step("01-x-oral", "Репетиция знакомства", "Завтра в клубе гости. Йенсен просит порепетировать вслух, как на экзамене, без бумажки.", ORAL, HINT_ORAL, "Йенсен не нашёл ни одной ошибки. Правда, он и не слушал, но всё равно доволен.",
      oral([
        say(1, "Скажите, как вас зовут и откуда вы.", "Name · Land", "Ich heiße Mateo. Ich komme aus Argentinien.", "Меня зовут Матео. Я из Аргентины."),
        say(1, "Скажите, где вы живёте и на каких языках говорите.", "Wohnort · Sprachen", "Ich wohne in Kiel. Ich spreche Spanisch und Deutsch.", "Я живу в Киле. Я говорю по-испански и по-немецки."),
        say(2, ASK, "Thema: Person · Wort: Wohnort", "Wo wohnen Sie?", "Где вы живёте?", "Wo …?"),
        reply(2, ANSWER, "Woher kommen Sie?", "Ich komme aus Deutschland.", "Я из Германии."),
      ])),
  ],
  "02-number": [
    step("02-x-numbers", "Лото в офисе", "Пока Нильс ищет ручку, Петерсен предлагает проверить слух. В офисе тихо, на столе карточки.", HEAR, HINT_HEAR, "Петерсен кивает. В её офисе это считается бурными аплодисментами.",
      bingo(["eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"])),
    step("02-x-docks", "Причалы для бумаг", "Петерсен раскладывает документы клуба по тем же трём причалам. Говорит, так порядка больше, и спорить с ней никто не решился.", DOCK, HINT_DOCK, "Бумаги у своих причалов. Петерсен заводит на это отдельную бумагу.",
      docks(["die Zahl", "die Nummer", "das Jahr", "der Raum", "die Frage", "die Pause", "die Zeit", "das Handy"])),
  ],
  "02-have": [
    step("02-x-things", "Вещи с доски объявлений", "На доске в офисе висят картинки без подписей. Петерсен просит подписать их, пока никто не решил, что это улики.", PICTURE, HINT_PICTURE, "Доска подписана. Кусок торта оказался настоящим, но это уже другое дело.",
      scene([["das Handy", "📱"], ["der Kuchen", "🍰"], ["der Geburtstag", "🎂"], ["die Adresse", "🏠"], ["die Prüfung", "📝"], ["der Liegeplatz", "⚓"]])),
    step("02-x-race", "Чайка считает", "Чайка таскает цифры с доски. Петерсен считает это кражей, чайка — бухгалтерией.", RACE, HINT_RACE, "Цифры на месте. Баланс сошёлся впервые за сезон.",
      gull(["null", "zehn", "elf", "zwölf", "haben", "Wie bitte?"])),
  ],
  "02-room": [
    step("02-x-say", "Вежливо переспросить", "Нильс говорит по телефону слишком быстро. Эти три фразы спасают любой звонок.", SAY, HINT_SAY, "Теперь вы можете переспросить кого угодно. Даже чайку.",
      speak(["Noch einmal, bitte.", "Langsam, bitte.", "Auf Wiederhören!"])),
    step("02-x-odd", "Папка с бумагами", "В папке всё перепутано. Найдите, что лежит не на своём месте.", ODD, HINT_ODD, "Папка в порядке. Петерсен впервые за неделю улыбается.",
      odd([
        [["die Handynummer", "die Hausnummer", "die Postleitzahl", "der Kuchen"], "der Kuchen", "Der Kuchen — пирог, остальное — данные для анкеты."],
        [["neun", "zehn", "zwölf", "alt"], "alt", "Alt — старый, остальное — числа."],
        [["die Pause", "die Prüfung", "der Raum", "der Liegeplatz"], "der Liegeplatz", "Der Liegeplatz — место у причала, остальное связано с курсом."],
      ])),
  ],
  "02-spell": [
    step("02-x-letters", "Бирки на ключах", "На ключах стёрлись надписи. Петерсен помнит перевод, но не буквы.", SPELL, HINT_SPELL, "Бирки готовы. Ключи снова знают, кто они.",
      letters(["der Raum", "die Frage", "die Zahl", "das Jahr", "die Nummer"])),
    step("02-x-write", "Анкета клуба", "Для анкеты нужны ещё несколько слов. Запишите их, пока Нильс на связи.", WRITE, HINT_WRITE, "Анкета заполнена. Йенсен ставит печать, которая осталась от прежнего начальника.",
      write("Fragebogen", [["Поздравляю!", "Alles Gute!"], ["называть по буквам", "buchstabieren"], ["старый", "alt"], ["адрес", "die Adresse"]])),
    step("02-x-lock", "Ящик Петерсен", "Ящик с анкетами закрыт таким же замком, как у Йенсена. Петерсен заказала его, потому что на него была скидка.", LOCK, HINT_LOCK, "Ящик открыт. Анкеты лежат в алфавитном порядке, скидка подтверждена чеком.",
      lock([
        ["У меня есть вопрос.", [["Ich", "Du", "Wir"], ["habe", "hast", "haben"], ["eine Frage.", "ein Frage.", "einen Frage."]]],
        ["У тебя есть телефон?", [["Hast", "Habe", "Hat"], ["du", "ich", "er"], ["ein Handy?", "eine Handy?", "einen Handy?"]]],
        ["Она живёт в Киле?", [["Wohnt", "Wohnst", "Wohne"], ["sie", "du", "ich"], ["in Kiel?", "aus Kiel?", "nach Kiel?"]]],
      ])),
    step("02-x-letter", "Письмо с номером", "Лена поменяла телефон и хочет сообщить об этом Хауке. Письмо Даны годится как образец, данные нужны свои.", LETTER, HINT_LETTER, "Хауке сохранил номер. На всякий случай на бумаге.",
      letter("Hauke", ["Lieber Nils,", "ich habe heute Geburtstag. Ich bin 30 Jahre alt. Meine Nummer ist 0176 2345.", "Viele Grüße", "Dana"], [
        an("Lieber", "Hauke"),
        ["Wann haben Sie Geburtstag? → morgen", "Ich habe morgen Geburtstag."],
        ["Wie alt sind Sie? → 25", "Ich bin 25 Jahre alt."],
        ["Wie ist Ihre Nummer? → 0151 7788", "Meine Nummer ist 0151 7788."],
        gruss("Lena"),
      ])),
    step("02-x-oral", "Телефон и буквы", "Петерсен тренирует звонки: номер продиктовать, слово назвать по буквам, вежливо спросить.", ORAL, HINT_ORAL, "Петерсен записала всё верно с первого раза. Это её личный рекорд.",
      oral([
        say(1, "Продиктуйте номер телефона.", "Telefonnummer", "Meine Telefonnummer ist: null, eins, sieben, sechs. Zwei, drei, vier, fünf.", "Мой номер телефона: 0176 2345."),
        say(1, "Назовите слово MOIN по буквам.", "M · O · I · N", "Em, O, I, En.", "Эм, о, и, эн."),
        say(2, ASK, "Thema: Telefon · Wort: Nummer", "Wie ist Ihre Telefonnummer?", "Какой у вас номер телефона?", "Wie …?"),
        reply(2, ANSWER, "Wie alt sind Sie?", "Ich bin dreißig Jahre alt.", "Мне тридцать лет."),
      ])),
  ],
  "03-family": [
    step("03-x-family", "Лото с родственниками", "Грета показывает семейный альбом. Родственников так много, что Матео предлагает играть в лото.", HEAR, HINT_HEAR, "Семья закрыта. Альбом только наполовину просмотрен.",
      bingo(["die Familie", "die Eltern", "das Kind", "der Sohn", "der Onkel", "die Tante", "der Mann", "der Freund", "die Freundin"])),
    step("03-x-docks", "Рассадка родни", "На фото слишком много родни, и Грета рассаживает её по причалам, как лодки. Артикль у каждого свой, родство тут не поможет.", DOCK, HINT_DOCK, "Родня рассажена. Никто не обиделся, что редкость для семейных фото.",
      docks(["der Bruder", "die Schwester", "die Tochter", "die Frau", "das Foto", "der Sohn", "die Tante", "das Kind"])),
  ],
  "03-owner": [
    step("03-x-photo", "Семейное фото", "На фото все смотрят в разные стороны, а подписи стёрлись. Грета диктует, кого где искать.", PICTURE, HINT_PICTURE, "Все нашлись. Даже собака, которая сначала не хотела сниматься.",
      scene([["der Vater", "👨"], ["die Mutter", "👩"], ["die Oma", "👵"], ["der Opa", "👴"], ["das Baby", "👶"], ["der Hund", "🐕"], ["die Katze", "🐈"], ["das Mädchen", "👧"], ["der Junge", "👦"]])),
    step("03-x-race", "Чайка над альбомом", "Чайка кружит над семейным альбомом. Родственников лучше забрать раньше неё.", RACE, HINT_RACE, "Альбом цел. Чайка в семью не принята, хотя и старалась.",
      gull(["die Geschwister", "die Eltern", "die Großeltern", "die Tochter", "der Enkel", "der Partner"])),
  ],
  "03-no": [
    step("03-x-say", "Анкета на слух", "Элиф заполняет анкету гостей и просит вас чётко произнести варианты.", SAY, HINT_SAY, "Все варианты слышны. Анкета не задаёт лишних вопросов, в отличие от Матео.",
      speak(["verheiratet", "ledig", "geschieden"])),
    step("03-x-odd", "Список гостей", "В списке гостей оказались посторонние слова. Вычеркните их.", ODD, HINT_ODD, "Список чист. Рюкзак гостем не считается, даже если очень просится.",
      odd([
        [["verheiratet", "ledig", "geschieden", "der Cousin"], "der Cousin", "Der Cousin — родственник, остальное — семейное положение."],
        [["der Partner", "die Partnerin", "der Rucksack", "der Gast"], "der Rucksack", "Der Rucksack — вещь, остальное — люди."],
        [["die Cousine", "die Tante", "die Enkelin", "der Enkel"], "der Enkel", "Der Enkel — мужчина, остальные — женщины."],
      ])),
  ],
  "03-children": [
    step("03-x-letters", "Подписи к альбому", "Грета подписывает короткие слова, но ручка кончилась на середине.", SPELL, HINT_SPELL, "Подписи готовы. Ручка больше не ломается, потому что её заменили.",
      letters(["der Sohn", "das Kind", "der Mann", "die Oma", "der Opa"])),
    step("03-x-write", "Запись для гостей", "Йенсен просит записать несколько слов для рассадки гостей.", WRITE, HINT_WRITE, "Рассадка готова. Дядя сидит рядом с едой, как и просил.",
      write("Gäste", [["бабушка и дедушка", "die Großeltern"], ["подруга", "die Freundin"], ["гость", "der Gast"], ["дядя", "der Onkel"]])),
    step("03-x-lock", "Шкатулка Греты", "У Греты есть шкатулка с письмами. Замок на ней помнит только семейные фразы.", LOCK, HINT_LOCK, "Шкатулка открыта. Письма Грета читать не даёт, а замок хвалит.",
      lock([
        ["Где твоя сестра?", [["Wo", "Wer", "Wie"], ["ist", "bist", "bin"], ["deine Schwester?", "dein Schwester?", "deinen Schwester?"]]],
        ["У меня нет детей.", [["Ich", "Du", "Er"], ["habe", "hast", "hat"], ["keine Kinder.", "kein Kinder.", "keinen Kinder."]]],
        ["Её сын живёт в Киле.", [["Ihr Sohn", "Sein Sohn", "Mein Sohn"], ["wohnt", "wohne", "wohnst"], ["in Kiel.", "aus Kiel.", "nach Kiel."]]],
      ])),
    step("03-x-letter", "Письмо о семье", "Марта рассказывает Петерсен о своей семье. Письмо Хауке подходит как образец, только родня у всех своя.", LETTER, HINT_LETTER, "Петерсен завела на семью Марты отдельную папку.",
      letter("Frau Petersen", ["Liebe Greta,", "mein Bruder heißt Tom. Er hat zwei Kinder. Mein Vater wohnt in Kiel.", "Viele Grüße", "Hauke"], [
        an("Liebe", "Frau Petersen"),
        ["Wie heißt Ihre Schwester? → Lena", "Meine Schwester heißt Lena."],
        ["Wie viele Kinder hat sie? → ein Kind", "Sie hat ein Kind."],
        ["Wo wohnt Ihre Mutter? → Lübeck", "Meine Mutter wohnt in Lübeck."],
        gruss("Marta"),
      ])),
    step("03-x-oral", "Вопросы о семье", "За столом Грета спрашивает всех обо всех. Лучше заранее попробовать вслух.", ORAL, HINT_ORAL, "Грета довольна. Матео теперь тоже знает всю вашу родню.",
      oral([
        say(1, "Расскажите о себе и о детях.", "Familie · Kinder", "Ich bin verheiratet und habe zwei Kinder.", "Я в браке, у меня двое детей."),
        say(2, ASK, "Thema: Familie · Wort: Kinder", "Haben Sie Kinder?", "У вас есть дети?", "Haben …?"),
        reply(2, ANSWER, "Haben Sie Geschwister?", "Ja, ich habe eine Schwester.", "Да, у меня есть сестра."),
        say(2, ASK, "Thema: Familie · Wort: Bruder", "Wie heißt Ihr Bruder?", "Как зовут вашего брата?", "Wie …?"),
      ])),
  ],
  "04-order": [
    step("04-x-menu", "Лото с меню", "Пока готовят заказ, официант от скуки читает меню вслух. Матео слушает с большим вниманием.", HEAR, HINT_HEAR, "Меню закрыто. Матео требует вторую партию.",
      bingo(["die Milch", "die Cola", "der Wein", "das Gemüse", "der Salat", "die Suppe", "das Frühstück", "das Mittagessen", "das Abendessen"])),
    step("04-x-docks", "Три столика", "Официант носит заказы к трём столикам с табличками der, die и das. Так его научили, а кто, он не помнит.", DOCK, HINT_DOCK, "Поднос пуст. Счёт, к сожалению, тоже дошёл до своего столика.",
      docks(["der Kaffee", "der Tee", "das Wasser", "das Brot", "das Bier", "die Rechnung", "der Kellner", "die Speisekarte"])),
  ],
  "04-basket": [
    step("04-x-food", "Витрина кафе", "В витрине нет ценников и подписей. Официант называет блюда, а вы показываете на них.", PICTURE, HINT_PICTURE, "Витрина изучена. Рыба смотрит с осуждением.",
      scene([["der Saft", "🧃"], ["der Käse", "🧀"], ["die Wurst", "🌭"], ["das Ei", "🥚"], ["das Fleisch", "🥩"], ["der Fisch", "🐟"], ["die Tomate", "🍅"], ["die Pasta", "🍝"], ["der Döner", "🥙"]])),
    step("04-x-race", "Чайка за столом", "Матео отвернулся, и чайка нацелилась на его тарелку. Спасайте слова, еду спасти уже не успеем.", RACE, HINT_RACE, "Слова спасены. Обед Матео спасти не удалось.",
      gull(["möchten", "gern", "der Kellner", "das Bier", "essen", "trinken", "bestellen", "das Wasser"])),
  ],
  "04-request": [
    step("04-x-say", "За столом", "Грета учит вас трём фразам, без которых обед в Германии не обед.", SAY, HINT_SAY, "Теперь можно садиться за любой стол в Киле.",
      speak(["Guten Appetit!", "Zusammen oder getrennt?", "Hunger haben"])),
    step("04-x-odd", "Что не из меню", "Официант перепутал листы заказов. В каждой группе одно лишнее.", ODD, HINT_ODD, "Заказы разобраны. Официант обещает больше не считать чашку едой.",
      odd([
        [["essen", "trinken", "kochen", "die Tasse"], "die Tasse", "Die Tasse — предмет, остальное — действия."],
        [["das Brötchen", "das Fischbrötchen", "der Kuchen", "die Speisekarte"], "die Speisekarte", "Die Speisekarte — меню, его не едят."],
        [["nehmen", "bestellen", "bezahlen", "das Glas"], "das Glas", "Das Glas — предмет, остальное — глаголы."],
      ])),
  ],
  "04-receipt": [
    step("04-x-write", "Заказ на завтра", "Грета диктует по-русски, а записать нужно по-немецки: завтра придёт другой официант.", WRITE, HINT_WRITE, "Заказ записан. Новый официант поймёт его, даже если будет сонным.",
      write("Bestellung", [["есть", "essen"], ["пить", "trinken"], ["платить", "bezahlen"], ["хотеть пить", "Durst haben"], ["кусок", "das Stück"]])),
    step("04-x-letters", "Меню без букв", "Чайка опять добралась до букв, на этот раз в меню.", SPELL, HINT_SPELL, "Меню спасено. Чайка оставила только крошки.",
      letters(["der Saft", "der Fisch", "die Milch", "das Glas", "die Tasse"])),
    step("04-x-lock", "Кладовка кафе", "Кладовка кафе заперта словесным замком. Официант говорит, что это защита от Матео, и похоже, что так.", LOCK, HINT_LOCK, "Кладовка открыта. Матео уже стоит за спиной.",
      lock([
        ["Я хотел(а) бы кофе.", [["Ich", "Du", "Er"], ["möchte", "möchtest", "möchten"], ["einen Kaffee.", "ein Kaffee.", "eine Kaffee."]]],
        ["Хочешь воды?", [["Möchtest", "Möchte", "Möchten"], ["du", "ich", "er"], ["ein Wasser?", "einen Wasser?", "eine Wasser?"]]],
        ["Я не ем мясо.", [["Ich", "Du", "Wir"], ["esse", "isst", "essen"], ["kein Fleisch.", "nicht Fleisch.", "keinen Fleisch."]]],
      ])),
    step("04-x-letter", "Письмо перед ужином", "Том приглашён на ужин и пишет Дане, что он ест. Письмо Греты подойдёт как образец.", LETTER, HINT_LETTER, "Дана получила письмо. Матео спрашивает, можно ли ему то же самое, только больше.",
      letter("Dana", ["Lieber Mateo,", "ich esse gern Fisch. Ich trinke keinen Kaffee. Ich möchte einen Tee.", "Viele Grüße", "Greta"], [
        an("Liebe", "Dana"),
        ["Was essen Sie gern? → Salat", "Ich esse gern Salat."],
        ["Was trinken Sie nicht? → Cola", "Ich trinke keine Cola."],
        ["Was möchten Sie? → ein Wasser", "Ich möchte ein Wasser."],
        gruss("Tom"),
      ])),
    step("04-x-oral", "Разговор за столом", "В кафе можно репетировать сколько угодно: официант всё равно занят.", ORAL, HINT_ORAL, "Заказ принят. Кофе, правда, уже остыл, но это проблема кафе.",
      oral([
        say(2, ASK, "Thema: Essen · Wort: Frühstück", "Was essen Sie zum Frühstück?", "Что вы едите на завтрак?", "Was …?"),
        reply(2, ANSWER, "Was trinken Sie gern?", "Ich trinke gern Tee.", "Я люблю чай."),
        say(3, REQUEST, "☕", "Einen Kaffee, bitte.", "Кофе, пожалуйста."),
        reply(3, REACT, "Möchten Sie Milch?", "Ja, gern.", "Да, с удовольствием."),
      ])),
  ],
  "05-price": [
    step("05-x-amounts", "Лото у кассы", "Продавец объявляет упаковки, а Матео закрывает карточку, стараясь не считать в уме.", HEAR, HINT_HEAR, "Карточка закрыта. Продавец подозревает в вас покупателя оптом.",
      bingo(["ein Kilo", "ein Pfund", "100 Gramm", "ein Liter", "die Flasche", "die Packung", "die Dose", "die Tüte", "billig"])),
    step("05-x-docks", "Три вешалки", "Продавец развешивает товар на трёх стойках: der, die и das. На вопрос зачем он отвечает, что это Германия.", DOCK, HINT_DOCK, "Всё развешано. Покупатели смотрят с уважением и немного с опаской.",
      docks(["der Pullover", "die Jacke", "das T-Shirt", "die Größe", "die Farbe", "der Euro", "das Hemd", "die Hose"])),
  ],
  "05-change": [
    step("05-x-shop", "По отделам", "Магазин большой, а Грета торопится. Продавец называет товары, вы находите нужный отдел.", PICTURE, HINT_PICTURE, "Всё найдено. В корзине только то, что просили, что само по себе редкость.",
      scene([["der Apfel", "🍎"], ["die Banane", "🍌"], ["die Orange", "🍊"], ["die Erdbeere", "🍓"], ["die Kartoffel", "🥔"], ["die Zwiebel", "🧅"], ["die Gurke", "🥒"], ["die Hose", "👖"], ["der Schuh", "👟"]])),
    step("05-x-race", "Чайка на распродаже", "Двери магазина открыты, и чайка залетела в зал. Она уже нацелилась на ценники.", RACE, HINT_RACE, "Ценники целы. Чайку вывели, скидку ей не дали.",
      gull(["suchen", "teuer", "groß", "klein", "zu", "kaufen", "billig", "lang"])),
  ],
  "05-size": [
    step("05-x-say", "Слова покупателя", "Продавец просит повторить слова, которые спрашивают чаще всего.", SAY, HINT_SAY, "Звучит как настоящий покупатель. Осталось только не купить якорь.",
      speak(["kaufen", "brauchen", "finden"])),
    step("05-x-odd", "Не тот отдел", "На вешалках и полках кто-то всё перепутал.", ODD, HINT_ODD, "Отделы в порядке. Огурец вернулся к овощам.",
      odd([
        [["die Hose", "das Hemd", "das Kleid", "die Gurke"], "die Gurke", "Die Gurke — огурец, остальное — одежда."],
        [["der Mantel", "der Rock", "der Schuh", "die Dose"], "die Dose", "Die Dose — банка, остальное — одежда."],
        [["lang", "kurz", "schön", "kosten"], "kosten", "Kosten — глагол, остальное описывает вещь."],
      ])),
  ],
  "05-pronoun": [
    step("05-x-letters", "Ценники без букв", "Ценники намокли, и буквы расплылись. Восстановите слова.", SPELL, HINT_SPELL, "Ценники снова читаются. Цены, к сожалению, тоже.",
      letters(["die Hose", "das Hemd", "der Apfel", "der Rock", "das Kleid"])),
    step("05-x-write", "Список покупок", "Матео диктует список по-русски, а магазин немецкий.", WRITE, HINT_WRITE, "Список готов. Матео добавляет в него обед, но вы это не записываете.",
      write("Einkaufsliste", [["стоить", "kosten"], ["покупать", "kaufen"], ["дешёвый", "billig"], ["длинный", "lang"], ["красивый", "schön"], ["пальто", "der Mantel"]])),
    step("05-x-lock", "Касса с паролем", "Касса магазина открывается фразой. Продавец говорит, что это от воров, но сам забывает её каждое утро.", LOCK, HINT_LOCK, "Касса открыта. Продавец записывает фразу на бумажку и прячет её под кассу.",
      lock([
        ["Сколько стоит куртка?", [["Was", "Wo", "Wer"], ["kostet", "kosten", "kostest"], ["die Jacke?", "der Jacke?", "das Jacke?"]]],
        ["Свитер? Я беру его.", [["Ich", "Du", "Er"], ["nehme", "nimmst", "nimmt"], ["ihn.", "sie.", "es."]]],
        ["Футболка слишком большая.", [["Das T-Shirt", "Der T-Shirt", "Die T-Shirt"], ["ist", "bin", "bist"], ["zu groß.", "zu klein.", "sehr klein."]]],
      ])),
    step("05-x-letter", "Письмо из примерочной", "Ольга пишет Матео, что купила. Письмо Элиф подойдёт как образец, а вот покупки другие.", LETTER, HINT_LETTER, "Матео отвечает, что рынок ему всё равно нравится больше.",
      letter("Mateo", ["Liebe Greta,", "die Jacke ist zu groß. Der Pullover kostet 30 Euro. Ich nehme ihn.", "Viele Grüße", "Elif"], [
        an("Lieber", "Mateo"),
        ["Was ist zu klein? → die Hose", "Die Hose ist zu klein."],
        ["Was kostet der Rock? → 25 Euro", "Der Rock kostet 25 Euro."],
        ["Nehmen Sie den Rock? → ja", "Ich nehme ihn."],
        gruss("Olga"),
      ])),
    step("05-x-oral", "У прилавка", "Продавец не торопится, поэтому можно спокойно потренироваться прямо у кассы.", ORAL, HINT_ORAL, "Продавец впечатлён. Очередь нет.",
      oral([
        say(2, ASK, "Thema: Einkaufen · Wort: Preis", "Was kostet das?", "Сколько это стоит?", "Was …?"),
        reply(2, ANSWER, "Was kaufen Sie am Samstag?", "Ich kaufe Brot und Käse.", "Я покупаю хлеб и сыр."),
        say(3, REQUEST, "👕", "Ich möchte ein T-Shirt, bitte.", "Мне, пожалуйста, футболку."),
        reply(3, REACT, "Möchten Sie eine Tüte?", "Ja, bitte.", "Да, пожалуйста."),
      ])),
  ],
  "06-time": [
    step("06-x-days", "Лото расписания", "Хауке вешает на стену расписание недели и читает его вслух, чтобы никто не сказал, что не слышал.", HEAR, HINT_HEAR, "Расписание услышано. Отговорок стало меньше.",
      bingo(["der Montag", "der Mittwoch", "der Donnerstag", "der Freitag", "die Woche", "das Wochenende", "die Stunde", "die Minute", "der Abend"])),
    step("06-x-docks", "Три крючка", "Хауке вешает на доску три крючка: der, die и das. Дни недели, как выяснилось, все мужского рода, а вот ночь с ними не согласна.", DOCK, HINT_DOCK, "Всё на крючках. Хауке доволен и не скрывает этого целых три секунды.",
      docks(["die Uhr", "das Viertel", "der Morgen", "der Nachmittag", "die Nacht", "der Dienstag", "der Samstag", "der Sonntag"])),
  ],
  "06-frame": [
    step("06-x-day", "День Матео", "Матео нарисовал свой день в картинках, потому что так быстрее, чем писать.", PICTURE, HINT_PICTURE, "День восстановлен. Сон в него не поместился.",
      scene([["aufstehen", "⏰"], ["duschen", "🚿"], ["frühstücken", "🥣"], ["arbeiten", "💼"], ["aufräumen", "🧹"], ["fernsehen", "📺"], ["anrufen", "📞"], ["kochen", "🍳"]])),
    step("06-x-race", "Чайка и расписание", "Чайка решила, что расписание съедобно. Времени у неё больше, чем у вас, но и у неё оно кончается.", RACE, HINT_RACE, "Расписание спасено. Чайка уходит на обед точно по нему.",
      gull(["halb", "nach", "vor", "heute", "morgen", "einkaufen", "schlafen", "früh", "spät"])),
  ],
  "06-schedule": [
    step("06-x-say", "Который час?", "В клубе сломались часы. Теперь время нужно спрашивать вслух.", SAY, HINT_SAY, "Вопрос звучит чётко. Часы всё равно не отвечают.",
      speak(["Wie spät ist es?", "Wie viel Uhr ist es?", "der Feierabend"])),
    step("06-x-odd", "Страница из расписания", "В расписании попались слова из другой страницы.", ODD, HINT_ODD, "Расписание очищено. Пятница больше не притворяется частью суток.",
      odd([
        [["früh", "spät", "vor", "der Mittag"], "der Mittag", "Der Mittag — существительное, остальное описывает время."],
        [["der Vormittag", "der Mittag", "der Abend", "der Freitag"], "der Freitag", "Der Freitag — день недели, остальное — части суток."],
        [["anfangen", "aufhören", "dauern", "die Woche"], "die Woche", "Die Woche — существительное, остальное — глаголы."],
      ])),
  ],
  "06-call": [
    step("06-x-letters", "Стёртая доска", "Кто-то вытер доску рукавом. Слова нужно написать заново.", SPELL, HINT_SPELL, "Доска в порядке. Рукав пока не опознан.",
      letters(["die Woche", "die Stunde", "der Abend", "die Minute", "der Montag"])),
    step("06-x-write", "Заметки на неделю", "Хауке просит записать действия, которые команда постоянно путает.", WRITE, HINT_WRITE, "Заметки готовы. Команда обещает их прочитать, когда встанет.",
      write("Notizen", [["вставать", "aufstehen"], ["начинать", "anfangen"], ["заканчивать", "aufhören"], ["длиться", "dauern"], ["рано", "früh"], ["поздно", "spät"]])),
    step("06-x-lock", "Ящик с журналом", "Судовой журнал лежит в ящике с замком. Хауке признаётся, что выбрал фразы про время, потому что вечно опаздывает.", LOCK, HINT_LOCK, "Журнал у вас. В нём записано, что Хауке опоздал к собственному ящику.",
      lock([
        ["Я встаю в 7 часов.", [["Ich", "Du", "Er"], ["stehe", "stehst", "steht"], ["um sieben Uhr", "am sieben Uhr", "im sieben Uhr"], ["auf.", "an.", "aus."]]],
        ["Встреча начинается в понедельник.", [["Das Treffen", "Der Treffen", "Die Treffen"], ["fängt", "fange", "fangen"], ["am Montag", "um Montag", "im Montag"], ["an.", "auf.", "aus."]]],
        ["Я работаю с 9 до 5.", [["Ich", "Du", "Wir"], ["arbeite", "arbeitest", "arbeiten"], ["von neun", "um neun", "am neun"], ["bis fünf.", "nach fünf.", "vor fünf."]]],
      ])),
    step("06-x-letter", "Письмо о расписании", "Ян пишет Дане о своём дне. Письмо Элиф подойдёт как образец, только время другое.", LETTER, HINT_LETTER, "Дана вносит Яна в расписание. Хауке вносит его туда же, но на другое время.",
      letter("Dana", ["Hallo Hauke,", "ich stehe um sieben Uhr auf. Der Kurs fängt um neun Uhr an. Am Freitag habe ich Zeit.", "Viele Grüße", "Elif"], [
        an("Liebe", "Dana"),
        ["Wann stehen Sie auf? → um sechs Uhr", "Ich stehe um sechs Uhr auf."],
        ["Wann fängt die Arbeit an? → um acht Uhr", "Die Arbeit fängt um acht Uhr an."],
        ["Wann haben Sie Zeit? → am Montag", "Am Montag habe ich Zeit.", "Ich habe am Montag Zeit."],
        gruss("Jan"),
      ])),
    step("06-x-oral", "Который час", "Часы в клубе всё ещё сломаны, а значит, повод поговорить есть всегда.", ORAL, HINT_ORAL, "Время выяснено. Часы об этом не узнали.",
      oral([
        say(2, ASK, "Thema: Alltag · Wort: Arbeit", "Wann fängt Ihre Arbeit an?", "Когда начинается ваша работа?", "Wann …?"),
        reply(2, ANSWER, "Wann stehen Sie auf?", "Ich stehe um sieben Uhr auf.", "Я встаю в семь часов."),
        say(3, REQUEST, "🕐", "Wie spät ist es, bitte?", "Который час, скажите, пожалуйста?"),
        reply(3, REACT, "Haben Sie am Montag Zeit?", "Ja, am Montag habe ich Zeit.", "Да, в понедельник у меня есть время."),
      ])),
  ],
  "07-can": [
    step("07-x-places", "Лото выходного дня", "Команда выбирает, куда пойти в выходной, и Элиф зачитывает весь список.", HEAR, HINT_HEAR, "Список закрыт. Выбрать всё равно ничего не удалось.",
      bingo(["die Freizeit", "das Hobby", "der Sport", "der Film", "das Kino", "das Konzert", "das Schwimmbad", "der Park", "die Party"])),
    step("07-x-docks", "Стопки афиш", "У Элиф три стопки афиш: der, die и das. Выходной ещё не начался, а места в нём уже распределяются.", DOCK, HINT_DOCK, "Афиши разобраны. Решение, куда идти, опять отложено.",
      docks(["das Kino", "das Konzert", "das Schwimmbad", "der Park", "die Party", "der Film", "das Hobby", "die Idee"])),
  ],
  "07-want": [
    step("07-x-hobby", "Кто чем занимается", "На стене клуба висят рисунки с хобби участников. Подпишите их.", PICTURE, HINT_PICTURE, "Хобби подписаны. Хобби чайки решили не рисовать.",
      scene([["schwimmen", "🏊"], ["tanzen", "💃"], ["lesen", "📖"], ["grillen", "🍖"], ["Fußball spielen", "⚽"], ["Tennis spielen", "🎾"], ["Gitarre spielen", "🎸"], ["Fahrrad fahren", "🚲"], ["Musik hören", "🎧"]])),
    step("07-x-race", "Чайка и планы", "Команда обсуждает выходные, а чайка унесла листок с планами и возвращается за следующим.", RACE, HINT_RACE, "Планы спасены. Выполнять их всё равно никто не собирается.",
      gull(["fotografieren", "lieber", "am liebsten", "nicht gern", "zusammen", "können", "wollen", "Zeit haben"])),
  ],
  "07-prefer": [
    step("07-x-say", "Приглашение вслух", "Элиф тренирует, как звать людей на встречу и как отвечать на отказ.", SAY, HINT_SAY, "Звучит дружелюбно. Даже отказ звучит дружелюбно.",
      speak(["Freunde treffen", "ins Kino gehen", "Schade!"])),
    step("07-x-odd", "Планы в блокноте", "В блокноте планы смешались со словами о времени.", ODD, HINT_ODD, "Планы разобраны. Сегодня команда снова никуда не идёт, зато всё понимает.",
      odd([
        [["immer", "oft", "manchmal", "das Buch"], "das Buch", "Das Buch — книга, остальное говорит, как часто."],
        [["mitkommen", "einladen", "passen", "die Idee"], "die Idee", "Die Idee — существительное, остальное — глаголы."],
        [["die Idee", "die Einladung", "das Buch", "nie"], "nie", "Nie — наречие, остальное — существительные."],
      ])),
  ],
  "07-reply": [
    step("07-x-letters", "Афиша", "Дождь смыл половину букв с афиши у клуба.", SPELL, HINT_SPELL, "Афиша снова читается. Дождь не извинился.",
      letters(["das Kino", "das Buch", "der Film", "der Park", "der Sport"])),
    step("07-x-write", "Сообщение в чат", "Дана просит написать в общий чат несколько слов, чтобы все поняли план.", WRITE, HINT_WRITE, "Чат всё понял. Почти все ответили смайликом.",
      write("Chat", [["всегда", "immer"], ["никогда", "nie"], ["к сожалению", "leider"], ["приглашение", "die Einladung"], ["иногда", "manchmal"]])),
    step("07-x-lock", "Шкаф с ракетками", "Ракетки клуба заперты в шкафу. Элиф поставила такой же замок, чтобы их брали только те, кто умеет договариваться.", LOCK, HINT_LOCK, "Шкаф открыт. Ракетки есть, мячей нет, но это уже другая история.",
      lock([
        ["Я умею плавать.", [["Ich", "Du", "Er"], ["kann", "kannst", "können"], ["schwimmen.", "schwimme.", "schwimmt."]]],
        ["Мы хотим пойти в кино.", [["Wir", "Ich", "Er"], ["wollen", "will", "willst"], ["ins Kino", "im Kino", "in Kino"], ["gehen.", "gehe.", "geht."]]],
        ["Больше всего я люблю читать.", [["Am liebsten", "Lieber", "Gern"], ["lese", "lesen", "liest"], ["ich.", "du.", "er."]]],
      ])),
    step("07-x-letter", "Письмо с отказом", "Лена не может прийти и пишет Нильсу. Письмо Даны подойдёт как образец.", LETTER, HINT_LETTER, "Нильс не обиделся и уже позвал вместо вас чайку.",
      letter("Nils", ["Liebe Elif,", "am Samstag kann ich leider nicht kommen. Ich will am Sonntag ins Kino gehen. Kommst du mit?", "Viele Grüße", "Dana"], [
        an("Lieber", "Nils"),
        ["Wann können Sie nicht kommen? → am Freitag", "Am Freitag kann ich leider nicht kommen.", "Ich kann am Freitag leider nicht kommen.", "Am Freitag kann ich nicht kommen.", "Ich kann am Freitag nicht kommen."],
        ["Was wollen Sie machen? → am Samstag schwimmen gehen", "Ich will am Samstag schwimmen gehen.", "Am Samstag will ich schwimmen gehen."],
        ["Fragen Sie: Kommt Nils mit?", "Kommst du mit?"],
        gruss("Lena"),
      ])),
    step("07-x-oral", "Планы вслух", "Элиф считает, что договариваться надо вслух, иначе никто никуда не придёт.", ORAL, HINT_ORAL, "Договорились. Теперь осталось прийти.",
      oral([
        say(2, ASK, "Thema: Freizeit · Wort: Sport", "Machen Sie gern Sport?", "Вы любите заниматься спортом?", "Machen …?"),
        reply(2, ANSWER, "Was machen Sie am Wochenende?", "Am Wochenende gehe ich ins Kino.", "На выходных я иду в кино."),
        say(3, REQUEST, "🪟", "Können Sie bitte das Fenster öffnen?", "Откройте, пожалуйста, окно.", "Können Sie bitte …?"),
        reply(3, REACT, "Kommst du am Samstag mit?", "Leider nicht. Am Samstag arbeite ich.", "К сожалению, нет. В субботу я работаю."),
      ])),
  ],
  "08-where": [
    step("08-x-rooms", "Лото объявлений", "Йенсен читает вслух объявления о жилье, а гости закрывают карточки.", HEAR, HINT_HEAR, "Карточка закрыта. Подвал по-прежнему никому не нужен.",
      bingo(["die Wohnung", "das Bad", "der Flur", "der Keller", "das Treppenhaus", "das Wohnheim", "das Erdgeschoss", "die Möbel", "die Heizung"])),
    step("08-x-docks", "План дома", "На плане дома у каждой комнаты пустая табличка. Йенсен просит подписать артикли, пока гости не заблудились.", DOCK, HINT_DOCK, "План подписан. Кухню теперь найдёт даже Матео, особенно Матео.",
      docks(["das Haus", "das Zimmer", "das Wohnzimmer", "das Schlafzimmer", "die Küche", "der Tisch", "der Schrank", "der Kühlschrank"])),
  ],
  "08-case": [
    step("08-x-furniture", "Мебель для комнаты", "В гостевую комнату привезли мебель. Йенсен называет предметы, вы показываете, куда их нести.", PICTURE, HINT_PICTURE, "Комната обставлена. Диван занят: на нём уже спит Матео.",
      scene([["der Stuhl", "🪑"], ["das Bett", "🛏️"], ["das Sofa", "🛋️"], ["die Lampe", "💡"], ["die Waschmaschine", "🧺"], ["der Herd", "🔥"]])),
    step("08-x-race", "Чайка читает объявления", "На доске объявлений о жилье слабо держатся кнопки, и чайка этим пользуется.", RACE, HINT_RACE, "Объявления на месте. Чайка ищет жильё с видом на помойку.",
      gull(["die Anzeige", "groß – klein", "teuer – günstig", "hell – dunkel", "ruhig – laut", "neu – alt", "mieten", "die Miete"])),
  ],
  "08-ad": [
    step("08-x-say", "Осмотр квартиры", "На осмотре нужны всего три слова, чтобы звучать опытным арендатором.", SAY, HINT_SAY, "Хозяин слушает вас с уважением и слегка нервничает.",
      speak(["modern", "möbliert", "kaputt"])),
    step("08-x-odd", "Папка арендатора", "В папке об аренде оказались лишние листы.", ODD, HINT_ODD, "Папка разобрана. Квадратные метры подсчитаны.",
      odd([
        [["die Kaltmiete", "die Warmmiete", "die Nebenkosten", "der Balkon"], "der Balkon", "Der Balkon — часть квартиры, остальное — деньги."],
        [["der Schreibtisch", "der Kleiderschrank", "der Herd", "der Vermieter"], "der Vermieter", "Der Vermieter — человек, остальное — мебель и техника."],
        [["hell – dunkel", "ruhig – laut", "neu – alt", "der Quadratmeter"], "der Quadratmeter", "Der Quadratmeter — мера площади, остальное — пары противоположностей."],
      ])),
  ],
  "08-compound": [
    step("08-x-letters", "Этикетки на коробках", "На коробках с мебелью отклеились этикетки.", SPELL, HINT_SPELL, "Коробки подписаны. Этикетки держатся на честном слове.",
      letters(["das Bett", "das Sofa", "der Stuhl", "die Lampe", "das Bad"])),
    step("08-x-write", "Письмо хозяину", "Грета просит записать слова для письма хозяину жилья.", WRITE, HINT_WRITE, "Письмо готово. Хозяин ответит, когда найдёт очки.",
      write("An den Vermieter", [["снимать", "mieten"], ["арендная плата", "die Miete"], ["квартира", "die Wohnung"], ["красивый", "schön"]])),
    step("08-x-lock", "Дверь в подвал", "Подвал клуба закрыт. Йенсен потерял ключ и поставил замок, который открывается описанием того, где что лежит.", LOCK, HINT_LOCK, "Подвал открыт. Там темно, сыро и лежит тот самый ключ.",
      lock([
        ["Чашка на кухне.", [["Die Tasse", "Der Tasse", "Das Tasse"], ["ist", "bin", "sind"], ["in der Küche.", "in die Küche.", "im Küche."]]],
        ["Ключ лежит на столе.", [["Der Schlüssel", "Das Schlüssel", "Die Schlüssel"], ["liegt", "liege", "liegst"], ["auf dem Tisch.", "auf der Tisch.", "auf den Tisch."]]],
        ["Диван стоит в гостиной.", [["Das Sofa", "Der Sofa", "Die Sofa"], ["steht", "stehe", "stehst"], ["im Wohnzimmer.", "in der Wohnzimmer.", "in Wohnzimmer."]]],
      ])),
    step("08-x-letter", "Письмо о квартире", "Том переехал и пишет Грете. Письмо Даны подойдёт как образец, только квартира другая.", LETTER, HINT_LETTER, "Грета хочет посмотреть квартиру. Матео хочет посмотреть кухню.",
      letter("Greta", ["Lieber Herr Jensen,", "meine Wohnung ist klein, aber schön. Das Bad ist neu. Der Schlüssel liegt auf dem Tisch.", "Viele Grüße", "Dana"], [
        an("Liebe", "Greta"),
        ["Wie ist Ihre Wohnung? → groß und hell", "Meine Wohnung ist groß und hell."],
        ["Wo ist die Waschmaschine? → im Keller", "Die Waschmaschine ist im Keller.", "Die Waschmaschine steht im Keller."],
        ["Wo liegt der Schlüssel? → auf dem Schrank", "Der Schlüssel liegt auf dem Schrank."],
        gruss("Tom"),
      ])),
    step("08-x-oral", "Осмотр вслух", "Хозяин квартиры глуховат, поэтому все вопросы лучше заранее произнести чётко.", ORAL, HINT_ORAL, "Хозяин всё понял. Или кивает из вежливости.",
      oral([
        say(2, ASK, "Thema: Wohnen · Wort: Zimmer", "Wie viele Zimmer hat Ihre Wohnung?", "Сколько комнат в вашей квартире?", "Wie viele …?"),
        reply(2, ANSWER, "Wie ist Ihre Wohnung?", "Meine Wohnung ist klein, aber schön.", "Моя квартира маленькая, но красивая."),
        say(3, REQUEST, "💡", "Können Sie bitte das Licht anmachen?", "Включите, пожалуйста, свет.", "Können Sie bitte …?"),
        reply(3, REACT, "Wo ist das Bad, bitte?", "Das Bad ist links.", "Ванная слева."),
      ])),
  ],
  "09-route": [
    step("09-x-city", "Лото на остановке", "Автобус опаздывает. Дана читает вслух слова с городской схемы, чтобы не скучать.", HEAR, HINT_HEAR, "Карточка закрыта. Автобус всё ещё опаздывает.",
      bingo(["der Platz", "die Straße", "das Rathaus", "das Bürgeramt", "der Arzt", "die Fahrkarte", "das Gleis", "die Linie", "die S-Bahn"])),
    step("09-x-docks", "Схема из трёх линий", "На схеме Даны три цвета линий: der, die и das. Настоящий транспорт устроен иначе, но эта схема ей нравится больше.", DOCK, HINT_DOCK, "Схема готова. Автобус по-прежнему не в курсе.",
      docks(["der Bahnhof", "die Haltestelle", "die Post", "die Apotheke", "der Bus", "das Rathaus", "die Straße", "der Platz"])),
  ],
  "09-dativ": [
    step("09-x-transport", "Город из окна", "За окном автобуса мелькает город. Дана называет то, что видит, а вы ищете на схеме.", PICTURE, HINT_PICTURE, "Схема изучена. Светофор всё это время горел красным.",
      scene([["die Straßenbahn", "🚋"], ["die U-Bahn", "🚇"], ["der Zug", "🚆"], ["das Auto", "🚗"], ["das Fahrrad", "🚲"], ["das Taxi", "🚕"], ["die Ampel", "🚦"], ["die Bank", "🏦"], ["der Supermarkt", "🛒"]])),
    step("09-x-race", "Чайка на перекрёстке", "Чайка села на указатель и выдёргивает из него слова. Гости вот-вот собьются с пути.", RACE, HINT_RACE, "Указатель цел. Чайка улетела строго geradeaus.",
      gull(["Wohin?", "geradeaus", "links", "rechts", "weit", "zu Fuß", "in der Nähe", "umsteigen"])),
  ],
  "09-directions": [
    step("09-x-say", "Спросить дорогу", "Дана учит, как вежливо остановить прохожего и узнать дорогу.", SAY, HINT_SAY, "Прохожий останавливается. Значит, произношение уже работает.",
      speak(["Entschuldigung!", "Wie komme ich zum …?", "in der Nähe"])),
    step("09-x-odd", "Схема транспорта", "На схеме перепутаны подписи.", ODD, HINT_ODD, "Схема исправлена. Больница больше не числится остановкой автобуса.",
      odd([
        [["einsteigen", "aussteigen", "umsteigen", "weit"], "weit", "Weit — далеко, остальное — действия в транспорте."],
        [["die Fahrkarte", "das Gleis", "die Linie", "das Krankenhaus"], "das Krankenhaus", "Das Krankenhaus — больница, остальное связано с поездкой."],
        [["zu Fuß", "in der Nähe", "weit", "das Taxi"], "das Taxi", "Das Taxi — транспорт, остальное говорит о пути."],
      ])),
  ],
  "09-home": [
    step("09-x-letters", "Указатели", "Ветер повернул указатели, а чайка снова занялась буквами.", SPELL, HINT_SPELL, "Указатели на месте. Чайка смотрит на следующий.",
      letters(["der Zug", "das Auto", "das Taxi", "der Platz", "die Bank"])),
    step("09-x-write", "Записка для гостей", "Гостям нужна короткая записка о том, как добраться.", WRITE, HINT_WRITE, "Гости доберутся. Даже если выйдут не там.",
      write("Für die Gäste", [["пешком", "zu Fuß"], ["садиться в транспорт", "einsteigen"], ["выходить из транспорта", "aussteigen"], ["пересаживаться", "umsteigen"]])),
    step("09-x-lock", "Велосипед Даны", "Велосипед Даны пристёгнут словесным замком. Дана говорит, что угнать его сможет только тот, кто знает Dativ.", LOCK, HINT_LOCK, "Замок снят. Велосипед на месте, спущено только одно колесо.",
      lock([
        ["Я еду на автобусе.", [["Ich", "Du", "Er"], ["fahre", "fährst", "fährt"], ["mit dem Bus.", "mit der Bus.", "mit den Bus."]]],
        ["Идите прямо!", [["Gehen", "Gehe", "Geht"], ["Sie", "ich", "er"], ["geradeaus!", "links!", "rechts!"]]],
        ["Мы идём к вокзалу.", [["Wir", "Ich", "Er"], ["gehen", "gehe", "geht"], ["zum Bahnhof.", "zur Bahnhof.", "zu Bahnhof."]]],
      ])),
    step("09-x-letter", "Письмо о дороге", "Лена объясняет Хауке, как доберётся. Письмо Матео подойдёт как образец.", LETTER, HINT_LETTER, "Хауке знает маршрут. Автобус по-прежнему нет.",
      letter("Hauke", ["Liebe Dana,", "ich komme heute mit dem Bus und bin um zehn Uhr am Bahnhof. Dann gehe ich zum Hafen. Wir treffen uns am Café.", "Viele Grüße", "Mateo"], [
        an("Lieber", "Hauke"),
        ["Wie kommen Sie heute? Wann sind Sie da? → mit der Straßenbahn, um neun Uhr am Bahnhof", "Ich komme heute mit der Straßenbahn und bin um neun Uhr am Bahnhof."],
        ["Wohin gehen Sie dann? → zur Post", "Dann gehe ich zur Post."],
        ["Wo treffen Sie sich? → am Rathaus", "Wir treffen uns am Rathaus."],
        gruss("Lena"),
      ])),
    step("09-x-oral", "Спросить в городе", "На остановке тихо, и Дана предлагает прогнать всё вслух, пока нет автобуса.", ORAL, HINT_ORAL, "Отлично. Автобус пришёл как раз тогда, когда вы закончили, то есть с опозданием.",
      oral([
        say(2, ASK, "Thema: Stadt · Wort: Bahnhof", "Wo ist der Bahnhof?", "Где вокзал?", "Wo …?"),
        reply(2, ANSWER, "Wie kommen Sie zur Arbeit?", "Ich fahre mit dem Bus.", "Я езжу на автобусе."),
        say(3, REQUEST, "🎫", "Ich möchte eine Fahrkarte nach Hamburg, bitte.", "Мне, пожалуйста, билет до Гамбурга."),
        reply(3, REACT, "Wie komme ich zur Post?", "Gehen Sie geradeaus und dann links.", "Идите прямо, а потом налево."),
      ])),
  ],
  "10-reception": [
    step("10-x-health", "Лото в приёмной", "В приёмной долго ждать, и фрау Кляйн читает вслух слова с плаката.", HEAR, HINT_HEAR, "Карточка закрыта. Очередь не сдвинулась, зато словарь вырос.",
      bingo(["die Erkältung", "das Fieber", "der Husten", "der Schnupfen", "der Schmerz", "das Rezept", "die Tablette", "das Medikament", "der Termin"])),
    step("10-x-docks", "Три лотка", "У фрау Кляйн на стойке три лотка для карточек: der, die и das. Она просит разложить их, пока врач занят.", DOCK, HINT_DOCK, "Карточки в лотках. Мы по-прежнему не лечим, а только раскладываем.",
      docks(["die Praxis", "der Termin", "das Rezept", "die Tablette", "der Husten", "das Fieber", "der Schmerz", "die Erkältung"])),
  ],
  "10-symptom": [
    step("10-x-body", "Плакат в приёмной", "На плакате человек без подписей. Фрау Кляйн называет части тела, а вы показываете.", PICTURE, HINT_PICTURE, "Плакат подписан. Матео проверил, всё ли у него на месте.",
      scene([["das Auge", "👁️"], ["das Ohr", "👂"], ["die Nase", "👃"], ["der Zahn", "🦷"], ["die Hand", "✋"], ["das Bein", "🦵"], ["der Fuß", "🦶"], ["der Arm", "💪"]])),
    step("10-x-race", "Чайка в коридоре", "Окно в коридоре приоткрыто, и чайка уже внутри. Фрау Кляйн смотрит на неё так, что чайка почти сомневается.", RACE, HINT_RACE, "Слова спасены. Чайка записана на приём, но не придёт.",
      gull(["gehen", "müssen", "dürfen", "bleiben", "rauchen", "krank", "gesund", "wehtun"])),
  ],
  "10-modal": [
    step("10-x-say", "Пожелание больному", "Дана учит Матео, что сказать тому, кто заболел.", SAY, HINT_SAY, "Матео говорит это даже здоровым. Те немного волнуются.",
      speak(["Gute Besserung!", "krank", "gesund"])),
    step("10-x-odd", "Шкафчик фрау Кляйн", "В шкафчике перемешаны карточки.", ODD, HINT_ODD, "Шкафчик в порядке. Никаких советов по лечению мы не даём.",
      odd([
        [["der Hals", "der Arm", "die Hand", "das Wartezimmer"], "das Wartezimmer", "Das Wartezimmer — приёмная, остальное — части тела."],
        [["bleiben", "rauchen", "trinken", "das Rezept"], "das Rezept", "Das Rezept — рецепт, остальное — глаголы."],
        [["das Wartezimmer", "die Versichertenkarte", "der Termin", "die Nase"], "die Nase", "Die Nase — нос, остальное связано с визитом к врачу."],
      ])),
  ],
  "10-sit": [
    step("10-x-letters", "Буквы на табличках", "Таблички на дверях поблёкли от времени.", SPELL, HINT_SPELL, "Таблички снова видны. Дверь в кабинет всё равно закрыта.",
      letters(["der Hals", "der Fuß", "die Hand", "der Zahn", "die Nase"])),
    step("10-x-write", "Запись в блокнот", "Дана просит записать слова для похода к врачу.", WRITE, HINT_WRITE, "Блокнот пополнен. Лечение остаётся делом врача.",
      write("Notizbuch", [["оставаться", "bleiben"], ["курить", "rauchen"], ["болеть (о части тела)", "wehtun"], ["врач", "der Arzt"], ["запись к врачу", "der Termin"]])),
    step("10-x-lock", "Аптечка клуба", "Аптечка клуба тоже на замке, чтобы Матео не принимал всё подряд. Дана подобрала фразы к случаю.", LOCK, HINT_LOCK, "Аптечка открыта. Внутри пластырь, а советы по лечению остаются за врачом.",
      lock([
        ["Мне нужно к врачу.", [["Ich", "Du", "Er"], ["muss", "musst", "müssen"], ["zum Arzt", "zur Arzt", "zu Arzt"], ["gehen.", "gehe.", "geht."]]],
        ["Вам нельзя курить.", [["Sie", "Ich", "Du"], ["dürfen", "darf", "darfst"], ["nicht rauchen.", "nicht rauche.", "kein rauchen."]]],
        ["У меня болит голова.", [["Ich", "Du", "Er"], ["habe", "hast", "hat"], ["Kopfschmerzen.", "Kopf Schmerzen.", "Schmerzen Kopf."]]],
      ])),
    step("10-x-letter", "Письмо о болезни", "Ян заболел и пишет Йенсену. Письмо Хауке подойдёт как образец.", LETTER, HINT_LETTER, "Йенсен желает скорейшего выздоровления и напоминает, что печать ждёт.",
      letter("Herr Jensen", ["Liebe Frau Petersen,", "ich bin krank und kann heute nicht arbeiten. Ich muss im Bett bleiben. Am Montag komme ich wieder.", "Viele Grüße", "Hauke"], [
        an("Lieber", "Herr Jensen"),
        ["Warum können Sie nicht kommen? → eine Erkältung", "Ich habe eine Erkältung und kann heute nicht kommen."],
        ["Was müssen Sie machen? → zum Arzt gehen", "Ich muss zum Arzt gehen."],
        ["Wann kommen Sie wieder? → am Mittwoch", "Am Mittwoch komme ich wieder.", "Ich komme am Mittwoch wieder."],
        gruss("Jan"),
      ])),
    step("10-x-oral", "В приёмной", "Пока очередь не двигается, фрау Кляйн разрешает потренироваться, только негромко.", ORAL, HINT_ORAL, "Фрау Кляйн кивает. Советы по лечению по-прежнему даёт только врач.",
      oral([
        say(2, ASK, "Thema: Gesundheit · Wort: Arzt", "Wann gehen Sie zum Arzt?", "Когда вы идёте к врачу?", "Wann …?"),
        reply(2, ANSWER, "Was fehlt Ihnen?", "Ich habe Kopfschmerzen.", "У меня болит голова."),
        say(3, REQUEST, "💊", "Können Sie mir bitte eine Tablette geben?", "Дайте мне, пожалуйста, таблетку.", "Können Sie mir bitte …?"),
        reply(3, REACT, "Darf ich hier rauchen?", "Nein, hier dürfen Sie nicht rauchen.", "Нет, здесь нельзя курить."),
      ])),
  ],
  "11-job": [
    step("11-x-work", "Лото вакансий", "Петерсен читает вслух объявления о работе. Матео слушает внимательнее обычного.", HEAR, HINT_HEAR, "Карточка закрыта. Предложений пока нет, зато слова есть.",
      bingo(["die Arbeit", "der Beruf", "die Stelle", "die Firma", "das Krankenhaus", "der Kollege", "das Vorstellungsgespräch", "der Krankenpfleger", "die Lehrerin"])),
    step("11-x-docks", "Папки отдела", "Петерсен завела в офисе три папки: der, die и das. Профессии, фирмы и должности теперь лежат раздельно.", DOCK, HINT_DOCK, "Папки полны. Петерсен улыбается второй раз за месяц.",
      docks(["die Arbeit", "der Beruf", "die Stelle", "die Firma", "die Ärztin", "der Koch", "der Verkäufer", "der Kollege"])),
  ],
  "11-perfect": [
    step("11-x-people", "Кто кем работает", "На стене офиса висят рисунки к докладу о профессиях.", PICTURE, HINT_PICTURE, "Рисунки подписаны. Профессия чайки по-прежнему неизвестна.",
      scene([["der Lehrer", "🧑‍🏫"], ["die Köchin", "👩‍🍳"], ["der Student", "🧑‍🎓"], ["der Mechaniker", "🧑‍🔧"], ["der Informatiker", "🧑‍💻"], ["der Friseur", "💇"]])),
    step("11-x-race", "Чайка и прошлое", "Чайка стащила страницу из журнала и теперь знает слишком много о вчерашнем дне.", RACE, HINT_RACE, "Страница возвращена. Что чайка успела прочитать, неизвестно.",
      gull(["gestern", "noch nicht", "jetzt", "schon", "früher", "letzte Woche", "letztes Jahr", "arbeiten als"])),
  ],
  "11-was": [
    step("11-x-say", "Когда это было", "Для рассказа о прошлом нужны слова времени. Петерсен просит произнести их отчётливо.", SAY, HINT_SAY, "Прошлое звучит уверенно. Осталось его восстановить.",
      speak(["gestern Abend", "letzte Woche", "letztes Jahr"])),
    step("11-x-odd", "Личные дела", "В папках сотрудников оказались чужие листы.", ODD, HINT_ODD, "Папки в порядке. Лишняя бумага отправлена в корзину, корзина довольна.",
      odd([
        [["die Verkäuferin", "die Kellnerin", "die Köchin", "der Ingenieur"], "der Ingenieur", "Der Ingenieur — мужская форма, остальное — женские."],
        [["gestern Abend", "letzte Woche", "früher", "die Firma"], "die Firma", "Die Firma — организация, остальное говорит о времени."],
        [["der Kollege", "der Hausmann", "der Student", "schon"], "schon", "Schon — наречие, остальное — люди."],
      ])),
  ],
  "11-account": [
    step("11-x-letters", "Бейджи для встречи", "Бейджи напечатались с пропусками.", SPELL, HINT_SPELL, "Бейджи готовы. Принтер делает вид, что так и задумано.",
      letters(["die Arbeit", "der Beruf", "die Firma", "die Stelle", "der Lehrer"])),
    step("11-x-write", "Биография для клуба", "Матео рассказывает о себе, а записать нужно по-немецки.", WRITE, HINT_WRITE, "Биография готова. В ней нет ни слова о чайке, и это к лучшему.",
      write("Lebenslauf", [["работать кем-то", "arbeiten als"], ["уже", "schon"], ["раньше", "früher"], ["продавщица", "die Verkäuferin"], ["официантка", "die Kellnerin"]])),
    step("11-x-lock", "Архив клуба", "Архив открывается фразами о прошлом. Йенсен считает, что к истории клуба нужно допускать только тех, кто знает Perfekt.", LOCK, HINT_LOCK, "Архив открыт. Самая старая запись: «Чайка украла печать».",
      lock([
        ["Вчера я работал(а).", [["Ich", "Du", "Er"], ["habe", "hast", "hat"], ["gestern", "morgen", "jetzt"], ["gearbeitet.", "arbeiten.", "arbeite."]]],
        ["Что ты делал(а) вчера?", [["Was", "Wer", "Wo"], ["hast", "hat", "habe"], ["du", "er", "ich"], ["gestern gemacht?", "gestern machen?", "morgen gemacht?"]]],
        ["У неё не было времени.", [["Sie", "Ich", "Du"], ["hatte", "hattest", "hatten"], ["keine Zeit.", "kein Zeit.", "keinen Zeit."]]],
      ])),
    step("11-x-letter", "Письмо о вчерашнем дне", "Марек извиняется перед Элиф: он не позвонил. Письмо Петерсен подойдёт как образец.", LETTER, HINT_LETTER, "Элиф прощает Марека. В журнале это отмечено.",
      letter("Elif", ["Lieber Nils,", "ich habe gestern viel gearbeitet und hatte keine Zeit. Heute Abend habe ich Zeit. Rufst du mich an?", "Viele Grüße", "Frau Petersen"], [
        an("Liebe", "Elif"),
        ["Was haben Sie gestern gemacht? → viel gelernt, keine Zeit", "Ich habe gestern viel gelernt und hatte keine Zeit."],
        ["Wann haben Sie Zeit? → morgen Abend", "Morgen Abend habe ich Zeit.", "Ich habe morgen Abend Zeit."],
        ["Fragen Sie: Ruft Elif an?", "Rufst du mich an?"],
        gruss("Marek"),
      ])),
    step("11-x-oral", "Перед собеседованием", "Петерсен изображает строгого работодателя. Получается пугающе убедительно.", ORAL, HINT_ORAL, "Вас бы взяли. Петерсен этого, конечно, не скажет.",
      oral([
        say(1, "Скажите, кем вы работаете.", "Beruf", "Ich arbeite als Koch.", "Я работаю поваром."),
        say(2, ASK, "Thema: Arbeit · Wort: Beruf", "Was sind Sie von Beruf?", "Кто вы по профессии?", "Was …?"),
        reply(2, ANSWER, "Was haben Sie gestern gemacht?", "Gestern habe ich gearbeitet.", "Вчера я работал(а)."),
        say(3, REQUEST, "🖊️", "Können Sie mir bitte einen Stift geben?", "Дайте мне, пожалуйста, ручку.", "Können Sie mir bitte …?"),
      ])),
  ],
  "12-weather": [
    step("12-x-travel", "Лото перед дорогой", "Гости обсуждают обратный путь, а Хауке читает слова с листа подготовки.", HEAR, HINT_HEAR, "Карточка закрыта. Гости готовы, их чемоданы пока нет.",
      bingo(["die Reise", "der Urlaub", "der Flughafen", "die Verspätung", "die Durchsage", "das Einzelzimmer", "das Doppelzimmer", "die Anreise", "die Abreise"])),
    step("12-x-docks", "Багаж у причалов", "Перед отъездом багаж гостей стоит у трёх причалов. Хауке читает бирки, но артикли на них стёрлись.", DOCK, HINT_DOCK, "Багаж на местах. Корабля нет, но это уже не к вам.",
      docks(["die Reise", "der Urlaub", "der Flughafen", "die Verspätung", "das Hotel", "der Koffer", "das Wetter", "das Datum"])),
  ],
  "12-perfect": [
    step("12-x-season", "Открытки из альбома", "Грета показывает открытки из разных поездок и времён года.", PICTURE, HINT_PICTURE, "Открытки разобраны. Лето оказалось самым коротким.",
      scene([["das Flugzeug", "✈️"], ["der Koffer", "🧳"], ["der Regenschirm", "☂️"], ["das Hotel", "🏨"], ["Die Sonne scheint.", "☀️"], ["Es schneit.", "❄️"], ["der Frühling", "🌷"], ["der Sommer", "🏖️"], ["der Herbst", "🍂"], ["der Winter", "⛄"]])),
    step("12-x-race", "Последняя погоня", "Чайка знает, что дело подходит к концу, и в последний раз идёт на перехват. Прогноз погоды ей особенно нужен.", RACE, HINT_RACE, "Вы быстрее. Чайка признаёт это, но только один раз.",
      gull(["warm", "kalt", "sonnig", "bewölkt", "windig", "der Monat", "die Jahreszeit", "das Datum"])),
  ],
  "12-date": [
    step("12-x-say", "Прогноз погоды", "Хауке читает прогноз и просит вас повторить его для тех, кто опоздал.", SAY, HINT_SAY, "Прогноз передан. Погода, как обычно, не согласовала его с вами.",
      speak(["Die Sonne scheint.", "Es schneit.", "Es sind 20 Grad."])),
    step("12-x-odd", "Лист с погодой", "На листе о погоде оказались чужие слова.", ODD, HINT_ODD, "Лист разобран. Чемодан больше не считается временем года.",
      odd([
        [["sonnig", "bewölkt", "windig", "der Monat"], "der Monat", "Der Monat — месяц, остальное описывает погоду."],
        [["warm", "kalt", "bewölkt", "die Person"], "die Person", "Die Person — человек, остальное описывает погоду."],
        [["die Jahreszeit", "der Monat", "das Datum", "der Koffer"], "der Koffer", "Der Koffer — чемодан, остальное связано с календарём."],
      ])),
  ],
  "12-deduction": [
    step("12-x-letters", "Последние буквы", "Для финальной доски не хватает нескольких слов. Чайка возвращает буквы, делая вид, что нашла их случайно.", SPELL, HINT_SPELL, "Доска готова. Чайка принимает благодарность как должное.",
      letters(["die Reise", "das Hotel", "das Wetter", "der Winter", "der Sommer"])),
    step("12-x-write", "Запись перед финалом", "Йенсен просит записать последние слова в журнал клуба.", WRITE, HINT_WRITE, "Журнал заполнен. Осталось поставить последнюю точку.",
      write("Clubjournal", [["бронировать", "reservieren"], ["каникулы", "die Ferien"], ["погода", "das Wetter"], ["время года", "die Jahreszeit"], ["дата", "das Datum"]])),
    step("12-x-lock", "Последний замок", "Ящик с финальной доской закрыт. Йенсен выбрал фразы о том, кто куда приехал и когда: так, говорит, удобнее закрывать дела.", LOCK, HINT_LOCK, "Последний замок открыт. Йенсен обещает заменить его цифровым и тут же забывает об этом.",
      lock([
        ["Мы поехали в Киль.", [["Wir", "Ich", "Er"], ["sind", "bin", "ist"], ["nach Kiel", "in Kiel", "aus Kiel"], ["gefahren.", "fahren.", "gefährt."]]],
        ["Он приехал вчера.", [["Er", "Ich", "Wir"], ["ist", "bin", "sind"], ["gestern", "morgen", "jetzt"], ["angekommen.", "ankommen.", "ankommt."]]],
        ["Первого июня я в Киле.", [["Am ersten Juni", "Um ersten Juni", "Im ersten Juni"], ["bin", "bist", "ist"], ["ich", "du", "er"], ["in Kiel.", "nach Kiel.", "aus Kiel."]]],
      ])),
    step("12-x-letter", "Письмо с дороги", "Дана пишет Йенсену из поездки. Письмо Хауке подойдёт как образец.", LETTER, HINT_LETTER, "Йенсен подшил письмо к делу. Теперь в нём есть и погода.",
      letter("Herr Jensen", ["Liebe Greta,", "wir sind gut in Hamburg angekommen. Das Wetter ist schön und warm. Am ersten Juni fahren wir nach Hause.", "Viele Grüße", "Hauke"], [
        an("Lieber", "Herr Jensen"),
        ["Wo sind Sie angekommen? → gut in Berlin", "Wir sind gut in Berlin angekommen."],
        ["Wie ist das Wetter? → schlecht und kalt", "Das Wetter ist schlecht und kalt."],
        ["Wann fahren Sie nach Hause? → am zweiten Juli", "Am zweiten Juli fahren wir nach Hause.", "Wir fahren am zweiten Juli nach Hause."],
        gruss("Dana"),
      ])),
    step("12-x-oral", "Последняя репетиция", "Гости уезжают, а Хауке просит напоследок поговорить с ним по-немецки.", ORAL, HINT_ORAL, "Хауке доволен. Чайка делает вид, что всё поняла.",
      oral([
        say(2, ASK, "Thema: Reisen · Wort: Urlaub", "Wohin fahren Sie im Urlaub?", "Куда вы едете в отпуск?", "Wohin …?"),
        reply(2, ANSWER, "Wie war Ihre Reise?", "Die Reise war schön.", "Поездка была хорошей."),
        say(3, REQUEST, "🧳", "Können Sie mir bitte mit dem Koffer helfen?", "Помогите мне, пожалуйста, с чемоданом.", "Können Sie mir bitte …?"),
        reply(3, REACT, "Wie ist das Wetter heute?", "Heute scheint die Sonne.", "Сегодня светит солнце."),
      ])),
  ],
};
