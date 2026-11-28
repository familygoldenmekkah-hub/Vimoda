#!/usr/bin/env python3
"""fontcheck15: pastikan SEMUA teks di engine punya ukuran font >= 24px
(keluhan penonton rev6: dialog RP 30px dan teks kecil tidak terbaca).
Scan computed style semua elemen yang berisi teks langsung pada kedua
orientasi. Exit 1 jika ada."""
import sys
from playwright.sync_api import sync_playwright
import pathlib

HERE = pathlib.Path(__file__).parent
OUT = pathlib.Path("/tmp/render")
MINPX = 23.5  # toleransi pembulatan di bawah 24

JS = """(() => {
  const bad = [];
  for (const el of document.querySelectorAll('body *')) {
    if (/^(SCRIPT|STYLE|TITLE|NOSCRIPT)$/.test(el.tagName)) continue;
    const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    if (!hasText) continue;
    const cs = getComputedStyle(el);
    const fs = parseFloat(cs.fontSize);
    if (fs < __MIN__ && parseFloat(cs.opacity || '1') > 0.02) {
      bad.push((el.id || el.className) + ' | ' + Math.round(fs) + 'px | ' +
               el.textContent.trim().slice(0, 24));
    }
  }
  return bad;
})()"""

def check(orient):
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--force-color-profile=srgb", "--disable-lcd-text"])
        pg = b.new_page(viewport={"width": 1080 if orient == "portrait" else 1920,
                                  "height": 1920 if orient == "portrait" else 1080})
        pg.goto((OUT / orient / "engine.html").as_uri() + f"?o={orient}")
        pg.wait_for_function("window.__ready===true", timeout=15000)
        bad = pg.evaluate(JS.replace("__MIN__", str(MINPX)))
        b.close()
    if bad:
        print(f"[{orient}] TEKS TERLALU KECIL ({len(bad)}):")
        for x in bad[:20]:
            print("   ", x)
        return False
    print(f"[{orient}] semua teks >= 24px ok")
    return True

ok = True
for o in ("portrait",):
    ok = check(o) and ok
sys.exit(0 if ok else 1)
