/* ---------- RESEP GAGAL (VIDEO 21): data & elemen format RP
   ---------- Dunia BARU ala RP Telegram/TikTok gen Z: grup chat
   "GRUP RESEP GAGAL", chara OC bernama (RARA, GITA, DIMAS, MANDA,
   KAMU, akun resmi AKUN DAPUR PUSAT). HUKUM SERI: setiap episode
   dunianya diganti total (grup, anggota, avatar, setting) - tidak ada
   dunia yang diulang, dan tiap episode SKEMA alur + METODE ajarnya
   wajib baru. Sistem desain GLOW v3 (otak/DESAIN-GLOW.md, rombak total
   per penolakan pemilik): gradien hidup + kaca + hero sinematik,
   produksi 9:16 SAJA. Episode ini PENERAPAN KETIGA Formula Dialog
   AKIOMIDA v1 (F1-F8, otak/BELAJAR-DIALOG.md). Bahan: BILANGAN di
   dapur - presisi takaran (200 vs 20 gram, beda 10 kali lipat), urutan
   langkah 1-5, dobel porsi (4 -> 8 -> 12, semua angka ikut dilipat).
   Alur rev24 (semua hitungan terverifikasi kode): papan resep 19.12 ->
   RARA sombong "bukan salah gue" (tolak, F4) -> GITA cermin: resep itu
   matematika -> DIMAS: presisi, satu nol kelewat = 10 kali salah ->
   RARA justifikasi oven ngambek (F4) -> PAPAN TAKARAN: 200 vs 20 ->
   DIMAS: langkah 1-5 juga angka (ordinal) -> GITA: dua shift angka
   (inti) -> MANDA: dobel porsi 4 -> 8 (PAPAN DOBEL) -> RARA ngaku
   (F4 selesai) -> stiker JURUS RESEP TEPAT -> DIMAS empati humor ->
   PERTANYAAN DAPUR: 12 porsi 200 jadi 600? mana yang paling sering
   bikin gagal? -> DIMAS: tiga kali lipat 600 gram -> GITA: data 37
   kegagalan + empati (brownies Rara udah cakep, F8) -> VOTING 58/42 +
   teaser pecahan 1/2 sendok teh. Sapaan unik per chara
   (kak/rar/kak Rara/Rara). ---------- */
const Q = new URLSearchParams(location.search);
const ORIENT = Q.get('o') === 'landscape' ? 'landscape' : 'portrait';
const W = ORIENT === 'portrait' ? 1080 : 1920;
const H = ORIENT === 'portrait' ? 1920 : 1080;

function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)|0;return((t^t>>>14)>>>0)/4294967296}}
const rnd = mulberry32(210615);
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
document.getElementById('chatwrap').style.top=(P.headH+34)+'px';
{
  const ht=document.getElementById('htitle');
  ht.style.fontSize=(ORIENT==='portrait'?38:34)+'px';
}
/* doodle latar: angka desimal melayang (bahasa visual materi) */
const DOODLES=[];
{
  const b=document.getElementById('bgdoodle');
  const chars=['200','20','2x','1-5','180','400','1/2','3x'];
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
    const cols=['#FF6B8A','#FFC94D','#4DD6A8','#5BA8F5'];
    const col=cols[i%4];
    d.style.cssText+=`left:${Math.round(rnd()*(W-80)+40)}px;top:${Math.round(rnd()*(H-220)+60)}px;width:${cd}px;height:${cd}px;background:${col};opacity:0;`;
    b.appendChild(d);
    DOODLES.push({el:d,ph:i*0.71,fs:cd,perm:true});
  }
}

/* ---------- cast RP dunia GRUP RESEP GAGAL (chara OC bernama ala RP
   Telegram/TikTok gen Z; dunia video ini sendiri, tidak dibawa ulang).
   Avatar bulat dengan IKON SVG digambar custom per chara (bukan emoji
   comot); label pendek ala username. ---------- */
const CAST={
  RARA:{name:'RARA',bg:'radial-gradient(circle,#FFB2C6 58%,#FF6B8A)',col:'#E8506E'},
  GITA:{name:'BUNDA GITA',bg:'radial-gradient(circle,#B7F0DC 58%,#2FBF8F)',col:'#0F9E72'},
  DIMAS:{name:'DIMAS',bg:'radial-gradient(circle,#B8DDFF 58%,#3D8BE8)',col:'#2B6FC2'},
  MANDA:{name:'MANDA',bg:'radial-gradient(circle,#D9C8FF 58%,#8E6BF5)',col:'#7A52E8'},
  KAMU:{name:'KAMU',bg:'radial-gradient(circle,#FFD9A8 55%,#F58A3D)',col:'#D96B1E'},
  PUSAT:{name:'AKUN DAPUR PUSAT',bg:'radial-gradient(circle,#FFF3BF 40%,rgba(255,201,77,.15) 72%)',col:'#E67700'}
};
/* ikon avatar SVG custom (digambar, bukan emoji): brownies RARA, spatula
   BUNDA GITA, timbangan digital DIMAS, kardus kue MANDA, topi dapur KAMU,
   bel dapur PUSAT */
