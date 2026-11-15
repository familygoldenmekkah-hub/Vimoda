#!/usr/bin/env python3
"""Revisi 6 video 07: perbaikan arahan kreator.
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
n = rep(n, "# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Revisi 5, rombak total ala modeling)",
"# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Revisi 6)", 1, "judul")
n = rep(n, "## Rombak total revisi 5 (mandat kreator: benar-benar meniru modeling 60719beb, bukan sebatas aksi)",
"""## Revisi 6 (arahan kreator setelah menonton di HP)

1. TOKOH TIDAK DINAMAI: semua name tag di atas kepala dihapus (BABOPA dan kelima ubin); identitas kelompok cukup lewat panel ANGGOTA KELUARGA dan narasi. Label situasi properti (5 BUKU, -5 derajat, 1/2, LINGKARAN) dipertahankan karena menjeraskan konten.
2. TANPA GERAKAN GEPENG: squash/stretch dihapus total; skala bola selalu seragam. Demo pecahan kini membelah bola menjadi dua bola utuh seukuran (pizza 1/2 dan 1/2+1/2=1), bukan memipihkannya.
3. SUBTITLE NAIK dari zona deskripsi sosmed: portrait mulai y 1272 (bawah bar 1462, aman dari overlay TikTok), landscape y 830; lebar pil dibatasi 900/1400 dan teks maksimal dua baris.
4. ANTI TERTIMPA: blok digit dunia memudar saat panel konten naik (25.6); panel keluarga turun ke y 470 dengan jarak dari judul; tiap elemen konten pergi sebelum elemen berikutnya muncul, jadi penjelasan selalu terbaca tuntas.
5. BEAT NARASI DI-RE-TIME: durasi tiap beat proporsional panjang teks (13.5 karakter/detik, minimum 1.7 detik, dikalibrasi ke 52 detik) sehingga tidak ada penjelasan tertimpa lanjutannya; musik, whoosh antar bab, boom emas, tick demo, dan chime disinkronkan ke waktu baru.
6. MASTERPLAN GERAKAN: tabel waypoint per orientasi; bola menggelinding antar stasiun dengan rotasi fisik (jarak dibagi jari-jari), parkir sebelum bab berganti, lalu satu gestur bersih per beat (menghitung memantul, menggigil translasi, membelah dua, berputar mulus, tenggelam, melompat). Tidak ada gerakan improvisasi.

## Rombak total revisi 5 (mandat kreator: benar-benar meniru modeling 60719beb, bukan sebatas aksi)""", 1, "bagian rev6")
NAS.write_text(n)
print("naskah revisi 6 ok")

r = RED.read_text()
r = rep(r, """17. Patuhi MODELING sebagai acuan bentuk (video 07 direbuild dari 60719beb): dunia cerita layar penuh dengan tokoh bernama, subtitle raksasa di pil hitam, judul bab raksasa, panel gelap ala UI game, satu ide per layar, ruang kosong lega; layout lama berupa kartu kecil di atas panggung mini tidak boleh kembali.""",
"""17. Patuhi MODELING sebagai acuan bentuk (video 07 direbuild dari 60719beb): dunia cerita layar penuh, subtitle raksasa di pil hitam, judul bab raksasa, panel gelap ala UI game, satu ide per layar, ruang kosong lega; layout lama berupa kartu kecil di atas panggung mini tidak boleh kembali.
18. Standar tayang sosmed (revisi 6): subtitle di atas zona deskripsi aplikasi (portrait mulai y 1272, landscape y 830) dan maksimal dua baris; tanpa name tag pada tokoh; tanpa squash/stretch (skala seragam, demo pecahan dengan belah-dua bola utuh); elemen konten tidak boleh saling menimpa (dunia memudar saat panel naik); durasi subtitle proporsional panjang teks (13.5 karakter/detik, minimum 1.7 detik) agar penjelasan terbaca tuntas; gerakan tokoh mengikuti tabel waypoint (menggelinding fisik antar stasiun), bukan improvisasi.""", 1, "aturan 18")
r = rep(r, "(revisi 5: ROMBAK TOTAL ala modeling 60719beb - dunia pixel layar penuh (blok digit raksasa, rumput, papan kayu), tokoh bernama BABOPA + lima kelompok, subtitle 54 px pil hitam, judul bab 110 px, panel chat/leaderboard/persamaan/toko, satu ide per layar; revisi 4:",
"(revisi 6: tokoh tanpa name tag, tanpa gepeng (belah-dua bola utuh), subtitle naik di atas zona deskripsi + maksimal 2 baris, blok dunia memudar saat panel naik (anti tertimpa), beat narasi proporsional panjang teks, masterplan waypoint menggelinding antar stasiun; revisi 5: ROMBAK TOTAL ala modeling 60719beb - dunia pixel layar penuh, subtitle besar pil hitam, judul bab raksasa, panel chat/leaderboard/persamaan/toko, satu ide per layar; revisi 4:", 1, "baris 07")
RED.write_text(r)
print("README revisi 6 ok")
