import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Timeline } from '@/components/sections/timeline';
import { Projects } from '@/components/sections/projects';
import { Contact } from '@/components/sections/contact';
import { projects } from '@/lib/data';
import { Blog } from '@/components/sections/blog';
import { blogPosts } from '@/lib/data';
import { Research } from '@/components/sections/research';
import { Certifications } from '@/components/sections/certifications';
import { QA } from '@/components/sections/qa';
import { imageUrls } from '@/lib/images';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="relative bg-background py-16">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('${imageUrls.aboutBackground}')` }}
            data-ai-hint="blueprint sketch"
          ></div>
          <div className="relative z-10">
            <About />
          </div>
        </div>
        <div className="relative bg-secondary py-16">
           <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('${imageUrls.timelineBackground}')` }}
            data-ai-hint="winding road"
          ></div>
          <div className="relative z-10">
            <Timeline />
          </div>
        </div>
        <div className="relative bg-background py-16">
           <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('${imageUrls.projectsBackground}')` }}
            data-ai-hint="urban scene"
          ></div>
          <div className="relative z-10">
            <Projects projects={projects.slice(0, 3)} showViewAll />
          </div>
        </div>
        <div className="relative bg-secondary py-16">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('${imageUrls.researchBackground}')` }}
            data-ai-hint="flying book"
          ></div>
          <div className="relative z-10">
            <Research />
          </div>
        </div>
        <div className="relative bg-background py-16">
           <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('${imageUrls.blogBackground}')` }}
            data-ai-hint="construction fields"
          ></div>
          <div className="relative z-10">
            <Blog posts={blogPosts.slice(0, 3)} showViewAll />
          </div>
        </div>
        <div className="relative bg-secondary py-16">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('${imageUrls.certificationsBackground}')` }}
            data-ai-hint="certificate award"
          ></div>
          <div className="relative z-10">
            <Certifications />
          </div>
        </div>
        <div className="relative bg-background py-16">
           <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('${imageUrls.qaBackground}')` }}
            data-ai-hint="question mark"
          ></div>
          <div className="relative z-10">
            <QA />
          </div>
        </div>
        <div className="relative bg-secondary py-16">
           <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('${imageUrls.contactBackground}')` }}
            data-ai-hint="modern office"
          ></div>
          <div className="relative z-10">
            <Contact />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
