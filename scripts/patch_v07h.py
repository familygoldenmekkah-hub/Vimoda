#!/usr/bin/env python3
"""Revisi 15 video 07: karakter tanpa nama apa pun, ritme tenang,
AKIOMIDA.COM hanya muncul di akhir dengan reveal lambat.
naskah07.md + README.md."""
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
n = rep(n, "# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Revisi 6)",
"# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Revisi 15)", 1, "judul")
n = rep(n, "## Revisi 6 (arahan kreator setelah menonton di HP)",
"""## Revisi 15 (arahan kreator: masih ada label nama; teks dan animasi saling balapan; AKIOMIDA.COM terlalu cepat)

1. KARAKTER TANPA NAMA APA PUN: sisa label nama dihapus total, termasuk nama "Akiomida" pada karakter; Akiomida adalah nama studio/situs (AKIOMIDA.COM), bukan nama si bola emas. Header panel pesan yang menyebut nama tokoh dihapus (bubble pesan kini hanya berisi isi pesan), dan watermark nama di sudut bawah yang menempel sepanjang video dihapus.
2. RITME TENANG, TEKS DAN ANIMASI SEIRAMA: overshoot pop semua elemen dipangkas (maksimal 10 persen, umumnya 6-8), durasi masuk diperpanjang (0.55-0.8 detik), goyangan ambient (blok digit, bola, percikan) diperkecil, guncangan kamera dipangkas dari 6 piksel ke 2.5 piksel, kilat dari 14 persen ke 7 persen, pop subtitle dari 5 persen ke 1.8 persen, wobble tanda tanya dihapus. Tidak ada lagi elemen yang berebut perhatian saat penjelasan dibaca; satu ide muncul, duduk tenang, dibaca tuntas.
3. AKIOMIDA.COM HANYA DI AKHIR: panel toko muncul 40.9 hanya dengan pertanyaan; situs menyala perlahan 45.8-47.2 (fade 1.4 detik + naik 14 piksel, tanpa pop), pil TULIS DI KOMEN 47.5, bar gradien menyapu 48.6-50.4. Cue audio mengiringi (chime lembut 45.8, whoosh bar 48.6).

## Revisi 6 (arahan kreator setelah menonton di HP)""", 1, "bagian rev15")
NAS.write_text(n)
print("naskah revisi 15 ok")

r = RED.read_text()
r = rep(r, """18. Standar tayang sosmed (revisi 6): subtitle di atas zona deskripsi aplikasi (portrait mulai y 1272, landscape y 830) dan maksimal dua baris; tanpa name tag pada tokoh; tanpa squash/stretch (skala seragam, demo pecahan dengan belah-dua bola utuh); elemen konten tidak boleh saling menimpa (dunia memudar saat panel naik); durasi subtitle proporsional panjang teks (13.5 karakter/detik, minimum 1.7 detik) agar penjelasan terbaca tuntas; gerakan tokoh mengikuti tabel waypoint (menggelinding fisik antar stasiun), bukan improvisasi.""",
"""18. Standar tayang sosmed (revisi 6): subtitle di atas zona deskripsi aplikasi (portrait mulai y 1272, landscape y 830) dan maksimal dua baris; tanpa name tag pada tokoh; tanpa squash/stretch (skala seragam, demo pecahan dengan belah-dua bola utuh); elemen konten tidak boleh saling menimpa (dunia memudar saat panel naik); durasi subtitle proporsional panjang teks (13.5 karakter/detik, minimum 1.7 detik) agar penjelasan terbaca tuntas; gerakan tokoh mengikuti tabel waypoint (menggelinding fisik antar stasiun), bukan improvisasi.
19. Identitas dan ritme (revisi 15): karakter TIDAK BOLEH diberi nama apa pun di layar, termasuk nama studio (Akiomida bukan nama tokoh) - tidak ada header nama pada panel pesan dan tidak ada watermark sepanjang video; AKIOMIDA.COM hanya muncul satu kali di akhir video dengan reveal tenang (fade sekitar 1.4 detik, tanpa pop cepat); ritme tayang harus seirama dengan teks: overshoot pop maksimal 10 persen, durasi masuk 0.55-0.8 detik, tanpa goyangan ambient besar dan tanpa guncangan kamera keras saat penjelasan dibaca, agar penonton menyerap ilmunya, bukan menonton elemen saling balapan.""", 1, "aturan 19")
r = rep(r, "(revisi 6: tokoh tanpa name tag, tanpa gepeng (belah-dua bola utuh), subtitle naik di atas zona deskripsi + maksimal 2 baris, blok dunia memudar saat panel naik (anti tertimpa), beat narasi proporsional panjang teks, masterplan waypoint menggelinding antar stasiun;",
"(revisi 15: karakter tanpa nama apa pun (header chat dan watermark dihapus), ritme tenang anti balapan (pop/guncangan dipangkas), AKIOMIDA.COM hanya muncul di akhir dengan reveal lambat; revisi 6: tokoh tanpa name tag, tanpa gepeng (belah-dua bola utuh), subtitle naik di atas zona deskripsi + maksimal 2 baris, blok dunia memudar saat panel naik (anti tertimpa), beat narasi proporsional panjang teks, masterplan waypoint menggelinding antar stasiun;", 1, "baris 07")
RED.write_text(r)
print("README revisi 15 ok")
