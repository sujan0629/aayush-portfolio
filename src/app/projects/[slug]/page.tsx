import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Project } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import dbConnect from '@/lib/db';
import ProjectModel from '@/models/Project';

async function getProject(slug: string): Promise<Project | null> {
  await dbConnect();
  const project = await ProjectModel.findOne({ slug }).lean();
  if (!project) {
    return null;
  }
  return JSON.parse(JSON.stringify(project));
}

async function getAllProjects(): Promise<Project[]> {
    await dbConnect();
    const projects = await ProjectModel.find({}).lean();
    return JSON.parse(JSON.stringify(projects));
}

export async function generateStaticParams() {
  const projects: Project[] = await getAllProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}


export default async function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={project.hint}
                />
              </div>
              <Badge variant="default" className="w-fit mb-2">{project.category}</Badge>
              <CardTitle className="text-4xl font-bold tracking-tight">{project.title}</CardTitle>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p>{project.longDescription}</p>
              </div>
              <div className="flex gap-4 mt-8">
                {project.links.github && (
                  <Button variant="outline" asChild>
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> View on GitHub
                    </a>
                  </Button>
                )}
                {project.links.report && (
                  <Button asChild>
                    <Link href={`/reports/${project.links.report}`}>
                      <ExternalLink className="mr-2 h-4 w-4" /> Read Full Report
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
