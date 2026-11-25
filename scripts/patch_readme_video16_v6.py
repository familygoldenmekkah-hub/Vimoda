#!/usr/bin/env python3
"""Patch README master katalog (tahap 6): aturan #43 rev15 video 16 -
voice acting pipeline engine-adapter + timeline satu sumber dari voice."""
from pathlib import Path
import re

P = Path("/home/z/my-project/scripts/vimoda07/package/README.md")
src = P.read_text()
nums = [int(m.group(1)) for m in re.finditer(r"(?m)^(\d+)\. ", src)]
last = max(nums)
assert last >= 42, f"aturan terakhir #{last}, harusnya sudah ada #42"
RULE = (f"\n{last + 1}. VOICE ACTING + TIMELINE SATU SUMBER (rev15, masukan "
 "pemilik: video tanpa voice terasa kosong): setiap pesan divoice-act 5 "
 "karakter suara berbeda. Pipeline engine-adapter di voice16rp.py: default "
 "edge-tts id-ID (Gadis/Ardi, variasi rate+pitch per chara); adapter "
 "VoiceStudio (OSS debpalash/VoiceStudio, CLI `voicestudio speak ... "
 "--output`, endpoint VOICESTUDIO_URL) dan z-ai TTS siap pakai - ganti "
 "engine tanpa menyentuh naskah. TIMELINE dihitung timeline16rp.py dari "
 "durasi tiap klip menjadi timing.json/const TM (satu sumber untuk engine, "
 "audio, QA, shoot): jeda pesan menyesuaikan panjang voice, durasi video "
 "mengikuti voice (bukan angka tetap). Audio memix klip di t0 pesan dengan "
 "ducking otomatis (bed -55% saat bicara); teks voice dinormalisasi lisan "
 "(2 pangkat empat puluh dua) dan tetap sopan (#39).")
i = src.rfind(f"\n{last}. ")
assert i > 0
j = src.find("\n\n", i)
assert j > i
src = src[:j] + RULE + src[j:]
if "VIDEO BARU rev14 SOPAN + ILUSTRASI AI + JAM NYAMBUNG + NIGHT LOFI" in src:
    src = src.replace("VIDEO BARU rev14 SOPAN + ILUSTRASI AI + JAM NYAMBUNG + NIGHT LOFI",
                      "VIDEO BARU rev15 VOICE ACTING + TIMELINE DARI VOICE")
else:
    raise SystemExit("penanda VIDEO 16 rev14 tidak ketemu")
P.write_text(src)
print(f"README: aturan #{last + 1} (VOICE ACTING + TIMELINE SATU SUMBER) "
      "disisipkan + baris VIDEO 16 -> rev15")
