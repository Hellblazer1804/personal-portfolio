import type { Metadata } from "next";
import { Geist, Geist_Mono, Rajdhani } from "next/font/google";
import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bandhan Patel - Platform, Backend & Full-Stack Engineer",
  description:
    "Platform, Backend & Full-Stack Engineer with 4+ years across infrastructure, backend services, and full-stack development on Kubernetes (AWS & GCP). ACM Middleware '26 author. 99.9999% uptime on 24×7 on-call.",
  keywords: [
    "Platform Engineer",
    "Backend Engineer",
    "Full-Stack Engineer",
    "Site Reliability Engineer",
    "Cloud Infrastructure",
    "Kubernetes",
    "AWS",
    "GCP",
    "Terraform",
    "Bandhan Patel",
  ],
  authors: [{ name: "Bandhan Patel" }],
  openGraph: {
    title: "Bandhan Patel - Platform, Backend & Full-Stack Engineer",
    description:
      "Platform, backend, and full-stack engineer. ACM Middleware '26 author. 99.9999% uptime on 24x7 on-call.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${rajdhani.variable}`}
    >
      <body>
        <ThemeProvider>
          <Suspense fallback={<div style={{ height: "56px" }} />}>
            <Navigation />
          </Suspense>
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
