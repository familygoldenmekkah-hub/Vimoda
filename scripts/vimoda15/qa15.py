#!/usr/bin/env python3
"""QA penuh Video 15 rev3 (Misteri Pembagi Rapi).
Cek: durasi, frame sampling tidak kosong, teks engine (larangan + wajib),
23 beat narasi, papan soal, kartu bantu, caption, naskah, thumbnail."""
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).parent
OUT = Path("/tmp/render")
ok = True


def fail(msg):
    global ok
    ok = False
    print("GAGAL:", msg)


engine = (HERE / "engine.html").read_text()

# 1) durasi final.mp4 kedua orientasi harus 78.0 +/- 0.5 s
for o in ("portrait", "landscape"):
    f = OUT / o / "final.mp4"
    if not f.exists():
        fail(f"{o}/final.mp4 tidak ada")
        continue
    dur = float(subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(f)]).decode().strip())
    if abs(dur - 84.0) > 0.5:
        fail(f"durasi {o} {dur:.2f} s di luar band 84.0+/-0.5")
    else:
        print(f"durasi {o} ok: {dur:.2f} s")

# 2) 24 frame sampling tidak kosong per orientasi
try:
    from PIL import Image
    for o in ("portrait", "landscape"):
        frames = sorted((OUT / o / "frames").glob("*.jpg"))
        picks = [frames[int(i * (len(frames) - 1) / 23)] for i in range(24)]
        blank = 0
        for fp in picks:
            im = Image.open(fp).convert("L")
            h = im.histogram()
            nonwhite = 1 - h[255] / sum(h)
            if nonwhite < 0.04:
                blank += 1
        if blank:
            fail(f"{o}: {blank} frame sampling kosong")
        else:
            print(f"{o}: 24 frame sampling tidak kosong")
except Exception as e:
    fail(f"frame sampling: {e}")

# 3) teks engine: larangan keras
txt = engine
for bad in ("\u2014", "\u2013", "Kaisar", "KAISAR", "TODO", "undefined", "NaN",
            "FOLLOW", "SUBSCRIBE", "IKUTI", "Kamu tahu harus ke mana", "nemu aha",
            "PETAK TANAM", "JURUS URAI PRIMA", "sudah disemai", "BENIH PETAK",
            "FPB", "KPK", "PERSEKUTUAN", "URAI JADI PERKALIAN PRIMA",
            "DELAPAN BISA", "EPISODE 15", "EPISODE 16", "EPISODE",
    "PENCURI", "CURI", "SERANGAN", "JEBAKAN", "PENANGKAPAN", "TERTANGKAP",
    "DICURI"):
    if bad in txt:
        fail(f"DILARANG ada di engine: {bad!r} (aturan 32 rev3 / jaga lingkup episode)")
# 3b) elemen wajib aturan 34 + aturan 32
for need, label in (("JURUS BAGI RATA", "aturan 34: jurus bernama"),
                    ("sudah menunggu", "aturan 32: teaser tersisip"),
                    ("TANTANGAN UNTUKMU", "aturan 34: framing tantangan"),
                    ("JAWAB DI KOLOM KOMENTAR YA", "aturan 30: pil spesifik"),
                    ("KARTU BANTU MISI NOMOR SATU", "aturan 30: catatan kartu"),
                    ("MISTERI PEMBAGI RAPI", "judul misteri positif"),
                    ("PETUNJUK: SISA SATU!", "stempel petunjuk"),
                    ("TERIMA KASIH!", "stempel ucapan"),
                    ("berbagi", "moral berbagi"),
                    ("TERBATAS VS TANPA BATAS", "twist aturan 34")):
    if need not in txt:
        fail(f"WAJIB ada di engine ({label}): {need!r}")
if ok:
    print("engine: teks bersih, elemen wajib lengkap")

# 4) papan soal tampil utuh bernomor (aturan 30) + 8 kartu bantu
core = (HERE / "frag_core.js").read_text()
for soal in ("TENTUKAN SEMUA FAKTOR DARI 20.", "LIMA KELIPATAN PERTAMA DARI 7.",
             "KENAPA 5 BUKAN FAKTOR DARI 12?", "FAKTOR ATAU KELIPATAN: TAK TERBATAS?"):
    if soal not in core:
        fail(f"soal hilang di papan: {soal!r}")
if "['1','2','3','4','5','8','10','20']" not in core:
    fail("delapan kartu bantu tidak lengkap")
else:
    print("papan soal 4 nomor utuh + 8 kartu bantu ok")

# 5) narasi: 23 beat, jeda >= 2.7 s, panjang <= 49, sub terakhir sebelum 76
subs = re.findall(r"\[(\d+\.?\d*),'([^']*)','([^']*)','#(?:[0-9A-F]{6})'\]",
                  (HERE / "frag_render.js").read_text())
if len(subs) != 23:
    fail(f"jumlah beat {len(subs)} != 23")
prev = -9.0
for s in subs:
    t0 = float(s[0])
    if t0 - prev < 2.7 - 1e-9:
        fail(f"jeda terlalu rapat di t={t0} (gap {t0 - prev:.2f})")
    if max(len(s[1]), len(s[2])) > 49:
        fail(f"sub kepanjangan: {s[1]!r}")
    prev = t0
if float(subs[-1][0]) > 81:
    fail("sub terakhir terlalu akhir")
print(f"narasi: {len(subs)} beat, sub terakhir t={subs[-1][0]}, jeda >= 2.7 s ok")

# 6) caption + naskah
pkg = HERE / "package"
for name in ("caption15.txt", "naskah15.md"):
    t = (pkg / name).read_text()
    base_bad = ("\u2014", "\u2013", "Kaisar", "Kamu tahu harus ke mana", "nemu aha",
                "Jangan")
    cap_bad = base_bad + ("PENCURI", "CURI", "SERANGAN", "JEBAKAN", "PENANGKAPAN",
                          "TERTANGKAP", "DICURI")
    for bad in (cap_bad if name == "caption15.txt" else base_bad):
        if bad in t:
            fail(f"DILARANG ada di {name}: {bad!r} (aturan 25/32 rev3)")
    if name == "caption15.txt" and "sudah menunggu" not in t:
        fail("teaser tersisip belum ada di caption")
    print(f"{name}: bersih ({len(t)} karakter)")

# 7) thumbnail kedua orientasi ada dan tidak kosong
for o in ("portrait", "landscape"):
    fp = OUT / o / "thumbnail.jpg"
    if not fp.exists() or fp.stat().st_size < 20000:
        fail(f"thumbnail {o} hilang/kecil")
    else:
        print(f"thumbnail {o} ok ({fp.stat().st_size // 1024} KB)")

print("QA OK" if ok else "QA ADA MASALAH")
sys.exit(0 if ok else 1)
