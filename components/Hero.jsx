"use client";

import hero from "@styles/hero.module.scss";
import Link from "next/link";
import { useState } from "react";
import Logo from "@components/Logo";
import Login from "./Login";
import { isUserExist } from "@util/functions";

const Hero = ({ name, image }) => {
  const [mobileNav, setMobileNav] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userExist, setUserExist] = useState(isUserExist());

  const setLogin = () => {
    setIsLogin(!isLogin);
  };

  const setLogOut = () => {
    localStorage.removeItem("email");
    setUserExist(false);
  };

  const background = {
    background: `
      linear-gradient(
        180deg,
        #000000 0%,
        rgba(0, 0, 0, 0) 33.33%,
        rgba(0, 0, 0, 0) 66.67%,
        #000000 100%
      ),
      url(${image})
    `,
  };

  const checkLength = (name) => {
    return name.split(" ").length > 1;
  };

  const splitName = (name) => {
    let splitedName = name.split(" ");
    let firstText = splitedName[0];
    
    let otherString = '';
  
    for (let i = 1; i < splitedName.length; i++) {
      otherString = otherString + ' ' + splitedName[i];
    }
  
    return `${firstText}<br/>${otherString}`;
  };
  

  return (
    <main style={background} className={hero.wrapper}>
      <div className={hero.navbar}>
        <nav className={`container`}>
          <Logo />

          <div className={hero.links}>
            {userExist && (
              <Link href="/civil-library/1-mUzNBGS-gf0XxLc7yGUoOxFIniFsJUN">
                / Library
              </Link>
            )}
            <Link href="#">/ Achievements</Link>
            <Link href="#">/ Faculty</Link>
            <Link href="#">/ Gallery</Link>
            {userExist ? (
              <Link href="#" onClick={setLogOut}>
                / Logout
              </Link>
            ) : (
              <Link href="#" onClick={setLogin}>
                / Login
              </Link>
            )}
          </div>

          {/* <Login/> */}

          {mobileNav ? (
            <div className={hero.mobile_links}>
              <h1 onClick={() => setMobileNav(false)}>X</h1>
              {userExist && (
                <Link href="/civil-library/1-mUzNBGS-gf0XxLc7yGUoOxFIniFsJUN">
                  / Library
                </Link>
              )}
              <Link href="#">/ Achievements</Link>
              <Link href="#">/ Faculty</Link>
              <Link href="#">/ Gallery</Link>
              {!!userExist ? (
                <Link href="#" onClick={setLogOut}>
                  / Logout
                </Link>
              ) : (
                <Link href="#" onClick={setLogin}>
                  / Login
                </Link>
              )}
            </div>
          ) : (
            <p className="d_lg_none" onClick={() => setMobileNav(true)}>
              / Menu
            </p>
          )}
        </nav>
        <div className={`container sm_d_none ${hero.line}`} />
      </div>

      <h1
        dangerouslySetInnerHTML={{
          __html: checkLength(name) ? splitName(name) : name,
        }}
        className={`container`}
      >
        {/* Explore <br />
        Civil Engineering */}
      </h1>

      {isLogin && (
        <Login
          setUserExist={setUserExist}
          isLogin={isLogin}
          setLogin={setLogin}
        />
      )}
    </main>
  );
};

export default Hero;
