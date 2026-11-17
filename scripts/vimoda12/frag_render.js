/* ---------- narasi realino: 16 beat soft selling (aturan 25) ---------- */
const SUBS=[
  [0.5,'Coba deh lihat enam angka ini baik-baik.','Take a good look at these six numbers.','#FFFFFF'],
  [3.1,'Bentuknya beda-beda. Tapi mereka satu keluarga.','Different shapes. But one family.','#FFFFFF'],
  [6.6,'Keluarganya bernama: bilangan real.','The family name: real numbers.','#FFFFFF'],
  [9.6,'Real artinya nyata: angka untuk nilai nyata.','Real means actual: numbers we truly use.','#FFFFFF'],
  [13.0,'Nilai 0,75, suhu -2,5, semua nyata.','Values 0.75, minus 2.5, all real.','#FFFFFF'],
  [16.4,'Kelompok pertama: yang bisa jadi pecahan.','First group: can be written as fractions.','#FFFFFF'],
  [19.3,'Namanya rasional. Kayak 0,75 itu 3/4.','Rational. Like 0.75, that is 3 over 4.','#FFFFFF'],
  [22.5,'Kelompok kedua: nggak mau jadi pecahan.','Second group: refuses to be a fraction.','#FFFFFF'],
  [25.5,'Kayak pi dan akar 2. Namanya irasional.','Like pi and root 2. Called irrational.','#FFFFFF'],
  [28.5,'Dan nggak ada yang nyangkut di antaranya.','And nothing hangs in between.','#D97A2E'],
  [32.7,'Di garis bilangan, tiap angka punya kursi.','On the number line, each has its own seat.','#FFFFFF'],
  [35.1,'Setengah di antara 0 dan 1. Akar 2 sebelum 2.','Half between 0 and 1. Root 2 before 2.','#FFFFFF'],
  [38.6,'Pi? Angkanya nggak selesai, kursinya tetap pasti.','Pi never ends, yet its seat stays fixed.','#D97A2E'],
  [41.5,'Makanya penting: ukuran nyata jarang pas bulat.','Real matters: real sizes are rarely whole.','#D97A2E'],
  [44.9,'Empat soal, jawabnya di komentar ya.','Four questions, answer in the comments.','#FFFFFF'],
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
  /* bengkel makin hangat menjelang penutup: lampu dome menyala lembut */
  const nk=seg(t,36.0,8.0);
  tilesun.style.background=`rgba(58,38,26,${(nk*0.22).toFixed(3)})`;
  for(const L of LAMPS){
    const sw=Math.sin(t*0.8+L.ph)*1.6;
    L.lw.style.transform=`rotate(${sw.toFixed(2)}deg)`;
  }
  /* penutup bersih (aturan 28): konten keluar di 49.8 */
  const exo=1-seg(t,49.8,0.5);
  /* hook: enam bilangan berbeda bentuk muncul satu per satu, lalu menyala serentak */
  for(const c of HOOK){
    const o=clamp(seg(t,c.t0,0.3)*(1-seg(t,6.4,0.3)),0,1);
    const burst=t>=4.0?1+0.09*Math.sin(clamp(seg(t,4.0,0.4),0,1)*Math.PI):1;
    c.el.style.opacity=o.toFixed(3);
    c.el.style.transform=`scale(${burst.toFixed(3)})`;
    c.el.style.borderColor=t>=4.0?'#E8B32E':'#E8B32E';
    c.el.style.background=t>=4.0?'#5A4430':'#4A3A62';
    c.el.style.boxShadow=t>=4.0?'0 0 22px rgba(232,179,46,.55)':'0 8px 18px rgba(30,18,4,.4)';
  }
  popA(stamp,t,4.6,0.55,7,0,6.4);
  /* panel 1: definisi bilangan real */
  popA(panel1,t,7.0,0.6,5,0,17.0);
  popA(p1Big,t,7.3,0.5,5,0,17.0);
  for(const r of P1ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  for(const c of P1CHIPS){
    c.el.style.opacity=(clamp(seg(t,c.t0,0.35),0,1)*(1-seg(t,17.0,0.3))).toFixed(3);
  }
  popA(p1Note,t,10.8,0.5,5,0,17.0);
  /* panel 2: dua kelompok besar + verdict tidak tumpang tindih */
  popA(panel2,t,17.5,0.55,5,0,32.5);
  for(const k of KCOLS){
    k.col.style.opacity=(clamp(seg(t,k.t0,0.45),0,1)*(1-seg(t,32.5,0.3))).toFixed(3);
    for(const c of k.chips){ c.el.style.opacity=(clamp(seg(t,c.t0,0.35),0,1)*(1-seg(t,32.5,0.3))).toFixed(3); }
  }
  popA(divider,t,26.0,0.5,9,0,32.5);
  popA(p2Note,t,24.2,0.45,5,0,32.5);
  if(t>=26.7)p2Note.textContent='RASIONAL ATAU IRASIONAL SAJA';
  /* panel 3: garis bilangan + enam titik berlabel + sapuan sorotan penggaris */
  popA(panel3,t,33.0,0.55,5,0,40.5);
  const sweep=seg(t,33.0,0.8);
  ruler.hl.style.opacity=(sweep>0&&sweep<1?0.85*Math.sin(sweep*Math.PI):(t>=40.6?0:0)).toFixed(3);
  ruler.hl.style.width=(sweep*(P.rulerW-36)).toFixed(1)+'px';
  for(const p of window.__PTS){
    const o=clamp(seg(t,p.t0,0.3),0,1)*(1-seg(t,40.5,0.3));
    const s2=1+0.14*Math.sin(clamp(seg(t,p.t0,0.4),0,1)*Math.PI);
    p.dot.style.opacity=o.toFixed(3);
    p.lb.style.opacity=o.toFixed(3);
    p.dot.style.transform=`scale(${s2.toFixed(3)})`;
  }
  popA(p3Note,t,38.9,0.45,5,0,40.5);
  /* panel 4: nilai pengukuran kontinu */
  popA(panel4,t,40.9,0.55,5,0,44.3);
  for(const r of P4ROWS){ r.el.style.opacity=seg(t,r.t0,0.4).toFixed(3); }
  popA(p4Note,t,43.0,0.45,5,0,44.3);
  /* papan tugas uji (aturan 30): soal bernomor, kartu besar, titik garis */
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
    const dm=DOTEL[i];
    dm.style.opacity=clamp(seg(t,cc.pop+0.12,0.3),0,1).toFixed(3);
    dm.style.transform=`scale(${(1+0.14*Math.sin(clamp(seg(t,cc.pop+0.12,0.4),0,1)*Math.PI)).toFixed(3)})`;
  }
  popA(pil,t,47.7,0.6,6,0,49.8);
  /* penutup bersih (aturan 28): meja, proyek, pegboard keluar di 49.8 */
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
  /* endcard penutup bersih: AKIOMIDA.COM muncul SENDIRIAN di bengkel yang tenang */
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
