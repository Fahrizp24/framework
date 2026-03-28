# Laporan Praktikum 14: Implementasi Sistem Registrasi (Database Integration)
Mata Kuliah: Pemrograman Framework  
Mahasiswa: Fahri Zanuar Pradian  
Topik: Register User dengan Hash Password & Validasi  

## A. Langkah Kerja

**Langkah 1: Membuat Register View Dasar**
Membangun antarmuka form registrasi (Frontend) menggunakan Next.js pada direktori `views/auth/register` dan menerapkan *styling* antarmuka menggunakan SCSS module agar membentuk *card layout* yang responsif.
![Membuat Register View](assets/1%20–%20Membuat%20Register%20View%20.png)

**Langkah 2: Membuat API Register dan Service Firebase**
Membuat konfigurasi *backend* dengan menambahkan fungsi `signup` di `servicefirebase.ts` untuk memeriksa duplikasi email dan menginput data pengguna. Selanjutnya, membuat *endpoint* `/api/register.ts` untuk menerima permintaan POST dari form frontend.
![Membuat API Register](assets/2%20–%20%20Membuat%20API%20Register.gif)

**Langkah 3: Install library Bcrypt untuk Hashing**
Mengamankan kata sandi pengguna dengan menginstal pustaka `bcrypt` dan tipe deklarasinya (`@types/bcrypt`) melalui terminal. Library ini digunakan di service Firebase untuk meng-enkripsi password menjadi *hash* sebelum direkam ke *database*.
![Install bcrypt](assets/3%20–%20Install%20bcrypt%20install%20bcrypt.png)
![Install types bcrypt](assets/3%20–%20Install%20bcrypt%20bcrypt%20–force.png)

## D. Pengujian Sistem

**Uji 1 - Register Baru:**
Melakukan pengujian mendaftarkan email baru. Sistem berhasil melakukan enkripsi password, menyimpan data ke Firestore, dan melakukan *redirect* pengguna ke halaman Login.
![Uji 1 Register Baru](assets/Uji%201%20–%20Register%20Baru.gif)

**Uji 2 - Email Sudah Ada:**
Menguji sistem dengan memasukkan data email yang sebelumnya sudah terdaftar. API mendeteksi duplikasi melalui *query* Firestore dan membatalkan proses pendaftaran.
![Uji 2 Email Sudah Ada](assets/Uji%202%20–%20Email%20Sudah%20Ada%20.gif)

**Uji 3 - Method GET:**
Mencoba mengakses rute `/api/register` secara langsung melalui URL browser (menggunakan method GET). Sesuai ekspektasi, sistem menolak permintaan dan mengembalikan *Error 405 Method Not Allowed*.
![Uji 3 Method GET](assets/Uji%203%20–%20Method%20GET.png)

## E. Hasil Tugas Praktikum

**Tugas 1: Implementasikan register terhubung database.**
Form registrasi frontend telah berhasil diintegrasikan dengan rute API Next.js dan *service* Firebase. Data inputan pengguna (email, fullname, password) sukses terekam secara persisten pada koleksi `users` di Firestore.

**Tugas 2: Tambahkan validasi: Email wajib & Password min 6 karakter.**
Modifikasi payload API berhasil dilakukan untuk mendeteksi *input value*. Jika email dibiarkan kosong atau panjang password kurang dari 6 karakter, rute API merespon dengan status *400 Bad Request* beserta pesan yang sesuai.
![Tugas 2 - Validasi Email](assets/Tugas%202.png)
![Tugas 2 - Validasi Password](assets/Tugas%202%202.png)

**Tugas 3: Tambahkan role default "member".**
Dokumen pengguna baru yang disimpan ke basis data Firestore sukses dimodifikasi dengan penambahan properti baru secara *default*, yaitu penetapan level otorisasi `role: "member"`.
![Tugas 3 - Role Default](assets/Tugas%203.gif)

