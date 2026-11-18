#!/usr/bin/env python3
"""Aturan 30 (kuis jelas dan besar) + tanda revisi 3 di baris katalog episode 12."""
import pathlib

R = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
r = R.read_text()

anchor = "## Katalog"
rule = """30. Kuis jelas dan besar (catatan pemilik studio, revisi 3 video 12, permanen): penutup kuis DILARANG ngirit dan DILARANG menyuruh penonton menjawab soal yang tidak pernah ditampilkan - keempat soal atau seluruh pertanyaan wajib muncul di layar sebagai papan tugas besar bernomor dengan font besar (aturan 16 mata minus berlaku juga di layar kuis); kartu atau objek kuis dibuat besar dan terurut agar mudah dipindai; instruksi akhir wajib spesifik apa yang dikerjakan dan ke mana jawabannya ditulis (contoh lolos: TULIS JAWABANMU DI KOMENTAR YA; contoh pelanggaran: pil JAWAB KEEMPATNYA tanpa empat soalnya pernah tampil); keterbacaan layar kuis diaudit sama ketatnya dengan layar materi sebelum render.

"""
assert r.count(anchor) == 1 and "Kuis jelas dan besar" not in r
r = r.replace(anchor, rule + anchor)

old = "tiga cue audio pedagogis 13.0/28.5/35.1) |"
new = ("tiga cue audio pedagogis 13.0/28.5/35.1; revisi 3 aturan 30: layar kuis dibangun ulang jadi papan tugas besar TUGAS UNTUKMU dengan keempat "
       "soal bernomor tampil utuh (1. SEMUANYA REAL? 2. MANA RASIONAL? 3. MANA IRASIONAL? 4. KENAPA akar 7 DAN tiga-per-lima BEDA?), enam kartu besar "
       "terurut nilai dengan titik garis menyala, pil spesifik TULIS JAWABANMU DI KOMENTAR YA, cue audio soal dan kartu di-align ulang) |")
assert r.count(old) == 1
r = r.replace(old, new)
R.write_text(r)
print("README: aturan 30 + revisi 3 episode 12 ok")
