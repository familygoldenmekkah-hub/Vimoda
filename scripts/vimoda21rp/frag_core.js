/* ---------- LARI PAGI (VIDEO 20): data & elemen format RP
   ---------- Dunia BARU ala RP Telegram/TikTok gen Z: grup chat
   "GRUP PANITIA LARI PAGI", chara OC bernama (LARA, DIN, RIKA, BAGAS,
   KAMU, akun resmi PANITIA PUSAT). HUKUM SERI: setiap episode dunianya
   diganti total (grup, anggota, avatar, setting) - tidak ada dunia yang
   diulang, dan tiap episode SKEMA alur + METODE ajarnya wajib baru.
   Sistem desain PAGI CERIA (otak/DESAIN-PAGI.md, perintah pemilik):
   latar krem hangat, bubble cerah, NOL panel gelap; produksi 9:16 SAJA.
   Episode ini PENERAPAN KEDUA Formula Dialog AKIOMIDA v1 (F1-F8,
   otak/BELAJAR-DIALOG.md). Bahan: BILANGAN ASLI (lanjutan teaser "naik
   kelas" video 19, dunia ganti total): kartu peserta 1-40, juara 1-2-3,
   nomor 13, dua peran (menghitung vs mengurutkan), tanpa bolong.
   Alur rev23 (semua hitungan terverifikasi kode): poster lari 05.12 ->
   BAGAS sombong juara 1 + cap nomor 13 sial (tolak, F4) -> RIKA cermin:
   13 itu urutan ke-13, ada 12 di depan 14 di belakang -> LARA: asli
   mulai dari 1, angka menghitung; nol gak termasuk -> BAGAS minta 13
   dibuang, ganti 41 (justifikasi F4) -> DIN: pelari tetep 40, urutan
   bolong di tengah (40 kartu - 1 label = 39) -> PAPAN PESERTA: satu
   nomor satu pelari -> RIKA: finis dicatat urutan datang (ordinal) ->
   LARA: dua peran bilangan asli -> PODIUM: juara 1, 2, 3, juara ke-0
   gak ada (beda dengan nol penumpang di cacah) -> stiker JURUS HITUNG
   ASLI -> BAGAS pakai 13 lagi (ngaku F4) -> PERTANYAAN PUSAT: asli
   habis di mana? kenapa juara mulai dari 1? -> DIN: setiap bilangan
   punya pengikut (40 -> 41), gak pernah putus -> RIKA: juara mulai 1
   karena gak ada urutan sebelum pertama + empati mencatat BAGAS ->
   VOTING 64/36 menghitung vs mengurutkan + teaser jumlah 1-100.
   Sapaan unik per chara (kak/bang/bu). ---------- */
const Q = new URLSearchParams(location.search);
const ORIENT = Q.get('o') === 'landscape' ? 'landscape' : 'portrait';
const W = ORIENT === 'portrait' ? 1080 : 1920;
const H = ORIENT === 'portrait' ? 1920 : 1080;

function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)|0;return((t^t>>>14)>>>0)/4294967296}}
const rnd = mulberry32(200601);
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
/* doodle latar: angka desimal melayang (bahasa visual materi) */
const DOODLES=[];
{
  const b=document.getElementById('bgdoodle');
  const chars=['40','13','1','41','2','3','1-40','1-2-3'];
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
    const cols=['#FF8787','#FFD43B','#63E6BE','#74C0FC'];
    const col=cols[i%4];
    d.style.cssText+=`left:${Math.round(rnd()*(W-80)+40)}px;top:${Math.round(rnd()*(H-220)+60)}px;width:${cd}px;height:${cd}px;background:${col};opacity:0;`;
    b.appendChild(d);
    DOODLES.push({el:d,ph:i*0.71,fs:cd,perm:true});
  }
}

