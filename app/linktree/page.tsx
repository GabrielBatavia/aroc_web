import type { Metadata } from "next";
import { BioLinkPage } from "@/components/bio/BioLinkPage";

export const metadata: Metadata = {
  title: "AROC POLINEMA — Official Linktree Bio",
  description:
    "Linktree resmi AROC POLINEMA. Kumpulan tautan media sosial, profil perusahaan, website, dan kontak tim.",
};

export default function LinktreePage() {
  return <BioLinkPage />;
}
