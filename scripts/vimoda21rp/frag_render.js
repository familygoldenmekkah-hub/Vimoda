/* ---------- LARI PAGI rev23: render per frame, MODEL FOKUS, desain
   PAGI CERIA (otak/DESAIN-PAGI.md), produksi 9:16 SAJA
   ala referensi chat story yang diupload pemilik: SATU bubble fokus
   besar di tengah layar hitam (pesan lama memudar begitu balasan datang),
   kartu ilustrasi hard-cut di sela babak, kamera hanyut di #rig, punch
   momen, dolly zoom foto, reveal ??? slow-motion, diagram menyala, papan
   slide-up, endcard tenang, tanpa indikator pengetikan sama sekali.
   rev15-16: semua waktu dari TM (frag_time.js) mengikuti durasi voice. ---------- */
const SUBS2=SUBS;
let subIdx=-1;
let scrollCur=0;
const rigEl=document.getElementById('rig');
function renderSub(t){
  let i=0;
  for(let k=0;k<SUBS2.length;k++){ if(t>=SUBS2[k][0]-0.001) i=k; }
  const nxt=i+1<SUBS2.length?SUBS2[i+1][0]:TM.dur;
  const o=clamp(Math.min(seg(t,SUBS2[i][0],0.28), 1-seg(t,nxt-0.18,0.18)),0,1);
  if(i!==subIdx){
    subIdx=i;
    subEn.textContent=SUBS2[i][1];
  }
  subbar.style.opacity=(o*0.97).toFixed(3);
  const pop=1+0.014*Math.sin(clamp(seg(t,SUBS2[i][0],0.5),0,1)*Math.PI);
  subbar.style.transform=`translateX(-50%) scale(${pop.toFixed(3)})`;
}
const IMPS=TM.imps;
function imp(t){
  let a=0;
  for(const [s,e] of IMPS){
    const d=t-s;
    if(d>=0&&d<(e-s)*0.5){ const p=d/((e-s)*0.5); a=Math.max(a,(1-p)*0.8); }
  }
  return a;
}
/* momen dolly zoom sinematik: slot dari TM (foto, twist, reveal ???) */
const DOLLYS=TM.dollys;
/* shake masuk sisipan meme (hard cut ala referensi) */
function memeShake(t){
  let a=0;
  for(const mm of MEMES){
    if(mm.t0===0.4) continue;
    const d=t-mm.t0;
    if(d>=0&&d<0.34) a=Math.max(a,(1-d/0.34)*9);
  }
  return a;
}
let cutFlash=0;
function renderFrame(t){
  /* latar doodle melayang pelan (lebih redup di kanvas hitam) */
  for(const d of DOODLES){
    const fx=parseFloat(d.el.style.left);
    const fy=parseFloat(d.el.style.top);
    d.el.style.opacity=(0.24+0.14*Math.sin(t*0.4+d.ph)).toFixed(3);
    d.el.style.transform=`translate(${(Math.sin(t*0.22+d.ph)*18).toFixed(1)}px,${(Math.cos(t*0.18+d.ph)*14).toFixed(1)}px)`;
  }
  /* kamera: napas + punch momen + dolly zoom + shake sisipan */
  const im=imp(t);
  const shk=memeShake(t);
  const px=Math.sin(t*0.21)*5+Math.sin(t*47)*2.2*im+Math.sin(t*57)*shk;
  const py=Math.cos(t*0.15)*4+Math.sin(t*39+1.7)*1.6*im+Math.cos(t*61)*shk*0.7;
  let push=0;
  for(const [s,e] of IMPS){ push+=0.05*smz(t,s,e,0.8); }
  for(const [a,b,amt] of DOLLYS){ push+=amt*smz(t,a,b,0.9); }
  rigEl.style.transform=`translate(${px.toFixed(2)}px,${py.toFixed(2)}px) scale(${(1+push).toFixed(4)})`;
  /* INTRO FILM rev18: kartu judul full-bleed -> kartu produksi; slot TM.intro */
  {
    const o1=seg(t,I1[0],0.6)*(1-seg(t,I1[1]-0.5,0.5));
    intro1El.style.display=o1>0.005?'block':'none';
    intro1El.style.opacity=o1.toFixed(3);
    introimg.style.transform=`scale(${(1+0.07*clamp(seg(t,I1[0],I1[1]-I1[0]),0,1)).toFixed(4)})`;
    const k1=eio(seg(t,I1[0]+0.35,0.7));
    const o1t=k1*(1-seg(t,I1[1]-0.35,0.35));
    introtitleEl.style.opacity=o1t.toFixed(3);
    introtitleEl.style.transform=`translateY(${(18*(1-k1)).toFixed(1)}px)`;
    introruleEl.style.width=(o1t*Math.min(W*0.42,430)).toFixed(0)+'px';
    const o2=seg(t,I2[0],0.55)*(1-seg(t,I2[1]-0.5,0.5));
    intro2El.style.display=o2>0.005?'flex':'none';
    intro2El.style.opacity=o2.toFixed(3);
    const k2=eio(seg(t,I2[0]+0.25,0.7));
    i2kick.style.opacity=k2.toFixed(3);
    i2kick.style.transform=`translateY(${(12*(1-k2)).toFixed(1)}px)`;
    i2name.style.opacity=k2.toFixed(3);
    i2name.style.transform=`translateY(${(18*(1-k2)).toFixed(1)}px)`;
    i2line.style.width=(k2*Math.min(W*0.34,360)).toFixed(0)+'px';
    i2tag.style.opacity=eio(seg(t,I2[0]+0.85,0.6)).toFixed(3);
    i2shim.style.transform=`translateX(${(-W*0.25+seg(t,I2[0]+0.3,I2[1]-I2[0]-0.6)*W*1.45).toFixed(0)}px) skewX(-18deg)`;
  }
  /* MODEL FOKUS: bubble pop besar dengan rotasi kecil; memudar begitu
     pesan berikutnya datang +1.05 s, jadi maksimal dua bubble di layar
     dan mata terkunci ke pesan terbaru */
  cutFlash=0;
  let focus=null;
  for(const x of MSGE){
    if(t>=x.m.t0){
      const pd=x.m.kind==='photo'?0.8:(x.m.who==='PUSAT'?0.95:0.62);
      const p=clamp(seg(t,x.m.t0,pd),0,1);
      const popS=1+(x.m.who==='PUSAT'?0.03:0.06)*Math.sin(p*Math.PI);
      const fo=clamp(1-seg(t,x.nt+1.05,0.55),0,1);
      x.el.style.opacity=(p*fo).toFixed(3);
      x.el.style.transform=`translateY(${(30*(1-eio(p))).toFixed(1)}px) rotate(${(x.rot*(1-eio(p))).toFixed(2)}deg) scale(${((0.82+0.18*eio(p))*popS).toFixed(4)})`;
      if(x.m.svgEl){ /* Ken Burns foto: zoom pelan 1 -> 1.06 */
        x.m.svgEl.style.transform=`scale(${(1+0.06*eio(seg(t,x.m.t0,4.2))).toFixed(4)})`;
      }
      focus=x;
    }
  }
  /* fokus ke tengah layar: scroll pelan mengunci bubble terbaru */
  if(focus){
    const target=focus.top+focus.h/2+P.headH-P.focusY;
    if(Math.abs(target-scrollCur)>600)scrollCur=target;
    scrollCur+=(target-scrollCur)*0.14;
    chatEl.style.transform=`translateY(${(-scrollCur).toFixed(1)}px)`;
  }
  /* fade transisi antar bab (menyatu dengan hard cut kartu); slot dari TM */
  let dip=0;
  for(const fd of TM.dips){ dip=Math.max(dip,0.12*smz(t,fd-0.08,fd+0.52,0.3)); }
  /* sisipan reaksi meme: hard cut, glyph zoom lambat ala meme, mata
     menyala, digit naik, label waktu babak dari DIVS */
  for(const mm of MEMES){
    const s=mm.t0-0.04, e=mm.t0+mm.win;
    if(t>=s&&t<e){
      const p=clamp(seg(t,s,mm.win),0,1);
      mm.el.style.opacity='1';
      mm.st.style.transform=`scale(${(1.14+0.16*p).toFixed(3)})`;
      const sk=memeShake(t);
      mm.el.style.transform=`translate(${(Math.sin(t*67)*sk*0.6).toFixed(1)}px,${(Math.cos(t*71)*sk*0.5).toFixed(1)}px)`;
      if(mm.eyes){
        const eo=0.6+0.4*Math.sin(t*9);
        for(const iEl of mm.eyes.children){ iEl.style.opacity=eo.toFixed(3); }
      }
      mm.digits.forEach((dEl,j)=>{
        const dp=clamp(seg(t,s+0.1+j*0.12,1.2),0,1);
        dEl.style.opacity=(dp*0.85).toFixed(3);
        dEl.style.transform=`translateY(${(-70*dp).toFixed(1)}px) rotate(${(-14+7*j).toFixed(0)}deg)`;
      });
      mm.tx.style.opacity=clamp(seg(t,s+0.14,0.3),0,1).toFixed(3);
      mm.tx.style.transform=`translateY(${(14*(1-eio(seg(t,s+0.14,0.4)))).toFixed(1)}px)`;
      mm.sub.style.opacity=clamp(seg(t,s+0.3,0.35),0,1).toFixed(3);
      cutFlash=Math.max(cutFlash,clamp(smz(t,s,s+0.1,0.04)*0.14,0,1));
    }else{
      mm.el.style.opacity='0';
      mm.tx.style.opacity='0';
      mm.sub.style.opacity='0';
    }
  }
  /* angka desimal naik pelan di babak hitungan; jendela dari TM */
  for(const r of RISES){
    if(t>=TM.rises[0]&&t<TM.rises[1]){
      const p=(t-TM.rises[0])/(TM.rises[1]-TM.rises[0]);
      r.el.style.opacity=(0.3*Math.sin(p*Math.PI)).toFixed(3);
      r.el.style.transform=`translateY(${(H+60-p*(H+170)).toFixed(0)}px) rotate(${(Math.sin(t*0.7+r.ph)*10).toFixed(1)}deg)`;
    }else{
      r.el.style.opacity='0';
    }
  }
  /* DIAGRAM MENYALA (tiga momen ala anime sains) */
  let fOn=null;
  for(const f of FLASHES){ if(t>=f.t0&&t<f.t1) fOn=f; }
  if(fOn){
    const fIdx=FLASHES.indexOf(fOn);
    const finDur=fIdx===2?0.5:0.28; /* twist masuk lebih lambat: rasa slow motion */
    const fin=seg(t,fOn.t0,finDur), fout=1-seg(t,fOn.t1-0.42,0.42);
    const o=clamp(Math.min(fin,fout),0,1);
    dimEl.style.opacity=(o*0.78).toFixed(3);
    flashEl.style.opacity=o.toFixed(3);
    const sc=0.94+0.08*eout(fin)-0.03*seg(t,fOn.t1-0.32,0.32);
    flashEl.style.transform=`scale(${sc.toFixed(4)})`;
    fKick.textContent=fOn.kick;
    fTitle.textContent=fOn.title;
    fEn.textContent=fOn.en;
    fKick.style.opacity=o.toFixed(3);
    fTitle.style.opacity=o.toFixed(3);
    fTitle.style.transform=`translateY(${(16*(1-eio(fin))).toFixed(1)}px) scale(${(1+0.03*Math.sin(clamp(fin,0,1)*Math.PI)).toFixed(3)})`;
    fEn.style.opacity=(o*0.9).toFixed(3);
    fGlow.style.opacity=(o*0.85).toFixed(3);
    fGlow.style.transform=`translate(${(Math.sin(t*0.9)*60).toFixed(1)}px,${(Math.cos(t*0.7)*40).toFixed(1)}px)`;
    const idx=FLASHES.indexOf(fOn);
    const body=FLASHBODY[idx];
    body.w.style.display='flex';
    for(let j=0;j<FLASHBODY.length;j++){ if(j!==idx) FLASHBODY[j].w.style.display='none'; }
    /* DIAGRAM rev22: animasi per varian (boxes/vote/duo) */
    const R=body.R;
    const mode=fOn.ruler;
    if(mode==='boxes'){
      for(let bi=0;bi<R.cells.length;bi++){
        const pb=eio(seg(t,fOn.t0+0.45+bi*0.07,0.4));
        R.cells[bi].style.opacity=pb.toFixed(3);
        R.cells[bi].style.transform=`translateY(${(14*(1-pb)).toFixed(1)}px)`;
      }
    }else if(mode==='vote'){
      const p1=eio(seg(t,fOn.t0+0.5,0.9));
      R.A.fill.style.width=(R.A.pct*100*p1).toFixed(2)+'%';
      R.B.fill.style.width=(R.B.pct*100*eio(seg(t,fOn.t0+0.75,0.9))).toFixed(2)+'%';
      const vo=clamp(seg(t,fOn.t0+0.9,0.5),0,1);
      R.A.pv.textContent=Math.round(R.A.pct*100)+'%';
      R.B.pv.textContent=Math.round(R.B.pct*100)+'%';
      R.A.pv.style.opacity=vo.toFixed(3);
      R.B.pv.style.opacity=vo.toFixed(3);
    }else{ /* duo: dua lajur buku lama vs buku baru */
      R.A.fill.style.width=(100*eio(seg(t,fOn.t0+0.45,0.8))).toFixed(2)+'%';
      R.B.fill.style.width=(100*eio(seg(t,fOn.t0+0.95,0.8))).toFixed(2)+'%';
      R.A.fill.style.opacity='0.85';
      R.B.fill.style.opacity='0.85';
    }
    for(const ln of body.lines){
      ln.el.style.opacity=clamp(seg(t,fOn.t0+1.0,0.45),0,1).toFixed(3);
    }
    for(let ni=0;ni<body.notes.length;ni++){
      body.notes[ni].el.style.opacity=clamp(seg(t,fOn.t0+1.95+ni*0.5,0.45),0,1).toFixed(3);
    }
    cutFlash=Math.max(cutFlash,clamp(smz(t,fOn.t0,fOn.t0+0.16,0.05)*0.16,0,1));
  }else{
    dimEl.style.opacity='0';
    flashEl.style.opacity='0';
    for(const b of FLASHBODY) b.w.style.display='none';
  }
  flashwhite.style.opacity=cutFlash.toFixed(3);
  /* burst konfeti gambar (rev14: bukan emoji) */
  for(const pt of BPARTS){
    const b=BURSTS[pt.bi];
    if(t>=b.t0&&t<b.t1){
      const p=seg(t,b.t0,b.t1-b.t0);
      const rise=Math.sin(p*Math.PI);
      const ox=Math.cos(pt.a)*b.rad*(0.4+0.6*p)*pt.d;
      const oy=Math.sin(pt.a)*b.rad*0.62*(0.4+0.6*p)*pt.d-p*40;
      const cx=W/2;
      const cy=ORIENT==='portrait'?H*0.42:H*0.44;
      pt.el.style.opacity=(rise*0.95).toFixed(3);
      pt.el.style.transform=`translate(${(cx+ox-30).toFixed(0)}px,${(cy+oy-30).toFixed(0)}px) scale(${(0.7+0.6*rise).toFixed(3)}) rotate(${(p*90*(pt.d>1?1:-1)).toFixed(0)}deg)`;
    }else{
      pt.el.style.opacity='0';
    }
  }
  /* overlay MISI BARU (aturan 30); slot dari TM */
  {
    const qin=eio(seg(t,TM.quiz[0],0.6));
    const qout=1-seg(t,TM.quiz[1],0.5);
    const qo=clamp(Math.min(qin,qout),0,1);
    quizEl.style.opacity=qo.toFixed(3);
    quizEl.style.transform=`translateY(${((1-qin)*46-(1-qout)*40).toFixed(1)}px) scale(${(0.96+0.04*qin).toFixed(3)})`;
    for(const r of UJIS){ r.el.style.opacity=seg(t,r.t0,0.35).toFixed(3); }
    for(let i=0;i<CARDS.length;i++){
      const cc=CARDS[i];
      const inA=clamp(seg(t,cc.pop,0.35),0,1);
      const dir=i%2===0?-1:1;
      const s2=1+0.09*Math.sin(clamp(seg(t,cc.pop,0.4),0,1)*Math.PI);
      cc.el.style.opacity=(inA*qo).toFixed(3);
      cc.el.style.transform=`translateX(${((1-inA)*46*dir).toFixed(1)}px) rotate(${((1-inA)*10*dir).toFixed(2)}deg) scale(${s2.toFixed(3)})`;
      cc.el.style.borderColor=inA>0.9&&t<cc.pop+0.45?'#E8B32E':'#C8A86E';
    }
    qnoteEl.style.opacity=(seg(t,TM.quiz[0]+3.9,0.4)*qo).toFixed(3);
    const cpo=eio(seg(t,TM.quiz[0]+5.7,0.5));
    qctaEl.style.opacity=(cpo*qo).toFixed(3);
    qctaEl.style.transform=`translateX(${((1-cpo)*30).toFixed(1)}px) scale(${(1+0.02*Math.sin(clamp(seg(t,TM.quiz[0]+5.7,0.6),0,1)*Math.PI)).toFixed(3)})`;
  }
  /* penutup bersih (aturan 28): konten teaser keluar, endcard sendirian */
  document.getElementById('phead').style.opacity=String(clamp(1-seg(t,TM.end[0],0.35),0,1));
  for(const x of MSGE){ if(t>=TM.end[0]) x.el.style.opacity=String(clamp(1-seg(t,TM.end[0],0.35),0,1)*parseFloat(x.el.style.opacity||'1')); }
  const eci=eio(seg(t,TM.end[1],0.8));
  endcard.style.opacity=eci.toFixed(3);
  endcard.style.transform=`translateY(${((1-eci)*16).toFixed(1)}px) scale(${(0.94+0.06*eci).toFixed(3)})`;
  fBar.style.width=(seg(t,TM.end[2],0.8)*P.barW).toFixed(0)+'px';
  renderSub(t);
  const endFade=clamp(seg(t,TM.end[3],0.9),0,1);
  const openFade=clamp(1-seg(t,0.05,0.5),0,1)*0.96;
  fadeEl.style.opacity=String(Math.max(openFade,dip,endFade));
}
/* layout akurat setelah font siap, lalu siap render */
function boot(){
  let booted=false;
  const run=()=>{ if(booted)return; booted=true; layoutChat(); renderFrame(0); window.__ready=true; };
  if(document.fonts&&document.fonts.ready){ document.fonts.ready.then(run); setTimeout(run,2500); }
  else run();
}
boot();
window.__renderFrame=renderFrame;
</script>
</body>
</html>
