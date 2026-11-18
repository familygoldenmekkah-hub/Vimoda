#!/usr/bin/env python3
"""Revisi 3 video 12: layar kuis dibangun ulang (aturan 30).
Catatan pemilik studio: penutup kuis selalu terlalu ngirit dan tidak jelas mau
diapakan; pil JAWAB KEEMPATNYA muncul begitu saja tanpa empat soalnya pernah
ditampilkan; penonton mata minus tidak bisa membaca instruksi kecil.
Solusi: papan tugas besar TUGAS UNTUKMU + 4 soal bernomor tampil utuh +
6 kartu besar terurut nilai + pil spesifik TULIS JAWABANMU DI KOMENTAR YA."""
import pathlib

D = pathlib.Path("/home/z/my-project/scripts/vimoda12")

# ---------- 1) frag_head.html: teks pil ----------
h = (D / "frag_head.html").read_text()
assert '<div id="pil">JAWAB KEEMPATNYA</div>' in h
h = h.replace('<div id="pil">JAWAB KEEMPATNYA</div>', '<div id="pil">TULIS JAWABANMU DI KOMENTAR YA</div>')
(D / "frag_head.html").write_text(h)
print("frag_head: pil spesifik")

# ---------- 2) frag_core.js: P konstanta + papan tugas ----------
c = (D / "frag_core.js").read_text()
reps = [
    ("pilX:305, pilY:758, pilW:470, pilH:68, pilFS:28,",
     "pilX:280, pilY:840, pilW:520, pilH:64, pilFS:25,"),
    ("cardW:76, cardH:52, cardFS:20", "cardW:150, cardH:64, cardFS:26"),
    ("pilX:760, pilY:600, pilW:430, pilH:65, pilFS:26,",
     "pilX:710, pilY:600, pilW:500, pilH:60, pilFS:22,"),
    ("cardW:96, cardH:60, cardFS:24", "cardW:128, cardH:56, cardFS:24"),
]
for a, b in reps:
    assert a in c, f"anchor P hilang: {a}"
    c = c.replace(a, b)

start = c.index("/* kartu uji: enam bilangan dianotasi ke garis bilangan mini */")
end = c.index("propsEl.appendChild(tagUji);") + len("propsEl.appendChild(tagUji);")
NEW = r'''/* ---------- papan tugas uji (aturan 30): soal tampil besar dan bernomor ---------- */
const panelUji=document.createElement('div');
panelUji.className='panel';
panelUji.style.cssText+=`left:${P.panelX}px;top:${ORIENT==='portrait'?400:250}px;width:${P.panelW}px;height:${ORIENT==='portrait'?410:310}px;`;
const ujiHd=document.createElement('div');
ujiHd.style.cssText+=`margin:12px ${Math.round(P.panelW*0.06)}px 0;height:${ORIENT==='portrait'?42:34}px;font-size:${ORIENT==='portrait'?26:23}px;color:#F2C14E;font-weight:800;letter-spacing:.06em;opacity:0;`;
ujiHd.textContent='TUGAS UNTUKMU:';
panelUji.appendChild(ujiHd);
const SOAL=[['1.','SEMUANYA REAL?'],['2.','MANA RASIONAL?'],['3.','MANA IRASIONAL?'],['4.','KENAPA √7 DAN ⅗ BEDA?']];
const UJIS=[];
SOAL.forEach(([n,q],i)=>{
  const r=document.createElement('div');
  r.style.cssText+=`margin:3px ${Math.round(P.panelW*0.06)}px 0;height:${ORIENT==='portrait'?34:29}px;font-size:${ORIENT==='portrait'?21:19}px;color:#FFF6E8;font-weight:600;opacity:0;`;
  r.innerHTML='<span style="color:#F2C14E">'+n+'</span> '+q;
  panelUji.appendChild(r);
  UJIS.push({el:r,t0:44.6+i*0.15});
});
const UJI=[['-8',-8],['0',0],['⅗',0.6],['√7',2.646],['π',3.142],['4,25',4.25]];
const ujiGrid=document.createElement('div');
ujiGrid.style.cssText+=`position:absolute;left:0;top:${ORIENT==='portrait'?218:182}px;width:100%;display:flex;flex-wrap:wrap;justify-content:center;gap:${ORIENT==='portrait'?12:10}px;`;
const CARDS=UJI.map(([lab,v],i)=>{
  const el=document.createElement('div');
  el.className='valCard';
  el.style.cssText+=`position:relative;width:${P.cardW}px;height:${P.cardH}px;font-size:${P.cardFS}px;opacity:0;`;
  el.textContent=lab;
  ujiGrid.appendChild(el);
  return {el,lab,v,pop:45.4+i*0.13};
});
panelUji.appendChild(ujiGrid);
const zoneW=P.panelW-Math.round(P.panelW*0.12);
const lineDiv=document.createElement('div');
lineDiv.className='numline';
lineDiv.style.cssText+=`left:${Math.round(P.panelW*0.06)}px;top:${ORIENT==='portrait'?378:268}px;width:${zoneW}px;height:0;`;
{
  const bar=document.createElement('div');
  bar.className='bar';
  bar.style.cssText+=`left:0;top:-2px;width:100%;height:4px;`;
  lineDiv.appendChild(bar);
  for(let v=-9;v<=6;v++){
    const fx=(v+9)/15*zoneW;
    const tk=document.createElement('div');
    tk.className='tickm';
    tk.style.cssText+=`left:${fx-1}px;top:4px;width:2px;height:7px;`;
    lineDiv.appendChild(tk);
    if(v%3===0){
      const nm=document.createElement('div');
      nm.className='lab';
      nm.style.cssText+=`left:${fx-10}px;top:13px;font-size:12px;width:20px;text-align:center;opacity:.9;`;
      nm.textContent=v;
      lineDiv.appendChild(nm);
    }
  }
}
const DOTEL=UJI.map(([lab,v])=>{
  const dm=document.createElement('div');
  dm.className='dot';
  const fx=(v+9)/15*zoneW;
  dm.style.cssText+=`left:${fx-8}px;top:-8px;width:16px;height:16px;`;
  lineDiv.appendChild(dm);
  return dm;
});
panelUji.appendChild(lineDiv);
propsEl.appendChild(panelUji);'''
c = c[:start] + NEW + c[end:]
(D / "frag_core.js").write_text(c)
print("frag_core: papan tugas dibangun")

