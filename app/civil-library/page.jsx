import DepartmentAbout from "@components/DepartmentAbout";
import Footer from "@components/Footer";
import Hero from "@components/Hero";
import React from "react";

const CivilPage = () => {
  return (
    <main>
      <Hero name="Department Library" image="/images/library-hero.png" />
      <DepartmentAbout />
      <Footer />
    </main>
  );
};

export default CivilPage;
