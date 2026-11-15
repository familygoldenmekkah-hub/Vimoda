#!/bin/bash
# Kaisar Motion - encode final video + thumbnail
# Pemakaian: bash build.sh <portrait|landscape>
set -e
O="$1"
FPS=30
SRC="/tmp/render/$O/frames"
AUD="/tmp/render/audio.wav"
OUT="/tmp/render/$O/final.mp4"

ffmpeg -y -framerate $FPS -i "$SRC/%05d.jpg" -i "$AUD" \
  -c:v libx264 -preset medium -crf 18 -profile:v high -level 4.1 \
  -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 192k -shortest \
  "$OUT" 2>&1 | tail -3

# thumbnail dari momen hook (t=3.9 -> frame 117)
cp "$SRC/00117.jpg" "/tmp/render/$O/thumbnail.jpg"
echo "== $O =="
ffprobe -v error -show_entries format=duration,size -show_entries stream=codec_type,codec_name,width,height -of default=noprint_wrappers=1 "$OUT"
