# Design System — hello-word-21

> Source of truth: the approved `index.html` (preview: in repo design preview).
> Every value below is extracted from it. Changing a value here without
> changing the approved design is a defect.

Last updated: 2025-08-18

## 1. Foundations

### 1.1 Color

Semantic tokens. Name by job, never by hue.

| Token | Value | Used for |
|---|---|---|
| `--color-bg` | `#ffffff` | Page background |
| `--color-text` | `#000000` | Body text, headings |

#### Contrast audit

Every text-on-background pair actually used. Body text ≥ 4.5:1, large text (≥ 18.66px bold or ≥ 24px) ≥ 3:1, UI borders ≥ 3:1.

| Foreground | Background | Ratio | Passes |
|---|---|---|---|
| `--color-text` | `--color-bg` | `21:1` | AA / AA Large |

### 1.2 Spacing

Base unit: `4px`. Every margin, padding, and gap in the product uses one of these.

| Token | Value |
|---|---|
| `--space-6` | `24px` |

### 1.3 Typography

Font families (include the fallback stack and how the font is loaded):

- Body: `Arial, Helvetica, sans-serif` (system stack, no custom load)
- Headings: `Arial, Helvetica, sans-serif` (system stack, no custom load)
- Mono: not used

| Token | Size | Line height | Weight | Used for |
|---|---|---|---|---|
| `--text-hero` | `clamp(2.5rem, 8vw, 6rem)` | `1` | `400` | Centered greeting |

Heading levels are used in order and never skipped for visual sizing.

### 1.4 Radius, border, shadow, motion

| Token | Value | Used for |
|---|---|---|
| `--radius-sm` | not used | - |
| `--radius-md` | not used | - |
| `--radius-lg` | not used | - |
| `--radius-full` | not used | - |
| `--border-width` | not used | - |
| `--shadow-sm` | not used | - |
| `--shadow-md` | not used | - |
| `--shadow-lg` | not used | - |
| `--duration-fast` | not used | - |
| `--duration-base` | not used | - |
| `--easing` | not used | - |

Motion respects `prefers-reduced-motion: reduce`: state changes remain, movement is removed.

### 1.5 Layout and breakpoints

| Name | Min width | Container | Columns | Gutter |
|---|---|---|---|---|
| `sm` | not used | - | - | - |
| `md` | not used | - | - | - |
| `lg` | not used | - | - | - |
| `xl` | not used | - | - | - |

Z-index scale (only these values are allowed):

| Layer | Value |
|---|---|
| Base | `0` |
| Sticky header | not used |
| Dropdown | not used |
| Modal backdrop | not used |
| Modal | not used |
| Toast | not used |

## 2. Components

One subsection per reusable component. Every component lists **all** states.

### 2.1 Greeting heading

**Purpose** — Centered full-screen message. Use for this single proof screen only; not for navigation, forms, or repeated content.

**Anatomy** — `[text]`

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-text`, `--color-bg`, `--text-hero` | Single centered greeting |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | auto | none | `--text-hero` |

**States** — every row must be filled in.

| State | Visual change | Tokens |
|---|---|---|
| Default | Black centered text on white canvas | `--color-text`, `--color-bg`, `--text-hero` |
| Hover | None | same as default |
| Focus (keyboard) | None; static heading has no focus target | same as default |
| Active / pressed | None | same as default |
| Disabled | Not applicable | same as default |
| Loading | Not applicable | same as default |
| Error | Not applicable | same as default |
| Empty | Not applicable | same as default |

**Accessibility** — required role/ARIA, keyboard interaction, focus behavior, minimum hit target (44×44px).

- Role/ARIA: heading text rendered as `h1` inside labeled `main`.
- Keyboard interaction: none.
- Focus behavior: none.
- Minimum hit target: not applicable; no interaction.

## 3. Content and formatting

- Voice and tone in one line: plain, minimal, no decoration.
- Date, time, number, and currency formats, with locale: not used.
- Capitalization rule for buttons, headings, and labels: sentence case, matching source text.
- Empty-state and error-message wording pattern: not used.

## 4. Known deviations

Places where the approved design does not follow its own rules or the
anti-patterns in `references/ai-defaults.md`. Record, do not silently fix.

| Where | Deviation | Why it stands | Follow-up |
|---|---|---|---|
| Foundations | Most scale tokens, breakpoints, shadows, borders, radii, motion, and z-index layers are not used | One-screen proof page does not need them | Add only when product grows beyond static greeting |
| Components | Only one static component exists | Design has no reusable interactive elements | None |
| Layout | No cards, nav, footer, or multi-column layout | Approved mockup is intentionally bare | None |
| Content | No loading, empty, or error states | Page reads one stored value and has only success path in design | Add states if API UX changes |

## 5. Change log

| Date | Change | Design PR |
|---|---|---|
| 2025-08-18 | Initial design system from approved single-screen mockup | pending |
