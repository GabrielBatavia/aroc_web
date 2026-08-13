import type { Metadata } from "next";
import { BioLinkPage } from "@/components/bio/BioLinkPage";

export const metadata: Metadata = {
  title: "AROC POLINEMA — Official Links & Bio",
  description:
    "Official Link in Bio for AROC POLINEMA (Advance Robosoccer Polinema). Temukan Instagram, LinkedIn, TikTok, Website, Video Company Profile, dan Kontak Kemitraan di satu tempat.",
  openGraph: {
    title: "AROC POLINEMA — Official Links & Bio",
    description:
      "Tautan resmi AROC POLINEMA: Instagram, LinkedIn, TikTok, YouTube Company Profile, Website Resmi, dan Kontak Tim.",
    images: ["/images/hero-integrated.png"],
  },
};

export default function LinksPage() {
  return <BioLinkPage />;
}
