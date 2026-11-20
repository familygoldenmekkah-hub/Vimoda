#!/usr/bin/env python3
"""Musik & SFX prosedural rev2 untuk video 15 "Kasus Pencuri Rapi".
Alur detektif ala anime misteri dalam nada D MINOR noir (kasus, bukti,
deduksi), berubah ke F MAJOR hangat tepat saat KASUS DITUTUP (56.4):
pad per babak, JEDA DRAMATIS (ma) 33.6-34.4 tanpa musik sebelum deduksi,
tremolo pra-climax 31.8-33.48, impact sting 34.4, run tangga F major saat
menyusun jebakan, tick jam malam 52.2-55.8 (menunggu pencuri), boom
penangkapan + fanfare F-A-C-F, kick formasi kasus baru, fanfare endcard.
Durasi 84.0 s (aturan 31). Cue mengikuti 22 beat narasi detektif.
Output: /tmp/render/audio.wav (stereo 44100 Hz, 16-bit, 84.0 s)
"""
import numpy as np
import wave

SR = 44100
DUR = 84.0
N = int(SR * DUR)
OUT = "/tmp/render/audio.wav"

rng = np.random.default_rng(20261122)
mixL = np.zeros(N)
mixR = np.zeros(N)


def add(t0, sig, pan=0.0, gain=1.0):
    i0 = int(t0 * SR)
    if i0 >= N:
        return
    n = min(len(sig), N - i0)
    gl = gain * np.sqrt(0.5 * (1 - pan))
    gr = gain * np.sqrt(0.5 * (1 + pan))
    mixL[i0:i0 + n] += sig[:n] * gl
    mixR[i0:i0 + n] += sig[:n] * gr


def env_ad(n, a, d):
    t = np.arange(n) / SR
    e = np.minimum(t / max(a, 1e-4), 1.0) * np.exp(-np.maximum(t - a, 0) / d)
    return e


def sine(f, dur, a=0.005, d=0.25, harm=(1.0,)):
    n = int(dur * SR)
    t = np.arange(n) / SR
    sig = np.zeros(n)
    for i, amp in enumerate(harm):
        sig += amp * np.sin(2 * np.pi * f * (i + 1) * t)
    return sig * env_ad(n, a, d)


def noise_band(dur, f_lo, f_hi, tilt=1.0):
    n = int(dur * SR)
    x = rng.standard_normal(n)
    X = np.fft.rfft(x)
    fr = np.fft.rfftfreq(n, 1 / SR)
    mask = np.exp(-0.5 * ((fr - (f_lo + f_hi) / 2) / ((f_hi - f_lo) / 2.2)) ** 2)
    X *= mask
    y = np.fft.irfft(X, n)
    y /= (np.max(np.abs(y)) + 1e-9)
    hann = np.hanning(n)
    return y * hann * tilt


def kick(level=0.20):
    dur = 0.30
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = 74 * np.exp(-t / 0.055) + 40
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / 0.085) * level


def boom(level=0.22):
    dur = 0.9
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = 60 * np.exp(-t / 0.10) + 34
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) * np.exp(-t / 0.22)
    nz = noise_band(0.12, 60, 240)
    s[: len(nz)] += nz * 0.5 * np.exp(-np.arange(len(nz)) / (0.03 * SR))
    return s / (np.max(np.abs(s)) + 1e-9) * level


def whoosh(dur=0.85, up=True, level=0.13):
    n = int(dur * SR)
    x = rng.standard_normal(n)
    X = np.fft.rfft(x)
    fr = np.fft.rfftfreq(n, 1 / SR)
    mask = np.exp(-0.5 * ((fr - 1000) / 900) ** 2)
    y = np.fft.irfft(X * mask, n)
    y /= (np.max(np.abs(y)) + 1e-9)
    t = np.linspace(0, 1, n)
    ts = t ** 1.7 if up else 1 - (1 - t) ** 1.7
    y = np.interp(ts, t, y)
    hann = np.sin(np.pi * t) ** 1.6
    return y * hann * level


