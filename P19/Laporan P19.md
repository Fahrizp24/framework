# Laporan Praktikum 19: Deployment Aplikasi Next.js ke Vercel
**Mata Kuliah:** Pemrograman Framework  
**Mahasiswa:** Fahri Zanuar Pradian
**Topik:** Deployment Aplikasi Next.js ke Vercel  

### Langkah 1: Membuat Repository GitHub
Membuat repositori baru di GitHub dan menghubungkannya dengan project Next.js di komputer lokal menggunakan perintah Git, kemudian melakukan push *initial deployment*.

### Langkah 2: Deployment ke Vercel
Melakukan import repositori dari GitHub ke layanan Vercel untuk memulai proses deployment production secara otomatis.
**Penyertaan Dokumentasi Langkah 2:**
Proses awal dimulai dengan menyiapkan project untuk deployment:
- Meninjau dashboard untuk memuat project baru dari repository.
  ![Config Project Vercel](assets/2%20-%201.png)
- Melakukan pendefinisian root direktori yang menjadi target sebelum di-*import*.
  ![Root Directory](assets/2%20-%20.png)
- Menjalankan *build* dan *deployment* dari *source code* pada halaman deploy.
  ![Deployment Process](assets/2%20-%203.png)
- Memantau log proses pembangunan aplikasi yang sedang berjalan pada Vercel `Deploying`.
  ![Deployment Log](assets/2%20-%204.png)
- *Deployment* telah selesai dengan status `Congratulations!`, namun di tahap ini masih belum menyesuaikan API sehingga mungkin timbul sebagian *error* ketika dijalankan.
  ![Dashboard Congratulations](assets/2%20-%205.png)

### Langkah 3: Mengatasi Error Build (SSG ke SSR)
Mengubah strategi rendering dari Static Site Generation (SSG) menjadi Server Side Rendering (SSR) pada halaman `[produk].tsx` dan `server.tsx` agar Vercel tidak gagal melakukan *fetch* data ke *localhost* saat proses build.
**Penyertaan Dokumentasi Langkah 3:**
Setelah *deploy*, ditemui ada masalah pada rute dinamis (SSG) karena API belum menyesuaikan host production:
- Ditemukan adanya *error* akibat SSG yang gagal *fetch* API ke *localhost* saat *build* dilakukan oleh Vercel.
  ![Error Vercel 1](assets/3%20-%201.png)
- Terdapat detail *Type Error* pada Vercel logs yang menyatakan gagalnya *fetch* ke rute dinamis karena dependensi *localhost* tidak beroperasi di sisi *server remote*.
  ![Error Vercel 2](assets/3%20-%202.png)
- Melakukan perubahan pada kode (penggantian `getStaticProps` menjadi `getServerSideProps`) di komponen `[produk].tsx` untuk mengatur *fetching* pada setiap permintaan.
  ![Fix Code](assets/3%20-%203.png)
- Menyimpan pembaruan tersebut pada *commit* berikutnya dan Vercel langsung secara otomatis memicu *rebuild* dengan hasil *Success*.
  ![Rebuild Success](assets/3%20-%204.png)

### Langkah 4: Menambahkan Environment Variable
Menambahkan variabel `NEXT_PUBLIC_API_URL` ke menu *Environment Variables* di dashboard Vercel agar URL API menjadi dinamis dan menyesuaikan domain *production*. Melakukan *redeploy* agar pengaturan baru terbaca.
**Penyertaan Dokumentasi Langkah 4:**
- Menavigasi ke menu **Settings > Environment Variables** lalu menambahkan key `NEXT_PUBLIC_API_URL` dengan *value* domain Vercel.
  ![Input Environment Variable](assets/4%20-%201.png)
- Melakukan proses *redeploy* aplikasi dalam antrean untuk menyelaraskan pengaturan variabel lingkungannya.
  ![Redeploy Aplikasi](assets/4%20-%202.png)

### Langkah 5: Konfigurasi Google OAuth Production
Menambahkan domain Vercel ke dalam daftar *Authorized JavaScript origins* dan *Authorized redirect URIs* di Google Cloud Console, serta memperbaiki tipe *button* login agar fitur autentikasi Google dapat berjalan sempurna di *production*. 

### Langkah 6: Pengujian Setelah Deployment
Menguji jalannya aplikasi pada URL Vercel untuk memastikan Server Side Rendering (SSR) berfungsi, database terkoneksi, serta pengujian integrasi login Google.
**Dokumentasi Pengujian Langkah 6:**
Berikut adalah uji sistem secara keseluruhan dari URL production:
- **Mengetes Beranda (*Home*)**: Halaman depan terakses dengan sempurna.
  ![Uji Home](assets/5%20Uji%20Home.png)
- **Mengetes *About Page***: Tampilan rute antar komponen berjalan mulus ter-*render*.
  ![Uji About](assets/5%20Uji%20About%20Page.png)
