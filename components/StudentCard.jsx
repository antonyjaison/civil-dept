import styles from "@styles/studentCard.module.scss";

const StudentCard = ({ details }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <img src={details.image} alt="student" />
        <div className={styles.details_section}>
          <h3 className={styles.name}>{details.name}</h3>
          <p className={styles.company}>Company : {details.company}</p>
          <p className={styles.year}>Year of placement : {details.year}</p>
        </div>
      </div>
    </>
  );
};

export default StudentCard;
