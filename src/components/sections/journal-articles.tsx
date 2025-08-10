import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { imageUrls } from '@/lib/images';

export function JournalArticles() {
  return (
    <section id="journal-articles" className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight">Journal Articles</h2>
        <p className="text-lg text-muted-foreground mt-2">My published work in academic journals.</p>
      </div>
       <Card>
        <CardContent className="p-6 grid md:grid-cols-2 gap-8 items-center">
             <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                    src={imageUrls.journalArticles}
                    alt="Journal placeholder"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="scientific journal"
                />
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Peer-Reviewed Research</h3>
                <p className="text-muted-foreground">
                This section will feature a comprehensive list of my peer-reviewed journal articles. My research focuses on advancing knowledge in structural engineering, sustainable materials, and computational mechanics. Each publication represents a rigorous investigation into complex engineering problems.
                </p>
                <p className="text-muted-foreground">Detailed articles and links to the publications will be updated here shortly.</p>
            </div>
        </CardContent>
      </Card>
    </section>
  );
}
