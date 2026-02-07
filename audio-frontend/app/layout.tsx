// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Audio Tools – Audio Silence Remover',
    template: '%s | Audio Tools',
  },
  description:
    'Entferne automatisch störende Pausen aus Sprachaufnahmen. Kostenloses KI-Audio-Tool für Podcasts, Voice-Overs und Interviews.',
  metadataBase: new URL('https://deine-domain.de'),
  openGraph: {
    type: 'website',
    url: 'https://deine-domain.de',
    siteName: 'Audio Tools',
    title: 'Audio Silence Remover – Pausen aus Sprachaufnahmen entfernen',
    description:
      'Online-Tool, das stille Passagen aus Podcast- und Sprachaufnahmen automatisch kürzt.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Audio Silence Remover – KI-Tool für Podcasts',
    description:
      'Entferne mit wenigen Klicks lange Pausen aus Sprachaufnahmen. Ideal für Podcasts, YouTube & Voice-Overs.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
