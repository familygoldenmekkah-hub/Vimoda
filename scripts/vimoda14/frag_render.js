/* ---------- narasi petak: 16 beat soft selling (aturan 25) ---------- */
const SUBS=[
  [0.5,'Coba deh susun delapan pot ini rapi.','Try arranging these eight pots neatly.','#FFFFFF'],
  [3.1,'Tapi tujuh pot? Cuma bisa satu baris.','But seven pots? Only one single row.','#FFFFFF'],
  [6.6,'Yang cuma punya dua faktor: namanya prima.','Numbers with just two factors are prime.','#FFFFFF'],
  [9.6,'Prima: tepat dua faktor, 1 dan dirinya.','Prime: exactly two factors, 1 and itself.','#FFFFFF'],
  [13.0,'Cek lima: faktornya cuma 1 dan 5.','Check five: its only factors are 1 and 5.','#FFFFFF'],
  [16.4,'Kalau faktornya lebih dari dua?','What if there are more than two?','#FFFFFF'],
  [19.3,'Namanya komposit. 12 punya enam faktor.','Composite. Twelve has six factors.','#FFFFFF'],
  [22.5,'Dua belas: faktor 1, 2, 3, 4, 6, 12.','Twelve: factors 1, 2, 3, 4, 6, 12.','#FFFFFF'],
  [25.5,'Terus... angka 1 masuk mana?','So where does the number 1 go?','#FFFFFF'],
  [28.5,'1 cuma punya satu faktor. Bukan keduanya!','One has a single factor. Neither kind!','#D97A2E'],
  [32.7,'Ada juga yang istimewa: angka 2.','And one number is special: the 2.','#FFFFFF'],
  [35.1,'Angka 2: prima genap satu-satunya.','Number 2: the only even prime.','#FFFFFF'],
  [38.6,'Genap lain habis dibagi 2. Jadi komposit!','Other evens split by 2. Composite!','#D97A2E'],
  [41.5,'Bonus: 12 bisa diurai jadi 2 × 2 × 3!','Bonus: 12 breaks into 2 × 2 × 3!','#D97A2E'],
  [44.9,'Delapan angka nanti: periksa faktornya!','Eight numbers await: check the factors!','#FFFFFF'],
  [50.07,'Terima kasih sudah menonton.','Thanks for watching.','#FFE9A8'],
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
  o.el.style.fontSize=(o.i===0?P.titleS0:P.titleSN)+'px';
  if(o.i===0||o.i===2||o.i===4)o.el.style.color='#2E5A8A';
});

/* ---------- beat, masterplan mentor (lantai depan, tak menembus properti) ---------- */
const IMP=[0.6,4.0,6.6,26.0,32.7,38.6,44.3];
const SPARKS=[[4.0,5.6],[47.7,49.6]];
const GESTS=[
  [1.4,0.8,'nod',3],
  [8.0,0.7,'tilt',5],
  [11.5,0.7,'nod',3],
  [17.8,0.7,'nod',3],
  [20.6,0.7,'tilt',5],
  [26.2,0.7,'nod',3],
  [33.4,0.7,'tilt',5],
  [36.8,0.7,'nod',3],
  [41.0,0.7,'tilt',4],
  [45.1,0.8,'nod',3]
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
  ? [[0.55,175],[6.6,705],[17.3,640],[32.7,640],[40.6,705],[44.2,600]]
  : [[0.55,260],[6.6,1270],[17.3,1200],[32.7,1200],[40.6,1270],[44.2,1100]];

/* ---------- RENDER PER FRAME ---------- */
const world=document.getElementById('world');
const flash=document.getElementById('flash');
const fade=document.getElementById('fade');
const tilesun=document.getElementById('tilesun');
let _roll=0,_mxPrev=null;
function renderFrame(t){
  /* rumah tanam makin hangat menjelang penutup: lampu tumbuh menyala lembut */
  const nk=seg(t,36.0,8.0);
  tilesun.style.background=`rgba(58,38,26,${(nk*0.22).toFixed(3)})`;
  for(const L of LAMPS){
    const sw=Math.sin(t*0.8+L.ph)*1.6;
    L.lw.style.transform=`rotate(${sw.toFixed(2)}deg)`;
  }
  /* penutup bersih (aturan 28): konten keluar di 49.8 */
  const exo=1-seg(t,49.8,0.5);
  /* hook: delapan pot tersusun petak 2 x 4, tujuh pot cuma satu baris */
  for(const s of HOOKP){
    const o=clamp(seg(t,s.t0,0.3)*(1-seg(t,6.4,0.3)),0,1);
    const burst=t>=4.0?1+0.07*Math.sin(clamp(seg(t,4.0,0.4),0,1)*Math.PI):1;
    s.root.style.opacity=o.toFixed(3);
    s.root.style.transform=`translate(${(s.dx?eio(seg(t,2.1,0.7))*s.dx:0).toFixed(1)}px,${(s.dy?eio(seg(t,2.1,0.7))*s.dy:0).toFixed(1)}px) scale(${burst.toFixed(3)})`;
    if(s.pb)s.pb.style.boxShadow=t>=4.0?'0 0 20px rgba(232,179,46,.6)':'0 6px 14px rgba(30,18,4,.35)';
  }
  {
    const qo=clamp(seg(t,3.55,0.4)*(1-seg(t,6.4,0.3)),0,1);
    QM.el.style.opacity=qo.toFixed(3);
    QM.el.style.transform=`translateY(${(-6+6*Math.sin(t*3)).toFixed(1)}px)`;
  }
  popA(stamp,t,4.6,0.55,7,0,6.4);
  /* panel 1: bilangan prima */
  popA(panel1,t,7.0,0.6,5,0,17.0);
  popA(p1Big,t,7.3,0.5,5,0,17.0);
  for(const r of P1ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  for(const c of P1CHIPS){
    c.el.style.opacity=(clamp(seg(t,c.t0,0.35),0,1)*(1-seg(t,17.0,0.3))).toFixed(3);
  }
  popA(p1Note,t,13.0,0.5,5,0,17.0);
  /* panel 2: bilangan komposit */
  popA(panel2,t,17.5,0.55,5,0,25.8);
  popA(p2Big,t,17.8,0.5,5,0,25.8);
  for(const r of P2ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  for(const c of P2CHIPS){
    c.el.style.opacity=(clamp(seg(t,c.t0,0.35),0,1)*(1-seg(t,25.8,0.3))).toFixed(3);
  }
  popA(p2Note,t,22.5,0.5,5,0,25.8);
  /* panel kejutan angka 1: beat emas 26.0 */
  popA(panelS,t,26.2,0.55,5,0,32.5);
  popA(sBig,t,26.5,0.5,6,0,32.5);
  for(const r of SROWS){ r.el.style.opacity=seg(t,r.t0,0.4).toFixed(3); }
  popA(sNote,t,29.4,0.45,5,0,32.5);
  /* panel 3: istimewanya angka 2 */
  popA(panel3,t,33.0,0.55,5,0,40.5);
  popA(p3Big,t,33.2,0.5,5,0,40.5);
  for(const r of P3ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  for(const c of P3CHIPS){
    c.el.style.opacity=(clamp(seg(t,c.t0,0.35),0,1)*(1-seg(t,40.5,0.3))).toFixed(3);
  }
  popA(p3Note,t,37.8,0.45,5,0,40.5);
  /* panel 4: faktorisasi prima */
  popA(panel4,t,40.9,0.55,5,0,44.3);
  popA(p4Big,t,41.0,0.5,5,0,44.3);
  for(const r of P4ROWS){ r.el.style.opacity=seg(t,r.t0,0.4).toFixed(3); }
  popA(p4Note,t,42.8,0.45,5,0,44.3);
  popA(p4Note2,t,43.2,0.45,5,0,44.3);
  /* papan tugas uji (aturan 30): soal bernomor + kartu besar */
  popA(panelUji,t,44.4,0.55,5,0,49.8);
  ujiHd.style.opacity=(seg(t,44.55,0.35)*exo).toFixed(3);
  for(const rr of UJIS){ rr.el.style.opacity=seg(t,rr.t0,0.35).toFixed(3); }
  for(let i=0;i<CARDS.length;i++){
    const cc=CARDS[i];
    const inA=clamp(seg(t,cc.pop,0.3),0,1);
    cc.el.style.opacity=(inA*exo).toFixed(3);
    const s2=1+0.09*Math.sin(clamp(seg(t,cc.pop,0.4),0,1)*Math.PI);
    cc.el.style.transform=`scale(${s2.toFixed(3)})`;
    cc.el.style.borderColor=inA>0.9&&t<cc.pop+0.45?'#E8B32E':'#C8A86E';
  }
  popA(ujiNote,t,46.5,0.45,5,0,49.8);
  popA(pil,t,47.7,0.6,6,0,49.8);
  /* penutup bersih (aturan 28): meja tanam, baki semai, tanda keluar di 49.8 */
  tableEl.style.opacity=exo.toFixed(3);
  boardEl.style.opacity=exo.toFixed(3);
  pegEl.style.opacity=exo.toFixed(3);
  markEl.style.opacity=String(clamp(0.96*exo+0.04,0.04,1));
  /* mentor: menggelinding antar stasiun di marka safety */
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
  /* endcard penutup bersih: AKIOMIDA.COM muncul SENDIRIAN di rumah tanam yang tenang */
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
