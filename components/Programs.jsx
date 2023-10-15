import styles from "@styles/programs.module.scss";
import Image from "next/image";

const Programs = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image_section}>
        <Image src="/images/ellipse.svg" width={370} height={370} />
      </div>
      <div className={styles.content}>
        <h1>Programs</h1>
        <p>
          Our department offers undergraduate program in civil engineering. Our
          undergraduate program provides students with a strong foundation in
          core civil engineering subjects such as structural engineering,
          geotechnical engineering, transportation engineering, environmental
          engineering, and water resources engineering. Our department offers
          undergraduate program in civil engineering. Our undergraduate program
          provides students with a strong foundation in core civil engineering
          subjects such as structural engineering, geotechnical engineering,
          transportation engineering, environmental engineering, and water
          resources engineering.
        </p>
      </div>
      <div className={styles.card_section}>
        <h3>/ Bachelor</h3>
        <div className={styles.card}>
          <p>/&nbsp;Bachelor</p>
          <h3>Bachelor’s of Technology in Civil Engineering</h3>
        </div>
      </div>
    </div>
  );
};

export default Programs;
