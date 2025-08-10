import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, ArrowRight } from 'lucide-react';
import { OtherPublication } from '@/lib/data';
import { Button } from '@/components/ui/button';

interface OtherPublicationsProps {
    publications: OtherPublication[];
    isLoading: boolean;
}

export function OtherPublications({ publications, isLoading }: OtherPublicationsProps) {
  return (
    <section id="other-publications" className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight">Other Publications</h2>
        <p className="text-lg text-muted-foreground mt-2">Conference papers, posters, and other publications.</p>
      </div>
      <div className="max-w-4xl mx-auto space-y-8">
        {isLoading ? (
            <p>Loading publications...</p>
        ) : publications.length > 0 ? (
            publications.map((pub) => (
              <Card key={pub.id} className="w-full">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <BookOpen className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{pub.title}</CardTitle>
                            <CardDescription>{pub.publication} - {pub.date}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{pub.description}</p>
                   <Button asChild variant="link" className="p-0 h-auto">
                     <a href={pub.link} target="_blank" rel="noopener noreferrer">
                      View Publication <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))
        ) : (
            <p className="text-center text-muted-foreground">No other publications have been added yet.</p>
        )}
      </div>
    </section>
  );
}
