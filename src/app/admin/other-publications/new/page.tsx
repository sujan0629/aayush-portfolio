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

const publicationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  publication: z.string().min(1, 'Publication name is required'),
  date: z.string().min(1, 'Date is required'),
  link: z.string().url('Must be a valid URL'),
  description: z.string().min(1, 'Description is required'),
});

type FormValues = z.infer<typeof publicationSchema>;

export default function NewOtherPublicationPage() {
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
    resolver: zodResolver(publicationSchema),
    defaultValues: {
      title: '',
      publication: '',
      date: new Date().toISOString().split('T')[0],
      link: '',
      description: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('/api/other-publications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create publication');
      }

      toast({
        title: 'Publication Created!',
        description: 'The new publication has been added successfully.',
      });
      router.push('/admin/other-publications');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while creating the publication.',
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
              <CardTitle>Add New Publication</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField control={form.control} name="title" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl><Input placeholder="Publication Title" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="publication" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Publication/Conference Name</FormLabel>
                          <FormControl><Input placeholder="e.g., International Conference on Civil Engineering" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="date" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl><Input type="date" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="link" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Link</FormLabel>
                          <FormControl><Input placeholder="https://example.com/publication" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="description" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl><Textarea placeholder="A brief description of the publication." {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <Button type="submit">Create Publication</Button>
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