def tick(f=900.0, level=0.09):
    s = sine(f, 0.07, a=0.002, d=0.02, harm=(1.0, 0.3))
    return s / (np.max(np.abs(s)) + 1e-9) * level


def chime(f=880.0, level=0.12):
    return sine(f, 1.6, a=0.002, d=0.5, harm=(1.0, 0.45, 0.18)) * level


# ---------- PAD / chord progress: D MINOR noir -> F MAJOR saat kasus ditutup ----------
D3, F3, A3, C4 = 146.83, 174.61, 220.0, 261.63
Bb2, Bb3, G3, D4 = 116.54, 233.08, 196.0, 293.66
SEG = [
    (0.0, 10.6, (D3, F3, A3)),        # kasus dibuka, malam noir
    (10.6, 23.6, (Bb2, D3, F3)),      # bukti 1: faktor
    (23.6, 33.6, (G3, Bb3, D4)),      # bukti 2: pola serangan (makin menegangkan)
    # 33.6 - 34.4 : ma, hening total
    (34.4, 41.4, (D3, F3, A3)),       # deduksi twist
    (41.4, 56.4, (G3, Bb3, D4)),      # rencana jebakan (ketegangan menaik)
    (56.4, 84.0, (F3, A3, C4)),       # KASUS DITUTUP: hangat F major
]
for (t0, t1, notes) in SEG:
    dur = t1 - t0 + 1.0
    n = int(dur * SR)
    t = np.arange(n) / SR
    e = np.ones(n)
    atk = int(1.0 * SR)
    rel = int(1.2 * SR)
    e[:atk] = np.linspace(0, 1, atk)
    e[-rel:] *= np.linspace(1, 0, rel)
    e *= np.minimum(t / dur * 3 + 0.15, 1.0)
    for f in notes:
        for det, side in ((0.9985, "L"), (1.0015, "R")):
            sig = np.zeros(n)
            for i, amp in ((0, 1.0), (1, 0.32), (2, 0.10)):
                sig += amp * np.sin(2 * np.pi * f * det * (i + 1) * t + i * 1.3)
            g = 0.055
            i0 = int(t0 * SR)
            nn = min(n, N - i0)
            if side == "L":
                mixL[i0:i0 + nn] += sig[:nn] * e[:nn] * g
            else:
                mixR[i0:i0 + nn] += sig[:nn] * e[:nn] * g
    sub = np.sin(2 * np.pi * notes[0] / 2 * t) * e * 0.075
    add(t0, sub, 0.0)

# ---------- arpeggio: D minor (investigasi) lalu F major (penutup) ----------
DM_SCALE = [293.66, 349.23, 392.0, 440.0, 523.25, 587.33]
F_SCALE = [349.23, 440.0, 523.25, 587.33, 698.46, 783.99]
step = 0.26
k = 0
for (lo, hi, scale) in ((10.8, 33.4, DM_SCALE), (34.6, 55.8, DM_SCALE), (57.0, 71.5, F_SCALE)):
    tt = lo
    kk = k
    while tt < hi:
        f = scale[(kk * 2 + (kk % 7)) % len(scale)]
        s = sine(f, 0.26, a=0.004, d=0.14, harm=(1.0, 0.35))
        pan = 0.35 * np.sin(kk * 1.1)
        add(tt, s, pan, 0.05)
        kk += 1
        tt += step
    k = kk

# ---------- kick & hat (berhenti saat ma) ----------
for (lo, hi) in ((10.8, 33.4), (34.6, 55.8)):
    tt = lo
    while tt < hi:
        add(tt, kick(), 0.0)
        add(tt + 0.26, noise_band(0.05, 5000, 9000) * 0.9, 0.15, 0.05)
        tt += 0.52
tt = 56.6
while tt < 77.4:
    add(tt, kick(0.14), 0.0)
    tt += 1.3

# ---------- momen kunci (diselaraskan 22 beat narasi detektif) ----------
CUT_TRANSITIONS = [10.6, 23.6, 41.4, 61.4]
add(0.5, boom(0.24))                       # kasus dibuka: kios malam
add(0.5, whoosh(0.5, True, 0.05))
for i in range(3):                         # tiga stoples kosong muncul
    add(1.0 + i * 0.12, tick(560 + i * 40, 0.06))
