import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { reports } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AllReportsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold tracking-tight">All Reports</h1>
            <p className="text-lg text-muted-foreground mt-2">Detailed findings from my projects.</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {reports.map((report) => (
              <Card key={report.slug}>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">{report.title}</CardTitle>
                  <CardDescription>
                    For project: "{report.project}" | Published: {report.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{report.summary}</p>
                   <Button asChild variant="link" className="p-0 h-auto">
                     <Link href={`/reports/${report.slug}`}>
                      Read Full Report <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
