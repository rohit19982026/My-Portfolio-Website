import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import AmbientBackground from "@/components/AmbientBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
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
    "Technical Project Manager delivering enterprise data & AI programs at phData — kickoff to closure across Snowflake, Databricks, and AI agent platforms. PSM1 · Open to global remote roles.",
  keywords: [
    "Technical Project Manager",
    "Project Manager",
    "Data Platform",
    "Snowflake",
    "Databricks",
    "AI Automation",
    "phData",
    "PSM1",
    "Remote",
    "Bengaluru",
  ],
  authors: [{ name: "Rohit Kumar Singh" }],
  openGraph: {
    title: "Rohit Kumar Singh — Technical Project Manager",
    description:
      "Delivering enterprise data & AI programs at phData — kickoff to closure across Snowflake, Databricks, and AI agent platforms. PSM1 · Open to global remote.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Rohit Kumar Singh — Technical Project Manager",
    description:
      "Delivering enterprise data & AI programs at phData — kickoff to closure across Snowflake, Databricks, and AI agent platforms. Open to global remote.",
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
      className={`${inter.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0F172A] antialiased">
        <AmbientBackground />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <ScrollToTop />
      </body>
    </html>
  );
}
