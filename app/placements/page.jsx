import Footer from "@components/Footer";
import Hero from "@components/Hero";
import PlacementSection from "@components/PlacementSection";
import React from "react";

const page = () => {
  const imageUrl =
    "https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l2aWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60";
  return (
    <>
      <Hero name="Placements" image={imageUrl} />
      <PlacementSection />
      <Footer />
    </>
  );
};

export default page;
