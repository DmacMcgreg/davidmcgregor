import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroShapes } from './HeroShapes';
import { StaggeredText, MagneticButton } from '../shared';
import styles from './Hero.module.css';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax effects - Toned down for a more stable, premium feel
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 50]); // Reduced from 150
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 80]); // Reduced from 100
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Very subtle counter-movement for the background text
  const accentTextY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} className={styles.hero}>
      <HeroShapes />

      <div className={styles.content}>
        <motion.div style={{ y: titleY, opacity }} className={styles.titleWrapper}>
          <h1 className={styles.title}>
            <StaggeredText
              text="David"
              splitBy="char"
              staggerDelay={0.04}
              duration={0.8}
              className={styles.firstName}
            />
            <StaggeredText
              text="McGregor"
              splitBy="char"
              staggerDelay={0.04}
              delay={0.15}
              duration={0.8}
              className={styles.lastName}
            />
          </h1>
        </motion.div>

        <motion.div style={{ y: subtitleY, opacity }} className={styles.subtitleWrapper}>
          <motion.h2
            className={styles.tagline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            AI Solutions Engineer. Architect. Leader.
          </motion.h2>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            I design AI workflows and multi-agent systems, lead engineering teams, and help organizations understand what's actually possible with AI today.
          </motion.p>

          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton href="/projects" variant="primary" size="lg" cursorText="View">
              View Projects
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary" size="lg" cursorText="Say Hi">
              Get in Touch
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ opacity }}
        >
          <span className={styles.scrollText}>Scroll</span>
          <div className={styles.scrollLine}>
            <motion.div
              className={styles.scrollDot}
              animate={{ y: ['0%', '200%'] }} // Adjusted for the longer line
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Large Accent Text Background */}
      <motion.div
        className={styles.accentText}
        style={{ y: accentTextY }}
        aria-hidden="true"
      >
        <span>AI Engineer</span>
      </motion.div>
    </section>
  );
}