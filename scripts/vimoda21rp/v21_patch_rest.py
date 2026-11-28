#!/usr/bin/env python3
"""Patch rest bagian 1: frag_render hooks + embed_meme21 (HERO_IMGS) +
timeline21rp.py full rewrite (dengan SCENES sinematik)."""


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


from pathlib import Path

HERE = Path("/home/z/my-project/scripts/vimoda21rp")

# ---------- frag_render.js ----------
patch("frag_render.js", [
    ("/* ---------- LARI PAGI rev23: render per frame, MODEL FOKUS, desain\n   PAGI CERIA (otak/DESAIN-PAGI.md), produksi 9:16 SAJA",
     "/* ---------- RESEP GAGAL rev24: render per frame, MODEL FOKUS, desain\n   GLOW v3 (otak/DESAIN-GLOW.md), produksi 9:16 SAJA"),
    ("""  /* kamera: napas + punch momen + dolly zoom + shake sisipan */""",
     """  /* GLOW v3: lapisan scene (blob, sparkle, progres, hero poster) */
  if(window.__updateScene)window.__updateScene(t);
  /* kamera: napas + punch momen + dolly zoom + shake sisipan */"""),
    ("      cc.el.style.borderColor=inA>0.9&&t<cc.pop+0.45?'#E8B32E':'#C8A86E';",
     "      cc.el.style.borderColor=inA>0.9&&t<cc.pop+0.45?'#FF6B8A':'#FFC94D';"),
])

# ---------- embed_meme21.py: full rewrite (5 meme + 4 hero) ----------
EMBED = '''#!/usr/bin/env python3
"""Embed 9 ilustrasi AI VIDEO 21 (5 kartu meme + 4 hero scene GLOW) ke
frag_imgs.html (const MEME_IMGS + const HERO_IMGS) - digabung build via cat."""
import base64
import io
from pathlib import Path
from PIL import Image

HERE = Path("/home/z/my-project/scripts/vimoda21rp")
mparts = []
for i in range(5):
    im = Image.open(f"/tmp/gen21/m{i}.png").convert("RGB").resize((560, 560), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=72, optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode()
    mparts.append("'data:image/jpeg;base64," + b64 + "'")
    print(f"m{i}: {len(buf.getvalue()) // 1024} KB jpeg")

hparts = []
for i in range(4):
    im = Image.open(f"/tmp/gen21/h{i + 1}.png").convert("RGB")
    im.thumbnail((768, 1344), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=74, optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode()
    hparts.append("'data:image/jpeg;base64," + b64 + "'")
    print(f"h{i + 1}: {len(buf.getvalue()) // 1024} KB jpeg")

out = (
    "/* ---------- ilustrasi AI rev24 (GLOW v3): 5 gambar meme dapur ceria +"
    " 4 hero scene sinematik, embed base64 ---------- */\\n"
    "const MEME_IMGS=[\\n" + ",\\n".join(mparts) + "\\n];\\n"
    "const HERO_IMGS=[\\n" + ",\\n".join(hparts) + "\\n];\\n"
)
(HERE / "frag_imgs.html").write_text(out)
print("frag_imgs.html:", (HERE / "frag_imgs.html").stat().st_size // 1024, "KB")
'''
(HERE / "embed_meme21.py").write_text(EMBED)
print("embed_meme21.py: full rewrite ok")

