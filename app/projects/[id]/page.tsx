"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import { projects } from "@/lib/data";

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

export default function ProjectCaseStudy() {
  const { id } = useParams() as { id: string };
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const c = project.badgeColor;

  return (
    <div className="pt-14 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <div className="pt-12 mb-8">
          <Link
            href="/projects"
            className="font-mono text-xs tracking-widest uppercase transition-colors duration-150"
            style={{ color: "#1a3a5a", textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0099ff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1a3a5a")}
          >
            ← RETURN TO OPERATIONS
          </Link>
        </div>

        {/* Header */}
        <div className="mb-2 flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: c }}>
            MEMORY SEQUENCE
          </span>
          <span className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${c}44, transparent)` }} />
        </div>

        <h1
          className="font-bold uppercase tracking-wide mb-2"
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            color: "#c0d8f4",
            textShadow: `0 0 30px ${c}33`,
          }}
        >
          {project.title}
        </h1>
        <p className="text-sm mb-3" style={{ color: "#2a4a6a" }}>{project.subtitle}</p>

        <div className="flex flex-wrap items-center gap-2 mb-10">
          <span
            className="font-mono text-xs px-2.5 py-1 border"
            style={{ color: c, borderColor: c + "44", backgroundColor: c + "0a" }}
          >
            {project.badge}
          </span>
          {project.paper && (
            <span
              className="font-mono text-xs px-2.5 py-1 border"
              style={{ color: "#6655ff", borderColor: "#6655ff44", backgroundColor: "#6655ff0a" }}
            >
              PEER-REVIEWED · ACM MIDDLEWARE &apos;26
            </span>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-10" style={{ border: "1px solid #0c2040", backgroundColor: "#0c2040" }}>
          {project.metrics.map((m, i) => (
            <div
              key={i}
              className="relative px-5 py-4"
              style={{ backgroundColor: "#040c18" }}
            >
              <p
                className="font-mono text-2xl font-bold mb-1"
                style={{ color: c, textShadow: `0 0 12px ${c}44` }}
              >
                {m.value}
              </p>
              <p className="font-mono text-xs" style={{ color: "#2a4a6a" }}>{m.label}</p>
            </div>
          ))}
        </div>

        {/* Case Study */}
        <div className="space-y-4 mb-10">
          {(["situation", "challenge", "solution"] as const).map((key) => (
            <div
              key={key}
              className="relative p-6"
              style={{ backgroundColor: "#040c18", border: `1px solid ${key === "solution" ? c + "33" : "#0c2040"}` }}
            >
              <Brackets color={key === "solution" ? c + "44" : "#0077ee22"} />
              <p
                className="font-mono text-xs tracking-widest uppercase mb-3"
                style={{ color: key === "solution" ? c : "#1a3a5a" }}
              >
                {key}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#5888aa" }}>
                {project.caseStudy[key]}
              </p>
            </div>
          ))}
        </div>

        {/* Key contributions */}
        <div
          className="relative p-6 mb-6"
          style={{ backgroundColor: "#040c18", border: "1px solid #0c2040" }}
        >
          <Brackets />
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#1a3a5a" }}>
            KEY CONTRIBUTIONS
          </p>
          <ul className="space-y-3">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-1 h-1 flex-shrink-0" style={{ backgroundColor: c }} />
                <span className="text-sm leading-relaxed" style={{ color: "#5888aa" }}>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stack */}
        <div className="mb-6">
          <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "#1a3a5a" }}>
            EQUIPMENT MANIFEST
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t, i) => (
              <span
                key={i}
                className="font-mono text-xs px-3 py-1.5 border"
                style={{ color: "#5888aa", borderColor: "#0c2040", backgroundColor: "#020610" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6 pt-4" style={{ borderTop: "1px solid #0c2040" }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest uppercase transition-colors duration-150"
              style={{ color: c, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              GITHUB ↗
            </a>
          )}
          {project.paper && (
            <span className="font-mono text-xs tracking-wider" style={{ color: "#1a3a5a" }}>
              DOI: 10.1145/3801927.3858633
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
