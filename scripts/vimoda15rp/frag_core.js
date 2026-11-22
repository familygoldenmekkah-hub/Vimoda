/* ---------- RUANG SAPA rev10: data & elemen format RP group chat ----------
   rev10 atas laporan pemilik (dialog masih terasa robot ala story
   edukasi, kalimat tema seperti pengakuan yang dihafal, simile terpaksa):
   dialog ditulis ulang TOTOL ala chat fiction sosmed/manhwa - NOL kalimat
   tema, NOL label misteri disebut dalam ucapan (karakter bilang "dia"),
   reaksi kasat mata dan lucu (HAAA KOK BISA, buat siapa itu???), kehadiran
   fisik (aku lewat depan), malu yang jujur (lari karena malu). Warisan
   rev9 tetap: tanpa indikator pengetikan sama sekali (visual, suara, QA
   banned), 20 pesan utuh jeda lega, dialog 60px, kartu waktu RP, momen
   memilih, papan soal milik ???, diagram menyala, sinematik. ---------- */
const Q = new URLSearchParams(location.search);
const ORIENT = Q.get('o') === 'landscape' ? 'landscape' : 'portrait';
const W = ORIENT === 'portrait' ? 1080 : 1920;
const H = ORIENT === 'portrait' ? 1920 : 1080;

function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)|0;return((t^t>>>14)>>>0)/4294967296}}
const rnd = mulberry32(150926);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const seg=(t,t0,d)=>clamp((t-t0)/d,0,1);
const lerp=(a,b,p)=>a+(b-a)*p;
const eio=p=>p<0.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
const eout=p=>1-Math.pow(1-p,3);
const smz=(t,a,b,s)=>{const o=seg(t,a,s)*(1-seg(t,b,s));return o};

const P = ORIENT==='portrait' ? {
  phoneX:24, phoneY:40, phoneW:1032, phoneH:1060,
  chatTop:210, chatBot:1046, bubW:860, bubS:60, nameS:36, photoW:780,
  headT:34, headS:44, headSubS:30, timeS:28,
  subTop:1180, subMax:900, wmY:1800,
  ecW:880, ecH:156, ecY:690, barW:480, ecFS:72,
  avS:74, avEmoji:34, stickW:800
} : {
  phoneX:460, phoneY:30, phoneW:1000, phoneH:660,
  chatTop:196, chatBot:642, bubW:720, bubS:60, nameS:36, photoW:660,
  headT:28, headS:40, headSubS:30, timeS:28,
  subTop:740, subMax:1300, wmY:1010,
  ecW:760, ecH:132, ecY:350, barW:460, ecFS:60,
  avS:62, avEmoji:32, stickW:760
};

/* posisi phone + latar doodle */
const phoneEl=document.getElementById('phone');
phoneEl.style.cssText+=`left:${P.phoneX}px;top:${P.phoneY}px;width:${P.phoneW}px;height:${P.phoneH}px;`;
document.getElementById('pchat').style.cssText+=`top:${P.chatTop}px;height:${P.chatBot-P.chatTop}px;`;
{
  const ht=document.getElementById('htitle');
  ht.style.fontSize=P.headS+'px';
  const hs=document.getElementById('hsub');
  hs.style.fontSize=P.headSubS+'px';
  const pt=document.getElementById('ptime');
  pt.style.fontSize=P.timeS+'px';
}
/* doodle latar: angka dan permen melayang (bahasa visual materi) */
const DOODLES=[];
{
  const b=document.getElementById('bgdoodle');
  const chars=['1','2','3','4','6','12','8','24'];
  for(let i=0;i<chars.length;i++){
    const d=document.createElement('div');
    d.className='doodle';
    d.textContent=chars[i];
    const fs=54+Math.round(rnd()*70);
    d.style.cssText+=`left:${Math.round(rnd()*(W-140)+40)}px;top:${Math.round(rnd()*(H-260)+80)}px;font-size:${fs}px;opacity:0;`;
    b.appendChild(d);
    DOODLES.push({el:d,ph:i*1.13,fs});
  }
  for(let i=0;i<12;i++){
    const d=document.createElement('div');
    d.className='dperm';
    const cd=16+Math.round(rnd()*26);
    const cols=['#F26D6D','#F7C948','#8E7CD8','#4CAF7A'];
    const col=cols[i%4];
    d.style.cssText+=`left:${Math.round(rnd()*(W-80)+40)}px;top:${Math.round(rnd()*(H-220)+60)}px;width:${cd}px;height:${cd}px;background:${col};opacity:0;`;
    b.appendChild(d);
    DOODLES.push({el:d,ph:i*0.71,fs:cd,perm:true});
  }
}

