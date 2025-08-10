'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Trash2, Pencil, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { BlogPost } from '@/lib/data';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function ManageBlogPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchPosts = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/blog');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch blog posts.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);


  React.useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.replace('/login');
      return;
    }
    fetchPosts();
  }, [router, fetchPosts]);

  const handleDelete = async (slug: string) => {
    try {
      const response = await fetch(`/api/blog/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      setPosts(posts.filter((p) => p.slug !== slug));
      toast({
        title: 'Blog Post Deleted',
        description: 'The post has been removed successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while deleting the post.',
      });
    }
  };

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Manage Blog</h1>
            <Button asChild>
              <Link href="/admin/blog/new">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Post
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Existing Posts</CardTitle>
              <CardDescription>View, edit, or delete your existing blog posts.</CardDescription>
            </CardHeader>
            <CardContent>
              {posts.length === 0 ? (
                 <p>No blog posts found. Add one to get started.</p>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.slug} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Image src={post.image} alt={post.title} width={80} height={60} className="rounded-md object-cover" />
                        <div>
                          <h3 className="font-semibold">{post.title}</h3>
                          <p className="text-sm text-muted-foreground">{post.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                         <Button variant="outline" size="sm" asChild>
                           <Link href={`/blog/${post.slug}`} target="_blank">
                            <ExternalLink className="mr-2" /> View
                           </Link>
                         </Button>
                         <Button variant="outline" size="icon" asChild>
                           <Link href={`/admin/blog/edit/${post.slug}`}>
                            <Pencil className="h-4 w-4" />
                           </Link>
                         </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this blog post.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(post.slug)}>
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
