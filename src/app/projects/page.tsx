'use client';

import * as React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Projects } from '@/components/sections/projects';
import { Project } from '@/lib/data';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

function ProjectsFallback() {
  return (
    <div className="container mx-auto px-4">
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
    </div>
  )
}

export default function AllProjectsPage() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();

  React.useEffect(() => {
    async function loadProjects() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/projects');
        if (!res.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await res.json();
        setProjects(data);
      } catch (error) {
         toast({
            variant: 'destructive',
            title: 'Error fetching projects',
            description: 'Could not load project data. Please try again later.',
         });
      } finally {
        setIsLoading(false);
      }
    }
    loadProjects();
  }, [toast]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        {isLoading ? <ProjectsFallback /> : <Projects projects={projects} />}
      </main>
      <Footer />
    </div>
  );
}
