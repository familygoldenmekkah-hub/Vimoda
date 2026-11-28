#!/usr/bin/env python3
"""Embed 9 ilustrasi AI VIDEO 21 (5 kartu meme + 4 hero scene GLOW) ke
frag_imgs.html (const MEME_IMGS + const HERO_IMGS) - digabung build via cat."""
import base64
import io
from pathlib import Path
from PIL import Image

HERE = Path("/home/z/my-project/scripts/vimoda21rp")
mparts = []
for i in range(5):
    im = Image.open(f"/tmp/gen21/m{i}.png").convert("RGB").resize((560, 560), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=72, optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode()
    mparts.append("'data:image/jpeg;base64," + b64 + "'")
    print(f"m{i}: {len(buf.getvalue()) // 1024} KB jpeg")

hparts = []
for i in range(4):
    im = Image.open(f"/tmp/gen21/h{i + 1}.png").convert("RGB")
    im.thumbnail((768, 1344), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=74, optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode()
    hparts.append("'data:image/jpeg;base64," + b64 + "'")
    print(f"h{i + 1}: {len(buf.getvalue()) // 1024} KB jpeg")

out = (
    "/* ---------- ilustrasi AI rev24 (GLOW v3): 5 gambar meme dapur ceria +"
    " 4 hero scene sinematik, embed base64 ---------- */\n"
    "const MEME_IMGS=[\n" + ",\n".join(mparts) + "\n];\n"
    "const HERO_IMGS=[\n" + ",\n".join(hparts) + "\n];\n"
)
(HERE / "frag_imgs.html").write_text(out)
print("frag_imgs.html:", (HERE / "frag_imgs.html").stat().st_size // 1024, "KB")
