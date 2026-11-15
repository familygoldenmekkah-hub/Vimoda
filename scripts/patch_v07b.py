#!/usr/bin/env python3
"""Revisi 2 video 07: hiasan dunia kontekstual tema bilangan.
Domba -> ubin angka 0 dan pi; rumput-bunga -> chip digit/simbol; tanah -> garis bilangan."""
import pathlib

ENG = pathlib.Path("/home/z/my-project/scripts/vimoda07/engine.html")
NAS = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/naskah07.md")
RED = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")

t = ENG.read_text()

def rep(txt, old, new, n=1, tag=""):
    c = txt.count(old)
    if c != n:
        raise SystemExit(f"[{tag}] ditemukan {c}x (harus {n}x): {old[:70]!r}")
    print(f"[{tag}] ok")
    return txt.replace(old, new)

# 1) buildSheep -> buildNumTile
t = rep(t, """function buildSheep(host,x,s){
  const el=document.createElement('div');
  el.style.cssText=`position:absolute;left:${x}px;top:${P.groundY}px;transform:scale(${s});transform-origin:0 100%;will-change:transform,opacity;opacity:0;`;
  pxBlock(el,8,-14,9,14,'#334155','border-radius:4px;');
  pxBlock(el,29,-14,9,14,'#334155','border-radius:4px;');
  pxBlock(el,0,-38,46,26,'#F1F5F9','border-radius:46%;');
  pxBlock(el,7,-44,30,11,'#F8FAFC','border-radius:46%;');
  pxBlock(el,36,-50,17,17,'#334155','border-radius:50%;');
  pxBlock(el,46,-42,4,4,'#94A3B8','border-radius:50%;');
  host.appendChild(el);
  return el;
}""",
"""/* ubin angka pendamping: hiasan dunia kontekstual (keluarga bilangan) */
function buildNumTile(host,x,s,glyph,col){
  const el=document.createElement('div');
  el.style.cssText=`position:absolute;left:${x}px;top:${P.groundY}px;transform:scale(${s});transform-origin:0 100%;will-change:transform,opacity;opacity:0;`;
  pxBlock(el,0,-44,48,44,'rgba(255,255,255,.07)','border-radius:9px;border:1px solid '+col+';');
  const g=document.createElement('div');
  g.className='mono';
  g.style.cssText=`position:absolute;left:0;top:-44px;width:48px;height:44px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:21px;color:${col};`;
  g.textContent=glyph;
  el.appendChild(g);
  host.appendChild(el);
  return el;
}""", 1, "buildNumTile")

# 2) strip rumput -> garis bilangan sian dengan tanda skala
t = rep(t, """  pxBlock(el,0,0,P.platW,10,'#4ADE80');
  pxBlock(el,40,12,18,10,'#5A3E23');""",
"""  pxBlock(el,0,0,P.platW,10,'#38BDF8');
  for(let tk=24;tk<P.platW;tk+=40){ pxBlock(el,tk,2,3,6,'#0C4A6E'); }
  pxBlock(el,40,12,18,10,'#5A3E23');""", 1, "garis bilangan")

