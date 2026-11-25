#!/usr/bin/env bash
# Polling kotak perintah otak — dijalankan agent saat cron trigger (tiap 20 menit).
# Output dibaca agent: baris "BARU: <file>" = perintah yang harus dieksekusi
# mengikuti protokol di /home/z/my-project/otak/README.md
cd /home/z/my-project || exit 1

REMOTE=$(git remote get-url origin 2>/dev/null)
if [ -n "$REMOTE" ]; then
  echo "== remote: terpasang, git pull =="
  git pull --ff-only 2>&1 | tail -2
else
  echo "== remote: BELUM terpasang (mode lokal; pasang dulu URL repo+token) =="
fi

echo "== perintah baru di otak/INBOX =="
NEW=0
shopt -s nullglob
for f in otak/INBOX/*.txt otak/INBOX/*.md; do
  base=$(basename "$f")
  [ "$base" = "README.md" ] && continue
  # sudah diarsipkan di HISTORI? -> bukan baru (compgen aman dari nullglob)
  compgen -G "otak/HISTORI/*$base" >/dev/null && continue
  # jawaban SELESAI sudah ada? -> bukan baru
  grep -q "SELESAI" "otak/BALASAN/$base.md" 2>/dev/null && continue
  echo "BARU: $f"
  NEW=1
done
[ "$NEW" = "0" ] && echo "(tidak ada perintah baru)"
echo "== akhir polling =="
