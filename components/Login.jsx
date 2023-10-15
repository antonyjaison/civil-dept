"use client";

import styles from "@styles/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  addDoc,
  collection,
  Timestamp,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import db from "@firebase/config";
import { setUser } from "@util/functions";

const Login = ({ setLogin, isLogin, setUserExist }) => {
  const router = useRouter();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch("/api/login", {
        body: JSON.stringify({
          email: Email,
          password: Password,
        }),
        method: "POST",
      });

      if (!res.ok) {
        throw new Error(res.message);
        setLoading(false)
      }

      const data = await res.json();
      setError("");
      if (data.success) {
        setLoading(false)
        setUser(data.email);
        router.push(`/civil-library/file/${process.env.NEXT_PUBLIC_INITIAL_FOLDER}`);
      }
    } catch (error) {
      setLoading(false)
      setError(error.message);
    }
  };

  return (
    <div className={styles.login_wrapper}>
      <div className={styles.form_section}>
        <div className={styles.heading}>
          <h1>Login</h1>
          <img onClick={setLogin} src="/icons/close.svg" alt="close" />
        </div>

        <form onSubmit={submit}>
          <div className={styles.input_section}>
            <label>Email</label>
            <br />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="example@gmail.com"
              required
              value={Email}
            />
          </div>
          <div className={styles.input_section}>
            <label>Password</label>
            <br />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              required
              value={Password}
            />
          </div>
          <button>{loading ? "loading..." : "Login"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
