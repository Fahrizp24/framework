# Laporan Praktikum 11: Incremental Static Regeneration (ISR)
Mata Kuliah: Pemrograman Framework
Mahasiswa: Fahri Zanuar Pradian
Topik: Update Halaman Static Tanpa Build Ulang

## A. Implementasi ISR Otomatis (Bagian 1 - Tambahkan revalidate)
Pada langkah ini, dilakukan modifikasi pada file `static.tsx` untuk mengimplementasikan fitur *Incremental Static Regeneration* (ISR). Dengan menambahkan properti `revalidate: 10`, aplikasi diinstruksikan untuk melakukan *fetching* ulang data dari *background* setiap 10 detik sehingga halaman statis tetap responsif terhadap pembaruan database tanpa perlu *build* ulang.

![Sebelum 10 Detik](assets/C.%201%20–%20Tambahkan%20revalidate%20-%20sebelum%2010%20detik.png)
![Setelah 10 Detik](assets/C.%201%20–%20Tambahkan%20revalidate%20-%20setelah%2010%20detik.png)

## B. Pengujian ISR (Bagian 2 - Build & Start)
Langkah ini bertujuan untuk memastikan rute yang di-build telah mengadopsi fitur ISR dengan menjalankan perintah build dan mengecek log di terminal. Terdapat indikator berupa dot peluru dan waktu revalidasi di sebelah *path* `/produk/static` yang mengonfirmasi bahwa halaman tersebut kini semi-dinamis.

![Hasil Build Terminal](assets/C.%202%20–%20Pengujian%20ISR%20.png)

## C. On-Demand Revalidation (Parameter Data)
Karena mekanisme ISR berbasis waktu terkadang mengalami penahanan *cache*, dibuatlah fitur *On-Demand Revalidation* melalui file *endpoint* API. *Endpoint* ini memicu pembaruan halaman secara manual dengan menambahkan pengecekan *query parameter* `data=produk` agar tidak sembarang *request* dieksekusi.

![Parameter Benar](assets/D.%202%20–%20Tambahkan%20Parameter%20Data%20.png)
![Parameter Salah](assets/D.%202%20–%20Tambahkan%20Parameter%20Data%20salah.png)

## D. Tambahkan Token Security
Untuk mengamankan API pembaruan *cache* dari serangan sembarang pengguna, diimplementasikan perlindungan berbasis Token. Token unik disimpan di dalam *environment variables* dan dicocokkan dengan *query parameter* token yang dikirim pengguna pada *endpoint* revalidasi.

## E. Hasil Tugas Praktikum

**Tugas 1 & 2: Tambah/Hapus Produk & Implementasi revalidate**
Pengujian penghapusan produk di Firebase membuktikan bahwa *cache* berfungsi menahan data lama. Setelah halaman di-refresh dan dipicu pembaruannya, produk tersebut berhasil hilang dari daftar antarmuka statis.

![Sebelum Menghapus](assets/Tugas%201%20sebelum%20menghapus%20dan%20refresh%20halaman.png)
![Setelah Menghapus](assets/Tugas%201%20setelah%20menghapus%20dan%20refresh%20halaman.png)

**Tugas 3, 4, & 5: Pengujian Endpoint Token Security**
Pengujian *On-Demand Revalidation* menunjukkan hasil respons JSON yang sesuai dengan logika validasi token:
* **Dengan Token Benar:**
    ![Token Benar](assets/E.%20Pengujian%20Manual%20Revalidation%20token%20benar.png.png)
* **Tanpa Token:**
    ![Tanpa Token](assets/E.%20Pengujian%20Manual%20Revalidation%20tanpa%20token.png)
* **Dengan Token Salah:**
    ![Token Salah](assets/E.%20Pengujian%20Manual%20Revalidation%20token%20salah.png)

## F. Pertanyaan Evaluasi

**1. Mengapa ISR lebih fleksibel dibanding SSG?**
ISR memberikan fleksibilitas dengan menggabungkan kecepatan *load* halaman statis (SSG) dengan kemampuan perbarui data ala SSR. ISR memungkinkan halaman statis untuk diregenerasi secara spesifik di *background* tanpa mengharuskan sistem untuk melakukan proses *build* ulang pada semua rute secara keseluruhan.

**2. Apa perbedaan revalidate waktu dan on-demand?**
Revalidate waktu (*Time-based*) memicu pembaruan halaman secara otomatis berdasarkan jadwal durasi interval detik yang ditetapkan pada kode saat ada pengunjung yang mengaksesnya. Sedangkan *On-Demand Revalidation* (*Event-based*) memicu pembaruan *cache* halaman secara instan di saat itu juga melalui panggilan API spesifik.

**3. Mengapa endpoint revalidation harus diamankan?**
Proses meregenerasi halaman mengonsumsi sumber daya komputasi (CPU, memori) dan memicu panggilan ke Database / API. Jika *endpoint* dibiarkan terbuka, pihak yang tidak bertanggung jawab dapat mengeksploitasinya (*spam request*), yang akan berakibat pada perlambatan performa aplikasi dan *over-limit* pembacaan data di database.

**4. Apa risiko jika token tidak digunakan?**
Risiko utamanya adalah potensi kerentanan terhadap serangan *Denial of Service* (DoS) sederhana. Siapapun yang mengetahui URL *endpoint* tersebut dapat secara bebas memaksa server melakukan pembaruan *cache* berulang-ulang, yang akan memicu lonjakan biaya tagihan layanan Database dan membebani server.

**5. Kapan ISR lebih cocok dibanding SSR?**
ISR sangat cocok diimplementasikan untuk situs web atau halaman yang menyajikan data publik/semi-dinamis di mana *load time* dan indeksasi SEO sangat krusial, seperti blog, katalog produk, atau halaman *landing page*. SSR lebih cocok untuk data yang sifatnya privat, interaktif, dan mutlak harus selalu baru di setiap pemuatan.

## G. Kesimpulan
1. **Incremental Static Regeneration (ISR)** mengatasi masalah utama pada teknik SSG konvensional dengan menghadirkan mekanisme sinkronisasi data yang diperbarui di balik layar (*background regeneration*).
2. Terdapat dua metode ISR di Next.js: berbasis **waktu (interval detik)** untuk *update* otomatis, dan berbasis **On-Demand** untuk *update* *cache* secara instan.
3. Fitur *On-Demand Revalidation* wajib dilapisi **Token Keamanan (Security Token)** untuk memblokir intervensi penghapusan *cache* oleh lalu lintas yang tidak sah.
4. ISR merupakan solusi ideal untuk menjembatani performa tinggi (SEO & Kecepatan *Load* ala Statis) dengan kebutuhan penyajian data terkini.