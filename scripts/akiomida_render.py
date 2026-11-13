#!/usr/bin/env python3
# AKIOMIDA - Demo "Kaisar Motion" - renderer frame-accurate 1080p30
# Kinetic typography, particle, kamera shake, arcs pairing Gauss, CTA browser.
import math, os, sys, json, subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = "/home/z/my-project"
sys.path.insert(0, f"{ROOT}/scripts")
from akiomida_timeline import build_timeline, DEFAULT_DUR

W, H, FPS = 1920, 1080, 30
WORK = f"{ROOT}/work"
OUT = f"{WORK}/video_only.mp4"

# ---------------- durasi VO ----------------
d = dict(DEFAULT_DUR)
try:
    raw = json.load(open(f"{WORK}/vo/durations.json"))
    for k in d:
        if raw.get(k):
            d[k] = float(raw[k])
except Exception:
    print("Peringatan: durations.json tidak ada, pakai durasi default.")
TL = build_timeline(d)
EV = TL["events"]
print("Timeline:", {k: (round(v, 2) if isinstance(v, float) else v)
                    for k, v in TL.items() if k not in ("events",)})

# ---------------- font ----------------
FB = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
LB = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
LR = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
MB = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"
_fc = {}
def F(size, kind="bold"):
    key = (size, kind)
    if key not in _fc:
        path = {"bold": FB, "reg": FR, "lib": LB, "libr": LR, "mono": MB}[kind]
        _fc[key] = ImageFont.truetype(path, size)
    return _fc[key]

# ---------------- palet ----------------
INK = (245, 242, 233); GOLD = (245, 185, 66); GOLD_HI = (255, 222, 140)
DIM = (152, 148, 172); RED = (255, 86, 98); WHITE = (255, 255, 255)
SOFT = (214, 209, 194); DOTC = (222, 180, 96)

# ---------------- easing ----------------
def c01(x): return 0.0 if x < 0 else (1.0 if x > 1 else x)
def oc(x): x = c01(x); return 1 - (1 - x) ** 3
def oq(x): x = c01(x); return 1 - (1 - x) ** 5
def oe(x): x = c01(x); return 1.0 if x >= 1 else 1 - 2 ** (-10 * x)
def ob(x, s=1.70158):
    x = c01(x); x -= 1; return 1 + (s + 1) * x * x * x + s * x * x
def seg(t, a, b):
    if b <= a: return 1.0 if t >= b else 0.0
    return c01((t - a) / (b - a))

# ---------------- latar, vignette, grain ----------------
_yy = np.linspace(0, 1, H, dtype=np.float32)[:, None]
_top = np.array([11, 11, 16], np.float32); _bot = np.array([22, 18, 31], np.float32)
_grad = _top[None, :] * (1 - _yy) + _bot[None, :] * _yy          # (H,3)
_xx = np.linspace(-1, 1, W, dtype=np.float32)[None, :]
_y2 = np.linspace(-1, 1, H, dtype=np.float32)[:, None]
R2 = (_xx * 0.62) ** 2 + (_y2 * 0.62) ** 2                       # (H,W)
_base = np.broadcast_to(_grad[:, None, :], (H, W, 3)).copy()
_base += (14 * np.exp(-R2 * 1.5))[:, :, None]
BG = np.clip(_base, 0, 255).astype(np.uint8)
BG_RGBA = np.dstack([BG, np.full((H, W), 255, np.uint8)])
VIG = (1.0 - 0.45 * np.clip(R2 * 1.05, 0, 1) ** 1.7)[..., None].astype(np.float32)
_rng = np.random.default_rng(7)
NOISE = [(_rng.random((H, W, 1), dtype=np.float32) * 5.0 - 2.5) for _ in range(6)]

# glow blob (cahaya lembut di tengah)
_bb = np.zeros((900, 900, 4), np.uint8)
_r = np.linspace(-1, 1, 900)[None, :] ** 2 + np.linspace(-1, 1, 900)[:, None] ** 2
_g = np.clip(np.exp(-_r * 3.2), 0, 1)
_bb[..., 0] = 245; _bb[..., 1] = 185; _bb[..., 2] = 66
_bb[..., 3] = (_g * 90).astype(np.uint8)
BLOB = Image.fromarray(_bb)

