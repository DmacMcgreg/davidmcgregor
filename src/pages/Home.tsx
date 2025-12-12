import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { AIEngineering } from '../components/AIEngineering';
import { ProjectCarousel } from '../components/Projects';
import { Contact } from '../components/Contact';
import { projects } from '../data/projects';

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <AIEngineering />
      <ProjectCarousel projects={projects} />
      <Contact />
    </>
  );
}
