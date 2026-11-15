#!/usr/bin/env python3
"""Patch engine.html + audio07.py untuk video 07 "Babopa: Bilangan Tidak Cuma 1, 2, 3?".
Setiap penggantian wajib ditemukan tepat N kali; kalau tidak, gagalkan dengan pesan jelas."""
import pathlib

BASE = pathlib.Path("/home/z/my-project/scripts/vimoda07")
ENG = BASE / "engine.html"
AUD = BASE / "audio07.py"

eng = ENG.read_text()
aud = AUD.read_text()

def rep(txt, old, new, n=1, tag=""):
    if txt is None:
        print(f"[{tag}] lewati (bagian ini sudah dipatch)")
        return None
    c = txt.count(old)
    if c != n:
        raise SystemExit(f"[{tag}] ditemukan {c}x (harus {n}x): {old[:70]!r}")
    print(f"[{tag}] ok")
    return txt.replace(old, new)

# ---------- ENGINE ----------
E = None if 'v07 (babopa)' in eng else eng

# header komentar + komentar scene (dibersihkan dari label video 06)
E = rep(E, """/* v09 (revisi 4): dunia cerita pixel ala referensi.
   - tokoh pixel tetap di panggung bawah sepanjang video (penggembala + domba)
   - subtitle bar permanen (ID putih tebal + EN kecil) membawa narasi
   - teks scene dirampingkan; label penjelas tetap ada
   - semua kunci P unik (anti-tumpuk warisan revisi 2) */""",
"""/* v07 (babopa): dunia cerita pixel + bulatan emas (warisan video 06 rev 5).
   - bulatan emas tanpa wajah tetap di panggung bawah sepanjang video
   - subtitle bar flex permanen (ID + EN) anti-timpa, margin aman rail sosmed
   - hook: 1, 2, 3 ditantang; S1 empat situasi; S2 lima kelompok;
     S3 keluarga bilangan tumbuh; S4 aturan; S5 CTA
   - semua kunci P unik (anti-tumpuk warisan revisi 2) */""", 1, "header")

E = rep(E, "<!-- S1 GORESAN -->", "<!-- S1 SITUASI -->", 1, "komentar S1")
E = rep(E, "<!-- S2 DESIMAL -->", "<!-- S2 KELOMPOK -->", 1, "komentar S2")
E = rep(E, "<!-- S3 SIMBOL -->", "<!-- S3 KENAPA -->", 1, "komentar S3")
E = rep(E, "<!-- S4 BATAS KESEPAKATAN -->", "<!-- S4 ATURAN -->", 1, "komentar S4")

# P portrait
E = rep(E, """  h1Y:230, h1Size:170, h1BoxW:160, h1BoxH:210,
  qX:680, qY:250, qSize:110,""",
"""  h1Y:240, h1Size:104, h1BoxW:470, h1BoxH:140,
  qX:800, qY:250, qSize:88,""", 1, "P-p h1")
E = rep(E, "  tlabY:190, tlabSize:26, tlabEY:232, tlabESize:13, tsubY:262, tsubSize:14,",
"  tlabY:208, tlabSize:26, tlabEY:246, tlabESize:13, tsubY:272, tsubSize:14, sitW:150, sitH:160, sitGap:16, sitSym:44, sitLab:16, sitEn:10, sitY:34,", 1, "P-p tlab")
E = rep(E, "  digY:500, digH:120, digW:80, digGap:10, digSize:46,",
"  digY:500, digH:150, digW:150, digGap:14, digSize:46, grpName:17, grpEx:26, grpEn:10,", 1, "P-p dig")

# P landscape
E = rep(E, """  h1Y:130, h1Size:170, h1BoxW:160, h1BoxH:210,
  qX:1160, qY:150, qSize:110,""",
"""  h1Y:130, h1Size:150, h1BoxW:620, h1BoxH:190,
  qX:1330, qY:160, qSize:92,""", 1, "P-l h1")
