import FacilitiesSection from "@components/FacilitiesSection";
import Footer from "@components/Footer";
import Hero from "@components/Hero";


const FacilityPage = () => {
  const imageUrl = "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l2aWwlMjBlbmdpbmVlcmluZyUyMGZhY2lsaXRpZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60"
  return (
    <>
      <Hero name="Achievements" image={imageUrl} />
      <FacilitiesSection />
      <Footer />
    </>
  );
};

export default FacilityPage;
