#!/usr/bin/env python3
"""TIMELINE rev21 VIDEO 18: satu sumber kebenaran untuk semua waktu.
Membaca durasi 24 klip voice (/tmp/voice18/durations.json) lalu menghitung:
t0 tiap pesan (jeda menyesuaikan panjang voice), slot kartu babak (lintas
tengah malam), slot diagram menyala, hening pra-twist (pertanyaan PUSAT),
papan misi, endcard, burst, IMPS, dolly, dips, subtitle EN (35 beat).
Output: timing.json (audio18rp + qa18rp) + frag_time.js (const TM)."""
import json
from pathlib import Path

HERE = Path(__file__).parent
D = json.loads(Path("/tmp/voice18/durations.json").read_text())
d = [D[f"m{i:02d}"] for i in range(24)]

VOFF = 0.42          # voice mulai setelah pop bubble
GAP_MIN = 3.0        # jeda minimum antar pesan (hukum tempo baca)
GAP_PAD = 1.25       # ekor voice sebelum pesan berikutnya
FLASH_DUR = [3.4, 3.6, 4.0]   # twist lebih lambat (slow motion)
FLASH_PAD = 1.5
CARD_WIN = 1.8
CARD_PAD = 2.6       # kartu 1.8 s + napas, lalu pesan pertama babak pop
QUIZ_DUR = 8.0

DIV_TEXT = ["GRUP JAGA GUDANG", "GILIRAN RAK · 23.45", "BAGI RATA · 23.52",
            "JAM 12 MALAM · 00.00", "PERTANYAAN PUSAT · 00.12"]
# kartu judul TANPA label waktu - cukup "GRUP JAGA GUDANG".
DIV_LABEL = ["GRUP JAGA GUDANG", None, None, None, None]

INTRO1 = [0.4, 4.2]   # kartu judul: ilustrasi penuh + label grup
INTRO2 = [4.5, 7.6]   # kartu produksi: dipersembahkan akiomida.com

t0 = [0.0] * 24
cards = [[0.0] for _ in range(5)]
flash = [[0.0, 0.0] for _ in range(3)]
t0[0] = 8.2
cards[0] = [0.4]

DIV_BEFORE = {4: 1, 8: 2, 13: 3, 18: 4}   # kartu babak sebelum pesan j
FLASH_AFTER = {15: 0, 18: 1, 21: 2}       # garis bilangan/pertanyaan/twist

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
        ct = nxt if i not in FLASH_AFTER else nxt + 0.9
        ct = t0[i] + d[i] + 1.0 if i not in FLASH_AFTER else flash[fi][1] + 1.2
        cards[ci] = [round(ct, 2)]
        nxt = ct + CARD_PAD
    if i == 22:  # papan misi antara pesan 22 (polling) dan 23 (penutup)
        q0 = t0[i] + d[i] + 1.4
        nxt = q0 + QUIZ_DUR + 0.7
    t0[i + 1] = round(nxt, 2)

quiz = [round(t0[22] + d[22] + 1.4, 2), round(t0[22] + d[22] + 1.4 + QUIZ_DUR, 2)]
ma = [round(flash[1][0] - 1.0, 2), flash[1][0]]   # hening pra-twist (pertanyaan)
end = [round(t0[23] + d[23] + 1.6, 2)]
end += [round(end[0] + 0.2, 2), round(end[0] + 2.5, 2), round(end[0] + 3.5, 2)]
DUR = round(end[0] + 5.0, 2)

DIVS = []
for ci in range(5):
    txt = DIV_LABEL[ci] if DIV_LABEL[ci] else DIV_TEXT[ci]
    DIVS.append([cards[ci][0], txt])

