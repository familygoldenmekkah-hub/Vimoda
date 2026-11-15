#!/usr/bin/env python3
"""Revisi 4 video 07:
A) aksi mentor MEMPERAGAKAN materi (half/wide-spin/count/sink/spin/twin-split)
B) bubble topik-spesifik (dingin! / lima kelompok! / jadi 1!)
C) teks kunci dibesarkan untuk mata minus
D) audio cue demo; README aturan 15-16; naskah revisi 4."""
import pathlib

ENG = pathlib.Path("/home/z/my-project/scripts/vimoda07/engine.html")
AUD = pathlib.Path("/home/z/my-project/scripts/vimoda07/audio07.py")
NAS = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/naskah07.md")
RED = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")

t = ENG.read_text()

def rep(txt, old, new, n=1, tag=""):
    c = txt.count(old)
    if c != n:
        raise SystemExit(f"[{tag}] ditemukan {c}x (harus {n}x): {old[:70]!r}")
    print(f"[{tag}] ok")
    return txt.replace(old, new)

# ===== C) BUMP FONT MATA MINUS (P kedua orientasi) =====
t = rep(t, "cardGSize:52, cardLab:20, cardEn:12,", "cardGSize:58, cardLab:23, cardEn:14,", 2, "cardG x2")
t = rep(t, "markY:80, markW:9, markH:78, markStep:20, gGap:44, strikeH:8, strikeW:84,",
"markY:80, markW:11, markH:86, markStep:24, gGap:48, strikeH:10, strikeW:96,", 2, "mark x2")
# portrait
t = rep(t, "h1Y:240, h1Size:104, h1BoxW:470, h1BoxH:140,", "h1Y:236, h1Size:112, h1BoxW:540, h1BoxH:156,", 1, "h1P")
t = rep(t, "qX:800, qY:250, qSize:88,", "qX:800, qY:246, qSize:96,", 1, "qP")
t = rep(t, "tlabY:208, tlabSize:26, tlabEY:246, tlabESize:13, tsubY:272, tsubSize:14, sitW:150, sitH:160, sitGap:16, sitSym:44, sitLab:16, sitEn:10, sitY:34,",
"tlabY:206, tlabSize:30, tlabEY:248, tlabESize:15, tsubY:274, tsubSize:16, sitW:152, sitH:172, sitGap:14, sitSym:50, sitLab:19, sitEn:13, sitY:34,", 1, "sitP")
t = rep(t, "digY:640, digH:150, digW:150, digGap:14, digSize:46, grpName:17, grpEx:26, grpEn:10,",
"digY:636, digH:162, digW:162, digGap:8, digSize:46, grpName:20, grpEx:30, grpEn:12,", 1, "digP")
t = rep(t, "ntpY:660, ntpH:160, ntpW:280, ntpGap:20, ntpDSize:50, ntpLab:17, ntpEn:11, tagSize:28,",
"ntpY:654, ntpH:172, ntpW:286, ntpGap:8, ntpDSize:56, ntpLab:20, ntpEn:13, tagSize:32,", 1, "ntpP")
t = rep(t, "bTakeY:930, bTakeSize:46, markBarW:420,", "bTakeY:924, bTakeSize:52, markBarW:430,", 1, "takeP")
t = rep(t, "bigY:280, bigH:220, bigW:220, bigStar:130,", "bigY:274, bigH:228, bigW:228, bigStar:142,", 1, "bigP")
t = rep(t, "eqY:570, eqH:150, eqW:560, eqStar:70, eqTSize:54, eqLabY:762, eqLabSize:22,",
"eqY:564, eqH:162, eqW:600, eqStar:78, eqTSize:62, eqLabY:766, eqLabSize:26,", 1, "eqP")
t = rep(t, "stagLabY:214, stagLabSize:20,", "stagLabY:212, stagLabSize:24,", 1, "stagP")
t = rep(t, "openY:96, openEY:134, openESize:13, urlY:190, urlSize:84, barY:300,",
"openY:94, openEY:136, openESize:15, urlY:188, urlSize:90, barY:300,", 1, "ctaP")
t = rep(t, "subbarY:1300, subbarH:128, subIdSize:30, subEnSize:21, subbarMX:130",
"subbarY:1288, subbarH:146, subIdSize:36, subEnSize:24, subbarMX:130", 1, "subP")
t = rep(t, "chapY:200, chapSize:22,", "chapY:196, chapSize:26,", 1, "chapP")
t = rep(t, "wordY:300, wordSize:88,", "wordY:296, wordSize:96,", 1, "wordP")
t = rep(t, "wmY:60, wmSize:18,", "wmY:60, wmSize:20,", 1, "wmP")
# landscape
t = rep(t, "h1Y:130, h1Size:128, h1BoxW:640, h1BoxH:190,", "h1Y:126, h1Size:136, h1BoxW:700, h1BoxH:206,", 1, "h1L")
t = rep(t, "qX:1330, qY:160, qSize:92,", "qX:1330, qY:156, qSize:100,", 1, "qL")
t = rep(t, "tlabY:196, tlabSize:28, tlabEY:236, tlabESize:14, tsubY:266, tsubSize:14, sitW:170, sitH:170, sitGap:16, sitSym:48, sitLab:17, sitEn:10, sitY:40,",
"tlabY:194, tlabSize:32, tlabEY:238, tlabESize:16, tsubY:268, tsubSize:16, sitW:176, sitH:182, sitGap:14, sitSym:54, sitLab:20, sitEn:13, sitY:40,", 1, "sitL")
t = rep(t, "digY:580, digH:160, digW:160, digGap:16, digSize:48, grpName:18, grpEx:28, grpEn:10,",
"digY:576, digH:172, digW:172, digGap:8, digSize:48, grpName:21, grpEx:32, grpEn:12,", 1, "digL")
t = rep(t, "ntpY:650, ntpH:170, ntpW:290, ntpGap:24, ntpDSize:52, ntpLab:18, ntpEn:11, tagSize:30,",
"ntpY:646, ntpH:182, ntpW:302, ntpGap:14, ntpDSize:60, ntpLab:21, ntpEn:13, tagSize:34,", 1, "ntpL")
t = rep(t, "bTakeY:838, bTakeSize:46, markBarW:520,", "bTakeY:832, bTakeSize:52, markBarW:530,", 1, "takeL")
t = rep(t, "bigY:200, bigH:220, bigW:220, bigStar:130,", "bigY:196, bigH:228, bigW:228, bigStar:142,", 1, "bigL")
t = rep(t, "eqY:480, eqH:150, eqW:600, eqStar:70, eqTSize:54, eqLabY:672, eqLabSize:22,",
"eqY:476, eqH:162, eqW:640, eqStar:78, eqTSize:62, eqLabY:678, eqLabSize:26,", 1, "eqL")
t = rep(t, "stagLabY:208, stagLabSize:21,", "stagLabY:206, stagLabSize:25,", 1, "stagL")
t = rep(t, "openY:96, openEY:134, openESize:13, urlY:190, urlSize:88, barY:300,",
"openY:94, openEY:136, openESize:15, urlY:188, urlSize:94, barY:300,", 1, "ctaL")
t = rep(t, "subbarY:916, subbarH:96, subIdSize:30, subEnSize:19, subbarMX:320",
"subbarY:902, subbarH:112, subIdSize:36, subEnSize:23, subbarMX:320", 1, "subL")
t = rep(t, "chapY:130, chapSize:22,", "chapY:126, chapSize:26,", 1, "chapL")
t = rep(t, "wordY:228, wordSize:86,", "wordY:224, wordSize:94,", 1, "wordL")
t = rep(t, "wmY:56, wmSize:18,", "wmY:56, wmSize:20,", 1, "wmL")