# ---------------- teks ----------------
def tw(s, f, tr=0):
    if not s: return 0
    return sum(f.getlength(c) for c in s) + tr * max(0, len(s) - 1)

def draw_tracked(d, cx, cy, s, f, fill, tr=0, anchor_x="c"):
    if tr == 0:
        d.text((cx, cy), s, font=f, fill=fill, anchor="mm"); return
    lens = [f.getlength(c) for c in s]
    total = sum(lens) + tr * max(0, len(s) - 1)
    x = cx - total / 2 if anchor_x == "c" else cx
    for c, l in zip(s, lens):
        d.text((x + l / 2, cy), c, font=f, fill=fill, anchor="mm")
        x += l + tr

def sprite(s, f, fill, tr=0, pad=70):
    w = int(tw(s, f, tr)) + pad * 2
    h = int(f.size * 1.7) + pad * 2
    im = Image.new("RGBA", (max(w, 1), max(h, 1)), (0, 0, 0, 0))
    dr = ImageDraw.Draw(im)
    col = fill + (255,) if len(fill) == 3 else fill
    draw_tracked(dr, w / 2, h / 2, s, f, col, tr)
    return im

def set_alpha(im, a):
    if a >= 1.0: return im
    ch = im.getchannel("A").point(lambda v: int(v * a))
    out = im.copy(); out.putalpha(ch); return out

def tint(im, color):
    a = np.asarray(im).copy()
    a[..., 0], a[..., 1], a[..., 2] = color
    return Image.fromarray(a)

_SPR = {}; _GLW = {}

def paste_spr(img, spr, cx, cy, scale=1.0, alpha=1.0):
    if scale != 1.0:
        nw = max(1, int(spr.width * scale)); nh = max(1, int(spr.height * scale))
        spr = spr.resize((nw, nh), Image.BICUBIC)
    if alpha < 1.0: spr = set_alpha(spr, alpha)
    img.alpha_composite(spr, (int(cx - spr.width / 2), int(cy - spr.height / 2)))

def paste_glow(img, text, cx, cy, f, fill, tr=0, glow=GOLD, radius=18,
               scale=1.0, alpha=1.0, glow_alpha=1.0):
    key = (text, id(f), fill, tr)
    spr = _SPR.get(key)
    if spr is None:
        spr = _SPR[key] = sprite(text, f, fill, tr)
    gkey = key + (radius, glow)
    gl = _GLW.get(gkey)
    if gl is None:
        gl = _GLW[gkey] = tint(spr.filter(ImageFilter.GaussianBlur(radius)), glow)
    if scale != 1.0:
        spr = spr.resize((max(1, int(spr.width * scale)),
                          max(1, int(spr.height * scale))), Image.BICUBIC)
        gl = gl.resize((spr.width, spr.height), Image.BICUBIC)
    x0 = int(cx - spr.width / 2); y0 = int(cy - spr.height / 2)
    img.alpha_composite(set_alpha(gl, min(1.0, alpha * glow_alpha)), (x0, y0))
    img.alpha_composite(set_alpha(spr, alpha), (x0, y0))

# ---------------- partikel ----------------
class Sparks:
    def __init__(s):
        s.p = []
    def burst(s, x, y, n, cols, spd=(240, 1250)):
        for _ in range(n):
            a = np.random.rand() * 2 * math.pi
            v = np.random.uniform(*spd) * (0.35 + 0.65 * np.random.rand())
            s.p.append([x, y, math.cos(a) * v, math.sin(a) * v - 140,
                        np.random.uniform(0.45, 0.95), 0.0,
                        np.random.randint(2, 5),
                        cols[np.random.randint(len(cols))]])
    def update(s, dt):
        out = []
        for p in s.p:
            p[5] += dt
            if p[5] < p[4]:
                p[0] += p[2] * dt; p[1] += p[3] * dt
                p[3] += 520 * dt; p[2] *= math.exp(-1.6 * dt)
                out.append(p)
        s.p = out
    def draw(s, L):
        dr = ImageDraw.Draw(L)
        for x, y, vx, vy, life, age, r, c in s.p:
            a = int(255 * (1 - age / life) ** 1.4)
            dr.ellipse([x - r, y - r, x + r, y + r], fill=(c[0], c[1], c[2], min(255, a)))

np.random.seed(7)
DUST = [[np.random.rand() * W, np.random.rand() * H,
         np.random.uniform(-7, 7), np.random.uniform(-16, -4),
         np.random.uniform(0.22, 0.6), np.random.randint(1, 3)] for _ in range(64)]

