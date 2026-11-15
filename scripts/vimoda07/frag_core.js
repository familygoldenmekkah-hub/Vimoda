const Q=new URLSearchParams(location.search);
const ORIENT=Q.get('o')||'landscape';
const W=ORIENT==='portrait'?1080:1920;
const H=ORIENT==='portrait'?1920:1080;

/* v07 rombak total revisi 16: dunia nyata "Kota Bilangan" - gedung, kedai,
   jalan raya dengan mobil, trotoar, pohon, lampu; siang menuju senja.
   Karakter: bola emas mentor + lima teman bola, bermata, berkedip, menatap
   subjek; TIDAK PERNAH menembus objek (semua properti di atas atau di
   belakang band trotoar). Watermark AKIOMIDA wajib selalu terlihat. */
const P = ORIENT==='portrait' ? {
  bldBot:1050, roadTop:1050, roadBot:1128, walkTop:1128, walkBot:1252,
  groundY:1218, backY:1142,
  shopY:744, shopH:256, shopW:200, shopX:[70,310,550,790], awnY:702, awnH:44,
  plqY:592, plqS:66, plqX0:407, plqGap:82,
  qx:712, qy:580, qSize:96,
  titleY:300, titleS0:104, titleSN:82,
  friendX:[170,355,540,725,910], friendD:88, irrD:80,
  plateY:1162, plateW:150, plateH:52, plateFS:26, stepRise:26, stepW:150, stepH:34,
  slateX:30, slateBot:1238, slateW:300, slateH:196, eqFS:46, labFS:17,
  ctaX:80, ctaY:500, ctaW:920, ctaH:540, ctaOff:[64,124,196], ctaPillB:44,
  openFS:36, openEFS:16, urlFS:92,
  pillW:430, pillH:74, pillFS:32,
  subTop:1272, subId:50, subEn:24, subMax:920,
  ballD:110, wmY:1848, wmFS:20,
  treeX:[36,1060], treeS:1.0, lampX:[80,1000], lampH:210,
  carY:1062, carW:210, carH:64, carH2:52,
  plazaY:1128
} : {
  bldBot:560, roadTop:560, roadBot:634, walkTop:634, walkBot:812,
  groundY:800, backY:742,
  shopY:388, shopH:150, shopW:230, shopX:[130,630,1130,1630], awnY:350, awnH:34,
  plqY:330, plqS:56, plqX0:830, plqGap:74,
  qx:1128, qy:340, qSize:84,
  titleY:225, titleS0:88, titleSN:72,
  friendX:[300,630,960,1290,1620], friendD:76, irrD:70,
  plateY:760, plateW:140, plateH:46, plateFS:22, stepRise:22, stepW:140, stepH:30,
  slateX:250, slateBot:820, slateW:330, slateH:164, eqFS:40, labFS:15,
  ctaX:530, ctaY:320, ctaW:860, ctaH:340, ctaOff:[40,90,130], ctaPillB:30,
  openFS:30, openEFS:14, urlFS:80,
  pillW:400, pillH:66, pillFS:28,
  subTop:830, subId:50, subEn:24, subMax:1400,
  ballD:96, wmY:1016, wmFS:18,
  treeX:[110,1810], treeS:0.9, lampX:[120,1800], lampH:170,
  carY:574, carW:190, carH:56, carH2:46,
  plazaY:634
};
const MX=60;
const stage=document.getElementById('stage');
stage.style.width=W+'px';stage.style.height=H+'px';

/* ---------- util & easing ---------- */
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
const lerp=(a,b,p)=>a+(b-a)*p;
const seg=(t,a,d)=>clamp((t-a)/d,0,1);
const eio=p=>p<0.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
const eoe=p=>1-Math.pow(1-p,3);
const smz=(t,a,b,f)=>f?clamp((t-a)/f,0,1)*clamp((b-t)/f,0,1):(t>=a&&t<b?1:0);
function popA(el,t,t0,d,ov,op0,op1){
  const o=clamp(seg(t,t0,0.3)*(1-seg(t,op1,0.35)),0,1);
  const s2=1+(ov/100)*Math.sin(clamp(seg(t,t0,d),0,1)*Math.PI)*(1-seg(t,op1,0.35));
  el.style.opacity=String(o);
  el.style.transform=`scale(${s2.toFixed(3)})`;
}
/* RNG berbenih (deterministik antar render) */
let _seed=20261115;
const rnd=()=>{_seed|=0;_seed=_seed+0x6D2B79F5|0;let z=Math.imul(_seed^_seed>>>15,1|_seed);
  z=z+Math.imul(z^z>>>7,61|z)^z;return((z^z>>>14)>>>0)/4294967296;};

