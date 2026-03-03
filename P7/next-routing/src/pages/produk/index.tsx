import { useEffect, useState } from "react";

type ProductType = {
  id: string;
  name: string;
  price: number;
  size: string;
  category: string; // Tugas 2: Tambah field category
};

const ProdukPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchProducts = () => {
    fetch("/api/produk")
      .then((response) => response.json())
      .then((responsedata) => {
        setProducts(responsedata.data);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Daftar Produk</h1>
      {/* Tugas 3: Tombol Refresh Data */}
      <button onClick={fetchProducts} style={{ marginBottom: '20px' }}>
        Refresh Data
      </button>

      <div style={{ display: 'grid', gap: '15px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px' }}>
            <h2>{product.name}</h2>
            <p>Kategori: {product.category}</p> {/* Tugas 2: Tampilkan category */}
            <p>Harga: {product.price}</p>
            <p>Ukuran: {product.size}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProdukPage;