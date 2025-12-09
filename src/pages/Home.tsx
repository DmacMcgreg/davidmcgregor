import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { ProjectsGrid } from '../components/Projects';
import { Contact } from '../components/Contact';
import { projects } from '../data/projects';

export function Home() {
  // Show first 4 projects on home page
  const featuredProjects = projects.slice(0, 4);

  return (
    <>
      <Hero />
      <About />
      <ProjectsGrid projects={featuredProjects} />
      <Contact />
    </>
  );
}
