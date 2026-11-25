/* ---------- MALAM INVENTARIS (VIDEO 18): data & elemen format RP
   ---------- Dunia BARU ala RP Telegram/TikTok gen Z: grup chat
   "GRUP JAGA GUDANG", chara OC bernama (OMAK, RUPI, GILANG, DEDI, KAMU,
   akun resmi GUDANG PUSAT). HUKUM SERI: setiap episode dunianya diganti
   total (grup, anggota, avatar, setting) - tidak ada dunia yang diulang,
   dan tiap episode SKEMA alur + METODE ajarnya wajib baru (rev19).
   Warisan format terkunci tetap jalan penuh: tanpa indikator pengetikan,
   pesan jeda lega, dialog 60px, dialog manusiawi tanpa kalimat tema dan
   tanpa label di ucapan, alur rantai sebab-akibat tertutup, diagram
   menyala, papan misi akun resmi, teaser lanjutan.
   Bahan: blog Yuyanaka "BILANGAN" (Nov 2026) - bilangan ada sebelum
   manusia menamainya; empat peran angka (jumlah, urutan, pecahan, minus);
   pertanyaan besar: diciptakan atau ditemukan?
   Alur rev21 (semua hitungan terverifikasi kode): papan MALAM INVENTARIS
   23.30 -> GILANG yakin stok pas, gak perlu hitung -> lembar stok 96:
   rak dihitung per rak 24x4 = 96 (12 masuk, 4 keluar; jumlah = isi, bukan
   perasaan) -> omak titip bagi rata 30 kotak untuk 6 pedagang (pas 5) vs
   7 orang (4 koma 2 koma lima; 7x4=28 sisa 2, sisa punya pemilik) ->
   JAM 12 MALAM: laporan freezer DEDI -5 (minus = alamat di bawah nol) ->
   RUPI kenalkan GARIS BILANGAN (nol tengah, kursi -5 lima langkah di
   bawah nol) + stiker JURUS HITUNG JUJUR -> PERTANYAAN PUSAT tengah
   malam: gudang tutup lampu mati, 2+2 tetap 4? dibuat atau ditemukan? ->
   GILANG: tulisan buatan; DEDI: freezer tetap -5 tanpa penonton ->
   RUPI dua lapis: SIMBOL diciptakan, ISI sudah ada duluan (30 kard gak
   jadi 29 karena label ganti) -> POLLING PUSAT 52% ditemukan / 48%
   dibuat + teaser rak bilangan cacah besok malam. Sapaan unik per chara
   (kak/om/anak/omak/om) supaya tiap tokoh punya suara sendiri. ---------- */
const Q = new URLSearchParams(location.search);
const ORIENT = Q.get('o') === 'landscape' ? 'landscape' : 'portrait';
const W = ORIENT === 'portrait' ? 1080 : 1920;
const H = ORIENT === 'portrait' ? 1920 : 1080;

function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)|0;return((t^t>>>14)>>>0)/4294967296}}
const rnd = mulberry32(181126);
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
  const chars=['24','96','30','-5','1/2','2+2','52%','48%'];
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

/* ---------- cast RP dunia GRUP JAGA GUDANG (chara OC bernama ala RP
   Telegram/TikTok gen Z; dunia video ini sendiri, tidak dibawa ulang).
   Avatar bulat dengan IKON SVG digambar custom per chara (rev14: bukan
   emoji comot); label pendek ala username. ---------- */
const CAST={
  OMAK:{name:'OMAK',bg:'radial-gradient(circle,#F26D6D 58%,#D93A5A)',col:'#FFB3B3'},
  GILANG:{name:'GILANG',bg:'radial-gradient(circle,#4CAF7A 58%,#2E7D5B)',col:'#A8E6C3'},
  RUPI:{name:'RUPI',bg:'radial-gradient(circle,#8E7CD8 55%,#6A5ACD)',col:'#D9C6FF'},
  KAMU:{name:'KAMU',bg:'radial-gradient(circle,#C9556B 55%,#A6394B)',col:'#D9C6FF'},
  DEDI:{name:'DEDI',bg:'radial-gradient(circle,#4A6FA5 58%,#2C4A73)',col:'#AFCBE8'},
  PUSAT:{name:'AKUN GUDANG PUSAT',bg:'radial-gradient(circle,#FFE9A8 40%,rgba(255,233,168,.12) 72%)',col:'#FFE9A8'}
};
/* ikon avatar SVG custom (digambar, bukan emoji): kunci gudang OMAK,
   troli kard GILANG, klip stok RUPI, senter DEDI, lampu gudang PUSAT,
   topi jaga KAMU */
