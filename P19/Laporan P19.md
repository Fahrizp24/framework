# Laporan Praktikum 19: Deployment Aplikasi Next.js ke Vercel
**Mata Kuliah:** Pemrograman Framework  
**Mahasiswa:** Fahri Zanuar Pradian
**Topik:** Deployment Aplikasi Next.js ke Vercel  

### Langkah 1: Membuat Repository GitHub
Membuat repositori baru di GitHub dan menghubungkannya dengan project Next.js di komputer lokal menggunakan perintah Git, kemudian melakukan push *initial deployment*. mengganti dari static to server side rendering pada kode yang dilakukan sebelumnya untuk menghindari *error build* akibat penggunaan `getStaticProps` yang mengandalkan API pada saat pembuatan halaman.

### Langkah 2: Deployment ke Vercel
Melakukan import repositori dari GitHub ke layanan Vercel untuk memulai proses deployment *production*.
**Penyertaan Dokumentasi Langkah 2:**
- Meninjau *dashboard* Vercel untuk memuat project baru dengan meng-*import* repository GitHub.
  ![Config Project Vercel](assets/2%20-%201.png)
- Melakukan penyesuaian pada pengaturan *Build and Output Settings*, termasuk mengatur *Install Command* agar menggunakan `npm install --force`.
  ![Build and Output Settings](assets/2%20-%20.png)
- Proses *deployment* awal berhasil dijalankan dan menampilkan halaman `Congratulations!`.
  ![Deployment Process](assets/2%20-%203.png)
- Memantau halaman *Production Deployment* yang menunjukkan status `Ready` dari proses sebelumnya beserta riwayat sumber *commit* utama.
  ![Production Deployment Dashboard](assets/2%20-%204.png)
- Aplikasi berhasil diakses secara publik pada URL awal yang disediakan Vercel.
  ![Tampilan Awal Aplikasi](assets/2%20-%205.png)

### Langkah 3: Menambahkan Environment Variable
Menambahkan variabel lingkungan (Environment Variables) agar URL API dapat dibaca secara dinamis dan tidak terpaku pada localhost saat aplikasi berada di Vercel.
**Penyertaan Dokumentasi Langkah 3:**
- Membuka halaman *Environment Variables* di pengaturan Vercel. Pada saat awal, belum ada variabel yang ditetapkan.
  ![Empty Environment Variables](assets/3%20-%201.png)
- Mengunggah nilai dari file `.env.local` lokal untuk diimpor atau disalin secara manual ke Vercel.
  ![Import env local](assets/3%20-%202.png)
- Menambahkan key `NEXT_PUBLIC_API_URL` dengan *value* yang mengarah pada domain *production* aplikasi di Vercel (contoh: `https://product-catalog-webapp-nextjs.vercel.app` tanpa garis miring di akhir).
  ![Input Environment Variable](assets/3%20-%203.png)
- Sistem memunculkan notifikasi `Added Environment Variable successfully` yang menyatakan bahwa aplikasi harus di-*redeploy* agar variabel yang baru saja ditambahkan dapat diaktifkan dalam *build* selanjutnya.
  ![Redeploy Notification](assets/3%20-%204.png)

### Langkah 4: Konfigurasi Google OAuth Production
Menambahkan domain Vercel ke dalam daftar kredensial Google Cloud Console agar fitur autentikasi (*NextAuth*) via Google dapat berjalan pada lingkungan *production*. 
**Penyertaan Dokumentasi Langkah 4:**
- Mendaftarkan URL beranda Vercel pada kolom *Authorized JavaScript origins*.
  ![Authorized JavaScript origins](assets/4%20-%201.png)
- Mendaftarkan endpoint panggil balik (*callback*) NextAuth untuk Google pada kolom *Authorized redirect URIs* (yaitu `<url>/api/auth/callback/google`).
  ![Authorized redirect URIs](assets/4%20-%202.png)

### Langkah 5: Pengujian Setelah Deployment
Menguji jalannya aplikasi secara menyeluruh pada URL Vercel untuk memastikan Server Side Rendering (SSR) berfungsi, serta memeriksa kelancaran otorisasi menggunakan otentikasi reguler maupun Google.
**Dokumentasi Pengujian Langkah 5:**
Berikut adalah uji sistem secara keseluruhan dari URL *production*:
- **Mengetes Beranda (*Home*)**: Halaman depan terakses dengan sempurna di domain Vercel.
  ![Uji Home](assets/5%20Uji%20Home.png)
- **Mengetes *About Page***: Tampilan rute antar komponen berjalan mulus ter-*render*.
  ![Uji About](assets/5%20Uji%20About%20Page.png)
- **Mengetes *Products***: Daftar produk ter-*fetch* dan termuat sesuai data API karena penanganan SSR sudah dapat menggunakan Base URL yang tepat (*environment variable* Vercel).
  ![Uji Produk](assets/5%20Uji%20Produk%20Page.png)
- **Mengetes Login Kredensial**: Memeriksa *login* menggunakan layanan biasa dengan *email* dan *password* valid.
  ![Uji Login Biasa](assets/5%20Uji%20Login%20biasa%20.gif)
