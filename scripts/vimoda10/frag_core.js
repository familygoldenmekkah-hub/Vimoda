const Q=new URLSearchParams(location.search);
const ORIENT=Q.get('o')||'landscape';
const W=ORIENT==='portrait'?1080:1920;
const H=ORIENT==='portrait'?1920:1080;

/* v10 "Juanila" - DUNIA BARU: DAPOER POSYA, studio dapur roti bulat:
   dinding ubin mint bernat, lantai kotak-kotak terrakota-krim, balok kayu
   plafon dengan panci tembaga gantung, jam dinding berlambang pi, meja kayu
   dengan kue bulat yang dibagi dua (hook) lalu dibagi empat (pembilang dan
   penyebut), papan menu kapur untuk konversi desimal, kartu uji yang dibalik
   satu per satu. Latar BERBEDA TOTAL dari Menara Livo dan episode lain
   (aturan 26). Karakter: HANYA bola emas mentor, bulat sejati, tanpa mata
   (aturan 23). Subjudul zona aman dua baris (aturan 27); watermark AKIOMIDA
   di tepi paling bawah (aturan 24); penutup bersih (aturan 28). */
const P = ORIENT==='portrait' ? {
  floorY:1080, bbY:1064, ceilH:110,
  tableX:50, tableW:330, slabY:830, slabH:52, legBot:1080,
  pizzaD:300, pizzaCX:215, pizzaCY:680,
  plate1X:120, plate2X:310, plateY:812, plateW:130, plateH:36,
  chipX:400, chipY:700, chipW:300, chipH:64, chipFS:34,
  panelX:400, panelY:470, panelW:610, panelH:360,
  stampX:470, stampY:620, stampW:470, stampH:60, stampFS:26,
  cardX0:380, cardSp:124, cardY:590, cardW:112, cardH:120, cardFS:30,
  pilX:325, pilY:760, pilW:430, pilH:70, pilFS:30,
  ecY:830, barW:420,
  titleY:300, titleS0:80, titleSN:74, titleS2:62,
  subTop:1170, subId:40, subEn:22, subMax:880,
  ballD:110, groundY:1120, wmY:1800, wmFS:20,
  pansX:[300,540,780], pansY:[178,150,164], pansD:[70,56,64],
  clockC:[75,478], clockD:88
} : {
  floorY:508, bbY:494, ceilH:70,
  tableX:140, tableW:360, slabY:540, slabH:40, legBot:700,
  pizzaD:260, pizzaCX:320, pizzaCY:410,
  plate1X:210, plate2X:430, plateY:528, plateW:110, plateH:30,
  chipX:760, chipY:560, chipW:300, chipH:60, chipFS:30,
  panelX:760, panelY:250, panelW:1020, panelH:290,
  stampX:990, stampY:450, stampW:560, stampH:56, stampFS:24,
  cardX0:915, cardSp:150, cardY:360, cardW:130, cardH:110, cardFS:30,
  pilX:760, pilY:600, pilW:400, pilH:65, pilFS:28,
  ecY:400, barW:520,
  titleY:150, titleS0:88, titleSN:72, titleS2:66,
  subTop:740, subId:38, subEn:20, subMax:1360,
  ballD:96, groundY:660, wmY:1010, wmFS:18,
  pansX:[600,960,1320], pansY:[128,104,118], pansD:[58,46,52],
  clockC:[105,305], clockD:80
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
let _seed=20261117;
const rnd=()=>{_seed|=0;_seed=_seed+0x6D2B79F5|0;let z=Math.imul(_seed^_seed>>>15,1|_seed);
  z=z+Math.imul(z^z>>>7,61|z)^z;return((z^z>>>14)>>>0)/4294967296;};

/* ---------- dinding ubin, plafon balok, panci, jam pi, lantai ---------- */
const wallEl=document.getElementById('tilewall');
wallEl.style.cssText+=`height:${P.floorY}px;`;
const floorEl=document.getElementById('floorplank');
floorEl.style.cssText+=`top:${P.floorY}px;height:${H-P.floorY}px;`;
const shadeEl=document.getElementById('floorshade');
shadeEl.style.cssText+=`top:${P.floorY}px;height:${H-P.floorY}px;opacity:.75;`;
const bbEl=document.getElementById('baseboard');
bbEl.style.cssText+=`top:${P.bbY}px;height:${P.floorY-P.bbY}px;`;
const ceilEl=document.getElementById('ceiling');
ceilEl.style.cssText+=`height:${P.ceilH}px;`;
const PANS=[];
{
  const band=document.createElement('div');
  band.className='beam';
  band.style.cssText+=`left:0;top:0;width:100%;height:${Math.round(P.ceilH*0.34)}px;`;
  ceilEl.appendChild(band);
  const nb=ORIENT==='portrait'?3:4;
  for(let i=0;i<nb;i++){
    const bx=lerp(W*0.1,W*0.9,i/(nb-1));
    const bm=document.createElement('div');
    bm.className='beam';
    const bw=Math.round(P.ceilH*0.22);
    bm.style.cssText+=`left:${bx-bw/2}px;top:0;width:${bw}px;height:${P.ceilH}px;border-radius:${bw/2}px ${bw/2}px 8px 8px;`;
    ceilEl.appendChild(bm);
  }
  /* satu grup panci gantung: tiga panci berbeda ukuran */
  const panG=document.getElementById('pan');
  P.pansX.forEach((px,i)=>{
    const py=P.pansY[i], pd=P.pansD[i];
    const cord=document.createElement('div');
    cord.className='cord';
    cord.style.cssText+=`left:${px-2}px;top:${Math.round(P.ceilH*0.9)}px;height:${py-Math.round(P.ceilH*0.9)}px;`;
    panG.appendChild(cord);
    const body=document.createElement('div');
    body.className='panbody';
    body.style.cssText+=`left:${px-pd/2}px;top:${py}px;width:${pd}px;height:${pd}px;`;
    panG.appendChild(body);
    const hole=document.createElement('div');
    hole.className='panhole';
    hole.style.cssText+=`left:${px-pd*0.18}px;top:${py+pd*0.3}px;width:${pd*0.36}px;height:${pd*0.36}px;`;
    panG.appendChild(hole);
    PANS.push({cord,body,hole,ph:i*1.7});
  });
}
/* jam dinding: angka 12 diganti lambang pi (bekal bab 4) */
const clockEl=document.getElementById('clock');
{
  const [cx,cy]=P.clockC, cd=P.clockD;
  const face=clockEl.querySelector('.face');
  face.style.cssText+=`left:${cx-cd/2}px;top:${cy-cd/2}px;width:${cd}px;height:${cd}px;`;
  const pi=clockEl.querySelector('.pi');
  pi.style.cssText+=`left:${cx-cd*0.16}px;top:${cy-cd*0.42}px;font-size:${Math.round(cd*0.34)}px;`;
  const h1=clockEl.querySelector('.hand'), h2=clockEl.querySelectorAll('.hand')[1];
  h1.style.cssText+=`left:${cx-2}px;top:${cy-cd*0.34}px;height:${cd*0.34}px;`;
  h2.style.cssText+=`left:${cx+cd*0.12}px;top:${cy-2}px;height:${cd*0.24}px;transform:rotate(90deg);transform-origin:0 50%;`;
}

/* ---------- meja kayu dan kue bulat ---------- */
const tableEl=document.getElementById('tableT');
{
  const slab=tableEl.querySelector('.slab');
  slab.style.cssText+=`left:${P.tableX}px;top:${P.slabY}px;width:${P.tableW}px;height:${P.slabH}px;`;
  const legs=tableEl.querySelectorAll('.leg');
  legs[0].style.cssText+=`left:${P.tableX+26}px;top:${P.slabY+P.slabH}px;height:${P.legBot-P.slabY-P.slabH}px;`;
  legs[1].style.cssText+=`left:${P.tableX+P.tableW-52}px;top:${P.slabY+P.slabH}px;height:${P.legBot-P.slabY-P.slabH}px;`;
}
const pizzaEl=document.getElementById('pizzaC');
{
  const d=P.pizzaD;
  pizzaEl.style.cssText+=`left:${P.pizzaCX-d/2}px;top:${P.pizzaCY-d/2}px;width:${d}px;height:${d}px;border:${Math.round(d*0.055)}px solid #A96B2F;`;
  const dg=pizzaEl.querySelector('.dough');
  dg.style.cssText+=`left:0;top:0;width:${d}px;height:${d}px;`;
  /* taburan mesis: titik-titik tetap (seed deterministik) */
  for(let i=0;i<7;i++){
    const dot=document.createElement('div');
    dot.className='pdot';
    const dd=Math.round(d*(0.07+rnd()*0.05));
    const dx=d*(0.12+rnd()*0.62), dy=d*(0.12+rnd()*0.62);
    dot.style.cssText+=`left:${dx.toFixed(0)}px;top:${dy.toFixed(0)}px;width:${dd}px;height:${dd}px;`;
    pizzaEl.appendChild(dot);
  }
  const cv=pizzaEl.querySelector('.cutline');
  cv.style.cssText+=`left:${d/2-3}px;top:0;width:6px;height:${d}px;`;
  const ch=pizzaEl.querySelector('.cutlineH');
  ch.style.cssText+=`left:0;top:${d/2-3}px;width:${d}px;height:6px;`;
  const wg=pizzaEl.querySelectorAll('.wedge');
  const pos=[[0,0],[d/2,0],[0,d/2],[d/2,d/2]];
  wg.forEach((w,i)=>{
    w.style.cssText+=`left:${pos[i][0]}px;top:${pos[i][1]}px;width:${d/2}px;height:${d/2}px;`;
  });
}
/* dua setengah lingkaran untuk hook */
const HALFP=[];
document.querySelectorAll('.halfp').forEach((hp,i)=>{
  const d=P.pizzaD;
  const hd=hp.querySelector('.hdough');
  if(i===0){
    hd.style.cssText+=`left:0;top:0;width:${d}px;height:${d/2}px;border-radius:${d/2}px ${d/2}px 0 0;border-top:${Math.round(d*0.055)}px solid #A96B2F;background:radial-gradient(circle at 35% 20%,#F4CB7A 0%,#E8B25C 55%,#C98A3B 100%);`;
    hp.style.cssText+=`left:${P.pizzaCX-d/2}px;top:${P.pizzaCY-d/2}px;width:${d}px;height:${d/2}px;opacity:0;`;
  }else{
    hd.style.cssText+=`left:0;top:0;width:${d}px;height:${d/2}px;border-radius:0 0 ${d/2}px ${d/2}px;border-bottom:${Math.round(d*0.055)}px solid #A96B2F;background:radial-gradient(circle at 35% 80%,#F4CB7A 0%,#E8B25C 55%,#C98A3B 100%);`;
    hp.style.cssText+=`left:${P.pizzaCX-d/2}px;top:${P.pizzaCY}px;width:${d}px;height:${d/2}px;opacity:0;`;
  }
  hp.style.transformOrigin='0 0';
  HALFP.push(hp);
});
/* dua piring */
const PLATES=[];
document.querySelectorAll('.plateE').forEach((pl,i)=>{
  const px=i===0?P.plate1X:P.plate2X;
  pl.style.cssText+=`left:${px-P.plateW/2}px;top:${P.plateY-P.plateH/2}px;width:${P.plateW}px;height:${P.plateH}px;opacity:0;`;
  PLATES.push({el:pl,px});
});

/* ---------- panel-panel konten (satu ide per layar) ---------- */
const propsEl=document.getElementById('props');
const P1ROWS=[];
const P2ROWS=[];
/* chip setengah besar di hook */
const chipHalf=document.getElementById('qchip');
chipHalf.style.cssText+=`left:${P.chipX}px;top:${P.chipY}px;width:${P.chipW}px;height:${P.chipH}px;font-size:${P.chipFS}px;
  background:linear-gradient(92deg,#B45309,#D98F2E);opacity:0;`;

/* stempel hook */
const stamp=document.createElement('div');
stamp.className='stamp';
stamp.style.cssText+=`left:${P.stampX}px;top:${P.stampY}px;width:${P.stampW}px;height:${P.stampH}px;font-size:${P.stampFS}px;opacity:0;`;
stamp.textContent='1/2 TERMASUK RASIONAL';
propsEl.appendChild(stamp);

/* panel 1: definisi a/b + syarat + contoh + twist */
const panel1=document.createElement('div');
panel1.className='panelN';
panel1.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p1Hd=document.createElement('div');
p1Hd.className='pHd';
p1Hd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.05)}px;`;
p1Hd.textContent='BILANGAN RASIONAL';
panel1.appendChild(p1Hd);
const p1Mid=document.createElement('div');
p1Mid.style.cssText+=`display:flex;align-items:center;height:${Math.round(P.panelH*0.30)}px;padding:0 ${Math.round(P.panelW*0.07)}px;`;
const abEl=document.createElement('div');
abEl.className='pEx';
abEl.style.cssText+=`font-size:${ORIENT==='portrait'?56:50}px;color:#FFF6E6;width:${Math.round(P.panelW*0.24)}px;`;
abEl.textContent='a/b';
p1Mid.appendChild(abEl);
const p1R=document.createElement('div');
p1R.style.cssText+=`flex:1;`;
[['a DAN b BILANGAN BULAT',7.8],['b TIDAK BOLEH 0',8.8]].forEach(([tx,t0])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?46:40}px;opacity:0;`;
  const dot=document.createElement('div');
  dot.className='pDot';
  dot.style.cssText+=`width:${ORIENT==='portrait'?20:17}px;height:${ORIENT==='portrait'?20:17}px;background:#F2C230;margin-right:12px;`;
  r.appendChild(dot);
  const n=document.createElement('div');
  n.className='pName';
  n.style.cssText+=`font-size:${ORIENT==='portrait'?21:19}px;`;
  n.textContent=tx;
  r.appendChild(n);
  p1R.appendChild(r);
  P1ROWS.push({el:r,t0});
});
p1Mid.appendChild(p1R);
panel1.appendChild(p1Mid);
const p1Chips=document.createElement('div');
p1Chips.style.cssText+=`display:flex;align-items:center;justify-content:center;height:${Math.round(P.panelH*0.24)}px;gap:${ORIENT==='portrait'?12:16}px;`;
const P1CHIPS=[];
['1/2','3/4','2/3','5/2','-3/4'].forEach((v,i)=>{
  const c=document.createElement('div');
  c.className='hookChip';
  const cw=Math.round(ORIENT==='portrait'?92:110);
  c.style.cssText+=`position:relative;width:${cw}px;height:${ORIENT==='portrait'?46:42}px;font-size:${ORIENT==='portrait'?24:22}px;background:#3E5A48;opacity:0;`;
  c.textContent=v;
  p1Chips.appendChild(c);
  P1CHIPS.push({el:c,t0:9.8+i*0.14});
});
panel1.appendChild(p1Chips);
const p1Note=document.createElement('div');
p1Note.className='pNote';
p1Note.style.cssText+=`height:${ORIENT==='portrait'?48:42}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?20:18}px;`;
p1Note.textContent='RASIONAL BUKAN HANYA PECAHAN';
panel1.appendChild(p1Note);
propsEl.appendChild(panel1);

