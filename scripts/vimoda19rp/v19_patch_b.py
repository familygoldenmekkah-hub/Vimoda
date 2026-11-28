#!/usr/bin/env python3
"""Patch B: voice19 + timeline19 (full) + audio19 + qa19 + gen_meme19 + embed."""
from pathlib import Path

HERE = Path("/home/z/my-project/scripts/vimoda19rp")


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


# ---------- voice19rp.py ----------
VOICE_PAIRS = [
    ("VOICE ACTING rev21 VIDEO 18 - generator suara 6 chara (24 klip).",
     "VOICE ACTING rev22 VIDEO 19 - generator suara 6 chara (24 klip).\nFormula Dialog AKIOMIDA v1 (F1-F8) diterapkan pada LINES."),
    ("# (who, teks lisan) - rev21: skema MALAM INVENTARIS (gudang), sapaan\n# unik per chara, waktu 23.30 lintas tengah malam konsisten kartu babak.\n# Angka dilisankan; tetap sopan (aturan #39).",
     "# (who, teks lisan) - rev22: skema TERMINAL JAM 3 (bahan bilangan\n# cacah), sapaan unik per chara (F1), arc tsun-dere BAYU (F4),\n# cermin fakta lawan (F5), empati MELI (F8). Angka dilisankan;\n# tetap sopan (aturan #39)."),
    ("""    ("PUSAT", "Malam inventaris... resmi dibuka! Semua hitungan wajib "
              "sah. Rak dihitung ulang! Suhu freezer wajib dibaca benar!"),
    ("GILANG", "Sore tadi gue tinggal dua belas kard, beres. Stok pasti "
               "pas... gak usah dihitung ulang. Capek doang."),
    ("KAMU", "Om Gilang... jumlah itu gak boleh ditebak. Lembar stok "
             "tulis sembilan puluh enam. Rak harus nyampe sembilan puluh "
             "enam. Dihitung... baru sah."),
    ("RUPI", "Betul, kak. Gue hitung rak satu sampai rak empat... satu "
             "per satu. Centangnya nunggu angka... bukan nunggu capek."),
    ("GILANG", "Rak satu: dua puluh empat. Rak dua: dua puluh empat. "
               "Rak tiga: dua puluh empat. Rak empat: dua puluh empat. "
               "Total... sembilan puluh enam pas?! Gue kira seratus! Kok "
               "bisa beda?"),
    ("KAMU", "Dua belas kard masuk sore... empat keluar ke toko. Lembar "
             "stok ikut diubah jadi sembilan puluh enam. Yang sah itu... "
             "yang dihitung, bukan yang diingat."),
    ("GILANG", "Aduh, oke, oke. Berarti catatan masuk-keluar itu bukan "
               "formalitas. Stok bisa beda... dari ingetan kita."),
    ("RUPI", "Iya. Jumlah itu nangkep isi gudang, bukan perasaan. "
             "Gak berubah di label apa pun... di jam berapa pun."),
    ("OMAK", "Kalau gitu omak titip: tiga puluh kotak kue... buat enam "
             "pedagang es pagi nanti. Bagiannya harus rata... anak-anak."),
    ("KAMU", "Tiga puluh bagi enam... tiap pedagang lima kotak. Pas. Gak "
             "ada sisa... gak ada yang kurang."),
    ("RUPI", "Kalau pesennya jadi tujuh orang? Tiga puluh bagi tujuh "
             "itu... empat koma dua koma lima. Kotak kue... gak bisa "
             "dipotong begitu."),
    ("GILANG", "Haduh. Ya sudah: tujuh orang kali empat kotak... dua "
               "puluh delapan. Sisa dua. Sisa punya pemilik... gak boleh "
               "hilang diam-diam."),
    ("OMAK", "Nah, gini baru paham. Omak jadi mikir... angka rata, angka "
             "sisa... angka-angka ini asalnya dari mana, ya?"),
    ("DEDI", "Laporan malam: freezer daging... minus lima derajat. Gue "
             "tulis minus lima... bukan lima doang. Itu beda jauh."),
    ("KAMU", "Betul, om Dedi. Minus itu alamat... di bawah nol. Kalau "
             "dicatat lima doang... besoknya daging jadi masalah."),
    ("RUPI", "Di garis bilangan, nol itu tengah. Naik ke satu, dua, "
             "tiga... turun ke minus satu, minus dua... sampai minus "
             "lima. Kursi minus lima ada... lima langkah di bawah nol."),
    ("GILANG", "Gitu ya. Berarti minus bukan hiasan... itu alamat. Salah "
               "alamat... daging basi."),
    ("RUPI", "Buat yang baru ikut jaga: jurus hitung jujur. Hitung "
             "ulang... catat masuk-keluar... dan baca minus pelan-pelan."),
    ("PUSAT", "Pertanyaan tengah malam. Gudang tutup, lampu mati... "
              "gak ada yang nonton. Dua tambah dua tetap empat, gak? "
              "Bilangan itu dibuat manusia... atau sudah ada duluan?"),
    ("GILANG", "Gue jawab: bikin! Tulisan dua puluh empat di klip itu... "
               "buatan kita. Gak ada manusia... gak ada tulisan."),
    ("DEDI", "Tulisan memang buatan. Tapi isinya? Freezer gue tetap "
             "minus lima... walau gak ada yang baca. Dinginnya... gak "
             "nunggu dipencet."),
    ("RUPI", "Jawabannya dua lapis, om. Manusia menciptakan simbol... dan "
             "cara nulisnya: dua puluh empat, minus lima, koma. Tapi isi "
             "yang ditulis itu... sudah ada duluan. Tiga puluh kard... "
             "tidak jadi dua puluh sembilan cuma karena labelnya ganti."),
    ("PUSAT", "Voting malam: lima dua persen bilang ditemukan... empat "
              "delapan persen bilang dibuat."),
    ("PUSAT", "Voting ditutup: hampir imbang... tugas gudang bukan "
              "memutuskan, tapi jujur pada hitungan. Besok malam: rak "
              "cacah dibuka. Selamat malam, anak-anak."),
]""",
     """    ("PUSAT", "Perhatian, warga terminal! Dinas dini hari... resmi "
              "dibuka! Unit yang berangkat wajib cocok karcis. Cek "
              "garasi... cek lembar karcis!"),
    ("BAYU", "Antre ya. Unit 09 juaranya terminal ini. Yang lain cuma "
             "pelengkap. Aku berangkat duluan... karcis mah kejar "
             "setoran."),
    ("MELI", "Sabar dikit, bang Bayu. Karcis yang kejar kita malam ini: "
             "cetakan nomor satu sampai tiga puluh. Artinya... tiga "
             "puluh penumpang yang nunggu."),
    ("KAMU", "Tiga puluh karcis, tiga puluh kursi. Semuanya utuh. Di "
             "terminal gak ada penumpang setengah orang."),
    ("HAZ", "Unit juga utuh, nak. Garasi nol sampai sembilan... gue "
            "jagain tiga puluh tahun. Jumlah unit yang jalan harus pas "
            "sama karcis."),
    ("KAMU", "Garasi nol sampai sembilan... berarti sepuluh garasi ya, "
             "om Haz? Nol ikut dihitung."),
    ("BAYU", "Hmph, masa nol dihitung?! Nol itu garasi kosong. Dari "
             "sononya gue mulai garasi satu ampe sembilan. Ya sembilan "
             "unit. Nol mah... cuma angin."),
    ("MELI", "Eh, tapi karcis kita justru mulai dari satu, dan kursi "
             "pertama nomor satu. Beda urusan... beda aturan mulainya, "
             "bang."),
    ("PUSAT", "Monitor dinas terkirim. Tiga puluh karcis... sepuluh "
              "garasi... tiga unit berangkat."),
    ("KAMU", "Liat monitor, om Bayu: tiga puluh karcis buat tiga unit... "
             "tiap unit sepuluh penumpang. Garasi nol sampai sembilan "
             "itu sepuluh nomor. Dua-duanya benar... cuma mulainya beda."),
    ("HAZ", "Buku garasi lama gue mulai dari satu... cuma sembilan "
            "baris. Terminal sebelah bikin nol sampai sembilan... jadi "
            "sepuluh baris. Dua-duanya sah. Yang penting... satu lembar "
            "satu aturan."),
    ("MELI", "Nah itu nama ilmiahnya: bilangan cacah. Angka utuh: nol, "
             "satu, dua, tiga, dan terus. Gak ada setengah unit... gak "
             "ada dua koma lima angkot."),
    ("OMDARI", "Saksi sejarah di sini. Dulu terminal kita gak punya "
               "garasi nol. Bukan nolnya takut... jamannya angka nol "
               "belum dianggap angka."),
    ("PUSAT", "Laporan garasi terkirim. Nomor tujuh kosong... isi nol "
              "unit."),
    ("KAMU", "Justru itu, om. Garasi tujuh gak hilang cuma karena "
             "isinya nol unit. Nol itu angka sah... bukan tanda lupa "
             "nulis."),
    ("MELI", "Di lembar karcis juga gitu: kursi nomor nol gak ada. "
             "Penumpang nol artinya... belum ada yang jalan. Nol "
             "nyimbolkan kosong... bukan musnahkan nomor."),
    ("HAZ", "Aduh. Tiga puluh tahun gue manggil garasi satu paling "
            "depan... ternyata itu garasi nol. Nomor itu aturan... "
            "posisi depan itu kenyataan."),
    ("MELI", "Buat yang baru gabung jaga: jurus hitung utuh. Unit "
             "utuh... karcis urut satu sampai tiga puluh... garasi nol "
             "sampai sembilan."),
    ("BAYU", "Hmph. Oke, oke. Unit 09 tetep juara... tapi garasi nol "
             "juga keluarga. Aku berangkat duluan... kasih contoh yang "
             "bener."),
    ("PUSAT", "Pertanyaan dini hari. Garasi mulai dari nol atau satu? "
              "Karcis mulai dari satu. Mana yang bener? Bilangan cacah "
              "itu... mulai dari nol atau dari satu?"),
    ("HAZ", "Dua-duanya bener... tergantung buku yang dipakai. Yang "
            "gak boleh: campur dua aturan di satu lembar. Aturan boleh "
            "beda... hitungannya harus jujur."),
    ("MELI", "Gimana pun pilihannya, tiga puluh karcis tetep tiga puluh "
             "penumpang... dan tiga unit tetep tiga unit. Hasil hitung "
             "gak ikut-ikutan selera. Eh, gue catat juga... jam tiga "
             "dua puluh enam, bang Bayu akhirnya nggak ribut."),
    ("PUSAT", "Voting dini hari: enam satu persen bilang mulai dari "
              "nol... tiga sembilan persen bilang dari satu."),
    ("PUSAT", "Voting ditutup: satu kubu lebih ramai... tapi kubu kecil "
              "juga keluarga terminal. Besok malam: bilangan asli naik "
              "kelas. Salam satu terminal... anak-anak."),
]"""),
    ("""EDGE_VOICE = {
    "OMAK": dict(voice="id-ID-GadisNeural", rate="+10%"),
    "GILANG": dict(voice="id-ID-ArdiNeural", rate="+6%"),
    "RUPI": dict(voice="id-ID-GadisNeural", rate="-6%"),
    "KAMU": dict(voice="id-ID-ArdiNeural", rate="+12%"),
    "DEDI": dict(voice="id-ID-ArdiNeural", rate="-14%"),
    "PUSAT": dict(voice="id-ID-ArdiNeural", rate="-16%", volume="-8%"),
}
ZAI_VOICE = {"OMAK": "tongtong", "GILANG": "jam", "RUPI": "xiaochen",
             "KAMU": "kazi", "DEDI": "luodo", "PUSAT": "kago"}
ZAI_SPEED = {"OMAK": 1.15, "GILANG": 1.05, "RUPI": 0.92, "KAMU": 1.0,
             "DEDI": 0.88, "PUSAT": 0.8}""",
     """EDGE_VOICE = {
    "MELI": dict(voice="id-ID-GadisNeural", rate="+12%"),
    "BAYU": dict(voice="id-ID-ArdiNeural", rate="+2%"),
    "HAZ": dict(voice="id-ID-ArdiNeural", rate="-10%"),
    "KAMU": dict(voice="id-ID-ArdiNeural", rate="+12%"),
    "OMDARI": dict(voice="id-ID-ArdiNeural", rate="-14%"),
    "PUSAT": dict(voice="id-ID-ArdiNeural", rate="-16%", volume="-8%"),
}
ZAI_VOICE = {"MELI": "tongtong", "BAYU": "jam", "HAZ": "kazi",
             "KAMU": "kago", "OMDARI": "luodo", "PUSAT": "senja"}
ZAI_SPEED = {"MELI": 1.15, "BAYU": 1.05, "HAZ": 0.9, "KAMU": 1.0,
             "OMDARI": 0.88, "PUSAT": 0.8}"""),
]
patch("voice19rp.py", VOICE_PAIRS)

