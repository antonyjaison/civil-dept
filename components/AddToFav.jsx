"use client";
import styles from "@styles/addToFavButton.module.scss";
import { getUser } from "@util/functions";

import {
  addDoc,
  collection,
  Timestamp,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import db from "@firebase/config";

const AddToFav = ({ id , type}) => {
  const addToFavorite = async (e) => {
    e.preventDefault();
    if (!getUser()) return;
    const email = getUser();

    try {
      const favoritesCollectionRef = collection(db, "favorites");
      const docRef = doc(favoritesCollectionRef, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          file: id,
          type:type,
          email:email,
          timestamp: Timestamp.now(),
        }).then(() => {
          console.log("Added")
        });
      } else {
        console.log("Exists");
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className={styles.wrapper} onClick={addToFavorite}>
      <img src="/icons/heart_outline.svg" alt="heart" />
    </button>
  );
};

export default AddToFav;
