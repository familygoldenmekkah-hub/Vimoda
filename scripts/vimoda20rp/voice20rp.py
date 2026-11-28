#!/usr/bin/env python3
"""VOICE ACTING rev23 VIDEO 20 - generator suara 6 chara (24 klip).
Formula Dialog AKIOMIDA v1 (F1-F8) diterapkan pada LINES. Produksi
9:16 SAJA (L1 revisi 2026-11-28).

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
Output: /tmp/voice20/mNN.mp3 + /tmp/voice20/durations.json (24 klip)
"""
import argparse
import json
import shutil
import subprocess
import sys
import time
from pathlib import Path

OUT = Path("/tmp/voice20")

# (who, teks lisan) - rev23: skema LARI PAGI (bahan bilangan asli),
# sapaan unik per chara (F1), arc tsun-dere BAGAS (F4), cermin fakta
# lawan (F5), empati RIKA (F8). Angka dilisankan; tetap sopan (#39).
LINES = [
    ("PUSAT", "Perhatian, panitia! Lari pagi minggu... resmi "
              "disiapkan! Empat puluh kartu peserta, nomor satu sampai "
              "empat puluh. Cek papan... cek garis finis!"),
    ("BAGAS", "Pasang nomor dada. Nomor 13 ya, kak. Kata orang sial "
              "banget. Tapi gak usah drama... aku tetep juara satu. "
              "Yang lain mah rebutan posisi dua sama tiga aja."),
    ("RIKA", "Kasihan nomor 13, bang Bagus, baru nempel langsung dicap "
             "sial. Di lembar finis, 13 itu cuma urutan ke-13. Ada 12 "
             "di depannya... 14 di belakangnya. Aman."),
    ("KAMU", "Bener, kak Rika. Nomor peserta itu bilangan asli: satu, "
             "dua, tiga, terus naik sampai empat puluh. Gak ada yang "
             "loncat... gak ada yang sial."),
    ("LARA", "Asli ya, bukan cacah. Bilangan asli mulai dari satu: "
             "angka untuk menghitung. Nol gak termasuk... karena nol "
             "artinya belum ada yang dihitung."),
    ("KAMU", "Berarti kartu peserta kita satu sampai empat puluh ya, "
             "bu Lara? Empat puluh kartu... buat empat puluh pelari."),
    ("BAGAS", "Hmph, buang aja nomor 13-nya, kak! Ganti jadi 41. Jadi "
              "jumlahnya tetep empat puluh kartu... tapi gak ada yang "
              "sial. Untung-untungan."),
    ("DIN", "Eh, gak boleh gitu, bang. Kalau 13 dibuang, kartu tinggal "
            "39 label: satu sampai 12, lalu 14 sampai 41. Pelari tetep "
            "empat puluh... tapi urutannya bolong di tengah."),
    ("PUSAT", "Papan kartu peserta terkirim. Satu sampai empat puluh... "
              "satu nomor, satu pelari."),
    ("KAMU", "Liat papan, bang Bagus: tiap pelari satu nomor, nggak "
             "bolong. 13 tetep 13. Kalau digeser-geser... catatan finis "
             "malah gak nyambung."),
    ("RIKA", "Di lembar finis juga: yang dicatat itu urutan datangnya. "
             "Pelari pertama datang = juara satu. Kedua = juara dua. "
             "Ketiga = juara tiga. Itu bilangan asli juga... tapi "
             "perannya mengurutkan."),
    ("LARA", "Nah, dua peran bilangan asli: menghitung banyaknya, empat "
             "puluh pelari. Dan mengurutkan: juara ke-satu, ke-dua, "
             "ke-tiga. Angkanya sama... perannya beda."),
    ("DIN", "Pasang bendera di garis start. Dari sononya start selalu "
            "nomor satu dulu: pelari nomor satu di lajur satu, nomor "
            "dua di lajur dua. Kaya hitung kelas: satu, dua, tiga... "
            "jalan!"),
    ("PUSAT", "Papan podium terkirim. Juara satu, dua, tiga... juara "
              "ke-nol tidak ada."),
    ("KAMU", "Ini bedanya sama tugas kemarin, ya: penumpang nol boleh "
             "ada, tapi juara nol gak ada. Nol sah di cacah... bilangan "
             "asli memang mulai dari satu."),
    ("RIKA", "Finis nol orang juga boleh: artinya belum ada yang "
             "sampai. Tapi begitu ada yang datang... dia langsung "
             "juara satu, bukan juara nol."),
    ("LARA", "Empat puluh kartu, empat puluh pelari, satu nomor satu "
             "orang. Kalau daftar nambah jadi 41 orang... kartu ke-41 "
             "pun siap dicetak. Bilangan asli gak pernah habis: selalu "
             "ada berikutnya."),
    ("RIKA", "Buat panitia baru: jurus hitung asli. Menghitung satu "
             "sampai empat puluh... mengurutkan juara satu, dua, "
             "tiga... dan gak boleh bolong."),
    ("BAGAS", "Pegang kartu 13 di dada. Hmph. Oke, oke. Nomor 13 tetep "
              "gue pakai. Tapi tetep... juara satu punya gue. Nomor "
              "sial mah cuma omongan orang aja."),
    ("PUSAT", "Pertanyaan panitia. Kalau pelari baru daftar, dia dapat "
              "kartu nomor 41. Bilangan asli itu habis di mana? Dan "
              "kenapa juara mulai dari satu... bukan dari nol?"),
    ("DIN", "Gak habis, kak. 41, 42, 43, terus naik. Setiap bilangan "
            "asli punya pengikut: setelah satu ada dua... setelah empat "
            "puluh ada 41. Urutannya gak pernah putus."),
    ("RIKA", "Dan juara mulai dari satu karena mengurutkan itu butuh "
             "yang datang duluan. Yang pertama datang itu juara satu. "
             "Juara ke-nol gak punya makna: gak ada urutan sebelum "
             "pertama. Eh, gue catat juga... jam 5.40 bang Bagus "
             "akhirnya pakai nomor 13."),
    ("PUSAT", "Voting panitia: enam empat persen bilang asli itu "
              "menghitung... tiga enam persen bilang mengurutkan."),
    ("PUSAT", "Voting ditutup: dua peran, satu keluarga angka. Besok "
              "malam: jumlah satu sampai seratus... ada jalan pintasnya. "
              "Salam satu lintasan... anak-anak."),
]

# profil suara per chara per engine - rev16: TANPA pitch shift (pitch hack
# bikin robotik = keluhan pemilik); cukup rate lembut + volume. MYST pelan
# dan suaranya sedikit dipelanakan untuk rasa misterius.
EDGE_VOICE = {
    "LARA": dict(voice="id-ID-GadisNeural", rate="-8%"),
    "RIKA": dict(voice="id-ID-GadisNeural", rate="+12%"),
    "DIN": dict(voice="id-ID-ArdiNeural", rate="+4%"),
    "BAGAS": dict(voice="id-ID-ArdiNeural", rate="+6%"),
    "KAMU": dict(voice="id-ID-ArdiNeural", rate="+12%"),
    "PUSAT": dict(voice="id-ID-ArdiNeural", rate="-16%", volume="-8%"),
}
ZAI_VOICE = {"LARA": "tongtong", "RIKA": "xiaochen", "DIN": "jam",
             "BAGAS": "kazi", "KAMU": "kago", "PUSAT": "senja"}
ZAI_SPEED = {"LARA": 0.92, "RIKA": 1.15, "DIN": 1.1, "BAGAS": 1.05,
             "KAMU": 1.0, "PUSAT": 0.8}


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
