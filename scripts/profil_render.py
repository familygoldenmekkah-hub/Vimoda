#!/usr/bin/env python3
# Profil kecepatan per-scene renderer AKIOMIDA
import sys, time
import numpy as np
from PIL import Image
sys.path.insert(0, "/home/z/my-project/scripts")
import akiomida_render as R

def bench(tlist, label):
    s = R.Sparks()
    t0 = time.time()
    for t in tlist:
        img = Image.fromarray(R.BG_RGBA.copy())
        R.draw_scene(img, t)
        fx = Image.new("RGBA", (R.W, R.H), (0, 0, 0, 0))
        s.update(1 / 30); R.draw_dust(fx, 1 / 30); s.draw(fx)
        img.alpha_composite(fx)
        a = np.asarray(img.convert("RGB"), dtype=np.float32)
        a *= R.VIG; a += R.NOISE[0]; np.clip(a, 0, 255, out=a)
        _ = a.astype(np.uint8).tobytes()
    dt = (time.time() - t0) / len(tlist)
    print(f"{label}: {dt:.3f} s/frame -> {(dt*len(tlist)):.1f}s per 30 frame")

bench(list(np.arange(1.0, 1.5, 1 / 30)), "scene1-hook ")
bench(list(np.arange(7.0, 7.5, 1 / 30)), "scene2-token")
bench(list(np.arange(13.0, 13.5, 1 / 30)), "scene3-arcs")
bench(list(np.arange(21.8, 22.3, 1 / 30)), "scene3-slam")
bench(list(np.arange(25.0, 25.5, 1 / 30)), "scene4-pesan")
bench(list(np.arange(35.0, 35.5, 1 / 30)), "scene5-endcd")
