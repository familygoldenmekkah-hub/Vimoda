#!/usr/bin/env python3
"""Revisi 4 (lanjutan): naskah07.md + README.md."""
import pathlib

NAS = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/naskah07.md")
RED = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")

def rep(txt, old, new, n=1, tag=""):
    c = txt.count(old)
    if c != n:
        raise SystemExit(f"[{tag}] ditemukan {c}x (harus {n}x): {old[:70]!r}")
    print(f"[{tag}] ok")
    return txt.replace(old, new)

# ---------- naskah ----------
n = NAS.read_text()
n = rep(n, "# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Revisi 3)",
"# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Revisi 4)", 1, "judul")
n = rep(n, "## Desain (mewarisi standar video 06 revisi 5)",
"""## Perbaikan revisi 4 (umpan balik kreator: aksi visualisasi malas dan tidak selaras topik; pasar banyak ditonton mata minus)

1. AKSI MENTOR KINI MEMPERAGAKAN MATERI, BUKAN REAKSI GENERIK: menggigil saat kartu -5 derajat (1.05), memangkuk jadi setengah tinggi saat kartu 1/2 (1.50), melebar sambil berputar satu putaran penuh saat kartu pi (1.95), memantul LIMA KALI menghitung lima buku (7.95), tenggelam melewati garis nol saat kelompok BULAT/negatif (17.60), berputar dua putaran tanpa henti saat IRASIONAL (23.15), dan TERBELAH DUA lalu menyatu menjadi satu bola penuh saat persamaan 1/2+1/2=1 (38.50-39.70) dengan kilat di titik menyatu.
2. BUBBLE TOPIK-SPESIFIK: "dingin!" dipertahankan; "lengkap!" diganti "lima kelompok!" (21.30); "aman." diganti "jadi 1!" (40.40) yang merayakan hasil persamaan. Ucapan bubble wajib lahir dari materi, bukan template antar video.
3. DESAIN UNTUK MATA MINUS: seluruh teks kunci dibesarkan (subtitle 30 ke 36 px, angka situasi 44 ke 50, angka kelompok 26 ke 30, label kelompok 17 ke 20, persamaan 54 ke 62, bubble 24 ke 30, judul 104 ke 112, dan seterusnya) dengan lebar kartu menyesuaikan agar tidak ada yang terpotong.

## Desain (mewarisi standar video 06 revisi 5)""", 1, "bagian rev4")
n = rep(n, "gestur mentor menoleh/mengangguk/denyut/menggigil, bayangan dinamis, sparkle, droplet keringat)",
"aksi mentor memperagakan materi: menggigil, menghitung memantul, tenggelam di garis nol, berputar saat pi, terbelah-dua saat 1/2+1/2=1, bayangan dinamis, sparkle, droplet keringat)", 1, "desain 1")
n = rep(n, '"1, 2, 3"; mentor terkejut bergidik (1.70 menoleah ke kartu teaser, 4.90 kejutan).',
'"1, 2, 3"; mentor memperagakan tiap kartu: menggigil saat -5 derajat (1.05), memangkuk setengah tinggi saat 1/2 (1.50), melebar sambil berputar saat pi (1.95), menoleah (1.70), terkejut (4.90).', 1, "tl hook")
n = rep(n, '"Semuanya butuh jenis bilangan berbeda." (boom; mentor mengangguk setuju, 8.20 menoleh ke kartu situasi, 8.90 menggigil saat suhu -5 derajat)',
'"Semuanya butuh jenis bilangan berbeda." (boom; mentor memantul lima kali menghitung lima buku (7.95), menggigil saat suhu -5 derajat (8.90), mengangguk setuju (11.50))', 1, "tl S1")
n = rep(n, "mentor menyapa ubin (16.40 denyut konfirmasi, 19.50 menoleh ke rasional, 23.00 mengangguk).",
"mentor menyapa ubin (16.40 denyut konfirmasi, 17.60 TENGGELAM melewati garis nol saat kelompok negatif, 19.50 menoleh ke rasional, 23.15 berputar dua putaran tanpa henti saat irasional).", 1, "tl S2")
n = rep(n, '- 40.40 - Gelembung "aman." dari bulatan emas; mentor menoleh ke kartu pi (36.30), mengangguk di persamaan (38.60), lalu tenang kembali (40.60).',
'- 40.40 - Gelembung "jadi 1!" dari bulatan emas; mentor menoleh ke kartu pi (36.30), TERBELAH DUA lalu menyatu menjadi satu bola penuh saat persamaan 1/2+1/2=1 (38.50-39.70, kilat 39.30), lalu tenang kembali (40.60).', 1, "tl S4")
n = rep(n, '"lengkap!" (21.3-22.7 saat irasional), "aman." (40.4-41.8 saat aturan)',
'"lima kelompok!" (21.3-22.7 saat lima kelompok terkumpul), "jadi 1!" (40.4-41.8 saat persamaan terpenuhi)', 1, "desain 3 bubble")
n = rep(n, '- 21.30 - Gelembung "lengkap!".', '- 21.30 - Gelembung "lima kelompok!".', 1, "tl 21.30")
NAS.write_text(n)
print("naskah revisi 4 ok; sisa lengkap/aman:", n.count("lengkap"), n.count("aman."))

