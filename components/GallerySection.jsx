import React from 'react';
import GalleryCard from './GalleryCard'; 
import styles from '../styles/GallerySection.module.scss';

function GallerySection() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
      description: 'Beautiful Landscape'
    },
    {
      url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
      description: 'Cityscape at Night'
    },
    {
      url: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf',
      description: 'Mountain Range'
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1666970933928-1aa5f346dca2?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Serene Lake'
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1668455494252-e4ca4a2609ca?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Forest Path'
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1681149342564-8bebc9cc4d16?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Desert Dunes'
    },
    {
      url: 'https://images.unsplash.com/photo-1470137430626-983a37b8ea46',
      description: 'Sunny Beach'
    },
    {
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
      description: 'Snowy Mountains'
    },
    {
      url: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170',
      description: 'Rolling Hills'
    },
    {
      url: 'https://images.unsplash.com/photo-1705966106509-b233927117f3?q=80&w=2792&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Rocky Shoreline'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.imageListing}>
        {images.map((img, index) => (
          <GalleryCard key={index} imageUrl={img.url} description={img.description} />
        ))}
      </div>
    </div>
  );
}

export default GallerySection;
