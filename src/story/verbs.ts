// Глаголы A1 для повторения (src/story/review.ts): формы Präsens по лицам и Perfekt. Формы выписаны,
// а не порождаются правилом: сильные глаголы, отделяемые приставки и модальные легко исказить.
// Порядок форм: ich, du, er/sie/es, wir, ihr, sie/Sie. perfekt — с вспомогательным глаголом у er.

export type Verb = { forms: [string, string, string, string, string, string]; perfekt?: string };
export const PERSONS = ["ich", "du", "er", "wir", "ihr", "sie"] as const;

const regular = (stem: string, perfekt?: string): Verb => {
  // -e- перед окончанием: после -d, -t (arbeitest) и после согласного перед -m, -n (rechnest), но не wohnst, kennst.
  const e = /[dt]$|[^aeiouäöülrhmn][mn]$/.test(stem) ? "e" : "";
  const s = /[sßxz]$/.test(stem) ? "" : "s";
  return { forms: [`${stem}e`, `${stem}${e}${s}t`, `${stem}${e}t`, `${stem}en`, `${stem}${e}t`, `${stem}en`], perfekt };
};
const sep = (verb: Verb, prefix: string, perfekt?: string): Verb => ({
  forms: verb.forms.map((f) => `${f} ${prefix}`) as Verb["forms"],
  perfekt,
});

export const VERBS: Record<string, Verb> = {
  sein: { forms: ["bin", "bist", "ist", "sind", "seid", "sind"], perfekt: "ist gewesen" },
  haben: { forms: ["habe", "hast", "hat", "haben", "habt", "haben"], perfekt: "hat gehabt" },
  kommen: regular("komm", "ist gekommen"),
  wohnen: regular("wohn", "hat gewohnt"),
  heißen: { forms: ["heiße", "heißt", "heißt", "heißen", "heißt", "heißen"], perfekt: "hat geheißen" },
  sprechen: { forms: ["spreche", "sprichst", "spricht", "sprechen", "sprecht", "sprechen"], perfekt: "hat gesprochen" },
  essen: { forms: ["esse", "isst", "isst", "essen", "esst", "essen"], perfekt: "hat gegessen" },
  trinken: regular("trink", "hat getrunken"),
  nehmen: { forms: ["nehme", "nimmst", "nimmt", "nehmen", "nehmt", "nehmen"], perfekt: "hat genommen" },
  fahren: { forms: ["fahre", "fährst", "fährt", "fahren", "fahrt", "fahren"], perfekt: "ist gefahren" },
  gehen: regular("geh", "ist gegangen"),
  machen: regular("mach", "hat gemacht"),
  spielen: regular("spiel", "hat gespielt"),
  lernen: regular("lern", "hat gelernt"),
  arbeiten: regular("arbeit", "hat gearbeitet"),
  kaufen: regular("kauf", "hat gekauft"),
  kochen: regular("koch", "hat gekocht"),
  schlafen: { forms: ["schlafe", "schläfst", "schläft", "schlafen", "schlaft", "schlafen"], perfekt: "hat geschlafen" },
  lesen: { forms: ["lese", "liest", "liest", "lesen", "lest", "lesen"], perfekt: "hat gelesen" },
  sehen: { forms: ["sehe", "siehst", "sieht", "sehen", "seht", "sehen"], perfekt: "hat gesehen" },
  sagen: regular("sag", "hat gesagt"),
  fragen: regular("frag", "hat gefragt"),
  schreiben: regular("schreib", "hat geschrieben"),
  hören: regular("hör", "hat gehört"),
  finden: regular("find", "hat gefunden"),
  brauchen: regular("brauch", "hat gebraucht"),
  helfen: { forms: ["helfe", "hilfst", "hilft", "helfen", "helft", "helfen"], perfekt: "hat geholfen" },
  geben: { forms: ["gebe", "gibst", "gibt", "geben", "gebt", "geben"], perfekt: "hat gegeben" },
  treffen: { forms: ["treffe", "triffst", "trifft", "treffen", "trefft", "treffen"], perfekt: "hat getroffen" },
  tanzen: regular("tanz", "hat getanzt"),
  schwimmen: regular("schwimm", "ist geschwommen"),
  bleiben: regular("bleib", "ist geblieben"),
  bringen: regular("bring", "hat gebracht"),
  kennen: regular("kenn", "hat gekannt"),
  suchen: regular("such", "hat gesucht"),
  warten: regular("wart", "hat gewartet"),
  zahlen: regular("zahl", "hat gezahlt"),
  bezahlen: regular("bezahl", "hat bezahlt"),
  besuchen: regular("besuch", "hat besucht"),
  verstehen: regular("versteh", "hat verstanden"),
  bekommen: regular("bekomm", "hat bekommen"),
  beginnen: regular("beginn", "hat begonnen"),
  fliegen: regular("flieg", "ist geflogen"),
  reisen: regular("reis", "ist gereist"),
  glauben: regular("glaub", "hat geglaubt"),
  reservieren: regular("reservier", "hat reserviert"),
  fotografieren: regular("fotografier", "hat fotografiert"),
  laufen: { forms: ["laufe", "läufst", "läuft", "laufen", "lauft", "laufen"], perfekt: "ist gelaufen" },
  wissen: { forms: ["weiß", "weißt", "weiß", "wissen", "wisst", "wissen"], perfekt: "hat gewusst" },
  können: { forms: ["kann", "kannst", "kann", "können", "könnt", "können"] },
  wollen: { forms: ["will", "willst", "will", "wollen", "wollt", "wollen"] },
  müssen: { forms: ["muss", "musst", "muss", "müssen", "müsst", "müssen"] },
  dürfen: { forms: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"] },
  sollen: { forms: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"] },
  mögen: { forms: ["mag", "magst", "mag", "mögen", "mögt", "mögen"] },
  möchten: { forms: ["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"] },
  aufstehen: sep(regular("steh"), "auf", "ist aufgestanden"),
  anrufen: sep(regular("ruf"), "an", "hat angerufen"),
  einkaufen: sep(regular("kauf"), "ein", "hat eingekauft"),
  ankommen: sep(regular("komm"), "an", "ist angekommen"),
  mitkommen: sep(regular("komm"), "mit", "ist mitgekommen"),
  aufräumen: sep(regular("räum"), "auf", "hat aufgeräumt"),
  fernsehen: sep({ forms: ["sehe", "siehst", "sieht", "sehen", "seht", "sehen"] }, "fern", "hat ferngesehen"),
};
