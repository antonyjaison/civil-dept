import styles from "@styles/file.module.scss";
import AddToFav from "./AddToFav";
import Link from "next/link";
import OpenButton from "./OpenButton";

const PdfCard = ({ name, id, type }) => {
  return (
    <Link className={styles.link} href={`/file/${id}`}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.icons}>
            <img src="/icons/pdf.svg" alt="pdf_icon" />
            <AddToFav type={type} id={id} name={name} />
          </div>
          <p>{name}</p>
        </div>
        <div className={styles.bottom}>
          <OpenButton id={id} />
        </div>
      </div>
    </Link>
  );
};

export default PdfCard;
