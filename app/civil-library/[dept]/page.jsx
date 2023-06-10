"use client";
import { useEffect, useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import deptLib from "@styles/depLibrary.module.scss";
import Logo from "@components/Logo";
import DepartmentCard from "@components/DepartmentCard";

const DepartmentLibrary = ({ params }) => {
  const [animate, setAnimate] = useState(false);

  const menuIconAnimation = useSpring({
    transform: `rotate(${animate ? 180 : 0}deg)`,
  });

  const handleAnimation = () => {
    if (window.innerWidth < 750) {
      return useSpring({
        transform: animate ? "translateX(0%)" : "translateX(-100%)",
        opacity: animate ? 1 : 0,
        config: config.default,
      });
    } else {
      return useSpring({
        transform: animate ? "translateX(100%)" : "translateX(-0%)",
        opacity: animate ? 0 : 1,
        config: config.default,
      });
    }
  };

  const { dept } = params;

  return (
    <>
      <section className={deptLib.wrapper}>
        <animated.div style={handleAnimation()} className={deptLib.sidebar}>
          <Logo />

          <div className={deptLib.departments}>
            <DepartmentCard/>
            <DepartmentCard/>
            <DepartmentCard/>
            <DepartmentCard/>
            <DepartmentCard/>
            <DepartmentCard/>
            <DepartmentCard/>
            <DepartmentCard/>
          </div>

          <button>
            <img src="/icons/home.svg" alt="" /> Go Home
          </button>
        </animated.div>

        
        <div className={deptLib.file_section}>
          <nav>
            <h1>Department Library</h1>
            <div onClick={() => setAnimate((prev) => !prev)}>
              <animated.div
                className={deptLib.menuIcon}
                style={menuIconAnimation}
              >
                {animate ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="currentColor"
                      d="M3 18h18v-2H3v2zM3 13h18v-2H3v2zM3 6v2h18V6H3z"
                    />
                  </svg>
                )}
              </animated.div>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
};

export default DepartmentLibrary;