/* ---------- langit: bintang + awan ---------- */
const starsEl=document.getElementById('stars');
const ST=[];
for(let i=0;i<64;i++){
  const s=document.createElement('i');
  const sz=(rnd()*2.4+1.2).toFixed(1);
  s.style.cssText+=`width:${sz}px;height:${sz}px;left:${(rnd()*W).toFixed(0)}px;top:${(rnd()*P.bldBot*0.72).toFixed(0)}px;opacity:0;`;
  starsEl.appendChild(s);
  ST.push({el:s,sp:rnd()*1.4+0.6,ph:rnd()*6.28});
}
const cloudsEl=document.getElementById('clouds');
const CL=[];
for(let i=0;i<3;i++){
  const c=document.createElement('div');
  c.className='cloud';
  const cw=[260,200,320][i], ch=76;
  c.style.cssText+=`left:${(rnd()*W*0.8).toFixed(0)}px;top:${[120,250,90][i]*(ORIENT==='portrait'?1:0.8)}px;width:${cw}px;height:${ch}px;`;
  [[0,22,110,54],[70,0,120,64],[150,30,100,44]].forEach(([bx,by,bw,bh])=>{
    const b=document.createElement('b');
    b.style.cssText+=`left:${bx}px;top:${by}px;width:${bw}px;height:${bh}px;`;
    c.appendChild(b);
  });
  cloudsEl.appendChild(c);
  CL.push({el:c,x:parseFloat(c.style.left),y:parseFloat(c.style.top),sp:rnd()*7+5,w:cw});
}

/* ---------- kota: deretan gedung berjendela ---------- */
const townEl=document.getElementById('town');
const WINS=[]; /* jendela yang menyala saat senja */
{
  const cols=ORIENT==='portrait'
    ? [[0,200,'#F3E2C7',430],[200,200,'#E8D3F0',560],[400,220,'#D8ECF4',500],[620,200,'#F6D5D0',620],[820,260,'#E7EFE0',470]]
    : [[0,300,'#F3E2C7',420],[300,340,'#E8D3F0',500],[640,300,'#D8ECF4',400],[940,360,'#F6D5D0',540],[1300,320,'#E7EFE0',430],[1620,300,'#EFD9B8',470]];
  cols.forEach(([bx,bw,col,bh],bi)=>{
    const b=document.createElement('div');
    b.className='bld';
    b.style.cssText+=`left:${bx}px;width:${bw}px;height:${bh}px;background:${col};
      box-shadow:inset 0 -14px 0 rgba(0,0,0,.10);top:${P.bldBot-bh}px;`;
    /* grid jendela */
    const nx=Math.max(2,Math.floor(bw/110)), ny=Math.max(2,Math.floor(bh/190));
    for(let i=0;i<nx;i++)for(let j=0;j<ny;j++){
      const w=document.createElement('div');
      w.className='win';
      const wx=bx+22+i*((bw-44-(nx-1)*26)/nx)+i*26, wy=P.bldBot-bh+30+j*((bh-60-(ny-1)*40)/ny)+j*40;
      w.style.cssText+=`left:${wx}px;top:${wy}px;width:${(bw-44-(nx-1)*26)/nx}px;height:${Math.min(64,(bh-60-(ny-1)*40)/ny)}px;`;
      townEl.appendChild(w);
      if((i+j*nx)%3===1)WINS.push(w);
    }
    townEl.appendChild(b);
  });
}
/* plak nomor pintu 1 2 3 (hook, di muka gedung tengah) */
const plaquesEl=document.getElementById('town');
const PLQ=[];
['1','2','3'].forEach((g,i)=>{
  const p=document.createElement('div');
  p.className='plaque';
  p.style.cssText+=`left:${P.plqX0+i*P.plqGap}px;top:${P.plqY}px;width:${P.plqS}px;height:${P.plqS+8}px;opacity:0;`;
  const b=document.createElement('b');
  b.style.fontSize=Math.round(P.plqS*0.62)+'px';b.textContent=g;
  p.appendChild(b);plaquesEl.appendChild(p);
  PLQ.push({el:p,t0:0.9+i*0.22});
});
/* tanda tanya merah (hook) */
const hQ=document.createElement('div');
hQ.className='center mono';
hQ.style.cssText+=`position:absolute;left:${P.qx}px;top:${P.qy}px;color:#E15B5B;font-weight:800;
  font-size:${P.qSize}px;opacity:0;text-shadow:0 6px 0 rgba(0,0,0,.25);`;
