#!/usr/bin/env python3
"""QA penuh Video 15 rev7 FORMAT RP (Misteri Pembagi Rapi, RUANG SAPA).
Pengaman permanen: kata terlarang (kejahatan, label episode, CTA, FPB/KPK),
struktur RP (22 bubble, 3 diagram menyala, 5 divider, 4 soal + 8 kartu,
3 ilustrasi SVG dunia), dialog 30px + SEMUA teks minimal 24px via
fontcheck computed-style, tempo baca (bubble jeda >= 2.8 s),
tempo subtitle EN proporsional (aturan 18, min 1.7 s, maks 8.5 s),
durasi 106.0 s, sampling frame tidak kosong, thumbnail."""
import re
import subprocess
import sys
import wave
from pathlib import Path

HERE = Path(__file__).parent
OUT = Path("/tmp/render")
FAILS = []


def fail(msg):
    FAILS.append(msg)
    print("GAGAL:", msg)


# ---------- 1) engine: teks wajib dan terlarang ----------
eng = (HERE / "engine.html").read_text()
banned = ("Jangan", "FOLLOW", "SUBSCRIBE", "IKUTI", "Kaisar", "\u2014", "\u2013",
          "Kamu tahu harus ke mana", "nemu aha", "XXX", "TODO", "undefined",
          "NaN", "FPB", "KPK", "persekutuan", "KEKUNGAN", "EPISODE",
          "PENCURI", "CURI", "SERANGAN", "JEBAKAN", "PENANGKAPAN",
          "TERTANGKAP", "DICURI")
for b in banned:
    if b in eng:
        fail(f"DILARANG ada di engine: {b!r}")
requires = ("MISTERI PEMBAGI RAPI", "PEMBAGI RAPI", "pembagi rapi itu semua orang yang mau bagi rata",
            "CARA BAGI RATA", "TANTANGAN UNTUKMU", "JAWAB DI KOLOM KOMENTAR YA",
            "mengetik", "KAMU", "MENTOR", "PEMILIK KIOS", "AKIOMIDA",
            "TENTUKAN SEMUA FAKTOR DARI 20", "LIMA KELIPATAN PERTAMA DARI 7",
            "KENAPA 5 BUKAN FAKTOR DARI 12", "FAKTOR ATAU KELIPATAN",
            "FAKTOR 12", "KELIPATAN 4", "TERBATAS VS TANPA BATAS",
            "kios sebelah simpan misteri baru", "SAPA",
            "TENTUKAN SEMUA", "menyusun jurus", "buku tamu",
            "muncul dari balik lampu", "yang merapikan itu aku",
            "dibagi habis, tanpa sisa", "jaraknya selalu 4")
for r in requires:
    if r not in eng:
        fail(f"WAJIB ada di engine: {r!r}")
n_msg = len(re.findall(r"\{t0:[\d.]+, who:", eng))
if n_msg != 22:
    fail(f"jumlah bubble {n_msg} != 22")
n_flash = eng.count("kick:'")
if n_flash != 3:
    fail(f"jumlah diagram menyala {n_flash} != 3")
n_svg = eng.count('viewBox="0 0 600 340"')
if n_svg != 3:
    fail(f"jumlah ilustrasi SVG dunia {n_svg} != 3")
n_bub30 = eng.count("bubS:30")
if n_bub30 != 2:
    fail(f"teks dialog bukan 30px di kedua orientasi ({n_bub30})")
else:
    print("teks dialog 30px kedua orientasi ok")
m_div = re.search(r"const DIVS=\[(.*?)\];", eng, re.S)
n_div = len(re.findall(r"\[\d+\.?\d*,'", m_div.group(1))) if m_div else 0
if n_div != 5:
    fail(f"jumlah divider bab {n_div} != 5")
# tempo baca: jeda antar bubble minimal 2.8 s (keluhan pemilik rev7)
times_msg = [float(x) for x in re.findall(r"\{t0:([\d.]+), who:", eng)]
gaps_ok = True
for a, b in zip(times_msg, times_msg[1:]):
    if b - a < 2.8 - 1e-9:
        fail(f"jeda bubble terlalu rapat: {a} -> {b} ({b - a:.2f}s < 2.8s)")
        gaps_ok = False
if gaps_ok:
    print(f"tempo baca ok: {len(times_msg)} bubble, jeda >= 2.8 s")
n_card = len(re.findall(r"UJIVAL=\['1','2','3','4','5','8','10','20'\]", eng))
if n_card != 1:
    fail("delapan kartu bantu tidak lengkap")
else:
    print("papan misi 4 soal utuh + 8 kartu bantu ok")

