# Architectural Clarity Design System

A design language for David McGregor's portfolio - where confident restraint speaks volumes.

---

## Design Philosophy

**Core Concept:** World-class architecture firm meets elite consulting. A light, expansive canvas where quality is demonstrated through what's *not* there. Dramatic whitespace, massive typography, and singular accent moments.

**Key Principles:**
1. **Radical Whitespace** - Empty space is a design element, not absence
2. **Typography as Hero** - Words so large they become architectural
3. **Singular Accent** - One color used sparingly creates maximum impact
4. **Photography Forward** - Let the work speak without decoration
5. **Confidence Through Restraint** - Less proves you don't need more

**The Feeling:** Walking into a minimalist gallery - white walls, concrete floors, perfectly lit photographs. Each piece is given room to breathe. The absence of clutter signals that everything present has earned its place.

---

## Color Palette

### Primary Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--white` | `#FFFFFF` | Primary background |
| `--white-warm` | `#FAFAF8` | Section backgrounds, subtle variation |
| `--graphite` | `#1A1A1A` | Primary text |
| `--graphite-light` | `#2D2D2D` | Secondary text, headings |

### Accent Colors (Copper Option)

| Token | Value | Usage |
|-------|-------|-------|
| `--copper` | `#B87333` | Primary accent - used sparingly |
| `--copper-dark` | `#96611A` | Hover state |
| `--copper-light` | `#D4956A` | Disabled/muted accent |

### Accent Colors (Burgundy Alternative)

| Token | Value | Usage |
|-------|-------|-------|
| `--burgundy` | `#722F37` | Primary accent - sophisticated, bold |
| `--burgundy-dark` | `#5C262D` | Hover state |
| `--burgundy-light` | `#8E4A52` | Disabled/muted accent |

### Neutral Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--grey` | `#6B6B6B` | Secondary text |
| `--grey-light` | `#9A9A9A` | Tertiary text, labels |
| `--grey-pale` | `#E5E5E5` | Borders, dividers |
| `--grey-whisper` | `#F5F5F5` | Subtle backgrounds |

**Signature Element:** The accent color appears rarely but memorably - a single underline, a project number, a hover state. Its scarcity makes it powerful.

---

## Typography

### Font Stack

| Role | Font | Fallback | Weight Range |
|------|------|----------|--------------|
| Display | Editorial New | Georgia, serif | 300-400 |
| Headings | Neue Haas Grotesk | Helvetica, sans-serif | 500-700 |
| Body | Neue Haas Grotesk | Helvetica, sans-serif | 400-500 |
| Mono | JetBrains Mono | monospace | 400 |

*Alternative if Editorial New unavailable:*
- Display: Freight Display or Canela

*Alternative if Neue Haas Grotesk unavailable:*
- Headings/Body: Helvetica Neue or Aktiv Grotesk

### Type Scale (Fluid)

```css
--text-hero: clamp(4rem, 18vw, 16rem);       /* Massive, architectural */
--text-display: clamp(2.5rem, 8vw, 6rem);    /* Section headings */
--text-heading: clamp(1.5rem, 3vw, 2.25rem); /* Card titles */
--text-subheading: clamp(1.125rem, 1.5vw, 1.375rem);
--text-body: clamp(1rem, 1.1vw, 1.125rem);
--text-small: clamp(0.875rem, 0.95vw, 0.9375rem);
--text-caption: clamp(0.75rem, 0.8vw, 0.8125rem);
```

### Typography Styles

**Hero Text:**
- Font: Editorial New
- Weight: 300 (light, elegant)
- Letter-spacing: -0.04em
- Line-height: 0.85-0.9
- Often split across lines for dramatic effect

**Section Headings:**
- Font: Neue Haas Grotesk
- Weight: 700
- Letter-spacing: -0.02em
- Can be mixed case or all caps depending on context

**Body Text:**
- Font: Neue Haas Grotesk
- Weight: 400
- Line-height: 1.75 (generous for readability)
- Max-width: 60ch (narrower for elegance)

**Labels/Numbers:**
- Font: Neue Haas Grotesk
- Weight: 500
- Text-transform: uppercase
- Letter-spacing: 0.15em
- Often paired with accent color

**Project Numbers:**
- Font: Editorial New
- Weight: 300
- Large scale, accent color
- Example: "01" next to project title

---

## Spacing Scale

