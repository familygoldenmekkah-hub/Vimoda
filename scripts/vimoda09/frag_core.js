const Q=new URLSearchParams(location.search);
const ORIENT=Q.get('o')||'landscape';
const W=ORIENT==='portrait'?1080:1920;
const H=ORIENT==='portrait'?1920:1080;

/* v09 "Huyuan" - DUNIA BARU: MENARA LIVO, potongan menara lift kaca bersalju:
   langit dingin berubah siang ke malam bersalju, siluet kota berjendela nyala,
   shaft lift tembus basement dengan plak lantai +3 sampai -3, termometer raksasa,
   garis bilangan besar di kener dinding, garis acuan 0 putus-putus melintang.
   Latar BERBEDA TOTAL dari Rumah Bulina dan Kota Bilangan (aturan 26).
   Karakter: HANYA bola emas mentor, bulat sejati, tanpa mata (aturan 23).
   Subjudul zona aman dan maksimal dua baris (aturan 27); watermark AKIOMIDA di
   tepi paling bawah tanpa menutupi konten (aturan 24); penutup bersih (aturan 28). */
const P = ORIENT==='portrait' ? {
  floorY:1080, bbY:1064, ceilH:110,
  railY:1000, railC:720, railSp:56, railHalf:280, tickFS:24, tickH:16,
  shaftX:50, shaftW:290, shaftTop:560, shaftBot:1160,
  carX:95, carW:200, carH:150,
  floor0:900, floorSp:80,
  plateW:74, plateH:36, plateFS:24,
  thermoX:730, thermoY:470, thermoW:220, thermoH:410,
  acuanY:903,
  panelX:400, panelY:470, panelW:610, panelH:360,
  chipX0:430, chipSp:78, chipW:96, chipH:88, chipFS:36, chipY:495,
  stampY:656, stampW:470, stampH:62, stampFS:28,
  eqX:400, eqY:830, eqW:300, eqH:64, eqFS:34,
  qcX:400, qcY:830, qcW:300, qcH:64,
  qmX:352, qmY:1075, qmFS:76,
  pilX:325, pilY:980, pilW:430, pilH:70, pilFS:30,
  ecY:830, barW:420,
  titleY:300, titleS0:80, titleSN:74,
  subTop:1170, subId:40, subEn:22, subMax:880,
  ballD:110, groundY:1120, wmY:1800, wmFS:20,
  snowN:16, snowZone:[0,120,1080,1020]
} : {
  floorY:508, bbY:494, ceilH:70,
  railY:460, railC:960, railSp:80, railHalf:400, tickFS:22, tickH:14,
  shaftX:140, shaftW:300, shaftTop:290, shaftBot:735,
  carX:185, carW:180, carH:120,
  floor0:550, floorSp:55,
  plateW:64, plateH:32, plateFS:22,
  thermoX:520, thermoY:250, thermoW:180, thermoH:290,
  acuanY:553,
  panelX:760, panelY:250, panelW:1020, panelH:290,
  chipX0:790, chipSp:140, chipW:120, chipH:104, chipFS:44, chipY:285,
  stampY:428, stampW:560, stampH:58, stampFS:26,
  eqX:760, eqY:560, eqW:300, eqH:60, eqFS:30,
  qcX:460, qcY:590, qcW:280, qcH:64,
  qmX:452, qmY:565, qmFS:58,
  pilX:760, pilY:620, pilW:400, pilH:65, pilFS:28,
  ecY:400, barW:520,
  titleY:150, titleS0:88, titleSN:72,
  subTop:740, subId:38, subEn:20, subMax:1360,
  ballD:96, groundY:660, wmY:1010, wmFS:18,
  snowN:14, snowZone:[0,80,1920,500]
};
const MX=60;
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
let _seed=20261116;
const rnd=()=>{_seed|=0;_seed=_seed+0x6D2B79F5|0;let z=Math.imul(_seed^_seed>>>15,1|_seed);
  z=z+Math.imul(z^z>>>7,61|z)^z;return((z^z>>>14)>>>0)/4294967296;};

