'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useRouter } from 'next/navigation';
import { imageUrls } from '@/lib/images';

const literatureSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Must be a valid URL'),
  hint: z.string().min(1, 'Hint is required'),
});

type FormValues = z.infer<typeof literatureSchema>;

export default function NewLiteraturePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.replace('/login');
    } else {
        setIsLoading(false);
    }
  }, [router]);

  const form = useForm<FormValues>({
    resolver: zodResolver(literatureSchema),
    defaultValues: {
      title: '',
      author: '',
      description: '',
      image: imageUrls.literatureDefault,
      hint: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('/api/literature-corner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create literature item');
      }

      toast({
        title: 'Item Created!',
        description: 'The new literature item has been added successfully.',
      });
      router.push('/admin/literature-corner');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while creating the item.',
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
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Add New Literature Item</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField control={form.control} name="title" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl><Input placeholder="Book Title" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="author" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Author</FormLabel>
                          <FormControl><Input placeholder="Author's Name" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                   <FormField control={form.control} name="image" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl><Input placeholder="https://placehold.co/600x400" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="hint" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Image Hint</FormLabel>
                          <FormControl><Input placeholder="e.g. classic library" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="description" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl><Textarea placeholder="A brief summary of the book." {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <Button type="submit">Create Item</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