# ---------- timeline21rp.py: full rewrite ----------
TIMELINE = '''#!/usr/bin/env python3
"""TIMELINE rev24 VIDEO 21: satu sumber kebenaran untuk semua waktu.
Membaca durasi 24 klip voice (/tmp/voice21/durations.json), slot kartu
babak, diagram menyala, 2 HERO POSTER sinematik, hening pra-twist, papan
misi, endcard, burst, IMPS, dolly, dips, subtitle EN. Output: timing.json
+ frag_time.js (const TM). Produksi 9:16 SAJA (L1 revisi)."""
import json
from pathlib import Path

HERE = Path(__file__).parent
D = json.loads(Path("/tmp/voice21/durations.json").read_text())
d = [D[f"m{i:02d}"] for i in range(24)]

VOFF = 0.42
GAP_MIN = 3.0
GAP_PAD = 1.25
FLASH_DUR = [3.6, 3.6, 4.0]
FLASH_PAD = 1.5
CARD_WIN = 1.8
CARD_PAD = 2.6
QUIZ_DUR = 8.0
SCENE_DUR = 3.0

DIV_TEXT = ["GRUP RESEP GAGAL", "CEK TAKARAN · 19.20",
            "PAPAN TAKARAN · 19.24", "RESEP DOBEL · 19.33",
            "VOTING DAPUR · 19.44"]
DIV_LABEL = ["GRUP RESEP GAGAL", None, None, None, None]

INTRO1 = [0.4, 4.2]
INTRO2 = [4.5, 7.6]

t0 = [0.0] * 24
cards = [[0.0] for _ in range(5)]
flash = [[0.0, 0.0] for _ in range(3)]
scenes = []
t0[0] = 8.2
cards[0] = [0.4]

DIV_BEFORE = {4: 1, 8: 2, 13: 3, 19: 4}
FLASH_AFTER = {11: 0, 19: 1, 21: 2}
SCENE_AFTER = {0: (1, "TAKARAN ITU MATEMATIKA"),
               2: (2, "DOBEL PORSI, DOBEL ANGKA")}
dip_scene = []

for i in range(23):
    gap = max(GAP_MIN, d[i] + GAP_PAD)
    nxt = t0[i] + gap
    if i in FLASH_AFTER:
        fi = FLASH_AFTER[i]
        ft = t0[i] + d[i] + FLASH_PAD
        flash[fi] = [round(ft, 2), round(ft + FLASH_DUR[fi], 2)]
        nxt = flash[fi][1] + 1.5
        if fi in SCENE_AFTER:
            hi, title = SCENE_AFTER[fi]
            st = flash[fi][1] + 0.5
            scenes.append([round(st, 2), round(st + SCENE_DUR, 2), hi, title])
            dip_scene.append(scenes[-1][1])
            nxt = scenes[-1][1] + 1.4
    if (i + 1) in DIV_BEFORE:
        ci = DIV_BEFORE[i + 1]
        ct = t0[i] + d[i] + 1.0 if i not in FLASH_AFTER else nxt + 0.4
        cards[ci] = [round(ct, 2)]
        nxt = ct + CARD_PAD
    if i == 22:  # papan misi antara pesan 22 (voting) dan 23 (penutup)
        q0 = t0[i] + d[i] + 1.4
        nxt = q0 + QUIZ_DUR + 0.7
    t0[i + 1] = round(nxt, 2)

quiz = [round(t0[22] + d[22] + 1.4, 2), round(t0[22] + d[22] + 1.4 + QUIZ_DUR, 2)]
ma = [round(flash[1][0] - 1.0, 2), flash[1][0]]
end = [round(t0[23] + d[23] + 1.6, 2)]
end += [round(end[0] + 0.2, 2), round(end[0] + 2.5, 2), round(end[0] + 3.5, 2)]
DUR = round(end[0] + 5.0, 2)

DIVS = []
for ci in range(5):
    txt = DIV_LABEL[ci] if DIV_LABEL[ci] else DIV_TEXT[ci]
    DIVS.append([cards[ci][0], txt])

MSG_BASE = [
    "This week's recipe: brownies for 4. Numbers matter!",
    "Rara's brownies came out rock hard. Not her fault, right?",
    "Gita: recipes are pure math. Every number has a job!",
    "Rara, how much chocolate did you actually use?",
    "Precision: 200g vs 20g is ten times less!",
    "Manda buys ready-made. But she's watching now!",
    "Hmph! The oven is sulking... wait, its thermometer died?",
    "Check the numbers first: it asked for 200g, not 20!",
    "The measuring board: one zero missing, ten times off!",
    "Ten times less chocolate! No wonder it crumbled.",
    "Steps are numbers too: step 1 to 5, in order!",
    "Numbers work two shifts: measure and order!",
    "8 servings from 4? Just double every number!",
    "Double the recipe: every number gets doubled!",
    "Double everything. Recipe numbers are one team!",
    "Okay... I misread the amount AND skipped step 3!",
    "Sticker: the exact recipe. Weigh, order, count!",
    "Next week: I bring the scale, you bring patience!",
    "Hmph, fine. 200 grams for real, all 5 steps!",
    "Kitchen question: 12 servings. What is 200g become?",
    "Triple it: 200 becomes 600 grams!",
    "Noted: 37 fails. And at 7.40 Rara's cake looked great!",
    "Kitchen vote: 58% wrong amounts, 42% wrong order!",
    "Tomorrow: fractions, half a teaspoon. Weigh it!",
]
SPLIT2 = {
    0: "Brownies for four: 200 grams, 2 eggs, 180 degrees!",
    7: "It asked for 200 grams. You used 20!",
    10: "Step 1 melt, 2 mix, 3 whisk, 4 pour, 5 bake!",
    11: "Measure the amounts, order the steps!",
    18: "Hmph, fine. 200 grams for real, all 5 steps!",
    21: "Noted: at 7.40 Rara's new brownies looked great!",
}
subs = []
for i in range(24):
    subs.append([t0[i], MSG_BASE[i]])
    if i in SPLIT2:
        subs.append([round(t0[i] + d[i] * 0.48, 2), SPLIT2[i]])
subs += [
    [flash[0][0], "Recipes live on two number jobs!"],
    [flash[1][0], "Wrong amounts or wrong order?"],
    [flash[2][0], "Double servings, double numbers!"],
    [round(quiz[0] + 1.2, 2), "The kitchen left a night mission!"],
    [round(quiz[0] + 4.4, 2), "Eight helper cards are waiting."],
    [round(end[0] + 0.6, 2), "Thanks for watching."],
]
subs = sorted([[round(s0, 2), s1] for s0, s1 in subs], key=lambda x: x[0])

bursts = [
    [round(t0[18] + 0.1, 2), round(t0[18] + 2.3, 2), 10, 130, 0],
    [round(t0[22] + 0.2, 2), round(t0[22] + 3.2, 2), 18, 230, 1],
]
rises = [round(t0[9], 2), round(min(flash[2][0] - 0.6, t0[9] + 7.0), 2)]
imps = [
    [0.4, 2.0],
    [round(flash[0][0] + 0.8, 2), round(flash[0][0] + 2.4, 2)],
    [round(scenes[0][0] + 0.6, 2), round(scenes[0][0] + 2.4, 2)],
    [round(flash[1][0] + 0.8, 2), round(flash[1][0] + 2.4, 2)],
    [round(scenes[1][0] + 0.6, 2), round(scenes[1][0] + 2.4, 2)],
    [cards[4][0], round(cards[4][0] + 1.6, 2)],
    [quiz[0], round(quiz[0] + 1.6, 2)],
]
photos = [i for i in range(24) if i in (0, 8, 13, 22)]
dollys = [[t0[i], round(t0[i] + 3.4, 2), 0.024] for i in photos]
dollys += [[flash[2][0], round(flash[2][1] - 0.2, 2), 0.022],
           [t0[19], round(t0[19] + 2.8, 2), 0.02]]
dips = [round(c[0], 2) for c in cards[1:5]] + [quiz[0]] + [round(s[1], 2) for s in scenes]

TM = dict(dur=DUR, wins=[3.8, CARD_WIN, CARD_WIN, CARD_WIN, CARD_WIN],
          m=t0, div=DIVS, flash=flash, scenes=scenes, subs=subs,
          bursts=bursts, rises=rises, quiz=quiz, end=end, imps=imps,
          dollys=dollys, dips=dips, ma=ma, voff=VOFF, d=d, intro=[INTRO1, INTRO2])

for i in range(23):
    gap = t0[i + 1] - t0[i]
    assert gap >= GAP_MIN - 1e-9, f"gap {i} {gap:.2f}"
hangs = []
for k in range(len(subs) - 1):
    hang = subs[k + 1][0] - subs[k][0]
    hangs.append(hang)
    need = max(1.7, len(subs[k][1]) / 17.0)
    if hang < need - 1e-9:
        raise AssertionError(f"sub {k} pendek {hang:.2f} < {need:.2f}: {subs[k][1]!r}")
    if hang > 15.5 + 1e-9:
        for j in range(max(0, k - 2), min(len(subs), k + 3)):
            print(f"  sub[{j}] t={subs[j][0]:7.2f} {subs[j][1][:44]!r}")
        raise AssertionError(f"sub {k} menggantung {hang:.2f}s: {subs[k][1]!r}")
print(f"DUR={DUR}s  sub={len(subs)} beat  hang_max={max(hangs):.1f}s  msg0={t0[0]}")
print("scenes:", scenes)
print("t0:", [round(x, 1) for x in t0])

(HERE / "timing.json").write_text(json.dumps(TM, indent=1, ensure_ascii=False))
frag = ("/* ---------- TIMING rev24 (single source of truth): dihitung dari "
        "durasi voice 24 klip oleh timeline21rp.py ---------- */\\n"
        "const TM=" + json.dumps(TM, separators=(",", ":"), ensure_ascii=False) + ";\\n")
(HERE / "frag_time.js").write_text(frag)
print(f"timing.json + frag_time.js ok ({(HERE / 'frag_time.js').stat().st_size // 1024} KB)")
'''
(HERE / "timeline21rp.py").write_text(TIMELINE)
print("timeline21rp.py: full rewrite ok")
print("patch rest bagian 1 selesai")
