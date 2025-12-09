import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RevealText, MagneticButton, ParallaxShape } from '../components/shared';
import { getProjectBySlug, projects } from '../data/projects';
import styles from './Project.module.css';

export function Project() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Get next and previous projects
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Background Shapes */}
        <div className={styles.shapes}>
          <ParallaxShape
            type="circle"
            size={400}
            color="var(--accent)"
            speed={0.2}
            top="-10%"
            right="-5%"
            opacity={0.1}
            blur={40}
          />
          <ParallaxShape
            type="ring"
            size={200}
            color="var(--ink)"
            speed={0.4}
            bottom="10%"
            left="5%"
            opacity={0.3}
          />
        </div>

        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/projects" className={styles.backLink} data-cursor="Back">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              All Projects
            </Link>
          </motion.div>

          <RevealText delay={0.1}>
            <span className={styles.category}>{project.category}</span>
          </RevealText>

          <RevealText delay={0.2}>
            <h1 className={styles.title}>{project.title}</h1>
          </RevealText>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {project.description}
          </motion.p>

          {/* Meta Info */}
          <motion.div
            className={styles.meta}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Year</span>
              <span className={styles.metaValue}>{project.year}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Technologies</span>
              <span className={styles.metaValue}>
                {project.technologies.join(', ')}
              </span>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {project.link && (
              <MagneticButton
                href={project.link}
                variant="primary"
                cursorText="Visit"
              >
                View Live Site
              </MagneticButton>
            )}
            {project.github && (
              <MagneticButton
                href={project.github}
                variant="secondary"
                cursorText="Code"
              >
                View Source
              </MagneticButton>
            )}
          </motion.div>
        </div>
      </section>

      {/* Project Image */}
      <section className={styles.imageSection}>
        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <span className={styles.placeholderText}>{project.title[0]}</span>
            </div>
          )}
        </motion.div>
      </section>

      {/* Content Section */}
      <section className={styles.content}>
        <div className={styles.contentInner}>
          <RevealText>
            <h2 className={styles.sectionTitle}>About the Project</h2>
          </RevealText>
          <RevealText delay={0.1}>
            <p className={styles.contentText}>
              {project.content || project.description}
            </p>
          </RevealText>
        </div>
      </section>

      {/* Navigation */}
      <section className={styles.navigation}>
        <Link
          to={`/projects/${prevProject.slug}`}
          className={styles.navLink}
          data-cursor="Prev"
        >
          <span className={styles.navLabel}>Previous</span>
          <span className={styles.navTitle}>{prevProject.title}</span>
        </Link>

        <Link
          to={`/projects/${nextProject.slug}`}
          className={styles.navLink}
          data-cursor="Next"
        >
          <span className={styles.navLabel}>Next</span>
          <span className={styles.navTitle}>{nextProject.title}</span>
        </Link>
      </section>
    </div>
  );
}