const AVI={
  OMAK:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<circle cx="15" cy="24" r="8.5" fill="none" stroke="#FFF6E8" stroke-width="3"/>'
    +'<circle cx="15" cy="24" r="3" fill="#F7C948"/>'
    +'<rect x="23.5" y="21.5" width="17" height="5" rx="2.5" fill="#FFF6E8"/>'
    +'<rect x="33" y="26.5" width="4" height="5" rx="1.5" fill="#F7C948"/>'
    +'<rect x="38" y="26.5" width="2.5" height="4" rx="1.2" fill="#F7C948"/></svg>',
  GILANG:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<rect x="10" y="12" width="24" height="17" rx="4" fill="#FFF6E8" stroke="#14100C" stroke-width="1.8"/>'
    +'<rect x="14" y="16" width="16" height="4" rx="2" fill="#4CAF7A"/>'
    +'<rect x="14" y="22" width="10" height="3.5" rx="1.7" fill="#4CAF7A"/>'
    +'<circle cx="18" cy="35" r="5" fill="none" stroke="#FFF6E8" stroke-width="2.6"/>'
    +'<circle cx="27" cy="35" r="5" fill="none" stroke="#FFF6E8" stroke-width="2.6"/>'
    +'<line x1="34" y1="8" x2="42" y2="12" stroke="#F7C948" stroke-width="2.4" stroke-linecap="round"/>'
    +'<line x1="36" y1="4" x2="43" y2="7" stroke="#F7C948" stroke-width="2.4" stroke-linecap="round"/></svg>',
  RUPI:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<rect x="11" y="9" width="26" height="34" rx="5" fill="#14100C"/>'
    +'<rect x="8" y="13" width="32" height="27" rx="4" fill="#FFF6E8" stroke="#14100C" stroke-width="1.6"/>'
    +'<rect x="18" y="6" width="12" height="7" rx="3" fill="#8E7CD8" stroke="#14100C" stroke-width="1.4"/>'
    +'<line x1="13" y1="24" x2="35" y2="24" stroke="#14100C" stroke-width="2.2" stroke-linecap="round"/>'
    +'<line x1="13" y1="30" x2="29" y2="30" stroke="#14100C" stroke-width="2.2" stroke-linecap="round"/>'
    +'<path d="M13 35.5 l4.5 4.5 8 -9" stroke="#4CAF7A" stroke-width="3" fill="none" stroke-linecap="round"/></svg>',
  DEDI:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<rect x="6" y="21" width="18" height="8" rx="4" fill="#FFF6E8" stroke="#14100C" stroke-width="1.6"/>'
    +'<rect x="24" y="19" width="8" height="12" rx="3" fill="#14100C"/>'
    +'<path d="M34 17 L46 24 34 31 Z" fill="#F7C948" opacity=".55"/>'
    +'<rect x="3" y="17.5" width="4" height="15" rx="2" fill="#4CAF7A"/></svg>',
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

/* ---------- ilustrasi dunia VIDEO 18 (SVG foto chat, digambar serius)
   Tiga foto "asli dari dunia GRUP JAGA GUDANG": papan klip MALAM
   INVENTARIS (hitung ulang rak, catat jumlah, suhu freezer, stempel
   23.30 malam), laporan TERMOMETER FREEZER DEDI (LCD -5, di bawah nol),
   dan hasil VOTING TENGAH MALAM dari GUDANG PUSAT (52% ditemukan, 48%
   dibuat, teaser rak cacah). Semua deterministik. ---------- */
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
  s+='<text x="300" y="86" text-anchor="middle" font-size="30" font-weight="800" fill="#3A2C1E" letter-spacing="3">MALAM INVENTARIS</text>';
  s+='<text x="300" y="118" text-anchor="middle" font-size="26" font-weight="800" fill="#A6394B">GUDANG · JAM 23.30</text>';
  const row=(y,txt,hot)=>{
    let r='<rect x="92" y="'+y+'" width="416" height="44" rx="10" fill="#FFFDF6" stroke="#D8C8A4" stroke-width="2"/>';
    r+=dot(114,y+22,7,hot?'#A6394B':'#4CAF7A');
    r+='<text x="134" y="'+(y+30)+'" font-size="24" font-weight="800" fill="'+(hot?'#A6394B':'#3A2C1E')+'">'+txt+'</text>';
    return r;
  };
  s+=row(138,'HITUNG ULANG SEMUA RAK',true)
   +row(190,'CATAT JUMLAH DI LEMBAR',false)
   +row(242,'SUHU FREEZER WAJIB BENAR',true);
  s+='<text x="300" y="318" text-anchor="middle" font-size="28" font-weight="600" fill="#8A6A46">@gudangpusat · papan inventaris malam</text>';
  return s+'</svg>';
}
function svgFreezer(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="ktF" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#182231"/><stop offset="1" stop-color="#0C1320"/></linearGradient></defs>'
   +'<rect width="600" height="340" fill="url(#ktF)"/>';
  [[92,42,1.6],[520,50,1.4],[60,290,1.5],[550,280,1.6],[300,30,1.3],[480,170,1.2]].forEach(p=>{s+=dot(p[0],p[1],p[2],'rgba(255,246,232,.45)')});
  s+='<text x="300" y="56" text-anchor="middle" font-size="28" font-weight="800" fill="#F2C14E">TERMOMETER FREEZER · LAPORAN SATPAM</text>';
  /* kabinet freezer + layar */
  s+='<rect x="130" y="80" width="300" height="180" rx="16" fill="#101A26" stroke="#2A3A50" stroke-width="2.5"/>';
  s+='<rect x="150" y="100" width="260" height="140" rx="10" fill="#0B1220"/>';
  s+='<rect x="176" y="122" width="208" height="72" rx="10" fill="#0A0F1C" stroke="rgba(185,166,255,.55)" stroke-width="2"/>';
  s+='<text x="280" y="176" text-anchor="middle" font-family="JetBrains Mono, DejaVu Sans Mono, monospace" font-size="50" font-weight="800" fill="#B9A6FF">-5\u00b0</text>';
  s+='<rect x="392" y="92" width="14" height="128" rx="7" fill="#F7C948" stroke="#C8A86E" stroke-width="1.6"/>';
  /* garis bilangan mini: nol tengah, kursi -5 menyala di bawah nol */
  s+='<rect x="92" y="292" width="416" height="14" rx="7" fill="#1B2433" stroke="rgba(185,166,255,.5)" stroke-width="2"/>';
  s+='<line x1="300" y1="284" x2="300" y2="314" stroke="#4CAF7A" stroke-width="3.5"/>';
  s+='<text x="300" y="278" text-anchor="middle" font-size="26" font-weight="800" fill="#4CAF7A">0</text>';
  s+='<circle cx="184" cy="299" r="9" fill="#FF6B6B" stroke="#FFF6E8" stroke-width="2"/>'
   +'<text x="184" y="276" text-anchor="middle" font-size="27" font-weight="800" fill="#FF6B6B">-5</text>';
  s+='<rect x="356" y="238" width="248" height="0" fill="none"/>';
  s+='<rect x="170" y="240" width="260" height="40" rx="20" fill="#4CAF7A" stroke="#2E7D5B" stroke-width="2.5"/>'
   +'<text x="300" y="268" text-anchor="middle" font-size="24" font-weight="800" fill="#10331F">DI BAWAH NOL = MINUS</text>';
  return s+'</svg>';
}
function svgPoll(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="ktP" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#1B1440"/><stop offset="1" stop-color="#120C2A"/></linearGradient></defs>'
   +'<rect width="600" height="340" fill="url(#ktP)"/>';
  [[70,60,1.6],[180,110,1.4],[330,60,1.8],[560,60,1.5],[60,200,1.4],[300,250,1.3],[540,250,1.6]].forEach(p=>{s+=dot(p[0],p[1],p[2],'rgba(255,246,232,.5)')});
  s+='<rect x="70" y="30" width="460" height="52" rx="14" fill="#E8B32E"/>'
   +'<text x="300" y="65" text-anchor="middle" font-size="28" font-weight="800" fill="#14100C" letter-spacing="2">VOTING TENGAH MALAM</text>';
  const bar=(y,label,pct,ok)=>{
    let r='<text x="106" y="'+(y+26)+'" font-size="25" font-weight="800" fill="#FFF6E8">'+label+'</text>';
    r+='<rect x="236" y="'+y+'" width="296" height="38" rx="12" fill="rgba(255,246,232,.10)" stroke="rgba(255,246,232,.25)" stroke-width="2"/>';
    r+='<rect x="236" y="'+y+'" width="'+Math.round(296*pct)+'" height="38" rx="12" fill="'+(ok?'#4CAF7A':'#D93A5A')+'" opacity=".85"/>';
    r+='<text x="'+(246+Math.round(296*pct)+14)+'" y="'+(y+27)+'" font-size="24" font-weight="800" fill="#FFF6E8">'+Math.round(pct*100)+'%</text>';
    return r;
  };
  s+=bar(108,'DITEMUKAN',0.52,true);
  s+=bar(164,'DIBUAT',0.48,false);
  s+='<text x="300" y="242" text-anchor="middle" font-size="25" font-weight="700" fill="rgba(255,246,232,.75)">hampir imbang, dan itu wajar</text>';
  s+='<g transform="rotate(-1 300 306)">'
   +'<rect x="100" y="284" width="400" height="44" rx="12" fill="#241A3E" stroke="#E8B32E" stroke-width="2.5"/>'
   +'<text x="300" y="314" text-anchor="middle" font-size="24" font-weight="800" fill="#F2C14E">BESOK: RAK BILANGAN CACAH</text></g>';
  return s+'</svg>';
}
const SVGS={papan:svgPapan,freezer:svgFreezer,poll:svgPoll};
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

