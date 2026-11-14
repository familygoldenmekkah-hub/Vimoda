#!/usr/bin/env python3
"""Contact sheet QA untuk frame kunci.
Pemakaian: python3 sheet.py <portrait|landscape> [safe]
Tile diberi label frame + timestamp. Arg 'safe' menggambar garis merah y=1380 (portrait).
"""
import pathlib
import sys

from PIL import Image, ImageDraw

ORIENT = sys.argv[1] if len(sys.argv) > 1 else "portrait"
SAFE = len(sys.argv) > 2 and sys.argv[2] == "safe"
SRC = pathlib.Path(f"/tmp/render/{ORIENT}")
OUTP = pathlib.Path(f"/tmp/render/{ORIENT}/sheet.jpg")

tiles = sorted(SRC.glob("key_*.jpg"))
COLS = 4
ROWS = (len(tiles) + COLS - 1) // COLS
TW = 500
if ORIENT == "portrait":
    TH = int(TW * 1920 / 1080)
else:
    TH = int(TW * 1080 / 1920)
PAD = 26
LBL = 34
sheet = Image.new("RGB", (COLS * (TW + PAD) + PAD, ROWS * (TH + LBL + PAD) + PAD), (18, 22, 34))
dr = ImageDraw.Draw(sheet)
for idx, p in enumerate(tiles):
    im = Image.open(p)
    if SAFE and ORIENT == "portrait":
        d2 = ImageDraw.Draw(im)
        yy = int(1380 / 1920 * im.height)
        d2.line([(0, yy), (im.width, yy)], fill=(255, 40, 40), width=4)
    im = im.resize((TW, TH))
    r, c = idx // COLS, idx % COLS
    x = PAD + c * (TW + PAD)
    y = PAD + r * (TH + LBL + PAD)
    sheet.paste(im, (x, y))
    fnum = int(p.stem.split("_")[1])
    dr.text((x + 6, y + TH + 6), f"frame {fnum}  t={fnum/30:.2f}s", fill=(230, 230, 230))
sheet.save(OUTP, quality=82)
print(f"sheet: {OUTP} ({sheet.width}x{sheet.height}), {len(tiles)} tiles")