/* ---------- langit, siluet kota, salju, plafond, lantai ---------- */
const floorEl=document.getElementById('floorplank');
floorEl.style.cssText+=`top:${P.floorY}px;height:${H-P.floorY}px;`;
const bbEl=document.getElementById('baseboard');
bbEl.style.cssText+=`top:${P.bbY}px;height:${P.floorY-P.bbY}px;`;
const ceilEl=document.getElementById('ceiling');
ceilEl.style.cssText+=`height:${P.ceilH}px;`;
const LAMPS=[];
{
  const band=document.createElement('div');
  band.className='cl';
  band.style.cssText+=`left:0;top:0;width:100%;height:${Math.round(P.ceilH*0.42)}px;`;
  ceilEl.appendChild(band);
  const nl=ORIENT==='portrait'?3:5;
  for(let i=0;i<nl;i++){
    const lx=lerp(W*0.14,W*0.86,i/(nl-1));
    const lp=document.createElement('div');
    lp.className='lamp';
    const lw=Math.round(P.ceilH*1.6);
    lp.style.cssText+=`left:${lx-lw/2}px;top:${Math.round(P.ceilH*0.2)}px;width:${lw}px;height:${lw}px;`;
    ceilEl.appendChild(lp);
    LAMPS.push(lp);
  }
}
/* siluet kota: balok bangunan + jendela kecil yang menyala saat malam */
const fdEl=document.getElementById('frostday');
fdEl.style.cssText+=`height:${P.floorY}px;`;
const fnEl=document.getElementById('frostnight');
fnEl.style.cssText+=`height:${P.floorY}px;`;
const skyEl=document.getElementById('skyline');
const CITYWIN=[];
{
  const base=ORIENT==='portrait'?P.floorY:P.floorY;
  const bh0=ORIENT==='portrait'?150:110;
  let x=-20;
  let k=0;
  while(x<W+40){
    const bw=90+rnd()*130;
    const bh=bh0+rnd()*bh0*1.4;
    const b=document.createElement('div');
    b.style.cssText+=`position:absolute;left:${x}px;top:${base-bh}px;width:${bw}px;height:${bh}px;background:#7C93AE;opacity:.38;`;
    skyEl.appendChild(b);
    const nw=Math.floor(bw/26), nr=Math.floor(bh/34);
    for(let r=0;r<nr;r++)for(let c=0;c<nw;c++){
      if(rnd()<0.42){
        const wn=document.createElement('div');
        wn.style.cssText+=`position:absolute;left:${x+10+c*26}px;top:${base-bh+12+r*34}px;width:9px;height:13px;background:#FFD98A;opacity:0;border-radius:2px;`;
        skyEl.appendChild(wn);
        CITYWIN.push({el:wn,ph:rnd()*6.28});
      }
    }
    x+=bw+14+rnd()*40;
    k++;
  }
}
/* salju di balik kaca */
const snowEl=document.getElementById('snow');
const SNOW=[];
for(let i=0;i<P.snowN;i++){
  const f=document.createElement('div');
  f.className='snowp';
  const sz=(rnd()*9+4).toFixed(1);
  f.style.cssText+=`width:${sz}px;height:${sz}px;opacity:${(rnd()*0.35+0.3).toFixed(2)};`;
  snowEl.appendChild(f);
  SNOW.push({el:f,x:lerp(P.snowZone[0],P.snowZone[2],rnd()),y0:lerp(P.snowZone[1],P.snowZone[3],rnd()),
    sp:rnd()*26+16,ph:rnd()*6.28,amp:rnd()*22+8});
}

/* ---------- garis bilangan besar di kener dinding ---------- */
const railEl=document.getElementById('rail');
const TICKS=[];
{
  const ln=document.createElement('div');
  ln.className='rline';
  ln.style.cssText+=`left:${P.railC-P.railHalf-20}px;top:${P.railY}px;width:${P.railHalf*2+40}px;`;
  railEl.appendChild(ln);
  for(let v=-5;v<=5;v++){
    const tx=P.railC+v*P.railSp;
    const tk=document.createElement('div');
    tk.className='rtick';
    tk.style.cssText+=`left:${tx-2}px;top:${P.railY-P.tickH}px;height:${P.tickH+5}px;`;
    railEl.appendChild(tk);
    const nm=document.createElement('div');
    nm.className='rnum';
    nm.style.cssText+=`left:${tx-(v<0?26:14)}px;top:${P.railY+8}px;font-size:${P.tickFS}px;`;
    nm.textContent=String(v);
    railEl.appendChild(nm);
    TICKS.push({tk,nm,v});
  }
  const zt=document.createElement('div');
  zt.className='rtick';
  zt.style.cssText+=`left:${P.railC-3}px;top:${P.railY-P.tickH-6}px;height:${P.tickH+11}px;background:#E9B15B;`;
  railEl.appendChild(zt);
}

