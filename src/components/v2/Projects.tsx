import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../data/projects';
import { Reveal } from './Primitives';

export type ProjectsLayout = 'editorial' | 'carousel' | 'archive';

interface ProjectsSectionProps {
  projects: Project[];
  layout?: ProjectsLayout;
}

function ProjectMedia({ p }: { p: Project }) {
  return (
    <div className="card__media">
      <img src={p.image} alt={p.title} loading="lazy" className="card__img" />
      <div className="card__year">{p.year}</div>
      <div className="card__device">{p.deviceType}</div>
    </div>
  );
}

interface ProjectCardProps {
  p: Project;
  index: number;
  variant: 'editorial' | 'carousel';
  total: number;
}

function ProjectCard({ p, index, variant, total }: ProjectCardProps) {
  let cls = 'card';
  if (variant === 'editorial') {
    if (index === 0) cls += ' card--featured';
    else if (index % 7 === 2) cls += ' card--wide';
    else if (index % 7 === 5) cls += ' card--tall';
  }
  const idx = String(index + 1).padStart(2, '0');
  return (
    <Link
      to={`/projects/${p.id}`}
      className={cls}
      data-cursor-label="View"
      data-project={p.id}
    >
      <ProjectMedia p={p} />
      <div className="card__body">
        <div className="card__index">
          Project {idx} / {String(total).padStart(2, '0')}
        </div>
        <h3 className="card__title">{p.title}</h3>
        <p className="card__desc">{p.description}</p>
      </div>
    </Link>
  );
}

function EditorialLayout({ projects }: { projects: Project[] }) {
  return (
    <div className="projects__grid">
      {projects.map((p, i) => (
        <Reveal key={p.id} delay={(i % 3) * 80}>
          <ProjectCard p={p} index={i} variant="editorial" total={projects.length} />
        </Reveal>
      ))}
    </div>
  );
}

function CarouselLayout({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const total = projects.length;

  const go = useCallback(
    (i: number) => {
      setActive(() => ((i % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => go(active + 1), [active, go]);
  const prev = useCallback(() => go(active - 1), [active, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tgt = e.target as Element | null;
      if (tgt && (tgt.matches('input') || tgt.matches('textarea'))) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let startX = 0,
      startY = 0,
      dx = 0,
      dragging = false;

    const onDown = (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
      const t = 'touches' in e ? e.touches[0] : e;
      startX = t.clientX;
      startY = t.clientY;
      dx = 0;
      dragging = false;
    };
    const onMove = (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
      if (!startX) return;
      const t = 'touches' in e ? e.touches[0] : e;
      dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (!dragging && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        dragging = true;
        setIsDragging(true);
      }
      if (dragging) {
        track.style.setProperty('--drag-offset', `${dx}px`);
        if (e.cancelable) e.preventDefault();
      }
    };
    const onUp = () => {
      if (dragging) {
        const threshold = 60;
        if (dx < -threshold) next();
        else if (dx > threshold) prev();
      }
      startX = 0;
      dx = 0;
      dragging = false;
      setIsDragging(false);
      track.style.setProperty('--drag-offset', `0px`);
    };

    track.addEventListener('mousedown', onDown);
    track.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      track.removeEventListener('mousedown', onDown);
      track.removeEventListener('touchstart', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [next, prev]);

  return (
    <div className={`carousel-v2 ${isDragging ? 'is-dragging' : ''}`}>
      <div className="carousel-v2__stage">
        <div className="carousel-v2__track" ref={trackRef}>
          {projects.map((p, i) => {
            let rel = i - active;
            if (rel > total / 2) rel -= total;
            if (rel < -total / 2) rel += total;
            const absRel = Math.abs(rel);
            if (absRel > 3) return null;
            const offset = rel * 56;
            const scale = rel === 0 ? 1 : 1 - Math.min(absRel * 0.12, 0.32);
            const opacity = rel === 0 ? 1 : Math.max(0.25, 1 - absRel * 0.35);
            const blur = rel === 0 ? 0 : Math.min(absRel * 1.4, 4);
            const zIndex = 10 - absRel;
            const slideStyle: CSSProperties = {
              ['--offset' as string]: `${offset}%`,
              ['--scale' as string]: scale,
              ['--opacity' as string]: opacity,
              ['--blur' as string]: `${blur}px`,
              zIndex,
            } as CSSProperties;
            return (
              <div
                key={p.id}
                className={`carousel-v2__slide ${rel === 0 ? 'is-active' : ''}`}
                style={slideStyle}
                onClick={() => rel !== 0 && go(i)}
                aria-hidden={rel !== 0}
              >
                <ProjectCard p={p} index={i} variant="carousel" total={total} />
              </div>
            );
          })}
        </div>

        <button
          className="carousel-v2__nav carousel-v2__nav--prev"
          onClick={prev}
          aria-label="Previous project"
          data-cursor-label="Prev"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          className="carousel-v2__nav carousel-v2__nav--next"
          onClick={next}
          aria-label="Next project"
          data-cursor-label="Next"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="carousel-v2__controls">
        <div className="carousel-v2__counter">
          <span className="carousel-v2__counter-active">
            {String(active + 1).padStart(2, '0')}
          </span>
          <span className="carousel-v2__counter-sep">/</span>
          <span>{String(total).padStart(2, '0')}</span>
        </div>

        <div className="carousel-v2__meta">
          <div className="carousel-v2__meta-title">{projects[active].title}</div>
          <div className="carousel-v2__meta-sub">
            <span>{projects[active].deviceType}</span>
            <span className="carousel-v2__meta-dot" />
            <span>{projects[active].year}</span>
          </div>
        </div>

        <div className="carousel-v2__dots" role="tablist" aria-label="Project selector">
          {projects.map((p, i) => (
            <button
              key={p.id}
              className={`carousel-v2__dot ${i === active ? 'is-active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Go to ${p.title}`}
              aria-selected={i === active}
              role="tab"
              data-cursor-label={p.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArchiveLayout({ projects }: { projects: Project[] }) {
  return (
    <div className="archive">
      <div className="archive__row archive__row--head">
        <span>#</span>
        <span>Project</span>
        <span>Description</span>
        <span>Device</span>
        <span>Year</span>
        <span></span>
      </div>
      {projects.map((p, i) => (
        <Reveal key={p.id} delay={i * 30}>
          <Link
            to={`/projects/${p.id}`}
            className="archive__row"
            data-cursor-label="Open"
          >
            <span className="archive__num">{String(i + 1).padStart(2, '0')}</span>
            <span className="archive__title">{p.title}</span>
            <span className="archive__desc">{p.description}</span>
            <span className="archive__device">{p.deviceType}</span>
            <span className="archive__year">{p.year}</span>
            <span className="archive__arrow">→</span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function V2Projects({ projects, layout = 'carousel' }: ProjectsSectionProps) {
  return (
    <section className="projects" id="work">
      <div className="container">
        <div className="projects__header">
          <div>
            <Reveal>
              <span className="label">01 — Selected Work</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="projects__title">
                <em>Shipped</em>&nbsp;by collaborating with amazing teams.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className="projects__subtitle">
              AI agents, medical platforms, and production systems — 2018 to now.
            </p>
          </Reveal>
        </div>

        {layout === 'editorial' && <EditorialLayout projects={projects} />}
        {layout === 'carousel' && <CarouselLayout projects={projects} />}
        {layout === 'archive' && <ArchiveLayout projects={projects} />}
      </div>
    </section>
  );
}
