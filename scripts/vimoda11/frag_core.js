const Q=new URLSearchParams(location.search);
const ORIENT=Q.get('o')||'landscape';
const W=ORIENT==='portrait'?1080:1920;
const H=ORIENT==='portrait'?1920:1080;

/* v11 "Buhbus" - DUNIA BARU: RUMAH PETA KARTIKA, ruang kartografi vintage:
   kertas peta tua krem dengan grid tinta biru, meja mahoni dengan peta
   terbuka dan pita angka pi yang digitnya muncul satu per satu lalu ditutup
   titik titik, kompas kuningan raksasa di dinding, lampu gantung ber-tudung
   hijau, lantai papan kayu dengan karpet marun, rak kartu katalog, segel
   lilin merah. Kartu uji bergaya kartu katalog yang dibalik satu per satu.
   Latar BERBEDA TOTAL dari Dapoer Posya dan episode lain (aturan 26).
   Karakter: HANYA bola emas mentor, bulat sejati, tanpa mata (aturan 23).
   Subjudul zona aman dua baris (aturan 27); watermark AKIOMIDA di tepi
   paling bawah (aturan 24); penutup bersih (aturan 28). */
const P = ORIENT==='portrait' ? {
  floorY:1080, bbY:1064, ceilH:110,
  tableX:50, tableW:330, slabY:830, slabH:52, legBot:1080,
  mapW:300, mapH:96, mapCX:215, mapCY:778,
  ribW:290, ribH:44, ribX:70, ribY:690,
  stampX:470, stampY:600, stampW:480, stampH:60, stampFS:26,
  panelX:400, panelY:470, panelW:610, panelH:360,
  pilX:305, pilY:758, pilW:470, pilH:68, pilFS:28,
  ecY:830, barW:420,
  titleY:300, titleS0:80, titleSN:74,
  subTop:1170, subId:40, subEn:22, subMax:880,
  ballD:110, groundY:1120, wmY:1800, wmFS:20,
  lampsX:[340,700], lampsY:[168,150], lampsD:[74,62],
  compassC:[78,468], compassD:96,
  rugX:220, rugW:640, rugY:1092, rugH:96,
  cabX:830, cabY:880, cabW:180, cabH:130,
  cardW:130, cardH:96, cardFS:28
} : {
  floorY:508, bbY:494, ceilH:70,
  tableX:140, tableW:360, slabY:540, slabH:40, legBot:700,
  mapW:340, mapH:82, mapCX:320, mapCY:494,
  ribW:330, ribH:38, ribX:150, ribY:404,
  stampX:960, stampY:440, stampW:560, stampH:56, stampFS:24,
  panelX:760, panelY:250, panelW:1020, panelH:290,
  pilX:760, pilY:600, pilW:430, pilH:65, pilFS:26,
  ecY:400, barW:520,
  titleY:150, titleS0:88, titleSN:72,
  subTop:740, subId:38, subEn:20, subMax:1360,
  ballD:96, groundY:660, wmY:1010, wmFS:18,
  lampsX:[560,1000], lampsY:[112,100], lampsD:[62,52],
  compassC:[80,300], compassD:88,
  rugX:620, rugW:680, rugY:676, rugH:66,
  cabX:1450, cabY:560, cabW:220, cabH:130,
  cardW:150, cardH:84, cardFS:26
};
const stage=document.getElementById('stage');
stage.style.width=W+'px';stage.style.height=H+'px';

/* ---------- util & easing ---------- */
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
const lerp=(a,b,p)=>a+(b-a)*p;
const seg=(t,a,d)=>clamp((t-a)/d,0,1);
const eio=p=>p<0.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
const eoe=p=>1-Math.pow(1-p,3);
const smz=(t,a,b,f)=>f?clamp((t-a)/f,0,1)*clamp((b-t)/f,0,1):(t>=a&&t<b?1:0);
function popA(el,t,t0,d,ov,op0,op1){
  const o=clamp(seg(t,t0,0.3)*(1-seg(t,op1,0.35)),0,1);
  const s2=1+(ov/100)*Math.sin(clamp(seg(t,t0,d),0,1)*Math.PI)*(1-seg(t,op1,0.35));
  el.style.opacity=String(o);
  el.style.transform=`scale(${s2.toFixed(3)})`;
}
let _seed=20261118;
const rnd=()=>{_seed|=0;_seed=_seed+0x6D2B79F5|0;let z=Math.imul(_seed^_seed>>>15,1|_seed);
  z=z+Math.imul(z^z>>>7,61|z)^z;return((z^z>>>14)>>>0)/4294967296;};

