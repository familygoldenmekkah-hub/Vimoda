#!/usr/bin/env python3
# AKIOMIDA - Demo "Kaisar Motion" - sintesis musik, SFX, VO, dan mixing final
import math, os, sys, json, wave
import numpy as np
from scipy.signal import resample_poly, butter, lfilter
from scipy.ndimage import uniform_filter1d

ROOT = "/home/z/my-project"
sys.path.insert(0, f"{ROOT}/scripts")
from akiomida_timeline import build_timeline, DEFAULT_DUR

SR = 48000
WORK = f"{ROOT}/work"
VOD = f"{WORK}/vo/final"
OUTWAV = f"{WORK}/mix.wav"

d = dict(DEFAULT_DUR)
try:
    raw = json.load(open(f"{WORK}/vo/durations.json"))
    for k in d:
        if raw.get(k):
            d[k] = float(raw[k])
except Exception:
    print("Peringatan: durations.json tidak ada, pakai default.")
TL = build_timeline(d)
T = TL["total"]
N = int(T * SR) + SR
rng = np.random.default_rng(11)

print("Durasi total:", round(T, 2), "detik")

# ---------------- util ----------------
def load_vo(key):
    path = f"{VOD}/{key}.wav"
    w = wave.open(path, "rb")
    x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768.0
    if w.getnchannels() == 2:
        x = x.reshape(-1, 2).mean(1)
    fr = w.getframerate()
    w.close()
    if fr != SR:
        from math import gcd
        g = gcd(fr, SR)
        x = resample_poly(x, SR // g, fr // g)
    m = np.abs(x).max()
    if m > 1e-9: x = x / m * 0.52
    return x

def add(buf, sig, t0, gain=1.0):
    i = int(t0 * SR)
    if i >= N: return
    j = min(N, i + len(sig))
    if j <= i: return
    buf[i:j] += sig[:j - i] * gain

def sine_sweep(dur, f0, f1, curve=1.0):
    n = int(dur * SR); t = np.arange(n) / SR
    f = f0 + (f1 - f0) * (t / dur) ** curve
    return np.sin(2 * np.pi * np.cumsum(f) / SR).astype(np.float32)

def noise(dur):
    return rng.standard_normal(int(dur * SR)).astype(np.float32) * 0.6

def lowpass(x, cut, order=2):
    b, a = butter(order, cut / (SR / 2), "low")
    return lfilter(b, a, x).astype(np.float32)

def highpass(x, cut, order=2):
    b, a = butter(order, cut / (SR / 2), "high")
    return lfilter(b, a, x).astype(np.float32)

def bandpass(x, lo, hi):
    b, a = butter(2, [lo / (SR / 2), hi / (SR / 2)], "band")
    return lfilter(b, a, x).astype(np.float32)

# ---------------- SFX ----------------
def impact(size="m"):
    if size == "s":  f0, dur, g, ng, dk = 62, 0.55, 0.95, 0.10, 4.5
    elif size == "m": f0, dur, g, ng, dk = 50, 0.90, 1.05, 0.16, 3.4
    else:            f0, dur, g, ng, dk = 40, 1.90, 1.20, 0.22, 2.6
    n = int(dur * SR); t = np.arange(n) / SR
    f = f0 * (0.55 + 0.45 * np.exp(-t * 6))
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * dk)
    nz = noise(dur) * np.exp(-t * 28) * ng
    out = s + nz
    if size == "xl":
        out = out + sine_sweep(dur, 90, 32) * np.exp(-t * 3.5) * 0.40
    return (out * g * 0.5).astype(np.float32)

def whoosh(dur=0.6, cut=900, g=1.0):
    n = int(dur * SR); t = np.arange(n) / SR
    nz = lowpass(noise(dur), cut)
    env = np.sin(np.pi * t / dur) ** 2
    return (nz * env * g).astype(np.float32)

