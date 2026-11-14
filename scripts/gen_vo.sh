#!/bin/bash
# Produksi voiceover Bahasa Indonesia - demo Kaisar Motion AKIOMIDA
# Dua kandidat suara (kazi, douji) untuk tiap baris; dipilih manual setelah QA ASR.
set -u
cd /home/z/my-project/work/vo

run_tts() { # $1=key $2=voice $3=speed $4=text
  if z-ai tts -i "$4" -o "$1_$2.wav" --voice "$2" --speed "$3"; then
    echo "OK $1_$2"
  else
    echo "GAGAL $1_$2"
  fi
}

declare -A TXT
TXT[vo1]="Kamu benci matematika? Tahan sebentar."
TXT[vo2]="Satu, tambah dua, tambah tiga, sampai seratus. Berapa hasilnya?"
TXT[vo3]="Gauss menjawabnya saat usia sembilan tahun. Pasangkan ujungnya: satu dengan seratus. Nilainya selalu seratus satu. Lima puluh pasang kali seratus satu: lima ribu lima puluh."
TXT[vo4]="Matematika bukan soal menghitung. Matematika itu seni melihat pola."
TXT[vo5a]="Inilah matematika yang bikin penasaran."
TXT[vo5b]="Buka browser, lalu tulis: Akiomida dot com."

declare -A SPD=( [vo1]=1.12 [vo2]=1.15 [vo3]=1.15 [vo4]=1.12 [vo5a]=1.12 [vo5b]=1.08 )

for k in vo1 vo2 vo3 vo4 vo5a vo5b; do
  run_tts "$k" kazi "${SPD[$k]}" "${TXT[$k]}"
  sleep 16
  run_tts "$k" douji "${SPD[$k]}" "${TXT[$k]}"
  sleep 16
done

python3 - <<'PY'
import subprocess, json
res = {}
for k in ["vo1","vo2","vo3","vo4","vo5a","vo5b"]:
    for v in ["kazi","douji"]:
        f = f"{k}_{v}.wav"
        try:
            o = subprocess.check_output(["ffprobe","-v","error","-show_entries",
                "format=duration","-of","default=noprint_wrappers=1:nokey=1", f])
            res[f"{k}_{v}"] = round(float(o.strip()), 3)
        except Exception:
            res[f"{k}_{v}"] = None
json.dump(res, open("durations_all.json","w"), indent=1)
print("DURASI:", json.dumps(res, indent=1))
PY

for k in vo1 vo2 vo3 vo4 vo5a vo5b; do
  for v in kazi douji; do
    f="${k}_${v}.wav"
    if [ -f "$f" ]; then
      if z-ai asr -f "$f" -o "tr_${k}_${v}.json"; then
        echo "ASR OK ${k}_${v}"
      else
        echo "ASR GAGAL ${k}_${v}"
      fi
      sleep 12
    fi
  done
done

echo "SEMUA SELESAI"
