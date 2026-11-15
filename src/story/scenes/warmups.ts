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
    { docks: ["der Cousin", "die Cousine", "die Ehefrau", "der Ehemann", "die Familie", "der Familienstand", "die Freundin", "die Großmutter", "der Großvater", "die Hochzeit", "der Hund", "die Katze"], bingo: ["ledig", "verheiratet", "international", "kennenlernen", "sich vorstellen", "achtzig", "die Million", "die Vorwahl", "das Baby"] },
    { docks: ["das Mädchen", "die Mutter", "der Onkel", "der Partner", "die Schwester", "der Sohn", "die Tochter", "der Vater", "das Ausland", "der Ausländer", "die Heimat", "die Schweiz"], bingo: [] },
  ],
  5: [
    { docks: ["das Fleisch", "das Getränk", "das Hähnchen", "der Käse", "die Milch", "die Rechnung", "der Salat", "die Wurst", "der Computer", "die E-Mail", "das Internet", "die Million"], bingo: [] },
    { docks: ["die Vorwahl", "der Erwachsene", "der Jugendliche", "die Partnerin", "die Tante", "die Bäckerei", "das Lokal", "das Öl", "die Pasta", "das Restaurant", "das Salz", "der Schinken"], bingo: [] },
  ],
  6: [
    { docks: ["der Großvater", "die Hochzeit", "der Hund", "die Katze", "das Mädchen", "die Mutter", "der Onkel", "der Partner", "die Schwester", "der Sohn", "die Tochter", "der Vater"], bingo: ["bar", "ein Pfund", "kurz", "der Pullover", "der Rock", "der Schuh", "schwarz", "achtzig", "das Baby"] },
    { docks: ["der Apfel", "das Geschenk", "das Gramm", "die Größe", "die Gurke", "das Hemd", "die Hose", "die Kasse", "das Kleid", "der Kunde", "der Mantel", "der Preis"], bingo: ["der Erwachsene", "gratulieren", "heiraten", "der Jugendliche", "leben", "die Partnerin", "die Tante", "der Wein", "100 Gramm"] },
  ],
  7: [
    { docks: ["die Wurst", "der Anfang", "der April", "der Dezember", "die Dusche", "der Februar", "der Feierabend", "der Januar", "der März", "die Sekunde", "der September", "das Ausland"], bingo: ["anziehen", "ausziehen", "braun", "der Cent", "das Geschäft", "das Gewicht", "grün", "die Kleidung", "die Kreditkarte"] },
    { docks: ["der Ausländer", "die Heimat", "die Schweiz", "die Bäckerei", "das Lokal", "das Öl", "die Pasta", "das Restaurant", "das Salz", "der Schinken", "der Wein", "das Angebot"], bingo: ["die Lebensmittel", "die Orange", "das Prozent", "verkaufen", "aufräumen", "der August", "bald", "eilig", "der Feiertag"] },
  ],
  8: [
    { docks: ["die Kasse", "das Kleid", "der Kunde", "der Mantel", "der Preis", "der Pullover", "der Rock", "der Schuh", "der Baum", "das Bild", "die Blume", "die Disco"], bingo: ["Tennis spielen", "wandern", "achtzig", "die Vorwahl", "100 Gramm", "das Angebot", "anziehen", "ausziehen", "die Banane"] },
    { docks: ["das Feuer", "der Garten", "die Gruppe", "die Idee", "das Kino", "das Konzert", "das Schwimmbad", "der Sport", "der Computer", "die E-Mail", "das Internet", "die Million"], bingo: ["braun", "der Cent", "die Erdbeere", "die Flasche", "das Geschäft", "das Gewicht", "grün", "die Kartoffel", "die Kleidung"] },
  ],
  9: [
    { docks: ["der Februar", "der Feierabend", "der Januar", "der März", "die Sekunde", "der September", "die Adresse", "das Apartment", "der Aufzug", "der Flur", "die Heizung", "der Herd"], bingo: ["das Baby", "der Erwachsene", "gratulieren", "heiraten", "der Jugendliche", "leben", "die Partnerin", "die Tante", "die Kreditkarte"] },
    { docks: ["die Kaltmiete", "die Miete", "die Ordnung", "der Quadratmeter", "das Schlafzimmer", "der Schreibtisch", "die Treppe", "das Treppenhaus", "der Vermieter", "die Warmmiete", "das Wohnheim", "das Wohnzimmer"], bingo: ["die Lebensmittel", "das Prozent", "verkaufen", "aufräumen", "der August", "bald", "eilig", "der Feiertag", "der Kleiderschrank"] },
  ],
  10: [
    { docks: ["die Disco", "das Feuer", "der Garten", "die Gruppe", "die Idee", "das Kino", "das Konzert", "das Schwimmbad", "der Sport", "die Abfahrt", "die Ankunft", "der Ausgang"], bingo: ["einsteigen", "umsteigen", "das Salz", "der Schinken", "der Wein", "unten", "der Fahrer", "das Gleis", "der Lkw"] },
    { docks: ["die Auskunft", "das Auto", "der Automat", "der Bahnsteig", "der Eingang", "der Schalter", "das Ticket", "die Bäckerei", "das Lokal", "das Öl", "die Pasta", "das Restaurant"], bingo: ["nicht gern", "daneben", "die Vorsicht", "fernsehen", "gerade", "der November", "der Oktober", "pünktlich", "der Schluss"] },
  ],
  11: [
    { docks: ["die Ordnung", "der Quadratmeter", "das Schlafzimmer", "der Schreibtisch", "die Treppe", "das Treppenhaus", "der Vermieter", "die Warmmiete", "das Wohnheim", "das Wohnzimmer", "die Anmeldung", "der Arm"], bingo: ["anziehen", "ausziehen", "die Banane", "braun", "der Cent", "die Erdbeere", "die Flasche", "das Geschäft", "das Gewicht"] },
    { docks: ["das Bein", "die Erkältung", "das Fieber", "das Glück", "das Haar", "der Hals", "der Husten", "der Kopf", "das Medikament", "der Mund", "die Nase", "das Ohr"], bingo: ["grün", "die Kartoffel", "die Kleidung", "die Kreditkarte", "die Lebensmittel", "die Orange", "das Prozent", "verkaufen", "die Möbel"] },
  ],
  12: [
    { docks: ["der Schalter", "das Ticket", "der August", "der Feiertag", "die Firma", "der Teil", "die Vorsicht", "die Aufgabe", "der Beruf", "der Bleistift", "das Ergebnis", "das Vorstellungsgespräch"], bingo: ["baden", "der Eintritt", "Freunde treffen", "gewinnen", "Gitarre spielen", "grillen", "der Lieblingsfilm", "lustig", "mitmachen"] },
    { docks: ["die Hausaufgabe", "der Hausmann", "die Kellnerin", "die Klasse", "die Köchin", "der Kollege", "der Krankenpfleger", "der Lehrer", "die Lehrerin", "die Lösung", "die Papiere", "der Schüler"], bingo: ["Musik hören", "Rad fahren", "der See", "der Verein", "besetzt", "breit", "draußen", "teuer – günstig", "hoch"] },
  ],
  13: [
    { docks: ["das Medikament", "der Mund", "die Nase", "das Ohr", "der Schnupfen", "die Tablette", "das Wartezimmer", "der Zahn", "das Meer", "der Sommer", "die Aufgabe", "der Beruf"], bingo: ["das Wetter", "windig", "der Winter", "pünktlich", "der Schluss", "Wie viel Uhr ist es?", "der Wochentag", "zurzeit", "baden"] },
    { docks: ["der Bleistift", "das Ergebnis", "das Vorstellungsgespräch", "die Hausaufgabe", "der Hausmann", "die Kellnerin", "die Klasse", "die Köchin", "der Kollege", "der Krankenpfleger", "der Lehrer", "die Lehrerin"], bingo: ["der Eintritt", "Freunde treffen", "gewinnen", "Gitarre spielen", "grillen", "der Lieblingsfilm", "lustig", "mitmachen", "Musik hören"] },
  ],
};

