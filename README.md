# Happy Birthday Sayanggg — From Humayaa

Project website ucapan ulang tahun interaktif, responsif untuk HP dan laptop.

## Struktur folder

```text
happy_birthday_sayang_vscode/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── birthday-song.mp3
└── README.md
```

## Menjalankan di Visual Studio Code

1. Ekstrak folder ZIP ini.
2. Buka folder `happy_birthday_sayang_vscode` di VS Code.
3. Pasang extension **Live Server** (Ritwick Dey), jika belum ada.
4. Klik kanan `index.html` → **Open with Live Server**.
5. Website terbuka di browser. Untuk tes dari HP, laptop dan HP harus berada di jaringan Wi-Fi yang sama; buka alamat jaringan yang ditampilkan Live Server.

Bisa juga menjalankan server lokal tanpa extension, dari terminal di folder project:

```bash
python -m http.server 5500
```

Lalu buka `http://localhost:5500`.

## Pengaturan penting

- PIN berada di `js/script.js`, cari `SECRET_PIN`.
- Ucapan ulang tahun dan surat berada di `index.html`.
- Warna, font, ukuran, dan animasi berada di `css/style.css`.
- File musik berada di `assets/birthday-song.mp3`. Jangan ubah nama atau lokasi file kecuali path audio di `index.html` juga diperbarui.
- Foto yang dipilih pada galeri saat ini dimuat dari perangkat pengunjung ketika website dibuka. Foto tidak otomatis tertanam permanen ke website.

## Deploy gratis

### Netlify Drop (cara paling cepat)
1. Buka https://app.netlify.com/drop
2. Login atau daftar akun Netlify.
3. Drag-and-drop folder project yang sudah diekstrak (atau ZIP hasil ekstrak) ke halaman Netlify Drop.
4. Netlify akan membuat URL publik untuk website.

### GitHub Pages
1. Buat repository GitHub baru dan upload seluruh isi folder project.
2. Buka **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder `/ (root)`, lalu **Save**.
5. Tunggu proses publikasi selesai; URL akan muncul di halaman Pages.

## Catatan audio autoplay

Browser HP/laptop sering memblokir audio bersuara yang diputar otomatis sebelum ada interaksi pengguna. Project sudah mencoba autoplay, lalu mencoba lagi saat pengguna menyentuh/menekan halaman. Jika browser tetap memblokirnya, tekan tombol musik.

## Catatan keamanan

PIN di website statis ini adalah PIN tampilan/kejutan, bukan sistem keamanan. Siapa pun yang memeriksa source website dapat menemukan PIN.


## Penyimpanan foto galeri (versi auto-save)

Galeri menggunakan IndexedDB. Foto yang dipilih akan tersimpan otomatis di browser dan tetap ada setelah halaman di-refresh atau browser ditutup, selama pengguna membuka website dari browser/perangkat dan alamat website (origin) yang sama.

**Penting:** Foto yang diunggah saat menjalankan `localhost` tidak otomatis pindah ke website yang sudah di-deploy karena penyimpanan browser terikat pada alamat website. Foto juga tidak otomatis dibagikan ke perangkat pengunjung lain.

Jika semua pengunjung harus melihat foto yang sama, letakkan foto pilihan di folder `assets/` lalu jadikan foto bawaan website, atau gunakan penyimpanan online seperti Firebase Storage/Supabase Storage.


## Galeri 10 foto bawaan (V7)

Folder `assets/` sekarang berisi `memory-01.jpg` sampai `memory-10.jpg` sebagai foto placeholder sementara. Foto ini ikut ter-deploy bersama website, sehingga semua pengunjung melihat galeri awal yang sama.

Untuk mengganti foto placeholder dengan foto kalian:
1. Siapkan 10 foto pilihan.
2. Salin ke folder `assets/`.
3. Beri nama persis `memory-01.jpg`, `memory-02.jpg`, ... `memory-10.jpg` (atau ubah nama file pada atribut `src` di `index.html`).
4. Simpan, lalu deploy ulang seluruh folder project.

Pengunjung tetap bisa memilih "Ganti foto" di galeri. Foto pengganti disimpan lokal di browser masing-masing dengan IndexedDB; foto tersebut tidak mengubah file website dan tidak otomatis dibagikan ke pengunjung lain.
