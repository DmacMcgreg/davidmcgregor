import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type MouseEvent,
  type ReactNode,
} from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent | globalThis.MouseEvent) => {
      mx = (e as globalThis.MouseEvent).clientX;
      my = (e as globalThis.MouseEvent).clientY;
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onOver = (e: globalThis.MouseEvent) => {
      const target = e.target as Element | null;
      const t = target?.closest('[data-cursor-label], a, button, .card, .archive__row');
      if (t) {
        setActive(true);
        setLabel(t.getAttribute('data-cursor-label') || '');
      }
    };
    const onOut = (e: globalThis.MouseEvent) => {
      const target = e.target as Element | null;
      const t = target?.closest('[data-cursor-label], a, button, .card, .archive__row');
      if (t) {
        setActive(false);
        setLabel('');
      }
    };

    window.addEventListener('mousemove', onMove as unknown as EventListener);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove as unknown as EventListener);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [visible]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div
        ref={ringRef}
        className={`cursor-ring ${active ? 'cursor-ring--active' : ''} ${
          visible ? 'cursor-ring--visible' : ''
        }`}
      >
        {label}
      </div>
    </>
  );
}

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'ghost';
  cursorLabel?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  arrow?: boolean;
}

export function MagneticButton({
  children,
  href,
  variant = 'primary',
  cursorLabel,
  onClick,
  arrow = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;
    const onMove = (e: globalThis.MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
    };
    const onLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const cls = `btn ${variant === 'ghost' ? 'btn--ghost' : ''}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && <span className="btn__arrow">↗</span>}
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={cls}
        data-cursor-label={cursorLabel || ''}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={cls}
      data-cursor-label={cursorLabel || ''}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  as: As = 'div',
  className = '',
  ...rest
}: RevealProps & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            window.setTimeout(() => {
              (e.target as HTMLElement).classList.add('is-visible');
            }, delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '-40px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <As ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </As>
  );
}

interface StaggerTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: ElementType;
}

export function StaggerText({
  text,
  className = '',
  delay = 0,
  stagger = 40,
  as: As = 'span',
}: StaggerTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const chars = (e.target as HTMLElement).querySelectorAll('.stagger-char');
            chars.forEach((c, i) => {
              window.setTimeout(() => c.classList.add('is-visible'), delay + i * stagger);
            });
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, stagger]);

  return (
    <As ref={ref} className={className}>
      {[...text].map((c, i) => (
        <span key={i} className="stagger-char">
          {c === ' ' ? '\u00A0' : c}
        </span>
      ))}
    </As>
  );
}

interface ParallaxShapeProps {
  type?: 'ring' | 'disc' | 'line';
  size?: number;
  color?: string;
  speed?: number;
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  opacity?: number;
}

export function ParallaxShape({
  type = 'ring',
  size = 200,
  color = 'var(--gold)',
  speed = 0.3,
  top,
  right,
  bottom,
  left,
  opacity = 0.5,
}: ParallaxShapeProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh - rect.top) / (vh + rect.height);
      const y = (progress - 0.5) * 100 * speed;
      el.style.setProperty('--py', `${y}px`);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  const style: CSSProperties = {
    width: `${size}px`,
    height: type === 'line' ? '1px' : `${size}px`,
    color,
    opacity,
    top,
    right,
    bottom,
    left,
    transform: 'translateY(var(--py, 0))',
    transition: 'transform 0.1s linear',
  };

  return <div ref={ref} className={`shape shape--${type}`} style={style} />;
}

export function Grain() {
  return <div className="grain" aria-hidden="true" />;
}
