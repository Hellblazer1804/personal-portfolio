"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { personal, heroStats } from "@/lib/data";
import { photoUrl } from "@/lib/photo-url";

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

function SubjectPhoto() {
  const [phase, setPhase] = useState<"idle" | "scanning" | "done">("idle");
  const [scanY, setScanY] = useState(0);

  useEffect(() => {
    const start = setTimeout(() => setPhase("scanning"), 600);
    return () => clearTimeout(start);
  }, []);

  useEffect(() => {
    if (phase !== "scanning") return;
    const duration = 1400;
    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setScanY(progress * 100);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("done");
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const revealed = phase === "scanning" || phase === "done";

  return (
    <div className="relative w-full max-w-[280px] mx-auto lg:mx-0">
      {/* Outer frame */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: "3/4",
          border: "1px solid #0c2040",
          backgroundColor: "var(--bg-deep)",
        }}
      >
        <Brackets color="#0077ee66" />

        {/* Photo — reveals in grayscale during scan, pops to color on done */}
        <img
          src={photoUrl("/photos/personal-photo.jpg")}
          alt={personal.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            filter: phase === "done"
              ? "grayscale(0%) brightness(1)"
              : "grayscale(100%) brightness(0.75)",
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.3s ease, filter 0.8s ease 0.3s",
            clipPath: phase === "scanning"
              ? `inset(0 0 ${100 - scanY}% 0)`
              : phase === "done"
              ? "inset(0 0 0% 0)"
              : "inset(0 0 100% 0)",
          }}
        />

        {/* Blue overlay — fades out when color is revealed */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(0,60,160,0.18) 0%, rgba(0,20,60,0.35) 100%)",
            opacity: phase === "done" ? 0 : revealed ? 1 : 0,
            transition: "opacity 0.8s ease 0.3s",
          }}
        />

        {/* Scan line */}
        {phase === "scanning" && (
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: `${scanY}%`,
              height: "2px",
              background: "linear-gradient(90deg, transparent, #0099ff, #00ccff, #0099ff, transparent)",
              boxShadow: "0 0 12px #0099ff, 0 0 24px #0077ee66",
              transform: "translateY(-50%)",
            }}
          />
        )}

        {/* Grid lines overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,119,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,119,238,0.04) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Bottom info bar */}
        <div
          className="absolute bottom-0 left-0 right-0 px-3 py-2.5"
          style={{
            background: "linear-gradient(transparent, var(--surface))",
            opacity: phase === "done" ? 1 : 0,
            transition: "opacity 0.5s ease 0.2s",
          }}
        >
          <p className="font-mono text-xs tracking-widest" style={{ color: "var(--accent-bright)" }}>
            ● SUBJECT IDENTIFIED
          </p>
          <p className="font-mono text-xs mt-0.5" style={{ color: "var(--text-dim)" }}>
            {personal.location}
          </p>
        </div>
      </div>

      {/* Corner coordinate labels */}
      <span
        className="absolute -top-5 left-0 font-mono text-xs"
        style={{ color: "var(--text-dimmer)" }}
      >
        33.75°N 84.39°W
      </span>
      <span
        className="absolute -bottom-5 right-0 font-mono text-xs"
        style={{ color: "var(--text-dimmer)" }}
      >
        ID-001
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 overflow-hidden"
      style={{ background: "linear-gradient(160deg, var(--bg) 0%, var(--surface) 60%, var(--bg) 100%)" }}
    >
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0, 85, 180, 0.07) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* System label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-6 h-px" style={{ backgroundColor: "var(--accent)" }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>
            SUBJECT IDENTIFICATION // SEQUENCE INITIALIZED
          </span>
          <span className="w-6 h-px" style={{ backgroundColor: "var(--accent)" }} />
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Left — text */}
          <div className="flex-1 min-w-0">
            <h1
              className="font-bold uppercase tracking-tight mb-5 leading-none"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
                color: "var(--text-bright)",
                textShadow: "0 0 40px rgba(0, 119, 238, 0.25)",
              }}
            >
              {personal.name.split(" ")[0]}
              <br />
              <span style={{ color: "var(--accent-bright)" }}>{personal.name.split(" ")[1]}</span>
            </h1>

            {/* Type animation */}
            <div className="mb-6 h-8 flex items-center gap-2">
              <span className="font-mono text-sm" style={{ color: "var(--accent)" }}>&gt;&gt;</span>
              <TypeAnimation
                sequence={[
                  "Platform Engineer",
                  2000,
                  "Backend Engineer",
                  2000,
                  "Full-Stack Engineer",
                  2000,
                  "Site Reliability Engineer",
                  2000,
                  "Cloud Infrastructure Engineer",
                  2000,
                  "Systems Researcher",
                  2000,
                ]}
                wrapper="span"
                speed={55}
                deletionSpeed={75}
                repeat={Infinity}
                className="font-mono text-base tracking-wider"
                style={{ color: "var(--text)" }}
              />
            </div>

            {/* Tagline */}
            <p
              className="text-base sm:text-lg max-w-xl leading-relaxed mb-10"
              style={{ color: "var(--text-dim)" }}
            >
              {personal.tagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--bg)",
                  fontWeight: 600,
                  border: "1px solid #0099ff",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0055cc")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--accent)")}
              >
                ACCESS FILES
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--accent-bright)",
                  border: "1px solid #0077ee44",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.boxShadow = "0 0 12px rgba(0,119,238,0.2)";
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
                className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--text-dim)",
                  border: "1px solid #0c2040",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "#1a4060"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-dim)"; e.currentTarget.style.borderColor = "var(--border)"; }}
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
                    className="px-5 py-4 border-r border-b sm:border-b-0 last:border-r-0"
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
                  >
                    <p
                      className="font-mono text-xl font-bold mb-1"
                      style={{ color: "var(--accent-bright)", textShadow: "0 0 12px rgba(0,153,255,0.4)" }}
                    >
                      {stat.value}
                    </p>
                    <p className="font-mono text-xs tracking-wider" style={{ color: "var(--text-dim)" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — photo (top on mobile, right column on desktop) */}
          <div className="lg:w-[280px] w-full flex justify-center lg:justify-end lg:pt-2 flex-shrink-0 order-first lg:order-last">
            <SubjectPhoto />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div
          className="w-px h-10 animate-pulse"
          style={{ background: "linear-gradient(to bottom, #0077ee44, transparent)" }}
        />
        <span className="font-mono text-xs tracking-widest" style={{ color: "var(--text-dimmer)" }}>
          SCROLL
        </span>
      </div>
    </section>
  );
}
