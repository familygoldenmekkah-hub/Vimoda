/* ---------- narasi petak rev3: dramaturgi anime diolah (aturan 34) - 21 beat
   dalam 78 s (aturan 31: tempo nyaman, tiap sub tampil 2,7-5,0 detik),
   arc kishotenketsu: buka misteri, kembangkan dua tim, TWIST angka 1,
   jurus urai prima, tantangan final, teaser petak berikutnya ---------- */
const SUBS=[
  [0.5,'Coba deh susun delapan pot ini rapi.','Try arranging these eight pots neatly.','#FFFFFF'],
  [3.6,'Tapi tujuh pot? Cuma bisa satu baris.','But seven pots? Only one single row.','#FFFFFF'],
  [6.3,'Kenapa bisa begitu, ya?','Why does that happen, anyway?','#FFFFFF'],
  [10.0,'Angka di petak ini disortir jadi dua tim.','Numbers here get sorted into two teams.','#FFFFFF'],
  [13.6,'Tim satu: cuma dua faktor. Namanya prima!','Team one: just two factors. Prime!','#FFFFFF'],
  [17.4,'Prima: faktornya 1 dan dirinya sendiri.','Prime: its factors are 1 and itself.','#FFFFFF'],
  [21.8,'Cek lima: faktornya cuma 1 dan 5.','Check five: its only factors are 1 and 5.','#FFFFFF'],
  [25.0,'Kalau faktornya lebih dari dua?','What if there are more than two?','#FFFFFF'],
  [28.2,'Itu tim dua: komposit! 12 punya enam.','That is team two: composite! 12 has six.','#FFFFFF'],
  [32.0,'Dua belas: faktor 1, 2, 3, 4, 6, 12.','Twelve: factors 1, 2, 3, 4, 6, 12.','#FFFFFF'],
  [36.4,'Terus... angka 1 masuk mana?','So where does the number 1 go?','#FFFFFF'],
  [39.2,'1 cuma punya satu faktor. Bukan keduanya!','One has a single factor. Neither kind!','#D97A2E'],
  [42.6,'Ada juga yang istimewa: angka 2.','And one number is special: the 2.','#FFFFFF'],
  [46.0,'Angka 2: prima genap satu-satunya.','Number 2: the only even prime.','#FFFFFF'],
  [49.0,'Genap lain habis dibagi 2. Jadi komposit!','Other evens split by 2. Composite!','#D97A2E'],
  [52.6,'Saatnya jurus urai prima. Coba 12!','Time for the break-down move. Try 12!','#FFFFFF'],
  [56.6,'Hasil unik: 12 jadi 2 × 2 × 3!','Unique result: 12 becomes 2 × 2 × 3!','#D97A2E'],
  [61.6,'Tantanganmu: delapan angka menanti!','Your challenge: eight numbers await!','#FFFFFF'],
  [65.4,'Periksa faktornya satu-satu, ya!','Check the factors one by one!','#FFFFFF'],
  [67.8,'Terima kasih sudah menonton.','Thanks for watching.','#FFE9A8'],
  [73.4,'Benih petak berikutnya sudah disemai.','The next plot already has its seed.','#FFE9A8'],
];
let subIdx=-1;
function renderSub(t){
  let i=0;
  for(let k=0;k<SUBS.length;k++){ if(t>=SUBS[k][0]-0.001) i=k; }
  const nxt=i+1<SUBS.length?SUBS[i+1][0]:77.6;
  const o=clamp(Math.min(seg(t,SUBS[i][0],0.3), 1-seg(t,nxt-0.16,0.16)),0,1);
  if(i!==subIdx){
    subIdx=i;
    subId.textContent=SUBS[i][1];
    subId.style.color=SUBS[i][3];
    subEn.textContent=SUBS[i][2];
  }
  subbar.style.opacity=(o*0.98).toFixed(3);
  const pop=1+0.018*Math.sin(clamp(seg(t,SUBS[i][0],0.5),0,1)*Math.PI);
  subbar.style.transform=`translateX(-50%) scale(${pop.toFixed(3)})`;
}

