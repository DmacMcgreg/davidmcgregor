import { ProjectCarousel } from '../components/Projects';
import { projects } from '../data/projects';
import styles from './Projects.module.css';

export function Projects() {
  return (
    <div className={styles.page}>
      <ProjectCarousel projects={projects} />
    </div>
  );
}
