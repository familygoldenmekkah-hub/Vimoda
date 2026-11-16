/* ---------- narasi huyuan: 16 beat soft selling (aturan 25) ---------- */
const SUBS=[
  [0.50,'Coba perhatikan angka angka ini.','Take a look at these numbers.','#FFFFFF'],
  [2.98,'Minus, nol, dan positif. Semuanya bilangan bulat.','Minus, zero, positive. All are integers.','#FFFFFF'],
  [6.60,'Bilangan bulat: negatif, nol, dan positif, tanpa pecahan.','Integers: negative, zero, positive, no fractions.','#FFFFFF'],
  [10.80,'Negatif menerus ke kiri, positif menerus ke kanan.','Negatives continue left, positives continue right.','#FFFFFF'],
  [14.50,'Dan nol bukan positif, juga bukan negatif.','And zero is not positive, nor negative.','#FBBF24'],
  [18.00,'Untuk apa tanda minus dibutuhkan?','Why do we need the minus sign?','#FFFFFF'],
  [20.40,'Suhu 4 derajat turun 9 derajat, menjadi minus 5.','From 4 degrees, falling 9 degrees makes minus 5.','#FFFFFF'],
  [24.00,'Di gedung, ruang bawah tanah ditulis minus 1 dan minus 2.','In a building, basements are written minus 1, minus 2.','#FFFFFF'],
  [28.20,'Minus artinya posisi di bawah titik acuan.','Minus means a position below the reference point.','#FBBF24'],
  [31.30,'Mana yang lebih besar, minus 2 atau minus 5?','Which one is bigger, minus 2 or minus 5?','#FFFFFF'],
  [34.00,'Minus 2. Posisinya lebih ke kanan di garis.','Minus 2. It sits further right on the line.','#FFFFFF'],
  [37.20,'Makin ke kanan makin besar, makin ke kiri makin kecil.','Further right is bigger, further left is smaller.','#FBBF24'],
  [41.20,'Pecahan dan desimal bukan bilangan bulat.','Fractions and decimals are not integers.','#FFFFFF'],
  [44.20,'Uji lift: dari lantai 2 turun 5 lantai.','Lift quiz: start at floor 2, go down 5 floors.','#FBBF24'],
  [47.10,'Berhenti di mana? Tulis di komentar.','Where does it stop? Write it below.','#FBBF24'],
  [50.07,'Terima kasih sudah menonton.','Thanks for watching.','#FFE9A8']
];
let subIdx=-1;
function renderSub(t){
  let i=0;
  for(let k=0;k<SUBS.length;k++){ if(t>=SUBS[k][0]-0.001) i=k; }
  const nxt=i+1<SUBS.length?SUBS[i+1][0]:52.4;
  const o=clamp(Math.min(seg(t,SUBS[i][0],0.25), 1-seg(t,nxt-0.14,0.14)),0,1);
  if(i!==subIdx){
    subIdx=i;
    subId.textContent=SUBS[i][1];
    subId.style.color=SUBS[i][3];
    subEn.textContent=SUBS[i][2];
  }
  subbar.style.opacity=(o*0.98).toFixed(3);
  const pop=1+0.018*Math.sin(clamp(seg(t,SUBS[i][0],0.45),0,1)*Math.PI);
  subbar.style.transform=`translateX(-50%) scale(${pop.toFixed(3)})`;
}

/* ---------- judul bab (rata tengah, aturan 28) ---------- */
const TITLES=[['t0',0.35],['t1',6.6],['t2',17.3],['t3',32.7],['t4',40.6],['t5',44.3]]
  .map(([id,t0])=>({el:document.getElementById(id),t0:t0}));
TITLES.forEach((o,i)=>{
  o.el.style.top=(i===0?P.titleY:P.titleY+14)+'px';
  o.el.style.fontSize=(i===0?P.titleS0:P.titleSN)+'px';
  if(i===0||i===2||i===4)o.el.style.color='#B45309';
});

/* ---------- beat, masterplan mentor (lantai depan, tak menembus properti) ---------- */
const IMP=[0.6,3.0,6.6,14.5,17.3,28.2,32.7,37.2,40.6,44.3];
const SPARKS=[[3.0,5.0],[47.5,49.6]];
const GESTS=[
  [1.3,0.8,'nod',3],
  [7.8,0.7,'tilt',5],
  [11.0,0.7,'nod',3],
  [14.6,0.8,'nod',3],
  [20.6,1.0,'shiver',5],
  [24.5,0.7,'nod',3],
  [28.3,0.8,'nod',3],
  [34.8,0.7,'tilt',5],
  [38.1,0.9,'nod',3],
  [42.7,0.7,'tilt',4]
];
function imp(t){
  let a=0;
  for(const bt of IMP){
    const d=t-bt;
    if(d>=0&&d<0.5){ const p=d/0.5; a=Math.max(a,(1-p)*0.85); }
  }
  return a;
}
const WAY = ORIENT==='portrait'
  ? [[0.55,200],[6.6,705],[17.3,800],[24.0,260],[32.7,560],[34.0,560],[37.2,880],[41.2,640],[44.2,215]]
  : [[0.55,290],[6.6,1270],[17.3,1350],[24.0,290],[32.7,760],[34.0,760],[37.2,1500],[41.2,1000],[44.2,290]];