/* ---------- dinding peta, plafon, lampu, kompas, lantai ---------- */
const wallEl=document.getElementById('mapwall');
wallEl.style.cssText+=`height:${P.floorY}px;`;
const floorEl=document.getElementById('floorplank');
floorEl.style.cssText+=`top:${P.floorY}px;height:${H-P.floorY}px;`;
const bbEl=document.getElementById('baseboard');
bbEl.style.cssText+=`top:${P.bbY}px;height:${P.floorY-P.bbY}px;`;
const ceilEl=document.getElementById('ceiling');
ceilEl.style.cssText+=`height:${P.ceilH}px;`;
{
  const band=document.createElement('div');
  band.className='beam';
  band.style.cssText+=`left:0;top:0;width:100%;height:${Math.round(P.ceilH*0.32)}px;`;
  ceilEl.appendChild(band);
  const nb=ORIENT==='portrait'?3:4;
  for(let i=0;i<nb;i++){
    const bx=lerp(W*0.08,W*0.92,i/(nb-1));
    const bm=document.createElement('div');
    bm.className='beam';
    const bw=Math.round(P.ceilH*0.20);
    bm.style.cssText+=`left:${bx-bw/2}px;top:0;width:${bw}px;height:${P.ceilH}px;border-radius:${bw/2}px ${bw/2}px 8px 8px;`;
    ceilEl.appendChild(bm);
  }
}
const LAMPS=[];
document.querySelectorAll('.lampW').forEach((lw,i)=>{
  const lx=P.lampsX[i], ly=P.lampsY[i], ld=P.lampsD[i];
  const cord=lw.querySelector('.cord');
  cord.style.cssText+=`left:${lx-2}px;top:${Math.round(P.ceilH*0.9)}px;height:${ly-Math.round(P.ceilH*0.9)}px;`;
  const shade=lw.querySelector('.shade');
  shade.style.cssText+=`left:${lx-ld/2}px;top:${ly}px;width:${ld}px;height:${Math.round(ld*0.5)}px;`;
  const glow=lw.querySelector('.glow');
  glow.style.cssText+=`left:${lx-ld*0.9}px;top:${ly+Math.round(ld*0.2)}px;width:${ld*1.8}px;height:${ld*1.8}px;`;
  LAMPS.push({lw,shade,ph:i*2.1});
});
/* kompas kuningan raksasa di dinding kiri atas */
const compEl=document.getElementById('compass');
{
  const [cx,cy]=P.compassC, cd=P.compassD;
  const rim=compEl.querySelector('.rim');
  rim.style.cssText+=`left:${cx-cd/2}px;top:${cy-cd/2}px;width:${cd}px;height:${cd}px;`;
  const face=compEl.querySelector('.face');
  face.style.cssText+=`left:${cx-cd/2+7}px;top:${cy-cd/2+7}px;width:${cd-14}px;height:${cd-14}px;`;
  const n1=compEl.querySelector('.needle');
  n1.style.cssText+=`left:${cx-3}px;top:${cy-cd*0.34}px;width:6px;height:${cd*0.34}px;transform:rotate(38deg);transform-origin:50% 100%;`;
  const n2=compEl.querySelector('.needle2');
  n2.style.cssText+=`left:${cx-3}px;top:${cy-cd*0.3}px;width:6px;height:${cd*0.3}px;transform:rotate(218deg);transform-origin:50% 100%;`;
  const pip=compEl.querySelector('.pip');
  pip.style.cssText+=`left:${cx-6}px;top:${cy-6}px;width:12px;height:12px;`;
  const nm=compEl.querySelector('.nmark');
  nm.style.cssText+=`left:${cx-7}px;top:${cy-cd/2+9}px;font-size:${Math.round(cd*0.2)}px;`;
}
/* karpet marun di lantai tengah */
const rugEl=document.getElementById('rug');
rugEl.style.cssText+=`left:${P.rugX}px;top:${P.rugY}px;width:${P.rugW}px;height:${P.rugH}px;`;

