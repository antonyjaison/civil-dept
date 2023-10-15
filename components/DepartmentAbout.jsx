import React from "react";
import styles from "@styles/about-dept.module.scss";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function DepartmentAbout() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.desktop}
            style={{ width: "100%" }}
            src="/images/spring.png"
            width={375}
            height={697}
          />
          <Image
            className={styles.mobile}
            style={{ width: "100%" }}
            src="/images/illus_1_mobile.svg"
            width={300}
            height={280}
          />
        </div>
        <div className={styles.info}>
          <p>
            The Department Library of Civil Engineering is a valuable resource
            for students, faculty, and researchers in the Civil Engineering
            Department. Our library provides access to a wide range of digital
            resources, including e-books, academic journals, research papers,
            and other educational materials. Whether you are working on a
            project, conducting research, or seeking additional learning
            materials, our online library is here to support your academic
            endeavors.
          </p>
        </div>
        <div className={styles.link}>
          <Link href="/civil-library/file/1-mUzNBGS-gf0XxLc7yGUoOxFIniFsJUN">
            <div>
              <div>
                <p>/&nbsp;library</p>
                <ArrowUpRight color="#000" />
              </div>
              <p>Take me there</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DepartmentAbout;
