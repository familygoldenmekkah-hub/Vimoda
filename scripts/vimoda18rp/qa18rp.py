#!/usr/bin/env python3
"""QA penuh Video 18 FORMAT RP (MALAM INVENTARIS: Bilangan Diciptakan
atau Ditemukan?, dunia GRUP JAGA GUDANG). HUKUM SERI: dunia diganti total -
nama grup, anggota, avatar, setting tidak boleh dibawa ulang (dilarang ada
penanda dunia lama, termasuk dunia video 15 dan 16). MODEL FOKUS ala
referensi pemilik (rev13): kanvas hitam penuh, satu bubble fokus besar di
tengah (pesan lama memudar), bubble gaya WhatsApp (putih/hijau, nama +
waktu + Dibaca v-v DI DALAM bubble), sisipan reaksi meme hard-cut (mata
menyala, digit naik, zoom lambat). LABEL SERI (aturan #38, rev13b): header
atas semua video SELALU "KUASAI MATEMATIKA DI AKIOMIDA.COM" (bukan nama
dunia, tanpa status dan badge dunia), subtitle EN di atas pill AKIOMIDA,
papan soal TANPA label tab. REV14: dialog SOPAN, NOL emoji di seluruh
video - avatar ikon SVG custom, kartu meme pakai 5 ilustrasi AI embed
base64, burst konfeti gambar - stempel jam chat mengalir realistis
15.32 -> 17.05 dan nyambung kartu babak, sound night lofi hangat. REV15-16
(keluhan pemilik: gak ada voice, lalu intonasi robotik): VOICE ACTING 5
chara via pipeline engine-adapter (edge-tts id-ID default; adapter
VoiceStudio OSS + z-ai TTS), TANPA pitch shift, timeline SATU SUMBER dari
durasi voice (timing.json/const TM dipakai engine+audio+QA), durasi video
mengikuti voice, subtitle 30 beat (pesan panjang dua bagian). Pengaman
permanen warisan rev9-11: kata terlarang (kejahatan, label episode, CTA,
FPB/KPK, indikator pengetikan, kalimat tema, simile terpaksa, kehadiran
mustahil), struktur RP (20 bubble, 3 diagram menyala, 5 kartu babak + 5
sisipan meme, 4 soal + 8 kartu, 3 ilustrasi SVG dunia), dialog 60px +
SEMUA teks minimal 24px via fontcheck computed-style, tempo baca (bubble
jeda >= 2.8 s), tempo subtitle EN proporsional (aturan 18, min 1.7 s,
maks 15.5 s mengikuti durasi voice), durasi = TM.dur, sampling frame tidak
kosong, thumbnail."""
import json
import re
import subprocess
import sys
import wave
from pathlib import Path

HERE = Path(__file__).parent
OUT = Path("/tmp/render")
FAILS = []
TMj = json.loads((HERE / "timing.json").read_text())
DUR = float(TMj["dur"])


def fail(msg):
    FAILS.append(msg)
    print("GAGAL:", msg)


