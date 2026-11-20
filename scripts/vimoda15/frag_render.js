/* ---------- narasi kios rev1: dramaturgi anime (aturan 34) - 23 beat
   dalam 78 s (aturan 31: tempo nyaman, tiap sub tampil 2,7-5,6 detik),
   arc kishotenketsu: misteri 12 vs 13, faktor, kelipatan, TWIST terbatas
   vs tanpa batas, kaitan dua peran, jurus bagi rata, uji + teaser ---------- */
const SUBS=[
  [0.5,'Coba bagi dua belas permen ke tiga stoples.','Try sharing twelve candies into three jars.','#FFFFFF'],
  [3.6,'Tapi tiga belas? Masih ada sisa satu!','But thirteen? One candy is left over!','#FFFFFF'],
  [6.3,'Kenapa bisa begitu, ya?','Why does that happen, anyway?','#FFFFFF'],
  [10.0,'Pembagi habis tanpa sisa itu namanya faktor.','A divisor that fits evenly: a factor.','#FFFFFF'],
  [13.4,'Faktor 12: 1, 2, 3, 4, 6, 12.','Factors of 12: 1, 2, 3, 4, 6, 12.','#FFFFFF'],
  [16.6,'Cek tiga: 12 dibagi 3, pas tanpa sisa.','Check three: 12 by 3 fits with no rest.','#FFFFFF'],
  [19.8,'Tapi lima? Sisa dua. Gagal!','But five? Remainder 2. Fail!','#D97A2E'],
  [23.0,'Sekarang arah sebaliknya: kelipatan.','Now the other direction: multiples.','#FFFFFF'],
  [26.2,'Kelipatan 4: 4, 8, 12, 16, 20...','Multiples of 4: 4, 8, 12, 16, 20...','#FFFFFF'],
  [29.4,'Lihat, 12 masuk lagi: 4 × 3 = 12!','Look, 12 is in: 4 × 3 = 12!','#FFFFFF'],
  [32.2,'Kalau begitu... mana yang lebih banyak?','So then... which one has more?','#FFFFFF'],
  [36.4,'Faktor 6 cuma empat: 1, 2, 3, 6.','Factors of 6: just four: 1, 2, 3, 6.','#FFFFFF'],
  [39.4,'Kelipatan 6 jalan terus tanpa batas!','Multiples of 6 keep going endlessly!','#D97A2E'],
  [42.6,'Hubungan keduanya: satu kali, dua peran.','Their link: one multiplication, two roles.','#FFFFFF'],
  [45.8,'4 × 3 = 12: 4 dan 3 jadi faktor 12.','4 × 3 = 12: 4 and 3 are factors of 12.','#FFFFFF'],
  [48.8,'Dan 12 jadi kelipatan keduanya.','And 12 is a multiple of both.','#FFFFFF'],
  [52.2,'Saatnya jurus bagi rata. Coba 24 permen!','Time for the fair-share move. Try 24!','#FFFFFF'],
  [55.0,'Dua dapat 12, tiga 8, empat 6, enam 4.','Two get 12, three 8, four 6, six 4.','#FFFFFF'],
  [57.8,'Tantanganmu: empat soal menanti!','Your challenge: four questions await!','#FFFFFF'],
  [61.0,'Delapan kartu bantu soal nomor satu.','Eight cards help with question one.','#FFFFFF'],
  [64.4,'Coba kerjakan dengan bahasamu sendiri!','Try answering in your own words!','#FFFFFF'],
  [67.8,'Terima kasih sudah menonton.','Thanks for watching.','#FFE9A8'],
  [73.4,'Kisah angka berikutnya sudah menunggu.','The next number story already awaits.','#FFE9A8'],
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
const TITLES=[['t0',0.35],['t1',9.8],['t2',22.8],['t3',40.2],['t4',50.0],['t5',56.6]]
  .map(([id,t0],i)=>({el:document.getElementById(id),t0:t0,i:i}));
TITLES.forEach((o)=>{
  o.el.style.top=(o.i===0?P.titleY:P.titleY+14)+'px';
  o.el.style.fontSize=(o.i===0?P.titleS0:P.titleSN)+'px';
  if(o.i===0||o.i===2||o.i===4)o.el.style.color='#A6394B';
});

/* ---------- beat, masterplan mentor (karpet festival, tak menembus properti) ---------- */
const IMP=[0.7,5.2,9.8,34.2,40.2,47.4,50.0,59.8];
const SPARKS=[[5.2,8.0],[51.4,53.6],[63.0,65.6]];
const GESTS=[
  [1.6,0.8,'nod',3],
  [10.4,0.7,'tilt',5],
  [15.4,0.7,'nod',3],
  [25.2,0.7,'nod',3],
  [28.6,0.7,'tilt',5],
  [34.3,0.7,'hop',14],
  [41.4,0.7,'tilt',5],
  [44.8,0.7,'nod',3],
  [52.0,1.2,'nod',4],
  [58.0,0.8,'nod',3],
  [62.8,0.9,'brace',1]
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
  ? [[0.7,175],[9.8,640],[22.8,640],[33.4,705],[40.2,640],[50.0,705],[56.6,600]]
  : [[0.7,260],[9.8,1200],[22.8,1200],[33.4,1270],[40.2,1200],[50.0,1270],[56.6,1100]];

/* ---------- RENDER PER FRAME ---------- */
const world=document.getElementById('world');
const flash=document.getElementById('flash');
const fade=document.getElementById('fade');
const tilesun=document.getElementById('tilesun');
let _roll=0,_mxPrev=null;
function renderFrame(t){
  /* kios makin hangat menjelang penutup: lampion makin terang */
  const nk=seg(t,50.0,14.0);
  tilesun.style.background=`rgba(58,38,26,${(nk*0.22).toFixed(3)})`;
  for(const L of LAMPS){
    const sw=Math.sin(t*0.8+L.ph)*1.8;
    L.lw.style.transform=`rotate(${sw.toFixed(2)}deg)`;
    L.glow.style.opacity=(0.55+0.35*nk).toFixed(3);
  }
  /* penutup bersih (aturan 28): konten keluar di 68.0 */
  const exo=1-seg(t,68.0,0.5);
  /* hook: 12 permen masuk tiga stoples rata, permen ke-13 ditolak */
  for(const jj of HOOKJ){
    const o=clamp(seg(t,jj.t0,0.35)*(1-seg(t,9.6,0.3)),0,1);
    const burst=t>=5.2?1+0.07*Math.sin(clamp(seg(t,5.2,0.5),0,1)*Math.PI):1;
    jj.root.style.opacity=o.toFixed(3);
    jj.root.style.transform=`scale(${burst.toFixed(3)})`;
    for(const cd of jj.candies){
      const co=clamp(seg(t,cd.t0,0.3)*(1-seg(t,9.6,0.3)),0,1);
      const cs=1+0.25*Math.sin(clamp(seg(t,cd.t0,0.3),0,1)*Math.PI);
      cd.el.style.opacity=co.toFixed(3);
      cd.el.style.transform=`scale(${cs.toFixed(3)})`;
    }
  }
  for(const qd of QUEUE){
    qd.el.style.opacity=(clamp(seg(t,qd.t0,0.25),0,1)*(1-seg(t,9.6,0.3))).toFixed(3);
  }
  {
    const so=clamp(seg(t,4.0,0.25)*(1-seg(t,9.6,0.3)),0,1);
    const hp=seg(t,4.2,0.4);
    const px=lerp(SISA.x,SISA.hx,eio(hp));
    const py=SISA.y-(ORIENT==='portrait'?62:52)*Math.sin(hp*Math.PI);
    SISA.el.style.opacity=so.toFixed(3);
    SISA.el.style.left=(px-SISA.el.offsetWidth/2)+'px';
    SISA.el.style.top=(py-SISA.el.offsetHeight/2)+'px';
    SISA.el.style.boxShadow=t>=5.2?'0 0 22px rgba(232,93,93,.8)':'0 3px 8px rgba(90,40,20,.3)';
  }
  {
    const qo=clamp(seg(t,4.8,0.45)*(1-seg(t,9.6,0.3)),0,1);
    QM.el.style.opacity=qo.toFixed(3);
    QM.el.style.transform=`translateY(${(-6+6*Math.sin(t*3)).toFixed(1)}px)`;
  }
  popA(stamp,t,6.4,0.6,7,0,9.6);
  popA(epchip,t,0.5,0.5,6,0,9.6);
  /* panel 1: faktor */
  popA(panel1,t,10.8,0.6,5,0,22.0);
  popA(p1Big,t,11.2,0.5,5,0,22.0);
  for(const r of P1ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  for(const c of P1CHIPS){
    c.el.style.opacity=(clamp(seg(t,c.t0,0.35),0,1)*(1-seg(t,22.0,0.3))).toFixed(3);
  }
  popA(p1Note,t,17.6,0.5,5,0,22.0);
  popA(p1Note2,t,18.8,0.5,5,0,22.0);
  /* panel 2: kelipatan + stoples besar berisi hujan permen +4 */
  popA(panel2,t,23.6,0.55,5,0,33.4);
  popA(p2Big,t,24.0,0.5,5,0,33.4);
  for(const r of P2ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  for(const c of P2CHIPS){
    c.el.style.opacity=(clamp(seg(t,c.t0,0.35),0,1)*(1-seg(t,33.4,0.3))).toFixed(3);
  }
  popA(p2Note,t,31.2,0.5,5,0,33.4);
  popA(JARBIG.root,t,23.8,0.55,5,0,33.4);
  for(const bc of BIGC){
    const bo=clamp(seg(t,bc.t0,0.28)*(1-seg(t,33.4,0.3)),0,1);
    const bs=1+0.3*Math.sin(clamp(seg(t,bc.t0,0.3),0,1)*Math.PI);
    bc.el.style.opacity=bo.toFixed(3);
    bc.el.style.transform=`scale(${bs.toFixed(3)})`;
  }
  /* JEDA DRAMATIS (ma) 33.4-34.2: layar kosong, mentor ke tengah, audio hening */
  /* TWIST: terbatas vs tanpa batas - beat emas 34.2 + speedlines anime */
  popA(panelS,t,34.4,0.4,9,0,39.8);
  popA(sBig,t,34.8,0.5,7,0,39.8);
  for(const r of SROWS){ r.el.style.opacity=seg(t,r.t0,0.4).toFixed(3); }
  popA(sNote,t,38.6,0.45,5,0,39.8);
  /* panel 3: saling berkaitan - satu kali, dua peran */
  popA(panel3,t,41.0,0.55,5,0,49.4);
  popA(p3Big,t,41.2,0.5,5,0,49.4);
  popA(kLine,t,41.8,0.5,7,0,49.4);
  for(const r of P3ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  popA(p3Note,t,46.2,0.45,5,0,49.4);
  /* panel 4: jurus bagi rata + piring 24 permen tersusun ulang 2-3-4-6 */
  popA(panel4,t,50.8,0.55,5,0,56.2);
  popA(p4Big,t,51.0,0.5,5,0,56.2);
  for(const r of P4ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  popA(jurus,t,52.6,0.5,9,0,56.2);
  popA(p4Note,t,54.0,0.45,5,0,56.2);
  popA(p4Note2,t,54.6,0.45,5,0,56.2);
  popA(plateEl,t,50.8,0.55,5,0,56.2);
  for(let i=0;i<PLATED.length;i++){
    const pd=PLATED[i];
    let g=PLATE_G[0], prev=null;
    for(let k=1;k<PLATE_G.length;k++){
      if(t>=PLATE_T[k]){ prev=[PLATE_G[k-1],PLATE_T[k]]; g=PLATE_G[k]; }
    }
    let px,py;
    if(prev){
      const p2=eio(seg(t,prev[1],0.9));
      const [ax,ay]=platePos(prev[0],i);
      const [bx,by]=platePos(g,i);
      px=lerp(ax,bx,p2); py=lerp(ay,by,p2);
    }else{
      const [ax,ay]=platePos(g,i);
      px=ax; py=ay;
    }
    const po=clamp(seg(t,pd.t0,0.25)*(1-seg(t,56.2,0.3)),0,1);
    pd.el.style.opacity=po.toFixed(3);
    pd.el.style.left=(px-P.plateD/2)+'px';
    pd.el.style.top=(py-P.plateD/2)+'px';
  }
  /* papan uji (aturan 30 + framing battle 34): soal bernomor, kartu formasi */
  popA(panelUji,t,57.4,0.55,5,0,68.0);
  ujiHd.style.opacity=(seg(t,57.6,0.35)*exo).toFixed(3);
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
  popA(ujiNote,t,61.4,0.45,5,0,68.0);
  popA(pil,t,63.0,0.6,6,0,68.0);
  /* penutup bersih (aturan 28): meja kios, etalase, tanda keluar di 68.0 */
  counterEl.style.opacity=exo.toFixed(3);
  etalaseEl.style.opacity=exo.toFixed(3);
  signEl.style.opacity=exo.toFixed(3);
  markEl.style.opacity=String(clamp(0.96*exo+0.04,0.04,1));
  /* mentor menggelinding di karpet festival */
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
  /* power-up ala anime saat jurus bagi rata (satu-satunya) */
  const pu=smz(t,51.4,53.6,0.35);
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
  /* TWIST anime (satu-satunya): speedlines 34.2 + spotlight, lalu reda */
  {
    const iv=Math.max(0,(1-seg(t,34.2,0.55))*clamp(seg(t,34.2,0.06),0,1));
    speedEl.style.opacity=(iv*0.85).toFixed(3);
    const isc=1+0.14*Math.sin(clamp(seg(t,34.2,0.5),0,1)*Math.PI);
    speedEl.style.transform=`scale(${isc.toFixed(3)})`;
    spotEl.style.opacity=(clamp(seg(t,34.4,0.3)*(1-seg(t,36.6,1.0)),0,1)*0.75).toFixed(3);
  }
  /* endcard penutup bersih + teaser tersisip (aturan 32): AKIOMIDA.COM
     muncul SENDIRIAN 68.2, bar 73.8 */
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
