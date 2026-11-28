/* ---------- TERMINAL JAM 3 (VIDEO 19): data & elemen format RP
   ---------- Dunia BARU ala RP Telegram/TikTok gen Z: grup chat
   "GRUP JAGA TERMINAL", chara OC bernama (MELI, BAYU, HAZ, OM DARI,
   KAMU, akun resmi TERMINAL PUSAT). HUKUM SERI: setiap episode dunianya
   diganti total (grup, anggota, avatar, setting) - tidak ada dunia yang
   diulang, dan tiap episode SKEMA alur + METODE ajarnya wajib baru
   (rev19). Episode ini PENERAPAN PERTAMA Formula Dialog AKIOMIDA v1
   (otak/BELAJAR-DIALOG.md): F1 kartu persona, F2 kartu sistem dunia,
   F3 aksi berkelindan ucapan, F4 arc tsun-dere (BAYU: tolak ->
   justifikasi -> ngaku), F5 tanya-jawab-cermin, F6 memori dua cabang,
   F7 situasi-respons (uji ganti-dunia), F8 momen empati sebelum penutup.
   Bahan: bilangan cacah (lanjutan teaser rak cacah video 18, dunia
   ganti total): karcis 1-30, garasi 0-9, unit utuh.
   Alur rev22 (semua hitungan terverifikasi kode): papan dinas 02.58 ->
   BAYU sombong unit 09, nol bukan garasi -> MELI: karcis 1-30 = 30
   penumpang -> 30 karcis / 3 unit = 10 penumpang per unit; garasi 0-9
   = 10 nomor (nol ikut dihitung) vs buku lama mulai dari 1 (9 baris)
   -> monitor karcis-vs-unit -> OM DARI saksi sejarah (dulu garasi 0
   belum ada) -> garasi 7 kosong isi nol unit (nol sah, bukan musnah)
   -> HAZ 30 tahun salah panggil garasi 0 (nomor itu aturan, posisi
   kenyataan) -> stiker JURUS HITUNG UTUH -> BAYU ngaku (garasi nol
   juga keluarga) -> PERTANYAAN PUSAT: cacah mulai dari 0 atau 1?
   -> jawaban: dua-duanya sah tergantung buku, satu lembar satu aturan,
   hasil hitung gak ikut selera -> POLLING 61/39 + teaser bilangan asli.
   Sapaan unik per chara (nak/bang/om). ---------- */
const Q = new URLSearchParams(location.search);
const ORIENT = Q.get('o') === 'landscape' ? 'landscape' : 'portrait';
const W = ORIENT === 'portrait' ? 1080 : 1920;
const H = ORIENT === 'portrait' ? 1920 : 1080;

function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)|0;return((t^t>>>14)>>>0)/4294967296}}
const rnd = mulberry32(191203);
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
  const chars=['30','10','0','3','5','9','1-30','0-9'];
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

/* ---------- cast RP dunia GRUP JAGA TERMINAL (chara OC bernama ala RP
   Telegram/TikTok gen Z; dunia video ini sendiri, tidak dibawa ulang).
   Avatar bulat dengan IKON SVG digambar custom per chara (rev14: bukan
   emoji comot); label pendek ala username. ---------- */
const CAST={
  MELI:{name:'MELI',bg:'radial-gradient(circle,#F26D6D 58%,#D93A5A)',col:'#FFB3B3'},
  BAYU:{name:'BAYU',bg:'radial-gradient(circle,#4CAF7A 58%,#2E7D5B)',col:'#A8E6C3'},
  HAZ:{name:'PAK HAZ',bg:'radial-gradient(circle,#8E7CD8 55%,#6A5ACD)',col:'#D9C6FF'},
  OMDARI:{name:'OM DARI',bg:'radial-gradient(circle,#4A6FA5 58%,#2C4A73)',col:'#AFCBE8'},
  KAMU:{name:'KAMU',bg:'radial-gradient(circle,#C9556B 55%,#A6394B)',col:'#D9C6FF'},
  PUSAT:{name:'AKUN TERMINAL PUSAT',bg:'radial-gradient(circle,#FFE9A8 40%,rgba(255,233,168,.12) 72%)',col:'#FFE9A8'}
};
/* ikon avatar SVG custom (digambar, bukan emoji): gulungan karcis MELI,
   roda kemudi 09 BAYU, kunci garasi HAZ, buku lama OM DARI, topi jaga
   KAMU, lampu terminal PUSAT */
