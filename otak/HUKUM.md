# HUKUM OTAK — Aturan Wajib Produksi (formalisasi permintaan pemilik)

> Sumber induk: lawbook studio (`README.md` di root repo, 43 aturan permanen).
> File ini menegaskan aturan yang diminta pemilik ditambahkan secara eksplisit.

## L1 - FORMAT 9:16 SAJA (revisi perintah pemilik 2026-11-28)

Setiap judul video dibuat dalam SATU format: portrait 1080x1920 (9:16).
Landscape diarsipkan (perintah pemilik: "sekarang hanya pakai format 916").
QA memverifikasi `*_916.mp4` + thumbnail 9:16 sebelum sync ke `download/`
dan push ke GitHub.

## L2 - ZONA AMAN PORTRAIT (aturan studio 2, 18, 24, 38)

Seluruh teks portrait wajib berada di zona aman atas sehingga TIDAK TERTUTUP
deskripsi/tombol/UI media sosial saat diposting:

- Subjudul Indonesia + subtitle Inggris: pil di atas zona UI bawah
  (standar terkunci studio: subjudul sekitar y 1560-1640 dari 1920)
- Watermark AKIOMIDA: boleh di tepi bawah (1740) sepanjang tidak
  menutupi konten apa pun
- Margin samping aman 84 px; semua teks minimal 24 px (fontcheck wajib lolos)
- Landscape: komposisi sinematik standar (subtitle y 855, watermark 965)

Verifikasi visual smoke frame wajib sebelum render penuh.

## L4 - DESAIN GLOW v3 WAJIB (rombak total per penolakan pemilik 2026-11-28)

Pemilik menilai desain PAGI CERIA 1/10 dan memerintahkan rombak total.
Hukum baru: semua episode memakai sistem desain GLOW v3
(`otak/DESAIN-GLOW.md`) - gradien hidup + blob bokeh, bubble glassmorphism,
4 hero scene sinematik AI, bar progres cerita, palet plum-coral-mint-emas.
Larangan: permukaan datar membosankan, panel gelap pekat. Tolakan desain
pemilik = rombak total bahasa visual, bukan perbaikan permukaan.

## Hukum pendukung yang aktif otomatis

- QA tiap episode memblokir penanda dunia episode sebelumnya (banned words)
  sehingga dunia baru tidak bisa terulang (aturan 36)
- Kosakata bahasa lisan alami wajib: sapaan sederhana, urutan kata natural,
  gabungan kata buatan dilarang permanen (hukum rev20)
- Bahasa sopan, nol emoji, tanpa em dash, soft selling, teaser tanpa
  kata follow/subscribe (aturan 25, 32, 39, 40)
