import styles from "@styles/acheivementsSection.module.scss";
import FacultyCard from "./FacultyCard";

const FacultySection = () => {
  return (
    <div className={styles.main_wrapper}>
      <h3 className={styles.heading}>Meet our Faculities 🧑‍🏫</h3>
      <div className={styles.wrapper}>
        <FacultyCard/>
        <FacultyCard/>
        <FacultyCard/>
        <FacultyCard/>
        <FacultyCard/>
        <FacultyCard/>
      </div>
    </div>
  );
};

export default FacultySection;
