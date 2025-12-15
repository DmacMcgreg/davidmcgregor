import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, useSpring } from 'framer-motion';
import styles from './MagneticButton.module.css';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  cursorText?: string;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  cursorText = 'Click',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const isExternalLink = href?.startsWith('http') || href?.startsWith('mailto:');
  const isInternalLink = href && !isExternalLink;

  const buttonClassName = `${styles.button} ${styles[variant]} ${styles[size]} ${isHovered ? styles.hovered : ''} ${className}`;

  const renderContent = () => (
    <>
      <span className={styles.content}>{children}</span>
      <motion.span
        className={styles.background}
        initial={{ scale: 0 }}
        animate={{ scale: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );

  return (
    <motion.div
      ref={ref}
      className={styles.wrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ x, y }}
    >
      {isInternalLink ? (
        <Link
          to={href}
          className={buttonClassName}
          data-cursor={cursorText}
        >
          {renderContent()}
        </Link>
      ) : isExternalLink ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClassName}
          data-cursor={cursorText}
        >
          {renderContent()}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={buttonClassName}
          data-cursor={cursorText}
        >
          {renderContent()}
        </button>
      )}
    </motion.div>
  );
}
