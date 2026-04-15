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
  aboutTeamNotePath,
  aboutValues,
  aboutVision,
} from "@/data/about";
import { footerData, footerNavigation, navLinks } from "@/data/aroc";

export const metadata: Metadata = {
  title: "About | AROC_PL",
  description:
    "Tentang AROC_PL, visi dan misi tim, dosen pembimbing, serta data anggota lintas angkatan.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar links={navLinks} />

      <main className="page-background relative flex-1 overflow-hidden bg-black">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[22rem] w-[38rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,78,100,0.22),transparent_70%)] blur-3xl" />
          <div className="absolute left-[-8rem] top-[34rem] size-[16rem] rounded-full bg-[radial-gradient(circle,rgba(0,184,219,0.09),transparent_70%)] blur-3xl" />
          <div className="absolute right-[-8rem] top-[42rem] size-[18rem] rounded-full bg-[radial-gradient(circle,rgba(255,137,4,0.08),transparent_70%)] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1054px] px-4 sm:px-6 lg:px-[15px]">
          <div className="px-0 lg:px-[32px]">
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
            <TeamDirectory cohorts={aboutCohorts} notePath={aboutTeamNotePath} />
          </div>
        </div>
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
