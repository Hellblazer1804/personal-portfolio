"use client";

import { useState, useEffect, useCallback } from "react";
import { photos, type Photo } from "@/lib/data";
import { photoUrl } from "@/lib/photo-url";

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

function Lightbox({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-[9999] px-4 py-8"
      style={{ backgroundColor: "rgba(1,2,8,0.96)" }}
      onClick={onClose}
    >
      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,30,100,0.022) 3px, rgba(0,30,100,0.022) 4px)",
        }}
      />

      {/* Photo container */}
      <div
        className="relative"
        style={{ maxWidth: "min(90vw, 1200px)", maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner brackets */}
        <span className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 z-10" style={{ borderColor: "var(--accent)" }} />
        <span className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 z-10" style={{ borderColor: "var(--accent)" }} />
        <span className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 z-10" style={{ borderColor: "var(--accent)" }} />
        <span className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 z-10" style={{ borderColor: "var(--accent)" }} />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoUrl(photo.src)}
          alt={photo.title}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "80vh",
            objectFit: "contain",
            boxShadow: "0 0 60px rgba(0,119,238,0.15)",
          }}
        />
      </div>

      {/* Caption */}
      <div className="relative mt-5 text-center" onClick={(e) => e.stopPropagation()}>
        <p
          className="font-bold uppercase tracking-wide mb-1"
          style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1.1rem", color: "var(--text-bright)" }}
        >
          {photo.title}
        </p>
        <p className="font-mono text-xs" style={{ color: "var(--text-dim)" }}>
          ● {photo.location} · {photo.date}
        </p>
      </div>

      {/* Close hint */}
      <p
        className="absolute bottom-5 font-mono text-xs tracking-widest"
        style={{ color: "var(--text-dimmer)" }}
      >
        CLICK OUTSIDE OR ESC TO CLOSE
      </p>
    </div>
  );
}

function PhotoCard({ photo, onLightbox }: { photo: Photo; onLightbox: (p: Photo) => void }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: "1200px", height: "420px" }}
      onClick={() => setFlipped((f) => !f)}
      onDoubleClick={(e) => { e.preventDefault(); onLightbox(photo); }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoUrl(photo.src)}
            alt={photo.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />

          {/* Bottom gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, rgba(1,2,8,0.6) 70%, rgba(1,2,8,0.95) 100%)",
            }}
          />

          {/* Scan line overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,30,100,0.025) 3px, rgba(0,30,100,0.025) 4px)",
            }}
          />

          {/* Top-right flip hint */}
          <div
            className="absolute top-3 right-3 font-mono text-xs tracking-widest px-2 py-1"
            style={{
              color: "var(--accent-bright)",
              backgroundColor: "rgba(1,2,8,0.7)",
              border: "1px solid #0077ee44",
            }}
          >
            ↻ ACCESS RECORD
          </div>

          {/* Corner brackets */}
          <span className="absolute top-0 left-0 w-4 h-4 border-t border-l pointer-events-none" style={{ borderColor: "#0077ee66" }} />
          <span className="absolute top-0 right-0 w-4 h-4 border-t border-r pointer-events-none" style={{ borderColor: "#0077ee66" }} />
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l pointer-events-none" style={{ borderColor: "#0077ee66" }} />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r pointer-events-none" style={{ borderColor: "#0077ee66" }} />

          {/* Title / location */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p
              className="font-bold uppercase tracking-wide leading-tight mb-1"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontSize: "1.1rem",
                color: "var(--text-bright)",
                textShadow: "0 0 12px rgba(0,119,238,0.3)",
              }}
            >
              {photo.title}
            </p>
            <p className="font-mono text-xs tracking-widest" style={{ color: "var(--text-dim)" }}>
              ● {photo.location}
            </p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: "var(--surface)",
            border: "1px solid #0c2040",
          }}
        >
          <Brackets />

          {/* Blurred photo as background */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoUrl(photo.src)}
            alt=""
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.08,
              filter: "blur(4px)",
            }}
          />

          {/* Content */}
          <div className="relative flex flex-col h-full p-5">
            {/* Header */}
            <div className="mb-4">
              <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: "var(--accent)" }}>
                FIELD RECORD
              </p>
              <p
                className="font-bold uppercase tracking-wide"
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontSize: "1.1rem",
                  color: "var(--text-bright)",
                  textShadow: "0 0 10px rgba(0,119,238,0.25)",
                }}
              >
                {photo.title}
              </p>
              <p className="font-mono text-xs mt-1" style={{ color: "var(--text-dimmer)" }}>
                {photo.location} · {photo.date}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px mb-4" style={{ background: "linear-gradient(90deg, #0077ee33, transparent)" }} />

            {/* Story */}
            <p
              className="text-sm leading-relaxed flex-1 overflow-y-auto"
              style={{ color: "var(--text)" }}
            >
              {photo.story}
            </p>

            {/* Tags + close */}
            <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex flex-wrap gap-1.5">
                {photo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-0.5 border"
                    style={{ color: "var(--text-dimmer)", borderColor: "var(--border)", backgroundColor: "var(--bg-deep)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => { e.stopPropagation(); onLightbox(photo); }}
                  className="font-mono text-xs tracking-widest transition-opacity duration-150"
                  style={{ color: "var(--accent-bright)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  ⤢ FULL VIEW
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
                  className="font-mono text-xs tracking-widest transition-colors duration-150"
                  style={{ color: "var(--text-dim)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  ↩ CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Photography() {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const closeLightbox = useCallback(() => setLightboxPhoto(null), []);

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>
            VISUAL ARCHIVE
          </span>
          <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #0077ee33, transparent)" }} />
          <span className="font-mono text-xs" style={{ color: "var(--text-dimmer)" }}>06</span>
        </div>

        <h2
          className="font-bold uppercase tracking-wide mb-3"
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            color: "var(--text-bright)",
            textShadow: "0 0 20px rgba(0,119,238,0.2)",
          }}
        >
          Photography
        </h2>
        <p className="font-mono text-sm mb-10" style={{ color: "var(--text-dim)" }}>
          Click to flip and read the story. Double-click for a full-screen view.
        </p>

        {lightboxPhoto && <Lightbox photo={lightboxPhoto} onClose={closeLightbox} />}

        {photos.length === 0 ? (
          /* Empty state */
          <div
            className="relative p-12 text-center"
            style={{ backgroundColor: "var(--surface)", border: "1px solid #0c2040" }}
          >
            <Brackets />
            <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color: "var(--text-dimmer)" }}>
              NO ASSETS LOADED
            </p>
            <p className="font-mono text-xs leading-relaxed" style={{ color: "var(--text-dimmer)" }}>
              Drop JPGs into <span style={{ color: "var(--accent)" }}>public/photos/</span> then add entries to{" "}
              <span style={{ color: "var(--accent)" }}>lib/data.ts</span> → <span style={{ color: "var(--accent)" }}>photos[]</span>
            </p>
            <p className="font-mono text-xs mt-2" style={{ color: "#0d2030" }}>
              iPhone HEIC → JPG: sips -s format jpeg photo.heic --out photo.jpg
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} onLightbox={setLightboxPhoto} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
