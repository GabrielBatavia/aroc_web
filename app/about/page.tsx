import type { Metadata } from "next";

import { AboutHero } from "@/components/about/AboutHero";
import { Mentors } from "@/components/about/Mentors";
import { TeamDirectory } from "@/components/about/TeamDirectory";
import { VisionMission } from "@/components/about/VisionMission";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import {
  aboutCohorts,
  aboutHero,
  aboutMentors,
  aboutMission,
  aboutValues,
  aboutVision,
} from "@/data/about";
import { footerData, footerNavigation, navLinks } from "@/data/aroc";

export const metadata: Metadata = {
  title: "Tentang Kami | AROC_PL",
  description:
    "Tentang AROC_PL — visi, misi, dosen pembimbing, dan daftar lengkap anggota tim robotik humanoid Politeknik Negeri Malang.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar links={navLinks} />

      <main className="flex-1">
        <AboutHero
          description={aboutHero.description}
          eyebrow={aboutHero.eyebrow}
          stats={aboutHero.stats}
          titleAccent={aboutHero.titleAccent}
          titlePrefix={aboutHero.titlePrefix}
        />
        <VisionMission
          mission={aboutMission}
          values={aboutValues}
          vision={aboutVision}
        />
        <Mentors mentors={aboutMentors} />
        <TeamDirectory cohorts={aboutCohorts} />
      </main>

      <Footer
        contact={footerData.contact}
        description={footerData.description}
        navigation={footerNavigation}
        sponsors={footerData.sponsors}
      />
    </>
  );
}