# ---------- 3) frag_render.js: animasi baru + sub 15 ----------
r = (D / "frag_render.js").read_text()
old_sub = "[44.9,'Enam kartu, tugas kecil: jawabnya di komentar.','Six cards, small homework: answer below.','#FFFFFF'],"
new_sub = "[44.9,'Empat soal, jawabnya di komentar ya.','Four questions, answer in the comments.','#FFFFFF'],"
assert old_sub in r
r = r.replace(old_sub, new_sub)
start = r.index("  /* kartu uji: anotasi ke garis bilangan mini, dibalik tanpa membocorkan kelompok */")
end = r.index("  popA(pil,t,47.7,0.6,6,0,49.8);")
NEWR = r'''  /* papan tugas uji (aturan 30): soal bernomor, kartu besar, titik garis */
  popA(panelUji,t,44.4,0.55,5,0,49.8);
  ujiHd.style.opacity=(seg(t,44.55,0.35)*exo).toFixed(3);
  for(const rr of UJIS){ rr.el.style.opacity=seg(t,rr.t0,0.35).toFixed(3); }
  for(let i=0;i<CARDS.length;i++){
    const cc=CARDS[i];
    const inA=clamp(seg(t,cc.pop,0.3),0,1);
    cc.el.style.opacity=(inA*exo).toFixed(3);
    const s2=1+0.09*Math.sin(clamp(seg(t,cc.pop,0.4),0,1)*Math.PI);
    cc.el.style.transform=`scale(${s2.toFixed(3)})`;
    cc.el.style.borderColor=inA>0.9&&t<cc.pop+0.45?'#E8B32E':'#C8A86E';
    const dm=DOTEL[i];
    dm.style.opacity=clamp(seg(t,cc.pop+0.12,0.3),0,1).toFixed(3);
    dm.style.transform=`scale(${(1+0.14*Math.sin(clamp(seg(t,cc.pop+0.12,0.4),0,1)*Math.PI)).toFixed(3)})`;
  }
'''
r = r[:start] + NEWR + r[end:]
(D / "frag_render.js").write_text(r)
print("frag_render: animasi papan tugas + sub 15")

# ---------- 4) audio12.py: cue soal & kartu ----------
a = (D / "audio12.py").read_text()
old_a = """for i in range(6):                         # enam kartu uji muncul
    add(44.7 + i * 0.15, tick(480 + i * 40, 0.045))
for i in range(6):                         # kartu dibalik satu per satu
    add(44.9 + i * 0.42, tick(760 + i * 55, 0.06))
add(47.7, whoosh(0.6, True, 0.07))
add(47.75, chime(880.0, 0.12))             # pil JAWAB KEEMPATNYA"""
new_a = """for i in range(4):                         # empat soal bernomor muncul
    add(44.6 + i * 0.15, tick(620 + i * 80, 0.05))
for i in range(6):                         # enam kartu besar terurut nilai
    add(45.4 + i * 0.13, tick(560 + i * 95, 0.05))
add(47.7, whoosh(0.6, True, 0.07))
add(47.75, chime(880.0, 0.12))             # pil TULIS JAWABANMU DI KOMENTAR YA"""
assert old_a in a
a = a.replace(old_a, new_a)
(D / "audio12.py").write_text(a)
print("audio12: cue soal dan kartu baru")

# ---------- 5) naskah12.md ----------
n = (D / "package/naskah12.md").read_text()
nreps = [
    ("Tag pengingat REAL, LALU R ATAU I? (45.0); garis bilangan mini dengan tick -9 sampai 6; enam kartu nilai muncul 44.7-45.5 di dua tingkat anotasi dengan garis penghubung dan titik di posisi skala: -8, ⅗, √7, 0, π, 4,25; kartu dibalik 44.9-47.3 tanpa membocorkan kelompok; narasi membingkai uji sebagai tugas kecil; pil JAWAB KEEMPATNYA (47.7);",
     "Papan tugas besar (aturan 30): panel plum TUGAS UNTUKMU (44.4); empat soal bahan tampil besar dan bernomor 44.6-45.2: 1. SEMUANYA REAL? 2. MANA RASIONAL? 3. MANA IRASIONAL? 4. KENAPA √7 DAN ⅗ BEDA?; enam kartu besar terurut nilai (45.4-46.1): -8, 0, ⅗, √7, π, 4,25 dengan titik oranye menyala di garis bilangan mini panel; pil spesifik TULIS JAWABANMU DI KOMENTAR YA (47.7);"),
    ("| 15 | 44.90 | Enam kartu, tugas kecil: jawabnya di komentar. | Six cards, small homework: answer below. | putih |",
     "| 15 | 44.90 | Empat soal, jawabnya di komentar ya. | Four questions, answer in the comments. | putih |"),
    ("beat 15 tugas kecil yang ringan;", "beat 15 tugas ringan dengan soal tampil jelas di layar;"),
    ("diangkat menjadi enam kartu anotasi pada garis bilangan mini yang dibalik tanpa membocorkan kelompok, tag pengingat, dan pil; narasi membingkainya sebagai tugas kecil supaya penonton pemula merasa mampu menjawab.",
     "diangkat menjadi papan tugas besar dengan keempat soal tampil utuh dan bernomor (aturan 30: penonton tidak disuruh menjawab soal yang tidak pernah ditampilkan) plus enam kartu besar terurut nilai pada garis bilangan mini; pil menuliskan langkah konkret; narasi membingkainya sebagai tugas ringan supaya penonton pemula merasa mampu menjawab."),
    ("pil JAWAB KEEMPATNYA berbeda dari pil episode 08-11;",
     "pil TULIS JAWABANMU DI KOMENTAR YA spesifik dan berbeda dari pil episode 08-11; layar kuis mengikuti aturan 30 (soal tampil besar, kartu besar untuk mata minus);"),
    ("tiga tick pedagogis 13.0/28.5/35.1, chime reveal di endcard.",
     "tiga tick pedagogis 13.0/28.5/35.1, tick empat soal 44.6-45.1 dan enam kartu 45.4-46.1, chime reveal di endcard."),
    ("- Aturan 29 (baru, dari catatan revisi ini): penonton diasumsikan nol dasar; narasi tidak memadatkan istilah; analogi sehari-hari; momen aha eksplisit; tugas kecil ringan.",
     "- Aturan 29 dan 30 (baru, dari catatan revisi): penonton diasumsikan nol dasar; narasi tidak memadatkan istilah; analogi sehari-hari; momen aha eksplisit; kuis wajib jelas mau diapakan dan besar untuk mata minus."),
]
for a2, b2 in nreps:
    assert a2 in n, f"anchor naskah hilang: {a2[:50]}"
    n = n.replace(a2, b2)
(D / "package/naskah12.md").write_text(n)
print("naskah12: bab 5, beat 15, materi, merek diselaraskan")
