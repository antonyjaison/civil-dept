import { useState } from "react";
import styles from "@styles/adminPage.module.scss";
import SelectImage from "./SelectImage";
import { ClipLoader } from "react-spinners";
import ProgressBar from "./ProgressBar";
import * as z from "zod";
import { addDoc, collection, getDocs } from "firebase/firestore";
import uploadImageToFirebase from "@util/uploadImage";
import db from "@firebase/config";
import { useDispatch } from "react-redux";
import { addPlacement } from "@app/redux/features/placement/placementSlice";

const placementSchema = z.object({
  name: z.string().min(1, "name is required").max(50, "name is too long"),
  company: z
    .string()
    .min(1, "company is required")
    .max(50, "company is too long"),
  year: z.string().length(4),
});

function PlacementInput() {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();

  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState(null);

  const [data, setData] = useState({
    name: "",
    year: currentYear.toString(),
    company: "",
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      setImg(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImageUrl(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const parsedData = placementSchema.safeParse(data);
    if (!parsedData.success) {
      setError(parsedData.error.format());
      setLoading(false);
      return;
    }

    if (!img) {
      setFileError("Image is required");
      setLoading(false);
      return;
    }

    setError(null);
    setFileError(null);

    try {
      const placementsCollectionRef = collection(db, "placements");
      uploadImageToFirebase(img, "faculty", setProgress)
        .then(async (downloadURL) => {
          setProgress(0);
          // Add a Firestore document with the image downloadURL
          const data = await addDoc(placementsCollectionRef, {
            name: parsedData.data.name,
            year: parsedData.data.year,
            image: downloadURL,
            company: parsedData.data.company,
          });

          dispatch(
            addPlacement({
              id: data.id,
              name: parsedData.data.name,
              year: parsedData.data.year,
              image: downloadURL,
              company: parsedData.data.company,
            })
          );

          setData({
            name: "",
            year: currentYear.toString(),
            company: "",
          });
          setSelectedImageUrl(null);
          setImg(null);
        })
        .catch((error) => {
          // Handle any errors during the upload
          console.error("Error uploading image:", error);
          setFileError("Error uploading image");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setFileError("Error occured");
    } finally {
      setLoading(false);
    }
  };

  const years = [];

  for (let i = currentYear; i >= currentYear - 10; i--) {
    years.push(i.toString());
  }

  const updateData = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <form className={`p-5 ${styles.form_section}`} onSubmit={handleSubmit}>
      <div className={styles.input_group}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={data.name}
          name="name"
          onChange={(e) => updateData("name", e.target.value)}
        />
        {error?.name?._errors[0] && (
          <p className="mt-2 text-danger">{error.name._errors[0]}</p>
        )}
      </div>
      <div className={styles.input_group}>
        <label htmlFor="company">Company</label>
        <input
          type="text"
          value={data.company}
          name="company"
          onChange={(e) => updateData("company", e.target.value)}
        />
        {error?.company?._errors[0] && (
          <p className="mt-2 text-danger">{error.company._errors[0]}</p>
        )}
      </div>
      <div className={styles.input_group}>
        <label htmlFor="year">Year</label>
        <select
          onChange={(e) => updateData("year", e.target.value)}
          name="year"
          id="year"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <SelectImage
        onChange={handleFileChange}
        selectedImage={selectedImageUrl}
      />
      {fileError && <p className="text-danger">{fileError}</p>}

      {progress > 0 ? <ProgressBar progress={progress} /> : null}

      <button disabled={loading} type="submit">
        {loading ? <ClipLoader color="#fff" /> : "Submit"}
      </button>
    </form>
  );
}

export default PlacementInput;
