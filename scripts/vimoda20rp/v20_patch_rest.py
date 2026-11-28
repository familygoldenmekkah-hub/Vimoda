#!/usr/bin/env python3
"""Patch rest: frag_render + timeline20 full + voice20 LINES + audio20 +
qa20 (9:16 only) untuk VIDEO 20 GRUP PANITIA LARI PAGI."""
from pathlib import Path

HERE = Path("/home/z/my-project/scripts/vimoda20rp")


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


# ---------- frag_render.js ----------
patch("frag_render.js", [
    ("/* ---------- TERMINAL JAM 3 rev22: render per frame, MODEL FOKUS",
     "/* ---------- LARI PAGI rev23: render per frame, MODEL FOKUS, desain\n   PAGI CERIA (otak/DESAIN-PAGI.md), produksi 9:16 SAJA"),
])

# ---------- timeline20rp.py: full rewrite ----------
TIMELINE = '''#!/usr/bin/env python3
"""TIMELINE rev23 VIDEO 20: satu sumber kebenaran untuk semua waktu.
Membaca durasi 24 klip voice (/tmp/voice20/durations.json), slot kartu
babak, diagram menyala, hening pra-twist, papan misi, endcard, burst,
IMPS, dolly, dips, subtitle EN (38 beat). Output: timing.json +
frag_time.js (const TM). Produksi 9:16 SAJA (L1 revisi)."""
import json
from pathlib import Path

HERE = Path(__file__).parent
D = json.loads(Path("/tmp/voice20/durations.json").read_text())
d = [D[f"m{i:02d}"] for i in range(24)]

VOFF = 0.42
GAP_MIN = 3.0
GAP_PAD = 1.25
FLASH_DUR = [3.6, 3.6, 4.0]
FLASH_PAD = 1.5
CARD_WIN = 1.8
CARD_PAD = 2.6
QUIZ_DUR = 8.0

DIV_TEXT = ["GRUP PANITIA LARI PAGI", "GARIS START · 05.20",
            "PAPAN PESERTA · 05.24", "PODIUM JUARA · 05.33",
            "VOTING PUSAT · 05.44"]
DIV_LABEL = ["GRUP PANITIA LARI PAGI", None, None, None, None]

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
    if i == 22:  # papan misi antara pesan 22 (voting) dan 23 (penutup)
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
    "Race day at 6 AM: 40 bibs, numbers 1 to 40!",
    "Bagas wears bib 13. His target: first place!",
    "Rika: 13 is just the 13th in order. Safe!",
    "Runner numbers are natural numbers: 1 to 40!",
    "Natural numbers start at 1. Zero is not counted!",
    "So 40 bibs for 40 runners!",
    "Hmph! Just drop 13 and use 41!",
    "Din: that leaves 39 labels. The order gets a hole!",
    "The bib board: every runner gets one number!",
    "13 stays 13. No shifting the order!",
    "Finishing order: first in = champion 1!",
    "Two jobs of natural numbers: count and order!",
    "The start line always begins at 1!",
    "Podium: champions 1, 2, 3. No champion zero!",
    "Zero passengers were okay. Champion zero is not!",
    "Zero finishers is fine. First one in is champion 1!",
    "If a 41st runner joins, bib 41 is ready!",
    "Sticker: the natural count. 1-40, no holes!",
    "Hmph. Fine. Bib 13 stays on my chest!",
    "Morning question: where do natural numbers end?",
    "After 40 comes 41. The chain never breaks!",
    "Champion starts at 1: no order before first!",
    "Dawn vote: 64% count, 36% order!",
    "Tomorrow: the sum of 1 to 100!",
]
SPLIT2 = {
    2: "Twelve before it, fourteen after it!",
    4: "Counting starts at one!",
    9: "One number, one runner!",
    11: "Same numbers, different jobs!",
    19: "Champions start at 1. Why not 0?",
    21: "Noted: at 5.40 Bagas kept bib 13!",
    23: "Two roles, one family of numbers!",
}
subs = []
for i in range(24):
    subs.append([t0[i], MSG_BASE[i]])
    if i in SPLIT2:
        subs.append([round(t0[i] + d[i] * 0.48, 2), SPLIT2[i]])
subs += [
    [flash[0][0], "Natural numbers: 1 to 40 and forever!"],
    [flash[1][0], "Counting or ordering? Both are natural!"],
    [flash[2][0], "Same numbers, different jobs!"],
    [round(quiz[0] + 1.2, 2), "The committee left a morning mission!"],
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
print(f"DUR={DUR}s  sub={len(subs)} beat  hang_max={max(hangs):.1f}s  msg0={t0[0]}")
print("t0:", [round(x, 1) for x in t0])

(HERE / "timing.json").write_text(json.dumps(TM, indent=1, ensure_ascii=False))
frag = ("/* ---------- TIMING rev23 (single source of truth): dihitung dari "
        "durasi voice 24 klip oleh timeline20rp.py ---------- */\\n"
        "const TM=" + json.dumps(TM, separators=(",", ":"), ensure_ascii=False) + ";\\n")
(HERE / "frag_time.js").write_text(frag)
print(f"timing.json + frag_time.js ok ({(HERE / 'frag_time.js').stat().st_size // 1024} KB)")
'''
(HERE / "timeline20rp.py").write_text(TIMELINE)
print("timeline20rp.py: full rewrite ok")

