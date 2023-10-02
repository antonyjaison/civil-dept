"use client";

import styles from "@styles/adminPage.module.scss";
import { deleteDoc, doc } from "firebase/firestore";
import db from "@firebase/config";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const AdminDeleteButton = ({ id,collection,dispatchFunction }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const deletedDocRef = await deleteDoc(doc(db, collection, id));
      console.log("Document successfully deleted:", deletedDocRef);
      dispatch(dispatchFunction(id));
    } catch (error) {
      console.error("Error deleting document:", error);
    } finally {
      setLoading(false); // Set loading back to false regardless of success or error
    }
  };

  return (
    <button onClick={handleDelete} className={styles.admin_delete_buttton}>
      {loading ? <ClipLoader color="#fff"/> : "Delete"}
    </button>
  );
};

export default AdminDeleteButton;
