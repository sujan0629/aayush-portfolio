'use client';

import * as React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Research as ResearchSection } from '@/components/sections/research';
import { Research } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export default function ResearchAndPublicationsPage() {
  const [publications, setPublications] = React.useState<Research[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();

  React.useEffect(() => {
    async function loadResearch() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/research');
        if (!res.ok) {
          throw new Error('Failed to fetch research data');
        }
        const data = await res.json();
        setPublications(data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not load research publications.',
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadResearch();
  }, [toast]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <ResearchSection publications={publications} isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  );
}
