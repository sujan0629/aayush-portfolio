import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AtAGlance } from '@/components/sections/at-a-glance';

export default function AtAGlancePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <AtAGlance />
      </main>
      <Footer />
    </div>
  );
}
