import { an, ANSWER, ASK, bingo, docks, gaps, gruss, gull as race, HINT_DOCK, HINT_HEAR, HINT_LETTER, HINT_LOCK, HINT_ODD, HINT_ORAL, HINT_PICTURE, HINT_RACE, HINT_SAY, letter, lock, odd, oral, order, RACE, RACE_STAKES, reply as oralReply, REQUEST, say as oralSay, scene, sort, spot, verdict } from "../build.ts";
import { phrases } from "../data.ts";
import type { Challenge, Episode, SceneNode } from "../types.ts";

// Глава 9 в формате сцен (A1-PLOT.md, «Формат сцен»): город и транспорт, mit/zu/bei/nach с
// дательным, zum/zur, повелительное наклонение на Sie, zu Hause / nach Hause. Вопрос главы — как
// найти мастерскую. Вход — адрес Farbenweg 7 и билет в Gaarden, выход — закрытая мастерская
// («Wir sind beim Arzt»), в окне цела табличка, а Грета с молчаливым мужчиной в шарфе у врача.
// Повороты брошены оракулом (seed 1794161939), увязка — в журнале A1-STORYCRAFT.md.

const narr = (text: string): SceneNode => ({ t: "narr", text });
const learn = (words?: string[]) => (words ? { learn: words } : {});
const hauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Hauke", voice: "Rocko", de, ru, ...learn(words) });
const elif = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Elif", voice: "Flo", de, ru, ...learn(words) });
const dana = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Dana", voice: "Anna", de, ru, ...learn(words) });
const mateo = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Mateo", voice: "Reed", de, ru, ...learn(words) });
const frauke = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frauke", voice: "Sandy", de, ru, ...learn(words) });
const yilmaz = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Frau Yilmaz", voice: "Shelley", de, ru, ...learn(words) });
const fahrer = (de: string, ru: string, words?: string[]): SceneNode => ({ t: "say", who: "Busfahrer", voice: "Eddy", de, ru, ...learn(words) });
const wirtin = (de: string, ru: string): SceneNode => ({ t: "say", who: "Wirtin", voice: "Sandy", de, ru });
/** Пары памяти — из выражений истории, которые глава уже показала. */
const memory = (ids: string[]): Challenge => ({ kind: "memory", pairs: ids.map((id) => ({ id, de: phrases[id].de, ru: phrases[id].ru })) });
const clock = (answer: string, traps: Record<string, string>): Challenge => ({ kind: "clock", start: "12:00", step: 15, answer, traps });
const ok = (text: string) => ({ text, ok: true as const });
const no = (text: string, react: string) => ({ text, react });

const DANA_PLAN = "Ich arbeite heute im Krankenhaus – bis zwei. Um drei bin ich bei der Post in Gaarden!";
const ANSAGE = "Achtung, bitte! Heute fährt keine Fähre. Sturm! Nehmen Sie den Bus!";
const VOLL = "Und das Auto ist voll: Fischbrötchen für die Kieler Woche! Kein Platz für dich.";
const MATEO_WEG = "Die Werkstatt? ¡Claro! Gehen Sie todo recto – straight – geradeaus! An der zweiten Ampel a la derecha – right – rechts!";
const HAUKE_WEG = "Ich habe den Weg! Von der Briefträgerin: Der Farbenweg ist hinter der Post. Durch den Hinterhof!";
const YILMAZ_ARZT = "Moin, Hauke! Suchen Sie die Mechanikerin? Sie ist beim Arzt – mit einem Mann. Er hat einen Schal und sagt nichts. Nicht mal Moin!";

// Сцена 1 · пролог и завязка: шторм, план на Gaarden и обещанная машина. Бросок: новый человек ·
// Элиф · опоздать · die Post · 8 — Элиф опаздывает: отправляла с почты письмо на Гельголанд, откуда
// кольцо чайки. Бросок: неприятность · Грета · забыть · die Straßenbahn · 3 (мелочь) — Грета забыла
// в комнате старый план города: на нём ещё ходит трамвай, которого в Киле нет с 1985 года.
const sturm: SceneNode[] = [
  { t: "pic", src: "09-sturm.jpg", alt: "Утро вторника в клубе, за окном шторм гнёт мачты: Дана в тренче смотрит в телефон, Хауке гордо крутит на пальце чужие ключи от машины, Матео с термосом" },
  narr("Neunter Tag, Dienstag, noch vier Tage. Der {sturm} ist da: Es regnet, alle Boote sind im Hafen."),
  narr("Heute fahren wir nach Gaarden: {werkstatt}, Farbenweg 7. Aber Dana hat heute keine Zeit."),
  dana(DANA_PLAN, "Я сегодня работаю в больнице — до двух. В три я у почты в Гаардене!", ["das Krankenhaus", "die Post"]),
  {
    t: "hear",
    task: "Где и когда вы встречаетесь с Даной?",
    voice: "Anna",
    de: DANA_PLAN,
    options: ["в три у почты в Гаардене", "в два у больницы", "в три у мастерской"],
    answer: "в три у почты в Гаардене",
  },
  {
    t: "type",
    rule: ["stadt/check-2"],
    task: "Запишите в блокнот, где Дана до двух.",
    answers: ["Dana ist bis zwei im Krankenhaus.", "Bis zwei ist Dana im Krankenhaus.", "Dana arbeitet bis zwei im Krankenhaus."],
    ru: "Дана до двух в больнице.",
  },
  hauke("Kein Problem! Ich habe ein Auto! … Also, Frauke hat ein Auto.", "Без проблем! У меня есть машина! … Ну, у Фрауке есть машина.", ["das Auto"]),
  hauke("Frauke fährt uns um neun nach Gaarden. Mit dem Auto!", "Фрауке в девять везёт нас в Гаарден. На машине!"),
  { t: "gap", rule: ["stadt/mit-1"], task: "На чём вы поедете по плану Хауке?", text: "Wir fahren mit ___ Auto nach Gaarden.", options: ["dem", "der", "den"], answer: "dem", ru: "Мы едем в Гаарден на машине." },
  narr("9:00 — kein Auto. 9:15 — kein Auto, keine Frauke. Und Elif ist auch nicht da."),
  elif("Entschuldigung! Ich war bei der Post. Ein Brief nach Helgoland – für die Möwe!", "Простите! Я была на почте. Письмо на Гельголанд — про чайку!"),
  narr("Der Ring von HEL 7305 — с острова Гельголанд. Элиф пишет туда, где её {moewe} и что она ест. Письмо уже в пути."),
  {
    t: "reply",
    rule: ["stadt/praep-2"],
    task: "Хауке не расслышал. Ответьте за Элиф, куда идёт письмо.",
    options: [
      ok("Der Brief geht nach Helgoland."),
      no("Der Brief geht zu Helgoland.", "zu — к местам и людям: zur Post. Города и острова — nach."),
      no("Der Brief geht in Helgoland.", "Куда? — на остров: nach Helgoland."),
    ],
  },
  narr("Nils kommt aus dem {gaestezimmer}: Auf dem Tisch von Greta liegt {stadtplan}, von 1976. Грета никогда ничего не забывает. А сегодня — забыла."),
  {
    t: "look",
    task: "Рассмотрите Stadtplan Греты.",
    items: [
      { icon: "🚋", de: "die Straßenbahn", ru: "трамвай", note: "Через весь план — линия трамвая до Gaarden. Но трамвая в Киле нет с 1985 года: план старый.", key: true },
      { icon: "⛴️", de: "die Fähre", ru: "паром", note: "Пунктир через фьорд: паром в Gaarden. Самый короткий путь — если нет шторма.", key: true },
      { icon: "🚉", de: "der Bahnhof", ru: "вокзал", note: "От вокзала автобусы идут во все районы. В Gaarden тоже." },
    ],
  },
  elif("Eine Straßenbahn? In Kiel gibt es keine Straßenbahn!", "Трамвай? В Киле нет трамвая!", ["die Straßenbahn"]),
  hauke("Schon lange nicht mehr! Der Plan ist alt – so alt wie das Schild!", "Давно уже нет! План старый — старый, как табличка!"),
  { t: "gap", task: "Какого года план Греты?", text: "Der Stadtplan ist von ___.", options: ["1976", "1985", "2026"], answer: "1976", ru: "План города — 1976 года." },
  {
    t: "game",
    task: "На плане длинные слова. Соберите каждое из частей и выберите род.",
    hint: "Род сложного слова — по последней части: das Haus → das Krankenhaus.",
    c: {
      kind: "compound",
      rounds: [
        { word: "die Straßenbahn", parts: ["Straßen", "Bahn"], ru: "трамвай" },
        { word: "die Haltestelle", parts: ["Halte", "Stelle"], ru: "остановка" },
        { word: "das Krankenhaus", parts: ["Kranken", "Haus"], ru: "больница" },
      ],
      extra: ["Post", "Platz", "Bus"],
    },
  },
  hauke("Ihr fahrt mit dem Bus. Ich warte auf Frauke und komme mit dem Auto!", "Вы едете на автобусе. Я жду Фрауке и приеду на машине!"),
  {
    t: "type",
    rule: ["stadt/check-3"],
    task: "Запишите план: вы едете на автобусе в Гаарден. Сначала «на чём», потом «куда».",
    answers: ["Wir fahren mit dem Bus nach Gaarden.", "Ich fahre mit dem Bus nach Gaarden."],
    ru: "Мы едем на автобусе в Гаарден.",
  },
  {
    t: "game",
    task: "Элиф перечисляет, на чём можно добраться до Gaarden. Послушайте слово и нажмите на картинку.",
    hint: HINT_PICTURE,
    c: scene([["der Bus", "🚌"], ["die Straßenbahn", "🚋"], ["das Fahrrad", "🚲"], ["das Auto", "🚗"], ["das Taxi", "🚕"], ["der Zug", "🚆"], ["die U-Bahn", "🚇"], ["die S-Bahn", "🚈"]]),
  },
  { t: "game", task: "Слова дня — по ящикам Йенсена: der, die, das.", hint: HINT_DOCK, c: docks(["der Bus", "die Bank", "das Taxi", "der Zug", "die Apotheke", "das Rathaus", "der Platz", "die Ampel"]) },
  {
    t: "pick",
    task: "Что из сегодняшнего пригодится в деле?",
    options: [
      ok("Адрес мастерской и встреча с Даной в три у почты"),
      no("Трамвай со старого плана", "Трамвая в Киле нет с 1985 года. План — только память о 1976-м."),
      no("Машина Фрауке", "Машины пока нет. Есть обещание Хауке."),
    ],
  },
  {
    t: "clue",
    title: "Nach Gaarden",
    text: "Dana: bis zwei im Krankenhaus, um drei bei der Post in Gaarden. Hauke wartet auf Frauke und das Auto. Wir fahren mit dem Bus. Der Stadtplan von Greta ist alt: von 1976.",
  },
];

