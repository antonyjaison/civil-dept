import file from "@styles/file.module.scss";

const File = () => {
  return (
    <div className={file.wrapper}>
      <div className={file.top}>
        <div className={file.icons}>
          <img src="/icons/file.svg" alt="file_icon" />
          <img src="/icons/dots.svg" alt="dots_icon" />
        </div>
        <p>Linear Algebra</p>
      </div>
      <div className={file.bottom}></div>
    </div>
  );
};

export default File;
