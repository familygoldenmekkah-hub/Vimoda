const Q=new URLSearchParams(location.search);
const ORIENT=Q.get('o')||'landscape';
const W=ORIENT==='portrait'?1080:1920;
const H=ORIENT==='portrait'?1920:1080;

/* v07 rombak total ala modeling 60719beb: dunia pixel layar penuh,
   teks besar nyaman (subtitle raksasa, judul raksasa, tokoh bernama),
   satu ide per layar, panel gelap ala UI game. */
const P = ORIENT==='portrait' ? {
  groundY:1230, grassH:26,
  plankY:988, plankN:4, plankW:236, plankGap:22,
  blkY1:150, blkS1:150, blkG1:18, blkY2:520, blkS2:130,
  titleY:330, titleS0:110, titleSN:86,
  ttX:[180,540,110,980,170,260],
  tw0:[447,1.0], twGap:28, tileS:130, tagS:30,
  gtGap:12, gtS:132, gtTag:26, gtDg:40, gtEn:14,
  propX:[330,750],
  famX:120, famY:440, famW:840, famHd:74, famRow:78, famName:30, famMem:40,
  eqX:100, eqY:470, eqW:880, eqH:206, eqSize:88,
  ctaX:80, ctaY:330, ctaW:920, ctaH:540, ctaOpen:38, ctaOpenE:17, ctaUrl:94,
  subTop:1390, subId:54, subEn:26, subMax:940,
  chatX:70, chatY:640, chatW:470, chatWho:27, chatMsg:32,
  ballD:110, qX:846, qY:560, qSize:132,
  wmY:1852, wmSize:20
} : {
  groundY:828, grassH:22,
  plankY:662, plankN:5, plankW:320, plankGap:24,
  blkY1:118, blkS1:130, blkG1:16, blkY2:470, blkS2:110,
  titleY:308, titleS0:94, titleSN:80,
  ttX:[300,900,470,1560,300,420],
  tw0:[756,1.0], twGap:28, tileS:120, tagS:27,
  gtGap:12, gtS:124, gtTag:24, gtDg:36, gtEn:13,
  propX:[660,1120],
  famX:460, famY:340, famW:1000, famHd:64, famRow:70, famName:26, famMem:34,
  eqX:510, eqY:268, eqW:900, eqH:180, eqSize:76,
  ctaX:530, ctaY:208, ctaW:860, ctaH:470, ctaOpen:32, ctaOpenE:15, ctaUrl:82,
  subTop:880, subId:50, subEn:24, subMax:1560,
  chatX:380, chatY:480, chatW:440, chatWho:24, chatMsg:29,
  ballD:96, qX:1420, qY:300, qSize:118,
  wmY:1018, wmSize:20
};
const MX=60;
const stage=document.getElementById('stage');
stage.style.width=W+'px';stage.style.height=H+'px';

/* ---------- easing & util ---------- */
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
const mulberry=(s)=>()=>{s|=0;s=s+0x6D2B79F5|0;let q=Math.imul(s^s>>>15,1|s);q=q+Math.imul(q^q>>>7,61|q)^q;return((q^q>>>14)>>>0)/4294967296;};
const rnd=mulberry(20261115);

/* ---------- langit: bintang + partikel digit ---------- */
const stars=document.getElementById('stars');
stars.style.cssText='position:absolute;inset:0;';
const ST=[];
for(let i=0;i<46;i++){
  const s=document.createElement('i');
  const sz=(2+rnd()*3).toFixed(0);
  s.style.cssText=`left:${(rnd()*W).toFixed(0)}px;top:${(rnd()*(P.groundY-140)).toFixed(0)}px;width:${sz}px;height:${sz}px;`;
  stars.appendChild(s);
  ST.push({el:s,ph:rnd()*6.28,sp:.5+rnd()*1.2});
}
const parts=document.getElementById('particles');
const CH='0123456789+=/\u00BD\u00B0\u00D7';
const NP=18, PA=[];
for(let i=0;i<NP;i++){
  const el=document.createElement('span');
  el.textContent=CH[Math.floor(rnd()*CH.length)];
  el.style.fontSize=(15+rnd()*22).toFixed(0)+'px';
  el.style.fontWeight=(rnd()<.3?'700':'400');
  parts.appendChild(el);
  PA.push({el,x:rnd()*W,y0:rnd()*H,sp:5+rnd()*11,wf:.3+rnd()*.7,ph:rnd()*6.28,o:.13+rnd()*.15});
}

