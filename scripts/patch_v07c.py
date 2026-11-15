#!/usr/bin/env python3
"""Revisi 3 video 07: bola emas menjadi MENTOR PENJELAS INTERAKTIF.
- 12 lompatan template dihapus; gestur menjawab konten (lean/nod/pulse/shake/jump)
- posisi per bab mengikuti objek yang sedang dijelaskan
- README: aturan produksi no 14; naskah: revisi 3"""
import pathlib

ENG = pathlib.Path("/home/z/my-project/scripts/vimoda07/engine.html")
AUD = pathlib.Path("/home/z/my-project/scripts/vimoda07/audio07.py")
NAS = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/naskah07.md")
RED = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")

t = ENG.read_text()

def rep(txt, old, new, n=1, tag=""):
    c = txt.count(old)
    if c != n:
        raise SystemExit(f"[{tag}] ditemukan {c}x (harus {n}x): {old[:70]!r}")
    print(f"[{tag}] ok")
    return txt.replace(old, new)

# 1) posisi mentor per bab: dekat objek bahasan
t = rep(t, "platX:100, platW:520, groundY:1230, ballX:[170,215,170,255,200,240], sheepX:470, sheepX2:560, bubY:1006,",
"platX:100, platW:520, groundY:1230, ballX:[170,150,500,160,300,240], sheepX:470, sheepX2:560, bubY:1006,", 1, "ballX portrait")
t = rep(t, "platX:240, platW:420, groundY:828, ballX:[300,350,300,360,320,360], sheepX:520, sheepX2:590, bubY:690,",
"platX:240, platW:420, groundY:828, ballX:[300,280,560,260,320,360], sheepX:520, sheepX2:590, bubY:690,", 1, "ballX landscape")

# 2) ganti jadwal lompatan dengan kosakata gestur mentor
t = rep(t, "const HOPS=[[0.7,26],[6.4,18],[10.5,24],[14.9,18],[21.0,30],[22.9,16],[25.7,18],[32.2,22],[35.3,18],[40.2,20],[43.7,18],[48.7,32]];",
"""/* gestur mentor: setiap gerak menjawab konten
   lean=menoleh ke objek, nod=mengangguk di simpulan, pulse=denyut konfirmasi,
   shake=reaksi fisik (kejut/dingin), jump=lompatan bernada (maks 1-2 per video) */
const GESTS=[
  [1.7,0.9,'lean',8,1],
  [4.9,0.7,'shake',9,0],
  [8.2,0.9,'lean',7,1],
  [8.9,1.2,'shake',4.5,0],
  [11.5,0.8,'nod',0.10,0],
  [16.4,0.55,'pulse',1.06,0],
  [19.5,0.9,'lean',-7,0],
  [23.0,0.8,'nod',0.09,0],
  [27.9,0.5,'pulse',1.05,0],
  [29.2,0.5,'pulse',1.05,0],
  [30.5,0.5,'pulse',1.05,0],
  [31.8,0.5,'pulse',1.06,0],
  [32.3,0.9,'nod',0.12,0],
  [36.3,1.0,'lean',7,1],
  [38.6,0.8,'nod',0.09,0],
  [40.6,0.8,'lean',-5,0],
  [45.3,0.7,'shake',7,0],
  [47.8,0.9,'lean',6,1],
  [48.7,0.85,'jump',34,0]
];""", 1, "GESTS")

# 3) komentar
t = rep(t, "  /* bulatan emas: menggelinding antar bab, napas squash-stretch, lompat di beat */",
"  /* bulatan emas mentor: menggelinding mendekati objek bahasan, gestur menjawab konten */", 1, "komentar mentor")

# 4) loop lompatan -> loop gestur
t = rep(t, """  let hy=0, hsq=0;
  for(const [hs,hh] of HOPS){
    const d=t-hs;
    if(d>=0&&d<0.8){
      const p=d/0.8;
      hy-=hh*4*p*(1-p);
      hsq+=0.16*Math.sin(p*Math.PI)-(p<0.14?(1-p/0.14)*0.12:0)-(p>0.82?((p-0.82)/0.18)*0.16:0);
    }
  }
  let sway=0;
  if(t>=11.5&&t<14.2) sway=Math.sin((t-11.5)*2.2)*7;""",
"""  let hy=0, hsq=0, gro=0, lrot=0;
  for(const [gs,gd,gt,ga,gdir] of GESTS){
    const d=t-gs;
    if(d>=0&&d<gd){
      const p=d/gd, w=Math.sin(p*Math.PI);
      if(gt==='lean'){ lrot+=gdir*ga*w; }
      else if(gt==='shake'){ lrot+=ga*Math.sin(p*11)*(1-p); }
      else if(gt==='nod'){ hsq+=ga*w; hy-=6*w; }
      else if(gt==='pulse'){ gro+=(ga-1)*w; }
      else if(gt==='jump'){ hy-=ga*4*p*(1-p); hsq+=0.10*Math.sin(p*Math.PI); }
    }
  }""", 1, "loop gestur")

