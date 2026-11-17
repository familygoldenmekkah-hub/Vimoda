#!/usr/bin/env python3
"""Revisi 2 video 12: narasi pedagogi pemula (aturan 29).
Asumsi penonton: nol dasar matematika. Narasi direwrite:
- bahasa tongkrongan (kayak, nggak, deh) sesuai aturan 7,
- satu gagasan kecil per kalimat, istilah selalu dijemput maknanya,
- arc dopamin: penasaran -> analogi sehari-hari -> momen aha -> tugas kecil.
Panel: REAL = NYATA, definisi kolom versi pemula, catatan pi.
Juga menambah 3 cue audio pedagogis. Validasi panjang semua sub."""
import pathlib

# ---------- 16 sub revisi (anchor waktu TIDAK berubah, panel tetap sinkron) ----------
SUBS = [
    (0.50, "Coba deh lihat enam angka ini baik-baik.", "Take a good look at these six numbers.", "#FFFFFF"),
    (3.10, "Bentuknya beda-beda. Tapi mereka satu keluarga.", "Different shapes. But one family.", "#FFFFFF"),
    (6.60, "Keluarganya bernama: bilangan real.", "The family name: real numbers.", "#FFFFFF"),
    (9.60, "Real artinya nyata: angka untuk nilai nyata.", "Real means actual: numbers we truly use.", "#FFFFFF"),
    (13.00, "Nilai 0,75, suhu -2,5, semua nyata.", "Values 0.75, minus 2.5, all real.", "#FFFFFF"),
    (16.40, "Kelompok pertama: yang bisa jadi pecahan.", "First group: can be written as fractions.", "#FFFFFF"),
    (19.30, "Namanya rasional. Kayak 0,75 itu 3/4.", "Rational. Like 0.75, that is 3 over 4.", "#FFFFFF"),
    (22.50, "Kelompok kedua: nggak mau jadi pecahan.", "Second group: refuses to be a fraction.", "#FFFFFF"),
    (25.50, "Kayak pi dan akar 2. Namanya irasional.", "Like pi and root 2. Called irrational.", "#FFFFFF"),
    (28.50, "Dan nggak ada yang nyangkut di antaranya.", "And nothing hangs in between.", "#D97A2E"),
    (32.70, "Di garis bilangan, tiap angka punya kursi.", "On the number line, each has its own seat.", "#FFFFFF"),
    (35.10, "Setengah di antara 0 dan 1. Akar 2 sebelum 2.", "Half between 0 and 1. Root 2 before 2.", "#FFFFFF"),
    (38.60, "Pi? Angkanya nggak selesai, kursinya tetap pasti.", "Pi never ends, yet its seat stays fixed.", "#D97A2E"),
    (41.50, "Makanya penting: ukuran nyata jarang pas bulat.", "Real matters: real sizes are rarely whole.", "#D97A2E"),
    (44.90, "Enam kartu, tugas kecil: jawabnya di komentar.", "Six cards, small homework: answer below.", "#FFFFFF"),
    (50.07, "Terima kasih sudah menonton.", "Thanks for watching.", "#FFE9A8"),
]
# ---------- validasi ----------
BANNED = ["DUA KELUARGA", "JAWAB DI KOMEN", "JAWAB DI KOMENTAR", "KELOMPOKKAN DI KOMEN", "APA ITU IRASIONAL"]
ok = True
for t, iid, ien, _ in SUBS:
    lid, le = len(iid), len(ien)
    flag = "OK" if lid <= 49 and le <= 49 else "TOO LONG"
    if flag != "OK":
        ok = False
    up = (iid + " " + ien).upper()
    hit = [b for b in BANNED if b in up]
    if hit:
        ok = False
        flag += " BANNED:" + ",".join(hit)
    print(f"t={t:<5} ID={lid:>2} EN={le:>2} {flag} | {iid}")
assert ok, "ada sub yang gagal validasi"
print("validasi 16 sub OK, maks", max(len(s[1]) for s in SUBS), "char")

# ---------- patch frag_render.js: ganti SUBS ----------
rr = pathlib.Path("/home/z/my-project/scripts/vimoda12/frag_render.js")
r = rr.read_text()
start = r.index("const SUBS=[")
end = r.index("];", start) + 2
lines = ["const SUBS=["]
for t, iid, ien, col in SUBS:
    lines.append(f"  [{t},'{iid}','{ien}','{col}'],")
lines.append("];")
r = r[:start] + "\n".join(lines) + r[end:]
rr.write_text(r)
print("frag_render.js SUBS diganti")

# ---------- patch frag_core.js: teks panel versi pemula ----------
cc = pathlib.Path("/home/z/my-project/scripts/vimoda12/frag_core.js")
c = cc.read_text()
reps = [
    # wawasan kunci: REAL = NYATA (dipanggil sub 4)
    ("p1Big.textContent='RASIONAL + IRASIONAL';", "p1Big.textContent='REAL = NYATA';"),
    # definisi kolom versi pemula (dipanggil sub 6-9)
    ("'BISA DITULIS a/b, b TIDAK 0'", "'BISA JADI PECAHAN a/b'"),
    ("'TIDAK BISA DITULIS a/b'", "'TIDAK BISA JADI PECAHAN'"),
    # catatan pi versi kursi (dipanggil sub 13)
    ("p3Note.textContent='NILAI TETAP BISA DITENTUKAN';", "p3Note.textContent='WALAU NGGAK SELESAI, POSISI PASTI';"),
]
for a, b in reps:
    assert a in c, f"anchor hilang: {a[:40]}"
    c = c.replace(a, b)
cc.write_text(c)
print("frag_core.js teks panel diganti")

# ---------- patch audio12.py: 3 cue pedagogis ----------
aa = pathlib.Path("/home/z/my-project/scripts/vimoda12/audio12.py")
a = aa.read_text()
anchor = "for t0 in [41.4, 41.8, 42.2, 42.6]:"
add = (
    "add(13.0, tick(980, 0.05))               # sub: nilai sehari-hari 0,75 dan -2,5\n"
    "add(28.5, tick(640, 0.06))               # payoff: nggak ada yang nyangkut\n"
    "add(35.1, tick(720, 0.05))               # kursi: setengah dan akar 2\n"
)
assert anchor in a and "add(13.0, tick(980" not in a
a = a.replace(anchor, add + anchor)
aa.write_text(a)
print("audio12.py cue pedagogis ditambah")
