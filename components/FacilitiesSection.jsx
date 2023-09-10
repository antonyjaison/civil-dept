import FacilityCard from './FacilityCard'
import styles from '@styles/facilitySection.module.scss'

const FacilitiesSection = () => {
  return (
    <div className={`container py-4 ${styles.wrapper}`}>
        <FacilityCard/>
        <FacilityCard/>
        <FacilityCard/>
        <FacilityCard/>
        <FacilityCard/>
    </div>
  )
}

export default FacilitiesSection