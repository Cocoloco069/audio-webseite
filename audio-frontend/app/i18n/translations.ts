// app/i18n/translations.ts
export type Lang = 'de' | 'en' | 'es' | 'fr' | 'it';

export const supportedLangs: Lang[] = ['de', 'en', 'es', 'fr', 'it'];

export const translations: Record<Lang, Record<string, string>> = {
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
    navHome: 'Startseite',
    navTools: 'Tools',
    navContact: 'Kontakt',
    soonTitle: 'Weitere Audio-Tools folgen bald',
    soonBody:
      'Hier werden nach und nach weitere KI-Audio-Tools erscheinen – z. B. Noise Cleaner, Loudness-Match für gleich laute Folgen oder ein einfacher Normalizer.',
    faqTitle: 'Häufige Fragen',
    faqQ1: 'Was macht der Silence Remover genau?',
    faqA1:
      'Das Tool erkennt stille Abschnitte in Sprachaufnahmen und kürzt sie, ohne den gesprochenen Inhalt zu verändern. So wirken Podcasts, Voice-Overs und Interviews flüssiger.',
    faqQ2: 'Was bedeutet der Regler „Stille reduzieren“?',
    faqA2:
      'Je höher der Prozentwert, desto stärker werden Pausen gekürzt. Niedrige Werte lassen mehr Pausen stehen, hohe Werte schneiden sie aggressiver zusammen.',
    faqQ3: 'Was passiert mit meinen Audiodateien?',
    faqA3:
      'Die Datei wird nur verarbeitet, um dir die gekürzte Version als Download bereitzustellen. Sie wird nicht dauerhaft gespeichert oder für andere Zwecke ausgewertet.',
    faqQ4: 'Welche Dateiformate werden unterstützt?',
    faqA4:
      'Gängige Audioformate wie mp3, wav oder m4a, die dein Browser im Datei-Dialog anbietet, bis maximal 50 MB Dateigröße.',
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
    navHome: 'Home',
    navTools: 'Tools',
    navContact: 'Contact',
    soonTitle: 'More audio tools are coming soon',
    soonBody:
      'More AI audio tools will appear here soon – for example noise cleaning, loudness matching between episodes, or a simple normalizer.',
    faqTitle: 'Frequently asked questions',
    faqQ1: 'What exactly does the silence remover do?',
    faqA1:
      'The tool detects silent sections in voice recordings and shortens them without changing the spoken content. This makes podcasts, voice-overs, and interviews feel more fluent.',
    faqQ2: 'What does the “Reduce silence” slider mean?',
    faqA2:
      'The higher the percentage, the more aggressively pauses are shortened. Lower values keep more pauses, higher values cut them tighter.',
    faqQ3: 'What happens to my audio files?',
    faqA3:
      'Your file is only processed to create the trimmed version for download. It is not stored permanently or analyzed for other purposes.',
    faqQ4: 'Which file formats are supported?',
    faqA4:
      'Common audio formats such as mp3, wav, or m4a that your browser offers in the file picker, up to a maximum size of 50 MB.',
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
    navHome: 'Inicio',
    navTools: 'Herramientas',
    navContact: 'Contacto',
    soonTitle: 'Pronto habrá más herramientas de audio',
    soonBody:
      'Aquí aparecerán poco a poco nuevas herramientas de IA para audio, como normalizador, coincidencia de loudness o limpiador de ruido.',
    faqTitle: 'Preguntas frecuentes',
    faqQ1: '¿Qué hace exactamente el Silence Remover?',
    faqA1:
      'La herramienta detecta los silencios en las grabaciones de voz y los acorta sin cambiar el contenido hablado. Así, los pódcasts y locuciones suenan más fluidos.',
    faqQ2: '¿Qué significa el control «Reducir silencio»?',
    faqA2:
      'Cuanto mayor es el porcentaje, más agresivamente se recortan las pausas. Valores bajos dejan más silencios, valores altos los eliminan casi por completo.',
    faqQ3: '¿Qué pasa con mis archivos de audio?',
    faqA3:
      'El archivo solo se procesa para generarte la versión recortada para descargar. No se almacena de forma permanente ni se analiza para otros fines.',
    faqQ4: '¿Qué formatos de archivo se admiten?',
    faqA4:
      'Formatos de audio habituales como mp3, wav o m4a que muestre tu navegador en el selector de archivos, hasta un máximo de 50 MB.',
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
    navHome: 'Accueil',
    navTools: 'Outils',
    navContact: 'Contact',
    soonTitle: 'D’autres outils audio arrivent bientôt',
    soonBody:
      'Cette page deviendra progressivement une petite suite d’outils IA pour l’audio, comme un normaliseur, un ajustement de niveau sonore ou un nettoyeur de bruit.',
    faqTitle: 'Questions fréquentes',
    faqQ1: 'Que fait exactement le Silence Remover ?',
    faqA1:
      'L’outil détecte les passages silencieux dans les enregistrements vocaux et les raccourcit sans modifier le contenu parlé. Les podcasts et voix-off paraissent ainsi plus fluides.',
    faqQ2: 'Que signifie le curseur « Réduire les silences » ?',
    faqA2:
      'Plus le pourcentage est élevé, plus les pauses sont raccourcies de manière agressive. Des valeurs faibles conservent davantage de silences, des valeurs élevées les réduisent fortement.',
    faqQ3: 'Que devient mon fichier audio ?',
    faqA3:
      'Le fichier est uniquement traité pour te fournir une version raccourcie en téléchargement. Il n’est pas conservé durablement ni analysé à d’autres fins.',
    faqQ4: 'Quels formats de fichier sont pris en charge ?',
    faqA4:
      'Les formats audio courants tels que mp3, wav ou m4a proposés par ton navigateur dans la boîte de dialogue de fichier, jusqu’à une taille maximale de 50 Mo.',
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
    navHome: 'Home',
    navTools: 'Strumenti',
    navContact: 'Contatto',
    soonTitle: 'Altri strumenti audio in arrivo',
    soonBody:
      'Qui appariranno gradualmente nuovi strumenti IA per l’elaborazione audio, come normalizzatore, allineamento di loudness o riduzione del rumore.',
    faqTitle: 'Domande frequenti',
    faqQ1: 'Che cosa fa esattamente il Silence Remover?',
    faqA1:
      'Lo strumento rileva le parti silenziose nelle registrazioni vocali e le accorcia senza modificare il parlato. In questo modo podcast e voice-over risultano più scorrevoli.',
    faqQ2: 'Cosa significa il cursore «Riduzione del silenzio»?',
    faqA2:
      'Più alta è la percentuale, più in modo deciso vengono accorciate le pause. Valori bassi mantengono più silenzi, valori alti li tagliano in modo aggressivo.',
    faqQ3: 'Che cosa succede ai miei file audio?',
    faqA3:
      'Il file viene elaborato solo per creare la versione accorciata da scaricare. Non viene conservato in modo permanente né utilizzato per altri scopi.',
    faqQ4: 'Quali formati di file sono supportati?',
    faqA4:
      'I formati audio più comuni, come mp3, wav o m4a, che il tuo browser mostra nella finestra di selezione dei file, fino a un massimo di 50 MB.',
  },
};

export type TFunc = (
  key: keyof typeof translations.de,
  vars?: Record<string, string>,
) => string;
