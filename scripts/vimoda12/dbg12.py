#!/usr/bin/env python3
"""Debug engine huyuan: tangkap error console/runtime halaman."""
import pathlib
import sys

from playwright.sync_api import sync_playwright

HERE = pathlib.Path("/home/z/my-project/scripts/vimoda12")
ORIENT = sys.argv[1] if len(sys.argv) > 1 else "portrait"
vw, vh = (1080, 1920) if ORIENT == "portrait" else (1920, 1080)
html = (HERE / "engine.html").read_text()
tmp = pathlib.Path("/tmp/render") / ORIENT
tmp.mkdir(parents=True, exist_ok=True)
(tmp / "engine.html").write_text(html)

with sync_playwright() as p:
    b = p.chromium.launch(args=["--no-sandbox", "--allow-file-access-from-files"])
    pg = b.new_page(viewport={"width": vw, "height": vh})
    pg.on("console", lambda m: print("CONSOLE", m.type, m.text[:300]))
    pg.on("pageerror", lambda e: print("PAGEERROR", str(e)[:500]))
    pg.goto((tmp / "engine.html").as_uri() + f"?o={ORIENT}")
    try:
        pg.wait_for_function("window.__ready === true", timeout=8000)
        print("READY OK")
        pg.evaluate("renderFrame(2.0)")
        pg.screenshot(path="/tmp/render/debug.jpg", type="jpeg", quality=80)
        print("screenshot ok")
    except Exception as e:
        print("TIMEOUT/FAIL", str(e)[:200])
    b.close()