# 3) rumput + bunga -> chip angka & simbol
t = rep(t, """  /* rumput hias bergoyang + bunga pixel */
  const deco=[];
  const tuft=(x,y)=>{
    const g=document.createElement('div');
    g.style.cssText=`position:absolute;left:${x}px;top:${y}px;width:16px;height:14px;transform-origin:50% 100%;will-change:transform;`;
    pxBlock(g,2,3,3,11,'#22C55E','border-radius:2px;');
    pxBlock(g,7,0,3,14,'#16A34A','border-radius:2px;');
    pxBlock(g,12,4,3,10,'#22C55E','border-radius:2px;');
    el.appendChild(g);
    deco.push({el:g, ph:deco.length*1.7});
  };
  tuft(66,-12); tuft(310,-12); tuft(452,-12);
  const fl=document.createElement('div');
  fl.style.cssText=`position:absolute;left:196px;top:-24px;width:12px;height:24px;transform-origin:50% 100%;will-change:transform;`;
  pxBlock(fl,4,10,3,14,'#16A34A','border-radius:2px;');
  pxBlock(fl,1,2,9,9,'#F472B6','border-radius:3px;');
  pxBlock(fl,4,5,3,3,'#FDE68A','border-radius:50%;');
  el.appendChild(fl);
  deco.push({el:fl, ph:2.6});""",
"""  /* chip angka & simbol hias bergoyang: hiasan sesuai konteks bilangan */
  const deco=[];
  const chip=(x,y,glyph,col)=>{
    const g=document.createElement('div');
    g.style.cssText=`position:absolute;left:${x}px;top:${y}px;width:16px;height:18px;transform-origin:50% 100%;will-change:transform;`;
    pxBlock(g,0,0,16,18,'rgba(255,255,255,.06)','border-radius:5px;border:1px solid '+col+';');
    const s2=document.createElement('div');
    s2.className='mono';
    s2.style.cssText=`position:absolute;left:0;top:0;width:16px;height:18px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:10px;color:${col};`;
    s2.textContent=glyph;
    g.appendChild(s2);
    el.appendChild(g);
    deco.push({el:g, ph:deco.length*1.7});
  };
  chip(66,-18,'1','#7DD3FC'); chip(310,-18,'0','#7DD3FC'); chip(452,-18,'5','#FBBF24');
  chip(196,-18,'+','#FBBF24');""", 1, "chip angka")

# 4) pemanggilan baru
t = rep(t, """const sheep1=buildSheep(document.getElementById('sheepA'),P.sheepX,0.85);
const sheep2=buildSheep(document.getElementById('sheepB'),P.sheepX2,0.7);""",
"""const tile1=buildNumTile(document.getElementById('sheepA'),P.sheepX,0.85,'0','#7DD3FC');
const tile2=buildNumTile(document.getElementById('sheepB'),P.sheepX2,0.7,'\\u03C0','#A78BFA');""", 1, "calls")

# 5) komentar render
t = rep(t, "  /* panggung pixel: bulatan emas + domba tetap hadir sepanjang video */",
"  /* panggung pixel: bulatan emas + ubin angka tetap hadir sepanjang video */", 1, "komentar render")

# 6) pop + hapus fade domba (ubin hadir sepanjang video)
t = rep(t, """  popA(sheep1,t,1.6,0.6,20,0.8,1.8);
  popA(sheep2,t,2.0,0.6,20,0.8,1.8);
  const sheepFade=1-seg(t,14.0,0.4);
  sheep1.style.opacity=String(parseFloat(sheep1.style.opacity||'0')*sheepFade);
  sheep2.style.opacity=String(parseFloat(sheep2.style.opacity||'0')*sheepFade);""",
"""  popA(tile1,t,1.6,0.6,20,0.8,1.8);
  popA(tile2,t,2.0,0.6,20,0.8,1.8);""", 1, "pop+fade")

# 7) bob
t = rep(t, "  sheep1.style.transform=`scale(0.85) translateY(${(bob1+sh1).toFixed(1)}px)`;",
"  tile1.style.transform=`scale(0.85) translateY(${(bob1+sh1).toFixed(1)}px)`;", 1, "bob1")
t = rep(t, "  sheep2.style.transform=`scale(0.7) translateY(${(bob2+sh2).toFixed(1)}px)`;",
"  tile2.style.transform=`scale(0.7) translateY(${(bob2+sh2).toFixed(1)}px)`;", 1, "bob2")

ENG.write_text(t)
print("engine.html revisi 2 selesai; sisa 'sheep':", t.count("sheep"))

