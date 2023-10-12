import FacilityCard from "./FacilityCard";
import styles from "@styles/facilitySection.module.scss";
import getDetailsFromFirebase from "@util/getDetailsFromFirebase";

const FacilitiesSection = async () => {
  const facilities = await getDetailsFromFirebase("facilities");
  return (
    <div className={`container py-4 ${styles.wrapper}`}>
      {facilities.map((facility) => (
        <FacilityCard
          image={facility.image}
          heading={facility.facilityName}
          text={facility.description}
        />
      ))}
    </div>
  );
};

export default FacilitiesSection;
