'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AtAGlance } from '@/components/sections/at-a-glance';
import { TimelineEvent } from '@/lib/data';
import * as React from 'react';

export default function AtAGlancePage() {
  const [timelineEvents, setTimelineEvents] = React.useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadTimelineEvents() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/timeline');
        if (!res.ok) {
          throw new Error('Failed to fetch timeline events');
        }
        const data = await res.json();
        setTimelineEvents(data);
      } catch (error) {
        console.error('Failed to load timeline data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadTimelineEvents();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <AtAGlance events={timelineEvents} isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  );
}
