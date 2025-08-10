'use client';

import * as React from 'react';
import {
  ChevronDown,
  Menu,
  Mountain,
    Gift,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { GalleryImage } from '@/lib/data';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';


const primaryLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/journal-articles', label: 'Journal Articles' },
  { href: '/honors-and-awards', label: 'Honors & Awards' },
  { href: '/research-and-publications', label: 'Research' },
  { href: '/#contact', label: 'Contact' },
];

const secondaryLinks = [
  { href: '/other-publications', label: 'Other Publications' },
  { href: '/columns', label: 'Columns' },
  { href: '/at-a-glance', label: 'At a Glance' },
  { href: '/camera-roll', label: 'Camera Roll' },
  { href: '/literature-corner', label: 'Literature Corner' },
  { href: '/media-coverage', label: 'Media Coverage' },
    { href: '/research-activities', label: 'Research Activities' },

];

const allLinks = [...primaryLinks.slice(0, 6), ...secondaryLinks, primaryLinks[6]];



function SurpriseButton() {
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState<GalleryImage | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const { toast } = useToast();

    const fetchRandomImage = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/surprise-images');
            if(!res.ok) throw new Error("Could not fetch images");
            const images: GalleryImage[] = await res.json();
            
            if (images.length === 0) {
                 toast({
                    variant: 'default',
                    title: 'No Surprises Yet!',
                    description: 'The surprise image collection is empty.',
                });
                setImage(null);
                return;
            }

            const randomIndex = Math.floor(Math.random() * images.length);
            setImage(images[randomIndex]);

        } catch (error) {
             toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to fetch a surprise image.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen) {
            fetchRandomImage();
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Gift className="h-5 w-5" />
                    <span className="sr-only">Surprise!</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-6xl">
                <DialogHeader>
                    <DialogTitle>A Little Surprise!</DialogTitle>
                    <DialogDescription>Here is a random image from my collection. Enjoy!</DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center p-4 min-h-[600px]">
                    {isLoading ? (
                        <Skeleton className="w-full h-[600px]" />
                    ) : image ? (
                        <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                            <Image src={image.src} alt={image.alt} layout="fill" objectFit="cover" data-ai-hint={image.hint} />
                             <div className="absolute inset-x-0 bottom-0 bg-black/50 p-2 text-center text-white">
                                <p className="text-sm font-semibold">{image.caption}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No image to display.</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function Header() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Mountain className="h-6 w-6 text-primary" />
          <span>Aayush Bhatta</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {primaryLinks.map((link) => (
            <Button variant="link" asChild key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary px-3"
              >
                {link.label}
              </Link>
            </Button>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary px-3">
                More
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {secondaryLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="flex items-center gap-2">
                <SurpriseButton />
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 p-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-xl font-bold"
                  onClick={() => setOpen(false)}
                >
                  <Mountain className="h-6 w-6 text-primary" />
                  <span>Aayush Bhatta</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {allLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
