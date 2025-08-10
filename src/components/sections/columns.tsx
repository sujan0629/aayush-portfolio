import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Newspaper } from 'lucide-react';
import { Column } from '@/lib/data';

interface ColumnsProps {
    columns: Column[];
    isLoading: boolean;
}

export function Columns({ columns, isLoading }: ColumnsProps) {
  return (
    <section id="columns" className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight">Read My Columns</h2>
        <p className="text-lg text-muted-foreground mt-2">A collection of my published columns and articles on engineering and society.</p>
      </div>
      <div className="max-w-4xl mx-auto space-y-8">
        {isLoading ? (
            <p>Loading columns...</p>
        ) : columns.length > 0 ? (
            columns.map((column) => (
              <Card key={column.id} className="w-full">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Newspaper className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{column.title}</CardTitle>
                            <CardDescription>{column.outlet} - {column.date}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{column.summary}</p>
                   <Button asChild variant="link" className="p-0 h-auto">
                     <a href={column.link} target="_blank" rel="noopener noreferrer">
                      Read Full Column <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))
        ) : (
            <p className="text-center text-muted-foreground">No columns have been added yet.</p>
        )}
      </div>
    </section>
  );
}
