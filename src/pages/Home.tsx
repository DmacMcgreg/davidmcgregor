import { V2Hero, V2Ticker, V2About, V2Pillars, V2Projects, V2Contact } from '../components/v2';
import { projects } from '../data/projects';

export function Home() {
  return (
    <>
      <V2Hero shaderIntensity="high" />
      <V2Ticker />
      <V2About />
      <V2Pillars shaderIntensity="high" />
      <V2Projects projects={projects} layout="carousel" />
      <V2Contact shaderIntensity="high" />
    </>
  );
}
