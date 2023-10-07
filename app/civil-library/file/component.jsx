"use client";

import { setFavorites } from "@app/redux/features/favorites/favoritesSlice";
import db from "@firebase/config";
import { getUser, isUserExist } from "@util/functions";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function FavoriteFetch({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isUserExist()) return;

    async function getFavorites() {
      const favoritesCollectionRef = collection(db, "favorites");
      const q = query(favoritesCollectionRef, where("email", "==", getUser()));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        const d = doc.data();
        data.push({
          name: d.name,
          type: d.type,
          fileId: d.fileId,
          id: d.id,
        });
      });
      data.sort((a, b) => a.name.localeCompare(b.name));
      dispatch(setFavorites(data));
    }

    getFavorites();
  }, []);
  return children;
}
