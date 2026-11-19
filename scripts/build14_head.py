#!/usr/bin/env python3
"""Episode 14 'Petak Tanam: Bilangan Prima dan Komposit' - persiapan frag_head.html:
- dunia baru PETAK TANAM (aturan 26): rumah tanam kaca sage dengan rak pot
  terracotta, meja tanam dengan baki semai, tanda PETAK TANAM, lampu tumbuh;
- CSS pot tanaman (.pot) untuk hook susun petak;
- judul enam bab baru; pil spesifik baru (aturan 30, beda dari ep08-13);
- dbg14.py path studio diganti ke vimoda14."""
import pathlib

D = pathlib.Path("/home/z/my-project/scripts/vimoda14")
h = (D / "frag_head.html").read_text()

old_c = """/* GUDANG PAPASAN: gudang sepatu dinding crate teal hangat - rak pasangan
   sepatu terpasang di dinding (ikon dunia: sepatu berdua rapi, satu nanggung),
   bangku sortir dengan tumpukan shoebox kardus, tanda PAPASAN di dinding,
   lampu dome industri, lantai beton sejuk dengan marka safety kuning.
   Panel konten plum gelap berbingkai kuning safety (aturan 26: latar BERBEDA
   TOTAL dari Bengkel Tapali, Kota Bilangan, dan semua episode lain).
   Karakter: HANYA bola emas mentor, bulat sejati, tanpa mata (aturan 23).
   Pedagogi pemula aturan 29 dan papan tugas kuis aturan 30 dipatuhi sejak
   rendering pertama. Subjudul zona aman maksimal dua baris (aturan 27);
   watermark AKIOMIDA di tepi paling bawah (aturan 24); penutup bersih
   (aturan 28). */"""
new_c = """/* PETAK TANAM: rumah tanam dinding kaca sage dengan rangka krem - rak pot
   terracotta tiga tingkat di dinding (ikon dunia: pot tersusun rapi),
   meja tanam kayu dengan baki semai hijau, tanda PETAK TANAM di dinding,
   lampu tumbuh dome hangat, lantai paving terakota dengan marka safety
   kuning di jalur mentor. Panel konten plum gelap berbingkai kuning safety
   (aturan 26: latar BERBEDA TOTAL dari Gudang Papasan dan semua episode
   lain). Karakter: HANYA bola emas mentor, bulat sejati, tanpa mata
   (aturan 23). Pedagogi pemula aturan 29 dan papan tugas kuis aturan 30
   dipatuhi sejak rendering pertama. Subjudul zona aman maksimal dua baris
   (aturan 27); watermark AKIOMIDA di tepi paling bawah (aturan 24);
   penutup bersih (aturan 28). */"""
assert old_c in h
h = h.replace(old_c, new_c)