**Tugas 4: Tampilkan pesan error di UI.**
Pesan validasi dari API (*error name*) berhasil ditangkap oleh properti respons `json()` dan disimpan ke dalam *state* React `error`, sehingga peringatan seperti "Email wajib diisi!" atau "User already exists" dapat langsung ditampilkan ke layar pengguna secara dinamis tanpa perlu melakukan *refresh*.
![Tugas 4 - Error UI](assets/Tugas%204.png)

**Tugas 5: Hasil keseluruhan flow Registrasi.**
Berikut adalah visualisasi keseluruhan fungsionalitas registrasi ketika pengguna melengkapi data valid, submit proses, hingga akhirnya data diterima database dan diarahkan (*redirect*) ke halaman Autentikasi/Login.
![Tugas 5 - Keseluruhan](assets/Tugas%205.gif)

## F. Pertanyaan Evaluasi

**1. Mengapa password harus di-hash?**
Sandi wajib di-hash untuk menghilangkan visibilitas *plaintext* pada basis data. Proses hashing ini bersifat kriptografis satu-arah (*irreversible*), sehingga andaikata terjadi pembobolan basis data (kebocoran *backend*), *hacker* tidak dapat mendeskripsi sandi orisinal milik pengguna, memastikan privasi dan keamanan tingkat tinggi.

**2. Apa perbedaan addDoc dan setDoc?**
`addDoc` digunakan jika kita ingin platform Firestore menghasilkan ID/Kunci Dokumen berbentuk string acak secara otonom saat memasukkan data baru ke dalam *collection*. Sementara `setDoc` digunakan apabila kita ingin mendeklarasikan ID secara *custom* secara spesifik; di mana jika ID tersebut sudah ada, fungsinya akan menimpa/memodifikasi dokumen tersebut.

**3. Mengapa perlu validasi method POST?**
Validasi metode pada titik akses API (seperti pelarangan metode GET) sangat penting guna menyingkirkan kemungkinan eksekusi kode *backend* yang tak disengaja. Metode POST secara khusus menjamin bahwa pengiriman informasi (payload) selalu disertakan di dalam *request body* yang tersembunyi, bukan via parameter kueri URL yang tidak aman.

**4. Apa risiko jika email tidak dicek unik?**
Ketiadaan mekanisme pengecekan unik (*unique constraints*) bisa berakibat pada registrasi kredensial ganda (satu email dimiliki oleh lebih dari satu dokumen profil). Akibatnya, pada saat proses validasi *Login*, sistem akan kebingungan membedakan dokumen (*user identifier*) mana yang sahih, sehingga merusak *flow* autentikasi.

**5. Apa fungsi role pada user?**
*Role* bertindak sebagai *Authorization Parameter* (hak kontrol akses). Properti inilah yang akan mendikte aplikasi (pada antarmuka Frontend maupun *Middleware*) tentang sejauh mana pengguna boleh berselancar; misalnya, membedakan siapa yang berhak melihat *dashboard admin* dan siapa yang hanya menjadi *member* reguler.

## G. Kesimpulan

1. Rute *API Serverless* yang tertanam dalam aplikasi Next.js merupakan *layer middleware* ideal untuk merangkai logika validasi kompleks dan pra-pemrosesan data sebelum diteruskan ke ekosistem layanan pihak ketiga seperti Firebase Firestore.
2. Pengamanan basis data berbasis otentikasi mengharuskan konversi nilai sandi menggunakan komputasi librari *hashing* seperti `bcrypt` sebelum dieksekusi oleh perintah basis data.
3. Kredibilitas dari *User Experience* (UX) sangat dipengaruhi oleh kelancaran pertukaran balasan *error text* (dari *backend* ke *state* UI *frontend*) serta fitur *conditional rendering* pada tombol (seperti inaktivasi form saat *Loading* berlangsung).
4. Implementasi pengecekan redundansi kueri di Firestore (pemanfaatan operasi klausul `where`) secara mendasar mencegah insiden registrasi *spam* atau profil ganda.