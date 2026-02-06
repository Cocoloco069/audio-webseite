'use client';

import { useState, useEffect } from 'react';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Prozentwert im UI: 70–95 % der Stille sollen entfernt werden
  const [silenceReducePercent, setSilenceReducePercent] = useState(85);

  // Daraus wird keep_ratio fürs Backend berechnet (z.B. 85% entfernen -> 0.15 bleibt)
  const keepRatio = (100 - silenceReducePercent) / 100;

  // Einfaches Flag, ob der User iOS (iPhone/iPad) nutzt
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent || '';
      setIsIOS(/iPad|iPhone|iPod/.test(ua));
    }
  }, []);

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
      const downloadUrl = window.URL.createObjectURL(blob);
      setDownloadUrl(downloadUrl);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Verbindung zum Server fehlgeschlagen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl">
          <div className="mb-6 text-center">
            <span className="inline-flex items-center rounded-full bg-slate-900/70 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300">
              🎧 AI Audio Tool
            </span>
          </div>

          <section className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-sm p-6 sm:p-8 space-y-6">
            <header className="space-y-2 text-center">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Audio Silence Remover
              </h1>
              <p className="text-sm sm:text-base text-slate-300">
                Entferne automatisch störende Pausen aus Sprachaufnahmen – ideal für Podcasts,
                Voice-Overs und Interviews.
              </p>
            </header>

            <div className="space-y-4">
              <div className="border border-dashed border-slate-700 rounded-xl bg-slate-900/60 p-5 text-center">
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Audiodatei hochladen
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  className="mx-auto block text-sm file:mr-4 file:rounded-full file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-500 cursor-pointer"
                  onChange={(e) => {
                    const selected = e.target.files?.[0] || null;
                    setDownloadUrl(null);
                    setError(null);

                    if (!selected) {
                      setFile(null);
                      return;
                    }

                    if (!selected.type.startsWith('audio/')) {
                      setFile(null);
                      setError(
                        'Nur Audiodateien sind erlaubt. Bitte wähle eine Datei im Format mp3, wav, m4a o.Ä.',
                      );
                      return;
                    }

                    const maxSizeMb = 50;
                    const sizeMb = selected.size / (1024 * 1024);

                    if (sizeMb > maxSizeMb) {
                      setFile(null);
                      setError(
                        `Die Datei ist zu groß (${sizeMb.toFixed(
                          1,
                        )} MB). Maximal erlaubt sind ${maxSizeMb} MB.`,
                      );
                      return;
                    }

                    setFile(selected);
                  }}
                />

                {file && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-300">
                    Ausgewählt: <span className="font-medium">{file.name}</span>{' '}
                    ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                )}

                <p className="mt-3 text-xs text-slate-400">
                  Es werden ausschließlich Audiodateien akzeptiert (z.&nbsp;B. mp3, wav, m4a).
                  Maximale Dateigröße: 50&nbsp;MB.
                </p>

                {isIOS && (
                  <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/40 text-amber-100 text-xs rounded-lg text-left">
                    Hinweis für iPhone/iPad:
                    iOS zeigt im Datei-Auswahldialog oft auch die Kamera bzw. Videoaufnahme an.
                    Bitte nimm Audio z.&nbsp;B. mit der Sprachmemos-App auf und wähle die fertige
                    Audiodatei hier aus – Videoaufnahmen werden abgelehnt.
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium text-slate-200">Stille reduzieren</span>
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
                  className="w-full accent-indigo-500"
                />
                <p className="text-xs text-slate-400">
                  70% = sehr vorsichtig, 95% = sehr aggressiv. Aktuell bleiben etwa{' '}
                  <span className="font-medium text-slate-200">
                    {(keepRatio * 100).toFixed(0)}%
                  </span>{' '}
                  der ursprünglichen Pausen erhalten.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleUpload}
                  disabled={!file || loading}
                  className="w-full inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/30 disabled:bg-slate-700 disabled:shadow-none hover:bg-indigo-500 transition-colors"
                >
                  {loading ? 'Verarbeite...' : 'Stille jetzt kürzen'}
                </button>
              </div>

              {error && (
                <div className="mt-2 p-3 rounded-lg bg-red-500/10 border border-red-500/40 text-xs text-red-100">
                  {error}
                </div>
              )}

              {downloadUrl && (
                <div className="mt-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/40">
                  <p className="mb-2 text-sm text-emerald-100">
                    ✅ Fertig! Deine Audiodatei wurde verarbeitet.
                  </p>
                  <a
                    href={downloadUrl}
                    download="bearbeitet.mp3"
                    className="inline-flex items-center text-sm font-medium text-emerald-200 hover:text-emerald-100 underline-offset-2 hover:underline"
                  >
                    Bearbeitete Datei herunterladen
                  </a>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="px-6 pb-4 pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-900/80 bg-slate-950/90">
        <span>© {new Date().getFullYear()} Audio Silence Remover</span>
        <div className="space-x-4">
          <a href="/impressum" className="hover:text-slate-300 transition-colors">
            Impressum
          </a>
          <a href="/datenschutz" className="hover:text-slate-300 transition-colors">
            Datenschutz
          </a>
        </div>
      </footer>
    </div>
  );
}
