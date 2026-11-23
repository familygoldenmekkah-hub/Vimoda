#!/usr/bin/env python3
"""Patch README master baris video 15: sisipkan REVISI 11 setelah teks rev10.
Anchor unik: akhir teks REVISI 10 pada baris katalog."""
from pathlib import Path

P = Path("/home/z/my-project/scripts/vimoda07/package/README.md")
src = P.read_text()

ANCHOR = "naskah15.md rev10 dan caption rev10 diperbarui, render 2 orientasi 106 s + QA penuh + commit GitHub) |"
ADD = (" REVISI 11 - ALUR DIBANGUN ULANG ATAS LAPORAN PEMILIK (ALUR CACAT: "
       "pertanyaan dijawab karakter yang salah, kehadiran fisik mustahil dan tak "
       "dijelaskan - orang tiba-tiba dari balik lampu padahal toko ditutup tanpa "
       "penjelasan bagaimana masuk, pengakuan pembelaan gak nyolong tanpa ada yang "
       "menuduh, banyak loncat adegan; kesimpulan pemilik: cerita rusak, abstrak "
       "fallacy): (1) HUKUM ALUR RANTAI SEBAB-AKIBAT TERTUTUP: QA memasukkan balik "
       "lampu dan nyolong ke DAFTAR TERLARANG engine; (2) STRUKTUR DETEKTIF 5 LANGKAH: "
       "kejadian berulang ke-5 (foto KEJADIAN KE-5, kartu PAGI INI 06.50, gak ada yang "
       "ilang mematikan tuduhan sejak awal sehingga tak pernah ada pembelaan tak "
       "diminta), bukti fisik masuk akal (lapak depan rumah tertutup kain - dia buka "
       "kain, nata, tutup lagi, tanpa pembobolan), pola buku tamu 4, 8, 12, 16, 20 = "
       "jumlah permen yang dinatakan tiap kejadian, prediksi KAMU berarti ke-6: 24?!, "
       "eksperimen menyambut (bukan menjebak) dengan menaruh 24 permen, jawaban si "
       "misterius: 24 kebagi 3 stoples isi 8 persis usul KAMU, sisa nol; (3) RANTAI "
       "TANYA-JAWAB BENAR: hanya dua pertanyaan terbuka dan keduanya dijawab orang "
       "tepat - KIOS yang berwenang bertanya kita bales dia pakai apa ya, dijawab "
       "MENTOR lewat stiker AWAS KEBAGIAN (chart 2 dapat 12, 3 dapat 8, 4 dapat 6, "
       "6 dapat 4), dilanjut usul KAMU 24 lanjut deret dia bagi 3 stoples isi 8, "
       "diputuskan KIOS deal; (4) TANPA KEHADIRAN MUSTAHIL: si penyusun adalah anggota "
       "grup yang selama ini cuma baca (reveal aku yang dari dulu cuma baca. nata "
       "permen itu caraku nyapa) dan menyusun dari jalan raya saat subuh; motif satu "
       "kalimat; penutup KIOS kalian satu bahasa besok mampir ya; (5) KONSISTENSI "
       "VISUAL: SVG etalase diganti suasana pagi (matahari 8 sinar mengganti bulan "
       "sabit, papan TUTUP merah menjadi BUKA hijau) menyatu dengan kartu waktu dan "
       "caption; SVG kejutan 3 stoples 8-8-8 kini menjadi isi cerita; garis waktu "
       "kartu kontinu pagi-siang-malam-pagi tanpa loncat; (6) warisan rev9/10 tetap: "
       "tanpa indikator pengetikan, 20 pesan jeda 3.0-6.3 s, dialog 60px, dialog "
       "manusiawi tanpa kalimat tema, diagram menyala, momen saran grup, papan milik "
       "???, teaser dua lampu kedip beda ritme; subtitle EN 26 beat ditulis ulang; QA "
       "rev11 mengganti 26 anchor require dialog; audio pitch ikut peran yang benar "
       "(53.4/64.8/84.2 kini KIOS 523 Hz, MYST 880 Hz hanya reveal 79.8), dolly reveal "
       "dipindah ke 79.8-82.6; naskah15.md rev11 dan caption rev11 diperbarui, render "
       "2 orientasi 106 s + QA penuh + commit GitHub) |")

n = src.count(ANCHOR)
assert n == 1, f"anchor ditemukan {n}x, harus 1x"
P.write_text(src.replace(ANCHOR, ADD))
print("README baris video 15: REVISI 11 disisipkan OK")
