"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { experience, projects } from "@/lib/data";

const accentColors: Record<string, string> = {
  geotab: "var(--accent-bright)",
  "university-of-georgia": "#00aa44",
  "american-express": "#6655ff",
  "ncr-corporation": "#ee8800",
};

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

export default function ExperienceContent({ slug }: { slug: string }) {
  const job = experience.find((e) => e.slug === slug);
  if (!job) notFound();

  const c = accentColors[slug] ?? "var(--accent-bright)";
  const isActive = job.period.includes("Present");

  return (
    <div className="pt-14 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="pt-12 mb-8">
          <Link
            href="/experience"
            className="font-mono text-xs tracking-widest uppercase transition-colors duration-150"
            style={{ color: "var(--text-dimmer)", textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = c)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dimmer)")}
          >
            ← RETURN TO HISTORY
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: c }}>
            OPERATIVE ASSIGNMENT
          </span>
          <span className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${c}44, transparent)` }} />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isActive ? "#00aa44" : "var(--text-dimmer)" }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: isActive ? "#00aa44" : "var(--text-dimmer)" }}>
            {isActive ? "ACTIVE ASSIGNMENT" : "COMPLETED"}
          </span>
        </div>

        <h1
          className="font-bold uppercase tracking-wide mb-1"
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            color: "var(--text-bright)",
            textShadow: `0 0 30px ${c}33`,
          }}
        >
          {job.role}
        </h1>
        <p className="font-mono text-base mb-1" style={{ color: c }}>{job.company}</p>
        <p className="font-mono text-xs mb-10" style={{ color: "var(--text-dimmer)" }}>
          {job.period} · {job.location}
        </p>

        {/* Context callout */}
        <div
          className="mb-6 pl-5 py-1"
          style={{ borderLeft: `2px solid ${c}55` }}
        >
          <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: c + "99" }}>
            CONTEXT
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
            {job.caseStudy.situation}
          </p>
        </div>

        {/* The Work */}
        <div className="relative p-6 mb-6" style={{ backgroundColor: "var(--surface)", border: `1px solid ${c}33` }}>
          <Brackets color={c + "44"} />
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: c }}>
            THE WORK
          </p>

          <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--text-dimmer)" }}>
            WHAT I TOOK ON
          </p>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text)" }}>
            {job.caseStudy.challenge}
          </p>

          <div className="h-px mb-5" style={{ background: `linear-gradient(90deg, ${c}22, transparent)` }} />

          <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--text-dimmer)" }}>
            WHAT I DELIVERED
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
            {job.caseStudy.solution}
          </p>
        </div>

        {/* Key contributions */}
        <div className="relative p-6 mb-6" style={{ backgroundColor: "var(--surface)", border: "1px solid #0c2040" }}>
          <Brackets />
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-dimmer)" }}>
            KEY CONTRIBUTIONS
          </p>
          <ul className="space-y-3">
            {job.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-1 h-1 flex-shrink-0" style={{ backgroundColor: c }} />
                <span className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-dimmer)" }}>
            EQUIPMENT MANIFEST
          </p>
          <div className="flex flex-wrap gap-2">
            {job.stack.map((t, i) => (
              <span key={i} className="font-mono text-xs px-3 py-1.5 border" style={{ color: "var(--text)", borderColor: "var(--border)", backgroundColor: "var(--bg-deep)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Related project case studies */}
        {job.projectRef && (() => {
          const refs = Array.isArray(job.projectRef) ? job.projectRef : [job.projectRef];
          const linked = refs.map((pid) => projects.find((p) => p.id === pid)).filter(Boolean);
          if (!linked.length) return null;
          return (
            <div className="pt-6" style={{ borderTop: "1px solid #0c2040" }}>
              <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-dimmer)" }}>
                RELATED OPERATIONS
              </p>
              <div className="flex flex-col gap-3">
                {linked.map((proj) => proj && (
                  <Link
                    key={proj.id}
                    href={`/projects/${proj.id}`}
                    className="relative flex items-center justify-between p-4 border transition-all duration-150 group"
                    style={{ backgroundColor: "var(--surface)", borderColor: proj.badgeColor + "33", textDecoration: "none" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = proj.badgeColor + "77";
                      e.currentTarget.style.boxShadow = `0 0 14px ${proj.badgeColor}0f`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = proj.badgeColor + "33";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div>
                      <p className="font-mono text-xs mb-1" style={{ color: proj.badgeColor }}>
                        {proj.badge}
                      </p>
                      <p
                        className="font-bold uppercase tracking-wide"
                        style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1rem", color: "var(--text-bright)" }}
                      >
                        {proj.title}
                      </p>
                      <p className="font-mono text-xs mt-0.5" style={{ color: "var(--text-dim)" }}>
                        {proj.subtitle}
                      </p>
                    </div>
                    <span className="font-mono text-xs tracking-widest ml-4 flex-shrink-0" style={{ color: proj.badgeColor }}>
                      VIEW ↗
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
