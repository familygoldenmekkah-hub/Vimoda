#!/usr/bin/env python3
"""VOICE ACTING rev15 VIDEO 16 - generator suara 5 chara (20 klip).

Engine adapter (pilih via --engine):
  edge   (default) edge-tts neural lokal-jaringan: id-ID-GadisNeural (w) +
         id-ID-ArdiNeural (m), variasi rate/pitch per chara.
  voicestudio  proyek OSS debpalash/VoiceStudio (voicestudio.sh) - CLI
         resminya: `voicestudio voices list`, `speak`, `dub generate
         --output FILE`, `settings get/set`, flag --json, endpoint eksternal
         via VOICESTUDIO_URL. Aplikasi desktop Electron-nya tidak bisa jalan
         di sandbox headless ini, jadi adapter ini menunggu VOICESTUDIO_URL /
         instalasi lokal pemilik: mengikuti kontrak CLI terdokumentasi
         (`voicestudio speak <text> --voice <name> --output <file>`) lalu
         fallback POST Local API bila --json mengembalikan endpoint.
  zai    `z-ai tts -i <text> -o <file> --voice <v> --speed <s>` (cadangan).

Teks lisan dinormalisasi (2^42 -> dua pangkat empat puluh dua), sopan
(aturan #39), tanpa tanda aksi *...* (aksi tetap visual).
Output: /tmp/voice16/mNN.mp3 + /tmp/voice16/durations.json
"""
import argparse
import json
import shutil
import subprocess
import sys
import time
from pathlib import Path

OUT = Path("/tmp/voice16")

# (who, teks lisan) - rev16: tanda baca ekspresif (elipsis = jeda dramatis,
# seru = penekanan) supaya intonasi neural hidup; tetap sopan (aturan #39)
LINES = [
    ("RAYA", "FYP lagi rame, guys! Kertas... dilipat dobel empat puluh dua "
             "kali... sampai ke bulan? Serius?"),
    ("BIMO", "Gak mungkin, deh. Dobel empat puluh dua kali ya... tetep "
             "kertas tipis. Klaim FYP bebas banget!"),
    ("KAMU", "Tapi klaimnya spesifik, bestie. Dua pangkat empat puluh dua. "
             "Itu dobel empat puluh dua kali, bestie. Dia gak mungkin "
             "berani nulis gitu... kalau ngawur."),
    ("RAYA", "Di caption, dia nulis dua pangkat empat puluh dua. Bener apa "
             "nggak? Kita cek bareng, ya!"),
    ("DILA", "Tunggu, tunggu. Dua pangkat tiga itu... bukan dua kali tiga, "
             "ya. Biar gak ada yang salah paham... aku gambar dulu."),
    ("BIMO", "Ohhh... jadi dua pangkat tiga sama dengan dua kali dua kali "
             "dua. Delapan! Gue dari dulu kira dua kali tiga itu enam. "
             "Aduh... malu banget."),
    ("KAMU", "Banyak yang keliru, kok. Pangkat itu... jumlah kali "
             "lipatnya. Bukan angka yang dikali."),
    ("DILA", "Aku kumpul hitungannya, ya. Dari dua pangkat dua... sampai "
             "dua pangkat sepuluh, dulu."),
    ("DILA", "Dua pangkat sepuluh... seribu dua puluh empat lipatan. Tebel "
             "kertasnya udah sepuluh senti! Dan itu... baru sepuluh "
             "lipatan."),
    ("BIMO", "Hadeeeh. Baru sepuluh senti. Bulan itu tiga ratus delapan "
             "puluh empat ribu kilometer, bestie. Jauuh banget."),
    ("KAMU", "Tapi tiap lipatan dobel, bestie. Dua pangkat dua puluh, itu "
             "satu juta kali lipat. Tebelnya... seratus lima meter?"),
    ("RAYA", "Gas hitung sampai lipatan ke empat puluh dua! Malam ini, "
             "debatnya kita selesaikan!"),
    ("DILA", "Tangga dobelnya... Sepuluh senti. Seratus lima meter. "
             "Seratus tujuh kilometer. Sampai empat ratus tiga puluh "
             "sembilan ribu kilometer."),
    ("BIMO", "Empat ratus tiga puluh sembilan ribu kilometer?! Bulan cuma "
             "tiga ratus delapan puluh empat ribu... Gue kalah, oke. Gak "
             "semua klaim FYP itu hoax."),
    ("KAMU", "Klaim mustahil... kadang bener, kadang hoax. Bedanya... di "
             "hitungan."),
    ("RAYA", "Guys! Akunnya ngepost lagi! Katanya, bukti lengkapnya dia "
             "taruh malam ini."),
    ("RAYA", "Post barunya! Empat ratus tiga puluh sembilan ribu delapan "
             "ratus empat kilometer. Bulan cuma tiga ratus delapan puluh "
             "empat ribu. TEBUS!"),
    ("MYST", "Halo. Video itu... punyaku. Aku cuma baca di grup ini. "
             "Kalian suka debat... jadi, kubuat yang mustahil... tapi "
             "bener."),
    ("BIMO", "Mantap, makasih, bestie. Mulai sekarang... hitung dulu, baru "
             "komen. Deal, semua?"),
    ("RAYA", "Oh, iya! Ada yang nanya dua pangkat minus satu di komentar. "
             "Minus?! Besok... kita bedah."),
]

# profil suara per chara per engine - rev16: TANPA pitch shift (pitch hack
# bikin robotik = keluhan pemilik); cukup rate lembut + volume. MYST pelan
# dan suaranya sedikit dipelanakan untuk rasa misterius.
EDGE_VOICE = {
    "RAYA": dict(voice="id-ID-GadisNeural", rate="+10%"),
    "BIMO": dict(voice="id-ID-ArdiNeural", rate="+6%"),
    "DILA": dict(voice="id-ID-GadisNeural", rate="-6%"),
    "KAMU": dict(voice="id-ID-ArdiNeural", rate="+12%"),
    "MYST": dict(voice="id-ID-ArdiNeural", rate="-22%", volume="-8%"),
}
ZAI_VOICE = {"RAYA": "tongtong", "BIMO": "jam", "DILA": "xiaochen",
             "KAMU": "kazi", "MYST": "luodo"}
ZAI_SPEED = {"RAYA": 1.15, "BIMO": 1.05, "DILA": 0.92, "KAMU": 1.0,
             "MYST": 0.8}


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
    ap.add_argument("--only", type=int, default=-1,
                    help="regenerasi satu klip (indeks 0-19)")
    a = ap.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    durs = {}
    rng = range(len(LINES)) if a.only < 0 else [a.only]
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
    if a.only >= 0 and dj.exists():
        old = json.loads(dj.read_text())
        old.update(durs)
        durs = old
    dj.write_text(json.dumps(durs, indent=1))
    total = sum(durs.values())
    print(f"total voice: {total:.1f}s ({len(durs)} klip) -> {dj}")


if __name__ == "__main__":
    main()
