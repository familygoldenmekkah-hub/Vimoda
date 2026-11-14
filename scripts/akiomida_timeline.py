# Modul timeline AKIOMIDA - demo "Kaisar Motion"
# Sumber kebenaran tunggal: semua waktu, label, dan peristiwa (events)
# dipakai bersama oleh renderer video dan pen-sintesis audio.

FPS = 30
W, H = 1920, 1080

# Durasi VO cadangan (dipakai hanya jika durations.json belum ada)
# vo3 sengaja None: scene Gauss dinarasikan visual + sound design, tanpa VO.
DEFAULT_DUR = {
    "vo1": 4.68, "vo2": 6.55, "vo3": None,
    "vo4": 7.31, "vo5a": 6.09, "vo5b": 7.67,
}


def build_events(T):
    E = []

    def ev(tipe, t, **kw):
        d = dict(type=tipe, t=round(float(t), 3))
        d.update(kw)
        E.append(d)

    # ---------- Scene 1: HOOK ----------
    ev("impact", 0.80, size="s")
    ev("shake", 0.80, amp=9)
    ev("burst", 0.80, n=55, x=960, y=430)
    ev("impact", 1.55, size="m")
    ev("shake", 1.55, amp=13)
    ev("burst", 1.55, n=70, x=960, y=565)
    for i in range(15):  # mesin ketik "TAHAN n DETIK."
        ev("tick", 2.30 + i * 0.045, soft=True)
    ev("whoosh", T["s2"][0])

    # ---------- Scene 2: TANTANGAN ----------
    for i in range(9):  # 9 token angka terbang masuk
        ev("blip", T["s2"][0] + 0.35 + i * 0.13)
    q_t = T["s2"][0] + 2.05
    ev("impact", q_t, size="s")
    ev("shake", q_t, amp=7)
    ev("burst", q_t, n=35, x=960, y=640)
    ev("whoosh", T["s3"][0])

    # ---------- Scene 3: PENGELOLAAN & 5050 ----------
    ev("blip", T["arcs_start"] + 0.55)
    ev("blip", T["arcs_start"] + 1.95)
    ev("blip", T["slam"] - 1.8)
    ev("whoosh", T["slam"] - 2.30)
    ev("impact", T["slam"], size="xl")
    ev("shake", T["slam"], amp=24)
    ev("flash", T["slam"], peak=0.9, decay=9)
    ev("burst", T["slam"], n=110, x=960, y=470)
    ev("whoosh", T["s4"][0])

    # ---------- Scene 4: PESAN ----------
    ev("scratch", T["s4"][0] + 1.75)
    l3 = T["s4"][0] + 2.70
    ev("impact", l3, size="m")
    ev("shake", l3, amp=11)
    ev("burst", l3, n=60, x=960, y=650)
    ev("whoosh", T["s5_start"])

    # ---------- Scene 5: CTA AKIOMIDA.COM ----------
    ev("ui_in", T["s5_start"] + 0.25)
    for i in range(12):  # pengetikan akiomida.com
        ev("tick", T["s5_start"] + 1.05 + i * 0.10)
    ev("click", T["s5_start"] + 2.40)
    ev("whoosh", T["punch"])
    ev("shake", T["punch"] + 0.05, amp=6)
    ev("impact", T["endcard"], size="m")
    ev("flash", T["endcard"], peak=0.4, decay=7)
    ev("burst", T["endcard"], n=60, x=960, y=470)

    E.sort(key=lambda e: e["t"])
    return E


def build_timeline(d):
    """d: dict durasi vo1..vo5b (detik). Mengembalikan dict timeline lengkap."""
    vo1_t = 0.35
    s1_end = vo1_t + d["vo1"] + 0.40

    s2 = (s1_end, s1_end + d["vo2"] + 0.50)
    vo2_t = s1_end + 0.15

    s3_start = s2[1]
    dots_dur, arc_span = 0.75, 3.40
    arcs_start = s3_start + dots_dur
    arcs_end = arcs_start + arc_span
    vo3 = d.get("vo3")
    if vo3:
        vo3_t = s3_start + 0.30
        slam = max(vo3_t + vo3 + 0.20, arcs_end + 1.80)
    else:
        vo3_t = None
        slam = arcs_end + 1.90
    s3_end = slam + 1.70

    s4 = (s3_end, s3_end + d["vo4"] + 0.60)
    vo4_t = s3_end + 0.20

    s5_start = s4[1]
    vo5a_t = s5_start + 0.30
    punch = max(s5_start + 3.30, vo5a_t + d["vo5a"] + 0.20)
    endcard = punch + 0.40
    vo5b_t = endcard + 0.15
    total = endcard + d["vo5b"] + 2.20

    T = dict(
        fps=FPS, w=W, h=H,
        vo1_t=vo1_t, vo2_t=vo2_t, vo3_t=vo3_t, vo4_t=vo4_t,
        vo5a_t=vo5a_t, vo5b_t=vo5b_t,
        s1=(0.0, s1_end), s2=s2, s3=(s3_start, s3_end), s4=s4,
        s5_start=s5_start, punch=punch, endcard=endcard,
        arcs_start=arcs_start, arcs_end=arcs_end, slam=slam,
        arc_span=arc_span, dots_dur=dots_dur,
        total=total, hook_n=int(round(slam)),
    )
    T["events"] = build_events(T)
    return T


if __name__ == "__main__":
    import json, sys
    dur_path = "/home/z/my-project/work/vo/durations.json"
    d = dict(DEFAULT_DUR)
    try:
        raw = json.load(open(dur_path))
        for k in d:
            if raw.get(k):
                d[k] = float(raw[k])
    except Exception as e:
        print("Peringatan: durations.json tidak terbaca, pakai default:", e)
    T = build_timeline(d)
    print(json.dumps({k: v for k, v in T.items() if k != "events"}, indent=1))
    print("Jumlah events:", len(T["events"]))
