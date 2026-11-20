/* ---------- narasi kios rev3: MISTERI PEMBAGI RAPI - alur detektif yang
   mengalir dan sepenuhnya positif (tanpa kejahatan) - 23 beat dalam 84 s
   (aturan 31). Arc: MISTERI (siapa yang diam-diam menata permen rata?) ->
   PETUNJUK 1 faktor -> PETUNJUK 2 kelipatan -> MA -> DEDUKSI twist
   memberdayakan (cara terbatas, peluang tanpa batas) -> RENCANA TERIMA
   KASIH 24 + JURUS BAGI RATA -> TERIMA KASIH (moral berbagi) -> MISI BARU
   (uji) + teaser. Panel meluncur, elemen bernapas, kamera hanyut. ---------- */
const SUBS=[
  [0.5,'Tadi malam, ada yang bekerja diam-diam.','Last night, someone worked in secret.','#FFFFFF'],
  [3.5,'Permen tertata rapi: empat per stoples!','Candies set neatly, four per jar!','#FFFFFF'],
  [6.5,'Siapa Pembagi Rapi itu, ya?','Who is the Tidy Divider, anyway?','#FFFFFF'],
  [10.9,'Petunjuk pertama: dia selalu bagi habis rata.','Clue one: the helper always shares evenly.','#FFFFFF'],
  [13.6,'Faktor 12: 1, 2, 3, 4, 6, 12.','Factors of 12: 1, 2, 3, 4, 6, 12.','#FFFFFF'],
  [16.8,'Cek lima: 12 dibagi 5, sisa dua. Belum rapi!','Check five: 12 by 5, remainder 2. Not neat!','#FFFFFF'],
  [19.8,'Makanya malam itu: satu jadi hadiah!','So that night: one became a gift!','#D97A2E'],
  [24.0,'Petunjuk kedua: catatan kunjungan rahasia.','Clue two: a secret visit log.','#FFFFFF'],
  [27.2,'Selalu kelipatan 4: 4, 8, 12, 16, 20!','Always multiples of 4: 4, 8, 12, 16, 20!','#D97A2E'],
  [30.4,'12: kelipatan 4 sekaligus faktor 12!','12: multiple of 4 and factor of 12!','#FFFFFF'],
  [35.6,'Faktor 6 cuma empat: 1, 2, 3, 6.','Factors of 6: just four: 1, 2, 3, 6.','#FFFFFF'],
  [38.6,'Cara berbagi terbatas, peluangnya tanpa batas!','Ways are limited, chances never end!','#D97A2E'],
  [42.4,'Prediksi detektif: stok diisi 24 malam ini!','Detective predicts: refill 24 tonight!','#FFFFFF'],
  [45.6,'Dua dapat 12, tiga 8, empat 6, enam 4.','Two get 12, three 8, four 6, six 4.','#FFFFFF'],
  [49.0,'Meja sambutan rata, sisa nol. Siap menyapa!','Fair welcome table, zero rest, all set!','#FFFFFF'],
  [52.2,'Malam tiba... kejutan 24 tertata rapi.','Night falls... the surprise of 24 is set.','#FFFFFF'],
  [56.6,'Pembagi Rapi menemukan kejutannya!','The Tidy Divider finds the surprise!','#FFE9A8'],
  [59.8,'Berbagi rata itu seru dan baik!','Sharing fairly is fun and kind!','#FFE9A8'],
  [62.8,'Misi baru: empat soal menantimu!','A new mission: four questions await!','#FFFFFF'],
  [66.0,'Delapan kartu bantu misi nomor satu.','Eight helper cards for mission one.','#FFFFFF'],
  [69.4,'Coba kerjakan dengan bahasamu sendiri!','Try answering in your own words!','#FFFFFF'],
  [72.8,'Terima kasih sudah menonton.','Thanks for watching.','#FFE9A8'],
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

/* ---------- judul bab (rata tengah, aturan 28) dengan slide-up mengalir ---------- */
const TITLES=[['t0',0.35],['t1',10.6],['t2',23.6],['t3',34.4],['t4',41.4],['t5',56.4],['t6',61.4]]
  .map(([id,t0],i)=>({el:document.getElementById(id),t0:t0,i:i}));
TITLES.forEach((o)=>{
  o.el.style.top=(o.i===0?P.titleY:P.titleY+14)+'px';
  const txt=o.el.textContent||'';
  o.el.style.fontSize=((o.i===0?P.titleS0:(txt.length>21?P.titleSN*0.84:P.titleSN)))+'px';
  if(o.i===0||o.i===2||o.i===4)o.el.style.color='#A6394B';
  if(o.i===5)o.el.style.color='#E8B32E';
});

/* ---------- beat, masterplan mentor (karpet festival, tak menembus properti) ---------- */
const IMP=[0.7,5.2,10.6,34.4,41.4,56.4,62.6,64.6];
const SPARKS=[[5.2,8.0],[46.6,49.0],[56.7,60.8],[66.8,69.4]];
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

/* panel meluncur masuk-keluar (aliran anime, bukan loncatan) */
function slideY(el,t,t0,op1,floatPh){
  const o=clamp(seg(t,t0,0.5)*(1-seg(t,op1,0.4)),0,1);
  const ty=34*(1-eio(seg(t,t0,0.5)))-26*eio(seg(t,op1,0.4))+Math.sin(t*1.1+floatPh)*2;
  el.style.opacity=o.toFixed(3);
  el.style.transform=`translateY(${ty.toFixed(1)}px)`;
}

/* ---------- RENDER PER FRAME ---------- */
const world=document.getElementById('world');
world.style.transformOrigin='50% 46%';
const flash=document.getElementById('flash');
const fade=document.getElementById('fade');
const tilesun=document.getElementById('tilesun');
let _roll=0,_mxPrev=null;
function renderFrame(t){
  /* MALAM AJAIB: gelap biru dari detik pertama, fajar hangat saat terima kasih */
  const darkP=1-seg(t,56.4,6.0);
  tilesun.style.background=`rgba(20,20,52,${(0.38*darkP).toFixed(3)})`;
  for(const L of LAMPS){
    const sw=Math.sin(t*0.8+L.ph)*1.8;
    L.lw.style.transform=`rotate(${sw.toFixed(2)}deg)`;
    L.glow.style.opacity=(0.45+0.45*(1-darkP)).toFixed(3);
  }
  for(const pl of POOLS){
    pl.el.style.opacity=(0.5*darkP+0.26*(1-darkP)).toFixed(3);
  }
  for(const f of FF){
    const fx=f.bx+Math.sin(t*0.45+f.ph)*34;
    const fy=f.by+Math.cos(t*0.37+f.ph)*26;
    const tw=Math.max(0,Math.sin(t*1.6+f.ph));
    f.el.style.opacity=(darkP*(0.10+0.5*tw)).toFixed(3);
    f.el.style.left=fx.toFixed(1)+'px';
    f.el.style.top=fy.toFixed(1)+'px';
  }
  /* penutup bersih (aturan 28): konten keluar di 71.6 */
  const exo=1-seg(t,71.6,0.5);
  /* MISTERI: tiga stoples terisi (permen terbang menata diri, bernapas halus) */
  for(const jj of HOOKJ){
    const o=clamp(seg(t,jj.t0,0.35)*(1-seg(t,10.2,0.3)),0,1);
    const burst=t>=5.2?1+0.07*Math.sin(clamp(seg(t,5.2,0.5),0,1)*Math.PI):1;
    jj.root.style.opacity=o.toFixed(3);
    jj.root.style.transform=`translateY(${Math.sin(t*1.6+jj.jx)*1.5}px) scale(${burst.toFixed(3)})`;
  }
  for(const hc of HK){
    const p=seg(t,hc.t0,0.5);
    const px=lerp(hc.sx,hc.ex,eio(p));
    const py=lerp(hc.sy,hc.ey,eio(p))-(ORIENT==='portrait'?90:70)*Math.sin(p*Math.PI);
    hc.el.style.opacity=clamp(seg(t,hc.t0,0.15)*(1-seg(t,10.2,0.3)),0,1).toFixed(3);
    hc.el.style.left=(px-P.candyD/2)+'px';
    hc.el.style.top=(py-P.candyD/2)+'px';
  }
  let qi=0;
  for(const qd of QUEUE){
    qd.el.style.opacity=(clamp(seg(t,qd.t0,0.25),0,1)*(1-seg(t,10.2,0.3))).toFixed(3);
    qd.el.style.transform=`translateY(${(Math.sin(t*2.4+qi*0.45)*2.5).toFixed(1)}px)`;
    qi++;
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
  /* lingkaran petunjuk merah: muncul setelah tanda tanya, bergoyang ala tangan */
  {
    const ro=clamp(seg(t,4.9,0.45)*(1-seg(t,10.2,0.3)),0,1);
    const wob=1+0.06*Math.sin(t*5);
    RING1.el.style.opacity=ro.toFixed(3);
    RING1.el.style.transform=`rotate(-8deg) scale(${wob.toFixed(3)})`;
  }
  popA(stampHook,t,7.0,0.6,7,0,10.2);
  /* Pembagi Rapi: cahaya hangat mengintip lalu menemukan kejutan */
  {
    const gw=ORIENT==='portrait'?170:150;
    let ho=0,hx=-260,hyh=0;
    if(t>=7.6&&t<10.2){
      ho=clamp(seg(t,7.6,0.5),0,1)*(1-seg(t,9.6,0.5))*0.85;
      hx=lerp(-120,120,eio(seg(t,7.6,0.9)));
      if(t>=9.6)hx=lerp(120,-120,eio(seg(t,9.6,0.6)));
      hyh=Math.sin(t*1.3)*10;
    }else if(t>=56.4&&t<61.2){
      ho=clamp(seg(t,56.6,0.4),0,1)*(1-seg(t,60.6,0.45))*0.95;
      hx=(ORIENT==='portrait'?660:1180)-gw/2;
      hyh=Math.sin(t*1.8)*8;
    }
    HELPER.style.opacity=ho.toFixed(3);
    HELPER.style.left=hx.toFixed(1)+'px';
    HELPER.style.top=(P.groundY-gw-60+hyh).toFixed(1)+'px';
    HELPER.style.transform=`scale(${(1+0.05*Math.sin(t*2.4)).toFixed(3)})`;
    const hcx=hx+gw/2, hcy=P.groundY-gw-60+hyh+gw/2;
    for(const ob of ORBS){
      const a=t*2.1+ob.ph;
      ob.el.style.opacity=(ho*0.9).toFixed(3);
      ob.el.style.left=(hcx+Math.cos(a)*56).toFixed(1)+'px';
      ob.el.style.top=(hcy+Math.sin(a)*38).toFixed(1)+'px';
    }
  }
  popA(stampCatch,t,57.0,0.6,9,0,61.0);
  /* PETUNJUK 1: faktor (panel meluncur + mengapung halus) */
  slideY(panel1,t,11.4,22.9,0.4);
  popA(p1Big,t,11.8,0.5,5,0,22.9);
  for(const r of P1ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  for(const c of P1CHIPS){
    c.el.style.opacity=(clamp(seg(t,c.t0,0.35),0,1)*(1-seg(t,22.9,0.3))).toFixed(3);
  }
  popA(p1Note,t,17.8,0.5,5,0,22.9);
  popA(p1Note2,t,19.6,0.5,5,0,22.9);
  /* PETUNJUK 2: kelipatan + stoples besar (permen jatuh +4 tiap kunjungan) */
  slideY(panel2,t,24.4,33.7,1.3);
  popA(p2Big,t,24.8,0.5,5,0,33.7);
  for(const r of P2ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  for(const c of P2CHIPS){
    c.el.style.opacity=(clamp(seg(t,c.t0,0.35),0,1)*(1-seg(t,33.7,0.3))).toFixed(3);
    if(c.ev){
      const hot=t<c.t0+0.9&&t>=c.t0;
      c.el.style.borderColor=hot?'#D93A3A':'rgba(232,179,46,0)';
      c.el.style.boxShadow=hot?'0 0 16px rgba(217,58,58,.55)':'0 8px 18px rgba(30,18,4,.4)';
    }
  }
  popA(p2Note,t,31.0,0.5,5,0,33.7);
  popA(p2Note2,t,32.0,0.5,5,0,33.7);
  popA(JARBIG.root,t,24.2,0.55,5,0,33.7);
  for(const bc of BIGC){
    const p=seg(t,bc.t0,0.35);
    const py=lerp(P.bigJarY-100,bc.slotTop,eio(p));
    bc.el.style.opacity=clamp(seg(t,bc.t0,0.15)*(1-seg(t,33.7,0.3)),0,1).toFixed(3);
    bc.el.style.top=(py)+'px';
    bc.el.style.transform=`scale(${(1+0.15*(1-p)).toFixed(3)})`;
  }
  /* JEDA DRAMATIS (ma) 33.6-34.4: layar kosong, mentor ke tengah, audio hening */
  /* DEDUKSI TWIST memberdayakan: speedlines anime */
  slideY(panelS,t,35.0,40.6,2.2);
  popA(sBig,t,35.4,0.5,7,0,40.6);
  for(const r of SROWS){ r.el.style.opacity=seg(t,r.t0,0.4).toFixed(3); }
  popA(sNote,t,39.2,0.45,5,0,40.6);
  /* RENCANA TERIMA KASIH: prediksi 24 + jurus bagi rata + meja sambutan */
  slideY(panel4,t,42.2,56.1,3.1);
  popA(p4Big,t,42.6,0.5,5,0,56.1);
  {
    const uw=160*eio(seg(t,43.8,0.5));
    ul24.style.opacity=seg(t,43.8,0.3).toFixed(3);
    ul24.style.width=uw.toFixed(1)+'px';
    ul24.style.left=(P.panelW/2-uw/2)+'px';
  }
  for(const r of P4ROWS){ r.el.style.opacity=seg(t,r.t0,0.45).toFixed(3); }
  popA(jurus,t,46.4,0.5,9,0,56.1);
  popA(p4Note,t,49.0,0.45,5,0,56.1);
  popA(p4Note2,t,49.8,0.45,5,0,56.1);
  popA(plateEl,t,42.2,0.55,5,0,56.1);
  let pi2=0;
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
    const po=clamp(seg(t,pd.t0,0.25)*(1-seg(t,56.1,0.3)),0,1);
    pd.el.style.opacity=po.toFixed(3);
    pd.el.style.left=(px-P.plateD/2)+'px';
    pd.el.style.top=(py-P.plateD/2)+'px';
    pd.el.style.transform=`translateY(${(Math.sin(t*2+pi2*0.35)*2).toFixed(1)}px)`;
    pi2++;
  }
  /* MISI BARU: papan uji (aturan 30 + framing battle 34) */
  slideY(panelUji,t,62.2,71.6,4.2);
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
  /* mentor menggelinding di karpet festival, bernapas pelan saat diam */
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
  let hy2=-(0.5+0.5*Math.sin(t*2.1))*3, lrot=0, drot=0, txj=0;
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
  /* power-up ala anime saat menyiapkan kejutan terima kasih */
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
  /* judul bab: slide-up + fade mengalir */
  for(let i=0;i<TITLES.length;i++){
    const o=TITLES[i];
    const tEnd=i+1<TITLES.length?TITLES[i+1].t0:71.8;
    const oin=seg(t,o.t0,0.35)*(1-seg(t,tEnd-0.2,0.35));
    const sc2=1+0.035*Math.sin(clamp(seg(t,o.t0,0.7),0,1)*Math.PI);
    const ty2=16*(1-eio(seg(t,o.t0,0.4)));
    o.el.style.opacity=oin.toFixed(3);
    o.el.style.transform=`translateY(${ty2.toFixed(1)}px) scale(${sc2.toFixed(3)})`;
  }
  /* TWIST anime: speedlines 34.4 + spotlight deduksi dan ucapan terima kasih */
  {
    const iv=Math.max(0,(1-seg(t,34.4,0.55))*clamp(seg(t,34.4,0.06),0,1));
    speedEl.style.opacity=(iv*0.85).toFixed(3);
    const isc=1+0.14*Math.sin(clamp(seg(t,34.4,0.5),0,1)*Math.PI);
    speedEl.style.transform=`scale(${isc.toFixed(3)})`;
    const spotTwist=clamp(seg(t,35.0,0.3)*(1-seg(t,38.2,1.0)),0,1)*0.75;
    const spotReveal=clamp(seg(t,56.6,0.3)*(1-seg(t,59.0,1.0)),0,1)*0.8;
    spotEl.style.opacity=Math.max(spotTwist,spotReveal).toFixed(3);
  }
  /* endcard penutup bersih + teaser tersisip (aturan 32) */
  const eci=eio(seg(t,71.8,0.8));
  endcard.style.opacity=eci.toFixed(3);
  endcard.style.transform=`translateY(${((1-eci)*16).toFixed(1)}px) scale(${(0.94+0.06*eci).toFixed(3)})`;
  fBar.style.width=(seg(t,77.4,0.8)*P.barW).toFixed(0)+'px';
  renderSub(t);
  /* kamera: hanyut pelan terus-menerus + impact punch + push-in momen kunci */
  const im=imp(t);
  let push=0;
  for(const [pa,pb] of PUSHES){ push+=0.05*smz(t,pa,pb,0.35); }
  const shx=Math.sin(t*47)*2.5*im+Math.sin(t*0.21)*5;
  const shy=Math.sin(t*39+1.7)*1.8*im+Math.cos(t*0.15)*3.5+Math.sin(t*0.35)*2;
  world.style.transform=`translate(${shx.toFixed(2)}px,${shy.toFixed(2)}px) scale(${(1+push).toFixed(4)})`;
  flash.style.opacity=clamp(im*0.07+smz(t,56.4,56.7,0.05)*0.4,0,1).toFixed(3);
  fade.style.opacity=String(clamp(1-seg(t,0.05,0.5),0,1)*0.96+clamp(seg(t,79.8,0.8),0,1));
}
renderFrame(0);
window.__ready=true;
</script>
</body>
</html>
