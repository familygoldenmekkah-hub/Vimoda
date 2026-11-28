#!/bin/bash
# 9 ilustrasi AI GLOW v3 untuk VIDEO 21 (GRUP RESEP GAGAL): 4 hero scene
# sinematik (portrait 1024x1792, full-bleed) + 5 kartu meme (square).
# Palet: gradien pastel peach-rose-lilac + coral/mint/gold, gaya 3d clay
# ceria, NOL tema gelap, tanpa teks/angka di gambar.
# Output: /tmp/gen21/h1..h4.png (hero), m0..m4.png (meme)
set -e
mkdir -p /tmp/gen21
BASE="3d clay style illustration, bright cheerful, pastel gradient background peach pink lavender aqua, soft glow, coral mint and gold accents, warm sunny light, cozy, high quality, no text, no letters, no numbers, no watermark"
z-ai image -p "cozy bright kitchen scene, a cute rectangular chocolate cake that came out rock hard and cracked sitting on a cooling rack, playful funny mood, $BASE" -o /tmp/gen21/h1.png -s 768x1344
z-ai image -p "bright kitchen table flat lay, digital kitchen scale with a small white bowl on top, chocolate bar pieces and eggs scattered around, measuring spoons, $BASE" -o /tmp/gen21/h2.png -s 768x1344
z-ai image -p "two chocolate cake trays side by side on a counter, one small portion and one double size portion, a friendly egg and a stick of butter beside, $BASE" -o /tmp/gen21/h3.png -s 768x1344
z-ai image -p "warm cozy kitchen counter with two perfect glossy chocolate cakes finished, golden sparkles floating, celebration mood, $BASE" -o /tmp/gen21/h4.png -s 768x1344
z-ai image -p "a rock hard chocolate brownie block standing like a brick on a wooden cutting board, cute funny, $BASE" -o /tmp/gen21/m0.png -s 1024x1024
z-ai image -p "a digital kitchen scale with a glowing blank display, a small bowl on top, cute, $BASE" -o /tmp/gen21/m1.png -s 1024x1024
z-ai image -p "three brown eggs in a cute round bowl, soft sparkles, $BASE" -o /tmp/gen21/m2.png -s 1024x1024
z-ai image -p "two chocolate cake trays close up, one double portion bigger than the other, cheerful, $BASE" -o /tmp/gen21/m3.png -s 1024x1024
z-ai image -p "a golden whisk with sparkles and tiny stars around it, celebration, $BASE" -o /tmp/gen21/m4.png -s 1024x1024
ls -la /tmp/gen21/
