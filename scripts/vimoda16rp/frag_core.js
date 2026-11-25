/* ---------- LIPATAN KE-42 (VIDEO 16): data & elemen format RP ----------
   Dunia BARU ala RP Telegram/TikTok gen Z: grup chat "GRUP BAHAS FYP",
   chara OC bernama (RAYA, BIMO, DILA, KAMU, ???). HUKUM SERI BARU: setiap
   episode dunianya diganti total (grup, anggota, avatar, setting) - tidak
   ada dunia yang diulang. Warisan format terkunci video 15 (rev9-11)
   tetap jalan penuh: tanpa indikator pengetikan, 20 pesan jeda lega,
   dialog 60px, dialog manusiawi tanpa kalimat tema dan tanpa label di
   ucapan, ALUR rantai sebab-akibat tertutup (tanya-jawab benar, tanpa
   kehadiran mustahil, tanpa pembelaan tak diminta), diagram menyala,
   papan soal milik ???, teaser lanjutan.
   Bahan: blog Yuyanaka "Pikosa - MENGENAL BILANGAN BERPANGKAT" (23 Nov
   2026). Alur video 16 (semua hitungan terverifikasi kode): RAYA bawa
   klaim viral FYP - kertas 0,1 mm dilipat dobel 42 kali tembus ke bulan
   - BIMO menolak keras, debat pecah -> DILA cegah miskonsepsi (2^3 bukan
   2×3) -> diagram pangkat -> grup menghitung bertahap: 2^10 = 10 cm,
   2^20 = 105 m, 2^30 = 107 km -> diagram twist LIPATAN KE-42: 2^42 =
   439.804 km > bulan 384.400 km, klaim TEBUS, BIMO kalah dengan manis ->
   akun misterius ngepost bukti lengkap -> ??? bicara: dia pembuat video,
   moot pendiam yang cuma baca; klaim mustahil tapi bener ia tanam karena
   grupnya suka debat -> janji: hitung dulu baru komen. Teaser 2^-1.
   Watermark AKIOMIDA dinaikkan 2x jarak awal dari bawah (permintaan
   pemilik): portrait 1800 -> 1560, landscape 1010 -> 870. ---------- */
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
  headH:118, bubW:880, bubS:60, nameS:31, photoW:930, stickW:820,
  avS:64, avEmoji:32, focusY:840,
  subTop:1560, subMax:920, wmY:1740,
  ecW:880, ecH:156, ecY:690, barW:480, ecFS:72
} : {
  headH:96, bubW:740, bubS:60, nameS:29, photoW:770, stickW:700,
  avS:54, avEmoji:28, focusY:470,
  subTop:855, subMax:1300, wmY:965,
  ecW:760, ecH:132, ecY:350, barW:460, ecFS:60
};