const AVI={
  MELI:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<rect x="12" y="8" width="24" height="10" rx="4" fill="#F26D6D" stroke="#14100C" stroke-width="1.6"/>'
    +'<path d="M12 18 h24 v22 h-24 Z" fill="#FFF6E8" stroke="#14100C" stroke-width="1.6"/>'
    +'<path d="M12 40 l4 -3 4 3 4 -3 4 3 4 -3 4 3" fill="none" stroke="#14100C" stroke-width="1.6"/>'
    +'<line x1="16" y1="25" x2="32" y2="25" stroke="#D93A5A" stroke-width="2.4" stroke-linecap="round"/>'
    +'<line x1="16" y1="31" x2="28" y2="31" stroke="#D93A5A" stroke-width="2.4" stroke-linecap="round"/>'
    +'<circle cx="24" cy="13" r="2.5" fill="#FFF6E8"/></svg>',
  BAYU:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<circle cx="24" cy="24" r="15" fill="none" stroke="#FFF6E8" stroke-width="3"/>'
    +'<circle cx="24" cy="24" r="4.5" fill="#4CAF7A"/>'
    +'<line x1="24" y1="9" x2="24" y2="19.5" stroke="#FFF6E8" stroke-width="2.6"/>'
    +'<line x1="24" y1="28.5" x2="24" y2="39" stroke="#FFF6E8" stroke-width="2.6"/>'
    +'<line x1="9.5" y1="17" x2="19.8" y2="22" stroke="#FFF6E8" stroke-width="2.6"/>'
    +'<line x1="28.2" y1="26" x2="38.5" y2="31" stroke="#FFF6E8" stroke-width="2.6"/>'
    +'<rect x="30" y="4" width="14" height="9" rx="3" fill="#14100C"/>'
    +'<rect x="32" y="6" width="4" height="5" rx="1.5" fill="#F7C948"/>'
    +'<rect x="38" y="6" width="4" height="5" rx="1.5" fill="#F7C948"/></svg>',
  HAZ:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<circle cx="15" cy="24" r="8.5" fill="none" stroke="#FFF6E8" stroke-width="3"/>'
    +'<circle cx="15" cy="24" r="3" fill="#F7C948"/>'
    +'<rect x="23.5" y="21.5" width="17" height="5" rx="2.5" fill="#FFF6E8"/>'
    +'<rect x="33" y="26.5" width="4" height="5" rx="1.5" fill="#F7C948"/>'
    +'<rect x="38" y="26.5" width="2.5" height="4" rx="1.2" fill="#F7C948"/></svg>',
  OMDARI:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<path d="M8 14 q8 -4 16 0 q8 -4 16 0 v22 q-8 -4 -16 0 q-8 -4 -16 0 Z" fill="#FFF6E8" stroke="#14100C" stroke-width="1.8"/>'
    +'<line x1="24" y1="14" x2="24" y2="36" stroke="#14100C" stroke-width="2"/>'
    +'<line x1="12" y1="21" x2="20" y2="21" stroke="#4A6FA5" stroke-width="2.2" stroke-linecap="round"/>'
    +'<line x1="12" y1="26" x2="20" y2="26" stroke="#4A6FA5" stroke-width="2.2" stroke-linecap="round"/>'
    +'<line x1="28" y1="21" x2="36" y2="21" stroke="#4A6FA5" stroke-width="2.2" stroke-linecap="round"/>'
    +'<circle cx="38" cy="36" r="5.5" fill="rgba(247,201,72,.4)"/>'
    +'<circle cx="38" cy="36" r="2.2" fill="#F7C948"/></svg>',
  KAMU:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<path d="M10 26 q14 -16 28 0 Z" fill="#FFF6E8" stroke="#14100C" stroke-width="1.8"/>'
    +'<rect x="6" y="26" width="36" height="6" rx="3" fill="#A6394B"/>'
    +'<circle cx="24" cy="17" r="4" fill="#F7C948"/>'
    +'<rect x="18" y="34" width="12" height="8" rx="3" fill="none" stroke="#FFF6E8" stroke-width="2.4"/>'
    +'<path d="M24 36 l2 3 -2 3 -2 -3 Z" fill="#F7C948"/></svg>',
  PUSAT:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<line x1="24" y1="3" x2="24" y2="10" stroke="#FFF6E8" stroke-width="2.4"/>'
    +'<path d="M12 22 L18 10 H30 L36 22 Z" fill="#F7C948" stroke="#14100C" stroke-width="1.6"/>'
    +'<circle cx="24" cy="27" r="6.5" fill="#FFF3C4" stroke="#14100C" stroke-width="1.6"/>'
    +'<circle cx="24" cy="27" r="12" fill="rgba(247,201,72,.22)"/>'
    +'<rect x="20" y="40" width="8" height="4" rx="2" fill="#E8B32E"/></svg>'
};