# ---------- README ----------
r = RED.read_text()
r = rep(r, """14. Karakter utama adalah MENTOR PENJELAS INTERAKTIF, bukan pajangan dan bukan penghibur: setiap geraknya wajib menjawab konten (menoleh ke objek yang dibahas, mengangguk di simpulan, denyut konfirmasi di poin berurutan, reaksi fisik sesuai konteks seperti menggigil saat suhu minus), posisinya per bab mengikuti objek bahasan, dan lompatan seragam di beat acak dilarang; lompatan hanya untuk momen bernada (perayaan atau kejutan), maksimal satu-dua per video.""",
"""14. Karakter utama adalah MENTOR PENJELAS INTERAKTIF, bukan pajangan dan bukan penghibur: setiap geraknya wajib menjawab konten (menoleh ke objek yang dibahas, mengangguk di simpulan, denyut konfirmasi di poin berurutan, reaksi fisik sesuai konteks seperti menggigil saat suhu minus), posisinya per bab mengikuti objek bahasan, dan lompatan seragam di beat acak dilarang; lompatan hanya untuk momen bernada (perayaan atau kejutan), maksimal satu-dua per video.
15. Aksi karakter WAJIB memperagakan materi lewat tubuhnya, bukan reaksi generik: demo konsep dengan tubuh (menggigil saat suhu minus, memantul menghitung jumlah benda, tenggelam melewati garis nol saat bilangan negatif, berputar tanpa henti saat irasional/pi, terbelah-dua lalu menyatu saat pecahan dijumlahkan); setiap bubble ucapan wajib topik-spesifik dan berbeda antar video, dilarang menempel template ucapan generik.
16. Desain untuk MATA MINUS (mayoritas penonton menonton di layar kecil): teks kunci besar dan kontras tinggi (angka utama, label kelompok, subtitle, bubble), ukuran kecil hanya untuk teks sekunder; verifikasi keterbacaan pada frame terpadat sebelum terbit.""", 1, "aturan 15-16")
r = rep(r, "(revisi 3: bola emas jadi mentor interaktif - gestur menoleh/mengangguk/denyut/menggigil menjawab konten, posisi mengikuti objek bahasan, 12 lompatan template dihapus;",
"(revisi 4: aksi mentor memperagakan materi - menggigil/menghitung memantul/tenggelam di garis nol/berputar saat pi/terbelah-dua saat 1/2+1/2=1, bubble topik-spesifik dingin! lima kelompok! jadi 1!, teks kunci dinaikkan untuk mata minus; revisi 3: mentor interaktif, posisi mengikuti objek bahasan, 12 lompatan template dihapus;", 1, "baris 07")
RED.write_text(r)
print("README revisi 4 ok")
