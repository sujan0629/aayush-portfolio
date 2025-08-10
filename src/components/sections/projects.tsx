import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import type { Project } from '@/lib/data';

interface ProjectsProps {
  projects: Project[];
  showViewAll?: boolean;
}

export function Projects({ projects, showViewAll = false }: ProjectsProps) {
  return (
    <section id="projects" className="">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Projects</h2>
          <p className="text-lg text-muted-foreground mt-2">A selection of my academic and professional work.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.slug} className="flex flex-col">
              <CardHeader>
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                  <Link href={`/projects/${project.slug}`}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={project.hint}
                        className="transition-transform duration-300 hover:scale-105"
                      />
                  </Link>
                </div>
                <Badge variant="default" className="w-fit">{project.category}</Badge>
                <CardTitle className="pt-2 font-semibold">
                  <Link href={`/projects/${project.slug}`} className="hover:underline">
                    {project.title}
                  </Link>
                </CardTitle>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{project.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2">
                  {project.links.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> GitHub
                      </a>
                    </Button>
                  )}
                  {project.links.report && (
                     <Button variant="outline" size="sm" asChild>
                      <Link href={`/reports/${project.links.report}`}>
                        <ExternalLink className="mr-2 h-4 w-4" /> Report
                      </Link>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        {showViewAll && (
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
