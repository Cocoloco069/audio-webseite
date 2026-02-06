'use client';

import { useState } from 'react';

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
    <main className="min-h-screen p-8 max-w-2xl mx-auto flex flex-col">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">🎙️ Audio Silence Remover</h1>
        <p className="mb-2 text-gray-600">
          Dieses Tool kürzt automatisch stille Passagen aus deinen Sprachaufnahmen – ideal für
          Podcasts, Voice-Overs oder Interviews.
        </p>
        <p className="mb-6 text-gray-500 text-sm">
          Lade eine Audiodatei hoch, stelle ein, wie stark Pausen gekürzt werden sollen, und lade
          die bearbeitete Datei direkt wieder herunter.
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              const selected = e.target.files?.[0] || null;
              setDownloadUrl(null);
              setError(null);

              if (!selected) {
                setFile(null);
                return;
              }

              // Nur echte Audio-Dateien erlauben (per MIME-Typ)
              if (!selected.type.startsWith('audio/')) {
                setFile(null);
                setError(
                  'Nur Audiodateien sind erlaubt. Bitte wähle eine Datei im Format mp3, wav, m4a o.Ä.'
                );
                return;
              }

              const maxSizeMb = 50;
              const sizeMb = selected.size / (1024 * 1024); // Bytes -> MB

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
            <p className="mt-2 text-sm text-gray-600">
              Ausgewählt: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            Es werden ausschließlich Audiodateien akzeptiert (z.&nbsp;B. mp3, wav, m4a). Maximale
            Dateigröße: 50&nbsp;MB.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Stille reduzieren:{' '}
            <span className="font-bold">{silenceReducePercent}%</span>
          </label>
          <input
            type="range"
            min={70}
            max={95}
            value={silenceReducePercent}
            onChange={(e) => setSilenceReducePercent(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            70% = sehr vorsichtig, 95% = sehr aggressiv. Aktuell bleiben etwa{' '}
            {(keepRatio * 100).toFixed(0)}% der ursprünglichen Pausen erhalten.
          </p>
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? 'Verarbeite...' : 'Stille jetzt kürzen'}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {downloadUrl && (
          <div className="mt-6 p-4 bg-green-100 rounded">
            <p className="mb-2">✅ Fertig! Datei wurde verarbeitet.</p>
            <a
              href={downloadUrl}
              download="bearbeitet.mp3"
              className="text-blue-600 underline"
            >
              Bearbeitete Datei herunterladen
            </a>
          </div>
        )}
      </div>

      <footer className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500 flex justify-between">
        <span>© {new Date().getFullYear()} Audio Silence Remover</span>
        <div className="space-x-4">
          <a href="/impressum" className="hover:underline">
            Impressum
          </a>
          <a href="/datenschutz" className="hover:underline">
            Datenschutz
          </a>
        </div>
      </footer>
    </main>
  );
}
