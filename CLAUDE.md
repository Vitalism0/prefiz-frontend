# PreFiz Frontend — Design System Rules (Figma ↔ Code)

## Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: CSS Modules (per-component) + global utility classes (`app/globals.css`)
- **Tailwind**: v4 installed but **not actively used** — prefer CSS Modules + global classes
- **Icons**: `lucide-react`
- **Font**: Roboto via `next/font/google`, exposed as `--font-roboto` CSS variable
- **i18n**: `next-intl` — all user-facing strings come from translation files, never hardcoded
- **State**: Zustand + TanStack React Query

---

## Design Tokens

Tokens are defined in two places that must stay in sync:

| Source | Location | Purpose |
|--------|----------|---------|
| CSS custom properties | `app/globals.css` `:root {}` | Runtime, used in all CSS |
| Token definitions | `tokens.json` | Source-of-truth for Figma token export |

### Token Reference

```css
--container: 1120px;   /* max layout width */
--radius: 14px;        /* card / panel border-radius */

--bg: #f5f9ff;         /* page background */
--surface: #ffffff;    /* card / panel background */
--text: #0f172a;       /* primary text */
--muted: #667085;      /* secondary / muted text */
--border: rgba(15, 23, 42, 0.12);

--primary: #1a73e8;
--primary-hover: #1558b0;
--primary-soft: rgba(26, 115, 232, 0.12);

--shadow: 0 10px 25px rgba(2, 6, 23, 0.08);
```

**Rule**: Always use CSS variables from `:root` — never hardcode hex values in component CSS.
When a new token is needed, add it to both `globals.css` `:root` and `tokens.json`.

---

## Global Utility Classes

Defined in `app/globals.css`. Use these directly in JSX `className` props — do **not** recreate them in module CSS.

| Class | Usage |
|-------|-------|
| `.container` | Max-width centred layout wrapper (`max-width: var(--container); padding: 0 16px`) |
| `.section` | Vertical section padding (`padding: 48px 0`) |
| `.card` | Card surface with border, radius, shadow |
| `.divider` | 1px horizontal rule |
| `.btn` | Base button (flex, gap, padding, radius, transition) |
| `.btnPrimary` | Primary filled button |
| `.btnSecondary` | Secondary soft button |

### Button Usage Pattern

Buttons are **not** a React component — they are CSS classes applied to `<button>` or `<Link>`:

```tsx
// Primary
<Link href="/oferta" className="btn btnPrimary">Oferta</Link>

// Secondary
<button className="btn btnSecondary">Zarezerwuj</button>

// With extra sizing from module CSS
<Link href="/oferta" className={`btn btnPrimary ${css.btn}`}>Oferta</Link>
```

---

## Component Architecture

### Directory Structure

```
components/
  Header/
    Header.tsx
    Header.module.css
  Footer/
    Footer.tsx
    Footer.module.css
  home/
    HeroSection/
    CtaSection/
    FaqSection/
    OfferTilesSection/
    ReviewsSection/
    SpecialOfferSection/
  Kalendarz/
  LanguageSwitch/
  InactivityGuard/
```

### Conventions

- Each component lives in its own folder: `ComponentName/ComponentName.tsx` + `ComponentName.module.css`
- Use **CSS Modules** for all component-specific styles (imported as `import css from "./Foo.module.css"`)
- Combine global utility classes with module classes: `className={\`${css.inner} container\`}`
- `"use client"` only when the component uses hooks/state — Server Components by default
- All text via `useTranslations()` from `next-intl`

### Icons

Use `lucide-react` exclusively:

```tsx
import { Lightbulb, Menu, X, ChevronDown } from "lucide-react";
<Lightbulb color="#0D99FF" size={40} />
```

---

## Styling Approach

1. **Component styles** → CSS Module (`.module.css` co-located with component)
2. **Layout / spacing** → `.container`, `.section` global classes
3. **Colours / radii / shadows** → CSS variables from `:root`
4. **Transitions** → `120ms ease` (matches `--transition-button` token)
5. **Responsive** → CSS media queries inside module files; mobile-first

---

## Asset Management

- Static assets: `public/images/` — organised into subdirectories (`hero/`, `gradient/`, `figma-export/`, `thumb-*.svg`)
- SVG logos: `figma/logo-*.svg`
- Reference in JSX via Next.js `<Image>` from `next/image` or direct `<img>` for SVGs

---

## Figma Code Connect

Code Connect files live in `figma/`:

```
figma/
  Button.figma.tsx
  Card.figma.tsx
  Header.figma.tsx
  Footer.figma.tsx
```

When a new Figma component is mapped:
1. Create `figma/ComponentName.figma.tsx`
2. Use `figma.connect(FIGMA_URL, { props, example })` pattern
3. Map Figma variants to the existing CSS class combinations

---

## Translating Figma Designs to Code

When implementing a Figma design:

1. **Colours** → map to nearest CSS variable; if no match exists add a new token to both `globals.css` and `tokens.json`
2. **Typography** → use Roboto; heading `line-height: 1.15`, body default
3. **Buttons** → use `.btn` + `.btnPrimary` / `.btnSecondary` classes; add module override only for size
4. **Cards** → use `.card` global class + module CSS for internal layout
5. **Layout** → wrap sections with `.section`, inner content with `.container`
6. **Spacing** → prefer `48px` section padding, `16px` container padding (match token values)
7. **Border radius** → `14px` cards, `10px` buttons, `8px` focus ring
8. **Shadows** → `var(--shadow)` for cards/panels
9. **Text content** → always use `useTranslations()`, never hardcode Polish/English strings
