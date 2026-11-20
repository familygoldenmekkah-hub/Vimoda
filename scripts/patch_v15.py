#!/usr/bin/env python3
"""Tambah baris katalog 15 (Kios Permen: Faktor dan Kelipatan) ke README katalog."""
import pathlib

R = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
r = R.read_text()

row14 = "| 14 | Petak Tanam: Bilangan Prima dan Komposit |"
lines = r.split("\n")
idx = None
for i, ln in enumerate(lines):
    if ln.startswith(row14):
        idx = i
        break
assert idx is not None, "baris 14 tidak ditemukan"

row15 = (
    "| 15 | Kios Permen: Faktor dan Kelipatan | Blog Yuyanaka - artikel \"Kapoka\" (19 Nov 2026) | "
    "`15-faktor-kelipatan/` (aturan 1-34 sejak rendering pertama: dunia baru KIOS PERMEN - kios permen pesta malam "
    "dengan dinding krem pink bergaris halus, awning scallop merah-krem, dua lampion kertas bulat yang berayun dan "
    "makin terang menjelang penutup, rak kayu berisi stoples kaca permen warna-warni sebagai ikon dunia, meja kios "
    "dengan etalase kaca, tanda KIOS PERMEN, lantai papan kayu dan karpet festival merah-krem di jalur mentor; "
    "hook dua belas permen masuk tiga stoples rata 4-4-4 versus permen ke-13 yang dihop-ditolak jadi SISA dengan "
    "stempel DUA BELAS RATA, TIGA BELAS SISA! (pertanyaan bahan kenapa 12 bisa dibagi habis oleh 3 tapi 13 tidak "
    "diangkat persis); definisi faktor bahan utuh (12 ÷ 1, 2, 3, 4, 6, 12; cek gagal 12 ÷ 5 = 2 sisa 2; nod episode "
    "prima: 13 bandel cuma punya faktor 1 dan 13), definisi kelipatan bahan utuh (4 × 1, 2, 3, 4, 5; deret 4, 8, 12, "
    "16, 20 dengan hujan permen +4 ke stoples besar tersinkron chip per detik; 12 masuk karena 4 × 3 = 12); dramaturgi "
    "anime aturan 34 dilanjutkan: jeda ma 33.4-34.2 (panel kosong, musik hening total, mentor ke tengah) sebelum "
    "TWIST TERBATAS VS TANPA BATAS dari contoh 6 bahan (faktor 6: 1, 2, 3, 6 vs kelipatan 6: 6, 12, 18, 24, 30, ...) "
    "dengan speedlines + spotlight sekali per video, hop mentor kaget, panel kaitan SATU KALI, DUA PERAN (4 × 3 = 12: "
    "4 dan 3 faktor 12, 12 kelipatan keduanya; latihan cek 6 × 5 = 30), jurus bernama stempel JURUS BAGI RATA! untuk "
    "aplikasi 24 permen dibagi rata dari bahan (2 dapat 12, 3 dapat 8, 4 dapat 6, 6 dapat 4) dengan piring 24 permen "
    "tersusun ulang hidup 2, 3, 4, 6 porsi dan power-up inti bola 51.4-53.6 plus run tangga F major, papan uji "
    "TANTANGAN UNTUKMU dengan empat soal utuh bernomor (faktor 20; lima kelipatan pertama 7; kenapa 5 bukan faktor "
    "12; mana yang tak terbatas) dan delapan kartu formasi kiri-kanan berselang 59.8-60.7 (1, 2, 3, 4, 5, 8, 10, 20: "
    "semua kandidat faktor 20 plus pengecoh 3 dan 8) plus pil JAWAB DI KOLOM KOMENTAR YA; KEPUTUSAN PRODUKSI: bahan "
    "enam bagian terlalu padat untuk satu episode, maka faktor persekutuan, FPB, kelipatan persekutuan, KPK, dan "
    "aplikasi dua lampu berkedip 3 detik dan 4 detik (bagian 4-5 bahan) disiapkan menjadi episode 16 dengan dunia "
    "sendiri dan diblokir QA agar tidak bocor di video 15 (lingkup episode ketat), soal 1 dan 2 bahan dipakai utuh, "
    "soal 3-5 pindah ke episode 16, pertanyaan reflektif bahan diadukan di caption; aturan 32 rev3: CTA bahan yang "
    "meminta ikut sengaja tidak disalin, penutup memakai teaser tersisip varian dunia-umum \"Kisah angka berikutnya "
    "sudah menunggu.\" 73.4 bersama endcard 68.2; audio F MAJOR ceria khas kios pesta (pad F, Dm, Bb, C dengan gap "
    "hening saat ma, tremolo pra-climax 31.6-33.28, impact boom 34.2, run power-up 51.4-52.3, kick formasi 59.6, "
    "fanfare F-A-C-F 68.3); durasi 78 s (aturan 31), narasi 23 beat tiap sub 2,7-5,6 detik jeda minimal 2,7 s "
    "tervalidasi, QA lolos penuh: 2340 frame kedua orientasi tidak kosong, durasi 78.0 s, lingkup konten dan teks "
    "bersih) |"
)
lines.insert(idx + 1, row15)
R.write_text("\n".join(lines))
print("README: baris katalog 15 ditambahkan")