E = rep(E, "  tlabY:190, tlabSize:28, tlabEY:234, tlabESize:14, tsubY:266, tsubSize:14,",
"  tlabY:196, tlabSize:28, tlabEY:236, tlabESize:14, tsubY:266, tsubSize:14, sitW:170, sitH:170, sitGap:16, sitSym:48, sitLab:17, sitEn:10, sitY:40,", 1, "P-l tlab")
E = rep(E, "  digY:490, digH:130, digW:84, digGap:12, digSize:48,",
"  digY:490, digH:160, digW:160, digGap:16, digSize:48, grpName:18, grpEx:28, grpEn:10,", 1, "P-l dig")

# body: teks statis
E = rep(E, 'style="position:absolute;font-weight:800;color:#FBBF24;">1</div>',
'style="position:absolute;font-weight:800;color:#FBBF24;">1, 2, 3</div>', 1, "h1")
E = rep(E, '<span class="grad" id="a_word_t">GORESAN</span>', '<span class="grad" id="a_word_t">SITUASI</span>', 1, "word1")
E = rep(E, '>347 = 347 GORESAN</div>', '>EMPAT SITUASI, EMPAT KEBUTUHAN</div>', 1, "tlab")
E = rep(E, '>347 = 347 MARKS</div>', '>four situations, four different needs</div>', 1, "tlabE")
E = rep(E, '>TIAP 5 DICORET</div>', '>BEDA PERSOALAN, BEDA JENIS BILANGAN</div>', 1, "tsub")
E = rep(E, '<span class="grad" id="b_word_t">DESIMAL</span>', '<span class="grad" id="b_word_t">KELOMPOK</span>', 1, "word2")
E = rep(E, '>Simbol sama, posisi mengubah nilai.</div>', '>Tiap jenis punya tugasnya.</div>', 1, "btake")
E = rep(E, '<span class="grad" id="c_word_t">SIMBOL</span>', '<span class="grad" id="c_word_t">KENAPA?</span>', 1, "word3")
E = rep(E, '<div class="starclip" id="e_big_t"></div>',
'<div class="center mono" id="e_big_t" style="font-weight:800;color:#FBBF24;">\u03C0</div>', 1, "ebig")
E = rep(E, '<div class="starclip" id="e_eq_s"></div>',
'<div class="mono" id="e_eq_s" style="font-weight:800;color:#FBBF24;">1/2</div>', 1, "eeqs")
E = rep(E, '> + 2 = 9</div>', '> + 1/2 = 1</div>', 1, "eeqt")
E = rep(E, '>NILAINYA TETAP 9</div>', '>CARA BEBAS, HASIL SESUAI ATURAN</div>', 1, "eqlab")
E = rep(E, '>BUKA BROWSER KAMU</div>', '>MENURUTMU, CUKUP SATU JENIS?</div>', 1, "fopen")
E = rep(E, '>OPEN YOUR BROWSER</div>', '>IS ONE KIND ENOUGH?</div>', 1, "fopenE")

# kartu hook
E = rep(E, """const SHAPES0=[
  {glyph:'|', col:'#FBBF24', lab:'GORESAN', en:'TALLY', chalk:false},
  {glyph:'\\u25B3', col:'#34D399', lab:'SEGITIGA', en:'TRIANGLE', chalk:true},
  {glyph:'\\u25CB', col:'#22D3EE', lab:'LENGKUNG', en:'CURVE', chalk:false}
];""",
"""const SHAPES0=[
  {glyph:'-5\\u00B0', col:'#7DD3FC', lab:'NEGATIF', en:'NEGATIVE', chalk:false},
  {glyph:'1/2', col:'#34D399', lab:'PECAHAN', en:'FRACTION', chalk:false},
  {glyph:'\\u03C0', col:'#A78BFA', lab:'IRASIONAL', en:'IRRATIONAL', chalk:false}
];""", 1, "shapes0")