# ---- subtitle EN 35 beat (pesan panjang dipecah dua) ----
MSG_SUB = [
    "Warehouse night: every count must be honest!",
    "Gilang: 12 boxes in, stock is surely right!",
    "Counts cannot be guessed. Count, then sign!",
    "The sheet says 96. Racks must reach 96!",
    "Rack by rack. The tick waits for numbers!",
    "24+24+24+24: total 96! I swore it was 100!",
    "Rack one to four: twenty-four each. 96!",
    "12 in, 4 out. The sheet was updated to 96!",
    "Counted, not remembered. That is the rule!",
    "So the in-out log is not just a formality!",
    "96 is 96, on any label, at any hour!",
    "Omak: 30 cakes for 6 vendors. Fair share!",
    "30 / 6 = 5 each. Even, no leftovers!",
    "If 7 people? 30 / 7 is 4.25. Cannot cut cake!",
    "30 / 7 is 4.25. You cannot cut cake like that!",
    "7 x 4 = 28. Two left. Leftovers have owners!",
    "Omak wonders: where do numbers come from?",
    "Night report: the meat freezer reads -5!",
    "Minus is an address below zero!",
    "On the number line, zero is the middle!",
    "The seat of -5: five steps below zero!",
    "Minus is not decoration. It is an address!",
    "Sticker: the honest count. Read minus slowly!",
    "Midnight question: is 2+2 still 4 alone?",
    "Created by humans, or already there?",
    "Gilang: made! No humans, no writing!",
    "But the freezer stays -5 unseen. Cold waits!",
    "Symbols are made. The values were there first!",
    "30 boxes do not become 29 by relabeling!",
    "Night vote: 52% found it, 48% made it!",
    "Voting closed. The warehouse stays honest!",
    "Tomorrow: the natural numbers rack!",
]
SPLITS = {2: 2, 4: 2, 5: 2, 10: 2, 15: 2, 18: 2, 21: 2, 23: 2}
subs = []
si = 0
for i in range(24):
    subs.append([t0[i], MSG_SUB[si]])
    si += 1
    if i in SPLITS:
        subs.append([round(t0[i] + d[i] * 0.48, 2), MSG_SUB[si]])
        si += 1
subs += [
    [flash[0][0], "-5 lives below zero on the line!"],
    [flash[1][0], "Is 2+2 still 4 when nobody watches?"],
    [flash[2][0], "Symbols are made. Values are found!"],
    [round(quiz[0] + 1.2, 2), "The warehouse left a night mission!"],
    [round(quiz[0] + 4.4, 2), "Eight helper cards are waiting."],
    [round(end[0] + 0.6, 2), "Thanks for watching."],
]
subs = sorted([[round(s0, 2), s1] for s0, s1 in subs], key=lambda x: x[0])

# ---- efek ----
bursts = [
    [round(t0[11] + 0.1, 2), round(t0[11] + 2.3, 2), 10, 130, 0],
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
photos = [i for i in range(24) if i in (0, 13, 22)]
dollys = [[t0[i], round(t0[i] + 3.4, 2), 0.024] for i in photos]
dollys += [[flash[2][0], round(flash[2][1] - 0.2, 2), 0.022],
           [t0[18], round(t0[18] + 2.8, 2), 0.02]]
dips = [round(c[0], 2) for c in cards[1:5]] + [quiz[0]]

TM = dict(dur=DUR, wins=[3.8, CARD_WIN, CARD_WIN, CARD_WIN, CARD_WIN],
          m=t0, div=DIVS, flash=flash, subs=subs, bursts=bursts,
          rises=rises, quiz=quiz, end=end, imps=imps, dollys=dollys,
          dips=dips, ma=ma, voff=VOFF, d=d, intro=[INTRO1, INTRO2])

# validasi tempo
for i in range(23):
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
frag = ("/* ---------- TIMING rev21 (single source of truth): dihitung dari "
        "durasi voice 24 klip oleh timeline18rp.py ---------- */\n"
        "const TM=" + json.dumps(TM, separators=(",", ":"), ensure_ascii=False) + ";\n")
(HERE / "frag_time.js").write_text(frag)
print(f"timing.json + frag_time.js ok ({(HERE / 'frag_time.js').stat().st_size // 1024} KB)")
