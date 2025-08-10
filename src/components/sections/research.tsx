'use client';
import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Research as ResearchType } from '@/lib/data';
import { Skeleton } from '../ui/skeleton';

interface ResearchProps {
    publications: ResearchType[];
    isLoading: boolean;
}

export function Research({ publications, isLoading }: ResearchProps) {
  return (
    <section id="research" className="">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Research &amp; Publications</h2>
          <p className="text-lg text-muted-foreground mt-2">My contributions to the field of civil engineering.</p>
        </div>
        <Card>
          <CardContent className="p-6">
            {isLoading ? (
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            ) : (
            <Accordion type="single" collapsible className="w-full">
              {publications.map((pub) => (
                <AccordionItem value={pub._id} key={pub._id}>
                  <AccordionTrigger>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">{pub.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                         <Badge variant={pub.status === 'Published' ? 'default' : pub.status === 'Under Review' ? 'secondary' : 'outline'}>{pub.status}</Badge>
                         <p className="text-sm text-muted-foreground">{pub.authors}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="font-semibold text-muted-foreground mb-2">{pub.journal}</p>
                    <p className="leading-relaxed">{pub.abstract}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
