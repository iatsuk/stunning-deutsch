import type { Warmup } from "../review.ts";

// Раунд перед главой новой версии (A1-PLAN.md, «Повторение»): одинаковый для всех игроков, поэтому
// индекс полноты засчитывает его игры как часть главы. Слова — из прошлых глав, которым не хватает
// возвращений. Список собирает scripts/a1-returns.mjs --write; собранное можно править руками.

/** Возвращения в сценах главы: четыре блока (сцены 3, 6, 2 и 5), в каждом причалы и лото. */
export const RETURNS: Record<number, { docks: string[]; bingo: string[] }[]> = {
  2: [
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
  ],
  3: [
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
  ],
  4: [
    { docks: ["der Cousin", "die Cousine", "die Ehefrau", "der Ehemann", "die Familie", "der Familienstand", "die Freundin", "die Großmutter", "der Großvater", "die Hochzeit", "der Hund", "die Katze"], bingo: [] },
    { docks: ["das Mädchen", "die Mutter", "der Onkel", "der Partner", "die Schwester", "der Sohn", "die Tochter", "der Vater", "das Ausland", "der Ausländer", "die Heimat", "die Schweiz"], bingo: [] },
    { docks: ["die Million", "die Vorwahl", "das Baby", "der Erwachsene", "der Jugendliche", "die Partnerin", "die Tante"], bingo: [] },
    { docks: [], bingo: [] },
  ],
  5: [
    { docks: ["das Fleisch", "das Getränk", "das Hähnchen", "der Käse", "die Milch", "die Rechnung", "der Salat", "die Wurst", "der Computer", "die E-Mail", "das Internet", "die Million"], bingo: [] },
    { docks: ["die Vorwahl", "die Bäckerei", "das Lokal", "das Öl", "die Pasta", "das Restaurant", "das Salz", "der Schinken", "der Wein"], bingo: [] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
  ],
  6: [
    { docks: ["der Großvater", "die Hochzeit", "der Hund", "die Katze", "das Mädchen", "die Mutter", "der Onkel", "der Partner", "die Schwester", "der Sohn", "die Tochter", "der Vater"], bingo: ["bar", "ein Pfund", "kurz", "schwarz", "achtzig", "gratulieren", "heiraten", "leben", "100 Gramm"] },
    { docks: ["der Apfel", "das Geschenk", "das Gramm", "die Größe", "die Gurke", "das Hemd", "die Hose", "die Kasse", "das Kleid", "der Kunde", "der Mantel", "der Preis"], bingo: [] },
    { docks: ["der Pullover", "der Rock", "der Schuh", "das Baby", "der Erwachsene", "der Jugendliche", "die Partnerin", "die Tante", "das Angebot", "die Banane", "der Cent", "die Erdbeere"], bingo: [] },
    { docks: ["die Flasche", "das Geschäft", "das Gewicht", "die Kartoffel", "die Kleidung", "die Kreditkarte", "die Lebensmittel", "die Orange", "das Prozent"], bingo: [] },
  ],
  7: [
    { docks: ["die Wurst", "der Anfang", "der April", "der Dezember", "die Dusche", "der Februar", "der Feierabend", "der Januar", "der März", "die Sekunde", "der September", "das Ausland"], bingo: [] },
    { docks: ["der Ausländer", "die Heimat", "die Schweiz", "die Bäckerei", "das Lokal", "das Öl", "die Pasta", "das Restaurant", "das Salz", "der Schinken", "der Wein", "der August"], bingo: [] },
    { docks: ["der Feiertag", "der November", "der Oktober", "der Schluss", "der Wochentag"], bingo: [] },
    { docks: [], bingo: ["leben", "anziehen", "ausziehen", "braun", "grün", "verkaufen", "aufräumen", "bald", "eilig"] },
  ],
  8: [
    { docks: ["die Kasse", "das Kleid", "der Kunde", "der Mantel", "der Preis", "der Pullover", "der Rock", "der Schuh", "der Baum", "das Bild", "die Blume", "die Disco"], bingo: ["schwimmen", "Tennis spielen", "wandern", "achtzig", "100 Gramm", "anziehen", "ausziehen", "braun", "grün"] },
    { docks: ["das Feuer", "der Garten", "die Gruppe", "die Idee", "das Kino", "das Konzert", "das Schwimmbad", "der Sport", "der Computer", "die E-Mail", "das Internet", "die Million"], bingo: ["verkaufen", "fernsehen", "gerade", "pünktlich", "baden", "Freunde treffen", "gewinnen", "Wie viel Uhr ist es?", "zurzeit"] },
    { docks: ["die Vorwahl", "das Angebot", "die Banane", "der Cent", "die Erdbeere", "die Flasche", "das Geschäft", "das Gewicht", "die Kartoffel", "die Kleidung", "die Kreditkarte", "die Lebensmittel"], bingo: [] },
    { docks: ["die Orange", "das Prozent", "der Eintritt", "der Lieblingsfilm", "der See", "der Verein"], bingo: [] },
  ],
  9: [
    { docks: ["die Dusche", "der Februar", "der Feierabend", "der Januar", "der März", "die Sekunde", "der September", "die Adresse", "das Apartment", "der Aufzug", "der Flur", "die Heizung"], bingo: ["Wie spät ist es?", "daneben", "hell – dunkel", "legen", "möbliert", "modern", "gratulieren", "heiraten", "leben"] },
    { docks: ["der Herd", "die Kaltmiete", "die Miete", "die Ordnung", "der Quadratmeter", "das Schlafzimmer", "der Schreibtisch", "die Treppe", "das Treppenhaus", "der Vermieter", "die Warmmiete", "das Wohnheim"], bingo: ["aufräumen", "bald", "eilig", "fernsehen", "gerade", "pünktlich", "Wie viel Uhr ist es?", "zurzeit", "Gitarre spielen"] },
    { docks: ["das Wohnzimmer", "das Baby", "der Erwachsene", "der Jugendliche", "die Partnerin", "die Tante", "der August", "der Feiertag", "der November", "der Oktober", "der Schluss", "der Wochentag"], bingo: [] },
    { docks: [], bingo: ["grillen", "lustig", "mitmachen", "Musik hören", "Rad fahren", "besetzt", "breit", "draußen", "teuer – günstig"] },
  ],
  10: [
    { docks: ["der Baum", "das Bild", "die Blume", "die Disco", "das Feuer", "der Garten", "die Gruppe", "die Idee", "das Kino", "das Konzert", "das Schwimmbad", "der Sport"], bingo: ["aussteigen", "einsteigen", "umsteigen", "baden", "Freunde treffen", "gewinnen", "Gitarre spielen", "grillen", "lustig"] },
    { docks: ["die Abfahrt", "die Ankunft", "der Ausgang", "die Auskunft", "das Auto", "der Automat", "der Bahnsteig", "der Eingang", "der Schalter", "das Ticket", "die Vorsicht", "die Bäckerei"], bingo: ["mitmachen", "Musik hören", "Rad fahren", "besetzt", "breit", "draußen", "teuer – günstig", "hoch", "oben"] },
    { docks: ["das Lokal", "das Öl", "die Pasta", "das Restaurant", "das Salz", "der Schinken", "der Wein", "der Eintritt", "der Lieblingsfilm", "der See", "der Verein", "die Waschmaschine"], bingo: ["umziehen", "vermieten", "waschen", "besichtigen", "gültig", "das Konto", "der Norden", "der Ort", "der Prospekt"] },
    { docks: ["die Mitte", "die Toilette", "der Absender", "die Ansage", "die Autobahn", "die Bank", "die Briefmarke", "das Bürgeramt", "das Dorf", "der Empfänger", "die Führung", "der Kilometer"], bingo: [] },
  ],
  11: [
    { docks: ["die Ordnung", "der Quadratmeter", "das Schlafzimmer", "der Schreibtisch", "die Treppe", "das Treppenhaus", "der Vermieter", "die Warmmiete", "das Wohnheim", "das Wohnzimmer", "die Anmeldung", "der Arm"], bingo: ["braun", "grün", "verkaufen", "aussehen", "besetzt", "breit", "draußen", "teuer – günstig", "hoch"] },
    { docks: ["das Bein", "die Erkältung", "das Fieber", "das Glück", "das Haar", "der Hals", "der Husten", "der Kopf", "das Medikament", "der Mund", "die Nase", "das Ohr"], bingo: ["oben", "umziehen", "vermieten", "waschen", "besichtigen", "die Briefmarke", "das Bürgeramt", "das Dorf", "der Empfänger"] },
    { docks: ["der Schnupfen", "die Tablette", "das Wartezimmer", "der Zahn", "das Angebot", "die Banane", "der Cent", "die Erdbeere", "die Flasche", "das Geschäft", "das Gewicht", "die Kartoffel"], bingo: ["die Führung", "gültig", "der Kilometer", "das Konto", "der Norden", "der Ort", "der Prospekt", "das Rathaus", "die S-Bahn"] },
    { docks: ["die Kleidung", "die Kreditkarte", "die Lebensmittel", "die Orange", "das Prozent", "die Waschmaschine", "die Mitte", "die Toilette", "der Absender", "die Ansage", "die Autobahn", "die Bank"], bingo: ["die Sehenswürdigkeit", "der Süden", "der Supermarkt", "überweisen", "weit", "der Westen", "der Bauch", "böse", "empfehlen"] },
  ],
  12: [
    { docks: ["der Bahnsteig", "der Eingang", "der Schalter", "das Ticket", "die Vorsicht", "die Aufgabe", "der Beruf", "der Bleistift", "das Ergebnis", "das Vorstellungsgespräch", "die Hausaufgabe", "der Hausmann"], bingo: ["der Süden", "der Supermarkt", "überweisen", "weit", "der Westen", "der Bauch", "böse", "empfehlen", "glücklich"] },
    { docks: ["die Kellnerin", "die Klasse", "die Köchin", "der Kollege", "der Krankenpfleger", "der Lehrer", "die Lehrerin", "die Lösung", "die Papiere", "der Schüler", "der Student", "der Unterricht"], bingo: ["möglich", "normal", "schlecht", "die Zigarette", "abgeben", "anklicken", "ankreuzen", "die Anrede", "der Arbeitsplatz"] },
    { docks: ["die Verkäuferin", "der August", "der Feiertag", "der November", "der Oktober", "der Schluss", "der Wochentag", "die Waschmaschine", "die Mitte", "die Toilette", "der Absender", "die Ansage"], bingo: ["die Aussage", "bedeuten", "benutzen", "der Bogen", "der Chef", "drucken", "der Drucker", "der Fehler", "der Friseur"] },
    { docks: ["die Autobahn", "die Bank", "die Briefmarke", "das Bürgeramt", "das Dorf", "der Empfänger", "die Führung", "der Kilometer", "das Konto", "der Norden", "der Ort", "der Prospekt"], bingo: [] },
  ],
  13: [
    { docks: ["der Husten", "der Kopf", "das Medikament", "der Mund", "die Nase", "das Ohr", "der Schnupfen", "die Tablette", "das Wartezimmer", "der Zahn", "die Aufgabe", "der Beruf"], bingo: ["der Bauch", "böse", "empfehlen", "glücklich", "möglich", "normal", "schlecht", "die Zigarette", "abgeben"] },
    { docks: ["der Bleistift", "das Ergebnis", "das Vorstellungsgespräch", "die Hausaufgabe", "der Hausmann", "die Kellnerin", "die Klasse", "die Köchin", "der Kollege", "der Krankenpfleger", "der Lehrer", "die Lehrerin"], bingo: ["anklicken", "ankreuzen", "die Anrede", "der Arbeitsplatz", "die Aussage", "bedeuten", "benutzen", "der Bogen", "der Chef"] },
    { docks: ["die Lösung", "die Papiere", "der Schüler", "der Student", "der Unterricht", "die Verkäuferin", "der Eintritt", "die Anreise", "der Anschluss", "das Datum", "das Doppelzimmer", "der Flughafen"], bingo: ["drucken", "der Drucker", "der Fehler", "der Friseur", "gestern Abend", "der Informatiker", "der Ingenieur", "der Job", "der Kugelschreiber"] },
    { docks: ["das Flugzeug", "das Gepäck", "die Halbpension", "der Herbst", "der Koffer", "der Regenschirm", "das Wetter", "der Winter", "der Lieblingsfilm", "der See", "der Verein", "das Rathaus"], bingo: ["letztes Jahr", "männlich", "das Praktikum", "der Satz", "selbstständig", "das Studium", "verdienen", "weiblich", "der Zentimeter"] },
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
    { mech: "pairs", words: ["verheiratet", "international", "kennenlernen", "sich vorstellen", "achtzig"] },
  ],
  5: [
    { mech: "letters", words: ["antworten", "dreizehn", "fünfzehn", "tausend", "bestellen"] },
    { mech: "gull", words: ["Alles Gute!", "zum Beispiel", "buchstabieren", "Noch einmal, bitte.", "telefonieren", "wiederholen", "bitter", "schmecken", "riechen", "Zusammen oder getrennt?"] },
    { mech: "docks", words: ["die Pause", "die Butter", "das Glas", "das Obst", "der Saft", "die Speisekarte", "der Anrufbeantworter", "die Handynummer", "die Postleitzahl", "die Birne", "die Cola", "der Döner"] },
  ],
  6: [
    { mech: "bingo", words: ["blau", "ein Kilo", "ein Liter", "gelb", "grau", "kosten", "die Eltern", "geschieden", "die Geschwister", "die Großeltern", "ledig", "verheiratet"] },
    { mech: "docks", words: ["der Bruder", "das Geld", "das T-Shirt", "die Zwiebel", "der Cousin", "die Cousine", "die Ehefrau", "der Ehemann", "die Familie", "der Familienstand", "die Freundin", "die Großmutter"] },
  ],
  7: [
    { mech: "gull", words: ["bezahlen", "anmachen", "beginnen", "einkaufen", "müde", "bestellen", "bitter", "schmecken", "riechen", "Zusammen oder getrennt?"] },
    { mech: "bingo", words: ["aufhören", "ausmachen", "duschen", "enden", "frühstücken", "gleich", "Wie spät ist es?", "international", "kennenlernen", "sich vorstellen", "gratulieren", "heiraten"] },
    { mech: "docks", words: ["der Mai", "der Moment", "die Birne", "die Cola", "der Döner", "das Fleisch", "das Getränk", "das Hähnchen", "der Käse", "die Milch", "die Rechnung", "der Salat"] },
  ],
  8: [
    { mech: "docks", words: ["der Ausflug", "die Einladung", "der Film", "die Freizeit", "der Park", "der Apfel", "das Geschenk", "das Gramm", "die Größe", "die Gurke", "das Hemd", "die Hose"] },
    { mech: "letters", words: ["lesen", "bar", "kurz", "schwarz", "einladen"] },
    { mech: "bingo", words: ["wiederholen", "ein Pfund", "am liebsten", "Fahrrad fahren", "fotografieren", "Fußball spielen", "gefallen", "laufen", "manchmal", "nicht gern", "oft", "Schade!"] },
  ],
  9: [
    { mech: "gull", words: ["ruhig – laut", "die Möbel", "unten", "ledig", "aufhören", "ausmachen", "duschen", "enden", "frühstücken", "gleich"] },
    { mech: "docks", words: ["der Nachmittag", "der Vormittag", "die Anzeige", "das Bad", "das Erdgeschoss", "der Kleiderschrank", "der Kühlschrank", "das Sofa", "die Wohnung", "der Anfang", "der April", "der Dezember"] },
  ],
  10: [
    { mech: "bingo", words: ["in der Nähe", "am liebsten", "Fahrrad fahren", "fotografieren", "Fußball spielen", "manchmal", "nicht gern", "oft", "Schade!", "schwimmen", "Tennis spielen", "wandern"] },
    { mech: "docks", words: ["die Ampel", "die U-Bahn", "der Bahnhof", "der Fahrer", "das Gleis", "die Haltestelle", "der Lkw", "der Stadtplan", "die Post", "die Straße", "die Straßenbahn", "das Taxi"] },
    { mech: "letters", words: ["leider", "tanzen", "einladen", "gefallen", "laufen"] },
  ],
  11: [
    { mech: "gull", words: ["wichtig", "daneben", "hell – dunkel", "legen", "möbliert", "modern", "rauchen", "100 Gramm", "anziehen", "ausziehen"] },
    { mech: "docks", words: ["der Balkon", "das Auge", "die Praxis", "der Termin", "die Adresse", "das Apartment", "der Aufzug", "der Flur", "die Heizung", "der Herd", "die Kaltmiete", "die Miete"] },
  ],
  12: [
    { mech: "docks", words: ["die Apotheke", "die Firma", "der Kellner", "der Mechaniker", "die Stelle", "der Teil", "die Abfahrt", "die Ankunft", "der Ausgang", "die Auskunft", "das Auto", "der Automat"] },
    { mech: "bingo", words: ["Wie viel Uhr ist es?", "zurzeit", "hoch", "oben", "umziehen", "vermieten", "waschen", "besichtigen", "gültig", "das Rathaus", "die S-Bahn", "die Sehenswürdigkeit"] },
    { mech: "gull", words: ["letzte Woche", "aussteigen", "einsteigen", "umsteigen", "aufräumen", "bald", "eilig", "fernsehen", "gerade", "pünktlich"] },
  ],
  13: [
    { mech: "bingo", words: ["grillen", "lustig", "mitmachen", "Musik hören", "Rad fahren", "die S-Bahn", "die Sehenswürdigkeit", "der Süden", "der Supermarkt", "überweisen", "weit", "der Westen"] },
    { mech: "gull", words: ["wehtun", "rauchen", "baden", "Freunde treffen", "gewinnen", "aussehen", "kalt", "übernachten", "windig", "Gitarre spielen"] },
    { mech: "docks", words: ["der Rücken", "die Versichertenkarte", "das Meer", "der Sommer", "die Anmeldung", "der Arm", "das Bein", "die Erkältung", "das Fieber", "das Glück", "das Haar", "der Hals"] },
  ],
};
