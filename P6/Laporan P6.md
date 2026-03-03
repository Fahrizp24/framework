# Laporan Praktikum 6: API Routes pada Next.js dan Integrasi Firebase

**Mata Kuliah:** Pemrograman Framework  
**Mahasiswa:** Fahri Zanuar Pradian  
**Topik:** API Routes pada Next.js dan Integrasi Firebase (Fullstack Next.js)

---

## 1. Langkah 1 - Menjalankan Project
Pada langkah ini, saya memastikan project Next.js dapat berjalan dengan baik di local environment dengan menjalankan perintah `npm run dev` di terminal.

![1. Langkah 1 - Menjalankan Project](assets/Langkah 1.png)

## 2. Langkah 2 - Membuat API Produk
Membuat file endpoint API baru di `pages/api/produk.ts` yang mengembalikan response JSON berisi data array produk secara statis dengan status code 200.

![2. Langkah 2 - Membuat API Produk](assets/Langkah 2.png)

## 3. Langkah 3 - Fetch Data API di Frontend
Memodifikasi file `pages/produk/index.tsx` dengan menambahkan hooks `useEffect` dan `useState` untuk mengambil (fetch) data dari endpoint `/api/produk` yang baru dibuat, lalu menampilkannya menggunakan fungsi `map`.

![3. Langkah 3 - Fetch Data API di Frontend](assets/3%20-%20Fetch%20Data%20API%20di%20Frontend.png)

*(Catatan: Penomoran jobsheet melompat, tidak ada Langkah 4)*

## 4. Langkah 5 - Setup Firebase
Melakukan konfigurasi backend dengan membuat project baru di Firebase Console, menonaktifkan Google Analytics, serta mengaktifkan Cloud Firestore. Rules Firestore juga diubah menjadi `allow read, write: if true;` agar dapat diakses secara publik.

## 5. Langkah 6 - Install Firebase
Menginstal SDK Firebase ke dalam project Next.js menggunakan perintah `npm install firebase` di terminal. Setelah itu, membuat file konfigurasi awal di `utils/db/firebase.ts`.

## 6. Langkah 7 - Konfigurasi Environment Variable
Membuat file `.env.local` di root project untuk menyimpan kredensial Firebase (seperti API Key, Project ID) agar rahasia tidak ikut ter-push ke repository GitHub.

## 7. Langkah 8 - Konfigurasi Firebase
Menyesuaikan file `firebase.ts` agar mengambil nilai kredensial dari environment variable (`process.env`) yang sudah dibuat sebelumnya di `.env.local`.

## 8. Langkah 9 - Ambil Data dari Firestore
Membuat file service khusus `utils/db/servicefirebase.ts` yang berisi fungsi asinkron `retrieveProducts` untuk melakukan query dan mengambil koleksi data dari Firestore.

## 9. Langkah 10 - API Mengambil Data Firebase
Memodifikasi kembali file `pages/api/produk.ts` agar tidak lagi menggunakan data statis, melainkan memanggil fungsi `retrieveProducts` untuk mengirimkan data dinamis dari Firestore ke frontend.

![9. Langkah 10 - API Mengambil Data Firebase](assets/10%20–%20API%20Mengambil%20Data%20Firebase.png)
![9. Langkah 10 - API Mengambil Data Firebase](assets/10%20–%20API%20Mengambil%20Data%20Firebase%202.png)

---

## E. Hasil Tugas Praktikum

### Tugas 1: Tambah 3 Data Produk di Firestore
Menambahkan 3 dokumen produk baru secara manual melalui panel Firebase Console dan memastikan data tersebut berhasil ditarik dan tampil di halaman web `/produk`.

![Tugas 1](assets/Tugas%201.png)

### Tugas 2: Tambahkan Field Category
Menambahkan field baru bernama `category` dengan tipe data string pada dokumen Firestore, lalu memodifikasi `type ProductType` dan kode UI di frontend agar kategori tersebut muncul di layar.

![Tugas 2](assets/Tugas%202.png)

### Tugas 3: Tombol Refresh Data
Membuat tombol "Refresh Data" di frontend yang memicu pemanggilan ulang fungsi `fetchProducts()` saat diklik, sehingga data terbaru dari database bisa langsung tampil tanpa perlu me-reload seluruh halaman browser.

![Tugas 3](assets/Tugas%203.png)

---

## F. Pertanyaan Evaluasi

1. **Apa fungsi API Routes pada Next.js?**
   Fungsinya adalah untuk membangun endpoint API backend (serverless functions) secara langsung di dalam project Next.js tanpa harus membuat server backend terpisah.
2. **Mengapa .env.local tidak boleh di-push ke repository?**
   File `.env.local` berisi data kredensial rahasia (seperti Firebase API Key). Jika ter-push ke repository publik, kredensial tersebut dapat disalahgunakan oleh pihak yang tidak bertanggung jawab.
3. **Apa perbedaan data statis dan data dinamis?**
   Data statis adalah data yang diketik langsung (hardcoded) ke dalam source code dan sulit diubah. Sedangkan data dinamis adalah data yang disimpan di database (seperti Firestore) yang bisa ditambahkan, diubah, atau dihapus kapan saja tanpa harus mengubah source code aplikasi.
4. **Mengapa Next.js disebut framework fullstack?**
   Karena Next.js tidak hanya bisa merender antarmuka pengguna (Frontend/React), tetapi juga memiliki fitur API Routes yang bertindak sebagai server/backend untuk memproses data dan berinteraksi dengan database.

---

## G. Kesimpulan
1. **Kemudahan Fullstack:** Fitur API Routes di Next.js sangat mempermudah pembuatan endpoint backend langsung di dalam project yang sama, menghilangkan kebutuhan setup server eksternal tambahan.
2. **Integrasi Firebase:** Firebase Firestore dapat dihubungkan dengan mudah menggunakan SDK Firebase untuk menangani penyimpanan data NoSQL yang dinamis secara real-time.
3. **Keamanan Data:** Penggunaan file `.env.local` menjadi praktik wajib untuk menyembunyikan API key dan kredensial sensitif lainnya agar tidak bocor.
4. **Efisiensi State Management:** Penggunaan Hook `useEffect` dan `useState` di frontend digabungkan dengan fungsi fetch memungkinkan pembaruan data yang efisien di sisi klien tanpa perlu reload halaman secara penuh (seperti pada implementasi tombol refresh).