# 5) terapkan gestur ke transform
t = rep(t, "  const sy2=1+brs+hsq-lq*0.16, sx2=1-(brs+hsq)*0.75+lq*0.10;\n  ball.el.style.left=(bx+sway).toFixed(1)+'px';",
"  const sy2=(1+brs+hsq-lq*0.16)*(1+gro), sx2=(1-(brs+hsq)*0.75+lq*0.10)*(1+gro);\n  ball.el.style.left=bx.toFixed(1)+'px';", 1, "skala+left")
t = rep(t, "rotate(${wig.toFixed(2)}deg)", "rotate(${(lrot+wig).toFixed(2)}deg)", 1, "rotasi")
t = rep(t, "if(ORIENT==='portrait') bub.style.left=(bx+sway+26).toFixed(1)+'px';",
"if(ORIENT==='portrait') bub.style.left=(bx+26).toFixed(1)+'px';", 1, "bubble left")

ENG.write_text(t)
print("engine.html revisi 3 selesai; sisa HOPS/sway:", t.count("HOPS"), t.count("sway"))

# ---------- audio: tik lompatan seragam -> lompatan tunggal ----------
a = AUD.read_text()
a = rep(a, """for hb in (6.4, 10.5, 14.9, 25.7, 35.3, 40.2, 43.7):  # lompatan bulatan emas
    add(hb, tick(240, 0.05))""",
"add(48.66, tick(240, 0.05))                # lompatan perayaan tunggal mentor", 1, "tik lompatan")
AUD.write_text(a)
print("audio07.py revisi 3 selesai")

