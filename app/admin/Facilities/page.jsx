"use client";

import FacilitiesInput from "@components/admin/FacilitiesInput";
import styles from "@styles/adminPage.module.scss";
import AdminDeleteButton from "@components/admin/AdminDeleteButton";
import { query, collection, orderBy, getDocs } from "firebase/firestore";
import db from "@firebase/config";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setFacilities } from "@app/redux/features/facilities/facilitiesSlice";

const FacilitiesA = async () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getFacilities = async () => {
      const q = query(
        collection(db, "facilities"),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(setFacilities(data));
    };
    getFacilities();
  }, []);

  const facilities = useSelector((state) => state.facility.facilities);
  return (
    <div className={`row`}>
      <div className={`col-lg-6`}>
        <FacilitiesInput />
      </div>
      <div className={`col-lg-6`}>
        <div className={styles.admin_output_section}>
          {facilities.length > 0 ? (
            facilities.map((d) => {
              console.log(d);
              return (
                <div className={styles.facility_output_card}>
                  <div className={styles.card_content}>
                    <h3>{d.facilityName}</h3>
                    <AdminDeleteButton id={d.id} />
                  </div>
                  <hr />
                </div>
              );
            })
          ) : (
            <p>Nothing To show</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesA;
