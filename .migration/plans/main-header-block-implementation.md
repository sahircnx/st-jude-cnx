# Main Header Block Implementation Plan

## Overview
Create a new `main-header` block that replicates the St. Jude Children's Research Hospital website header, including its two-row layout, navigation with dropdowns, search bar, utility links, CTA buttons, and responsive mobile behavior.

---

## Header Structure Analysis (from stjude.org)

### Desktop Layout (≥900px)
The header has **two rows**:
1. **Top bar**: Logo (left) | Utility links: Careers, Contact Us, Español | Search input with icon (right)
2. **Nav bar**: Nav items with dropdown chevrons (About Us, Care & Treatment, Research, Training, Support & Fundraising) | CTA buttons: "Refer a Patient" (blue pill) + "Donate Now" (red pill)

### Mobile Layout (<900px)
- Single row: Logo (left) | Search bar (center) | Hamburger "MENU" button (right)
- Opens full-screen overlay with: CTA buttons, accordion nav items, Español link, utility links

### Key Design Tokens
| Token                    | Value                                                                  |
| ------------------------ | ---------------------------------------------------------------------- |
| Background               | White (`#fff`)                                                         |
| Nav font                 | "SJ Sans", "Open Sans", Helvetica, Arial, sans-serif (~18px, black)    |
| Utility link color       | `rgb(77, 77, 77)` / 14px                                               |
| "Refer a Patient" button | `rgb(19, 92, 176)` blue, white text, pill shape (border-radius ~315px) |
| "Donate Now" button      | `rgb(209, 25, 71)` red/crimson, white text, pill shape                 |
| Header height            | ~136px (desktop, both rows)                                            |
| Dropdown                 | White background, subtle shadow, list of links                         |

### Navigation Data (5 top-level sections)
1. **About Us** → About Us, Our History, Our Stories, Our Unique Operating Model, Why Support St. Jude?, Visit, Strategic Plan, St. Jude Global, Newsroom, FAQs
2. **Care & Treatment** → Care & Treatment, Diseases Treated, Patient Referrals, Online Referral Form, Open Clinical Trials, Patients & Families, Affiliate Program
3. **Research** → Research, Why St. Jude, Departments, Labs, Clinical Research, Research Faculty, Centers & Initiatives, Our Progress, Scientific Report, Research Careers
4. **Training** → Training, Advanced Training, Predoctoral Training, Scientific Trainee Support, Clinical Trainee Support, St. Jude Graduate School of Biomedical Sciences, Seminars & Symposia
5. **Support & Fundraising** → Support & Fundraising, Ways to Give, Events & Fundraisers, Gift Shop, Volunteer

---

## Implementation Plan

### Step 1: Create Block Directory
- Create `/workspace/blocks/main-header/` directory
- Files: `main-header.js`, `main-header.css`

### Step 2: Create Content (nav HTML)
- Create a nav content file at `/workspace/content/main-nav.html` that provides the block's content structure
- Structure: 3 sections (brand/logo, nav sections with nested lists, tools/CTAs)

### Step 3: Implement `main-header.js`
The JavaScript decoration logic:
- [ ] Load nav fragment from `/main-nav` path (or metadata override)
- [ ] Build two-row header structure:
  - **Row 1 (top bar)**: Logo | Utility links (Careers, Contact Us, Español) | Search bar
  - **Row 2 (nav bar)**: Nav items with dropdown toggles | CTA buttons (Refer a Patient, Donate Now)
- [ ] Add dropdown toggle behavior for each nav section (click to open/close on desktop)
- [ ] Add chevron indicators on nav items
- [ ] Add search input with search icon button
- [ ] Implement mobile hamburger menu with:
  - Full-screen overlay
  - Accordion-style nav sections
  - CTA buttons at top of overlay
  - Close button (X CLOSE)
- [ ] Handle escape key to close dropdowns/mobile menu
- [ ] Handle focus management for accessibility
- [ ] Handle window resize transitions between mobile/desktop
- [ ] Close dropdown when clicking outside

### Step 4: Implement `main-header.css`
- [ ] **Top bar styles**: flex layout, utility links with separator pipes, search input with border
- [ ] **Nav bar styles**: flex layout, nav items spaced evenly, CTA pill buttons
- [ ] **Dropdown panel styles**: absolute positioned, white bg, shadow, link list
- [ ] **Mobile styles** (<900px):
  - Hamburger button with "MENU" / "CLOSE" text
  - Full-screen overlay
  - Accordion sections with expand/collapse chevrons
  - CTA buttons (full-width, stacked)
  - Español link with language icon
- [ ] **Color variables**: Define St. Jude brand colors (blue `#135cb0`, red/crimson `#d11947`)
- [ ] **Typography**: Font family matching St. Jude ("Open Sans" as available fallback)
- [ ] **Sticky/fixed behavior**: Header stays at top on scroll
- [ ] **Transitions**: Smooth dropdown open/close, mobile menu slide

### Step 5: Add Logo Asset
- [ ] Download or reference the St. Jude logo SVG/image for the brand section

### Step 6: Wire Up the Block
- [ ] Ensure the block auto-loads when `main-header` is used in page content
- [ ] Test on the local preview server at desktop and mobile widths

---

## Checklist

- [ ] Create `/workspace/blocks/main-header/` directory
- [ ] Create `main-header.js` with full decoration logic
  - [ ] Fragment loading for nav content
  - [ ] Two-row desktop layout (top bar + nav bar)
  - [ ] Dropdown menus for 5 nav sections
  - [ ] Search bar with icon
  - [ ] Utility links (Careers, Contact Us, Español)
  - [ ] CTA buttons (Refer a Patient, Donate Now)
  - [ ] Mobile hamburger menu with accordion nav
  - [ ] Keyboard accessibility (Escape, focus trap)
  - [ ] Responsive resize handling
- [ ] Create `main-header.css` with complete styling
  - [ ] Desktop two-row layout
  - [ ] Navigation dropdown panels
  - [ ] Pill-shaped CTA buttons (blue + red)
  - [ ] Search input styling
  - [ ] Mobile full-screen overlay menu
  - [ ] Accordion expand/collapse animations
  - [ ] Sticky header behavior
  - [ ] St. Jude brand colors and typography
- [ ] Create nav content HTML file with all navigation data
- [ ] Add logo asset
- [ ] Test desktop layout on preview
- [ ] Test mobile layout on preview
- [ ] Test dropdown interactions
- [ ] Test mobile menu open/close
- [ ] Verify accessibility (keyboard navigation, ARIA attributes)

---

## Notes
- This is a **new custom block**, not a modification of the existing `header` block
- The existing `header` block uses the standard EDS nav pattern; `main-header` will be a more complex, St. Jude-specific implementation
- The block follows EDS patterns: loads content from a fragment, decorates the DOM in JS, styles with CSS
- Execution requires switching out of Plan mode