/* ---------- shaft lift: kaca, panduan, plak lantai +3 sampai -3 ---------- */
const shaftEl=document.getElementById('shaft');
const PLATES=[];
{
  const sh=document.createElement('div');
  sh.className='glass';
  sh.style.cssText+=`left:${P.shaftX}px;top:${P.shaftTop}px;width:${P.shaftW}px;height:${P.shaftBot-P.shaftTop}px;`;
  shaftEl.appendChild(sh);
  const g1=document.createElement('div');
  g1.className='guide';
  g1.style.cssText+=`left:${P.shaftX+22}px;top:${P.shaftTop+10}px;height:${P.shaftBot-P.shaftTop-20}px;`;
  shaftEl.appendChild(g1);
  const g2=document.createElement('div');
  g2.className='guide';
  g2.style.cssText+=`left:${P.shaftX+P.shaftW-29}px;top:${P.shaftTop+10}px;height:${P.shaftBot-P.shaftTop-20}px;`;
  shaftEl.appendChild(g2);
  for(let f=3;f>=-3;f--){
    const py=P.floor0-f*P.floorSp;
    const pl=document.createElement('div');
    pl.className='plate';
    pl.style.cssText+=`left:${P.shaftX+10}px;top:${py-P.plateH/2}px;width:${P.plateW}px;height:${P.plateH}px;font-size:${P.plateFS}px;`;
    pl.textContent=f>0?('+'+f):String(f);
    shaftEl.appendChild(pl);
    const beam=document.createElement('div');
    beam.className='beam';
    beam.style.cssText+=`left:${P.shaftX+P.plateW+18}px;top:${py+P.plateH/2-2}px;width:${P.shaftW-P.plateW-36}px;height:4px;`;
    shaftEl.appendChild(beam);
    PLATES.push({el:pl,f,py});
  }
  /* tanah terpotong: bagian bawah tanah ditandai arsiran */
  const cutTop=P.floorY;
  if(P.shaftBot>cutTop){
    const cut=document.createElement('div');
    cut.className='cut';
    cut.style.cssText+=`top:${cutTop}px;height:${P.shaftBot-cutTop}px;border-radius:0 0 12px 12px;`;
    shaftEl.appendChild(cut);
    const cl=document.createElement('div');
    cl.className='beam';
    cl.style.cssText+=`left:${P.shaftX-6}px;top:${cutTop-4}px;width:${P.shaftW+12}px;height:8px;background:#54718F;border-radius:4px;`;
    shaftEl.appendChild(cl);
  }
}

/* ---------- termometer raksasa ---------- */
const thermoEl=document.getElementById('thermo');
thermoEl.style.cssText=`left:${P.thermoX}px;top:${P.thermoY}px;width:${P.thermoW}px;height:${P.thermoH}px;`;
let tParts={};
{
  const fr=document.createElement('div');
  fr.className='tframe';
  fr.style.cssText+=`left:0;top:0;width:${P.thermoW}px;height:${P.thermoH}px;`;
  thermoEl.appendChild(fr);
  const tubeW=ORIENT==='portrait'?50:40;
  const tubeX=Math.round(P.thermoW*0.42);
  const tubeTop=Math.round(P.thermoH*0.10);
  const tubeBot=Math.round(P.thermoH*0.74);
  const tube=document.createElement('div');
  tube.className='tube';
  tube.style.cssText+=`left:${tubeX}px;top:${tubeTop}px;width:${tubeW}px;height:${tubeBot-tubeTop}px;`;
  thermoEl.appendChild(tube);
  const merc=document.createElement('div');
  merc.className='mercury';
  merc.style.cssText+=`left:${Math.round(tubeW*0.24)}px;width:${Math.round(tubeW*0.52)}px;`;
  tube.appendChild(merc);
  const bulbR=Math.round(tubeW*0.72);
  const bulb=document.createElement('div');
  bulb.className='bulb';
  bulb.style.cssText+=`left:${tubeX+tubeW/2-bulbR/2}px;top:${tubeBot-bulbR*0.34}px;width:${bulbR}px;height:${bulbR}px;`;
  thermoEl.appendChild(bulb);
  const frost=document.createElement('div');
  frost.className='frost';
  frost.style.cssText+=`left:${tubeX+tubeW/2-bulbR/2-7}px;top:${tubeBot-bulbR*0.34-7}px;width:${bulbR+14}px;height:${bulbR+14}px;`;
  thermoEl.appendChild(frost);
  const zeroY=tubeTop+(tubeBot-tubeTop)*0.62;
  const kDeg=(tubeBot-tubeTop)*0.0689;
  const yOf=tv=>zeroY-tv*kDeg;
  const marks=[[-5,'-5'],[0,'0'],[4,'+4']];
  marks.forEach(([tv,lb])=>{
    const my=yOf(tv);
    const mln=document.createElement('div');
    mln.className='tline';
    mln.style.cssText+=`left:${tubeX-26}px;top:${my}px;width:26px;`;
    thermoEl.appendChild(mln);
    const mlb=document.createElement('div');
    mlb.className='tmark';
    mlb.style.cssText+=`left:${tubeX-64}px;top:${my-13}px;font-size:${ORIENT==='portrait'?24:21}px;`;
    mlb.textContent=lb;
    thermoEl.appendChild(mlb);
  });
  tParts={merc,tube,tubeTop,tubeBot,yOf,bulbR,frost,tubeX,tubeW};
}

