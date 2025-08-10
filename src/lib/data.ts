import { imageUrls } from './images';

export interface Project {
  _id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  hint: string;
  tags: string[];
  links: {
    github?: string;
    report?: string; // slug of a report
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Report {
  slug: string;
  title: string;
  project: string; // Project title
  date: string;
  summary: string;
  sections: {
    title: string;
    content: string;
  }[];
}

export const reports: Report[] = [
  // User did not provide any reports, so this is empty.
];

export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  hint: string;
  date: string;
  tags: string[];
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OtherPublication {
  _id: string;
  title: string;
  publication: string;
  date: string;
  link: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Column {
  _id: string;
  title: string;
  outlet: string;
  date: string;
  link: string;
  summary: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryImage {
  _id: string;
  src: string;
  alt: string;
  hint: string;
  caption: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Literature {
  _id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  hint: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MediaCoverage {
  _id: string;
  title: string;
  outlet: string;
  date: string;
  link: string;
  summary: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface JournalArticle {
    _id: string;
    title: string;
    journal: string;
    date: string;
    link: string;
    summary: string;
    image: string;
    hint: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface HonorAward {
    _id: string;
    icon: string;
    title: string;
    issuer: string;
    year: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Research {
    _id: string;
    title: string;
    authors: string;
    status: 'Published' | 'Under Review' | 'In Progress';
    journal: string;
    abstract: string;
    link?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface TimelineEvent {
    _id: string;
    icon: 'Briefcase' | 'GraduationCap';
    date: string;
    title: string;
    description: string;
    side: 'left' | 'right';
    createdAt?: string;
    updatedAt?: string;
}

export interface Education {
  _id: string;
  degree: string;
  institution: string;
  dateRange: string;
  affiliation: string;
}

export interface Biography {
  _id: string;
  content: string;
}

export interface Certification {
  _id: string;
  icon: string;
  title: string;
  category: string;
  date: string;
}

export interface Licensure {
  _id: string;
  title: string;
  category: string;
  idNumber: string;
  description: string;
}

export interface Resume {
  _id: string;
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  originalFilename: string;
  published: boolean;
  uploadedAt: string;
}

export interface Visitor {
    country: string;
    count: number;
}

export interface ContactInfo {
  _id: string;
  location: string;
  email: string;
  linkedin: string;
}
