#!/usr/bin/env python3
"""Patch frag_core.js + frag_head.html: VIDEO 18 - dunia baru GRUP JAGA
GUDANG (inventaris malam), bahan blog Yuyanaka 'Bilangan' (Nov 2026).
Skenario rev21: papan inventaris 23.30 -> stok 96 pas (jumlah) -> bagi rata
30 kotak (pembagian/pecahan) -> freezer -5 (minus) + garis bilangan ->
pertanyaan PUSAT 'dibuat atau ditemukan?' -> polling 52/48 -> teaser rak
cacah. 24 pesan, 3 SVG dunia (papan/freezer/poll), stiker jurus, 3 diagram
menyala (numline/vote/duo), kuis 2 soal + 8 kartu bantu."""
from pathlib import Path

HERE = Path("/home/z/my-project/scripts/vimoda18rp")


def patch(fn, pairs):
    p = HERE / fn
    t = p.read_text()
    ok = 0
    for old, new in pairs:
        if old not in t:
            assert new in t, f"{fn}: OLD & NEW absen: {old[:72]!r}"
            continue  # sudah diterapkan sebelumnya
        assert t.count(old) == 1, f"{fn}: TIDAK UNIK: {old[:72]!r}"
        t = t.replace(old, new)
        ok += 1
    p.write_text(t)
    print(f"{fn}: {ok} patch ok")


HEAD_COMMENT = """/* ---------- MALAM INVENTARIS (VIDEO 18): data & elemen format RP
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
   (kak/om/anak/omak/om) supaya tiap tokoh punya suara sendiri. ---------- */"""

NEW_CAST = """const CAST={
  OMAK:{name:'OMAK',bg:'radial-gradient(circle,#F26D6D 58%,#D93A5A)',col:'#FFB3B3'},
  GILANG:{name:'GILANG',bg:'radial-gradient(circle,#4CAF7A 58%,#2E7D5B)',col:'#A8E6C3'},
  RUPI:{name:'RUPI',bg:'radial-gradient(circle,#8E7CD8 55%,#6A5ACD)',col:'#D9C6FF'},
  KAMU:{name:'KAMU',bg:'radial-gradient(circle,#C9556B 55%,#A6394B)',col:'#D9C6FF'},
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
};"""

WORLD_COMMENT = """/* ---------- ilustrasi dunia VIDEO 18 (SVG foto chat, digambar serius)
   Tiga foto "asli dari dunia GRUP JAGA GUDANG": papan klip MALAM
   INVENTARIS (hitung ulang rak, catat jumlah, suhu freezer, stempel
   23.30 malam), laporan TERMOMETER FREEZER DEDI (LCD -5, di bawah nol),
   dan hasil VOTING TENGAH MALAM dari GUDANG PUSAT (52% ditemukan, 48%
   dibuat, teaser rak cacah). Semua deterministik. ---------- */"""

PAPAN_NEW = """  s+='<text x="300" y="86" text-anchor="middle" font-size="30" font-weight="800" fill="#3A2C1E" letter-spacing="3">MALAM INVENTARIS</text>';
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
  s+='<text x="300" y="318" text-anchor="middle" font-size="28" font-weight="600" fill="#8A6A46">@gudangpusat · papan inventaris malam</text>';"""

FREEZER_SVG = """function svgFreezer(){
  let s='<svg class="psvg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">'
   +'<defs><linearGradient id="ktF" x1="0" y1="0" x2="0" y2="1">'
   +'<stop offset="0" stop-color="#182231"/><stop offset="1" stop-color="#0C1320"/></linearGradient></defs>'
   +'<rect width="600" height="340" fill="url(#ktF)"/>';
  [[90,40,1.6],[520,50,1.4],[60,290,1.5],[550,280,1.6],[300,30,1.3],[480,170,1.2]].forEach(p=>{s+=dot(p[0],p[1],p[2],'rgba(255,246,232,.45)')});
  s+='<text x="300" y="56" text-anchor="middle" font-size="28" font-weight="800" fill="#F2C14E">TERMOMETER FREEZER · LAPORAN SATPAM</text>';
  /* kabinet freezer + layar */
  s+='<rect x="130" y="80" width="300" height="180" rx="16" fill="#101A26" stroke="#2A3A50" stroke-width="2.5"/>';
  s+='<rect x="150" y="100" width="260" height="140" rx="10" fill="#0B1220"/>';
  s+='<rect x="176" y="122" width="208" height="72" rx="10" fill="#0A0F1C" stroke="rgba(185,166,255,.55)" stroke-width="2"/>';
  s+='<text x="280" y="176" text-anchor="middle" font-family="JetBrains Mono, DejaVu Sans Mono, monospace" font-size="50" font-weight="800" fill="#B9A6FF">-5\\u00b0</text>';
  s+='<rect x="392" y="92" width="14" height="128" rx="7" fill="#F7C948" stroke="#C8A86E" stroke-width="1.6"/>';
  /* garis bilangan mini: nol tengah, kursi -5 menyala di bawah nol */
  s+='<rect x="92" y="292" width="416" height="14" rx="7" fill="#1B2433" stroke="rgba(185,166,255,.5)" stroke-width="2"/>';
  s+='<line x1="300" y1="284" x2="300" y2="314" stroke="#4CAF7A" stroke-width="3.5"/>';
  s+='<text x="300" y="278" text-anchor="middle" font-size="20" font-weight="800" fill="#4CAF7A">0</text>';
  s+='<circle cx="184" cy="299" r="9" fill="#FF6B6B" stroke="#FFF6E8" stroke-width="2"/>'
   +'<text x="184" y="276" text-anchor="middle" font-size="22" font-weight="800" fill="#FF6B6B">-5</text>';
  s+='<rect x="356" y="238" width="248" height="0" fill="none"/>';
  s+='<rect x="170" y="240" width="260" height="40" rx="20" fill="#4CAF7A" stroke="#2E7D5B" stroke-width="2.5"/>'
   +'<text x="300" y="268" text-anchor="middle" font-size="24" font-weight="800" fill="#10331F">DI BAWAH NOL = MINUS</text>';
  return s+'</svg>';
}"""