/* ---------- cast RP (label peran, tanpa nama pribadi; avatar bulat emoji tanpa wajah) ---------- */
const CAST={
  KIOS:{name:'PEMILIK KIOS',glyph:'🍬',bg:'radial-gradient(circle,#F26D6D 58%,#D93A5A)',col:'#FFB3B3'},
  MENTOR:{name:'MENTOR',glyph:'🟡',bg:'radial-gradient(circle,#F7C948 62%,#E8B32E)',col:'#F2C14E'},
  KAMU:{name:'KAMU',glyph:'🔍',bg:'radial-gradient(circle,#C9556B 55%,#A6394B)',col:'#D9C6FF'},
  MYST:{name:'???',glyph:'🌙',bg:'radial-gradient(circle,#FFE9A8 40%,rgba(255,233,168,.12) 72%)',col:'#FFE9A8'}
};

/* ---------- ilustrasi dunia rev6 (SVG foto chat, digambar serius) ----------
   Tiga foto "asli dari dunia RUANG SAPA": etalase malam saat misteri
   (awning toko, lampu gantung, 3 stoples 4-4-4, satu permen di piring
   menyala, papan TUTUP), buku tamu dengan pola kunjungan 4-8-12-16-20
   (12 diclingkung merah), dan kejutan 24 saat pagi (bunting, 3 stoples
   8-8-8, tag BUAT KAMU). Semua deterministik, tanpa gambar acak. ---------- */
