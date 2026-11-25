# Naskah Video 16 (FORMAT RP) - LIPATAN KE-42: Bilangan Berpangkat
# Dunia: GRUP BAHAS FYP (hukum seri baru: dunia tiap video diganti total)

Sumber materi: blog Yuyanaka "Pikosa - MENGENAL BILANGAN BERPANGKAT" (23 Nov 2026).
Produksi: tim AKIOMIDA. Durasi 106.0 s. 30 fps, 2 orientasi (portrait 1080x1920, landscape 1920x1080). Audio: musik dan SFX prosedural D MINOR debat malam, pop bubble per chara (RAYA 587 Hz, BIMO 330 Hz, DILA 494 Hz, KAMU 740 Hz, MYST 880 Hz), whoosh diagram menyala, boom twist, shimmer burst, F MAJOR hangat sejak kartu JAM 2 PAGI (75.3); tanpa voice over, narasi hidup di bubble chat Indonesia + subtitle Inggris di pil. Tanpa indikator pengetikan (warisan terkunci rev9-11).

## Hukum seri BARU (permintaan pemilik): SETIAP VIDEO DUNIA RP DIGANTI TOTAL

Pemilik menegaskan: RP ala Telegram/TikTok gen Z tidak boleh memakai grup yang sama terus-menerus - terasa rusak. Mulai video 16 berlaku permanen (dikunci QA): setiap video memiliki dunia sendiri - nama grup, anggota chara OC bernama, avatar, label, setting - dan penanda dunia lama DILARANG muncul (QA16 memblokir "KIOS PERMEN", "PEMILIK KIOS", "MENTOR", "kios", "kardus"). Hukum format lain tetap terkunci: tanpa indikator pengetikan, 20 pesan jeda lega, dialog 60px, dialog manusiawi tanpa kalimat tema dan tanpa label di ucapan, alur rantai sebab-akibat tertutup (tanya-jawab benar, tanpa kehadiran mustahil, tanpa pembelaan tak diminta), diagram menyala, papan soal milik ???, teaser lanjutan, rasa RP: slang gen Z, *aksi dalam bintang*, drama yang jujur.

## Model presentasi rev13 ala referensi pemilik: MODEL FOKUS

