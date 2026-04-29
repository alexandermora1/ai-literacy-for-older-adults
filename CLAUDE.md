CLAUDE.md – AI Literacy Learning Platform for Older Adults
Project Overview
A web-based, self-paced learning platform teaching AI literacy to Norwegian adults aged 60+. Built as a master's thesis in collaboration with Seniornett Norge.
Primary device: Tablet landscape
Supported devices: Tablet portrait, mobile
Deployment: GitHub Pages
UI language: Norwegian (bokmål) throughout — all user-facing text, labels, and aria attributes
 
Stack
•	React with TypeScript
•	Vite as build tool
•	CSS Modules or plain CSS — no utility-first frameworks
•	No external component libraries unless explicitly approved
 
Design System
Color Palette
Token	Hex	Usage
--color-primary	#215A41	Green primary — button bottom, highlights, active states
--color-primary-light	#5A9F7D	Green light — button top (gradient start)
--color-purple	#4A3A80	Purple secondary — button bottom, purple-themed elements
--color-purple-light	#6B5BA6	Purple light — button top (gradient start)
--color-bg-green	#CFFBE3	Green box background
--color-bg-purple	#F3F0FF	Purple box background
--color-text	#1A1A1A	Body text
--color-white	#FFFFFF	White background / contrast
Button Gradients
Buttons use a top-to-bottom gradient. Always use the CSS variables, never hardcode hex values.
/* Green button */
background: linear-gradient(to bottom, #5A9F7D, #215A41);

/* Purple button */
background: linear-gradient(to bottom, #6B5BA6, #4A3A80);
Contrast note: Verify that white button text meets 4.5:1 against the darker end of the gradient (#215A41 and #4A3A80). The lighter end (#5A9F7D) alone does not pass — always test against the full gradient range.

Typography
•	Always use rem for font sizes — never px
•	Minimum body text size: 1rem (equivalent to 16px at default zoom)
•	Headings: 1.5rem and above
•	Reason: Required for WCAG 1.4.4 — users with enlarged system text (very common in the 60+ target group)
Sizing and Spacing
•	Touch targets: minimum 44px × 44px (WCAG 2.5.5)
•	Use rem or % for spacing where possible
•	Avoid fixed px values for layout
 
Responsive Design
Figma designs exist for three layouts. All three must be implemented:
Breakpoint	Device	Mode
min-width: 1024px and orientation: landscape	Tablet landscape	Default / primary
min-width: 600px and orientation: portrait	Tablet portrait	Secondary
max-width: 599px	Mobile	Third priority
/* Mobile: base styles (no media query) */

@media (min-width: 600px) and (orientation: portrait) {
  /* Tablet portrait */
}

@media (min-width: 1024px) and (orientation: landscape) {
  /* Tablet landscape — primary layout */
}
When reading from Figma: always treat the landscape tablet frame as the primary reference.
 
Accessibility Requirements (WCAG 2.1 AA)
Mandatory rules — never skipped
•	Contrast ratio: Minimum 4.5:1 for all text. Verify using hex values from the palette above.
•	rem for font sizes: Never px (see Typography above)
•	Norwegian aria-labels: All interactive elements must have a Norwegian aria-label
•	Focus management: All interactive elements must have a visible focus indicator
•	Touch targets: Minimum 44×44px for all clickable/tappable elements
•	No information conveyed by color alone: Always use text or an icon in addition
Aria-label examples (Norwegian)
<button aria-label="Gå til neste emne">Neste</button>
<button aria-label="Sjekk svaret ditt">Sjekk svar</button>
<nav aria-label="Fremdrift i kurset">...</nav>
<input aria-label="Skriv inn svaret ditt" />
Progress bars
For progress bars without visible text: use role="progressbar" with aria-valuenow, aria-valuemin, and aria-valuemax. Add white fill + 2px dark outline to satisfy WCAG 1.4.11 (Non-text Contrast).
 
Norwegian Terminology
These terms are binding throughout the entire codebase and all UI text:
Use	Do not use
KI	AI, A.I.
emne	leksjon, lesson, topic
kapittel	modul, module
aktivitet	oppgave (for interactive exercises)
quiz	test, prøve
fremgang	progress
 
Course Structure
•	5 kapitler, each with ~6 short emner
•	Each emne ends with a quiz
•	Stars/points based on quiz performance
•	Progress map with a step-by-step path
•	Badges for milestones (emne completion, kapittel completion)
Kapittel names
1.	Introduksjon til KI
2.	Bygge selvtillit med KI
3.	KI i smarthjem
4.	Generativ KI
5.	Hold deg trygg med KI
 
Component Conventions
File structure
src/
  components/
    [ComponentName]/
      [ComponentName].tsx
      [ComponentName].module.css
  pages/
  hooks/
  types/
  utils/
Component rules
•	Functional components with TypeScript — never class components
•	Props must have explicit TypeScript types (no any)
•	Export as named exports, not default exports where possible
•	Every interactive element: always include aria attributes
CSS rules
•	Use CSS variables from the design system (see Color Palette above)
•	Define variables in :root in a global variables.css
•	Never hardcode hex values directly in component CSS — use variable references
•	Never use px for font sizes
 
What Claude Code Should Do When Reading Figma
1.	Describe the layout before writing any code
2.	Identify the breakpoint — which Figma frame is this (landscape / portrait / mobile)?
3.	Check contrast ratios — flag any color combinations that don't meet 4.5:1
4.	Use design system tokens — do not hardcode colors
5.	Add Norwegian aria-labels to all interactive elements, even if Figma doesn't show them
6.	Ask when layout intent is unclear — do not guess
 
What Claude Code Must Not Do
•	Use px for font sizes
•	Hardcode hex color values in component CSS
•	Add external library components without asking first
•	Write English UI text
•	Write English aria-labels
•	Assume mobile is the primary layout
•	Skip responsive implementation — all components must support all three breakpoints
 
Running the Project
npm install
npm run dev       # Development server
npm run build     # Production build
npm run preview   # Preview production build
 
Claude Code Session Notes
•	Run /compact manually between major tasks to avoid losing context mid-session
•	Use @-mentions to reference specific files when refactoring
•	When generating a new component from Figma: always start with one component, confirm it looks correct, then continue

