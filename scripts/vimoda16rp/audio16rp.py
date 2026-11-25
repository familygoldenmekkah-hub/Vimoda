#!/usr/bin/env python3
"""Musik, SFX & VOICE ACTING rev15 - VIDEO 16 "LIPATAN KE-42: Bilangan
Berpangkat" (dunia GRUP BAHAS FYP). Semua waktu dari timing.json (TM,
dihitung timeline16rp.py dari durasi voice) - satu sumber kebenaran.

RESEP rev14-15 (hukum #42): palet malam lofi hangat - pad D MINOR malam,
arpeggio lembut, pop notifikasi bernada per chara (RAYA 587, BIMO 330,
DILA 494, KAMU 740, MYST 880), swell hangat di kartu babak (bukan boom
trailer), karpet tape noise sangat pelan, TANPA kick+hat ala klub.
rev15: 20 klip VOICE (voice16rp.py, engine edge-tts id-ID; adapter
VoiceStudio/z-ai tersedia) dimix di t0 tiap pesan + ducking otomatis:
bed diturunkan 55% selama voice berbicara. Hening total 1.0 s sebelum
diagram twist (MA), berubah F MAJOR hangat saat JAM 2 PAGI.
Output: /tmp/render/audio.wav (durasi = TM.dur)
"""
import json
import subprocess
import wave
from pathlib import Path

import numpy as np

SR = 44100
HERE = Path(__file__).parent
TM = json.loads((HERE / "timing.json").read_text())
DUR = float(TM["dur"])
N = int(SR * DUR)
OUT = "/tmp/render/audio.wav"
VDIR = Path("/tmp/voice16")
VOFF = float(TM["voff"])

rng = np.random.default_rng(20261123)
mixL = np.zeros(N)
mixR = np.zeros(N)
vocL = np.zeros(N)
vocR = np.zeros(N)


def add(t0, sig, pan=0.0, gain=1.0):
    i0 = int(t0 * SR)
    if i0 >= N:
        return
    n = min(len(sig), N - i0)
    gl = gain * np.sqrt(0.5 * (1 - pan))
    gr = gain * np.sqrt(0.5 * (1 + pan))
    mixL[i0:i0 + n] += sig[:n] * gl
    mixR[i0:i0 + n] += sig[:n] * gr


def addv(t0, sig, gain=1.0):
    i0 = int(t0 * SR)
    if i0 >= N:
        return
    n = min(len(sig), N - i0)
    vocL[i0:i0 + n] += sig[:n] * gain
    vocR[i0:i0 + n] += sig[:n] * gain


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


def whoosh(dur=0.85, up=True, level=0.06):
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


def tick(f=900.0, level=0.05):
    s = sine(f, 0.07, a=0.002, d=0.02, harm=(1.0, 0.3))
    return s / (np.max(np.abs(s)) + 1e-9) * level


def chime(f=880.0, level=0.08):
    return sine(f, 1.6, a=0.002, d=0.5, harm=(1.0, 0.45, 0.18)) * level


def pop(f, level=0.085):
    """pop notifikasi lembut ala chat story: dua nada cepat naik."""
    s1 = sine(f, 0.05, a=0.003, d=0.022, harm=(1.0, 0.25))
    s2 = sine(f * 1.33, 0.10, a=0.003, d=0.04, harm=(1.0, 0.22))
    out = np.zeros(len(s1) + len(s2))
    out[: len(s1)] += s1
    out[len(s1):] += s2
    return out / (np.max(np.abs(out)) + 1e-9) * level


def swell(f=87.31, level=0.10):
    """swell hangat untuk kartu babak: bass lembut naik-turun, bukan boom."""
    n = int(1.4 * SR)
    t = np.arange(n) / SR
    e = np.sin(np.pi * t / 1.4) ** 1.4
    s = np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * f * 2 * t)
    return s * e * level


# ---------- anchor waktu dari TM ----------
M = TM["m"]
DIV = [d[0] for d in TM["div"]]
FLASH = TM["flash"]
QUIZ = TM["quiz"]
END = TM["end"]
MA = TM["ma"]
card2 = DIV[2]
card4 = DIV[4]
f3t0 = FLASH[2][0]