# S1 builder: goresan -> empat kartu situasi
E = rep(E, """const aMarks=document.getElementById('a_marks');
const MW=P.markW, MH=P.markH, MS=P.markStep, GG=P.gGap;
const gwM=89+GG+89+GG+(MS+MW);
const mx0=(CW1-gwM)/2;
const M7=[];
let mi=0;
for(let g=0;g<3;g++){
  const n=g<2?5:2;
  const gx=mx0+g*(89+GG);
  for(let k=0;k<n;k++){
    const bar=document.createElement('div');
    bar.style.cssText=`position:absolute;left:${(gx+k*MS).toFixed(1)}px;top:${P.markY}px;width:${MW}px;height:${MH}px;border-radius:4px;background:linear-gradient(180deg,#FDE68A,#D97706);transform:rotate(-12deg);opacity:0;will-change:transform,opacity;`;
    aMarks.appendChild(bar);
    M7.push({el:bar, ts:8.4+mi*0.08, strike:null});
    mi++;
  }
  if(g<2){
    const st=document.createElement('div');
    st.style.cssText=`position:absolute;left:${(gx+44-MW).toFixed(1)}px;top:${P.markY+32}px;width:${P.strikeW}px;height:${P.strikeH}px;border-radius:4px;background:rgba(253,230,138,.85);transform:rotate(-55deg);opacity:0;will-change:transform,opacity;`;
    aMarks.appendChild(st);
    M7[mi-1].strike={el:st, ts:8.4+(mi-1)*0.08+0.28};
  }
}""",
"""const aMarks=document.getElementById('a_marks');
aMarks.style.cssText+='position:absolute;left:0;top:0;width:100%;height:100%;';
const SITS=[
  {sym:'5', col:'#FBBF24', lab:'BUKU', en:'BOOKS'},
  {sym:'-5\\u00B0', col:'#7DD3FC', lab:'SUHU', en:'BELOW ZERO'},
  {sym:'1/2', col:'#34D399', lab:'PIZZA', en:'HALF'},
  {sym:'\\u03C0', col:'#A78BFA', lab:'LINGKARAN', en:'CIRCLE'}
];
const SW1=P.sitW, SH1=P.sitH, SG1=P.sitGap;
const gwS=4*SW1+3*SG1, x0s=(CW1-gwS)/2;
const SIT=[];
SITS.forEach((o,i)=>{
  const el=document.createElement('div');
  el.className='card';
  el.style.cssText=`position:absolute;left:${(x0s+i*(SW1+SG1)).toFixed(1)}px;top:${P.sitY}px;width:${SW1}px;height:${SH1}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;opacity:0;overflow:hidden;will-change:transform,opacity;`;
  const d=document.createElement('div');
  d.className='mono';
  d.style.cssText=`font-weight:800;font-size:${P.sitSym}px;color:${o.col};line-height:1;`;
  d.textContent=o.sym;
  el.appendChild(d);
  const lb=document.createElement('div');
  lb.style.cssText=`font-size:${P.sitLab}px;font-weight:700;color:#E7EEF8;letter-spacing:.08em;`;
  lb.textContent=o.lab;
  const le=document.createElement('div');
  le.className='enword';
  le.style.cssText=`font-size:${P.sitEn}px;`;
  le.textContent=o.en;
  el.appendChild(lb);el.appendChild(le);
  const sw=document.createElement('div');
  sw.className='sweep';
  el.appendChild(sw);
  aMarks.appendChild(el);
  SIT.push({el, sw, ts:7.8+i*0.45});
});""", 1, "S1 builder")

