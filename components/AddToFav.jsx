"use client";
import styles from "@styles/addToFavButton.module.scss";
import { getUser } from "@util/functions";
import { useState, useEffect } from "react";

import {
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
    if (!getUser()){
      alert("Please login to continue...");
      return;
    }
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
          setInFavorites(true);
        });
      } else {
        console.log("Exists");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFavorites = async (e) => {
    e.preventDefault();
    if (!getUser()) return;
    const email = getUser();

    try {
      const favDocRef = doc(db, "favorites", id + email);
      await deleteDoc(favDocRef);
      setInFavorites(false);
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

  return (
    <button
      className={`${styles.wrapper} ${inFavorites ? styles.active : ""}`}
      onClick={inFavorites ? removeFromFavorites : addToFavorite}
    >
      {inFavorites ? (
        <img src="/icons/red-heart.svg" alt="heart" />
      ) : (
        <img src="/icons/heart_outline.svg" alt="heart" />
      )}
    </button>
  );
};

export default AddToFav;
