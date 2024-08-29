import React from 'react';
import GalleryCard from './GalleryCard'; 
import styles from '../styles/GallerySection.module.scss';
import getDetailsFromFirebase from '@util/getDetailsFromFirebase';
import { cookies } from "next/headers";

async function GallerySection() {
  const cookieStore = cookies()
  const images = await getDetailsFromFirebase("galleries");
  return (
    <div className={styles.container}>
       <div className={styles.imageListing}>
         {images.map((data, index) => (
           <GalleryCard key={index} imageUrl={data.image} /> 
         ))}
       </div>
    </div>
  );
}

export default GallerySection;
