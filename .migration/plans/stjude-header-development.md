# St. Jude Header Development Plan

## Overview

Develop a complete header block for the EDS project that replicates the St. Jude Children's Research Hospital website header, matching its exact UI and functionality across desktop and mobile breakpoints.

---

## Original Header Analysis

### Desktop Layout (>=900px) — Two-Row Structure
**Row 1 (Top Bar):**
- Left: St. Jude logo (red child graphic + "St. Jude Children's Research Hospital" text)
- Center-Right: Utility links — "Careers" | "Contact Us" | Language selector icon + "Espanol"
- Right: Search input field with magnifying glass icon

**Row 2 (Navigation Bar):**
- Left: 5 main nav items with dropdown chevrons — "About Us", "Care & Treatment", "Research", "Training", "Support & Fundraising"
- Right: Two CTA buttons — "Refer a Patient" (blue pill, `#135cb0`) and "Donate Now" (red pill, `#d11947`)

**Dropdown Behavior (Desktop):**
- Click on nav item opens a dropdown panel
- Absolute positioned, white background, `border-radius: 16px`, `box-shadow: rgba(0,0,0,0.1) 0 4px 8px`, `padding: 32px`
- Contains sub-links as a vertical list
- Active parent link turns blue with underline indicator
- Clicking elsewhere or another item closes the dropdown

### Mobile Layout (<900px) — Compact Header
**Header Bar:**
- Left: St. Jude logo (smaller)
- Center: Search icon button
- Right: Hamburger "MENU" button (bordered pill shape)

**Mobile Menu (Opened):**
- "MENU" becomes "X CLOSE"
- Full-width overlay below header bar
- "Refer a Patient" (blue) and "Donate Now" (red) CTA buttons at top
- 5 nav sections as accordion items with chevron expand buttons
- Each accordion expands to show sub-links
- Bottom: "Espanol" language link + "Careers" | "Contact Us" utility links

### Key Design Tokens
| Token                   | Value                                              |
| ----------------------- | -------------------------------------------------- |
| Font family             | "SJ Sans", "Open Sans", Helvetica Neue, sans-serif |
| Header height (desktop) | 136px (two rows)                                   |
| Header height (mobile)  | ~56px                                              |
| Nav text color          | `#1a1a1a`                                          |
| Nav text size           | 16px, font-weight: 700                             |
| Utility link color      | `#4d4d4d`, 14px                                    |
| Refer button BG         | `#135cb0` (blue)                                   |
| Donate button BG        | `#d11947` (red)                                    |
| CTA button height       | 48px, border-radius: 315px (pill)                  |
| Dropdown BG             | white, border-radius: 16px, shadow                 |
| Dropdown padding        | 32px                                               |
| Desktop breakpoint      | 900px (project default)                            |

### Navigation Data (5 Sections with Sub-items)
1. **About Us** → Our History, Our Stories, Our Unique Operating Model, Why Support St. Jude?, Visit, Strategic Plan, St. Jude Global, Newsroom, FAQs
2. **Care & Treatment** → Diseases Treated, Patient Referrals, Online Referral Form, Open Clinical Trials, Patients & Families, Affiliate Program
3. **Research** → Why St. Jude, Departments, Labs, Clinical Research, Research Faculty, Centers & Initiatives, Our Progress, Scientific Report, Research Careers
4. **Training** → Advanced Training, Predoctoral Training, Scientific Trainee Support, Clinical Trainee Support, St. Jude Graduate School, Seminars & Symposia
5. **Support & Fundraising** → Ways to Give, Events & Fundraisers, Gift Shop, Volunteer

**Utility Links:** Careers, Contact Us, Espanol

---

## Current EDS Project State

