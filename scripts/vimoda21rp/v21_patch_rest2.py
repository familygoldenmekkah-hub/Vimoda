#!/usr/bin/env python3
"""Patch rest bagian 2: voice21 LINES + profil, audio21 mood dapur,
qa21 (9:16 only + dunia RESEP GAGAL + GLOW), package naskah21/caption21."""
from pathlib import Path

HERE = Path("/home/z/my-project/scripts/vimoda21rp")


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


# ---------- voice21rp.py ----------
VOICE_PAIRS = [
    ("VOICE ACTING rev23 VIDEO 20 - generator suara 6 chara (24 klip).",
     "VOICE ACTING rev24 VIDEO 21 - generator suara 6 chara (24 klip)."),
    ("# (who, teks lisan) - rev23: skema LARI PAGI (bahan bilangan asli),\n# sapaan unik per chara (F1), arc tsun-dere BAGAS (F4), cermin fakta\n# lawan (F5), empati RIKA (F8). Angka dilisankan; tetap sopan (#39).",
     "# (who, teks lisan) - rev24: skema RESEP GAGAL (bahan bilangan di\n# dapur), sapaan unik per chara (F1), arc tsun-dere RARA (F4), cermin\n# fakta lawan (F5), empati GITA (F8). Angka dilisankan; sopan (#39)."),
    ("""    ("PUSAT", "Perhatian, panitia! Lari pagi minggu... resmi "
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
]""",
     """    ("PUSAT", "Perhatian, anak dapur! Papan resep minggu ini sudah "
              "terpasang. Brownies empat porsi: dua ratus gram cokelat, "
              "dua telur, dua ratus lima puluh mililiter susu... dan "
              "lima langkah wajib urut!"),
    ("RARA", "Duh, malu, kak. Brownies gue keras kayak batu! Padahal "
             "gue ikutin semua. Gak mungkin salah gue... pasti "
             "resepnya yang bohong."),
    ("GITA", "Santai, Rara, kita cek pelan-pelan ya. Resep itu murni "
             "matematika: tiap angka punya tugas. Salah satu angka "
             "aja... teksturnya berubah total."),
    ("KAMU", "Coba hitung ulang, kak Rara. Cokelatnya berapa gram "
             "yang kamu pakai tadi?"),
    ("DIMAS", "Ini kunci dapur: angka itu presisi. Dua ratus gram dan "
              "dua puluh gram beda sepuluh kali lipat. Satu nol aja "
              "kelewat... brownies bisa jadi kardus."),
    ("MANDA", "Makanya gue beli jadi, gak perlu mikir angka. Tapi oke "
              "deh, gue ikut nyimak... penasaran juga."),
    ("RARA", "Hmph, jelas ini ovennya yang ngambek! Suhunya gue pasang "
             "seratus delapan puluh kaya resep. Eh, tunggu... "
             "termometer oven gue mati sejak ludes bikin bakwan "
             "kemarin?"),
    ("GITA", "Oven boleh dicurigai, tapi takaran dicek duluan ya, Rar. "
             "Kalau angkanya salah... oven sebagus apa pun tetap gagal. "
             "Resepnya minta dua ratus gram, bukan dua puluh."),
    ("PUSAT", "Papan takaran terkirim. Dua ratus gram, dua telur, dua "
              "ratus lima puluh mililiter... yang kurang cuma satu "
              "nol."),
    ("KAMU", "Liat papan, kak Rara: resep minta dua ratus gram... kamu "
             "pakai dua puluh gram. Sepuluh kali lebih sedikit! "
             "Makanya adonannya gak nempel apa-apa."),
    ("DIMAS", "Dan urutan langkah juga angka: langkah satu lelehkan, "
              "dua campur, tiga kocok, empat tuang, lima panggang. "
              "Lompat satu langkah aja... hasilnya beda."),
    ("GITA", "Nah, di resep, angka kerja dua shift: mengukur takaran "
             "dan mengurutkan langkah. Dua-duanya wajib tepat... gak "
             "boleh ketuker."),
    ("MANDA", "Berarti kalau gue mau bikin delapan porsi dari resep "
              "empat porsi... tinggal dobel semua angkanya? Dua ratus "
              "jadi empat ratus, dua telur jadi empat?"),
    ("PUSAT", "Papan resep dobel terkirim. Empat porsi ke delapan "
              "porsi... semua angka dua kali lipat."),
    ("KAMU", "Betul, kak Manda! Dobel porsi artinya dobel semua "
             "takaran. Gak boleh dobel satu, dobel lain gak. Angka di "
             "resep itu satu tim."),
    ("RARA", "Oke, gue ngaku deh. Takaran gue salah baca. Dan bukan "
             "cuma itu: gue juga lompat langkah tiga. Makanya "
             "teksturnya hancur."),
    ("GITA", "Buat yang baru gabung: jurus resep tepat. Takaran "
             "ditimbang... langkah diurut... porsi dihitung."),
    ("DIMAS", "Minggu depan kita praktik bareng. Gue bawa timbangan... "
              "kak Rara bawa kesabaran. Semua angka gue cocokin dua "
              "kali."),
    ("RARA", "Hmph, oke oke. Gue ulang sekarang: dua ratus gram "
             "beneran... dan lima langkah gak ada yang dilompati. "
             "Kalau gagal lagi, gue pindah ke grup Manda."),
    ("PUSAT", "Pertanyaan dapur. Kalau resep empat porsi mau dijadikan "
              "dua belas porsi, dua ratus gram jadi berapa? Dan mana "
              "yang lebih sering bikin gagal: salah takaran atau "
              "salah urutan?"),
    ("DIMAS", "Dua belas porsi berarti tiga kali lipat: dua ratus jadi "
              "enam ratus gram. Gampangnya: porsi dilipat... takaran "
              "ikut dilipat."),
    ("GITA", "Dari tiga puluh tujuh kegagalan yang tercatat di grup "
             "ini, paling sering penyebabnya salah takaran. Yang salah "
             "urutan biasanya langsung ketahuan di langkah kedua. Eh, "
             "gue catat juga... jam tujuh empat puluh, Rara kirim foto "
             "brownies baru, teksturnya udah cakep."),
    ("PUSAT", "Voting dapur: lima delapan persen bilang salah "
              "takaran... empat dua persen bilang salah urutan."),
    ("PUSAT", "Voting ditutup: dua-duanya berbahaya, tapi salah "
              "takaran lebih sering jadi biang keroknya. Besok: "
              "pecahan di dapur, setengah sendok teh. Selamat "
              "mencoba... jangan lupa timbang!"),
]"""),
    ("""EDGE_VOICE = {
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
             "KAMU": 1.0, "PUSAT": 0.8}""",
     """EDGE_VOICE = {
    "GITA": dict(voice="id-ID-GadisNeural", rate="-10%"),
    "RARA": dict(voice="id-ID-GadisNeural", rate="+8%"),
    "MANDA": dict(voice="id-ID-GadisNeural", rate="+14%"),
    "DIMAS": dict(voice="id-ID-ArdiNeural", rate="+4%"),
    "KAMU": dict(voice="id-ID-ArdiNeural", rate="+12%"),
    "PUSAT": dict(voice="id-ID-ArdiNeural", rate="-16%", volume="-8%"),
}
ZAI_VOICE = {"GITA": "tongtong", "RARA": "kazi", "MANDA": "xiaochen",
             "DIMAS": "jam", "KAMU": "kago", "PUSAT": "senja"}
ZAI_SPEED = {"GITA": 0.9, "RARA": 1.1, "MANDA": 1.12, "DIMAS": 1.08,
             "KAMU": 1.0, "PUSAT": 0.8}"""),
]
patch("voice21rp.py", VOICE_PAIRS)

