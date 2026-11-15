/* ---------- S2: lima tokoh kelompok bernama ---------- */
const gTiles=document.getElementById('g_tiles');
const GROUPS=[
  {name:'ASLI', ex:'1 2 3', en:'NATURAL', col:'#7DD3FC', t0:15.8},
  {name:'CACAH', ex:'0 1 2', en:'WHOLE', col:'#7DD3FC', t0:16.7},
  {name:'BULAT', ex:'-2 -1 0', en:'INTEGER', col:'#7DD3FC', t0:17.5},
  {name:'RASIONAL', ex:'1/2 3/4', en:'RATIONAL', col:'#34D399', t0:19.6},
  {name:'IRASIONAL', ex:'\u221A2 \u03C0', en:'IRRATIONAL', col:'#FBBF24', t0:23.0}
];
const GT=[];
{
  const total=5*P.gtS+4*P.gtGap;
  const x0=(W-total)/2;
  GROUPS.forEach((o,i)=>{
    const x=x0+i*(P.gtS+P.gtGap);
    const dgfs=o.ex.length>5?Math.round(P.gtDg*0.7):P.gtDg;
    const el=buildTile(gTiles,x,P.gtS,o.ex,o.col,o.en,P.gtS,dgfs,P.gtEn);
    if(i===4){el.style.borderColor='rgba(251,191,36,.65)';el.style.background='rgba(251,191,36,.10)';
      el.style.boxShadow='0 14px 34px rgba(0,0,0,.5),0 0 40px rgba(251,191,36,.25)';}
    const tg=buildTag(gTiles,x,P.groundY-P.gtS-44,o.name,P.gtTag);
    GT.push({el,tg,t0:o.t0});
  });
}

/* ---------- S3: panel keluarga ala leaderboard ---------- */
const fam=document.getElementById('fam');
fam.style.cssText+=`left:${P.famX}px;top:${P.famY}px;width:${P.famW}px;padding:0 0 18px 0;border:2px solid rgba(251,191,36,.55);`;
const famHd=document.getElementById('fam_hd');
famHd.style.cssText+=`height:${P.famHd}px;line-height:${P.famHd}px;font-size:34px;background:rgba(251,191,36,.10);border-radius:17px 17px 0 0;letter-spacing:.14em;`;
famHd.textContent='ANGGOTA KELUARGA';
const famRows=document.getElementById('fam_rows');
const FROW=[];
GROUPS.forEach((o,i)=>{
  const r=document.createElement('div');
  r.className='prow';
  const ry=P.famHd+16+i*(P.famRow+12);
  r.style.cssText+=`top:${ry}px;height:${P.famRow}px;margin:0 16px;padding:0 26px;`;
  const nm=document.createElement('div');
  nm.style.cssText=`font-size:${P.famName}px;font-weight:800;color:${o.col};letter-spacing:.10em;`;
  nm.textContent=o.name;
  const mem=document.createElement('div');
  mem.className='mono';
  mem.style.cssText=`font-size:${P.famMem}px;font-weight:800;color:#FFFFFF;`;
  mem.textContent=o.ex;
  r.appendChild(nm);r.appendChild(mem);
  if(i===4){r.style.border='2px solid rgba(251,191,36,.5)';mem.style.color='#FCD34D';}
  famRows.appendChild(r);
  FROW.push({el:r,t0:[27.9,29.2,30.5,31.8,33.0][i]});
});

/* ---------- S4: panel persamaan ---------- */
const eqp=document.getElementById('eqp');
eqp.style.cssText+=`left:${P.eqX}px;top:${P.eqY}px;width:${P.eqW}px;height:${P.eqH}px;border:2px solid rgba(251,191,36,.55);`;
const eqT=document.getElementById('eq_t');
eqT.style.cssText+=`position:absolute;left:0;right:0;top:26px;font-size:${P.eqSize}px;text-shadow:0 6px 26px rgba(251,191,36,.30);`;
const eqLab=document.getElementById('eq_lab');
eqLab.style.cssText+=`position:absolute;left:0;right:0;bottom:24px;font-size:24px;`;

