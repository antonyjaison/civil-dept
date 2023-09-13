import AchivementsInput from "@components/admin/AchivementsInput";
import styles from "@styles/adminPage.module.scss";

const AchievementsA = () => {
  return (
    <div className={`row`}>
      <div className={`col-lg-6`}>
        <AchivementsInput/>
      </div>
      <div className={`col-lg-6`}></div>
    </div>
  );
};

export default AchievementsA;
