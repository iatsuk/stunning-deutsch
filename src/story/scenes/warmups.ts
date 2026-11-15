import type { Warmup } from "../review.ts";

// Раунд перед главой новой версии (A1-PLAN.md, «Повторение»): одинаковый для всех игроков, поэтому
// индекс полноты засчитывает его игры как часть главы. Слова — из прошлых глав, которым не хватает
// возвращений. Список собирает scripts/a1-returns.mjs --write; собранное можно править руками.
export const WARMUPS: Record<number, Warmup[]> = {
  2: [
    { mech: "bingo", words: ["Kasachstan", "Russland", "die Unterschrift", "der Vorname", "Wie geht's?", "das Ausland", "der Ausländer", "Europa", "die Heimat"] },
    { mech: "docks", words: ["der Pass", "die Sprache", "der Strand", "der Ausweis", "das Geburtsjahr", "der Geburtsort", "die Türkei", "die Ukraine"] },
    { mech: "gull", words: ["Danke, gut!", "Guten Tag!", "Welche?", "wohnen in", "Dänemark", "Deutschland", "geboren", "Guten Abend!"] },
  ],
  3: [
    { mech: "gull", words: ["Wie bitte?", "zum Beispiel", "buchstabieren", "dreizehn", "erklären", "fünfzehn", "Noch einmal, bitte.", "sechzehn"] },
    { mech: "docks", words: ["der Raum", "der Anruf", "die Antwort", "die Handynummer", "die Postleitzahl", "die Prüfung", "die Zahl", "das Ausland"] },
    { mech: "letters", words: ["achtzehn", "siebzehn", "vierzehn", "vierzig"] },
  ],
  4: [
    { mech: "docks", words: ["der Familienname", "der Enkel", "die Enkelin", "der Freund", "der Gast", "der Glückwunsch", "der Junge", "das Rezept"] },
    { mech: "bingo", words: ["lieben", "der Rucksack", "der Ausweis", "Dänemark", "Deutschland", "geboren", "das Geburtsjahr", "der Geburtsort", "Guten Abend!"] },
    { mech: "pairs", words: ["Kasachstan", "Russland", "die Türkei", "die Ukraine", "die Unterschrift"] },
  ],
  5: [
    { mech: "letters", words: ["dreizehn", "erklären", "fünfzehn", "die Prüfung"] },
    { mech: "gull", words: ["Alles Gute!", "zum Beispiel", "buchstabieren", "die Handynummer", "Noch einmal, bitte.", "die Postleitzahl", "sechzehn", "sechzig"] },
    { mech: "docks", words: ["die Pause", "die Butter", "das Obst", "der Reis", "der Saft", "die Speisekarte", "der Anruf", "die Antwort"] },
  ],
  6: [
    { mech: "bingo", words: ["billig", "blau", "ein Kilo", "ein Liter", "gelb", "grau", "kosten", "teuer", "siebzig"] },
    { mech: "pairs", words: ["tausend", "telefonieren", "wiederholen", "die Eltern", "die Familie"] },
    { mech: "docks", words: ["der Bruder", "das Geld", "das T-Shirt", "die Zwiebel", "das Alter", "der Cousin", "die Cousine", "die Ehefrau"] },
  ],
  7: [
    { mech: "gull", words: ["bezahlen", "einkaufen", "frühstücken", "sofort", "Wie geht's?", "geschieden", "die Geschwister", "die Großeltern"] },
    { mech: "bingo", words: ["die Großmutter", "der Großvater", "die Hochzeit", "der Hund", "die Katze", "ledig", "das Mädchen", "die Mutter", "der Onkel"] },
    { mech: "docks", words: ["der Juni", "der Mai", "der Moment", "die Stunde", "der Vorname", "der Ehemann", "der Familienstand", "die Freundin"] },
  ],
  8: [
    { mech: "docks", words: ["der Film", "das Hobby", "die Zahl", "die Hochzeit", "die Katze", "das Mädchen", "die Mutter", "der Onkel"] },
    { mech: "letters", words: ["wollen", "sechzig", "siebzig", "tausend"] },
    { mech: "bingo", words: ["telefonieren", "wiederholen", "geschieden", "ledig", "die Schwester", "der Sohn", "die Tochter", "der Vater", "verheiratet"] },
  ],
  9: [
    { mech: "pairs", words: ["die Geschwister", "die Großeltern", "die Großmutter", "der Großvater", "der Hund"] },
    { mech: "gull", words: ["der Cousin", "die Cousine", "die Ehefrau", "der Ehemann", "die Eltern", "die Familie", "der Familienstand", "die Freundin"] },
    { mech: "docks", words: ["der Nachmittag", "der Vormittag", "die Anzeige", "das Erdgeschoss", "der Kühlschrank", "das Sofa", "die Wohnung", "das Alter"] },
  ],
  10: [
    { mech: "bingo", words: ["rechts", "die Tochter", "der Vater", "verheiratet", "bestellen", "die Birne", "bitter", "die Cola", "der Döner"] },
    { mech: "docks", words: ["die Haltestelle", "der Stadtplan", "die Post", "die Straße", "das Taxi", "der Zug", "die Schwester", "der Sohn"] },
    { mech: "letters", words: ["leider", "tanzen", "geradeaus", "links"] },
  ],
  11: [
    { mech: "gull", words: ["bestellen", "bitter", "schmecken", "das Hähnchen", "der Käse", "die Milch", "die Rechnung", "riechen"] },
    { mech: "docks", words: ["der Balkon", "die Praxis", "die Birne", "die Cola", "der Döner", "das Fleisch", "das Getränk", "das Glas"] },
    { mech: "pairs", words: ["der Salat", "die Wurst", "Zusammen oder getrennt?", "der Apfel", "das Geschenk"] },
  ],
  12: [
    { mech: "docks", words: ["die Apotheke", "der Rücken", "die Versichertenkarte", "der Kellner", "der Mechaniker", "die Stelle", "das Fleisch", "das Getränk"] },
    { mech: "bingo", words: ["die Wurst", "Zusammen oder getrennt?", "der Apfel", "bar", "ein Pfund", "das Geschenk", "das Gramm", "die Größe", "die Gurke"] },
    { mech: "gull", words: ["schmecken", "das Glas", "das Hähnchen", "der Käse", "die Milch", "die Rechnung", "riechen", "der Salat"] },
  ],
};
