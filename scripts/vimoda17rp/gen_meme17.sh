#!/bin/bash
# Ilustrasi AI untuk 5 kartu sisipan meme VIDEO 17 (ganti emoji comot).
# Satu seri: flat vector illustration, midnight purple + aksen emas hangat,
# tema dapur/baking dunia GRUP RESEP GAGAL, tanpa teks/huruf/angka.
# Output: /tmp/gen17/m0..m4.png
set -e
mkdir -p /tmp/gen17
STYLE="flat vector illustration, deep midnight purple background, warm golden amber accents, soft magenta glow, cozy rounded shapes, subtle tiny stars, minimal, centered composition, high quality, no text, no letters, no numbers, no watermark"
z-ai image -p "three rounded chat speech bubbles floating above an open smartphone with a warm recipe app glowing, group chat opened, $STYLE" -o /tmp/gen17/m0.png -s 1024x1024
z-ai image -p "black digital kitchen scale silhouette front view, matte dark body, subtle golden rim light, slightly skeptical mood, $STYLE" -o /tmp/gen17/m1.png -s 1024x1024
z-ai image -p "a cute measuring cup and a digital scale side by side, golden sparkles and glowing rounded bars rising upward like rising dough, $STYLE" -o /tmp/gen17/m2.png -s 1024x1024
z-ai image -p "an open envelope with a recipe paper flying toward a glowing spiral of endless numbers in the night sky leaving a dotted golden trail, $STYLE" -o /tmp/gen17/m3.png -s 1024x1024
z-ai image -p "mysterious hooded pastry chef holding a glowing smartphone with a whisk silhouette, face hidden in shadow, warm golden light from the phone screen, night mood, $STYLE" -o /tmp/gen17/m4.png -s 1024x1024
ls -la /tmp/gen17/