/* ---------- cast RP dunia GRUP PANITIA LARI PAGI (chara OC bernama ala RP
   Telegram/TikTok gen Z; dunia video ini sendiri, tidak dibawa ulang).
   Avatar bulat dengan IKON SVG digambar custom per chara (rev14: bukan
   emoji comot); label pendek ala username. ---------- */
const CAST={
  LARA:{name:'BU LARA',bg:'radial-gradient(circle,#B197FC 58%,#845EF7)',col:'#7048E8'},
  DIN:{name:'DIN',bg:'radial-gradient(circle,#74C0FC 58%,#1C7ED6)',col:'#1971C2'},
  RIKA:{name:'RIKA',bg:'radial-gradient(circle,#FAB0C8 58%,#F06595)',col:'#D6336C'},
  BAGAS:{name:'BAGAS',bg:'radial-gradient(circle,#FFA8A8 58%,#FA5252)',col:'#E8590C'},
  KAMU:{name:'KAMU',bg:'radial-gradient(circle,#96F2D7 55%,#0CA678)',col:'#087F5B'},
  PUSAT:{name:'AKUN PANITIA PUSAT',bg:'radial-gradient(circle,#FFF3BF 40%,rgba(255,224,102,.15) 72%)',col:'#E67700'}
};
/* ikon avatar SVG custom (digambar, bukan emoji): peluit BU LARA, bendera
   start DIN, stopwatch RIKA, sepatu lari BAGAS, topi panitia KAMU,
   megafon PANITIA PUSAT */
const AVI={
  LARA:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<circle cx="17" cy="26" r="8" fill="#FFF9DB" stroke="#845EF7" stroke-width="2"/>'
    +'<circle cx="17" cy="26" r="3" fill="#845EF7"/>'
    +'<path d="M24 24 q12 -8 18 -4 q-6 6 -18 8 Z" fill="#FFD43B" stroke="#4A3728" stroke-width="1.4"/>'
    +'<circle cx="40" cy="18" r="2.4" fill="#E8590C"/></svg>',
  DIN:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<line x1="12" y1="6" x2="12" y2="42" stroke="#1C7ED6" stroke-width="3" stroke-linecap="round"/>'
    +'<path d="M12 8 h22 l-6 7 6 7 h-22 Z" fill="#FF8787" stroke="#4A3728" stroke-width="1.4"/>'
    +'<circle cx="36" cy="15" r="2" fill="#FFD43B"/></svg>',
  RIKA:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<circle cx="24" cy="26" r="13" fill="#FFF0F5" stroke="#F06595" stroke-width="2.4"/>'
    +'<circle cx="24" cy="26" r="8" fill="#FFFFFF" stroke="#F06595" stroke-width="1.6"/>'
    +'<line x1="24" y1="26" x2="24" y2="17" stroke="#F06595" stroke-width="2.2" stroke-linecap="round"/>'
    +'<line x1="24" y1="26" x2="30" y2="29" stroke="#E8590C" stroke-width="2.2" stroke-linecap="round"/>'
    +'<rect x="20" y="6" width="8" height="5" rx="2" fill="#F06595"/>'
    +'<rect x="21" y="4" width="6" height="3" rx="1.5" fill="#D6336C"/></svg>',
  BAGAS:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<path d="M10 34 q0 -10 10 -12 q10 -2 16 4 l6 6 q2 4 -3 4 h-26 q-3 0 -3 -2 Z" fill="#FFF0DE" stroke="#FA5252" stroke-width="2"/>'
    +'<path d="M10 34 q10 -6 24 -2" fill="none" stroke="#FA5252" stroke-width="2.2"/>'
    +'<line x1="14" y1="24" x2="20" y2="21" stroke="#FA5252" stroke-width="2.2" stroke-linecap="round"/>'
    +'<circle cx="38" cy="34" r="2.6" fill="#4A3728"/></svg>',
  KAMU:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<path d="M10 24 q14 -14 28 0 Z" fill="#FFFFFF" stroke="#0CA678" stroke-width="2"/>'
    +'<rect x="6" y="24" width="36" height="6" rx="3" fill="#0CA678"/>'
    +'<circle cx="24" cy="15" r="4" fill="#FFD43B"/>'
    +'<rect x="17" y="32" width="14" height="9" rx="3" fill="none" stroke="#0CA678" stroke-width="2.4"/>'
    +'<path d="M24 34 l2 3 -2 3 -2 -3 Z" fill="#FA5252"/></svg>',
  PUSAT:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<path d="M8 20 L30 10 q6 -2 6 4 v16 q0 6 -6 4 L8 26 Z" fill="#FFD43B" stroke="#4A3728" stroke-width="1.8"/>'
    +'<circle cx="36" cy="15" r="6" fill="#FFF3BF" stroke="#4A3728" stroke-width="1.8"/>'
    +'<path d="M14 26 q6 8 12 8" fill="none" stroke="#E8590C" stroke-width="2.4" stroke-linecap="round"/>'
    +'<rect x="12" y="34" width="10" height="5" rx="2.5" fill="#FA5252"/></svg>'
};