/* ---------- ilustrasi dunia VIDEO 19 (SVG foto chat, digambar serius)
   Empat foto "asli dari dunia GRUP JAGA TERMINAL": papan dinas dini hari
   (cek unit, karcis urut, unit tak boleh setengah, stempel 02.58), monitor
   dinas karcis-vs-unit (30 karcis, 10 garasi, 3 unit berangkat), laporan
   garasi (10 kotak 0-9, nomor 7 kosong isi NOL UNIT), dan hasil VOTING
   DINI HARI dari TERMINAL PUSAT (61% mulai 0, 39% mulai 1, teaser
   bilangan asli). Semua deterministik. ---------- */
const PALS=['#F26D6D','#F7C948','#8E7CD8','#4CAF7A'];
function dot(cx,cy,r,col){return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+col+'"/>'}
function svgPapan(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="ktR" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#33203E"/><stop offset="1" stop-color="#1D1230"/></linearGradient></defs>'
   +'<rect width="600" height="340" fill="url(#ktR)"/>';
  [[120,20,1.6],[520,300,1.6],[40,300,1.4],[570,60,1.5]].forEach(p=>{s+=dot(p[0],p[1],p[2],'rgba(255,246,232,.45)')});
  /* papan klip tantangan harian */
  s+='<rect x="60" y="34" width="480" height="272" rx="18" fill="#EFE3C8" stroke="#C8B088" stroke-width="3"/>';
  s+='<rect x="250" y="18" width="100" height="32" rx="9" fill="#8A6A46" stroke="#5C4428" stroke-width="2.5"/>';
  s+='<text x="300" y="86" text-anchor="middle" font-size="30" font-weight="800" fill="#3A2C1E" letter-spacing="3">TERMINAL JAM 3</text>';
  s+='<text x="300" y="118" text-anchor="middle" font-size="26" font-weight="800" fill="#A6394B">DINAS DINI HARI · JAM 02.58</text>';
  const row=(y,txt,hot)=>{
    let r='<rect x="92" y="'+y+'" width="416" height="44" rx="10" fill="#FFFDF6" stroke="#D8C8A4" stroke-width="2"/>';
    r+=dot(114,y+22,7,hot?'#A6394B':'#4CAF7A');
    r+='<text x="134" y="'+(y+30)+'" font-size="24" font-weight="800" fill="'+(hot?'#A6394B':'#3A2C1E')+'">'+txt+'</text>';
    return r;
  };
  s+=row(138,'CEK UNIT DI GARASI 0-9',true)
   +row(190,'KARCIS WAJIB URUT 1-30',false)
   +row(242,'UNIT TAK BOLEH SETENGAH',true);
  s+='<text x="300" y="318" text-anchor="middle" font-size="28" font-weight="600" fill="#8A6A46">@terminalpusat · papan dinas dini hari</text>';
  return s+'</svg>';
}
function svgMonitor(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="ktM" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#101A26"/><stop offset="1" stop-color="#0B1220"/></linearGradient></defs>'
   +'<rect width="600" height="340" fill="url(#ktM)"/>';
  [[80,50,1.6],[560,60,1.5],[300,30,1.3],[70,280,1.4],[540,280,1.6]].forEach(p=>{s+=dot(p[0],p[1],p[2],'rgba(255,246,232,.4)')});
  s+='<text x="300" y="56" text-anchor="middle" font-size="28" font-weight="800" fill="#F2C14E">MONITOR DINAS · TERMINAL</text>';
  const stat=(x,label,num,col)=>{
    let r='<rect x="'+x+'" y="84" width="140" height="120" rx="14" fill="#0A0F1C" stroke="rgba(185,166,255,.5)" stroke-width="2"/>';
    r+='<text x="'+(x+70)+'" y="118" text-anchor="middle" font-size="26" font-weight="800" fill="#FFF6E8">'+label+'</text>';
    r+='<text x="'+(x+70)+'" y="172" text-anchor="middle" font-family="JetBrains Mono, DejaVu Sans Mono, monospace" font-size="46" font-weight="800" fill="'+col+'">'+num+'</text>';
    return r;
  };
  s+=stat(96,'KARCIS 1-30','30','#4CAF7A');
  s+=stat(230,'GARASI 0-9','10','#B9A6FF');
  s+=stat(364,'UNIT JALAN','3','#F2C14E');
  s+='<rect x="96" y="228" width="408" height="46" rx="14" fill="#4CAF7A" stroke="#2E7D5B" stroke-width="2.5"/>'
   +'<text x="300" y="260" text-anchor="middle" font-size="25" font-weight="800" fill="#10331F">30 KARCIS / 3 UNIT = 10 PENUMPANG</text>';
  s+='<text x="300" y="314" text-anchor="middle" font-size="27" font-weight="600" fill="#8A9BB5">@terminalpusat · sinkron karcis-unit</text>';
  return s+'</svg>';
}
function svgGarasi(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="ktG" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#1B1440"/><stop offset="1" stop-color="#120C2A"/></linearGradient></defs>'
   +'<rect width="600" height="340" fill="url(#ktG)"/>';
  [[60,50,1.5],[560,60,1.6],[300,28,1.3],[80,290,1.4],[540,290,1.5]].forEach(p=>{s+=dot(p[0],p[1],p[2],'rgba(255,246,232,.5)')});
  s+='<text x="300" y="54" text-anchor="middle" font-size="28" font-weight="800" fill="#F2C14E">LAPORAN GARASI · NOMOR 0-9</text>';
  for(let i=0;i<10;i++){
    const x=62+i*49, kosong=(i===7);
    s+='<rect x="'+x+'" y="80" width="40" height="64" rx="8" fill="'+(kosong?'#1A1030':'#241A3E')+'" stroke="'+(kosong?'#D93A5A':'#E8B32E')+'" stroke-width="2"/>';
    s+='<text x="'+(x+20)+'" y="122" text-anchor="middle" font-size="26" font-weight="800" fill="'+(kosong?'#FFB3B3':'#F2C14E')+'">'+i+'</text>';
    if(kosong){ s+='<circle cx="'+(x+20)+'" cy="92" r="4" fill="#D93A5A"/>'; }
  }
  s+='<rect x="120" y="176" width="360" height="44" rx="14" fill="#4CAF7A" stroke="#2E7D5B" stroke-width="2.5"/>'
   +'<text x="300" y="207" text-anchor="middle" font-size="25" font-weight="800" fill="#10331F">NOMOR 7 KOSONG: ISI NOL UNIT</text>';
  s+='<text x="300" y="252" text-anchor="middle" font-size="25" font-weight="700" fill="rgba(255,246,232,.78)">garasi 7 tetep garasi sah, bukan ilang</text>';
  s+='<g transform="rotate(-1 300 306)">'
   +'<rect x="100" y="284" width="400" height="44" rx="12" fill="#241A3E" stroke="#E8B32E" stroke-width="2.5"/>'
   +'<text x="300" y="314" text-anchor="middle" font-size="24" font-weight="800" fill="#F2C14E">NOL ITU ANGKA SAH</text></g>';
  return s+'</svg>';
}
function svgPoll(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="ktP" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#1B1440"/><stop offset="1" stop-color="#120C2A"/></linearGradient></defs>'
   +'<rect width="600" height="340" fill="url(#ktP)"/>';
  [[70,60,1.6],[180,110,1.4],[330,60,1.8],[560,60,1.5],[60,200,1.4],[300,250,1.3],[540,250,1.6]].forEach(p=>{s+=dot(p[0],p[1],p[2],'rgba(255,246,232,.5)')});
  s+='<rect x="70" y="30" width="460" height="52" rx="14" fill="#E8B32E"/>'
   +'<text x="300" y="65" text-anchor="middle" font-size="28" font-weight="800" fill="#14100C" letter-spacing="2">VOTING DINI HARI</text>';
  const bar=(y,label,pct,ok)=>{
    let r='<text x="106" y="'+(y+26)+'" font-size="25" font-weight="800" fill="#FFF6E8">'+label+'</text>';
    r+='<rect x="236" y="'+y+'" width="296" height="38" rx="12" fill="rgba(255,246,232,.10)" stroke="rgba(255,246,232,.25)" stroke-width="2"/>';
    r+='<rect x="236" y="'+y+'" width="'+Math.round(296*pct)+'" height="38" rx="12" fill="'+(ok?'#4CAF7A':'#D93A5A')+'" opacity=".85"/>';
    r+='<text x="'+(246+Math.round(296*pct)+14)+'" y="'+(y+27)+'" font-size="24" font-weight="800" fill="#FFF6E8">'+Math.round(pct*100)+'%</text>';
    return r;
  };
  s+=bar(108,'DARI 0',0.61,true);
  s+=bar(164,'DARI 1',0.39,false);
  s+='<text x="300" y="242" text-anchor="middle" font-size="25" font-weight="700" fill="rgba(255,246,232,.75)">dua-duanya sah, satu lembar satu aturan</text>';
  s+='<g transform="rotate(-1 300 306)">'
   +'<rect x="100" y="284" width="400" height="44" rx="12" fill="#241A3E" stroke="#E8B32E" stroke-width="2.5"/>'
   +'<text x="300" y="314" text-anchor="middle" font-size="24" font-weight="800" fill="#F2C14E">BESOK: BILANGAN ASLI</text></g>';
  return s+'</svg>';
}
const SVGS={papan:svgPapan,monitor:svgMonitor,garasi:svgGarasi,poll:svgPoll};
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