POLL_SVG = """function svgPoll(){
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
const SVGS={papan:svgPapan,freezer:svgFreezer,poll:svgPoll};"""

SCHEME_COMMENT = """/* ---------- pesan RP VIDEO 18 (dunia GRUP JAGA GUDANG, chara OC):
   SKEMA BARU (rev21, permintaan pemilik: tiap episode alur/skema/method
   HARUS beda dari episode sebelumnya). Bukan lagi "tantangan dapur +
   gelas takar"; sekarang: MALAM INVENTARIS GUDANG - papan akun resmi
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
   sumber, intro film rev18. ---------- */"""

MSGS_NEW = """const MSGS=[
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
];"""

FLASHES_NEW = """const FLASHES=[
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
];"""

SUBS_NEW = """  sub.textContent=['GRUP JAGA GUDANG','RAK PERTAMA','BAGI RATA KUE',
    'JAM 12 MALAM','PERTANYAAN PUSAT'][i];"""

DIGITS_NEW = "    ['96','30','-5'].forEach((c,j)=>{"

QUIZ_NEW_SOAL = "const SOAL=['30 KOTAK BAGI 6 PEDAGANG, BERAPA BAGIAN?','-5 KURSINYA DI ATAS ATAU BAWAH NOL?'];"
QUIZ_NEW_VAL = "const UJIVAL=['30','6','5','4','28','2','-5','0'];"
QUIZ_NOTE = "qnoteEl.textContent='KARTU BANTU DARI GUDANG PUSAT';"
RISES_NEW = "  const chars=['24','96','30','-5','1/2','2+2'];"
DOODLE_NEW = "  const chars=['24','96','30','-5','1/2','2+2','52%','48%'];"
SEED_NEW = "const rnd = mulberry32(181126);"

MKRULER_NEW = """/* GARIS BILANGAN rev21: tiga varian visual per diagram - numline (garis
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
      el.style.cssText+=`position:absolute;left:${[0,25,50,75,100][i]}%;transform:translateX(-50%);`;
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
});"""

HEAD_PAIRS = [
    ("""/* GRUP RESEP GAGAL - VIDEO 17, MODEL FOKUS ala referensi chat story (rev13)
   Pemilik upload referensi TikTok chat story: latar hitam pekat, SATU
   bubble besar di tengah per saat (fokus penuh ke pesan), bubble gaya
   WhatsApp (putih untuk anggota, hijau untuk KAMU, waktu + Dibaca v-v
   DI DALAM bubble), dan sisipan reaksi meme (hard cut, zoom lambat,
   mata menyala, shake) di antara babak. Model ini jadi hukum seri baru:
   MODEL FOKUS. Warisan terkunci tetap jalan: tanpa indikator pengetikan,
   20 pesan utuh jeda lega, dialog 60px, dialog manusiawi tanpa kalimat
   tema dan tanpa label di ucapan, alur rantai sebab-akibat tertutup,
   diagram menyala, papan soal milik ???, teaser lanjutan. Materi:
   bilangan desimal (blog Yuyanaka, Nov 2026). Watermark AKIOMIDA tetap
   di posisi tinggi (2x jarak awal) permintaan pemilik. */""",
     """/* GRUP JAGA GUDANG - VIDEO 18, MODEL FOKUS ala referensi chat story (rev13)
   Pemilik upload referensi TikTok chat story: latar hitam pekat, SATU
   bubble besar di tengah per saat (fokus penuh ke pesan), bubble gaya
   WhatsApp (putih untuk anggota, hijau untuk KAMU, waktu + Dibaca v-v
   DI DALAM bubble), dan sisipan reaksi meme (hard cut, zoom lambat,
   mata menyala, shake) di antara babak. Model ini jadi hukum seri baru:
   MODEL FOKUS. Warisan terkunci tetap jalan: tanpa indikator pengetikan,
   pesan utuh jeda lega, dialog 60px, dialog manusiawi tanpa kalimat
   tema dan tanpa label di ucapan, alur rantai sebab-akibat tertutup,
   diagram menyala, papan misi milik akun resmi, teaser lanjutan. Materi:
   BILANGAN (blog Yuyanaka, Nov 2026) - jumlah, pembagian, minus, dan
   pertanyaan diciptakan atau ditemukan. Dunia baru: gudang malam.
   Watermark AKIOMIDA tetap di posisi tinggi permintaan pemilik. */"""),
    ('<div class="fkick" id="fkick">GARIS UKUR</div>',
     '<div class="fkick" id="fkick">GARIS BILANGAN</div>'),
    ('<div class="qhd" id="qhd">MISI DARI AKUN TANTANGAN</div>',
     '<div class="qhd" id="qhd">MISI DARI GUDANG PUSAT</div>'),
    ('<div class="qcta" id="qcta">JAWAB MISI HARI 4 DI KOMENTAR YA!</div>',
     '<div class="qcta" id="qcta">TULIS JAWABANMU DI KOMENTAR YA!</div>'),
    ('<div id="introtitle">GRUP RESEP GAGAL</div>',
     '<div id="introtitle">GRUP JAGA GUDANG</div>'),
]

