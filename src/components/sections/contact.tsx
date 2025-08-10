import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Send, MapPin } from 'lucide-react';

export function Contact() {
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
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" />
                    <Input type="email" placeholder="Your Email" />
                  </div>
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Your Message" rows={5} />
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
