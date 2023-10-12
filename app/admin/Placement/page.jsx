"use client";

import styles from "@styles/adminPage.module.scss";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import getDetailsFromFirebase from "@util/getDetailsFromFirebase";
import AdminDeleteButton from "@components/admin/AdminDeleteButton";

import PlacementInput from "@components/admin/PlacementInput";
import {
  deletePlacement,
  setPlacements,
} from "@app/redux/features/placement/placementSlice";

const Placement = () => {
  const dispatch = useDispatch();
  const placements = useSelector((state) => state.placement.placements);

  useEffect(() => {
    const getDetails = async () => {
      const placementsData = await getDetailsFromFirebase("placements");
      dispatch(setPlacements(placementsData));
    };
    getDetails();
  }, []);

  return (
    <div className={`row`}>
      <div className={`col-lg-6`}>
        <PlacementInput />
      </div>
      <div className={`col-lg-6`}>
        <div className={styles.admin_output_section}>
          {placements.length > 0 ? (
            placements.map((d) => (
              <div key={d.id} className={styles.facility_output_card}>
                <div className={styles.card_content}>
                  <h3>
                    {d.name}&nbsp;({d.year})
                  </h3>
                  <AdminDeleteButton
                    id={d.id}
                    collection="placements"
                    dispatchFunction={deletePlacement}
                  />
                </div>
                <hr />
              </div>
            ))
          ) : (
            <p className="text-center mt-3">Nothing To show</p>
          )}
        </div>
      </div>
    </div>
  );
};





export default Placement;
