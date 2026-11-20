#!/usr/bin/env python3
"""Perbarui baris katalog 15 ke rev3 (Misteri Pembagi Rapi) di README katalog.
Jika baris 15 belum ada, sisipkan setelah baris 14."""
import pathlib

R = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
lines = R.read_text().split("\n")

row15 = (
    "| 15 | Misteri Pembagi Rapi: Faktor dan Kelipatan | Blog Yuyanaka - artikel \"Kapoka\" (19 Nov 2026) | "
    "`15-faktor-kelipatan/` (REVISI 3 atas laporan penonton yang menilai rev2 mengajarkan keburuukan mencuri, "
    "alur melompat bukan mengalir, dan visual 2/10 - rombak total: (1) KONTEN 100% POSITIF, arc kejahatan dihapus "
    "sepenuhnya dan diganti MISTERI PEMBAGI RAPI: seseorang diam-diam menata permen Kios Permen rata empat per "
    "stoples di malam hari dan menyisakan satu permen jadi hadiah tamu pertama; detektif angka menyusuri PETUNJUK 1 "
    "FAKTOR (enam cara rapi 1, 2, 3, 4, 6, 12; cek 12 dibagi 5 sisa 2 belum rapi; deduksi 13 dibagi 3 sisa 1 jadi "
    "hadiah - kalimat bahan dikembangkan jadi misteri kebaikan, bukan dibacakan), PETUNJUK 2 KELIPATAN (catatan "
    "kunjungan rahasia 4, 8, 12, 16, 20 dengan lingkaran petunjuk merah berkedip sinkron permen jatuh ke stoples "
    "besar; 12 masuk karena 4 x 3 = 12 dan catatan kaitan 4 faktor 12 - 12 kelipatan 4); jeda ma 33.6-34.4 sebelum "
    "DEDUKSI TERBATAS VS TANPA BATAS yang MEMBERDAYAKAN dari contoh 6 bahan: cara berbagi terbatas, peluang ikut "
    "berbagi tanpa batas; RENCANA TERIMA KASIH: prediksi stok 24 dengan garis petunjuk merah, meja sambutan disusun "
    "stempel JURUS BAGI RATA! dari aplikasi 24 permen bahan (2 dapat 12, 3 dapat 8, 4 dapat 6, 6 dapat 4) dengan "
    "piring tersusun ulang hidup 2-3-4-6 berombak, power-up run tangga, tick jam lembut; TERIMA KASIH 56.4: flash "
    "lembut, cahaya emas Pembagi Rapi (orb hangat + tiga kilau mengorbit, tanpa wajah) menemukan kejutan, stempel "
    "TERIMA KASIH!, musik berubah F major, mentor spin gembira, fajar hangat; papan MISI BARU UNTUKMU! empat soal "
    "utuh bernomor (faktor 20; lima kelipatan pertama 7; kenapa 5 bukan faktor 12; mana yang tak terbatas) dengan "
    "delapan kartu bantu formasi berselang (kandidat faktor 20 plus pengecoh 3 dan 8) dan pil JAWAB DI KOLOM "
    "KOMENTAR YA; moral tegas di sub 59.8: berbagi rata itu seru dan baik; QA kini MEMBLOKIR kata PENCURI/CURI/"
    "SERANGAN/JEBAKAN/PENANGKAPAN/TERTANGKAP/DICURI di semua teks video dan caption agar tidak terulang; (2) ALUR "
    "MENGALIR: panel slide masuk-keluar translateY 34px easing dan mengapung halus saat diam, judul slide-up, idle "
    "breathing di semua elemen (antrean permen, permen meja sambutan, stoples, bola mentor memantul pelan), kamera "
    "hanyut sinusoidal terus di luar tiga push-in; (3) VISUAL NAIK KELAS: malam ajaib dengan kunang-kunang emas 14 "
    "titik berkedip, genangan cahaya lampion di lantai, vignette sinematik permanen, garis aksen emas di bawah "
    "tiap header panel, stroke dalam halus di panel, dunia KIOS PERMEN (dinding krem pink, awning scallop merah-"
    "krem, lampion berayun, rak stoples kaca, etalase, tanda KIOS PERMEN, karpet festival); KEPUTUSAN PRODUKSI: "
    "FPB/KPK/persekutuan dan lampu berkedip (bagian 4-5 bahan) disiapkan episode 16 dan diblokir QA, soal 1-2 "
    "bahan utuh, reflektif ke caption, CTA yang meminta ikut tidak disalin - teaser tersisip aturan 32 rev3: Kisah "
    "angka berikutnya sudah menunggu; TANPA LABEL EPISODE (kata EPISODE diblokir QA); audio D minor malam ajaib "
    "berubah F major saat terima kasih; durasi 84 s (aturan 31), narasi 23 beat jeda minimal 2,7 s tervalidasi, QA "
    "lolos penuh: 2520 frame kedua orientasi tidak kosong, durasi 84.0 s, papan soal utuh, teks bersih dari kata "
    "terlarang dan label episode, thumbnail baru. Naskah rev3 mendokumentasikan ketiga respons laporan penonton "
    "dan pemetaan kalimat bahan menjadi misteri positif; baris katalog 15 di README diperbarui) |"
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
    print("README: baris katalog 15 DIPERBARUI ke rev3")
elif idx14 is not None:
    lines.insert(idx14 + 1, row15)
    print("README: baris katalog 15 ditambahkan")
else:
    raise SystemExit("baris 14 tidak ditemukan")
R.write_text("\n".join(lines))
