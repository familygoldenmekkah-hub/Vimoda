#!/usr/bin/env python3
"""Patch README master katalog (tahap 4): sisipkan aturan #38 LABEL SERI -
header semua video selalu KUASAI MATEMATIKA DI AKIOMIDA.COM, subtitle EN
di atas pill AKIOMIDA (AKIOMIDA turun), papan soal tanpa label tab."""
from pathlib import Path
import re

P = Path("/home/z/my-project/scripts/vimoda07/package/README.md")
src = P.read_text()

nums = [int(m.group(1)) for m in re.finditer(r"(?m)^(\d+)\. ", src)]
last = max(nums)
assert last >= 37, f"aturan terakhir #{last}, harusnya sudah ada #37"
RULE = (f"\n{last + 1}. LABEL SERI (catatan pemilik, permanen untuk SEMUA "
 "video sejak video 16 rev13b): judul header atas selalu "
 "\"KUASAI MATEMATIKA DI AKIOMIDA.COM\" - apapun videonya, judulnya itu "
 "(bukan nama dunia/grup; status dan badge dunia dibuang). Subtitle "
 "terjemahan EN dipindah DI ATAS pill AKIOMIDA dan pill AKIOMIDA turun "
 "lagi (portrait: subtitle 1560, AKIOMIDA 1740; landscape: subtitle 855, "
 "AKIOMIDA 965). Label tab pada papan soal (\"PAPAN ???\") DIHAPUS "
 "karena menutupi bahasan di papan - papan tampil bersih tanpa tab.")
i = src.rfind(f"\n{last}. ")
assert i > 0, "aturan terakhir tidak ketemu"
j = src.find("\n\n", i)
assert j > i, "batas akhir blok aturan tidak ketemu"
src = src[:j] + RULE + src[j:]

# tandai baris video 16 rev13 -> rev13b
assert src.count("VIDEO BARU rev13 MODEL FOKUS") == 1
src = src.replace("VIDEO BARU rev13 MODEL FOKUS",
                  "VIDEO BARU rev13b MODEL FOKUS + LABEL SERI")

P.write_text(src)
print(f"README: aturan #{last + 1} LABEL SERI disisipkan + baris VIDEO 16 "
      "ditandai rev13b")
