/* ---------- narasi (16 beat, tetap sama - dunianya yang berganti) ---------- */
const SUBS=[
  [0.50,'Bilangan itu cuma 1, 2, 3?','Is counting only 1, 2, 3?','#FFFFFF'],
  [2.98,'Padahal, matematika tidak sesempit itu.','Math is not that narrow.','#FFFFFF'],
  [6.52,'Punya 5 buku, suhu 5 derajat di bawah nol.','Five books, or 5 degrees below zero.','#FFFFFF'],
  [10.31,'Pizza dibagi dua, lingkaran dengan pi.','Half a pizza, or a circle with pi.','#FFFFFF'],
  [13.76,'Semuanya butuh jenis bilangan berbeda.','Each one needs a different kind.','#FBBF24'],
  [17.21,'Kenal lima kelompok bilangan.','Meet the five number groups.','#FFFFFF'],
  [19.93,'Rasional: bisa ditulis sebagai pecahan.','Rationals: writable as fractions.','#FFFFFF'],
  [23.47,'Irasional: akar 2 dan pi.','Irrationals: root 2 and pi.','#FBBF24'],
  [25.86,'Kalau 1, 2, 3 cukup, kenapa perlu lainnya?','If 1, 2, 3 suffice, why more?','#FFFFFF'],
  [29.65,'Karena persoalan tidak selalu sama.','Because problems are not the same.','#FBBF24'],
  [32.86,'Matematika tumbuh mencari cara yang tepat.','Math grows by finding the right tools.','#FFFFFF'],
  [36.65,'Cara bebas, hasil tetap menurut aturan.','Free method, but results follow rules.','#FFFFFF'],
  [40.19,'Jadi, cukup satu jenis bilangan untuk semua?','So, is one kind enough for all?','#FFFFFF'],
  [44.14,'Pilih satu, atau tiap persoalan beda?','One for all, or different tools?','#FFFFFF'],
  [47.52,'Tulis alasanmu di komentar.','Write your reason in the comments.','#FBBF24'],
  [50.07,'Jangan cuma menebak.','Do not just guess.','#FFFFFF']
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

/* ---------- judul bab ---------- */
const TITLES=[['t0',0.35],['t1',6.6],['t2',17.0],['t3',25.9],['t4',32.9],['t5',40.2]]
  .map(([id,t0])=>({el:document.getElementById(id),t0:t0}));
TITLES.forEach((o,i)=>{
  o.el.style.top=(i===0?P.titleY:P.titleY+14)+'px';
  o.el.style.fontSize=(i===0?P.titleS0:P.titleSN)+'px';
  if(i===0||i===2||i===4)o.el.style.color='#FFE9A8';
});

/* ---------- beat, masterplan mentor ---------- */
const IMP=[0.6,6.6,17.0,25.9,32.9,40.2,13.76,23.47,29.65,44.14,49.0];
const SPARKS=[[39.3,40.2],[47.5,51.2]];
const SPLIT=[[10.4,11.35],[38.6,39.8]];
const GESTS=[
  [1.3,0.8,'nod',3],
  [4.9,0.7,'shiver',5],
  [7.0,1.7,'count',18],
  [8.9,0.6,'shiver',4],
  [18.5,0.8,'nod',3],
  [23.5,1.3,'spin',720],
  [26.4,0.8,'nod',3],
  [33.2,0.9,'nod',3],
  [44.3,0.7,'tilt',5],
  [47.6,0.8,'lean',4],
  [49.0,0.85,'jump',34]
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
  ? [[0.55,120],[2.4,430],[6.6,430],[6.9,170],[8.8,410],[10.0,410],[10.05,650],[11.4,650],[12.2,860],[14.0,860],[15.2,540],[51.9,540]]
  : [[0.55,210],[2.4,760],[6.6,760],[6.9,300],[8.8,730],[10.0,730],[10.05,1160],[11.4,1160],[12.2,1530],[14.0,1530],[15.2,960],[51.9,960]];

/* mobil: tiga lewat di jalan (di belakang trotoar, tak pernah bertemu bola) */
const PASSES=[[2.6,4.4,1,0],[9.2,11.2,-1,1],[14.6,16.4,1,0]];

/* ---------- RENDER PER FRAME ---------- */
const world=document.getElementById('world');
const flash=document.getElementById('flash');
const fade=document.getElementById('fade');
const skydusk=document.getElementById('skydusk');
let _roll=0,_mxPrev=null;
function renderFrame(t){
  const dk=seg(t,34.0,9.0);
  skydusk.style.opacity=dk.toFixed(3);
  /* bintang */
  for(const s of ST){
    s.el.style.opacity=(dk*(0.35+0.5*(0.5+0.5*Math.sin(t*s.sp+s.ph)))).toFixed(3);
  }
  /* awan drift */
  for(const c of CL){
    c.x+=c.sp*(1/30);
    if(c.x>W+c.w)c.x=-c.w-40;
    c.el.style.transform=`translateX(${c.x.toFixed(1)}px)`;
    c.el.style.opacity=(0.92*(1-dk*0.8)).toFixed(3);
  }
  /* kota & plaza: satu ide per layar */
  const plazaK=seg(t,16.6,0.6)*(1-seg(t,32.5,0.6))+seg(t,40.0,0.6);
  const pk=clamp(plazaK,0,1);
  plaza.style.opacity=(pk*0.9).toFixed(3);
  const townDim=1-0.62*pk;
  townEl.style.opacity=townDim.toFixed(3);
  TREES.forEach(tr=>{ tr.el.style.opacity=(1-0.5*pk).toFixed(3);
    tr.el.style.transform=`rotate(${(Math.sin(t*0.9+tr.ph)*1.2).toFixed(2)}deg)`; });
  /* lampu jalan menyala saat senja */
  LAMPS.forEach(l=>{
    l.glow.style.opacity=(dk*(0.55+0.2*Math.sin(t*2+l.ph))).toFixed(3);
  });
  /* jendela menyala hangat saat senja */
  if(WINS.length){
    const warm=dk*0.85;
    const r=Math.round(lerp(57,255,warm)), g=Math.round(lerp(80,217,warm)), b=Math.round(lerp(107,138,warm));
    const col=`rgb(${r},${g},${b})`;
    for(const w of WINS){ w.style.background=col; }
  }
  /* mobil lewat */
  for(const [p0,p1,dir,ci] of PASSES){
    const c=CARS[ci];
    const p=seg(t,p0,p1-p0);
    const on=t>=p0&&t<=p1?1:0;
    c.el.style.opacity=on;
    if(on){
      const x=dir>0?lerp(-c.w-60,W+60,p):lerp(W+60,-c.w-60,p);
      c.el.style.transform=`translateX(${x.toFixed(1)}px)`;
    }
  }
  /* plak 1 2 3 + tanda tanya (hook) */
  for(const p of PLQ){ popA(p.el,t,p.t0,0.5,8,0,6.5); }
  popA(hQ,t,4.9,0.7,9,0,6.5);

  /* jendela kedai (pasangan 1 pergi 10.15, pasangan 2 pergi 14.0) */
  const pOut=1-seg(t,10.15,0.3), pOut2=1-seg(t,14.0,0.3);
  SHOPS.forEach((s,i)=>{
    const o=seg(t,s.t0,0.45)*(i<2?pOut:pOut2);
    s.win.style.opacity=o.toFixed(3);
    s.win.style.transform=`translateY(${((1-eio(seg(t,s.t0,0.45)))*26).toFixed(1)}px)`;
    s.awn.style.opacity=o.toFixed(3);
    s.chip.style.opacity=(seg(t,s.t0+0.25,0.35)*(i<2?pOut:pOut2)).toFixed(3);
  });

  /* papan tulis kafe (S4) */
  popA(slate,t,36.7,0.6,6,0,40.15);

  /* ubin kelima kelompok (S2) & daftar keluarga (S3) */
  for(const tl of TILES){ popA(tl.el,t,tl.t0,0.5,7,0,25.7); }
  popA(famEl,t,25.9,0.55,5,0,33.0);
  for(const r of FAM_ROWS){
    r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3);
  }

  /* mentor: menggelinding di trotoar antar stasiun (tidak menembus apa pun) */
  let bx=WAY[WAY.length-1][1];
  for(let k=0;k<WAY.length-1;k++){
    const [w0,x0]=WAY[k],[w1,x1]=WAY[k+1];
    if(t>=w0&&t<w1){ bx=lerp(x0,x1,eio(seg(t,w0,w1-w0))); break; }
  }
  if(t>=WAY[WAY.length-1][0])bx=WAY[WAY.length-1][1];
  if(_mxPrev===null)_mxPrev=bx;
  _roll+=(bx-_mxPrev)/(P.ballD/2)*(180/Math.PI);
  _mxPrev=bx;
  const ep=seg(t,0.6,0.55), ef=eoe(ep);
  let hy2=0, lrot=0, drot=0, txj=0;
  for(const [gs,gd,gt,ga] of GESTS){
    const d2=t-gs;
    if(d2>=0&&d2<gd){
      const p=d2/gd, w=Math.sin(p*Math.PI);
      if(gt==='tilt'||gt==='lean'){ lrot+=ga*w; }
      else if(gt==='nod'){ lrot+=ga*Math.sin(p*2*Math.PI); }
      else if(gt==='spin'){ drot+=ga*eio(p); }
      else if(gt==='count'){ hy2-=ga*Math.abs(Math.sin(p*5*Math.PI))*(1-p*0.2); }
      else if(gt==='shiver'){ txj=ga*Math.sin(p*40)*(1-p); }
      else if(gt==='jump'){ hy2-=ga*4*p*(1-p); }
    }
  }
  void ef;
  /* belah dua seragam (pizza 1/2 dan 1/2+1/2=1) */
  let bsa=1, bbo=0, bboff=0;
  for(const [s0,s1] of SPLIT){
    if(t>=s0&&t<s1){
      const p=(t-s0)/(s1-s0);
      const sp2=p<0.35? eio(p/0.35) : (p>0.7? 1-eio((p-0.7)/0.3) : 1);
      bsa=1-0.48*sp2;
      bbo=sp2;
      bboff=lerp(0,96,sp2);
    }
  }
  mentor.el.style.left=bx.toFixed(1)+'px';
  mentor.el.style.opacity=String(clamp(ep*3,0,1));
  mentor.el.style.top=(P.groundY-P.ballD+hy2).toFixed(1)+'px';
  mentor.el.style.transform=`translateX(${txj.toFixed(1)}px) rotate(${(_roll+lrot+drot).toFixed(2)}deg) scale(${bsa.toFixed(3)})`;
  msh.style.left=bx.toFixed(1)+'px';
  msh.style.top=(P.groundY-10)+'px';
  msh.style.opacity=String(clamp(ep*3,0,1)*clamp(0.42+hy2*0.006,0.18,0.5)*bsa);
  msh.style.transform=`scaleX(${clamp((1+hy2*0.004)*bsa,0.4,1.08).toFixed(3)})`;
  ballB.style.left=(bx+bboff).toFixed(1)+'px';
  ballB.style.top=(P.groundY-Math.round(P.ballD*0.52)+hy2)+'px';
  ballB.style.opacity=String(clamp(bbo,0,1));
  ballB.style.transform=`rotate(${(_roll*0.5).toFixed(1)}deg)`;
  /* percikan bintang */
  let spo=0;
  for(const [sa,sb] of SPARKS){
    if(t>=sa&&t<sb) spo=smz(t,sa,sb,0.35)*(0.65+0.2*Math.sin(t*7));
  }
  spark.style.opacity=String(clamp(spo,0,1));
  spark.style.left=(bx+62).toFixed(1)+'px';
  spark.style.top=(P.groundY-150+Math.sin(t*2)*4).toFixed(1)+'px';
  spark.style.transform=`rotate(${((t*28)%360).toFixed(0)}deg) scale(${(0.8+0.15*Math.sin(t*7)).toFixed(3)})`;

  /* kunang-kunang senja */
  const fz=seg(t,40.5,1.0)*(1-seg(t,51.2,0.6));
  for(const f of FF){
    const ox=Math.sin(t*f.sp+f.ph)*f.amp, oy=Math.cos(t*f.sp*0.8+f.ph)*f.amp*0.6;
    f.el.style.transform=`translate(${(f.x+ox).toFixed(1)}px,${(f.y+oy).toFixed(1)}px)`;
    f.el.style.opacity=(fz*(0.35+0.65*(0.5+0.5*Math.sin(t*2.2+f.ph)))).toFixed(3);
  }

  /* judul bab */
  for(let i=0;i<TITLES.length;i++){
    const o=TITLES[i];
    const tEnd=i+1<TITLES.length?TITLES[i+1].t0:51.4;
    const oin=seg(t,o.t0,0.35)*(1-seg(t,tEnd-0.25,0.3));
    const sc=1+0.035*Math.sin(clamp(seg(t,o.t0,0.7),0,1)*Math.PI);
    o.el.style.opacity=oin.toFixed(3);
    o.el.style.transform=`scale(${sc.toFixed(3)})`;
  }

  /* CTA: AKIOMIDA.COM hanya menyala di akhir, reveal tenang */
  popA(cta,t,40.9,0.7,6,0,51.6);
  const uo=seg(t,45.8,1.4);
  fUrl.style.opacity=uo.toFixed(3);
  fUrl.style.transform=`translateY(${((1-eio(uo))*14).toFixed(1)}px)`;
  fBar.style.width=(seg(t,48.6,1.8)*Math.max(0,P.ctaW-80)).toFixed(0)+'px';
  popA(fPill,t,47.5,0.6,6,0,51.6);

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