/* ---------- meja mahoni, peta terbuka, pita pi ---------- */
const tableEl=document.getElementById('tableT');
{
  const slab=tableEl.querySelector('.slab');
  slab.style.cssText+=`left:${P.tableX}px;top:${P.slabY}px;width:${P.tableW}px;height:${P.slabH}px;`;
  const legs=tableEl.querySelectorAll('.leg');
  legs[0].style.cssText+=`left:${P.tableX+26}px;top:${P.slabY+P.slabH}px;height:${P.legBot-P.slabY-P.slabH}px;`;
  legs[1].style.cssText+=`left:${P.tableX+P.tableW-52}px;top:${P.slabY+P.slabH}px;height:${P.legBot-P.slabY-P.slabH}px;`;
}
const mapEl=document.getElementById('mapSheet');
{
  const mwx=P.mapCX-P.mapW/2, mwy=P.mapCY-P.mapH/2;
  const paper=mapEl.querySelector('.paper');
  paper.style.cssText+=`left:${mwx}px;top:${mwy}px;width:${P.mapW}px;height:${P.mapH}px;`;
  const gr=mapEl.querySelector('.gr');
  gr.style.cssText+=`left:${mwx+8}px;top:${mwy+8}px;width:${P.mapW-16}px;height:${P.mapH-16}px;`;
  const coast=mapEl.querySelector('.coast');
  coast.style.cssText+=`left:${mwx+P.mapW*0.08}px;top:${mwy+P.mapH*0.16}px;width:${P.mapW*0.44}px;height:${P.mapH*0.66}px;`;
  const mini=mapEl.querySelector('.mini');
  mini.style.cssText+=`left:${mwx+P.mapW*0.68}px;top:${mwy+P.mapH*0.18}px;width:${Math.round(P.mapH*0.4)}px;height:${Math.round(P.mapH*0.4)}px;`;
  const mline=mapEl.querySelector('.mline');
  mline.style.cssText+=`left:${mwx+P.mapW*0.5}px;top:${mwy+P.mapH*0.62}px;width:${P.mapW*0.42}px;height:3px;
    background:repeating-linear-gradient(90deg,#B5432E 0 9px,transparent 9px 16px);`;
  const wax=mapEl.querySelector('.wax');
  wax.style.cssText+=`left:${mwx+P.mapW*0.62}px;top:${mwy+P.mapH*0.62}px;width:${Math.round(P.mapH*0.34)}px;height:${Math.round(P.mapH*0.34)}px;`;
}
/* pita angka pi di atas peta */
const PI_DIGITS='3,1415926535';
const ribbonEl=document.getElementById('ribbon');
{
  const strip=ribbonEl.querySelector('.strip');
  strip.style.cssText+=`left:${P.ribX}px;top:${P.ribY}px;width:${P.ribW}px;height:${P.ribH}px;`;
  const dg=ribbonEl.querySelector('.digits');
  dg.style.cssText+=`left:${P.ribX+16}px;top:${P.ribY+P.ribH/2-11}px;font-size:${ORIENT==='portrait'?21:19}px;`;
  const dots=ribbonEl.querySelector('.dots');
  dots.style.cssText+=`left:${P.ribX+P.ribW-46}px;top:${P.ribY+P.ribH/2-15}px;font-size:${ORIENT==='portrait'?26:23}px;`;
}

