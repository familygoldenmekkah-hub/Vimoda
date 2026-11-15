#!/usr/bin/env python3
"""Revisi 5 video 07: ROMBAK TOTAL mengikuti modeling 60719beb.
naskah07.md + README.md."""
import pathlib

NAS = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/naskah07.md")
RED = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")

def rep(txt, old, new, n=1, tag=""):
    c = txt.count(old)
    if c != n:
        raise SystemExit(f"[{tag}] ditemukan {c}x (harus {n}x): {old[:70]!r}")
    print(f"[{tag}] ok")
    return txt.replace(old, new)

n = NAS.read_text()
n = rep(n, "# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Revisi 4)",
"# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Revisi 5, rombak total ala modeling)", 1, "judul")
n = rep(n, "## Desain (mewarisi standar video 06 revisi 5)",
"""## Rombak total revisi 5 (mandat kreator: benar-benar meniru modeling 60719beb, bukan sebatas aksi)

Video dibangun ulang meniru DNA modeling secara utuh. Struktur lama (kartu-kartu kecil di atas panggung mini) diganti dunia cerita pixel layar penuh.

1. DUNIA PIXEL LAYAR PENUH: langit malam biru tua berbintang, rumput hijau terang di atas tanah cokelat bergaris diagonal, papan kayu bersambung sebagai hiasan, dan barisan blok emas raksasa bertuliskan digit (1, 2, 3, 0, 5, 1/2, pi, -5 derajat, 7) mengisi dunia, ala game pixel pada modeling.
2. TEKS BESAR NYAMAN: subtitle Indonesia 54 px (portrait) di atas pil hitam, boleh dua baris, Inggris 26 px di bawahnya; judul bab raksasa 110 px emas atau putih dengan bayangan tebal (1, 2, 3 SAJA?, EMPAT SITUASI, LIMA KELOMPOK, KELUARGA BILANGAN, ATURAN SATU, PILIH SATU?); nama tokoh di atas kepala ala game.
3. TOKOH BERNAMA BERAKSI: bulatan emas diberi nama BABOPA; lima kelompok bilangan tampil sebagai tokoh ubin bernama (ASLI, CACAH, BULAT, RASIONAL, IRASIONAL) berdiri di rumput seperti para tokoh modeling.
4. PANEL GELAP ALA UI GAME: pesan chat "BABOPA: dingin! / lima kelompok! / jadi 1!" dengan kepala hijau; panel ANGGOTA KELUARGA bergaya leaderboard berisi lima baris yang muncul satu per satu; panel persamaan 1/2 + 1/2 = 1; panel toko CTA dengan AKIOMIDA.COM gradien dan pil emas TULIS DI KOMEN.
5. SATU IDE PER LAYAR: tiap bab hanya satu elemen konten besar; kartu teaser dan tokoh kelompok pergi saat bab berganti (dunia terus teredit seperti modeling); aksi mentor dari revisi 4 dipertahankan (menghitung memantul, tenggelam di garis nol, berputar saat pi, terbelah-dua saat 1/2+1/2=1).
6. Narasi 16 beat, caption, dan audio tidak berubah.

## Desain (mewarisi standar video 06 revisi 5)""", 1, "bagian rev5")
NAS.write_text(n)
print("naskah revisi 5 ok")

r = RED.read_text()
r = rep(r, """16. Desain untuk MATA MINUS (mayoritas penonton menonton di layar kecil): teks kunci besar dan kontras tinggi (angka utama, label kelompok, subtitle, bubble), ukuran kecil hanya untuk teks sekunder; verifikasi keterbacaan pada frame terpadat sebelum terbit.""",
"""16. Desain untuk MATA MINUS (mayoritas penonton menonton di layar kecil): teks kunci besar dan kontras tinggi (angka utama, label kelompok, subtitle, bubble), ukuran kecil hanya untuk teks sekunder; verifikasi keterbacaan pada frame terpadat sebelum terbit.
17. Patuhi MODELING sebagai acuan bentuk (video 07 direbuild dari 60719beb): dunia cerita layar penuh dengan tokoh bernama, subtitle raksasa di pil hitam, judul bab raksasa, panel gelap ala UI game, satu ide per layar, ruang kosong lega; layout lama berupa kartu kecil di atas panggung mini tidak boleh kembali.""", 1, "aturan 17")
r = rep(r, "(revisi 4: aksi mentor memperagakan materi - menggigil/menghitung memantul/tenggelam di garis nol/berputar saat pi/terbelah-dua saat 1/2+1/2=1, bubble topik-spesifik dingin! lima kelompok! jadi 1!, teks kunci dinaikkan untuk mata minus;",
"(revisi 5: ROMBAK TOTAL ala modeling 60719beb - dunia pixel layar penuh (blok digit raksasa, rumput, papan kayu), tokoh bernama BABOPA + lima kelompok, subtitle 54 px pil hitam, judul bab 110 px, panel chat/leaderboard/persamaan/toko, satu ide per layar; revisi 4: aksi mentor memperagakan materi, bubble topik-spesifik, teks besar;", 1, "baris 07")
RED.write_text(r)
print("README revisi 5 ok")
