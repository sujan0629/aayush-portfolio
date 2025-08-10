import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { reports } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function generateStaticParams() {
  return reports.map((report) => ({
    slug: report.slug,
  }));
}

export default function ReportDetailsPage({ params }: { params: { slug:string } }) {
  const report = reports.find((p) => p.slug === params.slug);

  if (!report) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold tracking-tight">{report.title}</CardTitle>
                <CardDescription className="pt-2">
                  Project: {report.project} | Date: {report.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="lead text-muted-foreground font-semibold">{report.summary}</p>
                  <Separator className="my-8" />
                  {report.sections.map((section) => (
                    <div key={section.title}>
                      <h2 className="font-semibold">{section.title}</h2>
                      <p className="text-muted-foreground">{section.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
