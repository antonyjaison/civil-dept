import styles from '@styles/facilityCard.module.scss'

const FacilityCard = ({ heading, text, image}) => {
  return (
    <div className={`row`}>
      <div className={`col-lg-4 col-md-4`}>
        <img className={`w-100`} src={image} alt="image" />
      </div>
      <div className={`col-lg-8 col-md-8 ${styles.content}`}>
        <h2>{heading}</h2>
        <p>
          {text}
        </p>
      </div>
    </div>
  );
};

export default FacilityCard;
