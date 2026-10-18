import type { Metadata } from "next";
import { Anton, Caveat, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import GrainOverlay from "@/components/effects/GrainOverlay";
import MagneticCursor from "@/components/cursor/MagneticCursor";
import SmoothScrollProvider from "@/components/scroll/SmoothScrollProvider";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rohit Kumar Singh — Technical Project Manager, Data & AI",
  description:
    "Technical Project Manager at phData. Six years running data and AI delivery programs for enterprise clients — platform migrations, lakehouses, AI deployments. PSM1 and ITIL certified. Based in Bengaluru.",
  keywords: [
    "Technical Project Manager",
    "Data Delivery",
    "Data Platform Migration",
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
    title: "Rohit Kumar Singh — Technical Project Manager, Data & AI",
    description:
      "Six years running data and AI delivery programs for enterprise clients. Ten-plus programs, the largest $1.37M. I also build the AI agents that handle my own routine work.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Rohit Kumar Singh — Technical Project Manager, Data & AI",
    description:
      "Six years running data and AI delivery programs for enterprise clients. Ten-plus programs, the largest $1.37M.",
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
      className={`${anton.variable} ${inter.variable} ${spaceGrotesk.variable} ${caveat.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        {/* Anti-FOUC: applies a stored manual theme choice (from the
            toggle in ui/ThemeToggle.tsx) before first paint. Light is the
            site's fixed default — the no-stored-choice case needs no JS
            at all, since the bare `:root` values in globals.css already
            render light — so this only ever needs to act when localStorage
            holds an explicit "dark" override. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();",
          }}
        />
        <SmoothScrollProvider>
          <ScrollProgress />
          <Navbar />
          <main className="flex-1 relative z-[2]">{children}</main>
          <ScrollToTop />
        </SmoothScrollProvider>
        <GrainOverlay />
        <MagneticCursor />
      </body>
    </html>
  );
}