export const WARMUPS: Record<number, Warmup[]> = {
  2: [
    { mech: "bingo", words: ["Kasachstan", "die USA", "Wie geht's?", "die Heimat", "international", "kennenlernen", "die Schweiz", "sich vorstellen"] },
    { mech: "docks", words: ["der Mensch", "der Pass", "der Strand", "die Unterschrift", "der Ausweis", "das Geburtsjahr", "der Geburtsort", "die Türkei", "die Ukraine", "der Vorname", "das Ausland", "der Ausländer"] },
    { mech: "gull", words: ["Dänemark", "Danke, gut!", "Guten Tag!", "Russland", "unterschreiben", "Welche?", "Deutschland", "Europa", "geboren", "Guten Abend!"] },
  ],
  3: [
    { mech: "gull", words: ["vierzehn", "Wie bitte?", "antworten", "zum Beispiel", "buchstabieren", "dreizehn", "fünfzehn", "Noch einmal, bitte.", "tausend", "telefonieren"] },
    { mech: "docks", words: ["der Anruf", "die Antwort", "der Liegeplatz", "die Prüfung", "der Raum", "die Zahl", "der Anrufbeantworter", "die Handynummer", "die Postleitzahl", "der Computer", "die E-Mail", "das Internet"] },
    { mech: "letters", words: ["achtzehn", "erklären", "sechzehn", "sechzig", "siebzig"] },
  ],
  4: [
    { mech: "docks", words: ["der Familienname", "das Alter", "der Enkel", "die Enkelin", "der Glückwunsch", "das Rezept", "der Ausweis", "das Geburtsjahr", "der Geburtsort", "die Türkei", "die Ukraine", "der Vorname"] },
    { mech: "bingo", words: ["lieben", "Deutschland", "Europa", "geboren", "Guten Abend!", "Kasachstan", "die USA", "Wie geht's?", "die Eltern", "geschieden", "die Geschwister", "die Großeltern"] },
  ],
  5: [
    { mech: "letters", words: ["antworten", "dreizehn", "fünfzehn", "tausend", "bestellen"] },
    { mech: "gull", words: ["Alles Gute!", "zum Beispiel", "buchstabieren", "Noch einmal, bitte.", "telefonieren", "wiederholen", "bitter", "schmecken", "riechen", "Zusammen oder getrennt?"] },
    { mech: "docks", words: ["die Pause", "die Butter", "das Glas", "das Obst", "der Saft", "die Speisekarte", "der Anrufbeantworter", "die Handynummer", "die Postleitzahl", "die Birne", "die Cola", "der Döner"] },
  ],
  6: [
    { mech: "bingo", words: ["blau", "ein Kilo", "ein Liter", "gelb", "grau", "kosten", "die Eltern", "geschieden", "die Geschwister", "die Großeltern", "ledig", "verheiratet"] },
    { mech: "pairs", words: ["die Banane", "die Erdbeere", "die Flasche", "die Kartoffel", "die Orange"] },
    { mech: "docks", words: ["der Bruder", "das Geld", "das T-Shirt", "die Zwiebel", "der Cousin", "die Cousine", "die Ehefrau", "der Ehemann", "die Familie", "der Familienstand", "die Freundin", "die Großmutter"] },
  ],
  7: [
    { mech: "gull", words: ["bezahlen", "anmachen", "beginnen", "einkaufen", "müde", "bestellen", "bitter", "schmecken", "riechen", "Zusammen oder getrennt?"] },
    { mech: "bingo", words: ["aufhören", "ausmachen", "duschen", "enden", "frühstücken", "Wie spät ist es?", "international", "kennenlernen", "sich vorstellen", "gratulieren", "heiraten", "leben"] },
    { mech: "docks", words: ["der Mai", "der Moment", "die Birne", "die Cola", "der Döner", "das Fleisch", "das Getränk", "das Hähnchen", "der Käse", "die Milch", "die Rechnung", "der Salat"] },
  ],
  8: [
    { mech: "docks", words: ["der Ausflug", "die Einladung", "der Film", "die Freizeit", "der Park", "der Apfel", "das Geschenk", "das Gramm", "die Größe", "die Gurke", "das Hemd", "die Hose"] },
    { mech: "letters", words: ["lesen", "bar", "kurz", "schwarz", "einladen"] },
    { mech: "bingo", words: ["wiederholen", "ein Pfund", "am liebsten", "Fahrrad fahren", "fotografieren", "Fußball spielen", "gefallen", "laufen", "manchmal", "oft", "Schade!", "schwimmen"] },
  ],
  9: [
    { mech: "pairs", words: ["gleich", "legen", "baden", "der Eintritt", "Freunde treffen", "gewinnen"] },
    { mech: "gull", words: ["ruhig – laut", "aufhören", "ausmachen", "duschen", "enden", "frühstücken", "Wie spät ist es?", "hell – dunkel", "möbliert", "modern"] },
    { mech: "docks", words: ["der Nachmittag", "der Vormittag", "die Anzeige", "das Bad", "das Erdgeschoss", "der Kühlschrank", "das Sofa", "die Wohnung", "der Anfang", "der April", "der Dezember", "die Dusche"] },
  ],
  10: [
    { mech: "bingo", words: ["in der Nähe", "am liebsten", "Fahrrad fahren", "fotografieren", "Fußball spielen", "manchmal", "oft", "Schade!", "schwimmen", "Tennis spielen", "wandern", "aussteigen"] },
    { mech: "docks", words: ["die Ampel", "die U-Bahn", "der Bahnhof", "die Haltestelle", "der Stadtplan", "die Post", "die Straße", "die Straßenbahn", "das Taxi", "der Baum", "das Bild", "die Blume"] },
    { mech: "letters", words: ["leider", "tanzen", "einladen", "gefallen", "laufen"] },
  ],
  11: [
    { mech: "gull", words: ["hell – dunkel", "möbliert", "modern", "rauchen", "der Schnupfen", "die Tablette", "das Wartezimmer", "der Zahn", "100 Gramm", "das Angebot"] },
    { mech: "docks", words: ["der Balkon", "das Auge", "die Praxis", "der Termin", "die Adresse", "das Apartment", "der Aufzug", "der Flur", "die Heizung", "der Herd", "die Kaltmiete", "die Miete"] },
    { mech: "pairs", words: ["wichtig", "legen", "fernsehen", "gerade", "der November", "der Oktober"] },
  ],
  12: [
    { mech: "docks", words: ["die Apotheke", "der Kellner", "der Mechaniker", "die Stelle", "die Abfahrt", "die Ankunft", "der Ausgang", "die Auskunft", "das Auto", "der Automat", "der Bahnsteig", "der Eingang"] },
    { mech: "bingo", words: ["der Student", "der Unterricht", "die Verkäuferin", "fernsehen", "gerade", "der November", "der Oktober", "pünktlich", "der Schluss", "Wie viel Uhr ist es?", "der Wochentag", "zurzeit"] },
    { mech: "gull", words: ["aussteigen", "einsteigen", "umsteigen", "aufräumen", "bald", "eilig", "letzte Woche", "gleich", "daneben", "aussehen"] },
  ],
  13: [
    { mech: "bingo", words: ["der Anschluss", "das Datum", "das Doppelzimmer", "der Flughafen", "das Flugzeug", "das Gepäck", "die Halbpension", "der Herbst", "kalt", "der Koffer", "der Regenschirm", "übernachten"] },
    { mech: "gull", words: ["wehtun", "rauchen", "nicht gern", "die Lösung", "die Papiere", "der Schüler", "der Student", "der Unterricht", "die Verkäuferin", "die Anreise"] },
    { mech: "docks", words: ["der Rücken", "die Versichertenkarte", "die Anmeldung", "der Arm", "das Bein", "die Erkältung", "das Fieber", "das Glück", "das Haar", "der Hals", "der Husten", "der Kopf"] },
  ],
};