def draw_dust(L, dt):
    dr = ImageDraw.Draw(L)
    for p in DUST:
        p[0] += p[2] * dt; p[1] += p[3] * dt
        if p[1] < -4: p[1] = H + 4; p[0] = np.random.rand() * W
        if p[0] < -4: p[0] = W + 4
        if p[0] > W + 4: p[0] = -4
        a = int(255 * p[4])
        dr.ellipse([p[0] - p[5], p[1] - p[5], p[0] + p[5], p[1] + p[5]],
                   fill=(226, 205, 160, a))

# ---------------- kamera: shake & flash ----------------
SHAKES = [(e["t"], e["amp"]) for e in EV if e["type"] == "shake"]
def shake_at(t):
    dx = dy = 0.0
    for t0, amp in SHAKES:
        dt = t - t0
        if 0 <= dt < 1.1:
            e = math.exp(-9 * dt)
            dx += amp * e * math.sin(38 * dt + t0 * 9.1)
            dy += amp * e * math.cos(46 * dt + t0 * 5.7)
    return dx, dy

def flash_at(t):
    f = 0.0
    for e in EV:
        if e["type"] == "flash":
            dt = t - e["t"]
            if 0 <= dt < 1.0:
                f += e["peak"] * math.exp(-e["decay"] * dt)
    return min(1.0, f)

BURSTS = [e for e in EV if e["type"] == "burst"]
SPAWNED = set()

# ---------------- geometri arcs Gauss ----------------
XS = np.linspace(170, 1750, 100)
DOTY = 905
def arc_pts(x1, x2, y, h, k=28):
    tt = np.linspace(0, 1, k)
    xm = (x1 + x2) / 2
    bx = (1 - tt) ** 2 * x1 + 2 * (1 - tt) * tt * xm + tt ** 2 * x2
    by = (1 - tt) ** 2 * y + 2 * (1 - tt) * tt * (y - h) + tt ** 2 * y
    return bx, by

# spiral emas (scene 4)
_sp_t = np.linspace(0, 1, 260)
_th = _sp_t * 3.1 * math.pi
_r = 8 * np.exp(1.30 * _th); _r = _r / _r.max() * 285
SPIRAL_BASE = np.stack([_r * np.cos(_th), _r * np.sin(_th)], 1)

# ---------------- sprite browser (dibangun sekali) ----------------
def build_browser():
    bw, bh = 940, 560
    im = Image.new("RGBA", (bw, bh), (0, 0, 0, 0))
    dr = ImageDraw.Draw(im)
    dr.rounded_rectangle([0, 0, bw - 1, bh - 1], 20, fill=(24, 23, 34, 255),
                         outline=(64, 60, 88, 255), width=2)
    dr.rounded_rectangle([0, 0, bw - 1, 66], 20, fill=(31, 29, 43, 255))
    dr.rectangle([0, 50, bw - 1, 66], fill=(31, 29, 43, 255))
    for cx, c in [(42, (235, 110, 110)), (74, (235, 190, 110)), (106, (140, 200, 140))]:
        dr.ellipse([cx - 8, 25, cx + 8, 41], fill=c + (235,))
    dr.rounded_rectangle([148, 14, 916, 52], 19, fill=(14, 14, 21, 255),
                         outline=(70, 66, 94, 255), width=1)
    dr.rounded_rectangle([168, 26, 186, 42], 3, fill=GOLD + (255,))
    dr.arc([168, 16, 186, 34], 180, 360, fill=GOLD + (255,), width=3)
    mon = sprite("A", F(170), GOLD, pad=40)
    gl = tint(mon.filter(ImageFilter.GaussianBlur(20)), GOLD)
    im.alpha_composite(set_alpha(gl, 0.85), (int(470 - mon.width / 2), int(255 - mon.height / 2)))
    im.alpha_composite(mon, (int(470 - mon.width / 2), int(255 - mon.height / 2)))
    dr.text((470, 408), "AKIOMIDA", font=F(44, "lib"), fill=INK + (255,), anchor="mm")
    return im

BROWSER = build_browser()
URL_TEXT = "akiomida.com"

