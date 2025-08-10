import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BlogPost } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import dbConnect from '@/lib/db';
import BlogPostModel from '@/models/BlogPost';

async function getPost(slug: string): Promise<BlogPost | null> {
  await dbConnect();
  const post = await BlogPostModel.findOne({ slug }).lean();
  if (!post) {
    return null;
  }
  return JSON.parse(JSON.stringify(post));
}

async function getAllPosts(): Promise<BlogPost[]> {
    await dbConnect();
    const posts = await BlogPostModel.find({}).lean();
    return JSON.parse(JSON.stringify(posts));
}

export async function generateStaticParams() {
    const posts: BlogPost[] = await getAllPosts();

    return posts.map((post) => ({
        slug: post.slug,
    }));
}


export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
           <article className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    data-ai-hint={post.hint}
                  />
                </div>
                <div className="mb-4 text-center">
                    <CardTitle className="text-4xl font-bold tracking-tight">{post.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">{post.date}</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                  <p>{post.content}</p>
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
