// app/datenschutz/page.tsx
'use client';

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Datenschutzerklärung</h1>

      <section className="space-y-2 mb-6">
        <h2 className="text-xl font-semibold">1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          Max Mustermann
          <br />
          Musterstraße 1
          <br />
          12345 Musterstadt
          <br />
          Deutschland
          <br />
          E-Mail:{' '}
          <a href="mailto:info@example.com" className="text-blue-600 underline">
            info@example.com
          </a>
        </p>
      </section>

      <section className="space-y-2 mb-6">
        <h2 className="text-xl font-semibold">2. Bereitstellung der Website und Server-Logfiles</h2>
        <p>
          Beim Aufruf dieser Website werden durch den Webserver automatisch Informationen erfasst,
          die Ihr Browser übermittelt. Dazu gehören insbesondere IP-Adresse, Datum und Uhrzeit des
          Abrufs, aufgerufene URL, übertragene Datenmenge, Referrer-URL, verwendeter Browser und
          Betriebssystem.
        </p>
        <p>
          Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zur
          Sicherstellung des technischen Betriebs, zur Fehleranalyse und zum Schutz vor
          Missbrauchs- bzw. Angriffsversuchen.
        </p>
        <p>
          Die Server-Logfiles werden in der Regel nur kurzfristig gespeichert und anschließend
          gelöscht, soweit keine längere Aufbewahrung aus Sicherheits- oder Beweisgründen
          erforderlich ist.
        </p>
      </section>

      <section className="space-y-2 mb-6">
        <h2 className="text-xl font-semibold">3. Verarbeitung hochgeladener Audiodateien</h2>
        <p>
          Für die Nutzung des Audio-Stille-Entferners können Sie Audiodateien hochladen. Die
          verarbeiteten Dateien werden ausschließlich zur technischen Durchführung der
          gewünschten Bearbeitung verwendet.
        </p>
        <p>
          Die Dateien werden nach Abschluss der Verarbeitung bzw. innerhalb eines kurzen,
          technisch erforderlichen Zeitraums automatisch gelöscht und nicht dauerhaft gespeichert
          oder zu anderen Zwecken genutzt.
        </p>
        <p>
          Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO (Erfüllung eines
          Vertrags bzw. vorvertraglicher Maßnahmen).
        </p>
      </section>

      <section className="space-y-2 mb-6">
        <h2 className="text-xl font-semibold">4. Empfänger der Daten / Auftragsverarbeiter</h2>
        <p>
          Zum Hosting und zur Bereitstellung dieser Anwendung werden Dienste von Drittanbietern
          genutzt (z.&nbsp;B. Vercel für das Frontend und Railway für das Backend). Mit diesen
          Dienstleistern bestehen Auftragsverarbeitungsverträge gemäß Art. 28 DSGVO, soweit
          erforderlich.
        </p>
      </section>

      <section className="space-y-2 mb-6">
        <h2 className="text-xl font-semibold">5. Speicherdauer</h2>
        <p>
          Soweit in dieser Erklärung nicht anders angegeben, werden personenbezogene Daten nur so
          lange gespeichert, wie es für die jeweiligen Zwecke erforderlich ist oder wie es
          gesetzliche Aufbewahrungsfristen vorsehen.
        </p>
      </section>

      <section className="space-y-2 mb-6">
        <h2 className="text-xl font-semibold">6. Ihre Rechte</h2>
        <p>
          Sie haben im Rahmen der gesetzlichen Vorgaben das Recht auf Auskunft, Berichtigung,
          Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen
          bestimmte Verarbeitungen personenbezogener Daten.
        </p>
        <p>
          Hierzu sowie zu weiteren Fragen zum Datenschutz können Sie sich jederzeit an die oben
          genannten Kontaktdaten wenden.
        </p>
      </section>

      <section className="space-y-2 text-sm text-gray-600">
        <h2 className="text-lg font-semibold">7. Hinweis</h2>
        <p>
          Diese Datenschutzerklärung stellt keine Rechtsberatung dar. Für eine rechtssichere
          Ausgestaltung sollten Sie im Zweifel eine Rechtsanwältin oder einen spezialisierten
          Dienstleister konsultieren.
        </p>
      </section>
    </main>
  );
}
