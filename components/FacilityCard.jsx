import styles from '@styles/facilityCard.module.scss'

const FacilityCard = () => {
  return (
    <div className={`row`}>
      <div className={`col-lg-4 col-md-4`}>
        <img className={`w-100`} src="/images/library.jpeg" alt="" />
      </div>
      <div className={`col-lg-8 col-md-8 ${styles.content}`}>
        <h2>Department Library</h2>
        <p>
          As healthy mind resides in a healthy body, the College is committed to
          promote, encourage and support wide-range of sports and games
          activities both within and outside the College for the holistic
          development of the students.
        </p>
      </div>
    </div>
  );
};

export default FacilityCard;