/* panel 2: pembilang dan penyebut */
const panel2=document.createElement('div');
panel2.className='panelN';
panel2.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p2Hd=document.createElement('div');
p2Hd.className='pHd';
p2Hd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.05)}px;`;
p2Hd.textContent='PEMBILANG DAN PENYEBUT';
panel2.appendChild(p2Hd);
const p2Mid=document.createElement('div');
p2Mid.style.cssText+=`display:flex;align-items:center;height:${Math.round(P.panelH*0.34)}px;padding:0 ${Math.round(P.panelW*0.07)}px;`;
const p2Ex=document.createElement('div');
p2Ex.className='pEx';
p2Ex.style.cssText+=`font-size:${ORIENT==='portrait'?64:56}px;color:#FFF6E6;width:${Math.round(P.panelW*0.26)}px;`;
p2Ex.textContent='3/4';
p2Mid.appendChild(p2Ex);
const p2R=document.createElement('div');
p2R.style.cssText+=`flex:1;`;
[['3 = PEMBILANG, YANG DIAMBIL','#F2C230',22.6],['4 = PENYEBUT, BAGIAN SAMA','#E58BA5',23.8]].forEach(([tx,col,t0])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?50:44}px;opacity:0;`;
  const dot=document.createElement('div');
  dot.className='pDot';
  dot.style.cssText+=`width:${ORIENT==='portrait'?20:17}px;height:${ORIENT==='portrait'?20:17}px;background:${col};margin-right:12px;`;
  r.appendChild(dot);
  const n=document.createElement('div');
  n.className='pName';
  n.style.cssText+=`font-size:${ORIENT==='portrait'?20:18}px;`;
  n.textContent=tx;
  r.appendChild(n);
  p2R.appendChild(r);
  P2ROWS.push({el:r,t0});
});
p2Mid.appendChild(p2R);
panel2.appendChild(p2Mid);
const p2Note=document.createElement('div');
p2Note.className='pNote';
p2Note.style.cssText+=`height:${ORIENT==='portrait'?48:42}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?20:18}px;`;
p2Note.textContent='BAGIAN HARUS SAMA BESAR';
panel2.appendChild(p2Note);
propsEl.appendChild(panel2);

/* panel menu kapur: konversi desimal */
const menuP=document.createElement('div');
menuP.className='menuP';
menuP.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const mHd=document.createElement('div');
mHd.className='pHd';
mHd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.05)}px;color:#F6CE7E;`;
mHd.textContent='MENU KONVERSI';
menuP.appendChild(mHd);
const MROWS=[];
[['1/2 = 0,5',33.4],['1/4 = 0,25',34.0],['3/4 = 0,75',34.6],['1/3 = 0,3333...',35.2]].forEach(([tx,t0])=>{
  const r=document.createElement('div');
  r.className='menuRow';
  r.style.cssText+=`font-size:${ORIENT==='portrait'?30:27}px;height:${ORIENT==='portrait'?40:34}px;
    margin:0 ${Math.round(P.panelW*0.14)}px;`;
  r.textContent=tx;
  menuP.appendChild(r);
  MROWS.push({el:r,t0});
});
const p2p=document.createElement('div');
p2p.style.cssText+=`display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;height:${Math.round(P.panelH*0.30)}px;`;
const pillA=document.createElement('div');
pillA.className='pill2';
pillA.style.cssText+=`background:rgba(127,191,142,.28);border:2px solid rgba(127,191,142,.6);color:#CDE8D2;font-size:${ORIENT==='portrait'?19:17}px;padding:0 14px;`;
pillA.textContent='BERHENTI: 0,5 | 0,25';
const pillB=document.createElement('div');
pillB.className='pill2';
pillB.style.cssText+=`background:rgba(229,139,165,.28);border:2px solid rgba(229,139,165,.6);color:#F4D3DC;font-size:${ORIENT==='portrait'?19:17}px;padding:0 14px;`;
pillB.textContent='BERULANG: 0,3333... | 0,272727...';
p2p.appendChild(pillA);
p2p.appendChild(pillB);
menuP.appendChild(p2p);
propsEl.appendChild(menuP);

