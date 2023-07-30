import file from "@styles/file.module.scss";
import Link from "next/link";

const File = ({ name, id }) => {
  return (
    <Link className={file.link} href={`/civil-library/${id}`}>
      <div className={file.wrapper}>
        <div className={file.top}>
          <div className={file.icons}>
            <img src="/icons/file.svg" alt="file_icon" />
            <img src="/icons/dots.svg" alt="dots_icon" />
          </div>
          <p>{name}</p>
        </div>
        <div className={file.bottom}></div>
      </div>
    </Link>
  );
};

export default File;
