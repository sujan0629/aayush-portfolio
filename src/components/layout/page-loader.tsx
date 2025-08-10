'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PageLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setLoading(false);

    const handleLinkClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement;
      while (target && target.tagName !== 'A') {
        target = target.parentElement as HTMLElement;
      }

      if (target && target.tagName === 'A' && target.hasAttribute('href')) {
        const href = target.getAttribute('href');
        const currentPath = window.location.pathname + window.location.search;

        if (href && href.startsWith('/') && !href.startsWith('/#') && href !== currentPath) {
          setLoading(true);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      document.removeEventListener('click', handleLinkClick);
      setLoading(false);
    };
  }, [pathname]);

  if (!isClient) {
    return null;
  }

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
