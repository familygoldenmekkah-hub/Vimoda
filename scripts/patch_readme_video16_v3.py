#!/usr/bin/env python3
"""Patch README master katalog (tahap 3): sisipkan aturan #37 MODEL FOKUS
(dari referensi chat story yang diupload pemilik) setelah aturan #36 dan
tandai baris VIDEO 16 dengan rev13 model fokus."""
from pathlib import Path
import re

P = Path("/home/z/my-project/scripts/vimoda07/package/README.md")
src = P.read_text()

nums = [int(m.group(1)) for m in re.finditer(r"(?m)^(\d+)\. ", src)]
last = max(nums)
assert last >= 36, f"aturan terakhir #{last}, harusnya sudah ada #36"
RULE = (f"\n{last + 1}. MODEL FOKUS ala referensi pemilik (catatan studio, "
 "permanen sejak video 16 rev13): pemilik mengupload referensi chat story "
 "(TikTok @bulanishereee) dan meminta model itu ditiru - kanvas hitam "
 "pekat full-bleed tanpa bezel ponsel, SATU bubble besar fokus di tengah "
 "per saat (pesan lama memudar begitu balasan datang, scroll pelan "
 "mengunci bubble ke titik fokus), bubble gaya WhatsApp (putih untuk "
 "anggota, hijau untuk KAMU, nama chara + waktu 21.xx + Dibaca ✓✓ DI "
 "DALAM bubble), dan sisipan reaksi meme hard-cut di sela babak (glyph "
 "besar zoom lambat ala meme, mata menyala, shake masuk, thud "
 "sinematik). Dialog tetap 60px dan semua hukum rev9-11 tetap berlaku.")
i = src.rfind(f"\n{last}. ")
assert i > 0, "aturan terakhir tidak ketemu"
j = src.find("\n\n", i)
assert j > i, "batas akhir blok aturan tidak ketemu"
src = src[:j] + RULE + src[j:]

# tandai baris video 16 dengan rev13
row = [l for l in src.split("\n") if l.startswith("| 16 |")]
assert len(row) == 1
newrow = row[0].replace("(VIDEO BARU, dunia RP baru",
    "(VIDEO BARU rev13 MODEL FOKUS, dunia RP baru")
src = src.replace(row[0], newrow)

P.write_text(src)
print(f"README: aturan #{last + 1} MODEL FOKUS disisipkan + baris VIDEO 16 "
      "ditandai rev13")
