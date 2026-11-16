#!/usr/bin/env python3
"""Tambah baris katalog episode 10 ke README produksi."""
import pathlib

R = pathlib.Path("/home/z/my-project/scripts/vimoda07/package/README.md")
r = R.read_text()

anchor = "## Isi tiap folder video"
row = """| 10 | Juanila: Mengenal Bilangan Rasional | Blog Yuyanaka - artikel "Juanila" (16 Nov 2026) | `10-juanila-rasional/` (aturan 1-28 sejak rendering pertama: dunia baru Dapoer Posya - studio dapur roti bulat dengan dinding ubin mint bernat, lantai kotak-kotak terrakota-krim, plafon balok kayu berpanci tembaga, jam dinding berlambang pi, meja kayu berkue bulat yang benar-benar dibagi dua ke piring lalu dibagi empat dengan tiga bagian menyala; materi: definisi a/b dengan syarat a dan b bilangan bulat dan b bukan nol, contoh 1/2 3/4 2/3 5/2 -3/4, twist bilangan bulat juga rasional lewat 7 = 7/1 dst, pembilang dan penyebut pada 3/4 dengan potongan sama besar, konversi desimal 0,5 0,25 0,75 0,3333... di papan menu kapur dengan pill berhenti vs berulang, pi bukan rasional karena tanpa pola, uji lima kartu 8 2/3 -5 0,25 0,7777... dibalik satu per satu; jawaban uji tidak dibocorkan, dijemput lewat pil PERIKSA DI KOMEN; bbox diaudit terprogram; penutup bersih aturan 28: konten keluar 49.8, AKIOMIDA.COM sendirian 50.2, bar 50.9-51.4) |

"""
assert r.count(anchor) == 1
r = r.replace(anchor, row + anchor)
R.write_text(r)
print("README baris 10 ok")
