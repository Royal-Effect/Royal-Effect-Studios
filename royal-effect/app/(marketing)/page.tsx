import { Metadata } from "next";
import { HeroSection } from "@/components/web/sections/home/HeroSection";
import { SelectedWork } from "@/components/web/sections/home/SelectedWork";
import { ServicesMarquee } from "@/components/web/sections/shared/ServicesMarquee";
import { StudioEthos } from "@/components/web/sections/home/StudioEthos";
import { WhatWeOffer } from "@/components/web/sections/shared/WhatWeOffer";
import { FaqSection } from "@/components/web/sections/home/FaqSection";
import CtaHero from "@/components/web/sections/home/CtaHero";
// import { CtaFooter } from "@/components/web/sections/shared/CtaFooter";

import { client } from "@/sanity/lib/client";
import { selectedWorksQuery } from "@/sanity/lib/queries";
import { selectedWorkData } from "@/libs/constants/selectedWorkData";
import { SelectedWorkInterface } from "@/libs/interfaces/selectedWork";

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://royal-effect-studios.vercel.app"),
  title: "Royal Effect Studios — Brand Identity & Logo Design",
  description:
    "Royal Effect is a premium brand identity and logo design studio. We build brands that mean business — strategic, modern, and built to make first impressions last.",
  openGraph: {
    title: "Royal Effect Studios",
    description: "Brand identity & logo design studio.",
    type: "website",
  },
};

export default async function HomePage() {
  // Fetch from Sanity API, fallback to static data if empty
  const sanityWorks = await client.fetch<SelectedWorkInterface[]>(selectedWorksQuery);
  const worksToDisplay = sanityWorks.length > 0 ? sanityWorks : selectedWorkData;

  return (
    <main>
      <HeroSection />
      <SelectedWork projects={worksToDisplay} />
      <ServicesMarquee />
      <StudioEthos />
      <WhatWeOffer />
      <FaqSection />
      <CtaHero />
 
    </main>
  );
}
