#!/usr/bin/env python3
"""Render daftar frame kunci untuk smoke test.
Pemakaian: python3 shoot_list.py <portrait|landscape> 30,117,225,...
Output: /tmp/render/<orient>/key_<frame>.jpg
"""
import base64
import pathlib
import sys

from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).parent
ENGINE = HERE / "engine.html"
FONTS = HERE / "fonts"
OUT = pathlib.Path("/tmp/render")

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
    orient = sys.argv[1]
    frames = [int(x) for x in sys.argv[2].split(",")]

    html = ENGINE.read_text().replace("/*__FONTS__*/", font_css())
    od = OUT / orient
    od.mkdir(parents=True, exist_ok=True)
    (OUT / orient / "engine.html").write_text(html)

    if orient == "portrait":
        vw, vh = 1080, 1920
    else:
        vw, vh = 1920, 1080

    with sync_playwright() as p:
        browser = p.chromium.launch(
            args=["--no-sandbox", "--allow-file-access-from-files",
                  "--force-device-scale-factor=1", "--hide-scrollbars"])
        page = browser.new_page(viewport={"width": vw, "height": vh})
        url = (OUT / orient / "engine.html").as_uri() + f"?o={orient}"
        page.goto(url)
        page.wait_for_function("window.__ready === true")
        page.evaluate("document.fonts.ready.then(() => true)")
        for f in frames:
            t = f / 30.0
            page.evaluate(f"renderFrame({t:.6f})")
            page.screenshot(path=str(od / f"key_{f:05d}.jpg"), type="jpeg", quality=92)
            print(f"[{orient}] key frame {f} (t={t:.2f}s) OK", flush=True)
        browser.close()


if __name__ == "__main__":
    main()
