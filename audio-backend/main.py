from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import tempfile

from silence_remover import reduce_silence  # <- deine Funktion aus silence_remover.py

app = FastAPI(title="Audio Silence Remover API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # MVP: alles erlauben, später einschränken
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Temporärer Ordner für Uploads/Ergebnisse
TEMP_DIR = tempfile.gettempdir()


@app.get("/")
async def root():
    return {"message": "Audio Silence Remover API läuft!"}


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/process")
async def process_audio(
    file: UploadFile = File(...),
    keep_ratio: float = 0.15,
    silence_thresh: int = -40,
    min_silence_len: int = 500,
):
    """
    Nimmt eine Audiodatei entgegen, verkürzt Stille um z.B. 85 % und gibt eine bearbeitete Datei zurück.

    Parameter (alle optional über Query):
    - keep_ratio: 0.15 = 15 % der Stille bleiben, 85 % werden entfernt
    - silence_thresh: dB-Schwelle für Stille (Standard: -40)
    - min_silence_len: minimale Stille in ms, die angepasst werden soll (Standard: 500ms)
    """
    # Erlaubte Endungen (kannst du bei Bedarf erweitern)
    allowed_ext = {".mp3", ".m4a", ".wav", ".mp4", ".ogg", ".flac", ".aac"}
    ext = os.path.splitext(file.filename)[1].lower()

    if ext not in allowed_ext:
        raise HTTPException(
            status_code=400, detail=f"Format nicht unterstützt: {ext}"
        )

    # Temporäre Datei-Pfade
    input_path = os.path.join(TEMP_DIR, f"input_{file.filename}")
    base_name = os.path.splitext(file.filename)[0]
    output_filename = f"processed_{base_name}.mp3"
    output_path = os.path.join(TEMP_DIR, output_filename)

    try:
        # Upload speichern
        file_bytes = await file.read()
        with open(input_path, "wb") as f:
            f.write(file_bytes)

        # Datei verarbeiten (nutzt deine reduce_silence-Funktion)
        reduce_silence(
            input_file=input_path,
            output_file=output_path,
            silence_thresh=silence_thresh,
            min_silence_len=min_silence_len,
            keep_ratio=keep_ratio,
        )

        if not os.path.exists(output_path):
            raise HTTPException(
                status_code=500, detail="Verarbeitung fehlgeschlagen, keine Ausgabedatei gefunden."
            )

        # Bearbeitete Datei zurückgeben
        return FileResponse(
            output_path,
            media_type="audio/mpeg",
            filename=output_filename,
        )

    finally:
        # Input-Datei nach der Verarbeitung löschen
        if os.path.exists(input_path):
            try:
                os.remove(input_path)
            except PermissionError:
                # Nicht kritisch, kann vorkommen unter Windows
                pass
        # Output lassen wir liegen, sonst kann FileResponse Probleme machen