/* ---------- S5: panel toko CTA ---------- */
const cta=document.getElementById('cta');
cta.style.cssText+=`left:${P.ctaX}px;top:${P.ctaY}px;width:${P.ctaW}px;height:${P.ctaH}px;border:2px solid rgba(167,139,250,.5);`;
const fOpen=document.getElementById('f_open');
fOpen.style.cssText+=`position:absolute;left:40px;right:40px;top:64px;font-size:${P.ctaOpen}px;`;
const fOpenE=document.getElementById('f_open_e');
fOpenE.style.cssText+=`position:absolute;left:40px;right:40px;top:124px;font-size:${P.ctaOpenE}px;`;
const fUrl=document.getElementById('f_url');
fUrl.style.cssText+=`position:absolute;left:40px;right:40px;top:196px;font-size:${P.ctaUrl}px;
  background:linear-gradient(92deg,#22D3EE 0%,#A78BFA 52%,#FBBF24 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;`;
const fBar=document.getElementById('f_bar');
fBar.style.cssText+=`position:absolute;left:40px;top:${196+Math.round(P.ctaUrl*1.32)}px;width:0;`;
const fPill=document.getElementById('f_pill');
fPill.style.cssText+=`left:${Math.round((P.ctaW-430)/2)}px;bottom:44px;width:430px;height:74px;font-size:34px;letter-spacing:.10em;`;

/* ---------- judul raksasa + panel pesan ---------- */
const TITLES=[['t0',0.35],['t1',6.6],['t2',14.4],['t3',25.2],['t4',34.8],['t5',43.2]]
  .map(([id,t0])=>({el:document.getElementById(id),t0:t0}));
TITLES.forEach((o,i)=>{
  o.el.style.top=(i===0?P.titleY:P.titleY+18)+'px';
  o.el.style.fontSize=(i===0?P.titleS0:P.titleSN)+'px';
  if(i===0||i===2||i===4)o.el.style.color='#FCD34D';
  else o.el.style.color='#FFFFFF';
  if(i>0)o.el.style.top=(P.titleY+8)+'px';
});
const CHATS=[[8.9,10.1,'dingin!'],[21.3,22.7,'lima kelompok!'],[40.4,41.8,'jadi 1!']];
const chatp=document.getElementById('chatp');
const chatMsg=document.getElementById('chatp_msg');
chatp.style.cssText+=`left:${P.chatX}px;top:${P.chatY}px;width:${P.chatW}px;padding:20px 26px;`;
const chatWho=chatp.querySelector('.who');
chatWho.style.fontSize=P.chatWho+'px';
chatWho.style.letterSpacing='.12em';
chatMsg.style.fontSize=P.chatMsg+'px';

/* ---------- narasi (16 beat) ---------- */
const SUBS=[
  [0.5,'Bilangan itu cuma 1, 2, 3?','Is counting only 1, 2, 3?','#FFFFFF'],
  [2.6,'Padahal, matematika tidak sesempit itu.','Math is not that narrow.','#FFFFFF'],
  [6.7,'Punya 5 buku, suhu 5 derajat di bawah nol.','Five books, or 5 degrees below zero.','#FFFFFF'],
  [9.6,'Pizza dibagi dua, lingkaran dengan pi.','Half a pizza, or a circle with pi.','#FFFFFF'],
  [11.5,'Semuanya butuh jenis bilangan berbeda.','Each one needs a different kind.','#FBBF24'],
  [14.5,'Kenal lima kelompok bilangan.','Meet the five number groups.','#FFFFFF'],
  [19.3,'Rasional: bisa ditulis sebagai pecahan.','Rationals: writable as fractions.','#FFFFFF'],
  [22.9,'Irasional: akar 2 dan pi.','Irrationals: root 2 and pi.','#FBBF24'],
  [25.3,'Kalau 1, 2, 3 cukup, kenapa perlu lainnya?','If 1, 2, 3 suffice, why more?','#FFFFFF'],
  [32.3,'Karena persoalan tidak selalu sama.','Because problems are not the same.','#FBBF24'],
  [34.9,'Matematika tumbuh mencari cara yang tepat.','Math grows by finding the right tools.','#FFFFFF'],
  [38.3,'Cara bebas, hasil tetap menurut aturan.','Free method, but results follow rules.','#FFFFFF'],
  [43.3,'Jadi, cukup satu jenis bilangan untuk semua?','So, is one kind enough for all?','#FFFFFF'],
  [46.9,'Pilih satu, atau tiap persoalan beda?','One for all, or different tools?','#FFFFFF'],
  [48.6,'Tulis alasanmu di komentar.','Write your reason in the comments.','#FBBF24'],
  [50.4,'Jangan cuma menebak.','Do not just guess.','#FFFFFF']
];
const subbar=document.getElementById('subbar');
const subId=document.getElementById('sub_id');
const subEn=document.getElementById('sub_en');
subId.style.fontSize=P.subId+'px';
subEn.style.fontSize=P.subEn+'px';
subEn.style.marginTop='6px';
subbar.style.top=P.subTop+'px';
subbar.style.maxWidth=P.subMax+'px';
const wm=document.getElementById('wm');
wm.style.cssText+=`left:0;right:0;top:${P.wmY}px;font-size:${P.wmSize}px;`;
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
  const pop=1+0.05*Math.sin(clamp(seg(t,SUBS[i][0],0.3),0,1)*Math.PI);
  subbar.style.transform=`translateX(-50%) scale(${pop.toFixed(3)})`;
}

