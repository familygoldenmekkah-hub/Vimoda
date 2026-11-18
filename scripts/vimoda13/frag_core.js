const Q=new URLSearchParams(location.search);
const ORIENT=Q.get('o')||'landscape';
const W=ORIENT==='portrait'?1080:1920;
const H=ORIENT==='portrait'?1920:1080;
const P = ORIENT==='portrait' ? {
  floorY:1080, bbY:1064, ceilH:110,
  tableX:50, tableW:330, slabY:830, slabH:52, legBot:1080,
  bdW:300, bdH:96, bdCX:215, bdCY:778,
  rulerX:40, rulerY:120, rulerW:1000, rulerH:46, rulFS:14,
  stampX:470, stampY:690, stampW:480, stampH:60, stampFS:26,
  panelX:400, panelY:470, panelW:610, panelH:360,
  pilX:260, pilY:850, pilW:560, pilH:64, pilFS:23,
  ecY:830, barW:420,
  titleY:300, titleS0:80, titleSN:74,
  subTop:1170, subId:40, subEn:22, subMax:880,
  ballD:110, groundY:1120, wmY:1800, wmFS:20,
  lampsX:[340,700], lampsY:[168,150], lampsD:[74,62],
  markX:220, markY:1096, markW:640, markH:16,
  pegX:830, pegY:870, pegW:180, pegH:140,
  cardW:150, cardH:64, cardFS:26
} : {
  floorY:508, bbY:494, ceilH:70,
  tableX:140, tableW:360, slabY:540, slabH:40, legBot:700,
  bdW:340, bdH:82, bdCX:320, bdCY:494,
  rulerX:140, rulerY:78, rulerW:600, rulerH:34, rulFS:12,
  stampX:960, stampY:440, stampW:560, stampH:56, stampFS:24,
  panelX:760, panelY:250, panelW:1020, panelH:290,
  pilX:680, pilY:600, pilW:560, pilH:60, pilFS:22,
  ecY:400, barW:520,
  titleY:150, titleS0:88, titleSN:72,
  subTop:740, subId:38, subEn:20, subMax:1360,
  ballD:96, groundY:660, wmY:1010, wmFS:18,
  lampsX:[560,1000], lampsY:[112,100], lampsD:[62,52],
  markX:620, markY:672, markW:680, markH:14,
  pegX:1450, pegY:560, pegW:220, pegH:130,
  cardW:128, cardH:56, cardFS:24
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
let _seed=20261120;
const rnd=()=>{_seed|=0;_seed=_seed+0x6D2B79F5|0;let z=Math.imul(_seed^_seed>>>15,1|_seed);
  z=z+Math.imul(z^z>>>7,61|z)^z;return((z^z>>>14)>>>0)/4294967296;};

/* ---------- dinding gudang, plafon, lampu dome industri, lantai beton sejuk ---------- */
const wallEl=document.getElementById('shopwall');
wallEl.style.cssText+=`height:${P.floorY}px;`;
const floorEl=document.getElementById('concrete');
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
  const dome=lw.querySelector('.dome');
  dome.style.cssText+=`left:${lx-ld/2}px;top:${ly}px;width:${ld}px;height:${Math.round(ld*0.52)}px;`;
  const glow=lw.querySelector('.glow');
  glow.style.cssText+=`left:${lx-ld*0.9}px;top:${ly+Math.round(ld*0.2)}px;width:${ld*1.8}px;height:${ld*1.8}px;`;
  LAMPS.push({lw,ph:i*2.1});
});
/* marka safety kuning di lantai gudang */
const markEl=document.getElementById('marker');
markEl.style.cssText+=`left:${P.markX}px;top:${P.markY}px;width:${P.markW}px;height:${P.markH}px;`;

