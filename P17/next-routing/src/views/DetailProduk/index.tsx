import { ProductType } from "@/types/Product.type";
import styles from "./detailProduk.module.scss"; 
import Image from "next/image";


const DetailProduk = ({ product }: { product: ProductType }) => {
  // PENGAMAN: Jika product masih undefined atau objek kosong (sedang loading fetch API)
  // Maka tampilkan teks loading dan JANGAN render gambar/harga dulu agar tidak crash.
  if (!product || Object.keys(product).length === 0) {
    return <p>Loading detail produk...</p>;
  }

  return (
    <>
      <h1 className={styles.title}>Detail Produk</h1>
      <div className={styles.produkdetail}>
        <div className={styles.produkdetail_image}>
          <Image 
            src={product.image} 
            alt={product.name} 
            width={500} 
            height={500} 
          />
        </div>
        <div className={styles.produkdetail_info}>
          <h1 className={styles.produkdetail_name}>{product.name}</h1>
          <p className={styles.produkdetail_category}>{product.category}</p>
          <p className={styles.produkdetail_price}>
            Rp {product.price ? product.price.toLocaleString("id-ID") : "0"}
          </p>
        </div>
      </div>
    </>
  );
};

export default DetailProduk;