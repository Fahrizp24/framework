import { useRouter } from "next/router";

const HalamanKategori = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Halaman Kategori</h1>
      <p>Daftar Parameter Slug:</p> <br />

      <ul>
        {/* Mengecek apakah slug ada dan merupakan sebuah array */}
        {Array.isArray(slug) ? (
          slug.map((item, index) => (
            <li key={index}>Segmen ke-{index + 1}: {item}</li>
          ))
        ) : (
          <li>{slug}</li>
        )}
      </ul>
    </div>
  );
};

export default HalamanKategori;