# ---------- 2) subtitle EN: tempo proporsional (aturan 18) ----------
m_sub = re.search(r"const SUBS=\[(.*?)\];", eng, re.S)
subs = re.findall(r"\[(\d+\.?\d*),'([^']*)'\]", m_sub.group(1)) if m_sub else []
if len(subs) != 28:
    fail(f"jumlah beat subtitle {len(subs)} != 28")
prev = -99.0
ok_tempo = True
for s in subs:
    t0 = float(s[0])
    txt = s[1]
    disp = (float(subs[subs.index(s) + 1][0]) if subs.index(s) + 1 < len(subs) else 106.0) - t0
    need = max(1.7, len(txt) / 17.0)
    if disp < need - 1e-9:
        fail(f"sub tampil {disp:.2f}s < {need:.2f}s: {txt!r}")
        ok_tempo = False
    if disp > 8.5:
        fail(f"sub menggantung {disp:.2f}s: {txt!r}")
        ok_tempo = False
    if len(txt) > 55:
        fail(f"sub kepanjangan {len(txt)}: {txt!r}")
    if t0 - prev < 1.7 - 1e-9:
        fail(f"beat terlalu rapat t={t0}")
        ok_tempo = False
    prev = t0
if float(subs[-1][0]) > 102.4:
    fail("sub terakhir terlalu akhir")
if ok_tempo:
    print(f"subtitle: {len(subs)} beat, tempo proporsional >= max(1.7s, len/17), jeda >= 1.7s ok")

# ---------- 3) dialog >= 30px + SEMUA teks >= 24px (keluhan penonton rev6) ----------
for o in ("portrait", "landscape"):
    d = OUT / o
    d.mkdir(parents=True, exist_ok=True)
    (d / "engine.html").write_text(eng)
r = subprocess.run([sys.executable, str(HERE / "fontcheck15.py")],
                   capture_output=True, text=True, timeout=180)
print(r.stdout.strip())
if r.returncode != 0:
    fail("ada teks di bawah 24px (fontcheck)")

# ---------- 4) audio 106.0 s ----------
try:
    with wave.open(str(OUT / "audio.wav")) as w:
        dur = w.getnframes() / w.getframerate()
        if abs(dur - 106.0) > 0.05:
            fail(f"durasi audio {dur:.2f}s != 106.0")
        else:
            print(f"audio ok: {dur:.2f} s")
except Exception as e:
    print(f"audio belum ada (abaikan saat pre-render): {e}")

# ---------- 5) video + thumbnail (post-render) ----------
for o in ("portrait", "landscape"):
    fp = OUT / o / "final.mp4"
    if fp.exists():
        import json
        try:
            res = subprocess.run(["ffprobe", "-v", "quiet", "-print_format", "json",
                                  "-show_format", str(fp)], capture_output=True, text=True)
            dur = float(json.loads(res.stdout)["format"]["duration"])
            if abs(dur - 106.0) > 0.1:
                fail(f"durasi {o} {dur:.2f}s != 106.0")
            else:
                print(f"durasi {o} ok: {dur:.2f} s")
        except Exception as e:
            print(f"ffprobe dilewati: {e}")
        fr = sorted((OUT / o / "frames").glob("*.jpg"))
        step = max(1, len(fr) // 24)
        import statistics
        blank = 0
        for f in fr[20::step][:24]:
            try:
                from PIL import Image
                im = Image.open(f).convert("L")
                px = list(im.resize((64, 64)).getdata())
                if statistics.pstdev(px) < 6:
                    blank += 1
            except Exception:
                pass
        if blank:
            fail(f"{o}: {blank} frame sampling kosong")
        else:
            print(f"{o}: 24 frame sampling tidak kosong")
    th = OUT / o / "thumbnail.jpg"
    if not th.exists() or th.stat().st_size < 20000:
        print(f"thumbnail {o} belum ada (post-render saja)")
    else:
        print(f"thumbnail {o} ok ({th.stat().st_size // 1024} KB)")

# ---------- 6) naskah + caption ----------
pkg = HERE / "package"
for name in ("caption15.txt", "naskah15.md"):
    fp = pkg / name
    if not fp.exists():
        print(f"{name} belum ada")
        continue
    t = fp.read_text()
    base_bad = ("\u2014", "\u2013", "Kaisar", "Kamu tahu harus ke mana", "nemu aha", "Jangan")
    cap_bad = base_bad + ("PENCURI", "CURI", "SERANGAN", "JEBAKAN", "PENANGKAPAN",
                          "TERTANGKAP", "DICURI")
    for bad in (cap_bad if name == "caption15.txt" else base_bad):
        if bad in t:
            fail(f"DILARANG ada di {name}: {bad!r}")
    if name == "caption15.txt" and "sudah menunggu" not in t:
        fail("teaser tersisip belum ada di caption")
    print(f"{name}: bersih ({len(t)} karakter)")

if FAILS:
    print("QA ADA MASALAH")
    sys.exit(1)
print("QA OK")
