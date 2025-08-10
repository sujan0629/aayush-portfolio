import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Literature } from '@/lib/data';

interface LiteratureCornerProps {
  items: Literature[];
}

export function LiteratureCorner({ items }: LiteratureCornerProps) {
  return (
    <section id="literature-corner" className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight">Literature Corner</h2>
        <p className="text-lg text-muted-foreground mt-2">A selection of recommended reading and influential works.</p>
      </div>
       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
            <Card key={item.id}>
                <CardHeader>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                            src={item.image}
                            alt={item.title}
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint={item.hint}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
                    <CardDescription className="font-medium">{item.author}</CardDescription>
                    <p className="text-muted-foreground mt-2">{item.description}</p>
                </CardContent>
            </Card>
        ))}
       </div>
    </section>
  );
}
