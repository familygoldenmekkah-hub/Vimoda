#!/bin/bash
# Ilustrasi AI untuk 5 kartu sisipan meme VIDEO 16 rev14 (ganti emoji comot).
# Satu seri: flat vector illustration, midnight navy-purple + aksen emas hangat,
# tanpa teks/huruf/angka. Output: /tmp/gen16/m0..m4.png
set -e
mkdir -p /tmp/gen16
STYLE="flat vector illustration, deep midnight purple background, warm golden amber accents, soft magenta glow, cozy rounded shapes, subtle tiny stars, minimal, centered composition, high quality, no text, no letters, no numbers, no watermark"
z-ai image -p "three rounded chat speech bubbles floating above an open smartphone with warm golden glow, group chat opened, $STYLE" -o /tmp/gen16/m0.png -s 1024x1024
z-ai image -p "black handheld game console silhouette floating front view, matte dark body, subtle golden rim light, slightly skeptical mood, $STYLE" -o /tmp/gen16/m1.png -s 1024x1024
z-ai image -p "a cute calculator and a bubble tea cup side by side, golden sparkles and glowing rounded bars rising upward like a staircase, $STYLE" -o /tmp/gen16/m2.png -s 1024x1024
z-ai image -p "a glowing full moon over a night sky, an open envelope with proof papers flying toward the moon leaving a dotted golden trail, $STYLE" -o /tmp/gen16/m3.png -s 1024x1024
z-ai image -p "mysterious hooded figure holding a glowing smartphone, face hidden in shadow, warm golden light from the phone screen, night mood, $STYLE" -o /tmp/gen16/m4.png -s 1024x1024
ls -la /tmp/gen16/
