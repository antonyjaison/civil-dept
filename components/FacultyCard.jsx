import styles from "@styles/facultyCard.module.scss";

const FacultyCard = ({ name, designation, image, email, phone }) => {
  return (
    <div className={styles.wrapper}>
      <img src={image} alt="faculty" />
      <div className={styles.details_section}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.designation}>{designation}</p>
        <hr />
        <div className={styles.contact}>
          <a href={`mailto:${email}`}>{email}</a>
          <a href={`tel:${phone}`} >{phone}</a>
        </div>
      </div>
    </div>
  );
};

export default FacultyCard;