/* ---------- rak pasangan sepatu di dinding (ikon dunia Gudang Papasan) ---------- */
function makeShoe(parent,x,y,w,h,lone){
  const s=document.createElement('div');
  s.className='shoe'+(lone?' lone':'');
  s.style.cssText+=`left:${x}px;top:${y}px;width:${w}px;height:${h+8}px;`;
  const bd=document.createElement('div');
  bd.className='bd';
  bd.style.cssText+=`left:0;top:0;width:${w}px;height:${h}px;`;
  const sol=document.createElement('div');
  sol.className='sol';
  sol.style.cssText+=`left:-3px;top:${h}px;width:${w+6}px;height:7px;`;
  s.appendChild(bd);s.appendChild(sol);
  parent.appendChild(s);
  return {root:s,bd};
}
const rackEl=document.getElementById('ruler');
rackEl.querySelector('.hl').remove();
rackEl.querySelector('.axis').remove();
{
  const RW=ORIENT==='portrait'?44:36, RH=ORIENT==='portrait'?24:20;
  const planks=ORIENT==='portrait'?[120,186,252]:[260,306,352];
  const body=rackEl.querySelector('.body');
  body.style.cssText+=`left:${P.rulerX}px;top:${planks[0]}px;width:${P.rulerW}px;height:14px;`;
  planks.slice(1).forEach((py,i)=>{
    const pk=document.createElement('div');
    pk.className='body';
    pk.style.cssText+=`left:${P.rulerX}px;top:${py}px;width:${P.rulerW}px;height:14px;`;
    rackEl.appendChild(pk);
  });
  /* sepatu dekoratif: dua rak penuh pasangan, rak bawah ada yang nanggung */
  const spots=ORIENT==='portrait'
    ? [[100,0,0],[100+RW+6,0,1],[320,1,0],[320+RW+6,1,1],[470,1,2],[660,2,0],[660+RW+6,2,1],[820,2,2]]
    : [[200,0,0],[200+RW+6,0,1],[360,1,0],[360+RW+6,1,1],[480,1,2],[260,2,0],[260+RW+6,2,1],[420,2,2]];
  spots.forEach(([sx,si,li])=>{
    makeShoe(rackEl,sx,planks[si]-RH-4,RW,RH,li===2);
  });
}

/* ---------- bangku sortir dan tumpukan shoebox ---------- */
const tableEl=document.getElementById('tableT');
{
  const slab=tableEl.querySelector('.slab');
  slab.style.cssText+=`left:${P.tableX}px;top:${P.slabY}px;width:${P.tableW}px;height:${P.slabH}px;`;
  const legs=tableEl.querySelectorAll('.leg');
  legs[0].style.cssText+=`left:${P.tableX+26}px;top:${P.slabY+P.slabH}px;height:${P.legBot-P.slabY-P.slabH}px;`;
  legs[1].style.cssText+=`left:${P.tableX+P.tableW-52}px;top:${P.slabY+P.slabH}px;height:${P.legBot-P.slabY-P.slabH}px;`;
}
const boardEl=document.getElementById('boardSheet');
{
  const bwx=P.bdCX-P.bdW/2, bwy=P.bdCY-P.bdH/2;
  const board=boardEl.querySelector('.board');
  board.style.cssText+=`left:${bwx}px;top:${bwy}px;width:${P.bdW}px;height:${P.bdH}px;`;
  const tri=boardEl.querySelector('.tri');
  tri.remove();
  const lid=document.createElement('div');
  lid.className='pline';
  lid.style.cssText+=`left:${bwx}px;top:${bwy+Math.round(P.bdH*0.30)}px;width:${P.bdW}px;height:4px;`;
  boardEl.appendChild(lid);
  const lb=document.createElement('div');
  lb.className='plab';
  lb.style.cssText+=`left:${bwx}px;top:${bwy+Math.round(P.bdH*0.48)}px;width:${P.bdW}px;text-align:center;font-size:${ORIENT==='portrait'?17:15}px;letter-spacing:.2em;`;
  lb.textContent='PAPASAN';
  boardEl.appendChild(lb);
}

/* ---------- tanda PAPASAN di dinding ---------- */
const pegEl=document.getElementById('pegboard');
{
  const board=pegEl.querySelector('.board');
  board.style.cssText+=`left:${P.pegX}px;top:${P.pegY}px;width:${P.pegW}px;height:${P.pegH}px;`;
  const sgn=document.createElement('div');
  sgn.style.cssText+=`position:absolute;left:0;top:${Math.round(P.pegH*0.30)}px;width:100%;text-align:center;
    font-family:'JetBrains Mono','DejaVu Sans Mono',monospace;font-weight:800;color:#6E7A5A;
    font-size:${ORIENT==='portrait'?26:30}px;letter-spacing:.14em;`;
  sgn.textContent='PAPASAN';
  board.appendChild(sgn);
}

