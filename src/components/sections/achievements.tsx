import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Trophy } from 'lucide-react';
import { HonorAward } from '@/lib/data';
import { Skeleton } from '../ui/skeleton';

interface AchievementsProps {
    achievements: HonorAward[];
    isLoading: boolean;
}

const iconMap: { [key: string]: React.ReactNode } = {
    Trophy: <Trophy className="h-8 w-8 text-primary" />,
    Award: <Award className="h-8 w-8 text-primary" />,
};

export function Achievements({ achievements, isLoading }: AchievementsProps) {
  return (
    <section id="achievements" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Achievements &amp; Awards</h2>
          <p className="text-lg text-muted-foreground mt-2">Recognition of my dedication and hard work.</p>
        </div>
        {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
        ) : achievements.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item) => (
            <Card key={item._id}>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                {iconMap[item.icon] || <Award className="h-8 w-8 text-primary" />}
                <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.issuer}</p>
                <p className="text-sm font-medium text-primary">{item.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        ) : (
            <p className="text-center text-muted-foreground">No honors or awards have been added yet.</p>
        )}
      </div>
    </section>
  );
}
