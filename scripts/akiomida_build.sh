#!/bin/bash
# Rakitan final: render video -> sintesis audio -> mux MP4
set -euo pipefail
cd /home/z/my-project

echo "== [1/3] Render video =="
python3 scripts/akiomida_render.py

echo "== [2/3] Sintesis & mixing audio =="
python3 scripts/akiomida_audio.py

echo "== [3/3] Mux MP4 final =="
ffmpeg -y -loglevel error -i work/video_only.mp4 -i work/mix.wav \
  -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest \
  download/AKIOMIDA_DEMO_MOTION.mp4

ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1 \
  download/AKIOMIDA_DEMO_MOTION.mp4
echo "RAKITAN SELESAI"