const AVI={
  RARA:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<rect x="9" y="22" width="30" height="14" rx="5" fill="#7A4A2B"/>'
    +'<rect x="9" y="22" width="30" height="5" rx="2.5" fill="#5C3620"/>'
    +'<ellipse cx="24" cy="22" rx="15" ry="4.5" fill="#A8683F"/>'
    +'<circle cx="19" cy="29" r="2.2" fill="#FFD9A8"/>'
    +'<circle cx="28" cy="31" r="2.2" fill="#FFD9A8"/>'
    +'<path d="M33 12 q3 -4 6 -2" fill="none" stroke="#F0417C" stroke-width="2.4" stroke-linecap="round"/>'
    +'<line x1="12" y1="38" x2="36" y2="38" stroke="#5C3620" stroke-width="3" stroke-linecap="round"/></svg>',
  GITA:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<rect x="20" y="6" width="8" height="20" rx="4" fill="#2FBF8F"/>'
    +'<path d="M14 26 h20 l-4 12 h-12 Z" fill="#FFF0F5" stroke="#0F9E72" stroke-width="2"/>'
    +'<line x1="24" y1="26" x2="24" y2="36" stroke="#0F9E72" stroke-width="2"/>'
    +'<circle cx="36" cy="12" r="3" fill="#FFC94D"/></svg>',
  DIMAS:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<rect x="8" y="16" width="32" height="24" rx="6" fill="#FFF" stroke="#3D8BE8" stroke-width="2.4"/>'
    +'<rect x="14" y="22" width="20" height="9" rx="3" fill="#B8DDFF" stroke="#3D8BE8" stroke-width="1.6"/>'
    +'<path d="M18 8 h12 v8 h-12 Z" fill="#D6E9FF" stroke="#3D8BE8" stroke-width="1.8"/>'
    +'<circle cx="33" cy="34" r="2.4" fill="#F0417C"/></svg>',
  MANDA:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<rect x="10" y="14" width="28" height="26" rx="5" fill="#FFF0DE" stroke="#8E6BF5" stroke-width="2.4"/>'
    +'<rect x="10" y="14" width="28" height="9" rx="5" fill="#D9C8FF"/>'
    +'<path d="M18 14 q6 -8 12 0" fill="none" stroke="#8E6BF5" stroke-width="2.4"/>'
    +'<circle cx="24" cy="28" r="3.4" fill="#FFC94D"/></svg>',
  KAMU:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<path d="M14 26 q0 -12 10 -12 q10 0 10 12 Z" fill="#FFFFFF" stroke="#F58A3D" stroke-width="2"/>'
    +'<rect x="10" y="26" width="28" height="7" rx="3.5" fill="#F58A3D"/>'
    +'<circle cx="24" cy="10" r="4.5" fill="#FFC94D"/>'
    +'<rect x="19" y="36" width="10" height="5" rx="2.5" fill="none" stroke="#F58A3D" stroke-width="2"/>'
    +'<path d="M22 30 q2 3 4 0" fill="none" stroke="#E8506E" stroke-width="2"/></svg>',
  PUSAT:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<path d="M24 8 q10 2 10 12 l-4 14 h-12 l-4 -14 q0 -10 10 -12 Z" fill="#FFD43B" stroke="#4A3728" stroke-width="1.8"/>'
    +'<circle cx="24" cy="10" r="5" fill="#FFF3BF" stroke="#4A3728" stroke-width="1.8"/>'
    +'<path d="M19 34 q5 6 10 0" fill="none" stroke="#E8590C" stroke-width="2.4" stroke-linecap="round"/>'
    +'<circle cx="24" cy="20" r="3" fill="#F0417C"/></svg>'
};

/* ---------- ilustrasi dunia VIDEO 21 (SVG foto chat, gaya GLOW v3:
   kartu terang + band gradien + titik warna, NOL panel gelap). Empat
   foto "asli dari dunia GRUP RESEP GAGAL": papan resep minggu ini
   (brownies 4 porsi: 200 gram, 2 telur, 250 ml, 180 derajat, 5 langkah),
   papan takaran (200 gram resep vs 20 gram yang dipakai Rara, kurang
   satu nol), papan resep dobel (4 -> 8 porsi, semua angka dua kali
   lipat), dan hasil VOTING DAPUR (58% salah takaran, 42% salah urutan,
   teaser pecahan 1/2 sendok teh). Semua deterministik. ---------- */
