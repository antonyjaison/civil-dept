import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@firebase/config";

const uploadImageToFirebase = async (image, folderName,setProgress) => {
  const storageRef = ref(storage, `${folderName}/${image.name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can track the upload progress here if needed
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress); // Update the progress state
      },
      (error) => {
        console.error(error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Upload complete. Image URL:", downloadURL);
          resolve(downloadURL);
        } catch (error) {
          console.error("Error getting download URL:", error);
          reject(error);
        }
      }
    );
  });
};

export default uploadImageToFirebase