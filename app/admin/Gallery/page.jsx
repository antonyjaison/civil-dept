"use client";

import styles from "@styles/adminPage.module.scss";
import GalleryInput from "@components/admin/GalleryInput";
import AdminDeleteButton from "@components/admin/AdminDeleteButton";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getDetailsFromFirebase from "@util/getDetailsFromFirebase";
import { setGalleryImages } from "@app/redux/features/gallery/gallerySlice"; // Update with your actual slice
import { deleteGalleryImage } from "@app/redux/features/gallery/gallerySlice"; // Update with your actual slice


const Gallery = () => {
  const dispatch = useDispatch();
  const galleryImages = useSelector((state) => state.gallery.galleryImages); // Update with your actual slice

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (selectedImage) {
      try {
        const imageRef = ref(storage, `gallery/${selectedImage.name}`); // Adjust 'gallery' if needed
        await uploadBytes(imageRef, selectedImage);

        // Get download URL
        const downloadURL = await getDownloadURL(imageRef);

        // Add image data to Firestore
        const galleryCollectionRef = collection(db, "gallery");
        await setDoc(doc(galleryCollectionRef), {
          imageUrl: downloadURL,
          timestamp: new Date(),
          source: "admin"
        });

        setSelectedImage(null);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  // Fetch images from Firestore on component mount
  useEffect(() => {
    const fetchImages = async () => {
      const images = await getDetailsFromFirebase("galleries");
      dispatch(setGalleryImages(images)); // Update with your actual slice
    };

    fetchImages();
  }, []);

  console.log(galleryImages);

  return (
    <div className={`row`}>
      <div className={`col-lg-6`}>
        <GalleryInput onChange={handleImageChange} />
        <button onClick={uploadImage} disabled={!selectedImage}>
          Upload Image
        </button>
      </div>
      <div className={`col-lg-6`}>
        <div className={styles.admin_output_section}>
          {galleryImages.length > 0 ? (
            galleryImages.map((image) => (
              <div key={image.id} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ccc",
                padding: 10,
              }} className={styles.gallery_output_card}>
                <img style={{
                  width: 200,
                }} src={image.image} alt="Gallery Image" />
                {/* Add delete functionality if needed */}
                <AdminDeleteButton
                  id={image.id}
                  collection="galleries"
                  dispatchFunction={deleteGalleryImage} // Update with your actual slice action
                />
              </div>
            ))
          ) : (
            <p>Nothing To show</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;