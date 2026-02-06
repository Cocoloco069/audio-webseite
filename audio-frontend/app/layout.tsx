// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audio Silence Remover',
  description: 'Kürzt automatisch stille Passagen aus Sprachaufnahmen.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