// Сцена 2 · развитие: вокзал, табло, автомат и автобус. Бросок: глобальное событие · Грета ·
// подслушать · der Bahnhof · 3 (мелочь) — объявление: паромов сегодня нет, шторм; поворот почти
// срывается, Греты на вокзале нет. Шутка главы из плана: чайка едет с вами в автобусе.
const bahnhof: SceneNode[] = [
  { t: "pic", src: "09-bahnhof.jpg", alt: "Автобусный вокзал в шторм: табло отправлений, старый жёлтый билетный автомат, усатый водитель машет из кабины; чайка с кольцом стоит на ступеньке автобуса; Элиф под зонтом смеётся" },
  narr("Der Bahnhof: der Bus, das Taxi, der Zug — и толпа. Из громкоговорителя — голос, строгий, как фрау Петерсен."),
  { t: "say", who: "Lautsprecher", voice: "Eddy", de: ANSAGE, ru: "Внимание! Сегодня паром не ходит. Шторм! Садитесь на автобус!" },
  {
    t: "hear",
    task: "Что объявили на вокзале?",
    voice: "Eddy",
    de: ANSAGE,
    options: ["паром сегодня не ходит — садитесь на автобус", "автобусы сегодня не ходят", "паром опаздывает на час"],
    answer: "паром сегодня не ходит — садитесь на автобус",
  },
  { ...narr("Keine {faehre} heute. Der {sturm} kommt: мачты в гавани гнутся, автобусы — битком."), set: { weather: 1 } },
  {
    t: "look",
    task: "Осмотритесь на вокзале.",
    items: [
      { icon: "🛤️", de: "das Gleis", ru: "путь, платформа", note: "Gleis 1–8 — для поездов. Автобусы в Gaarden уходят с другой стороны.", key: true },
      { icon: "🔢", de: "die Linie", ru: "линия, маршрут", note: "У каждого автобуса — номер линии. В Gaarden идёт несколько.", key: true },
      { icon: "🚕", de: "das Taxi", ru: "такси", note: "Такси до Gaarden — дорого. Хауке бы взял. Но Хауке ждёт машину." },
    ],
  },
  {
    t: "game",
    task: "Найдите на табло автобус в Gaarden и время, когда он отходит.",
    hint: "Gaarden ищите в середине строки. Fähre сегодня не ходит.",
    c: spot("Abfahrt", ["Linie 7|Holtenau|9:35", "Linie 11|Gaarden|9:40", "Fähre|Gaarden|heute nicht"], ["Linie 11", "9:40"]),
  },
  { t: "say", who: "Lautsprecher", voice: "Eddy", de: "Die Fähre fährt wieder ab vierzehn Uhr. Nach dem Sturm!", ru: "Паром снова ходит с четырнадцати часов. После шторма!" },
  { t: "gap", rule: ["moin/zeit-1"], task: "Запишите, когда снова пойдёт паром.", text: "Die Fähre fährt wieder ___ vierzehn Uhr.", options: ["ab", "für", "über"], answer: "ab", ru: "Паром снова ходит с четырнадцати часов." },
  hauke("Vierzehn Uhr? Zu spät! Und wo kauft man hier Fahrkarten?", "В четырнадцать? Слишком поздно! А где тут покупают билеты?"),
  dana("Wir nehmen den Bus, denn heute fährt keine Fähre.", "Едем на автобусе: паром сегодня не ходит."),
  elif("Linie elf, neun Uhr vierzig! Und die Fahrkarte? Da ist ein Automat!", "Одиннадцатый, 9:40! А билет? Вон автомат!", ["die Linie"]),
  narr("Die Fahrkarte nach Gaarden kostet 2,90 €. {automat} ist alt und gelb — и сдачу не даёт."),
  {
    t: "type",
    rule: ["moin/man-1"],
    task: "Запишите в блокнот вопрос Хауке: «Где тут покупают билеты?»",
    answers: ["Wo kauft man hier Fahrkarten?", "Wo kauft man Fahrkarten?"],
    ru: "Где тут покупают билеты?",
  },
  {
    t: "game",
    rule: ["einkaufen/preise-1"],
    task: "Заплатите автомату ровно 2,90 €: сдачи он не даёт.",
    hint: "zwei Euro neunzig: 2 € + 50 ct + 20 ct + 20 ct.",
    c: { kind: "coins", coins: [200, 100, 50, 20, 10], answer: 290 },
  },
  hauke("Ist das dieser Bus? Linie elf? Kommt, schnell!", "Это тот автобус? Одиннадцатый? Быстрее, пошли!"),
  fahrer("Linie elf nach Gaarden! Steigen Sie ein! Schnell, bitte!", "Одиннадцатый до Гаардена! Садитесь! Быстрее, пожалуйста!", ["einsteigen"]),
  { t: "gap", rule: ["stadt/imperativ-3"], task: "Что сказал водитель?", text: "___ Sie ein! Schnell, bitte!", options: ["Steigen", "Steigt", "Steige"], answer: "Steigen", ru: "Садитесь! Быстрее, пожалуйста!" },
  narr("С вами садится ещё один пассажир: HEL 7305. Die Möwe sitzt im Bus, am {fenster}."),
  fahrer("Eine Möwe? Im Bus? Steigen Sie bitte aus, Frau Möwe!", "Чайка? В автобусе? Выходите, пожалуйста, госпожа чайка!", ["aussteigen"]),
  elif("Sie hat Angst vor dem Sturm! Sie fährt mit uns!", "Она боится шторма! Она едет с нами!"),
  {
    t: "reply",
    rule: ["freizeit/modal-1"],
    task: "Вежливо спросите водителя, можно ли чайке ехать с вами.",
    options: [
      ok("Entschuldigung, kann die Möwe mitfahren?"),
      no("Entschuldigung, kann die Möwe mitfährt?", "После können — инфинитив в конце: mitfahren."),
      no("Entschuldigung, die Möwe kann mitfahren?", "Вопрос «да или нет»: глагол первым — Kann die Möwe …?"),
    ],
  },
  fahrer("Na gut. Aber nur bis Gaarden! Und sie isst nichts im Bus!", "Ладно. Но только до Гаардена! И в автобусе она ничего не ест!"),
  {
    t: "hear",
    task: "На каком условии водитель берёт чайку?",
    voice: "Eddy",
    de: "Na gut. Aber nur bis Gaarden! Und sie isst nichts im Bus!",
    options: ["только до Гаардена и ничего не есть", "только с билетом", "только на заднем сиденье"],
    answer: "только до Гаардена и ничего не есть",
  },
  fahrer("Im Bus darf man nicht essen. Auch eine Möwe nicht!", "В автобусе есть нельзя. Чайке тоже!"),
  {
    t: "type",
    rule: ["moin/man-1"],
    task: "Запишите правило водителя: «В автобусе есть нельзя».",
    answers: ["Im Bus darf man nicht essen.", "Man darf im Bus nicht essen."],
    ru: "В автобусе есть нельзя.",
  },
  narr("Der Bus fährt. Die Möwe sieht die {fahrkarte} — и билет уже у неё в клюве. Контролёр — на следующей остановке!"),
  { t: "game", task: `Отнимите билет у чайки! ${RACE}`, hint: HINT_RACE, outcome: RACE_STAKES, c: race(["der Bus", "die Haltestelle", "die Linie", "einsteigen", "aussteigen", "umsteigen"]) },
  hauke("Sie hat die Fahrkarte! Und jetzt sitzt sie unter dem Sitz!", "Билет у неё! А теперь она сидит под сиденьем!"),
  { t: "gap", rule: ["moin/unter-1"], task: "Где теперь чайка?", text: "Die Möwe sitzt ___ dem Sitz.", options: ["unter", "auf", "in"], answer: "unter", ru: "Чайка сидит под сиденьем." },
  narr("Нильс переписал дорогу с сайта мастерской: «Steigen Sie an der Post aus!!! An der zweiten Ampel links!!! Dann geradeaus!!!»"),
  {
    t: "pick",
    task: "Почему команда верит дороге Нильса?",
    options: [
      ok("Он переписал её с сайта мастерской"),
      no("Нильс живёт в Гаардене", "Нильс из Гамбурга и в Гаардене не был."),
      no("Так сказала Дана", "Дана в больнице до двух и дорогу не присылала."),
    ],
  },
  {
    t: "type",
    rule: ["stadt/check-1"],
    task: "Запишите в блокнот, где вы выходите из автобуса.",
    answers: ["Wir steigen an der Post aus.", "Ich steige an der Post aus.", "Wir steigen bei der Post aus."],
    ru: "Мы выходим у почты.",
  },
  {
    t: "game",
    rule: ["stadt/imperativ-3"],
    task: "Водитель объявляет остановку. Соберите его фразу.",
    hint: "Глагол первым, Sie — вторым, приставка aus — в самом конце.",
    c: order(["Steigen", "Sie", "hier", "aus!"], ["aus!", "hier", "Steigen", "Sie"]),
  },
  {
    t: "clue",
    title: "Linie 11",
    text: "Heute keine Fähre: Sturm. Linie 11 nach Gaarden, 9:40. Die Möwe fährt mit. Nils: an der Post aussteigen, an der zweiten Ampel links.",
  },
];

