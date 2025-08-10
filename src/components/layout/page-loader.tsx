'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PageLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This effect runs on the client after the component mounts.
    // We'll use this effect to listen for link clicks and to hide the loader when navigation is complete.
    setLoading(false);

    const handleLinkClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement;
      // Traverse up the DOM tree to find the anchor tag
      while (target && target.tagName !== 'A') {
        target = target.parentElement as HTMLElement;
      }

      if (
        target &&
        target.tagName === 'A' &&
        target.hasAttribute('href')
      ) {
        const href = target.getAttribute('href');
        const currentPath = window.location.pathname + window.location.search;

        // Check if it's an internal link, not a link to an external site, a hash link, or the current page.
        if (href && href.startsWith('/') && !href.startsWith('/#') && href !== currentPath) {
          setLoading(true);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [pathname, searchParams]);


  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-[101] transition-all duration-300',
        loading ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      )}
    >
      <div className="p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg border">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </div>
    </div>
  );
}