const PALS=['#F26D6D','#F7C948','#8E7CD8','#4CAF7A'];
function dot(cx,cy,r,col){return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+col+'"/>'}
/* stoples generik: badan kaca + tutup emas; cand = daftar [dx,dy,r,warna] */
function jarSVG(cx,y,w,h,cand){
  let s='<rect x="'+(cx-w/2)+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="10" fill="rgba(185,166,255,.16)" stroke="#E8B32E" stroke-width="3"/>'
       +'<rect x="'+(cx-w/2-4)+'" y="'+(y-12)+'" width="'+(w+8)+'" height="16" rx="8" fill="#C89A3C"/>';
  cand.forEach(c=>{s+=dot(cx+c[0],y+c[1],c[2],c[3])});
  return s;
}
function tallySVG(x,y,groups){
  let s='';
  for(let g=0;g<groups;g++){
    const bx=x+g*30;
    for(let k=0;k<4;k++){ s+='<line x1="'+(bx+k*7)+'" y1="'+(y-16)+'" x2="'+(bx+k*7)+'" y2="'+(y+6)+'" stroke="#A6394B" stroke-width="3" stroke-linecap="round"/>' }
    s+='<line x1="'+(bx-4)+'" y1="'+(y+6)+'" x2="'+(bx+25)+'" y2="'+(y-16)+'" stroke="#A6394B" stroke-width="3" stroke-linecap="round"/>';
  }
  return s;
}
function svgEtalase(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="skyE" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#2A1E44"/><stop offset="1" stop-color="#181132"/></linearGradient>'
   +'<radialGradient id="glowE" cx="0.5" cy="0.5" r="0.5">'
   +'<stop offset="0" stop-color="rgba(247,201,72,.42)"/><stop offset="1" stop-color="rgba(247,201,72,0)"/></radialGradient></defs>'
   +'<rect width="600" height="340" fill="url(#skyE)"/>';
  [[120,66,2],[170,88,1.6],[240,62,2.2],[330,92,1.6],[380,64,2],[60,148,1.6]].forEach(p=>{s+=dot(p[0],p[1],p[2],'rgba(255,246,232,.55)')});
  s+='<circle cx="64" cy="88" r="22" fill="#F7C948"/><circle cx="73" cy="81" r="19" fill="#2A1E44"/>';
  s+='<rect x="16" y="12" width="568" height="42" fill="#A6394B"/>';
  for(let i=0;i<5;i++){s+='<rect x="'+(72+i*112)+'" y="12" width="56" height="42" fill="#F7C948"/>'}
  s+='<g transform="rotate(-4 493 100)">'
   +'<line x1="460" y1="54" x2="460" y2="80" stroke="#C89A3C" stroke-width="3"/>'
   +'<line x1="526" y1="54" x2="526" y2="80" stroke="#C89A3C" stroke-width="3"/>'
   +'<rect x="433" y="80" width="120" height="48" rx="8" fill="#F2E6C6" stroke="#C8A86E" stroke-width="3"/>'
   +'<text x="493" y="112" text-anchor="middle" font-size="26" font-weight="800" fill="#A6394B" letter-spacing="6">TUTUP</text></g>';
  s+='<line x1="300" y1="54" x2="300" y2="92" stroke="#C89A3C" stroke-width="4"/>'
   +'<path d="M270,92 L330,92 L346,118 L254,118 Z" fill="#E8B32E"/>'
   +'<circle cx="300" cy="124" r="9" fill="#FFF3C4"/>'
   +'<ellipse cx="300" cy="165" rx="125" ry="75" fill="url(#glowE)"/>';
  s+=jarSVG(210,132,112,112,[[-28,40,14,PALS[0]],[28,40,14,PALS[1]],[-28,86,14,PALS[2]],[28,86,14,PALS[3]]]);
  s+=jarSVG(360,132,112,112,[[-28,40,14,PALS[3]],[-28,86,14,PALS[1]],[28,40,14,PALS[0]],[28,86,14,PALS[2]]]);
  s+=jarSVG(510,132,112,112,[[-28,40,14,PALS[2]],[28,40,14,PALS[3]],[28,86,14,PALS[0]],[-28,86,14,PALS[1]]]);
  s+='<rect x="0" y="244" width="600" height="16" rx="7" fill="#8A6A46"/>'
   +'<rect x="0" y="260" width="600" height="80" fill="#3A2C50"/>';
  for(let i=0;i<3;i++){s+='<line x1="0" y1="'+(280+i*16)+'" x2="600" y2="'+(280+i*16)+'" stroke="rgba(232,179,46,.1)" stroke-width="3"/>'}
  s+='<ellipse cx="80" cy="236" rx="54" ry="13" fill="rgba(255,246,232,.16)" stroke="#E8B32E" stroke-width="2.5"/>'
   +'<circle cx="80" cy="214" r="30" fill="rgba(232,179,46,.28)"/>'
   +dot(80,214,15,'#E8B32E');
  return s+'</svg>';
}
function svgBuku(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="wdB" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#6B4E34"/><stop offset="1" stop-color="#4A3624"/></linearGradient></defs>'
   +'<rect width="600" height="340" fill="url(#wdB)"/>';
  for(let i=0;i<4;i++){s+='<line x1="0" y1="'+(40+i*82)+'" x2="600" y2="'+(48+i*82)+'" stroke="rgba(0,0,0,.18)" stroke-width="3"/>'}
  s+='<g transform="rotate(-2 300 170)">'
   +'<rect x="98" y="66" width="416" height="222" rx="14" fill="rgba(0,0,0,.35)"/>'
   +'<rect x="90" y="56" width="212" height="222" rx="12" fill="#FFFDF6"/>'
   +'<rect x="298" y="56" width="212" height="222" rx="12" fill="#FFF9EE"/>'
   +'<line x1="300" y1="58" x2="300" y2="276" stroke="#E4D5B0" stroke-width="3"/>'
   +'<line x1="118" y1="70" x2="118" y2="266" stroke="rgba(217,58,90,.5)" stroke-width="2.5"/>';
  for(let i=0;i<7;i++){s+='<line x1="140" y1="'+(104+i*26)+'" x2="286" y2="'+(104+i*26)+'" stroke="#D8CBB0" stroke-width="2"/>'}
  s+='<text x="196" y="88" text-anchor="middle" font-size="26" font-weight="800" fill="#7A4A2A" letter-spacing="4">BUKU TAMU</text>'
   +'<text x="196" y="250" text-anchor="middle" font-size="24" font-weight="600" fill="#8A6A46">setiap tamu dicatat</text>'
   +dot(176,272,11,PALS[0])+'<path d="M165,266 l-8,-4 v20 l8,-4 Z" fill="'+PALS[1]+'"/>'
   +'<path d="M187,266 l8,-4 v20 l-8,-4 Z" fill="'+PALS[1]+'"/>';
  [[4,'108',1],[8,'146',2],[12,'184',3],[16,'222',4],[20,'260',5]].forEach(r=>{
    s+='<text x="322" y="'+r[1]+'" font-family="JetBrains Mono, DejaVu Sans Mono, monospace" font-size="28" font-weight="700" fill="#3A2C1E">'+r[0]+'</text>'
     +tallySVG(372,parseInt(r[1],10)-4,r[2]);
  });
  s+='<ellipse cx="336" cy="180" rx="28" ry="21" fill="none" stroke="#D93A5A" stroke-width="3" transform="rotate(-6 336 180)"/>'
   +'<g transform="rotate(-8 470 296)"><rect x="410" y="288" width="118" height="15" rx="7" fill="#E8B32E"/>'
   +'<path d="M528,288 L546,295.5 L528,303 Z" fill="#C89A3C"/></g></g>';
  return s+'</svg>';
}
function svgKejutan(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="skyK" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#FFE3A0"/><stop offset="1" stop-color="#F7B54A"/></linearGradient></defs>'
   +'<rect width="600" height="340" fill="url(#skyK)"/>'
   +'<circle cx="84" cy="70" r="34" fill="#FFF3C4"/>';
  for(let i=0;i<8;i++){const a=i*Math.PI/4;
    s+='<line x1="'+(84+Math.cos(a)*44).toFixed(1)+'" y1="'+(70+Math.sin(a)*44).toFixed(1)+'" x2="'+(84+Math.cos(a)*60).toFixed(1)+'" y2="'+(70+Math.sin(a)*60).toFixed(1)+'" stroke="#E8A63C" stroke-width="5" stroke-linecap="round"/>'}
  [[0,170,70,60],[90,150,50,80],[160,180,80,50],[260,160,60,70],[340,175,70,55],[430,155,60,75],[510,180,90,50]].forEach(b=>{
    s+='<rect x="'+b[0]+'" y="'+b[1]+'" width="'+b[2]+'" height="'+b[3]+'" fill="#8A5A78" opacity="0.4"/>'});
  s+='<path d="M20,30 Q160,72 300,38 T580,34" fill="none" stroke="#7A4A2A" stroke-width="3"/>';
  [[160,60],[210,64],[260,56],[310,46],[360,42],[410,46],[460,52],[510,56],[550,50]].forEach((p,i)=>{
    s+='<path d="M'+(p[0]-14)+','+p[1]+' L'+(p[0]+14)+','+p[1]+' L'+p[0]+','+(p[1]+24)+' Z" fill="'+PALS[i%4]+'"/>'});
  s+='<rect x="0" y="244" width="600" height="16" rx="7" fill="#A5814F"/>'
   +'<rect x="0" y="260" width="600" height="80" fill="#7A5C3C"/>';
  s+=jarSVG(130,128,112,116,[[-42,36,12,PALS[0]],[-14,36,12,PALS[1]],[14,36,12,PALS[2]],[42,36,12,PALS[3]],[-42,74,12,PALS[1]],[-14,74,12,PALS[2]],[14,74,12,PALS[3]],[42,74,12,PALS[0]]]);
  s+=jarSVG(300,128,112,116,[[-42,36,12,PALS[2]],[-14,36,12,PALS[3]],[14,36,12,PALS[0]],[42,36,12,PALS[1]],[-42,74,12,PALS[3]],[-14,74,12,PALS[0]],[14,74,12,PALS[1]],[42,74,12,PALS[2]]]);
  s+=jarSVG(470,128,112,116,[[-42,36,12,PALS[0]],[-14,36,12,PALS[2]],[14,36,12,PALS[3]],[42,36,12,PALS[1]],[-42,74,12,PALS[2]],[-14,74,12,PALS[0]],[14,74,12,PALS[1]],[42,74,12,PALS[3]]]);
  s+='<line x1="290" y1="246" x2="290" y2="258" stroke="#7A4A2A" stroke-width="2.5"/>'
   +'<g transform="rotate(-5 290 282)">'
   +'<rect x="214" y="260" width="152" height="44" rx="10" fill="#FFFDF6" stroke="#C8A86E" stroke-width="3"/>'
   +'<text x="290" y="289" text-anchor="middle" font-size="24" font-weight="800" fill="#A6394B" letter-spacing="1">BUAT KAMU</text></g>';
  [[520,84],[70,150],[556,140],[240,96]].forEach(p=>{
    s+='<path d="M'+p[0]+','+(p[1]-14)+' l4,10 10,4 -10,4 -4,10 -4,-10 -10,-4 10,-4 Z" fill="rgba(255,255,255,.8)"/>'});
  [[180,120,'#D93A5A'],[420,110,'#4CAF7A'],[560,180,'#8E7CD8'],[30,210,'#F7C948']].forEach(p=>{
    s+=dot(p[0],p[1],5,p[2])});
  return s+'</svg>';
}
const SVGS={etalase:svgEtalase,buku:svgBuku,kejutan:svgKejutan};
/* aksi RP dalam bintang = italic redup (budaya RP TikTok/Character.ai) */
function richText(t){
  const parts=t.split('*');
  const out=[];
  for(let i=0;i<parts.length;i++){
    if(!parts[i]) continue;
    out.push(i%2===1?'<span class="act">'+parts[i]+'</span>':'<span class="say">'+parts[i]+'</span>');
  }
  return out.join('&nbsp;');
}