/* ---------- beat & gestur mentor ---------- */
const SCENE_T=[6.6,14.4,25.2,34.8,43.2];
const IMP=[0.6,6.6,14.4,25.2,34.8,43.2,11.5,22.9,32.3,45.3,48.7];
const SPARKS=[[39.3,40.2],[48.6,51.4]];
const GESTS=[
  [1.05,0.55,'shake',5,0],
  [1.5,0.6,'half',0,0],
  [1.95,0.95,'wide',0,0],
  [4.9,0.7,'shake',9,0],
  [7.95,1.5,'count',24,0],
  [8.9,1.2,'shake',4.5,0],
  [11.5,0.8,'nod',0.10,0],
  [16.4,0.55,'pulse',1.06,0],
  [17.6,0.9,'sink',34,0],
  [19.9,0.9,'lean',-7,0],
  [23.3,1.3,'spin',0,0],
  [27.9,0.5,'pulse',1.05,0],
  [29.2,0.5,'pulse',1.05,0],
  [30.5,0.5,'pulse',1.05,0],
  [31.8,0.5,'pulse',1.06,0],
  [33.0,0.5,'pulse',1.06,0],
  [35.3,0.9,'nod',0.10,0],
  [40.6,0.8,'lean',-5,0],
  [45.3,0.7,'shake',7,0],
  [47.8,0.9,'lean',6,1],
  [48.7,0.85,'jump',34,0]
];
function imp(t){
  let a=0;
  for(const bt of IMP){
    const d=t-bt;
    if(d>=0&&d<0.5){ const p=d/0.5; a=Math.max(a,(1-p)*0.85); }
  }
  return a;
}

