"use client";

import SelectImage from "./SelectImage";
import InputGroup from "./InputGroup";
import styles from "@styles/adminPage.module.scss";
import { useState, useRef } from "react";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import db from "@firebase/config";
import uploadImageToFirebase from "@util/uploadImage";
import ClipLoader from "react-spinners/ClipLoader";

import { useDispatch } from "react-redux";
import { addFacilities } from "@app/redux/features/facilities/facilitiesSlice";
import ProgressBar from "./ProgressBar";

const FacilitiesInput = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [img, setImg] = useState(null);
  const [facilityName, setFacilityName] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const facilityInputRef = useRef(null);
  const descriptionRef = useRef({});

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      setImg(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };

  const onChangeDescription = (e) => {
    descriptionRef.current.style.border = "none";
    setDescription(e.target.value);
  };

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
  
    // Clear any previous error messages
    setError(null);
  
    if (facilityName === "") {
      facilityInputRef.current.style.border = "1px solid red";
      setLoading(false); // Reset loading state
      return;
    }
    if (description === "") {
      descriptionRef.current.style.border = "1px solid red";
      setLoading(false); // Reset loading state
      return;
    }
    if (img === null) {
      alert("Select an image");
      setLoading(false); // Reset loading state
      return;
    }
  
    const facilitiesCollectionRef = collection(db, "facilities");
    const queryRef = query(
      facilitiesCollectionRef,
      where("facilityName", "==", facilityName)
    );
  
    try {
      const querySnapshot = await getDocs(queryRef);
  
      if (querySnapshot.empty) {
        uploadImageToFirebase(img, "/facilities", setProgress)
          .then(async (downloadURL) => {
            setProgress(0);
            const time = new Date().toISOString(); // Use a serializable format
  
            // Add a Firestore document with the image downloadURL
            const data = await addDoc(facilitiesCollectionRef, {
              facilityName: facilityName,
              description: description,
              image: downloadURL,
              timestamp: time,
            });
  
            dispatch(
              addFacilities({
                facilityName: facilityName,
                description: description,
                image: downloadURL,
                timestamp: time,
                id: data.id,
              })
            );
  
            setSelectedImage(null); // Assuming you meant to clear this state
            setImg(null); // Reset image state
            setFacilityName("");
            setDescription("");
            setLoading(false); // Reset loading state
          })
          .catch((error) => {
            // Handle any errors during the upload
            console.error("Error uploading image:", error);
            setError("Error uploading image");
            setLoading(false); // Reset loading state
          });
      } else {
        console.log("Facility with this name already exists");
        setError("Facility with this name already exists");
        setLoading(false); // Reset loading state
      }
    } catch (error) {
      console.error(error);
      setError("Error occurred");
      setLoading(false); // Reset loading state
    }
  };
  

  return (
    <form className={`p-5 ${styles.form_section}`} onSubmit={submitHandler}>
      <InputGroup
        name={facilityName}
        setName={setFacilityName}
        nameFor="Facility Name"
        type="text"
        inputRef={facilityInputRef}
        placeholder="eg. Department library"
      />

      <div className={styles.input_group}>
        <label>About the Facility</label>
        <textarea
          ref={descriptionRef}
          value={description}
          className="text_area"
          onChange={onChangeDescription}
        />
      </div>

      {error ? (
        <input className={styles.error_input} value={error} disabled />
      ) : null}

      {progress > 0 && <ProgressBar progress={progress} />}

      <SelectImage onChange={handleFileChange} selectedImage={selectedImage} />

      <button type="submit">
        {loading ? <ClipLoader color="#fff" /> : "Submit"}
      </button>
    </form>
  );
};

export default FacilitiesInput;