/* ---------- pesan RP rev10 (ala chat fiction sosmed: NOL kalimat tema,
   NOL label misteri di dalam ucapan - karakter bicara tentang "dia",
   reaksi kasat mata, lucu, jujur; matematika cuma lewat aksi yang
   dilakukan dan diagram, bukan lewat pengakuan yang dihafal) ---------- */
const MSGS=[
  {t0:1.4, who:'KIOS', kind:'photo', svg:'etalase', cap:'TOKOKU SEMALAM. AKU GAK NGERAPIIN INI 😳'},
  {t0:6.5, who:'KIOS', text:'serius, aku tutup jam 8 langsung pulang. balik jam 8.30 udah begini 😭'},
  {t0:11.8, who:'KAMU', text:'HAAA KOK BISA SIH. permen berbaris rapi semua 😨'},
  {t0:16.2, who:'KIOS', text:'lagi: di piring ada SATU permen doang. buat siapa itu???'},
  {t0:20.5, who:'MENTOR', text:'wih ada aja ya. tunggu, aku lewat depan. mau ikut lihat langsung'},
  {t0:26.8, who:'KIOS', text:'kucoba bagi: 1, 2, 3, 4, 6, sama 12 orang. PAS SEMUA 😳'},
  {t0:31.0, who:'KAMU', text:'jaman SD bagi jajan begini banget. berapa orang aja kebagian pas'},
  {t0:34.0, who:'KIOS', kind:'photo', svg:'buku', cap:'BUKU TAMU KUBUKA. ada catatan yang bukan tulisanku 😳'},
  {t0:41.4, who:'KIOS', text:'bukan tulisanku. 4, 8, 12, 16, 20. angkanya nambah terus'},
  {t0:45.6, who:'KAMU', text:'oh nambah 4 terus kayak naik tangga. tunggu, 12 ada di barisan?!'},
  {t0:49.2, who:'MENTOR', text:'kunjugannya tiap 4 kan. nah pas ke-12 dia balik. sengaja banget'},
  {t0:53.4, who:'MYST', text:'*muncul dari balik lampu* halo 😊 yang tadi itu aku. gak nyolong, cuma pengen ikut aja'},
  {t0:61.5, who:'MENTOR', kind:'sticker', stk:'AWAS KEBAGIAN!', stks:'2 dapat 12 · 3 dapat 8 · 4 dapat 6 · 6 dapat 4'},
  {t0:64.8, who:'MYST', text:'besok mau aku isi ulang. 12 atau 24? kamu pilih 😊'},
  {t0:69.4, who:'KAMU', text:'24 dong. biar yang laper banyak juga kebagian'},
  {t0:72.5, who:'KIOS', text:'deal, 24 ya! besok pagi aku mau ngintip dari dalam. gila penasaran'},
  {t0:75.5, who:'KIOS', kind:'photo', svg:'kejutan', cap:'BUKA PAGI: 24 PERMEN RAPI. SISA NOL ✨'},
  {t0:79.8, who:'MYST', text:'aku dateng jam 6, atur semuanya, terus lari karena malu 😊'},
  {t0:84.2, who:'MENTOR', text:'ada aja. besok jangan sembunyi lagi ya. nanti kamu kebagian permen'},
  {t0:97.3, who:'MENTOR', text:'oh iya: dua lampu di kios sebelah kedip beda ritme. misteri baru 👀'}
];

