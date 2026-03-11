import styles from "@/styles/404.module.scss";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className={styles.error}>
      <img src="/page-not-found.png" alt="404" className={styles.error_image} />
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ada.</p>

      <Link href="/" style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: 'white',
        borderRadius: '5px',
        textDecoration: 'none'
      }}>
        Kembali ke Home
      </Link>
    </div>
  );
};

export default Custom404;