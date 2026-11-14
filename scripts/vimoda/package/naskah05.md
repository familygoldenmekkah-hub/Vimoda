# Naskah Video 05 - Angka, Bilangan, dan Nomor

- Durasi: 52 detik | FPS: 30 | Musik & SFX: prosedural orisinal
- Sumber materi: yuyanaka.blogspot.com/2026/11/limpai.html (artikel "Limpai", 14 Nov 2026)
- Format: landscape.mp4 (1920x1080) dan portrait.mp4 (1080x1920)
- Catatan portrait: seluruh teks ditempatkan di zona aman atas (di atas y = 1380 dari 1920) agar tidak tertutup deskripsi/UI media sosial saat diposting.
- Label di dalam video: AKIOMIDA (watermark atas pada portrait, pojok kanan bawah pada landscape, dan footer penutup).
- Dua bahasa di layar: teks utama bahasa Indonesia, dibawahi subtitle bahasa Inggris yang lebih kecil namun tetap terbaca.
- Margin samping aman (84 px portrait, 200 px landscape) dan larangan em dash dipakai sejak rendering pertama.

## Bahasa motion kelas bioskop (diterapkan penuh mulai video ini)

1. Anticipation: kotak morf meremas dan naik sedikit sebelum berganti teks, lalu mendarat dengan overshoot.
2. Squash dan stretch: setiap elemen yang mendarat menyelebung sedikit (scaleY turun, scaleX naik) lalu kembali.
3. Overshoot bertingkat: kartu memantul melewati posisi akhir (back-out easing) dengan amplitudo berbeda per elemen, jadi gerakan tidak seragam.
4. Follow-through: subtitle Inggris selalu datang belakangan dengan easing lebih lembut, seperti gema yang settle.
5. Kamera: push-in pelan 0.990 ke 1.034 tiap adegan (easeInOut) + napas vertikal halus + punch scale saat impact.
6. Impact feedback: shake globe halus, kilatan putih pendek, burst partikel radial, dan chromatic split merah-sian pada teks besar saat momen besar.
7. Filter filmis: film grain (feTurbulence) ber-jitter deterministik, light sweep menyapu kartu saat dan setelah mendarat, vignette.
8. Kinetic type: kata kunci memantul saat "kena", heading masuk dengan blur + tracking menyempit, chip ter-reveal dengan wipe.

## 0.0 - 5.2 | HOOK: TIGA TUJUH
- 0.30 - "7  7  7" besar menghantam (boom, burst sian, chroma split, kamera punch).
- 0.95 - Label "TIGA TUJUH".
- 1.00-1.55 - Tiga kartu mini mendarat bergiliran dengan squash: 7 APEL (7 titik emas), 7 DI PAPAN (papan hijau kapur), NOMOR 7 (tiket emas garis putus), tiap kartu disapu light sweep.
- 1.70 - "Tiga-tiganya pakai simbol 7." / EN: "All three use the same symbol 7."
- 2.90 - "Tapi tunggu, fungsinya beda, lho." / EN: "But wait, they work differently."
- 4.00 - Tanda tanya merah memantul di samping angka (tick + burst merah).

## 5.2 - 12.4 | ANGKA ITU SIMBOL
- 5.35 - Chip "ANGKA ITU SIMBOL" ter-reveal dengan wipe / EN: "A DIGIT IS A SYMBOL"
- 5.85 - "Angka adalah simbol." masuk dengan blur + tracking; kata "simbol." memantul / EN: "A digit is a symbol."
- 6.50-7.15 - Sepuluh ubin angka 0 sampai 9 muncul berjalan dengan overshoot bertingkat + tick naik; ubin "7" disorot emas dan disapu light sweep (hierarki visual mengikuti cerita).
- 7.90 - Label "SISTEM DESIMAL" / EN: "THE DECIMAL SYSTEM"
- 8.90 - "Di sistem desimal ada sepuluh." / EN: "The decimal system has ten."
- 9.90 - "Cuma 0 sampai 9, selesai." / EN: "Just 0 through 9, that is it."