# ---------- audio21rp.py ----------
AUDIO_PAIRS = [
    ('Musik, SFX & VOICE ACTING rev23 - VIDEO 20 "LARI PAGI: Bilangan Asli\nMulai dari 1" (dunia GRUP PANITIA LARI PAGI), desain PAGI CERIA.',
     'Musik, SFX & VOICE ACTING rev24 - VIDEO 21 "GRUP RESEP GAGAL:\nBilangan di Dapur" (dunia GRUP RESEP GAGAL), desain GLOW v3.'),
    ("""RESEP rev14-16 (hukum #42): palet malam lofi hangat - pad D MINOR malam,
arpeggio lembut pagi hari, pop notifikasi bernada per chara (LARA 523,
RIKA 740, DIN 660, BAGAS 392, KAMU 587, PUSAT 880), swell hangat di kartu
babak""",
     """RESEP rev14-16 (hukum #42): palet dapur malam hangat - pad F MAJOR,
arpeggio marimba dapur lembut, pop notifikasi bernada per chara (GITA 523,
RARA 740, DIMAS 660, MANDA 392, KAMU 587, PUSAT 880), swell hangat di kartu
babak"""),
    ("""pertanyaan PUSAT (MA), hangat F MAJOR sejak resolusi dua peran angka +
voting.""",
     """pertanyaan PUSAT (MA), hangat F MAJOR sejak resolusi porsi dilipat +
voting."""),
    ("""SEG = [
    (0.0, card2, (F3, A3, C4)),        # pagi ceria: kartu peserta 1-40
    (card2, MA[0], (D3, F3, A3)),      # nomor 13, menghitung vs mengurutkan
    # MA: hening total 1.0 s sebelum pertanyaan PUSAT
    (f2t0, f3t0, (G3, Bb3, D4)),       # debat juara 1 dan successor 41
    (f3t0, DUR, (F3, A3, C4)),         # dua peran satu keluarga: hangat
]""",
     """SEG = [
    (0.0, card2, (F3, A3, C4)),        # dapur hangat: papan resep 4 porsi
    (card2, MA[0], (D3, F3, A3)),      # takaran 200 vs 20, presisi, dobel
    # MA: hening total 1.0 s sebelum pertanyaan PUSAT
    (f2t0, f3t0, (G3, Bb3, D4)),       # debat 12 porsi dan penyebab gagal
    (f3t0, DUR, (F3, A3, C4)),         # porsi dilipat takaran ikut: hangat
]"""),
    ("""WHO = ("PUSAT", "BAGAS", "RIKA", "KAMU", "LARA", "KAMU", "BAGAS",
       "DIN", "PUSAT", "KAMU", "RIKA", "LARA", "DIN", "PUSAT", "KAMU",
       "RIKA", "LARA", "RIKA", "BAGAS", "PUSAT", "DIN", "RIKA",
       "PUSAT", "PUSAT")
POP_F = {"LARA": 523.0, "RIKA": 740.0, "DIN": 660.0, "BAGAS": 392.0,
         "KAMU": 587.0, "PUSAT": 880.0}""",
     """WHO = ("PUSAT", "RARA", "GITA", "KAMU", "DIMAS", "MANDA", "RARA",
       "GITA", "PUSAT", "KAMU", "DIMAS", "GITA", "MANDA", "PUSAT", "KAMU",
       "RARA", "GITA", "DIMAS", "RARA", "PUSAT", "DIMAS", "GITA",
       "PUSAT", "PUSAT")
POP_F = {"GITA": 523.0, "RARA": 740.0, "DIMAS": 660.0, "MANDA": 392.0,
         "KAMU": 587.0, "PUSAT": 880.0}"""),
    ("add(0.35, swell(65.4, 0.12))               # dunia GRUP RESEP GAGAL menyala",
     "add(0.35, swell(65.4, 0.12))               # dunia GRUP RESEP GAGAL menyala"),
    ("    if i == 17:                            # stiker JURUS HITUNG ASLI",
     "    if i == 16:                            # stiker JURUS RESEP TEPAT"),
    ("""add(M[19] + 0.4, chime(880.0, 0.04))       # PUSAT: pertanyaan panitia
add(M[21] + 0.35, chime(523.25, 0.08))     # RIKA: dua peran satu keluarga""",
     """add(M[19] + 0.4, chime(880.0, 0.04))       # PUSAT: pertanyaan dapur
add(M[21] + 0.35, chime(523.25, 0.08))     # GITA: data 37 kegagalan + empati
# HERO POSTER sinematik (GLOW v3): masuk dan keluar poster
for sc in TM["scenes"]:
    add(sc[0], whoosh(0.5, True, 0.05))
    add(sc[0] + 0.05, chime(659.26, 0.07))
    add(sc[1] - 0.45, whoosh(0.4, False, 0.04))"""),
]
patch("audio21rp.py", AUDIO_PAIRS)

