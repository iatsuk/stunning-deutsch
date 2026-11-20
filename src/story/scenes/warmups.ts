import type { Warmup } from "../review.ts";

// Раунд перед главой новой версии (A1-PLAN.md, «Повторение»): одинаковый для всех игроков, поэтому
// индекс полноты засчитывает его игры как часть главы. Слова — из прошлых глав, которым не хватает
// возвращений. Список собирает scripts/a1-returns.mjs --write; собранное можно править руками.

/** Возвращения в сценах главы: четыре блока (сцены 3, 6, 2 и 5), в каждом причалы и лото. */
export const RETURNS: Record<number, { docks: string[]; bingo: string[] }[]> = {
  2: [
    { docks: ["der Ausländer", "die Heimat", "die Schweiz", "der Familienname"], bingo: [] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
  ],
  3: [
    { docks: ["die Vorwahl", "die Pause", "die Dame", "der Familienname"], bingo: ["leicht", "Alles Gute!", "Auf Wiederhören!", "ein bisschen", "Dänemark", "Danke, gut!", "Herzliche Grüße", "der Mensch", "der Pass"] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
  ],
  4: [
    { docks: ["die Großmutter", "der Großvater", "die Hausfrau", "die Hochzeit", "der Hund", "die Katze", "der Kurs", "das Mädchen", "die Mutter", "der Onkel", "der Partner", "die Schule"], bingo: ["sondern", "Argentinien", "Deutschland", "Europa", "geboren", "Kasachstan", "die USA", "Wie geht's?", "international"] },
    { docks: ["die Schwester", "der Sohn", "die Tochter", "der Vater", "das Baby", "der Erwachsene", "der Jugendliche", "der Kindergarten", "die Partnerin", "die Tante", "der Verwandte", "der Familienname"], bingo: ["kennenlernen", "sich vorstellen", "der Bruder", "Alles Gute!", "der Anruf", "Auf Wiederhören!", "erklären", "fünfzehn", "der Liegeplatz"] },
    { docks: ["der Ausweis", "das Geburtsjahr", "der Geburtsort", "die Türkei", "die Ukraine", "der Vorname", "das Ausland", "der Ausländer", "die Heimat", "die Schweiz"], bingo: [] },
    { docks: [], bingo: [] },
  ],
  5: [
    { docks: ["der Käse", "die Milch", "die Rechnung", "der Salat", "die Wurst", "die Bäckerei", "das Lokal", "das Mittagessen", "das Öl", "die Pasta", "das Restaurant", "das Salz"], bingo: ["leben", "sondern", "Alles Gute!", "Auf Wiederhören!", "zum Beispiel", "dreizehn", "Noch einmal, bitte.", "tausend", "wiederholen"] },
    { docks: ["der Schinken", "der Wein", "die Pause", "der Anrufbeantworter", "die Handynummer", "die Hausnummer", "die Postleitzahl", "der Computer", "die E-Mail", "das Internet", "die Million", "die Vorwahl"], bingo: ["achtzig", "andere", "leicht", "bezahlen", "das Alter", "der Bruder", "der Enkel", "die Enkelin", "euer Plakat"] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
  ],
  6: [
    { docks: ["die Kasse", "das Kleid", "der Kunde", "der Mantel", "der Preis", "der Rock", "der Schuh", "das Angebot", "der Cent", "die Erdbeere", "die Flasche", "das Geschäft"], bingo: ["ausziehen", "braun", "grün", "kriegen", "sich kümmern", "zufrieden", "anbieten", "am besten", "am meisten"] },
    { docks: ["das Gewicht", "die Kartoffel", "die Kleidung", "die Kreditkarte", "die Lebensmittel", "die Orange", "das Prozent", "die Bäckerei", "das Lokal", "das Mittagessen", "das Öl", "die Pasta"], bingo: ["die Pommes frites", "vierte", "wenig", "die Eltern", "geschieden", "die Geschwister", "die Großeltern", "ledig", "die Schwester"] },
    { docks: ["das Restaurant", "das Salz", "der Schinken", "der Wein", "der Bruder", "der Cousin", "die Cousine", "die Ehefrau", "der Ehemann", "die Familie", "der Familienstand", "die Freundin"], bingo: ["der Sohn", "die Tochter", "der Vater", "verheiratet", "das Baby", "beide", "der Erwachsene", "gratulieren", "heiraten"] },
    { docks: ["die Großmutter", "der Großvater", "die Hausfrau", "die Hochzeit", "der Hund", "die Katze", "der Kurs", "das Mädchen", "die Mutter", "der Onkel", "der Partner", "die Schule"], bingo: ["der Jugendliche", "der Kindergarten", "leben", "die Partnerin", "sondern", "die Tante", "der Verwandte", "schicken", "das Abendessen"] },
  ],
  7: [
    { docks: ["der September", "der August", "der Bekannte", "der Feiertag", "der November", "der Oktober", "die Reparatur", "der Schluss", "der Wochentag", "der Cent", "die Erdbeere", "die Flasche"], bingo: ["nächste", "pünktlich", "Wie viel Uhr ist es?", "zurzeit", "braun", "grün", "kriegen", "sich kümmern", "zufrieden"] },
    { docks: ["das Geschäft", "das Gewicht", "die Kartoffel", "die Kleidung", "die Kreditkarte", "die Lebensmittel", "die Orange", "das Prozent", "die Birne", "die Cola", "der Döner", "das Fleisch"], bingo: ["bezahlen", "bestellen", "bitter", "schmecken", "riechen", "Zusammen oder getrennt?", "anbieten", "am besten", "am meisten"] },
    { docks: ["das Getränk", "das Hähnchen", "der Käse", "die Milch", "die Rechnung", "der Salat", "die Wurst", "die Bäckerei", "das Lokal", "das Mittagessen", "das Öl", "die Pasta"], bingo: ["die Pommes frites", "vierte", "wenig", "international", "kennenlernen", "sich vorstellen", "der Nachmittag", "der Vormittag", "ein Kilo"] },
    { docks: ["das Restaurant", "das Salz", "der Schinken", "der Wein", "das Ausland", "der Ausländer", "die Heimat", "die Schweiz"], bingo: [] },
  ],
  8: [
    { docks: ["die Gruppe", "die Idee", "das Kino", "das Konzert", "das Schwimmbad", "der Sport", "der Urlaub", "der Eintritt", "die Halle", "der Lieblingsfilm", "der See", "der Verein"], bingo: ["wandern", "baden", "erst", "Freunde treffen", "gewinnen", "Gitarre spielen", "grillen", "lustig", "mitmachen"] },
    { docks: ["der Apfel", "die Banane", "das Geschenk", "das Gramm", "die Größe", "die Gurke", "das Hemd", "die Hose", "die Kasse", "das Kleid", "der Kunde", "der Mantel"], bingo: ["Musik hören", "Rad fahren", "wunderbar", "bar", "ein Pfund", "kurz", "schicken", "schwarz", "tot"] },
    { docks: ["der Preis", "der Rock", "der Schuh", "das Angebot", "der Cent", "die Erdbeere", "die Flasche", "das Geschäft", "das Gewicht", "die Kartoffel", "die Kleidung", "die Kreditkarte"], bingo: ["verkaufen", "100 Gramm", "anziehen", "ausziehen", "braun", "grün", "kriegen", "sich kümmern", "zufrieden"] },
    { docks: ["die Lebensmittel", "die Orange", "das Prozent", "der Computer", "die E-Mail", "das Internet", "die Million", "die Vorwahl"], bingo: ["achtzig", "andere", "leicht", "leider", "tanzen", "anmachen", "bald", "einkaufen", "glauben"] },
  ],
  9: [
    { docks: ["der Herd", "die Kaltmiete", "die Miete", "die Ordnung", "der Osten", "der Quadratmeter", "das Schlafzimmer", "der Schreibtisch", "die Treppe", "das Treppenhaus", "der Vermieter", "die Warmmiete"], bingo: ["möbliert", "modern", "die Nebenkosten", "besetzt", "breit", "draußen", "teuer – günstig", "hoch", "oben"] },
    { docks: ["das Wohnheim", "das Wohnzimmer", "die Waschmaschine", "die Mitte", "die Toilette", "der See", "der Verein", "der Nachmittag", "der Vormittag", "der Anfang", "der April", "der Dezember"], bingo: ["umziehen", "vermieten", "waschen", "zwischen", "Freunde treffen", "gewinnen", "Gitarre spielen", "grillen", "lustig"] },
    { docks: ["die Dusche", "der Februar", "der Feierabend", "der Januar", "der März", "die Sekunde", "der September", "der August", "der Bekannte", "der Feiertag", "der November", "der Oktober"], bingo: ["mitmachen", "Musik hören", "Rad fahren", "wunderbar", "anfangen", "aufhören", "ausmachen", "duschen", "enden"] },
    { docks: ["die Reparatur", "der Schluss", "der Wochentag", "das Baby", "der Erwachsene", "der Jugendliche", "der Kindergarten", "die Partnerin", "die Tante", "der Verwandte"], bingo: ["frühstücken", "reparieren", "Wie spät ist es?", "aufräumen", "bekannt", "eilig", "fernsehen", "gegen", "gerade"] },
  ],
  10: [
    { docks: ["die U-Bahn", "die Abfahrt", "die Ankunft", "der Ausgang", "die Auskunft", "das Auto", "der Automat", "der Bahnsteig", "der Eingang", "die Führung", "der Prospekt", "der Schalter"], bingo: ["umsteigen", "weiter", "Wie komme ich zum …?", "besichtigen", "gültig", "überweisen", "an sein", "besetzt", "breit"] },
    { docks: ["das Ticket", "die Vorsicht", "der Absender", "die Ansage", "die Autobahn", "die Bank", "die Briefmarke", "das Bürgeramt", "das Dorf", "der Empfänger", "der Kilometer", "das Konto"], bingo: ["draußen", "teuer – günstig", "hoch", "oben", "umziehen", "vermieten", "waschen", "zwischen", "leider"] },
    { docks: ["der Norden", "der Ort", "das Rathaus", "die S-Bahn", "die Sehenswürdigkeit", "der Süden", "der Supermarkt", "der Westen", "die Waschmaschine", "die Mitte", "die Toilette", "der Baum"], bingo: ["tanzen", "am liebsten", "einladen", "Fahrrad fahren", "fertig", "fotografieren", "Fußball spielen", "gefallen", "ins Kino gehen"] },
    { docks: ["die Disco", "das Feuer", "die Gruppe", "die Idee", "das Kino", "das Konzert", "das Schwimmbad", "der Sport", "der Urlaub", "der Eintritt", "die Halle", "der Lieblingsfilm"], bingo: ["laufen", "manchmal", "nicht gern", "oft", "schwimmen", "verstehen", "wandern", "baden", "erst"] },
  ],
  11: [
    { docks: ["das Glück", "das Haar", "der Hals", "der Husten", "das Medikament", "der Mund", "die Nase", "das Ohr", "der Schnupfen", "die Tablette", "das Wartezimmer", "der Zahn"], bingo: ["wichtig", "aussehen", "besser", "erlauben", "erzählen", "leise", "böse", "empfehlen", "etwa"] },
    { docks: ["der Bauch", "der Absender", "die Ansage", "die Autobahn", "die Bank", "die Briefmarke", "das Bürgeramt", "das Dorf", "der Empfänger", "der Kilometer", "das Konto", "der Norden"], bingo: ["besichtigen", "gültig", "überweisen", "an sein", "daneben", "hell – dunkel", "feiern", "legen", "möbliert"] },
    { docks: ["der Ort", "das Rathaus", "die S-Bahn", "die Sehenswürdigkeit", "der Süden", "der Supermarkt", "der Westen", "der Balkon", "die Adresse", "das Apartment", "der Aufzug", "der Blick"], bingo: ["modern", "die Nebenkosten", "der Vermieter", "die Warmmiete", "das Wohnheim", "das Wohnzimmer", "besetzt", "breit", "draußen"] },
    { docks: ["der Flur", "die Heizung", "der Herd", "die Kaltmiete", "die Miete", "die Ordnung", "der Osten", "der Quadratmeter", "das Schlafzimmer", "der Schreibtisch", "die Treppe", "das Treppenhaus"], bingo: ["teuer – günstig", "hoch", "die Waschmaschine", "die Mitte", "oben", "die Toilette", "umziehen", "vermieten", "waschen"] },
  ],
  12: [
    { docks: ["der Schalter", "das Ticket", "die Vorsicht", "der Absender", "die Ansage", "die Autobahn", "die Bank", "die Briefmarke", "das Bürgeramt", "das Dorf", "der Empfänger", "der Kilometer"], bingo: ["fernsehen", "gegen", "gerade", "nächste", "pünktlich", "Wie viel Uhr ist es?", "zurzeit", "gesund", "letzte Woche"] },
    { docks: ["das Konto", "der Norden", "der Ort", "das Rathaus", "die S-Bahn", "die Sehenswürdigkeit", "der Süden", "der Supermarkt", "der Westen", "der August", "der Bekannte", "der Feiertag"], bingo: ["die Lehrerin", "die Lösung", "die Papiere", "der Schüler", "der Student", "der Unterricht", "die Verkäuferin", "der Fehler", "abgeben"] },
    { docks: ["der November", "der Oktober", "die Reparatur", "der Schluss", "der Wochentag", "die Anrede", "die Aussage", "die Firma", "der Kellner", "der Mechaniker", "der Teil", "die Aufgabe"], bingo: ["anklicken", "der Arbeitsplatz", "bedeuten", "benutzen", "der Bogen", "der Chef", "drucken", "der Drucker", "der Friseur"] },
    { docks: ["der Beruf", "der Bleistift", "das Ergebnis", "das Vorstellungsgespräch", "die Hausaufgabe", "der Hausmann", "die Kellnerin", "die Klasse", "die Köchin", "der Kollege", "der Krankenpfleger", "der Lehrer"], bingo: ["gestern Abend", "der Informatiker", "der Ingenieur", "der Job", "der Kugelschreiber", "letztes Jahr", "männlich", "das Praktikum", "selbstständig"] },
  ],
  13: [
    { docks: ["das Medikament", "der Mund", "die Nase", "das Ohr", "der Schnupfen", "die Tablette", "das Wartezimmer", "der Zahn", "der Bauch", "der Eintritt", "die Halle", "der Lieblingsfilm"], bingo: ["kalt", "sonnig", "übernachten", "windig", "ausländisch", "Es schneit.", "Es sind 20 Grad.", "europäisch", "die Ferien"] },
    { docks: ["der See", "der Verein", "das Meer", "der Sommer", "die Anreise", "der Anschluss", "das Datum", "das Doppelzimmer", "der Flughafen", "das Gepäck", "die Halbpension", "der Herbst"], bingo: ["fremd", "kulturell", "der Kollege", "der Krankenpfleger", "der Lehrer", "die Lehrerin", "die Lösung", "die Papiere", "der Schüler"] },
    { docks: ["der Koffer", "der Regenschirm", "das Wetter", "der Winter", "der Abflug", "der Deutsche", "der Europäer", "der Frühling", "die Jahreszeit", "die Milliarde", "der Monat", "das Reisebüro"], bingo: ["der Student", "der Unterricht", "die Verkäuferin", "abgeben", "anklicken", "der Arbeitsplatz", "bedeuten", "benutzen", "der Bogen"] },
    { docks: ["der Reiseführer", "die Welt", "die Aufgabe", "der Beruf", "der Bleistift", "das Ergebnis", "das Vorstellungsgespräch", "die Hausaufgabe", "der Hausmann", "die Kellnerin", "die Klasse", "die Köchin"], bingo: ["der Chef", "drucken", "der Drucker", "der Friseur", "gestern Abend", "der Informatiker", "der Ingenieur", "der Job", "der Kugelschreiber"] },
  ],
};

export const WARMUPS: Record<number, Warmup[]> = {
  2: [
    { mech: "bingo", words: ["geboren", "Kasachstan", "die USA", "Wie geht's?", "international", "kennenlernen", "sich vorstellen"] },
    { mech: "docks", words: ["die Dame", "der Mensch", "der Pass", "der Strand", "die Unterschrift", "der Ausweis", "das Geburtsjahr", "der Geburtsort", "die Türkei", "die Ukraine", "der Vorname", "das Ausland"] },
    { mech: "gull", words: ["ein bisschen", "Dänemark", "Danke, gut!", "Herzliche Grüße", "Russland", "studieren", "unterschreiben", "Argentinien", "Deutschland", "Europa"] },
  ],
  3: [
    { mech: "gull", words: ["telefonieren", "vierzehn", "Wie bitte?", "zum Beispiel", "dreizehn", "Noch einmal, bitte.", "tausend", "wiederholen", "achtzig", "andere"] },
    { mech: "docks", words: ["der Anruf", "der Liegeplatz", "die Prüfung", "der Raum", "der Anrufbeantworter", "die Handynummer", "die Hausnummer", "die Postleitzahl", "der Computer", "die E-Mail", "das Internet", "die Million"] },
    { mech: "letters", words: ["erklären", "fünfzehn", "sechzehn", "sechzig", "siebzig"] },
  ],
  4: [
    { mech: "docks", words: ["das Alter", "der Enkel", "die Enkelin", "der Glückwunsch", "das Rezept", "der Cousin", "die Cousine", "die Ehefrau", "der Ehemann", "die Familie", "der Familienstand", "die Freundin"] },
    { mech: "bingo", words: ["euer Plakat", "lieben", "die Eltern", "geschieden", "die Geschwister", "die Großeltern", "ledig", "verheiratet", "beide", "gratulieren", "heiraten", "leben"] },
  ],
  5: [
    { mech: "letters", words: ["kennen", "zahlen", "bestellen", "bitter", "schmecken"] },
    { mech: "gull", words: ["Durst haben", "riechen", "Zusammen oder getrennt?", "anbieten", "am besten", "am meisten", "die Pommes frites", "vierte", "wenig", "heiraten"] },
    { mech: "docks", words: ["das Abendessen", "die Butter", "das Glas", "das Obst", "der Saft", "die Speisekarte", "die Birne", "die Cola", "der Döner", "das Fleisch", "das Getränk", "das Hähnchen"] },
  ],
  6: [
    { mech: "bingo", words: ["ein Kilo", "ein Liter", "gelb", "grau", "bar", "ein Pfund", "kurz", "schwarz", "tot", "verkaufen", "100 Gramm", "anziehen"] },
    { mech: "docks", words: ["das Geld", "der Pullover", "das T-Shirt", "die Zwiebel", "der Apfel", "die Banane", "das Geschenk", "das Gramm", "die Größe", "die Gurke", "das Hemd", "die Hose"] },
  ],
  7: [
    { mech: "gull", words: ["anmachen", "bald", "einkaufen", "glauben", "gleich", "ihm", "müde", "seit", "anfangen", "aufhören"] },
    { mech: "bingo", words: ["ausmachen", "duschen", "enden", "frühstücken", "reparieren", "Wie spät ist es?", "aufräumen", "bekannt", "eilig", "fernsehen", "gegen", "gerade"] },
    { mech: "docks", words: ["der Kiosk", "der Mai", "der Moment", "der Anfang", "der April", "der Dezember", "die Dusche", "der Februar", "der Feierabend", "der Januar", "der März", "die Sekunde"] },
  ],
  8: [
    { mech: "docks", words: ["der Ausflug", "die Blume", "der Donnerstag", "die Einladung", "der Film", "die Freizeit", "der Garten", "der Mittwoch", "der Park", "der Baum", "die Disco", "das Feuer"] },
    { mech: "letters", words: ["dir", "einladen", "fertig", "gefallen", "laufen"] },
    { mech: "bingo", words: ["Schade!", "Tennis spielen", "am liebsten", "Fahrrad fahren", "fotografieren", "Fußball spielen", "ins Kino gehen", "manchmal", "nicht gern", "oft", "schwimmen", "verstehen"] },
  ],
  9: [
    { mech: "pairs", words: ["nächste", "pünktlich", "Wie viel Uhr ist es?", "zurzeit", "beide", "gratulieren"] },
    { mech: "gull", words: ["geschlossen", "mitnehmen", "die Möbel", "ruhig – laut", "unten", "warm", "daneben", "hell – dunkel", "feiern", "legen"] },
    { mech: "docks", words: ["das Bad", "das Erdgeschoss", "der Kleiderschrank", "der Kühlschrank", "das Sofa", "die Wohnung", "die Adresse", "das Apartment", "der Aufzug", "der Blick", "der Flur", "die Heizung"] },
  ],
  10: [
    { mech: "bingo", words: ["entschuldigen", "in der Nähe", "abfliegen", "abholen", "aussteigen", "automatisch", "durch", "einfach", "einsteigen", "fliegen", "gestorben", "lachen"] },
    { mech: "docks", words: ["die Ampel", "der Bahnhof", "der Beamte", "der Fahrer", "das Flugzeug", "das Gleis", "die Information", "der Lkw", "die Post", "die Straße", "die Straßenbahn", "das Taxi"] },
    { mech: "letters", words: ["Achtung", "circa", "dauern", "dort", "willkommen"] },
  ],
  11: [
    { mech: "gull", words: ["anmelden", "bekommen", "drücken", "fehlen", "geöffnet", "glücklich", "möglich", "normal", "schlecht", "was für ein"] },
    { mech: "docks", words: ["das Auge", "der Kopf", "die Praxis", "der Schmerz", "der Termin", "die Zigarette", "die Anmeldung", "der Arm", "das Bein", "der Doktor", "die Erkältung", "das Fieber"] },
    { mech: "pairs", words: ["zwischen", "schicken", "100 Gramm", "das Angebot", "anziehen", "ausziehen"] },
  ],
  12: [
    { mech: "docks", words: ["der Bauch", "die Apotheke", "die Abfahrt", "die Ankunft", "der Ausgang", "die Auskunft", "das Auto", "der Automat", "der Bahnsteig", "der Eingang", "die Führung", "der Prospekt"] },
    { mech: "bingo", words: ["fliegen", "gestorben", "lachen", "umsteigen", "weiter", "Wie komme ich zum …?", "besichtigen", "gültig", "überweisen", "aufräumen", "bekannt", "eilig"] },
    { mech: "gull", words: ["böse", "empfehlen", "etwa", "abfliegen", "abholen", "aussteigen", "automatisch", "durch", "einfach", "einsteigen"] },
  ],
  13: [
    { mech: "bingo", words: ["erst", "Freunde treffen", "gewinnen", "Gitarre spielen", "grillen", "lustig", "mitmachen", "Musik hören", "Rad fahren", "wunderbar", "zu Fuß", "bewölkt"] },
    { mech: "gull", words: ["Gute Besserung!", "aussehen", "besser", "erlauben", "erzählen", "leise", "böse", "empfehlen", "etwa", "baden"] },
    { mech: "docks", words: ["der Rücken", "die Versichertenkarte", "die Anmeldung", "der Arm", "das Bein", "der Doktor", "die Erkältung", "das Fieber", "das Glück", "das Haar", "der Hals", "der Husten"] },
  ],
};
