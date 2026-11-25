/* ---------- TANTANGAN DAPUR HARI 3 (VIDEO 19): data & elemen format RP
   ---------- Dunia BARU ala RP Telegram/TikTok gen Z: grup chat
   "GRUP RESEP GAGAL", chara OC bernama (NADIA, GEDE, VITA, KAMU, akun
   resmi tantangan). HUKUM SERI: setiap episode dunianya diganti total
   (grup, anggota, avatar, setting) - tidak ada dunia yang diulang, dan
   tiap episode SKEMA alur + METODE ajarnya juga wajib baru (rev19).
   Warisan format terkunci tetap jalan penuh: tanpa indikator pengetikan,
   20 pesan jeda lega, dialog 60px, dialog manusiawi tanpa kalimat tema
   dan tanpa label di ucapan, ALUR rantai sebab-akibat tertutup
   (tanya-jawab benar, tanpa kehadiran mustahil), diagram menyala, papan
   misi akun resmi, teaser lanjutan.
   Bahan: blog Yuyanaka "MENGENAL BILANGAN DESIMAL" (Nov 2026, decoma).
   Alur rev19 (semua hitungan terverifikasi kode): papan TANTANGAN HARI 3
   jam 4 sore (semua takaran wajib desimal, hakim timbangan digital) ->
   GEDE sombong pecahan, takar pakai gelas takar (volume, bukan berat!)
   -> gagal, LCD bilang 0,40 padahal target 0,75 -> VITA kenalkan METODE
   GARIS UKUR 0->1 (pita ukur + pin geser; metode visual baru, beda dari
   diagram episode lain) -> 0,75 = 3/4 jalan, kurangnya 0,35 (0,75-0,40)
   -> maghrib: sticker kartu latihan -> 1/3 tak pernah pas di satu titik
   (desimal berulang 0,333...) -> jam 7 malam uji rasa: kalkulator 1/3 x 3
   = 0,999999 (layar cuma muat segitu digit), 0,999... menempel persis di
   angka 1 -> akun resmi tantangan post LEADERBOARD + teaser besok:
   pecahan melawan desimal. Sapaan unik per chara (akang/neng/kak/bang/
   bu/ibu/omak) supaya tiap tokoh punya suara sendiri. ---------- */
const Q = new URLSearchParams(location.search);
const ORIENT = Q.get('o') === 'landscape' ? 'landscape' : 'portrait';
const W = ORIENT === 'portrait' ? 1080 : 1920;
const H = ORIENT === 'portrait' ? 1920 : 1080;

function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)|0;return((t^t>>>14)>>>0)/4294967296}}
const rnd = mulberry32(171124);
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
  const chars=['0,5','0,25','0,75','1/3','0,333','0,40','0,35','0,999'];
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

/* ---------- cast RP dunia GRUP RESEP GAGAL (chara OC bernama ala RP
   Telegram/TikTok gen Z; dunia video ini sendiri, tidak dibawa ulang).
   Avatar bulat dengan IKON SVG digambar custom per chara (rev14: bukan
   emoji comot); label pendek ala username. ---------- */
const CAST={
  NADIA:{name:'NADIA',bg:'radial-gradient(circle,#F26D6D 58%,#D93A5A)',col:'#FFB3B3'},
  GEDE:{name:'GEDE',bg:'radial-gradient(circle,#4CAF7A 58%,#2E7D5B)',col:'#A8E6C3'},
  VITA:{name:'VITA',bg:'radial-gradient(circle,#8E7CD8 55%,#6A5ACD)',col:'#D9C6FF'},
  KAMU:{name:'KAMU',bg:'radial-gradient(circle,#C9556B 55%,#A6394B)',col:'#D9C6FF'},
  MYST:{name:'AKUN TANTANGAN',bg:'radial-gradient(circle,#FFE9A8 40%,rgba(255,233,168,.12) 72%)',col:'#FFE9A8'}
};
/* ikon avatar SVG custom (digambar, bukan emoji): spatula NADIA, mixer
   tangan GEDE, timbangan digital VITA, celemek KAMU, kroasan ??? */
