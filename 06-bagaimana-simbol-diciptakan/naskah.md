# Naskah Video 06 - Bagaimana Simbol Bilangan Diciptakan? (Revisi 2)

- Durasi: 52 detik | FPS: 30 | Musik & SFX: prosedural orisinal
- Sumber materi: yuyanaka.blogspot.com/2026/11/partoen.html (artikel "Partoen", 14 Nov 2026)
- Format: landscape.mp4 (1920x1080) dan portrait.mp4 (1080x1920)
- Catatan portrait: seluruh teks ditempatkan di zona aman atas (di atas y = 1380 dari 1920).
- Label di dalam video: AKIOMIDA (watermark atas pada portrait, pojok kanan bawah pada landscape, footer penutup).
- Dua bahasa di layar: teks utama bahasa Indonesia, subtitle bahasa Inggris di bawahnya dengan jarak lega (tidak menempel).

## Perbaikan revisi 2 (umpan balik Kaisar)

1. BUG TERTIMPA: kunci posisi `l2Y` tadinya terdefinisi dua kali di tabel layout, membuat baris kedua hook jatuh ke slot bab 4 dan menimpa baris pertama. Kini semua kunci posisi diberi prefix unik per scene dan ada audit otomatis kunci duplikat (nol duplikat di kedua orientasi).
2. ANTI-TUMPUK TRANSISI: saat push-pan, scene lama kini pudar selesai dalam 0,33 detik pertama keluar, jadi teks lama tidak pernah menyilang teks baru.
3. FONT DIBESARKAN untuk pengguna mata minus: teks utama naik dari 44-46 px ke 50-52 px, definisi 40 ke 46, simpulan 42 ke 46-48, kata bab 78 ke 86-88, subtitle EN 23-26 ke 26-28. Teks hook kedua dipendekkan jadi "Siapa menentukan bentuk 7?" agar tetap satu baris.
4. LABEL PENJELAS ditambah agar penjelasan tidak hampa: "TIAP 5 DICORET" di kartu goresan, "ANGKA / ANGKA ROMAWI / KATA / NILAI: TUJUH" mengikuti tiap tahap kotak morf, "NILAINYA TETAP 9" di bawah chip bintang.
5. INOVASI GERAK (pola video motion TikTok yang hidup dan tidak kaku): angka count-up 0 sampai 347 pada label goresan, tag anotasi +0 dan +00 melayang dari kartu 50 dan 500, chip "BAGIAN x DARI 3" masuk dengan rotasi stiker lalu melurus, marker sorot emas menyapu di bawah simpulan bab 2, semua landing tetap squash-stretch.

## Pola produksi (mewarisi standar revisi 2 video 05)

1. Satu ide per layar: maksimal 3 blok teks per momen; efek tidak menyaingi pesan.
2. Gramatika bab konsisten: chip "BAGIAN x DARI 3" + kata besar gradien + definisi satu kalimat + contoh visual + label + satu kalimat simpulan.
3. Transisi push-pan 0.6 detik, semua titik potong di grid musik 1.2 detik (6.0, 14.4, 25.2, 34.8, 43.2).
4. Objek penghubung antar bab (match-cut cerita): bentuk-bentuk simbol di hook, lalu bintang emas di bab batas kesepakatan.
5. Bahasa impact tunggal: punch kamera halus + kilat pendek + light sweep pada kartu terkait; tanpa burst partikel, tanpa cincin, tanpa chromatic split.
6. Subtitle Inggris berjarak lega; glow teks kecil; grain 0.04; 22 partikel ambient lambat.

## 0.0 - 6.0 | HOOK: KENAPA BENTUKNYA BEGINI?
- 0.50 - Angka 1 emas besar (170 px) menghantam (boom; punch kamera).
- 1.00-2.50 - Tiga kartu bentuk alternatif mendarat: GORESAN (|), SEGITIGA (segitiga kapur), LENGKUNG (lingkaran sian), tiap kartu disapu light sweep.
- 2.60 - "Kenapa satu ditulis 1?" (52 px) / EN: "Why is one written as 1?"
- 3.90 - "Siapa menentukan bentuk 7?" (52 px) / EN: "Who decided the shape of 7?"
- 4.90 - Tanda tanya merah memantul di samping angka 1 (tick).

