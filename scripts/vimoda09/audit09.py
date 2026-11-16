#!/usr/bin/env python3
"""Audit bbox elemen kunci pada waktu-waktu kritis (anti-timpa terukur)."""
import pathlib
from playwright.sync_api import sync_playwright

HERE = pathlib.Path("/home/z/my-project/scripts/vimoda09")
JS = """(() => {
  renderFrame(TT);
  const g = id => { const e=document.getElementById(id); if(!e) return null;
    const r=e.getBoundingClientRect(); return [Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)]; };
  const b2 = document.querySelectorAll('.bchar')[1];
  return {eqchip:g('eqchip'),qchip:g('qchip'),pil:g('pil'),qm:g('qm'),thermo:g('thermo'),
          car:g('liftcar'),endcard:g('endcard'),subbar:g('subbar'),
          carM:(b2?[Math.round(b2.getBoundingClientRect().x),Math.round(b2.getBoundingClientRect().y)]:null),
          op:{carM:b2?b2.style.opacity:'-',car:document.getElementById('liftcar').style.opacity}};
})()"""

for orient, vw, vh in (("portrait", 1080, 1920), ("landscape", 1920, 1080)):
    tmp = pathlib.Path("/tmp/render") / orient
    tmp.mkdir(parents=True, exist_ok=True)
    (tmp / "engine.html").write_text((HERE / "engine.html").read_text())
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--no-sandbox", "--allow-file-access-from-files"])
        pg = b.new_page(viewport={"width": vw, "height": vh})
        pg.goto((tmp / "engine.html").as_uri() + f"?o={orient}")
        pg.wait_for_function("window.__ready === true")
        for t in (23.0, 44.9, 48.2, 51.0):
            print(orient, f"t={t}", pg.evaluate(JS.replace("TT", str(t))))
        b.close()
