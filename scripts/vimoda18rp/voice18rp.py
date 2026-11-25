#!/usr/bin/env python3
"""VOICE ACTING rev21 VIDEO 18 - generator suara 6 chara (24 klip).

Engine adapter (pilih via --engine):
  edge   (default) edge-tts neural lokal-jaringan: id-ID-GadisNeural (w) +
         id-ID-ArdiNeural (m), variasi rate per chara (rev16: TANPA pitch
         shift - pitch hack bikin robotik; intonasi hidup lewat tanda baca).
  voicestudio  proyek OSS debpalash/VoiceStudio (voicestudio.sh) - CLI
         resminya: `voicestudio voices list`, `speak`, `dub generate
         --output FILE`, `settings get/set`, flag --json, endpoint eksternal
         via VOICESTUDIO_URL. Aplikasi desktop Electron-nya tidak bisa jalan
         di sandbox headless ini, jadi adapter ini menunggu VOICESTUDIO_URL /
         instalasi lokal pemilik: mengikuti kontrak CLI terdokumentasi
         (`voicestudio speak <text> --voice <name> --output <file>`) lalu
         fallback POST Local API bila --json mengembalikan endpoint.
  zai    `z-ai tts -i <text> -o <file> --voice <v> --speed <s>` (cadangan).

Teks lisan dinormalisasi (1/2 -> satu per dua, 0,5 -> nol koma lima),
sopan (aturan #39), tanpa tanda aksi *...* (aksi tetap visual), jeda
dramatis dari elipsis (rev16).
Output: /tmp/voice18/mNN.mp3 + /tmp/voice18/durations.json (24 klip)
"""
import argparse
import json
import shutil
import subprocess
import sys
import time
from pathlib import Path

OUT = Path("/tmp/voice18")

# (who, teks lisan) - rev21: skema MALAM INVENTARIS (gudang), sapaan
# unik per chara, waktu 23.30 lintas tengah malam konsisten kartu babak.
# Angka dilisankan; tetap sopan (aturan #39).
LINES = [
    ("PUSAT", "Malam inventaris... resmi dibuka! Semua hitungan wajib "
              "sah. Rak dihitung ulang! Suhu freezer wajib dibaca benar!"),
    ("GILANG", "Sore tadi gue tinggal dua belas kard, beres. Stok pasti "
               "pas... gak usah dihitung ulang. Capek doang."),
    ("KAMU", "Om Gilang... jumlah itu gak boleh ditebak. Lembar stok "
             "tulis sembilan puluh enam. Rak harus nyampe sembilan puluh "
             "enam. Dihitung... baru sah."),
    ("RUPI", "Betul, kak. Gue hitung rak satu sampai rak empat... satu "
             "per satu. Centangnya nunggu angka... bukan nunggu capek."),
    ("GILANG", "Rak satu: dua puluh empat. Rak dua: dua puluh empat. "
               "Rak tiga: dua puluh empat. Rak empat: dua puluh empat. "
               "Total... sembilan puluh enam pas?! Gue kira seratus! Kok "
               "bisa beda?"),
    ("KAMU", "Dua belas kard masuk sore... empat keluar ke toko. Lembar "
             "stok ikut diubah jadi sembilan puluh enam. Yang sah itu... "
             "yang dihitung, bukan yang diingat."),
    ("GILANG", "Aduh, oke, oke. Berarti catatan masuk-keluar itu bukan "
               "formalitas. Stok bisa beda... dari ingetan kita."),
    ("RUPI", "Iya. Jumlah itu nangkep isi gudang, bukan perasaan. "
             "Gak berubah di label apa pun... di jam berapa pun."),
    ("OMAK", "Kalau gitu omak titip: tiga puluh kotak kue... buat enam "
             "pedagang es pagi nanti. Bagiannya harus rata... anak-anak."),
    ("KAMU", "Tiga puluh bagi enam... tiap pedagang lima kotak. Pas. Gak "
             "ada sisa... gak ada yang kurang."),
    ("RUPI", "Kalau pesennya jadi tujuh orang? Tiga puluh bagi tujuh "
             "itu... empat koma dua koma lima. Kotak kue... gak bisa "
             "dipotong begitu."),
    ("GILANG", "Haduh. Ya sudah: tujuh orang kali empat kotak... dua "
               "puluh delapan. Sisa dua. Sisa punya pemilik... gak boleh "
               "hilang diam-diam."),
    ("OMAK", "Nah, gini baru paham. Omak jadi mikir... angka rata, angka "
             "sisa... angka-angka ini asalnya dari mana, ya?"),
    ("DEDI", "Laporan malam: freezer daging... minus lima derajat. Gue "
             "tulis minus lima... bukan lima doang. Itu beda jauh."),
    ("KAMU", "Betul, om Dedi. Minus itu alamat... di bawah nol. Kalau "
             "dicatat lima doang... besoknya daging jadi masalah."),
    ("RUPI", "Di garis bilangan, nol itu tengah. Naik ke satu, dua, "
             "tiga... turun ke minus satu, minus dua... sampai minus "
             "lima. Kursi minus lima ada... lima langkah di bawah nol."),
    ("GILANG", "Gitu ya. Berarti minus bukan hiasan... itu alamat. Salah "
               "alamat... daging basi."),
    ("RUPI", "Buat yang baru ikut jaga: jurus hitung jujur. Hitung "
             "ulang... catat masuk-keluar... dan baca minus pelan-pelan."),
    ("PUSAT", "Pertanyaan tengah malam. Gudang tutup, lampu mati... "
              "gak ada yang nonton. Dua tambah dua tetap empat, gak? "
              "Bilangan itu dibuat manusia... atau sudah ada duluan?"),
    ("GILANG", "Gue jawab: bikin! Tulisan dua puluh empat di klip itu... "
               "buatan kita. Gak ada manusia... gak ada tulisan."),
    ("DEDI", "Tulisan memang buatan. Tapi isinya? Freezer gue tetap "
             "minus lima... walau gak ada yang baca. Dinginnya... gak "
             "nunggu dipencet."),
    ("RUPI", "Jawabannya dua lapis, om. Manusia menciptakan simbol... dan "
             "cara nulisnya: dua puluh empat, minus lima, koma. Tapi isi "
             "yang ditulis itu... sudah ada duluan. Tiga puluh kard... "
             "tidak jadi dua puluh sembilan cuma karena labelnya ganti."),
    ("PUSAT", "Voting malam: lima dua persen bilang ditemukan... empat "
              "delapan persen bilang dibuat."),
    ("PUSAT", "Voting ditutup: hampir imbang... tugas gudang bukan "
              "memutuskan, tapi jujur pada hitungan. Besok malam: rak "
              "cacah dibuka. Selamat malam, anak-anak."),
]

