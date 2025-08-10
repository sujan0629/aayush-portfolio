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
}

export const projects: Project[] = [
    {
    _id: '1',
    slug: 'ring-road-design-project',
    title: 'Detail Survey, Design and Cost Estimation for Ring Road Segment',
    category: 'Thesis/Final Year Project',
    description: 'This project involved a detailed survey, design, and cost estimation for a hill road segment connecting Buditola Bazar to the Nepal Television Tower in Godawari Municipality, Kailali District.',
    longDescription: 'This project involved a detailed survey, design, and cost estimation for a hill road segment connecting Buditola Bazar to the Nepal Television Tower in Godawari Municipality, Kailali District. The proposed design focused on widening the road to accommodate two lanes of traffic, adding drainage systems, and improving road surfaces, specifically tailored to the challenges of hill terrain.',
    image: imageUrls.projectDefault,
    hint: 'hill road',
    tags: ['Surveying', 'Road Design', 'Cost Estimation', 'AutoCAD', 'Smart-Road'],
    links: { },
  },
  {
    _id: '2',
    slug: 'prestressed-concrete-bridge-study',
    title: 'A Study of Prestressed Concrete Bridge at Doda Kaj Bhakunda',
    category: '2nd Year Project',
    description: 'This project focuses on studying the feasibility of a prestressed concrete bridge at Doda Kaj Bhakunda, Belauri, Kanchanpur, Nepal.',
    longDescription: 'This project focuses on studying the feasibility of a prestressed concrete bridge at Doda Kaj Bhakunda, Belauri, Kanchanpur, Nepal. The study involves field observations and analysis of river morphology, rock types, bridge span, bridge components, erosion around abutments, concrete condition, exposed rebar, and basin hydrology.',
    image: imageUrls.projectDefault,
    hint: 'concrete bridge',
    tags: ['Feasibility Study', 'Bridge Engineering', 'River Morphology', 'Hydrology'],
    links: { },
  },
];

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
}

export const blogPosts: BlogPost[] = [
  // All blog posts will be fetched from the database.
];

// New data structures
export interface OtherPublication {
  _id: string;
  id: number;
  title: string;
  publication: string;
  date: string;
  link: string;
  description: string;
}

export interface Column {
  _id: string;
  id: number;
  title: string;
  outlet: string;
  date: string;
  link: string;
  summary: string;
}

export interface GalleryImage {
  _id: string;
  id: number;
  src: string;
  alt: string;
  hint: string;
  caption: string;
}

export interface Literature {
  _id: string;
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
  hint: string;
}

export interface MediaCoverage {
  _id: string;
  id: number;
  title: string;
  outlet: string;
  date: string;
  link: string;
  summary: string;
}