const AVI={
  NADIA:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<rect x="21.5" y="22" width="5" height="20" rx="2.5" fill="#14100C"/>'
    +'<rect x="16" y="5" width="16" height="17" rx="5" fill="#FFF6E8" stroke="#14100C" stroke-width="1.8"/>'
    +'<rect x="19.5" y="9" width="3" height="9" rx="1.5" fill="#D93A5A"/>'
    +'<rect x="24" y="9" width="3" height="9" rx="1.5" fill="#D93A5A"/>'
    +'<rect x="28.5" y="9" width="3" height="9" rx="1.5" fill="#D93A5A"/>'
    +'<rect x="19.5" y="26" width="9" height="4" rx="2" fill="#F7C948"/></svg>',
  GEDE:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<rect x="10" y="10" width="28" height="14" rx="7" fill="#14100C"/>'
    +'<rect x="30" y="4" width="6" height="11" rx="3" fill="#14100C"/>'
    +'<circle cx="18" cy="17" r="3" fill="#4CAF7A"/>'
    +'<path d="M18 24 v6 q0 3 -2.5 5 M18 24 v6 q0 3 2.5 5" stroke="#FFF6E8" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
    +'<path d="M30 24 v6 q0 3 -2.5 5 M30 24 v6 q0 3 2.5 5" stroke="#FFF6E8" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
  VITA:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<rect x="7" y="15" width="34" height="25" rx="6" fill="#14100C"/>'
    +'<rect x="5" y="11" width="38" height="7" rx="3.5" fill="#FFF6E8" stroke="#14100C" stroke-width="1.6"/>'
    +'<rect x="12" y="20" width="24" height="9" rx="2.5" fill="rgba(142,124,216,.55)" stroke="#B9A6FF" stroke-width="1.4"/>'
    +'<rect x="15" y="23" width="4" height="3" rx="1.2" fill="#D9C6FF"/>'
    +'<rect x="21" y="23" width="4" height="3" rx="1.2" fill="#D9C6FF"/>'
    +'<circle cx="29.5" cy="24.5" r="1.6" fill="#D9C6FF"/>'
    +'<rect x="10" y="40" width="6" height="3" rx="1.5" fill="#14100C"/>'
    +'<rect x="32" y="40" width="6" height="3" rx="1.5" fill="#14100C"/></svg>',
  KAMU:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<path d="M18 6 q6 5 12 0" fill="none" stroke="#14100C" stroke-width="2.6"/>'
    +'<path d="M13 15 h22 v6 l4 5 v16 h-30 v-16 l4 -5 Z" fill="#FFF6E8" stroke="#14100C" stroke-width="1.8"/>'
    +'<rect x="20" y="30" width="8" height="7" rx="2" fill="#D93A5A" opacity=".5"/></svg>',
  MYST:s=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">'
    +'<rect x="10" y="8" width="28" height="34" rx="4" fill="#FFF3C4" stroke="#14100C" stroke-width="1.8"/>'
    +'<rect x="18" y="4" width="12" height="7" rx="3" fill="#E8B32E" stroke="#14100C" stroke-width="1.6"/>'
    +'<line x1="15" y1="19" x2="33" y2="19" stroke="#14100C" stroke-width="2.2" stroke-linecap="round"/>'
    +'<line x1="15" y1="25" x2="29" y2="25" stroke="#14100C" stroke-width="2.2" stroke-linecap="round"/>'
    +'<line x1="15" y1="31" x2="31" y2="31" stroke="#14100C" stroke-width="2.2" stroke-linecap="round"/>'
    +'<path d="M36 28 l1.7 4 4 1.7 -4 1.7 -1.7 4 -1.7 -4 -4 -1.7 4 -1.7 Z" fill="#E8B32E"/></svg>'
};

