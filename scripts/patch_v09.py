#!/usr/bin/env python3
"""Tambah baris katalog episode 09 ke README produksi."""
import pathlib

R = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
r = R.read_text()

anchor = "## Isi tiap folder video"
row = """| 09 | Huyuan: Mengenal Bilangan Bulat | Blog Yuyanaka - artikel "Huyuan" (15 Nov 2026) | `09-huyuan-bulat/` (aturan 1-28 dipakai sejak rendering pertama: dunia baru Menara Livo - potongan menara lift kaca bersalju dengan shaft tembus basement plak +3 sampai -3, termometer raksasa yang raksa turun 4 ke -5, garis bilangan besar di kener dinding, garis acuan 0 putus-putus, langit siang ke malam bersalju dengan siluet kota berjendela nyala; satu bola emas mentor tanpa mata yang menggigil saat minus dan ikut turun bersama lift pada uji pemahaman; materi: definisi tiga kelompok via panel, suhu 4 - 9 = -5, gedung bawah tanah, perbandingan -2 vs -5 di garis bilangan dengan rantai -5 < -2 < 0 < 2 < 5, cek anggota centang-silang 8/-12/0 vs 1/2/-3/4/2,5, uji lift 2 - 5 = ? yang berhenti di -3; subjudul 40/38 px pil 880/1360 dijaga dua baris pada kalimat terpanjang 57 karakter; bbox elemen kunci diaudit terprogram (audit09.py) tanpa tumpang tindih; penutup bersih aturan 28: seluruh konten dan properti bab keluar 49.8, AKIOMIDA.COM sendirian 50.2, bar 50.9-51.4; judul bab rata tengah) |

"""
assert r.count(anchor) == 1
r = r.replace(anchor, row + anchor)
R.write_text(r)
print("README baris 09 ok")
