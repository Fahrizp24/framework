# Laporan Praktikum 10: Dynamic Routing & Static Generation
**Mata Kuliah:** Pemrograman Framework  
**Mahasiswa:** Fahri Zanuar Pradian  
**Topik:** Detail Produk (CSR, SSR, SSG)  

---

## Bagian 1 - Membuat Dynamic Route
Pada langkah pertama, saya mengimplementasikan *dynamic routing* di Next.js menggunakan kurung siku pada nama file `pages/produk/[produk].tsx`. Daftar produk di halaman utama dimodifikasi dengan tag `<Link>` agar setiap elemen *card* dapat diklik dan mengarahkan ke halaman dengan parameter ID produk secara dinamis.

![Hasil Langkah 1](assets/1%20%E2%80%93%20Membuat%20Dynamic%20Route.gif)

## Bagian 2 - Implementasi CSR (Client Side Rendering)
Pada tahap ini, saya menerapkan metode Client Side Rendering (CSR) untuk halaman detail produk. Parameter ID diambil melalui URL menggunakan fungsi `useRouter()`. Data produk spesifik kemudian di-*fetch* langsung dari sisi klien menggunakan *hook* `useSWR`. Karena data harus menunggu proses *fetch*, saya juga mengimplementasikan mekanisme *loading state*.

![Data API CSR](assets/2%20%E2%80%93%20Implementasi%20CSR%20(Client%20Rendering)%202.png)
![Hasil UI CSR](assets/2%20%E2%80%93%20Implementasi%20CSR%20(Client%20Rendering)%203.png)

## Bagian 3 - Implementasi SSR (Server Side Rendering)
Metode CSR dinonaktifkan dan diganti dengan Server Side Rendering (SSR) dengan memanfaatkan fungsi `getServerSideProps`. Dengan pendekatan ini, proses penarikan data dari API dieksekusi oleh server Next.js sesaat sebelum halaman dirender. Hasilnya, peramban menerima HTML yang sudah terisi data tanpa perlu melewati *loading state*.

![Hasil Langkah 3 SSR](assets/3%20%E2%80%93%20Implementasi%20SSR.gif)

## Bagian 4 - Implementasi SSG (Static Site Generation)
Tahap terakhir adalah menerapkan Static Site Generation (SSG). Metode SSR digantikan dengan kombinasi `getStaticPaths` (untuk mendaftarkan semua ID produk yang valid) dan `getStaticProps` (untuk mengambil detail datanya). Proses ini menggabungkan antarmuka dan data menjadi file HTML statis yang sangat cepat saat proses *build* (`npm run build`).

![Hasil Langkah 4 SSG](assets/4%20%E2%80%93%20Implementasi%20Static%20Site%20Generation%20(Dynamic%20SSG).gif)

---

## E. Hasil Tugas Praktikum

### Tugas 1: Implementasi Halaman Detail dengan CSR, SSR, dan SSG
Halaman detail telah berhasil dibangun menggunakan ketiga metode rendering sesuai dengan arahan *jobsheet*. Kode file `[produk].tsx` memuat fungsi untuk ketiga metode di mana mode SSG diaktifkan sebagai iterasi final praktikum.

### Tugas 2: Tabel Perbandingan

