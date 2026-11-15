#!/usr/bin/env python3
"""Rombak total revisi 16 video 07: dunia nyata Kota Bilangan, karakter hidup,
tanpa menembus objek, watermark AKIOMIDA wajib selalu terlihat.
naskah07.md + README.md."""
import pathlib

NAS = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/naskah07.md")
RED = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")

def rep(txt, old, new, n=1, tag=""):
    c = txt.count(old)
    if c != n:
        raise SystemExit(f"[{tag}] ditemukan {c}x (harus {n}x): {old[:70]!r}")
    print(f"[{tag}] ok")
    return txt.replace(old, new)

n = NAS.read_text()
n = rep(n, "# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Revisi 15)",
"# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Rombak Total Revisi 16)", 1, "judul")
n = rep(n, "## Studi wawasan 13 skill motion GitHub (2026-11-15)",
"""## Rombak total revisi 16 (mandat kreator: desain lain sama sekali, dunia nyata, karakter hidup, watermark wajib)

1. DUNIA BARU "KOTA BILANGAN" (bukan panggung modeling): gedung pastel berjendela, empat jendela kedai nyata di muka gedung (kedai buku 5 BUKU, kafe termometer -5 derajat, kedai pizza setengah lingkaran 1/2, kedai roti lingkaran pi), jalan raya beraspal dengan marka putus-putus dan tiga mobil yang lewat, trotoar berubin, pohon yang bergoyang, lampu jalan; waktu berjalan dari siang ke senja (langit berubah, bintang muncul, lampu jalan menyala, jendela gedung menghangat, kunang-kunang keluar).
2. KARAKTER HIDUP: bola emas mentor dipertahankan dan kini punya LIMA TEMAN BOLA berwarna (Asli cyan, Cacah ungu, Bulat pink, Rasional hijau, Irasional emas) sebagai perwujudan kelompok bilangan. Semua bola BERMATA: berkedip natural, pupil menatap subjek yang sedang dibahas dan saling menatap. Teman-teman memantul masuk satu per satu ke alun-alun, melambaikan badan, melompat ke podium tangga untuk "foto keluarga bilangan", pamit menggelinding keluar layar saat bab aturan agar fokus tunggal, lalu kembali menggelinding masuk di penutup dan melompat kecil serempak merayakan.
3. TIDAK PERNAH MENEMBUS OBJEK: lintasan mentor (tabel waypoint di trotoar) dihitung bebas dari semua elemen - jendela kedai berada di muka gedung DI ATAS kepala, papan tulis kafe berdiri di band depan kiri saat keluarga sudah pamit, teman-teman di band belakang, lampu jalan di sudut foreground bawah; bangku taman dihapus karena konflik lintasan.
4. WATERMARK AKIOMIDA WAJIB SELALU TERLIHAT: pil gelap kecil di bawah layar sepanjang video, siang maupun senja; AKIOMIDA.COM tetap hanya menyala sekali di akhir dengan reveal tenang (45.8-47.2), pil TULIS DI KOMEN 47.5, bar gradien 48.6.
5. NARASI TETAP: 16 beat subtitle, durasi baca, dan cue audio inti tidak berubah; yang diganti total adalah dunia, karakter, dan koreografinya.

## Studi wawasan 13 skill motion GitHub (2026-11-15)""", 1, "rombak16")
NAS.write_text(n)
print("naskah rombak total 16 ok")

r = RED.read_text()
r = rep(r, "(blockout - smoke visual - QA terprogram - render final) sebelum push.",
"""(blockout - smoke visual - QA terprogram - render final) sebelum push.
21. Watermark AKIOMIDA wajib (revisi 16): pil gelap kecil bertuliskan AKIOMIDA harus terlihat SELALU di bagian bawah layar sepanjang video, siang maupun senja, semua orientasi; sedangkan AKIOMIDA.COM tetap hanya menyala satu kali di akhir dengan reveal tenang.
22. Karakter hidup dan fisikal (revisi 16): bola karakter bermata - berkedip natural dan pupil menatap subjek yang dibahas; karakter TIDAK BOLEH menembus objek atau karakter lain - semua posisi properti (jendela kedai di atas, papan di band depan, teman di band belakang, lampu di foreground) dipilih agar bebas lintasan mentor; aktivitas harus seperti dunia nyata: menggelinding antar stasiun, memantul masuk, melompat ke podium, pamit menggelinding keluar dan kembali masuk, perayaan serempak - bukan berdiri diam seperti pajangan.""", 1, "aturan 21-22")
r = rep(r, "(revisi 15: karakter tanpa nama apa pun (header chat dan watermark dihapus), ritme tenang anti balapan (pop/guncangan dipangkas), AKIOMIDA.COM hanya muncul di akhir dengan reveal lambat; revisi 6:",
"(revisi 16: rombak total menjadi dunia nyata Kota Bilangan - kedai berjendela, jalan raya dengan mobil, trotoar, pohon, lampu, siang menuju senja; lima teman bola bermata yang memantul masuk, melompat ke podium foto keluarga, pamit lalu kembali; mentor tidak pernah menembus objek; watermark AKIOMIDA wajib selalu terlihat dalam pil gelap; revisi 15: karakter tanpa nama apa pun, ritme tenang anti balapan, AKIOMIDA.COM hanya muncul di akhir dengan reveal lambat; revisi 6:", 1, "baris 07")
RED.write_text(r)
print("README rombak total 16 ok")
