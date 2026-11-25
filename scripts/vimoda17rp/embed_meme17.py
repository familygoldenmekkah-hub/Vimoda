#!/usr/bin/env python3
"""Embed 5 ilustrasi AI kartu meme VIDEO 17 ke frag_imgs.html
(const MEME_IMGS = [data URI ...]) - digabung build via cat."""
import base64
import io
from pathlib import Path
from PIL import Image

HERE = Path("/home/z/my-project/scripts/vimoda17rp")
parts = []
for i in range(5):
    im = Image.open(f"/tmp/gen17/m{i}.png").convert("RGB").resize((560, 560), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=72, optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode()
    parts.append("'data:image/jpeg;base64," + b64 + "'")
    print(f"m{i}: {len(buf.getvalue()) // 1024} KB jpeg")

out = (
    "/* ---------- ilustrasi AI kartu meme rev14 (ganti emoji comot): "
    "5 gambar flat midnight-gold dunia dapur, embed base64 ---------- */\n"
    "const MEME_IMGS=[\n" + ",\n".join(parts) + "\n];\n"
)
(HERE / "frag_imgs.html").write_text(out)
print("frag_imgs.html:", (HERE / "frag_imgs.html").stat().st_size // 1024, "KB")
