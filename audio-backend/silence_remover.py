from pydub import AudioSegment
from pydub.silence import detect_nonsilent
import os

def reduce_silence(input_file, output_file, silence_thresh=-40, min_silence_len=500, keep_ratio=0.1):
    """
    Verkürzt Stille um 90% (keep_ratio=0.1 = 10% bleiben erhalten)
    - 10 Sekunden Pause → 1 Sekunde Pause
    - 5 Sekunden Pause → 0.5 Sekunden Pause
    
    keep_ratio: 0.1 = 10% der Stille bleiben (90% werden entfernt)
    min_keep: Minimale Pause in ms (z.B. 100ms), nie kürzer als das
    """
    if not os.path.exists(input_file):
        print(f"❌ Datei nicht gefunden: {input_file}")
        return
    
    print(f"Lade {input_file}...")
    file_ext = os.path.splitext(input_file)[1].lower().replace('.', '')
    
    try:
        audio = AudioSegment.from_file(input_file, format=file_ext if file_ext else None)
    except Exception as e:
        audio = AudioSegment.from_file(input_file)
    
    print(f"Dauer: {len(audio)/1000:.1f} Sekunden")
    print(f"Erkenne Stille (Schwellenwert: {silence_thresh} dBFS)...")
    
    # Nicht-stille Bereiche finden
    nonsilent_ranges = detect_nonsilent(audio, min_silence_len=min_silence_len, silence_thresh=silence_thresh)
    
    if not nonsilent_ranges:
        print("⚠️ Keine nicht-stillen Bereiche gefunden!")
        return
    
    print(f"Gefunden: {len(nonsilent_ranges)} Sprach-Segmente")
    
    # Minimale Pause die immer bleibt (z.B. 100ms = 0.1 Sekunden)
    min_keep = 100  # Millisekunden
    
    # Neues Audio zusammenbauen
    result = AudioSegment.empty()
    original_duration = len(audio)
    
    for i, (start, end) in enumerate(nonsilent_ranges):
        # Sprach-Segment hinzufügen
        result += audio[start:end]
        
        # Wenn nicht das letzte Segment, füge verkürzte Pause hinzu
        if i < len(nonsilent_ranges) - 1:
            next_start = nonsilent_ranges[i + 1][0]
            silence_duration = next_start - end
            
            # Berechne neue Pausenlänge (10% der ursprünglichen, aber mindestens 100ms)
            new_silence_duration = max(int(silence_duration * keep_ratio), min_keep)
            
            # Stille extrahieren und kürzen (nimm den Anfang der Pause)
            silence_segment = audio[end:end + new_silence_duration]
            result += silence_segment
            
            saved_in_this_gap = silence_duration - new_silence_duration
            print(f"   Pause {i+1}: {silence_duration/1000:.2f}s → {new_silence_duration/1000:.2f}s (gespart: {saved_in_this_gap/1000:.2f}s)")
    
    # Export
    output_ext = os.path.splitext(output_file)[1].lower().replace('.', '') or "mp3"
    print(f"\nSpeichere als {output_file}...")
    
    if output_ext in ['mp3']:
        result.export(output_file, format=output_ext, bitrate="192k")
    elif output_ext in ['m4a', 'mp4']:
        result.export(output_file, format="mp4", codec="aac", bitrate="192k")
    else:
        result.export(output_file, format=output_ext)
    
    # Statistik
    new_duration = len(result)
    saved = original_duration - new_duration
    
    print(f"\n✅ Fertig!")
    print(f"   Original: {original_duration/1000:.1f}s")
    print(f"   Ergebnis: {new_duration/1000:.1f}s")
    print(f"   Gespart:  {saved/1000:.1f}s ({saved/original_duration*100:.1f}%)")


# Ausführen - 85% der Stille entfernen (15% bleiben übrig)
reduce_silence(
    input_file="Test1.m4a",
    output_file="Test1_bearbeitet.m4a",
    silence_thresh=-40,
    min_silence_len=500,
    keep_ratio=0.15  # 15% bleibt = 85% wird entfernt
)


