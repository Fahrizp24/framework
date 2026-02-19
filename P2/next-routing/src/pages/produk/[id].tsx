import { useRouter } from 'next/router';

const HalamanProduk = () => {
  const router = useRouter();
  console.log(router);

    const { query }= useRouter();

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Halaman Produk</h1>
      <p>Produk: {query.id}</p>
    </div>
  );
};

export default HalamanProduk;
