#!/usr/bin/env python3
"""Baris katalog episode 14 di README produksi (sisip setelah baris | 13 |)."""
import pathlib

R = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
lines = R.read_text().split("\n")
idx13 = [i for i, l in enumerate(lines) if l.startswith("| 13 |")]
assert len(idx13) == 1 and not any(l.startswith("| 14 |") for l in lines), "anchor 13 unik + 14 belum ada"
row14 = ("| 14 | Petak Tanam: Bilangan Prima dan Komposit | Blog Yuyanaka - artikel \"Peimoas\" (18 Nov 2026) | "
         "`14-prima-komposit/` (aturan 1-30 sejak rendering pertama: dunia baru Petak Tanam - rumah tanam dinding kaca sage berbingkai krem "
         "dengan rak pot terracotta tiga tingkat tersusun rapi, meja tanam kayu dengan baki semai berlabel SEMAI, tanda PETAK TANAM di dinding, "
         "lampu tumbuh dome hangat, lantai paving terakota dengan marka safety kuning; hook delapan pot tersusun jadi petak 2 x 4 (empat pot "
         "mendarat serong 2.1-2.8) versus tujuh pot yang cuma satu baris bertanda tanya, stempel DELAPAN BISA, TUJUH TIDAK; momen aha: angka 1 "
         "= satu faktor jadi bukan prima bukan komposit, angka 2 satu-satunya prima genap karena genap lebih dari 2 pasti habis dibagi 2, dan "
         "faktorisasi prima 12 = 2 x 2 x 3, 18 = 2 x 3 x 3, 30 = 2 x 3 x 5 dengan catatan hasil selalu unik dan basis teori bilangan; pedagogi "
         "pemula aturan 29 sejak hari pertama: bahasa tongkrongan, cek bahan 5 dan 7 tampil di catatan panel; papan tugas aturan 30 sejak hari "
         "pertama: empat soal tampil utuh bernomor (prima komposit atau bukan; kenapa 1 bukan prima; kenapa 2 genap tetap prima; uraikan 36 ke "
         "faktor prima), delapan kartu besar terurut 1, 2, 9, 13, 21, 29, 35, 49, pil JAWAB DI KOLOM KOMENTAR YA; narasi 16 beat dua bahasa "
         "maks 42 karakter; audio E minor dengan tick mendarat pot dan enam tick faktor 12; penutup bersih aturan 28: konten keluar 49.8, "
         "AKIOMIDA.COM sendirian 50.2, bar 50.9-51.4) |")
lines.insert(idx13[0] + 1, row14)
R.write_text("\n".join(lines))
print("README: baris katalog 14 ok")
