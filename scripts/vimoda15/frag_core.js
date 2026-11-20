const Q=new URLSearchParams(location.search);
const ORIENT=Q.get('o')||'landscape';
const W=ORIENT==='portrait'?1080:1920;
const H=ORIENT==='portrait'?1920:1080;
const P = ORIENT==='portrait' ? {
  floorY:1080, bbY:1064,
  tableX:50, tableW:330, slabY:830, slabH:52, legBot:1080,
  bdW:300, bdH:96, bdCX:215, bdCY:778,
  shelfX:80, shelfW:920, shelfFS:14,
  stampX:445, stampY:690, stampW:520, stampH:64, stampFS:26,
  panelX:400, panelY:470, panelW:610, panelH:360,
  pilX:250, pilY:850, pilW:580, pilH:66, pilFS:26,
  ecY:830, barW:420,
  titleY:300, titleS0:80, titleSN:74,
  subTop:1170, subId:46, subEn:25, subMax:880,
  ballD:110, groundY:1120, wmY:1800, wmFS:22,
  lampsX:[340,700], lampsY:[168,150], lampsD:[74,62],
  markX:220, markY:1096, markW:640, markH:16,
  signX:800, signY:848, signW:240, signH:150,
  cardW:142, cardH:62, cardFS:30,
  jarW:120, jarH:150, jarFS:26, candyD:26,
  bigJarX:620, bigJarY:830, bigJarW:170, bigJarH:200,
  plateX:420, plateY:850, plateW:320, plateH:170, plateD:14
} : {
  floorY:508, bbY:494,
  tableX:140, tableW:360, slabY:540, slabH:40, legBot:700,
  bdW:340, bdH:82, bdCX:320, bdCY:494,
  shelfX:140, shelfW:600, shelfFS:12,
  stampX:940, stampY:440, stampW:600, stampH:58, stampFS:23,
  panelX:760, panelY:250, panelW:1020, panelH:290,
  pilX:670, pilY:600, pilW:580, pilH:62, pilFS:25,
  ecY:400, barW:520,
  titleY:150, titleS0:88, titleSN:72,
  subTop:740, subId:46, subEn:25, subMax:1360,
  ballD:96, groundY:660, wmY:1010, wmFS:20,
  lampsX:[560,1000], lampsY:[112,100], lampsD:[62,52],
  markX:620, markY:672, markW:680, markH:14,
  signX:1440, signY:556, signW:240, signH:140,
  cardW:112, cardH:50, cardFS:26,
  jarW:100, jarH:115, jarFS:23, candyD:20,
  bigJarX:940, bigJarY:560, bigJarW:140, bigJarH:135,
  plateX:860, plateY:555, plateW:260, plateH:110, plateD:11
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
let _seed=20261122;
const rnd=()=>{_seed|=0;_seed=_seed+0x6D2B79F5|0;let z=Math.imul(_seed^_seed>>>15,1|_seed);
  z=z+Math.imul(z^z>>>7,61|z)^z;return((z^z>>>14)>>>0)/4294967296;};

/* ---------- dinding kios krem pink, lantai papan kayu, baseboard ---------- */
const wallEl=document.getElementById('candywall');
wallEl.style.cssText+=`height:${P.floorY}px;`;
const floorEl=document.getElementById('floorwood');
floorEl.style.cssText+=`top:${P.floorY}px;height:${H-P.floorY}px;`;
const bbEl=document.getElementById('baseboard');
bbEl.style.cssText+=`top:${P.bbY}px;height:${P.floorY-P.bbY}px;`;

/* ---------- awning scallop merah-krem di tepi atas ---------- */
const awnEl=document.getElementById('awning');
const CANDY=['#E85D5D','#F2A03D','#5CA85C','#5A8AD8','#C97BCA','#F2C14E'];
{
  const bh=ORIENT==='portrait'?52:36;
  const band=awnEl.querySelector('.band');
  band.style.cssText+=`height:${bh}px;`;
  const n=Math.ceil(W/64)+1;
  for(let i=0;i<n;i++){
    const sc=document.createElement('div');
    sc.className='scal';
    sc.style.cssText+=`left:${i*64-8}px;top:${bh-13}px;width:80px;height:26px;
      background:${i%2===0?'#C9524A':'#FFF4E4'};`;
    awnEl.appendChild(sc);
  }
}
/* ---------- dua lampion kertas bulat hangat ---------- */
const LAMPS=[];
document.querySelectorAll('.lant').forEach((lw,i)=>{
  const lx=P.lampsX[i], ly=P.lampsY[i], ld=P.lampsD[i];
  const cord=lw.querySelector('.cord');
  cord.style.cssText+=`left:${lx-1.5}px;top:0;height:${ly}px;`;
  const body=lw.querySelector('.body');
  body.style.cssText+=`left:${lx-ld/2}px;top:${ly}px;width:${ld}px;height:${ld}px;`;
  const glow=lw.querySelector('.glow');
  glow.style.cssText+=`left:${lx-ld*0.9}px;top:${ly-ld*0.15}px;width:${ld*1.8}px;height:${ld*1.8}px;`;
  LAMPS.push({lw,glow,ph:i*2.1,ly:ly});
});
/* ---------- rak kayu berisi stoples permen di dinding (ikon dunia) ---------- */
function makeJar(parent,x,y,w,h,small){
  const root=document.createElement('div');
  root.className='jar';
  root.style.cssText+=`left:${x}px;top:${y}px;width:${w}px;height:${h}px;`;
  const lid=document.createElement('div');
  lid.className='lid';
  lid.style.cssText+=`left:${Math.round(w*0.12)}px;top:0;width:${Math.round(w*0.76)}px;height:${Math.round(h*0.16)}px;`;
  const glass=document.createElement('div');
  glass.className='glass';
  glass.style.cssText+=`left:0;top:${Math.round(h*0.14)}px;width:${w}px;height:${Math.round(h*0.86)}px;`;
  root.appendChild(lid);root.appendChild(glass);
  parent.appendChild(root);
  const candies=[];
  const cd=small?(ORIENT==='portrait'?18:15):P.candyD;
  const gx=Math.round(w*0.14), gy=Math.round(h*0.30);
  return {root,candies,cd,gx,gy,gw:Math.round(w*0.72),gh:Math.round(h*0.62)};
}
const shelfEl=document.getElementById('shelf');
{
  const planks=ORIENT==='portrait'?[168,238]:[264,318];
  planks.forEach(py=>{
    const pk=document.createElement('div');
    pk.className='plank';
    pk.style.cssText+=`left:${P.shelfX}px;top:${py}px;width:${P.shelfW}px;height:14px;`;
    shelfEl.appendChild(pk);
  });
  const JW=ORIENT==='portrait'?84:70, JH=ORIENT==='portrait'?76:62;
  const spots=ORIENT==='portrait'
    ? [[150,0],[260,0],[370,0],[480,0],[560,1],[670,1],[780,1],[890,1]]
    : [[210,0],[300,0],[390,0],[250,1],[340,1],[430,1]];
  spots.forEach(([sx,si])=>{
    const jr=makeJar(shelfEl,sx,planks[si]-JH+2,JW,JH,true);
    for(let k=0;k<3;k++){
      const c=document.createElement('div');
      c.className='candy';
      c.style.cssText+=`left:${jr.gx+ (k%2)*Math.round(jr.cd*1.25)}px;top:${jr.gy+Math.floor(k/2)*Math.round(jr.cd*1.15)}px;
        width:${jr.cd}px;height:${jr.cd}px;background:${CANDY[(si*3+k)%CANDY.length]};opacity:.9;`;
      jr.root.appendChild(c);
    }
  });
}
/* ---------- meja kios dan etalase kaca ---------- */
const counterEl=document.getElementById('counter');
{
  const slab=counterEl.querySelector('.slab');
  slab.style.cssText+=`left:${P.tableX}px;top:${P.slabY}px;width:${P.tableW}px;height:${P.slabH}px;`;
  const legs=counterEl.querySelectorAll('.leg');
  legs[0].style.cssText+=`left:${P.tableX+26}px;top:${P.slabY+P.slabH}px;height:${P.legBot-P.slabY-P.slabH}px;`;
  legs[1].style.cssText+=`left:${P.tableX+P.tableW-52}px;top:${P.slabY+P.slabH}px;height:${P.legBot-P.slabY-P.slabH}px;`;
}
const etalaseEl=document.getElementById('etalase');
{
  const box=etalaseEl.querySelector('.box');
  box.style.cssText+=`left:${P.bdCX-P.bdW/2}px;top:${P.bdCY-Math.round(P.bdH*0.58)}px;width:${P.bdW}px;height:${P.bdH}px;`;
  const nrow=3;
  for(let r=0;r<nrow;r++){
    const ln=document.createElement('div');
    ln.className='shelfL';
    ln.style.cssText+=`left:${P.bdCX-P.bdW/2+10}px;top:${P.bdCY-Math.round(P.bdH*0.58)+Math.round(P.bdH*(0.34+r*0.24))}px;width:${P.bdW-20}px;height:3px;`;
    etalaseEl.appendChild(ln);
    for(let k=0;k<5;k++){
      const c=document.createElement('div');
      c.className='cd';
      const d=ORIENT==='portrait'?20:16;
      c.style.cssText+=`left:${P.bdCX-P.bdW/2+18+k*Math.round((P.bdW-52)/4)}px;top:${P.bdCY-Math.round(P.bdH*0.58)+Math.round(P.bdH*(0.30+r*0.24))-d/2}px;
        width:${d}px;height:${d}px;background:${CANDY[(r*2+k)%CANDY.length]};`;
      etalaseEl.appendChild(c);
    }
  }
}
/* ---------- tanda KIOS PERMEN di dinding ---------- */
const signEl=document.getElementById('sign');
{
  const board=signEl.querySelector('.board');
  board.style.cssText+=`left:0;top:0;width:${P.signW}px;height:${P.signH}px;`;
  const lab=document.createElement('div');
  lab.className='lab';
  lab.style.cssText+=`left:0;top:${Math.round(P.signH*0.36)}px;font-size:${ORIENT==='portrait'?24:26}px;letter-spacing:.10em;`;
  lab.textContent='KIOS PERMEN';
  signEl.appendChild(lab);
}
/* ---------- karpet festival merah-krem di jalur mentor ---------- */
const markEl=document.getElementById('runner');
markEl.style.cssText+=`left:${P.markX}px;top:${P.markY}px;width:${P.markW}px;height:${P.markH}px;`;

/* ---------- panel-panel konten (satu ide per layar) ---------- */
const propsEl=document.getElementById('props');
const speedEl=document.getElementById('speedlines');
const spotEl=document.getElementById('spotlight');
const P1ROWS=[], P1CHIPS=[], P2ROWS=[], P2CHIPS=[], SROWS=[], P3ROWS=[], P4ROWS=[];
/* chip episode ala kartu judul anime (aturan 34) */
const epchip=document.createElement('div');
epchip.style.cssText+=`position:absolute;left:50%;transform:translateX(-50%);
  top:${P.titleY-(ORIENT==='portrait'?66:54)}px;width:max-content;
  font-family:'JetBrains Mono','DejaVu Sans Mono',monospace;font-weight:800;
  font-size:${ORIENT==='portrait'?22:20}px;letter-spacing:.22em;color:#3A2C1E;
  background:rgba(255,253,246,.78);border:2.5px solid #C9524A;border-radius:999px;
  padding:7px 26px;box-shadow:0 8px 18px rgba(60,40,10,.28);opacity:0;`;
epchip.textContent='EPISODE 15';
stage.appendChild(epchip);
/* stempel hook */
const stamp=document.createElement('div');
stamp.className='stamp';
stamp.style.cssText+=`left:${P.stampX}px;top:${P.stampY}px;width:${P.stampW}px;height:${P.stampH}px;font-size:${P.stampFS}px;opacity:0;`;
stamp.textContent='DUA BELAS RATA, TIGA BELAS SISA!';
propsEl.appendChild(stamp);
/* hook: 12 permen masuk tiga stoples rata (4-4-4), permen ke-13 ditolak: SISA */
const HOOKJ=[];
{
  const centers=ORIENT==='portrait'?[525,705,885]:[1050,1270,1490];
  centers.forEach((cx,ji)=>{
    const jr=makeJar(propsEl,cx-P.jarW/2,ORIENT==='portrait'?470:265,P.jarW,P.jarH,false);
    const jt0=1.0+ji*0.12;
    for(let k=0;k<4;k++){
      const c=document.createElement('div');
      c.className='candy';
      c.style.cssText+=`left:${jr.gx+(k%2)*Math.round(jr.cd*1.3)}px;top:${jr.gy+Math.floor(k/2)*Math.round(jr.cd*1.2)}px;
        width:${jr.cd}px;height:${jr.cd}px;background:${CANDY[(ji*2+k)%CANDY.length]};opacity:0;`;
      jr.root.appendChild(c);
      jr.candies.push({el:c,t0:1.3+ji*0.12+k*0.16});
    }
    HOOKJ.push({root:jr.root,t0:jt0,candies:jr.candies});
  });
}
const QUEUE=[], SISA={}, QM={};
{
  const n=12, sp=ORIENT==='portrait'?44:40, d=ORIENT==='portrait'?16:14;
  const x0=(ORIENT==='portrait'?705:1270)-((n-1)*sp)/2;
  const qy=ORIENT==='portrait'?660:415;
  for(let i=0;i<n;i++){
    const c=document.createElement('div');
    c.className='cd';
    c.style.cssText+=`left:${x0+i*sp-d/2}px;top:${qy-d/2}px;width:${d}px;height:${d}px;background:${CANDY[i%CANDY.length]};opacity:0;`;
    propsEl.appendChild(c);
    QUEUE.push({el:c,t0:3.4+i*0.05});
  }
  const sx0=x0+n*sp, sy=qy;
  const s=document.createElement('div');
  s.className='cd';
  s.style.cssText+=`left:${sx0-(ORIENT==='portrait'?30:26)/2}px;top:${sy-(ORIENT==='portrait'?30:26)/2}px;
    width:${ORIENT==='portrait'?30:26}px;height:${ORIENT==='portrait'?30:26}px;background:#E85D5D;opacity:0;`;
  propsEl.appendChild(s);
  SISA.el=s; SISA.x=sx0; SISA.y=sy; SISA.hx=sx0+(ORIENT==='portrait'?60:60);
  const qm=document.createElement('div');
  qm.className='qmark';
  qm.style.cssText+=`left:${SISA.hx-(ORIENT==='portrait'?16:14)}px;top:${sy-(ORIENT==='portrait'?62:52)}px;
    font-size:${ORIENT==='portrait'?44:38}px;opacity:0;`;
  qm.textContent='?';
  propsEl.appendChild(qm);
  QM.el=qm;
}

/* panel 1: faktor */
const panel1=document.createElement('div');
panel1.className='panelI';
panel1.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p1Hd=document.createElement('div');
p1Hd.className='pHd';
p1Hd.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p1Hd.textContent='FAKTOR ITU PEMBAGI HABIS';
panel1.appendChild(p1Hd);
const p1Big=document.createElement('div');
p1Big.className='pBig';
p1Big.style.cssText+=`font-size:${ORIENT==='portrait'?34:30}px;height:${Math.round(P.panelH*0.14)}px;display:flex;align-items:center;justify-content:center;`;
p1Big.textContent='HABIS DIBAGI, NOL SISA';
panel1.appendChild(p1Big);
[['12 ÷ 3 = 4 · PAS TANPA SISA',12.0,'#4CAF7A'],['FAKTOR 12 ADA ENAM BUAH',12.5,'#F2C14E']].forEach(([tx,t0,col])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?48:44}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
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
p1Chips.style.cssText+=`display:flex;align-items:center;justify-content:center;height:${Math.round(P.panelH*0.17)}px;gap:${ORIENT==='portrait'?8:10}px;`;
['1','2','3','4','6','12'].forEach((v,i)=>{
  const c=document.createElement('div');
  c.className='chipA';
  c.style.cssText+=`width:${ORIENT==='portrait'?72:82}px;height:${ORIENT==='portrait'?48:44}px;font-size:${ORIENT==='portrait'?22:19}px;`;
  c.textContent=v;
  p1Chips.appendChild(c);
  P1CHIPS.push({el:c,t0:13.6+i*0.14});
});
panel1.appendChild(p1Chips);
const p1Note=document.createElement('div');
p1Note.className='pNote';
p1Note.style.cssText+=`height:${ORIENT==='portrait'?44:38}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?22:20}px;`;
p1Note.textContent='12 ÷ 5 = 2 SISA 2 · 5 GAGAL';
panel1.appendChild(p1Note);
const p1Note2=document.createElement('div');
p1Note2.className='pNote';
p1Note2.style.cssText+=`height:${ORIENT==='portrait'?40:34}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?22:20}px;`;
p1Note2.textContent='13 BANDEL: CUMA 1 DAN 13';
panel1.appendChild(p1Note2);
propsEl.appendChild(panel1);

/* panel 2: kelipatan */
const panel2=document.createElement('div');
panel2.className='panelI';
panel2.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p2Hd=document.createElement('div');
p2Hd.className='pHd';
p2Hd.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p2Hd.textContent='KELIPATAN ITU HASIL KALI';
panel2.appendChild(p2Hd);
const p2Big=document.createElement('div');
p2Big.className='pBig';
p2Big.style.cssText+=`font-size:${ORIENT==='portrait'?34:30}px;height:${Math.round(P.panelH*0.14)}px;display:flex;align-items:center;justify-content:center;`;
p2Big.textContent='4 × 1, 2, 3, 4, 5, ...';
panel2.appendChild(p2Big);
[['4, 8, 12, 16, 20, ... TERUS',24.8,'#4CAF7A'],['12 MASUK KARENA 4 × 3 = 12',25.4,'#F2C14E']].forEach(([tx,t0,col])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?48:44}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
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
p2Chips.style.cssText+=`display:flex;align-items:center;justify-content:center;height:${Math.round(P.panelH*0.17)}px;gap:${ORIENT==='portrait'?8:10}px;`;
['4','8','12','16','20','...'].forEach((v,k)=>{
  const c=document.createElement('div');
  c.className='chipA';
  c.style.cssText+=`width:${ORIENT==='portrait'?72:82}px;height:${ORIENT==='portrait'?48:44}px;font-size:${ORIENT==='portrait'?22:19}px;
    ${k===5?'background:#3A2A50;border:2px solid #E8B32E;':''}`;
  c.textContent=v;
  p2Chips.appendChild(c);
  P2CHIPS.push({el:c,t0:26.2+k*1.0});
});
panel2.appendChild(p2Chips);
const p2Note=document.createElement('div');
p2Note.className='pNote';
p2Note.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?22:20}px;`;
p2Note.textContent='TERUS TERUSAN, TANPA UJUNG';
panel2.appendChild(p2Note);
propsEl.appendChild(panel2);

/* panel kejutan twist: faktor 6 vs kelipatan 6 (beat emas 34.2) */
const panelS=document.createElement('div');
panelS.className='panelI';
panelS.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const sHd=document.createElement('div');
sHd.className='pHd';
sHd.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
sHd.textContent='FAKTOR 6 VS KELIPATAN 6';
panelS.appendChild(sHd);
const sBig=document.createElement('div');
sBig.className='pBig';
sBig.style.cssText+=`font-size:${ORIENT==='portrait'?36:32}px;height:${Math.round(P.panelH*0.16)}px;display:flex;align-items:center;justify-content:center;`;
sBig.textContent='TERBATAS VS TANPA BATAS';
panelS.appendChild(sBig);
[['FAKTOR 6: 1, 2, 3, 6 · CUMA EMPAT',35.7,'#D97A2E'],['KELIPATAN 6: 6, 12, 18, 24, 30, ...',37.2,'#4CAF7A']].forEach(([tx,t0,col])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?48:40}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
  const dot=document.createElement('div');
  dot.className='pDot';
  dot.style.cssText+=`width:${ORIENT==='portrait'?20:18}px;height:${ORIENT==='portrait'?20:18}px;background:${col};margin-right:14px;`;
  r.appendChild(dot);
  const n=document.createElement('div');
  n.className='pName';
  n.style.cssText+=`font-size:${ORIENT==='portrait'?23:20}px;`;
  n.textContent=tx;
  r.appendChild(n);
  panelS.appendChild(r);
  SROWS.push({el:r,t0});
});
const sNote=document.createElement('div');
sNote.className='pNote';
sNote.style.cssText+=`height:${ORIENT==='portrait'?44:38}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?22:20}px;`;
sNote.textContent='FAKTOR BERHENTI · KELIPATAN TERUS';
panelS.appendChild(sNote);
propsEl.appendChild(panelS);

/* panel 3: saling berkaitan (satu kali, dua peran) */
const panel3=document.createElement('div');
panel3.className='panelI';
panel3.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p3Hd=document.createElement('div');
p3Hd.className='pHd';
p3Hd.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p3Hd.textContent='FAKTOR DAN KELIPATAN BERKAITAN';
panel3.appendChild(p3Hd);
const p3Big=document.createElement('div');
p3Big.className='pBig';
p3Big.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;height:${Math.round(P.panelH*0.12)}px;display:flex;align-items:center;justify-content:center;`;
p3Big.textContent='SATU KALI, DUA PERAN';
panel3.appendChild(p3Big);
const kLine=document.createElement('div');
kLine.className='pBig';
kLine.style.cssText+=`font-size:${ORIENT==='portrait'?34:30}px;height:${Math.round(P.panelH*0.14)}px;display:flex;align-items:center;justify-content:center;color:#FFE9A8;`;
kLine.textContent='4 × 3 = 12';
panel3.appendChild(kLine);
[['4 DAN 3: FAKTOR 12',42.8,'#D97A2E'],['12: KELIPATAN 4 DAN 3',43.6,'#4CAF7A']].forEach(([tx,t0,col])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?44:38}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
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
const p3Note=document.createElement('div');
p3Note.className='pNote';
p3Note.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?22:20}px;`;
p3Note.textContent='COBA CEK: 6 × 5 = 30';
panel3.appendChild(p3Note);
propsEl.appendChild(panel3);

/* panel 4: jurus bagi rata (aplikasi faktor: 24 permen) */
const panel4=document.createElement('div');
panel4.className='panelI';
panel4.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p4Hd=document.createElement('div');
p4Hd.className='pHd';
p4Hd.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p4Hd.textContent='FAKTOR UNTUK MEMBAGI RATA';
panel4.appendChild(p4Hd);
const p4Big=document.createElement('div');
p4Big.className='pBig';
p4Big.style.cssText+=`font-size:${ORIENT==='portrait'?30:27}px;height:${Math.round(P.panelH*0.13)}px;display:flex;align-items:center;justify-content:center;`;
p4Big.textContent='24 PERMEN, PEMBAGI RATA';
panel4.appendChild(p4Big);
[['2 TEMAN DAPAT 12 · 3 DAPAT 8',51.6],['4 DAPAT 6 · 6 DAPAT 4',53.4]].forEach(([tx,t0])=>{
  const r=document.createElement('div');
  r.className='vrow';
  r.style.cssText+=`height:${ORIENT==='portrait'?44:38}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
  const d=document.createElement('div');
  d.className='vd';
  d.style.cssText+=`width:${ORIENT==='portrait'?18:16}px;height:${ORIENT==='portrait'?18:16}px;background:#4CAF7A;margin-right:14px;`;
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
p4Note.textContent='SISA NOL · SEMUA SENANG';
panel4.appendChild(p4Note);
const p4Note2=document.createElement('div');
p4Note2.className='pNote';
p4Note2.style.cssText+=`height:${ORIENT==='portrait'?40:34}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?22:20}px;`;
p4Note2.textContent='FAKTOR 24: 1, 2, 3, 4, 6, 8, 12, 24';
panel4.appendChild(p4Note2);
propsEl.appendChild(panel4);
/* jurus bernama ala anime (aturan 34): stempel miring di sudut panel */
const jurusWrap=document.createElement('div');
jurusWrap.style.cssText+=`position:absolute;left:${P.panelX+P.panelW-(ORIENT==='portrait'?268:300)}px;
  top:${P.panelY-(ORIENT==='portrait'?26:20)}px;width:${ORIENT==='portrait'?268:300}px;
  height:${ORIENT==='portrait'?54:48}px;transform:rotate(-7deg);`;