// Интерлюдия глазами Хауке (по плану интерлюдий). Бросок плана: Хауке · пообещать · das Auto · 4 —
// машины нет, есть бабушкин велосипед. Бросок главы: сквозная шутка обостряется · Фрауке · опоздать
// · das Auto · 11 — Фрауке опаздывает: возила слух о похищении в полицию, а машина забита
// булочками. Бросок: подарок игроку · Хауке · найти · die Post · 15 — у почты Хауке встречает
// почтальоншу, и та знает дорогу во двор.
const fahrrad: SceneNode[] = [
  { t: "pic", src: "09-fahrrad.jpg", alt: "Хауке в жёлтой куртке на старом красном бабушкином велосипеде с корзинкой под дождём; у почты его останавливает почтальонша с жёлтым велосипедом и сумкой писем" },
  narr("Тем временем у киоска. Um neun — kein Auto. Um zehn — kein Auto. 10:15: Da kommt Frauke. Zu spät."),
  frauke("Entschuldigung, Hauke! Ich war bei der Polizei. Die Entführung! Aber die Polizei lacht nur.", "Прости, Хауке! Я была в полиции. Похищение! А полиция только смеётся."),
  { ...narr("Слух съездил в полицию и вернулся. Но Фрауке рассказывает его снова — уже Хауке."), set: { rumours: 1 } },
  frauke(VOLL, "А машина забита: рыбные булочки к Kieler Woche! Места для тебя нет."),
  {
    t: "hear",
    task: "Почему Хауке не поедет с Фрауке?",
    voice: "Sandy",
    de: VOLL,
    options: ["машина забита булочками", "Фрауке едет в полицию", "у машины спустило колесо"],
    answer: "машина забита булочками",
  },
  hauke("Kein Auto? Dann nehme ich das Fahrrad von Oma!", "Машины нет? Тогда возьму бабушкин велосипед!", ["das Fahrrad"]),
  { t: "gap", rule: ["stadt/mit-1"], task: "На чём Хауке едет в Гаарден?", text: "Hauke fährt mit ___ Fahrrad nach Gaarden.", options: ["dem", "der", "das"], answer: "dem", ru: "Хауке едет в Гаарден на велосипеде." },
  narr("Das Fahrrad von Oma ist alt und {rot}. Es regnet. In Gaarden Хауке крутит головой: где этот Farbenweg?"),
  narr("Vor der Post steht eine Frau mit einem gelben Fahrrad und einer großen Tasche: {traegerin}."),
  {
    t: "reply",
    rule: ["stadt/kurz-1"],
    task: "Спросите почтальоншу, как проехать к Farbenweg.",
    options: [
      ok("Entschuldigung! Wie komme ich zum Farbenweg?"),
      no("Entschuldigung! Wie komme ich zur Farbenweg?", "der Weg — мужской род: zu + dem = zum."),
      no("Entschuldigung! Wie komme ich nach Farbenweg?", "nach — для городов и стран. К улице — zum."),
    ],
  },
  yilmaz("Zum Farbenweg? Ganz einfach: Der Farbenweg ist hinter der Post. Gehen Sie durch den Hinterhof!", "К Фарбенвегу? Проще простого: Фарбенвег — за почтой. Идите через задний двор!"),
  yilmaz("Ich bringe jeden Tag Post in den Farbenweg. Ich kenne alle!", "Я каждый день ношу почту на Фарбенвег. Я всех знаю!"),
  {
    t: "type",
    rule: ["stadt/praep-1"],
    task: "Хауке пишет на ладони, где Farbenweg. Запишите за него.",
    answers: ["Der Farbenweg ist hinter der Post.", "Hinter der Post.", "Der Farbenweg ist hinter der Post, im Hinterhof."],
    ru: "Фарбенвег — за почтой.",
  },
  narr("Auf der Hand: «hinter der Post — {hinterhof}». Es regnet, но слово Хауке запомнил."),
  {
    t: "pick",
    task: "Что Хауке узнал у почтальонши?",
    options: [
      ok("Farbenweg — за почтой, вход через задний двор"),
      no("Farbenweg — у вокзала", "Она показывает за почту, а не на вокзал."),
      no("Farbenweg закрыт на ремонт", "Она объясняет, как пройти: durch den Hinterhof."),
    ],
  },
];

