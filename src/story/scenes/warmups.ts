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
    { docks: ["die Vorwahl", "die Pause", "die Dame", "der Familienname"], bingo: [] },
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
    { docks: ["der Käse", "die Milch", "die Rechnung", "der Salat", "die Wurst", "die Bäckerei", "das Lokal", "das Mittagessen", "das Öl", "die Pasta", "das Restaurant", "das Salz"], bingo: ["zum Beispiel", "dreizehn", "Noch einmal, bitte.", "wiederholen", "achtzig", "andere", "leicht", "bezahlen", "das Alter"] },
    { docks: ["der Schinken", "der Wein", "die Pause", "der Anrufbeantworter", "die Handynummer", "die Hausnummer", "die Postleitzahl", "der Computer", "die E-Mail", "das Internet", "die Million", "die Vorwahl"], bingo: [] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
  ],
  6: [
    { docks: ["das Kleid", "der Kunde", "der Preis", "der Rock", "der Schuh", "das Angebot", "der Cent", "die Erdbeere", "die Flasche", "das Geschäft", "das Gewicht", "die Kleidung"], bingo: ["ausziehen", "braun", "grün", "kriegen", "sich kümmern", "zufrieden", "anbieten", "am besten", "am meisten"] },
    { docks: ["die Kreditkarte", "die Lebensmittel", "die Orange", "das Prozent", "die Bäckerei", "das Lokal", "das Mittagessen", "das Öl", "die Pasta", "das Restaurant", "das Salz", "der Schinken"], bingo: ["die Pommes frites", "vierte", "wenig", "beide", "die Eltern", "geschieden", "die Geschwister", "die Großeltern", "ledig"] },
    { docks: ["der Wein", "der Bruder", "der Cousin", "die Cousine", "die Ehefrau", "der Ehemann", "der Enkel", "die Enkelin", "die Familie", "der Familienstand", "die Freundin", "die Großmutter"], bingo: ["der Sohn", "die Tochter", "der Vater", "verheiratet", "das Baby", "der Erwachsene", "gratulieren", "heiraten", "der Jugendliche"] },
    { docks: ["der Großvater", "die Hausfrau", "die Hochzeit", "der Hund", "die Katze", "der Kurs", "das Mädchen", "die Mutter", "der Onkel", "der Partner", "die Schule", "die Schwester"], bingo: ["der Kindergarten", "leben", "die Partnerin", "sondern", "die Tante", "der Verwandte", "schmecken", "der Mantel", "schicken"] },
  ],
  7: [
    { docks: ["der August", "der Bekannte", "der November", "der Oktober", "die Reparatur", "der Schluss", "der Wochentag", "der Cent", "die Erdbeere", "die Flasche", "das Geschäft", "das Gewicht"], bingo: ["nächste", "Wie viel Uhr ist es?", "zurzeit", "ausziehen", "braun", "grün", "kriegen", "sich kümmern", "zufrieden"] },
    { docks: ["die Kleidung", "die Kreditkarte", "die Lebensmittel", "die Orange", "das Prozent", "die Birne", "das Getränk", "das Hähnchen", "der Käse", "die Milch", "die Rechnung", "der Salat"], bingo: ["bezahlen", "bitter", "riechen", "Zusammen oder getrennt?", "anbieten", "am besten", "am meisten", "die Pommes frites", "vierte"] },
    { docks: ["die Wurst", "die Bäckerei", "das Lokal", "das Mittagessen", "das Öl", "die Pasta", "das Restaurant", "das Salz", "der Schinken", "der Wein", "das Ausland", "der Ausländer"], bingo: ["wenig", "international", "kennenlernen", "sich vorstellen", "ausmachen", "der Nachmittag", "der Vormittag", "der Apfel", "ein Kilo"] },
    { docks: ["die Heimat", "die Schweiz", "das Geld", "die Kartoffel"], bingo: [] },
  ],
  8: [
    { docks: ["die Idee", "das Kino", "das Konzert", "das Schwimmbad", "der Sport", "der Urlaub", "der Eintritt", "die Halle", "der Lieblingsfilm", "der See", "der Verein", "der Mantel"], bingo: ["wandern", "baden", "erst", "Freunde treffen", "gewinnen", "Gitarre spielen", "grillen", "lustig", "mitmachen"] },
    { docks: ["die Banane", "das Geschenk", "das Gramm", "die Größe", "die Gurke", "das Hemd", "die Hose", "die Kasse", "das Kleid", "der Kunde", "der Preis", "der Rock"], bingo: ["Musik hören", "Rad fahren", "wunderbar", "bar", "ein Pfund", "kurz", "schicken", "schwarz", "tot"] },
    { docks: ["der Schuh", "das Angebot", "der Cent", "die Erdbeere", "die Flasche", "das Geschäft", "das Gewicht", "die Kleidung", "die Kreditkarte", "die Lebensmittel", "die Orange", "das Prozent"], bingo: ["verkaufen", "100 Gramm", "anziehen", "ausziehen", "braun", "grün", "kriegen", "sich kümmern", "zufrieden"] },
    { docks: ["der Computer", "die E-Mail", "das Internet", "die Million", "die Vorwahl"], bingo: ["achtzig", "andere", "leicht", "schmecken", "leider", "tanzen", "anmachen", "ausmachen", "bald"] },
  ],
  9: [
    { docks: ["der Herd", "die Kaltmiete", "die Miete", "die Ordnung", "der Osten", "der Quadratmeter", "das Schlafzimmer", "der Schreibtisch", "die Treppe", "das Treppenhaus", "der Vermieter", "die Warmmiete"], bingo: ["möbliert", "modern", "die Nebenkosten", "besetzt", "breit", "draußen", "teuer – günstig", "hoch", "oben"] },
    { docks: ["das Wohnheim", "das Wohnzimmer", "die Waschmaschine", "die Mitte", "die Toilette", "der Verein", "der Nachmittag", "der Vormittag", "der Anfang", "der April", "der Dezember", "die Dusche"], bingo: ["umziehen", "vermieten", "waschen", "zwischen", "Gitarre spielen", "grillen", "lustig", "mitmachen", "Musik hören"] },
    { docks: ["der Februar", "der Feierabend", "der Feiertag", "der Januar", "der März", "die Sekunde", "der September", "der August", "der Bekannte", "der November", "der Oktober", "die Reparatur"], bingo: ["Rad fahren", "wunderbar", "ausmachen", "anfangen", "aufhören", "duschen", "frühstücken", "gegen", "Wie spät ist es?"] },
    { docks: ["der Schluss", "der Wochentag", "das Baby", "der Erwachsene", "der Jugendliche", "der Kindergarten", "die Partnerin", "die Tante", "der Verwandte"], bingo: ["aufräumen", "bekannt", "eilig", "fernsehen", "gerade", "nächste", "Wie viel Uhr ist es?", "zurzeit", "gratulieren"] },
  ],
  10: [
    { docks: ["die U-Bahn", "die Abfahrt", "die Ankunft", "der Ausgang", "die Auskunft", "der Automat", "der Bahnsteig", "der Eingang", "die Führung", "der Prospekt", "der Schalter", "das Ticket"], bingo: ["umsteigen", "weiter", "Wie komme ich zum …?", "besichtigen", "gültig", "überweisen", "an sein", "besetzt", "breit"] },
    { docks: ["die Vorsicht", "der Absender", "die Ansage", "die Autobahn", "die Bank", "die Briefmarke", "das Bürgeramt", "das Dorf", "der Empfänger", "der Kilometer", "das Konto", "der Norden"], bingo: ["draußen", "teuer – günstig", "hoch", "oben", "umziehen", "vermieten", "waschen", "zwischen", "leider"] },
    { docks: ["der Ort", "das Rathaus", "die S-Bahn", "die Sehenswürdigkeit", "der Süden", "der Supermarkt", "der Westen", "die Waschmaschine", "die Mitte", "die Toilette", "der Baum", "die Disco"], bingo: ["tanzen", "am liebsten", "einladen", "Fahrrad fahren", "fotografieren", "Fußball spielen", "gefallen", "ins Kino gehen", "laufen"] },
    { docks: ["das Feuer", "die Gruppe", "die Idee", "das Kino", "das Konzert", "das Schwimmbad", "der Sport", "der Urlaub", "der Eintritt", "die Halle", "der Lieblingsfilm", "der See"], bingo: ["manchmal", "nicht gern", "oft", "schwimmen", "wandern", "baden", "erst", "Freunde treffen", "gewinnen"] },
  ],
  11: [
    { docks: ["das Glück", "das Haar", "der Hals", "der Husten", "das Medikament", "der Mund", "die Nase", "das Ohr", "der Schnupfen", "die Tablette", "das Wartezimmer", "der Zahn"], bingo: ["was für ein", "wichtig", "aussehen", "besser", "erlauben", "erzählen", "leise", "böse", "empfehlen"] },
    { docks: ["der Bauch", "der Absender", "die Ansage", "die Autobahn", "die Bank", "die Briefmarke", "das Bürgeramt", "das Dorf", "der Empfänger", "der Kilometer", "das Konto", "der Norden"], bingo: ["etwa", "besichtigen", "gültig", "überweisen", "an sein", "daneben", "hell – dunkel", "feiern", "legen"] },
    { docks: ["der Ort", "das Rathaus", "die S-Bahn", "die Sehenswürdigkeit", "der Süden", "der Supermarkt", "der Westen", "der Balkon", "die Adresse", "das Apartment", "der Aufzug", "der Blick"], bingo: ["möbliert", "modern", "die Nebenkosten", "der Vermieter", "die Warmmiete", "das Wohnheim", "das Wohnzimmer", "besetzt", "breit"] },
    { docks: ["der Flur", "die Heizung", "der Herd", "die Kaltmiete", "die Miete", "die Ordnung", "der Osten", "der Quadratmeter", "das Schlafzimmer", "der Schreibtisch", "die Treppe", "das Treppenhaus"], bingo: ["draußen", "teuer – günstig", "hoch", "die Waschmaschine", "die Mitte", "oben", "die Toilette", "umziehen", "vermieten"] },
  ],
  12: [
    { docks: ["das Ticket", "die Vorsicht", "der Absender", "die Ansage", "die Autobahn", "die Bank", "die Briefmarke", "das Bürgeramt", "das Dorf", "der Empfänger", "der Kilometer", "das Konto"], bingo: ["fernsehen", "gerade", "nächste", "Wie viel Uhr ist es?", "zurzeit", "gesund", "letzte Woche", "die Lösung", "die Papiere"] },
    { docks: ["der Norden", "der Ort", "das Rathaus", "die S-Bahn", "die Sehenswürdigkeit", "der Süden", "der Supermarkt", "der Westen", "der August", "der Bekannte", "der November", "der Oktober"], bingo: ["der Schüler", "der Student", "der Unterricht", "die Verkäuferin", "abgeben", "anklicken", "der Arbeitsplatz", "bedeuten", "benutzen"] },
    { docks: ["die Reparatur", "der Schluss", "der Wochentag", "die Anrede", "die Aussage", "der Fehler", "der Kellner", "der Mechaniker", "der Teil", "die Aufgabe", "der Beruf", "der Bleistift"], bingo: ["der Bogen", "drucken", "der Drucker", "der Friseur", "gestern Abend", "der Informatiker", "der Ingenieur", "der Job", "der Kugelschreiber"] },
    { docks: ["der Chef", "das Ergebnis", "das Vorstellungsgespräch", "die Hausaufgabe", "der Hausmann", "die Kellnerin", "die Klasse", "die Köchin", "der Kollege", "der Krankenpfleger", "der Lehrer", "die Lehrerin"], bingo: ["letztes Jahr", "männlich", "das Praktikum", "selbstständig", "das Studium", "verdienen", "weiblich", "der Zentimeter", "ausfüllen"] },
  ],
  13: [
    { docks: ["das Medikament", "der Mund", "die Nase", "das Ohr", "der Schnupfen", "die Tablette", "das Wartezimmer", "der Zahn", "der Bauch", "der Eintritt", "die Halle", "der Lieblingsfilm"], bingo: ["kalt", "sonnig", "übernachten", "windig", "ausländisch", "Es schneit.", "Es sind 20 Grad.", "europäisch", "die Ferien"] },
    { docks: ["der See", "der Verein", "das Meer", "der Sommer", "die Anreise", "der Anschluss", "das Datum", "das Doppelzimmer", "der Flughafen", "das Gepäck", "die Halbpension", "der Herbst"], bingo: ["fremd", "kulturell", "die Köchin", "der Kollege", "der Krankenpfleger", "der Lehrer", "die Lehrerin", "die Lösung", "die Papiere"] },
    { docks: ["der Koffer", "der Regenschirm", "das Wetter", "der Winter", "der Abflug", "der Deutsche", "der Europäer", "der Frühling", "die Jahreszeit", "die Milliarde", "der Monat", "das Reisebüro"], bingo: ["der Schüler", "der Student", "der Unterricht", "die Verkäuferin", "abgeben", "anklicken", "der Arbeitsplatz", "bedeuten", "benutzen"] },
    { docks: ["der Reiseführer", "die Welt", "die Aufgabe", "der Beruf", "der Bleistift", "der Chef", "das Ergebnis", "das Vorstellungsgespräch", "die Hausaufgabe", "der Hausmann", "die Kellnerin", "die Klasse"], bingo: ["der Bogen", "drucken", "der Drucker", "der Friseur", "gestern Abend", "der Informatiker", "der Ingenieur", "der Job", "der Kugelschreiber"] },
  ],
};

