#!/usr/bin/env python3
"""Perbarui baris katalog 15 ke rev2 (Kasus Pencuri Rapi) di README katalog.
Jika baris 15 belum ada, sisipkan setelah baris 14."""
import pathlib

R = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
lines = R.read_text().split("\n")

row15 = (
    "| 15 | Kasus Pencuri Rapi: Faktor dan Kelipatan | Blog Yuyanaka - artikel \"Kapoka\" (19 Nov 2026) | "
    "`15-faktor-kelipatan/` (REVISI 2 atas arahan pemilik: alur rev1 yang membacakan definisi dinilai flat, chip "
    "EPISODE 15 dihapus permanen, dan feel animasi diangkat; rev2 membangun ALUR DETEKTIF ala anime misteri dalam "
    "dunia KIOS PERMEN malam noir - dinding krem pink di bawah overlay biru gelap dari detik pertama yang hangat "
    "kembali saat kasus ditutup, awning scallop merah-krem, lampion kertas redup berayun, rak stoples kaca permen "
    "sebagai ikon dunia, meja kios dengan etalase kaca, tanda KIOS PERMEN, lantai kayu dan karpet festival; kasus: "
    "etalase menyisakan 13 permen dengan SATU PERMEN DITINGGAL SENDIRIAN yang dilingkari bukti merah ala anime "
    "detektif, stempel BUKTI 01: SISA SATU!, siluet gelap Pencuri Rapi mengintip dari tepi kiri; BUKTI 1 FAKTOR: "
    "pencuri selalu bagi habis rata - faktor 12 = 1, 2, 3, 4, 6, 12, cek gagal 12 dibagi 5 sisa 2, deduksi 13 dibagi "
    "3 sisa 1 ditinggal (kalimat hook bahan dikembangkan jadi modus kriminal, bukan dibacakan); BUKTI 2 KELIPATAN: "
    "catatan malam serangan 4, 8, 12, 16, 20 dengan lingkaran merah berkedip per chip sinkron permen jatuh ke stoples "
    "besar, 12 masuk karena 4 x 3 = 12 dan catatan kaitan 4 faktor 12 - 12 kelipatan 4; jeda ma 33.6-34.4 (panel "
    "kosong, musik D minor hening total, mentor ke tengah) sebelum DEDUKSI TERBATAS VS TANPA BATAS dari contoh 6 "
    "bahan dengan speedlines dan push-in kamera; RENCANA: prediksi detektif stok 24 (kelipatan 4 berikutnya) dengan "
    "garis bukti merah, jebakan disusun stempel JURUS BAGI RATA! dari aplikasi 24 permen bahan (2 dapat 12, 3 dapat "
    "8, 4 dapat 6, 6 dapat 4) dengan piring tersusun ulang hidup 2-3-4-6 pos penjagaan, power-up run tangga, tick "
    "jam malam saat menunggu; PENANGKAPAN 56.4: flash, siluet tertangkap dengan tanda silang merah, stempel KASUS "
    "DITUTUP!, musik berubah F major, mentor spin bangga; papan BERKAS KASUS BARU empat soal utuh bernomor (faktor "
    "20; lima kelipatan pertama 7; kenapa 5 bukan faktor 12; mana yang tak terbatas) dengan delapan kartu bukti "
    "formasi berselang (kandidat faktor 20 plus pengecoh 3 dan 8) dan pil JAWAB DI KOLOM KOMENTAR YA; KEPUTUSAN "
    "PRODUKSI: bahan enam bagian, FPB/KPK/persekutuan dan lampu berkedip (bagian 4-5) disiapkan episode 16 dan "
    "diblokir QA agar tidak bocor, soal 1-2 bahan dipakai utuh, reflektif ke caption, CTA bahan yang meminta ikut "
    "tidak disalin - penutup teaser tersisip aturan 32 rev3: Kisah angka berikutnya sudah menunggu; TANPA LABEL "
    "EPISODE (kata EPISODE diblokir QA di semua teks video); audio D minor noir berubah F major saat kasus ditutup; "
    "durasi 84 s (aturan 31), narasi 22 beat jeda minimal 2,7 s tervalidasi, QA lolos penuh: 2520 frame kedua "
    "orientasi tidak kosong, papan soal utuh, lingkup konten dan teks bersih) |"
)

idx14 = None
old = None
for i, ln in enumerate(lines):
    if ln.startswith("| 15 | "):
        old = i
    elif ln.startswith("| 14 | Petak Tanam"):
        idx14 = i
if old is not None:
    lines[old] = row15
    print("README: baris katalog 15 DIPERBARUI ke rev2")
elif idx14 is not None:
    lines.insert(idx14 + 1, row15)
    print("README: baris katalog 15 ditambahkan")
else:
    raise SystemExit("baris 14 tidak ditemukan")
R.write_text("\n".join(lines))
