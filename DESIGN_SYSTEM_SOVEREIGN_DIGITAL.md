# Sovereign Digital Design System

A design language for David McGregor's portfolio - where private banking meets tech leadership.

---

## Design Philosophy

**Core Concept:** Private banking meets tech leadership. A digital presence that commands respect through refined restraint. Every element whispers authority rather than shouting for attention.

**Key Principles:**
1. **Structured Authority** - Grid-based layouts that feel intentional and considered
2. **Quiet Confidence** - Animations that are smooth and purposeful, never flashy
3. **Material Richness** - Subtle gradients and shadows that suggest depth and quality
4. **Editorial Precision** - Typography that balances tradition with modernity
5. **Trust Through Craft** - Every detail polished to signal competence

**The Feeling:** Walking into a prestigious firm's headquarters - marble floors, mahogany accents, but with floor-to-ceiling windows showing the city below. Traditional values, modern execution.

---

## Color Palette

### Primary Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--navy` | `#0A1628` | Primary backgrounds, headers |
| `--navy-light` | `#152238` | Cards, elevated surfaces |
| `--navy-muted` | `#1E2D47` | Hover states, secondary panels |
| `--ivory` | `#FDFBF7` | Primary text on dark, light backgrounds |
| `--ivory-dark` | `#F5F2EB` | Section backgrounds, alternating rows |

### Accent Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--gold` | `#C9A54E` | Primary accent - CTAs, highlights, borders |
| `--gold-light` | `#D4B86A` | Hover states, secondary accents |
| `--gold-muted` | `#8B7A4C` | Subtle accents, disabled gold elements |

### Neutral Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--slate` | `#64748B` | Secondary text on light backgrounds |
| `--slate-light` | `#94A3B8` | Tertiary text, placeholders |
| `--border-light` | `#E2E0DB` | Borders on light backgrounds |
| `--border-dark` | `#2A3A52` | Borders on dark backgrounds |

**Signature Element:** Thin gold lines (1-2px) as dividers and frame accents.

---

## Typography

### Font Stack

| Role | Font | Fallback | Weight Range |
|------|------|----------|--------------|
| Display | Cormorant Garamond | Georgia, serif | 400-700 |
| Headings | Söhne | system-ui, sans-serif | 500-700 |
| Body | Söhne | system-ui, sans-serif | 400-500 |
| Accent/Signature | Playfair Display | Georgia, serif | 400 (italic) |

### Type Scale (Fluid)

```css
--text-hero: clamp(3rem, 10vw, 8rem);       /* Name, major statements */
--text-display: clamp(2rem, 5vw, 4rem);     /* Section headings */
--text-heading: clamp(1.5rem, 3vw, 2.25rem); /* Card titles */
--text-subheading: clamp(1.125rem, 1.5vw, 1.5rem);
--text-body: clamp(1rem, 1.1vw, 1.125rem);
--text-small: clamp(0.875rem, 1vw, 1rem);
--text-caption: clamp(0.75rem, 0.85vw, 0.875rem);
```

### Typography Styles

**Hero/Name:**
- Font: Cormorant Garamond
- Weight: 600
- Letter-spacing: 0.02em
- Optional italic for signature feel

**Section Headings:**
- Font: Söhne
- Weight: 600
- Letter-spacing: -0.01em

**Body Text:**
- Font: Söhne
- Weight: 400
- Line-height: 1.7
- Max-width: 65ch

