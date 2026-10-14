"use client";

import { skills } from "@/lib/data";

function Brackets({ color = "#0077ee33" }: { color?: string }) {
  return (
    <>
      <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l" style={{ borderColor: color }} />
      <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r" style={{ borderColor: color }} />
      <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l" style={{ borderColor: color }} />
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r" style={{ borderColor: color }} />
    </>
  );
}

export default function Stack() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#0077ee" }}>
            TECHNICAL MANIFEST
          </span>
          <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #0077ee33, transparent)" }} />
          <span className="font-mono text-xs" style={{ color: "#1a3a5a" }}>02</span>
        </div>

        <h2
          className="font-bold uppercase tracking-wide mb-3"
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            color: "#c0d8f4",
            textShadow: "0 0 20px rgba(0, 119, 238, 0.2)",
          }}
        >
          Technical Depth
        </h2>
        <p className="font-mono text-sm mb-10" style={{ color: "#2a4a6a" }}>
          Tools I reach for in production — and the ones I&apos;ve built systems around.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((group, i) => (
            <div
              key={i}
              className="relative p-5 transition-all duration-200 group"
              style={{ backgroundColor: "#040c18", border: "1px solid #0c2040" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#1a4888";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 16px rgba(0, 119, 238, 0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#0c2040";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <Brackets />
              <h3 className="font-mono text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#0077ee" }}>
                {group.category}
              </h3>
              <ul className="space-y-1.5">
                {group.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 flex-shrink-0" style={{ backgroundColor: "#1a3a5a" }} />
                    <span className="text-sm leading-relaxed" style={{ color: "#5888aa" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
