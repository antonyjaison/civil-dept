import file from "@styles/file.module.scss";
import Link from "next/link";
import AddToFav from "./AddToFav";

const File = ({ name, id,type }) => {

  const isFavorite = () => {
    
  }


  return (
    <Link className={file.link} href={`/civil-library/file/${id}`}>
      <div className={file.wrapper}>
        <div className={file.top}>
          <div className={file.icons}>
            <img src="/icons/file.svg" alt="file_icon" />
            <AddToFav type={type} id={id} name={name} />
          </div>
          <p>{name}</p>
        </div>
        <div className={file.bottom}></div>
      </div>
    </Link>
  );
};

export default File;
