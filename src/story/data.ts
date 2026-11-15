import { chapter1 } from "./chapters/01-moin.ts";
import { extras } from "./extra.ts";
import type {
  ChatTurn,
  Episode,
  Phrase,
  Challenge,
  VoiceLine,
} from "./types.ts";
const choice = (
  answer: string,
  options: [string, string, string][],
): Challenge => ({
  kind: "choice",
  answer,
  options: options.map(([id, text, why]) => ({ id, text, why })),
});
const order = (
  answer: string[],
  tiles: string[],
  also?: string[][],
): Challenge => ({ kind: "order", answer, tiles, ...(also ? { also } : {}) });
const pairs = (
  left: [string, string][],
  right: [string, string][],
  answer: Record<string, string>,
): Challenge => ({
  kind: "match",
  left: left.map(([id, text]) => ({ id, text })),
  right: right.map(([id, text]) => ({ id, text })),
  answer,
});

const verdict = (
  labels: [string, string],
  items: [string, boolean, string][],
): Challenge => ({
  kind: "verdict",
  labels,
  items: items.map(([text, answer, why], i) => ({
    id: String(i),
    text,
    answer,
    why,
  })),
});
const turn = (
  say: string,
  ru: string,
  answer: string,
  options: [string, string, string][],
): ChatTurn => ({
  say,
  ru,
  answer,
  options: options.map(([id, text, why]) => ({ id, text, why })),
});
const chat = (who: string, voice: string, turns: ChatTurn[]): Challenge => ({
  kind: "chat",
  who,
  voice,
  turns,
});
const line = (
  who: string,
  voice: string,
  text: string,
  ru: string,
): VoiceLine => ({ who, voice, text, ru });
const write = (
  title: string,
  fields: [string, string, string[]][],
): Challenge => ({
  kind: "write",
  title,
  fields: fields.map(([id, label, answers]) => ({ id, label, answers })),
});
/** Пропуск в тексте записки обозначается ___. */
const gaps = (text: string, bank: string[], answer: string[]): Challenge => ({
  kind: "gaps",
  parts: text.split("___").flatMap((part, i) => (i ? [null, part] : [part])),
  bank,
  answer,
});
const sort = (
  bins: [string, string][],
  cards: [string, string, string, string?][],
): Challenge => ({
  kind: "sort",
  bins: bins.map(([id, text]) => ({ id, text })),
  cards: cards.map(([id, text, , icon]) => ({
    id,
    text,
    ...(icon ? { icon } : {}),
  })),
  answer: Object.fromEntries(cards.map(([id, , bin]) => [id, bin])),
});
/** Строки документа делятся на нажимаемые части знаком |; ответ — текст нужных частей. */
const spot = (title: string, text: string[], answer: string[]): Challenge => {
  const lines = text.map((line) => line.split("|"));
  const id = (token: string) => {
    const line = lines.findIndex((l) => l.includes(token));
    return `${line}:${lines[line].indexOf(token)}`;
  };
  return { kind: "spot", title, lines, answer: answer.map(id) };
};
/** Пары строятся из уже проверенных единиц; ru задаёт форму для карточки. */
const memory = (ids: string[], ru: Record<string, string> = {}): Challenge => ({
  kind: "memory",
  pairs: ids.map((id) => ({
    id,
    de: phrases[id].de,
    ru: ru[id] ?? phrases[id].ru,
  })),
});
const clock = (answer: string, traps: Record<string, string>): Challenge => ({
  kind: "clock",
  start: "12:00",
  step: 15,
  answer,
  traps,
});