/* geometri full-bleed MODEL FOKUS (tanpa bezel ponsel; kamera di #rig) */
document.getElementById('chatwrap').style.top=P.headH+'px';
{
  const ht=document.getElementById('htitle');
  ht.style.fontSize=(ORIENT==='portrait'?38:34)+'px';
}
/* doodle latar: angka pangkat melayang (bahasa visual materi) */
const DOODLES=[];
{
  const b=document.getElementById('bgdoodle');
  const chars=['2','4','8','16','32','64','42','128'];
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

/* ---------- cast RP dunia GRUP BAHAS FYP (chara OC bernama ala RP
   Telegram/TikTok gen Z; dunia video ini sendiri, tidak dibawa ulang).
   Avatar bulat dengan IKON SVG digambar custom per chara (rev14: bukan
   emoji comot); label pendek ala username. ---------- */
const CAST={
  RAYA:{name:'RAYA',bg:'radial-gradient(circle,#F26D6D 58%,#D93A5A)',col:'#FFB3B3'},
  BIMO:{name:'BIMO',bg:'radial-gradient(circle,#4CAF7A 58%,#2E7D5B)',col:'#A8E6C3'},
  DILA:{name:'DILA',bg:'radial-gradient(circle,#8E7CD8 55%,#6A5ACD)',col:'#D9C6FF'},
  KAMU:{name:'KAMU',bg:'radial-gradient(circle,#C9556B 55%,#A6394B)',col:'#D9C6FF'},
  MYST:{name:'???',bg:'radial-gradient(circle,#FFE9A8 40%,rgba(255,233,168,.12) 72%)',col:'#FFE9A8'}
};
/* ikon avatar SVG custom (digambar, bukan emoji): popcorn RAYA, gamepad
   BIMO, boba DILA, kaca pembesar KAMU, bulan sabit ??? */
const AVI={
  RAYA:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<path d="M14 21 L34 21 L31 43 L17 43 Z" fill="#FFF6E8" stroke="#14100C" stroke-width="1.8"/>'
    +'<path d="M14 21 L20 21 L21.2 43 L17 43 Z" fill="#D93A5A"/>'
    +'<path d="M28 21 L34 21 L31 43 L26.8 43 Z" fill="#D93A5A"/>'
    +'<circle cx="16.5" cy="15" r="4.6" fill="#FFFDF6" stroke="#14100C" stroke-width="1.7"/>'
    +'<circle cx="24" cy="11.5" r="5" fill="#FFFDF6" stroke="#14100C" stroke-width="1.7"/>'
    +'<circle cx="31.5" cy="15" r="4.6" fill="#FFFDF6" stroke="#14100C" stroke-width="1.7"/>'
    +'<circle cx="24" cy="11.5" r="1.7" fill="#F2C14E"/></svg>',
  BIMO:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<rect x="6" y="15" width="36" height="21" rx="10.5" fill="#14100C"/>'
    +'<rect x="11" y="19.5" width="11" height="5" rx="2.5" fill="#4CAF7A"/>'
    +'<circle cx="33" cy="22" r="3.2" fill="#F7C948"/><circle cx="37.5" cy="28" r="3.2" fill="#F26D6D"/>'
    +'<path d="M19.5 29 h3 v-3 h3 v3 h3 v3 h-3 v3 h-3 v-3 h-3 Z" fill="#FFF6E8" transform="translate(-3 -1.5)"/></svg>',
  DILA:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<rect x="25.5" y="4" width="4.5" height="13" rx="2.2" fill="#14100C" transform="rotate(14 27.7 10.5)"/>'
    +'<rect x="12.5" y="14.5" width="23" height="4.5" rx="2.2" fill="#14100C"/>'
    +'<path d="M14.5 19 h19 l-2.6 25 h-13.8 Z" fill="#FFF6E8" stroke="#14100C" stroke-width="1.8"/>'
    +'<circle cx="20" cy="34" r="2.5" fill="#14100C"/><circle cx="26.5" cy="36" r="2.5" fill="#14100C"/>'
    +'<circle cx="23" cy="29.5" r="2.3" fill="#8E7CD8"/></svg>',
  KAMU:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<circle cx="21" cy="20.5" r="10.5" fill="rgba(255,246,232,.92)" stroke="#14100C" stroke-width="3"/>'
    +'<circle cx="21" cy="20.5" r="5.5" fill="#D93A5A" opacity=".5"/>'
    +'<line x1="29.5" y1="29" x2="39" y2="38.5" stroke="#14100C" stroke-width="5.5" stroke-linecap="round"/></svg>',
  MYST:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<path d="M31 6 A17 17 0 1 0 31 42 A13 13 0 1 1 31 6 Z" fill="#3A2C50" stroke="#14100C" stroke-width="1.6"/>'
    +'<path d="M36 12 l1.8 4.2 4.2 1.8 -4.2 1.8 -1.8 4.2 -1.8 -4.2 -4.2 -1.8 4.2 -1.8 Z" fill="#14100C"/>'
    +'<circle cx="40" cy="30" r="2" fill="#14100C"/></svg>'
};

/* ---------- ilustrasi dunia VIDEO 16 (SVG foto chat, digambar serius) ----------
   Tiga foto "asli dari dunia GRUP BAHAS FYP": tangkapan layar post FYP
   (thumbnail video: tumpukan kertas terlipat, bulan, tombol play, judul
   "lipat 42 kali sampe bulan??", akun @batangkertas), kertas hitungan
   DILA berjudul TANGGA DOBEL (2^2 sampai 2^10, baris 2^10 diclingkung
   merah "10 cm!", catatan kertas 0,1 mm), dan post bukti malam (langit
   malam, bulan berkawah, garis jarak putus-putus dari kertas ke bulan,
   tag 2^42 = 439.804 KM, pil hijau TEMBUS). Semua deterministik. ---------- */
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
function svgFyp(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="skyF" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#2A1E44"/><stop offset="1" stop-color="#181132"/></linearGradient>'
   +'<radialGradient id="glowM" cx="0.5" cy="0.5" r="0.5">'
   +'<stop offset="0" stop-color="rgba(255,243,196,.3)"/><stop offset="1" stop-color="rgba(255,243,196,0)"/></radialGradient></defs>'
   +'<rect width="600" height="340" fill="url(#skyF)"/>';
  [[120,20,1.6],[520,300,1.6],[40,300,1.4],[570,60,1.5]].forEach(p=>{s+=dot(p[0],p[1],p[2],'rgba(255,246,232,.45)')});
  s+='<rect x="40" y="26" width="520" height="288" rx="22" fill="rgba(255,246,232,.06)" stroke="#E8B32E" stroke-width="3"/>';
  s+='<rect x="64" y="50" width="472" height="150" rx="14" fill="#241A3E" stroke="rgba(232,179,46,.6)" stroke-width="2.5"/>';
  s+='<ellipse cx="470" cy="88" rx="52" ry="46" fill="url(#glowM)"/>'
   +'<circle cx="470" cy="88" r="30" fill="#FFF3C4"/>'
   +dot(462,82,5,'#E8D08A')+dot(478,96,4,'#E8D08A')+dot(470,78,3,'#E8D08A');
  const bars=[[150,182],[126,166],[104,150],[84,134],[66,118]];
  bars.forEach(b=>{s+='<rect x="'+(170-b[0]/2)+'" y="'+b[1]+'" width="'+b[0]+'" height="13" rx="4" fill="#FFFDF6" stroke="#C8A86E" stroke-width="2"/>'});
  s+='<path d="M262,128 q20,-20 44,-12" fill="none" stroke="#F7C948" stroke-width="3.5" stroke-linecap="round"/>'
   +'<path d="M306,116 l4,10 -11,-1 Z" fill="#F7C948"/>'
   +'<circle cx="300" cy="124" r="28" fill="rgba(255,246,232,.14)" stroke="#FFF6E8" stroke-width="3"/>'
   +'<path d="M292,110 L320,124 L292,138 Z" fill="#FFF6E8"/>'
   +'<text x="470" y="162" text-anchor="middle" font-family="JetBrains Mono, DejaVu Sans Mono, monospace" font-size="34" font-weight="800" fill="#F2C14E">2<tspan dy="-10" font-size="24">42</tspan></text>';
  s+='<rect x="64" y="212" width="472" height="62" rx="12" fill="rgba(255,246,232,.08)"/>'
   +'<text x="84" y="238" font-size="24" font-weight="700" fill="#FFF6E8">lipat 42 kali sampe bulan??</text>'
   +'<path d="M447 224 c-2.4,-5.8 -11,-4.1 -11,1.7 c0,4.9 6.5,7.4 11,10.8 c4.5,-3.4 11,-5.9 11,-10.8 c0,-5.8 -8.6,-7.5 -11,-1.7 Z" fill="#F26D6D"/>'
   +'<text x="464" y="238" font-size="24" font-weight="700" fill="#F26D6D">98 rb</text>'
   +'<text x="84" y="264" font-size="24" font-weight="600" fill="rgba(255,246,232,.6)">@batangkertas · 2,1 jt nonton</text>';
  return s+'</svg>';
}
function svgCeklis(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="wdK" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#6B4E34"/><stop offset="1" stop-color="#4A3624"/></linearGradient></defs>'
   +'<rect width="600" height="340" fill="url(#wdK)"/>';
  for(let i=0;i<4;i++){s+='<line x1="0" y1="'+(40+i*82)+'" x2="600" y2="'+(48+i*82)+'" stroke="rgba(0,0,0,.18)" stroke-width="3"/>'}
  s+='<g transform="rotate(-2 300 170)">'
   +'<rect x="88" y="42" width="424" height="256" rx="14" fill="#FFFDF6" stroke="#E4D5B0" stroke-width="3"/>';
  for(let i=0;i<6;i++){s+='<line x1="112" y1="'+(126+i*34)+'" x2="488" y2="'+(126+i*34)+'" stroke="#EFE6D2" stroke-width="2"/>'}
  s+='<text x="300" y="80" text-anchor="middle" font-family="JetBrains Mono, DejaVu Sans Mono, monospace" font-size="26" font-weight="800" fill="#7A4A2A" letter-spacing="4">TANGGA DOBEL</text>'
   +dot(118,72,7,'#8E7CD8')+dot(482,72,7,'#F26D6D');
  const row=(y,exp,val)=>{
    return '<text x="130" y="'+y+'" font-family="JetBrains Mono, DejaVu Sans Mono, monospace" font-size="28" font-weight="700" fill="#3A2C1E">2<tspan dy="-9" font-size="24">'+exp+'</tspan><tspan dy="9" font-size="28"> = '+val+'</tspan></text>';
  };
  s+=row(120,'2','4')+row(154,'4','16')+row(188,'6','64')+row(222,'8','256')+row(256,'10','1.024');
  s+='<ellipse cx="238" cy="248" rx="128" ry="21" fill="none" stroke="#D93A5A" stroke-width="3" transform="rotate(-2 238 248)"/>'
   +'<text x="404" y="256" font-size="26" font-weight="800" fill="#D93A5A">10 cm!</text>'
   +'<text x="300" y="290" text-anchor="middle" font-size="24" font-weight="600" fill="#8A6A46">kertas 0,1 mm · dobel tiap lipatan</text></g>';
  return s+'</svg>';
}
function svgMoon(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="skyM" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#1B1440"/><stop offset="1" stop-color="#120C2A"/></linearGradient>'
   +'<radialGradient id="glowB" cx="0.5" cy="0.5" r="0.5">'
   +'<stop offset="0" stop-color="rgba(255,243,196,.3)"/><stop offset="1" stop-color="rgba(255,243,196,0)"/></radialGradient></defs>'
   +'<rect width="600" height="340" fill="url(#skyM)"/>';
  [[70,60,1.6],[180,110,1.4],[330,60,1.8],[560,60,1.5],[60,200,1.4],[300,250,1.3],[540,250,1.6]].forEach(p=>{s+=dot(p[0],p[1],p[2],'rgba(255,246,232,.5)')});
  s+='<ellipse cx="452" cy="150" rx="118" ry="104" fill="url(#glowB)"/>'
   +'<circle cx="452" cy="150" r="74" fill="#FFF3C4"/>'
   +dot(432,128,10,'#E8D08A')+dot(470,160,14,'#E8D08A')+dot(452,186,7,'#E8D08A')+dot(478,132,6,'#E8D08A');
  s+='<path d="M96,262 C170,216 260,168 372,152" fill="none" stroke="#F7C948" stroke-width="3.5" stroke-dasharray="10 9"/>'
   +'<path d="M376,144 l14,4 -10,11 Z" fill="#F7C948"/>';
  const bars=[[110,256],[90,242],[72,228],[56,214],[44,200]];
  bars.forEach(b=>{s+='<rect x="'+(96-b[0]/2)+'" y="'+b[1]+'" width="'+b[0]+'" height="11" rx="4" fill="#FFFDF6" stroke="#C8A86E" stroke-width="2"/>'});
  s+='<text x="112" y="292" text-anchor="middle" font-size="24" font-weight="600" fill="rgba(255,246,232,.7)">kertas 0,1 mm</text>'
   +'<text x="452" y="256" text-anchor="middle" font-size="24" font-weight="700" fill="#FFF3C4">BULAN · 384.400 KM</text>';
  s+='<g transform="rotate(-3 238 88)">'
   +'<rect x="90" y="64" width="296" height="46" rx="10" fill="#241A3E" stroke="#E8B32E" stroke-width="2.5"/>'
   +'<text x="238" y="96" text-anchor="middle" font-family="JetBrains Mono, DejaVu Sans Mono, monospace" font-size="30" font-weight="800" fill="#F2C14E">2<tspan dy="-9" font-size="24">42</tspan><tspan dy="9" font-size="30"> = 439.804 KM</tspan></text></g>'
   +'<g transform="rotate(-6 238 148)">'
   +'<rect x="184" y="128" width="108" height="40" rx="10" fill="#4CAF7A"/>'
   +'<text x="238" y="155" text-anchor="middle" font-size="24" font-weight="800" fill="#10331F" letter-spacing="2">TEMBUS</text></g>';
  [[520,84],[70,150],[556,140],[240,96],[520,300],[90,320]].forEach(p=>{
    s+='<path d="M'+p[0]+','+(p[1]-14)+' l4,10 10,4 -10,4 -4,10 -4,-10 -10,-4 10,-4 Z" fill="rgba(255,255,255,.7)"/>'});
  [[280,200,'#D93A5A'],[340,236,'#4CAF7A'],[80,90,'#8E7CD8'],[560,220,'#F7C948']].forEach(p=>{
    s+=dot(p[0],p[1],5,p[2])});
  return s+'</svg>';
}
const SVGS={fyp:svgFyp,ceklis:svgCeklis,moon:svgMoon};
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

/* ---------- pesan RP VIDEO 16 (dunia GRUP BAHAS FYP, chara OC gen Z):
   dialog manusiawi ala chat fiction RP (slang, *aksi*, drama debat),
   tanpa kalimat tema, tanpa label di ucapan, ALUR rantai sebab-akibat
   tertutup. Klaim viral FYP (lipat dobel 42 kali tembus bulan) -> BIMO
   menolak keras -> DILA cegah miskonsepsi pangkat -> diagram -> grup
   menghitung bertahap 2^10, 2^20, 2^30 -> diagram twist 2^42 = 439.804
   km > bulan 384.400 km: klaim TEBUS -> akun misterius ngepost bukti ->
   ??? bicara: dia pembuat video, moot pendiam yang tanam klaim mustahil
   tapi bener karena grupnya suka debat -> janji hitung dulu baru komen.
   Semua angka terverifikasi kode: 2^10=10,2 cm; 2^20=104,9 m; 2^30=
   107,4 km; 2^42=439.804,7 km. Rantai tanya-jawab benar, tanpa kehadiran
   mustahil, satu makna per angka.
   rev14: bahasa SOPAN (slang kasar dibuang dari seluruh dialog), nol
   emoji di seluruh video (avatar ikon SVG, kartu meme ilustrasi AI,
   burst konfeti gambar), stempel jam chat realistis mengalir 00.31 ->
   02.05 dan NYAMBUNG dengan kartu babak (JAM 1 PAGI, JAM 2 PAGI).
   rev15: VOICE ACTING 5 chara - pipeline engine-adapter (default edge-tts
   id-ID; adapter VoiceStudio OSS debpalash/voicestudio + z-ai TTS siap
   pakai, lihat voice16rp.py); timeline SATU SUMBER: timeline16rp.py
   menghitung TM (frag_time.js) dari durasi voice, dipakai engine, audio,
   dan QA; durasi video mengikuti panjang voice (242.6 s). ---------- */
const MSGS=[
  {t0:TM.m[0], who:'RAYA', stamp:'00.31', kind:'photo', svg:'fyp', cap:'FYP LAGI RAME: KERTAS DILIPAT DOBEL 42 KALI SAMPAI BULAN??'},
  {t0:TM.m[1], who:'BIMO', stamp:'00.32', text:'*bacain hp* GAK MUNGKIN DEH. dobel 42 kali ya tetep kertas tipis. klaim fyp bebas banget'},
  {t0:TM.m[2], who:'KAMU', stamp:'00.33', text:'tapi klaimnya spesifik bestie: 2^42. itu dobel 42 kali. gak mungkin dia berani nulis gitu'},
  {t0:TM.m[3], who:'RAYA', stamp:'00.34', text:'di caption dia nulis 2 pangkat 42. bener apa nggak, kita cek bareng'},
  {t0:TM.m[4], who:'DILA', stamp:'00.37', text:'tunggu, 2^3 itu bukan 2×3 ya. biar gak ada yang salah paham, aku gambar dulu'},
  {t0:TM.m[5], who:'BIMO', stamp:'00.39', text:'ohhh jadi 2^3 = 2×2×2 = 8. gue dari dulu kira 2×3 = 6. aduh, malu banget'},
  {t0:TM.m[6], who:'KAMU', stamp:'00.41', text:'banyak yang keliru kok. pangkat = jumlah kali lipatnya, bukan angka yang dikali'},
  {t0:TM.m[7], who:'DILA', stamp:'00.43', kind:'photo', svg:'ceklis', cap:'KUKUMPUL HITUNGANNYA: 2^2 SAMPAI 2^10 DULU'},
  {t0:TM.m[8], who:'DILA', stamp:'00.45', text:'2^10 = 1.024 lipatan. tebel kertasnya udah 10 cm. BARU 10 LIPATAN'},
  {t0:TM.m[9], who:'BIMO', stamp:'00.46', text:'hadeh baru 10 cm. bulan itu 384 RIBU KM bestie. jauh banget'},
  {t0:TM.m[10], who:'KAMU', stamp:'00.47', text:'tapi tiap lipatan dobel. 2^20 = 1 juta kali lipat. tebelnya 105 METER?!'},
  {t0:TM.m[11], who:'RAYA', stamp:'00.49', text:'gas hitung sampai lipatan ke-42. malam ini debatnya diselesaikan'},
  {t0:TM.m[12], who:'DILA', stamp:'01.04', kind:'sticker', stk:'TANGGA DOBEL', stks:'2^10=10 cm · 2^20=105 m · 2^30=107 km · 2^42=439.804 km'},
  {t0:TM.m[13], who:'BIMO', stamp:'01.06', text:'439 RIBU KM?? bulan 384 ribu. GUE KALAH. oke, gak semua klaim fyp hoax'},
  {t0:TM.m[14], who:'KAMU', stamp:'01.08', text:'klaim mustahil kadang bener, kadang hoax. bedanya di hitungan'},
  {t0:TM.m[15], who:'RAYA', stamp:'01.11', text:'GUYSS akunnya ngepost lagi. katanya bukti lengkapnya dia taruh malam ini'},
  {t0:TM.m[16], who:'RAYA', stamp:'02.00', kind:'photo', svg:'moon', cap:'POST BARUNYA: 2^42 = 439.804 KM. BULAN 384.400 KM. TEMBUS ✓'},
  {t0:TM.m[17], who:'MYST', stamp:'02.01', text:'halo. video itu punyaku. aku cuma baca di grup ini. kalian suka debat, jadi kubuat yang mustahil tapi bener'},
  {t0:TM.m[18], who:'BIMO', stamp:'02.03', text:'mantap, makasih bestie. mulai sekarang hitung dulu baru komen. deal semua?'},
  {t0:TM.m[19], who:'RAYA', stamp:'02.05', text:'oh iya: ada yang nanya 2^-1 di komentar. minus?? besok kita bedah'}
];

/* divider bab gaya kartu waktu RP (bukan label pelajaran); jam nyambung
   dengan stempel chat: 00.31 -> 01.04 (JAM 1 PAGI) -> 02.00 (JAM 2 PAGI);
   waktu semua kartu dari TM (rev15) */
const DIVS=TM.div;

/* ---------- build bubbles MODEL FOKUS ala referensi: nama dan waktu
   DI DALAM bubble (putih = anggota, hijau = KAMU dengan Dibaca v-v,
   ??? = bubble gelap glow emas), teks 60px besar, avatar kecil di luar ---------- */
const chatEl=document.getElementById('pchat');
const MSGE=[];
function mkAvatar(who){
  const c=CAST[who];
  const a=document.createElement('div');
  a.className='avatar';
  a.style.cssText+=`width:${P.avS}px;height:${P.avS}px;flex:0 0 ${P.avS}px;background:${c.bg};`;
  a.innerHTML=AVI[who](Math.round(P.avS*0.66));
  return a;
}
function mkMeta(m, you){
  const meta=document.createElement('div');
  meta.className='meta';
  const tm=document.createElement('span');
  tm.className='mtime';
  tm.style.fontSize='26px';
  tm.textContent=m.stamp;
  meta.appendChild(tm);
  if(you){
    const tk=document.createElement('span');
    tk.className='ticks';
    tk.style.fontSize='27px';
    tk.textContent='Dibaca ✓✓';
    meta.appendChild(tk);
  }
  return meta;
}
function mkBody(m, mi){
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
    bub.appendChild(mkMeta(m, m.who==='KAMU'));
  }else if(m.kind==='sticker'){
    bub.className='bubble sticker';
    bub.style.cssText+=`max-width:${P.stickW}px;`;
    const s1=document.createElement('div');
    s1.className='stk';
    s1.style.fontSize=(ORIENT==='portrait'?52:46)+'px';
    s1.textContent=m.stk;
    const s2=document.createElement('div');
    s2.className='stks';
    s2.style.cssText+='font-size:'+(ORIENT==='portrait'?36:32)+'px;';
    s2.textContent=m.stks;
    bub.appendChild(s1);
    bub.appendChild(s2);
    bub.appendChild(mkMeta(m, m.who==='KAMU'));
  }else{
    bub.className='bubble';
    bub.style.cssText+=`max-width:${P.bubW}px;font-size:${P.bubS}px;`;
    const nm=document.createElement('div');
    nm.className='mname';
    nm.style.cssText+=`color:${CAST[m.who].col};font-size:${P.nameS}px;`;
    nm.textContent=CAST[m.who].name;
    bub.appendChild(nm);
    const tx=document.createElement('div');
    tx.innerHTML=richText(m.text);
    bub.appendChild(tx);
    bub.appendChild(mkMeta(m, m.who==='KAMU'));
  }
  return bub;
}
MSGS.forEach((m,mi)=>{
  const row=document.createElement('div');
  row.className='msg'+(m.who==='KAMU'?' you':'')+(m.who==='MYST'?' myst':'');
  if(m.who!=='KAMU') row.appendChild(mkAvatar(m.who));
  const bw=document.createElement('div');
  bw.className='bwrap';
  bw.style.cssText+=`max-width:${Math.max(P.bubW,P.photoW,P.stickW)}px;`;
  bw.appendChild(mkBody(m, mi));
  row.appendChild(bw);
  if(m.who==='KAMU') row.appendChild(mkAvatar(m.who));
  row.dataset.t0=m.t0;
  chatEl.appendChild(row);
  MSGE.push({el:row,m:m,top:0,h:0,rot:(mi%2?2.2:-2.2),
    nt:(MSGS[mi+1]?MSGS[mi+1].t0:TM.end[0])});
});

