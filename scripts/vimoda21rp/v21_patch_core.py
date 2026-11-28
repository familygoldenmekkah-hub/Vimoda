#!/usr/bin/env python3
"""Patch core: frag_core.js untuk VIDEO 21 dunia GRUP RESEP GAGAL
(bahan bilangan di dapur), desain GLOW v3, formula F1-F8. Metode span."""
from pathlib import Path

HERE = Path("/home/z/my-project/scripts/vimoda21rp")


def span(t, start, end, new):
    i = t.index(start)
    j = t.index(end, i)
    return t[:i] + new + t[j + len(end):]


HEAD_COMMENT = """/* ---------- RESEP GAGAL (VIDEO 21): data & elemen format RP
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
   (kak/rar/kak Rara/Rara). ---------- */"""

NEW_CAST = """const CAST={
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
};"""

WORLD_COMMENT = """/* ---------- ilustrasi dunia VIDEO 21 (SVG foto chat, gaya GLOW v3:
   kartu terang + band gradien + titik warna, NOL panel gelap). Empat
   foto "asli dari dunia GRUP RESEP GAGAL": papan resep minggu ini
   (brownies 4 porsi: 200 gram, 2 telur, 250 ml, 180 derajat, 5 langkah),
   papan takaran (200 gram resep vs 20 gram yang dipakai Rara, kurang
   satu nol), papan resep dobel (4 -> 8 porsi, semua angka dua kali
   lipat), dan hasil VOTING DAPUR (58% salah takaran, 42% salah urutan,
   teaser pecahan 1/2 sendok teh). Semua deterministik. ---------- */"""

SVG_ALL = """const PALS=['#FF6B8A','#FFC94D','#4DD6A8','#5BA8F5','#9B7BF5'];
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
const SVGS={papan:svgPapan,takaran:svgTakaran,dobel:svgDobel,poll:svgVoting};"""

SCHEME_MSGS = """/* ---------- pesan RP VIDEO 21 (dunia GRUP RESEP GAGAL):
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
];"""

FLASHES_NEW = """const FLASHES=[
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
];"""

MKRULER_NEW = """/* DIAGRAM MENYALA rev24 (GLOW v3): tiga varian - boxes (deretan kartu
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
});"""

p = HERE / "frag_core.js"
t = p.read_text()
t = span(t, "/* ---------- LARI PAGI (VIDEO 20)", "Sapaan unik per chara (kak/bang/bu). ---------- */", HEAD_COMMENT)
t = span(t, "const rnd = mulberry32(200601);", "mulberry32(200601);", "const rnd = mulberry32(210615);")
t = span(t, "  const chars=['40','13','1','41','2','3','1-40','1-2-3'];", "'1-40','1-2-3'];", "  const chars=['200','20','2x','1-5','180','400','1/2','3x'];")
t = span(t, "    const cols=['#FF8787','#FFD43B','#63E6BE','#74C0FC'];", "'#74C0FC'];", "    const cols=['#FF6B8A','#FFC94D','#4DD6A8','#5BA8F5'];")
t = span(t, "/* ---------- cast RP dunia GRUP PANITIA LARI PAGI", "label pendek ala username. ---------- */",
         "/* ---------- cast RP dunia GRUP RESEP GAGAL (chara OC bernama ala RP\n   Telegram/TikTok gen Z; dunia video ini sendiri, tidak dibawa ulang).\n   Avatar bulat dengan IKON SVG digambar custom per chara (bukan emoji\n   comot); label pendek ala username. ---------- */")
t = span(t, "const CAST={", "const SVGS={papan:svgPapan,peserta:svgPeserta,podium:svgPodium,poll:svgPoll};", NEW_CAST + "\n\n" + WORLD_COMMENT + "\n" + SVG_ALL)
t = span(t, "/* ---------- pesan RP VIDEO 20", "salam satu lintasan, anak-anak'}\n];", SCHEME_MSGS)
t = span(t, "  sub.textContent=['GRUP PANITIA LARI PAGI','KARTU 1-40','JUARA 1-2-3',\n    'NOMOR 13 TETEP ADA','VOTING PUSAT'][i];", "'VOTING PUSAT'][i];", "  sub.textContent=['GRUP RESEP GAGAL','TAKARAN 200','LANGKAH 1-5',\n    'DOBEL PORSI','VOTING DAPUR'][i];")
t = span(t, "    ['40','13','1'].forEach((c,j)=>{", "].forEach((c,j)=>{", "    ['200','20','1'].forEach((c,j)=>{")
t = span(t, "const FLASHES=[", "BESOK: JUMLAH 1 SAMPAI 100']}\n];", FLASHES_NEW)
t = span(t, "/* DIAGRAM MENYALA rev23 (PAGI CERIA): tiga varian", "return {w,R,lines,notes,f};\n});", MKRULER_NEW)
t = span(t, "const SOAL=['40 PELARI DARI NOMOR 1, YANG TERAKHIR NOMOR BERAPA?','SETELAH 40 ADA BILANGAN BERAPA?'];", "ADA BILANGAN BERAPA?'];", "const SOAL=['RESEP 4 PORSI MAU JADI 8: 200 GRAM JADI BERAPA GRAM?','RESEP 2 TELUR MAU JADI 8 PORSI: BUTUH BERAPA TELUR?'];")
t = span(t, "const UJIVAL=['40','41','39','13','1','2','3','14'];", "'2','3','14'];", "const UJIVAL=['400','4','8','2','200','600','12','5'];")
t = span(t, "qnoteEl.textContent='KARTU BANTU DARI PANITIA PUSAT';", "PANITIA PUSAT';", "qnoteEl.textContent='KARTU BANTU DARI DAPUR PUSAT';")
t = span(t, "  const chars=['40','41','1','13','1-40','1-2-3'];", "'1-40','1-2-3'];", "  const chars=['200','20','2x','1-5','400','1/2'];")
t = span(t, "/* divider bab gaya kartu waktu RP (bukan label pelajaran); jam nyambung", "waktu semua kartu dari TM (rev15, rev23) */",
         "/* divider bab gaya kartu waktu RP (bukan label pelajaran); jam nyambung\n   dengan stempel chat malam dapur: 19.12 (papan resep) -> 19.20 (CEK\n   TAKARAN) -> 19.24 (PAPAN TAKARAN) -> 19.33 (RESEP DOBEL) ->\n   19.44 (VOTING DAPUR); waktu semua kartu dari TM (rev15, rev24) */")
t = span(t, "   layar + label GRUP PANITIA LARI PAGI saja) lalu kartu produksi", "GRUP PANITIA LARI PAGI saja) lalu kartu produksi",
         "   layar + label GRUP RESEP GAGAL saja) lalu kartu produksi")
p.write_text(t)
print("frag_core.js: span surgery ok")