# S2 builder: 10 ubin digit -> 5 ubin kelompok
E = rep(E, """const gwD=10*DGW+9*DGG, x0d=(W-gwD)/2;
const DT=[];
for(let i=0;i<10;i++){
  const el=document.createElement('div');
  const hero=(i===5);
  el.className='card';
  el.style.cssText=`position:absolute;left:${x0d+i*(DGW+DGG)}px;top:${P.digY}px;width:${DGW}px;height:${DGH}px;display:flex;align-items:center;justify-content:center;opacity:0;overflow:hidden;will-change:transform,opacity;`;
  if(hero){el.style.borderColor='rgba(251,191,36,.55)';el.style.background='rgba(251,191,36,.10)';}
  const d=document.createElement('div');
  d.className='mono';
  d.style.cssText=`font-weight:800;font-size:${P.digSize}px;color:${hero?'#FBBF24':'#7DD3FC'};`;
  d.textContent=String(i);
  el.appendChild(d);
  const sw=document.createElement('div');
  sw.className='sweep';
  el.appendChild(sw);
  bDig.appendChild(el);
  DT.push(el);
}
const DSWEEP=DT[5].querySelector('.sweep');""",
"""const gwD=5*DGW+4*DGG, x0d=(W-gwD)/2;
const GROUPS=[
  {name:'ASLI', ex:'1 2 3', en:'NATURAL', col:'#7DD3FC'},
  {name:'CACAH', ex:'0 1 2', en:'WHOLE', col:'#7DD3FC'},
  {name:'BULAT', ex:'-2 -1 0', en:'INTEGER', col:'#7DD3FC'},
  {name:'RASIONAL', ex:'1/2 3/4', en:'RATIONAL', col:'#34D399'},
  {name:'IRASIONAL', ex:'\\u221A2 \\u03C0', en:'IRRATIONAL', col:'#FBBF24'}
];
const DT=[];
GROUPS.forEach((o,i)=>{
  const hero=(i===4);
  const el=document.createElement('div');
  el.className='card';
  el.style.cssText=`position:absolute;left:${x0d+i*(DGW+DGG)}px;top:${P.digY}px;width:${DGW}px;height:${DGH}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;opacity:0;overflow:hidden;will-change:transform,opacity;`;
  if(hero){el.style.borderColor='rgba(251,191,36,.55)';el.style.background='rgba(251,191,36,.10)';}
  const nm=document.createElement('div');
  nm.style.cssText=`font-size:${P.grpName}px;font-weight:700;color:#E7EEF8;letter-spacing:.10em;`;
  nm.textContent=o.name;
  const d=document.createElement('div');
  d.className='mono';
  d.style.cssText=`font-weight:800;font-size:${P.grpEx}px;color:${o.col};line-height:1;white-space:nowrap;`;
  d.textContent=o.ex;
  const le=document.createElement('div');
  le.className='enword';
  le.style.cssText=`font-size:${P.grpEn}px;`;
  le.textContent=o.en;
  el.appendChild(nm);el.appendChild(d);el.appendChild(le);
  const sw=document.createElement('div');
  sw.className='sweep';
  el.appendChild(sw);
  bDig.appendChild(el);
  DT.push(el);
});
const DSWEEP=DT[4].querySelector('.sweep');""", 1, "S2 ubin")

# NTPS/N3/TAGS tidak dipakai di video 07
if E is not None:
    i0 = E.index("const bNtp=document.getElementById('b_ntp');")
    i1 = E.index("const bTake=document.getElementById('b_take');")
    E = E[:i0] + "const N3=[], TAGS=[];\n" + E[i1:]
    print("[NTP dihapus] ok")
else:
    print("[NTP dihapus] lewati")

# S3: tahap keluarga bilangan
E = rep(E, """function stageIdx(t){
  let i=0;
  for(const s of [29.0,30.6,32.2]){ if(t>=s) i++; }
  return i;
}
const STAGE_TXT=[
  {t:'7', col:'#FBBF24', g:0},
  {t:'VII', col:'#7DD3FC', g:0},
  {t:'TUJUH', col:'#A78BFA', g:0},
  {t:'NILAI SAMA.', col:'', g:1}
];
const STAGE_LAB=['ANGKA','ANGKA ROMAWI','KATA','NILAI: TUJUH'];""",
"""function stageIdx(t){
  let i=0;
  for(const s of [27.9,29.2,30.5,31.8]){ if(t>=s) i++; }
  return i;
}
const STAGE_TXT=[
  {t:'1, 2, 3', col:'#FBBF24', g:0},
  {t:'0', col:'#7DD3FC', g:0},
  {t:'-1, -2', col:'#7DD3FC', g:0},
  {t:'1/2, 3/4', col:'#A78BFA', g:0},
  {t:'\\u221A2, \\u03C0', col:'', g:1}
];
const STAGE_LAB=['ASLI: PENCACAH BENDA','CACAH: MULAI DARI NOL','BULAT: NEGATIF MASUK','RASIONAL: PECAHAN','IRASIONAL: AKAR 2, PI'];""", 1, "STAGE")