- **Mengetes *Products***: Daftar produk ter-*fetch* dan termuat sesuai data secara *real-time* berkat implementasi SSR.
  ![Uji Produk](assets/5%20Uji%20Produk%20Page.png)
- **Mengetes Login Kredensial**: Memeriksa *login* menggunakan layanan biasa dengan *email* dan *password* valid.
  ![Uji Login Biasa](assets/5%20Uji%20Login%20biasa.gif)
- **Mengetes Login Google Auth**: Integrasi Auth Provider mengarahkan pengguna secara tepat dari dan ke OAuth Consent Screen.
  ![Uji Login Google](assets/5%20Uji%20Login%20google.gif)
- **Mengetes Sesi Profil**: Sesi *login* terotorisasi yang menampilkan informasi ke profil klien *user*.
  ![Uji Profile](assets/5%20Uji%20Profile.png)

---

### E. Hasil Tugas Praktikum

**Tugas 1: Deploy project Next.js ke Vercel**
Project berhasil di-deploy melalui dashboard Vercel dengan mengaitkannya ke GitHub repository.
![Dashboard Vercel](assets/2%20-%205.png)

**Tugas 2: Pastikan API tidak menggunakan localhost**
Telah dikonfigurasi menggunakan `process.env.NEXT_PUBLIC_API_URL` pada kode pemanggilan `fetch`, sehingga API memanggil URL Vercel, bukan localhost.
![Environment Variable API](assets/4%20-%201.png)

**Tugas 3: Konfigurasikan Google OAuth production**
Domain Vercel telah didaftarkan pada Google Cloud Console untuk OAuth 2.0 Client ID.
![Google Login Berhasil](assets/5%20Uji%20Login%20google.gif)

**Tugas 4: Lakukan minimal 1 redeploy**
Redeploy telah berhasil dijalankan melalui opsi *Deployment -> Redeploy* pada Vercel setelah menyetel Environment Variable.
![Redeploy API](assets/4%20-%202.png)

**Tugas 5: Dokumentasi Deployment**
Berikut adalah bukti deployment project pada URL *production* dengan kapabilitas penuh Next.js seperti optimasi koneksi *real-time*:
![Uji Keseluruhan Aplikasi](assets/5%20Uji%20Produk%20Page.png)
*(Aplikasi yang *deployed* dapat menjalankan fungsi SSR dan Auth Provider dengan mulus)*

---

### F. Pertanyaan Evaluasi

**1. Mengapa localhost tidak boleh digunakan di production?**
Karena localhost merujuk pada mesin lokal tempat kode berjalan. Saat berada di Vercel (production), "localhost" akan mencari database di dalam server Vercel itu sendiri, bukan di komputer *developer*, sehingga akses data akan gagal.

**2. Mengapa SSG bisa gagal saat build?**
SSG melakukan proses *fetching* data saat aplikasi sedang di-*build*. Jika di dalam kode masih menggunakan target API "localhost", Vercel tidak akan bisa mendapatkan data tersebut karena server localhost milik *developer* tidak terhubung ke Vercel.

**3. Apa perbedaan SSR dan SSG saat deployment?**
SSG (*Static Site Generation*) memproses dan mengambil data hanya satu kali pada saat tahap *build*. SSR (*Server Side Rendering*) akan mengambil data secara real-time dari API setiap kali ada *request* (saat URL diakses pengguna).

**4. Mengapa perlu redeploy setelah menambahkan environment?**
Environment Variables disuntikkan ke dalam aplikasi pada fase *build*. Agar Vercel mengenali dan memasukkan variabel (seperti URL API) yang baru ditambahkan, aplikasi wajib di-redeploy (dibuild ulang).

**5. Apa fungsi redirect URI pada OAuth?**
Fungsinya adalah sebagai titik kembali yang diizinkan (callback). Setelah pengguna berhasil memasukkan kredensialnya di halaman Google, Google akan mengembalikan pengguna beserta data autentikasinya secara aman menuju halaman/alamat yang disetel pada Redirect URI tersebut.

---

### G. Kesimpulan
* Deployment aplikasi Next.js membutuhkan penyesuaian strategi *data fetching*; penggunaan SSR (*Server Side Rendering*) lebih direkomendasikan ketimbang SSG apabila sumber data bersifat *real-time* atau API belum bisa diakses secara publik pada masa *build*.
* Manajemen *Environment Variable* sangat penting untuk menghindari praktik *hardcode* dan membedakan URL API antara tahap pengembangan (lokal) dan tahap *production* (Vercel).
* Fitur keamanan pihak ketiga seperti Google OAuth mewajibkan integrasi *Authorized Origins* dan *Redirect URIs* yang spesifik untuk menjamin keamanan akses hanya dari domain yang didaftarkan.