/* ---------- ilustrasi dunia VIDEO 19 (SVG foto chat, digambar serius)
   Tiga foto "asli dari dunia GRUP RESEP GAGAL": papan klip TANTANGAN
   DAPUR HARI 3 (semua takaran wajib desimal, hakim timbangan digital,
   stempel 16.00 sore), tangkapan timbangan digital GAGAL TAKAR (LCD
   0,40 merah vs target 0,75 kg, adonan kenceng), dan LEADERBOARD HARI 3
   dari akun tantangan (4 dapur lulus, 1 gagal, teaser besok). Semua
   deterministik. ---------- */
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
  s+='<text x="300" y="86" text-anchor="middle" font-size="30" font-weight="800" fill="#3A2C1E" letter-spacing="3">TANTANGAN DAPUR</text>';
  s+='<text x="300" y="118" text-anchor="middle" font-size="26" font-weight="800" fill="#A6394B">HARI 3 · JAM 4 SORE</text>';
  const row=(y,txt,hot)=>{
    let r='<rect x="92" y="'+y+'" width="416" height="44" rx="10" fill="#FFFDF6" stroke="#D8C8A4" stroke-width="2"/>';
    r+=dot(114,y+22,7,hot?'#A6394B':'#4CAF7A');
    r+='<text x="134" y="'+(y+30)+'" font-size="24" font-weight="800" fill="'+(hot?'#A6394B':'#3A2C1E')+'">'+txt+'</text>';
    return r;
  };
  s+=row(138,'SEMUA TAKARAN WAJIB DESIMAL',true)
   +row(190,'HAKIM: TIMBANGAN DIGITAL',false)
   +row(242,'GAGAL TAKAR = CAP KUSAM',true);
  s+='<text x="300" y="318" text-anchor="middle" font-size="28" font-weight="600" fill="#8A6A46">@omaknadia · papan tantangan harian</text>';
  return s+'</svg>';
}
function svgTimbang(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="ktV" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#6B4E34"/><stop offset="1" stop-color="#4A3624"/></linearGradient></defs>'
   +'<rect width="600" height="340" fill="url(#ktV)"/>';
  for(let i=0;i<4;i++){s+='<line x1="0" y1="'+(40+i*82)+'" x2="600" y2="'+(48+i*82)+'" stroke="rgba(0,0,0,.18)" stroke-width="3"/>'}
  s+='<text x="300" y="56" text-anchor="middle" font-size="28" font-weight="800" fill="#F2C14E">TIMBANGAN DIGITAL · SKALA 0,01 KG</text>';
  /* timbangan: platform + badan + LCD merah 0,40 */
  s+='<rect x="168" y="106" width="264" height="40" rx="10" fill="#2A2438" stroke="#14100C" stroke-width="2"/>';
  s+='<rect x="150" y="146" width="300" height="118" rx="16" fill="#14100C" stroke="#3A2C50" stroke-width="2.5"/>';
  s+='<rect x="200" y="172" width="200" height="62" rx="8" fill="#1A1428" stroke="rgba(232,179,46,.55)" stroke-width="2"/>';
  s+='<text x="300" y="220" text-anchor="middle" font-family="JetBrains Mono, DejaVu Sans Mono, monospace" font-size="44" font-weight="800" fill="#FF6B6B">0,40</text>';
  s+='<rect x="238" y="242" width="124" height="10" rx="5" fill="rgba(255,107,107,.35)"/>';
  /* target 0,75 hijau */
  s+='<rect x="170" y="284" width="260" height="40" rx="20" fill="#4CAF7A" stroke="#2E7D5B" stroke-width="2.5"/>';
  s+='<text x="300" y="312" text-anchor="middle" font-size="24" font-weight="800" fill="#10331F">TARGET: 0,75 KG</text>';
  /* adonan kenceng di samping: gundukan + retakan */
  s+='<circle cx="96" cy="248" r="36" fill="#E8D2A8" stroke="#C8A86E" stroke-width="2.5"/>'
   +'<circle cx="72" cy="266" r="18" fill="#DCC79C" stroke="#C8A86E" stroke-width="2"/>'
   +'<path d="M80 232 l10 10 -6 10 M96 240 l8 12" stroke="#A6394B" stroke-width="3" fill="none" stroke-linecap="round"/>';
  s+='<text x="96" y="308" text-anchor="middle" font-size="28" font-weight="800" fill="#F26D6D">kenceng!</text>';
  return s+'</svg>';
}
function svgBoard(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="ktP" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#1B1440"/><stop offset="1" stop-color="#120C2A"/></linearGradient>'
   +'<radialGradient id="glowP" cx="0.5" cy="0.5" r="0.5">'
   +'<stop offset="0" stop-color="rgba(255,243,196,.3)"/><stop offset="1" stop-color="rgba(255,243,196,0)"/></radialGradient></defs>'
   +'<rect width="600" height="340" fill="url(#ktP)"/>';
  [[70,60,1.6],[180,110,1.4],[330,60,1.8],[560,60,1.5],[60,200,1.4],[300,250,1.3],[540,250,1.6]].forEach(p=>{s+=dot(p[0],p[1],p[2],'rgba(255,246,232,.5)')});
  s+='<rect x="70" y="30" width="460" height="52" rx="14" fill="#E8B32E"/>'
   +'<text x="300" y="65" text-anchor="middle" font-size="28" font-weight="800" fill="#14100C" letter-spacing="2">LEADERBOARD · HARI 3</text>';
  const rows=[['KAMU','0,75 PAS',1],['VITA','0,75',1],['NADIA','1/3 = 0,333...',1],['GEDE','GELAS TAKAR',0]];
  rows.forEach((r,i)=>{
    const y=100+i*46, ok=r[2];
    s+='<rect x="86" y="'+y+'" width="428" height="38" rx="10" fill="'+(ok?'rgba(76,175,122,.16)':'rgba(217,58,90,.16)')+'" stroke="'+(ok?'#4CAF7A':'#D93A5A')+'" stroke-width="2"/>';
    s+='<text x="112" y="'+(y+28)+'" font-size="25" font-weight="800" fill="#FFF6E8">'+r[0]+'</text>';
    if(ok){ s+='<path d="M'+'212,'+(y+19)+' l7 8 13 -16" stroke="#4CAF7A" stroke-width="4.5" fill="none" stroke-linecap="round"/>'; }
    else { s+='<line x1="206" y1="'+(y+11)+'" x2="228" y2="'+(y+28)+'" stroke="#D93A5A" stroke-width="4.5" stroke-linecap="round"/>'
             +'<line x1="228" y1="'+(y+11)+'" x2="206" y2="'+(y+28)+'" stroke="#D93A5A" stroke-width="4.5" stroke-linecap="round"/>'; }
    s+='<text x="252" y="'+(y+28)+'" font-family="JetBrains Mono, DejaVu Sans Mono, monospace" font-size="25" font-weight="700" fill="'+(ok?'#A8E6C3':'#FFB3B3')+'">'+r[1]+'</text>';
  });
  s+='<g transform="rotate(-1 300 306)">'
   +'<rect x="100" y="284" width="400" height="44" rx="12" fill="#241A3E" stroke="#E8B32E" stroke-width="2.5"/>'
   +'<text x="300" y="314" text-anchor="middle" font-size="24" font-weight="800" fill="#F2C14E">BESOK: PECAHAN × DESIMAL</text></g>';
  return s+'</svg>';
}
const SVGS={papan:svgPapan,timbang:svgTimbang,board:svgBoard};
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

