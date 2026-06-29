# Design System Inspired by Discord

## 1. Visual Theme & Atmosphere

Discord's design system embodies a modern, energetic, and inclusive digital environment centered around community and connection. The visual language is built on bold contrasts between deep, dark backgrounds and vibrant accent colors that create depth and focus. The aesthetic combines a tech-forward sensibility with playful, approachable elements—evident in the rounded geometric forms, bright accent greens, and gradient overlays. This system prioritizes clarity and hierarchy while maintaining a youthful, dynamic personality that appeals to gaming, creative, and social communities. The overall mood is confident, inclusive, and engaging, with generous use of whitespace and carefully orchestrated color moments that guide user attention to key interactions.

**Key Characteristics**
- Dark-first design language with high contrast white text
- Vibrant accent colors (electric blue and neon green) for primary actions
- Rounded, modern geometric styling with soft corners
- Generous whitespace and breathing room between elements
- Playful, friendly tone with bold typography
- Strong focus on accessibility and legibility
- Gradient and layered depth effects
- Community-centric, inclusive visual approach

## 2. Color Palette & Roles

### Primary
- **Discord Brand Blue** (`#5865F2`): Primary interactive elements, call-to-action buttons, and brand identity accents
- **Blurple** (`#8891F2`): Secondary brand color for supporting elements and hover states

### Accent Colors
- **Neon Green** (`#35ED7E`): Highlight accents, success states, and energetic focal points
- **Deep Purple** (`#1F1D5D`): Premium or elevated UI contexts

### Interactive
- **Danger Red** (`#ED4245`): Error states, destructive actions, and alerts
- **Warning Amber** (`#FDA220`): Warning states and cautionary elements

### Neutral Scale
- **White** (`#FFFFFF`): Primary text, typography, and foreground content
- **Light Gray** (`#F6F6F6`): Subtle background fills and soft surfaces
- **Medium Gray** (`#99AAB5`): Secondary text, disabled states, and muted content
- **Dark Gray** (`#333333`): Tertiary text and low-contrast elements
- **Dark Gray Heavy** (`#3B3B3B`): Alternative dark neutral for borders and dividers

### Surface & Borders
- **Almost Black** (`#060A0B`): Primary background, dark surfaces, and dominant UI backdrop
- **Charcoal** (`#23272A`): Secondary background and container surfaces
- **Darker Charcoal** (`#2C2F33`): Alternative dark surface for layering
- **Pure Black** (`#000000`): Deep shadows and maximum contrast elements

## 3. Typography Rules

### Font Family
**Primary Display Font:** Abcgintodiscordnord (sans-serif fallback)
**Primary Body Font:** Abcgintodiscord (sans-serif fallback)
**Default Font:** ABC Ginto Normal (sans-serif fallback)

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display Large | Abcgintodiscordnord | 72px | 700 | 64.8px | 0px | Page hero headlines and major impact statements |
| Display Medium | Abcgintodiscordnord | 48px | 700 | 48px | 0px | Section headings and prominent titles |
| Heading Small | Abcgintodiscord | 16px | 400 | 20px | 0px | Subsection headers and section breaks |
| Body Large | Abcgintodiscord | 20px | 400 | 26px | 0px | Primary body text and long-form content |
| Body Medium | Abcgintodiscord | 16px | 500 | 19.2px | 0px | Secondary body text and descriptive copy |
| Button | ABC Ginto Normal | 16px | 400 | 24px | 0px | All button text labels |
| Label | ABC Ginto Normal | 16px | 500 | 24px | 0px | Form labels and field captions |

### Principles
- High contrast ensures legibility against dark backgrounds
- Consistent font family across all variants maintains brand cohesion
- Generous line heights (1.2–1.3x font size) improve readability in digital contexts
- Weight hierarchy (400, 500, 700) creates clear visual distinction between content layers
- No letter spacing adjustments needed for standard weights
- Font sizes scale from 16px minimum to 72px maximum for accessibility

## 4. Component Stylings

### Buttons