export const WARMUPS: Record<number, Warmup[]> = {
  2: [
    { mech: "bingo", words: ["geboren", "Kasachstan", "die USA", "Wie geht's?", "international", "kennenlernen", "sich vorstellen"] },
    { mech: "docks", words: ["die Dame", "der Mensch", "der Pass", "der Strand", "die Unterschrift", "der Ausweis", "das Geburtsjahr", "der Geburtsort", "die Türkei", "die Ukraine", "der Vorname", "das Ausland"] },
    { mech: "gull", words: ["ein bisschen", "Dänemark", "Danke, gut!", "Herzliche Grüße", "Russland", "studieren", "unterschreiben", "Argentinien", "Deutschland", "Europa"] },
  ],
  3: [
    { mech: "gull", words: ["tausend", "vierzehn", "Wie bitte?", "zum Beispiel", "dreizehn", "Noch einmal, bitte.", "wiederholen", "achtzig", "andere", "leicht"] },
    { mech: "docks", words: ["der Anruf", "der Liegeplatz", "die Prüfung", "der Raum", "der Anrufbeantworter", "die Handynummer", "die Hausnummer", "die Postleitzahl", "der Computer", "die E-Mail", "das Internet", "die Million"] },
    { mech: "letters", words: ["erklären", "fünfzehn", "sechzehn", "sechzig", "siebzig"] },
  ],
  4: [
    { mech: "docks", words: ["das Alter", "der Glückwunsch", "das Rezept", "der Cousin", "die Cousine", "die Ehefrau", "der Ehemann", "der Enkel", "die Enkelin", "die Familie", "der Familienstand", "die Freundin"] },
    { mech: "bingo", words: ["euer Plakat", "lieben", "beide", "die Eltern", "geschieden", "die Geschwister", "die Großeltern", "ledig", "verheiratet", "gratulieren", "heiraten", "leben"] },
  ],
  5: [
    { mech: "letters", words: ["schmecken", "kennen", "zahlen", "bitter", "riechen"] },
    { mech: "gull", words: ["Durst haben", "Zusammen oder getrennt?", "anbieten", "am besten", "am meisten", "die Pommes frites", "vierte", "wenig", "Alles Gute!", "Auf Wiederhören!"] },
    { mech: "docks", words: ["das Abendessen", "die Butter", "die Cola", "der Döner", "das Fleisch", "das Glas", "das Obst", "der Saft", "die Speisekarte", "die Birne", "das Getränk", "das Hähnchen"] },
  ],
  6: [
    { mech: "bingo", words: ["ein Kilo", "ein Liter", "gelb", "grau", "bar", "ein Pfund", "kurz", "schwarz", "tot", "verkaufen", "100 Gramm", "anziehen"] },
    { mech: "docks", words: ["der Apfel", "das Geld", "die Kartoffel", "das T-Shirt", "die Banane", "das Geschenk", "das Gramm", "die Größe", "die Gurke", "das Hemd", "die Hose", "die Kasse"] },
  ],
  7: [
    { mech: "gull", words: ["schmecken", "anmachen", "bald", "einkaufen", "glauben", "gleich", "ihm", "müde", "pünktlich", "reparieren"] },
    { mech: "bingo", words: ["seit", "anfangen", "aufhören", "duschen", "frühstücken", "gegen", "Wie spät ist es?", "aufräumen", "bekannt", "eilig", "fernsehen", "gerade"] },
    { mech: "docks", words: ["der Moment", "der Anfang", "der April", "der Dezember", "die Dusche", "der Februar", "der Feierabend", "der Feiertag", "der Januar", "der März", "die Sekunde", "der September"] },
  ],
  8: [
    { mech: "docks", words: ["der Donnerstag", "der Ausflug", "die Blume", "die Einladung", "der Film", "die Freizeit", "der Garten", "der Park", "der Baum", "die Disco", "das Feuer", "die Gruppe"] },
    { mech: "letters", words: ["dir", "fertig", "verstehen", "einladen", "gefallen"] },
    { mech: "bingo", words: ["Schade!", "Tennis spielen", "am liebsten", "Fahrrad fahren", "fotografieren", "Fußball spielen", "ins Kino gehen", "laufen", "manchmal", "nicht gern", "oft", "schwimmen"] },
  ],
  9: [
    { mech: "pairs", words: ["heiraten", "leben", "sondern", "der Donnerstag"] },
    { mech: "gull", words: ["geschlossen", "mitnehmen", "die Möbel", "ruhig – laut", "unten", "warm", "daneben", "hell – dunkel", "feiern", "legen"] },
    { mech: "docks", words: ["das Bad", "das Erdgeschoss", "der Kleiderschrank", "der Kühlschrank", "das Sofa", "die Wohnung", "die Adresse", "das Apartment", "der Aufzug", "der Blick", "der Flur", "die Heizung"] },
  ],
  10: [
    { mech: "bingo", words: ["entschuldigen", "in der Nähe", "abfliegen", "abholen", "aussteigen", "automatisch", "durch", "einfach", "einsteigen", "fliegen", "gestorben", "lachen"] },
    { mech: "docks", words: ["die Ampel", "das Auto", "der Bahnhof", "der Beamte", "der Fahrer", "das Flugzeug", "das Gleis", "die Information", "der Lkw", "die Post", "die Straße", "die Straßenbahn"] },
    { mech: "letters", words: ["Achtung", "circa", "dauern", "dort", "willkommen"] },
  ],
  11: [
    { mech: "gull", words: ["ausfüllen", "anmelden", "bekommen", "drücken", "fehlen", "geöffnet", "glücklich", "möglich", "normal", "schlecht"] },
    { mech: "docks", words: ["das Auge", "der Kopf", "die Praxis", "der Schmerz", "der Termin", "die Zigarette", "die Anmeldung", "der Arm", "das Bein", "der Doktor", "die Erkältung", "das Fieber"] },
    { mech: "pairs", words: ["waschen", "zwischen", "schicken", "100 Gramm", "das Angebot", "anziehen"] },
  ],
  12: [
    { mech: "docks", words: ["der Bauch", "die Apotheke", "die Abfahrt", "die Ankunft", "der Ausgang", "die Auskunft", "der Automat", "der Bahnsteig", "der Eingang", "die Führung", "der Prospekt", "der Schalter"] },
    { mech: "bingo", words: ["fliegen", "gestorben", "lachen", "umsteigen", "weiter", "Wie komme ich zum …?", "besichtigen", "gültig", "überweisen", "aufräumen", "bekannt", "eilig"] },
    { mech: "gull", words: ["böse", "empfehlen", "etwa", "abfliegen", "abholen", "aussteigen", "automatisch", "durch", "einfach", "einsteigen"] },
  ],
  13: [
    { mech: "bingo", words: ["erst", "Freunde treffen", "gewinnen", "Gitarre spielen", "grillen", "lustig", "mitmachen", "Musik hören", "Rad fahren", "wunderbar", "zu Fuß", "bewölkt"] },
    { mech: "gull", words: ["Gute Besserung!", "aussehen", "besser", "erlauben", "erzählen", "leise", "böse", "empfehlen", "etwa", "baden"] },
    { mech: "docks", words: ["der Rücken", "die Versichertenkarte", "die Anmeldung", "der Arm", "das Bein", "der Doktor", "die Erkältung", "das Fieber", "das Glück", "das Haar", "der Hals", "der Husten"] },
  ],
};