/* ---------- rak kartu katalog ---------- */
const cabEl=document.getElementById('cabinet');
{
  const box=cabEl.querySelector('.box');
  box.style.cssText+=`left:${P.cabX}px;top:${P.cabY}px;width:${P.cabW}px;height:${P.cabH}px;`;
  const nd=3;
  for(let i=0;i<nd;i++){
    const dw=document.createElement('div');
    dw.className='drawer';
    const dh=Math.round(P.cabH*0.26);
    dw.style.cssText+=`left:${P.cabX+12}px;top:${P.cabY+10+i*(dh+8)}px;width:${P.cabW-24}px;height:${dh}px;`;
    cabEl.appendChild(dw);
    const hd=document.createElement('div');
    hd.className='handle';
    hd.style.cssText+=`left:${P.cabX+P.cabW/2-10}px;top:${P.cabY+10+i*(dh+8)+dh/2-4}px;width:20px;height:8px;`;
    cabEl.appendChild(hd);
  }
}

/* ---------- panel-panel konten (satu ide per layar) ---------- */
const propsEl=document.getElementById('props');
const ROWS1=[];
const ROWS3P=[];
/* stempel hook */
const stamp=document.createElement('div');
stamp.className='stamp';
stamp.style.cssText+=`left:${P.stampX}px;top:${P.stampY}px;width:${P.stampW}px;height:${P.stampH}px;font-size:${P.stampFS}px;opacity:0;`;
stamp.textContent='ITU BILANGAN IRASIONAL';
propsEl.appendChild(stamp);

/* panel 1: definisi irasional */
const panel1=document.createElement('div');
panel1.className='panelI';
panel1.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p1Hd=document.createElement('div');
p1Hd.className='pHd';
p1Hd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.05)}px;`;
p1Hd.textContent='BILANGAN IRASIONAL';
panel1.appendChild(p1Hd);
const p1Mid=document.createElement('div');
p1Mid.style.cssText+=`display:flex;align-items:center;height:${Math.round(P.panelH*0.32)}px;padding:0 ${Math.round(P.panelW*0.07)}px;`;
const p1Ex=document.createElement('div');
p1Ex.className='pEx';
p1Ex.style.cssText+=`font-size:${ORIENT==='portrait'?48:42}px;color:#FFF6E6;width:${Math.round(P.panelW*0.34)}px;`;
p1Ex.textContent='BUKAN a/b';
p1Mid.appendChild(p1Ex);
const p1R=document.createElement('div');
p1R.style.cssText+=`flex:1;`;
[['TIDAK DAPAT DITULIS SEBAGAI PECAHAN',7.8],['a DAN b BILANGAN BULAT, b TIDAK 0',8.8]].forEach(([tx,t0])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?44:38}px;opacity:0;`;
  const dot=document.createElement('div');
  dot.className='pDot';
  dot.style.cssText+=`width:${ORIENT==='portrait'?19:16}px;height:${ORIENT==='portrait'?19:16}px;background:#D98F2E;margin-right:12px;`;
  r.appendChild(dot);
  const n=document.createElement('div');
  n.className='pName';
  n.style.cssText+=`font-size:${ORIENT==='portrait'?20:18}px;`;
  n.textContent=tx;
  r.appendChild(n);
  p1R.appendChild(r);
  ROWS1.push({el:r,t0});
});
p1Mid.appendChild(p1R);
panel1.appendChild(p1Mid);
const p1Chips=document.createElement('div');
p1Chips.style.cssText+=`display:flex;align-items:center;justify-content:center;height:${Math.round(P.panelH*0.22)}px;gap:${ORIENT==='portrait'?14:18}px;`;
const P1CHIPS=['√2','√3','√5','π'].map((v,i)=>{
  const c=document.createElement('div');
  c.className='chipA';
  const cw=Math.round(ORIENT==='portrait'?100:120);
  c.style.cssText+=`width:${cw}px;height:${ORIENT==='portrait'?48:44}px;font-size:${ORIENT==='portrait'?25:23}px;`;
  c.textContent=v;
  p1Chips.appendChild(c);
  return {el:c,t0:9.8+i*0.16};
});
panel1.appendChild(p1Chips);
const p1Note=document.createElement('div');
p1Note.className='pNote';
p1Note.style.cssText+=`height:${ORIENT==='portrait'?46:40}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?20:18}px;`;
p1Note.textContent='TIDAK BERHENTI, TIDAK BERPOLA';
panel1.appendChild(p1Note);
propsEl.appendChild(panel1);