# ===== B) BUBBLE =====
t = rep(t, "bub.style.fontSize=(ORIENT==='portrait'?24:22)+'px';",
"bub.style.fontSize=(ORIENT==='portrait'?30:27)+'px';", 1, "bub font")
t = rep(t, "bub.style.padding='10px 22px';", "bub.style.padding='12px 26px';", 1, "bub pad")
t = rep(t, "const BUBS=[[8.9,10.1,'dingin!'],[21.3,22.7,'lengkap!'],[40.4,41.8,'aman.']];",
"const BUBS=[[8.9,10.1,'dingin!'],[21.3,22.7,'lima kelompok!'],[40.4,41.8,'jadi 1!']];", 1, "BUBS")

# ===== A) AKSI DEMONSTRATIF =====
t = rep(t, "const SPARKS=[[21.0,22.2],[48.6,51.4]];",
"const SPARKS=[[21.0,22.2],[39.3,40.2],[48.6,51.4]];", 1, "SPARKS")

t = rep(t, """const GESTS=[
  [1.7,0.9,'lean',8,1],
  [4.9,0.7,'shake',9,0],
  [8.2,0.9,'lean',7,1],
  [8.9,1.2,'shake',4.5,0],
  [11.5,0.8,'nod',0.10,0],
  [16.4,0.55,'pulse',1.06,0],
  [19.5,0.9,'lean',-7,0],
  [23.0,0.8,'nod',0.09,0],
  [27.9,0.5,'pulse',1.05,0],
  [29.2,0.5,'pulse',1.05,0],
  [30.5,0.5,'pulse',1.05,0],
  [31.8,0.5,'pulse',1.06,0],
  [32.3,0.9,'nod',0.12,0],
  [36.3,1.0,'lean',7,1],
  [38.6,0.8,'nod',0.09,0],
  [40.6,0.8,'lean',-5,0],
  [45.3,0.7,'shake',7,0],
  [47.8,0.9,'lean',6,1],
  [48.7,0.85,'jump',34,0]
];""",
"""const GESTS=[
  [1.05,0.55,'shake',5,0],
  [1.5,0.6,'half',0,0],
  [1.7,0.9,'lean',8,1],
  [1.95,0.95,'wide',0,0],
  [4.9,0.7,'shake',9,0],
  [7.95,1.5,'count',24,0],
  [8.9,1.2,'shake',4.5,0],
  [11.5,0.8,'nod',0.10,0],
  [16.4,0.55,'pulse',1.06,0],
  [17.6,0.9,'sink',34,0],
  [19.5,0.9,'lean',-7,0],
  [23.15,1.3,'spin',0,0],
  [27.9,0.5,'pulse',1.05,0],
  [29.2,0.5,'pulse',1.05,0],
  [30.5,0.5,'pulse',1.05,0],
  [31.8,0.5,'pulse',1.06,0],
  [32.3,0.9,'nod',0.12,0],
  [36.3,1.0,'lean',7,1],
  [40.6,0.8,'lean',-5,0],
  [45.3,0.7,'shake',7,0],
  [47.8,0.9,'lean',6,1],
  [48.7,0.85,'jump',34,0]
];""", 1, "GESTS")

