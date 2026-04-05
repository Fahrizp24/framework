# Laporan Praktikum 18: Implementasi Unit Testing pada Next.js menggunakan Jest
**Mata Kuliah:** Pemrograman Framework
**Mahasiswa:** Fahri Zanuar Pradian
**Topik:** Implementasi Unit Testing pada Next.js menggunakan Jest

### Praktikum 1 - Setup Jest di Next.js
Melakukan instalasi pustaka Jest beserta *testing library* React. Menginisialisasi file `jest.config.mjs` di dalam direktori *root* agar Next.js mengenali ekosistem pengujian Jest, lalu mengatur perintah singkat (`scripts`) di `package.json`.

### Praktikum 2 - Struktur Folder Testing
Membuat folder mandiri `src/__test__/` yang difungsikan sebagai wadah repositori utama semua skrip pengujian agar tidak bercampur dengan kode program (*source code*) utama.

### Praktikum 3 - Testing Halaman About
Membuat skrip pengujian awal dengan pendekatan *Snapshot Test* pada komponen AboutPage untuk menguji proses *rendering* dasar komponen tersebut.

![Testing Halaman About](<assets/3 – Testing Halaman About.png>)

### Praktikum 4 - Coverage Report
Mengeksekusi perintah tes beserta pelaporan cakupan baris kode. Laporan tersebut divisualisasikan dalam bentuk antarmuka web (HTML) untuk menginspeksi metrik penyelesaian pengujian.

![Coverage Report 1](<assets/4 – Coverage Report.png>)
![Coverage Report 2](<assets/4 – Coverage Report 2.png>)

### Praktikum 5 - Konfigurasi Coverage Lengkap
Melakukan *refactoring* pada file `jest.config.mjs` guna mengeksklusikan beberapa folder (seperti node_modules dan .next) dari perhitungan utilitas cakupan (coverage) sehingga laporan merepresentasikan data yang akurat.

![Konfigurasi Coverage 1](<assets/5 – Konfigurasi Coverage Lengkap 1.png>)
![Konfigurasi Coverage 2](<assets/5 – Konfigurasi Coverage Lengkap 2.png>)
![Konfigurasi Coverage 3](<assets/5 – Konfigurasi Coverage Lengkap 3.png>)

### Praktikum 6 - Testing dengan getByTestId
Menambahkan parameter pengujian berbasis seleksi DOM. Sebuah pengidentifikasi eksplisit berupa `data-testid` dilekatkan pada tag *heading* komponen AboutPage agar Jest dapat memverifikasi presisi konten teksnya.

![Testing getByTestId 1](<assets/6 – Testing dengan getByTestId 1.png>)
![Testing getByTestId 2](<assets/6 – Testing dengan getByTestId 2.png>)
![Testing getByTestId 3](<assets/6 – Testing dengan getByTestId 3.png>)

### Praktikum 7 - Testing Page dengan Router (Mocking)
Mengintegrasikan metodologi *mocking* pada skrip pengujian. Berhubung fungsi `useRouter` dari Next.js tidak didukung secara natif dalam ekosistem Jest DOM, sebuah versi rekayasa (*mock router*) dibuat agar halaman Product tidak memicu *error* saat dites.

![Testing Page dengan Router](<assets/7 – Testing Page dengan Router (Mocking) 1.png>)

### Praktikum 8 - Menangani Undefined Data
Menyelesaikan konflik pada fase pengujian (*crash*) di mana properti array seperti `.length` atau fungsi perulangan seperti `.map()` berhadapan dengan data *undefined* (data asinkron). Strategi perbaikan meliputi manipulasi nilai *fallback* dan pemanfaatan fitur *Optional Chaining* (`?.`).

![Menangani Undefined Data 1](<assets/8 – Menangani Undefined Data.png>)
![Menangani Undefined Data 2](<assets/8 – Menangani Undefined Data 2.png>)

---

### E. Hasil Tugas Praktikum

**Jawaban Pengerjaan Tugas Praktikum:**

**1. Membuat Unit Test untuk Halaman Product dan 1 Komponen**
- Pengujian untuk **Halaman Product** sukses ditambahkan dalam wadah `src/_test_/pages/product.spec.tsx` maupun berkas bersarang pendukung secara menyeluruh.
- Beberapa *test runner* **komponen tambahan** juga telah diafiliasikan seperti pada komponen UI (`views/produk`) dan modul utama *Layout* (`navbar`, `Appshell`).