/* panel 4: mana yang bukan rasional */
const panel4=document.createElement('div');
panel4.className='panelN';
panel4.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p4Hd=document.createElement('div');
p4Hd.className='pHd';
p4Hd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.05)}px;`;
p4Hd.textContent='MANA YANG BUKAN?';
panel4.appendChild(p4Hd);
const P4ROWS=[];
[['0,5    0,75    0,3333...','RASIONAL',true,41.0],['π','BUKAN RASIONAL',false,41.8]].forEach(([ex,lb,isCk,t0],i)=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?84:60}px;padding:0 ${Math.round(P.panelW*0.07)}px;`;
  const mk=document.createElement('div');
  mk.className=isCk?'ckmark':'xxmark';
  const ms=ORIENT==='portrait'?30:24;
  mk.style.cssText+=`width:${ms}px;height:${ms}px;margin-right:16px;flex:none;position:relative;`;
  if(isCk){
    mk.innerHTML=`<div class="a" style="left:${ms*0.08}px;top:${ms*0.5}px;width:${ms*0.42}px;height:${ms*0.16}px;transform:rotate(45deg)"></div>
      <div class="b" style="left:${ms*0.36}px;top:${ms*0.22}px;width:${ms*0.62}px;height:${ms*0.16}px;transform:rotate(-52deg)"></div>`;
  }else{
    mk.innerHTML=`<div class="a" style="left:0;top:${ms*0.42}px;width:${ms}px;height:${ms*0.16}px;transform:rotate(45deg)"></div>
      <div class="b" style="left:0;top:${ms*0.42}px;width:${ms}px;height:${ms*0.16}px;transform:rotate(-45deg)"></div>`;
  }
  r.appendChild(mk);
  const e=document.createElement('div');
  e.className='pEx';
  e.style.cssText+=`font-size:${ORIENT==='portrait'?(i===0?28:44):(i===0?26:40)}px;color:#FFF6E6;flex:1;`;
  e.textContent=ex;
  r.appendChild(e);
  const tg=document.createElement('div');
  tg.className='pName';
  tg.style.cssText+=`font-size:${ORIENT==='portrait'?19:17}px;color:${isCk?'#CDE8D2':'#F4C6BC'};`;
  tg.textContent=lb;
  r.appendChild(tg);
  panel4.appendChild(r);
  P4ROWS.push({el:r,t0});
});
const p4Note=document.createElement('div');
p4Note.className='pNote';
p4Note.style.cssText+=`height:${ORIENT==='portrait'?46:40}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?20:18}px;`;
p4Note.textContent='PI: ANGKA TERUS TANPA POLA';
panel4.appendChild(p4Note);
propsEl.appendChild(panel4);

/* kartu uji: lima bilangan untuk diperiksa */
const UJI_VALS=['8','2/3','-5','0,25','0,7777...'];
const CARDS=UJI_VALS.map((v,i)=>{
  const c=document.createElement('div');
  c.className='ujiCard';
  const cfs=v.length>6?19:(v.length>4?24:P.cardFS);
  c.style.cssText+=`left:${P.cardX0+i*P.cardSp}px;top:${P.cardY}px;width:${P.cardW}px;height:${P.cardH}px;
    font-size:${cfs}px;opacity:0;`;
  c.textContent='?';
  propsEl.appendChild(c);
  return {el:c,flip:44.7+i*0.5,val:v,ph:i*0.9};
});

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
  background:linear-gradient(92deg,#7FBF8E 0%,#E58BA5 52%,#F2C230 100%);
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
