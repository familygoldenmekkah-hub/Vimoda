const Q=new URLSearchParams(location.search);
const ORIENT=Q.get('o')||'landscape';
const W=ORIENT==='portrait'?1080:1920;
const H=ORIENT==='portrait'?1920:1080;
const P = ORIENT==='portrait' ? {
  floorY:1080, bbY:1064, ceilH:110,
  tableX:50, tableW:330, slabY:830, slabH:52, legBot:1080,
  bdW:300, bdH:96, bdCX:215, bdCY:778,
  rulerX:40, rulerY:120, rulerW:1000, rulerH:46, rulFS:14,
  stampX:445, stampY:690, stampW:520, stampH:64, stampFS:28,
  panelX:400, panelY:470, panelW:610, panelH:360,
  pilX:250, pilY:850, pilW:580, pilH:66, pilFS:26,
  ecY:830, barW:420,
  titleY:300, titleS0:80, titleSN:74,
  subTop:1170, subId:46, subEn:25, subMax:880,
  ballD:110, groundY:1120, wmY:1800, wmFS:22,
  lampsX:[340,700], lampsY:[168,150], lampsD:[74,62],
  markX:220, markY:1096, markW:640, markH:16,
  pegX:780, pegY:848, pegW:240, pegH:150,
  cardW:142, cardH:62, cardFS:30
} : {
  floorY:508, bbY:494, ceilH:70,
  tableX:140, tableW:360, slabY:540, slabH:40, legBot:700,
  bdW:340, bdH:82, bdCX:320, bdCY:494,
  rulerX:140, rulerY:78, rulerW:600, rulerH:34, rulFS:12,
  stampX:940, stampY:440, stampW:600, stampH:58, stampFS:26,
  panelX:760, panelY:250, panelW:1020, panelH:290,
  pilX:670, pilY:600, pilW:580, pilH:62, pilFS:25,
  ecY:400, barW:520,
  titleY:150, titleS0:88, titleSN:72,
  subTop:740, subId:46, subEn:25, subMax:1360,
  ballD:96, groundY:660, wmY:1010, wmFS:20,
  lampsX:[560,1000], lampsY:[112,100], lampsD:[62,52],
  markX:620, markY:672, markW:680, markH:14,
  pegX:1440, pegY:556, pegW:240, pegH:140,
  cardW:112, cardH:50, cardFS:26
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
let _seed=20261121;
const rnd=()=>{_seed|=0;_seed=_seed+0x6D2B79F5|0;let z=Math.imul(_seed^_seed>>>15,1|_seed);
  z=z+Math.imul(z^z>>>7,61|z)^z;return((z^z>>>14)>>>0)/4294967296;};

/* ---------- dinding kaca rumah tanam, plafon, lampu tumbuh, lantai terakota ---------- */
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
/* marka safety kuning di jalur mentor */
const markEl=document.getElementById('marker');
markEl.style.cssText+=`left:${P.markX}px;top:${P.markY}px;width:${P.markW}px;height:${P.markH}px;`;

/* ---------- rak pot terracotta di dinding (ikon dunia Petak Tanam) ---------- */
function makePot(parent,x,y,w,h){
  const s=document.createElement('div');
  s.className='pot';
  s.style.cssText+=`left:${x}px;top:${y}px;width:${w}px;height:${Math.round(h*1.5)}px;`;
  const lf=document.createElement('div');
  lf.className='lf';
  lf.style.cssText+=`left:${Math.round(w*0.12)}px;top:0;width:${Math.round(w*0.76)}px;height:${Math.round(h*0.62)}px;`;
  const pb=document.createElement('div');
  pb.className='pb';
  pb.style.cssText+=`left:0;top:${Math.round(h*0.55)}px;width:${w}px;height:${Math.round(h*0.9)}px;`;
  s.appendChild(lf);s.appendChild(pb);
  parent.appendChild(s);
  return {root:s,pb};
}
const rackEl=document.getElementById('ruler');
rackEl.querySelector('.hl').remove();
rackEl.querySelector('.axis').remove();
{
  const RW=ORIENT==='portrait'?44:36, RH=ORIENT==='portrait'?26:22;
  const planks=ORIENT==='portrait'?[120,186,252]:[260,306,352];
  const body=rackEl.querySelector('.body');
  body.style.cssText+=`left:${P.rulerX}px;top:${planks[0]}px;width:${P.rulerW}px;height:14px;`;
  planks.slice(1).forEach((py,i)=>{
    const pk=document.createElement('div');
    pk.className='body';
    pk.style.cssText+=`left:${P.rulerX}px;top:${py}px;width:${P.rulerW}px;height:14px;`;
    rackEl.appendChild(pk);
  });
  /* pot dekoratif tersusun rapi di tiap rak */
  const spots=ORIENT==='portrait'
    ? [[100,0],[150,0],[320,1],[370,1],[470,1],[660,2],[710,2],[820,2]]
    : [[200,0],[250,0],[360,1],[410,1],[480,1],[260,2],[310,2],[420,2]];
  spots.forEach(([sx,si])=>{
    makePot(rackEl,sx,planks[si]-Math.round(RH*1.5)+4,RW,RH);
  });
}

/* ---------- meja tanam dan baki semai ---------- */
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
  const rim=document.createElement('div');
  rim.className='pline';
  rim.style.cssText+=`left:${bwx}px;top:${bwy+Math.round(P.bdH*0.30)}px;width:${P.bdW}px;height:4px;`;
  boardEl.appendChild(rim);
  const lb=document.createElement('div');
  lb.className='plab';
  lb.style.cssText+=`left:${bwx}px;top:${bwy+Math.round(P.bdH*0.48)}px;width:${P.bdW}px;text-align:center;font-size:${ORIENT==='portrait'?20:18}px;letter-spacing:.2em;`;
  lb.textContent='SEMAI';
  boardEl.appendChild(lb);
}

