import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, GraduationCap } from 'lucide-react';

const timelineEvents = [
  {
    icon: <Briefcase />,
    date: 'Jan 2025 - Present',
    title: 'Civil Engineer',
    description: 'Shivalaya Consulting Hub Pvt. Ltd. | My role involves designing and planning residential and commercial buildings, and carrying out structural analysis.',
    side: 'right',
  },
  {
    icon: <Briefcase />,
    date: 'Jan 2024 - Dec 2024',
    title: 'Civil Engineer',
    description: 'Sunpal Engineering Consultancy Pvt. Ltd. | Performed construction activities, including surveying and site investigation. Conducted problem-solving, team-building, and public outreach to prevent and resolve construction issues.',
    side: 'left',
  },
  {
    icon: <GraduationCap />,
    date: 'Sep 2018 - Aug 2023',
    title: 'Bachelor of Engineering in Civil Engineering',
    description: 'National Academy of Science and Technology, Dhangadhi, Kailali, Nepal (Pokhara University)',
    side: 'right',
  },
  {
    icon: <Briefcase />,
    date: 'Apr 2023 - Sep 2023',
    title: 'Engineering Internship',
    description: 'Bhawani Design and Engineering Solution Pvt. Ltd. | Designed and estimated costs for residential buildings, ensuring budget adherence and efficiency. Supervised construction sites, overseeing daily operations and ensuring quality standards were met.',
    side: 'left',
  },
   {
    icon: <Briefcase />,
    date: 'Aug 2022 - Oct 2022',
    title: 'Engineering Internship',
    description: 'New Modern Engineering Consultancy Pvt. Ltd. | Designed and estimated costs for residential buildings, ensuring budget adherence and efficiency. Supervised construction sites, overseeing daily operations and ensuring quality standards were met.',
    side: 'right',
  },
];

// Custom sort function for date ranges
const sortEvents = (events: typeof timelineEvents) => {
  return events.sort((a, b) => {
    const aYear = parseInt(a.date.split(' ').pop() ?? '0');
    const bYear = parseInt(b.date.split(' ').pop() ?? '0');
    if(a.date.includes('Present')) return -1;
    if(b.date.includes('Present')) return 1;
    return bYear - aYear;
  });
};


export function Timeline() {
  const sortedEvents = sortEvents([...timelineEvents]);
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
          
          <div className="space-y-10">
            {sortedEvents.map((event, index) => (
              <div key={index} className={`relative flex w-full ${event.side === 'left' ? 'justify-start' : 'justify-end'}`}>
                 {/* Icon */}
                <div className={`absolute left-1/2 top-1 -translate-x-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground z-10`}>
                  {event.icon}
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
        </div>
      </div>
    </section>
  );
}
