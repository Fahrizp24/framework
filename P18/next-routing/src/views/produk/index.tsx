import styles from "../../styles/product.module.scss";
import Link from "next/link";
import { ProductType } from "../../types/Product.type";
import Image from "next/image";

const TampilanProduk = ({ products }: { products: ProductType[] }) => {
  return (
    <div className={styles.produk}>
      <h1 className={styles.produk_title} data-testid="title">Daftar Produk</h1>
      <div className={styles.produk_content}>
        {products.length > 0 ? (
          products.map((product: ProductType) => (
            <Link href={`/produk/${product.id}`} key={product.id} className={styles.produk_content_item}>
              <div className={styles.produk_content_item_image}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                />
              </div>
              <h4 className={styles.produk_content_item_name}>{product.name}</h4>
              <p className={styles.produk_content_item_category}>{product.category}</p>
              <p className={styles.produk_content_item_price}>
                Rp {product.price.toLocaleString("id-ID")}
              </p>
            </Link>
          ))
        ) : (
          <div className={styles.produk_content_skeleton}>
            <div className={styles.produk_content_skeleton_image}></div>
            <div className={styles.produk_content_skeleton_name}></div>
            <div className={styles.produk_content_skeleton_category}></div>
            <div className={styles.produk_content_skeleton_price}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;