/* ---------- ilustrasi dunia VIDEO 20 (SVG foto chat, gaya PAGI CERIA:
   kertas krem + titik warna, NOL panel gelap). Empat foto "asli dari
   dunia GRUP PANITIA LARI PAGI": poster lari pagi (40 kartu peserta,
   start 06.00, catat juara 1-3), papan kartu peserta (grid 1-40, nomor
   13 ditandai, satu nomor satu pelari), papan podium (juara 1, 2, 3,
   slot juara ke-0 dicoret), dan hasil VOTING PANITIA (64% menghitung,
   36% mengurutkan, teaser jumlah 1-100). Semua deterministik. ---------- */
const PALS=['#FF8787','#FFD43B','#63E6BE','#74C0FC','#B197FC'];
function dot(cx,cy,r,col){return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+col+'"/>'}
function paper(){
  let s='<defs><linearGradient id="ktW" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#FFFDF6"/><stop offset="1" stop-color="#FFEFD2"/></linearGradient>';
  return s+'</defs><rect width="600" height="340" fill="url(#ktW)"/>';
}
function confetti(pts){
  let s='';
  pts.forEach(p=>{s+=dot(p[0],p[1],p[2],PALS[p[3]%5])});
  return s;
}
function svgPapan(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'+paper();
  s+=confetti([[118,26,3,0],[520,300,3.5,1],[44,300,2.6,2],[566,58,3,3],[300,30,2.2,4]]);
  s+='<rect x="60" y="34" width="480" height="272" rx="18" fill="#FFFFFF" stroke="#FFC078" stroke-width="3"/>';
  s+='<rect x="250" y="18" width="100" height="32" rx="9" fill="#FFD43B" stroke="#E8A80C" stroke-width="2.5"/>';
  s+='<text x="300" y="86" text-anchor="middle" font-size="30" font-weight="800" fill="#4A3728" letter-spacing="3">LARI PAGI MINGGU</text>';
  s+='<text x="300" y="118" text-anchor="middle" font-size="26" font-weight="800" fill="#E8590C">JAM 06.00 · LAPANG SEKOLAH</text>';
  const row=(y,txt,col)=>{
    let r='<rect x="92" y="'+y+'" width="416" height="44" rx="10" fill="#FFFDF6" stroke="#FFE3B8" stroke-width="2"/>';
    r+=dot(114,y+22,7,col);
    r+='<text x="134" y="'+(y+30)+'" font-size="24" font-weight="800" fill="#4A3728">'+txt+'</text>';
    return r;
  };
  s+=row(138,'CEK KARTU PESERTA 1-40','#FA5252')
   +row(190,'GARIS START SIAP JAM 05.30','#12B886')
   +row(242,'CATAT JUARA 1 SAMPAI 3','#E8590C');
  s+='<text x="300" y="318" text-anchor="middle" font-size="28" font-weight="600" fill="#B08450">@panitiapusat · poster lari pagi</text>';
  return s+'</svg>';
}
function svgPeserta(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'+paper();
  s+=confetti([[60,50,2.6,1],[556,60,3,0],[300,26,2.4,2],[70,290,2.6,3],[540,288,3,4]]);
  s+='<text x="300" y="52" text-anchor="middle" font-size="28" font-weight="800" fill="#E8590C">PAPAN KARTU PESERTA · 1-40</text>';
  for(let i=0;i<40;i++){
    const n=i+1, col=i%8, row=Math.floor(i/8);
    const x=66+col*59, y=72+row*40, sorot=(n===13);
    s+='<rect x="'+x+'" y="'+y+'" width="50" height="32" rx="8" fill="'+(sorot?'#FFE3E3':'#FFFFFF')+'" stroke="'+(sorot?'#FA5252':'#FFC078')+'" stroke-width="2"/>';
    s+='<text x="'+(x+25)+'" y="'+(y+24)+'" text-anchor="middle" font-size="24" font-weight="800" fill="'+(sorot?'#E8590C':'#4A3728')+'">'+n+'</text>';
  }
  s+='<rect x="120" y="272" width="360" height="44" rx="14" fill="#38D9A9" stroke="#12B886" stroke-width="2.5"/>'
   +'<text x="300" y="303" text-anchor="middle" font-size="25" font-weight="800" fill="#0B4A38">SATU NOMOR, SATU PELARI</text>';
  s+='<text x="418" y="114" font-size="24" font-weight="800" fill="#E8590C">13 aman!</text>';
  return s+'</svg>';
}
function svgPodium(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'+paper();
  s+=confetti([[80,56,3,0],[520,60,3,1],[300,28,2.4,2],[64,288,2.6,3],[548,286,3,4],[180,80,2.4,1],[430,80,2.4,0]]);
  s+='<text x="300" y="52" text-anchor="middle" font-size="28" font-weight="800" fill="#E8590C">PAPAN PODIUM · JUARA 1-2-3</text>';
  const blk=(x,y,w,h,n,fill,stroke,txtcol)=>{
    let r='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="10" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2.5"/>';
    r+='<text x="'+(x+w/2)+'" y="'+(y+h/2+14)+'" text-anchor="middle" font-size="40" font-weight="800" fill="'+txtcol+'">'+n+'</text>';
    return r;
  };
  s+=blk(96,190,120,80,'2','#E7F5FF','#74C0FC','#1971C2');
  s+=blk(240,150,120,120,'1','#FFF9DB','#FFD43B','#E8A80C');
  s+=blk(384,210,120,60,'3','#FFF0DE','#FF8787','#E8590C');
  s+='<rect x="504" y="222" width="72" height="48" rx="10" fill="none" stroke="#B0A494" stroke-width="2.5" stroke-dasharray="8 6"/>';
  s+='<text x="540" y="254" text-anchor="middle" font-size="30" font-weight="800" fill="#B0A494">0</text>';
  s+='<line x1="512" y1="230" x2="568" y2="262" stroke="#FA5252" stroke-width="3"/>';
  s+='<text x="300" y="316" text-anchor="middle" font-size="25" font-weight="800" fill="#4A3728">JUARA KE-0 GAK ADA · URUTAN MULAI DARI 1</text>';
  return s+'</svg>';
}
function svgPoll(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'+paper();
  s+=confetti([[70,60,3,0],[180,110,2.4,2],[330,60,3.4,1],[560,60,3,3],[60,200,2.6,4],[300,250,2.4,0],[540,250,3,2]]);
  s+='<rect x="70" y="30" width="460" height="52" rx="14" fill="#FFD43B"/>'
   +'<text x="300" y="65" text-anchor="middle" font-size="28" font-weight="800" fill="#4A3728" letter-spacing="2">VOTING PANITIA</text>';
  const bar=(y,label,pct,ok)=>{
    let r='<text x="106" y="'+(y+26)+'" font-size="25" font-weight="800" fill="#4A3728">'+label+'</text>';
    r+='<rect x="316" y="'+y+'" width="216" height="38" rx="12" fill="#FFF1DE" stroke="rgba(255,170,80,.8)" stroke-width="2"/>';
    r+='<rect x="316" y="'+y+'" width="'+Math.round(216*pct)+'" height="38" rx="12" fill="'+(ok?'#38D9A9':'#FF8787')+'" opacity=".9"/>';
    r+='<text x="'+(326+Math.round(216*pct))+'" y="'+(y+27)+'" font-size="24" font-weight="800" fill="'+(ok?'#0B6B52':'#C03434')+'">'+Math.round(pct*100)+'%</text>';
    return r;
  };
  s+=bar(108,'MENGHITUNG',0.64,true);
  s+=bar(164,'MENGURUTKAN',0.36,false);
  s+='<text x="300" y="242" text-anchor="middle" font-size="25" font-weight="700" fill="rgba(90,62,30,.8)">dua peran, satu keluarga angka</text>';
  s+='<g transform="rotate(-1 300 306)">'
   +'<rect x="100" y="284" width="400" height="44" rx="12" fill="#FFFFFF" stroke="#FFC078" stroke-width="2.5"/>'
   +'<text x="300" y="314" text-anchor="middle" font-size="24" font-weight="800" fill="#E8590C">BESOK: JUMLAH 1 SAMPAI 100</text></g>';
  return s+'</svg>';
}
const SVGS={papan:svgPapan,peserta:svgPeserta,podium:svgPodium,poll:svgPoll};
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