/* ---------- judul bab (rata tengah, aturan 28) ---------- */
const TITLES=[['t0',0.35],['t1',9.8],['t2',22.8],['t3',40.2],['t4',49.4],['t5',56.0]]
  .map(([id,t0],i)=>({el:document.getElementById(id),t0:t0,i:i}));
TITLES.forEach((o)=>{
  o.el.style.top=(o.i===0?P.titleY:P.titleY+14)+'px';
  o.el.style.fontSize=(o.i===0?P.titleS0:P.titleSN)+'px';
  if(o.i===0||o.i===2||o.i===4)o.el.style.color='#2E5A8A';
});

/* ---------- beat, masterplan mentor (lantai depan, tak menembus properti) ---------- */
const IMP=[0.7,5.2,9.8,34.2,40.2,47.4,56.0,59.4];
const SPARKS=[[5.2,8.0],[50.6,52.8],[62.6,65.4]];
const GESTS=[
  [1.6,0.8,'nod',3],
  [10.4,0.7,'tilt',5],
  [15.4,0.7,'nod',3],
  [25.2,0.7,'nod',3],
  [28.6,0.7,'tilt',5],
  [34.3,0.7,'hop',14],
  [41.4,0.7,'tilt',5],
  [45.0,0.7,'nod',3],
  [50.8,1.2,'nod',4],
  [57.6,0.8,'nod',3],
  [62.4,0.9,'brace',1]
];
function imp(t){
  let a=0;
  for(const bt of IMP){
    const d=t-bt;
    if(d>=0&&d<0.5){ const p=d/0.5; a=Math.max(a,(1-p)*0.85); }
  }
  return a;
}
/* mentor jalan ke tengah panggung selama jeda dramatis (ma) 33.4-34.2 */
const WAY = ORIENT==='portrait'
  ? [[0.7,175],[9.8,640],[22.8,640],[33.4,705],[40.2,640],[49.4,705],[56.0,600]]
  : [[0.7,260],[9.8,1200],[22.8,1200],[33.4,1270],[40.2,1200],[49.4,1270],[56.0,1100]];

