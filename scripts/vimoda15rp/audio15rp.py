#!/usr/bin/env python3
"""Musik & SFX prosedural rev7 untuk video 15 FORMAT RP "Misteri Pembagi Rapi".
Bahasa audio chat story dari riset: pop bubble per karakter (pitch berbeda
per peran), tick typing sebelum tiap pesan, whoosh diagram menyala ala
anime sains, boom twist, shimmer emoji burst, fanfare endcard. Nada D MINOR
malam ajaib saat misteri dan petunjuk, berubah F MAJOR hangat saat TERIMA
KASIH (75.3). JEDA MA 55.8-57.0 hening total sebelum twist (typing indicator
"menyusun jurus"). Durasi 106.0 s: diperpanjang dari 84 s supaya tiap bubble
sempat dibaca (keluhan pemilik rev7: bacaan belum kebaca sudah terganti).
Output: /tmp/render/audio.wav
"""
import numpy as np
import wave

SR = 44100
DUR = 106.0
N = int(SR * DUR)
OUT = "/tmp/render/audio.wav"

rng = np.random.default_rng(20261123)
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
    f = 74 * np.exp(-t / 0.055) + 40
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / 0.085) * level


def boom(level=0.22):
    dur = 0.9
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = 60 * np.exp(-t / 0.10) + 34
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
    mask = np.exp(-0.5 * ((fr - 1000) / 900) ** 2)
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


def pop(f, level=0.11):
    """pop bubble ala chat story: dua nada cepat naik."""
    s1 = sine(f, 0.05, a=0.002, d=0.018, harm=(1.0, 0.4))
    s2 = sine(f * 1.33, 0.09, a=0.002, d=0.03, harm=(1.0, 0.35))
    out = np.zeros(len(s1) + len(s2))
    out[: len(s1)] += s1
    out[len(s1):] += s2
    return out / (np.max(np.abs(out)) + 1e-9) * level


