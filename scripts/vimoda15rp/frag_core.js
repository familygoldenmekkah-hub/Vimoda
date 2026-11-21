/* ---------- RUANG SAPA rev6: data & elemen format RP group chat ----------
   Revisi 6 atas laporan pemilik: (1) teks dialog DIBESARKAN ke 30px,
   (2) gaya RP dibikin beneran terasa: aksi RP dalam bintang (budaya RP
   TikTok/Character.ai), status Dibaca di chat KAMU, bubble ??? glow emas,
   (3) bahasa obrolan harian yang natural - bukan kalimat iklan AI:
   pesan pendek, CAPS kaget, emoji reaksi, nyela, dobel-chat, nyebut
   aktivitas harian kios, (4) ilustrasi dunia digambar serius (SVG):
   etalase malam, buku tamu, kejutan pagi - bukan kemasan generik. ---------- */
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
  chatTop:210, chatBot:1046, bubW:680, bubS:30, nameS:24, photoW:620,
  headT:32, headS:32, headSubS:24, timeS:24,
  subTop:1170, subMax:880, wmY:1800,
  ecW:760, ecH:130, ecY:700, barW:420, ecFS:56,
  avS:62, avEmoji:28, stickW:640
} : {
  phoneX:460, phoneY:30, phoneW:1000, phoneH:660,
  chatTop:196, chatBot:642, bubW:600, bubS:30, nameS:24, photoW:600,
  headT:28, headS:28, headSubS:24, timeS:24,
  subTop:740, subMax:1300, wmY:1010,
  ecW:700, ecH:110, ecY:360, barW:460, ecFS:44,
  avS:54, avEmoji:26, stickW:620
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
function jarSVG(cx,y,h,rows,r){
  let s='<rect x="'+(cx-52)+'" y="'+y+'" width="104" height="'+h+'" rx="10" fill="rgba(185,166,255,.16)" stroke="#E8B32E" stroke-width="3"/>'
       +'<rect x="'+(cx-56)+'" y="'+(y-12)+'" width="112" height="16" rx="8" fill="#C89A3C"/>';
  rows.forEach((row,ri)=>{row.forEach((col,ci)=>{s+=dot(cx-39+ci*26,y+20+ri*30,r,col)})});
  return s;
}
function svgEtalase(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="skyE" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#2A1E44"/><stop offset="1" stop-color="#181132"/></linearGradient>'
   +'<radialGradient id="glowE" cx="0.5" cy="0.5" r="0.5">'
   +'<stop offset="0" stop-color="rgba(247,201,72,.42)"/><stop offset="1" stop-color="rgba(247,201,72,0)"/></radialGradient></defs>'
   +'<rect width="600" height="340" fill="url(#skyE)"/>';
  [[80,44,2],[150,72,1.6],[250,30,2.2],[350,58,1.6],[430,36,2],[480,96,1.6]].forEach(p=>{s+=dot(p[0],p[1],p[2],'rgba(255,246,232,.55)')});
  s+='<circle cx="532" cy="56" r="26" fill="#F7C948"/><circle cx="543" cy="47" r="22" fill="#2A1E44"/>';
  s+='<rect x="16" y="14" width="568" height="42" fill="#A6394B"/>';
  for(let i=0;i<5;i++){s+='<rect x="'+(72+i*112)+'" y="14" width="56" height="42" fill="#F7C948"/>'}
  s+='<line x1="300" y1="56" x2="300" y2="102" stroke="#C89A3C" stroke-width="4"/>'
   +'<path d="M272,102 L328,102 L344,130 L256,130 Z" fill="#E8B32E"/>'
   +'<circle cx="300" cy="136" r="9" fill="#FFF3C4"/>'
   +'<ellipse cx="300" cy="185" rx="130" ry="80" fill="url(#glowE)"/>';
  s+=jarSVG(120,150,100,[[PALS[0],PALS[1]],[PALS[2],PALS[3]]],12);
  s+=jarSVG(280,150,100,[[PALS[3],PALS[0]],[PALS[1],PALS[2]]],12);
  s+=jarSVG(440,150,100,[[PALS[2],PALS[3]],[PALS[0],PALS[1]]],12);
  s+='<rect x="0" y="250" width="600" height="16" rx="7" fill="#8A6A46"/>'
   +'<rect x="0" y="266" width="600" height="74" fill="#3A2C50"/>';
  for(let i=0;i<3;i++){s+='<line x1="0" y1="'+(284+i*16)+'" x2="600" y2="'+(284+i*16)+'" stroke="rgba(232,179,46,.1)" stroke-width="3"/>'}
  s+='<ellipse cx="545" cy="242" rx="50" ry="12" fill="rgba(255,246,232,.14)" stroke="#E8B32E" stroke-width="2.5"/>'
   +'<circle cx="545" cy="224" r="22" fill="rgba(232,179,46,.25)"/>'
   +dot(545,224,12,'#E8B32E');
  s+='<g transform="rotate(-5 130 100)">'
   +'<line x1="95" y1="56" x2="95" y2="86" stroke="#C89A3C" stroke-width="3"/>'
   +'<line x1="165" y1="56" x2="165" y2="86" stroke="#C89A3C" stroke-width="3"/>'
   +'<rect x="70" y="86" width="120" height="48" rx="8" fill="#F2E6C6" stroke="#C8A86E" stroke-width="3"/>'
   +'<text x="130" y="118" text-anchor="middle" font-size="26" font-weight="800" fill="#A6394B" letter-spacing="6">TUTUP</text></g>';
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
  for(let i=0;i<7;i++){s+='<line x1="140" y1="'+(100+i*26)+'" x2="286" y2="'+(100+i*26)+'" stroke="#D8CBB0" stroke-width="2"/>'}
  s+='<text x="196" y="88" text-anchor="middle" font-size="26" font-weight="800" fill="#7A4A2A" letter-spacing="4">BUKU TAMU</text>';
  [[4,'96','pagi'],[8,'132','pagi'],[12,'168','siang'],[16,'204','sore'],[20,'240','malam']].forEach(r=>{
    s+='<text x="330" y="'+r[1]+'" font-family="JetBrains Mono, DejaVu Sans Mono, monospace" font-size="28" font-weight="700" fill="#3A2C1E">'+r[0]+'</text>'
     +'<text x="410" y="'+r[1]+'" font-size="24" fill="#8A6A46" font-weight="600">'+r[2]+'</text>';
  });
  s+='<ellipse cx="346" cy="160" rx="27" ry="20" fill="none" stroke="#D93A5A" stroke-width="3" transform="rotate(-6 346 160)"/>'
   +'<g transform="rotate(-8 470 296)"><rect x="410" y="288" width="118" height="15" rx="7" fill="#E8B32E"/>'
   +'<path d="M528,288 L546,295.5 L528,303 Z" fill="#C89A3C"/></g></g>';
  return s+'</svg>';
}
function svgKejutan(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="skyK" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#FFE3A0"/><stop offset="1" stop-color="#F7B54A"/></linearGradient></defs>'
   +'<rect width="600" height="340" fill="url(#skyK)"/>'
   +'<circle cx="92" cy="74" r="40" fill="#FFF3C4"/>';
  for(let i=0;i<8;i++){const a=i*Math.PI/4;
    s+='<line x1="'+(92+Math.cos(a)*54).toFixed(1)+'" y1="'+(74+Math.sin(a)*54).toFixed(1)+'" x2="'+(92+Math.cos(a)*72).toFixed(1)+'" y2="'+(74+Math.sin(a)*72).toFixed(1)+'" stroke="#E8A63C" stroke-width="5" stroke-linecap="round"/>'}
  [[0,170,70,60],[90,150,50,80],[160,180,80,50],[260,160,60,70],[340,175,70,55],[430,155,60,75],[510,180,90,50]].forEach(b=>{
    s+='<rect x="'+b[0]+'" y="'+b[1]+'" width="'+b[2]+'" height="'+b[3]+'" fill="#8A5A78" opacity="0.4"/>'});
  s+='<path d="M20,34 Q160,78 300,40 T580,36" fill="none" stroke="#7A4A2A" stroke-width="3"/>';
  [[60,52],[110,62],[160,64],[210,56],[260,46],[310,42],[360,44],[410,50],[460,54],[510,50],[550,44]].forEach((p,i)=>{
    s+='<path d="M'+(p[0]-14)+','+p[1]+' L'+(p[0]+14)+','+p[1]+' L'+p[0]+','+(p[1]+24)+' Z" fill="'+PALS[i%4]+'"/>'});
  s+='<rect x="0" y="252" width="600" height="16" rx="7" fill="#A5814F"/>'
   +'<rect x="0" y="268" width="600" height="72" fill="#7A5C3C"/>';
  s+=jarSVG(130,146,106,[[PALS[0],PALS[1],PALS[2],PALS[3]],[PALS[1],PALS[2],PALS[3],PALS[0]]],11);
  s+=jarSVG(300,146,106,[[PALS[2],PALS[3],PALS[0],PALS[1]],[PALS[3],PALS[0],PALS[1],PALS[2]]],11);
  s+=jarSVG(470,146,106,[[PALS[0],PALS[2],PALS[3],PALS[1]],[PALS[2],PALS[0],PALS[1],PALS[3]]],11);
  s+='<g transform="rotate(7 392 222)">'
   +'<line x1="352" y1="140" x2="368" y2="200" stroke="#7A4A2A" stroke-width="2.5"/>'
   +'<rect x="340" y="200" width="104" height="44" rx="10" fill="#FFFDF6" stroke="#C8A86E" stroke-width="3"/>'
   +'<text x="392" y="229" text-anchor="middle" font-size="24" font-weight="800" fill="#A6394B" letter-spacing="1">BUAT KAMU</text></g>';
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

/* ---------- pesan RP rev6 (t0, siapa, jenis, teks; bahasa obrolan harian) ---------- */
const MSGS=[
  {t0:1.2, who:'KIOS', kind:'photo', svg:'etalase', cap:'lihat etalaseku semalam 😳'},
  {t0:3.5, who:'KIOS', text:'*buka tirai* TOKONYA TUTUP JAM DELAPAN. terus siapa yang rapikan??'},
  {t0:5.6, who:'KAMU', text:'eh tunggu. ada satu permen sendirian di piring 👀'},
  {t0:7.4, who:'KIOS', text:'IYA NIH kayak ditinggal sendiri 🥹'},
  {t0:9.3, who:'MENTOR', text:'*njupuk kaca pembesar* kasus manis nih. gas, aku ikut'},
  {t0:11.3, who:'MENTOR', text:'petunjuk satu: yang rapihin pasti bagi HABIS RATA. dia gak suka sisa'},
  {t0:16.6, who:'KAMU', text:'berarti 12 bisa dibagi rata ke 1, 2, 3, 4, 6, atau 12 orang. PAS SEMUA!'},
  {t0:18.5, who:'MENTOR', text:'petunjuk dua: buku tamu kios. kunjungannya 4, 8, 12, 16, 20...'},
  {t0:24.2, who:'KAMU', text:'*manggut* KUNJUNGAN KE-12 MASUK POLA 😲 kelipatan 4, faktor 12 juga!'},
  {t0:26.0, who:'KIOS', kind:'photo', svg:'buku', cap:'buku tamuku. cek sendiri kalau ragu 📒'},
  {t0:28.2, who:'KIOS', text:'aku GAK PERNAH catat manual 😳 ini tangan siapa?!'},
  {t0:30.0, who:'KAMU', text:'*cek piring dua kali* GILA DIA BENERAN ADA 😳'},
  {t0:31.9, who:'MYST', text:'*muncul dari balik lampu* hadir 😊 pola rapi itu hadiah kecil dariku. besok isi 24 ya 🌙'},
  {t0:38.8, who:'MENTOR', kind:'sticker', stk:'JURUS BAGI RATA!', stks:'2 dapat 12 · 3 dapat 8 · 4 dapat 6 · 6 dapat 4'},
  {t0:42.0, who:'MENTOR', text:'24 permen, semua bagi rata, sisa NOL. aman banget.'},
  {t0:44.2, who:'KIOS', text:'*hitung ulang* dua pembeli: 12-12... IYA BENER SEMUA 😂'},
  {t0:46.4, who:'KAMU', text:'meja sambutan rata siap 😄 siapa dateng tinggal ambil'},
  {t0:48.6, who:'KIOS', text:'malam ini stokku isi 24. buat tamu pertama kemarin juga ya 🍬'},
  {t0:50.8, who:'MYST', text:'kalian... beneran mau nerima aku? 🥹'},
  {t0:52.6, who:'KAMU', text:'jelas dong. bagi rata itu buat semua orang, kamu juga 😊'},
  {t0:54.4, who:'KIOS', text:'*pasang lampu taman* gais, malam tiba. WAKTUNYA EKSEKUSI 🌚'},
  {t0:56.2, who:'KIOS', kind:'photo', svg:'kejutan', cap:'KEJUTAN 24 TERPASANG. SISA: NOL ✨'},
  {t0:58.2, who:'MYST', text:'*lambai dari seberang jalan* kalian keren banget 🥹✨'},
  {t0:60.4, who:'MENTOR', text:'kasus ditutup. pembagi rapi itu siapa aja yang mau bagi rata 😌'},
  {t0:62.8, who:'MYST', text:'berarti aku gak sendirian lagi ya 😊🌙'},
  {t0:72.0, who:'MENTOR', text:'psst. kios sebelah nyimpen misteri baru: pembagian yang paling pas'}
];

/* divider bab gaya chat (judul bab rata tengah, aturan 28) */
const DIVS=[
  [0.4,'MISTERI PEMBAGI RAPI'],
  [10.9,'PETUNJUK PERTAMA: FAKTOR'],
  [18.4,'PETUNJUK KEDUA: KELIPATAN'],
  [34.5,'TERBATAS VS TANPA BATAS'],
  [38.6,'RENCANA TERIMA KASIH'],
  [53.7,'TERIMA KASIH, SAHABAT RAPI!']
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
      const pc=document.createElement('div');
      pc.className='pcap';
      pc.textContent=m.cap;
      bub.appendChild(pc);
    }else if(m.kind==='sticker'){
      bub.className='bubble sticker';
      bub.style.cssText+=`max-width:${P.stickW}px;`;
      const s1=document.createElement('div');
      s1.className='stk';
      s1.style.fontSize=(ORIENT==='portrait'?32:29)+'px';
      s1.textContent=m.stk;
      const s2=document.createElement('div');
      s2.className='stks';
      s2.style.cssText+='font-size:26px;';
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
  {t0:13.3,t1:16.4,kick:'MOMEN ANGKA',title:'FAKTOR 12',en:'Factors of 12: six neat ways to share!',
   chips:['1','2','3','4','6','12'],hot:-1,
   lines:['12 ÷ 1, 2, 3, 4, 6, 12 = PAS TANPA SISA'],
   notes:['12 ÷ 5 = 2 SISA 2 · BELUM RAPI','13 ÷ 3 = 4 SISA 1 · JADI HADIAH!']},
  {t0:20.8,t1:24.0,kick:'MOMEN ANGKA',title:'KELIPATAN 4',en:'Multiples of 4: 4, 8, 12, 16, 20, 24...',
   chips:['4','8','12','16','20','24'],hot:2,
   lines:['4 × 3 = 12 · KUNJUNGAN KE-12'],
   notes:['12 KELIPATAN 4 · SEKALIGUS FAKTOR 12']},
  {t0:34.6,t1:38.4,kick:'TWIST',title:'TERBATAS VS TANPA BATAS',en:'Ways are limited, chances never end!',
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
fTitle.style.fontSize=(ORIENT==='portrait'?34:30)+'px';
fEn.style.cssText+=`top:${ORIENT==='portrait'?112:96}px;font-size:24px;`;
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
    t2.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;`;
    t2.innerHTML='<span class="dot" style="background:#B9A6FF"></span><span>'+f.two+'</span>';
    w.appendChild(t2);
    f.twoEl=t2;
  }
  const lines=f.lines.map(tx=>{
    const ln=document.createElement('div');
    ln.className='fline';
    ln.style.cssText+=`font-size:${ORIENT==='portrait'?28:26}px;`;
    ln.innerHTML='<span class="dot" style="background:#4CAF7A"></span><span>'+tx+'</span>';
    w.appendChild(ln);
    return {el:ln};
  });
  const notes=f.notes.map(tx=>{
    const nn=document.createElement('div');
    nn.className='fnote';
    nn.style.cssText+=`font-size:${ORIENT==='portrait'?26:24}px;`;
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
  {t0:24.2,t1:26.6,who:'M9',emo:['😲','😲','😲','😲'],rad:130},
  {t0:56.4,t1:59.4,who:'ALL',emo:['🎉','✨','🍬','🎉','✨'],rad:230,conf:true}
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
document.getElementById('qhd').style.fontSize=(ORIENT==='portrait'?32:28)+'px';
const SOAL=['TENTUKAN SEMUA FAKTOR DARI 20.','LIMA KELIPATAN PERTAMA DARI 7.','KENAPA 5 BUKAN FAKTOR DARI 12?','FAKTOR ATAU KELIPATAN: TAK TERBATAS?'];
const qrowsEl=document.getElementById('qrows');
const UJIS=SOAL.map((s,i)=>{
  const r=document.createElement('div');
  r.className='qrow';
  r.style.cssText+=`font-size:${ORIENT==='portrait'?26:25}px;margin-top:${ORIENT==='portrait'?7:5}px;`;
  r.innerHTML='<b>'+(i+1)+'.</b> '+s;
  qrowsEl.appendChild(r);
  return {el:r,t0:65.8+i*0.2};
});
const UJIVAL=['1','2','3','4','5','8','10','20'];
const qgridEl=document.getElementById('qgrid');
qgridEl.style.cssText+=`top:${ORIENT==='portrait'?300:246}px;gap:${ORIENT==='portrait'?12:10}px;`;
const CARDS=UJIVAL.map((v,i)=>{
  const el=document.createElement('div');
  el.className='qcard';
  el.style.cssText+=`width:${ORIENT==='portrait'?132:108}px;`;
  el.textContent=v;
  qgridEl.appendChild(el);
  return {el,v,pop:67.4+i*0.12};
});
const qnoteEl=document.getElementById('qnote');
qnoteEl.style.cssText+=`top:${ORIENT==='portrait'?452:322}px;font-size:24px;`;
qnoteEl.textContent='KARTU BANTU MISI NOMOR SATU';
const qctaEl=document.getElementById('qcta');
qctaEl.style.cssText+=`top:${ORIENT==='portrait'?506:368}px;font-size:${ORIENT==='portrait'?28:26}px;`;

/* ---------- subtitle EN (aturan 8 + 18: proporsional, min 1.7 s) ---------- */
const SUBS=[
  [1.2,'Look at my display this morning!'],
  [3.5,'Closed at eight. Who tidied it??'],
  [5.6,'One candy alone on a plate.'],
  [7.4,'Left alone like a little guest.'],
  [9.3,'Sweet case! Count me in.'],
  [11.3,'Clue one: always shared evenly.'],
  [13.3,'Factors of 12: six neat ways to share!'],
  [16.6,'So 12 splits evenly six ways!'],
  [18.5,'Clue two: guest visits 4, 8, 12, 16, 20'],
  [20.8,'Multiples of 4: 4, 8, 12, 16, 20, 24...'],
  [24.2,'Visit 12 fits the pattern!'],
  [26.0,'My guest book. Check it yourself.'],
  [28.2,'I never wrote these by hand!'],
  [30.0,'Whoa. The helper is real!'],
  [31.9,'My gift. Refill to 24 tomorrow!'],
  [34.6,'Ways are limited, chances never end!'],
  [38.8,'Jurus Bagi Rata! 2 get 12, 3 get 8, 4 get 6.'],
  [42.0,'24 candies shared evenly, zero rest!'],
  [46.4,'A fair table for whoever comes!'],
  [48.6,'Stock set to 24 tonight. You too!'],
  [50.8,'You really would accept me?'],
  [52.6,'Fair sharing is for you too.'],
  [54.4,'Night falls. Time to execute!'],
  [56.2,'Surprise 24 in place. Zero rest!'],
  [58.2,'I watched from across the road!'],
  [60.4,'The Tidy Divider is everyone who shares.'],
  [62.8,'So I am not alone anymore.'],
  [65.4,'New mission: four questions for you!'],
  [72.0,'Next door keeps a new mystery: the fairest sharing.'],
  [76.0,'Thanks for watching.']
];
const subbar=document.getElementById('subbar');
const subEn=document.getElementById('sub_en');
subbar.style.cssText+=`top:${P.subTop}px;max-width:${P.subMax}px;`;
subEn.style.fontSize='24px';

/* watermark + endcard */
const markEl=document.getElementById('mark');
markEl.style.cssText+=`top:${P.wmY}px;font-size:24px;`;
const endcard=document.getElementById('endcard');
const fplate=document.getElementById('fplate');
const fUrl=document.getElementById('f_url');
const fBar=document.getElementById('f_bar');
fplate.style.cssText+=`left:${P.phoneX+(P.phoneW-P.ecW)/2}px;top:${P.ecY}px;width:${P.ecW}px;height:${P.ecH}px;font-size:${P.ecFS}px;`;
fBar.style.cssText+=`left:${P.phoneX+(P.phoneW-P.barW)/2}px;top:${P.ecY+P.ecH+26}px;width:0;height:10px;`;
const flashwhite=document.getElementById('flashwhite');
const fadeEl=document.getElementById('fade');
const typingEl=document.getElementById('pma');
const typingAv=document.getElementById('pmav');
const typingTx=document.getElementById('pmat');
typingTx.style.fontSize='24px';
