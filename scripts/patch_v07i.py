#!/usr/bin/env python3
"""Revisi 15 lanjutan: kukuhkan wawasan studi 13 skill motion menjadi aturan 20.
README.md + naskah07.md."""
import pathlib

NAS = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/naskah07.md")
RED = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")

def rep(txt, old, new, n=1, tag=""):
    c = txt.count(old)
    if c != n:
        raise SystemExit(f"[{tag}] ditemukan {c}x (harus {n}x): {old[:70]!r}")
    print(f"[{tag}] ok")
    return txt.replace(old, new)

n = NAS.read_text()
n = rep(n, "## Revisi 6 (arahan kreator setelah menonton di HP)",
"""## Studi wawasan 13 skill motion GitHub (2026-11-15)

Sebelum benah revisi 15 dilanjutkan, 13 tools/skill dari GitHub dipelajari totalitas:
HyperFrames, Remotion, Remotion Skills, GSAP, GSAP Skills, OpenMontage, Lemo-Opuscar,
Video Shotcraft, Motionmaxxing, MCP for Blender, Blender Skills, Dream Loop, dan keluarga
skill Animate. Rangkuman, pelajaran, dan pemetaannya ke pipeline ada di
package/wawasan-motion.md. Delapan prinsip kerajinan hasil studi (determinisme,
beat-sheet induk, token easing, stagger disiplin, tata shot establish-develop-payoff,
caption craft, gaya terkunci, loop kritik) dikukuhkan menjadi aturan produksi no. 20.

## Revisi 6 (arahan kreator setelah menonton di HP)""", 1, "studi naskah")
NAS.write_text(n)
print("naskah studi ok")

r = RED.read_text()
r = rep(r, "agar penonton menyerap ilmunya, bukan menonton elemen saling balapan.",
"agar penonton menyerap ilmunya, bukan menonton elemen saling balapan.\n"
"20. Wawasan 13 skill motion GitHub (2026-11-15; rangkuman di package/wawasan-motion.md): produksi mengikuti delapan prinsip kerajinan - determinisme (frame adalah fungsi murni waktu dengan RNG berbenih), satu beat-sheet induk dari naskah untuk narasi/scene/gestur/audio, token easing (masuk lembut dengan overshoot maksimal 10 persen, fisik berbasis gerak, keluar fade cepat), stagger berdisiplin (satu ide per layar, jeda 0.3-1.2 detik), tata shot per bab establish-develop-payoff dengan potongan tepat di beat, caption craft proporsional kecepatan baca, gaya terkunci (palet/grade/grain/vignette tetap), dan loop kritik (blockout - smoke visual - QA terprogram - render final) sebelum push.", 1, "aturan 20")
RED.write_text(r)
print("README aturan 20 ok")
