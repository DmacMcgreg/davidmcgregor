import { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import styles from './CustomCursor.module.css';

interface CursorState {
  isHovering: boolean;
  isPressed: boolean;
  cursorText: string;
}

export function CustomCursor() {
  const [state, setState] = useState<CursorState>({
    isHovering: false,
    isPressed: false,
    cursorText: '',
  });
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) {
        setIsVisible(true);
      }
    },
    [cursorX, cursorY, isVisible]
  );

  const handleMouseDown = useCallback(() => {
    setState((prev) => ({ ...prev, isPressed: true }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setState((prev) => ({ ...prev, isPressed: false }));
  }, []);

  const handleMouseEnterInteractive = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    const cursorText = target.dataset.cursor || '';
    setState((prev) => ({ ...prev, isHovering: true, cursorText }));
  }, []);

  const handleMouseLeaveInteractive = useCallback(() => {
    setState((prev) => ({ ...prev, isHovering: false, cursorText: '' }));
  }, []);

  useEffect(() => {
    // Check if device supports hover (not touch)
    const mediaQuery = window.matchMedia('(hover: hover)');
    if (!mediaQuery.matches) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor]'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };
  }, [
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnterInteractive,
    handleMouseLeaveInteractive,
  ]);

  // Re-attach listeners when DOM changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor]'
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [handleMouseEnterInteractive, handleMouseLeaveInteractive]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={`${styles.cursor} ${state.isHovering ? styles.hovering : ''} ${state.isPressed ? styles.pressed : ''}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Cursor ring */}
      <motion.div
        className={`${styles.cursorRing} ${state.isHovering ? styles.hovering : ''}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
        aria-hidden="true"
      >
        {state.cursorText && (
          <span className={styles.cursorText}>{state.cursorText}</span>
        )}
      </motion.div>
    </>
  );
}
