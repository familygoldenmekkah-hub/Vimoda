#!/usr/bin/env python3
"""Patch README master katalog (tahap 5): sisipkan aturan #39-#42 hasil
masukan pemilik rev14 video 16 - bahasa sopan, nol emoji (ilustrasi),
waktu chat realistis, sound night lofi."""
from pathlib import Path
import re

P = Path("/home/z/my-project/scripts/vimoda07/package/README.md")
src = P.read_text()

nums = [int(m.group(1)) for m in re.finditer(r"(?m)^(\d+)\. ", src)]
last = max(nums)
assert last >= 38, f"aturan terakhir #{last}, harusnya sudah ada #38"
RULES = (
 "\n{0}. BAHASA SOPAN (rev14, masukan pemilik: moral bahasa): dialog chat "
 "story WAJIB sopan - tanpa ANJIR, GILA, WOY, ngetawain dan sejenisnya; "
 "reaksi pakai kata netral (GAK MUNGKIN DEH, ADUH, MANTAP). QA memasukkan "
 "kata-kata itu ke daftar terlarang permanen."
 "\n{1}. NOL EMOJI (rev14, masukan pemilik: emoji comot terasa murahan): "
 "seluruh video TANPA emoji - avatar chara pakai IKON SVG digambar custom, "
 "kartu sisipan meme pakai ILUSTRASI AI konsisten (flat midnight-gold, "
 "5 gambar embed base64 di frag_imgs.html), burst reaksi pakai konfeti "
 "gambar (lingkaran + kotak berputar), caption foto pakai bentuk digambar "
 "(hati = path SVG). QA memindai kode emoji di engine; satu-satunya "
 "pengecualian tanda centang Dibaca."
 "\n{2}. WAKTU REALISTIS (rev14, masukan pemilik: stempel jam ngawur): "
 "setiap pesan punya stempel jam eksplisit, urut naik, dan NYAMBUNG dengan "
 "kartu babak - contoh video 16: chat mulai 00.31, kembali 01.04 (JAM 1 "
 "PAGI), bukti ngepost tepat 02.00 (JAM 2 PAGI). QA memeriksa urutan dan "
 "titik sandung kartu babak."
 "\n{3}. SOUND NIGHT LOFI (rev14, masukan pemilik: sound lama gak sesuai "
 "konteks): audio chat story malam = pad lembut + arpeggio lofi + pop "
 "notifikasi bernada per chara + swell hangat di kartu babak + karpet tape "
 "noise pelan; TANPA kick/hi-hat ala klub, TANPA boom/whoosh trailer keras. "
 "Hening total 1 detik sebelum twist tetap.")
fmt = [last + 1, last + 2, last + 3, last + 4]
RULE = RULES.format(*fmt)
i = src.rfind(f"\n{last}. ")
assert i > 0, "aturan terakhir tidak ketemu"
j = src.find("\n\n", i)
assert j > i, "batas akhir blok aturan tidak ketemu"
src = src[:j] + RULE + src[j:]

# tandai baris video 16 rev13b -> rev14
if "VIDEO BARU rev13b MODEL FOKUS + LABEL SERI" in src:
    src = src.replace("VIDEO BARU rev13b MODEL FOKUS + LABEL SERI",
                      "VIDEO BARU rev14 SOPAN + ILUSTRASI AI + JAM NYAMBUNG + NIGHT LOFI")
elif "VIDEO BARU rev13 MODEL FOKUS" in src:
    src = src.replace("VIDEO BARU rev13 MODEL FOKUS",
                      "VIDEO BARU rev14 SOPAN + ILUSTRASI AI + JAM NYAMBUNG + NIGHT LOFI")
else:
    raise SystemExit("penanda VIDEO 16 tidak ketemu")

P.write_text(src)
print(f"README: aturan #{fmt[0]}-#{fmt[-1]} (SOPAN, NOL EMOJI, WAKTU "
      "REALISTIS, NIGHT LOFI) disisipkan + baris VIDEO 16 -> rev14")