# eBigT / eEqS kini teks, bukan starclip
E = rep(E, "eBigT.style.cssText+=`position:absolute;left:50%;top:50%;width:${P.bigStar}px;height:${P.bigStar}px;transform:translate(-50%,-52%);`;",
"eBigT.style.cssText+=`position:absolute;left:50%;top:50%;transform:translate(-50%,-52%);font-size:${P.bigStar}px;line-height:1;`;", 1, "eBigT")
E = rep(E, "eEqS.style.cssText+=`position:relative;width:${P.eqStar}px;height:${P.eqStar}px;flex:0 0 auto;`;",
"eEqS.style.cssText+=`position:relative;font-size:${P.eqStar}px;line-height:1;flex:0 0 auto;`;", 1, "eEqS")

# SUBS baru
E = rep(E, """const SUBS=[
  [0.5,'Kenapa satu ditulis 1?','Why is one written as 1?','#FFFFFF'],
  [2.6,'Dan siapa yang menentukan bentuk angka 7?','And who decided the shape of 7?','#FFFFFF'],
  [6.7,'Dulu, jumlah dicatat dengan goresan.','Long ago, people counted with marks.','#FFFFFF'],
  [9.6,'Coba bayangkan mencatat 347 satu per satu.','Imagine writing 347 marks, one by one.','#FFFFFF'],
  [11.5,'Makin besar jumlah, makin rumit tulisannya.','The bigger the count, the messier the writing.','#FBBF24'],
  [14.5,'Solusinya: desimal, 10 simbol 0 sampai 9.','The fix: decimal, ten symbols 0 to 9.','#FFFFFF'],
  [19.3,'Angka 5 tetap 5, jadi 50 dan 500.','The 5 stays five, becoming 50 and 500 by position.','#FFFFFF'],
  [22.9,'Simbolnya sama, posisi yang mengubah nilai.','Same symbol, position changes the value.','#FBBF24'],
  [25.3,'Simbol bukan bilangan: 7, VII, atau tujuh.','The symbol is not the number: 7, VII, or seven.','#FFFFFF'],
  [32.3,'Bentuk beda, nilai yang dimaksud tetap sama.','Different form, same intended value.','#FBBF24'],
  [34.9,'Bahkan boleh ganti 7 jadi lambang bintang.','You can even replace 7 with a star.','#FFFFFF'],
  [38.3,'Tetap mewakili tujuh: bintang + 2 tetap 9.','Still standing for seven: star + 2 is still 9.','#FFFFFF'],
  [43.3,'Kalau seluruh manusia sepakat 7 + 2 jadi 10?','If all humans agreed 7 + 2 becomes 10?','#FFFFFF'],
  [46.9,'Apakah kesepakatan membuatnya benar?','Would the agreement make it true?','#FFFFFF'],
  [48.6,'Kebenaran butuh dasar dan alasan.','Truth needs grounds and reasons.','#FBBF24'],
  [50.4,'Pendapatmu? Tulis di komentar.','Your take? Drop it in the comments.','#FFFFFF']
];""",
"""const SUBS=[
  [0.5,'Bilangan itu cuma 1, 2, 3?','Is counting only 1, 2, 3?','#FFFFFF'],
  [2.6,'Padahal, matematika tidak sesempit itu.','Math is not that narrow.','#FFFFFF'],
  [6.7,'Punya 5 buku, suhu 5 derajat di bawah nol.','Five books, or 5 degrees below zero.','#FFFFFF'],
  [9.6,'Pizza dibagi dua, lingkaran dengan pi.','Half a pizza, or a circle with pi.','#FFFFFF'],
  [11.5,'Semuanya butuh jenis bilangan berbeda.','Each one needs a different kind.','#FBBF24'],
  [14.5,'Kenal lima kelompok bilangan.','Meet the five number groups.','#FFFFFF'],
  [19.3,'Rasional: bisa ditulis sebagai pecahan.','Rationals: writable as fractions.','#FFFFFF'],
  [22.9,'Irasional: akar 2 dan pi.','Irrationals: root 2 and pi.','#FBBF24'],
  [25.3,'Kalau 1, 2, 3 cukup, kenapa perlu lainnya?','If 1, 2, 3 suffice, why more?','#FFFFFF'],
  [32.3,'Karena persoalan tidak selalu sama.','Because problems are not the same.','#FBBF24'],
  [34.9,'Matematika tumbuh mencari cara yang tepat.','Math grows by finding the right tools.','#FFFFFF'],
  [38.3,'Cara bebas, hasil tetap menurut aturan.','Free method, but results follow rules.','#FFFFFF'],
  [43.3,'Jadi, cukup satu jenis bilangan untuk semua?','So, is one kind enough for all?','#FFFFFF'],
  [46.9,'Pilih satu, atau tiap persoalan beda?','One for all, or different tools?','#FFFFFF'],
  [48.6,'Tulis alasanmu di komentar.','Write your reason in the comments.','#FBBF24'],
  [50.4,'Jangan cuma menebak.','Do not just guess.','#FFFFFF']
];""", 1, "SUBS")