for j in range(12):                        # 12 permen terbang dari etalase
    add(1.3 + (j // 4) * 0.12 + (j % 4) * 0.16, tick(760 + (j % 4) * 70, 0.05))
for i in range(12):                        # antrean 12 permen percobaan pencuri
    add(3.4 + i * 0.05, tick(620 + i * 26, 0.04))
add(4.0, tick(880, 0.06))                  # permen sisa muncul sendirian
add(4.2, whoosh(0.4, True, 0.05))          # hop: ditolak
add(4.8, tick(760, 0.06))                  # tanda tanya
add(4.9, chime(880.0, 0.10))               # LINGKARAN BUKTI merah
add(5.2, boom(0.12))                       # beat emas: sisa menyala
add(5.25, chime(440.0, 0.11))
add(7.0, chime(523.25, 0.10))              # stempel BUKTI 01: SISA SATU!
add(7.6, whoosh(0.6, False, 0.06))         # siluet Pencuri Rapi mengintip
add(7.62, tick(300, 0.05))
add(7.9, tick(1100, 0.06))
for tw in CUT_TRANSITIONS:                 # perpindahan babak
    add(tw, whoosh(0.85, True, 0.12), 0.0)
add(33.6, whoosh(0.5, False, 0.08))        # dunia memudar ke ma (hening)
add(11.8, tick(820, 0.07))                 # baris besar: habis dibagi nol sisa
add(12.6, tick(900, 0.085))                # baris: 12 dibagi 3 pas
add(12.62, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(13.2, tick(860, 0.06))                 # baris: faktor 12 ada enam
for i in range(6):                         # enam chip faktor 12
    add(14.4 + i * 0.14, tick(560 + i * 46, 0.05))
add(17.8, tick(760, 0.05))                 # cek gagal: 12 dibagi 5 sisa 2
add(19.6, chime(523.25, 0.11))             # DEDUKSI: 13 dibagi 3 sisa 1 ditinggal
add(24.8, tick(880, 0.075))                # baris besar: 4 x 1, 2, 3, ...
add(25.6, tick(900, 0.085))                # baris: serangan 4, 8, 12, 16, 20
add(25.62, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(26.2, tick(860, 0.06))                 # baris: 12 masuk karena 4 x 3
for rd in range(5):                        # lima ronde permen jatuh +4 (rekonstruksi)
    add(27.2 + rd * 1.0, whoosh(0.3, True, 0.035))
    for j in range(4):
        add(27.2 + rd * 1.0 + j * 0.12, tick(700 + rd * 60 + j * 40, 0.05))
    add(27.2 + rd * 1.0, tick(980, 0.05))  # chip kelipatan + lingkaran merah
add(31.0, tick(760, 0.05))                 # catatan: kelipatan 4 terus terusan
add(32.0, chime(523.25, 0.11))             # catatan: 4 faktor 12, 12 kelipatan 4
add(32.2, tick(560, 0.05))                 # chip ellipsis
# tremolo pra-climax ala anime menuju ma
for t0 in (31.8, 32.18, 32.54, 32.9, 33.2, 33.48):
    add(t0, tick(1100, 0.06))
add(34.4, boom(0.30))                      # DEDUKSI: impact frame + speedlines
add(34.45, chime(440.0, 0.13))
add(34.4, whoosh(0.4, True, 0.05))
add(35.4, tick(680, 0.075))                # baris besar: terbatas vs tanpa batas
add(36.3, tick(900, 0.075))                # baris: faktor 6 cuma empat
add(37.8, chime(523.25, 0.11))             # baris: kelipatan 6 terus
add(39.2, tick(760, 0.05))                 # catatan: faktor berhenti kelipatan terus
add(42.6, tick(880, 0.06))                 # baris besar: berikutnya 24 permen
add(43.6, tick(900, 0.085))                # baris: 24 kelipatan 4 prediksi pas
add(43.62, noise_band(0.10, 1200, 3800) * 0.6, 0.0, 0.05)
add(43.8, tick(1000, 0.075))               # garis bukti merah di bawah 24
add(45.0, tick(860, 0.085))                # baris: 2 dapat 12, 3 dapat 8
add(46.2, tick(920, 0.085))                # baris: 4 dapat 6, 6 dapat 4
# susunan piring: 2, 3, 4, 6 pos penjagaan
for k, tt2 in enumerate((44.2, 45.2, 46.2, 47.2)):
    add(tt2, whoosh(0.35, True, 0.04))
    add(tt2, tick(640 + k * 90, 0.055))
add(46.4, whoosh(0.5, True, 0.07))         # stempel JURUS BAGI RATA!
add(46.45, chime(698.46, 0.11))
# power-up ala anime: run tangga F major menaik saat menyusun jebakan (45.6-46.5)
RUN = [349.23, 392.0, 440.0, 466.16, 523.25, 587.33, 659.26, 698.46]
for i, f in enumerate(RUN):
    add(45.6 + i * 0.12, sine(f, 0.22, a=0.003, d=0.12) * 0.07, 0.1 * np.sin(i))
add(49.0, tick(760, 0.045))                # catatan: sisa nol pos siap
add(49.8, tick(820, 0.045))                # catatan: faktor 24 ada delapan
for t0 in (52.2, 53.4, 54.6, 55.8):        # malam menunggu: tick jam low
    add(t0, tick(300, 0.05))
add(56.4, boom(0.32))                      # PENANGKAPAN: flash + boom
add(56.6, tick(500, 0.06))                 # siluet muncul di tengah
add(57.0, chime(698.46, 0.11))             # stempel KASUS DITUTUP!
add(57.2, whoosh(0.4, True, 0.05))         # tanda silang merah
add(57.22, tick(700, 0.07))
for f, dt in ((349.23, 0.0), (440.0, 0.25), (523.25, 0.5), (698.46, 0.75)):
    add(56.9 + dt, chime(f, 0.09))         # fanfare F-A-C-F penangkapan
add(57.6, tick(1100, 0.06))                # mentor berputar bangga
add(62.4, tick(880, 0.07))                 # header berkas kasus baru
for i in range(4):                         # empat soal bernomor muncul
    add(62.6 + i * 0.18, tick(640 + i * 80, 0.05))
add(64.4, kick(0.26))                      # formasi kasus baru dimulai
for i in range(8):                         # delapan kartu bukti masuk berselang
    add(64.6 + i * 0.12, tick(580 + i * 70, 0.05))
add(66.2, tick(760, 0.045))                # catatan: kartu bantu kasus nomor satu
add(67.8, whoosh(0.6, True, 0.07))
add(67.85, chime(880.0, 0.12))             # pil JAWAB DI KOLOM KOMENTAR YA
add(71.6, whoosh(0.6, False, 0.06))        # konten keluar layar (aturan 28)
add(71.8, whoosh(0.5, True, 0.03))
for f, dt in ((349.23, 0.0), (440.0, 0.25), (523.25, 0.5), (698.46, 0.75)):
    add(71.9 + dt, chime(f, 0.09))         # fanfare endcard
add(72.5, chime(440.0, 0.08))              # terima kasih sudah menonton
add(78.0, chime(523.25, 0.08))             # teaser: kisah angka berikutnya
add(77.4, tick(700, 0.045))                # bar gradien menyapu
add(77.5, chime(1046.5, 0.06))

# ---------- master ----------
mix = np.stack([mixL, mixR])
mix = np.tanh(mix * 1.25) / 1.25
peak = np.max(np.abs(mix))
mix = mix / peak * 0.86
fi = int(0.25 * SR)
mix[:, :fi] *= np.linspace(0, 1, fi)
fo = int(1.0 * SR)
mix[:, -fo:] *= np.linspace(1, 0, fo) ** 1.4

data = (mix.T * 32767).astype(np.int16)
with wave.open(OUT, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(data.tobytes())
print(f"audio OK: {OUT} ({DUR}s, peak {peak:.2f})")