CORE_PAIRS = [
    ("""/* ---------- TANTANGAN DAPUR HARI 3 (VIDEO 19): data & elemen format RP
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
   bu/ibu/omak) supaya tiap tokoh punya suara sendiri. ---------- */""",
     HEAD_COMMENT),
    (SEED_NEW.replace('181126', '171124'), SEED_NEW),
    ("  const chars=['0,5','0,25','0,75','1/3','0,333','0,40','0,35','0,999'];",
     DOODLE_NEW),
    ("""const CAST={
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
};""",
     NEW_CAST),
    ("""/* ---------- ilustrasi dunia VIDEO 19 (SVG foto chat, digambar serius)
   Tiga foto "asli dari dunia GRUP RESEP GAGAL": papan klip TANTANGAN
   DAPUR HARI 3 (semua takaran wajib desimal, hakim timbangan digital,
   stempel 16.00 sore), tangkapan timbangan digital GAGAL TAKAR (LCD
   0,40 merah vs target 0,75 kg, adonan kenceng), dan LEADERBOARD HARI 3
   dari akun tantangan (4 dapur lulus, 1 gagal, teaser besok). Semua
   deterministik. ---------- */""",
     WORLD_COMMENT),
    ("""  s+='<text x="300" y="86" text-anchor="middle" font-size="30" font-weight="800" fill="#3A2C1E" letter-spacing="3">TANTANGAN DAPUR</text>';
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
  s+='<text x="300" y="318" text-anchor="middle" font-size="28" font-weight="600" fill="#8A6A46">@omaknadia · papan tantangan harian</text>';""",
     PAPAN_NEW),
    ("""function svgTimbang(){
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
const SVGS={papan:svgPapan,timbang:svgTimbang,board:svgBoard};""",
     FREEZER_SVG + "\n" + POLL_SVG),
    ("""/* ---------- pesan RP VIDEO 19 (dunia GRUP RESEP GAGAL, chara OC):
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
];""",
     SCHEME_COMMENT + "\n" + MSGS_NEW),
    ("""  sub.textContent=['GRUP RESEP GAGAL','GEDE TAKAR PAKAI GELAS','TIMBANGAN BILANG 0,40',
    'SESANI MAGHRIB','UJI RASA MALAM'][i];""",
     SUBS_NEW),
    ("    ['0,40','0,35','0,75'].forEach((c,j)=>{", DIGITS_NEW),
    ("""const FLASHES=[
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
];""",
     FLASHES_NEW),
    ("""/* GARIS UKUR rev19: pita ukur 0->1, ticks 10 langkah, fill gradien,
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
  w.appendChild(R.wrap);""",
     MKRULER_NEW),
    ("const SOAL=['UBAH 3/4 KE DESIMAL.','0,40 + 0,35 = ?','MANA YANG BERULANG?','0,999... = ?'];",
     QUIZ_NEW_SOAL),
    ("const UJIVAL=['3/4','0,75','0,40','0,35','1/3','0,333...','0,999...','1'];",
     QUIZ_NEW_VAL),
    ("qnoteEl.textContent='KARTU BANTU DARI AKUN TANTANGAN';", QUIZ_NOTE),
    ("  const chars=['0,4','0,75','0,333','0,999','0,35','1/3'];", RISES_NEW),
]

patch("frag_core.js", CORE_PAIRS)
patch("frag_head.html", HEAD_PAIRS)
print("core patch selesai")
