'use client';

import { useState, useEffect } from 'react';
import {
  Lang,
  TFunc,
  supportedLangs,
  translations,
} from './i18n/translations';
import { ToastState, Tool } from './types/ui';

import BrandHeader from './components/BrandHeader';
import ToolTabs from './components/ToolTabs';
import Footer from './components/Footer';
import Toast from './components/Toast';

import SilenceRemoverTool from './features/silence/SilenceRemoverTool';
import SoonContent from './features/soon/SoonContent';

export default function Home() {
  const [lang, setLang] = useState<Lang>('de');
  const [activeTool, setActiveTool] = useState<Tool>('silence');
  const [toast, setToast] = useState<ToastState>(null);
  const [isIOS, setIsIOS] = useState(false);

  // Sprache laden (localStorage -> Browser)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('audioToolsLang');
      if (stored && supportedLangs.includes(stored as Lang)) {
        setLang(stored as Lang);
      } else {
        const navLangs =
          (navigator.languages && navigator.languages.length
            ? navigator.languages
            : [navigator.language]) || [];

        const normalized = navLangs
          .filter(Boolean)
          .map((l) => l.toLowerCase())
          .map((l) => (l.includes('-') ? l.split('-')[0] : l));

        const found = normalized.find((code) =>
          supportedLangs.includes(code as Lang),
        );

        setLang((found as Lang) || 'en');
      }

      const ua = navigator.userAgent || '';
      setIsIOS(/iPad|iPhone|iPod/.test(ua));
    }
  }, []);

  // Sprache speichern
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('audioToolsLang', lang);
    }
  }, [lang]);

  // Toast Auto-Hide
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(id);
  }, [toast]);

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

      <BrandHeader lang={lang} setLang={setLang} />

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-5 sm:px-6 sm:py-10">
        <div className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl">
          <div className="mb-4 sm:mb-6 text-center">
            <span className="inline-flex items-center rounded-full bg-slate-900/80 border border-slate-700/80 px-3 py-1 text-[11px] sm:text-xs font-medium text-slate-300 shadow-sm shadow-slate-900/60">
              {t('badge')}
            </span>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-indigo-500/40 via-sky-500/20 to-transparent p-[1px] shadow-2xl shadow-indigo-950/60 transform-gpu transition-transform duration-300 md:hover:scale-[1.01]">
            <section className="bg-slate-900/95 rounded-3xl border border-slate-800/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-7">
              <ToolTabs
                activeTool={activeTool}
                setActiveTool={setActiveTool}
                t={t}
              />

              {activeTool === 'silence' ? (
                <>
                  <header className="space-y-2 text-center max-w-2xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                      {t('title')}
                    </h1>
                    <p className="text-sm sm:text-base text-slate-300">
                      {t('subtitle')}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400">
                      {t('intro')}
                    </p>
                  </header>

                  <SilenceRemoverTool
                    t={t}
                    isIOS={isIOS}
                    onToast={setToast}
                  />
                </>
              ) : (
                <SoonContent t={t} onBack={() => setActiveTool('silence')} />
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer t={t} />

      {toast && <Toast toast={toast} />}
    </div>
  );
}
