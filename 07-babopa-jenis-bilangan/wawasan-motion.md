# Studi 13 Skill Motion dari GitHub (Kaisar Motion, 2026-11-15)

Studi totalitas sebelum revisi lanjutan video 07. Setiap entri diverifikasi lewat
pencarian GitHub (API + web) pada 2026-11-15; jumlah bintang adalah snapshot tanggal itu.
Bentuk: apa itu - pelajaran kerajinan yang diambil - bagaimana dipetakan ke pipeline Vimoda.

## 1. HyperFrames - heygen-com/hyperframes

Mesin render video berbasis HTML: komposisi markup dengan trek `data-start`/`data-duration`,
timeline GSAP di-pause lalu di-drive headless Chrome frame-per-frame, encode FFmpeg.
Input sama menghasilkan video sama (deterministik).

- **Pelajaran**: render = fungsi murni waktu; teks/audio/video adalah trek dengan masuk-keluar eksplisit.
- **Peta Vimoda**: pipeline kita sudah seek-per-frame; pertahankan `renderFrame(t)` murni dan RNG berbenih (mulberry 20261115).

## 2. Remotion - remotion-dev/remotion

Video programatik dengan React: `interpolate`, `spring`, `sequence`; komposisi sebagai komponen.

- **Pelajaran**: easing dan timing adalah token terpusat; objek fisik memakai spring, UI memakai easing lembut.
- **Peta Vimoda**: bola (fisik) memakai easing berbasis gerak; elemen UI memakai ease-in-out lembut; pop maksimal 10 persen (aturan 19).

## 3. Remotion Skills - remotion-dev/skills

Paket skill agen: best-practices, create, markup (timing, tipografi, media, audio, font),
studio, render, maps, captions.

- **Pelajaran**: caption/subtitle adalah kerajinan kelas satu, bukan tempelan.
- **Peta Vimoda**: aturan 18 - durasi proporsional panjang teks (13.5 karakter/detik, minimum 1.7 detik), maksimal dua baris, di atas zona aman deskripsi.

## 4. GSAP - greensock/GSAP

Pustaka animasi timeline: stagger, ease tokens, koreografi dalam satu timeline induk.

- **Pelajaran**: semua elemen digerakkan dari SATU beat-sheet, bukan tiap elemen punya jam sendiri.
- **Peta Vimoda**: SUBS + SCENE_T + GESTS + cue audio berasal dari satu daftar beat di naskah; stagger ubin 0.6 detik, baris keluarga 1.2 detik.

## 5. GSAP Skills - frankxai/awesome-motion-design-agent-skills

Kurasi skill motion untuk agen (GSAP, Motion, Remotion, Lottie, Rive + motion QA).

- **Pelajaran**: motion QA harus terprogram, bukan sekadar nalar.
- **Peta Vimoda**: qa07.py (sampling frame, teks, durasi) + smoke visual sebelum render penuh.

## 6. OpenMontage - OpenMontageInc/OpenMontage (80.6k bintang)

Sistem produksi video agentic open-source: 12 pipeline produksi, 100+ tools,
700+ agent skill dan berkas pengetahuan produksi.

- **Pelajaran**: produksi video = pipeline bertahap dengan pengetahuan terdokumentasi per tahap, bukan improvisasi satu duduk.
- **Peta Vimoda**: README = doktrin bernomor (aturan 1-20), naskah = beat-sheet, satu skrip patch per revisi, engine dibangun dari fragmen.

## 7. Lemo-Opuscar - lemomo-ai/lemo-opuscar (16.6k bintang)

Perkakas gaya film "made in code" untuk Claude Code: 99 gaya siap pakai; tiap gaya =
prompt gaya + film demo yang sepenuhnya dibuat dalam kode.

- **Pelajaran**: gaya sinematik dikunci sebagai token: grade warna, grain, vignette, bahasa kamera tetap sepanjang film.
- **Peta Vimoda**: palet + grain + vignette terkunci di frag_head; tidak ada eksperimen gaya di tengah video.

## 8. Video Shotcraft - Vincentwei1021/video-shotcraft (19.9k bintang)

Skill video produk sinematik untuk Claude Code & Codex dengan Remotion: 124 kartu resep
shot, 150 pratinjau gerak, beat-matching; varian komunitas menambah kamera 2.5D + sound design.

