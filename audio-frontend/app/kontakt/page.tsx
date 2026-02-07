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

export default function KontaktPage() {
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
                  Kontakt
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Fragen, Feedback oder Ideen für neue Audio-Tools? Schreib mir
                  gern eine Nachricht.
                </p>
              </header>

              <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                <p>
                  E-Mail:{' '}
                  <a
                    href="mailto:[deine-email@example.com]"
                    className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                  >
                    [deine-email@example.com]
                  </a>
                </p>
                <p>
                  Bitte schildere kurz, wofür du das Tool nutzen möchtest und
                  falls vorhanden, füge einen Link zu deinem Podcast oder
                  Projekt hinzu.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}
