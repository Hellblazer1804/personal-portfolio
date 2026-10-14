# Bandhan Patel — Portfolio

Personal portfolio and photography archive. Built with Next.js 16 App Router, styled with a custom Abstergo-inspired dark UI (electric blue accents, dot grid, scan lines, Rajdhani headings, corner bracket cards).

Live at: **[bandhanpatel.dev]** · Deployed on AWS Amplify

---

## Pages

| Route | Description |
| --- | --- |
| `/` | Hero landing — name, title, stats |
| `/about` | Subject profile — bio, education, certs, tech stack |
| `/projects` | Operations log — project list linking to case studies |
| `/projects/[id]` | Full case study: Situation / Challenge / Solution + metrics |
| `/experience` | Operative history — work timeline |
| `/experience/[slug]` | Full experience case study |
| `/photography` | Visual archive — 15 photos with 3D flip-card stories |
| `/contact` | Contact page |

---

## Stack

- **Framework** — Next.js 16 (App Router, Turbopack)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4, inline styles for design system tokens
- **Fonts** — Rajdhani (headings), Geist Sans (body), Geist Mono (labels)
- **Animations** — CSS 3D transforms (flip cards), Framer Motion (available)
- **Type animation** — `react-type-animation`
- **Deployment** — AWS Amplify

---

## Project Structure

```text
app/
  page.tsx                  # Hero (/)
  about/page.tsx            # Profile (/about)
  projects/
    page.tsx                # Projects list (/projects)
    [id]/page.tsx           # Case study (/projects/[id])
  experience/
    page.tsx                # Timeline (/experience)
    [slug]/page.tsx         # Case study (/experience/[slug])
  photography/page.tsx      # Photo gallery (/photography)
  contact/page.tsx          # Contact (/contact)
  layout.tsx                # Root layout — Navigation + Footer
  globals.css               # Design system: colors, scan lines, dot grid

components/
  Navigation.tsx            # Top nav with active-route highlighting
  Hero.tsx                  # Landing section with TypeAnimation
  About.tsx                 # Bio, education, certs, callouts
  Stack.tsx                 # Tech skill groups
  Projects.tsx              # Project card list
  Experience.tsx            # Work history with expandable highlights
  Contact.tsx               # Contact CTA
  Photography.tsx           # Flip-card photo gallery
  Footer.tsx                # Status bar footer

lib/
  data.ts                   # All content: personal info, projects,
                            # experience, education, certs, photos

public/
  photos/                   # Web-ready JPEGs (DNG originals excluded via .gitignore)
```

---

## Content

All content lives in [`lib/data.ts`](lib/data.ts). No CMS — edit the arrays directly.

### Adding a project

```ts
// lib/data.ts → projects[]
{
  id: "my-project",           // used in /projects/[id] URL
  title: "Project Name",
  subtitle: "One-liner description",
  badge: "Label",
  badgeColor: "#0099ff",
  caseStudy: {
    situation: "...",
    challenge: "...",
    solution: "...",
  },
  metrics: [
    { value: "99%", label: "Uptime" },
  ],
  highlights: ["..."],
  stack: ["TypeScript", "Kubernetes"],
  github: "https://github.com/...",  // or null
  paper: false,
}
```

### Adding an experience entry

```ts
// lib/data.ts → experience[]
{
  company: "Company Name",
  slug: "company-name",       // used in /experience/[slug] URL
  role: "Your Role",
  period: "Jan 2024 – Present",
  location: "City, ST",
  caseStudy: { situation, challenge, solution },
  highlights: ["..."],
  stack: ["Python", "GKE"],
}
```

### Adding a photo

1. Drop the JPEG into `public/photos/`
2. Add an entry to `photos[]` in `lib/data.ts`:

```ts
{
  id: "photo-id",
  src: "/photos/filename.jpg",
  title: "Title",
  location: "Place, State",
  date: "Month Year",
  story: "The story behind this photo...",
  tags: ["tag1", "tag2"],
}
```

**iPhone ProRAW (DNG) → JPEG conversion:**

```bash
# Single file via QuickLook (preserves ProRAW processing)
qlmanage -t -s 4032 -f 1 -o /tmp/ photo.DNG
sips -s format jpeg -s formatOptions 95 /tmp/photo.DNG.png --out photo.jpg

# Or: open in Preview.app → File → Export as JPEG (same pipeline)

# Avoid: sips directly on DNG — flat colors, incorrect tone mapping
```

DNG originals are excluded from git (see `.gitignore`). Only JPEGs are committed.

---

## Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npx tsc --noEmit  # type check
```

---

## Design System

The Abstergo aesthetic is driven by CSS variables and inline style tokens — no separate theme file. Key values used throughout components:

| Token | Value | Use |
| --- | --- | --- |
| Background | `#010208` | Page bg |
| Surface | `#040c18` | Card bg |
| Border | `#0c2040` | Default borders |
| Border active | `#1a4888` | Hover/focus borders |
| Blue | `#0077ee` | Primary accent |
| Blue bright | `#0099ff` | Glow, highlights |
| Text bright | `#c0d8f4` | Headings |
| Text base | `#5888aa` | Body copy |
| Text dim | `#2a4a6a` | Labels, metadata |

Scan lines and dot grid are applied globally via `body::after` and `body` background-image in `globals.css`.
