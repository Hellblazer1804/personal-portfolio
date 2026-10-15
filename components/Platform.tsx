"use client";

function Brackets({ color = "#0077ee44" }: { color?: string }) {
  return (
    <>
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: color }} />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: color }} />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: color }} />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: color }} />
    </>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const pipeline = [
  {
    id: "github",
    label: "GitHub",
    sublabel: "Source Control",
    color: "#c0d8f4",
    detail: "Main branch — push triggers Amplify CI",
  },
  {
    id: "amplify-ci",
    label: "Amplify CI",
    sublabel: "Build Pipeline",
    color: "#0099ff",
    detail: "npm ci → npm run build (Next.js 16 + Turbopack)",
  },
  {
    id: "nextjs",
    label: "Next.js 16",
    sublabel: "SSR Build",
    color: "#4ade80",
    detail: "App Router, TypeScript, Tailwind CSS v4",
  },
  {
    id: "cloudfront",
    label: "CloudFront",
    sublabel: "Amplify Hosting CDN",
    color: "#f59e0b",
    detail: "Global CDN — serves the Next.js app",
  },
];

const infraStack = [
  {
    name: "AWS Amplify",
    badge: "Hosting + CI/CD",
    badgeColor: "#0099ff",
    description:
      "Amplify detects every push to main and triggers a full build. The build spec (amplify.yml) runs npm ci and npm run build, then Amplify deploys the Next.js output behind CloudFront automatically. No manual deploy steps.",
    details: [
      "Auto-deploy on push to main",
      "Build spec: amplify.yml",
      "Next.js SSR support via Amplify Hosting",
      "Environment variables for CDN URL injection",
    ],
  },
  {
    name: "Terraform",
    badge: "Infrastructure as Code",
    badgeColor: "#a78bfa",
    description:
      "The photo CDN infrastructure is provisioned with Terraform: a private S3 bucket and a CloudFront distribution connected via Origin Access Control (OAC). The bucket is never publicly accessible — CloudFront is the only allowed reader, scoped by AWS:SourceArn in the bucket policy.",
    details: [
      "S3 bucket: private, public access fully blocked",
      "CloudFront OAC: sigv4 signing, replaces legacy OAI",
      "Bucket policy: scoped to CloudFront distribution ARN",
      "1-year immutable cache TTL, brotli + gzip compression",
      "PriceClass_100: US, Canada, Europe",
    ],
  },
  {
    name: "S3 + CloudFront CDN",
    badge: "Photo Delivery",
    badgeColor: "#00aa44",
    description:
      "Portfolio photos are stored in S3 and served via a dedicated CloudFront distribution, separate from the app hosting. This keeps large binary assets out of the deployment pipeline while giving photos their own long-lived cache headers (max-age=31536000, immutable).",
    details: [
      "Photos uploaded via scripts/upload-photos.sh",
      "Cache-Control: public, max-age=31536000, immutable",
      "CloudFront invalidation on re-upload",
      "NEXT_PUBLIC_PHOTO_CDN_URL injected at build time",
    ],
  },
  {
    name: "Next.js 16",
    badge: "Framework",
    badgeColor: "#4ade80",
    description:
      "App Router with per-route server and client components. Dynamic case study routes (/projects/[id] and /experience/[slug]) are server components that resolve params and pass them to client content components. Turbopack handles local development. Rajdhani + Geist fonts via next/font.",
    details: [
      "App Router: server components by default",
      "Dynamic routes: instant = false for params resolution",
      "Turbopack: local dev HMR",
      "next/font: Rajdhani (headings), Geist Sans/Mono",
      "TypeScript strict mode throughout",
    ],
  },
];

