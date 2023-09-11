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
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import db from "@firebase/config";
import { storage } from "@firebase/config";
import uploadImageToFirebase from "@util/uploadImage";

const FacilitiesInput = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [img, setImg] = useState(null);
  const [facilityName, setFacilityName] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

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
    e.preventDefault();
    if (facilityName === "") {
      facilityInputRef.current.style.border = "1px solid red";
    }
    if (description === "") {
      descriptionRef.current.style.border = "1px solid red";
    }
    if (img === null) {
      alert("Select an image");
    }

    if ((facilityName, description, img)) {
      const facilitiesCollectionRef = collection(db, "facilities");
      const queryRef = query(
        facilitiesCollectionRef,
        where("facilityName", "==", facilityName)
      );

      try {
        const querySnapshot = await getDocs(queryRef);

        if (querySnapshot.empty) {
          uploadImageToFirebase(img, "image", setProgress)
            .then(async (downloadURL) => {
              // Handle the uploaded image URL here
              console.log("Image URL:", downloadURL);
              // Add a Firestore document with the image downloadURL
              await addDoc(facilitiesCollectionRef, {
                facilityName: facilityName,
                description: description,
                image: downloadURL, // Store the image URL
                timestamp: Timestamp.now(),
              });
            })
            .catch((error) => {
              // Handle any errors during the upload
              console.error("Error uploading image:", error);
              setError("Error uploading image");
            });
        } else {
          console.log("Facility with this name already exists");
          setError("Facility with this name already exists");
        }
      } catch (error) {
        console.log(error);
        setError("Error occured");
      }
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
          <input className={styles.error_input} value={error} disabled/>
      ) : null}

      <SelectImage onChange={handleFileChange} selectedImage={selectedImage} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default FacilitiesInput;
