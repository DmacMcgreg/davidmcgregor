import { motion } from 'framer-motion';
import { ProjectsGrid } from '../components/Projects';
import { ParallaxShape, StaggeredText } from '../components/shared';
import { projects } from '../data/projects';
import styles from './Projects.module.css';

export function Projects() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Background Shapes */}
        <div className={styles.shapes}>
          <ParallaxShape
            type="ring"
            size={300}
            color="var(--accent)"
            speed={0.3}
            top="10%"
            right="10%"
            opacity={0.4}
          />
          <ParallaxShape
            type="circle"
            size={80}
            color="var(--accent-alt)"
            speed={0.5}
            top="30%"
            left="5%"
            opacity={0.3}
          />
          <ParallaxShape
            type="line"
            size={150}
            color="var(--muted)"
            speed={0.4}
            bottom="30%"
            right="15%"
            rotation={45}
          />
        </div>

        <div className={styles.heroContent}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Portfolio
          </motion.span>

          <h1 className={styles.title}>
            <StaggeredText
              text="Selected Projects"
              splitBy="word"
              staggerDelay={0.08}
              duration={0.8}
            />
          </h1>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A collection of work spanning creative development, design systems,
            and digital experiences. Each project represents a unique challenge
            and an opportunity to push boundaries.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <ProjectsGrid projects={projects} showTitle={false} />
    </div>
  );
}