- **Pelajaran**: tata bahasa shot per bab: establish (judul) - develop (panel/properti) - payoff (gestur mentor + beat emas); potongan selalu tepat di beat.
- **Peta Vimoda**: CUT_TRANSITIONS + whoosh tepat di batas bab; tiap bab punya satu payoff visual (belah dua, tenggelam, berputar, lompat).

## 9. Motionmaxxing - Tejashmakwana/motionmaxxing (1.6k bintang)

"Looksmaxxing untuk motion graphics": skill agen yang mengubah video AI-slop menjadi
film yang terlihat buatan motion designer sungguhan.

- **Pelajaran**: definisi slop = pop berlebihan, gestur acak, teks dan animasi saling balapan; obatnya ritme tenang, hierarki jelas, gerak terencana.
- **Peta Vimoda**: revisi 15 persis ini - overshoot dipangkas, wobble dihapus, kamera 2.5 piksel, satu ide per layar.

## 10. MCP for Blender - ahujasid/mcp-for-blender (34.5k bintang)

Plugin komunitas untuk mengendalikan Blender 3D dari LLM mana pun.

- **Pelajaran**: scene, aktor, dan kamera dipisah eksplisit; kamera adalah kelas satu.
- **Peta Vimoda**: world / karakter / panel konten terpisah; satu-satunya kendali kamera di satu titik (guncangan beat `imp(t)`).

## 11. Blender Skills - arjun988/blender-skills (3.5k bintang)

94 skill Blender spesialis untuk Cursor/Claude Code/Kiro/Codex: pipeline MCP dari
blockout sampai export engine.

- **Pelajaran**: kerjakan bertahap - blockout (layout kasar) dulu, baru detail; jangan langsung render final.
- **Peta Vimoda**: dbg07 (init) - smoke frame kunci - render penuh 1560 frame dua orientasi.

## 12. Dream Loop - achimala/dream-loop (2.3k bintang)

Skill agen untuk visual 3D mengesankan: Blender + image generation + subagent kritikus
(generate - kritik - perbaiki).

- **Pelajaran**: loop kritik wajib sebelum final; hasil mentah tidak boleh langsung dikirim.
- **Peta Vimoda**: smoke composite dilihat mata, diperbaiki, baru render penuh + QA; kalau gagal, perbaiki skrip lalu ulangi.

## 13. Animate (keluarga skill animasi)

Tidak ditemukan satu repo kanonik bernama "Animate" (dua pencarian GitHub API, 2026-11-15).
Keluarga yang paling cocok dengan maksudnya: skill `/animate` pada ctskool/chase-animations
(42 animasi vertikal + explainer satu kalimat), nolangz/pixel2motion (logo raster menjadi
animasi SVG halus + **bukti motion QA**), iart-ai/data-animation-skills (CSV menjadi grafik
bergerak dengan angka eksak), iart-ai/map-animation-skills.

- **Pelajaran**: animasi selesai harus menyertai bukti QA gerak; data/angka dalam animasi harus eksak, bukan dekoratif.
- **Peta Vimoda**: qa07.py memverifikasi durasi, teks, dan kelengkapan frame; angka di layar (5 buku, 1/2+1/2=1) harus benar secara matematika.

## Sintesis: 8 prinsip kerajinan untuk Vimoda

1. **Determinisme**: frame = fungsi murni waktu; tanpa keacakan tanpa benih.
2. **Satu beat-sheet induk**: naskah adalah sumber tunggal waktu untuk narasi, scene, gestur, dan audio.
3. **Token easing**: masuk lembut (overshoot maksimal 10 persen), fisik berbasis gerak, keluar dengan fade cepat.
4. **Stagger berdisiplin**: satu ide per layar; jeda antar elemen 0.3-1.2 detik.
5. **Tata shot per bab**: establish - develop - payoff; potong tepat di beat.
6. **Caption craft**: durasi proporsional kecepatan baca, maksimal dua baris, di atas zona aman aplikasi.
7. **Gaya terkunci**: palet, grade, grain, vignette tetap dari awal sampai akhir.
8. **Loop kritik**: blockout - smoke visual - QA terprogram - baru render final.
