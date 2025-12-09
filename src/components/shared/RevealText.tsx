import { useRef, type ReactNode } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import styles from './RevealText.module.css';

interface RevealTextProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
  className?: string;
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4';
}

export function RevealText({
  children,
  delay = 0,
  duration = 0.8,
  direction = 'up',
  once = true,
  className = '',
  as: Tag = 'div',
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 60 };
      case 'down':
        return { y: -60 };
      case 'left':
        return { x: 60 };
      case 'right':
        return { x: -60 };
      default:
        return { y: 60 };
    }
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div ref={ref} className={`${styles.wrapper} ${className}`}>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
      >
        <Tag>{children}</Tag>
      </motion.div>
    </div>
  );
}

// Staggered text reveal for individual characters/words
interface StaggeredTextProps {
  text: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  splitBy?: 'char' | 'word';
}

export function StaggeredText({
  text,
  delay = 0,
  staggerDelay = 0.03,
  duration = 0.6,
  once = true,
  className = '',
  splitBy = 'char',
}: StaggeredTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  const items = splitBy === 'char' ? text.split('') : text.split(' ');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`${styles.staggeredContainer} ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      aria-label={text}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          className={styles.staggeredItem}
          variants={itemVariants}
          aria-hidden="true"
        >
          {item === ' ' ? '\u00A0' : item}
          {splitBy === 'word' && index < items.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.div>
  );
}
