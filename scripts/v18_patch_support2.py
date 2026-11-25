#!/usr/bin/env python3
"""Support patch bagian 2: timeline (full), audio, qa, gen_meme, embed."""
import json
from pathlib import Path

HERE = Path("/home/z/my-project/scripts/vimoda18rp")


def patch(fn, pairs):
    p = HERE / fn
    t = p.read_text()
    ok = 0
    for old, new in pairs:
        if old not in t:
            assert new in t, f"{fn}: OLD & NEW absen: {old[:70]!r}"
            continue
        assert t.count(old) == 1, f"{fn}: TIDAK UNIK: {old[:70]!r}"
        t = t.replace(old, new)
        ok += 1
    p.write_text(t)
    print(f"{fn}: {ok} patch ok")


# ---------- timeline18rp.py: full rewrite ----------
TIMELINE = '''#!/usr/bin/env python3
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
    "Gilang: made! No humans, no writing!",
    "But the freezer stays -5 unseen. Cold waits!",
    "Symbols are made. The values were there first!",
    "30 boxes do not become 29 by relabeling!",
    "Night vote: 52% found it, 48% made it!",
    "Almost a tie. Tomorrow: the natural numbers rack!",
]
SPLITS = {2: 2, 5: 2, 10: 2, 15: 2, 21: 2}   # pesan dua bagian
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
        "durasi voice 24 klip oleh timeline18rp.py ---------- */\\n"
        "const TM=" + json.dumps(TM, separators=(",", ":"), ensure_ascii=False) + ";\\n")
(HERE / "frag_time.js").write_text(frag)
print(f"timing.json + frag_time.js ok ({(HERE / 'frag_time.js').stat().st_size // 1024} KB)")
'''
(HERE / "timeline18rp.py").write_text(TIMELINE)
print("timeline18rp.py: full rewrite ok")