# ---------------- orbit partikel end card ----------------
ORBIT = [[np.random.uniform(400, 560), np.random.rand() * 2 * math.pi,
          np.random.uniform(0.12, 0.30), np.random.randint(2, 4),
          np.random.uniform(45, 105)] for _ in range(24)]

# ============================================================
# SCENE 1 : HOOK
# ============================================================
def sc1(img, t):
    p1 = seg(t, 0.42, 0.80); s1 = ob(p1)
    if p1 > 0:
        yb = 430 + 4 * math.sin(2 * math.pi * t / 2.8)
        paste_glow(img, "KAMU BENCI", W / 2, yb, F(150), INK,
                   glow=GOLD, radius=16, scale=0.40 + 0.60 * s1,
                   alpha=min(1.0, p1 * 2.5), glow_alpha=0.55)
    p2 = seg(t, 1.17, 1.55); s2 = ob(p2)
    if p2 > 0:
        img.alpha_composite(BLOB, (int(W / 2 - 450), int(575 - 450)))
        yb = 578 + 4 * math.sin(2 * math.pi * t / 2.8 + 1.3)
        paste_glow(img, "MATEMATIKA?", W / 2, yb, F(172), GOLD_HI,
                   glow=GOLD, radius=22, scale=0.40 + 0.60 * s2,
                   alpha=min(1.0, p2 * 2.5), glow_alpha=0.75)
    # teks janji + mesin ketik
    n = TL["hook_n"]
    full = f"TAHAN {n} DETIK."
    fl = F(54, "lib")
    x0 = W / 2 - tw(full, fl, 6) / 2
    nl = int((t - 2.30) / 0.045)
    if nl > 0:
        sub = full[:min(len(full), nl)]
        dr = ImageDraw.Draw(img)
        draw_tracked(dr, x0, 730, sub, fl, SOFT + (255,), tr=6, anchor_x="l")
        if nl < len(full):
            cx = x0 + tw(sub, fl, 6) + 8
            if (t * 4.0) % 1.0 < 0.5:
                dr.rectangle([cx, 706, cx + 3, 754], fill=GOLD + (230,))
    uw = 620 * oc(seg(t, 3.05, 3.45))
    if uw > 2:
        dr = ImageDraw.Draw(img)
        a = int(200 * seg(t, 3.05, 3.30))
        dr.line([W / 2 - uw / 2, 782, W / 2 + uw / 2, 782], fill=GOLD + (a,), width=3)

# ============================================================
# SCENE 2 : TANTANGAN
# ============================================================
TOKENS = ["1", "+", "2", "+", "3", "+", "...", "+", "100"]
def sc2(img, t):
    s0 = TL["s2"][0]
    f = F(128)
    gap = 22
    widths = [tw(x, f) for x in TOKENS]
    total = sum(widths) + gap * (len(TOKENS) - 1)
    x = W / 2 - total / 2
    dr = ImageDraw.Draw(img)
    for i, tok in enumerate(TOKENS):
        t0 = s0 + 0.35 + i * 0.13
        p = seg(t, t0, t0 + 0.30)
        if p <= 0:
            x += widths[i] + gap; continue
        sc = 0.5 + 0.5 * ob(p)
        yy = 455 + 90 * (1 - oc(p))
        col = INK if tok not in ("+", "...") else (206, 168, 96)
        if tok == "100": col = GOLD_HI
        spr = sprite(tok, f, col)
        paste_spr(img, spr, x + widths[i] / 2, yy, scale=sc, alpha=min(1.0, p * 2))
        x += widths[i] + gap
    # tanda tanya raksasa
    qt = s0 + 2.05
    p = seg(t, qt, qt + 0.42)
    if p > 0:
        img.alpha_composite(BLOB, (int(W / 2 - 430), int(655 - 430)))
        sc = (0.45 + 0.55 * ob(p)) * (1 + 0.04 * math.sin(6 * math.pi * t))
        paste_glow(img, "?", W / 2, 655, F(235), GOLD_HI, glow=GOLD,
                   radius=24, scale=sc, alpha=min(1.0, p * 2.5), glow_alpha=0.8)
        for k in range(2):
            ph = (t - qt) / 0.95 - k * 0.33
            if 0 < ph < 1:
                r = 95 + 235 * ph
                a = int(90 * (1 - ph))
                dr.ellipse([W / 2 - r, 655 - r, W / 2 + r, 655 + r],
                           outline=GOLD + (a,), width=3)
    a = seg(t, s0 + 2.70, s0 + 3.20)
    if a > 0:
        dr.text((W / 2, 815), "tanpa kalkulator.", font=F(46, "libr"),
                fill=DIM + (int(255 * a),), anchor="mm")

