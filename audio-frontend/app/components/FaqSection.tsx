// app/components/FaqSection.tsx

export default function FaqSection() {
  return (
    <section className="mt-4 sm:mt-6 border-t border-slate-800/80 pt-4 sm:pt-6 space-y-4">
      <h2 className="text-sm sm:text-base font-semibold text-slate-100">
        Häufige Fragen
      </h2>

      <div className="space-y-3 text-xs sm:text-sm text-slate-300">
        <div>
          <p className="font-medium text-slate-100">
            Was macht der Silence Remover genau?
          </p>
          <p>
            Das Tool erkennt stille Abschnitte in Sprachaufnahmen und kürzt sie,
            ohne den gesprochenen Inhalt zu verändern. So wirken Podcasts,
            Voice-Overs und Interviews flüssiger.
          </p>
        </div>

        <div>
          <p className="font-medium text-slate-100">
            Was bedeutet der Regler „Stille reduzieren“?
          </p>
          <p>
            Je höher der Prozentwert, desto stärker werden Pausen gekürzt.
            Niedrige Werte lassen mehr Pausen stehen, hohe Werte schneiden sie
            aggressiver zusammen.
          </p>
        </div>

        <div>
          <p className="font-medium text-slate-100">
            Was passiert mit meinen Audiodateien?
          </p>
          <p>
            Die Datei wird nur verarbeitet, um dir die gekürzte Version als
            Download zur Verfügung zu stellen. Sie wird nicht dauerhaft
            gespeichert oder für andere Zwecke ausgewertet.
          </p>
        </div>

        <div>
          <p className="font-medium text-slate-100">
            Welche Dateiformate werden unterstützt?
          </p>
          <p>
            Grundsätzlich alle gängigen Audioformate wie mp3, wav oder m4a, die
            dein Browser im Datei-Dialog anbietet, bis maximal 50&nbsp;MB
            Dateigröße.
          </p>
        </div>
      </div>
    </section>
  );
}
