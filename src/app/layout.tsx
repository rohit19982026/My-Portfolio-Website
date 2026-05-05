import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

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

export const metadata: Metadata = {
  title: "Rohit Kumar Singh — Technical Project Manager",
  description:
    "Technical Project Manager with 5+ years leading enterprise data & AI programs at phData. PSM1 · ITIL certified. $3.5M+ portfolio managed across cloud migrations, platform delivery, and AI automation.",
  keywords: [
    "Technical Project Manager",
    "Program Manager",
    "Data Platform",
    "Snowflake",
    "Databricks",
    "AI Automation",
    "phData",
    "PSM1",
    "ITIL",
    "Bengaluru",
  ],
  authors: [{ name: "Rohit Kumar Singh" }],
  openGraph: {
    title: "Rohit Kumar Singh — Technical Project Manager",
    description:
      "5+ years owning enterprise data & AI programs end-to-end. $3.5M+ portfolio · 10+ programs delivered · PSM1 · ITIL · phData Innovation Award.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Rohit Kumar Singh — Technical Project Manager",
    description:
      "5+ years owning enterprise data & AI programs end-to-end. $3.5M+ portfolio · 10+ programs delivered · phData Innovation Award.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-[#111827] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <ScrollToTop />
      </body>
    </html>
  );
}
