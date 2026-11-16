#!/usr/bin/env python3
"""Video 08 revisi 3: judul rata tengah + penutup bersih (aturan 28)."""
import pathlib

# --- naskah08.md ---
N = pathlib.Path("/home/z/my-project/scripts/vimoda08/package/naskah08.md")
s = N.read_text()

anchor = "3. TATA LETAK: mentor kini berada di depan karpet"
i = s.index(anchor)
j = s.index("\n\n## Struktur enam bab", i)
rev3 = """
## Revisi 3 (mandat kreator: jangan ada elemen yang saling balapan; kenyamanan penonton di atas patokan waktu)

1. JUDUL BAB RATA TENGAH: sebelumnya "BILANGAN ASLI" dst. rata kiri sehingga huruf pertama tampak terpotong di tepi layar. Kini semua judul bab di tengah layar.
2. PENUTUP BERSIH (aturan 28): sebelumnya AKIOMIDA.COM menyala DI DALAM papan latihan pada 45.8 sementara soal, kelereng, tanda tanya, dan pil masih tampil - semuanya balapan dalam satu layar. Kini papan latihan (soal, pil) dan tanda tanya keluar layar di 49.8; layar diam sejenak; AKIOMIDA.COM muncul SENDIRIAN di 50.2 sebagai endcard di ruangan senja yang tenang, bar gradien menyapu 50.9-51.4, fade 51.4.
3. Audio reveal (chime AKIOMIDA.COM dan whoosh) digeser dari 45.8 ke 50.2-50.35 agar mengiringi endcard, bukan papan soal."""
s = s[:j] + rev3 + s[j:]

old_row5 = "| 5 Latihan | 40.2-52.0 | LATIHAN KELERENG | Poster latihan di dinding: 8 KELERENG, SEMUA DIBERIKAN.; delapan kelereng warna muncul di lantai 44.25 lalu meluncur keluar satu per satu 45.55-47.0; tanda tanya emas besar (47.3); AKIOMIDA.COM reveal 45.8, bar gradien 48.6, pil TULIS DI KOMEN 47.5; senja di jendela, lampu tidur dan debu cahaya menyala |"
new_row5 = "| 5 Latihan | 40.2-52.0 | LATIHAN KELERENG | Papan latihan di dinding: 8 KELERENG, SEMUA DIBERIKAN.; delapan kelereng warna muncul di lantai 44.25 lalu meluncur keluar satu per satu 45.55-47.0; tanda tanya emas besar (47.3); pil TULIS DI KOMEN 47.5; seluruh papan dan tanda tanya keluar layar 49.8; AKIOMIDA.COM muncul SENDIRIAN 50.2 (endcard, aturan 28), bar gradien 50.9-51.4; senja di jendela, lampu tidur dan debu cahaya menyala |"
assert s.count(old_row5) == 1
s = s.replace(old_row5, new_row5)

old_cta = "- CTA: poster latihan di zona tengah dinding dengan selotip sudut; AKIOMIDA.COM hanya menyala di akhir dengan reveal lambat; bar gradien menyapu; pil ajakan TULIS DI KOMEN."
new_cta = "- CTA dua fase (aturan 28): papan latihan (soal + pil TULIS DI KOMEN) berdiri sendiri sampai tuntas lalu keluar di 49.8; AKIOMIDA.COM muncul sendirian sebagai endcard 50.2 tanpa satu pun elemen lain yang balapan; bar gradien menyapu 50.9-51.4."
assert s.count(old_cta) == 1
s = s.replace(old_cta, new_cta)
N.write_text(s)
print("naskah08 revisi 3 ok")

# --- README ---
R = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
r = R.read_text()
a27 = "jangan pernah mengirim render dengan teks terpotong."
rule28 = a27 + """
28. Penutup bersih (revisi 3 video 08, permanen): konten (soal/latihan/materi) wajib SELESAI dan keluar layar dulu; branding/URL/CTA akhir muncul SENDIRIAN sesudahnya di layar yang tenang - tidak boleh satu layar berisi konten dan penutup bersamaan; judul bab selalu rata tengah (jangan rata kiri yang tampak terpotong)."""
assert r.count(a27) == 1
r = r.replace(a27, rule28)

a08 = "`08-bulina-asli-cacah/` (revisi 2:"
new08 = "`08-bulina-asli-cacah/` (revisi 3: judul bab dirata tengah karena semula tampak terpotong di tepi kiri; penutup dipisah total - papan latihan keluar 49.8 lalu AKIOMIDA.COM muncul sendirian 50.2 sebagai endcard, audio reveal ikut digeser; aturan baru 28 penutup bersih ditetapkan; revisi 2:"
assert r.count(a08) == 1
r = r.replace(a08, new08)
R.write_text(r)
print("README aturan 28 + baris 08 revisi 3 ok")
