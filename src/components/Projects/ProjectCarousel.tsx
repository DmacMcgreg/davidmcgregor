import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import type { Project } from '../../data/projects';
import styles from './ProjectCarousel.module.css';

interface ProjectCarouselProps {
  projects: Project[];
  showTitle?: boolean;
}

export function ProjectCarousel({ projects, showTitle = true }: ProjectCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    duration: 20, // Fast, snappy transitions (in frames, ~333ms at 60fps)
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set([0]));

  const totalProjects = projects.length;

  // Preload images for adjacent slides
  useEffect(() => {
    const preloadImages = () => {
      const indicesToLoad = [
        currentIndex,
        (currentIndex + 1) % totalProjects,
        (currentIndex - 1 + totalProjects) % totalProjects,
      ];

      indicesToLoad.forEach((idx) => {
        if (!imagesLoaded.has(idx)) {
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => new Set([...prev, idx]));
          };
          img.src = projects[idx].image;
        }
      });
    };

    preloadImages();
  }, [currentIndex, projects, totalProjects, imagesLoaded]);

  // Sync Embla's selected index with our state
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const goToNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const goToPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const goToIndex = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

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

      <div className={styles.carouselContainer}>
        {/* Embla Viewport */}
        <div className={styles.emblaViewport} ref={emblaRef}>
          <div className={styles.emblaContainer}>
            {projects.map((project, index) => (
              <div key={project.id} className={styles.emblaSlide}>
                <Link
                  to={`/projects/${project.id}`}
                  className={styles.slideLink}
                  data-cursor="View"
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className={styles.image}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className={styles.imageOverlay} />
                  </div>

                  <div className={styles.slideContent}>
                    <h3 className={styles.slideTitle}>
                      {project.title}
                    </h3>

                    <p className={styles.slideDescription}>
                      {project.description}
                    </p>

                    <div className={styles.viewProject}>
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
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
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
