import styles from "@styles/login.module.scss";
import { useState } from "react";

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

const Login = ({ setLogin }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      body: JSON.stringify({
        email: Email,
        password: Password
      }),
      method: "POST"
    });

    const data = await res.json();
    console.log(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

  };
  return (
    <div className={styles.login_wrapper}>
      <div className={styles.form_section}>
        <div className={styles.heading}>
          <h1>Login</h1>
          <img onClick={setLogin} src="/icons/menu.svg" alt="close" />
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
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
