# Aditya Velpula — AI Engineer Portfolio

A living AI system experience. Not a resume. Not a template.

Built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Framer Motion**.

---

## What's inside

- **Cinematic preloader** — system boot sequence on first visit
- **Hero** with a canvas neural network that reacts to the cursor
- **Custom three-state cursor** (glow + dot + label) on desktop
- **Scroll-linked About** narrative with terminal "System Profile" card
- **DAPSE showcase** — 4-tab interactive: animated architecture diagram, cost slider, live query simulation, tech stack
- **Project modals** via Framer Motion shared-layout (`layoutId`)
- **Interactive skills neural graph** — canvas, drag, tooltips, category highlighting, synaptic pulses
- **Cost slider** and **odometer counters** for impact metrics
- **Magnetic buttons** with proximity physics
- **3D tilt cards** with cursor-tracking gradient
- **Dark / light mode** with persisted preference
- **Easter egg**: tap the `AV` logo 5 times

Accessibility, reduced-motion, keyboard nav, and responsive breakpoints are wired in.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve production build
```

Bundle: **~155 KB** gzipped (budget: < 180 KB).

---

## Structure

```
src/
├── app/                    layout, page, globals.css
├── components/
│   ├── canvas/            NeuralBackground, CursorSystem, SkillsGraph
│   ├── layout/            Navbar, Preloader, ThemeToggle, ScrollProgress, Footer
│   ├── sections/          Hero, About, Experience, DapseShowcase, DapseDiagram,
│   │                      DapseQuerySim, ExperienceCard, Projects, ProjectCard,
│   │                      ProjectModal, ProjectPreview, Skills, Certifications, Contact
│   └── ui/                GlassCard, MagneticButton, TiltCard, AnimatedCounter,
│                          TextReveal, TabSwitcher, Modal, CostSlider, Badge,
│                          SectionHeading
├── data/                  personal, experience, projects, skills, certifications
├── hooks/                 useMagnetic, useTilt, useTheme, useInView,
│                          useReducedMotion, useScrollVelocity, useMousePosition,
│                          useActiveSection
└── utils/                 math, animations, perlin, constants
```

---

## Editing content

- **Personal info + contact links**: `src/data/personal.js` (update the `links` object with your real email, LinkedIn, GitHub)
- **Experience (incl. DAPSE)**: `src/data/experience.js`
- **Projects**: `src/data/projects.js`
- **Skills graph**: `src/data/skills.js`
- **Certifications**: `src/data/certifications.js`

No other file needs to be touched for content changes.

---

## Design tokens

All colors, easings, and type scales live as CSS custom properties in
`src/app/globals.css`. Tailwind utilities reference them through
`tailwind.config.js`, so the whole site retints if you change a single variable.

---

## Notes

- The skills graph is a pure-canvas force-directed simulation (no D3).
- The neural background runs at 30fps with `requestAnimationFrame` frame-skipping.
- All motion respects `prefers-reduced-motion: reduce`.
- On mobile, expensive systems (custom cursor, canvas, tilt) are disabled automatically.

---

## Deploy

This repo is preconfigured for **Vercel**.

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. **Add New > Project**, import `aditya-velpula-portfolio`.
3. Leave defaults. Vercel reads `vercel.json` and `.npmrc` automatically:
   - Framework: Next.js
   - Install command: `npm install --legacy-peer-deps`
   - Build command: `next build`
   - Output: `.next`
4. Click **Deploy**. First build takes about 90 seconds.
5. Optional: Project > Settings > Domains, add a custom domain. Vercel
   issues SSL automatically.

Every `git push` to `main` triggers a production build. PRs get preview
URLs automatically.

The `--legacy-peer-deps` flag is required because `@react-three/fiber`
8.x and React 18 advertise mismatched peer ranges; the runtime works
fine, npm just refuses to install without the override.

## License

MIT, use this codebase freely.