/* ---------- panel-panel konten (satu ide per layar) ---------- */
const propsEl=document.getElementById('props');
const P1ROWS=[], P1CHIPS=[], P2ROWS=[], P2CHIPS=[], NROWS=[], P3ROWS=[], P3CHIPS=[], P4ROWS=[];
/* stempel hook */
const stamp=document.createElement('div');
stamp.className='stamp';
stamp.style.cssText+=`left:${P.stampX}px;top:${P.stampY}px;width:${P.stampW}px;height:${P.stampH}px;font-size:${P.stampFS}px;opacity:0;`;
stamp.textContent='ADA PASANGAN, ADA NANGGUNG';
propsEl.appendChild(stamp);
/* hook: delapan sepatu berpasangan rapi, tujuh sepatu ada yang nanggung */
const HOOK=[];
const QM={};
{
  const HW=ORIENT==='portrait'?44:36, HH=ORIENT==='portrait'?24:20;
  const pairW=2*HW+6, pgap=ORIENT==='portrait'?26:22;
  const topTotal=4*pairW+3*pgap;
  const tx0=P.panelX+Math.round((P.panelW-topTotal)/2);
  const ty0=ORIENT==='portrait'?470:292;
  for(let k=0;k<4;k++){
    const px=tx0+k*(pairW+pgap);
    const sL=makeShoe(propsEl,px,ty0,HW,HH,false);
    const sR=makeShoe(propsEl,px+HW+6,ty0,HW,HH,false);
    HOOK.push({root:sL.root,bd:sL.bd,t0:1.0+k*0.28,snap:0});
    HOOK.push({root:sR.root,bd:sR.bd,t0:1.14+k*0.28,snap:8});
  }
  const botTotal=3*pairW+2*pgap+40+HW;
  const bx0=P.panelX+Math.round((P.panelW-botTotal)/2);
  const by0=ORIENT==='portrait'?582:372;
  for(let k=0;k<3;k++){
    const px=bx0+k*(pairW+pgap);
    HOOK.push({root:makeShoe(propsEl,px,by0,HW,HH,false).root,bd:null,t0:2.8+k*0.09,snap:0});
    HOOK.push({root:makeShoe(propsEl,px+HW+6,by0,HW,HH,false).root,bd:null,t0:2.89+k*0.09,snap:0});
  }
  const loneX=bx0+3*pairW+2*pgap+40;
  HOOK.push({root:makeShoe(propsEl,loneX,by0,HW,HH,true).root,bd:null,t0:3.34,snap:0});
  QM.el=document.createElement('div');
  QM.el.className='qmark';
  QM.el.style.cssText+=`left:${loneX+HW/2-12}px;top:${by0-(ORIENT==='portrait'?46:38)}px;font-size:${ORIENT==='portrait'?36:30}px;opacity:0;`;
  QM.el.textContent='?';
  propsEl.appendChild(QM.el);
}

/* panel 1: bilangan genap */
const panel1=document.createElement('div');
panel1.className='panelI';
panel1.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p1Hd=document.createElement('div');
p1Hd.className='pHd';
p1Hd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p1Hd.textContent='BILANGAN GENAP';
panel1.appendChild(p1Hd);
const p1Big=document.createElement('div');
p1Big.className='pBig';
p1Big.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;height:${Math.round(P.panelH*0.14)}px;display:flex;align-items:center;justify-content:center;`;
p1Big.textContent='HABIS DIBAGI 2, SISA 0';
panel1.appendChild(p1Big);
[['DERET: 0, 2, 4, 6, 8, 10, 12, 14',7.9,'#4CAF7A']].forEach(([tx,t0,col])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
  const dot=document.createElement('div');
  dot.className='pDot';
  dot.style.cssText+=`width:${ORIENT==='portrait'?18:15}px;height:${ORIENT==='portrait'?18:15}px;background:${col};margin-right:12px;`;
  r.appendChild(dot);
  const n=document.createElement('div');
  n.className='pName';
  n.style.cssText+=`font-size:${ORIENT==='portrait'?19:17}px;`;
  n.textContent=tx;
  r.appendChild(n);
  panel1.appendChild(r);
  P1ROWS.push({el:r,t0});
});
const p1Chips=document.createElement('div');
p1Chips.style.cssText+=`display:flex;align-items:center;justify-content:center;height:${Math.round(P.panelH*0.18)}px;gap:${ORIENT==='portrait'?8:10}px;`;
['0','2','4','6','8','10','12','14'].forEach((v,i)=>{
  const c=document.createElement('div');
  c.className='chipA';
  c.style.cssText+=`width:${ORIENT==='portrait'?58:70}px;height:${ORIENT==='portrait'?40:36}px;font-size:${ORIENT==='portrait'?17:15}px;`;
  c.textContent=v;
  p1Chips.appendChild(c);
  P1CHIPS.push({el:c,t0:9.9+i*0.12});
});
panel1.appendChild(p1Chips);
const p1Note=document.createElement('div');
p1Note.className='pNote';
p1Note.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?19:17}px;`;
p1Note.textContent='8 ÷ 2 = 4 · 12 ÷ 2 = 6';
panel1.appendChild(p1Note);
propsEl.appendChild(panel1);

