#!/usr/bin/env python3
"""Musik & SFX prosedural rev3 untuk video 14 "Petak Tanam: Bilangan Prima dan Komposit".
Dramaturgi anime diolah (aturan 34): pad per bab, JEDA DRAMATIS (ma) 33.4-34.2 tanpa musik
sebelum twist angka 1, tremolo pra-climax 31.2-33.2 yang makin cepat, impact sting 34.2,
run power-up saat jurus urai prima, kick formasi tantangan, fanfare kecil di endcard.
Durasi 78.0 s mengikuti kebutuhan pemahaman (aturan 31). Cue mengikuti 21 beat narasi rev3.
Output: /tmp/render/audio.wav (stereo 44100 Hz, 16-bit, 78.0 s)
"""
import numpy as np
import wave

SR = 44100
DUR = 78.0
N = int(SR * DUR)
OUT = "/tmp/render/audio.wav"

rng = np.random.default_rng(20261121)
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


# ---------- PAD / chord progress (E minor; MA: 33.4-34.2 SENYAP - jeda dramatis) ----------
E3, G3, B2, C3, G2, D3, Fs3, A2 = 164.81, 196.0, 123.47, 130.81, 98.0, 146.83, 185.0, 110.0
SEG = [
    (0.0, 9.8, (E3, G3, B2)),
    (9.8, 22.8, (C3, E3, G2)),
    (22.8, 33.4, (D3, Fs3, A2)),
    # 33.4 - 34.2 : ma, hening total
    (34.2, 40.2, (E3, G3, B2)),
    (40.2, 49.4, (G2, B2, D3)),
    (49.4, 56.0, (C3, E3, G3)),
    (56.0, 78.0, (E3, G3, B2)),
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

# ---------- arpeggio dua rentang (berhenti sebelum ma, lanjut setelahnya) ----------
SCALE = [329.63, 392.0, 440.0, 493.88, 587.33, 659.26]
step = 0.28
k = 0
for (lo, hi) in ((9.8, 33.2), (34.4, 60.0)):
    tt = lo
    kk = k
    while tt < hi:
        f = SCALE[(kk * 2 + (kk % 7)) % len(SCALE)]
        s = sine(f, 0.28, a=0.004, d=0.15, harm=(1.0, 0.35))
        pan = 0.35 * np.sin(kk * 1.1)
        add(tt, s, pan, 0.05)
        kk += 1
        tt += step
    k = kk

# ---------- kick & hat (juga berhenti saat ma) ----------
for (lo, hi) in ((9.8, 33.2), (34.4, 60.0)):
    tt = lo
    while tt < hi:
        add(tt, kick(), 0.0)
        add(tt + 0.28, noise_band(0.05, 5000, 9000) * 0.9, 0.15, 0.05)
        tt += 0.56
tt = 60.0
while tt < 76.8:
    add(tt, kick(0.14), 0.0)
    tt += 1.3

# ---------- momen kunci (diselaraskan 21 beat narasi petak rev3) ----------
CUT_TRANSITIONS = [9.8, 22.8, 40.2, 49.4, 56.0]
add(0.5, boom(0.24))                       # hook: rumah tanam menyala
add(0.5, whoosh(0.5, True, 0.05))
for i in range(8):                         # delapan pot muncul
    add(1.0 + i * 0.15, tick(520 + i * 40, 0.055))
add(2.55, whoosh(0.45, True, 0.04))        # empat pot turun: susunan 2 x 4
for i in range(4):                         # pot mendarat di baris kedua
    add(2.7 + i * 0.15, tick(420 + i * 30, 0.05))
for i in range(7):                         # tujuh pot baris bawah
    add(3.7 + i * 0.12, tick(500 + i * 34, 0.045))
add(4.8, tick(760, 0.06))                  # tanda tanya: tujuh tak bisa petak
add(5.2, boom(0.12))                       # beat emas: semua pot menyala
add(5.25, chime(587.33, 0.11))
add(6.4, chime(660.0, 0.10))               # stempel DELAPAN BISA, TUJUH TIDAK
add(7.8, tick(1100, 0.06))                 # mentor mengangguk di hook
for tw in CUT_TRANSITIONS:                 # perpindahan antar bab
    add(tw, whoosh(0.85, True, 0.12), 0.0)
add(33.4, whoosh(0.5, False, 0.08))        # dunia memudar ke ma (hening)
add(11.2, tick(800, 0.07))                 # baris besar: tepat 2 faktor
add(12.0, tick(900, 0.085))                # baris faktor 1 dan dirinya
add(12.02, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
for i in range(8):                         # delapan chip deret prima
    add(14.4 + i * 0.14, tick(540 + i * 38, 0.045))
add(17.6, tick(880, 0.05))                 # cek bahan: faktor 5 hanya 1 dan 5
add(18.0, tick(960, 0.05))                 # cek bahan: faktor 7 hanya 1 dan 7
add(24.0, tick(880, 0.075))                # baris besar: lebih dari 2 faktor
add(24.8, tick(900, 0.085))                # baris faktor lebih dari dua
add(24.82, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
for i in range(8):                         # delapan chip deret komposit
    add(26.2 + i * 0.14, tick(540 + i * 38, 0.045))
for i in range(6):                         # enam faktor 12: 1, 2, 3, 4, 6, 12
    add(29.0 + i * 0.08, tick(600 + i * 60, 0.05))
add(31.0, tick(720, 0.05))                 # cek bahan: faktor 9 = 1, 3, 9
# tremolo pra-climax ala anime: tick makin cepat menuju ma
for t0 in (31.6, 31.98, 32.34, 32.68, 33.0, 33.28):
    add(t0, tick(1100, 0.06))
add(34.2, boom(0.30))                      # TWIST: impact frame + speedlines
add(34.25, chime(587.33, 0.13))
add(34.2, whoosh(0.4, True, 0.05))
add(34.8, tick(660, 0.075))                # baris besar: 1 = satu faktor
add(35.7, tick(900, 0.075))                # baris: prima butuh tepat dua
add(37.2, chime(659.26, 0.11))             # verdict: bukan prima, bukan komposit
add(38.6, tick(760, 0.05))                 # catatan: bagian yang sering terlewat
add(41.2, tick(900, 0.085))                # baris genap lebih dari 2
add(41.22, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(42.8, tick(860, 0.085))                # baris jadi komposit
add(42.82, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
for i in range(4):                         # empat chip genap komposit
    add(44.0 + i * 0.2, tick(600 + i * 70, 0.055))
add(46.2, tick(760, 0.05))                 # catatan: 2 cuma faktor 1 dan 2
add(47.4, boom(0.14))                      # beat emas: 2 prima genap tunggal
# power-up ala anime: run tangga nada menaik saat jurus (50.6-51.5)
RUN = [523.25, 587.33, 659.26, 698.46, 783.99, 880.0, 987.77, 1046.5]
for i, f in enumerate(RUN):
    add(50.6 + i * 0.12, sine(f, 0.22, a=0.003, d=0.12) * 0.07, 0.1 * np.sin(i))
for t0 in (51.0, 51.6, 52.2):              # tiga baris faktorisasi
    add(t0, tick(900, 0.085))
    add(t0 + 0.02, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(51.8, whoosh(0.5, True, 0.07))         # stempel JURUS URAI PRIMA!
add(51.85, chime(880.0, 0.11))
add(53.8, tick(760, 0.045))                # catatan: hasilnya selalu unik
add(54.4, tick(820, 0.045))                # catatan: basis teori bilangan
for i in range(4):                         # empat soal bernomor muncul
    add(57.2 + i * 0.18, tick(620 + i * 80, 0.05))
add(59.2, kick(0.26))                      # formasi tantangan dimulai
for i in range(8):                         # delapan kartu masuk dari kiri-kanan
    add(59.4 + i * 0.12, tick(560 + i * 70, 0.05))
add(61.0, tick(760, 0.045))                # catatan: semuanya bilangan asli
add(62.6, whoosh(0.6, True, 0.07))
add(62.65, chime(880.0, 0.12))             # pil JAWAB DI KOLOM KOMENTAR YA
add(68.0, whoosh(0.6, False, 0.06))        # konten keluar layar (aturan 28)
add(68.2, whoosh(0.5, True, 0.03))
# fanfare kecil ala ending anime: C-E-G-C di endcard
for f, dt in ((523.25, 0.0), (659.26, 0.25), (783.99, 0.5), (1046.5, 0.75)):
    add(68.3 + dt, chime(f, 0.09))
add(70.5, chime(440.0, 0.08))              # terima kasih sudah menonton
add(73.4, chime(587.33, 0.08))             # teaser: benih petak berikutnya sudah disemai
add(73.8, tick(700, 0.045))                # bar gradien menyapu
add(73.9, chime(1318.5, 0.06))

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