/* panel 2: kartu akar yang dibalik satu per satu */
const panel2=document.createElement('div');
panel2.className='panelI';
panel2.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p2Hd=document.createElement('div');
p2Hd.className='pHd';
p2Hd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p2Hd.textContent='LIHAT HASIL AKARNYA';
panel2.appendChild(p2Hd);
/* baris 1: akar yang hasilnya bulat */
const row1=document.createElement('div');
row1.style.cssText+=`display:flex;align-items:center;justify-content:center;gap:16px;height:${ORIENT==='portrait'?96:80}px;`;
const R1C=[];
[['√4','2',18.4],['√9','3',18.9],['√16','4',19.4]].forEach(([q,val,tf])=>{
  const c=document.createElement('div');
  c.className='rootCard';
  c.style.cssText+=`position:relative;width:${P.cardW}px;height:${P.cardH}px;`;
  const v=document.createElement('div');
  v.className='val';
  v.style.fontSize=P.cardFS+'px';
  v.textContent=q;
  const tg=document.createElement('div');
  tg.className='tag';
  tg.style.fontSize=Math.round(P.cardFS*0.42)+'px';
  tg.textContent='?';
  c.appendChild(v);
  c.appendChild(tg);
  row1.appendChild(c);
  R1C.push({el:c,v,tg,tf,q,val,tag:'BULAT',col:'#2E6E52',bd:'#7FBF8E'});
});
panel2.appendChild(row1);
/* baris 2: akar dua dan deretannya */
const row2=document.createElement('div');
row2.style.cssText+=`display:flex;align-items:center;gap:16px;height:${ORIENT==='portrait'?92:74}px;padding:0 ${Math.round(P.panelW*0.06)}px;`;
const c2=document.createElement('div');
c2.className='rootCard';
c2.style.cssText+=`position:relative;width:${P.cardW}px;height:${ORIENT==='portrait'?84:66}px;`;
const v2=document.createElement('div');
v2.className='val';
v2.style.fontSize=P.cardFS+'px';
v2.textContent='√2';
const tg2=document.createElement('div');
tg2.className='tag';
tg2.style.fontSize=Math.round(P.cardFS*0.42)+'px';
tg2.textContent='?';
c2.appendChild(v2);
c2.appendChild(tg2);
row2.appendChild(c2);
const series=document.createElement('div');
series.className='series';
series.style.cssText+=`position:relative;flex:1;height:${ORIENT==='portrait'?54:44}px;font-size:${ORIENT==='portrait'?21:18}px;justify-content:center;align-items:center;`;
series.textContent='1,4142135623...';
row2.appendChild(series);
panel2.appendChild(row2);
/* baris 3: twist akar 25, 36, 7 */
const row3=document.createElement('div');
row3.style.cssText+=`display:flex;align-items:center;justify-content:center;gap:14px;height:${ORIENT==='portrait'?78:62}px;`;
const R3C=[];
[['√25','5','#2E6E52','#7FBF8E','RASIONAL'],['√36','6','#2E6E52','#7FBF8E','RASIONAL'],['√7','7','#8A3A24','#D98F7E','IRASIONAL']].forEach(([q,val,col,bd,tag],i)=>{
  const c=document.createElement('div');
  c.className='rootCard';
  const cw=Math.round(P.cardW*0.86);
  c.style.cssText+=`position:relative;width:${cw}px;height:${ORIENT==='portrait'?66:54}px;`;
  const v=document.createElement('div');
  v.className='val';
  v.style.fontSize=Math.round(P.cardFS*0.88)+'px';
  v.textContent=q;
  const tg=document.createElement('div');
  tg.className='tag';
  tg.style.fontSize=Math.round(P.cardFS*0.4)+'px';
  tg.textContent='?';
  c.appendChild(v);
  c.appendChild(tg);
  row3.appendChild(c);
  R3C.push({el:c,v,tg,tf:26.0+i*0.5,q,val,col,bd,tag});
});
panel2.appendChild(row3);
const p2Note=document.createElement('div');
p2Note.className='pNote';
p2Note.style.cssText+=`height:${ORIENT==='portrait'?40:34}px;margin:2px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?19:17}px;`;
p2Note.textContent='TANDA AKAR BUKAN PENENTU';
panel2.appendChild(p2Note);
propsEl.appendChild(panel2);

