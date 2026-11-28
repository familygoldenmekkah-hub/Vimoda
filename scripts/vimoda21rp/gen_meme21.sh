#!/bin/bash
# Ilustrasi AI untuk 5 kartu sisipan meme VIDEO 20 (dunia GRUP PANITIA
# LARI PAGI), gaya PAGI CERIA: terang, hangat, ceria - NOL tema gelap.
# Output: /tmp/gen21/m0..m4.png
set -e
mkdir -p /tmp/gen21
STYLE="flat vector illustration, bright warm morning, cream and sunny yellow palette with coral and mint accents, soft sky blue, cheerful rounded shapes, fluffy clouds, gentle sunlight, minimal, centered composition, high quality, no text, no letters, no numbers, no watermark"
z-ai image -p "morning fun run at a school field at sunrise, warm cream sky, colorful finish line banner, tiny happy runners, $STYLE" -o /tmp/gen21/m0.png -s 1024x1024
z-ai image -p "a cheerful running shoe with a fluttering blank racing bib beside it, warm morning light, playful mood, $STYLE" -o /tmp/gen21/m1.png -s 1024x1024
z-ai image -p "a neat stack of blank white racing bib cards on a clipboard with a small start flag, bright morning mood, $STYLE" -o /tmp/gen21/m2.png -s 1024x1024
z-ai image -p "three podium blocks with a small golden crown on the tallest one, confetti in the bright morning sky, cheerful, $STYLE" -o /tmp/gen21/m3.png -s 1024x1024
z-ai image -p "a giant glowing stopwatch shaped like a question mark above a sunny running track, morning mood, playful mystery, $STYLE" -o /tmp/gen21/m4.png -s 1024x1024
ls -la /tmp/gen21/
