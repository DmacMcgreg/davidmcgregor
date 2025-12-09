import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import styles from './HeroShapes.module.css';

export function HeroShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  // Parallax transforms for different shapes
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -400]);

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Mouse tracking for subtle movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 50, damping: 20 };
  const mouseXSpring = useSpring(mouseX, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalize to -1 to 1
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className={styles.shapes} aria-hidden="true">
      {/* Large Circle - Top Right */}
      <motion.div
        className={`${styles.shape} ${styles.circle1}`}
        style={{
          y: y1,
          x: mouseXSpring,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="98" stroke="var(--accent)" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* Filled Circle - Left */}
      <motion.div
        className={`${styles.shape} ${styles.circle2}`}
        style={{
          y: y2,
          rotate: rotate1,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="50" fill="var(--accent)" />
        </svg>
      </motion.div>

      {/* Small Dots Cluster - Top Left */}
      <motion.div
        className={`${styles.shape} ${styles.dots}`}
        style={{ y: y3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.dot}
            style={{
              left: `${(i % 3) * 20}px`,
              top: `${Math.floor(i / 3) * 20}px`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
          />
        ))}
      </motion.div>

      {/* Diagonal Line - Right */}
      <motion.div
        className={`${styles.shape} ${styles.line1}`}
        style={{
          y: y4,
          rotate: rotate2,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.lineInner} />
      </motion.div>

      {/* Large Ring - Bottom Left */}
      <motion.div
        className={`${styles.shape} ${styles.ring}`}
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -250]),
          x: useTransform(mouseXSpring, (v) => v * -0.5),
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 300 300" fill="none">
          <circle cx="150" cy="150" r="148" stroke="var(--ink)" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Blob Shape - Center Right */}
      <motion.div
        className={`${styles.shape} ${styles.blob}`}
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -180]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 20]),
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 200 200" fill="none">
          <path
            fill="var(--accent-alt)"
            d="M44.5,-76.3C57.3,-69.3,67.2,-56.6,74.7,-42.6C82.2,-28.6,87.3,-13.3,87.1,1.9C86.9,17.1,81.4,32.2,72.3,44.4C63.2,56.6,50.5,65.9,36.6,72.7C22.7,79.5,7.5,83.8,-7.8,83.5C-23.1,83.2,-38.5,78.3,-51.1,69.5C-63.7,60.7,-73.5,48,-79.4,33.6C-85.3,19.2,-87.3,3.1,-84.7,-12C-82.1,-27.1,-74.9,-41.2,-64.1,-51.6C-53.3,-62,-38.9,-68.7,-24.6,-74.8C-10.3,-80.9,3.9,-86.4,18.3,-85.6C32.7,-84.8,47.3,-77.7,44.5,-76.3Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>

      {/* Small Accent Circle */}
      <motion.div
        className={`${styles.shape} ${styles.smallCircle}`}
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -300]),
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
