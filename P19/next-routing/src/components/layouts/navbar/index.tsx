import Script from 'next/script';
import Image from 'next/image';
import styles from './navbar.module.css';
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session }: any = useSession();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_brand} id="title"></div>
      
      <Script id="title-script" strategy="lazyOnload">
        {`document.getElementById('title').innerHTML = 'MyApp';`}
      </Script>

      <div className={styles.navbar_right}>
        {session ? (
          <div className={styles.navbar_user}>
            Welcome, {session.user?.fullname}
            {session?.user?.image && (
              <Image
                width={50}
                height={50}
                src={session.user.image}
                alt={session.user.fullname}
                className={styles.navbar_user_image}
              />
            )}
            <button onClick={() => signOut()}>Sign Out</button>
          </div>
        ) : (
          <button onClick={() => signIn()}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;