# ---------- timeline19rp.py: full rewrite ----------
TIMELINE = '''#!/usr/bin/env python3
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

MSG_SUB = [
    "Terminal 3 AM: units must match tickets!",
    "Bayu: unit 09 is the champion. Get in line!",
    "30 tickets printed: numbers 1 to 30!",
    "Tickets 1 to 30. Thirty riders waiting!",
    "30 tickets, 30 seats. No half passengers!",
    "Garages 0 to 9. I guarded them 30 years!",
    "So that is 10 garages. Zero counts!",
    "Hmph! Zero is an empty garage. Not counted!",
    "But tickets start at 1. Different rules!",
    "Monitor: 30 tickets, 10 garages, 3 units!",
    "30 tickets for 3 units: 10 riders each!",
    "Garages 0 to 9: ten numbers. Zero counts!",
    "Old book: starts at 1, nine rows!",
    "Whole numbers: 0, 1, 2, 3 and on!",
    "No half units, no 2.5 angkot!",
    "Witness of history: no garage 0 back then!",
    "Report: garage 7 empty. Zero units!",
    "Garage 7 still exists with zero inside!",
    "Seat 0 does not exist. Zero shows empty!",
    "30 years I miscounted the front garage!",
    "Sticker: the whole count. Tickets 1-30!",
    "Hmph. Fine. Zero garage is family too!",
    "Midnight question: 0 or 1?",
    "Both right, depending on the book. One sheet, one rule!",
    "30 stays 30 and 3 stays 3. Counts follow rules!",
    "Note: at 3.26 Bayu finally stopped arguing!",
    "Dawn vote: 61% say 0, 39% say 1!",
    "Tomorrow: natural numbers rise a grade!",
]
SPLITS = {2: 2, 4: 2, 9: 2, 11: 2, 19: 2, 21: 2, 23: 2}
subs = []
si = 0
for i in range(24):
    subs.append([t0[i], MSG_SUB[si]])
    si += 1
    if i in SPLITS:
        subs.append([round(t0[i] + d[i] * 0.48, 2), MSG_SUB[si]])
        si += 1
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
        "durasi voice 24 klip oleh timeline19rp.py ---------- */\\n"
        "const TM=" + json.dumps(TM, separators=(",", ":"), ensure_ascii=False) + ";\\n")
(HERE / "frag_time.js").write_text(frag)
print(f"timing.json + frag_time.js ok ({(HERE / 'frag_time.js').stat().st_size // 1024} KB)")
'''
(HERE / "timeline19rp.py").write_text(TIMELINE)
print("timeline19rp.py: full rewrite ok")

