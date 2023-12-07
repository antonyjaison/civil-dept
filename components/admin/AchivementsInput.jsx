"use client";

import styles from "@styles/adminPage.module.scss";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  addDoc,
} from "firebase/firestore";

import InputGroup from "./InputGroup";
import SelectImage from "./SelectImage";
import ProgressBar from "./ProgressBar";
import { ClipLoader } from "react-spinners";

import uploadImageToFirebase from "@util/uploadImage";
import db from "@firebase/config";
import { addAchivement } from "@app/redux/features/achivements/achivementsSlice";

const AchivementsInput = () => {
  const [title, setTitle] = useState("");
  const [para, setPara] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const titleRef = useRef(null);
  const paraRef = useRef(null);

  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      setImg(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImageUrl(imageUrl);
    }
  };

  const onChangePara = (e) => {
    paraRef.current.style.border = "none";
    setPara(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (title === "") {
      titleRef.current.style.border = "1px solid red";
    }
    if (para === "") {
      paraRef.current.style.border = "1px solid red";
    }
    if (img === null) {
      alert("Select an image");
    }

    if (title && para && img) {
      setLoading(true);
      const achivementsCollectionRef = collection(db, "achivements");
      const queryRef = query(
        achivementsCollectionRef,
        where("title", "==", title)
      );

      try {
        const querySnapshot = await getDocs(queryRef);

        if (querySnapshot.empty) {
          uploadImageToFirebase(img, "achivements", setProgress)
            .then(async (downloadURL) => {
              setProgress(0);
              const time = Timestamp.now().toString();
              // Add a Firestore document with the image downloadURL
              const data = await addDoc(achivementsCollectionRef, {
                title: title,
                para: para,
                image: downloadURL,
                timestamp: time,
              });

              dispatch(
                addAchivement({
                  title: title,
                  para: para,
                  image: downloadURL,
                  timestamp: time,
                })
              );

              setTitle("");
              setPara("");
              setSelectedImageUrl("");
              setImg("");
            })
            .catch((error) => {
              // Handle any errors during the upload
              console.error("Error uploading image:", error);
              setError("Error uploading image");
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          console.log("Achivement with same title already exists");
          setError("Achivement with same title already exists");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setError("Error occured");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form className={`p-5 ${styles.form_section}`} onSubmit={submitHandler}>
      <InputGroup
        name={title}
        setName={setTitle}
        nameFor="Title"
        type="text"
        inputRef={titleRef}
        placeholder="Title of the achivement"
      />

      <div className={styles.input_group}>
        <label>Paragraph</label>
        <textarea
          ref={paraRef}
          value={para}
          className="text_area"
          onChange={onChangePara}
        />
      </div>

      <SelectImage
        onChange={handleFileChange}
        selectedImage={selectedImageUrl}
      />

      {error ? (
        <input className={styles.error_input} value={error} disabled />
      ) : null}

      {progress > 0 ? <ProgressBar progress={progress} /> : null}

      <button disabled={loading} type="submit">
        {loading ? <ClipLoader color="#fff" /> : "Submit"}
      </button>
    </form>
  );
};

export default AchivementsInput;