reps = [
    ("background:repeating-linear-gradient(90deg,rgba(56,86,76,.16) 0 4px,transparent 4px 118px),\n  linear-gradient(180deg,#E6E9DA 0%,#D4DAC6 100%)}",
     "background:repeating-linear-gradient(90deg,rgba(255,253,246,.55) 0 5px,transparent 5px 128px),\n  repeating-linear-gradient(0deg,rgba(255,253,246,.35) 0 4px,transparent 4px 150px),\n  linear-gradient(180deg,#DCE8D6 0%,#C4D8B8 100%)}"),
    ("#ceiling .beam{position:absolute;background:linear-gradient(180deg,#9FB8AC,#7E9A8C);",
     "#ceiling .beam{position:absolute;background:linear-gradient(180deg,#E8E2D0,#C4BCA4);"),
    ("#concrete{position:absolute;left:0;width:100%;background:linear-gradient(180deg,#BCC2C6 0%,#A9B0B7 100%)}",
     "#concrete{position:absolute;left:0;width:100%;background:linear-gradient(180deg,#D8A87A 0%,#C69064 100%)}"),
    ("#baseboard{position:absolute;left:0;width:100%;background:#7E9A8C}",
     "#baseboard{position:absolute;left:0;width:100%;background:#A87A52}"),
    ("#tableT .slab{position:absolute;background:linear-gradient(180deg,#C8B58C,#A8946A);",
     "#tableT .slab{position:absolute;background:linear-gradient(180deg,#C8A06A,#B08850);"),
    ("#tableT .leg{position:absolute;background:#8A7A5A;border-radius:4px;width:26px}",
     "#tableT .leg{position:absolute;background:#8A6A44;border-radius:4px;width:26px}"),
    ("#boardSheet .board{position:absolute;background:linear-gradient(180deg,#D9A85E,#C08E48);border:3px solid #8A6A3A;",
     "#boardSheet .board{position:absolute;background:linear-gradient(180deg,#5E6E52,#4C5C42);border:3px solid #3E4C34;"),
    ("#boardSheet .pline{position:absolute;background:#8A6A3A;border-radius:2px}",
     "#boardSheet .pline{position:absolute;background:#8AA07A;border-radius:2px}"),
    ("#boardSheet .plab{position:absolute;font-family:'JetBrains Mono','DejaVu Sans Mono',monospace;font-weight:800;color:#5E4A26}",
     "#boardSheet .plab{position:absolute;font-family:'JetBrains Mono','DejaVu Sans Mono',monospace;font-weight:800;color:#C8D8B0}"),
    ("#boardSheet .tri{position:absolute;width:0;height:0;border-left:12px solid transparent;border-right:12px solid transparent;border-bottom:22px solid #4CAF7A}",
     "#boardSheet .tri{position:absolute;width:0;height:0;border-left:12px solid transparent;border-right:12px solid transparent;border-bottom:22px solid #D08A50}"),
    ("#pegboard .board{position:absolute;background:#EFE8D0;border:3px solid #8A9A8C;border-radius:8px;\n  background-image:radial-gradient(circle,#C2C6AE 1.6px,transparent 1.8px);background-size:16px 16px;",
     "#pegboard .board{position:absolute;background:#EFE8D0;border:3px solid #8A8A6E;border-radius:8px;\n  background-image:radial-gradient(circle,#C4C8AC 1.6px,transparent 1.8px);background-size:16px 16px;"),
    ("#ruler .body{position:absolute;background:linear-gradient(180deg,#C8B58C,#A8946A);border:3px solid #8A6A3A;border-radius:6px;",
     "#ruler .body{position:absolute;background:linear-gradient(180deg,#C8A06A,#B08850);border:3px solid #8A6A44;border-radius:6px;"),
    (".shelf{position:absolute;background:linear-gradient(180deg,#C8B58C,#A8946A);border:3px solid #8A6A3A;border-radius:6px;box-shadow:0 6px 14px rgba(30,18,4,.3);will-change:opacity}",
     ".shelf{position:absolute;background:linear-gradient(180deg,#C8A06A,#B08850);border:3px solid #8A6A44;border-radius:6px;box-shadow:0 6px 14px rgba(30,18,4,.3);will-change:opacity}"),
    (".shoe{position:absolute;will-change:transform,opacity}\n.shoe .bd{position:absolute;border-radius:16px 12px 5px 5px;background:linear-gradient(180deg,#E8843A,#C85E20);box-shadow:0 6px 14px rgba(30,18,4,.35)}\n.shoe .sol{position:absolute;background:#FFFDF6;border-radius:5px}\n.shoe.lone .bd{background:linear-gradient(180deg,#9AA6B4,#6E7A8A)}",
     ".pot{position:absolute;will-change:transform,opacity}\n.pot .pb{position:absolute;border-radius:6px 6px 10px 10px;background:linear-gradient(180deg,#D08A50,#B07038);box-shadow:0 6px 14px rgba(30,18,4,.35)}\n.pot .lf{position:absolute;border-radius:50% 50% 42% 42%;background:linear-gradient(180deg,#6EA85A,#4C8A40)}\n.pot.line .pb{background:linear-gradient(180deg,#9AA6B4,#6E7A8A)}"),
]
for a, b in reps:
    assert a in h, f"anchor CSS hilang: {a[:60]}"
    h = h.replace(a, b)

tit = [("GENAP ATAU GANJIL?", "PRIMA DAN KOMPOSIT"), ("APA ITU GENAP?", "APA ITU PRIMA?"),
       ("APA ITU GANJIL?", "APA ITU KOMPOSIT?"), ("ANGKA AKHIRNYA", "ISTIMEWANYA 2"),
       ("POLA PENJUMLAHAN", "FAKTORISASI PRIMA"), ("GILIRANMU!", "PERIKSA FAKTOR!")]
for a, b in tit:
    assert f'>{a}</div>' in h
    h = h.replace(f'>{a}</div>', f'>{b}</div>', 1)
assert '<div id="pil">KIRIM JAWABANMU DI KOMENTAR YA</div>' in h
h = h.replace('<div id="pil">KIRIM JAWABANMU DI KOMENTAR YA</div>', '<div id="pil">JAWAB DI KOLOM KOMENTAR YA</div>')
(D / "frag_head.html").write_text(h)
print("frag_head: dunia Petak Tanam + CSS pot + judul + pil")

d = (D / "dbg14.py").read_text()
d = d.replace('pathlib.Path("/home/z/my-project/scripts/vimoda13")', 'pathlib.Path("/home/z/my-project/scripts/vimoda14")')
d = d.replace("Debug engine papasan", "Debug engine petak")
(D / "dbg14.py").write_text(d)
print("dbg14: path vimoda14")