/* panel 2: bilangan ganjil */
const panel2=document.createElement('div');
panel2.className='panelI';
panel2.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p2Hd=document.createElement('div');
p2Hd.className='pHd';
p2Hd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p2Hd.textContent='BILANGAN GANJIL';
panel2.appendChild(p2Hd);
const p2Big=document.createElement('div');
p2Big.className='pBig';
p2Big.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;height:${Math.round(P.panelH*0.14)}px;display:flex;align-items:center;justify-content:center;`;
p2Big.textContent='DIBAGI 2, SISA 1';
panel2.appendChild(p2Big);
[['DERET: 1, 3, 5, 7, 9, 11, 13, 15',18.4,'#D97A2E']].forEach(([tx,t0,col])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
  const dot=document.createElement('div');
  dot.className='pDot';
  dot.style.cssText+=`width:${ORIENT==='portrait'?18:15}px;height:${ORIENT==='portrait'?18:15}px;background:${col};margin-right:12px;`;
  r.appendChild(dot);
  const n=document.createElement('div');
  n.className='pName';
  n.style.cssText+=`font-size:${ORIENT==='portrait'?19:17}px;`;
  n.textContent=tx;
  r.appendChild(n);
  panel2.appendChild(r);
  P2ROWS.push({el:r,t0});
});
const p2Chips=document.createElement('div');
p2Chips.style.cssText+=`display:flex;align-items:center;justify-content:center;height:${Math.round(P.panelH*0.18)}px;gap:${ORIENT==='portrait'?8:10}px;`;
['1','3','5','7','9','11','13','15'].forEach((v,i)=>{
  const c=document.createElement('div');
  c.className='chipA';
  c.style.cssText+=`width:${ORIENT==='portrait'?58:70}px;height:${ORIENT==='portrait'?40:36}px;font-size:${ORIENT==='portrait'?17:15}px;`;
  c.textContent=v;
  p2Chips.appendChild(c);
  P2CHIPS.push({el:c,t0:19.6+i*0.12});
});
panel2.appendChild(p2Chips);
const p2Note=document.createElement('div');
p2Note.className='pNote';
p2Note.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?19:17}px;`;
p2Note.textContent='7 ÷ 2 = 3 SISA 1 · 11 ÷ 2 = 5 SISA 1';
panel2.appendChild(p2Note);
propsEl.appendChild(panel2);