**Labels/Overlines:**
- Font: Söhne
- Weight: 600
- Text-transform: uppercase
- Letter-spacing: 0.12em
- Color: `--gold`

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
--space-2xl: 4rem;      /* 64px */
--space-3xl: 6rem;      /* 96px */
--space-4xl: 10rem;     /* 160px */
```

---

## Layout

### Container Widths

```css
--max-width: 1200px;      /* Main container - tighter than kinetic */
--content-width: 720px;   /* Prose content */
--gutter: clamp(1.5rem, 5vw, 4rem);
```

### Grid System

- **Primary:** 12-column grid with generous gutters
- **Project cards:** Uniform sizing (span 4), clean rows
- **Content sections:** Asymmetric 5/7 or 7/5 splits for visual interest while maintaining structure
- **Generous vertical rhythm:** More whitespace between sections

### Signature Layout Elements

- Gold rule lines (1px) as section dividers
- Framed content blocks with subtle gold border on one or two sides
- Card elevation through subtle box-shadow rather than bold color

---

## Animation

### Timing Functions

```css
--ease-smooth: cubic-bezier(0.45, 0, 0.15, 1);    /* Primary - refined, unhurried */
--ease-out-subtle: cubic-bezier(0.25, 0.75, 0.5, 1); /* Soft landings */
--ease-in-out: cubic-bezier(0.45, 0.05, 0.55, 0.95); /* Symmetric motion */
```

### Duration Scale

```css
--duration-instant: 0.1s;
--duration-fast: 0.2s;
--duration-medium: 0.35s;
--duration-slow: 0.5s;
--duration-slower: 0.7s;
```

### Animation Patterns

**Scroll Reveal (Restrained):**
```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-50px" }}
transition={{ duration: 0.6, ease: [0.45, 0, 0.15, 1] }}
```

**Gold Line Draw:**
```tsx
initial={{ scaleX: 0 }}
whileInView={{ scaleX: 1 }}
transition={{ duration: 0.8, ease: [0.45, 0, 0.15, 1] }}
```

**Hover States:**
- Duration: 0.25-0.35s
- Subtle lift: `translateY(-2px)` with soft shadow increase
- Gold accent fade-in on interactive elements
- No dramatic transforms or scaling

**Philosophy:** Motion should feel like a well-oiled door - smooth, quiet, purposeful. Nothing bouncy or playful. Every animation earns its place.

---

## Components

### Navigation

- Fixed header with navy background, gold logo/wordmark
- Links in Söhne, uppercase, subtle letter-spacing
- Active state: gold underline that draws in from center
- Mobile: Full-screen overlay with staggered link reveals

### Cards

- Background: `--navy-light` or `--ivory` depending on section
- Border: 1px `--border-dark` or subtle gold left/top accent line
- Hover: Soft lift (2px), shadow increase, gold accent line extends
- No image filters - clean, professional photography

### Buttons

- Primary: Gold background, navy text, no border-radius (sharp corners)
- Secondary: Transparent, gold border (1px), gold text
- Hover: Subtle background shift, no dramatic transforms
- Padding: Generous horizontal (`--space-md` to `--space-lg`)

### Dividers

- Thin gold rules (1px) with fade-in animation
- Optional: Small decorative element at center (diamond, short perpendicular line)

### Framing Device

- Signature element: L-shaped gold corner accents on hero or key sections
- Similar to LinkedIn banner's gold border treatment

### Texture

- No grain overlay (cleaner aesthetic)
- Subtle gradient overlays on navy sections (darker at edges)
- Optional: Very faint geometric pattern at 2-3% opacity

---

## Z-Index Scale

```css
--z-base: 0;
--z-cards: 10;
--z-header: 100;
--z-overlay: 200;
--z-modal: 300;
```

---

## Responsive Breakpoints

```css
@media (max-width: 768px)  { /* Mobile */ }
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 1280px) { /* Small desktop */ }
```

### Mobile Adaptations

- Single-column card layout
- Reduced vertical spacing (scale by 0.75)
- Hero text scales down gracefully via clamp
- Gold accent lines remain but simplified
- Full-screen mobile nav with elegant reveal

---

## Accessibility

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
}
```

### Color Contrast

- Ivory on navy: 14.5:1 (AAA)
- Gold on navy: 7.2:1 (AAA)
- Slate on ivory: 4.8:1 (AA)
- All interactive elements meet WCAG 2.1 AA minimum