hQ.textContent='?';
townEl.appendChild(hQ);

/* ---------- empat jendela kedai berisi situasi nyata ---------- */
const SHOPS=[];
{
  const defs=[
    {x:P.shopX[0],t0:6.9,kind:'books'},
    {x:P.shopX[1],t0:8.85,kind:'thermo'},
    {x:P.shopX[2],t0:10.35,kind:'pizza'},
    {x:P.shopX[3],t0:10.45,kind:'pi'}
  ];
  defs.forEach((d,i)=>{
    const w=document.createElement('div');
    w.className='shopwin';
    w.style.cssText+=`left:${d.x}px;top:${P.shopY}px;width:${P.shopW}px;height:${P.shopH}px;opacity:0;`;
    const awn=document.createElement('div');
    awn.className='awn';
    awn.style.cssText+=`left:${d.x-8}px;top:${P.awnY}px;width:${P.shopW+16}px;height:${P.awnH}px;opacity:0;`;
    const chip=document.createElement('div');
    chip.className='chip';
    chip.style.cssText+=`left:${d.x+P.shopW*0.16}px;top:${P.shopY+P.shopH-40}px;width:${P.shopW*0.68}px;height:34px;
      font-size:${ORIENT==='portrait'?20:16}px;line-height:34px;opacity:0;`;
    townEl.appendChild(w);townEl.appendChild(awn);townEl.appendChild(chip);
    const sit=document.createElement('div');
    sit.className='sit';
    w.appendChild(sit);
    SHOPS.push({win:w,awn,sit,chip,t0:d.t0,kind:d.kind});
  });
  /* isi situasi (dibangun sekali, muncul bersama jendela) */
  const [bw,bh]=[P.shopW,P.shopH];
  const S=SHOPS;
  /* kedai buku: lima buku bertumpuk */
  {
    const cols=['#E15B5B','#5B8FE1','#4FA35C','#F2C230','#A78BFA'];
    cols.forEach((c,i)=>{
      const b=document.createElement('div');
      b.style.cssText=`position:absolute;left:${bw*0.3-(i%2)*8}px;top:${bh-58-(i+1)*26}px;width:${bw*0.42-(i%2)*6}px;height:22px;
        border-radius:4px;background:${c};box-shadow:inset 0 -5px 0 rgba(0,0,0,.2);`;
      S[0].sit.appendChild(b);
    });
    S[0].chip.textContent='5 BUKU';
  }
  /* kafe dingin: termometer -5 derajat */
  {
    const tube=document.createElement('div');
    tube.style.cssText=`position:absolute;left:${bw*0.42}px;top:${bh*0.12}px;width:${bw*0.18}px;height:${bh*0.62}px;
      border-radius:99px;background:#FFFFFF;border:3px solid #B9C4D4;overflow:hidden;`;
    const red=document.createElement('div');
    red.style.cssText=`position:absolute;left:0;bottom:0;width:100%;height:38%;background:#E15B5B;`;
    tube.appendChild(red);S[1].sit.appendChild(tube);
    const bulb=document.createElement('div');
    bulb.style.cssText=`position:absolute;left:${bw*0.42+bw*0.06}px;top:${bh*0.74}px;width:${bw*0.18}px;height:${bw*0.18}px;
      border-radius:50%;background:#E15B5B;`;
    S[1].sit.appendChild(bulb);
    for(let i=0;i<4;i++){
      const f=document.createElement('div');
      f.style.cssText=`position:absolute;left:${bw*(0.16+i*0.06)}px;top:${bh*(0.16+i*0.1)}px;width:9px;height:9px;
        border-radius:50%;background:#BFE3FF;`;
      S[1].sit.appendChild(f);
    }
    S[1].chip.textContent='-5\u00B0';
  }
  /* kedai pizza: setengah lingkaran */
  {
    const half=document.createElement('div');
    half.style.cssText=`position:absolute;left:${bw*0.24}px;top:${bh*0.24}px;width:${bw*0.52}px;height:${bw*0.52}px;
      border-radius:50%;background:conic-gradient(from 90deg,#E8B25B 0deg 180deg,transparent 180deg 360deg);
      border:3px solid #C98A2E;`;
    S[2].sit.appendChild(half);
    const ln=document.createElement('div');
    ln.style.cssText=`position:absolute;left:${bw*0.5}px;top:${bh*0.24}px;width:3px;height:${bw*0.52}px;background:#C98A2E;`;
    S[2].sit.appendChild(ln);
    S[2].chip.textContent='1/2';
  }
  /* kedai roti: lingkaran dengan pi */
  {
    const cir=document.createElement('div');
    cir.style.cssText=`position:absolute;left:${bw*0.22}px;top:${bh*0.2}px;width:${bw*0.56}px;height:${bw*0.56}px;
      border-radius:50%;border:10px solid #5B8FE1;background:transparent;`;
    S[3].sit.appendChild(cir);
    const pi=document.createElement('div');
    pi.className='mono';
    pi.style.cssText=`position:absolute;left:${bw*0.22}px;top:${bh*0.2}px;width:${bw*0.56}px;height:${bw*0.56}px;
      display:flex;align-items:center;justify-content:center;font-weight:800;color:#35507A;
      font-size:${Math.round(bw*0.2)}px;`;
    pi.textContent='\u03C0';
    S[3].sit.appendChild(pi);
    S[3].chip.textContent='LINGKARAN';
  }
}

