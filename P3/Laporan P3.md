
# Laporan Praktikum JS4: Link & Navigation pada Next.js Pages Router

**Nama:** Fahri Zanuar Pradian
**NIM:** 2341720104  
**Kelas:** TI-3D 
**Mata Kuliah:** Pemrograman Framework 
---

## 1. Langkah 1 - Menjalankan Project
Server dijalankan menggunakan perintah `npm run dev`  dan diakses melalui `http://localhost:3000`.

## 2. Langkah 2 - Membuat Catch-All Route
Pembuatan folder `shop` dan file `[...slug].tsx`  dilakukan untuk menangkap banyak segmen URL secara dinamis Parameter URL diambil menggunakan `useRouter`  dan ditampilkan sebagai string yang digabungkan dengan tanda hubung.

**Hasil Running:**

![Langkah 2 - Membuat Catch-All Route](assets/2%20–%20Membuat%20Catch-All%20Route.png)

## 3. Langkah 3 - Pengujian Catch-All Route
Dilakukan pengujian dengan berbagai jumlah segmen URL untuk memastikan array parameter tertangkap dengan benar oleh `[...slug].tsx`.

**Hasil Pengujian Berbagai Segmen:**

![Langkah 3 - Pengujian Catch-All Route 1](assets/3%20–%20Pengujian%20Catch-All%20Route%20.png)

## 4. Langkah 4 - Optional Catch-All Route
File diubah menjadi `[[...slug]].tsx` (kurung siku ganda) agar halaman `/shop` tetap dapat diakses tanpa menghasilkan error 404 meskipun tidak ada parameter URL yang diberikan.

**Hasil Running:**

![Langkah 4 - Optional Catch-All Route](assets/4%20–%20Optional%20Catch-All%20Route%20.png)

## 5. Langkah 5 - Validasi Parameter
Menambahkan logika validasi pada halaman toko untuk menampilkan kategori utama (segmen pertama dari slug) atau pesan default jika kategori tidak tersedia.

**Hasil Running:**

![Langkah 5 - Validasi Parameter](assets/5%20–%20Validasi%20Parameter%20.png)

## 6. Langkah 6 - Membuat Halaman Login & Register
Pembuatan folder `auth` berisi file `login.tsx` dan `register.tsx`. Navigasi antar halaman dilakukan secara deklaratif menggunakan komponen `Link` dari `next/link`.

**Hasil Navigasi Link:**


https://github.com/user-attachments/assets/cec136b0-04a3-4d47-8b13-fb2a55d43e96


## 7. Langkah 7 - Navigasi Imperatif (router.push)
Implementasi navigasi menggunakan `router.push()` pada tombol login. Metode ini memungkinkan perpindahan halaman secara terprogram setelah aksi tertentu (seperti klik tombol) dilakukan.

**Hasil Navigasi Imperatif:**

https://github.com/user-attachments/assets/77376126-01b5-4486-a672-4b04420cf502


## 8. Langkah 8 - Simulasi Redirect (Belum Login)
Menambahkan proteksi pada halaman `/produk` menggunakan `useEffect`. Jika status login bernilai `false`, pengguna akan secara otomatis diarahkan kembali ke halaman login.

**Hasil Redirect:**

https://github.com/user-attachments/assets/1fd376ee-fbf4-42f4-97d7-bc92c7c7d5fa

---

## 9. Tugas Praktikum

### Tugas 1 (Wajib) - Catch-All Route Category
Membuat file `/category/[...slug].tsx` yang menampilkan seluruh parameter URL dalam bentuk list terurut.

**Hasil Running:**

![Tugas 1](assets/Tugas%201.png)

### Tugas 2 (Wajib) - Navigasi & Styling
Menerapkan navigasi dari Login ke Produk menggunakan metode imperatif `router.push()` serta mempercantik tampilan form login dan register dengan styling CSS.

**Hasil Running:**

https://github.com/user-attachments/assets/2b0b1614-27a3-4cdb-9d39-4d7ba4c08a14

### Tugas 3 (Bonus) - Proteksi Halaman Produk
Menambahkan proteksi pada halaman produk sehingga hanya dapat diakses jika status login bernilai `true`. Jika tidak, pengguna akan diarahkan kembali ke halaman login.

**Hasil Running:**



https://github.com/user-attachments/assets/482cab38-4f18-4f44-9891-e6551fe1e5bb



---

## 10. Pertanyaan Evaluasi

1. **Apa perbedaan `[id].js` dan `[...slug].js`?** 
   - `[id].js` adalah *Dynamic Route* standar yang hanya menangkap **satu** segmen URL.
   - `[...slug].js` adalah *Catch-all Route* yang menangkap **semua** segmen URL setelah path utama  dan menyimpannya dalam bentuk array.

2. **Mengapa slug berbentuk array?** 
   Hal ini karena *Catch-all Route* didesain untuk menangkap banyak segmen URL sekaligus Dengan format array, Next.js memudahkan pengembang untuk mengakses setiap bagian segmen berdasarkan indeksnya.

3. **Kapan sebaiknya menggunakan `Link` dan `router.push()`?** 
   - **`Link`**: Digunakan untuk navigasi standar antar halaman (deklaratif). Lebih baik untuk performa karena tidak me-refresh halaman.
   - **`router.push()`**: Digunakan untuk navigasi imperatif , yaitu perpindahan halaman yang memerlukan logika tertentu sebelumnya, seperti setelah menekan tombol login atau validasi data.

4. **Mengapa navigasi Next.js tidak me-refresh halaman?** 
   Next.js melakukan navigasi sisi klien (*client-side navigation*). Saat berpindah halaman, Next.js hanya mengambil data yang diperlukan dan memperbarui konten tanpa memuat ulang seluruh sumber daya browser (SPA *experience*).
