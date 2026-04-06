import { useRouter } from 'next/router';

const HalamanSlug = () => {
  const router = useRouter();
  console.log(router);

    const { query }= useRouter();

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Halaman Slug</h1>
      <p>Slug: {query.slug}</p>
    </div>
  );
};

export default HalamanSlug;
