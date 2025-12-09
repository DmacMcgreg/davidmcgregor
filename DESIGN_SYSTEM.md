# Kinetic Editorial Design System

A design language for David McGregor's portfolio - where editorial sophistication meets kinetic digital experiences.

---

## Design Philosophy

**Core Concept:** A living magazine spread meets digital art installation. Bold asymmetric typography collides with floating geometric forms. Every interaction feels intentional and unexpected.

**Key Principles:**
1. **Typography as Architecture** - Text so bold it becomes structural
2. **Living Canvas** - Shapes that breathe and move throughout
3. **Cinematic Scroll** - Every scroll reveals a new composition
4. **Magnetic Interactions** - Elements responding to cursor proximity
5. **Editorial Warmth** - Grain texture adding depth and humanity

---

## Color Palette

### Primary Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--ink` | `#0D0D0D` | Primary text, dark backgrounds |
| `--ink-light` | `#1A1A1A` | Secondary dark elements |
| `--paper` | `#F5F2ED` | Main background (warm cream) |
| `--paper-dark` | `#E8E4DD` | Section backgrounds, cards |

### Accent Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#FF4D00` | Primary accent (vermillion) - CTAs, highlights, hover states |
| `--accent-hover` | `#E64400` | Accent hover state |
| `--accent-alt` | `#2A3BFF` | Secondary accent (electric blue) - decorative elements |

### Neutral Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--muted` | `#8B8680` | Secondary text, labels |
| `--muted-light` | `#B8B4AE` | Borders, dividers, disabled states |

---

## Typography

### Font Stack

| Role | Font | Fallback | Weight Range |
|------|------|----------|--------------|
| Display | Clash Display | system-ui, sans-serif | 200-700 |
| Serif | Zodiak | Georgia, serif | 200-800 |
| Body | Switzer | system-ui, sans-serif | 100-900 |

### Type Scale (Fluid)

```css
--text-hero: clamp(4rem, 15vw, 14rem);      /* Massive hero text */
--text-display: clamp(2.5rem, 8vw, 7rem);   /* Section headings */
--text-heading: clamp(1.5rem, 4vw, 3rem);   /* Card titles */
--text-subheading: clamp(1.25rem, 2vw, 1.75rem);
--text-body: clamp(1rem, 1.2vw, 1.125rem);
--text-small: clamp(0.875rem, 1vw, 1rem);
--text-caption: clamp(0.75rem, 0.9vw, 0.875rem);
```

### Typography Styles

**Hero Text:**
- Font: Clash Display
- Weight: 700
- Letter-spacing: -0.04em
- Line-height: 0.9-1.1

**Display Text (Serif Accent):**
- Font: Zodiak (italic)
- Weight: 400
- Letter-spacing: -0.02em
- Used for: Last name in hero, accent phrases

**Section Headings:**
- Font: Clash Display
- Weight: 600
- Letter-spacing: -0.02em

**Body Text:**
- Font: Switzer
- Weight: 400
- Line-height: 1.6-1.7
- Max-width: 65ch

**Labels/Captions:**
- Font: Switzer
- Weight: 500-600
- Text-transform: uppercase
- Letter-spacing: 0.1-0.15em

---

## Spacing Scale

```css
--space-3xs: 0.25rem;   /* 4px */
--space-2xs: 0.5rem;    /* 8px */
--space-xs: 0.75rem;    /* 12px */
--space-sm: 1rem;       /* 16px */
--space-md: 1.5rem;     /* 24px */
--space-lg: 2rem;       /* 32px */
--space-xl: 3rem;       /* 48px */
--space-2xl: 5rem;      /* 80px */
--space-3xl: 8rem;      /* 128px */
--space-4xl: 13rem;     /* 208px */
```

---

## Layout

### Container Widths

```css
--max-width: 1400px;      /* Main container */
--content-width: 900px;   /* Narrow content */
--gutter: clamp(1rem, 4vw, 3rem);
```

### Grid System

**Projects Grid:** 12-column asymmetric grid
- Standard cards: span 4
- Wide cards: span 8
- Tall cards: span 4, row span 2
- Featured cards: span 8, row span 2

---

## Animation

