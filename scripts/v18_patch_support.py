#!/usr/bin/env python3
"""Patch frag_render.js + voice/timeline/audio/qa/gen_meme/embed untuk
VIDEO 18 (GRUP JAGA GUDANG)."""
from pathlib import Path

HERE = Path("/home/z/my-project/scripts/vimoda18rp")


def patch(fn, pairs):
    p = HERE / fn
    t = p.read_text()
    ok = 0
    for old, new in pairs:
        if old not in t:
            assert new in t, f"{fn}: OLD & NEW absen: {old[:70]!r}"
            continue
        assert t.count(old) == 1, f"{fn}: TIDAK UNIK: {old[:70]!r}"
        t = t.replace(old, new)
        ok += 1
    p.write_text(t)
    print(f"{fn}: {ok} patch ok")


# ---------- frag_render.js ----------
RENDER_PAIRS = [
    ("""/* ---------- KOMA TAK BERUJUNG rev16: render per frame, MODEL FOKUS""",
     """/* ---------- MALAM INVENTARIS rev21: render per frame, MODEL FOKUS"""),
    ("""    /* GARIS UKUR rev19: pin geser + fill + label angka per mode */
    const R=body.R;
    const mode=fOn.ruler;
    let frac=0,lbl='',col='#F2C14E',lvo=0;
    if(mode==='dual'){
      const p1=seg(t,fOn.t0+0.35,0.8);
      if(t<fOn.t0+1.55){ frac=0.40*eio(p1); lbl='0,40'; col='#FF6B6B'; lvo=p1; }
      else{
        const p2=eio(seg(t,fOn.t0+1.55,0.9));
        frac=0.40+(0.75-0.40)*p2; lbl='0,75'; col='#F2C14E'; lvo=1;
      }
    }else if(mode==='loop'){
      const sp=(t-fOn.t0-0.45)/0.85;
      const si=clamp(Math.floor(sp),0,2);
      const steps=[[0.30,'0,3'],[0.33,'0,33'],[0.333,'0,333...']];
      frac=steps[si][0]; lbl=steps[si][1]; col='#B9A6FF';
      if(sp>2){ frac=0.333+0.0007*Math.sin((t-fOn.t0)*6.2); } /* merayap, tak pernah pas */
      lvo=1;
    }else{
      frac=0.999*eio(seg(t,fOn.t0+0.5,1.7)); lbl='0,999...'; col='#F2C14E'; lvo=1;
    }
    const pct=(clamp(frac,0,0.999)*100).toFixed(2)+'%';
    R.fill.style.width=pct;
    R.pin.style.left=pct;
    R.lbl.style.left=pct;
    R.lbl.textContent=lbl;
    R.lbl.style.color=col;
    R.lbl.style.opacity=(lvo*clamp(seg(t,fOn.t0+0.35,0.5),0,1)).toFixed(3);
    if(mode==='dual'){
      R.mark.style.left='40%';
      R.mark.style.opacity=(t>fOn.t0+1.55?0.95:0).toFixed(3);
    }else{
      R.mark.style.opacity='0';
    }""",
     """    /* GARIS BILANGAN rev21: animasi per varian (numline/vote/duo) */
    const R=body.R;
    const mode=fOn.ruler;
    if(mode==='numline'){
      const p1=eio(seg(t,fOn.t0+0.45,0.9));
      const pct=((50-16.7*p1)).toFixed(2)+'%';   /* pin meluncur 0 -> -5 */
      R.fill.style.left='33.3%';
      R.fill.style.width='16.7%';
      R.fill.style.opacity=p1.toFixed(3);
      R.pin.style.left=pct;
      R.lbl.style.left=pct;
      R.lbl.textContent='-5';
      R.lbl.style.color='#FF6B6B';
      R.lbl.style.opacity=clamp(seg(t,fOn.t0+0.6,0.5),0,1).toFixed(3);
      R.mark.style.left='33.3%';
      R.mark.style.opacity=(p1>0.6?0.95:0).toFixed(3);
    }else if(mode==='vote'){
      const p1=eio(seg(t,fOn.t0+0.5,0.9));
      R.A.fill.style.width=(R.A.pct*100*p1).toFixed(2)+'%';
      R.B.fill.style.width=(R.B.pct*100*eio(seg(t,fOn.t0+0.75,0.9))).toFixed(2)+'%';
      const vo=clamp(seg(t,fOn.t0+0.9,0.5),0,1);
      R.A.pv.textContent='52%';
      R.B.pv.textContent='48%';
      R.A.pv.style.opacity=vo.toFixed(3);
      R.B.pv.style.opacity=vo.toFixed(3);
    }else{ /* duo: dua lajur simbol vs isi */
      R.A.fill.style.width=(100*eio(seg(t,fOn.t0+0.45,0.8))).toFixed(2)+'%';
      R.B.fill.style.width=(100*eio(seg(t,fOn.t0+0.95,0.8))).toFixed(2)+'%';
      R.A.fill.style.opacity='0.85';
      R.B.fill.style.opacity='0.85';
    }"""),
]
patch("frag_render.js", RENDER_PAIRS)
_p = HERE / "frag_render.js"
_t = _p.read_text()
assert "who==='MYST'" in _t
_p.write_text(_t.replace("who==='MYST'", "who==='PUSAT'"))
print("frag_render: MYST->PUSAT ok")

