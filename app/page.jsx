import Hero from '@components/Hero';
import home from '@styles/home.module.scss'

export default function Home() {
  return (
    <main className={home.wraapper}>
      <Hero/>
    </main>
  );
}
