#!/bin/bash
# Ilustrasi AI untuk 5 kartu sisipan meme VIDEO 19 (dunia GRUP JAGA
# TERMINAL). Satu seri: flat vector illustration, midnight purple + aksen
# emas hangat, tema terminal bus dini hari, tanpa teks/huruf/angka.
# Output: /tmp/gen19/m0..m4.png
set -e
mkdir -p /tmp/gen19
STYLE="flat vector illustration, deep midnight purple background, warm golden amber accents, soft magenta glow, cozy rounded shapes, subtle tiny stars, minimal, centered composition, high quality, no text, no letters, no numbers, no watermark"
z-ai image -p "quiet bus terminal at dawn, rows of parked minibuses under one warm hanging lamp, mist, tiny golden dust motes, $STYLE" -o /tmp/gen19/m0.png -s 1024x1024
z-ai image -p "a cheerful minibus front view with a glowing key floating beside it, ticket booth in background, night mood, $STYLE" -o /tmp/gen19/m1.png -s 1024x1024
z-ai image -p "a tall stack of paper bus tickets with a glowing roll, rows of empty rounded seats behind, warm golden light, $STYLE" -o /tmp/gen19/m2.png -s 1024x1024
z-ai image -p "one empty parking garage slot glowing softly among numbered garage doors, a single warm light above, calm night mood, $STYLE" -o /tmp/gen19/m3.png -s 1024x1024
z-ai image -p "a giant glowing ticket roll shaped like a question mark standing in an empty terminal hall, warm golden glow behind, mysterious calm mood, $STYLE" -o /tmp/gen19/m4.png -s 1024x1024
ls -la /tmp/gen19/
