#!/usr/bin/env bash
# otak_push.sh — publikasi atomik: commit semua perubahan + push ke GitHub.
# Pemakaian: bash scripts/otak_push.sh "pesan commit"
# Aman dipanggil kapan pun: tanpa remote hanya commit lokal.
cd /home/z/my-project || exit 1
MSG="${1:-update otak}"

if [ -z "$(git status --porcelain 2>/dev/null)" ]; then
  echo "push: tidak ada perubahan"
else
  git add -A
  git commit --quiet -m "$MSG" && echo "commit: $MSG"
fi

if git remote get-url origin >/dev/null 2>&1; then
  git pull --rebase --quiet 2>/dev/null || git pull --ff-only --quiet 2>/dev/null || true
  if git push --quiet origin HEAD 2>/dev/null; then
    echo "push: OK -> $(git rev-parse --short HEAD)"
  else
    echo "push: GAGAL (cek token/remote); commit tetap tersimpan lokal"
  fi
else
  echo "push: remote belum dipasang (commit lokal saja)"
fi
