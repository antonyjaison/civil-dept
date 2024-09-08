import React from 'react';
import styles from '../styles/GalleryCard.module.scss'; 

function GalleryCard({ imageUrl, description }) {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={description} className={styles.image} />
      {/* <p className={styles.description}>{description}</p> */}
    </div>
  );
}

export default GalleryCard;