/* ---------- jalan raya + mobil + trotoar + plaza ---------- */
const road=document.getElementById('road');
road.style.cssText+=`top:${P.roadTop}px;height:${P.roadBot-P.roadTop}px;`;
const roadmark=document.getElementById('roadmark');
roadmark.style.top=(P.roadTop+(P.roadBot-P.roadTop)/2-4)+'px';
const curb=document.getElementById('curb');
curb.style.cssText+=`top:${P.walkTop-8}px;height:8px;`;
const walkEl=document.getElementById('walk');
walkEl.style.cssText+=`top:${P.walkTop}px;height:${H-P.walkTop}px;`;
const plaza=document.getElementById('plaza');
plaza.style.cssText+=`top:${P.plazaY}px;height:${P.groundY+30-P.plazaY}px;`;
const carsEl=document.getElementById('cars');
const CARS=[];
[['#E15B5B',P.carW,P.carH],['#5B8FE1',P.carW*0.9,P.carH2]].forEach(([col,cw,ch],i)=>{
  const c=document.createElement('div');
  c.className='car';
  c.style.cssText+=`left:0;top:${P.carY+(i?P.carH-P.carH2-4:0)}px;width:${cw}px;height:${ch}px;opacity:0;`;
  const body=document.createElement('div');
  body.className='body';
  body.style.cssText+=`width:100%;height:100%;background:${col};`;
  c.appendChild(body);
  const top=document.createElement('div');
  top.className='top';
  top.style.cssText+=`left:${cw*0.2}px;top:${-ch*0.36}px;width:${cw*0.55}px;height:${ch*0.4}px;background:${col};`;
  c.appendChild(top);
  [[cw*0.16],[cw*0.68]].forEach(([wx])=>{
    const wh=document.createElement('div');
    wh.className='wh';
    wh.style.left=wx+'px';
    c.appendChild(wh);
  });
  carsEl.appendChild(c);
  CARS.push({el:c,w:cw,dir:1});
});