# ---------- audio19rp.py ----------
AUDIO_PAIRS = [
    ('Musik, SFX & VOICE ACTING rev21 - VIDEO 18 "MALAM INVENTARIS: Bilangan\nDiciptakan atau Ditemukan?" (dunia GRUP JAGA GUDANG).',
     'Musik, SFX & VOICE ACTING rev22 - VIDEO 19 "TERMINAL JAM 3: Bilangan\nCacah Mulai dari 0 atau 1?" (dunia GRUP JAGA TERMINAL).'),
    ("""arpeggio lembut, pop notifikasi bernada per chara (OMAK 523, GILANG 330,
RUPI 660, KAMU 740, DEDI 392, PUSAT 880), swell hangat di kartu babak""",
     """arpeggio lembut, pop notifikasi bernada per chara (MELI 587, BAYU 330,
HAZ 440, KAMU 740, OM DARI 262, PUSAT 880), swell hangat di kartu babak"""),
    ("""klub. 24 klip VOICE dimix di t0 tiap pesan + ducking otomatis: bed
diturunkan 55% selama voice berbicara. Hening total 1.0 s sebelum
pertanyaan PUSAT (MA), hangat F MAJOR saat jawaban dua lapis + voting.""",
     """klub. 24 klip VOICE dimix di t0 tiap pesan + ducking otomatis: bed
diturunkan 55% selama voice berbicara. Hening total 1.0 s sebelum
pertanyaan PUSAT (MA), hangat F MAJOR sejak jawaban satu lembar satu
aturan + voting."""),
    ("""SEG = [
    (0.0, card2, (D3, F3, A3)),        # malam inventaris: hitungan dimulai
    (card2, MA[0], (Bb2, D3, F3)),     # stok, bagi rata, freezer
    # MA: hening total 1.0 s sebelum pertanyaan PUSAT
    (f2t0, f3t0, (G3, Bb3, D4)),       # pertanyaan + debat dibuat/ditemukan
    (f3t0, DUR, (F3, A3, C4)),         # jawaban dua lapis + voting: hangat
]""",
     """SEG = [
    (0.0, card2, (D3, F3, A3)),        # dinas dini hari: unit vs karcis
    (card2, MA[0], (Bb2, D3, F3)),     # garasi 0-9, karcis 1-30, nol sah
    # MA: hening total 1.0 s sebelum pertanyaan PUSAT
    (f2t0, f3t0, (G3, Bb3, D4)),       # debat mulai 0 atau mulai 1
    (f3t0, DUR, (F3, A3, C4)),         # satu lembar satu aturan: hangat
]"""),
    ("""WHO = ("PUSAT", "GILANG", "KAMU", "RUPI", "GILANG", "KAMU", "RUPI",
       "GILANG", "OMAK", "KAMU", "RUPI", "GILANG", "OMAK", "DEDI", "KAMU",
       "RUPI", "GILANG", "RUPI", "PUSAT", "GILANG", "DEDI", "RUPI",
       "PUSAT", "PUSAT")
POP_F = {"OMAK": 523.0, "GILANG": 330.0, "RUPI": 660.0, "KAMU": 740.0,
         "DEDI": 392.0, "PUSAT": 880.0}""",
     """WHO = ("PUSAT", "BAYU", "MELI", "KAMU", "HAZ", "KAMU", "BAYU", "MELI",
       "PUSAT", "KAMU", "HAZ", "MELI", "OMDARI", "PUSAT", "KAMU", "MELI",
       "HAZ", "MELI", "BAYU", "PUSAT", "HAZ", "MELI", "PUSAT", "PUSAT")
POP_F = {"MELI": 587.0, "BAYU": 330.0, "HAZ": 440.0, "KAMU": 740.0,
         "OMDARI": 262.0, "PUSAT": 880.0}"""),
    ("    photo = i in (0, 13, 22)", "    photo = i in (0, 8, 13, 22)"),
    ("""    if i == 17:                            # stiker JURUS HITUNG JUJUR""",
     """    if i == 17:                            # stiker JURUS HITUNG UTUH"""),
    ("""add(M[18] + 0.4, chime(880.0, 0.04))       # PUSAT: pertanyaan tengah malam
add(M[21] + 0.35, chime(523.25, 0.08))     # RUPI: jawaban dua lapis""",
     """add(M[19] + 0.4, chime(880.0, 0.04))       # PUSAT: pertanyaan dini hari
add(M[21] + 0.35, chime(523.25, 0.08))     # MELI: satu lembar satu aturan"""),
]
patch("audio19rp.py", AUDIO_PAIRS)
print("patch B bagian 1 selesai")
