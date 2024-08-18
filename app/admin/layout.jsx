"use client";

import styles from "@styles/adminPage.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminRootLayout = ({ children }) => {
  const pathname = usePathname();

  const tabs = ["Facilities", "Faculty", "Gallery", "Achievements", "Placement"];

  return (
    <div className={`container py-5`}>
      <div className={`row`}>
        <div className={`col-lg-7 ${styles.tab_section}`}>
          <div className={styles.tabs}>
            {tabs.map((tab) => {
              const isActive = pathname.split("/")[2] === tab;

              return (
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  href={`/admin/${tab}`}
                  key={tab}
                >
                  <div className={styles.tab} key={tab}>
                    <p className={isActive ? styles.active_tab : null}>{tab}</p>
                    {isActive && <div className={styles.active_line}></div>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AdminRootLayout;
