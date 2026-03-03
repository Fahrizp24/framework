# Laporan Praktikum 9: Server Side Rendering (SSR)
Mata Kuliah: Pemrograman Framework
Mahasiswa: Fahri Zanuar Pradian
Topik: Server Side Rendering (SSR) pada Next.js

1. Bagian 1 - Setup Halaman SSR
Membuat file baru `server.tsx` pada direktori `pages/produk/` untuk menyiapkan struktur dasar komponen antarmuka halaman yang akan di-render melalui server.
![1. Setup Halaman SSR](assets/1%20–%20Setup%20Halaman%20SSR%20.png)

2. Bagian 2 - Implementasi getServerSideProps pada server.tsx
Menambahkan fungsi bawaan Next.js yaitu `getServerSideProps` untuk mengambil data produk dari API lokal (`/api/produk`) di sisi server. Data tersebut kemudian diteruskan (di-inject) ke komponen React sebagai `props`.
![2. Implementasi getServerSideProps pada server.tsx](assets/2%20–%20Implementasi%20getServerSideProps%20pada%20server.tsx.png)

3. Bagian 3 - Refactor Type (produk type)
Membuat direktori `types` dan memindahkan definisi struktur data produk ke dalam file `Product.type.ts`. Hal ini dilakukan untuk menerapkan prinsip *clean code* dan modularitas TypeScript agar tipe data dapat digunakan ulang di file lain.
![3. Refactor Type (produk type)](assets/3%20–%20Refactor%20Type%20(%20produk%20type%20).png)

4. Bagian 4 - Uji Perbedaan SSR vs CSR
Melakukan observasi perbedaan performa dan cara kerja antara halaman CSR dan SSR menggunakan DevTools browser. Pengujian meliputi pengecekan kemunculan skeleton, pemantauan *request API* pada tab Network, dan inspeksi respon HTML melalui View Source.

a. Pengujian Skeleton
![4. Uji Perbedaan SSR vs CSR](assets/Uji%201%20–%20Skeleton%20.gif)

b. Pengujian Network Tab
![4. Uji Perbedaan SSR vs CSR](assets/Uji%202%20–%20Network%20Tab%20.gif)

c. Pengujian Response HTML
![4. Uji Perbedaan SSR vs CSR](assets/Uji%203%20–%20Response%20HTML%20.gif)

5. Hasil Tugas Praktikum

a. Tugas 1: Membuat halaman `/products` (CSR) dan `/products/server` (SSR)
Berhasil mengimplementasikan dua pendekatan rendering yang berbeda. Halaman CSR (`pages/products/index.tsx`) menggunakan `useEffect` dan `useState` untuk mengambil data di browser, sedangkan halaman SSR (`pages/products/server.tsx`) menggunakan `getServerSideProps` untuk merender data dari sisi server.

b. Tugas 2: Dokumentasi Pengujian SSR vs CSR
- **Screenshot CSR vs SSR**: Pada CSR terlihat elemen Skeleton selama proses *loading* data, sedangkan pada SSR data produk langsung tampil tanpa transisi *loading*.
![Uji CSR vs SSR](assets/Uji%201%20–%20Skeleton%20.gif)
- **Perbedaan Network Tab**: Pada pengujian CSR, *request* `Fetch/XHR` menuju *endpoint* `/api/produk` terekam dengan jelas di browser. Pada SSR, *request* tersebut tidak ada di Network tab karena proses pengambilan data dieksekusi oleh server Node.js di belakang layar.
![Network CSR](assets/Uji%202%20–%20Network%20Tab%20.gif)
- **Perbedaan View Source**: Saat melakukan *View Page Source*, halaman CSR hanya menampilkan struktur tag HTML kosong (skeleton div). Sebaliknya, *View Source* pada halaman SSR sudah menampilkan teks nama produk dan harganya secara utuh di dalam tag HTML.
![View Source CSR](assets/Uji%203%20–%20Response%20HTML%20.gif)

6. Pertanyaan Evaluasi

a. Mengapa SSR lebih baik untuk SEO?
SSR lebih baik untuk SEO karena proses pembentukan HTML (beserta datanya) diselesaikan di sisi server sebelum dikirim ke klien. Mesin pencari (seperti Googlebot) dapat langsung membaca, merayapi (*crawl*), dan mengindeks seluruh konten teks pada halaman secara instan tanpa harus menjalankan *engine* JavaScript terlebih dahulu.

b. Kapan sebaiknya menggunakan SSR?
SSR sangat disarankan untuk halaman publik yang membutuhkan visibilitas mesin pencari yang tinggi (SEO-oriented) seperti artikel portal berita, landing page, atau halaman detail produk *e-commerce*. Selain itu, SSR cocok untuk halaman yang menampilkan data yang sangat dinamis dan harus dipastikan selalu *up-to-date* setiap kali diakses pengguna.

c. Apa kekurangan SSR dibanding CSR?
Kekurangan utama SSR adalah memberikan beban komputasi yang lebih berat pada server, karena server harus mengambil data dan merakit HTML dari awal untuk setiap *request* yang masuk. Hal ini dapat menyebabkan waktu respons awal (*Time to First Byte* / TTFB) menjadi lebih lambat jika trafik sedang tinggi atau API lambat, dibandingkan dengan CSR yang membebankan proses *rendering* ke perangkat pengguna (klien).

d. Mengapa skeleton tidak muncul pada SSR?
Skeleton tidak muncul karena pada SSR tidak ada fase *loading state* asinkron di sisi browser. Komponen React dan datanya sudah diproses, digabungkan, dan dirender menjadi dokumen HTML statis di server. Saat browser memuat halaman tersebut, semua informasi produk sudah tersedia dan langsung ditampilkan secara utuh.

G. Kesimpulan
1. Pendekatan Server Side Rendering (SSR) pada Next.js dikendalikan melalui fungsi khusus `getServerSideProps` yang mengeksekusi logika *data fetching* murni di *backend*.
2. SSR terbukti secara teknis menghasilkan dokumen HTML yang sudah matang dan berisi data lengkap (terlihat pada *View Page Source*), sehingga performa SEO jauh lebih optimal dibandingkan CSR.
3. Berdasarkan pengujian DevTools, SSR mampu mengamankan dan menyembunyikan lalu lintas API internal karena *request* tidak terjadi di klien (browser), melainkan antar server.
4. Pemilihan antara CSR dan SSR harus disesuaikan dengan kebutuhan proyek; SSR untuk prioritas SEO dan data *real-time*, sedangkan CSR untuk performa interaktivitas aplikasi (seperti *dashboard* internal) yang tidak memerlukan SEO.