#!/usr/bin/env python3
"""Patch README master katalog (tahap 2): ganti baris tabel VIDEO 16 dengan
dunia baru GRUP BAHAS FYP (LIPATAN KE-42) + sisipkan aturan seri baru
(dunia tiap video diganti total) setelah aturan bernomor terakhir."""
from pathlib import Path
import re

P = Path("/home/z/my-project/scripts/vimoda07/package/README.md")
src = P.read_text()

ROW16_NEW = ('| 16 | LIPATAN KE-42 RP: Bilangan Berpangkat | Blog Yuyanaka - '
 'artikel "Pikosa" (23 Nov 2026) | `16-bilangan-berpangkat/` (VIDEO BARU, '
 'dunia RP baru ala RP Telegram/TikTok gen Z: grup chat "GRUP BAHAS FYP" '
 'dengan chara OC bernama RAYA (🍿), BIMO (🎮), DILA (🧋), KAMU (🔍), ??? '
 '(🌙) - HUKUM SERI BARU: setiap video dunia diganti total (grup, anggota, '
 'avatar, setting) dan QA memblokir penanda dunia lama (KIOS PERMEN, '
 'PEMILIK KIOS, MENTOR, kios, kardus). Format terkunci rev9-11 tetap '
 'penuh: tanpa indikator pengetikan, 20 pesan jeda 3.0-6.3 s, dialog 60px, '
 'dialog manusiawi tanpa kalimat tema dan tanpa label di ucapan (kini '
 'dengan slang gen Z dan *aksi* ala RP), alur rantai sebab-akibat '
 'tertutup: RAYA bawa klaim viral FYP (kertas 0,1 mm dilipat dobel 42 '
 'kali tembus bulan, akun @batangkertas 2,1 jt nonton) -> BIMO menolak '
 'keras, debat pecah -> DILA cegah miskonsepsi (2^3 bukan 2×3; BIMO '
 'mengaku "gue dari dulu kira 2×3 = 6") -> diagram pangkat -> grup '
 'menghitung bertahap 2^10 = 10 cm, 2^20 = 105 m, 2^30 = 107 km -> '
 'diagram twist LIPATAN KE-42: 2^42 = 439.804 km > bulan 384.400 km, '
 'klaim TEBUS (semua angka terverifikasi kode), BIMO kalah dengan manis '
 '-> akun misterius ngepost bukti jam 2 pagi -> ??? bicara: dia pembuat '
 'video, moot pendiam yang tanam klaim gila tapi bener karena grupnya '
 'suka debat -> janji "hitung dulu baru komen"; tanya-jawab benar, tanpa '
 'kehadiran mustahil, tanpa pembelaan tak diminta; 3 diagram menyala: '
 'BILANGAN BERPANGKAT, PANGKAT VS PERKALIAN, LIPATAN KE-42 (chip 10 CM / '
 '105 M / 107 KM / 439 RIBU KM); papan ??? 4 soal dari uji pemahaman '
 'blog: HITUNG 3^4, HITUNG 5^3, HITUNG 7^0, HITUNG 2^-3 + 8 kartu bantu '
 '81, 125, 1, 64, 8, 27, 15, 12 (pengecoh 64/8/27); teaser 2^-1 minus?? '
 'untuk video pangkat negatif dan pecahan; 3 SVG dunia baru (tangkapan '
 'layar post FYP dengan bulan dan tombol play, kertas TANGGA DOBEL '
 '2^2-2^10 diclingkung "10 cm!", post bukti: bulan berkawah + garis '
 'jarak putus-putus + tag 2^42 = 439.804 KM + pil hijau TEMBUS), '
 'superskrip digambar tspan bukan karakter unicode; subtitle EN 26 beat '
 'baru; QA16 55 anchor wajib + daftar terlarang penuh + fontcheck >= '
 '24px termasuk teks SVG; audio pop per chara OC (RAYA 587, BIMO 330, '
 'DILA 494, KAMU 740, MYST 880), MA 56-57 hening, F MAJOR 75.3; '
 'WATERMARK AKIOMIDA tetap di posisi baru permintaan pemilik (portrait '
 'wmY 1560, landscape 870 = 3x jarak awal dari bawah); naskah16.md dan '
 'caption16.txt baru, render 2 orientasi 106 s + QA penuh + commit '
 'GitHub) |')

# 1) ganti baris tabel video 16 lama dengan dunia baru
lines = src.split("\n")
idx16 = [i for i, l in enumerate(lines) if l.startswith("| 16 |")]
assert len(idx16) == 1, f"baris | 16 | ditemukan {len(idx16)}x, harus 1x"
assert "Misteri Kardus Dobel" in lines[idx16[0]], "baris lama tidak sesuai"
lines[idx16[0]] = ROW16_NEW
src = "\n".join(lines)

# 2) sisipkan aturan seri baru (dunia tiap video diganti total) setelah
#    aturan bernomor terakhir sebelum tabel katalog
nums = [int(m.group(1)) for m in re.finditer(r"(?m)^(\d+)\. ", src)]
last = max(nums)
RULE = (f"\n{last + 1}. HUKUM SERI BARU RP (catatan pemilik studio, permanen "
 "sejak video 16): RP ala Telegram/TikTok gen Z WAJIB GANTI DUNIA TIAP "
 "VIDEO - nama grup chat, anggota chara OC bernama, avatar, label, dan "
 "setting dibuat segar dan tidak boleh dibawa ulang dari video lain; QA "
 "tiap video memblokir penanda dunia-dunia sebelumnya, sehingga penonton "
 "selalu dapat dunia baru dengan rasa chat fiction yang sama.")
anchor = f"\n\n{last + 1}. "  # penanda sisip: setelah baris aturan terakhir
i = src.rfind(f"\n{last}. ")
assert i > 0, "aturan terakhir tidak ketemu"
j = src.find("\n\n", i)
assert j > i, "batas akhir blok aturan tidak ketemu"
src = src[:j] + RULE + src[j:]

P.write_text(src)
print(f"README: baris VIDEO 16 diganti dunia baru + aturan #{last + 1} "
      "(dunia tiap video ganti total) disisipkan")