/* ---------- RENDER PER FRAME ---------- */
const world=document.getElementById('world');
const flash=document.getElementById('flash');
const fade=document.getElementById('fade');
function renderFrame(t){
  /* bintang + partikel + blok dunia */
  for(const s of ST){
    s.el.style.opacity=(0.35+0.5*(0.5+0.5*Math.sin(t*s.sp+s.ph))).toFixed(3);
  }
  const zone=0.5+0.3*(smz(t,0,6.6)+smz(t,34.8,43.2));
  for(let i=0;i<NP;i++){
    const p=PA[i];
    const yy=((p.y0-t*p.sp)%(H+140)+H+140)%(H+140)-70;
    p.el.style.transform=`translate(${(p.x+Math.sin(t*p.wf+p.ph)*20).toFixed(1)}px,${yy.toFixed(1)}px)`;
    p.el.style.opacity=(p.o*zone*(0.75+0.25*Math.sin(t*1.1+p.ph))).toFixed(3);
  }
  for(const b of BLK){
    const o=clamp(seg(t,b.t0,0.5)*0.95,0,0.95);
    b.el.style.opacity=o.toFixed(3);
    b.el.style.transform=`translateY(${(Math.sin(t*0.8+b.ph)*7).toFixed(1)}px)`;
  }

  /* judul raksasa */
  for(let i=0;i<TITLES.length;i++){
    const o=TITLES[i];
    const tEnd=i+1<TITLES.length?TITLES[i+1].t0:51.4;
    const oin=seg(t,o.t0,0.35)*(1-seg(t,tEnd-0.25,0.3));
    const sc=1+0.07*Math.sin(clamp(seg(t,o.t0,0.5),0,1)*Math.PI);
    o.el.style.opacity=oin.toFixed(3);
    o.el.style.transform=`scale(${sc.toFixed(3)})`;
  }

  /* S0: kartu teaser + tanda tanya (pergi saat S1 mulai) */
  for(const w of TW){
    popA(w.el,t,w.t0,0.55,22,0.8,6.4);
    popA(w.tg,t,w.t0+0.1,0.5,18,0.8,6.4);
  }
  popA(hQ,t,4.9,0.6,26,0.8,6.4);
  hQ.style.transform=`scale(${(1+0.10*Math.sin(clamp(seg(t,4.9,0.6),0,1)*Math.PI)).toFixed(3)}) rotate(${(Math.sin(t*3.2)*4).toFixed(2)}deg)`;

  /* S1: properti dunia berpasangan (pasangan 1 pergi di 9.45, pasangan 2 di 14.25) */
  const pOut=1-seg(t,9.45,0.35), pOut2=1-seg(t,14.25,0.3);
  [[0,6.9],[1,8.85],[2,9.6],[3,9.72]].forEach(([i,t0])=>{
    const pr=PROPS[i];
    const oin=seg(t,t0,0.4);
    const o=oin*(i<2?pOut:pOut2);
    pr.el.style.opacity=o.toFixed(3);
    pr.el.style.transform=`translateY(${((1-eio(oin))*60).toFixed(1)}px)`;
    pr.tg.style.opacity=o.toFixed(3);
  });

  /* S2: lima tokoh bernama (pergi saat panel keluarga muncul) */
  for(const g of GT){
    popA(g.el,t,g.t0,0.55,20,0.8,25.0);
    popA(g.tg,t,g.t0+0.08,0.5,16,0.8,25.0);
  }

  /* S3: panel keluarga + baris (pergi saat S4) */
  popA(fam,t,25.5,0.6,10,0.8,34.4);
  for(const r of FROW){
    const oin=seg(t,r.t0,0.4);
    r.el.style.opacity=oin.toFixed(3);
    r.el.style.transform=`translateX(${((1-eio(oin))*-70).toFixed(1)}px)`;
  }

  /* S4: panel persamaan (pergi saat S5) */
  popA(eqp,t,38.2,0.55,10,0.8,43.0);

  /* S5: panel toko */
  popA(cta,t,43.9,0.6,10,0.8,51.6);
  fBar.style.width=(seg(t,45.5,1.8)*Math.max(0,P.ctaW-80)).toFixed(0)+'px';
  popA(fPill,t,48.6,0.5,14,0.8,51.6);

  /* panel pesan */
  let cOn=false;
  for(const [b0,b1,tx3] of CHATS){
    if(t>=b0&&t<b1){
      cOn=true;
      if(chatMsg.textContent!==tx3)chatMsg.textContent=tx3;
    }
  }
  const co=cOn?Math.min(seg(t,chatT0(CHATS,t),0.25),1-seg(t,chatT1(CHATS,t)-0.14,0.14)):0;
  chatp.style.opacity=co.toFixed(3);
  chatp.style.transform=`scale(${(0.9+0.1*co).toFixed(3)})`;

  /* bola mentor: posisi antar bab + gestur menjawab konten */
  let sidx=0;
  for(let k=0;k<SCENE_T.length;k++){ if(t>=SCENE_T[k]) sidx=k+1; }
  let bx=P.ttX[0];
  if(sidx>0){
    bx=lerp(P.ttX[sidx-1],P.ttX[sidx],eio(seg(t,SCENE_T[sidx-1]+0.25,0.9)));
  }
  const ep=seg(t,0.6,0.55), ef=eoe(ep);
  const brs=Math.sin(t*9.4)*0.035;
  let hy=0, hsq=0, gro=0, lrot=0, dsx=1, dsy=1, drot=0, dyy=0, sinkA=0;
  for(const [gs,gd,gt,ga,gdir] of GESTS){
    const d=t-gs;
    if(d>=0&&d<gd){
      const p=d/gd, w=Math.sin(p*Math.PI);
      if(gt==='lean'){ lrot+=gdir*ga*w; }
      else if(gt==='shake'){ lrot+=ga*Math.sin(p*11)*(1-p); }
      else if(gt==='nod'){ hsq+=ga*w; hy-=6*w; }
      else if(gt==='pulse'){ gro+=(ga-1)*w; }
      else if(gt==='jump'){ hy-=ga*4*p*(1-p); hsq+=0.10*Math.sin(p*Math.PI); }
      else if(gt==='half'){ dsy-=0.45*w; }
      else if(gt==='wide'){ dsx+=0.28*w; dsy-=0.18*w; drot+=360*eio(p); }
      else if(gt==='spin'){ drot+=720*eio(p); }
      else if(gt==='count'){ hy-=ga*Math.abs(Math.sin(p*5*Math.PI))*(1-p*0.25); }
      else if(gt==='sink'){ dyy+=ga*w; dsy-=0.10*w; sinkA=w; }
    }
  }
  /* demo 1/2+1/2=1 */
  let bsa=1, bbo=0, bboff=0;
  if(t>=38.5&&t<39.15){ bsa=1-0.48*eio(seg(t,38.5,0.45)); }
  else if(t>=39.15&&t<39.75){ bsa=0.52+0.48*eio(seg(t,39.15,0.5)); }
  if(t>=38.5&&t<39.6){
    bbo=0.95*seg(t,38.5,0.3)*(1-seg(t,39.2,0.4));
    bboff=t<39.15? lerp(88,50,eio(seg(t,38.5,0.45))) : lerp(50,12,eio(seg(t,39.15,0.5)));
  }
  const wig=Math.sin(t*16)*6*seg(t,48.7,0.3);
  const sy2=(1+brs+hsq-lq(t))*(1+gro), sx2=(1-(brs+hsq)*0.75+lq(t)*0.10)*(1+gro);
  ball.el.style.left=bx.toFixed(1)+'px';
  ball.el.style.opacity=String(clamp(ep*3,0,1));
  ball.el.style.transform=`translateY(${((1-ef)*-260+hy+dyy).toFixed(1)}px) rotate(${(lrot+wig+drot).toFixed(2)}deg) scale(${(sx2*dsx*bsa).toFixed(3)},${(sy2*dsy*bsa).toFixed(3)})`;
  babopaTag.style.left=(bx-80)+'px';
  babopaTag.style.opacity=String(clamp(ep*3,0,1)*0.95*(1-seg(t,15.2,0.4)));
  ballsh.style.left=bx.toFixed(1)+'px';
  ballsh.style.opacity=String(clamp(ep*3,0,1)*clamp(0.42+hy*0.006,0.18,0.5)*(1-0.5*sinkA)*bsa);
  ballsh.style.transform=`scaleX(${clamp((1+hy*0.004)*bsa,0.4,1.08).toFixed(3)})`;
  const sweatOn=(t>=10.2&&t<12.2)?1:0;
  ball.sweat.style.opacity=String(sweatOn*0.9);
  ball.sweat.style.transform=`translateY(${(sweatOn?((t-10.2)*16)%24:0).toFixed(1)}px)`;
  ballB.style.left=(bx+bboff).toFixed(1)+'px';
  ballB.style.opacity=String(clamp(bbo,0,1));
  ballB.style.transform=`translateY(${(-7*Math.abs(Math.sin(t*6.3))*(bbo>0?1:0)).toFixed(1)}px)`;
  let spo=0;
  for(const [sa,sb] of SPARKS){
    if(t>=sa&&t<sb) spo=smz(t,sa,sb,0.35)*(0.65+0.35*Math.sin(t*11));
  }
  spark.style.opacity=String(clamp(spo,0,1));
  spark.style.left=(bx+58).toFixed(1)+'px';
  spark.style.top=(P.groundY-168+Math.sin(t*3)*6).toFixed(1)+'px';
  spark.style.transform=`rotate(${((t*40)%360).toFixed(0)}deg) scale(${(0.8+0.25*Math.sin(t*9)).toFixed(3)})`;

  renderSub(t);

  /* kamera: guncangan beat + kilat */
  const im=imp(t);
  const shx=Math.sin(t*47)*6*im, shy=Math.sin(t*39+1.7)*4*im;
  world.style.transform=`translate(${shx.toFixed(2)}px,${(shy+Math.sin(t*0.35)*5).toFixed(2)}px) scale(${(1+im*0.012).toFixed(4)})`;
  flash.style.opacity=(im*0.14).toFixed(3);
  fade.style.opacity=String(clamp(1-seg(t,0.05,0.5),0,1)*0.96+clamp(seg(t,51.4,0.6),0,1));
}
function lq(t){ const ep=seg(t,0.6,0.55); return Math.exp(-Math.pow((ep-0.94)/0.05,2)); }
function chatT0(list,t){ for(const [b0] of list){ if(t>=b0&&t<b0+0.4) return b0; } return 0; }
function chatT1(list,t){ for(const [b0,b1] of list){ if(t>=b0-0.4&&t<b1) return b1; } return 52; }
renderFrame(0);
window.__ready=true;
</script>
</body>
</html>
