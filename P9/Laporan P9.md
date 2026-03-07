# Laporan Praktikum 10: Perbandingan CSR vs SSR vs SSG
Mata Kuliah: Pemrograman Framework

Mahasiswa: Fahri Zanuar Pradian

Topik: Perbandingan CSR vs SSR vs SSG

1. Bagian 1 - Setup Halaman Static
Pada langkah ini, saya membuat file `static.tsx` di dalam folder `src/pages/produk/`. File ini berisi kode komponen untuk merender UI sekaligus memanfaatkan fungsi bawaan Next.js, yaitu `getStaticProps`, untuk mengambil data produk dari API lokal pada saat fase build.
![1. Setup Halaman Static](assets/1%20–%20Setup%20Halaman%20Static%20.png)

2. Bagian 3 - Build Production Mode
Untuk menghindari error routing, folder pendukung seperti `views` dan `types` diposisikan sejajar dengan folder `pages`. Kemudian, saya menjalankan `npm run build` sambil tetap menghidupkan API lokal melalui `npm run dev` di terminal lain. Hasil build menunjukkan bahwa route `/produk/static` berhasil di-generate sebagai halaman SSG statis (simbol ●).

Menjalankan npm run build
![2. Build Production Mode](assets/3%20-%20npm%20run%20build.png)
Menjalankan npm run start
![2. Build Production Mode](assets/3%20-%20npm%20run%20start.png)
setelahh npm run start
![2. Build Production Mode](assets/3%20–%20Build%20Production%20Mode.png)


3. Bagian 4 - Pengujian Perubahan Data (Uji 1 & Uji 2)
Saya menambahkan data produk "sepatu kasogi" langsung ke dalam database Firebase Firestore. Saat menguji halaman CSR dan SSR di browser, data baru tersebut langsung muncul. Namun, pada halaman SSG (`/produk/static`), data tidak berubah sama sekali. Data baru pada halaman SSG baru bisa muncul setelah saya mematikan server, menjalankan ulang `npm run build`, dan menyalakan kembali server dengan `npm run start`.

Sebelum mengupdate data produk

- CSR
![3. Pengujian Perubahan Data (Uji 1 & Uji 2) pada CSR](assets/4%20–%20Pengujian%20Perubahan%20Data%20CSR.png)
- SSR
![3. Pengujian Perubahan Data (Uji 1 & Uji 2) pada SSR](assets/4%20–%20Pengujian%20Perubahan%20Data%20CSR.png)
- SSG
![3. Pengujian Perubahan Data (Uji 1 & Uji 2) pada SSG](assets/4%20–%20Pengujian%20Perubahan%20Data%20SSG.png)

- Setelah mengupdate data produk maka tampilan halaman SSG:
![3. Pengujian Perubahan Data (Uji 1 & Uji 2) pada SSG setelah build ulang](assets/4%20–%20Pengujian%20Perubahan%20Data%20SSG%202.png)

E. Hasil Tugas Praktikum
Tugas 1: Analisis 3 Pendekatan Rendering (CSR, SSR, SSG)
Berdasarkan pengujian penambahan dan penghapusan data, didapatkan hasil berikut:
- **CSR (Client-Side Rendering):** Data diambil saat runtime di browser klien. Pembaruan data terjadi secara real-time setiap halaman dimuat, cocok untuk dashboard yang interaktif.
- **SSR (Server-Side Rendering):** Data diambil di server setiap kali ada request. Data selalu mutakhir (real-time), namun memiliki jeda rendering di sisi server, cocok untuk halaman yang butuh SEO sekaligus data dinamis.
- **SSG (Static Site Generation):** Data dikunci menjadi HTML statis saat proses build. Halaman sangat cepat diakses karena tidak ada proses fetching ulang, namun datanya akan usang jika database berubah. Harus dilakukan build ulang agar data termutakhir masuk ke dalam halaman.

F. Pertanyaan Evaluasi
1. Mengapa SSG tidak menampilkan data terbaru?
Karena pada metode SSG, proses fetching data dan pembentukan HTML hanya dilakukan satu kali pada saat fase build (`npm run build`). Setelah itu, aplikasi hanya mengirimkan file HTML statis yang sama kepada pengguna.

2. Mengapa SSG lebih cepat?
SSG memberikan performa yang lebih cepat karena server tidak perlu melakukan komputasi rendering ulang dan tidak memanggil API (fetch data) setiap kali pengguna mengakses halaman. File HTML sudah siap saji.

3. Kapan SSG tidak cocok digunakan?
SSG sangat tidak cocok digunakan pada halaman yang datanya sering berubah (highly dynamic), halaman interaktif yang isinya spesifik per pengguna (seperti dashboard akun), atau aplikasi yang membutuhkan pembaruan data secara seketika (real-time).

4. Mengapa e-commerce tidak cocok menggunakan SSG murni?
Aplikasi e-commerce memiliki data esensial yang berubah sangat cepat seperti ketersediaan stok barang dan harga. Penggunaan SSG murni dapat menyebabkan pengguna melihat informasi stok yang tidak valid (misalnya produk terlihat masih ada, padahal di database sudah habis).

5. Apa perbedaan build mode dan development mode?
Development mode (`npm run dev`) akan men-compile kode setiap kali ada request (runtime) dan menyertakan fitur debugging untuk memudahkan developer. Sedangkan build mode (`npm run build` -> `npm run start`) digunakan untuk production, di mana kode telah diminifikasi, dioptimasi, dan di-render menjadi file statis agar berjalan maksimal dan cepat diakses pengguna.

G. Kesimpulan
- Terdapat perbedaan mendasar dalam penanganan pembaruan data antara CSR, SSR, dan SSG; di mana SSG memerlukan proses build ulang agar perubahan data di database dapat terefleksi pada antarmuka.
- SSG menawarkan keunggulan performa (kecepatan pemuatan) yang paling tinggi karena hanya mendistribusikan file HTML statis yang sudah dipersiapkan sebelumnya.
- Pemilihan arsitektur rendering harus disesuaikan dengan kebutuhan bisnis aplikasi. SSG sangat ideal untuk landing page atau blog, namun kurang tepat untuk aplikasi yang membutuhkan data real-time (seperti E-commerce atau Dashboard Admin).