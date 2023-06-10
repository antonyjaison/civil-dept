"use client";

import Image from "next/image";
import about from "@styles/about.module.scss";

const About = () => {

  
  if (window.innerWidth < 450) {
    var image = "/images/illus_1_mobile.svg";
  } else image = "/images/illus_1.svg";

  return (
    <section className={about.main}>
      <div className={`container ${about.wrapper}`}>
        <div className={about.one}>
          <Image
            layout="responsive"
            loading="lazy"
            src={image}
            width={375}
            height={700}
          />
        </div>
        <div className={about.two}>
          <h1>About us</h1>
          <p className={`text`}>
            The Civil Engineering Department at Government Engineering College,
            Sreekrishnapuram is dedicated to providing quality education and
            fostering a deep understanding of civil engineering principles. We
            offer a comprehensive range of academic programs, state-of-the-art
            facilities, and opportunities for research and professional
            development.
          </p>
        </div>
        <div className={about.three}>
          <div>
            <h1>Mission</h1>
            <p className={`text`}>
              The Civil Engineering Department at Government Engineering
              College, Sreekrishnapuram is dedicated to providing quality
              education and fostering a deep understanding of civil engineering
              principles.
            </p>
          </div>
          <div>
            <h1>Vision</h1>
            <p className={`text`}>
              The Civil Engineering Department at Government Engineering
              College, Sreekrishnapuram is dedicated to providing quality
              education and fostering a deep understanding of civil engineering
              principles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