/* ---------- sisipan reaksi meme ala referensi pemilik: hard cut
   full-screen hitam di sela babak, ILUSTRASI AI besar zoom lambat ala
   meme (rev14: ganti emoji comot), mata menyala (BIMO), digit pangkat
   naik (DILA). Label waktu tetap dari DIVS (hukum kartu). ---------- */
const MEMEwrap=document.getElementById('memewrap');
const MEMES=DIVS.map(([t0,txt],i)=>{
  const L=document.createElement('div');
  L.className='meme';
  const st=document.createElement('div');
  st.className='mstage';
  const g=document.createElement('div');
  g.className='mglyph';
  g.style.cssText+=`width:${ORIENT==='portrait'?540:420}px;height:${ORIENT==='portrait'?540:420}px;`;
  const im=document.createElement('img');
  im.src=MEME_IMGS[i];
  im.alt='ilustrasi';
  g.appendChild(im);
  st.appendChild(g);
  if(i===1){
    const eyes=document.createElement('div');
    eyes.className='meyes';
    eyes.style.cssText+=`width:${ORIENT==='portrait'?300:230}px;height:${ORIENT==='portrait'?300:230}px;`;
    eyes.innerHTML='<i></i><i></i>';
    st.appendChild(eyes);
  }
  L.appendChild(st);
  if(i===2){
    const dg=document.createElement('div');
    dg.className='mdigits';
    ['2','4','8','16','32'].forEach((c,j)=>{
      const d=document.createElement('div');
      d.className='mdigit';
      d.style.cssText+=`font-size:${38+j*8}px;left:${Math.round(W*0.14+j*W*0.15)}px;top:${Math.round(H*0.24+j*H*0.09)}px;`;
      d.textContent=c;
      dg.appendChild(d);
    });
    L.appendChild(dg);
  }
  const tx=document.createElement('div');
  tx.className='mtext';
  tx.style.cssText+=`font-size:${ORIENT==='portrait'?44:40}px;`;
  tx.textContent=txt;
  L.appendChild(tx);
  const sub=document.createElement('div');
  sub.className='msub';
  sub.style.cssText+='font-size:30px;';
  sub.textContent=['GRUP TERBUKA','BIMO BELUM PERCAYA','DILA MULAI MENGHITUNG',
    'DEBAT SELESAI, BUKTI TIBA','AKUN MISTERIUS AKTIF'][i];
  L.appendChild(sub);
  MEMEwrap.appendChild(L);
  return {el:L,st,g,eyes:L.querySelector('.meyes'),
    digits:[...L.querySelectorAll('.mdigit')],tx,sub,t0,win:TM.wins[i]};
});
/* ukur posisi (setelah font siap, dipanggil ulang dari frag_render init) */
function layoutChat(){
  const curY=(()=>{const mm=/translateY\((-?[\d.]+)px\)/.exec(chatEl.style.transform);return mm?parseFloat(mm[1]):0})();
  MSGE.forEach(x=>{
    const r=x.el.getBoundingClientRect();
    const c=chatEl.getBoundingClientRect();
    x.top=r.top-c.top+curY;
    x.h=r.height;
  });
}

