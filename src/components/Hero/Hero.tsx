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

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
              delay={0.2}
              duration={0.8}
              className={styles.lastName}
            />
          </h1>
        </motion.div>

        <motion.div style={{ y: subtitleY, opacity }} className={styles.subtitleWrapper}>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Creative Developer & Designer crafting digital experiences that captivate and inspire
          </motion.p>

          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
          transition={{ delay: 1.5, duration: 0.6 }}
          style={{ opacity }}
        >
          <span className={styles.scrollText}>Scroll</span>
          <div className={styles.scrollLine}>
            <motion.div
              className={styles.scrollDot}
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Large Accent Text */}
      <motion.div
        className={styles.accentText}
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        aria-hidden="true"
      >
        <span>Creative</span>
      </motion.div>
    </section>
  );
}