/* ---------- pohon, lampu, bangku ---------- */
const propsEl=document.getElementById('streetprops');
const TREES=[];
P.treeX.forEach((x,i)=>{
  const t=document.createElement('div');
  t.className='tree';
  const s=P.treeS*(i?1.1:0.95), th=150*s, tw=120*s;
  t.style.cssText+=`left:${x}px;top:${P.groundY-th}px;width:${tw}px;height:${th}px;transform-origin:50% 100%;`;
  const trunk=document.createElement('div');
  trunk.className='trunk';trunk.style.height=(th*0.42)+'px';
  t.appendChild(trunk);
  [[-8,0,tw*0.6],[tw*0.22,-34*s,tw*0.62],[tw*0.02,-64*s,tw*0.72]].forEach(([lx,ly,lw])=>{
    const l=document.createElement('div');
    l.className='leaf';
    l.style.cssText+=`left:${lx}px;top:${ly}px;width:${lw}px;height:${lw*0.82}px;`;
    t.appendChild(l);
  });
  propsEl.appendChild(t);
  TREES.push({el:t,ph:i*2.1});
});
/* lampu jalan foreground: berdiri di sudut bawah layar (depan kamera),
   sehingga tidak pernah dilintasi bola yang menggelinding di trotoar */
const LAMPS=[];
P.lampX.forEach((x,i)=>{
  const l=document.createElement('div');
  l.className='lamp';
  l.style.cssText+=`left:${x}px;top:${H-P.lampH}px;width:40px;height:${P.lampH}px;`;
  const pole=document.createElement('div');
  pole.className='pole';pole.style.height=(P.lampH-14)+'px';
  l.appendChild(pole);
  const head=document.createElement('div');
  head.className='head';head.style.top='0px';
  l.appendChild(head);
  const glow=document.createElement('div');
  glow.className='glow';glow.style.top=(-70)+'px';
  l.appendChild(glow);
  propsEl.appendChild(l);
  LAMPS.push({el:l,glow,ph:i*0.9});
});

/* ---------- papan tulis kafe (S4) + podium tangga (S3) ---------- */
const slate=document.createElement('div');
slate.className='board slate center';
slate.style.cssText+=`left:${P.slateX}px;top:${P.slateBot-P.slateH}px;width:${P.slateW}px;height:${P.slateH}px;opacity:0;`;
const eqT=document.createElement('div');
eqT.className='mono';
eqT.style.cssText+=`margin-top:${Math.round(P.slateH*0.16)}px;font-weight:800;color:#FFF7D6;
  font-size:${P.eqFS}px;text-shadow:0 0 18px rgba(255,247,214,.35);`;
eqT.textContent='1/2+1/2=1';
slate.appendChild(eqT);
const eqLab=document.createElement('div');
eqLab.style.cssText+=`margin-top:${Math.round(P.slateH*0.1)}px;color:#BFD3E0;font-weight:700;
  letter-spacing:.14em;font-size:${P.labFS}px;`;
eqLab.textContent='CARA BEBAS, HASIL SESUAI ATURAN';
slate.appendChild(eqLab);
propsEl.appendChild(slate);

const STEPS=[];
for(let i=0;i<5;i++){
  const st=document.createElement('div');
  st.className='step';
  st.style.cssText+=`left:${P.friendX[i]-P.stepW/2}px;top:${P.backY-(i+1)*P.stepRise}px;
    width:${P.stepW}px;height:${P.stepH}px;opacity:0;`;
  propsEl.appendChild(st);
  STEPS.push({el:st,t0:26.9+i*0.1});
}

