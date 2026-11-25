#!/usr/bin/env python3
"""Support patch bagian 3: qa18rp (dunia baru) + gen_meme18 + embed_meme18."""
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


QA_PAIRS = [
    ('"""QA penuh Video 17 FORMAT RP (KOMA TAK BERUJUNG: Bilangan Desimal, dunia\nGRUP RESEP GAGAL). HUKUM SERI: setiap video dunia RP diganti total -',
     '"""QA penuh Video 18 FORMAT RP (MALAM INVENTARIS: Bilangan Diciptakan\natau Ditemukan?, dunia GRUP JAGA GUDANG). HUKUM SERI: dunia diganti total -'),
    ("""          "sobat dapur", "akang gede", "neng vita", "kak bener",
          "koma mah", "full dua rata")""",
     """          "sobat dapur", "akang gede", "neng vita", "kak bener",
          "koma mah", "full dua rata",
          # rev21 (hukum dunia): penanda dunia video 15-17 terlarang
          "RESEP", "DAPUR", "dapur", "takar", "TAKAR", "GEDE", "VITA",
          "NADIA", "AKUN TANTANGAN", "GARIS UKUR", "timbangan", "TIMBANGAN",
          "karamel", "terigu", "adonan", "lunyer", "maghrib", "MAGHRIB",
          "kroasan", "omaknadia", "koma-komaan", "0,999", "0,333", "1/3",
          "0,75", "0,40", "0,35", "desimal berulang", "gelas takar",
          "LEADERBOARD", "JAM 7 MALAM", "HARI 3", "HARI 4", "16.00",
          "18.04", "19.02", "16.14", "16.26")"""),
    ("""requires = ("GRUP RESEP GAGAL", "KUASAI MATEMATIKA DI AKIOMIDA.COM",
            "GILIRAN GEDE · 16.14", "GAGAL TAKAR · 16.26",
            "MAGHRIB · 18.04", "JAM 7 MALAM · UJI RASA",
            "NADIA", "GEDE", "VITA", "KAMU", "AKUN TANTANGAN",
            # rev19: skema TANTANGAN DAPUR HARI 3 + sapaan unik per chara
            "TANTANGAN DAPUR", "SEMUA TAKARAN WAJIB DESIMAL",
            "HAKIM: TIMBANGAN DIGITAL", "GAGAL TAKAR = CAP KUSAM",
            "santai pak gede", "bener, kak", "pak gede",
            "gelas takar ngukur volume", "timbangan ngukur berat",
            "0,40", "0,35", "0,75", "1/3 sdt garam", "desimal berulang",
            "garis ukur", "GARIS UKUR 0 → 1", "nempel persis di angka 1",
            "gagal takar", "angka koma itu dibaca", "bukan ditebak",
            "ya pecahannya yang harus jadi desimal", "jadi gue kurang berapa",
            # rev19: metode garis ukur (3 diagram) + kosakata benar
            "KOMA PERTAMA = PERSEPULUHAN", "KOMA KEDUA = PERSERATUSAN",
            "DESIMAL BERULANG", "TWIST KALKULATOR",
            "0,999... MENEMPEL DI 1", "TIGA TITIK (...) = JALAN TERUS",
            "LEADERBOARD · HARI 3", "BESOK: PECAHAN", "× DESIMAL",
            "MISI DARI AKUN TANTANGAN",
            "JAWAB MISI HARI 4 DI KOMENTAR YA",
            "KARTU BANTU DARI AKUN TANTANGAN",
            "UBAH 3/4 KE DESIMAL", "0,40 + 0,35 = ?",
            "MANA YANG BERULANG", "0,999... = ?",
            "Dibaca ✓✓", "memewrap", "mglyph", "meyes", "mdigit",
            # rev18 (permintaan pemilik): intro film - judul full-bleed +
            # kartu produksi dipersembahkan
            "intro1", "intro2", "introimg", "introtitle",
            "DIPERSEMBAHKAN", "KUASAI MATEMATIKA JADI LEBIH MUDAH",
            "AKIOMIDA",
            # rev14: waktu chat realistis + ilustrasi AI
            "16.00", "19.02", "const AVI=", "MEME_IMGS",
            # rev15: voice acting + timeline satu sumber
            "const TM=", "const SUBS=TM.subs", "const DIVS=TM.div",
            "voice acting 5 chara")""",
     """requires = ("GRUP JAGA GUDANG", "KUASAI MATEMATIKA DI AKIOMIDA.COM",
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
            "voice acting")"""),
    ("""n_msg = len(re.findall(r"\\{t0:TM\\.m\\[\\d+\\], who:", eng))
if n_msg != 20:
    fail(f"jumlah bubble {n_msg} != 20")""",
     """n_msg = len(re.findall(r"\\{t0:TM\\.m\\[\\d+\\], who:", eng))
if n_msg != 24:
    fail(f"jumlah bubble {n_msg} != 24")"""),
    ("""if "UJIVAL=['3/4','0,75','0,40','0,35','1/3','0,333...','0,999...','1']" not in eng:
    fail("delapan kartu bantu tidak lengkap")
else:
    print("papan misi 4 soal utuh + 8 kartu bantu ok")""",
     """if "UJIVAL=['30','6','5','4','28','2','-5','0']" not in eng:
    fail("delapan kartu bantu tidak lengkap")
else:
    print("papan misi 2 soal utuh + 8 kartu bantu ok")"""),
    ("""# stempel jam chat realistis rev14: urutan naik, bertepatan kartu babak
stamps = re.findall(r"\\{t0:TM\\.m\\[\\d+\\], who:'\\w+', stamp:'([\\d.]+)'", eng)
if len(stamps) != 20:
    fail(f"stempel jam chat {len(stamps)} != 20")
elif stamps != sorted(stamps):
    fail(f"stempel jam tidak urut: {stamps}")
elif (stamps[0] != "16.00" or stamps[4] != "16.14" or stamps[7] != "16.26"
      or stamps[12] != "18.04" or stamps[16] != "19.02"
      or stamps[-1] != "19.08"):
    fail(f"stempel jam tidak nyambung kartu babak: {stamps}")
else:
    print(f"stempel jam chat realistis 16.00 -> {stamps[-1]} nyambung kartu sore/maghrib/malam ok")""",
     """# stempel jam realistis rev21: urut naik LINTAS TENGAH MALAM
# (23.30..23.58 lalu 00.02..00.26) dan bertepatan kartu babak
stamps = re.findall(r"\\{t0:TM\\.m\\[\\d+\\], who:'\\w+', stamp:'([\\d.]+)'", eng)
def _mins(s):
    hh, mm = s.split(".")
    h = int(hh)
    return h * 60 + int(mm) + (24 * 60 if h < 12 else 0)
if len(stamps) != 24:
    fail(f"stempel jam chat {len(stamps)} != 24")
elif [_mins(s) for s in stamps] != sorted(_mins(s) for s in stamps):
    fail(f"stempel jam tidak urut kronologis: {stamps}")
elif (stamps[0] != "23.30" or stamps[4] != "23.45" or stamps[8] != "23.52"
      or stamps[13] != "00.02" or stamps[18] != "00.12"
      or stamps[22] != "00.20" or stamps[-1] != "00.26"):
    fail(f"stempel jam tidak nyambung kartu babak: {stamps}")
else:
    print(f"stempel jam realistis 23.30 -> {stamps[-1]} lintas tengah malam ok")"""),
    ("""# rev19 (keluhan pemilik - dosa waktu): kata "malam" HANYA boleh muncul
# setelah kartu JAM 7 MALAM; kata "sore" tidak boleh setelah kartu MAGHRIB
malam_card = float(TMj["div"][4][0])
maghrib_card = float(TMj["div"][3][0])
bad_waktu = []
for chunk in eng_scan.split("{t0:TM.m[")[1:]:
    mi = int(re.match(r"\\d+", chunk).group())
    t0m = float(TMj["m"][mi])
    for txt in re.findall(r"(?:text|cap):'([^']*)'", chunk[:420]):
        tl = txt.lower()
        if "malam" in tl and t0m < malam_card - 1e-9:
            bad_waktu.append((mi, "malam", txt[:40]))
        if "sore" in tl and t0m > maghrib_card + 1e-9:
            bad_waktu.append((mi, "sore", txt[:40]))
if bad_waktu:
    fail(f"dosa waktu rev19: {bad_waktu}")
else:
    print("konsistensi waktu ok: 'malam' hanya setelah kartu malam, 'sore' tidak setelah maghrib")""",
     """# rev21 (dunia lintas tengah malam): "sore" hanya boleh sebelum kartu
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
    print("konsistensi waktu ok: lintas tengah malam nyambung kartu JAM 12 MALAM")"""),
    ("""if len(subs) != 34:
    fail(f"jumlah beat subtitle {len(subs)} != 34")""",
     """if len(subs) != 35:
    fail(f"jumlah beat subtitle {len(subs)} != 35")"""),
    ("""    print(f"subtitle: {len(subs)} beat, tempo proporsional >= max(1.7s, len/17), jeda >= 1.7s ok")""",
     """    print(f"subtitle: {len(subs)} beat, tempo proporsional >= max(1.7s, len/17), jeda >= 1.7s ok")"""),
]
patch("qa18rp.py", QA_PAIRS)

