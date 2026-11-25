#!/usr/bin/env python3
"""TIMELINE rev16 VIDEO 17: satu sumber kebenaran untuk semua waktu.
Membaca durasi 20 klip voice (/tmp/voice17/durations.json) lalu menghitung:
t0 tiap pesan (jeda menyesuaikan panjang voice), slot kartu babak, slot
diagram menyala, hening pra-twist, papan misi, endcard, burst, IMPS, dolly,
dips, subtitle (32 beat: pesan panjang dipecah dua agar tak menggantung).
Output: timing.json (audio17rp + qa17rp) + frag_time.js (const TM untuk engine).
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
D = json.loads(Path("/tmp/voice17/durations.json").read_text())
d = [D[f"m{i:02d}"] for i in range(20)]

VOFF = 0.42          # voice mulai setelah pop bubble
GAP_MIN = 3.0        # jeda minimum antar pesan (hukum tempo baca)
GAP_PAD = 1.25       # ekor voice sebelum pesan berikutnya
FLASH_DUR = [3.4, 3.4, 4.0]   # twist lebih lambat (slow motion)
FLASH_PAD = 1.5
CARD_WIN = 1.8
CARD_PAD = 2.6       # kartu 1.8 s + napas, lalu pesan pertama babak pop
QUIZ_DUR = 8.6

DIV_TEXT = ["GRUP RESEP GAGAL", "GILIRAN GEDE · 16.14", "GAGAL TAKAR · 16.26",
            "MAGHRIB · 18.04", "JAM 7 MALAM · UJI RASA"]
# rev18 (permintaan pemilik): kartu judul TANPA label waktu - cukup
# "GRUP RESEP GAGAL". Pair [t,teks] lama bikin label mentah "0,4,...".
DIV_LABEL = ["GRUP RESEP GAGAL", None, None, None, None]

# ---- intro film rev18 (permintaan pemilik, ala produksi film berkelas):
# kartu judul full-bleed GRUP RESEP GAGAL -> kartu produksi dipersembahkan
# akiomida.com -> baru cerita ----
INTRO1 = [0.4, 4.2]   # kartu judul: ilustrasi penuh + label grup
INTRO2 = [4.5, 7.6]   # kartu produksi: dipersembahkan akiomida.com

# ---- rantai t0 ----
t0 = [0.0] * 20
cards = [[0.0] for _ in range(5)]     # kartu 0 di-set manual
flash = [[0.0, 0.0] for _ in range(3)]
t0[0] = 8.2                           # pesan pertama SETELAH dua intro
cards[0] = [0.4]

DIV_BEFORE = {4: 1, 7: 2, 12: 3, 16: 4}   # kartu babak sebelum pesan j
FLASH_AFTER = {8: 0, 14: 1, 17: 2}        # garis ukur setelah pesan i (rev19)

for i in range(19):
    gap = max(GAP_MIN, d[i] + GAP_PAD)
    nxt = t0[i] + gap
    if i in FLASH_AFTER:
        fi = FLASH_AFTER[i]
        ft = t0[i] + d[i] + FLASH_PAD
        flash[fi] = [round(ft, 2), round(ft + FLASH_DUR[fi], 2)]
        nxt = flash[fi][1] + 1.5
    if (i + 1) in DIV_BEFORE:
        ci = DIV_BEFORE[i + 1]
        ct = nxt if i not in FLASH_AFTER else nxt + 0.9
        # kartu babak: setelah voice/diagram, sebelum pesan pembuka babak
        ct = t0[i] + d[i] + 1.0 if i not in FLASH_AFTER else flash[fi][1] + 1.2
        cards[ci] = [round(ct, 2)]
        nxt = ct + CARD_PAD
    if i == 18:  # papan misi antara pesan 18 dan 19
        q0 = t0[i] + d[i] + 1.4
        nxt = q0 + QUIZ_DUR + 0.7
    t0[i + 1] = round(nxt, 2)

quiz = [round(t0[18] + d[18] + 1.4, 2), round(t0[18] + d[18] + 1.4 + QUIZ_DUR, 2)]
ma = [round(flash[2][0] - 1.0, 2), flash[2][0]]   # hening pra-twist
end = [round(t0[19] + d[19] + 1.6, 2)]
end += [round(end[0] + 0.2, 2), round(end[0] + 2.5, 2), round(end[0] + 3.5, 2)]
DUR = round(end[0] + 5.0, 2)

DIVS = []
for ci in range(5):
    txt = DIV_LABEL[ci] if DIV_LABEL[ci] else DIV_TEXT[ci]
    DIVS.append([cards[ci][0], txt])

# ---- subtitle EN 34 beat (pesan panjang dipecah dua) ----
MSG_SUB = [
    "Challenge day 3: every scoop in decimals!",
    "Gede: fractions beat commas, duh!",
    "The scale only reads decimals!",
    "The fractions have to become decimals!",
    "Relax, Pak Gede. Everyone, relax!",
    "Lose today: your kitchen is marked!",
    "Gede: 3/4 kg? I will just use a cup!",
    "Cups measure volume, scales measure weight!",
    "Right. Official recipes use decimals!",
    "3/4 kg reads exactly 0.75!",
    "Scale says 0.40. I swore it was 3/4!",
    "0.40 is not even halfway!",
    "0.75 is 3/4 of the walk. Short 0.35!",
    "Just tell me exactly how much!",
    "Add till it reads 0.75. Read, do not guess!",
    "It works! The ruler line wins!",
    "Cheat card: 0.5 mid, 0.75 three-quarters!",
    "Now the scary part: 1/3 tsp salt!",
    "1/3 walks forever on the line!",
    "0.3, 0.33, 0.333... never lands!",
    "Right. That is a repeating decimal!",
    "The 3 repeats with no end. Dots = keep going!",
    "Done tonight! But 1/3 x 3 = 0.999999?!",
    "Screens only fit a few digits!",
    "0.999... sticks exactly at 1!",
    "Decimals are not scary. Read the address!",
    "Day 3 closed. 4 pass, 1 failed scoop.",
    "Tomorrow: fractions x decimals. Cups ready!",
]
SPLITS = {2: 2, 3: 2, 6: 2, 8: 2, 11: 2, 14: 2, 15: 2, 17: 2}   # pesan dua bagian
subs = []
si = 0
for i in range(20):
    subs.append([t0[i], MSG_SUB[si]])
    si += 1
    if i in SPLITS:
        subs.append([round(t0[i] + d[i] * 0.48, 2), MSG_SUB[si]])
        si += 1
subs += [
    [flash[0][0], "0.40 vs 0.75 on the ruler line!"],
    [flash[1][0], "1/3 never lands. It repeats!"],
    [flash[2][0], "Same value, two spellings: 0.999... = 1!"],
    [round(quiz[0] + 2.2, 2), "The account left a day-3 mission!"],
    [round(quiz[0] + 5.8, 2), "Eight helper cards are waiting."],
    [round(end[0] + 0.6, 2), "Thanks for watching."],
]
subs = sorted([[round(s0, 2), s1] for s0, s1 in subs], key=lambda x: x[0])

# ---- efek ----
bursts = [
    [round(t0[11] + 0.1, 2), round(t0[11] + 2.3, 2), 10, 130, 0],
    [round(t0[18] + 0.2, 2), round(t0[18] + 3.2, 2), 18, 230, 1],
]
rises = [round(t0[9], 2), round(min(flash[2][0] - 0.6, t0[9] + 7.0), 2)]
imps = [
    [0.4, 2.0],
    [round(flash[0][0] + 0.8, 2), round(flash[0][0] + 2.4, 2)],
    [round(flash[1][0] + 0.8, 2), round(flash[1][0] + 2.4, 2)],
    [round(flash[2][0] + 1.0, 2), round(flash[2][0] + 3.0, 2)],
    [cards[4][0], round(cards[4][0] + 1.6, 2)],
    [quiz[0], round(quiz[0] + 1.6, 2)],
]
photos = [i for i in range(20) if i in (0, 7, 18)]
dollys = [[t0[i], round(t0[i] + 3.4, 2), 0.024] for i in photos]
dollys += [[flash[2][0], round(flash[2][1] - 0.2, 2), 0.022],
           [t0[17], round(t0[17] + 2.8, 2), 0.02]]
dips = [round(c[0], 2) for c in cards[1:5]] + [quiz[0]]

TM = dict(dur=DUR, wins=[3.8, CARD_WIN, CARD_WIN, CARD_WIN, CARD_WIN],
          m=t0, div=DIVS, flash=flash, subs=subs, bursts=bursts,
          rises=rises, quiz=quiz, end=end, imps=imps, dollys=dollys,
          dips=dips, ma=ma, voff=VOFF, d=d, intro=[INTRO1, INTRO2])

# validasi tempo
for i in range(19):
    gap = t0[i + 1] - t0[i]
    assert gap >= GAP_MIN - 1e-9, f"gap {i} {gap:.2f}"
hangs = []
for k in range(len(subs) - 1):
    hang = subs[k + 1][0] - subs[k][0]
    hangs.append(hang)
    need = max(1.7, len(subs[k][1]) / 17.0)
    if hang < need - 1e-9:
        raise AssertionError(f"sub {k} tampil {hang:.2f} < {need:.2f}: {subs[k][1]!r}")
    if hang > 15.5 + 1e-9:
        for j in range(max(0, k - 2), min(len(subs), k + 3)):
            print(f"  sub[{j}] t={subs[j][0]:7.2f} {subs[j][1][:44]!r}")
        raise AssertionError(f"sub {k} menggantung {hang:.2f}s: {subs[k][1]!r}")
print(f"DUR={DUR}s  sub={len(subs)} beat  hang_max={max(hangs):.1f}s  "
      f"intro1={INTRO1} intro2={INTRO2} msg0={t0[0]}")
print("t0:", [round(x, 1) for x in t0])

(HERE / "timing.json").write_text(json.dumps(TM, indent=1, ensure_ascii=False))
frag = ("/* ---------- TIMING rev16 (single source of truth): dihitung dari "
        "durasi voice 20 klip oleh timeline17rp.py ---------- */\n"
        "const TM=" + json.dumps(TM, separators=(",", ":"), ensure_ascii=False) + ";\n")
(HERE / "frag_time.js").write_text(frag)
print(f"timing.json + frag_time.js ok ({(HERE / 'frag_time.js').stat().st_size // 1024} KB)")