/* ---------- papan pengumuman CTA ---------- */
const cta=document.getElementById('cta');
cta.style.cssText+=`left:${P.ctaX}px;top:${P.ctaY}px;width:${P.ctaW}px;height:${P.ctaH}px;`;
const fOpen=document.getElementById('f_open');
fOpen.style.cssText+=`position:absolute;left:40px;right:40px;top:${P.ctaOff[0]}px;font-size:${P.openFS}px;`;
const fOpenE=document.getElementById('f_open_e');
fOpenE.style.cssText+=`position:absolute;left:40px;right:40px;top:${P.ctaOff[1]}px;font-size:${P.openEFS}px;`;
const fUrl=document.getElementById('f_url');
fUrl.style.cssText+=`position:absolute;left:40px;right:40px;top:${P.ctaOff[2]}px;font-size:${P.urlFS}px;
  background:linear-gradient(92deg,#22D3EE 0%,#A78BFA 52%,#FBBF24 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;`;
const fBar=document.getElementById('f_bar');
fBar.style.cssText+=`position:absolute;left:40px;top:${P.ctaOff[2]+Math.round(P.urlFS*1.32)}px;width:0;`;
const fPill=document.getElementById('f_pill');
fPill.style.cssText+=`left:${Math.round((P.ctaW-P.pillW)/2)}px;bottom:${P.ctaPillB}px;width:${P.pillW}px;height:${P.pillH}px;
  font-size:${P.pillFS}px;letter-spacing:.10em;`;

/* ---------- karakter bola: mentor emas + lima teman (bermata) ---------- */
function makeBall(host,cols,d,opts){
  const el=document.createElement('div');
  el.className='bchar';
  el.style.cssText+=`width:${d}px;height:${d}px;margin-left:${-d/2}px;opacity:0;`;
  const core=document.createElement('div');
  core.style.cssText+=`left:0;top:0;width:${d}px;height:${d}px;
    background:radial-gradient(circle at 33% 27%, ${cols[0]} 0%, ${cols[1]} 42%, ${cols[2]} 100%);
    box-shadow:0 0 ${d*0.5}px ${opts&&opts.glow?cols[1]:'rgba(20,30,50,.0)'}55;`;
  el.appendChild(core);
  const shine=document.createElement('div');
  shine.style.cssText+=`left:${d*0.18}px;top:${d*0.1}px;width:${d*0.3}px;height:${d*0.17}px;transform:rotate(-24deg);`;
  el.appendChild(shine);
  const eyes=document.createElement('div');
  eyes.style.cssText+=`left:${d*0.22}px;top:${d*0.34}px;width:${d*0.56}px;height:${d*0.2}px;`;
  const pupils=[];
  [0,1].forEach(s=>{
    const e=document.createElement('div');
    e.className='eye';
    e.style.cssText+=`${s?'right':'left'}:0;top:0;width:${d*0.2}px;height:${d*0.2}px;`;
    const pu=document.createElement('div');
    pu.className='pupil';
    pu.style.cssText+=`left:${d*0.055}px;top:${d*0.05}px;width:${d*0.09}px;height:${d*0.09}px;`;
    e.appendChild(pu);
    eyes.appendChild(e);
    pupils.push({el:pu,e});
  });
  el.appendChild(eyes);
  const bl1=document.createElement('div');
  bl1.className='blush';
  bl1.style.cssText+=`left:${d*0.08}px;top:${d*0.58}px;width:${d*0.14}px;height:${d*0.08}px;`;
  el.appendChild(bl1);
  const bl2=document.createElement('div');
  bl2.className='blush';
  bl2.style.cssText+=`left:${d*0.78}px;top:${d*0.58}px;width:${d*0.14}px;height:${d*0.08}px;`;
  el.appendChild(bl2);
  host.appendChild(el);
  return {el,core,eyes,pupils,d,ph:(opts&&opts.ph)||0};
}
const charsEl=document.getElementById('chars');
const GROUPS=[
  {name:'ASLI',ex:'1 2 3',c:['#CBE9FF','#38BDF8','#1D6FA5']},
  {name:'CACAH',ex:'0 1 2',c:['#E2D9FF','#A78BFA','#5B3FA8']},
  {name:'BULAT',ex:'-2 -1 0',c:['#FBD0E6','#F472B6','#B03A78']},
  {name:'RASIONAL',ex:'1/2 3/4',c:['#C4F5DF','#34D399','#178F63']},
  {name:'IRASIONAL',ex:'\u221A2 \u03C0',c:['#FDE9AE','#FBBF24','#A8720B']}
];
const FRIENDS=[];
GROUPS.forEach((g,i)=>{
  const d=i===4?P.irrD:P.friendD;
  const f=makeBall(charsEl,g.c,d,{ph:i*1.3});
  const sh=document.createElement('div');
  sh.className='bsh';
  sh.style.cssText+=`width:${d*0.8}px;height:13px;margin-left:${-d*0.4}px;top:-9px;`;
  charsEl.appendChild(sh);
  const pl=document.createElement('div');
  pl.className='gplate';
  pl.style.cssText+=`left:${P.friendX[i]-P.plateW/2}px;top:${P.plateY}px;width:${P.plateW}px;height:${P.plateH}px;
    font-size:${P.plateFS}px;border-color:${g.c[2]};opacity:0;`;
  pl.textContent=g.ex;
  propsEl.appendChild(pl);
  FRIENDS.push({ball:f,sh,pl,t0:[17.4,18.0,18.6,20.0,23.5][i],hopT0:[27.0,28.2,29.4,30.6,31.8][i]});
});
/* bayangan mentor (di bawah mentor, di atas teman) */
const msh=document.createElement('div');
msh.className='bsh';
msh.style.cssText+=`width:${P.ballD*0.8}px;height:15px;margin-left:${-P.ballD*0.4}px;top:-10px;`;
charsEl.appendChild(msh);
/* mentor ditambahkan terakhir agar berada di lapisan paling depan */
const mentor=makeBall(charsEl,['#FFF3C4','#FCD34D','#B45309'],P.ballD,{ph:0,glow:true});
/* kembaran bola emas untuk demo belah dua (1/2 dan 1/2+1/2=1) */
const ballB=document.createElement('div');
ballB.style.cssText+=`position:absolute;left:${P.ctaX}px;top:${P.groundY-Math.round(P.ballD*0.52)}px;
  width:${Math.round(P.ballD*0.52)}px;height:${Math.round(P.ballD*0.52)}px;margin-left:${-Math.round(P.ballD*0.26)}px;
  border-radius:50%;background:radial-gradient(circle at 33% 27%, #FFF3C4 0%, #FCD34D 34%, #F59E0B 68%, #B45309 100%);
  box-shadow:0 0 30px rgba(251,191,36,.25);opacity:0;will-change:transform,opacity;`;
