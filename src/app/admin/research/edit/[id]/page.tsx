'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useRouter, useParams } from 'next/navigation';
import { Research } from '@/lib/data';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  authors: z.string().min(1, 'Authors are required'),
  status: z.enum(['Published', 'Under Review', 'In Progress']),
  journal: z.string().min(1, 'Journal is required'),
  abstract: z.string().min(1, 'Abstract is required'),
  link: z.string().url().optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditResearchPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isLoading, setIsLoading] = React.useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  
  React.useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.replace('/login');
      return;
    }
    
    if (id) {
      setIsLoading(true);
      fetch(`/api/research/${id}`)
        .then(res => res.json())
        .then((data: Research) => {
          form.reset({
            ...data,
            link: data.link || '',
          });
          setIsLoading(false);
        }).catch(() => {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to load research data.' });
            router.push('/admin/research');
        });
    }
  }, [id, router, form, toast]);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch(`/api/research/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      toast({
        title: 'Item Updated!',
        description: 'The research item has been updated successfully.',
      });
      router.push('/admin/research');
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
              <CardTitle>Edit Research Item</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Research Title" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="authors" render={({ field }) => (
                        <FormItem><FormLabel>Authors</FormLabel><FormControl><Input placeholder="e.g., Bhatta, A." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="journal" render={({ field }) => (
                        <FormItem><FormLabel>Journal/Conference</FormLabel><FormControl><Input placeholder="e.g., Journal of Materials" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="link" render={({ field }) => (
                        <FormItem><FormLabel>Publication Link</FormLabel><FormControl><Input placeholder="https://example.com/publication" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="status" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Under Review">Under Review</SelectItem>
                              <SelectItem value="Published">Published</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="abstract" render={({ field }) => (
                        <FormItem><FormLabel>Abstract</FormLabel><FormControl><Textarea placeholder="A brief abstract of the research." {...field} rows={6} /></FormControl><FormMessage /></FormItem>
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
