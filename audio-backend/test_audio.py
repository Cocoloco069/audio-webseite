import numpy as np
import soundfile as sf

print("✅ Alle Libraries erfolgreich geladen!")
print(f"NumPy Version: {np.__version__}")

# Test: Erzeuge ein einfaches Sinussignal und speichere es
sample_rate = 22050
duration = 2  # Sekunden
t = np.linspace(0, duration, int(sample_rate * duration))
frequency = 440  # A4 Ton
audio = 0.5 * np.sin(2 * np.pi * frequency * t)

# Mit "Stille" ergänzen (1s vorne, 1s hinten)
silence = np.zeros(sample_rate)
audio_with_silence = np.concatenate([silence, audio, silence])

# Speichern
sf.write("test_output.wav", audio_with_silence, sample_rate)
print("✅ Test-Datei erstellt: test_output.wav")
print(f"   Länge: {len(audio_with_silence)/sample_rate:.1f} Sekunden")