def riser(dur=2.0):
    n = int(dur * SR); t = np.arange(n) / SR
    nz = lowpass(noise(dur), 1400) * (t / dur) ** 2.4
    sw = sine_sweep(dur, 160, 980, curve=1.4) * (t / dur) ** 1.8 * 0.6
    return (nz + sw).astype(np.float32) * 0.8

def tick(soft=False):
    dur = 0.05; n = int(dur * SR); t = np.arange(n) / SR
    s = np.sin(2 * np.pi * 1250 * t) * np.exp(-t * 110)
    s = s + noise(dur) * np.exp(-t * 300) * 0.5
    return (s * (0.30 if soft else 0.40)).astype(np.float32)

def blip():
    dur = 0.09; n = int(dur * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 880 * t) * np.exp(-t * 55) * 0.35).astype(np.float32)

def click():
    dur = 0.012
    return (highpass(noise(dur), 2000) * np.exp(-np.arange(int(dur * SR)) / SR * 600) * 0.9).astype(np.float32)

def scratch():
    dur = 0.32; n = int(dur * SR); t = np.arange(n) / SR
    nz = bandpass(noise(dur), 1200, 3800)
    trem = (1 + 0.5 * np.sin(2 * np.pi * 28 * t)) / 2
    env = np.sin(np.pi * t / dur) ** 1.5
    return (nz * trem * env * 0.9).astype(np.float32)

def ui_in():
    return whoosh(0.35, 1400, 0.9)

# ---------------- bus FX dari events ----------------
FX = np.zeros(N, np.float32)
for e in TL["events"]:
    ty, tt = e["type"], e["t"]
    if ty == "impact":   add(FX, impact(e.get("size", "m")), tt)
    elif ty == "whoosh": add(FX, whoosh(0.60, 900), tt, 0.55)
    elif ty == "tick":   add(FX, tick(e.get("soft", False)), tt, 0.9)
    elif ty == "blip":   add(FX, blip(), tt, 0.9)
    elif ty == "click":  add(FX, click(), tt, 0.8)
    elif ty == "scratch": add(FX, scratch(), tt, 0.7)
    elif ty == "ui_in":  add(FX, ui_in(), tt, 0.6)

# riser menuju SLAM + hening sesaat sebelum dampak
add(FX, riser(2.0), TL["slam"] - 2.26, 0.75)

# shimmer lembut di end card
nsh = int(max(0, T - TL["endcard"] - 0.2) * SR)
if nsh > SR:
    tsh = np.arange(nsh) / SR
    sh = (np.sin(2 * np.pi * 440 * tsh) + np.sin(2 * np.pi * 554.37 * tsh)
          + np.sin(2 * np.pi * 659.25 * tsh)) / 3
    envsh = np.minimum(1.0, tsh / 1.8) * (0.55 + 0.45 * np.sin(2 * np.pi * 0.35 * tsh))
    envsh *= np.minimum(1.0, np.maximum(0.0, (nsh / SR - tsh) / 0.8))
    add(FX, (sh * envsh * 0.045).astype(np.float32), TL["endcard"] + 0.2)

# ---------------- musik latar ----------------
MUS = np.zeros(N, np.float32)
BEAT = 60.0 / 91.0

def kick(g):
    dur = 0.5; n = int(dur * SR); t = np.arange(n) / SR
    f = 52 * (0.6 + 0.4 * np.exp(-t * 11))
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 8)
    s = s + noise(dur) * np.exp(-t * 180) * 0.4
    return (s * g * 0.55).astype(np.float32)

def hat(g):
    n = int(0.03 * SR); t = np.arange(n) / SR
    nz = np.diff(rng.standard_normal(n + 1)).astype(np.float32) * 0.6
    return (nz * np.exp(-t * 150) * g * 0.5).astype(np.float32)

