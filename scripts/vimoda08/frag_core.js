const Q=new URLSearchParams(location.search);
const ORIENT=Q.get('o')||'landscape';
const W=ORIENT==='portrait'?1080:1920;
const H=ORIENT==='portrait'?1920:1080;

/* v08 "Bulina: Bilangan Asli & Bilangan Cacah" - dunia Kota Bilangan
   (gedung, kedai berjendela, jalan raya berisi mobil, trotoar, pohon, lampu;
   siang menuju senja). Karakter: HANYA bola emas mentor, BULAT SEJATI,
   tanpa mata (aturan 23). Copy selalu soft selling, tanpa kalimat intimidasi
   (aturan 25). Subjudul di zona aman sosmed (aturan 24); watermark AKIOMIDA
   wajib selalu terlihat di tepi paling bawah tanpa menutupi konten apa pun. */
const P = ORIENT==='portrait' ? {
  bldBot:950, roadTop:950, roadBot:1028, walkTop:1032, walkBot:1152,
  groundY:1120, backY:1050,
  shopY:560, shopH:256, shopW:200, shopX:[70,310,550,790], awnY:518, awnH:44,
  plqY:420, plqS:66, plqX0:407, plqGap:82,
  titleY:300, titleS0:104, titleSN:82,
  zbX:410, zbY:560, zbW:260, zbH:200,
  zcY:600, zcW:250, zcH:48, zcFS:21, zc1X:130, zc2X:700,
  famX:150, famY:430, famW:780, famH:300, famHd:54, famRow:74, famName:30, famMem:26,
  slateX:30, slateBot:1140, slateW:300, slateH:196, eqFS:46, labFS:17,
  ctaX:80, ctaY:430, ctaW:920, ctaH:540, ctaOff:[64,124,196], ctaPillB:44,
  openFS:36, openEFS:16, urlFS:92,
  pillW:430, pillH:74, pillFS:32,
  subTop:1170, subId:50, subEn:24, subMax:760,
  ballD:110, wmY:1800, wmFS:20,
  marD:40, marGap:10, marX0:345, marY:758,
  qmX:516, qmY:740, qmFS:84,
  treeX:[36,1060], treeS:1.0, lampX:[80,1000], lampH:210,
  carY:962, carW:210, carH:64, carH2:52,
  plazaY:1032
} : {
  bldBot:430, roadTop:430, roadBot:505, walkTop:508, walkBot:630,
  groundY:660, backY:600,
  shopY:270, shopH:150, shopW:230, shopX:[130,630,1130,1630], awnY:234, awnH:34,
  plqY:238, plqS:56, plqX0:870, plqGap:74,
  titleY:150, titleS0:88, titleSN:72,
  zbX:810, zbY:270, zbW:300, zbH:220,
  zcY:330, zcW:210, zcH:44, zcFS:17, zc1X:490, zc2X:1230,
  famX:560, famY:240, famW:800, famH:216, famHd:40, famRow:46, famName:24, famMem:22,
  slateX:250, slateBot:680, slateW:330, slateH:164, eqFS:40, labFS:15,
  ctaX:530, ctaY:240, ctaW:860, ctaH:320, ctaOff:[40,90,130], ctaPillB:30,
  openFS:30, openEFS:14, urlFS:80,
  pillW:400, pillH:66, pillFS:28,
  subTop:740, subId:50, subEn:24, subMax:1300,
  ballD:96, wmY:1010, wmFS:18,
  marD:36, marGap:8, marX0:160, marY:380,
  qmX:300, qmY:372, qmFS:64,
  treeX:[110,1810], treeS:0.9, lampX:[120,1800], lampH:170,
  carY:442, carW:190, carH:56, carH2:46,
  plazaY:508
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
let _seed=20261116;
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
/* plak nomor pintu 1 2 3 (hook: menghitung mulai dari 1) */
const PLQ=[];
['1','2','3'].forEach((g,i)=>{
  const p=document.createElement('div');
  p.className='plaque';
  p.style.cssText+=`left:${P.plqX0+i*P.plqGap}px;top:${P.plqY}px;width:${P.plqS}px;height:${P.plqS+8}px;opacity:0;`;
  const b=document.createElement('b');
  b.style.fontSize=Math.round(P.plqS*0.62)+'px';b.textContent=g;
  p.appendChild(b);townEl.appendChild(p);
  PLQ.push({el:p,t0:0.9+i*0.22});
});

/* ---------- empat jendela kedai berisi situasi bilangan asli ---------- */
const SHOPS=[];
{
  const defs=[
    {x:P.shopX[0],t0:6.9,kind:'books'},
    {x:P.shopX[1],t0:8.85,kind:'students'},
    {x:P.shopX[2],t0:10.35,kind:'apples'},
    {x:P.shopX[3],t0:10.45,kind:'endless'}
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
    chip.style.cssText+=`left:${d.x+P.shopW*0.14}px;top:${P.shopY+P.shopH-40}px;width:${P.shopW*0.72}px;height:34px;
      font-size:${ORIENT==='portrait'?20:16}px;line-height:34px;opacity:0;`;
    townEl.appendChild(w);townEl.appendChild(awn);townEl.appendChild(chip);
    const sit=document.createElement('div');
    sit.className='sit';
    w.appendChild(sit);
    SHOPS.push({win:w,awn,sit,chip,t0:d.t0,kind:d.kind});
  });
  const [bw,bh]=[P.shopW,P.shopH];
  const S=SHOPS;
  /* kedai buku: tiga buku bertumpuk (ada 3 buku di meja) */
  {
    const cols=['#E15B5B','#5B8FE1','#4FA35C'];
    cols.forEach((c,i)=>{
      const b=document.createElement('div');
      b.style.cssText=`position:absolute;left:${bw*0.32-(i%2)*8}px;top:${bh-58-(i+1)*26}px;width:${bw*0.4-(i%2)*6}px;height:22px;
        border-radius:4px;background:${c};box-shadow:inset 0 -5px 0 rgba(0,0,0,.2);`;
      S[0].sit.appendChild(b);
    });
    S[0].chip.textContent='3 BUKU';
  }
  /* kedai siswa: lima sosok kecil (ada 5 siswa di ruangan) */
  {
    const cols=['#5B8FE1','#A78BFA','#4FA35C','#F2C230','#E15B5B'];
    cols.forEach((c,i)=>{
      const px=bw*(0.13+i*0.155);
      const hd=document.createElement('div');
      hd.style.cssText=`position:absolute;left:${px}px;top:${bh*0.24}px;width:${bw*0.09}px;height:${bw*0.09}px;
        border-radius:50%;background:${c};`;
      S[1].sit.appendChild(hd);
      const bd=document.createElement('div');
      bd.style.cssText=`position:absolute;left:${px-bw*0.008}px;top:${bh*0.24+bw*0.11}px;width:${bw*0.106}px;height:${bh*0.2}px;
        border-radius:${bw*0.05}px;background:${c};opacity:.85;`;
      S[1].sit.appendChild(bd);
    });
    S[1].chip.textContent='5 SISWA';
  }
  /* kedai apel: dua baris dua belas apel di atas keranjang */
  {
    for(let r=0;r<2;r++)for(let j=0;j<6;j++){
      const a=document.createElement('div');
      a.style.cssText=`position:absolute;left:${bw*(0.1+j*0.135)}px;top:${bh*(0.16+r*0.18)}px;width:${bw*0.1}px;height:${bw*0.1}px;
        border-radius:50%;background:radial-gradient(circle at 35% 30%,#F08A7A 0%,#D3452F 70%,#A82A1A 100%);`;
      S[2].sit.appendChild(a);
    }
    const bk=document.createElement('div');
    bk.style.cssText=`position:absolute;left:${bw*0.2}px;top:${bh*0.52}px;width:${bw*0.6}px;height:${bh*0.24}px;
      border-radius:0 0 60px 60px;background:linear-gradient(180deg,#A96F35,#8B5A2B);box-shadow:inset 0 -8px 0 rgba(0,0,0,.2);`;
    S[2].sit.appendChild(bk);
    S[2].chip.textContent='12 APEL';
  }
  /* kedai tanpa batas: hitung terus 1 2 3 4 5 ... */
  {
    const num=document.createElement('div');
    num.className='mono';
    num.style.cssText=`position:absolute;left:0;top:${bh*0.24}px;width:100%;text-align:center;font-weight:800;
      color:#35507A;font-size:${Math.round(bw*0.14)}px;`;
    num.textContent='1 2 3 4 5';
    S[3].sit.appendChild(num);
    const dots=document.createElement('div');
    dots.className='mono';
    dots.style.cssText=`position:absolute;left:0;top:${bh*0.5}px;width:100%;text-align:center;font-weight:800;
      color:#F2C230;font-size:${Math.round(bw*0.2)}px;`;
    dots.textContent='...';
    S[3].sit.appendChild(dots);
    S[3].chip.textContent='TANPA BATAS';
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
  c.appendChild(body);
  body.style.background=col;
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

/* ---------- pohon + lampu foreground ---------- */
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
const LAMPS=[];
P.lampX.forEach((x,i)=>{
  const l=document.createElement('div');
  l.className='lamp';
  l.style.cssText+=`left:${x}px;top:${H-P.lampH}px;width:40px;height:${P.lampH}px;`;
  const pole=document.createElement('div');
  pole.className='pole';pole.style.height=(P.lampH-14)+'px';
  l.appendChild(pole);
  const head=document.createElement('div');
  head.className='head';
  l.appendChild(head);
  const glow=document.createElement('div');
  glow.className='glow';
  l.appendChild(glow);
  propsEl.appendChild(l);
  LAMPS.push({el:l,glow,ph:i*0.9});
});

/* ---------- papan tulis kafe (S5: peran nol di nilai tempat) ---------- */
const slate=document.createElement('div');
slate.className='board slate center';
slate.style.cssText+=`left:${P.slateX}px;top:${P.slateBot-P.slateH}px;width:${P.slateW}px;height:${P.slateH}px;opacity:0;`;
const eqT=document.createElement('div');
eqT.className='mono';
eqT.style.cssText+=`margin-top:${Math.round(P.slateH*0.16)}px;font-weight:800;color:#FFF7D6;
  font-size:${P.eqFS}px;text-shadow:0 0 18px rgba(255,247,214,.35);`;
eqT.textContent='10';
slate.appendChild(eqT);
const eqLab=document.createElement('div');
eqLab.style.cssText+=`margin-top:${Math.round(P.slateH*0.08)}px;color:#BFD3E0;font-weight:700;
  letter-spacing:.1em;font-size:${P.labFS}px;text-align:center;padding:0 14px;`;
eqLab.textContent='NOL MENJAGA POSISI: 1 PULUHAN + 0 SATUAN';
slate.appendChild(eqLab);
propsEl.appendChild(slate);

/* ---------- keranjang kosong (S3: kapan nol dipakai) ---------- */
const zb=document.createElement('div');
zb.style.cssText+=`position:absolute;left:${P.zbX}px;top:${P.zbY}px;width:${P.zbW}px;height:${P.zbH}px;opacity:0;will-change:transform,opacity;`;
{
  const hd=document.createElement('div');
  hd.className='zpart';
  hd.style.cssText+=`left:${P.zbW*0.25}px;top:0;width:${P.zbW*0.5}px;height:${P.zbH*0.42}px;border:${Math.round(P.zbW*0.055)}px solid #6E4420;
    border-radius:50%;`;
  zb.appendChild(hd);
  const rim=document.createElement('div');
  rim.className='zpart';
  rim.style.cssText+=`left:0;top:${P.zbH*0.4}px;width:100%;height:${Math.round(P.zbH*0.12)}px;border-radius:10px;background:#6E4420;`;
  zb.appendChild(rim);
  const bd=document.createElement('div');
  bd.className='zpart';
  bd.style.cssText+=`left:${P.zbW*0.06}px;top:${P.zbH*0.48}px;width:${P.zbW*0.88}px;height:${P.zbH*0.4}px;
    border-radius:0 0 70px 70px/0 0 46px 46px;background:linear-gradient(180deg,#A96F35,#8B5A2B);box-shadow:inset 0 -8px 0 rgba(0,0,0,.2);`;
  zb.appendChild(bd);
  const tag=document.createElement('div');
  tag.className='zchip';
  tag.style.cssText+=`left:${P.zbW*0.5-75}px;top:${P.zbH*0.56}px;width:150px;height:40px;
    font-size:${ORIENT==='portrait'?20:18}px;`;
  tag.textContent='0 APEL';
  zb.appendChild(tag);
}
propsEl.appendChild(zb);
/* dua situasi nol lainnya: pesan baru dan peserta datang */
const ZCHIPS=[];
[['0 PESAN BARU',P.zc1X],['0 PESERTA',P.zc2X]].forEach(([txt,x])=>{
  const z=document.createElement('div');
  z.className='zchip';
  z.style.cssText+=`left:${x}px;top:${P.zcY}px;width:${P.zcW}px;height:${P.zcH}px;font-size:${P.zcFS}px;opacity:0;`;
  z.textContent=txt;
  propsEl.appendChild(z);
  ZCHIPS.push({el:z,t0:23.47});
});

/* ---------- panel ASLI vs CACAH (S4) ---------- */
const famEl=document.createElement('div');
famEl.className='fam';
famEl.style.cssText+=`left:${P.famX}px;top:${P.famY}px;width:${P.famW}px;height:${P.famH}px;opacity:0;`;
const famHd=document.createElement('div');
famHd.style.cssText+=`text-align:center;font-weight:800;color:#FFE9A8;letter-spacing:.12em;
  font-size:${P.famHd}px;`;
famHd.textContent='ASLI vs CACAH';
famEl.appendChild(famHd);
const CMP_ROWS=[];
[['ASLI','1 2 3 4 5 ...','#38BDF8',26.3],['CACAH','0 1 2 3 4 5 ...','#A78BFA',27.4]].forEach(([name,ex,col,t0])=>{
  const r=document.createElement('div');
  r.style.cssText+=`display:flex;align-items:center;height:${P.famRow}px;opacity:0;`;
  const dot=document.createElement('div');
  dot.style.cssText+=`width:${Math.round(P.famName*0.6)}px;height:${Math.round(P.famName*0.6)}px;border-radius:50%;
    background:${col};margin-right:16px;flex:none;`;
  r.appendChild(dot);
  const nm=document.createElement('div');
  nm.style.cssText+=`font-weight:800;color:#FFFFFF;font-size:${P.famName}px;flex:1;`;
  nm.textContent=name;
  r.appendChild(nm);
  const exs=document.createElement('div');
  exs.className='mono';
  exs.style.cssText+=`font-weight:800;color:#C7D6EC;font-size:${P.famMem}px;`;
  exs.textContent=ex;
  r.appendChild(exs);
  famEl.appendChild(r);
  CMP_ROWS.push({el:r,t0});
});
const famNote=document.createElement('div');
famNote.style.cssText+=`display:flex;align-items:center;justify-content:center;height:${ORIENT==='portrait'?56:40}px;
  margin-top:6px;border-radius:12px;background:rgba(251,191,36,.14);color:#FFE9A8;font-weight:800;
  letter-spacing:.08em;font-size:${ORIENT==='portrait'?22:16}px;opacity:0;`;
famNote.textContent='SEMUA ASLI ADA DI CACAH';
famEl.appendChild(famNote);
propsEl.appendChild(famEl);

/* ---------- papan pengumuman CTA ---------- */
const cta=document.getElementById('cta');
cta.style.cssText+=`left:${P.ctaX}px;top:${P.ctaY}px;width:${P.ctaW}px;height:${P.ctaH}px;`;
const fOpen=document.getElementById('f_open');
fOpen.style.cssText+=`position:absolute;left:40px;right:40px;top:${P.ctaOff[0]}px;font-size:${P.openFS}px;
  font-weight:800;color:#FFFFFF;text-align:center;`;
const fOpenE=document.getElementById('f_open_e');
fOpenE.style.cssText+=`position:absolute;left:40px;right:40px;top:${P.ctaOff[1]}px;font-size:${P.openEFS}px;
  color:#B9C7DC;font-weight:600;text-align:center;`;
const fUrl=document.getElementById('f_url');
fUrl.style.cssText+=`position:absolute;left:40px;right:40px;top:${P.ctaOff[2]}px;font-size:${P.urlFS}px;
  background:linear-gradient(92deg,#22D3EE 0%,#A78BFA 52%,#FBBF24 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;`;
const fBar=document.getElementById('f_bar');
fBar.style.cssText+=`position:absolute;left:40px;top:${P.ctaOff[2]+Math.round(P.urlFS*1.32)}px;width:0;`;
const fPill=document.getElementById('f_pill');
fPill.style.cssText+=`left:${Math.round((P.ctaW-P.pillW)/2)}px;bottom:${P.ctaPillB}px;width:${P.pillW}px;height:${P.pillH}px;
  font-size:${P.pillFS}px;letter-spacing:.1em;`;

/* ---------- karakter: HANYA bola emas mentor, bulat sejati, tanpa mata ---------- */
const charsEl=document.getElementById('chars');
function makeBall(cols,d,glow){
  const el=document.createElement('div');
  el.className='bchar';
  el.style.cssText+=`width:${d}px;height:${d}px;margin-left:${-d/2}px;opacity:0;`;
  const core=document.createElement('div');
  core.className='core';
  core.style.cssText+=`left:0;top:0;width:${d}px;height:${d}px;
    background:radial-gradient(circle at 33% 27%, ${cols[0]} 0%, ${cols[1]} 42%, ${cols[2]} 100%);`;
  if(glow)core.style.boxShadow=`0 0 ${Math.round(d*0.55)}px rgba(251,191,36,.5)`;
  el.appendChild(core);
  const shine=document.createElement('div');
  shine.className='shine';
  shine.style.cssText+=`left:${d*0.18}px;top:${d*0.1}px;width:${d*0.3}px;height:${d*0.17}px;transform:rotate(-24deg);`;
  el.appendChild(shine);
  charsEl.appendChild(el);
  return {el,d};
}
const mentor=makeBall(['#FFF3C4','#FCD34D','#B45309'],P.ballD,true);
const msh=document.createElement('div');
msh.className='bsh';
msh.style.cssText+=`width:${P.ballD*0.8}px;height:15px;margin-left:${-P.ballD*0.4}px;top:-10px;`;
charsEl.appendChild(msh);
const ballB=document.createElement('div');
ballB.style.cssText+=`position:absolute;left:0;top:${P.groundY-Math.round(P.ballD*0.52)}px;
  width:${Math.round(P.ballD*0.52)}px;height:${Math.round(P.ballD*0.52)}px;margin-left:${-Math.round(P.ballD*0.26)}px;
  border-radius:50%;background:radial-gradient(circle at 33% 27%, #FFF3C4 0%, #FCD34D 34%, #F59E0B 68%, #B45309 100%);
  box-shadow:0 0 30px rgba(251,191,36,.25);opacity:0;will-change:transform,opacity;`;
charsEl.appendChild(ballB);
const spark=document.createElement('div');
spark.className='starclip';
spark.style.cssText+=`position:absolute;width:34px;height:34px;opacity:0;`;
charsEl.appendChild(spark);

/* ---------- kelereng latihan (S6): properti, bukan karakter ---------- */
const mbox=document.createElement('div');
const MARBLES=[];
['#E15B5B','#5B8FE1','#4FA35C','#F2C230','#A78BFA','#38BDF8','#F472B6','#FBBF24'].forEach((col,i)=>{
  const m=document.createElement('div');
  m.className='marble';
  m.style.cssText+=`left:${P.marX0+i*(P.marD+P.marGap)}px;top:${P.marY}px;width:${P.marD}px;height:${P.marD}px;
    background:radial-gradient(circle at 33% 27%, ${col} 0%, ${col} 55%, rgba(0,0,0,.35) 130%);opacity:0;`;
  mbox.appendChild(m);
  MARBLES.push({el:m});
});
const qmark=document.createElement('div');
qmark.className='qmark';
qmark.style.cssText+=`left:${P.qmX}px;top:${P.qmY}px;font-size:${P.qmFS}px;opacity:0;`;
qmark.textContent='?';
mbox.appendChild(qmark);
stage.appendChild(mbox); /* paling atas agar terbaca di atas papan CTA */

/* ---------- kunang-kunang senja (S6) ---------- */
const firefliesEl=document.getElementById('fireflies');
const FF=[];
for(let i=0;i<12;i++){
  const f=document.createElement('div');
  f.style.cssText+=`position:absolute;border-radius:50%;width:7px;height:7px;background:#FFE9A8;
    box-shadow:0 0 12px rgba(255,233,168,.9);opacity:0;will-change:transform,opacity;`;
  firefliesEl.appendChild(f);
  FF.push({el:f,x:rnd()*W,y:P.groundY-40-rnd()*220,sp:rnd()*1.4+0.5,ph:rnd()*6.28,amp:rnd()*22+8});
}

/* subjudul + watermark (zona aman sosmed; wm di tepi paling bawah) */
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
