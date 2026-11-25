#!/bin/bash
# Ilustrasi AI untuk 5 kartu sisipan meme VIDEO 18 (dunia GRUP JAGA GUDANG).
# Satu seri: flat vector illustration, midnight purple + aksen emas hangat,
# tema gudang malam/inventaris, tanpa teks/huruf/angka.
# Output: /tmp/gen18/m0..m4.png
set -e
mkdir -p /tmp/gen18
STYLE="flat vector illustration, deep midnight purple background, warm golden amber accents, soft magenta glow, cozy rounded shapes, subtle tiny stars, minimal, centered composition, high quality, no text, no letters, no numbers, no watermark"
z-ai image -p "vast dark warehouse interior at night, tall wooden shelves with cardboard boxes, one warm hanging lamp glowing above, tiny golden dust motes floating, $STYLE" -o /tmp/gen18/m0.png -s 1024x1024
z-ai image -p "warehouse shelf with neat rows of cardboard boxes, a glowing clipboard floating in front, one box glowing brighter than the others, $STYLE" -o /tmp/gen18/m1.png -s 1024x1024
z-ai image -p "thirty small rounded pastry boxes arranged into six equal glowing groups on a wooden table, warm golden light, cozy night mood, $STYLE" -o /tmp/gen18/m2.png -s 1024x1024
z-ai image -p "industrial freezer door slightly open with cold violet mist and frost sparkles, a glowing rounded thermometer hanging on the wall, night mood, $STYLE" -o /tmp/gen18/m3.png -s 1024x1024
z-ai image -p "tall stack of cardboard boxes forming a giant question mark shape in a dark warehouse, warm golden glow behind, mysterious calm mood, $STYLE" -o /tmp/gen18/m4.png -s 1024x1024
ls -la /tmp/gen18/