/* ---------- pesan RP VIDEO 19 (dunia GRUP JAGA TERMINAL, chara OC):
   SKEMA BARU (rev22): DITULIS DENGAN FORMULA DIALOG AKIOMIDA v1 (F1-F8,
   otak/BELAJAR-DIALOG.md). Kartu dunia (F2): terminal tipe B dini hari,
   garasi bernomor 0-9, karcis bernomor 1-30, unit utuh. Profil (F1):
   HAZ juragan garasi 30 tahun; MELI petugas karcis cepat-cakap; BAYU
   sopir unit 09 sombong; OM DARI satpam senior saksi sejarah; KAMU
   penjaga baru. Ledger plot (F6): konflik "nol dihitung atau tidak"
   disentuh m4/m6/m9/m14/m16, selesai di twist m19-m21. Ledger fakta:
   10 garasi (0-9), 30 karcis (1-30), 3 unit (nomor 3, 5, 9), 10
   penumpang per unit (30/3), garasi 7 nol unit, 61+39=100. Arc
   tsun-dere (F4): BAYU m1 tolak -> m6 justifikasi -> m18 ngaku.
   Empati (F8): MELI mencatat momen bayu berubah hati. Cermin (F5):
   jawaban mengaitkan fakta lawan. Uji ganti-dunia (F7): semua pesan
   terminal-spesifik. Angka terverifikasi kode: 0-9=10; 1-30=30;
   30/3=10; garasi 7 nol unit; 61+39=100.
   rev14-21 tetap: sopan, nol emoji, stempel nyambung kartu babak, voice acting 6 chara, timeline satu sumber, intro film, quiz 2 soal. ---------- */
