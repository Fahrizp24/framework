# Laporan Praktikum 17: Optimasi Performa Aplikasi Menggunakan Fitur Next.js
**Mata Kuliah:** Pemrograman Framework
**Mahasiswa:** Fahri Zanuar Pradian
**Topik:** Optimasi Performa Aplikasi Menggunakan Fitur Next.js

### A. Optimasi Gambar Lokal
Mengganti elemen `<img>` HTML bawaan pada halaman 404 dengan komponen `<Image />` dari `next/image`. Hal ini secara otomatis menerapkan kompresi format, penyesuaian dimensi gambar, dan *lazy loading* untuk menghemat beban *bandwidth*.

<img src="./assets/1 – Image Optimization - public folder internal.png" alt="Optimasi Gambar Lokal" width="800" />

### B. Optimasi Gambar Remote
Menerapkan komponen `<Image />` untuk data produk yang gambarnya berasal dari URL eksternal CDN Adidas. Proses ini mewajibkan kita untuk mengatur *whitelist* domain `assets.adidas.com` di dalam berkas konfigurasi `next.config.js` melalui properti `remotePatterns`.

<img src="./assets/1 – Image Optimization  - url external.png" alt="Optimasi Gambar Remote" width="800" />

### C. Optimasi Font
Menggunakan `next/font/google` untuk memuat font 'Roboto' pada file `Appshell`. Pendekatan ini mengunduh font saat proses *build* dan melakukan *self-hosting*, sehingga menghilangkan waktu tunggu CDN eksternal dan mencegah terjadinya FOUT (Flash of Unstyled Text).

### D. Optimasi Script & Avatar
Menerapkan `next/script` dengan `strategy="lazyOnload"` untuk menunda eksekusi manipulasi DOM hingga proses *render* utama selesai. Pada komponen yang sama (Navbar), diterapkan juga optimasi gambar avatar Google milik *user login*, yang mengharuskan penambahan domain `lh3.googleusercontent.com` pada `next.config.js`.

---

### E. Hasil Tugas Praktikum

**Tugas 1: Optimasi semua image di project**
Semua tag `<img>` pada halaman error, daftar produk, dan profil *user* telah diganti ke `<Image />`. *Warning eslint* terkait penggunaan *img elements* telah bersih.

**Tugas 2: Gunakan minimal 1 font dari `next/font`**
Font Roboto berhasil diimplementasikan secara global melalui *wrapper* `Appshell` menggunakan `<main className={roboto.className}>`. Font terdeteksi sebagai aset lokal saat diperiksa via *Network tab*.

<img src="./assets/2 – Font Optimization.png" alt="Optimasi Font" width="800" />

**Tugas 3: Script Google Analytics menggunakan `next/script`**
Implementasi `<Script>` di file `_app.tsx` menggunakan strategi `afterInteractive` agar proses *tracking* tidak memblokir *rendering* awal konten utama.
```tsx
import Script from 'next/script'

// Di dalam komponen App:
<Script src="[https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX](https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX)" strategy="afterInteractive" />
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
**Tugas 4: Dynamic import pada minimal 1 komponen**
Menerapkan `next/dynamic` untuk komponen modal yang berat (misalnya komponen grafik atau pop-up detail produk) sehingga *bundle* JavaScript hanya diunduh ketika *user* memicu *action* tersebut.
```tsx
import dynamic from 'next/dynamic'

// Komponen Modal diload hanya ketika dibutuhkan
const DynamicModal = dynamic(() => import('../components/HeavyModal'), {
  loading: () => <p>Loading...</p>,
})
```

**Tugas 5: Dokumentasi Performa Lighthouse**
*(Catatan: Lampirkan gambar screenshot Lighthouse Anda di sini)*
Terjadi peningkatan skor Performance dan berkurangnya Cumulative Layout Shift (CLS) karena dimensi aset visual sudah didefinisikan secara konstan.

---

### F. Pertanyaan Evaluasi

**1. Mengapa `<img>` biasa tidak optimal?**
Tag `<img>` HTML biasa memaksa *browser* mengunduh gambar dalam format dan resolusi aslinya yang mungkin terlalu besar untuk perangkat klien (*render blocking* dan buang-buang bandwidth). Tag ini juga tidak memiliki fitur *lazy loading* atau konversi format *next-gen* (seperti WebP) secara otomatis bawaan, yang membuat *load time* menjadi lambat.

**2. Apa perbedaan font CDN dan `next/font`?**
Memuat font via CDN (seperti Google Fonts konvensional) memerlukan proses *network request* ekstra ke server pihak ketiga saat web dibuka, yang rawan terjadi delay (FOUT/FOIT). `next/font` mengunduh font tersebut saat tahap penyusunan (*build time*) dan menjadikannya sebagai file lokal di sisi server kita (*self-hosted*), sehingga mempercepat waktu akses dengan Zero Layout Shift.

**3. Mengapa script bisa membuat website lambat?**
Secara *default*, *browser* mengeksekusi *script* secara sinkronus. Artinya, ketika *parser* HTML menemukan tag `<script>`, ia akan berhenti me-render halaman, mengunduh file *script*, dan mengeksekusinya (*render-blocking*). Jika ukuran *script* terlalu besar, maka konten visual lambat muncul di layar klien.

**4. Kapan harus menggunakan dynamic import?**
*Dynamic import* sebaiknya digunakan pada komponen yang tidak langsung terlihat atau tidak langsung dibutuhkan oleh *user* saat pertama kali halaman dimuat (*initial load*). Contoh utamanya adalah komponen *Below the Fold* (berada di bawah layar gulir), modul *pop-up/modal* interaktif, tab yang belum diklik, atau pustaka grafik/animasi yang berat.

**5. Apa dampak bundle size terhadap UX?**
*Bundle size* JavaScript yang terlalu besar akan memperlama pengunduhan, pemrosesan, dan kompilasi *script* oleh *browser* klien. Dampaknya, metrik *Time to Interactive* (TTI) menjadi buruk. Halaman mungkin terlihat sudah tampil secara visual, tetapi UI akan *freeze* atau lambat merespons ketukan/klik (*bad User Experience*).

---

### G. Kesimpulan
Fitur `next/image` menangani masalah performa visual paling fatal dengan menyediakan optimasi otomatis (seperti *resizing*, *lazy loading*, format WebP) tanpa konfigurasi manual yang rumit.

Manajemen sumber daya eksternal (seperti gambar CDN) di Next.js sangat ketat demi keamanan, dibuktikan dengan keharusan mendeklarasikan *hostname* API secara spesifik di `next.config.js`.

Penggunaan `next/font` mendemonstrasikan implementasi terbaik untuk tipografi web modern karena mengubah aset eksternal menjadi aset *self-hosted* pada saat *build time*.

Fitur optimasi bawaan kerangka kerja Next.js (Image, Script, Font, Dynamic Import) sangat memudahkan para *developer* mencapai performa Core Web Vitals yang hijau tanpa perlu memasang banyak *library optimizer* pihak ketiga.