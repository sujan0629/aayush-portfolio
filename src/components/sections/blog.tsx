import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { blogPosts, BlogPost } from '@/lib/data';

interface BlogProps {
  posts?: BlogPost[];
  showViewAll?: boolean;
}

export function Blog({ posts = blogPosts, showViewAll = false }: BlogProps) {
  const displayPosts = showViewAll ? posts.slice(0, 3) : posts;

  return (
    <section id="blog" className="">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Blog &amp; Insights</h2>
          <p className="text-lg text-muted-foreground mt-2">My thoughts on engineering, sustainability, and technology.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => (
            <Card key={post.slug} className="flex flex-col overflow-hidden">
               <CardHeader className="p-0">
                <Link href={`/blog/${post.slug}`}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    data-ai-hint={post.hint}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <div className="mb-2">
                  {post.tags.map(tag => <Badge key={tag} variant="secondary" className="mr-2">{tag}</Badge>)}
                </div>
                <CardTitle className="text-xl font-semibold mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{post.date}</span>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href={`/blog/${post.slug}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {showViewAll && (
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/blog">
                View All Posts <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
