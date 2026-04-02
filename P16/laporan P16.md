# Laporan Praktikum 16: Implementasi Login Google Provider dengan NextAuth.js + Firebase
**Mata Kuliah:** Pemrograman Framework
**Mahasiswa:** Fahri Zanuar Pradian
**Topik:** Implementasi Login Google Provider dengan NextAuth.js + Firebase

### A. Persiapan
Memastikan project Next.js sudah terinstal dependensi NextAuth.js, Firebase, dan memiliki sistem login credential manual yang berfungsi sebagai pijakan awal.

### B. Konfigurasi Google OAuth
Mendaftarkan aplikasi di Google Cloud Console untuk mendapatkan akses OAuth 2.0. Proses ini meliputi pembuatan *OAuth Consent Screen* untuk tipe eksternal dan *Credentials Client ID* tipe aplikasi Web yang akan memberikan akses autentikasi via akun Google.

*Konfigurasi OAuth Consent Screen:*
![OAuth Consent 1](assets/3%20–%20Konfigurasi%20OAuth%20Consent%20Screen%201.png)
![OAuth Consent 2](assets/3%20–%20Konfigurasi%20OAuth%20Consent%20Screen%202.png)
![OAuth Consent 3](assets/3%20–%20Konfigurasi%20OAuth%20Consent%20Screen%203.png)
![OAuth Consent 4](assets/3%20–%20Konfigurasi%20OAuth%20Consent%20Screen%204.png)
![OAuth Consent 5](assets/3%20–%20Konfigurasi%20OAuth%20Consent%20Screen%205.png)

*Pembuatan OAuth Credentials:*
![OAuth Credentials 1](assets/4%20–%20Buat%20OAuth%20Credentials%201.png)
![OAuth Credentials 2](assets/4%20–%20Buat%20OAuth%20Credentials%202.png)

### C. Tambahkan Environment Variables
Menyimpan `GOOGLE_CLIENT_ID` dan `GOOGLE_CLIENT_SECRET` yang didapat dari Google Cloud secara aman ke dalam file `.env` root project, agar tidak bocor pada repository publik.

### D. Konfigurasi Google Provider di NextAuth dan Handle Callback
Memodifikasi konfigurasi `[...nextauth].ts` dengan menambahkan `GoogleProvider`. Di langkah ini juga dilakukan pengaturan callback JWT dan Session untuk menyelaraskan data profil bawaan Google (nama, email, gambar) ke dalam state sesi aplikasi Next.js.

### E. Tambahkan Button Login Google
Menambahkan UI tombol "Sign in with Google" di antarmuka halaman login (`views/auth/login/index.tsx`) yang ketika ditekan akan memicu fungsi `signIn('google')` bawaan NextAuth.

![Tombol Login Google](assets/4%20–%20Buat%20OAuth%20Credentials%20-Buat%20tombol%20login%20google.png)

### F. Menampilkan Image dari Google
Menangkap data `session.user.image` yang berhasil dikembalikan oleh Google dan menampilkannya sebagai elemen avatar pada komponen Navbar untuk menandakan status pengguna aktif.

![Gambar di Navbar](assets/4%20–%20Buat%20OAuth%20Credentials%20-%20gambar%20di%20navbar.png)
![Avatar Tampil](assets/Tes%20avatar%20tampil.png)

### G. Simpan Data Google ke Database
Membuat layanan komunikasi Firebase baru `signInWithGoogle` yang bertugas mendeteksi apakah email Google yang login merupakan pengguna baru atau lama. Pengguna baru akan didaftarkan otomatis ke koleksi `users` di Firestore dengan default role "member", sedangkan pengguna lama hanya akan disinkronkan datanya.

![Simpan Data Database](assets/4-%20Buat%20Oauth%20Credentials%20-%20G.%20Simpan%20Data%20Google%20ke%20Database.png)

### H. Pengujian
Melakukan berbagai skenario pengetesan sistem. Hasil menunjukkan login pertama kali berhasil menambahkan dokumen ke Firestore, login kedua kali melakukan *update*, restriksi multi-role berjalan sukses, dan avatar pengguna Google berhasil dirender dengan baik.

Uji role admin akses page admin
![Admin Akses Admin](assets/Tes%20Admin%20akses%20admin.gif)
Uji role member akses page admin
![Member Akses Admin](assets/Tes%20member%20akses%20admin.gif)

---

### E. Hasil Tugas Praktikum

