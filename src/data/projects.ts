import projectsData from '../../data/projects.json';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  deviceType: string;
  year: string;
}

export const projects: Project[] = projectsData.projects;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.id === slug);
}
