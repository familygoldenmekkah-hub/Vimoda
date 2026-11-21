#!/usr/bin/env python3
"""Perbarui baris katalog 15 ke rev5 (FORMAT RP RUANG SAPA) di README katalog."""
import pathlib

R = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
lines = R.read_text().split("\n")

row15 = (
    "| 15 | Misteri Pembagi Rapi RP: Faktor dan Kelipatan | Blog Yuyanaka - artikel \"Kapoka\" (19 Nov 2026) | "
    "`15-faktor-kelipatan/` (REVISI 5 - ROMBAK TOTAL FORMAT RP atas laporan pemilik bahwa rev4 masih flat dan "
    "tidak seru, dengan arahan mempelajari anime sains (Dr Stone) dan membangun model RP karena gen z suka main "
    "roleplay, plus kewajiban riset dulu video RP yang tembus jutaan penonton sebelum revisi (totalitas): RISET "
    "DULU 16 pencarian terarah, sekitar 120 hasil dibaca dari TikTok, YouTube, TechCrunch, commonsensemedia, "
    "App Store dan Play Store; temuan yang diadopsi: genre chat story mapan dengan aplikasi 20 juta pengguna dan "
    "video puluhan juta penonton dengan formula 12-20 pesan pop satu per satu; typing indicator dan typing sound "
    "sebagai kunci keterlibatan; chat fiction terasa seperti mengintip percakapan orang lain dan berkembang jadi "
    "media campuran foto, stiker, suara, reaksi (Tap by Wattpad); grup chat dengan karakter berkepribadian "
    "berbeda sebagai pola komedi viral (The Group Chat); POV kamu MENJADI karakter (Character.ai, PovChat, budaya "
    "RP TikTok); reaksi emoji burst konfeti ala WhatsApp; hook awal plus cliffhanger kecil di tengah agar "
    "penonton bertahan; Dr Stone diidolakan karena penjelasan sains didramatisasi jadi diagram meledak dan "
    "kompetisi matematika ala Math Olympics - DUNIA BARU RUANG SAPA (aturan 26): seluruh episode kini VIDEO RP "
    "GROUP CHAT di aplikasi fiksi SAPA, grup KIOS PERMEN dengan header avatar tiga bulan, latar doodle angka dan "
    "permen melayang, vignette, phone idle float; PENONTON MENJADI DETEKTIF lewat peran KAMU (bubble berry di "
    "kanan, avatar bulat emoji tanpa wajah) bersama MENTOR, PEMILIK KIOS, dan ??? glow emas si Pembagi Rapi "
    "(label peran naratif menggantikan nama pribadi, amandemen aturan 19); ALUR 26 BUBBLE + 3 DIAGRAM MENYALA "
    "+ PAPAN MISI dalam 84 s: misteri foto etalase tertata rapi 4-4-4 dengan satu permen hadiah tamu pertama; "
    "petunjuk satu FAKTOR 12 lewat DIAGRAM MENYALA 1 (chips 1, 2, 3, 4, 6, 12; 12 dibagi 5 sisa 2 belum rapi; "
    "13 dibagi 3 sisa 1 jadi hadiah); petunjuk dua KELIPATAN 4 lewat DIAGRAM MENYALA 2 (chips 4, 8, 12 merah, "
    "16, 20, 24; 4 x 3 = 12; 12 kelipatan 4 sekaligus faktor 12); MID-CLIFFHANGER: ??? Membalas di chat (pola "
    "rapi itu hadiah kecil dari aku; besok isi 24 ya); jeda ma 33.5-34.5 typing menyusun jurus dengan musik "
    "hening total; TWIST DIAGRAM MENYALA 3 TERBATAS VS TANPA BATAS (boom, speedlines, cara terbatas peluang "
    "tanpa batas); STIKER JURUS BAGI RATA! (2 dapat 12, 3 dapat 8, 4 dapat 6, 6 dapat 4) sebagai pesan chat; "
    "foto kejutan 24 permen sisa nol dibagikan ke grup dengan BURST konfeti emoji; resolusi hangat: Pembagi Rapi "
    "itu semua orang yang mau berbagi rata, termasuk kamu; KAMU menerima (bagi rata itu buat semua orang, "
    "termasuk kamu), bukan menangkap - konten tetap 100% positif tanpa kata terlarang; papan MISI BARU UNTUKMU "
    "overlay slide-up dengan 4 soal utuh bernomor (faktor 20; lima kelipatan pertama 7; kenapa 5 bukan faktor "
    "12; mana yang tak terbatas) dan 8 kartu bantu (1, 2, 3, 4, 5, 8, 10, 20 dengan pengecoh 3 dan 8) plus pil "
    "JAWAB DI KOLOM KOMENTAR YA; teaser aturan 32 sebagai pesan chat: kios sebelah menyimpan misteri baru "
    "(FPB/KPK episode 16, istilah tetap diblokir QA di video); penutup bersih aturan 28 (papan keluar 71.6, "
    "teaser chat 72.0, konten memudar 75.2, AKIOMIDA.COM sendirian 75.4, bar gradien 78.4, fade 80.6); AUDIO RP: "
    "pop bubble pitch unik per peran (KIOS 523, MENTOR 659, KAMU 740, MYST 880 Hz), tick typing sebelum tiap "
    "pesan, whoosh diagram, boom twist, shimmer burst, D minor berubah F major saat terima kasih 53.8; TIPOGRAFI "
    "22PX (aturan 33 baru, permanen): semua teks minimal 22px diverifikasi fontcheck computed-style kedua "
    "orientasi (bubble 26/24, nama 22, header 30/27, diagram 34/30, chip 30, soal 24/23, kartu 30, pil EN 22, "
    "watermark 22, endcard 56/44); ATURAN 35 BARU (permanen) mendokumentasikan hukum format RP: kewajiban riset "
    "sebelum rebuild, label peran bukan nama pribadi, typing indicator wajib, media campuran (foto, stiker, "
    "burst), diagram menyala ala anime sains sebagai bahasa impact, mid-cliffhanger wajib, kishotenketsu tetap, "
    "subtitle EN di pil dengan tempo proporsional max(1,7 s, panjang/17) maksimal 8,5 s; QA baru qa15rp.py: "
    "struktur RP (25 bubble, 3 diagram, 6 divider, 4 soal, 8 kartu), tempo subtitle, fontcheck pra dan pasca "
    "render, kata terlarang (kejahatan, FPB/KPK, EPISODE, FOLLOW/SUBSCRIBE/IKUTI, kalimat kasar, em dash, nama "
    "studio pribadi), durasi 84.0 s, sampling frame tidak kosong, thumbnail baru; narasi hidup di 25 bubble "
    "Indonesia dengan subtitle Inggris 30 beat di pil; naskah rev5 mendokumentasikan riset, peran RP, alur, dan "
    "pemetaan bahan; baris katalog 15 di README diperbarui) |"
)

idx14 = None
old = None
for i, ln in enumerate(lines):
    if ln.startswith("| 15 | "):
        old = i
    elif ln.startswith("| 14 | Petak Tanam"):
        idx14 = i
if old is not None:
    lines[old] = row15
    print("README: baris katalog 15 DIPERBARUI ke rev5 (FORMAT RP)")
elif idx14 is not None:
    lines.insert(idx14 + 1, row15)
    print("README: baris katalog 15 ditambahkan")
else:
    raise SystemExit("baris 14 tidak ditemukan")
R.write_text("\n".join(lines))
