#!/usr/bin/env python3
"""Musik & SFX prosedural untuk video 13 "Papasan: Bilangan Genap dan Ganjil".
Cue diselaraskan ke 16 beat narasi papasan; batas bab musik mengikuti enam
judul (hook pasangan sepatu, genap, ganjil, kejutan nol, angka akhir, pola,
uji). Output: /tmp/render/audio.wav (stereo 44100 Hz, 16-bit, 52.0 s)
"""
import numpy as np
import wave

SR = 44100
DUR = 52.0
N = int(SR * DUR)
OUT = "/tmp/render/audio.wav"

rng = np.random.default_rng(20261120)
mixL = np.zeros(N)
mixR = np.zeros(N)


def add(t0, sig, pan=0.0, gain=1.0):
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
    f = 72 * np.exp(-t / 0.055) + 38
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / 0.085) * level


def boom(level=0.22):
    dur = 0.9
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = 58 * np.exp(-t / 0.10) + 32
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) * np.exp(-t / 0.22)
    nz = noise_band(0.12, 60, 240)
    s[: len(nz)] += nz * 0.5 * np.exp(-np.arange(len(nz)) / (0.03 * SR))
    return s / (np.max(np.abs(s)) + 1e-9) * level


def whoosh(dur=0.85, up=True, level=0.13):
    n = int(dur * SR)
    x = rng.standard_normal(n)
    X = np.fft.rfft(x)
    fr = np.fft.rfftfreq(n, 1 / SR)
    mask = np.exp(-0.5 * ((fr - 950) / 850) ** 2)
    y = np.fft.irfft(X * mask, n)
    y /= (np.max(np.abs(y)) + 1e-9)
    t = np.linspace(0, 1, n)
    ts = t ** 1.7 if up else 1 - (1 - t) ** 1.7
    y = np.interp(ts, t, y)
    hann = np.sin(np.pi * t) ** 1.6
    return y * hann * level


def tick(f=900.0, level=0.09):
    s = sine(f, 0.07, a=0.002, d=0.02, harm=(1.0, 0.3))
    return s / (np.max(np.abs(s)) + 1e-9) * level


def chime(f=880.0, level=0.12):
    return sine(f, 1.6, a=0.002, d=0.5, harm=(1.0, 0.45, 0.18)) * level