# ---------- voice20rp.py ----------
VOICE_PAIRS = [
    ("VOICE ACTING rev22 VIDEO 19 - generator suara 6 chara (24 klip).\nFormula Dialog AKIOMIDA v1 (F1-F8) diterapkan pada LINES.",
     "VOICE ACTING rev23 VIDEO 20 - generator suara 6 chara (24 klip).\nFormula Dialog AKIOMIDA v1 (F1-F8) diterapkan pada LINES. Produksi\n9:16 SAJA (L1 revisi 2026-11-28)."),
    ("# (who, teks lisan) - rev22: skema TERMINAL JAM 3 (bahan bilangan\n# cacah), sapaan unik per chara (F1), arc tsun-dere BAYU (F4),\n# cermin fakta lawan (F5), empati MELI (F8). Angka dilisankan;\n# tetap sopan (aturan #39).",
     "# (who, teks lisan) - rev23: skema LARI PAGI (bahan bilangan asli),\n# sapaan unik per chara (F1), arc tsun-dere BAGAS (F4), cermin fakta\n# lawan (F5), empati RIKA (F8). Angka dilisankan; tetap sopan (#39)."),
    ("""    ("PUSAT", "Perhatian, warga terminal! Dinas dini hari... resmi "
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
            "depan... rupanya itu garasi nol. Nomor itu aturan... "
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
]""",
     """    ("PUSAT", "Perhatian, panitia! Lari pagi minggu... resmi "
              "disiapkan! Empat puluh kartu peserta, nomor satu sampai "
              "empat puluh. Cek papan... cek garis finis!"),
    ("BAGAS", "Pasang nomor dada. Nomor 13 ya, kak. Kata orang sial "
              "banget. Tapi gak usah drama... aku tetep juara satu. "
              "Yang lain mah rebutan posisi dua sama tiga aja."),
    ("RIKA", "Kasihan nomor 13, bang Bagus, baru nempel langsung dicap "
             "sial. Di lembar finis, 13 itu cuma urutan ke-13. Ada 12 "
             "di depannya... 14 di belakangnya. Aman."),
    ("KAMU", "Bener, kak Rika. Nomor peserta itu bilangan asli: satu, "
             "dua, tiga, terus naik sampai empat puluh. Gak ada yang "
             "loncat... gak ada yang sial."),
    ("LARA", "Asli ya, bukan cacah. Bilangan asli mulai dari satu: "
             "angka untuk menghitung. Nol gak termasuk... karena nol "
             "artinya belum ada yang dihitung."),
    ("KAMU", "Berarti kartu peserta kita satu sampai empat puluh ya, "
             "bu Lara? Empat puluh kartu... buat empat puluh pelari."),
    ("BAGAS", "Hmph, buang aja nomor 13-nya, kak! Ganti jadi 41. Jadi "
              "jumlahnya tetep empat puluh kartu... tapi gak ada yang "
              "sial. Untung-untungan."),
    ("DIN", "Eh, gak boleh gitu, bang. Kalau 13 dibuang, kartu tinggal "
            "39 label: satu sampai 12, lalu 14 sampai 41. Pelari tetep "
            "empat puluh... tapi urutannya bolong di tengah."),
    ("PUSAT", "Papan kartu peserta terkirim. Satu sampai empat puluh... "
              "satu nomor, satu pelari."),
    ("KAMU", "Liat papan, bang Bagus: tiap pelari satu nomor, nggak "
             "bolong. 13 tetep 13. Kalau digeser-geser... catatan finis "
             "malah gak nyambung."),
    ("RIKA", "Di lembar finis juga: yang dicatat itu urutan datangnya. "
             "Pelari pertama datang = juara satu. Kedua = juara dua. "
             "Ketiga = juara tiga. Itu bilangan asli juga... tapi "
             "perannya mengurutkan."),
    ("LARA", "Nah, dua peran bilangan asli: menghitung banyaknya, empat "
             "puluh pelari. Dan mengurutkan: juara ke-satu, ke-dua, "
             "ke-tiga. Angkanya sama... perannya beda."),
    ("DIN", "Pasang bendera di garis start. Dari sononya start selalu "
            "nomor satu dulu: pelari nomor satu di lajur satu, nomor "
            "dua di lajur dua. Kaya hitung kelas: satu, dua, tiga... "
            "jalan!"),
    ("PUSAT", "Papan podium terkirim. Juara satu, dua, tiga... juara "
              "ke-nol tidak ada."),
    ("KAMU", "Ini bedanya sama tugas kemarin, ya: penumpang nol boleh "
             "ada, tapi juara nol gak ada. Nol sah di cacah... bilangan "
             "asli memang mulai dari satu."),
    ("RIKA", "Finis nol orang juga boleh: artinya belum ada yang "
             "sampai. Tapi begitu ada yang datang... dia langsung "
             "juara satu, bukan juara nol."),
    ("LARA", "Empat puluh kartu, empat puluh pelari, satu nomor satu "
             "orang. Kalau daftar nambah jadi 41 orang... kartu ke-41 "
             "pun siap dicetak. Bilangan asli gak pernah habis: selalu "
             "ada berikutnya."),
    ("RIKA", "Buat panitia baru: jurus hitung asli. Menghitung satu "
             "sampai empat puluh... mengurutkan juara satu, dua, "
             "tiga... dan gak boleh bolong."),
    ("BAGAS", "Pegang kartu 13 di dada. Hmph. Oke, oke. Nomor 13 tetep "
              "gue pakai. Tapi tetep... juara satu punya gue. Nomor "
              "sial mah cuma omongan orang aja."),
    ("PUSAT", "Pertanyaan panitia. Kalau pelari baru daftar, dia dapat "
              "kartu nomor 41. Bilangan asli itu habis di mana? Dan "
              "kenapa juara mulai dari satu... bukan dari nol?"),
    ("DIN", "Gak habis, kak. 41, 42, 43, terus naik. Setiap bilangan "
            "asli punya pengikut: setelah satu ada dua... setelah empat "
            "puluh ada 41. Urutannya gak pernah putus."),
    ("RIKA", "Dan juara mulai dari satu karena mengurutkan itu butuh "
             "yang datang duluan. Yang pertama datang itu juara satu. "
             "Juara ke-nol gak punya makna: gak ada urutan sebelum "
             "pertama. Eh, gue catat juga... jam 5.40 bang Bagus "
             "akhirnya pakai nomor 13."),
    ("PUSAT", "Voting panitia: enam empat persen bilang asli itu "
              "menghitung... tiga enam persen bilang mengurutkan."),
    ("PUSAT", "Voting ditutup: dua peran, satu keluarga angka. Besok "
              "malam: jumlah satu sampai seratus... ada jalan pintasnya. "
              "Salam satu lintasan... anak-anak."),
]"""),
    ("""EDGE_VOICE = {
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
             "OMDARI": 0.88, "PUSAT": 0.8}""",
     """EDGE_VOICE = {
    "LARA": dict(voice="id-ID-GadisNeural", rate="-8%"),
    "RIKA": dict(voice="id-ID-GadisNeural", rate="+12%"),
    "DIN": dict(voice="id-ID-ArdiNeural", rate="+4%"),
    "BAGAS": dict(voice="id-ID-ArdiNeural", rate="+6%"),
    "KAMU": dict(voice="id-ID-ArdiNeural", rate="+12%"),
    "PUSAT": dict(voice="id-ID-ArdiNeural", rate="-16%", volume="-8%"),
}
ZAI_VOICE = {"LARA": "tongtong", "RIKA": "xiaochen", "DIN": "jam",
             "BAGAS": "kazi", "KAMU": "kago", "PUSAT": "senja"}
ZAI_SPEED = {"LARA": 0.92, "RIKA": 1.15, "DIN": 1.1, "BAGAS": 1.05,
             "KAMU": 1.0, "PUSAT": 0.8}"""),
]
patch("voice20rp.py", VOICE_PAIRS)

