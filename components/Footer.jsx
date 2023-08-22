import styles from "@styles/footer.module.scss";
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <main className={styles.main_wrapper}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Logo />
          <p>
            Government Engineering College. <br /> Sreekrishnapuram, Palakkad
          </p>
        </div>
        <div className={styles.links}>
          <p>Links</p>
          <div className={styles.line}></div>
          <Link href="#">/ Library</Link>
          <Link href="#">/ Gallery</Link>
          <Link href="#">/ Achivements</Link>
          <Link href="#">/ Faculty</Link>
        </div>
      </div>
      <div className={styles.line}></div>
    </main>
  );
};

export default Footer;
