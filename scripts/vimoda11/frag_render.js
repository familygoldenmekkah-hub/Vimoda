/* ---------- narasi buhbus: 16 beat soft selling (aturan 25) ---------- */
const SUBS=[
  [0.50,'Pi: 3,1415926535, lalu titik titik.','Pi: 3,1415926535, then dots.','#FFFFFF'],
  [2.90,'Angkanya terus tanpa berhenti dan tanpa pola.','Its digits go on forever, with no pattern.','#FFFFFF'],
  [6.60,'Jenis itu punya nama: bilangan irasional.','That kind has a name: irrational numbers.','#FFFFFF'],
  [9.70,'Irasional tak bisa ditulis sebagai a per b.','Irrationals cannot be written as a over b.','#FFFFFF'],
  [12.90,'Contohnya: akar dua, akar tiga, akar lima, pi.','Examples: square root 2, 3, 5, and pi.','#FFFFFF'],
  [16.40,'Sekarang, akar dua. Kenapa irasional?','Now, square root 2. Why irrational?','#FFFFFF'],
  [19.20,'Akar empat sama dengan dua. Bulat, rasional.','Square root 4 is 2. Whole, so rational.','#FFFFFF'],
  [22.50,'Akar dua? 1,4142135 dan terus, tanpa pola.','Root 2? 1,4142135 and on, no pattern.','#D98F2E'],
  [25.70,'Tapi hati hati: akar 25 sama dengan lima.','But careful: root 25 equals five.','#FFFFFF'],
  [28.70,'Akar 36? Enam. Lihat hasilnya, bukan tandanya.','Root 36? Six. Check the result, not the sign.','#D98F2E'],
  [32.70,'Pi dan lingkaran memang sahabat.','Pi and circles are old friends.','#FFFFFF'],
  [35.10,'Keliling lingkaran: dua kali pi kali jari jari.','Circle perimeter: two times pi times radius.','#FFFFFF'],
  [38.60,'Tanda kira kira: 3,14159 hanyalah pendekatan.','The approx sign: 3,14159 is just an estimate.','#D98F2E'],
  [42.00,'Dua keluarga, satu dunia: bilangan real.','Two families, one world: real numbers.','#D98F2E'],
  [44.90,'Kelompokkan enam kartu ini, tulis di komentar.','Sort these six cards, write it below.','#FFFFFF'],
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
  o.el.style.fontSize=(o.i===0?P.titleS0:P.titleSN)+'px';
  if(o.i===0||o.i===2||o.i===4)o.el.style.color='#8A3A24';
});

