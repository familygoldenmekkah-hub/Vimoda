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

/* ---------- beat, masterplan mentor, tatapan, gestur ---------- */
const SCENE_T=[6.6,17.0,25.9,32.9,40.2];
const IMP=[0.6,6.6,17.0,25.9,32.9,40.2,13.76,23.47,29.65,44.14,49.0];
const SPARKS=[[39.3,40.2],[47.5,51.2]];
const SPLIT=[[10.4,11.35],[38.6,39.8]];
const GESTS=[
  [1.3,0.8,'nod',3],
  [4.9,0.7,'shiver',5],
  [7.0,1.7,'count',18],
  [8.9,0.6,'shiver',4],
  [17.6,0.9,'nod',3],
  [19.6,0.6,'tilt',3],
  [23.5,1.3,'spin',720],
  [27.0,0.5,'tilt',3],
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
/* titik tatapan mentor (fungsi murni dari P) */
const LOOK=[
  [0.8,P.plqX0+P.plqGap,P.plqY+30],
  [2.6,W/2,P.groundY-560],
  [6.9,P.shopX[0]+P.shopW/2,P.shopY+P.shopH*0.45],
  [8.8,P.shopX[1]+P.shopW/2,P.shopY+P.shopH*0.45],
  [10.4,P.shopX[2]+P.shopW/2,P.shopY+P.shopH*0.45],
  [12.2,P.shopX[3]+P.shopW/2,P.shopY+P.shopH*0.45],
  [15.5,W/2,P.backY-40],
  [17.6,P.friendX[0],P.backY-55],
  [20.0,P.friendX[3],P.backY-55],
  [23.6,P.friendX[4],P.backY-55],
  [27.0,P.friendX[0],P.backY-45],
  [31.8,P.friendX[4],P.backY-45],
  [36.7,P.slateX+P.slateW/2,P.slateBot-P.slateH*0.5],
  [41.2,W/2,P.ctaY+P.ctaH*0.5],
  [45.9,W/2,P.ctaY+P.ctaH*0.35],
  [50.3,W/2,P.ctaY+P.ctaH*0.5]
];
function lookAt(t){
  let a=LOOK[0];
  for(let k=0;k<LOOK.length-1;k++){
    if(t>=LOOK[k][0]&&t<LOOK[k+1][0]){
      const p=eio(seg(t,LOOK[k][0],LOOK[k+1][0]-LOOK[k][0]));
      return [lerp(LOOK[k][1],LOOK[k+1][1],p),lerp(LOOK[k][2],LOOK[k+1][2],p)];
    }
  }
  return [LOOK[LOOK.length-1][1],LOOK[LOOK.length-1][2]];
}
const blinkK=(t,ph)=>{const c=(t+ph)%3.9;return c<0.1?0.12:1;};
function setEyes(ch,t,lx,ly,headX,headY){
  const k=blinkK(t,ch.ph);
  ch.eyes.style.transform=`scaleY(${k.toFixed(3)})`;
  let dx=lx-headX, dy=ly-headY;
  const m=Math.hypot(dx,dy)||1;
  const r=(ch.d*0.045)/m;
  dx*=r;dy*=r*k;
  ch.pupils.forEach(pu=>{ pu.el.style.transform=`translate(${dx.toFixed(1)}px,${dy.toFixed(1)}px)`; });
}
/* lompatan arka (naik lalu mendarat) */
function hopY(p,h){ return -h*Math.sin(Math.PI*clamp(p,0,1)); }

/* mobil: tiga lewat di jalan (di belakang trotoar, tak pernah bertemu bola) */
const PASSES=[[2.6,4.4,1,0],[9.2,11.2,-1,1],[14.6,16.4,1,0]];

/* ---------- RENDER PER FRAME ---------- */
const world=document.getElementById('world');
const flash=document.getElementById('flash');
const fade=document.getElementById('fade');
const skydusk=document.getElementById('skydusk');
let _roll=0;
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
  /* lampu jalan: menyala saat senja */
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

  /* papan tulis kafe (S4): keluarga sudah pamit, papan berdiri sendiri di depan */
  popA(slate,t,36.7,0.6,6,0,40.15);
  /* podium tangga (S3): muncul sebelum teman melompat, pergi saat keluarga pamit */
  for(const st of STEPS){ popA(st.el,t,st.t0,0.45,6,0,34.4); }

  /* teman bola: pantul masuk (S2), lompat ke podium (S3), pamit menggelinding
     keluar saat S4 agar fokus ke aturan, kembali menggelinding masuk di S5 */
  FRIENDS.forEach((f,i)=>{
    const d=f.ball.d, fx=P.friendX[i];
    const stepTop=P.backY-(i+1)*P.stepRise;
    const downT0=33.2+i*0.1, outT0=33.9+i*0.08, inT0=40.5+i*0.1;
    const exitX=i<3?-120:W+120, inEdge=exitX;
    let y=P.backY, x=fx, vis=0, lrot=0, arc=0, rot=0, idleY=0;
    const pIn=seg(t,f.t0,0.85);
    if(pIn>0&&t<outT0+0.9){
      vis=1;
      const land=eoe(clamp(pIn*1.3,0,1));
      y=P.backY-170*(1-land);
      if(pIn>0.62&&pIn<1){ arc=-16*Math.sin(Math.PI*seg(pIn,0.62,0.38)); }
      if(t>f.t0+0.85&&t<f.t0+1.75){ lrot=Math.sin(seg(t,f.t0+0.85,0.9)*Math.PI*3)*7; }
    }
    if(t>=f.hopT0&&t<downT0){
      const p=seg(t,f.hopT0,0.55);
      y=lerp(P.backY,stepTop,eio(clamp(p*1.4,0,1)))+hopY(Math.min(p*1.5,1),64);
    }else if(t>=downT0&&t<outT0){
      const p=seg(t,downT0,0.55);
      y=lerp(stepTop,P.backY,eio(clamp(p*1.4,0,1)))+hopY(Math.min(p*1.5,1),56);
    }
    if(t>=outT0&&t<outT0+1.0){
      const p=seg(t,outT0,0.85);
      x=lerp(fx,exitX,eio(p));
      rot=(x-fx)/(d/2)*(180/Math.PI)*0.5;
      vis=1-seg(t,outT0+0.55,0.4);
    }else if(t>=inT0){
      const p=seg(t,inT0,0.85);
      x=lerp(inEdge,fx,eio(p));
      rot=(x-fx)/(d/2)*(180/Math.PI)*0.5;
      vis=seg(t,inT0+0.05,0.3);
      if(t>inT0+0.9&&t<inT0+1.8){ lrot=Math.sin(seg(t,inT0+0.9,0.9)*Math.PI*3)*7; }
    }
    /* perayaan S5: semua melompat kecil serempak */
    if(t>=49.0&&t<49.9){ arc+=-30*Math.sin(Math.PI*seg(t,49.0+i*0.06,0.55)); }
    /* idle napas halus saat berdiri di posisi */
    if(vis>0.9&&x===fx) idleY=-Math.abs(Math.sin(t*2.1+i*1.3))*3;
    f.ball.el.style.opacity=String(clamp(vis,0,1));
    f.ball.el.style.left=x.toFixed(1)+'px';
    f.ball.el.style.top=(y-idleY+arc).toFixed(1)+'px';
    f.ball.el.style.transform=`rotate(${(lrot+rot).toFixed(2)}deg)`;
    f.sh.style.opacity=(clamp(vis,0,1)*0.5).toFixed(2);
    f.sh.style.left=x.toFixed(1)+'px';
    f.sh.style.top=(P.backY-8)+'px';
    f.sh.style.transform=`scaleX(${clamp(1+(y-P.backY)*0.002,0.6,1.15).toFixed(3)})`;
    /* piringan: muncul saat teman datang, ikut pamit, kembali saat S5 */
    const pO=seg(t,f.t0+0.3,0.5)*(1-seg(t,33.6,0.5))+seg(t,40.9+i*0.1,0.4);
    f.pl.style.opacity=clamp(pO,0,1).toFixed(3);
    /* mata: menatap mentor, atau ke pemirsa saat jadi bintang */
    const active=(t>=f.t0&&t<f.t0+2.4)||(t>=f.hopT0&&t<f.hopT0+1.3)||
      (t>=inT0&&t<inT0+1.9)||(t>=48.9&&t<50.2);
    const hx=x, hy=y-d*0.55;
    if(active){ setEyes(f.ball,t,hx,hy-60,hx,hy); }
    else{ setEyes(f.ball,t,mx,hMentor,hx,hy); }
  });

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
      if(gt==='tilt'||gt==='lean'){ lrot+=(gt==='lean'?ga:ga)*w; }
      else if(gt==='nod'){ lrot+=ga*Math.sin(p*2*Math.PI); }
      else if(gt==='spin'){ drot+=ga*eio(p); }
      else if(gt==='count'){ hy2-=ga*Math.abs(Math.sin(p*5*Math.PI))*(1-p*0.2); }
      else if(gt==='shiver'){ txj=ga*Math.sin(p*40)*(1-p); }
      else if(gt==='jump'){ hy2-=ga*4*p*(1-p); }
    }
  }
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
  const uni=1;
  mx=bx;
  hMentor=P.groundY-P.ballD*0.55;
  mentor.el.style.left=bx.toFixed(1)+'px';
  mentor.el.style.opacity=String(clamp(ep*3,0,1));
  mentor.el.style.top=(P.groundY-P.ballD+hy2).toFixed(1)+'px';
  mentor.el.style.transform=`translateX(${txj.toFixed(1)}px) rotate(${(_roll+lrot+drot).toFixed(2)}deg) scale(${(uni*bsa).toFixed(3)})`;
  setEyes(mentor,t,...lookAt(t),bx,P.groundY-P.ballD*0.55);
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

  /* CTA: papan pengumuman; AKIOMIDA.COM hanya menyala di akhir, reveal tenang */
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
/* state mentor lintas frame */
let mx=WAY[0][1], hMentor=P.groundY-P.ballD*0.55, _mxPrev=null;
renderFrame(0);
window.__ready=true;
</script>
</body>
</html>
