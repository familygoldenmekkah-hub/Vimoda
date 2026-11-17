#!/usr/bin/env python3
"""Tambah baris katalog episode 12 ke README produksi."""
import pathlib

R = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
r = R.read_text()

anchor = "## Isi tiap folder video"
row = """| 12 | Realino: Mengenal Bilangan Real | Blog Yuyanaka - artikel "Realino" (Nov 2026) | `12-realino/` (aturan 1-28 sejak rendering pertama: dunia baru Bengkel Tapali - workshop pengukur kayu maple terang dengan penggaris raksasa di dinding sebagai garis bilangan yang disapu sorotan emas, meja kerja berproyek papan berlabel ukur 1,25 m dan 7,8 m, pegboard perforasi dengan gergaji palu jangka sorong, lampu dome putih, lantai beton hangat bermarka safety kuning; materi: hook enam chip bilangan 5 -3 1/2 0,75 akar2 pi yang menyala serentak dengan stempel SEMUA BILANGAN REAL, definisi real mencakup rasional dan irasional dengan tujuh chip contoh 8 -12 0 3/4 2,5 akar3 pi, dua kolom kelompok rasional-irasional berchip yang tidak saling tumpang tindih dengan garis pembatas menyala sebagai verdict, garis bilangan mini dengan enam titik berlabel -2 0 3 1/2 akar2 pi dan pesan nilai tetap bisa ditentukan, empat nilai pengukuran kontinu 1,25 m -2,5 C 7,8 km luas lingkaran pi, uji enam kartu anotasi -8 3/5 akar7 0 pi 4,25 di garis bilangan mini dengan garis penghubung dan empat pertanyaan tanpa bocor dengan pil JAWAB KEEMPATNYA; jawaban uji tidak dibocorkan; bbox diaudit terprogram; penutup bersih aturan 28: konten keluar 49.8, AKIOMIDA.COM sendirian 50.2, bar 50.9-51.4) |

"""
assert r.count(anchor) == 1
r = r.replace(anchor, row + anchor)
R.write_text(r)
print("README baris 12 ok")