# gelembung reaksi
E = rep(E, "const BUBS=[[10.5,11.9,'lelah hitung...'],[21.3,22.7,'rapi!'],[40.4,41.8,'aman.']];",
"const BUBS=[[8.9,10.1,'dingin!'],[21.3,22.7,'lengkap!'],[40.4,41.8,'aman.']];", 1, "BUBS")

# render S1: kartu situasi + tanpa count-up
E = rep(E, """  headIn(aWord,t,7.2,0.10);
  popA(aCard,t,8.2,0.7,30,0.9,1.6);
  M7.forEach((m,i)=>{
    popA(m.el,t,m.ts,0.5,18,0.7,2.0);
    if(m.strike){
      const p=seg(t,m.strike.ts,0.35);
      m.strike.el.style.opacity=String(p);
      m.strike.el.style.transform=`rotate(-55deg) scaleX(${Math.max(p,0.001).toFixed(3)})`;
    }
  });
  sweepAny(aCardSw,t,[9.9]);
  const alp=eoe(seg(t,10.1,0.5));
  const cnt=Math.floor(eio(seg(t,10.1,0.45))*347);
  aTl.textContent = t<10.55 ? `${cnt} = ${cnt} GORESAN` : '347 = 347 GORESAN';
  aTl.style.opacity=String(alp);
  aTl.style.transform=`translateY(${((1-alp)*14).toFixed(2)}px)`;
  aTlE.textContent = t<10.55 ? `${cnt} = ${cnt} MARKS` : '347 = 347 MARKS';
  const alpe=eoe(seg(t,10.25,0.5));
  aTlE.style.opacity=String(alpe*0.95);
  aTlE.style.transform=`translateY(${((1-alpe)*10).toFixed(2)}px)`;
  const asub=eoe(seg(t,11.0,0.5));
  aTsub.style.opacity=String(asub*0.95);
  aTsub.style.transform=`translateY(${((1-asub)*10).toFixed(2)}px)`;""",
"""  headIn(aWord,t,7.2,0.10);
  popA(aCard,t,7.6,0.7,30,0.9,1.6);
  SIT.forEach((o,i)=>{
    popA(o.el,t,o.ts,0.5,18,0.7,2.0);
    sweepAny(o.sw,t,[o.ts+0.5]);
  });
  sweepAny(aCardSw,t,[9.9]);
  const alp=eoe(seg(t,10.3,0.5));
  aTl.style.opacity=String(alp);
  aTl.style.transform=`translateY(${((1-alp)*14).toFixed(2)}px)`;
  const alpe=eoe(seg(t,10.45,0.5));
  aTlE.style.opacity=String(alpe*0.95);
  aTlE.style.transform=`translateY(${((1-alpe)*10).toFixed(2)}px)`;
  const asub=eoe(seg(t,11.2,0.5));
  aTsub.style.opacity=String(asub*0.95);
  aTsub.style.transform=`translateY(${((1-asub)*10).toFixed(2)}px)`;""", 1, "render S1")

