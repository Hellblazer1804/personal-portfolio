"use client";

import { createContext, useContext, useState, useEffect } from "react";

type ThemeCtx = { isDark: boolean; toggle: () => void };
const Ctx = createContext<ThemeCtx>({ isDark: true, toggle: () => {} });
export const useTheme = () => useContext(Ctx);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    const dark = saved !== "light";
    setIsDark(dark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, []);

  const toggle = () => {
    setIsDark((d) => {
      const next = !d;
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
      return next;
    });
  };

  return <Ctx.Provider value={{ isDark, toggle }}>{children}</Ctx.Provider>;
}