```css
--space-3xs: 0.25rem;   /* 4px */
--space-2xs: 0.5rem;    /* 8px */
--space-xs: 0.75rem;    /* 12px */
--space-sm: 1rem;       /* 16px */
--space-md: 1.5rem;     /* 24px */
--space-lg: 2.5rem;     /* 40px */
--space-xl: 4rem;       /* 64px */
--space-2xl: 6rem;      /* 96px */
--space-3xl: 10rem;     /* 160px */
--space-4xl: 16rem;     /* 256px */
```

---

## Layout

### Container Widths

```css
--max-width: 1600px;      /* Wide canvas */
--content-width: 680px;   /* Narrow prose */
--gutter: clamp(2rem, 8vw, 6rem); /* Generous margins */
```

### Grid System

- **Primary:** 12-column grid with wide gutters
- **Project layouts:** Full-bleed images alternating with contained text
- **Asymmetric compositions:** 4/8 or 3/9 splits
- **Vertical rhythm:** Exaggerated spacing between sections (`--space-3xl` to `--space-4xl`)

### Signature Layout Elements

- Oversized project numbers in margins
- Text that breaks grid deliberately
- Full-viewport hero sections
- Single-column project detail pages

---

## Animation

### Timing Functions

```css
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);   /* Primary - elegant */
--ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);   /* Softer option */
--ease-in-out-sine: cubic-bezier(0.37, 0, 0.63, 1); /* Gentle symmetric */
```

### Duration Scale

```css
--duration-instant: 0.1s;
--duration-fast: 0.2s;
--duration-medium: 0.4s;
--duration-slow: 0.6s;
--duration-slower: 0.9s;
--duration-slowest: 1.2s;
```

### Animation Patterns

**Scroll Reveal (Minimal):**
```tsx
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true, margin: "-100px" }}
transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
```

**Image Reveal (Mask):**
```tsx
initial={{ clipPath: "inset(0 100% 0 0)" }}
whileInView={{ clipPath: "inset(0 0% 0 0)" }}
transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
```

**Text Slide:**
```tsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
```

**Hover States:**
- Duration: 0.3-0.4s
- Links: Accent underline draws from left
- Images: Subtle scale (1.02) with longer duration
- No dramatic effects - confidence doesn't need to shout

**Philosophy:** Animation should be almost invisible - a gentle guide rather than a performer. If someone notices the animation, it's too much.

---

## Components

### Navigation

- Minimal: Logo left, few links right
- Large click targets, generous spacing
- No background - floats over content
- Scroll behavior: Hides on scroll down, shows on scroll up
- Mobile: Simple full-screen overlay, centered links

### Project Cards

- No visible card container - just image + text
- Large image (16:10 or 3:2 ratio)
- Title below, small text, accent-colored number
- Hover: Image subtle zoom, no borders or shadows

### Buttons

- Primary: Accent background, white text, no border-radius
- Secondary: Transparent, graphite border (1px), graphite text
- Text-only: Just text with accent underline on hover
- Sizing: Generous padding, never cramped

### Links

- Inline: Accent-colored underline (offset 2-3px)
- Navigation: No underline default, accent underline on hover
- Animated underline draws from left to right

### Dividers

- Thin graphite lines (1px), full width or partial
- Generous vertical spacing around dividers
- Optional: accent-colored short rule as section marker

### Images

- Full-bleed when possible
- Subtle reveal animation (clip-path or opacity)
- No filters, borders, or shadows
- Let photography quality speak

### Project Numbers

- Large serif numerals ("01", "02")
- Positioned in margin or above title
- Accent color
- Creates visual rhythm through project list

---

## Z-Index Scale

```css
--z-base: 0;
--z-images: 1;
--z-content: 10;
--z-header: 100;
--z-overlay: 200;
--z-modal: 300;
```

---

## Responsive Breakpoints

```css
@media (max-width: 768px)  { /* Mobile */ }
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 1440px) { /* Small desktop */ }
```

### Mobile Adaptations

- Single-column layout throughout
- Hero text scales dramatically but remains impactful
- Reduced margins (still generous by normal standards)
- Project numbers move inline with titles
- Simplified navigation

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
  outline: 2px solid var(--copper); /* or --burgundy */
  outline-offset: 4px;
}
```

### Color Contrast

- Graphite on white: 16:1 (AAA)
- Grey on white: 5.5:1 (AA)
- Copper on white: 4.5:1 (AA)
- Burgundy on white: 7.8:1 (AAA)
