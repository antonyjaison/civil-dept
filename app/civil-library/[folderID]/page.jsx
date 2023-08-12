import FileSection from "@components/FileSection";
import styles from "@styles/dashboard.module.scss";

const Dashboard =  async ({ params }) => {
  let { folderID } = params;

  if (folderID === "favorites") {
    folderID = "root"
  }

  const links = ["home", "s2", "egineering-graphics"];
  return (
    <section className={styles.container}>
      <div className={styles.heading}>

      <h2>Dashboard</h2>
      <div className={styles.nav_links}>
        {links.map((link) => (
          <span>{link}/</span>
        ))}
      </div>
      </div>
      <FileSection folderID={folderID}/>
    </section>
  );
};

export default Dashboard;
