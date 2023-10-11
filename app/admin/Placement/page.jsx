"use client";

import styles from "@styles/adminPage.module.scss";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import FacultyInput from "@components/admin/FacultyInput";
import getDetailsFromFirebase from "@util/getDetailsFromFirebase";
import { setFaculties } from "@app/redux/features/faculty/facultySlice";
import AdminDeleteButton from "@components/admin/AdminDeleteButton";
import { deleteFaculty } from "@app/redux/features/faculty/facultySlice";

const Placement = () => {
  const dispatch = useDispatch();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getDetails = async () => {
      const faculties = await getDetailsFromFirebase("placements");
      const Firebasecompanies = await getDetailsFromFirebase("companies");
      setCompanies(Firebasecompanies)
      dispatch(setFaculties(faculties));
    };
    getDetails();
  }, []);

  const faculties = useSelector((state) => state.faculty.faculties);

  return (
    <div className={`row`}>
      <div className={`col-lg-6`}>
        <FacultyInput />
      </div>
      <div className={`col-lg-6`}>
        <div className={styles.admin_output_section}>
          {faculties.length > 0 ? (
            faculties.map((d) => {
              console.log(d);
              return (
                <div key={d.id} className={styles.facility_output_card}>
                  <div className={styles.card_content}>
                    <h3>{d.facultyName}</h3>
                    <AdminDeleteButton
                      id={d.id}
                      collection="faculties"
                      dispatchFunction={deleteFaculty}
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

export default Placement;