// Сцена 3 · развитие: свидетели в своём порядке. Бросок: ложный след · Нильс · перепутать ·
// die Ampel · 18 — Нильс переписал дорогу с сайта, но перепутал лево и право. Сила выше
// ожидаемой: команда верит письменному тексту, а не Матео, который объясняет дорогу на трёх
// языках сразу (отсылка к «Руссо туристо»).
const ampel: SceneNode[] = [
  { t: "pic", src: "09-ampel.jpg", alt: "Перекрёсток в Гаардене под дождём: Элиф с телефоном в руке показывает налево, на светофоре сидит чайка; рядом почта с жёлтой вывеской" },
  narr("Gaarden, Haltestelle Post. Sie steigen aus — die Möwe auch. Es regnet. Vor Ihnen: Straßen, Ampeln, keine Werkstatt."),
  {
    t: "look",
    task: "Осмотрите перекрёсток у почты.",
    items: [
      { icon: "🚦", de: "die Ampel", ru: "светофор", note: "Первый светофор — прямо у почты. Второй — дальше по улице.", key: true },
      { icon: "🛣️", de: "die Straße", ru: "улица", note: "Улицы расходятся в три стороны. Таблички Farbenweg нет ни на одной.", key: true },
      { icon: "💊", de: "die Apotheke", ru: "аптека", note: "Аптека на углу. Дане бы понравилось." },
    ],
  },
  elif("Die Post ist hier. Aber wo ist der Farbenweg? Ich sehe nur Ampeln!", "Почта здесь. Но где Фарбенвег? Я вижу одни светофоры!", ["die Ampel"]),
  {
    t: "go",
    task: "Кого спросить о дороге?",
    next: "Дальше по делу",
    branches: [
      {
        label: "Ещё раз Нильс",
        icon: "📱",
        nodes: [
          narr("Вы пишете Нильсу: links или rechts? Ответ — через секунду, по три «!» на слово."),
          narr("«Links!!! Ganz sicher!!! An der zweiten Ampel!!! Den Weg schreibt die Werkstatt!!!»"),
          {
            t: "reply",
            rule: ["stadt/ampel-1"],
            task: "Переспросите Нильса, у какого светофора поворачивать.",
            options: [
              ok("An der zweiten Ampel links?"),
              no("An der zwei Ampel links?", "Порядковое: die zweite Ampel, после an der — zweiten."),
              no("An die zweite Ampel links?", "Где? — an + дательный: an der zweiten Ampel."),
            ],
          },
          elif("Nils ist sicher. Und Nils weiß immer alles zuerst!", "Нильс уверен. А Нильс всегда всё знает первым!"),
        ],
      },
      {
        label: "Матео по телефону",
        icon: "📞",
        nodes: [
          narr("Mateo kauft Gemüse in Gaarden, auf dem {markt}. Он объясняет дорогу — на трёх языках сразу."),
          mateo(MATEO_WEG, "Мастерская? Конечно! Идите todo recto — straight — прямо! У второго светофора a la derecha — right — направо!"),
          {
            t: "hear",
            task: "Куда поворачивать по словам Матео?",
            voice: "Reed",
            de: MATEO_WEG,
            options: ["прямо, у второго светофора направо", "прямо, у второго светофора налево", "сразу направо у почты"],
            answer: "прямо, у второго светофора направо",
          },
          {
            t: "reply",
            task: "Попросите Матео повторить — медленно и только по-немецки.",
            options: [
              ok("Langsam, bitte! Noch einmal – nur auf Deutsch!"),
              no("Schnell, bitte! Noch einmal – nur auf Deutsch!", "Быстрее? Матео и так говорит на трёх языках сразу. Нужно langsam."),
              no("Langsam, bitte! Noch einmal – nur auf Spanisch!", "По-испански вы не поймёте. Нужно auf Deutsch."),
            ],
          },
          narr("Матео повторяет: «Geradeaus! Zweite Ampel: rechts!» Ровно четыре слова. Рекорд краткости для Матео."),
          {
            t: "type",
            rule: ["stadt/ampel-1"],
            task: "Запишите дорогу Матео в блокнот.",
            answers: ["Geradeaus, an der zweiten Ampel rechts.", "An der zweiten Ampel rechts.", "Geradeaus und an der zweiten Ampel rechts."],
            ru: "Прямо, у второго светофора направо.",
          },
        ],
      },
      {
        label: "Дана в больнице",
        icon: "🏥",
        nodes: [
          dana("Ich habe keine Zeit – ich bin im Krankenhaus! Fragt bei der Post!", "У меня нет времени — я в больнице! Спросите на почте!"),
          { t: "gap", rule: ["stadt/check-2"], task: "Где сейчас Дана?", text: "Dana ist ___ Krankenhaus.", options: ["im", "zum", "nach"], answer: "im", ru: "Дана в больнице." },
          elif("Fragen bei der Post? Da sind zwanzig Leute!", "Спросить на почте? Там двадцать человек!"),
          narr("На почте — очередь до двери. А на двери висит доска объявлений."),
        ],
      },
      {
        label: "Доска объявлений у почты",
        icon: "📌",
        optional: true,
        nodes: [
          narr("Пока очередь не двигается, вы читаете доску объявлений и примеряете их на знакомых."),
          {
            t: "game",
            task: "Подберите каждому объявление. Кому ничего не подходит — так и отметьте.",
            hint: "Читайте, как на экзамене: важна каждая мелочь — этаж, цена, день.",
            c: {
              kind: "ads",
              people: [
                { id: "elif", text: "Elif sucht ein Zimmer in Gaarden. Mit Balkon — für die Möwe!" },
                { id: "hauke", text: "Hauke braucht ein Auto. Er hat fünfzig Euro." },
                { id: "mateo", text: "Mateo sucht einen Markt mit Gemüse. Er hat am Dienstag Zeit." },
              ],
              ads: [
                { id: "A", title: "Zimmer frei", text: "Dritter Stock, kein Balkon. 400 Euro." },
                { id: "B", title: "Zimmer in Gaarden", text: "Zweiter Stock, mit Balkon. 450 Euro." },
                { id: "C", title: "Auto", text: "Alt, aber gut. 3000 Euro." },
                { id: "D", title: "Markt in Gaarden", text: "Dienstag und Freitag, 8 bis 13 Uhr." },
              ],
              answer: { elif: "B", hauke: "0", mateo: "D" },
            },
          },
          narr("Kein Auto für fünfzig Euro. Зато есть бабушкин велосипед — но этого вы пока не знаете."),
        ],
      },
    ],
  },
  {
    t: "game",
    task: "Сравните: что пишет Нильс и что говорит Матео? Отметьте два слова, которые не сходятся.",
    hint: "Оба начинают одинаково. Расходятся у второго светофора.",
    c: {
      kind: "contra",
      texts: [
        { who: "Nils, Nachricht", lines: [["Steigen", "Sie", "an", "der", "Post", "aus!!!"], ["An", "der", "zweiten", "Ampel", "links!!!"]] },
        { who: "Mateo am Telefon", lines: [["Geradeaus!"], ["Zweite", "Ampel:", "a la derecha,", "right,", "rechts!"]] },
      ],
      answer: ["0:1:4", "1:1:4"],
    },
  },
  elif("Mateo spricht drei Sprachen – und keine richtig! Nils hat den Text. Wir gehen links!", "Матео говорит на трёх языках — и ни на одном толком! У Нильса текст. Идём налево!"),
  {
    t: "pick",
    task: "Почему Элиф выбирает «links»?",
    options: [
      ok("Она верит тексту Нильса: он «с сайта», а Матео путается в языках"),
      no("Так сказала Дана", "Дана в больнице и сказала только: спросите на почте."),
      no("Налево видно мастерскую", "Мастерской не видно ни слева, ни справа: одни светофоры."),
    ],
  },
  {
    t: "game",
    rule: ["stadt/imperativ-3"],
    task: "Элиф переписывает дорогу Нильса в блокнот. Вставьте пропущенные слова.",
    hint: "aussteigen: приставка aus — в конце. Порядковое после an der — zweiten.",
    c: gaps("Steigen Sie an der Post ___! Gehen Sie bis zur zweiten ___ und dann links!", ["aus", "Ampel", "ein", "Straße"], ["aus", "Ampel"]),
  },
  narr("Zweite Ampel, links. Geradeaus. Noch einmal links … Это уже не Gaarden у почты. Und da — ein Café."),
  {
    t: "type",
    rule: ["stadt/imperativ-2"],
    task: "Запишите в блокнот, как сказал Нильс: на «Sie», глагол первым.",
    answers: ["Gehen Sie an der zweiten Ampel links!", "Gehen Sie an der zweiten Ampel links."],
    ru: "Идите у второго светофора налево!",
  },
  {
    t: "clue",
    title: "Links oder rechts?",
    text: "Nils: an der zweiten Ampel links. Mateo: an der zweiten Ampel rechts. Dana: im Krankenhaus, keine Zeit. Wir gehen links.",
  },
];

