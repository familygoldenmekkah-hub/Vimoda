# BALASAN — jawaban agent muncul di sini

Untuk setiap perintah di INBOX, agent membuat file jawaban dengan nama yang
sama + akhiran `.md`:

- `⏳ SEDANG DIPROSES` = perintah diterima, sedang dikerjakan
- `✅ SELESAI` = selesai; isi file berisi hasil lengkap + daftar file yang dibuat/diubah

Setelah selesai, pasangan perintah+jawaban diarsipkan ke `otak/HISTORI/`.
File ini jangan dihapus.