# ============================================================
# SCENE 3 : GAUSS & 5050
# ============================================================
def pair_label(t):
    a0 = TL["arcs_start"]
    if a0 + 0.55 <= t < a0 + 1.75: return "1 + 100 = 101"
    if a0 + 1.85 <= t < a0 + 2.95: return "2 + 99 = 101"
    if TL["arcs_end"] - 0.45 <= t < TL["slam"] - 1.80: return "50 + 51 = 101"
    return None

def sc3(img, t):
    s0 = TL["s3"][0]; slam = TL["slam"]
    ARC = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    dr = ImageDraw.Draw(ARC)
    # caption
    a = seg(t, s0 + 0.35, s0 + 0.85)
    if a > 0:
        draw_tracked(dr, W / 2, 132, "CARL FRIEDRICH GAUSS", F(34, "lib"),
                     DIM + (int(255 * a),), tr=8)
        rw = 190 * oc(a)
        dr.line([W / 2 - rw / 2, 162, W / 2 + rw / 2, 162],
                fill=GOLD + (int(80 * a),), width=2)
    # deretan titik 1..100
    dim = 1.0 - 0.70 * oc(seg(t, slam + 0.10, slam + 0.50))
    for i in range(100):
        ai = seg(t, s0 + 0.12 + i * 0.006, s0 + 0.42 + i * 0.006)
        if ai <= 0: continue
        x = XS[i]
        al = int(210 * ai * dim)
        dr.ellipse([x - 4.5, DOTY - 4.5, x + 4.5, DOTY + 4.5],
                   fill=DOTC + (al,))
    a = seg(t, s0 + 0.50, s0 + 0.90)
    if a > 0:
        draw_tracked(dr, XS[0], 950, "1", F(30, "reg"), DIM + (int(255 * a),))
        draw_tracked(dr, XS[99], 950, "100", F(30, "reg"), DIM + (int(255 * a),))
    # arcs pairing
    per = TL["arc_span"] / 50
    for i in range(1, 51):
        a0 = TL["arcs_start"] + (i - 1) * per
        u = seg(t, a0, a0 + per * 1.05)
        if u <= 0: continue
        x1 = XS[i - 1]; x2 = XS[100 - i]
        h = 140 + ((x2 - x1) / W) * 430
        bx, by = arc_pts(x1, x2, DOTY, h)
        m = max(2, int(u * 27))
        pts = list(zip(bx[:m], by[:m]))
        col = (255, 225, 160) if i % 10 == 0 else GOLD
        dr.line(pts, fill=col + (66,), width=8, joint="curve")
        dr.line(pts, fill=col + (225,), width=3, joint="curve")
    img.alpha_composite(ARC)
    # label pasangan
    lab = pair_label(t)
    if lab:
        p = seg(t, t - 0.0, t - 0.0)  # placeholder agar konsisten
        paste_spr(img, sprite(lab, F(74), INK), W / 2, 300, alpha=1.0)
    elif slam - 1.80 <= t < slam:
        u = seg(t, slam - 1.80, slam - 1.55)
        paste_glow(img, "50 PASANG \u00d7 101", W / 2, 300, F(92), GOLD_HI,
                   glow=GOLD, radius=16, scale=0.6 + 0.4 * ob(u),
                   alpha=min(1.0, u * 2), glow_alpha=0.7)
    # SLAM: 5050
    if t >= slam:
        u = seg(t, slam, slam + 0.50)
        sc = 0.22 + 0.78 * oe(u)
        sc += min(0.08, 0.0008 * max(0.0, t - slam - 0.50))
        chroma = 1.0 - oc(seg(t, slam + 0.05, slam + 0.60))
        spr = sprite("5050", F(330), GOLD_HI)
        if chroma > 0.02:
            off = 5 * chroma
            for dx, dy, c in [(-off, 0, (255, 80, 95)), (0, off * 0.8, (80, 255, 140)),
                              (off, 0, (95, 140, 255))]:
                paste_spr(img, tint(spr, c), W / 2 + dx, 470 + dy,
                          scale=sc, alpha=0.5 * chroma)
        paste_glow(img, "5050", W / 2, 470, F(330), GOLD_HI, glow=GOLD,
                   radius=26, scale=sc, glow_alpha=0.85)
        a = seg(t, slam + 0.10, slam + 0.45)
        if a > 0:
            paste_spr(img, sprite("50 \u00d7 101 =", F(54), SOFT), W / 2, 262, alpha=a)