/* ---------- garis acuan 0 ---------- */
const acuanEl=document.getElementById('acuan');
acuanEl.style.cssText+=`top:${P.acuanY}px;`;
{
  const al=document.createElement('div');
  al.className='aline';
  al.style.cssText+=`top:0;left:${P.shaftX+P.shaftW+18}px;width:${W-P.shaftX-P.shaftW-90}px;`;
  acuanEl.querySelector('.aline').replaceWith(al);
  const ab=acuanEl.querySelector('.alab');
  ab.style.cssText+=`left:${W-84}px;top:-30px;font-size:${ORIENT==='portrait'?22:19}px;`;
}

/* ---------- lift car ---------- */
const carEl=document.getElementById('liftcar');
{
  const cable=carEl.querySelector('.cable');
  cable.style.cssText+=`left:${P.carX+P.carW/2-2}px;top:-2000px;height:2000px;`;
  const body=carEl.querySelector('.body');
  body.style.cssText+=`left:0;top:0;width:${P.carW}px;height:${P.carH}px;`;
  const roof=carEl.querySelector('.roof');
  roof.style.cssText+=`left:-8px;top:-12px;width:${P.carW+16}px;height:14px;`;
  const cwin=carEl.querySelector('.cwin');
  cwin.style.cssText+=`left:${Math.round(P.carW*0.16)}px;top:${Math.round(P.carH*0.22)}px;width:${Math.round(P.carW*0.68)}px;height:${Math.round(P.carH*0.52)}px;`;
}
const carF2Y=f=>P.floor0-f*P.floorSp+6-P.carH;   /* posisi atas mobil per lantai */

/* ---------- panel-panel konten (satu ide per layar) ---------- */
const propsEl=document.getElementById('props');
/* hook: tujuh chip angka */
const CHIP_VALS=['-5','-3','-1','0','2','4','6'];
const CHIP_COLS=['#2BB3A6','#5B8FE1','#8A6FC6','#E15B5B','#4FA35C','#F2C230','#38BDF8'];
const CHIPS=CHIP_VALS.map((v,i)=>{
  const c=document.createElement('div');
  c.className='hookChip';
  c.style.cssText+=`left:${P.chipX0+i*P.chipSp}px;top:${P.chipY+(i%2?18:0)}px;width:${P.chipW}px;height:${P.chipH}px;
    font-size:${P.chipFS}px;background:${CHIP_COLS[i]};opacity:0;`;
  c.textContent=v;
  propsEl.appendChild(c);
  return {el:c,t0:0.9+i*0.12,ph:i*0.9};
});
const stamp=document.createElement('div');
stamp.className='stamp';
stamp.style.cssText+=`left:${P.panelX+P.panelW/2-P.stampW/2}px;top:${P.stampY}px;width:${P.stampW}px;height:${P.stampH}px;font-size:${P.stampFS}px;opacity:0;`;
stamp.textContent='SEMUA BILANGAN BULAT';
propsEl.appendChild(stamp);