### Timing Functions

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);     /* Primary easing */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);    /* Softer ease */
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);   /* Bouncy */
```

### Duration Scale

```css
--duration-instant: 0.1s;
--duration-fast: 0.2s;
--duration-medium: 0.4s;
--duration-slow: 0.6s;
--duration-slower: 0.8s;
--duration-slowest: 1.2s;
```

### Animation Patterns

**Scroll Reveal:**
```tsx
initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
```

**Staggered Text (Letter-by-letter):**
```tsx
staggerChildren: 0.03
itemVariants: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }
```

**Parallax Speeds:**
- Slowest (large shapes): `speed: 0.2-0.3`
- Medium (mid-size elements): `speed: 0.4-0.5`
- Fastest (small accents): `speed: 0.6-0.8`

**Hover Transitions:**
- Duration: 0.3-0.4s
- Easing: `--ease-out-expo`

---

## Components

### Custom Cursor

- Default: 8px vermillion dot with difference blend mode
- Hover: 80px ring with vermillion fill, text label inside
- Hidden on mobile/touch devices

### Magnetic Button

- Hover physics: `stiffness: 150, damping: 15`
- Background reveal: scale from 0 to 1 on hover
- Variants: primary (filled), secondary (outlined), ghost

### Parallax Shapes

Types:
- `circle` - Filled circle
- `ring` - Stroked circle
- `line` - Horizontal line
- `dot` - Small filled circle
- `blob` - Organic SVG shape

### Project Cards

- 3D tilt on hover (rotateX/rotateY based on cursor position)
- Image desaturates by default, saturates on hover
- Content slides up on hover
- Staggered reveal animation

### Grain Overlay

- SVG feTurbulence filter
- Opacity: 0.035
- Mix-blend-mode: multiply
- Fixed position, full viewport

---

## Z-Index Scale

```css
--z-behind: -1;
--z-base: 0;
--z-above: 1;
--z-shapes: 5;
--z-header: 100;
--z-overlay: 200;
--z-modal: 300;
--z-cursor: 9999;
```

---

## Responsive Breakpoints

```css
/* Mobile first */
@media (max-width: 768px) { /* Tablet and below */ }
@media (max-width: 1024px) { /* Desktop small */ }
```

### Mobile Adaptations

- Custom cursor hidden (native cursor restored)
- Hamburger menu for navigation
- Single-column project grid
- Reduced parallax intensity
- Simplified floating shapes

---

## Accessibility

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}
```

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}
```

### Color Contrast

- Primary text on paper: 15:1 (AAA)
- Muted text on paper: 4.5:1 (AA)
- Accent on paper: 4.5:1 (AA)

---

## File Structure

```
src/
├── index.css                 # Global styles, CSS variables, reset
├── components/
│   ├── shared/
│   │   ├── CustomCursor      # Magnetic cursor
│   │   ├── GrainOverlay      # Film grain texture
│   │   ├── ParallaxShape     # Floating geometric shapes
│   │   ├── RevealText        # Scroll-triggered text reveal
│   │   └── MagneticButton    # Hover-magnetic buttons
│   ├── Layout/               # Header, Footer, Layout wrapper
│   ├── Hero/                 # Hero section with shapes
│   ├── Projects/             # Grid and cards
│   ├── About/                # About section
│   └── Contact/              # Contact section with form
└── pages/                    # Route components
```

---

## Usage Examples

### Adding a New Section

```tsx
import { RevealText, ParallaxShape } from '../components/shared';

function NewSection() {
  return (
    <section className={styles.section}>
      <ParallaxShape type="ring" size={200} color="var(--accent)" speed={0.3} top="10%" right="5%" />

      <RevealText>
        <span className={styles.label}>Section Label</span>
      </RevealText>

      <RevealText delay={0.1}>
        <h2>Section Title</h2>
      </RevealText>
    </section>
  );
}
```

### Staggered Text Animation

```tsx
import { StaggeredText } from '../components/shared';

<StaggeredText
  text="Hello World"
  splitBy="char"
  staggerDelay={0.04}
  duration={0.8}
/>
```

### Magnetic Button

```tsx
import { MagneticButton } from '../components/shared';

<MagneticButton
  href="/contact"
  variant="primary"
  size="lg"
  cursorText="Contact"
>
  Get in Touch
</MagneticButton>
```
