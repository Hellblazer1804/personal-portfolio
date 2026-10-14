"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { personal } from "@/lib/data";

const links = [
  { label: "HOME", href: "/" },
  { label: "PROFILE", href: "/about" },
  { label: "OPERATIONS", href: "/projects" },
  { label: "HISTORY", href: "/experience" },
  { label: "ARCHIVE", href: "/photography" },
  { label: "CONTACT", href: "/contact" },
];

function Brackets() {
  return (
    <>
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: "#0077ee66" }} />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: "#0077ee66" }} />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l" style={{ borderColor: "#0077ee66" }} />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: "#0077ee66" }} />
    </>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "rgba(1, 2, 8, 0.94)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #0c2040",
        boxShadow: "0 1px 20px rgba(0, 119, 238, 0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <Link
          href="/"
          className="relative flex items-center gap-2 px-3 py-1"
          style={{ textDecoration: "none" }}
        >
          <Brackets />
          <span
            className="font-mono text-xs tracking-widest font-semibold uppercase"
            style={{ color: "#0099ff" }}
          >
            ◆ {personal.name.split(" ")[0].toUpperCase()} {personal.name.split(" ")[1][0].toUpperCase()}.
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative px-4 py-2 font-mono text-xs tracking-widest transition-all duration-150"
                style={{
                  color: active ? "#c0d8f4" : "#2a4a6a",
                  textDecoration: "none",
                  ...(active ? { textShadow: "0 0 10px rgba(0, 119, 238, 0.5)" } : {}),
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = "#5888aa";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = "#2a4a6a";
                }}
              >
                {active && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, #0077ee, transparent)" }}
                  />
                )}
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Status indicator */}
        <div className="hidden md:flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: "#00aa44" }}
          />
          <span className="font-mono text-xs tracking-widest" style={{ color: "#2a4a6a" }}>
            SYS.ONLINE
          </span>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-5 h-px transition-all"
              style={{ backgroundColor: "#2a4a6a" }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-3 border-t"
          style={{ backgroundColor: "rgba(1, 2, 8, 0.98)", borderColor: "#0c2040" }}
        >
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-xs tracking-widest py-2"
                style={{ color: active ? "#0099ff" : "#2a4a6a", textDecoration: "none" }}
                onClick={() => setMenuOpen(false)}
              >
                {active ? "▸ " : "  "}{l.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