| Aspek | CSR (Client Side Rendering) | SSR (Server Side Rendering) | SSG (Static Site Generation) |
| :--- | :--- | :--- | :--- |
| **Loading** | Wajib ada *loading state* karena peramban menunggu respons data dari API. | Tidak memerlukan *loading state*; pengguna mungkin merasakan sedikit jeda respons. | Instan, karena file HTML dan datanya sudah dicetak menjadi halaman statis. |
| **Build Required** | Tidak (hanya UI statis yang di-*build*, data tetap dinamis). | Tidak (halaman diproduksi dinamis tiap ada permintaan/*request*). | **Ya** (perubahan data baru akan muncul di UI hanya setelah aplikasi di-*build* ulang). |
| **SEO** | Kurang optimal karena *crawler* sering hanya menerima *shell* HTML tanpa isi. | Sangat baik, sebab mesin pencari langsung mendapat HTML lengkap beserta isinya. | Sangat baik, HTML lengkap dan didukung dengan performa waktu muat (*load time*) maksimal. |
| **Perubahan Data**| Data *real-time* langsung dari klien. | Data selalu *real-time* karena ditarik dari server di setiap permintaan rute. | Data bersifat statis (terikat pada *build* terakhir) dan berisiko basi jika tidak dibarui rutin. |

### Tugas 3: Dokumentasi Pengujian

**Uji 1 - CSR (Client Side Rendering)**
Pengujian berhasil membuktikan adanya aktivitas penarikan data (`fetch/XHR`) di sisi klien saat memuat halaman detail.
![Uji CSR Network](assets/Uji%201%20%E2%80%93%20CSR%20.png)

**Uji 2 - SSR (Server Side Rendering)**
Pengujian berhasil membuktikan bahwa proses muat tidak memunculkan indikator *loading*, dan tidak ada aktivitas `fetch` API detail produk di *tab Network* klien (karena dieksekusi di server).
![Uji SSR Network](assets/Uji%202%20-%20SSR.png)

**Uji 3 - SSG (Static Site Generation)**
Pengujian pembuktian *build* berhasil dilakukan. Saat data produk baru ("Eiger sepatu gunung") ditambahkan ke Firebase, rute halaman tersebut memunculkan error/tidak ditemukan karena data dimasukkan **setelah** proses `build`.
![Uji SSG Sebelum Build Ulang](assets/Uji%203%20-%20SSG%20sebelum%20build%20ulang.png)

Namun, setelah proses `npm run build` dijalankan kembali, *path* baru tersebut didaftarkan dan halamannya dicetak statis, sehingga produk berhasil dirender.
![Uji SSG Setelah Build Ulang](assets/Uji%203%20-%20SSG%20setelah%20build%20ulang.png)

---

## F. Pertanyaan Evaluasi

**1. Mengapa `getStaticPaths` wajib pada dynamic SSG?**
Karena pada rute dinamis (*dynamic routing*), Next.js membutuhkan daftar parameter ID secara eksak pada saat *build time*. Fungsi `getStaticPaths` bertugas memasok *array* ID tersebut agar sistem mengetahui halaman HTML apa saja yang harus di-*generate* (misal `/produk/123`, `/produk/456`). Tanpa ini, rute dinamis tidak bisa dibuat menjadi statis.

**2. Mengapa CSR membutuhkan loading state?**
Pada CSR, rute akan segera menampilkan antarmuka kosong sesaat sebelum skrip tereksekusi dan menginisiasi pemanggilan API. *Loading state* esensial untuk menjembatani asinkronisasi tersebut dan memberikan umpan balik visual, sekaligus menahan komponen agar tidak mengalami galat (*error*) akibat membaca parameter data yang masih bernilai `undefined`.

**3. Mengapa SSG tidak menampilkan produk baru tanpa build ulang?**
Metode SSG menggabungkan antarmuka dan data secara permanen menjadi dokumen statis hanya pada fase *build*. Perubahan struktur *database* yang terjadi di luar fase kompilasi tersebut tidak akan dikenali oleh aplikasi hingga perintah `npm run build` dijalankan kembali untuk memperbarui *file* statis terkait.

**4. Mana metode terbaik untuk halaman detail e-commerce?**
Solusi paling rasional untuk ekosistem e-commerce modern adalah **SSG yang dikombinasikan dengan ISR (Incremental Static Regeneration)** untuk menyeimbangkan performa muat ekstra cepat dan efisiensi pembaruan. Di luar kombinasi hibrida, **SSR** adalah metode paling aman untuk katalog dinamis dengan fluktuasi harga dan stok yang konstan, sedangkan SSG murni spesifik digunakan untuk tipe rilis produk yang statis.

**5. Apa risiko menggunakan SSG untuk produk yang sering berubah?**
Risiko terbesarnya adalah visibilitas **Stale Data (Data Basi)**. Konsumen dapat terekspos terhadap informasi harga lama atau misinformasi tentang ketersediaan inventaris stok yang keliru. Anomali presentasi ini akan memicu gesekan transaksi dan menurunkan tingkat kepercayaan pengguna (*user trust*).

---

## G. Kesimpulan
1. **CSR (Client Side Rendering)** menawarkan peralihan rute halaman yang responsif, tetapi mengorbankan kualitas SEO dan kecepatan visual pemuatan awal.
2. **SSR (Server Side Rendering)** menjamin seluruh peramban melihat data yang sinkron (*real-time*) beserta struktur SEO yang ramah, namun memerlukan komputasi server yang selalu aktif di tiap permintaan.
3. **SSG (Static Site Generation)** melahirkan file performa terbaik dengan beban kerja server minimalis; kekurangannya hanyalah pada imutabilitas (kekakuan) data pasca-kompilasi.
4. Next.js telah mendesain transisi *rendering* rute dinamis (seperti `pages/produk/[produk].tsx`) menjadi sonder gesekan, di mana transmutasi antar metode murni ditentukan oleh substitusi *hook* pengambil data (`useSWR` ke `getServerSideProps` atau sebaliknya).