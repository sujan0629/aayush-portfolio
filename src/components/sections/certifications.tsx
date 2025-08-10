import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck, FileText, Star } from 'lucide-react';

const certifications = [
  {
    icon: <Star className="h-6 w-6" />,
    title: 'Master MATLAB Through Guided Problem Solving',
    category: 'Udemy Course Completion Certificate',
    date: 'Nov 2024',
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: 'Generative AI for Data Analytics',
    category: 'Udemy Course Completion Certificate',
    date: 'Nov 2024',
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'IELTS (International English Language Testing System)',
    category: 'Overall Score: 7.5 (L:8.5, R:8, W:6, S:6.5)',
    date: 'July 2024',
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Workshop on Road Design & Estimation Using Smart Road',
    category: 'Organized by NAST in collaboration with Smart C.A.D Academy',
    date: 'Jun 2023',
  },
    {
    icon: <FileText className="h-6 w-6" />,
    title: 'Workshop on Research Methodology',
    category: 'Jointly organized by Pokhara University and NAST',
    date: 'Apr 2023',
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Workshop on the Structural Analysis of Residential Buildings using ETABS',
    category: 'Workshop',
    date: 'Dec 2022',
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Basic training on introduction to AutoCAD and Sap2000',
    category: 'Organized by the National Academy of Science and Technology',
    date: 'Nov 2022',
  },
];

const licensure = {
    title: 'Nepal Engineering Council (NEC) License',
    category: 'Civil \'A\' Category',
    id: 'Reg. No. 80671',
    description: 'Licensed to practice as a professional Civil Engineer in Nepal.',
  };

export function Certifications() {
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
                      <p className="text-sm text-muted-foreground">{licensure.id}</p>
                    </div>
                    <p className="text-muted-foreground mt-1">{licensure.description}</p>
                  </div>
                </div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Certifications & Workshops</CardTitle>
            </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-6">
              {certifications.map((cert, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {cert.icon}
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
