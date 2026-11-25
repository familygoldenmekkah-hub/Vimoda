#!/usr/bin/env python3
"""Patch README master katalog: sisipkan baris tabel VIDEO 16 setelah baris
video 15 (REVISI 11). Baris v16 memakai format kolom tabel yang sama."""
from pathlib import Path

P = Path("/home/z/my-project/scripts/vimoda07/package/README.md")
src = P.read_text()

TAIL15 = "naskah15.md rev11 dan caption rev11 diperbarui, render 2 orientasi 106 s + QA penuh + commit GitHub) |"
ROW16 = ('\n| 16 | Misteri Kardus Dobel RP: Bilangan Berpangkat | Blog Yuyanaka - '
 'artikel "Pikosa" (23 Nov 2026) | `16-bilangan-berpangkat/` (VIDEO BARU lanjutan '
 'seri, format RP terkunci dari video 15 rev9-11 dipenuhi penuh: tanpa indikator '
 'pengetikan, 20 pesan jeda 3.0-6.3 s, dialog 60px, dialog manusiawi tanpa kalimat '
 'tema dan tanpa label di ucapan, alur rantai sebab-akibat tertutup - kejadian '
 'berulang kardus dobel 1, 2, 4, 8, 16 dengan kertas 2^1 sampai 2^4, anomali 2^0 '
 'hari ini, prediksi KAMU 2^5 = 32, balasan grup 32 kardus ikut pola, jawaban besok '
 'dobel 64 plus SATU kotak kue catatan 2^0, reveal pemilik kios sebelah yang sepi: '
 'tebak-tebakan adalah ajakan kenalan, undangan mampir bawa kopi; rantai tanya-jawab '
 'benar, tanpa kehadiran mustahil, tanpa pembelaan tak diminta; 3 diagram menyala: '
 'BILANGAN BERPANGKAT (perkalian berulang ditulis singkat, basis dan pangkat), '
 'PANGKAT VS PERKALIAN (2^3 = 8 bukan 2×3; makna lebih penting dari hafal bentuk), '
 'PANGKAT NOL (tangga bagi dua 8-4-2-1); papan ??? 4 soal dari uji pemahaman blog: '
 'HITUNG 3^4, HITUNG 5^3, HITUNG 7^0, HITUNG 2^-3 + 8 kartu bantu 81, 125, 1, 64, '
 '8, 27, 15, 12 (pengecoh 64 = 4^3/2^6, 8 = 2^3, 27 = 3^3); teaser 2^-1 setengah '
 'untuk episode pangkat negatif dan pecahan; kontinuitas: membuka teaser dua lampu '
 'video 15 sebagai adegan pembuka (lampu ikut hadir di foto pertama, misteri kardus '
 'menjadi tulang punggung); WATERMARK AKIOMIDA dinaikkan 2x jarak awal dari bawah '
 'atas permintaan pemilik: portrait wmY 1800 menjadi 1560 dan landscape 1010 menjadi '
 '870 (jarak dari bawah kini 3x awal); 3 SVG dunia baru (kios sebelah: dua lampu '
 'berkedip + lima tumpukan kardus + kertas diclingkung merah; papan gabus lima '
 'kertas catatan dengan 2^0 diclingkung merah; kejutan pagi: 64 kardus + kotak kue '
 'berpita 2^0 = 1 SATU KUE), superskrip digambar tspan bukan karakter unicode; '
 'subtitle EN 26 beat baru; QA16 46 anchor wajib + daftar terlarang penuh + '
 'fontcheck >= 24px termasuk teks SVG; audio pop per peran, MA 56-57 hening, '
 'F MAJOR 75.3; naskah16.md dan caption16.txt baru, render 2 orientasi 106 s + '
 'QA penuh + commit GitHub) |')

n = src.count(TAIL15)
assert n == 1, f"anchor akhir baris v15 ditemukan {n}x, harus 1x"
i = src.find(TAIL15) + len(TAIL15)
assert src[i] == "\n", "baris v15 tidak diakhiri newline"
assert "| 16 |" not in src, "baris video 16 sudah ada"
P.write_text(src[:i] + ROW16 + src[i:])
print("README katalog: baris VIDEO 16 disisipkan OK")
