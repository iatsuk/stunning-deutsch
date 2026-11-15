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
    { docks: ["die Vorwahl", "die Pause", "die Dame", "der Familienname"], bingo: ["achtzig", "andere", "leicht", "Alles Gute!", "Auf Wiederhören!", "ein bisschen", "Dänemark", "Danke, gut!", "Herzliche Grüße"] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
  ],
  4: [
    { docks: ["die Großmutter", "der Großvater", "die Hausfrau", "die Hochzeit", "der Hund", "die Katze", "der Kurs", "das Mädchen", "die Mutter", "der Onkel", "der Partner", "die Schule"], bingo: ["sondern", "Argentinien", "Deutschland", "Europa", "geboren", "Guten Abend!", "Kasachstan", "die USA", "Wie geht's?"] },
    { docks: ["die Schwester", "der Sohn", "die Tochter", "der Vater", "das Baby", "der Erwachsene", "der Jugendliche", "der Kindergarten", "die Partnerin", "die Tante", "der Verwandte", "der Familienname"], bingo: ["international", "kennenlernen", "sich vorstellen", "der Bruder", "achtzehn", "Alles Gute!", "der Anruf", "Auf Wiederhören!", "erklären"] },
    { docks: ["der Ausweis", "das Geburtsjahr", "der Geburtsort", "die Türkei", "die Ukraine", "der Vorname", "das Ausland", "der Ausländer", "die Heimat", "die Schweiz"], bingo: [] },
    { docks: [], bingo: [] },
  ],
  5: [
    { docks: ["der Käse", "die Milch", "die Rechnung", "der Salat", "die Wurst", "die Bäckerei", "das Lokal", "das Mittagessen", "das Öl", "die Pasta", "das Restaurant", "das Salz"], bingo: ["gratulieren", "heiraten", "leben", "sondern", "Alles Gute!", "Auf Wiederhören!", "antworten", "zum Beispiel", "dreizehn"] },
    { docks: ["der Schinken", "der Wein", "der Verwandte", "die Pause", "der Anrufbeantworter", "die Handynummer", "die Hausnummer", "die Postleitzahl", "der Computer", "die E-Mail", "das Internet", "die Million"], bingo: ["Noch einmal, bitte.", "tausend", "telefonieren", "wiederholen", "achtzig", "andere", "leicht", "bezahlen", "das Alter"] },
    { docks: ["die Vorwahl", "der Bruder", "der Enkel", "die Enkelin"], bingo: [] },
    { docks: [], bingo: [] },
  ],
  6: [
    { docks: ["der Kunde", "der Mantel", "der Preis", "der Pullover", "der Rock", "der Schuh", "das Angebot", "die Banane", "der Cent", "die Erdbeere", "die Flasche", "das Geschäft"], bingo: ["anziehen", "ausziehen", "braun", "grün", "kriegen", "sich kümmern", "verkaufen", "zufrieden", "anbieten"] },
    { docks: ["das Gewicht", "die Kartoffel", "die Kleidung", "die Kreditkarte", "die Lebensmittel", "die Orange", "das Prozent", "die Bäckerei", "das Lokal", "das Mittagessen", "das Öl", "die Pasta"], bingo: ["am besten", "am meisten", "die Pommes frites", "vierte", "wenig", "die Eltern", "euer Plakat", "geschieden", "die Geschwister"] },
    { docks: ["das Restaurant", "das Salz", "der Schinken", "der Wein", "der Bruder", "der Cousin", "die Cousine", "die Ehefrau", "der Ehemann", "die Familie", "der Familienstand", "die Freundin"], bingo: ["die Großeltern", "ledig", "die Schwester", "der Sohn", "die Tochter", "der Vater", "verheiratet", "das Baby", "beide"] },
    { docks: ["die Großmutter", "der Großvater", "die Hausfrau", "die Hochzeit", "der Hund", "die Katze", "der Kurs", "das Mädchen", "die Mutter", "der Onkel", "der Partner", "die Schule"], bingo: ["der Erwachsene", "gratulieren", "heiraten", "der Jugendliche", "der Kindergarten", "leben", "die Partnerin", "sondern", "die Tante"] },
  ],
  7: [
    { docks: ["der September", "der August", "der Bekannte", "der Feiertag", "der November", "der Oktober", "die Reparatur", "der Schluss", "der Wochentag", "die Banane", "der Cent", "die Erdbeere"], bingo: ["gerade", "nächste", "pünktlich", "Wie viel Uhr ist es?", "zurzeit", "braun", "grün", "kriegen", "sich kümmern"] },
    { docks: ["die Flasche", "das Geschäft", "das Gewicht", "die Kartoffel", "die Kleidung", "die Kreditkarte", "die Lebensmittel", "die Orange", "das Prozent", "die Birne", "die Cola", "der Döner"], bingo: ["verkaufen", "zufrieden", "bezahlen", "bestellen", "bitter", "schmecken", "riechen", "Zusammen oder getrennt?", "anbieten"] },
    { docks: ["das Fleisch", "das Getränk", "das Hähnchen", "der Käse", "die Milch", "die Rechnung", "der Salat", "die Wurst", "die Bäckerei", "das Lokal", "das Mittagessen", "das Öl"], bingo: ["am besten", "am meisten", "die Pommes frites", "vierte", "wenig", "international", "kennenlernen", "sich vorstellen", "der Nachmittag"] },
    { docks: ["die Pasta", "das Restaurant", "das Salz", "der Schinken", "der Wein", "das Ausland", "der Ausländer", "die Heimat", "die Schweiz"], bingo: [] },
  ],
  8: [
    { docks: ["die Gruppe", "die Idee", "das Kino", "das Konzert", "der Mittwoch", "das Schwimmbad", "der Sport", "der Urlaub", "der Eintritt", "die Halle", "der Lieblingsfilm", "der See"], bingo: ["verstehen", "wandern", "baden", "erst", "Freunde treffen", "gewinnen", "Gitarre spielen", "grillen", "lustig"] },
    { docks: ["der Verein", "der Apfel", "das Geschenk", "das Gramm", "die Größe", "die Gurke", "das Hemd", "die Hose", "die Kasse", "das Kleid", "der Kunde", "der Mantel"], bingo: ["mitmachen", "Musik hören", "Rad fahren", "wunderbar", "pünktlich", "Wie viel Uhr ist es?", "zurzeit", "bar", "ein Pfund"] },
    { docks: ["der Preis", "der Pullover", "der Rock", "der Schuh", "das Angebot", "die Banane", "der Cent", "die Erdbeere", "die Flasche", "das Geschäft", "das Gewicht", "die Kartoffel"], bingo: ["kurz", "schicken", "schwarz", "tot", "100 Gramm", "anziehen", "ausziehen", "braun", "grün"] },
    { docks: ["die Kleidung", "die Kreditkarte", "die Lebensmittel", "die Orange", "das Prozent", "der Computer", "die E-Mail", "das Internet", "die Million", "die Vorwahl"], bingo: ["kriegen", "sich kümmern", "verkaufen", "zufrieden", "achtzig", "andere", "leicht", "leider", "tanzen"] },
  ],
  9: [
    { docks: ["der Herd", "die Kaltmiete", "die Miete", "die Ordnung", "der Osten", "der Quadratmeter", "das Schlafzimmer", "der Schreibtisch", "die Treppe", "das Treppenhaus", "der Vermieter", "die Warmmiete"], bingo: ["modern", "die Nebenkosten", "an sein", "besetzt", "breit", "draußen", "feiern", "teuer – günstig", "hoch"] },
    { docks: ["das Wohnheim", "das Wohnzimmer", "die Waschmaschine", "die Mitte", "die Toilette", "der Eintritt", "die Halle", "der Lieblingsfilm", "der See", "der Verein", "der Nachmittag", "der Vormittag"], bingo: ["oben", "umziehen", "vermieten", "waschen", "zwischen", "baden", "erst", "Freunde treffen", "gewinnen"] },
    { docks: ["der Anfang", "der April", "der Dezember", "die Dusche", "der Februar", "der Feierabend", "der Januar", "der März", "die Sekunde", "der September", "der August", "der Bekannte"], bingo: ["Gitarre spielen", "grillen", "lustig", "mitmachen", "Musik hören", "Rad fahren", "wunderbar", "anfangen", "aufhören"] },
    { docks: ["der Feiertag", "der November", "der Oktober", "die Reparatur", "der Schluss", "der Wochentag", "das Baby", "der Erwachsene", "der Jugendliche", "der Kindergarten", "die Partnerin", "die Tante"], bingo: ["ausmachen", "bald", "duschen", "enden", "frühstücken", "gleich", "reparieren", "Wie spät ist es?", "aufräumen"] },
  ],
  10: [
    { docks: ["die Straßenbahn", "das Taxi", "die U-Bahn", "die Abfahrt", "die Ankunft", "der Ausgang", "die Auskunft", "das Auto", "der Automat", "der Bahnsteig", "der Eingang", "die Führung"], bingo: ["umsteigen", "weiter", "Wie komme ich zum …?", "besichtigen", "gültig", "überweisen", "an sein", "besetzt", "breit"] },
    { docks: ["der Prospekt", "der Schalter", "das Ticket", "die Vorsicht", "der Absender", "die Ansage", "die Autobahn", "die Bank", "die Briefmarke", "das Bürgeramt", "das Dorf", "der Empfänger"], bingo: ["draußen", "feiern", "teuer – günstig", "hoch", "oben", "umziehen", "vermieten", "waschen", "zwischen"] },
    { docks: ["der Kilometer", "das Konto", "der Norden", "der Ort", "das Rathaus", "die S-Bahn", "die Sehenswürdigkeit", "der Süden", "der Supermarkt", "der Westen", "die Waschmaschine", "die Mitte"], bingo: ["leider", "tanzen", "am liebsten", "einladen", "Fahrrad fahren", "fertig", "fotografieren", "Fußball spielen", "gefallen"] },
    { docks: ["die Toilette", "der Baum", "die Blume", "die Disco", "das Feuer", "die Gruppe", "die Idee", "das Kino", "das Konzert", "der Mittwoch", "das Schwimmbad", "der Sport"], bingo: ["ins Kino gehen", "laufen", "manchmal", "nicht gern", "oft", "Schade!", "schwimmen", "der Urlaub", "verstehen"] },
  ],
  11: [
    { docks: ["das Haar", "der Hals", "der Husten", "das Medikament", "der Mund", "die Nase", "das Ohr", "der Schmerz", "der Schnupfen", "die Tablette", "das Wartezimmer", "der Zahn"], bingo: ["wichtig", "aussehen", "besser", "erlauben", "erzählen", "leise", "böse", "empfehlen", "etwa"] },
    { docks: ["der Bauch", "der Absender", "die Ansage", "die Autobahn", "die Bank", "die Briefmarke", "das Bürgeramt", "das Dorf", "der Empfänger", "der Kilometer", "das Konto", "der Norden"], bingo: ["besichtigen", "gültig", "überweisen", "daneben", "hell – dunkel", "legen", "möbliert", "modern", "die Nebenkosten"] },
    { docks: ["der Ort", "das Rathaus", "die S-Bahn", "die Sehenswürdigkeit", "der Süden", "der Supermarkt", "der Westen", "der Balkon", "die Adresse", "das Apartment", "der Aufzug", "der Blick"], bingo: ["der Vermieter", "die Warmmiete", "das Wohnheim", "das Wohnzimmer", "an sein", "besetzt", "breit", "draußen", "feiern"] },
    { docks: ["der Flur", "die Heizung", "der Herd", "die Kaltmiete", "die Miete", "die Ordnung", "der Osten", "der Quadratmeter", "das Schlafzimmer", "der Schreibtisch", "die Treppe", "das Treppenhaus"], bingo: ["teuer – günstig", "hoch", "die Waschmaschine", "die Mitte", "oben", "die Toilette", "umziehen", "vermieten", "waschen"] },
  ],
  12: [
    { docks: ["der Schalter", "das Ticket", "die Vorsicht", "der Absender", "die Ansage", "die Autobahn", "die Bank", "die Briefmarke", "das Bürgeramt", "das Dorf", "der Empfänger", "der Kilometer"], bingo: ["eilig", "fernsehen", "gegen", "gerade", "nächste", "pünktlich", "Wie viel Uhr ist es?", "zurzeit", "gesund"] },
    { docks: ["das Konto", "der Norden", "der Ort", "das Rathaus", "die S-Bahn", "die Sehenswürdigkeit", "der Süden", "der Supermarkt", "der Westen", "der August", "der Bekannte", "der Feiertag"], bingo: ["letzte Woche", "die Lehrerin", "die Lösung", "die Papiere", "der Schüler", "der Student", "der Unterricht", "die Verkäuferin", "abgeben"] },
    { docks: ["der November", "der Oktober", "die Reparatur", "der Schluss", "der Wochentag", "die Anrede", "die Aussage", "die Firma", "der Kellner", "der Mechaniker", "der Teil", "die Aufgabe"], bingo: ["anklicken", "der Arbeitsplatz", "bedeuten", "benutzen", "der Bogen", "der Chef", "drucken", "der Drucker", "der Fehler"] },
    { docks: ["der Beruf", "der Bleistift", "das Ergebnis", "das Vorstellungsgespräch", "die Hausaufgabe", "der Hausmann", "die Kellnerin", "die Klasse", "die Köchin", "der Kollege", "der Krankenpfleger", "der Lehrer"], bingo: ["der Friseur", "gestern Abend", "der Informatiker", "der Ingenieur", "der Job", "der Kugelschreiber", "letztes Jahr", "männlich", "das Praktikum"] },
  ],
  13: [
    { docks: ["das Medikament", "der Mund", "die Nase", "das Ohr", "der Schmerz", "der Schnupfen", "die Tablette", "das Wartezimmer", "der Zahn", "der Bauch", "der Eintritt", "die Halle"], bingo: ["kalt", "übernachten", "windig", "ausländisch", "bewölkt", "Es schneit.", "Es sind 20 Grad.", "europäisch", "die Ferien"] },
    { docks: ["der Lieblingsfilm", "der See", "der Verein", "das Meer", "der Sommer", "die Anreise", "der Anschluss", "das Datum", "das Doppelzimmer", "der Flughafen", "das Gepäck", "die Halbpension"], bingo: ["fremd", "kulturell", "sonnig", "die Köchin", "der Kollege", "der Krankenpfleger", "der Lehrer", "die Lehrerin", "die Lösung"] },
    { docks: ["der Herbst", "der Koffer", "der Regenschirm", "das Wetter", "der Winter", "der Abflug", "der Deutsche", "der Europäer", "der Frühling", "die Jahreszeit", "die Milliarde", "der Monat"], bingo: ["die Papiere", "der Schüler", "der Student", "der Unterricht", "die Verkäuferin", "abgeben", "anklicken", "der Arbeitsplatz", "bedeuten"] },
    { docks: ["das Reisebüro", "der Reiseführer", "die Welt", "die Aufgabe", "der Beruf", "der Bleistift", "das Ergebnis", "das Vorstellungsgespräch", "die Hausaufgabe", "der Hausmann", "die Kellnerin", "die Klasse"], bingo: ["benutzen", "der Bogen", "der Chef", "drucken", "der Drucker", "der Fehler", "der Friseur", "gestern Abend", "der Informatiker"] },
  ],
};

