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
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    const handleStateChange = () => {
        setLoading(true);
    };

    history.pushState = function (...args) {
        handleStateChange();
        originalPushState.apply(this, args);
    };

    history.replaceState = function (...args) {
        handleStateChange();
        originalReplaceState.apply(this, args);
    };
    
    const handlePopState = () => {
        handleStateChange();
    };

    window.addEventListener('popstate', handlePopState);
    
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        const url = link.getAttribute('href');
        if (url && (url.startsWith('/') || url.startsWith(window.location.origin))) {
            link.addEventListener('click', handleStateChange);
        }
    });

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', handlePopState);
      links.forEach(link => {
        const url = link.getAttribute('href');
        if (url && (url.startsWith('/') || url.startsWith(window.location.origin))) {
            link.removeEventListener('click', handleStateChange);
        }
      });
    };
  }, [pathname]);


  return (
    <div
      className={cn(
        'fixed bottom-4 left-4 z-[101] transition-all duration-300',
        loading ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      )}
    >
      <div className="p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg border">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </div>
    </div>
  );
}