// Сцена 4 · поворот и кризис: кафе «Moin Moin» с новой тёмно-синей вывеской — ложный след
// сильнее, чем ожидали. Нильс признаётся, что путает лево и право. Хауке приезжает на велосипеде
// с подарком почтальонши: дорога через двор. Игрок программирует путь — «Алгоритм».
const cafe: SceneNode[] = [
  { t: "pic", src: "09-moinmoin.jpg", alt: "Маленькое угловое кафе в Гаардене: в витрине новая тёмно-синяя пластиковая вывеска с белыми печатными буквами MOIN MOIN; Элиф прижалась носом к стеклу; хозяйка в фартуке выглядывает из двери; чайка на козырьке" },
  narr("Ein Café. Im Fenster — ein Schild: {blau}, weiße Buchstaben. MOIN MOIN."),
  elif("Das Schild! Und zweimal Moin? Greta macht zwei Schilder!", "Табличка! И дважды Moin? Грета делает две таблички!"),
  wirtin("Moin, moin! Das Schild? Das ist neu. Aus Plastik. Trinken Sie lieber einen Kaffee!", "Привет-привет! Вывеска? Она новая. Из пластика. Выпейте лучше кофе!"),
  {
    t: "hear",
    task: "Что хозяйка говорит о вывеске?",
    voice: "Sandy",
    de: "Moin, moin! Das Schild? Das ist neu. Aus Plastik. Trinken Sie lieber einen Kaffee!",
    options: ["она новая и пластиковая", "она старая, из клуба", "её нашли на улице"],
    answer: "она новая и пластиковая",
  },
  {
    t: "look",
    task: "Рассмотрите вывеску в окне кафе.",
    items: [
      { icon: "🔤", de: "der Buchstabe", ru: "буква", note: "Буквы белые, но ровные, напечатанные. Не кистью.", key: true },
      { icon: "☕", de: "das Café", ru: "кафе", note: "Café Moin Moin открылось этой весной. Вывеска новая, как и кафе.", key: true },
      { icon: "📋", de: "die Speisekarte", ru: "меню", note: "В меню Fischbrötchen, Kaffee und Kuchen. Таблички в меню нет." },
    ],
  },
  {
    t: "game",
    task: "Это наша табличка?",
    c: verdict(["Richtig", "Falsch"], [
      ["Буквы белые на тёмно-синем", true, "Цвета те же, что у MOIN."],
      ["Доска старая, деревянная", false, "Она новая и пластиковая — так сказала хозяйка."],
      ["По краю кант-канат", false, "Края гладкие. Каната нет."],
    ]),
  },
  {
    t: "type",
    task: "Запишите в блокнот вывод о вывеске кафе.",
    answers: ["Das Schild ist neu.", "Das Schild vom Café ist neu.", "Das Schild ist neu, nicht alt."],
    ru: "Вывеска новая.",
  },
  narr("Нильс пишет снова, теперь без восклицательных знаков: «Links … rechts … Ich weiß das nie.»"),
  elif("Nils! Links ist hier – rechts ist da! Und jetzt? Es ist schon halb eins!", "Нильс! Лево — здесь, право — там! И что теперь? Уже половина первого!"),
  {
    t: "pick",
    task: "Что случилось с дорогой Нильса?",
    options: [
      ok("Нильс перепутал лево и право: прав был Матео"),
      no("Сайт мастерской ошибся", "Нильс сам признался: «Ich weiß das nie»."),
      no("Чайка подменила сообщение", "Чайка ворует булки и билеты, а не сообщения."),
    ],
  },
  {
    t: "gap",
    rule: ["stadt/kurz-1"],
    task: "Элиф хочет вернуться к почте и начать сначала. Вставьте слово.",
    text: "Wir gehen ___ Post zurück.",
    options: ["zur", "zum", "zu"],
    answer: "zur",
    ru: "Мы возвращаемся к почте.",
  },
  {
    t: "game",
    rule: ["stadt/kurz-1"],
    task: "Спросите хозяйку кафе дорогу к почте. Соберите вопрос.",
    hint: "die Post → zur Post. Вопросительное слово первым, глагол вторым.",
    c: order(["Wie", "komme", "ich", "zur", "Post?"], ["zur", "Post?", "ich", "Wie", "komme"]),
  },
  narr("Дзынь! Hauke — auf dem Fahrrad von Oma. Мокрый насквозь, {rot} wie eine Tomate — и счастливый."),
  hauke(HAUKE_WEG, "У меня есть дорога! От почтальонши: Фарбенвег — за почтой. Через задний двор!"),
  {
    t: "hear",
    task: "Что узнал Хауке?",
    voice: "Rocko",
    de: HAUKE_WEG,
    options: ["Farbenweg за почтой, вход через двор", "Farbenweg у второго светофора направо", "мастерская в кафе"],
    answer: "Farbenweg за почтой, вход через двор",
  },
  hauke("Gebt mir den Weg – ich fahre!", "Дайте мне дорогу — я поеду!"),
  narr("Хауке слушается только чётких команд. Вы рисуете на салфетке схему и пишете ему программу."),
  {
    t: "game",
    rule: ["stadt/imperativ-2"],
    task: "Соберите для Хауке программу: от кафе через почту к мастерской. Потом нажмите «Пуск».",
    hint: "Хауке смотрит вправо. links и rechts — повернуть и пройти квартал. Мастерская — за почтой.",
    c: {
      kind: "algo",
      width: 4,
      height: 3,
      start: { x: 0, y: 2, heading: 1 },
      places: { "0,2": "Café Moin Moin", "1,2": "die Apotheke", "3,2": "die Bank", "1,1": "die Ampel", "0,0": "der Platz", "2,0": "die Post", "3,0": "die Werkstatt" },
      goal: "3,0",
      moves: ["geradeaus", "links", "rechts", "links", "rechts"],
      max: 6,
    },
  },
  {
    t: "type",
    rule: ["stadt/imperativ-2"],
    task: "Напишите Нильсу, как было правильно — как сказал Матео. На «Sie», глагол первым.",
    answers: ["Gehen Sie an der zweiten Ampel rechts!", "Gehen Sie an der zweiten Ampel rechts.", "Gehen Sie geradeaus und an der zweiten Ampel rechts!"],
    ru: "Идите у второго светофора направо!",
  },
  wirtin("Viel Glück! Und kommen Sie dann zum Kaffee!", "Удачи! А потом приходите на кофе!"),
  {
    t: "reply",
    task: "Попрощайтесь с хозяйкой кафе.",
    options: [
      ok("Danke! Ihr Schild ist sehr schön!"),
      no("Danke! Dein Schild ist sehr schön!", "С хозяйкой вы на «вы»: Ihr Schild."),
      no("Danke! Ihre Schild ist sehr schön!", "das Schild — средний род: Ihr, без -e."),
    ],
  },
  {
    t: "clue",
    title: "Moin Moin",
    text: "Café Moin Moin: das Schild ist neu, nicht alt. Nils weiß links und rechts nie. Hauke: der Farbenweg ist hinter der Post, im Hinterhof.",
  },
];