# ============================================================
# SCENE 4 : PESAN
# ============================================================
def sc4(img, t):
    s0 = TL["s4"][0]
    a1 = seg(t, s0 + 0.30, s0 + 0.80)
    if a1 > 0:
        paste_spr(img, sprite("MATEMATIKA BUKAN SOAL", F(64, "lib"), INK, tr=4),
                  W / 2, 385, alpha=a1)
    a2 = seg(t, s0 + 1.00, s0 + 1.35); s2 = ob(a2)
    strike_t = s0 + 1.75
    struck = t >= strike_t + 0.38
    if a2 > 0:
        al = 1.0 if not struck else 0.30
        dy = 12 * oc(seg(t, strike_t + 0.38, strike_t + 0.68))
        paste_glow(img, "MENGHITUNG.", W / 2, 510 + dy, F(116), INK,
                   glow=(120, 110, 130), radius=10, scale=0.55 + 0.45 * s2,
                   alpha=min(1.0, a2 * 2) * al, glow_alpha=0.35)
        su = seg(t, strike_t, strike_t + 0.38)
        if su > 0:
            dr = ImageDraw.Draw(img)
            wtx = tw("MENGHITUNG.", F(116))
            x0 = W / 2 - wtx / 2 - 14
            y0 = 510 + 34
            dr.line([x0, y0, x0 + (wtx + 28) * su, y0 - 16 * su],
                    fill=RED + (235,), width=9)
    a3 = seg(t, s0 + 2.70, s0 + 3.05); s3 = ob(a3)
    if a3 > 0:
        img.alpha_composite(BLOB, (int(W / 2 - 420), int(655 - 420)))
        paste_glow(img, "TAPI SENI MELIHAT POLA.", W / 2, 655, F(104), GOLD_HI,
                   glow=GOLD, radius=20, scale=0.55 + 0.45 * s3,
                   alpha=min(1.0, a3 * 2), glow_alpha=0.8)

# ============================================================
# SCENE 5 : CTA BROWSER & END CARD
# ============================================================
def sc5(img, t):
    s0 = TL["s5_start"]; punch = TL["punch"]; te = TL["endcard"]
    # --------- kartu browser ---------
    if s0 + 0.25 <= t < punch + 0.40:
        pin = ob(seg(t, s0 + 0.25, s0 + 0.75))
        pout = seg(t, punch, punch + 0.32)
        sc = (0.75 + 0.25 * pin) * (1 + 0.15 * oc(pout))
        al = min(1.0, pin * 2) * (1 - pout)
        if al > 0.01:
            card = BROWSER.copy()
            dr = ImageDraw.Draw(card)
            # pengetikan URL
            k0 = s0 + 1.05
            nl = int((t - k0) / 0.10)
            if nl > 0:
                sub = URL_TEXT[:min(len(URL_TEXT), nl)]
                dr.text((200, 33), sub, font=F(30, "mono"),
                        fill=GOLD_HI + (255,), anchor="lm")
                if nl < len(URL_TEXT) and (t * 4.0) % 1.0 < 0.5:
                    wsub = tw(sub, F(30, "mono"))
                    dr.rectangle([202 + wsub, 18, 205 + wsub, 48], fill=GOLD + (230,))
            elif (t * 4.0) % 1.0 < 0.5:
                wfull = tw(URL_TEXT, F(30, "mono"))
                dr.rectangle([202 + wfull, 18, 205 + wfull, 48], fill=GOLD + (200,))
            # bar pemuatan halaman
            u = oc(seg(t, s0 + 2.60, s0 + 3.20))
            if u > 0:
                dr.rounded_rectangle([150, 470, 150 + 640 * u, 479], 4,
                                     fill=GOLD + (220,))
            card = card.resize((max(1, int(940 * sc)), max(1, int(560 * sc))),
                               Image.BICUBIC)
            card = set_alpha(card, al)
            img.alpha_composite(card, (int(960 - card.width / 2),
                                       int(560 - card.height / 2)))
    # --------- end card ---------
    if t >= te:
        breathe = 1 + 0.012 * math.sin(2 * math.pi * (t - te) / 3.4)
        p = seg(t, te, te + 0.45); sc = (0.55 + 0.45 * ob(p)) * breathe
        img.alpha_composite(BLOB, (int(max(0, W / 2 - 520)), int(max(0, 470 - 520))))
        paste_glow(img, "AKIOMIDA.COM", W / 2, 470, F(150), GOLD_HI,
                   glow=GOLD, radius=24, scale=sc, alpha=min(1.0, p * 2),
                   glow_alpha=0.9)
        dr = ImageDraw.Draw(img)
        for y in (322, 648):
            w = 640 * oc(seg(t, te + 0.15, te + 0.60))
            if w > 2:
                dr.line([W / 2 - w / 2, y, W / 2 + w / 2, y],
                        fill=GOLD + (180,), width=2)
        a = seg(t, te + 0.45, te + 0.95)
        if a > 0:
            draw_tracked(dr, W / 2, 712, "BUKA BROWSER \u2014 TULIS ALAMAT INI",
                         F(46, "lib"), INK + (int(255 * a),), tr=6)
        a = seg(t, te + 0.75, te + 1.25)
        if a > 0:
            draw_tracked(dr, W / 2, 778, "MATEMATIKA UNTUK YANG PENASARAN",
                         F(28, "lib"), DIM + (int(255 * a),), tr=8)
        # partikel orbit
        dr = ImageDraw.Draw(img)
        for R, ph, sp, r, al in ORBIT:
            aa = seg(t, te, te + 0.60)
            x = W / 2 + R * math.cos(ph + sp * (t - te))
            y = 470 + R * 0.72 * math.sin(ph + sp * (t - te))
            dr.ellipse([x - r, y - r, x + r, y + r],
                       fill=(226, 190, 110, int(al * aa)))