# ---------- PAD: D MINOR malam ajaib -> F MAJOR saat terima kasih ----------
D3, F3, A3, C4 = 146.83, 174.61, 220.0, 261.63
Bb2, Bb3, G3, D4 = 116.54, 233.08, 196.0, 293.66
SEG = [
    (0.0, 19.0, (D3, F3, A3)),        # misteri dibuka
    (19.0, 55.8, (Bb2, D3, F3)),      # petunjuk faktor dan kelipatan
    # 55.8 - 57.0 : ma, hening total (typing menyusun jurus)
    (57.0, 75.3, (G3, Bb3, D4)),      # twist dan rencana terima kasih
    (75.3, 106.0, (F3, A3, C4)),      # TERIMA KASIH: hangat F major
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
            g = 0.05
            i0 = int(t0 * SR)
            nn = min(n, N - i0)
            if side == "L":
                mixL[i0:i0 + nn] += sig[:nn] * e[:nn] * g
            else:
                mixR[i0:i0 + nn] += sig[:nn] * e[:nn] * g
    sub = np.sin(2 * np.pi * notes[0] / 2 * t) * e * 0.07
    add(t0, sub, 0.0)

# ---------- arpeggio chat lofi ----------
DM_SCALE = [293.66, 349.23, 392.0, 440.0, 523.25, 587.33]
F_SCALE = [349.23, 440.0, 523.25, 587.33, 698.46, 783.99]
step = 0.30
kk = 0
for (lo, hi, scale) in ((0.4, 55.6, DM_SCALE), (57.0, 75.1, DM_SCALE), (75.5, 100.5, F_SCALE)):
    tt = lo
    while tt < hi:
        f = scale[(kk * 2 + (kk % 7)) % len(scale)]
        s = sine(f, 0.28, a=0.004, d=0.16, harm=(1.0, 0.35))
        add(tt, s, 0.35 * np.sin(kk * 1.1), 0.045)
        kk += 1
        tt += step

# ---------- kick & hat (hening saat ma) ----------
for (lo, hi) in ((0.4, 55.6), (57.0, 75.1)):
    tt = lo
    while tt < hi:
        add(tt, kick(0.16), 0.0)
        add(tt + 0.30, noise_band(0.05, 5000, 9000) * 0.9, 0.15, 0.04)
        tt += 0.60
tt = 75.4
while tt < 101.0:
    add(tt, kick(0.12), 0.0)
    tt += 1.4

# ---------- momen kunci RP ----------
POP_F = {"KIOS": 523.0, "MENTOR": 659.0, "KAMU": 740.0, "MYST": 880.0}
MSGS = [
    (1.4, "KIOS", "photo"), (5.2, "KIOS", "text"), (9.2, "KAMU", "text"),
    (12.6, "KIOS", "text"), (16.0, "MENTOR", "text"), (19.2, "MENTOR", "text"),
    (26.4, "KAMU", "text"), (30.6, "MENTOR", "text"), (34.0, "KIOS", "photo"),
    (41.0, "KAMU", "text"), (45.0, "MENTOR", "text"), (48.8, "KIOS", "text"),
    (52.2, "MYST", "text"), (61.5, "MENTOR", "sticker"),
    (64.7, "MENTOR", "text"), (68.9, "KIOS", "text"), (72.3, "MYST", "text"),
    (75.5, "KIOS", "photo"), (78.9, "MYST", "text"), (81.9, "MENTOR", "text"),
    (85.3, "MYST", "text"), (97.3, "MENTOR", "text"),
]
add(0.35, boom(0.20))                      # dunia RUANG SAPA menyala
add(0.4, whoosh(0.5, True, 0.05))
for i, f in enumerate((392.0, 494.0, 587.0)):   # avatar grup terbentuk
    add(0.5 + i * 0.10, tick(f, 0.05))
for (t0, who, kind) in MSGS:
    add(t0 - 0.42, tick(980, 0.045))       # typing indicator menyala
    add(t0 - 0.20, tick(1040, 0.035))
    add(t0, pop(POP_F[who], 0.10 if kind == "text" else 0.12))
    if who == "MYST":
        add(t0 + 0.05, chime(1046.5, 0.05))  # pesan misteri berkilau lembut
    if kind == "photo":
        for j in range(4):                 # foto: baris permen menempel
            add(t0 + 0.12 + j * 0.10, tick(700 + j * 60, 0.04))
    if kind == "sticker":
        add(t0, whoosh(0.5, True, 0.07))
        for f, dt in ((523.25, 0.0), (659.26, 0.12), (783.99, 0.24)):
            add(t0 + dt, chime(f, 0.09))   # stiker jurus bernama
add(41.1, chime(1174.66, 0.06))            # burst reaksi kagum (pola kelipatan)
add(75.8, chime(1046.5, 0.07))             # foto kejutan 24: burst konfeti
for f, dt in ((1318.5, 0.10), (1568.0, 0.20), (1046.5, 0.30)):
    add(75.9 + dt, chime(f, 0.05))
add(79.1, chime(880.0, 0.05))              # MYST melambai terima kasih
# divider bab
for (t0, _txt) in ((0.4, "x"), (19.0, "x"), (30.4, "x"), (61.3, "x"), (75.3, "x")):
    add(t0, tick(880, 0.05))
# DIAGRAM MENYALA 1: FAKTOR 12 (22.8-26.2)
add(22.8, whoosh(0.5, True, 0.10))
add(22.85, chime(440.0, 0.11))
for i in range(6):
    add(23.0 + i * 0.12, tick(560 + i * 46, 0.05))
add(23.8, tick(900, 0.06))
add(24.6, chime(523.25, 0.08))             # 13 dibagi 3 sisa 1 jadi hadiah
add(26.0, whoosh(0.35, False, 0.05))
# DIAGRAM MENYALA 2: KELIPATAN 4 (37.4-40.8)
add(37.4, whoosh(0.5, True, 0.10))
add(37.45, chime(494.0, 0.10))
for i in range(6):
    add(37.6 + i * 0.12, tick(620 + i * 42, 0.05))
add(38.4, tick(920, 0.06))
add(38.8, chime(587.33, 0.09))             # 12 kelipatan 4 sekaligus faktor 12
add(40.6, whoosh(0.35, False, 0.05))
# MA 55.8-57.0: hening (typing menyusun jurus)
add(55.8, whoosh(0.5, False, 0.07))
for t0 in (55.2, 55.54, 55.88, 56.22, 56.56):   # tremolo pra-twist
    add(t0, tick(1100, 0.055))
# DIAGRAM TWIST: TERBATAS VS TANPA BATAS (57.1-61.1, chip slow-motion)
add(57.1, boom(0.30))
add(57.12, chime(440.0, 0.13))
add(57.1, whoosh(0.4, True, 0.05))
for i in range(4):
    add(57.35 + i * 0.24, tick(600 + i * 40, 0.05))
add(58.4, tick(900, 0.06))
add(58.9, tick(980, 0.06))
add(59.4, chime(523.25, 0.10))             # cara terbatas peluang tanpa batas
add(60.9, whoosh(0.35, False, 0.05))
add(69.0, tick(760, 0.05))                 # stokku isi 24 malam ini
add(82.1, chime(523.25, 0.10))             # kasus selesai: pembagi rapi semua orang
add(85.5, tick(880, 0.06))                 # aku gak sendirian lagi
# OVERLAY MISI BARU
add(88.35, whoosh(0.6, True, 0.08))
add(88.4, tick(880, 0.07))
for i in range(4):
    add(90.6 + i * 0.16, tick(640 + i * 80, 0.05))
add(92.2, kick(0.26))
for i in range(8):
    add(92.6 + i * 0.1, tick(580 + i * 70, 0.05))
add(94.2, tick(760, 0.045))                # catatan kartu bantu misi nomor satu
add(94.05, whoosh(0.6, True, 0.07))
add(94.1, chime(880.0, 0.12))              # pil JAWAB DI KOLOM KOMENTAR YA
add(96.6, whoosh(0.6, False, 0.06))        # papan misi keluar (aturan 28)
add(97.3, chime(392.0, 0.09))              # teaser: kios sebelah
add(101.15, whoosh(0.5, True, 0.03))
for f, dt in ((349.23, 0.0), (440.0, 0.25), (523.25, 0.5), (698.46, 0.75)):
    add(101.3 + dt, chime(f, 0.09))        # fanfare endcard
add(103.7, tick(700, 0.045))               # bar gradien menyapu
add(103.8, chime(1046.5, 0.06))

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
