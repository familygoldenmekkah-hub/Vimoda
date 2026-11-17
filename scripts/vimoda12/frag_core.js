const Q=new URLSearchParams(location.search);
const ORIENT=Q.get('o')||'landscape';
const W=ORIENT==='portrait'?1080:1920;
const H=ORIENT==='portrait'?1920:1080;

/* v12 "Realino" - DUNIA BARU: BENGKEL TAPALI, workshop pengukur kayu maple
   terang: dinding panel maple berstrip, PENGgaris RAKSASA di dinding yang
   menjadi garis bilangan (tick dan angka -4 sampai 5, sapuan sorotan emas
   di bab garis bilangan), meja kerja dengan proyek papan berlabel ukur
   1,25 m dan segitiga siku oranye, pegboard perforasi dengan alat gantung,
   lampu dome putih, lantai beton hangat dengan marka safety kuning.
   Panel konten plum gelap berbingkai kuning safety. Kartu uji berupa kartu
   nilai yang dianotasi ke garis bilangan mini dengan garis penghubung -
   beda dari kartu grid episode 11 (aturan 26: latar berbeda total).
   Karakter: HANYA bola emas mentor, bulat sejati, tanpa mata (aturan 23).
   Subjudul zona aman dua baris (aturan 27); watermark AKIOMIDA di tepi
   paling bawah (aturan 24); penutup bersih (aturan 28). */
