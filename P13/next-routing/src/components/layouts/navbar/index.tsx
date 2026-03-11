import styles from './navbar.module.css';
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data }: any = useSession();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_brand}>MyApp</div>
      <div className={styles.navbar_right}>
        {data ? (
          <>
            <div className={styles.navbar_user}>
              Welcome, {data.user?.fullname}
            </div>
            <button
              className={`${styles.navbar_button} ${styles["navbar_button--danger"]}`}
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            className={`${styles.navbar_button} ${styles["navbar_button--primary"]}`}
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;