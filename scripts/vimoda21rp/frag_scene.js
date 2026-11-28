/* ---------- GLOW v3 scene layer rev24 (otak/DESAIN-GLOW.md):
   blob bokeh drift pelan + sparkle + angka resep melayang + bar progres
   cerita 5 segmen (babak dari TM.div) + 2 hero poster sinematik di sela
   babak (Ken Burns + judul display + garis gradien) + hero CTA penutup.
   Dipanggil dari renderFrame tiap frame via window.__updateScene(t). ---------- */
const SCENES=TM.scenes||[];
{
  const gl=document.getElementById('glowlayer');
  /* 5 blob bokeh besar, drift super pelan (hidup, tidak mengganggu) */
  const BLOBS=[];
  const bcols=['rgba(255,140,110,.55)','rgba(255,120,170,.5)','rgba(183,156,255,.5)','rgba(122,216,232,.45)','rgba(255,224,122,.5)'];
  const bsizes=[720,640,600,560,520];
  for(let i=0;i<5;i++){
    const b=document.createElement('div');
    b.className='blob';
    b.style.cssText+=`width:${bsizes[i]}px;height:${bsizes[i]}px;background:radial-gradient(circle,${bcols[i]} 0%,transparent 70%);left:${Math.round(-120+rnd()*(W-120))}px;top:${Math.round(-80+rnd()*(H-160))}px;`;
    gl.appendChild(b);
    BLOBS.push({el:b,ph:i*1.7});
  }
  /* 14 sparkle: titik cahaya lembut berkedip */
  const SPARKS=[];
  for(let i=0;i<14;i++){
    const s=document.createElement('div');
    s.className='spark';
    const sz=6+Math.round(rnd()*10);
    s.style.cssText+=`width:${sz}px;height:${sz}px;left:${Math.round(rnd()*(W-40)+20)}px;top:${Math.round(rnd()*(H-40)+20)}px;background:radial-gradient(circle,#FFFFFF 0%,rgba(255,255,255,0) 72%);`;
    gl.appendChild(s);
    SPARKS.push({el:s,ph:i*0.9,amp:0.3+rnd()*0.4});
  }
  /* angka resep melayang (bahasa visual materi) */
  const GNUMS=[];
  ['200','20','2x','1-5','400','1/2'].forEach((c,i)=>{
    const g=document.createElement('div');
    g.className='glownum';
    g.textContent=c;
    const fs=44+Math.round(rnd()*40);
    g.style.cssText+=`left:${Math.round(rnd()*(W-160)+40)}px;top:${Math.round(rnd()*(H-260)+70)}px;font-size:${fs}px;`;
    gl.appendChild(g);
    GNUMS.push({el:g,ph:i*1.1});
  });
  /* bar progres cerita: 5 segmen terisi mengikuti kartu babak */
  const prog=document.createElement('div');
  prog.id='prog';
  const PF=[];
  for(let i=0;i<5;i++){
    const segE=document.createElement('div');
    segE.className='pseg';
    const fl=document.createElement('div');
    fl.className='pfill';
    segE.appendChild(fl);
    prog.appendChild(segE);
    PF.push(fl);
  }
  document.getElementById('rig').appendChild(prog);
  /* hero poster sinematik di sela babak + hero CTA penutup */
  const herol=document.createElement('div');
  herol.id='herol';
  const mkHero=(idx,title,scr)=>{
    const h=document.createElement('div');
    h.className='hero';
    const im=document.createElement('img');
    im.src=HERO_IMGS[idx]||HERO_IMGS[0];
    im.alt='ilustrasi';
    const hs=document.createElement('div');
    hs.className='hs';
    if(scr){hs.style.cssText+='background:linear-gradient(180deg,rgba(67,48,79,.34) 0%,rgba(67,48,79,.10) 46%,rgba(67,48,79,.52) 100%);';}
    const ht=document.createElement('div');
    ht.className='ht';
    ht.style.cssText+=`font-size:${ORIENT==='portrait'?62:54}px;`;
    ht.textContent=title;
    const hr=document.createElement('div');
    hr.className='hr';
    h.appendChild(im);h.appendChild(hs);h.appendChild(ht);h.appendChild(hr);
    herol.appendChild(h);
    return {el:h,im,ht,hr};
  };
  const HERO=SCENES.map(sc=>({sc,h:mkHero(sc[2],sc[3])}));
  /* hero CTA penutup: full-bleed lembut di balik plate AKIOMIDA.COM */
  const HEND=mkHero(3,'',true);
  HEND.el.querySelector('.ht').style.display='none';
  document.body.appendChild(herol);
  window.__updateScene=function(t){
    for(const b of BLOBS){
      b.el.style.transform=`translate(${(Math.sin(t*0.11+b.ph)*90).toFixed(1)}px,${(Math.cos(t*0.09+b.ph*1.3)*70).toFixed(1)}px) scale(${(1+0.08*Math.sin(t*0.13+b.ph)).toFixed(3)})`;
    }
    for(const s of SPARKS){
      s.el.style.opacity=(0.22+s.amp*(0.5+0.5*Math.sin(t*1.3+s.ph))).toFixed(3);
      s.el.style.transform=`translate(${(Math.sin(t*0.5+s.ph)*12).toFixed(1)}px,${(Math.cos(t*0.42+s.ph)*10).toFixed(1)}px)`;
    }
    for(const g of GNUMS){
      g.el.style.opacity=(0.34+0.2*Math.sin(t*0.5+g.ph)).toFixed(3);
      g.el.style.transform=`translate(${(Math.sin(t*0.24+g.ph)*16).toFixed(1)}px,${(Math.cos(t*0.19+g.ph)*13).toFixed(1)}px) rotate(${(Math.sin(t*0.3+g.ph)*6).toFixed(1)}deg)`;
    }
    for(let k=0;k<5;k++){
      PF[k].style.width=(clamp(seg(t,TM.div[k][0],0.6),0,1)*100).toFixed(1)+'%';
    }
    let sceneOn=false;
    for(const {sc,h} of HERO){
      const fin=seg(t,sc[0],0.5), fout=1-seg(t,sc[1]-0.45,0.45);
      const o=clamp(Math.min(fin,fout),0,1);
      if(o>0.03)sceneOn=true;
      h.el.style.opacity=o.toFixed(3);
      h.el.style.display=o>0.004?'block':'none';
      h.im.style.transform=`scale(${(1.03+0.09*clamp(seg(t,sc[0],sc[1]-sc[0]),0,1)).toFixed(4)})`;
      const k1=eio(clamp(fin,0,1));
      h.ht.style.opacity=(k1*(1-seg(t,sc[1]-0.35,0.35))).toFixed(3);
      h.ht.style.transform=`translateY(${(18*(1-k1)).toFixed(1)}px)`;
      h.hr.style.width=(k1*Math.min(W*0.4,420)).toFixed(0)+'px';
    }
    document.body.classList.toggle('sceneon',sceneOn);
    {
      const o=clamp(seg(t,TM.end[0]-0.35,0.9),0,1);
      HEND.el.style.opacity=o.toFixed(3);
      HEND.el.style.display=o>0.004?'block':'none';
      HEND.im.style.transform=`scale(${(1.04+0.07*clamp(seg(t,TM.end[0]-0.35,TM.dur-TM.end[0]),0,1)).toFixed(4)})`;
    }
  };
}
