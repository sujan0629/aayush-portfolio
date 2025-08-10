import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { JournalArticles } from '@/components/sections/journal-articles';

export default function JournalArticlesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <JournalArticles />
      </main>
      <Footer />
    </div>
  );
}
