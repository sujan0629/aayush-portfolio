
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  degree: z.string().min(1, 'Degree is required'),
  institution: z.string().min(1, 'Institution is required'),
  dateRange: z.string().min(1, 'Date range is required'),
  affiliation: z.string().min(1, 'Affiliation is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewEducationPage() {
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
      degree: '',
      institution: '',
      dateRange: '',
      affiliation: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('/api/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create education entry');
      }

      toast({
        title: 'Entry Created!',
        description: 'The new education entry has been added successfully.',
      });
      router.push('/admin/about/education');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while creating the entry.',
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
              <CardTitle>Add New Education Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField control={form.control} name="degree" render={({ field }) => (
                      <FormItem><FormLabel>Degree</FormLabel><FormControl><Input placeholder="e.g., Bachelor of Engineering" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="institution" render={({ field }) => (
                      <FormItem><FormLabel>Institution</FormLabel><FormControl><Input placeholder="e.g., National Academy of Science and Technology" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="dateRange" render={({ field }) => (
                      <FormItem><FormLabel>Date Range</FormLabel><FormControl><Input placeholder="e.g., Sep 2018 - Aug 2023" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="affiliation" render={({ field }) => (
                      <FormItem><FormLabel>Affiliation</FormLabel><FormControl><Input placeholder="e.g., (Affiliated with Pokhara University, Nepal)" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit">Create Entry</Button>
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
