import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from './ParallaxShape.module.css';

type ShapeType = 'circle' | 'ring' | 'line' | 'dot' | 'blob';

interface ParallaxShapeProps {
  type: ShapeType;
  size?: number;
  color?: string;
  speed?: number;
  rotation?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity?: number;
  blur?: number;
  zIndex?: number;
}

export function ParallaxShape({
  type,
  size = 100,
  color = 'var(--accent)',
  speed = 0.5,
  rotation = 0,
  top,
  left,
  right,
  bottom,
  opacity = 1,
  blur = 0,
  zIndex = 5,
}: ParallaxShapeProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  const yRange = useTransform(scrollYProgress, [0, 1], [0, -300 * speed]);
  const y = useSpring(yRange, { stiffness: 100, damping: 30 });

  const rotateRange = useTransform(scrollYProgress, [0, 1], [0, rotation]);
  const rotate = useSpring(rotateRange, { stiffness: 100, damping: 30 });

  const renderShape = () => {
    switch (type) {
      case 'circle':
        return (
          <div
            className={styles.circle}
            style={{
              width: size,
              height: size,
              backgroundColor: color,
            }}
          />
        );
      case 'ring':
        return (
          <div
            className={styles.ring}
            style={{
              width: size,
              height: size,
              borderColor: color,
              borderWidth: Math.max(1, size * 0.02),
            }}
          />
        );
      case 'line':
        return (
          <div
            className={styles.line}
            style={{
              width: size,
              height: 2,
              backgroundColor: color,
            }}
          />
        );
      case 'dot':
        return (
          <div
            className={styles.dot}
            style={{
              width: size,
              height: size,
              backgroundColor: color,
            }}
          />
        );
      case 'blob':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            className={styles.blob}
          >
            <path
              fill={color}
              d="M44.5,-76.3C57.3,-69.3,67.2,-56.6,74.7,-42.6C82.2,-28.6,87.3,-13.3,87.1,1.9C86.9,17.1,81.4,32.2,72.3,44.4C63.2,56.6,50.5,65.9,36.6,72.7C22.7,79.5,7.5,83.8,-7.8,83.5C-23.1,83.2,-38.5,78.3,-51.1,69.5C-63.7,60.7,-73.5,48,-79.4,33.6C-85.3,19.2,-87.3,3.1,-84.7,-12C-82.1,-27.1,-74.9,-41.2,-64.1,-51.6C-53.3,-62,-38.9,-68.7,-24.6,-74.8C-10.3,-80.9,3.9,-86.4,18.3,-85.6C32.7,-84.8,47.3,-77.7,44.5,-76.3Z"
              transform="translate(100 100)"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={ref}
      className={styles.shape}
      style={{
        y,
        rotate,
        top,
        left,
        right,
        bottom,
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        zIndex,
      }}
      aria-hidden="true"
    >
      {renderShape()}
    </motion.div>
  );
}
