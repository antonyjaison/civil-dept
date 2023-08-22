import styles from "@styles/acheivementsSection.module.scss";
import AchivementCard from "./AchivementCard";

const AchievementsSection = () => {
  return (
    <div className={styles.main_wrapper}>
        <h3 className={styles.heading}>Explore our achievements 🏆</h3>
      <div className={styles.wrapper}>
        <AchivementCard />
        <AchivementCard />
        <AchivementCard />
        <AchivementCard />
        <AchivementCard />
        <AchivementCard />
      </div>
    </div>
  );
};

export default AchievementsSection;
