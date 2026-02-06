'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('http://localhost:8000/process?keep_ratio=0.15', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setDownloadUrl(url);
      } else {
        alert('Fehler bei der Verarbeitung');
      }
    } catch (error) {
      alert('Verbindung zum Server fehlgeschlagen. Ist das Backend gestartet?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🎙️ Audio Silence Remover</h1>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center">
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />
        {file && <p className="text-sm text-gray-600">Ausgewählt: {file.name}</p>}
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? 'Verarbeite...' : 'Stille entfernen (85%)'}
      </button>

      {downloadUrl && (
        <div className="mt-6 p-4 bg-green-100 rounded">
          <p className="mb-2">✅ Fertig!</p>
          <a
            href={downloadUrl}
            download="bearbeitet.mp3"
            className="text-blue-600 underline"
          >
            Download bearbeitete Datei
          </a>
        </div>
      )}
    </main>
  );
}
