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
    // Show loader on path change
    setLoading(true);
    
    // Hide loader after a short delay to allow the page to render
    const timer = setTimeout(() => setLoading(false), 500); 

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);


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