# ---------- PAD: D MINOR malam -> F MAJOR hangat saat JAM 2 PAGI ----------
D3, F3, A3, C4 = 146.83, 174.61, 220.0, 261.63
Bb2, Bb3, G3, D4 = 116.54, 233.08, 196.0, 293.66
SEG = [
    (0.0, card2, (D3, F3, A3)),        # grup terbuka: debat dimulai
    (card2, MA[0], (Bb2, D3, F3)),     # babak hitungan
    # MA: hening total 1.0 s sebelum twist
    (f3t0, card4, (G3, Bb3, D4)),      # twist dan kekalahannya BIMO
    (card4, DUR, (F3, A3, C4)),        # JAM 2 PAGI: bukti, hangat F major
]
for (t0, t1, notes) in SEG:
    dur = max(t1 - t0 + 1.0, 1.5)
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
            if i0 >= N:
                continue
            nn = min(n, N - i0)
            if side == "L":
                mixL[i0:i0 + nn] += sig[:nn] * e[:nn] * g
            else:
                mixR[i0:i0 + nn] += sig[:nn] * e[:nn] * g
    sub = np.sin(2 * np.pi * notes[0] / 2 * t) * e * 0.07
    add(t0, sub, 0.0)

# ---------- arpeggio chat lofi (hening saat MA) ----------
DM_SCALE = [293.66, 349.23, 392.0, 440.0, 523.25, 587.33]
F_SCALE = [349.23, 440.0, 523.25, 587.33, 698.46, 783.99]
step = 0.30
kk = 0
for (lo, hi, scale) in ((0.4, MA[0] - 0.3, DM_SCALE),
                        (f3t0 + 0.2, card4 - 0.3, DM_SCALE),
                        (card4 + 0.4, END[0] + 1.0, F_SCALE)):
    tt = lo
    while tt < hi:
        f = scale[(kk * 2 + (kk % 7)) % len(scale)]
        s = sine(f, 0.28, a=0.004, d=0.16, harm=(1.0, 0.35))
        add(tt, s, 0.35 * np.sin(kk * 1.1), 0.045)
        kk += 1
        tt += step

# ---------- denyut malam pelan (tanpa kick/hi-hat klub, hukum #42) ----------
for (lo, hi) in ((0.4, MA[0]), (f3t0, card4), (card4, END[0])):
    tt = lo
    while tt < hi:
        n = int(0.9 * SR)
        t = np.arange(n) / SR
        s = np.sin(2 * np.pi * 55 * t) * np.exp(-t / 0.28)
        e = min((tt - lo) / 2.0, 1.0)
        add(tt, s * 0.035 * e)
        tt += 2.4

# karpet tape noise sangat pelan (kehangatan lofi malam)
bed = noise_band(DUR, 700, 2200, tilt=0.55)
mixL += bed * 0.011
mixR += np.roll(bed, 900) * 0.011

# ---------- momen kunci ----------
WHO = ("RAYA", "BIMO", "KAMU", "RAYA", "DILA", "BIMO", "KAMU", "DILA",
       "DILA", "BIMO", "KAMU", "RAYA", "DILA", "BIMO", "KAMU", "RAYA",
       "RAYA", "MYST", "BIMO", "RAYA")
POP_F = {"RAYA": 587.0, "BIMO": 330.0, "DILA": 494.0, "KAMU": 740.0,
         "MYST": 880.0}
add(0.35, swell(65.4, 0.12))               # dunia GRUP BAHAS FYP menyala
add(0.4, whoosh(0.5, True, 0.035))
for i, f in enumerate((392.0, 494.0, 587.0)):   # avatar grup terbentuk
    add(0.5 + i * 0.10, tick(f, 0.04))
for i, t0 in enumerate(M):
    who = WHO[i]
    photo = i in (0, 7, 16)
    add(t0, pop(POP_F[who], 0.10 if photo else 0.085))
    if who == "MYST":
        add(t0 + 0.05, chime(1046.5, 0.045))  # pesan misteri berkilau
    if photo:
        for j in range(4):                 # foto: elemen post menempel
            add(t0 + 0.12 + j * 0.10, tick(700 + j * 60, 0.03))
    if i == 12:                            # stiker kartu praktis
        add(t0, whoosh(0.5, True, 0.05))
        for f, dt in ((523.25, 0.0), (659.26, 0.12), (783.99, 0.24)):
            add(t0 + dt, chime(f, 0.07))
for ci, t0 in enumerate(DIV):
    if ci == 0:
        continue
    # kartu babak: swell hangat (bukan boom trailer)
    fb = (82.4, 87.3, 98.0, 87.3)[ci - 1]
    add(t0, swell(fb, 0.10))
    add(t0 + 0.08, chime(349.23, 0.045))