# ---------- voice18rp.py ----------
VOICE_PAIRS = [
    ("""VOICE ACTING rev16 VIDEO 17 - generator suara 5 chara (22 klip).""",
     """VOICE ACTING rev21 VIDEO 18 - generator suara 6 chara (24 klip)."""),
    ("""Output: /tmp/voice18/mNN.mp3 + /tmp/voice18/durations.json""",
     """Output: /tmp/voice18/mNN.mp3 + /tmp/voice18/durations.json (24 klip)"""),
    ("""# (who, teks lisan) - rev16: tanda baca ekspresif (elipsis = jeda dramatis,
# seru = penekanan) supaya intonasi neural hidup; tetap sopan (aturan #39).
# rev19: skema TANTANGAN DAPUR HARI 3, sapaan unik per chara (tanpa
# "bestie"), waktu sore->maghrib->malam konsisten dengan kartu babak.
LINES = [
    ("NADIA", "Perhatian, semuanya! Tantangan hari ketiga... resmi "
              "dibuka! Semua takaran wajib desimal. Hakimnya... timbangan "
              "digital!"),
    ("GEDE", "Weh, bu... ini serius, toh? Gue mah jago pecahan dari SD. "
             "Koma-komaan mah... buat yang gak ngerti pecahan doang."),
    ("KAMU", "Bang... timbangan digital cuma ngerti koma. Ya pecahannya "
             "yang harus jadi desimal."),
    ("NADIA", "Santai, Pak Gede... santai, semuanya. Yang kalah "
              "dapurnya dicap gagal takar. Ibu udah siapin timbangan buat "
              "semua."),
    ("GEDE", "Oke, gue mulai duluan. Tiga per empat kilo terigu, kan? "
             "Gue takar pake gelas takar aja... Gampang."),
    ("KAMU", "Bang... gelas takar ngukur volume... timbangan ngukur "
             "berat. Tiga per empat gelas sama nol koma tujuh lima "
             "kilo... itu dua cerita beda."),
    ("VITA", "Bener, kak. Makanya resep resmi ditulis desimal. Tiga per "
             "empat kilo itu... pas nol koma tujuh lima di timbangan. "
             "Angkanya dibaca... bukan ditebak."),
    ("GEDE", "Ini barunya! Timbangan bilang nol koma empat nol... padahal "
             "gue yakin udah tiga per empat! Adonannya... kenceng banget."),
    ("VITA", "Nol koma empat nol itu... belum nyampe setengah, akang. "
             "Lihat garis ukurnya... nol koma tujuh lima itu posisi tiga "
             "per empat jalan. Kurangnya... nol koma tiga lima kilo."),
    ("GEDE", "Haduh, neng... singketin, dong. Jadi gue kurang berapa "
             "persisnya?"),
    ("KAMU", "Kurang nol koma tiga lima kilo, bang. Tinggal tambah "
             "terigu ampe angkanya naik dari nol koma empat nol... ke nol "
             "koma tujuh lima. Angka koma itu dibaca... bukan ditebak."),
    ("GEDE", "Wee... bener! Adonannya lunyer. Oke, gue akui. Garis ukur "
             "neng itu... menang telak dari gelas takar gue."),
    ("VITA", "Buat yang ikut dari rumah: garis ukur dari nol ke satu. "
             "Nol koma lima... tengah jalan. Nol koma tujuh lima... tiga "
             "per empat jalan."),
    ("NADIA", "Nah, sekarang bagian yang serem. Karamel omak minta "
              "sepertiga sendok teh garam. Timbangan cuma nampilin nol "
              "koma tiga tiga tiga. Siapa berani?"),
    ("KAMU", "Aku coba, kak. Sepertiga di garis ukur jalan terus... "
             "tapi gak pernah berhenti pas di satu titik. Nol koma tiga... "
             "nol koma tiga tiga... nol koma tiga tiga tiga... makin "
             "panjang makin deket, tapi gak pernah nyampe."),
    ("VITA", "Betul, itu desimal berulang. Angka tiga-nya diulang tanpa "
             "ujung... titik-titiknya tandanya polanya lanjut terus."),
    ("GEDE", "Malam ini tuntas! Tapi ada yang ngganjel: kalkulator "
             "gue... sepertiga kali tiga... jawabannya nol koma sembilan, "
             "enam kali! Bukan satu?! Apa garam gue kelebihan?"),
    ("VITA", "Gak kelebihan, akang. Layarnya gak muat semua angka. "
             "Nol koma sembilan sembilan terus itu... di garis ukur nempel "
             "persis di angka satu. Beda tulisan... nilainya sama."),
    ("MYST", "Leaderboard hari ketiga... resmi ditutup. Empat dapur "
             "lulus, satu gagal takar. Angka kalian... mulai jujur."),
    ("MYST", "Catatan buat besok... pecahan melawan desimal, satu "
             "timbangan. Yang menang tetep yang bisa baca koma."),
]""",
     """# (who, teks lisan) - rev21: skema MALAM INVENTARIS (gudang), sapaan
# unik per chara, waktu 23.30 lintas tengah malam konsisten kartu babak.
# Angka dilisankan; tetap sopan (aturan #39).
LINES = [
    ("PUSAT", "Perhatian, warga gudang! Malam inventaris... resmi dibuka! "
              "Semua hitungan wajib sah. Rak dihitung ulang. Suhu freezer "
              "wajib dibaca benar!"),
    ("GILANG", "Sore tadi gue tinggal dua belas kard, beres. Stok pasti "
               "pas... gak usah dihitung ulang. Capek doang."),
    ("KAMU", "Om Gilang... jumlah itu gak boleh ditebak. Lembar stok "
             "tulis sembilan puluh enam. Rak harus nyampe sembilan puluh "
             "enam. Dihitung... baru sah."),
    ("RUPI", "Betul, kak. Gue hitung rak satu sampai rak empat... satu "
             "per satu. Centangnya nunggu angka... bukan nunggu capek."),
    ("GILANG", "Rak satu: dua puluh empat. Rak dua: dua puluh empat. "
               "Rak tiga: dua puluh empat. Rak empat: dua puluh empat. "
               "Total... sembilan puluh enam pas?! Gue kira seratus! Kok "
               "bisa beda?"),
    ("KAMU", "Dua belas kard masuk sore... empat keluar ke toko. Lembar "
             "stok ikut diubah jadi sembilan puluh enam. Yang sah itu... "
             "yang dihitung, bukan yang diingat."),
    ("GILANG", "Aduh, oke, oke. Berarti catatan masuk-keluar itu bukan "
               "formalitas. Stok bisa beda... dari ingetan kita."),
    ("RUPI", "Iya. Jumlah itu nangkep isi gudang... bukan perasaan. "
             "Sembilan puluh enam itu sembilan puluh enam... di label apa "
             "pun... di jam berapa pun."),
    ("OMAK", "Kalau gitu omak titip: tiga puluh kotak kue... buat enam "
             "pedagang es pagi nanti. Bagiannya harus rata... anak-anak."),
    ("KAMU", "Tiga puluh bagi enam... tiap pedagang lima kotak. Pas. Gak "
             "ada sisa... gak ada yang kurang."),
    ("RUPI", "Kalau pesennya jadi tujuh orang? Tiga puluh bagi tujuh "
             "itu... empat koma dua koma lima. Kotak kue... gak bisa "
             "dipotong begitu."),
    ("GILANG", "Haduh. Ya sudah: tujuh orang kali empat kotak... dua "
               "puluh delapan. Sisa dua. Sisa punya pemilik... gak boleh "
               "hilang diam-diam."),
    ("OMAK", "Nah, gini baru paham. Omak jadi mikir... angka rata, angka "
             "sisa... angka-angka ini asalnya dari mana, ya?"),
    ("DEDI", "Laporan malam: freezer daging... minus lima derajat. Gue "
             "tulis minus lima... bukan lima doang. Itu beda jauh."),
    ("KAMU", "Betul, om Dedi. Minus itu alamat... di bawah nol. Kalau "
             "dicatat lima doang... besoknya daging jadi masalah."),
    ("RUPI", "Di garis bilangan, nol itu tengah. Naik ke satu, dua, "
             "tiga... turun ke minus satu, minus dua... sampai minus "
             "lima. Kursi minus lima ada... lima langkah di bawah nol."),
    ("GILANG", "Gitu ya. Berarti minus bukan hiasan... itu alamat. Salah "
               "alamat... daging basi."),
    ("RUPI", "Buat yang baru ikut jaga: jurus hitung jujur. Hitung "
             "ulang... catat masuk-keluar... dan baca minus pelan-pelan."),
    ("PUSAT", "Pertanyaan tengah malam. Gudang tutup... lampu mati... "
              "gak ada yang nonton. Dua tambah dua tetap empat, gak? "
              "Bilangan itu dibuat manusia... atau sudah ada duluan?"),
    ("GILANG", "Gue jawab: bikin! Tulisan dua puluh empat di klip itu... "
               "buatan kita. Gak ada manusia... gak ada tulisan."),
    ("DEDI", "Tulisan memang buatan. Tapi isinya? Freezer gue tetap "
             "minus lima... walau gak ada yang baca. Dinginnya... gak "
             "nunggu dipencet."),
    ("RUPI", "Jawabannya dua lapis, om. Manusia menciptakan simbol... dan "
             "cara nulisnya: dua puluh empat, minus lima, koma. Tapi isi "
             "yang ditulis itu... sudah ada duluan. Tiga puluh kard... "
             "tidak jadi dua puluh sembilan cuma karena labelnya ganti."),
    ("PUSAT", "Voting malam: lima dua persen bilang ditemukan... empat "
              "delapan persen bilang dibuat."),
    ("PUSAT", "Voting ditutup: hampir imbang... dan itu wajar. Tugas "
              "gudang bukan memutuskan... tapi jujur pada hitungan. "
              "Besok malam... rak bilangan cacah dibuka. Selamat malam... "
              "anak-anak."),
]"""),
    ("""EDGE_VOICE = {
    "NADIA": dict(voice="id-ID-GadisNeural", rate="+10%"),
    "GEDE": dict(voice="id-ID-ArdiNeural", rate="+6%"),
    "VITA": dict(voice="id-ID-GadisNeural", rate="-6%"),
    "KAMU": dict(voice="id-ID-ArdiNeural", rate="+12%"),
    "MYST": dict(voice="id-ID-ArdiNeural", rate="-22%", volume="-8%"),
}
ZAI_VOICE = {"NADIA": "tongtong", "GEDE": "jam", "VITA": "xiaochen",
             "KAMU": "kazi", "MYST": "luodo"}
ZAI_SPEED = {"NADIA": 1.15, "GEDE": 1.05, "VITA": 0.92, "KAMU": 1.0,
             "MYST": 0.8}""",
     """EDGE_VOICE = {
    "OMAK": dict(voice="id-ID-GadisNeural", rate="+10%"),
    "GILANG": dict(voice="id-ID-ArdiNeural", rate="+6%"),
    "RUPI": dict(voice="id-ID-GadisNeural", rate="-6%"),
    "KAMU": dict(voice="id-ID-ArdiNeural", rate="+12%"),
    "DEDI": dict(voice="id-ID-ArdiNeural", rate="-14%"),
    "PUSAT": dict(voice="id-ID-ArdiNeural", rate="-22%", volume="-8%"),
}
ZAI_VOICE = {"OMAK": "tongtong", "GILANG": "jam", "RUPI": "xiaochen",
             "KAMU": "kazi", "DEDI": "luodo", "PUSAT": "kago"}
ZAI_SPEED = {"OMAK": 1.15, "GILANG": 1.05, "RUPI": 0.92, "KAMU": 1.0,
             "DEDI": 0.88, "PUSAT": 0.8}"""),
    ('help="regenerasi klip tertentu (indeks 0-19)")',
     'help="regenerasi klip tertentu (indeks 0-23)")'),
]
patch("voice18rp.py", VOICE_PAIRS)
print("support patch bagian 1 selesai")
