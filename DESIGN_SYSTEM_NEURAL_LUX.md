# Neural Lux Design System

A design language for David McGregor's portfolio - where technical mastery meets refined futurism.

---

## Design Philosophy

**Core Concept:** High-end AI consultancy meets luxury tech. A dark-mode-forward experience that feels like stepping into the control room of the future - sophisticated, powerful, and precisely engineered.

**Key Principles:**
1. **Intelligent Darkness** - Deep charcoal canvas that makes content and accents glow
2. **Data as Beauty** - Visualization-inspired elements that hint at the work beneath
3. **Luminous Focus** - Strategic use of light to guide attention
4. **Technical Precision** - Grid systems and spacing that feel engineered
5. **Warm Innovation** - Futuristic without being cold or sterile

**The Feeling:** Walking into a high-end tech company's executive briefing room - dark walls, ambient lighting, screens showing elegant data visualizations. You're in the presence of someone who builds the future.

---

## Color Palette

### Primary Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--void` | `#0C0C0E` | Deepest background, hero sections |
| `--charcoal` | `#141416` | Primary background |
| `--charcoal-light` | `#1C1C1F` | Cards, elevated surfaces |
| `--charcoal-muted` | `#252528` | Tertiary surfaces, hover states |
| `--cloud` | `#F8F8FA` | Primary text |
| `--cloud-muted` | `#E4E4E7` | Secondary text |

### Accent Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--cyan` | `#00D4FF` | Primary accent - links, highlights, glows |
| `--cyan-dim` | `#00A8CC` | Hover states, secondary accents |
| `--cyan-glow` | `rgba(0, 212, 255, 0.15)` | Subtle glow effects, backgrounds |
| `--warm` | `#FFB366` | Warm accent - CTAs, emphasis, contrast moments |
| `--warm-dim` | `#E69A4C` | Warm hover states |

### Neutral Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--steel` | `#71717A` | Secondary text, labels |
| `--steel-light` | `#A1A1AA` | Tertiary text, placeholders |
| `--border` | `#27272A` | Borders, dividers |
| `--border-glow` | `rgba(0, 212, 255, 0.3)` | Accent borders on focus/hover |

**Signature Element:** Subtle cyan glow effects - box shadows with `--cyan-glow`, border accents that pulse gently, text that appears to emit light.

---

## Typography

### Font Stack

| Role | Font | Fallback | Weight Range |
|------|------|----------|--------------|
| Display | Space Grotesk | system-ui, sans-serif | 500-700 |
| Headings | Space Grotesk | system-ui, sans-serif | 500-600 |
| Body | IBM Plex Sans | system-ui, sans-serif | 400-500 |
| Mono/Data | IBM Plex Mono | monospace | 400-500 |

### Type Scale (Fluid)

```css
--text-hero: clamp(3.5rem, 12vw, 10rem);     /* Bold statements */
--text-display: clamp(2rem, 6vw, 5rem);      /* Section headings */
--text-heading: clamp(1.5rem, 3vw, 2.5rem);  /* Card titles */
--text-subheading: clamp(1.125rem, 1.5vw, 1.5rem);
--text-body: clamp(1rem, 1.1vw, 1.125rem);
--text-small: clamp(0.875rem, 1vw, 1rem);
--text-caption: clamp(0.75rem, 0.85vw, 0.875rem);
--text-mono: clamp(0.8125rem, 0.9vw, 0.9375rem);
```

### Typography Styles

**Hero Text:**
- Font: Space Grotesk
- Weight: 700
- Letter-spacing: -0.03em
- Line-height: 0.95
- Optional: Gradient text effect (cyan to warm)

**Section Headings:**
- Font: Space Grotesk
- Weight: 600
- Letter-spacing: -0.02em

**Body Text:**
- Font: IBM Plex Sans
- Weight: 400
- Line-height: 1.7
- Max-width: 65ch
- Color: `--cloud-muted` (slightly dimmed for comfort)

**Labels/Data:**
- Font: IBM Plex Mono
- Weight: 500
- Text-transform: uppercase
- Letter-spacing: 0.1em
- Color: `--cyan`

