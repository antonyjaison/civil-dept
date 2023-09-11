"use client";

import { useState } from "react";
import styles from "@styles/adminPage.module.scss";
import FacilitiesInput from "@components/admin/FacilitiesInput";
import FacultyInput from "@components/admin/FacultyInput";

const AdminPage = () => {
  const tabContents = {
    Facilities: <FacilitiesInput />,
    Faculty: <FacultyInput />,
    Achievements: <p>Achievements</p>,
    Placement: <p>placement</p>,
  };

  const tabs = Object.keys(tabContents);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const changeTab = (tab) => {
    setSelectedTab(tab);
  };


  return (
    <div className={`container py-5`}>
      <div className={`row`}>
        <div className={`col-lg-7 ${styles.tab_section}`}>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <div className={styles.tab} key={tab}>
                <p
                  className={selectedTab === tab ? styles.active_tab : null}
                  onClick={() => changeTab(tab)}
                >
                  {tab}
                </p>
                {selectedTab === tab && (
                  <div className={styles.active_line}></div>
                )}
              </div>
            ))}
          </div>
          {/* Input section */}
          {tabContents[selectedTab]}
        </div>
        <div className={`col-lg-5`}>
          
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