/* panel kejutan: bagaimana dengan 0? (beat emas 26.0) */
const panelN=document.createElement('div');
panelN.className='panelI';
panelN.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const nHd=document.createElement('div');
nHd.className='pHd';
nHd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
nHd.textContent='BAGAIMANA DENGAN 0?';
panelN.appendChild(nHd);
const pNBig=document.createElement('div');
pNBig.className='pBig';
pNBig.style.cssText+=`font-size:${ORIENT==='portrait'?34:30}px;height:${Math.round(P.panelH*0.16)}px;display:flex;align-items:center;justify-content:center;`;
pNBig.textContent='0 ÷ 2 = 0';
panelN.appendChild(pNBig);
[['DIBAGI 2, SISANYA 0 JUGA',27.4,'#D97A2E'],['JADI: 0 TERMASUK GENAP!',28.5,'#4CAF7A']].forEach(([tx,t0,col])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
  const dot=document.createElement('div');
  dot.className='pDot';
  dot.style.cssText+=`width:${ORIENT==='portrait'?18:15}px;height:${ORIENT==='portrait'?18:15}px;background:${col};margin-right:12px;`;
  r.appendChild(dot);
  const n=document.createElement('div');
  n.className='pName';
  n.style.cssText+=`font-size:${ORIENT==='portrait'?19:17}px;`;
  n.textContent=tx;
  r.appendChild(n);
  panelN.appendChild(r);
  NROWS.push({el:r,t0});
});
const nNote=document.createElement('div');
nNote.className='pNote';
nNote.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?19:17}px;`;
nNote.textContent='GENAP TIDAK HANYA MULAI DARI 2';
panelN.appendChild(nNote);
propsEl.appendChild(panelN);

/* panel 3: cara cepat lihat angka akhir */
const panel3=document.createElement('div');
panel3.className='panelI';
panel3.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p3Hd=document.createElement('div');
p3Hd.className='pHd';
p3Hd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p3Hd.textContent='ANGKA AKHIRNYA';
panel3.appendChild(p3Hd);
[['AKHIRAN 0 2 4 6 8 = GENAP',33.5,'#4CAF7A'],['AKHIRAN 1 3 5 7 9 = GANJIL',34.3,'#D97A2E']].forEach(([tx,t0,col])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
  const dot=document.createElement('div');
  dot.className='pDot';
  dot.style.cssText+=`width:${ORIENT==='portrait'?18:15}px;height:${ORIENT==='portrait'?18:15}px;background:${col};margin-right:12px;`;
  r.appendChild(dot);
  const n=document.createElement('div');
  n.className='pName';
  n.style.cssText+=`font-size:${ORIENT==='portrait'?19:17}px;`;
  n.textContent=tx;
  r.appendChild(n);
  panel3.appendChild(r);
  P3ROWS.push({el:r,t0});
});
const p3Chips=document.createElement('div');
p3Chips.style.cssText+=`display:flex;align-items:center;justify-content:center;height:${Math.round(P.panelH*0.22)}px;gap:${ORIENT==='portrait'?12:14}px;`;
[['124',35.8,'G'],['357',35.98,'O'],['1.000',36.16,'G'],['2.025',36.34,'O']].forEach(([v,t0,vd])=>{
  const c=document.createElement('div');
  c.className='chipA';
  c.style.cssText+=`width:${ORIENT==='portrait'?108:128}px;height:${ORIENT==='portrait'?56:50}px;font-size:${ORIENT==='portrait'?24:22}px;
    border:3px solid ${vd==='G'?'#4CAF7A':'#D97A2E'};`;
  c.innerHTML=v.slice(0,-1)+'<span style="color:#E8B32E">'+v.slice(-1)+'</span>';
  p3Chips.appendChild(c);
  P3CHIPS.push({el:c,t0});
});
panel3.appendChild(p3Chips);
const p3Note=document.createElement('div');
p3Note.className='pNote';
p3Note.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;margin:${ORIENT==='portrait'?10:8}px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?19:17}px;`;
p3Note.textContent='CUMA LIHAT ANGKA TERAKHIRNYA';
panel3.appendChild(p3Note);
propsEl.appendChild(panel3);