t = rep(t, """  let hy=0, hsq=0, gro=0, lrot=0;
  for(const [gs,gd,gt,ga,gdir] of GESTS){
    const d=t-gs;
    if(d>=0&&d<gd){
      const p=d/gd, w=Math.sin(p*Math.PI);
      if(gt==='lean'){ lrot+=gdir*ga*w; }
      else if(gt==='shake'){ lrot+=ga*Math.sin(p*11)*(1-p); }
      else if(gt==='nod'){ hsq+=ga*w; hy-=6*w; }
      else if(gt==='pulse'){ gro+=(ga-1)*w; }
      else if(gt==='jump'){ hy-=ga*4*p*(1-p); hsq+=0.10*Math.sin(p*Math.PI); }
    }
  }""",
"""  let hy=0, hsq=0, gro=0, lrot=0, dsx=1, dsy=1, drot=0, dyy=0, sinkA=0;
  for(const [gs,gd,gt,ga,gdir] of GESTS){
    const d=t-gs;
    if(d>=0&&d<gd){
      const p=d/gd, w=Math.sin(p*Math.PI);
      if(gt==='lean'){ lrot+=gdir*ga*w; }
      else if(gt==='shake'){ lrot+=ga*Math.sin(p*11)*(1-p); }
      else if(gt==='nod'){ hsq+=ga*w; hy-=6*w; }
      else if(gt==='pulse'){ gro+=(ga-1)*w; }
      else if(gt==='jump'){ hy-=ga*4*p*(1-p); hsq+=0.10*Math.sin(p*Math.PI); }
      else if(gt==='half'){ dsy-=0.45*w; }
      else if(gt==='wide'){ dsx+=0.28*w; dsy-=0.18*w; drot+=360*eio(p); }
      else if(gt==='spin'){ drot+=720*eio(p); }
      else if(gt==='count'){ hy-=ga*Math.abs(Math.sin(p*5*Math.PI))*(1-p*0.25); }
      else if(gt==='sink'){ dyy+=ga*w; dsy-=0.10*w; sinkA=w; }
    }
  }
  /* demo 1/2+1/2=1: bola memanggil kembaran setengah, lalu menyatu jadi satu */
  let bsa=1, bbo=0, bboff=0;
  if(t>=38.5&&t<39.15){ bsa=1-0.48*eio(seg(t,38.5,0.45)); }
  else if(t>=39.15&&t<39.75){ bsa=0.52+0.48*eio(seg(t,39.15,0.5)); }
  if(t>=38.5&&t<39.6){
    bbo=0.95*seg(t,38.5,0.3)*(1-seg(t,39.2,0.4));
    bboff=t<39.15? lerp(80,47,eio(seg(t,38.5,0.45))) : lerp(47,12,eio(seg(t,39.15,0.5)));
  }""", 1, "loop+bsa")