# render S2: muncul kelompok bertahap
E = rep(E, """  DT.forEach((el,i)=>{
    popA(el,t,16.8+i*0.08,0.5,24,0.8,2.0);
    if(i===5)sweepAny(DSWEEP,t,[17.6]);
  });""",
"""  DT.forEach((el,i)=>{
    const ts0=(i<3)?15.8+i*0.35:(i===3?19.5:23.0);
    popA(el,t,ts0,0.5,24,0.8,2.0);
    if(i===3)sweepAny(el.querySelector('.sweep'),t,[19.9]);
    if(i===4)sweepAny(DSWEEP,t,[23.4]);
  });""", 1, "render S2 DT")
E = rep(E, "  fadeUp(bTake,t,22.8,0.7,26);\n  bMark.style.transform=`scaleX(${eio(seg(t,23.0,0.7)).toFixed(3)})`;",
"  fadeUp(bTake,t,24.0,0.7,26);\n  bMark.style.transform=`scaleX(${eio(seg(t,24.2,0.7)).toFixed(3)})`;", 1, "render S2 take")

# render S3: waktu tahap baru + emas di tahap 5
E = rep(E, "  for(const s of [29.0,30.6,32.2]){", "  for(const s of [27.9,29.2,30.5,31.8]){", 2, "S3 loop")
E = rep(E, "cMorph.classList.toggle('grad',st===3);", "cMorph.classList.toggle('grad',st===4);", 1, "S3 grad")
E = rep(E, "cStage.style.color=st===3?'#FBBF24':'#94A3B8';", "cStage.style.color=st===4?'#FBBF24':'#94A3B8';", 1, "S3 warna")

if E is not None:
    ENG.write_text(E)
    print("engine.html selesai")
else:
    print("engine.html sudah dipatch sebelumnya")

# ---------- AUDIO ----------
A = aud
A = rep(A, '"""Musik & SFX prosedural untuk video 05 "Angka, Bilangan, dan Nomor".',
'"""Musik & SFX prosedural untuk video 07 "Babopa: Bilangan Tidak Cuma 1, 2, 3?".', 1, "doc")
A = rep(A, "# ---------- momen kunci (v07: asal-usul simbol, bab push-pan) ----------",
"# ---------- momen kunci (video 07: babopa, keluarga bilangan) ----------", 1, "komentar")
A = rep(A, "add(0.5, boom(0.24))                       # angka 1 pahlawan menghantam",
"add(0.5, boom(0.24))                       # 1, 2, 3 pahlawan menghantam", 1, "boom0.5")
A = rep(A, """for i, tc in enumerate([1.0, 1.45, 1.9]):  # kartu goresan, segitiga, lengkung""",
"for i, tc in enumerate([1.0, 1.45, 1.9]):  # kartu negatif, pecahan, irasional", 1, "kartu hook")
A = rep(A, 'add(2.6, tick(760, 0.045))                 # "kenapa satu ditulis 1?"',
'add(2.6, tick(760, 0.045))                 # "matematika tidak sesempit itu"', 1, "2.6")
A = rep(A, 'add(7.2, chime(660.0, 0.10))               # kata GORESAN',
'add(7.2, chime(660.0, 0.10))               # kata SITUASI', 1, "chime7.2")
A = rep(A, """for i in range(12):                        # dua belas goresan muncul
    add(8.4 + i * 0.08, tick(900 + i * 45, 0.045))
for ts in [8.82, 9.42]:                    # garis coret kelima tiap kelompok
    add(ts, tick(1200, 0.06))""",
"""for i in range(4):                         # empat kartu situasi muncul
    add(7.8 + i * 0.45, tick(700 + i * 130, 0.05))""", 1, "ticks S1")
