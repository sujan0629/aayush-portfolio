import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { JournalArticle } from '@/lib/data';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface JournalArticlesProps {
    articles: JournalArticle[];
    isLoading: boolean;
}

export function JournalArticles({ articles, isLoading }: JournalArticlesProps) {
  return (
    <section id="journal-articles" className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight">Journal Articles</h2>
        <p className="text-lg text-muted-foreground mt-2">My published work in academic journals.</p>
      </div>
       {isLoading ? (
         <div className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
         </div>
       ) : articles.length > 0 ? (
        <div className="space-y-8">
            {articles.map(article => (
            <Card key={article._id}>
                <CardContent className="p-6 grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                            src={article.image}
                            alt={article.title}
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint={article.hint}
                        />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold">{article.title}</h3>
                        <p className="text-muted-foreground font-medium">{article.journal} - {article.date}</p>
                        <p className="text-muted-foreground">{article.summary}</p>
                        <Button asChild variant="link" className="p-0 h-auto">
                            <a href={article.link} target="_blank" rel="noopener noreferrer">
                                Read Article <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
            ))}
        </div>
       ) : (
        <p className="text-center text-muted-foreground">No journal articles have been added yet.</p>
       )}
    </section>
  );
}