/* ---------- pesan RP VIDEO 18 (dunia GRUP JAGA GUDANG, chara OC):
   SKEMA BARU (rev21, permintaan pemilik: tiap episode alur/skema/method
   HARUS beda dari episode sebelumnya). Bukan lagi skema episode
   sebelumnya; sekarang: MALAM INVENTARIS GUDANG - papan akun resmi
   23.30 -> stok 96 pas: 12 kard masuk, 4 keluar, rak 24x4 (jumlah =
   isi gudang, bukan perasaan) -> bagi rata 30 kotak: 6 pedagang pas 5,
   7 orang 4,25 + sisa 2 (sisa punya pemilik) -> JAM 12 MALAM: laporan
   freezer -5 (minus = alamat di bawah nol) -> METODE GARIS BILANGAN
   (nol tengah, kursi -5 lima langkah di bawah nol; metode visual BARU)
   -> stiker JURUS HITUNG JUJUR -> PERTANYAAN PUSAT (twist tengah malam,
   hening pra-twist): gudang tutup lampu mati, 2+2 tetap 4? dibuat atau
   ditemukan? -> tulisan buatan vs isi yang sudah ada (30 kard gak jadi
   29 karena label ganti) -> POLLING 52/48 + teaser rak cacah.
   SUARA UNIK per chara + SAPAAN ALAMI (hukum rev20): GILANG (om/om
   gilang), RUPI (kak/om), KAMU (om gilang/om dedi), OMAK (omak/anak-
   anak), DEDI (om/omak). Angka terverifikasi kode: 24x4=96; 12-4=8
   (kard sisa gilang) & lembar 96; 30/6=5; 30/7=4,25; 7x4=28, sisa 2;
   -5 lima langkah di bawah nol; 52+48=100.
   rev14-20 tetap: bahasa sopan, nol emoji, stempel jam nyambung kartu
   babak (lintas tengah malam), voice acting 6 chara, timeline satu
   sumber, intro film rev18. ---------- */
