import styles from "@styles/acheivementsSection.module.scss";
import FacultyCard from "./FacultyCard";
import getDetailsFromFirebase from "@util/getDetailsFromFirebase";
import { cookies } from "next/headers";

const FacultySection = async () => {
  const cookieStore = cookies()

  const faculties = await getDetailsFromFirebase("faculties");
  return (
    <div className={styles.main_wrapper}>
      <h3 className={styles.heading}>Meet our Faculities 🧑‍🏫</h3>
      <div className={styles.wrapper}>
        {faculties.map((faculty) => {
          return (
            <FacultyCard
              name={faculty.facultyName}
              image={faculty.image}
              phone={faculty.facultyPhone}
              email={faculty.facultyEmail}
              designation={faculty.facultyDesignation}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FacultySection;
