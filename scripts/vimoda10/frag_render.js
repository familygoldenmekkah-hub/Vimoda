/* ---------- narasi juanila: 16 beat soft selling (aturan 25) ---------- */
const SUBS=[
  [0.50,'Satu pizza dibagi untuk dua teman.','One pizza is shared by two friends.','#FFFFFF'],
  [3.00,'Masing-masing dapat setengah, ditulis satu per dua.','Each gets one half, written as one over two.','#FFFFFF'],
  [6.60,'Setengah termasuk bilangan rasional. Apa itu?','One half is a rational number. What is that?','#FFFFFF'],
  [9.90,'Rasional: bilangan yang bisa ditulis a per b.','Rational: a number that can be written as a over b.','#FFFFFF'],
  [13.20,'Asal a dan b bilangan bulat, dan b bukan nol.','As long as a and b are integers, and b is not zero.','#FFFFFF'],
  [16.50,'Bilangan bulat pun rasional: tujuh per satu.','Integers are rational too: seven over one.','#FBBF24'],
  [19.80,'Pembilang tiga, penyebut empat. Apa artinya?','Numerator three, denominator four. Meaning?','#FFFFFF'],
  [23.10,'Tiga bagian diambil dari empat bagian sama besar.','Three parts taken from four equal parts.','#FFFFFF'],
  [26.70,'Potongan kue: sama besar supaya pecahan tepat.','Equal slices make the fraction correct.','#FBBF24'],
  [30.10,'Rasional juga punya bentuk desimal, lho.','Rational numbers also have decimal forms.','#FFFFFF'],
  [33.10,'Setengah jadi 0,5. Seperempat jadi 0,25.','One half is 0,5. One quarter is 0,25.','#FFFFFF'],
  [36.10,'Tiga per empat 0,75. Sepertiga 0,3333, berulang.','Three quarters 0,75. One third 0,3333, repeating.','#FFFFFF'],
  [39.70,'Berhenti maupun berulang, keduanya rasional.','Terminating and repeating decimals are both rational.','#FBBF24'],
  [42.90,'Pi tidak: angkanya terus tanpa pola.','Pi is not: its digits never repeat a pattern.','#FBBF24'],
  [45.60,'Mana yang rasional? Tulis di komentar.','Which ones are rational? Write it below.','#FBBF24'],
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
  .map(([id,t0],i)=>({el:document.getElementById(id),t0:t0,i:i}));
TITLES.forEach((o)=>{
  o.el.style.top=(o.i===0?P.titleY:P.titleY+14)+'px';
  o.el.style.fontSize=(o.i===0?P.titleS0:(o.i===2?P.titleS2:P.titleSN))+'px';
  if(o.i===0||o.i===2||o.i===4)o.el.style.color='#B45309';
});

/* ---------- beat, masterplan mentor (lantai depan, tak menembus properti) ---------- */
const IMP=[0.6,3.6,6.6,16.5,17.3,20.2,32.7,36.4,44.3];
const SPARKS=[[3.6,5.2],[47.7,49.6]];
const GESTS=[
  [1.3,0.8,'nod',3],
  [7.8,0.7,'tilt',5],
  [11.0,0.7,'nod',3],
  [16.6,0.8,'nod',3],
  [19.5,0.7,'tilt',5],
  [22.8,0.7,'nod',3],
  [27.0,0.7,'nod',3],
  [33.5,0.7,'tilt',5],
  [37.0,0.8,'nod',3],
  [41.0,0.7,'tilt',4],
  [44.9,0.8,'nod',3]
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
  ? [[0.55,175],[6.6,705],[17.3,705],[20.2,230],[32.7,640],[40.6,705],[44.2,600]]
  : [[0.55,260],[6.6,1270],[17.3,1270],[20.2,320],[32.7,1200],[40.6,1270],[44.2,1100]];

/* ---------- RENDER PER FRAME ---------- */
const world=document.getElementById('world');
const flash=document.getElementById('flash');
const fade=document.getElementById('fade');
const tilesun=document.getElementById('tilesun');
let _roll=0,_mxPrev=null;
function renderFrame(t){
  /* kedai makin hangat menjelang penutup: nyala lampu lembut sejak 36.0 */
  const nk=seg(t,36.0,8.0);
  /* penutup bersih (aturan 28): kue, meja, piring, kartu, pil keluar di 49.8 */
  const exo=1-seg(t,49.8,0.5);
  tilesun.style.background=`rgba(58,38,26,${(nk*0.22).toFixed(3)})`;
  for(const p of PANS){
    const sw=Math.sin(t*0.9+p.ph)*2.2;
    p.body.style.transform=`rotate(${sw.toFixed(2)}deg)`;
  }
  /* hook: kue utuh muncul, garis pisau, dua piring, kue terbelah dua */
  const wholeIn=seg(t,0.9,0.5);
  const splitP=eio(seg(t,2.45,0.45));
  const wholeO=clamp(wholeIn*(1-seg(t,2.45,0.25))*(1-seg(t,2.45,0.25))+(t>=6.9?seg(t,6.9,0.4):0),0,1);
  pizzaEl.style.opacity=String(clamp(wholeO,0,1)*exo);
  pizzaEl.style.transform=`scale(${(1+0.06*Math.sin(clamp(seg(t,0.9,0.7),0,1)*Math.PI)*(1-seg(t,2.45,0.25))).toFixed(3)})`;
  pizzaEl.style.left=(P.pizzaCX-P.pizzaD/2)+'px';
  pizzaEl.style.top=(P.pizzaCY-P.pizzaD/2)+'px';
  const cvEl=pizzaEl.querySelector('.cutline');
  cvEl.style.opacity=clamp(Math.max(smz(t,1.5,2.45,0.3),smz(t,19.4,99,0.4)),0,1).toFixed(3);
  const chEl=pizzaEl.querySelector('.cutlineH');
  chEl.style.opacity=smz(t,19.4,99,0.4).toFixed(3);
  const WEDGES=pizzaEl.querySelectorAll('.wedge');
  const lit=seg(t,20.2,0.4);
  [[0,0],[1,0],[0,1]].forEach(([wx,wy],i)=>{
    WEDGES[i].style.background=`rgba(242,178,74,${(0.45*lit).toFixed(3)})`;
  });
  /* dua setengahan: dari kue ke piring */
  const d=P.pizzaD, sc=0.5;
  const t1x=[P.pizzaCX-d/2, P.plate1X-d*sc/2], t1y=[P.pizzaCY-d/2, P.plateY-d*sc/2-6];
  const t2x=[P.pizzaCX-d/2, P.plate2X-d*sc/2], t2y=[P.pizzaCY, P.plateY-d*sc/2-6];
  const hO=clamp(seg(t,2.45,0.25)*(1-seg(t,6.4,0.3)),0,1);
  HALFP[0].style.opacity=String(hO);
  HALFP[0].style.transform=`translate(${((t1x[1]-t1x[0])*splitP).toFixed(1)}px,${((t1y[1]-t1y[0])*splitP).toFixed(1)}px) scale(${lerp(1,sc,splitP).toFixed(3)})`;
  HALFP[1].style.opacity=String(hO);
  HALFP[1].style.transform=`translate(${((t2x[1]-t2x[0])*splitP).toFixed(1)}px,${((t2y[1]-t2y[0])*splitP).toFixed(1)}px) scale(${lerp(1,sc,splitP).toFixed(3)})`;
  for(const pl of PLATES){
    pl.el.style.opacity=clamp(seg(t,2.2,0.3)*(1-seg(t,6.4,0.3)),0,1).toFixed(3);
    pl.el.style.transform=`translateY(${((1-eio(seg(t,2.2,0.4)))*14).toFixed(1)}px)`;
  }
  popA(chipHalf,t,3.2,0.5,6,0,6.4);
  popA(stamp,t,3.6,0.55,7,0,6.4);
  /* panel 1: definisi a/b, syarat, contoh, twist bulat juga rasional */
  popA(panel1,t,7.0,0.6,5,0,17.0);
  for(const r of P1ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  for(const c of P1CHIPS){
    c.el.style.opacity=(clamp(seg(t,c.t0,0.35),0,1)*(1-seg(t,17.0,0.3))).toFixed(3);
  }
  p1Note.textContent = t>=16.5 ? 'BILANGAN BULAT JUGA RASIONAL' : 'RASIONAL BUKAN HANYA PECAHAN';
  popA(p1Note,t,10.8,0.5,5,0,17.0);
  /* panel 2: pembilang dan penyebut + kue dibagi empat */
  popA(panel2,t,21.8,0.55,5,0,32.5);
  for(const r of P2ROWS){ r.el.style.opacity=seg(t,r.t0,0.4).toFixed(3); }
  popA(p2Note,t,26.7,0.45,5,0,32.5);
  /* menu kapur: konversi desimal */
  popA(menuP,t,33.0,0.55,5,0,40.5);
  for(const r of MROWS){ r.el.style.opacity=seg(t,r.t0,0.4).toFixed(3); }
  popA(pillA,t,36.4,0.4,5,0,40.5);
  popA(pillB,t,37.2,0.4,5,0,40.5);
  /* panel 4: mana yang bukan rasional (pi) */
  popA(panel4,t,40.9,0.55,5,0,44.3);
  for(const r of P4ROWS){ r.el.style.opacity=seg(t,r.t0,0.4).toFixed(3); }
  popA(p4Note,t,42.8,0.45,5,0,44.3);
  /* kartu uji: lima bilangan dibalik satu per satu */
  for(const c of CARDS){
    const inA=seg(t,44.7,0.3);
    const fl=t>=c.flip;
    if(c.el.textContent!==(fl?c.val:'?'))c.el.textContent=fl?c.val:'?';
    const bounce=1+0.12*Math.sin(clamp(seg(t,c.flip,0.4),0,1)*Math.PI)*(fl?1:0);
    c.el.style.opacity=(inA*exo).toFixed(3);
    c.el.style.transform=`scale(${bounce.toFixed(3)})`;
    c.el.style.borderColor=fl&&t<c.flip+0.5?'#F2C230':'#C9BBA2';
  }
  popA(pil,t,47.7,0.6,6,0,49.8);
  tableEl.style.opacity=exo.toFixed(3);
  /* mentor: menggelinding antar stasiun di lantai kedai */
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
  let hy2=0, lrot=0, drot=0, txj=0;
  for(const [gs,gd,gt,ga] of GESTS){
    const d2=t-gs;
    if(d2>=0&&d2<gd){
      const p=d2/gd, w=Math.sin(p*Math.PI);
      if(gt==='tilt'||gt==='lean'){ lrot+=ga*w; }
      else if(gt==='nod'){ lrot+=ga*Math.sin(p*2*Math.PI); }
      else if(gt==='shiver'){ txj=ga*Math.sin(p*40)*(1-p); }
      else if(gt==='spin'){ drot+=ga*eio(p); }
    }
  }
  mentor.el.style.left=bx.toFixed(1)+'px';
  mentor.el.style.opacity=String(clamp(ep*3,0,1)*exo);
  mentor.el.style.top=(P.groundY-P.ballD+hy2).toFixed(1)+'px';
  mentor.el.style.transform=`translateX(${txj.toFixed(1)}px) rotate(${(_roll+lrot+drot).toFixed(2)}deg) scale(1)`;
  msh.style.left=bx.toFixed(1)+'px';
  msh.style.top=(P.groundY-10)+'px';
  msh.style.opacity=String(clamp(ep*3,0,1)*exo*clamp(0.42+hy2*0.006,0.18,0.5));
  msh.style.transform=`scaleX(${clamp((1+hy2*0.004),0.4,1.08).toFixed(3)})`;
  /* percikan bintang */
  let spo=0;
  for(const [sa,sb] of SPARKS){
    if(t>=sa&&t<sb) spo=smz(t,sa,sb,0.35)*(0.65+0.2*Math.sin(t*7));
  }
  spark.style.opacity=String(clamp(spo,0,1));
  spark.style.left=(bx+62).toFixed(1)+'px';
  spark.style.top=(P.groundY-150+Math.sin(t*2)*4).toFixed(1)+'px';
  spark.style.transform=`rotate(${((t*28)%360).toFixed(0)}deg) scale(${(0.8+0.15*Math.sin(t*7)).toFixed(3)})`;
  /* judul bab (judul terakhir ikut keluar saat penutup agar endcard sendirian) */
  for(let i=0;i<TITLES.length;i++){
    const o=TITLES[i];
    const tEnd=i+1<TITLES.length?TITLES[i+1].t0:50.2;
    const oin=seg(t,o.t0,0.35)*(1-seg(t,tEnd-0.25,0.3));
    const sc2=1+0.035*Math.sin(clamp(seg(t,o.t0,0.7),0,1)*Math.PI);
    o.el.style.opacity=oin.toFixed(3);
    o.el.style.transform=`scale(${sc2.toFixed(3)})`;
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