# ============================================================
# utama
# ============================================================
def draw_scene(img, t):
    if t < TL["s1"][1]: sc1(img, t)
    elif t < TL["s2"][1]: sc2(img, t)
    elif t < TL["s3"][1]: sc3(img, t)
    elif t < TL["s4"][1]: sc4(img, t)
    else: sc5(img, t)

def main():
    smoke = os.environ.get("SMOKE") == "1"
    n = int(TL["total"] * FPS)
    if smoke: n = min(n, 105)
    cmd = ["ffmpeg", "-y", "-loglevel", "error",
           "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
           "-r", str(FPS), "-i", "-",
           "-c:v", "libx264", "-preset", "veryfast", "-crf", "21",
           "-pix_fmt", "yuv420p", "-movflags", "+faststart", OUT]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    sparks = Sparks()
    for fi in range(n):
        t = fi / FPS
        for i, e in enumerate(BURSTS):
            if i not in SPAWNED and t >= e["t"]:
                SPAWNED.add(i)
                sparks.burst(e["x"], e["y"], e["n"],
                             cols=[GOLD, GOLD_HI, (255, 255, 255)])
        img = Image.fromarray(BG_RGBA.copy())
        draw_scene(img, t)
        sparks.update(1.0 / FPS)
        fx = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        sparks.draw(fx); draw_dust(fx, 1.0 / FPS)
        img.alpha_composite(fx)
        dx, dy = shake_at(t)
        if abs(dx) > 0.6 or abs(dy) > 0.6:
            nb = Image.new("RGBA", (W, H), (5, 5, 8, 255))
            nb.paste(img, (int(round(dx)), int(round(dy))))
            img = nb
        fl = flash_at(t)
        if fl > 0.02:
            img.alpha_composite(Image.new("RGBA", (W, H),
                                 (255, 255, 255, int(255 * min(1.0, fl)))))
        a = np.asarray(img.convert("RGB"), dtype=np.float32)
        a *= VIG
        a += NOISE[fi % 6]
        np.clip(a, 0, 255, out=a)
        proc.stdin.write(a.astype(np.uint8).tobytes())
        if fi % 150 == 0:
            print(f"frame {fi}/{n}", flush=True)
    proc.stdin.close(); proc.wait()
    if proc.returncode != 0:
        raise SystemExit(f"ffmpeg gagal, kode {proc.returncode}")
    print("SELESAI:", OUT)

if __name__ == "__main__":
    main()