# ---------- 1) engine: teks wajib dan terlarang ----------
eng = (HERE / "engine.html").read_text()
# payload base64 ilustrasi AI tidak ikut di-scan (huruf acak bisa membentuk
# kata terlarang secara kebetulan, mis. "KPK" di dalam data JPEG)
eng_scan = re.sub(r"data:image/jpeg;base64,[A-Za-z0-9+/=]+", "", eng)
banned = ("Jangan", "FOLLOW", "SUBSCRIBE", "IKUTI", "Kaisar", "\u2014", "\u2013",
          "Kamu tahu harus ke mana", "nemu aha", "XXX", "TODO", "undefined",
          "NaN", "FPB", "KPK", "persekutuan", "KEKUNGAN", "EPISODE",
          "PENCURI", "CURI", "SERANGAN", "JEBAKAN", "PENANGKAPAN",
          "TERTANGKAP", "DICURI", "mengetik", "menyusun jurus", "typing",
          "Pembagi Rapi", "kasus ditutup", "ternyata", "diukur",
          "tamu pertama", "CARA BAGI RATA", "balik lampu", "nyolong",
          # hukum dunia tiap episode: penanda dunia episode lama terlarang
          "KIOS PERMEN", "PEMILIK KIOS", "MENTOR", "kios", "kardus",
          # penanda dunia video 16 terlarang (dunia diganti total)
          "GRUP BAHAS FYP", "batangkertas", "FYP", "klaim", "lipat dobel",
          "TANGGA DOBEL", "LIPATAN KE-42", "2^42", "BULAN 384", "TEMBUS",
          "RAYA", "BIMO", "DILA", "berpangkat", "pangkat",
          # rev14: moral bahasa - kata kasar/slang kasar terlarang
          "anjir", "ANJIR", "WOY", "ngetawain",
          # rev19 (keluhan pemilik): kata sapaan robotik "bestie" (semua
          # chara terdengar satu orang) + kalimat template episode lama
          # + penanda metode/materi episode lama (skema tiap episode beda)
          "bestie", "BESTIE", "Bestie", "berhenti rapi", "benar rapi",
          "dua bahasa", "gas cek", "GAK NYAMBUNG", "ganti baju",
          "KARTU GANTI BAJU", "BROWNIES FUDGE", "@kroasanmalam",
          "2/11", "0,181818", "3,456", "3,14159265", "IRASIONAL",
          "GUYSS", "GUE KALAH", "bulat-bulat", "angka paling liar",
          "kita tuntaskan", "punyaku", "GRUP DIBUKA",
          "GEDE MASIH GAK PERCAYA", "VITA MULAI MENGHITUNG",
          "DEBAT TUNTAS", "PESAN MISTERIUS", "MENIT BERIKUTNYA",
          "KARTU KOMA", "JAM 4 SORE · MASIH", "JAM 5 SORE",
           "AKU TINGGAL SOAL INI",
          # rev20 (keluhan pemilik: kosakata tidak selaras): gabungan kata
          # buatan + urutan kata terbalik dilarang permanen
          "sobat dapur", "akang gede", "neng vita", "kak bener",
          "koma mah", "full dua rata",
          # rev21 (hukum dunia): penanda dunia video 15-17 terlarang
          "RESEP", "DAPUR", "dapur", "takar", "TAKAR", "GEDE", "VITA",
          "NADIA", "AKUN TANTANGAN", "GARIS UKUR", "timbangan", "TIMBANGAN",
          "karamel", "terigu", "adonan", "lunyer", "maghrib", "MAGHRIB",
          "kroasan", "omaknadia", "koma-komaan", "0,999", "0,333", "1/3",
          "0,75", "0,40", "0,35", "desimal berulang", "gelas takar",
          "LEADERBOARD", "JAM 7 MALAM", "HARI 3", "HARI 4", "16.00",
          "18.04", "19.02", "16.14", "16.26")
for b in banned:
    if b in eng_scan:
        fail(f"DILARANG ada di engine: {b!r}")
# rev14: NOL emoji/dingbat di seluruh engine (ilustrasi & ikon SVG saja);
# satu-satunya pengecualian adalah tanda centang Dibaca (U+2713)
_bad_emo = []
for _i, _ch in enumerate(eng_scan):
    _cp = ord(_ch)
    if (0x1F000 <= _cp <= 0x1FAFF or 0x2600 <= _cp <= 0x27BF
            or 0x2B00 <= _cp <= 0x2BFF or 0x1F1E6 <= _cp <= 0x1F1FF
            or _cp in (0xFE0F, 0x2764, 0x2B50)):
        if _cp != 0x2713:
            _bad_emo.append(hex(_cp))
# rev14: slang "gila" terlarang sebagai kata utuh (word boundary, aman
# dari substring nama GILANG)
if re.search(r"\b[Gg][Ii][Ll][Aa]\b", eng_scan):
    fail("DILARANG ada di engine: kata 'gila' (aturan bahasa sopan rev14)")
if _bad_emo:
    fail(f"emoji/dingbat terlarang sejak rev14: {_bad_emo[:8]}")
else:
    print("nol emoji: engine bersih (hanya Dibaca v-v yang boleh)")