**Tugas 1: Tambahkan role editor**
Mendefinisikan peran baru "editor" pada sistem database Firestore untuk memisahkan kewenangan manajemen konten dengan admin dan member biasa.

Uji role bukan editor akses page editor
![Editor Terblokir Jika Bukan Editor](assets/Tugas%201%20cek%20bukan%20editor%20akses%20editor.gif)
Uji role editor akses page editor
![Akses Sukses Editor](assets/Tugas%201%20cek%20editor%20akses%20editor.gif)

**Tugas 2: Buat halaman khusus editor**
Membuat routing halaman baru yang diproteksi spesifik, di mana hanya *session* dengan nilai atribut `role === "editor"` yang diizinkan untuk melihat dan merender komponen UI di dalamnya.

![Halaman Editor](assets/Tugas%202%20editor%20page.png)

**Tugas 3: Tambahkan provider GitHub**
Mengintegrasikan `GithubProvider` dari pustaka `next-auth/providers/github` secara pararel dengan GoogleProvider untuk memberikan fleksibilitas opsi Social Login bagi pengguna.

![Provider Github](assets/Tugas%203%20provider%20github.gif)

**Tugas 4: Refactor service agar reusable**
Melakukan pemisahan fungsional (Modularization) untuk operasi pembacaan dan penulisan di `servicefirebase.ts` sehingga satu fungsi inti database dapat dipakai berulang-ulang tanpa duplikasi kode blok Firestore API.

![Refactor Reusable](assets/Tugas%204%20Refactor%20agar%20reusable.png)

**Tugas 5: Gunakan next/image untuk optimasi avatar**
Mengganti elemen HTML generik `<img>` pada Navbar dengan komponen modern `<Image />` dari `next/image` disertai whitelist domain `images.domains` di `next.config.js` untuk mendapatkan optimasi format WebP secara terotomatisasi.

![Optimasi Avatar](assets/Tugas%205%20optimasi%20avatar.png)

---

### F. Pertanyaan Evaluasi

**1. Apa perbedaan login credential dan login Google?**
Login credential mengharuskan sistem mengelola form, keamanan, dan hashing *password* secara mandiri. Sementara login Google berbasis delegasi OAuth 2.0, di mana server Google yang memverifikasi kata sandi pengguna dan mengembalikan token kredensial terpercaya, mengurangi celah kebocoran *password* lokal.

**2. Mengapa data Google tetap perlu disimpan ke database?**
Penyimpanan diperlukan untuk manajemen profil dan otorisasi spesifik lokal. Aplikasi memerlukan entitas "User" di database (seperti Firestore) untuk diikatkan dengan data relasional lain (transaksi, riwayat) dan untuk disisipkan properti kustom (seperti `role` admin/member).

**3. Apa fungsi JWT callback?**
JWT callback berfungsi sebagai penyaring/penengah setiap kali *token* terbuat (saat login) atau saat token divalidasi. Ini adalah tempat paling ideal untuk menyisipkan data hasil kueri *database* (seperti hak akses role) ke dalam enkripsi *cookie* sisi-klien.

**4. Mengapa perlu multi-role?**
Untuk implementasi *Role-Based Access Control* (RBAC). Multi-role memastikan tingkat privasi dan keamanan hierarki fungsional terjamin; pengguna umum tidak akan pernah bisa mengeksekusi endpoint khusus manajemen sistem yang hanya diperuntukkan bagi Administrator.

**5. Apa risiko jika tidak menyimpan user ke database?**
Aplikasi kehilangan persistensi data relasional lokalnya, kehilangan kemampuan kustomisasi izin, dan menyebabkan dependensi ekstrim terhadap respons platform OAuth eksternal murni jika membutuhkan rekapan profil pelanggan historis.

---

### G. Kesimpulan
1. NextAuth.js menyediakan antarmuka integrasi Social Login (seperti Google OAuth) yang sangat efisien jika digabungkan dengan Next.js App Router/Pages Router.
2. Proses integrasi OAuth mewajibkan pemastian pertukaran kunci yang tepat antara kredensial Google Cloud Console dengan Environment Variables sistem.
3. Fungsi `callbacks` pada NextAuth krusial untuk memodifikasi struktur informasi sesi, memungkinkan integrasi arsitektur hibrid dengan Database eksternal (Firestore).
4. Data pendaftaran pengguna via OAuth tetap wajib di-persistensi ke dalam sistem relasional/NoSQL internal aplikasi untuk mengakomodasi pengelolaan RBAC (Multi-Role) yang aman dan terpadu.