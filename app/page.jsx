import Hero from '@components/Hero';
import About from '@components/About'
import Programs from '@components/Programs';
import Oppertunities from '@components/Oppertunities';

export default function Home() {
  return (
    <main>
      <Hero/>
      {/* <About/> */}
      <Programs/>
      <Oppertunities/>
    </main>
  );
}