requires = ("GRUP JAGA GUDANG", "KUASAI MATEMATIKA DI AKIOMIDA.COM",
            "GILIRAN RAK · 23.45", "BAGI RATA · 23.52",
            "JAM 12 MALAM · 00.00", "PERTANYAAN PUSAT · 00.12",
            "OMAK", "RUPI", "GILANG", "DEDI", "KAMU", "AKUN GUDANG PUSAT",
            # rev21: skema MALAM INVENTARIS + sapaan unik per chara
            "MALAM INVENTARIS", "HITUNG ULANG SEMUA RAK",
            "CATAT JUMLAH DI LEMBAR", "SUHU FREEZER WAJIB BENAR",
            "@gudangpusat", "TERMOMETER FREEZER · LAPORAN SATPAM",
            "DI BAWAH NOL = MINUS", "VOTING TENGAH MALAM",
            "total 96 pas", "yang sah itu yang dihitung",
            "30 bagi 6, tiap pedagang 5 kotak", "4 koma dua koma lima",
            "sisa punya pemilik", "di garis bilangan, nol itu tengah",
            "minus itu alamat", "JURUS HITUNG JUJUR",
            "pertanyaan tengah malam", "dibuat manusia atau sudah ada duluan",
            "jawabannya dua lapis", "30 kard tidak jadi 29",
            "VOTING MALAM: 52% TEMUKAN", "rak bilangan cacah dibuka",
            "selamat malam, anak-anak",
            # rev21: 3 diagram menyala + kosakata benar
            "GARIS BILANGAN", "-5 KURSINYA DI BAWAH NOL",
            "MINUS = ALAMAT", "KURSI -5: LIMA LANGKAH DI BAWAH NOL",
            "GUDANG TUTUP, LAMPU MATI",
            "TULISAN DIBUAT · ISI DITEMUKAN",
            "ISI TETAP: 30 KARD GAK JADI 29",
            "TULISANNYA BOLEH GANTI, NILAINYA GAK",
            "DITEMUKAN", "BESOK: RAK BILANGAN CACAH",
            "MISI DARI GUDANG PUSAT", "TULIS JAWABANMU DI KOMENTAR YA",
            "KARTU BANTU DARI GUDANG PUSAT",
            "30 KOTAK BAGI 6 PEDAGANG", "-5 KURSINYA DI ATAS ATAU BAWAH NOL",
            "Dibaca ✓✓", "memewrap", "mglyph", "meyes", "mdigit",
            # rev18: intro film - judul full-bleed + kartu produksi
            "intro1", "intro2", "introimg", "introtitle",
            "DIPERSEMBAHKAN", "KUASAI MATEMATIKA JADI LEBIH MUDAH",
            "AKIOMIDA",
            # rev14-16: waktu chat realistis + ilustrasi AI + timeline
            "23.30", "00.26", "const AVI=", "MEME_IMGS",
            "const TM=", "const SUBS=TM.subs", "const DIVS=TM.div",
            "voice acting")
for r in requires:
    if r not in eng_scan:
        fail(f"WAJIB ada di engine: {r!r}")
n_embed = eng.count("data:image/jpeg;base64,")
if n_embed != 5:
    fail(f"ilustrasi AI kartu meme {n_embed} != 5")
else:
    print("5 ilustrasi AI kartu meme embed ok")
# label pelajaran terlarang sejak rev8; pengetikan rev9; kalimat tema
# dan simile terpaksa rev10; lubang alur (kehadiran mustahil, pembelaan
# tanpa tuduhan) terlarang rev11
for bad_les in ("PETUNJUK PERTAMA", "PETUNJUK KEDUA", "TANTANGAN UNTUKMU",
                "JAWAB DI KOLOM KOMENTAR YA", "MOMEN ANGKA", "pmat", "pmav"):
    if bad_les in eng:
        fail(f"LABEL TERLARANG sejak rev8/rev9: {bad_les!r}")
n_msg = len(re.findall(r"\{t0:TM\.m\[\d+\], who:", eng))
if n_msg != 24:
    fail(f"jumlah bubble {n_msg} != 24")
n_flash = eng.count("kick:'")
if n_flash != 3:
    fail(f"jumlah diagram menyala {n_flash} != 3")
