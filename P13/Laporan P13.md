# Laporan Praktikum 13: Sistem Autentikasi & Proteksi Route
**Mata Kuliah:** Pemrograman Framework  
**Mahasiswa:** Fahri Zanuar Pradian  
**Topik:** Implementasi Login dengan NextAuth  

## A. Langkah Praktikum

**Bagian 1: Install NextAuth**
Melakukan instalasi library `next-auth` melalui terminal untuk mempermudah pengelolaan sistem autentikasi di Next.js secara instan tanpa harus membangun *auth server* dari nol.

![Install NextAuth](assets/1%20–%20Install%20NextAuth.png)

**Bagian 2: Konfigurasi API Auth**
Membuat rute API dinamis `[...nextauth].ts` yang berisi konfigurasi autentikasi dasar. Di sini, `CredentialsProvider` digunakan dengan data statis untuk menguji fungsionalitas *login* menggunakan email dan password.

**Bagian 3: Tambahkan Secret**
Membuat file `.env.local` dan menambahkan variabel `NEXTAUTH_SECRET` yang berisi string acak. Variabel ini berfungsi sebagai kunci keamanan kriptografi untuk mengenkripsi dan mendekripsi token JWT.

**Bagian 4: Tambahkan Session Provider**
Memodifikasi file `_app.tsx` dengan membungkus seluruh komponen aplikasi menggunakan `<SessionProvider>`. Hal ini bertujuan agar status otentikasi (session) dapat diakses secara global di semua halaman *frontend*.

**Bagian 5: Tambahkan Tombol Login & Logout**
Membuat komponen Navbar dan *styling* CSS, kemudian memanfaatkan *hook* `useSession` dari NextAuth. Jika terdeteksi adanya *session* yang aktif, tombol akan berubah menjadi "Sign Out". Sebaliknya, jika belum login, akan muncul tombol "Sign In".

menambahkan tombol login dan logout
![Tampilan Awal](assets/5%20–%20Tambahkan%20Tombol%20Login%20&%20Logout%20-%20session%20saat%20mengisi%20form%20login.png)

setelah klik sign in
![Form Sign In](assets/5%20–%20Tambahkan%20Tombol%20Login%20&%20Logout-tampilan%20setelah%20klik%20signin.png)

session saat login tanpa isi form
![Session Berhasil](assets/5%20–%20Tambahkan%20Tombol%20Login%20&%20Logout-session%20saat%20login.png)  

session saat login dengan isi form
![Session Form](assets/5%20–%20Tambahkan%20Tombol%20Login%20&%20Logout%20-%20session%20saat%20mengisi%20form%20login.png)

saat sudah klik sign out
![Tombol Sign Out](assets/5%20–%20Tambahkan%20Tombol%20Login%20&%20Logout%20-tombol%20signout.png)

**Bagian D: Menambahkan Data Tambahan (Full Name)**
Mengubah *callbacks* `jwt` dan `session` pada konfigurasi NextAuth untuk menyisipkan parameter `fullname` ke dalam *cookies*. Kemudian, Navbar diperbarui agar dapat menyapa user menggunakan nama lengkapnya.
![Full Name](assets/D.%20Menambahkan%20Data%20Tambahan%20(Full%20Name).png)

**Bagian E: Proteksi Halaman Profile**
Membuat halaman statis `/profile` yang menampilkan identitas *user* aktif. Selanjutnya, mengimplementasikan *middleware* dengan fungsi *wrapper* `withAuth.ts` pada file `middleware.ts` untuk memblokir akses ke rute `/profile` bagi *user* yang belum melakukan *login*.
![Halaman Profile](assets/E.%20Proteksi-Buat%20Halaman%20Profile%20.png)

## E. Hasil Tugas Praktikum

**Tugas 1: Implementasikan login menggunakan Credentials Provider.**

Sudah berhasil diimplementasikan di dalam rute `[...nextauth].ts` dengan mendaftarkan skema input email dan password pada `CredentialsProvider`.

**Tugas 2: Tambahkan field full name.**

Penambahan input "Full Name" telah dilakukan pada skema `credentials` NextAuth, dan datanya berhasil diikat ke dalam variabel objek *user* saat verifikasi login.

**Tugas 3: Tampilkan full name setelah login.**

