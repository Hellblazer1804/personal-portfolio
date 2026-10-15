"use client";

import { createContext, useContext, useState, useEffect } from "react";

type ThemeCtx = { isDark: boolean; toggle: () => void };
const Ctx = createContext<ThemeCtx>({ isDark: true, toggle: () => {} });
export const useTheme = () => useContext(Ctx);

const DARK = {
  "--bg":             "#010208",
  "--surface":        "#040c18",
  "--surface-2":      "#06101e",
  "--bg-deep":        "#020610",
  "--border":         "#0c2040",
  "--border-active":  "#1a4888",
  "--accent":         "#0077ee",
  "--accent-bright":  "#0099ff",
  "--text-bright":    "#c0d8f4",
  "--text":           "#5888aa",
  "--text-dim":       "#2a4a6a",
  "--text-dimmer":    "#1a3a5a",
  "--dot-color":      "rgba(0,85,180,0.12)",
  "--scan-color":     "rgba(0,30,100,0.022)",
};

const LIGHT = {
  "--bg":             "#eef2f7",
  "--surface":        "#ffffff",
  "--surface-2":      "#f5f8fc",
  "--bg-deep":        "#e8edf4",
  "--border":         "#c0d0e4",
  "--border-active":  "#7aa0cc",
  "--accent":         "#0055bb",
  "--accent-bright":  "#0077ee",
  "--text-bright":    "#0a1828",
  "--text":           "#1e3a5a",
  "--text-dim":       "#4a6a8a",
  "--text-dimmer":    "#6888a8",
  "--dot-color":      "rgba(0,70,150,0.07)",
  "--scan-color":     "rgba(0,50,120,0.018)",
};

function applyTheme(dark: boolean) {
  const vars = dark ? DARK : LIGHT;
  const root = document.documentElement;
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.setAttribute("data-theme", dark ? "dark" : "light");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    const dark = saved !== "light";
    setIsDark(dark);
    applyTheme(dark);
  }, []);

  const toggle = () => {
    setIsDark((d) => {
      const next = !d;
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
      applyTheme(next);
      return next;
    });
  };

  return <Ctx.Provider value={{ isDark, toggle }}>{children}</Ctx.Provider>;
}