/* ---------- pesan RP VIDEO 20 (dunia GRUP PANITIA LARI PAGI):
   SKEMA (rev23): FORMULA DIALOG AKIOMIDA v1 (F1-F8,
   otak/BELAJAR-DIALOG.md). Kartu dunia (F2): lapang sekolah pagi,
   kartu peserta 1-40, garis start 05.30, start 06.00, podium juara
   1-2-3. Profil (F1): LARA ketua panitia tegas-hangat; DIN petugas
   garis start semangat; RIKA pencatat finis cepat-cakap; BAGAS peserta
   sombong takut nomor 13; KAMU panitia baru. Ledger plot (F6): konflik
   "nomor 13 sial, dibuang ganti 41" disentuh m1/m2/m6/m7/m9/m18,
   selesai m18-m21. Ledger fakta: kartu 1-40 = 40 pelari (40/40=1);
   buang 13 ganti 41 = 39 label berurutan + 1 nongol (urutan bolong);
   juara 1, 2, 3; juara ke-0 gak ada; 64+36=100; successor 40 -> 41.
   Arc tsun-dere (F4): BAGAS m1 tolak (13 sial) -> m6 justifikasi
   (buang aja) -> m18 ngaku (pakai 13 lagi). Empati (F8): RIKA mencatat
   momen BAGAS berubah hati. Cermin (F5): jawaban mengaitkan fakta
   lawan. Uji ganti-dunia (F7): semua pesan lintasan-spesifik. Angka
   terverifikasi kode: 1-40=40; 40-1=39; 64+36=100; 40+1=41.
   rev14-22 tetap: sopan, nol emoji, stempel nyambung kartu babak, voice acting 6 chara, timeline satu sumber, intro film, quiz 2 soal. ---------- */
