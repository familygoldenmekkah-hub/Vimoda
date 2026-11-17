#!/usr/bin/env python3
"""Aturan 29 (pedagogi pemula, dari catatan revisi video 12) + tanda revisi di baris katalog episode 12."""
import pathlib

R = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
r = R.read_text()

anchor = "## Katalog"
rule = """29. Pedagogi pemula dan dopamin (catatan pemilik studio, revisi 2 video 12, permanen): anggap penonton NOL DASAR matematika - narasi DILARANG memadatkan materi jadi headline istilah; setiap istilah wajib dijemput maknanya dengan bahasa tongkrongan sesuai aturan 7 (kayak, nggak, deh) dan analogi sehari-hari yang bikin penonton nyaman (uang kembalian, suhu, kursi di garis bilangan); susun arc dopamin per bab: buka rasa penasaran, hadiahkan momen aha yang eksplisit dan terlihat di layar (contoh: REAL = NYATA; tiap angka punya kursi; pi nggak selesai tapi kursinya tetap pasti), lalu tutup dengan tugas kecil yang terasa ringan; meringkas sumber boleh, makna tidak boleh hilang - uji lolos: penonton bodoh matematika tetap ngerti tanpa nonton ulang.

"""
assert r.count(anchor) == 1 and "Pedagogi pemula dan dopamin" not in r
r = r.replace(anchor, rule + anchor)

i = r.index("12-realino/")
j = r.index("|\n", i)
seg = r[i:j]
assert seg.endswith("bar 50.9-51.4) "), repr(seg[-40:])
new = ("bar 50.9-51.4; revisi 2 pedagogi pemula aturan 29: narasi direwrite bahasa tongkrongan dengan arc penasaran-analogi-aha, "
       "momen aha eksplisit REAL = NYATA, tiap angka punya kursi, pi nggak selesai kursinya tetap pasti, contoh 0,75 = 3/4, definisi kolom versi pemula "
       "BISA/TIDAK BISA JADI PECAHAN, uji dibingkai tugas kecil, tiga cue audio pedagogis 13.0/28.5/35.1) ")
r = r[:i] + new + r[j:]
R.write_text(r)
print("README: aturan 29 + revisi 2 episode 12 ok")
