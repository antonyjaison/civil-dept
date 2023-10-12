import AchievementsSection from "@components/AchievementsSection";
import Footer from "@components/Footer";
import Hero from "@components/Hero";
import React from "react";

const Achievements = () => {
  return (
    <div>
      <Hero name="Achievements" image="/images/achive_hero.png" />
      <AchievementsSection />
      <Footer />
    </div>
  );
};

export default Achievements;
