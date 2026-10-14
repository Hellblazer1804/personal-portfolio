"use client";

import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { personal, heroStats } from "@/lib/data";

function Brackets({ color = "#0077ee55" }: { color?: string }) {
  return (
    <>
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: color }} />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: color }} />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: color }} />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: color }} />
    </>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #010208 0%, #020818 60%, #010208 100%)" }}
    >
      {/* Radial glow behind content */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0, 85, 180, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* System label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-6 h-px" style={{ backgroundColor: "#0077ee" }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#0077ee" }}>
            SUBJECT IDENTIFICATION // SEQUENCE INITIALIZED
          </span>
          <span className="w-6 h-px" style={{ backgroundColor: "#0077ee" }} />
        </div>

        {/* Name */}
        <h1
          className="font-bold uppercase tracking-tight mb-5 leading-none"
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
            color: "#c0d8f4",
            textShadow: "0 0 40px rgba(0, 119, 238, 0.25)",
          }}
        >
          {personal.name.split(" ")[0]}
          <br />
          <span style={{ color: "#0099ff" }}>{personal.name.split(" ")[1]}</span>
        </h1>

        {/* Type animation */}
        <div className="mb-6 h-8 flex items-center gap-2">
          <span className="font-mono text-sm" style={{ color: "#0077ee" }}>&gt;&gt;</span>
          <TypeAnimation
            sequence={[
              "Platform Engineer",
              2000,
              "Site Reliability Engineer",
              2000,
              "Cloud Infrastructure Engineer",
              2000,
              "Systems Researcher",
              2000,
              "Kubernetes Operator",
              2000,
            ]}
            wrapper="span"
            speed={55}
            deletionSpeed={75}
            repeat={Infinity}
            className="font-mono text-base tracking-wider"
            style={{ color: "#5888aa" }}
          />
        </div>

        {/* Tagline */}
        <p
          className="text-base sm:text-lg max-w-2xl leading-relaxed mb-10"
          style={{ color: "#2a4a6a" }}
        >
          {personal.tagline}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-16">
          <Link
            href="/projects"
            className="relative inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs tracking-widest uppercase transition-all duration-200"
            style={{
              backgroundColor: "#0077ee",
              color: "#010208",
              fontWeight: 600,
              border: "1px solid #0099ff",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0055cc")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0077ee")}
          >
            ACCESS FILES
          </Link>
          <Link
            href="/contact"
            className="relative inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs tracking-widest uppercase transition-all duration-200"
            style={{
              backgroundColor: "transparent",
              color: "#0099ff",
              border: "1px solid #0077ee44",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#0077ee";
              e.currentTarget.style.boxShadow = "0 0 12px rgba(0, 119, 238, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#0077ee44";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ESTABLISH CONTACT
          </Link>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs tracking-widest uppercase transition-all duration-200"
            style={{
              backgroundColor: "transparent",
              color: "#2a4a6a",
              border: "1px solid #0c2040",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#5888aa"; e.currentTarget.style.borderColor = "#1a4060"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#2a4a6a"; e.currentTarget.style.borderColor = "#0c2040"; }}
          >
            GITHUB ↗
          </a>
        </div>

        {/* Stats row */}
        <div className="relative">
          <Brackets color="#0077ee33" />
          <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#0c2040]">
            {heroStats.map((stat, i) => (
              <div
                key={i}
                className="px-6 py-5 border-r border-b sm:border-b-0 last:border-r-0"
                style={{ borderColor: "#0c2040", backgroundColor: "#040c18" }}
              >
                <p
                  className="font-mono text-2xl font-bold mb-1"
                  style={{ color: "#0099ff", textShadow: "0 0 12px rgba(0, 153, 255, 0.4)" }}
                >
                  {stat.value}
                </p>
                <p className="font-mono text-xs tracking-wider" style={{ color: "#2a4a6a" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div
          className="w-px h-10 animate-pulse"
          style={{ background: "linear-gradient(to bottom, #0077ee44, transparent)" }}
        />
        <span className="font-mono text-xs tracking-widest" style={{ color: "#1a3a5a" }}>
          SCROLL
        </span>
      </div>
    </section>
  );
}
