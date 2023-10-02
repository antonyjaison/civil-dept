"use client";

import React, { useState } from "react";
import styles from "@styles/adminLogin.module.scss";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password are required.");
    } else if (username && password) {
      try {
        const res = await fetch("/api/admin", {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        const json = await res.json();

        if (json.status) {
          localStorage.setItem("admin",JSON.stringify(json))
          router.push("/admin/Facilities")
        }else{
          setError("Invalid credentials")
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <main className={styles.login_wrapper}>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        {error && <input className={styles.err_section} value={error} />}
        <button type="submit" className={`btn ${styles.dark_btn}`}>
          Login
        </button>
      </form>
    </main>
  );
};

export default AdminLogin;
