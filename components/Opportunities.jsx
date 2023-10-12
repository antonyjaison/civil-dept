import styles from "@styles/opertunities.module.scss";
import Image from "next/image";

const Opportunities = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.img_section}>
        <img src="/images/illus_2.svg" alt="img" />
      </div>
      <div className={styles.content}>
        <h1>Opportunities</h1>
        <p>
          A degree in civil engineering opens up a wide range of career
          opportunities. Our graduates find employment in various sectors,
          including construction companies, consulting firms, government
          agencies, research organizations, and academia. The demand for civil
          engineers is ever-growing, and our department strives to equip
          students with the skills and knowledge necessary to succeed in their
          chosen career paths.
        </p>
      </div>
    </div>
  );
};

export default Opportunities;