const MSGS=[
  {t0:TM.m[0], who:'PUSAT', stamp:'23.30', kind:'photo', svg:'papan', cap:'MALAM INVENTARIS: SEMUA HITUNGAN WAJIB SAH'},
  {t0:TM.m[1], who:'GILANG', stamp:'23.31', text:'*masuk bawa klip* sore tadi gue tinggal 12 kard, beres. stok pasti pas, gak usah dihitung ulang. capek doang'},
  {t0:TM.m[2], who:'KAMU', stamp:'23.32', text:'om gilang, jumlah itu gak boleh ditebak. lembar stok tulis 96, rak harus nyampe 96. dihitung baru sah'},
  {t0:TM.m[3], who:'RUPI', stamp:'23.33', text:'betul, kak. gue hitung rak 1 sampai rak 4, satu per satu. centangnya nunggu angka, bukan nunggu capek'},
  {t0:TM.m[4], who:'GILANG', stamp:'23.45', text:'*nambahin di klip* rak 1: 24. rak 2: 24. rak 3: 24. rak 4: 24. total 96 pas?! gue kira 100. kok bisa beda?'},
  {t0:TM.m[5], who:'KAMU', stamp:'23.47', text:'12 kard masuk sore, 4 keluar ke toko. lembar stok ikut diubah jadi 96. yang sah itu yang dihitung, bukan yang diingat'},
  {t0:TM.m[6], who:'GILANG', stamp:'23.49', text:'ADUH oke oke. berarti catatan masuk-keluar itu bukan formalitas. stok bisa beda dari ingetan kita'},
  {t0:TM.m[7], who:'RUPI', stamp:'23.50', text:'iya. jumlah itu nangkep isi gudang, bukan perasaan. 96 itu 96, di label apa pun, di jam berapa pun'},
  {t0:TM.m[8], who:'OMAK', stamp:'23.52', text:'kalau gitu omak titip: 30 kotak kue buat 6 pedagang es pagi nanti. bagiannya harus rata, anak-anak'},
  {t0:TM.m[9], who:'KAMU', stamp:'23.53', text:'30 bagi 6, tiap pedagang 5 kotak. pas, gak ada sisa, gak ada yang kurang'},
  {t0:TM.m[10], who:'RUPI', stamp:'23.55', text:'kalau pesennya jadi 7 orang? 30 bagi 7 itu 4 koma dua koma lima. kotak kue gak bisa dipotong begitu'},
  {t0:TM.m[11], who:'GILANG', stamp:'23.56', text:'haduh. ya sudah: 7 orang kali 4 kotak, 28. sisa 2. sisa punya pemilik, gak boleh hilang diam-diam'},
  {t0:TM.m[12], who:'OMAK', stamp:'23.58', text:'nah, gini baru paham. omak jadi mikir: angka rata, angka sisa... angka-angka ini asalnya dari mana ya?'},
  {t0:TM.m[13], who:'DEDI', stamp:'00.02', kind:'photo', svg:'freezer', cap:'LAPORAN SATPAM: FREEZER DAGING -5 DERAJAT'},
  {t0:TM.m[14], who:'KAMU', stamp:'00.03', text:'betul, om dedi. minus itu alamat di bawah nol. kalau dicatat lima doang, besoknya daging jadi masalah'},
  {t0:TM.m[15], who:'RUPI', stamp:'00.05', text:'di garis bilangan, nol itu tengah. naik ke 1, 2, 3... turun ke -1, -2, sampai -5. kursi -5 ada, lima langkah di bawah nol'},
  {t0:TM.m[16], who:'GILANG', stamp:'00.07', text:'gitu ya. berarti minus bukan hiasan, itu alamat. salah alamat, daging basi'},
  {t0:TM.m[17], who:'RUPI', stamp:'00.08', kind:'sticker', stk:'JURUS HITUNG JUJUR', stks:'hitung ulang · catat masuk-keluar · baca minus pelan-pelan'},
  {t0:TM.m[18], who:'PUSAT', stamp:'00.12', text:'pertanyaan tengah malam: gudang tutup, lampu mati, gak ada yang nonton. 2+2 tetap 4, gak? bilangan itu dibuat manusia atau sudah ada duluan?'},
  {t0:TM.m[19], who:'GILANG', stamp:'00.14', text:'*duduk di kard* gue jawab: bikin! tulisan 24 di klip itu buatan kita. gak ada manusia, gak ada tulisan'},
  {t0:TM.m[20], who:'DEDI', stamp:'00.15', text:'tulisan memang buatan. tapi isinya? freezer gue tetap -5 walau gak ada yang baca. dinginnya gak nunggu dipencet'},
  {t0:TM.m[21], who:'RUPI', stamp:'00.17', text:'jawabannya dua lapis, om. manusia menciptakan simbol dan cara nulisnya: 24, -5, koma. tapi isi yang ditulis itu sudah ada duluan: 30 kard tidak jadi 29 cuma karena labelnya ganti'},
  {t0:TM.m[22], who:'PUSAT', stamp:'00.20', kind:'photo', svg:'poll', cap:'VOTING MALAM: 52% TEMUKAN, 48% BIKIN'},
  {t0:TM.m[23], who:'PUSAT', stamp:'00.26', text:'voting ditutup: hampir imbang, dan itu wajar. tugas gudang bukan memutuskan, tapi jujur pada hitungan. besok malam, rak bilangan cacah dibuka. selamat malam, anak-anak'}
];

