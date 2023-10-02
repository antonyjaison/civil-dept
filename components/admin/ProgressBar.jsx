"use client";
import styles from "@styles/adminPage.module.scss";

const ProgressBar = ({ progress }) => {
  return (
    <div className={styles.progress_wrapper}>
      <div
        style={{
          width: `${progress}%`,
        }}
        className={styles.progress}
      ></div>
    </div>
  );
};

export default ProgressBar;
