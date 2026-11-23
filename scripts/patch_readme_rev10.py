#!/usr/bin/env python3
"""Patch README master baris video 15: sisipkan REVISI 10 setelah teks rev9.
Anchor unik: akhir teks REVISI 9 pada baris katalog."""
from pathlib import Path

P = Path("/home/z/my-project/scripts/vimoda07/package/README.md")
src = P.read_text()

ANCHOR = "naskah15.md rev9 dan caption rev9 diperbarui, render 2 orientasi 106 s + QA penuh + commit GitHub) |"
ADD = (" REVISI 10 - DIALOG DITULIS ULANG TOTOL ATAS LAPORAN PEMILIK (masih "
       "bicara robotik ala story edukasi: kalimat tema seperti ternyata Pembagi Rapi "
       "cuma pengen ikut rame diucapkan karakter padahal di manhwa novel dan sosmed "
       "tidak ada orang ngomong begitu, simile terpaksa kayak diukur dan kayak buat "
       "tamu pertama, kesimpulan pemilik: cerita tanpa unsur manusia, robot by robot): "
       "(1) HUKUM BARU NOL KALIMAT TEMA NOL LABEL DI UCAPAN: tidak ada karakter yang "
       "menyebut label misteri atau merangkum moral dalam ucapannya, karakter bicara "
       "tentang dia; QA memasukkan Pembagi Rapi, ternyata, kasus ditutup, diukur, tamu "
       "pertama, CARA BAGI RATA ke DAFTAR TERLARANG engine sehingga kalimat model begitu "
       "tidak mungkin kembali; (2) SEMUA 20 PESAN BARU ala chat fiction sosmed: reaksi "
       "kasat mata (HAAA KOK BISA SIH. permen berbaris rapi semua 😨), kebingungan tulus "
       "(SATU permen doang. buat siapa itu???), kehadiran fisik (wih ada aja ya. tunggu, "
       "aku lewat depan. mau ikut lihat langsung), aksi sebagai sumber matematika (kucoba "
       "bagi: 1, 2, 3, 4, 6, sama 12 orang. PAS SEMUA 😳), realisasi dengan tunggu (oh "
       "nambah 4 terus kayak naik tangga. tunggu, 12 ada di barisan?!), logika kunjungan "
       "bahasa lapangan (kunjugannya tiap 4 kan. nah pas ke-12 dia balik. sengaja banget), "
       "penyingkap jujur malu (yang tadi itu aku. gak nyolong, cuma pengen ikut aja; aku "
       "dateng jam 6, atur semuanya, terus lari karena malu 😊), peran dibalik lucu (deal, "
       "24 ya! besok pagi aku mau ngintip dari dalam. gila penasaran), alasan pilihan "
       "manusia (24 dong. biar yang laper banyak juga kebagian), penutup undangan hangat "
       "bukan penghakiman tema (ada aja. besok jangan sembunyi lagi ya. nanti kamu kebagian "
       "permen); (3) istilah formal (FAKTOR 12, KELIPATAN 4, TERBATAS VS TANPA BATAS, "
       "4 × 3 = 12) hanya hidup di diagram menyala dan subtitle EN, di chat tidak ada "
       "istilah diucapkan - konsep lewat aksi dan gambar; stiker CARA BAGI RATA! diganti "
       "AWAS KEBAGIAN! (judul jurus terasa judul materi); teaser diganti dua lampu kedip "
       "beda ritme. misteri baru 👀; (4) warisan rev9 tetap: tanpa indikator pengetikan "
       "(visual, suara, QA banned), 20 pesan jeda 3.0-6.3 s, dialog 60px, kartu waktu RP, "
       "momen memilih, papan milik ???; subtitle EN 26 beat ditulis ulang; QA rev10 "
       "mengganti 18 anchor require dialog baru; audio timeline pop tidak berubah, hanya "
       "komentar cue; naskah15.md rev10 dan caption rev10 diperbarui, render 2 orientasi "
       "106 s + QA penuh + commit GitHub) |")

n = src.count(ANCHOR)
assert n == 1, f"anchor ditemukan {n}x, harus 1x"
P.write_text(src.replace(ANCHOR, ADD))
print("README baris video 15: REVISI 10 disisipkan OK")