**Primary Button**
- **Background:** `rgba(88, 101, 242, 0)` (transparent)
- **Text Color:** `#FFFFFF`
- **Padding:** `15px 24px 14px 24px`
- **Border Radius:** `12px`
- **Border:** `0px solid transparent`
- **Font Size:** `16px`
- **Font Weight:** `500`
- **Font Family:** ABC Ginto Normal
- **Height:** `48px`
- **Box Shadow:** `none`
- **Hover State:** Increase opacity to 1.0 with `rgba(88, 101, 242, 1)`
- **Active State:** Darken to `rgba(80, 90, 220, 1)`

**Secondary Button**
- **Background:** `rgba(255, 255, 255, 0.1)`
- **Text Color:** `#FFFFFF`
- **Padding:** `0px 0px 0px 0px`
- **Border Radius:** `14px`
- **Border:** `0px solid transparent`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** ABC Ginto Normal
- **Height:** `40px`
- **Width:** `40px`
- **Box Shadow:** `none`
- **Hover State:** Increase background opacity to `rgba(255, 255, 255, 0.2)`
- **Active State:** Increase background opacity to `rgba(255, 255, 255, 0.15)`

**Icon Button**
- **Background:** `rgba(255, 255, 255, 0.1)`
- **Text Color:** `#FFFFFF`
- **Padding:** `1px 6px 1px 6px`
- **Border Radius:** `14px`
- **Border:** `0px solid transparent`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** ABC Ginto Normal
- **Height:** `40px`
- **Width:** `40px`
- **Box Shadow:** `none`
- **Hover State:** Increase background opacity to `rgba(255, 255, 255, 0.2)`

**Ghost Button**
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#FFFFFF`
- **Padding:** `0px 0px 0px 0px`
- **Border Radius:** `0px`
- **Border:** `0px solid transparent`
- **Font Size:** `16px`
- **Font Weight:** `500`
- **Font Family:** ABC Ginto Normal
- **Height:** `auto`
- **Box Shadow:** `none`
- **Hover State:** Add underline or increase text opacity to `rgba(255, 255, 255, 0.8)`
- **Active State:** Text color becomes `rgba(88, 101, 242, 1)`

**Call-to-Action Button (Green)**
- **Background:** `#35ED7E`
- **Text Color:** `#000000`
- **Padding:** `13.008px 24px 13.008px 24px`
- **Border Radius:** `12px`
- **Border:** `0px solid transparent`
- **Font Size:** `16px`
- **Font Weight:** `500`
- **Font Family:** Abcgintodiscord
- **Height:** `48px`
- **Box Shadow:** `none`
- **Hover State:** Darken green to `#2FD473`
- **Active State:** Darken further to `#28B861`

### Cards & Containers

**Card Surface**
- **Background:** `#23272A`
- **Border Radius:** `12px`
- **Border:** `0px solid transparent`
- **Padding:** `20px`
- **Box Shadow:** `0px 4px 12px rgba(0, 0, 0, 0.3)` (inferred)
- **Text Color:** `#FFFFFF`

**Container Background**
- **Background:** `#060A0B`
- **Border:** `0px solid transparent`
- **Padding:** Varies by context (40px, 80px, or 100px for sections)

**Layered Container**
- **Background:** `#2C2F33`
- **Border Radius:** `0px` or `24px 0px 0px` (contextual)
- **Padding:** `40px` or `80px`
- **Box Shadow:** `0px 8px 20px rgba(0, 0, 0, 0.4)` (inferred)

### Inputs & Forms

**Text Input**
- **Background:** `rgba(0, 0, 0, 0.2)`
- **Text Color:** `#FFFFFF`
- **Placeholder Color:** `#99AAB5`
- **Border:** `1px solid rgba(255, 255, 255, 0.1)`
- **Border Radius:** `8px`
- **Padding:** `12px 16px`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** ABC Ginto Normal
- **Height:** `40px`
- **Focus State:** Border color becomes `#5865F2`, background becomes `rgba(0, 0, 0, 0.4)`
- **Error State:** Border color becomes `#ED4245`

**Form Label**
- **Text Color:** `#FFFFFF`
- **Font Size:** `16px`
- **Font Weight:** `500`
- **Font Family:** ABC Ginto Normal
- **Line Height:** `24px`
- **Margin Bottom:** `8px`

### Navigation

**Navigation Bar**
- **Background:** `rgba(0, 0, 0, 0)` (transparent or inherits parent)
- **Text Color:** `#FFFFFF`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** ABC Ginto Normal
- **Height:** `auto`
- **Padding:** `16px 24px`
- **Line Height:** `24px`
- **Hover State:** Text opacity becomes `0.8` or color shifts to `#8891F2`

**Navigation Link**
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#FFFFFF`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** ABC Ginto Normal
- **Padding:** `0px 16px`
- **Border Radius:** `0px`
- **Active State:** Text color becomes `#35ED7E` or underline appears
- **Hover State:** Text opacity becomes `0.8`

### Badges

**Badge Default**
- **Background:** `rgba(88, 101, 242, 0.2)`
- **Text Color:** `#5865F2`
- **Padding:** `4px 8px`
- **Border Radius:** `100%` (pill-shaped)
- **Font Size:** `12px` (inferred)
- **Font Weight:** `500`
- **Border:** `0px solid transparent`

**Badge Success**
- **Background:** `rgba(53, 237, 126, 0.2)`
- **Text Color:** `#35ED7E`
- **Padding:** `4px 8px`
- **Border Radius:** `100%`
- **Font Size:** `12px`
- **Font Weight:** `500`

**Badge Danger**
- **Background:** `rgba(237, 66, 69, 0.2)`
- **Text Color:** `#ED4245`
- **Padding:** `4px 8px`
- **Border Radius:** `100%`
- **Font Size:** `12px`
- **Font Weight:** `500`

## 5. Layout Principles

### Spacing System

**Base Unit:** `4px`

**Scale:**
- `4px`: Micro gaps and tight spacing between closely related elements
- `8px`: Small margins and gaps within components
- `12px`: Padding within forms and input fields
- `16px`: Standard gap between sibling elements and moderate padding
- `20px`: Card padding and section padding
- `24px`: Large padding for containers, button padding
- `32px`: Gap between major sections
- `40px`: Large section padding and containers
- `44px`: Extra large margins between isolated sections
- `48px`: Paragraph spacing and major layout breaks
- `80px`: Hero section padding and page-level spacing
- `100px`: Maximum section gap for visual separation

**Usage Context:**
- Use `4px–8px` within component internals (icon spacing, list item gaps)
- Use `12px–16px` for standard padding and margins
- Use `20px–24px` for card and container padding
- Use `32px–48px` for section-to-section spacing
- Use `80px–100px` for page-level hero and footer sections

### Grid & Container

**Max Width:** `1440px` (inferred from modern standards)

**Column Strategy:**
- Desktop: 12-column grid with `20px` gutters
- Tablet: 8-column grid with `16px` gutters
- Mobile: Single-column layout with `16px` side margins

**Section Patterns:**
- Hero sections: Full-width with centered content, 80–100px vertical padding
- Content sections: Centered container with max-width constraint
- Sidebar layouts: Use 3:1 or 4:1 ratio for main/sidebar columns
- Grid layouts: 2–4 columns on desktop, 1–2 on tablet, 1 on mobile

### Whitespace Philosophy

Discord's layout prioritizes generous whitespace around focal elements. Spacing is used to create visual hierarchy and breathing room rather than densely pack content. The dark background amplifies the impact of whitespace, making every element feel intentional and prominent. Sections are separated by substantial vertical gaps (40–80px) to prevent cognitive overload. Within cards and containers, padding is consistent (20px) to maintain visual uniformity. This approach creates a premium, uncluttered aesthetic that reduces friction and enhances user focus.

### Border Radius Scale

