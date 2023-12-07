import FacilityCard from "./FacilityCard";
import styles from "@styles/facilitySection.module.scss";
import getDetailsFromFirebase from "@util/getDetailsFromFirebase";
import { cookies } from 'next/headers'


const AchievementsSection = async () => {
  const cookieStore = cookies()
  const achievements = await getDetailsFromFirebase("achivements");
  return (
    <div className={`container py-4 ${styles.wrapper}`}>
      {achievements.map((achievement) => (
        <FacilityCard
        key={achievement.id}
          image={achievement.image}
          heading={achievement.title}
          text={achievement.para}
        />
      ))}
    </div>
  );
};

export default AchievementsSection;
