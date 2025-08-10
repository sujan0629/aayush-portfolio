import * as React from 'react';
import { TimelineEvent } from '@/lib/data';
import { About } from './about';
import { Timeline } from './timeline';

interface AtAGlanceProps {
  events: TimelineEvent[];
  isLoading: boolean;
}

export function AtAGlance({ events, isLoading }: AtAGlanceProps) {
  return (
    <section id="at-a-glance" className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight">At a Glance</h2>
        <p className="text-lg text-muted-foreground mt-2">A summary of my profile.</p>
      </div>
      <div className="space-y-16">
        <About />
        <Timeline events={events} isLoading={isLoading} />
      </div>
    </section>
  );
}
