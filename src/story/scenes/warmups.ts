import type { Warmup } from "../review.ts";

// Раунд перед главой новой версии (A1-PLAN.md, «Повторение»): одинаковый для всех игроков, поэтому
// индекс полноты засчитывает его игры как часть главы. Слова — из прошлых глав, которым не хватает
// возвращений. Список собирает scripts/a1-returns.mjs --write; собранное можно править руками.
export const WARMUPS: Record<number, Warmup[]> = {
  2: [
    { mech: "bingo", words: ["Wie geht's?", "Europa", "die USA", "die Heimat", "international", "kennenlernen", "der Mensch", "die Schweiz", "unterschreiben", "sich vorstellen"] },
    { mech: "docks", words: ["der Pass", "die Sprache", "der Strand", "der Ausweis", "das Geburtsjahr", "der Geburtsort", "die Türkei", "die Ukraine", "die Unterschrift", "der Vorname", "das Ausland", "der Ausländer"] },
    { mech: "gull", words: ["Dänemark", "Danke, gut!", "Guten Tag!", "Welche?", "wohnen in", "Deutschland", "geboren", "Guten Abend!", "Kasachstan", "Russland"] },
  ],
  3: [
    { mech: "gull", words: ["Wie bitte?", "zum Beispiel", "buchstabieren", "erklären", "fünfzehn", "Noch einmal, bitte.", "sechzehn", "sechzig", "siebzig", "tausend"] },
    { mech: "docks", words: ["der Raum", "der Anruf", "die Antwort", "die Handynummer", "die Postleitzahl", "die Prüfung", "die Zahl", "das Ausland", "der Ausländer", "die Heimat", "der Mensch", "die Schweiz"] },
    { mech: "letters", words: ["achtzehn", "siebzehn", "vierzehn", "vierzig", "dreizehn"] },
  ],
  4: [
    { mech: "docks", words: ["der Familienname", "der Enkel", "die Enkelin", "der Glückwunsch", "der Junge", "das Rezept", "der Rucksack", "der Ausweis", "das Geburtsjahr", "der Geburtsort", "die Türkei", "die Ukraine"] },
    { mech: "bingo", words: ["lieben", "Deutschland", "geboren", "Guten Abend!", "Kasachstan", "Russland", "die Unterschrift", "der Vorname", "Wie geht's?", "das Alter", "der Cousin", "die Cousine"] },
    { mech: "pairs", words: ["die Eltern", "die Familie", "die Freundin", "die Geschwister", "die Großeltern", "die Großmutter"] },
  ],
  5: [
    { mech: "letters", words: ["dreizehn", "erklären", "fünfzehn", "sechzehn", "sechzig"] },
    { mech: "gull", words: ["Alles Gute!", "zum Beispiel", "buchstabieren", "Noch einmal, bitte.", "siebzig", "tausend", "telefonieren", "wiederholen", "die Hochzeit", "die Katze"] },
    { mech: "docks", words: ["die Pause", "die Butter", "das Obst", "der Reis", "der Saft", "die Speisekarte", "der Anruf", "die Antwort", "die Handynummer", "die Postleitzahl", "die Prüfung", "die Zahl"] },
  ],
  6: [
    { mech: "bingo", words: ["blau", "ein Kilo", "ein Liter", "gelb", "grau", "kosten", "die Eltern", "geschieden", "die Geschwister", "die Großeltern", "die Großmutter", "der Großvater"] },
    { mech: "pairs", words: ["der Hund", "das Mädchen", "die Mutter", "der Onkel", "die Schwester", "der Sohn"] },
    { mech: "docks", words: ["der Bruder", "das Geld", "das T-Shirt", "die Zwiebel", "das Alter", "der Cousin", "die Cousine", "die Ehefrau", "der Ehemann", "die Familie", "der Familienstand", "die Freundin"] },
  ],
  7: [
    { mech: "gull", words: ["bezahlen", "einkaufen", "sofort", "ledig", "verheiratet", "bestellen", "bitter", "schmecken", "das Hähnchen", "der Käse"] },
    { mech: "bingo", words: ["die Milch", "die Rechnung", "riechen", "der Salat", "die Wurst", "Zusammen oder getrennt?", "Europa", "die USA", "der Anfang", "anmachen", "der April", "aufhören"] },
    { mech: "docks", words: ["der Juni", "der Mai", "der Moment", "die Stunde", "die Tochter", "der Vater", "die Birne", "die Cola", "der Döner", "das Fleisch", "das Getränk", "das Glas"] },
  ],
  8: [
    { mech: "docks", words: ["der Film", "das Hobby", "der Apfel", "das Geschenk", "die Einladung", "das Gramm", "die Größe", "die Gurke", "das Hemd", "die Hose", "die Kasse", "das Kleid"] },
    { mech: "letters", words: ["wollen", "bar", "der Kunde", "der Mantel", "der Preis"] },
    { mech: "bingo", words: ["telefonieren", "wiederholen", "ein Pfund", "der Pullover", "der Rock", "der Schuh", "schwarz", "ausmachen", "der Dezember", "die Dusche", "duschen", "der Februar"] },
  ],
  9: [
    { mech: "pairs", words: ["der Vater", "verheiratet", "das Bad", "der Anfang", "anmachen", "der April"] },
    { mech: "gull", words: ["geschieden", "der Hund", "die Katze", "ledig", "das Mädchen", "die Mutter", "der Onkel", "die Schwester", "der Sohn", "die Tochter"] },
    { mech: "docks", words: ["der Nachmittag", "der Vormittag", "die Anzeige", "das Erdgeschoss", "der Kühlschrank", "das Sofa", "die Wohnung", "die Ehefrau", "der Ehemann", "der Familienstand", "der Großvater", "die Hochzeit"] },
  ],
  10: [
    { mech: "bingo", words: ["bestellen", "bitter", "schmecken", "das Hähnchen", "der Käse", "die Milch", "die Rechnung", "riechen", "der Salat", "die Wurst", "Zusammen oder getrennt?", "der Feierabend"] },
    { mech: "docks", words: ["die Haltestelle", "der Stadtplan", "die Post", "die Straße", "das Taxi", "der Zug", "die Birne", "die Cola", "der Döner", "das Fleisch", "das Getränk", "das Glas"] },
    { mech: "letters", words: ["leider", "tanzen", "geradeaus", "links", "rechts"] },
  ],
  11: [
    { mech: "gull", words: ["ruhig – laut", "bar", "ein Pfund", "der Mantel", "der Preis", "der Pullover", "der Rock", "der Schuh", "schwarz", "frühstücken"] },
    { mech: "docks", words: ["der Balkon", "die Praxis", "der Apfel", "das Geschenk", "das Gramm", "die Größe", "die Gurke", "das Hemd", "die Hose", "die Kasse", "das Kleid", "der Kunde"] },
    { mech: "pairs", words: ["der Januar", "der März", "müde", "die Sekunde", "der September", "Wie spät ist es?"] },
  ],
  12: [
    { mech: "docks", words: ["die Apotheke", "der Rücken", "die Versichertenkarte", "der Kellner", "der Mechaniker", "die Stelle", "der Dezember", "die Dusche", "der Februar", "der Feierabend", "der Januar", "der März"] },
    { mech: "bingo", words: ["der Ausflug", "der Baum", "das Bild", "die Blume", "die Disco", "einladen", "Fahrrad fahren", "das Feuer", "fotografieren", "die Freizeit", "Fußball spielen", "der Garten"] },
    { mech: "gull", words: ["wehtun", "aufhören", "ausmachen", "duschen", "frühstücken", "müde", "die Sekunde", "der September", "Wie spät ist es?", "am liebsten"] },
  ],
};