- **Existing header block:** Standard EDS boilerplate at `/blocks/header/` with basic hamburger, brand, sections, tools pattern
- **Nav content:** Placeholder at `/content/nav.plain.html` with "Button" brand, generic items
- **Desktop breakpoint:** 900px (matching St. Jude's breakpoint pattern)
- **Nav height CSS variable:** `--nav-height: 64px` (needs to change to accommodate two-row desktop layout)
- **Fonts:** Currently Roboto — needs updating to match St. Jude's "SJ Sans" / "Open Sans"

---

## Implementation Plan

### Phase 1: Design Tokens & Global Styles

- [ ] **1.1 Update CSS custom properties** in `styles/styles.css`
  - Add St. Jude brand colors: `--color-stjude-red: #c10f3a`, `--color-btn-blue: #135cb0`, `--color-btn-red: #d11947`, `--color-nav-text: #1a1a1a`, `--color-utility-text: #4d4d4d`
  - Update `--nav-height` to `136px` for desktop (two-row header)
  - Add mobile nav height variable: `--nav-height-mobile: 56px`
  - Update font family variables to use Open Sans (freely available equivalent of SJ Sans)

- [ ] **1.2 Add Open Sans font** to `styles/fonts.css` and `head.html`
  - Add @font-face declarations for Open Sans (regular 400, medium 600, bold 700)
  - Download .woff2 font files to `/fonts/` directory

### Phase 2: Navigation Content (nav.html)

- [ ] **2.1 Create new nav content** in `/content/nav.plain.html`
  - **Section 1 (Brand):** St. Jude logo image link to homepage
  - **Section 2 (Sections):** Nested `<ul>` structure with all 5 top-level nav items and their sub-items
  - **Section 3 (Tools):** Search icon, utility links (Careers, Contact Us), language link (Espanol), CTA buttons (Refer a Patient, Donate Now)

- [ ] **2.2 Add required icons** to `/icons/` directory
  - Search icon SVG (already exists, verify)
  - Chevron/arrow down SVG for dropdowns
  - Close (X) icon SVG for mobile menu
  - Language/globe icon SVG for Espanol link

- [ ] **2.3 Add St. Jude logo** SVG to `/icons/` or embed in nav content
  - Red child graphic + text wordmark

### Phase 3: Header Block JavaScript (`header.js`)

- [ ] **3.1 Rewrite header block `decorate()` function** to support the two-row layout
  - Parse nav fragment into: brand, sections, tools
  - Build **Row 1:** logo + utility links + search bar
  - Build **Row 2:** main nav items + CTA buttons
  - Separate tools section into search, utility links, language link, and CTAs

- [ ] **3.2 Implement desktop dropdown behavior**
  - Click on nav item toggles dropdown panel
  - Only one dropdown open at a time (close others)
  - Click outside closes dropdown
  - Active state: blue text + bottom underline bar on parent item
  - Keyboard: Escape closes, Tab navigates, Enter/Space opens
  - `aria-expanded`, `aria-haspopup` attributes for accessibility

- [ ] **3.3 Implement mobile hamburger menu**
  - MENU/CLOSE toggle button with text label (not just icon)
  - Full-width overlay panel when open
  - CTA buttons (Refer a Patient + Donate Now) at top of mobile menu
  - Accordion-style nav sections with expand/collapse chevron buttons
  - Each section expands independently (multiple can be open)
  - Utility links and language link at bottom
  - Body scroll lock when menu is open

- [ ] **3.4 Implement search functionality**
  - Desktop: Inline search input with placeholder "Search" and magnifying glass button
  - Mobile: Search icon button in header bar (toggles search overlay or navigates to search)
  - Form submission navigates to a search results page

- [ ] **3.5 Add responsive behavior**
  - `matchMedia('(min-width: 900px)')` listener for breakpoint changes
  - Rebuild DOM structure on resize (desktop two-row ↔ mobile compact)
  - Reset open states when switching between modes

### Phase 4: Header Block CSS (`header.css`)

- [ ] **4.1 Desktop layout styles (>=900px)**
  - Two-row flex layout for `.nav-wrapper`
  - **Row 1:** Logo left, utility links + search right, aligned center
  - **Row 2:** Nav items left (flex, gap), CTAs right
  - Full-width white background, subtle bottom border or shadow
  - Max-width container (1440px content area)

- [ ] **4.2 Desktop navigation item styles**
  - Font: 16px, bold 700, color `#1a1a1a`
  - Chevron down arrow (CSS pseudo-element or SVG) after items with dropdowns
  - Hover: text color change or underline
  - Active/expanded: blue color (`#135cb0`) + 3px bottom border bar

- [ ] **4.3 Desktop dropdown panel styles**
  - `position: absolute`, white background
  - `border-radius: 16px`, `box-shadow: rgba(0,0,0,0.1) 0 4px 8px`
  - `padding: 32px`, `min-width: ~280px`
  - Sub-links: vertical list, 14-16px font, padding between items
  - Hover effect on sub-links
  - Smooth open/close transition (optional fade or slide)

- [ ] **4.4 Desktop CTA button styles**
  - Pill shape: `border-radius: 315px`, height 48px
  - "Refer a Patient": `background-color: #135cb0`, white text, bold
  - "Donate Now": `background-color: #d11947`, white text, bold
  - Hover: slightly darker shade
  - `padding: 0 32px`, `font-size: 16px`

- [ ] **4.5 Desktop utility links & search styles**
  - Utility links: 14px, color `#4d4d4d`, separated by `|` dividers
  - Language link: with globe icon prefix
  - Search input: bordered, right-aligned magnifying glass, ~290px width

- [ ] **4.6 Mobile layout styles (<900px)**
  - Single-row header bar: logo left, search icon center, MENU button right
  - MENU button: bordered pill shape with hamburger icon + "MENU" text
  - CLOSE state: "X" icon + "CLOSE" text
  - Header bar: white background, height ~56px, sticky/fixed top

- [ ] **4.7 Mobile menu panel styles**
  - Full-width overlay below header bar
  - CTA buttons at top (full-width, stacked)
  - Nav sections as bordered accordion items
  - Expand/collapse chevron on right side of each section
  - Sub-links with left padding indent
  - Utility links and language link at bottom, centered
  - Smooth slide-down animation for menu open
  - Background overlay for menu backdrop

- [ ] **4.8 Transitions & animations**
  - Dropdown open/close: `opacity` + `transform` transition (~200ms)
  - Mobile menu: slide down animation
  - Accordion expand: `max-height` transition
  - Button hover: background-color transition (~150ms)

### Phase 5: Testing & Refinement

- [ ] **5.1 Desktop visual verification**
  - Compare header against original St. Jude site screenshot
  - Verify two-row layout, spacing, alignment
  - Test all 5 dropdown menus with correct sub-links
  - Verify CTA button colors, sizes, border-radius
  - Check search input styling

- [ ] **5.2 Mobile visual verification**
  - Compare mobile header against original screenshots
  - Test hamburger menu open/close
  - Verify CTA buttons in menu
  - Test all accordion sections expand/collapse
  - Verify utility links at bottom

- [ ] **5.3 Interaction testing**
  - Desktop: dropdown open/close on click
  - Desktop: click outside to close dropdown
  - Desktop: keyboard navigation (Tab, Enter, Escape)
  - Mobile: hamburger toggle
  - Mobile: accordion expand/collapse (multiple open allowed)
  - Mobile: body scroll lock when menu open
  - Search form submission
  - All links navigate correctly

- [ ] **5.4 Responsive breakpoint testing**
  - Smooth transition at 900px breakpoint
  - No layout glitches during resize
  - State resets properly when crossing breakpoints

- [ ] **5.5 Accessibility audit**
  - Proper `aria-expanded`, `aria-haspopup`, `aria-controls` attributes
  - Skip to main content link
  - Focus management (focus trap in mobile menu)
  - Screen reader-friendly navigation labels
  - Sufficient color contrast

---

## Files to Create/Modify

| File                       | Action  | Description                                                  |
| -------------------------- | ------- | ------------------------------------------------------------ |
| `styles/styles.css`        | Modify  | Add St. Jude design tokens, update nav height                |
| `styles/fonts.css`         | Modify  | Add Open Sans font declarations                              |
| `head.html`                | Modify  | Update font references if needed                             |
| `blocks/header/header.js`  | Rewrite | Full two-row header with dropdowns, mobile accordion, search |
| `blocks/header/header.css` | Rewrite | Complete restyling for St. Jude header UI                    |
| `content/nav.plain.html`   | Rewrite | Full navigation structure with all links                     |
| `icons/stjude-logo.svg`    | Create  | St. Jude logo SVG                                            |
| `icons/chevron-down.svg`   | Create  | Dropdown chevron icon                                        |
| `icons/close.svg`          | Create  | Close/X icon for mobile menu                                 |
| `icons/globe.svg`          | Create  | Language selector icon                                       |

---

## Execution Notes

- This plan requires **Execute mode** to implement. Switch out of Plan mode to begin development.
- The header block will be built incrementally: global styles first, then nav content, then JS logic, then CSS styling, with testing after each phase.
- The existing boilerplate header code will be fully replaced, not incrementally patched, since the St. Jude header structure differs significantly from the default EDS pattern.
