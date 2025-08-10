import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

const publications = [
  {
    title: 'Mechanical Properties of Steel Fiber-Reinforced Concrete with Recycled Concrete Waste as Fine Aggregate Replacement',
    authors: 'Bhatta, A., Bhatta, N.',
    status: 'Under Review',
    journal: 'Journal of Materials in Civil Engineering',
    abstract: 'This research investigates the mechanical properties of steel fiber-reinforced concrete where recycled concrete waste is used as a partial replacement for fine aggregate. The study aims to promote sustainable construction practices by utilizing waste materials while maintaining or enhancing the structural performance of concrete.',
  },
  {
    title: 'A Review Paper on the Biological Self-Healing Concrete: A Sustainable Approach to Crack Mitigation and Durability Enhancement',
    authors: 'A. Bhatta',
    status: 'In Progress',
    journal: 'N/A',
    abstract: 'This review paper explores the concept of biological self-healing concrete, a novel technology that uses microorganisms to precipitate calcium carbonate and heal cracks. The paper discusses various techniques, their effectiveness, and the potential of this approach to significantly enhance the durability and sustainability of concrete structures.',
  },
];

export function Research() {
  return (
    <section id="research" className="">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Research &amp; Publications</h2>
          <p className="text-lg text-muted-foreground mt-2">My contributions to the field of civil engineering.</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {publications.map((pub, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">{pub.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                         <Badge variant={pub.status === 'Published' ? 'default' : pub.status === 'Under Review' ? 'secondary' : 'outline'}>{pub.status}</Badge>
                         <p className="text-sm text-muted-foreground">{pub.authors}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="font-semibold text-muted-foreground mb-2">{pub.journal}</p>
                    <p className="leading-relaxed">{pub.abstract}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
