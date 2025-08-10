'use server';

/**
 * @fileOverview An AI agent that answers questions about Aayush Bhatta's background, experience, and projects.
 *
 * - answerQuestions - A function that handles the question answering process.
 * - AnswerQuestionsInput - The input type for the answerQuestions function.
 * - AnswerQuestionsOutput - The return type for the answerQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import dbConnect from '@/lib/db';
import Biography from '@/models/Biography';
import Education from '@/models/Education';
import Project from '@/models/Project';
import Research from '@/models/Research';
import Certification from '@/models/Certification';
import Licensure from '@/models/Licensure';
import BlogPost from '@/models/BlogPost';
import Column from '@/models/Column';
import ContactInfo from '@/models/ContactInfo';
import HonorAward from '@/models/HonorAward';
import JournalArticle from '@/models/JournalArticle';
import Literature from '@/models/Literature';
import MediaCoverage from '@/models/MediaCoverage';
import OtherPublication from '@/models/OtherPublication';
import TimelineEvent from '@/models/TimelineEvent';
import Resume from '@/models/Resume';


const AnswerQuestionsInputSchema = z.object({
  question: z.string().describe('The question to ask about Aayush Bhatta.'),
});
export type AnswerQuestionsInput = z.infer<typeof AnswerQuestionsInputSchema>;

const AnswerQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about Aayush Bhatta.'),
});
export type AnswerQuestionsOutput = z.infer<typeof AnswerQuestionsOutputSchema>;

export async function answerQuestions(input: AnswerQuestionsInput): Promise<AnswerQuestionsOutput> {
  return answerQuestionsFlow(input);
}

// Define a new input schema for the prompt that includes the context.
const AnswerQuestionsPromptInputSchema = z.object({
  question: z.string(),
  context: z.string(),
});

const prompt = ai.definePrompt({
  name: 'answerQuestionsPrompt',
  input: {schema: AnswerQuestionsPromptInputSchema},
  output: {schema: AnswerQuestionsOutputSchema},
  prompt: `You are a helpful AI assistant for Aayush Bhatta, a Civil Engineer. Your goal is to answer questions about him based on the detailed context provided below. You can also answer general questions about civil engineering or related professional topics. Be friendly, professional, and informative.

Here is the context about Aayush Bhatta:
---
{{{context}}}
---

Based on the context above, please answer the following question:

Question: {{{question}}}

If the question is not directly answered by the context but is related to civil engineering, provide a helpful, general answer. If the question is completely unrelated to Aayush Bhatta or engineering, politely state that you can only answer questions about Aayush's professional profile and related topics.`,
});

const answerQuestionsFlow = ai.defineFlow(
  {
    name: 'answerQuestionsFlow',
    inputSchema: AnswerQuestionsInputSchema,
    outputSchema: AnswerQuestionsOutputSchema,
  },
  async input => {
    await dbConnect();

    // Fetch all data from the database
    const biography = await Biography.findOne().lean();
    const educations = await Education.find({}).lean();
    const projects = await Project.find({}).lean();
    const researches = await Research.find({}).lean();
    const certifications = await Certification.find({}).lean();
    const licensure = await Licensure.findOne().lean();
    const blogPosts = await BlogPost.find({}).sort({ date: -1 }).lean();
    const columns = await Column.find({}).sort({ date: -1 }).lean();
    const contactInfo = await ContactInfo.findOne().lean();
    const honorsAwards = await HonorAward.find({}).sort({ year: -1 }).lean();
    const journalArticles = await JournalArticle.find({}).sort({ date: -1 }).lean();
    const literature = await Literature.find({}).lean();
    const mediaCoverage = await MediaCoverage.find({}).sort({ date: -1 }).lean();
    const otherPublications = await OtherPublication.find({}).sort({ date: -1 }).lean();
    const timelineEvents = await TimelineEvent.find({}).sort({ date: -1 }).lean();
    const resume = await Resume.findOne({ published: true }).lean();

    // Manually define skills as they are not in the DB
    const skills = {
        software: ['AutoCAD', 'SAP2000', 'ETABS', 'HEC-RAS', 'Smart-Road', 'GIS', 'Abaqus', 'MS Office', 'Matlab', 'Python (NumPy, pandas)', 'C/C++'],
        professional: ['Research & Project Management', 'Technical Writing', 'Teaching & Communication', 'Problem-Solving', 'Analytical/Critical Thinking']
    };

    // Construct a detailed context string
    let context = "CONTEXT ABOUT AAYUSH BHATTA:\n\n";
    
    if (biography && !Array.isArray(biography) && biography.content) {
      context += `## Biography\n${biography.content}\n\n`;
    }

    if (contactInfo) {
      const info = Array.isArray(contactInfo) ? contactInfo[0] : contactInfo;
      if (info) {
        context += `## Contact Information\nLocation: ${info.location}\nEmail: ${info.email}\nLinkedIn: ${info.linkedin}\n\n`;
      }
    }

    if (timelineEvents.length > 0) {
        context += "## Timeline / Career Journey\n";
        timelineEvents.forEach(event => {
            context += `- **${event.title}** (${event.date}): ${event.description}\n`;
        });
        context += "\n";
    }

    if (educations.length > 0) {
        context += "## Education\n";
        educations.forEach(edu => {
            context += `- ${edu.degree}, ${edu.institution} (${edu.dateRange}), ${edu.affiliation}\n`;
        });
        context += "\n";
    }

    if (skills) {
        context += "## Skills\n";
        context += `Software/Tools: ${skills.software.join(', ')}\n`;
        context += `Professional: ${skills.professional.join(', ')}\n\n`;
    }
    
    if (projects.length > 0) {
        context += "## Projects\n";
        projects.forEach(proj => {
            context += `- **${proj.title}** (${proj.category}): ${proj.description}\n`;
        });
        context += "\n";
    }

    if (researches.length > 0) {
        context += "## Research\n";
        researches.forEach(res => {
            context += `- **${res.title}** (Status: ${res.status}): ${res.abstract.substring(0, 200)}...\n`;
        });
        context += "\n";
    }

    if (journalArticles.length > 0) {
        context += "## Journal Articles\n";
        journalArticles.forEach(item => {
            context += `- **${item.title}** in ${item.journal} (${item.date}). Summary: ${item.summary}\n`;
        });
        context += "\n";
    }

    if (otherPublications.length > 0) {
        context += "## Other Publications\n";
        otherPublications.forEach(item => {
            context += `- **${item.title}** presented at ${item.publication} (${item.date}).\n`;
        });
        context += "\n";
    }

    if (columns.length > 0) {
        context += "## Columns & Articles\n";
        columns.forEach(item => {
            context += `- **"${item.title}"** for ${item.outlet} (${item.date}).\n`;
        });
        context += "\n";
    }
    
    if (blogPosts.length > 0) {
        context += "## Blog Posts\n";
        blogPosts.forEach(post => {
            context += `- **${post.title}** (${post.date}): ${post.description}\n`;
        });
        context += "\n";
    }

    if (licensure) {
        context += "## Licensure\n";
        if (Array.isArray(licensure)) {
            licensure.forEach(item => {
                context += `${item.title} - ${item.category} (Reg. No. ${item.idNumber}): ${item.description}\n`;
            });
            context += "\n";
        } else {
            context += `${licensure.title} - ${licensure.category} (Reg. No. ${licensure.idNumber}): ${licensure.description}\n\n`;
        }
    }
    
     if (certifications.length > 0) {
        context += "## Certifications & Workshops\n";
        certifications.forEach(cert => {
            context += `- ${cert.title} from ${cert.category} (${cert.date})\n`;
        });
        context += "\n";
    }

    if (honorsAwards.length > 0) {
        context += "## Honors & Awards\n";
        honorsAwards.forEach(item => {
            context += `- ${item.title}, awarded by ${item.issuer} (${item.year})\n`;
        });
        context += "\n";
    }

    if (mediaCoverage.length > 0) {
        context += "## Media Coverage\n";
        mediaCoverage.forEach(item => {
            context += `- Featured in **${item.outlet}** for "${item.title}" (${item.date}).\n`;
        });
        context += "\n";
    }
    
    if (literature.length > 0) {
        context += "## Recommended Literature\n";
        literature.forEach(item => {
            context += `- Recommends "${item.title}" by ${item.author}.\n`;
        });
        context += "\n";
    }

    if (resume) {
        const resumeObj = Array.isArray(resume) ? resume[0] : resume;
        if (resumeObj && resumeObj.originalFilename) {
            context += `## Resume\nAayush has a resume available for download. The file is named "${resumeObj.originalFilename}".\n\n`;
        }
    }

    const {output} = await prompt({ question: input.question, context });
    return output!;
  }
);
