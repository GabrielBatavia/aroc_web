import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Robots } from "@/components/sections/Robots";
import { SponsorCta } from "@/components/sections/SponsorCta";
import { Team } from "@/components/sections/Team";
import { Technology } from "@/components/sections/Technology";
import {
  aboutCards,
  achievements,
  coreDivisions,
  footerData,
  footerNavigation,
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
      <main className="relative">
        <Hero data={heroData} />
        <Achievements items={achievements} />
        <About cards={aboutCards} values={valueCards} />
        <Team lead={teamLead} stats={teamStats} years={teamYears} />
        <Robots robots={robotCards} />
        <Technology divisions={coreDivisions} />
        <Gallery items={galleryItems} />
        <SponsorCta />
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
