import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ResearchActivities } from '@/components/sections/research-activities';

export default function ResearchActivitiesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <ResearchActivities />
      </main>
      <Footer />
    </div>
  );
}