/* panel 1: tiga kelompok bilangan bulat */
const panel1=document.createElement('div');
panel1.className='panelN';
panel1.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p1Hd=document.createElement('div');
p1Hd.className='pHd';
p1Hd.style.cssText+=`font-size:${ORIENT==='portrait'?26:24}px;padding-top:${Math.round(P.panelH*0.07)}px;`;
p1Hd.textContent='TIGA KELOMPOK';
panel1.appendChild(p1Hd);
const P1ROWS=[];
[['NEGATIF','... -3 -2 -1','#5B8FE1',7.5],['NOL','0','#F2C230',8.5],['POSITIF','1 2 3 4 5 ...','#8A6FC6',9.5]].forEach(([nm,ex,col,t0])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?64:54}px;padding:0 ${Math.round(P.panelW*0.08)}px;`;
  const dot=document.createElement('div');
  dot.className='pDot';
  dot.style.cssText+=`width:${ORIENT==='portrait'?26:22}px;height:${ORIENT==='portrait'?26:22}px;background:${col};margin-right:14px;`;
  r.appendChild(dot);
  const n=document.createElement('div');
  n.className='pName';
  n.style.cssText+=`font-size:${ORIENT==='portrait'?30:26}px;width:${ORIENT==='portrait'?190:170}px;`;
  n.textContent=nm;
  r.appendChild(n);
  const e=document.createElement('div');
  e.className='pEx';
  e.style.cssText+=`font-size:${ORIENT==='portrait'?28:24}px;`;
  e.textContent=ex;
  r.appendChild(e);
  panel1.appendChild(r);
  P1ROWS.push({el:r,t0});
});
const p1Note=document.createElement('div');
p1Note.className='pNote';
p1Note.style.cssText+=`height:${ORIENT==='portrait'?52:44}px;margin:${Math.round(P.panelH*0.04)}px ${Math.round(P.panelW*0.08)}px 0;font-size:${ORIENT==='portrait'?21:18}px;`;
p1Note.textContent='NEGATIF KE KIRI, POSITIF KE KANAN';
panel1.appendChild(p1Note);
propsEl.appendChild(panel1);

/* panel perbandingan: rantai urutan */
const chainP=document.createElement('div');
chainP.className='panelN';
chainP.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${Math.round(P.panelH*0.72)}px;opacity:0;`;
const chEx=document.createElement('div');
chEx.className='pEx';
chEx.style.cssText+=`width:100%;text-align:center;font-size:${ORIENT==='portrait'?46:42}px;padding-top:${Math.round(P.panelH*0.13)}px;color:#FFFFFF;`;
chEx.textContent='-5 < -2 < 0 < 2 < 5';
chainP.appendChild(chEx);
const chCap=document.createElement('div');
chCap.className='pHd';
chCap.style.cssText+=`font-size:${ORIENT==='portrait'?20:18}px;padding-top:10px;color:#F2C96B;`;
chCap.textContent='MAKIN KANAN MAKIN BESAR';
chainP.appendChild(chCap);
propsEl.appendChild(chainP);