export const WARMUPS: Record<number, Warmup[]> = {
  2: [
    { mech: "bingo", words: ["geboren", "Guten Abend!", "Kasachstan", "die USA", "Wie geht's?", "international", "kennenlernen", "sich vorstellen"] },
    { mech: "docks", words: ["die Dame", "der Mensch", "der Pass", "der Strand", "die Unterschrift", "der Ausweis", "das Geburtsjahr", "der Geburtsort", "die Türkei", "die Ukraine", "der Vorname", "das Ausland"] },
    { mech: "gull", words: ["ein bisschen", "Dänemark", "Danke, gut!", "Herzliche Grüße", "Russland", "studieren", "unterschreiben", "Argentinien", "Deutschland", "Europa"] },
  ],
  3: [
    { mech: "gull", words: ["siebzig", "vierzehn", "Wie bitte?", "antworten", "zum Beispiel", "dreizehn", "Noch einmal, bitte.", "tausend", "telefonieren", "wiederholen"] },
    { mech: "docks", words: ["der Anruf", "der Liegeplatz", "die Prüfung", "der Raum", "der Anrufbeantworter", "die Handynummer", "die Hausnummer", "die Postleitzahl", "der Computer", "die E-Mail", "das Internet", "die Million"] },
    { mech: "letters", words: ["achtzehn", "erklären", "fünfzehn", "sechzehn", "sechzig"] },
  ],
  4: [
    { mech: "docks", words: ["das Alter", "der Enkel", "die Enkelin", "der Glückwunsch", "das Rezept", "der Cousin", "die Cousine", "die Ehefrau", "der Ehemann", "die Familie", "der Familienstand", "die Freundin"] },
    { mech: "bingo", words: ["lieben", "die Eltern", "euer Plakat", "geschieden", "die Geschwister", "die Großeltern", "ledig", "verheiratet", "beide", "gratulieren", "heiraten", "leben"] },
  ],
  5: [
    { mech: "letters", words: ["kennen", "zahlen", "bestellen", "bitter", "schmecken"] },
    { mech: "gull", words: ["Durst haben", "riechen", "Zusammen oder getrennt?", "anbieten", "am besten", "am meisten", "die Pommes frites", "vierte", "wenig", "beide"] },
    { mech: "docks", words: ["das Abendessen", "die Butter", "das Glas", "das Obst", "der Saft", "die Speisekarte", "die Birne", "die Cola", "der Döner", "das Fleisch", "das Getränk", "das Hähnchen"] },
  ],
  6: [
    { mech: "bingo", words: ["blau", "ein Kilo", "ein Liter", "gelb", "grau", "kosten", "bar", "ein Pfund", "kurz", "schwarz", "tot", "100 Gramm"] },
    { mech: "pairs", words: ["der Verwandte", "schicken", "das Abendessen", "bezahlen"] },
    { mech: "docks", words: ["das Geld", "das T-Shirt", "die Zwiebel", "der Apfel", "das Geschenk", "das Gramm", "die Größe", "die Gurke", "das Hemd", "die Hose", "die Kasse", "das Kleid"] },
  ],
  7: [
    { mech: "gull", words: ["anmachen", "beginnen", "einkaufen", "glauben", "ihm", "müde", "seit", "anfangen", "aufhören", "ausmachen"] },
    { mech: "bingo", words: ["bald", "duschen", "enden", "frühstücken", "gleich", "reparieren", "Wie spät ist es?", "aufräumen", "bekannt", "eilig", "fernsehen", "gegen"] },
    { mech: "docks", words: ["der Kiosk", "der Mai", "der Moment", "der Anfang", "der April", "der Dezember", "die Dusche", "der Februar", "der Feierabend", "der Januar", "der März", "die Sekunde"] },
  ],
  8: [
    { mech: "docks", words: ["der Ausflug", "der Dienstag", "der Donnerstag", "die Einladung", "der Film", "die Freizeit", "der Garten", "der Park", "der Baum", "die Blume", "die Disco", "das Feuer"] },
    { mech: "letters", words: ["dir", "so", "einladen", "fertig", "gefallen"] },
    { mech: "bingo", words: ["Tennis spielen", "am liebsten", "Fahrrad fahren", "fotografieren", "Fußball spielen", "ins Kino gehen", "laufen", "manchmal", "nicht gern", "oft", "Schade!", "schwimmen"] },
  ],
  9: [
    { mech: "pairs", words: ["bekannt", "eilig", "fernsehen", "gegen", "gerade", "nächste"] },
    { mech: "gull", words: ["geschlossen", "ruhig – laut", "mitnehmen", "die Möbel", "unten", "warm", "daneben", "hell – dunkel", "legen", "möbliert"] },
    { mech: "docks", words: ["das Bad", "das Erdgeschoss", "der Kleiderschrank", "der Kühlschrank", "das Sofa", "die Wohnung", "die Adresse", "das Apartment", "der Aufzug", "der Blick", "der Flur", "die Heizung"] },
  ],
  10: [
    { mech: "bingo", words: ["entschuldigen", "in der Nähe", "abholen", "aussteigen", "automatisch", "dort", "durch", "einfach", "einsteigen", "fliegen", "gestorben", "lachen"] },
    { mech: "docks", words: ["die Ampel", "der Bahnhof", "der Beamte", "der Fahrer", "das Flugzeug", "das Gleis", "die Haltestelle", "die Information", "der Lkw", "der Stadtplan", "die Post", "die Straße"] },
    { mech: "letters", words: ["Achtung", "circa", "dauern", "willkommen", "abfliegen"] },
  ],
  11: [
    { mech: "gull", words: ["anmelden", "bekommen", "drücken", "fehlen", "geöffnet", "glücklich", "möglich", "normal", "schlecht", "was für ein"] },
    { mech: "docks", words: ["das Auge", "der Kopf", "die Praxis", "der Termin", "die Zigarette", "die Anmeldung", "der Arm", "das Bein", "der Doktor", "die Erkältung", "das Fieber", "das Glück"] },
    { mech: "pairs", words: ["zwischen", "schicken", "100 Gramm", "das Angebot", "anziehen", "ausziehen"] },
  ],
  12: [
    { mech: "docks", words: ["der Bauch", "die Apotheke", "die Abfahrt", "die Ankunft", "der Ausgang", "die Auskunft", "das Auto", "der Automat", "der Bahnsteig", "der Eingang", "die Führung", "der Prospekt"] },
    { mech: "bingo", words: ["einsteigen", "fliegen", "gestorben", "lachen", "umsteigen", "weiter", "Wie komme ich zum …?", "besichtigen", "gültig", "überweisen", "aufräumen", "bekannt"] },
    { mech: "gull", words: ["böse", "empfehlen", "etwa", "abfliegen", "abholen", "aussteigen", "automatisch", "dort", "durch", "einfach"] },
  ],
  13: [
    { mech: "bingo", words: ["baden", "erst", "Freunde treffen", "gewinnen", "Gitarre spielen", "grillen", "lustig", "mitmachen", "Musik hören", "Rad fahren", "wunderbar", "zu Fuß"] },
    { mech: "gull", words: ["Gute Besserung!", "aussehen", "besser", "erlauben", "erzählen", "leise", "böse", "empfehlen", "etwa", "wandern"] },
    { mech: "docks", words: ["der Rücken", "die Versichertenkarte", "die Anmeldung", "der Arm", "das Bein", "der Doktor", "die Erkältung", "das Fieber", "das Glück", "das Haar", "der Hals", "der Husten"] },
  ],
};
