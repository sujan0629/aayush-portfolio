'use client';

import * as React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MediaCoverage } from '@/components/sections/media-coverage';
import { MediaCoverage as MediaCoverageType } from '@/lib/data';

export default function MediaCoveragePage() {
  const [items, setItems] = React.useState<MediaCoverageType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    fetch('/api/media-coverage')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <MediaCoverage items={items} isLoading={isLoading}/>
      </main>
      <Footer />
    </div>
  );
}
