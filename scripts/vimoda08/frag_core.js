const Q=new URLSearchParams(location.search);
const ORIENT=Q.get('o')||'landscape';
const W=ORIENT==='portrait'?1080:1920;
const H=ORIENT==='portrait'?1920:1080;

/* v08 revisi 2 "Bulina" - DUNIA BARU: RUMAH BULINA (ruang bermain hangat):
   dinding krem berwainscot, lantai papan kayu, karpet hijau teal, jendela dengan
   langit siang ke senja, rak berisi toples kelereng + balok angka 1 2 3 + pot
   tanaman, bendera bunting, lampu tidur, debu cahaya. Latar episode ini sengaja
   BERBEDA TOTAL dari episode lain (aturan 26): bukan lagi kota.
   Karakter: HANYA bola emas mentor, bulat sejati, tanpa mata (aturan 23).
   Copy soft selling tanpa kalimat intimidasi (aturan 25); subjudul di zona aman
   sosmed dan dijaga maksimal dua baris (aturan 27); watermark AKIOMIDA selalu
   terlihat di tepi paling bawah tanpa menutupi konten (aturan 24). */
const P = ORIENT==='portrait' ? {
  floorY:1032, bbY:1016, wainY:760, wainH:256,
  rugX:170, rugY:1042, rugW:740, rugH:140,
  groundY:1120,
  winX:36, winY:460, winW:300, winH:340,
  shelfX:690, shelfY:280, shelfW:330,
  jarX:705, jarY:184, jarW:76, jarH:96,
  plantX:800, plantY:246, plantW:44,
  blkS:52, blkX:[848,906,964], blkY:228,
  bunY0:90, bunX0:120, bunX1:960, bunSag:40, bunN:9,
  frY:480, frH:190, frW:160, frX:[360,532,704,876], tagY:678, tagH:30,
  basketX:700, basketY:840, basketW:230, basketH:150,
  stY:620, stW:150, stH:84, stFS:15, stX:[380,560],
  chartX:370, chartY:430, chartW:660, chartH:300, chHd:44, chRow:70, chName:28, chList:26, chNoteH:54, chNoteFS:21,
  easX:100, easBrdY:820, easBrdW:240, easBrdH:150, easFoot:1000, chT:52, chL:15,
  lampX:930, lampY:690, lampH:342,
  marX0:640, marY:1050, marD:40, marGap:10,
  qmX:820, qmY:995, qmFS:76,
  titleY:300, titleS0:104, titleSN:82,
  ctaX:80, ctaY:430, ctaW:920, ctaH:540, ctaOff:[64,124,196], ctaPillB:44,
  openFS:36, openEFS:16, urlFS:92,
  pillW:430, pillH:74, pillFS:32,
  ecY:830, barW:420,
  subTop:1170, subId:40, subEn:22, subMax:880,
  ballD:110, wmY:1800, wmFS:20,
  dustZone:[520,320,1000,880]
} : {
  floorY:508, bbY:492, wainY:380, wainH:112,
  rugX:600, rugY:518, rugW:720, rugH:115,
  groundY:660,
  winX:40, winY:120, winW:280, winH:210,
  shelfX:1380, shelfY:150, shelfW:400,
  jarX:1400, jarY:74, jarW:60, jarH:76,
  plantX:1480, plantY:112, plantW:36,
  blkS:46, blkX:[1540,1592,1644], blkY:104,
  bunY0:28, bunX0:300, bunX1:1620, bunSag:26, bunN:7,
  frY:340, frH:170, frW:340, frX:[380,760,1140,1520], tagY:518, tagH:26,
  basketX:1080, basketY:480, basketW:260, basketH:125,
  stY:300, stW:130, stH:76, stFS:13, stX:[200,1440],
  chartX:570, chartY:240, chartW:780, chartH:220, chHd:34, chRow:46, chName:22, chList:20, chNoteH:38, chNoteFS:16,
  easX:140, easBrdY:470, easBrdW:260, easBrdH:140, easFoot:610, chT:46, chL:14,
  lampX:1750, lampY:380, lampH:128,
  marX0:1030, marY:585, marD:36, marGap:8,
  qmX:1220, qmY:505, qmFS:58,
  titleY:150, titleS0:88, titleSN:72,
  ctaX:530, ctaY:240, ctaW:860, ctaH:320, ctaOff:[40,90,130], ctaPillB:30,
  openFS:30, openEFS:14, urlFS:80,
  pillW:400, pillH:66, pillFS:28,
  ecY:400, barW:520,
  subTop:740, subId:38, subEn:20, subMax:1360,
  ballD:96, wmY:1010, wmFS:18,
  dustZone:[900,180,1700,480]
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

/* ---------- ruangan: dinding, wainscot, papan kayu, karpet ---------- */
const wall=document.getElementById('wall');
const wainscot=document.getElementById('wainscot');
wainscot.style.cssText+=`top:${P.wainY}px;height:${P.wainH}px;`;
const bbEl=document.getElementById('baseboard');
bbEl.style.cssText+=`top:${P.bbY}px;height:${P.floorY-P.bbY}px;`;
const floorEl=document.getElementById('floorplank');
floorEl.style.cssText+=`top:${P.floorY}px;height:${H-P.floorY}px;`;
const rug=document.getElementById('rug');
rug.style.cssText+=`left:${P.rugX}px;top:${P.rugY}px;width:${P.rugW}px;height:${P.rugH}px;`;

/* ---------- jendela dengan langit siang ke senja ---------- */
const winEl=document.getElementById('winframe');
const winDusks=[];
{
  const {winX:wx,winY:wy,winW:ww,winH:wh}=P;
  const fr=14;
  const parts=[
    [0,0,ww,fr],[0,wh-fr,ww,fr],[0,0,fr,wh],[ww-fr,0,fr,wh],
    [ww/2-fr/2,fr,fr,wh-2*fr],[fr,wh/2-fr/2,ww-2*fr,fr]
  ];
  parts.forEach(([px,py,pw,ph])=>{
    const f=document.createElement('div');
    f.className='wf';
    f.style.cssText+=`left:${wx+px}px;top:${wy+py}px;width:${pw}px;height:${ph}px;`;
    winEl.appendChild(f);
  });
  const panes=[[fr,fr,ww/2-fr*1.5,wh/2-fr*1.5],[ww/2+fr/2,fr,ww/2-fr*1.5,wh/2-fr*1.5],
               [fr,wh/2+fr/2,ww/2-fr*1.5,wh/2-fr*1.5],[ww/2+fr/2,wh/2+fr/2,ww/2-fr*1.5,wh/2-fr*1.5]];
  panes.forEach(([px,py,pw,ph],i)=>{
    const p=document.createElement('div');
    p.className='pane';
    p.style.cssText+=`left:${wx+px}px;top:${wy+py}px;width:${pw}px;height:${ph}px;`;
    const dk=document.createElement('div');
    dk.className='dusk';
    p.appendChild(dk);
    winDusks.push(dk);
    if(i===0){
      const puff=document.createElement('div');
      puff.className='puff';
      puff.style.cssText+=`left:${pw*0.2}px;top:${ph*0.45}px;width:${pw*0.5}px;height:${ph*0.32}px;`;
      p.appendChild(puff);
      const puff2=document.createElement('div');
      puff2.className='puff';
      puff2.style.cssText+=`left:${pw*0.42}px;top:${ph*0.22}px;width:${pw*0.36}px;height:${ph*0.26}px;`;
      p.appendChild(puff2);
    }
    winEl.appendChild(p);
  });
  const sill=document.createElement('div');
  sill.className='sill';
  sill.style.cssText+=`left:${wx-14}px;top:${wy+wh}px;width:${ww+28}px;height:${Math.round(fr*1.05)}px;`;
  winEl.appendChild(sill);
}

/* ---------- rak: toples kelereng, pot tanaman, balok angka 1 2 3 ---------- */
const shelfEl=document.getElementById('shelf');
{
  const sb=document.createElement('div');
  sb.className='shelfb';
  sb.style.cssText+=`left:${P.shelfX}px;top:${P.shelfY}px;width:${P.shelfW}px;height:${Math.round(P.blkS*0.3)}px;`;
  shelfEl.appendChild(sb);
  /* toples kelereng */
  const jar=document.createElement('div');
  jar.className='jarglass';
  jar.style.cssText+=`left:${P.jarX}px;top:${P.jarY}px;width:${P.jarW}px;height:${P.jarH}px;`;
  const cols=['#E15B5B','#5B8FE1','#4FA35C','#F2C230','#A78BFA','#38BDF8','#F472B6','#FBBF24'];
  cols.forEach((c,i)=>{
    const d=document.createElement('div');
    d.className='mdot';
    const r=Math.round(P.jarW*0.16);
    const cx=P.jarW*(0.22+(i%4)*0.19), cy=P.jarH*(i<4?0.62:0.34);
    d.style.cssText+=`left:${cx-r/2}px;top:${cy-r/2}px;width:${r}px;height:${r}px;background:${c};`;
    jar.appendChild(d);
  });
  shelfEl.appendChild(jar);
  const lid=document.createElement('div');
  lid.className='jarlid';
  lid.style.cssText+=`left:${P.jarX-4}px;top:${P.jarY-10}px;width:${P.jarW+8}px;height:${Math.round(P.jarH*0.16)}px;`;
  shelfEl.appendChild(lid);
  /* pot tanaman kecil */
  const pot=document.createElement('div');
  pot.className='plantpot';
  pot.style.cssText+=`left:${P.plantX}px;top:${P.plantY}px;width:${P.plantW}px;height:${Math.round(P.plantW*0.8)}px;`;
  shelfEl.appendChild(pot);
  [[0.1,-0.5,0],[0.55,-0.7,40],[0.3,-0.95,-20]].forEach(([fx,fy,rot])=>{
    const lf=document.createElement('div');
    lf.className='plantleaf';
    const lw=Math.round(P.plantW*0.62);
    lf.style.cssText+=`left:${P.plantX+P.plantW*fx}px;top:${P.plantY+P.plantW*fy}px;width:${lw}px;height:${Math.round(lw*0.72)}px;transform:rotate(${rot}deg);`;
    shelfEl.appendChild(lf);
  });
}
/* balok angka 1 2 3 (hook) - pop bergantian */
const BLOCKS=['1','2','3'].map((g,i)=>{
  const b=document.createElement('div');
  b.className='block3';
  b.style.cssText+=`left:${P.blkX[i]}px;top:${P.blkY}px;width:${P.blkS}px;height:${P.blkS}px;opacity:0;`;
  const num=document.createElement('b');
  num.style.fontSize=Math.round(P.blkS*0.62)+'px';
  num.textContent=g;
  b.appendChild(num);
  shelfEl.appendChild(b);
  return {el:b,t0:0.9+i*0.22};
});

/* ---------- bendera bunting melengkung ---------- */
const bunEl=document.getElementById('bunting');
const FLAGS=[];
{
  const rope=document.createElement('div');
  rope.style.cssText+=`position:absolute;left:${P.bunX0-30}px;top:${P.bunY0-8}px;width:${P.bunX1-P.bunX0+60}px;height:${P.bunSag*2+18}px;
    border-top:4px solid #8B5A2B;border-radius:50%;opacity:.85;`;
  bunEl.appendChild(rope);
  const cols=['#E15B5B','#4FA35C','#F2C230','#3E8E8C','#8A6FC6'];
  for(let i=0;i<P.bunN;i++){
    const f=document.createElement('div');
    f.className='flag';
    const px=lerp(P.bunX0,P.bunX1,i/(P.bunN-1));
    const py=P.bunY0+Math.sin(Math.PI*i/(P.bunN-1))*P.bunSag;
    f.style.cssText+=`left:${px-14}px;top:${py}px;border-top-color:${cols[i%cols.length]};`;
    bunEl.appendChild(f);
    FLAGS.push({el:f,ph:i*0.7});
  }
}

/* ---------- empat bingkai gambar di dinding (bab ASLI) ---------- */
const FRAMES=[];
{
  const defs=[
    {x:P.frX[0],t0:6.9,kind:'books',tag:'3 BUKU'},
    {x:P.frX[1],t0:8.85,kind:'students',tag:'5 SISWA'},
    {x:P.frX[2],t0:10.35,kind:'apples',tag:'12 APEL'},
    {x:P.frX[3],t0:10.45,kind:'endless',tag:'TANPA BATAS'}
  ];
  defs.forEach(d=>{
    const f=document.createElement('div');
    f.className='wallframe';
    f.style.cssText+=`left:${d.x}px;top:${P.frY}px;width:${P.frW}px;height:${P.frH}px;opacity:0;`;
    const paper=document.createElement('div');
    paper.className='paper';
    f.appendChild(paper);
    const tape=document.createElement('div');
    tape.className='tapeS';
    tape.style.cssText+=`left:${P.frW/2-34}px;top:-12px;width:68px;height:22px;`;
    f.appendChild(tape);
    const tag=document.createElement('div');
    tag.className='stickyN';
    tag.style.cssText+=`left:${d.x+P.frW/2-75}px;top:${P.tagY}px;width:150px;height:${P.tagH}px;
      font-size:${ORIENT==='portrait'?17:14}px;opacity:0;`;
    tag.textContent=d.tag;
    document.getElementById('frames').appendChild(f);
    document.getElementById('frames').appendChild(tag);
    FRAMES.push({win:f,tag,tag0:d.t0+0.25,t0:d.t0,kind:d.kind});
  });
  const [bw,bh]=[P.frW,P.frH];
  const draw=(fr,fn)=>fn(fr.win.querySelector('.paper'));
  /* buku: tiga buku bertumpuk */
  draw(FRAMES[0],(pp)=>{
    ['#E15B5B','#5B8FE1','#4FA35C'].forEach((c,i)=>{
      const b=document.createElement('div');
      b.style.cssText=`position:absolute;left:${bw*0.30-(i%2)*7}px;top:${bh*0.30+i*20}px;width:${bw*0.42-(i%2)*6}px;height:16px;
        border-radius:3px;background:${c};box-shadow:inset 0 -4px 0 rgba(0,0,0,.2);`;
      pp.appendChild(b);
    });
  });
  /* siswa: lima sosok kecil */
  draw(FRAMES[1],(pp)=>{
    ['#5B8FE1','#A78BFA','#4FA35C','#F2C230','#E15B5B'].forEach((c,i)=>{
      const px=bw*(0.12+i*0.155);
      const hd=document.createElement('div');
      hd.style.cssText=`position:absolute;left:${px}px;top:${bh*0.22}px;width:${bw*0.09}px;height:${bw*0.09}px;border-radius:50%;background:${c};`;
      pp.appendChild(hd);
      const bd=document.createElement('div');
      bd.style.cssText=`position:absolute;left:${px-bw*0.008}px;top:${bh*0.22+bw*0.11}px;width:${bw*0.106}px;height:${bh*0.24}px;
        border-radius:${bw*0.05}px;background:${c};opacity:.85;`;
      pp.appendChild(bd);
    });
  });
  /* apel: dua baris dua belas apel di atas keranjang mini */
  draw(FRAMES[2],(pp)=>{
    for(let r=0;r<2;r++)for(let j=0;j<6;j++){
      const a=document.createElement('div');
      a.style.cssText=`position:absolute;left:${bw*(0.10+j*0.135)}px;top:${bh*(0.14+r*0.17)}px;width:${bw*0.1}px;height:${bw*0.1}px;
        border-radius:50%;background:radial-gradient(circle at 35% 30%,#F08A7A 0%,#D3452F 70%,#A82A1A 100%);`;
      pp.appendChild(a);
    }
    const bk=document.createElement('div');
    bk.style.cssText=`position:absolute;left:${bw*0.2}px;top:${bh*0.50}px;width:${bw*0.6}px;height:${bh*0.26}px;
      border-radius:0 0 40px 40px;background:linear-gradient(180deg,#C98F55,#B87F4A);box-shadow:inset 0 -6px 0 rgba(0,0,0,.2);`;
    pp.appendChild(bk);
  });
  /* tanpa batas: 1 2 3 4 5 ... */
  draw(FRAMES[3],(pp)=>{
    const num=document.createElement('div');
    num.className='mono';
    num.style.cssText=`position:absolute;left:0;top:${bh*0.30}px;width:100%;text-align:center;font-weight:800;
      color:#5A3A12;font-size:${Math.round(bw*0.15)}px;`;
    num.textContent='1 2 3 4 5';
    pp.appendChild(num);
    const dots=document.createElement('div');
    dots.className='mono';
    dots.style.cssText=`position:absolute;left:0;top:${bh*0.56}px;width:100%;text-align:center;font-weight:800;
      color:#D69A3E;font-size:${Math.round(bw*0.2)}px;`;
    dots.textContent='...';
    pp.appendChild(dots);
  });
}

/* ---------- keranjang anyaman kosong + sticky notes (bab NOL) ---------- */
const basket=document.createElement('div');
basket.className='basketW';
basket.style.cssText+=`left:${P.basketX}px;top:${P.basketY}px;width:${P.basketW}px;height:${P.basketH}px;opacity:0;`;
{
  const hd=document.createElement('div');
  hd.className='hd';
  hd.style.cssText+=`left:${P.basketW*0.25}px;top:0;width:${P.basketW*0.5}px;height:${P.basketH*0.42}px;border-width:${Math.round(P.basketW*0.05)}px;`;
  basket.appendChild(hd);
  const rim=document.createElement('div');
  rim.className='rim';
  rim.style.cssText+=`left:0;top:${P.basketH*0.40}px;width:100%;height:${Math.round(P.basketH*0.14)}px;`;
  basket.appendChild(rim);
  const bd=document.createElement('div');
  bd.className='bd';
  bd.style.cssText+=`left:${P.basketW*0.06}px;top:${P.basketH*0.48}px;width:${P.basketW*0.88}px;height:${P.basketH*0.4}px;`;
  basket.appendChild(bd);
  const tag=document.createElement('div');
  tag.className='stickyN';
  tag.style.cssText+=`left:${P.basketW/2-40}px;top:${P.basketH*0.52}px;width:80px;height:${Math.round(P.basketH*0.3)}px;
    font-size:${ORIENT==='portrait'?22:19}px;background:linear-gradient(180deg,#F2C230,#E9B45C);`;
  tag.textContent='0';
  basket.appendChild(tag);
}
document.getElementById('props').appendChild(basket);
const STICKS=[['0 PESAN BARU',-3],['0 PESERTA',2.5]].map(([txt,rot],i)=>{
  const s=document.createElement('div');
  s.className='stickyN';
  s.style.cssText+=`left:${P.stX[i]}px;top:${P.stY}px;width:${P.stW}px;height:${P.stH}px;
    font-size:${P.stFS}px;transform:rotate(${rot}deg);opacity:0;`;
  s.textContent=txt;
  document.getElementById('props').appendChild(s);
  return {el:s,t0:23.47};
});

/* ---------- chart kertas di dinding (bab CACAH) ---------- */
const chart=document.createElement('div');
chart.className='chartP';
chart.style.cssText+=`left:${P.chartX}px;top:${P.chartY}px;width:${P.chartW}px;height:${P.chartH}px;opacity:0;`;
const chHd=document.createElement('div');
chHd.className='chartHd';
chHd.style.cssText+=`font-size:${P.chHd}px;`;
chHd.textContent='ASLI vs CACAH';
chart.appendChild(chHd);
const CH_ROWS=[];
[['ASLI','1 2 3 4 5 ...','#38BDF8',26.3],['CACAH','0 1 2 3 4 5 ...','#A78BFA',27.4]].forEach(([name,ex,col,t0])=>{
  const r=document.createElement('div');
  r.className='chartRow';
  r.style.cssText+=`height:${P.chRow}px;`;
  const dot=document.createElement('div');
  dot.style.cssText+=`width:${Math.round(P.chName*0.6)}px;height:${Math.round(P.chName*0.6)}px;border-radius:50%;
    background:${col};margin-right:14px;flex:none;`;
  r.appendChild(dot);
  const nm=document.createElement('div');
  nm.style.cssText+=`font-weight:800;color:#1B2437;font-size:${P.chName}px;flex:1;`;
  nm.textContent=name;
  r.appendChild(nm);
  const exs=document.createElement('div');
  exs.className='mono';
  exs.style.cssText+=`font-weight:800;color:#42526B;font-size:${P.chList}px;`;
  exs.textContent=ex;
  r.appendChild(exs);
  chart.appendChild(r);
  CH_ROWS.push({el:r,t0});
});
const chNote=document.createElement('div');
chNote.className='chartNote';
chNote.style.cssText+=`height:${P.chNoteH}px;margin-top:6px;font-size:${P.chNoteFS}px;opacity:0;`;
chNote.textContent='SEMUA ASLI ADA DI CACAH';
chart.appendChild(chNote);
/* selotip di dua sudut atas */
[[14,-10,-6],[P.chartW-64,-10,5]].forEach(([tx,ty,rot])=>{
  const tp=document.createElement('div');
  tp.className='tapeS';
  tp.style.cssText+=`left:${tx}px;top:${ty}px;width:50px;height:20px;transform:rotate(${rot}deg);`;
  chart.appendChild(tp);
});
document.getElementById('props').appendChild(chart);

/* ---------- papan kapur di kaki easel (bab PERAN NOL) ---------- */
const easel=document.createElement('div');
easel.className='easel';
easel.style.cssText+=`left:${P.easX}px;top:${P.easBrdY}px;width:${P.easBrdW+40}px;height:${P.easFoot-P.easBrdY}px;opacity:0;`;
{
  const bw=P.easBrdW, bh=P.easBrdH;
  const brd=document.createElement('div');
  brd.className='brd';
  brd.style.cssText+=`left:20px;top:0;width:${bw}px;height:${bh}px;`;
  const chT=document.createElement('div');
  chT.className='chalkT';
  chT.style.cssText+=`position:absolute;left:${20+(bw-bw*0.3)/2}px;top:${bh*0.16}px;width:${bw*0.3}px;text-align:center;
    font-size:${P.chT}px;`;
  chT.textContent='10';
  brd.appendChild(chT);
  const chL=document.createElement('div');
  chL.className='chalkL';
  chL.style.cssText+=`position:absolute;left:${20+10}px;top:${bh*0.62}px;width:${bw-20}px;text-align:center;
    font-size:${P.chL}px;letter-spacing:.04em;`;
  chL.textContent='1 PULUHAN + 0 SATUAN';
  brd.appendChild(chL);
  easel.appendChild(brd);
  const tray=document.createElement('div');
  tray.className='tray';
  tray.style.cssText+=`left:14px;top:${bh+10}px;width:${bw+32}px;`;
  easel.appendChild(tray);
  [[-6,8],[bw+30,-8]].forEach(([lx,skw])=>{
    const leg=document.createElement('div');
    leg.className='leg';
    leg.style.cssText+=`left:${lx}px;top:${bh*0.3}px;height:${P.easFoot-P.easBrdY-bh*0.3}px;transform:skewX(${skw}deg);`;
    easel.appendChild(leg);
  });
}
document.getElementById('props').appendChild(easel);

/* ---------- lampu tidur ---------- */
const lamp=document.createElement('div');
lamp.className='lampf';
lamp.style.cssText+=`left:${P.lampX}px;top:${P.lampY}px;width:${ORIENT==='portrait'?130:110}px;height:${P.lampH}px;`;
const lampGlow=document.createElement('div');
lampGlow.className='glow2';
lamp.appendChild(lampGlow);
document.getElementById('props').appendChild(lamp);

/* ---------- kelereng latihan di lantai depan + tanda tanya ---------- */
const mbox=document.createElement('div');
const MARBLES=[];
['#E15B5B','#5B8FE1','#4FA35C','#F2C230','#A78BFA','#38BDF8','#F472B6','#FBBF24'].forEach((col,i)=>{
  const m=document.createElement('div');
  m.className='marble';
  m.style.cssText+=`left:${P.marX0+i*(P.marD+P.marGap)}px;top:${P.marY}px;width:${P.marD}px;height:${P.marD}px;
    background:radial-gradient(circle at 33% 27%, ${col} 0%, ${col} 55%, rgba(0,0,0,.35) 130%);opacity:0;`;
  mbox.appendChild(m);
  MARBLES.push({el:m});
});
const qmark=document.createElement('div');
qmark.className='qmark';
qmark.style.cssText+=`left:${P.qmX}px;top:${P.qmY}px;font-size:${P.qmFS}px;opacity:0;`;
qmark.textContent='?';
mbox.appendChild(qmark);
stage.appendChild(mbox);

/* ---------- debu cahaya (senja) ---------- */
const dustEl=document.getElementById('dust');
const DUST=[];
for(let i=0;i<10;i++){
  const f=document.createElement('div');
  f.className='dustp';
  const sz=(rnd()*5+3).toFixed(1);
  f.style.cssText+=`width:${sz}px;height:${sz}px;`;
  dustEl.appendChild(f);
  DUST.push({el:f,x:lerp(P.dustZone[0],P.dustZone[2],rnd()),y:lerp(P.dustZone[1],P.dustZone[3],rnd()),
    sp:rnd()*1.2+0.4,ph:rnd()*6.28,amp:rnd()*16+6});
}

/* ---------- papan CTA (poster dengan selotip) + subjudul + wm ---------- */
const cta=document.getElementById('cta');
cta.style.cssText+=`left:${P.ctaX}px;top:${P.ctaY}px;width:${P.ctaW}px;height:${P.ctaH}px;`;
[[16,-10,-7],[P.ctaW-66,-10,6]].forEach(([tx,ty,rot])=>{
  const tp=document.createElement('div');
  tp.className='tapeC';
  tp.style.cssText+=`left:${tx}px;top:${ty}px;width:50px;height:20px;transform:rotate(${rot}deg);`;
  cta.appendChild(tp);
});
const fOpen=document.getElementById('f_open');
fOpen.style.cssText+=`position:absolute;left:40px;right:40px;top:${P.ctaOff[0]}px;font-size:${P.openFS}px;
  font-weight:800;color:#FFFFFF;text-align:center;`;
const fOpenE=document.getElementById('f_open_e');
fOpenE.style.cssText+=`position:absolute;left:40px;right:40px;top:${P.ctaOff[1]}px;font-size:${P.openEFS}px;
  color:#B9C7DC;font-weight:600;text-align:center;`;
/* ---------- endcard penutup bersih (aturan 28): AKIOMIDA.COM sendirian,
   muncul SETELAH papan latihan keluar layar ---------- */
const endcard=document.getElementById('endcard');
endcard.style.cssText+=`top:${P.ecY}px;`;
const fUrl=document.getElementById('f_url');
fUrl.style.cssText+=`font-size:${P.urlFS}px;
  background:linear-gradient(92deg,#2BB3A6 0%,#8A6FC6 52%,#E9B45C 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;`;
const fBar=document.getElementById('f_bar');
fBar.style.cssText+=`display:block;margin:16px auto 0;width:0;`;
const fPill=document.getElementById('f_pill');
fPill.style.cssText+=`left:${Math.round((P.ctaW-P.pillW)/2)}px;bottom:${P.ctaPillB}px;width:${P.pillW}px;height:${P.pillH}px;
  font-size:${P.pillFS}px;letter-spacing:.1em;`;

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
spark.className='starclip';
spark.style.cssText+=`position:absolute;width:34px;height:34px;opacity:0;`;
charsEl.appendChild(spark);

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
  width:max-content;padding:9px 30px;background:rgba(24,18,10,.46);border-radius:999px;`;