/* ---------- pesan RP VIDEO 19 (dunia GRUP RESEP GAGAL, chara OC):
   SKEMA BARU (rev19, permintaan pemilik: tiap episode alur/skema/method
   HARUS beda dari episode sebelumnya). Bukan lagi "post viral -> debat ->
   akun misterius"; sekarang: TANTANGAN DAPUR HARI 3 - papan tantangan
   (jam 4 sore) -> GEDE sombong pecahan, takar pakai GELAS TAKAR (volume,
   bukan berat) -> GAGAL (LCD 0,40) -> VITA kenalkan METODE GARIS UKUR
   0->1 (pita ukur + pin geser: metode visual BARU, bukan chips/kartu)
   -> konversi 3/4 = 0,75, sisa 0,35 (koma dibaca, bukan ditebak)
   -> MAGHRIB -> sticker kartu latihan -> 1/3 tak pernah pas (desimal
   berulang) -> JAM 7 MALAM uji rasa ("malam ini tuntas" BARU di malam,
   konsisten!) -> kasus kalkulator 1/3 x 3 = 0,999999 -> 0,999... menempel
   di 1 -> AKUN TANTANGAN (bukan orang misterius: akun resmi) post
   LEADERBOARD + teaser besok. SUARA UNIK per chara + SAPAAN ALAMI
   (rev20, anti gabungan kata buatan): GEDE (bu/neng), VITA (akang/kak),
   KAMU (bang/kak), NADIA (pak gede/semuanya/ibu/omak). Angka
   terverifikasi kode: 0,75-0,40=0,35; 3/4=0,75; 1/3=0,333...;
   1/3 x 3 = 0,999... = 1 (LCD 6 digit 0,999999); koma1=persepuluhan,
   koma2=perseratusan; gelas takar=volume, timbangan=berat.
   rev14-18 tetap: bahasa sopan, nol emoji, stempel jam nyambung kartu
   babak, voice acting 5 chara, timeline satu sumber, intro film rev18. ---------- */
