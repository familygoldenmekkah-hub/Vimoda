#!/usr/bin/env python3
"""Revisi 17 video 07: bola bulat sejati tanpa mata, karakter tambahan dihapus,
label masuk zona aman sosmed. naskah07.md + README.md."""
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
n = rep(n, "# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Rombak Total Revisi 16)",
"# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Revisi 17)", 1, "judul")
n = rep(n, "## Studi wawasan 13 skill motion GitHub (2026-11-15)",
"""## Revisi 17 (mandat kreator: bola harus bulat bukan kotak, tanpa mata, karakter tambahan dihapus, label masuk zona aman sosmed)

1. BOLA BULAT SEJATI: ditemukan bug class CSS yang membuat bola tampil sebagai kotak dengan mata lepas melayang di bawah badan (tangkapan layar kreator). Diperbaiki: bola mentor kini lingkaran sempurna (border-radius penuh) dengan kilau halus, TANPA mata dan tanpa pipi.
2. KARAKTER TAMBAHAN DIHAPUS: lima teman bola dinilai tidak berguna sehingga dibuang seluruhnya (pantulan masuk, podium tangga, piringan angka di kaki, pamit-kembali). Kelompok bilangan kembali tampil sebagai LIMA UBIN PAPAN TOKO (ASLI/CACAH/BULAT/RASIONAL/IRASIONAL + contoh angka + label EN) di S2 (muncul 18.4/19.0/19.6/20.0/23.5 sesuai cue audio), dan keluarga bilangan sebagai PANEL DAFTAR 5 BARIS di S3 (baris muncul 27.0-31.8 sesuai tick audio). Mentor bola emas tetap satu-satunya karakter.
3. ZONA AMAN SOSMED: subjudul naik dari 1272 ke 1170 (portrait) dan 830 ke 740 (landscape), lebar pil dipangkas (max 760/1300) agar jauh dari tepi; watermark AKIOMIDA naik dari dasar layar (1848/1016) ke 1345/920 sehingga tidak tertutup tombol/caption aplikasi sosmed; papan CTA dinaikkan (430/240).
4. Aman dari saling tutup: bola mentor berdiri di groundY 1120/660 dengan jarak bebas di atas subjudul dan di bawah jendela kedai; ubin kelompok dan panel keluarga menempati zona tengah yang sama namun bergantian bab.
5. Narasi 16 beat, durasi, dan dunia kota (kedai, mobil, senja) tetap dari rombak total revisi 16.

## Studi wawasan 13 skill motion GitHub (2026-11-15)""", 1, "revisi17")
NAS.write_text(n)
print("naskah revisi 17 ok")

r = RED.read_text()
r = rep(r, "22. Karakter hidup dan fisikal (revisi 16): bola karakter bermata - berkedip natural dan pupil menatap subjek yang dibahas; karakter TIDAK BOLEH menembus objek atau karakter lain - semua posisi properti (jendela kedai di atas, papan di band depan, teman di band belakang, lampu di foreground) dipilih agar bebas lintasan mentor; aktivitas harus seperti dunia nyata: menggelinding antar stasiun, memantul masuk, melompat ke podium, pamit menggelinding keluar dan kembali masuk, perayaan serempak - bukan berdiri diam seperti pajangan.",
"""22. Karakter fisikal (revisi 17): karakter TIDAK BOLEH menembus objek - semua posisi properti (jendela kedai di atas, papan di band depan, lampu di foreground) dipilih agar bebas lintasan mentor; aktivitas seperti dunia nyata: menggelinding antar stasiun, terbelah dua lalu menyatu, melompat perayaan - bukan berdiri diam seperti pajangan.
23. Bentuk dan jumlah karakter (revisi 17): karakter bola HARUS bulat sempurna (border-radius penuh - wajib set class CSS pada elemen inti bola, jangan mengandalkan inline style) dan TANPA mata; TIDAK BOLEH menambah karakter tambahan tanpa fungsi naratif yang jelas - jika tidak berperan dalam cerita, jangan dipakai; kelompok/keluarga bilangan cukup tampil sebagai papan/ubin/panel.
24. Zona aman sosmed (revisi 17): subjudul maksimal sekitar 61% tinggi layar (portrait 1170/1920, landscape 740/1080), lebar pil subjudul menjauh dari tepi (maks 760 px portrait, 1300 px landscape), watermark AKIOMIDA sekitar 70% tinggi (1345/920) bukan di dasar layar, papan CTA di zona tengah - semuanya agar tidak tertutup caption, tombol, dan UI aplikasi sosmed.""", 1, "aturan 22-24")
r = rep(r, "(revisi 16: rombak total menjadi dunia nyata Kota Bilangan - kedai berjendela, jalan raya dengan mobil, trotoar, pohon, lampu, siang menuju senja; lima teman bola bermata yang memantul masuk, melompat ke podium foto keluarga, pamit lalu kembali; mentor tidak pernah menembus objek; watermark AKIOMIDA wajib selalu terlihat dalam pil gelap; revisi 15:",
"(revisi 17: bola mentor bulat sejati tanpa mata (bug kotak-mata-lepas diperbaiki), lima teman bola dihapus karena tidak berguna - kelompok tampil sebagai ubin papan toko dan keluarga sebagai panel daftar; semua label naik ke zona aman sosmed (subjudul 1170/740, watermark 1345/920); revisi 16: rombak total dunia nyata Kota Bilangan - kedai berjendela, jalan raya dengan mobil, trotoar, pohon, lampu, siang menuju senja; mentor tidak pernah menembus objek; watermark AKIOMIDA wajib selalu terlihat dalam pil gelap; revisi 15:", 1, "baris 07")
RED.write_text(r)
print("README revisi 17 ok")
