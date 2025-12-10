import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { ProjectCarousel } from '../components/Projects';
import { Contact } from '../components/Contact';
import { projects } from '../data/projects';

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <ProjectCarousel projects={projects} />
      <Contact />
    </>
  );
}
