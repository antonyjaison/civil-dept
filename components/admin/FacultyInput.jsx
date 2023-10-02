"use client";

import InputGroup from "./InputGroup";
import SelectImage from "./SelectImage";
import { useState, useRef,useEffect } from "react";
import styles from "@styles/adminPage.module.scss";
import verifyEmail from "@util/verifyEmail";
import verifyPhoneNumber from "@util/verifyPhone";

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
import ProgressBar from "./ProgressBar";
import { addFaculty } from "@app/redux/features/faculty/facultySlice";

const FacultyInput = () => {
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const dispatch = useDispatch();



  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      setImg(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImageUrl(imageUrl);
    }
  };

  const [facultyName, setFacultyName] = useState("");
  const [facultyDesignation, setFacultyDesignation] = useState("");
  const [facultyEmail, setFacultyEmail] = useState("");
  const [facultyPhone, setFacultyPhone] = useState("");

  const facultyNameRef = useRef(null);
  const facultyDesignationRef = useRef(null);
  const facultyEmailRef = useRef(null);
  const facultyPhoneRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("")

    if (facultyName === "") {
      facultyNameRef.current.style.border = "1px solid red";
    }
    if (facultyDesignation === "") {
      facultyDesignationRef.current.style.border = "1px solid red";
    }
    if (facultyEmail === "" || !verifyEmail(facultyEmail)) {
      facultyEmailRef.current.style.border = "1px solid red";
    }
    if (facultyPhone === "" || !verifyPhoneNumber(facultyPhone)) {
      facultyPhoneRef.current.style.border = "1px solid red";
    }
    if (img === null) {
      alert("Select an image");
    }

    if (
      facultyName &&
      facultyDesignation &&
      verifyEmail(facultyEmail) &&
      verifyPhoneNumber(facultyPhone) &&
      img
    ) {
      setLoading(true)
      const facultiesCollectionRef = collection(db, "faculties");
      const queryRef = query(
        facultiesCollectionRef,
        where("facultyName", "==", facultyName)
      );

      try {
        const querySnapshot = await getDocs(queryRef);

        if (querySnapshot.empty) {
          uploadImageToFirebase(img, "faculty", setProgress)
            .then(async (downloadURL) => {
              setProgress(0);
              const time = Timestamp.now().toString()
              // Add a Firestore document with the image downloadURL
              const data = await addDoc(facultiesCollectionRef, {
                facultyName: facultyName,
                facultyEmail: facultyEmail,
                facultyPhone: facultyPhone,
                facultyDesignation: facultyDesignation,
                image: downloadURL,
                timestamp: time,
              });

              console.log(data.id);

              dispatch(
                addFaculty({
                  facultyName: facultyName,
                  facultyEmail: facultyEmail,
                  facultyPhone: facultyPhone,
                  facultyDesignation: facultyDesignation,
                  image: downloadURL,
                  timestamp: time,
                  id: data.id,
                })
              );

              setSelectedImageUrl(null);
              setImg(null);
              setFacultyName("");
              setFacultyDesignation("");
              setFacultyEmail("");
              setFacultyPhone("");
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
          console.log("Faculty with this name already exists");
          setError("Faculty with this name already exists");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setError("Error occured");
      }finally{
        setLoading(false)
      }
    }
  };
  return (
    <form className={`p-5 ${styles.form_section}`} onSubmit={submitHandler}>
      <InputGroup
        name={facultyName}
        setName={setFacultyName}
        nameFor="Faculty Name"
        type="text"
        inputRef={facultyNameRef}
        placeholder="eg. Anoop"
      />
      <InputGroup
        name={facultyDesignation}
        setName={setFacultyDesignation}
        nameFor="Designation"
        type="text"
        inputRef={facultyDesignationRef}
        placeholder="eg. Assistant professor"
      />
      <InputGroup
        name={facultyEmail}
        setName={setFacultyEmail}
        nameFor="Email"
        type="text"
        inputRef={facultyEmailRef}
        placeholder="eg. anoop@gecskp.in"
      />
      <InputGroup
        name={facultyPhone}
        setName={setFacultyPhone}
        nameFor="Phone"
        type="text"
        inputRef={facultyPhoneRef}
        placeholder="eg. 9876543210"
      />

      <SelectImage
        onChange={handleFileChange}
        selectedImage={selectedImageUrl}
      />

      {error ? (
        <input className={styles.error_input} value={error} disabled />
      ) : null}

      {progress > 0 ? <ProgressBar progress={progress} /> : null}

      <button disabled={loading} type="submit">
        {loading ? <ClipLoader color="#fff"/> : "Submit"}
      </button>
    </form>
  );
};

export default FacultyInput;
