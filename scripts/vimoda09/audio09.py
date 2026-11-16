#!/usr/bin/env python3
"""Musik & SFX prosedural untuk video 09 "Huyuan: Mengenal Bilangan Bulat".
Cue diselaraskan ke 16 beat narasi huyuan; batas bab musik mengikuti enam judul
(hook, bulat, kenapa minus, lebih besar, bukan pecahan, uji lift). Output:
/tmp/render/audio.wav (stereo 44100 Hz, 16-bit, 52.0 s)
"""
import numpy as np
import wave

SR = 44100
DUR = 52.0
N = int(SR * DUR)
OUT = "/tmp/render/audio.wav"

rng = np.random.default_rng(20261116)
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


def ding(level=0.12):
    """dua nada lift berpacu: nada tinggi lalu rendah"""
    out = np.zeros(int(0.9 * SR))
    a = sine(880.0, 0.45, a=0.003, d=0.20, harm=(1.0, 0.4)) * level / 0.12
    b = sine(659.26, 0.6, a=0.003, d=0.30, harm=(1.0, 0.4)) * level / 0.12
    out[: len(a)] += a
    out[int(0.16 * SR): int(0.16 * SR) + len(b)] += b[: len(out) - int(0.16 * SR)]
    return out


# ---------- PAD / chord progress (batas bab mengikuti scene menara lift) ----------
A2, C3, E3, F2, G2, B2, D3 = 110.0, 130.81, 164.81, 87.31, 98.0, 123.47, 146.83
SEG = [
    (0.0, 6.6, (A2, C3, E3)),
    (6.6, 17.3, (F2, A2, C3)),
    (17.3, 32.7, (C3, E3, 196.0)),
    (32.7, 40.6, (G2, B2, D3)),
    (40.6, 44.3, (A2, C3, E3)),
    (44.3, 52.0, (C3, E3, 196.0)),
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

# ---------- arpeggio 6.6 - 44.0 ----------
SCALE = [220.0, 261.63, 329.63, 392.0, 440.0, 523.25]
step = 0.30
tt = 6.6
k = 0
while tt < 44.0:
    f = SCALE[(k * 3 + (k % 5)) % len(SCALE)]
    s = sine(f, 0.30, a=0.004, d=0.16, harm=(1.0, 0.35))
    pan = 0.35 * np.sin(k * 1.1)
    add(tt, s, pan, 0.052)
    k += 1
    tt += step

# ---------- kick & hat ----------
tt = 6.6
while tt < 44.0:
    add(tt, kick(), 0.0)
    add(tt + 0.3, noise_band(0.05, 5000, 9000) * 0.9, 0.15, 0.05)
    tt += 0.6
tt = 44.3
while tt < 51.5:
    add(tt, kick(0.14), 0.0)
    tt += 1.2

# ---------- momen kunci (diselaraskan beat narasi huyuan) ----------
CUT_TRANSITIONS = [6.6, 17.3, 32.7, 40.6, 44.3]
add(0.5, boom(0.24))                       # hook: tujuh chip angka + judul
add(0.5, whoosh(0.5, True, 0.05))
for i in range(7):                          # tujuh chip angka muncul
    add(0.9 + i * 0.12, tick(500 + i * 40, 0.05))
add(2.6, whoosh(0.8, False, 0.045))        # salju berdesir lewat kaca
add(3.0, chime(660.0, 0.10))               # stempel SEMUA BILANGAN BULAT
add(4.9, tick(1100, 0.06))                 # mentor mengangguk di hook
for tw in CUT_TRANSITIONS:                 # perpindahan antar bab
    add(tw, whoosh(0.85, True, 0.12), 0.0)
add(7.5, tick(900, 0.085))                 # baris NEGATIF
add(7.52, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(8.5, tick(900, 0.085))                 # baris NOL
add(8.52, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(9.5, tick(900, 0.085))                 # baris POSITIF
add(9.52, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(10.8, tick(760, 0.045))                # catatan stabilo menyala
add(14.5, boom(0.08))                      # beat emas "nol bukan positif bukan negatif"
add(14.55, tick(1050, 0.06))
add(18.2, whoosh(0.4, True, 0.05))         # termometer muncul
add(20.4, whoosh(1.4, False, 0.09))        # raksa turun 4 ke minus 5
for i in range(6):                         # mentor menggigil: shimmer dingin
    add(20.6 + i * 0.17, tick(1300 + i * 60, 0.04))
add(21.9, tick(760, 0.05))                 # chip 4 - 9 = -5
add(22.4, chime(587.33, 0.09))
for gt, gf in [(24.2, 500), (24.6, 700), (25.0, 460), (25.4, 420)]:
    add(gt, tick(gf, 0.055))               # plak +3, 0, -1, -2 menyala
add(25.6, whoosh(1.2, False, 0.07))        # mobil demo turun 1 ke -1
add(28.2, boom(0.10))                      # beat emas "di bawah titik acuan"
add(28.25, tick(880, 0.06))
add(29.5, whoosh(0.8, True, 0.05))         # mobil kembali ke 0
for i in range(11):                        # garis bilangan menyala -5 sampai 5
    add(33.0 + i * 0.08, tick(600 + i * 45, 0.04))
add(33.6, tick(300, 0.07))                 # chip -5 mendarat
add(33.9, tick(380, 0.07))                 # chip -2 mendarat
add(34.6, whoosh(1.0, True, 0.08))         # -2 meluncur ke kanan (lebih besar)
add(38.0, tick(900, 0.06))                 # panel rantai -5 < -2 < 0 < 2 < 5
add(38.05, chime(523.25, 0.10))
add(38.6, boom(0.14))                      # beat emas "makin kanan makin besar"
add(41.3, tick(900, 0.085))                # baris BULAT (centang)
add(41.32, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(41.9, tick(300, 0.075))                # baris BUKAN BULAT (silang, nada rendah)
add(42.6, tick(760, 0.05))                 # catatan TANPA PECAHAN TANPA DESIMAL
add(44.5, tick(700, 0.05))                 # chip 2 - 5 = ?
add(44.8, whoosh(0.5, True, 0.05))         # mobil naik ke lantai 2
add(44.35, tick(520, 0.05))                # mentor melangkah masuk lift
add(45.9, whoosh(1.5, False, 0.10))        # lift turun 5 lantai
add(47.4, ding(0.13))                      # lift tiba di lantai -3
add(47.5, tick(240, 0.06))                 # tanda tanya emas besar
add(47.7, whoosh(0.6, True, 0.07))
add(47.75, chime(880.0, 0.12))             # pil JAWAB DI KOMEN
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
