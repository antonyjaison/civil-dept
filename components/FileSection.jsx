import File from "./File";
import styles from "@styles/filesection.module.scss";

const getFiles = async (folderID) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/files?folderID=${folderID}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const FileSection = async ({ folderID }) => {
  const { Documents, Folders } = await getFiles(folderID);
  console.log(Documents);

  return (
    <div className={styles.container}>
      {Folders &&
        Folders.map((folder) => (
          <File key={folder.id} name={folder.name} id={folder.id} />
        ))}
      {/* {Documents &&
        Documents.map((folder) => (
          <File key={folder.id} name={folder.name} id={folder.id} />
        ))} */}
    </div>
  );
};

export default FileSection;
