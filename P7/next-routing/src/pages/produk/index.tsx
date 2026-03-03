import { useEffect, useState } from "react";
import TampilanProduk from "../../views/produk";

const kategori = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/produk")
      .then((response) => response.json())
      .then((responsedata) => {
        setProducts(responsedata.data);
      })
      .catch((error) => {
        console.error("Error fetching produk:", error);
      });
  }, []);

  return (
    <div>
      <TampilanProduk products={products} />
    </div>
  );
};

export default kategori;