A = rep(A, """add(10.1, whoosh(0.25, True, 0.04))        # count-up label 347
add(10.1, tick(520, 0.045))                # label "347 = 347 GORESAN"
add(10.5, tick(300, 0.06))                 # gelembung tokoh "lelah hitung..."
add(11.4, boom(0.08))                      # beat "semakin rumit" di subtitle""",
"""add(10.3, whoosh(0.3, True, 0.04))         # label EMPAT SITUASI
add(10.3, tick(520, 0.045))                # label takeaway
add(8.9, tick(300, 0.06))                  # gelembung tokoh "dingin!"
add(11.4, boom(0.08))                      # beat emas "jenis berbeda" """, 1, "label+gelembung")
A = rep(A, 'add(21.3, tick(340, 0.06))                 # gelembung tokoh "rapi!"\n', "", 1, "buang gelembung 21.3 lama")
A = rep(A, 'add(15.6, chime(587.33, 0.12))             # kata DESIMAL',
'add(15.6, chime(587.33, 0.12))             # kata KELOMPOK', 1, "chime15.6")
A = rep(A, """for i in range(10):                        # angka 0 sampai 9 berjalan
    add(16.8 + i * 0.08, tick(900 + i * 55, 0.045))""",
"""for i in range(3):                         # ubin asli, cacah, bulat
    add(15.8 + i * 0.35, tick(640 + i * 90, 0.05))
add(19.5, tick(700, 0.05))                 # ubin rasional
add(23.0, tick(760, 0.05))                 # ubin irasional""", 1, "ticks S2")
A = rep(A, """for i, tc in enumerate([19.2, 20.1, 21.0]):  # kartu 5, 50, 500
    add(tc - 0.05, whoosh(0.3, True, 0.04))
    add(tc, chime([660.0, 740.0, 880.0][i], 0.08))
add(21.0, boom(0.06))                      # kartu 500 mendarat
for it in (20.35, 21.25):                  # tag anotasi +0 / +00
    add(it, tick(1150, 0.05))""",
"""add(19.45, whoosh(0.3, True, 0.04))
add(19.5, chime(660.0, 0.08))              # sorot rasional
add(22.95, whoosh(0.3, True, 0.04))
add(23.0, chime(880.0, 0.08))              # sorot irasional
add(23.0, boom(0.06))                      # ubin irasional mendarat""", 1, "sorot S2")
A = rep(A, 'add(22.8, boom(0.10))                      # beat "posisi mengubah nilai" di subtitle',
'add(22.9, boom(0.10))                      # beat emas "irasional" di subtitle', 1, "boom22.9")
A = rep(A, 'add(40.4, tick(340, 0.06))                 # gelembung tokoh "aman."\n', "", 1, "buang duplikat 40.4")
A = rep(A, 'add(26.4, chime(523.25, 0.12))             # kata SIMBOL',
'add(26.4, chime(523.25, 0.12))             # kata KENAPA?', 1, "chime26.4")
A = rep(A, 'add(27.6, tick(1050, 0.06))                # kotak "7" mendarat',
'add(27.6, tick(1050, 0.06))                # kotak "1, 2, 3" mendarat', 1, "kotak27.6")
A = rep(A, """for ts in [29.0, 30.6, 32.2]:              # ganti VII, TUJUH, NILAI SAMA
    add(ts, tick(900, 0.085))
    add(ts + 0.02, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(32.2, boom(0.14))                      # "NILAI SAMA."
""",
"""for ts in [27.9, 29.2, 30.5, 31.8]:        # keluarga tumbuh: 0, negatif, pecahan, irasional
    add(ts, tick(900, 0.085))
    add(ts + 0.02, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(32.3, boom(0.14))                      # beat emas "persoalan tidak selalu sama" """.rstrip() + "\n", 1, "tahap S3")
A = rep(A, 'add(35.5, boom(0.06))                      # bintang pahlawan mendarat',
'add(35.5, boom(0.06))                      # pi pahlawan mendarat', 1, "boom35.5")
A = rep(A, 'add(36.7, tick(760, 0.045))                # "ganti lambang? boleh saja"',
'add(36.7, tick(760, 0.045))                # "matematika tumbuh mencari cara"', 1, "36.7")
A = rep(A, 'add(38.2, whoosh(0.35, True, 0.05))        # chip "bintang + 2 = 9"',
'add(38.2, whoosh(0.35, True, 0.05))        # chip "1/2 + 1/2 = 1"', 1, "38.2")
A = rep(A, 'add(40.2, boom(0.10))                      # "lambang boleh ganti, hasil tidak"',
'add(40.2, boom(0.10))                      # "cara bebas, hasil sesuai aturan"', 1, "boom40.2")

AUD.write_text(A)
print("audio07.py selesai")
