'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Lang,
  TFunc,
  supportedLangs,
  translations,
} from './i18n/translations';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

type ToastState = { message: string; type: 'success' | 'error' } | null;
type Tool = 'silence' | 'soon';

function buildEditedFileName(originalName: string): string {
  const dotIndex = originalName.lastIndexOf('.');
  if (dotIndex === -1) {
    return `${originalName}_edited`;
  }
  const base = originalName.substring(0, dotIndex);
  const ext = originalName.substring(dotIndex);
  return `${base}_edited${ext}`;
}

/* ----------------------- Hauptseite ----------------------- */

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

/* --------------------- Unter-Komponenten --------------------- */

function BrandHeader({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <header className="relative z-10 px-4 pt-4 sm:px-8 sm:pt-6">
      <div className="flex w-full items-center gap-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-100">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-[13px] shadow-md shadow-indigo-700/60">
            🎧
          </span>
          <span className="tracking-tight">Audio Tools</span>
        </div>
        <div className="flex-1 flex justify-center sm:justify-end">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 border border-slate-800/80 px-2.5 py-1 text-[10px] sm:text-[11px] text-slate-300 shadow-sm shadow-slate-900/60">
            <span>Language</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="bg-transparent text-slate-100 text-[10px] sm:text-[11px] border border-slate-700 rounded-full px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="it">Italiano</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

function ToolTabs({
  activeTool,
  setActiveTool,
  t,
}: {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  t: TFunc;
}) {
  return (
    <div className="flex justify-center mb-3 sm:mb-4">
      <div className="inline-flex items-center rounded-full bg-slate-900/80 border border-slate-800/80 p-1 text-[11px] sm:text-xs">
        <button
          type="button"
          onClick={() => setActiveTool('silence')}
          className={
            'px-3 sm:px-4 py-1 rounded-full font-medium transition-colors ' +
            (activeTool === 'silence'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/60'
              : 'text-slate-300 hover:text-slate-50 hover:bg-slate-800/80')
          }
        >
          {t('tabSilence')}
        </button>
        <button
          type="button"
          onClick={() => setActiveTool('soon')}
          className={
            'px-3 sm:px-4 py-1 rounded-full font-medium transition-colors ' +
            (activeTool === 'soon'
              ? 'bg-slate-800 text-slate-50 shadow-sm shadow-slate-900/50'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80')
          }
        >
          {t('tabSoon')}
        </button>
      </div>
    </div>
  );
}

function SilenceRemoverTool({
  t,
  isIOS,
  onToast,
}: {
  t: TFunc;
  isIOS: boolean;
  onToast: (toast: ToastState) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [outputFileName, setOutputFileName] = useState<string>('edited.mp3');
  const [silenceReducePercent, setSilenceReducePercent] = useState(85);
  const keepRatio = (100 - silenceReducePercent) / 100;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (selected: File | null) => {
    setDownloadUrl(null);
    setError(null);

    if (!selected) {
      setFile(null);
      return;
    }

    if (!selected.type.startsWith('audio/')) {
      setFile(null);
      const msg = t('errorNotAudio');
      setError(msg);
      onToast({ type: 'error', message: msg });
      return;
    }

    const maxSizeMb = 50;
    const sizeMb = selected.size / (1024 * 1024);

    if (sizeMb > maxSizeMb) {
      setFile(null);
      const msg = t('errorTooBig', {
        size: sizeMb.toFixed(1),
        max: String(maxSizeMb),
      });
      setError(msg);
      onToast({ type: 'error', message: msg });
      return;
    }

    setFile(selected);
    setOutputFileName(buildEditedFileName(selected.name));
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setDownloadUrl(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const url = `${API_BASE_URL}/process?keep_ratio=${keepRatio}&silence_thresh=-40&min_silence_len=500`;

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Serverfehler (${response.status}): ${text}`);
      }

      const blob = await response.blob();
      const urlObject = window.URL.createObjectURL(blob);
      setDownloadUrl(urlObject);
      onToast({ type: 'success', message: t('successTitle') });
    } catch (e: any) {
      console.error(e);
      const msg = e.message || t('errorGeneric');
      setError(msg);
      onToast({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="border border-dashed border-slate-700 rounded-2xl bg-slate-900/70 p-5 sm:p-6 text-center">
        <label className="block text-sm font-medium text-slate-200 mb-3">
          {t('uploadLabel')}
        </label>

        <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-600/50 hover:bg-indigo-500 hover:shadow-indigo-400/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors"
          >
            {t('uploadButton')}
          </button>
          <span className="text-xs sm:text-sm text-slate-300 truncate max-w-[240px] sm:max-w-[280px]">
            {file ? `${t('selectedFile')}: ${file.name}` : t('uploadNoFile')}
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        />

        <p className="mt-3 text-xs text-slate-400">{t('uploadHint')}</p>

        {isIOS && (
          <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/40 text-amber-100 text-xs rounded-lg text-left">
            {t('iosHint')}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="font-medium text-slate-200">{t('reduceLabel')}</span>
          <span className="font-semibold text-indigo-400">
            {silenceReducePercent}%
          </span>
        </div>
        <input
          type="range"
          min={70}
          max={95}
          value={silenceReducePercent}
          onChange={(e) => setSilenceReducePercent(Number(e.target.value))}
          className="w-full accent-indigo-500 hover:accent-indigo-400 focus:accent-indigo-400"
        />
        <p className="text-xs text-slate-400">
          {t('reduceExplanation', {
            percent: (keepRatio * 100).toFixed(0),
          })}
        </p>
      </div>

      <div className="pt-1 sm:pt-2">
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm sm:text-base font-medium text-white shadow-xl shadow-indigo-700/50 disabled:bg-slate-700 disabled:shadow-none hover:bg-indigo-500 hover:shadow-indigo-400/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors"
        >
          {loading && (
            <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-transparent" />
          )}
          {loading ? t('buttonLoading') : t('buttonIdle')}
        </button>
      </div>

      {error && (
        <div className="mt-1 p-3 rounded-lg bg-red-500/10 border border-red-500/40 text-xs text-red-100">
          {error}
        </div>
      )}

      {downloadUrl && (
        <div className="mt-2 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/40">
          <p className="mb-2 text-sm text-emerald-100">{t('successTitle')}</p>
          <a
            href={downloadUrl}
            download={outputFileName}
            className="inline-flex items-center text-sm font-medium text-emerald-200 hover:text-emerald-100 underline-offset-2 hover:underline focus:outline-none focus:ring-1 focus:ring-emerald-300/70 rounded-sm"
          >
            {t('successLink')}
          </a>
        </div>
      )}
    </div>
  );
}

function SoonContent({ t, onBack }: { t: TFunc; onBack: () => void }) {
  return (
    <div className="space-y-4 sm:space-y-5 text-center max-w-2xl mx-auto">
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
          {t('soonTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">{t('soonBody')}</p>
      </header>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-100 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <span>←</span>
          <span>{t('tabSilence')}</span>
        </button>
      </div>
    </div>
  );
}

function Footer({ t }: { t: TFunc }) {
  return (
    <footer className="relative z-10 px-4 sm:px-8 pb-5 sm:pb-6 pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-900/80 bg-slate-950/80 backdrop-blur-sm">
      <span>© {new Date().getFullYear()} Audio Silence Remover</span>
      <div className="space-x-4">
        <a
          href="/impressum"
          className="hover:text-slate-300 transition-colors"
        >
          {t('footerImprint')}
        </a>
        <a
          href="/datenschutz"
          className="hover:text-slate-300 transition-colors"
        >
          {t('footerPrivacy')}
        </a>
      </div>
    </footer>
  );
}

function Toast({ toast }: { toast: ToastState }) {
  if (!toast) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`max-w-xs rounded-lg px-4 py-3 text-xs shadow-lg border ${
          toast.type === 'success'
            ? 'bg-emerald-500/90 border-emerald-300 text-emerald-950'
            : 'bg-red-500/90 border-red-300 text-red-950'
        }`}
      >
        {toast.message}
      </div>
    </div>
  );
}