const MSGS=[
  {t0:TM.m[0], who:'PUSAT', stamp:'02.58', kind:'photo', svg:'papan', cap:'DINAS DINI HARI: UNIT BERANGKAT WAJIB COCOK KARCIS'},
  {t0:TM.m[1], who:'BAYU', stamp:'02.59', text:'*geser kunci ke meja* antre ya. unit 09 juaranya terminal ini. yang lain cuma pelengkap. aku berangkat duluan, karcis mah kejar setoran'},
  {t0:TM.m[2], who:'MELI', stamp:'03.00', text:'sabar dikit, bang bayu. karcis yang kejar kita malam ini: cetakan nomor 1 sampai 30. artinya 30 penumpang yang nunggu'},
  {t0:TM.m[3], who:'KAMU', stamp:'03.01', text:'30 karcis, 30 kursi. semuanya utuh, om meli. di terminal gak ada penumpang setengah orang'},
  {t0:TM.m[4], who:'HAZ', stamp:'03.03', text:'unit juga utuh, nak. garasi 0 sampai 9 gue jagain 30 tahun. jumlah unit yang jalan harus pas sama karcis'},
  {t0:TM.m[5], who:'KAMU', stamp:'03.04', text:'garasi 0 sampai 9... berarti 10 garasi ya, om haz? nol ikut dihitung'},
  {t0:TM.m[6], who:'BAYU', stamp:'03.06', text:'HMPH, masa nol dihitung?! nol itu garasi kosong. dari sononya gue mulai garasi 1 ampe 9. ya 9 unit. nol mah cuma angin'},
  {t0:TM.m[7], who:'MELI', stamp:'03.07', text:'eh, tapi karcis kita justru mulai dari 1, dan kursi pertama nomor 1. beda urusan beda aturan mulainya, bang'},
  {t0:TM.m[8], who:'PUSAT', stamp:'03.10', kind:'photo', svg:'monitor', cap:'MONITOR DINAS: 30 KARCIS, 10 GARASI, 3 UNIT BERANGKAT'},
  {t0:TM.m[9], who:'KAMU', stamp:'03.12', text:'liat monitor, om bayu: 30 karcis buat 3 unit, tiap unit 10 penumpang. garasi 0 sampai 9 itu 10 nomor. dua-duanya benar, cuma mulainya beda'},
  {t0:TM.m[10], who:'HAZ', stamp:'03.14', text:'buku garasi lama gue mulai dari 1, cuma 9 baris. terminal sebelah bikin 0 sampai 9, jadi 10 baris. dua-duanya sah, yang penting satu lembar satu aturan'},
  {t0:TM.m[11], who:'MELI', stamp:'03.15', text:'nah itu nama ilmiahnya: bilangan cacah. angka utuh: 0, 1, 2, 3, dan terus. gak ada setengah unit, gak ada 2 koma 5 angkot'},
  {t0:TM.m[12], who:'OMDARI', stamp:'03.17', text:'*tutup buku lama* saksi sejarah di sini: dulu terminal kita gak punya garasi 0. bukan nolnya takut, jamannya angka nol belum dianggap angka'},
  {t0:TM.m[13], who:'PUSAT', stamp:'03.19', kind:'photo', svg:'garasi', cap:'LAPORAN GARASI: NOMOR 7 KOSONG, ISI NOL UNIT'},
  {t0:TM.m[14], who:'KAMU', stamp:'03.20', text:'justru itu, om. garasi 7 gak hilang cuma karena isinya nol unit. nol itu angka sah, bukan tanda lupa nulis'},
  {t0:TM.m[15], who:'MELI', stamp:'03.22', text:'di lembar karcis juga gitu: kursi nomor 0 gak ada, penumpang nol artinya belum ada yang jalan. nol nyimbolkan kosong, bukan musnahkan nomor'},
  {t0:TM.m[16], who:'HAZ', stamp:'03.24', text:'aduh, 30 tahun gue manggil garasi 1 paling depan... rupanya itu garasi 0. nomor itu aturan, posisi depan itu kenyataan'},
  {t0:TM.m[17], who:'MELI', stamp:'03.25', kind:'sticker', stk:'JURUS HITUNG UTUH', stks:'unit utuh · karcis urut 1-30 · garasi 0-9'},
  {t0:TM.m[18], who:'BAYU', stamp:'03.26', text:'*garuk kepala* HMPH. oke, oke. unit 09 tetep juara... tapi garasi nol juga keluarga. aku berangkat duluan, kasih contoh yang bener'},
  {t0:TM.m[19], who:'PUSAT', stamp:'03.30', text:'pertanyaan dini hari: garasi mulai dari 0 atau 1? karcis mulai dari 1. mana yang bener? bilangan cacah itu mulai dari 0 atau dari 1?'},
  {t0:TM.m[20], who:'HAZ', stamp:'03.32', text:'dua-duanya bener, tergantung buku yang dipakai. yang gak boleh: campur dua aturan di satu lembar. aturan boleh beda, hitungannya harus jujur'},
  {t0:TM.m[21], who:'MELI', stamp:'03.34', text:'gimana pun pilihannya, 30 karcis tetep 30 penumpang dan 3 unit tetep 3 unit. hasil hitung gak ikut-ikutan selera. eh, gue catat juga: jam 3.26 bang bayu akhirnya nggak ribut'},
  {t0:TM.m[22], who:'PUSAT', stamp:'03.36', kind:'photo', svg:'poll', cap:'VOTING DINI HARI: 61% MULAI DARI 0, 39% DARI 1'},
  {t0:TM.m[23], who:'PUSAT', stamp:'03.42', text:'voting ditutup: satu kubu lebih ramai, tapi kubu kecil juga keluarga terminal. besok malam: bilangan asli naik kelas. salam satu terminal, anak-anak'}
];