# ---------- qa21rp.py ----------
QA_PAIRS = [
    ('"""QA penuh Video 20 FORMAT RP (LARI PAGI: Bilangan Asli Mulai dari 1?,\ndunia GRUP PANITIA LARI PAGI). PENERAPAN KEDUA FORMULA DIALOG AKIOMIDA\nv1 (F1-F8, otak/BELAJAR-DIALOG.md). SISTEM DESAIN PAGI CERIA\n(otak/DESAIN-PAGI.md) + L1 REVISI: 9:16 SAJA. HUKUM SERI: dunia diganti total -',
     '"""QA penuh Video 21 FORMAT RP (GRUP RESEP GAGAL: Bilangan di Dapur,\ndunia GRUP RESEP GAGAL). PENERAPAN KETIGA FORMULA DIALOG AKIOMIDA v1\n(F1-F8, otak/BELAJAR-DIALOG.md). SISTEM DESAIN GLOW v3\n(otak/DESAIN-GLOW.md, rombak total per penolakan pemilik) + L1 REVISI:\n9:16 SAJA. HUKUM SERI: dunia diganti total -'),
    ("""          "TERMINAL", "terminalpusat", "TERMINAL PUSAT", "TERMINAL JAM 3",
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
          "MULAI DARI 0 ATAU 1",
          "DUA-DUANYA SAH", "ATURAN BOLEH BEDA", "BUKU LAMA", "BUKU BARU",
          "30 KARCIS", "BESOK: BILANGAN ASLI", "61%", "39%",
          "30 penumpang", "10 garasi", "nol ikut dihitung",
          "NOMOR 7 KOSONG", "NOL ITU ANGKA SAH", "VOTING DINI HARI",
          "MONITOR DINAS", "sinkron karcis-unit", "0 sampai 9")""",
     """          "TERMINAL", "terminalpusat", "TERMINAL PUSAT", "TERMINAL JAM 3",
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
          "MULAI DARI 0 ATAU 1",
          "DUA-DUANYA SAH", "ATURAN BOLEH BEDA", "BUKU LAMA", "BUKU BARU",
          "30 KARCIS", "BESOK: BILANGAN ASLI", "61%", "39%",
          "30 penumpang", "10 garasi", "nol ikut dihitung",
          "NOMOR 7 KOSONG", "NOL ITU ANGKA SAH", "VOTING DINI HARI",
          "MONITOR DINAS", "sinkron karcis-unit", "0 sampai 9",
          # rev24: penanda dunia video 20 (lari pagi) terlarang
          "LARI", "lari", "PANITIA", "panitia", "LARA", "BAGAS", "RIKA",
          "DIN", "pelari", "PESERTA", "peserta", "papan peserta",
          "PAPAN PODIUM", "podium", "lintasan", "finis", "juara", "JUARA",
          "garis start", "GARIS START", "kartu peserta", "KARTU PESERTA",
          "nomor dada", "nomor 13", "NOMOR 13", "sial", "SIAL",
          "bilangan asli", "bukan cacah", "nol sah di cacah",
          "JURUS HITUNG ASLI", "ASLI: 1, 2, 3", "ANGKA MENGHITUNG",
          "MENGHITUNG ATAU MENGURUTKAN", "MENGHITUNG: 40 PELARI",
          "MENGURUTKAN: JUARA KE-1", "ANGKA SAMA · PERAN BEDA",
          "DUA PERAN, SATU KELUARGA ANGKA", "BESOK: JUMLAH 1 SAMPAI 100",
          "JUARA KE-0 GAK ADA", "URUTAN GAK BOLEH BOLONG",
          "SATU NOMOR, SATU PELARI", "VOTING PANITIA", "VOTING PUSAT",
          "KARTU 1-40", "NOMOR 13 TETEP ADA", "empat puluh kartu",
          "kartu ke-41", "05.12", "05.17", "05.24", "05.33", "05.44",
          "05.52", "05.58", "salam satu lintasan", "PAGI CERIA",
          "TAKARAN ITU MATEMATIKA", "DOBEL PORSI, DOBEL ANGKA")"""),
]
# hapus TAKARAN ITU MATEMATIKA / DOBEL PORSI dari banned (itu judul hero v21)
QA_PAIRS[-1] = (
    QA_PAIRS[-1][0].replace(', "PAGI CERIA",\n          "TAKARAN ITU MATEMATIKA", "DOBEL PORSI, DOBEL ANGKA")',
                            ', "PAGI CERIA")'),
    QA_PAIRS[-1][1],
)
QA_PAIRS += [
    ("""requires = ("GRUP PANITIA LARI PAGI", "KUASAI MATEMATIKA DI AKIOMIDA.COM",
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
            "asli ya, bukan cacah", "empat puluh kartu buat empat puluh pelari",
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
            "voice acting", "9:16 SAJA", "PAGI CERIA")""",
     """requires = ("GRUP RESEP GAGAL", "KUASAI MATEMATIKA DI AKIOMIDA.COM",
            "CEK TAKARAN · 19.20", "PAPAN TAKARAN · 19.24",
            "RESEP DOBEL · 19.33", "VOTING DAPUR · 19.44",
            "RARA", "GITA", "DIMAS", "MANDA", "KAMU",
            "AKUN DAPUR PUSAT",
            # rev24: skema RESEP GAGAL (F2 kartu dunia) + sapaan unik (F1)
            "RESEP MINGGU INI", "BROWNIES 4 PORSI",
            "CEK TAKARAN: 200 GRAM", "2 TELUR · 250 ML · 180 DERAJAT",
            "LANGKAH 1 SAMPAI 5 WAJIB URUT", "@dapurpusat",
            "PAPAN TAKARAN ASLI", "KURANG SATU NOL", "BEDA 10 KALI LIPAT",
            "PAPAN RESEP DOBEL", "SEMUA ANGKA DUA KALI LIPAT",
            "VOTING DAPUR", "SALAH TAKARAN", "SALAH URUTAN",
            "brownies gue keras kayak batu", "resep itu murni matematika",
            "angka itu presisi", "sepuluh kali lipat",
            "brownies bisa jadi kardus", "ovennya yang ngambek",
            "oven boleh dicurigai", "takaran dicek duluan",
            "resep minta 200 gram, kamu pakai 20 gram",
            "langkah 1 lelehkan, 2 campur, 3 kocok",
            "mengukur takaran dan mengurutkan langkah",
            "200 jadi 400, 2 telur jadi 4", "dobel porsi",
            "angka di resep itu satu tim", "gue ngaku deh",
            "lompat langkah 3", "JURUS RESEP TEPAT",
            "takaran ditimbang · langkah diurut · porsi dihitung",
            "gue bawa timbangan", "200 gram beneran",
            "pertanyaan dapur", "12 porsi", "200 jadi 600 gram",
            "porsi dilipat, takaran ikut dilipat", "37 kegagalan",
            "teksturnya udah cakep", "biang keroknya",
            "pecahan di dapur", "1/2 sendok teh", "selamat mencoba",
            "jangan lupa timbang",
            # rev24: 3 diagram menyala (F6) + hero poster (GLOW v3)
            "ANGKA DAPUR", "TAKARAN + LANGKAH",
            "SATU NOL KELEWAT = GAGAL", "LANGKAH 1-5 GAK BOLEH LOMPAT",
            "PENYEBAB GAGAL PALING SERING?",
            "TAKARAN PALING SERING BIKIN GAGAL",
            "LANGKAH LOMPAT LANGSUNG KETAHUAN",
            "PORSI DILIPAT · TAKARAN IKUT",
            "MENGUKUR: 200 GRAM (TAKARAN)", "MENGURUTKAN: LANGKAH 1-5",
            "porsi dilipat, takaran ikut: 4 lalu 8 lalu 12",
            "SEMUA ANGKA SATU TIM", "BESOK: PECAHAN 1/2",
            "TAKARAN ITU MATEMATIKA", "DOBEL PORSI, DOBEL ANGKA",
            "const SCENES=TM.scenes", "HERO_IMGS", "glowlayer",
            "MISI DARI DAPUR PUSAT", "TULIS JAWABANMU DI KOMENTAR YA",
            "KARTU BANTU DARI DAPUR PUSAT",
            "RESEP 4 PORSI MAU JADI 8", "RESEP 2 TELUR MAU JADI 8 PORSI",
            "Dibaca ✓✓", "memewrap", "mglyph", "meyes", "mdigit",
            # rev18: intro film - judul full-bleed + kartu produksi
            "intro1", "intro2", "introimg", "introtitle",
            "DIPERSEMBAHKAN", "KUASAI MATEMATIKA JADI LEBIH MUDAH",
            "AKIOMIDA",
            # rev14-24: waktu chat + ilustrasi AI + timeline + L1 + GLOW
            "19.12", "19.58", "const AVI=", "MEME_IMGS",
            "const TM=", "const SUBS=TM.subs", "const DIVS=TM.div",
            "voice acting", "9:16 SAJA", "GLOW v3")"""),
    ("""else:
    print("4 ilustrasi dunia SVG ok (poster, papan peserta, podium, voting)")""",
     """else:
    print("4 ilustrasi dunia SVG ok (papan resep, takaran, dobel, voting)")"""),
    ("""if "UJIVAL=['40','41','39','13','1','2','3','14']" not in eng:""",
     """if "UJIVAL=['400','4','8','2','200','600','12','5']" not in eng:"""),
    ("""elif (stamps[0] != "05.12" or stamps[4] != "05.17" or stamps[8] != "05.24"
      or stamps[13] != "05.33" or stamps[19] != "05.44"
      or stamps[22] != "05.52" or stamps[-1] != "05.58"):
    fail(f"stempel jam tidak nyambung kartu babak: {stamps}")
else:
    print(f"stempel jam realistis 05.12 -> {stamps[-1]} pagi hari ok")""",
     """elif (stamps[0] != "19.12" or stamps[4] != "19.17" or stamps[8] != "19.24"
      or stamps[13] != "19.33" or stamps[19] != "19.44"
      or stamps[22] != "19.52" or stamps[-1] != "19.58"):
    fail(f"stempel jam tidak nyambung kartu babak: {stamps}")
else:
    print(f"stempel jam realistis 19.12 -> {stamps[-1]} malam dapur ok")"""),
    ("""# rev23 (pagi hari): seluruh stempel antara 05.00 dan 07.00, tanpa
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
    print("konsistensi waktu ok: semua stempel pagi hari 05.xx-06.xx nyambung kartu")""",
     """# rev24 (malam dapur): seluruh stempel antara 19.00 dan 20.00, tanpa
# loncatan; selaras desain GLOW v3
bad_waktu = []
for chunk in eng_scan.split("{t0:TM.m[")[1:]:
    mi = int(re.match(r"\\d+", chunk).group())
    st = re.search(r"stamp:'([\\d.]+)'", chunk[:120])
    if st:
        hh = int(st.group(1).split(".")[0])
        if hh not in (19, 20):
            bad_waktu.append((mi, "jam malam dapur", st.group(1)))
if bad_waktu:
    fail(f"dosa waktu rev24: {bad_waktu}")
else:
    print("konsistensi waktu ok: semua stempel malam dapur 19.xx-20.xx nyambung kartu")"""),
    ('for name in ("caption20.txt", "naskah20.md"):', 'for name in ("caption21.txt", "naskah21.md"):'),
    ('for bad in (cap_bad if name == "caption20.txt" else base_bad):', 'for bad in (cap_bad if name == "caption21.txt" else base_bad):'),
    ('if name == "caption20.txt" and "sudah menunggu" not in t:', 'if name == "caption21.txt" and "sudah menunggu" not in t:'),
]
patch("qa21rp.py", QA_PAIRS)
print("patch rest bagian 2 selesai")
