import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { RevealText } from '../shared';
import type { Project } from '../../data/projects';
import styles from './ProjectsGrid.module.css';

interface ProjectsGridProps {
  projects: Project[];
  showTitle?: boolean;
}

export function ProjectsGrid({ projects, showTitle = true }: ProjectsGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className={styles.section}>
      {showTitle && (
        <div className={styles.header}>
          <RevealText>
            <h2 className={styles.title}>Selected Work</h2>
          </RevealText>
          <RevealText delay={0.1}>
            <p className={styles.description}>
              A curated collection of projects showcasing creative development and thoughtful design
            </p>
          </RevealText>
        </div>
      )}

      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            featured={index === 0 || index === 3}
          />
        ))}
      </motion.div>
    </section>
  );
}
