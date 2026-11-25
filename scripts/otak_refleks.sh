#!/usr/bin/env bash
# otak_refleks.sh — otak refleks: ACK instan untuk perintah baru di otak/INBOX/.
# Dipanggil GitHub Actions (push trigger / denyut 2 jam / manual), dan aman
# juga dijalankan lokal. Idempoten: file yang sudah dibalas tidak disentuh.
# Layer sadar (agent) yang kemudian mengeksekusi dan menimpa dengan SELESAI.
cd "$(dirname "$0")/.." || exit 1

CHANGED=0
shopt -s nullglob
for f in otak/INBOX/*.txt otak/INBOX/*.md; do
  base=$(basename "$f")
  [ "$base" = "README.md" ] && continue
  # sudah selesai & diarsipkan? bukan baru
  compgen -G "otak/HISTORI/*$base" >/dev/null && continue
  b="otak/BALASAN/${base%.*}.md"
  # sudah dibalas SELESAI? bukan baru
  grep -q "SELESAI" "$b" 2>/dev/null && continue
  # sudah di-ACK refleks? tidak perlu dobel
  [ -f "$b" ] && continue

  {
    echo "# ⏳ DITERIMA (refleks otomatis GitHub) — ${base}"
    echo
    echo "- **Waktu refleks**: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
    echo "- **Status**: SEDANG DIPROSES — masuk antrian eksekusi layer sadar"
    echo "- **Perintah**: \`${base}\`"
    echo
    echo "Perintah ini terdeteksi otomatis beberapa detik setelah commit"
    echo "(GitHub Actions: otak-refleks). Layer sadar (agent) akan menimpa"
    echo "file ini dengan hasil eksekusi lengkap + status ✅ SELESAI, lalu"
    echo "mengarsipkan pasangan perintah+jawaban ke otak/HISTORI/."
  } > "$b"
  echo "refleks: ACK -> $b"
  CHANGED=1
done

if [ "$CHANGED" = "1" ]; then
  git config user.name  "${OTAK_ACTOR:-otak-refleks[bot]}"
  git config user.email "refleks@otak.local"
  git add otak/BALASAN
  git commit --quiet -m "refleks: perintah baru diterima otomatis (ACK instan)" || exit 0
  if git push --quiet origin HEAD 2>/dev/null; then
    echo "refleks: ACK ter-push"
  else
    echo "refleks: push gagal (ACK tetap tersimpan di commit lokal)"
  fi
else
  echo "refleks: tidak ada perintah baru"
fi
