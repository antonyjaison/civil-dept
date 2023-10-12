"use client";

import { setFavorites } from "@app/redux/features/favorites/favoritesSlice";
import File from "@components/File";
import PdfCard from "@components/PdfCard";
import db from "@firebase/config";
import { getUser, isUserExist } from "@util/functions";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import styles from "@styles/filesection.module.scss";

function FavoritesPage() {
  const [loading, setLoading] = useState(true);
  const { favorites } = useSelector((state) => state.favorites);
  const [parent] = useAutoAnimate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isUserExist()) return;

    setLoading(true);

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
      setLoading(false);
    }

    getFavorites();
  }, []);

  if (loading && favorites.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {favorites.length === 0 && <div>Favorites are empty</div>}
      {favorites.length > 0 && (
        <div ref={parent} className={styles.container}>
          {favorites.map((item) =>
            item.type === "pdf" ? (
              <PdfCard
                name={item.name}
                type={item.type}
                id={item.fileId}
                key={item.id}
              />
            ) : (
              <File
                name={item.name}
                type={item.type}
                id={item.fileId}
                key={item.id}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
