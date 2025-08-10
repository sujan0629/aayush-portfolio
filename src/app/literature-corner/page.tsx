'use client';

import * as React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LiteratureCorner } from '@/components/sections/literature-corner';
import { Literature } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

function LiteratureFallback() {
    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

export default function LiteratureCornerPage() {
  const [literatures, setLiteratures] = React.useState<Literature[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadLiteratures() {
        try {
            const response = await fetch('/api/literature-corner');
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            setLiteratures(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
    loadLiteratures();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        {isLoading ? <LiteratureFallback /> : <LiteratureCorner items={literatures} />}
      </main>
      <Footer />
    </div>
  );
}