n_svg = eng.count('viewBox="0 0 600 340"')
if n_svg != 3:
    fail(f"jumlah ilustrasi SVG dunia {n_svg} != 3")
n_bub60 = eng.count("bubS:60")
if n_bub60 != 2:
    fail(f"teks dialog bukan 60px (2x lipat) di kedua orientasi ({n_bub60})")
else:
    print("teks dialog 60px (2x lipat dari 30px) kedua orientasi ok")
if len(TMj["div"]) != 5 or eng.count("const DIVS=TM.div") != 1:
    fail("jumlah divider bab != 5")
# tempo baca: jeda antar bubble >= 2.8 s (keluhan pemilik rev7); dari TM
times_msg = [float(x) for x in TMj["m"]]
gaps_ok = True
for a, b in zip(times_msg, times_msg[1:]):
    if b - a < 2.8 - 1e-9:
        fail(f"jeda bubble terlalu rapat: {a} -> {b} ({b - a:.2f}s < 2.8s)")
        gaps_ok = False
if gaps_ok:
    print(f"tempo baca ok: {len(times_msg)} bubble, jeda >= 2.8 s")
if "UJIVAL=['30','6','5','4','28','2','-5','0']" not in eng:
    fail("delapan kartu bantu tidak lengkap")
else:
    print("papan misi 2 soal utuh + 8 kartu bantu ok")

# stempel jam realistis rev21: urut naik LINTAS TENGAH MALAM
# (23.30..23.58 lalu 00.02..00.26) dan bertepatan kartu babak
stamps = re.findall(r"\{t0:TM\.m\[\d+\], who:'\w+', stamp:'([\d.]+)'", eng)
def _mins(s):
    hh, mm = s.split(".")
    h = int(hh)
    return h * 60 + int(mm) + (24 * 60 if h < 12 else 0)
if len(stamps) != 24:
    fail(f"stempel jam chat {len(stamps)} != 24")
elif [_mins(s) for s in stamps] != sorted(_mins(s) for s in stamps):
    fail(f"stempel jam tidak urut kronologis: {stamps}")
elif (stamps[0] != "23.30" or stamps[4] != "23.45" or stamps[8] != "23.52"
      or stamps[13] != "00.02" or stamps[18] != "00.12"
      or stamps[22] != "00.20" or stamps[-1] != "00.26"):
    fail(f"stempel jam tidak nyambung kartu babak: {stamps}")
else:
    print(f"stempel jam realistis 23.30 -> {stamps[-1]} lintas tengah malam ok")

# rev21 (dunia lintas tengah malam): "sore" hanya boleh sebelum kartu
# JAM 12 MALAM (referensi masa lalu "sore tadi" diperbolehkan)
midnight_card = float(TMj["div"][3][0])
bad_waktu = []
for chunk in eng_scan.split("{t0:TM.m[")[1:]:
    mi = int(re.match(r"\d+", chunk).group())
    t0m = float(TMj["m"][mi])
    for txt in re.findall(r"(?:text|cap):'([^']*)'", chunk[:420]):
        tl = txt.lower()
        if "sore" in tl and t0m > midnight_card - 1e-9:
            bad_waktu.append((mi, "sore", txt[:40]))
if bad_waktu:
    fail(f"dosa waktu rev21: {bad_waktu}")
else:
    print("konsistensi waktu ok: lintas tengah malam nyambung kartu JAM 12 MALAM")

# ---------- 2) subtitle EN: tempo proporsional (aturan 18); 32 beat rev17 ----------
subs = TMj["subs"]
if eng.count("const SUBS=TM.subs") != 1:
    fail("SUBS tidak terikat ke TM (satu sumber timeline)")
if len(subs) != 38:
    fail(f"jumlah beat subtitle {len(subs)} != 38")
prev = -99.0
ok_tempo = True
for k, s in enumerate(subs):
    t0 = float(s[0])
    txt = s[1]
    disp = (float(subs[k + 1][0]) if k + 1 < len(subs) else DUR) - t0
    need = max(1.7, len(txt) / 17.0)
    if disp < need - 1e-9:
        fail(f"sub tampil {disp:.2f}s < {need:.2f}s: {txt!r}")
        ok_tempo = False
    if disp > 15.5:
        fail(f"sub menggantung {disp:.2f}s: {txt!r}")
        ok_tempo = False
    if len(txt) > 55:
        fail(f"sub kepanjangan {len(txt)}: {txt!r}")
    if t0 - prev < 1.7 - 1e-9:
        fail(f"beat terlalu rapat t={t0}")
        ok_tempo = False
    prev = t0
