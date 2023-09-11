import InputGroup from "./InputGroup";
import SelectImage from "./SelectImage";
import { useState,useRef } from "react";
import styles from '@styles/adminPage.module.scss'
import verifyEmail from "@util/verifyEmail";
import verifyPhoneNumber from "@util/verifyPhone";

const FacultyInput = () => {
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [img, setImg] = useState(null);

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

  const submitHandler = (e) => {
    e.preventDefault();

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
      console.log(
        facultyName,
        facultyDesignation,
        facultyEmail,
        facultyPhone,
        img
      );
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

      <SelectImage onChange={handleFileChange} selectedImage={selectedImageUrl} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default FacultyInput;
