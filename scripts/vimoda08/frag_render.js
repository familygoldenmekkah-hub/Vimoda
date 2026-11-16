/* ---------- narasi bulina: 16 beat soft selling (aturan 25) ---------- */
const SUBS=[
  [0.50,'Menghitung benda, mulai dari berapa?','Counting things, where does it start?','#FFFFFF'],
  [2.98,'Bilangan asli: mulai dari satu.','Natural numbers: starting at one.','#FFFFFF'],
  [6.52,'Ada 3 buku di meja, 5 siswa di ruangan.','3 books on the table, 5 students in the room.','#FFFFFF'],
  [10.31,'Ada 12 apel di keranjang, terus menghitung.','12 apples in a basket, counting on and on.','#FFFFFF'],
  [13.76,'Itulah bilangan asli: 1, 2, 3, dan seterusnya.','Those are natural numbers: 1, 2, 3, and so on.','#FBBF24'],
  [17.21,'Lalu, bagaimana menyatakan tidak ada apa-apa?','How do we say there is nothing at all?','#FFFFFF'],
  [19.93,'Keranjangnya kosong, apelnya nol.','The basket is empty, zero apples.','#FFFFFF'],
  [23.47,'Nol pesan baru, nol peserta datang.','Zero new messages, zero participants.','#FFFFFF'],
  [25.86,'Bilangan asli plus nol, itulah bilangan cacah.','Naturals plus zero: the whole numbers.','#FFFFFF'],
  [29.65,'Semua bilangan asli termasuk bilangan cacah.','Every natural number is a whole number.','#FBBF24'],
  [32.86,'Tapi nol tidak termasuk bilangan asli.','But zero is not a natural number.','#FFFFFF'],
  [36.65,'Nol bukan berarti tidak berguna.','Zero does not mean useless.','#FFFFFF'],
  [40.19,'Tanpa nol, 10, 100, dan 1000 tak bisa ditulis.','Without zero, 10, 100, 1000 cannot be written.','#FFFFFF'],
  [44.14,'Latihan: 8 kelereng semuanya diberikan.','Exercise: all 8 marbles are given away.','#FBBF24'],
  [47.52,'Berapa sisa? Tulis jawabanmu di komentar.','How many are left? Write your answer below.','#FBBF24'],
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

/* ---------- judul bab ---------- */
const TITLES=[['t0',0.35],['t1',6.6],['t2',17.0],['t3',25.9],['t4',32.9],['t5',40.2]]
  .map(([id,t0])=>({el:document.getElementById(id),t0:t0}));
TITLES.forEach((o,i)=>{
  o.el.style.top=(i===0?P.titleY:P.titleY+14)+'px';
  o.el.style.fontSize=(i===0?P.titleS0:P.titleSN)+'px';
  if(i===0||i===2||i===4)o.el.style.color='#B45309';
});

/* ---------- beat, masterplan mentor (lantai depan, tak menembus properti) ---------- */
const IMP=[0.6,6.6,17.0,25.9,32.9,40.2,13.76,29.65,44.14,49.0];
const SPARKS=[[38.8,40.0],[47.3,49.8]];
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
  ? [[0.55,540],[9.0,660],[13.76,540],[19.9,440],[25.9,540],[51.9,540]]
  : [[0.55,960],[9.0,1100],[13.76,960],[19.9,820],[25.9,960],[51.9,960]];

/* ---------- RENDER PER FRAME ---------- */
const world=document.getElementById('world');
const flash=document.getElementById('flash');
const fade=document.getElementById('fade');
let _roll=0,_mxPrev=null;
function renderFrame(t){
  /* senja: langit jendela berubah, lampu menyala, dinding menghangat */
  const dk=seg(t,34.0,9.0);
  for(const d of winDusks){ d.style.opacity=dk.toFixed(3); }
  lampGlow.style.opacity=(dk*(0.75+0.15*Math.sin(t*2.2))).toFixed(3);
  /* bendera bunting berayun lembut */
  for(const f of FLAGS){
    f.el.style.transform=`rotate(${(Math.sin(t*0.8+f.ph)*3.5).toFixed(2)}deg)`;
  }
  /* debu cahaya melayang saat senja */
  const fz=seg(t,38.0,1.2)*(1-seg(t,51.2,0.6));
  for(const f of DUST){
    const ox=Math.sin(t*f.sp+f.ph)*f.amp, oy=Math.cos(t*f.sp*0.8+f.ph)*f.amp*0.7;
    f.el.style.transform=`translate(${(f.x+ox).toFixed(1)}px,${(f.y+oy).toFixed(1)}px)`;
    f.el.style.opacity=(fz*(0.30+0.55*(0.5+0.5*Math.sin(t*2.4+f.ph)))).toFixed(3);
  }
  /* balok angka 1 2 3 di rak (hook) */
  for(const b of BLOCKS){ popA(b.el,t,b.t0,0.5,10,0,6.5); }
  /* bingkai gambar (pasangan pertama pergi 13.4, kedua 16.6) */
  const pOut=1-seg(t,13.4,0.35), pOut2=1-seg(t,16.6,0.4);
  FRAMES.forEach((f,i)=>{
    const o=seg(t,f.t0,0.45)*(i<2?pOut:pOut2);
    f.win.style.opacity=o.toFixed(3);
    f.win.style.transform=`translateY(${((1-eio(seg(t,f.t0,0.45)))*22).toFixed(1)}px)`;
    f.tag.style.opacity=(seg(t,f.tag0,0.35)*(i<2?pOut:pOut2)).toFixed(3);
  });
  /* keranjang kosong + sticky notes (bab NOL) */
  popA(basket,t,19.9,0.55,6,0,25.9);
  for(const s of STICKS){ popA(s.el,t,s.t0,0.5,7,0,25.9); }
  /* chart kertas (bab CACAH) + catatan stabilo yang berganti */
  popA(chart,t,25.9,0.55,5,0,32.9);
  for(const r of CH_ROWS){
    r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3);
  }
  chNote.textContent = t>=32.86 ? 'NOL TIDAK MASUK ASLI' : 'SEMUA ASLI ADA DI CACAH';
  popA(chNote,t,29.65,0.5,5,0,32.9);
  /* papan kapur easel (bab PERAN NOL) */
  popA(easel,t,36.7,0.6,6,0,40.15);
  /* mentor: menggelinding di lantai depan */
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
      else if(gt==='spin'){ drot+=ga*eio(p); }
      else if(gt==='count'){ hy2-=ga*Math.abs(Math.sin(p*5*Math.PI))*(1-p*0.2); }
      else if(gt==='shiver'){ txj=ga*Math.sin(p*40)*(1-p); }
      else if(gt==='jump'){ hy2-=ga*4*p*(1-p); }
    }
  }
  const bsa=1;
  mentor.el.style.left=bx.toFixed(1)+'px';
  mentor.el.style.opacity=String(clamp(ep*3,0,1));
  mentor.el.style.top=(P.groundY-P.ballD+hy2).toFixed(1)+'px';
  mentor.el.style.transform=`translateX(${txj.toFixed(1)}px) rotate(${(_roll+lrot+drot).toFixed(2)}deg) scale(${bsa.toFixed(3)})`;
  msh.style.left=bx.toFixed(1)+'px';
  msh.style.top=(P.groundY-10)+'px';
  msh.style.opacity=String(clamp(ep*3,0,1)*clamp(0.42+hy2*0.006,0.18,0.5)*bsa);
  msh.style.transform=`scaleX(${clamp((1+hy2*0.004)*bsa,0.4,1.08).toFixed(3)})`;
  /* percikan bintang */
  let spo=0;
  for(const [sa,sb] of SPARKS){
    if(t>=sa&&t<sb) spo=smz(t,sa,sb,0.35)*(0.65+0.2*Math.sin(t*7));
  }
  spark.style.opacity=String(clamp(spo,0,1));
  spark.style.left=(bx+62).toFixed(1)+'px';
  spark.style.top=(P.groundY-150+Math.sin(t*2)*4).toFixed(1)+'px';
  spark.style.transform=`rotate(${((t*28)%360).toFixed(0)}deg) scale(${(0.8+0.15*Math.sin(t*7)).toFixed(3)})`;
  /* kelereng latihan: muncul, lalu diberikan satu per satu ke kanan */
  MARBLES.forEach((m,i)=>{
    const inO=seg(t,44.25+i*0.06,0.3);
    const xp=seg(t,45.55+i*0.15,0.42);
    const op=clamp(inO*(1-xp),0,1);
    m.el.style.opacity=op.toFixed(3);
    m.el.style.transform=`translate(${(320*eio(xp)).toFixed(1)}px,${(-40*xp).toFixed(1)}px) rotate(${(xp*160).toFixed(0)}deg) scale(${(0.7+0.3*inO).toFixed(3)})`;
  });
  popA(qmark,t,47.3,0.5,8,0,49.8);
  /* judul bab (judul terakhir ikut keluar saat penutup agar endcard sendirian) */
  for(let i=0;i<TITLES.length;i++){
    const o=TITLES[i];
    const tEnd=i+1<TITLES.length?TITLES[i+1].t0:50.2;
    const oin=seg(t,o.t0,0.35)*(1-seg(t,tEnd-0.25,0.3));
    const sc=1+0.035*Math.sin(clamp(seg(t,o.t0,0.7),0,1)*Math.PI);
    o.el.style.opacity=oin.toFixed(3);
    o.el.style.transform=`scale(${sc.toFixed(3)})`;
  }
  /* papan latihan: konten selesai lalu keluar layar (aturan 28) */
  popA(cta,t,40.9,0.7,6,0,49.8);
  popA(fPill,t,47.5,0.6,6,0,49.8);
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
