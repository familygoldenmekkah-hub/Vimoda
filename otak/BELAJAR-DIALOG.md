# BELAJAR-DIALOG: Formula Dialog AKIOMIDA v1 (destilasi 5 dataset)

Tanggal studi: 2026-11-25. Sumber: lima dataset dialog roleplay publik yang
diperintahkan pemilik. Dokumen ini WAJIB rujukan tiap episode RP baru;
QA memverifikasi penerapannya (L3 di otak/HUKUM.md).

## Sumber yang dipelajari (entri sungguhan dibaca)

1. `MinSiThu/Multilanguage-RolePlay-Datasets` (MIT) - katalog 36 bahasa,
   basis instruct GPTeacher (situasi -> respons), data di HF
   `jojo-ai-mst/multilingual-roleplay`; premis: "roleplaying can bring
   empathy, which results in more engagement with the user".
2. `Fahmi-XD/tsundere-idtr-dataset` (CSV `id,user,bot`, 4000+ baris) -
   sampel verbatim: "J-jangan meremehkanku! A-aku nggak buruk dalam hal
   ini, oke?!", "(merinding) T-tunggu! A-aku nggak bermaksud—!", arc
   tolak -> justifikasi -> ngaku, gagap huruf awal saat emosi,
   interjeksi "Hmph"/"T-TCH", elipsis menggantung.
3. `HLTCHKUST/Xpersona` (MIT, EMNLP 2021, ada bahasa Indonesia) - persona
   ditulis sebagai 3-4 kalimat fakta pendek ("saya punya dua anjing.",
   "Saya suka mengurus mobil vintage."), dialog = dua orang saling
   mengenal: tanya -> jawab -> cermin ulang fakta lawan.
4. `Orion-zhen/roleplay-dataset` (GPL-3.0, sharegpt) - satu sesi =
   system card + array giliran; satu pesan = aksi *...* berkelindan
   ucapan "..." (contoh Seraphina: aksi panggung sensorik, ucapan
   bertingkat); sesi terkurung satu dunia.
5. `cows21/MOOM-Roleplay-Dialogue` (paper "Maintenance, Organization and
   Optimization of Memory in Ultra-Long Role-Playing Dialogues", dataset
   ZH-4O rata-rata 600 giliran) - memori dua cabang: ringkasan konflik
   plot lintas skala waktu + profil karakter; mekanisme lupa menjaga
   kapasitas; koherensi panjang itu hasil manajemen memori, bukan
   kebetulan.

## DELAPAN FORMULA (F1-F8) + penegakannya

### F1 - KARTU PERSONA (dari Xpersona)
Tiap chara = 3-4 fakta pendek yang SPESIFIK dan dijaga konsisten sepanjang
episode; fakta dipakai ulang minimal dua kali secara alami (bukan dibacakan).
- Penerapan: naskah episode memuat tabel PROFIL per chara.
- QA: fakta yang disebut dalam dialog tidak boleh bertentangan antar pesan.

### F2 - KARTU SISTEM DUNIA (dari Orion-zhen)
Dunia baru per episode (hukum seri 36) ditulis EKSPLISIT sebagai kartu
sistem: nama dunia, jam kanonik, objek bernomor, aturan dunia. Sesi =
dunia; keluar dunia = pelanggaran.
- Penerapan: naskah bagian "KARTU DUNIA" sebelum alur.
- QA: banned words memblokir penanda dunia episode sebelumnya.

### F3 - AKSI BERKELINDAN UCAPAN (dari Orion-zhen + tsundere)
Satu bubble = maksimal dua aksi *...* + ucapan; aksi menjawab konten
(aturan 14: menoleh ke objek bahasan, bukan penghibur); aksi pembuka hanya
di momen emosi atau momen fisik.
- QA: struktur *aksi* tetap italic abu-abu (sudah di engine), jumlah aksi
  per bubble <= 2.

### F4 - ARC TSUN -> DERE (dari tsundere-idtr)
Karakter keras/sombong WAJIB punya arc dalam satu episode: tolak ->
justifikasi -> ngaku; penanda linguistik versi sopan Indonesia: satu-dua
interjeksi khas ("Hmph"), elipsis menggantung di detik keraguan, kalimat
seru di detik penolakan; aksi fisik dalam *...* saat titik balik.
- QA: chara keras didefinisikan di PROFIL; momen "ngaku" wajib ada dan
  menjadi bagian twist/resolusi (bukan banter kosong).

### F5 - TANYA -> JAWAB -> CERMIN (dari Xpersona)
Dinamika giliran: jawaban mengaitkan fakta lawan bicara (cermin), dan
minimal satu dari tiga pesan menutup dengan lemparan balik (pertanyaan,
teaser, tantangan) supaya rantai sebab-akibat tertutup.
- QA: rantai alur tetap diperiksa (tanya-jawab benar, tanpa kehadiran
  mustahil).

### F6 - MEMORI DUA CABANG (dari MOOM)
Episode panjang tetap koheren karena dua ledger:
(a) LEDGER PLOT - satu konflik per episode, dinyatakan jelas, disentuh
    minimal tiga kali dengan eskalasi, diselesaikan di twist;
(b) LEDGER FAKTA - semua angka/nama/aturan yang pernah disebut terkunci
    konsisten sampai akhir (tidak ada angka berubah diam-diam).
- Penerapan: naskah bagian "MEMORI EPISODE" memuat dua ledger; engine
  hanya boleh memakai angka yang ada di ledger (semua hitungan
  terverifikasi kode).

### F7 - SITUASI -> RESPONS (dari GPTeacher/Multilanguage-RP)
Nol pesan generik: uji ganti-dunia - kalau sebuah bubble masih masuk akal
setelah dunia diganti, bubble itu gagal dan harus ditulis ulang spesifik
dunia (terminal/gudang/kelas yang benar).

### F8 - EMPATI = ENGAGEMENT (premis MinSiThu)
Setiap episode wajib punya SATU momen empati nyata: chara mengakui perasaan
chara lain secara sadar (bukan sekadar simpati generic) sebelum penutup;
momen ini yang bikin penonton merasa dianggap, lalu CTA lembut.

## Aplikasi tercatat

- Episode 18 (GRUP JAGA GUDANG) sudah memakai F2, F3, F7 secara instinktif.
- Episode 19 (dunia baru, bahan bilangan cacah) adalah PENERAPAN LENGKAP
  F1-F8 pertama: PROFIL chara, KARTU DUNIA, MEMORI EPISODE, arc tsun-dere
  eksplisit, momen empati sebelum penutup - dicatat di naskah19.md.