**2. Penggunaan minimal 1 Snapshot test, 1 toBe(), dan 1 getByTestId()**
- **Snapshot Test:** Diimplementasikan masif pada file *testing* yang difungsikan mendeteksi pergeseran integritas bentuk HTML komponen (`toMatchSnapshot()`).
- **`toBe()` & `getByTestId()`:** Keduanya disatukan secara komprehensif *(chaining)* di dalam berkas tes `TampilanProduk.spec.tsx` untuk melakukan pencarian *node header* yang disematkan test-identity `data-testid="title"` dan mencocokkan kemurnian isi konten berupaa ekspektasi string `"Daftar Produk"`.

**3. Membuat coverage minimal 50%**
Unit *test cases* di-genjot pada sub-direktori *controller* krusial (`src/pages` dan `src/components`). Hasil metrik pelaporan utilitas Jest mendeteksi kalkulasi akumulatif `% Lines` keseluruhan beranjak melampaui rentang stabil **>50%** (khusus folder page statis mendapat rapor hijau nyaris 100%).

**4. Melakukan mocking untuk router**
Fitur rekayasa *fictitious runtime* API eksternal via sintaks `jest.mock('next/router')` senantiasa diusut penggunaannya pada laman yang melangsungkan instansiasi *hooks* `useRouter()`. Contoh aplikatif nampak pada penyelesaian kegagalan eksekusi tes di `blog/[slug].tsx` beserta integrasi NextAuth (halaman otentikasi login/register).

**5. Mendokumentasikan Hasil Coverage**
Berikut merupakan kompilasi bukti dokumentasi dari validasi pengujian *codebase*:

![Bukti Menambahkan Test](<assets/Tugas 1 menambahkan 1 komponen test.png>)
![Bukti Target Coverage 1](<assets/Tugas 3 t coverage minimal 50%25 2.png>)
![Bukti Target Coverage 2](<assets/Tugas 3 t coverage minimal 50%25.png>)

---

### F. Pertanyaan Evaluasi

**1. Mengapa unit testing penting sebelum production?**
Unit testing bertindak sebagai mekanisme preventif awal. Ia memvalidasi struktur terkecil dari program secara fungsional. Hal ini mencegah *bug* masuk ke rantai perilisan, menggaransi integritas logika, serta meringankan biaya perbaikan masalah di fase *post-deployment*.

**2. Mengapa branch coverage sulit mencapai 100%?**
*Branch Coverage* menuntut setiap lajur pengambilan keputusan program (misal blok `if/else`, *switch-case*) untuk dijalankan setidaknya satu kali selama *testing*. Kondisi *edge case*, validasi error yang spesifik, dan interaksi data dinamis mengharuskan pembuatan unit tes individual yang sangat banyak sehingga menyentuh angka 100% sangat menyita durasi pengembangan (kurang proporsional).

**3. Apa itu mocking?**
*Mocking* adalah replikasi palsu dari prosedur riil yang memiliki dependensi eksternal. Mekanisme ini memblokir fungsi asli (seperti HTTP Request ke API atau eksekusi fungsi Router) dan menukarnya dengan objek fiktif (*dummy*). Tujuannya agar fokus uji terkunci hanya pada efikasi internal dari unit bersangkutan.

**4. Kapan snapshot test digunakan?**
Pengujian *Snapshot* paling tepat dikonfigurasi untuk memvalidasi elemen antarmuka (*User Interface*) yang bersifat statis. Teknik ini berfungsi merekam struktur arsitektur UI sebagai titik awal referensi; jika kelak terjadi perubahan HTML struktural yang tidak terduga akibat pembaruan kode, Jest otomatis akan mendeteksi dan memberi *alert*.

**5. Apakah semua file harus dites?**
Tidak direkomendasikan. File berorientasi deklarasi seperti konfigurasi aplikasi (*config files*), penamaan tipe data statis (*typing declarations*), modul eksternal, dan antarmuka *backend API* tidak tergolong target validasi Unit Test pada *Front-End*. Standar industri komersial lebih mendahulukan *coverage* komponen interaktif pada batasan rasional (sekitar 80%).

---

### G. Kesimpulan
1. Praktikum ini memberikan pemahaman mendasar bahwa implementasi Jest pada ekosistem Next.js memerlukan injeksi pustaka secara spesifik serta modifikasi file `jest.config` agar sejalan dengan karakteristik kompilator (compiler) bawaan Next.
2. Penggunaan fitur `jest.mock()` merupakan fondasi vital di Next.js, karena elemen bawaan seperti manipulasi alamat URL (routing) akan memicu *fatal error* bila tidak direkayasa saat beroperasi dalam *Runtime* Node.js untuk Testing.
3. Unit testing memaksa seorang pengembang (developer) untuk merancang struktur program yang lebih aman (*fail-safe*); contohnya dengan membiasakan praktik *conditional rendering* dan *optional chaining* (`?.`) pada operasi data dinamis yang sangat berguna untuk mencegah aplikasi meledak akibat kekeliruan inisialisasi data di tahapan *render*.