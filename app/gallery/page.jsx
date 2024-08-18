import Footer from "@components/Footer";
import GallerySection from "@components/GallerySection";
import Hero from "@components/Hero";

const GalleryPage = () => {
  const imageUrl = "https://plus.unsplash.com/premium_photo-1661335257817-4552acab9656?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  return (
    <>
      <Hero name="Gallery" image={imageUrl}/>
      <GallerySection/>
      <Footer />
    </>
  );
};

export default GalleryPage;