/* panel 4: pola penjumlahan */
const panel4=document.createElement('div');
panel4.className='panelI';
panel4.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p4Hd=document.createElement('div');
p4Hd.className='pHd';
p4Hd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p4Hd.textContent='POLA PENJUMLAHAN';
panel4.appendChild(p4Hd);
[['GENAP + GENAP = GENAP',41.1,'#4CAF7A'],['GANJIL + GANJIL = GENAP',41.6,'#E8B32E'],['GENAP + GANJIL = GANJIL',42.1,'#D97A2E']].forEach(([tx,t0,col])=>{
  const r=document.createElement('div');
  r.className='vrow';
  r.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
  const d=document.createElement('div');
  d.className='vd';
  d.style.cssText+=`width:${ORIENT==='portrait'?16:14}px;height:${ORIENT==='portrait'?16:14}px;background:${col};margin-right:12px;`;
  r.appendChild(d);
  const tt=document.createElement('div');
  tt.className='vt';
  tt.style.cssText+=`font-size:${ORIENT==='portrait'?19:17}px;`;
  tt.textContent=tx;
  r.appendChild(tt);
  panel4.appendChild(r);
  P4ROWS.push({el:r,t0});
});
const p4Note=document.createElement('div');
p4Note.className='pNote';
p4Note.style.cssText+=`height:${ORIENT==='portrait'?38:32}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?18:16}px;`;
p4Note.textContent='6+8=14 · 5+7=12 · 6+5=11';
panel4.appendChild(p4Note);
const p4Note2=document.createElement('div');
p4Note2.className='pNote';
p4Note2.style.cssText+=`height:${ORIENT==='portrait'?38:32}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?18:16}px;`;
p4Note2.textContent='GANJIL SELALU = 2×BULAT + 1';
panel4.appendChild(p4Note2);
propsEl.appendChild(panel4);

/* ---------- papan tugas uji (aturan 30): soal tampil besar dan bernomor ---------- */
const panelUji=document.createElement('div');
panelUji.className='panelI';
panelUji.style.cssText+=`left:${P.panelX}px;top:${ORIENT==='portrait'?400:250}px;width:${P.panelW}px;height:${ORIENT==='portrait'?410:310}px;`;
const ujiHd=document.createElement('div');
ujiHd.style.cssText+=`margin:12px ${Math.round(P.panelW*0.06)}px 0;height:${ORIENT==='portrait'?42:34}px;font-size:${ORIENT==='portrait'?26:23}px;color:#F2C14E;font-weight:800;letter-spacing:.06em;opacity:0;`;
ujiHd.textContent='TUGAS BUAT KAMU:';
panelUji.appendChild(ujiHd);
const SOAL=[['1.','MANA GENAP, MANA GANJIL?'],['2.','KENAPA 0 GENAP?'],['3.','GANJIL + GANJIL SELALU GENAP?'],['4.','BAGAIMANA DENGAN NEGATIF?']];
const UJIS=[];
SOAL.forEach(([n,q],i)=>{
  const r=document.createElement('div');
  r.style.cssText+=`margin:3px ${Math.round(P.panelW*0.06)}px 0;height:${ORIENT==='portrait'?34:29}px;font-size:${ORIENT==='portrait'?21:19}px;color:#FFF6E8;font-weight:600;opacity:0;`;
  r.innerHTML='<span style="color:#F2C14E">'+n+'</span> '+q;
  panelUji.appendChild(r);
  UJIS.push({el:r,t0:44.6+i*0.15});
});
const UJIVAL=['-13','0','17','248','999','1.024'];
const ujiGrid=document.createElement('div');
ujiGrid.style.cssText+=`position:absolute;left:0;top:${ORIENT==='portrait'?218:182}px;width:100%;display:flex;flex-wrap:wrap;justify-content:center;gap:${ORIENT==='portrait'?12:10}px;`;
const CARDS=UJIVAL.map((lab,i)=>{
  const el=document.createElement('div');
  el.className='valCard';
  el.style.cssText+=`position:relative;width:${P.cardW}px;height:${P.cardH}px;font-size:${P.cardFS}px;opacity:0;`;
  el.textContent=lab;
  ujiGrid.appendChild(el);
  return {el,lab,pop:45.4+i*0.13};
});
panelUji.appendChild(ujiGrid);
const ujiNote=document.createElement('div');
ujiNote.className='pNote';
ujiNote.style.cssText+=`position:absolute;left:${Math.round(P.panelW*0.06)}px;top:${ORIENT==='portrait'?366:248}px;
  width:${P.panelW-Math.round(P.panelW*0.12)}px;height:${ORIENT==='portrait'?34:28}px;font-size:${ORIENT==='portrait'?18:16}px;`;
ujiNote.textContent='SEMUA INI BILANGAN BULAT';
panelUji.appendChild(ujiNote);
propsEl.appendChild(panelUji);

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
  background:linear-gradient(92deg,#7FA6BF 0%,#D97A2E 52%,#E8B32E 100%);
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
