#!/usr/bin/env python3
"""Video 08: tambah baris katalog 08 + amandemen aturan 24 (watermark tepi
paling bawah mulai video 08) di README produksi."""
import pathlib

RED = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
r = RED.read_text()

anchor07 = "CTA pilihan jawaban) |"
row08 = """CTA pilihan jawaban) |
| 08 | Bulina: Bilangan Asli & Bilangan Cacah | Blog Yuyanaka - artikel "Bulina" (16 Nov 2026) | `08-bulina-asli-cacah/` (aturan 1-25 dipakai sejak rendering pertama: satu bola emas bulat sejati tanpa mata, soft selling penuh dengan penutup "Terima kasih sudah menonton.", subjudul zona aman 1170/740, watermark AKIOMIDA di tepi paling bawah 1800/1010 tanpa menutupi konten; materi: asli mulai dari 1 lewat kedai 3 buku/5 siswa/12 apel/tanpa batas, keranjang kosong 0 APEL plus 0 PESAN BARU dan 0 PESERTA, panel ASLI vs CACAH dua baris dengan catatan berganti, papan 10 = 1 puluhan + 0 satuan, latihan 8 kelereng meluncur keluar dan tanda tanya emas; CTA pil TULIS DI KOMEN, AKIOMIDA.COM reveal tenang 45.8) |"""
c = r.count(anchor07)
if c != 1:
    raise SystemExit(f"anchor baris 07 ditemukan {c}x")
r = r.replace(anchor07, row08)

anchor24 = "papan CTA di zona tengah - semuanya agar tidak saling menutup dan tidak tertutup caption, tombol, dan UI aplikasi sosmed."
add24 = anchor24 + " Amandemen video 08: watermark boleh berada di tepi paling bawah layar (portrait 1800, landscape 1010) sepanjang tidak menutupi konten apa pun - subjudul tetap di zona aman."
c = r.count(anchor24)
if c != 1:
    raise SystemExit(f"anchor aturan 24 ditemukan {c}x")
r = r.replace(anchor24, add24)

RED.write_text(r)
print("README baris 08 + amandemen aturan 24 ok")