const P = ORIENT==='portrait' ? {
  floorY:1080, bbY:1064, ceilH:110,
  tableX:50, tableW:330, slabY:830, slabH:52, legBot:1080,
  bdW:300, bdH:96, bdCX:215, bdCY:778,
  rulerX:40, rulerY:424, rulerW:1000, rulerH:46, rulFS:14,
  stampX:470, stampY:690, stampW:480, stampH:60, stampFS:26,
  panelX:400, panelY:470, panelW:610, panelH:360,
  pilX:305, pilY:758, pilW:470, pilH:68, pilFS:28,
  ecY:830, barW:420,
  titleY:300, titleS0:80, titleSN:74,
  subTop:1170, subId:40, subEn:22, subMax:880,
  ballD:110, groundY:1120, wmY:1800, wmFS:20,
  lampsX:[340,700], lampsY:[168,150], lampsD:[74,62],
  markX:220, markY:1096, markW:640, markH:16,
  pegX:830, pegY:870, pegW:180, pegH:140,
  cardW:76, cardH:52, cardFS:20
} : {
  floorY:508, bbY:494, ceilH:70,
  tableX:140, tableW:360, slabY:540, slabH:40, legBot:700,
  bdW:340, bdH:82, bdCX:320, bdCY:494,
  rulerX:140, rulerY:262, rulerW:600, rulerH:34, rulFS:12,
  stampX:960, stampY:440, stampW:560, stampH:56, stampFS:24,
  panelX:760, panelY:250, panelW:1020, panelH:290,
  pilX:760, pilY:600, pilW:430, pilH:65, pilFS:26,
  ecY:400, barW:520,
  titleY:150, titleS0:88, titleSN:72,
  subTop:740, subId:38, subEn:20, subMax:1360,
  ballD:96, groundY:660, wmY:1010, wmFS:18,
  lampsX:[560,1000], lampsY:[112,100], lampsD:[62,52],
  markX:620, markY:672, markW:680, markH:14,
  pegX:1450, pegY:560, pegW:220, pegH:130,
  cardW:96, cardH:60, cardFS:24
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
let _seed=20261119;
const rnd=()=>{_seed|=0;_seed=_seed+0x6D2B79F5|0;let z=Math.imul(_seed^_seed>>>15,1|_seed);
  z=z+Math.imul(z^z>>>7,61|z)^z;return((z^z>>>14)>>>0)/4294967296;};

/* ---------- dinding maple, plafon, lampu dome, lantai beton ---------- */
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
/* marka safety kuning di lantai beton */
const markEl=document.getElementById('marker');
markEl.style.cssText+=`left:${P.markX}px;top:${P.markY}px;width:${P.markW}px;height:${P.markH}px;`;

/* ---------- PENGgaris raksasa: garis bilangan di dinding ---------- */
const rulerEl=document.getElementById('ruler');
const ruler={hl:null};
{
  const body=rulerEl.querySelector('.body');
  body.style.cssText+=`left:${P.rulerX}px;top:${P.rulerY}px;width:${P.rulerW}px;height:${P.rulerH}px;`;
  const axY=P.rulerY+Math.round(P.rulerH*0.72);
  const axis=rulerEl.querySelector('.axis');
  axis.style.cssText+=`left:${P.rulerX+18}px;top:${axY}px;width:${P.rulerW-36}px;height:3px;`;
  /* skala -4 sampai 5 */
  for(let v=-4;v<=5;v++){
    const fx=P.rulerX+18+(v+4)/(9)*(P.rulerW-36);
    const tk=document.createElement('div');
    tk.className='tick';
    tk.style.cssText+=`left:${fx-1.5}px;top:${axY-10}px;width:3px;height:10px;`;
    rulerEl.appendChild(tk);
    const nm=document.createElement('div');
    nm.className='num';
    nm.style.cssText+=`left:${fx-9}px;top:${P.rulerY+5}px;font-size:${P.rulFS}px;width:18px;text-align:center;`;
    nm.textContent=v;
    rulerEl.appendChild(nm);
  }
  for(let v=-3.5;v<=4.5;v+=1){
    const fx=P.rulerX+18+(v+4)/(9)*(P.rulerW-36);
    const tk=document.createElement('div');
    tk.className='tick';
    tk.style.cssText+=`left:${fx-1}px;top:${axY-5}px;width:2px;height:5px;opacity:.6;`;
    rulerEl.appendChild(tk);
  }
  const hl=document.createElement('div');
  hl.className='hl';
  hl.style.cssText+=`left:${P.rulerX+18}px;top:${axY-4}px;width:0;height:11px;`;
  rulerEl.appendChild(hl);
  ruler.hl=hl;
}

/* ---------- meja kerja dan proyek papan 1,25 m ---------- */
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
  tri.style.cssText+=`left:${bwx+P.bdW*0.78}px;top:${bwy+P.bdH*0.30}px;`;
  for(let i=0;i<3;i++){
    const pl=document.createElement('div');
    pl.className='pline';
    pl.style.cssText+=`left:${bwx+P.bdW*0.12}px;top:${bwy+P.bdH*(0.24+i*0.22)}px;width:${P.bdW*(0.44+i*0.08)}px;height:2px;`;
    boardEl.appendChild(pl);
    if(i<2){
      const lb=document.createElement('div');
      lb.className='plab';
      lb.style.cssText+=`left:${bwx+P.bdW*0.10}px;top:${bwy+P.bdH*(0.22+i*0.42)-6}px;font-size:${ORIENT==='portrait'?15:13}px;`;
      lb.textContent=i===0?'1,25 m':'7,8 m';
      boardEl.appendChild(lb);
    }
  }
}

/* ---------- pegboard alat gantung ---------- */
const pegEl=document.getElementById('pegboard');
{
  const board=pegEl.querySelector('.board');
  board.style.cssText+=`left:${P.pegX}px;top:${P.pegY}px;width:${P.pegW}px;height:${P.pegH}px;`;
  /* gergaji */
  const saw=document.createElement('div');
  saw.className='tool';
  const blade=document.createElement('div');
  blade.className='metal';
  blade.style.cssText+=`left:${P.pegX+20}px;top:${P.pegY+30}px;width:${Math.round(P.pegW*0.42)}px;height:10px;transform:rotate(-12deg);`;
  const hnd=document.createElement('div');
  hnd.className='wood';
  hnd.style.cssText+=`left:${P.pegX+20+Math.round(P.pegW*0.42)}px;top:${P.pegY+22}px;width:14px;height:26px;border-radius:4px;`;
  pegEl.appendChild(blade);
  pegEl.appendChild(hnd);
  /* palu */
  const hd2=document.createElement('div');
  hd2.className='metal';
  hd2.style.cssText+=`left:${P.pegX+P.pegW/2-6}px;top:${P.pegY+24}px;width:30px;height:12px;border-radius:3px;`;
  const hd3=document.createElement('div');
  hd3.className='wood';
  hd3.style.cssText+=`left:${P.pegX+P.pegW/2-3}px;top:${P.pegY+34}px;width:8px;height:34px;border-radius:3px;`;
  pegEl.appendChild(hd2);
  pegEl.appendChild(hd3);
  /* jangka sorong */
  const cal=document.createElement('div');
  cal.className='metal';
  cal.style.cssText+=`left:${P.pegX+P.pegW-56}px;top:${P.pegY+26}px;width:10px;height:44px;border-radius:3px;`;
  const jaw=document.createElement('div');
  jaw.className='metal';
  jaw.style.cssText+=`left:${P.pegX+P.pegW-56}px;top:${P.pegY+26}px;width:30px;height:8px;`;
  pegEl.appendChild(cal);
  pegEl.appendChild(jaw);
}