# ---------- audio20rp.py ----------
AUDIO_PAIRS = [
    ('Musik, SFX & VOICE ACTING rev22 - VIDEO 19 "TERMINAL JAM 3: Bilangan\nCacah Mulai dari 0 atau 1?" (dunia GRUP JAGA TERMINAL).',
     'Musik, SFX & VOICE ACTING rev23 - VIDEO 20 "LARI PAGI: Bilangan Asli\nMulai dari 1" (dunia GRUP PANITIA LARI PAGI), desain PAGI CERIA.'),
    ("""arpeggio lembut, pop notifikasi bernada per chara (MELI 587, BAYU 330,
HAZ 440, KAMU 740, OM DARI 262, PUSAT 880), swell hangat di kartu babak""",
     """arpeggio lembut pagi hari, pop notifikasi bernada per chara (LARA 523,
RIKA 740, DIN 660, BAGAS 392, KAMU 587, PUSAT 880), swell hangat di kartu
babak"""),
    ("""klub. 24 klip VOICE dimix di t0 tiap pesan + ducking otomatis: bed
diturunkan 55% selama voice berbicara. Hening total 1.0 s sebelum
pertanyaan PUSAT (MA), hangat F MAJOR sejak jawaban satu lembar satu
aturan + voting.""",
     """klub. 24 klip VOICE dimix di t0 tiap pesan + ducking otomatis: bed
diturunkan 55% selama voice berbicara. Hening total 1.0 s sebelum
pertanyaan PUSAT (MA), hangat F MAJOR sejak resolusi dua peran angka +
voting."""),
    ("""SEG = [
    (0.0, card2, (D3, F3, A3)),        # dinas dini hari: unit vs karcis
    (card2, MA[0], (Bb2, D3, F3)),     # garasi 0-9, karcis 1-30, nol sah
    # MA: hening total 1.0 s sebelum pertanyaan PUSAT
    (f2t0, f3t0, (G3, Bb3, D4)),       # debat mulai 0 atau mulai 1
    (f3t0, DUR, (F3, A3, C4)),         # satu lembar satu aturan: hangat
]""",
     """SEG = [
    (0.0, card2, (F3, A3, C4)),        # pagi ceria: kartu peserta 1-40
    (card2, MA[0], (D3, F3, A3)),      # nomor 13, menghitung vs mengurutkan
    # MA: hening total 1.0 s sebelum pertanyaan PUSAT
    (f2t0, f3t0, (G3, Bb3, D4)),       # debat juara 1 dan successor 41
    (f3t0, DUR, (F3, A3, C4)),         # dua peran satu keluarga: hangat
]"""),
    ("""WHO = ("PUSAT", "BAYU", "MELI", "KAMU", "HAZ", "KAMU", "BAYU", "MELI",
       "PUSAT", "KAMU", "HAZ", "MELI", "OMDARI", "PUSAT", "KAMU", "MELI",
       "HAZ", "MELI", "BAYU", "PUSAT", "HAZ", "MELI", "PUSAT", "PUSAT")
POP_F = {"MELI": 587.0, "BAYU": 330.0, "HAZ": 440.0, "KAMU": 740.0,
         "OMDARI": 262.0, "PUSAT": 880.0}""",
     """WHO = ("PUSAT", "BAGAS", "RIKA", "KAMU", "LARA", "KAMU", "BAGAS",
       "DIN", "PUSAT", "KAMU", "RIKA", "LARA", "DIN", "PUSAT", "KAMU",
       "RIKA", "LARA", "RIKA", "BAGAS", "PUSAT", "DIN", "RIKA",
       "PUSAT", "PUSAT")
POP_F = {"LARA": 523.0, "RIKA": 740.0, "DIN": 660.0, "BAGAS": 392.0,
         "KAMU": 587.0, "PUSAT": 880.0}"""),
    ("    photo = i in (0, 8, 13, 22)", "    photo = i in (0, 8, 13, 22)"),
    ("    if i == 17:                            # stiker JURUS HITUNG UTUH",
     "    if i == 17:                            # stiker JURUS HITUNG ASLI"),
    ("""add(M[19] + 0.4, chime(880.0, 0.04))       # PUSAT: pertanyaan dini hari
add(M[21] + 0.35, chime(523.25, 0.08))     # MELI: satu lembar satu aturan""",
     """add(M[19] + 0.4, chime(880.0, 0.04))       # PUSAT: pertanyaan panitia
add(M[21] + 0.35, chime(523.25, 0.08))     # RIKA: dua peran satu keluarga"""),
]
patch("audio20rp.py", AUDIO_PAIRS)
print("patch rest bagian 1 selesai")
