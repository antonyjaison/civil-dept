"use client";
import styles from '@styles/addToFavButton.module.scss'

const AddToFav = ({ id }) => {
    const addToFavorite = (e) => {
        e.preventDefault()
        console.log("hello",id)
    }
    
  return (
    <button className={styles.wrapper} onClick={addToFavorite}>
      <img src="/icons/heart_outline.svg" alt="heart" />
    </button>
  );
};

export default AddToFav;
