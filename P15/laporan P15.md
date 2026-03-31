# Laporan Praktikum 15: Implementasi Login Database & Multi-Role
**Mata Kuliah:** Pemrograman Framework
**Mahasiswa:** Fahri Zanuar Pradian
**Topik:** Sistem Autentikasi Login Terintegrasi Database

### Bagian 1 dan 2 - Custom Login Page & Handle Login di Frontend
Mengubah konfigurasi NextAuth dengan menambahkan properti pages agar aplikasi menggunakan antarmuka login yang didesain sendiri. Kemudian, layout halaman register diduplikasi untuk membuat halaman login kustom yang mengimplementasikan fungsi signIn untuk mengeksekusi autentikasi.
![Custom Login Page](assets/1%20–%20Custom%20Login%20Page.gif)

### Bagian 3 - Authorize di NextAuth (Database Login)
Menambahkan fungsi signIn ke layanan Firebase untuk mencari data pengguna spesifik berdasarkan email, lalu memverifikasi kecocokan password dari form dengan versi hash di database menggunakan bcrypt.compare.

### Bagian 4 - Tambahkan Role ke Token
Memasukkan callback jwt dan session ke dalam konfigurasi NextAuth untuk mendistribusikan properti kustom (seperti role dan fullname) ke dalam session token JWT, sehingga level otorisasi pengguna dapat diakses di sisi klien.

### Bagian 5 - Callback URL Logic
Memodifikasi middleware untuk menyisipkan variabel callbackUrl saat melakukan redirect. Hal ini membuat aplikasi dapat mengingat asal URL pengguna dan mengembalikannya ke rute tersebut setelah berhasil login.

### Bagian 6 - Membuat halaman Admin dan authorize
Membuat antarmuka halaman admin dasar dan mengekstensi logika middleware untuk mencocokkan kepemilikan token role. Jika token role bukan admin, pengguna akan langsung dikembalikan ke halaman utama.
![Halaman Admin](assets/6%20–%20Membuat%20halaman%20Admin%20dan%20authoriz%20.png)

---

### E. Hasil Tugas Praktikum dan Pengujian

**Tugas 1: Implementasikan login database**
Berhasil mengganti login statis menjadi integrasi penuh terhadap Firebase Firestore dan NextAuth. Pengujian menunjukkan sistem berhasil memvalidasi kredensial yang benar dan menolak kredensial yang salah.
* **Uji 1 - Login Valid:** Pengguna berhasil masuk dan diarahkan sesuai target.
![Uji Login Valid](assets/Uji%201%20–%20Login%20Valid.gif)
* **Uji 2 - Password Salah:** Sistem berhasil mendeteksi ketidakcocokan password dan menampilkan pesan error.
![Uji Password Salah](assets/Uji%202%20–%20Password%20Salah.gif)

**Tugas 2: Tambahkan role pada user**
Role user berhasil diterapkan dan didistribusikan secara global ke seluruh aplikasi menggunakan mekanisme JWT Token dan NextAuth Session.

**Tugas 3: Buat halaman /profile dan /admin**
Halaman profil berhasil dibuat menggunakan state management dari session NextAuth untuk menampilkan data nama, email, dan role pengguna secara dinamis berdasarkan akun yang sedang aktif.
![Halaman Profile](assets/Tugas%203%20halaman%20profile.png)

**Tugas 4: Proteksi /admin hanya untuk admin**
Role-Based Access Control (RBAC) sukses diterapkan. Middleware dengan tegas memblokir hak akses rute admin jika yang mencoba masuk adalah pengguna biasa.
* **Uji 3 - Akses Admin sebagai User:** Pengguna dengan role user biasa otomatis dicegat dan dikembalikan ke halaman login/home.
![Akses User ke Admin](assets/Uji%203%20–%20Akses%20Admin%20sebagai%20User.gif)
* **Uji 4 - Akses Admin sebagai Admin:** Pengguna dengan role admin diberikan akses penuh untuk merender halaman.
![Akses Admin ke Admin](assets/Uji%204%20–%20Akses%20Admin%20sebagai%20Admin%20.gif)

**Tugas 5: Implementasikan callback URL**
Sistem sukses menangkap path target melalui query URL di middleware seperti yang ditampilkan pada uji 1. Setelah proses login berhasil, pengguna mulus diarahkan kembali ke rute yang sebelumnya mereka tuju tanpa perlu navigasi manual ulang.

---

### F. Pertanyaan Evaluasi

**1. Mengapa password harus diverifikasi dengan bcrypt.compare?**
Password pengguna disimpan di database dalam wujud hash terenkripsi searah untuk mencegah kebocoran data. bcrypt.compare digunakan untuk membandingkan password yang diinputkan pengguna di form dengan password hash di database secara aman tanpa perlu mengubah hash kembali menjadi teks asli.

**2. Mengapa role disimpan di token?**
Karena aplikasi menggunakan strategi JWT. Menyimpan properti role di dalam token membuat informasi otorisasi tersebut melekat di sisi klien. Hal ini mencegah aplikasi melakukan query berulang kali ke database hanya untuk mengecek status role setiap kali rute berpindah, sehingga performa menjadi lebih optimal.

**3. Apa fungsi callbackUrl?**
Fungsinya adalah untuk meningkatkan kenyamanan navigasi web (UX). Jika pengguna yang belum login mencoba mengakses rute terproteksi, sistem akan menyisipkan URL tujuan awal tersebut ke dalam callbackUrl. Setelah login divalidasi, pengguna akan otomatis dikembalikan ke halaman tujuan awal tersebut, bukan ke halaman beranda default.

**4. Mengapa middleware penting untuk security?**
Middleware Next.js mengeksekusi route interception di tingkat Edge, yakni sebelum halaman dieksekusi oleh server atau dirender oleh klien. Ini memberikan lapisan proteksi rute terpusat yang memblokir akses tidak sah dari lini paling depan, memastikan data sensitif tidak terekspos.

**5. Apa risiko jika role tidak dicek di middleware?**
Sistem akan rentan terhadap celah Privilege Escalation (peningkatan hak istimewa). Jika pengecekan role hanya dilakukan di front-end (misalnya sekadar menyembunyikan tombol UI), pengguna awam bisa saja menebak atau memaksa masuk ke rute spesifik dengan mengetikkan URL langsung di browser dan mengakses data yang seharusnya dilarang.

---

### G. Kesimpulan

1. Autentikasi yang siap untuk environment produksi wajib menggunakan enkripsi hash untuk password dan proses validasi mutlak di sisi server, bukan membandingkan teks mentah di sisi klien.
2. Pengelolaan Role-Based Access Control (RBAC) terbukti paling efisien bila dijalankan menggunakan properti yang disematkan dalam payload JWT Token, meminimalisir beban request ke database.
3. Keamanan rute pada aplikasi Next.js sangat bergantung pada penempatan Middleware sebagai lapisan pelindung pertama yang mencegat pergerakan pengguna tanpa izin.
4. Implementasi logika callback URL menjadi bukti bahwa keamanan sistem yang ketat tetap bisa diseimbangkan dengan User Experience yang luwes dan dinamis.