Pemilik mengupload video referensi chat story (TikTok @bulanishereee, 149 s) dan meminta modelnya ditiru: fokus dan ada efek seru. Analisis frame + luma (ffmpeg): kanvas hitam pekat, SATU bubble besar per saat (pesan lama hilang begitu balasan datang), bubble gaya WhatsApp - putih untuk pihak lain, hijau untuk pesan sendiri dengan waktu dan Dibaca ✓✓ DI DALAM bubble - serta sisipan reaksi meme hard-cut di sela babak (wajah zoom lambat, mata menyala). Video 16 direvisi penuh mengikuti model ini (rev13) dan menjadi hukum seri (aturan #37 README):

1. Kanvas hitam penuh tanpa bezel ponsel; header grup slim di atas; doodle angka lebih redup.
2. MODEL FOKUS: hanya maksimal dua bubble hidup di layar; bubble terbaru pop besar di tengah (scale 0.82 ke 1 dengan rotasi kecil bolak-balik), pesan lama memudar 1.05 s setelah balasan datang; scroll pelan mengunci bubble ke titik fokus.
3. Bubble gaya WhatsApp: anggota = putih teks gelap, nama chara berwarna DI DALAM bubble; KAMU = hijau WhatsApp dengan stempel jam realistis + Dibaca ✓✓ di dalam; ??? = bubble gelap glow emas.
4. SISIPAN KARTU ILUSTRASI (efek seru) di 5 kartu babak - hard cut full-screen hitam dengan ILUSTRASI AI besar zoom lambat + shake masuk + swell hangat: chat terbuka "GRUP TERBUKA" (0.4), konsol game + mata menyala "BIMO BELUM PERCAYA" (19.0), kalkulator+boba digit naik "DILA MULAI MENGHITUNG" (30.4), amplop bukti ke bulan "DEBAT SELESAI, BUKTI TIBA" (61.3), sosok misterius "AKUN MISTERIUS AKTIF" (75.3). Label waktu babak dari DIVS tetap tampil di sisipan (hukum kartu waktu dipertahankan, QA 5 entri).
5. Efek tambahan: angka pangkat naik pelan di latar babak hitungan (49.2-55.8), flash putih tipis saat hard cut, kamera hanyut + shake di #rig, burst konfeti gambar tetap.
6. LABEL SERI (rev13b, aturan #38 README, berlaku SEMUA video): judul header atas BUKAN lagi nama dunia - selalu "KUASAI MATEMATIKA DI AKIOMIDA.COM" (tanpa status "4 moots online" dan tanpa badge dunia). Subtitle EN (translate) dipindah DI ATAS pill AKIOMIDA; pill AKIOMIDA turun lagi (portrait: subtitle 1560, AKIOMIDA 1740; landscape: subtitle 855, AKIOMIDA 965). Label tab "PAPAN ???" pada papan soal DIHAPUS karena menutupi bahasan di papan.
7. BAHASA SOPAN (rev14, aturan #39): seluruh dialog dinegerikan - ANJIR, GILA, WOY, ngetawain dibuang; reaksi netral (GAK MUNGKIN DEH, aduh malu banget, mantap). QA banned kata kasar permanen.
8. NOL EMOJI (rev14, aturan #40): emoji comot diganti ilustrasi - avatar 5 chara pakai ikon SVG digambar custom (popcorn RAYA, gamepad BIMO, boba DILA, kaca pembesar KAMU, bulan sabit ???), 5 kartu sisipan pakai ilustrasi AI embed base64 (chat terbuka, konsol game, kalkulator+boba, amplop bukti terbang ke bulan, sosok misterius; mata menyala CSS tetap di kartu BIMO), burst reaksi pakai konfeti gambar, caption foto pakai hati path SVG. QA memindai kode emoji di engine.
9. WAKTU REALISTIS (rev14, aturan #41): stempel jam tiap pesan eksplisit dan mengalir 00.31 -> 00.49 -> 01.04 (JAM 1 PAGI - MASIH GAS) -> bukti ngepost tepat 02.00 (JAM 2 PAGI) -> 02.05; kontradiksi lama (chat 21.xx vs kartu JAM 1/2 PAGI) hilang. QA cek urutan + titik sandung.
10. SOUND NIGHT LOFI (rev14, aturan #42): kick+hat ala klub dan boom trailer dibuang; ganti pad D minor + arpeggio lofi + pop notifikasi bernada per chara (lembut) + swell hangat di kartu babak + karpet tape noise pelan; hening total 1.0 s sebelum twist.
11. VOICE ACTING (rev15, aturan #43): SEMUA 20 pesan bersuara (5 chara, 5 suara beda). Pipeline engine-adapter voice16rp.py: default edge-tts id-ID-GadisNeural/ArdiNeural (RAYA Gadis +14%/+12Hz energik; BIMO Ardi +6%/-10Hz berat; DILA Gadis -4%/-6Hz tenang; KAMU Ardi +10%/+4Hz; MYST Ardi -20% lembut mistis); adapter VoiceStudio (OSS debpalash/voicestudio: `voicestudio speak ... --output`, VOICESTUDIO_URL) dan z-ai TTS siap pakai. Teks voice dinormalisasi lisan Indonesia (2^42 -> dua pangkat empat puluh dua), tetap sopan (#39), aksi *...* tidak dibacakan.
12. TIMELINE SATU SUMBER (rev15, aturan #43): timeline16rp.py membaca durasi 20 klip -> timing.json + frag_time.js (const TM); dipakai engine (t0 pesan, kartu, diagram, subtitle 29 beat, burst, dolly, dips, papan, endcard), audio16rp.py (pop/swell/flash/quiz/fanfare + hening pra-twist + mix voice dengan ducking bed -55%), qa16rp.py (durasi = TM.dur 269.4 s (rev16, mengikuti voice), tempo >= 2.8 s, subtitle maks gantung 15.5 s (mengikuti durasi voice)), dan shoot.py (jumlah frame dari TM.dur). Ganti naskah voice = regenerate klip -> jalankan timeline -> seluruh video menyesuaikan otomatis.

## Dunia video ini: GRUP BAHAS FYP

Grup chat "GRUP BAHAS FYP" (header atas semua video = label seri KUASAI MATEMATIKA DI AKIOMIDA.COM, aturan #38; stempel chat malam 00.31-02.05 nyambung kartu babak). Chara OC:
1. RAYA (ikon popcorn SVG, merah) - pembawa kabar FYP, cepat, playful, penggerak aksi.
2. BIMO (ikon gamepad SVG, hijau) - penikmat "gak masuk akal", keras menolak, kalah dengan manis, tumbuh di akhir.
3. DILA (ikon boba SVG, ungu) - kalkulator grup, tenang, yang menggambar biar semua paham.
4. KAMU (ikon kaca pembesar SVG, berry, kanan, Dibaca ✓✓) - POV reader-insert ala RP; penghubung logika.
5. ??? (ikon bulan sabit SVG, glow emas) - moot pendiam @batangkertas, pembuat video viral; bicara pertama kali di menit 79.8.

## Alur RP 20 pesan + 3 diagram + 5 kartu waktu (106 s) - teks final

| Babak | Waktu | Isi chat | Bahasa motion |
|---|---|---|---|
| KI | 0.0-19.0 | Kartu GRUP BAHAS FYP 21.00; RAYA post FYP (1.4): tangkapan layar video viral - tumpukan kertas terlipat, bulan, tombol play, "2^42", caption "lipat 42 kali sampe bulan?? 🤯", akun @batangkertas, 2,1 jt nonton - cap "FYP LAGI GILA: KERTAS DILIPAT DOBEL 42 KALI SAMPAI BULAN?? 😳"; BIMO (*ngetawain hp*): "GAK MUNGKIN ANJIR 😤 dobel 42 kali ya tetep kertas tipis. klaim fyp bebas banget"; KAMU: "tapi klaimnya spesifik bestie: 2^42. itu dobel 42 kali. gak mungkin dia berani nulis gitu 😨"; RAYA: "di caption dia nulis 2 pangkat 42. gila apa engga, kita cek lah 😜" | tanpa indikator pengetikan; dolly zoom foto; fade buka |
| SHO 1 | 19.0-30.4 | Kartu MENIT BERIKUTNYA; DILA: "tunggu, 2^3 itu bukan 2×3 ya. biar gak ada yang salah paham, aku gambar dulu" → DIAGRAM BILANGAN BERPANGKAT (22.8-26.2; chips 2^1-2^4; 2^3 = 2 × 2 × 2 = 8; basis dan pangkat) → BIMO: "ohhh jadi 2^3 = 2×2×2 = 8. gue dari dulu kira 2×3 = 6 😭 MALU"; KAMU: "banyak yang keliru kok. pangkat = jumlah kali lipatnya, bukan angka yang dikali" | punch zoom 5%; chip stagger |
| SHO 2 | 30.4-55.8 | Kartu KALKULATOR TANGGA DOBEL; DILA post ceklis (34.0): kertas "TANGGA DOBEL" - 2^2=4, 2^4=16, 2^6=64, 2^8=256, 2^10=1.024 diclingkung merah "10 cm!", catatan "kertas 0,1 mm" - cap "KUKUMPUL HITUNGANNYA: 2^2 SAMPAI 2^10 DULU" → DIAGRAM PANGKAT VS PERKALIAN (37.4-40.8; 2^3 = 8 vs 2 × 3 = 6; makna lebih penting dari hafal bentuk) → DILA: "2^10 = 1.024 lipatan. tebel kertasnya udah 10 cm. BARU 10 LIPATAN 😳"; BIMO: "hadeh baru 10 cm. bulan itu 384 RIBU KM bestie. jauh banget 😤"; KAMU: "tapi tiap lipatan dobel. 2^20 = 1 juta kali lipat. tebelnya 105 METER?!"; RAYA: "gas hitung sampai lipatan ke-42. malam ini debatnya diselesaikan" | burst 😲 41.4; dolly zoom |
| MA | 56.0-57.0 | Hening murni tanpa label apa pun | musik off |
| TWIST | 57.1-61.1 | DIAGRAM TWIST LIPATAN KE-42 (chips 10 CM, 105 M, 107 KM, 439 RIBU KM; 2^42 = 439.804 KM · BULAN 384.400 KM; TIAP DOBEL, JARAK LOMPAT LAGI) | boom; slow-motion chip |
| KETSU | 61.3-75.1 | Kartu JAM 1 PAGI MASIH GAS; Stiker TANGGA DOBEL (2^10=10 cm · 2^20=105 m · 2^30=107 km · 2^42=439.804 km); BIMO: "439 RIBU KM?? bulan 384 ribu. GUE KALAH 😭 ok gak semua klaim fyp hoax"; KAMU: "klaim yang bener bisa gila, yang hoax juga gila. bedanya di hitungan"; RAYA: "WOY akunnya ngepost lagi. katanya bukti lengkapnya dia taruh malam ini 😳" | stiker stamp; keputusan grup |
| RESOLUSI | 75.3-88.1 | Kartu JAM 2 PAGI DIA NGEPOST; RAYA post bukti (75.5): langit malam, bulan berkawah, garis jarak putus-putus dari kertas 0,1 mm ke bulan, tag 2^42 = 439.804 KM, pil hijau TEMBUS - cap "POST BARUNYA: 2^42 = 439.804 KM. BULAN 384.400 KM. TEMBUS ✓" + konfeti; REVEAL ???: "halo 😊 video itu punyaku. aku cuma baca di grup ini. kalian suka debat, jadi kubuat yang gila tapi bener"; BIMO: "anjir 😭 makasih bestie. mulai sekarang hitung dulu baru komen. deal semua?" | F MAJOR 75.3; konfeti; reveal pop slow-motion + dolly 79.8 |
| PAPAN + TEASER | 88.3-106.0 | PAPAN ??? slide-up: ???: AKU TINGGAL SOAL INI - 4 soal utuh (HITUNG 3^4 / HITUNG 5^3 / HITUNG 7^0 / HITUNG 2^-3) + 8 kartu (81, 125, 1, 64, 8, 27, 15, 12; kunci 81, 125, 1 hadir, 1/8 dihitung sendiri; pengecoh 64 = 4^3 atau 2^6, 8 = 2^3, 27 = 3^3, 15 = 3×5, 12) + KARTU BANTU DARI ??? + JAWAB SOAL ??? DI KOMENTAR YA!; papan keluar 96.6; teaser 97.3 RAYA: "oh iya: ada yang nanya 2^-1 di komentar. minus?? besok kita bedah 👀" (hook pangkat negatif dan pecahan, mengikuti materi blog); fade konten 100.9, AKIOMIDA.COM 101.1, bar 103.6, fade akhir 104.6 | fade dip 88.3 |

## Pemetaan bahan blog ke video

1. "Perkalian berulang ditulis singkat" (2 × 2 × 2 = 2^3, basis dan pangkat) -> diagram 1; dikuatkan BIMO yang mengaku keliru (2×3 = 6) dan KAMU yang merumuskan maknanya.
2. "Tertukar pangkat dan perkalian" (3^2 = 9 bukan 3 × 2; makna lebih penting dari hafalan) -> DILA mencegah lebih dulu di chat, diagram 2 menampilkan kontras 2^3 = 8 vs 2 × 3 = 6.
3. "Pangkat nol: pola, a^0 = 1" -> hadir lewat tangga hitungan DILA (mulai dari kertas asli: nol lipatan = 0,1 mm) dan jadi pijakan ladder twist; istilah tidak dijadikan label pelajaran.
4. "Pangkat negatif a^-n = 1/a^n" (2^-1 = 1/2, 2^-3 = 1/8) -> diteaser di akhir (nanya 2^-1 di komentar, minus??) dan masuk papan soal nomor 4 (HITUNG 2^-3) - dibedah penuh di video pecahan berikutnya.
5. "Pertumbuhan berlipat 1, 2, 4, 8, 16, 32, ..." -> mesin cerita: klaim lipat dobel 42 kali; grup menghitung bertahap dan menemukan lompatan eksponensial.
6. Uji pemahaman blog (3^4; 5^3; 4×4×4×4×4; 7^0; 2^-3; luas persegi sisi 8) -> dipilih 4 untuk papan (3^4, 5^3, 7^0, 2^-3); soal bentuk ulang dan luas masuk diagram (3^2 = 9, 4^3 = 64, 10^3 = 1.000).

## Verifikasi hitungan (dihitung kode, bukan kepala)

0,1 mm × 2^10 = 10,24 cm ("10 cm"); × 2^20 = 104,86 m ("105 METER"); × 2^30 = 107,37 km ("107 KM"); × 2^42 = 439.804,7 km > jarak bulan 384.400 km - klaim video viral TEBUS, benar secara fisika perkalian berulang. 2^10 = 1.024; 2^20 = 1.048.576 ("1 juta kali lipat").

## Subtitle Inggris 26 beat

Tempo tervalidasi QA (min max(1,7 s, len/17), maks 8,5 s, jeda min 1,7 s). Beat kunci: "FYP claim: fold paper 42 times, reach the Moon!", "Exponents: repeated times, written short!", "2 cubed = 8. 2 times 3 = 6. Different!", "Each double, the distance explodes!", "439 thousand km. The Moon is 384,400. I lose!", "Hi. That video is mine. I only read here.", "Someone asked 2^-1. Negative? Tomorrow!", "Thanks for watching." (102.2).

## Tipografi, merek, dan QA

1. DIALOG 60PX (2x lipat) kedua orientasi; semua teks lain minimal 24 px termasuk teks SVG dan superskrip tspan (nama 36, caption foto 40, stiker 54/38, divider 38, judul diagram 54/46, chip 48, soal 40/34, kartu 44, pil 42/38, subtitle EN 34, watermark 30, header 44/40, endcard 72/60); fontcheck computed-style pra dan pasca render; marker /*__FONTS__*/ Poppins/JetBrains Mono; emoji warna; superskrip digambar tspan (bukan karakter unicode pangkat).
2. Watermark AKIOMIDA 30 px pada wmY 1560 (portrait) dan 870 (landscape) - 3x jarak awal dari bawah, hasil permintaan "naikin dua kali posisinya ke atas".
3. QA qa16rp.py: 55 anchor wajib (dialog, diagram, papan, nama chara), daftar terlarang penuh + penanda dunia lama (KIOS PERMEN, PEMILIK KIOS, MENTOR, kios, kardus), tempo bubble >= 2.8 s, 26 beat subtitle, kartu UJIVAL ['81','125','1','64','8','27','15','12'], audio 106.0 s, sampling frame, thumbnail, naskah + caption bersih.
4. Sinematik warisan: dolly zoom foto; dolly reveal 79.8-82.6; punch zoom 5% enam momen; pop ??? slow-motion 0.95 s; fade dip antar kartu waktu; Ken Burns foto 1 ke 1.06; scroll pelan.
5. Zona aman, watermark AKIOMIDA, AKIOMIDA.COM satu kali, teaser tersisip tanpa promosi; hasil tidak dilink di chat, cukup commit GitHub.