/* ---------- RENDER PER FRAME ---------- */
const world=document.getElementById('world');
const flash=document.getElementById('flash');
const fade=document.getElementById('fade');
const skyN=document.getElementById('skynight');
const frostN=document.getElementById('frostnight');
let _roll=0,_mxPrev=null;
function renderFrame(t){
  /* malam bersalju: langit gelap, jendela kota menyala, lampu plafond hangat */
  const nk=seg(t,36.0,8.0);
  /* konten latihan keluar layar di 49.8 (aturan 28): shaft, termometer, acuan, mobil */
  const exo=1-seg(t,49.8,0.5);
  skyN.style.opacity=nk.toFixed(3);
  frostN.style.opacity=nk.toFixed(3);
  for(const w of CITYWIN){ w.el.style.opacity=(nk*(0.55+0.35*Math.sin(t*1.3+w.ph))).toFixed(3); }
  for(const l of LAMPS){ l.style.opacity=(0.25+nk*0.75).toFixed(3); }
  /* salju jatuh di balik kaca */
  for(const s of SNOW){
    const yy=P.snowZone[1]+((s.y0-P.snowZone[1]+t*s.sp)% (P.snowZone[3]-P.snowZone[1]));
    const xx=s.x+Math.sin(t*0.9+s.ph)*s.amp;
    s.el.style.transform=`translate(${xx.toFixed(1)}px,${yy.toFixed(1)}px)`;
    s.el.style.opacity=(0.35+0.3*Math.sin(t+s.ph)).toFixed(3);
  }
  /* chip hook: tujuh bilangan contoh */
  for(const c of CHIPS){
    const o=clamp(seg(t,c.t0,0.3)*(1-seg(t,6.4,0.35)),0,1);
    c.el.style.opacity=o.toFixed(3);
    const bob=Math.sin(t*1.6+c.ph)*5*(1-seg(t,6.4,0.35));
    const sc=1+0.07*Math.sin(clamp(seg(t,c.t0,0.6),0,1)*Math.PI)*(1-seg(t,6.4,0.35));
    c.el.style.transform=`translateY(${bob.toFixed(1)}px) scale(${sc.toFixed(3)})`;
  }
  popA(stamp,t,3.0,0.55,7,0,6.4);
  /* panel 1: tiga kelompok */
  popA(panel1,t,7.0,0.6,5,0,17.0);
  for(const r of P1ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  p1Note.textContent = t>=14.5 ? 'NOL BUKAN POSITIF, BUKAN NEGATIF' : 'NEGATIF KE KIRI, POSITIF KE KANAN';
  popA(p1Note,t,10.8,0.5,5,0,17.0);
  /* termometer: suhu 4 turun 9 menjadi minus 5 */
  popA(thermoEl,t,18.2,0.6,5,0,32.7);
  const tv=4-9*eio(seg(t,20.4,1.4));
  const my=tParts.yOf(tv);
  const mbY=tParts.tubeBot;
  tParts.merc.style.top=(my).toFixed(1)+'px';
  tParts.merc.style.height=Math.max(0,mbY-my).toFixed(1)+'px';
  tParts.frost.style.opacity=(tv<-0.2?smz(t,21.8,1.0,0.5)*(0.65+0.2*Math.sin(t*2.6)):0).toFixed(3);
  popA(eqchip,t,21.9,0.5,6,0,24.6);
  /* plak lantai menyala bergantian (+3, 0, -1, -2) saat narasi gedung */
  const GLOW_T={3:24.2,0:24.6,'-1':25.0,'-2':25.4,'-3':47.4};
  for(const pl of PLATES){
    const gt=GLOW_T[String(pl.f)];
    let g=0;
    if(gt>0){ const d=t-gt; if(d>=0&&d<1.4){ g=Math.max(0,Math.sin(Math.min(d/1.4,1)*Math.PI)); } }
    pl.el.style.boxShadow=g>0.02?`0 0 ${Math.round(16*g+6)}px rgba(242,178,74,${(0.75*g).toFixed(2)})`:'none';
    pl.el.style.borderColor=g>0.02?`rgba(242,178,74,${(0.5+0.5*g).toFixed(2)})`:'#44648C';
    pl.el.style.color=g>0.02?'#FFE9A8':'#BFD2E6';
  }
  /* mobil lift: demo 1 ke -1 (25.6), kembali 0 (29.5), uji: ke 2 (44.4) lalu turun ke -3 (45.9) */
  let cf=0;
  if(t>=25.6&&t<26.8) cf=lerp(0,-1,eio(seg(t,25.6,1.2)));
  else if(t>=26.8&&t<29.5) cf=-1;
  else if(t>=29.5&&t<30.3) cf=lerp(-1,0,eio(seg(t,29.5,0.8)));
  else if(t>=44.8&&t<45.3) cf=lerp(0,2,eio(seg(t,44.8,0.5)));
  else if(t>=45.3&&t<45.9) cf=2;
  else if(t>=45.9&&t<47.4) cf=lerp(2,-3,eio(seg(t,45.9,1.5)));
  else if(t>=47.4) cf=-3;
  const carY=carF2Y(cf);
  carEl.style.left=P.carX+'px';
  carEl.style.top=carY.toFixed(1)+'px';
  carEl.style.opacity=exo.toFixed(3);
  /* uji lift: mentor naik ke mobil 45.0-45.5, lalu ikut turun sampai penutup */
  popA(qchip,t,44.5,0.5,6,0,49.8);
  popA(qm,t,47.5,0.5,8,0,49.8);
  popA(pil,t,47.7,0.6,6,0,49.8);
  /* garis bilangan menyala dari kiri ke kanan */
  for(const tk of TICKS){
    const lo=seg(t,33.0+(tk.v+5)*0.08,0.3);
    const bright=(0.35+0.65*lo)*exo;
    tk.tk.style.opacity=bright.toFixed(3);
    tk.nm.style.opacity=bright.toFixed(3);
  }
  /* chip perbandingan: -5 diam, -2 meluncur ke kanan */
  const cy5=P.railY-Math.round(74*cmpS)-22;
  const x5=P.railC+(-5)*P.railSp, x2=P.railC+(-2)*P.railSp, x2b=P.railC+1*P.railSp;
  popA(cmp5,t,33.6,0.5,7,0,40.5);
  cmp5.style.left=(x5-Math.round(55*cmpS))+'px';
  cmp5.style.top=cy5+'px';
  const slide=eio(seg(t,34.6,1.0));
  const co=clamp(seg(t,33.9,0.3)*(1-seg(t,40.5,0.35)),0,1);
  cmp2.style.opacity=co.toFixed(3);
  cmp2.style.left=(lerp(x2,x2b,slide)-Math.round(55*cmpS))+'px';
  cmp2.style.top=cy5+'px';
  cmp2.style.transform=`scale(${(1+0.07*Math.sin(clamp(seg(t,33.9,0.6),0,1)*Math.PI)).toFixed(3)})`;
  trail.style.opacity=(slide>0&&slide<1?0.8:0).toFixed(3);
  trail.style.left=(x2-Math.round(55*cmpS)).toFixed(0)+'px';
  trail.style.top=(cy5+Math.round(20*cmpS))+'px';
  trail.style.width=Math.max(0,((x2b-x2)*slide)).toFixed(0)+'px';
  trail.style.height=Math.round(8*cmpS)+'px';
  popA(chainP,t,38.0,0.55,5,0,40.6);
  /* panel 4: anggota bulat vs bukan */
  popA(panel4,t,40.9,0.55,5,0,44.0);
  for(const r of P4ROWS){ r.el.style.opacity=seg(t,r.t0,0.4).toFixed(3); }
  popA(p4Note,t,42.6,0.45,5,0,44.0);
  /* shaft, garis acuan dan termometer ikut menutup scene latihan */
  shaftEl.style.opacity=exo.toFixed(3);
  acuanEl.style.opacity=exo.toFixed(3);
  /* mentor: menggelinding antar stasiun, naik lift saat uji */
  let bx=WAY[WAY.length-1][1];
  for(let k=0;k<WAY.length-1;k++){
    const [w0,x0]=WAY[k],[w1,x1]=WAY[k+1];
    if(t>=w0&&t<w1){ bx=lerp(x0,x1,eio(seg(t,w0,w1-w0))); break; }
  }
  if(t>=WAY[WAY.length-1][0])bx=WAY[WAY.length-1][1];
  if(_mxPrev===null)_mxPrev=bx;
  _roll+=(bx-_mxPrev)/(P.ballD/2)*(180/Math.PI);
  _mxPrev=bx;
  const ep=seg(t,0.6,0.55);
  let hy2=0, lrot=0, drot=0, txj=0, mys=1;
  for(const [gs,gd,gt,ga] of GESTS){
    const d2=t-gs;
    if(d2>=0&&d2<gd){
      const p=d2/gd, w=Math.sin(p*Math.PI);
      if(gt==='tilt'||gt==='lean'){ lrot+=ga*w; }
      else if(gt==='nod'){ lrot+=ga*Math.sin(p*2*Math.PI); }
      else if(gt==='shiver'){ txj=ga*Math.sin(p*40)*(1-p); }
      else if(gt==='spin'){ drot+=ga*eio(p); }
      else if(gt==='count'){ hy2-=ga*Math.abs(Math.sin(p*5*Math.PI))*(1-p*0.2); }
    }
  }
  const mFade=1-seg(t,44.3,0.35);
  let mx=bx, myv=P.groundY-P.ballD, onAir=0;
  const bsa=1;
  mentor.el.style.left=mx.toFixed(1)+'px';
  mentor.el.style.opacity=String(clamp(ep*3,0,1)*exo*mFade);
  mentor.el.style.top=(myv+hy2).toFixed(1)+'px';
  mentor.el.style.transform=`translateX(${txj.toFixed(1)}px) rotate(${(_roll+lrot+drot).toFixed(2)}deg) scale(${bsa.toFixed(3)})`;
  msh.style.left=mx.toFixed(1)+'px';
  msh.style.top=(P.groundY-10)+'px';
  msh.style.opacity=String(clamp(ep*3,0,1)*exo*mFade*clamp(0.42+hy2*0.006,0.18,0.5)*bsa);
  msh.style.transform=`scaleX(${clamp((1+hy2*0.004)*bsa,0.4,1.08).toFixed(3)})`;
  /* mentor di dalam lift: bola mini mengikuti mobil */
  const cmTop=carF2Y(cf)+P.carH*0.48-carM.d/2;
  carM.el.style.left=(P.carX+P.carW/2).toFixed(1)+'px';
  carM.el.style.top=cmTop.toFixed(1)+'px';
  carM.el.style.opacity=String(seg(t,44.45,0.35)*exo);
  carM.el.style.transform=`rotate(${(_roll*0.25).toFixed(2)}deg)`;
  /* percikan bintang */
  let spo=0;
  for(const [sa,sb] of SPARKS){
    if(t>=sa&&t<sb) spo=smz(t,sa,sb,0.35)*(0.65+0.2*Math.sin(t*7));
  }
  spark.style.opacity=String(clamp(spo,0,1));
  const spx=t>=44.45?P.carX+P.carW/2+62:mx+62;
  const spy=t>=44.45?cmTop:(P.groundY-150)+Math.sin(t*2)*4;
  spark.style.left=spx.toFixed(1)+'px';
  spark.style.top=spy.toFixed(1)+'px';
  spark.style.transform=`rotate(${((t*28)%360).toFixed(0)}deg) scale(${(0.8+0.15*Math.sin(t*7)).toFixed(3)})`;
  /* judul bab (judul terakhir ikut keluar saat penutup agar endcard sendirian) */
  for(let i=0;i<TITLES.length;i++){
    const o=TITLES[i];
    const tEnd=i+1<TITLES.length?TITLES[i+1].t0:50.2;
    const oin=seg(t,o.t0,0.35)*(1-seg(t,tEnd-0.25,0.3));
    const sc=1+0.035*Math.sin(clamp(seg(t,o.t0,0.7),0,1)*Math.PI);
    o.el.style.opacity=oin.toFixed(3);
    o.el.style.transform=`scale(${sc.toFixed(3)})`;
  }
  /* endcard penutup bersih: AKIOMIDA.COM muncul SENDIRIAN di layar yang tenang */
  const eci=eio(seg(t,50.2,0.7));
  endcard.style.opacity=eci.toFixed(3);
  endcard.style.transform=`translateY(${((1-eci)*16).toFixed(1)}px) scale(${(0.94+0.06*eci).toFixed(3)})`;
  fBar.style.width=(seg(t,50.9,0.5)*P.barW).toFixed(0)+'px';
  renderSub(t);
  /* kamera tenang */
  const im=imp(t);
  const shx=Math.sin(t*47)*2.5*im, shy=Math.sin(t*39+1.7)*1.8*im;
  world.style.transform=`translate(${shx.toFixed(2)}px,${(shy+Math.sin(t*0.35)*3).toFixed(2)}px)`;
  flash.style.opacity=(im*0.07).toFixed(3);
  fade.style.opacity=String(clamp(1-seg(t,0.05,0.5),0,1)*0.96+clamp(seg(t,51.4,0.6),0,1));
}
renderFrame(0);
window.__ready=true;
</script>
</body>
</html>
