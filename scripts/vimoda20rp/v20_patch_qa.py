#!/usr/bin/env python3
"""Patch QA (9:16 only + dunia LARI PAGI) + gen_meme20 + embed."""
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


QA_PAIRS = [
    ('"""QA penuh Video 19 FORMAT RP (TERMINAL JAM 3: Bilangan Cacah Mulai\ndari 0 atau 1?, dunia GRUP JAGA TERMINAL). PENERAPAN PERTAMA FORMULA\nDIALOG AKIOMIDA v1 (F1-F8, otak/BELAJAR-DIALOG.md). HUKUM SERI: dunia diganti total -',
     '"""QA penuh Video 20 FORMAT RP (LARI PAGI: Bilangan Asli Mulai dari 1?,\ndunia GRUP PANITIA LARI PAGI). PENERAPAN KEDUA FORMULA DIALOG AKIOMIDA\nv1 (F1-F8, otak/BELAJAR-DIALOG.md). SISTEM DESAIN PAGI CERIA\n(otak/DESAIN-PAGI.md) + L1 REVISI: 9:16 SAJA. HUKUM SERI: dunia diganti total -'),
    ("""          "4 koma dua", "DITEMUKAN", "DIBUAT", "23.30", "23.45", "23.52", "00.02",
          "00.20", "00.26", "16.14", "RAK PERTAMA", "RAK CACAH",
          "rak bilangan cacah", "SELAMAT MALAM, ANAK-ANAK")""",
     """          "4 koma dua", "DITEMUKAN", "DIBUAT", "23.30", "23.45", "23.52", "00.02",
          "00.20", "00.26", "16.14", "RAK PERTAMA", "RAK CACAH",
          "rak bilangan cacah", "SELAMAT MALAM, ANAK-ANAK",
          # rev23: penanda dunia video 19 (terminal) terlarang
          "TERMINAL", "terminalpusat", "TERMINAL PUSAT", "TERMINAL JAM 3",
          "MELI", "BAYU", "HAZ", "OMDARI", "AKUN TERMINAL PUSAT",
          "karcis", "KARCIS", "garasi", "GARASI", "angkot",
          "02.58", "03.42", "dini hari", "DINI HARI",
          "salam satu terminal", "bilangan cacah. angka utuh",
          "gak ada setengah unit", "saksi sejarah", "garasi 7",
          "kursi nomor 0", "JURUS HITUNG UTUH", "unit utuh",
          "garasi nol juga keluarga", "satu lembar satu aturan",
          "hasil hitung gak ikut-ikutan selera",
          "kubu kecil juga keluarga terminal", "bilangan asli naik kelas",
          "ANGKA UTUH", "CACAH: 0", "UNIT UTUH", "KARCIS UTUH",
          "MULAI DARI 0 ATAU 1", "DARI 0", "DARI 1",
          "DUA-DUANYA SAH", "ATURAN BOLEH BEDA", "BUKU LAMA", "BUKU BARU",
          "30 KARCIS", "BESOK: BILANGAN ASLI", "61%", "39%",
          "30 penumpang", "10 garasi", "nol ikut dihitung",
          "NOMOR 7 KOSONG", "NOL ITU ANGKA SAH", "VOTING DINI HARI",
          "MONITOR DINAS", "sinkron karcis-unit", "0 sampai 9")"""),
    ("""requires = ("GRUP JAGA TERMINAL", "KUASAI MATEMATIKA DI AKIOMIDA.COM",
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
            "voice acting")""",
     """requires = ("GRUP PANITIA LARI PAGI", "KUASAI MATEMATIKA DI AKIOMIDA.COM",
            "GARIS START · 05.20", "PAPAN PESERTA · 05.24",
            "PODIUM JUARA · 05.33", "VOTING PUSAT · 05.44",
            "LARA", "DIN", "RIKA", "BAGAS", "KAMU",
            "AKUN PANITIA PUSAT",
            # rev23: skema LARI PAGI (F2 kartu dunia) + sapaan unik (F1)
            "LARI PAGI MINGGU", "CEK KARTU PESERTA 1-40",
            "GARIS START SIAP JAM 05.30", "CATAT JUARA 1 SAMPAI 3",
            "@panitiapusat", "PAPAN KARTU PESERTA · 1-40",
            "SATU NOMOR, SATU PELARI", "PAPAN PODIUM · JUARA 1-2-3",
            "JUARA KE-0 GAK ADA", "VOTING PANITIA",
            "nomor 13 ya, kak", "aku tetep juara 1",
            "urutan ke-13", "bilangan asli: 1, 2, 3",
            "asli ya, bukan cacah", "40 kartu buat 40 pelari",
            "buang aja nomor 13", "ganti jadi 41",
            "urutannya bolong di tengah", "13 tetep 13",
            "pelari pertama datang = juara 1",
            "dua peran bilangan asli", "angkanya sama, perannya beda",
            "satu, dua, tiga, jalan", "juara nol gak ada",
            "nol sah di cacah", "juara 1, bukan juara 0",
            "kartu ke-41 pun siap dicetak",
            "bilangan asli gak pernah habis", "JURUS HITUNG ASLI",
            "nomor 13 tetep gue pakai", "kartu nomor 41",
            "setelah 40 ada 41", "gak ada urutan sebelum pertama",
            "dua peran, satu keluarga angka", "salam satu lintasan",
            # rev23: 3 diagram menyala (F6) + kosakata benar
            "ANGKA MENGHITUNG", "ASLI: 1, 2, 3, TERUS",
            "GAK ADA JUARA KE-0", "URUTAN GAK BOLEH BOLONG",
            "MENGHITUNG ATAU MENGURUTKAN?", "MENGHITUNG", "MENGURUTKAN",
            "DUA PERAN, SATU KELUARGA ANGKA", "JUARA KE-0 GAK ADA",
            "ANGKA SAMA · PERAN BEDA",
            "MENGHITUNG: 40 PELARI (BANYAK)",
            "MENGURUTKAN: JUARA KE-1, KE-2, KE-3",
            "40 lalu 41", "BESOK: JUMLAH 1 SAMPAI 100",
            "MISI DARI PANITIA PUSAT", "TULIS JAWABANMU DI KOMENTAR YA",
            "KARTU BANTU DARI PANITIA PUSAT",
            "40 PELARI DARI NOMOR 1, YANG TERAKHIR NOMOR BERAPA?",
            "SETELAH 40 ADA BILANGAN BERAPA?",
            "Dibaca ✓✓", "memewrap", "mglyph", "meyes", "mdigit",
            # rev18: intro film - judul full-bleed + kartu produksi
            "intro1", "intro2", "introimg", "introtitle",
            "DIPERSEMBAHKAN", "KUASAI MATEMATIKA JADI LEBIH MUDAH",
            "AKIOMIDA",
            # rev14-23: waktu chat + ilustrasi AI + timeline + L1 revisi
            "05.12", "05.58", "const AVI=", "MEME_IMGS",
            "const TM=", "const SUBS=TM.subs", "const DIVS=TM.div",
            "voice acting", "9:16 SAJA", "PAGI CERIA")"""),
    ("""else:
    print("4 ilustrasi dunia SVG ok (papan, monitor, garasi, voting)")""",
     """else:
    print("4 ilustrasi dunia SVG ok (poster, papan peserta, podium, voting)")"""),
    ("""if "UJIVAL=['10','30','9','3','0','1','2','5']" not in eng:""",
     """if "UJIVAL=['40','41','39','13','1','2','3','14']" not in eng:"""),
    ("""elif (stamps[0] != "02.58" or stamps[4] != "03.03" or stamps[8] != "03.10"
      or stamps[13] != "03.19" or stamps[19] != "03.30"
      or stamps[22] != "03.36" or stamps[-1] != "03.42"):
    fail(f"stempel jam tidak nyambung kartu babak: {stamps}")
else:
    print(f"stempel jam realistis 02.58 -> {stamps[-1]} dini hari ok")""",
     """elif (stamps[0] != "05.12" or stamps[4] != "05.17" or stamps[8] != "05.24"
      or stamps[13] != "05.33" or stamps[19] != "05.44"
      or stamps[22] != "05.52" or stamps[-1] != "05.58"):
    fail(f"stempel jam tidak nyambung kartu babak: {stamps}")
else:
    print(f"stempel jam realistis 05.12 -> {stamps[-1]} pagi hari ok")"""),
    ("""# rev22 (dini hari): seluruh stempel antara 02.00 dan 04.00, tanpa
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
    print("konsistensi waktu ok: semua stempel dini hari 02.xx-03.xx nyambung kartu")""",
     """# rev23 (pagi hari): seluruh stempel antara 05.00 dan 07.00, tanpa
# loncatan; selaras desain PAGI CERIA
bad_waktu = []
for chunk in eng_scan.split("{t0:TM.m[")[1:]:
    mi = int(re.match(r"\\d+", chunk).group())
    st = re.search(r"stamp:'([\\d.]+)'", chunk[:120])
    if st:
        hh = int(st.group(1).split(".")[0])
        if hh not in (5, 6):
            bad_waktu.append((mi, "jam pagi hari", st.group(1)))
if bad_waktu:
    fail(f"dosa waktu rev23: {bad_waktu}")
else:
    print("konsistensi waktu ok: semua stempel pagi hari 05.xx-06.xx nyambung kartu")"""),
    ("""if len(subs) != 38:
    fail(f"jumlah beat subtitle {len(subs)} != 38")""",
     """if len(subs) != 37:
    fail(f"jumlah beat subtitle {len(subs)} != 37")"""),
    ("""# ---------- 3) dialog >= 30px + SEMUA teks >= 24px (keluhan penonton rev6) ----------
for o in ("portrait", "landscape"):
    d = OUT / o
    d.mkdir(parents=True, exist_ok=True)
    (d / "engine.html").write_text(eng)
r = subprocess.run([sys.executable, str(HERE / "fontcheck20.py")],
                   capture_output=True, text=True, timeout=180)
print(r.stdout.strip())
if r.returncode != 0:
    fail("ada teks di bawah 24px (fontcheck)")""",
     """# ---------- 3) 9:16 SAJA (L1 revisi) + semua teks >= 24px ----------
d = OUT / "portrait"
d.mkdir(parents=True, exist_ok=True)
(d / "engine.html").write_text(eng)
r = subprocess.run([sys.executable, str(HERE / "fontcheck20.py")],
                   capture_output=True, text=True, timeout=180)
print(r.stdout.strip())
if r.returncode != 0:
    fail("ada teks di bawah 24px (fontcheck)")"""),
    ("""# ---------- 5) video + thumbnail (post-render) ----------
for o in ("portrait", "landscape"):""",
     """# ---------- 5) video + thumbnail 9:16 (post-render) ----------
for o in ("portrait",):"""),
    ('for name in ("caption19.txt", "naskah19.md"):', 'for name in ("caption20.txt", "naskah20.md"):'),
    ('for bad in (cap_bad if name == "caption19.txt" else base_bad):', 'for bad in (cap_bad if name == "caption20.txt" else base_bad):'),
    ('if name == "caption19.txt" and "sudah menunggu" not in t:', 'if name == "caption20.txt" and "sudah menunggu" not in t:'),
]
patch("qa20rp.py", QA_PAIRS)

