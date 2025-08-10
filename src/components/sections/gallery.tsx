import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { GalleryImage } from '@/lib/data';

interface GalleryProps {
  items: GalleryImage[];
}

export function Gallery({ items }: GalleryProps) {
  return (
    <section id="gallery" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Gallery</h2>
          <p className="text-lg text-muted-foreground mt-2">A visual journey through my projects, workshops, and achievements.</p>
        </div>
        <Carousel className="w-full" opts={{ loop: true, align: 'start' }}>
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="flex aspect-video items-center justify-center p-0 relative group">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={800}
                        height={600}
                        data-ai-hint={item.hint}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                       <div className="absolute inset-0 bg-black/40 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white font-semibold">{item.caption}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </div>
    </section>
  );
}
