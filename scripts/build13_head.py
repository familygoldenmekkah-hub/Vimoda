#!/usr/bin/env python3
"""Episode 13 'Papasan: Bilangan Genap dan Ganjil' - persiapan frag_head.html:
- dunia baru GUDANG PAPASAN (aturan 26): gudang sepatu dinding crate teal,
  rak pasangan sepatu di dinding, bangku sortir shoebox, tanda PAPASAN;
- CSS sepatu (.shoe) untuk hook pasangan; rak (.shelf);
- judul enam bab baru; pil spesifik baru (aturan 30, beda dari ep12);
- dbg13.py path studio diganti ke vimoda13."""
import pathlib

D = pathlib.Path("/home/z/my-project/scripts/vimoda13")
h = (D / "frag_head.html").read_text()

# 1) komentar dunia
old_c = """/* BENGKEL TAPALI: workshop pengukur kayu maple terang - dinding panel maple
   dengan strip vertikal, PENGgaris RAKSASA di dinding sebagai garis bilangan
   (ikson dunia), meja kerja dengan proyek papan berlabel ukur 1,25 m,
   pegboard perforasi dengan alat gantung, lampu dome putih, lantai beton
   hangat dengan marka safety kuning. Panel konten plum gelap berbingkai
   kuning safety (aturan 26: latar BERBEDA TOTAL dari Rumah Peta Kartika,
   Dapoer Posya, dan semua episode lain). Karakter: HANYA bola emas mentor,
   bulat sejati, tanpa mata (aturan 23). Subjudul zona aman maksimal dua
   baris (aturan 27); watermark AKIOMIDA di tepi paling bawah (aturan 24);
   penutup bersih (aturan 28). */"""
