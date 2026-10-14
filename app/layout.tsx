import type { Metadata } from "next";
import { Geist, Geist_Mono, Rajdhani } from "next/font/google";
import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
  title: "Bandhan Patel - Platform Engineer",
  description:
    "Cloud infrastructure and platform engineer with 4+ years building distributed systems on Kubernetes (AWS & GCP). Author of a peer-reviewed paper at ACM Middleware '26. 99.9999% uptime on 24×7 on-call.",
  keywords: [
    "Platform Engineer",
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
    title: "Bandhan Patel - Platform Engineer",
    description:
      "Cloud infrastructure and platform engineer. ACM Middleware '26 author. 99.9999% uptime on 24×7 on-call.",
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
        <Suspense fallback={<div style={{ height: "56px" }} />}>
          <Navigation />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
