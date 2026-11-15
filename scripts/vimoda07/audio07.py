#!/usr/bin/env python3
"""Musik & SFX prosedural untuk video 07 "Babopa: Bilangan Tidak Cuma 1, 2, 3?".
Revisi 6: cue diselaraskan ke beat narasi baru (durasi proporsional panjang teks)
dan masterplan gerakan bola (menggelinding antar stasiun, tanpa gepeng).
Output: /tmp/render/audio.wav (stereo 44100 Hz, 16-bit, 52.0 s)
"""
import numpy as np
import wave

SR = 44100
DUR = 52.0
N = int(SR * DUR)
OUT = "/tmp/render/audio.wav"

rng = np.random.default_rng(20261113)
mixL = np.zeros(N)
mixR = np.zeros(N)


def add(t0, sig, pan=0.0, gain=1.0):
    """sisipkan sinyal mono pada waktu t0; pan -1 (L) .. +1 (R)"""
    i0 = int(t0 * SR)
    if i0 >= N:
        return
    n = min(len(sig), N - i0)
    gl = gain * np.sqrt(0.5 * (1 - pan))
    gr = gain * np.sqrt(0.5 * (1 + pan))
    mixL[i0:i0 + n] += sig[:n] * gl
    mixR[i0:i0 + n] += sig[:n] * gr


def env_ad(n, a, d):
    t = np.arange(n) / SR
    e = np.minimum(t / max(a, 1e-4), 1.0) * np.exp(-np.maximum(t - a, 0) / d)
    return e


def sine(f, dur, a=0.005, d=0.25, harm=(1.0,)):
    n = int(dur * SR)
    t = np.arange(n) / SR
    sig = np.zeros(n)
    for i, amp in enumerate(harm):
        sig += amp * np.sin(2 * np.pi * f * (i + 1) * t)
    return sig * env_ad(n, a, d)


def noise_band(dur, f_lo, f_hi, tilt=1.0):
    """noise dengan bandpass via FFT + envelope hann"""
    n = int(dur * SR)
    x = rng.standard_normal(n)
    X = np.fft.rfft(x)
    fr = np.fft.rfftfreq(n, 1 / SR)
    mask = np.exp(-0.5 * ((fr - (f_lo + f_hi) / 2) / ((f_hi - f_lo) / 2.2)) ** 2)
    X *= mask
    y = np.fft.irfft(X, n)
    y /= (np.max(np.abs(y)) + 1e-9)
    hann = np.hanning(n)
    return y * hann * tilt


def kick(level=0.20):
    dur = 0.30
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = 75 * np.exp(-t / 0.055) + 40
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / 0.085) * level


def boom(level=0.22):
    dur = 0.9
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = 62 * np.exp(-t / 0.10) + 34
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) * np.exp(-t / 0.22)
    nz = noise_band(0.12, 60, 240)
    s[: len(nz)] += nz * 0.5 * np.exp(-np.arange(len(nz)) / (0.03 * SR))
    return s / (np.max(np.abs(s)) + 1e-9) * level


def whoosh(dur=0.85, up=True, level=0.13):
    """noise terbandpass + sweep frekuensi via resample (hemat memori)"""
    n = int(dur * SR)
    x = rng.standard_normal(n)
    X = np.fft.rfft(x)
    fr = np.fft.rfftfreq(n, 1 / SR)
    mask = np.exp(-0.5 * ((fr - 1000) / 900) ** 2)
    y = np.fft.irfft(X * mask, n)
    y /= (np.max(np.abs(y)) + 1e-9)
    t = np.linspace(0, 1, n)
    if up:
        ts = t ** 1.7          # makin cepat: kesan naik
    else:
        ts = 1 - (1 - t) ** 1.7  # makin lambat: kesan turun
    y = np.interp(ts, t, y)
    hann = np.sin(np.pi * t) ** 1.6
    return y * hann * level


def tick(f=900.0, level=0.09):
    s = sine(f, 0.07, a=0.002, d=0.02, harm=(1.0, 0.3))
    return s / (np.max(np.abs(s)) + 1e-9) * level


def chime(f=880.0, level=0.12):
    return sine(f, 1.6, a=0.002, d=0.5, harm=(1.0, 0.45, 0.18)) * level / 0.12 * 1.0


