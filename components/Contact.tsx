"use client";

import { personal } from "@/lib/data";

function Brackets({ color = "#0077ee44" }: { color?: string }) {
  return (
    <>
      <span className="absolute top-0 left-0 w-4 h-4 border-t border-l" style={{ borderColor: color }} />
      <span className="absolute top-0 right-0 w-4 h-4 border-t border-r" style={{ borderColor: color }} />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l" style={{ borderColor: color }} />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r" style={{ borderColor: color }} />
    </>
  );
}

export default function Contact() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>
            COMMUNICATION CHANNEL
          </span>
          <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #0077ee33, transparent)" }} />
          <span className="font-mono text-xs" style={{ color: "var(--text-dimmer)" }}>05</span>
        </div>

        <div
          className="relative p-12 md:p-16 text-center"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            background: "radial-gradient(ellipse at 50% 0%, rgba(0, 100, 220, 0.06) 0%, var(--surface) 70%), var(--surface)",
          }}
        >
          <Brackets />

          <h2
            className="font-bold uppercase tracking-wide mb-4"
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "var(--text-bright)",
              textShadow: "0 0 30px rgba(0, 119, 238, 0.3)",
            }}
          >
            Establish Contact.
          </h2>

          <p className="font-mono text-sm max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--text-dim)" }}>
            Platform engineer, backend engineer, systems researcher.
            If you&apos;re working on hard infrastructure or reliability problems - let&apos;s talk.
          </p>

          <a
            href={`mailto:${personal.email}`}
            className="inline-block font-mono text-sm tracking-widest uppercase px-8 py-3.5 mb-10 transition-all duration-200"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--bg)",
              border: "1px solid #0099ff",
              fontWeight: 600,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0055cc";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 119, 238, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--accent)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {personal.email}
          </a>

          <div className="flex justify-center gap-10 flex-wrap">
            {[
              { label: "LINKEDIN", href: personal.linkedin },
              { label: "GITHUB", href: personal.github },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-widest transition-colors duration-150"
                style={{ color: "var(--text-dimmer)", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-bright)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dimmer)")}
              >
                {l.label} ↗
              </a>
            ))}
            <span className="font-mono text-xs tracking-widest" style={{ color: "var(--text-dimmer)" }}>
              ● {personal.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
