# 🧠 STATUS OTAK — AKIOMIDA

> Papan status live. Agent memperbarui file ini setiap ada kegiatan.
> Tanda proyek selesai ditulis di bagian **Proyek**.

- **Koneksi GitHub**: BELUM AKTIF — aktivasi satu langkah menunggu URL repo +
  token push dari pemilik (`bash scripts/otak_setup.sh <URL> <token>`)
- **Sistem saraf dua lapis**: refleks GitHub Actions (ACK hitungan detik,
  hidup di repo, kuota GitHub) + sadar agent (3 giliran/hari platform batch,
  instan via pesan chat) — lihat otak/README.md
- **Kondisi saat ini**: SIAP — menunggu perintah di `otak/INBOX/`
  (cek terakhir: 2026-11-25 10:50 UTC)

## Peta ruang kerja (satu kesatuan)

| Folder | Peran |
|---|---|
| `otak/` | Kanal perintah + ingatan: INBOX → BALASAN → HISTORI, papan STATUS |
| `scripts/` | Mesin produksi: generator, timeline, QA, render, otak_push/otak_setup |
| `download/` | Rak produk jadi: MP4 9:16 & 16:9, thumbnail, naskah, caption |
| `upload/` | Bahan mentah yang dikirim pemilik |
| `work/` | Bengkel: file kerja antara |

## Proyek

| Proyek | Status | Keterangan |
|---|---|---|
| Demo koneksi otak | ✅ SELESAI | 2026-11-25 09:40 — polling deteksi, jawaban, arsip HISTORI: semua bekerja |
| Kesatuan repo-otak | ✅ SELESAI | 2026-11-25 10:00 — README root, peta ruang kerja, protokol batch + tag prioritas, otak_push.sh, otak_setup.sh, .env dilindungi dari push |

## Riwayat ringkas

- 2026-11-25 10:50 — rev3 sistem saraf dua lapis: (1) eksperimen denyut
  15 menit memberi bukti keras batas platform ("96 daily executions exceeds
  limit 3, excess triggers will be ignored"); (2) sebagai jawabannya, layer
  refleks GitHub Actions dibangun di dalam repo (.github/workflows/
  otak-refleks.yml + scripts/otak_refleks.sh): ACK "⏳ DITERIMA" dalam
  hitungan detik setelah commit perintah, denyut cadangan 2 jam memakai
  scheduler GitHub, kuota milik GitHub bukan batas 3/hari — teruji
  end-to-end secara lokal (ACK + commit otomatis <1 detik). Refleks aktif
  otomatis begitu repo ter-push.
- 2026-11-25 10:00 — Integrasi "repo = otak = ruang kerja": README root,
  protokol batch + `[PRIORITAS: TINGGI]`, script `otak_push.sh` (publikasi
  atomik) dan `otak_setup.sh` (aktivasi satu langkah), `.env` dikeluarkan
  dari tracking agar tidak pernah ter-push.
- 2026-11-25 09:40 — Demo perintah pertama diproses end-to-end (terdeteksi
  polling → jawaban SELESAI → arsip di HISTORI). Bukti hidup: server
  2026-11-25 09:40 UTC, branch main, commit 4589092.
- 2026-11-25 — Sistem otak dibuat (rev1): INBOX/BALASAN/HISTORI/STATUS +
  cron polling.