new_c = """/* GUDANG PAPASAN: gudang sepatu dinding crate teal hangat - rak pasangan
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
assert old_c in h
h = h.replace(old_c, new_c)

# 2) palet dunia gudang
reps = [
    ("background:repeating-linear-gradient(90deg,rgba(120,90,40,.10) 0 4px,transparent 4px 118px),\n  linear-gradient(180deg,#EBD9B4 0%,#DFC99C 100%)}",
     "background:repeating-linear-gradient(90deg,rgba(56,86,76,.16) 0 4px,transparent 4px 118px),\n  linear-gradient(180deg,#E6E9DA 0%,#D4DAC6 100%)}"),
    ("#ceiling .beam{position:absolute;background:linear-gradient(180deg,#C8A86E,#A8894E);",
     "#ceiling .beam{position:absolute;background:linear-gradient(180deg,#9FB8AC,#7E9A8C);"),
    ("#concrete{position:absolute;left:0;width:100%;background:linear-gradient(180deg,#C9BFAE 0%,#B8AD99 100%)}",
     "#concrete{position:absolute;left:0;width:100%;background:linear-gradient(180deg,#BCC2C6 0%,#A9B0B7 100%)}"),
    ("#baseboard{position:absolute;left:0;width:100%;background:#A8894E}",
     "#baseboard{position:absolute;left:0;width:100%;background:#7E9A8C}"),
    ("#tableT .slab{position:absolute;background:linear-gradient(180deg,#D9B87C,#C8A86E);",
     "#tableT .slab{position:absolute;background:linear-gradient(180deg,#C8B58C,#A8946A);"),
    ("#tableT .leg{position:absolute;background:#A8894E;border-radius:4px;width:26px}",
     "#tableT .leg{position:absolute;background:#8A7A5A;border-radius:4px;width:26px}"),
    ("#boardSheet .board{position:absolute;background:linear-gradient(180deg,#E3C288,#D4AE6E);border:3px solid #A8894E;",
     "#boardSheet .board{position:absolute;background:linear-gradient(180deg,#D9A85E,#C08E48);border:3px solid #8A6A3A;"),
    ("#boardSheet .pline{position:absolute;background:#5C7AA8;border-radius:2px}",
     "#boardSheet .pline{position:absolute;background:#8A6A3A;border-radius:2px}"),
    ("#boardSheet .plab{position:absolute;font-family:'JetBrains Mono','DejaVu Sans Mono',monospace;font-weight:800;color:#3E5C8A}",
     "#boardSheet .plab{position:absolute;font-family:'JetBrains Mono','DejaVu Sans Mono',monospace;font-weight:800;color:#5E4A26}"),
    ("#boardSheet .tri{position:absolute;width:0;height:0;border-left:12px solid transparent;border-right:12px solid transparent;border-bottom:22px solid #D97A2E}",
     "#boardSheet .tri{position:absolute;width:0;height:0;border-left:12px solid transparent;border-right:12px solid transparent;border-bottom:22px solid #4CAF7A}"),
    ("#pegboard .board{position:absolute;background:#E8DCC0;border:3px solid #C8A86E;border-radius:8px;\n  background-image:radial-gradient(circle,#C4B48E 1.6px,transparent 1.8px);background-size:16px 16px;",
     "#pegboard .board{position:absolute;background:#EFE8D0;border:3px solid #8A9A8C;border-radius:8px;\n  background-image:radial-gradient(circle,#C2C6AE 1.6px,transparent 1.8px);background-size:16px 16px;"),
    ("#ruler .body{position:absolute;background:linear-gradient(180deg,#F7EFD8,#E8D9B0);border:3px solid #C8A86E;border-radius:6px;",
     "#ruler .body{position:absolute;background:linear-gradient(180deg,#C8B58C,#A8946A);border:3px solid #8A6A3A;border-radius:6px;"),
]
for a, b in reps:
    assert a in h, f"anchor CSS hilang: {a[:60]}"
    h = h.replace(a, b)

# 3) CSS sepatu + rak (disisipkan sebelum .panelI)
shoe_css = """.shelf{position:absolute;background:linear-gradient(180deg,#C8B58C,#A8946A);border:3px solid #8A6A3A;border-radius:6px;box-shadow:0 6px 14px rgba(30,18,4,.3);will-change:opacity}
.shoe{position:absolute;will-change:transform,opacity}
.shoe .bd{position:absolute;border-radius:16px 12px 5px 5px;background:linear-gradient(180deg,#E8843A,#C85E20);box-shadow:0 6px 14px rgba(30,18,4,.35)}
.shoe .sol{position:absolute;background:#FFFDF6;border-radius:5px}
.shoe.lone .bd{background:linear-gradient(180deg,#9AA6B4,#6E7A8A)}
.panelI"""
assert ".panelI" in h
h = h.replace(".panelI", shoe_css, 1)

# 4) judul enam bab + pil
tit = [("BEDA TAPI REAL", "GENAP ATAU GANJIL?"), ("APA ITU REAL?", "APA ITU GENAP?"),
       ("DUA KELOMPOK", "APA ITU GANJIL?"), ("GARIS BILANGAN", "ANGKA AKHIRNYA"),
       ("KENAPA PENTING?", "POLA PENJUMLAHAN"), ("SEMUA REAL KAH?", "GILIRANMU!")]
for a, b in tit:
    assert f'id="t{tit.index((a,b))}">{a}</div>' in h or f'>{a}</div>' in h
    h = h.replace(f'>{a}</div>', f'>{b}</div>', 1)
assert '<div id="pil">TULIS JAWABANMU DI KOMENTAR YA</div>' in h
h = h.replace('<div id="pil">TULIS JAWABANMU DI KOMENTAR YA</div>', '<div id="pil">KIRIM JAWABANMU DI KOMENTAR YA</div>')
(D / "frag_head.html").write_text(h)
print("frag_head: dunia Gudang Papasan + CSS sepatu + judul + pil")

# 5) dbg13.py path studio
d = (D / "dbg13.py").read_text()
d = d.replace('pathlib.Path("/home/z/my-project/scripts/vimoda12")', 'pathlib.Path("/home/z/my-project/scripts/vimoda13")')
d = d.replace("Debug engine huyuan", "Debug engine papasan")
(D / "dbg13.py").write_text(d)
print("dbg13: path vimoda13")
