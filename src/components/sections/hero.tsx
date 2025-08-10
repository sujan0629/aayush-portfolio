import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';
import Image from 'next/image';
import { imageUrls } from '@/lib/images';

export function Hero() {
  return (
    <section id="home" className="relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrls.heroBackground}
          alt="Modern architecture background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          data-ai-hint="city landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50" />
      </div>
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid md:grid-cols-2 items-center gap-12 min-h-[80vh] py-16">
          <div className="relative flex justify-center items-center order-first">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-primary/20">
              <Image
                src={imageUrls.heroPortrait}
                alt="Portrait of Aayush Bhatta"
                layout="fill"
                objectFit="cover"
                data-ai-hint="man portrait"
                className="scale-105"
              />
            </div>
          </div>
          <div className="text-center md:text-left order-last">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              Aayush Bhatta
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-primary font-semibold">
              Civil Engineer | Innovator | Sustainability Advocate
            </p>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Passionate about creating resilient infrastructure and leveraging technology to build a sustainable future.
            </p>
            <div className="mt-8 flex justify-center md:justify-start gap-4">
              <a href="#contact">
                <Button size="lg">
                  <Send className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
              </a>
              <a href="/aayush-bhatta-resume.pdf" download>
                <Button size="lg" variant="outline">
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
