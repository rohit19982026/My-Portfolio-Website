import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Rohit Kumar Singh — Technical Project Manager",
  description:
    "Technical Project Manager with 5+ years delivering enterprise data & AI programs at phData. $3.5M+ portfolio, 99.98% budget execution. PSM1 · ITIL · Open to global remote roles.",
  keywords: [
    "Technical Project Manager",
    "Project Manager",
    "Data Platform",
    "Snowflake",
    "Databricks",
    "AI Automation",
    "phData",
    "PSM1",
    "ITIL",
    "Remote",
    "Bengaluru",
  ],
  authors: [{ name: "Rohit Kumar Singh" }],
  openGraph: {
    title: "Rohit Kumar Singh — Technical Project Manager",
    description:
      "5+ years delivering enterprise data & AI programs. $3.5M+ portfolio · 99.98% budget execution · PSM1 · ITIL · Open to global remote.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Rohit Kumar Singh — Technical Project Manager",
    description:
      "5+ years delivering enterprise data & AI programs. $3.5M+ portfolio · 99.98% budget execution · Open to global remote.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0F172A] antialiased">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <ScrollToTop />
      </body>
    </html>
  );
}