## 12.4 - 22.0 | BILANGAN ITU NILAI
- 12.55 - Chip "BILANGAN ITU NILAI" (wipe) / EN: "A NUMBER IS A VALUE"
- 13.00 - "Konsep jumlah atau nilai." (blur-in, kata kunci memantul) / EN: "A concept of quantity or value."
- 13.90 - Kartu bilangan mendarat (boom kecil); 14.20-14.80 tujuh titik apel muncul satu per satu (tick naik).
- 15.40 - Swap 1: apel jadi JERUK (oranye) + burst + kartu squash + label "7 JERUK" memantul / EN label: "SEVEN ORANGES".
- 17.20 - Swap 2: jadi BUKU (petak biru bersendi) + burst + "7 BUKU" / EN label: "SEVEN BOOKS".
- 18.30 - Punch: "Ganti benda sepuasnya, nilai tetap." / 18.50 - EN: "Swap the items, the value holds." (boom)
- 20.30 - "Dipakai buat jumlah, ukuran, urutan." / EN: "Used for count, size, and order."

## 22.0 - 31.6 | NOMOR ITU PENANDA
- 22.15 - Chip "NOMOR ITU PENANDA" (wipe) / EN: "NUMBERS AS IDENTITY"
- 22.50 - Kotak bercahaya: "PUNGGUNG 10" (biru).
- 24.40 - Anticipation lalu swap: "ISINYA 10 ORANG?" (merah); caption "Kaos nomor 10, isinya satu orang." / EN: "Jersey 10 still holds one person."
- 26.20 - Swap: "RUMAH NO. 25" (hijau); caption "Rumah nomor 25 bukan isi 25 benda." / EN: "House 25 is not 25 things inside."
- 28.00 - Swap: "CUMA PENANDA." (gradien emas, boom, burst, chroma).
- 29.55 - Punch: "Nomor: urutan, tanda, identitas." / 29.75 - EN: "Tags, order, and identity."
- Audio: riser 29.0-31.6.

## 31.6 - 42.2 | KUNCI NYA KONTEKS
- 31.75 - Chip "KUNCI NYA KONTEKS" (wipe) / EN: "CONTEXT IS THE KEY"
- 32.30 - Kartu angka "7" emas besar mendarat + light sweep.
- 33.00-33.80 - Tiga chip konteks mendarat: "7 APEL", "7 DI PAPAN", "NOMOR 7" (tick bertingkat).
- 34.70 - "Simbolnya sama persis." (kata kunci memantul) / EN: "The symbol looks identical."
- 36.90 - Denyut konteks: cincin emas ganda mengembang dari kartu 7 + burst + chip menyala bergiliran + chime.
- 38.40 - "Maknanya ikut konteks." (gradien, boom) / 38.60 - EN: "The meaning follows context."
- 40.30 - "Teliti: tahu apa yang dihitung." / EN: "Be precise about what you count."

## 42.2 - 52.0 | CTA
- 42.50 - "Nah, uji pemahamanmu." (blur-in) / EN: "Now test your understanding."
- 43.70 - "Punggung 7: jumlah, nilai, atau identitas?" / EN: "Jersey 7: a count, a value, or an identity?"
- 44.60 - "Bantah atau dukung, tulis di komentar." / EN: "Agree or push back, drop a comment."
- 45.60 - Kartu CTA mendarat dengan squash (whoosh lembut).
- 46.30 - "AKIOMIDA.COM" terbentang (tracking menyempit, chroma split, burst sian, chime).
- 46.90 - Garis gradien menyapu; light sweep berulang tiap 2.6 detik di kartu CTA.
- 47.60 - "Belajar matematika jadi makin seru." (EN kecil: "Learning math just got more fun.")
- 49.20 - Brand: AKIOMIDA dengan tracking yang settle.
- 51.30 - Fade to black (0.7 detik) untuk loop yang bersih.