charsEl.appendChild(ballB);
/* percikan bintang emas */
const spark=document.createElement('div');
spark.className='starclip';
spark.style.cssText+=`position:absolute;width:34px;height:34px;opacity:0;`;
charsEl.appendChild(spark);

/* ---------- kunang-kunang senja (S5) ---------- */
const firefliesEl=document.getElementById('fireflies');
const FF=[];
for(let i=0;i<12;i++){
  const f=document.createElement('div');
  f.style.cssText+=`position:absolute;border-radius:50%;width:7px;height:7px;background:#FFE9A8;
    box-shadow:0 0 12px rgba(255,233,168,.9);opacity:0;will-change:transform,opacity;`;
  firefliesEl.appendChild(f);
  FF.push({el:f,x:rnd()*W,y:P.groundY-40-rnd()*220,sp:rnd()*1.4+0.5,ph:rnd()*6.28,amp:rnd()*22+8});
}

/* subjudul + watermark */
const subbar=document.getElementById('subbar');
const subId=document.getElementById('sub_id');
const subEn=document.getElementById('sub_en');
subId.style.fontSize=P.subId+'px';
subEn.style.fontSize=P.subEn+'px';
subEn.style.marginTop='6px';
subbar.style.top=P.subTop+'px';
subbar.style.maxWidth=P.subMax+'px';
subbar.style.width='max-content';
const wm=document.getElementById('wm');
wm.style.cssText+=`top:${P.wmY}px;font-size:${P.wmFS}px;left:50%;transform:translateX(-50%);
  width:max-content;padding:9px 30px;background:rgba(14,22,42,.46);border-radius:999px;`;
