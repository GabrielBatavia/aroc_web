import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Robots } from "@/components/sections/Robots";
import { Team } from "@/components/sections/Team";
import { Technology } from "@/components/sections/Technology";
import {
  aboutCards,
  achievements,
  coreDivisions,
  footerData,
  galleryItems,
  heroData,
  navLinks,
  robotCards,
  teamLead,
  teamStats,
  teamYears,
  valueCards,
} from "@/data/aroc";

export default function Home() {
  return (
    <>
      <Navbar links={navLinks} />
      <main className="page-background relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-8rem] top-80 size-[22rem] rounded-full bg-[radial-gradient(circle,rgba(0,184,219,0.1),transparent_70%)] blur-3xl" />
          <div className="absolute right-[-6rem] top-[22rem] size-[18rem] rounded-full bg-[radial-gradient(circle,rgba(240,177,0,0.08),transparent_70%)] blur-3xl" />
          <div className="absolute left-1/2 top-[95rem] size-[22rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,184,219,0.09),transparent_72%)] blur-3xl" />
        </div>

        <Hero data={heroData} />
        <About cards={aboutCards} values={valueCards} />
        <Technology divisions={coreDivisions} />
        <Robots robots={robotCards} />
        <Team lead={teamLead} stats={teamStats} years={teamYears} />
        <Achievements items={achievements} />
        <Gallery items={galleryItems} />
      </main>
      <Footer
        contact={footerData.contact}
        description={footerData.description}
        navigation={navLinks}
        sponsors={footerData.sponsors}
      />
    </>
  );
}
