import Image from "next/image";
import about from "@styles/about.module.scss";

const About = () => {
  return (
    <section className={about.main}>
      <div className={`container ${about.wrapper}`}>
        <div className={about.one}>
          <h2>About us</h2>
          <p className={about.text}>
            The Civil Engineering Department at Government Engineering College,
            Sreekrishnapuram is dedicated to providing quality education and
            fostering a deep understanding of civil engineering principles. We
            offer a comprehensive range of academic programs, state-of-the-art
            facilities, and opportunities for research and professional
            development.
          </p>
        </div>
        <div className={about.two}>
          <Image
            className={about.desktop}
            loading="lazy"
            src="/images/spring.png"
            width={375}
            height={700}
            alt="image"
          />
          <Image
            className={about.mobile}
            loading="lazy"
            src="/images/illus_1_mobile.svg"
            width={300}
            height={280}
            alt="image"
          />
        </div>

        <div className={about.three}>
          <div>
            <h3>Mission</h3>
            <p className={about.text}>
              The Civil Engineering Department at Government Engineering
              College, Sreekrishnapuram is dedicated to providing quality
              education and fostering a deep understanding of civil engineering
              principles.
            </p>
          </div>
          <div>
            <h3>Vision</h3>
            <p className={about.text}>
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