/* ---------- panel-panel konten (satu ide per layar) ---------- */
const propsEl=document.getElementById('props');
const P1ROWS=[], P1CHIPS=[], P4ROWS=[];
/* stempel hook */
const stamp=document.createElement('div');
stamp.className='stamp';
stamp.style.cssText+=`left:${P.stampX}px;top:${P.stampY}px;width:${P.stampW}px;height:${P.stampH}px;font-size:${P.stampFS}px;opacity:0;`;
stamp.textContent='SEMUA BILANGAN REAL';
propsEl.appendChild(stamp);
/* chip hook: enam bilangan berbeda bentuk */
const HOOKVALS=['5','-3','½','0,75','√2','π'];
const HOOK=HOOKVALS.map((v,i)=>{
  const c=document.createElement('div');
  c.className='chipA';
  const cw=ORIENT==='portrait'?88:104;
  const total=6*cw+5*12;
  const x0=P.panelX+Math.round(P.panelW/2-total/2)+i*(cw+12);
  c.style.cssText+=`position:absolute;left:${x0}px;top:${ORIENT==='portrait'?548:310}px;width:${cw}px;height:${ORIENT==='portrait'?88:76}px;font-size:${ORIENT==='portrait'?27:25}px;`;
  c.textContent=v;
  propsEl.appendChild(c);
  return {el:c,t0:1.0+i*0.28};
});