/* divider bab gaya kartu waktu RP (bukan label pelajaran) */
const DIVS=[
  [0.4,'TADI MALAM · 20.30'],
  [19.0,'MENIT BERIKUTNYA'],
  [30.4,'MEJA DEPAN · BUKU TAMU'],
  [61.3,'MALAM INI · JAM 9'],
  [75.3,'BESOK PAGI · 07.00']
];

/* ---------- build bubbles ---------- */
const chatEl=document.getElementById('pchat');
const MSGE=[];
function mkAvatar(who,cls){
  const c=CAST[who];
  const a=document.createElement('div');
  a.className='avatar'+(cls?' '+cls:'');
  a.style.cssText+=`width:${P.avS}px;height:${P.avS}px;flex:0 0 ${P.avS}px;background:${c.bg};font-size:${P.avEmoji}px;`;
  a.textContent=c.glyph;
  return a;
}
MSGS.forEach((m,mi)=>{
  const row=document.createElement('div');
  row.className='msg'+(m.who==='KAMU'?' you':'')+(m.who==='MYST'?' myst':'');
  const c=CAST[m.who];
  if(m.who!=='KAMU'){
    row.appendChild(mkAvatar(m.who));
    const bw=document.createElement('div');
    bw.className='bwrap';
    bw.style.cssText+=`max-width:${P.bubW}px;`;
    const nm=document.createElement('div');
    nm.className='mname';
    nm.style.cssText+=`color:${c.col};font-size:${P.nameS}px;`;
    nm.textContent=c.name;
    bw.appendChild(nm);
    const bub=document.createElement('div');
    if(m.kind==='photo'){
      bub.className='bubble photo';
      bub.style.cssText+=`width:${P.photoW}px;`;
      bub.innerHTML=SVGS[m.svg]();
      m.svgEl=bub.querySelector('svg'); /* untuk efek Ken Burns sinematik */
      const pc=document.createElement('div');
      pc.className='pcap';
      pc.textContent=m.cap;
      bub.appendChild(pc);
    }else if(m.kind==='sticker'){
      bub.className='bubble sticker';
      bub.style.cssText+=`max-width:${P.stickW}px;`;
      const s1=document.createElement('div');
      s1.className='stk';
      s1.style.fontSize=(ORIENT==='portrait'?54:48)+'px';
      s1.textContent=m.stk;
      const s2=document.createElement('div');
      s2.className='stks';
      s2.style.cssText+='font-size:'+(ORIENT==='portrait'?38:34)+'px;';
      s2.textContent=m.stks;
      bub.appendChild(s1);
      bub.appendChild(s2);
    }else{
      bub.className='bubble';
      bub.style.cssText+=`max-width:${P.bubW}px;font-size:${P.bubS}px;`;
      bub.innerHTML=richText(m.text);
    }
    bw.appendChild(bub);
    row.appendChild(bw);
  }else{
    const bw=document.createElement('div');
    bw.className='bwrap';
    bw.style.cssText+=`max-width:${P.bubW}px;`;
    const nm=document.createElement('div');
    nm.className='mname';
    nm.style.cssText+=`color:${c.col};font-size:${P.nameS}px;text-align:right;margin-right:6px;`;
    nm.textContent=c.name;
    bw.appendChild(nm);
    const bub=document.createElement('div');
    bub.className='bubble';
    bub.style.cssText+=`max-width:${P.bubW}px;font-size:${P.bubS}px;`;
    bub.innerHTML=richText(m.text)+'<span class="ticks">Dibaca ✓✓</span>';
    bw.appendChild(bub);
    row.appendChild(bw);
    row.appendChild(mkAvatar(m.who));
  }
  row.dataset.t0=m.t0;
  chatEl.appendChild(row);
  MSGE.push({el:row,m:m,top:0,h:0});
});
/* sisipkan divider sesuai urutan t0 */
const DIVEL=[];
DIVS.forEach(([t0,txt])=>{
  const dv=document.createElement('div');
  dv.className='divider';
  const sp=document.createElement('span');
  sp.textContent=txt;
  dv.appendChild(sp);
  chatEl.appendChild(dv);
  DIVEL.push({el:dv,sp,t0});
});
/* urutkan semua anak chat berdasar t0 lalu susun ulang DOM */
{
  const kids=[...chatEl.children];
  const items=kids.map(k=>({k, t: k.classList.contains('divider')
    ? (DIVEL.find(d=>d.el===k)||{t0:0}).t0 : (MSGE.find(x=>x.el===k)||{m:{t0:0}}).m.t0 }));
  items.sort((a,b)=>a.t-b.t);
  items.forEach(it=>chatEl.appendChild(it.k));
}
/* ukur posisi (setelah font siap, dipanggil ulang dari frag_render init) */
function layoutChat(){
  const curY=(()=>{const mm=/translateY\((-?[\d.]+)px\)/.exec(chatEl.style.transform);return mm?parseFloat(mm[1]):0})();
  MSGE.forEach(x=>{
    const r=x.el.getBoundingClientRect();
    const c=chatEl.getBoundingClientRect();
    x.top=r.top-c.top+curY;
    x.h=r.height;
  });
  DIVEL.forEach(d=>{
    const r=d.el.getBoundingClientRect();
    const c=chatEl.getBoundingClientRect();
    d.top=r.top-c.top+curY;
    d.h=r.height;
  });
}

