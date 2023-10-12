"use client";

import styles from "@styles/adminPage.module.scss";
import FacilitiesInput from "@components/admin/FacilitiesInput";
import AdminDeleteButton from "@components/admin/AdminDeleteButton";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getDetailsFromFirebase from "@util/getDetailsFromFirebase";
import { setFacilities } from "@app/redux/features/facilities/facilitiesSlice";
import { deleteFacility } from "@app/redux/features/facilities/facilitiesSlice";

const FacilitiesA = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getDetails = async () => {
      const facilities = await getDetailsFromFirebase("facilities");
      dispatch(setFacilities(facilities));
    };
    getDetails();
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
              return (
                <div key={d.id} className={styles.facility_output_card}>
                  <div className={styles.card_content}>
                    <h3>{d.facilityName}</h3>
                    <AdminDeleteButton
                      id={d.id}
                      collection="facilities"
                      dispatchFunction={deleteFacility}
                    />
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
