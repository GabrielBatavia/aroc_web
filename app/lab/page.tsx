import type { Metadata } from "next";

import { LabExperience } from "@/components/lab/LabExperience";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { footerData, footerNavigation, navLinks } from "@/data/aroc";
import { labDivisionsWithContent } from "@/data/labContent";
import { labHeroStats } from "@/data/lab";

export const metadata: Metadata = {
  title: "AROC Lab | AROC_PL",
  description:
    "Learning portal sederhana AROC_PL untuk latihan divisi Maneuvering, Image Processing, dan Communication dengan modul, mini lab, dan progress lokal.",
  openGraph: {
    title: "AROC Lab | AROC_PL",
    description:
      "Training ground anggota aktif AROC_PL untuk modul robot humanoid, mini lab interaktif, dan skill matrix divisi.",
    images: ["/images/hero-integrated.png"],
  },
};

export default function LabPage() {
  return (
    <>
      <Navbar links={navLinks} />
      <LabExperience divisions={labDivisionsWithContent} stats={labHeroStats} />
      <Footer
        contact={footerData.contact}
        description={footerData.description}
        navigation={footerNavigation}
        sponsors={footerData.sponsors}
      />
    </>
  );
}
