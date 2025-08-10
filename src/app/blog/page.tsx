import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Blog } from '@/components/sections/blog';
import { BlogPost } from '@/lib/data';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

async function loadBlogPosts(): Promise<BlogPost[]> {
  // In a real app, you would fetch this from your API
  const res = await fetch(`${process.env.API_BASE_URL}/api/blog`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  return res.json();
}

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


export default async function AllBlogPostsPage() {
  const posts = await loadBlogPosts();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <Suspense fallback={<BlogFallback />}>
          <Blog posts={posts} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