// Each replacement is an authored grammatical unit, never a dictionary substitution.
export const phrases: Record<string, Phrase> = {
  moin: {
    ru: "привет",
    de: "Moin",
    note: "Северогерманское приветствие; подходит не только утром.",
  },
  schild: {
    ru: "табличка",
    de: "das Schild",
    pl: "Schilder",
    note: "Табличка MOIN — талисман клуба.",
  },
  moewe: {
    ru: "чайка",
    de: "die Möwe",
    pl: "Möwen",
    note: "В Киле их больше, чем свидетелей.",
  },
  aufsteller: {
    ru: "подставка",
    de: "der Aufsteller",
    pl: "Aufsteller",
    note: "Подставка для таблички или меню у входа.",
  },
  kiste: {
    ru: "ящик",
    de: "die Kiste",
    pl: "Kisten",
    note: "Ящик с крышкой или без: для инструментов, бутылок, рыбы.",
  },
  boot: {
    ru: "лодка",
    de: "das Boot",
    pl: "Boote",
    note: "«Sprotte» — лодка Хауке.",
  },
  tuer: {
    ru: "дверь",
    de: "die Tür",
    pl: "Türen",
    note: "Дверь комнаты, дома или шкафа — всё die Tür.",
  },
  ehrentafel: {
    ru: "доска почёта",
    de: "die Ehrentafel",
    pl: "Ehrentafeln",
    note: "die Ehre — честь, die Tafel — доска; род у сложного слова — по последней части.",
  },
  fenster: {
    ru: "окно",
    de: "das Fenster",
    pl: "Fenster",
    note: "Окно — и в доме, и на экране компьютера.",
  },
  logbuch: {
    ru: "журнал клуба",
    de: "das Logbuch",
    pl: "Logbücher",
    note: "das Buch — книга: бортовой журнал, куда записывают всё за день. Род — по последней части.",
  },
  anhaenger: {
    ru: "бирка",
    de: "der Anhänger",
    pl: "Anhänger",
    note: "an + hängen — «навешивать»: бирка на верёвочке.",
  },
  feder: {
    ru: "перо",
    de: "die Feder",
    pl: "Federn",
    note: "Перо чайки — die Möwenfeder.",
  },
  taschenlampe: {
    ru: "фонарик",
    de: "die Taschenlampe",
    pl: "Taschenlampen",
    note: "die Tasche — карман, die Lampe — лампа: фонарь, который носят в кармане.",
  },
  buero: {
    ru: "офис",
    de: "das Büro",
    pl: "Büros",
    note: "Ударение, как в русском «бюро», на последний слог.",
  },
  gaestezimmer: {
    ru: "гостевая комната",
    de: "das Gästezimmer",
    pl: "Gästezimmer",
    note: "der Gast — гость, das Zimmer — комната; род по последней части.",
  },
  gaestebuch: {
    ru: "книга гостей",
    de: "das Gästebuch",
    pl: "Gästebücher",
    note: "das Buch — книга, как в das Logbuch: род по последней части.",
  },
  stempel: {
    ru: "штамп",
    de: "der Stempel",
    pl: "Stempel",
    note: "Печать в офисе: фрау Петерсен ставит штамп на каждый формуляр.",
  },
  formular: {
    ru: "формуляр, бланк",
    de: "das Formular",
    pl: "Formulare",
    note: "На экзамене A1 его заполняют в Schreiben, Teil 1.",
  },
  ring: {
    ru: "кольцо",
    de: "der Ring",
    pl: "Ringe",
    note: "У птиц на лапе — кольцо с номером: так учёные узнают птицу.",
  },
  nachricht: {
    ru: "сообщение",
    de: "die Nachricht",
    pl: "Nachrichten",
    note: "И SMS, и запись на автоответчике.",
  },
  zollstock: {
    ru: "складной метр",
    de: "der Zollstock",
    pl: "Zollstöcke",
    note: "der Zoll — дюйм, der Stock — палка: метр, который складывается гармошкой.",
  },
  dose: {
    ru: "банка",
    de: "die Dose",
    pl: "Dosen",
    note: "Жестяная банка с крышкой: для краски, чая или печенья.",
  },
  wasserfest: {
    ru: "не боится воды",
    de: "wasserfest",
    note: "das Wasser — вода, fest — крепкий. Так пишут на лодочной краске. Не «водный праздник», хотя das Fest — праздник.",
  },
  pinsel: {
    ru: "кисть",
    de: "der Pinsel",
    pl: "Pinsel",
    note: "Латинское penicillus — кисточка; отсюда и пенициллин: плесень похожа на кисти.",
  },
  rezept: {
    ru: "рецепт",
    de: "das Rezept",
    pl: "Rezepte",
    note: "И рецепт пирога, и рецепт врача — одно слово.",
  },
  butterkuchen: {
    ru: "масляный пирог",
    de: "der Butterkuchen",
    pl: "Butterkuchen",
    note: "die Butter — масло, der Kuchen — пирог: плоский северный пирог с маслом и сахаром. Род — по последней части.",
  },
  nest: {
    ru: "гнездо",
    de: "das Nest",
    pl: "Nester",
    note: "Окончание -er, как das Kind — die Kinder.",
  },
  leiter: {
    ru: "лестница-стремянка",
    de: "die Leiter",
    pl: "Leitern",
    note: "Переносная лестница. Лестница в доме — die Treppe.",
  },
  brille: {
    ru: "очки",
    de: "die Brille",
    pl: "Brillen",
    note: "По-немецки очки — одна вещь, как «пенсне»: die Brille.",
  },
  kruemel: {
    ru: "крошка",
    de: "der Krümel",
    pl: "Krümel",
    note: "Так зовут и пса Лотты.",
  },
  plakat: {
    ru: "плакат",
    de: "das Plakat",
    pl: "Plakate",
    note: "Школьный плакат, афиша, транспарант — всё das Plakat.",
  },
  karte: {
    ru: "открытка",
    de: "die Karte",
    pl: "Karten",
    note: "И открытка, и карточка, и билет. Открытка ко дню рождения — die Geburtstagskarte.",
  },
  stand: {
    ru: "ларёк",
    de: "der Stand",
    pl: "Stände",
    note: "Ларёк или палатка: на Kieler Woche вдоль воды стоят сотни ларьков.",
  },
  tablett: {
    ru: "поднос",
    de: "das Tablett",
    pl: "Tabletts",
    note: "Не путать с die Tablette — таблетка.",
  },
  serviette: {
    ru: "салфетка",
    de: "die Serviette",
    pl: "Servietten",
    note: "Почти как по-русски.",
  },
  skizze: {
    ru: "набросок, эскиз",
    de: "die Skizze",
    pl: "Skizzen",
    note: "Русское «эскиз» — то же слово.",
  },
  fleck: {
    ru: "след, пятно",
    de: "der Fleck",
    pl: "Flecken",
    note: "Ein Teefleck — след от чая.",
  },
  laden: {
    ru: "лавка, магазин",
    de: "der Laden",
    pl: "Läden",
    note: "Небольшой магазин. Der Bootsladen — всё для лодок: канаты, краска, непромокаемая одежда.",
  },
  kassenbon: {
    ru: "чек",
    de: "der Kassenbon",
    pl: "Kassenbons",
    note: "Его печатает касса: что, сколько и во сколько. Коротко — der Bon.",
  },
  zettel: {
    ru: "список покупок",
    de: "der Einkaufszettel",
    pl: "Einkaufszettel",
    note: "einkaufen + der Zettel, листок: что купить.",
  },
  zucker: {
    ru: "сахар",
    de: "der Zucker",
    pl: "-",
    note: "Сахар считают пачками и ложками: eine Packung Zucker, fünf Packungen Zucker.",
  },
  geschenk: {
    ru: "подарок",
    de: "das Geschenk",
    pl: "Geschenke",
    note: "От schenken — дарить. Матео готовит его команде к Kieler Woche.",
  },
  stimme: {
    ru: "голос",
    de: "die Stimme",
    pl: "Stimmen",
    note: "Голос в трубке: его узнают даже по одному слову.",
  },
  buchstabe: {
    ru: "буква",
    de: "der Buchstabe",
    pl: "Buchstaben",
    note: "Отсюда buchstabieren — называть по буквам. На табличке MOIN — четыре буквы.",
  },
  regal: {
    ru: "стеллаж, полка",
    de: "das Regal",
    pl: "Regale",
    note: "Полки магазина или шкафа от пола до потолка.",
  },
  seil: {
    ru: "канат, верёвка",
    de: "das Seil",
    pl: "Seile",
    note: "На лодке всё держится на канатах: парус, мачта, причал.",
  },
  blau: {
    ru: "тёмно-синий",
    de: "dunkelblau",
    note: "dunkel — тёмный, blau — синий. Цвет таблички MOIN.",
  },
  weiss: {
    ru: "белый",
    de: "weiß",
    note: "Цвет букв на табличке. И ещё «знаю»: ich weiß — пишется так же.",
  },
  // Цвета ждёт экзамен A1, а уроки их не дают: в новой версии они приходят в главе 5, где
  // Farbe — и цвет, и краска (A1-PLOT.md, «Цвета в новой версии»).
  rot: {
    ru: "красный",
    de: "rot",
    note: "Родня русскому «рыжий» и английскому red.",
  },
  gelb: {
    ru: "жёлтый",
    de: "gelb",
    note: "Родня русскому «жёлтый» и английскому yellow: g-l ≈ ж-л.",
  },
  blue: {
    ru: "синий",
    de: "blau",
    note: "dunkelblau — тёмно-синий: dunkel + blau.",
  },
  gruen: {
    ru: "зелёный",
    de: "grün",
    note: "Как английское green. Через ü: зелёный — grün.",
  },
  schwarz: {
    ru: "чёрный",
    de: "schwarz",
    note: "Фамилия Шварц — «Чёрный».",
  },
  grau: {
    ru: "серый",
    de: "grau",
    note: "Как английское grey. Читается «грау».",
  },
  braun: {
    ru: "коричневый",
    de: "braun",
    note: "Как английское brown. Фамилия Браун — «Коричневый».",
  },
  markt: {
    ru: "рынок",
    de: "der Markt",
    pl: "Märkte",
    note: "Der Wochenmarkt — рынок раз в неделю: овощи, фрукты, рыба, цветы.",
  },
  kekse: {
    ru: "пачка печенья",
    de: "eine Packung Kekse",
    note: "Keks — от английского cakes. Пачка у Нильса — для всей команды.",
  },
  sprachnachricht: {
    ru: "голосовое сообщение",
    de: "die Sprachnachricht",
    pl: "Sprachnachrichten",
    note: "die Sprache — язык, речь + die Nachricht — сообщение.",
  },
  kassenbuch: {
    ru: "кассовая книга",
    de: "das Kassenbuch",
    pl: "Kassenbücher",
    note: "die Kasse + das Buch: что продано и во сколько. У Фрауке — с минутами.",
  },
  terrasse: {
    ru: "терраса",
    de: "die Terrasse",
    pl: "Terrassen",
    note: "Почти как по-русски. У клуба она сзади, у воды: оттуда не видно входа.",
  },
  einbruch: {
    ru: "взлом",
    de: "der Einbruch",
    pl: "Einbrüche",
    note: "ein + brechen, «ломать внутрь». Любимое слово Матео после детективов.",
  },
  werkstatt: {
    ru: "мастерская",
    de: "die Werkstatt",
    pl: "Werkstätten",
    note: "das Werk — работа, die Statt — место: место, где работают руками.",
  },
  teebeutel: {
    ru: "чайный пакетик",
    de: "der Teebeutel",
    pl: "Teebeutel",
    note: "der Tee + der Beutel, мешочек. Ярлычок на нитке — тоже от него.",
  },
  wort: {
    ru: "слово",
    de: "das Wort",
    pl: "Wörter",
    note: "Слова Йенсена в клубе считают поштучно: обычно одно в день — Moin.",
  },
  wieimmer: {
    ru: "как всегда",
    de: "wie immer",
    note: "Любимое у Йенсена: чай в половине шестого — wie immer, каждый день.",
  },
  hinten: {
    ru: "сзади",
    de: "hinten",
    note: "А спереди — vorne. Терраса клуба — hinten, у воды; подставка — vorne, у входа.",
  },
  niemand: {
    ru: "никто",
    de: "niemand",
    note: "Vorne ist niemand — спереди никого. Ответ на вопрос wer?",
  },
  ganzeclub: {
    ru: "весь клуб",
    de: "der ganze Club",
    note: "ganz — целый: der ganze Tag — весь день, der ganze Club — весь клуб.",
  },
  flach: {
    ru: "плоский",
    de: "flach",
    note: "Плоская сумка или коробка — как раз по размеру таблички.",
  },
  weg: {
    ru: "нет на месте, пропал",
    de: "weg",
    note: "Das Schild ist weg — табличка пропала. Короткое слово для всего, что исчезло.",
  },
  filmabend: {
    ru: "вечер кино",
    de: "der Filmabend",
    pl: "Filmabende",
    note: "der Film + der Abend. Летом у гавани — прямо на стене клуба.",
  },
  picknick: {
    ru: "пикник",
    de: "das Picknick",
    pl: "Picknicks",
    note: "Почти как по-русски. На Ostsee его устраивают прямо на пляже, на пледе.",
  },
  strandball: {
    ru: "пляжный мяч",
    de: "der Strandball",
    pl: "Strandbälle",
    note: "der Strand + der Ball. Лёгкий, надувной — для чайки как раз.",
  },
  projektor: {
    ru: "проектор",
    de: "der Projektor",
    pl: "Projektoren",
    note: "Ударение на -jek-: Pro-JEK-tor. Показывает фильм на стене клуба.",
  },
  keller: {
    ru: "подвал",
    de: "der Keller",
    pl: "Keller",
    note: "Под клубом — паруса, вёсла и всё, что не помещается наверху. Im Keller — в подвале.",
  },
  sturm: {
    ru: "шторм",
    de: "der Sturm",
    pl: "Stürme",
    note: "На Ostsee его первыми чуют чайки: улетают в город раньше, чем приходит ветер.",
  },
  lager: {
    ru: "тайник, склад",
    de: "das Lager",
    pl: "Lager",
    note: "Склад, запас. У чайки — в подвале клуба, у окошка с разбитым стеклом.",
  },
  schal: {
    ru: "шарф",
    de: "der Schal",
    pl: "Schals",
    note: "У Йенсена — тёмно-синий. В июне шарф носят, только когда что-то не так.",
  },
  briefkasten: {
    ru: "почтовый ящик",
    de: "der Briefkasten",
    pl: "Briefkästen",
    note: "der Brief + der Kasten. В подъезде — по ящику на квартиру, с фамилией и этажом.",
  },
  hand: {
    ru: "рука",
    de: "die Hand",
    pl: "Hände",
    note: "Кисть руки — то, чем держат кисть. У Греты они в тёмно-синей краске.",
  },
  leer: {
    ru: "Коробка пустая.",
    de: "Der Karton ist leer.",
    note: "leer — пустой, наоборот — voll, полный.",
  },
  entfuehrung: {
    ru: "похищение",
    de: "die Entführung",
    pl: "Entführungen",
    note: "Любимое слово Фрауке на этой неделе: из любой поездки на автобусе она делает детектив.",
  },
  entschuldigung: {
    ru: "Извините! Простите!",
    de: "Entschuldigung!",
    note: "Так извиняются и так обращаются к незнакомому человеку на улице.",
  },
  karton: {
    ru: "коробка",
    de: "der Karton",
    pl: "Kartons",
    note: "Из плотного картона. У Йенсена — плоская, точно по размеру таблички.",
  },
  umriss: {
    ru: "контур",
    de: "der Umriss",
    pl: "Umrisse",
    note: "um + reißen: «обвести вокруг». Вырезан в поролоне по форме вещи.",
  },
  fahrkarte: {
    ru: "билет",
    de: "die Fahrkarte",
    pl: "Fahrkarten",
    note: "fahren + die Karte. На автобусном билете — день, время и маршрут.",
  },
  stadtplan: {
    ru: "план города",
    de: "der Stadtplan",
    pl: "Stadtpläne",
    note: "die Stadt + der Plan. На старом плане Греты по Килю ещё ходит трамвай.",
  },
  faehre: {
    ru: "паром",
    de: "die Fähre",
    pl: "Fähren",
    note: "Возит людей через фьорд в Gaarden. В шторм не ходит.",
  },
  automat: {
    ru: "автомат",
    de: "der Automat",
    pl: "Automaten",
    note: "Билетный автомат на вокзале. Сдачи этот не даёт.",
  },
  traegerin: {
    ru: "почтальонша",
    de: "die Briefträgerin",
    pl: "Briefträgerinnen",
    note: "der Brief — письмо, tragen — носить: та, кто разносит письма. Мужчина — der Briefträger.",
  },
  hinterhof: {
    ru: "задний двор",
    de: "der Hinterhof",
    pl: "Hinterhöfe",
    note: "hinter — за, der Hof — двор. В Гаардене мастерские часто прячутся во дворах.",
  },
  beimarzt: {
    ru: "Мы у врача. Вернёмся в три.",
    de: "Wir sind beim Arzt. Zurück um drei.",
    note: "beim Arzt — у врача: bei + dem. zurück — обратно.",
  },
  aerztehaus: {
    ru: "дом врачей",
    de: "das Ärztehaus",
    pl: "Ärztehäuser",
    note: "der Arzt — врач, die Ärzte — врачи, das Haus — дом: в одном доме несколько практик.",
  },
  anmeldung: {
    ru: "регистратура",
    de: "die Anmeldung",
    pl: "Anmeldungen",
    note: "Стойка у входа в практику: здесь показывают страховую карточку и называют свой Termin.",
  },
  notizblock: {
    ru: "блок для записок",
    de: "der Notizblock",
    pl: "Notizblöcke",
    note: "die Notiz — заметка, der Block — блок. Йенсену нельзя говорить, и он пишет записку за запиской.",
  },
  zeitschrift: {
    ru: "журнал",
    de: "die Zeitschrift",
    pl: "Zeitschriften",
    note: "В приёмной — журналы о здоровье. За одним из них прячется Дана.",
  },
  geheimnis: {
    ru: "тайна, секрет",
    de: "das Geheimnis",
    pl: "Geheimnisse",
    note: "geheim — тайный. Всю неделю у клуба было два секрета: табличка и торт.",
  },
  ueberraschung: {
    ru: "сюрприз",
    de: "die Überraschung",
    pl: "Überraschungen",
    note: "überraschen — удивить. Сюрприз к столетию клуба.",
  },
  wetterbericht: {
    ru: "прогноз погоды",
    de: "der Wetterbericht",
    pl: "Wetterberichte",
    note: "das Wetter + der Bericht — доклад. По радио Дерьи — каждое утро.",
  },
  muetze: {
    ru: "фуражка, шапка",
    de: "die Mütze",
    pl: "Mützen",
    note: "Капитанская фуражка Йенсена — die Kapitänsmütze. На фото 1976 года она уже есть.",
  },
  trocken: {
    ru: "сухой",
    de: "trocken",
    note: "Наоборот — nass, мокрый. Краске нужно время, чтобы стать trocken.",
  },
  trockenraum: {
    ru: "сушильная",
    de: "der Trockenraum",
    pl: "Trockenräume",
    note: "trocken + der Raum — помещение. В отеле у гавани здесь сушат полотенца — и сегодня табличку.",
  },
  foehn: {
    ru: "фен",
    de: "der Föhn",
    pl: "Föhne",
    note: "Фен для волос. И для краски — если очень надо.",
  },
  barometer: {
    ru: "барометр",
    de: "das Barometer",
    pl: "Barometer",
    note: "Старый барометр клуба: стрелка показывает Sonne, Regen или Sturm.",
  },
  start: {
    ru: "старт",
    de: "der Start",
    pl: "Starts",
    note: "Старт регаты Kieler Woche. Ohne MOIN kein Start — без таблички не стартуют.",
  },
  neu: {
    ru: "Вы новичок. Вы видите всё.",
    de: "Sie sind neu. Sie sehen alles.",
    note: "sein: Sie sind. Вежливое Sie пишется с большой буквы; sehen — видеть.",
  },
  name: {
    ru: "Как вас зовут?",
    de: "Wie heißen Sie?",
    note: "Вежливое Sie; heißen стоит после вопросительного слова.",
  },
  kiel: {
    ru: "Я живу в Киле.",
    de: "Ich wohne in Kiel.",
    note: "wohne согласуется с ich; глагол на втором месте.",
  },
  where: {
    ru: "Где табличка?",
    de: "Wo ist das Schild?",
    note: "das Schild — табличка. В W-вопросе глагол после Wo.",
  },
  argentina: {
    ru: "Я из Аргентины.",
    de: "Ich komme aus Argentinien.",
    note: "kommen aus — происхождение; wohnen in — место жительства.",
  },
  bitte: {
    ru: "пожалуйста",
    de: "bitte",
    note: "В просьбе или в ответ на благодарность.",
  },
  danke: { ru: "спасибо", de: "danke", note: "Короткая благодарность." },
  phone: {
    ru: "номер телефона",
    de: "die Telefonnummer",
    pl: "Telefonnummern",
    note: "Номер мобильного — die Handynummer.",
  },
  have: {
    ru: "У меня есть время.",
    de: "Ich habe Zeit.",
    note: "haben: ich habe, du hast, er hat.",
  },
  sister: {
    ru: "моя сестра",
    de: "meine Schwester",
    note: "Schwester женского рода: meine в именительном падеже.",
  },
  brother: {
    ru: "мой брат",
    de: "mein Bruder",
    note: "Bruder мужского рода: mein в именительном падеже.",
  },
  bag: {
    ru: "сумка",
    de: "die Tasche",
    pl: "Taschen",
    note: "Форма для знакомства со словом. В других контекстах артикль может меняться.",
  },
  hisbag: {
    ru: "его сумка",
    de: "seine Tasche",
    note: "sein- указывает на владельца; -e согласуется с Tasche.",
  },
  nobag: {
    ru: "Это не моя сумка.",
    de: "Das ist nicht meine Tasche.",
    note: "Отрицаем принадлежность конкретной сумки: nicht meine.",
  },
  water: {
    ru: "воду",
    de: "Wasser",
    note: "Без артикля при заказе: Ich möchte Wasser.",
  },
  coffee: {
    ru: "кофе",
    de: "Kaffee",
    note: "der Kaffee. В заказе без артикля: Ich möchte Kaffee.",
  },
  nocoffee: {
    ru: "Я не хочу кофе.",
    de: "Ich möchte keinen Kaffee.",
    note: "Мужской род в Akkusativ: keinen Kaffee.",
  },
  tea: {
    ru: "Я хочу чай.",
    de: "Ich möchte einen Tee.",
    note: "Мужской род в Akkusativ: einen Tee.",
  },
  bread: {
    ru: "хлеб",
    de: "Brot",
    note: "das Brot; zwei Brote — два хлеба / две буханки.",
  },
  bill: {
    ru: "Счёт, пожалуйста.",
    de: "Die Rechnung, bitte.",
    note: "Короткая вежливая просьба в кафе.",
  },
  price: {
    ru: "Сколько это стоит?",
    de: "Was kostet das?",
    note: "kosten в единственном числе: kostet.",
  },
  him: {
    ru: "Я беру его.",
    de: "Ich nehme ihn.",
    note: "ihn заменяет предмет мужского рода в Akkusativ, например der Pullover.",
  },
  expensive: {
    ru: "Это слишком дорого.",
    de: "Das ist zu teuer.",
    note: "После sein прилагательное без окончания; zu — слишком.",
  },
  half: {
    ru: "в половине шестого",
    de: "um halb sechs",
    note: "halb sechs = 17:30 или 05:30; часть суток даёт контекст.",
  },
  sunday: {
    ru: "в воскресенье",
    de: "am Sonntag",
    note: "Дни недели: am + день.",
  },
  starts: {
    ru: "Встреча начинается.",
    de: "Das Treffen fängt an.",
    note: "Отделяемая приставка an стоит в конце.",
  },
  call: {
    ru: "Я позвоню тебе.",
    de: "Ich rufe dich an.",
    note: "Präsens может обозначать план; an отделяется, dich — Akkusativ.",
  },
  can: {
    ru: "Я могу прийти.",
    de: "Ich kann kommen.",
    note: "kann на втором месте, инфинитив kommen в конце.",
  },
  cannot: {
    ru: "Я не могу прийти.",
    de: "Ich kann nicht kommen.",
    note: "nicht перед конечным инфинитивом.",
  },
  rather: {
    ru: "Я лучше пойду в музей.",
    de: "Ich gehe lieber ins Museum.",
    note: "lieber — предпочтительнее; ins = in das, направление.",
  },
  together: {
    ru: "Мы хотим искать вместе.",
    de: "Wir wollen zusammen suchen.",
    note: "wollen спрягается, suchen остаётся инфинитивом в конце.",
  },
  inbag: {
    ru: "в сумке",
    de: "in der Tasche",
    note: "Где? in + Dativ. die Tasche → in der Tasche.",
  },
  table: {
    ru: "на столе",
    de: "auf dem Tisch",
    note: "Где? auf + Dativ. der Tisch → auf dem Tisch.",
  },
  kitchen: {
    ru: "на кухне",
    de: "in der Küche",
    note: "Где? in + Dativ, женский род: der Küche.",
  },
  key: {
    ru: "ключ",
    de: "der Schlüssel",
    pl: "Schlüssel",
    note: "Ключ от комнаты, от шкафа, от машины.",
  },
  bus: {
    ru: "на автобусе",
    de: "mit dem Bus",
    note: "mit всегда требует Dativ: der Bus → dem Bus.",
  },
  cafe: {
    ru: "к кафе",
    de: "zum Café",
    note: "zu + dem = zum; das Café в Dativ: dem Café.",
  },
  station: {
    ru: "к остановке",
    de: "zur Haltestelle",
    note: "zu + der = zur; die Haltestelle в Dativ: der Haltestelle.",
  },
  straight: {
    ru: "Идите прямо.",
    de: "Gehen Sie geradeaus.",
    note: "Вежливое повелительное наклонение: глагол + Sie.",
  },
  home: {
    ru: "дома",
    de: "zu Hause",
    note: "Место: zu Hause; направление домой: nach Hause.",
  },
  must: {
    ru: "Вам нужно подождать.",
    de: "Sie müssen warten.",
    note: "модальный müssen + инфинитив в конце.",
  },
  headache: {
    ru: "У меня болит голова.",
    de: "Ich habe Kopfschmerzen.",
    note: "habe + Kopfschmerzen, обычно во множественном числе.",
  },
  sit: {
    ru: "Садись, пожалуйста.",
    de: "Setz dich bitte.",
    note: "Просьба на du; dich — возвратное местоимение.",
  },
  noentry: {
    ru: "Вам нельзя сюда входить.",
    de: "Sie dürfen hier nicht hinein.",
    note: "dürfen + nicht выражает запрет.",
  },
  worked: {
    ru: "Я вчера работал.",
    de: "Ich habe gestern gearbeitet.",
    note: "Perfekt: habe на втором месте, gearbeitet в конце.",
  },
  cook: {
    ru: "Я повар.",
    de: "Ich bin Koch.",
    note: "Профессия после sein обычно без неопределённого артикля.",
  },
  was: {
    ru: "Я был в офисе.",
    de: "Ich war im Büro.",
    note: "Präteritum от sein: war; im = in dem.",
  },
  had: {
    ru: "У меня не было ключа.",
    de: "Ich hatte keinen Schlüssel.",
    note: "hatte — Präteritum от haben; keinen + Akkusativ.",
  },
  arrived: {
    ru: "Сумка прибыла.",
    de: "Die Tasche ist angekommen.",
    note: "Perfekt с sein: ist angekommen, речь о прибытии.",
  },
  rain: {
    ru: "Идёт дождь.",
    de: "Es regnet.",
    note: "Безличное es. Для погоды: Es ist windig.",
  },
  date: {
    ru: "первого июня",
    de: "am ersten Juni",
    note: "Дата: am + порядковое числительное с -en.",
  },
  traveled: {
    ru: "Мы поехали на автобусе.",
    de: "Wir sind mit dem Bus gefahren.",
    note: "Перемещение: Perfekt с sein; mit + Dativ.",
  },
  found: {
    ru: "Мы нашли табличку.",
    de: "Wir haben das Schild gefunden.",
    note: "finden образует Perfekt с haben; найден предмет в Akkusativ.",
  },
  // Словарь экзамена Start Deutsch 1 вне уроков (A1-PLAN.md, этап 3): слово вводится в рассказе главы
  // своей темы и возвращается в играх со словами. Глава 1 — знакомство и анкета.
  pass: { ru: "паспорт", de: "der Pass", pl: "Pässe", note: "Иностранцы показывают Pass, немцы — Ausweis." },
  ausweis: { ru: "удостоверение личности", de: "der Ausweis", pl: "Ausweise", note: "Немецкая ID-карта. В анкете: Ausweisnummer." },
  ausland: { ru: "заграница", de: "das Ausland", pl: "-", note: "im Ausland — за границей, ins Ausland — за границу." },
  auslaender: { ru: "иностранец", de: "der Ausländer", pl: "Ausländer", note: "О женщине — с окончанием -in. Слово от das Ausland — заграница." },
  geboren: { ru: "родился, родилась", de: "geboren", note: "Ich bin 1996 in Hamburg geboren. В анкете: geboren am …" },
  geburtsort: { ru: "место рождения", de: "der Geburtsort", pl: "Geburtsorte", note: "die Geburt — рождение + der Ort — место. Род по последней части: der." },
  geburtsjahr: { ru: "год рождения", de: "das Geburtsjahr", pl: "Geburtsjahre", note: "die Geburt + das Jahr — das Geburtsjahr. Графа анкеты." },
  unterschrift: { ru: "подпись", de: "die Unterschrift", pl: "Unterschriften", note: "Внизу анкеты: Datum, Unterschrift." },
  unterschreiben: { ru: "подписывать, расписываться", de: "unterschreiben", note: "Bitte hier unterschreiben! — Распишитесь, пожалуйста, здесь." },
  mensch: { ru: "человек", de: "der Mensch", pl: "Menschen", note: "Любой человек; мужчина — der Mann, женщина — die Frau." },
  heimat: { ru: "родина", de: "die Heimat", pl: "-", note: "Meine Heimat ist Kasachstan. Место, откуда человек родом." },
  europa: { ru: "Европа", de: "Europa", note: "Без артикля, как Deutschland: in Europa, aus Europa." },
  international: { ru: "международный", de: "international", note: "Kieler Woche ist international: команды из многих стран." },
  vorstellen: { ru: "представлять(ся)", de: "sich vorstellen", note: "Ich stelle mich vor: Ich heiße … — Представлюсь: меня зовут …" },
  kennenlernen: { ru: "знакомиться", de: "kennenlernen", note: "Wir möchten Sie kennenlernen. — Мы хотим с вами познакомиться." },
  // Глава 2 — числа, телефон, вопросы и ответы.
  dreizehn: { ru: "тринадцать", de: "dreizehn", note: "drei + zehn: от 13 до 19 единицы звучат первыми." },
  vierzehn: { ru: "четырнадцать", de: "vierzehn", note: "vier + zehn. Ударение на первом слоге: VIER·zehn." },
  fuenfzehn: { ru: "пятнадцать", de: "fünfzehn", note: "fünf + zehn — как пишется, так и звучит." },
  sechzehn: { ru: "шестнадцать", de: "sechzehn", note: "Внимание: sech-zehn, без s из sechs." },
  siebzehn: { ru: "семнадцать", de: "siebzehn", note: "Внимание: sieb-zehn, без en из sieben." },
  achtzehn: { ru: "восемнадцать", de: "achtzehn", note: "acht + zehn, одно t." },
  vierzig: { ru: "сорок", de: "vierzig", note: "Десятки на -zig: vierzig, fünfzig …" },
  sechzig: { ru: "шестьдесят", de: "sechzig", note: "Как sechzehn — без s: sech-zig." },
  siebzig: { ru: "семьдесят", de: "siebzig", note: "Как siebzehn — без en: sieb-zig." },
  achtzig: { ru: "восемьдесят", de: "achtzig", note: "acht + zig." },
  neunzig: { ru: "девяносто", de: "neunzig", note: "neun + zig." },
  tausend: { ru: "тысяча", de: "tausend", note: "(ein)tausend; 2000 — zweitausend." },
  million: { ru: "миллион", de: "die Million", pl: "Millionen", note: "Eine Million Euro — миллион евро. Пишется с большой буквы, как существительное." },
  vorwahl: { ru: "код (номера)", de: "die Vorwahl", pl: "Vorwahlen", note: "Vorwahl von Kiel: 0431. У мобильных — 015…, 016…, 017…" },
  anruf: { ru: "звонок", de: "der Anruf", pl: "Anrufe", note: "От anrufen — позвонить." },
  anrufbeantworter: { ru: "автоответчик", de: "der Anrufbeantworter", pl: "Anrufbeantworter", note: "der Anruf + beantworten — отвечать на звонки." },
  telefonieren: { ru: "звонить, говорить по телефону", de: "telefonieren", note: "Ich telefoniere mit Nils. Ударение: te·le·fo·NIE·ren." },
  internet: { ru: "интернет", de: "das Internet", pl: "-", note: "im Internet — в интернете." },
  email: { ru: "электронное письмо", de: "die E-Mail", pl: "E-Mails", note: "eine E-Mail schreiben — написать письмо по почте." },
  computer: { ru: "компьютер", de: "der Computer", pl: "Computer", note: "Как в английском, но с артиклем der." },
  wiederholen: { ru: "повторять", de: "wiederholen", note: "Können Sie das bitte wiederholen? — Повторите, пожалуйста." },
  erklaeren: { ru: "объяснять", de: "erklären", note: "Können Sie das erklären? — Объясните, пожалуйста." },
  zumbeispiel: { ru: "например", de: "zum Beispiel", note: "Сокращение — z. B. От das Beispiel — пример." },
  antwort: { ru: "ответ", de: "die Antwort", pl: "Antworten", note: "Frage und Antwort — вопрос и ответ." },
  antworten: { ru: "отвечать", de: "antworten", note: "Er antwortet nicht. — Он не отвечает." },
  // Глава 3 — семья.
  grossvater: { ru: "дедушка", de: "der Großvater", pl: "Großväter", note: "В анкете — Großvater, дома — Opa." },
  grossmutter: { ru: "бабушка", de: "die Großmutter", pl: "Großmütter", note: "В анкете — Großmutter, дома — Oma." },
  familienstand: { ru: "семейное положение", de: "der Familienstand", pl: "-", note: "Графа анкеты: ledig, verheiratet, geschieden." },
  hochzeit: { ru: "свадьба", de: "die Hochzeit", pl: "Hochzeiten", note: "Ударение на первом слоге: HOCH·zeit. Не путайте с hoch — высокий." },
  ehemann: { ru: "муж", de: "der Ehemann", pl: "Ehemänner", note: "Чаще говорят просто mein Mann." },
  ehefrau: { ru: "жена", de: "die Ehefrau", pl: "Ehefrauen", note: "Чаще говорят просто meine Frau." },
  heiraten: { ru: "жениться, выходить замуж", de: "heiraten", note: "Sie heiraten im Mai. Одно слово — и для него, и для неё." },
  alter: { ru: "возраст", de: "das Alter", pl: "-", note: "Графа анкеты: Alter: 90. Спросить — Wie alt sind Sie?" },
  leben: { ru: "жить", de: "leben", note: "leben — жить вообще; wohnen — жить где-то: Ich wohne in Kiel." },
  lieben: { ru: "любить", de: "lieben", note: "Ich liebe dich. О еде и занятиях чаще — mögen и gern." },
  gratulieren: { ru: "поздравлять", de: "gratulieren", note: "Ich gratuliere dir! Ударение: gra·tu·LIE·ren." },
  glueckwunsch: { ru: "поздравление", de: "der Glückwunsch", pl: "Glückwünsche", note: "Herzlichen Glückwunsch! — Сердечно поздравляю!" },
  jugendliche: { ru: "подросток", de: "der Jugendliche", pl: "Jugendlichen", note: "Обычно от 14 до 18 лет. Девушка — die Jugendliche." },
  erwachsene: { ru: "взрослый", de: "der Erwachsene", pl: "Erwachsenen", note: "Взрослый человек; в билетах: Erwachsene 5 €, Kinder 2 €." },
  // Глава 4 — еда.
  haehnchen: { ru: "курица", de: "das Hähnchen", pl: "Hähnchen", note: "Курица как блюдо: ein halbes Hähnchen — полкурицы." },
  reis: { ru: "рис", de: "der Reis", pl: "-", note: "Hähnchen mit Reis — курица с рисом. Не путайте с reisen — путешествовать." },
  schinken: { ru: "ветчина", de: "der Schinken", pl: "Schinken", note: "Ein Brötchen mit Schinken — булочка с ветчиной." },
  getraenk: { ru: "напиток", de: "das Getränk", pl: "Getränke", note: "От trinken: всё, что пьют. Cola, Wasser, Tee — это Getränke." },
  restaurant: { ru: "ресторан", de: "das Restaurant", pl: "Restaurants", note: "Читается на французский лад: последнее t не звучит." },
  lokal: { ru: "заведение", de: "das Lokal", pl: "Lokale", note: "Любое место, где едят и пьют: от пивной до ресторана. Ударение на последнем слоге." },
  salz: { ru: "соль", de: "das Salz", pl: "-", note: "Salz und Pfeffer — соль и перец." },
  oel: { ru: "растительное масло", de: "das Öl", pl: "-", note: "Масло для салата и сковородки. Сливочное — die Butter." },
  butter: { ru: "сливочное масло", de: "die Butter", pl: "-", note: "Brot mit Butter — хлеб с маслом." },
  baeckerei: { ru: "пекарня", de: "die Bäckerei", pl: "Bäckereien", note: "От der Bäcker — пекарь. Там продают Brot und Brötchen." },
  riechen: { ru: "пахнуть; нюхать", de: "riechen", note: "Das riecht gut! — Как хорошо пахнет!" },
  schmecken: { ru: "быть вкусным", de: "schmecken", note: "Schmeckt's? — Вкусно? Das schmeckt gut! — Это вкусно!" },
  bitter: { ru: "горький", de: "bitter", note: "Kaffee ohne Zucker ist bitter." },
  obst: { ru: "фрукты", de: "das Obst", pl: "-", note: "Одно слово на все фрукты сразу: Obst und Gemüse — фрукты и овощи." },
  birne: { ru: "груша", de: "die Birne", pl: "Birnen", note: "Ещё так называют лампочку — по форме." },
  // Глава 5 — одежда, магазин, деньги.
  kleidung: { ru: "одежда", de: "die Kleidung", pl: "-", note: "Всё, что носят: Hose, Hemd, Jacke." },
  anziehen: { ru: "надевать", de: "anziehen", note: "Ich ziehe die Jacke an. Приставка an уходит в конец." },
  ausziehen: { ru: "снимать (одежду)", de: "ausziehen", note: "Er zieht die Jacke aus. Ещё значит «съезжать с квартиры»." },
  geschaeft: { ru: "магазин", de: "das Geschäft", pl: "Geschäfte", note: "Магазин, а ещё — дело, бизнес: Das Geschäft läuft gut." },
  verkaufen: { ru: "продавать", de: "verkaufen", note: "kaufen — покупать, verkaufen — продавать. Приставка ver- не отделяется." },
  preis: { ru: "цена", de: "der Preis", pl: "Preise", note: "Was kostet das? — спрашивают о цене. Ещё Preis — это приз." },
  angebot: { ru: "акция", de: "das Angebot", pl: "Angebote", note: "Предложение; в магазине — скидка: Das ist im Angebot." },
  prozent: { ru: "процент", de: "das Prozent", pl: "Prozente", note: "Zehn Prozent — десять процентов. После числа слово не меняется." },
  kasse: { ru: "касса", de: "die Kasse", pl: "Kassen", note: "An der Kasse bezahlen — платить на кассе." },
  cent: { ru: "цент", de: "der Cent", pl: "Cent", note: "Hundert Cent — ein Euro. После числа: fünfzig Cent." },
  geld: { ru: "деньги", de: "das Geld", pl: "-", note: "Ich habe kein Geld. — У меня нет денег." },
  kunde: { ru: "покупатель", de: "der Kunde", pl: "Kunden", note: "Покупатель, клиент. Покупательница — die Kundin." },
  bar: { ru: "наличными", de: "bar", note: "Bar oder mit Karte? — Наличными или картой?" },
  kreditkarte: { ru: "кредитная карта", de: "die Kreditkarte", pl: "Kreditkarten", note: "Чаще говорят просто Karte: Mit Karte, bitte." },
  lebensmittel: { ru: "продукты", de: "die Lebensmittel", pl: "-", note: "Всё, что покупают для еды: Brot, Milch, Obst." },
  gewicht: { ru: "вес", de: "das Gewicht", pl: "Gewichte", note: "Вес на рынке — в Kilo и Gramm." },
  gramm: { ru: "грамм", de: "das Gramm", pl: "Gramm", note: "Hundert Gramm Käse — сто граммов сыра. После числа слово не меняется." },
  // Глава 6 — время и распорядок дня.
  puenktlich: { ru: "пунктуальный", de: "pünktlich", note: "Der Bus ist pünktlich. — Автобус приходит вовремя." },
  sekunde: { ru: "секунда", de: "die Sekunde", pl: "Sekunden", note: "Eine Minute hat sechzig Sekunden." },
  eilig: { ru: "срочно", de: "eilig", note: "Ich habe es eilig. — Я спешу." },
  bald: { ru: "скоро", de: "bald", note: "Bis bald! — До скорого!" },
  gleich: { ru: "сейчас, сразу", de: "gleich", note: "Ich komme gleich! — Сейчас приду! Ещё значит «одинаковый»." },
  sofort: { ru: "немедленно", de: "sofort", note: "Sofort! — Сию минуту! Быстрее, чем gleich." },
  zurzeit: { ru: "в настоящее время", de: "zurzeit", note: "Zurzeit wohne ich in Kiel. Пишется слитно." },
  gerade: { ru: "как раз сейчас", de: "gerade", note: "Ich esse gerade. — Я как раз ем. Ещё значит «прямой»." },
  moment: { ru: "момент", de: "der Moment", pl: "Momente", note: "Moment, bitte! — Минуточку!" },
  januar: { ru: "январь", de: "der Januar", pl: "-", note: "Im Januar — в январе: в Киле холодно и темно." },
  februar: { ru: "февраль", de: "der Februar", pl: "-", note: "Im Februar — в феврале. Самый короткий месяц." },
  maerz: { ru: "март", de: "der März", pl: "-", note: "Im März — в марте. Пишется с умлаутом." },
  april: { ru: "апрель", de: "der April", pl: "-", note: "Im April — в апреле. Aprilwetter — погода, которая меняется каждый час." },
  mai: { ru: "май", de: "der Mai", pl: "-", note: "Im Mai — в мае. Пишется через ai." },
  juni: { ru: "июнь", de: "der Juni", pl: "-", note: "Im Juni — в июне. Kieler Woche — всегда в июне." },
  juli: { ru: "июль", de: "der Juli", pl: "-", note: "Im Juli — в июле. Чтобы не спутать с Juni, говорят «Julei»." },
  august: { ru: "август", de: "der August", pl: "-", note: "Im August — в августе. Ударение на второй слог: au·GUST." },
  september: { ru: "сентябрь", de: "der September", pl: "-", note: "Im September — в сентябре." },
  oktober: { ru: "октябрь", de: "der Oktober", pl: "-", note: "Im Oktober — в октябре. Oktoberfest начинается ещё в сентябре." },
  november: { ru: "ноябрь", de: "der November", pl: "-", note: "Im November — в ноябре." },
  dezember: { ru: "декабрь", de: "der Dezember", pl: "-", note: "Im Dezember — в декабре. Пишется через z." },
  wochentag: { ru: "день недели", de: "der Wochentag", pl: "Wochentage", note: "Montag, Dienstag … Sonntag." },
  feiertag: { ru: "праздник", de: "der Feiertag", pl: "Feiertage", note: "Праздничный выходной: An Feiertagen geschlossen." },
  anfang: { ru: "начало", de: "der Anfang", pl: "Anfänge", note: "Am Anfang — вначале. От anfangen — начинать." },
  schluss: { ru: "конец", de: "der Schluss", pl: "Schlüsse", note: "Schluss! — Хватит! Zum Schluss — в конце." },
  beginnen: { ru: "начинаться", de: "beginnen", note: "Der Tee beginnt um halb sechs. Как anfangen, только без приставки." },
  enden: { ru: "заканчиваться", de: "enden", note: "Der Tee endet um sechs." },
  dusche: { ru: "душ", de: "die Dusche", pl: "Duschen", note: "Unter der Dusche — в душе. Глагол — duschen." },
  muede: { ru: "уставший", de: "müde", note: "Ich bin müde. — Я устал." },
  anmachen: { ru: "включать", de: "anmachen", note: "Mach das Licht an! — Включи свет! Приставка an — в конце." },
  ausmachen: { ru: "выключать", de: "ausmachen", note: "Er macht das Licht aus. — Он гасит свет." },
  // Глава 7 — досуг.
  wandern: { ru: "ходить в походы", de: "wandern", note: "Wir wandern am Wochenende. — В выходные мы ходим в поход." },
  radfahren: { ru: "кататься на велосипеде", de: "Rad fahren", note: "Ich fahre Rad. Rad — короткое Fahrrad." },
  laufen: { ru: "бегать", de: "laufen", note: "Ещё — идти пешком. У du и er умлаут: du läufst, er läuft." },
  baden: { ru: "купаться", de: "baden", note: "Im Meer baden — купаться в море. Ещё — принимать ванну." },
  ausflug: { ru: "поездка на день", de: "der Ausflug", pl: "Ausflüge", note: "Einen Ausflug machen — съездить куда-нибудь." },
  verein: { ru: "клуб, общество", de: "der Verein", pl: "Vereine", note: "Sportverein, Segelverein: в Германии клуб есть почти для всего." },
  eintritt: { ru: "вход", de: "der Eintritt", pl: "Eintritte", note: "Плата за вход. Eintritt frei — вход бесплатный." },
  feuer: { ru: "костёр", de: "das Feuer", pl: "Feuer", note: "Огонь вообще. Haben Sie Feuer? — Есть зажигалка?" },
  disco: { ru: "дискотека", de: "die Disco", pl: "Discos", note: "In die Disco gehen — пойти на дискотеку." },
  gruppe: { ru: "группа", de: "die Gruppe", pl: "Gruppen", note: "In der Gruppe — в группе." },
  lustig: { ru: "весёлый", de: "lustig", note: "Der Film ist lustig. — Фильм смешной." },
  mitmachen: { ru: "участвовать", de: "mitmachen", note: "Machst du mit? — Ты с нами? Приставка mit — в конце." },
  gewinnen: { ru: "выигрывать", de: "gewinnen", note: "Wer gewinnt? — Кто выигрывает?" },
  garten: { ru: "сад", de: "der Garten", pl: "Gärten", note: "Im Garten — в саду. Kindergarten — детский сад." },
  baum: { ru: "дерево", de: "der Baum", pl: "Bäume", note: "Дерево, которое растёт. Деревянный — aus Holz." },
  blume: { ru: "цветок", de: "die Blume", pl: "Blumen", note: "Blumen schenken — дарить цветы." },
  see: { ru: "озеро", de: "der See", pl: "Seen", note: "der See — озеро, а die See — море, как в Ostsee." },
  bild: { ru: "картина", de: "das Bild", pl: "Bilder", note: "Картина, фото, изображение: ein Bild machen." },
  gefallen: { ru: "нравиться", de: "gefallen", note: "Das gefällt mir. — Мне это нравится. Что нравится — в начале фразы." },
  lieblingsfilm: { ru: "любимый фильм", de: "der Lieblingsfilm", pl: "Lieblingsfilme", note: "Lieblings- + слово: Lieblingsessen, Lieblingsfarbe." },
  // Глава 8 — дом и жильё.
  draussen: { ru: "снаружи", de: "draußen", note: "Draußen regnet es. — На улице дождь." },
  aufzug: { ru: "лифт", de: "der Aufzug", pl: "Aufzüge", note: "Mit dem Aufzug fahren — ехать на лифте." },
  treppe: { ru: "лестница", de: "die Treppe", pl: "Treppen", note: "Die Treppe hoch — вверх по лестнице. Treppenhaus — подъезд." },
  oben: { ru: "наверху", de: "oben", note: "Oben ist das Büro. Наоборот — unten." },
  unten: { ru: "внизу", de: "unten", note: "Unten ist der Keller." },
  mitte: { ru: "середина", de: "die Mitte", pl: "-", note: "In der Mitte — посередине." },
  daneben: { ru: "рядом", de: "daneben", note: "Der Tisch steht in der Mitte, der Schrank daneben." },
  hoch: { ru: "высокий", de: "hoch", note: "Перед существительным теряет c: ein hoher Schrank." },
  breit: { ru: "широкий", de: "breit", note: "Der Schrank ist zwei Meter breit." },
  ordnung: { ru: "порядок", de: "die Ordnung", pl: "-", note: "In Ordnung! — Хорошо, договорились!" },
  legen: { ru: "класть", de: "legen", note: "Ich lege das Buch auf den Tisch. А лежит — liegt." },
  waschen: { ru: "мыть, стирать", de: "waschen", note: "Er wäscht den Ball. У du и er — умлаут." },
  vermieten: { ru: "сдавать внаём", de: "vermieten", note: "Herr Wulff vermietet Wohnungen. Он — der Vermieter." },
  umziehen: { ru: "переезжать", de: "umziehen", note: "Wir ziehen nach Kiel um. Приставка um — в конце." },
  apartment: { ru: "небольшая квартира", de: "das Apartment", pl: "Apartments", note: "Одна комната с кухней и ванной." },
  toilette: { ru: "туалет", de: "die Toilette", pl: "Toiletten", note: "Wo ist die Toilette? — Где туалет?" },
  besetzt: { ru: "занято", de: "besetzt", note: "Надпись на туалете или ответ телефона. Свободно — frei." },
  // Глава 9 — город, вокзал, почта.
  ansage: { ru: "объявление", de: "die Ansage", pl: "Ansagen", note: "Объявление голосом: на вокзале, в автобусе, на автоответчике." },
  eingang: { ru: "вход", de: "der Eingang", pl: "Eingänge", note: "Eingang — вход, Ausgang — выход." },
  ausgang: { ru: "выход", de: "der Ausgang", pl: "Ausgänge", note: "Wo ist der Ausgang? — Где выход?" },
  auskunft: { ru: "справочная", de: "die Auskunft", pl: "Auskünfte", note: "Справка и окно справок на вокзале." },
  schalter: { ru: "окошко", de: "der Schalter", pl: "Schalter", note: "Окошко на вокзале, почте, в банке. Ещё — выключатель." },
  abfahrt: { ru: "отправление", de: "die Abfahrt", pl: "Abfahrten", note: "От abfahren — отправляться." },
  ankunft: { ru: "прибытие", de: "die Ankunft", pl: "Ankünfte", note: "От ankommen — прибывать." },
  bahnsteig: { ru: "перрон", de: "der Bahnsteig", pl: "Bahnsteige", note: "Der Zug fährt von Gleis 3: путь и перрон рядом." },
  ticket: { ru: "билет", de: "das Ticket", pl: "Tickets", note: "То же, что Fahrkarte; Ticket бывает и в кино." },
  gueltig: { ru: "действителен", de: "gültig", note: "Die Fahrkarte ist 90 Minuten gültig." },
  fahrer: { ru: "водитель", de: "der Fahrer", pl: "Fahrer", note: "От fahren. Busfahrer — водитель автобуса." },
  verboten: { ru: "запрещено", de: "verboten", note: "Rauchen verboten! — Курить запрещено!" },
  vorsicht: { ru: "осторожно", de: "die Vorsicht", pl: "-", note: "Vorsicht! — Осторожно! На табличках — с восклицательным знаком." },
  autobahn: { ru: "автобан", de: "die Autobahn", pl: "Autobahnen", note: "Скоростная дорога; велосипедам туда нельзя." },
  lkw: { ru: "грузовик", de: "der Lkw", pl: "Lkws", note: "Читается «эль-ка-вэ»: Lastkraftwagen." },
  kilometer: { ru: "километр", de: "der Kilometer", pl: "Kilometer", note: "Zehn Kilometer: после числа слово не меняется." },
  norden: { ru: "север", de: "der Norden", pl: "-", note: "Im Norden — на севере. Kiel liegt im Norden." },
  sueden: { ru: "юг", de: "der Süden", pl: "-", note: "Im Süden — на юге: München liegt im Süden." },
  westen: { ru: "запад", de: "der Westen", pl: "-", note: "Im Westen — на западе. Восток — der Osten." },
  briefmarke: { ru: "марка", de: "die Briefmarke", pl: "Briefmarken", note: "Марка на письмо: der Brief — письмо." },
  absender: { ru: "отправитель", de: "der Absender", pl: "Absender", note: "На конверте: Absender — от кого." },
  empfaenger: { ru: "получатель", de: "der Empfänger", pl: "Empfänger", note: "На конверте: Empfänger — кому." },
  konto: { ru: "счёт в банке", de: "das Konto", pl: "Konten", note: "Ein Konto eröffnen — открыть счёт." },
  ueberweisen: { ru: "переводить деньги", de: "überweisen", note: "Geld auf ein Konto überweisen — перевести деньги на счёт." },
  prospekt: { ru: "буклет", de: "der Prospekt", pl: "Prospekte", note: "Рекламный буклет: в кафе, отеле, турбюро." },
  sehenswuerdigkeit: { ru: "достопримечательность", de: "die Sehenswürdigkeit", pl: "Sehenswürdigkeiten", note: "От sehen: то, что стоит посмотреть." },
  besichtigen: { ru: "осматривать", de: "besichtigen", note: "Die Stadt besichtigen — осматривать город." },
  fuehrung: { ru: "экскурсия", de: "die Führung", pl: "Führungen", note: "Экскурсия с гидом: eine Führung durch Kiel." },
  dorf: { ru: "деревня", de: "das Dorf", pl: "Dörfer", note: "Auf dem Dorf — в деревне." },
  ort: { ru: "населённый пункт", de: "der Ort", pl: "Orte", note: "Место и небольшой городок: ein kleiner Ort." },
  // Глава 10 — здоровье.
  aussehen: { ru: "выглядеть", de: "aussehen", note: "Du siehst gut aus! — Ты хорошо выглядишь! Приставка aus — в конце." },
  schlecht: { ru: "плохо", de: "schlecht", note: "Mir geht es schlecht. — Мне плохо. Наоборот — gut." },
  glueck: { ru: "удача, счастье", de: "das Glück", pl: "-", note: "Viel Glück! — Удачи! Zum Glück — к счастью." },
  mund: { ru: "рот", de: "der Mund", pl: "Münder", note: "Mund auf! — Откройте рот!" },
  haar: { ru: "волосы", de: "das Haar", pl: "Haare", note: "Волосы на голове. Haare waschen — мыть голову." },
  zigarette: { ru: "сигарета", de: "die Zigarette", pl: "Zigaretten", note: "Глагол — rauchen: курить." },
  boese: { ru: "злой", de: "böse", note: "Bist du böse? — Ты сердишься?" },
  empfehlen: { ru: "рекомендовать", de: "empfehlen", note: "Ich empfehle Tee. У du и er: empfiehlst, empfiehlt." },
  normal: { ru: "нормально", de: "normal", note: "Das ist normal. — Это нормально." },
  gluecklich: { ru: "счастливый", de: "glücklich", note: "Ich bin glücklich. — Я счастлив." },
  wichtig: { ru: "важно", de: "wichtig", note: "Das ist wichtig! — Это важно!" },
  moeglich: { ru: "возможно", de: "möglich", note: "Das ist nicht möglich. — Это невозможно." },
  // Глава 11 — работа, учёба, бумаги.
  job: { ru: "приработок", de: "der Job", pl: "Jobs", note: "Работа, чаще временная: ein Job für den Sommer." },
  praktikum: { ru: "практика", de: "das Praktikum", pl: "Praktika", note: "Ein Praktikum machen — проходить практику." },
  studium: { ru: "учёба в вузе", de: "das Studium", pl: "Studien", note: "Глагол — studieren: учиться в университете." },
  verdienen: { ru: "зарабатывать", de: "verdienen", note: "Wie viel verdienst du? — Сколько ты зарабатываешь?" },
  arbeitsplatz: { ru: "рабочее место", de: "der Arbeitsplatz", pl: "Arbeitsplätze", note: "Arbeit + Platz: место, где работают." },
  chef: { ru: "начальник", de: "der Chef", pl: "Chefs", note: "Начальница — die Chefin. Читается «шеф»." },
  selbststaendig: { ru: "самозанятый", de: "selbstständig", note: "Ich bin selbstständig. — Я работаю на себя." },
  bleistift: { ru: "карандаш", de: "der Bleistift", pl: "Bleistifte", note: "Blei — свинец: так раньше называли грифель." },
  teil: { ru: "часть", de: "der Teil", pl: "Teile", note: "Ein Teil vom Schild — часть таблички." },
  zentimeter: { ru: "сантиметр", de: "der Zentimeter", pl: "Zentimeter", note: "Zehn Zentimeter: после числа слово не меняется." },
  fehler: { ru: "ошибка", de: "der Fehler", pl: "Fehler", note: "Einen Fehler machen — сделать ошибку." },
  benutzen: { ru: "пользоваться", de: "benutzen", note: "Darf ich das benutzen? — Можно этим воспользоваться?" },
  aussage: { ru: "показание", de: "die Aussage", pl: "Aussagen", note: "Что человек говорит о деле: Aussage — от aussagen." },
  hausaufgabe: { ru: "домашнее задание", de: "die Hausaufgabe", pl: "Hausaufgaben", note: "Haus + Aufgabe: задание на дом." },
  aufgabe: { ru: "задание", de: "die Aufgabe", pl: "Aufgaben", note: "Aufgabe 3 — задание номер три." },
  loesung: { ru: "решение", de: "die Lösung", pl: "Lösungen", note: "Ответ к заданию или выход из ситуации." },
  unterricht: { ru: "урок, занятия", de: "der Unterricht", pl: "-", note: "Der Unterricht beginnt um acht. — Занятия в восемь." },
  klasse: { ru: "класс", de: "die Klasse", pl: "Klassen", note: "Ich bin in der dritten Klasse. Klasse! — ещё и «здорово!»." },
  schueler: { ru: "ученик", de: "der Schüler", pl: "Schüler", note: "Ученица — Schülerin. Ходит в школу: die Schule." },
  ergebnis: { ru: "результат", de: "das Ergebnis", pl: "Ergebnisse", note: "Результат теста или матча." },
  bogen: { ru: "бланк", de: "der Bogen", pl: "Bögen", note: "Fragebogen — анкета, лист с вопросами." },
  anrede: { ru: "обращение", de: "die Anrede", pl: "Anreden", note: "В бланке: Anrede — Herr или Frau." },
  maennlich: { ru: "мужской", de: "männlich", note: "В бланке: Geschlecht — männlich или weiblich." },
  weiblich: { ru: "женский", de: "weiblich", note: "В бланке рядом с männlich." },
  ankreuzen: { ru: "отмечать крестиком", de: "ankreuzen", note: "Kreuzen Sie an! — Отметьте крестиком! Приставка an — в конце." },
  abgeben: { ru: "сдавать", de: "abgeben", note: "Den Bogen abgeben — сдать бланк." },
  papiere: { ru: "документы", de: "die Papiere", pl: "-", note: "Паспорт, справки, бланки: Ihre Papiere, bitte!" },
  drucken: { ru: "печатать", de: "drucken", note: "Не путайте с drücken — нажимать." },
  drucker: { ru: "принтер", de: "der Drucker", pl: "Drucker", note: "От drucken — печатать." },
  anklicken: { ru: "кликать", de: "anklicken", note: "Klicken Sie hier an! — Нажмите здесь!" },
  kugelschreiber: { ru: "ручка", de: "der Kugelschreiber", pl: "Kugelschreiber", note: "Шариковая ручка; коротко — der Kuli." },
  bedeuten: { ru: "значить", de: "bedeuten", note: "Was bedeutet das? — Что это значит?" },
  satz: { ru: "предложение", de: "der Satz", pl: "Sätze", note: "Предложение из слов. Ещё — набор: ein Satz Teller." },
  // Глава 12 — поездки и праздник.
  reisebuero: { ru: "турагентство", de: "das Reisebüro", pl: "Reisebüros", note: "Reise + Büro: там покупают поездки." },
  reisefuehrer: { ru: "путеводитель", de: "der Reiseführer", pl: "Reiseführer", note: "Книга о городе, а ещё — гид." },
  meer: { ru: "море", de: "das Meer", pl: "Meere", note: "Am Meer — на море. Ostsee — тоже море." },
  welt: { ru: "мир", de: "die Welt", pl: "Welten", note: "Auf der ganzen Welt — во всём мире." },
  abflug: { ru: "вылет", de: "der Abflug", pl: "Abflüge", note: "Abflug — вылет, Ankunft — прилёт." },
  fliegen: { ru: "летать", de: "fliegen", note: "Nach Helgoland fliegen — лететь на Гельголанд." },
  anschluss: { ru: "пересадка", de: "der Anschluss", pl: "Anschlüsse", note: "Поезд, на который пересаживаются: den Anschluss verpassen." },
  gepaeck: { ru: "багаж", de: "das Gepäck", pl: "-", note: "Всё, что везут с собой: Koffer, Tasche, Rucksack." },
  halbpension: { ru: "полупансион", de: "die Halbpension", pl: "-", note: "В отеле: завтрак и ужин." },
  uebernachten: { ru: "ночевать", de: "übernachten", note: "Im Hotel übernachten — ночевать в отеле." },
  abfliegen: { ru: "вылетать", de: "abfliegen", note: "Das Flugzeug fliegt um acht ab. Приставка ab — в конце." },
  zoll: { ru: "таможня", de: "der Zoll", pl: "Zölle", note: "На границе и в аэропорту: Zoll — таможня; ещё — пошлина." },
  fremd: { ru: "чужой", de: "fremd", note: "Ich bin fremd hier. — Я здесь не местный." },
  deutsche: { ru: "немец", de: "der Deutsche", pl: "Deutschen", note: "Немка — die Deutsche." },
  europaeer: { ru: "европеец", de: "der Europäer", pl: "Europäer", note: "От Europa. Европейский — europäisch." },
  europaeisch: { ru: "европейский", de: "europäisch", note: "Прилагательное — с маленькой буквы: die europäische Stadt." },
  kulturell: { ru: "культурный", de: "kulturell", note: "Ein kulturelles Programm — культурная программа." },
  auslaendisch: { ru: "иностранный", de: "ausländisch", note: "От das Ausland — заграница." },
  milliarde: { ru: "миллиард", de: "die Milliarde", pl: "Milliarden", note: "Tausend Millionen — eine Milliarde." },
};