const MSGS=[
  {t0:TM.m[0], who:'PUSAT', stamp:'05.12', kind:'photo', svg:'papan', cap:'LARI PAGI MINGGU: 40 KARTU PESERTA, NOMOR 1 SAMPAI 40'},
  {t0:TM.m[1], who:'BAGAS', stamp:'05.13', text:'*pasang nomor dada* nomor 13 ya, kak. kata orang sial banget. tapi gak usah drama, aku tetep juara 1. yang lain mah rebutan posisi 2 sama 3 aja'},
  {t0:TM.m[2], who:'RIKA', stamp:'05.14', text:'kasihan nomor 13, bang bagas, baru nempel langsung dicap sial. di lembar finis, 13 itu cuma urutan ke-13: ada 12 di depannya, 14 di belakangnya. aman'},
  {t0:TM.m[3], who:'KAMU', stamp:'05.15', text:'bener, kak rika. nomor peserta itu bilangan asli: 1, 2, 3, terus naik sampai 40. gak ada yang loncat, gak ada yang sial'},
  {t0:TM.m[4], who:'LARA', stamp:'05.17', text:'asli ya, bukan cacah. bilangan asli mulai dari 1: angka untuk menghitung. nol gak termasuk, karena nol artinya belum ada yang dihitung'},
  {t0:TM.m[5], who:'KAMU', stamp:'05.18', text:'berarti kartu peserta kita 1 sampai 40, bu lara? empat puluh kartu buat empat puluh pelari'},
  {t0:TM.m[6], who:'BAGAS', stamp:'05.20', text:'HMPH, buang aja nomor 13-nya, kak! ganti jadi 41. jadi jumlahnya tetep 40 kartu, tapi gak ada yang sial. untung-untungan'},
  {t0:TM.m[7], who:'DIN', stamp:'05.21', text:'eh, gak boleh gitu, bang. kalau 13 dibuang, kartu tinggal 39 label: 1 sampai 12, lalu 14 sampai 41. pelari tetep 40, tapi urutannya bolong di tengah'},
  {t0:TM.m[8], who:'PUSAT', stamp:'05.24', kind:'photo', svg:'peserta', cap:'PAPAN KARTU PESERTA: 1 SAMPAI 40, NOMOR 13 DITANDAI'},
  {t0:TM.m[9], who:'KAMU', stamp:'05.26', text:'liat papan, bang bagas: tiap pelari satu nomor, nggak bolong. 13 tetep 13. kalau digeser-geser, catatan finis malah gak nyambung'},
  {t0:TM.m[10], who:'RIKA', stamp:'05.28', text:'di lembar finis juga: yang dicatat itu urutan datangnya. pelari pertama datang = juara 1, kedua = juara 2, ketiga = juara 3. itu bilangan asli juga, tapi perannya mengurutkan'},
  {t0:TM.m[11], who:'LARA', stamp:'05.29', text:'nah, dua peran bilangan asli: menghitung banyaknya, 40 pelari. dan mengurutkan, juara ke-1, ke-2, ke-3. angkanya sama, perannya beda'},
  {t0:TM.m[12], who:'DIN', stamp:'05.31', text:'*pasang bendera di garis start* dari sononya start selalu nomor 1 dulu: pelari nomor 1 di lajur 1, nomor 2 di lajur 2. kaya hitung kelas: satu, dua, tiga, jalan!'},
  {t0:TM.m[13], who:'PUSAT', stamp:'05.33', kind:'photo', svg:'podium', cap:'PAPAN PODIUM: JUARA 1, 2, 3. JUARA KE-0 TIDAK ADA'},
  {t0:TM.m[14], who:'KAMU', stamp:'05.34', text:'ini bedanya sama tugas kemarin, ya: penumpang nol boleh ada, tapi juara nol gak ada. nol sah di cacah, bilangan asli memang mulai dari 1'},
  {t0:TM.m[15], who:'RIKA', stamp:'05.36', text:'finis nol orang juga boleh: artinya belum ada yang sampai. tapi begitu ada yang datang, dia langsung juara 1, bukan juara 0'},
  {t0:TM.m[16], who:'LARA', stamp:'05.38', text:'40 kartu, 40 pelari, satu nomor satu orang. kalau daftar nambah jadi 41 orang, kartu ke-41 pun siap dicetak. bilangan asli gak pernah habis: selalu ada berikutnya'},
  {t0:TM.m[17], who:'RIKA', stamp:'05.39', kind:'sticker', stk:'JURUS HITUNG ASLI', stks:'menghitung 1-40 · mengurutkan juara 1-2-3 · tanpa bolong'},
  {t0:TM.m[18], who:'BAGAS', stamp:'05.40', text:'*pegang kartu 13 di dada* HMPH. oke, oke. nomor 13 tetep gue pakai. tapi tetep, juara 1 punya gue. nomor sial mah cuma omongan orang aja'},
  {t0:TM.m[19], who:'PUSAT', stamp:'05.44', text:'pertanyaan panitia: kalau pelari baru daftar, dia dapat kartu nomor 41. bilangan asli itu habis di mana? dan kenapa juara mulai dari 1, bukan dari 0?'},
  {t0:TM.m[20], who:'DIN', stamp:'05.46', text:'gak habis, kak. 41, 42, 43, terus naik. setiap bilangan asli punya pengikut: setelah 1 ada 2, setelah 40 ada 41. urutannya gak pernah putus'},
  {t0:TM.m[21], who:'RIKA', stamp:'05.48', text:'dan juara mulai dari 1 karena mengurutkan itu butuh yang datang duluan. yang pertama datang itu juara 1. juara ke-0 gak punya makna: gak ada urutan sebelum pertama. eh, gue catat juga: jam 5.40 bang bagas akhirnya pakai nomor 13'},
  {t0:TM.m[22], who:'PUSAT', stamp:'05.52', kind:'photo', svg:'poll', cap:'VOTING PANITIA: 64% MENGHITUNG, 36% MENGURUTKAN'},
  {t0:TM.m[23], who:'PUSAT', stamp:'05.58', text:'voting ditutup: dua peran, satu keluarga angka. besok malam: jumlah 1 sampai 100, ada jalan pintasnya. salam satu lintasan, anak-anak'}
];

