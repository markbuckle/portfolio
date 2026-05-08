# Portfolio — Mark Buckle

My updated portfolio showcasing my product design, full-stack development, and engineering work. 

**Stack:** React · Framer Motion · EmailJS · Pure CSS

---

## Design

The visual system is built without any CSS framework — every token is defined in a `:root` block using CSS custom properties, giving complete control over the design language.

- **Theme** — Deep black background with a teal-to-cyan accent gradient (`#00e5a0` → `#00d4ff`), glow effects via `box-shadow`, and subtle border treatments inspired by Resend's aesthetic
- **Typography** — Instrument Sans for UI copy + JetBrains Mono for code/technical text; fluid sizing throughout using `clamp()` so nothing snaps at breakpoints
- **Motion** — Framer Motion drives all entrance animations, sidebar transitions, and scroll-triggered reveals; staggered delays give the page a layered, considered feel
- **Gradient Borders** — SVG `<rect>` elements with `linearGradient` stroke on the primary CTA button — a pure CSS/SVG technique that avoids the typical `border-image` limitations
- **Sidebar** — Collapsible navigation that transitions between a 4rem icon rail and a 14rem labelled panel, with smooth label fade-in on expand

---

## Development

Built as a single-page app with React Router's hash-link navigation for smooth in-page scrolling.

```
src/
├── components/
│   ├── Hero.js          # Typewriter hook, animated headline
│   ├── Sidebar.js       # Collapsible nav, profile, social links
│   ├── DesignWork.js    # Project case studies with live links
│   ├── Skills.js        # Animated skill chip grid (3 categories)
│   └── Contact.js       # Controlled form with async email sending
├── App.js               # Layout shell, sidebar state
└── App.css              # Full design system (CSS variables, globals)
```

- **Typewriter effect** — Custom `useEffect` hook that cycles between role titles ("Product Designer" / "Software Developer") with variable timing: 80ms per character added, 40ms per character deleted, 1.8s pause between cycles
- **Scroll animations** — Framer Motion `whileInView` with `once: true` on every major section; individual list items stagger at `i * 0.03s` for a ripple feel
- **Form state machine** — Contact form tracks `idle | sending | success | error` states, with a rotating SVG spinner during submission and inline success/error feedback
- **EmailJS integration** — Serverless email delivery; credentials stored in `.env` and never committed

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                          App.js                             │
│              (layout shell · sidebar state)                 │
│                                                             │
│  ┌──────────────┐   ┌─────────────────────────────────────┐ │
│  │  Sidebar.js  │   │           Page Sections             │ │
│  │              │   │                                     │ │
│  │  Nav links   │   │  Hero ──── typewriter hook          │ │
│  │  Profile     │   │  About                              │ │
│  │  GitHub      │   │  DesignWork ── project case studies │ │
│  │  LinkedIn    │   │  Skills ──── animated chip grid     │ │
│  └──────────────┘   │  Contact ─┐                         │ │
│                     │           │                         │ │
│                     └───────────┼─────────────────────────┘ │
└─────────────────────────────────┼───────────────────────────┘
                                  │ EmailJS SDK
                                  ▼
                         ┌────────────────┐
                         │  EmailJS API   │
                         │ (serverless)   │
                         └────────────────┘

Data flow
─────────────────────────────────────────────
.env  ──►  REACT_APP_* keys  ──►  Contact.js
App.js  ──►  isSidebarOpen  ──►  Sidebar.js
                                 (prop · no global store)

Styling layer
─────────────────────────────────────────────
App.css (:root tokens)
  └──  colors · spacing · radii · shadows
         └──  consumed by all components
              via var(--token-name)
```

- **Design system via CSS variables** — All colours, spacing, radii, and shadows are tokens. Changing the accent colour is a one-line edit in `:root`
- **Minimal state surface** — App-level state is only the sidebar toggle boolean; everything else is local to the component that owns it
- **Fluid responsive layout** — `clamp()` for typography, flexbox for layout; no media query walls, no layout shifts at arbitrary breakpoints
- **Accessibility** — Semantic HTML throughout, explicit `aria-hidden` on decorative SVGs, visible focus styles
- **Environment config** — Sensitive keys in `.env` (gitignored); the build inlines only what Create React App's `REACT_APP_` prefix whitelists
- **Performance** — React's default lazy image loading, `whileInView` defers animation work until elements are visible, no unnecessary re-renders from stable state shape

---

## Running locally

```bash
npm install
cp .env.example .env   # add your EmailJS keys
npm start
```

Build for production:

```bash
npm run build
```
