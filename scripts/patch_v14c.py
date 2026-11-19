#!/usr/bin/env python3
"""Rev3 video 14 (catatan pemilik studio: terasa flat, belajar dramaturgi anime,
ajakan follow harus tersisip bukan promosi):
- Aturan 32 direvisi: ajakan follow wajib tersisip lewat teaser petak berikutnya,
  dilarang kalimat promosi konten/brand (kalimat lama jadi contoh pelanggaran).
- Aturan 34 baru permanen: dramaturgi anime diolah untuk format kita.
- Baris katalog 14 ditambah catatan REVISI 3."""
import pathlib

R = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
r = R.read_text()

# ---- revisi aturan 32 ----
old32 = ('32. Soft follow rasa "aku yang mau" (catatan pemilik studio, revisi video 14, permanen): DILARANG meminta follow, subscribe, '
         'atau ikuti secara langsung di dalam video; penutup wajib menumbuhkan rasa ingin yang berasal dari penonton sendiri (mereka merasa '
         'butuh dan MEMILIH mengikuti) lewat kalimat undangan yang menempatkan penonton sebagai pemilik keputusan, bukan perintah '
         '(contoh lolos: "Mau nemu aha lagi? Kamu tahu harus ke mana."); kalimat undangan mengiringi endcard AKIOMIDA.COM yang tetap '
         'rata aturan 28; kata FOLLOW, SUBSCRIBE, IKUTI dilarang muncul di semua teks video.')
new32 = ('32. Soft follow tersisip, bukan promosi (catatan pemilik studio, revisi video 14, REVISI 3 permanen): DILARANG meminta follow, '
         'subscribe, atau ikuti secara langsung, dan DILARANG JUGA kalimat yang berbau promosi konten sendiri di penutup '
         '(contoh pelanggaran: "Mau nemu aha lagi? Kamu tahu harus ke mana." - terasa jualan, bukan ajakan); penutup wajib menumbuhkan '
         'rasa ingin yang berasal dari penonton sendiri lewat TEASER kesinambungan cerita dunia episode - memberi rasa petak/kebun/ruang '
         'berikutnya sudah menunggu tanpa menyebut follow atau menjual apa pun (contoh lolos: "Benih petak berikutnya sudah disemai."); '
         'teaser mengiringi endcard AKIOMIDA.COM yang tetap rata aturan 28; kata FOLLOW, SUBSCRIBE, IKUTI dilarang muncul di semua teks '
         'video dan dicek otomatis QA.')
assert old32 in r, "aturan 32 tidak ditemukan"
r = r.replace(old32, new32)

# ---- aturan 34 baru setelah aturan 33 ----
a33_tail = "setiap penambahan konten baru wajib diaudit visual sebelum render."
assert r.count(a33_tail) == 1 and "34. Dramaturgi anime" not in r
rules = (
    a33_tail
    + "\n\n34. Dramaturgi anime diolah, bukan disalin (catatan pemilik studio, revisi video 14, permanen; video terasa flat adalah "
    + "pelanggaran): pelajari pola penceritaan anime dan olah yang cocok untuk format kita menjadi struktur empat bab kishotenketsu "
    + "(ki buka dunia dan misteri, sho kembangkan dua kelompok, ten TWIST yang mengguncang, ketsu resolusi dan jurus), penonton sebagai "
    + "protagonis yang disapa di dalam petualangan dunia (angka disortir jadi tim, bukan kuliah definisi); wajib ada: jeda dramatis (ma) "
    + "berdurasi sekitar 0,8-1,2 detik sebelum twist besar (panel kosong, musik hening total, mentor jalan ke tengah panggung), impact "
    + "frame speedlines pada momen twist (efek ini khusus sekali per video, konsisten aturan 12), jurus bernama untuk teknik penting "
    + "(contoh: stempel JURUS URAI PRIMA! di faktorisasi), power-up singkat karakter saat jurus keluar (inti bola menyala berdenyut), "
    + "framing tantangan final untuk uji (kartu masuk formasi dari kiri-kanan berselang, header TANTANGAN UNTUKMU), chip EPISODE di "
    + "kartu judul, dan teaser aturan 32 sebagai penutup; reaksi mentor menjawab beat (hop kaget di twist, siaga sebelum tantangan); "
    + "yang TIDAK diadaptasi dari anime: karakter kedua atau angka berwajah, voice over, konflik kekerasan, OP/ED, dan melodrama berlebihan "
    + "- tetap satu bola emas tanpa mata dan tanpa suara; uji lolos: penonton merasa menonton kisah petualangan kecil, bukan tontonan "
    + "penjelasan yang datar."
)
r = r.replace(a33_tail, rules)

# ---- baris katalog 14: tambah catatan REVISI 3 ----
tail = "semua cue audio E minor digeser mengikuti timeline baru) |"
assert r.count(tail) == 1
new_tail = (
    "semua cue audio E minor digeser mengikuti timeline baru. "
    + "REVISI 3 (aturan 34 ditetapkan permanen + aturan 32 direvisi): versi rev2 dinilai FLAT dan tidak seru - dramaturgi anime diolah "
    + "untuk format kita, bukan disalin; durasi 74 menjadi 78 detik dengan struktur kishotenketsu: arc dua tim (beat 4 angka disortir jadi "
    + "dua tim, beat 9 itu tim dua), jeda dramatis ma 33.4-34.2 (panel kosong, musik hening total, mentor jalan ke tengah panggung) "
    + "sebelum TWIST angka 1 dengan impact frame speedlines dan spotlight (efek khusus sekali per video), mentor hop kaget di twist dan "
    + "pose siaga sebelum tantangan, jurus bernama stempel JURUS URAI PRIMA! 51.8 dengan power-up inti bola menyala berdenyut 50.6-52.8 "
    + "plus run tangga nada menaik di audio, uji dibingkai TANTANGAN UNTUKMU dengan delapan kartu masuk formasi dari kiri-kanan berselang "
    + "59.4-60.3 dan kick formasi, chip EPISODE 14 di kartu judul, fanfare kecil C-E-G-C di endcard 68.2, dan ajakan follow tersisip "
    + "aturan 32 rev3: teaser \"Benih petak berikutnya sudah disemai.\" 73.4 (kalimat lama Mau nemu aha lagi dikategorikan promosi dan "
    + "diblokir QA); yang sengaja tidak diadaptasi: angka berwajah, voice over, konflik kekerasan, OP/ED; narasi 21 beat tiap sub 2,7-5,0 "
    + "detik, QA lolos penuh) |"
)
r = r.replace(tail, new_tail)
R.write_text(r)
print("README: aturan 32 rev3 + aturan 34 baru + baris 14 rev3 ok")
