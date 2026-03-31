// src/views/auth/login/index.tsx
import Link from "next/link";
import style from "./login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const TampilanLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  let callbackUrl: any = query.callbackUrl || "/";
  if (callbackUrl.includes("/api/auth/callback/credentials")) {
    callbackUrl = "/";
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError(res?.error === "CredentialsSignin" ? "Email atau Password yang Anda masukkan salah" : res?.error || "Login gagal");
      }
    } catch (error) {
      setIsLoading(false);
      setError("wrong email or password");
    }
  };

  return (
    <>
      <div className={style.login}>
        <h1 className={style.login_title}>Halaman login</h1>
        {error && <p className={style.login_error}>{error}</p>}
        <div className={style.login_form}>
          <form onSubmit={handleSubmit}>
            <div className={style.login_form_item}>
              <label htmlFor="email" className={style.login_form_item_label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className={style.login_form_item_input}
              />
            </div>
            <div className={style.login_form_item}>
              <label htmlFor="password" className={style.login_form_item_label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className={style.login_form_item_input}
              />
            </div>
            <button
              type="submit"
              className={style.login_form_button}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
          <p className={style.login_form_text}>
            tidak punya akun? <Link href="/auth/register">Ke Halaman Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default TampilanLogin;