- `0px`: Navigation items and flat UI elements
- `8px`: Alternative button styles and smaller components
- `12px`: Buttons, input fields, cards, and primary interactive elements
- `14px`: Icon buttons and secondary controls
- `16px`: Large cards and elevated containers
- `24px`: Image corners and special layout contexts (e.g., `24px 0px 0px`)
- `100%`: Pills, badges, and circular elements

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow, `box-shadow: none` | Text, icons, minimal interactive elements |
| Raised (1) | `box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2)` | Buttons, small cards, tooltips |
| Elevated (2) | `box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3)` | Cards, modals, popups |
| High (3) | `box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.4)` | Layered containers, floating panels |
| Maximum (4) | `box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.5)` | Overlay dialogs, full-screen modals |

**Shadow Philosophy:**
Discord employs subtle, layered shadows to create depth without visual noise. Shadows are consistently dark (using black at various opacities) and positioned at moderate offsets (2–16px vertically). The approach avoids harsh or overly pronounced shadows, instead using them to create gentle separation between UI layers. Darker backgrounds mean shadows are more noticeable, so restraint is key. Elevation is used strategically to highlight interactive or important content—buttons, cards, and user-generated content receive appropriate shadow treatment. Conversely, background surfaces and static text remain shadow-free to maintain focus on actionable elements.

## 7. Do's and Don'ts

### Do
- **Do** use `#5865F2` (Discord Blue) as the primary interactive color for CTAs and brand moments
- **Do** pair dark backgrounds (`#060A0B`, `#23272A`) with white text (`#FFFFFF`) for maximum contrast and accessibility
- **Do** apply `12px` border radius to buttons, inputs, and cards as the standard rounded corner treatment
- **Do** use `#35ED7E` (Neon Green) sparingly as a highlight or success indicator to create focal moments
- **Do** maintain generous whitespace (32px–48px) between major sections for visual clarity
- **Do** use ABC Ginto Normal as the default font family for all UI text and buttons
- **Do** apply subtle shadows (`0px 4px 12px rgba(0, 0, 0, 0.3)` or similar) to cards and containers for depth
- **Do** stick to the typography scale (16px, 20px, 48px, 72px) for consistency
- **Do** prioritize semantic color usage: blue for primary actions, green for success, red for danger, amber for warnings
- **Do** test color contrast ratios to ensure WCAG AA compliance (minimum 4.5:1 for body text)

### Don't
- **Don't** use more than two accent colors in a single component or section
- **Don't** apply shadows to text or icon-only elements—reserve shadows for containers and elevated surfaces
- **Don't** mix rounded corners inconsistently; use the defined scale (`8px`, `12px`, `14px`, `16px`, `24px`, `100%`)
- **Don't** reduce whitespace below the base unit of `4px` except in very specific, well-justified contexts
- **Don't** use light backgrounds with light text or dark backgrounds with dark text; always maintain contrast
- **Don't** apply opacity changes to brand colors unless explicitly using the semantic transparency levels
- **Don't** override the font family hierarchy; use Abcgintodiscordnord for display, Abcgintodiscord for body, ABC Ginto Normal for UI
- **Don't** create custom button styles outside the defined variants (Primary, Secondary, Icon, Ghost, CTA)
- **Don't** use colors like `#333333` or `#3B3B3B` for primary text; reserve them for tertiary or disabled states
- **Don't** apply box shadows to flat backgrounds or surfaces that don't need visual lifting

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | 360px–599px | Single column, `16px` side margins, stacked navigation, touch targets ≥ 44px |
| Tablet | 600px–1023px | 1–2 columns, `20px` side margins, reduced padding in sections (40px → 32px), grid adjustments |
| Desktop | 1024px–1439px | 2–4 columns, `24px` side margins, full spacing scale, multi-column layouts enabled |
| Wide | 1440px+ | Constrained max-width at 1440px, centered layout, full feature set |

### Touch Targets

- **Minimum Size:** `44px × 44px` for all interactive elements (buttons, links, icon buttons)
- **Recommended Size:** `48px × 48px` for buttons and primary CTAs
- **Spacing Between Targets:** Minimum `8px` to prevent accidental activation
- **Small Targets (Icons):** Minimum `40px × 40px` with at least `4px` padding around the icon
- **Link Text:** Minimum line height of `24px` with `8px` vertical and horizontal padding

### Collapsing Strategy