/* panel 1: definisi bilangan real */
const panel1=document.createElement('div');
panel1.className='panelI';
panel1.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p1Hd=document.createElement('div');
p1Hd.className='pHd';
p1Hd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p1Hd.textContent='BILANGAN REAL';
panel1.appendChild(p1Hd);
const p1Big=document.createElement('div');
p1Big.className='pBig';
p1Big.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;height:${Math.round(P.panelH*0.14)}px;display:flex;align-items:center;justify-content:center;`;
p1Big.textContent='RASIONAL + IRASIONAL';
panel1.appendChild(p1Big);
[['MENCakup RASIONAL DAN IRASIONAL',7.8],['DARI BULAT SAMPAI DESIMAL TAK BERULANG',8.8]].forEach(([tx,t0])=>{
  const r=document.createElement('div');
  r.className='pRow';
  r.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
  const dot=document.createElement('div');
  dot.className='pDot';
  dot.style.cssText+=`width:${ORIENT==='portrait'?18:15}px;height:${ORIENT==='portrait'?18:15}px;background:#D97A2E;margin-right:12px;`;
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
p1Chips.style.cssText+=`display:flex;align-items:center;justify-content:center;height:${Math.round(P.panelH*0.18)}px;gap:${ORIENT==='portrait'?9:12}px;`;
['8','-12','0','¾','2,5','√3','π'].forEach((v,i)=>{
  const c=document.createElement('div');
  c.className='chipA';
  c.style.cssText+=`width:${ORIENT==='portrait'?64:78}px;height:${ORIENT==='portrait'?44:40}px;font-size:${ORIENT==='portrait'?18:16}px;`;
  c.textContent=v;
  p1Chips.appendChild(c);
  P1CHIPS.push({el:c,t0:9.8+i*0.13});
});
panel1.appendChild(p1Chips);
const p1Note=document.createElement('div');
p1Note.className='pNote';
p1Note.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?19:17}px;`;
p1Note.textContent='BANYAK DITEMUI SEHARI-HARI';
panel1.appendChild(p1Note);
propsEl.appendChild(panel1);

/* panel 2: dua kelompok besar, tidak saling tumpang tindih */
const panel2=document.createElement('div');
panel2.className='panelI';
panel2.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p2Hd=document.createElement('div');
p2Hd.className='pHd';
p2Hd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p2Hd.textContent='DUA KELOMPOK';
panel2.appendChild(p2Hd);
const p2Cols=document.createElement('div');
p2Cols.style.cssText+=`display:flex;gap:16px;height:${Math.round(P.panelH*0.56)}px;padding:6px ${Math.round(P.panelW*0.05)}px 0;position:relative;`;
const KCOLS=[];
[['RASIONAL','#4CAF7A','#8ED4A8','BISA DITULIS a/b, b TIDAK 0',['½','¾','-5','0,25','0,3333...'],17.8,19.0],
 ['IRASIONAL','#D97A2E','#E8A46E','TIDAK BISA DITULIS a/b',['√2','√3','π'],21.9,22.8]].forEach(([nm,col,bd,def,chips,t0,tc0],ci)=>{
  const colDiv=document.createElement('div');
  colDiv.className='kcol';
  colDiv.style.cssText+=`position:relative;flex:1;border-color:${bd};`;
  const kh=document.createElement('div');
  kh.className='kh';
  kh.style.cssText+=`color:${col};font-size:${ORIENT==='portrait'?20:18}px;padding-top:6px;`;
  kh.textContent=nm;
  colDiv.appendChild(kh);
  const kd=document.createElement('div');
  kd.className='kd';
  kd.style.cssText+=`font-size:${ORIENT==='portrait'?15:14}px;padding:4px 6px 0;`;
  kd.textContent=def;
  colDiv.appendChild(kd);
  const cw=document.createElement('div');
  cw.className='cwrap';
  cw.style.cssText+=`padding:8px 4px 0;`;
  const kr=[];
  chips.forEach((v,i)=>{
    const c=document.createElement('div');
    c.className='chipA';
    const wide=v.length>4;
    c.style.cssText+=`width:${wide?94:50}px;height:${ORIENT==='portrait'?34:30}px;font-size:${ORIENT==='portrait'?14:13}px;`;
    c.textContent=v;
    cw.appendChild(c);
    kr.push({el:c,t0:tc0+i*0.14});
  });
  colDiv.appendChild(cw);
  p2Cols.appendChild(colDiv);
  KCOLS.push({col:colDiv,t0,chips:kr});
});
/* garis pembatas tengah: verdict tidak saling tumpang tindih */
const divider=document.createElement('div');
divider.id='divider';
divider.style.cssText+=`position:absolute;left:50%;top:${Math.round(P.panelH*0.14)}px;width:3px;height:${Math.round(P.panelH*0.4)}px;margin-left:-1px;`;
p2Cols.style.position='relative';
p2Cols.appendChild(divider);
panel2.appendChild(p2Cols);
const p2Note=document.createElement('div');
p2Note.className='pNote';
p2Note.style.cssText+=`height:${ORIENT==='portrait'?40:34}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?19:17}px;`;
p2Note.textContent='TIDAK SALING TUMPANG TINDIH';
panel2.appendChild(p2Note);
propsEl.appendChild(panel2);

/* panel 3: garis bilangan real dengan enam titik berlabel */
const panel3=document.createElement('div');
panel3.className='panelI';
panel3.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p3Hd=document.createElement('div');
p3Hd.className='pHd';
p3Hd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p3Hd.textContent='GARIS BILANGAN';
panel3.appendChild(p3Hd);
const numline=document.createElement('div');
numline.className='numline';
numline.style.cssText+=`position:relative;left:${Math.round(P.panelW*0.05)}px;top:${ORIENT==='portrait'?18:10}px;width:${Math.round(P.panelW*0.9)}px;height:${ORIENT==='portrait'?170:130}px;`;
{
  const lw=Math.round(P.panelW*0.9);
  const barY=ORIENT==='portrait'?96:74;
  const bar=document.createElement('div');
  bar.className='bar';
  bar.style.cssText+=`left:0;top:${barY}px;width:${lw}px;height:4px;`;
  numline.appendChild(bar);
  for(let v=-3;v<=4;v++){
    const fx=(v+3)/7*lw;
    const tk=document.createElement('div');
    tk.className='tickm';
    tk.style.cssText+=`left:${fx-1}px;top:${barY+5}px;width:2px;height:7px;`;
    numline.appendChild(tk);
    const nm=document.createElement('div');
    nm.className='lab';
    nm.style.cssText+=`left:${fx-10}px;top:${barY+14}px;font-size:${ORIENT==='portrait'?12:11}px;width:20px;text-align:center;`;
    nm.textContent=v;
    numline.appendChild(nm);
  }
  /* enam titik bahan: -2, 0, 3, 1/2, akar 2, pi */
  const PTS=[['-2',-2,33.4],['0',0,34.2],['3',3,35.0],['½',0.5,35.8],['√2',1.414,36.6],['π',3.142,37.4]];
  window.__PTS=PTS.map(([lab,v,t0])=>{
    const fx=(v+3)/7*lw;
    const dot=document.createElement('div');
    dot.className='dot';
    const dd=ORIENT==='portrait'?16:14;
    dot.style.cssText+=`left:${fx-dd/2}px;top:${barY-dd/2+2}px;width:${dd}px;height:${dd}px;`;
    numline.appendChild(dot);
    const lb=document.createElement('div');
    lb.className='lab';
    lb.style.cssText+=`left:${fx-16}px;top:${barY-30}px;font-size:${ORIENT==='portrait'?16:14}px;width:32px;text-align:center;`;
    lb.textContent=lab;
    numline.appendChild(lb);
    return {dot,lb,t0};
  });
}
panel3.appendChild(numline);
const p3Note=document.createElement('div');
p3Note.className='pNote';
p3Note.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;margin:${ORIENT==='portrait'?14:8}px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?19:17}px;`;
p3Note.textContent='NILAI TETAP BISA DITENTUKAN';
panel3.appendChild(p3Note);
propsEl.appendChild(panel3);