/* ---------- tanda PETAK TANAM di dinding ---------- */
const pegEl=document.getElementById('pegboard');
{
  const board=pegEl.querySelector('.board');
  board.style.cssText+=`left:${P.pegX}px;top:${P.pegY}px;width:${P.pegW}px;height:${P.pegH}px;`;
  const sgn=document.createElement('div');
  sgn.style.cssText+=`position:absolute;left:0;top:${Math.round(P.pegH*0.30)}px;width:100%;text-align:center;
    font-family:'JetBrains Mono','DejaVu Sans Mono',monospace;font-weight:800;color:#6E7A5A;
    font-size:${ORIENT==='portrait'?24:28}px;letter-spacing:.12em;`;
  sgn.textContent='PETAK TANAM';
  board.appendChild(sgn);
}

/* ---------- panel-panel konten (satu ide per layar) ---------- */
const propsEl=document.getElementById('props');
const P1ROWS=[], P1CHIPS=[], P2ROWS=[], P2CHIPS=[], SROWS=[], P3ROWS=[], P3CHIPS=[], P4ROWS=[];
/* stempel hook */
const stamp=document.createElement('div');
stamp.className='stamp';
stamp.style.cssText+=`left:${P.stampX}px;top:${P.stampY}px;width:${P.stampW}px;height:${P.stampH}px;font-size:${P.stampFS}px;opacity:0;`;
stamp.textContent='DELAPAN BISA, TUJUH TIDAK';
propsEl.appendChild(stamp);
/* hook: delapan pot tersusun jadi petak 2 x 4, tujuh pot hanya satu baris */
const HOOKP=[];
const QM={};
{
  const HW=ORIENT==='portrait'?44:36, HH=ORIENT==='portrait'?26:22;
  const sp=ORIENT==='portrait'?56:46;
  const topTotal=8*sp-12;
  const tx0=P.panelX+Math.round((P.panelW-topTotal)/2);
  const ty0=ORIENT==='portrait'?455:285;
  const dy=ORIENT==='portrait'?72:60;
  const dxg=-(4*sp);
  for(let i=0;i<8;i++){
    const pr=makePot(propsEl,tx0+i*sp,ty0,HW,HH);
    HOOKP.push({root:pr.root,pb:pr.pb,t0:1.0+i*0.15,dy:i>=4?dy:0,dx:i>=4?dxg:0});
  }
  const botTotal=7*sp-12;
  const bx0=P.panelX+Math.round((P.panelW-botTotal)/2);
  const by0=ORIENT==='portrait'?620:400;
  for(let i=0;i<7;i++){
    const pr=makePot(propsEl,bx0+i*sp,by0,HW,HH);
    HOOKP.push({root:pr.root,pb:pr.pb,t0:3.7+i*0.12,dy:0,dx:0});
  }
  const lastX=bx0+6*sp;
  QM.el=document.createElement('div');
  QM.el.className='qmark';
  QM.el.style.cssText+=`left:${lastX+HW/2-14}px;top:${by0-(ORIENT==='portrait'?56:46)}px;font-size:${ORIENT==='portrait'?44:38}px;opacity:0;`;
  QM.el.textContent='?';
  propsEl.appendChild(QM.el);
}