for fi, (t0, t1) in enumerate(FLASH):
    add(t0, whoosh(0.5, True, 0.06))
    add(t0 + 0.05, chime((440.0, 494.0, 440.0)[fi], 0.08))
    for i in range(6 if fi < 2 else 4):
        add(t0 + 0.2 + i * 0.12, tick(560 + i * 46, 0.04))
    add(t0 + 1.0, tick(900, 0.05))
    add(t0 + (1.5 if fi < 2 else 2.3), chime(523.25, 0.07))
    add(t1 - 0.4, whoosh(0.35, False, 0.04))
# MA 1.0 s: hening total sebelum twist + tremolo pendek
add(MA[0] - 0.15, whoosh(0.5, False, 0.05))
for i in range(4):
    add(MA[0] + i * 0.22, tick(1100, 0.04))
for (t0, t1, _n, _rad, _conf) in TM["bursts"]:
    add(t0 + 0.1, chime(1174.66 if t1 - t0 < 3 else 1046.5, 0.05))
add(M[17] + 0.4, chime(880.0, 0.04))       # MYST: pembuat video nongol
add(M[18] + 0.35, chime(523.25, 0.08))     # BIMO: hitung dulu baru komen
# OVERLAY MISI BARU
add(QUIZ[0], whoosh(0.6, True, 0.05))
add(QUIZ[0] + 0.05, tick(880, 0.05))
for i in range(4):
    add(QUIZ[0] + 2.3 + i * 0.16, tick(640 + i * 80, 0.04))
add(QUIZ[0] + 4.3, chime(587.33, 0.07))    # kartu bantu mendarat (lembut)
for i in range(8):
    add(QUIZ[0] + 4.4 + i * 0.1, tick(580 + i * 70, 0.04))
add(QUIZ[0] + 5.6, tick(760, 0.04))        # catatan kartu bantu dari ???
add(QUIZ[0] + 5.75, chime(880.0, 0.09))    # CTA JAWAB SOAL DI KOMENTAR
add(QUIZ[1], whoosh(0.6, False, 0.04))     # papan misi keluar (aturan 28)
# ENDcard
add(END[0] + 0.15, whoosh(0.5, True, 0.03))
for f, dt in ((349.23, 0.0), (440.0, 0.25), (523.25, 0.5), (698.46, 0.75)):
    add(END[0] + 0.3 + dt, chime(f, 0.065))    # fanfare endcard lembut
add(END[2] + 0.1, tick(700, 0.04))         # bar gradien menyapu
add(END[2] + 0.2, chime(1046.5, 0.05))

# ---------- VOICE ACTING (rev15): mix 20 klip + ducking bed ----------
vpeak = 0.0
for i, who in enumerate(WHO):
    fp = VDIR / f"m{i:02d}.mp3"
    if not fp.exists():
        raise SystemExit(f"klip voice hilang: {fp}")
    raw = subprocess.run(
        ["ffmpeg", "-v", "quiet", "-i", str(fp), "-ar", str(SR), "-ac", "2",
         "-f", "f32le", "-"], capture_output=True, check=True).stdout
    sig = np.frombuffer(raw, dtype=np.float32).astype(np.float64)
    sig = sig[: len(sig) // 2 * 2].reshape(-1, 2).mean(axis=1) * np.sqrt(2)
    sig = sig / (np.max(np.abs(sig)) + 1e-9) * 0.42
    g = 0.92 if who == "MYST" else 1.0
    addv(M[i] + VOFF, sig, g)
    vpeak = max(vpeak, float(np.max(np.abs(sig))) * g)

# ducking: bed turun saat voice berbicara (envelope halus)
env = np.maximum(np.abs(vocL), np.abs(vocR))
k = int(0.06 * SR)
ker = np.ones(k) / k
env = np.convolve(env, ker, mode="same")
hi = np.percentile(env[env > 0.01], 90) if np.any(env > 0.01) else 0.05
env = np.clip(env / max(hi, 0.05), 0, 1)
duck = 1.0 - 0.55 * env
mixL *= duck
mixR *= duck
mixL += vocL
mixR += vocR

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
print(f"audio OK: {OUT} ({DUR:.1f}s, peak {peak:.2f}, voice 20 klip mixed, "
      f"bed ducking -55% saat bicara)")
