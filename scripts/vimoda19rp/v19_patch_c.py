#!/usr/bin/env python3
"""Patch C: qa19rp (dunia terminal) + gen_meme19 (ilustrasi AI terminal)."""
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


QA_PAIRS = [
    ('"""QA penuh Video 18 FORMAT RP (MALAM INVENTARIS: Bilangan Diciptakan\natau Ditemukan?, dunia GRUP JAGA GUDANG). HUKUM SERI: dunia diganti total -',
     '"""QA penuh Video 19 FORMAT RP (TERMINAL JAM 3: Bilangan Cacah Mulai\ndari 0 atau 1?, dunia GRUP JAGA TERMINAL). PENERAPAN PERTAMA FORMULA\nDIALOG AKIOMIDA v1 (F1-F8, otak/BELAJAR-DIALOG.md). HUKUM SERI: dunia diganti total -'),
    ("""          # rev21 (hukum dunia): penanda dunia video 15-17 terlarang
          "RESEP", "DAPUR", "dapur", "takar", "TAKAR", "GEDE", "VITA",
          "NADIA", "AKUN TANTANGAN", "GARIS UKUR", "timbangan", "TIMBANGAN",
          "karamel", "terigu", "adonan", "lunyer", "maghrib", "MAGHRIB",
          "kroasan", "omaknadia", "koma-komaan", "0,999", "0,333", "1/3",
          "0,75", "0,40", "0,35", "desimal berulang", "gelas takar",
          "LEADERBOARD", "JAM 7 MALAM", "HARI 3", "HARI 4", "16.00",
          "18.04", "19.02", "16.14", "16.26")""",
     """          # rev21-22 (hukum dunia): penanda dunia episode lama terlarang
          "RESEP", "DAPUR", "dapur", "takar", "TAKAR", "GEDE", "VITA",
          "NADIA", "AKUN TANTANGAN", "GARIS UKUR", "timbangan", "TIMBANGAN",
          "karamel", "terigu", "adonan", "lunyer", "maghrib", "MAGHRIB",
          "kroasan", "omaknadia", "koma-komaan", "0,999", "0,333", "1/3",
          "0,75", "0,40", "0,35", "desimal berulang", "gelas takar",
          "LEADERBOARD", "JAM 7 MALAM", "HARI 3", "HARI 4", "16.00",
          "18.04", "19.02", "16.14", "16.26",
          # rev22: penanda dunia video 18 (gudang) terlarang
          "GUDANG", "gudangpusat", "GILANG", "RUPI", "OMAK", "DEDI",
          "MALAM INVENTARIS", "inventaris", "freezer", "FREEZER", "kard",
          "KARD", "bagi rata", "BAGI RATA", "dua lapis", "DUA LAPIS",
          "dibuat manusia", "DIBUAT MANUSIA", "ditemukan", "DITEMUKAN",
          "VOTING MALAM", "VOTING TENGAH MALAM", "JAM 12 MALAM",
          "GARIS BILANGAN", "garis bilangan", "minus", "MINUS",
          "KURSINYA", "hitung jujur", "HITUNG JUJUR",
          "JURUS HITUNG JUJUR", "sisa punya pemilik", "96 pas", "96 itu",
          "24x4", "seratus", "kotak kue", "pedagang", "30 bagi",
          "4 koma dua", "52%", "48%", "23.30", "23.45", "23.52", "00.02",
          "00.20", "00.26", "16.14", "RAK PERTAMA", "RAK CACAH",
          "rak bilangan cacah", "SELAMAT MALAM, ANAK-ANAK")"""),
    ("""requires = ("GRUP JAGA GUDANG", "KUASAI MATEMATIKA DI AKIOMIDA.COM",
            "GILIRAN RAK · 23.45", "BAGI RATA · 23.52",
            "JAM 12 MALAM · 00.00", "PERTANYAAN PUSAT · 00.12",
            "OMAK", "RUPI", "GILANG", "DEDI", "KAMU", "AKUN GUDANG PUSAT",
            # rev21: skema MALAM INVENTARIS + sapaan unik per chara
            "MALAM INVENTARIS", "HITUNG ULANG SEMUA RAK",
            "CATAT JUMLAH DI LEMBAR", "SUHU FREEZER WAJIB BENAR",
            "@gudangpusat", "TERMOMETER FREEZER · LAPORAN SATPAM",
            "DI BAWAH NOL = MINUS", "VOTING TENGAH MALAM",
            "total 96 pas", "yang sah itu yang dihitung",
            "30 bagi 6, tiap pedagang 5 kotak", "4 koma dua koma lima",
            "sisa punya pemilik", "di garis bilangan, nol itu tengah",
            "minus itu alamat", "JURUS HITUNG JUJUR",
            "pertanyaan tengah malam", "dibuat manusia atau sudah ada duluan",
            "jawabannya dua lapis", "30 kard tidak jadi 29",
            "VOTING MALAM: 52% TEMUKAN", "rak bilangan cacah dibuka",
            "selamat malam, anak-anak",
            # rev21: 3 diagram menyala + kosakata benar
            "GARIS BILANGAN", "-5 KURSINYA DI BAWAH NOL",
            "MINUS = ALAMAT", "KURSI -5: LIMA LANGKAH DI BAWAH NOL",
            "GUDANG TUTUP, LAMPU MATI",
            "TULISAN DIBUAT · ISI DITEMUKAN",
            "ISI TETAP: 30 KARD GAK JADI 29",
            "TULISANNYA BOLEH GANTI, NILAINYA GAK",
            "DITEMUKAN", "BESOK: RAK BILANGAN CACAH",
            "MISI DARI GUDANG PUSAT", "TULIS JAWABANMU DI KOMENTAR YA",
            "KARTU BANTU DARI GUDANG PUSAT",
            "30 KOTAK BAGI 6 PEDAGANG", "-5 KURSINYA DI ATAS ATAU BAWAH NOL",
            "Dibaca ✓✓", "memewrap", "mglyph", "meyes", "mdigit",
            # rev18: intro film - judul full-bleed + kartu produksi
            "intro1", "intro2", "introimg", "introtitle",
            "DIPERSEMBAHKAN", "KUASAI MATEMATIKA JADI LEBIH MUDAH",
            "AKIOMIDA",
            # rev14-16: waktu chat realistis + ilustrasi AI + timeline
            "23.30", "00.26", "const AVI=", "MEME_IMGS",
            "const TM=", "const SUBS=TM.subs", "const DIVS=TM.div",
            "voice acting")""",
     """requires = ("GRUP JAGA TERMINAL", "KUASAI MATEMATIKA DI AKIOMIDA.COM",
            "GILIRAN GARASI · 03.03", "MONITOR KARCIS · 03.10",
            "PAPAN GARASI · 03.19", "VOTING PUSAT · 03.30",
            "MELI", "BAYU", "HAZ", "OMDARI", "KAMU",
            "AKUN TERMINAL PUSAT",
            # rev22: skema TERMINAL JAM 3 (F2 kartu dunia) + sapaan unik (F1)
            "TERMINAL JAM 3", "CEK UNIT DI GARASI 0-9",
            "KARCIS WAJIB URUT 1-30", "UNIT TAK BOLEH SETENGAH",
            "@terminalpusat", "MONITOR DINAS · TERMINAL",
            "30 KARCIS / 3 UNIT = 10 PENUMPANG",
            "LAPORAN GARASI · NOMOR 0-9", "NOMOR 7 KOSONG: ISI NOL UNIT",
            "NOL ITU ANGKA SAH", "VOTING DINI HARI",
            "unit 09 juaranya terminal ini", "30 penumpang",
            "garasi 0 sampai 9", "10 garasi", "nol ikut dihitung",
            "bilangan cacah", "gak ada setengah unit",
            "saksi sejarah", "garasi 7 gak hilang", "nol unit",
            "kursi nomor 0 gak ada", "nomor itu aturan",
            "JURUS HITUNG UTUH", "garasi nol juga keluarga",
            "garasi mulai dari 0 atau 1", "dua-duanya bener",
            "satu lembar satu aturan",
            "hasil hitung gak ikut-ikutan selera",
            "kubu kecil juga keluarga terminal",
            "bilangan asli naik kelas", "salam satu terminal",
            # rev22: 3 diagram menyala (F6) + kosakata benar
            "ANGKA UTUH", "CACAH: 0, 1, 2, 3, TERUS",
            "UNIT UTUH: GAK ADA SETENGAH ANGKOT",
            "KARCIS UTUH: GAK ADA SETENGAH ORANG",
            "MULAI DARI 0 ATAU 1?", "DARI 0", "DARI 1",
            "DUA-DUANYA SAH, TERGANTUNG BUKU", "SATU LEMBAR, SATU ATURAN",
            "ATURAN BOLEH BEDA · HITUNGAN SATU",
            "BUKU LAMA · MULAI 1: 9 BARIS", "BUKU BARU · MULAI 0: 10 BARIS",
            "30 KARCIS TETEP 30 PENUMPANG", "BESOK: BILANGAN ASLI",
            "MISI DARI TERMINAL PUSAT", "TULIS JAWABANMU DI KOMENTAR YA",
            "KARTU BANTU DARI TERMINAL PUSAT",
            "30 KARCIS BUAT 3 UNIT, TIAP UNIT BERAPA PENUMPANG?",
            "GARASI 0 SAMPAI 9 ADA BERAPA?",
            "Dibaca ✓✓", "memewrap", "mglyph", "meyes", "mdigit",
            # rev18: intro film - judul full-bleed + kartu produksi
            "intro1", "intro2", "introimg", "introtitle",
            "DIPERSEMBAHKAN", "KUASAI MATEMATIKA JADI LEBIH MUDAH",
            "AKIOMIDA",
            # rev14-22: waktu chat realistis + ilustrasi AI + timeline
            "02.58", "03.42", "const AVI=", "MEME_IMGS",
            "const TM=", "const SUBS=TM.subs", "const DIVS=TM.div",
            "voice acting")"""),
    ("""n_msg = len(re.findall(r"\\{t0:TM\\.m\\[\\d+\\], who:", eng))
if n_msg != 24:
    fail(f"jumlah bubble {n_msg} != 24")""",
     """n_msg = len(re.findall(r"\\{t0:TM\\.m\\[\\d+\\], who:", eng))
if n_msg != 24:
    fail(f"jumlah bubble {n_msg} != 24")
n_svg = len(re.findall(r'class="psvg" viewBox', eng))
if n_svg != 4:
    fail(f"ilustrasi dunia {n_svg} != 4")
else:
    print("4 ilustrasi dunia SVG ok (papan, monitor, garasi, voting)")"""),
    ("""if "UJIVAL=['30','6','5','4','28','2','-5','0']" not in eng:
    fail("delapan kartu bantu tidak lengkap")
else:
    print("papan misi 2 soal utuh + 8 kartu bantu ok")""",
     """if "UJIVAL=['10','30','9','3','0','1','2','5']" not in eng:
    fail("delapan kartu bantu tidak lengkap")
else:
    print("papan misi 2 soal utuh + 8 kartu bantu ok")"""),
    ("""elif (stamps[0] != "23.30" or stamps[4] != "23.45" or stamps[8] != "23.52"
      or stamps[13] != "00.02" or stamps[18] != "00.12"
      or stamps[22] != "00.20" or stamps[-1] != "00.26"):
    fail(f"stempel jam tidak nyambung kartu babak: {stamps}")
else:
    print(f"stempel jam realistis 23.30 -> {stamps[-1]} lintas tengah malam ok")""",
     """elif (stamps[0] != "02.58" or stamps[4] != "03.03" or stamps[8] != "03.10"
      or stamps[13] != "03.19" or stamps[19] != "03.30"
      or stamps[22] != "03.36" or stamps[-1] != "03.42"):
    fail(f"stempel jam tidak nyambung kartu babak: {stamps}")
else:
    print(f"stempel jam realistis 02.58 -> {stamps[-1]} dini hari ok")"""),
    ("""# rev21 (dunia lintas tengah malam): "sore" hanya boleh sebelum kartu
# JAM 12 MALAM (referensi masa lalu "sore tadi" diperbolehkan)
midnight_card = float(TMj["div"][3][0])
bad_waktu = []
for chunk in eng_scan.split("{t0:TM.m[")[1:]:
    mi = int(re.match(r"\\d+", chunk).group())
    t0m = float(TMj["m"][mi])
    for txt in re.findall(r"(?:text|cap):'([^']*)'", chunk[:420]):
        tl = txt.lower()
        if "sore" in tl and t0m > midnight_card - 1e-9:
            bad_waktu.append((mi, "sore", txt[:40]))
if bad_waktu:
    fail(f"dosa waktu rev21: {bad_waktu}")
else:
    print("konsistensi waktu ok: lintas tengah malam nyambung kartu JAM 12 MALAM")""",
     """# rev22 (dini hari): seluruh stempel antara 02.00 dan 04.00, tanpa
# loncatan; kata "malam" hanya boleh diucapkan PUSAT sebagai referensi
# jadwal besok malam
bad_waktu = []
for chunk in eng_scan.split("{t0:TM.m[")[1:]:
    mi = int(re.match(r"\\d+", chunk).group())
    st = re.search(r"stamp:'([\\d.]+)'", chunk[:120])
    if st:
        hh = int(st.group(1).split(".")[0])
        if hh not in (2, 3):
            bad_waktu.append((mi, "jam dini hari", st.group(1)))
if bad_waktu:
    fail(f"dosa waktu rev22: {bad_waktu}")
else:
    print("konsistensi waktu ok: semua stempel dini hari 02.xx-03.xx nyambung kartu")"""),
    ("""if len(subs) != 38:
    fail(f"jumlah beat subtitle {len(subs)} != 38")""",
     """if len(subs) != 37:
    fail(f"jumlah beat subtitle {len(subs)} != 37")"""),
]
patch("qa19rp.py", QA_PAIRS)

