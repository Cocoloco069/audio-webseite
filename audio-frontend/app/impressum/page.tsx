// app/impressum/page.tsx
'use client';

export default function ImpressumPage() {
  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Impressum</h1>

      <section className="space-y-2 mb-6">
        <h2 className="text-xl font-semibold">Angaben gemäß § 5 DDG</h2>
        <p>
          Max Mustermann
          <br />
          Musterstraße 1
          <br />
          12345 Musterstadt
          <br />
          Deutschland
        </p>
      </section>

      <section className="space-y-2 mb-6">
        <h2 className="text-xl font-semibold">Kontakt</h2>
        <p>
          E-Mail: <a href="mailto:info@example.com" className="text-blue-600 underline">
            info@example.com
          </a>
          <br />
          Telefon: +49 (0)123 456789
        </p>
      </section>

      <section className="space-y-2 mb-6">
        <h2 className="text-xl font-semibold">Verantwortlich für den Inhalt</h2>
        <p>
          Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:
          <br />
          Max Mustermann
          <br />
          Musterstraße 1
          <br />
          12345 Musterstadt
        </p>
      </section>

      <section className="space-y-2 text-sm text-gray-600">
        <h2 className="text-lg font-semibold">Haftungshinweis</h2>
        <p>
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte
          externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
          verantwortlich.
        </p>
        <p>
          Dieses Impressum gilt auch für etwaige zugehörige Social-Media-Profile, sofern vorhanden.
        </p>
      </section>
    </main>
  );
}