/* panel 1: bilangan prima */
const panel1=document.createElement('div');
panel1.className='panelI';
panel1.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p1Hd=document.createElement('div');
p1Hd.className='pHd';
p1Hd.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p1Hd.textContent='BILANGAN PRIMA';
panel1.appendChild(p1Hd);
const p1Big=document.createElement('div');
p1Big.className='pBig';
p1Big.style.cssText+=`font-size:${ORIENT==='portrait'?34:30}px;height:${Math.round(P.panelH*0.14)}px;display:flex;align-items:center;justify-content:center;`;
p1Big.textContent='TEPAT 2 FAKTOR';
panel1.appendChild(p1Big);
[['FAKTOR: 1 DAN DIRINYA SAJA',11.8,'#4CAF7A']].forEach(([tx,t0,col])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?52:44}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
  const dot=document.createElement('div');
  dot.className='pDot';
  dot.style.cssText+=`width:${ORIENT==='portrait'?20:18}px;height:${ORIENT==='portrait'?20:18}px;background:${col};margin-right:14px;`;
  r.appendChild(dot);
  const n=document.createElement('div');
  n.className='pName';
  n.style.cssText+=`font-size:${ORIENT==='portrait'?24:21}px;`;
  n.textContent=tx;
  r.appendChild(n);
  panel1.appendChild(r);
  P1ROWS.push({el:r,t0});
});
const p1Chips=document.createElement('div');
p1Chips.style.cssText+=`display:flex;align-items:center;justify-content:center;height:${Math.round(P.panelH*0.18)}px;gap:${ORIENT==='portrait'?8:10}px;`;
['2','3','5','7','11','13','17','19'].forEach((v,i)=>{
  const c=document.createElement('div');
  c.className='chipA';
  c.style.cssText+=`width:${ORIENT==='portrait'?66:78}px;height:${ORIENT==='portrait'?48:44}px;font-size:${ORIENT==='portrait'?21:19}px;`;
  c.textContent=v;
  p1Chips.appendChild(c);
  P1CHIPS.push({el:c,t0:14.0+i*0.14});
});
panel1.appendChild(p1Chips);
const p1Note=document.createElement('div');
p1Note.className='pNote';
p1Note.style.cssText+=`height:${ORIENT==='portrait'?50:44}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?23:21}px;`;
p1Note.textContent='CEK 5: 1 × 5 · CEK 7: 1, 7';
panel1.appendChild(p1Note);
propsEl.appendChild(panel1);

