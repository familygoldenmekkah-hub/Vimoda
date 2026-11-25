#!/usr/bin/env python3
"""Patch frag_head.html + frag_render.js untuk VIDEO 17: ganti komentar
dunia lama (penanda video 16 terlarang di QA17) dan default kick diagram."""
from pathlib import Path

HERE = Path(__file__).parent

OLD_HEAD_COMMENT = """/* GRUP BAHAS FYP - VIDEO 16, MODEL FOKUS ala referensi chat story (rev13)
   Pemilik upload referensi TikTok chat story: latar hitam pekat, SATU
   bubble besar di tengah per saat (fokus penuh ke pesan), bubble gaya
   WhatsApp (putih untuk anggota, hijau untuk KAMU, waktu + Dibaca v-v
   DI DALAM bubble), dan sisipan reaksi meme (hard cut, zoom lambat,
   mata menyala, shake) di antara babak. Model ini jadi hukum seri baru:
   MODEL FOKUS. Warisan terkunci tetap jalan: tanpa indikator pengetikan,
   20 pesan utuh jeda lega, dialog 60px, dialog manusiawi tanpa kalimat
   tema dan tanpa label di ucapan, alur rantai sebab-akibat tertutup,
   diagram menyala, papan soal milik ???, teaser lanjutan. Materi:
   bilangan berpangkat (blog Yuyanaka Pikosa, 23 Nov 2026). Watermark
   AKIOMIDA tetap di posisi tinggi (2x jarak awal) permintaan pemilik. */"""
NEW_HEAD_COMMENT = """/* GRUP RESEP GAGAL - VIDEO 17, MODEL FOKUS ala referensi chat story (rev13)
   Pemilik upload referensi TikTok chat story: latar hitam pekat, SATU
   bubble besar di tengah per saat (fokus penuh ke pesan), bubble gaya
   WhatsApp (putih untuk anggota, hijau untuk KAMU, waktu + Dibaca v-v
   DI DALAM bubble), dan sisipan reaksi meme (hard cut, zoom lambat,
   mata menyala, shake) di antara babak. Model ini jadi hukum seri baru:
   MODEL FOKUS. Warisan terkunci tetap jalan: tanpa indikator pengetikan,
   20 pesan utuh jeda lega, dialog 60px, dialog manusiawi tanpa kalimat
   tema dan tanpa label di ucapan, alur rantai sebab-akibat tertutup,
   diagram menyala, papan soal milik ???, teaser lanjutan. Materi:
   bilangan desimal (blog Yuyanaka, Nov 2026). Watermark AKIOMIDA tetap
   di posisi tinggi (2x jarak awal) permintaan pemilik. */"""

OLD_RENDER_HEAD = """/* ---------- LIPATAN KE-42 rev15: render per frame, MODEL FOKUS
   ala referensi chat story yang diupload pemilik: SATU bubble fokus
   besar di tengah layar hitam (pesan lama memudar begitu balasan datang),
   kartu ilustrasi hard-cut di sela babak, kamera hanyut di #rig, punch
   momen, dolly zoom foto, reveal ??? slow-motion, diagram menyala, papan
   slide-up, endcard tenang, tanpa indikator pengetikan sama sekali.
   rev15: semua waktu dari TM (frag_time.js) mengikuti durasi voice. ---------- */"""
NEW_RENDER_HEAD = """/* ---------- KOMA TAK BERUJUNG rev16: render per frame, MODEL FOKUS
   ala referensi chat story yang diupload pemilik: SATU bubble fokus
   besar di tengah layar hitam (pesan lama memudar begitu balasan datang),
   kartu ilustrasi hard-cut di sela babak, kamera hanyut di #rig, punch
   momen, dolly zoom foto, reveal ??? slow-motion, diagram menyala, papan
   slide-up, endcard tenang, tanpa indikator pengetikan sama sekali.
   rev15-16: semua waktu dari TM (frag_time.js) mengikuti durasi voice. ---------- */"""

head = (HERE / "frag_head.html").read_text()
assert OLD_HEAD_COMMENT in head, "komentar frag_head tidak cocok"
head = head.replace(OLD_HEAD_COMMENT, NEW_HEAD_COMMENT)
assert ">HITUNGAN STOPLES<" in head
head = head.replace(">HITUNGAN STOPLES<", ">AWAS KELIRU<")
(HERE / "frag_head.html").write_text(head)

ren = (HERE / "frag_render.js").read_text()
assert OLD_RENDER_HEAD in ren, "komentar frag_render tidak cocok"
ren = ren.replace(OLD_RENDER_HEAD, NEW_RENDER_HEAD)
ren = ren.replace("angka pangkat naik pelan di babak hitungan",
                  "angka desimal naik pelan di babak hitungan")
(HERE / "frag_render.js").write_text(ren)

bad = ("LIPATAN KE-42", "pangkat", "GRUP BAHAS FYP", "FYP", "berpangkat")
for f in ("frag_head.html", "frag_render.js"):
    t = (HERE / f).read_text()
    hits = [b for b in bad if b in t]
    print(f, "bersih" if not hits else f"MASIH: {hits}")
