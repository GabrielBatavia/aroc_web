import type { Metadata } from "next";
import { BioLinkPage } from "@/components/bio/BioLinkPage";

export const metadata: Metadata = {
  title: "AROC POLINEMA — Official Bio Links",
  description:
    "Official Bio Link for AROC POLINEMA (Advance Robosoccer Polinema). Instagram, LinkedIn, TikTok, Website, Company Profile Video, dan Kontak.",
};

export default function BioPage() {
  return <BioLinkPage />;
}
