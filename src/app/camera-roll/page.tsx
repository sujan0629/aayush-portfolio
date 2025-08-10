'use client';

import * as React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Gallery } from '@/components/sections/gallery';
import { GalleryImage } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

function GalleryFallback() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[225px] w-full rounded-xl" />
        </div>
      ))}
    </div>
  )
}

export default function CameraRollPage() {
  const [images, setImages] = React.useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadImages() {
      try {
        const response = await fetch('/api/camera-roll');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadImages();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        {isLoading ? <GalleryFallback /> : <Gallery items={images} />}
      </main>
      <Footer />
    </div>
  );
}
