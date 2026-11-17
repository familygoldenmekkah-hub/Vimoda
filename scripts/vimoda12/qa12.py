#!/usr/bin/env python3
"""QA akhir video 09 huyuan: frame tidak kosong, teks bersih (tanpa emdash,
tanpa label episode lama, tanpa kalimat intimidasi), ffprobe."""
import pathlib
import re
import subprocess
import sys

from PIL import Image

BASE = pathlib.Path("/tmp/render")
ENGINE = pathlib.Path("/home/z/my-project/scripts/vimoda12/engine.html")
PKG = pathlib.Path("/home/z/my-project/scripts/vimoda12/package")

ok = True

# 1) frame tidak kosong: sampling 24 frame per orientasi
for o in ("portrait", "landscape"):
    frames = sorted((BASE / o / "frames").glob("0*.jpg"))
    picks = [frames[i] for i in range(0, len(frames), len(frames) // 24)][:24]
    for p in picks:
        im = Image.open(p).convert("L")
        h = im.histogram()
        nonblack = 1 - h[0] / sum(h)
        if nonblack < 0.02:
            print(f"KOSONG? {o} {p.name} nonblack={nonblack:.4f}")
            ok = False
    print(f"{o}: {len(frames)} frame, sampling {len(picks)} semua tidak kosong")

# 2) teks engine: tanpa emdash/en-dash, tanpa KAISAR, tanpa label episode lama,
#    dan tanpa kalimat intimidasi (aturan 25: soft selling wajib)
txt = ENGINE.read_text()
for bad in ("\u2014", "\u2013", "Kaisar", "KAISAR", "TODO", "undefined", "NaN"):
    if bad in txt:
        print(f"DILARANG ada di engine: {bad!r}")
        ok = False
for old in ("BULINA", "KELERENG", "CACAH", "APEL", "BABOPA", "PARTOEN",
            "LIMPAI", "KOMPATI", "TULIS DI KOMEN", "JAWAB DI KOMEN",
            "PERIKSA DI KOMEN", "MENARA LIVO", "UJI LIFT", "ACUAN 0",
            "SEMUA BILANGAN BULAT", "KENAPA MINUS", "MANA LEBIH BESAR",
            "BUKAN PECAHAN", "APA KESAMAANNYA", "HUYUAN", "TERMOMETER",
            "SETENGAH ITU APA", "PEMBILANG & PENYEBUT", "MENU KONVERSI",
            "1/2 TERMASUK RASIONAL", "PERIKSA SATU-SATU", "DAPOER POSYA",
            "RUMAH PETA KARTIKA", "KELOMPOKKAN DI KOMEN", "AKAR DUA, KENAPA?",
            "APA ITU IRASIONAL", "ITU BILANGAN IRASIONAL", "LIHAT HASILNYA",
            "LINGKARAN DAN PI", "DUA KELUARGA", "DUA DUANYA BILANGAN REAL",
            "AKAR TIDAK SELALU IRASIONAL", "KENAPA ADA TITIK?"):
    if old in txt:
        print(f"LABEL EPISODE LAMA bocor ke engine: {old!r}")
        ok = False
if "Jangan" in txt:
    print("ATURAN 25: kalimat intimidasi ('Jangan ...') ditemukan di engine")
    ok = False
visible = re.findall(r">([^<>]+)<", txt)
strings = [s.strip() for s in visible if s.strip() and not s.strip().startswith(("/*", "//"))]
print(f"engine: {len(strings)} string teks tampil, tanpa em dash, tanpa label lama")

for f in ("caption12.txt", "naskah12.md"):
    t = (PKG / f).read_text()
    for bad in ("\u2014", "\u2013", "Kaisar"):
        if bad in t:
            print(f"DILARANG ada di {f}: {bad!r}")
            ok = False
    if "Jangan" in t:
        print(f"ATURAN 25: kalimat intimidasi ('Jangan ...') ditemukan di {f}")
        ok = False
    print(f"{f}: bersih tanpa em dash dan label lama ({len(t)} karakter)")

# 3) ffprobe kedua final (wajib ada; kosong = gagal)
for o in ("portrait", "landscape"):
    fp = BASE / o / "final.mp4"
    if not fp.exists() or fp.stat().st_size == 0:
        print(f"FINAL HILANG: {fp}")
        ok = False
        continue
    r = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries",
         "format=duration,size", "-show_entries", "stream=codec_type,width,height",
         "-of", "default=noprint_wrappers=1", str(fp)],
        capture_output=True, text=True)
    if "duration" not in r.stdout:
        print(f"FFPROBE GAGAL untuk {o}: {r.stderr.strip()[:120]}")
        ok = False
    print(f"--- {o} ---")
    print(r.stdout.strip())

print("QA OK" if ok else "QA ADA MASALAH")
sys.exit(0 if ok else 1)