/* panel 3: kompas keliling lingkaran dan rumus */
const panel3=document.createElement('div');
panel3.className='panelI';
panel3.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p3Hd=document.createElement('div');
p3Hd.className='pHd';
p3Hd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.05)}px;`;
p3Hd.textContent='LINGKARAN DAN PI';
panel3.appendChild(p3Hd);
const p3Mid=document.createElement('div');
p3Mid.style.cssText+=`display:flex;align-items:center;height:${Math.round(P.panelH*0.42)}px;padding:0 ${Math.round(P.panelW*0.06)}px;`;
const pcomp=document.createElement('div');
pcomp.className='pcompass';
const pcd=Math.round(P.panelH*0.34);
pcomp.style.cssText+=`position:relative;width:${pcd*1.7}px;height:${pcd}px;flex:none;`;
{
  const ccx=Math.round(pcd*0.72), ccy=Math.round(pcd/2), cr=Math.round(pcd*0.42);
  const rim=document.createElement('div');
  rim.className='rim';
  rim.style.cssText+=`left:${ccx-cr-8}px;top:${ccy-cr-8}px;width:${cr*2+16}px;height:${cr*2+16}px;`;
  pcomp.appendChild(rim);
  const face=document.createElement('div');
  face.className='face';
  face.style.cssText+=`left:${ccx-cr}px;top:${ccy-cr}px;width:${cr*2}px;height:${cr*2}px;`;
  pcomp.appendChild(face);
  const rl=document.createElement('div');
  rl.className='rline';
  rl.style.cssText+=`left:${ccx}px;top:${ccy-3}px;width:${cr}px;height:6px;`;
  pcomp.appendChild(rl);
  const rc=document.createElement('div');
  rc.className='rc';
  rc.style.cssText+=`left:${ccx-6}px;top:${ccy-6}px;width:12px;height:12px;`;
  pcomp.appendChild(rc);
  const lab=document.createElement('div');
  lab.className='rlab';
  lab.style.cssText+=`left:${ccx+cr*0.45}px;top:${ccy-cr*0.75}px;font-size:${Math.round(pcd*0.26)}px;`;
  lab.textContent='r';
  pcomp.appendChild(lab);
}
p3Mid.appendChild(pcomp);
const p3R=document.createElement('div');
p3R.style.cssText+=`flex:1;`;
const formula=document.createElement('div');
formula.className='formula';
formula.style.cssText+=`position:relative;font-size:${ORIENT==='portrait'?34:30}px;height:${ORIENT==='portrait'?46:38}px;`;
formula.textContent='K = 2 × π × r';
p3R.appendChild(formula);
[['PI KIRA KIRA 3,14159',34.4],['TANDA ≈ ARTINYA PENDEKATAN',35.6]].forEach(([tx,t0])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?40:34}px;opacity:0;`;
  const dot=document.createElement('div');
  dot.className='pDot';
  dot.style.cssText+=`width:${ORIENT==='portrait'?17:15}px;height:${ORIENT==='portrait'?17:15}px;background:#D98F2E;margin-right:12px;`;
  r.appendChild(dot);
  const n=document.createElement('div');
  n.className='pName';
  n.style.cssText+=`font-size:${ORIENT==='portrait'?19:17}px;`;
  n.textContent=tx;
  r.appendChild(n);
  p3R.appendChild(r);
  ROWS3P.push({el:r,t0});
});
p3Mid.appendChild(p3R);
panel3.appendChild(p3Mid);
const p3Note=document.createElement('div');
p3Note.className='pNote';
p3Note.style.cssText+=`height:${ORIENT==='portrait'?44:38}px;margin:2px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?19:17}px;`;
p3Note.textContent='PI TIDAK PERNAH BERAKHIR';
panel3.appendChild(p3Note);
propsEl.appendChild(panel3);

