"use client";
import React, { useState, useEffect } from 'react';
import GalleryCard from './GalleryCard'; 
import styles from '../styles/GallerySection.module.scss';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '@firebase/config';

function GallerySection() {
    const [images, setImages] = useState([]);
 
    useEffect(() => {
      const fetchImages = async () => {
        try {
          const galleryCollectionRef = collection(db, "gallery"); // Your Firestore collection
          const q = query(galleryCollectionRef, where("source", "==", "admin")); // Filter by source
          const querySnapshot = await getDocs(q);
 
          const imageUrls = [];
          querySnapshot.forEach((doc) => {
            imageUrls.push(doc.data().imageUrl);
          });
 
          setImages(imageUrls);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };
 
      fetchImages();
    }, []);

  return (
    <div className={styles.container}>
       <div className={styles.imageListing}>
         {images.map((imageUrl, index) => (
           <GalleryCard key={index} imageUrl={imageUrl} /> 
         ))}
       </div>
    </div>
  );
}

export default GallerySection;