/* ---------- tanah, papan kayu, blok digit ---------- */
const dirt=document.getElementById('dirt');
const soil=document.getElementById('soil'), grass=document.getElementById('grass');
soil.style.cssText+=`top:${P.grassH}px;bottom:0;`;
grass.style.cssText+=`top:0;height:${P.grassH}px;`;
dirt.style.cssText+=`top:${P.groundY}px;bottom:0;`;
const planks=document.getElementById('planks');
{
  const total=P.plankN*P.plankW+(P.plankN-1)*P.plankGap;
  const x0=(W-total)/2;
  for(let i=0;i<P.plankN;i++){
    const s=document.createElement('div');s.className='plankseg';
    s.style.cssText+=`left:${x0+i*(P.plankW+P.plankGap)}px;top:${P.plankY}px;width:${P.plankW}px;height:26px;`;
    const l1=document.createElement('div');l1.className='plankleg';
    l1.style.cssText+=`left:22px;top:${P.plankY+26}px;width:16px;height:14px;`;
    const l2=document.createElement('div');l2.className='plankleg';
    l2.style.cssText+=`left:${P.plankW-38}px;top:${P.plankY+26}px;width:16px;height:14px;`;
    s.appendChild(l1);s.appendChild(l2);planks.appendChild(s);
  }
  const chips=['1','0','5','+'];
  for(let i=0;i<3;i++){
    const c=document.createElement('div');c.className='chipd';
    c.style.cssText+=`left:${x0+60+i*310}px;top:${P.plankY-20}px;width:22px;height:22px;`+
      `display:flex;align-items:center;justify-content:center;font-size:13px;`;
    c.textContent=chips[i];
    planks.appendChild(c);
  }
}
const blocks=document.getElementById('blocks');
const BLK=[];
const ROWS1=['1','2','3','0','5'];
const ROWS2=['1/2','\u03C0','-5\u00B0','7'];
function buildBlkRow(list,y,sz,gap,fs){
  const total=list.length*sz+(list.length-1)*gap;
  const x0=(W-total)/2;
  list.forEach((g,i)=>{
    const b=document.createElement('div');b.className='digblk';
    b.style.cssText+=`left:${x0+i*(sz+gap)}px;top:${y}px;width:${sz}px;height:${sz}px;opacity:0;`;
    const t=document.createElement('b');
    t.style.fontSize=fs+'px';t.textContent=g;
    b.appendChild(t);blocks.appendChild(b);
    BLK.push({el:b,ph:i*0.7+((y===P.blkY1)?0:2.1),t0:y===P.blkY1?0.35:0.85});
  });
}
buildBlkRow(ROWS1,P.blkY1,P.blkS1,P.blkG1,Math.round(P.blkS1*0.42));
buildBlkRow(ROWS2,P.blkY2,P.blkS2,P.blkG1,Math.round(P.blkS2*0.36));

