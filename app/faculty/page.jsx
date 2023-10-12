import FacultySection from "@components/FacultySection";
import Footer from "@components/Footer";
import Hero from "@components/Hero";

const FacultyPage = () => {
  const imageUrl = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRlYWNoZXJzfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60"
  return (
    <>
      <Hero name="Faculties" image={imageUrl}/>
      <FacultySection />
      <Footer />
    </>
  );
};

export default FacultyPage;
