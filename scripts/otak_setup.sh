#!/usr/bin/env bash
# otak_setup.sh — aktivasi satu langkah koneksi GitHub.
# Pemakaian: bash scripts/otak_setup.sh <URL-repo> <token>
# Contoh:    bash scripts/otak_setup.sh https://github.com/user/vimoda.git ghp_xxx
#
# Token hanya disimpan di .git/config (URL remote); tidak pernah dicetak.
set -eu

URL="$1"; TOKEN="$2"
[ -n "$URL" ] && [ -n "$TOKEN" ] || { echo "pakai: otak_setup.sh <URL-repo> <token>"; exit 1; }
echo "$URL" | grep -q '^https://github.com/' || { echo "URL harus https://github.com/..."; exit 1; }
echo "$URL" | grep -q '@' && { echo "URL tidak boleh sudah memuat token"; exit 1; }

cd /home/z/my-project
# 1) pasang remote dengan token tersemat (tak dicetak ke layar)
git remote remove origin 2>/dev/null || true
git remote add origin "https://x-access-token:${TOKEN}@${URL#https://}"

# 2) jaga rahasia: .env tidak ikut ke GitHub (file tetap ada di sandbox)
git rm --cached --quiet .env 2>/dev/null || true
grep -qx '.env' .gitignore 2>/dev/null || echo '.env' >> .gitignore

# 3) push seluruh ruang kerja (otak/ + scripts/ + download/ + proyek)
git add -A
git commit --quiet -m "otak: sinkronisasi penuh ruang kerja ke GitHub" 2>/dev/null || true
git push -u origin HEAD:main 2>&1 | grep -v 'x-access-token' || { echo "push GAGAL - periksa token/URL (remote tetap dipasang)"; exit 1; }

# 4) verifikasi
timeout 20 git ls-remote --heads origin 2>/dev/null | grep -q 'refs/heads/main' \
  && echo "AKTIF: repo terhubung, branch main ter-push. Kanal perintah hidup di otak/INBOX/." \
  || { echo "push sukses tapi verifikasi lambat - cek nanti: git ls-remote --heads origin"; }