/* ---------- tokoh utama: bulatan emas BABOPA ---------- */
function buildGoldBall(host,d){
  const el=document.createElement('div');
  el.style.cssText=`position:absolute;left:${P.ttX[0]}px;top:${P.groundY}px;width:${d}px;height:${d}px;margin-left:${-d/2}px;transform-origin:50% 100%;will-change:transform,opacity,left;opacity:0;`;
  const core=document.createElement('div');
  core.style.cssText=`position:absolute;left:0;top:${-d}px;width:${d}px;height:${d}px;border-radius:50%;background:radial-gradient(circle at 33% 27%, #FFF3C4 0%, #FCD34D 34%, #F59E0B 68%, #B45309 100%);box-shadow:inset -7px -11px 20px rgba(120,53,15,.35), 0 0 50px rgba(251,191,36,.30);`;
  el.appendChild(core);
  const shine=document.createElement('div');
  shine.style.cssText=`position:absolute;left:${d*0.18}px;top:${-d*0.89}px;width:${d*0.32}px;height:${d*0.18}px;border-radius:50%;background:rgba(255,255,255,.72);filter:blur(2px);transform:rotate(-24deg);`;
  el.appendChild(shine);
  const sweat=document.createElement('div');
  sweat.style.cssText=`position:absolute;left:${d*0.75}px;top:${-d*1.14}px;width:12px;height:16px;background:#7DD3FC;border-radius:2px 2px 60% 60%;opacity:0;will-change:transform,opacity;`;
  el.appendChild(sweat);
  host.appendChild(el);
  return {el,core,shine,sweat};
}
function buildShadow(host){
  const d=P.ballD;
  const el=document.createElement('div');
  el.style.cssText=`position:absolute;left:${P.ttX[0]}px;top:${P.groundY-8}px;width:${d*0.72}px;height:15px;margin-left:${-d*0.36}px;border-radius:50%;background:radial-gradient(ellipse at center, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 72%);filter:blur(2px);opacity:0;will-change:transform,opacity,margin-left;`;
  host.appendChild(el);
  return el;
}
function buildTag(host,x,y,txt,sz){
  const el=document.createElement('div');
  el.className='nmtag';
  el.style.cssText+=`left:${x-70}px;top:${y}px;width:140px;font-size:${sz}px;opacity:0;`;
  el.textContent=txt;
  host.appendChild(el);
  return el;
}
/* ubin tokoh (teaser dan lima kelompok) */
function buildTile(host,x,s,glyph,col,en,ts,dgfs,enfs){
  const el=document.createElement('div');
  el.className='gtile';
  el.style.cssText+=`left:${x}px;top:${P.groundY-s}px;width:${s}px;height:${s}px;opacity:0;`+
    `background:rgba(13,19,40,.92);border:2px solid ${col};`;
  const d=document.createElement('div');
  d.className='dg';d.style.cssText=`font-size:${dgfs}px;color:${col};`;d.textContent=glyph;
  el.appendChild(d);
  if(en){
    const e2=document.createElement('div');
    e2.className='en';e2.style.cssText=`font-size:${enfs}px;`;e2.textContent=en;
    el.appendChild(e2);
  }
  host.appendChild(el);
  return el;
}
const ball=buildGoldBall(document.getElementById('ball'),P.ballD);
const ballsh=buildShadow(document.getElementById('ballsh'));
const spark=document.getElementById('spark');
const babopaTag=buildTag(document.getElementById('ball'),P.ttX[0],P.groundY-P.ballD-58,'BABOPA',P.tagS);
/* kembaran bola setengah untuk demo 1/2 + 1/2 = 1 */
const ballB=document.createElement('div');
ballB.style.cssText=`position:absolute;left:${P.ttX[4]}px;top:${P.groundY-Math.round(P.ballD*0.44)}px;width:${Math.round(P.ballD*0.44)}px;height:${Math.round(P.ballD*0.44)}px;margin-left:${-Math.round(P.ballD*0.22)}px;border-radius:50%;background:radial-gradient(circle at 33% 27%, #FFF3C4 0%, #FCD34D 34%, #F59E0B 68%, #B45309 100%);box-shadow:0 0 30px rgba(251,191,36,.22);opacity:0;will-change:transform,opacity,left;`;
document.getElementById('ball').appendChild(ballB);

