"use client";

import InputGroup from "./InputGroup";
import SelectImage from "./SelectImage";
import { useState, useRef } from "react";
import styles from "@styles/adminPage.module.scss";
import uploadImageToFirebase from "@util/uploadImage";
import ClipLoader from "react-spinners/ClipLoader";
import ProgressBar from "./ProgressBar";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import db from "@firebase/config";

const GalleryInput = () => {
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [imageDescription, setImageDescription] = useState("");

  const imageDescriptionRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImg(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImageUrl(imageUrl);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (imageDescription === "") {
      imageDescriptionRef.current.style.border = "1px solid red";
      return;
    }

    if (img === null) {
      alert("Select an image");
      return;
    }

    if (imageDescription && img) {
      setLoading(true);
      try {
        const downloadURL = await uploadImageToFirebase(img, "gallery", setProgress);
        setProgress(0);

        // Add image URL and description to Firestore
        const galleriesCollectionRef = collection(db, "galleries");
        const time = Timestamp.now().toString();
        await addDoc(galleriesCollectionRef, {
          imageDescription,
          image: downloadURL,
          timestamp: time,
        });

        setSelectedImageUrl(null);
        setImg(null);
        setImageDescription("");
      } catch (error) {
        setError("Error uploading image");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form className={`p-5 ${styles.form_section}`} onSubmit={submitHandler}>
      <SelectImage
        onChange={handleFileChange}
        selectedImage={selectedImageUrl}
      />
      <InputGroup
        name={imageDescription}
        setName={setImageDescription}
        nameFor="Description"
        type="text"
        inputRef={imageDescriptionRef}
        placeholder="eg. Dept topper"
      />
      {error && <input className={styles.error_input} value={error} disabled />}
      {progress > 0 && <ProgressBar progress={progress} />}
      <button disabled={loading} type="submit">
        {loading ? <ClipLoader color="#fff"/> : "Submit"}
      </button>
    </form>
  );
};

export default GalleryInput;