/* ---------- tiga DIAGRAM MENYALA (momen ala anime sains) ---------- */
const FLASHES=[
  {t0:22.8,t1:26.2,kick:'HITUNGAN STOPLES',title:'FAKTOR 12',en:'Factors of 12: six neat ways to share!',
   chips:['1','2','3','4','6','12'],hot:-1,
   lines:['12 ÷ 1, 2, 3, 4, 6, 12 = PAS TANPA SISA'],
   notes:['12 ÷ 5 = 2 SISA 2 · BELUM RAPI','13 ÷ 3 = 4 SISA 1 · JADI HADIAH!']},
  {t0:37.4,t1:40.8,kick:'POLA BUKU TAMU',title:'KELIPATAN 4',en:'Multiples of 4: 4, 8, 12, 16, 20, 24...',
   chips:['4','8','12','16','20','24'],hot:2,
   lines:['4 × 3 = 12 · KUNJUNGAN KE-12'],
   notes:['12 KELIPATAN 4 · SEKALIGUS FAKTOR 12']},
  {t0:57.1,t1:61.1,kick:'TWIST',title:'TERBATAS VS TANPA BATAS',en:'Ways are limited, chances never end!',
   chips:['1','2','3','6'],hot:-1,two:'6, 12, 18, 24, 30, ...',
   lines:['FAKTOR 6: CUMA EMPAT · KELIPATAN 6: TERUS'],
   notes:['CARA TERBATAS · PELUANG TANPA BATAS']}
];
const flashEl=document.getElementById('flash');
const dimEl=document.getElementById('dim');
const fKick=document.getElementById('fkick');
const fTitle=document.getElementById('ftitle');
const fEn=document.getElementById('fen');
const fBody=document.getElementById('fbody');
const fGlow=document.getElementById('fglow');
fTitle.style.fontSize=(ORIENT==='portrait'?54:46)+'px';
fEn.style.cssText+=`top:${ORIENT==='portrait'?124:108}px;font-size:34px;`;
fBody.style.cssText+=`top:50%;transform:translateY(-50%);gap:${ORIENT==='portrait'?16:12}px;`;
const FLASHBODY=FLASHES.map(f=>{
  const w=document.createElement('div');
  w.style.cssText+='display:none;flex-direction:column;align-items:center;gap:inherit;width:100%;';
  const chips=document.createElement('div');
  chips.className='fchips';
  const chEls=f.chips.map((cx,i)=>{
    const ch=document.createElement('div');
    ch.className='fchip'+(f.hot===i?' hot':'');
    ch.textContent=cx;
    chips.appendChild(ch);
    return {el:ch,i};
  });
  w.appendChild(chips);
  if(f.two){
    const t2=document.createElement('div');
    t2.className='fline';
    t2.style.cssText+=`font-size:${ORIENT==='portrait'?38:34}px;`;
    t2.innerHTML='<span class="dot" style="background:#B9A6FF"></span><span>'+f.two+'</span>';
    w.appendChild(t2);
    f.twoEl=t2;
  }
  const lines=f.lines.map(tx=>{
    const ln=document.createElement('div');
    ln.className='fline';
    ln.style.cssText+=`font-size:${ORIENT==='portrait'?38:34}px;`;
    ln.innerHTML='<span class="dot" style="background:#4CAF7A"></span><span>'+tx+'</span>';
    w.appendChild(ln);
    return {el:ln};
  });
  const notes=f.notes.map(tx=>{
    const nn=document.createElement('div');
    nn.className='fnote';
    nn.style.cssText+=`font-size:${ORIENT==='portrait'?32:28}px;`;
    nn.textContent=tx;
    w.appendChild(nn);
    return {el:nn};
  });
  fBody.appendChild(w);
  return {w,chips:chEls,lines,notes,f};
});

