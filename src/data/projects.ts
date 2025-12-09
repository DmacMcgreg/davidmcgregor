export interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  year: string;
  technologies: string[];
  link?: string;
  github?: string;
  content?: string;
}

export const projects: Project[] = [
  {
    slug: 'medical-presentation-platform',
    title: 'Medical Presentation Platform',
    description: 'Platform to upload, view, share powerpoint presentations, PDF/Word Documents among team members and gather team feedback and comments. Allows searching through documents, and building a table of content.',
    category: 'Healthcare',
    image: '/projects/medical-presentation-platform.jpg',
    year: '2021 - 2022',
    technologies: ['React', 'Node.js', 'Document Processing'],
    content: 'A comprehensive platform designed for healthcare teams to collaborate on presentations and documents. Features include document upload and viewing, team feedback collection, advanced search functionality, and automatic table of contents generation.',
  },
  {
    slug: 'alopecia-quiz-app',
    title: 'Patient and Healthcare Provider Quiz App for Alopecia Areata',
    description: 'An online webapp for testing the knowledge of patients and healthcare providers around Alopecia Areata.',
    category: 'Healthcare',
    image: '/projects/alopecia-quiz-app.jpg',
    year: '2021 - 2022',
    technologies: ['React', 'TypeScript', 'Quiz Engine'],
    content: 'An educational quiz application designed to assess and improve knowledge about Alopecia Areata for both patients and healthcare providers. The platform provides tailored question sets and feedback based on user responses.',
  },
  {
    slug: 'product-dashboard-ar',
    title: 'Product Dashboard with Video, Augmented Reality, 3D Graphs',
    description: 'A page to display a product, and its information displayed on 3D graphs, and Augmented Reality.',
    category: 'Web Development',
    image: '/projects/product-dashboard-ar.jpg',
    year: '2022',
    technologies: ['Three.js', 'WebXR', 'D3.js', 'Video Streaming'],
    content: 'An innovative product showcase page featuring immersive 3D visualizations, augmented reality product views, and interactive data graphs. Combines cutting-edge web technologies to create an engaging product experience.',
  },
  {
    slug: 'data-visualization-platform',
    title: 'Data Visualization Platform',
    description: 'A platform for parsing XLSX and generating graphs and charts to display common medical data tied to specific reference fields.',
    category: 'Healthcare',
    image: '/projects/data-visualization-platform.jpg',
    year: '2021 - 2022',
    technologies: ['React', 'D3.js', 'XLSX Parsing', 'Chart.js'],
    content: 'A specialized data visualization tool for the healthcare industry. Enables users to upload Excel spreadsheets and automatically generates meaningful charts and graphs based on medical reference fields, making complex data easily understandable.',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
