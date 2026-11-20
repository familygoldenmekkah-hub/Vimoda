/* ---------- narasi kios rev2: ALUR DETEKTIF ala anime misteri (aturan 34) -
   22 beat dalam 84 s (aturan 31). Arc kasus: KASUS (misteri sisa satu) ->
   BUKTI 1 faktor -> BUKTI 2 kelipatan -> MA -> DEDUKSI twist terbatas vs
   tanpa batas -> PREDIKSI 24 + JEBAKAN JURUS BAGI RATA -> KASUS DITUTUP ->
   BERKAS KASUS BARU (uji) + teaser. Kalimat bahan dikembangkan jadi plot,
   bukan dibacakan. ---------- */
const SUBS=[
  [0.5,'Malam ini Kios Permen menyimpan misteri.','Tonight, Kios Permen hides a mystery.','#FFFFFF'],
  [3.5,'Etalase tinggal 13 permen, satu sendirian!','Only 13 candies left, one all alone!','#FFFFFF'],
  [6.5,'Kenapa ada sisa, ya?','Why is there a leftover, anyway?','#FFFFFF'],
  [10.9,'Bukti pertama: dia selalu bagi habis rata.','Evidence one: the thief always splits evenly.','#FFFFFF'],
  [13.6,'Faktor 12: 1, 2, 3, 4, 6, 12.','Factors of 12: 1, 2, 3, 4, 6, 12.','#FFFFFF'],
  [16.8,'Cek lima: 12 dibagi 5, sisa dua. Gagal!','Check five: 12 by 5, remainder 2. Fail!','#FFFFFF'],
  [19.8,'Makanya malam ini: sisa satu ditinggal!','So tonight: one leftover was abandoned!','#D97A2E'],
  [24.0,'Bukti kedua: catatan malam serangan.','Evidence two: the ledger of attack nights.','#FFFFFF'],
  [27.2,'Selalu kelipatan 4: 4, 8, 12, 16, 20!','Always multiples of 4: 4, 8, 12, 16, 20!','#D97A2E'],
  [30.4,'12: kelipatan 4 sekaligus faktor 12!','12: multiple of 4 and factor of 12!','#FFFFFF'],
  [35.6,'Faktor 6 cuma empat: 1, 2, 3, 6.','Factors of 6: just four: 1, 2, 3, 6.','#FFFFFF'],
  [38.6,'Kelipatan 4 tanpa batas: dia bisa kapan saja!','Multiples of 4 never end: anytime!','#D97A2E'],
  [42.4,'Prediksi detektif: stok diisi 24 malam ini!','Detective predicts: refill 24 tonight!','#FFFFFF'],
  [45.6,'Dua dapat 12, tiga 8, empat 6, enam 4.','Two get 12, three 8, four 6, six 4.','#FFFFFF'],
  [49.0,'Pos penjagaan rata, sisa nol. Kami menunggu!','Even posts, zero rest. We are waiting!','#FFFFFF'],
  [52.2,'Malam tiba... permen 24 tertata rapi.','Night falls... 24 candies set neatly.','#FFFFFF'],
  [56.8,'Sisa satu terjawab. Kasus ditutup!','Case closed: the leftover speaks!','#FFE9A8'],
  [61.8,'Berkas kasus baru: empat soal menanti!','New case files: four questions await!','#FFFFFF'],
  [65.0,'Delapan kartu bukti bantu kasus nomor satu.','Eight evidence cards help case one.','#FFFFFF'],
  [69.0,'Coba kerjakan dengan bahasamu sendiri!','Try answering in your own words!','#FFFFFF'],
  [72.4,'Terima kasih sudah menonton.','Thanks for watching.','#FFE9A8'],
  [78.0,'Kisah angka berikutnya sudah menunggu.','The next number story already awaits.','#FFE9A8'],
];
let subIdx=-1;
function renderSub(t){
  let i=0;
  for(let k=0;k<SUBS.length;k++){ if(t>=SUBS[k][0]-0.001) i=k; }
  const nxt=i+1<SUBS.length?SUBS[i+1][0]:83.6;
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

/* ---------- judul bab ala babak kasus (rata tengah, aturan 28) ---------- */
const TITLES=[['t0',0.35],['t1',10.6],['t2',23.6],['t3',34.4],['t4',41.4],['t5',56.4],['t6',61.4]]
  .map(([id,t0],i)=>({el:document.getElementById(id),t0:t0,i:i}));
TITLES.forEach((o)=>{
  o.el.style.top=(o.i===0?P.titleY:P.titleY+14)+'px';
  const txt=o.el.textContent||'';
  o.el.style.fontSize=((o.i===0?P.titleS0:(txt.length>21?P.titleSN*0.84:P.titleSN)))+'px';
  if(o.i===0||o.i===2||o.i===4)o.el.style.color='#A6394B';
});

/* ---------- beat, masterplan mentor (karpet festival, tak menembus properti) ---------- */
const IMP=[0.7,5.2,10.6,34.4,41.4,56.4,62.6,64.6];
const SPARKS=[[5.2,8.0],[46.6,49.0],[66.8,69.4]];
const PUSHES=[[4.6,5.8],[34.4,36.0],[56.4,58.0]];
const GESTS=[
  [1.6,0.8,'nod',3],
  [7.9,0.7,'tilt',5],
  [11.4,0.7,'tilt',5],
  [15.2,0.7,'nod',3],
  [25.2,0.7,'nod',3],
  [28.8,0.7,'tilt',5],
  [34.5,0.7,'hop',14],
  [36.8,0.7,'tilt',5],
  [45.8,1.2,'nod',4],
  [50.6,0.7,'nod',3],
  [57.6,0.9,'spin',360],
  [62.6,0.8,'nod',3],
  [66.8,0.9,'brace',1]
];
function imp(t){
  let a=0;
  for(const bt of IMP){
    const d=t-bt;
    if(d>=0&&d<0.5){ const p=d/0.5; a=Math.max(a,(1-p)*0.85); }
  }
  return a;
}
/* mentor jalan ke tengah panggung selama jeda dramatis (ma) 33.6-34.4 */
const WAY = ORIENT==='portrait'
  ? [[0.7,175],[10.6,640],[23.6,640],[33.6,705],[41.4,640],[56.4,705],[61.4,600]]
  : [[0.7,260],[10.6,1200],[23.6,1200],[33.6,1270],[41.4,1200],[56.4,1270],[61.4,1100]];

/* ---------- RENDER PER FRAME ---------- */
const world=document.getElementById('world');
world.style.transformOrigin='50% 46%';
const flash=document.getElementById('flash');
const fade=document.getElementById('fade');
const tilesun=document.getElementById('tilesun');
let _roll=0,_mxPrev=null,_spin=0;
function renderFrame(t){
  /* MALAM NOIR: gelap biru dari detik pertama, hangat saat kasus ditutup */
  const darkP=1-seg(t,56.4,6.0);
  tilesun.style.background=`rgba(20,20,52,${(0.38*darkP).toFixed(3)})`;
  for(const L of LAMPS){
    const sw=Math.sin(t*0.8+L.ph)*1.8;
    L.lw.style.transform=`rotate(${sw.toFixed(2)}deg)`;
    L.glow.style.opacity=(0.45+0.45*(1-darkP)).toFixed(3);
  }
  /* penutup bersih (aturan 28): konten keluar di 71.6 */
  const exo=1-seg(t,71.6,0.5);
  /* KASUS: tiga stoples kosong, permen terbang dari etalase (rekonstruksi) */
  for(const jj of HOOKJ){
    const o=clamp(seg(t,jj.t0,0.35)*(1-seg(t,10.2,0.3)),0,1);
    const burst=t>=5.2?1+0.07*Math.sin(clamp(seg(t,5.2,0.5),0,1)*Math.PI):1;
    jj.root.style.opacity=o.toFixed(3);
    jj.root.style.transform=`scale(${burst.toFixed(3)})`;
  }
  for(const hc of HK){
    const p=seg(t,hc.t0,0.5);
    const px=lerp(hc.sx,hc.ex,eio(p));
    const py=lerp(hc.sy,hc.ey,eio(p))-(ORIENT==='portrait'?90:70)*Math.sin(p*Math.PI);
    hc.el.style.opacity=clamp(seg(t,hc.t0,0.15)*(1-seg(t,10.2,0.3)),0,1).toFixed(3);
    hc.el.style.left=(px-P.candyD/2)+'px';
    hc.el.style.top=(py-P.candyD/2)+'px';
  }
  for(const qd of QUEUE){
    qd.el.style.opacity=(clamp(seg(t,qd.t0,0.25),0,1)*(1-seg(t,10.2,0.3))).toFixed(3);
  }
  {
    const so=clamp(seg(t,4.0,0.25)*(1-seg(t,10.2,0.3)),0,1);
    const hp=seg(t,4.2,0.4);
    const px=lerp(SISA.x,SISA.hx,eio(hp));
    const py=SISA.y-(ORIENT==='portrait'?62:52)*Math.sin(hp*Math.PI);
    SISA.el.style.opacity=so.toFixed(3);
    SISA.el.style.left=(px-SISA.el.offsetWidth/2)+'px';
    SISA.el.style.top=(py-SISA.el.offsetHeight/2)+'px';
    SISA.el.style.boxShadow=t>=5.2?'0 0 22px rgba(232,93,93,.8)':'0 3px 8px rgba(90,40,20,.3)';
  }
  {
    const qo=clamp(seg(t,4.8,0.45)*(1-seg(t,10.2,0.3)),0,1);
    QM.el.style.opacity=qo.toFixed(3);
    QM.el.style.transform=`translateY(${(-6+6*Math.sin(t*3)).toFixed(1)}px)`;
  }
  /* lingkaran bukti merah: muncul setelah tanda tanya, bergoyang ala tangan */
  {
    const ro=clamp(seg(t,4.9,0.45)*(1-seg(t,10.2,0.3)),0,1);
    const wob=1+0.06*Math.sin(t*5);
    RING1.el.style.opacity=ro.toFixed(3);
    RING1.el.style.transform=`rotate(-8deg) scale(${wob.toFixed(3)})`;
  }
  popA(stampHook,t,7.0,0.6,7,0,10.2);
  /* siluet Pencuri Rapi: mengintip di hook, tertangkap di babak penutup kasus */
  {
    let so=0,sx=-100;
    const sw=ORIENT==='portrait'?130:110, sh=ORIENT==='portrait'?160:135;
    if(t>=7.6&&t<10.2){
      so=clamp(seg(t,7.6,0.4),0,1)*(1-seg(t,9.6,0.6));
      sx=lerp(-100,34,eio(seg(t,7.6,0.8)));
      if(t>=9.6)sx=lerp(34,-100,eio(seg(t,9.6,0.6)));
    }else if(t>=56.4&&t<61.2){
      so=clamp(seg(t,56.6,0.3),0,1)*(1-seg(t,60.6,0.4));
      sx=(ORIENT==='portrait'?660:1180)-sw/2;
    }
    SHADOW.style.opacity=so.toFixed(3);
    SHADOW.style.left=sx.toFixed(1)+'px';
    const sway=Math.sin(t*1.4)*2;
    SHADOW.style.transform=`rotate(${sway.toFixed(2)}deg)`;
    SHADOW.dataset.cx=String(sx+sw/2);
    SHADOW.dataset.cy=String(P.groundY-sh-14+sh*0.45);
  }
  for(const xb of XBAR){
    let xo=0;
    if(t>=57.2&&t<61.0)xo=clamp(seg(t,57.2,0.35),0,1)*(1-seg(t,60.6,0.4));
    xb.el.style.opacity=xo.toFixed(3);
    xb.el.style.left=(parseFloat(SHADOW.dataset.cx)-xb.el.offsetWidth/2)+'px';
    xb.el.style.top=(parseFloat(SHADOW.dataset.cy)-xb.el.offsetHeight/2)+'px';
    xb.el.style.transform=`rotate(${xb.rot}deg) scale(${(1+0.1*Math.sin(clamp(seg(t,57.2,0.4),0,1)*Math.PI)).toFixed(3)})`;
  }
  popA(stampCatch,t,57.0,0.6,9,0,61.0);
  /* BUKTI 1: faktor */
  popA(panel1,t,11.4,0.6,5,0,22.8);
  popA(p1Big,t,11.8,0.5,5,0,22.8);
  for(const r of P1ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  for(const c of P1CHIPS){
    c.el.style.opacity=(clamp(seg(t,c.t0,0.35),0,1)*(1-seg(t,22.8,0.3))).toFixed(3);
  }
  popA(p1Note,t,17.8,0.5,5,0,22.8);
  popA(p1Note2,t,19.6,0.5,5,0,22.8);
  /* BUKTI 2: kelipatan + stoples besar (permen jatuh +4 tiap serangan) */
  popA(panel2,t,24.4,0.55,5,0,33.8);
  popA(p2Big,t,24.8,0.5,5,0,33.8);
  for(const r of P2ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  for(const c of P2CHIPS){
    c.el.style.opacity=(clamp(seg(t,c.t0,0.35),0,1)*(1-seg(t,33.8,0.3))).toFixed(3);
    if(c.ev){
      const hot=t<c.t0+0.9&&t>=c.t0;
      c.el.style.borderColor=hot?'#D93A3A':'rgba(232,179,46,0)';
      c.el.style.boxShadow=hot?'0 0 16px rgba(217,58,58,.55)':'0 8px 18px rgba(30,18,4,.4)';
    }
  }
  popA(p2Note,t,31.0,0.5,5,0,33.8);
  popA(p2Note2,t,32.0,0.5,5,0,33.8);
  popA(JARBIG.root,t,24.2,0.55,5,0,33.8);
  for(const bc of BIGC){
    const p=seg(t,bc.t0,0.35);
    const py=lerp(P.bigJarY-100,bc.slotTop,eio(p));
    bc.el.style.opacity=clamp(seg(t,bc.t0,0.15)*(1-seg(t,33.8,0.3)),0,1).toFixed(3);
    bc.el.style.top=(py)+'px';
    bc.el.style.transform=`scale(${(1+0.15*(1-p)).toFixed(3)})`;
  }
  /* JEDA DRAMATIS (ma) 33.6-34.4: layar kosong, mentor ke tengah, audio hening */
  /* DEDUKSI TWIST: terbatas vs tanpa batas - speedlines anime */
  popA(panelS,t,35.0,0.4,9,0,40.6);
  popA(sBig,t,35.4,0.5,7,0,40.6);
  for(const r of SROWS){ r.el.style.opacity=seg(t,r.t0,0.4).toFixed(3); }
  popA(sNote,t,39.2,0.45,5,0,40.6);
  /* RENCANA: prediksi 24 + jebakan bagi rata + piring tersusun ulang */
  popA(panel4,t,42.2,0.55,5,0,56.2);
  popA(p4Big,t,42.6,0.5,5,0,56.2);
  {
    const uw=160*eio(seg(t,43.8,0.5));
    ul24.style.opacity=seg(t,43.8,0.3).toFixed(3);
    ul24.style.width=uw.toFixed(1)+'px';
    ul24.style.left=(P.panelW/2-uw/2)+'px';
  }
  for(const r of P4ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  popA(jurus,t,46.4,0.5,9,0,56.2);
  popA(p4Note,t,49.0,0.45,5,0,56.2);
  popA(p4Note2,t,49.8,0.45,5,0,56.2);
  popA(plateEl,t,42.2,0.55,5,0,56.2);
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
  /* BERKAS KASUS BARU: papan uji (aturan 30 + framing battle 34) */
  popA(panelUji,t,62.2,0.55,5,0,71.6);
  ujiHd.style.opacity=(seg(t,62.4,0.35)*exo).toFixed(3);
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
  popA(ujiNote,t,66.2,0.45,5,0,71.6);
  popA(pil,t,67.8,0.6,6,0,71.6);
  /* penutup bersih (aturan 28) */
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
  /* power-up ala anime saat menyusun jebakan */
  const pu=smz(t,45.6,48.0,0.35);
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
  /* judul bab */
  for(let i=0;i<TITLES.length;i++){
    const o=TITLES[i];
    const tEnd=i+1<TITLES.length?TITLES[i+1].t0:71.8;
    const oin=seg(t,o.t0,0.35)*(1-seg(t,tEnd-0.25,0.3));
    const sc2=1+0.035*Math.sin(clamp(seg(t,o.t0,0.7),0,1)*Math.PI);
    o.el.style.opacity=oin.toFixed(3);
    o.el.style.transform=`scale(${sc2.toFixed(3)})`;
  }
  /* TWIST anime: speedlines 34.4 + spotlight, dan spotlight penangkapan 56.6 */
  {
    const iv=Math.max(0,(1-seg(t,34.4,0.55))*clamp(seg(t,34.4,0.06),0,1));
    speedEl.style.opacity=(iv*0.85).toFixed(3);
    const isc=1+0.14*Math.sin(clamp(seg(t,34.4,0.5),0,1)*Math.PI);
    speedEl.style.transform=`scale(${isc.toFixed(3)})`;
    const spotTwist=clamp(seg(t,35.0,0.3)*(1-seg(t,38.2,1.0)),0,1)*0.75;
    const spotCatch=clamp(seg(t,56.6,0.3)*(1-seg(t,59.0,1.0)),0,1)*0.8;
    spotEl.style.opacity=Math.max(spotTwist,spotCatch).toFixed(3);
  }
  /* endcard penutup bersih + teaser tersisip (aturan 32) */
  const eci=eio(seg(t,71.8,0.8));
  endcard.style.opacity=eci.toFixed(3);
  endcard.style.transform=`translateY(${((1-eci)*16).toFixed(1)}px) scale(${(0.94+0.06*eci).toFixed(3)})`;
  fBar.style.width=(seg(t,77.4,0.8)*P.barW).toFixed(0)+'px';
  renderSub(t);
  /* kamera: impact punch + push-in sinematik pada momen kunci */
  const im=imp(t);
  let push=0;
  for(const [pa,pb] of PUSHES){ push+=0.05*smz(t,pa,pb,0.35); }
  const shx=Math.sin(t*47)*2.5*im, shy=Math.sin(t*39+1.7)*1.8*im;
  world.style.transform=`translate(${shx.toFixed(2)}px,${(shy+Math.sin(t*0.35)*3).toFixed(2)}px) scale(${(1+push).toFixed(4)})`;
  flash.style.opacity=clamp(im*0.07+smz(t,56.4,56.7,0.05)*0.5,0,1).toFixed(3);
  fade.style.opacity=String(clamp(1-seg(t,0.05,0.5),0,1)*0.96+clamp(seg(t,79.8,0.8),0,1));
}
renderFrame(0);
window.__ready=true;
</script>
</body>
</html>
