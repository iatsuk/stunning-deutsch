import type { Warmup } from "../review.ts";

// Раунд перед главой новой версии (A1-PLAN.md, «Повторение»): одинаковый для всех игроков, поэтому
// индекс полноты засчитывает его игры как часть главы. Слова — из прошлых глав, которым не хватает
// возвращений. Список собирает scripts/a1-returns.mjs --write; собранное можно править руками.

/** Возвращения в сценах главы: два блока (середина и конец главы), в каждом причалы и лото. */
export const RETURNS: Record<number, { docks: string[]; bingo: string[] }[]> = {
  2: [
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
  ],
  3: [
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
  ],
  4: [
    { docks: ["die Unterschrift", "der Vorname", "das Alter", "der Cousin", "die Cousine", "die Ehefrau", "der Ehemann", "die Familie", "der Familienstand", "die Freundin", "die Großmutter", "der Großvater"], bingo: ["die Großeltern", "ledig", "verheiratet", "die Heimat", "international", "kennenlernen", "der Mensch", "die Schweiz", "unterschreiben"] },
    { docks: ["die Hochzeit", "der Hund", "die Katze", "das Mädchen", "die Mutter", "der Onkel", "die Schwester", "der Sohn", "die Tochter", "der Vater", "das Ausland", "der Ausländer"], bingo: ["sich vorstellen", "das Baby", "der Erwachsene", "gratulieren", "heiraten", "der Jugendliche", "leben", "der Partner", "die Partnerin"] },
  ],
  5: [
    { docks: ["die Birne", "die Cola", "der Döner", "das Fleisch", "das Getränk", "das Glas", "das Hähnchen", "der Käse", "die Milch", "die Rechnung", "der Salat", "die Wurst"], bingo: ["schmecken", "riechen", "Zusammen oder getrennt?", "achtzig", "antworten", "das Restaurant", "das Salz", "der Schinken", "der Wein"] },
    { docks: ["der Anrufbeantworter", "der Computer", "die E-Mail", "das Internet", "der Liegeplatz", "die Million", "die Vorwahl", "die Tante", "die Bäckerei", "das Lokal", "das Öl", "die Pasta"], bingo: [] },
  ],
  6: [
    { docks: ["die Großmutter", "der Großvater", "die Hochzeit", "der Hund", "die Katze", "das Mädchen", "die Mutter", "der Onkel", "die Schwester", "der Sohn", "die Tochter", "der Vater"], bingo: ["bar", "ein Pfund", "der Pullover", "der Rock", "der Schuh", "schwarz", "das Baby", "der Erwachsene", "gratulieren"] },
    { docks: ["der Apfel", "das Geschenk", "das Gramm", "die Größe", "die Gurke", "das Hemd", "die Hose", "die Kasse", "das Kleid", "der Kunde", "der Mantel", "der Preis"], bingo: ["heiraten", "der Jugendliche", "leben", "der Partner", "die Partnerin", "die Tante", "100 Gramm", "das Angebot", "anziehen"] },
  ],
  7: [
    { docks: ["die Milch", "die Rechnung", "der Salat", "die Wurst", "der Anfang", "der April", "der Dezember", "die Dusche", "der Februar", "der Feierabend", "der Januar", "der März"], bingo: ["ausziehen", "braun", "der Cent", "das Geschäft", "das Gewicht", "grün", "die Kartoffel", "die Kleidung", "die Kreditkarte"] },
    { docks: ["die Sekunde", "der September", "das Ausland", "der Ausländer", "die Heimat", "der Mensch", "die Schweiz", "die Bäckerei", "das Lokal", "das Öl", "die Pasta", "das Restaurant"], bingo: ["kurz", "die Lebensmittel", "die Orange", "das Prozent", "verkaufen", "aufräumen", "der August", "bald", "beginnen"] },
  ],
  8: [
    { docks: ["der Kunde", "der Mantel", "der Preis", "der Pullover", "der Rock", "der Schuh", "der Ausflug", "der Baum", "das Bild", "die Blume", "die Disco", "das Feuer"], bingo: ["wandern", "achtzig", "antworten", "das Internet", "der Liegeplatz", "die Million", "die Vorwahl", "100 Gramm", "das Angebot"] },
    { docks: ["die Freizeit", "der Garten", "die Gruppe", "die Idee", "das Kino", "das Konzert", "der Park", "das Schwimmbad", "der Sport", "der Anrufbeantworter", "der Computer", "die E-Mail"], bingo: ["anziehen", "ausziehen", "die Banane", "braun", "der Cent", "die Erdbeere", "die Flasche", "das Geschäft", "das Gewicht"] },
  ],
  9: [
    { docks: ["der Februar", "der Feierabend", "der Januar", "der März", "die Sekunde", "der September", "die Adresse", "das Apartment", "der Aufzug", "der Flur", "die Heizung", "der Herd"], bingo: ["modern", "das Baby", "der Erwachsene", "gratulieren", "heiraten", "der Jugendliche", "leben", "der Partner", "die Partnerin"] },
    { docks: ["die Kaltmiete", "die Miete", "die Ordnung", "der Quadratmeter", "das Schlafzimmer", "der Schreibtisch", "die Treppe", "das Treppenhaus", "der Vermieter", "die Warmmiete", "das Wohnheim", "das Wohnzimmer"], bingo: ["die Tante", "grün", "die Kleidung", "die Kreditkarte", "kurz", "die Lebensmittel", "das Prozent", "verkaufen", "aufräumen"] },
  ],
  10: [
    { docks: ["die Freizeit", "der Garten", "die Gruppe", "die Idee", "das Kino", "das Konzert", "der Park", "das Schwimmbad", "der Sport", "die Abfahrt", "die Ampel", "die Ankunft"], bingo: ["Tennis spielen", "wandern", "aussteigen", "einsteigen", "in der Nähe", "umsteigen", "das Lokal", "das Öl", "die Pasta"] },
    { docks: ["der Ausgang", "die Auskunft", "das Auto", "der Automat", "die U-Bahn", "der Bahnhof", "der Bahnsteig", "der Eingang", "der Schalter", "die Straßenbahn", "das Ticket", "die Bäckerei"], bingo: ["das Restaurant", "das Salz", "der Schinken", "der Wein", "verkaufen", "eilig", "enden", "der Feiertag", "fernsehen"] },
  ],
  11: [
    { docks: ["das Schlafzimmer", "der Schreibtisch", "die Treppe", "das Treppenhaus", "der Vermieter", "die Warmmiete", "das Wohnheim", "das Wohnzimmer", "die Anmeldung", "der Arm", "das Auge", "das Bein"], bingo: ["das Angebot", "anziehen", "ausziehen", "die Banane", "braun", "der Cent", "die Erdbeere", "die Flasche", "das Geschäft"] },
    { docks: ["die Erkältung", "das Fieber", "das Glück", "das Haar", "der Hals", "der Husten", "der Kopf", "das Medikament", "der Mund", "die Nase", "das Ohr", "der Schnupfen"], bingo: ["das Gewicht", "grün", "die Kartoffel", "die Kleidung", "die Kreditkarte", "kurz", "die Lebensmittel", "die Orange", "das Prozent"] },
  ],
  12: [
    { docks: ["der Automat", "die U-Bahn", "der Bahnhof", "der Bahnsteig", "der Eingang", "der Schalter", "die Straßenbahn", "das Ticket", "die Anmeldung", "der Arm", "das Auge", "das Bein"], bingo: ["der Kollege", "der Krankenpfleger", "der Lehrer", "die Lehrerin", "letzte Woche", "die Lösung", "die Papiere", "der Schüler", "der Student"] },
    { docks: ["die Erkältung", "das Fieber", "das Glück", "das Haar", "der Hals", "der Husten", "der Kopf", "das Medikament", "der Mund", "die Nase", "das Ohr", "der Schnupfen"], bingo: ["der Unterricht", "die Verkäuferin", "aufräumen", "der August", "bald", "beginnen", "eilig", "enden", "der Feiertag"] },
  ],
};

