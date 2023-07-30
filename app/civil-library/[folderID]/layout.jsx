'use client'
import styles from "@styles/deplib.module.scss";
import { useState,useEffect } from "react";
import { useSpring,animated } from "@react-spring/web";
import { useRouter } from "next/navigation";

import Logo from "@components/Logo";
import DepartmentCard from "@components/DepartmentCard";

const Librarylayout = ({ children }) => {
  const [isMoving, setIsMoving] = useState(true);

  const router = useRouter()

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMoving(true)
    }else{
      setIsMoving(false)
    }
  },[])

  const animationProps = useSpring({
    transform: !isMoving ? "translateX(0px)" : "translateX(-100%)",
    config: {
      duration: 100, // Animation duration in milliseconds
      easing: (t) => t * t, // Easing function for smoother animation (Optional)
    },
  });

  const handleClick = () => {
    setIsMoving((prevIsMoving) => !prevIsMoving);
  };

  const goToDashboard = () => {
    router.push("/civil-library/root")
    if (window.innerWidth < 768) {
      setIsMoving((prevIsMoving) => !prevIsMoving);
    }
  }

  return (
    <>
      <main className={styles.container}>
        <animated.div style={animationProps} className={styles.sidebar}>

          <div className={styles.sidebar_header}>
            <Logo/>
            <img onClick={handleClick} src="/icons/menu.svg" alt="" />
          </div>

          <div className={styles.sidebar_cards}>
            <DepartmentCard name='Dashboard' onClick={goToDashboard}/>
            <DepartmentCard name='Favorites'/>
          </div>

          <button><img src="/icons/home.svg" alt="home" /> <p>Go Home</p></button>

        </animated.div>
        <div className={styles.main_wrapper}>
          <div className={styles.header}>
            <h2>Department Library</h2>
            <img onClick={handleClick} src="/icons/menu.svg" alt="" />
          </div>

          <div className={styles.file_section}>
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default Librarylayout;
