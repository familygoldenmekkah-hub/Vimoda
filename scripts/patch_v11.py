#!/usr/bin/env python3
"""Tambah baris katalog episode 11 ke README produksi."""
import pathlib

R = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
r = R.read_text()

anchor = "## Isi tiap folder video"
row = """| 11 | Buhbus: Mengenal Bilangan Irasional | Blog Yuyanaka - artikel "Buhbus" (16 Nov 2026) | `11-buhbus-irasional/` (aturan 1-28 sejak rendering pertama: dunia baru Rumah Peta Kartika - ruang kartografi vintage dengan kertas peta krem bergrid tinta biru, meja mahoni dan peta terbuka bersegel lilin, pita angka pi yang digitnya muncul satu per satu lalu ditutup titik titik, kompas kuningan raksasa, lampu gantung hijau, lantai papan kayu bermarpet marun, rak kartu katalog; materi: definisi irasional bukan a/b dengan contoh √2 √3 √5 π, kartu akar dibalik √4=2 √9=3 √16=4 bulat lalu √2=1,41421356... irasional, twist √25=5 dan √36=6 rasional vs √7 irasional dengan pesan lihat hasilnya bukan tandanya, kompas keliling K = 2 × π × r dan tanda ≈ sebagai pendekatan, tabel dua keluarga rasional vs irasional yang sama-sama bagian bilangan real, uji enam kartu katalog √49 √3 0,5555... π ⅝ √100 dibalik tanpa membocorkan kelompok dengan tag pengingat akar tidak selalu irasional; jawaban uji tidak dibocorkan, dijemput lewat pil KELOMPOKKAN DI KOMEN; bbox diaudit terprogram; penutup bersih aturan 28: konten keluar 49.8, AKIOMIDA.COM sendirian 50.2, bar 50.9-51.4) |

"""
assert r.count(anchor) == 1
r = r.replace(anchor, row + anchor)
R.write_text(r)
print("README baris 11 ok")