const PALS=['#FF6B8A','#FFC94D','#4DD6A8','#5BA8F5','#9B7BF5'];
function dot(cx,cy,r,col){return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+col+'"/>'}
function paper(){
  let s='<defs>'
   +'<linearGradient id="kgW" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFF0F6"/></linearGradient>'
   +'<linearGradient id="kgH" x1="0" y1="0" x2="1" y2="0">'
   +'<stop offset="0" stop-color="#FF6B8A"/><stop offset="1" stop-color="#FFC94D"/></linearGradient>'
   +'<linearGradient id="kgM" x1="0" y1="0" x2="1" y2="0">'
   +'<stop offset="0" stop-color="#4DD6A8"/><stop offset="1" stop-color="#5BA8F5"/></linearGradient>'
   +'<linearGradient id="kgG" x1="0" y1="0" x2="1" y2="0">'
   +'<stop offset="0" stop-color="#9B7BF5"/><stop offset="1" stop-color="#B79CFF"/></linearGradient>';
  return s+'</defs><rect width="600" height="340" fill="url(#kgW)"/>';
}
function confetti(pts){
  let s='';
  pts.forEach(p=>{s+=dot(p[0],p[1],p[2],PALS[p[3]%5])});
  return s;
}
function svgPapan(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'+paper();
  s+=confetti([[118,26,3,0],[520,300,3.5,1],[44,300,2.6,2],[566,58,3,3],[300,30,2.2,4]]);
  s+='<rect x="60" y="34" width="480" height="272" rx="20" fill="#FFFFFF" stroke="#FFC94D" stroke-width="3"/>';
  s+='<rect x="150" y="18" width="300" height="34" rx="12" fill="url(#kgH)"/>';
  s+='<text x="300" y="42" text-anchor="middle" font-size="25" font-weight="800" fill="#FFFFFF" letter-spacing="2">RESEP MINGGU INI</text>';
  s+='<text x="300" y="90" text-anchor="middle" font-size="30" font-weight="800" fill="#43304F">BROWNIES 4 PORSI</text>';
  const row=(y,txt,col)=>{
    let r='<rect x="92" y="'+y+'" width="416" height="44" rx="12" fill="#FFFDF8" stroke="#FFE3C8" stroke-width="2"/>';
    r+=dot(114,y+22,7,col);
    r+='<text x="134" y="'+(y+30)+'" font-size="24" font-weight="800" fill="#43304F">'+txt+'</text>';
    return r;
  };
  s+=row(112,'CEK TAKARAN: 200 GRAM','#FF6B8A')
   +row(164,'2 TELUR · 250 ML · 180 DERAJAT','#4DD6A8')
   +row(216,'LANGKAH 1 SAMPAI 5 WAJIB URUT','#9B7BF5');
  s+='<text x="300" y="318" text-anchor="middle" font-size="28" font-weight="600" fill="#B08450">@dapurpusat · papan resep minggu ini</text>';
  return s+'</svg>';
}
function svgTakaran(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'+paper();
  s+=confetti([[60,50,2.6,1],[556,60,3,0],[300,26,2.4,2],[70,290,2.6,3],[540,288,3,4]]);
  s+='<text x="300" y="52" text-anchor="middle" font-size="28" font-weight="800" fill="#E8506E">PAPAN TAKARAN ASLI</text>';
  s+='<rect x="56" y="76" width="240" height="130" rx="16" fill="#FFFFFF" stroke="#FF6B8A" stroke-width="3"/>'
   +'<text x="176" y="130" text-anchor="middle" font-size="44" font-weight="800" fill="#43304F">200</text>'
   +'<text x="176" y="168" text-anchor="middle" font-size="25" font-weight="700" fill="#43304F">GRAM RESEP</text>'
   +'<rect x="24" y="94" width="8" height="94" rx="4" fill="url(#kgH)"/>';
  s+='<rect x="304" y="76" width="240" height="130" rx="16" fill="#FFF3F7" stroke="#B0A4C0" stroke-width="3" stroke-dasharray="10 7"/>'
   +'<text x="424" y="130" text-anchor="middle" font-size="44" font-weight="800" fill="#8A7BA0">20</text>'
   +'<text x="424" y="168" text-anchor="middle" font-size="25" font-weight="700" fill="#8A7BA0">GRAM DIPAKAI</text>';
  s+='<text x="300" y="236" text-anchor="middle" font-size="27" font-weight="800" fill="#E8506E">KURANG SATU NOL</text>';
  s+='<rect x="80" y="262" width="440" height="44" rx="14" fill="url(#kgM)"/>'
   +'<text x="300" y="293" text-anchor="middle" font-size="25" font-weight="800" fill="#0B4A38">BEDA 10 KALI LIPAT</text>';
  s+='<path d="M286 250 L300 236 L314 250" fill="none" stroke="#E8506E" stroke-width="3"/>';
  return s+'</svg>';
}
function svgDobel(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'+paper();
  s+=confetti([[80,56,3,0],[520,60,3,1],[300,28,2.4,2],[64,288,2.6,3],[548,286,3,4],[180,80,2.4,1],[430,80,2.4,0]]);
  s+='<text x="300" y="52" text-anchor="middle" font-size="28" font-weight="800" fill="#E8506E">PAPAN RESEP DOBEL</text>';
  const rrow=(y,a,b,col)=>{
    let r='<text x="118" y="'+(y+27)+'" text-anchor="middle" font-size="27" font-weight="800" fill="#43304F">'+a+'</text>';
    r+='<path d="M168 '+(y+19)+' h86 l-12 -10 m12 10 l-12 10" fill="none" stroke="'+col+'" stroke-width="3"/>';
    r+='<text x="300" y="'+(y+27)+'" text-anchor="middle" font-size="27" font-weight="800" fill="'+col+'">'+b+'</text>';
    return r;
  };
  s+='<rect x="56" y="72" width="488" height="44" rx="12" fill="url(#kgH)"/>'
   +'<text x="300" y="103" text-anchor="middle" font-size="26" font-weight="800" fill="#FFFFFF">4 PORSI  JADI  8 PORSI</text>';
  s+=rrow(128,'200 GRAM','400 GRAM','#FF6B8A');
  s+=rrow(178,'2 TELUR','4 TELUR','#4DD6A8');
  s+=rrow(228,'250 ML','500 ML','#9B7BF5');
  s+='<rect x="92" y="276" width="416" height="42" rx="13" fill="#FFFFFF" stroke="#FFC94D" stroke-width="2.5"/>'
   +'<text x="300" y="305" text-anchor="middle" font-size="25" font-weight="800" fill="#7A4A12">SEMUA ANGKA DUA KALI LIPAT</text>';
  return s+'</svg>';
}
function svgVoting(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'+paper();
  s+=confetti([[70,60,3,0],[180,110,2.4,2],[330,60,3.4,1],[560,60,3,3],[60,200,2.6,4],[300,250,2.4,0],[540,250,3,2]]);
  s+='<rect x="70" y="30" width="460" height="52" rx="15" fill="url(#kgH)"/>'
   +'<text x="300" y="65" text-anchor="middle" font-size="28" font-weight="800" fill="#FFFFFF" letter-spacing="2">VOTING DAPUR</text>';
  const bar=(y,label,pct,ok)=>{
    let r='<text x="106" y="'+(y+26)+'" font-size="25" font-weight="800" fill="#43304F">'+label+'</text>';
    r+='<rect x="316" y="'+y+'" width="216" height="38" rx="12" fill="#FFF" stroke="rgba(255,201,77,.9)" stroke-width="2"/>';
    r+='<rect x="316" y="'+y+'" width="'+Math.round(216*pct)+'" height="38" rx="12" fill="'+(ok?'url(#kgH)':'url(#kgG)')+'" opacity=".92"/>';
    r+='<text x="'+(326+Math.round(216*pct))+'" y="'+(y+27)+'" font-size="24" font-weight="800" fill="#43304F">'+Math.round(pct*100)+'%</text>';
    return r;
  };
  s+=bar(108,'SALAH TAKARAN',0.58,true);
  s+=bar(164,'SALAH URUTAN',0.42,false);
  s+='<text x="300" y="242" text-anchor="middle" font-size="25" font-weight="700" fill="rgba(90,60,110,.8)">dua-duanya berbahaya, takaran lebih sering</text>';
  s+='<g transform="rotate(-1 300 306)">'
   +'<rect x="100" y="284" width="400" height="44" rx="12" fill="#FFFFFF" stroke="#FFC94D" stroke-width="2.5"/>'
   +'<text x="300" y="314" text-anchor="middle" font-size="24" font-weight="800" fill="#E8506E">BESOK: PECAHAN 1/2 SENDOK TEH</text></g>';
  return s+'</svg>';
}
const SVGS={papan:svgPapan,takaran:svgTakaran,dobel:svgDobel,poll:svgVoting};
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

