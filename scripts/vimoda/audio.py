#!/usr/bin/env python3
"""Musik & SFX prosedural untuk video 05 "Angka, Bilangan, dan Nomor".
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


# ---------- PAD / chord progress ----------
A2, C3, E3, F2, G2, B2, D3, C4 = 110.0, 130.81, 164.81, 87.31, 98.0, 123.47, 146.83, 261.63
SEG = [
    (0.0, 5.2, (A2, C3, E3)),
    (5.2, 12.4, (F2, A2, C3)),
    (12.4, 22.0, (C3 - 0, E3, 196.0)),
    (22.0, 31.6, (G2, B2, D3)),
    (31.6, 42.2, (A2, C3, E3)),
    (42.2, 47.2, (F2, A2, C3)),
    (47.2, 52.0, (C3, E3, 196.0)),
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

# ---------- arpeggio 12.4 - 42.2 ----------
SCALE = [220.0, 261.63, 329.63, 392.0, 440.0, 523.25]
step = 0.30
tt = 12.4
k = 0
while tt < 42.0:
    f = SCALE[(k * 3 + (k % 5)) % len(SCALE)]
    s = sine(f, 0.30, a=0.004, d=0.16, harm=(1.0, 0.35))
    pan = 0.35 * np.sin(k * 1.1)
    add(tt, s, pan, 0.052)
    k += 1
    tt += step

# ---------- kick & hat ----------
tt = 12.4
while tt < 42.0:
    add(tt, kick(), 0.0)
    add(tt + 0.3, noise_band(0.05, 5000, 9000) * 0.9, 0.15, 0.05)
    tt += 0.6
tt = 42.2
while tt < 51.5:
    add(tt, kick(0.14), 0.0)
    tt += 1.2

# ---------- momen kunci ----------
add(0.30, boom(0.24))                      # hook: "7 7 7" menghantam
add(0.30, whoosh(0.5, True, 0.05))
for i, tc in enumerate([1.0, 1.18, 1.36]):  # kartu apel, papan, antrean
    add(tc, sine([440.0, 523.25, 659.26][i], 0.4, a=0.004, d=0.24, harm=(1.0, 0.4)), 0.0, 0.10)
add(3.95, whoosh(0.5, True, 0.07))         # tanda tanya merah
add(4.00, tick(1100, 0.07))
add(5.85, tick(760, 0.05))                 # head "angka adalah simbol"
for i in range(10):                        # angka 0 sampai 9 berjalan
    add(6.5 + i * 0.07, tick(900 + i * 55, 0.045))
add(9.9, tick(520, 0.05))                  # "cuma 0 sampai 9"
add(13.9, boom(0.08))                      # kartu bilangan mendarat
for i in range(7):                         # tujuh apel satu per satu
    add(14.2 + i * 0.1, tick(1000 + i * 90, 0.05))
for ts in [15.4, 17.2]:                    # ganti jeruk, lalu buku
    add(ts - 0.05, whoosh(0.35, True, 0.05))
    add(ts, tick(950, 0.07))
add(18.3, boom(0.10))                      # punch "nilai tetap"
add(20.3, tick(760, 0.045))                # garis jumlah, ukuran, urutan
add(22.5, whoosh(0.5, True, 0.06))         # tahap "punggung 10"
for ts in [24.4, 26.2, 28.0]:              # pergantian tahap
    add(ts, tick(900, 0.085))
    add(ts + 0.02, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(28.0, boom(0.14))                      # "CUMA PENANDA."
for tw in [4.6, 11.9, 21.5, 31.0, 41.9]:   # transisi antar adegan
    add(tw, whoosh(0.85, True, 0.12), 0.0)
# riser 29.0 - 31.6
rdur = 2.6
rn = int(rdur * SR)
rx = noise_band(rdur, 500, 3600)
ramp = np.linspace(0, 1, rn) ** 1.6
add(29.0, rx * ramp, 0.0, 0.10)
add(32.3, tick(1050, 0.06))                # angka 7 besar mendarat
add(32.3, boom(0.06))
for i, tc in enumerate([33.0, 33.35, 33.7]):  # chip apel, papan, nomor
    add(tc, tick(1100 + i * 90, 0.045))
add(36.9, boom(0.08))                      # denyut konteks + cincin
add(37.3, chime(660.0, 0.08))
add(38.4, boom(0.22))                      # "Maknanya ikut konteks."
add(40.3, tick(760, 0.045))                # garis ketelitian
add(45.6, whoosh(0.6, True, 0.07))
add(46.3, chime(880.0, 0.13))
add(46.9, chime(1318.5, 0.07))
add(51.0, chime(440.0, 0.09))

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