# ---------- PAD / chord progress (batas bab mengikuti scene baru) ----------
A2, C3, E3, F2, G2, B2, D3, C4 = 110.0, 130.81, 164.81, 87.31, 98.0, 123.47, 146.83, 261.63
SEG = [
    (0.0, 5.2, (A2, C3, E3)),
    (5.2, 12.8, (F2, A2, C3)),
    (12.8, 23.4, (C3 - 0, E3, 196.0)),
    (23.4, 32.8, (G2, B2, D3)),
    (32.8, 40.2, (A2, C3, E3)),
    (40.2, 47.4, (F2, A2, C3)),
    (47.4, 52.0, (C3, E3, 196.0)),
]
for (t0, t1, notes) in SEG:
    dur = t1 - t0 + 1.0
    n = int(dur * SR)
    t = np.arange(n) / SR
    e = np.ones(n)
    atk = int(1.0 * SR)
    rel = int(1.2 * SR)
    e[:atk] = np.linspace(0, 1, atk)
    e[-rel:] *= np.linspace(1, 0, rel)
    e *= np.minimum(t / dur * 3 + 0.15, 1.0)
    for f in notes:
        for det, side in ((0.9985, "L"), (1.0015, "R")):
            sig = np.zeros(n)
            for i, amp in ((0, 1.0), (1, 0.32), (2, 0.10)):
                sig += amp * np.sin(2 * np.pi * f * det * (i + 1) * t + i * 1.3)
            g = 0.055
            i0 = int(t0 * SR)
            nn = min(n, N - i0)
            if side == "L":
                mixL[i0:i0 + nn] += sig[:nn] * e[:nn] * g
            else:
                mixR[i0:i0 + nn] += sig[:nn] * e[:nn] * g
    # sub bass
    sub = np.sin(2 * np.pi * notes[0] / 2 * t) * e * 0.075
    add(t0, sub, 0.0)

# ---------- arpeggio 12.8 - 40.2 ----------
SCALE = [220.0, 261.63, 329.63, 392.0, 440.0, 523.25]
step = 0.30
tt = 12.8
k = 0
while tt < 40.0:
    f = SCALE[(k * 3 + (k % 5)) % len(SCALE)]
    s = sine(f, 0.30, a=0.004, d=0.16, harm=(1.0, 0.35))
    pan = 0.35 * np.sin(k * 1.1)
    add(tt, s, pan, 0.052)
    k += 1
    tt += step

# ---------- kick & hat ----------
tt = 12.8
while tt < 40.0:
    add(tt, kick(), 0.0)
    add(tt + 0.3, noise_band(0.05, 5000, 9000) * 0.9, 0.15, 0.05)
    tt += 0.6
tt = 40.2
while tt < 51.5:
    add(tt, kick(0.14), 0.0)
    tt += 1.2

# ---------- momen kunci (diselaraskan beat narasi revisi 6) ----------
CUT_TRANSITIONS = [6.4, 17.0, 25.9, 32.9, 40.2]
add(0.5, boom(0.24))                       # 1, 2, 3 pahlawan menghantam
add(0.5, whoosh(0.5, True, 0.05))
for i, tc in enumerate([1.0, 1.45, 1.9]):  # kartu negatif, pecahan, irasional
    add(tc, sine([440.0, 523.25, 659.26][i], 0.4, a=0.004, d=0.24, harm=(1.0, 0.4)), 0.0, 0.10)
add(2.98, tick(760, 0.045))                # "matematika tidak sesempit itu"
add(2.6, whoosh(0.8, False, 0.045))        # mobil pertama lewat di jalan
add(3.9, tick(520, 0.05))
add(4.9, tick(1100, 0.07))                 # tanda tanya merah
for tw in CUT_TRANSITIONS:                 # perpindahan antar bab
    add(tw, whoosh(0.85, True, 0.12), 0.0)
add(6.52, tick(900, 0.05))                 # narasi "punya 5 buku"
add(6.9, tick(700, 0.05))                  # properti buku muncul
add(7.1, chime(660.0, 0.10))               # judul EMPAT SITUASI
for i in range(5):                         # bola menghitung 5 buku
    add(7.1 + i * 0.32, tick(320 + i * 50, 0.05))