/* ---------- S0: tiga kartu teaser sebagai tokoh ---------- */
const hTiles=document.getElementById('h_tiles');
const hQ=document.getElementById('h_q');
hQ.style.cssText+=`left:${P.qX}px;top:${P.qY}px;font-size:${P.qSize}px;text-shadow:0 8px 0 rgba(0,0,0,.4);`;
const TEAS=[
  {g:'-5\u00B0',c:'#7DD3FC',n:'NEGATIF'},
  {g:'1/2',c:'#34D399',n:'PECAHAN'},
  {g:'\u03C0',c:'#A78BFA',n:'IRASIONAL'}
];
const TW=[];
TEAS.forEach((o,i)=>{
  const x=P.tw0[0]+i*(P.tileS+P.twGap);
  const el=buildTile(hTiles,x,P.tileS,o.g,o.c,null,P.tileS,Math.round(P.tileS*0.36),0);
  const tg=buildTag(hTiles,x,P.groundY-P.tileS-46,o.n,Math.round(P.tagS*0.87));
  TW.push({el,tg,t0:1.0+i*0.45,ph:i});
});

/* ---------- S1: empat properti dunia ---------- */
const aProps=document.getElementById('a_props');
function propHost(x,w){
  const el=document.createElement('div');
  el.style.cssText=`position:absolute;left:${x-Math.round(w/2)}px;top:${P.groundY}px;width:${w}px;opacity:0;will-change:transform,opacity;`;
  aProps.appendChild(el);
  return el;
}
function px(pel,px2,py,w,h,col,extra){
  const b=document.createElement('div');
  b.style.cssText=`position:absolute;left:${px2}px;top:${py}px;width:${w}px;height:${h}px;background:${col};${extra||''}`;
  pel.appendChild(b);
  return b;
}
function buildBuku(){
  const el=propHost(P.propX[0],220);
  for(let i=0;i<5;i++){
    const c=i%2?'#7DD3FC':'#FBBF24';
    px(el,40,0-i*34-0,140,30,c,'border-radius:6px;box-shadow:inset 0 -6px 0 rgba(0,0,0,.25);');
    px(el,40,0-i*34+4,140,6,'#0B1026','border-radius:3px;');
  }
  const tg=buildTag(el,110,-176,'5 BUKU',P.tagS);
  return {el,tg};
}
function buildTermo(){
  const el=propHost(P.propX[1],180);
  px(el,74,-150,32,120,'#DDE7FF','border-radius:16px;');
  px(el,80,-186,20,44,'#F87171','border-radius:9px;');
  px(el,60,-42,60,52,'#F87171','border-radius:50%;');
  px(el,80,-120,20,40,'#F87171','border-radius:8px;');
  const tg=buildTag(el,110,-206,'-5\u00B0',P.tagS);
  return {el,tg};
}
function buildPizza(){
  const el=propHost(P.propX[0],220);
  px(el,30,-140,160,80,'#FBBF24','border-radius:0 0 160px 160px;');
  px(el,30,-140,160,16,'#F59E0B','border-radius:0;');
  for(let i=0;i<4;i++){ px(el,52+i*30,-108,20,20,'#F87171','border-radius:50%;'); }
  px(el,104,-152,12,14,'#9FB0CE','border-radius:3px;');
  const tg=buildTag(el,110,-186,'1/2',P.tagS);
  return {el,tg};
}
function buildLingkaran(){
  const el=propHost(P.propX[1],220);
  const c2=px(el,30,-160,160,160,'#A78BFA','border-radius:50%;');
  c2.style.background='radial-gradient(circle at 36% 30%, #DDD3FF 0%, #A78BFA 58%, #6D4FD1 100%)';
  const g2=document.createElement('div');
  g2.className='mono';
  g2.style.cssText=`position:absolute;left:30px;top:-160px;width:160px;height:160px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:64px;color:#1A1206;`;
  g2.textContent='\u03C0';
  el.appendChild(g2);
  const tg=buildTag(el,110,-206,'LINGKARAN',P.tagS);
  return {el,tg};
}
const PROPS=[buildBuku(),buildTermo(),buildPizza(),buildLingkaran()];
