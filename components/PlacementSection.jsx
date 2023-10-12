import StudentCard from "./StudentCard";
import styles from "@styles/acheivementsSection.module.scss";
import getDetailsFromFirebase from "@util/getDetailsFromFirebase";

const PlacementSection = async () => {
  const placements = await getDetailsFromFirebase("placements");
  return (
    <div className={styles.main_wrapper}>
      <h3 className={styles.heading}></h3>
      <div className={styles.wrapper}>
        {placements.map((placement) => (
          <StudentCard details={placement}/>
        ))}
      </div>
    </div>
  );
};

export default PlacementSection;