## 6.0 - 14.4 | BAGIAN 1: GORESAN
- 6.70 - Chip "BAGIAN 1 DARI 3" masuk miring lalu melurus / EN: "PART 1 OF 3"
- 7.20 - Kata besar "GORESAN" (88 px, gradien, blur-in, chime).
- 7.80 - "Cara paling tua mencatat jumlah." (46 px) / EN: "The oldest way to count."
- 8.20 - Kartu goresan mendarat; 8.40-9.40 dua belas goresan muncul satu per satu dalam 3 kelompok; garis coret kelima muncul di kelompok 1 dan 2.
- 9.90 - Light sweep kartu; 10.10 label menghitung naik 0 sampai 347 lalu menjadi "347 = 347 GORESAN" / EN: "347 = 347 MARKS"; 11.00 label kecil "TIAP 5 DICORET".
- 11.40 - Simpulan: "Makin banyak, makin rumit." / EN: "More to count, more mess." (boom kecil)

## 14.4 - 25.2 | BAGIAN 2: DESIMAL
- 15.10 - Chip "BAGIAN 2 DARI 3" / EN: "PART 2 OF 3"
- 15.60 - Kata besar "DESIMAL" (chime).
- 16.20 - "Sepuluh simbol: 0 sampai 9." / EN: "Ten symbols: 0 through 9."
- 16.80-17.50 - Sepuluh ubin angka 0 sampai 9 muncul berjalan; ubin 5 disorot emas dan disapu light sweep.
- 19.20 / 20.10 / 21.00 - Tiga kartu nilai tempat mendarat bergiliran: 5 LIMA, 50 LIMA PULUH, 500 LIMA RATUS; angka 5 selalu emas, angka 0 kelabu (chime naik); tag anotasi +0 dan +00 melayang naik dari kartu 50 dan 500.
- 22.80 - Simpulan: "Simbol sama, posisi mengubah nilai." (46 px) / EN: "Same symbol, position changes value."; 23.00 marker sorot emas menyapu di bawahnya (boom + sfx sorot).

## 25.2 - 34.8 | BAGIAN 3: SIMBOL
- 25.90 - Chip "BAGIAN 3 DARI 3" / EN: "PART 3 OF 3"
- 26.40 - Kata besar "SIMBOL" (chime).
- 27.00 - "Bukan bilangan itu sendiri." / EN: "Not the number itself."
- 27.60 - Kotak bercahaya: "7" (emas); 27.90 label tahap "ANGKA".
- 29.00 / 30.60 / 32.20 - Swap dengan anticipation (remas sebelum ganti): "VII" (sian, label "ANGKA ROMAWI"), "TUJUH" (violet, label "KATA"), "NILAI SAMA." (gradien, label "NILAI: TUJUH" emas, boom).
- 33.40 - Simpulan: "Simbolnya beda, bilangannya tujuh." / EN: "Different symbol, still seven."

## 34.8 - 43.2 | BATAS KESEPAKATAN
- 35.50 - Bintang emas besar (130 px) mendarat di kartu (boom kecil; bentuk dari clip-path, bukan glyph).
- 36.70 - "Ganti lambang? Boleh saja." / EN: "Swap the symbol? Go ahead."
- 38.20 - Chip persamaan: [bintang] + 2 = 9 (whoosh + tick).
- 39.00 - Label "NILAINYA TETAP 9" muncul di bawah chip.
- 40.20 - "Lambang boleh ganti, hasil tidak." / EN: "Symbols flex, results do not." (boom)

## 43.2 - 52.0 | CTA
- 43.90 - "Kalau seluruh manusia sepakat" (50 px) / EN: "If every human on Earth agreed"
- 45.30 - "apakah 7 + 2 langsung jadi 10?" (44 px) / EN: "would 7 + 2 suddenly become 10?" (boom kecil)
- 46.80 - "Ceritain pendapatmu di komentar." / EN: "Tell us what you think in the comments."
- 47.80 - Kartu CTA mendarat (whoosh lembut).
- 48.70 - "AKIOMIDA.COM" terbentang (tracking menyempit, chime).
- 49.30 - Garis gradien menyapu; light sweep berulang di kartu CTA.
- 49.90 - "Kebenaran butuh dasar dan alasan." (EN kecil: "Truth needs grounds and reasons.")
- 50.60 - Brand: AKIOMIDA dengan tracking yang settle.
- 51.30 - Fade to black (0.7 detik) untuk loop yang bersih.