GEN_MEME = '''#!/bin/bash
# Ilustrasi AI untuk 5 kartu sisipan meme VIDEO 19 (dunia GRUP JAGA
# TERMINAL). Satu seri: flat vector illustration, midnight purple + aksen
# emas hangat, tema terminal bus dini hari, tanpa teks/huruf/angka.
# Output: /tmp/gen19/m0..m4.png
set -e
mkdir -p /tmp/gen19
STYLE="flat vector illustration, deep midnight purple background, warm golden amber accents, soft magenta glow, cozy rounded shapes, subtle tiny stars, minimal, centered composition, high quality, no text, no letters, no numbers, no watermark"
z-ai image -p "quiet bus terminal at dawn, rows of parked minibuses under one warm hanging lamp, mist, tiny golden dust motes, $STYLE" -o /tmp/gen19/m0.png -s 1024x1024
z-ai image -p "a cheerful minibus front view with a glowing key floating beside it, ticket booth in background, night mood, $STYLE" -o /tmp/gen19/m1.png -s 1024x1024
z-ai image -p "a tall stack of paper bus tickets with a glowing roll, rows of empty rounded seats behind, warm golden light, $STYLE" -o /tmp/gen19/m2.png -s 1024x1024
z-ai image -p "one empty parking garage slot glowing softly among numbered garage doors, a single warm light above, calm night mood, $STYLE" -o /tmp/gen19/m3.png -s 1024x1024
z-ai image -p "a giant glowing ticket roll shaped like a question mark standing in an empty terminal hall, warm golden glow behind, mysterious calm mood, $STYLE" -o /tmp/gen19/m4.png -s 1024x1024
ls -la /tmp/gen19/
'''
(HERE / "gen_meme19.sh").write_text(GEN_MEME)
print("gen_meme19.sh: full rewrite ok")

patch("embed_meme19.py", [
    ("Embed 5 ilustrasi AI kartu meme VIDEO 18 ke frag_imgs.html",
     "Embed 5 ilustrasi AI kartu meme VIDEO 19 ke frag_imgs.html"),
    ('5 gambar flat midnight-gold dunia gudang, embed base64',
     '5 gambar flat midnight-gold dunia terminal, embed base64'),
])
print("patch C selesai")
