'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useRouter } from 'next/navigation';
import { ContactInfo } from '@/lib/data';

const contactInfoSchema = z.object({
  location: z.string().min(1, 'Location is required'),
  email: z.string().email('Must be a valid email'),
  linkedin: z.string().url('Must be a valid LinkedIn URL'),
});

type FormValues = z.infer<typeof contactInfoSchema>;

export default function ContactInfoPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      location: '',
      email: '',
      linkedin: '',
    },
  });
  
  React.useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.replace('/login');
      return;
    }
    
    fetch(`/api/contact-info`)
      .then(res => res.json())
      .then((data: ContactInfo) => {
        if(data) {
            form.reset(data);
        }
      });
  }, [router, form, toast]);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch(`/api/contact-info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update contact info');
      }

      toast({
        title: 'Contact Info Updated!',
        description: 'The contact details have been updated successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while updating the contact info.',
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Edit Contact Information</CardTitle>
              <CardDescription>Update the location, email, and LinkedIn URL displayed on your site.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField control={form.control} name="location" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl><Input placeholder="e.g., New Baneshwor, Kathmandu, Nepal" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl><Input placeholder="e.g., your.email@example.com" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                   <FormField control={form.control} name="linkedin" render={({ field }) => (
                      <FormItem>
                          <FormLabel>LinkedIn URL</FormLabel>
                          <FormControl><Input placeholder="https://linkedin.com/in/your-profile" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <Button type="submit">Update Information</Button>
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