# ---------- audio18rp.py ----------
AUDIO_PAIRS = [
    ("""Musik, SFX & VOICE ACTING rev16 - VIDEO 17 "KOMA TAK BERUJUNG: Bilangan
Desimal" (dunia GRUP RESEP GAGAL).""",
     """Musik, SFX & VOICE ACTING rev21 - VIDEO 18 "MALAM INVENTARIS: Bilangan
Diciptakan atau Ditemukan?" (dunia GRUP JAGA GUDANG)."""),
    ("""arpeggio lembut, pop notifikasi bernada per chara (NADIA 587, GEDE 330,
VITA 494, KAMU 740, MYST 880), swell hangat di kartu babak (bukan boom
trailer), karpet tape noise sangat pelan, TANPA kick+hat ala klub.
rev15-16: 22 klip VOICE (voice18rp.py, engine edge-tts id-ID; adapter
VoiceStudio/z-ai tersedia) dimix di t0 tiap pesan + ducking otomatis:
bed diturunkan 55% selama voice berbicara. Hening total 1.0 s sebelum
diagram twist (MA), berubah F MAJOR hangat saat kartu JAM 7 MALAM.""",
     """arpeggio lembut, pop notifikasi bernada per chara (OMAK 523, GILANG 330,
RUPI 660, KAMU 740, DEDI 392, PUSAT 880), swell hangat di kartu babak
(bukan boom trailer), karpet tape noise sangat pelan, TANPA kick+hat ala
klub. 24 klip VOICE dimix di t0 tiap pesan + ducking otomatis: bed
diturunkan 55% selama voice berbicara. Hening total 1.0 s sebelum
pertanyaan PUSAT (MA), hangat F MAJOR saat jawaban dua lapis + voting."""),
    ("""# ---------- PAD: D MINOR malam -> F MAJOR hangat saat kartu JAM 7 MALAM (rev19) ----------
D3, F3, A3, C4 = 146.83, 174.61, 220.0, 261.63
Bb2, Bb3, G3, D4 = 116.54, 233.08, 196.0, 293.66
SEG = [
    (0.0, card2, (D3, F3, A3)),        # grup terbuka: debat dimulai
    (card2, MA[0], (Bb2, D3, F3)),     # babak hitungan
    # MA: hening total 1.0 s sebelum twist
    (f3t0, card4, (G3, Bb3, D4)),      # twist dan kekalahannya GEDE
    (card4, DUR, (F3, A3, C4)),        # JAM 7 MALAM: uji rasa, hangat F major
]""",
     """# ---------- PAD: D MINOR malam -> F MAJOR hangat sejak jawaban dua lapis (rev21) ----------
D3, F3, A3, C4 = 146.83, 174.61, 220.0, 261.63
Bb2, Bb3, G3, D4 = 116.54, 233.08, 196.0, 293.66
card2 = DIV[2]
f2t0 = FLASH[1][0]
f3t0 = FLASH[2][0]
SEG = [
    (0.0, card2, (D3, F3, A3)),        # malam inventaris: hitungan dimulai
    (card2, MA[0], (Bb2, D3, F3)),     # stok, bagi rata, freezer
    # MA: hening total 1.0 s sebelum pertanyaan PUSAT
    (f2t0, f3t0, (G3, Bb3, D4)),       # pertanyaan + debat dibuat/ditemukan
    (f3t0, DUR, (F3, A3, C4)),         # jawaban dua lapis + voting: hangat
]"""),
    ("""for (lo, hi, scale) in ((0.4, MA[0] - 0.3, DM_SCALE),
                        (f3t0 + 0.2, card4 - 0.3, DM_SCALE),
                        (card4 + 0.4, END[0] + 1.0, F_SCALE)):""",
     """for (lo, hi, scale) in ((0.4, MA[0] - 0.3, DM_SCALE),
                        (MA[1] + 0.2, f3t0 - 0.3, DM_SCALE),
                        (f3t0 + 0.4, END[0] + 1.0, F_SCALE)):"""),
    ("""for (lo, hi) in ((0.4, MA[0]), (f3t0, card4), (card4, END[0])):""",
     """for (lo, hi) in ((0.4, MA[0]), (MA[1], f3t0), (f3t0, END[0])):"""),
    ("""WHO = ("NADIA", "GEDE", "KAMU", "NADIA", "GEDE", "KAMU", "VITA", "GEDE",
       "VITA", "GEDE", "KAMU", "GEDE", "VITA", "NADIA", "KAMU", "VITA",
       "GEDE", "VITA", "MYST", "MYST")
POP_F = {"NADIA": 587.0, "GEDE": 330.0, "VITA": 494.0, "KAMU": 740.0,
         "MYST": 880.0}""",
     """WHO = ("PUSAT", "GILANG", "KAMU", "RUPI", "GILANG", "KAMU", "RUPI",
       "GILANG", "OMAK", "KAMU", "RUPI", "GILANG", "OMAK", "DEDI", "KAMU",
       "RUPI", "GILANG", "RUPI", "PUSAT", "GILANG", "DEDI", "RUPI",
       "PUSAT", "PUSAT")
POP_F = {"OMAK": 523.0, "GILANG": 330.0, "RUPI": 660.0, "KAMU": 740.0,
         "DEDI": 392.0, "PUSAT": 880.0}"""),
    ("    photo = i in (0, 7, 18)", "    photo = i in (0, 13, 22)"),
    ('    if who == "MYST":', '    if who == "PUSAT":'),
    ("""    if i == 12:                            # stiker kartu praktis""",
     """    if i == 17:                            # stiker JURUS HITUNG JUJUR"""),
    ("""add(M[17] + 0.4, chime(880.0, 0.04))       # MYST: pembuat resep nongol
add(M[18] + 0.35, chime(523.25, 0.08))     # GEDE: deal semua""",
     """add(M[18] + 0.4, chime(880.0, 0.04))       # PUSAT: pertanyaan tengah malam
add(M[21] + 0.35, chime(523.25, 0.08))     # RUPI: jawaban dua lapis"""),
    ("""    g = 0.92 if who == "MYST" else 1.0""", """    g = 0.92 if who == "PUSAT" else 1.0"""),
    ("""print(f"audio OK: {OUT} ({DUR:.1f}s, peak {peak:.2f}, voice 22 klip mixed, "
      f"bed ducking -55% saat bicara)")""",
     """print(f"audio OK: {OUT} ({DUR:.1f}s, peak {peak:.2f}, voice 24 klip mixed, "
      f"bed ducking -55% saat bicara)")"""),
]
patch("audio18rp.py", AUDIO_PAIRS)
print("support patch bagian 2 selesai (timeline+audio)")
