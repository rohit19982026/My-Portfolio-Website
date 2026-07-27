import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const manrope = Manrope({
  variable: "--font-manrope",
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
      className={`${fraunces.variable} ${manrope.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text antialiased">
        {/* Plain, literal, blocking script — not next/script — deliberately.
            next/script's beforeInteractive queues into a runtime array that a
            later-loading JS chunk executes, which does not reliably beat the
            browser's first paint. A raw inline script with no src, placed as
            the very first thing in <body>, executes synchronously as the
            parser reaches it, before any subsequent content is parsed or
            painted — the only reliable way to avoid a flash of the wrong
            theme for a returning dark-mode visitor. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();",
          }}
        />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1 relative z-[2]">{children}</main>
        <ScrollToTop />
      </body>
    </html>
  );
}
