import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import type { Project } from '../../data/projects';
import styles from './ProjectCarousel.module.css';

interface ProjectCarouselProps {
  projects: Project[];
  showTitle?: boolean;
}

export function ProjectCarousel({ projects, showTitle = true }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);

  const currentProject = projects[currentIndex];
  const totalProjects = projects.length;

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  const goToIndex = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -threshold || velocity < -500) {
      goToNext();
    } else if (offset > threshold || velocity > 500) {
      goToPrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-advance (optional - uncomment to enable)
  // useEffect(() => {
  //   const timer = setInterval(goToNext, 5000);
  //   return () => clearInterval(timer);
  // }, [currentIndex]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };


  return (
    <section className={styles.section}>
      {showTitle && (
        <div className={styles.header}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Portfolio
          </motion.span>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Selected Work
          </motion.h2>
          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A curated collection of projects showcasing creative development and thoughtful design
          </motion.p>
        </div>
      )}

      <div className={styles.carouselContainer} ref={containerRef}>
        {/* Main Slide */}
        <div className={styles.slideWrapper}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              style={{ x: dragX }}
              className={styles.slide}
            >
              <Link
                to={`/projects/${currentProject.id}`}
                className={styles.slideLink}
                data-cursor="View"
              >
                <div className={styles.imageContainer}>
                  <motion.img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className={styles.image}
                    initial={{ scale: 1.02 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  <div className={styles.imageOverlay} />
                </div>

                <div className={styles.slideContent}>


                  <motion.h3
                    className={styles.slideTitle}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                  >
                    {currentProject.title}
                  </motion.h3>

                  <motion.p
                    className={styles.slideDescription}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.2 }}
                  >
                    {currentProject.description}
                  </motion.p>

                  <motion.div
                    className={styles.viewProject}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                  >
                    <span>View Project</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className={styles.navigation}>
          <button
            className={styles.navButton}
            onClick={goToPrev}
            aria-label="Previous project"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className={styles.counter}>
            <span className={styles.currentNum}>
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className={styles.divider}>/</span>
            <span className={styles.totalNum}>
              {String(totalProjects).padStart(2, '0')}
            </span>
          </div>

          <button
            className={styles.navButton}
            onClick={goToNext}
            aria-label="Next project"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressTrack}>
            <motion.div
              className={styles.progressBar}
              initial={false}
              animate={{
                width: `${((currentIndex + 1) / totalProjects) * 100}%`,
              }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </div>

        {/* Dot Indicators */}
        <div className={styles.dots}>
          {projects.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
              onClick={() => goToIndex(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
