import type { Metadata } from "next";

import { LabExperience } from "@/components/lab/LabExperience";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { footerData, footerNavigation, navLinks } from "@/data/aroc";

export const metadata: Metadata = {
  title: "AROC Lab Arcade | AROC_PL",
  description:
    "Tiga simulator interaktif untuk merasakan bagaimana humanoid soccer robot melihat, berpikir, berkomunikasi, dan bergerak. Tidak perlu membaca artikel panjang — langsung main.",
  openGraph: {
    title: "AROC Lab Arcade | AROC_PL",
    description:
      "Robot Control Room — tiga simulator browser-playable untuk divisi Maneuvering, Image Processing, dan Communication.",
    images: ["/images/hero-integrated.png"],
  },
};

export default function LabPage() {
  return (
    <>
      <Navbar links={navLinks} />
      <LabExperience />
      <Footer
        contact={footerData.contact}
        description={footerData.description}
        navigation={footerNavigation}
        sponsors={footerData.sponsors}
      />
    </>
  );
}
