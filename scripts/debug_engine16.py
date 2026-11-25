#!/usr/bin/env python3
"""Debug: muat engine.html di chromium, tangkap console/pageerror."""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

eng = Path("/tmp/render/portrait/engine.html").read_text()
errs = []
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1080, "height": 1920})
    pg.on("console", lambda m: errs.append(f"[{m.type}] {m.text}") if m.type in ("error", "warning") else None)
    pg.on("pageerror", lambda e: errs.append(f"[pageerror] {e}"))
    pg.set_content(eng, wait_until="domcontentloaded")
    pg.wait_for_timeout(3500)
    ready = pg.evaluate("window.__ready===true")
    b.close()
for e in errs[:8]:
    print(e)
print("ready:", ready)
sys.exit(0 if ready and not errs else 1)
