# bandhanpatel.dev — Portfolio

> Platform · Backend · Full-Stack Engineer

Personal portfolio and photography archive built as a working demonstration of platform engineering: IaC-provisioned CDN, CI/CD-automated deployments, and a Next.js SSR app wired together on AWS.

**Live site**: [bandhanpatel.dev](https://bandhanpatel.dev)

---

## Architecture

```text
┌──────────────────────────────────────────────────────────────────┐
│  GitHub (main)                                                   │
│    └─▶  AWS Amplify CI/CD                                        │
│           ├─  npm ci + npm run build  (Next.js 16 / Turbopack)   │
│           └─▶  Amplify Hosting  ──▶  CloudFront (app CDN)        │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  Terraform (separate, run locally)                               │
│    ├─  S3 bucket  (private, public access blocked)               │
│    ├─  CloudFront OAC  (sigv4, replaces legacy OAI)              │
│    └─▶  CloudFront CDN  ──▶  photos served at immutable TTL      │
│                                                                  │
│  NEXT_PUBLIC_PHOTO_CDN_URL env var injected at Amplify build     │
└──────────────────────────────────────────────────────────────────┘
```

**Key infrastructure decisions:**

- S3 bucket is private — only the CloudFront distribution can read it, scoped by `AWS:SourceArn` in the bucket policy
- CloudFront cache policy: `max-age=31536000, immutable` for photos; Amplify Hosting handles the app TTL
- `amplify.yml` contains the full build spec — the repo is the source of truth for how the site deploys

---

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 — App Router, TypeScript strict mode |
| Styling | Tailwind CSS v4, inline CSS custom properties for theming |
| Fonts | Rajdhani (headings), Geist Sans/Mono (body/labels) |
| Hosting | AWS Amplify — auto-deploy on push to `main` |
| Photo CDN | S3 + CloudFront via Terraform |
| IaC | Terraform (`terraform/`) |
| Build spec | `amplify.yml` |

---

## Project structure

```text
app/                  Next.js App Router pages
  page.tsx            Hero (/)
  about/              Profile + tech stack
  projects/           Operations log + [id] case studies
  experience/         Work history + [slug] case studies
  photography/        Flip-card photo archive with lightbox
  platform/           This site's own infrastructure — the meta page
  contact/

components/           All UI components
lib/
  data.ts             Single source of truth for all content
  photo-url.ts        Resolves photo paths to CDN URL in production
  theme.ts            Dark/light mode token definitions

terraform/            S3 + CloudFront for photo CDN
  main.tf
  variables.tf
  outputs.tf

scripts/
  upload-photos.sh    Sync photos to S3 + invalidate CloudFront cache

amplify/              Amplify Gen 2 backend config (empty backend)
amplify.yml           Amplify build spec
```

---

## Adding content

All content lives in [`lib/data.ts`](lib/data.ts) — no CMS. Edit the arrays directly:

- `projects[]` — project case studies with `{ situation, challenge, solution }` + metrics
- `experience[]` — work history with `projectRef` linking to related projects
- `photos[]` — photography archive with stories

### iPhone ProRAW → JPEG

```bash
# Via QuickLook (preserves ProRAW processing)
qlmanage -t -s 4032 -f 1 -o /tmp/ photo.DNG
sips -s format jpeg -s formatOptions 95 /tmp/photo.DNG.png --out public/photos/photo.jpg
```

### Photo CDN workflow

```bash
cd terraform && terraform init && terraform apply
./scripts/upload-photos.sh $(terraform output -raw bucket_name) \
                            $(terraform output -raw cloudfront_distribution_id)
# Set NEXT_PUBLIC_PHOTO_CDN_URL=$(terraform output -raw cdn_url) in Amplify env vars
```

---

## Dark / light mode

CSS custom properties are toggled via `ThemeProvider` using `element.style.setProperty` directly on `document.documentElement`. The approach bypasses Tailwind's `@layer` cascade, which would otherwise win over `[data-theme]` attribute selectors. Preference is persisted in `localStorage`.

---

## Built with Claude Code

This site was built iteratively with [Claude Code](https://claude.ai/code) as an engineering partner — not generated in one shot. The design decisions, content, case studies, and infrastructure choices are mine; Claude Code handled implementation, caught bugs, and suggested approaches. Human-in-the-loop throughout.

---

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npx tsc --noEmit     # type check
```

---

## License

**Code** is MIT licensed — see [LICENSE](LICENSE).

**Content and photography** (case studies, biographical text, all photos) are © 2026 Bandhan Patel, all rights reserved. They may not be reproduced without permission.