// Сцена 5 · кульминация: двор за почтой. Мастерская закрыта, на двери «Wir sind beim Arzt.
// Zurück um drei.», в окне — угол таблички, целой и свежевыкрашенной. Почтальонша говорит, что
// механик у врача с молчаливым мужчиной в шарфе. Записка Грете в почтовый ящик, замок урока.
const hof: SceneNode[] = [
  { t: "pic", src: "09-hinterhof.jpg", alt: "Задний двор за почтой: кирпичная мастерская с большим окном, на двери листок; в окне под тканью виден угол старой тёмно-синей таблички с белой буквой M и кантом-канатом; Элиф и Хауке с бабушкиным велосипедом прильнули к окну; во двор въезжает почтальонша на жёлтом велосипеде" },
  narr("Hinter der Post: {hinterhof}, ganz hinten — die Werkstatt. Farbenweg 7. Die Tür ist zu. An der Tür: {beimarzt}"),
  {
    t: "gap",
    rule: ["stadt/check-2"],
    task: "Что написано на двери?",
    text: "Wir sind ___ Arzt. Zurück um drei.",
    options: ["beim", "zum", "bei"],
    answer: "beim",
    ru: "Мы у врача. Вернёмся в три.",
  },
  hauke("Zurück um drei? Dann warten wir. Hier, im Hinterhof!", "Вернутся в три? Тогда ждём. Здесь, во дворе!"),
  {
    t: "game",
    rule: ["tagesablauf/wann-1"],
    task: "Когда вернутся из мастерской? Поставьте часы.",
    c: clock("15:00", {
      "03:00": "Днём «um drei» — это 15:00.",
      "13:00": "Это eins, час дня. На двери — um drei.",
      "14:00": "Это zwei. До трёх ещё час.",
    }),
  },
  narr("Im Fenster der Werkstatt — под тканью — угол доски: dunkelblau, ein weißes M, а по краю — {seil}."),
  {
    t: "look",
    task: "Загляните в окно мастерской.",
    items: [
      { icon: "🪧", de: "das Schild", ru: "табличка", note: "Угол таблички под тканью: тёмно-синяя, белая M, кант-канат. Краска свежая, ни одной трещины.", key: true },
      { icon: "🥫", de: "die Dose", ru: "банка", note: "Банки лодочной краски: dunkelblau и weiß. Крышки закрыты, кисти вымыты.", key: true },
      { icon: "🖌️", de: "der Pinsel", ru: "кисть", note: "Маленькая кисть — для тонких букв. Как в списке Греты." },
    ],
  },
  elif("Das ist es! Unser Schild! Und es ist ganz – wie neu!", "Это она! Наша табличка! И она целая — как новая!"),
  {
    t: "type",
    rule: ["wohnen/wo-1"],
    task: "Запишите в блокнот, где табличка.",
    answers: ["Das Schild ist in der Werkstatt.", "Das Schild ist in der Werkstatt in Gaarden.", "Unser Schild ist in der Werkstatt."],
    ru: "Табличка в мастерской.",
  },
  {
    t: "pick",
    task: "Что это значит для дела?",
    options: [
      ok("Табличку не испортили: её обновляют в мастерской"),
      no("Табличку разбили", "Она целая, без единой трещины."),
      no("Это вторая вывеска кафе", "У этой — кант-канат и старая доска. Это наша."),
    ],
  },
  narr("Дзынь-дзынь: in den Hinterhof fährt die Briefträgerin. Хауке она уже знает."),
  yilmaz(YILMAZ_ARZT, "Привет, Хауке! Ищете механика? Она у врача — с мужчиной. Он в шарфе и ничего не говорит. Даже «Moin»!", ["der Arzt"]),
  {
    t: "hear",
    task: "Кто у врача?",
    voice: "Shelley",
    de: YILMAZ_ARZT,
    options: ["механик и мужчина в шарфе, который молчит", "Нильс и Грета", "хозяйка кафе"],
    answer: "механик и мужчина в шарфе, который молчит",
  },
  hauke("Ein Mann mit Schal, und er sagt nichts? Das ist Herr Jensen!", "Мужчина в шарфе, и молчит? Это господин Йенсен!"),
  {
    t: "reply",
    task: "Спросите почтальоншу, где этот врач.",
    options: [
      ok("Entschuldigung, wo ist der Arzt?"),
      no("Entschuldigung, wo ist die Arzt?", "der Arzt — мужской род. Женщина-врач — die Ärztin."),
      no("Entschuldigung, wohin ist der Arzt?", "Где? — wo. Wohin — куда."),
    ],
  },
  yilmaz("Das weiß ich nicht. Ich bringe nur die Post!", "Этого я не знаю. Я только почту ношу!"),
  {
    t: "game",
    rule: ["stadt/check-2", "stadt/kurz-1", "stadt/hause-1"],
    task: "Блокнот закрыт на фразы дня. Поверните диски.",
    hint: HINT_LOCK,
    c: lock([
      ["Грета сегодня у врача.", [["Greta ist", "Greta sind", "Greta hat"], ["heute", "morgen", "jetzt"], ["beim Arzt.", "zum Arzt.", "bei Arzt."]]],
      ["Мы идём к почте.", [["Wir", "Ihr", "Sie"], ["gehen", "geht", "gehst"], ["zur Post.", "zum Post.", "zu Post."]]],
      ["Мы едем домой на автобусе.", [["Wir fahren", "Wir fährt", "Wir fahre"], ["mit dem Bus", "mit der Bus", "mit den Bus"], ["nach Hause.", "zu Hause.", "nach Haus."]]],
    ]),
  },
  narr("Под листком на двери — записка мельче, для клиентов. По ней можно написать свою и бросить в {briefkasten}."),
  {
    t: "game",
    rule: ["stadt/imperativ-2", "stadt/kurz-1"],
    task: "Напишите Грете записку по образцу: запиской на двери мастерской. Подписываются Хауке и Элиф, поэтому — wir.",
    hint: HINT_LETTER,
    c: letter(
      "Greta",
      ["Liebe Kunden,", "wir sind heute beim Arzt.", "Kommen Sie bitte um drei zur Werkstatt!", "Viele Grüße", "Greta"],
      [
        an("Liebe", "Greta"),
        ["Wo? → wir: heute in Gaarden sein", "Wir sind heute in Gaarden.", "wir sind heute in Gaarden."],
        ["Bitte → Sie: um drei zur Post kommen", "Kommen Sie bitte um drei zur Post!", "kommen Sie bitte um drei zur Post!", "Kommen Sie bitte um drei zur Post."],
        ["Frage → wo: Herr Jensen sein?", "Wo ist Herr Jensen?", "wo ist Herr Jensen?"],
        gruss("Hauke und Elif"),
      ],
    ),
  },
  narr("15:00. An der Post — Dana, минута в минуту. Und die Werkstatt? Die Tür ist immer noch zu."),
  dana("Beim Arzt dauert es immer lange. Glaubt mir – ich bin Ärztin!", "У врача всегда всё долго. Поверьте мне — я врач!"),
  {
    t: "hear",
    task: "Что Дана говорит о врачах?",
    voice: "Anna",
    de: "Beim Arzt dauert es immer lange. Glaubt mir – ich bin Ärztin!",
    options: ["у врача всегда долго", "врачи закрываются в три", "к врачу нужно записываться"],
    answer: "у врача всегда долго",
  },
  { t: "game", task: "Дана учит вас словам на завтра. Повторите за ней вслух.", hint: HINT_SAY, c: { kind: "speak", lines: ["der Arzt", "die Post", "das Krankenhaus"] } },
  {
    t: "type",
    rule: ["stadt/check-2"],
    task: "Запишите в блокнот главное: где Грета.",
    answers: ["Greta ist beim Arzt.", "Sie ist beim Arzt.", "Greta ist heute beim Arzt."],
    ru: "Грета у врача.",
  },
  {
    t: "clue",
    title: "Beim Arzt",
    text: "Farbenweg 7, im Hinterhof: Die Werkstatt ist zu. «Wir sind beim Arzt. Zurück um drei.» Im Fenster: das Schild MOIN, ganz. Die Briefträgerin: Greta ist beim Arzt — mit einem Mann mit Schal.",
  },
];

