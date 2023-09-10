import styles from '@styles/facultyCard.module.scss'

const FacultyCard = () => {
  return (
    <div className={styles.wrapper}>
        <img src="/images/person.png" alt="faculty" />
        <div className={styles.details_section}>
            <h3 className={styles.name}>Sajitha M</h3>
            <p className={styles.designation}>Assistant Professor</p>
            <hr />
            <div className={styles.contact}>
                <a href="mailto:demo@gmail.com">demo@gmail.com</a>
                <a href="tel:9876543210">+91 9876543210</a>
            </div>
        </div>
    </div>
  )
}

export default FacultyCard