/* ---------- emoji burst ala reaksi chat ---------- */
const burstEl=document.getElementById('burst');
const BURSTS=[
  {t0:41.4,t1:43.6,who:'M9',emo:['😲','😲','😲','😲'],rad:130},
  {t0:75.7,t1:78.7,who:'ALL',emo:['🎉','✨','🍬','🎉','✨'],rad:230,conf:true}
];
const BPARTS=[];
BURSTS.forEach((b,bi)=>{
  for(let i=0;i<b.emo.length+(b.conf?8:0);i++){
    const isEmoji=i<b.emo.length;
    const el=document.createElement('div');
    el.className=isEmoji?'bp':'bdot';
    if(isEmoji){ el.textContent=b.emo[i]; }
    else{
      const cols=['#F26D6D','#F7C948','#8E7CD8','#4CAF7A'];
      el.style.cssText+=`width:${10+rnd()*10}px;height:${10+rnd()*10}px;background:${cols[i%4]};`;
    }
    burstEl.appendChild(el);
    const a=(i/(b.emo.length+(b.conf?8:0)))*Math.PI*2+rnd()*0.5;
    BPARTS.push({el,bi,a,d:0.6+rnd()*0.5,ph:rnd()*6});
  }
});

/* ---------- overlay MISI BARU (aturan 30: empat soal utuh + kartu) ---------- */
const quizEl=document.getElementById('quiz');
document.getElementById('qhd').style.fontSize=(ORIENT==='portrait'?46:40)+'px';
const SOAL=['TENTUKAN SEMUA FAKTOR DARI 20.','LIMA KELIPATAN PERTAMA DARI 7.','KENAPA 5 BUKAN FAKTOR DARI 12?','FAKTOR ATAU KELIPATAN: TAK TERBATAS?'];
const qrowsEl=document.getElementById('qrows');
const UJIS=SOAL.map((s,i)=>{
  const r=document.createElement('div');
  r.className='qrow';
  r.style.cssText+=`font-size:${ORIENT==='portrait'?40:34}px;margin-top:${ORIENT==='portrait'?10:6}px;`;
  r.innerHTML='<b>'+(i+1)+'.</b> '+s;
  qrowsEl.appendChild(r);
  return {el:r,t0:90.6+i*0.16};
});
const UJIVAL=['1','2','3','4','5','8','10','20'];
const qgridEl=document.getElementById('qgrid');
qgridEl.style.cssText+=`top:${ORIENT==='portrait'?480:378}px;gap:${ORIENT==='portrait'?12:10}px;`;
const CARDS=UJIVAL.map((v,i)=>{
  const el=document.createElement('div');
  el.className='qcard';
  el.style.cssText+=`width:${ORIENT==='portrait'?132:108}px;`;
  el.textContent=v;
  qgridEl.appendChild(el);
  return {el,v,pop:92.6+i*0.1};
});
const qnoteEl=document.getElementById('qnote');
qnoteEl.style.cssText+=`top:${ORIENT==='portrait'?686:478}px;font-size:32px;`;
qnoteEl.textContent='KARTU BANTU DARI ???';
const qctaEl=document.getElementById('qcta');
qctaEl.style.cssText+=`top:${ORIENT==='portrait'?736:525}px;font-size:${ORIENT==='portrait'?42:38}px;`;

