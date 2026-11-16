import type { ReactNode } from "react";
import { Footer, Topbar, useTitle } from "../App";
import { LEGAL, careOfAddress } from "../legal";

function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  useTitle(`${title} — Stunning Deutsch`);
  return (
    <>
      <Topbar crumbs={[{ label: title }]} />
      <main className="legal" lang="de">
        <h1>{title}</h1>
        {children}
      </main>
      <Footer />
    </>
  );
}

function Address() {
  return (
    <p>
      {LEGAL.name}
      <br />
      {LEGAL.address.map((line) => (
        <span key={line}>
          {line}
          <br />
        </span>
      ))}
      E-Mail: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
    </p>
  );
}

export function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <Address />
      <p>
        Die genannte Person ist für die Inhalte dieser Website verantwortlich, auch gemäß § 18 Abs. 2 MStV.
        {careOfAddress && " Die c/o-Anschrift dient der Korrespondenz."}
      </p>
      <h2>Hinweis</h2>
      <p>
        Stunning Deutsch ist ein privates, nicht kommerzielles Lernangebot. Es steht in keiner Verbindung zur telc
        gGmbH oder zum Goethe-Institut. „telc“ und „Start Deutsch“ sind Marken ihrer jeweiligen Inhaber.
      </p>
      <h2>Haftung für Links</h2>
      <p>
        Diese Website enthält Links zu externen Websites. Für deren Inhalte sind ausschließlich die jeweiligen
        Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden entsprechende Links umgehend
        entfernt.
      </p>
    </LegalPage>
  );
}

export function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <Address />

      <h2>2. Hosting und Server-Logfiles</h2>
      <p>
        Diese Website wird über GitHub Pages bereitgestellt, einen Dienst der GitHub, Inc., 88 Colin P. Kelly Jr.
        Street, San Francisco, CA 94107, USA. Beim Aufruf der Website verarbeitet GitHub technisch notwendige Daten,
        insbesondere Ihre IP-Adresse, Datum und Uhrzeit des Abrufs, die aufgerufene Datei sowie Browser- und
        Betriebssysteminformationen. Dies ist erforderlich, um die Website auszuliefern und ihre Sicherheit zu
        gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in der
        sicheren und zuverlässigen Bereitstellung der Website.
      </p>
      <p>
        Dabei können Daten in die USA übermittelt werden. GitHub ist nach dem EU-US Data Privacy Framework
        zertifiziert (Angemessenheitsbeschluss der EU-Kommission, Art. 45 DSGVO). Weitere Informationen:{" "}
        <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement">
          GitHub General Privacy Statement
        </a>
        .
      </p>

      <h2>3. Keine Cookies, keine Inhalte Dritter</h2>
      <p>
        Diese Website setzt keine Cookies. Schriftarten und Audiodateien werden vom selben Server geladen; es werden
        keine Inhalte von Drittanbietern eingebunden.
      </p>

      <h2>4. Besuchsstatistik mit GoatCounter</h2>
      <p>
        Mehrere Websites des Betreibers, darunter diese, nutzen unsere eigene GoatCounter-Instanz auf einem OVHcloud-VPS
        in Polen. Die Erfassung erfolgt über stats.deelstuff.com; ein externer Analyseanbieter ist nicht beteiligt. Wir
        erfassen Seitenbesuche, Herkunftsquellen und Browsersprachen, um zu verstehen, wie das Lernangebot genutzt
        wird, und es zu verbessern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO: unser berechtigtes Interesse an
        einer begrenzten Nutzungsstatistik unserer eigenen Websites.
      </p>
      <p>
        Der Zähler übermittelt beim Öffnen der Website ihre Adresse, für diese Website stets die Startseite, und den
        Titel der sichtbaren Seite; der Titel kann den geöffneten Lernbereich nennen. Dazu kommen die Herkunft, gekürzt
        auf die Adresse der vorherigen Website, und technische HTTP-Anfragedaten. URL-Parameter und der Teil der Adresse
        nach „#“ werden nicht übertragen. IP-Adresse und User-Agent
        werden vorübergehend im Arbeitsspeicher verarbeitet, um Sitzungen innerhalb von acht Stunden zu unterscheiden;
        sie werden nicht in der Analysedatenbank gespeichert. Besucher-Cookies und dauerhafte Besucherkennungen werden
        nicht verwendet. Geolokalisierung und die Speicherung einzelner Seitenaufrufe sind deaktiviert. Die
        Aufbewahrungsfrist für aggregierte Statistiken ist auf 730 Tage eingestellt.
      </p>
      <p>
        Der Zähler berücksichtigt Do Not Track und Global Privacy Control. Sie können ihn außerdem für Ihren Browser
        deaktivieren, indem Sie https://stunning-deutsch.deelstuff.com/#analytics-disable in einem neuen Tab öffnen.
        Diese Auswahl bleibt lokal gespeichert, bis Sie die Website-Daten löschen oder die Adresse mit
        #analytics-enable öffnen. Über die Telegram Bot API werden nur zusammengefasste Zahlen, beliebte öffentliche
        Seiten und Diagramme an den privaten Telegram-Chat des Betreibers gesendet, ohne IP-Adressen oder
        Besucherkennungen. Die Statistiken verschiedener Websites werden nicht zu individuellen Profilen verknüpft.
        Weitere Informationen: <a href="https://www.goatcounter.com/help/sessions">GoatCounter — Sessions</a>.
      </p>

      <h2>5. Lokale Speicherung im Browser</h2>
      <p>
        Ihr Lernfortschritt und Ihre Einstellungen werden ausschließlich im lokalen Speicher (localStorage) Ihres
        Browsers abgelegt. Diese Daten verlassen Ihr Gerät nicht und werden nicht an uns übertragen. Dort liegt auch
        Ihre Auswahl, die Besuchsstatistik abzuschalten. Die Speicherung ist für die von Ihnen gewünschte Funktion
        erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Sie können die Daten jederzeit über die Einstellungen Ihres Browsers
        löschen.
      </p>
      <p>
        In der Lernspielübung „Vorlesen“ können Sie sich auf eigenen Wunsch selbst aufnehmen. Der Browser fragt dafür
        nach dem Zugriff auf das Mikrofon. Die Aufnahme bleibt nur im Arbeitsspeicher Ihres Browsers, wird nicht
        gespeichert und nicht übertragen und verschwindet beim Verlassen der Seite.
      </p>

      <h2>6. Externe Links</h2>
      <p>
        Links zu anderen Websites werden erst beim Anklicken aufgerufen. Für die Datenverarbeitung dort ist der
        jeweilige Anbieter verantwortlich.
      </p>

      <h2>7. Kontakt per E-Mail und Post</h2>
      <p>
        Wenn Sie uns per E-Mail oder Brief kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung der Anfrage (Art.
        6 Abs. 1 lit. f DSGVO) und löschen sie, sobald sie dafür nicht mehr erforderlich sind.
      </p>
      {careOfAddress && (
        <p>
          Briefe an die veröffentlichte c/o-Anschrift werden von der COCENTER GmbH als Betreiberin von Anschrift.net
          angenommen und digitalisiert. Der bloße Websitebesuch übermittelt diesem Postdienst keine Daten. Beim Versand
          eines Briefes beachten Sie bitte dessen{" "}
          <a href="https://anschrift.net/datenschutzerklaerung/">Regelungen zur Korrespondenzverarbeitung</a>.
        </p>
      )}

      <h2>8. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung
        der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen die Verarbeitung (Art. 21).
        Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO).
      </p>

      <p className="legal-updated">Stand: {LEGAL.updated}</p>
    </LegalPage>
  );
}