/* divider bab gaya kartu waktu RP (bukan label pelajaran); jam nyambung
   dengan stempel chat pagi hari: 05.12 (poster) -> 05.20 (GARIS
   START) -> 05.24 (PAPAN PESERTA) -> 05.33 (PODIUM JUARA) ->
   05.44 (VOTING PUSAT); waktu semua kartu dari TM (rev15, rev23) */
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
    ['40','13','1'].forEach((c,j)=>{
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
  sub.textContent=['GRUP PANITIA LARI PAGI','KARTU 1-40','JUARA 1-2-3',
    'NOMOR 13 TETEP ADA','VOTING PUSAT'][i];
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
   angka - model visual BARU gaya PAGI CERIA; waktu slot dari TM.flash */
const FLASHES=[
  {t0:TM.flash[0][0],t1:TM.flash[0][1],kick:'ANGKA MENGHITUNG',title:'ASLI: 1, 2, 3, TERUS',en:'counting starts at one!',
   ruler:'boxes', boxStart:1,
   lines:['40 pelari, 40 kartu: satu nomor satu orang'],
   notes:['GAK ADA JUARA KE-0','URUTAN GAK BOLEH BOLONG']},
  {t0:TM.flash[1][0],t1:TM.flash[1][1],kick:'PERTANYAAN PUSAT',title:'MENGHITUNG ATAU MENGURUTKAN?',en:'count or order? both!',
   ruler:'vote', voteA:0.64, voteLabelA:'MENGHITUNG', voteB:0.36, voteLabelB:'MENGURUTKAN',
   lines:['64% bilang menghitung · 36% mengurutkan'],
   notes:['DUA PERAN, SATU KELUARGA ANGKA','JUARA KE-0 GAK ADA']},
  {t0:TM.flash[2][0],t1:TM.flash[2][1],kick:'TWIST PAGI ITU',title:'ANGKA SAMA · PERAN BEDA',en:'same numbers, different jobs!',
   ruler:'duo', rulerA:'MENGHITUNG: 40 PELARI (BANYAK)', rulerB:'MENGURUTKAN: JUARA KE-1, KE-2, KE-3',
   lines:['setiap bilangan asli punya pengikut: 40 lalu 41'],
   notes:['URUTAN GAK PERNAH PUTUS','BESOK: JUMLAH 1 SAMPAI 100']}
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
/* DIAGRAM MENYALA rev23 (PAGI CERIA): tiga varian - boxes (deretan kartu
   nomor, angka awal dari konfigurasi, nomor pertama menyala coral), vote
   (dua batang cerah, label+pct dari konfigurasi), duo (dua lajur menghitung
   vs mengurutkan) - diparameter dari FLASHES */
function mkRuler(f){
  const wrap=document.createElement('div');
  wrap.style.cssText+='display:flex;flex-direction:column;align-items:center;width:100%;gap:14px;';
  const bandW=ORIENT==='portrait'?Math.round(W*0.82):Math.round(W*0.58);
  if(f.ruler==='boxes'){
    const start=(typeof f.boxStart==='number')?f.boxStart:0;
    const band=document.createElement('div');
    band.style.cssText+=`display:flex;gap:8px;width:${bandW}px;`;
    const cells=[];
    for(let i=0;i<10;i++){
      const c=document.createElement('div');
      c.style.cssText+=`flex:1;height:${ORIENT==='portrait'?96:78}px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:${ORIENT==='portrait'?40:34}px;background:${i===0?'#FF8787':'#FFFFFF'};color:${i===0?'#FFFFFF':'#4A3728'};border:2px solid ${i===0?'#FA5252':'#FFC078'};opacity:0;`;
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
      lb.style.cssText+=`font-size:${ORIENT==='portrait'?36:30}px;font-weight:800;color:#4A3728;min-width:${ORIENT==='portrait'?250:220}px;`;
      lb.textContent=label;
      const band=document.createElement('div');
      band.className='rband';
      band.style.cssText+=`width:${bandW-(ORIENT==='portrait'?250:220)-18}px;`;
      const fill=document.createElement('div');
      fill.className='rfill';
      fill.style.cssText+=ok?'background:linear-gradient(90deg,#38D9A9,#12B886);':'background:linear-gradient(90deg,#FF8787,#FA5252);';
      band.appendChild(fill);
      const pv=document.createElement('div');
      pv.style.cssText+=`font-family:'JetBrains Mono','DejaVu Sans Mono',monospace;font-weight:800;font-size:${ORIENT==='portrait'?44:36}px;color:#E8590C;opacity:0;`;
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
  /* duo: dua lajur menghitung vs mengurutkan */
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
  const A=mk(f.rulerA,'#FFC078');
  const B=mk(f.rulerB,'#B197FC');
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
    ln.innerHTML='<span class="dot" style="background:#38D9A9"></span><span>'+tx+'</span>';
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
  const chars=['40','41','1','13','1-40','1-2-3'];
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
const SOAL=['40 PELARI DARI NOMOR 1, YANG TERAKHIR NOMOR BERAPA?','SETELAH 40 ADA BILANGAN BERAPA?'];
const qrowsEl=document.getElementById('qrows');
const UJIS=SOAL.map((s,i)=>{
  const r=document.createElement('div');
  r.className='qrow';
  r.style.cssText+=`font-size:${ORIENT==='portrait'?40:34}px;margin-top:${ORIENT==='portrait'?10:6}px;`;
  r.innerHTML='<b>'+(i+1)+'.</b> '+s;
  qrowsEl.appendChild(r);
  return {el:r,t0:TM.quiz[0]+2.3+i*0.16};
});
const UJIVAL=['40','41','39','13','1','2','3','14'];
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
qnoteEl.textContent='KARTU BANTU DARI PANITIA PUSAT';
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
   layar + label GRUP PANITIA LARI PAGI saja) lalu kartu produksi "dipersembahkan
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
