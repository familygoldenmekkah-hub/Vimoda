#!/usr/bin/env python3
"""Musik & SFX prosedural rev1 untuk video 15 "Kios Permen: Faktor dan Kelipatan".
Dramaturgi anime diolah (aturan 34) dalam nada F MAJOR ceria khas kios pesta:
pad per bab, JEDA DRAMATIS (ma) 33.4-34.2 tanpa musik sebelum twist
"terbatas vs tanpa batas", tremolo pra-climax 31.6-33.28, impact sting 34.2,
run tangga nada saat jurus bagi rata, kick formasi tantangan, fanfare F-A-C-F.
Durasi 78.0 s (aturan 31). Cue mengikuti 23 beat narasi kios.
Output: /tmp/render/audio.wav (stereo 44100 Hz, 16-bit, 78.0 s)
"""
import numpy as np
import wave

SR = 44100
DUR = 78.0
N = int(SR * DUR)
OUT = "/tmp/render/audio.wav"

rng = np.random.default_rng(20261122)
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


# ---------- PAD / chord progress F MAJOR (MA: 33.4-34.2 SENYAP - jeda dramatis) ----------
F3, A3, C4 = 174.61, 220.0, 261.63
D3, Bb2, C3, E3, G3 = 146.83, 116.54, 130.81, 164.81, 196.0
SEG = [
    (0.0, 9.8, (F3, A3, C4)),
    (9.8, 22.8, (D3, F3, A3)),
    (22.8, 33.4, (Bb2, D3, F3)),
    # 33.4 - 34.2 : ma, hening total
    (34.2, 40.2, (F3, A3, C4)),
    (40.2, 50.0, (C3, E3, G3)),
    (50.0, 56.6, (Bb2, D3, F3)),
    (56.6, 78.0, (F3, A3, C4)),
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

# ---------- arpeggio F major dua rentang (berhenti sebelum ma, lanjut setelahnya) ----------
SCALE = [349.23, 440.0, 523.25, 587.33, 698.46, 783.99]
step = 0.26
k = 0
for (lo, hi) in ((9.8, 33.2), (34.4, 60.0)):
    tt = lo
    kk = k
    while tt < hi:
        f = SCALE[(kk * 2 + (kk % 7)) % len(SCALE)]
        s = sine(f, 0.26, a=0.004, d=0.14, harm=(1.0, 0.35))
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
        add(tt + 0.26, noise_band(0.05, 5000, 9000) * 0.9, 0.15, 0.05)
        tt += 0.52
tt = 60.0
while tt < 76.8:
    add(tt, kick(0.14), 0.0)
    tt += 1.3

# ---------- momen kunci (diselaraskan 23 beat narasi kios) ----------
CUT_TRANSITIONS = [9.8, 22.8, 40.2, 50.0, 56.6]
add(0.5, boom(0.24))                       # hook: kios menyala
add(0.5, whoosh(0.5, True, 0.05))
for i in range(3):                         # tiga stoples muncul
    add(1.0 + i * 0.12, tick(560 + i * 40, 0.06))
for j in range(12):                        # 12 permen terbang masuk (4-4-4)
    add(1.3 + (j // 4) * 0.12 + (j % 4) * 0.16, tick(760 + (j % 4) * 70, 0.05))
for i in range(12):                        # antrean 12 permen percobaan kedua
    add(3.4 + i * 0.05, tick(620 + i * 26, 0.04))
add(4.0, tick(880, 0.06))                  # permen ke-13 muncul
add(4.2, whoosh(0.4, True, 0.05))          # hop: ditolak stoples
add(4.8, tick(760, 0.06))                  # tanda tanya SISA
add(5.2, boom(0.12))                       # beat emas: sisa menyala
add(5.25, chime(440.0, 0.11))
add(6.4, chime(523.25, 0.10))              # stempel DUA BELAS RATA, TIGA BELAS SISA!
add(7.8, tick(1100, 0.06))                 # mentor mengangguk
for tw in CUT_TRANSITIONS:                 # perpindahan antar bab
    add(tw, whoosh(0.85, True, 0.12), 0.0)
add(33.4, whoosh(0.5, False, 0.08))        # dunia memudar ke ma (hening)
add(11.2, tick(820, 0.07))                 # baris besar: habis dibagi, nol sisa
add(12.0, tick(900, 0.085))                # baris: 12 dibagi 3 pas
add(12.02, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(12.5, tick(860, 0.06))                 # baris: faktor 12 ada enam
for i in range(6):                         # enam chip faktor 12
    add(13.6 + i * 0.14, tick(560 + i * 46, 0.05))
add(17.6, tick(760, 0.05))                 # cek gagal: 12 dibagi 5 sisa 2
add(18.8, tick(700, 0.05))                 # 13 bandel: cuma 1 dan 13
add(24.0, tick(880, 0.075))                # baris besar: 4 x 1, 2, 3, ...
add(24.8, tick(900, 0.085))                # baris deret kelipatan
add(24.82, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(25.4, tick(860, 0.06))                 # baris: 12 masuk karena 4 x 3
for rd in range(5):                        # lima ronde hujan permen +4 ke stoples besar
    add(26.2 + rd * 1.0, whoosh(0.3, True, 0.035))
    for j in range(4):
        add(26.2 + rd * 1.0 + j * 0.12, tick(700 + rd * 60 + j * 40, 0.05))
    add(26.2 + rd * 1.0, tick(980, 0.05))  # chip kelipatan muncul
add(31.2, tick(760, 0.05))                 # catatan: terus terusan tanpa ujung
# tremolo pra-climax ala anime menuju ma
for t0 in (31.6, 31.98, 32.34, 32.68, 33.0, 33.28):
    add(t0, tick(1100, 0.06))
add(34.2, boom(0.30))                      # TWIST: impact frame + speedlines
add(34.25, chime(440.0, 0.13))
add(34.2, whoosh(0.4, True, 0.05))
add(34.8, tick(680, 0.075))                # baris besar: terbatas vs tanpa batas
add(35.7, tick(900, 0.075))                # baris: faktor 6 cuma empat
add(37.2, chime(523.25, 0.11))             # baris: kelipatan 6 terus
add(38.6, tick(760, 0.05))                 # catatan: faktor berhenti, kelipatan terus
add(41.2, tick(880, 0.06))                 # baris besar: satu kali dua peran
add(41.8, tick(1000, 0.085))               # baris emas: 4 x 3 = 12
add(41.82, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(42.8, tick(860, 0.06))                 # 4 dan 3: faktor 12
add(43.6, tick(920, 0.06))                 # 12: kelipatan keduanya
add(46.2, tick(760, 0.05))                 # catatan: coba cek 6 x 5 = 30
add(47.4, boom(0.13))                      # beat emas
# power-up ala anime: run tangga F major menaik saat jurus (51.4-52.3)
RUN = [349.23, 392.0, 440.0, 466.16, 523.25, 587.33, 659.26, 698.46]
for i, f in enumerate(RUN):
    add(51.4 + i * 0.12, sine(f, 0.22, a=0.003, d=0.12) * 0.07, 0.1 * np.sin(i))
add(51.0, tick(880, 0.06))                 # baris besar: 24 permen pembagi rata
add(51.6, tick(900, 0.085))                # baris: 2 dapat 12, 3 dapat 8
add(51.62, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(53.4, tick(860, 0.085))                # baris: 4 dapat 6, 6 dapat 4
add(53.42, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
# susunan piring: 2, 3, 4, 6 porsi (permen tersusun ulang)
for k, tt2 in enumerate((51.8, 52.8, 53.8, 54.8)):
    add(tt2, whoosh(0.35, True, 0.04))
    add(tt2, tick(640 + k * 90, 0.055))
add(52.6, whoosh(0.5, True, 0.07))         # stempel JURUS BAGI RATA!
add(52.65, chime(698.46, 0.11))
add(54.0, tick(760, 0.045))                # catatan: sisa nol semua senang
add(54.6, tick(820, 0.045))                # catatan: faktor 24 ada delapan
for i in range(4):                         # empat soal bernomor muncul
    add(57.8 + i * 0.18, tick(640 + i * 80, 0.05))
add(59.6, kick(0.26))                      # formasi tantangan dimulai
for i in range(8):                         # delapan kartu masuk dari kiri-kanan
    add(59.8 + i * 0.12, tick(580 + i * 70, 0.05))
add(61.4, tick(760, 0.045))                # catatan: kartu bantu soal nomor satu
add(63.0, whoosh(0.6, True, 0.07))
add(63.05, chime(880.0, 0.12))             # pil JAWAB DI KOLOM KOMENTAR YA
add(68.0, whoosh(0.6, False, 0.06))        # konten keluar layar (aturan 28)
add(68.2, whoosh(0.5, True, 0.03))
# fanfare kecil ala ending anime: F-A-C-F di endcard
for f, dt in ((349.23, 0.0), (440.0, 0.25), (523.25, 0.5), (698.46, 0.75)):
    add(68.3 + dt, chime(f, 0.09))
add(67.9, chime(440.0, 0.08))              # terima kasih sudah menonton
add(73.4, chime(523.25, 0.08))             # teaser: kisah angka berikutnya sudah menunggu
add(73.8, tick(700, 0.045))                # bar gradien menyapu
add(73.9, chime(1046.5, 0.06))

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