**Navigation:**
- Desktop: Horizontal navigation bar with dropdowns
- Tablet: Horizontal navigation with condensed dropdowns or multi-level menus
- Mobile: Hamburger menu with slide-out or stacked full-width navigation

**Spacing:**
- Desktop: Full scale (`80px` hero padding, `48px` section gaps)
- Tablet: Reduced by ~25% (`60px` hero padding, `32px` section gaps)
- Mobile: Further reduced (`40px` hero padding, `24px` section gaps)

**Grid Layouts:**
- Desktop: 4 columns or 2-column with sidebar layouts
- Tablet: 2 columns, simplified layouts
- Mobile: 1 column, stacked components, minimal nesting

**Typography:**
- Desktop: Full hierarchy (72px display, 48px heading, 20px body)
- Tablet: Reduced heading size (48px → 36px)
- Mobile: Further reduced (36px → 24px for headings, 20px → 18px for body)

**Button Sizing:**
- All breakpoints: Minimum `44px` height for touch accessibility
- Desktop: `48px` height, full padding (`24px` horizontal)
- Mobile: `44px` height, condensed padding (`16px` horizontal) or full width

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Discord Brand Blue (`#5865F2`)
- **Background:** Almost Black (`#060A0B`)
- **Secondary Background:** Charcoal (`#23272A`)
- **Heading Text:** White (`#FFFFFF`)
- **Body Text:** White (`#FFFFFF`)
- **Secondary Text:** Medium Gray (`#99AAB5`)
- **Success/Highlight:** Neon Green (`#35ED7E`)
- **Error:** Danger Red (`#ED4245`)
- **Warning:** Warning Amber (`#FDA220`)
- **Neutral Accent:** Blurple (`#8891F2`)
- **Input Background:** `rgba(0, 0, 0, 0.2)` on dark backgrounds
- **Button Hover:** Increase opacity or darken color by 10–15%
- **Shadow Default:** `0px 4px 12px rgba(0, 0, 0, 0.3)`

### Iteration Guide

1. **Font Consistency:** Always use Abcgintodiscordnord for display (48px+), Abcgintodiscord for body, and ABC Ginto Normal for buttons and UI labels. Do not mix fonts arbitrarily.

2. **Color Application:** Apply `#5865F2` to primary buttons, interactive states, and brand moments. Use `#35ED7E` only as an accent or success state. All text on dark backgrounds must be white (`#FFFFFF`) for accessibility.

3. **Spacing Baseline:** Build all spacing using multiples of `4px`. Standard gaps are `16px` (sibling elements), `24px` (card padding), `32px–48px` (section spacing), and `80px–100px` (page-level spacing).

4. **Button Structure:** Buttons must have minimum `48px` height, `12px` border radius, and `16px` horizontal padding. Primary buttons use transparent Discord Blue background; secondary buttons use white with `0.1` opacity. Icon buttons are `40px × 40px` with `14px` border radius.

5. **Card & Container Treatment:** All cards use `#23272A` background, `12px` border radius, `20px` padding, and shadow level 2 (`0px 4px 12px rgba(0, 0, 0, 0.3)`). Page backgrounds are `#060A0B`.

6. **Typography Scale:** Use the nine-point hierarchy: 72px (display), 48px (heading), 20px (body large), 16px (body medium / button / label), 14px (caption), 12px (micro). Font weights are 400 (regular), 500 (medium), 700 (bold).

7. **Shadow Strategy:** Apply shadows only to elevated elements (cards, containers, modals). Use `0px 4px 12px rgba(0, 0, 0, 0.3)` for standard elevation, `0px 8px 20px rgba(0, 0, 0, 0.4)` for high elevation. Never shadow text or flat surfaces.

8. **Responsive Adaptation:** At 600px breakpoint, reduce section padding by `8px`, convert 2-column grids to single column, hide desktop navigation, and enable hamburger menu. At 1024px, enable multi-column grids and restore full horizontal navigation.

9. **Border Radius Application:** Use `0px` for navigation items, `8px` for secondary components, `12px` for buttons and primary inputs, `14px` for icon buttons, `16px` for large cards, `100%` for badges and pills. Never deviate from this scale without documentation.