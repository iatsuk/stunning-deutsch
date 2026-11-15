import type { Warmup } from "../review.ts";

// Раунд перед главой новой версии (A1-PLAN.md, «Повторение»): одинаковый для всех игроков, поэтому
// индекс полноты засчитывает его игры как часть главы. Слова — из прошлых глав, которым не хватает
// возвращений. Список собирает scripts/a1-returns.mjs --write; собранное можно править руками.

/** Возвращения в сценах главы: четыре блока (сцены 3, 6, 2 и 5), в каждом причалы и лото. */
export const RETURNS: Record<number, { docks: string[]; bingo: string[] }[]> = {
  2: [
    { docks: ["die Heimat", "die Schweiz", "die Dame", "der Familienname"], bingo: [] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
  ],
  3: [
    { docks: ["die Vorwahl", "die Hausnummer", "der Familienname", "der Mensch"], bingo: ["wiederholen", "achtzig", "andere", "leicht", "Dänemark", "Danke, gut!", "der Pass", "Russland", "der Strand"] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
  ],
  4: [
    { docks: ["der Cousin", "die Cousine", "die Ehefrau", "der Ehemann", "die Familie", "der Familienstand", "die Freundin", "die Großmutter", "der Großvater", "die Hochzeit", "der Hund", "die Katze"], bingo: ["ledig", "verheiratet", "international", "kennenlernen", "sich vorstellen", "gratulieren", "heiraten", "leben", "Argentinien"] },
    { docks: ["das Mädchen", "die Mutter", "der Onkel", "der Partner", "die Schwester", "der Sohn", "die Tochter", "der Vater", "das Ausland", "der Ausländer", "die Heimat", "die Schweiz"], bingo: ["euer Plakat", "beide", "Dänemark", "Danke, gut!", "der Mensch", "der Pass", "Russland", "der Strand", "unterschreiben"] },
    { docks: ["das Baby", "der Erwachsene", "der Jugendliche", "die Partnerin", "die Tante", "die Hausfrau", "der Kurs", "die Schule", "der Kindergarten", "der Verwandte"], bingo: [] },
    { docks: [], bingo: [] },
  ],
  5: [
    { docks: ["das Fleisch", "das Getränk", "das Hähnchen", "der Käse", "die Milch", "die Rechnung", "der Salat", "die Wurst", "der Computer", "die E-Mail", "das Internet", "die Million"], bingo: ["Auf Wiederhören!", "Durst haben", "kennen", "zahlen", "andere", "leicht", "anbieten", "am besten", "am meisten"] },
    { docks: ["die Vorwahl", "die Bäckerei", "das Lokal", "das Öl", "die Pasta", "das Restaurant", "das Salz", "der Schinken", "der Wein", "das Abendessen", "die Hausnummer", "das Mittagessen"], bingo: ["die Pommes frites", "vierte", "wenig", "Dänemark", "Danke, gut!", "der Familienname", "der Mensch", "der Pass", "Russland"] },
    { docks: [], bingo: [] },
    { docks: [], bingo: [] },
  ],
  6: [
    { docks: ["der Großvater", "die Hochzeit", "der Hund", "die Katze", "das Mädchen", "die Mutter", "der Onkel", "der Partner", "die Schwester", "der Sohn", "die Tochter", "der Vater"], bingo: ["bar", "ein Pfund", "kurz", "schwarz", "gratulieren", "heiraten", "leben", "100 Gramm", "anziehen"] },
    { docks: ["der Apfel", "das Geschenk", "das Gramm", "die Größe", "die Gurke", "das Hemd", "die Hose", "die Kasse", "das Kleid", "der Kunde", "der Mantel", "der Preis"], bingo: ["ausziehen", "braun", "grün", "verkaufen", "euer Plakat", "tot", "beide", "der Kindergarten", "der Verwandte"] },
    { docks: ["der Pullover", "der Rock", "der Schuh", "das Baby", "der Erwachsene", "der Jugendliche", "die Partnerin", "die Tante", "das Angebot", "die Banane", "der Cent", "die Erdbeere"], bingo: ["anbieten", "am besten", "am meisten", "das Mittagessen", "die Pommes frites", "vierte", "wenig", "kriegen", "sich kümmern"] },
    { docks: ["die Flasche", "das Geschäft", "das Gewicht", "die Kartoffel", "die Kleidung", "die Kreditkarte", "die Lebensmittel", "die Orange", "das Prozent", "die Hausfrau", "der Kurs", "die Schule"], bingo: ["zufrieden", "Dänemark", "Danke, gut!", "der Familienname", "der Mensch", "der Pass", "Russland", "der Strand", "unterschreiben"] },
  ],
  7: [
    { docks: ["die Wurst", "der Anfang", "der April", "der Dezember", "die Dusche", "der Februar", "der Feierabend", "der Januar", "der März", "die Sekunde", "der September", "das Ausland"], bingo: ["eilig", "fernsehen", "gerade", "pünktlich", "Wie viel Uhr ist es?", "zurzeit", "glauben", "ihm", "seit"] },
    { docks: ["der Ausländer", "die Heimat", "die Schweiz", "die Bäckerei", "das Lokal", "das Öl", "die Pasta", "das Restaurant", "das Salz", "der Schinken", "der Wein", "der August"], bingo: ["anfangen", "reparieren", "anbieten", "am besten", "am meisten", "die Pommes frites", "vierte", "wenig", "kriegen"] },
    { docks: ["der Feiertag", "der November", "der Oktober", "der Schluss", "der Wochentag", "der Kiosk", "das Mittagessen", "der Bekannte", "die Reparatur"], bingo: ["sich kümmern", "zufrieden", "bekannt", "gegen", "nächste", "Dänemark", "Danke, gut!", "der Familienname", "der Mensch"] },
    { docks: [], bingo: [] },
  ],
  8: [
    { docks: ["die Hose", "die Kasse", "das Kleid", "der Kunde", "der Mantel", "der Preis", "der Pullover", "der Rock", "der Schuh", "der Baum", "das Bild", "die Blume"], bingo: ["schwimmen", "wandern", "achtzig", "100 Gramm", "anziehen", "ausziehen", "braun", "grün", "verkaufen"] },
    { docks: ["die Disco", "das Feuer", "die Gruppe", "die Idee", "das Kino", "das Konzert", "das Schwimmbad", "der Sport", "der Computer", "die E-Mail", "das Internet", "die Million"], bingo: ["baden", "Freunde treffen", "gewinnen", "Gitarre spielen", "grillen", "lustig", "mitmachen", "Musik hören", "Rad fahren"] },
    { docks: ["die Vorwahl", "das Angebot", "die Banane", "der Cent", "die Erdbeere", "die Flasche", "das Geschäft", "das Gewicht", "die Kartoffel", "die Kleidung", "die Kreditkarte", "die Lebensmittel"], bingo: ["dir", "so", "schicken", "tot", "fertig", "ins Kino gehen", "verstehen", "andere", "leicht"] },
    { docks: ["die Orange", "das Prozent", "der Eintritt", "der Lieblingsfilm", "der See", "der Verein", "der Dienstag", "der Mittwoch", "die Halle"], bingo: ["kriegen", "sich kümmern", "zufrieden", "wunderbar", "Dänemark", "Danke, gut!", "der Familienname", "der Mensch", "der Pass"] },
  ],
  9: [
    { docks: ["die Dusche", "der Februar", "der Feierabend", "der Januar", "der März", "die Sekunde", "der September", "die Adresse", "das Apartment", "der Aufzug", "der Flur", "die Heizung"], bingo: ["Wie spät ist es?", "daneben", "hell – dunkel", "legen", "möbliert", "modern", "gratulieren", "heiraten", "leben"] },
    { docks: ["der Herd", "die Kaltmiete", "die Miete", "die Ordnung", "der Quadratmeter", "das Schlafzimmer", "der Schreibtisch", "die Treppe", "das Treppenhaus", "der Vermieter", "die Warmmiete", "das Wohnheim"], bingo: ["aufräumen", "eilig", "fernsehen", "gerade", "pünktlich", "Wie viel Uhr ist es?", "zurzeit", "besetzt", "breit"] },
    { docks: ["das Wohnzimmer", "das Baby", "der Erwachsene", "der Jugendliche", "die Partnerin", "die Tante", "der August", "der Feiertag", "der November", "der Oktober", "der Schluss", "der Wochentag"], bingo: ["draußen", "teuer – günstig", "hoch", "oben", "umziehen", "vermieten", "waschen", "geschlossen", "mitnehmen"] },
    { docks: ["die Waschmaschine", "die Mitte", "die Toilette", "der Blick", "der Osten", "der Kindergarten", "der Verwandte", "der Bekannte", "die Reparatur", "die Halle"], bingo: ["warm", "anfangen", "reparieren", "die Nebenkosten", "beide", "bekannt", "gegen", "nächste", "wunderbar"] },
  ],
  10: [
    { docks: ["das Bild", "die Blume", "die Disco", "das Feuer", "die Gruppe", "die Idee", "das Kino", "das Konzert", "das Schwimmbad", "der Sport", "die Abfahrt", "die Ankunft"], bingo: ["einsteigen", "umsteigen", "baden", "Freunde treffen", "gewinnen", "Gitarre spielen", "grillen", "lustig", "mitmachen"] },
    { docks: ["der Ausgang", "die Auskunft", "das Auto", "der Automat", "der Bahnsteig", "der Eingang", "die Führung", "der Prospekt", "der Schalter", "das Ticket", "die Vorsicht", "die Bäckerei"], bingo: ["Musik hören", "Rad fahren", "besetzt", "breit", "draußen", "teuer – günstig", "hoch", "oben", "umziehen"] },
    { docks: ["das Lokal", "das Öl", "die Pasta", "das Restaurant", "das Salz", "der Schinken", "der Wein", "der Eintritt", "der Lieblingsfilm", "der See", "der Verein", "die Waschmaschine"], bingo: ["vermieten", "waschen", "besichtigen", "gültig", "der Norden", "der Ort", "das Rathaus", "die S-Bahn", "die Sehenswürdigkeit"] },
    { docks: ["die Mitte", "die Toilette", "der Absender", "die Ansage", "die Autobahn", "die Bank", "die Briefmarke", "das Bürgeramt", "das Dorf", "der Empfänger", "der Kilometer", "das Konto"], bingo: ["der Süden", "der Supermarkt", "überweisen", "der Westen", "Achtung", "der Beamte", "circa", "dauern", "entschuldigen"] },
  ],
  11: [
    { docks: ["die Miete", "die Ordnung", "der Quadratmeter", "das Schlafzimmer", "der Schreibtisch", "die Treppe", "das Treppenhaus", "der Vermieter", "die Warmmiete", "das Wohnheim", "das Wohnzimmer", "die Anmeldung"], bingo: ["braun", "grün", "verkaufen", "besetzt", "breit", "draußen", "teuer – günstig", "hoch", "oben"] },
    { docks: ["der Arm", "das Bein", "die Erkältung", "das Fieber", "das Glück", "das Haar", "der Hals", "der Husten", "das Medikament", "der Mund", "die Nase", "das Ohr"], bingo: ["umziehen", "vermieten", "waschen", "besichtigen", "die Briefmarke", "das Bürgeramt", "das Dorf", "der Empfänger", "gültig"] },
    { docks: ["der Schnupfen", "die Tablette", "das Wartezimmer", "der Zahn", "das Angebot", "die Banane", "der Cent", "die Erdbeere", "die Flasche", "das Geschäft", "das Gewicht", "die Kartoffel"], bingo: ["der Kilometer", "das Konto", "der Norden", "der Ort", "das Rathaus", "die S-Bahn", "die Sehenswürdigkeit", "der Süden", "der Supermarkt"] },
    { docks: ["die Kleidung", "die Kreditkarte", "die Lebensmittel", "die Orange", "das Prozent", "die Waschmaschine", "die Mitte", "die Toilette", "der Absender", "die Ansage", "die Autobahn", "die Bank"], bingo: ["überweisen", "der Westen", "der Bauch", "böse", "empfehlen", "willkommen", "anmelden", "ausfüllen", "bekommen"] },
  ],
  12: [
    { docks: ["das Ticket", "die Vorsicht", "der August", "der Feiertag", "der November", "der Oktober", "der Schluss", "der Wochentag", "der Absender", "die Ansage", "die Autobahn", "die Bank"], bingo: ["der Osten", "abholen", "automatisch", "dort", "durch", "einfach", "gestorben", "lachen", "der Text"] },
    { docks: ["die Briefmarke", "das Bürgeramt", "das Dorf", "der Empfänger", "der Kilometer", "das Konto", "der Norden", "der Ort", "das Rathaus", "die S-Bahn", "die Sehenswürdigkeit", "der Süden"], bingo: ["weiter", "Wie komme ich zum …?", "besser", "der Doktor", "erlauben", "erzählen", "leise", "der Schmerz", "bekannt"] },
    { docks: ["der Supermarkt", "der Westen", "der Bauch", "die Firma", "der Kellner", "der Mechaniker", "die Stelle", "der Teil", "die Aufgabe", "der Beruf", "der Bleistift", "das Ergebnis"], bingo: ["der Bekannte", "gegen", "nächste", "die Reparatur", "an sein", "feiern", "zwischen", "gesund", "abgeben"] },
    { docks: ["das Vorstellungsgespräch", "die Hausaufgabe", "der Hausmann", "die Kellnerin", "die Klasse", "die Köchin", "der Kollege", "der Krankenpfleger", "der Lehrer", "die Lehrerin", "die Lösung", "die Papiere"], bingo: ["anklicken", "ankreuzen", "die Anrede", "der Arbeitsplatz", "die Aussage", "bedeuten", "benutzen", "der Bogen", "der Chef"] },
  ],
  13: [
    { docks: ["der Mund", "die Nase", "das Ohr", "der Schnupfen", "die Tablette", "das Wartezimmer", "der Zahn", "der Eintritt", "der Lieblingsfilm", "der See", "der Verein", "der Bauch"], bingo: ["automatisch", "dort", "durch", "einfach", "gestorben", "lachen", "weiter", "Wie komme ich zum …?", "besser"] },
    { docks: ["das Meer", "der Sommer", "die Aufgabe", "der Beruf", "der Bleistift", "das Ergebnis", "das Vorstellungsgespräch", "die Hausaufgabe", "der Hausmann", "die Kellnerin", "die Klasse", "die Köchin"], bingo: ["erlauben", "erzählen", "leise", "wunderbar", "an sein", "feiern", "zwischen", "zu Fuß", "der Herbst"] },
    { docks: ["der Kollege", "der Krankenpfleger", "der Lehrer", "die Lehrerin", "die Lösung", "die Papiere", "der Schüler", "der Student", "der Unterricht", "die Verkäuferin", "die Zigarette", "der Mittwoch"], bingo: ["kalt", "der Koffer", "der Regenschirm", "übernachten", "das Wetter", "windig", "der Winter", "abgeben", "anklicken"] },
    { docks: ["der Text", "der Doktor", "der Schmerz", "die Halle", "die Anreise", "der Anschluss", "das Datum", "das Doppelzimmer", "der Flughafen", "das Flugzeug", "das Gepäck", "die Halbpension"], bingo: ["ankreuzen", "die Anrede", "der Arbeitsplatz", "die Aussage", "bedeuten", "benutzen", "der Bogen", "der Chef", "drucken"] },
  ],
};

export const WARMUPS: Record<number, Warmup[]> = {
  2: [
    { mech: "bingo", words: ["die USA", "Wie geht's?", "international", "kennenlernen", "sich vorstellen", "ein bisschen", "Herzliche Grüße", "studieren", "Argentinien"] },
    { mech: "docks", words: ["der Mensch", "der Pass", "der Strand", "die Unterschrift", "der Ausweis", "das Geburtsjahr", "der Geburtsort", "die Türkei", "die Ukraine", "der Vorname", "das Ausland", "der Ausländer"] },
    { mech: "gull", words: ["Dänemark", "Danke, gut!", "Russland", "unterschreiben", "Welche?", "Deutschland", "Europa", "geboren", "Guten Abend!", "Kasachstan"] },
  ],
  3: [
    { mech: "gull", words: ["siebzig", "vierzehn", "Wie bitte?", "antworten", "zum Beispiel", "buchstabieren", "dreizehn", "Noch einmal, bitte.", "tausend", "telefonieren"] },
    { mech: "docks", words: ["der Anruf", "die Antwort", "der Liegeplatz", "die Prüfung", "der Raum", "der Anrufbeantworter", "die Handynummer", "die Postleitzahl", "der Computer", "die E-Mail", "das Internet", "die Million"] },
    { mech: "letters", words: ["achtzehn", "erklären", "fünfzehn", "sechzehn", "sechzig"] },
  ],
  4: [
    { mech: "docks", words: ["der Familienname", "das Alter", "der Enkel", "die Enkelin", "der Glückwunsch", "das Rezept", "der Ausweis", "das Geburtsjahr", "der Geburtsort", "die Türkei", "die Ukraine", "der Vorname"] },
    { mech: "bingo", words: ["lieben", "Deutschland", "Europa", "geboren", "Guten Abend!", "Kasachstan", "die USA", "Wie geht's?", "die Eltern", "geschieden", "die Geschwister", "die Großeltern"] },
  ],
  5: [
    { mech: "letters", words: ["antworten", "dreizehn", "tausend", "bestellen", "bitter"] },
    { mech: "gull", words: ["Alles Gute!", "zum Beispiel", "buchstabieren", "Noch einmal, bitte.", "telefonieren", "wiederholen", "schmecken", "riechen", "Zusammen oder getrennt?", "achtzig"] },
    { mech: "docks", words: ["die Pause", "die Butter", "das Glas", "das Obst", "der Saft", "die Speisekarte", "der Anrufbeantworter", "die Handynummer", "die Postleitzahl", "die Birne", "die Cola", "der Döner"] },
  ],
  6: [
    { mech: "bingo", words: ["blau", "ein Kilo", "ein Liter", "gelb", "grau", "kosten", "die Eltern", "geschieden", "die Geschwister", "die Großeltern", "ledig", "verheiratet"] },
    { mech: "docks", words: ["der Bruder", "das Geld", "das T-Shirt", "die Zwiebel", "der Cousin", "die Cousine", "die Ehefrau", "der Ehemann", "die Familie", "der Familienstand", "die Freundin", "die Großmutter"] },
  ],
  7: [
    { mech: "gull", words: ["bezahlen", "anmachen", "beginnen", "einkaufen", "müde", "bestellen", "bitter", "schmecken", "riechen", "Zusammen oder getrennt?"] },
    { mech: "bingo", words: ["aufhören", "ausmachen", "bald", "duschen", "enden", "frühstücken", "gleich", "Wie spät ist es?", "international", "kennenlernen", "sich vorstellen", "aufräumen"] },
    { mech: "docks", words: ["der Mai", "der Moment", "die Birne", "die Cola", "der Döner", "das Fleisch", "das Getränk", "das Hähnchen", "der Käse", "die Milch", "die Rechnung", "der Salat"] },
  ],
  8: [
    { mech: "docks", words: ["der Ausflug", "die Einladung", "der Film", "die Freizeit", "der Garten", "der Park", "der Apfel", "das Geschenk", "das Gramm", "die Größe", "die Gurke", "das Hemd"] },
    { mech: "letters", words: ["lesen", "bar", "kurz", "schwarz", "einladen"] },
    { mech: "bingo", words: ["Tennis spielen", "ein Pfund", "am liebsten", "Fahrrad fahren", "fotografieren", "Fußball spielen", "gefallen", "laufen", "manchmal", "nicht gern", "oft", "Schade!"] },
  ],
  9: [
    { mech: "pairs", words: ["an sein", "feiern", "zwischen", "Dänemark"] },
    { mech: "gull", words: ["ruhig – laut", "die Möbel", "unten", "aufhören", "ausmachen", "bald", "duschen", "enden", "frühstücken", "gleich"] },
    { mech: "docks", words: ["der Nachmittag", "der Vormittag", "die Anzeige", "das Bad", "das Erdgeschoss", "der Kleiderschrank", "der Kühlschrank", "das Sofa", "die Wohnung", "der Anfang", "der April", "der Dezember"] },
  ],
  10: [
    { mech: "bingo", words: ["in der Nähe", "am liebsten", "Fahrrad fahren", "fotografieren", "Fußball spielen", "manchmal", "nicht gern", "oft", "Schade!", "schwimmen", "wandern", "aussteigen"] },
    { mech: "docks", words: ["die Ampel", "der Bahnhof", "der Fahrer", "das Gleis", "die Haltestelle", "der Lkw", "der Stadtplan", "die Post", "die Straße", "die Straßenbahn", "das Taxi", "der Baum"] },
    { mech: "letters", words: ["leider", "tanzen", "einladen", "gefallen", "laufen"] },
  ],
  11: [
    { mech: "gull", words: ["wichtig", "daneben", "hell – dunkel", "legen", "möbliert", "modern", "aussehen", "100 Gramm", "anziehen", "ausziehen"] },
    { mech: "docks", words: ["der Balkon", "das Auge", "der Kopf", "die Praxis", "der Termin", "die Adresse", "das Apartment", "der Aufzug", "der Flur", "die Heizung", "der Herd", "die Kaltmiete"] },
    { mech: "pairs", words: ["fehlen", "geöffnet", "was für ein", "schicken", "der Blick", "die Nebenkosten"] },
  ],
  12: [
    { mech: "docks", words: ["die Apotheke", "die Abfahrt", "die Ankunft", "der Ausgang", "die Auskunft", "das Auto", "der Automat", "der Bahnsteig", "der Eingang", "die Führung", "der Prospekt", "der Schalter"] },
    { mech: "bingo", words: ["besichtigen", "gültig", "überweisen", "böse", "empfehlen", "letzte Woche", "der Schüler", "der Student", "der Unterricht", "die Verkäuferin", "die Information", "die U-Bahn"] },
    { mech: "gull", words: ["aussteigen", "einsteigen", "umsteigen", "aufräumen", "eilig", "fernsehen", "gerade", "pünktlich", "Wie viel Uhr ist es?", "zurzeit"] },
  ],
  13: [
    { mech: "bingo", words: ["böse", "empfehlen", "drücken", "glücklich", "Gute Besserung!", "möglich", "normal", "schlecht", "fertig", "ins Kino gehen", "verstehen", "abholen"] },
    { mech: "gull", words: ["aussehen", "baden", "Freunde treffen", "gewinnen", "Gitarre spielen", "grillen", "lustig", "mitmachen", "Musik hören", "Rad fahren"] },
    { mech: "docks", words: ["der Rücken", "die Versichertenkarte", "die Anmeldung", "der Arm", "das Bein", "die Erkältung", "das Fieber", "das Glück", "das Haar", "der Hals", "der Husten", "das Medikament"] },
  ],
};
