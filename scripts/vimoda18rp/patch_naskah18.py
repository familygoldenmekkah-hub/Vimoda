#!/usr/bin/env python3
"""Patch naskah18.md + caption18.txt untuk rev18 clone 17: durasi baru
310.3 s, semua anchor waktu +5.4 s, deskripsi INTRO FILM (kartu judul
full-bleed + kartu produksi dipersembahkan). Setiap replace diverifikasi."""
from pathlib import Path

HERE = Path(__file__).parent
PKG = HERE / "package"

NAS = [
    # durasi + F MAJOR
    ("Durasi 304.9 s (rev16: mengikuti durasi voice, timing.json)",
     "Durasi 310.3 s (rev18: mengikuti durasi voice, timing.json)"),
    ("F MAJOR hangat sejak kartu JAM 5 SORE (231.8)",
     "F MAJOR hangat sejak kartu JAM 5 SORE (237.2)"),
    # aturan 13 baru
    ("Ganti naskah voice = regenerate klip -> jalankan timeline -> seluruh video menyesuaikan otomatis.",
     "Ganti naskah voice = regenerate klip -> jalankan timeline -> seluruh video menyesuaikan otomatis.\n"
     "13. INTRO FILM (rev18, permintaan pemilik): buka ala produksi film profesional berkelas - "
     "KARTU JUDUL full-bleed (ilustrasi AI penuh layar + label GRUP RESEP GAGAL saja, TANPA label "
     "waktu dan tanpa teks lain, Ken Burns pelan 1.00-1.07, garis emas tumbuh) 0.4-4.2, lalu "
     "KARTU PRODUKSI \"DIPERSEMBAHKAN AKIOMIDA.COM - KUASAI MATEMATIKA JADI LEBIH MUDAH..\" "
     "(teks emas naik, garis gradien, shimmer sweep, sting warm major) 4.5-7.6; pesan pertama "
     "baru pop 8.2. Kartu meme lama \"GRUP DIBUKA\" digantikan kartu judul ini (div[0] string "
     "polos tanpa pair, label \"0,4,...\" hilang)."),
    # hening pra-twist
    ("hening total 1.0 s sebelum twist (176.3-177.3).",
     "hening total 1.0 s sebelum twist (181.7-182.7)."),
    # point 4 kartu sisipan
    ("chat resep terbuka \"GRUP DIBUKA\" (0.4), timbangan digital \"GEDE MASIH GAK PERCAYA\" "
     "(46.7), takar+timbangan digit naik \"VITA MULAI MENGHITUNG\" (90.7), amplop resep ke "
     "spiral angka \"DEBAT TUNTAS, BUKTI TIBA\" (182.5), chef misterius \"PESAN MISTERIUS "
     "MASUK\" (231.8). Label waktu babak dari DIVS tetap tampil di sisipan (hukum kartu waktu "
     "dipertahankan, QA 5 entri).",
     "kartu judul GRUP RESEP GAGAL full-bleed (0.4, tanpa label waktu), timbangan digital "
     "\"GEDE MASIH GAK PERCAYA\" (52.1), takar+timbangan digit naik \"VITA MULAI MENGHITUNG\" "
     "(96.1), amplop resep ke spiral angka \"DEBAT TUNTAS, BUKTI TIBA\" (187.9), chef misterius "
     "\"PESAN MISTERIUS MASUK\" (237.2). Label waktu babak dari DIVS tetap tampil di sisipan "
     "kartu 1-4 (hukum kartu waktu dipertahankan, QA 5 entri)."),
    # alur KI
    ("| KI | 0.0-49.3 | Kartu GRUP RESEP GAGAL 15.32; NADIA post resep (2.8):",
     "| KI | 0.0-54.7 | INTRO FILM: kartu judul GRUP RESEP GAGAL (0.4-4.2) lalu kartu produksi "
     "dipersembahkan akiomida.com (4.5-7.6); NADIA post resep (8.2):"),
    # SHO 1
    ("| SHO 1 | 46.7-90.7 | Kartu MENIT BERIKUTNYA;",
     "| SHO 1 | 52.1-96.1 | Kartu MENIT BERIKUTNYA;"),
    ("DIAGRAM NILAI TEMPAT (63.5-66.9;",
     "DIAGRAM NILAI TEMPAT (68.9-72.3;"),
    # SHO 2
    ("| SHO 2 | 90.7-177.3 | Kartu TIMBANGAN",
     "| SHO 2 | 96.1-182.7 | Kartu TIMBANGAN"),
    ("DIAGRAM BERHENTI VS BERULANG (114.6-118.0;",
     "DIAGRAM BERHENTI VS BERULANG (120.0-123.4;"),
    ("(+burst 119.6); GEDE:", "(+burst 125.0); GEDE:"),
    ("rises desimal 134.3-141.3 |", "rises desimal 139.7-146.7 |"),
    # MA + TWIST
    ("| MA | 176.3-177.3 |", "| MA | 181.7-182.7 |"),
    ("| TWIST | 177.3-181.3 |", "| TWIST | 182.7-186.7 |"),
    # KETSU + RESOLUSI
    ("| KETSU | 182.5-231.8 |", "| KETSU | 187.9-237.2 |"),
    ("| RESOLUSI | 231.8-266.3 |", "| RESOLUSI | 237.2-271.7 |"),
    ("NADIA post bukti (234.4):", "NADIA post bukti (239.8):"),
    ("F MAJOR 231.8; konfeti; reveal pop slow-motion + dolly 249.4",
     "F MAJOR 237.2; konfeti; reveal pop slow-motion + dolly 254.8"),
    # PAPAN + TEASER
    ("| PAPAN + TEASER | 276.8-304.9 |", "| PAPAN + TEASER | 282.2-310.3 |"),
    ("papan keluar 285.4; teaser 286.1", "papan keluar 290.8; teaser 291.5"),
    ("fade konten 299.9, AKIOMIDA.COM 300.1, bar 302.4, fade akhir 303.4",
     "fade konten 305.3, AKIOMIDA.COM 305.5, bar 307.8, fade akhir 308.8"),
    # subtitle + tipografi
    ("\"Thanks for watching.\" (300.5).", "\"Thanks for watching.\" (305.9)."),
    ("audio 304.9 s, sampling frame", "audio 310.3 s, sampling frame"),
    ("dolly reveal 249.4-252.2", "dolly reveal 254.8-257.6"),
]
CAP = [
    ("Dunia BARU, grup BARU. Masuk ke chat \"GRUP RESEP GAGAL\"",
     "Dunia BARU, grup BARU. Dibuka ala produksi film: kartu judul GRUP RESEP GAGAL full "
     "screen, lalu kartu dipersembahkan akiomida.com - kuasai matematika jadi lebih mudah. "
     "Baru masuk ke chat \"GRUP RESEP GAGAL\""),
]

def patch(fn, pairs):
    fp = PKG / fn
    t = fp.read_text()
    n = 0
    for old, new in pairs:
        if old in t:
            t = t.replace(old, new)
            n += 1
        elif new in t:
            pass  # sudah diterapkan (idempotent)
        else:
            raise AssertionError(f"{fn}: tidak ketemu keduanya: {old[:70]!r}")
    fp.write_text(t)
    print(f"{fn}: {n}/{len(pairs)} replace diterapkan ({len(t)} char)")

patch("naskah18.md", NAS)
patch("caption18.txt", CAP)
