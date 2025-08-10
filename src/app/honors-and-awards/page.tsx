'use client';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Achievements } from '@/components/sections/achievements';
import { HonorAward } from '@/lib/data';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function HonorsAndAwardsPage() {
  const [awards, setAwards] = useState<HonorAward[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function loadAwards() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/honors-awards');
        if (!res.ok) {
          throw new Error('Failed to fetch honors and awards');
        }
        const data = await res.json();
        setAwards(data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error fetching awards',
          description: 'Could not load honors and awards data. Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadAwards();
  }, [toast]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <Achievements achievements={awards} isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  );
}