/* ---------- subtitle EN (aturan 8 + 18: proporsional, min 1.7 s) ---------- */
const SUBS=[
  [1.4,'This is my shop. I did NOT tidy it!'],
  [6.5,'Closed at 8. Back at 8.30: like this!'],
  [11.8,'HOW?? The candies are lined up neat!'],
  [16.2,'And ONE candy on the plate. For whom?'],
  [20.5,'I am right outside. Let me look too!'],
  [22.8,'Factors of 12: six neat ways!'],
  [26.8,'I tried: 1, 2, 3, 4, 6, 12. All fit!'],
  [31.0,'Just like sharing snacks back at school!'],
  [34.0,'Guest book: notes that are NOT mine!'],
  [37.4,'Multiples of 4: 4, 8, 12, 16, 20...'],
  [41.4,'Not my handwriting. It climbs by 4!'],
  [45.6,'Like climbing stairs. Wait, 12 is on it!'],
  [49.2,'Every 4th visit. Visit 12: back again!'],
  [53.4,'Hello. That was me. Just wanted to join.'],
  [57.1,'Ways are limited, chances never end!'],
  [61.5,'Watch out! 24: 2 get 12, 3 get 8, 4 get 6.'],
  [64.8,'Tomorrow I refill. 12 or 24? You pick!'],
  [69.4,'24! So the hungry ones get a share too.'],
  [72.5,'Deal! I will peek from inside. So curious!'],
  [75.5,'Morning: 24 candies placed. Zero rest!'],
  [79.8,'I came at six, tidied, then ran. So shy!'],
  [84.2,'No hiding tomorrow. You get candy too!'],
  [88.3,'The mystery left four questions!'],
  [93.0,'Eight helper cards are waiting.'],
  [97.3,'Next door: two lamps blink offbeat. Soon.'],
  [102.2,'Thanks for watching.']
];
const subbar=document.getElementById('subbar');
const subEn=document.getElementById('sub_en');
subbar.style.cssText+=`top:${P.subTop}px;max-width:${P.subMax}px;`;
subEn.style.fontSize='34px';

/* watermark + endcard */
const markEl=document.getElementById('mark');
markEl.style.cssText+=`top:${P.wmY}px;font-size:30px;`;
const endcard=document.getElementById('endcard');
const fplate=document.getElementById('fplate');
const fUrl=document.getElementById('f_url');
const fBar=document.getElementById('f_bar');
fplate.style.cssText+=`left:${P.phoneX+(P.phoneW-P.ecW)/2}px;top:${P.ecY}px;width:${P.ecW}px;height:${P.ecH}px;font-size:${P.ecFS}px;`;
fBar.style.cssText+=`left:${P.phoneX+(P.phoneW-P.barW)/2}px;top:${P.ecY+P.ecH+26}px;width:0;height:10px;`;
const flashwhite=document.getElementById('flashwhite');
const fadeEl=document.getElementById('fade');