const MSGS=[
  {t0:TM.m[0], who:'NADIA', stamp:'16.00', kind:'photo', svg:'papan', cap:'TANTANGAN DAPUR HARI 3: SEMUA TAKARAN WAJIB DESIMAL'},
  {t0:TM.m[1], who:'GEDE', stamp:'16.01', text:'*sibuk manggil* weh bu, ini serius toh? gue mah jago pecahan dari sd. koma-komaan mah buat yang gak ngerti pecahan doang'},
  {t0:TM.m[2], who:'KAMU', stamp:'16.02', text:'bang, timbangan digital cuma ngerti koma. ya pecahannya yang harus jadi desimal'},
  {t0:TM.m[3], who:'NADIA', stamp:'16.03', text:'santai pak gede, santai semuanya. yang kalah dapurnya dicap gagal takar. ibu udah siapin timbangan buat semua'},
  {t0:TM.m[4], who:'GEDE', stamp:'16.14', text:'oke gue mulai duluan. 3/4 kg terigu, kan? gue takar pake gelas takar aja. gampang'},
  {t0:TM.m[5], who:'KAMU', stamp:'16.15', text:'bang, gelas takar ngukur volume, timbangan ngukur berat. 3/4 gelas sama 0,75 kg itu dua cerita beda'},
  {t0:TM.m[6], who:'VITA', stamp:'16.16', text:'bener, kak. makanya resep resmi ditulis desimal. 3/4 kg itu pas 0,75 kg di timbangan. angkanya dibaca, bukan ditebak'},
  {t0:TM.m[7], who:'GEDE', stamp:'16.26', kind:'photo', svg:'timbang', cap:'TIMBANGAN BILANG 0,40. PADAHAL GUE YAKIN UDAH 3/4'},
  {t0:TM.m[8], who:'VITA', stamp:'16.28', text:'0,40 itu belum nyampe setengah, akang. liat garis ukurnya: 0,75 itu posisi 3/4 jalan. kurangnya 0,35 kg'},
  {t0:TM.m[9], who:'GEDE', stamp:'16.30', text:'haduh, neng, singketin dong. jadi gue kurang berapa persisnya?'},
  {t0:TM.m[10], who:'KAMU', stamp:'16.31', text:'kurang 0,35 kg, bang. tinggal tambah terigu ampe angkanya naik dari 0,40 ke 0,75. angka koma itu dibaca, bukan ditebak'},
  {t0:TM.m[11], who:'GEDE', stamp:'16.33', text:'*nambahin terigu pelan-pelan* weee bener, adonannya lunyer. oke, gue akui. garis ukur neng itu menang telak dari gelas takar gue'},
  {t0:TM.m[12], who:'VITA', stamp:'18.04', kind:'sticker', stk:'GARIS UKUR 0 → 1', stks:'0,5 tengah jalan · 0,75 tiga per empat · 1/3 = 0,333... jalan terus'},
  {t0:TM.m[13], who:'NADIA', stamp:'18.05', text:'nah, sekarang bagian yang serem: karamel omak minta 1/3 sdt garam. timbangan cuma nampilin 0,333. siapa berani?'},
  {t0:TM.m[14], who:'KAMU', stamp:'18.07', text:'aku coba, kak. 1/3 di garis ukur jalan terus, tapi gak pernah berhenti pas di satu titik. 0,3... 0,33... 0,333... makin panjang makin deket, tapi gak pernah nyampe'},
  {t0:TM.m[15], who:'VITA', stamp:'18.09', text:'betul, itu desimal berulang. angka 3-nya diulang tanpa ujung... titik-titiknya tandanya polanya lanjut terus'},
  {t0:TM.m[16], who:'GEDE', stamp:'19.02', text:'*cicip karamel* malam ini tuntas. tapi ada yang ngganjel: kalkulator gue 1/3 × 3 jawabannya 0,999999. bukan 1?! apa garam gue kelebihan?'},
  {t0:TM.m[17], who:'VITA', stamp:'19.04', text:'gak kelebihan, akang. layarnya gak muat semua angka. 0,999 terus-terusan itu di garis ukur nempel persis di angka 1. beda tulisan, nilainya sama'},
  {t0:TM.m[18], who:'MYST', stamp:'19.06', kind:'photo', svg:'board', cap:'LEADERBOARD HARI 3: 4 DAPUR LULUS, 1 GAGAL TAKAR'},
  {t0:TM.m[19], who:'MYST', stamp:'19.08', text:'hari 3 resmi ditutup. catatan buat besok: pecahan melawan desimal, satu timbangan. yang menang tetep yang bisa baca koma'}
];

