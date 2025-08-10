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
import { useRouter, useParams } from 'next/navigation';
import { MediaCoverage } from '@/lib/data';

const mediaCoverageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  outlet: z.string().min(1, 'Outlet is required'),
  date: z.string().min(1, 'Date is required'),
  link: z.string().url('Must be a valid URL'),
  summary: z.string().min(1, 'Summary is required'),
});

type FormValues = z.infer<typeof mediaCoverageSchema>;

export default function EditMediaCoveragePage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isLoading, setIsLoading] = React.useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(mediaCoverageSchema),
  });
  
  React.useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.replace('/login');
      return;
    }
    
    if (id) {
      setIsLoading(true);
      fetch(`/api/media-coverage/${id}`)
        .then(res => res.json())
        .then((data: MediaCoverage) => {
          form.reset(data);
          setIsLoading(false);
        }).catch(() => {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to load media coverage data.' });
            router.push('/admin/media-coverage');
        });
    }
  }, [id, router, form, toast]);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch(`/api/media-coverage/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update media coverage');
      }

      toast({
        title: 'Media Coverage Updated!',
        description: 'The item has been updated successfully.',
      });
      router.push('/admin/media-coverage');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while updating the item.',
      });
    }
  };

  if (isLoading) {
    return <div className="flex min-h-screen flex-col items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Edit Media Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField control={form.control} name="title" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl><Input placeholder="Article Title" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="outlet" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Outlet</FormLabel>
                          <FormControl><Input placeholder="e.g., City Times Newspaper" {...field} /></FormControl>
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
                          <FormControl><Input placeholder="https://example.com/article" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="summary" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Summary</FormLabel>
                          <FormControl><Textarea placeholder="A brief summary of the coverage." {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />

                  <Button type="submit">Update Item</Button>
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