/* ---------- pesan RP VIDEO 21 (dunia GRUP RESEP GAGAL):
   SKEMA (rev24): FORMULA DIALOG AKIOMIDA v1 (F1-F8,
   otak/BELAJAR-DIALOG.md). Kartu dunia (F2): dapur rumahan malam,
   papan resep minggu ini (brownies 4 porsi), timbangan digital, oven
   180 derajat, loyang dobel. Profil (F1): RARA korban brownies keras,
   sombong-bantah; BUNDA GITA mentor dapur hangat; DIMAS si presisi
   bawa timbangan; MANDA tukang beli jadi lucu; KAMU anggota baru
   penyambung debat. Ledger plot (F6): konflik "brownies keras, siapa
   salah?" - disentuh m1 (bantah), m4 (presisi 10x), m6 (oven ngambek,
   mulai ragu), m7 (takaran dicek duluan), m9 (papan 200 vs 20),
   m15 (ngaku), m18 (ulang beneran), m21 (empati brownies cakep) -
   selesai m15-m21. Ledger fakta: resep 200 gram dipakai 20 gram (beda
   10 kali lipat); langkah 1-5 wajib urut; dobel porsi 4 -> 8 = semua
   takaran x2 (200 -> 400, 2 -> 4, 250 -> 500); 12 porsi = x3 (200 ->
   600); 58% + 42% = 100%. Arc tsun-dere (F4): RARA m1 tolak -> m6
   justifikasi (oven ngambek) -> m18 ngaku (ulang beneran). Empati (F8):
   GITA mencatat kemajuan RARA. Cermin (F5): jawaban mengaitkan fakta
   lawan. Uji ganti-dunia (F7): semua pesan dapur-spesifik. Angka
   terverifikasi kode: 200/20=10; 200x2=400; 2x2=4; 250x2=500; 200x3=600;
   58+42=100. rev14-23 tetap: sopan, nol emoji, stempel nyambung kartu
   babak, voice acting 6 chara, timeline satu sumber, intro film,
   quiz 2 soal. ---------- */
