import HeroCarousel from '@/components/HeroCarousel';
import TopDeals from '@/components/TopDeals';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <HeroCarousel />
      <TopDeals />
    </main>
  );
}
