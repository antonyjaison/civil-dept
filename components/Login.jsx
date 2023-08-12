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

const Login = ({ setLogin,isLogin,setUserExist }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Email.includes("gec") && Password === "12345678") {
      try {
        const usersCollectionRef = collection(db, "users");
        const docRef = doc(usersCollectionRef, Email);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          // If the document does not exist, set the data for the new document
          await setDoc(docRef, {
            email: Email,
            timestamp: Timestamp.now(),
          }).then(() => {
            setUser(Email);
            setEmail("");
            setPassword("");
            setLogin(!isLogin)
            setUserExist(true)
          });
        } else {
          // If the document already exists, you can handle the situation accordingly
          console.log("User with this email already exists.");
          setUser(docSnap.data().email);
          setLogin(!isLogin);
          setUserExist(true)
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    } else {
      console.log("You are not the Civil student");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className={styles.login_wrapper}>
      <div className={styles.form_section}>
        <div className={styles.heading}>
          <h1>Login</h1>
          <img onClick={setLogin} src="/icons/menu.svg" alt="close" />
        </div>

        <form>
          <div className={styles.input_section}>
            <label>Email</label>
            <br />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="exaple@gmail.com"
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
          <button onClick={handleSubmit}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
