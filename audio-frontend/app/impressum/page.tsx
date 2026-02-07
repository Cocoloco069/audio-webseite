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

export default function ImpressumPage() {
  const [lang, setLang] = useState<Lang>('de');

  // Sprache laden (wie auf der Startseite)
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
                  Impressum
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Angaben gemäß § 5 TMG
                </p>
              </header>

              <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
                <section className="space-y-1.5">
                  <h2 className="text-sm font-semibold text-slate-100">
                    Diensteanbieter
                  </h2>
                  <p>
                    [Dein Name oder Firmenname]
                    <br />
                    [Straße und Hausnummer]
                    <br />
                    [PLZ] [Ort]
                    <br />
                    [Land]
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h2 className="text-sm font-semibold text-slate-100">
                    Kontakt
                  </h2>
                  <p>
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
                    Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                  </h2>
                  <p>
                    [Name der verantwortlichen Person]
                    <br />
                    [Anschrift wie oben]
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h2 className="text-sm font-semibold text-slate-100">
                    Haftung für Inhalte
                  </h2>
                  <p>
                    Die Inhalte dieser Website wurden mit größter Sorgfalt
                    erstellt. Für die Richtigkeit, Vollständigkeit und
                    Aktualität der Inhalte kann ich jedoch keine Gewähr
                    übernehmen. Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG
                    für eigene Inhalte auf diesen Seiten nach den allgemeinen
                    Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als
                    Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                    gespeicherte fremde Informationen zu überwachen oder nach
                    Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                    hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
                    Nutzung von Informationen nach den allgemeinen Gesetzen
                    bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
                    jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
                    Rechtsverletzung möglich. Bei Bekanntwerden von
                    entsprechenden Rechtsverletzungen werde ich diese Inhalte
                    umgehend entfernen.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h2 className="text-sm font-semibold text-slate-100">
                    Haftung für Links
                  </h2>
                  <p>
                    Dieses Angebot enthält ggf. Links zu externen Websites
                    Dritter, auf deren Inhalte ich keinen Einfluss habe. Daher
                    kann ich für diese fremden Inhalte auch keine Gewähr
                    übernehmen. Für die Inhalte der verlinkten Seiten ist stets
                    der jeweilige Anbieter oder Betreiber der Seiten
                    verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt
                    der Verlinkung auf mögliche Rechtsverstöße überprüft.
                    Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung
                    nicht erkennbar. Eine permanente inhaltliche Kontrolle der
                    verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
                    einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
                    Rechtsverletzungen werde ich derartige Links umgehend
                    entfernen.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h2 className="text-sm font-semibold text-slate-100">
                    Urheberrecht
                  </h2>
                  <p>
                    Die durch den Seitenbetreiber erstellten Inhalte und Werke
                    auf diesen Seiten unterliegen dem deutschen Urheberrecht.
                    Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                    der Verwertung außerhalb der Grenzen des Urheberrechtes
                    bedürfen der schriftlichen Zustimmung des jeweiligen Autors
                    bzw. Erstellers. Downloads und Kopien dieser Seite sind nur
                    für den privaten, nicht kommerziellen Gebrauch gestattet.
                    Soweit die Inhalte auf dieser Seite nicht vom Betreiber
                    erstellt wurden, werden die Urheberrechte Dritter beachtet.
                    Insbesondere werden Inhalte Dritter als solche
                    gekennzeichnet. Solltest du trotzdem auf eine
                    Urheberrechtsverletzung aufmerksam werden, bitte ich um
                    einen entsprechenden Hinweis. Bei Bekanntwerden von
                    Rechtsverletzungen werde ich derartige Inhalte umgehend
                    entfernen.
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