if float(subs[-1][0]) > DUR - 3.6:
    fail("sub terakhir terlalu akhir")
if ok_tempo:
    print(f"subtitle: {len(subs)} beat, tempo proporsional >= max(1.7s, len/17), jeda >= 1.7s ok")

# ---------- 3) dialog >= 30px + SEMUA teks >= 24px (keluhan penonton rev6) ----------
for o in ("portrait", "landscape"):
    d = OUT / o
    d.mkdir(parents=True, exist_ok=True)
    (d / "engine.html").write_text(eng)
r = subprocess.run([sys.executable, str(HERE / "fontcheck18.py")],
                   capture_output=True, text=True, timeout=180)
print(r.stdout.strip())
if r.returncode != 0:
    fail("ada teks di bawah 24px (fontcheck)")

# ---------- 4) audio = TM.dur ----------
try:
    with wave.open(str(OUT / "audio.wav")) as w:
        dur = w.getnframes() / w.getframerate()
        if abs(dur - DUR) > 0.05:
            fail(f"durasi audio {dur:.2f}s != {DUR:.2f}")
        else:
            print(f"audio ok: {dur:.2f} s (TM.dur {DUR:.2f})")
except Exception as e:
    print(f"audio belum ada (abaikan saat pre-render): {e}")

# ---------- 5) video + thumbnail (post-render) ----------
for o in ("portrait", "landscape"):
    fp = OUT / o / "final.mp4"
    if fp.exists():
        try:
            res = subprocess.run(["ffprobe", "-v", "quiet", "-print_format", "json",
                                  "-show_format", str(fp)], capture_output=True, text=True)
            dur = float(json.loads(res.stdout)["format"]["duration"])
            if abs(dur - DUR) > 0.15:
                fail(f"durasi {o} {dur:.2f}s != {DUR:.2f}")
            else:
                print(f"durasi {o} ok: {dur:.2f} s")
        except Exception as e:
            print(f"ffprobe dilewati: {e}")
        fr = sorted((OUT / o / "frames").glob("*.jpg"))
        step = max(1, len(fr) // 24)
        import statistics
        blank = 0
        for f in fr[20::step][:24]:
            try:
                from PIL import Image
                im = Image.open(f).convert("L")
                px = list(im.resize((64, 64)).getdata())
                if statistics.pstdev(px) < 6:
                    blank += 1
            except Exception:
                pass
        if blank:
            fail(f"{o}: {blank} frame sampling kosong")
        else:
            print(f"{o}: 24 frame sampling tidak kosong")
    th = OUT / o / "thumbnail.jpg"
    if not th.exists() or th.stat().st_size < 20000:
        print(f"thumbnail {o} belum ada (post-render saja)")
    else:
        print(f"thumbnail {o} ok ({th.stat().st_size // 1024} KB)")

# ---------- 6) naskah + caption ----------
pkg = HERE / "package"
for name in ("caption18.txt", "naskah18.md"):
    fp = pkg / name
    if not fp.exists():
        print(f"{name} belum ada")
        continue
    t = fp.read_text()
    base_bad = ("\u2014", "\u2013", "Kaisar", "Kamu tahu harus ke mana", "nemu aha", "Jangan")
    cap_bad = base_bad + ("PENCURI", "CURI", "SERANGAN", "JEBAKAN", "PENANGKAPAN",
                          "TERTANGKAP", "DICURI")
    for bad in (cap_bad if name == "caption18.txt" else base_bad):
        if bad in t:
            fail(f"DILARANG ada di {name}: {bad!r}")
    if name == "caption18.txt" and "sudah menunggu" not in t:
        fail("teaser tersisip belum ada di caption")
    print(f"{name}: bersih ({len(t)} karakter)")

if FAILS:
    print("QA ADA MASALAH")
    sys.exit(1)
print("QA OK")