/* ---------- tiga DIAGRAM MENYALA (momen ala anime sains); waktu slot
   dari TM.flash (rev15) ---------- */
const FLASHES=[
  {t0:TM.flash[0][0],t1:TM.flash[0][1],kick:'CARA TULIS SINGKAT',title:'BILANGAN BERPANGKAT',en:'Same number times itself, written short!',
   chips:['2^1','2^2','2^3','2^4'],hot:2,
   lines:['2^3 = 2 × 2 × 2 = 8'],
   notes:['BASIS 2 · PANGKAT 3 = JUMLAH KALI LIPAT','3^2 = 9 · 4^3 = 64 · 10^3 = 1.000']},
  {t0:TM.flash[1][0],t1:TM.flash[1][1],kick:'AWAS KELIRU',title:'PANGKAT VS PERKALIAN',en:'2 cubed makes 8, not 2 times 3!',
   chips:['2^3 = 8','2 × 3 = 6'],hot:0,
   lines:['PANGKAT = DIKALI DIRINYA SENDIRI','BUKAN DIKALI ANGKA PANGKATNYA'],
   notes:['PAHAM MAKNA LEBIH PENTING DARI HAFAL BENTUK']},
  {t0:TM.flash[2][0],t1:TM.flash[2][1],kick:'HASIL HITUNGAN',title:'LIPATAN KE-42',en:'Each double, the distance explodes!',
   chips:['10 CM','105 M','107 KM','439 RIBU KM'],hot:3,
   lines:['2^10=10 CM · 2^20=105 M · 2^30=107 KM'],
   notes:['2^42 = 439.804 KM · BULAN 384.400 KM','TIAP DOBEL, JARAK LOMPAT LAGI']}
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

/* ---------- burst konfeti gambar (rev14: bukan emoji) - lingkaran,
   kotak berputar, dan bintang emas dari palet brand ---------- */
const burstEl=document.getElementById('burst');
/* slot burst dari TM (rev15): [t0, t1, jumlah part, radius, konfeti] */
const BURSTS=TM.bursts.map(([t0,t1,n,rad,conf])=>({t0,t1,n,rad,conf:!!conf}));
const BPARTS=[];
BURSTS.forEach((b,bi)=>{
  for(let i=0;i<b.n;i++){
    const el=document.createElement('div');
    const sq=i%3===1;
    el.className=sq?'bsq':'bdot';
    const cols=['#F26D6D','#F7C948','#8E7CD8','#4CAF7A','#FFF3C4'];
    const sz=(sq?10:7)+rnd()*9;
    el.style.cssText+=`width:${sz.toFixed(0)}px;height:${sz.toFixed(0)}px;background:${cols[i%5]};`;
    burstEl.appendChild(el);
    const a=(i/b.n)*Math.PI*2+rnd()*0.5;
    BPARTS.push({el,bi,a,d:0.6+rnd()*0.5,ph:rnd()*6});
  }
});

/* angka pangkat naik pelan di latar babak hitungan (efek seru rev13) */
const RISES=[];
{
  const chars=['2','4','8','16','32','64'];
  for(let i=0;i<chars.length;i++){
    const el=document.createElement('div');
    el.className='rise';
    el.style.cssText+=`font-size:${44+i*10}px;left:${Math.round(W*0.1+i*W*0.14)}px;top:${H-60}px;`;
    el.textContent=chars[i];
    burstEl.appendChild(el);
    RISES.push({el,ph:rnd()*6});
  }
}

/* ---------- overlay MISI BARU (aturan 30: empat soal utuh + kartu) ---------- */
const quizEl=document.getElementById('quiz');
document.getElementById('qhd').style.fontSize=(ORIENT==='portrait'?46:40)+'px';
const SOAL=['HITUNG 3^4.','HITUNG 5^3.','HITUNG 7^0.','HITUNG 2^-3.'];
const qrowsEl=document.getElementById('qrows');
const UJIS=SOAL.map((s,i)=>{
  const r=document.createElement('div');
  r.className='qrow';
  r.style.cssText+=`font-size:${ORIENT==='portrait'?40:34}px;margin-top:${ORIENT==='portrait'?10:6}px;`;
  r.innerHTML='<b>'+(i+1)+'.</b> '+s;
  qrowsEl.appendChild(r);
  return {el:r,t0:TM.quiz[0]+2.3+i*0.16};
});
const UJIVAL=['81','125','1','64','8','27','15','12'];
const qgridEl=document.getElementById('qgrid');
qgridEl.style.cssText+=`top:${ORIENT==='portrait'?480:378}px;gap:${ORIENT==='portrait'?12:10}px;`;
const CARDS=UJIVAL.map((v,i)=>{
  const el=document.createElement('div');
  el.className='qcard';
  el.style.cssText+=`width:${ORIENT==='portrait'?132:108}px;`;
  el.textContent=v;
  qgridEl.appendChild(el);
  return {el,v,pop:TM.quiz[0]+4.3+i*0.1};
});
const qnoteEl=document.getElementById('qnote');
qnoteEl.style.cssText+=`top:${ORIENT==='portrait'?686:478}px;font-size:32px;`;
qnoteEl.textContent='KARTU BANTU DARI ???';
const qctaEl=document.getElementById('qcta');
qctaEl.style.cssText+=`top:${ORIENT==='portrait'?736:525}px;font-size:${ORIENT==='portrait'?42:38}px;`;

/* ---------- subtitle EN (aturan 8 + 18: proporsional, min 1.7 s);
   29 beat rev15 (pesan panjang dua bagian) dari TM ---------- */
const SUBS=TM.subs;
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
fplate.style.cssText+=`left:${Math.round((W-P.ecW)/2)}px;top:${P.ecY}px;width:${P.ecW}px;height:${P.ecH}px;font-size:${P.ecFS}px;`;
fBar.style.cssText+=`left:${Math.round((W-P.barW)/2)}px;top:${P.ecY+P.ecH+26}px;width:0;height:10px;`;
const flashwhite=document.getElementById('flashwhite');
const fadeEl=document.getElementById('fade');
