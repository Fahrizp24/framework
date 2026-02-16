import { useState, useEffect } from 'react';
import Head from 'next/head';

// Definisi tipe data
interface Mahasiswa {
  name: string;
  nim: string;
  prodi: string;
}

export default function About() {
  const [data, setData] = useState<Mahasiswa | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // API yang sudah dibuat di /api/hello
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Sedang memuat data...</p>;
  if (!data) return <p>Data tidak ditemukan.</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <Head>
        <title>About - Fetch API</title>
      </Head>
      <h1>Profil Mahasiswa (Dari API)</h1>
      <hr />
      <p><strong>Nama:</strong> {data.name}</p>
      <p><strong>NIM:</strong> {data.nim}</p>
      <p><strong>Program Studi:</strong> {data.prodi}</p>
      
      <br />
      <a href="/" style={{ color: 'blue' }}>← Kembali</a>
    </div>
  );
}