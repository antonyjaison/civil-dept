import Hero from '@components/Hero';
import About from '@components/About'
import Programs from '@components/Programs';
import Oppertunities from '@components/Oppertunities';
import Footer from '@components/Footer';

export default function Home() {
  return (
    <main>
      <Hero/>
      {/* <About/> */}
      <Programs/>
      <Oppertunities/>
      <Footer/>
    </main>
  );
}
