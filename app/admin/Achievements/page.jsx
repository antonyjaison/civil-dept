"use client";

import styles from "@styles/adminPage.module.scss";
import AchivementsInput from "@components/admin/AchivementsInput";
import AdminDeleteButton from "@components/admin/AdminDeleteButton";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { setAchivements } from "@app/redux/features/achivements/achivementsSlice";
import { deleteAchivement } from "@app/redux/features/achivements/achivementsSlice";
import getDetailsFromFirebase from "@util/getDetailsFromFirebase";

const AchievementsA = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getDetails = async () => {
      const achivements = await getDetailsFromFirebase("achivements");
      dispatch(setAchivements(achivements));
    };
    getDetails();
  }, []);

  const achivements = useSelector((state) => state.achivements.achivements);
  return (
    <div className={`row`}>
      <div className={`col-lg-6`}>
        <AchivementsInput />
      </div>
      <div className={`col-lg-6`}>
        <div className={styles.admin_output_section}>
          {achivements.length > 0 ? (
            achivements.map((d) => {
              return (
                <div key={d.id} className={styles.facility_output_card}>
                  <div className={styles.card_content}>
                    <h3>{d.title}</h3>
                    <AdminDeleteButton
                      id={d.id}
                      collection="achivements"
                      dispatchFunction={deleteAchivement}
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

export default AchievementsA;