/* divider bab gaya kartu waktu RP (bukan label pelajaran); jam nyambung
   dengan stempel chat: 16.00 (papan) -> 16.14 (GILIRAN GEDE) ->
   16.26 (GAGAL TAKAR) -> 18.04 (MAGHRIB) -> 19.02 (JAM 7 MALAM);
   waktu semua kartu dari TM (rev15, label rev19) */
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
   meme (rev14: ganti emoji comot), mata menyala (GEDE), digit desimal
   naik (VITA). Label waktu tetap dari DIVS (hukum kartu). ---------- */
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
    ['0,40','0,35','0,75'].forEach((c,j)=>{
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
  sub.textContent=['GRUP RESEP GAGAL','GEDE TAKAR PAKAI GELAS','TIMBANGAN BILANG 0,40',
    'SESANI MAGHRIB','UJI RASA MALAM'][i];
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

/* ---------- tiga DIAGRAM MENYALA rev19: METODE GARIS UKUR (pita ukur
   0->1 dengan pin geser - model visual BARU, bukan chips/kartu/tangga
   episode lain); waktu slot dari TM.flash ---------- */
const FLASHES=[
  {t0:TM.flash[0][0],t1:TM.flash[0][1],kick:'GARIS UKUR',title:'0,75 = 3/4 JALAN',en:'0.40 never even reached halfway!',
   ruler:'dual',
   lines:['0,40 belum setengah jalan · 0,75 = 3/4 jalan'],
   notes:['KOMA PERTAMA = PERSEPULUHAN','KOMA KEDUA = PERSERATUSAN']},
  {t0:TM.flash[1][0],t1:TM.flash[1][1],kick:'DESIMAL BERULANG',title:'1/3 TAK PERNAH PAS',en:'closer and closer... never lands',
   ruler:'loop',
   lines:['1/3 = 0,333... digit 3 tanpa ujung'],
   notes:['POLANYA BALIK TERUS: 3 · 3 · 3 · 3','TIGA TITIK (...) = JALAN TERUS']},
  {t0:TM.flash[2][0],t1:TM.flash[2][1],kick:'TWIST KALKULATOR',title:'0,999... MENEMPEL DI 1',en:'0.999 forever is exactly 1!',
   ruler:'end',
   lines:['1/3 × 3 = 0,999999 di layar kalkulator'],
   notes:['LAYAR CUMA MUAT SEGITU DIGIT','0,999... TANPA UJUNG = 1 PERSIS']}
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
/* GARIS UKUR rev19: pita ukur 0->1, ticks 10 langkah, fill gradien,
   pin geser + label angka, mark merah penanda 0,40, angka sumbu 0/0,5/1 */
function mkRuler(){
  const wrap=document.createElement('div');
  wrap.style.cssText+='display:flex;flex-direction:column;align-items:center;width:100%;';
  const band=document.createElement('div');
  band.className='rband';
  band.style.cssText+=`width:${ORIENT==='portrait'?Math.round(W*0.82):Math.round(W*0.58)}px;`;
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
  nums.style.cssText+=`width:${ORIENT==='portrait'?Math.round(W*0.82):Math.round(W*0.58)}px;`;
  ['0','0,5','1'].forEach((sv,i)=>{
    const el=document.createElement('div');
    el.textContent=sv;
    el.style.cssText+=`position:absolute;left:${[0,50,100][i]}%;transform:translateX(-50%);`;
    nums.appendChild(el);
  });
  wrap.appendChild(band);
  wrap.appendChild(nums);
  return {wrap,fill,mark,pin,lbl};
}
const FLASHBODY=FLASHES.map(f=>{
  const w=document.createElement('div');
  w.style.cssText+='display:none;flex-direction:column;align-items:center;gap:inherit;width:100%;';
  const R=mkRuler();
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
  const chars=['0,4','0,75','0,333','0,999','0,35','1/3'];
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
const SOAL=['UBAH 3/4 KE DESIMAL.','0,40 + 0,35 = ?','MANA YANG BERULANG?','0,999... = ?'];
const qrowsEl=document.getElementById('qrows');
const UJIS=SOAL.map((s,i)=>{
  const r=document.createElement('div');
  r.className='qrow';
  r.style.cssText+=`font-size:${ORIENT==='portrait'?40:34}px;margin-top:${ORIENT==='portrait'?10:6}px;`;
  r.innerHTML='<b>'+(i+1)+'.</b> '+s;
  qrowsEl.appendChild(r);
  return {el:r,t0:TM.quiz[0]+2.3+i*0.16};
});
const UJIVAL=['3/4','0,75','0,40','0,35','1/3','0,333...','0,999...','1'];
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
qnoteEl.textContent='KARTU BANTU DARI AKUN TANTANGAN';
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
