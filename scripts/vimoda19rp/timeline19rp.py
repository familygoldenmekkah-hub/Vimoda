#!/usr/bin/env python3
"""TIMELINE rev22 VIDEO 19: satu sumber kebenaran untuk semua waktu.
Membaca durasi 24 klip voice (/tmp/voice19/durations.json), slot kartu
babak, diagram menyala, hening pra-twist, papan misi, endcard, burst,
IMPS, dolly, dips, subtitle EN (37 beat). Output: timing.json +
frag_time.js (const TM)."""
import json
from pathlib import Path

HERE = Path(__file__).parent
D = json.loads(Path("/tmp/voice19/durations.json").read_text())
d = [D[f"m{i:02d}"] for i in range(24)]

VOFF = 0.42
GAP_MIN = 3.0
GAP_PAD = 1.25
FLASH_DUR = [3.6, 3.6, 4.0]
FLASH_PAD = 1.5
CARD_WIN = 1.8
CARD_PAD = 2.6
QUIZ_DUR = 8.0

DIV_TEXT = ["GRUP JAGA TERMINAL", "GILIRAN GARASI · 03.03",
            "MONITOR KARCIS · 03.10", "PAPAN GARASI · 03.19",
            "VOTING PUSAT · 03.30"]
DIV_LABEL = ["GRUP JAGA TERMINAL", None, None, None, None]

INTRO1 = [0.4, 4.2]
INTRO2 = [4.5, 7.6]

t0 = [0.0] * 24
cards = [[0.0] for _ in range(5)]
flash = [[0.0, 0.0] for _ in range(3)]
t0[0] = 8.2
cards[0] = [0.4]

DIV_BEFORE = {4: 1, 8: 2, 13: 3, 19: 4}
FLASH_AFTER = {11: 0, 19: 1, 21: 2}

for i in range(23):
    gap = max(GAP_MIN, d[i] + GAP_PAD)
    nxt = t0[i] + gap
    if i in FLASH_AFTER:
        fi = FLASH_AFTER[i]
        ft = t0[i] + d[i] + FLASH_PAD
        flash[fi] = [round(ft, 2), round(ft + FLASH_DUR[fi], 2)]
        nxt = flash[fi][1] + 1.5
    if (i + 1) in DIV_BEFORE:
        ci = DIV_BEFORE[i + 1]
        ct = t0[i] + d[i] + 1.0 if i not in FLASH_AFTER else flash[fi][1] + 1.2
        cards[ci] = [round(ct, 2)]
        nxt = ct + CARD_PAD
    if i == 22:  # papan misi antara pesan 22 (polling) dan 23 (penutup)
        q0 = t0[i] + d[i] + 1.4
        nxt = q0 + QUIZ_DUR + 0.7
    t0[i + 1] = round(nxt, 2)

quiz = [round(t0[22] + d[22] + 1.4, 2), round(t0[22] + d[22] + 1.4 + QUIZ_DUR, 2)]
ma = [round(flash[1][0] - 1.0, 2), flash[1][0]]
end = [round(t0[23] + d[23] + 1.6, 2)]
end += [round(end[0] + 0.2, 2), round(end[0] + 2.5, 2), round(end[0] + 3.5, 2)]
DUR = round(end[0] + 5.0, 2)

DIVS = []
for ci in range(5):
    txt = DIV_LABEL[ci] if DIV_LABEL[ci] else DIV_TEXT[ci]
    DIVS.append([cards[ci][0], txt])

