import styles from "../../styles/product.module.scss";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const TampilanProduk = ({ products }: { products: ProductType[] }) => {
  return (
    <div className={styles.produk}>
      <h1 className={styles.produk_title}>Daftar Produk</h1>
      <div className={styles.produk_content}>
        {products.map((product: ProductType) => (
          <div key={product.id} className={styles.produk_content_item}>
            <div className={styles.produk_content_item_image}>
              <img src={product.image} alt={product.name} width={200} />
            </div>
            <h4 className={styles.produk_content_item_name}>
              {product.name}
            </h4>
            <p className={styles.produk_content_item_category}>
              {product.category}
            </p>
            <p className={styles.produk_content_item_price}>
              Rp {product.price.toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TampilanProduk;