/* ---------- beat, masterplan mentor (lantai depan, tak menembus properti) ---------- */
const IMP=[0.6,4.0,6.6,20.4,26.0,32.7,40.6,44.3];
const SPARKS=[[4.0,5.6],[47.7,49.6]];
const GESTS=[
  [1.4,0.8,'nod',3],
  [8.0,0.7,'tilt',5],
  [11.2,0.7,'nod',3],
  [17.8,0.7,'nod',3],
  [20.5,0.7,'tilt',5],
  [23.2,0.7,'nod',3],
  [26.2,0.7,'tilt',5],
  [28.9,0.7,'nod',3],
  [33.6,0.7,'tilt',5],
  [36.6,0.8,'nod',3],
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
  /* pustaka makin hangat menjelang penutup: lampu kuningan menyala lembut */
  const nk=seg(t,36.0,8.0);
  tilesun.style.background=`rgba(58,38,26,${(nk*0.22).toFixed(3)})`;
  for(const L of LAMPS){
    const sw=Math.sin(t*0.8+L.ph)*1.6;
    L.lw.style.transform=`rotate(${sw.toFixed(2)}deg)`;
  }
  /* penutup bersih (aturan 28): konten keluar di 49.8 */
  const exo=1-seg(t,49.8,0.5);
  /* hook: peta terbuka di meja, pita pi menumbuhkan digit, titik titik besar */
  const mapO=clamp(seg(t,0.9,0.5)*exo,0,1);
  mapEl.style.opacity=String(mapO);
  mapEl.style.transform=`scale(${(1+0.05*Math.sin(clamp(seg(t,0.9,0.7),0,1)*Math.PI)).toFixed(3)})`;
  const dg=ribbonEl.querySelector('.digits');
  const dots=ribbonEl.querySelector('.dots');
  const nDig=Math.floor(seg(t,1.2,2.2)*PI_DIGITS.length+0.0001);
  dg.textContent=PI_DIGITS.slice(0,nDig);
  dots.style.opacity=(seg(t,4.0,0.4)*(1-seg(t,6.4,0.3))).toFixed(3);
  ribbonEl.style.opacity=String(clamp(seg(t,1.2,0.4)*exo,0,1));
  popA(stamp,t,4.6,0.55,7,0,6.4);
  /* panel 1: definisi irasional */
  popA(panel1,t,7.0,0.6,5,0,17.0);
  for(const r of ROWS1){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  for(const c of P1CHIPS){
    c.el.style.opacity=(clamp(seg(t,c.t0,0.35),0,1)*(1-seg(t,17.0,0.3))).toFixed(3);
  }
  popA(p1Note,t,10.8,0.5,5,0,17.0);
  /* panel 2: kartu akar dibalik satu per satu */
  popA(panel2,t,17.5,0.55,5,0,32.5);
  for(const c of R1C){
    const inA=seg(t,c.tf-0.8,0.3);
    const fl=t>=c.tf;
    c.v.textContent=fl?c.val:c.q;
    c.tg.textContent=fl?c.tag:'?';
    const bounce=1+0.1*Math.sin(clamp(seg(t,c.tf,0.4),0,1)*Math.PI)*(fl?1:0);
    c.el.style.opacity=(clamp(inA,0,1)*exo).toFixed(3);
    c.el.style.transform=`scale(${bounce.toFixed(3)})`;
    c.el.style.color=fl?c.col:'#3A2C1E';
    c.el.style.borderColor=fl?c.bd:'#B98A3C';
  }
  {
    const inA=seg(t,20.0-0.8,0.3);
    const fl=t>=20.4;
    v2.textContent=fl?'1,414...':'√2';
    tg2.textContent=fl?'IRASIONAL':'?';
    const bounce=1+0.1*Math.sin(clamp(seg(t,20.4,0.4),0,1)*Math.PI)*(fl?1:0);
    c2.style.opacity=(clamp(inA,0,1)*exo).toFixed(3);
    c2.style.transform=`scale(${bounce.toFixed(3)})`;
    c2.style.color=fl?'#8A3A24':'#3A2C1E';
    c2.style.borderColor=fl?'#D98F7E':'#B98A3C';
    series.textContent=t>=23.0?'1,4142135623...':'1,414213...';
    series.style.opacity=(seg(t,23.0,0.4)*exo).toFixed(3);
  }
  for(const c of R3C){
    const inA=seg(t,c.tf-0.7,0.3);
    const fl=t>=c.tf;
    c.v.textContent=fl?c.val:c.q;
    c.tg.textContent=fl?c.tag:'?';
    const bounce=1+0.1*Math.sin(clamp(seg(t,c.tf,0.4),0,1)*Math.PI)*(fl?1:0);
    c.el.style.opacity=(clamp(inA,0,1)*exo).toFixed(3);
    c.el.style.transform=`scale(${bounce.toFixed(3)})`;
    c.el.style.color=fl?c.col:'#3A2C1E';
    c.el.style.borderColor=fl?c.bd:'#B98A3C';
  }
  popA(p2Note,t,24.2,0.45,5,0,32.5);
  if(t>=26.7)p2Note.textContent='LIHAT HASILNYA, BUKAN TANDANYA';
  /* panel 3: kompas keliling dan rumus */
  popA(panel3,t,33.0,0.55,5,0,40.5);
  popA(pcomp,t,33.2,0.5,6,0,40.5);
  popA(formula,t,33.4,0.5,6,0,40.5);
  for(const r of ROWS3P){ r.el.style.opacity=seg(t,r.t0,0.4).toFixed(3); }
  popA(p3Note,t,36.8,0.45,5,0,40.5);
  /* panel 4: dua keluarga */
  popA(panel4,t,40.9,0.55,5,0,44.3);
  for(const k of KCOLS){
    k.col.style.opacity=(clamp(seg(t,k.t0,0.45),0,1)*(1-seg(t,44.3,0.3))).toFixed(3);
    for(const r of k.rows){ r.el.style.opacity=seg(t,k.t0+0.25,0.4).toFixed(3); }
  }
  popA(p4Note,t,42.6,0.45,5,0,44.3);
  /* kartu uji: enam kartu katalog, dibalik satu per satu tanpa membocorkan kelompok */
  tagUji.style.opacity=(seg(t,45.0,0.4)*exo).toFixed(3);
  for(const c of CARDS){
    const inA=seg(t,44.7,0.3);
    const fl=t>=c.flip;
    if(c.el.textContent!==(fl?c.val:'?'))c.el.textContent=fl?c.val:'?';
    const bounce=1+0.11*Math.sin(clamp(seg(t,c.flip,0.4),0,1)*Math.PI)*(fl?1:0);
    c.el.style.opacity=(inA*exo).toFixed(3);
    c.el.style.transform=`scale(${bounce.toFixed(3)})`;
    c.el.style.borderColor=fl&&t<c.flip+0.5?'#D98F2E':'#B98A3C';
  }
  popA(pil,t,47.7,0.6,6,0,49.8);
  /* penutup bersih (aturan 28): peta, pita, rak katalog keluar di 49.8 */
  tableEl.style.opacity=exo.toFixed(3);
  cabEl.style.opacity=exo.toFixed(3);
  /* mentor: menggelinding antar stasiun di karpet dan papan kayu */
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
  /* endcard penutup bersih: AKIOMIDA.COM muncul SENDIRIAN di ruang yang tenang */
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
