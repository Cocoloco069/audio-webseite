import { useState, useRef } from 'react';
import { TFunc } from '../../i18n/translations';
import { ToastState } from '../../types/ui';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

function buildEditedFileName(originalName: string): string {
  const dotIndex = originalName.lastIndexOf('.');
  if (dotIndex === -1) {
    return `${originalName}_edited`;
  }
  const base = originalName.substring(0, dotIndex);
  const ext = originalName.substring(dotIndex);
  return `${base}_edited${ext}`;
}

export default function SilenceRemoverTool({
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