// Сцена 6 · эпилог и крючок: автобус домой, чайка опять с вами, речь как на экзамене и записка от
// Греты через Нильса: завтра Йенсен снова у врача. Вход главы 10.
const abend: SceneNode[] = [
  { t: "pic", src: "09-abend.jpg", alt: "Вечерний автобус обратно в Киль: Хауке держит мокрый бабушкин велосипед в проходе, Дана дремлет у окна, Элиф смеётся, чайка с кольцом спит на свободном сиденье" },
  narr("Abend. Mit dem Bus nach Hause: Dana, Elif, Hauke, das Fahrrad von Oma — und die Möwe. Sie fährt auch mit."),
  elif("Und wem gehört das Fahrrad? – Haukes Oma!", "А чей это велосипед? — Бабушки Хауке!"),
  {
    t: "type",
    rule: ["moin/wem-1"],
    task: "Запишите вопрос Элиф в блокнот: «Чей это велосипед?» — дословно «Кому принадлежит велосипед?»",
    answers: ["Wem gehört das Fahrrad?"],
    ru: "Чей это велосипед?",
  },
  fahrer("Sie schon wieder? Steigen Sie ein, Frau Möwe. Aber bitte mit Fahrkarte!", "Опять вы? Садитесь, госпожа чайка. Но, пожалуйста, с билетом!"),
  { t: "gap", rule: ["stadt/hause-1"], task: "Куда едет команда?", text: "Wir fahren nach ___.", options: ["Hause", "Haus", "Häuser"], answer: "Hause", ru: "Мы едем домой." },
  {
    t: "game",
    rule: ["stadt/hause-1", "stadt/check-2", "moin/wohin-1"],
    task: "Элиф раскладывает фразы дня: где? или куда?",
    hint: "zu Hause, beim Arzt, im Bus — где; nach Hause, zum Arzt, ins Bett — куда: in das = ins.",
    c: sort([["wo", "Wo?"], ["wohin", "Wohin?"]], [
      ["zuhause", "zu Hause", "wo", "🏠"],
      ["nachhause", "nach Hause", "wohin", "🚌"],
      ["beimarzt", "beim Arzt", "wo", "🩺"],
      ["zumarzt", "zum Arzt", "wohin", "➡️"],
      ["werkstatt", "in der Werkstatt", "wo", "🔧"],
      ["zurpost", "zur Post", "wohin", "✉️"],
      ["imbus", "im Bus", "wo", "💺"],
      ["insbett", "ins Bett", "wohin", "🛏️"],
    ]),
  },
  hauke("Und ich gehe heute früh ins Bett!", "А я сегодня рано иду спать!"),
  narr("Im Bus — eine {nachricht} von Nils: «Greta schreibt: Herr Jensen ist beim Arzt!!! Morgen auch!!! Um zehn!!!»"),
  {
    t: "type",
    rule: ["stadt/check-2"],
    task: "Запишите в блокнот, где Йенсен будет завтра в десять.",
    answers: ["Herr Jensen ist morgen um zehn beim Arzt.", "Morgen um zehn ist Herr Jensen beim Arzt.", "Herr Jensen ist morgen beim Arzt."],
    ru: "Господин Йенсен завтра в десять у врача.",
  },
  dana("Herr Jensen? Beim Arzt? Morgen um zehn komme ich mit. Ich bin Ärztin!", "Господин Йенсен? У врача? Завтра в десять я иду с вами. Я врач!"),
  {
    t: "hear",
    task: "Что предлагает Дана?",
    voice: "Anna",
    de: "Herr Jensen? Beim Arzt? Morgen um zehn komme ich mit. Ich bin Ärztin!",
    options: ["завтра в десять пойти к врачу вместе", "позвонить Йенсену вечером", "ждать Грету у мастерской"],
    answer: "завтра в десять пойти к врачу вместе",
  },
  hauke("Gut! Wir treffen uns um Viertel vor zehn vor der Praxis.", "Хорошо! Встречаемся без четверти десять у практики."),
  elif("Und das Schild ist ganz. Greta macht es neu!", "А табличка цела. Грета её обновляет!"),
  hauke("Nur eine Frage: Warum sagt Herr Jensen nichts?", "Только один вопрос: почему господин Йенсен молчит?"),
  {
    t: "pick",
    task: "Что нового за день?",
    options: [
      ok("Табличка цела в мастерской Греты, а Грета с мужчиной в шарфе — у врача"),
      no("Табличку украли из мастерской", "Она лежит в мастерской под тканью, целая."),
      no("Йенсен уехал из Киля", "Он у врача. Завтра в десять — снова."),
    ],
  },
  {
    t: "game",
    task: "Хауке устраивает репетицию экзамена. Тема дня — город.",
    hint: HINT_ORAL,
    c: oral([
      oralSay(2, ASK, "Thema: Stadt · Wort: Bahnhof", "Wie komme ich zum Bahnhof?", "Как пройти к вокзалу?", "Wie komme ich …?"),
      oralReply(2, ANSWER, "Wie kommst du nach Hause?", "Ich fahre mit dem Bus nach Hause.", "Я еду домой на автобусе."),
      oralSay(3, REQUEST, "🎫", "Eine Fahrkarte nach Gaarden, bitte!", "Билет до Гаардена, пожалуйста!"),
    ]),
  },
  mateo("Willkommen zu Hause! Suppe für alle. Für die Möwe – nein!", "С возвращением! Суп для всех. Для чайки — нет!"),
  {
    t: "game",
    rule: ["stadt/mit-1"],
    task: "Кто как добирался сегодня? Расставьте по уликам.",
    hint: "Начните с тех, о ком сказано прямо. Хауке — без машины.",
    c: {
      kind: "grid",
      people: ["Hauke", "Frauke", "Dana", "Elif"],
      cols: [{ id: "wie", label: "heute", values: ["mit dem Fahrrad", "mit dem Auto", "zu Fuß", "mit dem Bus"] }],
      clues: [
        { de: "Das Auto ist voll: Hauke fährt nicht mit dem Auto.", ru: "Машина забита: Хауке едет не на машине.", a: "Hauke", b: "wie:mit dem Auto", not: true },
        { de: "Elif fährt mit uns mit dem Bus.", ru: "Элиф едет с нами на автобусе.", a: "Elif", b: "wie:mit dem Bus" },
        { de: "Das Krankenhaus ist in der Nähe: Dana kommt zu Fuß.", ru: "Больница рядом: Дана приходит пешком.", a: "Dana", b: "wie:zu Fuß" },
      ],
      answer: { "Hauke|wie": "mit dem Fahrrad", "Frauke|wie": "mit dem Auto", "Dana|wie": "zu Fuß", "Elif|wie": "mit dem Bus" },
    },
  },
  hauke("Frauke mit dem Auto, ich mit dem Fahrrad – und die Möwe mit dem Bus. Wie ein Tourist!", "Фрауке на машине, я на велосипеде — а чайка на автобусе. Как турист!"),
  { t: "game", task: "Слова дня перемешались. Откройте пары: немецкое слово и перевод.", c: memory(["stadtplan", "faehre", "automat", "traegerin", "hinterhof", "fahrkarte"]) },
  {
    t: "reply",
    rule: ["stadt/hause-1"],
    task: "Матео спрашивает, где вы будете завтра утром. Ответьте: дома, до десяти.",
    options: [
      ok("Bis zehn bin ich zu Hause."),
      no("Bis zehn bin ich nach Hause.", "Где? — zu Hause. nach Hause — куда."),
      no("Bis zehn bin ich bei Hause.", "Устойчиво: zu Hause — дома."),
    ],
  },
  {
    t: "game",
    task: "Хауке проверяет, что вы запомнили: одно слово в группе лишнее.",
    hint: HINT_ODD,
    c: odd([
      [["der Bus", "die Straßenbahn", "der Zug", "die Apotheke"], "die Apotheke", "Аптека — место, остальное — транспорт."],
      [["links", "rechts", "geradeaus", "die Post"], "die Post", "Почта — место, остальное — куда идти."],
      [["einsteigen", "aussteigen", "umsteigen", "das Taxi"], "das Taxi", "Такси — транспорт, остальное — что делают в автобусе."],
    ]),
  },
  { t: "game", task: "Лото на ночь: послушайте слово и закройте его на карточке.", hint: HINT_HEAR, c: bingo(["der Bahnhof", "die Haltestelle", "die Post", "die Ampel", "das Fahrrad", "das Auto", "der Bus", "die Fahrkarte", "das Krankenhaus"]) },
  {
    t: "pick",
    task: "Что делать завтра?",
    options: [
      ok("В десять — к врачу, вместе с Даной"),
      no("Снова ехать в мастерскую", "Грета и Йенсен завтра опять у врача, мастерская подождёт."),
      no("Искать вторую вывеску MOIN MOIN", "Вывеска кафе новая и чужая. Наша табличка — в мастерской."),
    ],
  },
  narr("Вы закрываете блокнот: «День девятый. Schild: in der Werkstatt, ganz. Greta und ein Mann mit Schal: beim Arzt». Noch drei Tage."),
  {
    t: "clue",
    title: "Morgen um zehn",
    text: "Das Schild ist in der Werkstatt in Gaarden — ganz. Greta und Herr Jensen (Schal, sagt nichts): beim Arzt. Morgen um zehn wieder. Dana kommt mit.",
  },
];

