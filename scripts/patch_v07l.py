#!/usr/bin/env python3
"""Revisi 18 video 07: watermark turun di bawah pil subjudul, kalimat
intimidasi dibuang (soft selling). naskah07.md + README.md."""
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
n = rep(n, "# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Revisi 17)",
"# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Revisi 18)", 1, "judul")
n = rep(n, "## Revisi 17 (mandat kreator:",
"""## Revisi 18 (mandat kreator: watermark masih menutupi - turunkan; kalimat intimidasi dibuang)

1. WATERMARK TURUN: pil AKIOMIDA di y 1345 menimpa ujung bawah pil subjudul yang bisa menjulang hingga ~1380 saat subjudul dua baris. Kini watermark di y 1460 (portrait) / 950 (landscape) - jelas di bawah subjudul, tetap di atas zona UI bawah sosmed.
2. KALIMAT INTIMIDASI DIBUANG: penutup "Jangan cuma menebak." terasa menyerang penonton, bukan soft selling. Diganti penutup hangat "Terima kasih sudah menonton." (emas). Pelajaran permanen (aturan no. 25): tidak ada kalimat menyuruh negatif/menyerang ("jangan..."), semua copy selalu ajakan lembut dan ramah.
3. Selebihnya sama dengan Revisi 17: bola mentor bulat sejati tanpa mata sebagai satu-satunya karakter, ubin kelompok + panel keluarga, zona aman subjudul.

## Revisi 17 (mandat kreator:""", 1, "revisi18")
n = rep(n, '50.4: "Jangan cuma menebak."', '50.4: "Terima kasih sudah menonton." (emas)', 1, "detik50")
NAS.write_text(n)
print("naskah revisi 18 ok")

r = RED.read_text()
r = rep(r, """24. Zona aman sosmed (revisi 17): subjudul maksimal sekitar 61% tinggi layar (portrait 1170/1920, landscape 740/1080), lebar pil subjudul menjauh dari tepi (maks 760 px portrait, 1300 px landscape), watermark AKIOMIDA sekitar 70% tinggi (1345/920) bukan di dasar layar, papan CTA di zona tengah - semuanya agar tidak tertutup caption, tombol, dan UI aplikasi sosmed.""",
"""24. Zona aman sosmed (revisi 17-18): subjudul maksimal sekitar 61% tinggi layar (portrait 1170/1920, landscape 740/1080), lebar pil subjudul menjauh dari tepi (maks 760 px portrait, 1300 px landscape), watermark AKIOMIDA di bawah pil subjudul dengan jarak bebas (1460/950) dan tetap di atas zona UI bawah sosmed, papan CTA di zona tengah - semuanya agar tidak saling menutup dan tidak tertutup caption, tombol, dan UI aplikasi sosmed.
25. Soft selling wajib (revisi 18, permanen): DILARANG kalimat intimidasi, menyuruh negatif, atau menyerang penonton (contoh pelanggaran: "Jangan cuma menebak.") - semua copy selalu berupa ajakan hangat, santun, dan positif (contoh penutup: "Terima kasih sudah menonton."); uji setiap kalimat: kalau terasa seperti perintah kasar atau merendahkan, buang dan ganti dengan kalimat lembut.""", 1, "aturan 24-25")
r = rep(r, "(revisi 17: bola mentor bulat sejati tanpa mata (bug kotak-mata-lepas diperbaiki), lima teman bola dihapus karena tidak berguna - kelompok tampil sebagai ubin papan toko dan keluarga sebagai panel daftar; semua label naik ke zona aman sosmed (subjudul 1170/740, watermark 1345/920);",
"(revisi 18: watermark turun ke 1460/950 agar tidak menimpa pil subjudul, kalimat intimidasi \"Jangan cuma menebak.\" dibuang menjadi penutup lembut \"Terima kasih sudah menonton.\" - soft selling wajib; revisi 17: bola mentor bulat sejati tanpa mata (bug kotak-mata-lepas diperbaiki), lima teman bola dihapus karena tidak berguna - kelompok tampil sebagai ubin papan toko dan keluarga sebagai panel daftar; label di zona aman sosmed (subjudul 1170/740);", 1, "baris 07")
RED.write_text(r)
print("README revisi 18 ok")
