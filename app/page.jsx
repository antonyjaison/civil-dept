import Hero from '@components/Hero';
import About from '@components/About'
import Programs from '@components/Programs';
import Opportunities from "@components/Opportunities";
import Footer from "@components/Footer";

export default function Home() {
  return (
    <main>
      <Hero name="Explore Civil Engineering" image="/images/hero.png" />
      <About />
      <Programs />
      <Opportunities />
      <Footer />
    </main>
  );
}
