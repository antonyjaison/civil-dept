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
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  deleteFavorite,
} from "@app/redux/features/favorites/favoritesSlice";

const AddToFav = ({ id, type, name }) => {
  const { favorites } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const addToFavorite = async (e) => {
    e.preventDefault();
    if (!getUser()) {
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
          id: id + email,
          fileId: id,
          name: name,
          type: type,
          email: email,
          timestamp: Timestamp.now(),
        }).then(() => {
          dispatch(
            addFavorite({
              id: id + email,
              fileId: id,
              name: name,
              type: type,
              email: email,
            })
          );
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
      dispatch(deleteFavorite(id + email));

      setInFavorites(false);
    } catch (error) {
      console.log(error);
    }
  };

  const checkInFavorites = (folder_id) => {
    if (!getUser()) return false;

    const exists = favorites.find((favorite) => favorite.fileId === folder_id);
    if (exists) {
      return true;
    }
    return false;
  };

  const [inFavorites, setInFavorites] = useState(false);

  useEffect(() => {
    const isItemInFavorites = checkInFavorites(id);
    setInFavorites(isItemInFavorites);
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
