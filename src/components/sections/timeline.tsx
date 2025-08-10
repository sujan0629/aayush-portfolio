'use client';
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, GraduationCap } from 'lucide-react';
import { TimelineEvent } from '@/lib/data';
import { Skeleton } from '../ui/skeleton';

interface TimelineProps {
    events: TimelineEvent[];
    isLoading: boolean;
}

const iconMap = {
    Briefcase: <Briefcase />,
    GraduationCap: <GraduationCap />,
}

// Custom sort function for date ranges
const sortEvents = (events: TimelineEvent[]) => {
  if (!events || !Array.isArray(events)) {
    return [];
  }
  return [...events].sort((a, b) => {
    const aYear = parseInt(a.date.split(' ').pop() ?? '0');
    const bYear = parseInt(b.date.split(' ').pop() ?? '0');
    if(a.date.includes('Present')) return -1;
    if(b.date.includes('Present')) return 1;
    return bYear - aYear;
  });
};


export function Timeline({ events, isLoading }: TimelineProps) {
  const sortedEvents = sortEvents(events);
  return (
    <section id="timeline" className="">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight">My Journey</h2>
          <p className="text-lg text-muted-foreground mt-2">A timeline of my key milestones and experiences.</p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
          
          {isLoading ? (
            <div className="space-y-10">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
          ) : (
          <div className="space-y-10">
            {sortedEvents.map((event) => (
              <div key={event._id} className={`relative flex w-full ${event.side === 'left' ? 'justify-start' : 'justify-end'}`}>
                 {/* Icon */}
                <div className={`absolute left-1/2 top-1 -translate-x-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground z-10`}>
                  {iconMap[event.icon]}
                </div>

                {/* Card */}
                <div className="w-full md:w-[calc(50%-2.5rem)]">
                  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold">{event.title}</CardTitle>
                        <p className="text-sm font-medium text-primary text-right">{event.date}</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