Data `fullname` sukses diteruskan ke *callback* *session*, lalu ditangkap melalui fungsi `useSession()` dan dirender pada antarmuka Navbar dengan format `Welcome, Fahri Zanuar Pradian`.
![Full Name](assets/D.%20Menambahkan%20Data%20Tambahan%20(Full%20Name).png)

**Tugas 4: Buat halaman profile.**

File `src/pages/profile/index.tsx` berhasil dibuat, merender komponen yang menyapa nama lengkap pengguna berdasarkan *session* yang aktif.
![Halaman Profile](assets/E.%20Proteksi-Buat%20Halaman%20Profile%20.png)

**Tugas 5: Lindungi halaman profile dengan middleware.**

Proteksi berhasil diuji coba. Middleware mencegat *request* ke URL `/profile`, mengecek eksistensi *cookie token* lewat `getToken`, dan me-*redirect* paksa ke halaman *root* (`/`) bila *token* tersebut kosong (user belum login).

**Tugas 6: Dokumentasikan**

*GIF Login:*
![GIF Login](assets/Uji%202%20–%20Sudah%20Login.gif)

*GIF Session:*
![GIF Session](assets/Uji%202%20–%20Sudah%20Login.gif)

*GIF Redirect Middleware:*
![GIF Redirect Middleware](assets/Uji%203%20–%20Logout.gif)

## F. Pertanyaan Evaluasi

**1. Mengapa session menggunakan JWT?**
Penggunaan JWT (JSON Web Token) bersifat *stateless*. Data sesi *user* disimpan di sisi *client* dalam bentuk *cookies* terenkripsi, sehingga *server* tidak perlu selalu melakukan kueri ke *database* untuk memvalidasi *user*. Hal ini membuat performa aplikasi lebih cepat dan sangat mudah untuk diskalakan.

**2. Apa perbedaan authorize() dan callback jwt()?**
Fungsi `authorize()` bertanggung jawab untuk *autentikasi*: memverifikasi *credentials* (email/password) dan mengembalikan objek data *user* jika valid. Sedangkan *callback* `jwt()` bertugas mengelola token: ia menerima objek *user* dari `authorize()` dan memproses data apa saja yang akan disimpan secara persisten di dalam *payload* JWT token tersebut.

**3. Mengapa middleware perlu getToken()?**
Middleware berjalan di *Edge runtime* (sebelum *request* merender halaman Next.js). Ia membutuhkan fungsi `getToken()` untuk membaca dan mendekripsi *cookie* JWT dari *request header* demi memverifikasi apakah pengguna memiliki izin (otorisasi) untuk membuka rute yang diproteksi.

**4. Apa risiko jika NEXTAUTH_SECRET tidak digunakan?**
`NEXTAUTH_SECRET` adalah kunci kriptografi untuk proses *hashing* dan enkripsi token JWT. Tanpa *secret* ini, NextAuth tidak memiliki keamanan untuk menandatangani token. Akibatnya, token JWT rentan dipalsukan atau dimanipulasi oleh pihak luar, yang bisa menyebabkan kebocoran akses akun (*security breach*).

**5. Apa perbedaan autentikasi dan otorisasi dalam sistem ini?**
* Autentikasi adalah proses membuktikan identitas (contoh: memasukkan email & password di *form login* yang diverifikasi oleh `CredentialsProvider`). 
* Otorisasi adalah proses mengatur hak akses berdasarkan identitas yang sudah terbukti tersebut (contoh: Middleware yang menentukan apakah *user* diizinkan merender halaman `/profile` atau ditolak berdasarkan ketersediaan token mereka).

## G. Kesimpulan

1. **NextAuth.js** mempermudah manajemen *state* autentikasi di ekosistem Next.js karena menangani pembuatan JWT, koneksi *provider*, serta tata kelola *cookies* secara efisien di belakang layar.
2. Penggunaan **JWT session** sangat menguntungkan untuk arsitektur aplikasi modern karena bersifat *stateless*, menghemat *resource* *server* dari kueri *database* berulang pada setiap transisi halaman.
3. Fitur **Middleware** pada Next.js bertindak sebagai pelindung rute yang tangguh, mengeksekusi logika *otorisasi* secara instan di level *edge* sebelum halaman benar-benar dimuat.
4. Pengamanan variabel lingkungan seperti `NEXTAUTH_SECRET` adalah fondasi mutlak dalam metode *token-based authentication* agar integritas sesi tidak dapat dimanipulasi oleh pihak eksternal.