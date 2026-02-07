'use client';

import { useState, useEffect, useRef } from 'react';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

type Lang = 'de' | 'en' | 'es' | 'fr' | 'it';
type ToastState = { message: string; type: 'success' | 'error' } | null;
type Tool = 'silence' | 'soon';
type TFunc = (
  key: keyof typeof translations.de,
  vars?: Record<string, string>,
) => string;

const supportedLangs: Lang[] = ['de', 'en', 'es', 'fr', 'it'];

const translations: Record<Lang, Record<string, string>> = {
  de: {
    badge: '🎧 KI Audio Tool',
    title: 'Audio Silence Remover',
    subtitle:
      'Entferne automatisch störende Pausen aus Sprachaufnahmen – ideal für Podcasts, Voice-Overs und Interviews.',
    intro:
      'Lade eine Audiodatei hoch, stelle ein, wie stark Pausen gekürzt werden sollen, und lade die bearbeitete Datei direkt wieder herunter.',
    uploadLabel: 'Audiodatei hochladen',
    uploadButton: 'Datei auswählen',
    uploadNoFile: 'Keine Datei ausgewählt',
    uploadHint:
      'Es werden ausschließlich Audiodateien akzeptiert (z. B. mp3, wav, m4a). Maximale Dateigröße: 50 MB.',
    iosHint:
      'Hinweis für iPhone/iPad: iOS zeigt im Datei-Auswahldialog oft auch die Kamera bzw. Videoaufnahme an. Bitte nimm Audio z. B. mit der Sprachmemos-App auf und wähle die fertige Audiodatei hier aus – Videoaufnahmen werden abgelehnt.',
    reduceLabel: 'Stille reduzieren',
    reduceExplanation:
      '70% = sehr vorsichtig, 95% = sehr aggressiv. Aktuell bleiben etwa {percent}% der ursprünglichen Pausen erhalten.',
    buttonIdle: 'Stille jetzt kürzen',
    buttonLoading: 'Verarbeite...',
    selectedFile: 'Ausgewählt',
    errorNotAudio:
      'Nur Audiodateien sind erlaubt. Bitte wähle eine Datei im Format mp3, wav, m4a o.Ä.',
    errorTooBig:
      'Die Datei ist zu groß ({size} MB). Maximal erlaubt sind {max} MB.',
    errorGeneric: 'Verbindung zum Server fehlgeschlagen.',
    successTitle: '✅ Fertig! Deine Audiodatei wurde verarbeitet.',
    successLink: 'Bearbeitete Datei herunterladen',
    footerImprint: 'Impressum',
    footerPrivacy: 'Datenschutz',
    tabSilence: 'Silence Remover',
    tabSoon: 'Weitere Tools (bald)',
    soonTitle: 'Weitere Audio-Tools folgen bald',
    soonBody:
      'Hier werden nach und nach neue KI-Tools für Audiobearbeitung erscheinen, z. B. Normalizer, Loudness Match oder Noise Cleaner.',
  },
  en: {
    badge: '🎧 AI Audio Tool',
    title: 'Audio Silence Remover',
    subtitle:
      'Automatically remove silent gaps from voice recordings – perfect for podcasts, voice-overs and interviews.',
    intro:
      'Upload an audio file, choose how aggressively silence should be reduced and download the processed file.',
    uploadLabel: 'Upload audio file',
    uploadButton: 'Choose file',
    uploadNoFile: 'No file selected',
    uploadHint:
      'Only audio files are accepted (e.g. mp3, wav, m4a). Maximum file size: 50 MB.',
    iosHint:
      'Note for iPhone/iPad: iOS often shows the camera / video recorder in the file picker. Please record audio with the Voice Memos app and select the finished audio file here – video recordings are rejected.',
    reduceLabel: 'Reduce silence',
    reduceExplanation:
      '70% = very conservative, 95% = very aggressive. Currently about {percent}% of the original pauses are kept.',
    buttonIdle: 'Trim silence now',
    buttonLoading: 'Processing...',
    selectedFile: 'Selected',
    errorNotAudio:
      'Only audio files are allowed. Please choose a file in mp3, wav, m4a or similar format.',
    errorTooBig:
      'The file is too large ({size} MB). The maximum allowed size is {max} MB.',
    errorGeneric: 'Connection to the server failed.',
    successTitle: '✅ Done! Your audio file has been processed.',
    successLink: 'Download processed file',
    footerImprint: 'Imprint',
    footerPrivacy: 'Privacy',
    tabSilence: 'Silence Remover',
    tabSoon: 'More tools (soon)',
    soonTitle: 'More audio tools are coming soon',
    soonBody:
      'This will become a small suite of AI tools for audio editing, such as a normalizer, loudness matching and noise cleaner.',
  },
  es: {
    badge: '🎧 Herramienta de audio IA',
    title: 'Audio Silence Remover',
    subtitle:
      'Elimina automáticamente los silencios molestos de tus grabaciones de voz: perfecto para pódcasts, locuciones y entrevistas.',
    intro:
      'Sube un archivo de audio, elige qué tan agresivamente se debe reducir el silencio y descarga el archivo procesado.',
    uploadLabel: 'Subir archivo de audio',
    uploadButton: 'Elegir archivo',
    uploadNoFile: 'Ningún archivo seleccionado',
    uploadHint:
      'Solo se aceptan archivos de audio (p. ej. mp3, wav, m4a). Tamaño máximo: 50 MB.',
    iosHint:
      'Nota para iPhone/iPad: iOS suele mostrar también la cámara o la grabación de vídeo en el selector de archivos. Graba el audio con la app de Notas de voz y selecciona aquí el archivo de audio final; las grabaciones de vídeo se rechazan.',
    reduceLabel: 'Reducir silencio',
    reduceExplanation:
      '70% = muy conservador, 95% = muy agresivo. Actualmente se mantiene aproximadamente el {percent}% de las pausas originales.',
    buttonIdle: 'Reducir silencios ahora',
    buttonLoading: 'Procesando...',
    selectedFile: 'Seleccionado',
    errorNotAudio:
      'Solo se permiten archivos de audio. Elige un archivo en formato mp3, wav, m4a u otro similar.',
    errorTooBig:
      'El archivo es demasiado grande ({size} MB). El tamaño máximo permitido es {max} MB.',
    errorGeneric: 'Error de conexión con el servidor.',
    successTitle: '✅ Listo. Tu archivo de audio ha sido procesado.',
    successLink: 'Descargar archivo procesado',
    footerImprint: 'Aviso legal',
    footerPrivacy: 'Privacidad',
    tabSilence: 'Silence Remover',
    tabSoon: 'Más herramientas (pronto)',
    soonTitle: 'Pronto habrá más herramientas de audio',
    soonBody:
      'Aquí aparecerán poco a poco nuevas herramientas de IA para audio, como normalizador, coincidencia de loudness o limpiador de ruido.',
  },
  fr: {
    badge: '🎧 Outil audio IA',
    title: 'Audio Silence Remover',
    subtitle:
      'Supprime automatiquement les silences gênants de vos enregistrements vocaux – idéal pour les podcasts, voix-off et interviews.',
    intro:
      'Télécharge un fichier audio, choisis à quel point les silences doivent être réduits puis télécharge le fichier traité.',
    uploadLabel: 'Télécharger un fichier audio',
    uploadButton: 'Choisir un fichier',
    uploadNoFile: 'Aucun fichier sélectionné',
    uploadHint:
      'Seuls les fichiers audio sont acceptés (ex. mp3, wav, m4a). Taille maximale : 50 Mo.',
    iosHint:
      'Remarque pour iPhone/iPad : iOS affiche souvent aussi la caméra ou l’enregistreur vidéo dans la boîte de dialogue de fichier. Enregistre l’audio avec l’app Dictaphone et sélectionne ici le fichier audio final – les vidéos sont refusées.',
    reduceLabel: 'Réduire les silences',
    reduceExplanation:
      '70 % = très prudent, 95 % = très agressif. Actuellement, environ {percent}% des pauses originales sont conservées.',
    buttonIdle: 'Réduire les silences',
    buttonLoading: 'Traitement en cours...',
    selectedFile: 'Sélectionné',
    errorNotAudio:
      'Seuls les fichiers audio sont autorisés. Choisis un fichier au format mp3, wav, m4a ou similaire.',
    errorTooBig:
      'Le fichier est trop volumineux ({size} Mo). La taille maximale autorisée est {max} Mo.',
    errorGeneric: 'La connexion au serveur a échoué.',
    successTitle: '✅ Terminé ! Ton fichier audio a été traité.',
    successLink: 'Télécharger le fichier traité',
    footerImprint: 'Mentions légales',
    footerPrivacy: 'Confidentialité',
    tabSilence: 'Silence Remover',
    tabSoon: 'Plus d’outils (bientôt)',
    soonTitle: 'D’autres outils audio arrivent bientôt',
    soonBody:
      'Cette page deviendra progressivement une petite suite d’outils IA pour l’audio, comme un normaliseur, un ajustement de niveau sonore ou un nettoyeur de bruit.',
  },
  it: {
    badge: '🎧 Strumento audio IA',
    title: 'Audio Silence Remover',
    subtitle:
      'Rimuove automaticamente le pause silenziose dalle registrazioni vocali – ideale per podcast, voice-over e interviste.',
    intro:
      'Carica un file audio, scegli quanto in modo aggressivo ridurre il silenzio e scarica il file elaborato.',
    uploadLabel: 'Carica file audio',
    uploadButton: 'Scegli file',
    uploadNoFile: 'Nessun file selezionato',
    uploadHint:
      'Sono accettati solo file audio (es. mp3, wav, m4a). Dimensione massima: 50 MB.',
    iosHint:
      'Nota per iPhone/iPad: iOS mostra spesso anche la fotocamera o la registrazione video nel selettore file. Registra l’audio con l’app Memo vocali e seleziona qui il file audio finale – le registrazioni video vengono rifiutate.',
    reduceLabel: 'Riduzione del silenzio',
    reduceExplanation:
      '70% = molto delicato, 95% = molto aggressivo. Attualmente viene mantenuto circa il {percent}% delle pause originali.',
    buttonIdle: 'Riduci i silenzi',
    buttonLoading: 'Elaborazione in corso...',
    selectedFile: 'Selezionato',
    errorNotAudio:
      'Sono consentiti solo file audio. Scegli un file in formato mp3, wav, m4a o simile.',
    errorTooBig:
      'Il file è troppo grande ({size} MB). La dimensione massima consentita è {max} MB.',
    errorGeneric: 'Connessione al server non riuscita.',
    successTitle: '✅ Fatto! Il tuo file audio è stato elaborato.',
    successLink: 'Scarica il file elaborato',
    footerImprint: 'Note legali',
    footerPrivacy: 'Privacy',
    tabSilence: 'Silence Remover',
    tabSoon: 'Altri strumenti (presto)',
    soonTitle: 'Altri strumenti audio in arrivo',
    soonBody:
      'Qui appariranno gradualmente nuovi strumenti IA per l’elaborazione audio, come normalizzatore, allineamento di loudness o riduzione del rumore.',
  },
};

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

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
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

      const ua = navigator.userAgent || '';
      setIsIOS(/iPad|iPhone|iPod/.test(ua));
    }
  }, []);

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
                <header className="space-y-2 text-center max-w-2xl mx-auto">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                    {t('soonTitle')}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {t('soonBody')}
                  </p>
                </header>
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