/* panel 2: bilangan komposit */
const panel2=document.createElement('div');
panel2.className='panelI';
panel2.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p2Hd=document.createElement('div');
p2Hd.className='pHd';
p2Hd.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p2Hd.textContent='BILANGAN KOMPOSIT';
panel2.appendChild(p2Hd);
const p2Big=document.createElement('div');
p2Big.className='pBig';
p2Big.style.cssText+=`font-size:${ORIENT==='portrait'?34:30}px;height:${Math.round(P.panelH*0.14)}px;display:flex;align-items:center;justify-content:center;`;
p2Big.textContent='LEBIH DARI 2 FAKTOR';
panel2.appendChild(p2Big);
[['FAKTOR LEBIH DARI DUA BUAH',24.4,'#D97A2E']].forEach(([tx,t0,col])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?48:40}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
  const dot=document.createElement('div');
  dot.className='pDot';
  dot.style.cssText+=`width:${ORIENT==='portrait'?20:18}px;height:${ORIENT==='portrait'?20:18}px;background:${col};margin-right:14px;`;
  r.appendChild(dot);
  const n=document.createElement('div');
  n.className='pName';
  n.style.cssText+=`font-size:${ORIENT==='portrait'?24:21}px;`;
  n.textContent=tx;
  r.appendChild(n);
  panel2.appendChild(r);
  P2ROWS.push({el:r,t0});
});
const p2Chips=document.createElement('div');
p2Chips.style.cssText+=`display:flex;align-items:center;justify-content:center;height:${Math.round(P.panelH*0.16)}px;gap:${ORIENT==='portrait'?8:10}px;`;
['4','6','8','9','10','12','14','15'].forEach((v,i)=>{
  const c=document.createElement('div');
  c.className='chipA';
  c.style.cssText+=`width:${ORIENT==='portrait'?66:78}px;height:${ORIENT==='portrait'?48:44}px;font-size:${ORIENT==='portrait'?21:19}px;`;
  c.textContent=v;
  p2Chips.appendChild(c);
  P2CHIPS.push({el:c,t0:25.8+i*0.14});
});
panel2.appendChild(p2Chips);
const p2Note=document.createElement('div');
p2Note.className='pNote';
p2Note.style.cssText+=`height:${ORIENT==='portrait'?44:38}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?23:21}px;`;
p2Note.textContent='12: FAKTOR 1, 2, 3, 4, 6, 12';
panel2.appendChild(p2Note);
const p2Note2=document.createElement('div');
p2Note2.className='pNote';
p2Note2.style.cssText+=`height:${ORIENT==='portrait'?44:38}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?23:21}px;`;
p2Note2.textContent='9: FAKTOR 1, 3, 9';
panel2.appendChild(p2Note2);
propsEl.appendChild(panel2);

/* panel kejutan: bagaimana dengan 1? (beat emas 32.6) */
const panelS=document.createElement('div');
panelS.className='panelI';
panelS.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const sHd=document.createElement('div');
sHd.className='pHd';
sHd.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
sHd.textContent='BAGAIMANA DENGAN 1?';
panelS.appendChild(sHd);
const sBig=document.createElement('div');
sBig.className='pBig';
sBig.style.cssText+=`font-size:${ORIENT==='portrait'?38:34}px;height:${Math.round(P.panelH*0.16)}px;display:flex;align-items:center;justify-content:center;`;
sBig.textContent='1 = SATU FAKTOR';
panelS.appendChild(sBig);
[['PRIMA BUTUH TEPAT DUA',33.9,'#D97A2E'],['BUKAN PRIMA, BUKAN KOMPOSIT',35.6,'#4CAF7A']].forEach(([tx,t0,col])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?48:40}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
  const dot=document.createElement('div');
  dot.className='pDot';
  dot.style.cssText+=`width:${ORIENT==='portrait'?20:18}px;height:${ORIENT==='portrait'?20:18}px;background:${col};margin-right:14px;`;
  r.appendChild(dot);
  const n=document.createElement('div');
  n.className='pName';
  n.style.cssText+=`font-size:${ORIENT==='portrait'?24:21}px;`;
  n.textContent=tx;
  r.appendChild(n);
  panelS.appendChild(r);
  SROWS.push({el:r,t0});
});
const sNote=document.createElement('div');
sNote.className='pNote';
sNote.style.cssText+=`height:${ORIENT==='portrait'?44:38}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?23:21}px;`;
sNote.textContent='BAGIAN YANG SERING TERLEWAT';
panelS.appendChild(sNote);
propsEl.appendChild(panelS);

