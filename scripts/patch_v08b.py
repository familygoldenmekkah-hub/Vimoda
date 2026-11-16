#!/usr/bin/env python3
"""Video 08 revisi 2: aturan baru 26 (dunia unik per episode) dan 27
(anti-teks-terpotong) + pembaruan baris katalog 08 di README produksi."""
import pathlib

RED = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
r = RED.read_text()

anchor25_tail = "buang dan ganti dengan kalimat lembut."
rules2627 = anchor25_tail + """
26. Dunia unik per episode (revisi 2 video 08, permanen): DILARANG memakai ulang konsep latar episode sebelumnya - setiap episode wajib punya dunia/ilustrasi sendiri yang segar (contoh: video 07 Kota Bilangan kota, video 08 Rumah Bulina ruang bermain); ide dunia dirancang dan dicek kebarunya SEBELUM rendering dimulai, bukan diasumsikan dari engine lama.
27. Anti-teks-terpotong (revisi 2 video 08, permanen): setiap elemen teks (subjudul, judul bab, label, papan, catatan) wajib diuji pada kalimat TERPANJANG miliknya di KEDUA orientasi dengan zoom crop sebelum render; subjudul dijaga maksimal dua baris (font dan lebar pil disesuaikan, standar kini 40 px/880 px portrait dan 38 px/1360 px landscape); jika teks mendekati tepi pil atau terpotong, kecilkan font atau perlebar pil - jangan pernah mengirim render dengan teks terpotong."""
c = r.count(anchor25_tail)
if c != 1:
    raise SystemExit(f"anchor aturan 25 ditemukan {c}x")
r = r.replace(anchor25_tail, rules2627)

anchor08 = "`08-bulina-asli-cacah/` (aturan 1-25 dipakai sejak rendering pertama:"
new08 = "`08-bulina-asli-cacah/` (revisi 2: DUNIA DIROBAK TOTAL menjadi Rumah Bulina - ruang bermain dinding krem, lantai kayu, karpet teal, jendela senja, rak toples kelereng, balok 1 2 3, bunting, keranjang anyaman, sticky notes, chart kertas, papan kapur easel, lampu tidur, debu cahaya - karena dunia kota terasa sama dengan episode lain; subjudul 40/38 px dijaga maksimal dua baris sehingga tidak terpotong lagi; mentor dipindah ke depan karpet; aturan baru 26 dan 27 ditetapkan; aturan 1-25 dipakai sejak rendering pertama:"
c = r.count(anchor08)
if c != 1:
    raise SystemExit(f"anchor baris 08 ditemukan {c}x")
r = r.replace(anchor08, new08)

RED.write_text(r)
print("README aturan 26+27 + baris 08 revisi 2 ok")
