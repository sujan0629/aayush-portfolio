import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Projects } from '@/components/sections/projects';
import { Project } from '@/lib/data';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

async function loadProjects(): Promise<Project[]> {
  const res = await fetch(`${process.env.API_BASE_URL}/api/projects`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  return res.json();
}

function ProjectsFallback() {
  return (
    <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
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

export default async function AllProjectsPage() {
  const projects = await loadProjects();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <Suspense fallback={<ProjectsFallback />}>
          <Projects projects={projects} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