SEGS = [
    ("s1", 0.0, TL["s1"][1], dict(kick=2, gk=0.50, hat=0, gh=0.0, drone=0.06, pad=0)),
    ("s2", TL["s2"][0], TL["s2"][1], dict(kick=1, gk=0.62, hat=1, gh=0.10, drone=0.08, pad=0)),
    ("s3", TL["s3"][0], TL["slam"], dict(kick=1, gk=0.70, hat=1, gh=0.12, drone=0.10, pad=0)),
    ("s4", TL["s4"][0], TL["s4"][1], dict(kick=2, gk=0.52, hat=0, gh=0.0, drone=0.07, pad=1)),
    ("s5", TL["s5_start"], T, dict(kick=1, gk=0.58, hat=1, gh=0.10, drone=0.08, pad=1)),
]
for name, a0, a1, cfg in SEGS:
    tb = a0; i = 0
    while tb < a1:
        if i % cfg["kick"] == 0: add(MUS, kick(cfg["gk"]), tb)
        if cfg["hat"] and i % 2 == 1: add(MUS, hat(cfg["gh"]), tb)
        tb += BEAT; i += 1

# drone sub
tdr = np.arange(N) / SR
drone = np.sin(2 * np.pi * 55 * tdr) + 0.6 * np.sin(2 * np.pi * 55.4 * tdr)
denv = np.zeros(N, np.float32)
def fill_env(a0, a1, g):
    i0 = int(a0 * SR); i1 = min(N, int(a1 * SR))
    if i1 > i0: denv[i0:i1] = g
for name, a0, a1, cfg in SEGS:
    fill_env(a0, a1, cfg["drone"])
denv = uniform_filter1d(denv, SR // 4).astype(np.float32)   # transisi mulus
MUS += (lowpass(drone, 160) * denv * 0.5).astype(np.float32)

# pad akor (scene 4-5)
CH_A = [110.0, 130.81, 164.81]   # Am
CH_B = [87.31, 130.81, 174.61]   # F
tp = TL["s4"][0]
ci = 0
while tp < T - 1.0:
    ch = CH_A if ci % 2 == 0 else CH_B
    dur = 4.0
    n = int(dur * SR); t = np.arange(n) / SR
    envc = np.minimum(1.0, t / 0.9) * np.minimum(1.0, np.maximum(0.0, (dur - t) / 0.9))
    sig = sum(np.sin(2 * np.pi * f * t) for f in ch) / 3
    add(MUS, (sig * envc * 0.05).astype(np.float32), tp)
    tp += dur; ci += 1

# hening sesaat sebelum SLAM (gap pukulan)
i0 = int((TL["slam"] - 0.24) * SR); i1 = int(TL["slam"] * SR)
if i1 > i0:
    MUS[i0:i1] *= np.linspace(1.0, 0.0, i1 - i0).astype(np.float32)

# ---------------- voiceover ----------------
VO = np.zeros(N, np.float32)
vo_missing = []
for key, tt in [("vo1", TL["vo1_t"]), ("vo2", TL["vo2_t"]), ("vo3", TL["vo3_t"]),
                ("vo4", TL["vo4_t"]), ("vo5a", TL["vo5a_t"]), ("vo5b", TL["vo5b_t"])]:
    if tt is None: continue
    p = f"{VOD}/{key}.wav"
    if os.path.exists(p):
        add(VO, load_vo(key), tt)
    else:
        vo_missing.append(key)
if vo_missing:
    print("Peringatan: VO tidak ditemukan:", vo_missing)

# ---------------- ducking & mix ----------------
env = np.abs(VO)
env = uniform_filter1d(env, 2400)          # ~50 ms
mx = env.max()
if mx > 1e-9: env = env / mx
duck = 1.0 - 0.62 * np.clip(env * 3.2, 0, 1)
duck = uniform_filter1d(duck, 4800).astype(np.float32)

MASTER = VO + (MUS + FX) * duck
MASTER = MASTER * 0.94 / max(1e-9, np.abs(MASTER).max())
stereo = np.stack([MASTER, MASTER], 1)
pcm = (np.clip(stereo, -1, 1) * 32767).astype(np.int16)

w = wave.open(OUTWAV, "wb")
w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes(pcm.tobytes()); w.close()
print("SELESAI:", OUTWAV, "| peak:", float(np.abs(MASTER).max()))
