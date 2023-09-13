"use client";

import styles from "@styles/adminPage.module.scss";
import { useState, useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { collection,query,where,getDocs,Timestamp,addDoc } from "firebase/firestore";

import InputGroup from "./InputGroup";
import SelectImage from "./SelectImage";
import ProgressBar from "./ProgressBar";
import { ClipLoader } from "react-spinners";

import uploadImageToFirebase from "@util/uploadImage";
import db from "@firebase/config";
import { addAchivement } from "@app/redux/features/achivements/achivementsSlice";

const AchivementsInput = () => {
  const [title, setTitle] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [para, setPara] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const titleRef = useRef(null);
  const subHeadingRef = useRef(null);
  const paraRef = useRef(null);

  const dispatch = useDispatch();
  const achivements = useSelector(state => state.achivements.achivements)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      setImg(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImageUrl(imageUrl);
    }
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
                subHeading: subHeading,
                para: para,
                image: downloadURL,
                timestamp: time,
              });

              console.log(data.id);

              dispatch(
                addAchivement({
                  title: title,
                  subHeading: subHeading,
                  para: para,
                  image: downloadURL,
                  timestamp: time,
                })
              );

              //   setSelectedImageUrl(null);
              //   setImg(null);
              //   setFacultyName("");
              //   setFacultyDesignation("");
              //   setFacultyEmail("");
              //   setFacultyPhone("");
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
      } finally {
        setLoading(false);
      }
    }
  };

  console.log(achivements)



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
      <InputGroup
        name={subHeading}
        setName={setSubHeading}
        nameFor="Sub title"
        type="text"
        inputRef={subHeadingRef}
        placeholder="Sub title of the achivement"
      />
      <InputGroup
        name={para}
        setName={setPara}
        nameFor="Paragraph"
        type="text"
        inputRef={paraRef}
        placeholder=""
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
        {loading ? <ClipLoader color="#fff" /> : "Submit"}
      </button>
    </form>
  );
};

export default AchivementsInput;