export const episodes: Episode[] = [
  chapter1,
  {
    id: "zahlen",
    title: "Телефон без паники",
    place: "Holtenauer Straße · офис",
    topic: "Числа и алфавит",
    grammar: "0–1000 · haben · да/нет · спеллинг",
    review: ["phone", "have", "bitte", "danke"],
    beats: [
      {
        id: "02-number",
        title: "Одна цифра — другой детектив",
        story: [
          "Петерсен диктует {phone}. «Запишите аккуратно, {bitte}». На соседней бумажке номер пиццерии. У неё, вероятно, более приятные дела.",
        ],
        voices: [
          line(
            "Frau Petersen",
            "Sandy",
            "Null, eins, sieben, sechs. Zwei, drei. Vier, fünf. Acht, eins.",
            "0176 23 45 81",
          ),
        ],
        practice: ["phone"],
        prompt:
          "Послушайте и наберите номер Нильса. Начальный ноль тоже нужен.",
        challenge: { kind: "code", length: 10, answer: "0176234581" },
        hint: "null=0, eins=1, zwei=2, drei=3, vier=4, fünf=5, sechs=6, sieben=7, acht=8.",
        success:
          "Нильс отвечает. Это уже лучше, чем заказать четыре семейные пиццы.",
      },
      {
        id: "02-have",
        title: "Свидетель на связи",
        story: [
          "Вы говорите «{danke}». Нильс: «{have}» — и готов помочь. Он не просит ждать до пенсии.",
        ],
        practice: ["have"],
        prompt: "Ответьте «У тебя есть время?»",
        challenge: order(["Hast", "du", "Zeit?"], ["Zeit?", "Hast", "du"]),
        hint: "В вопросе да/нет глагол стоит первым. haben: du hast.",
        success: "«Ja, ich habe Zeit». Разговор можно продолжать.",
      },
      {
        id: "02-room",
        title: "Номер комнаты",
        story: [
          "Нильс оставил записку в офисе. Петерсен просит принести папку: {bitte}, без всех архивов за тридцать лет.",
        ],
        voices: [
          line(
            "Frau Petersen",
            "Sandy",
            "Die Mappe ist in Zimmer zweihundertvierzehn. Nicht zweihundertvierzig.",
            "Папка в комнате 214. Не 240.",
          ),
        ],
        prompt: "Послушайте Петерсен и выберите комнату.",
        challenge: choice("214", [
          [
            "240",
            "240",
            "zweihundertvierzig — 240, этот номер прямо исключён.",
          ],
          ["214", "214", "zweihundertvierzehn — 214."],
          ["204", "204", "Здесь не vier, а vierzehn: четырнадцать."],
        ]),
        hint: "vierzehn=14, vierzig=40.",
        success:
          "В комнате 214 лежит папка. В комнате 240 — совещание. Вы избежали более серьёзной опасности.",
      },
      {
        id: "02-spell",
        title: "M, а не N",
        story: [
          "В папке бирка на сумку. Петерсен диктует название по буквам. Это то самое пропавшее приветствие {moin}.",
        ],
        voices: [
          line("Frau Petersen", "Sandy", "Em, O, I, En.", "M, O, I, N."),
        ],
        practice: ["moin"],
        prompt: "Запишите надпись на бирке заглавными буквами.",
        challenge: write("Etikett", [["tag", "Etikett", ["MOIN"]]]),
        hint: "Em — M, O — O, I — I, En — N. На бирке все буквы заглавные.",
        success: "MOIN. Теперь известно, что сумка связана с табличкой.",
      },
      {
        id: "02-pin",
        title: "Где искать фотографию",
        story: [
          "Нильс объясняет: «Ich habe ein Foto». {phone} больше не нужен: следующий след в голосовом сообщении.",
        ],
        voices: [
          line(
            "Nils",
            "Eddy",
            "Das Foto ist in Fach zweiunddreißig. Ja, zweiunddreißig.",
            "Фото в ячейке 32. Да, 32.",
          ),
        ],
        prompt: "Послушайте Нильса и введите номер ячейки с фотографией.",
        challenge: { kind: "code", length: 2, answer: "32" },
        hint: "В 32 сначала произносят единицы: zwei-und-dreißig.",
        success:
          "Из ячейки 32 выглядывает фотография красной сумки. Наконец-то улика, которую можно держать в руках.",
        clue: {
          title: "Бирка MOIN",
          text: "Фотография из ячейки 32 показывает красную сумку с биркой MOIN.",
        },
      },
    ],
  },
  {
    id: "familie",
    title: "Чья вообще сумка?",
    place: "Kiellinie · гости",
    topic: "Семья и вещи",
    grammar: "mein/dein/sein/ihr · ein/kein · множественное число",
    review: ["sister", "brother", "hisbag", "nobag"],
    beats: [
      {
        id: "03-family",
        title: "Родственники в кадре",
        story: [
          "Нильс показывает фото: «Das ist Greta. Sie ist {sister}. Ich bin ihr Bruder». Рядом {bag}. Чайка тоже в кадре, но родственницей себя не объявляла.",
        ],
        source: {
          title: "Подписи к фото",
          lines: [
            "Greta: Nils ist mein Bruder.",
            "Nils: Greta ist meine Schwester.",
            "Greta und Nils sind Geschwister.",
          ],
        },
        practice: ["sister", "brother"],
        prompt: "Кто кому приходится?",
        challenge: pairs(
          [
            ["g", "Greta для Нильса"],
            ["n", "Nils для Греты"],
            ["both", "Greta и Nils вместе"],
          ],
          [
            ["siblings", "брат и сестра"],
            ["sister", "сестра"],
            ["brother", "брат"],
          ],
          { g: "sister", n: "brother", both: "siblings" },
        ),
        hint: "Bruder — брат; Schwester — сестра; Geschwister — братья и сёстры.",
        success:
          "Семья установлена без генеалогического дерева на сорок листов.",
      },
      {
        id: "03-owner",
        title: "Владелец и окончание",
        story: [
          "Грета подписывает фото: «Nils und {hisbag}». Матео притворяется, что уже всё понял, но держит ручку вверх ногами.",
        ],
        voices: [
          line(
            "Greta",
            "Shelley",
            "Das ist Nils. Das ist seine Tasche. Meine Tasche ist blau.",
            "Это Нильс. Это его сумка. Моя сумка синяя.",
          ),
        ],
        practice: ["hisbag"],
        prompt:
          "Послушайте Грету и подпишите фото: чья сумка красная, а чья синяя?",
        challenge: gaps(
          "Das ist Nils. ___ Tasche ist rot.\nDas ist Greta. ___ Tasche ist ___.",
          ["Seine", "Ihre", "Sein", "blau", "rot"],
          ["Seine", "Ihre", "blau"],
        ),
        hint: "sein- — его; ihr- — её. Окончание зависит от предмета, а не пола владельца.",
        success: "Красная сумка — Нильса. Это ещё не делает его похитителем.",
      },
      {
        id: "03-no",
        title: "Уверенное отрицание",
        story: [
          "Вы показываете Матео фотографию. Он отвечает: «{nobag}». Его собственный рюкзак пахнет хлебом, но запах не числится удостоверением личности.",
        ],
        practice: ["nobag"],
        prompt: "Как понять ответ Матео? Поставьте штамп на каждой записи.",
        challenge: verdict(
          ["Верно", "Неверно"],
          [
            [
              "Эта сумка не его.",
              true,
              "В ответе прямо сказано: Das ist nicht meine Tasche.",
            ],
            [
              "У него вообще нет сумки.",
              false,
              "nicht meine отрицает именно принадлежность. Свою сумку иметь можно.",
            ],
            ["Его сумка пустая.", false, "О содержимом ответа нет."],
          ],
        ),
        hint: "nicht meine Tasche — не моя сумка; keine Tasche — никакой сумки / нет сумки.",
        success:
          "Список владельцев стал короче. Никого не обвиняем по запаху хлеба.",
      },
      {
        id: "03-children",
        title: "Кого ждут у клуба",
        story: [
          "Грета передаёт список гостей. «{brother} тоже придёт». Теперь нужно подготовить карточки, не приписав каждому человека по младенцу.",
        ],
        source: {
          title: "Список гостей",
          lines: [
            "Greta und Nils haben keine Kinder.",
            "Lucía und Diego haben eine Tochter. Sie heißt Sofia.",
          ],
        },
        prompt: "Заполните карточки гостей по списку.",
        challenge: write("Gästekarten", [
          ["bruder", "Greta · Bruder", ["Nils"]],
          ["tochter", "Lucía und Diego · Tochter", ["Sofia"]],
          ["kinder", "Greta und Nils · Kinder", ["keine", "keine Kinder"]],
        ]),
        hint: "keine Kinder — детей нет; Tochter — дочь; Bruder — брат.",
        success:
          "Карточки готовы. София пока единственная участница, которой можно простить молчание весь вечер.",
      },
      {
        id: "03-next",
        title: "Сумка покидает кадр",
        story: [
          "Грета дописывает под фото: «Nils und {hisbag}». На обороте — сообщение о кафе.",
        ],
        source: {
          title: "Оборот фотографии",
          lines: [
            "Die Tasche ist rot. Sie ist nicht hier. Nils und Greta sind im Café Fördeblick.",
          ],
        },
        practice: ["hisbag"],
        prompt: "Какая зацепка ведёт дальше?",
        challenge: choice("cafe", [
          ["home", "Искать дома у Даны.", "Дом Даны в сообщении не упомянут."],
          [
            "cafe",
            "Проверить кафе Fördeblick.",
            "В сообщении названы Nils und Greta и кафе.",
          ],
          [
            "bird",
            "Допросить чайку о цветах.",
            "Чайка в тексте не указана как источник.",
          ],
        ]),
        hint: "nicht hier — не здесь; im Café — в кафе.",
        success:
          "Вы идёте в вымышленное Fördeblick. Матео уверяет: хороший детектив обязан вовремя обедать.",
        clue: {
          title: "Красная сумка Нильса",
          text: "Грета подтверждает владельца и цвет. Последняя совместная остановка брата и сестры — кафе Fördeblick.",
        },
      },
    ],
  },
  {
    id: "essen",
    title: "Допрос с булочкой",
    place: "Holtenau · Fördeblick",
    topic: "Еда и напитки",
    grammar: "Akkusativ · möchten · nicht/kein · gern",
    review: ["nocoffee", "tea", "bill", "bread"],
    beats: [
      {
        id: "04-order",
        title: "Не тот кофе",
        story: [
          "В кафе Матео приветствует вас: «{moin}!» Грета вспоминает заказ: «{nocoffee} {tea}». Запах {coffee} делает показания особенно убедительными.",
        ],
        practice: ["tea", "nocoffee"],
        prompt: "Передайте официанту заказ Греты.",
        challenge: chat("Kellner", "Eddy", [
          turn("Moin! Was möchte Greta?", "Привет! Что хочет Грета?", "tea", [
            ["tea", "Einen Tee, bitte.", ""],
            [
              "coffee",
              "Einen Kaffee, bitte.",
              "«Keinen Kaffee!» — напоминает Грета: кофе она не хочет.",
            ],
            [
              "beer",
              "Ein Bier, bitte.",
              "Официант поднимает брови: пиво в заказе не упомянуто.",
            ],
          ]),
          turn("Und einen Kaffee?", "А кофе?", "no", [
            [
              "yes",
              "Ja, einen Kaffee, bitte.",
              "Грета качает головой: keinen Kaffee.",
            ],
            ["no", "Nein, keinen Kaffee, danke.", ""],
          ]),
          turn("Noch etwas?", "Что-нибудь ещё?", "thanks", [
            [
              "kiel",
              "Ich wohne in Kiel.",
              "Официант спрашивал о заказе, а не об адресе.",
            ],
            ["thanks", "Nein, danke.", ""],
          ]),
        ]),
        hint: "möchte — хотел(а) бы; keinen — отрицание существительного мужского рода.",
        success: "Чай доставлен. Свидетель сотрудничает добровольно.",
      },
      {
        id: "04-basket",
        title: "Заказ для команды",
        story: [
          "Дана выбирает {water} и {bread}. «{danke}», — говорит она. В блокноте немецкие слова уже не выглядят посторонними.",
        ],
        voices: [
          line(
            "Dana",
            "Anna",
            "Zwei Flaschen Wasser, drei Brote und keinen Kaffee, bitte.",
            "Две бутылки воды, три хлеба и никакого кофе, пожалуйста.",
          ),
        ],
        practice: ["water", "bread"],
        prompt: "Послушайте заказ и соберите количества.",
        challenge: {
          kind: "quantity",
          items: [
            { id: "w", text: "Flaschen Wasser", max: 5 },
            { id: "b", text: "Brote", max: 5 },
            { id: "c", text: "Kaffee", max: 5 },
          ],
          answer: { w: 2, b: 3, c: 0 },
        },
        hint: "zwei=2; drei=3; keinen=0. Не добавляйте кофе «на всякий случай».",
        success:
          "Вода и хлеб готовы. Кофемашина переживёт отсутствие внимания.",
      },
      {
        id: "04-request",
        title: "Карточки меню",
        story: [
          "Грета снова говорит: «{tea}» Матео спешит с подносом, задевает стол — и карточки меню разлетаются рубашкой вверх. Чайка за окном делает вид, что ни при чём.",
        ],
        prompt: "Откройте пары: немецкое выражение и его перевод.",
        challenge: memory(["water", "coffee", "bread", "tea", "nocoffee"], {
          water: "вода",
        }),
        hint: "Запоминайте, где лежат карточки. Ошибка ничего не стоит: неверная пара просто закроется при следующем нажатии.",
        success: "Меню снова на столе. Заказ понятен без допросной лампы.",
      },
      {
        id: "04-receipt",
        title: "Немного счёта",
        story: [
          "Нильс произносит: «{bill}» Счёт оказывается полезнее салфетки с портретом подозрительной чайки.",
        ],
        practice: ["bill"],
        prompt: "Нажмите на две строки: итог заказа и запись о сумке.",
        challenge: spot(
          "Учебный чек · стол 4",
          [
            "2 Tee — 5,00 €",
            "1 Brot — 3,50 €",
            "Gesamt: 8,50 €",
            "Keine Tasche im Café.",
          ],
          ["Gesamt: 8,50 €", "Keine Tasche im Café."],
        ),
        hint: "Gesamt — всего; keine Tasche — нет сумки.",
        success:
          "Вы сохраняете чек. Он подтверждает остановку, но не виновника.",
      },
      {
        id: "04-lead",
        title: "Новая остановка",
        story: [
          "«{nocoffee}», — шутит Грета, когда Матео приносит третий чай. Нильс вспоминает магазин после кафе.",
        ],
        source: {
          title: "Записка Нильса",
          lines: [
            "Nach dem Café: einkaufen. Ein Pullover für Greta. Die Tasche ist rot.",
          ],
        },
        prompt: "Запишите в блокнот, что и для кого искать в магазине.",
        challenge: write("Einkaufszettel", [
          ["was", "Was?", ["Pullover", "ein Pullover", "einen Pullover"]],
          ["fuer", "Für wen?", ["Greta", "für Greta"]],
        ]),
        hint: "Ein Pullover für Greta: Pullover — свитер, für Greta — для Греты.",
        success:
          "Впереди магазин. Матео просит не покупать чайку в качестве свидетеля.",
        clue: {
          title: "След после кафе",
          text: "Заказ оплачен: 8,50 €. Красной сумки в кафе нет. Следующая известная остановка гостей — покупка свитера для Греты.",
        },
      },
    ],
  },
  {
    id: "einkaufen",
    title: "Сдача для следствия",
    place: "Holtenauer Straße · магазин",
    topic: "Покупки",
    grammar: "цены · количества · welcher · ihn/sie/es · zu groß",
    review: ["price", "him", "expensive"],
    beats: [
      {
        id: "05-price",
        title: "Вопрос без пантомимы",
        story: [
          "На вешалке свитер. Вы спрашиваете: «{price}» Продавец показывает ценник; чайка снаружи показывает характер.",
        ],
        source: {
          title: "Учебные ценники",
          lines: [
            "Der Pullover: 18,50 €",
            "Die Jacke: 38,50 €",
            "Das T-Shirt: 8,50 €",
          ],
        },
        practice: ["price"],
        prompt: "Продиктуйте цену свитера словами.",
        challenge: gaps(
          "Der Pullover kostet ___ Euro ___.",
          ["achtzehn", "achtzig", "fünfzig", "fünfzehn"],
          ["achtzehn", "fünfzig"],
        ),
        hint: "Найдите ценник свитера. achtzehn — 18, achtzig — 80; fünfzig — 50, fünfzehn — 15.",
        success:
          "18,50 €. Это цена свитера, а не взнос в фонд поиска табличек.",
      },
      {
        id: "05-change",
        title: "Касса без фокусов",
        story: [
          "Грета спрашивает «{price}», платит двадцать евро и ждёт сдачу. Матео считает быстрее, когда речь не о рецептах.",
        ],
        voices: [
          line(
            "Verkäufer",
            "Rocko",
            "Das macht achtzehn Euro fünfzig.",
            "С вас 18,50 €.",
          ),
          line(
            "Greta",
            "Shelley",
            "Hier sind zwanzig Euro.",
            "Вот двадцать евро.",
          ),
        ],
        prompt: "Послушайте и выдайте Грете сдачу монетами.",
        challenge: {
          kind: "coins",
          coins: [200, 100, 50, 20, 10],
          answer: 150,
        },
        hint: "achtzehn Euro fünfzig = 18,50; zwanzig = 20.",
        success:
          "Сдача правильная. Продавец благодарен, что вы расследуете не всю бухгалтерию.",
      },
      {
        id: "05-size",
        title: "Размер имеет значение",
        story: [
          "Свитер найден, но размер не тот. Продавец говорит «zu groß». Это не комплимент вашему детективному таланту.",
        ],
        voices: [
          line(
            "Greta",
            "Shelley",
            "Ich brauche Größe M. Größe L ist zu groß. Der Pullover in M ist blau.",
            "Мне нужен размер M. L слишком большой. Свитер в размере M синий.",
          ),
        ],
        prompt: "Послушайте Грету и ответьте продавцу за неё.",
        challenge: chat("Verkäufer", "Rocko", [
          turn(
            "Welche Größe braucht Greta?",
            "Какой размер нужен Грете?",
            "m",
            [
              [
                "l",
                "Größe L.",
                "Продавец приносит L, но Грета сказала: L ist zu groß.",
              ],
              ["m", "Größe M.", ""],
              ["s", "Größe S.", "Размер S никто не просил."],
            ],
          ),
          turn(
            "Gut. Und welche Farbe hat der Pullover in M?",
            "Хорошо. А какого цвета свитер в размере M?",
            "blue",
            [
              [
                "red",
                "Er ist rot.",
                "Красная здесь только сумка: Der Pullover in M ist blau.",
              ],
              ["blue", "Er ist blau.", ""],
            ],
          ),
        ]),
        hint: "brauchen — нуждаться; zu groß — слишком большой.",
        success:
          "Синий M подходит. Красная сумка не обязана совпадать с одеждой.",
      },
      {
        id: "05-pronoun",
        title: "Не повторять «свитер»",
        story: [
          "Нильс кивает на der Pullover. Грета: «{him}» Местоимение короткое, а покупка уже решена.",
        ],
        practice: ["him"],
        prompt: "Допишите ответы Греты: замените товары местоимениями.",
        challenge: write("Antworten von Greta", [
          ["p", "Der Pullover? Ich nehme …", ["ihn"]],
          ["j", "Die Jacke? Ich nehme … nicht.", ["sie"]],
          ["t", "Das T-Shirt? Ich nehme … auch nicht.", ["es"]],
        ]),
        hint: "В Akkusativ: der Pullover → ihn, die Jacke → sie, das T-Shirt → es.",
        success:
          "Ich nehme ihn. Продавец упаковывает покупку, а куртка и футболка остаются висеть.",
      },
      {
        id: "05-bag",
        title: "Две одинаковые ручки",
        story: [
          "«{expensive}», — комментирует Матео цену декоративного якоря. Вы тем временем находите важную запись о сумках.",
        ],
        source: {
          title: "Запись продавца",
          lines: [
            "Nils: eine rote Tasche mit MOIN.",
            "Jensen: eine rote Tasche mit Brot.",
            "Beide Taschen sind groß. Treffen am Sonntag.",
          ],
        },
        prompt: "Какой вывод оправдан?",
        challenge: choice("two", [
          [
            "one",
            "Красная сумка была только одна.",
            "Beide Taschen — обе сумки; их две.",
          ],
          [
            "two",
            "У Нильса и Йенсена две похожие красные сумки.",
            "Имена, цвет и обе сумки указаны прямо.",
          ],
          [
            "guilty",
            "Йенсен признался в краже.",
            "Запись говорит о вещах, а не о намерениях.",
          ],
        ]),
        hint: "beide — оба/обе; mit — с. Следующая задача — восстановить встречу.",
        success:
          "Две красные сумки. Один детектив. Матео предлагает выдать сумкам фамилии.",
        clue: {
          title: "Две похожие сумки",
          text: "У Нильса красная сумка MOIN, у Йенсена — красная сумка с хлебом. Оба планировали встречу в воскресенье.",
        },
      },
    ],
  },
  {
    id: "zeit",
    title: "Полшестого — не половина дела",
    place: "Клуб · расписание",
    topic: "Время и распорядок",
    grammar: "часы · отделяемые глаголы · um/am/von…bis",
    review: ["half", "sunday", "starts", "call"],
    beats: [
      {
        id: "06-time",
        title: "Услышать встречу",
        story: [
          "Йенсен уточняет время: {sunday}, {half}. Для верности он оставил голосовое сообщение.",
        ],
        audio: {
          file: "sunday",
          text: "Am Sonntag um halb sechs am Nachmittag. Nicht um halb sieben.",
          ru: "В воскресенье в половине шестого дня. Не в половине седьмого.",
        },
        practice: ["half", "sunday"],
        prompt: "Поставьте часы на время встречи.",
        challenge: clock("17:30", {
          "18:30": "halb sieben — 18:30, это время прямо отрицается.",
          "05:30": "am Nachmittag — после полудня; не раннее утро.",
        }),
        hint: "halb называет следующий час: halb sechs = 5:30; Nachmittag уточняет 17:30.",
        success:
          "17:30. Чайку можно было бы пригласить к 05:30, но она и так приходит без приглашения.",
      },
      {
        id: "06-frame",
        title: "Приставка ушла в конец",
        story: [
          "На доске написано: «{starts}» Нужно добавить время так, чтобы an не осталось посреди комнаты.",
        ],
        practice: ["starts"],
        prompt: "Соберите «Встреча начинается в 17:30».",
        challenge: order(
          ["Das Treffen", "fängt", "um 17:30 Uhr", "an."],
          ["an.", "um 17:30 Uhr", "Das Treffen", "fängt"],
        ),
        hint: "fängt — спрягаемая часть; отделяемая an уходит в конец.",
        success: "Рамка предложения замкнулась. Дверь клуба пока открыта.",
      },
      {
        id: "06-schedule",
        title: "Кто когда свободен",
        story: [
          "{sunday} подходит не всем автоматически. Матео прислал рабочий график.",
        ],
        source: {
          title: "Три записи",
          lines: [
            "Mateo arbeitet von Dienstag bis Samstag, von 17 bis 23 Uhr.",
            "Greta arbeitet am Sonntag von 9 bis 16 Uhr.",
            "Jensen ist am Sonntag ab 17 Uhr im Club.",
          ],
        },
        practice: ["sunday"],
        prompt: "Запишите воскресный план команды.",
        challenge: write("Sonntagsplan", [
          ["m", "Mateo · am Sonntag", ["frei"]],
          ["g", "Greta arbeitet bis", ["16 Uhr", "16"]],
          ["j", "Jensen ist im Club ab", ["17 Uhr", "17"]],
        ]),
        hint: "von…bis — с…до; ab — начиная с. Матео работает со вторника по субботу.",
        success:
          "В 17:30 все могут оказаться у клуба. График Матео не меняем ради удобной улики.",
      },
      {
        id: "06-call",
        title: "Карточки расписания",
        story: [
          "«{call}», — обещает Нильс Йенсену и убегает за зарядкой. Элиф тем временем роняет карточки расписания, и они ложатся на стол рубашкой вверх.",
        ],
        prompt: "Откройте пары: немецкое выражение и его перевод.",
        challenge: memory(["have", "half", "sunday", "starts", "call"]),
        hint: "Запоминайте, где лежат карточки. Ошибка ничего не стоит: неверная пара просто закроется при следующем нажатии.",
        success:
          "Карточки снова по порядку. Теперь можно восстанавливать события.",
      },
      {
        id: "06-log",
        title: "Пятнадцать минут для путаницы",
        story: [
          "{starts} Гости приходят {half}; Нильс оставляет сумку у двери и отходит за чаем.",
        ],
        prompt:
          "Нажмите на две записи: когда началось и когда закончилось время, пока обе сумки были в клубе.",
        challenge: spot(
          "Журнал клуба · воскресенье",
          [
            "17:30 Nils kommt mit einer roten Tasche.",
            "17:35 Jensen kommt mit einer roten Tasche.",
            "17:45 Jensen geht. Nils trinkt Tee.",
          ],
          [
            "17:35 Jensen kommt mit einer roten Tasche.",
            "17:45 Jensen geht. Nils trinkt Tee.",
          ],
        ),
        hint: "Найдите пересечение времени присутствия Нильса и Йенсена.",
        success:
          "Пятнадцать минут сузились до десяти. Дело движется быстрее очереди за чаем.",
        clue: {
          title: "Окно путаницы",
          text: "В воскресенье с 17:35 до 17:45 обе красные сумки были у клуба. Затем Йенсен ушёл.",
        },
      },
    ],
  },
  {
    id: "freizeit",
    title: "Детектив тоже хочет выходной",
    place: "Kiellinie · планы команды",
    topic: "Досуг и встречи",
    grammar: "können/wollen · инфинитив · gern/lieber/am liebsten",
    review: ["can", "cannot", "rather", "together"],
    beats: [
      {
        id: "07-can",
        title: "Возможность — ещё не обещание",
        story: [
          "Элиф пишет: «{can}» Матео радуется так, будто команда уже в сборе. Вы пока сохраняете спокойствие.",
        ],
        voices: [
          line(
            "Elif",
            "Flo",
            "Ich kann am Sonntag kommen. Ich möchte zuerst ins Museum.",
            "Я могу прийти в воскресенье. Сначала я хочу в музей.",
          ),
          line(
            "Hauke",
            "Rocko",
            "Ich komme um siebzehn Uhr dreißig zum Club.",
            "Я приду к клубу в 17:30.",
          ),
        ],
        practice: ["can"],
        prompt:
          "Послушайте сообщения. Что команда подтвердила? Поставьте штамп на каждой записи.",
        challenge: verdict(
          ["Точно", "Пока неясно"],
          [
            [
              "Хауке придёт к клубу в 17:30.",
              true,
              "Ich komme um 17:30 — прямое сообщение о плане.",
            ],
            [
              "Элиф придёт к клубу в 17:30.",
              false,
              "kann выражает возможность; Элиф пока не подтвердила время.",
            ],
            [
              "Элиф сначала хочет в музей.",
              true,
              "В чате прямо сказано: Ich möchte zuerst ins Museum.",
            ],
          ],
        ),
        hint: "kann kommen — могу прийти; komme um… — приду в указанное время.",
        success: "В план записан Хауке. За Элиф решение не принимаем.",
      },
      {
        id: "07-want",
        title: "План для расследования",
        story: [
          "Дана говорит: «{together}» Матео не возражает, если поиск заканчивается ужином.",
        ],
        practice: ["together"],
        prompt: "Соберите фразу «Мы хотим искать вместе».",
        challenge: order(
          ["Wir", "wollen", "zusammen", "suchen."],
          ["suchen.", "zusammen", "Wir", "wollen"],
        ),
        hint: "wollen на втором месте; suchen — инфинитив в конце.",
        success:
          "Команда договорилась. На этот раз предмет обсуждения не меню.",
      },
      {
        id: "07-prefer",
        title: "Музей или вода",
        story: [
          "Элиф уточняет: «{rather}» Дана хочет гулять у воды. Выбирайте по сообщениям, а не по прогнозу чайки.",
        ],
        source: {
          title: "Предпочтения",
          lines: [
            "Elif geht lieber ins Museum als an den Strand.",
            "Dana geht am liebsten an der Kiellinie spazieren.",
            "Mateo fotografiert gern.",
          ],
        },
        practice: ["rather"],
        prompt: "Запишите, кто что любит.",
        challenge: write("Wer mag was?", [
          ["e", "Elif geht lieber ins …", ["Museum"]],
          ["d", "Dana geht am liebsten an der … spazieren", ["Kiellinie"]],
          ["m", "Mateo … gern", ["fotografiert"]],
        ]),
        hint: "lieber — охотнее, am liebsten — больше всего любит.",
        success:
          "Никого не отправили на пляж против воли. Чайка отправилась сама.",
      },
      {
        id: "07-reply",
        title: "Вежливый отказ двигает сюжет",
        story: [
          "Нильс пишет: «{cannot}» Приглашение на прогулку не пропало — нужно предложить другое время.",
        ],
        practice: ["cannot"],
        prompt: "Договоритесь с Нильсом о времени.",
        challenge: chat("Nils", "Eddy", [
          turn(
            "Am Samstag kann ich nicht. Am Sonntag habe ich ab sechzehn Uhr Zeit.",
            "В субботу я не могу. В воскресенье у меня есть время с 16:00.",
            "sun",
            [
              [
                "sat",
                "Kommst du am Samstag um 15 Uhr?",
                "«Am Samstag kann ich nicht», — напоминает Нильс.",
              ],
              [
                "early",
                "Kommst du am Sonntag um 14 Uhr?",
                "В воскресенье он свободен только с 16:00.",
              ],
              ["sun", "Kommst du am Sonntag um 17 Uhr?", ""],
            ],
          ),
          turn(
            "Ja, um siebzehn Uhr kann ich kommen!",
            "Да, в 17 часов я могу прийти!",
            "bye",
            [
              [
                "wrong",
                "Gut, bis Samstag!",
                "Договорились на воскресенье, а не на субботу.",
              ],
              ["bye", "Gut, bis Sonntag!", ""],
            ],
          ),
        ]),
        hint: "ab 16 Uhr — начиная с 16:00.",
        success:
          "Время согласовано. Отказ не завершил игру: он помог найти рабочий план.",
      },
      {
        id: "07-photo",
        title: "Фотография без злодея",
        story: [
          "Матео: «{together}» Затем он показывает фото со встречи, сделанное {sunday}.",
        ],
        source: {
          title: "Подпись Матео",
          lines: [
            "17:40. Jensen fotografiert gern. Jetzt hat er zwei rote Taschen. Nils ist nicht auf dem Foto.",
          ],
        },
        prompt: "Что доказывает фото?",
        challenge: choice("two", [
          [
            "theft",
            "Йенсен намеренно украл табличку.",
            "Фото не показывает намерения или содержимое.",
          ],
          [
            "two",
            "В 17:40 у Йенсена две красные сумки.",
            "Это видимый факт и следующий след для проверки.",
          ],
          [
            "nils",
            "Нильс вообще не приходил.",
            "Отсутствие на одном фото не доказывает отсутствие на встрече.",
          ],
        ]),
        hint: "Отделяйте наблюдение от обвинения.",
        success:
          "У вас факт: две сумки. Матео требует увеличить фото, но увеличение только увеличивает сумки.",
        clue: {
          title: "Кадр в 17:40",
          text: "Фото показывает Йенсена с двумя красными сумками. Содержимое и намерения на фото не видны.",
        },
      },
    ],
  },
  {
    id: "wohnen",
    title: "Ключ от неправильной двери",
    place: "Клуб · гостевая комната",
    topic: "Жильё и вещи",
    grammar: "Dativ: im/in der/auf dem · сложные слова · объявления",
    review: ["inbag", "table", "kitchen", "key"],
    beats: [
      {
        id: "08-where",
        title: "Сначала место",
        story: [
          "Йенсен оставил {key} для гостевой комнаты. Записка лежит {table}, сумка — {kitchen}. Элиф смеётся: скоро блокнот будет немецким, а вы — его русской сноской.",
        ],
        practice: ["table", "kitchen", "key"],
        voices: [
          line(
            "Jensen",
            "Grandpa",
            "Der Schlüssel liegt auf dem Tisch. Die Tasche steht in der Küche. Das Brot ist in der Tasche.",
            "Ключ лежит на столе. Сумка стоит на кухне. Хлеб в сумке.",
          ),
        ],
        prompt: "Послушайте Йенсена и разложите предметы по местам.",
        challenge: sort(
          [
            ["table", "auf dem Tisch"],
            ["kitchen", "in der Küche"],
            ["bag", "in der Tasche"],
          ],
          [
            ["k", "der Schlüssel", "table", "🔑"],
            ["t", "die Tasche", "kitchen", "👜"],
            ["b", "das Brot", "bag", "🥖"],
          ],
        ),
        hint: "Вопрос «где?» → Dativ: auf dem Tisch, in der Küche, in der Tasche.",
        success:
          "Ключ найден, хлеб локализован. Есть надежда, что он ещё не превратился в сухари.",
      },
      {
        id: "08-case",
        title: "Падеж важнее буквальной замены",
        story: [
          "Вы видите: «Das Brot ist {inbag}». Слово {bag} уже знакомо, но артикль меняется вместе с ролью в предложении.",
        ],
        practice: ["inbag", "table"],
        prompt: "Допишите записку без ошибок в падеже.",
        challenge: gaps(
          "Das Brot ist ___ Tasche.\nDer Schlüssel liegt ___ Tisch.",
          ["in der", "in die", "in dem", "auf dem", "auf den"],
          ["in der", "auf dem"],
        ),
        hint: "Где? Значит Dativ: die Tasche → in der Tasche, der Tisch → auf dem Tisch. Заменяем целое «в сумке», а не отдельное слово.",
        success:
          "Падеж сохранился. Смешанный рассказ не должен учить сломанному немецкому.",
      },
      {
        id: "08-ad",
        title: "Комната для свидетеля",
        story: [
          "Грета ищет жильё на одну ночь. {key} у хозяина; объявление нужно понять до бронирования.",
        ],
        source: {
          title: "Вымышленные объявления",
          lines: [
            "A: Ein Zimmer, 45 € pro Nacht, Küche, ruhig.",
            "B: Zwei Zimmer, 90 € pro Nacht, keine Küche.",
            "Greta: maximal 50 €, ein Zimmer, mit Küche.",
          ],
        },
        prompt: "Выберите объявление для Греты и заполните заявку.",
        challenge: write("Anfrage für Greta", [
          ["ad", "Anzeige", ["A"]],
          ["preis", "Preis pro Nacht", ["45 €", "45", "45 Euro"]],
        ]),
        hint: "Сверьте цену, число комнат и наличие кухни. Подходит только одно объявление.",
        success:
          "Ночь устроена. В счёт не включили аренду подозрительной чайки.",
      },
      {
        id: "08-compound",
        title: "Последнее слово решает",
        story: [
          "На шкафу надпись Küchenschrank. На столе {key}. Йенсен говорит, что один из ключей от шкафа.",
        ],
        source: {
          title: "Словообразование",
          lines: [
            "die Küche + der Schrank = der Küchenschrank",
            "das Haus + die Tür = die Haustür",
            "schlafen + das Zimmer = das Schlafzimmer",
          ],
        },
        prompt: "Разложите слова по артиклям.",
        challenge: sort(
          [
            ["der", "der"],
            ["die", "die"],
            ["das", "das"],
          ],
          [
            ["schrank", "Küchenschrank", "der"],
            ["kuehl", "Kühlschrank", "der"],
            ["haustuer", "Haustür", "die"],
            ["kuechentuer", "Küchentür", "die"],
            ["wohnzimmer", "Wohnzimmer", "das"],
          ],
        ),
        hint: "В сложном существительном смотрите на последнее существительное.",
        success: "Шкаф оказался мужского рода. Это не улика против Йенсена.",
      },
      {
        id: "08-note",
        title: "В сумке вместо таблички",
        story: [
          "Вы открываете красную сумку в гостевой комнате: {inbag} только {bread}. {table} лежит ещё записка.",
        ],
        prompt: "Где искать вторую сумку? Нажмите на нужные слова в записке.",
        challenge: spot(
          "Jensen",
          [
            "Die Tasche mit Brot|bleibt|hier.",
            "Die andere Tasche|ist|im Bus.",
            "Ich|bin|zu Hause.",
          ],
          ["im Bus."],
        ),
        hint: "Отслеживайте подлежащее: Tasche и Ich — разные объекты.",
        success:
          "Хлеб остаётся в комнате. Команда отправляется по автобусному следу.",
        clue: {
          title: "Хлеб остался, MOIN поехал",
          text: "В клубной комнате сумка с хлебом. По записке Йенсена другая сумка осталась в автобусе.",
        },
      },
    ],
  },
  {
    id: "stadt",
    title: "Не тот автобус",
    place: "Киль · учебная схема маршрута",
    topic: "Город и транспорт",
    grammar: "mit/zu/bei/von/aus · Dativ · повелительное Sie",
    review: ["bus", "station", "straight", "home"],
    beats: [
      {
        id: "09-route",
        title: "Путь без знания города",
        story: [
          "Дана предлагает ехать {bus}. От клуба идите {station}; водитель подскажет, как попасть {cafe}. Все маршруты в игре учебные.",
        ],
        source: {
          title: "Учебная схема",
          lines: [
            "Club → Haltestelle → Bus 8 → Café Nordlicht",
            "Bus 6 → Bahnhof",
            "Bus 9 → Museum",
          ],
        },
        practice: ["bus"],
        prompt: "На каком автобусе по учебной схеме ехать к Café Nordlicht?",
        challenge: choice("8", [
          ["9", "Bus 9", "Он идёт к музею."],
          ["8", "Bus 8", "По схеме Bus 8 связан с Café Nordlicht."],
          ["6", "Bus 6", "Он идёт к вокзалу."],
        ]),
        hint: "Вся нужная география дана в схеме; знать реальные линии Киля не требуется.",
        success:
          "Автобус выбран. Чайка пользуется собственным маршрутом без расписания.",
      },
      {
        id: "09-dativ",
        title: "Чем ехать",
        story: [
          "Вы снова едете {bus}. Водитель не требует рассказать всю историю, только куда вам нужно.",
        ],
        practice: ["bus", "cafe"],
        prompt: "Соберите «Мы едем на автобусе к кафе».",
        challenge: order(
          ["Wir", "fahren", "mit dem Bus", "zum Café."],
          ["zum Café.", "Wir", "mit dem Bus", "fahren"],
        ),
        hint: "mit требует Dativ: dem Bus; zu dem Café сокращается в zum Café.",
        success: "Предложение доехало до конца без потери падежей.",
      },
      {
        id: "09-directions",
        title: "Инструкция от водителя",
        story: [
          "У остановки водитель говорит: «{straight}» Затем добавляет ещё два коротких указания.",
        ],
        voices: [
          line(
            "Busfahrer",
            "Rocko",
            "Gehen Sie geradeaus. Dann gehen Sie links. Das Café ist rechts.",
            "Идите прямо. Затем идите налево. Кафе справа.",
          ),
        ],
        practice: ["straight"],
        prompt:
          "Послушайте водителя и дойдите до кафе. Названия мест видны, только когда вы рядом.",
        challenge: {
          kind: "route",
          width: 3,
          height: 3,
          start: { x: 1, y: 2, heading: 0 },
          places: {
            "1,2": "die Haltestelle",
            "0,0": "das Café Nordlicht",
            "1,0": "der Bahnhof",
            "2,0": "das Museum",
            "2,1": "die Apotheke",
            "0,2": "der Club",
            "2,2": "die Post",
          },
          goal: "0,0",
          moves: ["geradeaus", "links", "rechts"],
        },
        hint: "geradeaus — прямо; links — налево; rechts — направо. Поворот зависит от того, куда вы идёте, а не от верха схемы.",
        success:
          "Вы находите кафе. Даже у детектива есть право не кружить по кварталу.",
      },
      {
        id: "09-home",
        title: "Дома или домой",
        story: [
          "Йенсен написал: «Ich bin {home}». Вы уточняете, движется ли он куда-нибудь.",
        ],
        practice: ["home"],
        prompt: "Запишите обе формы: «я дома» и «я иду домой».",
        challenge: write("Wo oder wohin?", [
          ["at", "Ich bin …", ["zu Hause"]],
          ["to", "Ich gehe …", ["nach Hause"]],
        ]),
        hint: "zu Hause — где; nach Hause — куда.",
        success:
          "Йенсен остаётся дома. Для поиска сумки его телепортация не требуется.",
      },
      {
        id: "09-lost",
        title: "В бюро находок",
        story: [
          "Вы пришли {cafe}. Сотрудница вымышленного Nordlicht показывает объявление о найденной сумке.",
        ],
        source: {
          title: "Fundsachen",
          lines: [
            "Eine rote Tasche aus dem Bus 8.",
            "Abholung bei Frau Klein in der Praxis neben dem Café.",
            "Heute bis 12 Uhr. Morgen geschlossen.",
          ],
        },
        prompt:
          "Куда и когда нужно обратиться? Поставьте штамп на каждой записи.",
        challenge: verdict(
          ["Верно", "Неверно"],
          [
            [
              "Сумку выдаёт фрау Кляйн.",
              true,
              "bei Frau Klein — у фрау Кляйн.",
            ],
            [
              "Выдача находится в самом кафе.",
              false,
              "Praxis neben dem Café — практика рядом с кафе.",
            ],
            [
              "Забрать сумку можно сегодня до 12:00.",
              true,
              "Heute bis 12 Uhr.",
            ],
            [
              "Завтра тоже можно прийти.",
              false,
              "Morgen geschlossen — завтра закрыто.",
            ],
          ],
        ),
        hint: "Abholung — получение; bei — у; neben — рядом. Читайте все ограничения.",
        success:
          "Остаётся успеть к Кляйн. Поиск таблички неожиданно привёл к медицинскому словарю.",
        clue: {
          title: "Найденная сумка",
          text: "Красную сумку из учебного автобуса 8 можно забрать у фрау Кляйн в практике рядом с Café Nordlicht, сегодня до 12:00.",
        },
      },
    ],
  },
  {
    id: "gesundheit",
    title: "Приём без диагноза",
    place: "Вымышленная Praxis · Nordlicht",
    topic: "Здоровье и врач",
    grammar: "Kopfschmerzen · müssen/dürfen · просьбы du/ihr",
    review: ["must", "headache", "sit", "noentry"],
    beats: [
      {
        id: "10-reception",
        title: "Сначала понять вопрос",
        story: [
          "За стойкой Кляйн. Она видит ваш блокнот и спрашивает, нужна ли запись. Матео шутит: «{headache}» — от количества красных сумок.",
        ],
        audio: {
          file: "appointment",
          text: "Können Sie heute um Viertel nach elf kommen?",
          ru: "Вы можете сегодня прийти в четверть двенадцатого?",
        },
        prompt: "Поставьте часы на время, которое предлагает Кляйн.",
        challenge: clock("11:15", {
          "11:45": "Viertel vor zwölf — 11:45. Здесь Viertel nach elf.",
          "10:15": "elf — одиннадцать, не десять.",
        }),
        hint: "Viertel nach elf = 11:15.",
        success:
          "Это предложение времени, ещё не диагноз. Вы уточняете, что пришли за сумкой.",
      },
      {
        id: "10-symptom",
        title: "Не перепутать части тела",
        story: [
          "Пока ждёте, Кляйн просит помочь с карточками. Никаких медицинских советов: только понять слова пациентов.",
        ],
        voices: [
          line(
            "Patient A",
            "Eddy",
            "Ich habe Kopfschmerzen.",
            "У меня болит голова.",
          ),
          line(
            "Patientin B",
            "Sandy",
            "Mein Bauch tut weh.",
            "У меня болит живот.",
          ),
          line(
            "Patient C",
            "Rocko",
            "Mein Rücken tut weh.",
            "У меня болит спина.",
          ),
        ],
        practice: ["headache"],
        prompt: "Послушайте пациентов и запишите, где болит.",
        challenge: write("Wartekarten", [
          ["a", "Patient A · Wo tut es weh?", ["der Kopf", "Kopf"]],
          ["b", "Patientin B · Wo tut es weh?", ["der Bauch", "Bauch"]],
          ["c", "Patient C · Wo tut es weh?", ["der Rücken", "Rücken"]],
        ]),
        hint: "Kopf — голова; Bauch — живот; Rücken — спина.",
        success: "Карточки разложены. Назначения остаются делом врача.",
      },
      {
        id: "10-modal",
        title: "Что нужно сделать",
        story: [
          "Кляйн говорит: «{must}» Дверь в кабинет закрыта. Рядом табличка: «{noentry}»",
        ],
        practice: ["must", "noentry"],
        prompt: "Запишите в блокнот, что нужно и что нельзя.",
        challenge: gaps(
          "Sie ___ warten.\nSie ___ hier nicht hinein.",
          ["müssen", "dürfen", "möchten"],
          ["müssen", "dürfen"],
        ),
        hint: "müssen — необходимость; nicht dürfen — запрет.",
        success: "Вы ждёте. Терпение не считается новой уликой, но пригодится.",
      },
      {
        id: "10-sit",
        title: "Пауза с карточками",
        story: [
          "Дана видит усталого Матео: «{sit}» Он садится, а чтобы ожидание не превратилось в медицинскую драму, Дана раскладывает на соседнем стуле карточки из блокнота.",
        ],
        prompt: "Откройте пары: немецкое выражение и его перевод.",
        challenge: memory(["inbag", "table", "kitchen", "bus", "cafe"]),
        hint: "Запоминайте, где лежат карточки. Ошибка ничего не стоит: неверная пара просто закроется при следующем нажатии.",
        success: "Матео сидит. Даже расследованию полезна короткая пауза.",
      },
      {
        id: "10-tag",
        title: "Улика под клапаном",
        story: [
          "Кляйн приносит сумку. {inbag} деревянный край, но замок закрыт. На клапане карточка.",
        ],
        prompt: "У кого ключ от сумки? Нажмите на нужную фразу.",
        challenge: spot(
          "Бирка выдачи",
          [
            "Nils.|Inhalt: Schild MOIN.",
            "Bitte im Büro abholen.|Jensen hat den Schlüssel.",
            "Frau Klein:|Die Tasche ist hier.|Der Schlüssel ist nicht hier.",
          ],
          ["Jensen hat den Schlüssel."],
        ),
        hint: "Сумка и ключ находятся в разных местах. По бирке ключ у Йенсена, выдача через офис.",
        success:
          "Сумка найдена, но дело ещё не закрыто: нужно проверить её содержимое и восстановить путь.",
        clue: {
          title: "Бирка Нильса",
          text: "На найденной сумке: «Nils. Inhalt: Schild MOIN». Ключ у Йенсена; он просит обратиться в офис.",
        },
      },
    ],
  },
  {
    id: "arbeit",
    title: "Алиби с глаголом в конце",
    place: "Офис клуба · записи",
    topic: "Работа и прошлый день",
    grammar: "профессии · Perfekt с haben · war/hatte",
    review: ["worked", "cook", "was", "had"],
    beats: [
      {
        id: "11-job",
        title: "Работа — часть биографии",
        story: [
          "Матео объясняет: «{cook}» Дана — врач по образованию и занимается признанием диплома. Детективами они работают только в этой истории.",
        ],
        source: {
          title: "Карточки героев",
          lines: [
            "Mateo ist Koch.",
            "Dana ist Ärztin.",
            "Frau Petersen arbeitet im Büro der Sprachschule.",
          ],
        },
        practice: ["cook"],
        prompt: "Заполните карточки героев.",
        challenge: write("Steckbriefe", [
          ["m", "Mateo ist", ["Koch"]],
          ["d", "Dana ist", ["Ärztin"]],
          ["p", "Frau Petersen arbeitet im", ["Büro"]],
        ]),
        hint: "Koch — повар; Ärztin — врач; Büro — офис.",
        success:
          "Биографии согласованы. Ни одному герою не пришлось увольняться ради сюжета.",
      },
      {
        id: "11-perfect",
        title: "Что было вчера",
        story: [
          "Йенсен оставил записку: «{worked}» Слова habe и gearbeitet держат прошедшее событие с двух сторон.",
        ],
        practice: ["worked"],
        prompt: "Соберите «Я вчера работал».",
        challenge: order(
          ["Ich", "habe", "gestern", "gearbeitet."],
          ["gearbeitet.", "gestern", "habe", "Ich"],
        ),
        hint: "Perfekt: habe на втором месте, Partizip II gearbeitet в конце.",
        success:
          "Прошлое восстановлено грамматически. Теперь восстановим его по фактам.",
      },
      {
        id: "11-was",
        title: "Небольшая биография ключа",
        story: [
          "Йенсен вспоминает: «В воскресенье в 16:00 {was} {had}» В офисном журнале уточняется, когда ключ оказался у него.",
        ],
        source: {
          title: "Журнал ключей · воскресенье",
          lines: [
            "17:00 Petersen hatte den Schlüssel.",
            "17:20 Jensen war im Büro. Er hat den Schlüssel bekommen.",
            "17:25 Petersen hat das Büro geschlossen.",
          ],
        },
        practice: ["was", "had"],
        prompt: "Сверьте записи с журналом ключей.",
        challenge: verdict(
          ["Richtig", "Falsch"],
          [
            [
              "Um 17:00 hatte Petersen den Schlüssel.",
              true,
              "17:00 Petersen hatte den Schlüssel.",
            ],
            [
              "Um 17:00 hatte Jensen den Schlüssel.",
              false,
              "В 17:00 ключ был у Петерсен.",
            ],
            ["Um 17:20 war Jensen im Büro.", true, "17:20 Jensen war im Büro."],
            [
              "Nils hat den Schlüssel bekommen.",
              false,
              "Нильс в журнале не указан; Er hat den Schlüssel bekommen относится к Йенсену.",
            ],
          ],
        ),
        hint: "hatte — имел(а); hat bekommen — получил. Следите за временем и er.",
        success:
          "Ключ должен быть у Йенсена. Его записка «не было ключа» относится к более раннему моменту.",
      },
      {
        id: "11-account",
        title: "Не кража, а действие",
        story: [
          "Второе сообщение наконец объясняет, зачем Йенсен взял обе сумки.",
        ],
        voices: [
          line(
            "Jensen",
            "Grandpa",
            "Ich habe beide Taschen getragen. Nils hat Tee geholt. Ich habe das Brot im Club gelassen. Die andere Tasche habe ich im Bus vergessen. Ich hatte Stress. Es tut mir leid.",
            "Я нёс обе сумки. Нильс ходил за чаем. Хлеб я оставил в клубе. Другую сумку я забыл в автобусе. У меня был стресс. Мне жаль.",
          ),
        ],
        prompt: "Послушайте отчёт Йенсена. Какая цепочка ему соответствует?",
        challenge: order(
          [
            "Взял обе сумки",
            "Оставил хлеб в клубе",
            "Забыл вторую сумку в автобусе",
          ],
          [
            "Забыл вторую сумку в автобусе",
            "Взял обе сумки",
            "Оставил хлеб в клубе",
          ],
        ),
        hint: "getragen — нёс; gelassen — оставил; vergessen — забыл.",
        success:
          "Отчёт объясняет и фото, и хлеб в клубе, и автобус. Языковая ошибка не понадобилась как «доказательство».",
      },
      {
        id: "11-key",
        title: "Получить ключ по инструкции",
        story: [
          "Петерсен пишет: «{key} liegt {table}». Матео торжественно объявляет: у ключа было самое простое алиби.",
        ],
        source: {
          title: "Сообщение из офиса",
          lines: [
            "Jensen hat den Schlüssel heute zurückgebracht.",
            "Er liegt auf dem Tisch im Büro. Bitte nehmt nur den kleinen Schlüssel.",
          ],
        },
        prompt: "Какой ключ взять?",
        challenge: choice("small", [
          [
            "large",
            "Большой ключ с кухни",
            "Нужен только маленький: nur den kleinen Schlüssel.",
          ],
          ["all", "Все ключи со стола", "nur запрещает брать остальные."],
          [
            "small",
            "Маленький ключ со стола в офисе.",
            "На столе в офисе; взять только маленький.",
          ],
        ]),
        hint: "zurückgebracht — принёс обратно; nur — только; kleinen — маленький.",
        success: "Маленький ключ у вас. Можно возвращаться к сумке.",
        clue: {
          title: "Признание в забывчивости",
          text: "Йенсен нёс обе сумки, оставил хлеб в клубе и забыл вторую в автобусе. Ключ возвращён в офис.",
        },
      },
    ],
  },
  {
    id: "reisen",
    title: "Moin возвращается",
    place: "Киль · клуб",
    topic: "Поездки, погода и даты",
    grammar: "Perfekt с sein · погода · am ersten… · повторение A1",
    review: ["rain", "arrived", "date", "traveled"],
    beats: [
      {
        id: "12-weather",
        title: "Погода не читает сценарий",
        story: [
          "{rain} Команда едет {bus}, а не идёт пешком. {arrived} — теперь рядом с ней и вы.",
        ],
        voices: [
          line(
            "Dana",
            "Anna",
            "Heute Regen und Wind. Wir fahren mit dem Bus. Die Tasche bleibt trocken. Morgen Sonne. Treffen im Club.",
            "Сегодня дождь и ветер. Мы едем на автобусе. Сумка останется сухой. Завтра солнце. Встреча в клубе.",
          ),
        ],
        practice: ["rain"],
        prompt: "Послушайте план и запишите, что сегодня, а что завтра.",
        challenge: write("Plan", [
          ["h", "Heute", ["Regen und Wind", "Regen"]],
          ["b", "Wir fahren mit dem", ["Bus"]],
          ["m", "Morgen", ["Sonne"]],
        ]),
        hint: "Regen — дождь; Wind — ветер; trocken — сухой.",
        success: "Сумка сухая. Чайка мокрая, но сохраняет достоинство.",
      },
      {
        id: "12-perfect",
        title: "Как мы добрались",
        story: [
          "Вы пишете в блокнот: «{traveled}» У движения другой вспомогательный глагол, чем у gearbeitet.",
        ],
        practice: ["arrived"],
        prompt: "Соберите «Сумка прибыла».",
        challenge: order(
          ["Die Tasche", "ist", "angekommen."],
          ["angekommen.", "Die Tasche", "ist"],
        ),
        hint: "ankommen образует Perfekt с sein: ist angekommen.",
        success:
          "Die Tasche ist angekommen. Прибытие заслуживает точки, а не ещё одного пересадочного билета.",
      },
      {
        id: "12-date",
        title: "Дата для приглашения",
        story: [
          "Йенсен назначает маленькую встречу {date}. Это вымышленная дата встречи команды, а не календарь Kieler Woche.",
        ],
        voices: [
          line(
            "Jensen",
            "Grandpa",
            "Treffen am ersten Juni um siebzehn Uhr dreißig im Club. Bitte Wasser und Brot mitbringen.",
            "Встреча первого июня в 17:30 в клубе. Пожалуйста, принесите воду и хлеб.",
          ),
        ],
        practice: ["date"],
        prompt: "Послушайте приглашение и отметьте дату в календаре.",
        challenge: {
          kind: "calendar",
          months: [
            { name: "Mai", days: 31 },
            { name: "Juni", days: 30 },
            { name: "Juli", days: 31 },
          ],
          answer: "Juni:1",
        },
        hint: "Дата после am: am ersten Juni. Не путайте Juni и Juli.",
        success:
          "Приглашение готово. Для {water} и {bread} теперь есть и повод, и время.",
      },
      {
        id: "12-deduction",
        title: "Закрыть дело фактами",
        story: [
          "Все улики в вашем блокноте. Табличка видна {inbag}; {key} уже подходит к замку. Элиф просит выбрать объяснение всей цепочки.",
        ],
        source: {
          title: "Сводка",
          lines: [
            "Фото 17:40: у Йенсена две красные сумки.",
            "Хлеб остался в клубе. Сумка MOIN найдена в автобусе.",
            "Йенсен сообщил: «Die andere Tasche habe ich im Bus vergessen».",
          ],
        },
        prompt: "Что произошло с табличкой?",
        challenge: choice("forgot", [
          [
            "gull",
            "Чайка украла табличку и водила автобус.",
            "Фото, сумка из автобуса и отчёт этого не подтверждают.",
          ],
          [
            "forgot",
            "Йенсен помог нести сумки и забыл MOIN в автобусе.",
            "Объяснение согласуется со всеми независимыми уликами.",
          ],
          [
            "nils",
            "Нильс выдумал пропажу ради бесплатного чая.",
            "Чай не объясняет путь найденной сумки и отчёт Йенсена.",
          ],
        ]),
        hint: "Нужно объяснить одновременно две сумки, хлеб в клубе и находку в автобусе.",
        success:
          "Дело закрыто без злодея. Йенсен виноват в забывчивости; чайка — только в краже одной крошки.",
        clue: {
          title: "Реконструкция",
          text: "Йенсен помог Нильсу, нёс две сумки и забыл сумку MOIN в автобусе. Находка возвращена по бирке и ключу.",
        },
      },
      {
        id: "12-finale",
        title: "Последняя надпись",
        story: [
          "{found} На подставке снова MOIN. Йенсен говорит «{danke}», Матео приносит {bread}, Дана — {water}. Даже чайка на секунду молчит.",
          "Вы начинали с русского рассказа. Теперь {moin}, {inbag}, {table}, {bus} и целые немецкие фразы стали частью одной истории. Блокнот всё ещё нужен — но уже по другой причине.",
        ],
        practice: ["found"],
        prompt: "Соберите финальную запись «Мы нашли табличку».",
        challenge: order(
          ["Wir", "haben", "das Schild", "gefunden."],
          ["gefunden.", "das Schild", "Wir", "haben"],
        ),
        hint: "finden → gefunden; Perfekt с haben. das Schild — Akkusativ среднего рода.",
        success:
          "«Wir haben das Schild gefunden». Йенсен выдаёт вам новую должность: человек, который знает, где лежит ключ. Оплата прежняя — danke.",
      },
    ],
  },
];
for (const episode of episodes)
  episode.beats = episode.beats.flatMap((b) => [b, ...(extras[b.id] ?? [])]);