const play = (nodes: SceneNode[]) => ({ kind: "play" as const, nodes });

export const sceneChapter9: Episode = {
  id: "moin-neu-9",
  title: "Beim Arzt",
  day: { de: "Noch vier Tage", ru: "ещё четыре дня до Kieler Woche" },
  place: "Kiel und Gaarden · вокзал, автобус, двор за почтой",
  topic: "Город и транспорт",
  grammar: "mit, zu, bei, nach + дательный · zum, zur, beim · повелительное на Sie · zu Hause, nach Hause",
  beats: [
    {
      id: "09-s1",
      title: "Sturm",
      story: [],
      prompt: "Шторм, план на Гаарден и машина, которую обещал Хауке.",
      hint: "mit + дательный: mit dem Auto, mit dem Bus.",
      success: "Фрауке так и не приехала. Вы едете на автобусе, Хауке ждёт машину.",
      challenge: play(sturm),
    },
    {
      id: "09-s2",
      title: "Linie 11",
      story: [],
      prompt: "Вокзал: табло, автомат и чайка в автобусе.",
      hint: "Steigen Sie ein! — глагол первым, приставка в конце.",
      success: "Чайка едет с вами, Нильс прислал дорогу. Выходите у почты.",
      challenge: play(bahnhof),
    },
    {
      id: "09-i1",
      title: "Глазами Хауке",
      pov: "глазами Хауке",
      story: [],
      prompt: "Интерлюдия: Хауке ждёт машину Фрауке, а едет на бабушкином велосипеде.",
      hint: "Wie komme ich zum Farbenweg? — der Weg: zum.",
      success: "Почтальонша знает дорогу: Farbenweg — за почтой, через двор.",
      challenge: play(fahrrad),
    },
    {
      id: "09-s3",
      title: "Links oder rechts?",
      story: [],
      prompt: "Gaarden: Нильс пишет «налево», Матео говорит «направо».",
      hint: "an der zweiten Ampel — где? an + дательный.",
      success: "Команда пошла налево — по тексту Нильса.",
      challenge: play(ampel),
    },
    {
      id: "09-s4",
      title: "Moin Moin",
      story: [],
      prompt: "Кафе с тёмно-синей вывеской MOIN MOIN и Хауке на велосипеде.",
      hint: "zur Post — die Post, zum Farbenweg — der Weg.",
      success: "Вывеска чужая и новая. Зато Хауке знает дорогу через двор.",
      challenge: play(cafe),
    },
    {
      id: "09-s5",
      title: "Beim Arzt",
      story: [],
      prompt: "Двор за почтой: закрытая мастерская и табличка в окне.",
      hint: "beim Arzt — у врача, zum Arzt — к врачу.",
      success: "Табличка цела. Грета у врача с молчаливым мужчиной в шарфе.",
      challenge: play(hof),
    },
    {
      id: "09-s6",
      title: "Noch vier Tage",
      story: [],
      prompt: "Автобус домой, чайка, речь как на экзамене и новость от Греты.",
      hint: "Wo? — zu Hause, wohin? — nach Hause.",
      success: "День девятый закончен. Завтра в десять — у врача. Noch drei Tage.",
      challenge: play(abend),
    },
  ],
};
