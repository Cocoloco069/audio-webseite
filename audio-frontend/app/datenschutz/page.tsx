'use client';


import { useEffect, useState } from 'react';
import {
  Lang,
  TFunc,
  supportedLangs,
  translations,
} from '../i18n/translations';
import BrandHeader from '../components/BrandHeader';
import Footer from '../components/Footer';

export default function DatenschutzPage() {
  const [lang, setLang] = useState<Lang>('de');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('audioToolsLang');
      if (stored && supportedLangs.includes(stored as Lang)) {
        setLang(stored as Lang);
      }
    }
  }, []);

  const t: TFunc = (key, vars) => {
    let text = translations[lang][key];
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-indigo-950 text-slate-50 flex flex-col relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-4rem] h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
      </div>

      <BrandHeader lang={lang} setLang={setLang} t={t} />


      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-5 sm:px-6 sm:py-10">
        <div className="w-full max-w-3xl">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-500/40 via-sky-500/20 to-transparent p-[1px] shadow-2xl shadow-indigo-950/60">
            <section className="bg-slate-900/95 rounded-3xl border border-slate-800/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10 space-y-5 sm:space-y-7">
              <header className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  Datenschutzerklärung
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Informationen zur Verarbeitung personenbezogener Daten
                </p>
              </header>

              <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
                <section className="space-y-1.5">
                  <h2 className="text-sm font-semibold text-slate-100">
                    1. Verantwortlicher
                  </h2>
                  <p>
                    Verantwortlich für die Datenverarbeitung auf dieser Website
                    ist:
                    <br />
                    <br />
                    [Dein Name oder Firmenname]
                    <br />
                    [Straße und Hausnummer]
                    <br />
                    [PLZ] [Ort]
                    <br />
                    [Land]
                    <br />
                    E-Mail:{' '}
                    <a
                      href="mailto:[deine-email@example.com]"
                      className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                    >
                      [deine-email@example.com]
                    </a>
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h2 className="text-sm font-semibold text-slate-100">
                    2. Zugriffsdaten (Server-Logfiles)
                  </h2>
                  <p>
                    Beim Aufruf dieser Website werden durch den Hosting-Anbieter
                    automatisch Informationen in sogenannten Server-Logfiles
                    gespeichert. Zu diesen Daten gehören in der Regel:
                  </p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>IP-Adresse des anfragenden Geräts (gekürzt/anonymisiert, wenn möglich)</li>
                    <li>Datum und Uhrzeit des Zugriffs</li>
                    <li>aufgerufene URL und HTTP-Statuscode</li>
                    <li>übertragene Datenmenge</li>
                    <li>
                      Browsertyp, Browserversion und verwendetes Betriebssystem
                    </li>
                  </ul>
                  <p>
                    Diese Daten werden ausschließlich zur Sicherstellung eines
                    störungsfreien Betriebs der Website sowie zur Verbesserung
                    des Angebots ausgewertet. Eine Zusammenführung dieser Daten
                    mit anderen Datenquellen findet nicht statt.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h2 className="text-sm font-semibold text-slate-100">
                    3. Verarbeitung von hochgeladenen Audiodateien
                  </h2>
                  <p>
                    Für die Nutzung des Silence-Remover-Tools kannst du
                    Audiodateien hochladen. Diese Dateien werden ausschließlich
                    zu dem Zweck verarbeitet, dir die bearbeitete Audiodatei
                    bereitzustellen.
                  </p>
                  <p>
                    Die Verarbeitung erfolgt serverseitig. Die Dateien werden
                    nur so lange gespeichert, wie es für die Durchführung der
                    Bearbeitung technisch erforderlich ist, und anschließend
                    automatisiert gelöscht. Es erfolgt keine Auswertung der
                    Inhalte zu anderen Zwecken (z. B. Profilbildung oder
                    Werbung).
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h2 className="text-sm font-semibold text-slate-100">
                    4. Cookies und Tracking
                  </h2>
                  <p>
                    Aktuell werden auf dieser Website keine Cookies eingesetzt,
                    die eine personenbeziehbare Auswertung deines Nutzungsverhaltens
                    ermöglichen (z. B. Tracking- oder Analyse-Cookies).
                  </p>
                  <p>
                    Technisch notwendige Cookies können eingesetzt werden, um
                    grundlegende Funktionen bereitzustellen (z. B.
                    Spracheinstellungen). Diese Cookies speichern keine
                    persönlichen Profile.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h2 className="text-sm font-semibold text-slate-100">
                    5. Rechtsgrundlagen der Verarbeitung
                  </h2>
                  <p>
                    Soweit die Verarbeitung auf Grundlage der EU‑Datenschutz‑
                    Grundverordnung (DSGVO) erfolgt, stützt sie sich insbesondere auf:
                  </p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>
                      Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), soweit die
                      Verarbeitung zur Bereitstellung der Funktionen dieser
                      Website erforderlich ist.
                    </li>
                    <li>
                      Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) für
                      die technisch notwendige Speicherung von Logfiles und die
                      Sicherstellung der Systemsicherheit.
                    </li>
                  </ul>
                </section>

                <section className="space-y-1.5">
                  <h2 className="text-sm font-semibold text-slate-100">
                    6. Speicherdauer
                  </h2>
                  <p>
                    Personenbezogene Daten werden nur so lange gespeichert, wie
                    es für die genannten Zwecke erforderlich ist oder wie es
                    gesetzliche Aufbewahrungsfristen vorsehen. Server-Logfiles
                    werden in der Regel nach einer angemessenen Frist
                    automatisch gelöscht, sofern keine sicherheitsrelevante
                    Auswertung erforderlich ist.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h2 className="text-sm font-semibold text-slate-100">
                    7. Deine Rechte
                  </h2>
                  <p>Dir stehen im Rahmen der geltenden Datenschutzgesetze insbesondere folgende Rechte zu:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Recht auf Auskunft über die verarbeiteten personenbezogenen Daten</li>
                    <li>Recht auf Berichtigung unrichtiger Daten</li>
                    <li>Recht auf Löschung („Recht auf Vergessenwerden“)</li>
                    <li>Recht auf Einschränkung der Verarbeitung</li>
                    <li>Recht auf Datenübertragbarkeit</li>
                    <li>
                      Recht auf Widerspruch gegen die Verarbeitung, soweit diese
                      auf Art. 6 Abs. 1 lit. f DSGVO beruht
                    </li>
                  </ul>
                  <p>
                    Zur Ausübung deiner Rechte kannst du dich jederzeit an die
                    oben genannte Kontaktadresse wenden.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h2 className="text-sm font-semibold text-slate-100">
                    8. Beschwerderecht bei der Aufsichtsbehörde
                  </h2>
                  <p>
                    Wenn du der Ansicht bist, dass die Verarbeitung der dich
                    betreffenden personenbezogenen Daten gegen die DSGVO
                    verstößt, hast du das Recht auf Beschwerde bei einer
                    Datenschutzaufsichtsbehörde, insbesondere in dem Mitgliedstaat
                    deines Aufenthaltsorts, deines Arbeitsplatzes oder des Orts
                    des mutmaßlichen Verstoßes.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h2 className="text-sm font-semibold text-slate-100">
                    9. Änderungen dieser Datenschutzerklärung
                  </h2>
                  <p>
                    Ich behalte mir vor, diese Datenschutzerklärung bei Bedarf
                    anzupassen, damit sie stets den aktuellen rechtlichen
                    Anforderungen entspricht oder um Änderungen meiner Dienste
                    in der Erklärung umzusetzen. Für deinen erneuten Besuch gilt
                    dann die jeweils aktuelle Fassung.
                  </p>
                </section>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}
