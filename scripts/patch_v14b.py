#!/usr/bin/env python3
"""Aturan baru 31-33 (catatan pemilik studio, revisi video 14) + revisi baris katalog 14.
31: durasi nyaman mengikuti pemahaman, bukan dipatok 52 detik.
32: soft follow rasa "aku yang mau", dilarang meminta follow langsung.
33: tipografi teratur dan terbaca, bukan tulisan unyu kecil."""
import pathlib

R = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
r = R.read_text()

# ---- aturan 31-33 disisipkan setelah butir 30 ----
a30 = "keterbacaan layar kuis diaudit sama ketatnya dengan layar materi sebelum render."
assert r.count(a30) == 1 and "31. Durasi nyaman" not in r
rules = (
    a30
    + "\n\n31. Durasi nyaman mengikuti pemahaman, bukan dipatok (catatan pemilik studio, revisi video 14, permanen): "
    + "durasi TIDAK boleh dipatok angka tetap sehingga bahasan terasa dikejar debt collector atau menggantung - durasi mengikuti "
    + "kebutuhan penonton memahami materi (boleh 52 detik, boleh 74 detik, sesuai berat bahan); setiap layar tampil cukup lama untuk "
    + "dibaca dan dicerna (baris penjelasan minimal sekitar 3 detik plus jeda napas antar bab), subjudul berganti tempo longgar, dan "
    + "kalimat penjelasan wajib tuntas tanpa kesan asal jadi; nilai terbesar video adalah penonton NYAMAN DAN PAHAM, bukan tayangan "
    + "selesai cepat; uji lolos: saat menonton terasa nyaman dan paham, bukan seperti dikejar."
    + "\n\n32. Soft follow rasa \"aku yang mau\" (catatan pemilik studio, revisi video 14, permanen): DILARANG meminta follow, subscribe, "
    + "atau ikuti secara langsung di dalam video; penutup wajib menumbuhkan rasa ingin yang berasal dari penonton sendiri (mereka merasa "
    + "butuh dan MEMILIH mengikuti) lewat kalimat undangan yang menempatkan penonton sebagai pemilik keputusan, bukan perintah "
    + "(contoh lolos: \"Mau nemu aha lagi? Kamu tahu harus ke mana.\"); kalimat undangan mengiringi endcard AKIOMIDA.COM yang tetap "
    + "rata aturan 28; kata FOLLOW, SUBSCRIBE, IKUTI dilarang muncul di semua teks video."
    + "\n\n33. Tipografi teratur dan terbaca, bukan unyu (catatan pemilik studio, revisi video 14, permanen): semua teks penjelasan di "
    + "layar harus rapi, konsisten antar panel, dan besar terbaca di ponsel - DILARANG tulisan kecil-imut yang merusak keterbacaan; "
    + "ukuran minimum praktis pada skala 1080-1920: subjudul Indonesia 46 px, teks penjelasan panel 23-24 px portrait dan 21-24 px "
    + "landscape, soal kuis 26/23 px, kartu kuis 30/26 px, pil 26/25 px, watermark tetap terbaca; grid kartu kuis harus lurus dan "
    + "sejajar (kolom rata); setiap penambahan konten baru wajib diaudit visual sebelum render."
)
r = r.replace(a30, rules)

# ---- baris katalog 14 direvisi (rev2) ----
old_tail = "audio E minor dengan tick mendarat pot dan enam tick faktor 12; penutup bersih aturan 28: konten keluar 49.8, AKIOMIDA.COM sendirian 50.2, bar 50.9-51.4) |"
assert r.count(old_tail) == 1
new_tail = (
    "audio E minor dengan tick mendarat pot dan enam tick faktor 12; penutup bersih aturan 28. "
    + "REVISI 2 (aturan 31-33 ditetapkan permanen): durasi diperpanjang 52 menjadi 74 DETIK karena bahasan terasa dikejar - tempo "
    + "dilonggarkan (19 beat narasi, tiap sub tampil 3,4-5,4 detik, hook 9,6 s, panel prima 10,8 s, komposit 9,2 s, angka 1 5,0 s, "
    + "angka 2 7,8 s, faktorisasi 5,4 s, papan uji 10,8 s, endcard 9,8 s), pertanyaan bahan \"kenapa bisa begitu?\" diangkat jadi beat 3, "
    + "cek bahan 9 (faktor 1, 3, 9) masuk panel komposit sebagai catatan kedua; tipografi diperbesar dan dirapikan semua teks (aturan 33): "
    + "subjudul 46 px, baris panel 23-24 px, soal 26/23 px, kartu kuis 30/26 px dengan grid 2x4 lurus, pil 26/25 px, tanda PETAK TANAM dan "
    + "SEMAI dibesarkan; penutup aturan 32 soft follow rasa \"aku yang mau\": kalimat undangan \"Mau nemu aha lagi? Kamu tahu harus ke mana.\" "
    + "mengiringi endcard 64.2-74.0, kata FOLLOW/SUBSCRIBE/IKUTI dilarang di video; semua cue audio E minor digeser mengikuti timeline baru) |"
)
r = r.replace(old_tail, new_tail)
R.write_text(r)
print("README: aturan 31-33 + revisi baris 14 ok")