/* divider bab gaya kartu waktu RP (bukan label pelajaran); jam nyambung
   dengan stempel chat lintas tengah malam: 23.30 (papan) -> 23.45
   (GILIRAN RAK) -> 23.52 (BAGI RATA) -> 00.02 (JAM 12 MALAM) ->
   00.12 (PERTANYAAN PUSAT); waktu semua kartu dari TM (rev15, rev21) */
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
    ['96','30','-5'].forEach((c,j)=>{
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
  sub.textContent=['GRUP JAGA GUDANG','RAK PERTAMA','BAGI RATA KUE',
    'JAM 12 MALAM','PERTANYAAN PUSAT'][i];
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

/* ---------- tiga DIAGRAM MENYALA rev21: GARIS BILANGAN (kursi minus),
   PAPAN POLLING (dua batang), TULISAN vs ISI (dua lajur) - model visual
   BARU, bukan chips/kartu/tangga episode lain; waktu slot dari TM.flash */
const FLASHES=[
  {t0:TM.flash[0][0],t1:TM.flash[0][1],kick:'GARIS BILANGAN',title:'-5 KURSINYA DI BAWAH NOL',en:'minus five has its seat below zero!',
   ruler:'numline',
   lines:['nol itu tengah: naik ke 1, 2, 3 · turun ke -1, -2, -5'],
   notes:['MINUS = ALAMAT, BUKAN HIASAN','KURSI -5: LIMA LANGKAH DI BAWAH NOL']},
  {t0:TM.flash[1][0],t1:TM.flash[1][1],kick:'PERTANYAAN PUSAT',title:'GUDANG TUTUP, LAMPU MATI',en:'is 2+2 still 4 when nobody watches?',
   ruler:'vote',
   lines:['2+2 tetap 4, atau bilangan ikut tidur?'],
   notes:['DIBUAT MANUSIA, ATAU SUDAH ADA DULUAN?','VOTING DIBUKA: KIRIM JAWABANMU']},
  {t0:TM.flash[2][0],t1:TM.flash[2][1],kick:'TWIST TENGAH MALAM',title:'TULISAN DIBUAT · ISI DITEMUKAN',en:'symbols are made, values were always there!',
   ruler:'duo',
   lines:['simbol 24, -5, koma = buatan manusia'],
   notes:['ISI TETAP: 30 KARD GAK JADI 29','TULISANNYA BOLEH GANTI, NILAINYA GAK']}
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
/* GARIS BILANGAN rev21: tiga varian visual per diagram - numline (garis
   bilangan -5..5 dengan kursi minus), vote (dua batang polling), duo
   (dua lajur simbol vs isi) */
function mkRuler(variant){
  const wrap=document.createElement('div');
  wrap.style.cssText+='display:flex;flex-direction:column;align-items:center;width:100%;gap:14px;';
  const bandW=ORIENT==='portrait'?Math.round(W*0.82):Math.round(W*0.58);
  if(variant==='numline'){
    const band=document.createElement('div');
    band.className='rband';
    band.style.cssText+=`width:${bandW}px;`;
    for(let i=0;i<=10;i++){
      const tk=document.createElement('div');
      tk.className='rtick';
      tk.style.cssText+=`left:${(i*10).toFixed(0)}%;height:${i%5===0?20:12}px;`;
      band.appendChild(tk);
    }
    const fill=document.createElement('div');
    fill.className='rfill';
    band.appendChild(fill);
    const mark=document.createElement('div');
    mark.className='rmark';
    band.appendChild(mark);
    const pin=document.createElement('div');
    pin.className='rpin';
    band.appendChild(pin);
    const lbl=document.createElement('div');
    lbl.className='rlbl';
    lbl.style.cssText+=`font-size:${ORIENT==='portrait'?46:40}px;`;
    band.appendChild(lbl);
    const nums=document.createElement('div');
    nums.className='rnums';
    nums.style.cssText+=`width:${bandW}px;`;
    ['-5','-2.5','0','2.5','5'].forEach((sv,i)=>{
      const el=document.createElement('div');
      el.textContent=sv;
      el.style.cssText+=`position:absolute;left:${[0,25,50,76,100][i]}%;transform:translateX(-50%);`;
      nums.appendChild(el);
    });
    wrap.appendChild(band);
    wrap.appendChild(nums);
    return {wrap,fill,mark,pin,lbl,kind:'numline'};
  }
  if(variant==='vote'){
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
    const A=mk('DITEMUKAN',0.52,true);
    const B=mk('DIBUAT',0.48,false);
    return {wrap,A,B,kind:'vote'};
  }
  /* duo: dua lajur - SIMBOL (dibuat) vs ISI (ada duluan) */
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
  const A=mk('SIMBOL · 24, -5, KOMA (DIBUAT)','#E8B32E');
  const B=mk('ISI · 30 KARD TETAP 30 (SUDAH ADA)','#B9A6FF');
  return {wrap,A,B,kind:'duo'};
}
const FLASHBODY=FLASHES.map(f=>{
  const w=document.createElement('div');
  w.style.cssText+='display:none;flex-direction:column;align-items:center;gap:inherit;width:100%;';
  const R=mkRuler(f.ruler);
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
  const chars=['24','96','30','-5','1/2','2+2'];
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
const SOAL=['30 KOTAK BAGI 6 PEDAGANG, BERAPA BAGIAN?','-5 KURSINYA DI ATAS ATAU BAWAH NOL?'];
const qrowsEl=document.getElementById('qrows');
const UJIS=SOAL.map((s,i)=>{
  const r=document.createElement('div');
  r.className='qrow';
  r.style.cssText+=`font-size:${ORIENT==='portrait'?40:34}px;margin-top:${ORIENT==='portrait'?10:6}px;`;
  r.innerHTML='<b>'+(i+1)+'.</b> '+s;
  qrowsEl.appendChild(r);
  return {el:r,t0:TM.quiz[0]+2.3+i*0.16};
});
const UJIVAL=['30','6','5','4','28','2','-5','0'];
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
qnoteEl.textContent='KARTU BANTU DARI GUDANG PUSAT';
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
   layar + label GRUP JAGA GUDANG saja) lalu kartu produksi "dipersembahkan
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
