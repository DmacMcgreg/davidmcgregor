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
    slug: 'kinetic-brand',
    title: 'Kinetic Brand Identity',
    description: 'A dynamic visual identity system for a forward-thinking tech startup, featuring fluid animations and bold typography.',
    category: 'Branding',
    year: '2024',
    technologies: ['Figma', 'After Effects', 'React'],
    content: 'Full case study content would go here...',
  },
  {
    slug: 'neural-interface',
    title: 'Neural Interface Dashboard',
    description: 'Real-time data visualization platform for monitoring neural network training and performance metrics.',
    category: 'Web Development',
    year: '2024',
    technologies: ['React', 'D3.js', 'TypeScript', 'WebGL'],
    link: 'https://example.com',
    content: 'Full case study content would go here...',
  },
  {
    slug: 'harmony-music',
    title: 'Harmony Music App',
    description: 'A music streaming application with AI-powered recommendations and immersive audio experiences.',
    category: 'Mobile App',
    year: '2023',
    technologies: ['React Native', 'Node.js', 'TensorFlow'],
    content: 'Full case study content would go here...',
  },
  {
    slug: 'eco-tracker',
    title: 'Eco Impact Tracker',
    description: 'Environmental impact monitoring platform helping organizations track and reduce their carbon footprint.',
    category: 'Web Development',
    year: '2023',
    technologies: ['Next.js', 'PostgreSQL', 'Chart.js'],
    link: 'https://example.com',
    github: 'https://github.com/example',
    content: 'Full case study content would go here...',
  },
  {
    slug: 'artisan-ecommerce',
    title: 'Artisan E-Commerce',
    description: 'Luxury e-commerce platform for handcrafted goods, featuring AR product previews and seamless checkout.',
    category: 'E-Commerce',
    year: '2023',
    technologies: ['Shopify', 'Three.js', 'Tailwind CSS'],
    content: 'Full case study content would go here...',
  },
  {
    slug: 'quantum-portfolio',
    title: 'Quantum Portfolio',
    description: 'An experimental portfolio showcasing quantum computing concepts through interactive visualizations.',
    category: 'Creative',
    year: '2022',
    technologies: ['WebGL', 'GSAP', 'Three.js'],
    content: 'Full case study content would go here...',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
