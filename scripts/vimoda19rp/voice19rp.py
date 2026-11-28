#!/usr/bin/env python3
"""VOICE ACTING rev22 VIDEO 19 - generator suara 6 chara (24 klip).
Formula Dialog AKIOMIDA v1 (F1-F8) diterapkan pada LINES.

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
Output: /tmp/voice19/mNN.mp3 + /tmp/voice19/durations.json (24 klip)
"""
import argparse
import json
import shutil
import subprocess
import sys
import time
from pathlib import Path

OUT = Path("/tmp/voice19")

# (who, teks lisan) - rev22: skema TERMINAL JAM 3 (bahan bilangan
# cacah), sapaan unik per chara (F1), arc tsun-dere BAYU (F4),
# cermin fakta lawan (F5), empati MELI (F8). Angka dilisankan;
# tetap sopan (aturan #39).
LINES = [
    ("PUSAT", "Perhatian, warga terminal! Dinas dini hari... resmi "
              "dibuka! Unit yang berangkat wajib cocok karcis. Cek "
              "garasi... cek lembar karcis!"),
    ("BAYU", "Antre ya. Unit 09 juaranya terminal ini. Yang lain cuma "
             "pelengkap. Aku berangkat duluan... karcis mah kejar "
             "setoran."),
    ("MELI", "Sabar dikit, bang Bayu. Karcis yang kejar kita malam ini: "
             "cetakan nomor satu sampai tiga puluh. Artinya... tiga "
             "puluh penumpang yang nunggu."),
    ("KAMU", "Tiga puluh karcis, tiga puluh kursi. Semuanya utuh. Di "
             "terminal gak ada penumpang setengah orang."),
    ("HAZ", "Unit juga utuh, nak. Garasi nol sampai sembilan... gue "
            "jagain tiga puluh tahun. Jumlah unit yang jalan harus pas "
            "sama karcis."),
    ("KAMU", "Garasi nol sampai sembilan... berarti sepuluh garasi ya, "
             "om Haz? Nol ikut dihitung."),
    ("BAYU", "Hmph, masa nol dihitung?! Nol itu garasi kosong. Dari "
             "sononya gue mulai garasi satu ampe sembilan. Ya sembilan "
             "unit. Nol mah... cuma angin."),
    ("MELI", "Eh, tapi karcis kita justru mulai dari satu, dan kursi "
             "pertama nomor satu. Beda urusan... beda aturan mulainya, "
             "bang."),
    ("PUSAT", "Monitor dinas terkirim. Tiga puluh karcis... sepuluh "
              "garasi... tiga unit berangkat."),
    ("KAMU", "Liat monitor, om Bayu: tiga puluh karcis buat tiga unit... "
             "tiap unit sepuluh penumpang. Garasi nol sampai sembilan "
             "itu sepuluh nomor. Dua-duanya benar... cuma mulainya beda."),
    ("HAZ", "Buku garasi lama gue mulai dari satu... cuma sembilan "
            "baris. Terminal sebelah bikin nol sampai sembilan... jadi "
            "sepuluh baris. Dua-duanya sah. Yang penting... satu lembar "
            "satu aturan."),
    ("MELI", "Nah itu nama ilmiahnya: bilangan cacah. Angka utuh: nol, "
             "satu, dua, tiga, dan terus. Gak ada setengah unit... gak "
             "ada dua koma lima angkot."),
    ("OMDARI", "Saksi sejarah di sini. Dulu terminal kita gak punya "
               "garasi nol. Bukan nolnya takut... jamannya angka nol "
               "belum dianggap angka."),
    ("PUSAT", "Laporan garasi terkirim. Nomor tujuh kosong... isi nol "
              "unit."),
    ("KAMU", "Justru itu, om. Garasi tujuh gak hilang cuma karena "
             "isinya nol unit. Nol itu angka sah... bukan tanda lupa "
             "nulis."),
    ("MELI", "Di lembar karcis juga gitu: kursi nomor nol gak ada. "
             "Penumpang nol artinya... belum ada yang jalan. Nol "
             "nyimbolkan kosong... bukan musnahkan nomor."),
    ("HAZ", "Aduh. Tiga puluh tahun gue manggil garasi satu paling "
            "depan... rupanya itu garasi nol. Nomor itu aturan... "
            "posisi depan itu kenyataan."),
    ("MELI", "Buat yang baru gabung jaga: jurus hitung utuh. Unit "
             "utuh... karcis urut satu sampai tiga puluh... garasi nol "
             "sampai sembilan."),
    ("BAYU", "Hmph. Oke, oke. Unit 09 tetep juara... tapi garasi nol "
             "juga keluarga. Aku berangkat duluan... kasih contoh yang "
             "bener."),
    ("PUSAT", "Pertanyaan dini hari. Garasi mulai dari nol atau satu? "
              "Karcis mulai dari satu. Mana yang bener? Bilangan cacah "
              "itu... mulai dari nol atau dari satu?"),
    ("HAZ", "Dua-duanya bener... tergantung buku yang dipakai. Yang "
            "gak boleh: campur dua aturan di satu lembar. Aturan boleh "
            "beda... hitungannya harus jujur."),
    ("MELI", "Gimana pun pilihannya, tiga puluh karcis tetep tiga puluh "
             "penumpang... dan tiga unit tetep tiga unit. Hasil hitung "
             "gak ikut-ikutan selera. Eh, gue catat juga... jam tiga "
             "dua puluh enam, bang Bayu akhirnya nggak ribut."),
    ("PUSAT", "Voting dini hari: enam satu persen bilang mulai dari "
              "nol... tiga sembilan persen bilang dari satu."),
    ("PUSAT", "Voting ditutup: satu kubu lebih ramai... tapi kubu kecil "
              "juga keluarga terminal. Besok malam: bilangan asli naik "
              "kelas. Salam satu terminal... anak-anak."),
]

# profil suara per chara per engine - rev16: TANPA pitch shift (pitch hack
# bikin robotik = keluhan pemilik); cukup rate lembut + volume. MYST pelan
# dan suaranya sedikit dipelanakan untuk rasa misterius.
EDGE_VOICE = {
    "MELI": dict(voice="id-ID-GadisNeural", rate="+12%"),
    "BAYU": dict(voice="id-ID-ArdiNeural", rate="+2%"),
    "HAZ": dict(voice="id-ID-ArdiNeural", rate="-10%"),
    "KAMU": dict(voice="id-ID-ArdiNeural", rate="+12%"),
    "OMDARI": dict(voice="id-ID-ArdiNeural", rate="-14%"),
    "PUSAT": dict(voice="id-ID-ArdiNeural", rate="-16%", volume="-8%"),
}
ZAI_VOICE = {"MELI": "tongtong", "BAYU": "jam", "HAZ": "kazi",
             "KAMU": "kago", "OMDARI": "luodo", "PUSAT": "senja"}
ZAI_SPEED = {"MELI": 1.15, "BAYU": 1.05, "HAZ": 0.9, "KAMU": 1.0,
             "OMDARI": 0.88, "PUSAT": 0.8}


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