/* ---------- RENDER PER FRAME ---------- */
const world=document.getElementById('world');
const flash=document.getElementById('flash');
const fade=document.getElementById('fade');
const tilesun=document.getElementById('tilesun');
let _roll=0,_mxPrev=null;
function renderFrame(t){
  /* rumah tanam makin hangat menjelang penutup: lampu tumbuh menyala lembut */
  const nk=seg(t,50.0,14.0);
  tilesun.style.background=`rgba(58,38,26,${(nk*0.22).toFixed(3)})`;
  for(const L of LAMPS){
    const sw=Math.sin(t*0.8+L.ph)*1.6;
    L.lw.style.transform=`rotate(${sw.toFixed(2)}deg)`;
  }
  /* penutup bersih (aturan 28): konten keluar di 68.0 */
  const exo=1-seg(t,68.0,0.5);
  /* hook: delapan pot tersusun petak 2 x 4, tujuh pot cuma satu baris */
  for(const s of HOOKP){
    const o=clamp(seg(t,s.t0,0.35)*(1-seg(t,9.6,0.3)),0,1);
    const burst=t>=5.2?1+0.07*Math.sin(clamp(seg(t,5.2,0.5),0,1)*Math.PI):1;
    s.root.style.opacity=o.toFixed(3);
    s.root.style.transform=`translate(${(s.dx?eio(seg(t,2.5,1.0))*s.dx:0).toFixed(1)}px,${(s.dy?eio(seg(t,2.5,1.0))*s.dy:0).toFixed(1)}px) scale(${burst.toFixed(3)})`;
    if(s.pb)s.pb.style.boxShadow=t>=5.2?'0 0 20px rgba(232,179,46,.6)':'0 6px 14px rgba(30,18,4,.35)';
  }
  {
    const qo=clamp(seg(t,4.8,0.45)*(1-seg(t,9.6,0.3)),0,1);
    QM.el.style.opacity=qo.toFixed(3);
    QM.el.style.transform=`translateY(${(-6+6*Math.sin(t*3)).toFixed(1)}px)`;
  }
  popA(stamp,t,6.4,0.6,7,0,9.6);
  popA(epchip,t,0.5,0.5,6,0,9.6);
  /* panel 1: tim prima */
  popA(panel1,t,10.8,0.6,5,0,22.0);
  popA(p1Big,t,11.2,0.5,5,0,22.0);
  for(const r of P1ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  for(const c of P1CHIPS){
    c.el.style.opacity=(clamp(seg(t,c.t0,0.35),0,1)*(1-seg(t,22.0,0.3))).toFixed(3);
  }
  popA(p1Note,t,17.6,0.5,5,0,22.0);
  /* panel 2: tim komposit */
  popA(panel2,t,23.6,0.55,5,0,33.4);
  popA(p2Big,t,24.0,0.5,5,0,33.4);
  for(const r of P2ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  for(const c of P2CHIPS){
    c.el.style.opacity=(clamp(seg(t,c.t0,0.35),0,1)*(1-seg(t,33.4,0.3))).toFixed(3);
  }
  popA(p2Note,t,29.0,0.5,5,0,33.4);
  popA(p2Note2,t,31.0,0.5,5,0,33.4);
  /* JEDA DRAMATIS (ma) 33.4-34.2: layar kosong, mentor jalan ke tengah,
     audio hening - lalu TWIST besar (aturan 34) */
  /* panel kejutan angka 1: beat emas 34.2 + impact frame anime */
  popA(panelS,t,34.4,0.4,9,0,39.8);
  popA(sBig,t,34.8,0.5,7,0,39.8);
  for(const r of SROWS){ r.el.style.opacity=seg(t,r.t0,0.4).toFixed(3); }
  popA(sNote,t,38.6,0.45,5,0,39.8);
  /* panel 3: istimewanya angka 2 */
  popA(panel3,t,41.0,0.55,5,0,48.8);
  popA(p3Big,t,41.2,0.5,5,0,48.8);
  for(const r of P3ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  for(const c of P3CHIPS){
    c.el.style.opacity=(clamp(seg(t,c.t0,0.35),0,1)*(1-seg(t,48.8,0.3))).toFixed(3);
  }
  popA(p3Note,t,46.2,0.45,5,0,48.8);
  /* panel 4: jurus urai prima + power-up mentor 50.6-52.8 */
  popA(panel4,t,50.2,0.55,5,0,55.6);
  popA(p4Big,t,50.4,0.5,5,0,55.6);
  for(const r of P4ROWS){ r.el.style.opacity=seg(t,r.t0,0.4).toFixed(3); }
  popA(jurus,t,51.8,0.5,9,0,55.6);
  popA(p4Note,t,53.8,0.45,5,0,55.6);
  popA(p4Note2,t,54.4,0.45,5,0,55.6);
  /* papan tantangan final (aturan 30 + framing battle 34): soal bernomor,
     delapan kartu masuk formasi dari kiri-kanan berselang */
  popA(panelUji,t,56.8,0.55,5,0,68.0);
  ujiHd.style.opacity=(seg(t,57.0,0.35)*exo).toFixed(3);
  for(const rr of UJIS){ rr.el.style.opacity=seg(t,rr.t0,0.35).toFixed(3); }
  for(let i=0;i<CARDS.length;i++){
    const cc=CARDS[i];
    const inA=clamp(seg(t,cc.pop,0.35),0,1);
    const dir=i%2===0?-1:1;
    const off=(1-inA)*46*dir;
    const rot=(1-inA)*10*dir;
    const s2=1+0.09*Math.sin(clamp(seg(t,cc.pop,0.4),0,1)*Math.PI);
    cc.el.style.opacity=(inA*exo).toFixed(3);
    cc.el.style.transform=`translateX(${off.toFixed(1)}px) rotate(${rot.toFixed(2)}deg) scale(${s2.toFixed(3)})`;
    cc.el.style.borderColor=inA>0.9&&t<cc.pop+0.45?'#E8B32E':'#C8A86E';
  }
  popA(ujiNote,t,61.0,0.45,5,0,68.0);
  popA(pil,t,62.6,0.6,6,0,68.0);
  /* penutup bersih (aturan 28): meja tanam, baki semai, tanda keluar di 68.0 */
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
  const ep=seg(t,0.7,0.55);
  let hy2=0, lrot=0, drot=0, txj=0;
  for(const [gs,gd,gt,ga] of GESTS){
    const d2=t-gs;
    if(d2>=0&&d2<gd){
      const p=d2/gd, w=Math.sin(p*Math.PI);
      if(gt==='tilt'||gt==='lean'){ lrot+=ga*w; }
      else if(gt==='nod'){ lrot+=ga*Math.sin(p*2*Math.PI); }
      else if(gt==='shiver'){ txj=ga*Math.sin(p*40)*(1-p); }
      else if(gt==='spin'){ drot+=ga*eio(p); }
      else if(gt==='hop'){ hy2-=ga*Math.sin(p*Math.PI); }
      else if(gt==='brace'){ lrot-=11*w; }
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
  /* power-up ala anime: inti bola emas menyala berdenyut saat jurus (satu-satunya) */
  const pu=smz(t,50.6,52.8,0.35);
  const glowPx=P.ballD*0.55+pu*(30+18*Math.sin(t*10));
  mentorCore.style.boxShadow=`0 0 ${glowPx.toFixed(0)}px rgba(251,191,36,${(0.5+0.3*pu).toFixed(2)})`;
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
    const tEnd=i+1<TITLES.length?TITLES[i+1].t0:68.2;
    const oin=seg(t,o.t0,0.35)*(1-seg(t,tEnd-0.25,0.3));
    const sc2=1+0.035*Math.sin(clamp(seg(t,o.t0,0.7),0,1)*Math.PI);
    o.el.style.opacity=oin.toFixed(3);
    o.el.style.transform=`scale(${sc2.toFixed(3)})`;
  }
  /* TWIST anime (satu-satunya): impact frame speedlines 34.2 + spotlight
     pada reveal angka 1, lalu reda - konsisten aturan 12 (efek unik sekali) */
  {
    const iv=Math.max(0,(1-seg(t,34.2,0.55))*clamp(seg(t,34.2,0.06),0,1));
    speedEl.style.opacity=(iv*0.85).toFixed(3);
    const isc=1+0.14*Math.sin(clamp(seg(t,34.2,0.5),0,1)*Math.PI);
    speedEl.style.transform=`scale(${isc.toFixed(3)})`;
    spotEl.style.opacity=(clamp(seg(t,34.4,0.3)*(1-seg(t,36.6,1.0)),0,1)*0.75).toFixed(3);
  }
  /* endcard penutup bersih (aturan 28) + teaser tersisip (aturan 32 rev3):
     AKIOMIDA.COM muncul SENDIRIAN 68.2 di rumah tanam hangat, bar 73.8 */
  const eci=eio(seg(t,68.2,0.8));
  endcard.style.opacity=eci.toFixed(3);
  endcard.style.transform=`translateY(${((1-eci)*16).toFixed(1)}px) scale(${(0.94+0.06*eci).toFixed(3)})`;
  fBar.style.width=(seg(t,73.8,0.8)*P.barW).toFixed(0)+'px';
  renderSub(t);
  /* kamera tenang */
  const im=imp(t);
  const shx=Math.sin(t*47)*2.5*im, shy=Math.sin(t*39+1.7)*1.8*im;
  world.style.transform=`translate(${shx.toFixed(2)}px,${(shy+Math.sin(t*0.35)*3).toFixed(2)}px)`;
  flash.style.opacity=(im*0.07).toFixed(3);
  fade.style.opacity=String(clamp(1-seg(t,0.05,0.5),0,1)*0.96+clamp(seg(t,76.2,0.8),0,1));
}
renderFrame(0);
window.__ready=true;
</script>
</body>
</html>
