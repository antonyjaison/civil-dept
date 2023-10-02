import styles from "@styles/achivement.module.scss";

const AchivementCard = () => {
  const background = {
    background: `linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 0.3) 100%
    ),
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    `,
  };
  return (
    <div style={background} className={styles.wrapper}>
      <img src="/images/person.png" alt="person" />
      <div className={styles.content}>
        <p>S1 Topper</p>
        <h3>John Doe</h3>
      </div>
    </div>
  );
};

export default AchivementCard;
