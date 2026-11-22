/* ---------- RUANG SAPA rev10: render per frame ----------
   Semua gerak fungsi waktu (deterministik, aturan 20). Warisan rev7-9:
   bubble pop terbaca, reveal ??? slow-motion, dolly zoom foto, punch
   zoom diagram, fade antar bab, scroll pelan, papan slide-up, endcard
   tenang, tanpa indikator pengetikan sama sekali. rev10: teks dialog
   ditulis ulang ala chat fiction sosmed, gerakan tetap. ---------- */
const SUBS2=SUBS;
let subIdx=-1;
let scrollCur=0;
function renderSub(t){
  let i=0;
  for(let k=0;k<SUBS2.length;k++){ if(t>=SUBS2[k][0]-0.001) i=k; }
  const nxt=i+1<SUBS2.length?SUBS2[i+1][0]:106.0;
  const o=clamp(Math.min(seg(t,SUBS2[i][0],0.28), 1-seg(t,nxt-0.18,0.18)),0,1);
  if(i!==subIdx){
    subIdx=i;
    subEn.textContent=SUBS2[i][1];
  }
  subbar.style.opacity=(o*0.97).toFixed(3);
  const pop=1+0.014*Math.sin(clamp(seg(t,SUBS2[i][0],0.5),0,1)*Math.PI);
  subbar.style.transform=`translateX(-50%) scale(${pop.toFixed(3)})`;
}
const IMPS=[[0.4,1.4],[23.6,25.2],[38.2,39.8],[57.1,59.1],[75.5,77.1],[88.3,89.9]];
function imp(t){
  let a=0;
  for(const [s,e] of IMPS){
    const d=t-s;
    if(d>=0&&d<(e-s)*0.5){ const p=d/((e-s)*0.5); a=Math.max(a,(1-p)*0.8); }
  }
  return a;
}
/* momen dolly zoom sinematik: foto muncul dan reveal ??? */
const DOLLYS=MSGS.filter(m=>m.kind==='photo').map(m=>[m.t0,m.t0+3.4,0.024]).concat([[53.4,56.0,0.02],[57.1,60.9,0.022]]);
function renderFrame(t){
  /* latar doodle melayang pelan */
  for(const d of DOODLES){
    const fx=parseFloat(d.el.style.left);
    const fy=parseFloat(d.el.style.top);
    d.el.style.opacity=(0.5+0.3*Math.sin(t*0.4+d.ph)).toFixed(3);
    d.el.style.transform=`translate(${(Math.sin(t*0.22+d.ph)*18).toFixed(1)}px,${(Math.cos(t*0.18+d.ph)*14).toFixed(1)}px)`;
  }
  /* napas phone + kamera hanyut + punch momen + dolly zoom foto */
  const im=imp(t);
  const px=Math.sin(t*0.21)*5+Math.sin(t*47)*2.2*im;
  const py=Math.cos(t*0.15)*4+Math.sin(t*39+1.7)*1.6*im;
  let push=0;
  for(const [s,e] of IMPS){ push+=0.05*smz(t,s,e,0.8); }
  for(const [a,b,amt] of DOLLYS){ push+=amt*smz(t,a,b,0.9); }
  phoneEl.style.transform=`translate(${px.toFixed(2)}px,${py.toFixed(2)}px) scale(${(1+push).toFixed(4)})`;
  /* fade transisi antar bab (cinematic cut halus) */
  let dip=0;
  for(const fd of [19.0,30.4,61.3,75.3,88.3]){ dip=Math.max(dip,0.12*smz(t,fd-0.08,fd+0.52,0.3)); }
  /* divider bab pop + ikut memudar saat penutup bersih (aturan 28) */
  const chFade2=1-seg(t,100.9,0.35);
  for(const d of DIVEL){
    const o=clamp(seg(t,d.t0,0.4),0,1)*chFade2;
    d.sp.style.opacity=o.toFixed(3);
    d.sp.style.transform=`translateY(${(12*(1-eio(seg(t,d.t0,0.4)))).toFixed(1)}px)`;
  }
  /* bubble pop lebih lambat agar terbaca; foto 0.75 s, ??? slow-motion 0.95 s */
  let lastBot=0;
  for(const x of MSGE){
    const on=t>=x.m.t0;
    if(on){
      const pd=x.m.kind==='photo'?0.75:(x.m.who==='MYST'?0.95:0.6);
      const p=clamp(seg(t,x.m.t0,pd),0,1);
      const popS=1+(x.m.who==='MYST'?0.03:0.05)*Math.sin(p*Math.PI);
      x.el.style.opacity=p.toFixed(3);
      x.el.style.transform=`translateY(${(12*(1-eio(p))).toFixed(1)}px) scale(${popS.toFixed(3)})`;
      if(x.m.svgEl){ /* Ken Burns foto: zoom pelan 1 -> 1.06 */
        x.m.svgEl.style.transform=`scale(${(1+0.06*eio(seg(t,x.m.t0,4.2))).toFixed(4)})`;
      }
      lastBot=Math.max(lastBot,x.top+x.h);
    }
  }
  for(const d of DIVEL){
    if(t>=d.t0) lastBot=Math.max(lastBot,d.top+d.h);
  }
  const areaH=P.chatBot-P.chatTop;
  const target=Math.max(0,lastBot-areaH+30);
  if(Math.abs(target-scrollCur)>500)scrollCur=target;
  scrollCur+=(target-scrollCur)*0.1;
  chatEl.style.transform=`translateY(${(-scrollCur).toFixed(1)}px)`;
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
    for(const ch of body.chips){
      const stag=fIdx===2?0.24:0.12; /* twist: chip mendarat slow-motion */
      const ct=fOn.t0+0.2+ch.i*stag;
      const co=clamp(seg(t,ct,0.42),0,1);
      ch.el.style.opacity=co.toFixed(3);
      ch.el.style.transform=`translateY(${(18*(1-eio(co))).toFixed(1)}px) scale(${(1+0.1*Math.sin(clamp(seg(t,ct,0.55),0,1)*Math.PI)).toFixed(3)})`;
    }
    for(const ln of body.lines){
      ln.el.style.opacity=clamp(seg(t,fOn.t0+1.0,0.45),0,1).toFixed(3);
    }
    if(fOn.twoEl){ fOn.twoEl.style.opacity=clamp(seg(t,fOn.t0+1.5,0.45),0,1).toFixed(3); }
    for(let ni=0;ni<body.notes.length;ni++){
      body.notes[ni].el.style.opacity=clamp(seg(t,fOn.t0+1.95+ni*0.5,0.45),0,1).toFixed(3);
    }
    flashwhite.style.opacity=clamp(smz(t,fOn.t0,fOn.t0+0.16,0.05)*0.16,0,1).toFixed(3);
  }else{
    dimEl.style.opacity='0';
    flashEl.style.opacity='0';
    flashwhite.style.opacity='0';
    for(const b of FLASHBODY) b.w.style.display='none';
  }
  /* emoji burst */
  for(const pt of BPARTS){
    const b=BURSTS[pt.bi];
    if(t>=b.t0&&t<b.t1){
      const p=seg(t,b.t0,b.t1-b.t0);
      const rise=Math.sin(p*Math.PI);
      const ox=Math.cos(pt.a)*b.rad*(0.4+0.6*p)*pt.d;
      const oy=Math.sin(pt.a)*b.rad*0.62*(0.4+0.6*p)*pt.d-p*40;
      const cx=ORIENT==='portrait'?P.phoneX+P.phoneW/2:P.phoneX+P.phoneW/2;
      const cy=ORIENT==='portrait'?P.phoneY+P.phoneH/2:P.phoneY+P.phoneH/2;
      pt.el.style.opacity=(rise*0.95).toFixed(3);
      pt.el.style.transform=`translate(${(cx+ox-30).toFixed(0)}px,${(cy+oy-30).toFixed(0)}px) scale(${(0.7+0.6*rise).toFixed(3)}) rotate(${(p*90*(pt.d>1?1:-1)).toFixed(0)}deg)`;
    }else{
      pt.el.style.opacity='0';
    }
  }
  /* overlay MISI BARU (aturan 30) */
  {
    const qin=eio(seg(t,88.3,0.6));
    const qout=1-seg(t,96.6,0.5);
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
    qnoteEl.style.opacity=(seg(t,92.2,0.4)*qo).toFixed(3);
    const cpo=eio(seg(t,94.0,0.5));
    qctaEl.style.opacity=(cpo*qo).toFixed(3);
    qctaEl.style.transform=`translateX(${((1-cpo)*30).toFixed(1)}px) scale(${(1+0.02*Math.sin(clamp(seg(t,94.0,0.6),0,1)*Math.PI)).toFixed(3)})`;
  }
  /* penutup bersih (aturan 28): konten teaser keluar, endcard sendirian */
  const chFade=1-seg(t,100.9,0.35);
  document.getElementById('phead').style.opacity=String(clamp(1-seg(t,100.9,0.35),0,1));
  for(const x of MSGE){ if(t>=100.9) x.el.style.opacity=String(clamp(1-seg(t,100.9,0.35),0,1)*parseFloat(x.el.style.opacity||'1')); }
  const eci=eio(seg(t,101.1,0.8));
  endcard.style.opacity=eci.toFixed(3);
  endcard.style.transform=`translateY(${((1-eci)*16).toFixed(1)}px) scale(${(0.94+0.06*eci).toFixed(3)})`;
  fBar.style.width=(seg(t,103.6,0.8)*P.barW).toFixed(0)+'px';
  renderSub(t);
  const endFade=clamp(seg(t,104.6,0.9),0,1);
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
