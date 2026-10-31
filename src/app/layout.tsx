import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Rohit Kumar Singh — Technical Project Manager, Data & AI",
  description:
    "Technical Project Manager at phData, running data and AI programs for US Fortune 500 clients. Six years in delivery. Claude Certified Architect. Based in Bengaluru.",
  keywords: [
    "Technical Project Manager",
    "Data Delivery",
    "Data Platform Migration",
    "Snowflake",
    "Databricks",
    "AI Automation",
    "phData",
    "PSM I",
    "Claude Certified Architect",
    "ITIL",
    "Bengaluru",
  ],
  authors: [{ name: "Rohit Kumar Singh" }],
  openGraph: {
    title: "Rohit Kumar Singh — Technical Project Manager, Data & AI",
    description:
      "I run data and AI programs for US Fortune 500 clients at phData, usually four or five at once. Alongside that, I build small tools and AI agents that take the repetitive reporting off my plate.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Rohit Kumar Singh — Technical Project Manager, Data & AI",
    description:
      "I run data and AI programs for US Fortune 500 clients at phData, usually four or five at once, and build small tools and AI agents that take the repetitive reporting off my plate.",
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