const MSGS=[
  {t0:TM.m[0], who:'PUSAT', stamp:'19.12', kind:'photo', svg:'papan', cap:'RESEP MINGGU INI: BROWNIES 4 PORSI, 200 GRAM COKELAT, 2 TELUR'},
  {t0:TM.m[1], who:'RARA', stamp:'19.13', text:'*kirim foto brownies batu* duh, malu, kak. brownies gue keras kayak batu! padahal gue ikutin semua. gak mungkin salah gue, pasti resepnya yang bohong'},
  {t0:TM.m[2], who:'GITA', stamp:'19.14', text:'santai, rar, kita cek pelan-pelan ya. resep itu murni matematika: tiap angka punya tugas. salah satu angka aja, teksturnya berubah total'},
  {t0:TM.m[3], who:'KAMU', stamp:'19.15', text:'coba hitung ulang, kak rara. cokelatnya berapa gram yang kamu pakai tadi?'},
  {t0:TM.m[4], who:'DIMAS', stamp:'19.17', text:'ini kunci dapur: angka itu presisi. 200 gram dan 20 gram beda sepuluh kali lipat. satu nol aja kelewat, brownies bisa jadi kardus'},
  {t0:TM.m[5], who:'MANDA', stamp:'19.18', text:'makanya gue beli jadi, gak perlu mikir angka. tapi oke deh, gue ikut nyimak. penasaran juga'},
  {t0:TM.m[6], who:'RARA', stamp:'19.20', text:'HMPH, jelas ini ovennya yang ngambek! suhunya gue pasang 180 kaya resep. eh, tunggu. termometer oven gue mati sejak ludes bikin bakwan kemarin?'},
  {t0:TM.m[7], who:'GITA', stamp:'19.21', text:'oven boleh dicurigai, tapi takaran dicek duluan ya, rar. kalau angkanya salah, oven sebagus apa pun tetap gagal. resepnya minta 200 gram, bukan 20'},
  {t0:TM.m[8], who:'PUSAT', stamp:'19.24', kind:'photo', svg:'takaran', cap:'PAPAN TAKARAN ASLI: 200 GRAM RESEP, YANG DIPAKAI 20 GRAM'},
  {t0:TM.m[9], who:'KAMU', stamp:'19.26', text:'liat papan, kak rara: resep minta 200 gram, kamu pakai 20 gram. sepuluh kali lebih sedikit! makanya adonannya gak nempel apa-apa'},
  {t0:TM.m[10], who:'DIMAS', stamp:'19.28', text:'dan urutan langkah juga angka: langkah 1 lelehkan, 2 campur, 3 kocok, 4 tuang, 5 panggang. lompat satu langkah aja, hasilnya beda'},
  {t0:TM.m[11], who:'GITA', stamp:'19.29', text:'nah, di resep, angka kerja dua shift: mengukur takaran dan mengurutkan langkah. dua-duanya wajib tepat, gak boleh ketuker'},
  {t0:TM.m[12], who:'MANDA', stamp:'19.31', text:'berarti kalau gue mau bikin 8 porsi dari resep 4 porsi, tinggal dobel semua angkanya? 200 jadi 400, 2 telur jadi 4?'},
  {t0:TM.m[13], who:'PUSAT', stamp:'19.33', kind:'photo', svg:'dobel', cap:'PAPAN RESEP DOBEL: 4 PORSI JADI 8, SEMUA ANGKA DUA KALI LIPAT'},
  {t0:TM.m[14], who:'KAMU', stamp:'19.34', text:'betul, kak manda! dobel porsi artinya dobel semua takaran. gak boleh dobel satu, dobel lain gak. angka di resep itu satu tim'},
  {t0:TM.m[15], who:'RARA', stamp:'19.36', text:'oke, gue ngaku deh. takaran gue salah baca. dan bukan cuma itu: gue juga lompat langkah 3. makanya teksturnya hancur'},
  {t0:TM.m[16], who:'GITA', stamp:'19.37', kind:'sticker', stk:'JURUS RESEP TEPAT', stks:'takaran ditimbang · langkah diurut · porsi dihitung'},
  {t0:TM.m[17], who:'DIMAS', stamp:'19.38', text:'minggu depan kita praktik bareng. gue bawa timbangan, kak rara bawa kesabaran. semua angka gue cocokin dua kali'},
  {t0:TM.m[18], who:'RARA', stamp:'19.40', text:'HMPH, oke oke. gue ulang sekarang: 200 gram beneran, dan 5 langkah gak ada yang dilompati. kalau gagal lagi, gue pindah ke grup manda'},
  {t0:TM.m[19], who:'PUSAT', stamp:'19.44', text:'pertanyaan dapur: kalau resep 4 porsi mau dijadikan 12 porsi, 200 gram jadi berapa? dan mana yang lebih sering bikin gagal: salah takaran atau salah urutan?'},
  {t0:TM.m[20], who:'DIMAS', stamp:'19.46', text:'12 porsi berarti tiga kali lipat: 200 jadi 600 gram. gampangnya: porsi dilipat, takaran ikut dilipat'},
  {t0:TM.m[21], who:'GITA', stamp:'19.48', text:'dari 37 kegagalan yang tercatat di grup ini, paling sering penyebabnya salah takaran. yang salah urutan biasanya langsung ketahuan di langkah kedua. eh, gue catat juga: jam 7.40 kak rara kirim foto brownies baru, teksturnya udah cakep'},
  {t0:TM.m[22], who:'PUSAT', stamp:'19.52', kind:'photo', svg:'poll', cap:'VOTING DAPUR: 58% SALAH TAKARAN, 42% SALAH URUTAN'},
  {t0:TM.m[23], who:'PUSAT', stamp:'19.58', text:'voting ditutup: dua-duanya berbahaya, tapi salah takaran lebih sering jadi biang keroknya. besok: pecahan di dapur, 1/2 sendok teh. selamat mencoba, jangan lupa timbang!'}
];