- **Mengetes Login Google Auth**: Integrasi Auth Provider mengarahkan pengguna secara tepat dari dan ke layar persetujuan Google (*Google Consent Screen*).
  ![Uji Login Google](assets/5%20Uji%20Login%20google.gif)
- **Mengetes Sesi Profil**: Sesi *login* terotorisasi yang menampilkan informasi pengguna yang berhasil masuk (seperti nama, email, dan foto Google).
  ![Uji Profile](assets/5%20Uji%20Profile.png)

---

### E. Hasil Tugas Praktikum

**Tugas 1: Deploy project Next.js ke Vercel**
Project berhasil di-deploy melalui dashboard Vercel dengan status `Ready` dari repository GitHub.
![Dashboard Vercel Status](assets/2%20-%204.png)

**Tugas 2: Pastikan API tidak menggunakan localhost**
Telah dikonfigurasi menggunakan variabel `NEXT_PUBLIC_API_URL` yang berisi rute URL ke domain Vercel itu sendiri melalui menu Environment Variables.
![Environment Variable API](assets/3%20-%203.png)

**Tugas 3: Konfigurasikan Google OAuth production**
Domain Vercel dan *callback URI* barunya telah didaftarkan pada Google Cloud Console untuk OAuth 2.0 Web Application Client-ID.
![Google OAuth URI](assets/4%20-%202.png)

**Tugas 4: Lakukan minimal 1 redeploy**
Redeploy telah berhasil dijalankan sebagai reaksi atas perubahan pada penetapan nilai Environment Variable.
![Redeploy API](assets/3%20-%204.png)

**Tugas 5: Dokumentasi Deployment**
Telah didokumentasikan di atas. Aplikasi telah memiliki kapabilitas untuk mengambil *fetch* produk menggunakan SSR, serta *login* SSO via Google dan Credentials berjalan tanpa ada kebocoran di lingkungan lokal.
![Uji Keseluruhan Aplikasi](assets/5%20Uji%20Produk%20Page.png)

---

### F. Pertanyaan Evaluasi

**1. Mengapa localhost tidak boleh digunakan di production?**
Karena localhost merujuk pada mesin atau kontainer tempat kode itu berjalan. Saat aplikasi diluncurkan di Vercel (environment production), alamat "localhost" akan mencari database/API yang sama di dalam server internal Vercel itu sendiri, bukan di komputer *developer*. Karena server API berada di luar dan tidak menyatu dengan lingkungan server Vercel, pemanggilan data menjadi gagal.

**2. Mengapa SSG bisa gagal saat build?**
SSG (*Static Site Generation*) secara prinsip akan memanggil layanan *fetching* data (seperti `getStaticProps`) pada tahapan instalasi/pembuildan aplikasi itu sendiri. Jika di dalam kode API merujuk ke target "localhost", maka saat Vercel melakukan *build*, server Vercel kesulitan melakukan *fetching* karena tidak mendapati berjalannya penyedia layanannya di port lokal tersebut.

**3. Apa perbedaan SSR dan SSG saat deployment?**
SSG memproses halaman HTML dan segala pengambilan datanya sebanyak satu kali saat tahap kompilasi (*build time*), lalu menyajikannya dalam bentuk statis yang cepat. Pada SSR (*Server Side Rendering*), perenderan dan *fetching* data dilakukan oleh server secara terpusat dan berulang kali / *real-time* sesuai dengan permintaan klien (*request time*).

**4. Mengapa perlu redeploy setelah menambahkan environment?**
Environment Variables di Next.js (terutama yang diekspos maupun tidak) pada umumnya disuntikkan dan dibaca pada eksekusi tahapan *build*. Sistem file aplikasi yang dihostingkan tidak bisa mem-parsing data baru dari Vercel secara *hot-reload*. Oleh sebab itu, aplikasi wajib *redeploy* (*build* ulang seluruh berkas source code) guna menanam kembali nilainya.

**5. Apa fungsi redirect URI pada OAuth?**
Fungsinya adalah sebagai titik destinasi (*callback*) rahasia dan aman. Setelah pengguna memvalidasi alamat profil melalui pusat layar halaman otentikasi Google, kredensial tersebut dikirimkan kembali (di-*redirect*) sebagai token otentikasi agar web memverifikasi status *login*. Karena harus diamankan dari penyerang, redirect URI perlu diawasi dengan ketat di konfigurasi cloud console.

---

### G. Kesimpulan
* Konfigurasi dasar untuk memindah environment lokal ke public seperti Vercel mutlak memikirkan alur pergantian basis Base URL API.
* Modifikasi fungsi *fetching* mungkin seringkali diperlukan karena keterbatasan kompilasi Vercel (pengubahan SSG ke SSR atau perlakuan *fallback*) agar tak gagal pada masa *build*.
* Manajemen *Environment Variable* amat diperlukan agar mencegah penyimpanan token sensitif atau pergantian domain API secara langsung (*hardcord*) di dalam *source code*.
* Integrasi *OAuth Provider* untuk lingkungan riil membutuhkan pembaharuan terhadap parameter keamanan, termasuk meregistrasikan URI domain Vercel agar dapat diotoritaskan oleh sistem server Google.