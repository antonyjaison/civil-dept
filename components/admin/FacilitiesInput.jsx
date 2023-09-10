import SelectImage from "./SelectImage";
import InputGroup from "./InputGroup";
import styles from '@styles/adminPage.module.scss'
import { useState,useRef } from "react";

const FacilitiesInput = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [img, setImg] = useState(null);
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0]; // Get the selected file
  
      if (selectedFile) {
        setImg(selectedFile);
        const imageUrl = URL.createObjectURL(selectedFile);
        setSelectedImage(imageUrl);
      }
    };
    const [facilityName, setFacilityName] = useState("");
    const [description, setDescription] = useState("");

    const facilityInputRef = useRef(null);
    const descriptionRef = useRef({});

    const onChangeDescription = (e) => {
      descriptionRef.current.style.border = "none";
      setDescription(e.target.value);
    };

    const submitHandler = (e) => {
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

      if (facilityName && description && img) {
        console.log("yess");
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

        <SelectImage
          onChange={handleFileChange}
          selectedImage={selectedImage}
        />

        <button type="submit">Submit</button>
      </form>
    );
  };

  export default FacilitiesInput