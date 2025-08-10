import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { About } from './about';
import { Timeline } from './timeline';

export function AtAGlance() {
  return (
    <section id="at-a-glance" className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight">At a Glance</h2>
        <p className="text-lg text-muted-foreground mt-2">A summary of my profile.</p>
      </div>
      <About />
      <Timeline />
    </section>
  );
}