const jurus=document.createElement('div');
jurus.className='stamp';
jurus.style.cssText+=`left:0;top:0;width:100%;height:100%;font-size:${ORIENT==='portrait'?23:21}px;opacity:0;`;
jurus.textContent='JURUS BAGI RATA!';
jurusWrap.appendChild(jurus);
propsEl.appendChild(jurusWrap);

/* stoples besar kelipatan 4: hujan permen +4 tiap ronde */
const JARBIG=makeJar(propsEl,P.bigJarX,P.bigJarY,P.bigJarW,P.bigJarH,false);
JARBIG.root.style.opacity='0';
const BIGC=[];
for(let i=0;i<20;i++){
  const c=document.createElement('div');
  c.className='candy';
  const cols=4, dx=Math.round((P.bigJarW-2*JARBIG.gx-JARBIG.cd)/(cols-1)||JARBIG.cd*1.3);
  c.style.cssText+=`left:${JARBIG.gx+(i%4)*Math.round(JARBIG.cd*1.3)}px;top:${JARBIG.gy+Math.floor(i/4)*Math.round(JARBIG.cd*1.25)}px;
    width:${JARBIG.cd}px;height:${JARBIG.cd}px;background:${CANDY[i%CANDY.length]};opacity:0;`;
  JARBIG.root.appendChild(c);
  BIGC.push({el:c,t0:26.2+Math.floor(i/4)*1.0+(i%4)*0.12});
}
/* piring jurus bagi rata: 24 permen tersusun ulang 2, 3, 4, 6 porsi */
const plateEl=document.createElement('div');
plateEl.className='plate';
plateEl.style.cssText+=`left:${P.plateX}px;top:${P.plateY}px;width:${P.plateW}px;height:${P.plateH}px;opacity:0;`;
propsEl.appendChild(plateEl);
const PLATED=[];
function platePos(g,i){
  const cols=Math.round(24/g), rows=g;
  const dx=Math.min(ORIENT==='portrait'?30:24,(P.plateW-60)/cols);
  const dy=Math.min(ORIENT==='portrait'?26:16,(P.plateH-56)/rows);
  const cx=P.plateX+P.plateW/2, cy=P.plateY+P.plateH/2;
  return [cx+(i%cols-(cols-1)/2)*dx, cy+(Math.floor(i/cols)-(rows-1)/2)*dy];
}
for(let i=0;i<24;i++){
  const c=document.createElement('div');
  c.className='cd';
  const [px,py]=platePos(2,i);
  c.style.cssText+=`left:${px-P.plateD/2}px;top:${py-P.plateD/2}px;width:${P.plateD}px;height:${P.plateD}px;
    background:${CANDY[i%CANDY.length]};opacity:0;`;
  propsEl.appendChild(c);
  PLATED.push({el:c,t0:50.9+i*0.028});
}
const PLATE_T=[51.8,52.8,53.8,54.8], PLATE_G=[2,3,4,6];

