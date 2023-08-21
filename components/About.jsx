import Image from "next/image";
import about from "@styles/about.module.scss";
import { headers } from "next/headers";

const About = () => {
  const headersList = headers();
  const userAgent = headersList.get("user-agent");
  let isMobileView = userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  return (
    <section className={about.main}>
      <div className={`container ${about.wrapper}`}>
        <div className={about.one}>
          <Image
            loading="lazy"
            src={
              isMobileView
                ? "/images/illus_1_mobile.svg"
                : "/images/illus_1.svg"
            }
            width={375}
            height={700}
            alt="image"
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
