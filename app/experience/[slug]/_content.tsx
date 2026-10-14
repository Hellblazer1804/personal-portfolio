"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { experience } from "@/lib/data";

const accentColors: Record<string, string> = {
  geotab: "#0099ff",
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

  const c = accentColors[slug] ?? "#0099ff";
  const isActive = job.period.includes("Present");

  return (
    <div className="pt-14 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="pt-12 mb-8">
          <Link
            href="/experience"
            className="font-mono text-xs tracking-widest uppercase transition-colors duration-150"
            style={{ color: "#1a3a5a", textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = c)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1a3a5a")}
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
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isActive ? "#00aa44" : "#1a3a5a" }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: isActive ? "#00aa44" : "#1a3a5a" }}>
            {isActive ? "ACTIVE ASSIGNMENT" : "COMPLETED"}
          </span>
        </div>

        <h1
          className="font-bold uppercase tracking-wide mb-1"
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            color: "#c0d8f4",
            textShadow: `0 0 30px ${c}33`,
          }}
        >
          {job.role}
        </h1>
        <p className="font-mono text-base mb-1" style={{ color: c }}>{job.company}</p>
        <p className="font-mono text-xs mb-10" style={{ color: "#1a3a5a" }}>
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
          <p className="text-sm leading-relaxed" style={{ color: "#5888aa" }}>
            {job.caseStudy.situation}
          </p>
        </div>

        {/* The Work */}
        <div className="relative p-6 mb-6" style={{ backgroundColor: "#040c18", border: `1px solid ${c}33` }}>
          <Brackets color={c + "44"} />
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: c }}>
            THE WORK
          </p>

          <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "#1a3a5a" }}>
            WHAT I TOOK ON
          </p>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "#5888aa" }}>
            {job.caseStudy.challenge}
          </p>

          <div className="h-px mb-5" style={{ background: `linear-gradient(90deg, ${c}22, transparent)` }} />

          <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "#1a3a5a" }}>
            WHAT I DELIVERED
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#5888aa" }}>
            {job.caseStudy.solution}
          </p>
        </div>

        {/* Key contributions */}
        <div className="relative p-6 mb-6" style={{ backgroundColor: "#040c18", border: "1px solid #0c2040" }}>
          <Brackets />
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#1a3a5a" }}>
            KEY CONTRIBUTIONS
          </p>
          <ul className="space-y-3">
            {job.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-1 h-1 flex-shrink-0" style={{ backgroundColor: c }} />
                <span className="text-sm leading-relaxed" style={{ color: "#5888aa" }}>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "#1a3a5a" }}>
            EQUIPMENT MANIFEST
          </p>
          <div className="flex flex-wrap gap-2">
            {job.stack.map((t, i) => (
              <span key={i} className="font-mono text-xs px-3 py-1.5 border" style={{ color: "#5888aa", borderColor: "#0c2040", backgroundColor: "#020610" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
