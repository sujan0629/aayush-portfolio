import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { imageUrls } from '@/lib/images';

export function ResearchActivities() {
  return (
    <section id="research-activities" className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight">Research Activities</h2>
        <p className="text-lg text-muted-foreground mt-2">My involvement in various research projects and activities.</p>
      </div>
      <Card>
        <CardContent className="p-6 grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                    src={imageUrls.researchActivities}
                    alt="Research placeholder"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="modern laboratory"
                />
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Exploring the Frontiers of Engineering</h3>
                <p className="text-muted-foreground">
                My research activities extend beyond publications. I am actively involved in laboratory experiments, computational modeling, and collaborative projects that aim to solve pressing engineering challenges. This section will provide a closer look at my ongoing research, experimental setups, and the innovative questions I am currently investigating.
                </p>
                <p className="text-muted-foreground">Details of my current research activities are being compiled and will be updated soon.</p>
            </div>
        </CardContent>
      </Card>
    </section>
  );
}
