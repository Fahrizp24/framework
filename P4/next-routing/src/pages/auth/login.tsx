import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./login.module.css";

const halamanLogin = () => {
  const { push } = useRouter();
  const handlerLogin = () => {
    push('/produk');
  };

  return (
    <div className={styles.login}>
      <h1>Halaman Login</h1>
      <button onClick={() => handlerLogin()}>Login</button> <br />
      <Link href="/auth/register">Ke Halaman Register</Link>
    </div>
  );
};

export default halamanLogin;