GEN_MEME = '''#!/bin/bash
# Ilustrasi AI untuk 5 kartu sisipan meme VIDEO 18 (dunia GRUP JAGA GUDANG).
# Satu seri: flat vector illustration, midnight purple + aksen emas hangat,
# tema gudang malam/inventaris, tanpa teks/huruf/angka.
# Output: /tmp/gen18/m0..m4.png
set -e
mkdir -p /tmp/gen18
STYLE="flat vector illustration, deep midnight purple background, warm golden amber accents, soft magenta glow, cozy rounded shapes, subtle tiny stars, minimal, centered composition, high quality, no text, no letters, no numbers, no watermark"
z-ai image -p "vast dark warehouse interior at night, tall wooden shelves with cardboard boxes, one warm hanging lamp glowing above, tiny golden dust motes floating, $STYLE" -o /tmp/gen18/m0.png -s 1024x1024
z-ai image -p "warehouse shelf with neat rows of cardboard boxes, a glowing clipboard floating in front, one box glowing brighter than the others, $STYLE" -o /tmp/gen18/m1.png -s 1024x1024
z-ai image -p "thirty small rounded pastry boxes arranged into six equal glowing groups on a wooden table, warm golden light, cozy night mood, $STYLE" -o /tmp/gen18/m2.png -s 1024x1024
z-ai image -p "industrial freezer door slightly open with cold violet mist and frost sparkles, a glowing rounded thermometer hanging on the wall, night mood, $STYLE" -o /tmp/gen18/m3.png -s 1024x1024
z-ai image -p "tall stack of cardboard boxes forming a giant question mark shape in a dark warehouse, warm golden glow behind, mysterious calm mood, $STYLE" -o /tmp/gen18/m4.png -s 1024x1024
ls -la /tmp/gen18/
'''
(HERE / "gen_meme18.sh").write_text(GEN_MEME)
print("gen_meme18.sh: full rewrite ok")

patch("embed_meme18.py", [
    ("""Embed 5 ilustrasi AI kartu meme VIDEO 17 ke frag_imgs.html""",
     """Embed 5 ilustrasi AI kartu meme VIDEO 18 ke frag_imgs.html"""),
    ('HERE = Path("/home/z/my-project/scripts/vimoda17rp")',
     'HERE = Path("/home/z/my-project/scripts/vimoda18rp")'),
    ('im = Image.open(f"/tmp/gen17/m{i}.png")',
     'im = Image.open(f"/tmp/gen18/m{i}.png")'),
    ("""    "5 gambar flat midnight-gold dunia dapur, embed base64 ---------- */\\n\"""",
     """    "5 gambar flat midnight-gold dunia gudang, embed base64 ---------- */\\n\""""),
])
print("support patch bagian 3 selesai")
