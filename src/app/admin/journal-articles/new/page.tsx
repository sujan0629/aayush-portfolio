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

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  journal: z.string().min(1, 'Journal name is required'),
  date: z.string().min(1, 'Date is required'),
  link: z.string().url('Must be a valid URL'),
  summary: z.string().min(1, 'Summary is required'),
  image: z.string().url('Must be a valid URL'),
  hint: z.string().min(1, 'Image hint is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewJournalArticlePage() {
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
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      journal: '',
      date: new Date().toISOString().split('T')[0],
      link: '',
      summary: '',
      image: imageUrls.journalArticles,
      hint: 'scientific journal',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('/api/journal-articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create journal article');
      }

      toast({
        title: 'Article Created!',
        description: 'The new journal article has been added successfully.',
      });
      router.push('/admin/journal-articles');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while creating the article.',
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
              <CardTitle>Add New Journal Article</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Article Title" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="journal" render={({ field }) => (
                        <FormItem><FormLabel>Journal</FormLabel><FormControl><Input placeholder="e.g., Journal of Structural Engineering" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="date" render={({ field }) => (
                        <FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="link" render={({ field }) => (
                        <FormItem><FormLabel>Link</FormLabel><FormControl><Input placeholder="https://example.com/article" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="summary" render={({ field }) => (
                        <FormItem><FormLabel>Summary</FormLabel><FormControl><Textarea placeholder="A brief summary of the article." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="image" render={({ field }) => (
                        <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input placeholder="https://placehold.co/600x400" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="hint" render={({ field }) => (
                        <FormItem><FormLabel>Image Hint</FormLabel><FormControl><Input placeholder="e.g., scientific journal" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  <Button type="submit">Create Article</Button>
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