/* ---------- papan tugas uji (aturan 30): soal tampil besar dan bernomor ---------- */
const panelUji=document.createElement('div');
panelUji.className='panelI';
panelUji.style.cssText+=`left:${P.panelX}px;top:${ORIENT==='portrait'?400:250}px;width:${P.panelW}px;height:${ORIENT==='portrait'?410:310}px;`;
const ujiHd=document.createElement('div');
ujiHd.style.cssText+=`margin:12px ${Math.round(P.panelW*0.06)}px 0;height:${ORIENT==='portrait'?48:40}px;font-size:${ORIENT==='portrait'?30:27}px;color:#F2C14E;font-weight:800;letter-spacing:.06em;opacity:0;`;
ujiHd.textContent='TANTANGAN UNTUKMU:';
panelUji.appendChild(ujiHd);
const SOAL=[['1.','TENTUKAN SEMUA FAKTOR DARI 20.'],['2.','LIMA KELIPATAN PERTAMA DARI 7.'],['3.','KENAPA 5 BUKAN FAKTOR DARI 12?'],['4.','FAKTOR ATAU KELIPATAN: TAK TERBATAS?']];
const UJIS=[];
SOAL.forEach(([n,q],i)=>{
  const r=document.createElement('div');
  r.style.cssText+=`margin:3px ${Math.round(P.panelW*0.06)}px 0;height:${ORIENT==='portrait'?38:32}px;font-size:${ORIENT==='portrait'?26:23}px;color:#FFF6E8;font-weight:600;opacity:0;`;
  r.innerHTML='<span style="color:#F2C14E">'+n+'</span> '+q;
  panelUji.appendChild(r);
  UJIS.push({el:r,t0:57.8+i*0.18});
});
const UJIVAL=['1','2','3','4','5','8','10','20'];
const ujiGrid=document.createElement('div');
ujiGrid.style.cssText+=`position:absolute;left:0;top:${ORIENT==='portrait'?232:200}px;width:100%;display:flex;flex-wrap:wrap;justify-content:center;gap:${ORIENT==='portrait'?12:10}px;`;
const CARDS=UJIVAL.map((lab,i)=>{
  const el=document.createElement('div');
  el.className='valCard';
  el.style.cssText+=`position:relative;width:${P.cardW}px;height:${P.cardH}px;font-size:${P.cardFS}px;opacity:0;`;
  el.textContent=lab;
  ujiGrid.appendChild(el);
  return {el,lab,pop:59.8+i*0.12};
});
panelUji.appendChild(ujiGrid);
const ujiNote=document.createElement('div');
ujiNote.className='pNote';
ujiNote.style.cssText+=`position:absolute;left:${Math.round(P.panelW*0.06)}px;top:${ORIENT==='portrait'?374:262}px;
  width:${P.panelW-Math.round(P.panelW*0.12)}px;height:${ORIENT==='portrait'?34:28}px;font-size:${ORIENT==='portrait'?21:19}px;`;
ujiNote.textContent='KARTU BANTU SOAL NOMOR SATU';
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
const mentorCore=mentor.el.querySelector('.core');
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