t = rep(t, "  ball.el.style.transform=`translateY(${((1-ef)*-250+hy).toFixed(1)}px) rotate(${(lrot+wig).toFixed(2)}deg) scale(${sx2.toFixed(3)},${sy2.toFixed(3)})`;",
"  ball.el.style.transform=`translateY(${((1-ef)*-250+hy+dyy).toFixed(1)}px) rotate(${(lrot+wig+drot).toFixed(2)}deg) scale(${(sx2*dsx*bsa).toFixed(3)},${(sy2*dsy*bsa).toFixed(3)})`;", 1, "transform")
t = rep(t, "  ballsh.style.opacity=String(clamp(ep*3,0,1)*clamp(0.42+hy*0.006,0.18,0.5));",
"  ballsh.style.opacity=String(clamp(ep*3,0,1)*clamp(0.42+hy*0.006,0.18,0.5)*(1-0.5*sinkA)*bsa);", 1, "shad op")
t = rep(t, "  ballsh.style.transform=`scaleX(${clamp(1+hy*0.004,0.8,1.08).toFixed(3)})`;",
"  ballsh.style.transform=`scaleX(${clamp((1+hy*0.004)*bsa,0.4,1.08).toFixed(3)})`;", 1, "shad sx")

t = rep(t, "  spark.style.transform=`rotate(${((t*40)%360).toFixed(0)}deg) scale(${(0.8+0.25*Math.sin(t*9)).toFixed(3)})`;",
"""  spark.style.transform=`rotate(${((t*40)%360).toFixed(0)}deg) scale(${(0.8+0.25*Math.sin(t*9)).toFixed(3)})`;
  ballB.style.left=(bx+bboff).toFixed(1)+'px';
  ballB.style.opacity=String(clamp(bbo,0,1));
  ballB.style.transform=`translateY(${(-7*Math.abs(Math.sin(t*6.3))*(bbo>0?1:0)).toFixed(1)}px)`;""", 1, "ballB update")

t = rep(t, """const ball=buildGoldBall(document.getElementById('ball'),BALL_XS[0]);
const ballsh=buildShadow(document.getElementById('ballsh'),BALL_XS[0]);""",
"""const ball=buildGoldBall(document.getElementById('ball'),BALL_XS[0]);
const ballsh=buildShadow(document.getElementById('ballsh'),BALL_XS[0]);
/* kembaran bola setengah untuk demo 1/2 + 1/2 = 1 */
const ballB=document.createElement('div');
ballB.style.cssText=`position:absolute;left:${BALL_XS[4]}px;top:${P.groundY-48}px;width:48px;height:48px;margin-left:-24px;border-radius:50%;background:radial-gradient(circle at 33% 27%, #FFF3C4 0%, #FCD34D 34%, #F59E0B 68%, #B45309 100%);box-shadow:0 0 30px rgba(251,191,36,.22);opacity:0;will-change:transform,opacity,left;`;
document.getElementById('ball').appendChild(ballB);""", 1, "ballB build")

ENG.write_text(t)
print("engine revisi 4 ok")

# ===== D) AUDIO =====
a = AUD.read_text()
a = rep(a, "add(50.6, chime(440.0, 0.09))",
"""add(50.6, chime(440.0, 0.09))
# demo mentor revisi 4 (aksi memperagakan materi)
add(1.50, tick(440, 0.05))                              # bola memangkuk: kartu 1/2
add(1.98, tick(700, 0.05))                              # bola melebar berputar: kartu pi
for _i in range(5):
    add(7.98 + _i * 0.28, tick(320 + _i * 50, 0.05))    # bola memantul menghitung 5 buku
add(17.62, whoosh(0.5, False, 0.07))                    # bola tenggelam di bawah garis nol
add(23.15, tick(760, 0.05))                             # bola berputar: irasional
add(23.60, tick(980, 0.05))
add(38.55, tick(500, 0.05))                             # bola terbelah dua
add(38.95, tick(620, 0.05))
add(39.30, chime(1318.5, 0.10))                         # menyatu jadi satu: 1/2+1/2=1""", 1, "audio demo")
AUD.write_text(a)
print("audio revisi 4 ok")
