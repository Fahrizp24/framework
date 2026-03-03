import Link from "next/link";
import styles from "./register.module.scss"; // Pastikan import ke .scss 

const TampilanRegister = () => {
  return (
    <div className={styles.register}>
      <div className={styles.card}>
        <h1>Halaman Register</h1>
        <form>
          <input type="text" placeholder="Fullname" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Register</button>
        </form>
        <Link href="/auth/login" className={styles.login_link}>
          Sudah punya akun? Kembali ke Login
        </Link>
      </div>
    </div>
  );
};

export default TampilanRegister;