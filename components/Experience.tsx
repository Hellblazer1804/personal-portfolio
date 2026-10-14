"use client";

import { useState } from "react";
import Link from "next/link";
import { experience, projects } from "@/lib/data";

const accentColors = ["#0099ff", "#00aa44", "#6655ff", "#ee8800"];

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

export default function Experience() {
  const [expandedHighlights, setExpandedHighlights] = useState<Set<string>>(new Set());

  const toggleHighlights = (slug: string) => {
    setExpandedHighlights((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#0077ee" }}>
            OPERATIVE HISTORY
          </span>
          <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #0077ee33, transparent)" }} />
          <span className="font-mono text-xs" style={{ color: "#1a3a5a" }}>04</span>
        </div>

        <h2
          className="font-bold uppercase tracking-wide mb-10"
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            color: "#c0d8f4",
            textShadow: "0 0 20px rgba(0, 119, 238, 0.2)",
          }}
        >
          Work History
        </h2>

        <div className="space-y-3">
          {experience.map((job, i) => {
            const color = accentColors[i] ?? "#0099ff";
            return (
              <div
                key={job.slug}
                className="relative p-6 transition-all duration-200"
                style={{ backgroundColor: "#040c18", border: "1px solid #0c2040" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = color + "55";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#0c2040";
                }}
              >
                <Brackets color={color + "33"} />

                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Status */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: i === 0 ? color : "#1a3a5a" }} />
                      <span className="font-mono text-xs tracking-widest" style={{ color: i === 0 ? color : "#1a3a5a" }}>
                        {i === 0 ? "ACTIVE ASSIGNMENT" : "COMPLETED"}
                      </span>
                    </div>

                    <h3
                      className="font-bold uppercase tracking-wide mb-0.5"
                      style={{
                        fontFamily: "var(--font-rajdhani)",
                        fontSize: "1.2rem",
                        color: "#c0d8f4",
                      }}
                    >
                      {job.role}
                    </h3>
                    <p className="font-mono text-sm mb-1" style={{ color }}>
                      {job.company}
                    </p>
                    <p className="font-mono text-xs mb-4" style={{ color: "#1a3a5a" }}>
                      {job.period} · {job.location}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-1.5 mb-4">
                      {(expandedHighlights.has(job.slug)
                        ? job.highlights
                        : job.highlights.slice(0, 2)
                      ).map((h, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 flex-shrink-0" style={{ backgroundColor: "#1a3a5a" }} />
                          <span className="text-sm leading-relaxed" style={{ color: "#5888aa" }}>{h}</span>
                        </li>
                      ))}
                      {job.highlights.length > 2 && (
                        <li style={{ paddingLeft: "12px" }}>
                          <button
                            onClick={() => toggleHighlights(job.slug)}
                            className="font-mono text-xs tracking-wider transition-colors duration-150"
                            style={{ color: color, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                          >
                            {expandedHighlights.has(job.slug)
                              ? "▲ SHOW LESS"
                              : `▼ + ${job.highlights.length - 2} MORE CONTRIBUTIONS`}
                          </button>
                        </li>
                      )}
                    </ul>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {job.stack.map((t, j) => (
                        <span
                          key={j}
                          className="font-mono text-xs px-2 py-0.5 border"
                          style={{ color: "#1a3a5a", borderColor: "#0c2040", backgroundColor: "#020610" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="self-center flex flex-col gap-2 flex-shrink-0">
                    <Link
                      href={`/experience/${job.slug}`}
                      className="font-mono text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-150 text-center"
                      style={{
                        color,
                        borderColor: color + "44",
                        backgroundColor: color + "08",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = color + "18";
                        e.currentTarget.style.boxShadow = `0 0 12px ${color}22`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = color + "08";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      FULL RECORD ↗
                    </Link>
                    {job.projectRef && (() => {
                      const refs = Array.isArray(job.projectRef) ? job.projectRef : [job.projectRef];
                      return refs.map((pid) => {
                        const proj = projects.find((p) => p.id === pid);
                        if (!proj) return null;
                        return (
                          <Link
                            key={pid}
                            href={`/projects/${pid}`}
                            className="font-mono text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-150 text-center"
                            style={{
                              color: proj.badgeColor,
                              borderColor: proj.badgeColor + "33",
                              backgroundColor: proj.badgeColor + "06",
                              textDecoration: "none",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = proj.badgeColor + "14";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = proj.badgeColor + "06";
                            }}
                          >
                            {proj.title.length > 16 ? proj.title.split(" ")[0].toUpperCase() + " ↗" : proj.title.toUpperCase() + " ↗"}
                          </Link>
                        );
                      });
                    })()}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
