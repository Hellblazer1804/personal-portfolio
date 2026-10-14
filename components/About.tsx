"use client";

import { aboutText, education, certs, personal } from "@/lib/data";

const callouts = [
  { value: "$200K+/mo", label: "Cloud cost savings at Amex", color: "#00aa44" },
  { value: "89.03%", label: "FaaSpot spot workflow success rate", color: "#0099ff" },
  { value: "6 PCI", label: "Production accounts operated at Amex", color: "#6655ff" },
  { value: "10K+ rpm", label: "Java API throughput at NCR", color: "#ee8800" },
];

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

export default function About() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#0077ee" }}>
            SUBJECT PROFILE
          </span>
          <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #0077ee33, transparent)" }} />
          <span className="font-mono text-xs" style={{ color: "#1a3a5a" }}>01</span>
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
          I Build Things That Stay Up.
        </h2>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Bio */}
          <div className="lg:col-span-3">
            <div
              className="relative p-6 mb-6"
              style={{ backgroundColor: "#040c18", border: "1px solid #0c2040" }}
            >
              <Brackets />
              <div className="space-y-4">
                {aboutText.split("\n\n").map((para, i) => (
                  <p key={i} className="leading-relaxed text-sm" style={{ color: "#5888aa" }}>
                    {para.trim()}
                  </p>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-5">
              <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "#1a3a5a" }}>
                ACADEMIC RECORD
              </p>
              <div className="space-y-3">
                {education.map((e, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1 h-1 flex-shrink-0" style={{ backgroundColor: "#0077ee" }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#c0d8f4" }}>
                        {e.degree} - {e.school}
                      </p>
                      <p className="text-xs font-mono mt-0.5" style={{ color: "#2a4a6a" }}>
                        {e.year}{e.note && ` · ${e.note}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certs */}
            <div>
              <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "#1a3a5a" }}>
                CERTIFICATIONS
              </p>
              <div className="flex flex-wrap gap-2">
                {certs.map((c, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 font-mono border"
                    style={{
                      color: c.status === "Active" ? "#00aa44" : "#2a4a6a",
                      borderColor: c.status === "Active" ? "#00aa4433" : "#0c2040",
                      backgroundColor: c.status === "Active" ? "#00aa4408" : "transparent",
                    }}
                  >
                    ● {c.name}{c.status === "In Progress" && " (in progress)"}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Callouts */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3 content-start">
            {callouts.map((c, i) => (
              <div
                key={i}
                className="relative p-5"
                style={{ backgroundColor: "#040c18", border: "1px solid #0c2040" }}
              >
                <Brackets color={c.color + "44"} />
                <p
                  className="font-mono text-xl font-bold mb-1"
                  style={{ color: c.color, textShadow: `0 0 10px ${c.color}44` }}
                >
                  {c.value}
                </p>
                <p className="text-xs leading-snug" style={{ color: "#2a4a6a" }}>
                  {c.label}
                </p>
              </div>
            ))}

            {/* Links */}
            <div
              className="col-span-2 p-5"
              style={{ backgroundColor: "#040c18", border: "1px solid #0c2040" }}
            >
              <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "#1a3a5a" }}>
                COMMUNICATION CHANNELS
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "LinkedIn ↗", href: personal.linkedin },
                  { label: "GitHub ↗", href: personal.github },
                  { label: `${personal.email} ↗`, href: `mailto:${personal.email}` },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm font-mono transition-colors duration-150"
                    style={{ color: "#2a4a6a", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#0099ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#2a4a6a")}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