# ---------- naskah ----------
n = NAS.read_text()
n = rep(n, "# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Revisi 2)",
"# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Revisi 3)", 1, "judul naskah")
n = rep(n, "## Desain (mewarisi standar video 06 revisi 5)",
"""## Perbaikan revisi 3 (umpan balik kreator: bola emas = mentor penjelas interaktif, bukan pajangan yang loncat-loncat)

1. FUNGSI KARAKTER DILURUSKAN: bola emas bukan pajangan dan bukan penghibur; ia mentor penjelas yang geraknya membantu ilustrasi sehingga penjelasan terasa matang dan hidup.
2. KOSAKATA GESTUR MENJAWAB KONTEN: menoleh (lean) ke objek yang sedang dibahas, mengangguk (nod) di simpulan emas, denyut konfirmasi (pulse) setiap anggota keluarga bilangan bertambah, menggigil saat suhu -5 derajat, terkejut saat tanda tanya merah dan pertanyaan besar, dan satu-satunya lompatan perayaan di ajakan komentar.
3. POSISI MENGIKUTI OBJEK BAHASAN: bola menggelinding mendekati kartu situasi, ubin kelompok, kotak keluarga bilangan, kartu pi, lalu kartu CTA; tidak lagi berdiri di satu titik dengan jadwal lompatan seragam.
4. JADWAL 12 LOMPATAN TEMPLATE DIHAPUS; gerakan berlebih ala template tidak ada lagi, yang tersisa gerak bermakna.

## Desain (mewarisi standar video 06 revisi 5)""", 1, "bagian revisi 3")
n = rep(n, "(squash-stretch, 12 lompatan di beat, roll antar bab, bayangan dinamis, sparkle, droplet keringat)",
"(menggelinding antar bab mendekati objek bahasan, gestur mentor menoleh/mengangguk/denyut/menggigil, bayangan dinamis, sparkle, droplet keringat)", 1, "desain 1")
n = rep(n, "- 4.90 - Tanda tanya merah memantul di samping \"1, 2, 3\".",
"""- 4.90 - Tanda tanya merah memantul di samping "1, 2, 3"; mentor terkejut bergidik (1.70 menoleah ke kartu teaser, 4.90 kejutan).""", 1, "timeline hook gestur")
n = rep(n, "- 11.50 - Sub emas: \"Semuanya butuh jenis bilangan berbeda.\" (boom; bulatan bergoyang lelah)",
"""- 11.50 - Sub emas: "Semuanya butuh jenis bilangan berbeda." (boom; mentor mengangguk setuju, 8.20 menoleh ke kartu situasi, 8.90 menggigil saat suhu -5 derajat)""", 1, "timeline S1 gestur")
n = rep(n, "- 22.90 - Sub emas: \"Irasional: akar 2 dan pi.\" (boom); 23.00 ubin IRASIONAL (akar 2, pi) emas + sweep.",
"""- 22.90 - Sub emas: "Irasional: akar 2 dan pi." (boom); 23.00 ubin IRASIONAL (akar 2, pi) emas + sweep; mentor menyapa ubin (16.40 denyut konfirmasi, 19.50 menoleh ke rasional, 23.00 mengangguk).""", 1, "timeline S2 gestur")
n = rep(n, "- 27.90 / 29.20 / 30.50 / 31.80 - Keluarga bertumbuh: +0 (CACAH: MULAI DARI NOL), -1, -2 (BULAT: NEGATIF MASUK), 1/2 3/4 (RASIONAL: PECAHAN), akar 2, pi (IRASIONAL: AKAR 2, PI, teks gradien emas).",
"""- 27.90 / 29.20 / 30.50 / 31.80 - Keluarga bertumbuh: +0 (CACAH: MULAI DARI NOL), -1, -2 (BULAT: NEGATIF MASUK), 1/2 3/4 (RASIONAL: PECAHAN), akar 2, pi (IRASIONAL: AKAR 2, PI, teks gradien emas); mentor berdenyut konfirmasi setiap anggota baru, lalu mengangguk dalam di 32.30.""", 1, "timeline S3 gestur")
n = rep(n, "- 40.40 - Gelembung \"aman.\" dari bulatan emas.",
"""- 40.40 - Gelembung "aman." dari bulatan emas; mentor menoleh ke kartu pi (36.30), mengangguk di persamaan (38.60), lalu tenang kembali (40.60).""", 1, "timeline S4 gestur")
n = rep(n, "- Bulatan emas bergetar heboh + sparkle bintang; fade out 51.3-52.0.",
"""- Bulatan emas terkejut di pertanyaan besar (45.30), menoleh ke kartu CTA (47.80), lalu SATU lompatan perayaan + sparkle bintang (48.70); fade out 51.3-52.0.""", 1, "timeline S5 gestur")
NAS.write_text(n)
print("naskah07.md revisi 3 selesai")

# ---------- README ----------
r = RED.read_text()
r = rep(r, """13. Ilustrasi aktivitas karakter tidak harus selalu tokoh hidup dengan domba: hiasan dunia pixel wajib kontekstual mengikuti kosakata visual materi (contoh: video 07 keluarga bilangan memakai ubin angka 0 dan pi, tanah garis bilangan, chip digit dan simbol; domba-rumput hanya dipakai kalau memang cocok dengan tema).""",
"""13. Ilustrasi aktivitas karakter tidak harus selalu tokoh hidup dengan domba: hiasan dunia pixel wajib kontekstual mengikuti kosakata visual materi (contoh: video 07 keluarga bilangan memakai ubin angka 0 dan pi, tanah garis bilangan, chip digit dan simbol; domba-rumput hanya dipakai kalau memang cocok dengan tema).
14. Karakter utama adalah MENTOR PENJELAS INTERAKTIF, bukan pajangan dan bukan penghibur: setiap geraknya wajib menjawab konten (menoleh ke objek yang dibahas, mengangguk di simpulan, denyut konfirmasi di poin berurutan, reaksi fisik sesuai konteks seperti menggigil saat suhu minus), posisinya per bab mengikuti objek bahasan, dan lompatan seragam di beat acak dilarang; lompatan hanya untuk momen bernada (perayaan atau kejutan), maksimal satu-dua per video.""", 1, "aturan 14")
r = rep(r, "(revisi 2: dunia kontekstual - dua domba jadi ubin angka 0/pi, tanah garis bilangan, chip digit menggantikan rumput-bunga;",
"(revisi 3: bola emas jadi mentor interaktif - gestur menoleh/mengangguk/denyut/menggigil menjawab konten, posisi mengikuti objek bahasan, 12 lompatan template dihapus; revisi 2: dunia kontekstual - dua domba jadi ubin angka 0/pi, tanah garis bilangan, chip digit menggantikan rumput-bunga;", 1, "baris 07")
RED.write_text(r)
print("README revisi 3 selesai")
