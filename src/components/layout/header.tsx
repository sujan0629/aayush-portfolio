'use client';

import * as React from 'react';
import {
  ChevronDown,
  Menu,
  Mountain,
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

const primaryLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/journal-articles', label: 'Journal Articles' },
  { href: '/honors-and-awards', label: 'Honors & Awards' },
  { href: '/research-activities', label: 'Research' },
  { href: '/#contact', label: 'Contact' },
];

const secondaryLinks = [
  { href: '/other-publications', label: 'Other Publications' },
  { href: '/columns', label: 'Columns' },
  { href: '/at-a-glance', label: 'At a Glance' },
  { href: '/camera-roll', label: 'Camera Roll' },
  { href: '/literature-corner', label: 'Literature Corner' },
  { href: '/media-coverage', label: 'Media Coverage' },
];

const allLinks = [...primaryLinks.slice(0, 6), ...secondaryLinks, primaryLinks[6]];

export function Header() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Mountain className="h-6 w-6 text-primary" />
          <span>A.B</span>
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
                  <span>A.B</span>
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
