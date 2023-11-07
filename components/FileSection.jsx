import File from "./File";
import styles from "@styles/filesection.module.scss";
import PdfCard from "./PdfCard";

const getFiles = async (folderID) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/files?folderID=${folderID}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );
    if (res.ok) {
      return res.json()
    }
};

const FileSection = async ({ folderID }) => {
  const { Documents, Folders } = await getFiles(folderID);

  if (Documents.length == 0 && Folders.length == 0) {
    var isDocs = false;
  }else isDocs = true;

  function sortArrayOfObjects(arr) {
    arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  }
  
  const sortedArray = sortArrayOfObjects(Folders)

  return (
    <div className={styles.container}>
      {!isDocs && <h3>No files here</h3>}
      {sortedArray &&
        sortedArray.map((folder) => (
          <File type="folder" key={folder.id} name={folder.name} id={folder.id} />
        ))}
      {Documents &&
        Documents.map((folder) => (
          <PdfCard type="pdf" key={folder.id} name={folder.name} id={folder.id} />
        ))}
    </div>
  );
};

export default FileSection;
