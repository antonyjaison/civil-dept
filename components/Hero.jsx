"use client";

import hero from "@styles/hero.module.scss";
import Link from "next/link";
import { useState } from "react";

const Hero = () => {
  const [mobileNav, setMobileNav] = useState(false);
  return (
    <main className={hero.wrapper}>
      <div className={hero.navbar}>
        <nav className={`container`}>
          <h1>
            Department of <br /> <span>Civil Engineering</span>
          </h1>

          <div className={hero.links}>
            <Link href="#">/ Library</Link>
            <Link href="#">/ Achievements</Link>
            <Link href="#">/ Faculty</Link>
            <Link href="#">/ Gallery</Link>
          </div>

          {mobileNav ? (
            <div className={hero.mobile_links}>
              <h1 onClick={() => setMobileNav(false)}>X</h1>
              <Link href="#">/ Library</Link>
              <Link href="#">/ Achievements</Link>
              <Link href="#">/ Faculty</Link>
              <Link href="#">/ Gallery</Link>
            </div>
          ) : (
            <p className="d_lg_none" onClick={() => setMobileNav(true)}>/ Menu</p>
          )}
        </nav>
        <div className={`container sm_d_none ${hero.line}`} />
      </div>

      <h1 className={`container`}>
        Explore <br />
        Civil Engineering
      </h1>
    </main>
  );
};

export default Hero;
