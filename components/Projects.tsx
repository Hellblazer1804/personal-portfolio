"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "@/lib/data";

function Brackets({ color = "#0077ee33" }: { color?: string }) {
  return (
    <>
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: color }} />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: color }} />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: color }} />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: color }} />
    </>
  );
}

export default function Projects() {
  const [expandedStack, setExpandedStack] = useState<Set<string>>(new Set());

  const toggleStack = (id: string) =>
    setExpandedStack((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>
            OPERATIONS LOG
          </span>
          <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #0077ee33, transparent)" }} />
          <span className="font-mono text-xs" style={{ color: "var(--text-dimmer)" }}>03</span>
        </div>

        <h2
          className="font-bold uppercase tracking-wide mb-3"
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            color: "var(--text-bright)",
            textShadow: "0 0 20px rgba(0, 119, 238, 0.2)",
          }}
        >
          Selected Work
        </h2>
        <p className="font-mono text-sm mb-10" style={{ color: "var(--text-dim)" }}>
          From peer-reviewed systems research to production platform engineering at scale.
        </p>

        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative p-6 transition-all duration-200"
              style={{ backgroundColor: "var(--surface)", border: "1px solid #0c2040" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = project.badgeColor + "55";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${project.badgeColor}0a`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <Brackets color={project.badgeColor + "33"} />

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className="font-mono text-xs px-2 py-0.5 border"
                      style={{
                        color: project.badgeColor,
                        borderColor: project.badgeColor + "44",
                        backgroundColor: project.badgeColor + "0a",
                      }}
                    >
                      {project.badge}
                    </span>
                    {project.paper && (
                      <span
                        className="font-mono text-xs px-2 py-0.5 border"
                        style={{ color: "#6655ff", borderColor: "#6655ff44", backgroundColor: "#6655ff0a" }}
                      >
                        PEER-REVIEWED
                      </span>
                    )}
                    {"thesis" in project && project.thesis && (
                      <a
                        href={project.thesis as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-mono text-xs px-2 py-0.5 border transition-opacity duration-150"
                        style={{ color: "#00aa44", borderColor: "#00aa4444", backgroundColor: "#00aa4408", textDecoration: "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        M.S. THESIS ↗
                      </a>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold uppercase tracking-wide mb-1"
                    style={{
                      fontFamily: "var(--font-rajdhani)",
                      fontSize: "1.25rem",
                      color: "var(--text-bright)",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "var(--text-dim)" }}>{project.subtitle}</p>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {(expandedStack.has(project.id)
                      ? project.stack
                      : project.stack.slice(0, 5)
                    ).map((t, j) => (
                      <span
                        key={j}
                        className="font-mono text-xs px-2 py-0.5 border"
                        style={{ color: "var(--text-dimmer)", borderColor: "var(--border)", backgroundColor: "var(--bg-deep)" }}
                      >
                        {t}
                      </span>
                    ))}
                    {project.stack.length > 5 && (
                      <button
                        onClick={(e) => { e.preventDefault(); toggleStack(project.id); }}
                        className="font-mono text-xs tracking-wider transition-colors duration-150"
                        style={{ color: project.badgeColor, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                      >
                        {expandedStack.has(project.id) ? "▲ less" : `+${project.stack.length - 5} more`}
                      </button>
                    )}
                  </div>
                </div>

                {/* Access button */}
                <Link
                  href={`/projects/${project.id}`}
                  className="self-center font-mono text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-150 flex-shrink-0"
                  style={{
                    color: project.badgeColor,
                    borderColor: project.badgeColor + "44",
                    backgroundColor: project.badgeColor + "08",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = project.badgeColor + "18";
                    e.currentTarget.style.boxShadow = `0 0 12px ${project.badgeColor}22`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = project.badgeColor + "08";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  ACCESS FILE ↗
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
