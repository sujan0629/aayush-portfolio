import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Trophy } from 'lucide-react';

const achievements = [
  {
    icon: <Trophy className="h-8 w-8 text-primary" />,
    title: 'First Place, Inter-College Bridge Design Competition',
    issuer: 'National Society of Civil Engineers',
    year: '2022',
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: 'Dean\'s List for Academic Excellence',
    issuer: 'IOE, Pulchowk Campus',
    year: '2021, 2022',
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: 'Scholarship for Sustainable Innovation Research',
    issuer: 'Future Builders Foundation',
    year: '2023',
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Achievements &amp; Awards</h2>
          <p className="text-lg text-muted-foreground mt-2">Recognition of my dedication and hard work.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                {item.icon}
                <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.issuer}</p>
                <p className="text-sm font-medium text-primary">{item.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