/* panel 4: dua keluarga rasional vs irasional */
const panel4=document.createElement('div');
panel4.className='panelI';
panel4.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p4Hd=document.createElement('div');
p4Hd.className='pHd';
p4Hd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.05)}px;`;
p4Hd.textContent='DUA KELUARGA';
panel4.appendChild(p4Hd);
const p4Cols=document.createElement('div');
p4Cols.style.cssText+=`display:flex;gap:16px;height:${Math.round(P.panelH*0.55)}px;padding:8px ${Math.round(P.panelW*0.05)}px 0;`;
const KCOLS=[];
[['RASIONAL','#2E6E52','#7FBF8E',['BISA DITULIS a/b','BERHENTI ATAU BERULANG','CONTOH: 1/2, 0,75'],41.0],
 ['IRASIONAL','#8A3A24','#D98F7E',['TIDAK BISA DITULIS a/b','TIDAK BERHENTI, TIDAK BERPOLA','CONTOH: √2, π'],41.8]].forEach(([nm,col,bd,rows,t0],ci)=>{
  const colDiv=document.createElement('div');
  colDiv.className='kcol';
  colDiv.style.cssText+=`flex:1;border-color:${bd};`;
  const kh=document.createElement('div');
  kh.className='kh';
  kh.style.cssText+=`color:${col};font-size:${ORIENT==='portrait'?20:18}px;padding-top:6px;`;
  kh.textContent=nm;
  colDiv.appendChild(kh);
  const kr=[];
  rows.forEach(tx=>{
    const r=document.createElement('div');
    r.className='krow';
    r.style.cssText+=`height:${ORIENT==='portrait'?40:34}px;padding:0 12px;opacity:0;`;
    const d=document.createElement('div');
    d.className='kd';
    d.style.cssText+=`width:${ORIENT==='portrait'?14:12}px;height:${ORIENT==='portrait'?14:12}px;background:${col};margin-right:10px;`;
    r.appendChild(d);
    const tt=document.createElement('div');
    tt.className='kt';
    tt.style.cssText+=`font-size:${ORIENT==='portrait'?18:16}px;`;
    tt.textContent=tx;
    r.appendChild(tt);
    colDiv.appendChild(r);
    kr.push({el:r});
  });
  p4Cols.appendChild(colDiv);
  KCOLS.push({col:colDiv,t0,rows:kr});
});
panel4.appendChild(p4Cols);
const p4Note=document.createElement('div');
p4Note.className='pNote';
p4Note.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;margin:6px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?19:17}px;`;
p4Note.textContent='DUA DUANYA BILANGAN REAL';
panel4.appendChild(p4Note);
propsEl.appendChild(panel4);

/* kartu uji: enam bilangan untuk dikelompokkan (grid 2 baris x 3 kolom) */
const UJI_VALS=['√49','√3','0,5555...','π','5/8','√100'];
const CARDS=UJI_VALS.map((v,i)=>{
  const c=document.createElement('div');
  c.className='rootCard';
  const col=i%3, row=Math.floor(i/3);
  const gx=P.panelX+Math.round(P.panelW*0.5)-(3*P.cardW+2*20)/2+col*(P.cardW+20);
  const gy=ORIENT==='portrait'?528+row*124:300+row*110;
  const cfs=v.length>6?17:(v.length>4?22:P.cardFS);
  c.style.cssText+=`left:${gx}px;top:${gy}px;width:${P.cardW}px;height:${ORIENT==='portrait'?104:96}px;
    font-size:${cfs}px;opacity:0;`;
  c.textContent=v;
  propsEl.appendChild(c);
  return {el:c,flip:44.9+i*0.42,val:v,ph:i*0.8};
});
/* kartu uji memakai teks tunggal: nilai dibalik dari tanda tanya */
CARDS.forEach(c=>{c.el.textContent='?';});
/* tag pengingat bahan di atas kartu */
const tagUji=document.createElement('div');
tagUji.className='pNote';
tagUji.style.cssText+=`position:absolute;left:${P.panelX+Math.round(P.panelW*0.16)}px;top:${ORIENT==='portrait'?478:258}px;
  width:${Math.round(P.panelW*0.68)}px;height:${ORIENT==='portrait'?46:36}px;font-size:${ORIENT==='portrait'?19:17}px;opacity:0;`;
