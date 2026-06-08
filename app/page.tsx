import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { HomeCampaign } from "@/components/campaign/HomeCampaign";
import {
  aboutCards,
  achievements,
  campaignNavLinks,
  coreDivisions,
  footerData,
  footerNavigation,
  galleryItems,
  heroData,
  robotCards,
  teamLead,
  teamStats,
  teamYears,
  valueCards,
} from "@/data/aroc";

export default function Home() {
  return (
    <>
      <Navbar links={campaignNavLinks} />
      <HomeCampaign
        aboutCards={aboutCards}
        achievements={achievements}
        divisions={coreDivisions}
        gallery={galleryItems}
        hero={heroData}
        robots={robotCards}
        teamLead={teamLead}
        teamStats={teamStats}
        teamYears={teamYears}
        values={valueCards}
      />
      <Footer
        contact={footerData.contact}
        description={footerData.description}
        navigation={footerNavigation}
        sponsors={footerData.sponsors}
      />
    </>
  );
}