GEN_MEME = '''#!/bin/bash
# Ilustrasi AI untuk 5 kartu sisipan meme VIDEO 20 (dunia GRUP PANITIA
# LARI PAGI), gaya PAGI CERIA: terang, hangat, ceria - NOL tema gelap.
# Output: /tmp/gen20/m0..m4.png
set -e
mkdir -p /tmp/gen20
STYLE="flat vector illustration, bright warm morning, cream and sunny yellow palette with coral and mint accents, soft sky blue, cheerful rounded shapes, fluffy clouds, gentle sunlight, minimal, centered composition, high quality, no text, no letters, no numbers, no watermark"
z-ai image -p "morning fun run at a school field at sunrise, warm cream sky, colorful finish line banner, tiny happy runners, $STYLE" -o /tmp/gen20/m0.png -s 1024x1024
z-ai image -p "a cheerful running shoe with a fluttering blank racing bib beside it, warm morning light, playful mood, $STYLE" -o /tmp/gen20/m1.png -s 1024x1024
z-ai image -p "a neat stack of blank white racing bib cards on a clipboard with a small start flag, bright morning mood, $STYLE" -o /tmp/gen20/m2.png -s 1024x1024
z-ai image -p "three podium blocks with a small golden crown on the tallest one, confetti in the bright morning sky, cheerful, $STYLE" -o /tmp/gen20/m3.png -s 1024x1024
z-ai image -p "a giant glowing stopwatch shaped like a question mark above a sunny running track, morning mood, playful mystery, $STYLE" -o /tmp/gen20/m4.png -s 1024x1024
ls -la /tmp/gen20/
'''
(HERE / "gen_meme20.sh").write_text(GEN_MEME)
print("gen_meme20.sh: full rewrite ok")

patch("embed_meme20.py", [
    ("Embed 5 ilustrasi AI kartu meme VIDEO 19 ke frag_imgs.html",
     "Embed 5 ilustrasi AI kartu meme VIDEO 20 ke frag_imgs.html"),
    ('5 gambar flat midnight-gold dunia terminal, embed base64',
     '5 gambar flat pagi-ceria dunia lari pagi, embed base64'),
])
print("patch QA + meme selesai")
