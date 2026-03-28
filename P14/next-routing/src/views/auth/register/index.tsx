import Link from "next/link";
import style from "../../auth/register/register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const TampilanRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const fullname = formData.get("Fullname") as string;
    const password = formData.get("Password") as string;

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, fullname, password }),
    });

    if (response.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError(
        response.status === 400 ? "User already exists" : "An error occurred"
      );
    }
  };

    return (
    <div className={style.register}>
      <h1 className={style.register_title}>Halaman Register</h1>
      
      {error && <p className={style.register_error}>{error}</p>}

      <div className={style.register_form}>
        <form onSubmit={handleSubmit}>
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

          <button 
            type="submit" 
            className={style.register_form_item_button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
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