"use client";
import styles from "@styles/addToFavButton.module.scss";
import { getUser } from "@util/functions";
import { useState, useEffect } from "react";

import {
  addDoc,
  collection,
  Timestamp,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "@firebase/config";

const AddToFav = ({ id, type }) => {
  const addToFavorite = async (e) => {
    e.preventDefault();
    if (!getUser()) return;
    const email = getUser();

    try {
      const favoritesCollectionRef = collection(db, "favorites");
      const docRef = doc(favoritesCollectionRef, id + email);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          file: id,
          type: type,
          email: email,
          timestamp: Timestamp.now(),
        }).then(async () => {
          console.log("Added");
          await checkInFavorites(id);
        });
      } else {
        console.log("Exists");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFavorites = async () => {
    if (!getUser()) return;
    const email = getUser();

    try {
      const favDocRef = doc(db, "favorites", id + email);
      await deleteDoc(favDocRef);
      await checkInFavorites(id);
    } catch (error) {
      console.log(error);
    }
  };

  const checkInFavorites = async (folder_id) => {
    if (!getUser()) return;
    const email = getUser();

    try {
      const favoritesDocRef = doc(db, "favorites", folder_id + email);
      const docSnap = await getDoc(favoritesDocRef);

      if (!docSnap.exists()) {
        console.log(false);
        return false;
      } else {
        console.log(true);
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [inFavorites, setInFavorites] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const isItemInFavorites = await checkInFavorites(id);
      setInFavorites(isItemInFavorites);
    };

    fetchData();
  }, [id]);

  if (inFavorites) {
    return (
      <button className={styles.wrapper} onClick={removeFromFavorites}>
        <img src="/icons/red-heart.svg" alt="heart" />
      </button>
    );
  } else {
    return (
      <button className={styles.wrapper} onClick={addToFavorite}>
        <img src="/icons/heart_outline.svg" alt="heart" />
      </button>
    );
  }
};

export default AddToFav;