/* divider bab gaya kartu waktu RP (bukan label pelajaran); jam nyambung
   dengan stempel chat malam dapur: 19.12 (papan resep) -> 19.20 (CEK
   TAKARAN) -> 19.24 (PAPAN TAKARAN) -> 19.33 (RESEP DOBEL) ->
   19.44 (VOTING DAPUR); waktu semua kartu dari TM (rev15, rev24) */
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
  row.className='msg'+(m.who==='KAMU'?' you':'')+(m.who==='PUSAT'?' myst':'');
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
   meme (rev14: ganti emoji comot), mata menyala saat kejutan, angka
   kunci naik pelan. Label waktu tetap dari DIVS (hukum kartu). ---------- */
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
    ['200','20','1'].forEach((c,j)=>{
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
  sub.textContent=['GRUP RESEP GAGAL','TAKARAN 200','LANGKAH 1-5',
    'DOBEL PORSI','VOTING DAPUR'][i];
  L.appendChild(sub);
  if(i===0){ /* rev18: kartu 0 diganti INTRO FILM (judul full-bleed) */
    L.style.display='none';
  }
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

/* ---------- tiga DIAGRAM MENYALA rev23: DERETAN KARTU NOMOR 1-10
   (angka pertama menyala), DUA BATANG voting cerah, DUA LAJUR peran
   angka - model visual BARU gaya GLOW v3; waktu slot dari TM.flash */
const FLASHES=[
  {t0:TM.flash[0][0],t1:TM.flash[0][1],kick:'ANGKA DAPUR',title:'TAKARAN + LANGKAH',en:'measure and order!',
   ruler:'boxes', boxStart:1, boxCount:5,
   lines:['200 gram dan 20 gram beda 10 kali lipat'],
   notes:['SATU NOL KELEWAT = GAGAL','LANGKAH 1-5 GAK BOLEH LOMPAT']},
  {t0:TM.flash[1][0],t1:TM.flash[1][1],kick:'PERTANYAAN DAPUR',title:'PENYEBAB GAGAL PALING SERING?',en:'what breaks recipes most?',
   ruler:'vote', voteA:0.58, voteLabelA:'SALAH TAKARAN', voteB:0.42, voteLabelB:'SALAH URUTAN',
   lines:['58% salah takaran · 42% salah urutan'],
   notes:['TAKARAN PALING SERING BIKIN GAGAL','LANGKAH LOMPAT LANGSUNG KETAHUAN']},
  {t0:TM.flash[2][0],t1:TM.flash[2][1],kick:'TWIST DAPUR',title:'PORSI DILIPAT · TAKARAN IKUT',en:'double servings, double numbers!',
   ruler:'duo', rulerA:'MENGUKUR: 200 GRAM (TAKARAN)', rulerB:'MENGURUTKAN: LANGKAH 1-5',
   lines:['porsi dilipat, takaran ikut: 4 lalu 8 lalu 12'],
   notes:['SEMUA ANGKA SATU TIM','BESOK: PECAHAN 1/2']}
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
/* DIAGRAM MENYALA rev24 (GLOW v3): tiga varian - boxes (deretan kartu
   langkah, jumlah sel dari konfigurasi, kartu pertama menyala gradien),
   vote (dua batang gradien, label+pct dari konfigurasi), duo (dua lajur
   takaran vs langkah) - diparameter dari FLASHES */
function mkRuler(f){
  const wrap=document.createElement('div');
  wrap.style.cssText+='display:flex;flex-direction:column;align-items:center;width:100%;gap:14px;';
  const bandW=ORIENT==='portrait'?Math.round(W*0.82):Math.round(W*0.58);
  if(f.ruler==='boxes'){
    const start=(typeof f.boxStart==='number')?f.boxStart:0;
    const n=(typeof f.boxCount==='number')?f.boxCount:10;
    const band=document.createElement('div');
    band.style.cssText+=`display:flex;gap:10px;width:${bandW}px;`;
    const cells=[];
    for(let i=0;i<n;i++){
      const c=document.createElement('div');
      const hi=i===0;
      c.style.cssText+=`flex:1;height:${ORIENT==='portrait'?100:80}px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:${ORIENT==='portrait'?42:36}px;`+
        (hi?'background:linear-gradient(135deg,#FF6B8A,#FFC94D);color:#FFFFFF;box-shadow:0 10px 26px rgba(255,110,120,.45);'
           :'background:rgba(255,255,255,.9);color:#43304F;')+
        `border:2px solid ${hi?'#FF6B8A':'#FFC94D'};opacity:0;`;
      c.textContent=start+i;
      band.appendChild(c);
      cells.push(c);
    }
    wrap.appendChild(band);
    return {wrap,cells,kind:'boxes'};
  }
  if(f.ruler==='vote'){
    const mk=(label,pct,ok)=>{
      const row=document.createElement('div');
      row.style.cssText+=`width:${bandW}px;display:flex;align-items:center;gap:18px;`;
      const lb=document.createElement('div');
      lb.style.cssText+=`font-size:${ORIENT==='portrait'?36:30}px;font-weight:800;color:#43304F;min-width:${ORIENT==='portrait'?250:220}px;`;
      lb.textContent=label;
      const band=document.createElement('div');
      band.className='rband';
      band.style.cssText+=`width:${bandW-(ORIENT==='portrait'?250:220)-18}px;`;
      const fill=document.createElement('div');
      fill.className='rfill';
      fill.style.cssText+=ok?'background:linear-gradient(90deg,#FF6B8A,#FF9E5E);':'background:linear-gradient(90deg,#4DD6A8,#5BA8F5);';
      band.appendChild(fill);
      const pv=document.createElement('div');
      pv.style.cssText+=`font-family:'JetBrains Mono','DejaVu Sans Mono',monospace;font-weight:800;font-size:${ORIENT==='portrait'?44:36}px;color:#E8506E;opacity:0;`;
      row.appendChild(lb);
      row.appendChild(band);
      row.appendChild(pv);
      wrap.appendChild(row);
      return {fill,pv,pct};
    };
    const A=mk(f.voteLabelA,f.voteA,true);
    const B=mk(f.voteLabelB,f.voteB,false);
    return {wrap,A,B,kind:'vote'};
  }
  /* duo: dua lajur takaran vs langkah */
  const mk=(label,col)=>{
    const row=document.createElement('div');
    row.style.cssText+=`width:${bandW}px;display:flex;flex-direction:column;gap:6px;`;
    const lb=document.createElement('div');
    lb.style.cssText+=`font-size:${ORIENT==='portrait'?34:28}px;font-weight:800;color:${col};`;
    lb.textContent=label;
    const band=document.createElement('div');
    band.className='rband';
    band.style.cssText+=`width:${bandW}px;`;
    const fill=document.createElement('div');
    fill.className='rfill';
    fill.style.cssText+=`background:${col};`;
    band.appendChild(fill);
    row.appendChild(lb);
    row.appendChild(band);
    wrap.appendChild(row);
    return {fill};
  };
  const A=mk(f.rulerA,'#FF9E5E');
  const B=mk(f.rulerB,'#B79CFF');
  return {wrap,A,B,kind:'duo'};
}
const FLASHBODY=FLASHES.map(f=>{
  const w=document.createElement('div');
  w.style.cssText+='display:none;flex-direction:column;align-items:center;gap:inherit;width:100%;';
  const R=mkRuler(f);
  w.appendChild(R.wrap);
  const lines=f.lines.map(tx=>{
    const ln=document.createElement('div');
    ln.className='fline';
    ln.style.cssText+=`font-size:${ORIENT==='portrait'?38:34}px;`;
    ln.innerHTML='<span class="dot"></span><span>'+tx+'</span>';
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
  return {w,R,lines,notes,f};
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

/* angka desimal naik pelan di latar babak hitungan (efek seru rev13) */
const RISES=[];
{
  const chars=['200','20','2x','1-5','400','1/2'];
  for(let i=0;i<chars.length;i++){
    const el=document.createElement('div');
    el.className='rise';
    el.style.cssText+=`font-size:${44+i*10}px;left:${Math.round(W*0.1+i*W*0.14)}px;top:${H-60}px;`;
    el.textContent=chars[i];
    burstEl.appendChild(el);
    RISES.push({el,ph:rnd()*6});
  }
}

/* ---------- overlay MISI (papan soal milik ???): empat soal utuh + kartu ---------- */
const quizEl=document.getElementById('quiz');
document.getElementById('qhd').style.fontSize=(ORIENT==='portrait'?46:40)+'px';
const SOAL=['RESEP 4 PORSI MAU JADI 8: 200 GRAM JADI BERAPA GRAM?','RESEP 2 TELUR MAU JADI 8 PORSI: BUTUH BERAPA TELUR?'];
const qrowsEl=document.getElementById('qrows');
const UJIS=SOAL.map((s,i)=>{
  const r=document.createElement('div');
  r.className='qrow';
  r.style.cssText+=`font-size:${ORIENT==='portrait'?40:34}px;margin-top:${ORIENT==='portrait'?10:6}px;`;
  r.innerHTML='<b>'+(i+1)+'.</b> '+s;
  qrowsEl.appendChild(r);
  return {el:r,t0:TM.quiz[0]+2.3+i*0.16};
});
const UJIVAL=['400','4','8','2','200','600','12','5'];
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
qnoteEl.textContent='KARTU BANTU DARI DAPUR PUSAT';
const qctaEl=document.getElementById('qcta');
qctaEl.style.cssText+=`top:${ORIENT==='portrait'?736:525}px;font-size:${ORIENT==='portrait'?42:38}px;`;

/* ---------- subtitle EN (aturan 8 + 18: proporsional, min 1.7 s);
   30 beat rev17 (pesan panjang dipecah dua) dari TM ---------- */
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

/* ---------- INTRO FILM rev18 (permintaan pemilik): buka ala produksi
   film profesional berkelas - kartu judul full-bleed (ilustrasi AI penuh
   layar + label GRUP RESEP GAGAL saja) lalu kartu produksi "dipersembahkan
   akiomida.com / kuasai matematika jadi lebih mudah..", baru cerita.
   Waktu slot dari TM.intro (timeline17rp.py) ---------- */
const I1=TM.intro[0], I2=TM.intro[1];
const intro1El=document.getElementById('intro1');
const introimg=document.getElementById('introimg');
const introtitleEl=document.getElementById('introtitle');
const introruleEl=document.getElementById('introrule');
introimg.src=MEME_IMGS[0];
introtitleEl.style.fontSize=(ORIENT==='portrait'?66:56)+'px';
const intro2El=document.getElementById('intro2');
const i2kick=document.getElementById('intro2kick');
const i2name=document.getElementById('intro2name');
const i2line=document.getElementById('intro2line');
const i2tag=document.getElementById('intro2tag');
const i2shim=document.getElementById('intro2shim');
i2kick.style.fontSize=(ORIENT==='portrait'?36:30)+'px';
i2name.style.fontSize=(ORIENT==='portrait'?92:76)+'px';
i2tag.style.fontSize=(ORIENT==='portrait'?46:38)+'px';
