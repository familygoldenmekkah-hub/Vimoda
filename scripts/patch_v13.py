#!/usr/bin/env python3
"""Baris katalog episode 13 di README produksi."""
import pathlib

R = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
r = R.read_text()

anchor = "cue audio soal dan kartu di-align ulang) |"
assert r.count(anchor) == 1 and "| 13 |" not in r
row13 = ("\n| 13 | Papasan: Bilangan Genap dan Ganjil | Blog Yuyanaka - artikel \"Ganap\" (17 Nov 2026) | "
         "`13-papasan-genap-ganjil/` (aturan 1-30 sejak rendering pertama: dunia baru Gudang Papasan - gudang sepatu dinding crate teal "
         "dengan rak pasangan tiga tingkat di dinding (dua rak penuh pasangan, satu rak ada sepatu nanggung), bangku sortir dengan shoebox "
         "berlid dan label PAPASAN, tanda PAPASAN di dinding, lampu dome industri, lantai beton sejuk dengan marka safety kuning; "
         "hook delapan sepatu berpasangan rapi versus tujuh sepatu yang menyisakan satu nanggung bertanda tanya; momen aha: 0 dibagi 2 = 0 "
         "tanpa sisa jadi 0 termasuk genap, akhiran 0 2 4 6 8 dan 1 3 5 7 9 sebagai jalan cepat dengan empat chip 124, 357, 1.000, 2.025 "
         "berangka akhir disorot, dan pola ganjil+ganjil=genap dengan alasan ganjil = 2×bulat+1; pedagogi pemula aturan 29 sejak hari pertama: "
         "bahasa tongkrongan, hitung bahan tampil di catatan panel; papan tugas aturan 30 sejak hari pertama: empat soal tampil utuh bernomor "
         "(mana genap-ganjil; kenapa 0 genap; ganjil+ganjil selalu genap; bagaimana dengan negatif), enam kartu besar terurut -13, 0, 17, 248, 999, 1.024, "
         "pil KIRIM JAWABANMU DI KOMENTAR YA; narasi 16 beat dua bahasa maks 46 karakter; audio D minor dengan snap pasangan 2.15 dan tick hitung bahan; "
         "penutup bersih aturan 28: konten keluar 49.8, AKIOMIDA.COM sendirian 50.2, bar 50.9-51.4) |")
r = r.replace(anchor, anchor + row13)
R.write_text(r)
print("README: baris katalog 13 ok")