# profil suara per chara per engine - rev16: TANPA pitch shift (pitch hack
# bikin robotik = keluhan pemilik); cukup rate lembut + volume. MYST pelan
# dan suaranya sedikit dipelanakan untuk rasa misterius.
EDGE_VOICE = {
    "OMAK": dict(voice="id-ID-GadisNeural", rate="+10%"),
    "GILANG": dict(voice="id-ID-ArdiNeural", rate="+6%"),
    "RUPI": dict(voice="id-ID-GadisNeural", rate="-6%"),
    "KAMU": dict(voice="id-ID-ArdiNeural", rate="+12%"),
    "DEDI": dict(voice="id-ID-ArdiNeural", rate="-14%"),
    "PUSAT": dict(voice="id-ID-ArdiNeural", rate="-16%", volume="-8%"),
}
ZAI_VOICE = {"OMAK": "tongtong", "GILANG": "jam", "RUPI": "xiaochen",
             "KAMU": "kazi", "DEDI": "luodo", "PUSAT": "kago"}
ZAI_SPEED = {"OMAK": 1.15, "GILANG": 1.05, "RUPI": 0.92, "KAMU": 1.0,
             "DEDI": 0.88, "PUSAT": 0.8}


def dur_of(fp):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries",
                        "format=duration", "-of", "csv=p=0", str(fp)],
                       capture_output=True, text=True)
    return float(r.stdout.strip())


def gen_edge(who, text, fp):
    import asyncio
    import edge_tts
    p = EDGE_VOICE[who]

    async def run():
        kw = dict(p)
        pitch = kw.pop("pitch", None) or "+0Hz"
        vol = kw.pop("volume", None) or "+0%"
        c = edge_tts.Communicate(text, kw["voice"], rate=kw["rate"],
                                 pitch=pitch, volume=vol)
        await c.save(str(fp))
    asyncio.run(run())


def gen_zai(who, text, fp):
    subprocess.run(["z-ai", "tts", "-i", text, "-o", str(fp),
                    "--voice", ZAI_VOICE[who], "--speed", str(ZAI_SPEED[who])],
                   check=True, capture_output=True)


def gen_voicestudio(who, text, fp):
    """Ikuti kontrak CLI VoiceStudio terdokumentasi. Butuh instalasi lokal
    pemilik (CLI `voicestudio` di PATH) atau VOICESTUDIO_URL ke Local API."""
    import os
    import urllib.request
    url = os.environ.get("VOICESTUDIO_URL", "")
    if url:
        req = urllib.request.Request(
            url.rstrip("/") + "/tts",
            data=json.dumps({"text": text, "voice": who.lower(),
                             "output": str(fp)}).encode(),
            headers={"Content-Type": "application/json"})
        urllib.request.urlopen(req, timeout=120)
        return
    cli = shutil.which("voicestudio")
    if not cli:
        raise RuntimeError("VoiceStudio tidak tersedia di sandbox headless "
                           "(aplikasi desktop Electron + unduh model GUI); "
                           "pakai --engine edge, atau pasang VOICESTUDIO_URL")
    subprocess.run([cli, "speak", text, "--voice", who.lower(),
                    "--output", str(fp)], check=True, capture_output=True)


ENGINES = {"edge": gen_edge, "zai": gen_zai, "voicestudio": gen_voicestudio}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--engine", default="edge", choices=list(ENGINES))
    ap.add_argument("--only", type=int, nargs="+", default=[],
                    help="regenerasi klip tertentu (indeks 0-23)")
    a = ap.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    durs = {}
    rng = range(len(LINES)) if not a.only else a.only
    for i in rng:
        who, text = LINES[i]
        fp = OUT / f"m{i:02d}.mp3"
        for attempt in range(3):
            try:
                ENGINES[a.engine](who, text, fp)
                d = dur_of(fp)
                if d < 0.8:
                    raise RuntimeError(f"klip terlalu pendek ({d:.2f}s)")
                durs[f"m{i:02d}"] = round(d, 3)
                print(f"m{i:02d} {who:4s} {d:5.2f}s ok")
                break
            except Exception as e:
                print(f"m{i:02d} attempt {attempt + 1} gagal: {e}",
                      file=sys.stderr)
                if attempt == 2:
                    raise
                time.sleep(2)
    # merge/refresh durations.json (jaga klip yang tidak diregenerasi)
    dj = OUT / "durations.json"
    if a.only and dj.exists():
        old = json.loads(dj.read_text())
        old.update(durs)
        durs = old
    dj.write_text(json.dumps(durs, indent=1))
    total = sum(durs.values())
    print(f"total voice: {total:.1f}s ({len(durs)} klip) -> {dj}")


if __name__ == "__main__":
    main()
