import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <Head>
        <title>Home - Praktikum</title>
      </Head>
      
      <h1>Praktikum Next.js Pages Router</h1>
      <p>Mahasiswa D4 Teknik Informatika</p>
      
      <nav style={{ marginTop: '20px' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            {/* Task 2: Link Navigasi ke About */}
            <Link href="/about" style={{ color: 'blue', fontSize: '1.2rem', fontWeight: 'bold' }}>
              Lihat Profil Mahasiswa (About) →
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}