# ---------- naskah ----------
n = NAS.read_text()
n = rep(n, "# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Revisi 1)",
"# Naskah Video 07 - Babopa: Bilangan Tidak Cuma 1, 2, 3? (Revisi 2)", 1, "judul naskah")
n = rep(n, "## Desain (mewarisi standar video 06 revisi 5)",
"""## Perbaikan revisi 2 (umpan balik kreator: hiasan dunia harus sesuai konteks, tidak selalu karakter hidup dengan domba)

1. DUA DOMBA DIGANTI DUA UBIN ANGKA: pendamping bulatan emas kini ubin mungil bertuliskan 0 (sian) dan pi (violet), tetap hop bergantian dan hadir sepanjang video tanpa pergi di 14.0 (sebelumnya domba pergi menjelang bab kelompok).
2. TANAH GARIS BILANGAN: strip rumput hijau diganti strip biru sian bergaya garis bilangan dengan tanda garis skala tiap 40 px.
3. RUMPUT DAN BUNGA DIGANTI CHIP ANGKA: tiga chip digit 1, 0, 5 dan satu chip simbol + di tepi panggung dengan goyangan lembut yang sama, menyesuaikan tema keluarga bilangan.
4. Partikel latar tetap bertema angka sejak awal (0-9, +, =, /, 1/2, derajat, kali).

## Desain (mewarisi standar video 06 revisi 5)""", 1, "bagian revisi 2")
n = rep(n, "berdiri di panggung tanah-rumput sepanjang video dengan dua domba bulat tanpa wajah; domba pergi menjelang bab kelompok bilangan (cerita: dari menghitung benda ke jenis bilangan).",
"berdiri di panggung bergaya garis bilangan (strip biru sian bertanda skala) sepanjang video, didampingi dua ubin angka mungil bertuliskan 0 (sian) dan pi (violet) yang ikut hop; hiasan tanah berupa chip angka 1, 0, 5 dan simbol + yang bergoyang lembut, bukan rumput dan bunga.", 1, "desain 1")
n = rep(n, "- Panggung pixel: bulatan emas jatuh memantul mendarat (0.6-1.2); domba menyusul (1.6, 2.0) dan sesekali hop.",
"- Panggung pixel: bulatan emas jatuh memantul mendarat (0.6-1.2); ubin angka 0 dan pi menyusul (1.6, 2.0) dan sesekali hop.", 1, "timeline hook")
n = rep(n, "- 14.00 - Domba pergi menjelang ganti bab.\n", "", 1, "hapus baris domba pergi")
NAS.write_text(n)
print("naskah07.md revisi 2 selesai; sisa 'domba':", n.lower().count("domba"))

# ---------- README ----------
r = RED.read_text()
r = rep(r, """12. Kejelasan di atas efek (pelajaran revisi video 05): satu ide per layar dengan maksimal 3 blok teks per momen; subtitle Inggris diberi jarak lega dan tidak boleh menempel teks lain; satu bahasa impact yang konsisten (punch kamera + kilat pendek + light sweep), hindari efek yang sama berulang di banyak momen; transisi antar bab memakai push-pan yang tersambung di grid musik, dan satu objek penghubung (match-cut) supaya alur terasa terangkai.""",
"""12. Kejelasan di atas efek (pelajaran revisi video 05): satu ide per layar dengan maksimal 3 blok teks per momen; subtitle Inggris diberi jarak lega dan tidak boleh menempel teks lain; satu bahasa impact yang konsisten (punch kamera + kilat pendek + light sweep), hindari efek yang sama berulang di banyak momen; transisi antar bab memakai push-pan yang tersambung di grid musik, dan satu objek penghubung (match-cut) supaya alur terasa terangkai.
13. Ilustrasi aktivitas karakter tidak harus selalu tokoh hidup dengan domba: hiasan dunia pixel wajib kontekstual mengikuti kosakata visual materi (contoh: video 07 keluarga bilangan memakai ubin angka 0 dan pi, tanah garis bilangan, chip digit dan simbol; domba-rumput hanya dipakai kalau memang cocok dengan tema).""", 1, "aturan 13")
r = rep(r, "(revisi 1: standar video 06 rev 5 dipakai sejak rendering pertama: bulatan emas, domba, subtitle flex anti-timpa, margin 130 px;",
"(revisi 2: dunia kontekstual - dua domba jadi ubin angka 0/pi, tanah garis bilangan, chip digit menggantikan rumput-bunga; revisi 1: standar video 06 rev 5 sejak rendering pertama: bulatan emas, subtitle flex anti-timpa, margin 130 px;", 1, "baris 07")
RED.write_text(r)
print("README revisi 2 selesai")
