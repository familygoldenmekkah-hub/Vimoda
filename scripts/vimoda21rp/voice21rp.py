#!/usr/bin/env python3
"""VOICE ACTING rev24 VIDEO 21 - generator suara 6 chara (24 klip).
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
Output: /tmp/voice21/mNN.mp3 + /tmp/voice21/durations.json (24 klip)
"""
import argparse
import json
import shutil
import subprocess
import sys
import time
from pathlib import Path

OUT = Path("/tmp/voice21")

# (who, teks lisan) - rev24: skema RESEP GAGAL (bahan bilangan di
# dapur), sapaan unik per chara (F1), arc tsun-dere RARA (F4), cermin
# fakta lawan (F5), empati GITA (F8). Angka dilisankan; sopan (#39).
LINES = [
    ("PUSAT", "Perhatian, anak dapur! Papan resep minggu ini sudah "
              "terpasang. Brownies empat porsi: dua ratus gram cokelat, "
              "dua telur, dua ratus lima puluh mililiter susu... dan "
              "lima langkah wajib urut!"),
    ("RARA", "Duh, malu, kak. Brownies gue keras kayak batu! Padahal "
             "gue ikutin semua. Gak mungkin salah gue... pasti "
             "resepnya yang bohong."),
    ("GITA", "Santai, Rara, kita cek pelan-pelan ya. Resep itu murni "
             "matematika: tiap angka punya tugas. Salah satu angka "
             "aja... teksturnya berubah total."),
    ("KAMU", "Coba hitung ulang, kak Rara. Cokelatnya berapa gram "
             "yang kamu pakai tadi?"),
    ("DIMAS", "Ini kunci dapur: angka itu presisi. Dua ratus gram dan "
              "dua puluh gram beda sepuluh kali lipat. Satu nol aja "
              "kelewat... brownies bisa jadi kardus."),
    ("MANDA", "Makanya gue beli jadi, gak perlu mikir angka. Tapi oke "
              "deh, gue ikut nyimak... penasaran juga."),
    ("RARA", "Hmph, jelas ini ovennya yang ngambek! Suhunya gue pasang "
             "seratus delapan puluh kaya resep. Eh, tunggu... "
             "termometer oven gue mati sejak ludes bikin bakwan "
             "kemarin?"),
    ("GITA", "Oven boleh dicurigai, tapi takaran dicek duluan ya, Rar. "
             "Kalau angkanya salah... oven sebagus apa pun tetap gagal. "
             "Resepnya minta dua ratus gram, bukan dua puluh."),
    ("PUSAT", "Papan takaran terkirim. Dua ratus gram, dua telur, dua "
              "ratus lima puluh mililiter... yang kurang cuma satu "
              "nol."),
    ("KAMU", "Liat papan, kak Rara: resep minta dua ratus gram... kamu "
             "pakai dua puluh gram. Sepuluh kali lebih sedikit! "
             "Makanya adonannya gak nempel apa-apa."),
    ("DIMAS", "Dan urutan langkah juga angka: langkah satu lelehkan, "
              "dua campur, tiga kocok, empat tuang, lima panggang. "
              "Lompat satu langkah aja... hasilnya beda."),
    ("GITA", "Nah, di resep, angka kerja dua shift: mengukur takaran "
             "dan mengurutkan langkah. Dua-duanya wajib tepat... gak "
             "boleh ketuker."),
    ("MANDA", "Berarti kalau gue mau bikin delapan porsi dari resep "
              "empat porsi... tinggal dobel semua angkanya? Dua ratus "
              "jadi empat ratus, dua telur jadi empat?"),
    ("PUSAT", "Papan resep dobel terkirim. Empat porsi ke delapan "
              "porsi... semua angka dua kali lipat."),
    ("KAMU", "Betul, kak Manda! Dobel porsi artinya dobel semua "
             "takaran. Gak boleh dobel satu, dobel lain gak. Angka di "
             "resep itu satu tim."),
    ("RARA", "Oke, gue ngaku deh. Takaran gue salah baca. Dan bukan "
             "cuma itu: gue juga lompat langkah tiga. Makanya "
             "teksturnya hancur."),
    ("GITA", "Buat yang baru gabung: jurus resep tepat. Takaran "
             "ditimbang... langkah diurut... porsi dihitung."),
    ("DIMAS", "Minggu depan kita praktik bareng. Gue bawa timbangan... "
              "kak Rara bawa kesabaran. Semua angka gue cocokin dua "
              "kali."),
    ("RARA", "Hmph, oke oke. Gue ulang sekarang: dua ratus gram "
             "beneran... dan lima langkah gak ada yang dilompati. "
             "Kalau gagal lagi, gue pindah ke grup Manda."),
    ("PUSAT", "Pertanyaan dapur. Kalau resep empat porsi mau dijadikan "
              "dua belas porsi, dua ratus gram jadi berapa? Dan mana "
              "yang lebih sering bikin gagal: salah takaran atau "
              "salah urutan?"),
    ("DIMAS", "Dua belas porsi berarti tiga kali lipat: dua ratus jadi "
              "enam ratus gram. Gampangnya: porsi dilipat... takaran "
              "ikut dilipat."),
    ("GITA", "Dari tiga puluh tujuh kegagalan yang tercatat di grup "
             "ini, paling sering penyebabnya salah takaran. Yang salah "
             "urutan biasanya langsung ketahuan di langkah kedua. Eh, "
             "gue catat juga... jam tujuh empat puluh, Rara kirim foto "
             "brownies baru, teksturnya udah cakep."),
    ("PUSAT", "Voting dapur: lima delapan persen bilang salah "
              "takaran... empat dua persen bilang salah urutan."),
    ("PUSAT", "Voting ditutup: dua-duanya berbahaya, tapi salah "
              "takaran lebih sering jadi biang keroknya. Besok: "
              "pecahan di dapur, setengah sendok teh. Selamat "
              "mencoba... jangan lupa timbang!"),
]

# profil suara per chara per engine - rev16: TANPA pitch shift (pitch hack
# bikin robotik = keluhan pemilik); cukup rate lembut + volume. MYST pelan
# dan suaranya sedikit dipelanakan untuk rasa misterius.
EDGE_VOICE = {
    "GITA": dict(voice="id-ID-GadisNeural", rate="-10%"),
    "RARA": dict(voice="id-ID-GadisNeural", rate="+8%"),
    "MANDA": dict(voice="id-ID-GadisNeural", rate="+14%"),
    "DIMAS": dict(voice="id-ID-ArdiNeural", rate="+4%"),
    "KAMU": dict(voice="id-ID-ArdiNeural", rate="+12%"),
    "PUSAT": dict(voice="id-ID-ArdiNeural", rate="-16%", volume="-8%"),
}
ZAI_VOICE = {"GITA": "tongtong", "RARA": "kazi", "MANDA": "xiaochen",
             "DIMAS": "jam", "KAMU": "kago", "PUSAT": "senja"}
ZAI_SPEED = {"GITA": 0.9, "RARA": 1.1, "MANDA": 1.12, "DIMAS": 1.08,
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
