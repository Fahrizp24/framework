# Laporan Praktikum 4: Styling pada Next.js

**Mata Kuliah:** Pemrograman Framework  
**Mahasiswa:** Fahri Zanuar Pradian  
**Topik:** Teknik Styling pada Next.js (Pages Router)

---

## 1. Global CSS
Langkah pertama melibatkan penggunaan Global CSS yang diatur melalui file `globals.css` dan di-import ke dalam `_app.tsx` agar berlaku untuk seluruh aplikasi.

![1. Global CSS](assets/1.%20Global%20CSS.png)

## 2. CSS Module (Local Scope)
Implementasi CSS Module bertujuan untuk membatasi cakupan style agar hanya berlaku pada komponen tertentu secara lokal. Pada tahap ini, komponen Navbar menggunakan file `navbar.module.css` untuk menghindari konflik class dengan komponen lain.

![2. CSS Module (Local Scope)](assets/2.%20CSS%20Module%20(Local%20Scope).png)

## 3. Styling untuk Pages (CSS Module)
Teknik CSS Module juga diterapkan pada level halaman, contohnya pada halaman Login. Hal ini memungkinkan setiap halaman memiliki identitas visual yang unik tanpa mempengaruhi halaman lainnya.

![3. Styling untuk Pages (CSS Module)](assets/3.%20Styling%20untuk%20Pages%20(CSS%20Module).png)

## 4. Conditional Rendering Navbar
Langkah ini mengatur tampilan Navbar agar tidak muncul pada halaman tertentu, seperti halaman Login dan Register, menggunakan objek `router` dari `next/router` untuk mendeteksi `pathname` saat ini.

![4. Conditional Rendering Navbar (Tanpa Navbar di Login)](assets/4.%20Conditional%20Rendering%20Navbar%20(Tanpa%20Navbar%20di%20Login).png)

## 5. Refactoring Struktur Project (Best Practice)
Refactoring dilakukan untuk merapikan struktur folder proyek dengan memisahkan antara logic routing di folder `pages` dan tampilan UI di folder `views`.

![5. Refactoring Struktur Project (Best Practice)](assets/5.%20Refactoring%20Struktur%20Project%20(Best%20Practice).png)
![5. Refactoring Struktur Project (Best Practice) 2](assets/5.%20Refactoring%20Struktur%20Project%20(Best%20Practice)%202.png)

## 6. Inline Styling (CSS-in-JS)
Penerapan Inline Styling digunakan untuk memberikan gaya secara langsung pada elemen JSX. Teknik ini menggunakan objek JavaScript dengan penulisan properti dalam format `camelCase`.

![6. Inline Styling (CSS-in-JS)](assets/6.%20Inline%20Styling%20(CSS-in-JS).png)

## 7. Kombinasi Global CSS + CSS Module
Praktikum ini menunjukkan bagaimana menggabungkan utility class dari Global CSS dengan style spesifik dari CSS Module dalam satu elemen untuk fleksibilitas desain yang lebih baik.

![7. Kombinasi Global CSS + CSS Module](assets/7.%20Kombinasi%20Global%20CSS%20+%20CSS%20Module.png)

## 8. SCSS (SASS)
Penggunaan SCSS memungkinkan pengelolaan style yang lebih scalable dengan fitur-fitur seperti variabel dan nesting rule. Variabel warna disimpan dalam file `colors.scss` untuk memudahkan pemeliharaan warna tema aplikasi.

![8. SCSS](assets/8.%20SCSS.png)

## 9. Tailwind CSS
Tahap terakhir adalah integrasi Tailwind CSS, sebuah framework utility-first CSS. Teknik ini memungkinkan styling yang sangat cepat dan konsisten langsung pada atribut class elemen HTML.

![9. Tailwind CSS](assets/9.%20Tailwind%20CSS.png)

---

## 10. Hasil Tugas Praktikum

### Tugas 1: Halaman Register (CSS Module & SCSS)
Membuat halaman Register dengan struktur folder `views` menggunakan CSS Module dan implementasi SASS untuk manajemen variabel warna.

![10. Tugas 1](assets/Tugas%201.png)

### Tugas 2 & 3: Refactoring Produk & Tailwind CSS
Melakukan refactoring pada halaman produk dengan memisahkan komponen menjadi `Hero` dan `Main` section, serta menerapkan minimal 5 utility class Tailwind CSS.

![10. Tugas 2 & 3](assets/Tugas%202%20dan%203.png)

---

## F. Pertanyaan Refleksi

1. **Kapan sebaiknya menggunakan CSS Module dibanding Global CSS?**
   CSS Module digunakan saat ingin membuat gaya yang spesifik untuk satu komponen (local scope) agar tidak bentrok antar class, sedangkan Global CSS digunakan untuk utility umum yang berlaku di seluruh aplikasi.

2. **Apa kelemahan inline styling?**
   Inline styling tidak disarankan untuk layout besar karena sulit dikelola, tidak mendukung pseudoclass (seperti :hover), dan membuat kode JSX terlihat kurang rapi.

3. **Mengapa SCSS cocok untuk project skala besar?**
   Karena SCSS memiliki fitur Variable untuk konsistensi warna/font, Nested rule agar struktur CSS mengikuti HTML, dan fitur modularitas yang membuatnya mudah di-maintain.

4. **Apa keunggulan Tailwind dibanding CSS tradisional?**
   Tailwind memungkinkan proses styling yang cepat dan konsisten karena menggunakan utility class, sehingga pengembang tidak perlu berpindah-pindah file CSS dan ukuran file CSS akhir cenderung lebih kecil.

---

## G. Kesimpulan
Next.js memberikan fleksibilitas penuh dalam styling yang dapat disesuaikan dengan kebutuhan proyek:
* **Global CSS** untuk dasar aplikasi.
* **CSS Module** untuk keamanan style komponen.
* **SCSS** untuk skalabilitas tingkat tinggi.
* **Tailwind CSS** untuk efisiensi kecepatan development.