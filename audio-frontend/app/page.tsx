'use client';

import { useState, useEffect } from 'react';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

type Lang = 'de' | 'en' | 'es' | 'fr' | 'it';

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
  },
  en: {
    badge: '🎧 AI Audio Tool',
    title: 'Audio Silence Remover',
    subtitle:
      'Automatically remove silent gaps from voice recordings – perfect for podcasts, voice-overs and interviews.',
    intro:
      'Upload an audio file, choose how aggressively silence should be reduced and download the processed file.',
    uploadLabel: 'Upload audio file',
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
  },
  es: {
    badge: '🎧 Herramienta de audio IA',
    title: 'Audio Silence Remover',
    subtitle:
      'Elimina automáticamente los silencios molestos de tus grabaciones de voz: perfecto para pódcasts, locuciones y entrevistas.',
    intro:
      'Sube un archivo de audio, elige qué tan agresivamente se debe reducir el silencio y descarga el archivo procesado.',
    uploadLabel: 'Subir archivo de audio',
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
  },
  fr: {
    badge: '🎧 Outil audio IA',
    title: 'Audio Silence Remover',
    subtitle:
      'Supprime automatiquement les silences gênants de vos enregistrements vocaux – idéal pour les podcasts, voix-off et interviews.',
    intro:
      'Télécharge un fichier audio, choisis à quel point les silences doivent être réduits puis télécharge le fichier traité.',
    uploadLabel: 'Télécharger un fichier audio',
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
    successTitle:
      '✅ Terminé ! Ton fichier audio a été traité.',
    successLink: 'Télécharger le fichier traité',
    footerImprint: 'Mentions légales',
    footerPrivacy: 'Confidentialité',
  },
  it: {
    badge: '🎧 Strumento audio IA',
    title: 'Audio Silence Remover',
    subtitle:
      'Rimuove automaticamente le pause silenziose dalle registrazioni vocali – ideale per podcast, voice-over e interviste.',
    intro:
      'Carica un file audio, scegli quanto in modo aggressivo ridurre il silenzio e scarica il file elaborato.',
    uploadLabel: 'Carica file audio',
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
    successTitle:
      '✅ Fatto! Il tuo file audio è stato elaborato.',
    successLink: 'Scarica il file elaborato',
    footerImprint: 'Note legali',
    footerPrivacy: 'Privacy',
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>('de');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [silenceReducePercent, setSilenceReducePercent] = useState(85);
  const keepRatio = (100 - silenceReducePercent) / 100;

  const [isIOS, setIsIOS] = useState(false);

  // Browser-Sprache automatisch erkennen und auf unterstützte Sprachen mappen
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      // bevorzugte Sprachenliste auslesen
      const navLangs =
        (navigator.languages && navigator.languages.length
          ? navigator.languages
          : [navigator.language]) || []; // [web:508][web:509][web:510]

      const normalized = navLangs
        .filter(Boolean)
        .map((l) => l.toLowerCase())
        .map((l) => (l.includes('-') ? l.split('-')[0] : l)); // "de-DE" -> "de" [web:511][web:513]

      const found = normalized.find((code) =>
        supportedLangs.includes(code as Lang),
      );

      if (found) {
        setLang(found as Lang);
      } else {
        setLang('en'); // Fallback
      }

      const ua = navigator.userAgent || '';
      setIsIOS(/iPad|iPhone|iPod/.test(ua));
    }
  }, []);

  const t = (key: keyof typeof translations.de, vars?: Record<string, string>) => {
    let text = translations[lang][key];
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
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
      const downloadUrl = window.URL.createObjectURL(blob);
      setDownloadUrl(downloadUrl);
    } catch (e: any) {
      console.error(e);
      setError(e.message || t('errorGeneric'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="flex items-center justify-end px-4 pt-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 border border-slate-800 px-3 py-1 text-[11px] text-slate-300">
          <span>Language</span>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            className="bg-transparent text-slate-100 text-[11px] border border-slate-700 rounded-full px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="de">Deutsch</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="it">Italiano</option>
          </select>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-4 sm:py-8">
        <div className="w-full max-w-xl">
          <div className="mb-6 text-center">
            <span className="inline-flex items-center rounded-full bg-slate-900/70 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300">
              {t('badge')}
            </span>
          </div>

          <section className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-sm p-6 sm:p-8 space-y-6">
            <header className="space-y-2 text-center">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {t('title')}
              </h1>
              <p className="text-sm sm:text-base text-slate-300">
                {t('subtitle')}
              </p>
              <p className="text-xs sm:text-sm text-slate-400">
                {t('intro')}
              </p>
            </header>

            <div className="space-y-4">
              <div className="border border-dashed border-slate-700 rounded-xl bg-slate-900/60 p-5 text-center">
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  {t('uploadLabel')}
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
                      setError(t('errorNotAudio'));
                      return;
                    }

                    const maxSizeMb = 50;
                    const sizeMb = selected.size / (1024 * 1024);

                    if (sizeMb > maxSizeMb) {
                      setFile(null);
                      setError(
                        t('errorTooBig', {
                          size: sizeMb.toFixed(1),
                          max: String(maxSizeMb),
                        }),
                      );
                      return;
                    }

                    setFile(selected);
                  }}
                />

                {file && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-300">
                    {t('selectedFile')}: <span className="font-medium">{file.name}</span>{' '}
                    ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                )}

                <p className="mt-3 text-xs text-slate-400">
                  {t('uploadHint')}
                </p>

                {isIOS && (
                  <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/40 text-amber-100 text-xs rounded-lg text-left">
                    {t('iosHint')}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium text-slate-200">
                    {t('reduceLabel')}
                  </span>
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
                  {t('reduceExplanation', {
                    percent: (keepRatio * 100).toFixed(0),
                  })}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleUpload}
                  disabled={!file || loading}
                  className="w-full inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/30 disabled:bg-slate-700 disabled:shadow-none hover:bg-indigo-500 transition-colors"
                >
                  {loading ? t('buttonLoading') : t('buttonIdle')}
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
                    {t('successTitle')}
                  </p>
                  <a
                    href={downloadUrl}
                    download="bearbeitet.mp3"
                    className="inline-flex items-center text-sm font-medium text-emerald-200 hover:text-emerald-100 underline-offset-2 hover:underline"
                  >
                    {t('successLink')}
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
            {t('footerImprint')}
          </a>
          <a href="/datenschutz" className="hover:text-slate-300 transition-colors">
            {t('footerPrivacy')}
          </a>
        </div>
      </footer>
    </div>
  );
}
