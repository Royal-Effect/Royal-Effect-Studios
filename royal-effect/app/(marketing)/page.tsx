import { Metadata } from "next";
import { HeroSection } from "@/components/web/sections/home/HeroSection";
import { SelectedWork } from "@/components/web/sections/home/SelectedWork";
import { ServicesMarquee } from "@/components/web/sections/shared/ServicesMarquee";
import { StudioEthos } from "@/components/web/sections/home/StudioEthos";
import { WhatWeOffer } from "@/components/web/sections/shared/WhatWeOffer";
import { FaqSection } from "@/components/web/sections/home/FaqSection";
import CtaHero from "@/components/web/sections/home/CtaHero";
// import { CtaFooter } from "@/components/web/sections/shared/CtaFooter";

export const revalidate = 86400;

export const metadata: Metadata = {
  metadataBase: new URL("https://royaleffectstudios.com"),
  title: "Royal Effect Studios — Brand Identity & Logo Design",
  description:
    "Royal Effect is a premium brand identity and logo design studio. We build brands that mean business — strategic, modern, and built to make first impressions last.",
  openGraph: {
    title: "Royal Effect Studios",
    description: "Brand identity & logo design studio.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SelectedWork />
      <ServicesMarquee />
      <StudioEthos />
      <WhatWeOffer />
      <FaqSection />
      <CtaHero />
 
    </main>
  );
}
