'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Send, MapPin, Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

type FormValues = z.infer<typeof formSchema>;

export function Contact() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      form.reset();
      toast({
        title: 'Message Sent!',
        description: 'Thank you for reaching out. I will get back to you shortly.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while sending your message. Please try again.',
      });
    }
  };

  return (
    <section id="contact" className="">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mt-2">I'm open to discussing new projects and opportunities.</p>
        </div>
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-8">
             <Card>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <MapPin className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle className="text-lg font-semibold">Location</CardTitle>
                  <CardDescription>
                      New Baneshwor, Kathmandu, Nepal
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <Mail className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle className="text-lg font-semibold">Email</CardTitle>
                  <CardDescription>
                    <a href="mailto:aayushbhatta05@gmail.com" className="hover:underline">
                      aayushbhatta05@gmail.com
                    </a>
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <Linkedin className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle className="text-lg font-semibold">LinkedIn</CardTitle>
                  <CardDescription>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      linkedin.com/in/aayush-bhatta
                    </a>
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Send me a message</CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormControl><Input placeholder="Your Name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormControl><Input type="email" placeholder="Your Email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                    <FormField control={form.control} name="subject" render={({ field }) => (<FormItem><FormControl><Input placeholder="Subject" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormControl><Textarea placeholder="Your Message" rows={5} {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
