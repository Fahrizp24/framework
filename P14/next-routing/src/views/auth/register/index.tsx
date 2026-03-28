import Link from "next/link";
import style from "../../auth/register/register.module.scss";

const TampilanRegister = () => {
  return (
    <div className={style.register}>
      <h1 className={style.register_title}>Halaman Register</h1>
      <div className={style.register_form}>
        <form action="">
          <div className={style.register_form_item}>
            <label htmlFor="email" className={style.register_form_item_label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={style.register_form_item_input}
            />
          </div>
          <div className={style.register_form_item}>
            <label htmlFor="Fullname" className={style.register_form_item_label}>
              Fullname
            </label>
            <input
              type="text"
              id="Fullname"
              name="Fullname"
              placeholder="Fullname"
              className={style.register_form_item_input}
            />
          </div>
          <div className={style.register_form_item}>
            <label htmlFor="Password" className={style.register_form_item_label}>
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              placeholder="Password"
              className={style.register_form_item_input}
            />
          </div>
          <button type="submit" className={style.register_form_item_button}>
            Register
          </button>
        </form>
        <br />
        <p className={style.register_form_item_text}>
          Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanRegister;