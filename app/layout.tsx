import type { Metadata } from "next";
import { Barlow_Condensed, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ScrollAtmosphere } from "@/components/shared/ScrollAtmosphere";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { CustomCursor } from "@/components/shared/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AROC_PL — Advance Robosoccer Polinema | Tim Robotik Juara Nasional",
  description:
    "Development Team robot humanoid Politeknik Negeri Malang. Juara Nasional KRI Humanoid League 2024 dan aktif mengembangkan sistem robot untuk kompetisi bergengsi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <ScrollAtmosphere />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
