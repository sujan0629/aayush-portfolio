'use client';
import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck, FileText, Star } from 'lucide-react';
import { Certification, Licensure } from '@/lib/data';

const iconMap: { [key: string]: React.ReactNode } = {
  Star: <Star className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
};

export function Certifications() {
  const [certifications, setCertifications] = React.useState<Certification[]>([]);
  const [licensure, setLicensure] = React.useState<Licensure | null>(null);

  React.useEffect(() => {
    fetch('/api/certifications').then(res => res.json()).then(data => setCertifications(data));
    fetch('/api/licensure').then(res => res.json()).then(data => setLicensure(data));
  }, []);

  return (
    <section id="certifications" className="">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Certifications &amp; Licensure</h2>
          <p className="text-lg text-muted-foreground mt-2">My professional credentials and qualifications.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Licensure</CardTitle>
            </CardHeader>
          <CardContent className="p-6">
            {licensure ? (
              <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <BadgeCheck className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold">{licensure.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 my-1">
                        <p className="font-medium text-primary">{licensure.category}</p>
                        <p className="text-sm text-muted-foreground">{licensure.idNumber}</p>
                      </div>
                      <p className="text-muted-foreground mt-1">{licensure.description}</p>
                    </div>
                  </div>
            ) : <p>Loading...</p>}
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Certifications & Workshops</CardTitle>
            </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-6">
              {certifications.map((cert) => (
                <li key={cert._id} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {iconMap[cert.icon]}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground">{cert.category}</p>
                    <p className="text-sm font-medium text-primary">{cert.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        </div>
      </div>
    </section>
  );
}