export const beats = episodes.flatMap((e) => e.beats);

// Later scenes bring back the same grammatical units in a new situation.
// These are authored story callbacks, not a separate vocabulary drill.
const callbacks: Record<string, string> = {
  "02-have":
    "Вы снова представляетесь: «{kiel}» На вопрос «{name}» Нильс отвечает своим именем — контакт теперь не просто набор цифр.",
  "03-no":
    "Матео ещё раз поясняет: «{argentina} Но сумка не моя». Вы благодарите его: «{danke}»",
  "03-next":
    "Нильс обещает помочь: «{have}» Грета улыбается: «{sister} — так он представляет меня всем, даже чайке».",
  "04-receipt":
    "Грета представляется: «Nils — {brother}». Сотрудник ещё раз сверяет фото: «Nils und {hisbag}».",
  "05-price":
    "Матео смотрит на соседнюю кофейню: «{coffee}?» Вы качаете головой: «{nocoffee}» Следствие сначала, кофе потом.",
  "05-bag":
    "Грета уже сказала о свитере: «{him}» Нильс проверил фото: «{nobag}» — это слова Матео, значит, искать его сумку незачем. За чек в кафе отвечала фраза «{bill}»; за ценник здесь — «{price}».",
  "06-log":
    "«{expensive}», — вздыхает Матео над ценником декоративного якоря в вашем блокноте. Йенсен по телефону обещает: «{call}»",
  "07-photo":
    "Дана пишет «{can}», Элиф отвечает «{cannot} — я пока в музее». Фраза «{rather}» теперь объясняет, почему её нет на снимке.",
  "08-note":
    "Грета снова {kitchen}, а Нильс проверяет {inbag}. «{together}», — напоминает Дана: одной фотографии для вывода недостаточно.",
  "09-lost":
    "Вы повторяете маршрут {station}. Водитель говорит «{straight}», и вскоре команда уже идёт {cafe}. Йенсен остаётся {home}.",
  "10-tag":
    "Пока оформляют выдачу, снова звучит «{must}». Дана просит Матео «{sit}». Он признаётся: «{headache}». В кабинет команда не заходит: «{noentry}».",
  "11-account":
    "«{worked}», — повторяет Йенсен. Матео кивает: «{cook}» Оба понимают усталость, но всё равно проверяют записи.",
  "11-key":
    "В 16:00 Йенсен писал «{was} {had}»; в 17:20 ключ уже был у него. Теперь вы видите {key} собственными глазами.",
  "12-finale":
    "Вы вспоминаете обратный путь: «{rain} {traveled} {arrived}» В приглашении стоит {date}. А сейчас главное: {found}",
};
for (const beat of beats)
  if (callbacks[beat.id]) beat.story.push(callbacks[beat.id]);
