'use client';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { JournalArticles } from '@/components/sections/journal-articles';
import { JournalArticle } from '@/lib/data';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function JournalArticlesPage() {
  const [articles, setArticles] = useState<JournalArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function loadArticles() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/journal-articles');
        if (!res.ok) {
          throw new Error('Failed to fetch journal articles');
        }
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error fetching articles',
          description: 'Could not load journal articles data. Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadArticles();
  }, [toast]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <JournalArticles articles={articles} isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  );
}
