'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HardHat, Landmark, Recycle, GraduationCap, Code, Book, BrainCircuit } from 'lucide-react';
import { Biography, Education } from '@/lib/data';

const skills = [
  { name: 'AutoCAD', icon: <Code className="mr-2 h-4 w-4" /> },
  { name: 'SAP2000', icon: <Code className="mr-2 h-4 w-4" /> },
  { name: 'ETABS', icon: <Code className="mr-2 h-4 w-4" /> },
  { name: 'HEC-RAS', icon: <Code className="mr-2 h-4 w-4" /> },
  { name: 'Smart-Road', icon: <Code className="mr-2 h-4 w-4" /> },
  { name: 'GIS', icon: <Code className="mr-2 h-4 w-4" /> },
  { name: 'Abaqus', icon: <Code className="mr-2 h-4 w-4" /> },
  { name: 'MS Office', icon: <Code className="mr-2 h-4 w-4" /> },
  { name: 'Matlab', icon: <Code className="mr-2 h-4 w-4" /> },
  { name: 'Python (NumPy, pandas)', icon: <Code className="mr-2 h-4 w-4" /> },
  { name: 'C/C++', icon: <Code className="mr-2 h-4 w-4" /> },
];

const otherSkills = [
  { name: 'Research & Project Management', icon: <Book className="mr-2 h-4 w-4" /> },
  { name: 'Technical Writing', icon: <Book className="mr-2 h-4 w-4" /> },
  { name: 'Teaching & Communication', icon: <GraduationCap className="mr-2 h-4 w-4" /> },
  { name: 'Problem-Solving', icon: <BrainCircuit className="mr-2 h-4 w-4" /> },
  { name: 'Analytical/Critical Thinking', icon: <BrainCircuit className="mr-2 h-4 w-4" /> },
];

export function About() {
  const [biography, setBiography] = React.useState<Biography | null>(null);
  const [education, setEducation] = React.useState<Education[]>([]);

  React.useEffect(() => {
    fetch('/api/biography').then(res => res.json()).then(data => setBiography(data));
    fetch('/api/education').then(res => res.json()).then(data => setEducation(data));
  }, []);

  return (
    <section id="about" className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight">About Me</h2>
        <p className="text-lg text-muted-foreground mt-2">My background, education, and technical skills.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Biography</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {biography ? biography.content : 'Loading biography...'}
            </p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {education.map(edu => (
                <div key={edu._id} className="flex items-start gap-4">
                <GraduationCap className="h-8 w-8 text-primary mt-1" />
                <div>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.dateRange}</p>
                    <p className="text-sm text-muted-foreground">{edu.affiliation}</p>
                </div>
                </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="font-semibold mb-2">Software/Tools:</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill.name} variant="secondary" className="text-sm py-1 px-3">
                  {skill.icon}
                  {skill.name}
                </Badge>
              ))}
            </div>
            <h4 className="font-semibold mt-4 mb-2">Professional:</h4>
             <div className="flex flex-wrap gap-2">
              {otherSkills.map((skill) => (
                <Badge key={skill.name} variant="secondary" className="text-sm py-1 px-3">
                  {skill.icon}
                  {skill.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