tagUji.textContent='AKAR TIDAK SELALU IRASIONAL';
propsEl.appendChild(tagUji);

/* ---------- karakter: HANYA bola emas mentor, bulat sejati, tanpa mata ---------- */
const charsEl=document.getElementById('chars');
function makeBall(cols,d,glow){
  const el=document.createElement('div');
  el.className='bchar';
  el.style.cssText+=`width:${d}px;height:${d}px;margin-left:${-d/2}px;opacity:0;`;
  const core=document.createElement('div');
  core.className='core';
  core.style.cssText+=`left:0;top:0;width:${d}px;height:${d}px;
    background:radial-gradient(circle at 33% 27%, ${cols[0]} 0%, ${cols[1]} 42%, ${cols[2]} 100%);`;
  if(glow)core.style.boxShadow=`0 0 ${Math.round(d*0.55)}px rgba(251,191,36,.5)`;
  el.appendChild(core);
  const shine=document.createElement('div');
  shine.className='shine';
  shine.style.cssText+=`left:${d*0.18}px;top:${d*0.1}px;width:${d*0.3}px;height:${d*0.17}px;transform:rotate(-24deg);`;
  el.appendChild(shine);
  charsEl.appendChild(el);
  return {el,d};
}
const mentor=makeBall(['#FFF3C4','#FCD34D','#B45309'],P.ballD,true);
const msh=document.createElement('div');
msh.className='bsh';
msh.style.cssText+=`width:${P.ballD*0.8}px;height:15px;margin-left:${-P.ballD*0.4}px;top:-10px;`;
charsEl.appendChild(msh);
const spark=document.createElement('div');
spark.className='spark';
{
  const sa=document.createElement('div');
  sa.className='sa';
  sa.style.cssText+=`left:13px;top:0;width:8px;height:34px;`;
  spark.appendChild(sa);
  const sb=document.createElement('div');
  sb.className='sa';
  sb.style.cssText+=`left:0;top:13px;width:34px;height:8px;`;
  spark.appendChild(sb);
  const sc=document.createElement('div');
  sc.className='sa';
  sc.style.cssText+=`left:13px;top:13px;width:8px;height:8px;`;
  spark.appendChild(sc);
}
charsEl.appendChild(spark);

/* ---------- pil dan endcard ---------- */
const pil=document.getElementById('pil');
pil.style.cssText+=`left:${P.pilX}px;top:${P.pilY}px;width:${P.pilW}px;height:${P.pilH}px;font-size:${P.pilFS}px;letter-spacing:.1em;`;
const endcard=document.getElementById('endcard');
endcard.style.cssText+=`top:${P.ecY}px;`;
const fUrl=document.getElementById('f_url');
fUrl.style.cssText+=`font-size:${ORIENT==='portrait'?92:80}px;
  background:linear-gradient(92deg,#7FA6BF 0%,#B5432E 52%,#D98F2E 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;`;
const fBar=document.getElementById('f_bar');
fBar.style.cssText+=`display:block;margin:16px auto 0;width:0;`;

/* ---------- subjudul + watermark ---------- */
const subbar=document.getElementById('subbar');
const subId=document.getElementById('sub_id');
const subEn=document.getElementById('sub_en');
subId.style.fontSize=P.subId+'px';
subEn.style.fontSize=P.subEn+'px';
subEn.style.marginTop='5px';
subbar.style.top=P.subTop+'px';
subbar.style.maxWidth=P.subMax+'px';
subbar.style.width='max-content';
const wm=document.getElementById('wm');
wm.style.cssText+=`top:${P.wmY}px;font-size:${P.wmFS}px;left:50%;transform:translateX(-50%);
  width:max-content;padding:9px 30px;background:rgba(26,16,10,.55);border-radius:999px;`;
