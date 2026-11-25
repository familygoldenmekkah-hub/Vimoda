#!/usr/bin/env python3
"""VOICE ACTING rev16 VIDEO 17 - generator suara 5 chara (20 klip).

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
Output: /tmp/voice17/mNN.mp3 + /tmp/voice17/durations.json
"""
import argparse
import json
import shutil
import subprocess
import sys
import time
from pathlib import Path

OUT = Path("/tmp/voice17")

# (who, teks lisan) - rev16: tanda baca ekspresif (elipsis = jeda dramatis,
# seru = penekanan) supaya intonasi neural hidup; tetap sopan (aturan #39).
# rev19: skema TANTANGAN DAPUR HARI 3, sapaan unik per chara (tanpa
# "bestie"), waktu sore->maghrib->malam konsisten dengan kartu babak.
LINES = [
    ("NADIA", "Perhatian, semuanya! Tantangan hari ketiga... resmi "
              "dibuka! Semua takaran wajib desimal. Hakimnya... timbangan "
              "digital!"),
    ("GEDE", "Weh, bu... ini serius, toh? Gue mah jago pecahan dari SD. "
             "Koma-komaan mah... buat yang gak ngerti pecahan doang."),
    ("KAMU", "Bang... timbangan digital cuma ngerti koma. Ya pecahannya "
             "yang harus jadi desimal."),
    ("NADIA", "Santai, Pak Gede... santai, semuanya. Yang kalah "
              "dapurnya dicap gagal takar. Ibu udah siapin timbangan buat "
              "semua."),
    ("GEDE", "Oke, gue mulai duluan. Tiga per empat kilo terigu, kan? "
             "Gue takar pake gelas takar aja... Gampang."),
    ("KAMU", "Bang... gelas takar ngukur volume... timbangan ngukur "
             "berat. Tiga per empat gelas sama nol koma tujuh lima "
             "kilo... itu dua cerita beda."),
    ("VITA", "Bener, kak. Makanya resep resmi ditulis desimal. Tiga per "
             "empat kilo itu... pas nol koma tujuh lima di timbangan. "
             "Angkanya dibaca... bukan ditebak."),
    ("GEDE", "Ini barunya! Timbangan bilang nol koma empat nol... padahal "
             "gue yakin udah tiga per empat! Adonannya... kenceng banget."),
    ("VITA", "Nol koma empat nol itu... belum nyampe setengah, akang. "
             "Lihat garis ukurnya... nol koma tujuh lima itu posisi tiga "
             "per empat jalan. Kurangnya... nol koma tiga lima kilo."),
    ("GEDE", "Haduh, neng... singketin, dong. Jadi gue kurang berapa "
             "persisnya?"),
    ("KAMU", "Kurang nol koma tiga lima kilo, bang. Tinggal tambah "
             "terigu ampe angkanya naik dari nol koma empat nol... ke nol "
             "koma tujuh lima. Angka koma itu dibaca... bukan ditebak."),
    ("GEDE", "Wee... bener! Adonannya lunyer. Oke, gue akui. Garis ukur "
             "neng itu... menang telak dari gelas takar gue."),
    ("VITA", "Buat yang ikut dari rumah: garis ukur dari nol ke satu. "
             "Nol koma lima... tengah jalan. Nol koma tujuh lima... tiga "
             "per empat jalan."),
    ("NADIA", "Nah, sekarang bagian yang serem. Karamel omak minta "
              "sepertiga sendok teh garam. Timbangan cuma nampilin nol "
              "koma tiga tiga tiga. Siapa berani?"),
    ("KAMU", "Aku coba, kak. Sepertiga di garis ukur jalan terus... "
             "tapi gak pernah berhenti pas di satu titik. Nol koma tiga... "
             "nol koma tiga tiga... nol koma tiga tiga tiga... makin "
             "panjang makin deket, tapi gak pernah nyampe."),
    ("VITA", "Betul, itu desimal berulang. Angka tiga-nya diulang tanpa "
             "ujung... titik-titiknya tandanya polanya lanjut terus."),
    ("GEDE", "Malam ini tuntas! Tapi ada yang ngganjel: kalkulator "
             "gue... sepertiga kali tiga... jawabannya nol koma sembilan, "
             "enam kali! Bukan satu?! Apa garam gue kelebihan?"),
    ("VITA", "Gak kelebihan, akang. Layarnya gak muat semua angka. "
             "Nol koma sembilan sembilan terus itu... di garis ukur nempel "
             "persis di angka satu. Beda tulisan... nilainya sama."),
    ("MYST", "Leaderboard hari ketiga... resmi ditutup. Empat dapur "
             "lulus, satu gagal takar. Angka kalian... mulai jujur."),
    ("MYST", "Catatan buat besok... pecahan melawan desimal, satu "
             "timbangan. Yang menang tetep yang bisa baca koma."),
]

# profil suara per chara per engine - rev16: TANPA pitch shift (pitch hack
# bikin robotik = keluhan pemilik); cukup rate lembut + volume. MYST pelan
# dan suaranya sedikit dipelanakan untuk rasa misterius.
EDGE_VOICE = {
    "NADIA": dict(voice="id-ID-GadisNeural", rate="+10%"),
    "GEDE": dict(voice="id-ID-ArdiNeural", rate="+6%"),
    "VITA": dict(voice="id-ID-GadisNeural", rate="-6%"),
    "KAMU": dict(voice="id-ID-ArdiNeural", rate="+12%"),
    "MYST": dict(voice="id-ID-ArdiNeural", rate="-22%", volume="-8%"),
}
ZAI_VOICE = {"NADIA": "tongtong", "GEDE": "jam", "VITA": "xiaochen",
             "KAMU": "kazi", "MYST": "luodo"}
ZAI_SPEED = {"NADIA": 1.15, "GEDE": 1.05, "VITA": 0.92, "KAMU": 1.0,
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
    ap.add_argument("--only", type=int, nargs="+", default=[],
                    help="regenerasi klip tertentu (indeks 0-19)")
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
