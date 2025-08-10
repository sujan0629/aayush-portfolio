import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Timeline } from '@/components/sections/timeline';
import { Projects } from '@/components/sections/projects';
import { Contact } from '@/components/sections/contact';
import { Blog } from '@/components/sections/blog';
import { Research as ResearchSection } from '@/components/sections/research';
import { Certifications } from '@/components/sections/certifications';
import { QA } from '@/components/sections/qa';
import { imageUrls } from '@/lib/images';
import { Project, BlogPost, Research, TimelineEvent } from '@/lib/data';
import dbConnect from '@/lib/db';
import ProjectModel from '@/models/Project';
import BlogPostModel from '@/models/BlogPost';
import ResearchModel from '@/models/Research';
import TimelineEventModel from '@/models/TimelineEvent';

async function getProjects(): Promise<Project[]> {
  await dbConnect();
  const projects = await ProjectModel.find({}).sort({ createdAt: -1 }).limit(3).lean();
  return JSON.parse(JSON.stringify(projects));
}

async function getBlogPosts(): Promise<BlogPost[]> {
    await dbConnect();
    const posts = await BlogPostModel.find({}).sort({ date: -1 }).limit(3).lean();
    return JSON.parse(JSON.stringify(posts));
}

async function getResearch(): Promise<Research[]> {
    await dbConnect();
    const research = await ResearchModel.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(research));
}

async function getTimelineEvents(): Promise<TimelineEvent[]> {
    await dbConnect();
    const events = await TimelineEventModel.find({}).sort({ date: -1 }).lean();
    return JSON.parse(JSON.stringify(events));
}


export default async function Home() {
  const projects = await getProjects();
  const blogPosts = await getBlogPosts();
  const research = await getResearch();
  const timelineEvents = await getTimelineEvents();

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
            <Timeline events={timelineEvents} isLoading={false} />
          </div>
        </div>
        <div className="relative bg-background py-16">
           <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('${imageUrls.projectsBackground}')` }}
            data-ai-hint="urban scene"
          ></div>
          <div className="relative z-10">
            <Projects projects={projects} showViewAll />
          </div>
        </div>
        <div className="relative bg-secondary py-16">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('${imageUrls.researchBackground}')` }}
            data-ai-hint="flying book"
          ></div>
          <div className="relative z-10">
            <ResearchSection publications={research} isLoading={false} />
          </div>
        </div>
        <div className="relative bg-background py-16">
           <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('${imageUrls.blogBackground}')` }}
            data-ai-hint="construction fields"
          ></div>
          <div className="relative z-10">
            <Blog posts={blogPosts} showViewAll />
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