export const WARMUPS: Record<number, Warmup[]> = {
  2: [
    { mech: "bingo", words: ["Russland", "die USA", "Wie geht's?", "international", "kennenlernen", "unterschreiben", "sich vorstellen", "die Heimat", "der Mensch", "die Schweiz"] },
    { mech: "docks", words: ["der Pass", "die Sprache", "der Strand", "der Ausweis", "das Geburtsjahr", "der Geburtsort", "die Türkei", "die Ukraine", "die Unterschrift", "der Vorname", "das Ausland", "der Ausländer"] },
    { mech: "gull", words: ["Dänemark", "Danke, gut!", "Guten Tag!", "Welche?", "wohnen in", "Deutschland", "Europa", "geboren", "Guten Abend!", "Kasachstan"] },
  ],
  3: [
    { mech: "gull", words: ["Wie bitte?", "zum Beispiel", "buchstabieren", "erklären", "fünfzehn", "Noch einmal, bitte.", "sechzehn", "sechzig", "siebzig", "tausend"] },
    { mech: "docks", words: ["der Raum", "der Anruf", "die Antwort", "die Handynummer", "die Postleitzahl", "die Prüfung", "die Zahl", "der Anrufbeantworter", "der Computer", "die E-Mail", "das Internet", "der Liegeplatz"] },
    { mech: "letters", words: ["achtzehn", "siebzehn", "vierzehn", "vierzig", "dreizehn"] },
  ],
  4: [
    { mech: "docks", words: ["der Familienname", "der Enkel", "die Enkelin", "der Glückwunsch", "der Junge", "das Rezept", "der Rucksack", "der Ausweis", "das Geburtsjahr", "der Geburtsort", "die Türkei", "die Ukraine"] },
    { mech: "bingo", words: ["lieben", "Deutschland", "Europa", "geboren", "Guten Abend!", "Kasachstan", "Russland", "die USA", "Wie geht's?", "die Eltern", "geschieden", "die Geschwister"] },
    { mech: "pairs", words: ["die Million", "die Vorwahl", "telefonieren", "wiederholen", "achtzig", "antworten"] },
  ],
  5: [
    { mech: "letters", words: ["dreizehn", "erklären", "fünfzehn", "sechzehn", "sechzig"] },
    { mech: "gull", words: ["Alles Gute!", "zum Beispiel", "buchstabieren", "Noch einmal, bitte.", "siebzig", "tausend", "telefonieren", "wiederholen", "bestellen", "bitter"] },
    { mech: "docks", words: ["die Pause", "die Butter", "das Obst", "der Reis", "der Saft", "die Speisekarte", "der Anruf", "die Antwort", "die Handynummer", "die Postleitzahl", "die Prüfung", "die Zahl"] },
  ],
  6: [
    { mech: "bingo", words: ["blau", "ein Kilo", "ein Liter", "gelb", "grau", "kosten", "die Eltern", "geschieden", "die Geschwister", "die Großeltern", "ledig", "verheiratet"] },
    { mech: "pairs", words: ["die Banane", "die Erdbeere", "die Flasche", "die Kartoffel", "die Orange"] },
    { mech: "docks", words: ["der Bruder", "das Geld", "das T-Shirt", "die Zwiebel", "das Alter", "der Cousin", "die Cousine", "die Ehefrau", "der Ehemann", "die Familie", "der Familienstand", "die Freundin"] },
  ],
  7: [
    { mech: "gull", words: ["bezahlen", "einkaufen", "sofort", "bestellen", "bitter", "schmecken", "riechen", "Zusammen oder getrennt?", "anmachen", "aufhören"] },
    { mech: "bingo", words: ["ausmachen", "duschen", "frühstücken", "müde", "Wie spät ist es?", "international", "kennenlernen", "unterschreiben", "sich vorstellen", "das Salz", "der Schinken", "der Wein"] },
    { mech: "docks", words: ["der Juni", "der Mai", "der Moment", "die Stunde", "die Birne", "die Cola", "der Döner", "das Fleisch", "das Getränk", "das Glas", "das Hähnchen", "der Käse"] },
  ],
  8: [
    { mech: "docks", words: ["die Einladung", "der Film", "das Hobby", "der Apfel", "das Geschenk", "das Gramm", "die Größe", "die Gurke", "das Hemd", "die Hose", "die Kasse", "das Kleid"] },
    { mech: "letters", words: ["wollen", "bar", "schwarz", "einladen", "gefallen"] },
    { mech: "bingo", words: ["ein Pfund", "am liebsten", "Fahrrad fahren", "fotografieren", "Fußball spielen", "laufen", "lesen", "manchmal", "oft", "Schade!", "schwimmen", "Tennis spielen"] },
  ],
  9: [
    { mech: "pairs", words: ["der August", "bald", "beginnen", "Freunde treffen", "Gitarre spielen", "grillen"] },
    { mech: "gull", words: ["ruhig – laut", "anmachen", "aufhören", "ausmachen", "duschen", "frühstücken", "müde", "Wie spät ist es?", "hell – dunkel", "möbliert"] },
    { mech: "docks", words: ["der Nachmittag", "der Vormittag", "die Anzeige", "das Bad", "das Erdgeschoss", "der Kühlschrank", "das Sofa", "die Wohnung", "der Anfang", "der April", "der Dezember", "die Dusche"] },
  ],
  10: [
    { mech: "bingo", words: ["am liebsten", "einladen", "Fahrrad fahren", "fotografieren", "Fußball spielen", "gefallen", "laufen", "lesen", "manchmal", "oft", "Schade!", "schwimmen"] },
    { mech: "docks", words: ["die Haltestelle", "der Stadtplan", "die Post", "die Straße", "das Taxi", "der Zug", "der Ausflug", "der Baum", "das Bild", "die Blume", "die Disco", "das Feuer"] },
    { mech: "letters", words: ["leider", "tanzen", "geradeaus", "links", "rechts"] },
  ],
  11: [
    { mech: "gull", words: ["hell – dunkel", "möbliert", "modern", "verboten", "rauchen", "die Tablette", "der Termin", "das Wartezimmer", "der Zahn", "100 Gramm"] },
    { mech: "docks", words: ["der Balkon", "die Praxis", "die Adresse", "das Apartment", "der Aufzug", "der Flur", "die Heizung", "der Herd", "die Kaltmiete", "die Miete", "die Ordnung", "der Quadratmeter"] },
    { mech: "pairs", words: ["eilig", "enden", "der Feiertag", "fernsehen", "Freunde treffen", "Gitarre spielen"] },
  ],
  12: [
    { mech: "docks", words: ["die Apotheke", "der Rücken", "die Versichertenkarte", "der Kellner", "der Mechaniker", "die Stelle", "die Abfahrt", "die Ampel", "die Ankunft", "der Ausgang", "die Auskunft", "das Auto"] },
    { mech: "bingo", words: ["der Zahn", "die Aufgabe", "der Beruf", "der Bleistift", "das Ergebnis", "die Firma", "das Vorstellungsgespräch", "die Hausaufgabe", "der Hausmann", "die Kellnerin", "die Klasse", "die Köchin"] },
    { mech: "gull", words: ["wehtun", "aussteigen", "einsteigen", "in der Nähe", "umsteigen", "verboten", "rauchen", "die Tablette", "der Termin", "das Wartezimmer"] },
  ],
};
