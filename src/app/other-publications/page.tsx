'use client';
import * as React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { OtherPublications } from '@/components/sections/other-publications';
import { OtherPublication } from '@/lib/data';


export default function OtherPublicationsPage() {
  const [publications, setPublications] = React.useState<OtherPublication[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    fetch('/api/other-publications')
    .then(res => res.json())
    .then(data => {
        setPublications(data);
        setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <OtherPublications publications={publications} isLoading={isLoading}/>
      </main>
      <Footer />
    </div>
  );
}
