import file from "@styles/file.module.scss";

const File = ({ name, id, setfolderID }) => {
  return (
    <div onClick={() => setfolderID(id)} className={file.wrapper}>
      <div className={file.top}>
        <div className={file.icons}>
          <img src="/icons/file.svg" alt="file_icon" />
          <img src="/icons/dots.svg" alt="dots_icon" />
        </div>
        <p>{name}</p>
      </div>
      <div className={file.bottom}></div>
    </div>
  );
};

export default File;