/* panel 4: kenapa penting - nilai pengukuran kontinu */
const panel4=document.createElement('div');
panel4.className='panelI';
panel4.style.cssText+=`left:${P.panelX}px;top:${P.panelY}px;width:${P.panelW}px;height:${P.panelH}px;opacity:0;`;
const p4Hd=document.createElement('div');
p4Hd.className='pHd';
p4Hd.style.cssText+=`font-size:${ORIENT==='portrait'?24:22}px;padding-top:${Math.round(P.panelH*0.04)}px;`;
p4Hd.textContent='KENAPA PENTING?';
panel4.appendChild(p4Hd);
[['PANJANG MEJA: 1,25 M',41.4],['SUHU: -2,5 °C',41.8],['JARAK PERJALANAN: 7,8 KM',42.2],['LUAS LINGKARAN: PI',42.6]].forEach(([tx,t0])=>{
  const r=document.createElement('div');
  r.className='vrow';
  r.style.cssText+=`height:${ORIENT==='portrait'?42:36}px;padding-left:${Math.round(P.panelW*0.08)}px;opacity:0;`;
  const d=document.createElement('div');
  d.className='vd';
  d.style.cssText+=`width:${ORIENT==='portrait'?16:14}px;height:${ORIENT==='portrait'?16:14}px;background:#D97A2E;margin-right:12px;`;
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
p4Note.style.cssText+=`height:${ORIENT==='portrait'?40:34}px;margin:4px ${Math.round(P.panelW*0.07)}px 0;font-size:${ORIENT==='portrait'?19:17}px;`;
p4Note.textContent='TIDAK SELALU BILANGAN BULAT';
panel4.appendChild(p4Note);
propsEl.appendChild(panel4);

/* kartu uji: enam bilangan dianotasi ke garis bilangan mini */
const UJI=[['-8',-8],['⅗',0.6],['√7',2.646],['0',0],['π',3.142],['4,25',4.25]];
const ux=(v)=>{ const zoneL=P.panelX+Math.round(P.panelW*0.03), zoneW=Math.round(P.panelW*0.94);
  return zoneL+(v+9)/15*zoneW; };
const lineY=ORIENT==='portrait'?740:470;
const lineDiv=document.createElement('div');
lineDiv.className='numline';
lineDiv.style.cssText+=`position:absolute;left:${P.panelX+Math.round(P.panelW*0.03)}px;top:${lineY}px;width:${Math.round(P.panelW*0.94)}px;height:0;`;
{
  const bar=document.createElement('div');
  bar.className='bar';
  bar.style.cssText+=`left:0;top:-2px;width:100%;height:4px;`;
  lineDiv.appendChild(bar);
  for(let v=-9;v<=6;v++){
    const fx=(v+9)/15*P.panelW*0.94;
    const tk=document.createElement('div');
    tk.className='tickm';
    tk.style.cssText+=`left:${fx-1}px;top:4px;width:2px;height:8px;`;
    lineDiv.appendChild(tk);
    if(v%3===0){
      const nm=document.createElement('div');
      nm.className='lab';
      nm.style.cssText+=`left:${fx-10}px;top:14px;font-size:${ORIENT==='portrait'?12:12}px;width:20px;text-align:center;opacity:.9;`;
      nm.textContent=v;
      lineDiv.appendChild(nm);
    }
  }
  const UJIPT=UJI.map(([lab,v])=>({lab,v,fx:(v+9)/15*P.panelW*0.94}));
  window.__UJIPT=UJIPT;
}
propsEl.appendChild(lineDiv);
/* kartu anotasi dua tingkat + garis penghubung ke titik di garis */
const CARDPOS = ORIENT==='portrait'
  ? {'-8':[470,540],'⅗':[710,540],'√7':[845,540],'0':[655,620],'π':[925,620],'4,25':[785,620]}
  : {'-8':[880,300],'⅗':[1330,300],'√7':[1620,300],'0':[1300,368],'π':[1660,368],'4,25':[1500,368]};
const CARDS=UJI.map(([lab,v],i)=>{
  const c=document.createElement('div');
  c.className='valCard';
  const [cx,cy]=CARDPOS[lab];
  c.style.cssText+=`left:${cx-Math.round(P.cardW/2)}px;top:${cy}px;width:${P.cardW}px;height:${P.cardH}px;font-size:${P.cardFS}px;opacity:0;`;
  c.textContent='?';
  propsEl.appendChild(c);
  const pt=window.__UJIPT.find(p=>p.lab===lab);
  const lead=document.createElement('div');
  lead.className='lead';
  const x1=cx, y1=cy+P.cardH, x2=P.panelX+Math.round(P.panelW*0.03)+pt.fx, y2=lineY;
  const len=Math.max(Math.hypot(x2-x1,y2-y1),1);
  const ang=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
  lead.style.cssText+=`left:${x1}px;top:${y1}px;width:${len}px;height:2px;transform:rotate(${ang.toFixed(1)}deg);transform-origin:0 0;`;
  propsEl.appendChild(lead);
  const dotm=document.createElement('div');
  dotm.className='dot';
  const dd=ORIENT==='portrait'?14:14;
  dotm.style.cssText+=`left:${x2-dd/2}px;top:${lineY+2-dd/2}px;width:${dd}px;height:${dd}px;opacity:0;`;
  propsEl.appendChild(dotm);
  return {el:c,lead,dotm,lab,v,fx:pt.fx,pop:44.7+i*0.15,flip:44.9+i*0.42,ph:i*0.8};
});
/* tag pengingat di atas kartu */
const tagUji=document.createElement('div');
tagUji.className='pNote';
tagUji.style.cssText+=`position:absolute;left:${P.panelX+Math.round(P.panelW*0.2)}px;top:${ORIENT==='portrait'?478:256}px;
  width:${Math.round(P.panelW*0.6)}px;height:${ORIENT==='portrait'?44:34}px;font-size:${ORIENT==='portrait'?19:17}px;opacity:0;`;
tagUji.textContent='REAL, LALU R ATAU I?';
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