/* divider bab gaya kartu waktu RP (bukan label pelajaran); jam nyambung
   dengan stempel chat dini hari: 02.58 (papan) -> 03.03 (GILIRAN
   GARASI) -> 03.10 (MONITOR KARCIS) -> 03.19 (PAPAN GARASI) ->
   03.30 (VOTING PUSAT); waktu semua kartu dari TM (rev15, rev22) */
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
    ['30','10','0'].forEach((c,j)=>{
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
  sub.textContent=['GRUP JAGA TERMINAL','GARASI 0-9','KARCIS 1-30',
    'NOL ITU SAH','VOTING PUSAT'][i];
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

/* ---------- tiga DIAGRAM MENYALA rev22: DERETAN GARASI 0-9 (nol
   menyala), DUA BATANG voting, DUA LAJUR buku - model visual BARU,
   bukan chips/kartu/pita episode lain; waktu slot dari TM.flash */
const FLASHES=[
  {t0:TM.flash[0][0],t1:TM.flash[0][1],kick:'ANGKA UTUH',title:'CACAH: 0, 1, 2, 3, TERUS',en:'whole numbers go on forever!',
   ruler:'boxes',
   lines:['garasi 0 sampai 9 = 10 nomor · nol ikut dihitung'],
   notes:['UNIT UTUH: GAK ADA SETENGAH ANGKOT','KARCIS UTUH: GAK ADA SETENGAH ORANG']},
  {t0:TM.flash[1][0],t1:TM.flash[1][1],kick:'PERTANYAAN PUSAT',title:'MULAI DARI 0 ATAU 1?',en:'where do whole numbers start?',
   ruler:'vote', voteA:0.61, voteLabelA:'DARI 0', voteB:0.39, voteLabelB:'DARI 1',
   lines:['61% bilang 0 · 39% bilang 1'],
   notes:['DUA-DUANYA SAH, TERGANTUNG BUKU','SATU LEMBAR, SATU ATURAN']},
  {t0:TM.flash[2][0],t1:TM.flash[2][1],kick:'TWIST DINI HARI',title:'ATURAN BOLEH BEDA · HITUNGAN SATU',en:'rules may differ, the count stays honest!',
   ruler:'duo', rulerA:'BUKU LAMA · MULAI 1: 9 BARIS', rulerB:'BUKU BARU · MULAI 0: 10 BARIS',
   lines:['dua buku sah, jangan dicampur di satu lembar'],
   notes:['30 KARCIS TETEP 30 PENUMPANG','HASIL HITUNG GAK IKUT SELERA']}
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
/* DIAGRAM MENYALA rev22: tiga varian - boxes (deretan garasi 0-9, nol
   menyala emas), vote (dua batang, label+pct dari konfigurasi episode),
   duo (dua lajur buku lama vs buku baru) - diparameter dari FLASHES */
function mkRuler(f){
  const wrap=document.createElement('div');
  wrap.style.cssText+='display:flex;flex-direction:column;align-items:center;width:100%;gap:14px;';
  const bandW=ORIENT==='portrait'?Math.round(W*0.82):Math.round(W*0.58);
  if(f.ruler==='boxes'){
    const band=document.createElement('div');
    band.style.cssText+=`display:flex;gap:8px;width:${bandW}px;`;
    const cells=[];
    for(let i=0;i<10;i++){
      const c=document.createElement('div');
      c.style.cssText+=`flex:1;height:${ORIENT==='portrait'?96:78}px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:${ORIENT==='portrait'?40:34}px;background:${i===0?'#E8B32E':'rgba(255,246,232,.10)'};color:${i===0?'#14100C':'#FFF6E8'};border:2px solid ${i===0?'#E8B32E':'rgba(255,246,232,.3)'};opacity:0;`;
      c.textContent=i;
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
      lb.style.cssText+=`font-size:${ORIENT==='portrait'?38:32}px;font-weight:800;color:#FFF6E8;min-width:${ORIENT==='portrait'?240:210}px;`;
      lb.textContent=label;
      const band=document.createElement('div');
      band.className='rband';
      band.style.cssText+=`width:${bandW-(ORIENT==='portrait'?240:210)-18}px;`;
      const fill=document.createElement('div');
      fill.className='rfill';
      fill.style.cssText+=ok?'background:linear-gradient(90deg,#4CAF7A,#8E7CD8);':'background:linear-gradient(90deg,#D93A5A,#A6394B);';
      band.appendChild(fill);
      const pv=document.createElement('div');
      pv.style.cssText+=`font-family:'JetBrains Mono','DejaVu Sans Mono',monospace;font-weight:800;font-size:${ORIENT==='portrait'?44:36}px;color:#F2C14E;opacity:0;`;
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
  /* duo: dua lajur buku lama vs buku baru */
  const mk=(label,col)=>{
    const row=document.createElement('div');
    row.style.cssText+=`width:${bandW}px;display:flex;flex-direction:column;gap:6px;`;
    const lb=document.createElement('div');
    lb.style.cssText+=`font-size:${ORIENT==='portrait'?36:30}px;font-weight:800;color:${col};`;
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
  const A=mk(f.rulerA,'#E8B32E');
  const B=mk(f.rulerB,'#B9A6FF');
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
  const chars=['30','10','3','0','1-30','0-9'];
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
const SOAL=['30 KARCIS BUAT 3 UNIT, TIAP UNIT BERAPA PENUMPANG?','GARASI 0 SAMPAI 9 ADA BERAPA?'];
const qrowsEl=document.getElementById('qrows');
const UJIS=SOAL.map((s,i)=>{
  const r=document.createElement('div');
  r.className='qrow';
  r.style.cssText+=`font-size:${ORIENT==='portrait'?40:34}px;margin-top:${ORIENT==='portrait'?10:6}px;`;
  r.innerHTML='<b>'+(i+1)+'.</b> '+s;
  qrowsEl.appendChild(r);
  return {el:r,t0:TM.quiz[0]+2.3+i*0.16};
});
const UJIVAL=['10','30','9','3','0','1','2','5'];
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
qnoteEl.textContent='KARTU BANTU DARI TERMINAL PUSAT';
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
   layar + label GRUP JAGA TERMINAL saja) lalu kartu produksi "dipersembahkan
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
