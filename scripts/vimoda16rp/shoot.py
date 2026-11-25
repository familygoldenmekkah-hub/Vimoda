#!/usr/bin/env python3
"""Kaisar Motion - frame shooter (portrait & landscape).
Pemakaian: python3 shoot.py <portrait|landscape> [fps] [start] [end]
Frame disimpan ke /tmp/render/<orient>/frames/%05d.jpg
"""
import base64
import json
import pathlib
import sys
import time

from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).parent
ENGINE = HERE / "engine.html"
FONTS = HERE / "fonts"
OUT = pathlib.Path("/tmp/render")

# bobot font dipakai di CSS: 400,500,600,700,800 (Poppins) + JetBrains Mono
POPPINS = {400: "Poppins-Regular.ttf", 500: "Poppins-Medium.ttf",
           600: "Poppins-SemiBold.ttf", 700: "Poppins-Bold.ttf",
           800: "Poppins-ExtraBold.ttf"}


def font_css() -> str:
    rules = []
    for w, fname in POPPINS.items():
        p = FONTS / fname
        if p.exists():
            b64 = base64.b64encode(p.read_bytes()).decode()
            rules.append(
                "@font-face{font-family:'Poppins';font-style:normal;"
                f"font-weight:{w};src:url(data:font/ttf;base64,{b64}) format('truetype');}}"
            )
    jm = FONTS / "JetBrainsMono.ttf"
    if jm.exists():
        b64 = base64.b64encode(jm.read_bytes()).decode()
        rules.append(
            "@font-face{font-family:'JetBrains Mono';font-style:normal;"
            f"font-weight:100 800;src:url(data:font/ttf;base64,{b64}) format('truetype');}}"
        )
    return "\n".join(rules)


def main():
    orient = sys.argv[1] if len(sys.argv) > 1 else "landscape"
    fps = float(sys.argv[2]) if len(sys.argv) > 2 else 30.0
    start = int(sys.argv[3]) if len(sys.argv) > 3 else 0
    end = int(sys.argv[4]) if len(sys.argv) > 4 else -1
    dur = json.loads((HERE / "timing.json").read_text())["dur"]  # rev15: dari voice
    total = int(round(dur * fps))

    html = ENGINE.read_text().replace("/*__FONTS__*/", font_css())
    od = OUT / orient / "frames"
    od.mkdir(parents=True, exist_ok=True)
    (OUT / orient / "engine.html").write_text(html)

    if orient == "portrait":
        vw, vh = 1080, 1920
    else:
        vw, vh = 1920, 1080

    if end < 0 or end > total:
        end = total

    with sync_playwright() as p:
        browser = p.chromium.launch(
            args=["--no-sandbox", "--allow-file-access-from-files",
                  "--force-device-scale-factor=1", "--hide-scrollbars"])
        page = browser.new_page(viewport={"width": vw, "height": vh})
        url = (OUT / orient / "engine.html").as_uri() + f"?o={orient}"
        page.goto(url)
        page.wait_for_function("window.__ready === true")
        page.evaluate("document.fonts.ready.then(() => true)")
        page.evaluate("renderFrame(0)")
        page.screenshot(path=str(od / "warm.jpg"), type="jpeg", quality=88)

        t0 = time.time()
        n = 0
        for f in range(start, end):
            t = f / fps
            page.evaluate(f"renderFrame({t:.6f})")
            page.screenshot(path=str(od / f"{f:05d}.jpg"), type="jpeg", quality=88)
            n += 1
            if n % 120 == 0:
                el = time.time() - t0
                print(f"[{orient}] {n}/{end-start} frame, {el:.1f}s, "
                      f"avg {el/n*1000:.0f} ms/frame", flush=True)
        el = time.time() - t0
        print(f"[{orient}] SELESAI {n} frame ({start}..{end-1}) dalam {el:.1f}s "
              f"= {el/max(n,1)*1000:.0f} ms/frame", flush=True)
        browser.close()


if __name__ == "__main__":
    main()
