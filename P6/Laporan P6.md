# Laporan Praktikum 5: Custom Document dan Custom Error Page

**Mata Kuliah:** Pemrograman Framework  
**Mahasiswa:** Fahri Zanuar Pradian  
**Topik:** Custom Document dan Custom Error Page pada Next.js (Pages Router)

---

## 2. Membuat Custom Document
Langkah ini melibatkan pembuatan file `_document.tsx` (atau `.js`) untuk memodifikasi struktur dasar HTML secara global. Pada tahap ini, tag HTML diatur dengan atribut bahasa Indonesia (`lang="id"`).

![2. Membuat Custom Document](assets/2%20–%20Membuat%20Custom%20Document.png)

## 3. Pengaturan Title per Halaman
Implementasi pengaturan judul (title) menggunakan komponen `<Head>` dari `next/head`. Hal ini memungkinkan setiap halaman memiliki judul tab browser yang berbeda dan spesifik sesuai dengan kontennya.

![3. Pengaturan Title per Halaman](assets/3%20–%20Pengaturan%20Title%20per%20Halaman.png)

## 4. Membuat Custom Error Page (404)
Next.js menyediakan mekanisme untuk menangani rute yang tidak ditemukan dengan membuat file `404.tsx` di dalam folder `pages`. Halaman ini akan secara otomatis ditampilkan ketika user mengakses URL yang tidak valid.

![4. Membuat Custom Error Page (404)](assets/4%20-%20Membuat%20Custom%20Error%20Page%20(404).png)

## 5. Styling Halaman 404
Halaman error 404 diberikan styling khusus menggunakan CSS Module (`404.module.scss`). Styling ini mengatur elemen agar berada di tengah layar (menggunakan flexbox), ukuran font, serta penyesuaian layout agar lebih responsif.

![5. Styling Halaman 404](assets/5%20-%20Styling%20Halaman%20404.png)

## 6. Menampilkan Gambar dari Folder Public
Praktikum ini menunjukkan cara memanggil aset statis berupa gambar ilustrasi dari folder `public`. Pemanggilan dilakukan secara langsung melalui atribut `src` pada tag `<img>` tanpa harus menggunakan mekanisme `import` JavaScript.

![6. Menampilkan Gambar dari Folder Public](assets/6%20-%20Menampilkan%20Gambar%20dari%20Folder%20Public.png)

---

## 10. Hasil Tugas Praktikum

### Tugas 1: Konten Halaman 404 (Wajib)
Menambahkan judul halaman pada tab browser menggunakan `<Head>`, memberikan teks deskripsi singkat yang informatif, serta menampilkan gambar ilustrasi 404.

![Tugas 1](assets/Tugas%201.png)

### Tugas 2: Custom Layout dan Handling Navbar (Wajib)
Melakukan kustomisasi warna latar belakang (menjadi ungu) dan font, serta mengimplementasikan *conditional rendering* pada komponen `AppShell` agar Navbar utama **tidak tampil** ketika user berada di halaman 404.

![Tugas 2](assets/Tugas%202.png)

### Tugas 3: Navigasi Kembali ke Home (Pengayaan)
Menambahkan interaksi berupa tombol "Kembali ke Home" yang dibungkus dengan komponen navigasi `<Link>` dari Next.js untuk memungkinkan user kembali ke halaman utama (root) tanpa melakukan *full page reload*.

![Tugas 3](assets/Tugas%203.gif)

---

## F. Pertanyaan Evaluasi

1. **Apa fungsi utama `_document.js`?**
   Fungsi utamanya adalah untuk memodifikasi struktur dasar dokumen HTML (tag `<html>`, `<head>`, dan `<body>`) yang dikirimkan oleh server ke browser secara global.

2. **Mengapa `<title>` tidak disarankan di `_document.js`?**
   Karena `_document.js` bersifat statis dan berlaku global untuk seluruh aplikasi. Jika diletakkan di sana, judul tab browser tidak bisa diubah secara dinamis sesuai isi konten masing-masing halaman. Praktik terbaik adalah menggunakan komponen `next/head` di tiap file halaman.

3. **Apa perbedaan halaman biasa dan halaman `404.js`?**
   Halaman biasa dirouting berdasarkan nama file/folder spesifik yang dibuat oleh developer (misalnya `about.js` untuk `/about`). Sedangkan `404.js` adalah halaman khusus (*special route*) yang secara otomatis dirender oleh Next.js ketika user mencoba mengakses URL yang rutenya tidak terdaftar dalam aplikasi.

4. **Mengapa folder `public` tidak perlu di-import?**
   Karena Next.js secara otomatis melayani (serve) semua file statis yang diletakkan di dalam folder `public` langsung ke *root URL* (`/`). Oleh karena itu, file seperti gambar bisa langsung dipanggil melalui atribut sumbernya (contoh: `src="/gambar.png"`) tanpa membutuhkan proses *import module*.

---

## G. Kesimpulan
Next.js menyediakan mekanisme yang mudah dan terstruktur untuk mengelola konfigurasi metadata global maupun penanganan error:
* **`_document.tsx`** digunakan untuk mengontrol kerangka dasar dokumen HTML aplikasi.
* **Komponen `<Head>`** memberikan fleksibilitas SEO dan pengaturan informasi meta per halaman.
* **Halaman 404 Custom** meningkatkan *User Experience* (UX) dengan menyajikan tampilan error yang selaras dengan tema aplikasi saat rute tidak ditemukan.
* **Folder Public** sangat efisien untuk manajemen aset statis secara langsung.