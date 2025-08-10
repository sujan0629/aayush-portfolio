import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Tv } from 'lucide-react';
import { MediaCoverage as MediaCoverageType } from '@/lib/data';

interface MediaCoverageProps {
    items: MediaCoverageType[];
    isLoading: boolean;
}

export function MediaCoverage({ items, isLoading }: MediaCoverageProps) {
  return (
    <section id="media-coverage" className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight">Media Coverage</h2>
        <p className="text-lg text-muted-foreground mt-2">Mentions and features in the media.</p>
      </div>
      <div className="max-w-4xl mx-auto space-y-8">
        {isLoading ? (
            <p>Loading media coverage...</p>
        ) : items.length > 0 ? (
            items.map((item) => (
              <Card key={item._id} className="w-full">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Tv className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>{item.outlet} - {item.date}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.summary}</p>
                   <Button asChild variant="link" className="p-0 h-auto">
                     <a href={item.link} target="_blank" rel="noopener noreferrer">
                      View Source <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))
        ) : (
            <p className="text-center text-muted-foreground">No media coverage has been added yet.</p>
        )}
      </div>
    </section>
  );
}
