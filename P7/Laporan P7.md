# Laporan Praktikum 6: Client Side Rendering & Data Fetching

**Mata Kuliah:** Pemrograman Framework  
**Mahasiswa:** Fahri Zanuar Pradian  
**Topik:** Client Side Rendering & Data Fetching (SWR)

---

## 1. Setup Data Produk
Menyiapkan struktur project Next.js dan membuat endpoint API di `/api/produk` yang me-return data JSON produk dari server/Firebase untuk dikonsumsi client.

![1. Setup Data Produk](assets/ .png)

## 2. Implementasi CSR dengan useEffect
Membuat komponen tampilan produk dan melakukan data fetching menggunakan hook `useEffect` dari React. Data diambil setelah komponen di-mount di browser.

![2. Implementasi CSR dengan useEffect](assets/ .png)

## 3. Implementasi Skeleton Loading
Menambahkan efek skeleton loading lengkap dengan animasi menggunakan CSS `@keyframes` untuk memberikan *feedback* visual yang lebih baik kepada user saat data sedang di-fetch.

![3. Implementasi Skeleton Loading](assets/3%20–%20Implementasi%20Skeleton%20Loading.gif)

## 4. Implementasi SWR
Melakukan *refactoring* kode fetching dari yang semula menggunakan `useEffect` menjadi library `useSWR` untuk mendapatkan fitur caching otomatis dan revalidasi data.

---

## E. Hasil Tugas Praktikum

### Tugas 1: Perbedaan Client Side Rendering  (CSR), Server Side Rendering (SSR), dan Static Site Generation (SSG)
Perbedaan konsep rendering di mana CSR membebankan rendering di browser, SSR membebankannya di server per request, dan SSG di-generate saat build time.

### Tugas 2: Skeleton dan Animasi
Berhasil membuat Skeleton Loading dengan animasi berkedip (blink opacity) menggunakan conditional rendering saat data produk belum tersedia.

### Tugas 3: Refactor SWR dan Fix Error toLocaleString
Telah mengganti metode fetch manual dengan `useSWR` pada page produk dan memperbaiki error pemformatan harga dengan menetapkan format region `"id-ID"`.

---

## F. Pertanyaan Evaluasi

1. **Mengapa penggunaan library SWR lebih disarankan daripada fetch manual dengan useEffect?**
   Karena SWR menyediakan fitur bawaan yang sangat kuat seperti *caching* otomatis, *revalidation* saat layar kembali fokus, *retry* otomatis jika error, dan membuat kode jauh lebih ringkas.

2. **Apa fungsi dari Skeleton Loading dalam aplikasi web?**
   Berfungsi untuk mengelabui persepsi waktu tunggu user (UX). Dibandingkan menampilkan layar kosong atau *spinner*, skeleton memberikan gambaran struktur konten yang akan muncul sehingga aplikasi terasa lebih cepat dan responsif.

---

## G. Kesimpulan
1. **CSR (Client Side Rendering)** adalah metode yang tepat untuk membuat halaman web yang dinamis dan interaktif tanpa harus sering memuat ulang halaman dari server.
2. Library **SWR** sangat menyederhanakan proses pengelolaan *state* data eksternal (API) pada aplikasi React/Next.js.
3. Fitur antarmuka seperti **Skeleton Loading** dan pemformatan angka lokal (`toLocaleString`) sangat penting untuk meningkatkan kenyamanan dan pengalaman pengguna (UX).
4. Tugas tugas telah selesai pada praktikum