**Code/Technical:**
- Font: IBM Plex Mono
- Weight: 400
- Background: `--charcoal-light`
- Border-left: 2px solid `--cyan`

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
--space-4xl: 12rem;     /* 192px */
```

---

## Layout

### Container Widths

```css
--max-width: 1400px;      /* Main container */
--content-width: 800px;   /* Prose content */
--gutter: clamp(1.5rem, 5vw, 4rem);
```

### Grid System

- **Primary:** 12-column grid
- **Project cards:** Mix of span-6 and span-4 for variety
- **Dashboard-inspired layouts:** Asymmetric panels, data-card groupings
- **Generous breathing room:** Sections feel like distinct "screens"

### Signature Layout Elements

- Floating data elements in margins (years, stats, labels)
- Terminal-style code blocks for technical content
- Grid lines visible at low opacity as background texture

---

## Animation

### Timing Functions

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);     /* Primary - snappy */
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);   /* Smooth decel */
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1); /* Symmetric */
--ease-spring: cubic-bezier(0.34, 1.3, 0.64, 1);    /* Subtle bounce */
```

### Duration Scale

```css
--duration-instant: 0.1s;
--duration-fast: 0.15s;
--duration-medium: 0.3s;
--duration-slow: 0.5s;
--duration-slower: 0.7s;
--duration-slowest: 1s;
```

### Animation Patterns

**Scroll Reveal:**
```tsx
initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
```

**Glow Pulse (Ambient):**
```tsx
animate={{
  boxShadow: [
    "0 0 20px rgba(0, 212, 255, 0.1)",
    "0 0 40px rgba(0, 212, 255, 0.2)",
    "0 0 20px rgba(0, 212, 255, 0.1)"
  ]
}}
transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
```

**Text Gradient Shift:**
```tsx
animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
```

**Hover States:**
- Duration: 0.2-0.3s
- Cards: Lift + glow border intensifies
- Links: Cyan glow text-shadow appears
- Buttons: Background shifts, subtle scale (1.02)

**Cursor (Optional):**
- Custom cursor with cyan glow trail
- Expands to ring on interactive elements
- Disabled on touch devices

---

## Components

### Navigation

- Transparent header, blurs on scroll (`backdrop-filter: blur(12px)`)
- Links with cyan underline on hover (draws from left)
- Active state: Cyan glow behind text
- Mobile: Slide-in panel from right with staggered reveals

### Cards

- Background: `--charcoal-light`
- Border: 1px `--border`, glows cyan on hover
- Subtle gradient overlay (top-left light source)
- Optional: Small data readouts in corner (year, tech stack)

### Buttons

- Primary: Cyan background, void text, subtle glow shadow
- Secondary: Transparent, cyan border, cyan text
- Ghost: No border, cyan text, glow on hover
- Border-radius: 4px (slightly rounded, not pill)

### Data Elements

- Monospace labels with cyan color
- Stat numbers in Space Grotesk Bold
- Optional animated counters on scroll into view

### Code Blocks

- Background: `--void`
- Left border: 2px `--cyan`
- Syntax highlighting with cyan, warm, and steel accents
- Copy button with subtle glow

### Decorative Elements

- Floating grid lines (1px, 5% opacity)
- Gradient orbs in background (blurred, very subtle)
- Scan-line effect option (very subtle, animating)
- Node/connection graphics for "AI" theming

---

## Z-Index Scale

```css
--z-grid: -1;
--z-base: 0;
--z-cards: 10;
--z-header: 100;
--z-overlay: 200;
--z-modal: 300;
--z-cursor: 9999;
```

---

## Responsive Breakpoints

```css
@media (max-width: 768px)  { /* Mobile */ }
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 1440px) { /* Small desktop */ }
```

### Mobile Adaptations

- Single-column layout
- Reduced glow intensity (performance)
- Custom cursor disabled
- Simplified background effects
- Touch-friendly tap targets (min 44px)

---

## Accessibility

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  /* Disable glow pulses and ambient animations */
}
```

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 3px;
  box-shadow: 0 0 0 4px var(--cyan-glow);
}
```

### Color Contrast

- Cloud on charcoal: 13.5:1 (AAA)
- Cyan on charcoal: 8.2:1 (AAA)
- Steel on charcoal: 4.6:1 (AA)
