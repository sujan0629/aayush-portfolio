import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Achievements } from '@/components/sections/achievements';

export default function HonorsAndAwardsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <Achievements />
      </main>
      <Footer />
    </div>
  );
}
