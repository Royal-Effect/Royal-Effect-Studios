import { Metadata } from "next";
import { HeroSection } from "@/components/web/sections/HeroSection";
import { SelectedWork } from "@/components/web/sections/SelectedWork";
import { ServicesMarquee } from "@/components/web/sections/ServicesMarquee";
import { StudioEthos } from "@/components/web/sections/StudioEthos";
import { WhatWeOffer } from "@/components/web/sections/WhatWeOffer";
import { FaqSection } from "@/components/web/sections/FaqSection";
import { CtaFooter } from "@/components/web/sections/CtaFooter";

export const metadata: Metadata = {
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
      <CtaFooter />
    </main>
  );
}