MSG_BASE = [
    "Terminal 3 AM: units must match tickets!",
    "Bayu: unit 09 is the champion. Get in line!",
    "30 tickets printed: numbers 1 to 30!",
    "30 tickets, 30 seats. No half passengers!",
    "Garages 0 to 9. Guarded for 30 years!",
    "So that is 10 garages. Zero counts!",
    "Hmph! Zero is an empty garage!",
    "But tickets start at 1. Different rules!",
    "Monitor: 30 tickets, 10 garages, 3 units!",
    "30 tickets, 3 units: 10 riders each!",
    "Old book starts at 1: only nine rows!",
    "Whole numbers: 0, 1, 2, 3, and on!",
    "History witness: no garage 0 back then!",
    "Report: garage 7 empty. Zero units!",
    "Garage 7 still exists. Zero inside!",
    "Seat 0 does not exist. Zero means empty!",
    "30 years miscounting the front garage!",
    "Sticker: the whole count. 1-30, 0-9!",
    "Hmph. Fine. Zero garage is family too!",
    "Dawn question: does counting start at 0 or 1?",
    "Both right, depending on the book!",
    "30 stays 30. Counts follow the rule!",
    "Dawn vote: 61% say 0, 39% say 1!",
    "Tomorrow: natural numbers rise a grade!",
]
SPLIT2 = {
    2: "Thirty riders are waiting outside!",
    4: "Zero counts! That is 10 garages!",
    9: "Ten numbers from 0 to 9!",
    10: "The next terminal uses 0 to 9: ten rows!",
    11: "No half units. No 2.5 angkot!",
    19: "One sheet, one rule!",
    21: "Noted: at 3.26 Bayu stopped arguing!",
    23: "The small camp is family too!",
}
subs = []
for i in range(24):
    subs.append([t0[i], MSG_BASE[i]])
    if i in SPLIT2:
        subs.append([round(t0[i] + d[i] * 0.48, 2), SPLIT2[i]])
subs += [
    [flash[0][0], "Whole numbers: 0 to 9 and forever!"],
    [flash[1][0], "Does counting start at 0 or 1?"],
    [flash[2][0], "Rules differ. Counts stay honest!"],
    [round(quiz[0] + 1.2, 2), "The terminal left a dawn mission!"],
    [round(quiz[0] + 4.4, 2), "Eight helper cards are waiting."],
    [round(end[0] + 0.6, 2), "Thanks for watching."],
]
subs = sorted([[round(s0, 2), s1] for s0, s1 in subs], key=lambda x: x[0])

bursts = [
    [round(t0[18] + 0.1, 2), round(t0[18] + 2.3, 2), 10, 130, 0],
    [round(t0[22] + 0.2, 2), round(t0[22] + 3.2, 2), 18, 230, 1],
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
photos = [i for i in range(24) if i in (0, 8, 13, 22)]
dollys = [[t0[i], round(t0[i] + 3.4, 2), 0.024] for i in photos]
dollys += [[flash[2][0], round(flash[2][1] - 0.2, 2), 0.022],
           [t0[19], round(t0[19] + 2.8, 2), 0.02]]
dips = [round(c[0], 2) for c in cards[1:5]] + [quiz[0]]

TM = dict(dur=DUR, wins=[3.8, CARD_WIN, CARD_WIN, CARD_WIN, CARD_WIN],
          m=t0, div=DIVS, flash=flash, subs=subs, bursts=bursts,
          rises=rises, quiz=quiz, end=end, imps=imps, dollys=dollys,
          dips=dips, ma=ma, voff=VOFF, d=d, intro=[INTRO1, INTRO2])

for i in range(23):
    gap = t0[i + 1] - t0[i]
    assert gap >= GAP_MIN - 1e-9, f"gap {i} {gap:.2f}"
hangs = []
for k in range(len(subs) - 1):
    hang = subs[k + 1][0] - subs[k][0]
    hangs.append(hang)
    need = max(1.7, len(subs[k][1]) / 17.0)
    if hang < need - 1e-9:
        raise AssertionError(f"sub {k} pendek {hang:.2f} < {need:.2f}: {subs[k][1]!r}")
    if hang > 15.5 + 1e-9:
        for j in range(max(0, k - 2), min(len(subs), k + 3)):
            print(f"  sub[{j}] t={subs[j][0]:7.2f} {subs[j][1][:44]!r}")
        raise AssertionError(f"sub {k} menggantung {hang:.2f}s: {subs[k][1]!r}")
print(f"DUR={DUR}s  sub={len(subs)} beat  hang_max={max(hangs):.1f}s  "
      f"msg0={t0[0]}")
print("t0:", [round(x, 1) for x in t0])

(HERE / "timing.json").write_text(json.dumps(TM, indent=1, ensure_ascii=False))
frag = ("/* ---------- TIMING rev22 (single source of truth): dihitung dari "
        "durasi voice 24 klip oleh timeline19rp.py ---------- */\n"
        "const TM=" + json.dumps(TM, separators=(",", ":"), ensure_ascii=False) + ";\n")
(HERE / "frag_time.js").write_text(frag)
print(f"timing.json + frag_time.js ok ({(HERE / 'frag_time.js').stat().st_size // 1024} KB)")
