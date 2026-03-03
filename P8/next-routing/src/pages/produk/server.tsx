import TampilanProduk from "../../views/produk";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const HalamanProdukServer = (props: { products: ProductType[] }) => {
  const { products } = props;
  
  return (
    <div>
      <h1>Halaman Produk Server</h1>
      <TampilanProduk products={products} />
    </div>
  );
};

export default HalamanProdukServer;

// Fungsi ini dipanggil setiap request halaman
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/produk");
  const response = await res.json();
  
  return {
    props: {
      products: response.data, // Pastikan ada nilai default/handling jika gagal
    },
  };
}