#!/usr/bin/env python3
"""TIMELINE rev15 VIDEO 16: satu sumber kebenaran untuk semua waktu.
Membaca durasi 20 klip voice (/tmp/voice16/durations.json) lalu menghitung:
t0 tiap pesan (jeda menyesuaikan panjang voice), slot kartu babak, slot
diagram menyala, hening pra-twist, papan misi, endcard, burst, IMPS, dolly,
dips, subtitle (29 beat: pesan panjang dipecah dua agar tak menggantung).
Output: timing.json (audio16rp + qa16rp) + frag_time.js (const TM untuk engine).
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
D = json.loads(Path("/tmp/voice16/durations.json").read_text())
d = [D[f"m{i:02d}"] for i in range(20)]

VOFF = 0.42          # voice mulai setelah pop bubble
GAP_MIN = 3.0        # jeda minimum antar pesan (hukum tempo baca)
GAP_PAD = 1.25       # ekor voice sebelum pesan berikutnya
FLASH_DUR = [3.4, 3.4, 4.0]   # twist lebih lambat (slow motion)
FLASH_PAD = 1.5
CARD_WIN = 1.8
CARD_PAD = 2.6       # kartu 1.8 s + napas, lalu pesan pertama babak pop
QUIZ_DUR = 8.6

DIV_TEXT = ["GRUP TERBUKA", "BIMO BELUM PERCAYA", "DILA MULAI MENGHITUNG",
            "DEBAT SELESAI, BUKTI TIBA", "AKUN MISTERIUS AKTIF"]
DIV_LABEL = [[0.4, "GRUP BAHAS FYP · 00.31"], None, None, None, None]

# ---- rantai t0 ----
t0 = [0.0] * 20
cards = [[0.0] for _ in range(5)]     # kartu 0 di-set manual
flash = [[0.0, 0.0] for _ in range(3)]
t0[0] = 2.8
cards[0] = [0.4]

DIV_BEFORE = {4: 1, 7: 2, 12: 3, 16: 4}   # kartu babak sebelum pesan j
FLASH_AFTER = {4: 0, 7: 1, 11: 2}         # diagram setelah pesan i

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
    txt = (DIV_LABEL[ci] if DIV_LABEL[ci]
           else (["MENIT BERIKUTNYA", "KALKULATOR · TANGGA DOBEL",
                  "JAM 1 PAGI · MASIH GAS", "JAM 2 PAGI · DIA NGEPOST"][ci - 1]))
    DIVS.append([cards[ci][0], txt])

# ---- subtitle 29 beat (pesan panjang dipecah dua) ----
MSG_SUB = [
    "FYP claim: fold paper 42 times, reach the Moon!",
    "No way. Doubled 42 times is still thin paper!",
    "But it is specific: 2^42. Doubled 42 times!",
    "The caption says 2 to the 42. Let us check!",
    "Wait. 2^3 is not 2 times 3!",
    "2^3 = 2 x 2 x 2 = 8. I always said 6. Oops!",
    "Many get it wrong. Power = how many times!",
    "Counting sheet: 2^2 up to 2^10 collected!",
    "2^10 = 1024 folds. Already 10 cm thick!",
    "Moon is 384,000 km away. Very far!",
    "But each fold doubles. 2^20 = 105 meters?!",
    "We count to 42 tonight. Settle the debate!",
    "The doubling ladder, check this out!",
    "10 cm, 105 m, 107 km, 439,804 km!",
    "439 thousand km. The Moon is 384,400. I lose!",
    "Impossible claims can be true. Math separates them!",
    "He posted again! Full proof tonight, he said!",
    "New post: 439,804 km past the Moon!",
    "Moon: 384,400 km. It wins!",
    "Hi. That video is mine. I only read here.",
    "You love debates, so I made something true and wild!",
    "Nice. Count first, then comment. Deal?",
    "Someone asked 2^-1. Negative? Tomorrow!",
]
SPLITS = {12: 2, 16: 2, 17: 2}   # indeks pesan dengan subtitle dua bagian
subs = []
si = 0
for i in range(20):
    subs.append([t0[i], MSG_SUB[si]])
    si += 1
    if i in SPLITS:
        subs.append([round(t0[i] + d[i] * 0.48, 2), MSG_SUB[si]])
        si += 1
subs += [
    [flash[0][0], "Exponents: repeated times, written short!"],
    [flash[1][0], "2 cubed = 8. 2 times 3 = 6. Different!"],
    [flash[2][0], "Each double, the distance explodes!"],
    [round(quiz[0] + 2.4, 2), "The mystery left four questions!"],
    [round(quiz[0] + 6.1, 2), "Eight helper cards are waiting."],
    [round(end[0] + 0.6, 2), "Thanks for watching."],
]
subs = sorted([[round(s0, 2), s1] for s0, s1 in subs], key=lambda x: x[0])

# ---- efek ----
bursts = [
    [round(t0[8] + 0.1, 2), round(t0[8] + 2.3, 2), 10, 130, 0],
    [round(t0[16] + 0.2, 2), round(t0[16] + 3.2, 2), 18, 230, 1],
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
photos = [i for i in range(20) if i in (0, 7, 16)]
dollys = [[t0[i], round(t0[i] + 3.4, 2), 0.024] for i in photos]
dollys += [[flash[2][0], round(flash[2][1] - 0.2, 2), 0.022],
           [t0[17], round(t0[17] + 2.8, 2), 0.02]]
dips = [round(c[0], 2) for c in cards[1:5]] + [quiz[0]]

TM = dict(dur=DUR, wins=[2.0, CARD_WIN, CARD_WIN, CARD_WIN, CARD_WIN],
          m=t0, div=DIVS, flash=flash, subs=subs, bursts=bursts,
          rises=rises, quiz=quiz, end=end, imps=imps, dollys=dollys,
          dips=dips, ma=ma, voff=VOFF, d=d)

# validasi tempo
for i in range(19):
    gap = t0[i + 1] - t0[i]
    assert gap >= GAP_MIN - 1e-9, f"gap {i} {gap:.2f}"
hangs = []
for k in range(len(subs) - 1):
    hang = subs[k + 1][0] - subs[k][0]
    hangs.append(hang)
    need = max(1.7, len(subs[k][1]) / 17.0)
    assert hang >= need - 1e-9, f"sub {k} tampil {hang:.2f} < {need:.2f}"
    assert hang <= 15.5, f"sub {k} menggantung {hang:.2f}s"
print(f"DUR={DUR}s  sub={len(subs)} beat  hang_max={max(hangs):.1f}s")
print("t0:", [round(x, 1) for x in t0])

(HERE / "timing.json").write_text(json.dumps(TM, indent=1))
frag = ("/* ---------- TIMING rev15 (single source of truth): dihitung dari "
        "durasi voice 20 klip oleh timeline16rp.py ---------- */\n"
        "const TM=" + json.dumps(TM, separators=(",", ":")) + ";\n")
(HERE / "frag_time.js").write_text(frag)
print(f"timing.json + frag_time.js ok ({(HERE / 'frag_time.js').stat().st_size // 1024} KB)")
