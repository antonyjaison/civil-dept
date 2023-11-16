import FacilityCard from "./FacilityCard";
import styles from "@styles/facilitySection.module.scss";
import getDetailsFromFirebase from "@util/getDetailsFromFirebase";
import { cookies } from 'next/headers'


const FacilitiesSection = async () => {
  const cookieStore = cookies()
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