/* panel 4: cek anggota bulat vs bukan */
const panel4=document.createElement('div');
panel4.className='panelN';
panel4.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p4Hd=document.createElement('div');
p4Hd.className='pHd';
p4Hd.style.cssText+=`font-size:${ORIENT==='portrait'?26:24}px;padding-top:${Math.round(P.panelH*0.06)}px;`;
p4Hd.textContent='ANGGOTA BILANGAN BULAT';
panel4.appendChild(p4Hd);
const P4ROWS=[];
[['8    -12    0','BULAT',true,41.3],['1/2    -3/4    2,5','BUKAN BULAT',false,41.9]].forEach(([ex,lb,isCk,t0],i)=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?78:60}px;padding:0 ${Math.round(P.panelW*0.07)}px;`;
  const mk=document.createElement('div');
  mk.className=isCk?'ckmark':'xxmark';
  const ms=ORIENT==='portrait'?30:24;
  if(isCk){
    mk.style.cssText+=`width:${ms}px;height:${ms}px;margin-right:16px;flex:none;position:relative;`;
    mk.innerHTML=`<div class="a" style="left:${ms*0.08}px;top:${ms*0.5}px;width:${ms*0.42}px;height:${ms*0.16}px;transform:rotate(45deg)"></div>
      <div class="b" style="left:${ms*0.36}px;top:${ms*0.22}px;width:${ms*0.62}px;height:${ms*0.16}px;transform:rotate(-52deg)"></div>`;
  }else{
    mk.style.cssText+=`width:${ms}px;height:${ms}px;margin-right:16px;flex:none;position:relative;`;
    mk.innerHTML=`<div class="a" style="left:0;top:${ms*0.42}px;width:${ms}px;height:${ms*0.16}px;transform:rotate(45deg)"></div>
      <div class="b" style="left:0;top:${ms*0.42}px;width:${ms}px;height:${ms*0.16}px;transform:rotate(-45deg)"></div>`;
  }
  r.appendChild(mk);
  const e=document.createElement('div');
  e.className='pEx';
  e.style.cssText+=`font-size:${ORIENT==='portrait'?34:28}px;color:#FFFFFF;flex:1;`;
  e.textContent=ex;
  r.appendChild(e);
  const tg=document.createElement('div');
  tg.className='pName';
  tg.style.cssText+=`font-size:${ORIENT==='portrait'?19:17}px;color:${isCk?'#7CD6CB':'#F0A0A0'};`;
  tg.textContent=lb;
  r.appendChild(tg);
  panel4.appendChild(r);
  P4ROWS.push({el:r,t0});
});
const p4Note=document.createElement('div');
p4Note.className='pNote';
p4Note.style.cssText+=`height:${ORIENT==='portrait'?48:42}px;margin:6px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?21:18}px;`;
p4Note.textContent='TANPA PECAHAN, TANPA DESIMAL';
panel4.appendChild(p4Note);
propsEl.appendChild(panel4);

/* chip perbandingan di atas garis bilangan */
const cmpS=ORIENT==='portrait'?1:0.9;
function mkCmp(v){
  const c=document.createElement('div');
  c.className='cmpChip';
  const cw=Math.round(110*cmpS), chh=Math.round(74*cmpS);
  c.style.cssText+=`width:${cw}px;height:${chh}px;font-size:${Math.round(40*cmpS)}px;opacity:0;`;
  c.textContent=v;
  propsEl.appendChild(c);
  return c;
}
const cmp5=mkCmp('-5');
const cmp2=mkCmp('-2');
const trail=document.createElement('div');
trail.className='cmpTrail';
propsEl.appendChild(trail);

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
const carM=makeBall(['#FFF3C4','#FCD34D','#B45309'],Math.round(P.carH*0.48),true);
stage.appendChild(carM.el);
const msh=document.createElement('div');
msh.className='bsh';
msh.style.cssText+=`width:${P.ballD*0.8}px;height:15px;margin-left:${-P.ballD*0.4}px;top:-10px;`;
charsEl.appendChild(msh);
const spark=document.createElement('div');
spark.className='spark';
spark.style.cssText+=`position:absolute;`;
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

/* ---------- elemen teks mengambang: chip persamaan, tanda tanya, pil ---------- */
const eqchip=document.getElementById('eqchip');
eqchip.style.cssText+=`left:${P.eqX}px;top:${P.eqY}px;width:${P.eqW}px;height:${P.eqH}px;font-size:${P.eqFS}px;opacity:0;`;
const qchip=document.getElementById('qchip');
qchip.style.cssText+=`left:${P.qcX}px;top:${P.qcY}px;width:${P.qcW}px;height:${P.qcH}px;font-size:${P.eqFS}px;opacity:0;`;
const qm=document.getElementById('qm');
qm.style.cssText+=`left:${P.qmX}px;top:${P.qmY}px;font-size:${P.qmFS}px;opacity:0;`;
const pil=document.getElementById('pil');
pil.style.cssText+=`left:${P.pilX}px;top:${P.pilY}px;width:${P.pilW}px;height:${P.pilH}px;font-size:${P.pilFS}px;letter-spacing:.1em;`;

/* ---------- endcard penutup bersih (aturan 28) ---------- */
const endcard=document.getElementById('endcard');
endcard.style.cssText+=`top:${P.ecY}px;`;
const fUrl=document.getElementById('f_url');
fUrl.style.cssText+=`font-size:${ORIENT==='portrait'?92:80}px;
  background:linear-gradient(92deg,#2BB3A6 0%,#8A6FC6 52%,#E9B45C 100%);
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
  width:max-content;padding:9px 30px;background:rgba(10,16,28,.55);border-radius:999px;`;
