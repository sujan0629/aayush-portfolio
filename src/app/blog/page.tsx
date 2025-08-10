'use client';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Blog } from '@/components/sections/blog';
import { BlogPost } from '@/lib/data';
import { Suspense, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

function BlogFallback() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )
}


export default function AllBlogPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function loadBlogPosts() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/blog');
        if (!res.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error fetching blog posts',
          description: 'Could not load blog data. Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadBlogPosts();
  }, [toast]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <Suspense fallback={<BlogFallback />}>
          {isLoading ? <BlogFallback /> : <Blog posts={posts} />}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}