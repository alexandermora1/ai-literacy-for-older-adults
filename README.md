# SeniorKI

A free, self-paced AI literacy course for Norwegian adults aged 60+. Live at [seniorki.no](https://seniorki.no).

Built as a master's thesis project (ACIT5900) at OsloMet, in collaboration with [Seniornett Norge](https://www.seniornett.no).

---

## About

SeniorKI introduces older adults to artificial intelligence through a structured, accessible course in Norwegian (bokm√•l). The course is based on Kaur et al.'s AI literacy curriculum framework adapted for older adult learners. It runs entirely in the browser ‚Äî no login, no account, no data collection.

## Course Structure

Five modules (kapitler), 14 topics (emner) in total:

1. Introduksjon til KI
2. Bygge selvtillit med KI
3. Generativ KI
4. KI i smarthjem
5. Hold deg trygg med KI

Each topic ends with a short quiz. Progress is tracked locally in the browser using localStorage.

## Design and Research Methodology

SeniorKI was developed using a User-Centred Design (UCD) process, following iterative cycles of design, development, and testing with participants from the target group. The process prioritised real user feedback over assumptions about what older adults need from a digital learning tool.

### Iteration 1 ‚ Paper sketches and Figma prototype

The first iteration started with hand-drawn sketches to explore layout and navigation ideas without committing to any implementation. These were developed into an interactive Figma prototype covering the core course flow. Five older adult participants completed think-aloud usability testing sessions, which surfaced early navigation issues and informed the design direction going forward.

### Iteration 2 ‚ Refined Figma prototype and coded implementation

Based on findings from Iteration 1, the Figma prototype was revised and a working React implementation was built. Three participants took part in think-aloud usability testing of the coded prototype. Key findings from this round ‚Äî including persistent confusion around the terminology used for course sections ‚Äî were documented and fed directly into the next design iteration.

### Iteration 3 ‚ Summative evaluation

The final iteration involved a longitudinal study with approximately 12 volunteer participants recruited through Seniornett Norge. Participants completed the full course independently on the live site. Pre- and post-course knowledge tests (multiple choice) and a System Usability Scale (SUS) questionnaire were used to measure learning outcomes and perceived usability. The study was conducted in accordance with Norwegian research ethics requirements and approved by Sikt.

## Tech Stack

- React with TypeScript
- Vite
- Plain CSS with CSS custom properties (no utility frameworks)
- GitHub Pages with a custom domain

No backend. No cookies. No external analytics.

## Running Locally

```bash
npm install
npm run dev
```

The development server starts at `http://localhost:5173`.

## Building and Deploying

```bash
npm run build
```

The output goes to `dist/`. Deployment is handled through GitHub Pages. The custom domain `seniorki.no` is configured via a `CNAME` file in the `public/` directory.

## Accessibility

The interface targets WCAG 2.1 AA compliance:

- Tablet landscape is the primary layout; tablet portrait and mobile are also supported
- Font sizes use `rem` throughout (never `px`) to respect user system text settings
- All interactive elements have Norwegian `aria-label` attributes
- Touch targets meet the 44√ó44px minimum
- Color contrast ratios verified against the AA 4.5:1 threshold

## Privacy

No personal data is collected. No tracking scripts are loaded. User progress is stored only in the user's own browser via `localStorage` and is never transmitted anywhere.


