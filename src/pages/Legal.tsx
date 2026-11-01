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

      <h2>3. Keine Cookies, keine Analyse</h2>
      <p>
        Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Dienste. Schriftarten und
        Audiodateien werden vom selben Server geladen; es werden keine Inhalte von Drittanbietern eingebunden.
      </p>

      <h2>4. Lokale Speicherung im Browser</h2>
      <p>
        Ihr Lernfortschritt und Ihre Einstellungen werden ausschließlich im lokalen Speicher (localStorage) Ihres
        Browsers abgelegt. Diese Daten verlassen Ihr Gerät nicht und werden nicht an uns übertragen. Die Speicherung
        ist für die von Ihnen gewünschte Funktion erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Sie können die Daten
        jederzeit über die Einstellungen Ihres Browsers löschen.
      </p>
      <p>
        In der Lernspielübung „Vorlesen“ können Sie sich auf eigenen Wunsch selbst aufnehmen. Der Browser fragt dafür
        nach dem Zugriff auf das Mikrofon. Die Aufnahme bleibt nur im Arbeitsspeicher Ihres Browsers, wird nicht
        gespeichert und nicht übertragen und verschwindet beim Verlassen der Seite.
      </p>

      <h2>5. Externe Links</h2>
      <p>
        Links zu anderen Websites werden erst beim Anklicken aufgerufen. Für die Datenverarbeitung dort ist der
        jeweilige Anbieter verantwortlich.
      </p>

      <h2>6. Kontakt per E-Mail und Post</h2>
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

      <h2>7. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung
        der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen die Verarbeitung (Art. 21).
        Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO).
      </p>

      <p className="legal-updated">Stand: {LEGAL.updated}</p>
    </LegalPage>
  );
}
