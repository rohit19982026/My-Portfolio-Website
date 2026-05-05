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
    "Technical Project Manager specializing in data engineering, cloud migrations, ELT pipelines, and AI enablement.",
  openGraph: {
    title: "Rohit Kumar Singh — Technical Project Manager",
    description:
      "Data platform migrations, ELT pipelines, and AI enablement at scale.",
    type: "website",
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