add(8.85, tick(300, 0.06))                 # termometer + panel "dingin!"
add(8.9, tick(980, 0.05))
add(10.15, tick(520, 0.045))               # pasangan 1 berlalu
add(9.2, whoosh(0.8, False, 0.045))        # mobil kedua lewat
add(10.35, tick(620, 0.05))                # pizza muncul
add(10.5, whoosh(0.3, True, 0.04))         # bola terbelah dua (1/2)
add(10.45, tick(640, 0.05))                # lingkaran pi muncul
add(12.2, tick(760, 0.05))                 # bola berputar mulus
add(13.76, boom(0.08))                     # beat emas "jenis berbeda"
add(14.6, whoosh(0.8, False, 0.04))        # mobil ketiga lewat
add(17.0, tick(900, 0.05))                 # bab kelompok
add(17.21, chime(587.33, 0.12))
add(17.4, tick(600, 0.05))                 # teman bola pertama memantul mendarat
add(17.44, tick(680, 0.045))
add(18.0, tick(760, 0.045))
add(18.6, tick(620, 0.05))                 # teman ketiga mendarat
for i, tc in enumerate([18.4, 19.0, 19.6]):  # ubin asli, cacah, bulat
    add(tc, tick(640 + i * 90, 0.05))
add(19.95, whoosh(0.3, True, 0.04))
add(20.0, tick(700, 0.05))                 # ubin rasional
add(20.0, chime(660.0, 0.08))
add(19.3, tick(880, 0.05))                 # panel pesan "lima kelompok!"
add(23.45, whoosh(0.3, True, 0.04))
add(23.5, tick(760, 0.05))                 # ubin irasional
add(23.5, chime(880.0, 0.08))
add(23.5, boom(0.10))
add(23.47, boom(0.06))                     # beat emas "irasional"
add(23.5, noise_band(0.10, 1000, 3000) * 0.55, 0.0, 0.05)
add(17.7, whoosh(0.5, False, 0.07))        # bola tenggelam di garis nol
add(26.0, tick(900, 0.05))                 # panel keluarga
add(26.3, chime(523.25, 0.12))
add(27.0, tick(760, 0.045))
add(27.3, tick(1050, 0.06))
add(27.3, boom(0.06))
for ts in [27.0, 28.2, 29.4, 30.6, 31.8]:  # lima baris keluarga
    add(ts, tick(900, 0.085))
    add(ts + 0.02, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(29.7, boom(0.14))                      # beat emas "persoalan tidak selalu sama"
add(32.0, tick(700, 0.045))
add(33.3, tick(500, 0.05))                 # keluarga turun podium & pamit
add(33.9, whoosh(0.5, False, 0.045))
add(35.5, tick(760, 0.045))                # "matematika tumbuh mencari cara"
add(36.7, whoosh(0.35, True, 0.05))        # panel persamaan 1/2+1/2=1
add(36.7, tick(1200, 0.06))
add(36.9, boom(0.06))
add(38.6, tick(500, 0.05))                 # bola terbelah dua
add(38.95, tick(620, 0.05))
add(39.3, chime(1318.5, 0.10))             # menyatu jadi satu
add(39.4, boom(0.10))                      # "cara bebas, hasil sesuai aturan"
add(40.9, tick(760, 0.045))                # panel toko CTA
add(40.6, whoosh(0.6, True, 0.05))         # keluarga kembali menggelinding masuk
add(41.0, tick(640, 0.045))
add(41.4, tick(700, 0.04))
add(44.2, boom(0.08))                      # pertanyaan besar
add(44.3, tick(700, 0.045))
add(45.8, chime(523.25, 0.06))             # AKIOMIDA.COM reveal tenang di akhir
add(45.8, whoosh(0.5, True, 0.03))
add(47.5, whoosh(0.6, True, 0.07))
add(47.55, chime(880.0, 0.13))             # pil TULIS DI KOMEN
add(48.2, chime(1318.5, 0.07))
add(48.6, whoosh(0.5, True, 0.05))         # bar gradien menyapu
add(48.65, tick(700, 0.045))
add(48.95, tick(240, 0.05))                # lompatan perayaan
add(50.2, chime(440.0, 0.09))

# ---------- master ----------
mix = np.stack([mixL, mixR])
mix = np.tanh(mix * 1.25) / 1.25
peak = np.max(np.abs(mix))
mix = mix / peak * 0.86
fi = int(0.25 * SR)
mix[:, :fi] *= np.linspace(0, 1, fi)
fo = int(1.0 * SR)
mix[:, -fo:] *= np.linspace(1, 0, fo) ** 1.4

data = (mix.T * 32767).astype(np.int16)
with wave.open(OUT, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(data.tobytes())
print(f"audio OK: {OUT} ({DUR}s, peak {peak:.2f})")
