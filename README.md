# Portfolio

My updated portfolio showcasing my product design, full-stack development, and engineering work. 

**Stack:** React · JavaScript · CSS · Framer Motion · Resend · Cloudflare Pages Functions

---

## Design

The visual system is built without any CSS framework. Every token is defined in a `:root` block using CSS custom properties, giving complete control over the design language.

- **Theme** 
Deep black background with a teal-to-cyan accent gradient, glow effects via `box-shadow`, and subtle border treatments inspired by Resend's aesthetic
- **Typography** 
Instrument Sans for UI copy + JetBrains Mono for code/technical text; fluid sizing throughout using `clamp()` so nothing snaps at breakpoints
- **Motion** 
Framer Motion drives all entrance animations, sidebar transitions, and scroll-triggered reveals. Staggered delays to give the page a layered, considered feel
- **Gradient Borders** 
SVG `<rect>` elements with `linearGradient` stroke on the primary CTA button. A pure CSS/SVG technique that avoids the typical `border-image` limitations
- **Sidebar**
Collapsible navigation that transitions between a 4rem icon rail and a 14rem labelled panel, with smooth label fade-in on expand

---

## Development

Built as a single-page app with React Router's hash-link navigation for smooth in-page scrolling.

```
functions/
└── api/
    └── contact.js       # Cloudflare Pages Function; sends via Resend
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

- **Typewriter effect**
Custom `useEffect` hook that cycles between role titles ("Product Designer" / "Software Developer" / "Engineer") with variable timing: 80ms per character added, 40ms per character deleted, 1.8s pause between cycles
- **Scroll animations**
Framer Motion `whileInView` with `once: true` on every major section. Individual list items stagger at `i * 0.03s` for a ripple feel
- **Form state machine**
Contact form tracks idle, sending, success, and error states, with a rotating SVG spinner during submission and inline success/error feedback
- **Resend integration**
The form POSTs to `/api/contact`, a Cloudflare Pages Function that calls Resend's REST API. The key stays on the server — unlike EmailJS's public key, a Resend key is a full-privilege secret, and Resend rejects browser-origin requests outright. The function validates and length-caps every field, escapes the message into the HTML body, and sets `reply_to` to the visitor so a reply in the inbox reaches them directly. It calls the API with `fetch` rather than the `resend` SDK: the SDK eagerly imports a MIME parser and webhook verifier this never uses, and declares `engines.node >= 20` — needless weight and Node-compat risk on the Workers runtime

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
                                  │ POST /api/contact
                                  ▼
                    ┌──────────────────────────┐
                    │ functions/api/contact.js │
                    │ (Cloudflare Pages fn)    │
                    └────────────┬─────────────┘
                                 │ fetch · RESEND_API_KEY
                                 ▼
                         ┌────────────────┐
                         │   Resend API   │
                         └────────────────┘

Data flow
─────────────────────────────────────────────
.dev.vars (local)   ─┐
Pages dashboard (prod)├─►  env.RESEND_API_KEY
                     ─┘      └──►  functions/api/contact.js
                                   (server only · never bundled)
App.js  ──►  isSidebarOpen  ──►  Sidebar.js
                                 (prop · no global store)

Styling layer
─────────────────────────────────────────────
App.css (:root tokens)
  └──  colors · spacing · radii · shadows
         └──  consumed by all components
              via var(--token-name)
```

- **Design system via CSS variables**
All colours, spacing, radii, and shadows are tokens. Changing the accent colour is a one-line edit in `:root`
- **Minimal state surface**
App-level state is only the sidebar toggle boolean; everything else is local to the component that owns it
- **Fluid responsive layout**
`clamp()` for typography, flexbox for layout; no media query walls, no layout shifts at arbitrary breakpoints
- **Accessibility**
Semantic HTML throughout, explicit `aria-hidden` on decorative SVGs, visible focus styles
- **Environment config**
`RESEND_API_KEY` lives in `.dev.vars` locally and in the Pages dashboard in production — both gitignored or off-repo, and never in `.env`. The Workers runtime doesn't read `.env` anyway, and a `REACT_APP_` prefix is precisely what would inline the secret into the public bundle
- **Performance**
React's default lazy image loading, `whileInView` defers animation work until elements are visible, no unnecessary re-renders from stable state shape

---

## Running locally

```bash
npm install
cp .dev.vars.example .dev.vars   # add your Resend API key
npm start
```

`npm start` runs both halves at once via `concurrently`:

| Process | Port | Serves |
|---|---|---|
| `react-scripts start` | 3000 | the app, with hot reload |
| `wrangler pages dev`  | 8788 | `functions/` on the real Workers runtime |

The `"proxy"` field in `package.json` points the CRA dev server at 8788, so
anything it can't serve itself — i.e. `/api/*` — is forwarded to the Pages
Function. The contact form works locally with hot reload intact, and Wrangler
picks the API key up from `.dev.vars` automatically.

Wrangler is pointed at `public` purely because it wants a static directory;
CRA serves the actual app, and `functions/` is discovered from the project root
either way. Run either half alone with `npm run dev:api`, or preview a real
production build the way Cloudflare will serve it:

```bash
npm run preview   # build, then wrangler pages dev build
```

In production the key is set under **Workers & Pages → the project → Settings →
Variables and Secrets**, added as a **Secret** (encrypted) rather than plaintext.

Build for production:

```bash
npm run build
```