/* panel 3: istimewanya angka 2 */
const panel3=document.createElement('div');
panel3.className='panelI';
panel3.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p3Hd=document.createElement('div');
p3Hd.className='pHd';
p3Hd.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p3Hd.textContent='ISTIMEWANYA ANGKA 2';
panel3.appendChild(p3Hd);
const p3Big=document.createElement('div');
p3Big.className='pBig';
p3Big.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;height:${Math.round(P.panelH*0.13)}px;display:flex;align-items:center;justify-content:center;`;
p3Big.textContent='SATU-SATUNYA PRIMA GENAP';
panel3.appendChild(p3Big);
[['GENAP > 2: PASTI HABIS DIBAGI 2',39.6,'#D97A2E'],['JADI 4, 6, 8, 10 = KOMPOSIT',40.6,'#D97A2E']].forEach(([tx,t0,col])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?46:38}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
  const dot=document.createElement('div');
  dot.className='pDot';
  dot.style.cssText+=`width:${ORIENT==='portrait'?20:18}px;height:${ORIENT==='portrait'?20:18}px;background:${col};margin-right:14px;`;
  r.appendChild(dot);
  const n=document.createElement('div');
  n.className='pName';
  n.style.cssText+=`font-size:${ORIENT==='portrait'?23:21}px;`;
  n.textContent=tx;
  r.appendChild(n);
  panel3.appendChild(r);
  P3ROWS.push({el:r,t0});
});
const p3Chips=document.createElement('div');
p3Chips.style.cssText+=`display:flex;align-items:center;justify-content:center;height:${Math.round(P.panelH*0.20)}px;gap:${ORIENT==='portrait'?12:14}px;`;
[['4',41.8],['6',42.0],['8',42.2],['10',42.4]].forEach(([v,t0])=>{
  const c=document.createElement('div');
  c.className='chipA';
  c.style.cssText+=`width:${ORIENT==='portrait'?86:96}px;height:${ORIENT==='portrait'?52:46}px;font-size:${ORIENT==='portrait'?24:22}px;
    border:3px solid #D97A2E;`;
  c.textContent=v;
  p3Chips.appendChild(c);
  P3CHIPS.push({el:c,t0});
});
panel3.appendChild(p3Chips);
const p3Note=document.createElement('div');
p3Note.className='pNote';
p3Note.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;margin:${ORIENT==='portrait'?8:6}px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?23:21}px;`;
p3Note.textContent='2 CUMA PUNYA FAKTOR 1 DAN 2';
panel3.appendChild(p3Note);
propsEl.appendChild(panel3);

/* panel 4: faktorisasi prima */
const panel4=document.createElement('div');
panel4.className='panelI';
panel4.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p4Hd=document.createElement('div');
p4Hd.className='pHd';
p4Hd.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p4Hd.textContent='FAKTORISASI PRIMA';
panel4.appendChild(p4Hd);
const p4Big=document.createElement('div');
p4Big.className='pBig';
p4Big.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;height:${Math.round(P.panelH*0.13)}px;display:flex;align-items:center;justify-content:center;`;
p4Big.textContent='URAI JADI PERKALIAN PRIMA';
panel4.appendChild(p4Big);
[['12 = 2 × 2 × 3',48.1,'#4CAF7A'],['18 = 2 × 3 × 3',48.7,'#4CAF7A'],['30 = 2 × 3 × 5',49.3,'#4CAF7A']].forEach(([tx,t0,col])=>{
  const r=document.createElement('div');
  r.className='vrow';
  r.style.cssText+=`height:${ORIENT==='portrait'?44:36}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
  const d=document.createElement('div');
  d.className='vd';
  d.style.cssText+=`width:${ORIENT==='portrait'?18:16}px;height:${ORIENT==='portrait'?18:16}px;background:${col};margin-right:14px;`;
  r.appendChild(d);
  const tt=document.createElement('div');
  tt.className='vt';
  tt.style.cssText+=`font-size:${ORIENT==='portrait'?23:21}px;`;
  tt.textContent=tx;
  r.appendChild(tt);
  panel4.appendChild(r);
  P4ROWS.push({el:r,t0});
});
const p4Note=document.createElement('div');
p4Note.className='pNote';
p4Note.style.cssText+=`height:${ORIENT==='portrait'?40:34}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?22:20}px;`;
p4Note.textContent='HASILNYA SELALU UNIK';
panel4.appendChild(p4Note);
const p4Note2=document.createElement('div');
p4Note2.className='pNote';
p4Note2.style.cssText+=`height:${ORIENT==='portrait'?40:34}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?22:20}px;`;
p4Note2.textContent='BASIS TEORI BILANGAN';
panel4.appendChild(p4Note2);
propsEl.appendChild(panel4);

/* ---------- papan tugas uji (aturan 30): soal tampil besar dan bernomor ---------- */
const panelUji=document.createElement('div');
panelUji.className='panelI';
panelUji.style.cssText+=`left:${P.panelX}px;top:${ORIENT==='portrait'?400:250}px;width:${P.panelW}px;height:${ORIENT==='portrait'?410:310}px;`;
const ujiHd=document.createElement('div');
ujiHd.style.cssText+=`margin:12px ${Math.round(P.panelW*0.06)}px 0;height:${ORIENT==='portrait'?48:40}px;font-size:${ORIENT==='portrait'?30:27}px;color:#F2C14E;font-weight:800;letter-spacing:.06em;opacity:0;`;
ujiHd.textContent='GILIRAN KAMU:';
panelUji.appendChild(ujiHd);
const SOAL=[['1.','PRIMA, KOMPOSIT, ATAU BUKAN?'],['2.','KENAPA 1 BUKAN PRIMA?'],['3.','KENAPA 2 GENAP TETAP PRIMA?'],['4.','URAIKAN 36 KE FAKTOR PRIMA']];
const UJIS=[];
SOAL.forEach(([n,q],i)=>{
  const r=document.createElement('div');
  r.style.cssText+=`margin:3px ${Math.round(P.panelW*0.06)}px 0;height:${ORIENT==='portrait'?38:32}px;font-size:${ORIENT==='portrait'?26:23}px;color:#FFF6E8;font-weight:600;opacity:0;`;
  r.innerHTML='<span style="color:#F2C14E">'+n+'</span> '+q;
  panelUji.appendChild(r);
  UJIS.push({el:r,t0:53.6+i*0.18});
});
const UJIVAL=['1','2','9','13','21','29','35','49'];
const ujiGrid=document.createElement('div');
ujiGrid.style.cssText+=`position:absolute;left:0;top:${ORIENT==='portrait'?232:200}px;width:100%;display:flex;flex-wrap:wrap;justify-content:center;gap:${ORIENT==='portrait'?12:10}px;`;
const CARDS=UJIVAL.map((lab,i)=>{
  const el=document.createElement('div');
  el.className='valCard';
  el.style.cssText+=`position:relative;width:${P.cardW}px;height:${P.cardH}px;font-size:${P.cardFS}px;opacity:0;`;
  el.textContent=lab;
  ujiGrid.appendChild(el);
  return {el,lab,pop:55.4+i*0.12};
});
panelUji.appendChild(ujiGrid);
const ujiNote=document.createElement('div');
ujiNote.className='pNote';
ujiNote.style.cssText+=`position:absolute;left:${Math.round(P.panelW*0.06)}px;top:${ORIENT==='portrait'?374:262}px;
  width:${P.panelW-Math.round(P.panelW*0.12)}px;height:${ORIENT==='portrait'?34:28}px;font-size:${ORIENT==='portrait'?21:19}px;`;
ujiNote.textContent='SEMUANYA BILANGAN ASLI';
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
pil.style.cssText+=`left:${P.pilX}px;top:${P.pilY}px;width:${P.pilW}px;height:${P.pilH}px;font-size:${P.pilFS}px;letter-spacing:.08em;`;
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
subEn.style.marginTop='6px';
subbar.style.top=P.subTop+'px';
subbar.style.maxWidth=P.subMax+'px';
subbar.style.width='max-content';
const wm=document.getElementById('wm');
wm.style.cssText+=`top:${P.wmY}px;font-size:${P.wmFS}px;left:50%;transform:translateX(-50%);
  width:max-content;padding:10px 32px;background:rgba(26,16,10,.55);border-radius:999px;`;