# ---------- PAD / chord progress (rasa gudang papasan santai, D minor) ----------
D3, F3, A2, Bb2, C3, E3, G2, B2 = 146.83, 174.61, 110.0, 116.54, 130.81, 164.81, 98.0, 123.47
SEG = [
    (0.0, 6.6, (D3, F3, A2)),
    (6.6, 17.3, (Bb2, D3, F3)),
    (17.3, 32.7, (C3, E3, G2)),
    (32.7, 40.6, (F3, A2, C3)),
    (40.6, 44.3, (G2, B2, D3)),
    (44.3, 52.0, (D3, F3, A2)),
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
    sub = np.sin(2 * np.pi * notes[0] / 2 * t) * e * 0.075
    add(t0, sub, 0.0)

# ---------- arpeggio 6.6 - 44.0 ----------
SCALE = [293.66, 349.23, 392.0, 440.0, 523.25, 587.33]
step = 0.28
tt = 6.6
k = 0
while tt < 44.0:
    f = SCALE[(k * 2 + (k % 7)) % len(SCALE)]
    s = sine(f, 0.28, a=0.004, d=0.15, harm=(1.0, 0.35))
    pan = 0.35 * np.sin(k * 1.1)
    add(tt, s, pan, 0.05)
    k += 1
    tt += step

# ---------- kick & hat ----------
tt = 6.6
while tt < 44.0:
    add(tt, kick(), 0.0)
    add(tt + 0.28, noise_band(0.05, 5000, 9000) * 0.9, 0.15, 0.05)
    tt += 0.56
tt = 44.3
while tt < 51.5:
    add(tt, kick(0.14), 0.0)
    tt += 1.2

# ---------- momen kunci (diselaraskan beat narasi papasan) ----------
CUT_TRANSITIONS = [6.6, 17.3, 32.7, 40.6, 44.3]
add(0.5, boom(0.24))                       # hook: gudang papasan menyala
add(0.5, whoosh(0.5, True, 0.05))
for i in range(8):                         # delapan sepatu muncul
    add(1.0 + i * 0.14, tick(520 + i * 40, 0.055))
add(2.15, whoosh(0.35, True, 0.04))        # pasangan merapat (snap)
for i in range(7):                         # tujuh sepatu baris bawah
    add(2.8 + i * 0.09, tick(500 + i * 34, 0.045))
add(3.55, tick(760, 0.06))                 # tanda tanya: sepatu nanggung
add(4.0, boom(0.12))                       # beat emas: semua pasangan menyala
add(4.05, chime(587.33, 0.11))
add(4.6, chime(660.0, 0.10))               # stempel ADA PASANGAN, ADA NANGGUNG
add(5.9, tick(1100, 0.06))                 # mentor mengangguk di hook
for tw in CUT_TRANSITIONS:                 # perpindahan antar bab
    add(tw, whoosh(0.85, True, 0.12), 0.0)
add(7.3, tick(800, 0.07))                  # baris besar: habis dibagi 2, sisa 0
add(7.9, tick(900, 0.085))                 # baris deret genap
add(7.92, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
for i in range(8):                         # delapan chip deret genap
    add(9.9 + i * 0.12, tick(540 + i * 38, 0.045))
add(13.0, tick(880, 0.05))                 # hitung bahan: 8 dibagi 2 = 4
add(13.4, tick(960, 0.05))                 # hitung bahan: 12 dibagi 2 = 6
add(17.8, tick(880, 0.075))                # baris besar: dibagi 2, sisa 1
add(18.4, tick(900, 0.085))                # baris deret ganjil
add(18.42, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
for i in range(8):                         # delapan chip deret ganjil
    add(19.6 + i * 0.12, tick(540 + i * 38, 0.045))
add(22.5, tick(760, 0.05))                 # hitung bahan: 7 dibagi 2 sisa 1
add(22.9, tick(820, 0.05))                 # hitung bahan: 11 dibagi 2 sisa 1
add(26.0, boom(0.10))                      # beat emas: panel kejutan nol
add(26.05, chime(523.25, 0.10))
add(26.5, tick(660, 0.07))                 # baris besar: 0 dibagi 2 = 0
add(27.4, tick(900, 0.075))                # baris: sisanya 0 juga
add(28.5, chime(659.26, 0.10))             # verdict: 0 termasuk genap
add(29.4, tick(760, 0.05))                 # catatan: genap tak hanya mulai dari 2
add(33.5, tick(900, 0.085))                # baris akhiran genap
add(33.52, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(34.3, tick(860, 0.085))                # baris akhiran ganjil
add(34.32, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
for i in range(4):                         # empat chip contoh angka besar
    add(35.8 + i * 0.18, tick(600 + i * 70, 0.055))
add(37.8, tick(760, 0.05))                 # catatan: cuma lihat angka terakhirnya
add(38.6, boom(0.14))                      # beat emas: akhiran ganjil pasti ganjil
for t0 in [41.1, 41.6, 42.1]:              # tiga baris pola penjumlahan
    add(t0, tick(900, 0.085))
    add(t0 + 0.02, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(42.8, tick(760, 0.045))                # contoh: 6+8, 5+7, 6+5
add(43.2, tick(820, 0.045))                # alasan: ganjil = 2 x bulat + 1
for i in range(4):                         # empat soal bernomor muncul
    add(44.6 + i * 0.15, tick(620 + i * 80, 0.05))
for i in range(6):                         # enam kartu besar terurut nilai
    add(45.4 + i * 0.13, tick(560 + i * 95, 0.05))
add(46.4, tick(760, 0.045))                # catatan: semua ini bilangan bulat
add(47.7, whoosh(0.6, True, 0.07))
add(47.75, chime(880.0, 0.12))             # pil KIRIM JAWABANMU DI KOMENTAR YA
add(49.8, whoosh(0.6, False, 0.06))        # konten keluar layar (aturan 28)
add(50.15, chime(440.0, 0.09))             # terima kasih sudah menonton
add(50.2, whoosh(0.5, True, 0.03))
add(50.35, chime(523.25, 0.10))            # AKIOMIDA.COM muncul sendirian (aturan 28)
add(50.95, tick(700, 0.045))               # bar gradien menyapu
add(51.0, chime(1318.5, 0.06))

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