const techGrid = [
  { name: "AWS Amplify", category: "Hosting" },
  { name: "CloudFront", category: "CDN" },
  { name: "S3", category: "Storage" },
  { name: "Terraform", category: "IaC" },
  { name: "Next.js 16", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS v4", category: "Styling" },
  { name: "Turbopack", category: "Bundler" },
  { name: "GitHub", category: "Source Control" },
  { name: "Rajdhani", category: "Typography" },
  { name: "Framer Motion", category: "Animation" },
  { name: "react-type-animation", category: "UI" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Platform() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#0077ee" }}>
            SYSTEM ARCHITECTURE
          </span>
          <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #0077ee33, transparent)" }} />
        </div>

        <h2
          className="font-bold uppercase tracking-wide mb-3"
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            color: "#c0d8f4",
            textShadow: "0 0 20px rgba(0,119,238,0.2)",
          }}
        >
          How This Was Built
        </h2>
        <p className="font-mono text-sm mb-12 max-w-2xl" style={{ color: "#2a4a6a" }}>
          The portfolio itself is a working demonstration of platform engineering — IaC-provisioned CDN,
          CI/CD-automated deployments, and a Next.js SSR app wired together with Terraform and AWS Amplify.
        </p>

        {/* Deployment pipeline */}
        <div className="mb-14">
          <p className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: "#1a3a5a" }}>
            DEPLOYMENT PIPELINE
          </p>
          <div className="flex flex-col sm:flex-row items-stretch gap-0">
            {pipeline.map((step, i) => (
              <div key={step.id} className="flex sm:flex-col items-center flex-1">
                {/* Node */}
                <div
                  className="relative flex-1 sm:flex-none p-4 w-full"
                  style={{ backgroundColor: "#040c18", border: `1px solid ${step.color}33` }}
                >
                  <Brackets color={step.color + "44"} />
                  <p
                    className="font-bold uppercase tracking-wide text-sm"
                    style={{ fontFamily: "var(--font-rajdhani)", color: step.color }}
                  >
                    {step.label}
                  </p>
                  <p className="font-mono text-xs mt-0.5 mb-2" style={{ color: "#1a3a5a" }}>
                    {step.sublabel}
                  </p>
                  <p className="font-mono text-xs leading-relaxed" style={{ color: "#2a4a6a" }}>
                    {step.detail}
                  </p>
                </div>
                {/* Arrow */}
                {i < pipeline.length - 1 && (
                  <div
                    className="flex-shrink-0 flex items-center justify-center sm:rotate-0 rotate-90 w-8 sm:w-auto sm:h-8"
                    style={{ color: "#1a3a5a" }}
                  >
                    <span className="font-mono text-xs">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Photo CDN pipeline */}
        <div className="mb-14">
          <p className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: "#1a3a5a" }}>
            PHOTO CDN PIPELINE (TERRAFORM)
          </p>
          <div
            className="relative p-5"
            style={{ backgroundColor: "#040c18", border: "1px solid #a78bfa33" }}
          >
            <Brackets color="#a78bfa44" />
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              {[
                { label: "S3 Bucket", sub: "private", color: "#00aa44" },
                { label: "→", sub: "", color: "#1a3a5a" },
                { label: "OAC", sub: "sigv4 signing", color: "#0099ff" },
                { label: "→", sub: "", color: "#1a3a5a" },
                { label: "CloudFront", sub: "PriceClass_100", color: "#f59e0b" },
                { label: "→", sub: "", color: "#1a3a5a" },
                { label: "Browser", sub: "immutable cache", color: "#c0d8f4" },
              ].map((node, i) => (
                node.label === "→" ? (
                  <span key={i} style={{ color: node.color }}>→</span>
                ) : (
                  <div key={i} className="px-3 py-2" style={{ border: `1px solid ${node.color}33`, backgroundColor: "#020610" }}>
                    <p style={{ color: node.color }}>{node.label}</p>
                    {node.sub && <p style={{ color: "#1a3a5a" }}>{node.sub}</p>}
                  </div>
                )
              ))}
            </div>
            <p className="font-mono text-xs mt-3" style={{ color: "#1a3a5a" }}>
              Bucket policy scoped to CloudFront ARN via AWS:SourceArn — S3 is never publicly accessible
            </p>
          </div>
        </div>

        {/* Infrastructure breakdown */}
        <div className="mb-14">
          <p className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: "#1a3a5a" }}>
            INFRASTRUCTURE BREAKDOWN
          </p>
          <div className="space-y-3">
            {infraStack.map((item) => (
              <div
                key={item.name}
                className="relative p-6"
                style={{ backgroundColor: "#040c18", border: `1px solid ${item.badgeColor}22` }}
              >
                <Brackets color={item.badgeColor + "33"} />
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3
                    className="font-bold uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1.1rem", color: "#c0d8f4" }}
                  >
                    {item.name}
                  </h3>
                  <span
                    className="font-mono text-xs px-2 py-0.5 border"
                    style={{ color: item.badgeColor, borderColor: item.badgeColor + "44", backgroundColor: item.badgeColor + "0a" }}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#5888aa" }}>
                  {item.description}
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-1">
                  {item.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 flex-shrink-0" style={{ backgroundColor: item.badgeColor }} />
                      <span className="font-mono text-xs" style={{ color: "#2a4a6a" }}>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Full tech stack */}
        <div>
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#1a3a5a" }}>
            FULL STACK
          </p>
          <div className="flex flex-wrap gap-2">
            {techGrid.map((t) => (
              <div
                key={t.name}
                className="px-3 py-2"
                style={{ backgroundColor: "#040c18", border: "1px solid #0c2040" }}
              >
                <p className="font-mono text-xs" style={{ color: "#c0d8f4" }}>{t.name}</p>
                <p className="font-mono text-xs" style={{ color: "#1a3a5a" }}>{t.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
